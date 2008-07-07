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
returns [Object val]: e1=exp { $val = $e1.val; var append = false;
                                   if ($val.sntx == 'M') $val.sntx = 'B'; }
                      (e2=exp { if (append) {
                                      if ($e2.val.sntx == 'M') { $val = $val.concat($e2.val); $val.sntx = 'B'; }
                                      else $val.push($e2.val);
                                    } else { 
                                      if ($e2.val.sntx == 'M') $val = [$val].concat($e2.val);
                                      else $val = [$val, $e2.val];
                                      $val.sntx = 'B'; append = true;
                                    } } )* 
                      ;

exp
returns [Object val]: (OPER unary_list)=> OPER u=unary_list { print("un_oper"); $val = [$OPER.text, $u.val]; $val.sntx = 'M'; }
                      | (atom list+)=> applic { $val = $applic.val; } 
                      | atom { $val = $atom.val; }
                      | unary_list { $val = $unary_list.val; };

applic
returns [Object val]: atom { $val = $atom.val; } 
                      (list { $val = [$val, $list.val]; $val.sntx = 'A'; print("applic " + $val); })+;

list
returns [Object val]: empty_list { $val = $empty_list.val; }
                      | unary_list { $val = $unary_list.val; }
                      | multi_list { $val = $multi_list.val; };

empty_list
returns [Object val]: '(' ')' { $val = []; $val.sntx = 'B'; };

unary_list
returns [Object val]: '(' block ')' { $val = [$block.val]; $val.sntx = 'B'; };

multi_list
returns [Object val]: '(' b1=block { if ($b1.val) $val = [$b1.val]; 
                                      else $val = []; $val.sntx = 'L'; }
                       (',' b2=block { $val.push($b2.val); } )+ ')';

atom
returns [Object val]: ID { $val = $ID.text; } | NUM { $val = $NUM.text; } 
                      | STRING {$val = $STRING.text; } | OPER { $val = $OPER.text; };


ID        : (LETTER | NON_OP) (LETTER | DIGIT | NON_OP | '!')*;
STRING    :  '"' ( ESC_SEQ | ~('\\'|'"') )* '"';
OPER      : SYMBOLS+;
NUM       : DIGIT+ ('.' DIGIT+)? ;

COMMENT   : '//' .* TERM { $channel=HIDDEN };
TERM      : (CR | ';')+;
WS        :  (' '|'\t'|'\u000C') { $channel=HIDDEN };

fragment ESC_SEQ      :   '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\') | UNICODE_ESC | OCTAL_ESC;
fragment OCTAL_ESC    : '\\' ('0'..'3') ('0'..'7') ('0'..'7') | '\\' ('0'..'7') ('0'..'7') | '\\' ('0'..'7');
fragment UNICODE_ESC  :   '\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG;
fragment HEX_DIG      : ('0'..'9'|'a'..'f'|'A'..'F') ;

fragment SYMBOLS      : ('_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>'
                          | '*' | '+' | '=' | '|' | '\\' | ':' | '.' | '?' | '/' | '`');
fragment NON_OP       : ('_' | '~' | '@' | '#' | '$' | ':' | '?' | '`' );

fragment DIGIT    : '0'..'9';
fragment LETTER   : 'a'..'z' | 'A'..'Z';
fragment CR       : ('\r')? '\n';
