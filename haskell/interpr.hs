module Wy.Interpr
  ( eval, evalWy,
    applyDirect
  ) where

import Control.Monad(liftM, liftM2)
import Control.Monad.Error(mapErrorT)
import Control.Monad.Reader
import Control.Monad.Error
import Text.ParserCombinators.Parsec(parse)

import qualified Data.Map as M
import Data.IORef(newIORef, readIORef)
import qualified Data.Traversable as T
import Data.Ord(comparing)
import Data.List(sortBy)
import Debug.Trace

import Wy.Parser
import Wy.Types

--
-- Interpreter

evalWy:: ASTType -> Eval WyType

evalWy ASTNull = return WyNull
evalWy (ASTBool b) = return $ WyBool b
evalWy (ASTFloat f) = return $ WyFloat f 
evalWy (ASTInt i) = return $ WyInt i
evalWy (ASTString s) = return $ WyString s

evalWy (ASTList xs) = liftM WyList $ mapM eval xs
evalWy (ASTMap m) = liftM (WyMap . M.fromList) $ T.mapM evalKeyVal $ M.toList m
  where evalKeyVal (k,v) = liftM2 (,) (eval k) (eval v)

evalWy (ASTId idn) | idn == "true" = return $ WyBool True
evalWy (ASTId idn) | idn == "false" = return $ WyBool False
evalWy (ASTId idn) | idn == "null" = return $ WyNull
evalWy (ASTId idn) | otherwise = do
  env <- ask
  val <- liftIO $ envLookupVar idn env
  case val of
    Nothing -> throwError $ UnknownRef ("Unknown reference: " ++ idn)
    Just v  -> return $ WyRef v

evalWy (ASTApplic fn ps) = eval fn >>= apply ps

evalWy (ASTStmt xs) = liftM last $ applyMacros xs >>= mapM eval
evalWy (ASTBlock xs) = liftM last $ mapM eval xs

apply:: [ASTType] -> WyType -> Eval WyType
apply vals (WyPrimitive n fn) = fn vals
apply vals wl@(WyLambda _ _ _) = mapM eval vals >>= applyDirect wl
apply ps other = throwError . ApplicationErr $ "Don't know how to apply: " ++ show other

applyDirect (WyLambda params ast lenv) evals = localIO (const $ envStack params evals lenv) $ eval ast

eval ast = evalWy ast >>= liftIO . readRef

--
-- Macro system

patternMatch :: ASTType -> ASTType -> Maybe (M.Map String ASTType) -> Maybe (M.Map String ASTType)
patternMatch _ _ Nothing = Nothing
patternMatch (ASTId s1) (ASTId s2) f | s1 == s2      = f
patternMatch (ASTId s) x (Just f)    | s !! 0 == '`' = Just $ M.insert (tail s) x f
patternMatch (ASTStmt (x1:xs1)) (ASTStmt (x2:xs2)) f = patternMatch x1 x2 $ matchList xs1 xs2 f
patternMatch (ASTStmt [x]) y f = patternMatch x y f
patternMatch (ASTStmt []) (ASTStmt []) f = f
patternMatch (ASTApplic n1 (p1:ps1)) (ASTApplic n2 (p2:ps2)) f | n1 == n2 = patternMatch p1 p2 $ matchList ps1 ps2 f
patternMatch _ _ _ = Nothing

matchList (x1:xs1) (x2:xs2) f = patternMatch x1 x2 $ matchList xs1 xs2 f
matchList [] _ f = f
matchList _ _ _ = Nothing

findMacros :: (Num a) => [ASTType] -> a -> Eval [(WyType, a)]
findMacros [] num = return []
findMacros ((ASTId x):xs) num = lookupMacro x xs num
findMacros ((ASTApplic (ASTId n) _):xs) num = lookupMacro n xs num
findMacros (x:xs) num = findMacros xs (num+1)
lookupMacro n xs num = do
  env <- ask
  m <- liftIO $ envLookupMacro n env
  case m of
    Just res -> do t <- findMacros xs (num+1)
                   v <- liftIO $ readIORef res
                   return $ (v, num) : t
    Nothing -> findMacros xs (num+1)

matchMacro :: [ASTType] -> (WyType, Int) -> Eval (Maybe (WyType, Int, Frame))
matchMacro stmt (m@(WyMacro p b _ e), idx) = matchOffset [-1, 0, 1] stmt p idx
  where matchOffset (offs:offss) stmt mi idx = 
          if offs + idx >= 0
              then case patternMatch mi (ASTStmt $ drop (offs + idx) stmt) (Just M.empty) of
                      Just f -> do env <- ask
                                   fr  <- liftIO $ toFrame f env
                                   return $ Just (m, idx, fr)
                      Nothing -> matchOffset offss stmt mi idx
              else matchOffset offss stmt mi idx
        matchOffset [] stmt mi idx = return Nothing
        toFrame b env = liftM (flip Frame $ M.empty) $ T.mapM (toTemplateRef env) b
        toTemplateRef env exp = newIORef $ WyTemplate exp

runMacro :: WyType -> Frame -> Eval WyType
runMacro (WyMacro _ b _ env) f = localIO (const $ envAdd f env) $ eval b

rewriteStmt :: [ASTType] -> (WyType, Int, [ASTType]) -> ([ASTType], Int)
rewriteStmt stmt (m , idx, nast) =
  let startIdx = idx - (fst $ macroPivot m)
      newOffs = length nast - macroPattLgth m   
  in (take startIdx stmt ++ nast ++ drop (startIdx + macroPattLgth m) stmt, newOffs)
                                                 
macroPattLgth m = 
  case macroPattern m of
    (ASTStmt es)    -> length es
    (ASTApplic _ _) -> 1
    _               -> error $ "Bad macro pattern: " ++ (show $ macroPattern m)

applyMacros :: [ASTType] -> Eval [ASTType]
applyMacros stmt = liftM (map pruneAST) $ liftM orderFound (findMacros stmt 0) >>= rewriteMatch stmt
  where rewriteMatch stmt [] = return stmt
        rewriteMatch stmt (mi@(m,idx):ms) = do
          matchM <- matchMacro stmt mi
          case matchM of
            Just match -> do newStmt <- liftM (rewriteStmt stmt) $ runMatch match
                             rewriteMatch (fst newStmt) $ updIndexes idx (snd newStmt) ms
            Nothing -> rewriteMatch stmt ms
        runMatch (m, idx, f) = do res <- runMacro m f
                                  return (m, idx, [wyToAST res])
        orderFound ms = sortBy (comparing priority) $ ms
                        where priority = ((-)0) . macroPriority . fst
        updIndexes p offs [] = []
        updIndexes p offs ((m, idx):ms) = (m, if idx > p then idx+offs else idx) : updIndexes p offs ms
