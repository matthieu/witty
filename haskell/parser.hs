module Wy.Parser
  ( ASTType(..), 
    wyParser, 
    pruneAST
  ) where

import qualified Data.Map as M
import qualified Data.Sequence as S
import Control.Monad(liftM)

import Text.ParserCombinators.Parsec
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language(javaStyle)

--
-- AST Nodes

data ASTType = ASTString String
                | ASTInt Integer
                | ASTFloat Double
                | ASTBool Bool
                | ASTNull
                | ASTList [ASTType]
                | ASTMap (M.Map ASTType ASTType)
                | ASTId String
                | ASTApplic ASTType [ASTType]
                | ASTStmt [ASTType]
                | ASTBlock [ASTType]
    deriving (Show, Eq, Ord)

--
-- Parser definition

wyParser = whitespace >> block >>= \x -> eof >> return x

block = liftM ASTBlock $ stmt `sepEndBy1` eol

stmt = liftM ASTStmt $ assocOrAtom

assocOrAtom = try assoc <|> liftM (:[]) atom -- todo unary operators ! and -

assoc = do ls <- atom
           rs <- opStmt
           return $ ls : rs

atom = parens stmt <|> compound

opStmt = do { op <- operator; s <- assocOrAtom; return $ (ASTId op) : s }

compound = idOrApplic <|> literalList <|> literalMap 
          <|> literalNumber <|> literalString <|> literalBool

idOrApplic = do idr <- idRef
                appl <- applicOrNull
                case appl of
                  [] -> return idr
                  [x]  -> return $ chainedApplics idr x
  where chainedApplics n ps = foldl ASTApplic n ps
  
applicOrNull = do try (symbol "(")
                  res <- commaSep (cr >> block)
                  symbol ")"
                  rest <- many $ parens (commaSep (cr >> block))
                  return [res:rest]
               <|> return []

idRef = liftM ASTId $ (identifier <|> operator)

literalList = liftM ASTList $ brackets (commaSep stmt)

literalMap = liftM (ASTMap . M.fromList) $ braces (commaSep keyVal)
  where keyVal = do key <- parseMapKey
                    colon
                    value <- stmt
                    return (key, value)
        parseMapKey = literalString <|> (liftM ASTString $ identifier)

literalString = liftM ASTString $ stringLiteral

literalNumber = try literalFloat <|> literalInt -- todo negative floats
literalInt = liftM ASTInt $ integer
literalFloat = liftM ASTFloat $ float
literalBool = (symbol "true" >> (return $ ASTBool True))
          <|> (symbol "false" >> (return $ ASTBool False))

eol = many1 $ (lexeme . many1 . oneOf $ ";\n") >> skipChar '\n'
cr = skipChar '\n'

skipChar = lexeme . skipMany . char

--
-- Lexer

lexer = P.makeTokenParser wyDef
wyDef = javaStyle { 
          P.identStart = letter <|> oneOf "`$",
          P.identLetter = alphaNum <|> oneOf "!#$%&?@\\^~`",
          P.opStart = P.opLetter wyDef,
          P.opLetter = oneOf "!#%&*+./<=>?@\\^|-~",
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
