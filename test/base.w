assert = lambda(expr, msg, if(! expr, throw(msg), true))

load("test/arithmetics.w")
load("test/list.w")
load("test/control.w")
load("test/lambda.w")

m = 1;
n = 2;
assert(n + m == 3, "Macro replacement on variables doesn't produce the expected result.")
n = n + 1; m = m + 1;
assert(n + m == 5, "Macro replacement on modified variables doesn't produce the expected result.")

macro(other_add(`a,`b), `(+($a, $b)))
print("bb")
assert(other_add(4,7) == 11, "Macro other_add didn't alias addition.")
print("cc")

macro(`pred ? `b1 : `b2, `(if($pred, $b1, $b2)))
assert(((5==6) ? 1 : 2) == 2, "Symbolic if/else didn't execute failure case.")
assert(((5==5) ? 1 : 2) == 1, "Symbolic if/else didn't execute success case.")

// basic list operations (push, pop, ...)
// leftCurry, rightCurry and ncurry to build a new lambda out of an existing one with a preset param
// real exceptions with script line error numbers
// multiline strings
// macro including macros
// recursive macros
// macro including function calls
