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
                | WyBool Bool
                | WyList [NativeType]
                | WyMap (M.Map NativeType NativeType)
                | WyId String
                | WyApplic String [NativeType]
  deriving (Show, Eq, Ord)

--
-- Parser

wyParser = whitespace >> root

root = idOrApplic <|> literalList <|> literalMap 
      <|> literalInt <|> literalString <|> literalBool

idOrApplic = try applic <|> idRef -- todo fix error swallow with applic

idRef = liftM WyId $ identifier
applic = liftM2 WyApplic identifier $ parens (commaSep wyParser)

literalList = liftM WyList $ brackets (commaSep wyParser)

literalMap = liftM (WyMap . M.fromList) $ braces (commaSep keyVal)
  where keyVal = do key <- parseMapKey
                    colon
                    value <- wyParser
                    return (key, value)
        parseMapKey = literalString <|> (liftM WyString $ identifier)

-- fixme escape stuff, symbols and unicode
literalString = liftM WyString $ stringLiteral
literalInt = liftM WyInt $ integer
literalBool = (symbol "true" >> (return $ WyBool True))
          <|> (symbol "false" >> (return $ WyBool False))

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
identifier = P.identifier lexer
brackets = P.brackets lexer
commaSep = P.commaSep lexer
colon = P.colon lexer
stringLiteral = P.stringLiteral lexer
integer = P.integer lexer
symbol = P.symbol lexer
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
