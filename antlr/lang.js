load("runtime.js")
load("langLexer.js")
load("langParser.js")

function _evaluate(expr) {
  var cstream = new ANTLR.runtime.ANTLRStringStream(expr),
      lexer = new langLexer(cstream),
      tstream = new ANTLR.runtime.CommonTokenStream(lexer),
      parser = new langParser(tstream);

  var result = parser.block();
  print("-> " + result);
  return result;
}

function prettyArr(arr) {
  if (arr instanceof Array) {
    if (arr.length == 0) return "[]";
    var str = "[";
    arr.forEach(function(e) { 
      if (e instanceof Array) str = str + prettyArr(e);
      else str = str + (""+e);
      str = str + ", ";
    });
    var str = str.slice(0, -2) + "]";
    return str;
  } else return (""+arr);
}

print(prettyArr(_evaluate("foo(123, bar(\"abc\")); baz; joe() 1 + 2")));
print(prettyArr(_evaluate("123")));
