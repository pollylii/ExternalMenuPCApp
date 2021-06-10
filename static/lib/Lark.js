if (!$.browser) $.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

Lark = {
    version: "0.1",
    author: "markding",
    createdate: "2013-10-26",

    getCommonRes: function (key) {
        var realKey = "common" + " - " + key.toLowerCase();
        if (CommonRes[realKey] === undefined) {
            return key;
        }
        else {
            return CommonRes[realKey];
        }
    },

    getPageRes: function (key) {
        return Lark.getPageSectionRes("common", key);
    },

    getPageSectionRes: function (section, key) {
        var realKey = section.toLowerCase() + " - " + key.toLowerCase();
        if (PageRes[realKey] === undefined) {
            return key;
        }
        else {
            return PageRes["common" + " - " + key.toLowerCase()];
        }
    },

    namespace: function () {
        var a = arguments, o = null, i, j, d, rt;
        for (i = 0; i < a.length; ++i) {
            d = a[i].split(".");
            rt = d[0];
            eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = ' + rt + ';');
            for (j = 1; j < d.length; ++j) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
    },

    extendIf: function (o, c) {
        if (o && c) {
            for (var p in c) {
                if (typeof o[p] == "undefined") { o[p] = c[p]; }
            }
        }
        return o;
    },

    override: function (origclass, overrides) {
        if (overrides) {
            var p = origclass.prototype;
            for (var method in overrides) {
                p[method] = overrides[method];
            }
            if (jQuery.browser.msie && overrides.toString != origclass.toString) {
                p.toString = overrides.toString;
            }
        }
    },

    extend: function (obj, options) {
        return jQuery.extend.call(obj, options);
    },

    extendClass: function () {
        // inline overrides
        var io = function (o) {
            for (var m in o) {
                this[m] = o[m];
            }
        };
        var oc = Object.prototype.constructor;

        return function (sb, sp, overrides) {
            if (typeof sp == 'object') {
                overrides = sp;
                sp = sb;
                sb = overrides.constructor != oc ? overrides.constructor : function () { sp.apply(this, arguments); };
            }
            var F = function () { }, sbp, spp = sp.prototype;
            F.prototype = spp;
            sbp = sb.prototype = new F();
            sbp.constructor = sb;
            sb.superclass = spp;
            if (spp.constructor == oc) {
                spp.constructor = sp;
            }
            sb.override = function (o) {
                Lark.override(sb, o);
            };
            sbp.override = io;
            Lark.override(sb, overrides);
            sb.extend = function (o) { Lark.extend(sb, o); };
            return sb;
        };
    } ()
};

(function () {
    var ua = navigator.userAgent.toLowerCase();
    var idSeed = 0;
    var isStrict = document.compatMode == "CSS1Compat",
        isOpera = ua.indexOf("opera") > -1,
        isChrome = ua.indexOf("chrome") > -1,
        isSafari = !isChrome && (/webkit|khtml/).test(ua),
        isSafari3 = isSafari && ua.indexOf('webkit/5') != -1,
        isIE = !isOpera && ua.indexOf("msie") > -1,
        isIE7 = !isOpera && ua.indexOf("msie 7") > -1,
        isIE8 = !isOpera && ua.indexOf("msie 8") > -1,
        isGecko = !isSafari && !isChrome && ua.indexOf("gecko") > -1,
        isGecko3 = isGecko && ua.indexOf("rv:1.9") > -1,
        isBorderBox = isIE && !isStrict,
        isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
        isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
        isAir = (ua.indexOf("adobeair") != -1),
        isLinux = (ua.indexOf("linux") != -1),
        isSecure = window.location.href.toLowerCase().indexOf("https") === 0;


    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

    Lark.extend(Lark, {

        /**
        * True if the detected browser is Opera.
        * @type Boolean
        */
        isOpera: isOpera,
        /**
        * True if the detected browser is Chrome.
        * @type Boolean
        */
        isChrome: isChrome,
        /**
        * True if the detected browser is Safari.
        * @type Boolean
        */
        isSafari: isSafari,
        /**
        * True if the detected browser is Safari 3.x.
        * @type Boolean
        */
        isSafari3: isSafari3,
        /**
        * True if the detected browser is Safari 2.x.
        * @type Boolean
        */
        isSafari2: isSafari && !isSafari3,
        /**
        * True if the detected browser is Internet Explorer.
        * @type Boolean
        */
        isIE: isIE,
        /**
        * True if the detected browser is Internet Explorer 6.x.
        * @type Boolean
        */
        isIE6: isIE && !isIE7 && !isIE8,
        /**
        * True if the detected browser is Internet Explorer 7.x.
        * @type Boolean
        */
        isIE7: isIE7,
        /**
        * True if the detected browser is Internet Explorer 8.x.
        * @type Boolean
        */
        isIE8: isIE8,
        /**
        * True if the detected browser uses the Gecko layout engine (e.g. Mozilla, Firefox).
        * @type Boolean
        */
        isGecko: isGecko,
        /**
        * True if the detected browser uses a pre-Gecko 1.9 layout engine (e.g. Firefox 2.x).
        * @type Boolean
        */
        isGecko2: isGecko && !isGecko3,
        /**
        * True if the detected browser uses a Gecko 1.9+ layout engine (e.g. Firefox 3.x).
        * @type Boolean
        */
        isGecko3: isGecko3,
        /**
        * True if the detected browser is Internet Explorer running in non-strict mode.
        * @type Boolean
        */
        isBorderBox: isBorderBox,
        /**
        * True if the detected platform is Linux.
        * @type Boolean
        */
        isLinux: isLinux,
        /**
        * True if the detected platform is Windows.
        * @type Boolean
        */
        isWindows: isWindows,
        /**
        * True if the detected platform is Mac OS.
        * @type Boolean
        */
        isMac: isMac,
        /**
        * True if the detected platform is Adobe Air.
        * @type Boolean
        */
        isAir: isAir,

        type: function (o) {
            if (o === undefined || o === null) {
                return false;
            }
            var t = typeof o;
            if (t == 'object' || t == 'function') {
                switch (o.constructor) {
                    case Array: return 'array';
                    case RegExp: return 'regexp';
                    case Date: return 'date';
                }
            }
            return t;
        },

        /**
        * Generates unique ids. If the element already has an id, it is unchanged
        * @param {Mixed} el (optional) The element to generate an id for
        * @param {String} prefix (optional) Id prefix (defaults "lark-gen")
        * @return {String} The generated Id.
        */
        id: function (el, prefix) {
            prefix = prefix || "lark-gen";
            el = Lark.getDom(el);
            var id = prefix + (++idSeed);
            return el ? (el.id ? el.id : (el.id = id)) : id;
        },

        each: function (array, fn, scope) {
            if (typeof array.length == "undefined" || typeof array == "string") {
                array = [array];
            }
            for (var i = 0, len = array.length; i < len; i++) {
                if (fn.call(scope || array[i], array[i], i, array) === false) { return i; };
            }
        },

        escapeRe: function (s) {
            return s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
        },

        // internal
        callback: function (cb, scope, args, delay) {
            if (typeof cb == "function") {
                if (delay) {
                    cb.defer(delay, scope, args || []);
                } else {
                    cb.apply(scope, args || []);
                }
            }
        },

        // public method for encoding
        base64Encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        },

        // public method for decoding
        base64Decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        },

        /**
        * Return the dom node for the passed string (id), dom node, or Lark.Element
        * @param {Mixed} el
        * @return HTMLElement
        */
        getDom: function (el) {
            if (!el || !document) {
                return null;
            }
            return el.dom ? el.dom : (typeof el == 'string' ? document.getElementById(el) : el);
        },

        /**
        * Removes a DOM node from the document.  The body node will be ignored if passed in.
        * @param {HTMLElement} node The node to remove
        */
        removeNode: isIE ? function () {
            var d;
            return function (n) {
                if (n && n.tagName != 'BODY') {
                    d = d || document.createElement('div');
                    d.appendChild(n);
                    d.innerHTML = '';
                }
            }
        } () : function (n) {
            if (n && n.parentNode && n.tagName != 'BODY') {
                n.parentNode.removeChild(n);
            }
        },

        /**
        * Takes an object and converts it to an encoded URL. e.g. Lark.urlEncode({foo: 1, bar: 2}); would return "foo=1&bar=2".  Optionally, property values can be arrays, instead of keys and the resulting string that's returned will contain a name/value pair for each array value.
        * @param {Object} o
        * @return {String}
        */
        urlEncode: function (o) {
            if (!o) {
                return "";
            }
            var buf = [];
            for (var key in o) {
                var ov = o[key], k = encodeURIComponent(key);
                var type = typeof ov;
                if (type == 'undefined') {
                    buf.push(k, "=&");
                } else if (type != "function" && type != "object") {
                    buf.push(k, "=", encodeURIComponent(ov), "&");
                } else if (Lark.isDate(ov)) {
                    var s = Lark.encode(ov).replace(/"/g, '');
                    buf.push(k, "=", s, "&");
                } else if (Lark.isArray(ov)) {
                    if (ov.length) {
                        for (var i = 0, len = ov.length; i < len; i++) {
                            buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
                        }
                    } else {
                        buf.push(k, "=&");
                    }
                }
            }
            buf.pop();
            return buf.join("");
        },

        /**
        * Takes an encoded URL and and converts it to an object. e.g. Lark.urlDecode("foo=1&bar=2"); would return {foo: "1", bar: "2"}
        * or Lark.urlDecode("foo=1&bar=2&bar=3&bar=4", false); would return {foo: "1", bar: ["2", "3", "4"]}.
        * @param {String} string
        * @param {Boolean} overwrite (optional) Items of the same name will overwrite previous values instead of creating an an array (Defaults to false).
        * @return {Object} A literal with members
        */
        urlDecode: function (string, overwrite) {
            if (!string || !string.length) {
                return {};
            }
            var obj = {};
            var pairs = string.split('&');
            var pair, name, value;
            for (var i = 0, len = pairs.length; i < len; i++) {
                pair = pairs[i].split('=');
                name = decodeURIComponent(pair[0]);
                value = decodeURIComponent(pair[1]);
                if (overwrite !== true) {
                    if (typeof obj[name] == "undefined") {
                        obj[name] = value;
                    } else if (typeof obj[name] == "string") {
                        obj[name] = [obj[name]];
                        obj[name].push(value);
                    } else {
                        obj[name].push(value);
                    }
                } else {
                    obj[name] = value;
                }
            }
            return obj;
        }
    });
})();



Lark.extend(Function.prototype, {

    createCallback: function (/*args...*/) {
        // make args available, in function below
        var args = arguments;
        var method = this;
        return function () {
            return method.apply(window, args);
        };
    },

    createDelegate: function (obj, args, appendArgs) {
        var method = this;
        return function () {
            var callArgs = args || arguments;
            if (appendArgs === true) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            } else if (typeof appendArgs == "number") {
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args); // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
            }
            return method.apply(obj || window, callArgs);
        };
    },


    defer: function (millis, obj, args, appendArgs) {
        var fn = this.createDelegate(obj, args, appendArgs);
        if (millis) {
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    },


    createSequence: function (fcn, scope) {
        if (typeof fcn != "function") {
            return this;
        }
        var method = this;
        return function () {
            var retval = method.apply(this || window, arguments);
            fcn.apply(scope || this || window, arguments);
            return retval;
        };
    },


    createInterceptor: function (fcn, scope) {
        if (typeof fcn != "function") {
            return this;
        }
        var method = this;
        return function () {
            fcn.target = this;
            fcn.method = method;
            if (fcn.apply(scope || this || window, arguments) === false) {
                return;
            }
            return method.apply(this || window, arguments);
        };
    }
});


Lark.extendIf(String, {

    escape: function (string) {
        return string.replace(/('|\\)/g, "\\$1");
    },

    leftPad: function (val, size, ch) {
        var result = new String(val);
        if (!ch) {
            ch = " ";
        }
        while (result.length < size) {
            result = ch + result;
        }
        return result.toString();
    },

    format: function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    }
});


String.prototype.toggle = function (value, other) {
    return this == value ? other : value;
};

String.prototype.trim = function () {
    var re = /^\s+|\s+$/g;
    return function () { return this.replace(re, ""); };
} ();


Lark.extendIf(Number.prototype, {

    constrain: function (min, max) {
        return Math.min(Math.max(this, min), max);
    }
});


Lark.extendIf(Array.prototype, {

    indexOf: function (o) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] == o) return i;
        }
        return -1;
    },

    remove: function (o) {
        var index = this.indexOf(o);
        if (index != -1) {
            this.splice(index, 1);
        }
        return this;
    }
});

Date.patterns = {
    ISO8601Long: "Y-m-d H:i:s",
    ISO8601Short: "Y-m-d",
    ShortDate: "n/j/Y",
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};

Date.prototype.toTransportFormat = function () {
    return String.format("{0}-{1}-{2} {3}:{4}:{5}",
    String.leftPad(this.getFullYear().toString(), 4, "0"),
    String.leftPad((this.getMonth()+1).toString(), 2, "0"),
    String.leftPad(this.getDate().toString(), 2, "0"),
    String.leftPad(this.getHours().toString(), 2, "0"),
    String.leftPad(this.getMinutes().toString(), 2, "0"),
    String.leftPad(this.getSeconds().toString(), 2, "0"));
};

Date.prototype.getElapsed = function (date) {
    return Math.abs((date || new Date()).getTime() - this.getTime());
};

(function () {

    // create private copy of Lark's String.format() method
    // - to remove unnecessary dependency
    // - to resolve namespace conflict with M$-Ajax's implementation
    function xf(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    }


    // private
    Date.formatCodeToRegex = function (character, currentGroup) {
        // Note: currentGroup - position in regex result array (see notes for Date.parseCodes below)
        var p = Date.parseCodes[character];

        if (p) {
            p = Lark.type(p) == 'function' ? p() : p;
            Date.parseCodes[character] = p; // reassign function result to prevent repeated execution
        }

        return p ? Lark.extendIf({
            c: p.c ? xf(p.c, currentGroup || "{0}") : p.c
        }, p) : {
            g: 0,
            c: null,
            s: Lark.escapeRe(character) // treat unrecognised characters as literals
        }
    }

    // private shorthand for Date.formatCodeToRegex since we'll be using it fairly often
    var $f = Date.formatCodeToRegex;

    jQuery.extend(Date, {
        // private
        parseFunctions: { count: 0 },
        parseRegexes: [],
        formatFunctions: { count: 0 },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        y2kYear: 50,

        MILLI: "ms",
        SECOND: "s",
        MINUTE: "mi",
        HOUR: "h",
        DAY: "d",
        MONTH: "mo",
        YEAR: "y",
        dayNames: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],

        monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],

        monthNumbers: {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        },

        getShortMonthName: function (month) {
            return Date.monthNames[month].substring(0, 3);
        },
        getShortDayName: function (day) {
            return Date.dayNames[day].substring(0, 3);
        },
        getMonthNumber: function (name) {
            // handle camel casing for english month names (since the keys for the Date.monthNumbers hash are case sensitive)
            return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        },

        formatCodes: {
            d: "String.leftPad(this.getDate(), 2, '0')",
            D: "Date.getShortDayName(this.getDay())", // get localised short day name
            j: "this.getDate()",
            l: "Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "this.getSuffix()",
            w: "this.getDay()",
            z: "this.getDayOfYear()",
            W: "String.leftPad(this.getWeekOfYear(), 2, '0')",
            F: "Date.monthNames[this.getMonth()]",
            m: "String.leftPad(this.getMonth() + 1, 2, '0')",
            M: "Date.getShortMonthName(this.getMonth())", // get localised short month name
            n: "(this.getMonth() + 1)",
            t: "this.getDaysInMonth()",
            L: "(this.isLeapYear() ? 1 : 0)",
            o: "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "this.getFullYear()",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "String.leftPad(this.getHours(), 2, '0')",
            i: "String.leftPad(this.getMinutes(), 2, '0')",
            s: "String.leftPad(this.getSeconds(), 2, '0')",
            u: "String.leftPad(this.getMilliseconds(), 3, '0')",
            O: "this.getGMTOffset()",
            P: "this.getGMTOffset(true)",
            T: "this.getTimezone()",
            Z: "(this.getTimezoneOffset() * -60)",
            c: function () { // ISO-8601 -- GMT format
                for (var c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                    var e = c.charAt(i);
                    code.push(e == "T" ? "'T'" : Date.getFormatCode(e)); // treat T as a character literal
                }
                return code.join(" + ");
            },
            /*
            c: function() { // ISO-8601 -- UTC format
            return [
            "this.getUTCFullYear()", "'-'",
            "String.leftPad(this.getUTCMonth() + 1, 2, '0')", "'-'",
            "String.leftPad(this.getUTCDate(), 2, '0')",
            "'T'",
            "String.leftPad(this.getUTCHours(), 2, '0')", "':'",
            "String.leftPad(this.getUTCMinutes(), 2, '0')", "':'",
            "String.leftPad(this.getUTCSeconds(), 2, '0')",
            "'Z'"
            ].join(" + ");
            },
            */
            U: "Math.round(this.getTime() / 1000)"
        },
        parseDate: function (input, format) {
            var p = Date.parseFunctions;
            if (p[format] == null) {
                Date.createParser(format);
            }
            var func = p[format];
            return Date[func](input);
        },

        // private
        getFormatCode: function (character) {
            var f = Date.formatCodes[character];

            if (f) {
                f = Lark.type(f) == 'function' ? f() : f;
                Date.formatCodes[character] = f; // reassign function result to prevent repeated execution
            }

            // note: unknown characters are treated as literals
            return f || ("'" + String.escape(character) + "'");
        },

        // private
        createNewFormat: function (format) {
            var funcName = "format" + Date.formatFunctions.count++,
            code = "Date.prototype." + funcName + " = function(){return ",
            special = false,
            ch = '';

            Date.formatFunctions[format] = funcName;

            for (var i = 0; i < format.length; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                }
                else if (special) {
                    special = false;
                    code += "'" + String.escape(ch) + "' + ";
                }
                else {
                    code += Date.getFormatCode(ch) + " + ";
                }
            }
            eval(code.substring(0, code.length - 3) + ";}");
        },

        // private
        createParser: function () {
            var code = [
            "Date.{0} = function(input){",
                "var y, m, d, h = 0, i = 0, s = 0, ms = 0, o, z, u, v;",
                "input = String(input);",
                "d = new Date();",
                "y = d.getFullYear();",
                "m = d.getMonth();",
                "d = d.getDate();",
                "var results = input.match(Date.parseRegexes[{1}]);",
                "if(results && results.length > 0){",
                    "{2}",
                    "if(u){",
                        "v = new Date(u * 1000);", // give top priority to UNIX time
                    "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0 && ms >= 0){",
                        "v = new Date(y, m, d, h, i, s, ms);",
                    "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0){",
                        "v = new Date(y, m, d, h, i, s);",
                    "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0){",
                        "v = new Date(y, m, d, h, i);",
                    "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0){",
                        "v = new Date(y, m, d, h);",
                    "}else if (y >= 0 && m >= 0 && d > 0){",
                        "v = new Date(y, m, d);",
                    "}else if (y >= 0 && m >= 0){",
                        "v = new Date(y, m);",
                    "}else if (y >= 0){",
                        "v = new Date(y);",
                    "}",
                "}",
                "return (v && (z != null || o != null))?" // favour UTC offset over GMT offset
                    + " (Lark.type(z) == 'number' ? v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - z) :" // reset to UTC, then add offset
                    + " v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn))) : v;", // reset to GMT, then add offset
            "}"
        ].join('\n');

            return function (format) {
                var funcName = "parse" + Date.parseFunctions.count++,
                regexNum = Date.parseRegexes.length,
                currentGroup = 1,
                calc = "",
                regex = "",
                special = false,
                ch = "";

                Date.parseFunctions[format] = funcName;

                for (var i = 0; i < format.length; ++i) {
                    ch = format.charAt(i);
                    if (!special && ch == "\\") {
                        special = true;
                    }
                    else if (special) {
                        special = false;
                        regex += String.escape(ch);
                    }
                    else {
                        var obj = $f(ch, currentGroup);
                        currentGroup += obj.g;
                        regex += obj.s;
                        if (obj.g && obj.c) {
                            calc += obj.c;
                        }
                    }
                }

                Date.parseRegexes[regexNum] = new RegExp("^" + regex + "$", "i");
                eval(xf(code, funcName, regexNum, calc));
            }
        } (),

        // private
        parseCodes: {
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})" // day of month with leading zeroes (01 - 31)
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})" // day of month without leading zeroes (1 - 31)
            },
            D: function () {
                for (var a = [], i = 0; i < 7; a.push(Date.getShortDayName(i)), ++i); // get localised short day names
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + a.join("|") + ")"
                }
            },
            l: function () {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + Date.dayNames.join("|") + ")"
                }
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]" // ISO-8601 day number (1 (monday) - 7 (sunday))
            },
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            w: {
                g: 0,
                c: null,
                s: "[0-6]" // javascript day number (0 (sunday) - 6 (saturday))
            },
            z: {
                g: 0,
                c: null,
                s: "(?:\\d{1,3})" // day of the year (0 - 364 (365 in leap years))
            },
            W: {
                g: 0,
                c: null,
                s: "(?:\\d{2})" // ISO-8601 week number (with leading zero)
            },
            F: function () {
                return {
                    g: 1,
                    c: "m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n", // get localised month number
                    s: "(" + Date.monthNames.join("|") + ")"
                }
            },
            M: function () {
                for (var a = [], i = 0; i < 12; a.push(Date.getShortMonthName(i)), ++i); // get localised short month names
                return Lark.extendIf({
                    s: "(" + a.join("|") + ")"
                }, $f("F"));
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{2})" // month number with leading zeros (01 - 12)
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{1,2})" // month number without leading zeros (1 - 12)
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})" // no. of days in the month (28 - 31)
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: function () {
                return $f("Y");
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})" // 4-digit year
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\n"
                + "y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n", // 2-digit year
                s: "(\\d{1,2})"
            },
            a: {
                g: 1,
                c: "if (results[{0}] == 'am') {\n"
                + "if (h == 12) { h = 0; }\n"
                + "} else { if (h < 12) { h += 12; }}",
                s: "(am|pm)"
            },
            A: {
                g: 1,
                c: "if (results[{0}] == 'AM') {\n"
                + "if (h == 12) { h = 0; }\n"
                + "} else { if (h < 12) { h += 12; }}",
                s: "(AM|PM)"
            },
            g: function () {
                return $f("G");
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})" // 24-hr format of an hour without leading zeroes (0 - 23)
            },
            h: function () {
                return $f("H");
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})" //  24-hr format of an hour with leading zeroes (00 - 23)
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})" // minutes with leading zeros (00 - 59)
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})" // seconds with leading zeros (00 - 59)
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)" // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
            },
            O: {
                g: 1,
                c: [
                "o = results[{0}];",
                "var sn = o.substring(0,1);", // get + / - sign
                "var hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60);", // get hours (performs minutes-to-hour conversion also, just in case)
                "var mn = o.substring(3,5) % 60;", // get minutes
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
            ].join("\n"),
                s: "([+\-]\\d{4})" // GMT offset in hrs and mins
            },
            P: {
                g: 1,
                c: [
                "o = results[{0}];",
                "var sn = o.substring(0,1);", // get + / - sign
                "var hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60);", // get hours (performs minutes-to-hour conversion also, just in case)
                "var mn = o.substring(4,6) % 60;", // get minutes
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
            ].join("\n"),
                s: "([+\-]\\d{2}:\\d{2})" // GMT offset in hrs and mins (with colon separator)
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}" // timezone abbrev. may be between 1 - 4 chars
            },
            Z: {
                g: 1,
                c: "z = results[{0}] * 1;\n" // -43200 <= UTC offset <= 50400
                  + "z = (-43200 <= z && z <= 50400)? z : null;\n",
                s: "([+\-]?\\d{1,5})" // leading '+' sign is optional for UTC offset
            },
            c: function () {
                var calc = [],
                arr = [
                    $f("Y", 1), // year
                    $f("m", 2), // month
                    $f("d", 3), // day
                    $f("h", 4), // hour
                    $f("i", 5), // minute
                    $f("s", 6), // second
                    {c: "ms = (results[7] || '.0').substring(1); ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n" }, // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
                    {c: [ // allow both "Z" (i.e. UTC) and "+08:00" (i.e. UTC offset) time zone delimiters
                        "if(results[9] == 'Z'){",
                            "z = 0;",
                        "}else{",
                            $f("P", 9).c,
                        "}"
                    ].join('\n')
                }
                ];

                for (var i = 0, l = arr.length; i < l; ++i) {
                    calc.push(arr[i].c);
                }

                return {
                    g: 1,
                    c: calc.join(""),
                    s: arr[0].s + "-" + arr[1].s + "-" + arr[2].s + "T" + arr[3].s + ":" + arr[4].s + ":" + arr[5].s
                      + "((\.|,)\\d+)?" // decimal fraction of a second (e.g. ",998465" or ".998465")
                      + "(Z|([+\-]\\d{2}:\\d{2}))" // "Z" (UTC) or "+08:00" (UTC offset)
                }
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)" // leading minus sign indicates seconds before UNIX epoch
            }
        }
    });

} ());

