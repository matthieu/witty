load("lib/runtime.js");
load("lib/wittyLexer.js");
load("lib/wittyParser.js");
load("lib/util.js");
load("lib/json2.js");
load("lib/macro.js");
load("lib/dtype.js");
load("lib/printer.js");

function eval_(exp, env, ctx) {
  //print("eval: " + JSON.stringify(exp) + " :sntx: " + exp.sntx);
  //print("eval: " + exp + " " + (typeof ctx));
  if (selfEval(exp)) return eval(exp.valueOf()); // JS eval for native type
  else if (quoted(exp)) return evalQuoted(exp);
  else if (variableRef(exp)) {
    var val =  variableValue(exp, env);
    // In JS undefined == null, strangely
    if (typeof val != "undefined") return val;
    else return makeError('ReferenceError', "Unknown reference: " + exp, setContext(ctx, exp.line, exp.pos));
  }
  else if (list(exp)) return evalList(exp, env, ctx);
  else if (sequence(exp)) return evalSeq(exp, env, ctx);
  else if (application(exp)) {
    var expanded = expandMacros(exp, env);
    // Operands evaluation is differed to apply
    if (expanded) {
      return eval_(exp, env, ctx); // Eval unwinded application
    } else {
      var op = eval_(operator(exp), env, ctx);
      if (error(op)) return op;
      var applic = apply(op, operands(exp), env, false, stackContext(ctx, exp.line, exp.pos));
      if (typeof applic == "undefined") return null;
      else return applic;
    }
  }
  else if (error(exp)) return exp; // TODO stacktraces
  else return makeError('ReferenceError', "Unknown expression: " + exp, setContext(ctx, exp.line, exp.pos));
}

function evalList(operands, env, ctx) {
  if (!operands || operands.isEmpty()) return [];
  else {
    var firstEval = eval_(operands.first(), env, ctx);
    if (error(firstEval)) return firstEval;
    else return [firstEval].concat(evalList(operands.tail(), env, ctx));
  }
}

function selfEval(exp) { return (!isNaN(exp)); }
function quoted(exp) { 
  return ((typeof exp == 'string') || (exp instanceof String)) && (exp[0] == '"' || exp.alien); 
}
function evalQuoted(exp) { 
  if (exp.alien) return exp;
  // JS eval to unescape
  var str = new String(eval(exp.valueOf()));
  str.alien = true;
  return str;
}

