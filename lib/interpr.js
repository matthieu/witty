load("lib/runtime.js");
load("lib/wittyLexer.js");
load("lib/wittyParser.js");
load("lib/util.js");
load("lib/json2.js");
load("lib/macro.js");
load("lib/dtype.js");

function parse(expr) {
  var cstream = new ANTLR.runtime.ANTLRStringStream(expr),
      lexer = new wittyLexer(cstream),
      tstream = new ANTLR.runtime.CommonTokenStream(lexer),
      parser = new wittyParser(tstream);

  var result = parser.block();
  return result;
}

function eval_(exp, env) {
  print("eval: " + JSON.stringify(exp));
  if (selfEval(exp)) return eval(exp); // JS eval for native type
  else if (quoted(exp)) return eval(exp); // JS eval to unescape
  else if (variableRef(exp)) return variableValue(exp, env);
  else if (list(exp)) return evalList(exp, env);
  else if (sequence(exp)) return evalSeq(exp, env);
  else if (application(exp)) {
    var expanded = expandMacros(exp, env);
    // Operands evaluation is differed to apply
    if (expanded) {
      return eval_(exp[0], env); // Eval unwinded application
    } else {
      return apply(eval_(operator(exp), env), operands(exp), env);
    }
  }
  else throw "Unknown expression: " + exp;
}

function evalList(operands, env) {
  if (operands.isEmpty()) return [];
  else return [eval_(operands.first(), env)].concat(evalList(operands.tail(), env));
}

function selfEval(exp) { return (!isNaN(exp)); }
function quoted(exp) { return ((typeof exp) == 'string') && exp[0] == '"'; }

function variableRef(exp) { return (typeof exp) == 'string'; }
function variableValue(exp, env, isMacro) {
  var index = isMacro ? 1 : 0;
  for (var m = 0, frame; frame = env[m]; m++) {
    var value = frame[index][exp];
    if (value != undefined) return value;
  }
  return null;
}
function extendEnvValues(names, values, env) {
  if (names.length > values.length) throw "Not enough parameters: " + values;
  else if (names.length < values.length) throw "Too many parameters: " + values;
  else {
    var frame = {};
    for (var m = 0, name; name = names[m]; m++) { frame[name] = values[m]; };
    print("extending env with frame: " + JSON.stringify(frame));
    return extendEnv(frame, env);
  }
}
function extendEnv(frame, env) {
  return [[frame, {}]].concat(env);
}

function application(exp) { return (exp instanceof Array) && exp.sntx == 'A'; }
function operator(exp) { return exp[0]; } 
function operands(exp) { return exp[1]; }

function list(exp) { return (exp instanceof Array) && exp.sntx == 'L' };

// We want to return the result of the last expression
function sequence(val) { return (val instanceof Array) && val.sntx == 'B'; }
function evalSeq(exps, env) {
  expandMacros(exps, env);
  for (var m = 0; m < exps.length-1; m++) eval_(exps[m], env);
  return eval_(exps[m], env);
}

// TODO Accept variable number of operands, matching the tail (foo, bar . baz)
function apply(operation, operands, env) {
  // Primitives are responsible for evaluating (or not) their operands
  if (primitive(operation)) {
    var res = applyPrimitive(operation, operands, env);
    print("prim " +operation+ " -> " + res);
    return res;
  } else {
    // Single expression block case
    var body = lambdaBody(operation);
    if ((body instanceof Array) && body.sntx == 'A')
      return eval_(lambdaBody(operation), extendEnvValues(
            lambdaParams(operation), evalList(operands, env), lambdaEnv(operation)));
    else
      return evalSeq(lambdaBody(operation), extendEnvValues(
            lambdaParams(operation), evalList(operands, env), lambdaEnv(operation)));
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
function typeDispatch(op) {
  return function(operands, env) {
    var first = operands.first(), typeFn;
    if (typeof first == 'number') typeFn = wNum[op];
    else if (typeof first == 'string') typeFn = wString[op];
    else if (first instanceof Array) typeFn = wArray[op];
    else throw "Can't dispatch operation " + op + " to " + first + ", unknown type.";

    if (!typeFn) throw "Unknown function " + op + " for " + first;
    return typeFn(operands, env);
  }
}

var primitives = {
  'if': function(operands, env) {
    if (eval_(operands[0], env)) return eval_(operands[1], env);
    else if (operands.length > 2) return eval_(operands[2], env);
  }, 
  'lambda': function(operands, env) {
    return ['lambda', operands.slice(0, -1), operands.last(), env];
  },
  'macro': function(operands, env) {
    var pattern = operands.first();
    var key = patternKey(pattern);
    env.first()[1][key] = ['macro', pattern, operands.last(), macroId++, env];
    return key;
  },
  'print': function(operands, env) {
    print(operands instanceof Array);
    return primitives.prit(operands.concat(["\"\\n\""]), env);
  },
  'prit': function(operands, env) {
    print(JSON.stringify(operands));
    if (operands.isEmpty()) { pr("null"); return; }
    var str = eval_(operands.first(), env).toString();
    for (var m = 1, opr; opr = operands[m]; m++) { str += eval_(opr, env); };
    pr(str); return;
  },
  'eval': function(operands, env) {
    return eval_(parse(eval_(operands.first()), env), env);
  },
  '`': function(operands, env) {
    return escapeEval(operands.first(), env);
  },
  'throw': opEval(function(operands, env) {
    throw operands.first();
  }),
  'load': opEval(function(operands, env) {
    var ctnt = readfile(operands.first());
    return eval_(parse(ctnt), env);
  }),
  'L': opEval(function(operands, env) {
    var arr = operands.slice();
    arr.sntx = 'L';
    return arr;
  }),
  '.': function(operands, env) {
    var opCopy = operands.slice();
    opCopy[0] = eval_(operands.first(), env);
    if (selfEval(opCopy[1])) opCopy[1] = eval_(opCopy[1], env);
    return typeDispatch('.')(opCopy, env);
  },
  '=': function(operands, env) {
    var name = operands[0];
    var newval = eval_(operands[1], env);
    var found = false;
    for (var m = 0, frame; frame = env[m]; m++) {
      var value = frame[0][name];
      if (value != undefined) { frame[0][name] = newval; found = true; break; }
    }
    if (!found) env.first()[0][name] = newval;
    return newval;
  },
  '==': opEval(function(operands, env) { return operands[0] == operands[1]; }), // TODO accept n parameters
  '<': opEval(function(operands, env) { return operands[0] < operands[1]; }),
  '>': opEval(function(operands, env) { return operands[0] > operands[1]; }),
  '<=': opEval(function(operands, env) { return operands[0] <= operands[1]; }),
  '>=': opEval(function(operands, env) { return operands[0] >= operands[1]; }),
  '!': opEval(function(operands, env) { return !operands[0]; })
};

['+', '-', '*', '/'].forEach(function(op) {
  primitives[op] = opEval(typeDispatch(op));
});
