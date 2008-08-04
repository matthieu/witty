#!/usr/bin/env sh
java -jar etc/rhino-1.7R1.jar -opt -1 test/pattern.js
java -jar etc/rhino-1.7R1.jar -opt -1 lib/repl.js test/base.wy
