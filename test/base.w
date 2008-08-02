descriptions = L()

macro(describe(`str, `descBody), `(
  lambda(
    cases = L()
    before = null
 
    macro(before(`freq, `befBody), `(
      if($freq == "each", before = lambda($befBody))
    ))
    macro(it(`desc, `itBody), `(
      push(cases, L($desc, lambda($itBody)))
    ))
    $descBody

    push(descriptions, L("describe", $str, before, cases));
  )()
))

load("test/arithmetics.w")
load("test/list.w")
load("test/control.w")

//load("test/lambda.w")
//load("test/macro.w")

print("descriptions: " + descriptions);
for(descriptions, lambda(desc,
  print(desc.1)
  for(desc.3, lambda(case,
    caseBody = case.1
    if (desc.2,
      bef = desc.2
      bef()
    )
    print("  " + case.0 + " -> " + if(caseBody(), "OK", "FAILED"))
  ))
))

// Invocation of a lambda stored in a list: foo.5()
// provide primitives allowing read/write access to witty code so code can be created or altered directly
// basic list operations (push, pop, ...)
// real exceptions with script line error numbers
// single param lambdas syntax sugar: \(..)
// multiline strings
// recursive lambdas when they're not named
// macro including macros
// recursive macros
// function composition
// delay and force
