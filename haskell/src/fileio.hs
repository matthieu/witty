module Wy.FileIO
  ( fileIOPrim
  ) where

import qualified Data.Map as M
import Control.Monad(liftM)
import Control.Monad.Trans

import System.Directory (doesDirectoryExist, doesFileExist, removeFile,
                         getCurrentDirectory, getDirectoryContents)
import System.FilePath (dropTrailingPathSeparator, splitFileName, (</>))

import Wy.Types
import Wy.Interpr

fileIOPrim = dirExist . fileExist . wyReadFile . wyWriteFile . wyAppendFile . wyDeleteFile

dirExist = defp "dirExist?" $ doOnFile WyBool doesDirectoryExist
fileExist = defp "fileExist?" $ doOnFile WyBool doesFileExist

wyReadFile = defp "readFile" $ doOnFile WyString readFile
wyWriteFile = defp "writeFile" $ updateFile writeFile
wyAppendFile = defp "appendFile" $ updateFile appendFile
wyDeleteFile = defp "deleteFile" $ doOnFile (const WyNull) removeFile

doOnFile constr fn ps = liftM constr $ eval (head ps) >>= asString >>= liftIO . fn

updateFile updFn ps = do
  f <- eval (head ps) >>= asString
  cnt <- eval (head $ tail ps) >>= asString
  liftIO $ updFn f cnt
  return WyNull

defp n l = M.insert n (WyPrimitive n l)

asString (WyString s) = return s
asString x            = appErr1 (\y -> "A string was expected, got " ++ y) x
