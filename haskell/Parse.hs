{-# LANGUAGE ExistentialQuantification #-}
{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE TypeSynonymInstances #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

import System.Environment(getArgs)
import Control.Monad(liftM, liftM2)
import Data.List(intercalate, foldl1', foldl', (\\), sortBy)
import Data.Char(toLower, isSpace)
import Data.Ord(comparing)
import qualified Data.Sequence as S
import Data.Sequence ((><), (<|), (|>))
import qualified Data.Map as M
import qualified Data.Traversable as T
import qualified Data.Foldable as F (foldrM) 
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
                | ASTApplic ASTType [ASTType]
                | ASTStmt [ASTType]
                | ASTBlock [ASTType]
    deriving (Show, Eq, Ord)

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

-- idOrApplic = try applic <|> idRef -- todo fix error swallow with applic
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

--lexer = lexer' { P.whiteSpace = skipMany (satisfy (\c -> isSpace c && c /= '\n')) }

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

-- AST optimizer

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

--
-- Language types and supporting function

data WyError = UnknownRef s
             | Undef s
    deriving (Eq, Ord, Show)

instance Error WyError where
  noMsg  = Undef "Undefined error. Sucks to be you."
  strMsg = Undef

newType Eval a = E ErrorT WyError IO a

data WyType = WyString String
            | WyInt Integer
            | WyFloat Double
            | WyBool Bool
            | WyNull
            | WyUndefined -- purely internal type representing undefined symbols
            | WyRef { extractRef:: (IORef WyType) }
            | WyList [WyType] -- todo change to sequence / todo use reference
            | WyMap (M.Map WyType WyType) -- todo use reference as value
            | WyTemplate ASTType
            | WyLambda WyL
            | WyMacro { macroPattern:: ASTType, macroBody:: ASTType, macroPriority:: Integer, macroEnv:: WyEnv }
            | WyPrim WyPrimitive
    deriving (Show, Eq, Ord)
            
data WyPrimitive = WyPrimitive String ([ASTType] -> WyEnv -> Eval WyType)
wyP n = WyPrim . WyPrimitive n

data WyL = WyL [String] ASTType WyEnv
wyL ss ast = WyLambda . WyL ss ast

readRef (WyRef r) = readIORef r
readRef x         = return x

truthy (WyBool s) = s
truthy WyNull = False
truthy _ = True

instance Num WyType where
  WyString s1 + WyString s2 = WyString (s1 ++ s2)
  WyInt i1 + WyInt i2 = WyInt (i1 + i2)
  WyFloat f1 + WyFloat f2 = WyFloat (f1 + f2)
  WyInt i1 + WyFloat f2 = WyFloat ((fromInteger i1) + f2)
  WyFloat f1 + WyInt i2 = WyFloat (f1 + (fromInteger i2))
  WyList l1 + WyList l2 = WyList (l1 ++ l2)
  WyString s1 + x = WyString (s1 ++ show x)
  x + WyString s1 = WyString (show x ++ s1)
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
instance Show (IORef WyType) where
  show x = "<ref>"
instance Ord (IORef WyType) where
  x <= y = True

wyToAST (WyString s) = ASTString s
wyToAST (WyInt i) = ASTInt i
wyToAST (WyFloat f) = ASTFloat f
wyToAST (WyBool b) = ASTBool b
wyToAST WyNull = ASTNull
wyToAST (WyList ss) = ASTList $ map wyToAST ss
wyToAST (WyMap m) = ASTMap $ M.mapKeys wyToAST . M.map wyToAST $ m
wyToAST (WyTemplate t) = t
wyToAST (WyLambda (WyL ss ast env)) = ASTApplic (ASTId "lambda") (map ASTId ss ++ [ast])
wyToAST (WyPrim (WyPrimitive n _)) = ASTId n

showWy (WyString s) = showRet s
showWy (WyInt s) = showRet $ s
showWy (WyFloat s) = showRet s
showWy (WyBool b) = return $ (toLower . head) bs : tail bs
  where bs = show b
showWy WyNull = return "null"
showWy (WyRef r) = readIORef r >>= showWy
showWy (WyList s) = liftM (\x -> "[" ++ (intercalate "," x) ++ "]") $ mapM showWy s
showWy (WyMap s) = showRet s
showWy (WyTemplate ast) = return $ "`(" ++ (show ast) ++ ")"
showWy (WyLambda (WyL ss ast env)) = return $ "lambda(" ++ (show ss) ++ ", " ++ (show ast) ++ ")"
showWy (WyMacro p b _ env) = return $ "macro(" ++ (show p) ++ ", " ++ (show b) ++ ")"
showWy (WyPrim (WyPrimitive n _)) = return $ "<primitive " ++ (show n) ++ ">"

showRet:: (Monad m, Show x) => x -> m String
showRet = return . show

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

envUpdate name value env lookupFn insertFn = do
  val <- lookupFn name env
  case val of
    Just ref -> writeIORef ref value >> return value
    Nothing -> insertFn name value env
envUpdateVar name value env = envUpdate name value env envLookupVar envInsertVar
envUpdateMacro name value env = envUpdate name value env envLookupMacro envInsertMacro

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
matchList [] _ f = f
matchList _ _ _ = Nothing

findMacros :: (Num a) => [ASTType] -> a -> WyEnv -> IO [(WyType, a)]
findMacros [] num env = return []
findMacros ((ASTId x):xs) num env = lookupMacro x xs num env
findMacros ((ASTApplic (ASTId n) _):xs) num env = lookupMacro n xs num env
findMacros (x:xs) num env = findMacros xs (num+1) env
lookupMacro n xs num env = 
  do m <- envLookupMacro n env
     case m of
       Just res -> do t <- findMacros xs (num+1) env
                      v <- readIORef res
                      return $ (v, num) : t
       Nothing -> findMacros xs (num+1) env

matchMacro :: [ASTType] -> WyEnv -> (WyType, Int) -> IO (Maybe (WyType, Int, Frame))
matchMacro stmt env (m@(WyMacro p b _ e), idx) = matchOffset [-1, 0, 1] stmt p idx
  where matchOffset (offs:offss) stmt mi idx = 
          if offs + idx >= 0
              then case patternMatch mi (ASTStmt $ drop (offs + idx) stmt) (Just M.empty) of
                      Just f -> do fr <- toFrame f env
                                   return $ Just (m, idx, fr)
                      Nothing -> matchOffset offss stmt mi idx
              else matchOffset offss stmt mi idx
        matchOffset [] stmt mi idx = return Nothing
        toFrame b env = liftM (flip Frame $ M.empty) $ T.mapM (toTemplateRef env) b
        toTemplateRef env exp = newIORef $ WyTemplate exp

runMacro :: WyType -> Frame -> WyEnv -> Eval WyType
runMacro m f env = do newEnv <- envAdd f env
                      res <- eval newEnv $ macroBody m
                      return res

rewriteStmt :: [ASTType] -> (WyType, Int, [ASTType]) -> ([ASTType], Int)
rewriteStmt stmt (m , idx, nast) =
  let startIdx = idx - (fst $ macroPivot m)
      newOffs = length nast - macroPattLgth m   
  in (take startIdx stmt ++ nast ++ drop (startIdx + macroPattLgth m) stmt, newOffs)
                                                 
macroPattLgth m = 
  case macroPattern m of
    (ASTStmt es)    -> length es
    (ASTApplic _ _) -> 1
    _               -> error $ "Bad macro pattern: " ++ (show $ macroPattern m)

macroPivot :: (Num t) => WyType -> (t, String)
macroPivot (WyMacro p b _ e) = firstNonVar p
  where firstNonVar (ASTStmt [ASTApplic (ASTId n) _]) = (0, n)
        firstNonVar (ASTStmt es) = firstNonVar' es 0
        firstNonVar' ((ASTId i):es) idx | i !! 0 /= '`' = (idx, i)
        firstNonVar' [] idx = error $ "No pivot found in macro pattern " ++ (show p)
        firstNonVar' (e:es) idx = firstNonVar' es (idx+1)
-- liftM (macroPivot . (WyMacro (ASTStmt [ASTId "`a", ASTId "+", ASTId "`b"]) ASTNull)) (newIORef $ S.empty |> (Frame M.empty))
-- liftM (macroPivot . (WyMacro (ASTApplic "foo" []) ASTNull)) (newIORef $ S.empty |> (Frame M.empty))

applyMacros :: [ASTType] -> WyEnv -> IO [ASTType]
applyMacros stmt env = liftM (map pruneAST) $ liftM orderFound (findMacros stmt 0 env) >>= rewriteMatch stmt
  where rewriteMatch stmt [] = return stmt
        rewriteMatch stmt (mi@(m,idx):ms) = do
          matchM <- matchMacro stmt env mi
          case matchM of
            Just match -> do newStmt <- liftM (rewriteStmt stmt) $ runMatch match
                             putStrLn $ show newStmt
                             rewriteMatch (fst newStmt) $ updIndexes idx (snd newStmt) ms
            Nothing -> rewriteMatch stmt ms
        runMatch (m, idx, f) = do res <- runMacro m f env
                                  return (m, idx, [wyToAST res])
        orderFound ms = sortBy (comparing priority) $ ms
                        where priority = ((-)0) . macroPriority . fst
        updIndexes p offs [] = []
        updIndexes p offs ((m, idx):ms) = (m, if idx > p then idx+offs else idx) : updIndexes p offs ms

--
-- Interpreter

parseWy input = pruneAST $ case (parse wyParser "(unknown)" input) of
                             Right out -> out
                             Left msg -> error $ "Parsing error: " ++ (show msg)

eval :: WyEnv -> ASTType -> IO (Either WyType)

eval env (ASTBlock xs) = leftOrLast env xs

-- todo alter the AST instead of constantly rewriting it
eval env (ASTStmt xs) = applyMacros xs env >>= leftOrLast env

eval env (ASTApplic fn ps) = eval env fn >>= apply ps env

eval _ (ASTId idn)   | idn == "true" = rR $ WyBool True
eval _ (ASTId idn)   | idn == "false" = rR $ WyBool False
eval _ (ASTId idn)   | idn == "null" = rR $ WyNull
eval env (ASTId idn) | otherwise = 
  liftM (maybe (Left $ "Unknown reference: " ++ idn) Right) $ envLookupVar idn env

eval env (ASTList xs) = liftM (either Left (Right . WyList)) $ leftOrArr xs
eval env (ASTMap m) = liftM (either Left (Right . WyMap . M.fromList)) $ leftOrHash (M.toList m)

eval _ ASTNull = rR WyNull
eval _ (ASTBool b) = rR $ WyBool b
eval _ (ASTFloat f) = rR $ WyFloat f 
eval _ (ASTInt i) = rR $ WyInt i
eval _ (ASTString s) = rR $ WyString s

rR = return . Right

leftOrLast (x:xs) = do
  res <- eval env x
  case res of
    Right r -> leftOrLast xs
    Left r  -> return $ Left r
leftOrLast [x] = eval env x

leftOrArr (x:xs) = do
  res <- eval env x
  case res of
    Right r -> liftM (Right . (r :) . either (error "Impossible!") id) leftOrArr xs
    Left r  -> return $ Left r
leftOrArr [] = []

leftOrHash ((xk,vx):xs) = do
  res <- liftM2 (,) (eval env xk) (eval env xv)
  case res of
    (Right rk, Right rv) -> liftM (Right . ((rk, rv) :) . either (error "Impossible!") id) leftOrArr xs
    (Left rk, _)  -> return $ Left rk
    (_, Left rv)  -> return $ Left rv
leftOrArr [] = []

apply:: [ASTType] -> WyEnv -> WyType -> IO (Maybe WyType)
apply vals env (WyPrim (WyPrimitive n fn)) = fn vals env
apply vals env wl@(WyLambda _) =
  mapM (eval env) vals >>= applyDirect env wl
apply ps env other = error $ "Don't know how to apply: " ++ show other

applyDirect env (WyLambda (WyL params ast lenv)) evals =
  let newEnv = envStack params evals lenv
  in newEnv >>= (flip eval) ast

evalNoRef env ast = eval env ast >>= readRef

maybeErr m msg = case m of
                    Just wy -> wy
                    Nothing -> error msg

--
-- Primitives definition

primitives f = arithmPrim f >>= basePrim >>= stdIOPrim >>= dataPrim >>= metaPrim
 
basePrim f = 
  liftInsert "lambda" (\ps env -> return $ wyL (map extractId $ init ps) (last ps) env) f >>=
  liftInsert "macrop" (\ps env -> let m = WyMacro (head ps) (last ps) (extractInt $ ps !! 1) env
                                      n = snd . macroPivot $ m
                                  in do envUpdateMacro n m env
                                        return $ WyString n ) >>=
  liftInsert "=" (\ps env -> (evalSnd env ps) >>= (flip $ envUpdateVar (extractId . head $ ps)) env) >>=
  liftInsert "=" (\ps env -> do
    
  
  (evalSnd env ps) >>= (flip $ envUpdateVar (extractId . head $ ps)) env) >>=
  liftInsert "`" (\ps env -> liftM WyTemplate $ unescapeBq env . head $ ps) >>=
  liftInsert "if" (\ps env -> do
    expr <- eval env . head $ ps
    if (truthy expr) 
      then evalSnd env ps
      else if length ps < 3 then return WyNull else evalSnd env . tail $ ps) >>=
  liftInsert "for" (\ps env -> 
    if length ps /= 2 
      then error "not implemented yet"
      else do list <- eval env (head ps)
              lambda <- eval env (last ps)
              wyFold (applySeq env lambda) (return WyNull) list )

  where extractInt (ASTInt i) = i
        extractInt x = error $ (show x) ++ " isn't an integer value"
        evalSnd env = eval env . head . tail
        applySeq env l elmt acc = applyDirect env l [elmt]
        wyFold f z (WyList xs) = foldl' (\x xs -> x >>= f xs) z xs
        wyFold f z (WyString xs) = foldl' (\x xs -> x >>= f xs) z (map (WyString . (:"")) xs)

-- todo |> and <| to return a new array with a new value at its beginning / end
dataPrim f =
  liftInsert "empty?" (\ps env -> 
    onContainers ps env (WyBool . null) (WyBool . null) (WyBool . M.null) ) f >>=
  liftInsert "length" (\ps env -> 
    onContainers ps env wyLength wyLength (WyInt . toInteger . M.size) ) >>=
  liftInsert "reverse" (\ps env -> 
    onContainers ps env (WyList . reverse) (WyString . reverse) (WyMap . id) ) >>=
  liftInsert "@" (\ps env -> 
    liftM elemAt $ evalAtParams ps env ) >>=
  liftInsert "@!" (\ps env -> do oldVal <- eval env $ head ps
                                 let idx = ps !! 1
                                 newVal <- eval env $ last ps
                                 let updVal = updatedVal oldVal idx newVal
                                 envUpdateVar (extractId $ head ps) updVal env
                                 return newVal ) >>=
  liftInsert "<<" (\ps env -> do 
    arr <- eval env $ head ps
    val <- evalNoRef env (last ps)
    newVal <- liftM (flip push $ val) $ readRef arr
    case head ps of
      (ASTId n) -> writeIORef (extractRef arr) newVal >> return newVal
      x         -> return newVal )

  where onContainers ps env fnl fns fnm = 
          do e <- eval env $ head ps
             case e of
               (WyList l) -> return . fnl $ l
               (WyString s) -> return . fns $ s
               (WyMap m) -> return . fnm $ m
               x -> error $ "Can't check the length of " ++ show x
        wyLength = WyInt .toInteger . length
  
        elemAt ((WyList xs), (WyInt n)) = elemInArr xs n id
        elemAt ((WyString s), (WyInt n)) = elemInArr s n (WyString . (:[]))
        elemAt ((WyMap m), k) = maybe WyNull id $ M.lookup k m
        elemAt (c, n) = error $ "Can't access element " ++ show n ++ " in " ++ show c
        elemInArr xs n fn = 
          if m >= length xs || m < -(length xs)
            then WyNull
            else fn $ xs !! if m >= 0 then m else length xs + m
          where m = fromInteger n
        evalAtParams ps env = do obj <- eval env $ head ps
                                 case obj of
                                   (WyMap _) -> return (obj, WyString . extractId . last $ ps)
                                   x         -> liftM ((,) obj) (eval env $ last ps)

        updatedVal (WyList xs) (ASTInt n) val = -- sparse list 
          WyList $ takeOrFill (fromInteger n) xs ++ [val] ++ drop ((fromInteger n)+1) xs
        updatedVal (WyString s) (ASTInt n) (WyString ns) = 
          WyString $ take (fromInteger n) s ++ ns ++ drop ((fromInteger n)+1) s
        updatedVal (WyMap m) (ASTId i) v = WyMap $ M.insert (WyString i) v m
        updatedVal x y _ = error $ "Can't update an element in " ++ show x ++ " at position " ++ show y
        takeOrFill n xs = if (length xs > n) then take n xs
                                             else take n xs ++ take (n - length xs) (repeat WyNull)

        push (WyList xs) val = WyList (xs ++ [val])
        push (WyString xs) (WyString val) = WyString (xs ++ val)
        push x val = error $ "Can't push value " ++ (show val) ++ " in " ++ (show x)

arithmPrim f = 
  liftInsert "+" (opEval (+)) f >>=
  liftInsert "-" (opEval (-)) >>=
  liftInsert "*" (opEval (*)) >>=
  liftInsert "/" (opEval (/)) >>=
  liftInsert "!" (\ps env -> liftM (WyBool . not . truthy) (eval env $ ps !! 0)) >>=
  liftInsert "==" (opEval $ boolComp (==)) >>=
  liftInsert "<=" (opEval $ boolComp (<=)) >>=
  liftInsert ">=" (opEval $ boolComp (>=)) >>=
  liftInsert "<" (opEval $ boolComp (<)) >>=
  liftInsert ">" (opEval $ boolComp (>)) >>=
  liftInsert "&&" (boolEval (&&) (return True) False) >>=
  liftInsert "||" (boolEval (||) (return False) True)

  where opEval op ps env = if length ps == 1 
                             then liftM (op 0) $ eval env (head ps)
                             else liftM (foldl1' op) (mapM (eval env) ps)
        boolEval op init stop ps env = liftM WyBool $ foldr (boolContinue op env stop) init (reverse ps)
        boolContinue op env stop p accM = do acc <- accM
                                             if acc == stop then return acc
                                                            else liftM (op acc . truthy) $ eval env p
        boolComp c a b = WyBool (c a b)

metaPrim f =
  liftInsert "applic?" (\ps env -> do 
    applic <- eval env $ head ps
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ _])) -> return $ WyBool True
      _                                      -> return $ WyBool False) f >>=
  liftInsert "params" (\ps env -> do
    applic <- eval env $ head ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ ps])) -> return $ WyList $ map WyTemplate ps
      _                                       -> error "Not a function application.") >>=

  liftInsert "fnName" (\ps env -> do
    applic <- eval env $ head ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic (ASTId n) _])) -> return $ WyString n
      (WyTemplate (ASTStmt [ASTApplic  _ _]))        -> error "Function application has no simple name."
      _                                              -> error "Not a function application.") >>=

  liftInsert "nthParam" (\ps env -> do
    applic <- eval env $ head ps 
    idx <- eval env $ head . tail $ ps 
    case applic of
      (WyTemplate (ASTStmt [ASTApplic _ ps])) -> 
        case idx of 
          (WyInt i) -> return . WyTemplate $ ps !! fromInteger i
          _         -> error "Index parameter passed to nthParam isn't an int."
      x                                       -> error $ "Not a function application: " ++ (show x))

