// $ANTLR 3.0.1 antlr/witty.g 2008-07-06 12:13:37

var wittyLexer = function(input) {
    this.dfa12 = new wittyLexer.DFA12(this);
    wittyLexer.superclass.constructor.call(this, input);

};

(function(){
var HIDDEN = ANTLR.runtime.Token.HIDDEN_CHANNEL,
    EOF = ANTLR.runtime.Token.EOF;
ANTLR.lang.extend(wittyLexer, ANTLR.runtime.Lexer, {
    TERM : 4,
    LETTER : 9,
    UNICODE_ESC : 17,
    OCTAL_ESC : 18,
    HEX_DIG : 19,
    ID : 6,
    Tokens : 23,
    EOF : -1,
    NON_OP : 10,
    T22 : 22,
    T21 : 21,
    T20 : 20,
    NUM : 7,
    OPER : 5,
    ESC_SEQ : 12,
    WS : 16,
    DIGIT : 11,
    SYMBOLS : 13,
    COMMENT : 14,
    CR : 15,
    STRING : 8,
    getGrammarFileName: function() { return "antlr/witty.g"; },

    // $ANTLR start T20
    mT20: function()  {
        try {
            this.type = this.T20;
            // antlr/witty.g:7:5: ( '(' )
            // antlr/witty.g:7:7: '('
            this.match('('); 



        }
        finally {
        }
    },
    // $ANTLR end T20,

    // $ANTLR start T21
    mT21: function()  {
        try {
            this.type = this.T21;
            // antlr/witty.g:8:5: ( ')' )
            // antlr/witty.g:8:7: ')'
            this.match(')'); 



        }
        finally {
        }
    },
    // $ANTLR end T21,

    // $ANTLR start T22
    mT22: function()  {
        try {
            this.type = this.T22;
            // antlr/witty.g:9:5: ( ',' )
            // antlr/witty.g:9:7: ','
            this.match(','); 



        }
        finally {
        }
    },
    // $ANTLR end T22,

    // $ANTLR start ID
    mID: function()  {
        try {
            this.type = this.ID;
            // antlr/witty.g:57:11: ( ( LETTER | NON_OP ) ( LETTER | DIGIT | NON_OP | '!' )* )
            // antlr/witty.g:57:13: ( LETTER | NON_OP ) ( LETTER | DIGIT | NON_OP | '!' )*
            if ( (this.input.LA(1)>='#' && this.input.LA(1)<='$')||this.input.LA(1)==':'||(this.input.LA(1)>='?' && this.input.LA(1)<='Z')||(this.input.LA(1)>='_' && this.input.LA(1)<='z')||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }

            // antlr/witty.g:57:31: ( LETTER | DIGIT | NON_OP | '!' )*
            loop1:
            do {
                var alt1=2;
                var LA1_0 = this.input.LA(1);

                if ( (LA1_0=='!'||(LA1_0>='#' && LA1_0<='$')||(LA1_0>='0' && LA1_0<=':')||(LA1_0>='?' && LA1_0<='Z')||(LA1_0>='_' && LA1_0<='z')||LA1_0=='~') ) {
                    alt1=1;
                }


                switch (alt1) {
            	case 1 :
            	    // antlr/witty.g:
            	    if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='$')||(this.input.LA(1)>='0' && this.input.LA(1)<=':')||(this.input.LA(1)>='?' && this.input.LA(1)<='Z')||(this.input.LA(1)>='_' && this.input.LA(1)<='z')||this.input.LA(1)=='~' ) {
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




        }
        finally {
        }
    },
    // $ANTLR end ID,

    // $ANTLR start STRING
    mSTRING: function()  {
        try {
            this.type = this.STRING;
            // antlr/witty.g:58:11: ( '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"' )
            // antlr/witty.g:58:14: '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"'
            this.match('\"'); 
            // antlr/witty.g:58:18: ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )*
            loop2:
            do {
                var alt2=3;
                var LA2_0 = this.input.LA(1);

                if ( (LA2_0=='\\') ) {
                    alt2=1;
                }
                else if ( ((LA2_0>='\u0000' && LA2_0<='!')||(LA2_0>='#' && LA2_0<='[')||(LA2_0>=']' && LA2_0<='\uFFFE')) ) {
                    alt2=2;
                }


                switch (alt2) {
            	case 1 :
            	    // antlr/witty.g:58:20: ESC_SEQ
            	    this.mESC_SEQ(); 


            	    break;
            	case 2 :
            	    // antlr/witty.g:58:30: ~ ( '\\\\' | '\"' )
            	    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='!')||(this.input.LA(1)>='#' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\uFFFE') ) {
            	        this.input.consume();

            	    }
            	    else {
            	        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
            	        this.recover(mse);    throw mse;
            	    }



            	    break;

            	default :
            	    break loop2;
                }
            } while (true);

            this.match('\"'); 



        }
        finally {
        }
    },
    // $ANTLR end STRING,

    // $ANTLR start OPER
    mOPER: function()  {
        try {
            this.type = this.OPER;
            // antlr/witty.g:59:11: ( ( SYMBOLS )+ )
            // antlr/witty.g:59:13: ( SYMBOLS )+
            // antlr/witty.g:59:13: ( SYMBOLS )+
            var cnt3=0;
            loop3:
            do {
                var alt3=2;
                var LA3_0 = this.input.LA(1);

                if ( (LA3_0=='!'||(LA3_0>='#' && LA3_0<='&')||(LA3_0>='*' && LA3_0<='+')||(LA3_0>='-' && LA3_0<='/')||LA3_0==':'||(LA3_0>='<' && LA3_0<='@')||LA3_0=='\\'||(LA3_0>='^' && LA3_0<='`')||LA3_0=='|'||LA3_0=='~') ) {
                    alt3=1;
                }


                switch (alt3) {
            	case 1 :
            	    // antlr/witty.g:59:13: SYMBOLS
            	    this.mSYMBOLS(); 


            	    break;

            	default :
            	    if ( cnt3 >= 1 ) {
                        break loop3;
                    }
                        var eee = new ANTLR.runtime.EarlyExitException(3, this.input);
                        throw eee;
                }
                cnt3++;
            } while (true);




        }
        finally {
        }
    },
    // $ANTLR end OPER,

    // $ANTLR start NUM
    mNUM: function()  {
        try {
            this.type = this.NUM;
            // antlr/witty.g:60:11: ( ( DIGIT )+ ( '.' ( DIGIT )+ )? )
            // antlr/witty.g:60:13: ( DIGIT )+ ( '.' ( DIGIT )+ )?
            // antlr/witty.g:60:13: ( DIGIT )+
            var cnt4=0;
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( ((LA4_0>='0' && LA4_0<='9')) ) {
                    alt4=1;
                }


                switch (alt4) {
            	case 1 :
            	    // antlr/witty.g:60:13: DIGIT
            	    this.mDIGIT(); 


            	    break;

            	default :
            	    if ( cnt4 >= 1 ) {
                        break loop4;
                    }
                        var eee = new ANTLR.runtime.EarlyExitException(4, this.input);
                        throw eee;
                }
                cnt4++;
            } while (true);

            // antlr/witty.g:60:20: ( '.' ( DIGIT )+ )?
            var alt6=2;
            var LA6_0 = this.input.LA(1);

            if ( (LA6_0=='.') ) {
                alt6=1;
            }
            switch (alt6) {
                case 1 :
                    // antlr/witty.g:60:21: '.' ( DIGIT )+
                    this.match('.'); 
                    // antlr/witty.g:60:25: ( DIGIT )+
                    var cnt5=0;
                    loop5:
                    do {
                        var alt5=2;
                        var LA5_0 = this.input.LA(1);

                        if ( ((LA5_0>='0' && LA5_0<='9')) ) {
                            alt5=1;
                        }


                        switch (alt5) {
                    	case 1 :
                    	    // antlr/witty.g:60:25: DIGIT
                    	    this.mDIGIT(); 


                    	    break;

                    	default :
                    	    if ( cnt5 >= 1 ) {
                                break loop5;
                            }
                                var eee = new ANTLR.runtime.EarlyExitException(5, this.input);
                                throw eee;
                        }
                        cnt5++;
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
            // antlr/witty.g:62:11: ( '//' ( . )* TERM )
            // antlr/witty.g:62:13: '//' ( . )* TERM
            this.match("//"); 

            // antlr/witty.g:62:18: ( . )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0=='\r') ) {
                    alt7=2;
                }
                else if ( (LA7_0=='\n') ) {
                    alt7=2;
                }
                else if ( (LA7_0==';') ) {
                    alt7=2;
                }
                else if ( ((LA7_0>='\u0000' && LA7_0<='\t')||(LA7_0>='\u000B' && LA7_0<='\f')||(LA7_0>='\u000E' && LA7_0<=':')||(LA7_0>='<' && LA7_0<='\uFFFE')) ) {
                    alt7=1;
                }


                switch (alt7) {
            	case 1 :
            	    // antlr/witty.g:62:18: .
            	    this.matchAny(); 


            	    break;

            	default :
            	    break loop7;
                }
            } while (true);

            this.mTERM(); 
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
            var cnt8=0;
            loop8:
            do {
                var alt8=3;
                var LA8_0 = this.input.LA(1);

                if ( (LA8_0=='\n'||LA8_0=='\r') ) {
                    alt8=1;
                }
                else if ( (LA8_0==';') ) {
                    alt8=2;
                }


                switch (alt8) {
            	case 1 :
            	    // antlr/witty.g:63:14: CR
            	    this.mCR(); 


            	    break;
            	case 2 :
            	    // antlr/witty.g:63:19: ';'
            	    this.match(';'); 


            	    break;

            	default :
            	    if ( cnt8 >= 1 ) {
                        break loop8;
                    }
                        var eee = new ANTLR.runtime.EarlyExitException(8, this.input);
                        throw eee;
                }
                cnt8++;
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
            var alt9=3;
            var LA9_0 = this.input.LA(1);

            if ( (LA9_0=='\\') ) {
                switch ( this.input.LA(2) ) {
                case '\"':
                case '\'':
                case '\\':
                case 'b':
                case 'f':
                case 'n':
                case 'r':
                case 't':
                    alt9=1;
                    break;
                case 'u':
                    alt9=2;
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    alt9=3;
                    break;
                default:
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("66:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 9, 1, this.input);

                    throw nvae;
                }

            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("66:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 9, 0, this.input);

                throw nvae;
            }
            switch (alt9) {
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
            var alt10=3;
            var LA10_0 = this.input.LA(1);

            if ( (LA10_0=='\\') ) {
                var LA10_1 = this.input.LA(2);

                if ( ((LA10_1>='0' && LA10_1<='3')) ) {
                    var LA10_2 = this.input.LA(3);

                    if ( ((LA10_2>='0' && LA10_2<='7')) ) {
                        var LA10_4 = this.input.LA(4);

                        if ( ((LA10_4>='0' && LA10_4<='7')) ) {
                            alt10=1;
                        }
                        else {
                            alt10=2;}
                    }
                    else {
                        alt10=3;}
                }
                else if ( ((LA10_1>='4' && LA10_1<='7')) ) {
                    var LA10_3 = this.input.LA(3);

                    if ( ((LA10_3>='0' && LA10_3<='7')) ) {
                        alt10=2;
                    }
                    else {
                        alt10=3;}
                }
                else {
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("67:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 10, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("67:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 10, 0, this.input);

                throw nvae;
            }
            switch (alt10) {
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

    // $ANTLR start SYMBOLS
    mSYMBOLS: function()  {
        try {
            // antlr/witty.g:71:23: ( ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' | '`' ) )
            // antlr/witty.g:71:25: ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' | '`' )
            if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<='/')||this.input.LA(1)==':'||(this.input.LA(1)>='<' && this.input.LA(1)<='@')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='`')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
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

    // $ANTLR start NON_OP
    mNON_OP: function()  {
        try {
            // antlr/witty.g:73:23: ( ( '_' | '~' | '@' | '#' | '$' | ':' | '?' | '`' ) )
            // antlr/witty.g:73:25: ( '_' | '~' | '@' | '#' | '$' | ':' | '?' | '`' )
            if ( (this.input.LA(1)>='#' && this.input.LA(1)<='$')||this.input.LA(1)==':'||(this.input.LA(1)>='?' && this.input.LA(1)<='@')||(this.input.LA(1)>='_' && this.input.LA(1)<='`')||this.input.LA(1)=='~' ) {
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
            // antlr/witty.g:75:19: ( '0' .. '9' )
            // antlr/witty.g:75:21: '0' .. '9'
            this.matchRange('0','9'); 



        }
        finally {
        }
    },
    // $ANTLR end DIGIT,

    // $ANTLR start LETTER
    mLETTER: function()  {
        try {
            // antlr/witty.g:76:19: ( 'a' .. 'z' | 'A' .. 'Z' )
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
            // antlr/witty.g:77:19: ( ( '\\r' )? '\\n' )
            // antlr/witty.g:77:21: ( '\\r' )? '\\n'
            // antlr/witty.g:77:21: ( '\\r' )?
            var alt11=2;
            var LA11_0 = this.input.LA(1);

            if ( (LA11_0=='\r') ) {
                alt11=1;
            }
            switch (alt11) {
                case 1 :
                    // antlr/witty.g:77:22: '\\r'
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
        // antlr/witty.g:1:8: ( T20 | T21 | T22 | ID | STRING | OPER | NUM | COMMENT | TERM | WS )
        var alt12=10;
        alt12 = this.dfa12.predict(this.input);
        switch (alt12) {
            case 1 :
                // antlr/witty.g:1:10: T20
                this.mT20(); 


                break;
            case 2 :
                // antlr/witty.g:1:14: T21
                this.mT21(); 


                break;
            case 3 :
                // antlr/witty.g:1:18: T22
                this.mT22(); 


                break;
            case 4 :
                // antlr/witty.g:1:22: ID
                this.mID(); 


                break;
            case 5 :
                // antlr/witty.g:1:25: STRING
                this.mSTRING(); 


                break;
            case 6 :
                // antlr/witty.g:1:32: OPER
                this.mOPER(); 


                break;
            case 7 :
                // antlr/witty.g:1:37: NUM
                this.mNUM(); 


                break;
            case 8 :
                // antlr/witty.g:1:41: COMMENT
                this.mCOMMENT(); 


                break;
            case 9 :
                // antlr/witty.g:1:49: TERM
                this.mTERM(); 


                break;
            case 10 :
                // antlr/witty.g:1:54: WS
                this.mWS(); 


                break;

        }

    },

    dummy: null
});

ANTLR.lang.augmentObject(wittyLexer, {
    DFA12_eotS:
        "\u0004\uffff\u0001\u0006\u0002\uffff\u0001\u0009\u0004\uffff\u0001"+
    "\u0006\u0001\u0009\u0001\uffff\u0001\u0009",
    DFA12_eofS:
        "\u0010\uffff",
    DFA12_minS:
        "\u0001\u0009\u0003\uffff\u0001\u0021\u0002\uffff\u0001\u002f\u0004"+
    "\uffff\u0001\u0021\u0001\u0000\u0001\uffff\u0001\u0000",
    DFA12_maxS:
        "\u0001\u007e\u0003\uffff\u0001\u007e\u0002\uffff\u0001\u002f\u0004"+
    "\uffff\u0001\u007e\u0001\ufffe\u0001\uffff\u0001\ufffe",
    DFA12_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\uffff\u0001"+
    "\u0005\u0001\u0004\u0001\uffff\u0001\u0007\u0001\u0006\u0001\u0009\u0001"+
    "\u000a\u0002\uffff\u0001\u0008\u0001\uffff",
    DFA12_specialS:
        "\u0010\uffff}>",
    DFA12_transitionS: [
            "\u0001\u000b\u0001\u000a\u0001\uffff\u0001\u000b\u0001\u000a"+
            "\u0012\uffff\u0001\u000b\u0001\u0009\u0001\u0005\u0002\u0004"+
            "\u0002\u0009\u0001\uffff\u0001\u0001\u0001\u0002\u0002\u0009"+
            "\u0001\u0003\u0002\u0009\u0001\u0007\u000a\u0008\u0001\u0004"+
            "\u0001\u000a\u0003\u0009\u0002\u0004\u001a\u0006\u0001\uffff"+
            "\u0001\u0009\u0001\uffff\u0001\u0009\u0002\u0004\u001a\u0006"+
            "\u0001\uffff\u0001\u0009\u0001\uffff\u0001\u0004",
            "",
            "",
            "",
            "\u0001\u000c\u0001\uffff\u0002\u000c\u0002\u0009\u0003\uffff"+
            "\u0002\u0009\u0001\uffff\u0003\u0009\u000a\uffff\u0001\u000c"+
            "\u0001\uffff\u0003\u0009\u0002\u000c\u001b\uffff\u0001\u0009"+
            "\u0001\uffff\u0001\u0009\u0002\u000c\u001b\uffff\u0001\u0009"+
            "\u0001\uffff\u0001\u000c",
            "",
            "",
            "\u0001\u000d",
            "",
            "",
            "",
            "",
            "\u0001\u000c\u0001\uffff\u0002\u000c\u0002\u0009\u0003\uffff"+
            "\u0002\u0009\u0001\uffff\u0003\u0009\u000a\uffff\u0001\u000c"+
            "\u0001\uffff\u0003\u0009\u0002\u000c\u001b\uffff\u0001\u0009"+
            "\u0001\uffff\u0001\u0009\u0002\u000c\u001b\uffff\u0001\u0009"+
            "\u0001\uffff\u0001\u000c",
            "\u0021\u000e\u0001\u000f\u0001\u000e\u0004\u000f\u0003\u000e"+
            "\u0002\u000f\u0001\u000e\u0003\u000f\u000a\u000e\u0001\u000f"+
            "\u0001\u000e\u0005\u000f\u001b\u000e\u0001\u000f\u0001\u000e"+
            "\u0003\u000f\u001b\u000e\u0001\u000f\u0001\u000e\u0001\u000f"+
            "\uff80\u000e",
            "",
            "\u0021\u000e\u0001\u000f\u0001\u000e\u0004\u000f\u0003\u000e"+
            "\u0002\u000f\u0001\u000e\u0003\u000f\u000a\u000e\u0001\u000f"+
            "\u0001\u000e\u0005\u000f\u001b\u000e\u0001\u000f\u0001\u000e"+
            "\u0003\u000f\u001b\u000e\u0001\u000f\u0001\u000e\u0001\u000f"+
            "\uff80\u000e"
    ]
});
    
ANTLR.lang.augmentObject(wittyLexer, {
    DFA12_eot:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA12_eotS),
    DFA12_eof:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA12_eofS),
    DFA12_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyLexer.DFA12_minS),
    DFA12_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyLexer.DFA12_maxS),
    DFA12_accept:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA12_acceptS),
    DFA12_special:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA12_specialS),
    DFA12_transition: (function() {
        var a = [],
            i,
            numStates = wittyLexer.DFA12_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA12_transitionS[i]));
        }
        return a;
    })()
});

wittyLexer.DFA12 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 12;
    this.eot = wittyLexer.DFA12_eot;
    this.eof = wittyLexer.DFA12_eof;
    this.min = wittyLexer.DFA12_min;
    this.max = wittyLexer.DFA12_max;
    this.accept = wittyLexer.DFA12_accept;
    this.special = wittyLexer.DFA12_special;
    this.transition = wittyLexer.DFA12_transition;
};

ANTLR.lang.extend(wittyLexer.DFA12, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( T20 | T21 | T22 | ID | STRING | OPER | NUM | COMMENT | TERM | WS );";
    },
    dummy: null
});
 
})();