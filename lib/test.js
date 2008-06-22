load('lib/lang.js')

function assert(pred, msg) { 
  if (!pred) throw msg;
}

// Pattern matching
//

assert(patternMatch(['foo'], ['foo'], {}) != 'fail', "Simple one element pattern didn't match.");
assert(patternMatch(['foo', 'bar'], ['foo', 'bar'], {}) != 'fail', "Simple two element pattern didn't match.");

var frame = {};
patternMatch(['?a', '+', '?b'], ['1', '+', '2'], frame);
assert(frame['a'] == 1, "Addition pattern didn't match first var.");
assert(frame['b'] == 2, "Addition pattern didn't match second var.");
var frame = {};
patternMatch(['?a', '+', '?b'], ['1', '+', ['2', '+', '3']], frame);
assert(frame['b'][0] == 2, "Addition pattern with array match didn't match second var.");
var frame = {};
patternMatch(new Applic('foo', new List('?a', '?b')), new Applic('foo', new List(2, 3)), frame);
assert(frame['a'] == 2, "Application pattern with param list match didn't match first var.");
assert(frame['b'] == 3, "Application pattern with param list match didn't match second var.");

var appl = new Applic('+', new List('$a', '$b'));
var res = escapeEval(appl, [[{'a': 1, 'b':'2'}, {}]]);
assert(res instanceof Applic, "escapeEval modified the Applic instance type.");
assert(res[1] instanceof List, "escapeEval modified the List instance type.");
assert(res[0] == '+', "Wrong escaped pattern evaluation for +(a,b): " + res[0]);
assert(res[1][0] == 1, "Wrong escaped pattern evaluation for +(a,b): " + res[1][0]);
assert(res[1][1] == 2, "Wrong escaped pattern evaluation for +(a,b): " + res[1][1]);

assert(patternKey(['?x', 'foo', '?y']) == 'foo', "Pattern key selection failed.");
assert(patternKey(['bar', 'foo', '?y']) == 'bar', "Pattern key selection failed.");
