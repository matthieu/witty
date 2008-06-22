/*jslint adsafe:false, bitwise:true, browser:false, forin:false, glovar:true, nomen:true, on:false, regexp:false, laxbreak:false, evil:false, passfail:false, undef:true white:true */
/*
Some portions:
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/

/**
 * The ANTLR object is the single global object used by ANTLR runtime Library.
 * @module yahoo
 * @title  ANTLR Global
 */

if (typeof ANTLR == "undefined" || !ANTLR) {
    /**
     * The ANTLR global namespace object.  If ANTLR is already defined, the
     * existing ANTLR object will not be overwritten so that defined
     * namespaces are preserved.
     * @class ANTLR
     * @static
     */
    var ANTLR = {};
}

/**
 * Returns the namespace specified and creates it if it doesn't exist
 * <pre>
 * ANTLR.namespace("property.package");
 * ANTLR.namespace("ANTLR.property.package");
 * </pre>
 * Either of the above would create ANTLR.property, then
 * ANTLR.property.package
 *
 * Be careful when naming packages. Reserved words may work in some browsers
 * and not others. For instance, the following will fail in Safari:
 * <pre>
 * ANTLR.namespace("really.long.nested.namespace");
 * </pre>
 * This fails because "long" is a future reserved word in ECMAScript
 *
 * @method namespace
 * @static
 * @param  {String*} arguments 1-n namespaces to create 
 * @return {Object}  A reference to the last namespace object created
 */
ANTLR.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=ANTLR;

        // ANTLR is implied, so it is ignored if it is included
        for (j=(d[0] == "ANTLR") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }

    return o;
};

/**
 * Uses ANTLR.widget.Logger to output a log message, if the widget is
 * available.
 *
 * @method log
 * @static
 * @param  {String}  msg  The message to log.
 * @param  {String}  cat  The log category for the message.  Default
 *                        categories are "info", "warn", "error", time".
 *                        Custom categories can be used as well. (opt)
 * @param  {String}  src  The source of the the message (opt)
 * @return {Boolean}      True if the log operation was successful.
 */
ANTLR.log = function(msg, cat, src) {
    var l=ANTLR.widget.Logger;
    if(l && l.log) {
        return l.log(msg, cat, src);
    } else {
        return false;
    }
};

/**
 * ANTLR.env is used to keep track of what is known about the library and
 * the browsing environment
 * @class ANTLR.env
 * @static
 */
ANTLR.env = ANTLR.env || {};

/**
 * Do not fork for a browser if it can be avoided.  Use feature detection when
 * you can.  Use the user agent as a last resort.  ANTLR.env.ua stores a version
 * number for the browser engine, 0 otherwise.  This value may or may not map
 * to the version number of the browser using the engine.  The value is 
 * presented as a float so that it can easily be used for boolean evaluation 
 * as well as for looking for a particular range of versions.  Because of this, 
 * some of the granularity of the version info may be lost (e.g., Gecko 1.8.0.9 
 * reports 1.8).
 * @class ANTLR.env.ua
 * @static
 */
ANTLR.env.ua = function() {
    var o={

        /**
         * Internet Explorer version number or 0.  Example: 6
         * @property ie
         * @type float
         */
        ie:0,

        /**
         * Opera version number or 0.  Example: 9.2
         * @property opera
         * @type float
         */
        opera:0,

        /**
         * Gecko engine revision number.  Will evaluate to 1 if Gecko 
         * is detected but the revision could not be found. Other browsers
         * will be 0.  Example: 1.8
         * <pre>
         * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7
         * Firefox 1.5.0.9: 1.8.0.9 <-- Reports 1.8
         * Firefox 2.0.0.3: 1.8.1.3 <-- Reports 1.8
         * Firefox 3 alpha: 1.9a4   <-- Reports 1.9
         * </pre>
         * @property gecko
         * @type float
         */
        gecko:0,

        /**
         * AppleWebKit version.  KHTML browsers that are not WebKit browsers 
         * will evaluate to 1, other browsers 0.  Example: 418.9.1
         * <pre>
         * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the 
         *                                   latest available for Mac OSX 10.3.
         * Safari 2.0.2:         416     <-- hasOwnProperty introduced
         * Safari 2.0.4:         418     <-- preventDefault fixed
         * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run
         *                                   different versions of webkit
         * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been
         *                                   updated, but not updated
         *                                   to the latest patch.
         * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native SVG
         *                                   and many major issues fixed).  
         * 3.x yahoo.com, flickr:422     <-- Safari 3.x hacks the user agent
         *                                   string when hitting yahoo.com and 
         *                                   flickr.com.
         * Safari 3.0.4 (523.12):523.12  <-- First Tiger release - automatic update
         *                                   from 2.x via the 10.4.11 OS patch
         * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.
         *                                   yahoo.com user agent hack removed.
         *                                   
         * </pre>
         * http://developer.apple.com/internet/safari/uamatrix.html
         * @property webkit
         * @type float
         */
        webkit: 0,

        /**
         * The mobile property will be set to a string containing any relevant
         * user agent information when a modern mobile browser is detected.
         * Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series
         * devices with the WebKit-based browser, and Opera Mini.  
         * @property mobile 
         * @type string
         */
        mobile: null,

        /**
         * Adobe AIR version number or 0.  Only populated if webkit is detected.
         * Example: 1.0
         * @property air
         * @type float
         */
        air: 0

    };

    var ua, m;

    try {
        ua = navigator.userAgent;

        // Modern KHTML browsers should qualify as Safari X-Grade
        if ((/KHTML/).test(ua)) {
            o.webkit=1;
        }
        // Modern WebKit browsers are at least X-Grade
        m=ua.match(/AppleWebKit\/([^\s]*)/);
        if (m&&m[1]) {
            o.webkit=parseFloat(m[1]);

            // Mobile browser check
            if (/ Mobile\//.test(ua)) {
                o.mobile = "Apple"; // iPhone or iPod Touch
        } else {
            m=ua.match(/NokiaN[^\/]*/);
            if (m) {
                o.mobile = m[0]; // Nokia N-series, ex: NokiaN95
            }
        }

        m=ua.match(/AdobeAIR\/([^\s]*)/);
        if (m) {
            o.air = m[0]; // Adobe AIR 1.0 or better
        }

        }

        if (!o.webkit) { // not webkit
            // @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
            m=ua.match(/Opera[\s\/]([^\s]*)/);
            if (m&&m[1]) {
                o.opera=parseFloat(m[1]);
                m=ua.match(/Opera Mini[^;]*/);
            if (m) {
                o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
            }
            } else { // not opera or webkit
                m=ua.match(/MSIE\s([^;]*)/);
                if (m&&m[1]) {
                    o.ie=parseFloat(m[1]);
                } else { // not opera, webkit, or ie
                    m=ua.match(/Gecko\/([^\s]*)/);
                    if (m) {
                        o.gecko=1; // Gecko detected, look for revision
                        m=ua.match(/rv:([^\s\)]*)/);
                        if (m&&m[1]) {
                            o.gecko=parseFloat(m[1]);
                        }
                    }
                }
            }
        }
    } catch(e) {
        // ignore this if we're not in a browser
    }
    
    return o;
}();

/*
 * Initializes the global by creating the default namespaces and applying
 * any new configuration information that is detected.  This is the setup
 * for env.
 * @method init
 * @static
 * @private
 */
ANTLR.namespace("runtime.tree", "misc", "error");

/**
 * Provides the language utilites and extensions used by the library
 * @class ANTLR.lang
 */
ANTLR.lang = ANTLR.lang || {
    /**
     * Determines whether or not the provided object is an array.
     * Testing typeof/instanceof/constructor of arrays across frame 
     * boundaries isn't possible in Safari unless you have a reference
     * to the other frame to test against its Array prototype.  To
     * handle this case, we test well-known array properties instead.
     * properties.
     * @method isArray
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    isArray: function(o) { 
        if (o) {
           var l = ANTLR.lang;
           return l.isNumber(o.length) && l.isFunction(o.splice);
        }
        return false;
    },

    /**
     * Determines whether or not the provided object is a boolean
     * @method isBoolean
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    isBoolean: function(o) {
        return typeof o === 'boolean';
    },
    
    /**
     * Determines whether or not the provided object is a function
     * @method isFunction
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    isFunction: function(o) {
        return typeof o === 'function';
    },
        
    /**
     * Determines whether or not the provided object is null
     * @method isNull
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    isNull: function(o) {
        return o === null;
    },
        
    /**
     * Determines whether or not the provided object is a legal number
     * @method isNumber
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    isNumber: function(o) {
        return typeof o === 'number' && isFinite(o);
    },
      
    /**
     * Determines whether or not the provided object is of type object
     * or function
     * @method isObject
     * @param {any} o The object being testing
     * @return {boolean} the result
     */  
    isObject: function(o) {
return (o && (typeof o === 'object' || ANTLR.lang.isFunction(o))) || false;
    },
        
    /**
     * Determines whether or not the provided object is a string
     * @method isString
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    isString: function(o) {
        return typeof o === 'string';
    },
        
    /**
     * Determines whether or not the provided object is undefined
     * @method isUndefined
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    isUndefined: function(o) {
        return typeof o === 'undefined';
    },
    
    /**
     * Determines whether or not the property was added
     * to the object instance.  Returns false if the property is not present
     * in the object, or was inherited from the prototype.
     * This abstraction is provided to enable hasOwnProperty for Safari 1.3.x.
     * There is a discrepancy between ANTLR.lang.hasOwnProperty and
     * Object.prototype.hasOwnProperty when the property is a primitive added to
     * both the instance AND prototype with the same value:
     * <pre>
     * var A = function() {};
     * A.prototype.foo = 'foo';
     * var a = new A();
     * a.foo = 'foo';
     * alert(a.hasOwnProperty('foo')); // true
     * alert(ANTLR.lang.hasOwnProperty(a, 'foo')); // false when using fallback
     * </pre>
     * @method hasOwnProperty
     * @param {any} o The object being testing
     * @return {boolean} the result
     */
    hasOwnProperty: function(o, prop) {
        if (Object.prototype.hasOwnProperty) {
            return o.hasOwnProperty(prop);
        }
        
        return !ANTLR.lang.isUndefined(o[prop]) && 
                o.constructor.prototype[prop] !== o[prop];
    },
 
    /**
     * IE will not enumerate native functions in a derived object even if the
     * function was overridden.  This is a workaround for specific functions 
     * we care about on the Object prototype. 
     * @property _IEEnumFix
     * @param {Function} r  the object to receive the augmentation
     * @param {Function} s  the object that supplies the properties to augment
     * @static
     * @private
     */
    _IEEnumFix: function(r, s) {
        if (ANTLR.env.ua.ie) {
            var add=["toString", "valueOf"], i;
            for (i=0;i<add.length;i=i+1) {
                var fname=add[i],f=s[fname];
                if (ANTLR.lang.isFunction(f) && f!=Object.prototype[fname]) {
                    r[fname]=f;
                }
            }
        }
    },
       
    /**
     * Utility to set up the prototype, constructor and superclass properties to
     * support an inheritance strategy that can chain constructors and methods.
     * Static members will not be inherited.
     *
     * @method extend
     * @static
     * @param {Function} subc   the object to modify
     * @param {Function} superc the object to inherit
     * @param {Object} ovrrides  additional properties/methods to add to the
     *                              subclass prototype.  These will override the
     *                              matching items obtained from the superclass 
     *                              if present.
     */
    extend: function(subc, superc, ovrrides) {
        if (!superc||!subc) {
            throw new Error("ANTLR.lang.extend failed, please check that " +
                            "all dependencies are included.");
        }
        var F = function() {};
        F.prototype=superc.prototype;
        subc.prototype=new F();
        subc.prototype.constructor=subc;
        subc.superclass=superc.prototype;
        if (superc.prototype.constructor == Object.prototype.constructor) {
            superc.prototype.constructor=superc;
        }
    
        if (ovrrides) {
            for (var i in ovrrides) {
                subc.prototype[i]=ovrrides[i];
            }

            ANTLR.lang._IEEnumFix(subc.prototype, ovrrides);
        }
    },
   
    /**
     * Applies all properties in the supplier to the receiver if the
     * receiver does not have these properties yet.  Optionally, one or 
     * more methods/properties can be specified (as additional 
     * parameters).  This option will overwrite the property if receiver 
     * has it already.  If true is passed as the third parameter, all 
     * properties will be applied and _will_ overwrite properties in 
     * the receiver.
     *
     * @method augmentObject
     * @static
     * @since 2.3.0
     * @param {Function} r  the object to receive the augmentation
     * @param {Function} s  the object that supplies the properties to augment
     * @param {String*|boolean}  arguments zero or more properties methods 
     *        to augment the receiver with.  If none specified, everything
     *        in the supplier will be used unless it would
     *        overwrite an existing property in the receiver. If true
     *        is specified as the third parameter, all properties will
     *        be applied and will overwrite an existing property in
     *        the receiver
     */
    augmentObject: function(r, s) {
        if (!s||!r) {
            throw new Error("Absorb failed, verify dependencies.");
        }
        var a=arguments, i, p, ovrride=a[2];
        if (ovrride && ovrride!==true) { // only absorb the specified properties
            for (i=2; i<a.length; i=i+1) {
                r[a[i]] = s[a[i]];
            }
        } else { // take everything, overwriting only if the third parameter is true
            for (p in s) { 
                if (ovrride || !r[p]) {
                    r[p] = s[p];
                }
            }
            
            ANTLR.lang._IEEnumFix(r, s);
        }
    },
 
    /**
     * Same as ANTLR.lang.augmentObject, except it only applies prototype properties
     * @see ANTLR.lang.augmentObject
     * @method augmentProto
     * @static
     * @param {Function} r  the object to receive the augmentation
     * @param {Function} s  the object that supplies the properties to augment
     * @param {String*|boolean}  arguments zero or more properties methods 
     *        to augment the receiver with.  If none specified, everything 
     *        in the supplier will be used unless it would overwrite an existing 
     *        property in the receiver.  if true is specified as the third 
     *        parameter, all properties will be applied and will overwrite an 
     *        existing property in the receiver
     */
    augmentProto: function(r, s) {
        if (!s||!r) {
            throw new Error("Augment failed, verify dependencies.");
        }
        //var a=[].concat(arguments);
        var a=[r.prototype,s.prototype];
        for (var i=2;i<arguments.length;i=i+1) {
            a.push(arguments[i]);
        }
        ANTLR.lang.augmentObject.apply(this, a);
    },

      
    /**
     * Returns a simple string representation of the object or array.
     * Other types of objects will be returned unprocessed.  Arrays
     * are expected to be indexed.  Use object notation for
     * associative arrays.
     * @method dump
     * @since 2.3.0
     * @param o {Object} The object to dump
     * @param d {int} How deep to recurse child objects, default 3
     * @return {String} the dump result
     */
    dump: function(o, d) {
        var l=ANTLR.lang,i,len,s=[],OBJ="{...}",FUN="f(){...}",
            COMMA=', ', ARROW=' => ';

        // Cast non-objects to string
        // Skip dates because the std toString is what we want
        // Skip HTMLElement-like objects because trying to dump 
        // an element will cause an unhandled exception in FF 2.x
        if (!l.isObject(o)) {
            return o + "";
        } else if (o instanceof Date || ("nodeType" in o && "tagName" in o)) {
            return o;
        } else if  (l.isFunction(o)) {
            return FUN;
        }

        // dig into child objects the depth specifed. Default 3
        d = (l.isNumber(d)) ? d : 3;

        // arrays [1, 2, 3]
        if (l.isArray(o)) {
            s.push("[");
            for (i=0,len=o.length;i<len;i=i+1) {
                if (l.isObject(o[i])) {
                    s.push((d > 0) ? l.dump(o[i], d-1) : OBJ);
                } else {
                    s.push(o[i]);
                }
                s.push(COMMA);
            }
            if (s.length > 1) {
                s.pop();
            }
            s.push("]");
        // objects {k1 => v1, k2 => v2}
        } else {
            s.push("{");
            for (i in o) {
                if (l.hasOwnProperty(o, i)) {
                    s.push(i + ARROW);
                    if (l.isObject(o[i])) {
                        s.push((d > 0) ? l.dump(o[i], d-1) : OBJ);
                    } else {
                        s.push(o[i]);
                    }
                    s.push(COMMA);
                }
            }
            if (s.length > 1) {
                s.pop();
            }
            s.push("}");
        }

        return s.join("");
    },

    /**
     * Does variable substitution on a string. It scans through the string 
     * looking for expressions enclosed in { } braces. If an expression 
     * is found, it is used a key on the object.  If there is a space in
     * the key, the first word is used for the key and the rest is provided
     * to an optional function to be used to programatically determine the
     * value (the extra information might be used for this decision). If 
     * the value for the key in the object, or what is returned from the
     * function has a string value, number value, or object value, it is 
     * substituted for the bracket expression and it repeats.  If this
     * value is an object, it uses the Object's toString() if this has
     * been overridden, otherwise it does a shallow dump of the key/value
     * pairs.
     * @method substitute
     * @since 2.3.0
     * @param s {String} The string that will be modified.
     * @param o {Object} An object containing the replacement values
     * @param f {Function} An optional function that can be used to
     *                     process each match.  It receives the key,
     *                     value, and any extra metadata included with
     *                     the key inside of the braces.
     * @return {String} the substituted string
     */
    substitute: function (s, o, f) {
        var i, j, k, key, v, meta, l=ANTLR.lang, saved=[], token, 
            DUMP='dump', SPACE=' ', LBRACE='{', RBRACE='}';


        for (;;) {
            i = s.lastIndexOf(LBRACE);
            if (i < 0) {
                break;
            }
            j = s.indexOf(RBRACE, i);
            if (i + 1 >= j) {
                break;
            }

            //Extract key and meta info 
            token = s.substring(i + 1, j);
            key = token;
            meta = null;
            k = key.indexOf(SPACE);
            if (k > -1) {
                meta = key.substring(k + 1);
                key = key.substring(0, k);
            }

            // lookup the value
            v = o[key];

            // if a substitution function was provided, execute it
            if (f) {
                v = f(key, v, meta);
            }

            if (l.isObject(v)) {
                if (l.isArray(v)) {
                    v = l.dump(v, parseInt(meta, 10));
                } else {
                    meta = meta || "";

                    // look for the keyword 'dump', if found force obj dump
                    var dump = meta.indexOf(DUMP);
                    if (dump > -1) {
                        meta = meta.substring(4);
                    }

                    // use the toString if it is not the Object toString 
                    // and the 'dump' meta info was not found
                    if (v.toString===Object.prototype.toString||dump>-1) {
                        v = l.dump(v, parseInt(meta, 10));
                    } else {
                        v = v.toString();
                    }
                }
            } else if (!l.isString(v) && !l.isNumber(v)) {
                // This {block} has no replace string. Save it for later.
                v = "~-" + saved.length + "-~";
                saved[saved.length] = token;

                // break;
            }

            s = s.substring(0, i) + v + s.substring(j + 1);


        }

        // restore saved {block}s
        for (i=saved.length-1; i>=0; i=i-1) {
            s = s.replace(new RegExp("~-" + i + "-~"), "{"  + saved[i] + "}", "g");
        }

        return s;
    },


    /**
     * Returns a string without any leading or trailing whitespace.  If 
     * the input is not a string, the input will be returned untouched.
     * @method trim
     * @since 2.3.0
     * @param s {string} the string to trim
     * @return {string} the trimmed string
     */
    trim: function(s){
        try {
            return s.replace(/^\s+|\s+$/g, "");
        } catch(e) {
            return s;
        }
    },

    /**
     * Returns a new object containing all of the properties of
     * all the supplied objects.  The properties from later objects
     * will overwrite those in earlier objects.
     * @method merge
     * @since 2.3.0
     * @param arguments {Object*} the objects to merge
     * @return the new merged object
     */
    merge: function() {
        var o={}, a=arguments;
        for (var i=0, l=a.length; i<l; i=i+1) {
            ANTLR.lang.augmentObject(o, a[i], true);
        }
        return o;
    },

    /**
     * A convenience method for detecting a legitimate non-null value.
     * Returns false for null/undefined/NaN, true for other values, 
     * including 0/false/''
     * @method isValue
     * @since 2.3.0
     * @param o {any} the item to test
     * @return {boolean} true if it is not null/undefined/NaN || false
     */
    isValue: function(o) {
        // return (o || o === false || o === 0 || o === ''); // Infinity fails
        var l = ANTLR.lang;
return (l.isObject(o) || l.isString(o) || l.isNumber(o) || l.isBoolean(o));
    },

    array: {
        /**
         * Retrieve the last element of an array. Throws an error if a is not
         * an array or empty.
         * @method peek
         * @param a {Array} the array stack to peek in
         * @return the last element of the array
         */
         peek: function(a) {
            if (!ANTLR.lang.isArray(a)) {
                throw new Error("ANTLR.lang.array.peek: a is not an array.");
            }
            var l = a.length;
            if (l<=0) {
                throw new Error("ANTLR.lang.array.peek: a is empty.");
            }
            return a[l-1];
        }
    }
};
ANTLR.runtime.IndexOutOfBoundsException = function(m) {
    ANTLR.runtime.IndexOutOfBoundsException.superclass.constructor.call(this, m);
};