jQuery.extend(Date.prototype, {

    dateFormat: function (format) {
        if (Date.formatFunctions[format] == null) {
            Date.createNewFormat(format);
        }
        var func = Date.formatFunctions[format];
        return this[func]();
    },

    getTimezone: function () {
        return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
    },


    getGMTOffset: function (colon) {
        return (this.getTimezoneOffset() > 0 ? "-" : "+")
            + String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0")
            + (colon ? ":" : "")
            + String.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2, "0");
    },


    getDayOfYear: function () {
        var num = 0;
        Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
        for (var i = 0; i < this.getMonth(); ++i) {
            num += Date.daysInMonth[i];
        }
        return num + this.getDate() - 1;
    },


    getWeekOfYear: function () {
        // adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
        var ms1d = 864e5, // milliseconds in a day
            ms7d = 7 * ms1d; // milliseconds in a week

        return function () { // return a closure so constants get calculated only once
            var DC3 = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 3) / ms1d, // an Absolute Day Number
                AWN = Math.floor(DC3 / 7), // an Absolute Week Number
                Wyr = new Date(AWN * ms7d).getUTCFullYear();

            return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
        }
    } (),


    isLeapYear: function () {
        var year = this.getFullYear();
        return !!((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
    },


    getFirstDayOfMonth: function () {
        var day = (this.getDay() - (this.getDate() - 1)) % 7;
        return (day < 0) ? (day + 7) : day;
    },


    getLastDayOfMonth: function () {
        var day = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
        return (day < 0) ? (day + 7) : day;
    },



    getFirstDateOfMonth: function () {
        return new Date(this.getFullYear(), this.getMonth(), 1);
    },


    getLastDateOfMonth: function () {
        return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
    },


    getDaysInMonth: function () {
        Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
        return Date.daysInMonth[this.getMonth()];
    },

    getSuffix: function () {
        switch (this.getDate()) {
            case 1:
            case 21:
            case 31:
                return "st";
            case 2:
            case 22:
                return "nd";
            case 3:
            case 23:
                return "rd";
            default:
                return "th";
        }
    },


    clone: function () {
        return new Date(this.getTime());
    },


    clearTime: function (clone) {
        if (clone) {
            return this.clone().clearTime();
        }
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    },

    add: function (interval, value) {
        var d = this.clone();
        if (!interval || value === 0) return d;

        switch (interval.toLowerCase()) {
            case Date.MILLI:
                d.setMilliseconds(this.getMilliseconds() + value);
                break;
            case Date.SECOND:
                d.setSeconds(this.getSeconds() + value);
                break;
            case Date.MINUTE:
                d.setMinutes(this.getMinutes() + value);
                break;
            case Date.HOUR:
                d.setHours(this.getHours() + value);
                break;
            case Date.DAY:
                d.setDate(this.getDate() + value);
                break;
            case Date.MONTH:
                var day = this.getDate();
                if (day > 28) {
                    day = Math.min(day, this.getFirstDateOfMonth().add('mo', value).getLastDateOfMonth().getDate());
                }
                d.setDate(day);
                d.setMonth(this.getMonth() + value);
                break;
            case Date.YEAR:
                d.setFullYear(this.getFullYear() + value);
                break;
        }
        return d;
    },

    between: function (start, end) {
        var t = this.getTime();
        return start.getTime() <= t && t <= end.getTime();
    }
});


Date.prototype.format = Date.prototype.dateFormat;

if ($.browser.safari) {
    Date.brokenSetMonth = Date.prototype.setMonth;
    Date.prototype.setMonth = function (num) {
        if (num <= -1) {
            var n = Math.ceil(-num);
            var back_year = Math.ceil(n / 12);
            var month = (n % 12) ? 12 - n % 12 : 0;
            this.setFullYear(this.getFullYear() - back_year);
            return Date.brokenSetMonth.call(this, month);
        } else {
            return Date.brokenSetMonth.apply(this, arguments);
        }
    };
}



(function () {
    Lark.namespace("Lark.util");

    var createBuffered = function (h, o, scope) {
        var task = new Lark.DelayedTask();
        return function () {
            task.delay(o.buffer, h, scope, Array.prototype.slice.call(arguments, 0));
        };
    };

    var createSingle = function (h, e, fn, scope) {
        return function () {
            e.removeListener(fn, scope);
            return h.apply(scope, arguments);
        };
    };

    var createDelayed = function (h, o, scope) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            setTimeout(function () {
                h.apply(scope, args);
            }, o.delay || 10);
        };
    };

    Lark.util.Event = function (obj, name) {
        this.name = name;
        this.obj = obj;
        this.listeners = [];
    };

    Lark.util.Event.prototype = {
        addListener: function (fn, scope, options) {
            scope = scope || this.obj;
            if (!this.isListening(fn, scope)) {
                var l = this.createListener(fn, scope, options);
                if (!this.firing) {
                    this.listeners.push(l);
                } else { // if we are currently firing this event, don't disturb the listener loop
                    this.listeners = this.listeners.slice(0);
                    this.listeners.push(l);
                }
            }
        },

        createListener: function (fn, scope, o) {
            o = o || {};
            scope = scope || this.obj;
            var l = { fn: fn, scope: scope, options: o };
            var h = fn;
            if (o.delay) {
                h = createDelayed(h, o, scope);
            }
            if (o.single) {
                h = createSingle(h, this, fn, scope);
            }
            if (o.buffer) {
                h = createBuffered(h, o, scope);
            }
            l.fireFn = h;
            return l;
        },

        findListener: function (fn, scope) {
            scope = scope || this.obj;
            var ls = this.listeners;
            for (var i = 0, len = ls.length; i < len; i++) {
                var l = ls[i];
                if (l.fn == fn && l.scope == scope) {
                    return i;
                }
            }
            return -1;
        },

        isListening: function (fn, scope) {
            return this.findListener(fn, scope) != -1;
        },

        removeListener: function (fn, scope) {
            var index;
            if ((index = this.findListener(fn, scope)) != -1) {
                if (!this.firing) {
                    this.listeners.splice(index, 1);
                } else {
                    this.listeners = this.listeners.slice(0);
                    this.listeners.splice(index, 1);
                }
                return true;
            }
            return false;
        },

        clearListeners: function () {
            this.listeners = [];
        },

        fire: function () {
            var ls = this.listeners, scope, len = ls.length;
            if (len > 0) {
                this.firing = true;
                var args = Array.prototype.slice.call(arguments, 0);
                for (var i = 0; i < len; i++) {
                    var l = ls[i];
                    if (l.fireFn.apply(l.scope || this.obj || window, arguments) === false) {
                        this.firing = false;
                        return false;
                    }
                }
                this.firing = false;
            }
            return true;
        }
    };
})();



Lark.Observable = function () {
    /**
    * @cfg {Object} listeners (optional) A config object containing one or more event handlers to be added to this
    * object during initialization.  This should be a valid listeners config object as specified in the
    * {@link #addListener} example for attaching multiple handlers at once.
    */
    if (this.listeners) {
        this.on(this.listeners);
        delete this.listeners;
    }
};
Lark.Observable.prototype = {
    /**
    * Fires the specified event with the passed parameters (minus the event name).
    * @param {String} eventName
    * @param {Object...} args Variable number of parameters are passed to handlers
    * @return {Boolean} returns false if any of the handlers return false otherwise it returns true
    */
    fireEvent: function () {
        if (this.eventsSuspended !== true) {
            var ce = this.events[arguments[0].toLowerCase()];
            if (typeof ce == "object") {
                return ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
            }
        }
        return true;
    },

    // private
    filterOptRe: /^(?:scope|delay|buffer|single)$/,

    /**
    * Appends an event handler to this component
    * @param {String}   eventName The type of event to listen for
    * @param {Function} handler The method the event invokes
    * @param {Object}   scope (optional) The scope in which to execute the handler
    * function. The handler function's "this" context.
    * @param {Object}   options (optional) An object containing handler configuration
    * properties. This may contain any of the following properties:<ul>
    * <li><b>scope</b> : Object<p class="sub-desc">The scope in which to execute the handler function. The handler function's "this" context.</p></li>
    * <li><b>delay</b> : Number<p class="sub-desc">The number of milliseconds to delay the invocation of the handler after the event fires.</p></li>
    * <li><b>single</b> : Boolean<p class="sub-desc">True to add a handler to handle just the next firing of the event, and then remove itself.</p></li>
    * <li><b>buffer</b> : Number<p class="sub-desc">Causes the handler to be scheduled to run in an {@link Lark.DelayedTask} delayed
    * by the specified number of milliseconds. If the event fires again within that time, the original
    * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</p></li>
    * </ul><br>
    * <p>
    * <b>Combining Options</b><br>
    * Using the options argument, it is possible to combine different types of listeners:<br>
    * <br>
    * A normalized, delayed, one-time listener that auto stops the event and passes a custom argument (forumId)
    * <pre><code>
    el.on('click', this.onClick, this, {
    single: true,
    delay: 100,
    forumId: 4
    });</code></pre>
    * <p>
    * <b>Attaching multiple handlers in 1 call</b><br>
    * The method also allows for a single argument to be passed which is a config object containing properties
    * which specify multiple handlers.
    * <p>
    * <pre><code>
    foo.on({
    'click' : {
    fn: this.onClick,
    scope: this,
    delay: 100
    },
    'mouseover' : {
    fn: this.onMouseOver,
    scope: this
    },
    'mouseout' : {
    fn: this.onMouseOut,
    scope: this
    }
    });</code></pre>
    * <p>
    * Or a shorthand syntax:<br>
    * <pre><code>
    foo.on({
    'click' : this.onClick,
    'mouseover' : this.onMouseOver,
    'mouseout' : this.onMouseOut,
    scope: this
    });</code></pre>
    */
    addListener: function (eventName, fn, scope, o) {
        if (typeof eventName == "object") {
            o = eventName;
            for (var e in o) {
                if (this.filterOptRe.test(e)) {
                    continue;
                }
                if (typeof o[e] == "function") {
                    // shared options
                    this.addListener(e, o[e], o.scope, o);
                } else {
                    // individual options
                    this.addListener(e, o[e].fn, o[e].scope, o[e]);
                }
            }
            return;
        }
        o = (!o || typeof o == "boolean") ? {} : o;
        eventName = eventName.toLowerCase();
        var ce = this.events[eventName] || true;
        if (typeof ce == "boolean") {
            ce = new Lark.Event(this, eventName);
            this.events[eventName] = ce;
        }
        ce.addListener(fn, scope, o);
    },

    /**
    * Removes a listener
    * @param {String}   eventName     The type of event to listen for
    * @param {Function} handler        The handler to remove
    * @param {Object}   scope  (optional) The scope (this object) for the handler
    */
    removeListener: function (eventName, fn, scope) {
        var ce = this.events[eventName.toLowerCase()];
        if (typeof ce == "object") {
            ce.removeListener(fn, scope);
        }
    },

    /**
    * Removes all listeners for this object
    */
    purgeListeners: function () {
        for (var evt in this.events) {
            if (typeof this.events[evt] == "object") {
                this.events[evt].clearListeners();
            }
        }
    },

    /**
    * Relays selected events from the specified Observable as if the events were fired by <tt><b>this</b></tt>.
    * @param {Object} o The Observable whose events this object is to relay.
    * @param {Array} events Array of event names to relay.
    */
    relayEvents: function (o, events) {
        var createHandler = function (ename) {
            return function () {
                return this.fireEvent.apply(this, Lark.combine(ename, Array.prototype.slice.call(arguments, 0)));
            };
        };
        for (var i = 0, len = events.length; i < len; i++) {
            var ename = events[i];
            if (!this.events[ename]) { this.events[ename] = true; };
            o.on(ename, createHandler(ename), this);
        }
    },

    /**
    * Used to define events on this Observable
    * @param {Object} object The object with the events defined
    */
    addEvents: function (o) {
        if (!this.events) {
            this.events = {};
        }
        if (typeof o == 'string') {
            for (var i = 0, a = arguments, v; v = a[i]; i++) {
                if (!this.events[a[i]]) {
                    this.events[a[i]] = true;
                }
            }
        } else {
            Lark.extendIf(this.events, o);
        }
    },

    /**
    * Checks to see if this object has any listeners for a specified event
    * @param {String} eventName The name of the event to check for
    * @return {Boolean} True if the event is being listened for, else false
    */
    hasListener: function (eventName) {
        var e = this.events[eventName];
        return typeof e == "object" && e.listeners.length > 0;
    },

    /**
    * Suspend the firing of all events. (see {@link #resumeEvents})
    */
    suspendEvents: function () {
        this.eventsSuspended = true;
    },

    /**
    * Resume firing events. (see {@link #suspendEvents})
    */
    resumeEvents: function () {
        this.eventsSuspended = false;
    },

    // these are considered experimental
    // allows for easier interceptor and sequences, including cancelling and overwriting the return value of the call
    // private
    getMethodEvent: function (method) {
        if (!this.methodEvents) {
            this.methodEvents = {};
        }
        var e = this.methodEvents[method];
        if (!e) {
            e = {};
            this.methodEvents[method] = e;

            e.originalFn = this[method];
            e.methodName = method;
            e.before = [];
            e.after = [];


            var returnValue, v, cancel;
            var obj = this;

            var makeCall = function (fn, scope, args) {
                if ((v = fn.apply(scope || obj, args)) !== undefined) {
                    if (typeof v === 'object') {
                        if (v.returnValue !== undefined) {
                            returnValue = v.returnValue;
                        } else {
                            returnValue = v;
                        }
                        if (v.cancel === true) {
                            cancel = true;
                        }
                    } else if (v === false) {
                        cancel = true;
                    } else {
                        returnValue = v;
                    }
                }
            }

            this[method] = function () {
                returnValue = v = undefined; cancel = false;
                var args = Array.prototype.slice.call(arguments, 0);
                for (var i = 0, len = e.before.length; i < len; i++) {
                    makeCall(e.before[i].fn, e.before[i].scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }

                if ((v = e.originalFn.apply(obj, args)) !== undefined) {
                    returnValue = v;
                }

                for (var i = 0, len = e.after.length; i < len; i++) {
                    makeCall(e.after[i].fn, e.after[i].scope, args);
                    if (cancel) {
                        return returnValue;
                    }
                }
                return returnValue;
            };
        }
        return e;
    },

    // adds an "interceptor" called before the original method
    beforeMethod: function (method, fn, scope) {
        var e = this.getMethodEvent(method);
        e.before.push({ fn: fn, scope: scope });
    },

    // adds a "sequence" called after the original method
    afterMethod: function (method, fn, scope) {
        var e = this.getMethodEvent(method);
        e.after.push({ fn: fn, scope: scope });
    },

    removeMethodListener: function (method, fn, scope) {
        var e = this.getMethodEvent(method);
        for (var i = 0, len = e.before.length; i < len; i++) {
            if (e.before[i].fn == fn && e.before[i].scope == scope) {
                e.before.splice(i, 1);
                return;
            }
        }
        for (var i = 0, len = e.after.length; i < len; i++) {
            if (e.after[i].fn == fn && e.after[i].scope == scope) {
                e.after.splice(i, 1);
                return;
            }
        }
    }
};
/**
* Appends an event handler to this element (shorthand for addListener)
* @param {String}   eventName     The type of event to listen for
* @param {Function} handler        The method the event invokes
* @param {Object}   scope (optional) The scope in which to execute the handler
* function. The handler function's "this" context.
* @param {Object}   options  (optional)
* @method
*/
Lark.Observable.prototype.on = Lark.Observable.prototype.addListener;
/**
* Removes a listener (shorthand for removeListener)
* @param {String}   eventName     The type of event to listen for
* @param {Function} handler        The handler to remove
* @param {Object}   scope  (optional) The scope (this object) for the handler
* @method
*/
Lark.Observable.prototype.un = Lark.Observable.prototype.removeListener;

/**
* Starts capture on the specified Observable. All events will be passed
* to the supplied function with the event name + standard signature of the event
* <b>before</b> the event is fired. If the supplied function returns false,
* the event will not fire.
* @param {Observable} o The Observable to capture
* @param {Function} fn The function to call
* @param {Object} scope (optional) The scope (this object) for the fn
* @static
*/
Lark.Observable.capture = function (o, fn, scope) {
    o.fireEvent = o.fireEvent.createInterceptor(fn, scope);
};

/**
* Removes <b>all</b> added captures from the Observable.
* @param {Observable} o The Observable to release
* @static
*/
Lark.Observable.releaseCapture = function (o) {
    o.fireEvent = Lark.Observable.prototype.fireEvent;
};

(function () {

    var createBuffered = function (h, o, scope) {
        var task = new Lark.DelayedTask();
        return function () {
            task.delay(o.buffer, h, scope, Array.prototype.slice.call(arguments, 0));
        };
    };

    var createSingle = function (h, e, fn, scope) {
        return function () {
            e.removeListener(fn, scope);
            return h.apply(scope, arguments);
        };
    };

    var createDelayed = function (h, o, scope) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            setTimeout(function () {
                h.apply(scope, args);
            }, o.delay || 10);
        };
    };

    Lark.Event = function (obj, name) {
        this.name = name;
        this.obj = obj;
        this.listeners = [];
    };

    Lark.Event.prototype = {
        addListener: function (fn, scope, options) {
            scope = scope || this.obj;
            if (!this.isListening(fn, scope)) {
                var l = this.createListener(fn, scope, options);
                if (!this.firing) {
                    this.listeners.push(l);
                } else { // if we are currently firing this event, don't disturb the listener loop
                    this.listeners = this.listeners.slice(0);
                    this.listeners.push(l);
                }
            }
        },

        createListener: function (fn, scope, o) {
            o = o || {};
            scope = scope || this.obj;
            var l = { fn: fn, scope: scope, options: o };
            var h = fn;
            if (o.delay) {
                h = createDelayed(h, o, scope);
            }
            if (o.single) {
                h = createSingle(h, this, fn, scope);
            }
            if (o.buffer) {
                h = createBuffered(h, o, scope);
            }
            l.fireFn = h;
            return l;
        },

        findListener: function (fn, scope) {
            scope = scope || this.obj;
            var ls = this.listeners;
            for (var i = 0, len = ls.length; i < len; i++) {
                var l = ls[i];
                if (l.fn == fn && l.scope == scope) {
                    return i;
                }
            }
            return -1;
        },

        isListening: function (fn, scope) {
            return this.findListener(fn, scope) != -1;
        },

        removeListener: function (fn, scope) {
            var index;
            if ((index = this.findListener(fn, scope)) != -1) {
                if (!this.firing) {
                    this.listeners.splice(index, 1);
                } else {
                    this.listeners = this.listeners.slice(0);
                    this.listeners.splice(index, 1);
                }
                return true;
            }
            return false;
        },

        clearListeners: function () {
            this.listeners = [];
        },

        fire: function () {
            var ls = this.listeners, scope, len = ls.length;
            if (len > 0) {
                this.firing = true;
                var args = Array.prototype.slice.call(arguments, 0);
                for (var i = 0; i < len; i++) {
                    var l = ls[i];
                    if (l.fireFn.apply(l.scope || this.obj || window, arguments) === false) {
                        this.firing = false;
                        return false;
                    }
                }
                this.firing = false;
            }
            return true;
        }
    };
})();

