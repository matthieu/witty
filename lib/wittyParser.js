// $ANTLR 3.0.1 antlr/witty.g 2008-07-06 19:54:16

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
    UNICODE_ESC= 17,
    OCTAL_ESC= 18,
    HEX_DIG= 19,
    ID= 6,
    EOF= -1,
    NON_OP= 10,
    NUM= 7,
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

                if ( ((LA6_0>=OPER && LA6_0<=STRING)||LA6_0==20) ) {
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


    // antlr/witty.g:26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( ( atom | unary_list ) ( list )+ )=> applic | atom | unary_list );
    // $ANTLR start exp
    exp: function() {
        var val = null;

        var OPER1 = null;
         var u = null;
         var applic2 = null;
         var atom3 = null;
         var unary_list4 = null;

        try {
            // antlr/witty.g:27:21: ( ( OPER unary_list )=> OPER u= unary_list | ( ( atom | unary_list ) ( list )+ )=> applic | atom | unary_list )
            var alt7=4;
            switch ( this.input.LA(1) ) {
            case OPER:
                var LA7_1 = this.input.LA(2);

                if ( (this.synpred7()) ) {
                    alt7=1;
                }
                else if ( (this.synpred10()) ) {
                    alt7=2;
                }
                else if ( (this.synpred11()) ) {
                    alt7=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( ( atom | unary_list ) ( list )+ )=> applic | atom | unary_list );", 7, 1, this.input);

                    throw nvae;
                }
                break;
            case ID:
                var LA7_2 = this.input.LA(2);

                if ( (this.synpred10()) ) {
                    alt7=2;
                }
                else if ( (this.synpred11()) ) {
                    alt7=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( ( atom | unary_list ) ( list )+ )=> applic | atom | unary_list );", 7, 2, this.input);

                    throw nvae;
                }
                break;
            case NUM:
                var LA7_3 = this.input.LA(2);

                if ( (this.synpred10()) ) {
                    alt7=2;
                }
                else if ( (this.synpred11()) ) {
                    alt7=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( ( atom | unary_list ) ( list )+ )=> applic | atom | unary_list );", 7, 3, this.input);

                    throw nvae;
                }
                break;
            case STRING:
                var LA7_4 = this.input.LA(2);

                if ( (this.synpred10()) ) {
                    alt7=2;
                }
                else if ( (this.synpred11()) ) {
                    alt7=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( ( atom | unary_list ) ( list )+ )=> applic | atom | unary_list );", 7, 4, this.input);

                    throw nvae;
                }
                break;
            case 20:
                var LA7_5 = this.input.LA(2);

                if ( (this.synpred10()) ) {
                    alt7=2;
                }
                else if ( (true) ) {
                    alt7=4;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( ( atom | unary_list ) ( list )+ )=> applic | atom | unary_list );", 7, 5, this.input);

                    throw nvae;
                }
                break;
            default:
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("26:1: exp returns [Object val] : ( ( OPER unary_list )=> OPER u= unary_list | ( ( atom | unary_list ) ( list )+ )=> applic | atom | unary_list );", 7, 0, this.input);

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
                    // antlr/witty.g:28:25: ( ( atom | unary_list ) ( list )+ )=> applic
                    this.pushFollow(wittyParser.FOLLOW_applic_in_exp238);
                    var applic2 = this.applic();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = applic2; 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:29:25: atom
                    this.pushFollow(wittyParser.FOLLOW_atom_in_exp267);
                    var atom3 = this.atom();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = atom3; 
                    }


                    break;
                case 4 :
                    // antlr/witty.g:30:25: unary_list
                    this.pushFollow(wittyParser.FOLLOW_unary_list_in_exp295);
                    var unary_list4 = this.unary_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = unary_list4; 
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


    // antlr/witty.g:32:1: applic returns [Object val] : ( atom | unary_list ) ( list )+ ;
    // $ANTLR start applic
    applic: function() {
        var val = null;

         var atom5 = null;
         var unary_list6 = null;
         var list7 = null;

        try {
            // antlr/witty.g:33:21: ( ( atom | unary_list ) ( list )+ )
            // antlr/witty.g:33:23: ( atom | unary_list ) ( list )+
            // antlr/witty.g:33:23: ( atom | unary_list )
            var alt8=2;
            var LA8_0 = this.input.LA(1);

            if ( ((LA8_0>=OPER && LA8_0<=STRING)) ) {
                alt8=1;
            }
            else if ( (LA8_0==20) ) {
                alt8=2;
            }
            else {
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("33:23: ( atom | unary_list )", 8, 0, this.input);

                throw nvae;
            }
            switch (alt8) {
                case 1 :
                    // antlr/witty.g:33:24: atom
                    this.pushFollow(wittyParser.FOLLOW_atom_in_applic309);
                    var atom5 = this.atom();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = atom5; 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:34:25: unary_list
                    this.pushFollow(wittyParser.FOLLOW_unary_list_in_applic338);
                    var unary_list6 = this.unary_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = unary_list6; 
                    }


                    break;

            }

            // antlr/witty.g:35:23: ( list )+
            var cnt9=0;
            loop9:
            do {
                var alt9=2;
                var LA9_0 = this.input.LA(1);

                if ( (LA9_0==20) ) {
                    var LA9_5 = this.input.LA(2);

                    if ( (this.synpred13()) ) {
                        alt9=1;
                    }


                }


                switch (alt9) {
            	case 1 :
            	    // antlr/witty.g:35:24: list
            	    this.pushFollow(wittyParser.FOLLOW_list_in_applic368);
            	    var list7 = this.list();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val = [val, list7]; val.sntx = 'A'; print("applic " + val); 
            	    }


            	    break;

            	default :
            	    if ( cnt9 >= 1 ) {
                        break loop9;
                    }
            	    if (this.backtracking>0) {this.failed=true; return val;}
                        var eee = new ANTLR.runtime.EarlyExitException(9, this.input);
                        throw eee;
                }
                cnt9++;
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


    // antlr/witty.g:37:1: list returns [Object val] : ( empty_list | unary_list | multi_list );
    // $ANTLR start list
    list: function() {
        var val = null;

         var empty_list8 = null;
         var unary_list9 = null;
         var multi_list10 = null;

        try {
            // antlr/witty.g:38:21: ( empty_list | unary_list | multi_list )
            var alt10=3;
            var LA10_0 = this.input.LA(1);

            if ( (LA10_0==20) ) {
                var LA10_1 = this.input.LA(2);

                if ( (this.synpred14()) ) {
                    alt10=1;
                }
                else if ( (this.synpred15()) ) {
                    alt10=2;
                }
                else if ( (true) ) {
                    alt10=3;
                }
                else {
                    if (this.backtracking>0) {this.failed=true; return val;}
                    var nvae =
                        new ANTLR.runtime.NoViableAltException("37:1: list returns [Object val] : ( empty_list | unary_list | multi_list );", 10, 1, this.input);

                    throw nvae;
                }
            }
            else {
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("37:1: list returns [Object val] : ( empty_list | unary_list | multi_list );", 10, 0, this.input);

                throw nvae;
            }
            switch (alt10) {
                case 1 :
                    // antlr/witty.g:38:23: empty_list
                    this.pushFollow(wittyParser.FOLLOW_empty_list_in_list383);
                    var empty_list8 = this.empty_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = empty_list8; 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:39:25: unary_list
                    this.pushFollow(wittyParser.FOLLOW_unary_list_in_list411);
                    var unary_list9 = this.unary_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = unary_list9; 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:40:25: multi_list
                    this.pushFollow(wittyParser.FOLLOW_multi_list_in_list439);
                    var multi_list10 = this.multi_list();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = multi_list10; 
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


    // antlr/witty.g:42:1: empty_list returns [Object val] : '(' ')' ;
    // $ANTLR start empty_list
    empty_list: function() {
        var val = null;

        try {
            // antlr/witty.g:43:21: ( '(' ')' )
            // antlr/witty.g:43:23: '(' ')'
            this.match(this.input,20,wittyParser.FOLLOW_20_in_empty_list452); if (this.failed) return val;
            this.match(this.input,21,wittyParser.FOLLOW_21_in_empty_list454); if (this.failed) return val;
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


    // antlr/witty.g:45:1: unary_list returns [Object val] : '(' block ')' ;
    // $ANTLR start unary_list
    unary_list: function() {
        var val = null;

         var block11 = null;

        try {
            // antlr/witty.g:46:21: ( '(' block ')' )
            // antlr/witty.g:46:23: '(' block ')'
            this.match(this.input,20,wittyParser.FOLLOW_20_in_unary_list467); if (this.failed) return val;
            this.pushFollow(wittyParser.FOLLOW_block_in_unary_list469);
            var block11 = this.block();
            this._fsp--;
            if (this.failed) return val;
            this.match(this.input,21,wittyParser.FOLLOW_21_in_unary_list471); if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = [block11]; val.sntx = 'B'; 
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


    // antlr/witty.g:48:1: multi_list returns [Object val] : '(' b1= block ( ',' b2= block )+ ')' ;
    // $ANTLR start multi_list
    multi_list: function() {
        var val = null;

         var b1 = null;
         var b2 = null;

        try {
            // antlr/witty.g:49:21: ( '(' b1= block ( ',' b2= block )+ ')' )
            // antlr/witty.g:49:23: '(' b1= block ( ',' b2= block )+ ')'
            this.match(this.input,20,wittyParser.FOLLOW_20_in_multi_list484); if (this.failed) return val;
            this.pushFollow(wittyParser.FOLLOW_block_in_multi_list488);
            var b1 = this.block();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               if (b1) val = [b1]; 
                                                    else val = []; val.sntx = 'L'; 
            }
            // antlr/witty.g:51:24: ( ',' b2= block )+
            var cnt11=0;
            loop11:
            do {
                var alt11=2;
                var LA11_0 = this.input.LA(1);

                if ( (LA11_0==22) ) {
                    alt11=1;
                }


                switch (alt11) {
            	case 1 :
            	    // antlr/witty.g:51:25: ',' b2= block
            	    this.match(this.input,22,wittyParser.FOLLOW_22_in_multi_list516); if (this.failed) return val;
            	    this.pushFollow(wittyParser.FOLLOW_block_in_multi_list520);
            	    var b2 = this.block();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val.push(b2); 
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

            this.match(this.input,21,wittyParser.FOLLOW_21_in_multi_list527); if (this.failed) return val;



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


    // antlr/witty.g:53:1: atom returns [Object val] : ( ID | NUM | STRING | OPER );
    // $ANTLR start atom
    atom: function() {
        var val = null;

        var ID12 = null;
        var NUM13 = null;
        var STRING14 = null;
        var OPER15 = null;

        try {
            // antlr/witty.g:54:21: ( ID | NUM | STRING | OPER )
            var alt12=4;
            switch ( this.input.LA(1) ) {
            case ID:
                alt12=1;
                break;
            case NUM:
                alt12=2;
                break;
            case STRING:
                alt12=3;
                break;
            case OPER:
                alt12=4;
                break;
            default:
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("53:1: atom returns [Object val] : ( ID | NUM | STRING | OPER );", 12, 0, this.input);

                throw nvae;
            }

            switch (alt12) {
                case 1 :
                    // antlr/witty.g:54:23: ID
                    ID12=this.input.LT(1);
                    this.match(this.input,ID,wittyParser.FOLLOW_ID_in_atom538); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = ID12.getText(); 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:54:49: NUM
                    NUM13=this.input.LT(1);
                    this.match(this.input,NUM,wittyParser.FOLLOW_NUM_in_atom544); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = NUM13.getText(); 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:55:25: STRING
                    STRING14=this.input.LT(1);
                    this.match(this.input,STRING,wittyParser.FOLLOW_STRING_in_atom573); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                      val = STRING14.getText(); 
                    }


                    break;
                case 4 :
                    // antlr/witty.g:55:58: OPER
                    OPER15=this.input.LT(1);
                    this.match(this.input,OPER,wittyParser.FOLLOW_OPER_in_atom579); if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = OPER15.getText(); 
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

    // $ANTLR start synpred10
    synpred10_fragment: function() {   
        // antlr/witty.g:28:25: ( ( atom | unary_list ) ( list )+ )
        // antlr/witty.g:28:26: ( atom | unary_list ) ( list )+
        // antlr/witty.g:28:26: ( atom | unary_list )
        var alt14=2;
        var LA14_0 = this.input.LA(1);

        if ( ((LA14_0>=OPER && LA14_0<=STRING)) ) {
            alt14=1;
        }
        else if ( (LA14_0==20) ) {
            alt14=2;
        }
        else {
            if (this.backtracking>0) {this.failed=true; return ;}
            var nvae =
                new ANTLR.runtime.NoViableAltException("28:26: ( atom | unary_list )", 14, 0, this.input);

            throw nvae;
        }
        switch (alt14) {
            case 1 :
                // antlr/witty.g:28:27: atom
                this.pushFollow(wittyParser.FOLLOW_atom_in_synpred10226);
                this.atom();
                this._fsp--;
                if (this.failed) return ;


                break;
            case 2 :
                // antlr/witty.g:28:34: unary_list
                this.pushFollow(wittyParser.FOLLOW_unary_list_in_synpred10230);
                this.unary_list();
                this._fsp--;
                if (this.failed) return ;


                break;

        }

        // antlr/witty.g:28:46: ( list )+
        var cnt15=0;
        loop15:
        do {
            var alt15=2;
            var LA15_0 = this.input.LA(1);

            if ( (LA15_0==20) ) {
                alt15=1;
            }


            switch (alt15) {
        	case 1 :
        	    // antlr/witty.g:0:0: list
        	    this.pushFollow(wittyParser.FOLLOW_list_in_synpred10233);
        	    this.list();
        	    this._fsp--;
        	    if (this.failed) return ;


        	    break;

        	default :
        	    if ( cnt15 >= 1 ) {
                    break loop15;
                }
        	    if (this.backtracking>0) {this.failed=true; return ;}
                    var eee = new ANTLR.runtime.EarlyExitException(15, this.input);
                    throw eee;
            }
            cnt15++;
        } while (true);



    },
    // $ANTLR end synpred10,

    // $ANTLR start synpred11
    synpred11_fragment: function() {   
        // antlr/witty.g:29:25: ( atom )
        // antlr/witty.g:29:25: atom
        this.pushFollow(wittyParser.FOLLOW_atom_in_synpred11267);
        this.atom();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred11,

    // $ANTLR start synpred13
    synpred13_fragment: function() {   
        // antlr/witty.g:35:24: ( list )
        // antlr/witty.g:35:24: list
        this.pushFollow(wittyParser.FOLLOW_list_in_synpred13368);
        this.list();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred13,

    // $ANTLR start synpred14
    synpred14_fragment: function() {   
        // antlr/witty.g:38:23: ( empty_list )
        // antlr/witty.g:38:23: empty_list
        this.pushFollow(wittyParser.FOLLOW_empty_list_in_synpred14383);
        this.empty_list();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred14,

    // $ANTLR start synpred15
    synpred15_fragment: function() {   
        // antlr/witty.g:39:25: ( unary_list )
        // antlr/witty.g:39:25: unary_list
        this.pushFollow(wittyParser.FOLLOW_unary_list_in_synpred15411);
        this.unary_list();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred15

    synpred14: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred14_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.failed;
        this.input.rewind(start);
        this.backtracking--;
        this.failed=false;
        return success;
    },
    synpred15: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred15_fragment(); // can never throw exception
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
    synpred13: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred13_fragment(); // can never throw exception
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
            "\u0001\u0001\u0004\u0003\u000b\uffff\u0001\u0003\u0002\u0002",
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
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "OPER", "ID", "NUM", "STRING", "LETTER", "NON_OP", "DIGIT", "ESC_SEQ", "SYMBOLS", "COMMENT", "CR", "WS", "UNICODE_ESC", "OCTAL_ESC", "HEX_DIG", "'('", "')'", "','"],
    FOLLOW_TERM_in_block32: new ANTLR.misc.BitSet([0x001001F0,0x00000000]),
    FOLLOW_stmt_in_block37: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block65: new ANTLR.misc.BitSet([0x001001F0,0x00000000]),
    FOLLOW_stmt_in_block70: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block99: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_EOF_in_block102: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_exp_in_stmt116: new ANTLR.misc.BitSet([0x001001E2,0x00000000]),
    FOLLOW_exp_in_stmt145: new ANTLR.misc.BitSet([0x001001E2,0x00000000]),
    FOLLOW_OPER_in_exp192: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_unary_list_in_exp196: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_applic_in_exp238: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_exp267: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_unary_list_in_exp295: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_applic309: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_unary_list_in_applic338: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_list_in_applic368: new ANTLR.misc.BitSet([0x00100002,0x00000000]),
    FOLLOW_empty_list_in_list383: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_unary_list_in_list411: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_multi_list_in_list439: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_20_in_empty_list452: new ANTLR.misc.BitSet([0x00200000,0x00000000]),
    FOLLOW_21_in_empty_list454: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_20_in_unary_list467: new ANTLR.misc.BitSet([0x001001F0,0x00000000]),
    FOLLOW_block_in_unary_list469: new ANTLR.misc.BitSet([0x00200000,0x00000000]),
    FOLLOW_21_in_unary_list471: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_20_in_multi_list484: new ANTLR.misc.BitSet([0x001001F0,0x00000000]),
    FOLLOW_block_in_multi_list488: new ANTLR.misc.BitSet([0x00400000,0x00000000]),
    FOLLOW_22_in_multi_list516: new ANTLR.misc.BitSet([0x001001F0,0x00000000]),
    FOLLOW_block_in_multi_list520: new ANTLR.misc.BitSet([0x00600000,0x00000000]),
    FOLLOW_21_in_multi_list527: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_ID_in_atom538: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_NUM_in_atom544: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_STRING_in_atom573: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_OPER_in_atom579: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_OPER_in_synpred7186: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_unary_list_in_synpred7188: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_in_synpred10226: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_unary_list_in_synpred10230: new ANTLR.misc.BitSet([0x00100000,0x00000000]),
    FOLLOW_list_in_synpred10233: new ANTLR.misc.BitSet([0x00100002,0x00000000]),
    FOLLOW_atom_in_synpred11267: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_list_in_synpred13368: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_empty_list_in_synpred14383: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_unary_list_in_synpred15411: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();