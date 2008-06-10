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



function selfEval(exp) { return (!isNaN(exp)); }
function quoted(exp) { return ((typeof exp) == 'string') && exp[0] == '"'; }
