describe("Macro expressions",
  macro(`pred ? `b1 : `b2, `(if($pred, $b1, $b2)))
  it("should work when having more than one symbol ((5==6) ? 1 : 2)", ((5==6) ? 1 : 2) == 2)
  it("should work when having more than one symbol ((5==5) ? 1 : 2)", ((5==5) ? 1 : 2) == 1)
)

describe("Macro functions",
  macro(other_add(`a,`b), `(+($a, $b)))
  it("should allow aliasing for +", other_add(4,7) == 11)

  m = 0
  for(p = 0, p < 4, p+=1, other_add(m,p))
  it("should be consistent in loops", 6)
)

describe("Macros calling lambdas",
  macro(foo(), `(fooFn()))
  m = "init"
  fooFn = lambda(m = "changed")
  it("should return the lambda result", foo() == "changed")
  it("should have the same side effects as the function", m == "changed")

  it("should allow the redefinition of the lambda after the macro definition",
    fooFn = lambda(m = "changed again")
    foo() == "changed again"
  )

  macro(execCode(`code), `(execCodeFn(lambda(x, $code))))
  execCodeFn = lambda(fn,
    fn(3)
  )
  y = 0
  execCode(y = x)
  it("should allow code capture by wrapping in the lambda", y == 3)
)
