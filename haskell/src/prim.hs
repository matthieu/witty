module Wy.Prim
  ( primitives
  ) where

import Control.Monad(liftM, liftM2, foldM)
import qualified Data.Map as M
import Data.List(foldl', foldl1')
import Data.IORef
import qualified Data.Traversable as T
import Data.Foldable (foldrM, foldlM)
import Control.Monad.Reader
import Control.Monad.Error
import Control.Monad.Cont
import System.Environment(getArgs)
import Debug.Trace

import Wy.Parser(ASTType(..), parseWy)
import Wy.Interpr
import Wy.Types

primitives f = arithmPrim $ basePrim $ dataPrim $ metaPrim $ stdIOPrim f

basePrim f =
  defp "lambda" (\ps -> do
    env <- ask
    params <- mapM extractId $ init ps
    return $ WyLambda params (last ps) env ) $

  defp "macrop" (\ps -> do
    env <- ask
    priority <- extractInt $ ps !! 1
    let m = WyMacro (head ps) (last ps) priority env
        n = snd $ macroPivot m
    liftIO $ macroUpdate n m env
    return $ WyString n ) $

  defp "=" (\ps -> do
    env <- ask
    rv <- evalWy . head . tail $ ps
    n <- extractId . head $ ps
    case rv of
      WyRef y    -> liftIO $ varUpdate env n $ WyRef y
      y          -> liftIO $ varUpdate env n y ) $

  defp "`" (\ps -> liftM WyTemplate $ unescapeBq . head $ ps) $
  defp "if" (\ps -> do
    expr <- eval $ head ps
    if (truthy expr)
      then evalSnd ps
      else if length ps < 3 then return WyNull else evalSnd $ tail ps) $

  defp "try" (\ps ->
    eval (head ps) `catchError` handleErr (tail ps) ) $

  defp "raise" (\ps -> eval (head ps) >>= throwError . UserErr ) $

  defp "toS" (\ps -> do 
    arg <- eval (head ps)
    argS <- liftIO $ showWy arg 
    return $ WyString argS ) $ 

  defp "callcc" (\ps -> callCC (\c -> do
    l <- eval $ head ps
    applyDirect l [WyCont c]) ) $

  defp "foldr" (\ps -> wyFold foldrM ps) $
  defp "foldl" (\ps -> wyFold foldlM ps) f

  where extractInt (ASTInt i) = return i
        extractInt x = throwError $ ArgumentErr $ (show x) ++ " isn't an integer value"
        applySeq l elmt acc = do re <- liftIO $ readRef elmt
                                 apply [wyToAST re] l
        wyFold foldFn ps = do
          fn   <- eval $ head ps
          init <- evalSnd ps
          arr  <- eval $ last ps
          case arr of
            (WyList a)   -> foldFn (\x acc -> apply [wyToAST x, wyToAST acc] fn) init a
            (WyString s) -> foldFn (\x acc -> apply [wyToAST x, wyToAST acc] fn) init (map (WyString . (:[])) s)
            x            -> throwError $ ArgumentErr $ "Can't fold on " ++ show x

        handleErr [] err = throwError err
        handleErr (p:ps) err = do
          catch <- eval p >>= readArrRef
          merr  <- trace (show catch ++ " // " ++ show err) $ matchErr catch err
          case merr of
            Just res -> return res
            Nothing  -> handleErr ps err

        -- matchErr caught thrown
        matchErr (WyList ((WyMap m):xs)) (UnknownRef s) = sysErr m xs s "UnknownRef"
        matchErr (WyList ((WyMap m):xs)) (ArgumentErr s) = sysErr m xs s "ArgumentErr"
        matchErr (WyList ((WyMap m1):xs)) (UserErr wm@(WyMap m2))
          | M.member (WyString "type") m1 &&  M.member (WyString "type") m2 
              = let c = M.lookup (WyString "type") m1
                    t = M.lookup (WyString "type") m2
                in case (c, t) of 
                  (Just cv, Just tv) | cv == tv -> liftM Just $ applyDirect (last xs) [wm]
                  otherwise -> return Nothing
        matchErr (WyList ((WyList (e:es)):xs)) err = do
          xe <- liftIO $ readRef e
          m  <- trace ("in " ++ show xe) $ matchErr (WyList (xe:xs)) err
          case m of
            Just x  -> return $ Just x
            Nothing -> matchErr (WyList ((WyList es):xs)) err
        matchErr (WyList (x:xs)) ue@(UserErr y) 
          | x == y    = liftM Just $ applyDirect (last xs) [y]
        matchErr _ _ = return Nothing

        readArrRef (WyList l) = liftM WyList $ mapM (liftIO . readRef) l
        readArrRef x          = error $ "Expected a list but didn't get one, a bug " ++ (show x)

        sysErr m xs msg errstr = do
          v <- liftIO . readRef $ M.findWithDefault WyNull (WyString "type") m
          if (v == WyString "UnknownRef")
            then liftM Just $ applyDirect (last xs) [WyMap $ M.insert (WyString "message") (WyString errstr) m]
            else return Nothing


