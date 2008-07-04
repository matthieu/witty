// $ANTLR 3.0.1 antlr/witty.g 2008-07-03 21:46:04

var wittyParser = function(input) {
    wittyParser.superclass.constructor.call(this, input);

    this.dfa3 = new wittyParser.DFA3(this);
    this.dfa8 = new wittyParser.DFA8(this);
    var ruleMemo = {};
     /* @todo only create adaptor if output=AST */
    this.adaptor = new ANTLR.runtime.tree.CommonTreeAdaptor();

};

(function(){
// public class variables
var TERM= 4,
    LETTER= 10,
    INNT= 7,
    UNICODE_ESC= 17,
    OCTAL_ESC= 18,
    HEX_DIG= 19,
    ID= 6,
    EOF= -1,
    NON_OP= 11,
    WS= 5,
    OPER= 9,
    ESC_SEQ= 12,
    DIGIT= 14,
    SYMBOLS= 13,
    COMMENT= 15,
    CR= 16,
    STRING= 8;

// public instance methods/vars
ANTLR.lang.extend(wittyParser, ANTLR.runtime.Parser, {
        

    getTokenNames: function() { return wittyParser.tokenNames; },
    getGrammarFileName: function() { return "antlr/witty.g"; },


    // antlr/witty.g:7:1: block returns [Object val] : ( TERM )* s1= stmt ( ( TERM )+ s2= stmt )* ( TERM )* ( EOF )? ;
    // $ANTLR start block
    block: function() {
        var val = null;

         var s1 = null;
         var s2 = null;

        try {
            // antlr/witty.g:8:21: ( ( TERM )* s1= stmt ( ( TERM )+ s2= stmt )* ( TERM )* ( EOF )? )
            // antlr/witty.g:8:23: ( TERM )* s1= stmt ( ( TERM )+ s2= stmt )* ( TERM )* ( EOF )?
            // antlr/witty.g:8:23: ( TERM )*
            loop1:
            do {
                var alt1=2;
                var LA1_0 = this.input.LA(1);

                if ( (LA1_0==TERM) ) {
                    alt1=1;
                }


                switch (alt1) {
            	case 1 :
            	    // antlr/witty.g:0:0: TERM
            	    this.match(this.input,TERM,wittyParser.FOLLOW_TERM_in_block32); if (this.failed) return val;


            	    break;

            	default :
            	    break loop1;
                }
            } while (true);

            this.pushFollow(wittyParser.FOLLOW_stmt_in_block37);
            var s1 = this.stmt();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = s1; var append = false; 
            }
            // antlr/witty.g:9:23: ( ( TERM )+ s2= stmt )*
            loop3:
            do {
                var alt3=2;
                alt3 = this.dfa3.predict(this.input);
                switch (alt3) {
            	case 1 :
            	    // antlr/witty.g:9:24: ( TERM )+ s2= stmt
            	    // antlr/witty.g:9:24: ( TERM )+
            	    var cnt2=0;
            	    loop2:
            	    do {
            	        var alt2=2;
            	        var LA2_0 = this.input.LA(1);

            	        if ( (LA2_0==TERM) ) {
            	            alt2=1;
            	        }


            	        switch (alt2) {
            	    	case 1 :
            	    	    // antlr/witty.g:0:0: TERM
            	    	    this.match(this.input,TERM,wittyParser.FOLLOW_TERM_in_block65); if (this.failed) return val;


            	    	    break;

            	    	default :
            	    	    if ( cnt2 >= 1 ) {
            	                break loop2;
            	            }
            	    	    if (this.backtracking>0) {this.failed=true; return val;}
            	                var eee = new ANTLR.runtime.EarlyExitException(2, this.input);
            	                throw eee;
            	        }
            	        cnt2++;
            	    } while (true);

            	    this.pushFollow(wittyParser.FOLLOW_stmt_in_block70);
            	    var s2 = this.stmt();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       if (append) val.push(s2);
            	                                             else { val = [val, s2]; val.sntx = 'B'; append = true; } 
            	    }


            	    break;

            	default :
            	    break loop3;
                }
            } while (true);

            // antlr/witty.g:11:23: ( TERM )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0==TERM) ) {
                    alt4=1;
                }


                switch (alt4) {
            	case 1 :
            	    // antlr/witty.g:0:0: TERM
            	    this.match(this.input,TERM,wittyParser.FOLLOW_TERM_in_block99); if (this.failed) return val;


            	    break;

            	default :
            	    break loop4;
                }
            } while (true);

            // antlr/witty.g:11:29: ( EOF )?
            var alt5=2;
            var LA5_0 = this.input.LA(1);

            if ( (LA5_0==EOF) ) {
                var LA5_1 = this.input.LA(2);

                if ( (LA5_1==EOF||(LA5_1>=21 && LA5_1<=22)) ) {
                    alt5=1;
                }
            }
            switch (alt5) {
                case 1 :
                    // antlr/witty.g:0:0: EOF
                    this.match(this.input,EOF,wittyParser.FOLLOW_EOF_in_block102); if (this.failed) return val;


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
        return val;
    },


    // antlr/witty.g:13:1: stmt returns [Object val] : ( WS )* e1= exp ( ( WS )* e2= exp )* ( WS )* ;
    // $ANTLR start stmt
    stmt: function() {
        var val = null;

         var e1 = null;
         var e2 = null;

        try {
            // antlr/witty.g:14:21: ( ( WS )* e1= exp ( ( WS )* e2= exp )* ( WS )* )
            // antlr/witty.g:14:23: ( WS )* e1= exp ( ( WS )* e2= exp )* ( WS )*
            // antlr/witty.g:14:23: ( WS )*
            loop6:
            do {
                var alt6=2;
                var LA6_0 = this.input.LA(1);

                if ( (LA6_0==WS) ) {
                    alt6=1;
                }


                switch (alt6) {
            	case 1 :
            	    // antlr/witty.g:0:0: WS
            	    this.match(this.input,WS,wittyParser.FOLLOW_WS_in_stmt114); if (this.failed) return val;


            	    break;

            	default :
            	    break loop6;
                }
            } while (true);

            this.pushFollow(wittyParser.FOLLOW_exp_in_stmt119);
            var e1 = this.exp();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = e1; var append = false; 
            }
            // antlr/witty.g:15:23: ( ( WS )* e2= exp )*
            loop8:
            do {
                var alt8=2;
                alt8 = this.dfa8.predict(this.input);
                switch (alt8) {
            	case 1 :
            	    // antlr/witty.g:15:24: ( WS )* e2= exp
            	    // antlr/witty.g:15:24: ( WS )*
            	    loop7:
            	    do {
            	        var alt7=2;
            	        var LA7_0 = this.input.LA(1);

            	        if ( (LA7_0==WS) ) {
            	            alt7=1;
            	        }


            	        switch (alt7) {
            	    	case 1 :
            	    	    // antlr/witty.g:0:0: WS
            	    	    this.match(this.input,WS,wittyParser.FOLLOW_WS_in_stmt146); if (this.failed) return val;


            	    	    break;

            	    	default :
            	    	    break loop7;
            	        }
            	    } while (true);

            	    this.pushFollow(wittyParser.FOLLOW_exp_in_stmt151);
            	    var e2 = this.exp();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       if (append) val.push(e2);
            	                                          else { val = [val, e2]; val.sntx = 'B'; append = true; } 
            	    }


            	    break;

            	default :
            	    break loop8;
                }
            } while (true);

            // antlr/witty.g:17:23: ( WS )*
            loop9:
            do {
                var alt9=2;
                var LA9_0 = this.input.LA(1);

                if ( (LA9_0==WS) ) {
                    alt9=1;
                }


                switch (alt9) {
            	case 1 :
            	    // antlr/witty.g:0:0: WS
            	    this.match(this.input,WS,wittyParser.FOLLOW_WS_in_stmt181); if (this.failed) return val;


            	    break;

            	default :
            	    break loop9;
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
        return val;
    },


    // antlr/witty.g:19:1: exp returns [Object val] : ( ( atom list )=> applic | atom | list );
    // $ANTLR start exp
    exp: function() {
        var val = null;

         var applic1 = null;
         var atom2 = null;
         var list3 = null;

        try {
            // antlr/witty.g:20:21: ( ( atom list )=> applic | atom | list )
            var alt10=3;
            switch ( this.input.LA(1) ) {
            case ID:
                var LA10_1 = this.input.LA(2);

                if ( (this.synpred10()) ) {
                    alt10=1;
                }
                else if ( (this.synpred11()) ) {
                    alt10=2;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("19:1: exp returns [Object val] : ( ( atom list )=> applic | atom | list );", 10, 1, this.input);

                    throw nvae;
                }
                break;
            case INNT:
                var LA10_2 = this.input.LA(2);

                if ( (this.synpred10()) ) {
                    alt10=1;
                }
                else if ( (this.synpred11()) ) {
                    alt10=2;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("19:1: exp returns [Object val] : ( ( atom list )=> applic | atom | list );", 10, 2, this.input);

                    throw nvae;
                }
                break;
            case STRING:
                var LA10_3 = this.input.LA(2);

                if ( (this.synpred10()) ) {
                    alt10=1;
                }
                else if ( (this.synpred11()) ) {
                    alt10=2;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("19:1: exp returns [Object val] : ( ( atom list )=> applic | atom | list );", 10, 3, this.input);

                    throw nvae;
                }
                break;
            case OPER:
                var LA10_4 = this.input.LA(2);

                if ( (this.synpred10()) ) {
                    alt10=1;
                }
                else if ( (this.synpred11()) ) {
                    alt10=2;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("19:1: exp returns [Object val] : ( ( atom list )=> applic | atom | list );", 10, 4, this.input);

                    throw nvae;
                }
                break;
            case 20:
                alt10=3;
                break;
            default:
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("19:1: exp returns [Object val] : ( ( atom list )=> applic | atom | list );", 10, 0, this.input);

                throw nvae;
            }

            switch (alt10) {
                case 1 :
                    // antlr/witty.g:20:23: ( atom list )=> applic
                    this.pushFollow(wittyParser.FOLLOW_applic_in_exp200);
                    var applic1 = this.applic();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = applic1; 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:21:25: atom
                    this.pushFollow(wittyParser.FOLLOW_atom_in_exp229);
                    var atom2 = this.atom();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = atom2; 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:22:25: list
                    this.pushFollow(wittyParser.FOLLOW_list_in_exp258);
                    var list3 = this.list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = list3; 
                    }


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
        return val;
    },


    // antlr/witty.g:24:1: applic returns [Object val] : atom ( list )+ ;
    // $ANTLR start applic
    applic: function() {
        var val = null;

         var atom4 = null;
         var list5 = null;

        try {
            // antlr/witty.g:25:21: ( atom ( list )+ )
            // antlr/witty.g:25:23: atom ( list )+
            this.pushFollow(wittyParser.FOLLOW_atom_in_applic271);
            var atom4 = this.atom();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = atom4; 
            }
            // antlr/witty.g:26:23: ( list )+
            var cnt11=0;
            loop11:
            do {
                var alt11=2;
                var LA11_0 = this.input.LA(1);

                if ( (LA11_0==20) ) {
                    var LA11_6 = this.input.LA(2);

                    if ( (this.synpred12()) ) {
                        alt11=1;
                    }


                }


                switch (alt11) {
            	case 1 :
            	    // antlr/witty.g:26:24: list
            	    this.pushFollow(wittyParser.FOLLOW_list_in_applic299);
            	    var list5 = this.list();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val = [val, list5]; val.sntx = 'A'; 
            	    }


            	    break;

            	default :
            	    if ( cnt11 >= 1 ) {
                        break loop11;
                    }
            	    if (this.backtracking>0) {this.failed=true; return val;}
                        var eee = new ANTLR.runtime.EarlyExitException(11, this.input);
                        throw eee;
                }
                cnt11++;
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
        return val;
    },


    // antlr/witty.g:28:1: list returns [Object val] : '(' (b1= block )? ( ',' b2= block )* ')' ;
    // $ANTLR start list
    list: function() {
        var val = null;

         var b1 = null;
         var b2 = null;

        try {
            // antlr/witty.g:29:21: ( '(' (b1= block )? ( ',' b2= block )* ')' )
            // antlr/witty.g:29:23: '(' (b1= block )? ( ',' b2= block )* ')'
            this.match(this.input,20,wittyParser.FOLLOW_20_in_list314); if (this.failed) return val;
            // antlr/witty.g:29:29: (b1= block )?
            var alt12=2;
            var LA12_0 = this.input.LA(1);

            if ( ((LA12_0>=TERM && LA12_0<=OPER)||LA12_0==20) ) {
                alt12=1;
            }
            switch (alt12) {
                case 1 :
                    // antlr/witty.g:0:0: b1= block
                    this.pushFollow(wittyParser.FOLLOW_block_in_list318);
                    var b1 = this.block();
                    this._fsp--;
                    if (this.failed) return val;


                    break;

            }

            if ( this.backtracking===0 ) {
               if (b1) val = [b1]; 
                                                    else val = []; val.sntx = 'L'; 
            }
            // antlr/witty.g:31:24: ( ',' b2= block )*
            loop13:
            do {
                var alt13=2;
                var LA13_0 = this.input.LA(1);

                if ( (LA13_0==21) ) {
                    alt13=1;
                }


                switch (alt13) {
            	case 1 :
            	    // antlr/witty.g:31:25: ',' b2= block
            	    this.match(this.input,21,wittyParser.FOLLOW_21_in_list347); if (this.failed) return val;
            	    this.pushFollow(wittyParser.FOLLOW_block_in_list351);
            	    var b2 = this.block();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val.push(b2); 
            	    }


            	    break;

            	default :
            	    break loop13;
                }
            } while (true);

            this.match(this.input,22,wittyParser.FOLLOW_22_in_list358); if (this.failed) return val;



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
        return val;
    },


    // antlr/witty.g:33:1: atom returns [Object val] : ( ID | INNT | STRING | OPER );
    // $ANTLR start atom
    atom: function() {
        var val = null;

        var ID6 = null;
        var INNT7 = null;
        var STRING8 = null;
        var OPER9 = null;

        try {
            // antlr/witty.g:34:21: ( ID | INNT | STRING | OPER )
            var alt14=4;
            switch ( this.input.LA(1) ) {
            case ID:
                alt14=1;
                break;
            case INNT:
                alt14=2;
                break;
            case STRING:
                alt14=3;
                break;
            case OPER:
                alt14=4;
                break;
            default:
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("33:1: atom returns [Object val] : ( ID | INNT | STRING | OPER );", 14, 0, this.input);

                throw nvae;
            }

            switch (alt14) {
                case 1 :
                    // antlr/witty.g:34:23: ID
                    ID6=this.input.LT(1);
                    this.match(this.input,ID,wittyParser.FOLLOW_ID_in_atom369); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = ID6.getText(); 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:34:49: INNT
                    INNT7=this.input.LT(1);
                    this.match(this.input,INNT,wittyParser.FOLLOW_INNT_in_atom375); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = INNT7.getText(); 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:35:25: STRING
                    STRING8=this.input.LT(1);
                    this.match(this.input,STRING,wittyParser.FOLLOW_STRING_in_atom404); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                      val = STRING8.getText(); 
                    }


                    break;
                case 4 :
                    // antlr/witty.g:35:58: OPER
                    OPER9=this.input.LT(1);
                    this.match(this.input,OPER,wittyParser.FOLLOW_OPER_in_atom410); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = OPER9.getText(); 
                    }


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
        return val;
    },

    // $ANTLR start synpred10
    synpred10_fragment: function() {   
        // antlr/witty.g:20:23: ( atom list )
        // antlr/witty.g:20:24: atom list
        this.pushFollow(wittyParser.FOLLOW_atom_in_synpred10194);
        this.atom();
        this._fsp--;
        if (this.failed) return ;
        this.pushFollow(wittyParser.FOLLOW_list_in_synpred10196);
        this.list();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred10,

    // $ANTLR start synpred11
    synpred11_fragment: function() {   
        // antlr/witty.g:21:25: ( atom )
        // antlr/witty.g:21:25: atom
        this.pushFollow(wittyParser.FOLLOW_atom_in_synpred11229);
        this.atom();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred11,

    // $ANTLR start synpred12
    synpred12_fragment: function() {   
        // antlr/witty.g:26:24: ( list )
        // antlr/witty.g:26:24: list
        this.pushFollow(wittyParser.FOLLOW_list_in_synpred12299);
        this.list();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred12

    synpred10: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred10_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.failed;
        this.input.rewind(start);
        this.backtracking--;
        this.failed=false;
        return success;
    },
    synpred11: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred11_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.failed;
        this.input.rewind(start);
        this.backtracking--;
        this.failed=false;
        return success;
    },
    synpred12: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred12_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.failed;
        this.input.rewind(start);
        this.backtracking--;
        this.failed=false;
        return success;
    },

});

ANTLR.lang.augmentObject(wittyParser, {
    DFA3_eotS:
        "\u0004\uffff",
    DFA3_eofS:
        "\u0002\u0002\u0002\uffff",
    DFA3_minS:
        "\u0002\u0004\u0002\uffff",
    DFA3_maxS:
        "\u0002\u0016\u0002\uffff",
    DFA3_acceptS:
        "\u0002\uffff\u0001\u0002\u0001\u0001",
    DFA3_specialS:
        "\u0004\uffff}>",
    DFA3_transitionS: [
            "\u0001\u0001\u0010\uffff\u0002\u0002",
            "\u0001\u0001\u0005\u0003\u000a\uffff\u0001\u0003\u0002\u0002",
            "",
            ""
    ]
});
    
ANTLR.lang.augmentObject(wittyParser, {
    DFA3_eot:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA3_eotS),
    DFA3_eof:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA3_eofS),
    DFA3_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyParser.DFA3_minS),
    DFA3_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyParser.DFA3_maxS),
    DFA3_accept:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA3_acceptS),
    DFA3_special:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA3_specialS),
    DFA3_transition: (function() {
        var a = [],
            i,
            numStates = wittyParser.DFA3_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA3_transitionS[i]));
        }
        return a;
    })()
});

