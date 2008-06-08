=(add, lambda(a,b, +(a,b)))
assert(==(add(1,2), 3))
assert(==(add(5,10), 15))

=(a, 2)
if(true, null, =(a,4))
assert(==(a, 2), "If shouldn't evaluate wrong branch.")
if(false, =(a,4), null)
assert(==(a, 2), "If shouldn't evaluate wrong branch.")

=(fact, lambda(n, if(==(n, 1), 1, *(n, fact(-(n, 1))))))