function variableRef(exp) { return ((typeof exp == 'string') || (exp instanceof String)); }
function variableValue(exp, env, isMacro) {
  var index = isMacro ? 1 : 0;
  for (var m = 0, frame; frame = env[m]; m++) {
    var value = frame[index][exp];
    if (typeof value != "undefined") return value;
  }
  return undefined;
}
function setVariableValue(name, newval, env, ctx) {
  if(!variableRef(name) || quoted(name) || selfEval(name))
    return makeError('NameError', "Not a name, can't set " + name, setContext(ctx, name.line, name.pos));
  var found = false;
  for (var m = 0, frame; frame = env[m]; m++) {
    var value = frame[0][name];
    if (typeof value != "undefined") { frame[0][name] = newval; found = true; break; }
  }
  if (!found) env.first()[0][name] = newval;
  return newval;
}
function extendEnvValues(names, values, env, ctx) {
  if (names.length > values.length) 
    return makeError('CallError', "Not enough parameters: " + values, ctx);
  else if (names.length < values.length) 
    return makeError('CallError', "Too many parameters: " + values, ctx);
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
function evalSeq(exps, env, ctx) {
  // Macro expansion
  // TODO handle macros eval error
  expandMacros(exps, env);
 
  // An application is evaluated as a whole
  if (exps.sntx == 'A') return eval_(exps, env, ctx);

  for (var m = 0; m < exps.length-1; m++) {
    var ev = eval_(exps[m], env, ctx);
    if (error(ev)) return ev;
  }
  return eval_(exps[m], env, ctx);
}

// TODO Accept variable number of operands, matching the tail (foo, bar . baz)
function apply(operation, operands, env, peval, ctx) {
  // Primitives are responsible for evaluating (or not) their operands
  if (primitive(operation))
    return applyPrimitive(operation, leftCurry(operation, operands), env, ctx);
  else {
    var previousFile = CURRENT_FILE;
    CURRENT_FILE = lambdaSrcFile(operation);
    var newEnv = extendEnvValues(lambdaParams(operation), 
          leftCurry(operation, peval ? operands : evalList(operands, env, ctx)), 
          lambdaEnv(operation), ctx);

    if (error(newEnv)) return newEnv;
    
    var ret =  evalSeq(lambdaBody(operation), newEnv, ctx);
    CURRENT_FILE = previousFile;
    return ret;
  }
}

// Lambda manipulations
//
function lambdaParams(lambda) { return lambda[1];  }
function lambdaCurry(lambda) { return lambda[2];  }
function lambdaBody(lambda) { return lambda[3];  }
function lambdaSrcFile(lambda) { return lambda[4];  }
function lambdaEnv(lambda) { return lambda[5];  }
function lambda(l) { return l[0] == 'lambda'; }
function makeLambda(params, body, srcFile, env) { 
  return ['lambda', params, null, body, srcFile, env]; 
}
function makeCurriedLambda(l, curry) { 
  return ['lambda', lambdaParams(l), curry, lambdaBody(l), lambdaSrcFile(l), lambdaEnv(l)]; 
}
function lambdaStarParams(l) {
  var params = lambdaParams(l);
  for (var m = 0; m < params.length; m++) {
    var p = params[m];
    if (p[p.length-1] == '*') return true;
  }
  return false;
}

// TODO I should be able to write these as macros eventually
function leftCurry(l, params, ctx) {
  if (!params) params = [];
  var curry = lambdaCurry(l) ? lambdaCurry(l).slice() : [];
  var lparams = lambdaParams(l);
  var numset = 0;
  var length = lambdaStarParams(l) ? (params.length + curry.length) : lparams.length;
  for (var m = 0; m < length; m++) 
    if (!curry[m] && curry[m] != 0 && (params[numset] || params[numset] == 0)) curry[m] = params[numset++];
  if (numset < params.length && !lambdaStarParams(l))
    return makeError('CallError', "Too many parameters: " + params, ctx);

  return curry;
}
function rightCurry(l, params, ctx) {
  if (lambdaStarParams(l)) 
    return makeError('CallError', "Can't right curry a lambda with a variable number of parameters.", ctx);
  var curry = lambdaCurry(l) ? lambdaCurry(l).slice() : [];
  var lparams = lambdaParams(l);
  var numset = 0;
  var rparams = params.slice().reverse();
  for (var m = lparams.length-1; m >= 0; m--)
    if (!curry[m] && curry[m] != 0 && (rparams[numset] || rparams[numset] == 0)) curry[m] = rparams[numset++];
  if (numset < params.length) 
    return makeError('CallError', "Too many parameters: " + params, ctx);
  
  return curry;
}
function nCurry(l, n, param, ctx) {
  var lparams = lambdaParams(l);
  if (lparams.length <= n && ! lambdaStarParams(l)) 
    return makeError('CallError', "Lambda has only " + lparams.length + "parameters , can't set parameter " + n, ctx);

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
function isPackage(p) { return (p instanceof Array) && p[0] == 'package'; }

// Script errors
//

function makeError(name, description, ctx) {
  var latest = ctx[0];
  return ['error', name, description, CURRENT_FILE, latest[0] || -1, latest[1] || -1, ctx];
}
function errorName(err) { return err[1]; }
function errorDesc(err) { return err[2]; }
function error(e) { return (e instanceof Array) && e[0] == 'error'; }
function stackContext(ctx, line, pos) {
  return [[line,pos]].concat(ctx);
}
function setContext(ctx, line, pos) {
  var latest = ctx[0];
  if (latest) {
    latest[0] = line;
    latest[1] = pos;
  } else ctx.push([line, pos]);
  return ctx;
}


// Primitives handling
//
function makePrimitive(name, params, body) { return ['primitive', params, null, body, name]; }
function makeCurriedPrimitive(p, curry) { return ['primitive', primitiveParams(p), curry, primitiveBody(p), p[4]]; }
function primitive(operation) { return operation[0] == 'primitive'; }
function primitiveBody(operation) { return operation[3]; }
function primitiveParams(operation) { return operation[1]; }

function applyPrimitive(operation, operands, env, ctx) {
  var primFn = primitiveBody(operation);
  if (typeof primFn == "function") return primFn.call(null, operands, env, ctx);
  else throw "Unrecognized primitive: " + operation[1] + ", most certainly a bug.";
}
function opEval(fn) {
  return function(operands, env, ctx) {
    var evl = evalList(operands, env, ctx);
    if (error(evl)) return evl;
    else return fn(evl, env, ctx); 
  };
}
function opTailEval(fn) {
  return function(operands, env, ctx) {
    var evl = evalList(operands.tail(), env, ctx);
    if (error(evl)) return evl;
    return fn([operands.first()].concat(evl), env, ctx); };
}
function typeDispatch(op) {
  return function(operands, env, ctx) {
    var first = eval_(operands.first(), env, ctx), typeFn;
    if (error(first)) return first;

    if (typeof first == 'number') typeFn = wNum[op];
    else if ((typeof first == 'string') || (first instanceof String)) typeFn = wString[op];
    else if (first instanceof Array) typeFn = wArray[op];
    else if (first instanceof Object) typeFn = wHash[op];
    else throw "Can't dispatch operation " + op + " to " + first + ", unknown type.";

    if (!typeFn) throw "Unknown function " + op + " for " + first;
    return typeFn([first].concat(operands.tail()), env, ctx);
  }
}

var primitives = {};
function addPrimitive(name, params, body) {
  primitives[name] = makePrimitive(name, params, body);
}

addPrimitive('if', ['predicate', 'consequence', 'opposite'],
  function(operands, env, ctx) {
    var pred = eval_(operands[0], env, ctx);
    if (error(pred)) return pred;

    if (pred) return eval_(operands[1], env, ctx);
    else if (operands.length > 2) return eval_(operands[2], env, ctx);
  });
addPrimitive('lambda', ['parameters*', 'body'], 
  function(operands, env, ctx) {
    return makeLambda(operands.slice(0, -1), operands.last(), CURRENT_FILE, env, ctx);
  });
addPrimitive('macro', ['pattern', 'body'], 
  function(operands, env, ctx) {
    var pattern = operands.first();
    var key = patternKey(pattern);
    var mframe = env.first()[1];
    var decl = ['macro', pattern, operands.last(), macroId++, env];
    mframe[key] = decl;
    return key;
  });
addPrimitive('package', ['name', 'body'],
  function(operands, env, ctx) {
    var name = operands[0]; // TODO should delegate back to eval_, just need error handling
    var existingPackage = variableValue(name, env);
    var newFrame = (typeof existingPackage != "undefined") ? packageFrame(existingPackage) : [];
    var innerEnv = extendEnv(newFrame, env);

    var evalBody = eval_(operands[1], innerEnv, ctx);
    if (error(evalBody)) return evalBody

    var p = makePackage(name, newFrame);
    setVariableValue(name, p, env, ctx);
    return null;
  });
addPrimitive('import', ['name'],
  function(operands, env, ctx) {
    var name = operands[0];
    var p = eval_(name, env, ctx);
    if (error(p)) return p;
    if (!isPackage(p)) 
      return makeError('ReferenceError', "Unknown package: " + name, setContext(ctx, name.line, name.pos));

    var pframe = packageFrame(p);
    var mergeFrame = env[0][0];
    pframe.eachPair(function(k, v) { mergeFrame[k] = v; });
    return true;
  });
addPrimitive('::', ['package', 'definition'],
  function(operands, env, ctx) {
    var name = operands[0];
    var p = eval_(name, env, ctx);
    if (error(p)) return p;
    if (!isPackage(p)) 
      return makeError('ReferenceError', "Unknown package: " + name, setContext(ctx, name.line, name.pos));
    return packageFrame(p)[operands[1]];    
  });
addPrimitive('print', ['elements*'], 
  function(operands, env, ctx) {
    return primitiveBody(primitives.prit)(operands.concat(["\"\\n\""]), env, ctx);
  });
addPrimitive('prit', ['elements*'], opEval(
  function(operands, env, ctx) {
    if (operands.isEmpty()) return;
    var f = operands.first();
    var str = f != null ? f.toString() : "";
    for (var m = 1, opr; opr = operands[m]; m++) { str += opr.toString(); };
    pr(str); 
    return;
  })),
addPrimitive('eval', ['expr'], 
  function(operands, env, ctx) {
    return eval_(parse(eval_(operands.first()), env), env, ctx);
  });
addPrimitive('apply', ['function', 'params*'], opEval(
  function(operands, env, ctx) {
    if (operands.length == 2)
      return apply(operands.first(), operands[1], env, true, ctx);
    else
      return apply(operands.first(), operands.tail(), env, true, ctx);
  })),
addPrimitive('`', ['expr'], 
  function(operands, env, ctx) {
    return escapeEval(operands.first(), env, ctx);
  });
addPrimitive('throw', ['error', 'msg?'],
  function(operands, env, ctx) {
    var param = null;
    if (operands.length > 1) {
      param = eval_(operands[1], env, ctx);
      if (error(param)) return param;
    }
    return makeError(operands.first(), param, ctx);
  });
addPrimitive('try', ['body', 'catches*'],
  function(operands, env, ctx) {
    var res = eval_(operands[0], env, ctx);
    // TODO finally
    // TODO named variables for second parameter of throw
    if (error(res)) {
      var evalOps = [];
      for (var m = 1; m < operands.length; m++) {
        var catsh = eval_(operands[m], env, ctx);
        if (error(catsh)) return catsh;
        if (catsh[0] != 'catch') 
          makeError('TypeError', "After the first block, all try operands should be a catch.", ctx);

        if (catsh[1] == null || catsh[1].valueOf() == errorName(res).valueOf()) {
          if (catsh[3]) {
            if (catsh[2]) setVariableValue(catsh[2], errorDesc(res), catsh[4], ctx);
            return eval_(catsh[3], catsh[4], ctx);
          } else return null;
        }
      }
      return res;
    }
    else return res;
  });
addPrimitive('catch', ['name', 'var?', 'body'],
  function(operands, env, ctx) {
    var name = operands[0];
    if (variableRef(name) && !quoted(name) && !selfEval(name)) {
      var bound = operands[1];
      if (variableRef(bound) && !quoted(bound) && !selfEval(bound) && operands.length > 2)
        return ['catch', name, bound, operands[2], env, CURRENT_FILE];
      else
        return ['catch', name, null, operands[1], env, CURRENT_FILE];
    }
    else return ['catch', null, null, operands[0], env, CURRENT_FILE];
  });
addPrimitive('load', ['file'], opEval(
  function(operands, env, ctx) {
    var previousFile = CURRENT_FILE;
    CURRENT_FILE = operands.first();
    var ctnt = readfile(CURRENT_FILE);
    var res =  eval_(parse(ctnt), env, ctx);
    CURRENT_FILE = previousFile;
    return res;
  }));
addPrimitive('defined?', ['name'],
  function(operands, env) {
    return (typeof variableValue(operands[0], env) != "undefined")
  });
addPrimitive('L', ['elements*'], opEval(
  function(operands, env) {
    var arr = operands.slice();
    arr.sntx = 'L';
    return arr;
  }));
addPrimitive('H', ['elements*'],
  function(operands, env, ctx) {
    var h = {};
    if (operands.length % 2 == 1) 
      makeError('CallError', "Odd number of parameters in hash creation.", ctx);
    for(var m = 0; m < operands.length; m = m + 2)
      h[eval_(operands[m], env)] = eval_(operands[m+1], env, ctx);
    h.length = operands.length / 2;
    return h;
  });
addPrimitive('for', ['listOrInit', 'lambdaOrStopCond', 'incrementExpr', 'body'], 
  function(operands, env, ctx) {
    if (operands.length == 2) {
      // First form iterating through a list
      var list = eval_(operands.first(), env, ctx);
      var lambda = eval_(operands[1], env, ctx);
      var idx = (lambdaParams(lambda).length == 2);
      var ret = null;
      for (var m = 0; m < list.length; m++) {
        var params = [list[m]];
        if (idx) params.push(m);
        var ret = apply(lambda, params, env, true, ctx);
        if (error(ret)) return ret;
      }
      return ret;
    } else {
      // Second form with start and end conditions
      var init = operands.first(), stop = operands[1], inc = operands[2];
      var body = operands.last();
      var ret = null;
      for (eval_(init, env, ctx); eval_(stop, env, ctx); eval_(inc, env, ctx)) {
        ret = eval_(body, env, ctx);
      }
      return ret;
    }
  });
addPrimitive('at', ['list', 'index'],
  function(operands, env, ctx) {
    return typeDispatch('at')(operands, env, ctx);
  });
addPrimitive('@', ['list', 'index'],
  function(operands, env, ctx) {
    return typeDispatch('@')(operands, env, ctx);
  });
addPrimitive('@!', ['list', 'index', 'value'],
  function(operands, env, ctx) {
    return typeDispatch('@!')(operands, env, ctx);
  });
addPrimitive('applic?', ['expr'],
  function(operands, env, ctx) {
    return application(eval_(operands.first(), env, ctx));
  });
addPrimitive('fnName', ['applic'],
  function(operands, env, ctx) {
    var f = eval_(operands.first(), env, ctx);
    if (application(f)) return operator(f);
    else return null;
  });
addPrimitive('params?', ['applic'],
  function(operands, env, ctx) {
    var f = eval_(operands.first(), env, ctx);
    if (application(f)) {
      if (f[1] && f[1].length > 0) return true;
      else return false;
    } else return null;
  });
addPrimitive('params', ['applic'],
  function(operands, env, ctx) {
    var f = eval_(operands.first(), env, ctx);
    if (application(f) && (typeof f[1] != "undefined")) return f[1];
    else return null;
  });
addPrimitive('nthParam', ['applic', 'idx'],
  function(operands, env, ctx) {
    var f = eval_(operands.first(), env, ctx);
    var idx = eval_(operands[1], env, ctx);
    if (application(f) && (typeof f[1] != "undefined")) return f[1][idx];
    else return null;
  });
addPrimitive('lcurry', ['lambda', 'parameters*'], opEval(
  function(operands, env, ctx) {
    var fn = operands.first();
    if (lambda(fn)) return makeCurriedLambda(fn, leftCurry(fn, operands.tail(), ctx));
    else if (primitive(fn)) return makeCurriedPrimitive(fn, leftCurry(fn, operands.tail(), ctx));
    else makeError('CallError', "The first parameter of leftCurry should be a function.", ctx);
  }));
addPrimitive('rcurry', ['lambda', 'parameters*'], opEval(
  function(operands, env, ctx) {
    var fn = operands.first();
    if (lambda(fn)) return makeCurriedLambda(fn, rightCurry(fn, operands.tail(), ctx));
    else if (primitive(fn)) return makeCurriedPrimitive(fn, rightCurry(fn, operands.tail(), ctx));
    else makeError('CallError', "The first parameter of rightCurry should be a function.", ctx);
  }));
addPrimitive('ncurry', ['lambda', 'index', 'parameter'], opEval(
  function(operands, env, ctx) {
    var fn = operands.first();
    var idx = operands[1];
    if (typeof idx != "number") throw "Second parameter of ncurry must be a number."
    if (lambda(fn)) return makeCurriedLambda(fn, nCurry(fn, idx, operands[2], ctx));
    else if (primitive(fn)) return makeCurriedPrimitive(fn, nCurry(fn, idx, operands[2], ctx));
    else makeError('CallError', "The first parameter of nurry should be a function.", ctx);
  }));
addPrimitive('=', ['symbol', 'value'], 
  function(operands, env, ctx) {
    var name = operands[0];
    var newval = eval_(operands[1], env, ctx);
    return setVariableValue(name, newval, env, ctx);
  });
addPrimitive('==', ['loperand', 'roperand'], opEval(
  function(operands, env, ctx) {
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
addPrimitive('map', ['list', 'function'],
  function(operands, env, ctx) {
    var list = eval_(operands.first(), env, ctx);
    var lambda = eval_(operands[1], env, ctx);
    var newlist = [];
    newlist.sntx = list.sntx;
    for (var m = 0; m < list.length; m++) {
      var res = apply(lambda, [list[m]], env, true, ctx);
      if (error(res)) return res;
      newlist.push(res); 
    }
    return newlist;
  });
addPrimitive('split', ['string', 'separator', 'maxSplit'], opTailEval(typeDispatch('split')));

