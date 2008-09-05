load("lib/runtime.js");
load("lib/wittyLexer.js");
load("lib/wittyParser.js");
load("lib/util.js");
load("lib/json2.js");
load("lib/macro.js");
load("lib/dtype.js");

function eval_(exp, env) {
  //print("eval: " + JSON.stringify(exp) + " :sntx: " + exp.sntx);
  if (selfEval(exp)) return eval(exp); // JS eval for native type
  else if (quoted(exp)) return evalQuoted(exp);
  else if (variableRef(exp)) {
    var val =  variableValue(exp, env);
    // In JS undefined == null, strangely
    if (typeof val != "undefined") return val;
    else throw "Unknown reference: " + exp;
  }
  else if (list(exp)) return evalList(exp, env);
  else if (sequence(exp)) return evalSeq(exp, env);
  else if (application(exp)) {
    var expanded = expandMacros(exp, env);
    // Operands evaluation is differed to apply
    if (expanded) {
      return eval_(exp, env); // Eval unwinded application
    } else {
      var op = eval_(operator(exp), env);
      var applic = apply(op, operands(exp), env);
      if (typeof applic == "undefined") return null;
      else return applic;
    }
  }
  else throw "Unknown expression: " + exp;
}

function evalList(operands, env) {
  if (!operands || operands.isEmpty()) return [];
  else return [eval_(operands.first(), env)].concat(evalList(operands.tail(), env));
}

function selfEval(exp) { return (!isNaN(exp)); }
function quoted(exp) { return (typeof exp == 'string' || exp instanceof String) && (exp[0] == '"' || exp.alien); }
function evalQuoted(exp) { 
  if (exp.alien) return exp;
  // JS eval to unescape
  var str = new String(eval(exp));
  str.alien = true;
  return str;
}

