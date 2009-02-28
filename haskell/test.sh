#!/usr/bin/env sh
sh build.sh
cd ..
haskell/wy test/base.wy $@
cd haskell