ANTLR.lang.extend(ANTLR.runtime.IndexOutOfBoundsException, Error, {
    name: "ANTLR.runtime.IndexOutOfBoundsException"
});
/** The root of the ANTLR exception hierarchy.
 *
 *  To avoid English-only error messages and to generally make things
 *  as flexible as possible, these exceptions are not created with strings,
 *  but rather the information necessary to generate an error.  Then
 *  the various reporting methods in Parser and Lexer can be overridden
 *  to generate a localized error message.  For example, MismatchedToken
 *  exceptions are built with the expected token type.
 *  So, don't expect getMessage() to return anything.
 *
 *  ANTLR generates code that throws exceptions upon recognition error and
 *  also generates code to catch these exceptions in each rule.  If you
 *  want to quit upon first error, you can turn off the automatic error
 *  handling mechanism using rulecatch action, but you still need to
 *  override methods mismatch and recoverFromMismatchSet.
 *
 *  In general, the recognition exceptions can track where in a grammar a
 *  problem occurred and/or what was the expected input.  While the parser
 *  knows its state (such as current input symbol and line info) that
 *  state can change before the exception is reported so current token index
 *  is computed and stored at exception time.  From this info, you can
 *  perhaps print an entire line of input not just a single token, for example.
 *  Better to just say the recognizer had a problem and then let the parser
 *  figure out a fancy report.
 */
ANTLR.runtime.RecognitionException = function(input) {
    ANTLR.runtime.RecognitionException.superclass.constructor.call(this);
    this.input = input;
    this.index = input.index();
    if ( input instanceof ANTLR.runtime.CommonTokenStream ) {
        this.token = input.LT(1);
        this.line = this.token.getLine();
        this.charPositionInLine = this.token.getCharPositionInLine();
    }
    if ( input instanceof ANTLR.runtime.tree.TreeNodeStream ) {
        this.extractInformationFromTreeNodeStream(input);
    }
    else if ( input instanceof ANTLR.runtime.ANTLRStringStream ) {
        // Note: removed CharStream from hierarchy in JS port so checking for
        // StringStream instead
        this.c = input.LA(1);
        this.line = input.getLine();
        this.charPositionInLine = input.getCharPositionInLine();
    }
    else {
        this.c = input.LA(1);
    }

    this.message = this.toString();
};

ANTLR.lang.extend(ANTLR.runtime.RecognitionException, Error, {
	/** What input stream did the error occur in? */
    input: null,

	/** What is index of token/char were we looking at when the error occurred? */
	index: null,

	/** The current Token when an error occurred.  Since not all streams
	 *  can retrieve the ith Token, we have to track the Token object.
	 *  For parsers.  Even when it's a tree parser, token might be set.
	 */
	token: null,

	/** If this is a tree parser exception, node is set to the node with
	 *  the problem.
	 */
	node: null,

	/** The current char when an error occurred. For lexers. */
	c: null,

	/** Track the line at which the error occurred in case this is
	 *  generated from a lexer.  We need to track this since the
	 *  unexpected char doesn't carry the line info.
	 */
	line: null,

    name: "ANTLR.runtime.RecognitionException",

	charPositionInLine: null,

	/** If you are parsing a tree node stream, you will encounter som
	 *  imaginary nodes w/o line/col info.  We now search backwards looking
	 *  for most recent token with line/col info, but notify getErrorHeader()
	 *  that info is approximate.
	 */
	approximateLineInfo: null,

	extractInformationFromTreeNodeStream: function(input) {
		var nodes = input,
            priorNode,
            priorPayLoad,
            tyype,
            text,
            i;

		this.node = nodes.LT(1);
		var adaptor = nodes.getTreeAdaptor(),
		    payload = adaptor.getToken(node);
		if ( payload ) {
			this.token = payload;
			if ( payload.getLine()<= 0 ) {
				// imaginary node; no line/pos info; scan backwards
				i = -1;
				priorNode = nodes.LT(i);
				while ( priorNode ) {
					priorPayload = adaptor.getToken(priorNode);
					if ( priorPayload && priorPayload.getLine()>0 ) {
						// we found the most recent real line / pos info
						this.line = priorPayload.getLine();
						this.charPositionInLine = priorPayload.getCharPositionInLine();
						this.approximateLineInfo = true;
						break;
					}
					--i;
					priorNode = nodes.LT(i);
				}
			}
			else { // node created from real token
				this.line = payload.getLine();
				this.charPositionInLine = payload.getCharPositionInLine();
			}
		}
		else if ( this.node instanceof ANTLR.util.Tree) {
			this.line = this.node.getLine();
			this.charPositionInLine = this.node.getCharPositionInLine();
			if ( this.node instanceof CommonTree) {
				this.token = this.node.token;
			}
		}
		else {
			tyype = adaptor.getType(this.node);
			text = adaptor.getText(this.node);
			this.token = new CommonToken(tyype, text);
		}
	},

	/** Return the token type or char of the unexpected input element */
    getUnexpectedType: function() {
		if ( this.input instanceof ANTLR.runtime.CommonTokenStream ) {
			return this.token.getType();
		}
		else if ( this.input instanceof ANTLR.runtime.tree.TreeNodeStream ) {
			var nodes = this.input;
			var adaptor = this.nodes.getTreeAdaptor();
			return adaptor.getType(node);
		}
		else {
			return this.c;
		}
	}
});
ANTLR.runtime.MismatchedTokenException = function(expecting, input) {
    ANTLR.runtime.MismatchedTokenException.superclass.constructor.call(
            this, input);
    this.expecting = expecting;
};

ANTLR.lang.extend(
    ANTLR.runtime.MismatchedTokenException,
    ANTLR.runtime.RecognitionException, {
    toString: function() {
        return "MismatchedTokenException(" +
                this.getUnexpectedType() + "!=" + this.expecting + ")";
    },
    name: "ANTLR.runtime.MismatchedTokenException"
});
ANTLR.runtime.NoViableAltException = function(grammarDecisionDescription,
                                            decisionNumber,
                                            stateNumber,
                                            input)
{
    ANTLR.runtime.NoViableAltException.superclass.constructor.call(this, input);
    this.grammarDecisionDescription = grammarDecisionDescription;
    this.decisionNumber = decisionNumber;
    this.stateNumber = stateNumber;
};

ANTLR.lang.extend(
    ANTLR.runtime.NoViableAltException,
    ANTLR.runtime.RecognitionException, {
    toString: function() {
        return "NoViableAltException("+this.getUnexpectedType()+"!=["+this.grammarDecisionDescription+"])";
    },
    name: "ANTLR.runtime.NoViableAltException"
});
ANTLR.runtime.EarlyExitException = function(decisionNumber, input) {
    ANTLR.runtime.EarlyExitException.superclass.constructor.call(
            this, input);
    this.decisionNumber = decisionNumber;
};

ANTLR.lang.extend(ANTLR.runtime.EarlyExitException, ANTLR.runtime.RecognitionException, { name: "ANTLR.runtime.EarlyExitException" });
ANTLR.runtime.MismatchedSetException = function(expecting, input) {
    ANTLR.runtime.MismatchedSetException.superclass.constructor.call(
            this, input);
    this.expecting = expecting;
};

ANTLR.lang.extend(
    ANTLR.runtime.MismatchedSetException,
    ANTLR.runtime.RecognitionException, {
    toString: function() {
        return "MismatchedSetException(" +
                this.getUnexpectedType() + "!=" + this.expecting + ")";
    },
    name: "ANTLR.runtime.MismatchedSetException"
});
ANTLR.runtime.MismatchedNotSetException = function(expecting, input) {
    ANTLR.runtime.MismatchedNotSetException.superclass.constructor.call(this, expecting, input);
};

ANTLR.lang.extend(
    ANTLR.runtime.MismatchedNotSetException,
    ANTLR.runtime.MismatchedSetException, {
    toString: function() {
        return "MismatchedNotSetException(" +
                this.getUnexpectedType() + "!=" + this.expecting + ")";
    },
    name: "ANTLR.runtime.MismatchedNotSetException"
});
ANTLR.runtime.MismatchedRangeException = function(a, b, input) {
    ANTLR.runtime.MismatchedRangeException.superclass.constructor.call(
            this, input);
    this.a = a;
    this.b = b;
};

ANTLR.lang.extend(
    ANTLR.runtime.MismatchedRangeException,
    ANTLR.runtime.RecognitionException, {
    toString: function() {
        return "MismatchedRangeException(" +
                this.getUnexpectedType()+" not in ["+this.a+","+this.b+"])";
    },
    name: "ANTLR.runtime.MismatchedRangeException"
});
ANTLR.runtime.FailedPredicateException = function(input, ruleName, predicateText){
    ANTLR.runtime.FailedPredicateException.superclass.constructor.call(this, input);
    this.ruleName = ruleName;
    this.predicateText = predicateText;
};

ANTLR.lang.extend(
    ANTLR.runtime.FailedPredicateException,
    ANTLR.runtime.RecognitionException, {
    toString: function() {
        return "FailedPredicateException("+this.ruleName+",{"+this.predicateText+"}?)";
    },
    name: "ANTLR.runtime.FailedPredicateException"
});
/**A BitSet to replace java.util.BitSet.
 *
 * Primary differences are that most set operators return new sets
 * as opposed to oring and anding "in place".  Further, a number of
 * operations were added.  I cannot contain a BitSet because there
 * is no way to access the internal bits (which I need for speed)
 * and, because it is final, I cannot subclass to add functionality.
 * Consider defining set degree.  Without access to the bits, I must
 * call a method n times to test the ith bit...ack!
 *
 * Also seems like or() from util is wrong when size of incoming set is bigger
 * than this.bits.length.
 *
 * JavaScript Note: There is no good way to implement something like this in 
 * JavaScript.  JS has no true int type, arrays are usually implemented as
 * hashes, etc.  This class should probably be nixed for something that is
 * similarly (in)efficient, but more clear.
 *
 * @author Terence Parr
 * @author Joseph Hurst
 */

ANTLR.misc.IntervalSet = function() {
    throw new Error("not implemented");
};

ANTLR.misc.BitSet = function(bits) {
    if (!bits) {
        bits = ANTLR.misc.BitSet.BITS;
    }

    if (ANTLR.lang.isArray(bits)) {
        this.bits = bits;
    } else if(ANTLR.lang.isNumber(bits)) {
        this.bits = []; //new Array(((bits-1) >> ANTLR.misc.BitSet.LOG_BITS)+1);
    }
};

ANTLR.lang.augmentObject(ANTLR.misc.BitSet, {
    BITS: 32,    // number of bits / int 

    LOG_BITS: 5,  // 2^5 == 32 

    /* We will often need to do a mod operator (i mod nbits).  Its
     * turns out that, for powers of two, this mod operation is
     * same as (i & (nbits-1)).  Since mod is slow, we use a
     * precomputed mod mask to do the mod instead.
     */
    MOD_MASK: 31, // BITS - 1

    bitMask: function(bitNumber) {
        var bitPosition = bitNumber & ANTLR.misc.BitSet.MOD_MASK;
        return 1 << bitPosition;
    },

    numWordsToHold: function(el) {
        return (el >> ANTLR.misc.BitSet.LOG_BITS) + 1;
    },

    wordNumber: function(bit) {
        return bit >> ANTLR.misc.BitSet.LOG_BITS; // bit / BITS
    },

    of: function(el, el2) {
        var i, n, s, keys;

        if (ANTLR.lang.isNumber(el)) {
            if (ANTLR.lang.isNumber(el2)) {
                s = new ANTLR.misc.BitSet(el2 + 1);
                for (i = a; i <= b; i++) {
                    n = ANTLR.misc.BitSet.wordNumber(i);
                    s.bits[n] |= ANTLR.misc.BitSet.bitMask(i);
                }
                return s;
            } else {
                s = new ANTLR.misc.BitSet(el + 1);
                s.add(el);
                return s;
            }
        } else if(ANTLR.lang.isArray(el)) {
            s = new ANTLR.misc.BitSet();
            for (i=el.length-1; i>=0; i--) {
                s.add(el[i]);
            }
            return s;
        } else if (el instanceof ANTLR.misc.BitSet) {
            if (!el) {
                return null;
            }
            return el;
        } else if (el instanceof ANTLR.misc.IntervalSet) {
            if (!el) {
                return null;
            }
            s = new ANTLR.misc.BitSet();
            s.addAll(el);
            return s;
        } else if (ANTLR.lang.isObject(el)) {
            keys = [];
            for (i in el) {
                if (ANTLR.lang.isNumber(i)) {
                    keys.push(i);
                }
            }
            return ANTLR.misc.BitSet.of(keys);
        }
    }
});



ANTLR.misc.BitSet.prototype = {
    /** or this element into this set (grow as necessary to accommodate) */
    add: function(el) {
        var n = ANTLR.misc.BitSet.wordNumber(el);
        if (n >= this.bits.length) {
            this.growToInclude(el);
        }
        this.bits[n] |= ANTLR.misc.BitSet.bitMask(el);
    },

    addAll: function(elements) {
        var other,
            i,
            e;

        if ( elements instanceof ANTLR.misc.BitSet ) {
            this.orInPlace(elements);
        }
		else if ( elements instanceof ANTLR.misc.IntervalSet ) {
			other = elements;
			// walk set and add each interval
            /* @todo after implementing intervalset
			for (Iterator iter = other.intervals.iterator(); iter.hasNext();) {
				Interval I = (Interval) iter.next();
				this.orInPlace(BitSet.range(I.a,I.b));
			}*/
		} else if (ANTLR.lang.isArray(elements)) {
    		for (i = 0; i < elements.length; i++) {
	    		e = elements[i];
		    	this.add(e);
    		}
        } else {
            return;
        }
	},

    and: function(a) {
        var s = this.clone();
        s.andInPlace(a);
        return s;
    },

    andInPlace: function(a) {
        var min = Math.min(this.bits.length, a.bits.length),
            i;
        for (i = min - 1; i >= 0; i--) {
            this.bits[i] &= a.bits[i];
        }
        // clear all bits in this not present in a (if this bigger than a).
        for (i = min; i < this.bits.length; i++) {
            this.bits[i] = 0;
        }
    },

    clear: function(el) {
        if (arguments.length===0) {
            var i;
            for (i = this.bits.length - 1; i >= 0; i--) {
                this.bits[i] = 0;
            }
            return;
        }

        var n = ANTLR.misc.BitSet.wordNumber(el);
        if (n >= this.bits.length) {	// grow as necessary to accommodate
            this.growToInclude(el);
        }
        this.bits[n] &= ~ANTLR.misc.BitSet.bitMask(el);
    },

    clone: function() {
        var i, len, b=[];
        for (i=0, len=this.bits.length; i<len; i++) {
            b[i] = this.bits[i];
        }
        return new ANTLR.misc.BitSet(b);
    },

    size: function() {
        var deg = 0, i, word, bit;
        for (i = this.bits.length - 1; i >= 0; i--) {
            word = this.bits[i];
            if (word !== 0) {
                for (bit = ANTLR.misc.BitSet.BITS - 1; bit >= 0; bit--) {
                    if ((word & (1 << bit)) !== 0) {
                        deg++;
                    }
                }
            }
        }
        return deg;
    },

    equals: function(other) {
        if ( !other || !(other instanceof ANTLR.misc.BitSet) ) {
            return false;
        }

        var otherSet = other,
            i,
            n = Math.min(this.bits.length, otherSet.bits.length);

        // for any bits in common, compare
        for (i=0; i<n; i++) {
            if (this.bits[i] != otherSet.bits[i]) {
                return false;
            }
        }

        // make sure any extra bits are off

        if (this.bits.length > n) {
            for (i = n+1; i<this.bits.length; i++) {
                if (this.bits[i] !== 0) {
                    return false;
                }
            }
        }
        else if (otherSet.bits.length > n) {
            for (i = n+1; i<otherSet.bits.length; i++) {
                if (otherSet.bits[i] !== 0) {
                    return false;
                }
            }
        }

        return true;
    },

    /**
     * Grows the set to a larger number of bits.
     * @param bit element that must fit in set
     */
    growToInclude: function(bit) {
        var newSize = Math.max(this.bits.length << 1, ANTLR.misc.BitSet.numWordsToHold(bit)),
            newbits = [], //new Array(newSize),
            i;
        for (i=0, len=this.bits.length; i<len; i++) {
            newbits[i] = this.bits[i];
        }
        this.bits = newbits;
    },

    member: function(el) {
        var n = ANTLR.misc.BitSet.wordNumber(el);
        if (n >= this.bits.length) { return false; }
        return (this.bits[n] & ANTLR.misc.BitSet.bitMask(el)) !== 0;
    },

    /** Get the first element you find and return it.  Return Label.INVALID
     *  otherwise.
     */
    getSingleElement: function() {
        var i;
        for (i = 0; i < (this.bits.length << ANTLR.misc.BitSet.LOG_BITS); i++) {
            if (this.member(i)) {
                return i;
            }
        }
        /* @todo what is Label ? */
        return -1; //Label.INVALID;
    },

    isNil: function() {
        var i;
        for (i = this.bits.length - 1; i >= 0; i--) {
            if (this.bits[i] !== 0) {
                return false;
            }
        }
        return true;
    },

    complement: function(set) {
        if (set) {
            return set.subtract(this);
        } else {
            var s = this.clone();
            s.notInPlace();
            return s;
        }
    },

    notInPlace: function() {
        var minBit, maxBit, i, n;
        if (arguments.length===0) {
            for (i = this.bits.length - 1; i >= 0; i--) {
                this.bits[i] = ~this.bits[i];
            }
        } else {
            if (arguments.length===1) {
                minBit = 0;
                maxBit = arguments[0];
            } else {
                minBit = arguments[0];
                maxBit = arguments[1];
            }
            // make sure that we have room for maxBit
            this.growToInclude(maxBit);
            for (i = minBit; i <= maxBit; i++) {
                n = ANTLR.misc.BitSet.wordNumber(i);
                this.bits[n] ^= ANTLR.misc.BitSet.bitMask(i);
            }
        }

    },

    /** return this | a in a new set */
    or: function(a) {
		if ( !a ) {
			return this;
		}
        var s = this.clone();
        s.orInPlace(a);
        return s;
    },

    orInPlace: function(a) {
		if ( !a ) {
			return;
		}
        // If this is smaller than a, grow this first
        if (a.bits.length > this.bits.length) {
            this.setSize(a.bits.length);
        }
        var min = Math.min(this.bits.length, a.bits.length),
            i;
        for (i = min - 1; i >= 0; i--) {
            this.bits[i] |= a.bits[i];
        }
    },

    // remove this element from this set
    remove: function(el) {
        var n = ANTLR.misc.BitSet.wordNumber(el);
        if (n >= this.bits.length) {
            this.growToInclude(el);
        }
        this.bits[n] &= ~ANTLR.misc.BitSet.bitMask(el);
    },

    /**
     * Sets the size of a set.
     * @param nwords how many words the new set should be
     */
    setSize: function(nwords) {
        var n = nwords - this.bits.length;
        while (n>=0) {
            this.bits.push(0);
            n--;
        }
    },

    numBits: function() {
        return this.bits.length << ANTLR.misc.BitSet.LOG_BITS; // num words * bits per word
    },

    /** return how much space is being used by the bits array not
     *  how many actually have member bits on.
     */
    lengthInLongWords: function() {
        return this.bits.length;
    },

    /**Is this contained within a? */
    subset: function(a) {
        if (!a) { return false; }
        return this.and(a).equals(this);
    },

    /**Subtract the elements of 'a' from 'this' in-place.
     * Basically, just turn off all bits of 'this' that are in 'a'.
     */
    subtractInPlace: function(a) {
        if (!a) { return; }
        // for all words of 'a', turn off corresponding bits of 'this'
        var i;
        for (i = 0; i < this.bits.length && i < a.bits.length; i++) {
            this.bits[i] &= ~a.bits[i];
        }
    },

    subtract: function(a) {
        if (!a || !(a instanceof ANTLR.misc.BitSet)) { return null; }

        var s = this.clone();
        s.subtractInPlace(a);
        return s;
    },

    toList: function() {
		throw new Error("BitSet.toList() unimplemented");
	},

    toArray: function() {
        var elems = [], //new Array(this.size()),
            i,
            en = 0;
        for (i = 0; i < (this.bits.length << ANTLR.misc.BitSet.LOG_BITS); i++) {
            if (this.member(i)) {
                elems[en++] = i;
            }
        }
        return elems;
    },

    toPackedArray: function() {
        return this.bits;
    },

    toString: function() {
        if (arguments.length===0) {
            return this.toString1(null);
        } else {
            if (ANTLR.lang.isString(arguments[0])) {
                if (!ANTLR.lang.isValue(arguments[1])) {
                    return this.toString1(null);
                } else {
                    return this.toString2(arguments[0], arguments[1]);
                }
            } else {
                return this.toString1(arguments[0]);
            }
        }
    },

    /** Transform a bit set into a string by formatting each element as an integer
     * separator The string to put in between elements
     * @return A commma-separated list of values
     */
    toString1: function(g) {
        var buf = "{",
            separator = ",",
            i,
		    havePrintedAnElement = false;

        for (i = 0; i < (this.bits.length << ANTLR.misc.BitSet.LOG_BITS); i++) {
            if (this.member(i)) {
                if (i > 0 && havePrintedAnElement ) {
                    buf += separator;
                }
                if ( g ) {
                    buf += g.getTokenDisplayName(i);
                }
                else {
                    buf += i.toString();
                }
				havePrintedAnElement = true;
            }
        }
        return buf + "}";
    },

    /**Create a string representation where instead of integer elements, the
     * ith element of vocabulary is displayed instead.  Vocabulary is a Vector
     * of Strings.
     * separator The string to put in between elements
     * @return A commma-separated list of character constants.
     */
    toString2: function(separator, vocabulary) {
        var str = "",
            i;
        for (i = 0; i < (this.bits.length << ANTLR.misc.BitSet.LOG_BITS); i++) {
            if (this.member(i)) {
                if (str.length > 0) {
                    str += separator;
                }
                if (i >= vocabulary.size()) {
                    str += "'" + i + "'";
                }
                else if (!ANTLR.lang.isValue(vocabulary.get(i))) {
                    str += "'" + i + "'";
                }
                else {
                    str += vocabulary.get(i);
                }
            }
        }
        return str;
    },

    /**
     * Dump a comma-separated list of the words making up the bit set.
     * Split each 64 bit number into two more manageable 32 bit numbers.
     * This generates a comma-separated list of C++-like unsigned long constants.
     */
    toStringOfHalfWords: function() {
        var s = "",
            tmp,
            i;
        for (i = 0; i < this.bits.length; i++) {
            if (i !== 0) {
                s+=", ";
            }
            tmp = this.bits[i];
            tmp &= 0xFFFF;
            s += tmp + "UL, ";
            tmp = this.bits[i] >> 16;
            tmp &= 0xFFFF;
            s += tmp+"UL";
        }
		return s;
    },

    /**
     * Dump a comma-separated list of the words making up the bit set.
     * This generates a comma-separated list of Java-like long int constants.
     */
    toStringOfWords: function() {
        var s="",
            i;
        for (i = 0; i < this.bits.length; i++) {
            if (i !== 0) {
                s+=", ";
            }
            s += this.bits[i]+"L";
        }
        return s;
    },

    toStringWithRanges: function() {
        return this.toString();
    }
};
ANTLR.runtime.CharStream = {
    EOF: -1
};
ANTLR.runtime.CommonToken = function() {
    var oldToken;

    this.charPositionInLine = -1; // set to invalid position
	this.channel = 0; // ANTLR.runtime.CommonToken.DEFAULT_CHANNEL
    this.index = -1;

    if (arguments.length == 1) {
        if (ANTLR.lang.isNumber(arguments[0])) {
            this.tyype = arguments[0];
        } else {
            oldToken = arguments[0];
            this.text = oldToken.getText();
            this.tyype = oldToken.getType();
            this.line = oldToken.getLine();
            this.index = oldToken.getTokenIndex();
            this.charPositionInLine = oldToken.getCharPositionInLine();
            this.channel = oldToken.getChannel();
        }
    } else if (arguments.length == 2) {
        this.tyype = arguments[0];
        this.text = arguments[1];
        this.channel = 0; // ANTLR.runtime.CommonToken.DEFAULT_CHANNEL
    } else if (arguments.length == 5) {
        this.input = arguments[0];
        this.tyype = arguments[1];
        this.channel = arguments[2];
        this.start = arguments[3];
        this.stop = arguments[4];
    }
};

