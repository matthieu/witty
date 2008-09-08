#!/usr/bin/env sh
etc/v8/shell test/pattern.js
etc/v8/shell lib/repl.js test/base.wy
#java -jar etc/rhino-1.7R2pre.jar -opt -1 test/pattern.js
#java -Xmx128m -jar etc/rhino-1.7R2pre.jar -opt -1 lib/repl.js test/base.wy
