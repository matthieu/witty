function patternMatch(pattern, datum, frame) {
  if (frame == 'fail') return 'fail';
  else if (pattern.valueOf() == datum.valueOf()) return frame;
  else if (macroVar(pattern)) return extendIfConsistent(pattern, datum, frame);
  else if ((pattern instanceof Array) && (datum instanceof Array)) {
    if (pattern.sntx != datum.sntx) return 'fail';
    else if (pattern.length > datum.length) return 'fail';
    else if (pattern.length == 0 && datum.length == 0) return frame;
    else if (pattern.length == 1 && datum.length > 1 && macroVar(pattern[0])) 
      return extendIfConsistent(pattern[0], datum, frame);
    else if (pattern.length > 0 && datum.length > 0) 
      return patternMatch(pattern.tailAtom(), datum.tailAtom(),
          patternMatch(pattern.first(), datum.first(), frame));
  }
  return 'fail';
}

function extendIfConsistent(variable, datum, frame) {
  var val = frame[variable.substring(1)];
  if (val) return patternMatch(val, datum, frame);
  else {
    frame[variable.substring(1)] = datum;
    return frame;
  }
}

function macroVar(pattern) { return ((typeof pattern == 'string') || (pattern instanceof String)) && pattern[0] == '`' }

var macroId = 0;
function macro(expr) { return expr[0] == 'macro'; }
function patternKey(pattern) {
  for (var m = 0, el; el = pattern[m]; m++) 
    if (!macroVar(el)) return el;
  throw "No key in pattern: " + pattern;
}

function expandMacros(exps, env, ctx) {
  var macroApplics = [];
  for (var m = 0, el; el = exps[m]; m++) {
    var mac = variableValue(el, env, true);
    if (mac) {
      if (macroApplics[mac[3]]) macroApplics[mac[3]].push([m, mac]); 
      else macroApplics[mac[3]] = [[m, mac]];
    }
  }
  var expanded = false;
  macroApplics.reverse().forEach(function(applics) {
    if (applics)
      applics.forEach(function(applic) {
        if (rewriteWithMacro(exps, env, ctx, macroApplics, applic[0], applic[1])) expanded = true;
      });
  });
  return expanded;
}

function rewriteWithMacro(exps, env, ctx, macroApplics, index, mac) {
  var frame, offset;
  for (var m = -1; m < 2; m++) {
    if (!frame) {
      frame = matchAt(index + m, mac[1], exps);
      offset = m;
    }
  }
  if (frame) {
    expansion = eval_(mac[2], extendEnv(frame, env), ctx);
    if (application(exps) && application(expansion)) {
      exps.splice(0, exps.length);
      exps.pushAll(expansion);
    } else
      exps.splice(index + offset, mac[1].length, expansion);
      reindexFoundMacro(index + offset, 1 - mac[1].length, macroApplics);
    return true;
  }
  return false;
}

function reindexFoundMacro(index, offset, macroApplics) {
  macroApplics.forEach(function(applics) {
    if (applics)
      applics.forEach(function(applic) {
        if (applic[0] > index) applic[0] = applic[0] + offset;
      });
  });
}

function matchAt(index, pattern, exps) {
  var frame = {};
  var extract = exps.slice(index, index + pattern.length);
  extract.sntx = exps.sntx;
  if (exps[index] && patternMatch(pattern, extract, frame) != 'fail')
    return frame;
  else return null;
}

// TODO escape code blocks like $(...)
function escapeEval(exps, env, ctx) {
  var copy = exps.clone();
  if (!copy[0]) return copy;
  
  for (var m = 0; m < copy.length; m++) {
    if (copy[m][0] == '$' || copy[m][0] == '$<') {
      if (application(copy[m])) {
        var bodyEval = eval_(copy[m][1][0], env, ctx);
        if (copy[m][0] == '$') copy[m] = bodyEval;
        else if (copy[m][0] == '$<' && bodyEval instanceof Array) {
          copy = copy.slice(0, m).concat(bodyEval).concat(copy.slice(m + 1, copy.length));
          m = m + bodyEval.length - 1;
        }
      } else {
        var value = variableValue(copy[m].substring(1), env);
        if (typeof value != 'undefined') {
          if (value.sntx == 'L' && copy.sntx == 'L') {
            copy = copy.slice(0, m).concat(new Array(value)).concat(copy.slice(m + 1, copy.length));
            m = m + value.length - 1;
          } else
            copy[m] = value;
        }
      }
    } else if (copy[m] instanceof Array) {
      copy[m] = escapeEval(copy[m], env);
    }
  }
  return copy;
}
