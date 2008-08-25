describe("Simple lambda definitions",
  =(add, lambda(a,b, +(a,b)))
  fact = lambda(n, if(n == 1, 1, n * fact(n - 1)))

  it("should allow a working definition of a add(1,2) function based on +", ==(add(1,2), 3))
  it("should allow a working definition of a add(5,10) function based on +", ==(add(5,10), 15))
  it("should allow a working definition of factorial(5)", fact(5) == 120)
  it("should allow a working definition of factorial(8)", fact(8) == 40320)
)

describe("Primitive redefinition",
  it("should allow overriding the + operator behavior", 
    old_plus = +
    + = lambda(a, b, a - b)
    res = 5 + 2
    + = old_plus
    res + 3 == 6
  )
)

describe("Direct lambda application",
  it("should work after applying a curried +", (lambda(n, n + 3)(4)) == 7)
  it("should work after applying a curried *", (lambda(n, n * 10)(4)) == 40)
)

describe("Lambda currying",
  =(add, lambda(a,b, +(a,b)))
  add2 = lcurry(add, 2)
  addto10 = lcurry(add, 3, 7)
  it("should work when left currying a simple addition with 2 lambda and applying to 3", add2(3) == 5)
  it("should work when left currying a simple addition with 2 lambda and applying to 7", add2(7) == 9)
  it("should work when left currying a simple addition with both 3 and 7", addto10() == 10)

  fact = lambda(n, if(n == 1, 1, n * fact(n - 1)))
  fact5 = lcurry(fact, 5)
  it("should work when left currying a single valued lambda like factorial with 5", fact5() == 120)

  testIt = rcurry(if, 1, 0)
  it("should work when right currying if with 1 for then branch and 0 for else branch applied to 2==3", testIt(2 == 3) == 0)
  it("should work when right currying if with 1 for then branch and 0 for else branch applied to 3==3", testIt(3 == 3) == 1)

  successOnly = ncurry(if, 1, "success")
  it("should work when n-currying if at position 1 (then branch) applied to 1==1",
      successOnly(1 == 1) == "success")
  it("should work when n-currying if at position 1 (then branch) applied to 1==0",
      successOnly(1 == 0) != "success")
  it("should work when n-currying if at position 1 (then branch) applied to (1==0, failed)",
      successOnly(1 == 0, "failed") == "failed")
)
