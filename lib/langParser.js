// $ANTLR 3.0.1 antlr/lang.g 2008-06-22 19:25:33

var langParser = function(input) {
    langParser.superclass.constructor.call(this, input);

    /* @todo only create adaptor if output=AST */
    this.adaptor = new ANTLR.runtime.tree.CommonTreeAdaptor();

};

(function(){
// public class variables
var TERM= 4,
    SL_COMMENTS= 13,
    WS= 14,
    ESC_SEQ= 8,
    LETTER= 9,
    INNT= 5,
    UNICODE_ESC= 15,
    OCTAL_ESC= 16,
    HEX_DIG= 17,
    DIGIT= 11,
    SYMBOLS= 10,
    ID= 7,
    CR= 12,
    EOF= -1,
    STRING= 6;

// public instance methods/vars
ANTLR.lang.extend(langParser, ANTLR.runtime.Parser, {
        

    getTokenNames: function() { return langParser.tokenNames; },
    getGrammarFileName: function() { return "antlr/lang.g"; },


    // antlr/lang.g:6:1: block returns [Object value] : ( TERM )? e= exp ( TERM e= exp )* ( TERM )? ;
    // $ANTLR start block
    block: function() {
        var value = null;

         var e = null;

        try {
            // antlr/lang.g:6:31: ( ( TERM )? e= exp ( TERM e= exp )* ( TERM )? )
            // antlr/lang.g:6:35: ( TERM )? e= exp ( TERM e= exp )* ( TERM )?
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

            this.pushFollow(langParser.FOLLOW_exp_in_block33);
            var e = this.exp();
            this._fsp--;

             value = e; 
            // antlr/lang.g:7:36: ( TERM e= exp )*
            loop2:
            do {
                var alt2=2;
                var LA2_0 = this.input.LA(1);

                if ( (LA2_0==TERM) ) {
                    var LA2_1 = this.input.LA(2);

                    if ( ((LA2_1>=INNT && LA2_1<=ID)||LA2_1==18) ) {
                        alt2=1;
                    }


                }


                switch (alt2) {
            	case 1 :
            	    // antlr/lang.g:7:37: TERM e= exp
            	    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block74); 
            	    this.pushFollow(langParser.FOLLOW_exp_in_block78);
            	    var e = this.exp();
            	    this._fsp--;

            	     if (value.sntx != 'B') { value = [value, e]; value.sntx = 'B'; }
            	                                                     else value.push(e) 


            	    break;

            	default :
            	    break loop2;
                }
            } while (true);

            // antlr/lang.g:8:81: ( TERM )?
            var alt3=2;
            var LA3_0 = this.input.LA(1);

            if ( (LA3_0==TERM) ) {
                alt3=1;
            }
            switch (alt3) {
                case 1 :
                    // antlr/lang.g:8:81: TERM
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


    // antlr/lang.g:9:1: exp returns [Object value] : ( symb ( list )* | list );
    // $ANTLR start exp
    exp: function() {
        var value = null;

         var symb1 = null;
         var list2 = null;
         var list3 = null;

        try {
            // antlr/lang.g:9:31: ( symb ( list )* | list )
            var alt5=2;
            var LA5_0 = this.input.LA(1);

            if ( ((LA5_0>=INNT && LA5_0<=ID)) ) {
                alt5=1;
            }
            else if ( (LA5_0==18) ) {
                alt5=2;
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("9:1: exp returns [Object value] : ( symb ( list )* | list );", 5, 0, this.input);

                throw nvae;
            }
            switch (alt5) {
                case 1 :
                    // antlr/lang.g:9:35: symb ( list )*
                    this.pushFollow(langParser.FOLLOW_symb_in_exp101);
                    var symb1 = this.symb();
                    this._fsp--;

                     value = symb1;
                    // antlr/lang.g:10:35: ( list )*
                    loop4:
                    do {
                        var alt4=2;
                        var LA4_0 = this.input.LA(1);

                        if ( (LA4_0==18) ) {
                            alt4=1;
                        }


                        switch (alt4) {
                    	case 1 :
                    	    // antlr/lang.g:10:36: list
                    	    this.pushFollow(langParser.FOLLOW_list_in_exp141);
                    	    var list2 = this.list();
                    	    this._fsp--;

                    	     value = [value, list2]; value.sntx = 'A' 


                    	    break;

                    	default :
                    	    break loop4;
                        }
                    } while (true);



                    break;
                case 2 :
                    // antlr/lang.g:11:39: list
                    this.pushFollow(langParser.FOLLOW_list_in_exp185);
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


    // antlr/lang.g:12:1: list returns [Array value] : '(' (b= block )? ( ',' b= block )* ')' ;
    // $ANTLR start list
    list: function() {
        var value = null;

         var b = null;

        try {
            // antlr/lang.g:12:31: ( '(' (b= block )? ( ',' b= block )* ')' )
            // antlr/lang.g:12:35: '(' (b= block )? ( ',' b= block )* ')'
            this.match(this.input,18,langParser.FOLLOW_18_in_list203); 
            // antlr/lang.g:12:40: (b= block )?
            var alt6=2;
            var LA6_0 = this.input.LA(1);

            if ( ((LA6_0>=TERM && LA6_0<=ID)||LA6_0==18) ) {
                alt6=1;
            }
            switch (alt6) {
                case 1 :
                    // antlr/lang.g:12:40: b= block
                    this.pushFollow(langParser.FOLLOW_block_in_list207);
                    var b = this.block();
                    this._fsp--;



                    break;

            }

             if (b) value = [b]; else value = []; value.sntx = 'L'; 
            // antlr/lang.g:13:37: ( ',' b= block )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0==19) ) {
                    alt7=1;
                }


                switch (alt7) {
            	case 1 :
            	    // antlr/lang.g:13:38: ',' b= block
            	    this.match(this.input,19,langParser.FOLLOW_19_in_list250); 
            	    this.pushFollow(langParser.FOLLOW_block_in_list254);
            	    var b = this.block();
            	    this._fsp--;

            	     value.push(b); 


            	    break;

            	default :
            	    break loop7;
                }
            } while (true);

            this.match(this.input,20,langParser.FOLLOW_20_in_list261); 



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


    // antlr/lang.g:14:1: symb returns [Object value] : ( innt | string | id );
    // $ANTLR start symb
    symb: function() {
        var value = null;

         var innt4 = 0;
         var string5 = null;
         var id6 = null;

        try {
            // antlr/lang.g:14:31: ( innt | string | id )
            var alt8=3;
            switch ( this.input.LA(1) ) {
            case INNT:
                alt8=1;
                break;
            case STRING:
                alt8=2;
                break;
            case ID:
                alt8=3;
                break;
            default:
                var nvae =
                    new ANTLR.runtime.NoViableAltException("14:1: symb returns [Object value] : ( innt | string | id );", 8, 0, this.input);

                throw nvae;
            }

            switch (alt8) {
                case 1 :
                    // antlr/lang.g:14:35: innt
                    this.pushFollow(langParser.FOLLOW_innt_in_symb276);
                    var innt4 = this.innt();
                    this._fsp--;

                     value = innt4; 


                    break;
                case 2 :
                    // antlr/lang.g:14:68: string
                    this.pushFollow(langParser.FOLLOW_string_in_symb282);
                    var string5 = this.string();
                    this._fsp--;

                     value = string5; 


                    break;
                case 3 :
                    // antlr/lang.g:14:105: id
                    this.pushFollow(langParser.FOLLOW_id_in_symb288);
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


    // antlr/lang.g:15:1: innt returns [int value] : INNT ;
    // $ANTLR start innt
    innt: function() {
        var value = null;

        var INNT7 = null;

        try {
            // antlr/lang.g:15:31: ( INNT )
            // antlr/lang.g:15:35: INNT
            INNT7=this.input.LT(1);
            this.match(this.input,INNT,langParser.FOLLOW_INNT_in_innt308); 
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


    // antlr/lang.g:16:1: string returns [String value] : STRING ;
    // $ANTLR start string
    string: function() {
        var value = null;

        var STRING8 = null;

        try {
            // antlr/lang.g:16:31: ( STRING )
            // antlr/lang.g:16:35: STRING
            STRING8=this.input.LT(1);
            this.match(this.input,STRING,langParser.FOLLOW_STRING_in_string323); 
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


    // antlr/lang.g:17:1: id returns [String value] : ID ;
    // $ANTLR start id
    id: function() {
        var value = null;

        var ID9 = null;

        try {
            // antlr/lang.g:17:31: ( ID )
            // antlr/lang.g:17:35: ID
            ID9=this.input.LT(1);
            this.match(this.input,ID,langParser.FOLLOW_ID_in_id342); 
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

 

// public class variables
ANTLR.lang.augmentObject(langParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "INNT", "STRING", "ID", "ESC_SEQ", "LETTER", "SYMBOLS", "DIGIT", "CR", "SL_COMMENTS", "WS", "UNICODE_ESC", "OCTAL_ESC", "HEX_DIG", "'('", "','", "')'"],
    FOLLOW_TERM_in_block28: new ANTLR.misc.BitSet([0x000400E0,0x00000000]),
    FOLLOW_exp_in_block33: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block74: new ANTLR.misc.BitSet([0x000400E0,0x00000000]),
    FOLLOW_exp_in_block78: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block84: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_symb_in_exp101: new ANTLR.misc.BitSet([0x00040002,0x00000000]),
    FOLLOW_list_in_exp141: new ANTLR.misc.BitSet([0x00040002,0x00000000]),
    FOLLOW_list_in_exp185: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_18_in_list203: new ANTLR.misc.BitSet([0x001C00F0,0x00000000]),
    FOLLOW_block_in_list207: new ANTLR.misc.BitSet([0x00180000,0x00000000]),
    FOLLOW_19_in_list250: new ANTLR.misc.BitSet([0x000400F0,0x00000000]),
    FOLLOW_block_in_list254: new ANTLR.misc.BitSet([0x00180000,0x00000000]),
    FOLLOW_20_in_list261: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_innt_in_symb276: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_string_in_symb282: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_id_in_symb288: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_INNT_in_innt308: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_STRING_in_string323: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_ID_in_id342: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();