ANTLR.runtime.CommonToken.prototype = {
    getType: function() {
		return this.tyype;
	},

    setLine: function(line) {
		this.line = line;
	},

    getText: function() {
		if ( ANTLR.lang.isString(this.text) ) {
			return this.text;
		}
		if ( !this.input ) {
			return null;
		}
		this.text = this.input.substring(this.start,this.stop);
		return this.text;
	},

	/** Override the text for this token.  getText() will return this text
	 *  rather than pulling from the buffer.  Note that this does not mean
	 *  that start/stop indexes are not valid.  It means that that input
	 *  was converted to a new string in the token object.
	 */
    setText: function(text) {
		this.text = text;
	},

    getLine: function() {
		return this.line;
	},

    getCharPositionInLine: function() {
		return this.charPositionInLine;
	},

    setCharPositionInLine: function(charPositionInLine) {
		this.charPositionInLine = charPositionInLine;
	},

    getChannel: function() {
		return this.channel;
	},

    setChannel: function(channel) {
		this.channel = channel;
	},

    setType: function(tyype) {
		this.tyype = tyype;
	},

    getStartIndex: function() {
		return this.start;
	},

    setStartIndex: function(start) {
		this.start = start;
	},

    getStopIndex: function() {
		return this.stop;
	},

    setStopIndex: function(stop) {
		this.stop = stop;
	},

    getTokenIndex: function() {
		return this.index;
	},

    setTokenIndex: function(index) {
		this.index = index;
	},

    toString: function() {
		var channelStr = "";
		if ( this.channel>0 ) {
			channelStr=",channel="+this.channel;
		}
		var txt = this.getText();
		if ( !ANTLR.lang.isNull(txt) ) {
			txt = txt.replace(/\n/g,"\\\\n");
			txt = txt.replace(/\r/g,"\\\\r");
			txt = txt.replace(/\t/g,"\\\\t");
		}
		else {
			txt = "<no text>";
		}
		return "[@"+this.getTokenIndex()+","+this.start+":"+this.stop+"='"+txt+"',<"+this.tyype+">"+this.channelStr+","+this.line+":"+this.getCharPositionInLine()+"]";
	}
};
ANTLR.runtime.Token = {
    EOR_TOKEN_TYPE: 1,

    /** imaginary tree navigation type; traverse "get child" link */
    DOWN: 2,
    /** imaginary tree navigation type; finish with a child list */
    UP: 3,

    MIN_TOKEN_TYPE: 4, // UP+1,

    EOF: ANTLR.runtime.CharStream.EOF,
    EOF_TOKEN: new ANTLR.runtime.CommonToken(ANTLR.runtime.CharStream.EOF),

    INVALID_TOKEN_TYPE: 0,
    INVALID_TOKEN: new ANTLR.runtime.CommonToken(0),

    /** In an action, a lexer rule can set token to this SKIP_TOKEN and ANTLR
     *  will avoid creating a token for this symbol and try to fetch another.
     */
    SKIP_TOKEN: new ANTLR.runtime.CommonToken(0),

    /** All tokens go to the parser (unless skip() is called in that rule)
     *  on a particular "channel".  The parser tunes to a particular channel
     *  so that whitespace etc... can go to the parser on a "hidden" channel.
     */
    DEFAULT_CHANNEL: 0,

    /** Anything on different channel than DEFAULT_CHANNEL is not parsed
     *  by parser.
     */
    HIDDEN_CHANNEL: 99
};

ANTLR.lang.augmentObject(ANTLR.runtime.CommonToken, ANTLR.runtime.Token);
ANTLR.runtime.tree.RewriteCardinalityException = function(elementDescription) {
    this.elementDescription = elementDescription;
};

/** Base class for all exceptions thrown during AST rewrite construction.
 *  This signifies a case where the cardinality of two or more elements
 *  in a subrule are different: (ID INT)+ where |ID|!=|INT|
 */
ANTLR.lang.extend(ANTLR.runtime.tree.RewriteCardinalityException, Error, {
    getMessage: function() {
		if ( ANTLR.lang.isString(this.elementDescription) ) {
			return this.elementDescription;
		}
		return null;
	},
    name: function() {
        return "ANTLR.runtime.tree.RewriteCardinalityException";
    }
});
/** Ref to ID or expr but no tokens in ID stream or subtrees in expr stream */
ANTLR.runtime.tree.RewriteEmptyStreamException = function(elementDescription) {
    var sup = ANTLR.runtime.tree.RewriteEmptyStreamException.superclass; 
    sup.constructor.call(this, elementDescription);
};

ANTLR.lang.extend(ANTLR.runtime.tree.RewriteEmptyStreamException,
                  ANTLR.runtime.tree.RewriteCardinalityException, {
    name: function() {
        return "ANTLR.runtime.tree.RewriteEmptyStreamException";
    }
});
/** No elements within a (...)+ in a rewrite rule */
ANTLR.runtime.tree.RewriteEarlyExitException = function(elementDescription) {
    var sup = ANTLR.runtime.tree.RewriteEarlyExitException.superclass;
    if (ANTLR.lang.isUndefined(elementDescription)) {
        elementDescription = null;
    }
    sup.constructor.call(this, elementDescription);
};

ANTLR.lang.extend(ANTLR.runtime.tree.RewriteEarlyExitException,
                  ANTLR.runtime.tree.RewriteCardinalityException, {
    name: function() {
        return "ANTLR.runtime.tree.RewriteEarlyExitException";
    }    
});
ANTLR.runtime.MismatchedTreeNodeException = function(expecting, input) {
    if (expecting && input) {
        ANTLR.runtime.MismatchedTreeNodeException.superclass.constructor.call(
                this, input);
        this.expecting = expecting;
    }
};

ANTLR.lang.extend(
    ANTLR.runtime.MismatchedTreeNodeException,
    ANTLR.runtime.RecognitionException, {
    toString: function() {
        return "MismatchedTreeNodeException(" +
                this.getUnexpectedType() + "!=" + this.expecting + ")";
    },
    name: "ANTLR.runtime.MismatchedTreeNodeException"
});
/** A generic tree implementation with no payload.  You must subclass to
 *  actually have any user data.  ANTLR v3 uses a list of children approach
 *  instead of the child-sibling approach in v2.  A flat tree (a list) is
 *  an empty node whose children represent the list.  An empty, but
 *  non-null node is called "nil".
 */
ANTLR.runtime.tree.BaseTree = function() {};

ANTLR.runtime.tree.BaseTree.prototype = {
    getChild: function(i) {
		if ( !this.children || i>=this.children.length ) {
			return null;
		}
		return this.children[i];
	},

    getFirstChildWithType: function(tyype) {
        var i, t;
		for (i = 0; this.children && i < this.children.length; i++) {
			t = this.children[i];
			if ( t.getType()===tyype ) {
				return t;
			}
		}	
		return null;
	},

    getChildCount: function() {
		if ( !this.children ) {
			return 0;
		}
		return this.children.length;
	},

	/** Add t as child of this node.
	 *
	 *  Warning: if t has no children, but child does
	 *  and child isNil then this routine moves children to t via
	 *  t.children = child.children; i.e., without copying the array.
	 */
    addChild: function(t) {
		if ( !ANTLR.lang.isValue(t) ) {
			return; // do nothing upon addChild(null)
		}
		var childTree = t, n, i;
		if ( childTree.isNil() ) { // t is an empty node possibly with children
			if ( this.children && this.children == childTree.children ) {
				throw new Error("attempt to add child list to itself");
			}
			// just add all of childTree's children to this
			if ( childTree.children ) {
				if ( this.children ) { // must copy, this has children already
					n = childTree.children.length;
					for (i = 0; i < n; i++) {
						this.children.push(childTree.children[i]);
					}
				}
				else {
					// no children for this but t has children; just set pointer
					this.children = childTree.children;
				}
			}
		}
		else { // t is not empty and might have children
			if ( !this.children ) {
				this.children = this.createChildrenList(); // create children list on demand
			}
			this.children.push(t);
		}
	},

	/** Add all elements of kids list as children of this node */
    addChildren: function(kids) {
        var i, t;
		for (i = 0; i < kids.length; i++) {
			t = kids[i];
			this.addChild(t);
		}
	},

    setChild: function(i, t) {
		if ( !this.children ) {
			this.children = this.createChildrenList();
		}
		this.children[i] = t;
	},

    deleteChild: function(i) {
        if ( !this.children ) {
			return null;
		}
        if (i<0 || i>=this.children.length) {
            throw new Error("Index out of bounds.");
        }
		return this.children.splice(i, 1)[0];
	},

	/** Override in a subclass to change the impl of children list */
    createChildrenList: function() {
		return [];
	},

    isNil: function() {
		return false;
	},

    getTree: function() {
        return this;
    },

	/** Recursively walk this tree, dup'ing nodes until you have copy of
	 *  this tree.  This method should work for all subclasses as long
	 *  as they override dupNode().
	 */
    dupTree: function() {
		var newTree = this.dupNode(),
            i,
            t,
            newSubTree;
		for (i = 0; this.children && i < this.children.length; i++) {
			t = this.children[i];
			newSubTree = t.dupTree();
			newTree.addChild(newSubTree);
		}
		return newTree;
	},

	/** Print out a whole tree not just a node */
    toStringTree: function() {
		if ( !this.children || this.children.length===0 ) {
			return this.toString();
		}
		var buf = "",
            i,
            t;
		if ( !this.isNil() ) {
			buf += "(";
			buf += this.toString();
			buf += ' ';
		}
		for (i = 0; this.children && i < this.children.length; i++) {
			t = this.children[i];
			if ( i>0 ) {
				buf += ' ';
			}
			buf += t.toStringTree();
		}
		if ( !this.isNil() ) {
			buf += ")";
		}
		return buf;
	},

    getLine: function() {
		return 0;
	},

    getCharPositionInLine: function() {
		return 0;
	}
};
ANTLR.runtime.tree.CommonTree = function(node) {
    this.startIndex = -1;
    this.stopIndex = -1;

    if (node instanceof ANTLR.runtime.tree.CommonTree) {
        ANTLR.runtime.tree.CommonTree.superclass.constructor.call(this, node);
        this.token = node.token;
    } else if (node instanceof ANTLR.runtime.CommonToken) {
        this.token = node;
    }
};

/** A tree node that is wrapper for a Token object. */
ANTLR.lang.extend(ANTLR.runtime.tree.CommonTree, ANTLR.runtime.tree.BaseTree, {
    getToken: function() {
		return this.token;
	},

    dupNode: function() {
		return new ANTLR.runtime.tree.CommonTree(this);
	},

    isNil: function() {
		return !this.token;
	},

    getType: function() {
		if ( !this.token ) {
			return 0;
		}
		return this.token.getType();
	},

    getText: function() {
		if ( !this.token ) {
			return null;
		}
		return this.token.getText();
	},

    getLine: function() {
		if ( !this.token || this.token.getLine()===0 ) {
			if ( this.getChildCount()>0 ) {
				return this.getChild(0).getLine();
			}
			return 0;
		}
		return this.token.getLine();
	},

    getCharPositionInLine: function() {
		if ( !this.token || this.token.getCharPositionInLine()===-1 ) {
			if ( this.getChildCount()>0 ) {
				return this.getChild(0).getCharPositionInLine();
			}
			return 0;
		}
		return this.token.getCharPositionInLine();
	},

    getTokenStartIndex: function() {
		if ( this.startIndex===-1 && this.token ) {
			return this.token.getTokenIndex();
		}
		return this.startIndex;
	},

    setTokenStartIndex: function(index) {
		this.startIndex = index;
	},

    getTokenStopIndex: function() {
		if ( this.stopIndex==-1 && this.token ) {
			return this.token.getTokenIndex();
		}
		return this.stopIndex;
	},

    setTokenStopIndex: function(index) {
		this.stopIndex = index;
	},

    toString: function() {
		if ( this.isNil() ) {
			return "nil";
		}
		return this.token.getText();
	}
});
/** What does a tree look like?  ANTLR has a number of support classes
 *  such as CommonTreeNodeStream that work on these kinds of trees.  You
 *  don't have to make your trees implement this interface, but if you do,
 *  you'll be able to use more support code.
 *
 *  NOTE: When constructing trees, ANTLR can build any kind of tree; it can
 *  even use Token objects as trees if you add a child list to your tokens.
 *
 *  This is a tree node without any payload; just navigation and factory stuff.
 */
ANTLR.runtime.tree.Tree = {
	INVALID_NODE: new ANTLR.runtime.tree.CommonTree(ANTLR.runtime.Token.INVALID_TOKEN)
};
ANTLR.runtime.tree.BaseTreeAdaptor = function() {
    this.uniqueNodeID = 1;
};

ANTLR.runtime.tree.BaseTreeAdaptor.prototype = {
    nil: function() {
		return this.create(null);
	},

    isNil: function(tree) {
		return tree.isNil();
	},

    dupTree: function(tree) {
		return tree.dupTree();
	},

	/** Add a child to the tree t.  If child is a flat tree (a list), make all
	 *  in list children of t.  Warning: if t has no children, but child does
	 *  and child isNil then you can decide it is ok to move children to t via
	 *  t.children = child.children; i.e., without copying the array.  Just
	 *  make sure that this is consistent with have the user will build
	 *  ASTs.
	 */
    addChild: function(t, child) {
		if ( t && ANTLR.lang.isValue(child) ) {
			t.addChild(child);
		}
	},

	/** If oldRoot is a nil root, just copy or move the children to newRoot.
	 *  If not a nil root, make oldRoot a child of newRoot.
	 *
	 *    old=^(nil a b c), new=r yields ^(r a b c)
	 *    old=^(a b c), new=r yields ^(r ^(a b c))
	 *
	 *  If newRoot is a nil-rooted single child tree, use the single
	 *  child as the new root node.
	 *
	 *    old=^(nil a b c), new=^(nil r) yields ^(r a b c)
	 *    old=^(a b c), new=^(nil r) yields ^(r ^(a b c))
	 *
	 *  If oldRoot was null, it's ok, just return newRoot (even if isNil).
	 *
	 *    old=null, new=r yields r
	 *    old=null, new=^(nil r) yields ^(nil r)
	 *
	 *  Return newRoot.  Throw an exception if newRoot is not a
	 *  simple node or nil root with a single child node--it must be a root
	 *  node.  If newRoot is ^(nil x) return x as newRoot.
	 *
	 *  Be advised that it's ok for newRoot to point at oldRoot's
	 *  children; i.e., you don't have to copy the list.  We are
	 *  constructing these nodes so we should have this control for
	 *  efficiency.
	 */
    becomeRoot: function(newRoot, oldRoot) {
        if (newRoot instanceof ANTLR.runtime.CommonToken || !newRoot) {
            newRoot = this.create(newRoot);
        }

		var newRootTree = newRoot,
    		oldRootTree = oldRoot;
		if ( !oldRoot ) {
			return newRoot;
		}
		// handle ^(nil real-node)
		if ( newRootTree.isNil() ) {
			if ( newRootTree.getChildCount()>1 ) {
				// TODO: make tree run time exceptions hierarchy
				throw new Error("more than one node as root (TODO: make exception hierarchy)");
			}
			newRootTree = newRootTree.getChild(0);
		}
		// add oldRoot to newRoot; addChild takes care of case where oldRoot
		// is a flat list (i.e., nil-rooted tree).  All children of oldRoot
		// are added to newRoot.
		newRootTree.addChild(oldRootTree);
		return newRootTree;
	},

	/** Transform ^(nil x) to x */
    rulePostProcessing: function(root) {
		var r = root;
		if ( r && r.isNil() && r.getChildCount()==1 ) {
			r = r.getChild(0);
		}
		return r;
	},

    create: function(tokenType, fromToken) {
        var text, t;
        if (arguments.length===2) {
            if (ANTLR.lang.isString(arguments[1])) {
                text = arguments[1];
                fromToken = this.createToken(tokenType, text);
                t = this.create(fromToken);
                return t;
            } else {
        		fromToken = this.createToken(fromToken);
                fromToken.setType(tokenType);
                t = this.create(fromToken);
                return t;
            }
        } else if (arguments.length===3) {
            text = arguments[2];
            fromToken = this.createToken(fromToken);
            fromToken.setType(tokenType);
            fromToken.setText(text);
            t = this.create(fromToken);
            return t;
        }
    },

    getType: function(t) {
		t.getType();
		return 0;
	},

    setType: function(t, tyype) {
		throw new Error("don't know enough about Tree node");
	},

    getText: function(t) {
		return t.getText();
	},

    setText: function(t, text) {
		throw new Error("don't know enough about Tree node");
	},

    getChild: function(t, i) {
		return t.getChild(i);
	},

    getChildCount: function(t) {
		return t.getChildCount();
	},

    getUniqueID: function(node) {
		if ( !this.treeToUniqueIDMap ) {
			 this.treeToUniqueIDMap = {};
		}
		var prevID = this.treeToUniqueIDMap[node];
		if ( ANTLR.lang.isValue(prevID) ) {
			return prevID;
		}
		var ID = this.uniqueNodeID;
		this.treeToUniqueIDMap[node] = ID;
		this.uniqueNodeID++;
		return ID;
		// GC makes these nonunique:
		// return System.identityHashCode(node);
	}
};
/** A TreeAdaptor that works with any Tree implementation.  It provides
 *  really just factory methods; all the work is done by BaseTreeAdaptor.
 *  If you would like to have different tokens created than ClassicToken
 *  objects, you need to override this and then set the parser tree adaptor to
 *  use your subclass.
 *
 *  To get your parser to build nodes of a different type, override
 *  create(Token).
 */
