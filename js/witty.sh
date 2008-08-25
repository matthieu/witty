#!/usr/bin/env sh
java -Xmx256m -jar etc/rhino-1.7R1.jar -opt -1 lib/repl.js $@