wittyParser.DFA3 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 3;
    this.eot = wittyParser.DFA3_eot;
    this.eof = wittyParser.DFA3_eof;
    this.min = wittyParser.DFA3_min;
    this.max = wittyParser.DFA3_max;
    this.accept = wittyParser.DFA3_accept;
    this.special = wittyParser.DFA3_special;
    this.transition = wittyParser.DFA3_transition;
};

ANTLR.lang.extend(wittyParser.DFA3, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "()* loopback of 9:23: ( ( TERM )+ s2= stmt )*";
    },
    dummy: null
});
ANTLR.lang.augmentObject(wittyParser, {
    DFA8_eotS:
        "\u0004\uffff",
    DFA8_eofS:
        "\u0002\u0002\u0002\uffff",
    DFA8_minS:
        "\u0002\u0004\u0002\uffff",
    DFA8_maxS:
        "\u0002\u0016\u0002\uffff",
    DFA8_acceptS:
        "\u0002\uffff\u0001\u0002\u0001\u0001",
    DFA8_specialS:
        "\u0004\uffff}>",
    DFA8_transitionS: [
            "\u0001\u0002\u0001\u0001\u0004\u0003\u000a\uffff\u0001\u0003"+
            "\u0002\u0002",
            "\u0001\u0002\u0001\u0001\u0004\u0003\u000a\uffff\u0001\u0003"+
            "\u0002\u0002",
            "",
            ""
    ]
});
    
