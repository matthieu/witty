assert = lambda(expr, msg, if(! expr, throw(msg), true))

=(add, lambda(a,b, +(a,b)))
assert(==(add(1,2), 3), "Bad addition (1+2)")
assert(==(add(5,10), 15), "Bad addition (5+10)")

=(a, 2)
if(true, null, =(a,4))
assert(==(a, 2), "If shouldn't evaluate wrong branch.")
if(false, =(a,4), null)
assert(==(a, 2), "If shouldn't evaluate wrong branch.")

=(fact1, lambda(n, if(==(n, 1), 1, *(n, fact1(-(n, 1))))))
fact2 = lambda(n, if(n == 1, 1, n * fact2(n - 1)))
assert(fact1(5) == 120, "Factorial 5 produced a wrong result (nested flavor).")
assert(fact2(5) == 120, "Factorial 5 produced a wrong result (expanded flavor).")
assert(fact1(8) == 40320, "Factorial 8 produced a wrong result (nested flavor).")
assert(fact2(8) == 40320, "Factorial 8 produced a wrong result (expanded flavor).")

old+ = +
+ = lambda(a, b, a - b)
assert(5 + 2 == 3, "Couldn't redefine + operator.")
+ = old+
assert(5 + 2 == 7, "Couldn't restore + operator.")

m = 1;
n = 2;
assert(n + m == 3, "Macro replacement on variables doesn't produce the expected result.")
n = n + 1; m = m + 1;
assert(n + m == 5, "Macro replacement on modified variables doesn't produce the expected result.")

macro(other_add(?a,?b), #(+($a, $b)))
assert(other_add(4,7) == 11, "Macro other_add didn't alias addition.")

assert((lambda(n, n + 3)(4)) == 7, "Applying a lambda directly failed (n+3)")
assert((lambda(n, n * 10)(4)) == 40, "Applying a lambda directly failed (n*10)")

m1 = m2 = 3
assert(m1 == 3, "Multi-assign didn't set m1 value.");
assert(m2 == 3, "Multi-assign didn't set m2 value.");

//4+ = lambda(n, n + 4)
//assert(4+(6) == 10, "Couldn't define a lambda based on a symbol (+4)")

// TODO 2 + (1 + 3) or (2 * 3) + 1 break!
