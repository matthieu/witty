#!/usr/bin/env ruby

uptodate = File.exists?("build/foundation.hs") && File.mtime("build/foundation.hs") > File.mtime("src/foundation.wy")

unless uptodate
  f = File.new("src/foundation.wy").read

  cnt = <<-EOS
module Wy.Foundation
  ( foundationText,
  ) where

foundationText = unlines [
  "#{f.split("\n").map { |l| l.gsub("\\", "\\\\\\").gsub('"', '\"') }.join("\",\n  \"")}"]
  EOS

  File.open('build/foundation.hs', 'w') { |f| f << cnt }
end
