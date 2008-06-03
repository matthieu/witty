grammar lang;
options {
  language=JavaScript;
}

block  returns [Object value]  :   TERM? e=exp { $value = $e.value; } 
                                    (TERM e=exp { if (!($value instanceof Array)) $value = [$value, $e.value]; 
                                                  else $value.push($e.value) })* TERM?;
exp    returns [Object value]  :   symb list? { if ($list.value) $value = [$symb.value].concat($list.value); else $value = $symb.value; } 
                                    | list { $value = $list.value; };
list   returns [Array value]  :   '(' b=block? { if ($b.value) $value = [$b.value]; else $value = []; } 
                                    (',' b=block)* { if ($b.value) $value.push($b.value); } ')';
symb   returns [Object value] :   int { $value = $int.value; } | string { $value = $string.value; } | id { $value = $id.value; };
int    returns [int value]    :   INT { $value = $INT.text; };
string returns [String value] :   STRING { $value = $STRING.text; };
id     returns [String value] :   ID { $value = $ID.text; };

ID        : (LETTER | SYMBOLS) (LETTER | DIGIT | SYMBOLS)*;
INT       : (DIGIT)+ ;
STRING    : '"' ( ESCAPE_SEQ | ~('\\'|'"') )* '"';
ESCAPE_SEQ: '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\');

SL_COMMENTS
      : ('#'|'//') .* CR { $channel = HIDDEN; };
TERM  : (CR | WS | ';')+;

fragment SYMBOLS    : ('_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' 
                      | '*' | '+' | '=' | '|' | '\\' | ':' | '.' | '?' | '/');
fragment CR  : ('\r' | '\n' );
fragment WS  : ( ' ' | '\t' );
fragment DIGIT  :    '0'..'9';
fragment LETTER : 'a'..'z' | 'A'..'Z';