ANTLR.lang.augmentObject(wittyParser, {
    DFA8_eot:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA8_eotS),
    DFA8_eof:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA8_eofS),
    DFA8_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyParser.DFA8_minS),
    DFA8_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyParser.DFA8_maxS),
    DFA8_accept:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA8_acceptS),
    DFA8_special:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA8_specialS),
    DFA8_transition: (function() {
        var a = [],
            i,
            numStates = wittyParser.DFA8_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA8_transitionS[i]));
        }
        return a;
    })()
});

wittyParser.DFA8 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 8;
    this.eot = wittyParser.DFA8_eot;
    this.eof = wittyParser.DFA8_eof;
    this.min = wittyParser.DFA8_min;
    this.max = wittyParser.DFA8_max;
    this.accept = wittyParser.DFA8_accept;
    this.special = wittyParser.DFA8_special;
    this.transition = wittyParser.DFA8_transition;
};

ANTLR.lang.extend(wittyParser.DFA8, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "()* loopback of 15:23: ( ( WS )* e2= exp )*";
    },
    dummy: null
});
 

// public class variables
ANTLR.lang.augmentObject(wittyParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "WS", "ID", "INNT", "STRING", "OPER", "LETTER", "NON_OP", "ESC_SEQ", "SYMBOLS", "DIGIT", "COMMENT", "CR", "UNICODE_ESC", "OCTAL_ESC", "HEX_DIG", "'('", "','", "')'"],
    FOLLOW_TERM_in_block32: new ANTLR.misc.BitSet([0x001003F0,0x00000000]),
    FOLLOW_stmt_in_block37: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block65: new ANTLR.misc.BitSet([0x001003F0,0x00000000]),
    FOLLOW_stmt_in_block70: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block99: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_EOF_in_block102: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_WS_in_stmt114: new ANTLR.misc.BitSet([0x001003E0,0x00000000]),
    FOLLOW_exp_in_stmt119: new ANTLR.misc.BitSet([0x001003E2,0x00000000]),
    FOLLOW_WS_in_stmt146: new ANTLR.misc.BitSet([0x001003E0,0x00000000]),
    FOLLOW_exp_in_stmt151: new ANTLR.misc.BitSet([0x001003E2,0x00000000]),
    FOLLOW_WS_in_stmt181: new ANTLR.misc.BitSet([0x00000022,0x00000000]),
    FOLLOW_applic_in_exp200: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_exp229: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_list_in_exp258: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_applic271: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_list_in_applic299: new ANTLR.misc.BitSet([0x00100002,0x00000000]),
    FOLLOW_20_in_list314: new ANTLR.misc.BitSet([0x007003F0,0x00000000]),
    FOLLOW_block_in_list318: new ANTLR.misc.BitSet([0x00600000,0x00000000]),
    FOLLOW_21_in_list347: new ANTLR.misc.BitSet([0x001003F0,0x00000000]),
    FOLLOW_block_in_list351: new ANTLR.misc.BitSet([0x00600000,0x00000000]),
    FOLLOW_22_in_list358: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_ID_in_atom369: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_INNT_in_atom375: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_STRING_in_atom404: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_OPER_in_atom410: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_synpred10194: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_list_in_synpred10196: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_synpred11229: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_list_in_synpred12299: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();