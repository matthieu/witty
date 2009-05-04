{-# LANGUAGE OverlappingInstances #-} 
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE TypeSynonymInstances #-}

module Wy.Types
  ( WyError(..),
    WyType(..), readRef, mapReadRef, newWyRef, truthy, showWy, macroPivot,
    extractId,
    wyPlus, wyMinus, wyDiv, wyMult,
    WyEnv, Frame(..), macroValue, varValue, macroUpdate, varInsert, varUpdate, envStack, envAdd, envAddMod,
    Eval, localM, localIO, runEval, appErr1, appErr2
  ) where

import qualified Data.Sequence as S
import qualified Data.Map as M
import Data.List(intercalate, (\\))
import Control.Monad.Error
import Control.Monad.Reader
import Control.Monad.Cont
import Data.IORef
import Data.Char(toLower)
import Data.Sequence ((<|))
import Control.Monad(liftM, liftM2)
import System.IO.Unsafe(unsafePerformIO)
import Debug.Trace

--
-- Language types and supporting function

data WyType = WyString String
            | WyInt Integer
            | WyFloat Double
            | WyBool Bool
            | WyNull
            | WyRef { extractRef:: (IORef WyType) }
            | WyList [WyType] -- todo change to sequence
            | WyMap (M.Map WyType WyType)
            | WyLambda [String] WyType WyEnv
            | WyMacro { macroPattern:: WyType, macroBody:: WyType, macroPriority:: Integer, macroEnv:: WyEnv }
            | WyPrimitive String ([WyType] -> Eval WyType)
            | WyCont (WyType -> Eval WyType)
            | WyModule String (M.Map String WyType) (M.Map String WyType)

            | WyId String
            | WyApplic WyType [WyType]
            | WyStmt [WyType]
            | WyBlock [WyType]
    deriving (Show, Eq, Ord)
            
readRef (WyRef r) = readIORef r
readRef x         = return x
mapReadRef = mapM (liftIO . readRef)

newWyRef:: WyType -> Eval WyType
newWyRef v = liftM WyRef $ liftIO (newIORef v)

truthy (WyBool s) = s
truthy WyNull = False
truthy _ = True

macroPivot :: (Num t) => WyType -> (t, String)
macroPivot (WyMacro p b _ e) = firstNonVar p
  where firstNonVar (WyStmt [WyApplic (WyId n) _]) = (0, n)
        firstNonVar (WyStmt es) = firstNonVar' es 0
        firstNonVar' ((WyId i):es) idx | i !! 0 /= '`' = (idx, i)
        firstNonVar' [] idx = error $ "No pivot found in macro pattern " ++ (show p)
        firstNonVar' (e:es) idx = firstNonVar' es (idx+1)

wyPlus:: WyType -> WyType -> Eval WyType
wyPlus (WyString s1) (WyString s2) = return $ WyString (s1 ++ s2)
wyPlus (WyString s1) (WyInt i2) = return $ WyString (s1 ++ (show i2))
wyPlus (WyInt i1) (WyInt i2) = return $ WyInt (i1 + i2)
wyPlus (WyFloat f1) (WyFloat f2) = return $ WyFloat (f1 + f2)
wyPlus (WyInt i1) (WyFloat f2) = return $ WyFloat ((fromInteger i1) + f2)
wyPlus (WyFloat f1) (WyInt i2) = return $ WyFloat (f1 + (fromInteger i2))
wyPlus (WyList l1) (WyList l2) = return $ WyList (l1 ++ l2)
wyPlus x1 x2 = appErr2 (\x y -> "can't add " ++ x ++ " and " ++ y) x1 x2

wyMinus (WyString s1) (WyString s2) = return $ WyString (s1 \\ s2)
wyMinus (WyInt i1) (WyInt i2) = return $ WyInt (i1 - i2)
wyMinus (WyFloat f1) (WyFloat f2) = return $ WyFloat (f1 - f2)
wyMinus (WyInt i1) (WyFloat f2) = return $ WyFloat ((fromInteger i1) - f2)
wyMinus (WyFloat f1) (WyInt i2) = return $ WyFloat (f1 - (fromInteger i2))
wyMinus (WyList l1) (WyList l2) = liftM WyList $ liftM2 (\\) (mapReadRef l1) (mapReadRef l2)
wyMinus x1 x2 = appErr2 (\x y -> "can't subtract " ++ y ++ " from " ++ x) x1 x2

wyMult (WyInt i1) (WyInt i2) = return $ WyInt (i1 * i2)
wyMult (WyFloat f1) (WyFloat f2) = return $ WyFloat (f1 * f2)
wyMult (WyInt i1) (WyFloat f2) = return $ WyFloat (fromInteger i1 * f2)
wyMult (WyFloat f1) (WyInt i2) = return $ WyFloat (f1 * fromInteger i2)
wyMult x1 x2 = appErr2 (\x y -> "can't multiply " ++ x ++ " and " ++ y) x1 x2

wyDiv (WyInt i1) (WyInt i2) = 
  if i2 == 0 then throwError $ ArgumentErr "Division by 0"
             else return $ WyFloat ((fromInteger i1) / (fromInteger i2))
wyDiv (WyFloat f1) (WyFloat f2) = return $ WyFloat (f1 / f2)
wyDiv (WyInt i1) (WyFloat f2) = return $ WyFloat ((fromInteger i1) / f2)
wyDiv (WyFloat f1) (WyInt i2) = return $ WyFloat (f1 / (fromInteger i2))
wyDiv x1 x2 = appErr2 (\x y -> "can't multiply " ++ x ++ " and " ++ y) x1 x2

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
showWy (WyLambda ss ast env) = return $ "lambda(" ++ (show ss) ++ ", " ++ (show ast) ++ ")"
showWy (WyMacro p b _ env) = return $ "macro(" ++ (show p) ++ ", " ++ (show b) ++ ")"
showWy (WyPrimitive n _) = return $ "<primitive " ++ (show n) ++ ">"
showWy (WyCont c) = return "<cont>"
showWy (WyModule n _ _) = return $ "module " ++ n ++ " .."
showWy (WyId s) = return s
showWy (WyApplic n ps) = liftM2 ((\ps n -> "(a " ++ n ++ " " ++ ps ++ ")") . unwords) (mapM showWy ps) (showWy n)
showWy (WyStmt ss) = liftM ((\x -> "(s " ++ x ++ ")") . unwords) $ mapM showWy ss

showWyE = liftIO . showWy

showRet:: (Monad m, Show x) => x -> m String
showRet = return . show

instance Show ([WyType] -> Eval WyType) where
  show _ = "<prim>"
instance Show (WyType -> Eval WyType) where
  show _ = "<cont>"
instance Show (IORef WyType) where
  show x = show $ unsafePerformIO $ readIORef x

instance Eq ([WyType] -> Eval WyType) where
  _ == _ = False
instance Eq (WyType -> Eval WyType) where
  _ == _ = False

instance Ord ([WyType] -> Eval WyType) where
  _ <= _ = True
instance Ord (WyType -> Eval WyType) where
  _ <= _ = True
instance Ord (IORef WyType) where
  x <= y = True

extractId (WyId i) = return i
extractId (WyStmt [WyId i]) = return i
extractId x = throwError $ ArgumentErr $ "Non identifier value when one was expected: " ++ (show x)

-- Environment definition
--

type WyEnv = S.Seq Frame

data Frame = Frame {
  frameVars :: IORef (M.Map String WyType),
  frameMacros :: IORef (M.Map String WyType),
  isModuleFrame :: Bool
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

varInsert n v env = varInsert' n v env frameVars
varInsert' n v env frameAcc = varInsertAt 0 n v f env frameAcc
  where f = S.index env 0

varUpdate :: WyEnv -> String -> WyType -> IO WyType
varUpdate env n v = varUpdate' n v env frameVars

macroUpdate n v env = varUpdate' n v env frameMacros

varUpdate' n v env frameAcc = do
  f <- varFrameIdx' n env (readIORef . frameAcc)
  case f of
    Nothing      -> varInsert' n v env frameAcc
    Just (i, f)  -> varInsertAt i n v f env frameAcc

envStack :: [String] -> [WyType] -> WyEnv -> IO (WyEnv)
envStack params values env = envAdd (M.fromList $ zip params values) M.empty env

envAdd :: (M.Map String WyType) -> (M.Map String WyType) -> WyEnv -> IO (WyEnv)
envAdd = envAddMod False
envAddMod isMod fv mv env = do
  newf <- newIORef fv
  newm <- newIORef mv
  return . (<| env) $ Frame newf newm isMod

--
-- Evaluation monad

newtype Eval a = E {
    runE :: ReaderT WyEnv (ErrorT WyError (ContT (Either WyError WyType) IO)) a
  } deriving (Monad, MonadIO, MonadError WyError, MonadReader WyEnv, MonadCont)

--runEval :: Eval a -> WyEnv -> IO (Either WyError a)
runEval :: Eval a -> WyEnv -> (Either WyError a -> IO (Either WyError WyType)) -> IO (Either WyError WyType)
runEval e env = runContT (runErrorT (runReaderT (runE e) env))

data WyError = UnknownRef String
             | ArgumentErr String
             | UserErr WyType
             | Undef String
    deriving (Eq, Ord, Show)

appErr2 txtFn x1 x2 = liftM2 txtFn (showWyE x1) (showWyE x2) >>= (throwError . ArgumentErr)
appErr1 txtFn x = liftM txtFn (showWyE x) >>= (throwError . ArgumentErr)

instance Error WyError where
  noMsg  = Undef "Undefined error. Sucks to be you."
  strMsg = Undef

localIO f a = do 
  env <- ask
  newEnv <- liftIO (f env)
  local (const newEnv) a

localM:: (WyEnv -> Eval WyEnv) -> Eval a -> Eval a
localM f a = do 
  env <- ask
  newEnv <- f env
  local (const newEnv) a
