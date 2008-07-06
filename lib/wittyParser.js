// $ANTLR 3.0.1 antlr/witty.g 2008-07-06 09:15:04

var wittyParser = function(input) {
    wittyParser.superclass.constructor.call(this, input);

    this.dfa3 = new wittyParser.DFA3(this);
    var ruleMemo = {};
     /* @todo only create adaptor if output=AST */
    this.adaptor = new ANTLR.runtime.tree.CommonTreeAdaptor();

};

(function(){
// public class variables
var TERM= 4,
    LETTER= 9,
    INNT= 7,
    UNICODE_ESC= 17,
    OCTAL_ESC= 18,
    HEX_DIG= 19,
    ID= 6,
    EOF= -1,
    NON_OP= 10,
    OPER= 5,
    ESC_SEQ= 12,
    WS= 16,
    DIGIT= 11,
    SYMBOLS= 13,
    COMMENT= 14,
    CR= 15,
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


    // antlr/witty.g:13:1: stmt returns [Object val] : e1= exp (e2= exp )* ;
    // $ANTLR start stmt
    stmt: function() {
        var val = null;

         var e1 = null;
         var e2 = null;

        try {
            // antlr/witty.g:14:21: (e1= exp (e2= exp )* )
            // antlr/witty.g:14:23: e1= exp (e2= exp )*
            this.pushFollow(wittyParser.FOLLOW_exp_in_stmt116);
            var e1 = this.exp();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = e1; var append = false;
                                                 if (val.sntx == 'M') val.sntx = 'B'; 
            }
            // antlr/witty.g:16:23: (e2= exp )*
            loop6:
            do {
                var alt6=2;
                var LA6_0 = this.input.LA(1);

                if ( ((LA6_0>=OPER && LA6_0<=STRING)) ) {
                    alt6=1;
                }


                switch (alt6) {
            	case 1 :
            	    // antlr/witty.g:16:24: e2= exp
            	    this.pushFollow(wittyParser.FOLLOW_exp_in_stmt145);
            	    var e2 = this.exp();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       if (append) {
            	                                            if (e2.sntx == 'M') { val = val.concat(e2); val.sntx = 'B'; }
            	                                            else val.push(e2);
            	                                          } else { 
            	                                            if (e2.sntx == 'M') val = [val].concat(e2);
            	                                            else val = [val, e2];
            	                                            val.sntx = 'B'; append = true;
            	                                          } 
            	    }


            	    break;

            	default :
            	    break loop6;
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


    // antlr/witty.g:26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( atom ( list )+ )=> applic | atom );
    // $ANTLR start exp
    exp: function() {
        var val = null;

        var OPER1 = null;
         var u = null;
         var applic2 = null;
         var atom3 = null;

        try {
            // antlr/witty.g:27:21: ( ( OPER unary_list )=> OPER u= unary_list | ( atom ( list )+ )=> applic | atom )
            var alt7=3;
            switch ( this.input.LA(1) ) {
            case OPER:
                var LA7_1 = this.input.LA(2);

                if ( (this.synpred7()) ) {
                    alt7=1;
                }
                else if ( (this.synpred9()) ) {
                    alt7=2;
                }
                else if ( (true) ) {
                    alt7=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( atom ( list )+ )=> applic | atom );", 7, 1, this.input);

                    throw nvae;
                }
                break;
            case ID:
                var LA7_2 = this.input.LA(2);

                if ( (this.synpred9()) ) {
                    alt7=2;
                }
                else if ( (true) ) {
                    alt7=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( atom ( list )+ )=> applic | atom );", 7, 2, this.input);

                    throw nvae;
                }
                break;
            case INNT:
                var LA7_3 = this.input.LA(2);

                if ( (this.synpred9()) ) {
                    alt7=2;
                }
                else if ( (true) ) {
                    alt7=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( atom ( list )+ )=> applic | atom );", 7, 3, this.input);

                    throw nvae;
                }
                break;
            case STRING:
                var LA7_4 = this.input.LA(2);

                if ( (this.synpred9()) ) {
                    alt7=2;
                }
                else if ( (true) ) {
                    alt7=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( atom ( list )+ )=> applic | atom );", 7, 4, this.input);

                    throw nvae;
                }
                break;
            default:
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( atom ( list )+ )=> applic | atom );", 7, 0, this.input);

                throw nvae;
            }

            switch (alt7) {
                case 1 :
                    // antlr/witty.g:27:23: ( OPER unary_list )=> OPER u= unary_list
                    OPER1=this.input.LT(1);
                    this.match(this.input,OPER,wittyParser.FOLLOW_OPER_in_exp192); if (this.failed) return val;
                    this.pushFollow(wittyParser.FOLLOW_unary_list_in_exp196);
                    var u = this.unary_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       print("un_oper"); val = [OPER1.getText(), u]; val.sntx = 'M'; 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:28:25: ( atom ( list )+ )=> applic
                    this.pushFollow(wittyParser.FOLLOW_applic_in_exp232);
                    var applic2 = this.applic();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = applic2; 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:29:25: atom
                    this.pushFollow(wittyParser.FOLLOW_atom_in_exp261);
                    var atom3 = this.atom();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = atom3; 
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


    // antlr/witty.g:31:1: applic returns [Object val] : atom ( list )+ ;
    // $ANTLR start applic
    applic: function() {
        var val = null;

         var atom4 = null;
         var list5 = null;

        try {
            // antlr/witty.g:32:21: ( atom ( list )+ )
            // antlr/witty.g:32:23: atom ( list )+
            this.pushFollow(wittyParser.FOLLOW_atom_in_applic274);
            var atom4 = this.atom();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = atom4; 
            }
            // antlr/witty.g:33:23: ( list )+
            var cnt8=0;
            loop8:
            do {
                var alt8=2;
                var LA8_0 = this.input.LA(1);

                if ( (LA8_0==20) ) {
                    alt8=1;
                }


                switch (alt8) {
            	case 1 :
            	    // antlr/witty.g:33:24: list
            	    this.pushFollow(wittyParser.FOLLOW_list_in_applic302);
            	    var list5 = this.list();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val = [val, list5]; val.sntx = 'A'; print("applic " + val); 
            	    }


            	    break;

            	default :
            	    if ( cnt8 >= 1 ) {
                        break loop8;
                    }
            	    if (this.backtracking>0) {this.failed=true; return val;}
                        var eee = new ANTLR.runtime.EarlyExitException(8, this.input);
                        throw eee;
                }
                cnt8++;
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


    // antlr/witty.g:35:1: list returns [Object val] : ( empty_list | unary_list | multi_list );
    // $ANTLR start list
    list: function() {
        var val = null;

         var empty_list6 = null;
         var unary_list7 = null;
         var multi_list8 = null;

        try {
            // antlr/witty.g:36:21: ( empty_list | unary_list | multi_list )
            var alt9=3;
            var LA9_0 = this.input.LA(1);

            if ( (LA9_0==20) ) {
                var LA9_1 = this.input.LA(2);

                if ( (this.synpred11()) ) {
                    alt9=1;
                }
                else if ( (this.synpred12()) ) {
                    alt9=2;
                }
                else if ( (true) ) {
                    alt9=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("35:1: list returns [Object val] : ( empty_list | unary_list | multi_list );", 9, 1, this.input);

                    throw nvae;
                }
            }
            else {
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("35:1: list returns [Object val] : ( empty_list | unary_list | multi_list );", 9, 0, this.input);

                throw nvae;
            }
            switch (alt9) {
                case 1 :
                    // antlr/witty.g:36:23: empty_list
                    this.pushFollow(wittyParser.FOLLOW_empty_list_in_list317);
                    var empty_list6 = this.empty_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = empty_list6; 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:37:25: unary_list
                    this.pushFollow(wittyParser.FOLLOW_unary_list_in_list345);
                    var unary_list7 = this.unary_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = unary_list7; 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:38:25: multi_list
                    this.pushFollow(wittyParser.FOLLOW_multi_list_in_list373);
                    var multi_list8 = this.multi_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = multi_list8; 
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


    // antlr/witty.g:40:1: empty_list returns [Object val] : '(' ')' ;
    // $ANTLR start empty_list
    empty_list: function() {
        var val = null;

        try {
            // antlr/witty.g:41:21: ( '(' ')' )
            // antlr/witty.g:41:23: '(' ')'
            this.match(this.input,20,wittyParser.FOLLOW_20_in_empty_list386); if (this.failed) return val;
            this.match(this.input,21,wittyParser.FOLLOW_21_in_empty_list388); if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = []; val.sntx = 'B'; 
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


    // antlr/witty.g:43:1: unary_list returns [Object val] : '(' block ')' ;
    // $ANTLR start unary_list
    unary_list: function() {
        var val = null;

         var block9 = null;

        try {
            // antlr/witty.g:44:21: ( '(' block ')' )
            // antlr/witty.g:44:23: '(' block ')'
            this.match(this.input,20,wittyParser.FOLLOW_20_in_unary_list401); if (this.failed) return val;
            this.pushFollow(wittyParser.FOLLOW_block_in_unary_list403);
            var block9 = this.block();
            this._fsp--;
            if (this.failed) return val;
            this.match(this.input,21,wittyParser.FOLLOW_21_in_unary_list405); if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = [block9]; val.sntx = 'B'; 
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


    // antlr/witty.g:46:1: multi_list returns [Object val] : '(' b1= block ( ',' b2= block )+ ')' ;
    // $ANTLR start multi_list
    multi_list: function() {
        var val = null;

         var b1 = null;
         var b2 = null;

        try {
            // antlr/witty.g:47:21: ( '(' b1= block ( ',' b2= block )+ ')' )
            // antlr/witty.g:47:23: '(' b1= block ( ',' b2= block )+ ')'
            this.match(this.input,20,wittyParser.FOLLOW_20_in_multi_list418); if (this.failed) return val;
            this.pushFollow(wittyParser.FOLLOW_block_in_multi_list422);
            var b1 = this.block();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               if (b1) val = [b1]; 
                                                    else val = []; val.sntx = 'L'; 
            }
            // antlr/witty.g:49:24: ( ',' b2= block )+
            var cnt10=0;
            loop10:
            do {
                var alt10=2;
                var LA10_0 = this.input.LA(1);

                if ( (LA10_0==22) ) {
                    alt10=1;
                }


                switch (alt10) {
            	case 1 :
            	    // antlr/witty.g:49:25: ',' b2= block
            	    this.match(this.input,22,wittyParser.FOLLOW_22_in_multi_list450); if (this.failed) return val;
            	    this.pushFollow(wittyParser.FOLLOW_block_in_multi_list454);
            	    var b2 = this.block();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val.push(b2); 
            	    }


            	    break;

            	default :
            	    if ( cnt10 >= 1 ) {
                        break loop10;
                    }
            	    if (this.backtracking>0) {this.failed=true; return val;}
                        var eee = new ANTLR.runtime.EarlyExitException(10, this.input);
                        throw eee;
                }
                cnt10++;
            } while (true);

            this.match(this.input,21,wittyParser.FOLLOW_21_in_multi_list461); if (this.failed) return val;



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


    // antlr/witty.g:51:1: atom returns [Object val] : ( ID | INNT | STRING | OPER );
    // $ANTLR start atom
    atom: function() {
        var val = null;

        var ID10 = null;
        var INNT11 = null;
        var STRING12 = null;
        var OPER13 = null;

        try {
            // antlr/witty.g:52:21: ( ID | INNT | STRING | OPER )
            var alt11=4;
            switch ( this.input.LA(1) ) {
            case ID:
                alt11=1;
                break;
            case INNT:
                alt11=2;
                break;
            case STRING:
                alt11=3;
                break;
            case OPER:
                alt11=4;
                break;
            default:
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("51:1: atom returns [Object val] : ( ID | INNT | STRING | OPER );", 11, 0, this.input);

                throw nvae;
            }

            switch (alt11) {
                case 1 :
                    // antlr/witty.g:52:23: ID
                    ID10=this.input.LT(1);
                    this.match(this.input,ID,wittyParser.FOLLOW_ID_in_atom472); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = ID10.getText(); 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:52:49: INNT
                    INNT11=this.input.LT(1);
                    this.match(this.input,INNT,wittyParser.FOLLOW_INNT_in_atom478); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = INNT11.getText(); 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:53:25: STRING
                    STRING12=this.input.LT(1);
                    this.match(this.input,STRING,wittyParser.FOLLOW_STRING_in_atom507); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                      val = STRING12.getText(); 
                    }


                    break;
                case 4 :
                    // antlr/witty.g:53:58: OPER
                    OPER13=this.input.LT(1);
                    this.match(this.input,OPER,wittyParser.FOLLOW_OPER_in_atom513); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = OPER13.getText(); 
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

    // $ANTLR start synpred7
    synpred7_fragment: function() {   
        // antlr/witty.g:27:23: ( OPER unary_list )
        // antlr/witty.g:27:24: OPER unary_list
        this.match(this.input,OPER,wittyParser.FOLLOW_OPER_in_synpred7186); if (this.failed) return ;
        this.pushFollow(wittyParser.FOLLOW_unary_list_in_synpred7188);
        this.unary_list();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred7,

    // $ANTLR start synpred9
    synpred9_fragment: function() {   
        // antlr/witty.g:28:25: ( atom ( list )+ )
        // antlr/witty.g:28:26: atom ( list )+
        this.pushFollow(wittyParser.FOLLOW_atom_in_synpred9225);
        this.atom();
        this._fsp--;
        if (this.failed) return ;
        // antlr/witty.g:28:31: ( list )+
        var cnt13=0;
        loop13:
        do {
            var alt13=2;
            var LA13_0 = this.input.LA(1);

            if ( (LA13_0==20) ) {
                alt13=1;
            }


            switch (alt13) {
        	case 1 :
        	    // antlr/witty.g:0:0: list
        	    this.pushFollow(wittyParser.FOLLOW_list_in_synpred9227);
        	    this.list();
        	    this._fsp--;
        	    if (this.failed) return ;


        	    break;

        	default :
        	    if ( cnt13 >= 1 ) {
                    break loop13;
                }
        	    if (this.backtracking>0) {this.failed=true; return ;}
                    var eee = new ANTLR.runtime.EarlyExitException(13, this.input);
                    throw eee;
            }
            cnt13++;
        } while (true);



    },
    // $ANTLR end synpred9,

    // $ANTLR start synpred11
    synpred11_fragment: function() {   
        // antlr/witty.g:36:23: ( empty_list )
        // antlr/witty.g:36:23: empty_list
        this.pushFollow(wittyParser.FOLLOW_empty_list_in_synpred11317);
        this.empty_list();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred11,

    // $ANTLR start synpred12
    synpred12_fragment: function() {   
        // antlr/witty.g:37:25: ( unary_list )
        // antlr/witty.g:37:25: unary_list
        this.pushFollow(wittyParser.FOLLOW_unary_list_in_synpred12345);
        this.unary_list();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred12

    synpred9: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred9_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.failed;
        this.input.rewind(start);
        this.backtracking--;
        this.failed=false;
        return success;
    },
    synpred7: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred7_fragment(); // can never throw exception
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
            "\u0001\u0001\u0004\u0003\u000c\uffff\u0002\u0002",
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
 

// public class variables
ANTLR.lang.augmentObject(wittyParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "OPER", "ID", "INNT", "STRING", "LETTER", "NON_OP", "DIGIT", "ESC_SEQ", "SYMBOLS", "COMMENT", "CR", "WS", "UNICODE_ESC", "OCTAL_ESC", "HEX_DIG", "'('", "')'", "','"],
    FOLLOW_TERM_in_block32: new ANTLR.misc.BitSet([0x000001F0,0x00000000]),
    FOLLOW_stmt_in_block37: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block65: new ANTLR.misc.BitSet([0x000001F0,0x00000000]),
    FOLLOW_stmt_in_block70: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block99: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_EOF_in_block102: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_exp_in_stmt116: new ANTLR.misc.BitSet([0x000001E2,0x00000000]),
    FOLLOW_exp_in_stmt145: new ANTLR.misc.BitSet([0x000001E2,0x00000000]),
    FOLLOW_OPER_in_exp192: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_unary_list_in_exp196: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_applic_in_exp232: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_exp261: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_applic274: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_list_in_applic302: new ANTLR.misc.BitSet([0x00100002,0x00000000]),
    FOLLOW_empty_list_in_list317: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_unary_list_in_list345: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_multi_list_in_list373: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_20_in_empty_list386: new ANTLR.misc.BitSet([0x00200000,0x00000000]),
    FOLLOW_21_in_empty_list388: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_20_in_unary_list401: new ANTLR.misc.BitSet([0x000001F0,0x00000000]),
    FOLLOW_block_in_unary_list403: new ANTLR.misc.BitSet([0x00200000,0x00000000]),
    FOLLOW_21_in_unary_list405: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_20_in_multi_list418: new ANTLR.misc.BitSet([0x000001F0,0x00000000]),
    FOLLOW_block_in_multi_list422: new ANTLR.misc.BitSet([0x00400000,0x00000000]),
    FOLLOW_22_in_multi_list450: new ANTLR.misc.BitSet([0x000001F0,0x00000000]),
    FOLLOW_block_in_multi_list454: new ANTLR.misc.BitSet([0x00600000,0x00000000]),
    FOLLOW_21_in_multi_list461: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_ID_in_atom472: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_INNT_in_atom478: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_STRING_in_atom507: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_OPER_in_atom513: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_OPER_in_synpred7186: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_unary_list_in_synpred7188: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_synpred9225: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_list_in_synpred9227: new ANTLR.misc.BitSet([0x00100002,0x00000000]),
    FOLLOW_empty_list_in_synpred11317: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_unary_list_in_synpred12345: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();