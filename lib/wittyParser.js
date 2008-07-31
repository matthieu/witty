// $ANTLR 3.0.1 antlr/witty.g 2008-07-28 20:59:56

  Applic = function() { var na = Array.prototype.slice.call(arguments); na.sntx = 'A'; return na; }
  Block = function() { var na = Array.prototype.slice.call(arguments); na.sntx = 'B'; return na; }
  List = function() { var na = Array.prototype.slice.call(arguments); na.sntx = 'L'; return na; }


var wittyParser = function(input) {
    wittyParser.superclass.constructor.call(this, input);

    this.dfa3 = new wittyParser.DFA3(this);
    this.dfa10 = new wittyParser.DFA10(this);
    var ruleMemo = {};
     /* @todo only create adaptor if output=AST */
    this.adaptor = new ANTLR.runtime.tree.CommonTreeAdaptor();

};

(function(){
// public class variables
var TERM= 4,
    LETTER= 12,
    UNICODE_ESC= 18,
    OCTAL_ESC= 19,
    HEX_DIG= 20,
    ID= 10,
    EOF= -1,
    NON_OP= 13,
    NUM= 8,
    OPER= 6,
    WS= 5,
    ESC_SEQ= 15,
    DIGIT= 14,
    SYMBOLS= 11,
    UNARY= 7,
    COMMENT= 17,
    CR= 16,
    STRING= 9;

// public instance methods/vars
ANTLR.lang.extend(wittyParser, ANTLR.runtime.Parser, {
        

    getTokenNames: function() { return wittyParser.tokenNames; },
    getGrammarFileName: function() { return "antlr/witty.g"; },


    // antlr/witty.g:12:1: block returns [Object val] : ( TERM )* s1= stmt ( ( TERM )+ s2= stmt )* ( TERM )* ( EOF )? ;
    // $ANTLR start block
    block: function() {
        var val = null;

         var s1 = null;
         var s2 = null;

        try {
            // antlr/witty.g:13:21: ( ( TERM )* s1= stmt ( ( TERM )+ s2= stmt )* ( TERM )* ( EOF )? )
            // antlr/witty.g:13:23: ( TERM )* s1= stmt ( ( TERM )+ s2= stmt )* ( TERM )* ( EOF )?
            // antlr/witty.g:13:23: ( TERM )*
            loop1:
            do {
                var alt1=2;
                var LA1_0 = this.input.LA(1);

                if ( (LA1_0==TERM) ) {
                    alt1=1;
                }


                switch (alt1) {
            	case 1 :
            	    // antlr/witty.g:13:23: TERM
            	    this.match(this.input,TERM,wittyParser.FOLLOW_TERM_in_block30); if (this.failed) return val;


            	    break;

            	default :
            	    break loop1;
                }
            } while (true);

            this.pushFollow(wittyParser.FOLLOW_stmt_in_block58);
            var s1 = this.stmt();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               if (s1 instanceof Array && s1.sntx != 'A') val = Block(s1);
                                              else val = s1; var first = true; 
            }
            // antlr/witty.g:16:23: ( ( TERM )+ s2= stmt )*
            loop3:
            do {
                var alt3=2;
                alt3 = this.dfa3.predict(this.input);
                switch (alt3) {
            	case 1 :
            	    // antlr/witty.g:16:24: ( TERM )+ s2= stmt
            	    // antlr/witty.g:16:24: ( TERM )+
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
            	    	    // antlr/witty.g:16:24: TERM
            	    	    this.match(this.input,TERM,wittyParser.FOLLOW_TERM_in_block85); if (this.failed) return val;


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

            	    this.pushFollow(wittyParser.FOLLOW_stmt_in_block90);
            	    var s2 = this.stmt();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       if (first) val = Block(val, Block(s2));
            	                                             else val.push(Block(s2)); 
            	    }


            	    break;

            	default :
            	    break loop3;
                }
            } while (true);

            // antlr/witty.g:18:23: ( TERM )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0==TERM) ) {
                    alt4=1;
                }


                switch (alt4) {
            	case 1 :
            	    // antlr/witty.g:18:23: TERM
            	    this.match(this.input,TERM,wittyParser.FOLLOW_TERM_in_block119); if (this.failed) return val;


            	    break;

            	default :
            	    break loop4;
                }
            } while (true);

            // antlr/witty.g:18:29: ( EOF )?
            var alt5=2;
            var LA5_0 = this.input.LA(1);

            if ( (LA5_0==EOF) ) {
                alt5=1;
            }
            switch (alt5) {
                case 1 :
                    // antlr/witty.g:18:29: EOF
                    this.match(this.input,EOF,wittyParser.FOLLOW_EOF_in_block122); if (this.failed) return val;


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


    // antlr/witty.g:20:1: stmt returns [Object val] : ( WS )* as= assoc ( WS )* ;
    // $ANTLR start stmt
    stmt: function() {
        var val = null;

         var as = null;

        try {
            // antlr/witty.g:21:21: ( ( WS )* as= assoc ( WS )* )
            // antlr/witty.g:21:23: ( WS )* as= assoc ( WS )*
            // antlr/witty.g:21:23: ( WS )*
            loop6:
            do {
                var alt6=2;
                var LA6_0 = this.input.LA(1);

                if ( (LA6_0==WS) ) {
                    alt6=1;
                }


                switch (alt6) {
            	case 1 :
            	    // antlr/witty.g:21:23: WS
            	    this.match(this.input,WS,wittyParser.FOLLOW_WS_in_stmt134); if (this.failed) return val;


            	    break;

            	default :
            	    break loop6;
                }
            } while (true);

            this.pushFollow(wittyParser.FOLLOW_assoc_in_stmt139);
            var as = this.assoc();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = as; 
            }
            // antlr/witty.g:21:56: ( WS )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0==WS) ) {
                    alt7=1;
                }


                switch (alt7) {
            	case 1 :
            	    // antlr/witty.g:21:56: WS
            	    this.match(this.input,WS,wittyParser.FOLLOW_WS_in_stmt143); if (this.failed) return val;


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
        return val;
    },


    // antlr/witty.g:23:1: assoc returns [Object val] : (p= parens_assoc | am= atom_assoc );
    // $ANTLR start assoc
    assoc: function() {
        var val = null;

         var p = null;
         var am = null;

        try {
            // antlr/witty.g:24:21: (p= parens_assoc | am= atom_assoc )
            var alt8=2;
            var LA8_0 = this.input.LA(1);

            if ( (LA8_0==21) ) {
                alt8=1;
            }
            else if ( ((LA8_0>=OPER && LA8_0<=ID)) ) {
                alt8=2;
            }
            else {
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("23:1: assoc returns [Object val] : (p= parens_assoc | am= atom_assoc );", 8, 0, this.input);

                throw nvae;
            }
            switch (alt8) {
                case 1 :
                    // antlr/witty.g:24:23: p= parens_assoc
                    this.pushFollow(wittyParser.FOLLOW_parens_assoc_in_assoc158);
                    var p = this.parens_assoc();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = p; 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:25:25: am= atom_assoc
                    this.pushFollow(wittyParser.FOLLOW_atom_assoc_in_assoc189);
                    var am = this.atom_assoc();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = am; 
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


    // antlr/witty.g:27:1: parens_assoc returns [Object val] : '(' s1= stmt ')' (op= ( OPER | UNARY ) s2= stmt )? ;
    // $ANTLR start parens_assoc
    parens_assoc: function() {
        var val = null;

        var op = null;
         var s1 = null;
         var s2 = null;

        try {
            // antlr/witty.g:28:21: ( '(' s1= stmt ')' (op= ( OPER | UNARY ) s2= stmt )? )
            // antlr/witty.g:28:23: '(' s1= stmt ')' (op= ( OPER | UNARY ) s2= stmt )?
            this.match(this.input,21,wittyParser.FOLLOW_21_in_parens_assoc202); if (this.failed) return val;
            this.pushFollow(wittyParser.FOLLOW_stmt_in_parens_assoc206);
            var s1 = this.stmt();
            this._fsp--;
            if (this.failed) return val;
            this.match(this.input,22,wittyParser.FOLLOW_22_in_parens_assoc208); if (this.failed) return val;
            // antlr/witty.g:28:39: (op= ( OPER | UNARY ) s2= stmt )?
            var alt9=2;
            var LA9_0 = this.input.LA(1);

            if ( ((LA9_0>=OPER && LA9_0<=UNARY)) ) {
                alt9=1;
            }
            switch (alt9) {
                case 1 :
                    // antlr/witty.g:28:40: op= ( OPER | UNARY ) s2= stmt
                    op=this.input.LT(1);
                    if ( (this.input.LA(1)>=OPER && this.input.LA(1)<=UNARY) ) {
                        this.input.consume();
                        this.errorRecovery=false;this.failed=false;
                    }
                    else {
                        if (this.backtracking>0) {this.failed=true; return val;}
                        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                        this.recoverFromMismatchedSet(this.input,mse,wittyParser.FOLLOW_set_in_parens_assoc213);    throw mse;
                    }

                    this.pushFollow(wittyParser.FOLLOW_stmt_in_parens_assoc223);
                    var s2 = this.stmt();
                    this._fsp--;
                    if (this.failed) return val;


                    break;

            }

            if ( this.backtracking===0 ) {
               val = (s2 || s2 == 0) ? [Block(s1), op.getText(), s2] : Block(s1); 
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


    // antlr/witty.g:31:1: atom_assoc returns [Object val] : ( ( UNARY applic )=>u1= UNARY p1= applic | ( applic )=>p2= applic | ( UNARY atom )=>u2= UNARY a1= atom | a2= atom ) (op= ( OPER | UNARY ) stmt )? ;
    // $ANTLR start atom_assoc
    atom_assoc: function() {
        var val = null;

        var u1 = null;
        var u2 = null;
        var op = null;
         var p1 = null;
         var p2 = null;
         var a1 = null;
         var a2 = null;
         var stmt1 = null;

        try {
            // antlr/witty.g:32:21: ( ( ( UNARY applic )=>u1= UNARY p1= applic | ( applic )=>p2= applic | ( UNARY atom )=>u2= UNARY a1= atom | a2= atom ) (op= ( OPER | UNARY ) stmt )? )
            // antlr/witty.g:32:23: ( ( UNARY applic )=>u1= UNARY p1= applic | ( applic )=>p2= applic | ( UNARY atom )=>u2= UNARY a1= atom | a2= atom ) (op= ( OPER | UNARY ) stmt )?
            // antlr/witty.g:32:23: ( ( UNARY applic )=>u1= UNARY p1= applic | ( applic )=>p2= applic | ( UNARY atom )=>u2= UNARY a1= atom | a2= atom )
            var alt10=4;
            alt10 = this.dfa10.predict(this.input);
            switch (alt10) {
                case 1 :
                    // antlr/witty.g:32:24: ( UNARY applic )=>u1= UNARY p1= applic
                    u1=this.input.LT(1);
                    this.match(this.input,UNARY,wittyParser.FOLLOW_UNARY_in_atom_assoc272); if (this.failed) return val;
                    this.pushFollow(wittyParser.FOLLOW_applic_in_atom_assoc276);
                    var p1 = this.applic();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = Applic(u1.getText(), List(p1)); 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:33:25: ( applic )=>p2= applic
                    this.pushFollow(wittyParser.FOLLOW_applic_in_atom_assoc310);
                    var p2 = this.applic();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = p2; 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:34:25: ( UNARY atom )=>u2= UNARY a1= atom
                    u2=this.input.LT(1);
                    this.match(this.input,UNARY,wittyParser.FOLLOW_UNARY_in_atom_assoc346); if (this.failed) return val;
                    this.pushFollow(wittyParser.FOLLOW_atom_in_atom_assoc350);
                    var a1 = this.atom();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = Applic(u2.getText(), List(a1)); 
                    }


                    break;
                case 4 :
                    // antlr/witty.g:35:25: a2= atom
                    this.pushFollow(wittyParser.FOLLOW_atom_in_atom_assoc380);
                    var a2 = this.atom();
                    this._fsp--;
                    if (this.failed) return val;


                    break;

            }

            if ( this.backtracking===0 ) {
               if(!val) val = a2; 
            }
            // antlr/witty.g:36:23: (op= ( OPER | UNARY ) stmt )?
            var alt11=2;
            var LA11_0 = this.input.LA(1);

            if ( ((LA11_0>=OPER && LA11_0<=UNARY)) ) {
                alt11=1;
            }
            switch (alt11) {
                case 1 :
                    // antlr/witty.g:36:24: op= ( OPER | UNARY ) stmt
                    op=this.input.LT(1);
                    if ( (this.input.LA(1)>=OPER && this.input.LA(1)<=UNARY) ) {
                        this.input.consume();
                        this.errorRecovery=false;this.failed=false;
                    }
                    else {
                        if (this.backtracking>0) {this.failed=true; return val;}
                        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                        this.recoverFromMismatchedSet(this.input,mse,wittyParser.FOLLOW_set_in_atom_assoc410);    throw mse;
                    }

                    this.pushFollow(wittyParser.FOLLOW_stmt_in_atom_assoc418);
                    var stmt1 = this.stmt();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = [val, op.getText(), stmt1]; 
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


    // antlr/witty.g:38:1: atom returns [Object val] : (a= ( NUM | STRING ) | tokn );
    // $ANTLR start atom
    atom: function() {
        var val = null;

        var a = null;
         var tokn2 = null;

        try {
            // antlr/witty.g:39:22: (a= ( NUM | STRING ) | tokn )
            var alt12=2;
            var LA12_0 = this.input.LA(1);

            if ( ((LA12_0>=NUM && LA12_0<=STRING)) ) {
                alt12=1;
            }
            else if ( ((LA12_0>=OPER && LA12_0<=UNARY)||LA12_0==ID) ) {
                alt12=2;
            }
            else {
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("38:1: atom returns [Object val] : (a= ( NUM | STRING ) | tokn );", 12, 0, this.input);

                throw nvae;
            }
            switch (alt12) {
                case 1 :
                    // antlr/witty.g:39:24: a= ( NUM | STRING )
                    a=this.input.LT(1);
                    if ( (this.input.LA(1)>=NUM && this.input.LA(1)<=STRING) ) {
                        this.input.consume();
                        this.errorRecovery=false;this.failed=false;
                    }
                    else {
                        if (this.backtracking>0) {this.failed=true; return val;}
                        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                        this.recoverFromMismatchedSet(this.input,mse,wittyParser.FOLLOW_set_in_atom437);    throw mse;
                    }

                    if ( this.backtracking===0 ) {
                       val = a.getText(); 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:40:27: tokn
                    this.pushFollow(wittyParser.FOLLOW_tokn_in_atom474);
                    var tokn2 = this.tokn();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = this.input.toString(tokn2.start,tokn2.stop); 
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


    // antlr/witty.g:42:1: applic returns [Object val] : tokn ( '(' (b1= block )? ( ',' b2= block )* ')' )+ ;
    // $ANTLR start applic
    applic: function() {
        var val = null;

         var b1 = null;
         var b2 = null;
         var tokn3 = null;

        try {
            // antlr/witty.g:43:21: ( tokn ( '(' (b1= block )? ( ',' b2= block )* ')' )+ )
            // antlr/witty.g:43:23: tokn ( '(' (b1= block )? ( ',' b2= block )* ')' )+
            this.pushFollow(wittyParser.FOLLOW_tokn_in_applic487);
            var tokn3 = this.tokn();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = Applic(tokn3.val); var first = true; 
            }
            // antlr/witty.g:44:23: ( '(' (b1= block )? ( ',' b2= block )* ')' )+
            var cnt15=0;
            loop15:
            do {
                var alt15=2;
                var LA15_0 = this.input.LA(1);

                if ( (LA15_0==21) ) {
                    alt15=1;
                }


                switch (alt15) {
            	case 1 :
            	    // antlr/witty.g:44:25: '(' (b1= block )? ( ',' b2= block )* ')'
            	    if ( this.backtracking===0 ) {
            	       if (first) first = false; else val = Applic(val); 
            	    }
            	    this.match(this.input,21,wittyParser.FOLLOW_21_in_applic542); if (this.failed) return val;
            	    // antlr/witty.g:45:29: (b1= block )?
            	    var alt13=2;
            	    var LA13_0 = this.input.LA(1);

            	    if ( ((LA13_0>=TERM && LA13_0<=ID)||LA13_0==21) ) {
            	        alt13=1;
            	    }
            	    switch (alt13) {
            	        case 1 :
            	            // antlr/witty.g:45:30: b1= block
            	            this.pushFollow(wittyParser.FOLLOW_block_in_applic547);
            	            var b1 = this.block();
            	            this._fsp--;
            	            if (this.failed) return val;
            	            if ( this.backtracking===0 ) {
            	               val.push(List(b1)); 
            	            }


            	            break;

            	    }

            	    // antlr/witty.g:46:29: ( ',' b2= block )*
            	    loop14:
            	    do {
            	        var alt14=2;
            	        var LA14_0 = this.input.LA(1);

            	        if ( (LA14_0==23) ) {
            	            alt14=1;
            	        }


            	        switch (alt14) {
            	    	case 1 :
            	    	    // antlr/witty.g:46:30: ',' b2= block
            	    	    this.match(this.input,23,wittyParser.FOLLOW_23_in_applic584); if (this.failed) return val;
            	    	    this.pushFollow(wittyParser.FOLLOW_block_in_applic588);
            	    	    var b2 = this.block();
            	    	    this._fsp--;
            	    	    if (this.failed) return val;
            	    	    if ( this.backtracking===0 ) {
            	    	       val[1].push(b2); 
            	    	    }


            	    	    break;

            	    	default :
            	    	    break loop14;
            	        }
            	    } while (true);

            	    this.match(this.input,22,wittyParser.FOLLOW_22_in_applic595); if (this.failed) return val;


            	    break;

            	default :
            	    if ( cnt15 >= 1 ) {
                        break loop15;
                    }
            	    if (this.backtracking>0) {this.failed=true; return val;}
                        var eee = new ANTLR.runtime.EarlyExitException(15, this.input);
                        throw eee;
                }
                cnt15++;
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

    // inline static return class
    tokn_return: (function() {
        wittyParser.tokn_return = function(){};
        ANTLR.lang.extend(wittyParser.tokn_return,
                          ANTLR.runtime.ParserRuleReturnScope,
        {
        });
        return;
    })(),

    // antlr/witty.g:48:1: tokn returns [Object val] : t= ( ID | OPER | UNARY ) ;
    // $ANTLR start tokn
    tokn: function() {
        var retval = new wittyParser.tokn_return();
        retval.start = this.input.LT(1);

        var t = null;

        try {
            // antlr/witty.g:49:21: (t= ( ID | OPER | UNARY ) )
            // antlr/witty.g:49:23: t= ( ID | OPER | UNARY )
            t=this.input.LT(1);
            if ( (this.input.LA(1)>=OPER && this.input.LA(1)<=UNARY)||this.input.LA(1)==ID ) {
                this.input.consume();
                this.errorRecovery=false;this.failed=false;
            }
            else {
                if (this.backtracking>0) {this.failed=true; return retval;}
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recoverFromMismatchedSet(this.input,mse,wittyParser.FOLLOW_set_in_tokn611);    throw mse;
            }

            if ( this.backtracking===0 ) {
               retval.val = t.getText(); 
            }



            retval.stop = this.input.LT(-1);

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
        return retval;
    },

    // $ANTLR start synpred1
    synpred1_fragment: function() {   
        // antlr/witty.g:32:24: ( UNARY applic )
        // antlr/witty.g:32:25: UNARY applic
        this.match(this.input,UNARY,wittyParser.FOLLOW_UNARY_in_synpred1265); if (this.failed) return ;
        this.pushFollow(wittyParser.FOLLOW_applic_in_synpred1267);
        this.applic();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred1,

    // $ANTLR start synpred2
    synpred2_fragment: function() {   
        // antlr/witty.g:33:25: ( applic )
        // antlr/witty.g:33:26: applic
        this.pushFollow(wittyParser.FOLLOW_applic_in_synpred2305);
        this.applic();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred2,

    // $ANTLR start synpred3
    synpred3_fragment: function() {   
        // antlr/witty.g:34:25: ( UNARY atom )
        // antlr/witty.g:34:26: UNARY atom
        this.match(this.input,UNARY,wittyParser.FOLLOW_UNARY_in_synpred3339); if (this.failed) return ;
        this.pushFollow(wittyParser.FOLLOW_atom_in_synpred3341);
        this.atom();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred3

    synpred1: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred1_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.failed;
        this.input.rewind(start);
        this.backtracking--;
        this.failed=false;
        return success;
    },
    synpred2: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred2_fragment(); // can never throw exception
        } catch (re) {
            alert("impossible: "+re.toString());
        }
        var success = !this.failed;
        this.input.rewind(start);
        this.backtracking--;
        this.failed=false;
        return success;
    },
    synpred3: function() {
        this.backtracking++;
        var start = this.input.mark();
        try {
            this.synpred3_fragment(); // can never throw exception
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
        "\u0002\u0017\u0002\uffff",
    DFA3_acceptS:
        "\u0002\uffff\u0001\u0002\u0001\u0001",
    DFA3_specialS:
        "\u0004\uffff}>",
    DFA3_transitionS: [
            "\u0001\u0001\u0011\uffff\u0002\u0002",
            "\u0001\u0001\u0006\u0003\u000a\uffff\u0001\u0003\u0002\u0002",
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
        return "()* loopback of 16:23: ( ( TERM )+ s2= stmt )*";
    },
    dummy: null
});
ANTLR.lang.augmentObject(wittyParser, {
    DFA10_eotS:
        "\u0025\uffff",
    DFA10_eofS:
        "\u0001\uffff\u0002\u0003\u0002\uffff\u0002\u000b\u0001\uffff\u0001"+
    "\u0003\u0001\u000b\u0005\uffff\u0001\u0003\u0015\uffff",
    DFA10_minS:
        "\u0001\u0006\u0002\u0004\u0002\uffff\u0002\u0004\u0001\uffff\u0002"+
    "\u0004\u0004\uffff\u0002\u0004\u0003\uffff\u000b\u0000\u0003\uffff\u0002"+
    "\u0000\u0002\uffff",
    DFA10_maxS:
        "\u0001\u000a\u0002\u0017\u0002\uffff\u0002\u0017\u0001\uffff\u0002"+
    "\u0017\u0004\uffff\u0002\u0017\u0003\uffff\u000b\u0000\u0003\uffff\u0002"+
    "\u0000\u0002\uffff",
    DFA10_acceptS:
        "\u0003\uffff\u0001\u0004\u0001\u0002\u0002\uffff\u0001\u0003\u0002"+
    "\uffff\u0004\u0003\u0002\uffff\u0002\u0003\u0001\u0001\u000b\uffff\u0003"+
    "\u0001\u0002\uffff\u0002\u0003",
    DFA10_specialS:
        "\u0001\uffff\u0001\u0003\u0001\u0006\u0002\uffff\u0001\u0000\u0001"+
    "\u0005\u0002\uffff\u0001\u0001\u0004\uffff\u0001\u0004\u0001\u0002\u0015"+
    "\uffff}>",
    DFA10_transitionS: [
            "\u0001\u0002\u0001\u0001\u0002\u0003\u0001\u0002",
            "\u0002\u0003\u0002\u0005\u0002\u0007\u0001\u0006\u000a\uffff"+
            "\u0001\u0004\u0002\u0003",
            "\u0004\u0003\u000d\uffff\u0001\u0004\u0002\u0003",
            "",
            "",
            "\u0001\u000a\u0001\u0009\u0001\u000f\u0001\u0008\u0003\u0003"+
            "\u000a\uffff\u0001\u000e\u0001\u000d\u0001\u000c",
            "\u0001\u000a\u0001\u0011\u0002\u0010\u000d\uffff\u0001\u0012"+
            "\u0001\u000d\u0001\u000c",
            "",
            "\u0001\u0003\u0001\u0016\u0001\u0018\u0001\u0014\u0002\u0013"+
            "\u0001\u0015\u000a\uffff\u0001\u0017\u0002\u0003",
            "\u0001\u000a\u0001\u0009\u0005\u0003\u000a\uffff\u0001\u0003"+
            "\u0001\u000d\u0001\u000c",
            "",
            "",
            "",
            "",
            "\u0001\u001e\u0001\u0019\u0001\u001c\u0001\u001b\u0002\u001d"+
            "\u0001\u001c\u000a\uffff\u0001\u001a\u0001\u0020\u0001\u001f",
            "\u0001\u0003\u0001\u0016\u0001\u0022\u0001\u0021\u0002\u0024"+
            "\u0001\u0023\u000a\uffff\u0001\u0017\u0002\u0003",
            "",
            "",
            "",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "",
            "",
            "",
            "\u0001\uffff",
            "\u0001\uffff",
            "",
            ""
    ]
});
    
ANTLR.lang.augmentObject(wittyParser, {
    DFA10_eot:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA10_eotS),
    DFA10_eof:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA10_eofS),
    DFA10_min:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyParser.DFA10_minS),
    DFA10_max:
        ANTLR.runtime.DFA.unpackEncodedStringToUnsignedChars(wittyParser.DFA10_maxS),
    DFA10_accept:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA10_acceptS),
    DFA10_special:
        ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA10_specialS),
    DFA10_transition: (function() {
        var a = [],
            i,
            numStates = wittyParser.DFA10_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(ANTLR.runtime.DFA.unpackEncodedString(wittyParser.DFA10_transitionS[i]));
        }
        return a;
    })()
});

wittyParser.DFA10 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 10;
    this.eot = wittyParser.DFA10_eot;
    this.eof = wittyParser.DFA10_eof;
    this.min = wittyParser.DFA10_min;
    this.max = wittyParser.DFA10_max;
    this.accept = wittyParser.DFA10_accept;
    this.special = wittyParser.DFA10_special;
    this.transition = wittyParser.DFA10_transition;
};

ANTLR.lang.extend(wittyParser.DFA10, ANTLR.runtime.DFA, {
    getDescription: function() {
        return "32:23: ( ( UNARY applic )=>u1= UNARY p1= applic | ( applic )=>p2= applic | ( UNARY atom )=>u2= UNARY a1= atom | a2= atom )";
    },
    specialStateTransition: function(s, input) {
    	var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA10_5 = input.LA(1);

                             
                            var index10_5 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_5==UNARY) ) {s = 8;}

                            else if ( (LA10_5==WS) ) {s = 9;}

                            else if ( (LA10_5==TERM) && (this.synpred3())) {s = 10;}

                            else if ( (LA10_5==EOF) && (this.synpred3())) {s = 11;}

                            else if ( (LA10_5==23) && (this.synpred3())) {s = 12;}

                            else if ( (LA10_5==22) && (this.synpred3())) {s = 13;}

                            else if ( (LA10_5==21) ) {s = 14;}

                            else if ( (LA10_5==OPER) ) {s = 15;}

                            else if ( ((LA10_5>=NUM && LA10_5<=ID)) ) {s = 3;}

                             
                            input.seek(index10_5);
                            if ( s>=0 ) return s;
                            break;
                        case 1 : 
                            var LA10_9 = input.LA(1);

                             
                            var index10_9 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_9==TERM) && (this.synpred3())) {s = 10;}

                            else if ( (LA10_9==EOF) && (this.synpred3())) {s = 11;}

                            else if ( (LA10_9==23) && (this.synpred3())) {s = 12;}

                            else if ( (LA10_9==22) && (this.synpred3())) {s = 13;}

                            else if ( (LA10_9==WS) ) {s = 9;}

                            else if ( ((LA10_9>=OPER && LA10_9<=ID)||LA10_9==21) ) {s = 3;}

                             
                            input.seek(index10_9);
                            if ( s>=0 ) return s;
                            break;
                        case 2 : 
                            var LA10_15 = input.LA(1);

                             
                            var index10_15 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_15==UNARY) ) {s = 33;}

                            else if ( (LA10_15==WS) ) {s = 22;}

                            else if ( (LA10_15==EOF||LA10_15==TERM||(LA10_15>=22 && LA10_15<=23)) ) {s = 3;}

                            else if ( (LA10_15==21) ) {s = 23;}

                            else if ( (LA10_15==OPER) ) {s = 34;}

                            else if ( (LA10_15==ID) && (this.synpred3())) {s = 35;}

                            else if ( ((LA10_15>=NUM && LA10_15<=STRING)) && (this.synpred3())) {s = 36;}

                             
                            input.seek(index10_15);
                            if ( s>=0 ) return s;
                            break;
                        case 3 : 
                            var LA10_1 = input.LA(1);

                             
                            var index10_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_1==21) && (this.synpred2())) {s = 4;}

                            else if ( ((LA10_1>=OPER && LA10_1<=UNARY)) ) {s = 5;}

                            else if ( (LA10_1==ID) ) {s = 6;}

                            else if ( (LA10_1==EOF||(LA10_1>=TERM && LA10_1<=WS)||(LA10_1>=22 && LA10_1<=23)) ) {s = 3;}

                            else if ( ((LA10_1>=NUM && LA10_1<=STRING)) && (this.synpred3())) {s = 7;}

                             
                            input.seek(index10_1);
                            if ( s>=0 ) return s;
                            break;
                        case 4 : 
                            var LA10_14 = input.LA(1);

                             
                            var index10_14 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_14==WS) ) {s = 25;}

                            else if ( (LA10_14==21) ) {s = 26;}

                            else if ( (LA10_14==UNARY) ) {s = 27;}

                            else if ( (LA10_14==OPER||LA10_14==ID) ) {s = 28;}

                            else if ( ((LA10_14>=NUM && LA10_14<=STRING)) ) {s = 29;}

                            else if ( (LA10_14==TERM) && (this.synpred1())) {s = 30;}

                            else if ( (LA10_14==23) && (this.synpred1())) {s = 31;}

                            else if ( (LA10_14==22) && (this.synpred1())) {s = 32;}

                             
                            input.seek(index10_14);
                            if ( s>=0 ) return s;
                            break;
                        case 5 : 
                            var LA10_6 = input.LA(1);

                             
                            var index10_6 = input.index();
                            input.rewind();
                            s = -1;
                            if ( ((LA10_6>=OPER && LA10_6<=UNARY)) && (this.synpred3())) {s = 16;}

                            else if ( (LA10_6==WS) && (this.synpred3())) {s = 17;}

                            else if ( (LA10_6==TERM) && (this.synpred3())) {s = 10;}

                            else if ( (LA10_6==EOF) && (this.synpred3())) {s = 11;}

                            else if ( (LA10_6==23) && (this.synpred3())) {s = 12;}

                            else if ( (LA10_6==22) && (this.synpred3())) {s = 13;}

                            else if ( (LA10_6==21) && (this.synpred1())) {s = 18;}

                             
                            input.seek(index10_6);
                            if ( s>=0 ) return s;
                            break;
                        case 6 : 
                            var LA10_2 = input.LA(1);

                             
                            var index10_2 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_2==21) && (this.synpred2())) {s = 4;}

                            else if ( (LA10_2==EOF||(LA10_2>=TERM && LA10_2<=UNARY)||(LA10_2>=22 && LA10_2<=23)) ) {s = 3;}

                             
                            input.seek(index10_2);
                            if ( s>=0 ) return s;
                            break;
            }
        }).call(this.recognizer, s, input);
        if (!ANTLR.lang.isUndefined(retval)) {
            return retval;
        }
        if (this.recognizer.backtracking>0) {this.recognizer.failed=true; return -1;}
        var nvae =
            new ANTLR.runtime.NoViableAltException(this.getDescription(), 10, _s, input);
        this.error(nvae);
        throw nvae;
    },
    dummy: null
});
 

