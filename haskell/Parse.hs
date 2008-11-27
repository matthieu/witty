import System.Environment(getArgs)
import Control.Monad(liftM, liftM2)
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

parseWy input = parse wyParser "(unknown)" input

eval = parseWy

--
--REPL

repl = do putStr "> "
          line <- getLine
          putStrLn (show . eval $ line)
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
