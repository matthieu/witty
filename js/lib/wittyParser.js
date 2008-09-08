// $ANTLR 3.0.1 antlr/witty.g 2008-09-07 19:07:54

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
               if (s1 instanceof Array && s1.sntx != 'A') 
                                                val = Block(s1);
                                              else val = s1; var first = true; 
            }
            // antlr/witty.g:17:23: ( ( TERM )+ s2= stmt )*
            loop3:
            do {
                var alt3=2;
                alt3 = this.dfa3.predict(this.input);
                switch (alt3) {
            	case 1 :
            	    // antlr/witty.g:17:24: ( TERM )+ s2= stmt
            	    // antlr/witty.g:17:24: ( TERM )+
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
            	    	    // antlr/witty.g:17:24: TERM
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

            // antlr/witty.g:19:23: ( TERM )*
            loop4:
            do {
                var alt4=2;
                var LA4_0 = this.input.LA(1);

                if ( (LA4_0==TERM) ) {
                    alt4=1;
                }


                switch (alt4) {
            	case 1 :
            	    // antlr/witty.g:19:23: TERM
            	    this.match(this.input,TERM,wittyParser.FOLLOW_TERM_in_block119); if (this.failed) return val;


            	    break;

            	default :
            	    break loop4;
                }
            } while (true);

            // antlr/witty.g:19:29: ( EOF )?
            var alt5=2;
            var LA5_0 = this.input.LA(1);

            if ( (LA5_0==EOF) ) {
                alt5=1;
            }
            switch (alt5) {
                case 1 :
                    // antlr/witty.g:19:29: EOF
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


    // antlr/witty.g:21:1: stmt returns [Object val] : ( WS )* as= assoc ( WS )* ;
    // $ANTLR start stmt
    stmt: function() {
        var val = null;

         var as = null;

        try {
            // antlr/witty.g:22:21: ( ( WS )* as= assoc ( WS )* )
            // antlr/witty.g:22:23: ( WS )* as= assoc ( WS )*
            // antlr/witty.g:22:23: ( WS )*
            loop6:
            do {
                var alt6=2;
                var LA6_0 = this.input.LA(1);

                if ( (LA6_0==WS) ) {
                    alt6=1;
                }


                switch (alt6) {
            	case 1 :
            	    // antlr/witty.g:22:23: WS
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
            // antlr/witty.g:22:56: ( WS )*
            loop7:
            do {
                var alt7=2;
                var LA7_0 = this.input.LA(1);

                if ( (LA7_0==WS) ) {
                    alt7=1;
                }


                switch (alt7) {
            	case 1 :
            	    // antlr/witty.g:22:56: WS
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


    // antlr/witty.g:24:1: assoc returns [Object val] : (p= parens_assoc | am= atom_assoc );
    // $ANTLR start assoc
    assoc: function() {
        var val = null;

         var p = null;
         var am = null;

        try {
            // antlr/witty.g:25:21: (p= parens_assoc | am= atom_assoc )
            var alt8=2;
            var LA8_0 = this.input.LA(1);

            if ( (LA8_0==21) ) {
                alt8=1;
            }
            else if ( ((LA8_0>=OPER && LA8_0<=ID)||LA8_0==24||LA8_0==27) ) {
                alt8=2;
            }
            else {
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("24:1: assoc returns [Object val] : (p= parens_assoc | am= atom_assoc );", 8, 0, this.input);

                throw nvae;
            }
            switch (alt8) {
                case 1 :
                    // antlr/witty.g:25:23: p= parens_assoc
                    this.pushFollow(wittyParser.FOLLOW_parens_assoc_in_assoc158);
                    var p = this.parens_assoc();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = p; 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:26:25: am= atom_assoc
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


    // antlr/witty.g:28:1: parens_assoc returns [Object val] : '(' s1= stmt ')' (op= ( OPER | UNARY ) s2= stmt )? ;
    // $ANTLR start parens_assoc
    parens_assoc: function() {
        var val = null;

        var op = null;
         var s1 = null;
         var s2 = null;

        try {
            // antlr/witty.g:29:21: ( '(' s1= stmt ')' (op= ( OPER | UNARY ) s2= stmt )? )
            // antlr/witty.g:29:23: '(' s1= stmt ')' (op= ( OPER | UNARY ) s2= stmt )?
            this.match(this.input,21,wittyParser.FOLLOW_21_in_parens_assoc202); if (this.failed) return val;
            this.pushFollow(wittyParser.FOLLOW_stmt_in_parens_assoc206);
            var s1 = this.stmt();
            this._fsp--;
            if (this.failed) return val;
            this.match(this.input,22,wittyParser.FOLLOW_22_in_parens_assoc208); if (this.failed) return val;
            // antlr/witty.g:29:39: (op= ( OPER | UNARY ) s2= stmt )?
            var alt9=2;
            var LA9_0 = this.input.LA(1);

            if ( ((LA9_0>=OPER && LA9_0<=UNARY)) ) {
                alt9=1;
            }
            switch (alt9) {
                case 1 :
                    // antlr/witty.g:29:40: op= ( OPER | UNARY ) s2= stmt
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
               if (s2 || s2 == 0) { 
                                          var oper = new String(op.getText());
                                          oper.line = op.getLine(); oper.pos = op.getCharPositionInLine();
                                          val = [Block(s1), oper, s2] 
                                        } 
                                        else val = Block(s1); 
                                      
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


    // antlr/witty.g:38:1: atom_assoc returns [Object val] : ( ( UNARY atom )=>u2= UNARY a1= atom | a2= atom ) (op= ( OPER | UNARY ) stmt )? ;
    // $ANTLR start atom_assoc
    atom_assoc: function() {
        var val = null;

        var u2 = null;
        var op = null;
         var a1 = null;
         var a2 = null;
         var stmt1 = null;

        try {
            // antlr/witty.g:39:21: ( ( ( UNARY atom )=>u2= UNARY a1= atom | a2= atom ) (op= ( OPER | UNARY ) stmt )? )
            // antlr/witty.g:39:23: ( ( UNARY atom )=>u2= UNARY a1= atom | a2= atom ) (op= ( OPER | UNARY ) stmt )?
            // antlr/witty.g:39:23: ( ( UNARY atom )=>u2= UNARY a1= atom | a2= atom )
            var alt10=2;
            alt10 = this.dfa10.predict(this.input);
            switch (alt10) {
                case 1 :
                    // antlr/witty.g:39:24: ( UNARY atom )=>u2= UNARY a1= atom
                    u2=this.input.LT(1);
                    this.match(this.input,UNARY,wittyParser.FOLLOW_UNARY_in_atom_assoc272); if (this.failed) return val;
                    this.pushFollow(wittyParser.FOLLOW_atom_in_atom_assoc276);
                    var a1 = this.atom();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = Applic(u2.getText(), List(a1)); 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:40:25: a2= atom
                    this.pushFollow(wittyParser.FOLLOW_atom_in_atom_assoc306);
                    var a2 = this.atom();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = a2; 
                    }


                    break;

            }

            // antlr/witty.g:41:23: (op= ( OPER | UNARY ) stmt )?
            var alt11=2;
            var LA11_0 = this.input.LA(1);

            if ( ((LA11_0>=OPER && LA11_0<=UNARY)) ) {
                alt11=1;
            }
            switch (alt11) {
                case 1 :
                    // antlr/witty.g:41:24: op= ( OPER | UNARY ) stmt
                    op=this.input.LT(1);
                    if ( (this.input.LA(1)>=OPER && this.input.LA(1)<=UNARY) ) {
                        this.input.consume();
                        this.errorRecovery=false;this.failed=false;
                    }
                    else {
                        if (this.backtracking>0) {this.failed=true; return val;}
                        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                        this.recoverFromMismatchedSet(this.input,mse,wittyParser.FOLLOW_set_in_atom_assoc337);    throw mse;
                    }

                    this.pushFollow(wittyParser.FOLLOW_stmt_in_atom_assoc345);
                    var stmt1 = this.stmt();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {

                                              var oper = new String(op.getText());
                                              oper.line = op.getLine(); oper.pos = op.getCharPositionInLine();
                                              val = [val, oper, stmt1]; 
                                            
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


    // antlr/witty.g:47:1: atom returns [Object val] : (a= ( NUM | STRING | ID | OPER | UNARY ) | hash_lit | list_lit ) ( '(' (b1= block )? ( ',' b2= block )* ')' )* ;
    // $ANTLR start atom
    atom: function() {
        var val = null;

        var a = null;
         var b1 = null;
         var b2 = null;
         var hash_lit2 = null;
         var list_lit3 = null;

        try {
            // antlr/witty.g:48:22: ( (a= ( NUM | STRING | ID | OPER | UNARY ) | hash_lit | list_lit ) ( '(' (b1= block )? ( ',' b2= block )* ')' )* )
            // antlr/witty.g:48:24: (a= ( NUM | STRING | ID | OPER | UNARY ) | hash_lit | list_lit ) ( '(' (b1= block )? ( ',' b2= block )* ')' )*
            // antlr/witty.g:48:24: (a= ( NUM | STRING | ID | OPER | UNARY ) | hash_lit | list_lit )
            var alt12=3;
            switch ( this.input.LA(1) ) {
            case OPER:
            case UNARY:
            case NUM:
            case STRING:
            case ID:
                alt12=1;
                break;
            case 24:
                alt12=2;
                break;
            case 27:
                alt12=3;
                break;
            default:
                if (this.backtracking>0) {this.failed=true; return val;}
                var nvae =
                    new ANTLR.runtime.NoViableAltException("48:24: (a= ( NUM | STRING | ID | OPER | UNARY ) | hash_lit | list_lit )", 12, 0, this.input);

                throw nvae;
            }

            switch (alt12) {
                case 1 :
                    // antlr/witty.g:48:25: a= ( NUM | STRING | ID | OPER | UNARY )
                    a=this.input.LT(1);
                    if ( (this.input.LA(1)>=OPER && this.input.LA(1)<=ID) ) {
                        this.input.consume();
                        this.errorRecovery=false;this.failed=false;
                    }
                    else {
                        if (this.backtracking>0) {this.failed=true; return val;}
                        var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                        this.recoverFromMismatchedSet(this.input,mse,wittyParser.FOLLOW_set_in_atom365);    throw mse;
                    }

                    if ( this.backtracking===0 ) {
                       val = new String(a.getText()); val.line = a.getLine(); val.pos = a.getCharPositionInLine(); 
                    }


                    break;
                case 2 :
                    // antlr/witty.g:49:27: hash_lit
                    this.pushFollow(wittyParser.FOLLOW_hash_lit_in_atom414);
                    var hash_lit2 = this.hash_lit();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = hash_lit2; 
                    }


                    break;
                case 3 :
                    // antlr/witty.g:50:27: list_lit
                    this.pushFollow(wittyParser.FOLLOW_list_lit_in_atom444);
                    var list_lit3 = this.list_lit();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val = list_lit3; 
                    }


                    break;

            }

            // antlr/witty.g:51:24: ( '(' (b1= block )? ( ',' b2= block )* ')' )*
            loop15:
            do {
                var alt15=2;
                var LA15_0 = this.input.LA(1);

                if ( (LA15_0==21) ) {
                    alt15=1;
                }


                switch (alt15) {
            	case 1 :
            	    // antlr/witty.g:51:25: '(' (b1= block )? ( ',' b2= block )* ')'
            	    this.match(this.input,21,wittyParser.FOLLOW_21_in_atom474); if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val = Applic(val); 
            	    }
            	    // antlr/witty.g:52:29: (b1= block )?
            	    var alt13=2;
            	    var LA13_0 = this.input.LA(1);

            	    if ( ((LA13_0>=TERM && LA13_0<=ID)||LA13_0==21||LA13_0==24||LA13_0==27) ) {
            	        alt13=1;
            	    }
            	    switch (alt13) {
            	        case 1 :
            	            // antlr/witty.g:52:30: b1= block
            	            this.pushFollow(wittyParser.FOLLOW_block_in_atom509);
            	            var b1 = this.block();
            	            this._fsp--;
            	            if (this.failed) return val;
            	            if ( this.backtracking===0 ) {
            	               val.push(List(b1)); 
            	            }


            	            break;

            	    }

            	    // antlr/witty.g:53:29: ( ',' b2= block )*
            	    loop14:
            	    do {
            	        var alt14=2;
            	        var LA14_0 = this.input.LA(1);

            	        if ( (LA14_0==23) ) {
            	            alt14=1;
            	        }


            	        switch (alt14) {
            	    	case 1 :
            	    	    // antlr/witty.g:53:30: ',' b2= block
            	    	    this.match(this.input,23,wittyParser.FOLLOW_23_in_atom546); if (this.failed) return val;
            	    	    this.pushFollow(wittyParser.FOLLOW_block_in_atom550);
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

            	    this.match(this.input,22,wittyParser.FOLLOW_22_in_atom557); if (this.failed) return val;


            	    break;

            	default :
            	    break loop15;
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


    // antlr/witty.g:55:1: hash_lit returns [Object val] : '{' (p1= pair )? ( ',' p2= pair )* '}' ;
    // $ANTLR start hash_lit
    hash_lit: function() {
        var val = null;

         var p1 = null;
         var p2 = null;

        try {
            // antlr/witty.g:56:21: ( '{' (p1= pair )? ( ',' p2= pair )* '}' )
            // antlr/witty.g:56:23: '{' (p1= pair )? ( ',' p2= pair )* '}'
            this.match(this.input,24,wittyParser.FOLLOW_24_in_hash_lit571); if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = Applic("H", List()); 
            }
            // antlr/witty.g:57:24: (p1= pair )?
            var alt16=2;
            var LA16_0 = this.input.LA(1);

            if ( (LA16_0==ID) ) {
                alt16=1;
            }
            switch (alt16) {
                case 1 :
                    // antlr/witty.g:57:25: p1= pair
                    this.pushFollow(wittyParser.FOLLOW_pair_in_hash_lit601);
                    var p1 = this.pair();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val[1].push(p1[0], p1[1]); 
                    }


                    break;

            }

            // antlr/witty.g:58:24: ( ',' p2= pair )*
            loop17:
            do {
                var alt17=2;
                var LA17_0 = this.input.LA(1);

                if ( (LA17_0==23) ) {
                    alt17=1;
                }


                switch (alt17) {
            	case 1 :
            	    // antlr/witty.g:58:25: ',' p2= pair
            	    this.match(this.input,23,wittyParser.FOLLOW_23_in_hash_lit633); if (this.failed) return val;
            	    this.pushFollow(wittyParser.FOLLOW_pair_in_hash_lit637);
            	    var p2 = this.pair();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val[1].push(p2[0], p2[1]); 
            	    }


            	    break;

            	default :
            	    break loop17;
                }
            } while (true);

            this.match(this.input,25,wittyParser.FOLLOW_25_in_hash_lit644); if (this.failed) return val;



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


    // antlr/witty.g:60:1: pair returns [Object val] : ID ':' block ;
    // $ANTLR start pair
    pair: function() {
        var val = null;

        var ID4 = null;
         var block5 = null;

        try {
            // antlr/witty.g:61:21: ( ID ':' block )
            // antlr/witty.g:61:23: ID ':' block
            ID4=this.input.LT(1);
            this.match(this.input,ID,wittyParser.FOLLOW_ID_in_pair655); if (this.failed) return val;
            this.match(this.input,26,wittyParser.FOLLOW_26_in_pair657); if (this.failed) return val;
            this.pushFollow(wittyParser.FOLLOW_block_in_pair659);
            var block5 = this.block();
            this._fsp--;
            if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = ["\"" + ID4.getText() + "\"", block5]; 
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


    // antlr/witty.g:63:1: list_lit returns [Object val] : '[' (s1= stmt )? ( ',' s2= stmt )* ']' ;
    // $ANTLR start list_lit
    list_lit: function() {
        var val = null;

         var s1 = null;
         var s2 = null;

        try {
            // antlr/witty.g:64:21: ( '[' (s1= stmt )? ( ',' s2= stmt )* ']' )
            // antlr/witty.g:64:23: '[' (s1= stmt )? ( ',' s2= stmt )* ']'
            this.match(this.input,27,wittyParser.FOLLOW_27_in_list_lit672); if (this.failed) return val;
            if ( this.backtracking===0 ) {
               val = Applic("L", List()); 
            }
            // antlr/witty.g:65:24: (s1= stmt )?
            var alt18=2;
            var LA18_0 = this.input.LA(1);

            if ( ((LA18_0>=WS && LA18_0<=ID)||LA18_0==21||LA18_0==24||LA18_0==27) ) {
                alt18=1;
            }
            switch (alt18) {
                case 1 :
                    // antlr/witty.g:65:25: s1= stmt
                    this.pushFollow(wittyParser.FOLLOW_stmt_in_list_lit704);
                    var s1 = this.stmt();
                    this._fsp--;
                    if (this.failed) return val;
                    if ( this.backtracking===0 ) {
                       val[1].push(s1); 
                    }


                    break;

            }

            // antlr/witty.g:66:24: ( ',' s2= stmt )*
            loop19:
            do {
                var alt19=2;
                var LA19_0 = this.input.LA(1);

                if ( (LA19_0==23) ) {
                    alt19=1;
                }


                switch (alt19) {
            	case 1 :
            	    // antlr/witty.g:66:25: ',' s2= stmt
            	    this.match(this.input,23,wittyParser.FOLLOW_23_in_list_lit736); if (this.failed) return val;
            	    this.pushFollow(wittyParser.FOLLOW_stmt_in_list_lit740);
            	    var s2 = this.stmt();
            	    this._fsp--;
            	    if (this.failed) return val;
            	    if ( this.backtracking===0 ) {
            	       val[1].push(s2); 
            	    }


            	    break;

            	default :
            	    break loop19;
                }
            } while (true);

            this.match(this.input,28,wittyParser.FOLLOW_28_in_list_lit747); if (this.failed) return val;



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


    // antlr/witty.g:68:1: tokn returns [Object val] : t= ( ID | OPER | UNARY ) ;
    // $ANTLR start tokn
    tokn: function() {
        var val = null;

        var t = null;

        try {
            // antlr/witty.g:69:21: (t= ( ID | OPER | UNARY ) )
            // antlr/witty.g:69:23: t= ( ID | OPER | UNARY )
            t=this.input.LT(1);
            if ( (this.input.LA(1)>=OPER && this.input.LA(1)<=UNARY)||this.input.LA(1)==ID ) {
                this.input.consume();
                this.errorRecovery=false;this.failed=false;
            }
            else {
                if (this.backtracking>0) {this.failed=true; return val;}
                var mse = new ANTLR.runtime.MismatchedSetException(null,this.input);
                this.recoverFromMismatchedSet(this.input,mse,wittyParser.FOLLOW_set_in_tokn760);    throw mse;
            }

            if ( this.backtracking===0 ) {
               val = new String(t.getText()); val.line = t.getLine(); val.pos = t.getCharPositionInLine(); 
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

    // $ANTLR start synpred1
    synpred1_fragment: function() {   
        // antlr/witty.g:39:24: ( UNARY atom )
        // antlr/witty.g:39:25: UNARY atom
        this.match(this.input,UNARY,wittyParser.FOLLOW_UNARY_in_synpred1265); if (this.failed) return ;
        this.pushFollow(wittyParser.FOLLOW_atom_in_synpred1267);
        this.atom();
        this._fsp--;
        if (this.failed) return ;


    },
    // $ANTLR end synpred1

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

});

ANTLR.lang.augmentObject(wittyParser, {
    DFA3_eotS:
        "\u0004\uffff",
    DFA3_eofS:
        "\u0002\u0002\u0002\uffff",
    DFA3_minS:
        "\u0002\u0004\u0002\uffff",
    DFA3_maxS:
        "\u0001\u0019\u0001\u001b\u0002\uffff",
    DFA3_acceptS:
        "\u0002\uffff\u0001\u0002\u0001\u0001",
    DFA3_specialS:
        "\u0004\uffff}>",
    DFA3_transitionS: [
            "\u0001\u0001\u0011\uffff\u0002\u0002\u0001\uffff\u0001\u0002",
            "\u0001\u0001\u0006\u0003\u000a\uffff\u0001\u0003\u0002\u0002"+
            "\u0001\u0003\u0001\u0002\u0001\uffff\u0001\u0003",
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
        return "()* loopback of 17:23: ( ( TERM )+ s2= stmt )*";
    },
    dummy: null
});
ANTLR.lang.augmentObject(wittyParser, {
    DFA10_eotS:
        "\u0026\uffff",
    DFA10_eofS:
        "\u0001\uffff\u0001\u0002\u0001\uffff\u0001\u000c\u0003\uffff\u0001"+
    "\u000c\u0001\uffff\u0002\u0002\u001b\uffff",
    DFA10_minS:
        "\u0001\u0006\u0001\u0004\u0001\uffff\u0001\u0004\u0003\uffff\u0004"+
    "\u0004\u0007\uffff\u0006\u0000\u0002\uffff\u0009\u0000\u0003\uffff",
    DFA10_maxS:
        "\u0001\u001b\u0001\u001c\u0001\uffff\u0001\u001c\u0003\uffff\u0001"+
    "\u001c\u0001\u001b\u0002\u001c\u0007\uffff\u0006\u0000\u0002\uffff\u0009"+
    "\u0000\u0003\uffff",
    DFA10_acceptS:
        "\u0002\uffff\u0001\u0002\u0001\uffff\u0003\u0001\u0004\uffff\u0007"+
    "\u0001\u0006\uffff\u0002\u0001\u0009\uffff\u0003\u0001",
    DFA10_specialS:
        "\u0001\uffff\u0001\u0002\u0001\uffff\u0001\u0001\u0003\uffff\u0001"+
    "\u0004\u0001\u0003\u0001\uffff\u0001\u0000\u001b\uffff}>",
    DFA10_transitionS: [
            "\u0001\u0002\u0001\u0001\u0003\u0002\u000d\uffff\u0001\u0002"+
            "\u0002\uffff\u0001\u0002",
            "\u0002\u0002\u0002\u0003\u0003\u0006\u000a\uffff\u0003\u0002"+
            "\u0001\u0004\u0001\u0002\u0001\uffff\u0001\u0005\u0001\u0002",
            "",
            "\u0001\u000b\u0001\u0007\u0001\u000a\u0001\u0009\u0003\u0002"+
            "\u000a\uffff\u0001\u0008\u0001\u000e\u0001\u000d\u0001\u0002"+
            "\u0001\u000f\u0001\uffff\u0001\u0002\u0001\u0010",
            "",
            "",
            "",
            "\u0001\u000b\u0001\u0007\u0005\u0002\u000a\uffff\u0001\u0002"+
            "\u0001\u000e\u0001\u000d\u0001\u0002\u0001\u000f\u0001\uffff"+
            "\u0001\u0002\u0001\u0010",
            "\u0001\u0011\u0001\u0012\u0001\u0015\u0001\u0014\u0003\u0015"+
            "\u000a\uffff\u0001\u0013\u0001\u0019\u0001\u0018\u0001\u0016"+
            "\u0002\uffff\u0001\u0017",
            "\u0001\u0002\u0001\u001d\u0001\u001f\u0001\u001a\u0003\u0020"+
            "\u000a\uffff\u0001\u001e\u0002\u0002\u0001\u001b\u0001\u0002"+
            "\u0001\uffff\u0001\u001c\u0001\u0002",
            "\u0001\u0002\u0001\u001d\u0001\u0022\u0001\u0021\u0003\u0025"+
            "\u000a\uffff\u0001\u001e\u0002\u0002\u0001\u0023\u0001\u0002"+
            "\u0001\uffff\u0001\u0024\u0001\u0002",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
            "\u0001\uffff",
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
            "",
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
        return "39:23: ( ( UNARY atom )=>u2= UNARY a1= atom | a2= atom )";
    },
    specialStateTransition: function(s, input) {
    	var _s = s;
        /* bind to recognizer so semantic predicates can be evaluated */
        var retval = (function(s, input) {
            switch ( s ) {
                        case 0 : 
                            var LA10_10 = input.LA(1);

                             
                            var index10_10 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_10==WS) ) {s = 29;}

                            else if ( (LA10_10==21) ) {s = 30;}

                            else if ( (LA10_10==UNARY) ) {s = 33;}

                            else if ( (LA10_10==OPER) ) {s = 34;}

                            else if ( (LA10_10==24) && (this.synpred1())) {s = 35;}

                            else if ( (LA10_10==27) && (this.synpred1())) {s = 36;}

                            else if ( ((LA10_10>=NUM && LA10_10<=ID)) && (this.synpred1())) {s = 37;}

                            else if ( (LA10_10==EOF||LA10_10==TERM||(LA10_10>=22 && LA10_10<=23)||LA10_10==25||LA10_10==28) ) {s = 2;}

                             
                            input.seek(index10_10);
                            if ( s>=0 ) return s;
                            break;
                        case 1 : 
                            var LA10_3 = input.LA(1);

                             
                            var index10_3 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_3==WS) ) {s = 7;}

                            else if ( (LA10_3==21) ) {s = 8;}

                            else if ( (LA10_3==UNARY) ) {s = 9;}

                            else if ( (LA10_3==OPER) ) {s = 10;}

                            else if ( ((LA10_3>=NUM && LA10_3<=ID)||LA10_3==24||LA10_3==27) ) {s = 2;}

                            else if ( (LA10_3==TERM) && (this.synpred1())) {s = 11;}

                            else if ( (LA10_3==EOF) && (this.synpred1())) {s = 12;}

                            else if ( (LA10_3==23) && (this.synpred1())) {s = 13;}

                            else if ( (LA10_3==22) && (this.synpred1())) {s = 14;}

                            else if ( (LA10_3==25) && (this.synpred1())) {s = 15;}

                            else if ( (LA10_3==28) && (this.synpred1())) {s = 16;}

                             
                            input.seek(index10_3);
                            if ( s>=0 ) return s;
                            break;
                        case 2 : 
                            var LA10_1 = input.LA(1);

                             
                            var index10_1 = input.index();
                            input.rewind();
                            s = -1;
                            if ( ((LA10_1>=OPER && LA10_1<=UNARY)) ) {s = 3;}

                            else if ( (LA10_1==24) && (this.synpred1())) {s = 4;}

                            else if ( (LA10_1==27) && (this.synpred1())) {s = 5;}

                            else if ( (LA10_1==EOF||(LA10_1>=TERM && LA10_1<=WS)||(LA10_1>=21 && LA10_1<=23)||LA10_1==25||LA10_1==28) ) {s = 2;}

                            else if ( ((LA10_1>=NUM && LA10_1<=ID)) && (this.synpred1())) {s = 6;}

                             
                            input.seek(index10_1);
                            if ( s>=0 ) return s;
                            break;
                        case 3 : 
                            var LA10_8 = input.LA(1);

                             
                            var index10_8 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_8==TERM) && (this.synpred1())) {s = 17;}

                            else if ( (LA10_8==WS) ) {s = 18;}

                            else if ( (LA10_8==21) ) {s = 19;}

                            else if ( (LA10_8==UNARY) ) {s = 20;}

                            else if ( (LA10_8==OPER||(LA10_8>=NUM && LA10_8<=ID)) ) {s = 21;}

                            else if ( (LA10_8==24) ) {s = 22;}

                            else if ( (LA10_8==27) ) {s = 23;}

                            else if ( (LA10_8==23) && (this.synpred1())) {s = 24;}

                            else if ( (LA10_8==22) && (this.synpred1())) {s = 25;}

                             
                            input.seek(index10_8);
                            if ( s>=0 ) return s;
                            break;
                        case 4 : 
                            var LA10_7 = input.LA(1);

                             
                            var index10_7 = input.index();
                            input.rewind();
                            s = -1;
                            if ( (LA10_7==TERM) && (this.synpred1())) {s = 11;}

                            else if ( (LA10_7==EOF) && (this.synpred1())) {s = 12;}

                            else if ( (LA10_7==23) && (this.synpred1())) {s = 13;}

                            else if ( (LA10_7==22) && (this.synpred1())) {s = 14;}

                            else if ( (LA10_7==25) && (this.synpred1())) {s = 15;}

                            else if ( (LA10_7==WS) ) {s = 7;}

                            else if ( (LA10_7==28) && (this.synpred1())) {s = 16;}

                            else if ( ((LA10_7>=OPER && LA10_7<=ID)||LA10_7==21||LA10_7==24||LA10_7==27) ) {s = 2;}

                             
                            input.seek(index10_7);
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
    tokenNames: ["<invalid>", "<EOR>", "<DOWN>", "<UP>", "TERM", "WS", "OPER", "UNARY", "NUM", "STRING", "ID", "SYMBOLS", "LETTER", "NON_OP", "DIGIT", "ESC_SEQ", "CR", "COMMENT", "UNICODE_ESC", "OCTAL_ESC", "HEX_DIG", "'('", "')'", "','", "'{'", "'}'", "':'", "'['", "']'"],
    FOLLOW_TERM_in_block30: new ANTLR.misc.BitSet([0x092007F0,0x00000000]),
    FOLLOW_stmt_in_block58: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block85: new ANTLR.misc.BitSet([0x092007F0,0x00000000]),
    FOLLOW_stmt_in_block90: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_TERM_in_block119: new ANTLR.misc.BitSet([0x00000012,0x00000000]),
    FOLLOW_EOF_in_block122: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_WS_in_stmt134: new ANTLR.misc.BitSet([0x092007E0,0x00000000]),
    FOLLOW_assoc_in_stmt139: new ANTLR.misc.BitSet([0x00000022,0x00000000]),
    FOLLOW_WS_in_stmt143: new ANTLR.misc.BitSet([0x00000022,0x00000000]),
    FOLLOW_parens_assoc_in_assoc158: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_atom_assoc_in_assoc189: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_21_in_parens_assoc202: new ANTLR.misc.BitSet([0x092007E0,0x00000000]),
    FOLLOW_stmt_in_parens_assoc206: new ANTLR.misc.BitSet([0x00400000,0x00000000]),
    FOLLOW_22_in_parens_assoc208: new ANTLR.misc.BitSet([0x000000C2,0x00000000]),
    FOLLOW_set_in_parens_assoc213: new ANTLR.misc.BitSet([0x092007E0,0x00000000]),
    FOLLOW_stmt_in_parens_assoc223: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_UNARY_in_atom_assoc272: new ANTLR.misc.BitSet([0x090007C0,0x00000000]),
    FOLLOW_atom_in_atom_assoc276: new ANTLR.misc.BitSet([0x000000C2,0x00000000]),
    FOLLOW_atom_in_atom_assoc306: new ANTLR.misc.BitSet([0x000000C2,0x00000000]),
    FOLLOW_set_in_atom_assoc337: new ANTLR.misc.BitSet([0x092007E0,0x00000000]),
    FOLLOW_stmt_in_atom_assoc345: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_set_in_atom365: new ANTLR.misc.BitSet([0x00200002,0x00000000]),
    FOLLOW_hash_lit_in_atom414: new ANTLR.misc.BitSet([0x00200002,0x00000000]),
    FOLLOW_list_lit_in_atom444: new ANTLR.misc.BitSet([0x00200002,0x00000000]),
    FOLLOW_21_in_atom474: new ANTLR.misc.BitSet([0x09E007F0,0x00000000]),
    FOLLOW_block_in_atom509: new ANTLR.misc.BitSet([0x00C00000,0x00000000]),
    FOLLOW_23_in_atom546: new ANTLR.misc.BitSet([0x092007F0,0x00000000]),
    FOLLOW_block_in_atom550: new ANTLR.misc.BitSet([0x00C00000,0x00000000]),
    FOLLOW_22_in_atom557: new ANTLR.misc.BitSet([0x00200002,0x00000000]),
    FOLLOW_24_in_hash_lit571: new ANTLR.misc.BitSet([0x02800400,0x00000000]),
    FOLLOW_pair_in_hash_lit601: new ANTLR.misc.BitSet([0x02800000,0x00000000]),
    FOLLOW_23_in_hash_lit633: new ANTLR.misc.BitSet([0x00000400,0x00000000]),
    FOLLOW_pair_in_hash_lit637: new ANTLR.misc.BitSet([0x02800000,0x00000000]),
    FOLLOW_25_in_hash_lit644: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_ID_in_pair655: new ANTLR.misc.BitSet([0x04000000,0x00000000]),
    FOLLOW_26_in_pair657: new ANTLR.misc.BitSet([0x092007F0,0x00000000]),
    FOLLOW_block_in_pair659: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_27_in_list_lit672: new ANTLR.misc.BitSet([0x19A007E0,0x00000000]),
    FOLLOW_stmt_in_list_lit704: new ANTLR.misc.BitSet([0x10800000,0x00000000]),
    FOLLOW_23_in_list_lit736: new ANTLR.misc.BitSet([0x092007E0,0x00000000]),
    FOLLOW_stmt_in_list_lit740: new ANTLR.misc.BitSet([0x10800000,0x00000000]),
    FOLLOW_28_in_list_lit747: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_set_in_tokn760: new ANTLR.misc.BitSet([0x00000002,0x00000000]),
    FOLLOW_UNARY_in_synpred1265: new ANTLR.misc.BitSet([0x090007C0,0x00000000]),
    FOLLOW_atom_in_synpred1267: new ANTLR.misc.BitSet([0x00000002,0x00000000])
});


})();