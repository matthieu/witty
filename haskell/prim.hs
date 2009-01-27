module Wy.Prim
  ( primitives
  ) where

import Control.Monad(liftM, liftM2)
import qualified Data.Map as M
import Data.List(foldl', foldl1')
import Data.IORef
import qualified Data.Traversable as T
import Control.Monad.Reader
import Control.Monad.Error

import Wy.Parser(ASTType(..))
import Wy.Interpr
import Wy.Types

primitives f = arithmPrim f >>= basePrim

basePrim f =
  defp "lambda" (\ps -> do
    env <- ask
    params <- mapM extractId $ init ps
    return $ WyLambda params (last ps) env ) f >>=

  defp "macrop" (\ps -> do
    env <- ask
    priority <- extractInt $ ps !! 1
    let m = WyMacro (head ps) (last ps) priority env
        n = snd $ macroPivot m
    liftIO $ envUpdateMacro n m env
    return $ WyString n ) >>=

  defp "=" (\ps -> do
    env <- ask
    lv <- extractId . head $ ps
    rv <- evalSnd ps
    liftIO $ envUpdateVar lv rv env ) >>=

  defp "`" (\ps -> liftM WyTemplate $ unescapeBq . head $ ps) >>=
  defp "if" (\ps -> do
    expr <- eval $ head ps
    if (truthy expr)
      then evalSnd ps
      else if length ps < 3 then return WyNull else evalSnd $ tail ps) >>=
  defp "for" (\ps ->
    if length ps /= 2
      then throwError $ ApplicationErr "not implemented yet"
      else do list <- eval (head ps)
              lambda <- eval (last ps)
              wyFold (applySeq lambda) (return WyNull) list )

  where extractInt (ASTInt i) = return i
        extractInt x = throwError $ ApplicationErr $ (show x) ++ " isn't an integer value"
        evalSnd = eval . head . tail
        applySeq l elmt acc = applyDirect l [elmt]
        wyFold f z (WyList xs) = foldl' (\x xs -> x >>= f xs) z xs
        wyFold f z (WyString xs) = foldl' (\x xs -> x >>= f xs) z (map (WyString . (:"")) xs)

arithmPrim f = 
  defp "+" (opEval (+)) f >>=
  defp "-" (opEval (-)) >>=
  defp "*" (opEval (*)) >>=
  defp "/" (opEval (/)) >>=
  defp "!" (\ps -> liftM (WyBool . not . truthy) (eval $ ps !! 0)) >>=
  defp "==" (opEval $ boolComp (==)) >>=
  defp "<=" (opEval $ boolComp (<=)) >>=
  defp ">=" (opEval $ boolComp (>=)) >>=
  defp "<" (opEval $ boolComp (<)) >>=
  defp ">" (opEval $ boolComp (>)) >>=
  defp "&&" (boolEval (&&) (return True) False) >>=
  defp "||" (boolEval (||) (return False) True)

opEval op [p] = liftM (op 0) $ eval p
opEval op ps  = liftM (foldl1' op) (mapM eval ps)
        
boolEval op init stop ps = liftM WyBool $ foldr (boolContinue op stop) init (reverse ps)
  where boolContinue op stop p accM = do 
          acc <- accM
          if acc == stop 
            then return acc
            else liftM (op acc . truthy) $ eval p

boolComp c a b = WyBool (c a b)

--
-- Common supprort functions

defp name lambda map = liftM (flip (M.insert name) $ map) (wyPIO name lambda)
  where wyPIO n l = newIORef $ WyPrimitive n l

extractId (ASTId i) = return i
extractId (ASTStmt [ASTId i]) = return i
extractId x = throwError $ ApplicationErr $ "Non identifier value when one was expected: " ++ (show x)

unescapeBq :: ASTType -> Eval ASTType
unescapeBq ai@(ASTId i) | i !! 0 == '$' = do
  env <- ask
  res <- liftIO $ envLookupVar (tail i) env
  case res of
    Just v  -> liftM wyToAST $ liftIO (readIORef v)
    Nothing -> return ai
unescapeBq (ASTList ss) = mapUnxBq ASTList ss
unescapeBq (ASTMap m) = liftM ASTMap $ T.mapM unescapeBq m
unescapeBq (ASTApplic (ASTId n) ps) | n == "$" = liftM wyToAST $ eval (ps !! 0)
unescapeBq (ASTApplic n ps) = liftM2 ASTApplic (unescapeBq n) $ mapM unescapeBq ps
unescapeBq (ASTStmt xs) = mapUnxBq ASTStmt xs
unescapeBq (ASTBlock xs) = mapUnxBq ASTBlock xs
unescapeBq x = return x
mapUnxBq c e = liftM c $ mapM unescapeBq e
