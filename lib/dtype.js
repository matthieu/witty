var wNum = {
  '+': function(operands, env) {
    return operands.reduceFirst(function(acc, el) { return acc + el; });
  },
  '-': opEval(function(operands, env) { 
    return operands.reduceFirst(function(acc, el) { return acc - el; });
  }), 
  '*': opEval(function(operands, env) {
    return operands.reduceFirst(function(acc, el) { return acc * el; });
  }), 
  '/': opEval(function(operands, env) {
    return operands.reduceFirst(function(acc, el) { return acc / el; });
  })
};

var wArray = {
  '+': function(operands, env) {
    return operands.reduceFirst(function(arr, el) { return arr.concat(el); });
  },
  '-': function(operands, end) {
    var arr = operands.first().slice();
    for (var o = 1, opr; opr = operands[o]; o++) {
      var sub = operands[o];
      for (var m = 0; m < arr.length; m++){ 
        var src=arr[m],found=false, src;
        for (var n = 0; (n < sub.length) && (src >= (src2 = sub[n])); n++) 
          if (src2==src) { found=true; break; } 
        if (found) arr.splice(m--,1);
      } 
    }
    return arr;
  },
  '.': function(operands, env) {
    var k = operands[1];
    if (typeof k == "number") return operands[0][k];
    else return wArray[k](operands, env);
  },
  'each': function(operands, env) {
    return ['primitive', '+'];
  }
};

var wString = {
  '+': wNum['+'],
  '.': wArray['.']
};

