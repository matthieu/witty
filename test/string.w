assert(length("abcd") == 4, "Simple string length failed.")

assert(split("abc", "b").0 == "a", "Splitting a simple string failed.")
assert(split("abc", "b").1 == "c", "Splitting a simple string failed.")
