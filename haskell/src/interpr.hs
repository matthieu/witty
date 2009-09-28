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

import qualified Data.Sequence as S
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

evalWy:: WyType -> Eval WyType

evalWy WyNull = return $ WyNull
evalWy (WyBool b) = return $ WyBool b
evalWy (WyFloat f) = return $ WyFloat f 
evalWy (WyInt i) = return $ WyInt i
evalWy (WyString s) = newWyRef $ WyString s

evalWy (WyList xs) = liftM WyList (mapM evalWy xs) >>= newWyRef
evalWy (WyMap m) = liftM (WyMap . M.fromList) (T.mapM evalKeyVal $ M.toList m) >>= newWyRef
  where evalKeyVal (k,v) = liftM2 (,) (eval k) (evalWy v)

evalWy (WyId idn _) | idn == "true" = return $ WyBool True
evalWy (WyId idn _) | idn == "false" = return $ WyBool False
evalWy (WyId idn _) | idn == "null" = return $ WyNull
evalWy (WyId idn pos) | otherwise = do
  env <- ask
  val <- liftIO $ varValue idn env
  case val of
    Nothing -> throwError $ UnknownRef ("Unknown reference: " ++ idn) pos
    Just v  -> return v
    
evalWy wa@(WyApplic fn vals pos) = put pos >> do
  efn <- eval fn
  let ps = params efn
  case adjust WyNull WyList ps vals $ length vals - (fst $ unslurps ps) of
    Nothing   -> paramErr ps vals
    Just adjv -> if (length adjv == length ps) 
                   -- normal application
                   then apply adjv vals efn
                   -- partial application
                   else let rmndr = drop (length adjv) ps
                            newps = vals ++ map (flip WyId pos) rmndr
                        in return $ WyLambda rmndr (WyApplic fn newps pos) S.empty
  where 
    params (WyLambda ps _ _) = ps
    params (WyPrimitive _ ps _) = ps
    params (WyCont _) = ["c"]

evalWy (WyStmt xs) = liftM last $ applyMacros xs >>= mapM evalWy
evalWy (WyBlock xs) = liftM last $ mapM evalWy xs
evalWy wy = get >>= appErr1 (\x -> "Don't know how to eval: " ++ x) wy

eval ast = evalWy ast >>= liftIO . readRef

-- Function application, either primitive or lambdas
apply:: [WyType] -> [WyType] -> WyType -> Eval WyType

apply adjv vals (WyPrimitive n _ fn) = fn vals -- TODO primitives should use adjusted parameters
apply adjv vals wl@(WyLambda _ _ _) = mapM evalWy adjv >>= applyDirect wl
apply adjv vals (WyCont c) = liftM head (mapM evalWy vals) >>= c
apply _ vals other = get >>= appErr1 (\x -> "Don't know how to apply: " ++ x ++ " " ++ show vals) other

-- Application of lambdas from argument list and evaluated values

applyDirect wl@(WyLambda ps body lenv) vals =
  let buildFrame ps vs e = liftIO $ envStack (snd $ unslurps ps) vs e
  in localM (const $ buildFrame ps vals lenv) $ evalWy body

paramErr ps vs = get >>= 
  appErr ("Wrong number of arguments in function call: " ++ 
          (show . length $ vs) ++ " for " ++ (show . length $ ps))

-- Adjusts the values provided for an application to a function's arguments. Handles
-- optionals and varargs. Needs a zero to set missing optionals value and a list
-- wrapper function to wrap varargs.
adjust :: a -> ([a] -> a) -> [String] -> [a] -> Int -> Maybe [a]

adjust z l (p:ps) (v:vs) dif 
  | last p == '?' && dif <= 0 = liftM (z :) $ adjust z l ps (v:vs) dif
  | last p == '?' && dif > 0  = liftM (v :) $ adjust z l ps vs (dif - 1)
  | last p == '~' && dif > 0 =
      let s = slurp (v:vs) dif 
      in liftM (l s :) $ adjust z l ps (drop (length s - 1) vs) (dif - length s)
  | last p == '~' && dif <= 0 = liftM (l [] :) $ adjust z l ps (v:vs) dif
  | otherwise = liftM (v :) $ adjust z l ps vs dif

adjust z l (p:ps) [] dif 
  | last p == '?' && dif <= 0 || last p == '~' && dif == 0 = liftM (z :) $ adjust z l ps [] dif
adjust z l [] [] dif | dif == 0 = Just []
adjust z l (p:ps) [] dif | dif < 0 = Just []
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

