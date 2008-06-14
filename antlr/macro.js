function patternMatch(pattern, datum, frame) {
  print("patt " + JSON.stringify(pattern));
  print("dat " + JSON.stringify(datum));
  if (frame == 'failed') return 'failed';
  else if (pattern == datum || pattern[0] == datum[0]) return frame;
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

function expandMacros(exps, env) {
  var macroApplics = [];
  for (var m = 0, el; el = exps[m]; m++) {
    var val = variableValue(el, env);
    if (val && macro(val)) macroApplics[val[3]] = [m, val];
  }
  var globalOffset = 0;
  print(macroApplics);
  macroApplics.forEach(function(applic) {
    var frame = {};
    var offset = 100;
    var macroPattern = applic[1][1];
    var currentPos = globalOffset + applic[0];
    // Trying to match the pattern one symbol before the macro for (a + b) cases
    // and one after for mac(a,b) cases
    print("patt " + JSON.stringify(macroPattern));
    print("curr " + exps);
    print("l " + JSON.stringify(exps.slice(currentPos, currentPos + macroPattern.length)));
    if (currentPos > 0 && patternMatch(macroPattern, exps.slice(currentPos-1, currentPos + macroPattern.length-1), frame) != 'fail')
      offset = -1;
    else if (patternMatch(macroPattern, exps.slice(currentPos, currentPos + macroPattern.length), frame) != 'fail')
      offset = 0;
    else if (exps[currentPos + macroPattern + 1] && patternMatch(macroPattern, exps.slice(currentPos + 1, currentPos + macroPattern.length + 1), frame) != 'fail')
      offset = 1;

      print("offs " + offset);
    if (offset != 100) {
      print("ev " + applic[1][2] + " " + (JSON.stringify(applic[1][2])));
      print("ev " + eval_(applic[1][2], env));
      expansion = eval_(applic[1][2], [frame].concat(env));
      print("splice " +  currentPos + " length " + macroPattern.length + " -> " + expansion);
      exps.splice(currentPos + offset, macroPattern.length, expansion);
      globalOffset = globalOffset + offset;
    }
  });
}

function escapeEval(exps, env) {
  if (exps.length == 0) return [];
  
  var f = exps.first();
  if (f instanceof Array)
    return [escapeEval(f, env)].concat(escapeEval(exps.tail(), env));
  else if (f[0] == '$') {
    print(f.substring(1));
    return [eval_(f.substring(1), env)].concat(escapeEval(exps.tail(), env));
  } else
    return [f].concat(escapeEval(exps.tail(), env));
}
