// $ANTLR 3.0.1 antlr/witty.g 2008-09-18 19:59:52

var wittyLexer = function(input) {
    this.dfa15 = new wittyLexer.DFA15(this);
    wittyLexer.superclass.constructor.call(this, input);

};

(function(){
var HIDDEN = ANTLR.runtime.Token.HIDDEN_CHANNEL,
    EOF = ANTLR.runtime.Token.EOF;
ANTLR.lang.extend(wittyLexer, ANTLR.runtime.Lexer, {
    T21 : 21,
    CR : 16,
    UNICODE_ESC : 18,
    LETTER : 12,
    T22 : 22,
    WS : 5,
    OPER : 6,
    STRING : 9,
    T28 : 28,
    T23 : 23,
    NON_OP : 13,
    COMMENT : 17,
    HEX_DIG : 20,
    ESC_SEQ : 15,
    UNARY : 7,
    T25 : 25,
    T26 : 26,
    EOF : -1,
    NUM : 8,
    SYMBOLS : 11,
    Tokens : 29,
    DIGIT : 14,
    T27 : 27,
    T24 : 24,
    OCTAL_ESC : 19,
    TERM : 4,
    ID : 10,
    getGrammarFileName: function() { return "antlr/witty.g"; },

    // $ANTLR start T21
    mT21: function()  {
        try {
            this.type = this.T21;
            // antlr/witty.g:7:5: ( '(' )
            // antlr/witty.g:7:7: '('
            this.match('('); 



        }
        finally {
        }
    },
    // $ANTLR end T21,

    // $ANTLR start T22
    mT22: function()  {
        try {
            this.type = this.T22;
            // antlr/witty.g:8:5: ( ')' )
            // antlr/witty.g:8:7: ')'
            this.match(')'); 



        }
        finally {
        }
    },
    // $ANTLR end T22,

    // $ANTLR start T23
    mT23: function()  {
        try {
            this.type = this.T23;
            // antlr/witty.g:9:5: ( ',' )
            // antlr/witty.g:9:7: ','
            this.match(','); 



        }
        finally {
        }
    },
    // $ANTLR end T23,

    // $ANTLR start T24
    mT24: function()  {
        try {
            this.type = this.T24;
            // antlr/witty.g:10:5: ( '{' )
            // antlr/witty.g:10:7: '{'
            this.match('{'); 



        }
        finally {
        }
    },
    // $ANTLR end T24,

    // $ANTLR start T25
    mT25: function()  {
        try {
            this.type = this.T25;
            // antlr/witty.g:11:5: ( '}' )
            // antlr/witty.g:11:7: '}'
            this.match('}'); 



        }
        finally {
        }
    },
    // $ANTLR end T25,

    // $ANTLR start T26
    mT26: function()  {
        try {
            this.type = this.T26;
            // antlr/witty.g:12:5: ( ':' )
            // antlr/witty.g:12:7: ':'
            this.match(':'); 



        }
        finally {
        }
    },
    // $ANTLR end T26,

    // $ANTLR start T27
    mT27: function()  {
        try {
            this.type = this.T27;
            // antlr/witty.g:13:5: ( '[' )
            // antlr/witty.g:13:7: '['
            this.match('['); 



        }
        finally {
        }
    },
    // $ANTLR end T27,

    // $ANTLR start T28
    mT28: function()  {
        try {
            this.type = this.T28;
            // antlr/witty.g:14:5: ( ']' )
            // antlr/witty.g:14:7: ']'
            this.match(']'); 



        }
        finally {
        }
    },
    // $ANTLR end T28,

    // $ANTLR start OPER
    mOPER: function()  {
        try {
            this.type = this.OPER;
            // antlr/witty.g:73:5: ( SYMBOLS ( SYMBOLS | UNARY )* | UNARY ( SYMBOLS )+ )
            var alt3=2;
            var LA3_0 = this.input.LA(1);

            if ( ((LA3_0>='#' && LA3_0<='&')||(LA3_0>='*' && LA3_0<='+')||(LA3_0>='.' && LA3_0<='/')||LA3_0==':'||(LA3_0>='<' && LA3_0<='@')||LA3_0=='\\'||(LA3_0>='^' && LA3_0<='`')||LA3_0=='|'||LA3_0=='~') ) {
                alt3=1;
            }
            else if ( (LA3_0=='!'||LA3_0=='-') ) {
                alt3=2;
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("73:1: OPER : ( SYMBOLS ( SYMBOLS | UNARY )* | UNARY ( SYMBOLS )+ );", 3, 0, this.input);

                throw nvae;
            }
            switch (alt3) {
                case 1 :
                    // antlr/witty.g:73:7: SYMBOLS ( SYMBOLS | UNARY )*
                    this.mSYMBOLS(); 
                    // antlr/witty.g:73:15: ( SYMBOLS | UNARY )*
                    loop1:
                    do {
                        var alt1=2;
                        var LA1_0 = this.input.LA(1);

                        if ( (LA1_0=='!'||(LA1_0>='#' && LA1_0<='&')||(LA1_0>='*' && LA1_0<='+')||(LA1_0>='-' && LA1_0<='/')||LA1_0==':'||(LA1_0>='<' && LA1_0<='@')||LA1_0=='\\'||(LA1_0>='^' && LA1_0<='`')||LA1_0=='|'||LA1_0=='~') ) {
                            alt1=1;
                        }


                        switch (alt1) {
                    	case 1 :
                    	    // antlr/witty.g:
                    	    if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<='/')||this.input.LA(1)==':'||(this.input.LA(1)>='<' && this.input.LA(1)<='@')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='`')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
                    	        this.input.consume();

                    	    }
                    	    else {
                    	        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                    	        this.recover(mse);    throw mse;
                    	    }



                    	    break;

                    	default :
                    	    break loop1;
                        }
                    } while (true);



                    break;
                case 2 :
                    // antlr/witty.g:73:34: UNARY ( SYMBOLS )+
                    this.mUNARY(); 
                    // antlr/witty.g:73:40: ( SYMBOLS )+
                    var cnt2=0;
                    loop2:
                    do {
                        var alt2=2;
                        var LA2_0 = this.input.LA(1);

                        if ( ((LA2_0>='#' && LA2_0<='&')||(LA2_0>='*' && LA2_0<='+')||(LA2_0>='.' && LA2_0<='/')||LA2_0==':'||(LA2_0>='<' && LA2_0<='@')||LA2_0=='\\'||(LA2_0>='^' && LA2_0<='`')||LA2_0=='|'||LA2_0=='~') ) {
                            alt2=1;
                        }


                        switch (alt2) {
                    	case 1 :
                    	    // antlr/witty.g:73:40: SYMBOLS
                    	    this.mSYMBOLS(); 


                    	    break;

                    	default :
                    	    if ( cnt2 >= 1 ) {
                                break loop2;
                            }
                                var eee = new ANTLR.runtime.EarlyExitException(2, this.input);
                                throw eee;
                        }
                        cnt2++;
                    } while (true);



                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end OPER,

    // $ANTLR start SYMBOLS
    mSYMBOLS: function()  {
        try {
            // antlr/witty.g:75:17: ( ( '_' | '~' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | '.' | '?' | '/' | '`' | ':' ) )
            // antlr/witty.g:75:19: ( '_' | '~' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | '.' | '?' | '/' | '`' | ':' )
            if ( (this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='.' && this.input.LA(1)<='/')||this.input.LA(1)==':'||(this.input.LA(1)>='<' && this.input.LA(1)<='@')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='`')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }




        }
        finally {
        }
    },
    // $ANTLR end SYMBOLS,

    // $ANTLR start UNARY
    mUNARY: function()  {
        try {
            this.type = this.UNARY;
            // antlr/witty.g:78:6: ( '!' | '-' )
            // antlr/witty.g:
            if ( this.input.LA(1)=='!'||this.input.LA(1)=='-' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }




        }
        finally {
        }
    },
    // $ANTLR end UNARY,

    // $ANTLR start ID
    mID: function()  {
        try {
            this.type = this.ID;
            // antlr/witty.g:80:11: ( ( LETTER | NON_OP ) ( LETTER | DIGIT | NON_OP | '!' )* )
            // antlr/witty.g:80:13: ( LETTER | NON_OP ) ( LETTER | DIGIT | NON_OP | '!' )*
            if ( (this.input.LA(1)>='#' && this.input.LA(1)<='$')||this.input.LA(1)=='?'||(this.input.LA(1)>='A' && this.input.LA(1)<='Z')||(this.input.LA(1)>='_' && this.input.LA(1)<='z')||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }

            // antlr/witty.g:80:31: ( LETTER | DIGIT | NON_OP | '!' )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0=='!'||(LA4_0>='#' && LA4_0<='$')||(LA4_0>='0' && LA4_0<='9')||LA4_0=='?'||(LA4_0>='A' && LA4_0<='Z')||(LA4_0>='_' && LA4_0<='z')||LA4_0=='~') ) {
                    alt4=1;
                }


                switch (alt4) {
            	case 1 :
            	    // antlr/witty.g:
            	    if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='$')||(this.input.LA(1)>='0' && this.input.LA(1)<='9')||this.input.LA(1)=='?'||(this.input.LA(1)>='A' && this.input.LA(1)<='Z')||(this.input.LA(1)>='_' && this.input.LA(1)<='z')||this.input.LA(1)=='~' ) {
            	        this.input.consume();

            	    }
            	    else {
            	        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
            	        this.recover(mse);    throw mse;
            	    }



            	    break;

            	default :
            	    break loop4;
                }
            } while (true);




        }
        finally {
        }
    },
    // $ANTLR end ID,

    // $ANTLR start STRING
    mSTRING: function()  {
        try {
            this.type = this.STRING;
            // antlr/witty.g:81:11: ( '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"' )
            // antlr/witty.g:81:14: '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"'
            this.match('\"'); 
            // antlr/witty.g:81:18: ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )*
            loop5:
            do {
                var alt5=3;
                var LA5_0 = this.input.LA(1);

                if ( (LA5_0=='\\') ) {
                    alt5=1;
                }
                else if ( ((LA5_0>='\u0000' && LA5_0<='!')||(LA5_0>='#' && LA5_0<='[')||(LA5_0>=']' && LA5_0<='\uFFFE')) ) {
                    alt5=2;
                }


                switch (alt5) {
            	case 1 :
            	    // antlr/witty.g:81:20: ESC_SEQ
            	    this.mESC_SEQ(); 


            	    break;
            	case 2 :
            	    // antlr/witty.g:81:30: ~ ( '\\\\' | '\"' )
            	    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='!')||(this.input.LA(1)>='#' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\uFFFE') ) {
            	        this.input.consume();

            	    }
            	    else {
            	        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
            	        this.recover(mse);    throw mse;
            	    }



            	    break;

            	default :
            	    break loop5;
                }
            } while (true);

            this.match('\"'); 



        }
        finally {
        }
    },
    // $ANTLR end STRING,

    // $ANTLR start NUM
    mNUM: function()  {
        try {
            this.type = this.NUM;
            // antlr/witty.g:82:11: ( ( DIGIT )+ ({...}? => ( '.' ( DIGIT )+ )? | ) )
            // antlr/witty.g:82:13: ( DIGIT )+ ({...}? => ( '.' ( DIGIT )+ )? | )
            var dotBefore = (this.input.LT(-1) == '.'); 
            // antlr/witty.g:83:13: ( DIGIT )+
            var cnt6=0;
            loop6:
            do {
                var alt6=2;
                var LA6_0 = this.input.LA(1);

                if ( ((LA6_0>='0' && LA6_0<='9')) ) {
                    alt6=1;
                }


                switch (alt6) {
            	case 1 :
            	    // antlr/witty.g:83:13: DIGIT
            	    this.mDIGIT(); 


            	    break;

            	default :
            	    if ( cnt6 >= 1 ) {
                        break loop6;
                    }
                        var eee = new ANTLR.runtime.EarlyExitException(6, this.input);
                        throw eee;
                }
                cnt6++;
            } while (true);

            // antlr/witty.g:84:13: ({...}? => ( '.' ( DIGIT )+ )? | )
            var alt9=2;
            var LA9_0 = this.input.LA(1);

            if ( (LA9_0=='.') && (!dotBefore)) {
                alt9=1;
            }
            else if ( (!dotBefore) ) {
                alt9=1;
            }
            else if ( (true) ) {
                alt9=2;
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("84:13: ({...}? => ( '.' ( DIGIT )+ )? | )", 9, 0, this.input);

                throw nvae;
            }
            switch (alt9) {
                case 1 :
                    // antlr/witty.g:84:14: {...}? => ( '.' ( DIGIT )+ )?
                    if ( !(!dotBefore) ) {
                        throw new ANTLR.runtime.FailedPredicateException(this.input, "NUM", "!dotBefore");
                    }
                    // antlr/witty.g:84:30: ( '.' ( DIGIT )+ )?
                    var alt8=2;
                    var LA8_0 = this.input.LA(1);

                    if ( (LA8_0=='.') ) {
                        alt8=1;
                    }
                    switch (alt8) {
                        case 1 :
                            // antlr/witty.g:84:31: '.' ( DIGIT )+
                            this.match('.'); 
                            // antlr/witty.g:84:35: ( DIGIT )+
                            var cnt7=0;
                            loop7:
                            do {
                                var alt7=2;
                                var LA7_0 = this.input.LA(1);

                                if ( ((LA7_0>='0' && LA7_0<='9')) ) {
                                    alt7=1;
                                }


                                switch (alt7) {
                            	case 1 :
                            	    // antlr/witty.g:84:35: DIGIT
                            	    this.mDIGIT(); 


                            	    break;

                            	default :
                            	    if ( cnt7 >= 1 ) {
                                        break loop7;
                                    }
                                        var eee = new ANTLR.runtime.EarlyExitException(7, this.input);
                                        throw eee;
                                }
                                cnt7++;
                            } while (true);



                            break;

                    }



                    break;
                case 2 :
                    // antlr/witty.g:85:16: 

                    break;

            }




        }
        finally {
        }
    },
    // $ANTLR end NUM,

    // $ANTLR start COMMENT
    mCOMMENT: function()  {
        try {
            this.type = this.COMMENT;
            // antlr/witty.g:87:11: ( '//' ( . )* CR )
            // antlr/witty.g:87:13: '//' ( . )* CR
            this.match("//"); 

            // antlr/witty.g:87:18: ( . )*
            loop10:
            do {
                var alt10=2;
                var LA10_0 = this.input.LA(1);

                if ( (LA10_0=='\r') ) {
                    alt10=2;
                }
                else if ( (LA10_0=='\n') ) {
                    alt10=2;
                }
                else if ( ((LA10_0>='\u0000' && LA10_0<='\t')||(LA10_0>='\u000B' && LA10_0<='\f')||(LA10_0>='\u000E' && LA10_0<='\uFFFE')) ) {
                    alt10=1;
                }


                switch (alt10) {
            	case 1 :
            	    // antlr/witty.g:87:18: .
            	    this.matchAny(); 


            	    break;

            	default :
            	    break loop10;
                }
            } while (true);

            this.mCR(); 
             this.channel=HIDDEN 



        }
        finally {
        }
    },
    // $ANTLR end COMMENT,

    // $ANTLR start TERM
    mTERM: function()  {
        try {
            this.type = this.TERM;
            // antlr/witty.g:88:11: ( ( CR | ';' )+ )
            // antlr/witty.g:88:13: ( CR | ';' )+
            // antlr/witty.g:88:13: ( CR | ';' )+
            var cnt11=0;
            loop11:
            do {
                var alt11=3;
                var LA11_0 = this.input.LA(1);

                if ( (LA11_0=='\n'||LA11_0=='\r') ) {
                    alt11=1;
                }
                else if ( (LA11_0==';') ) {
                    alt11=2;
                }


                switch (alt11) {
            	case 1 :
            	    // antlr/witty.g:88:14: CR
            	    this.mCR(); 


            	    break;
            	case 2 :
            	    // antlr/witty.g:88:19: ';'
            	    this.match(';'); 


            	    break;

            	default :
            	    if ( cnt11 >= 1 ) {
                        break loop11;
                    }
                        var eee = new ANTLR.runtime.EarlyExitException(11, this.input);
                        throw eee;
                }
                cnt11++;
            } while (true);




        }
        finally {
        }
    },
    // $ANTLR end TERM,

    // $ANTLR start WS
    mWS: function()  {
        try {
            this.type = this.WS;
            // antlr/witty.g:89:11: ( ( ' ' | '\\t' | '\\u000C' ) )
            // antlr/witty.g:89:14: ( ' ' | '\\t' | '\\u000C' )
            if ( this.input.LA(1)=='\t'||this.input.LA(1)=='\f'||this.input.LA(1)==' ' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }

             this.channel=HIDDEN 



        }
        finally {
        }
    },
    // $ANTLR end WS,

    // $ANTLR start ESC_SEQ
    mESC_SEQ: function()  {
        try {
            // antlr/witty.g:91:23: ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC )
            var alt12=3;
            var LA12_0 = this.input.LA(1);

            if ( (LA12_0=='\\') ) {
                switch ( this.input.LA(2) ) {
                case 'u':
                    alt12=2;
                    break;
                case '\"':
                case '\'':
                case '\\':
                case 'b':
                case 'f':
                case 'n':
                case 'r':
                case 't':
                    alt12=1;
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    alt12=3;
                    break;
                default:
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("91:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 12, 1, this.input);

                    throw nvae;
                }

            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("91:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 12, 0, this.input);

                throw nvae;
            }
            switch (alt12) {
                case 1 :
                    // antlr/witty.g:91:27: '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' )
                    this.match('\\'); 
                    if ( this.input.LA(1)=='\"'||this.input.LA(1)=='\''||this.input.LA(1)=='\\'||this.input.LA(1)=='b'||this.input.LA(1)=='f'||this.input.LA(1)=='n'||this.input.LA(1)=='r'||this.input.LA(1)=='t' ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);    throw mse;
                    }



                    break;
                case 2 :
                    // antlr/witty.g:91:71: UNICODE_ESC
                    this.mUNICODE_ESC(); 


                    break;
                case 3 :
                    // antlr/witty.g:91:85: OCTAL_ESC
                    this.mOCTAL_ESC(); 


                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end ESC_SEQ,

    // $ANTLR start OCTAL_ESC
    mOCTAL_ESC: function()  {
        try {
            // antlr/witty.g:92:23: ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) )
            var alt13=3;
            var LA13_0 = this.input.LA(1);

            if ( (LA13_0=='\\') ) {
                var LA13_1 = this.input.LA(2);

                if ( ((LA13_1>='0' && LA13_1<='3')) ) {
                    var LA13_2 = this.input.LA(3);

                    if ( ((LA13_2>='0' && LA13_2<='7')) ) {
                        var LA13_4 = this.input.LA(4);

                        if ( ((LA13_4>='0' && LA13_4<='7')) ) {
                            alt13=1;
                        }
                        else {
                            alt13=2;}
                    }
                    else {
                        alt13=3;}
                }
                else if ( ((LA13_1>='4' && LA13_1<='7')) ) {
                    var LA13_3 = this.input.LA(3);

                    if ( ((LA13_3>='0' && LA13_3<='7')) ) {
                        alt13=2;
                    }
                    else {
                        alt13=3;}
                }
                else {
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("92:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 13, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("92:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 13, 0, this.input);

                throw nvae;
            }
            switch (alt13) {
                case 1 :
                    // antlr/witty.g:92:25: '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:92:30: ( '0' .. '3' )
                    // antlr/witty.g:92:31: '0' .. '3'
                    this.matchRange('0','3'); 



                    // antlr/witty.g:92:41: ( '0' .. '7' )
                    // antlr/witty.g:92:42: '0' .. '7'
                    this.matchRange('0','7'); 



                    // antlr/witty.g:92:52: ( '0' .. '7' )
                    // antlr/witty.g:92:53: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 2 :
                    // antlr/witty.g:92:65: '\\\\' ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:92:70: ( '0' .. '7' )
                    // antlr/witty.g:92:71: '0' .. '7'
                    this.matchRange('0','7'); 



                    // antlr/witty.g:92:81: ( '0' .. '7' )
                    // antlr/witty.g:92:82: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 3 :
                    // antlr/witty.g:92:94: '\\\\' ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:92:99: ( '0' .. '7' )
                    // antlr/witty.g:92:100: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end OCTAL_ESC,

    // $ANTLR start UNICODE_ESC
    mUNICODE_ESC: function()  {
        try {
            // antlr/witty.g:93:23: ( '\\\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG )
            // antlr/witty.g:93:27: '\\\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG
            this.match('\\'); 
            this.match('u'); 
            this.mHEX_DIG(); 
            this.mHEX_DIG(); 
            this.mHEX_DIG(); 
            this.mHEX_DIG(); 



        }
        finally {
        }
    },
    // $ANTLR end UNICODE_ESC,

    // $ANTLR start HEX_DIG
    mHEX_DIG: function()  {
        try {
            // antlr/witty.g:94:23: ( ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' ) )
            // antlr/witty.g:94:25: ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' )
            if ( (this.input.LA(1)>='0' && this.input.LA(1)<='9')||(this.input.LA(1)>='A' && this.input.LA(1)<='F')||(this.input.LA(1)>='a' && this.input.LA(1)<='f') ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }




        }
        finally {
        }
    },
    // $ANTLR end HEX_DIG,

    // $ANTLR start NON_OP
    mNON_OP: function()  {
        try {
            // antlr/witty.g:96:23: ( ( '_' | '~' | '#' | '$' | '?' | '`' ) )
            // antlr/witty.g:96:25: ( '_' | '~' | '#' | '$' | '?' | '`' )
            if ( (this.input.LA(1)>='#' && this.input.LA(1)<='$')||this.input.LA(1)=='?'||(this.input.LA(1)>='_' && this.input.LA(1)<='`')||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }




        }
        finally {
        }
    },
    // $ANTLR end NON_OP,

    // $ANTLR start DIGIT
    mDIGIT: function()  {
        try {
            // antlr/witty.g:98:19: ( '0' .. '9' )
            // antlr/witty.g:98:21: '0' .. '9'
            this.matchRange('0','9'); 



        }
        finally {
        }
    },
    // $ANTLR end DIGIT,

    // $ANTLR start LETTER
    mLETTER: function()  {
        try {
            // antlr/witty.g:99:19: ( 'a' .. 'z' | 'A' .. 'Z' )
            // antlr/witty.g:
            if ( (this.input.LA(1)>='A' && this.input.LA(1)<='Z')||(this.input.LA(1)>='a' && this.input.LA(1)<='z') ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }




        }
        finally {
        }
    },
    // $ANTLR end LETTER,

    // $ANTLR start CR
    mCR: function()  {
        try {
            // antlr/witty.g:100:19: ( ( '\\r' )? '\\n' )
            // antlr/witty.g:100:21: ( '\\r' )? '\\n'
            // antlr/witty.g:100:21: ( '\\r' )?
            var alt14=2;
            var LA14_0 = this.input.LA(1);

            if ( (LA14_0=='\r') ) {
                alt14=1;
            }
            switch (alt14) {
                case 1 :
                    // antlr/witty.g:100:22: '\\r'
                    this.match('\r'); 


                    break;

            }

            this.match('\n'); 



        }
        finally {
        }
    },
    // $ANTLR end CR,

    mTokens: function() {
        // antlr/witty.g:1:8: ( T21 | T22 | T23 | T24 | T25 | T26 | T27 | T28 | OPER | UNARY | ID | STRING | NUM | COMMENT | TERM | WS )
        var alt15=16;
        alt15 = this.dfa15.predict(this.input);
        switch (alt15) {
            case 1 :
                // antlr/witty.g:1:10: T21
                this.mT21(); 


                break;
            case 2 :
                // antlr/witty.g:1:14: T22
                this.mT22(); 


                break;
            case 3 :
                // antlr/witty.g:1:18: T23
                this.mT23(); 


                break;
            case 4 :
                // antlr/witty.g:1:22: T24
                this.mT24(); 


                break;
            case 5 :
                // antlr/witty.g:1:26: T25
                this.mT25(); 


                break;
            case 6 :
                // antlr/witty.g:1:30: T26
                this.mT26(); 


                break;
            case 7 :
                // antlr/witty.g:1:34: T27
                this.mT27(); 


                break;
            case 8 :
                // antlr/witty.g:1:38: T28
                this.mT28(); 


                break;
            case 9 :
                // antlr/witty.g:1:42: OPER
                this.mOPER(); 


                break;
            case 10 :
                // antlr/witty.g:1:47: UNARY
                this.mUNARY(); 


                break;
            case 11 :
                // antlr/witty.g:1:53: ID
                this.mID(); 


                break;
            case 12 :
                // antlr/witty.g:1:56: STRING
                this.mSTRING(); 


                break;
            case 13 :
                // antlr/witty.g:1:63: NUM
                this.mNUM(); 


                break;
            case 14 :
                // antlr/witty.g:1:67: COMMENT
                this.mCOMMENT(); 


                break;
            case 15 :
                // antlr/witty.g:1:75: TERM
                this.mTERM(); 


                break;
            case 16 :
                // antlr/witty.g:1:80: WS
                this.mWS(); 


                break;

        }

    },

    dummy: null
});

ANTLR.lang.augmentObject(wittyLexer, {
    DFA15_eotS:
        "\u0006\uffff\u0001\u0012\u0002\uffff\u0001\u000f\u0001\u0014\u0001"+
    "\u000f\u0007\uffff\u0001\u000f\u0001\uffff\u0001\u000f\u0001\uffff\u0001"+
    "\u000f",
    DFA15_eofS:
        "\u0018\uffff",
    DFA15_minS:
        "\u0001\u0009\u0005\uffff\u0001\u0021\u0002\uffff\u0001\u0021\u0001"+
    "\u0023\u0001\u002f\u0007\uffff\u0001\u0021\u0001\uffff\u0001\u0000\u0001"+
    "\uffff\u0001\u0000",
    DFA15_maxS:
        "\u0001\u007e\u0005\uffff\u0001\u007e\u0002\uffff\u0002\u007e\u0001"+
    "\u002f\u0007\uffff\u0001\u007e\u0001\uffff\u0001\ufffe\u0001\uffff\u0001"+
    "\ufffe",
    DFA15_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\u0004\u0001"+
    "\u0005\u0001\uffff\u0001\u0007\u0001\u0008\u0003\uffff\u0001\u000b\u0001"+
    "\u000c\u0001\u000d\u0001\u0009\u0001\u000f\u0001\u0010\u0001\u0006\u0001"+
    "\uffff\u0001\u000a\u0001\uffff\u0001\u000e\u0001\uffff",
    DFA15_specialS:
        "\u0018\uffff}>",
    DFA15_transitionS: [
            "\u0001\u0011\u0001\u0010\u0001\uffff\u0001\u0011\u0001\u0010"+
            "\u0012\uffff\u0001\u0011\u0001\u000a\u0001\u000d\u0002\u0009"+
            "\u0002\u000f\u0001\uffff\u0001\u0001\u0001\u0002\u0002\u000f"+
            "\u0001\u0003\u0001\u000a\u0001\u000f\u0001\u000b\u000a\u000e"+
            "\u0001\u0006\u0001\u0010\u0003\u000f\u0001\u0009\u0001\u000f"+
            "\u001a\u000c\u0001\u0007\u0001\u000f\u0001\u0008\u0001\u000f"+
            "\u0002\u0009\u001a\u000c\u0001\u0004\u0001\u000f\u0001\u0005"+
            "\u0001\u0009",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u000f\u0001\uffff\u0004\u000f\u0003\uffff\u0002\u000f"+
            "\u0001\uffff\u0003\u000f\u000a\uffff\u0001\u000f\u0001\uffff"+
            "\u0005\u000f\u001b\uffff\u0001\u000f\u0001\uffff\u0003\u000f"+
            "\u001b\uffff\u0001\u000f\u0001\uffff\u0001\u000f",
            "",
            "",
            "\u0001\u0013\u0001\uffff\u0002\u0013\u000b\uffff\u000a\u000c"+
            "\u0005\uffff\u0001\u0013\u0001\uffff\u001a\u000c\u0004\uffff"+
            "\u0002\u0013\u001a\u000c\u0003\uffff\u0001\u0013",
            "\u0004\u000f\u0003\uffff\u0002\u000f\u0002\uffff\u0002\u000f"+
            "\u000a\uffff\u0001\u000f\u0001\uffff\u0005\u000f\u001b\uffff"+
            "\u0001\u000f\u0001\uffff\u0003\u000f\u001b\uffff\u0001\u000f"+
            "\u0001\uffff\u0001\u000f",
            "\u0001\u0015",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u0013\u0001\uffff\u0002\u0013\u000b\uffff\u000a\u000c"+
            "\u0005\uffff\u0001\u0013\u0001\uffff\u001a\u000c\u0004\uffff"+
            "\u0002\u0013\u001a\u000c\u0003\uffff\u0001\u0013",
            "",
            "\u0021\u0016\u0001\u0017\u0001\u0016\u0004\u0017\u0003\u0016"+
            "\u0002\u0017\u0001\u0016\u0003\u0017\u000a\u0016\u0001\u0017"+
            "\u0001\u0016\u0005\u0017\u001b\u0016\u0001\u0017\u0001\u0016"+
            "\u0003\u0017\u001b\u0016\u0001\u0017\u0001\u0016\u0001\u0017"+
            "\uff80\u0016",
            "",
            "\u0021\u0016\u0001\u0017\u0001\u0016\u0004\u0017\u0003\u0016"+
            "\u0002\u0017\u0001\u0016\u0003\u0017\u000a\u0016\u0001\u0017"+
            "\u0001\u0016\u0005\u0017\u001b\u0016\u0001\u0017\u0001\u0016"+
            "\u0003\u0017\u001b\u0016\u0001\u0017\u0001\u0016\u0001\u0017"+
            "\uff80\u0016"
    ]
});
    
ANTLR.lang.augmentObject(wittyLexer, {
    DFA15_eot:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA15_eotS),
    DFA15_eof:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA15_eofS),
    DFA15_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyLexer.DFA15_minS),
    DFA15_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyLexer.DFA15_maxS),
    DFA15_accept:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA15_acceptS),
    DFA15_special:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA15_specialS),
    DFA15_transition: (function() {
        var a = [],
            i,
            numStates = wittyLexer.DFA15_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA15_transitionS[i]));
        }
        return a;
    })()
});

wittyLexer.DFA15 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 15;
    this.eot = wittyLexer.DFA15_eot;
    this.eof = wittyLexer.DFA15_eof;
    this.min = wittyLexer.DFA15_min;
    this.max = wittyLexer.DFA15_max;
    this.accept = wittyLexer.DFA15_accept;
    this.special = wittyLexer.DFA15_special;
    this.transition = wittyLexer.DFA15_transition;
};

ANTLR.lang.extend(wittyLexer.DFA15, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( T21 | T22 | T23 | T24 | T25 | T26 | T27 | T28 | OPER | UNARY | ID | STRING | NUM | COMMENT | TERM | WS );";
    },
    dummy: null
});
 
})();