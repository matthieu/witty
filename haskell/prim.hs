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
import System.Environment(getArgs)
import Debug.Trace

import Wy.Parser(ASTType(..), parseWy)
import Wy.Interpr
import Wy.Types

primitives f = arithmPrim f >>= basePrim >>= dataPrim >>= metaPrim >>= stdIOPrim

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

-- todo |> and <| to return a new array with a new value at its beginning / end
dataPrim f =
  defp "empty?" (\ps -> 
    onContainers ps (WyBool . null) (WyBool . null) (WyBool . M.null) ) f >>=
  defp "length" (\ps -> 
    onContainers ps wyLength wyLength (WyInt . toInteger . M.size) ) >>=
  defp "reverse" (\ps -> 
    onContainers ps (WyList . reverse) (WyString . reverse) (WyMap . id) ) >>=
  defp "@" (\ps -> 
    evalAtParams ps >>= elemAt ) >>=
  defp "@!" (\ps -> do 
    oldVal <- eval $ head ps
    newVal <- eval $ last ps
    let updVal = updatedVal oldVal (ps !! 1) newVal
    env <- ask
    n <- extractId $ head ps
    liftIO $ envUpdateVar n updVal env
    return newVal ) >>=
  defp "<<" (\ps -> do 
    arr <- evalWy $ head ps
    val <- eval (last ps)
    ref <- liftIO (readRef arr)
    newVal <- push ref val
    case head ps of
      (ASTId n) -> liftIO (writeIORef (extractRef arr) newVal) >> return newVal
      x         -> return newVal )

  where onContainers ps fnl fns fnm = 
          do e <- eval $ head ps
             case e of
               (WyList l) -> return . fnl $ l
               (WyString s) -> return . fns $ s
               (WyMap m) -> return . fnm $ m
               x -> throwError $ ApplicationErr $ "Can't check the length of " ++ show x
        wyLength = WyInt .toInteger . length
  
        elemAt ((WyList xs), (WyInt n)) = elemInArr xs n id
        elemAt ((WyString s), (WyInt n)) = elemInArr s n (WyString . (:[]))
        elemAt ((WyMap m), k) = return $ maybe WyNull id $ M.lookup k m
        elemAt (c, n) = throwError $ ApplicationErr $ "Can't access element " ++ show n ++ " in " ++ show c
        elemInArr xs n fn = 
          if m >= length xs || m < -(length xs)
            then return WyNull
            else return $ fn $ xs !! if m >= 0 then m else length xs + m
          where m = fromInteger n
        evalAtParams ps = do obj <- eval $ head ps
                             case obj of
                               (WyMap _) -> do lid <- extractId $ last ps
                                               return (obj, WyString lid)
                               x         -> liftM ((,) obj) (eval $ last ps)

        updatedVal (WyList xs) (ASTInt n) val = -- sparse list 
          WyList $ takeOrFill (fromInteger n) xs ++ [val] ++ drop ((fromInteger n)+1) xs
        updatedVal (WyString s) (ASTInt n) (WyString ns) = 
          WyString $ take (fromInteger n) s ++ ns ++ drop ((fromInteger n)+1) s
        updatedVal (WyMap m) (ASTId i) v = WyMap $ M.insert (WyString i) v m
        updatedVal x y _ = error $ "Can't update an element in " ++ show x ++ " at position " ++ show y
        takeOrFill n xs = if (length xs > n) then take n xs
                                             else take n xs ++ take (n - length xs) (repeat WyNull)

        push (WyList xs) val = return $ WyList (xs ++ [val])
        push (WyString xs) (WyString val) = return $ WyString (xs ++ val)
        push x val = throwError $ ApplicationErr $ "Can't push value " ++ (show val) ++ " in " ++ (show x)

metaPrim f =
  defp "applic?" (\ps -> do 
    applic <- eval $ head ps
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ _])) -> return $ WyBool True
      _                                      -> return $ WyBool False) f >>=
  defp "params" (\ps -> do
    applic <- eval $ head ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ ps])) -> return $ WyList $ map WyTemplate ps
      _                                       -> throwError $ ApplicationErr "Not a function application.") >>=

  defp "fnName" (\ps -> do
    applic <- eval $ head ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic (ASTId n) _])) -> return $ WyString n
      (WyTemplate (ASTStmt [ASTApplic  _ _]))        -> throwError $ ApplicationErr "Function application has no simple name."
      _                                              -> throwError $ ApplicationErr "Not a function application.") >>=

  defp "nthParam" (\ps -> do
    applic <- eval $ head ps 
    idx <- eval $ head . tail $ ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ ps])) -> 
        case idx of 
          (WyInt i) -> return . WyTemplate $ ps !! fromInteger i
          _         -> throwError $ ApplicationErr $ "Index parameter passed to nthParam isn't an int."
      x                                       -> throwError $ ApplicationErr $ "Not a function application: " ++ (show x))

stdIOPrim f =
  defp "print" (\ps -> do eps <- mapM eval ps 
                          str <- concatWyStr eps
                          liftIO $ putStrLn str
                          return WyNull ) f >>=
  defp "arguments" (\ps -> liftM (WyList . map WyString . safeTail) (liftIO getArgs) ) >>=
  defp "load" (\ps -> do
    fname <- eval (head ps) >>= literalStr
    fcnt <- liftIO $ readFile fname
    eval $ parseWy fcnt )
  
  where concatWyStr s = liftM concat $ mapM literalStr s
        literalStr (WyString s) = return s
        literalStr anyWy = liftIO $ showWy anyWy
        safeTail [] = []
        safeTail (x:xs) = xs

--
-- Common support functions

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
