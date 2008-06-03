// $ANTLR 3.0.1 lang.g 2008-06-02 21:18:56

var langLexer = function(input) {
    this.dfa7 = new langLexer.DFA7(this);
    langLexer.superclass.constructor.call(this, input);

};

(function(){
var HIDDEN = ANTLR.runtime.Token.HIDDEN_CHANNEL,
    EOF = ANTLR.runtime.Token.EOF;
ANTLR.lang.extend(langLexer, ANTLR.runtime.Lexer, {
    CR : 12,
    LETTER : 8,
    SL_COMMENTS : 13,
    T15 : 15,
    INT : 5,
    WS : 14,
    EOF : -1,
    STRING : 6,
    ESCAPE_SEQ : 11,
    T17 : 17,
    SYMBOLS : 9,
    Tokens : 18,
    T16 : 16,
    DIGIT : 10,
    TERM : 4,
    ID : 7,
    getGrammarFileName: function() { return "lang.g"; },

    // $ANTLR start T15
    mT15: function()  {
        try {
            this.type = this.T15;
            // lang.g:7:5: ( '(' )
            // lang.g:7:7: '('
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
            // lang.g:8:5: ( ',' )
            // lang.g:8:7: ','
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
            // lang.g:9:5: ( ')' )
            // lang.g:9:7: ')'
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
            // lang.g:18:11: ( ( LETTER | SYMBOLS ) ( LETTER | DIGIT | SYMBOLS )* )
            // lang.g:18:13: ( LETTER | SYMBOLS ) ( LETTER | DIGIT | SYMBOLS )*
            if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<='/')||this.input.LA(1)==':'||this.input.LA(1)=='='||(this.input.LA(1)>='?' && this.input.LA(1)<='Z')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='_')||(this.input.LA(1)>='a' && this.input.LA(1)<='z')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
                this.input.consume();

            }
            else {
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);    throw mse;
            }

            // lang.g:18:32: ( LETTER | DIGIT | SYMBOLS )*
            loop1:
            do {
                var alt1=2;
                var LA1_0 = this.input.LA(1);

                if ( (LA1_0=='!'||(LA1_0>='#' && LA1_0<='&')||(LA1_0>='*' && LA1_0<='+')||(LA1_0>='-' && LA1_0<=':')||LA1_0=='='||(LA1_0>='?' && LA1_0<='Z')||LA1_0=='\\'||(LA1_0>='^' && LA1_0<='_')||(LA1_0>='a' && LA1_0<='z')||LA1_0=='|'||LA1_0=='~') ) {
                    alt1=1;
                }


                switch (alt1) {
            	case 1 :
            	    // lang.g:
            	    if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<=':')||this.input.LA(1)=='='||(this.input.LA(1)>='?' && this.input.LA(1)<='Z')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='_')||(this.input.LA(1)>='a' && this.input.LA(1)<='z')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
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

    // $ANTLR start INT
    mINT: function()  {
        try {
            this.type = this.INT;
            // lang.g:19:11: ( ( DIGIT )+ )
            // lang.g:19:13: ( DIGIT )+
            // lang.g:19:13: ( DIGIT )+
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
            	    // lang.g:19:14: DIGIT
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
    // $ANTLR end INT,

    // $ANTLR start STRING
    mSTRING: function()  {
        try {
            this.type = this.STRING;
            // lang.g:20:11: ( '\"' ( ESCAPE_SEQ | ~ ( '\\\\' | '\"' ) )* '\"' )
            // lang.g:20:13: '\"' ( ESCAPE_SEQ | ~ ( '\\\\' | '\"' ) )* '\"'
            this.match('\"'); 
            // lang.g:20:17: ( ESCAPE_SEQ | ~ ( '\\\\' | '\"' ) )*
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
            	    // lang.g:20:19: ESCAPE_SEQ
            	    this.mESCAPE_SEQ(); 


            	    break;
            	case 2 :
            	    // lang.g:20:32: ~ ( '\\\\' | '\"' )
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
            // lang.g:21:11: ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) )
            // lang.g:21:13: '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' )
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
            // lang.g:24:7: ( ( '#' | '//' ) ( . )* CR )
            // lang.g:24:9: ( '#' | '//' ) ( . )* CR
            // lang.g:24:9: ( '#' | '//' )
            var alt4=2;
            var LA4_0 = this.input.LA(1);

            if ( (LA4_0=='#') ) {
                alt4=1;
            }
            else if ( (LA4_0=='/') ) {
                alt4=2;
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("24:9: ( '#' | '//' )", 4, 0, this.input);

                throw nvae;
            }
            switch (alt4) {
                case 1 :
                    // lang.g:24:10: '#'
                    this.match('#'); 


                    break;
                case 2 :
                    // lang.g:24:14: '//'
                    this.match("//"); 



                    break;

            }

            // lang.g:24:20: ( . )*
            loop5:
            do {
                var alt5=2;
                var LA5_0 = this.input.LA(1);

                if ( (LA5_0=='\n'||LA5_0=='\r') ) {
                    alt5=2;
                }
                else if ( ((LA5_0>='\u0000' && LA5_0<='\t')||(LA5_0>='\u000B' && LA5_0<='\f')||(LA5_0>='\u000E' && LA5_0<='\uFFFE')) ) {
                    alt5=1;
                }


                switch (alt5) {
            	case 1 :
            	    // lang.g:24:20: .
            	    this.matchAny(); 


            	    break;

            	default :
            	    break loop5;
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
            // lang.g:25:7: ( ( CR | WS | ';' )+ )
            // lang.g:25:9: ( CR | WS | ';' )+
            // lang.g:25:9: ( CR | WS | ';' )+
            var cnt6=0;
            loop6:
            do {
                var alt6=2;
                var LA6_0 = this.input.LA(1);

                if ( ((LA6_0>='\t' && LA6_0<='\n')||LA6_0=='\r'||LA6_0==' '||LA6_0==';') ) {
                    alt6=1;
                }


                switch (alt6) {
            	case 1 :
            	    // lang.g:
            	    if ( (this.input.LA(1)>='\t' && this.input.LA(1)<='\n')||this.input.LA(1)=='\r'||this.input.LA(1)==' '||this.input.LA(1)==';' ) {
            	        this.input.consume();

            	    }
            	    else {
            	        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
            	        this.recover(mse);    throw mse;
            	    }



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

    // $ANTLR start SYMBOLS
    mSYMBOLS: function()  {
        try {
            // lang.g:27:21: ( ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' ) )
            // lang.g:27:23: ( '_' | '-' | '~' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '*' | '+' | '=' | '|' | '\\\\' | ':' | '.' | '?' | '/' )
            if ( this.input.LA(1)=='!'||(this.input.LA(1)>='#' && this.input.LA(1)<='&')||(this.input.LA(1)>='*' && this.input.LA(1)<='+')||(this.input.LA(1)>='-' && this.input.LA(1)<='/')||this.input.LA(1)==':'||this.input.LA(1)=='='||(this.input.LA(1)>='?' && this.input.LA(1)<='@')||this.input.LA(1)=='\\'||(this.input.LA(1)>='^' && this.input.LA(1)<='_')||this.input.LA(1)=='|'||this.input.LA(1)=='~' ) {
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
            // lang.g:29:14: ( ( '\\r' | '\\n' ) )
            // lang.g:29:16: ( '\\r' | '\\n' )
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
            // lang.g:30:14: ( ( ' ' | '\\t' ) )
            // lang.g:30:16: ( ' ' | '\\t' )
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
            // lang.g:31:17: ( '0' .. '9' )
            // lang.g:31:22: '0' .. '9'
            this.matchRange('0','9'); 



        }
        finally {
        }
    },
    // $ANTLR end DIGIT,

    // $ANTLR start LETTER
    mLETTER: function()  {
        try {
            // lang.g:32:17: ( 'a' .. 'z' | 'A' .. 'Z' )
            // lang.g:
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
        // lang.g:1:8: ( T15 | T16 | T17 | ID | INT | STRING | ESCAPE_SEQ | SL_COMMENTS | TERM )
        var alt7=9;
        alt7 = this.dfa7.predict(this.input);
        switch (alt7) {
            case 1 :
                // lang.g:1:10: T15
                this.mT15(); 


                break;
            case 2 :
                // lang.g:1:14: T16
                this.mT16(); 


                break;
            case 3 :
                // lang.g:1:18: T17
                this.mT17(); 


                break;
            case 4 :
                // lang.g:1:22: ID
                this.mID(); 


                break;
            case 5 :
                // lang.g:1:25: INT
                this.mINT(); 


                break;
            case 6 :
                // lang.g:1:29: STRING
                this.mSTRING(); 


                break;
            case 7 :
                // lang.g:1:36: ESCAPE_SEQ
                this.mESCAPE_SEQ(); 


                break;
            case 8 :
                // lang.g:1:47: SL_COMMENTS
                this.mSL_COMMENTS(); 


                break;
            case 9 :
                // lang.g:1:59: TERM
                this.mTERM(); 


                break;

        }

    },

    dummy: null
});

ANTLR.lang.augmentObject(langLexer, {
    DFA7_eotS:
        "\u0004\uffff\u0001\u0009\u0002\uffff\u0002\u0009\u0005\uffff\u0002"+
    "\u0009",
    DFA7_eofS:
        "\u0010\uffff",
    DFA7_minS:
        "\u0001\u0009\u0003\uffff\u0001\u0022\u0002\uffff\u0001\u0000\u0001"+
    "\u002f\u0005\uffff\u0002\u0000",
    DFA7_maxS:
        "\u0001\u007e\u0003\uffff\u0001\u0074\u0002\uffff\u0001\ufffe\u0001"+
    "\u002f\u0005\uffff\u0002\ufffe",
    DFA7_acceptS:
        "\u0001\uffff\u0001\u0001\u0001\u0002\u0001\u0003\u0001\uffff\u0001"+
    "\u0005\u0001\u0006\u0002\uffff\u0001\u0004\u0001\u0009\u0001\u0004\u0001"+
    "\u0007\u0001\u0008\u0002\uffff",
    DFA7_specialS:
        "\u0010\uffff}>",
    DFA7_transitionS: [
            "\u0002\u000a\u0002\uffff\u0001\u000a\u0012\uffff\u0001\u000a"+
            "\u0001\u0009\u0001\u0006\u0001\u0007\u0003\u0009\u0001\uffff"+
            "\u0001\u0001\u0001\u0003\u0002\u0009\u0001\u0002\u0002\u0009"+
            "\u0001\u0008\u000a\u0005\u0001\u0009\u0001\u000a\u0001\uffff"+
            "\u0001\u0009\u0001\uffff\u001c\u0009\u0001\uffff\u0001\u0004"+
            "\u0001\uffff\u0002\u0009\u0001\uffff\u001a\u0009\u0001\uffff"+
            "\u0001\u0009\u0001\uffff\u0001\u0009",
            "",
            "",
            "",
            "\u0001\u000c\u0004\uffff\u0001\u000c\u0034\uffff\u0001\u000b"+
            "\u0005\uffff\u0001\u000b\u0003\uffff\u0001\u000b\u0007\uffff"+
            "\u0001\u000b\u0003\uffff\u0001\u000b\u0001\uffff\u0001\u000b",
            "",
            "",
            "\u0021\u000d\u0001\u000e\u0001\u000d\u0004\u000e\u0003\u000d"+
            "\u0002\u000e\u0001\u000d\u000e\u000e\u0002\u000d\u0001\u000e"+
            "\u0001\u000d\u001c\u000e\u0001\u000d\u0001\u000e\u0001\u000d"+
            "\u0002\u000e\u0001\u000d\u001a\u000e\u0001\u000d\u0001\u000e"+
            "\u0001\u000d\u0001\u000e\uff80\u000d",
            "\u0001\u000f",
            "",
            "",
            "",
            "",
            "",
            "\u0021\u000d\u0001\u000e\u0001\u000d\u0004\u000e\u0003\u000d"+
            "\u0002\u000e\u0001\u000d\u000e\u000e\u0002\u000d\u0001\u000e"+
            "\u0001\u000d\u001c\u000e\u0001\u000d\u0001\u000e\u0001\u000d"+
            "\u0002\u000e\u0001\u000d\u001a\u000e\u0001\u000d\u0001\u000e"+
            "\u0001\u000d\u0001\u000e\uff80\u000d",
            "\u0021\u000d\u0001\u000e\u0001\u000d\u0004\u000e\u0003\u000d"+
            "\u0002\u000e\u0001\u000d\u000e\u000e\u0002\u000d\u0001\u000e"+
            "\u0001\u000d\u001c\u000e\u0001\u000d\u0001\u000e\u0001\u000d"+
            "\u0002\u000e\u0001\u000d\u001a\u000e\u0001\u000d\u0001\u000e"+
            "\u0001\u000d\u0001\u000e\uff80\u000d"
    ]
});
    
ANTLR.lang.augmentObject(langLexer, {
    DFA7_eot:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA7_eotS),
    DFA7_eof:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA7_eofS),
    DFA7_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(langLexer.DFA7_minS),
    DFA7_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(langLexer.DFA7_maxS),
    DFA7_accept:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA7_acceptS),
    DFA7_special:
        ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA7_specialS),
    DFA7_transition: (function() {
        var a = [],
            i,
            numStates = langLexer.DFA7_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(langLexer.DFA7_transitionS[i]));
        }
        return a;
    })()
});

langLexer.DFA7 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 7;
    this.eot = langLexer.DFA7_eot;
    this.eof = langLexer.DFA7_eof;
    this.min = langLexer.DFA7_min;
    this.max = langLexer.DFA7_max;
    this.accept = langLexer.DFA7_accept;
    this.special = langLexer.DFA7_special;
    this.transition = langLexer.DFA7_transition;
};

ANTLR.lang.extend(langLexer.DFA7, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( T15 | T16 | T17 | ID | INT | STRING | ESCAPE_SEQ | SL_COMMENTS | TERM );";
    },
    dummy: null
});
 
})();