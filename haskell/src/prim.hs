module Wy.Prim
  ( defWy, primitives
  ) where

import Control.Monad(liftM, liftM2, foldM, (>=>))
import qualified Data.Map as M
import qualified Data.Sequence as S
import qualified Data.Traversable as T
import Data.List(foldl', foldl1')
import Data.IORef
import Data.Foldable (foldrM, foldlM)
import Control.Monad.Reader
import Control.Monad.Error
import Control.Monad.Cont
import Control.Monad.State
import System.Environment(getArgs)
import System.Exit
import Debug.Trace

import Wy.Parser
import Wy.Interpr
import Wy.Types
import Wy.FileIO

-- Main definition function, used to import all primitives in the running
-- environment.

defWy ps = do
  env <- ask
  defName <- extractId $ head ps
  case last ps of
    (WyStmt [WyApplic (WyId n _) [WyString primName] pos]) | n == "primitive" -> do
      case M.lookup primName $ primitives M.empty of
        Nothing -> throwError $ ArgumentErr ("Unknown primitive referenced in def: " ++ primName) pos
        Just x  -> liftIO $ varUpdate env defName x
    x -> do params <- mapM extractId $ tail $ init ps
            let wl = WyLambda params (last ps) env
            liftIO $ varInsert defName wl env
            return wl

primitives f = arithmPrim $ basePrim $ dataPrim $ packagePrim $ metaPrim $ stdIOPrim $ fileIOPrim f

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

  defp "`" (\ps -> liftM pruneAST $ unescapeBq . head $ ps) $
  defp "isa?" (\ps -> liftM WyBool $ liftM2 wyIsA (eval $ head ps) (evalSnd ps)) $
  defp "if" (\ps -> do
    expr <- eval $ head ps
    if (truthy expr)
      then evalSnd ps
      else if length ps < 3 then return WyNull else evalSnd $ tail ps) $

  defp "defined?" (\ps -> do
    env <- ask
    vid <- extractName $ head ps
    val <- liftIO $ varValue vid env
    return $ maybe (WyBool False) (const $ WyBool True) val ) $

  defp "eval" (\ps -> do
   liftM (parseWy "<eval>") (eval (head ps) >>= asString) >>= evalWy ) $

  defp "evalWy" (eval . head >=> evalWy) $

  defp "apply" (\ps -> do
    env <- ask
    fnNm <- extractName $ head ps
    fn   <- liftIO $ varValue fnNm env
    fstP <- evalWy . head $ tail ps
    lstP <- astList fstP
    case fn of
      Just f  -> case lstP of
                   Just l  -> apply l f
                   Nothing -> apply (fstP : (tail . tail) ps) f
      Nothing -> get >>= (appErr $ "Unknown function: " ++ fnNm) ) $

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

  where astList (WyRef r)  = liftIO (readIORef r) >>= astList
        astList (WyList l) = return $ Just l
        astList x          = return $ Nothing
  
        extractInt (WyInt i) = return i
        extractInt x = get >>= appErr1 (\x -> x ++ " isn't an integer value") x
        
        wyFold foldFn ps = do
          fn   <- eval $ head ps
          init <- evalSnd ps
          arr  <- eval $ last ps
          case arr of
            (WyList a)   -> foldFn (\x acc -> applyDirect fn [x, acc]) init a
            (WyString s) -> foldFn (\x acc -> applyDirect fn [x, acc]) init (map (WyString . (:[])) s)
            x            -> get >>= appErr1 (\x -> "Can't fold on " ++ x) x

        handleErr [] err = throwError err
        handleErr (p:ps) err = do
          catch <- eval p >>= readArrRef
          merr  <- matchErr catch err
          case merr of
            Just res -> return res
            Nothing  -> handleErr ps err

        -- matchErr caught thrown
        matchErr (WyList ((WyMap m):xs)) (UnknownRef s _) = sysErr m xs s "UnknownRef"
        matchErr (WyList ((WyMap m):xs)) (ArgumentErr s _) = sysErr m xs s "ArgumentError"
        matchErr (WyList ((WyMap m1):xs)) (UserErr wm@(WyMap m2))
          | M.member (WyString "type") m1 &&  M.member (WyString "type") m2 
              = let c = M.lookup (WyString "type") m1
                    t = M.lookup (WyString "type") m2
                in case (c, t) of 
                  (Just cv, Just tv) | cv == tv -> liftM Just $ applyCatch (last xs) [wm]
                  otherwise -> return Nothing
        matchErr (WyList ((WyList (e:es)):xs)) err = do
          xe <- liftIO $ readRef e
          m  <- matchErr (WyList (xe:xs)) err
          case m of
            Just x  -> return $ Just x
            Nothing -> matchErr (WyList ((WyList es):xs)) err
        matchErr (WyList (x:xs)) ue@(UserErr y) 
          | x == y    = liftM Just $ applyCatch (last xs) [y]
        matchErr _ _ = return Nothing

        applyCatch WyNull xs = return WyNull
        applyCatch fn xs = applyDirect fn xs

        readArrRef (WyList l) = liftM WyList $ mapReadRef l
        readArrRef x          = error $ "Expected a list but didn't get one, a bug " ++ (show x)

        sysErr m xs msg errstr = do
          v <- liftIO . readRef $ M.findWithDefault WyNull (WyString "type") m
          if (v == WyString errstr)
            then liftM Just $ applyDirect (last xs) 
              [WyMap $ M.insert (WyString "message") (WyString $ errstr ++ ": " ++ msg) m]
            else return Nothing

