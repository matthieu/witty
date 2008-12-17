{-# LANGUAGE ExistentialQuantification #-}
{-# LANGUAGE RankNTypes #-}

import System.Environment(getArgs)
import Control.Monad(liftM, liftM2)
import Data.List(intercalate, foldl1', (\\))
import Data.Char(toLower)
import qualified Data.Sequence as S
import Data.Sequence ((><), (<|), (|>))
import qualified Data.Map as M
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
          P.identLetter = alphaNum <|> oneOf "!#$%&?@\\^~",
          P.opStart = P.opLetter wyDef,
          P.opLetter = oneOf "!#$%&*+./<=>?@\\^|-~",
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

--
-- Types and Environment

data WyType = WyString String
            | WyInt Integer
            | WyFloat Double
            | WyBool Bool
            | WyNull
            | WyList [WyType]
            | WyMap (M.Map WyType WyType)
            | WyLambda WyL
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

showWy (WyString s) = show s
showWy (WyInt s) = show s
showWy (WyFloat s) = show s
showWy (WyBool s) = map toLower $ show s
showWy WyNull = "null"
showWy (WyList s) = "[" ++ (intercalate "," $ map showWy s) ++ "]"
showWy (WyMap s) = show s
showWy (WyLambda (WyL ss ast env)) = "lambda(" ++ (show ss) ++ ", " ++ (show ast) ++ ")"
showWy (WyPrim (WyPrimitive n _)) = "<primitive " ++ (show n) ++ ">"

type WyEnv = IORef (S.Seq Frame)

data Frame = Frame {
    frameVars :: M.Map String (IORef WyType)
  }

envLookup :: String -> WyEnv -> IO (Maybe (IORef WyType))
envLookup name env = do envVal <- readIORef env
                        return $ envLookup' name envVal
  where envLookup' name env | S.null env = Nothing
                            | otherwise = case fstFrameLookup name env of
                                            Just value -> Just value
                                            Nothing -> envLookup' name $ S.drop 1 env
        fstFrameLookup name env = M.lookup name $ frameVars $ S.index env 0

envInsert :: String -> WyType -> WyEnv -> IO WyType
envInsert name value env = do val <- newIORef value
                              envVal <- readIORef env
                              writeIORef env $ envInsert' name val envVal
                              return value
  where envInsert' name value env = S.update 0 (fstFrameUpdate name value env) env
        fstFrameUpdate name value env = Frame $ M.insert name value $ frameVars $ S.index env 0


envUpdate :: String -> WyType -> WyEnv -> IO WyType
envUpdate name value env = do
  val <- envLookup name env
  case val of
    Just ref -> writeIORef ref value >> return value
    Nothing -> envInsert name value env

envStack :: [String] -> [WyType] -> WyEnv -> IO (IORef (S.Seq Frame))
envStack params values env = do envVal <- readIORef env
                                valRefs <- mapM newIORef values
                                writeIORef env $ extend params valRefs envVal
                                return env
  where extend params values env = ((<| env) . Frame . M.fromList . (zip params)) values

--
-- Interpreter

parseWy input = case (parse wyParser "(unknown)" input) of
                  Right out -> out
                  Left msg -> error $ "Parsing error: " ++ (show msg)

eval :: WyEnv -> ASTType -> IO WyType

eval _ (ASTBlock []) = error "empty block!"
eval env (ASTBlock xs) = last $ map (eval env) xs

eval _ (ASTStmt []) = error "empty statement!"
eval env (ASTStmt xs) = last $ map (eval env) xs

eval env (ASTApplic fn ps) = do valMaybe <- envLookup fn env
                                valRef <- readIORef $ valOrErr valMaybe
                                foo <- apply ps env valRef
                                putStrLn $ show foo ++ " - " ++ show ps
                                return foo
  where valOrErr m = case m of
                         Just wy -> wy
                         Nothing -> error $ "Unknown function: " ++ fn

eval _ (ASTId idn) | idn == "true" = return $ WyBool True
eval _ (ASTId idn) | idn == "false" = return $ WyBool False
eval _ (ASTId idn) | idn == "null" = return $ WyBool False
eval env (ASTId idn) | otherwise = do valMaybe <- envLookup idn env
                                      let valRef = valOrErr valMaybe
                                      readIORef valRef
  where valOrErr m = case m of
                       Just wy -> wy
                       Nothing -> error $ "Unknown symbol: " ++ idn

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
  liftInsert "=" (\ps env -> (evalSnd env ps) >>= (flip $ envUpdate (extractId . head $ ps)) env) >>=
  liftInsert "if" (\ps env -> do
    expr <- eval env . head $ ps
    if (truthy expr) 
      then evalSnd env ps
      else evalSnd env . tail $ ps)
  where extractId (ASTBlock [ASTStmt [ASTId i]]) = i
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
                          repl $ S.empty |> (Frame p)

