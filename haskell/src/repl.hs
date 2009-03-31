module Main() where

import Data.IORef
import qualified Data.Sequence as S
import System.Console.Readline
import System.Environment(getArgs)
import Data.Sequence ((|>))
import qualified Data.Map as M
import Control.Monad(liftM, (>=>))
import Debug.Trace

--import Wy.Foundation
import Wy.Parser
import Wy.Types
import Wy.Prim
import Wy.Interpr(eval, evalWy)

doEval :: S.Seq Frame -> ASTType -> IO (Either WyError WyType, S.Seq Frame)
doEval env p = do 
  res <- runEval (evalWy p) env return
  return (res, env)

wyInterpr env f = doEval env . parseWy f

repl env = do 
  line <- readline "> "
  case line of
    Nothing -> repl env
    Just l | l == "q"  -> return () 
           | otherwise -> do addHistory l
                             e <- wyInterpr env "(unknown)" l
                             either (putStrLn . show) (showWy >=> putStrLn) $ fst e
                             repl $ snd e
 
mhead []      = Nothing
mhead (x:xs)  = Just x

main = do params <- getArgs
          p <- newIORef $ M.insert "def" (WyPrimitive "def" defWy) M.empty
          m <- newIORef M.empty
          let blankEnv = S.empty |> Frame p m False
--          e <-  wyInterpr blankEnv "foundation" foundationText
--          either (putStrLn . show) (const $ return ()) $ fst e
--          let env = snd e
          let env = blankEnv
          case mhead params of
            Just x -> do cnt <- readFile x
                         print $ parseWy x cnt
                         e <- wyInterpr env x cnt
                         either (putStrLn . show) (const $ return ()) $ fst e
            Nothing -> repl env