arithmPrim f = 
  defp "+" (opEvalM wyPlus) $
  defp "-" (opEvalM wyMinus) $
  defp "*" (opEvalM wyMult) $
  defp "/" (opEvalM wyDiv) $
  defp "!" (\ps -> liftM (WyBool . not . truthy) (eval $ ps !! 0)) $
  defp "==" (opEval $ boolComp (==)) $
  defp "<=" (opEval $ boolComp (<=)) $
  defp ">=" (opEval $ boolComp (>=)) $
  defp "<" (opEval $ boolComp (<)) $
  defp ">" (opEval $ boolComp (>)) $
  defp "&&" (boolEval (&&) (return True) False) $
  defp "||" (boolEval (||) (return False) True) f

opEval op [p] = liftM (op $ WyInt 0) $ eval p
opEval op ps  = liftM (foldl1' op) (mapM eval ps)

opEvalM op [p] = eval p >>= op (WyInt 0)
opEvalM op ps  = mapM eval ps >>= foldM1 op
  where foldM1 op arr = foldM op (head arr) (tail arr)
        
boolEval op init stop ps = liftM WyBool $ foldr (boolContinue op stop) init (reverse ps)
  where boolContinue op stop p accM = do 
          acc <- accM
          if acc == stop then return acc else liftM (op acc . truthy) $ eval p

boolComp c a b = WyBool (c a b)

-- todo |> and <| to return a new array with a new value at its beginning / end
dataPrim f =
  defp "L" (\ps -> liftM WyList (mapM evalWy ps) >>= newWyRef ) $
  defp "empty?" (\ps -> 
    onContainers ps (WyBool . null) (WyBool . null) (WyBool . M.null) ) $
  defp "length" (\ps -> 
    onContainers ps wyLength wyLength (WyInt . toInteger . M.size) ) $
  defp "reverse" (\ps -> 
    onContainers ps (WyList . reverse) (WyString . reverse) (WyMap . id) ) $
  defp "@" (\ps -> 
    evalAtParams ps >>= elemAt ) $
  defp "@!" (\ps -> do 
    ref <- evalWy $ head ps
    oldVal <- liftIO $ readRef ref
    newVal <- evalWy $ last ps
    let updVal = updatedVal oldVal (ps !! 1) newVal
    liftIO $ writeIORef (extractRef ref) updVal
    return newVal ) $
  defp "<<" (\ps -> do 
    arr <- eval $ head ps
    val <- evalSnd ps
    push arr val ) $
  defp "push!" (\ps -> do 
    arr <- evalWy $ head ps
    val <- evalWy (last ps)
    ref <- liftIO (readRef arr)
    newVal <- push ref val
    case arr of
      (WyRef r) -> liftIO (writeIORef r newVal) >> return (WyRef r)
      x         -> return newVal ) $
  defp "slice" (\ps -> do
    arr <- eval $ head ps
    from <- liftM fromInteger $ (eval . head . tail $ ps) >>= asInt
    tor <- liftM fromInteger $ (if length ps == 3 then eval (last ps) else return $ WyInt (-1)) >>= asInt
    case arr of
      (WyList l)   -> return $ WyList (take (if tor >= 0 then tor else length l + tor) . drop from $ l)
      (WyString s) -> return $ WyString (take (if tor >= 0 then tor else length s + tor) . drop from $ s)
  ) f
  
  where onContainers ps fnl fns fnm = 
          do e <- eval $ head ps
             case e of
               (WyList l) -> return . fnl $ l
               (WyString s) -> return . fns $ s
               (WyMap m) -> return . fnm $ m
               x -> throwError $ ArgumentErr $ "Can't check the length of " ++ show x
        wyLength = WyInt .toInteger . length
  
        elemAt ((WyList xs), (WyInt n)) = elemInArr xs n id
        elemAt ((WyString s), (WyInt n)) = elemInArr s n (WyString . (:[]))
        elemAt ((WyMap m), k) = return $ maybe WyNull id $ M.lookup k m
        elemAt (c, n) = throwError $ ArgumentErr $ "Can't access element " ++ show n ++ " in " ++ show c
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
        push x val = throwError $ ArgumentErr $ "Can't push value " ++ (show val) ++ " in " ++ (show x)

metaPrim f =
  defp "applic?" (\ps -> do 
    applic <- eval $ head ps
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ _])) -> return $ WyBool True
      _                                      -> return $ WyBool False) $
  defp "params" (\ps -> do
    applic <- eval $ head ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ ps])) -> return $ WyList $ map WyTemplate ps
      _                                       -> throwError $ ArgumentErr "Not a function application.") $

  defp "fnName" (\ps -> do
    applic <- eval $ head ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic (ASTId n) _])) -> return $ WyString n
      (WyTemplate (ASTStmt [ASTApplic  _ _]))        -> throwError $ ArgumentErr "Function application has no simple name."
      _                                              -> throwError $ ArgumentErr "Not a function application.") $

  defp "nthParam" (\ps -> do
    applic <- eval $ head ps 
    idx <- eval $ head . tail $ ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ ps])) -> 
        case idx of 
          (WyInt i) -> return . WyTemplate $ ps !! fromInteger i
          _         -> throwError $ ArgumentErr $ "Index parameter passed to nthParam isn't an int."
      x                                       -> throwError $ ArgumentErr $ "Not a function application: " ++ (show x)) f

