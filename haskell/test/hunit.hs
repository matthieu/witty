import Test.HUnit

import qualified Data.Map as M
import Control.Monad(liftM)

import Wy.Parser
import Wy.Types
import Wy.Interpr

main = runTestTT $ TestList [adjustTests, patternMatchTests]

--
-- Adjustment of parameters on function application for optional and var args

adjustTests = TestList [adjustOptTests, adjustSlurpyTests]

testAdjustEmpty = TestCase $ assertEqual
  "Should be empty with no params" (Just []) $ adjust WyNull WyList [] [] 0
testAdjustFixed = TestCase $ assertEqual
  "Should leave fixed params unchanged" (Just [WyInt 1, WyInt 2]) $ adjust WyNull WyList ["a", "b"] [WyInt 1, WyInt 2] 0
testAdjustFixedErr = TestCase $ assertEqual
  "Should fail for insufficent fixed values" Nothing $ adjust WyNull WyList ["a", "b"] [WyInt 1] 0
testAdjustFixedErr2 = TestCase $ assertEqual
  "Should fail for too many fixed values" Nothing $ adjust WyNull WyList ["a", "b"] [WyInt 1, WyInt 2, WyInt 3] 1
testAdjustOneOpt = TestCase $ assertEqual
  "Should attribute one optional" (Just [WyInt 1, WyInt 2]) $ adjust WyNull WyList ["a", "b?"] [WyInt 1, WyInt 2] 1
testAdjustOneOptMissing = TestCase $ assertEqual
  "Should nullify one missing optional" (Just [WyInt 1, WyNull]) $ adjust WyNull WyList ["a", "b?"] [WyInt 1] 0

testAdjustTwoOpt = TestCase $ assertEqual
  "Should attribute two optionals" (Just [WyInt 0, WyInt 1, WyInt 2]) $ 
  adjust WyNull WyList ["a", "b?", "c?"] [WyInt 0, WyInt 1, WyInt 2] 2
testAdjustTwoOptOneMiss = TestCase $ assertEqual
  "Should attribute one optional, nullify one missing" (Just [WyInt 0, WyInt 1, WyNull]) $ 
  adjust WyNull WyList ["a", "b?", "c?"] [WyInt 0, WyInt 1] 1
testAdjustTwoOptTwoMiss = TestCase $ assertEqual
  "Should nullify two missing optionals" (Just [WyInt 0, WyNull, WyNull]) $ 
  adjust WyNull WyList ["a", "b?", "c?"] [WyInt 0] 0
testAdjustInter = TestCase $ assertEqual
  "Should nullify an intermediate optional" (Just [WyInt 0, WyNull, WyInt 1]) $ 
  adjust WyNull WyList ["a", "b?", "c"] [WyInt 0, WyInt 1] 0
testAdjustTwoInterEnd = TestCase $ assertEqual
  "Should nullify two intermediate optionals" (Just [WyInt 0, WyNull, WyInt 1]) $ 
  adjust WyNull WyList ["a", "b?", "c?", "d"] [WyInt 0, WyInt 1] 0
testAdjustInterEndMissing = TestCase $ assertEqual
  "Should nullify intermediate and ending optionals" (Just [WyInt 0, WyInt 1, WyInt 2, WyNull]) $ 
  adjust WyNull WyList ["a", "b?", "c", "d?"] [WyInt 0, WyInt 1, WyInt 2] 1

adjustOptTests = TestList [testAdjustEmpty, testAdjustFixed, testAdjustFixedErr, testAdjustOneOpt, 
  testAdjustOneOptMissing, testAdjustTwoOpt, testAdjustTwoOptOneMiss, testAdjustTwoOptTwoMiss,
  testAdjustInter]

testAdjustEmptySlurpy = TestCase $ assertEqual
  "Should nullify missing slurpy" (Just [WyInt 0, WyNull]) $ 
  adjust WyNull WyList ["a", "b\\"] [WyInt 0] 0
testAdjustEndingSlurpy = TestCase $ assertEqual
  "Should fill ending slurpy" (Just [WyInt 0, WyList [WyInt 1, WyInt 2]]) $ 
  adjust WyNull WyList ["a", "b\\"] [WyInt 0, WyInt 1, WyInt 2] 2
testAdjustMiddleSlurpy = TestCase $ assertEqual
  "Should fill middle slurpy" (Just [WyInt 0, WyList [WyInt 1, WyInt 2], WyInt 3]) $ 
  adjust WyNull WyList ["a", "b\\", "c"] [WyInt 0, WyInt 1, WyInt 2, WyInt 3] 2
testAdjustFailFixedMissSlurpy = TestCase $ assertEqual
  "Should fail with slurpy but missing fixed params" Nothing $ 
  adjust WyNull WyList ["a", "b\\", "c"] [WyInt 0] (-1)

adjustSlurpyTests = TestList [testAdjustEmptySlurpy, testAdjustEndingSlurpy, testAdjustMiddleSlurpy, 
  testAdjustFailFixedMissSlurpy]

--
-- Pattern matching

patternMatchTests = TestList [testEmptyFn, testParamFn, testTwoVarExpr, testMissingOptionalPatt]

testEmptyFn = TestCase $ assertEqual
  "Should match empty application" (Just M.empty) $
  patternMatch (ASTApplic (ASTId "foo") []) (ASTApplic (ASTId "foo") []) (Just M.empty)

testParamFn = TestCase $ assertEqual
  "Should match parametered application" (Just [("a", ASTString "bar"), ("b", ASTInt 3)]) $ liftM M.toList $
  patternMatch (ASTApplic (ASTId "foo") [ASTId "`a", ASTId "`b"]) 
    (ASTApplic (ASTId "foo") [ASTString "bar", ASTInt 3]) (Just M.empty)

testTwoVarExpr = TestCase $ assertEqual
  "Should match expression with two variables" (Just [("a", ASTInt 2), ("b", ASTInt 3)]) $ liftM M.toList $
  patternMatch (ASTStmt [(ASTId "`a") , (ASTId "+"), (ASTId "`b")])
    (ASTStmt [(ASTInt 2) , (ASTId "+"), (ASTInt 3)]) (Just M.empty)

testMissingOptionalPatt = TestCase $ assertEqual
  "Should match application with missing optional" (Just [("a", ASTString "bar"), ("b", ASTNull)]) $ liftM M.toList $
  patternMatch (ASTApplic (ASTId "foo") [ASTId "`a", ASTId "`b?"])
      (ASTApplic (ASTId "foo") [ASTString "bar"]) (Just M.empty)

