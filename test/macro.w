// Simple macro replacement for basic arithmetic
//
m = 1;
n = 2;
assert(n + m == 3, "Macro replacement on variables doesn't produce the expected result.")
n = n + 1; m = m + 1;
assert(n + m == 5, "Macro replacement on modified variables doesn't produce the expected result.")

// Function-style macros
//
macro(other_add(`a,`b), `(+($a, $b)))
assert(other_add(4,7) == 11, "Macro other_add didn't alias addition.")

// Macro and lambda interaction
//
macro(foo(), `(fooFn()))
m = "init"
fooFn = lambda(m = "changed")
assert(foo() == "changed", "Macro calling function didn't produce expected result.")
assert(m == "changed", "Macro calling function didn't alter variable.")
fooFn = lambda(m = "changed again")
assert(foo() == "changed again", "Macro calling changed function didn't produce expected result.")
assert(m == "changed again", "Macro calling changed function didn't alter variable.")

macro(execCode(`code), `(execCodeFn(lambda(x, $code))))
execCodeFn = lambda(fn,
  fn(3)
)
y = 0
execCode(y = x)
assert(y == 3, "Macro calling a function with a function didn't produce expected result.")

// See if we can create the pred ? condTrue : condFalse syntax sugar
//
macro(`pred ? `b1 : `b2, `(if($pred, $b1, $b2)))
assert(((5==6) ? 1 : 2) == 2, "Symbolic if/else didn't execute failure case.")
assert(((5==5) ? 1 : 2) == 1, "Symbolic if/else didn't execute success case.")
