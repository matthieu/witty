if (typeof trace != 'undefined')
  var load = ESC::compileAndLoadFile

load('lib/rhino-ext.js');
//load("lib/tamarin-ext.js")
load('lib/lang.js');

function setupEnv() {
  var baseFrame = {};
  primitives.eachPair(function(k,v) { baseFrame[k] = makePrimitive(k); });
  baseFrame['true'] = true;
  baseFrame['false'] = false;
  baseFrame['null'] = null;
  return [[baseFrame, {}]];
}

function repl() {
  var env = setupEnv();

  var stdlib = readfile("lib/stdlib.lang");
  eval_(parse(stdlib), env);

  pr("> ");
  var line = new String(readline());
  while (line != 'quit' && line != 'exit') {
    var struct = parse(line);
    print("to_eval: " + JSON.stringify(struct));
    var res = eval_(struct, env);
    print(res);
    pr("> ");
    line = new String(readline());
  }
}

repl();
