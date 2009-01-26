-- module Wy.Interpr
--   (eval
--   ) where

import Control.Monad(liftM, liftM2)
import Control.Monad.Error(mapErrorT)
import Control.Monad.Reader
import Control.Monad.Error
import Text.ParserCombinators.Parsec(parse)

import Wy.Parser
import Wy.Types

--
-- Interpreter

parseWy input = pruneAST $ case (parse wyParser "(unknown)" input) of
                             Right out -> out
                             Left msg -> error $ "Parsing error: " ++ (show msg)

eval:: ASTType -> Eval WyType

eval ASTNull = return WyNull
eval (ASTBool b) = return $ WyBool b
eval (ASTFloat f) = return $ WyFloat f 
eval (ASTInt i) = return $ WyInt i
eval (ASTString s) = return $ WyString s

eval (ASTId idn) | idn == "true" = return $ WyBool True
eval (ASTId idn) | idn == "false" = return $ WyBool False
eval (ASTId idn) | idn == "null" = return $ WyNull
eval (ASTId idn) | otherwise = do
  env <- ask
  val <- liftIO $ envLookupVar idn env
  case val of
    Nothing -> throwError $ UnknownRef ("Unknown reference: " ++ idn)
    Just v  -> return $ WyRef v

apply:: [ASTType] -> WyType -> Eval WyType
apply vals (WyPrimitive n fn) = fn vals
apply vals wl@(WyLambda _ _ _) = mapM eval vals >>= applyDirect wl
apply ps other = error $ "Don't know how to apply: " ++ show other

applyDirect (WyLambda params ast lenv) evals = localIO (envStack params evals) $ eval ast
  where localIO f a = do 
          env <- ask
          newEnv <- liftIO (f env)
          local (const newEnv) a

evalNoRef ast = eval ast >>= liftIO . readRef
