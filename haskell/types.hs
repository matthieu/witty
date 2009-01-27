{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE TypeSynonymInstances #-}

module Wy.Types
  ( WyError(..),
    WyType(..), readRef, truthy, wyToAST, showWy, macroPivot,
    WyEnv, Frame(..), envLookupMacro, envLookupVar, envUpdateMacro, envUpdateVar, envStack, envAdd,
    Eval, localIO, runEval
  ) where

import qualified Data.Sequence as S
import qualified Data.Map as M
import Data.List(intercalate, (\\))
import Control.Monad.Error
import Control.Monad.Reader
import Data.IORef
import Data.Char(toLower)
import Data.Sequence ((<|))

import Wy.Parser

--
-- Language types and supporting function

data WyType = WyString String
            | WyInt Integer
            | WyFloat Double
            | WyBool Bool
            | WyNull
            | WyRef { extractRef:: (IORef WyType) }
            | WyList [WyType] -- todo change to sequence / todo use reference
            | WyMap (M.Map WyType WyType) -- todo use reference as value
            | WyTemplate ASTType
            | WyLambda [String] ASTType WyEnv
            | WyMacro { macroPattern:: ASTType, macroBody:: ASTType, macroPriority:: Integer, macroEnv:: WyEnv }
            | WyPrimitive String ([ASTType] -> Eval WyType)
    deriving (Show, Eq, Ord)
            
readRef (WyRef r) = readIORef r
readRef x         = return x

truthy (WyBool s) = s
truthy WyNull = False
truthy _ = True

macroPivot :: (Num t) => WyType -> (t, String)
macroPivot (WyMacro p b _ e) = firstNonVar p
  where firstNonVar (ASTStmt [ASTApplic (ASTId n) _]) = (0, n)
        firstNonVar (ASTStmt es) = firstNonVar' es 0
        firstNonVar' ((ASTId i):es) idx | i !! 0 /= '`' = (idx, i)
        firstNonVar' [] idx = error $ "No pivot found in macro pattern " ++ (show p)
        firstNonVar' (e:es) idx = firstNonVar' es (idx+1)

instance Num WyType where
  WyString s1 + WyString s2 = WyString (s1 ++ s2)
  WyInt i1 + WyInt i2 = WyInt (i1 + i2)
  WyFloat f1 + WyFloat f2 = WyFloat (f1 + f2)
  WyInt i1 + WyFloat f2 = WyFloat ((fromInteger i1) + f2)
  WyFloat f1 + WyInt i2 = WyFloat (f1 + (fromInteger i2))
  WyList l1 + WyList l2 = WyList (l1 ++ l2)
  WyString s1 + x = WyString (s1 ++ show x)
  x + WyString s1 = WyString (show x ++ s1)
  x1 + x2 = error ("can't add " ++ (show x1) ++ " and " ++ (show x2))
  -- todo merge maps

  WyString s1 - WyString s2 = WyString (s1 \\ s2)
  WyInt i1 - WyInt i2 = WyInt (i1 - i2)
  WyFloat f1 - WyFloat f2 = WyFloat (f1 - f2)
  WyInt i1 - WyFloat f2 = WyFloat ((fromInteger i1) - f2)
  WyFloat f1 - WyInt i2 = WyFloat (f1 - (fromInteger i2))
  WyList l1 - WyList l2 = WyList (l1 \\ l2)
  x1 - x2 = error ("can't add " ++ (show x1) ++ " and " ++ (show x2))

  WyInt i1 * WyInt i2 = WyInt (i1 * i2)
  WyFloat f1 * WyFloat f2 = WyFloat (f1 * f2)
  WyInt i1 * WyFloat f2 = WyFloat (fromInteger i1 * f2)
  WyFloat f1 * WyInt i2 = WyFloat (f1 * fromInteger i2)
  x1 * x2 = error ("can't multiply " ++ (show x1) ++ " and " ++ (show x2))

  abs (WyInt i1) = WyInt (abs i1)
  abs (WyFloat f1) = WyFloat (abs f1)
  abs x1 = error ("can't calculate absolute of " ++ (show x1))

  signum (WyInt i1) = WyInt (signum i1)
  signum (WyFloat f1) = WyFloat (signum f1)
  signum x1 = error ("can't calculate the sign of " ++ (show x1))

  fromInteger intg = WyInt intg

instance Fractional WyType where
  WyInt i1 / WyInt i2 = WyFloat ((fromInteger i1) / (fromInteger i2))
  WyFloat f1 / WyFloat f2 = WyFloat (f1 / f2)
  WyInt i1 / WyFloat f2 = WyFloat ((fromInteger i1) / f2)
  WyFloat f1 / WyInt i2 = WyFloat (f1 / (fromInteger i2))
  x1 / x2 = error ("can't divide " ++ (show x1) ++ " and " ++ (show x2))

  fromRational r = WyFloat (fromRational r)

instance Show ([ASTType] -> Eval WyType) where
  show _ = "<prim>"
instance Show (IORef WyType) where
  show _ = "<ref>"

instance Eq ([ASTType] -> Eval WyType) where
  _ == _ = False

instance Ord ([ASTType] -> Eval WyType) where
  _ <= _ = True
instance Ord (IORef WyType) where
  x <= y = True

wyToAST (WyString s) = ASTString s
wyToAST (WyInt i) = ASTInt i
wyToAST (WyFloat f) = ASTFloat f
wyToAST (WyBool b) = ASTBool b
wyToAST WyNull = ASTNull
wyToAST (WyList ss) = ASTList $ map wyToAST ss
wyToAST (WyMap m) = ASTMap $ M.mapKeys wyToAST . M.map wyToAST $ m
wyToAST (WyTemplate t) = t
wyToAST (WyLambda ss ast env) = ASTApplic (ASTId "lambda") (map ASTId ss ++ [ast])
wyToAST (WyPrimitive n _) = ASTId n

showWy :: WyType -> IO String
showWy (WyString s) = showRet s
showWy (WyInt s) = showRet $ s
showWy (WyFloat s) = showRet s
showWy (WyBool b) = return $ (toLower . head) bs : tail bs
  where bs = show b
showWy WyNull = return "null"
showWy (WyRef r) = readIORef r >>= showWy
showWy (WyList s) = liftM (\x -> "[" ++ (intercalate "," x) ++ "]") $ mapM showWy s
showWy (WyMap s) = showRet s
showWy (WyTemplate ast) = return $ "`(" ++ (show ast) ++ ")"
showWy (WyLambda ss ast env) = return $ "lambda(" ++ (show ss) ++ ", " ++ (show ast) ++ ")"
showWy (WyMacro p b _ env) = return $ "macro(" ++ (show p) ++ ", " ++ (show b) ++ ")"
showWy (WyPrimitive n _) = return $ "<primitive " ++ (show n) ++ ">"

showRet:: (Monad m, Show x) => x -> m String
showRet = return . show

-- Environment definition
--

type WyEnv = IORef (S.Seq Frame)

instance Show WyEnv where show _ = "<env>"
instance Ord WyEnv where _ <= _ = False

data Frame = Frame {
    frameVars :: M.Map String (IORef WyType),
    macroVars :: M.Map String (IORef WyType)
  }

envLookup name env frameFn = liftM (envLookup' name) (readIORef env)
  where envLookup' name env | S.null env = Nothing
                            | otherwise = case fstFrameLookup name env of
                                            Just value -> Just value
                                            Nothing -> envLookup' name $ S.drop 1 env
        fstFrameLookup name env = M.lookup name $ frameFn $ S.index env 0

envLookupVar :: String -> WyEnv -> IO (Maybe (IORef WyType))
envLookupVar name env = envLookup name env frameVars
envLookupMacro name env = envLookup name env macroVars

envInsert name value env varFn macFn = do val <- newIORef value
                                          envVal <- readIORef env
                                          writeIORef env $ envInsert' name val envVal
                                          return value
  where envInsert' name value env = S.update 0 (fstFrameUpdate name value env) env
        fstFrameUpdate name value env = Frame (varFn name value $ S.index env 0) (macFn name value $ S.index env 0)

envInsertVar :: String -> WyType -> WyEnv -> IO WyType
envInsertVar name value env = envInsert name value env (\n v -> M.insert n v . frameVars) (\n v -> macroVars)
envInsertMacro name value env = envInsert name value env (\n v -> frameVars) (\n v -> M.insert n v . macroVars)

envUpdate name value env lookupFn insertFn = do
  val <- lookupFn name env
  case val of
    Just ref -> writeIORef ref value >> return value
    Nothing -> insertFn name value env
envUpdateVar name value env = envUpdate name value env envLookupVar envInsertVar
envUpdateMacro name value env = envUpdate name value env envLookupMacro envInsertMacro

envStack :: [String] -> [WyType] -> WyEnv -> IO (WyEnv)
envStack params values env = do envVal <- readIORef env
                                valRefs <- mapM newIORef values
                                newEnv <- newIORef $ extend params valRefs envVal
                                return newEnv
  where extend params values env = ((<| env) . (flip Frame $ M.empty) . M.fromList . (zip params)) values

envAdd :: Frame -> WyEnv -> IO (WyEnv)
envAdd frame env = do envVal <- readIORef env
                      newEnv <- newIORef $ frame <| envVal
                      return newEnv

--
-- Evaluation monad

newtype Eval a = E {
    runE :: ReaderT WyEnv (ErrorT WyError IO) a
  } deriving (Monad, MonadIO, MonadError WyError, MonadReader WyEnv)

runEval :: Eval a -> WyEnv -> IO (Either WyError a)
runEval e env = runErrorT (runReaderT (runE e) env)

data WyError = UnknownRef String
             | ApplicationErr String
             | Undef String
    deriving (Eq, Ord, Show)

instance Error WyError where
  noMsg  = Undef "Undefined error. Sucks to be you."
  strMsg = Undef

localIO f a = do 
  env <- ask
  newEnv <- liftIO (f env)
  local (const newEnv) a
