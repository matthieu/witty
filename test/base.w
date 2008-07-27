assert = lambda(expr, msg, if(! expr, throw(msg), true))

load("test/arithmetics.w")
load("test/list.w")
load("test/control.w")
load("test/lambda.w")
load("test/macro.w")

// -1 doesn't work
// basic list operations (push, pop, ...)
// leftCurry, rightCurry and ncurry to build a new lambda out of an existing one with a preset param
// real exceptions with script line error numbers
// multiline strings
// macro including macros
// recursive macros
// macro including function calls
