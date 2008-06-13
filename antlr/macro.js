function patternMatch(pattern, datum, frame) {
  if (frame == 'failed') return 'failed';
  else if (pattern == datum) return frame;
  else if (macroVar(pattern)) return extendIfConsistent(pattern, datum, frame);
  else if (pattern.length > 1 && datum.length > 1) 
    return patternMatch(pattern.tailAtom(), datum.tailAtom(),
        patternMatch(pattern.first(), datum.first(), frame));
  else return 'fail';
}

function extendIfConsistent(variable, datum, frame) {
  var val = frame[variable];
  if (val) return patternMatch(val, datum, frame);
  else {
    frame[variable] = datum;
    return frame;
  }
}

function macroVar(pattern) { return !selfEval(pattern) && !quoted(pattern) && (typeof pattern == 'string') }

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
    if (applic[0] > 0 && patternMatch(macroPattern, exps[currentPos - 1], frame) != 'fail')
      offset = -1;
    else if (patternMatch(macroPattern, exps[currentPos], frame) != 'fail')
      offset = 0;
    else if (exps[currentPos + 1] &&  patternMatch(macroPattern, exps[currentPos + 1], frame) != 'fail')
      offset = 1;

    if (offset != 100) {
      expansion = eval_(applic[1][2], [frame].concat(env));
      exps.splice(currentPos + offset, macroPattern.length, expansion);
      globalOffset = globalOffset + offset;
    }
  });
}

