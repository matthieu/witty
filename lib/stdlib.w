// Operators, order is establishing precedence
macro(`a = `b, `(=($a, $b)))

macro(`a == `b, `(==($a, $b)))
macro(`a < `b, `(<($a, $b)))
macro(`a <= `b, `(<=($a, $b)))
macro(`a > `b, `(>($a, $b)))
macro(`a >= `b, `(>=($a, $b)))

macro(`a += `b, `(=($a, +($a, $b))))
macro(`a -= `b, `(=($a, -($a, $b))))
macro(`a + `b, `(+($a, $b)))
macro(`a - `b, `(-($a, $b)))
macro(`a * `b, `(*($a, $b)))
macro(`a / `b, `(/($a, $b)))

macro(`arr . `idx, `(.($arr, $idx)))

// TODO let with variable number of var/val pairs
macro(let(`var, `val, `block), `(lambda($var, $block)($val)))

