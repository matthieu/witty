import System.Environment(getArgs)
import Control.Monad(liftM, liftM2)
import Data.List(intercalate, (\\))
import qualified Data.Map as M

import Text.ParserCombinators.Parsec
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language(javaStyle)

--
-- AST nodes

data NativeType = WyString String
                | WyInt Integer
                | WyFloat Double
                | WyBool Bool
                | WyList [NativeType]
                | WyMap (M.Map NativeType NativeType)
                | WyId String
                | WyApplic String [NativeType]
                | WyStmt [NativeType]
                | WyBlock [NativeType]
    deriving (Show, Eq, Ord)

instance Num NativeType where
  WyString s1 + WyString s2 = WyString (s1 ++ s2)
  WyInt i1 + WyInt i2 = WyInt (i1 + i2)
  WyFloat f1 + WyFloat f2 = WyFloat (f1 + f2)
  WyInt i1 + WyFloat f2 = WyFloat ((fromInteger i1) + f2)
  WyFloat f1 + WyInt i2 = WyFloat (f1 + (fromInteger i2))
  WyList l1 + WyList l2 = WyList (l1 ++ l2)
  x1 + x2 = error ("can't add " ++ (show x1) ++ " and " ++ (show x2))

  WyString s1 - WyString s2 = WyString (s1 \\ s2)
  WyInt i1 - WyInt i2 = WyInt (i1 - i2)
  WyFloat f1 - WyFloat f2 = WyFloat (f1 - f2)
  WyInt i1 - WyFloat f2 = WyFloat ((fromInteger i1) - f2)
  WyFloat f1 - WyInt i2 = WyFloat (f1 - (fromInteger i2))
  WyList l1 - WyList l2 = WyList (l1 \\ l2)
  x1 - x2 = error ("can't add " ++ (show x1) ++ " and " ++ (show x2))

  WyInt i1 * WyInt i2 = WyInt (i1 * i2)
  WyFloat f1 * WyFloat f2 = WyFloat (f1 * f2)
  x1 * x2 = error ("can't multiply " ++ (show x1) ++ " and " ++ (show x2))

  abs (WyInt i1) = WyInt (abs i1)
  abs (WyFloat f1) = WyFloat (abs f1)
  abs x1 = error ("can't calculate absolute of " ++ (show x1))

  -- todo array difference
  signum (WyInt i1) = WyInt (signum i1)
  signum (WyFloat f1) = WyFloat (signum f1)
  signum x1 = error ("can't calculate the sign of " ++ (show x1))

  fromInteger intg = WyInt intg

instance Fractional NativeType where
  WyInt i1 / WyInt i2 = WyFloat ((fromInteger i1) / (fromInteger i2))
  WyFloat f1 / WyFloat f2 = WyFloat (f1 / f2)
  WyInt i1 / WyFloat f2 = WyFloat ((fromInteger i1) / f2)
  WyFloat f1 / WyInt i2 = WyFloat (f1 / (fromInteger i2))
  x1 / x2 = error ("can't divide " ++ (show x1) ++ " and " ++ (show x2))

  fromRational r = WyFloat (fromRational r)

--toNum :: (Num a) => NativeType -> a
--toNum (WyInt i) = i
--toNum (WyFloat f) = f
--toNum x = error ("Not a number: " ++ (showWy x))

--
-- Parser

wyParser = whitespace >> root

root = liftM WyBlock $ stmt `sepBy1` (eol <|> semi)

stmt = liftM WyStmt $ many1 compound

compound = idOrApplic <|> literalList <|> literalMap 
          <|> literalNumber <|> literalString <|> literalBool

idOrApplic = try applic <|> idRef -- todo fix error swallow with applic

idRef = liftM WyId $ (identifier <|> operator)
applic = liftM2 WyApplic (identifier <|> operator) $ parens (commaSep root)

literalList = liftM WyList $ brackets (commaSep root)

literalMap = liftM (WyMap . M.fromList) $ braces (commaSep keyVal)
  where keyVal = do key <- parseMapKey
                    colon
                    value <- root
                    return (key, value)
        parseMapKey = literalString <|> (liftM WyString $ identifier)

literalString = liftM WyString $ stringLiteral

literalNumber = try literalFloat <|> literalInt -- todo negative floats
literalInt = liftM WyInt $ integer
literalFloat = liftM WyFloat $ float
literalBool = (symbol "true" >> (return $ WyBool True))
          <|> (symbol "false" >> (return $ WyBool False))

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
-- Interpreter

parseWy input = case (parse wyParser "(unknown)" input) of
                  Right out -> out
                  Left msg -> error $ "Parsing error: " ++ (show msg)

eval:: NativeType -> NativeType

eval (WyBlock []) = error "empty block!"
eval (WyBlock xs) = last $ map eval xs

eval (WyStmt []) = error "empty statement!"
eval (WyStmt xs) = last $ map eval xs

eval (WyList xs) = WyList $ map eval xs

--eval (WyApplic fn ps) = foldir1 (($) . (envLookup fn)) ps
eval (WyApplic fn ps) = applyPrimitive fn ps

eval x = id x

applyPrimitive fn ps = case fn of
                          "+" -> foldr1 (+) (map eval ps)
                          "-" -> foldr1 (-) (map eval ps)
                          "*" -> foldr1 (*) (map eval ps)
                          "/" -> foldr1 (/) (map eval ps)

showWy (WyString s) = show s
showWy (WyInt s) = show s
showWy (WyFloat s) = show s
showWy (WyBool s) = show s
showWy (WyList s) = "[" ++ (intercalate "," $ map showWy s) ++ "]"
showWy (WyMap s) = show s

---
-- REPL

repl = do putStr "> "
          line <- getLine
          let p = parseWy line
          putStrLn $ (showWy (eval p)) ++ " - " ++ (show p)
          if line /= "q"
            then repl
            else return ()

mhead []      = Nothing
mhead (x:xs)  = Just x

main = do params <- getArgs
          case mhead params of
            Just x -> do cnt <- readFile x
                         putStrLn cnt
            Nothing -> repl