Lark.namespace("Lark.lib");

Lark.lib.Event = function () {
    var loadComplete = false;
    var listeners = [];
    var unloadListeners = [];
    var retryCount = 0;
    var onAvailStack = [];
    var counter = 0;
    var lastError = null;

    return {
        POLL_RETRYS: 200,
        POLL_INTERVAL: 20,
        EL: 0,
        TYPE: 1,
        FN: 2,
        WFN: 3,
        OBJ: 3,
        ADJ_SCOPE: 4,
        _interval: null,

        startInterval: function () {
            if (!this._interval) {
                var self = this;
                var callback = function () {
                    self._tryPreloadAttach();
                };
                this._interval = setInterval(callback, this.POLL_INTERVAL);

            }
        },

        onAvailable: function (p_id, p_fn, p_obj, p_override) {
            onAvailStack.push({ id: p_id,
                fn: p_fn,
                obj: p_obj,
                override: p_override,
                checkReady: false
            });

            retryCount = this.POLL_RETRYS;
            this.startInterval();
        },


        addListener: function (el, eventName, fn) {
            el = Lark.getDom(el);
            if (!el || !fn) {
                return false;
            }

            if ("unload" == eventName) {
                unloadListeners[unloadListeners.length] =
                    [el, eventName, fn];
                return true;
            }

            // prevent unload errors with simple check
            var wrappedFn = function (e) {
                return typeof Lark != 'undefined' ? fn(Lark.lib.Event.getEvent(e)) : false;
            };

            var li = [el, eventName, fn, wrappedFn];

            var index = listeners.length;
            listeners[index] = li;

            this.doAdd(el, eventName, wrappedFn, false);
            return true;

        },


        removeListener: function (el, eventName, fn) {
            var i, len;

            el = Lark.getDom(el);

            if (!fn) {
                return this.purgeElement(el, false, eventName);
            }


            if ("unload" == eventName) {

                for (i = 0, len = unloadListeners.length; i < len; i++) {
                    var li = unloadListeners[i];
                    if (li &&
                            li[0] == el &&
                            li[1] == eventName &&
                            li[2] == fn) {
                        unloadListeners.splice(i, 1);
                        return true;
                    }
                }

                return false;
            }

            var cacheItem = null;


            var index = arguments[3];

            if ("undefined" == typeof index) {
                index = this._getCacheIndex(el, eventName, fn);
            }

            if (index >= 0) {
                cacheItem = listeners[index];
            }

            if (!el || !cacheItem) {
                return false;
            }

            this.doRemove(el, eventName, cacheItem[this.WFN], false);

            delete listeners[index][this.WFN];
            delete listeners[index][this.FN];
            listeners.splice(index, 1);

            return true;

        },


        getTarget: function (ev, resolveTextNode) {
            ev = ev.browserEvent || ev;
            var t = ev.target || ev.srcElement;
            return this.resolveTextNode(t);
        },


        resolveTextNode: function (node) {
            if (Lark.isSafari && node && 3 == node.nodeType) {
                return node.parentNode;
            } else {
                return node;
            }
        },


        getPageX: function (ev) {
            ev = ev.browserEvent || ev;
            var x = ev.pageX;
            if (!x && 0 !== x) {
                x = ev.clientX || 0;

                if (Lark.isIE) {
                    x += this.getScroll()[1];
                }
            }

            return x;
        },


        getPageY: function (ev) {
            ev = ev.browserEvent || ev;
            var y = ev.pageY;
            if (!y && 0 !== y) {
                y = ev.clientY || 0;

                if (Lark.isIE) {
                    y += this.getScroll()[0];
                }
            }


            return y;
        },


        getXY: function (ev) {
            ev = ev.browserEvent || ev;
            return [this.getPageX(ev), this.getPageY(ev)];
        },


        getRelatedTarget: function (ev) {
            ev = ev.browserEvent || ev;
            var t = ev.relatedTarget;
            if (!t) {
                if (ev.type == "mouseout") {
                    t = ev.toElement;
                } else if (ev.type == "mouseover") {
                    t = ev.fromElement;
                }
            }

            return this.resolveTextNode(t);
        },


        getTime: function (ev) {
            ev = ev.browserEvent || ev;
            if (!ev.time) {
                var t = new Date().getTime();
                try {
                    ev.time = t;
                } catch (ex) {
                    this.lastError = ex;
                    return t;
                }
            }

            return ev.time;
        },


        stopEvent: function (ev) {
            this.stopPropagation(ev);
            this.preventDefault(ev);
        },


        stopPropagation: function (ev) {
            ev = ev.browserEvent || ev;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },


        preventDefault: function (ev) {
            ev = ev.browserEvent || ev;
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
        },


        getEvent: function (e) {
            var ev = e || window.event;
            if (!ev) {
                var c = this.getEvent.caller;
                while (c) {
                    ev = c.arguments[0];
                    if (ev && Event == ev.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return ev;
        },


        getCharCode: function (ev) {
            ev = ev.browserEvent || ev;
            return ev.charCode || ev.keyCode || 0;
        },


        _getCacheIndex: function (el, eventName, fn) {
            for (var i = 0, len = listeners.length; i < len; ++i) {
                var li = listeners[i];
                if (li &&
                        li[this.FN] == fn &&
                        li[this.EL] == el &&
                        li[this.TYPE] == eventName) {
                    return i;
                }
            }

            return -1;
        },


        elCache: {},


        getEl: function (id) {
            return document.getElementById(id);
        },


        clearCache: function () {
        },


        _load: function (e) {
            loadComplete = true;
            var EU = Lark.lib.Event;


            if (Lark.isIE) {
                EU.doRemove(window, "load", EU._load);
            }
        },


        _tryPreloadAttach: function () {

            if (this.locked) {
                return false;
            }

            this.locked = true;


            var tryAgain = !loadComplete;
            if (!tryAgain) {
                tryAgain = (retryCount > 0);
            }


            var notAvail = [];
            for (var i = 0, len = onAvailStack.length; i < len; ++i) {
                var item = onAvailStack[i];
                if (item) {
                    var el = this.getEl(item.id);

                    if (el) {
                        if (!item.checkReady ||
                                loadComplete ||
                                el.nextSibling ||
                                (document && document.body)) {

                            var scope = el;
                            if (item.override) {
                                if (item.override === true) {
                                    scope = item.obj;
                                } else {
                                    scope = item.override;
                                }
                            }
                            item.fn.call(scope, item.obj);
                            onAvailStack[i] = null;
                        }
                    } else {
                        notAvail.push(item);
                    }
                }
            }

            retryCount = (notAvail.length === 0) ? 0 : retryCount - 1;

            if (tryAgain) {

                this.startInterval();
            } else {
                clearInterval(this._interval);
                this._interval = null;
            }

            this.locked = false;

            return true;

        },


        purgeElement: function (el, recurse, eventName) {
            var elListeners = this.getListeners(el, eventName);
            if (elListeners) {
                for (var i = 0, len = elListeners.length; i < len; ++i) {
                    var l = elListeners[i];
                    this.removeListener(el, l.type, l.fn);
                }
            }

            if (recurse && el && el.childNodes) {
                for (i = 0, len = el.childNodes.length; i < len; ++i) {
                    this.purgeElement(el.childNodes[i], recurse, eventName);
                }
            }
        },


        getListeners: function (el, eventName) {
            var results = [], searchLists;
            if (!eventName) {
                searchLists = [listeners, unloadListeners];
            } else if (eventName == "unload") {
                searchLists = [unloadListeners];
            } else {
                searchLists = [listeners];
            }

            for (var j = 0; j < searchLists.length; ++j) {
                var searchList = searchLists[j];
                if (searchList && searchList.length > 0) {
                    for (var i = 0, len = searchList.length; i < len; ++i) {
                        var l = searchList[i];
                        if (l && l[this.EL] === el &&
                                (!eventName || eventName === l[this.TYPE])) {
                            results.push({
                                type: l[this.TYPE],
                                fn: l[this.FN],
                                obj: l[this.OBJ],
                                adjust: l[this.ADJ_SCOPE],
                                index: i
                            });
                        }
                    }
                }
            }

            return (results.length) ? results : null;
        },


        _unload: function (e) {

            var EU = Lark.lib.Event, i, j, l, len, index;

            for (i = 0, len = unloadListeners.length; i < len; ++i) {
                l = unloadListeners[i];
                if (l) {
                    var scope = window;
                    if (l[EU.ADJ_SCOPE]) {
                        if (l[EU.ADJ_SCOPE] === true) {
                            scope = l[EU.OBJ];
                        } else {
                            scope = l[EU.ADJ_SCOPE];
                        }
                    }
                    l[EU.FN].call(scope, EU.getEvent(e), l[EU.OBJ]);
                    unloadListeners[i] = null;
                    l = null;
                    scope = null;
                }
            }

            unloadListeners = null;

            if (listeners && listeners.length > 0) {
                j = listeners.length;
                while (j) {
                    index = j - 1;
                    l = listeners[index];
                    if (l) {
                        EU.removeListener(l[EU.EL], l[EU.TYPE],
                                    l[EU.FN], index);
                    }
                    j = j - 1;
                }
                l = null;

                EU.clearCache();
            }

            EU.doRemove(window, "unload", EU._unload);

        },


        getScroll: function () {
            var dd = document.documentElement, db = document.body;
            if (dd && (dd.scrollTop || dd.scrollLeft)) {
                return [dd.scrollTop, dd.scrollLeft];
            } else if (db) {
                return [db.scrollTop, db.scrollLeft];
            } else {
                return [0, 0];
            }
        },


        doAdd: function () {
            if (window.addEventListener) {
                return function (el, eventName, fn, capture) {
                    el.addEventListener(eventName, fn, (capture));
                };
            } else if (window.attachEvent) {
                return function (el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                };
            } else {
                return function () {
                };
            }
        } (),


        doRemove: function () {
            if (window.removeEventListener) {
                return function (el, eventName, fn, capture) {
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (window.detachEvent) {
                return function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                return function () {
                };
            }
        } ()
    };

} ();

var E = Lark.lib.Event;
E.on = E.addListener;
E.un = E.removeListener;
if (document && document.body) {
    E._load();
} else {
    E.doAdd(window, "load", E._load);
}
E.doAdd(window, "unload", E._unload);
E._tryPreloadAttach();

Lark.EventManager = function () {
    var docReadyEvent, docReadyProcId, docReadyState = false;
    var resizeEvent, resizeTask, textEvent, textSize;
    var E = Lark.lib.Event;
    var D = Lark.lib.Dom;
    // fix parser confusion
    var xname = 'Lar' + 'k';

    var elHash = {};

    var addListener = function (el, ename, fn, wrap, scope) {
        var id = Lark.id(el);
        if (!elHash[id]) {
            elHash[id] = {};
        }
        var es = elHash[id];
        if (!es[ename]) {
            es[ename] = [];
        }
        var ls = es[ename];
        ls.push({
            id: id,
            ename: ename,
            fn: fn,
            wrap: wrap,
            scope: scope
        });

        E.on(el, ename, wrap);

        if (ename == "mousewheel" && el.addEventListener) { // workaround for jQuery
            el.addEventListener("DOMMouseScroll", wrap, false);
            E.on(window, 'unload', function () {
                el.removeEventListener("DOMMouseScroll", wrap, false);
            });
        }
        if (ename == "mousedown" && el == document) { // fix stopped mousedowns on the document
            Lark.EventManager.stoppedMouseDownEvent.addListener(wrap);
        }
    }

    var removeListener = function (el, ename, fn, scope) {
        el = Lark.getDom(el);

        var id = Lark.id(el), es = elHash[id], wrap;
        if (es) {
            var ls = es[ename], l;
            if (ls) {
                for (var i = 0, len = ls.length; i < len; i++) {
                    l = ls[i];
                    if (l.fn == fn && (!scope || l.scope == scope)) {
                        wrap = l.wrap;
                        E.un(el, ename, wrap);
                        ls.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (ename == "mousewheel" && el.addEventListener && wrap) {
            el.removeEventListener("DOMMouseScroll", wrap, false);
        }
        if (ename == "mousedown" && el == document && wrap) { // fix stopped mousedowns on the document
            Lark.EventManager.stoppedMouseDownEvent.removeListener(wrap);
        }
    }

    var removeAll = function (el) {
        el = Lark.getDom(el);
        var id = Lark.id(el), es = elHash[id], ls;
        if (es) {
            for (var ename in es) {
                if (es.hasOwnProperty(ename)) {
                    ls = es[ename];
                    for (var i = 0, len = ls.length; i < len; i++) {
                        E.un(el, ename, ls[i].wrap);
                        ls[i] = null;
                    }
                }
                es[ename] = null;
            }
            delete elHash[id];
        }
    }


    var fireDocReady = function () {
        if (!docReadyState) {
            docReadyState = true;
            Lark.isReady = true;
            if (docReadyProcId) {
                clearInterval(docReadyProcId);
            }
            if (Lark.isGecko || Lark.isOpera) {
                document.removeEventListener("DOMContentLoaded", fireDocReady, false);
            }
            if (Lark.isIE) {
                var defer = document.getElementById("ie-deferred-loader");
                if (defer) {
                    defer.onreadystatechange = null;
                    defer.parentNode.removeChild(defer);
                }
            }
            if (docReadyEvent) {
                docReadyEvent.fire();
                docReadyEvent.clearListeners();
            }
        }
    };

    var initDocReady = function () {
        docReadyEvent = new Lark.util.Event();
        if (Lark.isGecko || Lark.isOpera) {
            document.addEventListener("DOMContentLoaded", fireDocReady, false);
        } else if (Lark.isIE) {
            document.write("<s" + 'cript id="ie-deferred-loader" defer="defer" src="/' + '/:"></s' + "cript>");
            var defer = document.getElementById("ie-deferred-loader");
            defer.onreadystatechange = function () {
                if (this.readyState == "complete") {
                    fireDocReady();
                }
            };
        } else if (Lark.isSafari) {
            docReadyProcId = setInterval(function () {
                var rs = document.readyState;
                if (rs == "complete") {
                    fireDocReady();
                }
            }, 10);
        }
        // no matter what, make sure it fires on load
        E.on(window, "load", fireDocReady);
    };

    var createBuffered = function (h, o) {
        var task = new Lark.DelayedTask(h);
        return function (e) {
            // create new event object impl so new events don't wipe out properties
            e = new Lark.EventObjectImpl(e);
            task.delay(o.buffer, h, null, [e]);
        };
    };

    var createSingle = function (h, el, ename, fn, scope) {
        return function (e) {
            Lark.EventManager.removeListener(el, ename, fn, scope);
            h(e);
        };
    };

    var createDelayed = function (h, o) {
        return function (e) {
            // create new event object impl so new events don't wipe out properties
            e = new Lark.EventObjectImpl(e);
            setTimeout(function () {
                h(e);
            }, o.delay || 10);
        };
    };

    var listen = function (element, ename, opt, fn, scope) {
        var o = (!opt || typeof opt == "boolean") ? {} : opt;
        fn = fn || o.fn; scope = scope || o.scope;
        var el = Lark.getDom(element);
        if (!el) {
            throw "Error listening for \"" + ename + '\". Element "' + element + '" doesn\'t exist.';
        }
        var h = function (e) {
            // prevent errors while unload occurring
            if (!window[xname]) {
                return;
            }
            e = Lark.EventObject.setEvent(e);
            var t;
            if (o.delegate) {
                t = e.getTarget(o.delegate, el);
                if (!t) {
                    return;
                }
            } else {
                t = e.target;
            }
            if (o.stopEvent === true) {
                e.stopEvent();
            }
            if (o.preventDefault === true) {
                e.preventDefault();
            }
            if (o.stopPropagation === true) {
                e.stopPropagation();
            }

            if (o.normalized === false) {
                e = e.browserEvent;
            }

            fn.call(scope || el, e, t, o);
        };
        if (o.delay) {
            h = createDelayed(h, o);
        }
        if (o.single) {
            h = createSingle(h, el, ename, fn, scope);
        }
        if (o.buffer) {
            h = createBuffered(h, o);
        }

        addListener(el, ename, fn, h, scope);
        return h;
    };

    var propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
    var pub = {

        /**
        * Appends an event handler to an element.  The shorthand version {@link #on} is equivalent.  Typically you will
        * use {@link Lark.Element#addListener} directly on an Element in favor of calling this version.
        * @param {String/HTMLElement} el The html element or id to assign the event handler to
        * @param {String} eventName The type of event to listen for
        * @param {Function} handler The handler function the event invokes This function is passed
        * the following parameters:<ul>
        * <li>evt : EventObject<div class="sub-desc">The {@link Lark.EventObject EventObject} describing the event.</div></li>
        * <li>t : Element<div class="sub-desc">The {@link Lark.Element Element} which was the target of the event.
        * Note that this may be filtered by using the <tt>delegate</tt> option.</div></li>
        * <li>o : Object<div class="sub-desc">The options object from the addListener call.</div></li>
        * </ul>
        * @param {Object} scope (optional) The scope in which to execute the handler
        * function (the handler function's "this" context)
        * @param {Object} options (optional) An object containing handler configuration properties.
        * This may contain any of the following properties:<ul>
        * <li>scope {Object} : The scope in which to execute the handler function. The handler function's "this" context.</li>
        * <li>delegate {String} : A simple selector to filter the target or look for a descendant of the target</li>
        * <li>stopEvent {Boolean} : True to stop the event. That is stop propagation, and prevent the default action.</li>
        * <li>preventDefault {Boolean} : True to prevent the default action</li>
        * <li>stopPropagation {Boolean} : True to prevent event propagation</li>
        * <li>normalized {Boolean} : False to pass a browser event to the handler function instead of an Lark.EventObject</li>
        * <li>delay {Number} : The number of milliseconds to delay the invocation of the handler after te event fires.</li>
        * <li>single {Boolean} : True to add a handler to handle just the next firing of the event, and then remove itself.</li>
        * <li>buffer {Number} : Causes the handler to be scheduled to run in an {@link Lark.DelayedTask} delayed
        * by the specified number of milliseconds. If the event fires again within that time, the original
        * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</li>
        * </ul><br>
        * <p>See {@link Lark.Element#addListener} for examples of how to use these options.</p>
        */
        addListener: function (element, eventName, fn, scope, options) {
            if (typeof eventName == "object") {
                var o = eventName;
                for (var e in o) {
                    if (propRe.test(e)) {
                        continue;
                    }
                    if (typeof o[e] == "function") {
                        // shared options
                        listen(element, e, o, o[e], o.scope);
                    } else {
                        // individual options
                        listen(element, e, o[e]);
                    }
                }
                return;
            }
            return listen(element, eventName, options, fn, scope);
        },

        /**
        * Removes an event handler from an element.  The shorthand version {@link #un} is equivalent.  Typically
        * you will use {@link Lark.Element#removeListener} directly on an Element in favor of calling this version.
        * @param {String/HTMLElement} el The id or html element from which to remove the event
        * @param {String} eventName The type of event
        * @param {Function} fn The handler function to remove
        */
        removeListener: function (element, eventName, fn, scope) {
            return removeListener(element, eventName, fn, scope);
        },

        /**
        * Removes all event handers from an element.  Typically you will use {@link Lark.Element#removeAllListeners}
        * directly on an Element in favor of calling this version.
        * @param {String/HTMLElement} el The id or html element from which to remove the event
        */
        removeAll: function (element) {
            return removeAll(element);
        },

        /**
        * Fires when the document is ready (before onload and before images are loaded). Can be
        * accessed shorthanded as Lark.onReady().
        * @param {Function} fn The method the event invokes
        * @param {Object} scope (optional) An object that becomes the scope of the handler
        * @param {boolean} options (optional) An object containing standard {@link #addListener} options
        */
        onDocumentReady: function (fn, scope, options) {
            if (docReadyState) { // if it already fired
                docReadyEvent.addListener(fn, scope, options);
                docReadyEvent.fire();
                docReadyEvent.clearListeners();
                return;
            }
            if (!docReadyEvent) {
                initDocReady();
            }
            options = options || {};
            if (!options.delay) {
                options.delay = 1;
            }
            docReadyEvent.addListener(fn, scope, options);
        },

        // private
        doResizeEvent: function () {
            resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
        },

        /**
        * Fires when the window is resized and provides resize event buffering (50 milliseconds), passes new viewport width and height to handlers.
        * @param {Function} fn        The method the event invokes
        * @param {Object}   scope    An object that becomes the scope of the handler
        * @param {boolean}  options
        */
        onWindowResize: function (fn, scope, options) {
            if (!resizeEvent) {
                resizeEvent = new Lark.util.Event();
                resizeTask = new Lark.DelayedTask(this.doResizeEvent);
                E.on(window, "resize", this.fireWindowResize, this);
            }
            resizeEvent.addListener(fn, scope, options);
        },

        // exposed only to allow manual firing
        fireWindowResize: function () {
            if (resizeEvent) {
                if ((Lark.isIE || Lark.isAir) && resizeTask) {
                    resizeTask.delay(50);
                } else {
                    resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
                }
            }
        },

        /**
        * Fires when the user changes the active text size. Handler gets called with 2 params, the old size and the new size.
        * @param {Function} fn        The method the event invokes
        * @param {Object}   scope    An object that becomes the scope of the handler
        * @param {boolean}  options
        */
        onTextResize: function (fn, scope, options) {
            if (!textEvent) {
                textEvent = new Lark.util.Event();
                var textEl = new Lark.Element(document.createElement('div'));
                textEl.dom.className = 'x-text-resize';
                textEl.dom.innerHTML = 'X';
                textEl.appendTo(document.body);
                textSize = textEl.dom.offsetHeight;
                setInterval(function () {
                    if (textEl.dom.offsetHeight != textSize) {
                        textEvent.fire(textSize, textSize = textEl.dom.offsetHeight);
                    }
                }, this.textResizeInterval);
            }
            textEvent.addListener(fn, scope, options);
        },

        /**
        * Removes the passed window resize listener.
        * @param {Function} fn        The method the event invokes
        * @param {Object}   scope    The scope of handler
        */
        removeResizeListener: function (fn, scope) {
            if (resizeEvent) {
                resizeEvent.removeListener(fn, scope);
            }
        },

        // private
        fireResize: function () {
            if (resizeEvent) {
                resizeEvent.fire(D.getViewWidth(), D.getViewHeight());
            }
        },
        /**
        * Url used for onDocumentReady with using SSL (defaults to Lark.SSL_SECURE_URL)
        */
        ieDeferSrc: false,
        /**
        * The frequency, in milliseconds, to check for text resize events (defaults to 50)
        */
        textResizeInterval: 50
    };
    /**
    * Appends an event handler to an element.  Shorthand for {@link #addListener}.
    * @param {String/HTMLElement} el The html element or id to assign the event handler to
    * @param {String} eventName The type of event to listen for
    * @param {Function} handler The handler function the event invokes
    * @param {Object} scope (optional) The scope in which to execute the handler
    * function (the handler function's "this" context)
    * @param {Object} options (optional) An object containing standard {@link #addListener} options
    * @member Lark.EventManager
    * @method on
    */
    pub.on = pub.addListener;
    /**
    * Removes an event handler from an element.  Shorthand for {@link #removeListener}.
    * @param {String/HTMLElement} el The id or html element from which to remove the event
    * @param {String} eventName The type of event
    * @param {Function} fn The handler function to remove
    * @return {Boolean} True if a listener was actually removed, else false
    * @member Lark.EventManager
    * @method un
    */
    pub.un = pub.removeListener;

    pub.stoppedMouseDownEvent = new Lark.util.Event();
    return pub;
} ();
/**
* Fires when the document is ready (before onload and before images are loaded).  Shorthand of {@link Lark.EventManager#onDocumentReady}.
* @param {Function} fn The method the event invokes
* @param {Object} scope An object that becomes the scope of the handler
* @param {boolean} options (optional) An object containing standard {@link #addListener} options
* @member Lark
* @method onReady
*/
Lark.onReady = Lark.EventManager.onDocumentReady;


// Initialize doc classes
(function () {
    var initExtCss = function () {
        // find the body element
        var bd = document.body || document.getElementsByTagName('body')[0];
        if (!bd) { return false; }
        var cls = [' ',
                Lark.isIE ? "Lark-ie " + (Lark.isIE6 ? 'Lark-ie6' : (Lark.isIE7 ? 'Lark-ie7' : 'Lark-ie8'))
                : Lark.isGecko ? "Lark-gecko " + (Lark.isGecko2 ? 'Lark-gecko2' : 'Lark-gecko3')
                : Lark.isOpera ? "Lark-opera"
                : Lark.isSafari ? "Lark-safari"
                : Lark.isChrome ? "Lark-chrome" : ""];

        if (Lark.isMac) {
            cls.push("Lark-mac");
        }
        if (Lark.isLinux) {
            cls.push("Lark-linux");
        }
        if (Lark.isBorderBox) {
            cls.push('Lark-border-box');
        }
        if (Lark.isStrict) { // add to the parent to allow for selectors like ".Lark-strict .Lark-ie"
            var p = bd.parentNode;
            if (p) {
                p.className += ' Lark-strict';
            }
        }
        bd.className += cls.join(' ');
        return true;
    }

    if (!initExtCss()) {
        Lark.onReady(initExtCss);
    }
})();

/**
* @class Lark.EventObject
* EventObject exposes the Yahoo! UI Event functionality directly on the object
* passed to your event handler. It exists mostly for convenience. It also fixes the annoying null checks automatically to cleanup your code
* Example:
* <pre><code>
function handleClick(e){ // e is not a standard event object, it is a Lark.EventObject
e.preventDefault();
var target = e.getTarget();
...
}
var myDiv = Lark.get("myDiv");
myDiv.on("click", handleClick);
//or
Lark.EventManager.on("myDiv", 'click', handleClick);
Lark.EventManager.addListener("myDiv", 'click', handleClick);
</code></pre>
* @singleton
*/
Lark.EventObject = function () {

    var E = Lark.lib.Event;

    // safari keypress events for special keys return bad keycodes
    var safariKeys = {
        3: 13, // enter
        63234: 37, // left
        63235: 39, // right
        63232: 38, // up
        63233: 40, // down
        63276: 33, // page up
        63277: 34, // page down
        63272: 46, // delete
        63273: 36, // home
        63275: 35  // end
    };

    // normalize button clicks
    var btnMap = Lark.isIE ? { 1: 0, 4: 1, 2: 2} :
                (Lark.isSafari ? { 1: 0, 2: 1, 3: 2} : { 0: 0, 1: 1, 2: 2 });

    Lark.EventObjectImpl = function (e) {
        if (e) {
            this.setEvent(e.browserEvent || e);
        }
    };

    Lark.EventObjectImpl.prototype = {
        /** The normal browser event */
        browserEvent: null,
        /** The button pressed in a mouse event */
        button: -1,
        /** True if the shift key was down during the event */
        shiftKey: false,
        /** True if the control key was down during the event */
        ctrlKey: false,
        /** True if the alt key was down during the event */
        altKey: false,

        /** Key constant @type Number */
        BACKSPACE: 8,
        /** Key constant @type Number */
        TAB: 9,
        /** Key constant @type Number */
        NUM_CENTER: 12,
        /** Key constant @type Number */
        ENTER: 13,
        /** Key constant @type Number */
        RETURN: 13,
        /** Key constant @type Number */
        SHIFT: 16,
        /** Key constant @type Number */
        CTRL: 17,
        CONTROL: 17, // legacy
        /** Key constant @type Number */
        ALT: 18,
        /** Key constant @type Number */
        PAUSE: 19,
        /** Key constant @type Number */
        CAPS_LOCK: 20,
        /** Key constant @type Number */
        ESC: 27,
        /** Key constant @type Number */
        SPACE: 32,
        /** Key constant @type Number */
        PAGE_UP: 33,
        PAGEUP: 33, // legacy
        /** Key constant @type Number */
        PAGE_DOWN: 34,
        PAGEDOWN: 34, // legacy
        /** Key constant @type Number */
        END: 35,
        /** Key constant @type Number */
        HOME: 36,
        /** Key constant @type Number */
        LEFT: 37,
        /** Key constant @type Number */
        UP: 38,
        /** Key constant @type Number */
        RIGHT: 39,
        /** Key constant @type Number */
        DOWN: 40,
        /** Key constant @type Number */
        PRINT_SCREEN: 44,
        /** Key constant @type Number */
        INSERT: 45,
        /** Key constant @type Number */
        DELETE: 46,
        /** Key constant @type Number */
        ZERO: 48,
        /** Key constant @type Number */
        ONE: 49,
        /** Key constant @type Number */
        TWO: 50,
        /** Key constant @type Number */
        THREE: 51,
        /** Key constant @type Number */
        FOUR: 52,
        /** Key constant @type Number */
        FIVE: 53,
        /** Key constant @type Number */
        SIX: 54,
        /** Key constant @type Number */
        SEVEN: 55,
        /** Key constant @type Number */
        EIGHT: 56,
        /** Key constant @type Number */
        NINE: 57,
        /** Key constant @type Number */
        A: 65,
        /** Key constant @type Number */
        B: 66,
        /** Key constant @type Number */
        C: 67,
        /** Key constant @type Number */
        D: 68,
        /** Key constant @type Number */
        E: 69,
        /** Key constant @type Number */
        F: 70,
        /** Key constant @type Number */
        G: 71,
        /** Key constant @type Number */
        H: 72,
        /** Key constant @type Number */
        I: 73,
        /** Key constant @type Number */
        J: 74,
        /** Key constant @type Number */
        K: 75,
        /** Key constant @type Number */
        L: 76,
        /** Key constant @type Number */
        M: 77,
        /** Key constant @type Number */
        N: 78,
        /** Key constant @type Number */
        O: 79,
        /** Key constant @type Number */
        P: 80,
        /** Key constant @type Number */
        Q: 81,
        /** Key constant @type Number */
        R: 82,
        /** Key constant @type Number */
        S: 83,
        /** Key constant @type Number */
        T: 84,
        /** Key constant @type Number */
        U: 85,
        /** Key constant @type Number */
        V: 86,
        /** Key constant @type Number */
        W: 87,
        /** Key constant @type Number */
        X: 88,
        /** Key constant @type Number */
        Y: 89,
        /** Key constant @type Number */
        Z: 90,
        /** Key constant @type Number */
        CONTEXT_MENU: 93,
        /** Key constant @type Number */
        NUM_ZERO: 96,
        /** Key constant @type Number */
        NUM_ONE: 97,
        /** Key constant @type Number */
        NUM_TWO: 98,
        /** Key constant @type Number */
        NUM_THREE: 99,
        /** Key constant @type Number */
        NUM_FOUR: 100,
        /** Key constant @type Number */
        NUM_FIVE: 101,
        /** Key constant @type Number */
        NUM_SIX: 102,
        /** Key constant @type Number */
        NUM_SEVEN: 103,
        /** Key constant @type Number */
        NUM_EIGHT: 104,
        /** Key constant @type Number */
        NUM_NINE: 105,
        /** Key constant @type Number */
        NUM_MULTIPLY: 106,
        /** Key constant @type Number */
        NUM_PLUS: 107,
        /** Key constant @type Number */
        NUM_MINUS: 109,
        /** Key constant @type Number */
        NUM_PERIOD: 110,
        /** Key constant @type Number */
        NUM_DIVISION: 111,
        /** Key constant @type Number */
        F1: 112,
        /** Key constant @type Number */
        F2: 113,
        /** Key constant @type Number */
        F3: 114,
        /** Key constant @type Number */
        F4: 115,
        /** Key constant @type Number */
        F5: 116,
        /** Key constant @type Number */
        F6: 117,
        /** Key constant @type Number */
        F7: 118,
        /** Key constant @type Number */
        F8: 119,
        /** Key constant @type Number */
        F9: 120,
        /** Key constant @type Number */
        F10: 121,
        /** Key constant @type Number */
        F11: 122,
        /** Key constant @type Number */
        F12: 123,

        /** @private */
        setEvent: function (e) {
            if (e == this || (e && e.browserEvent)) { // already wrapped
                return e;
            }
            this.browserEvent = e;
            if (e) {
                // normalize buttons
                this.button = e.button ? btnMap[e.button] : (e.which ? e.which - 1 : -1);
                if (e.type == 'click' && this.button == -1) {
                    this.button = 0;
                }
                this.type = e.type;
                this.shiftKey = e.shiftKey;
                // mac metaKey behaves like ctrlKey
                this.ctrlKey = e.ctrlKey || e.metaKey;
                this.altKey = e.altKey;
                // in getKey these will be normalized for the mac
                this.keyCode = e.keyCode;
                this.charCode = e.charCode;
                // cache the target for the delayed and or buffered events
                this.target = E.getTarget(e);
                // same for XY
                this.xy = E.getXY(e);
            } else {
                this.button = -1;
                this.shiftKey = false;
                this.ctrlKey = false;
                this.altKey = false;
                this.keyCode = 0;
                this.charCode = 0;
                this.target = null;
                this.xy = [0, 0];
            }
            return this;
        },

        /**
        * Stop the event (preventDefault and stopPropagation)
        */
        stopEvent: function () {
            if (this.browserEvent) {
                if (this.browserEvent.type == 'mousedown') {
                    Lark.EventManager.stoppedMouseDownEvent.fire(this);
                }
                E.stopEvent(this.browserEvent);
            }
        },

        /**
        * Prevents the browsers default handling of the event.
        */
        preventDefault: function () {
            if (this.browserEvent) {
                E.preventDefault(this.browserEvent);
            }
        },

        /** @private */
        isNavKeyPress: function () {
            var k = this.keyCode;
            k = Lark.isSafari ? (safariKeys[k] || k) : k;
            return (k >= 33 && k <= 40) || k == this.RETURN || k == this.TAB || k == this.ESC;
        },

        isSpecialKey: function () {
            var k = this.keyCode;
            return (this.type == 'keypress' && this.ctrlKey) || k == 9 || k == 13 || k == 40 || k == 27 ||
            (k == 16) || (k == 17) ||
            (k >= 18 && k <= 20) ||
            (k >= 33 && k <= 35) ||
            (k >= 36 && k <= 39) ||
            (k >= 44 && k <= 45);
        },

        /**
        * Cancels bubbling of the event.
        */
        stopPropagation: function () {
            if (this.browserEvent) {
                if (this.browserEvent.type == 'mousedown') {
                    Lark.EventManager.stoppedMouseDownEvent.fire(this);
                }
                E.stopPropagation(this.browserEvent);
            }
        },

        /**
        * Gets the character code for the event.
        * @return {Number}
        */
        getCharCode: function () {
            return this.charCode || this.keyCode;
        },

        /**
        * Returns a normalized keyCode for the event.
        * @return {Number} The key code
        */
        getKey: function () {
            var k = this.keyCode || this.charCode;
            return Lark.isSafari ? (safariKeys[k] || k) : k;
        },

        /**
        * Gets the x coordinate of the event.
        * @return {Number}
        */
        getPageX: function () {
            return this.xy[0];
        },

        /**
        * Gets the y coordinate of the event.
        * @return {Number}
        */
        getPageY: function () {
            return this.xy[1];
        },

        /**
        * Gets the time of the event.
        * @return {Number}
        */
        getTime: function () {
            if (this.browserEvent) {
                return E.getTime(this.browserEvent);
            }
            return null;
        },

        /**
        * Gets the page coordinates of the event.
        * @return {Array} The xy values like [x, y]
        */
        getXY: function () {
            return this.xy;
        },

        /**
        * Gets the target for the event.
        * @param {String} selector (optional) A simple selector to filter the target or look for an ancestor of the target
        * @param {Number/Mixed} maxDepth (optional) The max depth to
        search as a number or element (defaults to 10 || document.body)
        * @param {Boolean} returnEl (optional) True to return a Lark.Element object instead of DOM node
        * @return {HTMLelement}
        */
        getTarget: function (selector, maxDepth, returnEl) {
            return selector ? Lark.fly(this.target).findParent(selector, maxDepth, returnEl) : (returnEl ? Lark.get(this.target) : this.target);
        },

        /**
        * Gets the related target.
        * @return {HTMLElement}
        */
        getRelatedTarget: function () {
            if (this.browserEvent) {
                return E.getRelatedTarget(this.browserEvent);
            }
            return null;
        },

        /**
        * Normalizes mouse wheel delta across browsers
        * @return {Number} The delta
        */
        getWheelDelta: function () {
            var e = this.browserEvent;
            var delta = 0;
            if (e.wheelDelta) { /* IE/Opera. */
                delta = e.wheelDelta / 120;
            } else if (e.detail) { /* Mozilla case. */
                delta = -e.detail / 3;
            }
            return delta;
        },

        /**
        * Returns true if the control, meta, shift or alt key was pressed during this event.
        * @return {Boolean}
        */
        hasModifier: function () {
            return ((this.ctrlKey || this.altKey) || this.shiftKey) ? true : false;
        },

        /**
        * Returns true if the target of this event is a child of el.  Unless the allowEl parameter is set, it will return false if if the target is el.
        * Example usage:<pre><code>
        // Handle click on any child of an element
        Lark.getBody().on('click', function(e){
        if(e.within('some-el')){
        alert('Clicked on a child of some-el!');
        }
        });

        // Handle click directly on an element, ignoring clicks on child nodes
        Lark.getBody().on('click', function(e,t){
        if((t.id == 'some-el') && !e.within(t, true)){
        alert('Clicked directly on some-el!');
        }
        });
        </code></pre>
        * @param {Mixed} el The id, DOM element or Lark.Element to check
        * @param {Boolean} related (optional) true to test if the related target is within el instead of the target
        * @param {Boolean} allowEl {optional} true to also check if the passed element is the target or related target
        * @return {Boolean}
        */
        within: function (el, related, allowEl) {
            var t = this[related ? "getRelatedTarget" : "getTarget"]();
            return t && ((allowEl ? (t === Lark.getDom(el)) : false) || Lark.fly(el).contains(t));
        },

        getPoint: function () {
            return new Lark.lib.Point(this.xy[0], this.xy[1]);
        }
    };

    return new Lark.EventObjectImpl();
} ();

Lark.lib.Ajax = {
    request: function (method, uri, cb, data, options) {
        if (options) {
            var hs = options.headers;
            if (hs) {
                for (var h in hs) {
                    if (hs.hasOwnProperty(h)) {
                        this.initHeader(h, hs[h], false);
                    }
                }
            }
            if (options.xmlData) {
                if (!hs || !hs['Content-Type']) {
                    if (options.useDefaultXhrHeader) this.initHeader('Content-Type', 'text/xml', false);
                }
                method = (method ? method : (options.method ? options.method : 'POST'));
                data = options.xmlData;
            } else if (options.jsonData) {
                if (!hs || !hs['Content-Type']) {
                    if (options.useDefaultXhrHeader) this.initHeader('Content-Type', 'application/json', false);
                }
                method = (method ? method : (options.method ? options.method : 'POST'));
                data = typeof options.jsonData == 'object' ? Lark.encode(options.jsonData) : options.jsonData;
            }
        }

        return this.asyncRequest(method, uri, cb, data);
    },

    serializeForm: function (form) {
        if (typeof form == 'string') {
            form = (document.getElementById(form) || document.forms[form]);
        }

        var el, name, val, disabled, data = '', hasSubmit = false;
        for (var i = 0; i < form.elements.length; i++) {
            el = form.elements[i];
            disabled = form.elements[i].disabled;
            name = form.elements[i].name;
            val = form.elements[i].value;

            if (!disabled && name) {
                switch (el.type) {
                    case 'select-one':
                    case 'select-multiple':
                        for (var j = 0; j < el.options.length; j++) {
                            if (el.options[j].selected) {
                                if (Lark.isIE) {
                                    data += encodeURIComponent(name) + '=' + encodeURIComponent(el.options[j].attributes['value'].specified ? el.options[j].value : el.options[j].text) + '&';
                                }
                                else {
                                    data += encodeURIComponent(name) + '=' + encodeURIComponent(el.options[j].hasAttribute('value') ? el.options[j].value : el.options[j].text) + '&';
                                }
                            }
                        }
                        break;
                    case 'radio':
                    case 'checkbox':
                        if (el.checked) {
                            data += encodeURIComponent(name) + '=' + encodeURIComponent(val) + '&';
                        }
                        break;
                    case 'file':

                    case undefined:

                    case 'reset':

                    case 'button':

                        break;
                    case 'submit':
                        if (hasSubmit == false) {
                            data += encodeURIComponent(name) + '=' + encodeURIComponent(val) + '&';
                            hasSubmit = true;
                        }
                        break;
                    default:
                        data += encodeURIComponent(name) + '=' + encodeURIComponent(val) + '&';
                        break;
                }
            }
        }
        data = data.substr(0, data.length - 1);
        return data;
    },

    headers: {},

    hasHeaders: false,

    useDefaultHeader: true,

    defaultPostHeader: 'application/x-www-form-urlencoded; charset=UTF-8',

    useDefaultXhrHeader: true,

    defaultXhrHeader: 'XMLHttpRequest',

    hasDefaultHeaders: true,

    defaultHeaders: {},

    poll: {},

    timeout: {},

    pollInterval: 50,

    transactionId: 0,

    setProgId: function (id) {
        this.activeX.unshift(id);
    },

    setDefaultPostHeader: function (b) {
        this.useDefaultHeader = b;
    },

    setDefaultXhrHeader: function (b) {
        this.useDefaultXhrHeader = b;
    },

    setPollingInterval: function (i) {
        if (typeof i == 'number' && isFinite(i)) {
            this.pollInterval = i;
        }
    },

    createXhrObject: function (transactionId) {
        var obj, http;
        try {

            http = new XMLHttpRequest();

            obj = { conn: http, tId: transactionId };
        }
        catch (e) {
            for (var i = 0; i < this.activeX.length; ++i) {
                try {

                    http = new ActiveXObject(this.activeX[i]);

                    obj = { conn: http, tId: transactionId };
                    break;
                }
                catch (e) {
                }
            }
        }
        finally {
            return obj;
        }
    },

    getConnectionObject: function () {
        var o;
        var tId = this.transactionId;

        try {
            o = this.createXhrObject(tId);
            if (o) {
                this.transactionId++;
            }
        }
        catch (e) {
        }
        finally {
            return o;
        }
    },

    asyncRequest: function (method, uri, callback, postData) {
        var o = this.getConnectionObject();

        if (!o) {
            return null;
        }
        else {
            o.conn.open(method, uri, true);

            if (this.useDefaultXhrHeader) {
                if (!this.defaultHeaders['X-Requested-With']) {
                    this.initHeader('X-Requested-With', this.defaultXhrHeader, true);
                }
            }

            if (postData && this.useDefaultHeader && (!this.hasHeaders || !this.headers['Content-Type'])) {
                this.initHeader('Content-Type', this.defaultPostHeader);
            }

            if (this.hasDefaultHeaders || this.hasHeaders) {
                this.setHeader(o);
            }

            this.handleReadyState(o, callback);
            o.conn.send(postData || null);

            return o;
        }
    },

    handleReadyState: function (o, callback) {
        var oConn = this;

        if (callback && callback.timeout) {
            this.timeout[o.tId] = window.setTimeout(function () {
                oConn.abort(o, callback, true);
            }, callback.timeout);
        }

        this.poll[o.tId] = window.setInterval(
                    function () {
                        if (o.conn && o.conn.readyState == 4) {
                            window.clearInterval(oConn.poll[o.tId]);
                            delete oConn.poll[o.tId];

                            if (callback && callback.timeout) {
                                window.clearTimeout(oConn.timeout[o.tId]);
                                delete oConn.timeout[o.tId];
                            }

                            oConn.handleTransactionResponse(o, callback);
                        }
                    }
                    , this.pollInterval);
    },

    handleTransactionResponse: function (o, callback, isAbort) {

        if (!callback) {
            this.releaseObject(o);
            return;
        }

        var httpStatus, responseObject;

        try {
            if (o.conn.status !== undefined && o.conn.status != 0) {
                httpStatus = o.conn.status;
            }
            else {
                httpStatus = 13030;
            }
        }
        catch (e) {


            httpStatus = 13030;
        }

        if ((httpStatus >= 200 && httpStatus < 300) || (Lark.isIE && httpStatus == 1223)) {
            responseObject = this.createResponseObject(o, callback.argument);
            if (callback.success) {
                if (!callback.scope) {
                    callback.success(responseObject);
                }
                else {


                    callback.success.apply(callback.scope, [responseObject]);
                }
            }
        }
        else {
            switch (httpStatus) {

                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    responseObject = this.createExceptionObject(o.tId, callback.argument, (isAbort ? isAbort : false));
                    if (callback.failure) {
                        if (!callback.scope) {
                            callback.failure(responseObject);
                        }
                        else {
                            callback.failure.apply(callback.scope, [responseObject]);
                        }
                    }
                    break;
                default:
                    responseObject = this.createResponseObject(o, callback.argument);
                    if (callback.failure) {
                        if (!callback.scope) {
                            callback.failure(responseObject);
                        }
                        else {
                            callback.failure.apply(callback.scope, [responseObject]);
                        }
                    }
            }
        }

        this.releaseObject(o);
        responseObject = null;
    },

    createResponseObject: function (o, callbackArg) {
        var obj = {};
        var headerObj = {};

        try {
            var headerStr = o.conn.getAllResponseHeaders();
            var header = headerStr.split('\n');
            for (var i = 0; i < header.length; i++) {
                var delimitPos = header[i].indexOf(':');
                if (delimitPos != -1) {
                    headerObj[header[i].substring(0, delimitPos)] = header[i].substring(delimitPos + 2);
                }
            }
        }
        catch (e) {
        }

        obj.tId = o.tId;
        obj.status = o.conn.status;
        obj.statusText = o.conn.statusText;
        obj.getResponseHeader = headerObj;
        obj.getAllResponseHeaders = headerStr;
        obj.responseText = o.conn.responseText;
        obj.responseXML = o.conn.responseXML;

        if (typeof callbackArg !== undefined) {
            obj.argument = callbackArg;
        }

        return obj;
    },

    createExceptionObject: function (tId, callbackArg, isAbort) {
        var COMM_CODE = 0;
        var COMM_ERROR = 'communication failure';
        var ABORT_CODE = -1;
        var ABORT_ERROR = 'transaction aborted';

        var obj = {};

        obj.tId = tId;
        if (isAbort) {
            obj.status = ABORT_CODE;
            obj.statusText = ABORT_ERROR;
        }
        else {
            obj.status = COMM_CODE;
            obj.statusText = COMM_ERROR;
        }

        if (callbackArg) {
            obj.argument = callbackArg;
        }

        return obj;
    },

    initHeader: function (label, value, isDefault) {
        var headerObj = (isDefault) ? this.defaultHeaders : this.headers;

        if (headerObj[label] === undefined) {
            headerObj[label] = value;
        }
        else {


            headerObj[label] = value + "," + headerObj[label];
        }

        if (isDefault) {
            this.hasDefaultHeaders = true;
        }
        else {
            this.hasHeaders = true;
        }
    },


    setHeader: function (o) {
        if (this.hasDefaultHeaders) {
            for (var prop in this.defaultHeaders) {
                if (this.defaultHeaders.hasOwnProperty(prop)) {
                    o.conn.setRequestHeader(prop, this.defaultHeaders[prop]);
                }
            }
        }

        if (this.hasHeaders) {
            for (var prop in this.headers) {
                if (this.headers.hasOwnProperty(prop)) {
                    o.conn.setRequestHeader(prop, this.headers[prop]);
                }
            }
            this.headers = {};
            this.hasHeaders = false;
        }
    },

    resetDefaultHeaders: function () {
        delete this.defaultHeaders;
        this.defaultHeaders = {};
        this.hasDefaultHeaders = false;
    },

    abort: function (o, callback, isTimeout) {
        if (this.isCallInProgress(o)) {
            o.conn.abort();
            window.clearInterval(this.poll[o.tId]);
            delete this.poll[o.tId];
            if (isTimeout) {
                delete this.timeout[o.tId];
            }

            this.handleTransactionResponse(o, callback, true);

            return true;
        }
        else {
            return false;
        }
    },


    isCallInProgress: function (o) {


        if (o.conn) {
            return o.conn.readyState != 4 && o.conn.readyState != 0;
        }
        else {

            return false;
        }
    },


    releaseObject: function (o) {

        o.conn = null;

        o = null;
    },

    activeX: [
        'MSXML2.XMLHTTP.3.0',
        'MSXML2.XMLHTTP',
        'Microsoft.XMLHTTP'
        ]


};

Lark.Connection = Lark.extendClass(Lark.Observable, {

    timeout: 6000000,
    autoAbort: false,
    disableCaching: true,
    uploadForm: null,
    currentRoute:'',
    disableCachingParam: '_dc',

    constructor: function (config) {
        Lark.extend(this, config);
        this.addEvents(
            "beforerequest",
            "requestcomplete",
            "requestexception"
        );
        Lark.Connection.superclass.constructor.call(this);
    },

    request: function (o) {
        if (this.fireEvent("beforerequest", this, o) !== false) {
            var p = o.params;

            if (typeof p == "function") {
                p = p.call(o.scope || window, o);
            }
            if (typeof p == "object") {
                p = Lark.urlEncode(p);
            }
            if (this.extraParams) {
                var extras = Lark.urlEncode(this.extraParams);
                p = p ? (p + '&' + extras) : extras;
            }

            var url = o.url || this.url;
            if (typeof url == 'function') {
                url = url.call(o.scope || window, o);
            }

            if (o.form) {
                var form = Lark.getDom(o.form);
                url = url || form.action;

                var enctype = form.getAttribute("enctype");
                if (o.isUpload || (enctype && enctype.toLowerCase() == 'multipart/form-data')) {
                    return this.doFormUpload(o, p, url);
                }
                var f = Lark.lib.Ajax.serializeForm(form);
                p = p ? (p + '&' + f) : f;
            }

            var hs = o.headers;
            if (this.defaultHeaders) {
                hs = Lark.extend(hs || {}, this.defaultHeaders);
                if (!o.headers) {
                    o.headers = hs;
                }
            }

            var cb = {
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: { options: o },
                timeout: o.timeout || this.timeout
            };

            var method = o.method || this.method || ((p || o.xmlData || o.jsonData) ? "POST" : "GET");

            if (method == 'GET' && (this.disableCaching && o.disableCaching !== false) || o.disableCaching === true) {
                var dcp = o.disableCachingParam || this.disableCachingParam;
                url += (url.indexOf('?') != -1 ? '&' : '?') + dcp + '=' + (new Date().getTime());
            }

            if (typeof o.autoAbort == 'boolean') { // options gets top priority
                if (o.autoAbort) {
                    this.abort();
                }
            } else if (this.autoAbort !== false) {
                this.abort();
            }
            if ((method == 'GET' || o.xmlData || o.jsonData) && p) {
                url += (url.indexOf('?') != -1 ? '&' : '?') + p;
                p = '';
            }
            this.transId = Lark.lib.Ajax.request(method, url, cb, p, o);
            return this.transId;
        } else {
            Lark.callback(o.callback, o.scope, [o, null, null]);
            return null;
        }
    },


    isLoading: function (transId) {
        if (transId) {
            return Lark.lib.Ajax.isCallInProgress(transId);
        } else {
            return this.transId ? true : false;
        }
    },


    abort: function (transId) {
        if (transId || this.isLoading()) {
            Lark.lib.Ajax.abort(transId || this.transId);
        }
    },

    // private
    handleResponse: function (response) {
        this.transId = false;
        var options = response.argument.options;
        response.argument = options ? options.argument : null;
        this.fireEvent("requestcomplete", this, response, options);
        Lark.callback(options.success, options.scope, [response, options]);
        Lark.callback(options.callback, options.scope, [options, true, response]);
    },

    // private
    handleFailure: function (response, e) {
        this.transId = false;
        var options = response.argument.options;
        response.argument = options ? options.argument : null;
        this.fireEvent("requestexception", this, response, options, e);
        Lark.callback(options.failure, options.scope, [response, options]);
        Lark.callback(options.callback, options.scope, [options, false, response]);
    },

    // private
    doFormUpload: function (o, ps, url) {
        var id = Lark.id();
        var frame = document.createElement('iframe');
        frame.id = id;
        frame.name = id;
        frame.style.display = 'none';
        //frame.className = 'x-hidden';
        if (Lark.isIE) {
            frame.src = Lark.SSL_SECURE_URL;
        }
        document.body.appendChild(frame);

        if (Lark.isIE) {
            document.frames[id].name = id;
        }

        var form = Lark.getDom(o.form);
        form.target = id;
        form.method = 'POST';
        form.enctype = form.encoding = 'multipart/form-data';
        if (url) {
            form.action = url;
        }

        var hiddens, hd;
        if (ps) { // add dynamic params
            hiddens = [];
            ps = Lark.urlDecode(ps, false);
            for (var k in ps) {
                if (ps.hasOwnProperty(k)) {
                    hd = document.createElement('input');
                    hd.type = 'hidden';
                    hd.name = k;
                    hd.value = ps[k];
                    form.appendChild(hd);
                    hiddens.push(hd);
                }
            }
        }

        function cb() {
            var r = {  // bogus response object
                responseText: '',
                responseXML: null
            };
            r.argument = o ? o.argument : null;

            try { //
                var doc;
                if (Lark.isIE) {
                    doc = frame.contentWindow.document;
                } else {
                    doc = (frame.contentDocument || window.frames[id].document);
                }
                if (doc && doc.body) {
                    r.responseText = doc.body.innerHTML;
                }
                if (doc && doc.XMLDocument) {
                    r.responseXML = doc.XMLDocument;
                } else {
                    r.responseXML = doc;
                }
            }
            catch (e) {
                // ignore
            }

            Lark.EventManager.removeListener(frame, 'load', cb, this);

            this.fireEvent("requestcomplete", this, r, o);

            Lark.callback(o.success, o.scope, [r, o]);
            Lark.callback(o.callback, o.scope, [o, true, r]);

            setTimeout(function () { Lark.removeNode(frame); }, 100);
        }

        Lark.EventManager.on(frame, 'load', cb, this);
        form.submit();

        if (hiddens) { // remove dynamic params
            for (var i = 0, len = hiddens.length; i < len; i++) {
                Lark.removeNode(hiddens[i]);
            }
        }
    }
});


Lark.Ajax = new Lark.Connection({

    autoAbort: false,

    serializeForm: function (form) {
        return Lark.lib.Ajax.serializeForm(form);
    }
});


Lark.UploadButton = Lark.extendClass(Lark.Observable, {
    /*对应的按钮*/
    btnDom: null,

    fileExts: null,

    isTemp: true,

    form: null,

    fileField: null,

    uploadSpan: null,

    inRange: false,

    fileName: "",

    fileFieldName: null,

    url: null,

    fnListenDocument: null,

    constructor: function (_cfg) {
        this.addEvents({
            "beforebrowse": true,
            "upload": true
        });
        Lark.extend(this, _cfg);
        if (this.fileExts == null) {
            this.fileExts = [];
        }

        Lark.UploadButton.superclass.constructor.call(this, _cfg);
        this.initUploadCtrl(_cfg);

    },

    disable: function () {
        this.fileField.disabled = true;
        Lark.UploadButton.superclass.disable.call(this);
    },

    enable: function () {
        this.fileField.disabled = false;
        Lark.UploadButton.superclass.enable.call(this);
    },

    handlerFileFieldChange: function () {

        if (this.fileField.value != "") {

            var indexTmp = this.fileField.value.lastIndexOf("\\");
            this.fileName = this.fileField.value.substr(indexTmp + 1);

            var fileExt = this.fileName.substr(this.fileName.lastIndexOf(".") + 1);
            if (this.fileExts != null && this.fileExts.length > 0) {
                if (this.fileExts.length > 0) {
                    if (this.fileExts.indexOf("*." + fileExt.toLowerCase()) >= 0) {

                        this.upload();
                    }
                    else {
                        navigator.notification.alert(String.format("Only upload the following file types:[{0}]", this.fileExts.join(",")));
                    }
                }
            }
            else {
                this.upload();
            }
        }


        this.fileField.outerHTML += "";

        this.fileField = this.form.childNodes[0];

        this.observeFilePropertyChange();
    },

    upload: function () {
        /*提交到指定的URL*/

        var binaryAjax = Lark.BinaryAjax; //new Lark.ServiceConnection();
        binaryAjax.setUploadForm(this.form);
        binaryAjax.invoke("", "UploadBinary", [this.isTemp],
            function (msg) {
                var retVal = msg.ReturnData;
                if (retVal.$ !== null) {
                    this.onUploadSuccess(retVal.$);
                }
                else {
                    this.onUploadFailure(msg);
                }
            },
            function (msg) {
            }, this);
    },

    onUploadSuccess: function (dataID) {

        this.setFileName(this.fileName);
        this.fireEvent("upload", dataID, this.fileName);
    },

    setFileName: function (_name) {
        this.fileName = _name;

        this.fileFieldName.value = _name;
    },

    onUploadFailure: function (_msg) {

        navigator.notification.alert(_msg.Summary);
    },

    handlerDocMouseMove: function (e) {
        var mouseX = window.event.clientX;
        var mouseY = window.event.clientY;
        if (!this.btnDom) return;

        var btnXY = jQuery(this.btnDom).offset();
        //debugger;
        var btnWidth = jQuery(this.btnDom).outerWidth();
        var btnHeight = jQuery(this.btnDom).outerHeight();
        if (mouseX >= btnXY.left && mouseY >= btnXY.top && mouseX <= btnXY.left + btnWidth && mouseY <= btnXY.top + btnHeight) {

            /*如果鼠标移动到按钮的区域内,并且被span挡住,则自动激发按钮的mouseover事件*/
            this.inRange = true;
            this.handlerButtonMouseOver(this, e);
        }
        else {
            /*如果鼠标移动到按钮的区域外,自动隐藏span*/
            this.inRange = false;
            this.handlerButtonMouseOut(this, e);
        }
    },

    handlerButtonMouseOver: function (_button, e) {
        /*添加对document 鼠标移动事件的监听*/
        if (this.btnDom.disabled == false && this.inRange) {
            this.uploadSpan.style.display = "";
            var width = this.uploadSpan.clientWidth;
            var height = this.uploadSpan.clientHeight;
            if (window.getComputedStyle) {
                var uploadStyle = window.getComputedStyle(this.uploadSpan, null);
                width = uploadStyle.width.replace('px', '');
                height = uploadStyle.height.replace('px', '');
                jQuery(this.uploadSpan).css({ left: e.clientX, top: e.clientY - height / 2 });
            }
            else {
                this.uploadSpan.style.left = e.clientX + 10 - width;
                this.uploadSpan.style.top = e.clientY - height / 2;
            }
        }
    },

    handlerButtonMouseOut: function (_button, e) {
        if (!this.inRange) {
            this.uploadSpan.style.display = "none";
            window.status = "";
        }
    },

    initUploadCtrl: function (_cfg) {
        var self = this;
        this.fileName = _cfg.fileName || "";

        this.url = ApplicationRoot + "wf.cmd";

        jQuery(document.body).append("<div style='position:absolute;filter:alpha(opacity:0);opacity:0;background-color:#ccc;z-index:99999;height:20px;'><form><input name='upload_file' xid='upload_file' type='file' style='margin-left:-50px!important;' size='1'/><input name='upload_file_name' xid='upload_file_name' type='hidden' value='" + this.fileName + "'/></form></div>");
        this.uploadSpan = document.body.childNodes[document.body.childNodes.length - 1];
        this.form = this.uploadSpan.childNodes[0];

        this.fileField = this.form.childNodes[0];

        this.fileFieldName = this.form.childNodes[1];

        this.fnListenDocument = this.handlerDocMouseMove.createDelegate(this);

        E.on(document, 'mousemove', this.fnListenDocument);

        this.observeFilePropertyChange();
    },

    observeFilePropertyChange: function () {

        if (document.attachEvent) {
            E.on(this.fileField, "propertychange", this.handlerFileFieldChange.createDelegate(this));
        }
        else {
            E.on(this.fileField, "change", this.handlerFileFieldChange.createDelegate(this));
        }
    }

});



if (!window.ActiveXObject) {
    Element.prototype.getInnerText = function () {
        if (jQuery.browser.msie) {
            return this.text;
        }
        else {
            return this.textContent;
        }
    }

    Element.prototype.setInnerText = function (txt) {
        if (jQuery.browser.msie) {
            this.text = txt;
        }
        else {
            this.textContent = txt;
        }
    }

    XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (xpath) {
        var x = this.selectNodes(xpath)
        if (!x || x.length < 1) return null;
        return x[0];
    }

    XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (xpath) {
        var xpe = new XPathEvaluator();
        var nsResolver = xpe.createNSResolver(this.ownerDocument == null ? this.documentElement : this.ownerDocument.documentElement);
        var result = xpe.evaluate(xpath, this, nsResolver, 0, null);
        var found = [];
        var res;
        while (res = result.iterateNext())
            found.push(res);
        return found;
    }
}

Lark.namespace("Lark.xml");

Lark.xml.XMLDoc = Lark.extendClass(Lark.Observable, {
    xmlDoc: null,

    constructor: function (xml) {
        this.addEvents("load");
        this.loadXML(xml);
        Lark.xml.XMLDoc.superclass.constructor.call(this, xml);
    },

    getRoot: function () {
        return this.xmlDoc.documentElement;
    },

    loadXML: function (xml) {
        try {
            var xmlDoc;
            // code for IE
            if (window.ActiveXObject) {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); //创建空的微软 XML 文档对象
                xmlDoc.loadXML(xml);
            }
            // code for Mozilla, Firefox, Opera, etc.
            else if (document.implementation && document.implementation.createDocument) {
                xmlDoc = document.implementation.createDocument("", "", null);
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(xml, "text/xml");
            } else {
                navigator.notification.alert('Your browser cannot handle this script');
            }
            //关闭异步加载，这样可确保在文档完整加载之前，解析器不会继续执行脚本
            xmlDoc.async = false;
            this.xmlDoc = xmlDoc;
            this.fireEvent("load", this.xmlDoc);
        }
        catch (ex) {
            alert(ex.message);
        }
    },

    selectNodes: function (xPath) {
        return this.xmlDoc.selectNodes(xPath);
    },

    selectSingleNode: function (path) {
        var ret = this.selectNodes(path);
        if (ret != null && ret.length > 0) {
            return ret[0];
        }

        return null;
    },

    createElement: function (parentNode, elementName, attributes) {
        var el = this.xmlDoc.createElement(elementName);
        parentNode.appendChild(el);
        if (attributes != undefined) {
            for (var att in attributes) {
                if (attributes[att].getDate) {
                    el.setAttribute(att, attributes[att].toTransportFormat());
                }
                else {
                    el.setAttribute(att, attributes[att]);
                }
            }
        }
        return el;
    },

    createNodeByXml: function (parentNode, xml) {
        var child = new Lark.xml.XMLDoc(xml).getRoot();
        parentNode.appendChild(child);
        return child;
    },

    setInnerXml: function (node, xml) {
        for (var index = node.childNodes.length - 1; index >= 0; index--) {
            node.removeChild(node.childNodes[index]);
        }
        this.createNodeByXml(node, xml);
    },

    setInnerText: function (node, txt) {
        if (jQuery.browser.msie) {
            node.text = txt;
        }
        else {
            node.textContent = txt;
        }
    },

    getInnerText: function (node) {
        if (jQuery.browser.msie) {
            return node.text;
        }
        else {
            return node.textContent;
        }
    },

    createCData: function (parentNode, data) {
        var el = this.xmlDoc.createCDATASection(((data === undefined || data === null) ? "" : data));
        parentNode.appendChild(el);
        return el;
    },

    transformNode: function (xslDoc) {
        if (null == this.xmlDoc) return "";
        if (null == xslDoc) return "";

        if (window.ActiveXObject)    // IE
        {
            return this.xmlDoc.transformNode(xslDoc);
        }
        else    // FireFox, Chrome
        {
            //定义XSLTProcesor对象
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xslDoc);
            // transformToDocument方式
            var result = xsltProcessor.transformToDocument(this.xmlDoc);
            var xmls = new XMLSerializer();
            var rt = xmls.serializeToString(result);
            return rt;
        }
    },

    toXml: function () {
        if (jQuery.browser.msie) {
            return this.xmlDoc.xml;
        }
        else {
            var xmls = new XMLSerializer();
            return xmls.serializeToString(this.xmlDoc);
        }
    }
});


Lark.DataType = Lark.extendClass(Lark.Observable, {
    getDataType: function (val) {
        if (val === null) return "null";

        if (typeof (val) == "string") {
            return "String";
        }
        else if (typeof (val) == "number") {
            if ((val + "").indexOf(".") >= 0) {
                return "Decimal";
            }
            else {
                return "Int"
            }
        }
        else if (typeof (val) == "boolean") {
            return "Bool";
        }
        else if (typeof (val) == "object") {
            if (val.constructor == Date) {
                return "DateTime";
            }
            else if (val.constructor == Array) {
                return "Array";
            }
            else if (val.constructor == Lark.DataTable) {
                return "DataTable";
            }
            else if (val.constructor == Lark.Resource) {
                return "Resource";
            }
            else {
                return "Dictionary";
            }
        }

        return "String";
    },

    parseValueXml: function (dataType, xmlNode) {

        if (dataType == "null" ||xmlNode.tagName.toLowerCase()=="null") {
            return null;
        }
        else if (dataType == "String") {
            return xmlNode.getInnerText ? xmlNode.getInnerText() : xmlNode.text;
        }
        else if (dataType == "Decimal") {
            return parseFloat(xmlNode.getInnerText ? xmlNode.getInnerText() : xmlNode.text);
        }
        else if (dataType == "Int") {
            return parseInt(xmlNode.getInnerText ? xmlNode.getInnerText() : xmlNode.text);
        }
        else if (dataType == "Bool") {
            return ((xmlNode.getInnerText ? xmlNode.getInnerText() : xmlNode.text).toLowerCase() == "true");
        }
        else if (dataType.toLowerCase() == "DateTime".toLowerCase()) {
            return Date.parseDate((xmlNode.getInnerText ? xmlNode.getInnerText() : xmlNode.text), "Y-m-d H:i:s");
        }
        else if (dataType == "Time") {
            return val;
        }
        else if (dataType == "Array") {
            var retVal = [];
            for (var itemIndex = 0; itemIndex < xmlNode.childNodes.length; itemIndex++) {

                var itemDataType = xmlNode.childNodes[itemIndex].nodeName;
                if (itemDataType[0] != "#") {
                    retVal.push(this.parseValueXml(itemDataType, xmlNode.childNodes[itemIndex]));
                }
            }
            return retVal;
        }
        else if (dataType == "Dictionary") {
            var retVal = {};
            for (var itemIndex = 0; itemIndex < xmlNode.childNodes.length; itemIndex++) {

                var itemDataType = xmlNode.childNodes[itemIndex].nodeName;
                if (itemDataType[0] != "#") {
                    var itemName = xmlNode.childNodes[itemIndex].getAttribute("Name");
                    retVal[itemName] = this.parseValueXml(itemDataType, xmlNode.childNodes[itemIndex]);
                }
            }
            return retVal;
        }
        else if (dataType == "DataTable") {
            var retVal = new Lark.DataTable({});
            retVal.parseXml(xmlNode);
            return retVal;
        }
        else if (dataType == "Resource") {
            var retVal = new Lark.Resource({});
            retVal.parseXml(xmlNode);
            return retVal;
        }
        else {
            return "[Object]";
        }
    },

    getValueXmlDoc: function (dataType, val) {
        if (val == null) dataType = "null";
        var xDoc = new Lark.xml.XMLDoc(String.format("<{0}></{0}>", dataType));
        var root = xDoc.getRoot();
        if (dataType == "null") {
        }
        else if (dataType == "String") {
            xDoc.setInnerText(root, val);
        }
        else if (dataType == "Decimal" || dataType == "Int") {
            xDoc.setInnerText(root, val + "");
        }
        else if (dataType == "Bool") {
            xDoc.setInnerText(root, (val ? "true" : "false"));
        }
        else if (dataType.toLowerCase() == "DateTime".toLowerCase()) {
            xDoc.setInnerText(root, (val.toTransportFormat()));
        }
        else if (dataType == "Time") {
            xDoc.setInnerText(root, val);
        }
        else if (dataType == "Array") {
            for (var itemIndex = 0; itemIndex < val.length; itemIndex++) {
                var itemDataType = this.getDataType(val[itemIndex]);
                var elItem = this.getValueXml(itemDataType, val[itemIndex]);
                root.appendChild(elItem);
            }
        }
        else if (dataType == "Dictionary") {
            for (var itemKey in val) {
                var itemDataType = this.getDataType(val[itemKey]);
                var elItem = this.getValueXml(itemDataType, val[itemKey]);
                elItem.setAttribute("Name", itemKey);
                root.appendChild(elItem);
            }
        }
        else if (dataType == "DataTable" || dataType == "Resource") {
            return new Lark.xml.XMLDoc(val.toXml());
        }
        else {
        }

        return xDoc;
    },

    getValueXml: function (dataType, val) {
        return this.getValueXmlDoc(dataType,val).getRoot();
    },

    getValueXmlString: function (dataType, val) {
        return this.getValueXmlDoc(dataType, val).toXml();
    },

    parseXmlString: function (xml) {
        var xDoc = new Lark.xml.XMLDoc(xml);
        var xmlNode=xDoc.getRoot();
        return this.parseValueXml(xmlNode.nodeName, xmlNode);
    }
});

Lark.Resource = Lark.extendClass(Lark.DataType, {
    ID: "",
    FileName: "",
    Data:"",
    constructor: function (config) {
        Lark.extend(this, config);
    },

    toXml: function () {
        var retVal = new Lark.xml.XMLDoc("<Resource></Resource>");
        var root = retVal.getRoot();
        root.setAttribute("ID", this.ID);
        root.setAttribute("FileName", this.FileName);

        return retVal.toXml();
    },

    parseXml: function (xmlNode) {
        this.ID = xmlNode.getAttribute("ID");
        this.FileName = xmlNode.getAttribute("FileName");
        this.Data=xmlNode.textContent;
    }
});

Lark.DataTable = Lark.extendClass(Lark.DataType, {
    pageSize: 0,
    pageIndex: 0,
    totalCount: 0,
    attributes: null,
    columns: null,
    data: null,

    constructor: function (cfg) {
        this.columns = cfg.columns != null ? cfg.columns : [];
        this.data = cfg.data != null ? cfg.data : [];
    },
    toJson:function()
    {

        var onerow={};
        var result=[];

        for (var indexrow = 0; indexrow < this.getCount(); indexrow++) {
            for (var indexcol = 0; indexcol < this.columns.length; indexcol++) {
                var key = this.columns[indexcol].Name
                onerow[key]= this.getRow(indexrow)[indexcol]
            }
            result.push(onerow);
            onerow = {};
        }


        return result;
    },
    add: function (rowJson) {
        var rowData = [];
        var fieldIndex = 0;
        for (var index = 0; index < this.columns.length; index++) {
            rowData.push(null);
        }

        for (var colIndex in rowJson) {
            var fieldValue = rowJson[colIndex];
            var fieldIndex = this.getFieldIndex(colIndex);

            rowData[fieldIndex] = fieldValue;
        }
        this.data.push(rowData);
    },

    getRow: function (rowIndex) {
        if (rowIndex >= this.getCount()) throw "行索引超出限制";
        return this.data[rowIndex];
    },

    getFieldIndex: function (fieldName) {
        var realIndex = -1;
        for (var index = 0; index < this.columns.length; index++) {
            if (this.columns[index].Name == fieldName) {
                realIndex = index;
                break;
            }
        }
        return realIndex;
    },

    getFieldValue: function (rowIndex, fieldIndex) {
        var row = this.getRow(rowIndex);

        if (isNaN(fieldIndex)) {
            var realIndex = -1;
            for (var index = 0; index < this.columns.length; index++) {
                if (this.columns[index].Name == fieldIndex) {
                    realIndex = index;
                    break;
                }
            }
            if (realIndex >= 0) {
                return row[realIndex];
            }
            else {
                return null;
            }
        }
        else {
            if (fieldIndex >= this.columns.length) {
                throw "列索引超出限制";
            }
            return row[fieldIndex];
        }

    },

    getAttributes: function () {
        return this.attributes;
    },

    getCount: function () {
        return (this.data == null ? 0 : this.data.length);
    },

    getTotalCount: function () {
        return (this.totalCount == 0 ? this.data.length : this.totalCount);
    },

    getPageSize: function () {
        return this.pageSize;
    },

    getPageIndex: function () {
        return this.pageIndex;
    },

    toXml: function () {
        var xDoc = new Lark.xml.XMLDoc("<DataTable PageSize=\"" + this.pageSize + "\" PageIndex=\"" + this.pageIndex + "\" TotalCount=\"" + this.totalCount + "\"><Attributes></Attributes><Columns></Columns><Rows></Rows></DataTable>");
        var elAttributes = xDoc.selectSingleNode("//Attributes");
        if (this.attributes != null) {
            for (var key in this.attributes) {
                var elValue = this.getValueXml(this.getDataType(this.attributes[key]), this.attributes[key]);
                elValue.setAttribute("Name", key);
                elAttributes.appendChild(elValue);
            }
        }

        var elColumns = xDoc.selectSingleNode("//Columns");
        for (var index = 0; index < this.columns.length; index++) {
            var elColumn = xDoc.createElement(elColumns, "Column", this.columns[index]);
        }

        var elRows = xDoc.selectSingleNode("//Rows");
        for (var rowIndex = 0; rowIndex < this.data.length; rowIndex++) {
            var elRow = xDoc.createElement(elRows, "Row");

            for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
                var elValue = this.getValueXml(this.columns[colIndex].DataType, this.data[rowIndex][colIndex]);
                elValue.setAttribute("Name", this.columns[colIndex].Name);
                elRow.appendChild(elValue);
            }
        }

        return xDoc.toXml();
    },

    parseXml: function (xmlNode) {
        try {
            this.pageIndex = xmlNode.getAttribute("PageIndex") != null ? parseInt(xmlNode.getAttribute("PageIndex")) : 0;
            this.pageSize = xmlNode.getAttribute("PageSize") != null ? parseInt(xmlNode.getAttribute("PageSize")) : 0;
            this.totalCount = xmlNode.getAttribute("TotalCount") != null ? parseInt(xmlNode.getAttribute("TotalCount")) : 0;

            var elAttributes = xmlNode.selectSingleNode("Attributes");
            this.attributes = {};
            if (elAttributes != null) {
                for (var index = 0; index < elAttributes.childNodes.length; index++) {
                    if (elAttributes.childNodes[index].nodeName.indexOf("#") < 0) {
                        var fieldName = elAttributes.childNodes[index].getAttribute("Name");
                        var fieldValue = this.parseValueXml(elAttributes.childNodes[index].nodeName, elAttributes.childNodes[index]);
                        this.attributes[fieldName] = fieldValue;
                    }
                }
            }

            var elColumns = xmlNode.selectSingleNode("Columns");
            this.columns = [];
            for (var index = 0; index < elColumns.childNodes.length; index++) {
                if (elColumns.childNodes[index].nodeName == "Column") {
                    this.columns.push({
                        Name: elColumns.childNodes[index].getAttribute("Name"),
                        DataType: elColumns.childNodes[index].getAttribute("DataType")
                    });
                }
            }

            this.data = [];
            var elRows = xmlNode.selectSingleNode("Rows");
            for (var rowIndex = 0; rowIndex < elRows.childNodes.length; rowIndex++) {
                var elRow = elRows.childNodes[rowIndex];
                if (elRow.nodeName == "Row") {
                    var rowData = [];
                    var fieldIndex = 0;
                    for (var colIndex = 0; colIndex < elRow.childNodes.length; colIndex++) {
                        if (elRow.childNodes[colIndex].nodeName.indexOf("#") < 0) {
                            var fieldValue = this.parseValueXml(this.columns[fieldIndex].DataType, elRow.childNodes[colIndex]);
                            rowData.push(fieldValue);
                            fieldIndex++;
                        }
                    }
                    this.data.push(rowData);
                }
            }
        }
        catch (ex) {
            alert(ex.message);
        }
    },

    parseXmlString: function (xml) {
        var xDoc = new Lark.xml.XMLDoc(xml);

        this.parseXml(xDoc.getRoot());
    }
});

Lark.MessageBase = Lark.extendClass(Lark.DataType, {

});

Lark.InvokeServiceMessage = Lark.extendClass(Lark.MessageBase, {
    ID: "",
    MessageType: "InvokeServiceMessage",
    Service: "",
    Method: "",
    UserCode: "",
    LoginUserCode: "",
    TokenID: "",
    Language: "Chinese",
    ClientType:'',
    ShellPlatform: '',
    URL:'',
    StartHandlerIndex:0,

    Parameters: null,

    constructor: function (config) {
        Lark.InvokeServiceMessage.superclass.constructor.call(this, config);
        Lark.extend(this, config);
        if (this.Parameters == null) {
            this.Parameters = [];
        }
    },

    toXml: function () {
        var xDoc = new Lark.xml.XMLDoc("<Message></Message>");
        var root = xDoc.getRoot();
        root.setAttribute("ID", this.ID);
        root.setAttribute("MessageType", this.MessageType);
        root.setAttribute("Service", (this.Service === null ? "" : this.Service));
        root.setAttribute("Method", this.Method);
        root.setAttribute("Language", (this.Language === null ? "Chinese" : this.Language));
        root.setAttribute("UserCode", (this.UserCode === null ? "" : this.UserCode));
        root.setAttribute("LoginUserCode", (this.LoginUserCode === null ? "" : this.LoginUserCode));
        root.setAttribute("TokenID", (this.TokenID === null ? "" : this.TokenID));
        root.setAttribute("ClientType", (this.ClientType === null ? "Web" : this.ClientType));
        root.setAttribute("ShellPlatform", (this.ShellPlatform === null ? "Browser" : this.ShellPlatform));
        root.setAttribute("URL", (this.URL === null ? "" : this.URL));
        root.setAttribute("StartHandlerIndex", this.StartHandlerIndex);

        var elParameters = xDoc.createElement(root, "Parameters");
        for (var index = 0; this.Parameters != null && index < this.Parameters.length; index++) {
            var dataType = this.getDataType(this.Parameters[index]);
            elParameters.appendChild(this.getValueXml(dataType, this.Parameters[index]));
        }

        return xDoc.toXml();
    }

});

Lark.ErrorInfo = function (errorCode, errorSummary, innerError) {
    this.ErrorCode = errorCode;
    this.Summary = errorSummary;
    this.InnerError = (innerError ? innerError : null);
};

Lark.ErrorInfo.prototype.parse = function (xmlNode) {
    var errorCode = xmlNode.getAttribute("ErrorCode");
    var summary = xmlNode.getAttribute("Summary");

    this.ErrorCode = errorCode;
    this.Summary = summary;
    if (xmlNode.childNodes.length > 0) {
        this.InnerError = new Lark.ErrorInfo();
        this.InnerError.parse(xmlNode.childNodes[0]);
    }
};

Lark.ErrorInfo.prototype.toString = function () {
    var retVal = [];
    retVal.push(String.format("错误编码:\n{0}\n 错误详情:\n{1}\n", this.ErrorCode, this.Summary));
    if (this.InnerError != null) {
        retVal.push("----------------------------\n");
        retVal.push(this.InnerError.toString());
    }
    return retVal.join("");
};

Lark.ErrorInfo.prototype.getLastDesc = function () {
    var retVal = this.Summary;
    if (this.InnerError != null) {
        retVal = this.InnerError.getLastDesc();
    }
    return retVal;
};

Lark.InvokeResultMessage = Lark.extendClass(Lark.MessageBase, {
    ID: "",
    RequestTime:null,
    MessageType: "InvokeResultMessage",
    ReturnData: null,

    constructor: function (config) {
        this.ReturnData = {};
        Lark.InvokeResultMessage.superclass.constructor.call(this, config);
        Lark.extend(this, config);
    },

    parseXml: function (xmlData) {
        var xdoc = new Lark.xml.XMLDoc(xmlData);

        var root = xdoc.getRoot();
        this.ID = root.getAttribute("ID");
        this.RequestTime =Date.parseDate(root.getAttribute("RequestTime"),"Y-m-d H:i:s");

        var returnDataNodes = root.selectSingleNode("//ReturnData").childNodes;
        for (var index = 0; returnDataNodes != null && index < returnDataNodes.length; index++) {
            try {
                if (returnDataNodes[index].nodeName[0]!="#") {
                    var varName = returnDataNodes[index].getAttribute("Name");
                    var dataType = returnDataNodes[index].nodeName;
                    this.ReturnData[varName] = this.parseValueXml(dataType, returnDataNodes[index]);
                }
            }
            catch (e) {
                console.log("Parse parseXml failed:");
                console.log(e);
             }
        }
    }
});

Lark.InvokeResultException = Lark.extendClass(Lark.Observable, {
    ID: "",
    MessageType: "InvokeResultException",
    Level: 1,
    NextHandlerIndex:0,
    Summary: "",
    Description: "",

    constructor: function (config) {
        Lark.InvokeResultException.superclass.constructor.call(this, config);
        Lark.extend(this, config);
    },

    parseXml: function (xmlData) {
        var xdoc = new Lark.xml.XMLDoc(xmlData);
        var root = xdoc.getRoot();

        this.ID = root.getAttribute("ID");
        this.Level = parseInt(root.getAttribute("Level"));
        this.Summary = root.getAttribute("Summary");
        this.Description = root.text;

        if(root.getAttribute("NextHandlerIndex")!=null){
            this.NextHandlerIndex = parseInt(root.getAttribute("NextHandlerIndex"));
        }
    }

});

Lark.MessageSet = Lark.extendClass(Lark.Observable, {
    constructor: function (config) {
        Lark.MessageSet.superclass.constructor.call(this, config);
        Lark.extend(this, config);
    },

    parseXml: function (xmlData) {
        var retVal = [];

        var xdoc = Lark.xmlDecode(xmlData);

        var returnMsgNodes = xdoc.documentElement.selectNodes("//Message");
        for (var nodeIndex = 0; nodeIndex < returnMsgNodes.length; nodeIndex++) {
            var retNodeTmp = returnMsgNodes[nodeIndex];
            var messageType = retNodeTmp.getAttribute("MessageType");
            switch (messageType) {
                case "InvokeResultException":
                    var exceptionMsg = new Lark.InvokeResultException();
                    exceptionMsg.parseXml(retNodeTmp.xml);
                    retVal.push(exceptionMsg);
                    break;
                case "InvokeResultMessage":
                    var resultMsg = new Lark.InvokeResultMessage();
                    resultMsg.parseXml(retNodeTmp.xml);
                    retVal.push(resultMsg);
                    break;
            }
        }

        return retVal;
    }

});


Lark.ServiceConnection = Lark.extendClass(Lark.Observable, {
    autoAbort: false,
    isUpload: false,
    uploadForm: null,
    tokenID: '',
    logToFile: false,
    url: '',
    currentRoute:'',
    ClientType:'',
    ShellPlatform: '',
    Language: '',
    UserCode: '',
    LoginUserCode: '',

    constructor: function (config) {
        Lark.ServiceConnection.superclass.constructor.call(this, config);
        Lark.extend(this, config);
    },

    setTokenID: function (tokenID) {
        this.tokenID = tokenID;
    },

    setHost: function (host) {
        this.url = host;

    },

    setInvokeAttr: function(obj) {
      this.ClientType = typeof obj.ClientType == 'undefined' ? this.ClientType : obj.ClientType
      this.ShellPlatform = typeof obj.ShellPlatform == 'undefined' ? this.ShellPlatform : obj.ShellPlatform
      this.UserCode = typeof obj.UserCode == 'undefined' ? this.UserCode : obj.UserCode
      this.LoginUserCode = typeof obj.LoginUserCode == 'undefined' ? this.LoginUserCode : obj.LoginUserCode
      this.Language = typeof obj.Language == 'undefined' ? this.Language : obj.Language
      this.url = typeof obj.url == 'undefined' ? this.url : obj.url
    },

    getHost: function () {
        if (this.url != null && this.url.length > 0 && this.url.substring(this.url.length - 1) == "/") {
            return this.url;
        }
        else {
            return this.url + "/";
        }
    },

    setUploadForm: function (form) {
        this.uploadForm = form;
        this.isUpload = (form != null);
    },

    downloadResource: function (dataID, timeout) {
        var self = this;
        var msg = new Lark.InvokeServiceMessage({
            ID: 'msg1',
            Service: "CommonBinary",
            Method: "DownloadBinary",
            URL:this.currentRoute,
            Language: this.Language || "Chinese",
            UserCode: this.UserCode,
            LoginUserCode: this.LoginUserCode,
            ClientType: this.ClientType || 'Web',
            ShellPlatform: this.ShellPlatform || 'Browser',
            Parameters: [dataID]
        });
        var msgXml = msg.toXml();
        var tokenID = self.tokenID;
        var msgHash = hex_md5(escape(msgXml) + tokenID);

        jQuery(document.body).append("<div style='position:absolute;filter:alpha(opacity:0);opacity:0;background-color:#ccc;z-index:99999;height:0px;'><form></form></div>");
        var tmpDiv = document.body.childNodes[document.body.childNodes.length - 1];
        var form = tmpDiv.childNodes[0];

        var oriTimout = Lark.Ajax.timeout;
        if (!timeout) {
            Lark.Ajax.timeout = 60000000;
        }
        else {
            Lark.Ajax.timeout = timeout;
        }

        return Lark.Ajax.request({
            url: this.getHost() + 'Handlers/MobileHandler.ashx?MessageHash=' + msgHash,
            isUpload: true,
            useDefaultXhrHeader: false,
            form: form,
            success: function (response, option) {
                Lark.Ajax.timeout = oriTimout;
                var serverResult = (response.responseXML == null) ? "<xml></xml>" : (response.responseXML.xml == null ? (new XMLSerializer()).serializeToString(response.responseXML) : response.responseXML.xml);
                var xdoc = new Lark.xml.XMLDoc(serverResult);
                var returnMsgNodes = xdoc.selectNodes("//Message");
                for (var nodeIndex = 0; nodeIndex < returnMsgNodes.length; nodeIndex++) {
                    var retNodeTmp = returnMsgNodes[nodeIndex];
                    var messageType = retNodeTmp.getAttribute("MessageType");
                    switch (messageType) {
                        case "ExceptionMessage":
                            var exceptionMsg = new Lark.InvokeResultException();
                            exceptionMsg.parseXml(retNodeTmp.xml == null ? (new XMLSerializer()).serializeToString(retNodeTmp) : retNodeTmp.xml);

                            if (failureFn != null) {
                                failureFn.call(this, exceptionMsg);
                            }

                            break;
                        case "InvokeResultMessage":
                            var resultMsg = new Lark.InvokeResultMessage();
                            resultMsg.parseXml(retNodeTmp.xml == null ? (new XMLSerializer()).serializeToString(retNodeTmp) : retNodeTmp.xml);

                            if (successFn) {
                                successFn.call(this, resultMsg);
                            }

                            break;
                    }
                }
            },
            failure: function (response, option) {
                /*网络传输异常*/
                Lark.Ajax.timeout = oriTimout;
                var exceptionMsg = new Lark.InvokeResultException();
                exceptionMsg.Summary = response.statusText;
                exceptionMsg.Description = response.responseText;
                if (failureFn != null) {
                    failureFn.call(this, exceptionMsg);
                }
            },
            params: { MessageSet: msg.toXml(), MessageHash: msgHash },
            scope: this
        });
    },

    abort: function () {
        return Lark.Ajax.abort();
    },

    invoke: function (service, method, invokeParams, successFn, failureFn, scope, timeout,startHandlerIndex) {
        var self = this;
        var me = this;

        var msg = new Lark.InvokeServiceMessage({
            ID: 'msg1',
            Service: service,
            Method: method,
            Parameters: invokeParams,
            UserCode: this.UserCode,
            LoginUserCode: this.LoginUserCode,
            Language: this.Language || "Chinese",
            ClientType: this.ClientType || 'Web',
            ShellPlatform: this.ShellPlatform || 'Browser',
            URL:this.currentRoute,
            StartHandlerIndex:(startHandlerIndex?startHandlerIndex:0)
        });



        var msgXml = msg.toXml();
        var tokenID = self.tokenID;
        var hashSource = escape(msgXml) + tokenID;
        var msgHash = hex_md5(hashSource);

        var oriTimout = Lark.Ajax.timeout;
        if (!timeout) {
            Lark.Ajax.timeout = 6000000;
        }
        else {
            Lark.Ajax.timeout = timeout;
        }

        var retVal = Lark.Ajax.request({
            url: this.getHost() + 'Handlers/MobileHandler.ashx?MessageHash=' + msgHash,
            useDefaultXhrHeader: false,
            isUpload: this.isUpload,
            form: this.uploadForm,
            success: function (response, option) {

                var serverResult = (response.responseXML == null) ? "<xml></xml>" : (response.responseXML.xml == null ? (new XMLSerializer()).serializeToString(response.responseXML) : response.responseXML.xml);
                var xdoc = new Lark.xml.XMLDoc(serverResult);

                var returnMsgNodes = xdoc.selectNodes("//Message");
                for (var nodeIndex = 0; nodeIndex < returnMsgNodes.length; nodeIndex++) {
                    var retNodeTmp = returnMsgNodes[nodeIndex];
                    var messageType = retNodeTmp.getAttribute("MessageType");
                    switch (messageType) {
                        case "ExceptionMessage":
                            var exceptionMsg = new Lark.InvokeResultException();
                            exceptionMsg.parseXml(retNodeTmp.xml == null ? (new XMLSerializer()).serializeToString(retNodeTmp) : retNodeTmp.xml);

                            if (failureFn != null) {
                                failureFn.call(this, exceptionMsg);
                            }

                            break;
                        case "InvokeResultMessage":
                            var resultMsg = new Lark.InvokeResultMessage();

                            resultMsg.parseXml(retNodeTmp.xml == null ? (new XMLSerializer()).serializeToString(retNodeTmp) : retNodeTmp.xml);

                            if (successFn) {
                                successFn.call(this, resultMsg);
                            }

                            break;
                    }
                }
            },
            failure: function (response, option) {
                /*网络传输异常*/
                var exceptionMsg = new Lark.InvokeResultException();
                exceptionMsg.Level = 99;
                exceptionMsg.Summary = response.statusText;
                exceptionMsg.Description = response.responseText;
                if (failureFn != null) {
                    failureFn.call(this, exceptionMsg);
                }
            },
            params: (this.uploadForm ? { MessageSet: msgXml, MessageHash: msgHash} : null),
            xmlData: msg.toXml(),
            scope: scope || this
        });

        if (typeof (window.requestFileSystem) != 'undefined' && me.logToFile) {
            var messageName = (new Date()).dateFormat('YmdHis') + '.xml';
            var msgPath = "PlatinumMobile/" + messageName;
            console.log('开始缓存Messsage：' + msgPath);
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                    Ext.bind(function (fileSystem) {
                        console.log('获取文件系统成功');
                        me.makesureDirectoryCreated(0, fileSystem, msgPath, Ext.bind(function () {
                            console.log('文件目录确保创建完成!');
                            console.log(fileSystem);
                            me.writerFormFile(fileSystem, msgPath, hashSource, function () { console.log('缓存Message文件完成') });
                        }, me));

                    }, me),
                    function () {
                        console.log('加载文件系统失败!');
                    });
        }

        return retVal;
    },

    writerFormFile: function (fileSytem, formPath, formDefinition, successFn) {
        var me = this;
        console.log('开始获取/创建文件:' + formPath);
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            Ext.bind(function (fileSystem) {
                fileSystem.root.getFile(formPath, { create: true },
                Ext.bind(function (fileEntry) {
                    console.log('开始写入缓存文件');
                    fileEntry.createWriter(Ext.bind(function (writer) {
                        writer.write(formDefinition);
                        if (successFn != null) successFn.call(me);
                    }, me), function () {
                        console.log('缓存表单文件失败!');
                    });
                }, me), function () {
                    console.log('获取表单文件失败!');
                });
            }, me),
             function () {
                 console.log('加载文件系统失败!');
             });

    },

    makesureDirectoryCreated: function (toIndex, fileSystem, filePath, successFn) {
        var me = this;
        var pathFolders = filePath.split('/');

        if (toIndex <= pathFolders.length - 2) {
            var tempFolder = "";
            for (var index = 0; index < pathFolders.length - 1 && index <= toIndex; index++) {
                if (tempFolder != "") tempFolder += "/";
                tempFolder += pathFolders[index];
            }

            console.log('开始获取/创建目录:' + tempFolder);
            fileSystem.root.getDirectory(tempFolder, { create: true },
                                Ext.bind(function (fileEntry) {
                                    console.log(String.format("获取/创建目录[{0}]成功!", tempFolder));
                                    console.log(String.format("当前Index：{0}，文件夹长度:{1}", index, pathFolders.length));

                                    me.makesureDirectoryCreated(toIndex + 1, fileSystem, filePath, successFn);
                                }, me),
                                function () { console.log(String.format("获取/创建目录[{0}]失败", tempFolder)); });
        }
        else {
            if (successFn != null) successFn.call(me);
        }

    }
});

Lark.ServiceAjax = new Lark.ServiceConnection();
Lark.BinaryAjax = new Lark.ServiceConnection();
if (Lark.ServiceAjax.url) {
    Lark.ServiceAjax.setHost(Lark.ServiceAjax.url);
}


/*
  XPath.js, an JavaScript implementation of XML Path Language (XPath) Version 1.0
  Copyright (C) 2008 Henrik Lindqvist <henrik.lindqvist@llamalab.com>

  This library is free software: you can redistribute it and/or modify
  it under the terms of the GNU Lesser General Public License as published
  by the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * JavaScript implementation of XML Path Language (XPath) Version 1.0
 * @file XPath.js
 * @version 0.6
 */
(function (w, f) {

function XPath (e) {
  this.e = e;
  this.i = 0;
  this.js = [ 'with(XPath){return ', '}' ];
  this.expression(1, 1) || this.error();
  //console.log(this.js.join(''));
  return new Function('n', 'nsr', this.js.join(''));
}
XPath.ie = /MSIE/.test(navigator.userAgent);
XPath.prototype = {
  match : function (rx, x) {
   var m, r;
    if (   !(m = rx.exec(this.e.substr(this.i)))
        || (typeof x == 'number' && !(r = m[x]))
        || (typeof x == 'object' && !(r = x[m[1]]))) return false;
    this.m = m;
    this.i += m[0].length;
    return r || m;
  },
  error : function (m) {
    m = (m || 'Syntax error')+' at index '+this.i+': '+this.e.substr(this.i);
    var e;
    try { e = new XPathException(51, m) }
    catch (x) { e = new Error(m) }
    throw e;
  },
  step : function (l, r, s, n) {
    var i = 3;
    if (this.match(/^(\/\/?|\.\.?|@)\s*/, 1)) {
      switch (this.m[1]) {
        case '/':
          if (s) this.error();
          if (!n) return this.step(l, r, 1);
          this.js.splice(l, 0, ' axis(axes["','document-root','"],');
          i += this.nodeTypes.node.call(this, l + i);
          s = 1;
          break;
        case '//':
          if (s) this.error();
          this.js.splice(l, 0, ' axis(axes["','descendant-or-self','"],');
          i += this.nodeTypes.node.call(this, l + i);
          s = 1;
          break;
        case '.':
          if (!s && !n) this.error();
          this.js.splice(l, 0, ' axis(axes["','self','"],');
          i += this.nodeTypes.node.call(this, l + i);
          s = 0;
          break;
        case '..':
          if (!s && !n) this.error();
          this.js.splice(l, 0, ' axis(axes["','parent','"],');
          i += this.nodeTypes.node.call(this, l + i);
          s = 0;
          break;
        case '@':
          if (!s && !n) this.error();
          this.js.splice(l, 0, ' axis(axes["','attribute','"],');
          i += this.nodeTest(l + i, 'node') || this.error('Missing nodeTest after @');
          s = 0;
      }
    }
    else if (!s && !n) return s ? this.error() : 0;
    else if (this.match(/^([a-z]+(?:-[a-z]+)*)\s*::\s*/, XPath.axes)) {
      this.js.splice(l, 0, ' axis(axes["',this.m[1],'"],');
      i += this.nodeTest(l + i, (this.m[1]=='attribute')?'node':'element') || this.error('Missing nodeTest after ::');
      s = 0;
    }
    else if (i = this.nodeTest(l, 'element')) {
      this.js.splice(l, 0, ' axis(axes["','child','"],');
      i += 3;
      s = 0;
    }
    else return 0;
    for (var j; j = this.predicate(l + i); i += j);
    if (n) this.js.splice(r + i++, 0, n);
    i += this.step(l, r + i, s);
    this.js.splice(r + i++, 0, ')');
    return i;
  },
  expression : function (l, r, p) {
    var o, i = this.operand(l);
    while (o = this.match(/^(or|and|!?=|[<>]=?|[|*+-]|div|mod)\s*/, this.operators)) {
      if (p && p[0] >= o[0]) {
        this.i -= this.m[0].length;
        break;
      }
      this.js.splice(l, 0, o[1]);
      i++;
      this.js.splice(l + i++, 0, o[2]);
      i += this.expression(l + i, r, o) || this.error('Missing operand');
      this.js.splice(l + i++, 0, o[3]);
    }
    return i;
  },
  operand : function (l) {
    if (this.match(/^(-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)|"[^"]*"|'[^']*')\s*/, 1)) {
      this.js.splice(l, 0, this.m[1]);
      return 1;
    }
    var fn;
    if (fn = this.match(/^([a-z]+(?:-[a-z]+)*)\s*\(\s*/, this.functions)) {
      var i = 1, j;
      this.js.splice(l, 0, fn[1]);
      do {
        if (j) this.js.splice(l + i++, 0, ',');
        i += (j = this.expression(l + i, l + i));
      } while (j && this.match(/^,\s*/));
      this.match(/^\)\s*/) || this.error('Missing (');
      if (fn[0]) {
        if (j) this.js.splice(l + i++, 0, ',');
        this.js.splice(l + i++, 0, fn[0]);
      }
      if (fn[2]) this.js.splice(l + i++, 0, fn[2]);
      else if (j > 1) this.error('Function has arguments');
      i += this.step(l, l + i);
      return i;
    }
    if (this.match(/^\(\s*/)) {
      var i = 1;
      this.js.splice(l, 0, '(');
      i += this.expression(l + i, l + i);
      this.match(/^\)\s*/) || this.error('Missing )');
      this.js.splice(l + i++, ')');
      return i;
    }
    return this.step(l, l, 0, '[n]');
  },
  operators : {
    '|'   : [1,'union(',',',')'],
    'or'  : [1,'bool(',')||bool(',')'],
    'and' : [2,'bool(',')&&bool(',')'],
    '='   : [3,'compare(eq,',',',')'],
    '!='  : [3,'compare(ne,',',',')'],
    '<'   : [4,'compare(lt,',',',')'],
    '>'   : [4,'compare(gt,',',',')'],
    '<='  : [4,'compare(le,',',',')'],
    '>='  : [4,'compare(ge,',',',')'],
    '+'   : [5,'number(',')+number(',')'],
    '-'   : [5,'number(',')-number(',')'],
    '*'   : [6,'number(',')*number(',')'],
    'div' : [6,'number(',')/number(',')'],
    'mod' : [6,'number(',')%number(',')']
  },
  functions : {
    // Node Set
    'last'          : [0,'nl.length'],
    'position'      : [0,'(i+1)'],
    'count'         : ['nl','(','.length||0)'],
    'id'            : ['n','id(',')'],
    'local-name'    : ['nl','localName(',')'],
    'namespace-uri' : ['nl','namespaceURI(',')'],
    'name'          : ['nl','qName(',')'],
    // String
    'string'           : ['n','string(',')'],
    'concat'           : [0,'concat(',')'],
    'starts-with'      : [0,'startsWith(',')'],
    'contains'         : [0,'contains(',')'],
    'substring-before' : [0,'substringBefore(',')'],
    'substring-after'  : [0,'substringAfter(',')'],
    'substring'        : [0,'substring(',')'],
    'string-length'    : ['n','string(',').length'],
    'normalize-space'  : ['n','normalizeSpace(',')'],
    'translate'        : [0,'translate(',')'],
    // Boolean
    'boolean' : [0,'bool(',')'],
    'not'     : [0,'!bool(',')'],
    'true'    : [0,'true '],
    'false'   : [0,'false '],
//    'lang'    : [],
    // Number
    'number'  : ['n','number(',')'],
    'floor'   : [0,'Math.floor(number(','))'],
    'ceiling' : [0,'Math.ceil(number(','))'],
    'round'   : [0,'Math.round(number(','))'],
    'sum'     : [0,'sum(',')']
  },
  predicate : function (l) {
    var i = 0;
    if (this.match(/^\[\s*/)) {
      if (i = this.expression(l, l)) {
        this.js.splice(l, 0, 'function(n,i,nl){with(XPath){var r=');
        i++;
        this.js.splice(l + i++, 0, ';return typeof r=="number"?Math.round(r)==i+1:bool(r)}},');
      }
      this.match(/^\]\s*/) || this.error('Missing ]');
    }
    return i;
  },
  nodeTest : function (l, t) {
    var fn;
    if (fn = this.match(/^([a-z]+(?:-[a-z]+)*)\(([^)]*)\)\s*/, this.nodeTypes))
      return fn.call(this, l, this.m[2]);
    if (this.match(/^\*\s*/))
      return this.nodeTypes[t].call(this, l);
    return this.nodeName(l)
  },
  nodeType : function (l, t) {
    this.js.splice(l, 0, 'function(n){return n.nodeType==',t,'},');
    return 3;
  },
  nodeTypes : {
    'node' : function (l) {
      this.js.splice(l, 0, 'null,');
      return 1;
    },
    'element' : function (l) {
      return this.nodeType(l, 1);
    },
    'attribute' : function (l) {
      return this.nodeType(l, 2);
    },
    'text' : function (l) {
      return this.nodeType(l, 3);
    },
    'processing-instruction' : function (l, t) {
      if (!t) return this.nodeType(l, 7);
      this.js.splice(l, 0, 'function(n){return n.nodeType==7&&n.target==',t,'},');
      return 3;
    },
    'comment' : function (l) {
      return this.nodeType(l, 8);
    }
  },
  nodeName : function (l) {
    if (!this.match(/^([a-zA-Z_]+(?:-?[a-zA-Z0-9]+)*)(?::([a-zA-Z_]+(?:-?[a-zA-Z0-9]+)*))?\s*/, 1))
      return 0;
    if (this.m[2]) {
      this.js.splice(l,0,'function(n){if(!nsr)throw new XPathException(14);return "',
        this.m[2],'"==',XPath.ie?'n.baseName':'n.localName','&&nsr.lookupNamespaceURI("',
        this.m[1],'")==n.namespaceURI},');
      return 7;
    }
    else {
      this.js.splice(l,0,'function(n){return/^',this.m[1],'$/i.test(n.nodeName)},');
      return 3;
    }
  }
};
XPath.order = function (l, r) {
  var x = l.compareDocumentPosition
        ? l.compareDocumentPosition(r)
        : XPath.compareDocumentPosition.call(l, r);
  if (x & 32) {
    l = Array.prototype.indexOf.call(l.attributes, l);
    r = Array.prototype.indexOf.call(r.attributes, r);
    return (l < r) ? -1 : (l > r) ? 1 : 0;
  }
  if (!x) {
    if (l == r)
      return 0;
    if ((l = l.ownerElement) && (r = r.ownerElement))
      return XPath.order(l, r);
    return XPath.ie ? 1 : 0;
  }
  return 3 - ((x & 6) || 3);
};
// Runtime - Operand
XPath.compare = function (fn, l, r) {
  if (l instanceof Array && r instanceof Array) {
    var ls = l.map(this.string), rs = r.map(this.string);
    for (l = ls.length; --l >= 0;)
      for (r = rs.length; --r >= 0;)
        if (!fn(ls[l], rs[r])) return false;
    return true;
  }
  if (l instanceof Array) {
    for (var i = l.length; --i >= 0;)
      if (!fn(this[typeof r](l[i]), r)) return false;
    return l.length > 0;
  }
  if (r instanceof Array) {
    for (var i = r.length; --i >= 0;)
      if (!fn(l, this[typeof l](r[i]))) return false;
    return r.length > 0;
  }
  if (typeof l == 'boolean' || typeof r == 'boolean')
    return fn(this.bool(l), this.bool(r));
  if (typeof l == 'number' || typeof r == 'number')
    return fn(this.number(l), this.number(r));
  return fn(this.string(l), this.string(r));
};
XPath.eq = function (l, r) { return l == r };
XPath.ne = function (l, r) { return l != r };
XPath.lt = function (l, r) { return l <  r };
XPath.gt = function (l, r) { return l >  r };
XPath.le = function (l, r) { return l <= r };
XPath.ge = function (l, r) { return l >= r };
// Runtime - Node Set
XPath.id = function (s, n) {
  if (arguments.length == 1) n = s;
  var nl = [];
  for (var id = this.string(s).split(/\s+/), i = id.length; --i >= 0;)
    if (s = (n.ownerDocument || n).getElementById(id[i]))
      nl.push(s);
  return nl.sort(this.order);
};
XPath.localName = new Function ('nl',
  'return (nl.length&&nl[0].'+(XPath.ie?'baseName':'localName')+')||""'
);
XPath.namespaceURI = function (nl) {
  return (nl.length && nl[0].namespaceURI) || '';
};
XPath.qName = function (nl) {
  return (nl.length && nl[0].nodeName) || '';
};
XPath.union = function (a, b) {
  if (!a.length) return b;
  if (!b.length) return a;
  var nl = [], i = a.length - 1, j = b.length - 1;
  for (;;) {
    switch (this.order(a[i], b[j])) {
      case -1: nl.unshift(b[j--]); break;
      case  0: j--; // fallthru
      case  1: nl.unshift(a[i--]); break;
      default: throw new Error('Invalid order');
    }
    if (i < 0) {
      if (++j > 0) nl.unshift.apply(nl, nl.slice.call(b, 0, j));
      break;
    }
    if (j < 0) {
      if (++i > 0) nl.unshift.apply(nl, nl.slice.call(a, 0, i));
      break;
    }
  }
  return nl;
};
// Runtime - String
XPath.string = XPath.object = function (v) {
  if (v instanceof Array && typeof (v = v[0]) == 'undefined') return '';
  if (typeof v == 'string') return v;
  switch (v.nodeType) {
    case 1: case 9: case 11:
      return Array.prototype.map.call(v.childNodes, this.string, this).join('');
//      case 3: case 4: case 8:
//        return v.data || '';
    default:
      return v.nodeValue || '';
  }
  return String(v);
};
XPath.concat = function () {
  return Array.prototype.map.call(arguments, this.string, this).join('');
};
XPath.startsWith = function (a, b) {
  return this.string(a).substr(0, (b = this.string(b)).length) == b;
};
XPath.contains = function (a, b) {
  return this.string(a).indexOf(this.string(b)) != -1;
};
XPath.substringBefore = function (a, b) {
  a = this.string(a);
  b = a.indexOf(this.string(b));
  return b != -1 ? a.substr(0, b) : '';
};
XPath.substringAfter = function (a, b) {
  a = this.string(a); b = this.string(b);
  var i = a.indexOf(b);
  return i != -1 ? a.substr(i + b.length) : '';
};
XPath.substring = function (s, i, l) {
  s = this.string(s);
  i = Math.round(this.number(i)) - 1;
  return (arguments.length == 2)
       ? s.substr(i < 0 ? 0 : i)
       : s.substr(i < 0 ? 0 : i, Math.round(this.number(l)) - Math.max(0, -i));
};
XPath.normalizeSpace = function(s) {
  return this.string(s).replace(/^\s+/,'').replace(/\s+$/,'').replace(/\s+/g, ' ');
};
XPath.translate = function(a, b, c) {
  a = this.string(a); b = this.string(b); c = this.string(c);
  var o = [], l = a.length, i = 0, j, x;
  while (--l >= 0)
    if (   (j = b.indexOf(x = a.charAt(i++))) == -1
        || (x = c.charAt(j))) o.push(x);
  return o.join('');
};
// Runtime - Boolean
XPath.bool = XPath['boolean'] = function (v) {
  if (typeof v == 'boolean') return v;
  if (v instanceof Array || typeof v == 'string') return v.length > 0;
  return Boolean(v);
};
// Runtime - Number
XPath.number = function (v) {
  if (v instanceof Array && typeof (v = v[0]) == 'undefined') return 0;
  if (typeof v == 'number') return v;
  if (typeof v == 'boolean') return v ? 1 : 0;
  return Number(this.string(v));
};
XPath.sum = function (nl) {
  var r = 0, i = nl.length;
  while (--i >= 0) r += this.number(nl[i]);
  return r;
};
// Runtime - Axis
XPath.walk = function (n, nl) {
  var x, c = n.firstChild;
  while (c) {
    nl.push(c);
    if (x = c.firstChild) c = x;
    else for (x = c; !(c = x.nextSibling) && (x = x.parentNode) && (x != n););
  }
  return nl;
};
XPath.axes = {
  'ancestor' : function (n) {
    var nl = [];
    while (n = n.parentNode) nl.unshift(n);
    return nl;
  },
  'ancestor-or-self' : function (n) {
    var nl = [];
    do { nl.unshift(n) } while (n = n.parentNode);
    return nl;
  },
  'attribute' : new Function ('n',
    'var nl = [], a = n.attributes;if(a){attr:for(var x,i=a.length;--i>=0;){if(!(x=a[i]).specified){' +
    (XPath.ie?'switch(x.nodeName){case"selected":case"value":if(x.nodeValue)break;default:continue attr;}' : 'continue;') +
    '}nl.unshift(x);}}return nl;'
  ),
  'child' : function (n) {
    return n.childNodes || [];
  },
  'descendant' : function (n) {
    return this.walk(n, []);
  },
  'descendant-or-self' : function (n) {
    return this.walk(n, [n]);
  },
  'following' : function (n) {
    var nl = [], x;
    while (n) {
      if (x = n.nextSibling) {
        nl.push(n = x);
        if (x = n.firstChild) nl.push(n = x);
      }
      else n = n.parentNode;
    }
    return nl;
  },
  'following-sibling' : function (n) {
    var nl = [];
    while (n = n.nextSibling) nl.push(n);
    return nl;
  },
  'parent' : function (n) {
    return n.parentNode ? [n.parentNode] : [];
  },
  'preceding' : function (n) {
    var nl = [], x, p = n.parentNode;
    while (n) {
      if (x = n.previousSibling) {
        for (n = x; x = n.lastChild; n = x);
        nl.unshift(n);
      }
      else if (n = n.parentNode) {
        if (n == p) p = p.parentNode;
        else nl.unshift(n);
      }
    }
    return nl;
  },
  'preceding-sibling' : function (n) {
    var nl = [];
    while (n = n.previousSibling) nl.unshift(n);
    return nl;
  },
  'self' : function (n) {
    return [n];
  },
  // non standard
  'document-root' : function (n) {
    return [n.ownerDocument || n];
  }
};
XPath.axis = function (fn, nt/*, pr..., nl*/) {
  var r, x, al = arguments.length - 1, nl = arguments[al], ap = Array.prototype;
  for (var i = 0, j, l = nl.length; --l >= 0;) {
    x = fn.call(this, nl[i++]);
    if (nt && x.length) x = ap.filter.call(x, nt, this);
    for (j = 2; j < al && x.length; x = ap.filter.call(x, arguments[j++], this));
    r = r ? this.union(r, x) : x;
  }
  return r || [];
};
XPath.cache = {};

/**
 * Extends the native <code>Node</code> class with additional functionality.
 * <p>Not available in Internet Exporer which don&rsquo;t have a <code>Node</code> class.</p>
 * <p>See <a href="http://www.w3.org/TR/2003/WD-DOM-Level-3-Core-20030226/core.html#ID-1950641247" target="_blank">http://www.w3.org/TR/2003/WD-DOM-Level-3-Core-20030226/core.html#ID-1950641247</a></code>.</p>
 * @class Node
 * @author Henrik Lindqvist &lt;<a href="mailto:henrik.lindqvist@llamalab.com">henrik.lindqvist@llamalab.com</a>&gt;
 */
/**
 * Compares a node with this node with regard to their position in the document and according to the document order.
 * <p>When comparing two attribute nodes; <code>32</code> is returned if they have the
 * same <code>ownerElement</code>, otherwise <code>0</code>. This is probably not standard,
 * but it&rsquo;s what Firefox return, so we do the same.</p>
 * <pre>
 * DOCUMENT_POSITION_DISCONNECTED            = 1;
 * DOCUMENT_POSITION_PRECEDING               = 2;
 * DOCUMENT_POSITION_FOLLOWING               = 4;
 * DOCUMENT_POSITION_CONTAINS                = 8;
 * DOCUMENT_POSITION_IS_CONTAINED            = 16;
 * DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
 * </pre>
 * <p>See <a href="http://www.w3.org/TR/2003/WD-DOM-Level-3-Core-20030226/core.html#Node3-compareDocumentPosition" target="_blank">http://www.w3.org/TR/2003/WD-DOM-Level-3-Core-20030226/core.html#Node3-compareDocumentPosition</a></code>.</p>
 * @function {number} compareDocumentPosition
 * @param {Node} n - node to compare against.
 * @returns <code>0</code> for nodes are equals or a number with some of the above bits set.
 */
/**
 * Check if this node contains another node.
 * @function {boolean} contains
 * @param {Node} n - node to compare against.
 * @returns <code>true</code> if <code>this</code> node cotains node <code>n</code>.
 */
function compareDocumentPosition (n) {
  if (this == n) return 0; // Same
  if (this.nodeType == 2 && n.nodeType == 2)
    return (this.ownerElement && this.ownerElement == n.ownerElement) ? 32 : 0; // IMPLEMENT_SPECIFIC
  var l = this.ownerElement || this, r = n.ownerElement || n;
  if (l.sourceIndex >= 0 && r.sourceIndex >= 0 && l.contains && r.contains) {
    return (
        ((l.contains(r)                 && 16) || (r.contains(l)                 && 8))
      | ((l.sourceIndex < r.sourceIndex &&  4) || (r.sourceIndex < l.sourceIndex && 2))
    ) || 1;
  }
  var la = l, ra = r, ld = 0, rd = 0;
  while (la = la.parentNode) ld++;
  while (ra = ra.parentNode) rd++;
  if (ld > rd) {
    while (ld-- != rd) l = l.parentNode;
    if (l == r) return 2|8;  // Preceding|Contains
  }
  else if (rd > ld) {
    while (rd-- != ld) r = r.parentNode;
    if (r == l) return 4|16; // Following|Contained By
  }
  while ((la = l.parentNode) != (ra = r.parentNode))
    if (!(l = la) || !(r = ra)) return 1; // Disconnected
  while (l = l.nextSibling)
    if (l == r) return 4; // Following
  return 2;  // Preceding
};
if (w.Node) {
  var np = w.Node.prototype;
  if (f || !np.compareDocumentPosition)
    np.compareDocumentPosition = compareDocumentPosition;
  if (f || !np.contains) {
    np.contains = function (n) {
      return Boolean(this.compareDocumentPosition(n) & 16);
    };
  }
}
else
  XPath.compareDocumentPosition = compareDocumentPosition;
/**
 * Exception throw when parser or expression fails.
 * <p>See <code><a href="http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathException" target="_blank">http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathException</a></code>.</p>
 * @class XPathException
 * @author Henrik Lindqvist &lt;<a href="mailto:henrik.lindqvist@llamalab.com">henrik.lindqvist@llamalab.com</a>&gt;
 */
/**
 * Namespace error.
 * @property {static read number} NAMESPACE_ERR
 */
/**
 * Expression syntax error.
 * @property {static read number} INVALID_EXPRESSION_ERR
 */
/**
 * Result type error.
 * @property {static read number} TYPE_ERR
 */
/**
 * XPathException constructor.
 * @constructor XPathException
 * @param {number} c - error code.
 * @param {string} m - error message.
 * @see NAMESPACE_ERR
 * @see INVALID_EXPRESSION_ERR
 * @see TYPE_ERR
 */
/**
 * Exception name.
 * @property {read string} name
 */
/**
 * Exception code.
 * @property {read number} code
 * @see NAMESPACE_ERR
 * @see INVALID_EXPRESSION_ERR
 * @see TYPE_ERR
 */
/**
 * Exception message.
 * @property {read string} message
 */
if (f || !w.XPathException) {
  function XPathException (c, m) {
    this.name = 'XPathException';
    this.code = c;
    this.message = m;
  }
  var e = XPathException, p = new Error;
  p.toString = function () {
    return this.name+':'+this.message;
  };
  e.prototype = p;
  e.NAMESPACE_ERR          = 14;
  e.INVALID_EXPRESSION_ERR = 51;
  e.TYPE_ERR               = 52;
  w.XPathException = e;
}
/**
 * Namespace resolver.
 * <p>See <code><a href="http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathNSResolver" target="_blank">http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathNSResolver</a></code>.</p>
 * @class XPathNSResolver
 * @see XPathEvaluator.createNSResolver
 * @author Henrik Lindqvist &lt;<a href="mailto:henrik.lindqvist@llamalab.com">henrik.lindqvist@llamalab.com</a>&gt;
 */
/**
 * Look up a namespace URI by it&rsquo;s prefix use in document.
 * @function {string} lookupNamespaceURI
 * @param {string} p - <code>xmlns:</code> prefix, empty string for <code>targetNamespace</code>.
 * @returns associated namespace URI, or <code>undefined</code> if none is found.
 */
if (f || !w.XPathNSResolver) {
  function XPathNSResolver (n) {
    this.ns = {};
    for (var m, a, i = n.attributes.length; --i >= 0;)
      if (m = /xmlns:(.+)/.exec((a = n.attributes[i]).nodeName))
        this.ns[m[1]] = a.nodeValue;
    this.ns[''] = n.getAttribute('targetNamespace');
  }
  XPathNSResolver.prototype = {
    lookupNamespaceURI : function (p) {
      return this.ns[p || ''];
    }
  };
  w.XPathNSResolver = XPathNSResolver;
}
/**
 * A pre-parsed XPath expression.
 * <p>See <code><a href="http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathExpression" target="_blank">http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathExpression</a></code>.</p>
 * @class XPathExpression
 * @see XPathEvaluator.createExpression
 * @author Henrik Lindqvist &lt;<a href="mailto:henrik.lindqvist@llamalab.com">henrik.lindqvist@llamalab.com</a>&gt;
 */
/**
 * Evaluate this pre-parsed expression.
 * @function {XPathResult} evaluate
 * @param {Node} n - context node.
 * @param {number} rt - return type, see <code>{@link XPathResult}</code>.
 * @param {XPathResult} r - <code>{@link XPathResult}</code> that maybe reuse, or <code>null</code>.
 * @returns a <code>{@link XPathResult}</code>.
 */
if (f || !w.XPathExpression) {
  function XPathExpression (e, nsr) {
    this.fn = XPath.cache[e] || (XPath.cache[e] = new XPath(e));
    this.nsr = nsr;
  }
  XPathExpression.prototype = {
    evaluate : function (n, rt) {
      return new XPathResult(this.fn(n, this.nsr), rt);
    }
  };
  w.XPathExpression = XPathExpression;
}
/**
 * Container for XPath results.
 * <p>See <code><a href="http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathResult" target="_blank">http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathResult</a></code>.</p>
 * @class XPathResult
 * @see XPathEvaluator.evaluate
 * @see XPathExpression.evaluate
 * @author Henrik Lindqvist &lt;<a href="mailto:henrik.lindqvist@llamalab.com">henrik.lindqvist@llamalab.com</a>&gt;
 */
/**
 * Result will be accessed unconverted as the expression returned it.
 * @property {static read number} ANY_TYPE
 */
/**
 * Result will be accessed as a number.
 * @property {static read number} NUMBER_TYPE
 * @see numberValue
 */
/**
 * Result will be accessed as a string.
 * @property {static read number} STRING_TYPE
 * @see stringValue
 */
/**
 * Result will be accessed as boolean.
 * @property {static read number} BOOLEAN_TYPE
 * @see booleanValue
 */
/**
 * Result will be accessed iteratively, node order insignificant.
 * <p>This is equal to <code>{@link ORDERED_NODE_ITERATOR_TYPE}</code>
 * since the result is always document-ordered.</p>
 * @property {static read number} UNORDERED_NODE_ITERATOR_TYPE
 * @see iterateNext
 */
/**
 * Result will be accessed iteratively which must be document-ordered.
 * @property {static read number} ORDERED_NODE_ITERATOR_TYPE
 * @see iterateNext
 */
/**
 * Result will be accessed as a snapshot list of nodes, node order insignificant.
 * <p>This is equal to <code>{@link ORDERED_NODE_SNAPSHOT_TYPE}</code>
 * since the result is always document-ordered.</p>
 * @property {static read number} UNORDERED_NODE_SNAPSHOT_TYPE
 * @see snapshotLength
 * @see snapshotItem
 */
/**
 * Result will be accessed as a snapshot list of nodes which must be document-ordered.
 * @property {static read number} ORDERED_NODE_SNAPSHOT_TYPE
 * @see snapshotLength
 * @see snapshotItem
 */
/**
 * Result will be accessed as a single node value, any of the resulting nodes.
 * <p>This is equal to <code>{@link FIRST_ORDERED_NODE_TYPE}</code>
 * since the result is always document-ordered.</p>
 * @property {static read number} ANY_UNORDERED_NODE_TYPE
 * @see singleNodeValue
 */
/**
 * Result will be accessed as a single node value, the first resulting node in document-ordered.
 * @property {static read number} FIRST_ORDERED_NODE_TYPE
 * @see singleNodeValue
 */
/**
 * Convert result to number.
 * @property {static read number} NUMBER_TYPE
 */
/**
 * Convert result to number.
 * @property {static read number} NUMBER_TYPE
 */
/**
 * Convert result to number.
 * @property {static read number} NUMBER_TYPE
 */
/**
 * Convert result to number.
 * @property {static read number} NUMBER_TYPE
 */
/**
 * Convert result to number.
 * @property {static read number} NUMBER_TYPE
 */
/**
 * Resulting number.
 * @property {read number} numberValue
 * @see NUMBER_TYPE
 */
/**
 * Resulting string.
 * @property {read string} stringValue
 * @see STRING_TYPE
 */
/**
 * Resulting boolean.
 * @property {read boolean} booleanValue
 * @see BOOLEAN_TYPE
 */
/**
 * Signifies that the iterator has become invalid.
 * @property {read boolean} invalidIteratorState
 * @see UNORDERED_NODE_ITERATOR_TYPE
 * @see ORDERED_NODE_ITERATOR_TYPE
 */
/**
 * The number of nodes in the result snapshot.
 * @property {read number} snapshotLength
 * @see UNORDERED_NODE_SNAPSHOT_TYPE
 * @see ORDERED_NODE_SNAPSHOT_TYPE
 */
/**
 * The value of this single node result, maybe <code>undefined</code>.
 * @property {read object} singleNodeValue
 * @see ANY_UNORDERED_NODE_TYPE
 * @see FIRST_ORDERED_NODE_TYPE
 */
/**
 * Unconverted result as returned by our internal evaluator.
 * <p>This is a non-standard property which is set to the raw unconverted result from our
 * expression evaluator. It&rsquo;s of the type <code>number</code>, <code>string</code>,
 * <code>boolean</code> or an <code>{@link Array}</code> with nodes depending on expression.
 * If you prefer to work with arrays instead of <code>{@link XPathResult.snapshotItem}</code>
 * You can check for this property and use it directly.</p>
 * <h3>Example</h3>
 * <pre>
 * function selectNodes (expr) {
 *   // Cross-browser safe way of selecting nodes and return an Array
 *   var r = document.evaluate('//LI', document, null, 7, null);
 *   if (typeof r.value != 'undefined') return r.value;
 *   var a = [];
 *   for (var i = r.snapshotLength; --i >= 0; a[i] = r.snapshotItem(i));
 *   return a;
 * }
 * </pre>
 * @property {read object} value
 * @see ANY_TYPE
 */
/**
 * Iterates and returns the next node from the resuling nodes.
 * @function {object} iterateNext
 * @returns a <code>Node</code>, or <code>undefined</code> if there are no more nodes.
 */
/**
 * Returns the <code>index</code>th item in the snapshot collection.
 * @function {object} snapshotItem
 * @param {number} i - index of resuling node to return.
 * @returns the <code>Node</code>, at provided index or <code>undefined</code> if invalid.
 */
if (f || !w.XPathResult) {
  function XPathResult (r, rt) {
    if (rt == 0) {
      switch (typeof r) {
        default:        rt++;
        case 'boolean': rt++;
        case 'string':  rt++;
        case 'number':  rt++;
      }
    }
    this.resultType = rt;
    switch (rt) {
      case 1:
        this.numberValue = XPath.number(r);
        return;
      case 2:
        this.stringValue = XPath.string(r);
        return;
      case 3:
        this.booleanValue = XPath.bool(r);
        return;
      case 4:
      case 5:
        if (r instanceof Array) {
          this.value = r;
          this.index = 0;
          this.invalidIteratorState = false;
          return;
        }
        break;
      case 6:
      case 7:
        if (r instanceof Array) {
          this.value = r;
          this.snapshotLength = r.length;
          return;
        }
        break;
      case 8:
      case 9:
        if (r instanceof Array) {
          this.singleNodeValue = r[0];
          return;
        }
    }
    throw new XPathException(52);
  }
  var r = XPathResult;
  r.ANY_TYPE                      = 0;
  r.NUMBER_TYPE                   = 1;
  r.STRING_TYPE                   = 2;
  r.BOOLEAN_TYPE                  = 3;
  r.UNORDERED_NODE_ITERATOR_TYPE  = 4;
  r.ORDERED_NODE_ITERATOR_TYPE    = 5;
  r.UNORDERED_NODE_SNAPSHOT_TYPE  = 6;
  r.ORDERED_NODE_SNAPSHOT_TYPE    = 7;
  r.ANY_UNORDERED_NODE_TYPE       = 8;
  r.FIRST_ORDERED_NODE_TYPE       = 9;
  r.prototype = {
    iterateNext : function () {
      switch (this.resultType) {
        case 4:
        case 5:
          return this.value[this.index++];
      }
      throw new XPathException(52);
    },
    snapshotItem : function (i) {
      switch (this.resultType) {
        case 6:
        case 7:
          return this.value[i];
      }
      throw new XPathException(52);
    }
  };
  w.XPathResult = r;
}
/**
 * An interface with the XPath functionality.
 * <p><code>Document.prototype</code> and/or <code>document</code> will be
 * extended using <code>{@link install}</code> to implements it&rsquo;s functions.</p>
 * <p>See <code><a href="http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathEvaluator" target="_blank">http://www.w3.org/TR/DOM-Level-3-XPath/xpath.html#XPathEvaluator</a></code>.</p>
 * @interface XPathEvaluator
 * @author Henrik Lindqvist &lt;<a href="mailto:henrik.lindqvist@llamalab.com">henrik.lindqvist@llamalab.com</a>&gt;
 */
/**
 * Non-standard function that extends the provided object with <code>{@link XPathEvaluator}</code> functions.
 * @function {static} install
 * @param {object} o - object (i.e document node) to extend.
 * @param {optional boolean} f - force replace the build-in function even if they exists.
 */
/**
 * Creates a pre-parsed expression.
 * @function {XPathExpression} createExpression
 * @param {string} e - expression.
 * @param {XPathNSResolver} nsr - namespace resolver to use when evaluating, or <code>null</code>.
 * @returns a new <code>{@link XPathExpression}</code>.
 */
/**
 * Create a namespace resolver by scanning a node for <code>xmlns:</code> attributes.
 * @function {XPathNSResolver} createNSResolver
 * @param {Node} n - an <code>Node</code> with defined namespace attributes (i.e the documentElement).
 * @returns a new <code>{@link XPathNSResolver}</code>.
 */
/**
 * Evaluate an expression.
 * <p>Same as <code>new XPathExpression(e, nsr).evaluate(n, rt)</code>.</p>
 * @function {XPathResult} evaluate
 * @param {string} e - XPath expression string.
 * @param {Node} n - context node.
 * @param {XPathNSResolver} nsr - namespace resolver to use when evaluating, or <code>null</code>.
 * @param {number} rt - return type, see <code>{@link XPathResult}</code>.
 * @param {XPathResult} r - <code>{@link XPathResult}</code> that maybe reuse, or <code>null</code>. Ignored.
 * @returns a <code>{@link XPathResult}</code>.
 */
if (f || !w.XPathEvaluator) {
  function XPathEvaluator () {}
  var e = XPathEvaluator;
  e.prototype = {
    createExpression : function (e, nsr) {
      return new XPathExpression(e, nsr);
    },
    createNSResolver : function (n) {
      return new XPathNSResolver(n);
    },
    evaluate : function (e, n, nsr, rt) {
      return new XPathExpression(e, nsr).evaluate(n, rt);
    }
  };
  e.install = function (o, f) {
    for (var k in XPathEvaluator.prototype)
      if (f || !o[k]) o[k] = XPathEvaluator.prototype[k];
  };
  w.XPathEvaluator = e;
  if (w.Document)
    e.install(w.Document.prototype, f);
  else
    e.install(w.document, f);
  w.XPath = XPath;
}

})(window, /WebKit/.test(navigator.userAgent)); // force replace?
