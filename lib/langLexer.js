// $ANTLR 3.0.1 antlr/lang.g 2008-06-21 22:05:58

var langLexer = function(input) {
    this.dfa6 = new langLexer.DFA6(this);
    langLexer.superclass.constructor.call(this, input);

};

(function(){
var HIDDEN = ANTLR.runtime.Token.HIDDEN_CHANNEL,
    EOF = ANTLR.runtime.Token.EOF;
ANTLR.lang.extend(langLexer, ANTLR.runtime.Lexer, {
    TERM : 4,
    SL_COMMENTS : 13,
    WS : 14,
    LETTER : 8,
    INNT : 5,
    ESCAPE_SEQ : 11,
    DIGIT : 10,
    SYMBOLS : 9,
    T15 : 15,
    ID : 7,
    Tokens : 18,
    T16 : 16,
    CR : 12,
    EOF : -1,
    T17 : 17,
    STRING : 6,
    getGrammarFileName: function() { return "antlr/lang.g"; },

    // $ANTLR start T15
    mT15: function()  {
        try {
            this.type = this.T15;
            // antlr/lang.g:7:5: ( '(' )
            // antlr/lang.g:7:7: '('
            this.match('('); 



        }
        finally {
        }
    },
    // $ANTLR end T15,

    // $ANTLR start T16
    mT16: function()  {
        try {
            this.type = this.T16;
            // antlr/lang.g:8:5: ( ',' )
            // antlr/lang.g:8:7: ','
            this.match(','); 



        }
        finally {
        }
    },
    // $ANTLR end T16,

    // $ANTLR start T17
    mT17: function()  {
        try {
            this.type = this.T17;
            // antlr/lang.g:9:5: ( ')' )
            // antlr/lang.g:9:7: ')'
            this.match(')'); 



        }
        finally {
        }
    },
    // $ANTLR end T17,

    // $ANTLR start ID
    mID: function()  {
        try {
            this.type = this.ID;
            // antlr/lang.g:19:11: ( ( LETTER | SYMBOLS ) ( LETTER | DIGIT | SYMBOLS )* )
            // antlr/lang.g:19:13: ( LETTER | SYMBOLS ) ( LETTER | DIGIT | SYMBOLS )*
            if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<='/')||this.input.LA(1)==':'||(this.input.LA(1)>='<' && this.input.LA(1)<='Z')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='_')||(this.input.LA(1)>='a' && this.input.LA(1)<='z')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }

            // antlr/lang.g:19:32: ( LETTER | DIGIT | SYMBOLS )*
            loop1:
            do {
                var alt1=2;
                var LA1_0 = this.input.LA(1);

                if ( (LA1_0=='!'||(LA1_0>='#' && LA1_0<='&')||(LA1_0>='*' && LA1_0<='+')||(LA1_0>='-' && LA1_0<=':')||(LA1_0>='<' && LA1_0<='Z')||LA1_0=='\\'||(LA1_0>='^' && LA1_0<='_')||(LA1_0>='a' && LA1_0<='z')||LA1_0=='|'||LA1_0=='~') ) {
                    alt1=1;
                }


                switch (alt1) {
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
            	    break loop1;
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
            // antlr/lang.g:20:11: ( ( DIGIT )+ )
            // antlr/lang.g:20:13: ( DIGIT )+
            // antlr/lang.g:20:13: ( DIGIT )+
            var cnt2=0;
            loop2:
            do {
                var alt2=2;
                var LA2_0 = this.input.LA(1);

                if ( ((LA2_0>='0' && LA2_0<='9')) ) {
                    alt2=1;
                }


                switch (alt2) {
            	case 1 :
            	    // antlr/lang.g:20:14: DIGIT
            	    this.mDIGIT(); 


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




        }
        finally {
        }
    },
    // $ANTLR end INNT,

    // $ANTLR start STRING
    mSTRING: function()  {
        try {
            this.type = this.STRING;
            // antlr/lang.g:21:11: ( '\"' ( ESCAPE_SEQ | ~ ( '\\\\' | '\"' ) )* '\"' )
            // antlr/lang.g:21:13: '\"' ( ESCAPE_SEQ | ~ ( '\\\\' | '\"' ) )* '\"'
            this.match('\"'); 
            // antlr/lang.g:21:17: ( ESCAPE_SEQ | ~ ( '\\\\' | '\"' ) )*
            loop3:
            do {
                var alt3=3;
                var LA3_0 = this.input.LA(1);

                if ( (LA3_0=='\\') ) {
                    alt3=1;
                }
                else if ( ((LA3_0>='\u0000' && LA3_0<='!')||(LA3_0>='#' && LA3_0<='[')||(LA3_0>=']' && LA3_0<='\uFFFE')) ) {
                    alt3=2;
                }


                switch (alt3) {
            	case 1 :
            	    // antlr/lang.g:21:19: ESCAPE_SEQ
            	    this.mESCAPE_SEQ(); 


            	    break;
            	case 2 :
            	    // antlr/lang.g:21:32: ~ ( '\\\\' | '\"' )
            	    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='!')||(this.input.LA(1)>='#' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\uFFFE') ) {
            	        this.input.consume();

            	    }
            	    else {
            	        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
            	        this.recover(mse);    throw mse;
            	    }



            	    break;

            	default :
            	    break loop3;
                }
            } while (true);

            this.match('\"'); 



        }
        finally {
        }
    },
    // $ANTLR end STRING,

    // $ANTLR start ESCAPE_SEQ
    mESCAPE_SEQ: function()  {
        try {
            this.type = this.ESCAPE_SEQ;
            // antlr/lang.g:22:11: ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) )
            // antlr/lang.g:22:13: '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' )
            this.match('\\'); 
            if ( this.input.LA(1)=='\"'||this.input.LA(1)=='\''||this.input.LA(1)=='\\'||this.input.LA(1)=='b'||this.input.LA(1)=='f'||this.input.LA(1)=='n'||this.input.LA(1)=='r'||this.input.LA(1)=='t' ) {
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
    // $ANTLR end ESCAPE_SEQ,

    // $ANTLR start SL_COMMENTS
    mSL_COMMENTS: function()  {
        try {
            this.type = this.SL_COMMENTS;
            // antlr/lang.g:25:7: ( ( '//' ) ( . )* CR )
            // antlr/lang.g:25:9: ( '//' ) ( . )* CR
            // antlr/lang.g:25:9: ( '//' )
            // antlr/lang.g:25:10: '//'
            this.match("//"); 




            // antlr/lang.g:25:16: ( . )*
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
            	    // antlr/lang.g:25:16: .
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
            // antlr/lang.g:26:7: ( ( CR | WS | ';' )+ )
            // antlr/lang.g:26:9: ( CR | WS | ';' )+
            // antlr/lang.g:26:9: ( CR | WS | ';' )+
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

    // $ANTLR start SYMBOLS
    mSYMBOLS: function()  {
        try {
            // antlr/lang.g:28:21: ( ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' ) )
            // antlr/lang.g:28:23: ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '<' | '>' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' )
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
            // antlr/lang.g:30:14: ( ( '\\r' | '\\n' ) )
            // antlr/lang.g:30:16: ( '\\r' | '\\n' )
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
            // antlr/lang.g:31:14: ( ( ' ' | '\\t' ) )
            // antlr/lang.g:31:16: ( ' ' | '\\t' )
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
            // antlr/lang.g:32:17: ( '0' .. '9' )
            // antlr/lang.g:32:22: '0' .. '9'
            this.matchRange('0','9'); 



        }
        finally {
        }
    },
    // $ANTLR end DIGIT,

    // $ANTLR start LETTER
    mLETTER: function()  {
        try {
            // antlr/lang.g:33:17: ( 'a' .. 'z' | 'A' .. 'Z' )
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

    mTokens: function() {
        // antlr/lang.g:1:8: ( T15 | T16 | T17 | ID | INNT | STRING | ESCAPE_SEQ | SL_COMMENTS | TERM )
        var alt6=9;
        alt6 = this.dfa6.predict(this.input);
        switch (alt6) {
            case 1 :
                // antlr/lang.g:1:10: T15
                this.mT15(); 


                break;
            case 2 :
                // antlr/lang.g:1:14: T16
                this.mT16(); 


                break;
            case 3 :
                // antlr/lang.g:1:18: T17
                this.mT17(); 


                break;
            case 4 :
                // antlr/lang.g:1:22: ID
                this.mID(); 


                break;
            case 5 :
                // antlr/lang.g:1:25: INNT
                this.mINNT(); 


                break;
            case 6 :
                // antlr/lang.g:1:30: STRING
                this.mSTRING(); 


                break;
            case 7 :
                // antlr/lang.g:1:37: ESCAPE_SEQ
                this.mESCAPE_SEQ(); 


                break;
            case 8 :
                // antlr/lang.g:1:48: SL_COMMENTS
                this.mSL_COMMENTS(); 


                break;
            case 9 :
                // antlr/lang.g:1:60: TERM
                this.mTERM(); 


                break;

        }

    },

    dummy: null
});

ANTLR.lang.augmentObject(langLexer, {
    DFA6_eotS:
        "\u0004\uffff\u0001\u0008\u0002\uffff\u0001\u0008\u0004\uffff\u0001"+
    "\u0008\u0001\uffff\u0001\u0008",
    DFA6_eofS:
        "\u000f\uffff",
    DFA6_minS:
        "\u0001\u0009\u0003\uffff\u0001\u0022\u0002\uffff\u0001\u002f\u0004"+
    "\uffff\u0001\u0000\u0001\uffff\u0001\u0000",
    DFA6_maxS:
        "\u0001\u007e\u0003\uffff\u0001\u0074\u0002\uffff\u0001\u002f\u0004"+
    "\uffff\u0001\ufffe\u0001\uffff\u0001\ufffe",
    DFA6_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\uffff\u0001"+
    "\u0005\u0001\u0006\u0001\uffff\u0001\u0004\u0001\u0009\u0001\u0004\u0001"+
    "\u0007\u0001\uffff\u0001\u0008\u0001\uffff",
    DFA6_specialS:
        "\u000f\uffff}>",
    DFA6_transitionS: [
            "\u0002\u0009\u0002\uffff\u0001\u0009\u0012\uffff\u0001\u0009"+
            "\u0001\u0008\u0001\u0006\u0004\u0008\u0001\uffff\u0001\u0001"+
            "\u0001\u0003\u0002\u0008\u0001\u0002\u0002\u0008\u0001\u0007"+
            "\u000a\u0005\u0001\u0008\u0001\u0009\u001f\u0008\u0001\uffff"+
            "\u0001\u0004\u0001\uffff\u0002\u0008\u0001\uffff\u001a\u0008"+
            "\u0001\uffff\u0001\u0008\u0001\uffff\u0001\u0008",
            "",
            "",
            "",
            "\u0001\u000b\u0004\uffff\u0001\u000b\u0034\uffff\u0001\u000a"+
            "\u0005\uffff\u0001\u000a\u0003\uffff\u0001\u000a\u0007\uffff"+
            "\u0001\u000a\u0003\uffff\u0001\u000a\u0001\uffff\u0001\u000a",
            "",
            "",
            "\u0001\u000c",
            "",
            "",
            "",
            "",
            "\u0021\u000d\u0001\u000e\u0001\u000d\u0004\u000e\u0003\u000d"+
            "\u0002\u000e\u0001\u000d\u000e\u000e\u0001\u000d\u001f\u000e"+
            "\u0001\u000d\u0001\u000e\u0001\u000d\u0002\u000e\u0001\u000d"+
            "\u001a\u000e\u0001\u000d\u0001\u000e\u0001\u000d\u0001\u000e"+
            "\uff80\u000d",
            "",
            "\u0021\u000d\u0001\u000e\u0001\u000d\u0004\u000e\u0003\u000d"+
            "\u0002\u000e\u0001\u000d\u000e\u000e\u0001\u000d\u001f\u000e"+
            "\u0001\u000d\u0001\u000e\u0001\u000d\u0002\u000e\u0001\u000d"+
            "\u001a\u000e\u0001\u000d\u0001\u000e\u0001\u000d\u0001\u000e"+
            "\uff80\u000d"
    ]
});
    
ANTLR.lang.augmentObject(langLexer, {
    DFA6_eot:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA6_eotS),
    DFA6_eof:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA6_eofS),
    DFA6_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(langLexer.DFA6_minS),
    DFA6_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(langLexer.DFA6_maxS),
    DFA6_accept:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA6_acceptS),
    DFA6_special:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA6_specialS),
    DFA6_transition: (function() {
        var a = [],
            i,
            numStates = langLexer.DFA6_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA6_transitionS[i]));
        }
        return a;
    })()
});

langLexer.DFA6 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 6;
    this.eot = langLexer.DFA6_eot;
    this.eof = langLexer.DFA6_eof;
    this.min = langLexer.DFA6_min;
    this.max = langLexer.DFA6_max;
    this.accept = langLexer.DFA6_accept;
    this.special = langLexer.DFA6_special;
    this.transition = langLexer.DFA6_transition;
};

ANTLR.lang.extend(langLexer.DFA6, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( T15 | T16 | T17 | ID | INNT | STRING | ESCAPE_SEQ | SL_COMMENTS | TERM );";
    },
    dummy: null
});
 
})();