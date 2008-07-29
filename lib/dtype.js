var wNum = {
  '+': function(operands, env) {
    return operands.reduceFirst(function(acc, el) { return acc + el; });
  },
  '-': opEval(function(operands, env) {
    if (operands.length == 1) return -operands[0];
    else return operands.reduceFirst(function(acc, el) { return acc - el; });
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
      for (var m = 0, el; (el = opr[m] || el == 0); m++) 
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
    var joinStr = operands[1] || '';
    return arr.join(joinStr);
  },
  'length': function(operands, env) {
    return operands.first().length;
  }, 
  'push': function(operands,env) {
    var arr = operands.first();
    arr.push(operands[1]);
    return arr;
  }
};

var wString = {
  '+': wNum['+'],
  '.': wArray['.'],
  'length': wArray['length'],
  'split': function(operands, env) {
    var str = operands.first();
    var sep = operands[1];
    var max = operands[2];
    return str.split(sep, max);
  }
};

