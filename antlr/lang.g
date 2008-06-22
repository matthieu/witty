grammar lang;
options {
  language=JavaScript;
}

block  returns [Object value] :   TERM? e=exp { $value = $e.value; } 
                                   (TERM e=exp { if (!($value instanceof Block)) $value = new Block($value, $e.value); 
                                                 else $value.push($e.value) })* TERM?;
exp    returns [Object value] :   symb { $value = $symb.value;} 
                                  (list { $value = new Applic(value, $list.value); })*
                                    | list { $value = $list.value; };
list   returns [Array value]  :   '(' b=block? { if ($b.value) $value = new List($b.value); else $value = new List(); } 
                                    (',' b=block { $value.push($b.value); } )* ')';
symb   returns [Object value] :   innt { $value = $innt.value; } | string { $value = $string.value; } | id { $value = $id.value; };
innt   returns [int value]    :   INNT { $value = $INNT.text; };
string returns [String value] :   STRING { $value = $STRING.text; };
id     returns [String value] :   ID { $value = $ID.text; };

STRING    :  '"' ( ESC_SEQ | ~('\\'|'"') )* '"';
ID        : (LETTER | SYMBOLS) (LETTER | DIGIT | SYMBOLS)*;
INNT      : (DIGIT)+ ;
SL_COMMENTS
      : ('//') .* CR { $channel = HIDDEN; };
TERM  : (CR | WS | ';')+;

fragment ESC_SEQ      :   '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\') | UNICODE_ESC | OCTAL_ESC;
fragment OCTAL_ESC    : '\\' ('0'..'3') ('0'..'7') ('0'..'7') | '\\' ('0'..'7') ('0'..'7') | '\\' ('0'..'7');
fragment UNICODE_ESC  :   '\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG;

fragment SYMBOLS      : ('_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>'
                          | '*' | '+' | '=' | '|' | '\\' | ':' | '.' | '?' | '/');
fragment CR  : ('\r' | '\n' );
fragment WS  : ( ' ' | '\t' );
fragment DIGIT  :    '0'..'9';
fragment LETTER : 'a'..'z' | 'A'..'Z';
fragment HEX_DIG : ('0'..'9'|'a'..'f'|'A'..'F') ;

