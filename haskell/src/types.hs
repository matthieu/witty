{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE TypeSynonymInstances #-}

module Wy.Types
  ( ASTType(..),
    WyError(..),
    WyType(..), readRef, newWyRef, truthy, wyToAST, showWy, macroPivot,
    WyEnv, Frame(..), macroValue, varValue, macroUpdate, varUpdate, envStack, envAdd,
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

--
-- AST Nodes

data ASTType = ASTString String
                | ASTInt Integer
                | ASTFloat Double
                | ASTBool Bool
                | ASTNull
                | ASTList [ASTType]
                | ASTMap (M.Map ASTType ASTType)
                | ASTId String
                | ASTApplic ASTType [ASTType]
                | ASTStmt [ASTType]
                | ASTBlock [ASTType]
                | ASTWyWrapper WyType
    deriving (Show, Eq, Ord)

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

newWyRef:: WyType -> Eval WyType
newWyRef v = liftM WyRef $ liftIO (newIORef v)

truthy (WyBool s) = s
truthy WyNull = False
truthy _ = True

macroPivot :: (Num t) => WyType -> (t, String)
macroPivot (WyMacro p b _ e) = firstNonVar p
  where firstNonVar (ASTStmt [ASTApplic (ASTId n) _]) = (0, n)
        firstNonVar (ASTStmt es) = firstNonVar' es 0
        firstNonVar x            = error $ "wtf " ++ (show x)
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

wyToAST (WyTemplate t) = t
wyToAST x = ASTWyWrapper x

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

type WyEnv = S.Seq Frame

data Frame = Frame {
  frameVars :: IORef (M.Map String WyType),
  frameMacros :: IORef (M.Map String WyType)
}

instance Show Frame where show _ = "<frame>"
instance Ord Frame where _ <= _ = False
instance Eq Frame where _ == _ = False

readFrmVars = readIORef . frameVars
readFrmMacros = readIORef . frameMacros

varFrameIdx' n env readFrm = varFrameIdx' n env 0
  where varFrameIdx' n env idx | idx == S.length env = return Nothing
                               | otherwise = do
          found <- liftM (M.member n) (readFrm $ S.index env idx)
          if found
            then return $ Just (idx, S.index env idx)
            else varFrameIdx' n env (idx + 1)

varValue :: String -> WyEnv -> IO (Maybe WyType)
varValue n env = varValue' n env readFrmVars

macroValue n env = varValue' n env readFrmMacros

varValue' n env readFrm = do
  fidx <- varFrameIdx' n env readFrm
  case fidx of
    Just (i, f) -> liftM (M.lookup n) $ readFrm f
    Nothing     -> return Nothing

varInsertAt i n v f env frameAcc = do
  fv <- (readIORef . frameAcc) f
  writeIORef (frameAcc f) $ M.insert n v fv
  return v

varInsert n v env frameAcc = varInsertAt 0 n v f env frameAcc
  where f = S.index env 0

varUpdate :: WyEnv -> String -> WyType -> IO WyType
varUpdate env n v = varUpdate' n v env frameVars

macroUpdate n v env = varUpdate' n v env frameMacros

varUpdate' n v env frameAcc = do
  f <- varFrameIdx' n env (readIORef . frameAcc)
  case f of
    Nothing      -> varInsert n v env frameAcc
    Just (i, f)  -> varInsertAt i n v f env frameAcc

envStack :: [String] -> [WyType] -> WyEnv -> IO (WyEnv)
envStack params values env = envAdd (M.fromList $ zip params values) env

envAdd :: (M.Map String WyType) -> WyEnv -> IO (WyEnv)
envAdd fv env = do
  newf <- newIORef $ fv
  newm <- newIORef M.empty
  return $ (<| env) $ Frame newf newm

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
