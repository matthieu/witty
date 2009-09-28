module Main() where

import Data.IORef
import qualified Data.Sequence as S
import Data.Char (isSpace)
import Data.Sequence ((|>))
import qualified Data.Map as M

import System.Console.Readline
import System.Environment(getArgs)
import Control.Monad(liftM, (>=>))
import Debug.Trace

import Wy.Foundation
import Wy.Parser
import Wy.Types
import Wy.Prim
import Wy.Interpr(eval, evalWy)

--doEval :: S.Seq Frame -> WyType -> IO (Either WyError WyType, S.Seq Frame)
doEval env p = do 
  res <- runEval (evalWy p) env NoPos (return . nopos)
  return (res, env)

nopos (Right (res,pos)) = Right res
nopos (Left err) = Left err

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

trim = trimR . trimR  
  where trimR = reverse . dropWhile isSpace

main = do params <- getArgs
          p <- newIORef $ M.insert "def" (WyPrimitive "def" ["name", "params~", "body"] defWy) M.empty
          m <- newIORef M.empty
          let blankEnv = S.empty |> Frame p m False
          e <-  wyInterpr blankEnv "foundation" foundationText
          either (putStrLn . show) (const $ return ()) $ fst e
          let env = snd e
          case mhead params of
            Just x -> do cnt <- readFile x
                         e <- wyInterpr env x (trim cnt)
                         either (putStrLn . show) (const $ return ()) $ fst e
            Nothing -> repl env

