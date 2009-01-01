{-# LANGUAGE ExistentialQuantification #-}
{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE TypeSynonymInstances #-}

import System.Environment(getArgs)
import Control.Monad(liftM, liftM2)
import Data.List(intercalate, foldl1', (\\))
import Data.Char(toLower)
import qualified Data.Sequence as S
import Data.Sequence ((><), (<|), (|>))
import qualified Data.Map as M
import qualified Data.Traversable as T
import Data.IORef

import System.Console.Readline
import Text.ParserCombinators.Parsec
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language(javaStyle)

--
-- AST Nodes and Parser

data ASTType = ASTString String
                | ASTInt Integer
                | ASTFloat Double
                | ASTBool Bool
                | ASTNull
                | ASTList [ASTType]
                | ASTMap (M.Map ASTType ASTType)
                | ASTId String
                | ASTApplic String [ASTType]
                | ASTStmt [ASTType]
                | ASTBlock [ASTType]
    deriving (Show, Eq, Ord)

wyParser = whitespace >> root

root = liftM ASTBlock $ stmt `sepBy1` (eol <|> semi)

stmt = liftM ASTStmt $ many1 compound

compound = idOrApplic <|> literalList <|> literalMap 
          <|> literalNumber <|> literalString <|> literalBool

idOrApplic = try applic <|> idRef -- todo fix error swallow with applic

idRef = liftM ASTId $ (identifier <|> operator)
applic = liftM2 ASTApplic (identifier <|> operator) $ parens (commaSep root)

literalList = liftM ASTList $ brackets (commaSep root)

literalMap = liftM (ASTMap . M.fromList) $ braces (commaSep keyVal)
  where keyVal = do key <- parseMapKey
                    colon
                    value <- root
                    return (key, value)
        parseMapKey = literalString <|> (liftM ASTString $ identifier)

literalString = liftM ASTString $ stringLiteral

literalNumber = try literalFloat <|> literalInt -- todo negative floats
literalInt = liftM ASTInt $ integer
literalFloat = liftM ASTFloat $ float
literalBool = (symbol "true" >> (return $ ASTBool True))
          <|> (symbol "false" >> (return $ ASTBool False))

eol = try (string "\r") >> string "\n"

--
-- Lexer

lexer = P.makeTokenParser wyDef
wyDef = javaStyle { 
          P.identStart = letter <|> oneOf "`$",
          P.identLetter = alphaNum <|> oneOf "!#$%&?@\\^~`",
          P.opStart = P.opLetter wyDef,
          P.opLetter = oneOf "!#%&*+./<=>?@\\^|-~",
          P.caseSensitive = True
        }

parens = P.parens lexer
braces = P.braces lexer
brackets = P.brackets lexer
commaSep = P.commaSep lexer
identifier = P.identifier lexer
operator = P.operator lexer
colon = P.colon lexer
stringLiteral = P.stringLiteral lexer
integer = P.integer lexer
float = P.float lexer
symbol = P.symbol lexer
semi = P.semi lexer
whitespace = P.whiteSpace lexer

-- AST optimizer

pruneAST (ASTBlock [single]) = pruneAST single
pruneAST (ASTStmt [single]) = pruneAST single
pruneAST (ASTApplic s ps) = ASTApplic s $ map pruneAST ps
pruneAST (ASTList xs) = ASTList $ map pruneAST xs
pruneAST (ASTMap m) = ASTMap $ M.mapKeys pruneAST . M.map pruneAST $ m
pruneAST x = x

--
-- Language types and supporting function

data WyType = WyString String
            | WyInt Integer
            | WyFloat Double
            | WyBool Bool
            | WyNull
            | WyList [WyType]
            | WyMap (M.Map WyType WyType)
            | WyTemplate ASTType
            | WyLambda WyL
            | WyMacro {
                macroPattern:: ASTType,
                macroBody:: ASTType,
                macroEnv:: WyEnv 
              }
            | WyPrim WyPrimitive
    deriving (Show, Eq, Ord)
            
data WyPrimitive = WyPrimitive String ([ASTType] -> WyEnv -> IO WyType)
wyP n = WyPrim . WyPrimitive n

data WyL = WyL [String] ASTType WyEnv
wyL ss ast = WyLambda . WyL ss ast

instance Num WyType where
  WyString s1 + WyString s2 = WyString (s1 ++ s2)
  WyInt i1 + WyInt i2 = WyInt (i1 + i2)
  WyFloat f1 + WyFloat f2 = WyFloat (f1 + f2)
  WyInt i1 + WyFloat f2 = WyFloat ((fromInteger i1) + f2)
  WyFloat f1 + WyInt i2 = WyFloat (f1 + (fromInteger i2))
  WyList l1 + WyList l2 = WyList (l1 ++ l2)
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

instance Show WyPrimitive where
  show (WyPrimitive n _) = "WyPrimitive " ++ show n
instance Eq WyPrimitive where
  (WyPrimitive n1 _) == (WyPrimitive n2 _) = n1 == n2
instance Ord WyPrimitive where
  (WyPrimitive n1 _) <= (WyPrimitive n2 _) = n1 <= n2
instance Show WyL where
  show (WyL ps ast _) = "WyLambda " ++ show ps ++ " " ++ show ast
instance Eq WyL where
  (WyL ps1 ast1 _) == (WyL ps2 ast2 _) = (ps1 == ps2) && (ast1 == ast2)
instance Ord WyL where
  (WyL ps1 ast1 _) <= (WyL ps2 ast2 _) = (ps1 <= ps2) && (ast1 <= ast2)

truthy (WyBool s) = s
truthy WyNull = False
truthy _ = True

wyToAST (WyString s) = ASTString s
wyToAST (WyInt i) = ASTInt i
wyToAST (WyFloat f) = ASTFloat f
wyToAST (WyBool b) = ASTBool b
wyToAST WyNull = ASTNull
wyToAST (WyList ss) = ASTList $ map wyToAST ss
wyToAST (WyMap m) = ASTMap $ M.mapKeys wyToAST . M.map wyToAST $ m
wyToAST (WyTemplate t) = t
wyToAST (WyLambda (WyL ss ast env)) = ASTApplic "lambda" (map ASTId ss ++ [ast])
wyToAST (WyPrim (WyPrimitive n _)) = ASTId n

showWy (WyString s) = show s
showWy (WyInt s) = show s
showWy (WyFloat s) = show s
showWy (WyBool s) = map toLower $ show s
showWy WyNull = "null"
showWy (WyList s) = "[" ++ (intercalate "," $ map showWy s) ++ "]"
showWy (WyMap s) = show s
showWy (WyTemplate ast) = "`(" ++ (show ast) ++ ")"
showWy (WyLambda (WyL ss ast env)) = "lambda(" ++ (show ss) ++ ", " ++ (show ast) ++ ")"
showWy (WyMacro p b env) = "macro(" ++ (show p) ++ ", " ++ (show b) ++ ")"
showWy (WyPrim (WyPrimitive n _)) = "<primitive " ++ (show n) ++ ">"

-- Environment definition
--

type WyEnv = IORef (S.Seq Frame)

data Frame = Frame {
    frameVars :: M.Map String (IORef WyType),
    macroVars :: M.Map String (IORef WyType)
  }

instance Show WyEnv where show _ = "<env>"
instance Ord WyEnv where _ <= _ = False

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

envUpdate :: String -> WyType -> WyEnv -> IO WyType
envUpdate name value env = do
  val <- envLookupVar name env
  case val of
    Just ref -> writeIORef ref value >> return value
    Nothing -> envInsertVar name value env

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
-- Macro system

patternMatch :: ASTType -> ASTType -> Maybe (M.Map String ASTType) -> Maybe (M.Map String ASTType)

patternMatch _ _ Nothing = Nothing
patternMatch (ASTId s1) (ASTId s2) f | s1 == s2      = f
patternMatch (ASTId s) x (Just f)    | s !! 0 == '`' = Just $ M.insert (tail s) x f

patternMatch (ASTStmt (x1:xs1)) (ASTStmt (x2:xs2)) f = patternMatch x1 x2 $ matchList xs1 xs2 f
patternMatch (ASTStmt [x]) y f = patternMatch x y f
patternMatch (ASTStmt []) (ASTStmt []) f = f

patternMatch (ASTApplic n1 (p1:ps1)) (ASTApplic n2 (p2:ps2)) f | n1 == n2 = patternMatch p1 p2 $ matchList ps1 ps2 f
patternMatch _ _ _ = Nothing

matchList (x1:xs1) (x2:xs2) f = patternMatch x1 x2 $ matchList xs1 xs2 f
matchList [] [] f = f

findMacro :: (Num a) => [ASTType] -> a -> WyEnv -> IO [(WyType, a)]
findMacro [] num env = return []
findMacro ((ASTId x):xs) num env = lookupMacro x xs num env
findMacro ((ASTApplic n _):xs) num env = lookupMacro n xs num env
findMacro (x:xs) num env = findMacro xs (num+1) env
lookupMacro n xs num env = 
  do m <- envLookupMacro n env
     case m of
       Just res -> do t <- findMacro xs (num+1) env
                      v <- readIORef res
                      return $ (v, num) : t
       Nothing -> findMacro xs (num+1) env

matchMacro :: [ASTType] -> WyEnv -> [(WyType, Int)] -> IO [(WyType, Int, Frame)]
matchMacro stmt _ [] = return []
matchMacro stmt env ((m@(WyMacro p b e), idx):mis) = do
  mo <- matchOffset [-1, 0, 1] stmt p idx
  case mo of
    Just m -> liftM (m :) $ matchMacro stmt env mis
    Nothing -> matchMacro stmt env mis
  where matchOffset (offs:offss) stmt mi idx = 
          if offs + idx >= 0
              then case patternMatch mi (ASTStmt $ drop (offs + idx) stmt) (Just M.empty) of
                      Just f -> do fr <- toFrame f env
                                   return $ Just (m, idx, fr)
                      Nothing -> matchOffset offss stmt mi idx
              else matchOffset offss stmt mi idx
        matchOffset [] stmt mi idx = return Nothing
        toFrame b env = liftM (flip Frame $ M.empty) $ T.mapM (toEvalRef env) b
        toEvalRef env exp = eval env exp >>= newIORef

runMacro :: WyType -> Frame -> WyEnv -> IO WyType
runMacro m f env = do newEnv <- envAdd f env
                      res <- eval newEnv $ macroBody m
                      return res

rewriteStmt :: [ASTType] -> Int -> [(WyType, Int, [ASTType])] -> [ASTType]
rewriteStmt stmt offs [] = stmt
rewriteStmt stmt offs ((m , idx, nast):mres) = 
  rewriteStmt (take startIdx stmt ++ nast ++ drop (startIdx + macroPattLgth m) stmt) newOffs mres
  where startIdx = idx - (fst $ macroPivot m) - offs
        newOffs = offs + length nast - macroPattLgth m 
                                                 
macroPattLgth m = case macroPattern m of
                    (ASTStmt es)    -> length es
                    (ASTApplic _ _) -> 1
                    _               -> error $ "Bad macro pattern: " ++ (show $ macroPattern m)

macroPivot :: (Num t) => WyType -> (t, String)
macroPivot (WyMacro p b e) = firstNonVar p
  where firstNonVar (ASTStmt es) = firstNonVar' es 0
        firstNonVar (ASTApplic n _) = (0, n)
        firstNonVar' ((ASTId i):es) idx | i !! 0 /= '`' = (idx, i)
        firstNonVar' [] idx = error $ "No pivot found in macro pattern " ++ (show p)
        firstNonVar' (e:es) idx = firstNonVar' es (idx+1)
-- liftM (macroPivot . (WyMacro (ASTStmt [ASTId "`a", ASTId "+", ASTId "`b"]) ASTNull)) (newIORef $ S.empty |> (Frame M.empty))
-- liftM (macroPivot . (WyMacro (ASTApplic "foo" []) ASTNull)) (newIORef $ S.empty |> (Frame M.empty))

applyMacros :: [ASTType] -> WyEnv -> IO [ASTType]
applyMacros stmt env = do
  mstruct <- findMacro stmt 0 env >>= matchMacro stmt env
  liftM (rewriteStmt stmt 0) (mapM doRun mstruct)
  where doRun (m, idx, f) = do res <- runMacro m f env
                               return (m, idx, [wyToAST res])

--
-- Interpreter

parseWy input = pruneAST $ case (parse wyParser "(unknown)" input) of
                             Right out -> out
                             Left msg -> error $ "Parsing error: " ++ (show msg)

eval :: WyEnv -> ASTType -> IO WyType

eval _ (ASTBlock []) = error "empty block!"
eval env (ASTBlock xs) = last $ map (eval env) xs

eval _ (ASTStmt []) = error "empty statement!"
eval env (ASTStmt xs) = liftM last $ applyMacros xs env >>= mapM (eval env)

eval env (ASTApplic fn ps) = do valMaybe <- envLookupVar fn env
                                valRef   <- readIORef $ valOrErr valMaybe
                                apply ps env valRef
  where valOrErr m = case m of
                         Just wy -> wy
                         Nothing -> error $ "Unknown function: " ++ fn

eval _ (ASTId idn) | idn == "true" = return $ WyBool True
eval _ (ASTId idn) | idn == "false" = return $ WyBool False
eval _ (ASTId idn) | idn == "null" = return $ WyBool False
eval env (ASTId idn) | otherwise = do valMaybe <- envLookupVar idn env
                                      let valRef = valOrErr valMaybe
                                      readIORef valRef
  where valOrErr m = case m of
                       Just wy -> wy
                       Nothing -> error $ "Unknown reference: " ++ idn

eval env (ASTList xs) = liftM WyList $ mapM (eval env) xs

eval _ ASTNull = return WyNull
eval _ (ASTBool b) = return $ WyBool b
eval _ (ASTFloat f) = return $ WyFloat f 
eval _ (ASTInt i) = return $ WyInt i
eval _ (ASTString s) = return $ WyString s

apply:: [ASTType] -> WyEnv -> WyType -> IO WyType
apply vals env (WyPrim (WyPrimitive n fn)) = fn vals env
apply vals env (WyLambda (WyL params ast lenv)) =
  let newEnv = mapM (eval env) vals >>= (flip $ envStack params) lenv
  in newEnv >>= (flip eval) ast
apply ps env other = error $ "Don't know how to apply: " ++ show other

--
-- Primitives definition

primitives f = arithmPrim f >>= basePrim
 
basePrim f = 
  liftInsert "lambda" (\ps env -> return $ wyL (map extractId $ init ps) (last ps) env) f >>=
  liftInsert "macro" (\ps env -> let m = WyMacro (head ps) (last ps) env
                                     n = snd . macroPivot $ m
                                 in do envInsertMacro n m env
                                       return $ WyString n ) >>=
  liftInsert "=" (\ps env -> (evalSnd env ps) >>= (flip $ envUpdate (extractId . head $ ps)) env) >>=
  liftInsert "`" (\ps env -> liftM WyTemplate $ (unescapeBq env) . head $ ps) >>= -- support $ escaping
  liftInsert "if" (\ps env -> do
    expr <- eval env . head $ ps
    if (truthy expr) 
      then evalSnd env ps
      else evalSnd env . tail $ ps)
  where extractId (ASTId i) = i
        extractId x = error $ "Non identifier lvalue in = " ++ (show x)
        evalSnd env = eval env . head . tail

arithmPrim f = 
  liftInsert "+" (opEval (+)) f >>=
  liftInsert "-" (opEval (-)) >>=
  liftInsert "*" (opEval (*)) >>=
  liftInsert "/" (opEval (/)) >>=
  liftInsert "==" (opEval $ boolComp (==)) >>=
  liftInsert "<=" (opEval $ boolComp (<=)) >>=
  liftInsert ">=" (opEval $ boolComp (>=)) >>=
  liftInsert "<" (opEval $ boolComp (<)) >>=
  liftInsert ">" (opEval $ boolComp (>)) >>=
  liftInsert "&&" (boolEval (&&)) >>=
  liftInsert "||" (boolEval (||))
  where opEval op = \ps env -> liftM (foldl1' op) (mapM (eval env) ps)
        boolEval op = \ps env -> liftM (WyBool . foldl1' op) (mapM (liftM truthy . eval env) ps)
        boolComp c a b = WyBool (c a b)

liftInsert name lambda map = liftM (flip (M.insert name) $ map) (wyPIO name lambda)
  where wyPIO n l = newIORef $ wyP n l

unescapeBq :: WyEnv -> ASTType -> IO ASTType
unescapeBq env (ASTId i) | i !! 0 == '$' = do
  res <- envLookupVar (tail i) env
  case res of
    Just v  -> liftM wyToAST $ readIORef v
    Nothing -> error $ "Unknown unescaped reference: " ++ (show i) 
unescapeBq env (ASTList ss) = liftM ASTList $ mapM (unescapeBq env) ss
unescapeBq env (ASTMap m) = liftM ASTMap $ T.mapM (unescapeBq env) m
unescapeBq env (ASTApplic n ps) = liftM (ASTApplic n) $ mapM (unescapeBq env) ps
unescapeBq env (ASTStmt xs) = liftM ASTStmt $ mapM (unescapeBq env) xs
unescapeBq env (ASTBlock xs) = liftM ASTBlock $ mapM (unescapeBq env) xs
unescapeBq _ x = return x

---
-- REPL

runEval :: S.Seq Frame -> ASTType -> IO (WyType, S.Seq Frame)
runEval env p = do runEnv <- newIORef env
                   res <- eval runEnv p
                   newEnv <- readIORef runEnv
                   return (res, newEnv)

repl :: S.Seq Frame -> IO ()
repl env = do 
  line <- readline "> "
  case line of
    Nothing -> repl env
    Just l | l == "q"  -> return () 
           | otherwise -> do addHistory l
                             let p = parseWy l
                             e <- runEval env p
                             putStrLn $ (showWy . fst $ e) ++ " - " ++ (show p)
                             repl $ snd e
 
mhead []      = Nothing
mhead (x:xs)  = Just x

main = do params <- getArgs
          case mhead params of
            Just x -> do cnt <- readFile x
                         putStrLn cnt
            Nothing -> do p <- primitives M.empty
                          repl $ S.empty |> (Frame p M.empty)