ANTLR.runtime.tree.CommonTreeAdaptor = function() {};

ANTLR.lang.extend(ANTLR.runtime.tree.CommonTreeAdaptor,
                  ANTLR.runtime.tree.BaseTreeAdaptor, {
	/** Duplicate a node.  This is part of the factory;
	 *	override if you want another kind of node to be built.
	 *
	 *  I could use reflection to prevent having to override this
	 *  but reflection is slow.
	 */
    dupNode: function(t) {
		if ( !ANTLR.lang.isValue(t) ) {
			return null;
		}
		return t.dupNode();
	},

    create: function(payload) {
        if (arguments.length>1) {
            return ANTLR.runtime.tree.CommonTreeAdaptor.superclass.create.apply(this, arguments);
        }
		return new ANTLR.runtime.tree.CommonTree(payload);
	},

	/** Tell me how to create a token for use with imaginary token nodes.
	 *  For example, there is probably no input symbol associated with imaginary
	 *  token DECL, but you need to create it as a payload or whatever for
	 *  the DECL node as in ^(DECL type ID).
	 *
	 *  If you care what the token payload objects' type is, you should
	 *  override this method and any other createToken variant.
     *
	 * Tell me how to create a token for use with imaginary token nodes.
	 *  For example, there is probably no input symbol associated with imaginary
	 *  token DECL, but you need to create it as a payload or whatever for
	 *  the DECL node as in ^(DECL type ID).
	 *
	 *  This is a variant of createToken where the new token is derived from
	 *  an actual real input token.  Typically this is for converting '{'
	 *  tokens to BLOCK etc...  You'll see
	 *
	 *    r : lc='{' ID+ '}' -> ^(BLOCK[$lc] ID+) ;
	 *
	 *  If you care what the token payload objects' type is, you should
	 *  override this method and any other createToken variant.
	 */
    createToken: function(fromToken) {
        if (arguments.length===2) {
            return new ANTLR.runtime.CommonToken(arguments[0], arguments[1]);
        } else {
		    return new ANTLR.runtime.CommonToken(arguments[0]);
        }
	},

	/** Track start/stop token for subtree root created for a rule.
	 *  Only works with Tree nodes.  For rules that match nothing,
	 *  seems like this will yield start=i and stop=i-1 in a nil node.
	 *  Might be useful info so I'll not force to be i..i.
	 */
    setTokenBoundaries: function(t, startToken, stopToken) {
		if ( !ANTLR.lang.isValue(t) ) {
			return;
		}
		var start = 0,
		    stop = 0;
		if ( ANTLR.lang.isValue(startToken) ) {
			start = startToken.getTokenIndex();
		}
		if ( ANTLR.lang.isValue(stopToken) ) {
			stop = stopToken.getTokenIndex();
		}
		t.setTokenStartIndex(start);
		t.setTokenStopIndex(stop);
	},

    getTokenStartIndex: function(t) {
		if (!t) {
			return -1;
		}
		return t.getTokenStartIndex();
	},

    getTokenStopIndex: function(t) {
		if (!t) {
			return -1;
		}
		return t.getTokenStopIndex();
	},

    getText: function(t) {
		if (!t) {
			return null;
		}
		return t.getText();
	},

    getType: function(t) {
		if (!t) {
			return ANTLR.runtime.Token.INVALID_TOKEN_TYPE;
		}
		return t.getType();
	},

	/** What is the Token associated with this node?  If
	 *  you are not using CommonTree, then you must
	 *  override this in your own adaptor.
	 */
    getToken: function(t) {
		if ( t instanceof ANTLR.runtime.tree.CommonTree ) {
			return t.getToken();
		}
		return null; // no idea what to do
	},

    getChild: function(t, i) {
		if (!t) {
			return null;
		}
        return t.getChild(i);
    },

    getChildCount: function(t) {
		if (!t) {
			return 0;
		}
        return t.getChildCount();
    }
});
ANTLR.runtime.ANTLRStringStream = function(data) {
    /** 0..n-1 index into string of next char */
    this.p = 0;

    /** line number 1..n within the input */
    this.line = 1;

    /** The index of the character relative to the beginning of the line 0..n-1 */
    this.charPositionInLine = 0;

    /** tracks how deep mark() calls are nested */
    this.markDepth = 0;

     /** A list of CharStreamState objects that tracks the stream state
     *  values line, charPositionInLine, and p that can change as you
     *  move through the input stream.  Indexed from 1..markDepth.
     *  A null is kept @ index 0.  Create upon first call to mark().
     */
    this.markers = null;

    /** Track the last mark() call result value for use in rewind(). */
    this.lastMarker = null;

    /** The data being scanned */
    this.data = data;

    /** How many characters are actually in the buffer */
    this.n = data.length;
};

/** Reset the stream so that it's in the same state it was
 *  when the object was created *except* the data array is not
 *  touched.
 */
ANTLR.runtime.ANTLRStringStream.prototype = {
    reset: function() {
       this.p = 0;
       this.line = 1;
       this.charPositionInLine = 0;
       this.markDepth = 0;
    },

    consume: function() {
        if ( this.p < this.n ) {
            this.charPositionInLine++;
            if ( this.data.charAt(this.p)==="\n" ) {
                this.line++;
                this.charPositionInLine=0;
            }
            this.p++;
        }
    },

    LA: function(i) {
        if ( i===0 ) {
            return 0; // undefined
        }
        if ( i<0 ) {
            i++; // e.g., translate LA(-1) to use offset i=0; then data[p+0-1]
            if ( (this.p+i-1) < 0 ) {
                // invalid; no char before first char
                return ANTLR.runtime.CharStream.EOF;
            }
        }

        if ( (this.p+i-1) >= this.n ) {
            return ANTLR.runtime.CharStream.EOF;
        }
        return this.data[this.p+i-1];
    },

    LT: function(i) {
        return this.LA(i);
    },

    /** Return the current input symbol index 0..n where n indicates the
     *  last symbol has been read.  The index is the index of char to
     *  be returned from LA(1).
     */
    index: function() {
        return this.p;
    },

    size: function() {
        return this.n;
    },

    mark: function() {
        if ( !this.markers ) {
            this.markers = [];
            this.markers.push(null); // depth 0 means no backtracking, leave blank
        }
        this.markDepth++;
        var state = null;
        if ( this.markDepth>=this.markers.length ) {
            state = {};
            this.markers.push(state);
        }
        else {
            state = this.markers[this.markDepth];
        }
        state.p = this.p;
        state.line = this.line;
        state.charPositionInLine = this.charPositionInLine;
        this.lastMarker = this.markDepth;
        return this.markDepth;
    },

    rewind: function(m) {
        if (!ANTLR.lang.isNumber(m)) {
            m = this.lastMarker;
        }

        var state = this.markers[m];
        // restore stream state
        this.seek(state.p);
        this.line = state.line;
        this.charPositionInLine = state.charPositionInLine;
        this.release(m);
    },

    release: function(marker) {
        // unwind any other markers made after m and release m
        this.markDepth = marker;
        // release this marker
        this.markDepth--;
    },

    /** consume() ahead until p==index; can't just set p=index as we must
     *  update line and charPositionInLine.
     */
    seek: function(index) {
        if ( index<=this.p ) {
            this.p = index; // just jump; don't update stream state (line, ...)
            return;
        }
        // seek forward, consume until p hits index
        while ( this.p<index ) {
            this.consume();
        }
    },

    substring: function(start, stop) {
        return this.data.substr(start,stop-start+1);
    },

    getLine: function() {
        return this.line;
    },

    getCharPositionInLine: function() {
        return this.charPositionInLine;
    },

    setLine: function(line) {
        this.line = line;
    },

    setCharPositionInLine: function(pos) {
        this.charPositionInLine = pos;
    }
};
/** The most common stream of tokens is one where every token is buffered up
 *  and tokens are prefiltered for a certain channel (the parser will only
 *  see these tokens and cannot change the filter channel number during the
 *  parse).
 *
 *  TODO: how to access the full token stream?  How to track all tokens matched per rule?
 */
ANTLR.runtime.CommonTokenStream = function(tokenSource, channel) {
    this.p = -1;
    this.channel = ANTLR.runtime.Token.DEFAULT_CHANNEL;
    this.discardOffChannelTokens = false;

    this.tokens = [];
    if (arguments.length>0) {
        this.tokenSource = tokenSource;
        if (arguments.length>1) {
            this.channel = channel;
        }
    }
};

ANTLR.runtime.CommonTokenStream.prototype = {
	/** Reset this token stream by setting its token source. */
    setTokenSource: function(tokenSource) {
		this.tokenSource = tokenSource;
		this.tokens = [];
		this.p = -1;
		this.channel = ANTLR.runtime.Token.DEFAULT_CHANNEL;
	},

	/** Load all tokens from the token source and put in tokens.
	 *  This is done upon first LT request because you might want to
	 *  set some token type / channel overrides before filling buffer.
	 */
    fillBuffer: function() {
		var index = 0,
		    t = this.tokenSource.nextToken(),
            discard,
            channelI;
		while ( ANTLR.lang.isValue(t) && 
                t.getType()!=ANTLR.runtime.CharStream.EOF )
        {
            discard = false;
			// is there a channel override for token type?
			if ( this.channelOverrideMap ) {
                channelI = this.channelOverrideMap[t.getType()];
				if ( ANTLR.lang.isValue(channelI) ) {
					t.setChannel(channelI);
				}
			}
			if ( this.discardSet && this.discardSet[t.getType()] )
			{
				discard = true;
			}
			else if ( this.discardOffChannelTokens &&
                    t.getChannel()!=this.channel )
            {
				discard = true;
			}
			if ( !discard )	{
				t.setTokenIndex(index);
				this.tokens.push(t);
				index++;
			}
			t = this.tokenSource.nextToken();
		}
		// leave p pointing at first token on channel
		this.p = 0;
		this.p = this.skipOffTokenChannels(this.p);
    },

	/** Move the input pointer to the next incoming token.  The stream
	 *  must become active with LT(1) available.  consume() simply
	 *  moves the input pointer so that LT(1) points at the next
	 *  input symbol. Consume at least one token.
	 *
	 *  Walk past any token not on the channel the parser is listening to.
	 */
    consume: function() {
		if ( this.p<this.tokens.length ) {
            this.p++;
			this.p = this.skipOffTokenChannels(this.p); // leave p on valid token
        }
    },

	/** Given a starting index, return the index of the first on-channel
	 *  token.
	 */
    skipOffTokenChannels: function(i) {
		var n = this.tokens.length;
		while ( i<n && (this.tokens[i]).getChannel()!=this.channel ) {
			i++;
		}
		return i;
	},

    skipOffTokenChannelsReverse: function(i) {
		while ( i>=0 && (this.tokens[i]).getChannel()!=this.channel ) {
			i--;
		}
		return i;
	},

	/** A simple filter mechanism whereby you can tell this token stream
	 *  to force all tokens of type ttype to be on channel.  For example,
	 *  when interpreting, we cannot exec actions so we need to tell
	 *  the stream to force all WS and NEWLINE to be a different, ignored
	 *  channel.
	 */
    setTokenTypeChannel: function(ttype, channel) {
		if ( !this.channelOverrideMap ) {
			this.channelOverrideMap = {};
		}
        this.channelOverrideMap[ttype] = channel;
	},

    discardTokenType: function(ttype) {
		if ( !this.discardSet ) {
			this.discardSet = {};
		}
        this.discardSet[ttype] = true;
	},

    discardOffChannelTokens: function(discardOffChannelTokens) {
		this.discardOffChannelTokens = discardOffChannelTokens;
	},

    /** Given a start and stop index, return a List of all tokens in
	 *  the token type BitSet.  Return null if no tokens were found.  This
	 *  method looks at both on and off channel tokens.
	 */
    getTokens: function(start, stop, types) {
		if ( this.p === -1 ) {
			this.fillBuffer();
		}

        if (arguments.length===0) {
    		return this.tokens;
        }

        if (ANTLR.lang.isArray(types)) {
            types = new ANTLR.misc.BitSet(types);
        } else if (ANTLR.lang.isNumber(types)) {
            types = ANTLR.misc.BitSet.of(types);
        }

		if ( stop>=this.tokens.length ) {
			stop=this.tokens.length-1;
		}
		if ( start<0 ) {
			start=0;
		}
		if ( start>stop ) {
			return null;
		}

		// list = tokens[start:stop]:{Token t, t.getType() in types}
		var filteredTokens = [],
            i,
            t;
		for (i=start; i<=stop; i++) {
			t = tokens[i];
			if ( !this.types || types.member(t.getType()) ) {
				filteredTokens.push(t);
			}
		}
		if ( filteredTokens.length===0 ) {
			filteredTokens = null;
		}
		return filteredTokens;
	},

	/** Get the ith token from the current position 1..n where k=1 is the
	 *  first symbol of lookahead.
	 */
    LT: function(k) {
		if ( this.p === -1 ) {
			this.fillBuffer();
		}
		if ( k===0 ) {
			return null;
		}
		if ( k<0 ) {
			return this.LB(-1*k);
		}
		if ( (this.p+k-1) >= this.tokens.length ) {
			return ANTLR.runtime.Token.EOF_TOKEN;
		}
		var i = this.p,
		    n = 1;
		// find k good tokens
		while ( n<k ) {
			// skip off-channel tokens
			i = this.skipOffTokenChannels(i+1); // leave p on valid token
			n++;
		}
		if ( i>=this.tokens.length ) {
			return ANTLR.runtime.Token.EOF_TOKEN;
		}
        return this.tokens[i];
    },

	/** Look backwards k tokens on-channel tokens */
    LB: function(k) {
		if ( this.p === -1 ) {
			this.fillBuffer();
		}
		if ( k===0 ) {
			return null;
		}
		if ( (this.p-k)<0 ) {
			return null;
		}

		var i = this.p,
		    n = 1;
		// find k good tokens looking backwards
		while ( n<=k ) {
			// skip off-channel tokens
			i = this.skipOffTokenChannelsReverse(i-1); // leave p on valid token
			n++;
		}
		if ( i<0 ) {
			return null;
		}
		return this.tokens[i];
	},

	/** Return absolute token i; ignore which channel the tokens are on;
	 *  that is, count all tokens not just on-channel tokens.
	 */
    get: function(i) {
		return this.tokens[i];
	},

    LA: function(i) {
        return this.LT(i).getType();
    },

    mark: function() {
		if ( this.p === -1 ) {
			this.fillBuffer();
		}
		this.lastMarker = this.index();
		return this.lastMarker;
	},

    release: function(marker) {
		// no resources to release
	},

    size: function() {
		return this.tokens.length;
	},

    index: function() {
        return this.p;
    },

    rewind: function(marker) {
        if (!ANTLR.lang.isNumber(marker)) {
            marker = this.lastMarker;
        }
		this.seek(marker);
	},

    seek: function(index) {
		this.p = index;
	},

    getTokenSource: function() {
		return this.tokenSource;
	},

    toString: function(start, stop) {
        if (arguments.length===0) {
    		if ( this.p === -1 ) {
	    		this.fillBuffer();
    		}
            start = 0;
            stop = this.tokens.length-1;
        }

        if (!ANTLR.lang.isNumber(start) && !ANTLR.lang.isNumber(stop)) {
		    if ( ANTLR.lang.isValue(start) && ANTLR.lang.isValue(stop) ) {
    			start = start.getTokenIndex();
                stop = stop.getTokenIndex();
    		} else {
    	    	return null;
     	    }
        }

        var buf = "",
            i;
 
        if ( start<0 || stop<0 ) {
            return null;
        }
        if ( this.p == -1 ) {
            this.fillBuffer();
        }
        if ( stop>=this.tokens.length ) {
            stop = this.tokens.length-1;
        }
        for (i = start; i <= stop; i++) {
            t = this.tokens[i];
            buf = buf + this.tokens[i].getText();
        }
        return buf;
    }
};
/* Useful for dumping out the input stream after doing some
 *  augmentation or other manipulations.
 *
 *  You can insert stuff, replace, and delete chunks.  Note that the
 *  operations are done lazily--only if you convert the buffer to a
 *  String.  This is very efficient because you are not moving data around
 *  all the time.  As the buffer of tokens is converted to strings, the
 *  toString() method(s) check to see if there is an operation at the
 *  current index.  If so, the operation is done and then normal String
 *  rendering continues on the buffer.  This is like having multiple Turing
 *  machine instruction streams (programs) operating on a single input tape. :)
 *
 *  Since the operations are done lazily at toString-time, operations do not
 *  screw up the token index values.  That is, an insert operation at token
 *  index i does not change the index values for tokens i+1..n-1.
 *
 *  Because operations never actually alter the buffer, you may always get
 *  the original token stream back without undoing anything.  Since
 *  the instructions are queued up, you can easily simulate transactions and
 *  roll back any changes if there is an error just by removing instructions.
 *  For example,
 *
 *   CharStream input = new ANTLRFileStream("input");
 *   TLexer lex = new TLexer(input);
 *   TokenRewriteStream tokens = new TokenRewriteStream(lex);
 *   T parser = new T(tokens);
 *   parser.startRule();
 *
 *      Then in the rules, you can execute
 *      Token t,u;
 *      ...
 *      input.insertAfter(t, "text to put after t");}
 *         input.insertAfter(u, "text after u");}
 *         System.out.println(tokens.toString());
 *
 *  Actually, you have to cast the 'input' to a TokenRewriteStream. :(
 *
 *  You can also have multiple "instruction streams" and get multiple
 *  rewrites from a single pass over the input.  Just name the instruction
 *  streams and use that name again when printing the buffer.  This could be
 *  useful for generating a C file and also its header file--all from the
 *  same buffer:
 *
 *      tokens.insertAfter("pass1", t, "text to put after t");}
 *         tokens.insertAfter("pass2", u, "text after u");}
 *         System.out.println(tokens.toString("pass1"));
 *         System.out.println(tokens.toString("pass2"));
 *
 *  If you don't use named rewrite streams, a "default" stream is used as
 *  the first example shows.
 */

ANTLR.runtime.TokenRewriteStream = function() {
    var sup = ANTLR.runtime.TokenRewriteStream.superclass;

    /** You may have multiple, named streams of rewrite operations.
     *  I'm calling these things "programs."
     *  Maps String (name) -> rewrite (List)
     */
    this.programs = null;

    /** Map String (program name) -> Integer index */
    this.lastRewriteTokenIndexes = null;


    if (arguments.length===0) {
        this.init();
    } else {
        sup.constructor.apply(this, arguments);
        this.init();
    }
};

