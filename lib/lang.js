load("lib/runtime.js");
load("lib/langLexer.js");
load("lib/langParser.js");
load("lib/util.js");
load("lib/json2.js");
load("lib/macro.js");

function parse(expr) {
  var cstream = new ANTLR.runtime.ANTLRStringStream(expr),
      lexer = new langLexer(cstream),
      tstream = new ANTLR.runtime.CommonTokenStream(lexer),
      parser = new langParser(tstream);

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
    print("expanded: " + expanded);
    // Operands evaluation is differed to apply
    if (expanded) {
      print("expeval: " + exp);
      return eval_(exp[0], env); // Eval unwinded application
    } else {
      print("calling apply " + exp);
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
  var res = null;
  var index = isMacro ? 1 : 0;
  env.forEach(function(frame) {
    var value = frame[index][exp];
    if (value != undefined) { res = value; return; }
  });
  return res;
}
function extendEnvValues(names, values, env) {
  if (names.length > values.length) throw "Too many parameters: " + names;
  else if (names.length < values.length) throw "Too many values for parameters: " + names;
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
  print("apply op " + operation + " on " + operands);
  // Primitives are responsible for evaluating (or not) their operands
  if (primitive(operation)) 
    return applyPrimitive(operation, operands, env);
  else {
    // Single expression block case
    var body = lambdaBody(operation);
    if ((body instanceof Array) && body.sntx == 'A')
      return eval_(lambdaBody(operation), extendEnvValues(lambdaParams(operation), evalList(operands, env), lambdaEnv(operation)));
    else
      return evalSeq(lambdaBody(operation), extendEnvValues(lambdaParams(operation), evalList(operands, env), lambdaEnv(operation)));
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
    for (var m = 1, opr; opr = operands[m]; m++) { print(opr); str += eval_(opr, env); };
    pr(str); return;
  },
  'eval': function(operands, env) {
    return eval_(parse(eval_(operands.first()), env), env);
  },
  '#': function(operands, env) {
    return escapeEval(operands.first(), env);
  },
  'throw': opEval(function(operands, env) {
    throw operands.first();
  }),
  'load': opEval(function(operands, env) {
    var ctnt = readfile(operands.first());
    return eval_(parse(ctnt), env);
  }),
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
      var value = frame[0][name];
      if (value != undefined) { frame[0][name] = newval; found = true; }
    });
    if (!found) env.first()[0][name] = newval;
    return newval;
  },
  '==': opEval(function(operands, env) { return operands[0] == operands[1]; }), 
  '<': opEval(function(operands, env) { return operands[0] < operands[1]; }),
  '>': opEval(function(operands, env) { return operands[0] > operands[1]; }),
  '<=': opEval(function(operands, env) { return operands[0] <= operands[1]; }),
  '>=': opEval(function(operands, env) { return operands[0] >= operands[1]; }),
  '!': opEval(function(operands, env) { return !operands[0]; })
};

