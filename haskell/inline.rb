#!/usr/bin/env ruby

f = File.new("src/foundation.wy").read

cnt = <<EOS
module Wy.Foundation
  ( foundationText,
  ) where

foundationText = unlines [
  "#{f.split("\n").map { |l| l.gsub('"', '\"') }.join("\",\n  \"")}"]
EOS

File.open('build/foundation.hs', 'w') { |f| f << cnt }