stdIOPrim f =
  liftInsert "print" (\ps env -> do eps <- mapM (eval env) ps 
                                    concatWyStr eps >>= putStrLn
                                    return WyNull ) f >>=
  liftInsert "arguments" (\ps env -> liftM (WyList . map WyString . safeTail) getArgs ) >>=
  liftInsert "load" (\ps env -> eval env (head ps) >>= literalStr >>= readFile >>= eval env . parseWy)
  where concatWyStr s = liftM concat $ mapM literalStr s
        literalStr (WyString s) = return s
        literalStr anyWy = showWy anyWy
        safeTail [] = []
        safeTail (x:xs) = xs

liftInsert name lambda map = liftM (flip (M.insert name) $ map) (wyPIO name lambda)
  where wyPIO n l = newIORef $ wyP n l
  
extractId (ASTId i) = i
extractId (ASTStmt [ASTId i]) = i
extractId x = error $ "Non identifier value when one was expected: " ++ (show x)

unescapeBq :: WyEnv -> ASTType -> IO ASTType
unescapeBq env ai@(ASTId i) | i !! 0 == '$' = do
  res <- envLookupVar (tail i) env
  case res of
    Just v  -> liftM wyToAST $ readIORef v
    Nothing -> return ai
unescapeBq env (ASTList ss) = liftM ASTList $ mapM (unescapeBq env) ss
unescapeBq env (ASTMap m) = liftM ASTMap $ T.mapM (unescapeBq env) m
unescapeBq env (ASTApplic (ASTId n) ps) | n == "$" = liftM wyToAST $ eval env (ps !! 0)
unescapeBq env (ASTApplic n ps) = liftM2 ASTApplic (unescapeBq env n) $ mapM (unescapeBq env) ps
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

wyInterpr env = runEval env . parseWy

repl env = do 
  line <- readline "> "
  case line of
    Nothing -> repl env
    Just l | l == "q"  -> return () 
           | otherwise -> do addHistory l
                             e <- wyInterpr env l
                             (showWy . fst $ e) >>= putStrLn
                             repl $ snd e
 
mhead []      = Nothing
mhead (x:xs)  = Just x

main = do params <- getArgs
          p <- primitives M.empty
          let blankEnv = S.empty |> (Frame p M.empty)
          ast <- liftM parseWy (readFile "foundation.wy")
          env <- liftM snd $ readFile "foundation.wy" >>= wyInterpr blankEnv
          case mhead params of
            Just x -> do cnt <- readFile x
                         runEval env . parseWy $ cnt
                         return ()
            Nothing -> repl env