(function(){
var trs = ANTLR.runtime.TokenRewriteStream;

ANTLR.lang.augmentObject(trs, {
    DEFAULT_PROGRAM_NAME: "default",
    PROGRAM_INIT_SIZE: 100,
    MIN_TOKEN_INDEX: 0
});

//
// Define the rewrite operation hierarchy
//

trs.RewriteOperation = function(index, text) {
    this.index = index;
    this.text = text;
};

/** Execute the rewrite operation by possibly adding to the buffer.
 *  Return the index of the next token to operate on.
 */
trs.RewriteOperation.prototype = {
    execute: function(buf) {
        return this.index;
    },
    toString: function() {
        /*String opName = getClass().getName();
        int $index = opName.indexOf('$');
        opName = opName.substring($index+1, opName.length());
        return opName+"@"+index+'"'+text+'"';*/
        return this.text;
    }
};

trs.InsertBeforeOp = function(index, text) {
    trs.InsertBeforeOp.superclass.constructor.call(this, index, text);
};
ANTLR.lang.extend(trs.InsertBeforeOp, trs.RewriteOperation, {
    execute: function(buf) {
        buf.push(this.text);
        return this.index;
    }
});

/** I'm going to try replacing range from x..y with (y-x)+1 ReplaceOp
 *  instructions.
 */
trs.ReplaceOp = function(from, to, text) {
    trs.ReplaceOp.superclass.constructor.call(this, from, text); 
    this.lastIndex = to;
};
ANTLR.lang.extend(trs.ReplaceOp, trs.RewriteOperation, {
    execute: function(buf) {
        if (ANTLR.lang.isValue(this.text)) {
            buf.push(this.text);
        }
        return this.lastIndex+1;
    }
});

trs.DeleteOp = function(from, to) {
    trs.DeleteOp.superclass.constructor.call(this, from, to); 
};
ANTLR.lang.extend(trs.DeleteOp, trs.ReplaceOp);

ANTLR.lang.extend(trs, ANTLR.runtime.CommonTokenStream, {
    init: function() {
        this.programs = {};
        this.programs[trs.DEFAULT_PROGRAM_NAME] = [];
        this.lastRewriteTokenIndexes = {};
    },

    /** Rollback the instruction stream for a program so that
     *  the indicated instruction (via instructionIndex) is no
     *  longer in the stream.  UNTESTED!
     */
    rollback: function() {
        var programName,
            instructionIndex;

        if (arguments.length===1) {
            programName = trs.DEFAULT_PROGRAM_NAME;
            instructionIndex = arguments[0];
        } else if (arguments.length===2) {
            programName = arguments[0];
            instructionIndex = arguments[1];
        }
        var iss = this.programs[programName];
        if (iss) {
            programs[programName] = iss.slice(trs.MIN_TOKEN_INDEX, this.instructionIndex);
        }
    },

    /** Reset the program so that no instructions exist */
    deleteProgram: function(programName) {
        programName = programName || trs.DEFAULT_PROGRAM_NAME;
        this.rollback(programName, trs.MIN_TOKEN_INDEX);
    },

    /** Add an instruction to the rewrite instruction list ordered by
     *  the instruction number (use a binary search for efficiency).
     *  The list is ordered so that toString() can be done efficiently.
     *
     *  When there are multiple instructions at the same index, the instructions
     *  must be ordered to ensure proper behavior.  For example, a delete at
     *  index i must kill any replace operation at i.  Insert-before operations
     *  must come before any replace / delete instructions.  If there are
     *  multiple insert instructions for a single index, they are done in
     *  reverse insertion order so that "insert foo" then "insert bar" yields
     *  "foobar" in front rather than "barfoo".  This is convenient because
     *  I can insert new InsertOp instructions at the index returned by
     *  the binary search.  A ReplaceOp kills any previous replace op.  Since
     *  delete is the same as replace with null text, i can check for
     *  ReplaceOp and cover DeleteOp at same time. :)
     */
    addToSortedRewriteList: function() {
        var programName,
            op;
        if (arguments.length===1) {
            programName = trs.DEFAULT_PROGRAM_NAME;
            op = arguments[0];
        } else if (arguments.length===2) {
            programName = arguments[0];
            op = arguments[1];
        }

        var rewrites = this.getProgram(programName);
        var len, pos, searchOp, replaced, prevOp, i;
        for (pos=0, len=rewrites.length; pos<len; pos++) {
            searchOp = rewrites[pos];
            if (searchOp.index===op.index) {
                // now pos is the index in rewrites of first op with op.index

                // an instruction operating already on that index was found;
                // make this one happen after all the others
                if (op instanceof trs.ReplaceOp) {
                    replaced = false;
                    // look for an existing replace
                    for (i=pos; i<rewrites.length; i++) {
                        prevOp = rewrites[pos];
                        if (prevOp.index!==op.index) {
                            break;
                        }
                        if (prevOp instanceof trs.ReplaceOp) {
                            rewrites[pos] = op; // replace old with new
                            replaced=true;
                            break;
                        }
                        // keep going; must be an insert
                    }
                    if ( !replaced ) {
                        // add replace op to the end of all the inserts
                        rewrites.splice(i, 0, op);
                    }
                } else {
                    // inserts are added in front of existing inserts
                    rewrites.splice(pos, 0, op);
                }
                break;
            } else if (searchOp.index > op.index) {
                rewrites.splice(pos, 0, op);
                break;
            }
        }
        if (pos===len) {
            rewrites.push(op);
        }
    },

    insertAfter: function() {
        var index, programName, text;
        if (arguments.length===2) {
            programName = trs.DEFAULT_PROGRAM_NAME;
            index = arguments[0];
            text = arguments[1];
        } else if (arguments.length===3) {
            programName = arguments[0];
            index = arguments[1];
            text = arguments[2];
        }

        if (index instanceof ANTLR.runtime.CommonToken) {
            // index is a Token, grab it's stream index
            index = index.index; // that's ugly
        }

        // insert after is the same as insert before the next index
        this.insertBefore(programName, index+1, text);
    },

    insertBefore: function() {
        var index, programName, text;
        if (arguments.length===2) {
            programName = trs.DEFAULT_PROGRAM_NAME;
            index = arguments[0];
            text = arguments[1];
        } else if (arguments.length===3) {
            programName = arguments[0];
            index = arguments[1];
            text = arguments[2];
        }

        if (index instanceof ANTLR.runtime.CommonToken) {
            // index is a Token, grab it's stream index
            index = index.index; // that's ugly
        }

        this.addToSortedRewriteList(
                programName,
                new trs.InsertBeforeOp(index,text)
                );
    },

    replace: function() {
        var programName, first, last, text;
        if (arguments.length===2) {
            programName = trs.DEFAULT_PROGRAM_NAME;
            first = arguments[0];
            last = arguments[0];
            text = arguments[1];
        } else if (arguments.length===3) {
            programName = trs.DEFAULT_PROGRAM_NAME;
            first = arguments[0];
            last = arguments[1];
            text = arguments[2];
        } if (arguments.length===4) {
            programName = arguments[0];
            first = arguments[1];
            last = arguments[2];
            text = arguments[3];
        } 

        if (first instanceof ANTLR.runtime.CommonToken) {
            first = first.index;
        }

        if (last instanceof ANTLR.runtime.CommonToken) {
            last = last.index; // that's ugly
        }

        if ( first > last || last<0 || first<0 ) {
            return;
        }
        this.addToSortedRewriteList(
                programName,
                new trs.ReplaceOp(first, last, text));
    },

    // !!! API Break: delete is a JS keyword, so using remove instead.
    remove: function() {
        // convert arguments to a real array
        var args=[], i=arguments.length-1;
        while (i>=0) {
            args[i] = arguments[i];
            i--;
        }

        args.push("");
        this.replace.apply(this, args);
    },

    getLastRewriteTokenIndex: function(programName) {
        programName = programName || trs.DEFAULT_PROGRAM_NAME;
        return this.lastRewriteTokenIndexes[programName] || -1;
    },

    setLastRewriteTokenIndex: function(programName, i) {
        this.lastRewriteTokenIndexes[programName] = i;
    },

    getProgram: function(name) {
        var iss = this.programs[name];
        if ( !iss ) {
            iss = this.initializeProgram(name);
        }
        return iss;
    },

    initializeProgram: function(name) {
        var iss = [];
        this.programs[name] = iss;
        return iss;
    },

    toOriginalString: function(start, end) {
        if (!ANTLR.lang.isNumber(start)) {
            start = trs.MIN_TOKEN_INDEX;
        }
        if (!ANTLR.lang.isNumber(end)) {
            end = this.size()-1;
        }

        var buf = [], i;
        for (i=start; i>=trs.MIN_TOKEN_INDEX && i<=end && i<this.tokens.length; i++) {
            buf.push(this.get(i).getText());
        }
        return buf.join("");
    },

    toString: function() {
        var programName, start, end;
        if (arguments.length===0) {
            programName = trs.DEFAULT_PROGRAM_NAME;
            start = trs.MIN_TOKEN_INDEX;
            end = this.size() - 1;
        } else if (arguments.length===1) {
            programName = arguments[0];
            start = trs.MIN_TOKEN_INDEX;
            end = this.size() - 1;
        } else if (arguments.length===2) {
            programName = trs.DEFAULT_PROGRAM_NAME;
            start = arguments[0];
            end = arguments[1];
        }

        var rewrites = this.programs[programName];
        if ( !rewrites || rewrites.length===0 ) {
            return this.toOriginalString(start,end);
        }

        /// Index of first rewrite we have not done
        var rewriteOpIndex = 0,
            tokenCursor=start,
            buf = [],
            op;
        while ( tokenCursor>=trs.MIN_TOKEN_INDEX &&
                tokenCursor<=end &&
                tokenCursor<this.tokens.length )
        {
            // execute instructions associated with this token index
            if ( rewriteOpIndex<rewrites.length ) {
                op = rewrites[rewriteOpIndex];

                // skip all ops at lower index
                while (op.index<tokenCursor && rewriteOpIndex<rewrites.length) {
                    rewriteOpIndex++;
                    if ( rewriteOpIndex<rewrites.length ) {
                        op = rewrites[rewriteOpIndex];
                    }
                }

                // while we have ops for this token index, exec them
                while (tokenCursor===op.index && rewriteOpIndex<rewrites.length) {
                    //System.out.println("execute "+op+" at instruction "+rewriteOpIndex);
                    tokenCursor = op.execute(buf);
                    //System.out.println("after execute tokenCursor = "+tokenCursor);
                    rewriteOpIndex++;
                    if ( rewriteOpIndex<rewrites.length ) {
                        op = rewrites[rewriteOpIndex];
                    }
                }
            }
            // dump the token at this index
            if ( tokenCursor<=end ) {
                buf.push(this.get(tokenCursor).getText());
                tokenCursor++;
            }
        }
        // now see if there are operations (append) beyond last token index
        var opi;
        for (opi=rewriteOpIndex; opi<rewrites.length; opi++) {
            op = rewrites[opi];
            if ( op.index>=this.size() ) {
                op.execute(buf); // must be insertions if after last token
            }
        }

        return buf.join("");
    },

    toDebugString: function(start, end) {
        if (!ANTLR.lang.isNumber(start)) {
            start = trs.MIN_TOKEN_INDEX;
        }
        if (!ANTLR.lang.isNumber(end)) {
            end = this.size()-1;
        }

        var buf = [],
            i;
        for (i=start; i>=trs.MIN_TOKEN_INDEX && i<=end && i<this.tokens.length; i++) {
            buf.push(this.get(i));
        }
        return buf.join("");
    }
});

})();
/** A stream of tree nodes, accessing nodes from a tree of some kind */
ANTLR.runtime.tree.TreeNodeStream = function() {
};

/** A buffered stream of tree nodes.  Nodes can be from a tree of ANY kind.
 *
 *  This node stream sucks all nodes out of the tree specified in
 *  the constructor during construction and makes pointers into
 *  the tree using an array of Object pointers. The stream necessarily
 *  includes pointers to DOWN and UP and EOF nodes.
 *
 *  This stream knows how to mark/release for backtracking.
 *
 *  This stream is most suitable for tree interpreters that need to
 *  jump around a lot or for tree parsers requiring speed (at cost of memory).
 *  There is some duplicated functionality here with UnBufferedTreeNodeStream
 *  but just in bookkeeping, not tree walking etc...
 *
 *  @see UnBufferedTreeNodeStream
 */
ANTLR.runtime.tree.CommonTreeNodeStream = function(adaptor,
                                                    tree,
                                                    initialBufferSize)
{
    if (arguments.length===1) {
        tree = adaptor;
        adaptor = new ANTLR.runtime.tree.CommonTreeAdaptor();
    }
    if (arguments.length <= 2) {
        initialBufferSize =
            ANTLR.runtime.tree.CommonTreeNodeStream.DEFAULT_INITIAL_BUFFER_SIZE;
    }

    /** Reuse same DOWN, UP navigation nodes unless this is true */
	this.uniqueNavigationNodes = false;

	/** The index into the nodes list of the current node (next node
	 *  to consume).  If -1, nodes array not filled yet.
	 */
	this.p = -1;

    /** Stack pointer for stack of indexes; -1 indicates empty.  Points
	 *  at next location to push a value.
	 */
	this._sp = -1;

    /** A set of token types user would like to index for faster lookup.
	 *  If this is INDEX_ALL, then all token types are tracked.  If null,
	 *  then none are indexed.
	 */
	this.tokenTypesToReverseIndex = null;

    var Token = ANTLR.runtime.Token;
    this.root = tree;
    this.adaptor = adaptor;
    this.nodes = []; //new ArrayList(initialBufferSize);
    this.down = this.adaptor.create(Token.DOWN, "DOWN");
    this.up = this.adaptor.create(Token.UP, "UP");
    this.eof = this.adaptor.create(Token.EOF, "EOF");
};

ANTLR.lang.augmentObject(ANTLR.runtime.tree.CommonTreeNodeStream, {
	DEFAULT_INITIAL_BUFFER_SIZE: 100,
	INITIAL_CALL_STACK_SIZE: 10,
	/** If tokenTypesToReverseIndex set to INDEX_ALL then indexing
	 *  occurs for all token types.
	 */
	INDEX_ALL: {}
});

