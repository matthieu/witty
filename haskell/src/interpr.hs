module Wy.Interpr
  ( eval, evalWy,
    apply, applyDirect,
    -- only exported for tests
    adjust, patternMatch
  ) where

import Control.Monad(liftM, liftM2)
import Control.Monad.Error(mapErrorT)
import Control.Monad.Reader
import Control.Monad.Error
import Control.Monad.State
import Data.Foldable(foldrM)
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

evalWy (ASTBool b) = return $ WyBool b
evalWy (ASTFloat f) = return $ WyFloat f 
evalWy (ASTInt i) = return $ WyInt i
evalWy (ASTString s) = newWyRef $ WyString s

evalWy (ASTList xs) = liftM WyList (mapM evalWy xs) >>= newWyRef
evalWy (ASTMap m) = liftM (WyMap . M.fromList) (T.mapM evalKeyVal $ M.toList m) >>= newWyRef
  where evalKeyVal (k,v) = liftM2 (,) (eval k) (evalWy v)

evalWy (ASTId idn) | idn == "true" = return $ WyBool True
evalWy (ASTId idn) | idn == "false" = return $ WyBool False
evalWy (ASTId idn) | idn == "null" = return $ WyNull
evalWy (ASTId idn) | otherwise = do
  env <- ask
  val <- liftIO $ varValue idn env
  case val of
    Nothing -> throwError $ UnknownRef ("Unknown reference: " ++ idn)
    Just v  -> return v
    
evalWy (ASTApplic fn ps) = evalWy fn >>= apply ps

-- evalWy (ASTStmt xs) = liftM last $ applyMacros xs >>= (\x -> trace (show x) (return x)) >>= mapM evalWy
evalWy (ASTStmt xs) = liftM last $ applyMacros xs >>= mapM evalWy
evalWy (ASTBlock xs) = liftM last $ mapM evalWy xs

evalWy (ASTWyWrapper w) = return w

eval ast = evalWy ast >>= liftIO . readRef

-- Function application, either primitive or lambdas
apply:: [ASTType] -> WyType -> Eval WyType
apply vals (WyPrimitive n fn) = fn vals
apply vals wl@(WyLambda _ _ _) = mapM evalWy vals >>= applyDirect wl
apply vals (WyCont c) = liftM head (mapM evalWy vals) >>= c
apply ps other = appErr1 (\x -> "Don't know how to apply: " ++ x) other

-- Application of lambdas from argument list and evaluted values
applyDirect (WyLambda ps body lenv) vals = 
    localM (const $ buildFrame ps vals lenv) $ evalWy body
  where 
    buildFrame ps vs e  =
      case adjust WyNull WyList ps vs $ length vs - (fst $ unslurps ps) of
        Nothing   -> appErr1 (\x -> "Wrong number of arguments in function call: " ++ x) (WyList vs)
        Just adjV -> liftIO $ envStack (snd $ unslurps ps) adjV e

-- Adjusts the values provided for an application to a function's arguments. Handles
-- optionals and varargs. Needs a zero to replace a missing optional and a list
-- wrapper function to wrap varargs.
adjust z l (p:ps) (v:vs) dif 
  | last p == '?' && dif <= 0 = liftM (z :) $ adjust z l ps (v:vs) dif
  | last p == '?' && dif > 0  = liftM (v :) $ adjust z l ps vs (dif - 1)
  | last p == '~' && dif >= 0 =
      let s = slurp (v:vs) dif 
      in liftM (l s :) $ adjust z l ps (drop (length s - 1) vs) (dif - length s)
  | otherwise = liftM (v :) $ adjust z l ps vs dif

adjust z l (p:ps) [] dif 
  | last p == '?' && dif <= 0  = liftM (z :) $ adjust z l ps [] dif
  | last p == '~' && dif == 0 = liftM (z :) $ adjust z l ps [] dif
adjust z l [] [] dif | dif >= 0 = Just []
adjust z l _  _  x = Nothing

-- Consumes values matched to a vararg
slurp (v:vs) dif | dif > 0 = v : slurp vs (dif - 1)
                 | dif <= 0  = []
slurp [] _ = []

-- Removing slurpy and optional postfix from arguments. Reuse the same iteration
-- to compute the number of fixed parameters (used by adjust).
unslurps:: [String] -> (Int, [String])
unslurps = foldr (\x acc -> if last x == '?' || last x == '~' 
                              then (fst acc, init x : snd acc) 
                              else (fst acc + 1, x : snd acc)) (0, [])
unslurp x | last x == '?' || last x == '~' = init x
          | otherwise = x

-------------------------------------------------------------------------------
-- Macro system

-- Tries to match an AST pattern (like `a + `b) with an AST expression 
-- (like 2 + 3), producing a map of bindings.
patternMatch :: ASTType -> ASTType -> Maybe (M.Map String ASTType) -> Maybe (M.Map String ASTType)
patternMatch _ _ Nothing = Nothing
patternMatch (ASTId s1) (ASTId s2) f | s1 == s2      = f
patternMatch (ASTId s) x (Just f)    | head s == '`' = Just $ M.insert (unslurp $ tail s) x f
patternMatch (ASTStmt (x1:xs1)) (ASTStmt (x2:xs2)) f = patternMatch x1 x2 $ matchList xs1 xs2 f
patternMatch (ASTStmt [x]) y f = patternMatch x y f
patternMatch (ASTStmt []) (ASTStmt []) f = f
patternMatch (ASTApplic n1 ps1) (ASTApplic n2 ps2) f | n1 == n2 = 
  case adjps2 of
      Just vs -> matchList ps1 vs f
      Nothing -> Nothing
  where adjps2 = adjust (ASTId "null") ASTList strps1 ps2 (length ps2 - (fst $ unslurps strps1))
        strps1 =  map toIdStr ps1
        toIdStr (ASTId x) = x
        toIdStr _         = "placeholder"
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
  m <- liftIO $ macroValue n env
  case m of
    Just res -> do t <- findMacros xs (num+1)
                   return $ (res, num) : t
    Nothing -> findMacros xs (num+1)

matchMacro :: [ASTType] -> (WyType, Int) -> Eval (Maybe (WyType, Int, M.Map String WyType))
matchMacro stmt (m@(WyMacro p b _ e), idx) = matchOffset [-1, 0, 1] stmt p idx
  where matchOffset (offs:offss) stmt mi idx = 
          if offs + idx >= 0
              then case patternMatch mi (ASTStmt $ drop (offs + idx) stmt) (Just M.empty) of
                      Just f -> do env <- ask
                                   let fr = M.map WyTemplate f
                                   return $ Just (m, idx, fr)
                      Nothing -> matchOffset offss stmt mi idx
              else matchOffset offss stmt mi idx
        matchOffset [] stmt mi idx = return Nothing

runMacro :: WyType -> M.Map String WyType -> Eval WyType
runMacro (WyMacro _ b _ env) f = localIO (const $ envAdd f M.empty env) $ evalWy b

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
