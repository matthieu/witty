//if (typeof trace != 'undefined')
//  var load = ESC::compileAndLoadFile

//load('lib/rhino-ext.js');
//load("lib/tamarin-ext.js")
load('lib/interpr.js');

var arguments = parameters().split(" ").slice(0, -1);

function setupEnv() {
  var baseFrame = {};
  primitives.eachPair(function(k,v) { baseFrame[k] = v; });
  baseFrame['true'] = true;
  baseFrame['false'] = false;
  baseFrame['null'] = null;
  baseFrame['ReferenceError'] = makeErrorType('ReferenceError');
  baseFrame['NameError'] = makeErrorType('NameError');
  baseFrame['CallError'] = makeErrorType('CallError');
  baseFrame['TypeError'] = makeErrorType('TypeError');
  return [[baseFrame, {}]];
}
  
function setup() {
  var env = setupEnv();

  var stdlib = readfile("lib/stdlib.wy");
  eval_(parse(stdlib), env, []);
  return env;
}

// The file in from which the currently executing code comes from is the only
// global state at the moment. This should probably get revisited at some point.
var CURRENT_FILE = null;

function repl() {
  var env = setup();
  pr("> ");
  var line = new String(readline());
  while (line != 'quit' && line != 'exit') {
    var struct = parse(line);
    if (struct) {
      try {
        var res = eval_(struct, env, []);
        print("-> " + toWyStr(res));
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
  if (arr.line) {
    mod.line = arr.line;
    mod.pos = arr.pos;
  }
  return mod;
}

function parse(expr) {
  var cstream = new ANTLR.runtime.ANTLRStringStream(expr),
      lexer = new wittyLexer(cstream),
      tstream = new ANTLR.runtime.CommonTokenStream(lexer),
      parser = new wittyParser(tstream);

  var res = parser.block();
  if (res instanceof Array) {
    res = flattnArrays(res);
    if (!res.sntx) res.sntx = 'B';
  }
  return res;
}

if (arguments.length == 0) {
  repl();
} else {
  var env = setup();
  CURRENT_FILE = arguments[0];
  var script = readfile(CURRENT_FILE);
  var res = eval_(parse(script), env, []);
  if (error(res)) print(toWyStr(res));
}
