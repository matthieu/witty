#!/usr/bin/env sh
sh build.sh
ghc -e "main" test/hunit.hs src/parser.hs src/types.hs src/interpr.hs
cd ..
haskell/wy test/base.wy $@
cd haskell
