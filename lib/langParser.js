// $ANTLR 3.0.1 lang.g 2008-06-20 22:14:13

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
    LETTER= 8,
    INNT= 5,
    ESCAPE_SEQ= 11,
    DIGIT= 10,
    SYMBOLS= 9,
    ID= 7,
    CR= 12,
    EOF= -1,
    STRING= 6;

// public instance methods/vars
ANTLR.lang.extend(langParser, ANTLR.runtime.Parser, {
        

    getTokenNames: function() { return langParser.tokenNames; },
    getGrammarFileName: function() { return "lang.g"; },


    // lang.g:6:1: block returns [Object value] : ( TERM )? e= exp ( TERM e= exp )* ( TERM )? ;
    // $ANTLR start block
    block: function() {
        var value = null;

         var e = null;

        try {
            // lang.g:6:31: ( ( TERM )? e= exp ( TERM e= exp )* ( TERM )? )
            // lang.g:6:35: ( TERM )? e= exp ( TERM e= exp )* ( TERM )?
            // lang.g:6:35: ( TERM )?
            var alt1=2;
            var LA1_0 = this.input.LA(1);

            if ( (LA1_0==TERM) ) {
                alt1=1;
            }
            switch (alt1) {
                case 1 :
                    // lang.g:6:35: TERM
                    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block28); 


                    break;

            }

            this.pushFollow(langParser.FOLLOW_exp_in_block33);
            var e = this.exp();
            this._fsp--;

             value = e; 
            // lang.g:7:36: ( TERM e= exp )*
            loop2:
            do {
                var alt2=2;
                var LA2_0 = this.input.LA(1);

                if ( (LA2_0==TERM) ) {
                    var LA2_1 = this.input.LA(2);

                    if ( ((LA2_1>=INNT && LA2_1<=ID)||LA2_1==15) ) {
                        alt2=1;
                    }


                }


                switch (alt2) {
            	case 1 :
            	    // lang.g:7:37: TERM e= exp
            	    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block74); 
            	    this.pushFollow(langParser.FOLLOW_exp_in_block78);
            	    var e = this.exp();
            	    this._fsp--;

            	     if (!(value instanceof Block)) value = new Block(value, e); 
            	                                                     else value.push(e) 


            	    break;

            	default :
            	    break loop2;
                }
            } while (true);

            // lang.g:8:81: ( TERM )?
            var alt3=2;
            var LA3_0 = this.input.LA(1);

            if ( (LA3_0==TERM) ) {
                alt3=1;
            }
            switch (alt3) {
                case 1 :
                    // lang.g:8:81: TERM
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


    // lang.g:9:1: exp returns [Object value] : ( symb ( list )? | list );
    // $ANTLR start exp
    exp: function() {
        var value = null;

         var list1 = null;
         var symb2 = null;
         var list3 = null;

        try {
            // lang.g:9:31: ( symb ( list )? | list )
            var alt5=2;
            var LA5_0 = this.input.LA(1);

            if ( ((LA5_0>=INNT && LA5_0<=ID)) ) {
                alt5=1;
            }
            else if ( (LA5_0==15) ) {
                alt5=2;
            }
            else {
                var nvae =
                    new ANTLR.runtime.NoViableAltException("9:1: exp returns [Object value] : ( symb ( list )? | list );", 5, 0, this.input);

                throw nvae;
            }
            switch (alt5) {
                case 1 :
                    // lang.g:9:35: symb ( list )?
                    this.pushFollow(langParser.FOLLOW_symb_in_exp101);
                    var symb2 = this.symb();
                    this._fsp--;

                    // lang.g:9:40: ( list )?
                    var alt4=2;
                    var LA4_0 = this.input.LA(1);

                    if ( (LA4_0==15) ) {
                        alt4=1;
                    }
                    switch (alt4) {
                        case 1 :
                            // lang.g:9:40: list
                            this.pushFollow(langParser.FOLLOW_list_in_exp103);
                            var list1 = this.list();
                            this._fsp--;



                            break;

                    }

                     if (list1) { value = new Applic(symb2, list1); } 
                                                                    else value = symb2; 


                    break;
                case 2 :
                    // lang.g:11:39: list
                    this.pushFollow(langParser.FOLLOW_list_in_exp147);
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


    // lang.g:12:1: list returns [Array value] : '(' (b= block )? ( ',' b= block )* ')' ;
    // $ANTLR start list
    list: function() {
        var value = null;

         var b = null;

        try {
            // lang.g:12:31: ( '(' (b= block )? ( ',' b= block )* ')' )
            // lang.g:12:35: '(' (b= block )? ( ',' b= block )* ')'
            this.match(this.input,15,langParser.FOLLOW_15_in_list165); 
            // lang.g:12:40: (b= block )?
            var alt6=2;
            var LA6_0 = this.input.LA(1);

            if ( ((LA6_0>=TERM && LA6_0<=ID)||LA6_0==15) ) {
                alt6=1;
            }
            switch (alt6) {
                case 1 :
                    // lang.g:12:40: b= block
                    this.pushFollow(langParser.FOLLOW_block_in_list169);
                    var b = this.block();
                    this._fsp--;



                    break;

            }

             if (b) value = new List(b); else value = new List(); 
            // lang.g:13:37: ( ',' b= block )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0==16) ) {
                    alt7=1;
                }


                switch (alt7) {
            	case 1 :
            	    // lang.g:13:38: ',' b= block
            	    this.match(this.input,16,langParser.FOLLOW_16_in_list212); 
            	    this.pushFollow(langParser.FOLLOW_block_in_list216);
            	    var b = this.block();
            	    this._fsp--;

            	     value.push(b); 


            	    break;

            	default :
            	    break loop7;
                }
            } while (true);

            this.match(this.input,17,langParser.FOLLOW_17_in_list223); 



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


    // lang.g:14:1: symb returns [Object value] : ( innt | string | id );
    // $ANTLR start symb
    symb: function() {
        var value = null;

         var innt4 = 0;
         var string5 = null;
         var id6 = null;

        try {
            // lang.g:14:31: ( innt | string | id )
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
                    // lang.g:14:35: innt
                    this.pushFollow(langParser.FOLLOW_innt_in_symb238);
                    var innt4 = this.innt();
                    this._fsp--;

                     value = innt4; 


                    break;
                case 2 :
                    // lang.g:14:68: string
                    this.pushFollow(langParser.FOLLOW_string_in_symb244);
                    var string5 = this.string();
                    this._fsp--;

                     value = string5; 


                    break;
                case 3 :
                    // lang.g:14:105: id
                    this.pushFollow(langParser.FOLLOW_id_in_symb250);
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


    // lang.g:15:1: innt returns [int value] : INNT ;
    // $ANTLR start innt
    innt: function() {
        var value = null;

        var INNT7 = null;

        try {
            // lang.g:15:31: ( INNT )
            // lang.g:15:35: INNT
            INNT7=this.input.LT(1);
            this.match(this.input,INNT,langParser.FOLLOW_INNT_in_innt270); 
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


    // lang.g:16:1: string returns [String value] : STRING ;
    // $ANTLR start string
    string: function() {
        var value = null;

        var STRING8 = null;

        try {
            // lang.g:16:31: ( STRING )
            // lang.g:16:35: STRING
            STRING8=this.input.LT(1);
            this.match(this.input,STRING,langParser.FOLLOW_STRING_in_string285); 
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


    // lang.g:17:1: id returns [String value] : ID ;
    // $ANTLR start id
    id: function() {
        var value = null;

        var ID9 = null;

        try {
            // lang.g:17:31: ( ID )
            // lang.g:17:35: ID
            ID9=this.input.LT(1);
            this.match(this.input,ID,langParser.FOLLOW_ID_in_id304); 
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
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "INNT", "STRING", "ID", "LETTER", "SYMBOLS", "DIGIT", "ESCAPE_SEQ", "CR", "SL_COMMENTS", "WS", "'('", "','", "')'"],
    FOLLOW_TERM_in_block28: new ANTLR.misc.BitSet([0x000080E0,0x00000000]),
    FOLLOW_exp_in_block33: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block74: new ANTLR.misc.BitSet([0x000080E0,0x00000000]),
    FOLLOW_exp_in_block78: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block84: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_symb_in_exp101: new ANTLR.misc.BitSet([0x00008002,0x00000000]),
    FOLLOW_list_in_exp103: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_list_in_exp147: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_15_in_list165: new ANTLR.misc.BitSet([0x000380F0,0x00000000]),
    FOLLOW_block_in_list169: new ANTLR.misc.BitSet([0x00030000,0x00000000]),
    FOLLOW_16_in_list212: new ANTLR.misc.BitSet([0x000080F0,0x00000000]),
    FOLLOW_block_in_list216: new ANTLR.misc.BitSet([0x00030000,0x00000000]),
    FOLLOW_17_in_list223: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_innt_in_symb238: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_string_in_symb244: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_id_in_symb250: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_INNT_in_innt270: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_STRING_in_string285: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_ID_in_id304: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();