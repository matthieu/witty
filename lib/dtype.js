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
    var arr = operands.first();
    for (var m = 1, opr; opr = operands[m]; m++) { arr = arr.concat(opr); };
    return arr;
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
    return operands[0][operands[1]];
  }
};

var wString = {
  '+': wNum['+'],
  '.': wArray['.']
};

