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

eval:: WyEnv -> ASTType -> Eval WyType

eval _ ASTNull = return WyNull
eval _ (ASTBool b) = return $ WyBool b
eval _ (ASTFloat f) = return $ WyFloat f 
eval _ (ASTInt i) = return $ WyInt i
eval _ (ASTString s) = return $ WyString s

eval _ (ASTId idn)   | idn == "true" = return $ WyBool True
eval _ (ASTId idn)   | idn == "false" = return $ WyBool False
eval _ (ASTId idn)   | idn == "null" = return $ WyNull
eval env (ASTId idn) | otherwise = do
  val <- liftIO $ envLookupVar idn env
  case val of
    Nothing -> throwError $ UnknownRef ("Unknown reference: " ++ idn)
    Just v  -> return $ WyRef v
--  liftIO  (maybe (throwError $ "Unknown reference: " ++ idn) return) $ envLookupVar idn env
