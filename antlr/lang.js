load("runtime.js");
load("langLexer.js");
load("langParser.js");
load("util.js");
load("json2.js");
load("macro.js");

// Couldn't find a way to clone a function
var Block = function() { for (var i = 0; i < arguments.length; i++) { this.push(arguments[i]); } }
Block.prototype = new Array();
var List = function() { for (var i = 0; i < arguments.length; i++) { this.push(arguments[i]); } }
List.prototype = new Array();
var Applic = function() { for (var i = 0; i < arguments.length; i++) { this.push(arguments[i]); } }
Applic.prototype = new Array();

function parse(expr) {
  var cstream = new ANTLR.runtime.ANTLRStringStream(expr),
      lexer = new langLexer(cstream),
      tstream = new ANTLR.runtime.CommonTokenStream(lexer),
      parser = new langParser(tstream);

  var result = parser.block();
  return result;
}

// TODO lambda(a,b,a + b)(1, 2) doesn't seem to work, why?
function eval_(exp, env) {
  // print(">eval " + JSON.stringify(exp));
  if (selfEval(exp)) return eval(exp); // JS eval for native type
  else if (quoted(exp)) return eval(exp); // JS eval to unescape
  else if (variableRef(exp)) return variableValue(exp, env);
  else if (list(exp)) return evalList(exp, env);
  else if (sequence(exp)) return evalSeq(exp, env);
  // Operands evaluation is differed to apply
  else if (application(exp)) return apply(eval_(operator(exp), env), operands(exp), env);
  else throw "Unknown expression: " + exp;
}

function evalList(operands, env) {
  if (operands.isEmpty()) return [];
  else return [eval_(operands.first(), env)].concat(evalList(operands.tail(), env));
}

function selfEval(exp) { return (!isNaN(exp)); }
function quoted(exp) { return ((typeof exp) == 'string') && exp[0] == '"'; }

function variableRef(exp) { return (typeof exp) == 'string'; }
function variableValue(exp, env) {
  var res = null;
  env.forEach(function(frame) {
        var value = frame[exp];
        if (value != undefined) { res = value; return; }
      });
  return res;
}
function extendEnv(names, values, env) {
  if (names.length > values.length) throw "Too many parameters: " + names;
  else if (names.length < values.length) throw "Too many values for parameters: " + names;
  else {
    var frame = {};
    for (var m = 0, name; name = names[m]; m++) { frame[name] = values[m]; };
    return [frame].concat(env);
  }
}

function application(exp) { return exp instanceof Applic; }
function operator(exp) { return exp[0]; } 
function operands(exp) { return exp[1]; }

function list(exp) { return exp instanceof List };

// We want to return the result of the last expression
function sequence(val) { return (val instanceof Block); }
function evalSeq(exps, env) {
  exps = rewriteSeq(exps);
  expandMacros(exps, env);
  print("after expand " + JSON.stringify(exps));
  print("after expand " + exps instanceof Applic);
  for (var m = 0; m < exps.length-1; m++) eval_(exps[m], env);
  return eval_(exps[m], env);
}

macros = ['*', '/', '+', '-', '==', '='];
function rewriteSeq(exps) {
  var original = exps;
  for (var n = 0, mc; mc = macros[n]; n++) {
    var copy = new Block();
    for (var m = 0, el; el = original[m]; m++) {
      if (el == mc && !copy.isEmpty() && original[m+1]) {
        var call = {};
        call[mc] = new List(copy.pop(), original[++m]);
        copy.push(call);
      } else copy.push(el);
    }
    original = copy;
  }
  return copy;
}

function apply(operation, operands, env) {
  // Primitives are responsible for evaluating (or not) their operands
  if (primitive(operation)) 
    return applyPrimitive(operation, operands, env);
  else {
  print("lambda " + JSON.stringify(lambdaBody(operation)));
    // Single expression block case
    if (lambdaBody(operation) instanceof Applic)
      return eval_(lambdaBody(operation), extendEnv(lambdaParams(operation), evalList(operands, env), lambdaEnv(operation)));
    else
      return evalSeq(lambdaBody(operation), extendEnv(lambdaParams(operation), evalList(operands, env), lambdaEnv(operation)));
  }
}

function lambdaParams(lambda) { return lambda[1];  }
function lambdaBody(lambda) { return lambda[2];  }
function lambdaEnv(lambda) { return lambda[3];  }

function makePrimitive(name) { return ['primitive', name]; }
function primitive(operation) { return operation[0] == 'primitive'; }

// Probably not the fastest impl but convenient for now
function applyPrimitive(operation, operands, env) {
  var primFn = primitives[operation[1]];
  if (primFn) return primFn.call(null, operands, env);
  else throw "Unrecognized primitive: " + operation[1] + ", most certainly a bug.";
}
function opEval(fn) {
  return function(operands, env) { return fn(evalList(operands, env), env); };
}

var primitives = {
  'if': function(operands, env) {
    if (eval_(operands[0], env)) return eval_(operands[1], env);
    else return eval_(operands[2], env);
  }, 
  'lambda': function(operands, env) {
    return ['lambda', operands.slice(0, -1), operands.last(), env];
  },
  'macro': function(operands, env) {
    var pattern = operands.slice(0, -1);
    if (pattern.length == 1 && pattern[0] instanceof Array) pattern = pattern[0];
    return ['macro', pattern, operands.last(), macroId++, env];
  },
  '#': function(operands, env) {
    return escapeEval(operands, env);
  },
  '+': opEval(function(operands, env) {
    return operands.reduceFirst(function(acc, el) { return acc + el; });
  }), 
  '-': opEval(function(operands, env) { 
    return operands.reduceFirst(function(acc, el) { return acc - el; });
  }), 
  '*': opEval(function(operands, env) {
    return operands.reduceFirst(function(acc, el) { return acc * el; });
  }), 
  '/': opEval(function(operands, env) {
    return operands.reduceFirst(function(acc, el) { return acc / el; });
  }), 
  '=': function(operands, env) {
    var name = operands[0];
    var newval = eval_(operands[1], env);
    var found = false;
    env.forEach(function(frame) {
      var value = frame[name];
      if (value != undefined) { frame[name] = newval; found = true; }
    });
    if (!found) env.first()[name] = newval;
    return newval;
  },
  '==': opEval(function(operands, env) { return operands[0] == operands[1]; }), 
  '<': opEval(function(operands, env) { return operands[0] < operands[1]; }),
  '>': opEval(function(operands, env) { return operands[0] > operands[1]; }),
  '<=': opEval(function(operands, env) { return operands[0] <= operands[1]; }),
  '>=': opEval(function(operands, env) { return operands[0] >= operands[1]; })
};

function setupEnv() {
  var baseFrame = {};
  primitives.eachPair(function(k,v) { baseFrame[k] = makePrimitive(k); });
  baseFrame['true'] = true;
  baseFrame['false'] = false;
  baseFrame['null'] = null;
  return [baseFrame];
}

function repl() {
  var line = readline();
  var env = setupEnv();
  while (line != 'quit' && line != 'exit') {
    var struct = parse(line);
    var res = eval_(struct, env);
    print(res);
    line = readline();
  }
}

repl();