stdIOPrim f =
  defp "print" (\ps -> do eps <- mapM eval ps 
                          str <- concatWyStr eps
                          liftIO $ putStrLn str
                          return WyNull ) $
  defp "arguments" (\ps -> liftM (WyList . map WyString . safeTail) (liftIO getArgs) ) $
  defp "load" (\ps -> do
    fname <- eval (head ps) >>= literalStr
    fcnt <- liftIO $ readFile fname
    eval $ parseWy fname fcnt ) f
  
  where concatWyStr s = liftM concat $ mapM literalStr s
        literalStr (WyString s) = return s
        literalStr anyWy = liftIO $ showWy anyWy
        safeTail [] = []
        safeTail (x:xs) = xs

--
-- Common support functions

defp n l = M.insert n (WyPrimitive n l)

extractId (ASTId i) = return i
extractId (ASTStmt [ASTId i]) = return i
extractId x = throwError $ ArgumentErr $ "Non identifier value when one was expected: " ++ (show x)
        
evalSnd = eval . head . tail

asInt (WyInt i) = return i
asInt x         = appErr1 (\y -> "An int was expected, got " ++ y) x

unescapeBq :: ASTType -> Eval ASTType
unescapeBq ai@(ASTId i) | i !! 0 == '$' = do
  env <- ask
  res <- liftIO $ varValue (tail i) env
  case res of
    Just v  -> return $ wyToAST v
    Nothing -> return ai
unescapeBq (ASTList ss) = mapUnxBq ASTList ss
unescapeBq (ASTMap m) = liftM ASTMap $ T.mapM unescapeBq m
unescapeBq (ASTApplic (ASTId n) ps) | n == "$" = liftM wyToAST $ evalWy (ps !! 0)
unescapeBq (ASTApplic n ps) = liftM2 ASTApplic (unescapeBq n) $ mapM unescapeBq ps
unescapeBq (ASTStmt xs) = mapUnxBq ASTStmt xs
unescapeBq (ASTBlock xs) = mapUnxBq ASTBlock xs
unescapeBq x = return x
mapUnxBq c e = liftM c $ mapM unescapeBq e
