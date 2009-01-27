import Data.IORef
import qualified Data.Sequence as S
import System.Console.Readline
import System.Environment(getArgs)
import Data.Sequence ((|>))
import qualified Data.Map as M
import Control.Monad(liftM)

import Wy.Parser
import Wy.Types
import Wy.Prim
import Wy.Interpr(eval)

doEval :: S.Seq Frame -> ASTType -> IO (Either WyError WyType, S.Seq Frame)
doEval env p = do 
  runEnv <- newIORef env
  res <- runEval (eval p) runEnv
  newEnv <- readIORef runEnv
  return (res, newEnv)

wyInterpr env = doEval env . parseWy

repl env = do 
  line <- readline "> "
  case line of
    Nothing -> repl env
    Just l | l == "q"  -> return () 
           | otherwise -> do addHistory l
                             e <- wyInterpr env l
                             case fst e of
                               Right w -> (showWy w) >>= putStrLn
                               Left e  -> putStrLn (show e)
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
                         doEval env . parseWy $ cnt
                         return ()
            Nothing -> repl env

