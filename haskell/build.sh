#!/usr/bin/env sh
mkdir -p build
ruby inline.rb
ghc --make -o wy -odir build -hidir build src/*.hs build/foundation.hs