arithmPrim f = 
  defp "+" (opEvalM wyPlus) $
  defp "-" (opEvalM wyMinus) $
  defp "*" (opEvalM wyMult) $
  defp "/" (opEvalM wyDiv) $
  defp "!" (\ps -> liftM (WyBool . not . truthy) (eval $ ps !! 0)) $
  defp "==" (opEval $ boolComp (==)) $
  defp "!=" (opEval $ boolComp (/=)) $
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
  defp "M" (\ps ->
    if odd $ length ps
      then get >>= appErr "Odd number of arguments in map constructor."
      else evalToAssoc ps >>= newWyRef . WyMap . M.fromList ) $
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
    stickToList (flip (++) . (:[])) arr val "push (<<)" ) $
  defp ">>" (\ps -> do 
    val <- eval $ head ps
    arr <- evalSnd ps
    stickToList (:) arr val "cons (>>)" ) $
  defp "push!" (\ps -> do 
    ref <- evalWy $ head ps
    val <- evalWy (last ps)
    arr <- liftIO (readRef ref)
    newVal <- stickToList (flip (++) . (:[])) arr val "push!"
    case ref of
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
               x -> get >>= appErr1 (\x -> "Can't check the length of ") x
        wyLength = WyInt .toInteger . length
  
        elemAt ((WyList xs), (WyInt n)) = elemInArr xs n id
        elemAt ((WyString s), (WyInt n)) = elemInArr s n (WyString . (:[]))
        elemAt ((WyMap m), k) = return $ maybe WyNull id $ M.lookup k m
        elemAt (c, n) = get >>= appErr2 (\x y -> "Can't access element " ++ x ++ " in " ++ y) n c
        elemInArr xs n fn = 
          if m >= length xs || m < -(length xs)
            then return WyNull
            else return $ fn $ xs !! if m >= 0 then m else length xs + m
          where m = fromInteger n
        evalAtParams ps = do obj <- eval $ head ps
                             case obj of
                               (WyMap _) -> do lid <- extractName $ last ps
                                               return (obj, WyString lid)
                               x         -> liftM ((,) obj) (eval $ last ps)

        updatedVal (WyList xs) (WyInt n) val = -- sparse list 
          WyList $ takeOrFill (fromInteger n) xs ++ [val] ++ drop ((fromInteger n)+1) xs
        updatedVal (WyString s) (WyInt n) (WyString ns) = 
          WyString $ take (fromInteger n) s ++ ns ++ drop ((fromInteger n)+1) s
        updatedVal (WyMap m) (WyId i _) v = WyMap $ M.insert (WyString i) v m
        updatedVal x y _ = error $ "Can't update an element in " ++ show x ++ " at position " ++ show y
        takeOrFill n xs = if (length xs > n) then take n xs
                                             else take n xs ++ take (n - length xs) (repeat WyNull)

        stickToList fn (WyList xs) val _ = return $ WyList (fn val xs)
        stickToList fn (WyString xs) (WyString val) _ = return $ WyString (xs ++ val)
        stickToList _ x val errstr = get >>= appErr ("Can't " ++ errstr ++ " value " ++ show val ++ " in " ++ show x)

        -- assumes even number of arguments (faster to check before)
        evalToAssoc (x1:x2:xs) = liftM2 (:) (liftM2 (,) (eval x1) (evalWy x2)) $ evalToAssoc xs
        evalToAssoc [] = return []

packagePrim f =
  defp "module" (\ps -> do
    env  <- ask
    name <- extractId $ head ps
    xmod <- liftIO $ varValue name env
    -- If the module already exists, extending it
    menv <- liftIO $ do
      importFrm <- envAddMod True M.empty M.empty env
      case xmod of
        Just (WyModule _ mvars mmacs) -> envAdd mvars mmacs importFrm
        Nothing                       -> envAdd M.empty M.empty importFrm

    -- An executing module has 2 frames, one for the module definitions, one
    -- for eventual imports (don't want to mix to avoid transitivity)
    local (const menv) $ evalSnd ps
    let modfrm = S.index menv 0
    macfrm <- liftIO . readIORef $ frameMacros modfrm
    varfrm <- liftIO . readIORef $ frameVars modfrm

    -- Only the definitions frame is captured
    liftIO $ varUpdate env name (WyModule name varfrm macfrm) ) $
  
  defp "import" (\ps -> do
    mod <- eval $ head ps
    env <- ask
    -- Updating module import frame
    let frm = if S.length env > 1
                then let sndFrame = S.index env 1
                     in if isModuleFrame sndFrame then sndFrame else S.index env 0
                else S.index env 0
    liftIO $ updateFrame (frameVars frm) (frameMacros frm) mod
    return mod ) $

  defp "::" (\ps -> do
    env <- ask
    mod <- eval $ head ps
    vid <- extractName . head $ tail ps
    return $ readInMod mod vid
  ) f

  where updateFrame varsRef macsRef (WyModule _ mvars mmacs) = do
          varfrm <- readIORef varsRef
          macfrm <- readIORef macsRef
          writeIORef varsRef $ M.union mvars varfrm
          writeIORef macsRef $ M.union mmacs macfrm

        readInMod (WyModule _ mvars mmacs) n = maybe WyNull id $ M.lookup n mvars


metaPrim f =
  defp "applic?" (\ps -> do 
    applic <- eval $ head ps
    case applic of
      WyStmt [WyApplic _ _ _] -> return $ WyBool True
      WyApplic _ _ _          -> return $ WyBool True
      _                       -> return $ WyBool False) $
  defp "params" (\ps -> do
    applic <- eval $ head ps 
    case applic of
      WyStmt [WyApplic _ ps _] -> return $ WyList ps
      WyApplic _ ps _          -> return $ WyList ps
      _                        -> get >>= appErr "Not a function application.") $

  defp "fnName" (\ps -> do
    applic <- eval $ head ps 
    case applic of
      WyStmt [WyApplic (WyId n _) _ _] -> return $ WyString n
      WyApplic (WyId n _) _ _          -> return $ WyString n
      _ -> get >>= appErr "Not a function application or no obvious name.") $

  defp "nthParam" (\ps -> do
    applic <- eval $ head ps 
    idx <- evalSnd ps >>= asInt
    case applic of
      (WyStmt [WyApplic _ ps _]) ->  return $ ps !! fromInteger idx
      WyApplic _ ps _            ->  return $ ps !! fromInteger idx
      x -> get >>= appErr1 (\e -> "Not a function application: " ++ e) x ) $
  
  defp "splitBlock" (\ps -> do
    block <- eval $ head ps
    case block of
      WyBlock stmts -> return $ WyList stmts
      ts@(WyStmt _) -> return $ WyList [ts]
      x -> get >>= appErr1 (\e -> "Not a block or a statement: " ++ e) x ) $
  
  defp "splitStmt" (\ps -> do
    block <- eval $ head ps
    case block of
      WyStmt xs -> return $ WyList xs
      x         -> get >>= appErr1 (\e -> "Not a statement: " ++ e) x ) $
 
  defp "wyId" (\ps -> do
    idstr <- eval $ head ps
    asstr <- asString idstr
    return $ WyId asstr NoPos ) $
 
  defp "identifier?" (\ps -> do 
    id <- eval $ head ps
    case id of
      WyId _ _ -> return $ WyBool True
      x        -> return $ WyBool False ) f

stdIOPrim f =
  defp "print" (\ps -> do eps <- mapM eval ps 
                          str <- concatWyStr eps
                          liftIO $ putStrLn str
                          return WyNull ) $
  defp "arguments" (\ps -> liftM (WyList . map WyString . safeTail) (liftIO getArgs) ) $
  defp "load" (\ps -> do
    fname <- eval (head ps) >>= stringOrShow
    fcnt <- liftIO $ readFile fname
    eval $ parseWy fname fcnt ) $
  defp "exit" (\ps -> do
    code <- if length ps == 0 then eval (head ps) >>= asInt
                              else return 0
    if code == 0 then liftIO $ exitWith ExitSuccess
                 else liftIO $ exitWith $ ExitFailure (fromInteger code) ) f
  
  where concatWyStr s = liftM concat $ mapM stringOrShow s
        stringOrShow (WyString s) = return s
        stringOrShow anyWy = liftIO $ showWy anyWy
        safeTail [] = []
        safeTail (x:xs) = xs

--
-- Common support functions

defp n l = M.insert n (WyPrimitive n l)

extractName (WyId i _) = return i
extractName (WyStmt [x]) = extractName x
extractName (WyString s) = return s
extractName x = do
  vstr <- eval x
  case vstr of
    (WyString s) -> return s
    _ -> get >>= appErr1 (\x -> "Non identifier or name value when one was expected: ") x
        
evalSnd = eval . head . tail

asInt (WyInt i) = return i
asInt x         = get >>= appErr1 (\y -> "An int was expected, got " ++ y) x

asList (WyList l) = return l
asList x          = get >>= appErr1 (\y -> "A list was expected, got " ++ y) x

asString (WyString s) = return s
asString x          = get >>= appErr1 (\y -> "A string was expected, got " ++ y) x

unescapeBq :: WyType -> Eval WyType
unescapeBq ai@(WyId i _) | i !! 0 == '$' = do
  env <- ask
  res <- liftIO $ varValue (tail i) env
  case res of
    Just v  -> return v
    Nothing -> return ai
unescapeBq (WyList ss) = mapUnxBq WyList ss
unescapeBq (WyMap m) = liftM WyMap $ T.mapM unescapeBq m
unescapeBq (WyApplic n1 [WyStmt [WyApplic (WyId n2 _) [p] _]] pos) | n2 == "$^" = do
  newn <- unescapeBq n1
  ps   <- eval p >>= asList
  return $ WyApplic newn ps pos
unescapeBq (WyApplic (WyId n _) ps _) | n == "$" = evalWy (ps !! 0)
unescapeBq (WyApplic n ps pos) = do
  newn  <- unescapeBq n
  newps <- mapM unescapeBq ps 
  return $ WyApplic newn newps pos
unescapeBq (WyStmt xs) = mapUnxBq WyStmt xs
unescapeBq (WyBlock xs) = mapUnxBq WyBlock xs
unescapeBq x = return x
mapUnxBq c e = liftM c $ mapM unescapeBq e
