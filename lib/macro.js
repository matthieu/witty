function patternMatch(pattern, datum, frame) {
  if (frame == 'fail') return 'fail';
  else if (pattern == datum) return frame;
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

function macroVar(pattern) { return !selfEval(pattern) && !quoted(pattern) && (typeof pattern == 'string') && pattern[0] == '`' }

var macroId = 0;
function macro(expr) { return expr[0] == 'macro'; }
function patternKey(pattern) {
  for (var m = 0, el; el = pattern[m]; m++) 
    if (!macroVar(el)) return el;
  throw "No key in pattern: " + pattern;
}

function expandMacros(exps, env) {
  var macroApplics = [];
  for (var m = 0, el; el = exps[m]; m++) {
    var macArr = variableValue(el, env, true);
    if (macArr)
      for (var n = 0, mac; mac = macArr[n]; n++)
        if (macro(mac)) {
          if (macroApplics[mac[3]]) macroApplics[mac[3]].unshift([m, mac]); 
          else macroApplics[mac[3]] = [[m, mac]];
        }
  }
  var expanded = false;
  macroApplics.reverse().forEach(function(applics) {
    applics.forEach(function(applic) {
      if (rewriteWithMacro(exps, env, macroApplics, applic[0], applic[1])) expanded = true;
    })
  });
  return expanded;
}

function rewriteWithMacro(exps, env, macroApplics, index, mac) {
  var frame, offset;
  for (var m = -1; m < 2; m++) {
    if (!frame) {
      frame = matchAt(index + m, mac[1], exps);
      offset = m;
    }
  }
  if (frame) {
    expansion = eval_(mac[2], extendEnv(frame, env));
    exps.splice(index + offset, mac[1].length, expansion);
    reindexFoundMacro(index + offset, 1 - mac[1].length, macroApplics);
    return true;
  }
  return false;
}

function reindexFoundMacro(index, offset, macroApplics) {
  macroApplics.forEach(function(applics) {
    applics.forEach(function(applic) {
      if (applic[0] > index) applic[0] = applic[0] + offset;
    })
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
function escapeEval(exps, env) {
  var copy = exps.clone();
  if (!copy[0]) return copy;
  
  for (var m = 0; m < copy.length; m++) {
    if (copy[m] instanceof Array) {
      copy[m] = escapeEval(copy[m], env);
    } else if (copy[m][0] == '$') {
      var value = variableValue(copy[m].substring(1), env);
      if (value.sntx == 'L' && copy.sntx == 'L') {
        copy = copy.slice(0, m).concat(value).concat(copy.slice(m + 1, copy.length));
        m = m + value.length - 1;
      } else
        copy[m] = value;
    }
  }
  return copy;
}
