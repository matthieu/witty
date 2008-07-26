// Basic Calculations
//
assert(2+(1+3)==6, "Basic calculation 2+(1+3)==6 failed.");
assert(2 + (1 + 3) == 6, "Basic calculation 2 + (1 + 3) == 6 failed.");
assert(2*(1+3)==8, "Basic calculation 2*(1+3)==8 failed.");
assert(2 * (1 + 3) == 8, "Basic calculation 2 * (1 + 3) == 8 failed.");
assert((1+3)*2==8, "Basic calculation (1+3)*2==8 failed.");
assert((1 + 3) * 2 == 8, "Basic calculation (1 + 3) * 2 == 8 failed.");
assert(5-3 == 2, "Basic substraction failed (5-3).");
assert(-5+3 == -2, "Something is wrong with the - unary operator.");
assert(5-(-3) == 8, "Something is wrong with the - unary operator.");

// Comparison
//
assert(3 < 2 == false, "Lesser than comparison failed (false).")
assert(3 < 3 == false, "Lesser than comparison failed (equality case).")
assert(3 < 4 == true, "Lesser than comparison failed (true).")
assert(3 <= 2 == false, "Lesser or equal than comparison failed.")
assert(3 <= 3 == true, "Lesser or equal than comparison failed (equality case).")
assert(3 > 2 == true, "Greater than comparison failed (false).")
assert(3 > 3 == false, "Greater than comparison failed (equality case).")
assert(4 > 3 == true, "Greater than comparison failed (true).")
assert(3 >= 4 == false, "Greater or equal than comparison failed.")
assert(3 >= 3 == true, "Greater or equal than comparison failed (equality case).")

// Increment operators
//
val = 0
val += 3
val -= 1
val += 2
assert(val == 4, "Error with += and -= calculations")
assert((val += 6) == 10, "Error with += and -= calculations inline")

m1 = m2 = 3
assert(m1 == 3, "Multi-assign didn't set m1 value.");
assert(m2 == 3, "Multi-assign didn't set m2 value.");


