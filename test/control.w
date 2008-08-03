describe("If control structure",
  a = (b = 2)
  if(true, null, a = 4)
  if(false, b = 4, null)

  it("should return the then branch if predicate is true", 
    if(3 == 3, 5, 10) == 5
  )
  it("should return the else branch if predicate is false", 
    if(false, 5, 10) == 10
  )
  it("shouldn't evaluate the else branch if predicate is true", a == 2)
  it("shouldn't evaluate the then branch if predicate is false", b == 2)
)

describe("Basic for loops",
  counter = 0
  for(m = 0, m < 5, m=m+1,
    it("should iterate on index ", counter == m)
    counter = counter + 1
  )
  it("should have iterated 5 times", counter == 5)

  str = ""
  for(m = 0; n = 3 , 
      n < 11, 
      m += 1; n += 2,
    str = str + m
    str = str + n
  )
  it("should iterate with two index variables", str == "03152739")
)

describe("Iterated for loops",
  str = ""
  for(L(2,3,4), lambda(m, str = str + m))
  
  it("should iterate on each element of the list",print(":: " + str); str == "234")

  str2 = ""
  for(L(2,3,4), 
    lambda(m, count, 
      str2 = str2 + m
      str2 = str2 + count
    )
  )
  it("should iterate on each element with setting the counter appropriately", str2 == "203142")
)
