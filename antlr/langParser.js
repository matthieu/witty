// $ANTLR 3.0.1 lang.g 2008-06-02 21:18:54

var langParser = function(input) {
    langParser.superclass.constructor.call(this, input);

    /* @todo only create adaptor if output=AST */
    this.adaptor = new ANTLR.runtime.tree.CommonTreeAdaptor();

};

(function(){
// public class variables
var CR= 12,
    LETTER= 8,
    SL_COMMENTS= 13,
    INT= 5,
    WS= 14,
    EOF= -1,
    ESCAPE_SEQ= 11,
    STRING= 6,
    SYMBOLS= 9,
    DIGIT= 10,
    TERM= 4,
    ID= 7;

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
            // lang.g:6:32: ( ( TERM )? e= exp ( TERM e= exp )* ( TERM )? )
            // lang.g:6:36: ( TERM )? e= exp ( TERM e= exp )* ( TERM )?
            // lang.g:6:36: ( TERM )?
            var alt1=2;
            var LA1_0 = this.input.LA(1);

            if ( (LA1_0==TERM) ) {
                alt1=1;
            }
            switch (alt1) {
                case 1 :
                    // lang.g:6:36: TERM
                    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block29); 


                    break;

            }

            this.pushFollow(langParser.FOLLOW_exp_in_block34);
            var e = this.exp();
            this._fsp--;

             value = e; 
            // lang.g:7:37: ( TERM e= exp )*
            loop2:
            do {
                var alt2=2;
                var LA2_0 = this.input.LA(1);

                if ( (LA2_0==TERM) ) {
                    var LA2_1 = this.input.LA(2);

                    if ( ((LA2_1>=INT && LA2_1<=ID)||LA2_1==15) ) {
                        alt2=1;
                    }


                }


                switch (alt2) {
            	case 1 :
            	    // lang.g:7:38: TERM e= exp
            	    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block76); 
            	    this.pushFollow(langParser.FOLLOW_exp_in_block80);
            	    var e = this.exp();
            	    this._fsp--;

            	     if (!(value instanceof Array)) value = [value, e]; 
            	                                                      else value.push(e) 


            	    break;

            	default :
            	    break loop2;
                }
            } while (true);

            // lang.g:8:82: ( TERM )?
            var alt3=2;
            var LA3_0 = this.input.LA(1);

            if ( (LA3_0==TERM) ) {
                alt3=1;
            }
            switch (alt3) {
                case 1 :
                    // lang.g:8:82: TERM
                    this.match(this.input,TERM,langParser.FOLLOW_TERM_in_block86); 


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
            // lang.g:9:32: ( symb ( list )? | list )
            var alt5=2;
            var LA5_0 = this.input.LA(1);

            if ( ((LA5_0>=INT && LA5_0<=ID)) ) {
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
                    // lang.g:9:36: symb ( list )?
                    this.pushFollow(langParser.FOLLOW_symb_in_exp104);
                    var symb2 = this.symb();
                    this._fsp--;

                    // lang.g:9:41: ( list )?
                    var alt4=2;
                    var LA4_0 = this.input.LA(1);

                    if ( (LA4_0==15) ) {
                        alt4=1;
                    }
                    switch (alt4) {
                        case 1 :
                            // lang.g:9:41: list
                            this.pushFollow(langParser.FOLLOW_list_in_exp106);
                            var list1 = this.list();
                            this._fsp--;



                            break;

                    }

                     if (list1) value = [symb2].concat(list1); else value = symb2; 


                    break;
                case 2 :
                    // lang.g:10:39: list
                    this.pushFollow(langParser.FOLLOW_list_in_exp150);
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


    // lang.g:11:1: list returns [Array value] : '(' (b= block )? ( ',' b= block )* ')' ;
    // $ANTLR start list
    list: function() {
        var value = null;

         var b = null;

        try {
            // lang.g:11:31: ( '(' (b= block )? ( ',' b= block )* ')' )
            // lang.g:11:35: '(' (b= block )? ( ',' b= block )* ')'
            this.match(this.input,15,langParser.FOLLOW_15_in_list168); 
            // lang.g:11:40: (b= block )?
            var alt6=2;
            var LA6_0 = this.input.LA(1);

            if ( ((LA6_0>=TERM && LA6_0<=ID)||LA6_0==15) ) {
                alt6=1;
            }
            switch (alt6) {
                case 1 :
                    // lang.g:11:40: b= block
                    this.pushFollow(langParser.FOLLOW_block_in_list172);
                    var b = this.block();
                    this._fsp--;



                    break;

            }

             if (b) value = [b]; else value = []; 
            // lang.g:12:37: ( ',' b= block )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0==16) ) {
                    alt7=1;
                }


                switch (alt7) {
            	case 1 :
            	    // lang.g:12:38: ',' b= block
            	    this.match(this.input,16,langParser.FOLLOW_16_in_list215); 
            	    this.pushFollow(langParser.FOLLOW_block_in_list219);
            	    var b = this.block();
            	    this._fsp--;



            	    break;

            	default :
            	    break loop7;
                }
            } while (true);

             if (b) value.push(b); 
            this.match(this.input,17,langParser.FOLLOW_17_in_list225); 



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


    // lang.g:13:1: symb returns [Object value] : ( int | string | id );
    // $ANTLR start symb
    symb: function() {
        var value = null;

         var int4 = 0;
         var string5 = null;
         var id6 = null;

        try {
            // lang.g:13:31: ( int | string | id )
            var alt8=3;
            switch ( this.input.LA(1) ) {
            case INT:
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
                    new ANTLR.runtime.NoViableAltException("13:1: symb returns [Object value] : ( int | string | id );", 8, 0, this.input);

                throw nvae;
            }

            switch (alt8) {
                case 1 :
                    // lang.g:13:35: int
                    this.pushFollow(langParser.FOLLOW_int_in_symb240);
                    var int4 = this.int();
                    this._fsp--;

                     value = int4; 


                    break;
                case 2 :
                    // lang.g:13:66: string
                    this.pushFollow(langParser.FOLLOW_string_in_symb246);
                    var string5 = this.string();
                    this._fsp--;

                     value = string5; 


                    break;
                case 3 :
                    // lang.g:13:103: id
                    this.pushFollow(langParser.FOLLOW_id_in_symb252);
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


    // lang.g:14:1: int returns [int value] : INT ;
    // $ANTLR start int
    int: function() {
        var value = null;

        var INT7 = null;

        try {
            // lang.g:14:31: ( INT )
            // lang.g:14:35: INT
            INT7=this.input.LT(1);
            this.match(this.input,INT,langParser.FOLLOW_INT_in_int273); 
             value = INT7.getText(); 



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


    // lang.g:15:1: string returns [String value] : STRING ;
    // $ANTLR start string
    string: function() {
        var value = null;

        var STRING8 = null;

        try {
            // lang.g:15:31: ( STRING )
            // lang.g:15:35: STRING
            STRING8=this.input.LT(1);
            this.match(this.input,STRING,langParser.FOLLOW_STRING_in_string288); 
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


    // lang.g:16:1: id returns [String value] : ID ;
    // $ANTLR start id
    id: function() {
        var value = null;

        var ID9 = null;

        try {
            // lang.g:16:31: ( ID )
            // lang.g:16:35: ID
            ID9=this.input.LT(1);
            this.match(this.input,ID,langParser.FOLLOW_ID_in_id307); 
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
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "INT", "STRING", "ID", "LETTER", "SYMBOLS", "DIGIT", "ESCAPE_SEQ", "CR", "SL_COMMENTS", "WS", "'('", "','", "')'"],
    FOLLOW_TERM_in_block29: new ANTLR.misc.BitSet([0x000080E0,0x00000000]),
    FOLLOW_exp_in_block34: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block76: new ANTLR.misc.BitSet([0x000080E0,0x00000000]),
    FOLLOW_exp_in_block80: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block86: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_symb_in_exp104: new ANTLR.misc.BitSet([0x00008002,0x00000000]),
    FOLLOW_list_in_exp106: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_list_in_exp150: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_15_in_list168: new ANTLR.misc.BitSet([0x000380F0,0x00000000]),
    FOLLOW_block_in_list172: new ANTLR.misc.BitSet([0x00030000,0x00000000]),
    FOLLOW_16_in_list215: new ANTLR.misc.BitSet([0x000080F0,0x00000000]),
    FOLLOW_block_in_list219: new ANTLR.misc.BitSet([0x00030000,0x00000000]),
    FOLLOW_17_in_list225: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_int_in_symb240: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_string_in_symb246: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_id_in_symb252: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_INT_in_int273: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_STRING_in_string288: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_ID_in_id307: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();