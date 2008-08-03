// $ANTLR 3.0.1 antlr/witty.g 2008-08-03 14:28:36

var wittyLexer = function(input) {
    this.dfa14 = new wittyLexer.DFA14(this);
    wittyLexer.superclass.constructor.call(this, input);

};

(function(){
var HIDDEN = ANTLR.runtime.Token.HIDDEN_CHANNEL,
    EOF = ANTLR.runtime.Token.EOF;
ANTLR.lang.extend(wittyLexer, ANTLR.runtime.Lexer, {
    TERM : 4,
    LETTER : 12,
    UNICODE_ESC : 18,
    OCTAL_ESC : 19,
    HEX_DIG : 20,
    ID : 10,
    Tokens : 24,
    EOF : -1,
    NON_OP : 13,
    T23 : 23,
    T22 : 22,
    T21 : 21,
    NUM : 8,
    OPER : 6,
    WS : 5,
    ESC_SEQ : 15,
    DIGIT : 14,
    SYMBOLS : 11,
    UNARY : 7,
    COMMENT : 17,
    CR : 16,
    STRING : 9,
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

    // $ANTLR start OPER
    mOPER: function()  {
        try {
            this.type = this.OPER;
            // antlr/witty.g:51:5: ( SYMBOLS ( SYMBOLS | UNARY )* | UNARY ( SYMBOLS )+ )
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
                    new ANTLR.runtime.NoViableAltException("51:1: OPER : ( SYMBOLS ( SYMBOLS | UNARY )* | UNARY ( SYMBOLS )+ );", 3, 0, this.input);

                throw nvae;
            }
            switch (alt3) {
                case 1 :
                    // antlr/witty.g:51:7: SYMBOLS ( SYMBOLS | UNARY )*
                    this.mSYMBOLS(); 
                    // antlr/witty.g:51:15: ( SYMBOLS | UNARY )*
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
                    // antlr/witty.g:51:34: UNARY ( SYMBOLS )+
                    this.mUNARY(); 
                    // antlr/witty.g:51:40: ( SYMBOLS )+
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
                    	    // antlr/witty.g:51:40: SYMBOLS
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
            // antlr/witty.g:53:17: ( ( '_' | '~' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' | '`' ) )
            // antlr/witty.g:53:19: ( '_' | '~' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' | '`' )
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
            // antlr/witty.g:56:6: ( '!' | '-' )
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
            // antlr/witty.g:58:11: ( ( LETTER | NON_OP ) ( LETTER | DIGIT | NON_OP | '!' )* )
            // antlr/witty.g:58:13: ( LETTER | NON_OP ) ( LETTER | DIGIT | NON_OP | '!' )*
            if ( (this.input.LA(1)>='#' && this.input.LA(1)<='$')||this.input.LA(1)==':'||this.input.LA(1)=='?'||(this.input.LA(1)>='A' && this.input.LA(1)<='Z')||(this.input.LA(1)>='_' && this.input.LA(1)<='z')||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }

            // antlr/witty.g:58:31: ( LETTER | DIGIT | NON_OP | '!' )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0=='!'||(LA4_0>='#' && LA4_0<='$')||(LA4_0>='0' && LA4_0<=':')||LA4_0=='?'||(LA4_0>='A' && LA4_0<='Z')||(LA4_0>='_' && LA4_0<='z')||LA4_0=='~') ) {
                    alt4=1;
                }


                switch (alt4) {
            	case 1 :
            	    // antlr/witty.g:
            	    if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='$')||(this.input.LA(1)>='0' && this.input.LA(1)<=':')||this.input.LA(1)=='?'||(this.input.LA(1)>='A' && this.input.LA(1)<='Z')||(this.input.LA(1)>='_' && this.input.LA(1)<='z')||this.input.LA(1)=='~' ) {
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
            // antlr/witty.g:59:11: ( '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"' )
            // antlr/witty.g:59:14: '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"'
            this.match('\"'); 
            // antlr/witty.g:59:18: ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )*
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
            	    // antlr/witty.g:59:20: ESC_SEQ
            	    this.mESC_SEQ(); 


            	    break;
            	case 2 :
            	    // antlr/witty.g:59:30: ~ ( '\\\\' | '\"' )
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
            // antlr/witty.g:60:11: ( ( DIGIT )+ ( '.' ( DIGIT )+ )? )
            // antlr/witty.g:60:13: ( DIGIT )+ ( '.' ( DIGIT )+ )?
            // antlr/witty.g:60:13: ( DIGIT )+
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
            	    // antlr/witty.g:60:13: DIGIT
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

            // antlr/witty.g:60:20: ( '.' ( DIGIT )+ )?
            var alt8=2;
            var LA8_0 = this.input.LA(1);

            if ( (LA8_0=='.') ) {
                alt8=1;
            }
            switch (alt8) {
                case 1 :
                    // antlr/witty.g:60:21: '.' ( DIGIT )+
                    this.match('.'); 
                    // antlr/witty.g:60:25: ( DIGIT )+
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
                    	    // antlr/witty.g:60:25: DIGIT
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




        }
        finally {
        }
    },
    // $ANTLR end NUM,

    // $ANTLR start COMMENT
    mCOMMENT: function()  {
        try {
            this.type = this.COMMENT;
            // antlr/witty.g:62:11: ( '//' ( . )* CR )
            // antlr/witty.g:62:13: '//' ( . )* CR
            this.match("//"); 

            // antlr/witty.g:62:18: ( . )*
            loop9:
            do {
                var alt9=2;
                var LA9_0 = this.input.LA(1);

                if ( (LA9_0=='\r') ) {
                    alt9=2;
                }
                else if ( (LA9_0=='\n') ) {
                    alt9=2;
                }
                else if ( ((LA9_0>='\u0000' && LA9_0<='\t')||(LA9_0>='\u000B' && LA9_0<='\f')||(LA9_0>='\u000E' && LA9_0<='\uFFFE')) ) {
                    alt9=1;
                }


                switch (alt9) {
            	case 1 :
            	    // antlr/witty.g:62:18: .
            	    this.matchAny(); 


            	    break;

            	default :
            	    break loop9;
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
            // antlr/witty.g:63:11: ( ( CR | ';' )+ )
            // antlr/witty.g:63:13: ( CR | ';' )+
            // antlr/witty.g:63:13: ( CR | ';' )+
            var cnt10=0;
            loop10:
            do {
                var alt10=3;
                var LA10_0 = this.input.LA(1);

                if ( (LA10_0=='\n'||LA10_0=='\r') ) {
                    alt10=1;
                }
                else if ( (LA10_0==';') ) {
                    alt10=2;
                }


                switch (alt10) {
            	case 1 :
            	    // antlr/witty.g:63:14: CR
            	    this.mCR(); 


            	    break;
            	case 2 :
            	    // antlr/witty.g:63:19: ';'
            	    this.match(';'); 


            	    break;

            	default :
            	    if ( cnt10 >= 1 ) {
                        break loop10;
                    }
                        var eee = new ANTLR.runtime.EarlyExitException(10, this.input);
                        throw eee;
                }
                cnt10++;
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
            // antlr/witty.g:64:11: ( ( ' ' | '\\t' | '\\u000C' ) )
            // antlr/witty.g:64:14: ( ' ' | '\\t' | '\\u000C' )
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
            // antlr/witty.g:66:23: ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC )
            var alt11=3;
            var LA11_0 = this.input.LA(1);

            if ( (LA11_0=='\\') ) {
                switch ( this.input.LA(2) ) {
                case 'u':
                    alt11=2;
                    break;
                case '\"':
                case '\'':
                case '\\':
                case 'b':
                case 'f':
                case 'n':
                case 'r':
                case 't':
                    alt11=1;
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    alt11=3;
                    break;
                default:
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("66:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 11, 1, this.input);

                    throw nvae;
                }

            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("66:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 11, 0, this.input);

                throw nvae;
            }
            switch (alt11) {
                case 1 :
                    // antlr/witty.g:66:27: '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' )
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
                    // antlr/witty.g:66:71: UNICODE_ESC
                    this.mUNICODE_ESC(); 


                    break;
                case 3 :
                    // antlr/witty.g:66:85: OCTAL_ESC
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
            // antlr/witty.g:67:23: ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) )
            var alt12=3;
            var LA12_0 = this.input.LA(1);

            if ( (LA12_0=='\\') ) {
                var LA12_1 = this.input.LA(2);

                if ( ((LA12_1>='0' && LA12_1<='3')) ) {
                    var LA12_2 = this.input.LA(3);

                    if ( ((LA12_2>='0' && LA12_2<='7')) ) {
                        var LA12_5 = this.input.LA(4);

                        if ( ((LA12_5>='0' && LA12_5<='7')) ) {
                            alt12=1;
                        }
                        else {
                            alt12=2;}
                    }
                    else {
                        alt12=3;}
                }
                else if ( ((LA12_1>='4' && LA12_1<='7')) ) {
                    var LA12_3 = this.input.LA(3);

                    if ( ((LA12_3>='0' && LA12_3<='7')) ) {
                        alt12=2;
                    }
                    else {
                        alt12=3;}
                }
                else {
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("67:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 12, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("67:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 12, 0, this.input);

                throw nvae;
            }
            switch (alt12) {
                case 1 :
                    // antlr/witty.g:67:25: '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:67:30: ( '0' .. '3' )
                    // antlr/witty.g:67:31: '0' .. '3'
                    this.matchRange('0','3'); 



                    // antlr/witty.g:67:41: ( '0' .. '7' )
                    // antlr/witty.g:67:42: '0' .. '7'
                    this.matchRange('0','7'); 



                    // antlr/witty.g:67:52: ( '0' .. '7' )
                    // antlr/witty.g:67:53: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 2 :
                    // antlr/witty.g:67:65: '\\\\' ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:67:70: ( '0' .. '7' )
                    // antlr/witty.g:67:71: '0' .. '7'
                    this.matchRange('0','7'); 



                    // antlr/witty.g:67:81: ( '0' .. '7' )
                    // antlr/witty.g:67:82: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 3 :
                    // antlr/witty.g:67:94: '\\\\' ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:67:99: ( '0' .. '7' )
                    // antlr/witty.g:67:100: '0' .. '7'
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
            // antlr/witty.g:68:23: ( '\\\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG )
            // antlr/witty.g:68:27: '\\\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG
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
            // antlr/witty.g:69:23: ( ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' ) )
            // antlr/witty.g:69:25: ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' )
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
            // antlr/witty.g:71:23: ( ( '_' | '~' | '#' | '$' | ':' | '?' | '`' ) )
            // antlr/witty.g:71:25: ( '_' | '~' | '#' | '$' | ':' | '?' | '`' )
            if ( (this.input.LA(1)>='#' && this.input.LA(1)<='$')||this.input.LA(1)==':'||this.input.LA(1)=='?'||(this.input.LA(1)>='_' && this.input.LA(1)<='`')||this.input.LA(1)=='~' ) {
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
            // antlr/witty.g:73:19: ( '0' .. '9' )
            // antlr/witty.g:73:21: '0' .. '9'
            this.matchRange('0','9'); 



        }
        finally {
        }
    },
    // $ANTLR end DIGIT,

    // $ANTLR start LETTER
    mLETTER: function()  {
        try {
            // antlr/witty.g:74:19: ( 'a' .. 'z' | 'A' .. 'Z' )
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
            // antlr/witty.g:75:19: ( ( '\\r' )? '\\n' )
            // antlr/witty.g:75:21: ( '\\r' )? '\\n'
            // antlr/witty.g:75:21: ( '\\r' )?
            var alt13=2;
            var LA13_0 = this.input.LA(1);

            if ( (LA13_0=='\r') ) {
                alt13=1;
            }
            switch (alt13) {
                case 1 :
                    // antlr/witty.g:75:22: '\\r'
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
        // antlr/witty.g:1:8: ( T21 | T22 | T23 | OPER | UNARY | ID | STRING | NUM | COMMENT | TERM | WS )
        var alt14=11;
        alt14 = this.dfa14.predict(this.input);
        switch (alt14) {
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
                // antlr/witty.g:1:22: OPER
                this.mOPER(); 


                break;
            case 5 :
                // antlr/witty.g:1:27: UNARY
                this.mUNARY(); 


                break;
            case 6 :
                // antlr/witty.g:1:33: ID
                this.mID(); 


                break;
            case 7 :
                // antlr/witty.g:1:36: STRING
                this.mSTRING(); 


                break;
            case 8 :
                // antlr/witty.g:1:43: NUM
                this.mNUM(); 


                break;
            case 9 :
                // antlr/witty.g:1:47: COMMENT
                this.mCOMMENT(); 


                break;
            case 10 :
                // antlr/witty.g:1:55: TERM
                this.mTERM(); 


                break;
            case 11 :
                // antlr/witty.g:1:60: WS
                this.mWS(); 


                break;

        }

    },

    dummy: null
});

ANTLR.lang.augmentObject(wittyLexer, {
    DFA14_eotS:
        "\u0004\uffff\u0001\u000a\u0001\u000e\u0001\u000a\u0006\uffff\u0001"+
    "\u000a\u0001\uffff\u0001\u000a\u0001\uffff\u0001\u000a",
    DFA14_eofS:
        "\u0012\uffff",
    DFA14_minS:
        "\u0001\u0009\u0003\uffff\u0001\u0021\u0001\u0023\u0001\u002f\u0006"+
    "\uffff\u0001\u0021\u0001\uffff\u0001\u0000\u0001\uffff\u0001\u0000",
    DFA14_maxS:
        "\u0001\u007e\u0003\uffff\u0002\u007e\u0001\u002f\u0006\uffff\u0001"+
    "\u007e\u0001\uffff\u0001\ufffe\u0001\uffff\u0001\ufffe",
    DFA14_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0003\uffff\u0001"+
    "\u0006\u0001\u0007\u0001\u0008\u0001\u0004\u0001\u000a\u0001\u000b\u0001"+
    "\uffff\u0001\u0005\u0001\uffff\u0001\u0009\u0001\uffff",
    DFA14_specialS:
        "\u0012\uffff}>",
    DFA14_transitionS: [
            "\u0001\u000c\u0001\u000b\u0001\uffff\u0001\u000c\u0001\u000b"+
            "\u0012\uffff\u0001\u000c\u0001\u0005\u0001\u0008\u0002\u0004"+
            "\u0002\u000a\u0001\uffff\u0001\u0001\u0001\u0002\u0002\u000a"+
            "\u0001\u0003\u0001\u0005\u0001\u000a\u0001\u0006\u000a\u0009"+
            "\u0001\u0004\u0001\u000b\u0003\u000a\u0001\u0004\u0001\u000a"+
            "\u001a\u0007\u0001\uffff\u0001\u000a\u0001\uffff\u0001\u000a"+
            "\u0002\u0004\u001a\u0007\u0001\uffff\u0001\u000a\u0001\uffff"+
            "\u0001\u0004",
            "",
            "",
            "",
            "\u0001\u000d\u0001\uffff\u0002\u000d\u000b\uffff\u000a\u0007"+
            "\u0001\u000d\u0004\uffff\u0001\u000d\u0001\uffff\u001a\u0007"+
            "\u0004\uffff\u0002\u000d\u001a\u0007\u0003\uffff\u0001\u000d",
            "\u0004\u000a\u0003\uffff\u0002\u000a\u0002\uffff\u0002\u000a"+
            "\u000a\uffff\u0001\u000a\u0001\uffff\u0005\u000a\u001b\uffff"+
            "\u0001\u000a\u0001\uffff\u0003\u000a\u001b\uffff\u0001\u000a"+
            "\u0001\uffff\u0001\u000a",
            "\u0001\u000f",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u000d\u0001\uffff\u0002\u000d\u000b\uffff\u000a\u0007"+
            "\u0001\u000d\u0004\uffff\u0001\u000d\u0001\uffff\u001a\u0007"+
            "\u0004\uffff\u0002\u000d\u001a\u0007\u0003\uffff\u0001\u000d",
            "",
            "\u0021\u0010\u0001\u0011\u0001\u0010\u0004\u0011\u0003\u0010"+
            "\u0002\u0011\u0001\u0010\u0003\u0011\u000a\u0010\u0001\u0011"+
            "\u0001\u0010\u0005\u0011\u001b\u0010\u0001\u0011\u0001\u0010"+
            "\u0003\u0011\u001b\u0010\u0001\u0011\u0001\u0010\u0001\u0011"+
            "\uff80\u0010",
            "",
            "\u0021\u0010\u0001\u0011\u0001\u0010\u0004\u0011\u0003\u0010"+
            "\u0002\u0011\u0001\u0010\u0003\u0011\u000a\u0010\u0001\u0011"+
            "\u0001\u0010\u0005\u0011\u001b\u0010\u0001\u0011\u0001\u0010"+
            "\u0003\u0011\u001b\u0010\u0001\u0011\u0001\u0010\u0001\u0011"+
            "\uff80\u0010"
    ]
});
    
ANTLR.lang.augmentObject(wittyLexer, {
    DFA14_eot:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA14_eotS),
    DFA14_eof:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA14_eofS),
    DFA14_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyLexer.DFA14_minS),
    DFA14_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyLexer.DFA14_maxS),
    DFA14_accept:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA14_acceptS),
    DFA14_special:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA14_specialS),
    DFA14_transition: (function() {
        var a = [],
            i,
            numStates = wittyLexer.DFA14_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA14_transitionS[i]));
        }
        return a;
    })()
});

wittyLexer.DFA14 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 14;
    this.eot = wittyLexer.DFA14_eot;
    this.eof = wittyLexer.DFA14_eof;
    this.min = wittyLexer.DFA14_min;
    this.max = wittyLexer.DFA14_max;
    this.accept = wittyLexer.DFA14_accept;
    this.special = wittyLexer.DFA14_special;
    this.transition = wittyLexer.DFA14_transition;
};

ANTLR.lang.extend(wittyLexer.DFA14, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( T21 | T22 | T23 | OPER | UNARY | ID | STRING | NUM | COMMENT | TERM | WS );";
    },
    dummy: null
});
 
})();