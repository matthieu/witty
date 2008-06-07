load("runtime.js");
load("langLexer.js");
load("langParser.js");
load("util.js");
load("json2.js");

// Couldn't find a way to clone a function
var Block = function() { for (var i = 0; i < arguments.length; i++) { this.push(arguments[i]); } }
Block.prototype = new Array();
var List = function() { for (var i = 0; i < arguments.length; i++) { this.push(arguments[i]); } }
List.prototype = new Array();

function parse(expr) {
  var cstream = new ANTLR.runtime.ANTLRStringStream(expr),
      lexer = new langLexer(cstream),
      tstream = new ANTLR.runtime.CommonTokenStream(lexer),
      parser = new langParser(tstream);

  var result = parser.block();
  return result;
}

function eval_(exp, env) {
  //print(">eval " + JSON.stringify(exp));
  if (selfEval(exp)) return Number(exp);
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

function selfEval(exp) { return !isNaN(exp); }
function quoted(exp) { return ((typeof exp) == 'string') && exp[0] == '"'; }

function variableRef(exp) { return (typeof exp) == 'string'; }
function variableValue(exp, env) {
  var res = null;
  env.forEach(function(frame) {
        var value = frame[exp];
        if (value) { res = value; return; }
      });
  return res;
}
function extendEnv(names, values, env) {
  if (names.length > values.length) throw "Too many parameters: " + names;
  else if (names.length < values.length) throw "Too values for parameters: " + names;
  else {
    var frame = {};
    for (var m = 0, name; name = names[m]; m++) { frame[name] = values[m]; };
    return [frame].concat(env);
  }
}

function application(exp) { return (typeof exp) == 'object'; }
function operator(exp) { return exp.keys().first(); } 
function operands(exp) { return exp[operator(exp)]; }

function list(exp) { return exp instanceof List };

// We want to return the result of the last expression
function sequence(val) { return (val instanceof Block); }
function evalSeq(exps, env) {
  if (!(exps instanceof Array)) return eval_(exps, env);
  else if (exps.length == 1) return eval_(exps.first(), env);
  else {
    eval_(exps.first(), env);
    return evalSeq(exps.tail(), env);
  }
}

function apply(operation, operands, env) {
  // Primitives are responsible for evaluating (or not) their operands
  if (primitive(operation)) return applyPrimitive(operation, operands, env);
  else return evalSeq(lambdaBody(operation), extendEnv(lambdaParams(operation), evalList(operands, env), lambdaEnv(operation)));
}

function makeLambda(params, body, env) {
  return ['lambda', params, body, env];
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
  return function(operands, env) { return fn(evalList(operands), env); };
}

var primitives = {
  'if': function(operands, env) {
    if (eval_(operands[0], env)) return eval_(operands[1], env);
    else return eval_(operands[2], env);
  }, 
  'lambda': function(operands, env) {
    return makeLambda(operands.slice(0, -1), operands.last(), env);
  }, 
  '+': opEval(function(operands, env) {
    var res = 0;
    var values = evalList(operands, env);
    for (var m = 0, num; num = values[m]; m++) { res = res + num; };
    return res;
  }), 
  '-': opEval(function(operands, env) {
    var values = evalList(operands, env);
    var res = values[0];
    for (var m = 1, num; num = values[m]; m++) { res = res - num; };
    return res;
  }), 
  '=': function(operands, env) {
    var name = operands[0];
    var newval = eval_(operands[1], env);
    var found = false;
    env.forEach(function(frame) {
      var value = frame[name];
      if (value) { frame[exp] = newval; found = true; }
    });
    env.first()[name] = newval;
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
  return [baseFrame];
}

function repl() {
  var line = readline();
  var env = setupEnv();
  while (line != 'quit' && line != 'exit') {
    var struct = parse(line);
    print(JSON.stringify(struct));
    var res = eval_(struct, env);
    print(res);
    line = readline();
  }
}

repl();
