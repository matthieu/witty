=(add, lambda(a,b, +(a,b)))
assert(==(add(1,2), 3))
assert(==(add(5,10), 15))

=(a, 2)
if(true, null, =(a,4))
assert(==(a, 2), "If shouldn't evaluate wrong branch.")
if(false, =(a,4), null)
assert(==(a, 2), "If shouldn't evaluate wrong branch.")

=(fact1, lambda(n, if(==(n, 1), 1, *(n, fact1(-(n, 1))))))
fact2 = lambda(n, if(n == 1, 1, n * fact2(n - 1)))
assert(fact1(5) == fact2(5) == 120, "Factorial produced a wrong result.")
assert(fact1(8) == fact2(8) == 40320, "Factorial produced a wrong result.")

old+ = +
+ = lambda(a, b, a - b)
assert(5 + 2 == 3, "Couldn't redefine + operator.")
+ = old+

+ = macro(?a '+' ?b, #( +($a, $b) ))

? = macro(?pred '?' ?b1 ':' ?b2, if($pred, $b1, $b2))
let = macro(var, val, block, lambda($var, $block)($val))
