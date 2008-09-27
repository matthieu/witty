grammar witty;
options {
  language=JavaScript;
}

@header {
  Applic = function() { var na = Array.prototype.slice.call(arguments); na.sntx = 'A'; return na; }
  Block = function() { var na = Array.prototype.slice.call(arguments); na.sntx = 'B'; return na; }
  List = function() { var na = Array.prototype.slice.call(arguments); na.sntx = 'L'; return na; }
}

block
returns [Object val]: TERM* 
                      s1=stmt { if ($s1.val instanceof Array && $s1.val.sntx != 'A') 
                                  $val = Block($s1.val);
                                else $val = $s1.val; 
                                var first = true; 
                              }
                      (TERM+ s2=stmt { if (first) $val = Block($val, Block($s2.val));
                                       else $val.push(Block($s2.val)); } )*
                      TERM* EOF?;

stmt
returns [Object val]: WS* as=assoc { $val = $as.val; } WS*;

assoc 
returns [Object val]: p=parens_assoc { $val = $p.val; } 
                      | am=atom_assoc { $val = $am.val; };

parens_assoc
returns [Object val]: '(' s1=stmt ')' (op=(OPER | UNARY) s2=stmt)? 
                        { if ($s2.val || $s2.val == 0) { 
                            var oper = new String($op.text);
                            oper.line = $op.line; oper.pos = $op.pos;
                            $val = [Block($s1.val), oper, $s2.val] 
                          } 
                          else $val = Block($s1.val); 
                        };

atom_assoc
returns [Object val]: ((UNARY atom)=>u2=UNARY a1=atom { $val = Applic($u2.text, List($a1.val)); }
                      | a2=atom { $val = $a2.val; } )
                      (op=(OPER | UNARY) stmt {
                        var oper = new String($op.text);
                        oper.line = $op.line; oper.pos = $op.pos;
                        $val = [$val, oper, $stmt.val]; 
                      } )?;

atom
returns [Object val] : (a=(NUM | STRING | SSTRING | ID | OPER | UNARY) 
                          { $val = new String($a.text); $val.line = $a.line; $val.pos = $a.pos; } 
                        | hash_lit { $val = $hash_lit.val; }
                        | list_lit { $val = $list_lit.val; } )
                       (p='(' { $val = Applic($val); $val.line = $p.line; $val.pos = $p.pos; }
                            (b1=block { $val.push(List($b1.val)); } )? 
                            (',' b2=block { $val[1].push($b2.val); } )* ')' )*;

hash_lit
returns [Object val]: '{' { $val = Applic("H", List()); }
                       (p1=pair { $val[1].push($p1.val[0], $p1.val[1]); } )? 
                       (',' p2=pair { $val[1].push($p2.val[0], $p2.val[1]); } )* '}';

pair
returns [Object val]: ID ':' block { $val = ["\"" + $ID.text + "\"", $block.val]; };

list_lit
returns [Object val]: '[' { $val = Applic("L", List()); }  
                       (s1=stmt { $val[1].push($s1.val); } )? 
                       (',' s2=stmt { $val[1].push($s2.val); } )* ']';

tokn
returns [Object val]: t=(ID | OPER | UNARY) { $val = new String($t.text); $val.line = $t.line; $val.pos = $t.pos; };

OPER: SYMBOLS (SYMBOLS|UNARY)* | UNARY SYMBOLS+;

fragment SYMBOLS: ('_' | '~' | '#' | '$' | '%' | '^' | '&' | '<' | '>'
      | '*' | '+' | '=' | '|' | '\\' | '.' | '?' | '/' | '`' | ':');

UNARY: '!' | '-'; 

ID        : (LETTER | NON_OP) (LETTER | DIGIT | NON_OP | '!')*;
STRING    :  '"' ( ESC_SEQ | ~('\\'|'"') )* '"';
SSTRING   :  '\'' ( ESC_SEQ | ~('\\'|'\'') )* '\'';
NUM       : {var dotBefore = (this.input.LT(-1) == '.'); } 
            DIGIT+ 
            ({!dotBefore}?=> ('.' DIGIT+)?
             | );

COMMENT   : '//' .* CR { $channel=HIDDEN };
TERM      : (CR | ';')+;
WS        :  (' '|'\t'|'\u000C') { $channel=HIDDEN };

fragment ESC_SEQ      :   '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\') | UNICODE_ESC | OCTAL_ESC;
fragment OCTAL_ESC    : '\\' ('0'..'3') ('0'..'7') ('0'..'7') | '\\' ('0'..'7') ('0'..'7') | '\\' ('0'..'7');
fragment UNICODE_ESC  :   '\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG;
fragment HEX_DIG      : ('0'..'9'|'a'..'f'|'A'..'F') ;

fragment NON_OP       : ('_' | '~' | '#' | '$' | '?' | '`' | '@' | '\\');

fragment DIGIT    : '0'..'9';
fragment LETTER   : 'a'..'z' | 'A'..'Z';
fragment CR       : ('\r')? '\n';
