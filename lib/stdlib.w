// Operators, order is establishing precedence
macro(?a = ?b, #(=($a, $b)))
macro(?a == ?b, #(==($a, $b)))
macro(?a + ?b, #(+($a, $b)))
macro(?a - ?b, #(-($a, $b)))
macro(?a * ?b, #(*($a, $b)))
macro(?a / ?b, #(/($a, $b)))
macro(! ?a, #(!($a,0)))

// ? = macro(?pred '?' ?b1 ':' ?b2, if($pred, $b1, $b2))

// TODO let with variable number of var/val pairs
macro(let(?var, ?val, ?block), #(lambda($var, $block)($val)))

// eval, load
