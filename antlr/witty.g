grammar witty;
options {
  language=JavaScript;
  backtrack=true;
}

block 
returns [Object val]: TERM* s1=stmt { $val = $s1.val; var append = false; } 
                      (TERM+ s2=stmt { if (append) $val.push($s2.val);
                                       else { $val = [$val, $s2.val]; $val.sntx = 'B'; append = true; } } )*
                      TERM* EOF?;

stmt
returns [Object val]: WS* e1=exp { $val = $e1.val; var append = false; }
                      (WS* e2=exp { if (append) $val.push($e2.val);
                                    else { $val = [$val, $e2.val]; $val.sntx = 'B'; append = true; } } )* 
                      WS*;

exp
returns [Object val]: (atom list)=> applic { $val = $applic.val; } 
                      | atom { $val = $atom.val; } 
                      | list { $val = $list.val; };

applic
returns [Object val]: atom { $val = $atom.val; } 
                      (list { $val = [$val, $list.val]; $val.sntx = 'A'; })+;

list
returns [Object val]: '(' b1=block? { if ($b1.val) $val = [$b1.val]; 
                                      else $val = []; $val.sntx = 'L'; }
                       (',' b2=block { $val.push($b2.val); } )* ')';

atom
returns [Object val]: ID { $val = $ID.text; } | INNT { $val = $INNT.text; } 
                      | STRING {$val = $STRING.text; } | OPER { $val = $OPER.text; };


ID        : (LETTER | NON_OP)*;
STRING    :  '"' ( ESC_SEQ | ~('\\'|'"') )* '"';
OPER      : SYMBOLS+;
INNT      : (DIGIT)+ ;

COMMENT   : '//' .* TERM { $channel=HIDDEN };
TERM      : (CR | ';')+;
WS        :  (' '|'\t'|'\u000C');

fragment ESC_SEQ      :   '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\') | UNICODE_ESC | OCTAL_ESC;
fragment OCTAL_ESC    : '\\' ('0'..'3') ('0'..'7') ('0'..'7') | '\\' ('0'..'7') ('0'..'7') | '\\' ('0'..'7');
fragment UNICODE_ESC  :   '\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG;
fragment HEX_DIG      : ('0'..'9'|'a'..'f'|'A'..'F') ;

fragment SYMBOLS      : ('_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>'
                          | '*' | '+' | '=' | '|' | '\\' | ':' | '.' | '?' | '/');
fragment NON_OP       : ('_' | '~' | '!' | '@' | '#' | '$' | ':' | '.' | '?' );

fragment DIGIT  :    '0'..'9';
fragment LETTER : 'a'..'z' | 'A'..'Z';
fragment CR  : ('\r')? '\n';