-- Tries to match an Wy pattern (like `a + `b) with an Wy expression 
-- (like 2 + 3), producing a map of bindings.
patternMatch :: WyType -> WyType -> Maybe (M.Map String WyType) -> Maybe (M.Map String WyType)
patternMatch _ _ Nothing = Nothing
patternMatch (WyId s1 _) (WyId s2 _) f | s1 == s2      = f
patternMatch (WyId s _) x (Just f)     | head s == '`' = Just $ M.insert (unslurp $ tail s) x f
patternMatch (WyStmt xs@(x1:xs1)) (WyStmt ys@(x2:xs2)) f = matchList xs ys f
patternMatch (WyStmt [x]) y f = patternMatch x y f
patternMatch (WyStmt []) (WyStmt []) f = f
patternMatch (WyApplic (WyId n1 _) ps1 _) (WyApplic (WyId n2 _) ps2 _) f | n1 == n2 = 
  case adjps2 of
      Just vs -> matchList ps1 vs f
      Nothing -> Nothing
  where adjps2 = adjust (WyId "null" NoPos) WyList strps1 ps2 (length ps2 - (fst $ unslurps strps1))
        strps1 =  map toIdStr ps1
        toIdStr (WyId x _) = x
        toIdStr _         = "placeholder"
patternMatch _ _ _ = Nothing

-- todo only supports last slurpy for now, should eventually be a full blown parser generator
matchList [ai@(WyId i1 _)] xs f | head i1 == '`' && last i1 == '~' =
  patternMatch ai (WyStmt xs) f
matchList (x1:xs1) (x2:xs2) f = patternMatch x1 x2 $ matchList xs1 xs2 f
matchList [] _ f = f
matchList _ _ _ = Nothing

findMacros :: (Num a) => [WyType] -> a -> Eval [(WyType, a)]
findMacros [] num = return []
findMacros ((WyId x _):xs) num = lookupMacro x xs num
findMacros ((WyApplic (WyId n _) _ _):xs) num = lookupMacro n xs num
findMacros (x:xs) num = findMacros xs (num+1)
lookupMacro n xs num = do
  env <- ask
  m <- liftIO $ macroValue n env
  case m of
    Just res -> do t <- findMacros xs (num+1)
                   return $ (res, num) : t
    Nothing -> findMacros xs (num+1)

matchMacro :: [WyType] -> (WyType, Int) -> Eval (Maybe (WyType, Int, M.Map String WyType))
matchMacro stmt (m@(WyMacro p b _ e), idx) = matchOffset [-1, 0, 1] stmt p idx
  where matchOffset (offs:offss) stmt mi idx = 
          if offs + idx >= 0
              then case patternMatch mi (WyStmt $ drop (offs + idx) stmt) (Just M.empty) of
                      Just f -> return $ Just (m, idx, f)
                      Nothing -> matchOffset offss stmt mi idx
              else matchOffset offss stmt mi idx
        matchOffset [] stmt mi idx = return Nothing

runMacro :: WyType -> M.Map String WyType -> Eval WyType
runMacro (WyMacro _ b _ env) f = localIO (const $ envAdd f M.empty env) $ evalWy b

rewriteStmt :: [WyType] -> (WyType, Int, [WyType]) -> ([WyType], Int)
rewriteStmt stmt (m , idx, nast) =
  let startIdx = idx - (fst $ macroPivot m)
      newOffs = length nast - macroPattLgth m stmt 
  in (take startIdx stmt ++ nast ++ drop (startIdx + macroPattLgth m stmt) stmt, newOffs)
                                                 
macroPattLgth m stmt = 
  case macroPattern m of
    (WyStmt es)      -> if slurpyPattern es then length stmt else (length es)
    (WyApplic _ _ _) -> 1
    _                -> error $ "Bad macro pattern: " ++ (show $ macroPattern m)

slurpyPattern pes =
  case last pes of
    (WyId i _) -> last i == '~'
    x         -> False

applyMacros :: [WyType] -> Eval [WyType]
applyMacros stmt = liftM orderFound (findMacros stmt 0) >>= rewriteMatch stmt
  where rewriteMatch stmt [] = return stmt
        rewriteMatch stmt (mi@(m,idx):ms) = do
          matchM <- matchMacro stmt mi
          case matchM of
            Just match -> do newStmt <- liftM (rewriteStmt stmt) $ runMatch match
                             rewriteMatch (fst newStmt) $ updIndexes idx (snd newStmt) ms
            Nothing -> rewriteMatch stmt ms
        runMatch (m, idx, f) = do res <- runMacro m f
                                  return (m, idx, [res])
        orderFound ms = sortBy (comparing priority) $ ms
                        where priority = ((-)0) . macroPriority . fst
        updIndexes p offs [] = []
        updIndexes p offs ((m, idx):ms) = (m, if idx > p then idx+offs else idx) : updIndexes p offs ms
