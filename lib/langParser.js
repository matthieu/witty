// $ANTLR 3.0.1 antlr/lang.g 2008-06-25 20:52:38

var langParser = function(input) {
    langParser.superclass.constructor.call(this, input);

    this.dfa6 = new langParser.DFA6(this);
    /* @todo only create adaptor if output=AST */
    this.adaptor = new ANTLR.runtime.tree.CommonTreeAdaptor();

};

(function(){
// public class variables
var TERM= 4,
    SL_COMMENTS= 14,
    ESC_SEQ= 9,
    WS= 5,
    LETTER= 10,
    INNT= 6,
    UNICODE_ESC= 15,
    OCTAL_ESC= 16,
    HEX_DIG= 17,
    DIGIT= 12,
    SYMBOLS= 11,
    ID= 8,
    CR= 13,
    EOF= -1,
    STRING= 7;

// public instance methods/vars
ANTLR.lang.extend(langParser, ANTLR.runtime.Parser, {
        

    getTokenNames: function() { return langParser.tokenNames; },
    getGrammarFileName: function() { return "antlr/lang.g"; },


    // antlr/lang.g:6:1: block returns [Object value] : ( TERM )? s= stmt ( TERM s= stmt )* ( TERM )? ;
    // $ANTLR start block
    block: function() {
        var value = null;

         var s = null;

        try {
            // antlr/lang.g:6:31: ( ( TERM )? s= stmt ( TERM s= stmt )* ( TERM )? )
            // antlr/lang.g:6:35: ( TERM )? s= stmt ( TERM s= stmt )* ( TERM )?
            // antlr/lang.g:6:35: ( TERM )?
            var alt1=2;
            var LA1_0 = this.input.LA(1);

            if ( (LA1_0==TERM) ) {
                alt1=1;
            }
            switch (alt1) {
                case 1 :
                    // antlr/lang.g:6:35: TERM
                    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block28); 


                    break;

            }

            this.pushFollow(langParser.FOLLOW_stmt_in_block33);
            var s = this.stmt();
            this._fsp--;

             value = s; 
            // antlr/lang.g:7:36: ( TERM s= stmt )*
            loop2:
            do {
                var alt2=2;
                var LA2_0 = this.input.LA(1);

                if ( (LA2_0==TERM) ) {
                    var LA2_1 = this.input.LA(2);

                    if ( ((LA2_1>=WS && LA2_1<=ID)||LA2_1==18) ) {
                        alt2=1;
                    }


                }


                switch (alt2) {
            	case 1 :
            	    // antlr/lang.g:7:37: TERM s= stmt
            	    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block74); 
            	    this.pushFollow(langParser.FOLLOW_stmt_in_block78);
            	    var s = this.stmt();
            	    this._fsp--;

            	     if (value.sntx != 'B') { value = [value, s]; value.sntx = 'B'; }
            	                                                      else value.push(s) 


            	    break;

            	default :
            	    break loop2;
                }
            } while (true);

            // antlr/lang.g:8:82: ( TERM )?
            var alt3=2;
            var LA3_0 = this.input.LA(1);

            if ( (LA3_0==TERM) ) {
                alt3=1;
            }
            switch (alt3) {
                case 1 :
                    // antlr/lang.g:8:82: TERM
                    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block84); 


                    break;

            }




        }
        catch (re) {
            if (re instanceof ANTLR.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return value;
    },


    // antlr/lang.g:10:1: stmt returns [Object value] : ( WS )* e= exp ( ( WS )+ e= exp )* ( WS )* ;
    // $ANTLR start stmt
    stmt: function() {
        var value = null;

         var e = null;

        try {
            // antlr/lang.g:10:31: ( ( WS )* e= exp ( ( WS )+ e= exp )* ( WS )* )
            // antlr/lang.g:10:34: ( WS )* e= exp ( ( WS )+ e= exp )* ( WS )*
            // antlr/lang.g:10:34: ( WS )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0==WS) ) {
                    alt4=1;
                }


                switch (alt4) {
            	case 1 :
            	    // antlr/lang.g:10:34: WS
            	    this.match(this.input,WS,langParser.FOLLOW_WS_in_stmt100); 


            	    break;

            	default :
            	    break loop4;
                }
            } while (true);

            this.pushFollow(langParser.FOLLOW_exp_in_stmt105);
            var e = this.exp();
            this._fsp--;

             value = e; 
            // antlr/lang.g:11:35: ( ( WS )+ e= exp )*
            loop6:
            do {
                var alt6=2;
                alt6 = this.dfa6.predict(this.input);
                switch (alt6) {
            	case 1 :
            	    // antlr/lang.g:11:36: ( WS )+ e= exp
            	    // antlr/lang.g:11:36: ( WS )+
            	    var cnt5=0;
            	    loop5:
            	    do {
            	        var alt5=2;
            	        var LA5_0 = this.input.LA(1);

            	        if ( (LA5_0==WS) ) {
            	            alt5=1;
            	        }


            	        switch (alt5) {
            	    	case 1 :
            	    	    // antlr/lang.g:11:36: WS
            	    	    this.match(this.input,WS,langParser.FOLLOW_WS_in_stmt144); 


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

            	    this.pushFollow(langParser.FOLLOW_exp_in_stmt149);
            	    var e = this.exp();
            	    this._fsp--;

            	     if (value.sntx != 'B') { value = [value, e]; value.sntx = 'B'; }
            	                                                   else value.push(e); 


            	    break;

            	default :
            	    break loop6;
                }
            } while (true);

            // antlr/lang.g:12:81: ( WS )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0==WS) ) {
                    alt7=1;
                }


                switch (alt7) {
            	case 1 :
            	    // antlr/lang.g:12:81: WS
            	    this.match(this.input,WS,langParser.FOLLOW_WS_in_stmt156); 


            	    break;

            	default :
            	    break loop7;
                }
            } while (true);




        }
        catch (re) {
            if (re instanceof ANTLR.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return value;
    },


    // antlr/lang.g:14:1: exp returns [Object value] : ( symb ( list )* | list );
    // $ANTLR start exp
    exp: function() {
        var value = null;

         var symb1 = null;
         var list2 = null;
         var list3 = null;

        try {
            // antlr/lang.g:14:31: ( symb ( list )* | list )
            var alt9=2;
            var LA9_0 = this.input.LA(1);

            if ( ((LA9_0>=INNT && LA9_0<=ID)) ) {
                alt9=1;
            }
            else if ( (LA9_0==18) ) {
                alt9=2;
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("14:1: exp returns [Object value] : ( symb ( list )* | list );", 9, 0, this.input);

                throw nvae;
            }
            switch (alt9) {
                case 1 :
                    // antlr/lang.g:14:35: symb ( list )*
                    this.pushFollow(langParser.FOLLOW_symb_in_exp174);
                    var symb1 = this.symb();
                    this._fsp--;

                     value = symb1;
                    // antlr/lang.g:15:35: ( list )*
                    loop8:
                    do {
                        var alt8=2;
                        var LA8_0 = this.input.LA(1);

                        if ( (LA8_0==18) ) {
                            alt8=1;
                        }


                        switch (alt8) {
                    	case 1 :
                    	    // antlr/lang.g:15:36: list
                    	    this.pushFollow(langParser.FOLLOW_list_in_exp214);
                    	    var list2 = this.list();
                    	    this._fsp--;

                    	     value = [value, list2]; value.sntx = 'A' 


                    	    break;

                    	default :
                    	    break loop8;
                        }
                    } while (true);



                    break;
                case 2 :
                    // antlr/lang.g:16:39: list
                    this.pushFollow(langParser.FOLLOW_list_in_exp258);
                    var list3 = this.list();
                    this._fsp--;

                     value = list3; 


                    break;

            }
        }
        catch (re) {
            if (re instanceof ANTLR.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return value;
    },


    // antlr/lang.g:17:1: list returns [Array value] : '(' (b= block )? ( ',' b= block )* ')' ;
    // $ANTLR start list
    list: function() {
        var value = null;

         var b = null;

        try {
            // antlr/lang.g:17:31: ( '(' (b= block )? ( ',' b= block )* ')' )
            // antlr/lang.g:17:35: '(' (b= block )? ( ',' b= block )* ')'
            this.match(this.input,18,langParser.FOLLOW_18_in_list276); 
            // antlr/lang.g:17:40: (b= block )?
            var alt10=2;
            var LA10_0 = this.input.LA(1);

            if ( ((LA10_0>=TERM && LA10_0<=ID)||LA10_0==18) ) {
                alt10=1;
            }
            switch (alt10) {
                case 1 :
                    // antlr/lang.g:17:40: b= block
                    this.pushFollow(langParser.FOLLOW_block_in_list280);
                    var b = this.block();
                    this._fsp--;



                    break;

            }

             if (b) value = [b]; else value = []; value.sntx = 'L'; 
            // antlr/lang.g:18:37: ( ',' b= block )*
            loop11:
            do {
                var alt11=2;
                var LA11_0 = this.input.LA(1);

                if ( (LA11_0==19) ) {
                    alt11=1;
                }


                switch (alt11) {
            	case 1 :
            	    // antlr/lang.g:18:38: ',' b= block
            	    this.match(this.input,19,langParser.FOLLOW_19_in_list323); 
            	    this.pushFollow(langParser.FOLLOW_block_in_list327);
            	    var b = this.block();
            	    this._fsp--;

            	     value.push(b); 


            	    break;

            	default :
            	    break loop11;
                }
            } while (true);

            this.match(this.input,20,langParser.FOLLOW_20_in_list334); 



        }
        catch (re) {
            if (re instanceof ANTLR.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return value;
    },


    // antlr/lang.g:19:1: symb returns [Object value] : ( innt | string | id );
    // $ANTLR start symb
    symb: function() {
        var value = null;

         var innt4 = 0;
         var string5 = null;
         var id6 = null;

        try {
            // antlr/lang.g:19:31: ( innt | string | id )
            var alt12=3;
            switch ( this.input.LA(1) ) {
            case INNT:
                alt12=1;
                break;
            case STRING:
                alt12=2;
                break;
            case ID:
                alt12=3;
                break;
            default:
                var nvae =
                    new ANTLR.runtime.NoViableAltException("19:1: symb returns [Object value] : ( innt | string | id );", 12, 0, this.input);

                throw nvae;
            }

            switch (alt12) {
                case 1 :
                    // antlr/lang.g:19:35: innt
                    this.pushFollow(langParser.FOLLOW_innt_in_symb349);
                    var innt4 = this.innt();
                    this._fsp--;

                     value = innt4; 


                    break;
                case 2 :
                    // antlr/lang.g:19:68: string
                    this.pushFollow(langParser.FOLLOW_string_in_symb355);
                    var string5 = this.string();
                    this._fsp--;

                     value = string5; 


                    break;
                case 3 :
                    // antlr/lang.g:19:105: id
                    this.pushFollow(langParser.FOLLOW_id_in_symb361);
                    var id6 = this.id();
                    this._fsp--;

                     value = id6; 


                    break;

            }
        }
        catch (re) {
            if (re instanceof ANTLR.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return value;
    },


    // antlr/lang.g:20:1: innt returns [int value] : INNT ;
    // $ANTLR start innt
    innt: function() {
        var value = null;

        var INNT7 = null;

        try {
            // antlr/lang.g:20:31: ( INNT )
            // antlr/lang.g:20:35: INNT
            INNT7=this.input.LT(1);
            this.match(this.input,INNT,langParser.FOLLOW_INNT_in_innt381); 
             value = INNT7.getText(); 



        }
        catch (re) {
            if (re instanceof ANTLR.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return value;
    },


    // antlr/lang.g:21:1: string returns [String value] : STRING ;
    // $ANTLR start string
    string: function() {
        var value = null;

        var STRING8 = null;

        try {
            // antlr/lang.g:21:31: ( STRING )
            // antlr/lang.g:21:35: STRING
            STRING8=this.input.LT(1);
            this.match(this.input,STRING,langParser.FOLLOW_STRING_in_string396); 
             value = STRING8.getText(); 



        }
        catch (re) {
            if (re instanceof ANTLR.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return value;
    },


    // antlr/lang.g:22:1: id returns [String value] : ID ;
    // $ANTLR start id
    id: function() {
        var value = null;

        var ID9 = null;

        try {
            // antlr/lang.g:22:31: ( ID )
            // antlr/lang.g:22:35: ID
            ID9=this.input.LT(1);
            this.match(this.input,ID,langParser.FOLLOW_ID_in_id415); 
             value = ID9.getText(); 



        }
        catch (re) {
            if (re instanceof ANTLR.runtime.RecognitionException) {
                this.reportError(re);
                this.recover(this.input,re);
            } else {
                throw re;
            }
        }
        finally {
        }
        return value;
    }

});

ANTLR.lang.augmentObject(langParser, {
    DFA6_eotS:
        "\u0004\uffff",
    DFA6_eofS:
        "\u0004\uffff",
    DFA6_minS:
        "\u0002\u0004\u0002\uffff",
    DFA6_maxS:
        "\u0002\u0014\u0002\uffff",
    DFA6_acceptS:
        "\u0002\uffff\u0001\u0002\u0001\u0001",
    DFA6_specialS:
        "\u0004\uffff}>",
    DFA6_transitionS: [
            "\u0001\u0002\u0001\u0001\u000d\uffff\u0002\u0002",
            "\u0001\u0002\u0001\u0001\u0003\u0003\u0009\uffff\u0001\u0003"+
            "\u0002\u0002",
            "",
            ""
    ]
});
    
ANTLR.lang.augmentObject(langParser, {
    DFA6_eot:
        ANTLR.runtime.DFA.unpackEncodedString(langParser.DFA6_eotS),
    DFA6_eof:
        ANTLR.runtime.DFA.unpackEncodedString(langParser.DFA6_eofS),
    DFA6_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(langParser.DFA6_minS),
    DFA6_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(langParser.DFA6_maxS),
    DFA6_accept:
        ANTLR.runtime.DFA.unpackEncodedString(langParser.DFA6_acceptS),
    DFA6_special:
        ANTLR.runtime.DFA.unpackEncodedString(langParser.DFA6_specialS),
    DFA6_transition: (function() {
        var a = [],
            i,
            numStates = langParser.DFA6_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(langParser.DFA6_transitionS[i]));
        }
        return a;
    })()
});

langParser.DFA6 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 6;
    this.eot = langParser.DFA6_eot;
    this.eof = langParser.DFA6_eof;
    this.min = langParser.DFA6_min;
    this.max = langParser.DFA6_max;
    this.accept = langParser.DFA6_accept;
    this.special = langParser.DFA6_special;
    this.transition = langParser.DFA6_transition;
};

ANTLR.lang.extend(langParser.DFA6, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "()* loopback of 11:35: ( ( WS )+ e= exp )*";
    },
    dummy: null
});
 

// public class variables
ANTLR.lang.augmentObject(langParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "WS", "INNT", "STRING", "ID", "ESC_SEQ", "LETTER", "SYMBOLS", "DIGIT", "CR", "SL_COMMENTS", "UNICODE_ESC", "OCTAL_ESC", "HEX_DIG", "'('", "','", "')'"],
    FOLLOW_TERM_in_block28: new ANTLR.misc.BitSet([0x000401E0,0x00000000]),
    FOLLOW_stmt_in_block33: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block74: new ANTLR.misc.BitSet([0x000401E0,0x00000000]),
    FOLLOW_stmt_in_block78: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block84: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_WS_in_stmt100: new ANTLR.misc.BitSet([0x000401E0,0x00000000]),
    FOLLOW_exp_in_stmt105: new ANTLR.misc.BitSet([0x00000022,0x00000000]),
    FOLLOW_WS_in_stmt144: new ANTLR.misc.BitSet([0x000401E0,0x00000000]),
    FOLLOW_exp_in_stmt149: new ANTLR.misc.BitSet([0x00000022,0x00000000]),
    FOLLOW_WS_in_stmt156: new ANTLR.misc.BitSet([0x00000022,0x00000000]),
    FOLLOW_symb_in_exp174: new ANTLR.misc.BitSet([0x00040002,0x00000000]),
    FOLLOW_list_in_exp214: new ANTLR.misc.BitSet([0x00040002,0x00000000]),
    FOLLOW_list_in_exp258: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_18_in_list276: new ANTLR.misc.BitSet([0x001C01F0,0x00000000]),
    FOLLOW_block_in_list280: new ANTLR.misc.BitSet([0x00180000,0x00000000]),
    FOLLOW_19_in_list323: new ANTLR.misc.BitSet([0x000401F0,0x00000000]),
    FOLLOW_block_in_list327: new ANTLR.misc.BitSet([0x00180000,0x00000000]),
    FOLLOW_20_in_list334: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_innt_in_symb349: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_string_in_symb355: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_id_in_symb361: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_INNT_in_innt381: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_STRING_in_string396: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_ID_in_id415: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();