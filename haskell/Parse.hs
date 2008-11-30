import System.Environment(getArgs)
import Control.Monad(liftM, liftM2)
import Data.List(intercalate, foldl1', (\\))
import Data.Char(toLower)
import qualified Data.Map as M

import System.Console.Readline
import Text.ParserCombinators.Parsec
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language(javaStyle)

--
-- AST nodes

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

--
-- Parser

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
    deriving (Show, Eq, Ord)

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

truthy (WyBool s) = s
truthy WyNull = False
truthy _ = True

showWy (WyString s) = show s
showWy (WyInt s) = show s
showWy (WyFloat s) = show s
showWy (WyBool s) = map toLower (show s)
showWy WyNull = "null"
showWy (WyList s) = "[" ++ (intercalate "," $ map showWy s) ++ "]"
showWy (WyMap s) = show s

data Frame = Frame {
    frameVars :: M.Map String WyType
  }

--
-- Interpreter

parseWy input = case (parse wyParser "(unknown)" input) of
                  Right out -> out
                  Left msg -> error $ "Parsing error: " ++ (show msg)

eval:: ASTType -> WyType

eval (ASTBlock []) = error "empty block!"
eval (ASTBlock xs) = last $ map eval xs

eval (ASTStmt []) = error "empty statement!"
eval (ASTStmt xs) = last $ map eval xs

eval (ASTApplic fn ps) = applyPrimitive fn ps

eval (ASTId idn) | idn == "true" = WyBool True
eval (ASTId idn) | idn == "false" = WyBool False
eval (ASTId idn) | idn == "null" = WyBool False

eval (ASTList xs) = WyList $ map eval xs

eval ASTNull = WyNull
eval (ASTBool b) = WyBool b
eval (ASTFloat f) = WyFloat f 
eval (ASTInt i) = WyInt i
eval (ASTString s) = WyString s

applyPrimitive fn ps = case fn of
                          "+" -> opEval (+)
                          "-" -> opEval (-)
                          "*" -> opEval (*)
                          "/" -> opEval (/)
                          "==" -> opEval boolEq
                          "&&" -> boolEval (&&)
                          "||" -> boolEval (||)
                       where opEval = flip foldl1' (map eval ps)
                             boolEq a b = WyBool (a == b)
                             boolEval op = WyBool $ foldl1' op (map (truthy . eval) ps)

---
-- REPL

repl = do line <- readline "> "
          case line of
            Nothing -> repl
            Just l | l == "q"  -> return () 
                   | otherwise -> do addHistory l
                                     let p = parseWy l
                                     putStrLn $ (showWy (eval p)) ++ " - " ++ (show p)
                                     repl
          
mhead []      = Nothing
mhead (x:xs)  = Just x

main = do params <- getArgs
          case mhead params of
            Just x -> do cnt <- readFile x
                         putStrLn cnt
            Nothing -> repl
