assert = lambda(expr, msg, if(! expr, throw(msg), true))

alist = L(3,4,"bar",6)
assert(alist.0 == 3, "Wrong list value at index 0.")
assert(alist.1 == 4, "Wrong list value at index 1.")
assert(alist.2 == "bar", "Wrong list value at index 2.")
assert(alist.3 == 6, "Wrong list value at index 3.")

added = L(4,5) + L(7,8)
assert(added.0 == 4, "Wrong list addition value at index 0.")
assert(added.1 == 5, "Wrong list addition value at index 1.")
assert(added.2 == 7, "Wrong list addition value at index 2.")
assert(added.3 == 8, "Wrong list addition value at index 3.")

subst = L(4,"foo",9,3) - L(3,"foo")
assert(subst.0 == 5, "Wrong list substraction value at index 0.")
assert(subst.1 == 9, "Wrong list substraction value at index 1.")
