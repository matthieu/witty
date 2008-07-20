=(a, 2)
if(true, null, =(a,4))
assert(==(a, 2), "If shouldn't evaluate wrong branch.")
if(false, =(a,4), null)
assert(==(a, 2), "If shouldn't evaluate wrong branch.")

counter = 0
for(m = 0, m < 10, m=m+1, 
  assert(counter == m, "Manual and automatic counter differ in for loop: " + m + " / " + counter)
  counter = counter + 1
)
assert(counter == 10, "Counter based for loop didn't execute expected iteration count:" + counter)

str = ""
for(m = 0; n = 3 , 
    n < 11, 
    m += 1; n += 2,
  str = str + m
  str = str + n
)
assert(str == "03152739", "Double counter based loop didn't produce expected result")

str = ""
for(L(2,3,4), lambda(m, str = str + m))
assert(str == "234", "Lambda based for loop didn't iterate over list properly.")

str = ""
for(L(2,3,4), 
  lambda(m, count, 
    str = str + m
    str = str + count
  )
)
assert(str == "203142", "Lambda based for loop with counter didn't iterate over list properly.")