ANTLR.lang.extend(ANTLR.runtime.tree.CommonTreeNodeStream,
                  ANTLR.runtime.tree.TreeNodeStream, 
{
    StreamIterator: function() {
		var i = 0,
            nodes = this.nodes,
            eof = this.eof;

        return {
            hasNext: function() {
			    return i<nodes.length;
    		},

            next: function() {
    			var current = i;
    			i++;
                if ( current < nodes.length ) {
                    return nodes[current];
                }
    			return eof;
    		},

            remove: function() {
    			throw new Error("cannot remove nodes from stream");
    		}
        };
	},

	/** Walk tree with depth-first-search and fill nodes buffer.
	 *  Don't do DOWN, UP nodes if its a list (t is isNil).
	 */
    fillBuffer: function(t) {
        var reset_p = false;
        if (ANTLR.lang.isUndefined(t)) {
            t = this.root;
            reset_p = true;
        }

        var nil = this.adaptor.isNil(t);
		if ( !nil ) {
			this.nodes.push(t); // add this node
			this.fillReverseIndex(t, this.nodes.length-1);
		}
		// add DOWN node if t has children
		var n = this.adaptor.getChildCount(t);
		if ( !nil && n>0 ) {
			this.addNavigationNode(ANTLR.runtime.Token.DOWN);
		}
		// and now add all its children
        var c, child;
		for (c=0; c<n; c++) {
			child = this.adaptor.getChild(t,c);
			this.fillBuffer(child);
		}
		// add UP node if t has children
		if ( !nil && n>0 ) {
			this.addNavigationNode(ANTLR.runtime.Token.UP);
		}

        if (reset_p) {
    		this.p = 0; // buffer of nodes intialized now
        }
	},

	/** Given a node, add this to the reverse index tokenTypeToStreamIndexesMap.
	 *  You can override this method to alter how indexing occurs.  The
	 *  default is to create a
	 *
	 *    Map<Integer token type,ArrayList<Integer stream index>>
	 *
	 *  This data structure allows you to find all nodes with type INT in order.
	 *
	 *  If you really need to find a node of type, say, FUNC quickly then perhaps
	 *
	 *    Map<Integertoken type,Map<Object tree node,Integer stream index>>
	 *
	 *  would be better for you.  The interior maps map a tree node to
	 *  the index so you don't have to search linearly for a specific node.
	 *
	 *  If you change this method, you will likely need to change
	 *  getNodeIndex(), which extracts information.
	 */
    fillReverseIndex: function(node, streamIndex) {
		//System.out.println("revIndex "+node+"@"+streamIndex);
		if ( !ANTLR.lang.isValue(this.tokenTypesToReverseIndex) ) {
			return; // no indexing if this is empty (nothing of interest)
		}
		if ( !this.tokenTypeToStreamIndexesMap ) {
			this.tokenTypeToStreamIndexesMap = {}; // first indexing op
		}
		var tokenType = this.adaptor.getType(node),
		    tokenTypeI = tokenType;
		if ( !(this.tokenTypesToReverseIndex===ANTLR.rutime.tree.CommonTreeNodeStream.INDEX_ALL ||
			   ANTLR.lang.isValue(this.tokenTypesToReverseIndex[tokenTypeI])) )
		{
			return; // tokenType not of interest
		}
		var streamIndexI = streamIndex,
            i,
            hasStreamIndex = false,
		    indexes = this.tokenTypeToStreamIndexesMap[tokenTypeI];
		if ( !indexes ) {
			indexes = []; // no list yet for this token type
			indexes.push(streamIndexI); // not there yet, add
			this.tokenTypeToStreamIndexesMap[tokenTypeI] = indexes;
		}
		else {
            for (i=0; i<indexes.length; i++) {
                if (indexes[i]===streamIndexI) {
                    hasStreamIndex = true;
                    break;
                }
            }
			if ( !hasStreamIndex ) {
				indexes.push(streamIndexI); // not there yet, add
			}
		}
	},

	/** Track the indicated token type in the reverse index.  Call this
	 *  repeatedly for each type or use variant with Set argument to
	 *  set all at once.
	 * @param tokenType
	 */
    reverseIndex: function(tokenType) {
        if (ANTLR.lang.isNumber(tokenType)) {
            if ( !this.tokenTypesToReverseIndex ) {
                this.tokenTypesToReverseIndex = {};
            }
            else if ( this.tokenTypesToReverseIndex===ANTLR.runtime.tree.CommonTreeNodeStream.INDEX_ALL ) {
                return;
            }
            this.tokenTypesToReverseIndex[tokenType] = true;
        } else {
            /* Track the indicated token types in the reverse index. Set
             *  to INDEX_ALL to track all token types.
        	 */
            this.tokenTypesToReverseIndex = tokenType; // a set
        }
	},

	/** Given a node pointer, return its index into the node stream.
	 *  This is not its Token stream index.  If there is no reverse map
	 *  from node to stream index or the map does not contain entries
	 *  for node's token type, a linear search of entire stream is used.
	 *
	 *  Return -1 if exact node pointer not in stream.
	 */
    getNodeIndex: function(node) {
		if ( !this.tokenTypeToStreamIndexesMap ) {
			return this.getNodeIndexLinearly(node);
		}
		var tokenType = this.adaptor.getType(node),
            i,
            streamIndexI,
            n,
    		indexes = this.tokenTypeToStreamIndexesMap[tokenType];
		if ( !indexes ) {
			return this.getNodeIndexLinearly(node);
		}
		for (i = 0; i < indexes.length; i++) {
			streamIndexI = indexes[i];
			n = this.get(streamIndexI);
			if ( n===node ) {
				return streamIndexI; // found it!
			}
		}
		return -1;
	},

    getNodeIndexLinearly: function(node) {
		if ( this.p==-1 ) {
			this.fillBuffer();
		}
        var i, t;
		for (i=0; i<this.nodes.length; i++) {
			t = this.nodes[i];
			if ( t===node ) {
				return i;
			}
		}
		return -1;
	},

	/** As we flatten the tree, we use UP, DOWN nodes to represent
	 *  the tree structure.  When debugging we need unique nodes
	 *  so instantiate new ones when uniqueNavigationNodes is true.
	 */
    addNavigationNode: function(ttype) {
		var navNode = null;
		if ( ttype===ANTLR.runtime.Token.DOWN ) {
			if ( this.hasUniqueNavigationNodes() ) {
				navNode = this.adaptor.create(ANTLR.runtime.Token.DOWN, "DOWN");
			}
			else {
				navNode = this.down;
			}
		}
		else {
			if ( this.hasUniqueNavigationNodes() ) {
				navNode = this.adaptor.create(ANTLR.runtime.Token.UP, "UP");
			}
			else {
				navNode = this.up;
			}
		}
		this.nodes.push(navNode);
	},

    get: function(i) {
		if ( this.p===-1 ) {
			this.fillBuffer();
		}
		return this.nodes[i];
	},

    LT: function(k) {
		if ( this.p===-1 ) {
			this.fillBuffer();
		}
		if ( k===0 ) {
			return null;
		}
		if ( k<0 ) {
			return this.LB(-1*k);
		}
		if ( (this.p+k-1) >= this.nodes.length ) {
			return this.eof;
		}
		return this.nodes[this.p+k-1];
	},

	/** Look backwards k nodes */
    LB: function(k) {
		if ( k===0 ) {
			return null;
		}
		if ( (this.p-k)<0 ) {
			return null;
		}
		return this.nodes[this.p-k];
	},

    getTreeSource: function() {
		return this.root;
	},

    getTokenStream: function() {
		return this.tokens;
	},

    setTokenStream: function(tokens) {
		this.tokens = tokens;
	},

    getTreeAdaptor: function() {
		return this.adaptor;
	},

    hasUniqueNavigationNodes: function() {
		return this.uniqueNavigationNodes;
	},

    setUniqueNavigationNodes: function(uniqueNavigationNodes) {
		this.uniqueNavigationNodes = uniqueNavigationNodes;
	},

    consume: function() {
		if ( this.p===-1 ) {
			this.fillBuffer();
		}
		this.p++;
	},

    LA: function(i) {
		return this.adaptor.getType(this.LT(i));
	},

    mark: function() {
		if ( this.p===-1 ) {
			this.fillBuffer();
		}
		this.lastMarker = this.index();
		return this.lastMarker;
	},

    release: function(marker) {
		// no resources to release
	},

    index: function() {
		return this.p;
	},

    rewind: function(marker) {
        if (!ANTLR.lang.isNumber(marker)) {
            marker = this.lastMarker;
        }
		this.seek(marker);
	},

    seek: function(index) {
		if ( this.p===-1 ) {
			this.fillBuffer();
		}
		this.p = this.index;
	},

	/** Make stream jump to a new location, saving old location.
	 *  Switch back with pop().  I manage dyanmic array manually
	 *  to avoid creating Integer objects all over the place.
	 */
    push: function(index) {
		if ( !this.calls ) {
			this.calls = []; //new int[INITIAL_CALL_STACK_SIZE];
		}
		/*else if ( (this._sp+1)>=this.calls.length ) {
			newStack = []; //new int[calls.length*2];
			System.arraycopy(calls, 0, newStack, 0, calls.length);
			calls = newStack;
		}*/
        this._sp++;
		this.calls[this._sp] = this.p; // save current index
		this.seek(index);
	},

	/** Seek back to previous index saved during last push() call.
	 *  Return top of stack (return index).
	 */
    pop: function() {
		var ret = this.calls[this._sp--];
		this.seek(ret);
		return ret;
	},

    size: function() {
		if ( this.p===-1 ) {
			this.fillBuffer();
		}
		return this.nodes.length;
	},

    iterator: function() {
		if ( this.p===-1 ) {
			this.fillBuffer();
		}
		return this.StreamIterator();
	},

	/** Used for testing, just return the token type stream */
    toString: function(start, stop) {
        var buf = "",
            text,
            t,
            i;
        if (arguments.length===0) {
            if ( this.p===-1 ) {
                this.fillBuffer();
            }
            for (i = 0; i < this.nodes.length; i++) {
                t = this.nodes[i];
                buf += " ";
                buf += this.adaptor.getType(t);
            }
            return buf;
        } else {
            if ( !ANTLR.lang.isNumber(start) || !ANTLR.lang.isNumber(stop) ) {
                return null;
            }
            if ( this.p===-1 ) {
                this.fillBuffer();
            }
            //System.out.println("stop: "+stop);
            if ( start instanceof ATNLR.runtime.tree.CommonTree ) {
                //System.out.print("toString: "+((CommonTree)start).getToken()+", ");
            } else {
                //System.out.println(start);
            }
            if ( stop instanceof ANTLR.runtime.tree.CommonTree ) {
                //System.out.println(((CommonTree)stop).getToken());
            } else {
                //System.out.println(stop);
            }
            // if we have the token stream, use that to dump text in order
            var beginTokenIndex,
                endTokenIndex;
            if ( this.tokens ) {
                beginTokenIndex = this.adaptor.getTokenStartIndex(start);
                endTokenIndex = this.adaptor.getTokenStopIndex(stop);
                // if it's a tree, use start/stop index from start node
                // else use token range from start/stop nodes
                if ( this.adaptor.getType(stop)===ANTLR.runtime.Token.UP ) {
                    endTokenIndex = this.adaptor.getTokenStopIndex(start);
                }
                else if ( this.adaptor.getType(stop)==ANTLR.runtime.Token.EOF )
                {
                    endTokenIndex = this.size()-2; // don't use EOF
                }
                return this.tokens.toString(beginTokenIndex, endTokenIndex);
            }
            // walk nodes looking for start
            t = null;
            i = 0;
            for (; i < this.nodes.length; i++) {
                t = this.nodes[i];
                if ( t===start ) {
                    break;
                }
            }
            // now walk until we see stop, filling string buffer with text
            buf = text = "";
            t = this.nodes[i];
            while ( t!==stop ) {
                text = this.adaptor.getText(t);
                if ( !ANTLR.lang.isString(text) ) {
                    text = " "+this.adaptor.getType(t).toString();
                }
                buf += text;
                i++;
                t = nodes[i];
            }
            // include stop node too
            text = this.adaptor.getText(stop);
            if ( !ANTLR.lang.isString(text) ) {
                text = " "+this.adaptor.getType(stop).toString();
            }
            buf += text;
            return buf;
        }
    }
});
/** A generic list of elements tracked in an alternative to be used in
 *  a -> rewrite rule.  We need to subclass to fill in the next() method,
 *  which returns either an AST node wrapped around a token payload or
 *  an existing subtree.
 *
 *  Once you start next()ing, do not try to add more elements.  It will
 *  break the cursor tracking I believe.
 *
 *  @see org.antlr.runtime.tree.RewriteRuleSubtreeStream
 *  @see org.antlr.runtime.tree.RewriteRuleTokenStream
 *
 *  TODO: add mechanism to detect/puke on modification after reading from stream
 */
ANTLR.runtime.tree.RewriteRuleElementStream = function(adaptor, elementDescription, el) {
	/** Cursor 0..n-1.  If singleElement!=null, cursor is 0 until you next(),
	 *  which bumps it to 1 meaning no more elements.
	 */
	this.cursor = 0;

	/** Once a node / subtree has been used in a stream, it must be dup'd
	 *  from then on.  Streams are reset after subrules so that the streams
	 *  can be reused in future subrules.  So, reset must set a dirty bit.
	 *  If dirty, then next() always returns a dup.
	 *
	 *  I wanted to use "naughty bit" here, but couldn't think of a way
	 *  to use "naughty".
	 */
	this.dirty = false;

    this.elementDescription = elementDescription;
    this.adaptor = adaptor;
    if (el) {
        if (ANTLR.lang.isArray(el)) {
            this.singleElement = null;
            this.elements = el;
        } else {
            this.add(el);
        }
    }
};

ANTLR.runtime.tree.RewriteRuleElementStream.prototype = {
	/** Reset the condition of this stream so that it appears we have
	 *  not consumed any of its elements.  Elements themselves are untouched.
	 *  Once we reset the stream, any future use will need duplicates.  Set
	 *  the dirty bit.
	 */
    reset: function() {
		this.cursor = 0;
		this.dirty = true;
	},

    add: function(el) {
		if ( !ANTLR.lang.isValue(el) ) {
			return;
		}
		if ( this.elements ) { // if in list, just add
			this.elements.push(el);
			return;
		}
		if ( !ANTLR.lang.isValue(this.singleElement) ) { // no elements yet, track w/o list
			this.singleElement = el;
			return;
		}
		// adding 2nd element, move to list
		this.elements = [];
		this.elements.push(this.singleElement);
		this.singleElement = null;
		this.elements.push(el);
	},

	/** Return the next element in the stream.  If out of elements, throw
	 *  an exception unless size()==1.  If size is 1, then return elements[0].
	 *  Return a duplicate node/subtree if stream is out of elements and
	 *  size==1.  If we've already used the element, dup (dirty bit set).
	 */
    next: function() {
		var n = this.size(),
            el;
		if ( this.dirty || (this.cursor>=n && n==1) ) {
			// if out of elements and size is 1, dup
			el = this._next();
			return this.dup(el);
		}
		// test size above then fetch
		el = this._next();
		return el;
	},

	/** do the work of getting the next element, making sure that it's
	 *  a tree node or subtree.  Deal with the optimization of single-
	 *  element list versus list of size > 1.  Throw an exception
	 *  if the stream is empty or we're out of elements and size>1.
	 *  protected so you can override in a subclass if necessary.
	 */
    _next: function() {
		var n = this.size();
		if (n===0) {
			throw new ANTLR.runtime.tree.RewriteEmptyStreamException(this.elementDescription);
		}
		if ( this.cursor>= n) { // out of elements?
			if ( n===1 ) {  // if size is 1, it's ok; return and we'll dup
				return this.toTree(this.singleElement);
			}
			// out of elements and size was not 1, so we can't dup
			throw new ANTLR.runtime.tree.RewriteCardinalityException(this.elementDescription);
		}
		// we have elements
		if ( ANTLR.lang.isValue(this.singleElement) ) {
			this.cursor++; // move cursor even for single element list
			return this.toTree(this.singleElement);
		}
		// must have more than one in list, pull from elements
		var o = this.toTree(this.elements[this.cursor]);
		this.cursor++;
		return o;
	},

	/** Ensure stream emits trees; tokens must be converted to AST nodes.
	 *  AST nodes can be passed through unmolested.
	 */
    toTree: function(el) {
        if (el && el.getTree) {
            return el.getTree();
        }
		return el;
	},

    hasNext: function() {
		 return (ANTLR.lang.isValue(this.singleElement) && this.cursor < 1) ||
			   (this.elements && this.cursor < this.elements.length);
	},

    size: function() {
		var n = 0;
		if ( ANTLR.lang.isValue(this.singleElement) ) {
			n = 1;
		}
		if ( this.elements ) {
			return this.elements.length;
		}
		return n;
	},

    getDescription: function() {
		return this.elementDescription;
	}
};
ANTLR.runtime.tree.RewriteRuleTokenStream = function(adaptor, elementDescription, el) {
    var sup = ANTLR.runtime.tree.RewriteRuleTokenStream.superclass;
    sup.constructor.apply(this, arguments);
};

ANTLR.lang.extend(ANTLR.runtime.tree.RewriteRuleTokenStream,
                  ANTLR.runtime.tree.RewriteRuleElementStream, {
    next: function() {
		return this._next();
	},

    toTree: function(el) {
		return this.adaptor.create(el);
	},

    dup: function(el) {
		throw new Error("dup can't be called for a token stream.");
	}
});
ANTLR.runtime.tree.RewriteRuleSubtreeStream = function() {
    var sup = ANTLR.runtime.tree.RewriteRuleSubtreeStream.superclass;
    sup.constructor.apply(this, arguments);
};

ANTLR.lang.extend(ANTLR.runtime.tree.RewriteRuleSubtreeStream,
                  ANTLR.runtime.tree.RewriteRuleElementStream, {
	/** Treat next element as a single node even if it's a subtree.
	 *  This is used instead of next() when the result has to be a
	 *  tree root node.  Also prevents us from duplicating recently-added
	 *  children; e.g., ^(type ID)+ adds ID to type and then 2nd iteration
	 *  must dup the type node, but ID has been added.
	 *
	 *  Referencing a rule result twice is ok; dup entire tree as
	 *  we can't be adding trees as root; e.g., expr expr.
	 *
	 *  Hideous code duplication here with super.next().  Can't think of
	 *  a proper way to refactor.  This needs to always call dup node
	 *  and super.next() doesn't know which to call: dup node or dup tree.
	 */
    nextNode: function() {
		var n = this.size(),
            el;
		if ( this.dirty || (this.cursor>=n && n===1) ) {
			// if out of elements and size is 1, dup (at most a single node
			// since this is for making root nodes).
			el = this._next();
			return this.adaptor.dupNode(el);
		}
		// test size above then fetch
		el = this._next();
		return el;
	},

    dup: function(el) {
		return this.adaptor.dupTree(el);
	}
});/** A generic recognizer that can handle recognizers generated from
 *  lexer, parser, and tree grammars.  This is all the parsing
 *  support code essentially; most of it is error recovery stuff and
 *  backtracking.
 */
ANTLR.runtime.BaseRecognizer = function() {
    this.initVars();
};

