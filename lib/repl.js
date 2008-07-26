if (typeof trace != 'undefined')
  var load = ESC::compileAndLoadFile

load('lib/rhino-ext.js');
//load("lib/tamarin-ext.js")
load('lib/interpr.js');

function setupEnv() {
  var baseFrame = {};
  primitives.eachPair(function(k,v) { baseFrame[k] = v; });
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
    print(JSON.stringify(struct));
    if (struct) {
      try {
        var res = eval_(struct, env);
        print("-> " + res);
      } catch(e) {
        print("error: " + e);
        if (e.stack) print(e.stack);
        else if (e.fileName) print(e.fileName + ":" + e.lineNumber);
      }
    }
    pr("> ");
    line = new String(readline());
  }
}

function flattnArrays(arr) {
  var mod = [];
  for (var m = 0; m < arr.length; m++) {
    var elmt = arr[m];
    if (elmt instanceof Array) {
      var flat = flattnArrays(elmt);
      if (flat.sntx) mod.push(flat);
      else mod = mod.concat(flat);
    } else {
      mod.push(elmt);
    }
  }
  mod.sntx = arr.sntx;
  return mod;
}

function parse(expr) {
  var cstream = new ANTLR.runtime.ANTLRStringStream(expr),
      lexer = new wittyLexer(cstream),
      tstream = new ANTLR.runtime.CommonTokenStream(lexer),
      parser = new wittyParser(tstream);

  var res = parser.block();
  if (!res.sntx && res instanceof Array) res.sntx = 'B';
  res = flattnArrays(res);
  return res;
}


if (arguments.length == 0) repl();
else {
  var env = setup();
  var script = readfile(arguments[0]);
  print(eval_(parse(script), env));
}
