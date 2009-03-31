module Wy.Parser
  ( ASTType(..),
    parseWy,
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

block = liftM ASTBlock $ stmt `sepEndBy1` eol

stmt = liftM ASTStmt $ assocOrComp

-- this can probably be optimized, the failure scenario parses atom twice
assocOrComp = try assoc <|> liftM (:[]) compound

assoc = do lv <- compound
           op <- operator
           rv <- assocOrComp
           return $ lv : (ASTId op) : rv

compound = literals <|> idOrApplic <|> parens block

literals = literalList <|> literalMap <|> literalNumber <|> literalString

idOrApplic =  try ( do { idr <- idRef; notFollowed compound; return idr } ) 
              <|> do { fn <- try idRef <|> parens block; ps <- many1 (try idRef <|> literals <|> parens block); return $ ASTApplic fn ps }

notFollowed p  = try (do{ c <- p; unexpected (show [c]) }
                       <|> return () )

idRef = liftM ASTId (identifier <|> parens operator)

literalList = liftM ASTList $ brackets (commaSep stmt)

literalMap = liftM (ASTMap . M.fromList) $ braces (commaSep keyVal)
  where keyVal = do key <- parseMapKey
                    colon
                    value <- stmt
                    return (key, value)
        parseMapKey = literalString <|> (liftM ASTString $ identifier)

literalString = liftM ASTString $ (stringLiteral <|> charString)

literalNumber = try literalFloat <|> literalInt -- todo negative floats
literalInt = liftM ASTInt $ integer
literalFloat = liftM ASTFloat $ float

charString = lexeme ( do {
    str <- between (char '\'')
                   (char '\'' <?> "end of string")
                   (many characterChar)
    ; return str
  } <?> "character")

characterChar = charLetter <?> "literal character"

charLetter = satisfy (\c -> (c /= '\'') && (c /= '\\') && (c > '\026'))

eol = many1 $ (lexeme . many1 . oneOf $ ";\n") >> skipChar '\n'
cr = skipChar '\n'

skipChar = lexeme . skipMany . char

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
float = P.float lexer
symbol = P.symbol lexer
semi = P.semi lexer
lexeme = P.lexeme lexer
whitespace = P.whiteSpace lexer

--
-- AST "optimizer"

pruneAST (ASTBlock [single]) = pruneAST single

pruneAST (ASTBlock ss) = ASTBlock $ map pruneAST ss
pruneAST (ASTStmt [single]) | isApplic single = ASTStmt $ [pruneAST single]
                            | otherwise       = pruneAST single
pruneAST (ASTStmt ss) = ASTStmt $ map pruneAST ss 
pruneAST (ASTApplic s ps) = ASTApplic (pruneAST s) $ map pruneAST ps
pruneAST (ASTList xs) = ASTList $ map pruneAST xs
pruneAST (ASTMap m) = ASTMap $ M.mapKeys pruneAST . M.map pruneAST $ m
pruneAST x = x

isApplic (ASTApplic _ _) = True
isApplic _               = False
