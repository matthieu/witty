#!/usr/bin/env sh
mkdir -p build
ruby inline.rb
ghc -O2 --make -o wy -odir build -hidir build src/*.hs build/foundation.hs
