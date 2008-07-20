// Creation, application
//
old_plus = +
+ = lambda(a, b, a - b)
assert(5 + 2 == 3, "Couldn't redefine + operator.")
+ = old_plus
assert(5 + 2 == 7, "Couldn't restore + operator.")

assert((lambda(n, n + 3)(4)) == 7, "Applying a lambda directly failed (n+3)")
assert((lambda(n, n * 10)(4)) == 40, "Applying a lambda directly failed (n*10)")

// Currying
//
=(add, lambda(a,b, +(a,b)))
add2 = lcurry(add, 2)
assert(add2(3) == 5, "Curried add lambda didn't produce expected result (5).")
assert(add2(7) == 9, "Curried add lambda didn't produce expected result (9).")

fact = lambda(n, if(n == 1, 1, n * fact(n - 1)))
fact5 = lcurry(fact, 5)
assert(fact5() == 120, "Curried factorial of 5 didn't produce expected result.")

testIt = rcurry(if, 1, 0)
assert(testIt(2 == 3) == 0, "Right currying of if failed (0).")
assert(testIt(3 == 3) == 1, "Right currying of if failed (1).")
