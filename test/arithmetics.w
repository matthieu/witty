describe("Calculation operators",
  it("should calculate 2+(1+3)", 2+(1+3)==6)
  it("should calculate (1 + 4) + 3", (1 + 4) + 3  == 8)
  it("should calculate 2*(1+3)", 2*(1+3)==8)
  it("should calculate 2 * 7 + 3", 2 * 7 + 3  == 17)
  it("should calculate (2+3)*7", (2+3)*7==35)
  it("should calculate (1 + 3) * 2", (1 + 3) * 2 == 8)
  it("should calculate 5-3", 5-3 == 2)
  it("should calculate -5 + 3", -5 + 3 == -2)
  it("should calculate 5-(-3)", 5-(-3) == 8)
)

describe("Comparison operators",
  it("should compare 3 < 2", 3 < 2 == false)
  it("should compare 3 < 3", 3 < 3 == false)
  it("should compare 3 < 4", 3 < 4 == true)
  it("should compare 3 <= 2", 3 <= 2 == false)
  it("should compare 3 <= 3", 3 <= 3 == true)
  it("should compare 3 > 2", 3 > 2 == true)
  it("should compare 3 > 3", 3 > 3 == false)
  it("should compare 4 > 3", 4 > 3 == true)
  it("should compare 3 >= 4", 3 >= 4 == false)
  it("should compare 3 >= 3", 3 >= 3 == true)
)

describe("Incrementing operators",
  val = 0
  val += 3
  val -= 1
  val += 2

  it("should increment and decrement a variable value", val == 4)
  it("should return the operation result", (val += 6) == 10)
)

describe("Logic operators",
  val1 = val2 = 0
  false && (val1 += 1)
  true || (val2 += 1)
  it("should combine (true || true)", (true || true) == true)
  it("should combine (false || true)", (false || true) == true)
  it("should combine (true || false)", (true || false) == true)
  it("should combine (false || false)", (false || false) == false)
  it("should combine (true && true)", (true && true) == true)
  it("should combine (false && true)", (false && true) == false)
  it("should combine (true && false)", (true && false) == false)
  it("should combine (false && false)", (false && false) == false)
  it("shouldn't evaluate the second operand of a false && combination", val1 == 0)
  it("shouldn't evaluate the second operand of a true || combination", val2 == 0)
)

describe("Multiple equal",
  m1 = m2 = 3
  it("should set the first variable", m1 == 3)
  it("should set the second variable", m2 == 3)
)
