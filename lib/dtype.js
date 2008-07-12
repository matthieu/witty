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
  '-': function(operands, env) {
    var arr = operands.first().slice();
    for (var o = 1, opr; opr = operands[o]; o++) {
      var idx;
      for (var m = 0, el; el = opr[m]; m++) 
        if ((idx = arr.indexOf(el)) != null) arr.splice(idx, 1);
    }
    return arr;
  },
  '.': function(operands, env) {
    var k = operands[1];
    return operands[0][k];
  },
  'join': function(operands, env) {
    var arr = operands.first();
    var joinStr = operands[1];
    print("i " + JSON.stringify(joinStr));
    return arr.join(joinStr);
  }
};

var wString = {
  '+': wNum['+'],
  '.': wArray['.']
};

