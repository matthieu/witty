lexer grammar lang;
options {
  language=JavaScript;

}

T15 : '(' ;
T16 : ',' ;
T17 : ')' ;

// $ANTLR src "lang.g" 18
ID        : (LETTER | SYMBOLS) (LETTER | DIGIT | SYMBOLS)*;
// $ANTLR src "lang.g" 19
INT       : (DIGIT)+ ;
// $ANTLR src "lang.g" 20
STRING    : '"' ( ESCAPE_SEQ | ~('\\'|'"') )* '"';
// $ANTLR src "lang.g" 21
ESCAPE_SEQ: '\\' ('b'|'t'|'n'|'f'|'r'|'\"'|'\''|'\\');

// $ANTLR src "lang.g" 23
SL_COMMENTS
      : ('#'|'//') .* CR { $channel = HIDDEN; };
// $ANTLR src "lang.g" 25
TERM  : (CR | WS | ';')+;

// $ANTLR src "lang.g" 27
fragment SYMBOLS    : ('_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' 
                      | '*' | '+' | '=' | '|' | '\\' | ':' | '.' | '?' | '/');
// $ANTLR src "lang.g" 29
fragment CR  : ('\r' | '\n' );
// $ANTLR src "lang.g" 30
fragment WS  : ( ' ' | '\t' );
// $ANTLR src "lang.g" 31
fragment DIGIT  :    '0'..'9';
// $ANTLR src "lang.g" 32
fragment LETTER : 'a'..'z' | 'A'..'Z';