// public class variables
ANTLR.lang.augmentObject(wittyParser, {
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "WS", "OPER", "UNARY", "NUM", "STRING", "ID", "SYMBOLS", "LETTER", "NON_OP", "DIGIT", "ESC_SEQ", "CR", "COMMENT", "UNICODE_ESC", "OCTAL_ESC", "HEX_DIG", "'('", "')'", "','"],
    FOLLOW_TERM_in_block30: new ANTLR.misc.BitSet([0x002007F0,0x00000000]),
    FOLLOW_stmt_in_block58: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block85: new ANTLR.misc.BitSet([0x002007F0,0x00000000]),
    FOLLOW_stmt_in_block90: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block119: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_EOF_in_block122: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_WS_in_stmt134: new ANTLR.misc.BitSet([0x002007E0,0x00000000]),
    FOLLOW_assoc_in_stmt139: new ANTLR.misc.BitSet([0x00000022,0x00000000]),
    FOLLOW_WS_in_stmt143: new ANTLR.misc.BitSet([0x00000022,0x00000000]),
    FOLLOW_parens_assoc_in_assoc158: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_assoc_in_assoc189: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_21_in_parens_assoc202: new ANTLR.misc.BitSet([0x002007E0,0x00000000]),
    FOLLOW_stmt_in_parens_assoc206: new ANTLR.misc.BitSet([0x00400000,0x00000000]),
    FOLLOW_22_in_parens_assoc208: new ANTLR.misc.BitSet([0x000000C2,0x00000000]),
    FOLLOW_set_in_parens_assoc213: new ANTLR.misc.BitSet([0x002007E0,0x00000000]),
    FOLLOW_stmt_in_parens_assoc223: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_UNARY_in_atom_assoc272: new ANTLR.misc.BitSet([0x000004C0,0x00000000]),
    FOLLOW_applic_in_atom_assoc276: new ANTLR.misc.BitSet([0x000000C2,0x00000000]),
    FOLLOW_applic_in_atom_assoc310: new ANTLR.misc.BitSet([0x000000C2,0x00000000]),
    FOLLOW_UNARY_in_atom_assoc346: new ANTLR.misc.BitSet([0x000007C0,0x00000000]),
    FOLLOW_atom_in_atom_assoc350: new ANTLR.misc.BitSet([0x000000C2,0x00000000]),
    FOLLOW_atom_in_atom_assoc380: new ANTLR.misc.BitSet([0x000000C2,0x00000000]),
    FOLLOW_set_in_atom_assoc410: new ANTLR.misc.BitSet([0x002007E0,0x00000000]),
    FOLLOW_stmt_in_atom_assoc418: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_set_in_atom437: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_tokn_in_atom474: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_tokn_in_applic487: new ANTLR.misc.BitSet([0x00200000,0x00000000]),
    FOLLOW_21_in_applic542: new ANTLR.misc.BitSet([0x00E007F0,0x00000000]),
    FOLLOW_block_in_applic547: new ANTLR.misc.BitSet([0x00C00000,0x00000000]),
    FOLLOW_23_in_applic584: new ANTLR.misc.BitSet([0x002007F0,0x00000000]),
    FOLLOW_block_in_applic588: new ANTLR.misc.BitSet([0x00C00000,0x00000000]),
    FOLLOW_22_in_applic595: new ANTLR.misc.BitSet([0x00200002,0x00000000]),
    FOLLOW_set_in_tokn611: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_UNARY_in_synpred1265: new ANTLR.misc.BitSet([0x000004C0,0x00000000]),
    FOLLOW_applic_in_synpred1267: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_applic_in_synpred2305: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_UNARY_in_synpred3339: new ANTLR.misc.BitSet([0x000007C0,0x00000000]),
    FOLLOW_atom_in_synpred3341: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();