ANTLR.runtime.BaseRecognizer.prototype = {
    // initialize instance vars
    initVars: function() {
        /** Track the set of token types that can follow any rule invocation.
         *  Stack grows upwards.  When it hits the max, it grows 2x in size
         *  and keeps going.
         */
        this.following = []; //new Array(ANTLR.runtime.BaseRecognizer.INITIAL_FOLLOW_STACK_SIZE);

        this._fsp = -1;

        /** This is true when we see an error and before having successfully
         *  matched a token.  Prevents generation of more than one error message
         *  per error.
         */
        this.errorRecovery = false;

        /** The index into the input stream where the last error occurred.
         *  This is used to prevent infinite loops where an error is found
         *  but no token is consumed during recovery...another error is found,
         *  ad naseum.  This is a failsafe mechanism to guarantee that at least
         *  one token/tree node is consumed for two errors.
         */
        this.lastErrorIndex = -1;

        /** In lieu of a return value, this indicates that a rule or token
         *  has failed to match.  Reset to false upon valid token match.
         */
        this.failed = false;

        /** If 0, no backtracking is going on.  Safe to exec actions etc...
         *  If >0 then it's the level of backtracking.
         */
        this.backtracking = 0;

        /** An array[size num rules] of Map<Integer,Integer> that tracks
         *  the stop token index for each rule.  ruleMemo[ruleIndex] is
         *  the memoization table for ruleIndex.  For key ruleStartIndex, you
         *  get back the stop token for associated rule or MEMO_RULE_FAILED.
         *
         *  This is only used if rule memoization is on (which it is by default).
         */
        this.ruleMemo = [];
        },

    reset: function() {
        var i;

        // wack everything related to error recovery
        this._fsp = -1;
        this.errorRecovery = false;
        this.lastErrorIndex = -1;
        this.failed = false;
        // wack everything related to backtracking and memoization
        this.backtracking = 0;
        for (i=0; this.ruleMemo && i < this.ruleMemo.length; i++) { // wipe cache
            this.ruleMemo[i] = null;
        }
    },

    /** Match current input symbol against ttype.  Upon error, do one token
     *  insertion or deletion if possible.  You can override to not recover
     *  here and bail out of the current production to the normal error
     *  exception catch (at the end of the method) by just throwing
     *  MismatchedTokenException upon input.LA(1)!=ttype.
     */
    match: function(input, ttype, follow)
    {
        if ( input.LA(1)==ttype ) {
            input.consume();
            this.errorRecovery = false;
            this.failed = false;
            return;
        }
        if ( this.backtracking>0 ) {
            this.failed = true;
            return;
        }
        this.mismatch(input, ttype, follow);
        return;
    },

    matchAny: function(input) {
        this.errorRecovery = false;
        this.failed = false;
        input.consume();
    },

    /** factor out what to do upon token mismatch so tree parsers can behave
     *  differently.  Override this method in your parser to do things
     *  like bailing out after the first error; just throw the mte object
     *  instead of calling the recovery method.
     */
    mismatch: function(input, ttype, follow) {
        var mte = new ANTLR.runtime.MismatchedTokenException(ttype, input);
        this.recoverFromMismatchedToken(input, mte, ttype, follow);
    },

    /** Report a recognition problem.
     *
     *  This method sets errorRecovery to indicate the parser is recovering
     *  not parsing.  Once in recovery mode, no errors are generated.
     *  To get out of recovery mode, the parser must successfully match
     *  a token (after a resync).  So it will go:
     *
     *      1. error occurs
     *      2. enter recovery mode, report error
     *      3. consume until token found in resynch set
     *      4. try to resume parsing
     *      5. next match() will reset errorRecovery mode
     */
    reportError: function(e) {
        // if we've already reported an error and have not matched a token
        // yet successfully, don't report any errors.
        if ( this.errorRecovery ) {
            //System.err.print("[SPURIOUS] ");
            return;
        }
        this.errorRecovery = true;

        this.displayRecognitionError(this.getTokenNames(), e);
    },

    displayRecognitionError: function(tokenNames, e) {
        var hdr = this.getErrorHeader(e),
            msg = this.getErrorMessage(e, tokenNames);
        this.emitErrorMessage(hdr+" "+msg);
    },

    getErrorHeader: function(e) {
        /* handle null input */
        if (!ANTLR.lang.isNumber(e.line)) {
            e.line = 0;
        }
        return "line "+e.line+":"+e.charPositionInLine;
    },

    /** Override this method to change where error messages go */
    emitErrorMessage: function(msg) {
        if (typeof(window) != 'undefined' && window.alert) {
            alert(msg);
        } else {
            print(msg);
        }
    },

    /** What error message should be generated for the various
     *  exception types?
     *
     *  Not very object-oriented code, but I like having all error message
     *  generation within one method rather than spread among all of the
     *  exception classes. This also makes it much easier for the exception
     *  handling because the exception classes do not have to have pointers back
     *  to this object to access utility routines and so on. Also, changing
     *  the message for an exception type would be difficult because you
     *  would have to subclassing exception, but then somehow get ANTLR
     *  to make those kinds of exception objects instead of the default.
     *  This looks weird, but trust me--it makes the most sense in terms
     *  of flexibility.
     *
     *  For grammar debugging, you will want to override this to add
     *  more information such as the stack frame with
     *  getRuleInvocationStack(e, this.getClass().getName()) and,
     *  for no viable alts, the decision description and state etc...
     *
     *  Override this to change the message generated for one or more
     *  exception types.
     */
    getErrorMessage: function(e, tokenNames) {
        var msg = null;
        if ( e instanceof ANTLR.runtime.MismatchedTokenException ) {
            var mte = e,
                tokenName="<unknown>";
            if ( mte.expecting== ANTLR.runtime.Token.EOF ) {
                tokenName = "EOF";
            }
            else {
                tokenName = tokenNames[mte.expecting];
            }
            msg = "mismatched input "+this.getTokenErrorDisplay(e.token)+
                " expecting "+tokenName;
        }
        else if ( e instanceof ANTLR.runtime.NoViableAltException ) {
            msg = "no viable alternative at input "+this.getTokenErrorDisplay(e.token);
        }
        else if ( e instanceof ANTLR.runtime.EarlyExitException ) {
            msg = "required (...)+ loop did not match anything at input "+
                this.getTokenErrorDisplay(e.token);
        }
        else if ( e instanceof ANTLR.runtime.MismatchedSetException ) {
            msg = "mismatched input "+this.getTokenErrorDisplay(e.token)+
                " expecting set "+e.expecting;
        }
        else if ( e instanceof ANTLR.runtime.MismatchedNotSetException ) {
            msg = "mismatched input "+this.getTokenErrorDisplay(e.token)+
                " expecting set "+e.expecting;
        }
        else if ( e instanceof ANTLR.runtime.FailedPredicateException ) {
            msg = "rule "+e.ruleName+" failed predicate: {"+
                e.predicateText+"}?";
        }
        return msg;
    },

    /** How should a token be displayed in an error message? The default
     *  is to display just the text, but during development you might
     *  want to have a lot of information spit out.  Override in that case
     *  to use t.toString() (which, for CommonToken, dumps everything about
     *  the token). This is better than forcing you to override a method in
     *  your token objects because you don't have to go modify your lexer
     *  so that it creates a new Java type.
     */
    getTokenErrorDisplay: function(t) {
        var s = t.getText();
        if ( !ANTLR.lang.isValue(s) ) {
            if ( t.getType()==ANTLR.runtime.Token.EOF ) {
                s = "<EOF>";
            }
            else {
                s = "<"+t.getType()+">";
            }
        }
        s = s.replace(/\n/g,"\\n");
        s = s.replace(/\r/g,"\\r");
        s = s.replace(/\t/g,"\\t");
        return "'"+s+"'";
    },

    /** Recover from an error found on the input stream.  Mostly this is
     *  NoViableAlt exceptions, but could be a mismatched token that
     *  the match() routine could not recover from.
     */
    recover: function(input, re) {
        if ( this.lastErrorIndex==input.index() ) {
            // uh oh, another error at same token index; must be a case
            // where LT(1) is in the recovery token set so nothing is
            // consumed; consume a single token so at least to prevent
            // an infinite loop; this is a failsafe.
            input.consume();
        }
        this.lastErrorIndex = input.index();
        var followSet = this.computeErrorRecoverySet();
        this.beginResync();
        this.consumeUntil(input, followSet);
        this.endResync();
    },

    /** A hook to listen in on the token consumption during error recovery.
     *  The DebugParser subclasses this to fire events to the listenter.
     */
    beginResync: function() {
    },

    endResync: function() {
    },

    /*  Compute the error recovery set for the current rule.  During
     *  rule invocation, the parser pushes the set of tokens that can
     *  follow that rule reference on the stack; this amounts to
     *  computing FIRST of what follows the rule reference in the
     *  enclosing rule. This local follow set only includes tokens
     *  from within the rule; i.e., the FIRST computation done by
     *  ANTLR stops at the end of a rule.
     *
     *  EXAMPLE
     *
     *  When you find a "no viable alt exception", the input is not
     *  consistent with any of the alternatives for rule r.  The best
     *  thing to do is to consume tokens until you see something that
     *  can legally follow a call to r *or* any rule that called r.
     *  You don't want the exact set of viable next tokens because the
     *  input might just be missing a token--you might consume the
     *  rest of the input looking for one of the missing tokens.
     *
     *  Consider grammar:
     *
     *  a : '[' b ']'
     *    | '(' b ')'
     *    ;
     *  b : c '^' INT ;
     *  c : ID
     *    | INT
     *    ;
     *
     *  At each rule invocation, the set of tokens that could follow
     *  that rule is pushed on a stack.  Here are the various "local"
     *  follow sets:
     *
     *  FOLLOW(b1_in_a) = FIRST(']') = ']'
     *  FOLLOW(b2_in_a) = FIRST(')') = ')'
     *  FOLLOW(c_in_b) = FIRST('^') = '^'
     *
     *  Upon erroneous input "[]", the call chain is
     *
     *  a -> b -> c
     *
     *  and, hence, the follow context stack is:
     *
     *  depth  local follow set     after call to rule
     *    0         <EOF>                    a (from main())
     *    1          ']'                     b
     *    3          '^'                     c
     *
     *  Notice that ')' is not included, because b would have to have
     *  been called from a different context in rule a for ')' to be
     *  included.
     *
     *  For error recovery, we cannot consider FOLLOW(c)
     *  (context-sensitive or otherwise).  We need the combined set of
     *  all context-sensitive FOLLOW sets--the set of all tokens that
     *  could follow any reference in the call chain.  We need to
     *  resync to one of those tokens.  Note that FOLLOW(c)='^' and if
     *  we resync'd to that token, we'd consume until EOF.  We need to
     *  sync to context-sensitive FOLLOWs for a, b, and c: {']','^'}.
     *  In this case, for input "[]", LA(1) is in this set so we would
     *  not consume anything and after printing an error rule c would
     *  return normally.  It would not find the required '^' though.
     *  At this point, it gets a mismatched token error and throws an
     *  exception (since LA(1) is not in the viable following token
     *  set).  The rule exception handler tries to recover, but finds
     *  the same recovery set and doesn't consume anything.  Rule b
     *  exits normally returning to rule a.  Now it finds the ']' (and
     *  with the successful match exits errorRecovery mode).
     *
     *  So, you cna see that the parser walks up call chain looking
     *  for the token that was a member of the recovery set.
     *
     *  Errors are not generated in errorRecovery mode.
     *
     *  ANTLR's error recovery mechanism is based upon original ideas:
     *
     *  "Algorithms + Data Structures = Programs" by Niklaus Wirth
     *
     *  and
     *
     *  "A note on error recovery in recursive descent parsers":
     *  http://portal.acm.org/citation.cfm?id=947902.947905
     *
     *  Later, Josef Grosch had some good ideas:
     *
     *  "Efficient and Comfortable Error Recovery in Recursive Descent
     *  Parsers":
     *  ftp://www.cocolab.com/products/cocktail/doca4.ps/ell.ps.zip
     *
     *  Like Grosch I implemented local FOLLOW sets that are combined
     *  at run-time upon error to avoid overhead during parsing.
     */
    computeErrorRecoverySet: function() {
        return this.combineFollows(false);
    },


	/** Compute the context-sensitive FOLLOW set for current rule.
	 *  This is set of token types that can follow a specific rule
	 *  reference given a specific call chain.  You get the set of
	 *  viable tokens that can possibly come next (lookahead depth 1)
	 *  given the current call chain.  Contrast this with the
	 *  definition of plain FOLLOW for rule r:
	 *
	 *   FOLLOW(r)={x | S=>*alpha r beta in G and x in FIRST(beta)}
	 *
	 *  where x in T* and alpha, beta in V*; T is set of terminals and
	 *  V is the set of terminals and nonterminals.  In other words,
	 *  FOLLOW(r) is the set of all tokens that can possibly follow
	 *  references to r in *any* sentential form (context).  At
	 *  runtime, however, we know precisely which context applies as
	 *  we have the call chain.  We may compute the exact (rather
	 *  than covering superset) set of following tokens.
	 *
	 *  For example, consider grammar:
	 *
	 *  stat : ID '=' expr ';'      // FOLLOW(stat)=={EOF}
	 *       | "return" expr '.'
	 *       ;
	 *  expr : atom ('+' atom)* ;   // FOLLOW(expr)=={';','.',')'}
	 *  atom : INT                  // FOLLOW(atom)=={'+',')',';','.'}
	 *       | '(' expr ')'
	 *       ;
	 *
	 *  The FOLLOW sets are all inclusive whereas context-sensitive
	 *  FOLLOW sets are precisely what could follow a rule reference.
	 *  For input input "i=(3);", here is the derivation:
	 *
	 *  stat => ID '=' expr ';'
	 *       => ID '=' atom ('+' atom)* ';'
	 *       => ID '=' '(' expr ')' ('+' atom)* ';'
	 *       => ID '=' '(' atom ')' ('+' atom)* ';'
	 *       => ID '=' '(' INT ')' ('+' atom)* ';'
	 *       => ID '=' '(' INT ')' ';'
	 *
	 *  At the "3" token, you'd have a call chain of
	 *
	 *    stat -> expr -> atom -> expr -> atom
	 *
	 *  What can follow that specific nested ref to atom?  Exactly ')'
	 *  as you can see by looking at the derivation of this specific
	 *  input.  Contrast this with the FOLLOW(atom)={'+',')',';','.'}.
	 *
	 *  You want the exact viable token set when recovering from a
	 *  token mismatch.  Upon token mismatch, if LA(1) is member of
	 *  the viable next token set, then you know there is most likely
	 *  a missing token in the input stream.  "Insert" one by just not
	 *  throwing an exception.
	 */
	computeContextSensitiveRuleFOLLOW: function() {
		return this.combineFollows(true);
	},

    combineFollows: function(exact) {
		var top = this._fsp,
            i,
            localFollowSet,
		    followSet = new ANTLR.misc.BitSet();
		for (i=top; i>=0; i--) {
			localFollowSet = this.following[i];
			/*
			System.out.println("local follow depth "+i+"="+
							   localFollowSet.toString(getTokenNames())+")");
			*/
			followSet.orInPlace(localFollowSet);
			if ( exact && !localFollowSet.member(ANTLR.runtime.Token.EOR_TOKEN_TYPE) ) {
				break;
			}
		}
		followSet.remove(ANTLR.runtime.Token.EOR_TOKEN_TYPE);
		return followSet;
	},

	/** Attempt to recover from a single missing or extra token.
	 *
	 *  EXTRA TOKEN
	 *
	 *  LA(1) is not what we are looking for.  If LA(2) has the right token,
	 *  however, then assume LA(1) is some extra spurious token.  Delete it
	 *  and LA(2) as if we were doing a normal match(), which advances the
	 *  input.
	 *
	 *  MISSING TOKEN
	 *
	 *  If current token is consistent with what could come after
	 *  ttype then it is ok to "insert" the missing token, else throw
	 *  exception For example, Input "i=(3;" is clearly missing the
	 *  ')'.  When the parser returns from the nested call to expr, it
	 *  will have call chain:
	 *
	 *    stat -> expr -> atom
	 *
	 *  and it will be trying to match the ')' at this point in the
	 *  derivation:
	 *
	 *       => ID '=' '(' INT ')' ('+' atom)* ';'
	 *                          ^
	 *  match() will see that ';' doesn't match ')' and report a
	 *  mismatched token error.  To recover, it sees that LA(1)==';'
	 *  is in the set of tokens that can follow the ')' token
	 *  reference in rule atom.  It can assume that you forgot the ')'.
	 */
    recoverFromMismatchedToken: function(input,
										 e,
										 ttype,
										 follow)
	{
        // @todo - do we really need to report this?
		// alert("BR.recoverFromMismatchedToken");		
		// if next token is what we are looking for then "delete" this token
		if ( input.LA(2)==ttype ) {
			this.reportError(e);
			/*
			System.err.println("recoverFromMismatchedToken deleting "+input.LT(1)+
							   " since "+input.LT(2)+" is what we want");
			*/
			this.beginResync();
			input.consume(); // simply delete extra token
			this.endResync();
			input.consume(); // move past ttype token as if all were ok
			return;
		}
		if ( !this.recoverFromMismatchedElement(input,e,follow) ) {
			throw e;
		}
	},

    recoverFromMismatchedSet: function(input,
									   e,
									   follow)
	{
		// TODO do single token deletion like above for Token mismatch
		if ( !this.recoverFromMismatchedElement(input,e,follow) ) {
			throw e;
		}
	},

	/** This code is factored out from mismatched token and mismatched set
	 *  recovery.  It handles "single token insertion" error recovery for
	 *  both.  No tokens are consumed to recover from insertions.  Return
	 *  true if recovery was possible else return false.
	 */
    recoverFromMismatchedElement: function(input,
										   e,
										   follow)
	{
		if ( !ANTLR.lang.isValue(follow) ) {
			// we have no information about the follow; we can only consume
			// a single token and hope for the best
			return false;
		}
		//System.out.println("recoverFromMismatchedElement");
		// compute what can follow this grammar element reference
		if ( follow.member(ANTLR.runtime.Token.EOR_TOKEN_TYPE) ) {
			var viableTokensFollowingThisRule =
				this.computeContextSensitiveRuleFOLLOW();
			follow = follow.or(viableTokensFollowingThisRule);
			follow.remove(ANTLR.runtime.Token.EOR_TOKEN_TYPE);
		}
		// if current token is consistent with what could come after set
		// then it is ok to "insert" the missing token, else throw exception
		//System.out.println("viable tokens="+follow.toString(getTokenNames())+")");
		if ( follow.member(input.LA(1)) ) {
			//System.out.println("LT(1)=="+input.LT(1)+" is consistent with what follows; inserting...");
			this.reportError(e);
			return true;
		}
		//System.err.println("nothing to do; throw exception");
		return false;
	},

    consumeUntil: function(input, tokenType) {
		//System.out.println("consumeUntil "+tokenType);
		var ttype = input.LA(1);
		while (ttype != ANTLR.runtime.Token.EOF && ttype != tokenType) {
			input.consume();
			ttype = input.LA(1);
		}
	},

	/** Consume tokens until one matches the given token set */
    consumeUntil: function(input, set) {
		//System.out.println("consumeUntil("+set.toString(getTokenNames())+")");
		var ttype = input.LA(1);
		while (ttype != ANTLR.runtime.Token.EOF && !set.member(ttype) ) {
			//System.out.println("consume during recover LA(1)="+getTokenNames()[input.LA(1)]);
			input.consume();
			ttype = input.LA(1);
		}
	},

	/** Push a rule's follow set using our own hardcoded stack */
    pushFollow: function(fset) {
		if ( (this._fsp +1)>=this.following.length ) {
			var f = []; //new Array(this.following.length*2);
            var i;
            for (i=this.following.length-1; i>=0; i--) {
                f[i] = this.following[i];
            }
			this.following = f;
		}
        this._fsp++;
		this.following[this._fsp] = fset;
	},

	/** Return List<String> of the rules in your parser instance
	 *  leading up to a call to this method.  You could override if
	 *  you want more details such as the file/line info of where
	 *  in the parser java code a rule is invoked.
	 *
	 *  This is very useful for error messages and for context-sensitive
	 *  error recovery.
     *
	 *  A more general version of getRuleInvocationStack where you can
	 *  pass in, for example, a RecognitionException to get it's rule
	 *  stack trace.  This routine is shared with all recognizers, hence,
	 *  static.
	 *
	 *  TODO: move to a utility class or something; weird having lexer call this
     *
     *  Most JS interpreters can't do real stack reflection.  See this
     *  spidermonkey bug, for example:
     *  https://bugzilla.mozilla.org/show_bug.cgi?id=332104
     *
     *  JS is supposed to get real stack traces in v4, at which time it would
     *  be easy to implement this function.
     *
     *  Until then I'll leave this unimplemented.  If there is enough clamor
     *  it would be possible to keep track of the invocation stack using an
     *  auxillary array, but that will definitely be a performance hit.
	 */
    getRuleInvocationStack: function(e, recognizerClassName)
	{
        throw new Error("Not implemented.");
	},

    getBacktrackingLevel: function() {
		return this.backtracking;
	},

	/** Used to print out token names like ID during debugging and
	 *  error reporting.  The generated parsers implement a method
	 *  that overrides this to point to their String[] tokenNames.
	 */
    getTokenNames: function() {
		return null;
	},

	/** For debugging and other purposes, might want the grammar name.
	 *  Have ANTLR generate an implementation for this method.
	 */
    getGrammarFileName: function() {
		return null;
	},

	/** A convenience method for use most often with template rewrites.
	 *  Convert a List<Token> to List<String>
	 */
    toStrings: function(tokens) {
		if ( !tokens ) {
            return null;
        }
		var strings = [];
        var i;
		for (i=0; i<tokens.length; i++) {
			strings.push(tokens[i].getText());
		}
		return strings;
	},

	/** Convert a List<RuleReturnScope> to List<StringTemplate> by copying
	 *  out the .st property.  Useful when converting from
	 *  list labels to template attributes:
	 *
	 *    a : ids+=rule -> foo(ids={toTemplates($ids)})
	 *      ;
	 *  TJP: this is not needed anymore.  $ids is a List of templates
	 *  when output=template
	 * 
	public List toTemplates(List retvals) {
		if ( retvals==null ) return null;
		List strings = new ArrayList(retvals.size());
		for (int i=0; i<retvals.size(); i++) {
			strings.add(((RuleReturnScope)retvals.get(i)).getTemplate());
		}
		return strings;
	}
	 */

	/** Given a rule number and a start token index number, return
	 *  MEMO_RULE_UNKNOWN if the rule has not parsed input starting from
	 *  start index.  If this rule has parsed input starting from the
	 *  start index before, then return where the rule stopped parsing.
	 *  It returns the index of the last token matched by the rule.
	 *
	 *  For now we use a hashtable and just the slow Object-based one.
	 *  Later, we can make a special one for ints and also one that
	 *  tosses out data after we commit past input position i.
	 */
    getRuleMemoization: function(ruleIndex, ruleStartIndex) {
		if ( !this.ruleMemo[ruleIndex] ) {
			this.ruleMemo[ruleIndex] = {};
		}
		var stopIndexI =
			this.ruleMemo[ruleIndex][ruleStartIndex];
		if ( !ANTLR.lang.isNumber(stopIndexI) ) {
			return ANTLR.runtime.BaseRecognizer.MEMO_RULE_UNKNOWN;
		}
		return stopIndexI;
	},

	/** Has this rule already parsed input at the current index in the
	 *  input stream?  Return the stop token index or MEMO_RULE_UNKNOWN.
	 *  If we attempted but failed to parse properly before, return
	 *  MEMO_RULE_FAILED.
	 *
	 *  This method has a side-effect: if we have seen this input for
	 *  this rule and successfully parsed before, then seek ahead to
	 *  1 past the stop token matched for this rule last time.
	 */
    alreadyParsedRule: function(input, ruleIndex) {
		var stopIndex = this.getRuleMemoization(ruleIndex, input.index());
		if ( stopIndex==ANTLR.runtime.BaseRecognizer.MEMO_RULE_UNKNOWN ) {
			return false;
		}
		if ( stopIndex==ANTLR.runtime.BaseRecognizer.MEMO_RULE_FAILED ) {
			//System.out.println("rule "+ruleIndex+" will never succeed");
			this.failed=true;
		}
		else {
			//System.out.println("seen rule "+ruleIndex+" before; skipping ahead to @"+(stopIndex+1)+" failed="+failed);
			input.seek(stopIndex+1); // jump to one past stop token
		}
		return true;
	},

	/** Record whether or not this rule parsed the input at this position
	 *  successfully.  Use a standard java hashtable for now.
	 */
    memoize: function(input,
						ruleIndex,
						ruleStartIndex)
	{
		var stopTokenIndex = this.failed ? 
            ANTLR.runtime.BaseRecognizer.MEMO_RULE_FAILED : input.index()-1;
		if ( this.ruleMemo[ruleIndex] ) {
			this.ruleMemo[ruleIndex][ruleStartIndex] = stopTokenIndex;
		}
	},

	/** Assume failure in case a rule bails out with an exception.
	 *  Reset to rule stop index if successful.
	public void memoizeFailure(int ruleIndex, int ruleStartIndex) {
		ruleMemo[ruleIndex].put(
			new Integer(ruleStartIndex), MEMO_RULE_FAILED_I
		);
	}
	 */

	/** After successful completion of a rule, record success for this
	 *  rule and that it can skip ahead next time it attempts this
	 *  rule for this input position.
	public void memoizeSuccess(IntStream input,
							   int ruleIndex,
							   int ruleStartIndex)
	{
		ruleMemo[ruleIndex].put(
			new Integer(ruleStartIndex), new Integer(input.index()-1)
		);
	}
	 */

	/** return how many rule/input-index pairs there are in total.
	 *  TODO: this includes synpreds. :(
	 */
    getRuleMemoizationCacheSize: function() {
		var n = 0, i;
		for (i = 0; this.ruleMemo && i < ruleMemo.length; i++) {
			var ruleMap = this.ruleMemo[i];
			if ( ruleMap ) {
                // @todo need to get size of rulemap?
				n += ruleMap.length; // how many input indexes are recorded?
			}
		}
		return n;
	},

    traceIn: function(ruleName, ruleIndex, inputSymbol)  {
		this.emitErrorMessage("enter "+ruleName+" "+inputSymbol);
		if ( this.failed ) {
			this.emitErrorMessage(" failed="+this.failed);
		}
		if ( this.backtracking>0 ) {
			this.emitErrorMessage(" backtracking="+backtracking);
		}
		// System.out.println();
	},

    traceOut: function(ruleName, ruleIndex, inputSymbol) {
		this.emitErrorMessage("exit "+ruleName+" "+inputSymbol);
		if ( this.failed ) {
			this.emitErrorMessage(" failed="+this.failed);
		}
		if ( this.backtracking>0 ) {
			this.emitErrorMessage(" backtracking="+this.backtracking);
		}
		//System.out.println();
	}

	/** A syntactic predicate.  Returns true/false depending on whether
	 *  the specified grammar fragment matches the current input stream.
	 *  This resets the failed instance var afterwards.
	public boolean synpred(IntStream input, GrammarFragmentPtr fragment) {
		//int i = input.index();
		//System.out.println("begin backtracking="+backtracking+" @"+i+"="+((CommonTokenStream)input).LT(1));
		backtracking++;
		beginBacktrack(backtracking);
		int start = input.mark();
		try {fragment.invoke();}
		catch (RecognitionException re) {
			System.err.println("impossible: "+re);
		}
		boolean success = !failed;
		input.rewind(start);
		endBacktrack(backtracking, success);
		backtracking--;
		//System.out.println("end backtracking="+backtracking+": "+(failed?"FAILED":"SUCCEEDED")+" @"+input.index()+" should be "+i);
		failed=false;
		return success;
	}
	 */
};




