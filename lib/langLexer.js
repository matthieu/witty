// $ANTLR 3.0.1 antlr/lang.g 2008-06-22 11:28:25

var langLexer = function(input) {
    this.dfa8 = new langLexer.DFA8(this);
    langLexer.superclass.constructor.call(this, input);

};

(function(){
var HIDDEN = ANTLR.runtime.Token.HIDDEN_CHANNEL,
    EOF = ANTLR.runtime.Token.EOF;
ANTLR.lang.extend(langLexer, ANTLR.runtime.Lexer, {
    TERM : 4,
    LETTER : 9,
    INNT : 5,
    UNICODE_ESC : 15,
    OCTAL_ESC : 16,
    HEX_DIG : 17,
    ID : 7,
    Tokens : 21,
    EOF : -1,
    T20 : 20,
    SL_COMMENTS : 13,
    ESC_SEQ : 8,
    WS : 14,
    DIGIT : 11,
    SYMBOLS : 10,
    CR : 12,
    T18 : 18,
    T19 : 19,
    STRING : 6,
    getGrammarFileName: function() { return "antlr/lang.g"; },

    // $ANTLR start T18
    mT18: function()  {
        try {
            this.type = this.T18;
            // antlr/lang.g:7:5: ( '(' )
            // antlr/lang.g:7:7: '('
            this.match('('); 



        }
        finally {
        }
    },
    // $ANTLR end T18,

    // $ANTLR start T19
    mT19: function()  {
        try {
            this.type = this.T19;
            // antlr/lang.g:8:5: ( ',' )
            // antlr/lang.g:8:7: ','
            this.match(','); 



        }
        finally {
        }
    },
    // $ANTLR end T19,

    // $ANTLR start T20
    mT20: function()  {
        try {
            this.type = this.T20;
            // antlr/lang.g:9:5: ( ')' )
            // antlr/lang.g:9:7: ')'
            this.match(')'); 



        }
        finally {
        }
    },
    // $ANTLR end T20,

    // $ANTLR start STRING
    mSTRING: function()  {
        try {
            this.type = this.STRING;
            // antlr/lang.g:19:11: ( '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"' )
            // antlr/lang.g:19:14: '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"'
            this.match('\"'); 
            // antlr/lang.g:19:18: ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )*
            loop1:
            do {
                var alt1=3;
                var LA1_0 = this.input.LA(1);

                if ( (LA1_0=='\\') ) {
                    alt1=1;
                }
                else if ( ((LA1_0>='\u0000' && LA1_0<='!')||(LA1_0>='#' && LA1_0<='[')||(LA1_0>=']' && LA1_0<='\uFFFE')) ) {
                    alt1=2;
                }


                switch (alt1) {
            	case 1 :
            	    // antlr/lang.g:19:20: ESC_SEQ
            	    this.mESC_SEQ(); 


            	    break;
            	case 2 :
            	    // antlr/lang.g:19:30: ~ ( '\\\\' | '\"' )
            	    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='!')||(this.input.LA(1)>='#' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\uFFFE') ) {
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

            this.match('\"'); 



        }
        finally {
        }
    },
    // $ANTLR end STRING,

    // $ANTLR start ID
    mID: function()  {
        try {
            this.type = this.ID;
            // antlr/lang.g:20:11: ( ( LETTER | SYMBOLS ) ( LETTER | DIGIT | SYMBOLS )* )
            // antlr/lang.g:20:13: ( LETTER | SYMBOLS ) ( LETTER | DIGIT | SYMBOLS )*
            if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<='/')||this.input.LA(1)==':'||(this.input.LA(1)>='<' && this.input.LA(1)<='Z')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='_')||(this.input.LA(1)>='a' && this.input.LA(1)<='z')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }

            // antlr/lang.g:20:32: ( LETTER | DIGIT | SYMBOLS )*
            loop2:
            do {
                var alt2=2;
                var LA2_0 = this.input.LA(1);

                if ( (LA2_0=='!'||(LA2_0>='#' && LA2_0<='&')||(LA2_0>='*' && LA2_0<='+')||(LA2_0>='-' && LA2_0<=':')||(LA2_0>='<' && LA2_0<='Z')||LA2_0=='\\'||(LA2_0>='^' && LA2_0<='_')||(LA2_0>='a' && LA2_0<='z')||LA2_0=='|'||LA2_0=='~') ) {
                    alt2=1;
                }


                switch (alt2) {
            	case 1 :
            	    // antlr/lang.g:
            	    if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<=':')||(this.input.LA(1)>='<' && this.input.LA(1)<='Z')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='_')||(this.input.LA(1)>='a' && this.input.LA(1)<='z')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
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




        }
        finally {
        }
    },
    // $ANTLR end ID,

    // $ANTLR start INNT
    mINNT: function()  {
        try {
            this.type = this.INNT;
            // antlr/lang.g:21:11: ( ( DIGIT )+ )
            // antlr/lang.g:21:13: ( DIGIT )+
            // antlr/lang.g:21:13: ( DIGIT )+
            var cnt3=0;
            loop3:
            do {
                var alt3=2;
                var LA3_0 = this.input.LA(1);

                if ( ((LA3_0>='0' && LA3_0<='9')) ) {
                    alt3=1;
                }


                switch (alt3) {
            	case 1 :
            	    // antlr/lang.g:21:14: DIGIT
            	    this.mDIGIT(); 


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
    // $ANTLR end INNT,

    // $ANTLR start SL_COMMENTS
    mSL_COMMENTS: function()  {
        try {
            this.type = this.SL_COMMENTS;
            // antlr/lang.g:23:7: ( ( '//' ) ( . )* CR )
            // antlr/lang.g:23:9: ( '//' ) ( . )* CR
            // antlr/lang.g:23:9: ( '//' )
            // antlr/lang.g:23:10: '//'
            this.match("//"); 




            // antlr/lang.g:23:16: ( . )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0=='\n'||LA4_0=='\r') ) {
                    alt4=2;
                }
                else if ( ((LA4_0>='\u0000' && LA4_0<='\t')||(LA4_0>='\u000B' && LA4_0<='\f')||(LA4_0>='\u000E' && LA4_0<='\uFFFE')) ) {
                    alt4=1;
                }


                switch (alt4) {
            	case 1 :
            	    // antlr/lang.g:23:16: .
            	    this.matchAny(); 


            	    break;

            	default :
            	    break loop4;
                }
            } while (true);

            this.mCR(); 
             this.channel = HIDDEN; 



        }
        finally {
        }
    },
    // $ANTLR end SL_COMMENTS,

    // $ANTLR start TERM
    mTERM: function()  {
        try {
            this.type = this.TERM;
            // antlr/lang.g:24:7: ( ( CR | WS | ';' )+ )
            // antlr/lang.g:24:9: ( CR | WS | ';' )+
            // antlr/lang.g:24:9: ( CR | WS | ';' )+
            var cnt5=0;
            loop5:
            do {
                var alt5=2;
                var LA5_0 = this.input.LA(1);

                if ( ((LA5_0>='\t' && LA5_0<='\n')||LA5_0=='\r'||LA5_0==' '||LA5_0==';') ) {
                    alt5=1;
                }


                switch (alt5) {
            	case 1 :
            	    // antlr/lang.g:
            	    if ( (this.input.LA(1)>='\t' && this.input.LA(1)<='\n')||this.input.LA(1)=='\r'||this.input.LA(1)==' '||this.input.LA(1)==';' ) {
            	        this.input.consume();

            	    }
            	    else {
            	        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
            	        this.recover(mse);    throw mse;
            	    }



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




        }
        finally {
        }
    },
    // $ANTLR end TERM,

    // $ANTLR start ESC_SEQ
    mESC_SEQ: function()  {
        try {
            // antlr/lang.g:26:23: ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC )
            var alt6=3;
            var LA6_0 = this.input.LA(1);

            if ( (LA6_0=='\\') ) {
                switch ( this.input.LA(2) ) {
                case '\"':
                case '\'':
                case '\\':
                case 'b':
                case 'f':
                case 'n':
                case 'r':
                case 't':
                    alt6=1;
                    break;
                case 'u':
                    alt6=2;
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    alt6=3;
                    break;
                default:
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 6, 1, this.input);

                    throw nvae;
                }

            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("26:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 6, 0, this.input);

                throw nvae;
            }
            switch (alt6) {
                case 1 :
                    // antlr/lang.g:26:27: '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' )
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
                    // antlr/lang.g:26:71: UNICODE_ESC
                    this.mUNICODE_ESC(); 


                    break;
                case 3 :
                    // antlr/lang.g:26:85: OCTAL_ESC
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
            // antlr/lang.g:27:23: ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) )
            var alt7=3;
            var LA7_0 = this.input.LA(1);

            if ( (LA7_0=='\\') ) {
                var LA7_1 = this.input.LA(2);

                if ( ((LA7_1>='0' && LA7_1<='3')) ) {
                    var LA7_2 = this.input.LA(3);

                    if ( ((LA7_2>='0' && LA7_2<='7')) ) {
                        var LA7_5 = this.input.LA(4);

                        if ( ((LA7_5>='0' && LA7_5<='7')) ) {
                            alt7=1;
                        }
                        else {
                            alt7=2;}
                    }
                    else {
                        alt7=3;}
                }
                else if ( ((LA7_1>='4' && LA7_1<='7')) ) {
                    var LA7_3 = this.input.LA(3);

                    if ( ((LA7_3>='0' && LA7_3<='7')) ) {
                        alt7=2;
                    }
                    else {
                        alt7=3;}
                }
                else {
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("27:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 7, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("27:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 7, 0, this.input);

                throw nvae;
            }
            switch (alt7) {
                case 1 :
                    // antlr/lang.g:27:25: '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/lang.g:27:30: ( '0' .. '3' )
                    // antlr/lang.g:27:31: '0' .. '3'
                    this.matchRange('0','3'); 



                    // antlr/lang.g:27:41: ( '0' .. '7' )
                    // antlr/lang.g:27:42: '0' .. '7'
                    this.matchRange('0','7'); 



                    // antlr/lang.g:27:52: ( '0' .. '7' )
                    // antlr/lang.g:27:53: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 2 :
                    // antlr/lang.g:27:65: '\\\\' ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/lang.g:27:70: ( '0' .. '7' )
                    // antlr/lang.g:27:71: '0' .. '7'
                    this.matchRange('0','7'); 



                    // antlr/lang.g:27:81: ( '0' .. '7' )
                    // antlr/lang.g:27:82: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 3 :
                    // antlr/lang.g:27:94: '\\\\' ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/lang.g:27:99: ( '0' .. '7' )
                    // antlr/lang.g:27:100: '0' .. '7'
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
            // antlr/lang.g:28:23: ( '\\\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG )
            // antlr/lang.g:28:27: '\\\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG
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

    // $ANTLR start SYMBOLS
    mSYMBOLS: function()  {
        try {
            // antlr/lang.g:30:23: ( ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' ) )
            // antlr/lang.g:30:25: ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' )
            if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<='/')||this.input.LA(1)==':'||(this.input.LA(1)>='<' && this.input.LA(1)<='@')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='_')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
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

    // $ANTLR start CR
    mCR: function()  {
        try {
            // antlr/lang.g:32:14: ( ( '\\r' | '\\n' ) )
            // antlr/lang.g:32:16: ( '\\r' | '\\n' )
            if ( this.input.LA(1)=='\n'||this.input.LA(1)=='\r' ) {
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
    // $ANTLR end CR,

    // $ANTLR start WS
    mWS: function()  {
        try {
            // antlr/lang.g:33:14: ( ( ' ' | '\\t' ) )
            // antlr/lang.g:33:16: ( ' ' | '\\t' )
            if ( this.input.LA(1)=='\t'||this.input.LA(1)==' ' ) {
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
    // $ANTLR end WS,

    // $ANTLR start DIGIT
    mDIGIT: function()  {
        try {
            // antlr/lang.g:34:17: ( '0' .. '9' )
            // antlr/lang.g:34:22: '0' .. '9'
            this.matchRange('0','9'); 



        }
        finally {
        }
    },
    // $ANTLR end DIGIT,

    // $ANTLR start LETTER
    mLETTER: function()  {
        try {
            // antlr/lang.g:35:17: ( 'a' .. 'z' | 'A' .. 'Z' )
            // antlr/lang.g:
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

    // $ANTLR start HEX_DIG
    mHEX_DIG: function()  {
        try {
            // antlr/lang.g:36:18: ( ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' ) )
            // antlr/lang.g:36:20: ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' )
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

    mTokens: function() {
        // antlr/lang.g:1:8: ( T18 | T19 | T20 | STRING | ID | INNT | SL_COMMENTS | TERM )
        var alt8=8;
        alt8 = this.dfa8.predict(this.input);
        switch (alt8) {
            case 1 :
                // antlr/lang.g:1:10: T18
                this.mT18(); 


                break;
            case 2 :
                // antlr/lang.g:1:14: T19
                this.mT19(); 


                break;
            case 3 :
                // antlr/lang.g:1:18: T20
                this.mT20(); 


                break;
            case 4 :
                // antlr/lang.g:1:22: STRING
                this.mSTRING(); 


                break;
            case 5 :
                // antlr/lang.g:1:29: ID
                this.mID(); 


                break;
            case 6 :
                // antlr/lang.g:1:32: INNT
                this.mINNT(); 


                break;
            case 7 :
                // antlr/lang.g:1:37: SL_COMMENTS
                this.mSL_COMMENTS(); 


                break;
            case 8 :
                // antlr/lang.g:1:49: TERM
                this.mTERM(); 


                break;

        }

    },

    dummy: null
});

ANTLR.lang.augmentObject(langLexer, {
    DFA8_eotS:
        "\u0005\uffff\u0001\u0007\u0003\uffff\u0002\u0007\u0001\uffff",
    DFA8_eofS:
        "\u000c\uffff",
    DFA8_minS:
        "\u0001\u0009\u0004\uffff\u0001\u002f\u0003\uffff\u0002\u0000\u0001"+
    "\uffff",
    DFA8_maxS:
        "\u0001\u007e\u0004\uffff\u0001\u002f\u0003\uffff\u0002\ufffe\u0001"+
    "\uffff",
    DFA8_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\u0004\u0001"+
    "\uffff\u0001\u0006\u0001\u0005\u0001\u0008\u0002\uffff\u0001\u0007",
    DFA8_specialS:
        "\u000c\uffff}>",
    DFA8_transitionS: [
            "\u0002\u0008\u0002\uffff\u0001\u0008\u0012\uffff\u0001\u0008"+
            "\u0001\u0007\u0001\u0004\u0004\u0007\u0001\uffff\u0001\u0001"+
            "\u0001\u0003\u0002\u0007\u0001\u0002\u0002\u0007\u0001\u0005"+
            "\u000a\u0006\u0001\u0007\u0001\u0008\u001f\u0007\u0001\uffff"+
            "\u0001\u0007\u0001\uffff\u0002\u0007\u0001\uffff\u001a\u0007"+
            "\u0001\uffff\u0001\u0007\u0001\uffff\u0001\u0007",
            "",
            "",
            "",
            "",
            "\u0001\u0009",
            "",
            "",
            "",
            "\u0021\u000b\u0001\u000a\u0001\u000b\u0004\u000a\u0003\u000b"+
            "\u0002\u000a\u0001\u000b\u000e\u000a\u0001\u000b\u001f\u000a"+
            "\u0001\u000b\u0001\u000a\u0001\u000b\u0002\u000a\u0001\u000b"+
            "\u001a\u000a\u0001\u000b\u0001\u000a\u0001\u000b\u0001\u000a"+
            "\uff80\u000b",
            "\u0021\u000b\u0001\u000a\u0001\u000b\u0004\u000a\u0003\u000b"+
            "\u0002\u000a\u0001\u000b\u000e\u000a\u0001\u000b\u001f\u000a"+
            "\u0001\u000b\u0001\u000a\u0001\u000b\u0002\u000a\u0001\u000b"+
            "\u001a\u000a\u0001\u000b\u0001\u000a\u0001\u000b\u0001\u000a"+
            "\uff80\u000b",
            ""
    ]
});
    
ANTLR.lang.augmentObject(langLexer, {
    DFA8_eot:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA8_eotS),
    DFA8_eof:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA8_eofS),
    DFA8_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(langLexer.DFA8_minS),
    DFA8_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(langLexer.DFA8_maxS),
    DFA8_accept:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA8_acceptS),
    DFA8_special:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA8_specialS),
    DFA8_transition: (function() {
        var a = [],
            i,
            numStates = langLexer.DFA8_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA8_transitionS[i]));
        }
        return a;
    })()
});

langLexer.DFA8 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 8;
    this.eot = langLexer.DFA8_eot;
    this.eof = langLexer.DFA8_eof;
    this.min = langLexer.DFA8_min;
    this.max = langLexer.DFA8_max;
    this.accept = langLexer.DFA8_accept;
    this.special = langLexer.DFA8_special;
    this.transition = langLexer.DFA8_transition;
};

ANTLR.lang.extend(langLexer.DFA8, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( T18 | T19 | T20 | STRING | ID | INNT | SL_COMMENTS | TERM );";
    },
    dummy: null
});
 
})();