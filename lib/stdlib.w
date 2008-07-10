// Operators, order is establishing precedence
macro(`a = `b, `(=($a, $b)))
macro(`a == `b, `(==($a, $b)))
macro(`a + `b, `(+($a, $b)))
macro(`a - `b, `(-($a, $b)))
macro(`a * `b, `(*($a, $b)))
macro(`a / `b, `(/($a, $b)))
macro(! `a, `(!($a,0)))

//macro(`arr . `idx, `(.($arr, $idx)))
//macro(`arr . `idx(`val), `((.($arr, $idx))($val)))

// TODO let with variable number of var/val pairs
macro(let(`var, `val, `block), `(lambda($var, $block)($val)))