function variableRef(exp) { return (typeof exp) == 'string'; }
function variableValue(exp, env, isMacro) {
  var index = isMacro ? 1 : 0;
  for (var m = 0, frame; frame = env[m]; m++) {
    var value = frame[index][exp];
    if (typeof value != "undefined") return value;
  }
  return undefined;
}
function setVariableValue(name, newval, env) {
  if(!variableRef(name) || quoted(name) || selfEval(name)) throw "Not a name, can't set " + name;
  if (typeof newval == "undefined") throw "Unknown reference: " + newval;
  var found = false;
  for (var m = 0, frame; frame = env[m]; m++) {
    var value = frame[0][name];
    if (typeof value != "undefined") { frame[0][name] = newval; found = true; break; }
  }
  if (!found) env.first()[0][name] = newval;
  return newval;
}
function extendEnvValues(names, values, env) {
  if (names.length > values.length) throw "Not enough parameters: " + values;
  else if (names.length < values.length) throw "Too many parameters: " + values;
  else {
    var frame = {};
    for (var m = 0, name; name = names[m]; m++) { frame[name] = values[m]; };
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
  // Macro expansion
  expandMacros(exps, env);
 
  // An application is evaluated as a whole
  if (exps.sntx == 'A') return eval_(exps, env);

  for (var m = 0; m < exps.length-1; m++) eval_(exps[m], env);
  return eval_(exps[m], env);
}

// TODO Accept variable number of operands, matching the tail (foo, bar . baz)
function apply(operation, operands, env) {
  // Primitives are responsible for evaluating (or not) their operands
  if (primitive(operation))
    return applyPrimitive(operation, leftCurry(operation, operands), env);
  else
    return evalSeq(lambdaBody(operation), extendEnvValues(
        lambdaParams(operation), leftCurry(operation, evalList(operands, env)), lambdaEnv(operation)));
}

// Lambda manipulations
//
function lambdaParams(lambda) { return lambda[1];  }
function lambdaCurry(lambda) { return lambda[2];  }
function lambdaBody(lambda) { return lambda[3];  }
function lambdaEnv(lambda) { return lambda[4];  }
function lambda(l) { return l[0] == 'lambda'; }
function makeLambda(params, body, env) { return ['lambda', params, null, body, env]; }
function makeCurriedLambda(l, curry) { return ['lambda', lambdaParams(l), curry, lambdaBody(l), lambdaEnv(l)]; }
function lambdaStarParams(l) {
  var params = lambdaParams(l);
  for (var m = 0; m < params.length; m++) {
    var p = params[m];
    if (p[p.length-1] == '*') return true;
  }
  return false;
}

// TODO I should be able to write these as macros eventually
function leftCurry(l, params) {
  if (!params) params = [];
  var curry = lambdaCurry(l) ? lambdaCurry(l).slice() : [];
  var lparams = lambdaParams(l);
  var numset = 0;
  var length = lambdaStarParams(l) ? (params.length + curry.length) : lparams.length;
  for (var m = 0; m < length; m++) 
    if (!curry[m] && curry[m] != 0 && (params[numset] || params[numset] == 0)) curry[m] = params[numset++];
  if (numset < params.length && !lambdaStarParams(l)) throw "Too many parameters: " + params;

  return curry;
}
function rightCurry(l, params) {
  if (lambdaStarParams(l)) 
    throw "Can't right curry a lambda with a variable number of parameters.";
  var curry = lambdaCurry(l) ? lambdaCurry(l).slice() : [];
  var lparams = lambdaParams(l);
  var numset = 0;
  var rparams = params.slice().reverse();
  for (var m = lparams.length-1; m >= 0; m--)
    if (!curry[m] && curry[m] != 0 && (rparams[numset] || rparams[numset] == 0)) curry[m] = rparams[numset++];
  if (numset < params.length) throw "Too many parameters: " + params;
  
  return curry;
}
function nCurry(l, n, param) {
  var lparams = lambdaParams(l);
  if (lparams.length <= n && ! lambdaStarParams(l)) 
    throw "Lambda has only " + lparams.length + "parameters , can't set parameter " + n;

  var curry = lambdaCurry(l) ? lambdaCurry(l).slice() : [];
  curry[n] = param;
  return curry;
}

// Package
//

function makePackage(name, frame) {
  return ['package', name, frame];
}
function packageFrame(p) { return p[2]; }

// Primitives handling
//
function makePrimitive(name, params, body) { return ['primitive', params, null, body, name]; }
function makeCurriedPrimitive(p, curry) { return ['primitive', primitiveParams(p), curry, primitiveBody(p), p[4]]; }
function primitive(operation) { return operation[0] == 'primitive'; }
function primitiveBody(operation) { return operation[3]; }
function primitiveParams(operation) { return operation[1]; }

function applyPrimitive(operation, operands, env) {
  var primFn = primitiveBody(operation);
  if (typeof primFn == "function") return primFn.call(null, operands, env);
  else throw "Unrecognized primitive: " + operation[1] + ", most certainly a bug.";
}
function opEval(fn) {
  return function(operands, env) { return fn(evalList(operands, env), env); };
}
function opTailEval(fn) {
  return function(operands, env) { return fn([operands.first()].concat(evalList(operands.tail(), env)), env); };
}
function typeDispatch(op) {
  return function(operands, env) {
    var first = eval_(operands.first(), env), typeFn;
    if (typeof first == 'number') typeFn = wNum[op];
    else if (typeof first == 'string' || first instanceof String) typeFn = wString[op];
    else if (first instanceof Array) typeFn = wArray[op];
    else if (first instanceof Object) typeFn = wHash[op];
    else throw "Can't dispatch operation " + op + " to " + first + ", unknown type.";

    if (!typeFn) throw "Unknown function " + op + " for " + first;
    return typeFn([first].concat(operands.tail()), env);
  }
}

var primitives = {};
function addPrimitive(name, params, body) {
  primitives[name] = makePrimitive(name, params, body);
}

addPrimitive('if', ['predicate', 'consequence', 'opposite'],
  function(operands, env) {
    if (eval_(operands[0], env)) return eval_(operands[1], env);
    else if (operands.length > 2) return eval_(operands[2], env);
  });
addPrimitive('lambda', ['parameters*', 'body'], 
  function(operands, env) {
    return makeLambda(operands.slice(0, -1), operands.last(), env);
  });
addPrimitive('macro', ['pattern', 'body'], 
  function(operands, env) {
    var pattern = operands.first();
    var key = patternKey(pattern);
    var mframe = env.first()[1];
    var decl = ['macro', pattern, operands.last(), macroId++, env];
    mframe[key] = decl;
    return key;
  });
addPrimitive('package', ['name', 'body'],
  function(operands, env) {
    var existingPackage = variableValue(operands[0]);
    var newFrame = (typeof existingPackage != "undefined") ? packageFrame(existingPackage) : [];
    var innerEnv = extendEnv(newFrame, env);
    eval_(operands[1], innerEnv);
    makePackage(operands[0], newFrame);
    return null;
  });
addPrimitive('import', ['name'],
  function(operands, env) {
    var name = operands[0];
    var p = variableValue(name);
    if (!p || !isPackage(p)) throw "Unknown package: " + name;
    var pframe = packageFrame(p);
    var mergeFrame = env[0][0];
    pframe.eachPair(function(k, v) { mergeFrame[k] = v; });
    return null;
  });
addPrimitive('print', ['elements*'], 
  function(operands, env) {
    return primitiveBody(primitives.prit)(operands.concat(["\"\\n\""]), env);
  });
addPrimitive('prit', ['elements*'], 
  function(operands, env) {
    if (operands.isEmpty()) { pr("null"); return; }
    var f = eval_(operands.first(), env);
    var str = f != null ? f.toString() : "";
    for (var m = 1, opr; opr = operands[m]; m++) { 
      f = eval_(opr, env);
      str += f.toString(); 
    };
    pr(str); return;
  }),
addPrimitive('eval', ['expr'], 
  function(operands, env) {
    return eval_(parse(eval_(operands.first()), env), env);
  });
addPrimitive('`', ['expr'], 
  function(operands, env) {
    return escapeEval(operands.first(), env);
  });
addPrimitive('throw', ['error'], opEval(
  function(operands, env) {
    throw operands.first();
  }));
addPrimitive('load', ['file'], opEval(
  function(operands, env) {
    var ctnt = readfile(operands.first());
    return eval_(parse(ctnt), env);
  }));
addPrimitive('L', ['elements*'], opEval(
  function(operands, env) {
    var arr = operands.slice();
    arr.sntx = 'L';
    return arr;
  }));
addPrimitive('H', ['elements*'],
  function(operands, env) {
    var h = {};
    if (operands.length % 2 == 1) throw "Odd number of parameters in hash creation.";
    for(var m = 0; m < operands.length; m = m + 2)
      h[eval_(operands[m], env)] = eval_(operands[m+1], env);
    h.length = operands.length / 2;
    return h;
  });
addPrimitive('for', ['listOrInit', 'lambdaOrStopCond', 'incrementExpr', 'body'], 
  function(operands, env) {
    if (operands.length == 2) {
      // First form iterating through a list
      var list = eval_(operands.first(), env);
      var lambda = eval_(operands[1], env);
      var idx = (lambdaParams(lambda).length == 2);
      var ret = null;
      for (var m = 0; m < list.length; m++) {
        var params = [list[m]];
        if (idx) params.push(m);
        ret = evalSeq(lambdaBody(lambda), extendEnvValues(
                  lambdaParams(lambda), leftCurry(lambda, params), lambdaEnv(lambda)));
        //apply(lambda, params, env);
      }
      return ret;
    } else {
      // Second form with start and end conditions
      var init = operands.first();
      var stop = operands[1];
      var inc = operands[2];
      var body = operands.last();
      // TODO don't create a new frame, for loops aren't isolated scopes
      var innerEnv = extendEnv({}, env);
      eval_(init, innerEnv);
      var ret = null;
      while (eval_(stop, innerEnv)) {
        ret = eval_(body, innerEnv);
        eval_(inc, innerEnv);
      }
      return ret;
    }
  });
addPrimitive('at', ['list', 'index'],
  function(operands, env) {
    return typeDispatch('at')(operands, env);
  });
addPrimitive('@', ['list', 'index'],
  function(operands, env) {
    return typeDispatch('@')(operands, env);
  });
addPrimitive('@!', ['list', 'index', 'value'],
  function(operands, env) {
    return typeDispatch('@!')(operands, env);
  });
addPrimitive('applic?', ['expr'],
  function(operands, env) {
    return application(eval_(operands.first(), env));
  });
addPrimitive('fnName', ['applic'],
  function(operands, env) {
    var f = eval_(operands.first(), env);
    if (application(f)) return operator(f);
    else return null;
  });
addPrimitive('params?', ['applic'],
  function(operands, env) {
    var f = eval_(operands.first(), env);
    if (application(f)) {
      if (f[1] && f[1].length > 0) return true;
      else return false;
    } else return null;
  });
addPrimitive('params', ['applic'],
  function(operands, env) {
    var f = eval_(operands.first(), env);
    if (application(f) && (typeof f[1] != "undefined")) return f[1];
    else return null;
  });
addPrimitive('nthParam', ['applic', 'idx'],
  function(operands, env) {
    var f = eval_(operands.first(), env);
    var idx = eval_(operands[1], env);
    if (application(f) && (typeof f[1] != "undefined")) return f[1][idx];
    else return null;
  });
addPrimitive('lcurry', ['lambda', 'parameters*'], opEval(
  function(operands, env) {
    var fn = operands.first();
    if (lambda(fn)) return makeCurriedLambda(fn, leftCurry(fn, operands.tail()));
    else if (primitive(fn)) return makeCurriedPrimitive(fn, leftCurry(fn, operands.tail()));
    else throw "The first parameter of leftCurry should be a function."
  }));
addPrimitive('rcurry', ['lambda', 'parameters*'], opEval(
  function(operands, env) {
    var fn = operands.first();
    if (lambda(fn)) return makeCurriedLambda(fn, rightCurry(fn, operands.tail()));
    else if (primitive(fn)) return makeCurriedPrimitive(fn, rightCurry(fn, operands.tail()));
    else throw "The first parameter of rightCurry should be a function."
  }));
addPrimitive('ncurry', ['lambda', 'index', 'parameter'], opEval(
  function(operands, env) {
    var fn = operands.first();
    var idx = operands[1];
    if (typeof idx != "number") throw "Second parameter of ncurry must be a number."
    if (lambda(fn)) return makeCurriedLambda(fn, nCurry(fn, idx, operands[2]));
    else if (primitive(fn)) return makeCurriedPrimitive(fn, nCurry(fn, idx, operands[2]));
    else throw "The first parameter of nurry should be a function."
  }));
addPrimitive('=', ['symbol', 'value'], function(operands, env) {
    var name = operands[0];
    var newval = eval_(operands[1], env);
    return setVariableValue(name, newval, env);
  });
addPrimitive('==', ['loperand', 'roperand'], opEval(
  function(operands, env) {
    if (!operands[0] || !operands[1]) return operands[0] == operands[1];
    else if (operands[0] instanceof Array) operands[0].toString() == operands[1].toString();
    else return operands[0].valueOf() == operands[1].valueOf(); 
  })); // TODO accept n parameters
addPrimitive('!=', ['loperand', 'roperand'], opEval(
  function(operands, env) {
    if (!operands[0] || !operands[1]) return operands[0] != operands[1];
    else if (operands[0] instanceof Array) operands[0].toString() != operands[1].toString();
    else return operands[0].valueOf() != operands[1].valueOf(); 
  }));
addPrimitive('<', ['loperand', 'roperand'], opEval(function(operands, env) { return operands[0] < operands[1]; }));
addPrimitive('>', ['loperand', 'roperand'], opEval(function(operands, env) { return operands[0] > operands[1]; }));
addPrimitive('<=', ['loperand', 'roperand'], opEval(function(operands, env) { return operands[0] <= operands[1]; }));
addPrimitive('>=', ['loperand', 'roperand'], opEval(function(operands, env) { return operands[0] >= operands[1]; }));
addPrimitive('!', ['loperand', 'roperand'], opEval(function(operands, env) { return !operands[0]; }));
addPrimitive('&&', ['loperand', 'roperand'], function(operands, env) { return eval_(operands[0], env) && eval_(operands[1], env); });
addPrimitive('||', ['loperand', 'roperand'], function(operands, env) { return eval_(operands[0], env) || eval_(operands[1], env); });

['+', '-', '*', '/'].forEach(function(op) {
  addPrimitive(op, ['loperand', 'roperand'], opTailEval(typeDispatch(op)));
});

addPrimitive('join', ['list', 'separator'], opTailEval(typeDispatch('join')));
addPrimitive('length', ['stuff'], opTailEval(typeDispatch('length')));
addPrimitive('empty?', ['stuff'], opTailEval(typeDispatch('empty?')));
addPrimitive('push', ['array', 'element'], opTailEval(typeDispatch('push')));
addPrimitive('unshift', ['array', 'element'], opTailEval(typeDispatch('unshift')));
addPrimitive('pop', ['array', 'element'], opTailEval(typeDispatch('pop')));
addPrimitive('shift', ['array', 'element'], opTailEval(typeDispatch('shift')));
addPrimitive('map', ['list', 'function'], opEval(
  function(operands, env) {
    var list = operands.first();
    var lambda = operands[1];
    var newlist = [];
    newlist.sntx = list.sntx;
    list.forEach(function(e) { newlist.push(apply(lambda, [e], env)); });
    return newlist;
  }));
addPrimitive('split', ['string', 'separator', 'maxSplit'], opTailEval(typeDispatch('split')));

