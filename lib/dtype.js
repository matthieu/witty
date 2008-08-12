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
  '@': function(operands, env) {
    var k = eval_(operands[1], env);
    return operands[0][k];
  },
  '@!': function(operands, env) {
    var k = eval_(operands[1], env);
    var val = eval_(operands[2], env);
    operands[0][k] = val;
    return operands[0];
  },
  'at': function(operands, env) {
    var k = eval_(operands[1], env);
    return operands[0][k];
  },
  'at!': function(operands, env) {
    var k = eval_(operands[1], env);
    var val = eval_(operands[2], env);
    operands[0][k] = val;
    return operands[0];
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
  },
  'empty?': function(operands, env) {
    var arr = operands.first();
    return (arr.length == 0);
  }
};

var wHash = {
  'length': wArray['length'],
  'at': wArray['at'],
  'at!': wArray['at!'],
  '@': function(operands, env) {
    var k = operands[1];
    return operands[0][k];
  },
  '@!': function(operands, env) {
    var k = operands[1];
    var val = eval_(operands[2], env);
    var h = operands[0];
    if (typeof h[k] == "undefined") h.length = h.length + 1
    h[k] = val;
    return h;
  },
  'empty?': wArray['empty?']
}

var wString = {
  '+': wNum['+'],
  'at': wArray['at'],
  '@': wArray['@'],
  'length': wArray['length'],
  'split': function(operands, env) {
    var str = operands.first();
    var sep = operands[1];
    var max = operands[2];
    return str.split(sep, max);
  },
  'empty?': wArray['empty?']
};

