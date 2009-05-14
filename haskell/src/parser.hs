module Wy.Parser
  ( parseWy,
    pruneAST
  ) where

import qualified Data.Map as M
import qualified Data.Sequence as S
import Control.Monad(liftM)

import Text.ParserCombinators.Parsec
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language(javaStyle)
import Debug.Trace

import Wy.Types

parseWy f input = pruneAST $ case (parse wyParser f input) of
                               Right out -> out
                               Left msg -> error $ "Parsing error: " ++ (show msg)
--
-- Parser definition

wyParser = whitespace >> block >>= \x -> eof >> return x

block = liftM WyBlock $ stmt `sepEndBy1` eol

parensBlock = parens (try cr >> block)

stmt = liftM WyStmt $ assocOrComp

assocOrComp = do c <- compound
                 a <- assoc
                 return (c:a)

assoc = do op <- try operator
           rv <- assocOrComp
           ppos <- getPosition
           return $ (WyId op $ convertSPos ppos) : rv
        <|> return []

compound = literals <|> idOrApplic

literals = literalList <|> literalMap <|> literalNumber <|> literalString

idOrApplic = do idr <- try idRef <|> parensBlock
                try (idOnly idr) <|> applic idr

-- optimizing by enumerating chars instead of full parser primitives
idOnly idr = notFollowed (oneOf "({[\"'" <|> digit <|> P.identStart wyDef) >> return idr

applic fn = do
  ppos <- getPosition
  ps <- try (string "()" >> return []) <|> params
  return $ WyApplic fn ps $ convertSPos ppos

params = liftM concat $ (many1 (try idRef <|> literals <|> parensBlock)) `sepBy1` (symbol "\\" >> cr)

idRef = do
  ppos <- getPosition
  id <- identifier <|> parens operator
  return $ WyId id $ convertSPos ppos 

literalList = liftM WyList $ brackets (commaSep stmt)

literalMap = liftM (WyMap . M.fromList) $ braces (commaSep keyVal)
  where keyVal = do key <- parseMapKey
                    colon
                    value <- stmt
                    return (key, value)
        parseMapKey = literalString <|> (liftM WyString $ identifier)

literalString = liftM WyString $ (stringLiteral <|> charString)

literalNumber = try literalFloat <|> literalInt
literalInt = liftM WyInt $ lexeme decimal
literalFloat = liftM WyFloat $ float

charString = lexeme (
    between (char '\'') (char '\'' <?> "end of string") (many characterChar)
  <?> "character")

characterChar = charLetter <?> "literal character"

charLetter = satisfy (\c -> (c /= '\'') && (c /= '\\') && (c > '\026'))

eol = many1 $ (lexeme . many1 . oneOf $ ";\n") >> skipChar '\n'
cr = skipChar '\n'

skipChar = skipMany . lexeme . char

notFollowed p = try ( do { c <- p; unexpected (show [c]) } <|> return () )

-- Parsec source pos to wy
convertSPos psp = WySourcePos (toInteger $ sourceLine psp) (toInteger $ sourceColumn psp) (sourceName psp)

--
-- Lexer

lexer = P.makeTokenParser wyDef
wyDef = javaStyle { 
          P.identStart = letter <|> oneOf "`$",
          P.identLetter = alphaNum <|> oneOf "!#$%&?@^~`_",
          P.opStart = P.opLetter wyDef,
          P.opLetter = oneOf "!#%&*+./<=>?@^|-~:",
          P.caseSensitive = True,
          P.isBlank = (\ch -> ch == ' ' || ch == '\t' || ch == '\r')
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
decimal = P.decimal lexer
float = P.float lexer
symbol = P.symbol lexer
semi = P.semi lexer
lexeme = P.lexeme lexer
whitespace = P.whiteSpace lexer

--
-- AST "optimizer"

pruneAST (WyBlock [single]) = pruneAST single

pruneAST (WyBlock ss) = WyBlock $ map pruneAST ss
pruneAST (WyStmt [single]) | isApplic single = WyStmt $ [pruneAST single]
                           | otherwise       = pruneAST single
pruneAST (WyStmt ss) = WyStmt $ map pruneAST ss 
pruneAST (WyApplic s ps pos) = WyApplic (pruneAST s) (map pruneAST ps) pos
pruneAST (WyList xs) = WyList $ map pruneAST xs
pruneAST (WyMap m) = WyMap $ M.mapKeys pruneAST . M.map pruneAST $ m
pruneAST x = x

isApplic (WyApplic _ _ _) = True
isApplic _                = False
