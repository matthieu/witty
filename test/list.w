// Index retrieval
alist = L(3,4,"bar",6)
assert(alist.0 == 3, "Wrong list value at index 0.")
assert(alist.1 == 4, "Wrong list value at index 1.")
assert(alist.2 == "bar", "Wrong list value at index 2.")
assert(alist.3 == 6, "Wrong list value at index 3.")
m=1
assert(alist.1 == 4, "Wrong list value at variable index.")

// Operations
//
added = L(4,5) + L(7,8)
assert(added.0 == 4, "Wrong list addition value at index 0.")
assert(added.1 == 5, "Wrong list addition value at index 1.")
assert(added.2 == 7, "Wrong list addition value at index 2.")
assert(added.3 == 8, "Wrong list addition value at index 3.")

subst = L(4,"foo",9,3) - L(3,"foo")
assert(subst.0 == 4, "Wrong list substraction value at index 0.")
assert(subst.1 == 9, "Wrong list substraction value at index 1.")

// Join
//
assert(join(L("foo", "bar")) == "foobar", "Failed to join strings with no separator")
assert(join(L(192, 168, 0 , 1), ".") == "192.168.0.1", "Failed to join ints with . separator")

// Length
assert(length(L()) == 0, "Empty list should have a 0 length.")
assert(length(L(1,2,3)) == 3, "Length of list of 3 didn't produce expected result.")

// Map
add2 = lcurry(+, 2)
assert(map(L(1,2,3), add2).0 == 3, "Map with add2 didn't produce expected result on first element of the list.")
assert(map(L(1,2,3), add2).2 == 5, "Map with add2 didn't produce expected result on first element of the list.")
assert(length(map(L(), add2)) == 0, "Map of an empty list didn't produce an empty list.")