(function() {
    var br = ANTLR.runtime.BaseRecognizer,
        brp = br.prototype,
        tk = ANTLR.runtime.Token;

    /* static vars, methods */
    br.MEMO_RULE_FAILED = -2;
    br.MEMO_RULE_UNKNOWN = -1;
    br.INITIAL_FOLLOW_STACK_SIZE = 100;
    br.MEMO_RULE_FAILED_I = br.MEMO_RULE_FAILED;

    br.DEFAULT_TOKEN_CHANNEL = tk.DEFAULT_CHANNEL;
    br.HIDDEN = tk.HIDDEN_CHANNEL;

    br.NEXT_TOKEN_RULE_NAME = "nextToken";
})();
/** A lexer is recognizer that draws input symbols from a character stream.
 *  lexer grammars result in a subclass of this object. A Lexer object
 *  uses simplified match() and error recovery mechanisms in the interest
 *  of speed.
 */
ANTLR.runtime.Lexer = function(input) {
    this.initVars();
    this.tokenStartCharIndex = -1;
    this.input = input;
};

ANTLR.lang.extend(ANTLR.runtime.Lexer, ANTLR.runtime.BaseRecognizer, {
    reset: function() {
        // reset all recognizer state variables
		ANTLR.runtime.Lexer.superclass.reset.call(this);
		// wack Lexer state variables
		this.token = null;
		this.tyype = ANTLR.runtime.Token.INVALID_TOKEN_TYPE;
		this.channel = ANTLR.runtime.Token.DEFAULT_CHANNEL;
		this.tokenStartCharIndex = -1;
		this.tokenStartCharPositionInLine = -1;
		this.tokenStartLine = -1;
		this.text = null;
		if ( ANTLR.lang.isString(this.input) ) {
			this.input.seek(0); // rewind the input
		}
	},

	/** Return a token from this source; i.e., match a token on the char
	 *  stream.
	 */
    nextToken: function() {
		while (true) {
			this.token = null;
			this.channel = ANTLR.runtime.Token.DEFAULT_CHANNEL;
			this.tokenStartCharIndex = this.input.index();
			this.tokenStartCharPositionInLine = this.input.getCharPositionInLine();
			this.tokenStartLine = this.input.getLine();
			this.text = null;
			if ( this.input.LA(1)===ANTLR.runtime.CharStream.EOF ) {
                return ANTLR.runtime.Token.EOF_TOKEN;
            }
            try {
                this.mTokens();
				if ( !ANTLR.lang.isValue(this.token) )
                     
                {
					this.emit();
				}
				else if ( this.token==ANTLR.runtime.Token.SKIP_TOKEN ) {
					continue;
				}
				return this.token;
			}
            catch (re) {
                if ( !(re instanceof ANTLR.runtime.RecognitionException) ) {
                    throw re;
                }
                this.reportError(re);
                this.recover(re);
            }
        }
    },

	/** Instruct the lexer to skip creating a token for current lexer rule
	 *  and look for another token.  nextToken() knows to keep looking when
	 *  a lexer rule finishes with token set to SKIP_TOKEN.  Recall that
	 *  if token==null at end of any token rule, it creates one for you
	 *  and emits it.
	 */
    skip: function() {
		this.token = ANTLR.runtime.Token.SKIP_TOKEN;
	},

	/** Set the char stream and reset the lexer */
    setCharStream: function(input) {
		this.input = null;
		this.reset();
		this.input = input;
	},

	/** Currently does not support multiple emits per nextToken invocation
	 *  for efficiency reasons.  Subclass and override this method and
	 *  nextToken (to push tokens into a list and pull from that list rather
	 *  than a single variable as this implementation does).
	 */
	/** The standard method called to automatically emit a token at the
	 *  outermost lexical rule.  The token object should point into the
	 *  char buffer start..stop.  If there is a text override in 'text',
	 *  use that to set the token's text.  Override this method to emit
	 *  custom Token objects.
	 */
    emit: function() {
        if (arguments.length===0) {
    		var t = new ANTLR.runtime.CommonToken(this.input, this.tyype, this.channel, this.tokenStartCharIndex, this.getCharIndex()-1);
    		t.setLine(this.tokenStartLine);
    		t.setText(this.text);
    		t.setCharPositionInLine(this.tokenStartCharPositionInLine);
            this.token = t;
            return t;
        } else {
            this.token = arguments[0];
        }
	},

    match: function(s) {
        var i = 0,
            mte;

        if (ANTLR.lang.isString(s)) {
            while ( i<s.length ) {
                if ( this.input.LA(1)!=s.charAt(i) ) {
                    if ( this.backtracking>0 ) {
                        this.failed = true;
                        return;
                    }
                    mte = new ANTLR.runtime.MismatchedTokenException(s.charAt(i), this.input);
                    this.recover(mte);
                    throw mte;
                }
                i++;
                this.input.consume();
                this.failed = false;
            }
        } else if (ANTLR.lang.isNumber(s)) {
            if ( this.input.LA(1)!=s ) {
                if ( this.backtracking>0 ) {
                    this.failed = true;
                    return;
                }
                mte = new ANTLR.runtime.MismatchedTokenException(s, this.input);
                this.recover(mte);
                throw mte;
            }
            this.input.consume();
            this.failed = false;
        }
    },

    matchAny: function() {
        this.input.consume();
    },

    matchRange: function(a, b) {
        if ( this.input.LA(1)<a || this.input.LA(1)>b ) {
			if ( this.backtracking>0 ) {
				this.failed = true;
				return;
			}
            mre = new ANTLR.runtime.MismatchedRangeException(a,b,this.input);
			this.recover(mre);
			throw mre;
        }
        this.input.consume();
		this.failed = false;
    },

    getLine: function() {
        return this.input.getLine();
    },

    getCharPositionInLine: function() {
        return this.input.getCharPositionInLine();
    },

	/** What is the index of the current character of lookahead? */
    getCharIndex: function() {
		return this.input.index();
	},

	/** Return the text matched so far for the current token or any
	 *  text override.
	 */
    getText: function() {
		if ( ANTLR.lang.isString(this.text) ) {
			return this.text;
		}
		return this.input.substring(this.tokenStartCharIndex,this.getCharIndex()-1);
	},

	/** Set the complete text of this token; it wipes any previous
	 *  changes to the text.
	 */
    setText: function(text) {
		this.text = text;
	},

    reportError: function(e) {
		/** TODO: not thought about recovery in lexer yet.
		 *
		// if we've already reported an error and have not matched a token
		// yet successfully, don't report any errors.
		if ( errorRecovery ) {
			//System.err.print("[SPURIOUS] ");
			return;
		}
		errorRecovery = true;
		 */

		this.displayRecognitionError(this.getTokenNames(), e);
	},

    getErrorMessage: function(e, tokenNames) {
		var msg = null;
		if ( e instanceof ANTLR.runtime.MismatchedTokenException ) {
			msg = "mismatched character "+this.getCharErrorDisplay(e.c)+" expecting "+this.getCharErrorDisplay(e.expecting);
		}
		else if ( e instanceof ANTLR.runtime.NoViableAltException ) {
			msg = "no viable alternative at character "+this.getCharErrorDisplay(e.c);
		}
		else if ( e instanceof ANTLR.runtime.EarlyExitException ) {
			msg = "required (...)+ loop did not match anything at character "+this.getCharErrorDisplay(e.c);
		}
		else if ( e instanceof ANTLR.runtime.MismatchedNotSetException ) {
			msg = "mismatched character "+this.getCharErrorDisplay(e.c)+" expecting set "+e.expecting;
		}
		else if ( e instanceof ANTLR.runtime.MismatchedSetException ) {
			msg = "mismatched character "+this.getCharErrorDisplay(e.c)+" expecting set "+e.expecting;
		}
		else if ( e instanceof ANTLR.runtime.MismatchedRangeException ) {
			msg = "mismatched character "+this.getCharErrorDisplay(e.c)+" expecting set "+
				this.getCharErrorDisplay(e.a)+".."+this.getCharErrorDisplay(e.b);
		}
		else {
			msg = ANTLR.runtime.Lexer.superclass.getErrorMessage.call(this, e, tokenNames);
		}
		return msg;
	},

    getCharErrorDisplay: function(c) {
		var s = c; //String.fromCharCode(c);
		switch ( s ) {
			case ANTLR.runtime.Token.EOF :
				s = "<EOF>";
				break;
			case "\n" :
				s = "\\n";
				break;
			case "\t" :
				s = "\\t";
				break;
			case "\r" :
				s = "\\r";
				break;
		}
		return "'"+s+"'";
	},

	/** Lexers can normally match any char in it's vocabulary after matching
	 *  a token, so do the easy thing and just kill a character and hope
	 *  it all works out.  You can instead use the rule invocation stack
	 *  to do sophisticated error recovery if you are in a fragment rule.
	 */
    recover: function(re) {
		this.input.consume();
	},

    traceIn: function(ruleName, ruleIndex)  {
		var inputSymbol = String.fromCharCode(this.input.LT(1))+" line="+this.getLine()+":"+this.getCharPositionInLine();
		ANTLR.runtime.Lexer.superclass.traceIn.call(this, ruleName, ruleIndex, inputSymbol);
	},

    traceOut: function(ruleName, ruleIndex)  {
		var inputSymbol = String.fromCharCode(input.LT(1))+" line="+this.getLine()+":"+this.getCharPositionInLine();
		ANTLR.runtime.Lexer.superclass.traceOut.call(this, ruleName, ruleIndex, inputSymbol);
	}
});
/** Rules can return start/stop info as well as possible trees and templates */
ANTLR.runtime.RuleReturnScope = function() {};

ANTLR.runtime.RuleReturnScope.prototype = {
	/** Return the start token or tree */
    getStart: function() { return null; },
	/** Return the stop token or tree */
    getStop: function() { return null; },
	/** Has a value potentially if output=AST; */
    getTree: function() { return null; },
	/** Has a value potentially if output=template; Don't use StringTemplate
	 *  type as it then causes a dependency with ST lib.
	 */
    getTemplate: function() { return null; }
};
/** Rules that return more than a single value must return an object
 *  containing all the values.  Besides the properties defined in
 *  RuleLabelScope.predefinedRulePropertiesScope there may be user-defined
 *  return values.  This class simply defines the minimum properties that
 *  are always defined and methods to access the others that might be
 *  available depending on output option such as template and tree.
 *
 *  Note text is not an actual property of the return value, it is computed
 *  from start and stop using the input stream's toString() method.  I
 *  could add a ctor to this so that we can pass in and store the input
 *  stream, but I'm not sure we want to do that.  It would seem to be undefined
 *  to get the .text property anyway if the rule matches tokens from multiple
 *  input streams.
 *
 *  I do not use getters for fields of objects that are used simply to
 *  group values such as this aggregate.
 */
ANTLR.runtime.ParserRuleReturnScope = function() {};

ANTLR.lang.extend(ANTLR.runtime.ParserRuleReturnScope,
                  ANTLR.runtime.RuleReturnScope);
/** This is identical to the ParserRuleReturnScope except that
 *  the start property is a tree nodes not Token object
 *  when you are parsing trees.  To be generic the tree node types
 *  have to be Object.
 */
ANTLR.runtime.TreeRuleReturnScope = function(){};

ANTLR.lang.extend(ANTLR.runtime.TreeRuleReturnScope,
        ANTLR.runtime.RuleReturnScope);
/** A parser for TokenStreams.  "parser grammars" result in a subclass
 *  of this.
 */
ANTLR.runtime.Parser = function(input) {
    this.initVars();
    this.setTokenStream(input);
};

ANTLR.lang.extend(ANTLR.runtime.Parser, ANTLR.runtime.BaseRecognizer, {
    reset: function() {
        // reset all recognizer state variables
		ANTLR.runtime.Parser.superclass.reset.call(this);
		if ( ANTLR.lang.isValue(this.input) ) {
			this.input.seek(0); // rewind the input
		}
	},

	/** Set the token stream and reset the parser */
    setTokenStream: function(input) {
		this.input = null;
		this.reset();
		this.input = input;
	},

    getTokenStream: function() {
		return this.input;
	},

    traceIn: function(ruleName, ruleIndex)  {
		ANTLR.runtime.Parser.superclass.traceIn.call(
                this, ruleName, ruleIndex, this.input.LT(1));
	},

    traceOut: function(ruleName, ruleIndex)  {
		ANTLR.runtime.Parser.superclass.traceOut.call(
                this, ruleName, ruleIndex, this.input.LT(1));
	}
});
/** A DFA implemented as a set of transition tables.
 *
 *  Any state that has a semantic predicate edge is special; those states
 *  are generated with if-then-else structures in a specialStateTransition()
 *  which is generated by cyclicDFA template.
 *
 *  There are at most 32767 states (16-bit signed short).
 *  Could get away with byte sometimes but would have to generate different
 *  types and the simulation code too.  For a point of reference, the Java
 *  lexer's Tokens rule DFA has 326 states roughly.
 */
ANTLR.runtime.DFA = function() {};

ANTLR.runtime.DFA.prototype = {
    /** From the input stream, predict what alternative will succeed
     *  using this DFA (representing the covering regular approximation
     *  to the underlying CFL).  Return an alternative number 1..n.  Throw
     *  an exception upon error.
     */
    predict: function(input) {
        var mark = input.mark(), // remember where decision started in input
            s = 0, // we always start at s0
            specialState,
            c,
            snext;
        try {
            while ( true ) {
                specialState = this.special[s];
                if ( specialState>=0 ) {
                    s = this.specialStateTransition(specialState,input);
                    input.consume();
                    continue;
                }
                if ( this.accept[s] >= 1 ) {
                    return this.accept[s];
                }
                // look for a normal char transition
                c = input.LA(1); // -1 == \uFFFF, all tokens fit in 65000 space

                if (c===ANTLR.runtime.Token.EOF) {
                    c = -1;
                } else if (ANTLR.lang.isString(c)) {
                    c = c.charCodeAt(0);
                }

                if (c>=this.min[s] && c<=this.max[s]) {
                    snext = this.transition[s][c-this.min[s]]; // move to next state
                    if ( snext < 0 ) {
                        // was in range but not a normal transition
                        // must check EOT, which is like the else clause.
                        // eot[s]>=0 indicates that an EOT edge goes to another
                        // state.
                        if ( this.eot[s]>=0 ) {  // EOT Transition to accept state?
                            s = this.eot[s];
                            input.consume();
                            // TODO: I had this as return accept[eot[s]]
                            // which assumed here that the EOT edge always
                            // went to an accept...faster to do this, but
                            // what about predicated edges coming from EOT
                            // target?
                            continue;
                        }
                        this.noViableAlt(s,input);
                        return 0;
                    }
                    s = snext;
                    input.consume();
                    continue;
                }
                if ( this.eot[s]>=0 ) {  // EOT Transition?
                    s = this.eot[s];
                    input.consume();
                    continue;
                }
                if ( c==ANTLR.runtime.Token.EOF && this.eof[s]>=0 ) {  // EOF Transition to accept state?
                    return this.accept[this.eof[s]];
                }
                // not in range and not EOF/EOT, must be invalid symbol
                this.noViableAlt(s,input);
                return 0;
            }
        }
        finally {
            input.rewind(mark);
        }
    },

    noViableAlt: function(s, input) {
        if (this.recognizer.backtracking>0) {
            this.recognizer.failed=true;
            return;
        }
        var nvae =
            new ANTLR.runtime.NoViableAltException(this.getDescription(),
                                     this.decisionNumber,
                                     s,
                                     input);
        this.error(nvae);
        throw nvae;
    },

    /** A hook for debugging interface */
    error: function(nvae) { },

    specialStateTransition: function(s, input) {
        return -1;
    },

    getDescription: function() {
        return "n/a";
    },

    specialTransition: function(state, symbol) {
        return 0;
    }
};

ANTLR.lang.augmentObject(ANTLR.runtime.DFA, {
    /** Given a String that has a run-length-encoding of some unsigned shorts
     *  like "\1\2\3\9", convert to short[] {2,9,9,9}.
     */
    unpackEncodedString: function(encodedString) {
        // walk first to find how big it is.
        var i,
            data = [],
            di = 0,
            n,
            v,
            j;
        for (i=0; i<encodedString.length; i+=2) {
            n = encodedString.charCodeAt(i);
            v = encodedString.charCodeAt(i+1);
            if (v===0xffff) {
                v = -1; // overflow at 16 bits
            }
            // add v n times to data
            for (j=1; j<=n; j++) {
                data[di++] = v;
            }
        }
        return data;
    },

    // alias
    unpackEncodedStringToUnsignedChars: function(encodedString) {
        return ANTLR.runtime.DFA.unpackEncodedString(encodedString);
    }
});
/** A parser for a stream of tree nodes.  "tree grammars" result in a subclass
 *  of this.  All the error reporting and recovery is shared with Parser via
 *  the BaseRecognizer superclass.
*/
ANTLR.runtime.tree.TreeParser = function(input) {
    this.setTreeNodeStream(input);
    ANTLR.runtime.tree.TreeParser.superclass.constructor.apply(this, arguments);
};

(function(){
var TP = ANTLR.runtime.tree.TreeParser;

ANTLR.lang.augmentObject(TP, {
	DOWN: ANTLR.runtime.Token.DOWN,
	UP: ANTLR.runtime.Token.UP
});

ANTLR.lang.extend(TP, ANTLR.runtime.BaseRecognizer, {
    reset: function() {
		TP.superclass.reset.call(this); // reset all recognizer state variables
		if ( this.input ) {
			this.input.seek(0); // rewind the input
		}
	},

	/** Set the input stream */
    setTreeNodeStream: function(input) {
		this.input = input;
	},

    getTreeNodeStream: function() {
		return this.input;
	},

	/** Match '.' in tree parser has special meaning.  Skip node or
	 *  entire tree if node has children.  If children, scan until
	 *  corresponding UP node.
	 */
    matchAny: function(ignore) { // ignore stream, copy of this.input
		this.errorRecovery = false;
		this.failed = false;
		var look = this.input.LT(1);
		if ( this.input.getTreeAdaptor().getChildCount(look)===0 ) {
			this.input.consume(); // not subtree, consume 1 node and return
			return;
		}
		// current node is a subtree, skip to corresponding UP.
		// must count nesting level to get right UP
		var level=0,
		    tokenType = this.input.getTreeAdaptor().getType(look);
		while ( tokenType!==ANTLR.runtime.Token.EOF &&
                !(tokenType===TP.UP && level===0) )
        {
			this.input.consume();
			look = this.input.LT(1);
			tokenType = this.input.getTreeAdaptor().getType(look);
			if ( tokenType === TP.DOWN ) {
				level++;
			}
			else if ( tokenType === TP.UP ) {
				level--;
			}
		}
		this.input.consume(); // consume UP
	},

	/** We have DOWN/UP nodes in the stream that have no line info; override.
	 *  plus we want to alter the exception type.
	 */
    mismatch: function(input, ttype, follow) {
		var mte = new ANTLR.runtime.MismatchedTreeNodeException(ttype, input);
		this.recoverFromMismatchedToken(input, mte, ttype, follow);
	},

	/** Prefix error message with the grammar name because message is
	 *  always intended for the programmer because the parser built
	 *  the input tree not the user.
	 */
    getErrorHeader: function(e) {
		return this.getGrammarFileName()+": node from "+
			   (e.approximateLineInfo?"after ":"")+"line "+e.line+":"+e.charPositionInLine;
	},

	/** Tree parsers parse nodes they usually have a token object as
	 *  payload. Set the exception token and do the default behavior.
	 */
    getErrorMessage: function(e, tokenNames) {
        var adaptor;
		if ( this instanceof TP ) {
			adaptor = e.input.getTreeAdaptor();
			e.token = adaptor.getToken(e.node);
			if ( !ANTLR.lang.isValue(e.token) ) { // could be an UP/DOWN node
				e.token = new ANTLR.runtime.CommonToken(
                        adaptor.getType(e.node),
                        adaptor.getText(e.node));
			}
		}
		return TP.superclass.getErrorMessage.call(this, e, tokenNames);
	},

    traceIn: function(ruleName, ruleIndex) {
		TP.superclass.traceIn.call(this, ruleName, ruleIndex, this.input.LT(1));
	},

    traceOut: function(ruleName, ruleIndex) {
		TP.superclass.traceOut.call(this, ruleName, ruleIndex, this.input.LT(1));
	}
});

})();
