if (typeof trace != 'undefined')
  var load = ESC::compileAndLoadFile

load('lib/rhino-ext.js');
//load("lib/tamarin-ext.js")
load('lib/interpr.js');

function setupEnv() {
  var baseFrame = {};
  primitives.eachPair(function(k,v) { baseFrame[k] = makePrimitive(k); });
  baseFrame['true'] = true;
  baseFrame['false'] = false;
  baseFrame['null'] = null;
  return [[baseFrame, {}]];
}

function setup() {
  var env = setupEnv();

  var stdlib = readfile("lib/stdlib.w");
  eval_(parse(stdlib), env);
  return env;
}

function repl() {
  var env = setup();
  pr("> ");
  var line = new String(readline());
  while (line != 'quit' && line != 'exit') {
    var struct = parse(line);
    if (struct) {
      var res = eval_(struct, env);
      print("-> " + res);
    }
    pr("> ");
    line = new String(readline());
  }
}

if (arguments.length == 0) repl();
else {
  var env = setup();
  var script = readfile(arguments[0]);
  print(eval_(parse(script), env));
}
