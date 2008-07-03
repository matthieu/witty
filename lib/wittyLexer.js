// $ANTLR 3.0.1 antlr/witty.g 2008-07-02 20:47:53

var wittyLexer = function(input) {
    this.dfa10 = new wittyLexer.DFA10(this);
    wittyLexer.superclass.constructor.call(this, input);

};

(function(){
var HIDDEN = ANTLR.runtime.Token.HIDDEN_CHANNEL,
    EOF = ANTLR.runtime.Token.EOF;
ANTLR.lang.extend(wittyLexer, ANTLR.runtime.Lexer, {
    TERM : 4,
    LETTER : 11,
    INNT : 7,
    UNICODE_ESC : 17,
    OCTAL_ESC : 18,
    HEX_DIG : 19,
    ID : 6,
    Tokens : 23,
    EOF : -1,
    NON_OP : 12,
    T22 : 22,
    T21 : 21,
    T20 : 20,
    WS : 5,
    OPER : 9,
    ESC_SEQ : 10,
    DIGIT : 13,
    SYMBOLS : 14,
    COMMENT : 15,
    CR : 16,
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
            // antlr/witty.g:8:5: ( ',' )
            // antlr/witty.g:8:7: ','
            this.match(','); 



        }
        finally {
        }
    },
    // $ANTLR end T21,

    // $ANTLR start T22
    mT22: function()  {
        try {
            this.type = this.T22;
            // antlr/witty.g:9:5: ( ')' )
            // antlr/witty.g:9:7: ')'
            this.match(')'); 



        }
        finally {
        }
    },
    // $ANTLR end T22,

    // $ANTLR start STRING
    mSTRING: function()  {
        try {
            this.type = this.STRING;
            // antlr/witty.g:37:11: ( '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"' )
            // antlr/witty.g:37:14: '\"' ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )* '\"'
            this.match('\"'); 
            // antlr/witty.g:37:18: ( ESC_SEQ | ~ ( '\\\\' | '\"' ) )*
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
            	    // antlr/witty.g:37:20: ESC_SEQ
            	    this.mESC_SEQ(); 


            	    break;
            	case 2 :
            	    // antlr/witty.g:37:30: ~ ( '\\\\' | '\"' )
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
            // antlr/witty.g:38:11: ( ( LETTER | NON_OP ) ( LETTER | DIGIT | SYMBOLS )* )
            // antlr/witty.g:38:13: ( LETTER | NON_OP ) ( LETTER | DIGIT | SYMBOLS )*
            if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='$')||this.input.LA(1)=='.'||this.input.LA(1)==':'||(this.input.LA(1)>='?' && this.input.LA(1)<='Z')||this.input.LA(1)=='_'||(this.input.LA(1)>='a' && this.input.LA(1)<='z')||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }

            // antlr/witty.g:38:31: ( LETTER | DIGIT | SYMBOLS )*
            loop2:
            do {
                var alt2=2;
                var LA2_0 = this.input.LA(1);

                if ( (LA2_0=='!'||(LA2_0>='#' && LA2_0<='&')||(LA2_0>='*' && LA2_0<='+')||(LA2_0>='-' && LA2_0<=':')||(LA2_0>='<' && LA2_0<='Z')||LA2_0=='\\'||(LA2_0>='^' && LA2_0<='_')||(LA2_0>='a' && LA2_0<='z')||LA2_0=='|'||LA2_0=='~') ) {
                    alt2=1;
                }


                switch (alt2) {
            	case 1 :
            	    // antlr/witty.g:
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

    // $ANTLR start OPER
    mOPER: function()  {
        try {
            this.type = this.OPER;
            // antlr/witty.g:39:11: ( ( SYMBOLS )+ )
            // antlr/witty.g:39:13: ( SYMBOLS )+
            // antlr/witty.g:39:13: ( SYMBOLS )+
            var cnt3=0;
            loop3:
            do {
                var alt3=2;
                var LA3_0 = this.input.LA(1);

                if ( (LA3_0=='!'||(LA3_0>='#' && LA3_0<='&')||(LA3_0>='*' && LA3_0<='+')||(LA3_0>='-' && LA3_0<='/')||LA3_0==':'||(LA3_0>='<' && LA3_0<='@')||LA3_0=='\\'||(LA3_0>='^' && LA3_0<='_')||LA3_0=='|'||LA3_0=='~') ) {
                    alt3=1;
                }


                switch (alt3) {
            	case 1 :
            	    // antlr/witty.g:39:13: SYMBOLS
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

    // $ANTLR start INNT
    mINNT: function()  {
        try {
            this.type = this.INNT;
            // antlr/witty.g:40:11: ( ( DIGIT )+ )
            // antlr/witty.g:40:13: ( DIGIT )+
            // antlr/witty.g:40:13: ( DIGIT )+
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
            	    // antlr/witty.g:40:14: DIGIT
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




        }
        finally {
        }
    },
    // $ANTLR end INNT,

    // $ANTLR start COMMENT
    mCOMMENT: function()  {
        try {
            this.type = this.COMMENT;
            // antlr/witty.g:42:11: ( '//' ( . )* TERM )
            // antlr/witty.g:42:13: '//' ( . )* TERM
            this.match("//"); 

            // antlr/witty.g:42:18: ( . )*
            loop5:
            do {
                var alt5=2;
                var LA5_0 = this.input.LA(1);

                if ( (LA5_0=='\r') ) {
                    alt5=2;
                }
                else if ( (LA5_0=='\n') ) {
                    alt5=2;
                }
                else if ( (LA5_0==';') ) {
                    alt5=2;
                }
                else if ( ((LA5_0>='\u0000' && LA5_0<='\t')||(LA5_0>='\u000B' && LA5_0<='\f')||(LA5_0>='\u000E' && LA5_0<=':')||(LA5_0>='<' && LA5_0<='\uFFFE')) ) {
                    alt5=1;
                }


                switch (alt5) {
            	case 1 :
            	    // antlr/witty.g:42:18: .
            	    this.matchAny(); 


            	    break;

            	default :
            	    break loop5;
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
            // antlr/witty.g:43:11: ( ( CR | ';' )+ )
            // antlr/witty.g:43:13: ( CR | ';' )+
            // antlr/witty.g:43:13: ( CR | ';' )+
            var cnt6=0;
            loop6:
            do {
                var alt6=3;
                var LA6_0 = this.input.LA(1);

                if ( (LA6_0=='\n'||LA6_0=='\r') ) {
                    alt6=1;
                }
                else if ( (LA6_0==';') ) {
                    alt6=2;
                }


                switch (alt6) {
            	case 1 :
            	    // antlr/witty.g:43:14: CR
            	    this.mCR(); 


            	    break;
            	case 2 :
            	    // antlr/witty.g:43:19: ';'
            	    this.match(';'); 


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




        }
        finally {
        }
    },
    // $ANTLR end TERM,

    // $ANTLR start WS
    mWS: function()  {
        try {
            this.type = this.WS;
            // antlr/witty.g:44:11: ( ( ' ' | '\\t' | '\\u000C' ) )
            // antlr/witty.g:44:14: ( ' ' | '\\t' | '\\u000C' )
            if ( this.input.LA(1)=='\t'||this.input.LA(1)=='\f'||this.input.LA(1)==' ' ) {
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

    // $ANTLR start ESC_SEQ
    mESC_SEQ: function()  {
        try {
            // antlr/witty.g:46:23: ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC )
            var alt7=3;
            var LA7_0 = this.input.LA(1);

            if ( (LA7_0=='\\') ) {
                switch ( this.input.LA(2) ) {
                case 'u':
                    alt7=2;
                    break;
                case '\"':
                case '\'':
                case '\\':
                case 'b':
                case 'f':
                case 'n':
                case 'r':
                case 't':
                    alt7=1;
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    alt7=3;
                    break;
                default:
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("46:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 7, 1, this.input);

                    throw nvae;
                }

            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("46:10: fragment ESC_SEQ : ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UNICODE_ESC | OCTAL_ESC );", 7, 0, this.input);

                throw nvae;
            }
            switch (alt7) {
                case 1 :
                    // antlr/witty.g:46:27: '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' )
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
                    // antlr/witty.g:46:71: UNICODE_ESC
                    this.mUNICODE_ESC(); 


                    break;
                case 3 :
                    // antlr/witty.g:46:85: OCTAL_ESC
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
            // antlr/witty.g:47:23: ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) )
            var alt8=3;
            var LA8_0 = this.input.LA(1);

            if ( (LA8_0=='\\') ) {
                var LA8_1 = this.input.LA(2);

                if ( ((LA8_1>='0' && LA8_1<='3')) ) {
                    var LA8_2 = this.input.LA(3);

                    if ( ((LA8_2>='0' && LA8_2<='7')) ) {
                        var LA8_5 = this.input.LA(4);

                        if ( ((LA8_5>='0' && LA8_5<='7')) ) {
                            alt8=1;
                        }
                        else {
                            alt8=2;}
                    }
                    else {
                        alt8=3;}
                }
                else if ( ((LA8_1>='4' && LA8_1<='7')) ) {
                    var LA8_3 = this.input.LA(3);

                    if ( ((LA8_3>='0' && LA8_3<='7')) ) {
                        alt8=2;
                    }
                    else {
                        alt8=3;}
                }
                else {
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("47:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 8, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("47:10: fragment OCTAL_ESC : ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) );", 8, 0, this.input);

                throw nvae;
            }
            switch (alt8) {
                case 1 :
                    // antlr/witty.g:47:25: '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:47:30: ( '0' .. '3' )
                    // antlr/witty.g:47:31: '0' .. '3'
                    this.matchRange('0','3'); 



                    // antlr/witty.g:47:41: ( '0' .. '7' )
                    // antlr/witty.g:47:42: '0' .. '7'
                    this.matchRange('0','7'); 



                    // antlr/witty.g:47:52: ( '0' .. '7' )
                    // antlr/witty.g:47:53: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 2 :
                    // antlr/witty.g:47:65: '\\\\' ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:47:70: ( '0' .. '7' )
                    // antlr/witty.g:47:71: '0' .. '7'
                    this.matchRange('0','7'); 



                    // antlr/witty.g:47:81: ( '0' .. '7' )
                    // antlr/witty.g:47:82: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 3 :
                    // antlr/witty.g:47:94: '\\\\' ( '0' .. '7' )
                    this.match('\\'); 
                    // antlr/witty.g:47:99: ( '0' .. '7' )
                    // antlr/witty.g:47:100: '0' .. '7'
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
            // antlr/witty.g:48:23: ( '\\\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG )
            // antlr/witty.g:48:27: '\\\\' 'u' HEX_DIG HEX_DIG HEX_DIG HEX_DIG
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
            // antlr/witty.g:49:23: ( ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' ) )
            // antlr/witty.g:49:25: ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' )
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
            // antlr/witty.g:51:23: ( ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' ) )
            // antlr/witty.g:51:25: ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' )
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

    // $ANTLR start NON_OP
    mNON_OP: function()  {
        try {
            // antlr/witty.g:53:23: ( ( '_' | '~' | '!' | '@' | '#' | '$' | ':' | '.' | '?' ) )
            // antlr/witty.g:53:25: ( '_' | '~' | '!' | '@' | '#' | '$' | ':' | '.' | '?' )
            if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='$')||this.input.LA(1)=='.'||this.input.LA(1)==':'||(this.input.LA(1)>='?' && this.input.LA(1)<='@')||this.input.LA(1)=='_'||this.input.LA(1)=='~' ) {
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
            // antlr/witty.g:55:17: ( '0' .. '9' )
            // antlr/witty.g:55:22: '0' .. '9'
            this.matchRange('0','9'); 



        }
        finally {
        }
    },
    // $ANTLR end DIGIT,

    // $ANTLR start LETTER
    mLETTER: function()  {
        try {
            // antlr/witty.g:56:17: ( 'a' .. 'z' | 'A' .. 'Z' )
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
            // antlr/witty.g:57:14: ( ( '\\r' )? '\\n' )
            // antlr/witty.g:57:16: ( '\\r' )? '\\n'
            // antlr/witty.g:57:16: ( '\\r' )?
            var alt9=2;
            var LA9_0 = this.input.LA(1);

            if ( (LA9_0=='\r') ) {
                alt9=1;
            }
            switch (alt9) {
                case 1 :
                    // antlr/witty.g:57:17: '\\r'
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
        // antlr/witty.g:1:8: ( T20 | T21 | T22 | STRING | ID | OPER | INNT | COMMENT | TERM | WS )
        var alt10=10;
        alt10 = this.dfa10.predict(this.input);
        switch (alt10) {
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
                // antlr/witty.g:1:22: STRING
                this.mSTRING(); 


                break;
            case 5 :
                // antlr/witty.g:1:29: ID
                this.mID(); 


                break;
            case 6 :
                // antlr/witty.g:1:32: OPER
                this.mOPER(); 


                break;
            case 7 :
                // antlr/witty.g:1:37: INNT
                this.mINNT(); 


                break;
            case 8 :
                // antlr/witty.g:1:42: COMMENT
                this.mCOMMENT(); 


                break;
            case 9 :
                // antlr/witty.g:1:50: TERM
                this.mTERM(); 


                break;
            case 10 :
                // antlr/witty.g:1:55: WS
                this.mWS(); 


                break;

        }

    },

    dummy: null
});

ANTLR.lang.augmentObject(wittyLexer, {
    DFA10_eotS:
        "\u0005\uffff\u0001\u0006\u0001\uffff\u0001\u0009\u0004\uffff\u0001"+
    "\u0006\u0001\u0009\u0001\uffff\u0001\u0009",
    DFA10_eofS:
        "\u0010\uffff",
    DFA10_minS:
        "\u0001\u0009\u0004\uffff\u0001\u0021\u0001\uffff\u0001\u002f\u0004"+
    "\uffff\u0001\u0021\u0001\u0000\u0001\uffff\u0001\u0000",
    DFA10_maxS:
        "\u0001\u007e\u0004\uffff\u0001\u007e\u0001\uffff\u0001\u002f\u0004"+
    "\uffff\u0001\u007e\u0001\ufffe\u0001\uffff\u0001\ufffe",
    DFA10_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\u0004\u0001"+
    "\uffff\u0001\u0005\u0001\uffff\u0001\u0007\u0001\u0006\u0001\u0009\u0001"+
    "\u000a\u0002\uffff\u0001\u0008\u0001\uffff",
    DFA10_specialS:
        "\u0010\uffff}>",
    DFA10_transitionS: [
            "\u0001\u000b\u0001\u000a\u0001\uffff\u0001\u000b\u0001\u000a"+
            "\u0012\uffff\u0001\u000b\u0001\u0005\u0001\u0004\u0002\u0005"+
            "\u0002\u0009\u0001\uffff\u0001\u0001\u0001\u0003\u0002\u0009"+
            "\u0001\u0002\u0001\u0009\u0001\u0005\u0001\u0007\u000a\u0008"+
            "\u0001\u0005\u0001\u000a\u0003\u0009\u0002\u0005\u001a\u0006"+
            "\u0001\uffff\u0001\u0009\u0001\uffff\u0001\u0009\u0001\u0005"+
            "\u0001\uffff\u001a\u0006\u0001\uffff\u0001\u0009\u0001\uffff"+
            "\u0001\u0005",
            "",
            "",
            "",
            "",
            "\u0001\u000c\u0001\uffff\u0004\u000c\u0003\uffff\u0002\u000c"+
            "\u0001\uffff\u0003\u000c\u000a\uffff\u0001\u000c\u0001\uffff"+
            "\u0005\u000c\u001b\uffff\u0001\u000c\u0001\uffff\u0002\u000c"+
            "\u001c\uffff\u0001\u000c\u0001\uffff\u0001\u000c",
            "",
            "\u0001\u000d",
            "",
            "",
            "",
            "",
            "\u0001\u000c\u0001\uffff\u0004\u000c\u0003\uffff\u0002\u000c"+
            "\u0001\uffff\u0003\u000c\u000a\uffff\u0001\u000c\u0001\uffff"+
            "\u0005\u000c\u001b\uffff\u0001\u000c\u0001\uffff\u0002\u000c"+
            "\u001c\uffff\u0001\u000c\u0001\uffff\u0001\u000c",
            "\u0021\u000e\u0001\u000f\u0001\u000e\u0004\u000f\u0003\u000e"+
            "\u0002\u000f\u0001\u000e\u0003\u000f\u000a\u000e\u0001\u000f"+
            "\u0001\u000e\u0005\u000f\u001b\u000e\u0001\u000f\u0001\u000e"+
            "\u0002\u000f\u001c\u000e\u0001\u000f\u0001\u000e\u0001\u000f"+
            "\uff80\u000e",
            "",
            "\u0021\u000e\u0001\u000f\u0001\u000e\u0004\u000f\u0003\u000e"+
            "\u0002\u000f\u0001\u000e\u0003\u000f\u000a\u000e\u0001\u000f"+
            "\u0001\u000e\u0005\u000f\u001b\u000e\u0001\u000f\u0001\u000e"+
            "\u0002\u000f\u001c\u000e\u0001\u000f\u0001\u000e\u0001\u000f"+
            "\uff80\u000e"
    ]
});
    
ANTLR.lang.augmentObject(wittyLexer, {
    DFA10_eot:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA10_eotS),
    DFA10_eof:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA10_eofS),
    DFA10_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyLexer.DFA10_minS),
    DFA10_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyLexer.DFA10_maxS),
    DFA10_accept:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA10_acceptS),
    DFA10_special:
        ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA10_specialS),
    DFA10_transition: (function() {
        var a = [],
            i,
            numStates = wittyLexer.DFA10_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(wittyLexer.DFA10_transitionS[i]));
        }
        return a;
    })()
});

wittyLexer.DFA10 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 10;
    this.eot = wittyLexer.DFA10_eot;
    this.eof = wittyLexer.DFA10_eof;
    this.min = wittyLexer.DFA10_min;
    this.max = wittyLexer.DFA10_max;
    this.accept = wittyLexer.DFA10_accept;
    this.special = wittyLexer.DFA10_special;
    this.transition = wittyLexer.DFA10_transition;
};

ANTLR.lang.extend(wittyLexer.DFA10, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( T20 | T21 | T22 | STRING | ID | OPER | INNT | COMMENT | TERM | WS );";
    },
    dummy: null
});
 
})();