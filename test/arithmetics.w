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

m1 = m2 = 3
assert(m1 == 3, "Multi-assign didn't set m1 value.");
assert(m2 == 3, "Multi-assign didn't set m2 value.");

assert(2+(1+3)==6, "Basic calculation 2+(1+3)==6 failed.");
assert(2 + (1 + 3) == 6, "Basic calculation 2 + (1 + 3) == 6 failed.");
assert(2*(1+3)==8, "Basic calculation 2*(1+3)==8 failed.");
assert(2 * (1 + 3) == 8, "Basic calculation 2 * (1 + 3) == 8 failed.");
assert((1+3)*2==8, "Basic calculation (1+3)*2==8 failed.");
assert((1 + 3) * 2 == 8, "Basic calculation (1 + 3) * 2 == 8 failed.");

val = 0
val += 3
val -= 1
val += 2
assert(val == 4, "Error with += and -= calculations")
