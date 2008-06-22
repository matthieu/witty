function patternMatch(pattern, datum, frame) {
  if (frame == 'failed') return 'failed';
  else if (pattern == datum || ((pattern.length == 1 || datum.length == 1) && pattern[0] == datum[0])) return frame;
  else if (macroVar(pattern)) return extendIfConsistent(pattern, datum, frame);
  else if (pattern.length > 1 && datum.length > 1) 
    return patternMatch(pattern.tailAtom(), datum.tailAtom(),
        patternMatch(pattern.first(), datum.first(), frame));
  else return 'fail';
}

function extendIfConsistent(variable, datum, frame) {
  var val = frame[variable.substring(1)];
  if (val) return patternMatch(val, datum, frame);
  else {
    frame[variable.substring(1)] = datum;
    return frame;
  }
}

function macroVar(pattern) { return !selfEval(pattern) && !quoted(pattern) && (typeof pattern == 'string') && pattern[0] == '?' }

var macroId = 0;
function macro(expr) { return expr[0] == 'macro'; }
function patternKey(pattern) {
  for (var m = 0, el; el = pattern[m]; m++) { if ((typeof el == 'string') && (el[0] != '?')) return el; }
  throw "No key in pattern: " + pattern;
}

function expandMacros(exps, env) {
  var macroApplics = [];
  for (var m = 0, el; el = exps[m]; m++) {
    var val = variableValue(el, env, true);
    print("m: " + m + " " + val);
    if (val && macro(val)) {
      if (macroApplics[val[3]]) macroApplics[val[3]].push([m, val]); 
      else macroApplics[val[3]] = [[m, val]];
    }
  }
  macroApplics.reverse().forEach(function(applics) {
    applics.forEach(function(applic) {
      rewriteWithMacro(exps, env, macroApplics, applic[0], applic[1]);
    })
  });
}

function rewriteWithMacro(exps, env, macroApplics, index, mac) {
  var frame, offset;
  for (var m = -1; m < 2; m++)
    if (!frame) {
      frame = matchAt(index + m, mac[1], exps); 
      offset = m;
    }
  print("offs: " + offset);
  if (frame) {
    expansion = eval_(mac[2], extendEnv(frame, env));
    exps.splice(index + offset, mac[1].length, expansion);
    reindexFoundMacro(index + offset, 1 - mac[1].length, macroApplics);
  }
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
  if (exps[index] && patternMatch(pattern, exps.slice(index, index + pattern.length), frame) != 'fail')
    return frame;
  else return null;
}

// TODO escape code blocks like $(...)
function escapeEval(exps, env) {
  var copy = exps.clone();
  if (!copy[0]) return copy;
  
  for (var m = 0; m < exps.length; m++) {
    if (copy[m] instanceof Array) copy[m] = escapeEval(copy[m], env);
    else if (copy[m][0] == '$') {
      print(copy[m] + "->" + eval_(copy[m].substring(1), env));
      copy[m] = eval_(copy[m].substring(1), env);
    }
  }
  return copy;
}
