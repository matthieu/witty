{-# LANGUAGE ExistentialQuantification #-}
{-# LANGUAGE RankNTypes #-}

import System.Environment(getArgs)
import Control.Monad(liftM, liftM2)
import Data.List(intercalate, foldl1', (\\))
import Data.Char(toLower)
import qualified Data.Sequence as S
import Data.Sequence ((><), (<|), (|>))
import qualified Data.Map as M
import Data.STRef
import Control.Monad.ST

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
            | WyLambda [String] ASTType WyEnv
            | WyPrim WyPrimitive
    deriving (Show, Eq, Ord)
            
data WyPrimitive = WyPrimitive String (forall s. [ASTType] -> STRef s WyEnv -> ST s WyType)
wyP n = WyPrim . WyPrimitive n

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
showWy (WyLambda ss ast env) = "lambda(" ++ (show ss) ++ ", " ++ (show ast) ++ ") in " ++ (show env)

data Frame = Frame {
    frameVars :: M.Map String WyType
  } deriving (Show, Eq, Ord)

type WyEnv = S.Seq Frame

envInsert' name value env = S.update 0 (fstFrameUpdate name value env) env

envLookup' name env | S.null env = Nothing
                    | otherwise = case fstFrameLookup name env of
                                    Just value -> Just value
                                    Nothing -> envLookup' name $ S.drop 1 env

envUpdate' name value env = 
  case envUpdate'' name value env 0 of
    Just (frame, idx) -> S.update idx frame env
    Nothing -> envInsert' name value env
  where 
    envUpdate'' _ _ env _ | S.null env = Nothing
    envUpdate'' name value env index | otherwise = 
      case fstFrameLookup name env of
        Just value -> Just (fstFrameUpdate name value env, index)
        Nothing -> envUpdate'' name value (S.drop 1 env) (index+1)

fstFrameUpdate name value env = Frame $ M.insert name value $ frameVars $ S.index env 0
fstFrameLookup name env = M.lookup name $ frameVars $ S.index env 0

envMutate env value fn = do envd <- readSTRef env
                            writeSTRef env $ fn envd
                            return value
envQuery env fn = do envd <- readSTRef env
                     return $ fn envd

envInsert name value env = do val <- value 
                              envMutate env val $ envInsert' name val
envUpdate name value env = envMutate env value $ envUpdate' name value
envLookup name env = envQuery env $ envLookup' name

envStack :: [String] -> [WyType] -> WyEnv -> ST s (STRef s WyEnv)
envStack params values env = do newEnv <- newSTRef $ extend params values env
                                return newEnv
  where extend params values env = (Frame $ M.fromList $ zip params values) <| env

--
-- Interpreter

parseWy input = case (parse wyParser "(unknown)" input) of
                  Right out -> out
                  Left msg -> error $ "Parsing error: " ++ (show msg)

eval:: STRef s WyEnv -> ASTType -> ST s WyType

eval _ (ASTBlock []) = error "empty block!"
eval env (ASTBlock xs) = last $ map (eval env) xs

eval _ (ASTStmt []) = error "empty statement!"
eval env (ASTStmt xs) = last $ map (eval env) xs

eval env (ASTApplic fn ps) = (liftM valOrErr $ envLookup fn env) >>= apply ps env
  where valOrErr m = case m of
                         Just wy -> wy
                         Nothing -> error $ "Unknown function: " ++ fn

eval _ (ASTId idn) | idn == "true" = return $ WyBool True
eval _ (ASTId idn) | idn == "false" = return $ WyBool False
eval _ (ASTId idn) | idn == "null" = return $ WyBool False
eval env (ASTId idn) | otherwise = liftM valOrErr $ envLookup idn env
  where valOrErr m = case m of
                       Just wy -> wy
                       Nothing -> error $ "Unknown symbol: " ++ idn

eval env (ASTList xs) = liftM WyList $ mapM (eval env) xs

eval _ ASTNull = return WyNull
eval _ (ASTBool b) = return $ WyBool b
eval _ (ASTFloat f) = return $ WyFloat f 
eval _ (ASTInt i) = return $ WyInt i
eval _ (ASTString s) = return $ WyString s

apply vals env (WyPrim (WyPrimitive n fn)) = fn vals env
apply vals env (WyLambda params ast lenv) = 
  do envCopy <- readSTRef env -- saving current env, todo: tail calls
     nes <- newEnvStack env params vals lenv
     nes' <- readSTRef nes
     writeSTRef env nes'
     res <- eval env ast
     writeSTRef env envCopy -- restoring env
     return res
  where newEnvStack env params vals lenv = evalVals env vals >>= ((flip $ envStack params) lenv)
        evalVals env vals = mapM (eval env) vals

apply ps env other = error $ "Don't know how to apply: " ++ show other


--
-- Primitives definition

primitives frame = arithmPrim . basePrim $ frame

basePrim f = 
  M.insert "lambda" (wyP "lambda" $ \ps env -> liftM (WyLambda (map extractId $ init ps) (last ps)) (readSTRef env)) $
  M.insert "=" (wyP "=" $ \ps env -> envInsert (extractId . head $ ps) (eval env . head . tail $ ps) env) f
  where extractId (ASTBlock [ASTStmt [ASTId i]]) = i
        extractId x = error $ "Non identifier lvalue in = " ++ (show x)

arithmPrim f = 
  M.insert "+" (wyP "+" $ opEval (+)) $
  M.insert "-" (wyP "-" $ opEval (-)) $
  M.insert "*" (wyP "*" $ opEval (*)) $
  M.insert "/" (wyP "/" $ opEval (/)) $
  M.insert "==" (wyP "==" $ opEval boolEq) $
  M.insert "&&" (wyP "&&" $ boolEval (&&)) $
  M.insert "||" (wyP "||" $ boolEval (||)) f
  where opEval op = \ps env -> liftM (foldl1' op) (mapM (eval env) ps)
        boolEval op = \ps env -> liftM (WyBool . foldl1' op) (mapM (liftM truthy . eval env) ps)
        boolEq a b = WyBool (a == b)

---
-- REPL

runEval env p = runST (do runEnv <- newSTRef env
                          res <- eval runEnv p
                          newEnv <- readSTRef runEnv
                          return (res, newEnv))

repl env = do 
  line <- readline "> "
  case line of
    Nothing -> repl env
    Just l | l == "q"  -> return () 
           | otherwise -> do addHistory l
                             let p = parseWy l
                             let e = runEval env p
                             putStrLn $ (showWy . fst $ e) ++ " - " ++ (show p)
                             repl $ snd e
 
mhead []      = Nothing
mhead (x:xs)  = Just x

main = do params <- getArgs
          case mhead params of
            Just x -> do cnt <- readFile x
                         putStrLn cnt
            Nothing -> repl $ S.empty |> (Frame $ primitives M.empty)

