window._mipStartTiming=Date.now();
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  /* eslint-disable */
  (function (o) {
    if (o.fetch && !/qqbrowser\/([0-9.]+)/i.test(navigator.userAgent)) {
      return;
    }var l = { searchParams: "URLSearchParams" in o, iterable: "Symbol" in o && "iterator" in Symbol, blob: "FileReader" in o && "Blob" in o && function () {
        try {
          new Blob();return true;
        } catch (x) {
          return false;
        }
      }(), formData: "FormData" in o, arrayBuffer: "ArrayBuffer" in o };if (l.arrayBuffer) {
      var m = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"];var s = function s(x) {
        return x && DataView.prototype.isPrototypeOf(x);
      };var b = ArrayBuffer.isView || function (x) {
        return x && m.indexOf(Object.prototype.toString.call(x)) > -1;
      };
    }function i(x) {
      if (typeof x !== "string") {
        x = String(x);
      }if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(x)) {
        throw new TypeError("Invalid character in header field name");
      }return x.toLowerCase();
    }function j(x) {
      if (typeof x !== "string") {
        x = String(x);
      }return x;
    }function e(x) {
      var y = { next: function next() {
          var z = x.shift();return { done: z === undefined, value: z };
        } };if (l.iterable) {
        y[Symbol.iterator] = function () {
          return y;
        };
      }return y;
    }function p(x) {
      this.map = {};if (x instanceof p) {
        x.forEach(function (z, y) {
          this.append(y, z);
        }, this);
      } else {
        if (Array.isArray(x)) {
          x.forEach(function (y) {
            this.append(y[0], y[1]);
          }, this);
        } else {
          if (x) {
            Object.getOwnPropertyNames(x).forEach(function (y) {
              this.append(y, x[y]);
            }, this);
          }
        }
      }
    }p.prototype.append = function (y, z) {
      y = i(y);z = j(z);var x = this.map[y];this.map[y] = x ? x + "," + z : z;
    };p.prototype["delete"] = function (x) {
      delete this.map[i(x)];
    };p.prototype.get = function (x) {
      x = i(x);return this.has(x) ? this.map[x] : null;
    };p.prototype.has = function (x) {
      return this.map.hasOwnProperty(i(x));
    };p.prototype.set = function (x, y) {
      this.map[i(x)] = j(y);
    };p.prototype.forEach = function (z, x) {
      for (var y in this.map) {
        if (this.map.hasOwnProperty(y)) {
          z.call(x, this.map[y], y, this);
        }
      }
    };p.prototype.keys = function () {
      var x = [];this.forEach(function (z, y) {
        x.push(y);
      });return e(x);
    };p.prototype.values = function () {
      var x = [];this.forEach(function (y) {
        x.push(y);
      });return e(x);
    };p.prototype.entries = function () {
      var x = [];this.forEach(function (z, y) {
        x.push([y, z]);
      });return e(x);
    };if (l.iterable) {
      p.prototype[Symbol.iterator] = p.prototype.entries;
    }function f(x) {
      if (x.bodyUsed) {
        return Promise.reject(new TypeError("Already read"));
      }x.bodyUsed = true;
    }function h(x) {
      return new Promise(function (z, y) {
        x.onload = function () {
          z(x.result);
        };x.onerror = function () {
          y(x.error);
        };
      });
    }function c(y) {
      var x = new FileReader();var z = h(x);x.readAsArrayBuffer(y);return z;
    }function d(y) {
      var x = new FileReader();var z = h(x);x.readAsText(y);return z;
    }function u(y) {
      var x = new Uint8Array(y);var A = new Array(x.length);for (var z = 0; z < x.length; z++) {
        A[z] = String.fromCharCode(x[z]);
      }return A.join("");
    }function k(y) {
      if (y.slice) {
        return y.slice(0);
      } else {
        var x = new Uint8Array(y.byteLength);x.set(new Uint8Array(y));return x.buffer;
      }
    }function q() {
      this.bodyUsed = false;this._initBody = function (x) {
        this._bodyInit = x;if (!x) {
          this._bodyText = "";
        } else {
          if (typeof x === "string") {
            this._bodyText = x;
          } else {
            if (l.blob && Blob.prototype.isPrototypeOf(x)) {
              this._bodyBlob = x;
            } else {
              if (l.formData && FormData.prototype.isPrototypeOf(x)) {
                this._bodyFormData = x;
              } else {
                if (l.searchParams && URLSearchParams.prototype.isPrototypeOf(x)) {
                  this._bodyText = x.toString();
                } else {
                  if (l.arrayBuffer && l.blob && s(x)) {
                    this._bodyArrayBuffer = k(x.buffer);this._bodyInit = new Blob([this._bodyArrayBuffer]);
                  } else {
                    if (l.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(x) || b(x))) {
                      this._bodyArrayBuffer = k(x);
                    } else {
                      throw new Error("unsupported BodyInit type");
                    }
                  }
                }
              }
            }
          }
        }if (!this.headers.get("content-type")) {
          if (typeof x === "string") {
            this.headers.set("content-type", "text/plain;charset=UTF-8");
          } else {
            if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set("content-type", this._bodyBlob.type);
            } else {
              if (l.searchParams && URLSearchParams.prototype.isPrototypeOf(x)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          }
        }
      };if (l.blob) {
        this.blob = function () {
          var x = f(this);if (x) {
            return x;
          }if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else {
            if (this._bodyArrayBuffer) {
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            } else {
              if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            }
          }
        };this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            return f(this) || Promise.resolve(this._bodyArrayBuffer);
          } else {
            return this.blob().then(c);
          }
        };
      }this.text = function () {
        var x = f(this);if (x) {
          return x;
        }if (this._bodyBlob) {
          return d(this._bodyBlob);
        } else {
          if (this._bodyArrayBuffer) {
            return Promise.resolve(u(this._bodyArrayBuffer));
          } else {
            if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          }
        }
      };if (l.formData) {
        this.formData = function () {
          return this.text().then(n);
        };
      }this.json = function () {
        return this.text().then(JSON.parse);
      };return this;
    }var t = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];function v(y) {
      var x = y.toUpperCase();return t.indexOf(x) > -1 ? x : y;
    }function r(y, z) {
      z = z || {};var x = z.body;if (y instanceof r) {
        if (y.bodyUsed) {
          throw new TypeError("Already read");
        }this.url = y.url;this.credentials = y.credentials;if (!z.headers) {
          this.headers = new p(y.headers);
        }this.method = y.method;this.mode = y.mode;if (!x && y._bodyInit != null) {
          x = y._bodyInit;y.bodyUsed = true;
        }
      } else {
        this.url = String(y);
      }this.credentials = z.credentials || this.credentials || "omit";if (z.headers || !this.headers) {
        this.headers = new p(z.headers);
      }this.method = v(z.method || this.method || "GET");this.mode = z.mode || this.mode || null;this.referrer = null;if ((this.method === "GET" || this.method === "HEAD") && x) {
        throw new TypeError("Body not allowed for GET or HEAD requests");
      }this._initBody(x);
    }r.prototype.clone = function () {
      return new r(this, { body: this._bodyInit });
    };function n(x) {
      var y = new FormData();x.trim().split("&").forEach(function (z) {
        if (z) {
          var B = z.split("=");var A = B.shift().replace(/\+/g, " ");var C = B.join("=").replace(/\+/g, " ");y.append(decodeURIComponent(A), decodeURIComponent(C));
        }
      });return y;
    }function w(z) {
      var y = new p();var x = z.replace(/\r?\n[\t ]+/g, " ");x.split(/\r?\n/).forEach(function (A) {
        var D = A.split(":");var B = D.shift().trim();if (B) {
          var C = D.join(":").trim();y.append(B, C);
        }
      });return y;
    }q.call(r.prototype);function a(y, x) {
      if (!x) {
        x = {};
      }this.type = "default";this.status = x.status === undefined ? 200 : x.status;this.ok = this.status >= 200 && this.status < 300;this.statusText = "statusText" in x ? x.statusText : "OK";this.headers = new p(x.headers);this.url = x.url || "";this._initBody(y);
    }q.call(a.prototype);a.prototype.clone = function () {
      return new a(this._bodyInit, { status: this.status, statusText: this.statusText, headers: new p(this.headers), url: this.url });
    };a.error = function () {
      var x = new a(null, { status: 0, statusText: "" });x.type = "error";return x;
    };var g = [301, 302, 303, 307, 308];a.redirect = function (y, x) {
      if (g.indexOf(x) === -1) {
        throw new RangeError("Invalid status code");
      }return new a(null, { status: x, headers: { location: y } });
    };o.Headers = p;o.Request = r;o.Response = a;o.fetch = function (x, y) {
      return new Promise(function (B, A) {
        var z = new r(x, y);var C = new XMLHttpRequest();C.onload = function () {
          var E = { status: C.status, statusText: C.statusText, headers: w(C.getAllResponseHeaders() || "") };E.url = "responseURL" in C ? C.responseURL : E.headers.get("X-Request-URL");var D = "response" in C ? C.response : C.responseText;B(new a(D, E));
        };C.onerror = function () {
          A(new TypeError("Network request failed"));
        };C.ontimeout = function () {
          A(new TypeError("Network request failed"));
        };C.open(z.method, z.url, true);if (z.credentials === "include") {
          C.withCredentials = true;
        } else {
          if (z.credentials === "omit") {
            C.withCredentials = false;
          }
        }if ("responseType" in C && l.blob) {
          C.responseType = "blob";
        }z.headers.forEach(function (E, D) {
          C.setRequestHeader(D, E);
        });C.send(typeof z._bodyInit === "undefined" ? null : z._bodyInit);
      });
    };o.fetch.polyfill = true;
  })(typeof self !== "undefined" ? self : window);

  /* eslint-disable */
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.fetchJsonp = mod.exports;
    }
  })(window, function (exports, module) {

    var defaultOptions = {
      timeout: 5000,
      jsonpCallback: 'callback',
      jsonpCallbackFunction: null
    };

    function generateCallbackFunction() {
      return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
    }

    function clearFunction(functionName) {
      // IE8 throws an exception when you try to delete a property on window
      // http://stackoverflow.com/a/1824228/751089
      try {
        delete window[functionName];
      } catch (e) {
        window[functionName] = undefined;
      }
    }

    function removeScript(scriptId) {
      var script = document.getElementById(scriptId);
      if (script) {
        document.getElementsByTagName('head')[0].removeChild(script);
      }
    }

    function fetchJsonp(_url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      // to avoid param reassign
      var url = _url;
      var timeout = options.timeout || defaultOptions.timeout;
      var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

      var timeoutId = undefined;

      return new Promise(function (resolve, reject) {
        var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
        var scriptId = jsonpCallback + '_' + callbackFunction;

        window[callbackFunction] = function (response) {
          resolve({
            ok: true,
            // keep consistent with fetch API
            json: function json() {
              return Promise.resolve(response);
            }
          });

          if (timeoutId) clearTimeout(timeoutId);

          removeScript(scriptId);

          clearFunction(callbackFunction);
        };

        // Check if the user set their own params, and if not add a ? to start a list of params
        url += url.indexOf('?') === -1 ? '?' : '&';

        var jsonpScript = document.createElement('script');
        jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
        if (options.charset) {
          jsonpScript.setAttribute('charset', options.charset);
        }
        jsonpScript.id = scriptId;
        document.getElementsByTagName('head')[0].appendChild(jsonpScript);

        timeoutId = setTimeout(function () {
          reject(new Error('JSONP request to ' + _url + ' timed out'));

          clearFunction(callbackFunction);
          removeScript(scriptId);
          window[callbackFunction] = function () {
            clearFunction(callbackFunction);
          };
        }, timeout);

        // Caught if got 404/500
        jsonpScript.onerror = function () {
          reject(new Error('JSONP request to ' + _url + ' failed'));

          clearFunction(callbackFunction);
          removeScript(scriptId);
          if (timeoutId) clearTimeout(timeoutId);
        };
      });
    }

    // export as global function
    /*
    let local;
    if (typeof global !== 'undefined') {
      local = global;
    } else if (typeof self !== 'undefined') {
      local = self;
    } else {
      try {
        local = Function('return this')();
      } catch (e) {
        throw new Error('polyfill failed because global object is unavailable in this environment');
      }
    }
    local.fetchJsonp = fetchJsonp;
    */

    module.exports = fetchJsonp;
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /*! (C) Andrea Giammarchi - @WebReflection - ISC Style License */
  (function (window, polyfill) {
    var document = window.document,
        Object = window.Object;var htmlClass = function (info) {
      var catchClass = /^[A-Z]+[a-z]/,
          filterBy = function filterBy(re) {
        var arr = [],
            tag;for (tag in register) {
          if (re.test(tag)) arr.push(tag);
        }return arr;
      },
          add = function add(Class, tag) {
        tag = tag.toLowerCase();if (!(tag in register)) {
          register[Class] = (register[Class] || []).concat(tag);register[tag] = register[tag.toUpperCase()] = Class;
        }
      },
          register = (Object.create || Object)(null),
          htmlClass = {},
          i,
          section,
          tags,
          Class;for (section in info) {
        for (Class in info[section]) {
          tags = info[section][Class];register[Class] = tags;for (i = 0; i < tags.length; i++) {
            register[tags[i].toLowerCase()] = register[tags[i].toUpperCase()] = Class;
          }
        }
      }htmlClass.get = function get$$1(tagOrClass) {
        return typeof tagOrClass === "string" ? register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : "") : filterBy(tagOrClass);
      };htmlClass.set = function set$$1(tag, Class) {
        return catchClass.test(tag) ? add(tag, Class) : add(Class, tag), htmlClass;
      };return htmlClass;
    }({ collections: { HTMLAllCollection: ["all"], HTMLCollection: ["forms"], HTMLFormControlsCollection: ["elements"], HTMLOptionsCollection: ["options"] }, elements: { Element: ["element"], HTMLAnchorElement: ["a"], HTMLAppletElement: ["applet"], HTMLAreaElement: ["area"], HTMLAttachmentElement: ["attachment"], HTMLAudioElement: ["audio"], HTMLBRElement: ["br"], HTMLBaseElement: ["base"], HTMLBodyElement: ["body"], HTMLButtonElement: ["button"], HTMLCanvasElement: ["canvas"], HTMLContentElement: ["content"], HTMLDListElement: ["dl"], HTMLDataElement: ["data"], HTMLDataListElement: ["datalist"], HTMLDetailsElement: ["details"], HTMLDialogElement: ["dialog"], HTMLDirectoryElement: ["dir"], HTMLDivElement: ["div"], HTMLDocument: ["document"], HTMLElement: ["element", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "code", "command", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "i", "kbd", "mark", "nav", "noscript", "rp", "rt", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr"], HTMLEmbedElement: ["embed"], HTMLFieldSetElement: ["fieldset"], HTMLFontElement: ["font"], HTMLFormElement: ["form"], HTMLFrameElement: ["frame"], HTMLFrameSetElement: ["frameset"], HTMLHRElement: ["hr"], HTMLHeadElement: ["head"], HTMLHeadingElement: ["h1", "h2", "h3", "h4", "h5", "h6"], HTMLHtmlElement: ["html"], HTMLIFrameElement: ["iframe"], HTMLImageElement: ["img"], HTMLInputElement: ["input"], HTMLKeygenElement: ["keygen"], HTMLLIElement: ["li"], HTMLLabelElement: ["label"], HTMLLegendElement: ["legend"], HTMLLinkElement: ["link"], HTMLMapElement: ["map"], HTMLMarqueeElement: ["marquee"], HTMLMediaElement: ["media"], HTMLMenuElement: ["menu"], HTMLMenuItemElement: ["menuitem"], HTMLMetaElement: ["meta"], HTMLMeterElement: ["meter"], HTMLModElement: ["del", "ins"], HTMLOListElement: ["ol"], HTMLObjectElement: ["object"], HTMLOptGroupElement: ["optgroup"], HTMLOptionElement: ["option"], HTMLOutputElement: ["output"], HTMLParagraphElement: ["p"], HTMLParamElement: ["param"], HTMLPictureElement: ["picture"], HTMLPreElement: ["pre"], HTMLProgressElement: ["progress"], HTMLQuoteElement: ["blockquote", "q", "quote"], HTMLScriptElement: ["script"], HTMLSelectElement: ["select"], HTMLShadowElement: ["shadow"], HTMLSlotElement: ["slot"], HTMLSourceElement: ["source"], HTMLSpanElement: ["span"], HTMLStyleElement: ["style"], HTMLTableCaptionElement: ["caption"], HTMLTableCellElement: ["td", "th"], HTMLTableColElement: ["col", "colgroup"], HTMLTableElement: ["table"], HTMLTableRowElement: ["tr"], HTMLTableSectionElement: ["thead", "tbody", "tfoot"], HTMLTemplateElement: ["template"], HTMLTextAreaElement: ["textarea"], HTMLTimeElement: ["time"], HTMLTitleElement: ["title"], HTMLTrackElement: ["track"], HTMLUListElement: ["ul"], HTMLUnknownElement: ["unknown", "vhgroupv", "vkeygen"], HTMLVideoElement: ["video"] }, nodes: { Attr: ["node"], Audio: ["audio"], CDATASection: ["node"], CharacterData: ["node"], Comment: ["#comment"], Document: ["#document"], DocumentFragment: ["#document-fragment"], DocumentType: ["node"], HTMLDocument: ["#document"], Image: ["img"], Option: ["option"], ProcessingInstruction: ["node"], ShadowRoot: ["#shadow-root"], Text: ["#text"], XMLDocument: ["xml"] } });if ((typeof polyfill === "undefined" ? "undefined" : _typeof(polyfill)) !== "object") polyfill = { type: polyfill || "auto" };var REGISTER_ELEMENT = "registerElement",
        EXPANDO_UID = "__" + REGISTER_ELEMENT + (window.Math.random() * 1e5 >> 0),
        ADD_EVENT_LISTENER = "addEventListener",
        ATTACHED = "attached",
        CALLBACK = "Callback",
        DETACHED = "detached",
        EXTENDS = "extends",
        ATTRIBUTE_CHANGED_CALLBACK = "attributeChanged" + CALLBACK,
        ATTACHED_CALLBACK = ATTACHED + CALLBACK,
        CONNECTED_CALLBACK = "connected" + CALLBACK,
        DISCONNECTED_CALLBACK = "disconnected" + CALLBACK,
        CREATED_CALLBACK = "created" + CALLBACK,
        DETACHED_CALLBACK = DETACHED + CALLBACK,
        ADDITION = "ADDITION",
        MODIFICATION = "MODIFICATION",
        REMOVAL = "REMOVAL",
        DOM_ATTR_MODIFIED = "DOMAttrModified",
        DOM_CONTENT_LOADED = "DOMContentLoaded",
        DOM_SUBTREE_MODIFIED = "DOMSubtreeModified",
        PREFIX_TAG = "<",
        PREFIX_IS = "=",
        validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
        invalidNames = ["ANNOTATION-XML", "COLOR-PROFILE", "FONT-FACE", "FONT-FACE-SRC", "FONT-FACE-URI", "FONT-FACE-FORMAT", "FONT-FACE-NAME", "MISSING-GLYPH"],
        types = [],
        protos = [],
        query = "",
        documentElement = document.documentElement,
        indexOf = types.indexOf || function (v) {
      for (var i = this.length; i-- && this[i] !== v;) {}return i;
    },
        OP = Object.prototype,
        hOP = OP.hasOwnProperty,
        iPO = OP.isPrototypeOf,
        defineProperty$$1 = Object.defineProperty,
        empty = [],
        gOPD = Object.getOwnPropertyDescriptor,
        gOPN = Object.getOwnPropertyNames,
        gPO = Object.getPrototypeOf,
        sPO = Object.setPrototypeOf,
        hasProto = !!Object.__proto__,
        DRECEV1 = "__dreCEv1",
        customElements = window.customElements,
        usableCustomElements = !/^force/.test(polyfill.type) && !!(customElements && customElements.define && customElements.get && customElements.whenDefined),
        Dict = Object.create || Object,
        Map = window.Map || function Map() {
      var K = [],
          V = [],
          i;return { get: function get$$1(k) {
          return V[indexOf.call(K, k)];
        }, set: function set$$1(k, v) {
          i = indexOf.call(K, k);if (i < 0) V[K.push(k) - 1] = v;else V[i] = v;
        } };
    },
        Promise = window.Promise || function (fn) {
      var notify = [],
          done = false,
          p = { catch: function _catch() {
          return p;
        }, then: function then(cb) {
          notify.push(cb);if (done) setTimeout(resolve, 1);return p;
        } };function resolve(value) {
        done = true;while (notify.length) {
          notify.shift()(value);
        }
      }fn(resolve);return p;
    },
        justCreated = false,
        constructors = Dict(null),
        waitingList = Dict(null),
        nodeNames = new Map(),
        secondArgument = function secondArgument(is) {
      return is.toLowerCase();
    },
        create = Object.create || function Bridge(proto) {
      return proto ? (Bridge.prototype = proto, new Bridge()) : this;
    },
        setPrototype = sPO || (hasProto ? function (o, p) {
      o.__proto__ = p;return o;
    } : gOPN && gOPD ? function () {
      function setProperties(o, p) {
        for (var key, names = gOPN(p), i = 0, length = names.length; i < length; i++) {
          key = names[i];if (!hOP.call(o, key)) {
            defineProperty$$1(o, key, gOPD(p, key));
          }
        }
      }return function (o, p) {
        do {
          setProperties(o, p);
        } while ((p = gPO(p)) && !iPO.call(p, o));return o;
      };
    }() : function (o, p) {
      for (var key in p) {
        o[key] = p[key];
      }return o;
    }),
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        HTMLElementPrototype = (window.HTMLElement || window.Element || window.Node).prototype,
        IE8 = !iPO.call(HTMLElementPrototype, documentElement),
        safeProperty = IE8 ? function (o, k, d) {
      o[k] = d.value;return o;
    } : defineProperty$$1,
        isValidNode = IE8 ? function (node) {
      return node.nodeType === 1;
    } : function (node) {
      return iPO.call(HTMLElementPrototype, node);
    },
        targets = IE8 && [],
        attachShadow = HTMLElementPrototype.attachShadow,
        cloneNode = HTMLElementPrototype.cloneNode,
        dispatchEvent = HTMLElementPrototype.dispatchEvent,
        getAttribute = HTMLElementPrototype.getAttribute,
        hasAttribute = HTMLElementPrototype.hasAttribute,
        removeAttribute = HTMLElementPrototype.removeAttribute,
        setAttribute = HTMLElementPrototype.setAttribute,
        createElement = document.createElement,
        patchedCreateElement = createElement,
        attributesObserver = MutationObserver && { attributes: true, characterData: true, attributeOldValue: true },
        DOMAttrModified = MutationObserver || function (e) {
      doesNotSupportDOMAttrModified = false;documentElement.removeEventListener(DOM_ATTR_MODIFIED, DOMAttrModified);
    },
        asapQueue,
        asapTimer = 0,
        V0 = REGISTER_ELEMENT in document && !/^force-all/.test(polyfill.type),
        setListener = true,
        justSetup = false,
        doesNotSupportDOMAttrModified = true,
        dropDomContentLoaded = true,
        notFromInnerHTMLHelper = true,
        onSubtreeModified,
        callDOMAttrModified,
        getAttributesMirror,
        observer,
        observe,
        patchIfNotAlready,
        patch,
        tmp;if (MutationObserver) {
      tmp = document.createElement("div");tmp.innerHTML = "<div><div></div></div>";new MutationObserver(function (mutations, observer) {
        if (mutations[0] && mutations[0].type == "childList" && !mutations[0].removedNodes[0].childNodes.length) {
          tmp = gOPD(HTMLElementPrototype, "innerHTML");var _set = tmp && tmp.set;if (_set) defineProperty$$1(HTMLElementPrototype, "innerHTML", { set: function set$$1(value) {
              while (this.lastChild) {
                this.removeChild(this.lastChild);
              }_set.call(this, value);
            } });
        }observer.disconnect();tmp = null;
      }).observe(tmp, { childList: true, subtree: true });tmp.innerHTML = "";
    }if (!V0) {
      if (sPO || hasProto) {
        patchIfNotAlready = function patchIfNotAlready(node, proto) {
          if (!iPO.call(proto, node)) {
            setupNode(node, proto);
          }
        };patch = setupNode;
      } else {
        patchIfNotAlready = function patchIfNotAlready(node, proto) {
          if (!node[EXPANDO_UID]) {
            node[EXPANDO_UID] = Object(true);setupNode(node, proto);
          }
        };patch = patchIfNotAlready;
      }if (IE8) {
        doesNotSupportDOMAttrModified = false;(function () {
          var descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
              addEventListener = descriptor.value,
              patchedRemoveAttribute = function patchedRemoveAttribute(name) {
            var e = new CustomEvent(DOM_ATTR_MODIFIED, { bubbles: true });e.attrName = name;e.prevValue = getAttribute.call(this, name);e.newValue = null;e[REMOVAL] = e.attrChange = 2;removeAttribute.call(this, name);dispatchEvent.call(this, e);
          },
              patchedSetAttribute = function patchedSetAttribute(name, value) {
            var had = hasAttribute.call(this, name),
                old = had && getAttribute.call(this, name),
                e = new CustomEvent(DOM_ATTR_MODIFIED, { bubbles: true });setAttribute.call(this, name, value);e.attrName = name;e.prevValue = had ? old : null;e.newValue = value;if (had) {
              e[MODIFICATION] = e.attrChange = 1;
            } else {
              e[ADDITION] = e.attrChange = 0;
            }dispatchEvent.call(this, e);
          },
              onPropertyChange = function onPropertyChange(e) {
            var node = e.currentTarget,
                superSecret = node[EXPANDO_UID],
                propertyName = e.propertyName,
                event;if (superSecret.hasOwnProperty(propertyName)) {
              superSecret = superSecret[propertyName];event = new CustomEvent(DOM_ATTR_MODIFIED, { bubbles: true });event.attrName = superSecret.name;event.prevValue = superSecret.value || null;event.newValue = superSecret.value = node[propertyName] || null;if (event.prevValue == null) {
                event[ADDITION] = event.attrChange = 0;
              } else {
                event[MODIFICATION] = event.attrChange = 1;
              }dispatchEvent.call(node, event);
            }
          };descriptor.value = function (type, handler, capture) {
            if (type === DOM_ATTR_MODIFIED && this[ATTRIBUTE_CHANGED_CALLBACK] && this.setAttribute !== patchedSetAttribute) {
              this[EXPANDO_UID] = { className: { name: "class", value: this.className } };this.setAttribute = patchedSetAttribute;this.removeAttribute = patchedRemoveAttribute;addEventListener.call(this, "propertychange", onPropertyChange);
            }addEventListener.call(this, type, handler, capture);
          };defineProperty$$1(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
        })();
      } else if (!MutationObserver) {
        documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);documentElement.setAttribute(EXPANDO_UID, 1);documentElement.removeAttribute(EXPANDO_UID);if (doesNotSupportDOMAttrModified) {
          onSubtreeModified = function onSubtreeModified(e) {
            var node = this,
                oldAttributes,
                newAttributes,
                key;if (node === e.target) {
              oldAttributes = node[EXPANDO_UID];node[EXPANDO_UID] = newAttributes = getAttributesMirror(node);for (key in newAttributes) {
                if (!(key in oldAttributes)) {
                  return callDOMAttrModified(0, node, key, oldAttributes[key], newAttributes[key], ADDITION);
                } else if (newAttributes[key] !== oldAttributes[key]) {
                  return callDOMAttrModified(1, node, key, oldAttributes[key], newAttributes[key], MODIFICATION);
                }
              }for (key in oldAttributes) {
                if (!(key in newAttributes)) {
                  return callDOMAttrModified(2, node, key, oldAttributes[key], newAttributes[key], REMOVAL);
                }
              }
            }
          };callDOMAttrModified = function callDOMAttrModified(attrChange, currentTarget, attrName, prevValue, newValue, action) {
            var e = { attrChange: attrChange, currentTarget: currentTarget, attrName: attrName, prevValue: prevValue, newValue: newValue };e[action] = attrChange;onDOMAttrModified(e);
          };getAttributesMirror = function getAttributesMirror(node) {
            for (var attr, name, result = {}, attributes = node.attributes, i = 0, length = attributes.length; i < length; i++) {
              attr = attributes[i];name = attr.name;if (name !== "setAttribute") {
                result[name] = attr.value;
              }
            }return result;
          };
        }
      }document[REGISTER_ELEMENT] = function registerElement(type, options) {
        upperType = type.toUpperCase();if (setListener) {
          setListener = false;if (MutationObserver) {
            observer = function (attached, detached) {
              function checkEmAll(list, callback) {
                for (var i = 0, length = list.length; i < length; callback(list[i++])) {}
              }return new MutationObserver(function (records) {
                for (var current, node, newValue, i = 0, length = records.length; i < length; i++) {
                  current = records[i];if (current.type === "childList") {
                    checkEmAll(current.addedNodes, attached);checkEmAll(current.removedNodes, detached);
                  } else {
                    node = current.target;if (notFromInnerHTMLHelper && node[ATTRIBUTE_CHANGED_CALLBACK] && current.attributeName !== "style") {
                      newValue = getAttribute.call(node, current.attributeName);if (newValue !== current.oldValue) {
                        node[ATTRIBUTE_CHANGED_CALLBACK](current.attributeName, current.oldValue, newValue);
                      }
                    }
                  }
                }
              });
            }(executeAction(ATTACHED), executeAction(DETACHED));observe = function observe(node) {
              observer.observe(node, { childList: true, subtree: true });return node;
            };observe(document);if (attachShadow) {
              HTMLElementPrototype.attachShadow = function () {
                return observe(attachShadow.apply(this, arguments));
              };
            }
          } else {
            asapQueue = [];document[ADD_EVENT_LISTENER]("DOMNodeInserted", onDOMNode(ATTACHED));document[ADD_EVENT_LISTENER]("DOMNodeRemoved", onDOMNode(DETACHED));
          }document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);document[ADD_EVENT_LISTENER]("readystatechange", onReadyStateChange);HTMLElementPrototype.cloneNode = function (deep) {
            var node = cloneNode.call(this, !!deep),
                i = getTypeIndex(node);if (-1 < i) patch(node, protos[i]);if (deep && query.length) loopAndSetup(node.querySelectorAll(query));return node;
          };
        }if (justSetup) return justSetup = false;if (-2 < indexOf.call(types, PREFIX_IS + upperType) + indexOf.call(types, PREFIX_TAG + upperType)) {
          throwTypeError(type);
        }if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
          throw new Error("The type " + type + " is invalid");
        }var constructor = function constructor() {
          return extending ? document.createElement(nodeName, upperType) : document.createElement(nodeName);
        },
            opt = options || OP,
            extending = hOP.call(opt, EXTENDS),
            nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
            upperType,
            i;if (extending && -1 < indexOf.call(types, PREFIX_TAG + nodeName)) {
          throwTypeError(nodeName);
        }i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;query = query.concat(query.length ? "," : "", extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName);constructor.prototype = protos[i] = hOP.call(opt, "prototype") ? opt.prototype : create(HTMLElementPrototype);if (query.length) loopAndVerify(document.querySelectorAll(query), ATTACHED);return constructor;
      };document.createElement = patchedCreateElement = function patchedCreateElement(localName, typeExtension) {
        var is = getIs(typeExtension),
            node = is ? createElement.call(document, localName, secondArgument(is)) : createElement.call(document, localName),
            name = "" + localName,
            i = indexOf.call(types, (is ? PREFIX_IS : PREFIX_TAG) + (is || name).toUpperCase()),
            setup = -1 < i;if (is) {
          node.setAttribute("is", is = is.toLowerCase());if (setup) {
            setup = isInQSA(name.toUpperCase(), is);
          }
        }notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;if (setup) patch(node, protos[i]);return node;
      };
    }function ASAP() {
      var queue = asapQueue.splice(0, asapQueue.length);asapTimer = 0;while (queue.length) {
        queue.shift().call(null, queue.shift());
      }
    }function loopAndVerify(list, action) {
      for (var i = 0, length = list.length; i < length; i++) {
        verifyAndSetupAndAction(list[i], action);
      }
    }function loopAndSetup(list) {
      for (var i = 0, length = list.length, node; i < length; i++) {
        node = list[i];patch(node, protos[getTypeIndex(node)]);
      }
    }function executeAction(action) {
      return function (node) {
        if (isValidNode(node)) {
          verifyAndSetupAndAction(node, action);if (query.length) loopAndVerify(node.querySelectorAll(query), action);
        }
      };
    }function getTypeIndex(target) {
      var is = getAttribute.call(target, "is"),
          nodeName = target.nodeName.toUpperCase(),
          i = indexOf.call(types, is ? PREFIX_IS + is.toUpperCase() : PREFIX_TAG + nodeName);return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
    }function isInQSA(name, type) {
      return -1 < query.indexOf(name + '[is="' + type + '"]');
    }function onDOMAttrModified(e) {
      var node = e.currentTarget,
          attrChange = e.attrChange,
          attrName = e.attrName,
          target = e.target,
          addition = e[ADDITION] || 2,
          removal = e[REMOVAL] || 3;if (notFromInnerHTMLHelper && (!target || target === node) && node[ATTRIBUTE_CHANGED_CALLBACK] && attrName !== "style" && (e.prevValue !== e.newValue || e.newValue === "" && (attrChange === addition || attrChange === removal))) {
        node[ATTRIBUTE_CHANGED_CALLBACK](attrName, attrChange === addition ? null : e.prevValue, attrChange === removal ? null : e.newValue);
      }
    }function onDOMNode(action) {
      var executor = executeAction(action);return function (e) {
        asapQueue.push(executor, e.target);if (asapTimer) clearTimeout(asapTimer);asapTimer = setTimeout(ASAP, 1);
      };
    }function onReadyStateChange(e) {
      if (dropDomContentLoaded) {
        dropDomContentLoaded = false;e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
      }if (query.length) loopAndVerify((e.target || document).querySelectorAll(query), e.detail === DETACHED ? DETACHED : ATTACHED);if (IE8) purge();
    }function patchedSetAttribute(name, value) {
      var self = this;setAttribute.call(self, name, value);onSubtreeModified.call(self, { target: self });
    }function setupNode(node, proto) {
      setPrototype(node, proto);if (observer) {
        observer.observe(node, attributesObserver);
      } else {
        if (doesNotSupportDOMAttrModified) {
          node.setAttribute = patchedSetAttribute;node[EXPANDO_UID] = getAttributesMirror(node);node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
        }node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
      }if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
        node.created = true;node[CREATED_CALLBACK]();node.created = false;
      }
    }function purge() {
      for (var node, i = 0, length = targets.length; i < length; i++) {
        node = targets[i];if (!documentElement.contains(node)) {
          length--;targets.splice(i--, 1);verifyAndSetupAndAction(node, DETACHED);
        }
      }
    }function throwTypeError(type) {
      throw new Error("A " + type + " type is already registered");
    }function verifyAndSetupAndAction(node, action) {
      var fn,
          i = getTypeIndex(node),
          counterAction;if (-1 < i) {
        patchIfNotAlready(node, protos[i]);i = 0;if (action === ATTACHED && !node[ATTACHED]) {
          node[DETACHED] = false;node[ATTACHED] = true;counterAction = "connected";i = 1;if (IE8 && indexOf.call(targets, node) < 0) {
            targets.push(node);
          }
        } else if (action === DETACHED && !node[DETACHED]) {
          node[ATTACHED] = false;node[DETACHED] = true;counterAction = "disconnected";i = 1;
        }if (i && (fn = node[action + CALLBACK] || node[counterAction + CALLBACK])) fn.call(node);
      }
    }function CustomElementRegistry() {}CustomElementRegistry.prototype = { constructor: CustomElementRegistry, define: usableCustomElements ? function (name, Class, options) {
        if (options) {
          CERDefine(name, Class, options);
        } else {
          var NAME = name.toUpperCase();constructors[NAME] = { constructor: Class, create: [NAME] };nodeNames.set(Class, NAME);customElements.define(name, Class);
        }
      } : CERDefine, get: usableCustomElements ? function (name) {
        return customElements.get(name) || get$$1(name);
      } : get$$1, whenDefined: usableCustomElements ? function (name) {
        return Promise.race([customElements.whenDefined(name), whenDefined(name)]);
      } : whenDefined };function CERDefine(name, Class, options) {
      var is = options && options[EXTENDS] || "",
          CProto = Class.prototype,
          proto = create(CProto),
          attributes = Class.observedAttributes || empty,
          definition = { prototype: proto };safeProperty(proto, CREATED_CALLBACK, { value: function value() {
          if (justCreated) justCreated = false;else if (!this[DRECEV1]) {
            this[DRECEV1] = true;new Class(this);if (CProto[CREATED_CALLBACK]) CProto[CREATED_CALLBACK].call(this);var info = constructors[nodeNames.get(Class)];if (!usableCustomElements || info.create.length > 1) {
              notifyAttributes(this);
            }
          }
        } });safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, { value: function value(name) {
          if (-1 < indexOf.call(attributes, name)) CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
        } });if (CProto[CONNECTED_CALLBACK]) {
        safeProperty(proto, ATTACHED_CALLBACK, { value: CProto[CONNECTED_CALLBACK] });
      }if (CProto[DISCONNECTED_CALLBACK]) {
        safeProperty(proto, DETACHED_CALLBACK, { value: CProto[DISCONNECTED_CALLBACK] });
      }if (is) definition[EXTENDS] = is;name = name.toUpperCase();constructors[name] = { constructor: Class, create: is ? [is, secondArgument(name)] : [name] };nodeNames.set(Class, name);document[REGISTER_ELEMENT](name.toLowerCase(), definition);whenDefined(name);waitingList[name].r();
    }function get$$1(name) {
      var info = constructors[name.toUpperCase()];return info && info.constructor;
    }function getIs(options) {
      return typeof options === "string" ? options : options && options.is || "";
    }function notifyAttributes(self) {
      var callback = self[ATTRIBUTE_CHANGED_CALLBACK],
          attributes = callback ? self.attributes : empty,
          i = attributes.length,
          attribute;while (i--) {
        attribute = attributes[i];callback.call(self, attribute.name || attribute.nodeName, null, attribute.value || attribute.nodeValue);
      }
    }function whenDefined(name) {
      name = name.toUpperCase();if (!(name in waitingList)) {
        waitingList[name] = {};waitingList[name].p = new Promise(function (resolve) {
          waitingList[name].r = resolve;
        });
      }return waitingList[name].p;
    }function polyfillV1() {
      if (customElements) delete window.customElements;defineProperty$$1(window, "customElements", { configurable: true, value: new CustomElementRegistry() });defineProperty$$1(window, "CustomElementRegistry", { configurable: true, value: CustomElementRegistry });for (var patchClass = function patchClass(name) {
        var Class = window[name];if (Class) {
          window[name] = function CustomElementsV1(self) {
            var info, isNative;if (!self) self = this;if (!self[DRECEV1]) {
              justCreated = true;info = constructors[nodeNames.get(self.constructor)];isNative = usableCustomElements && info.create.length === 1;self = isNative ? Reflect.construct(Class, empty, info.constructor) : document.createElement.apply(document, info.create);self[DRECEV1] = true;justCreated = false;if (!isNative) notifyAttributes(self);
            }return self;
          };window[name].prototype = Class.prototype;try {
            Class.prototype.constructor = window[name];
          } catch (WebKit) {
  defineProperty$$1(Class, DRECEV1, { value: window[name] });
          }
        }
      }, Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/), i = Classes.length; i--; patchClass(Classes[i])) {}document.createElement = function (name, options) {
        var is = getIs(options);return is ? patchedCreateElement.call(this, name, secondArgument(is)) : patchedCreateElement.call(this, name);
      };if (!V0) {
        justSetup = true;document[REGISTER_ELEMENT]("");
      }
    }if (!customElements || /^force/.test(polyfill.type)) polyfillV1();else if (!polyfill.noBuiltIn) {
      try {
        (function (DRE, options, name) {
          var re = new RegExp("^<a\\s+is=('|\")" + name + "\\1></a>$");options[EXTENDS] = "a";DRE.prototype = create(HTMLAnchorElement.prototype);DRE.prototype.constructor = DRE;window.customElements.define(name, DRE, options);if (!re.test(document.createElement("a", { is: name }).outerHTML) || !re.test(new DRE().outerHTML)) {
            throw options;
          }
        })(function DRE() {
          return Reflect.construct(HTMLAnchorElement, [], DRE);
        }, {}, "document-register-element-a");
      } catch (o_O) {
        polyfillV1();
      }
    }if (!polyfill.noBuiltIn) {
      try {
        createElement.call(document, "a", "a");
      } catch (FireFox) {
        secondArgument = function secondArgument(is) {
          return { is: is.toLowerCase() };
        };
      }
    }
  })(window);

  /* eslint-disable */
  (function (global) {

    //
    // Check for native Promise and it has correct interface
    //

    var NativePromise = global['Promise'];
    var nativePromiseSupported = NativePromise &&
    // Some of these methods are missing from
    // Firefox/Chrome experimental implementations
    'resolve' in NativePromise && 'reject' in NativePromise && 'all' in NativePromise && 'race' in NativePromise &&
    // Older version of the spec had a resolver object
    // as the arg rather than a function
    function () {
      var resolve;
      new NativePromise(function (r) {
        resolve = r;
      });
      return typeof resolve === 'function';
    }();

    //
    // export if necessary
    //

    // in browser add to global
    if (!nativePromiseSupported) global['Promise'] = Promise;

    if (typeof exports !== 'undefined' && exports) {
      // node.js
      exports.Promise = nativePromiseSupported ? NativePromise : Promise;
      exports.Polyfill = Promise;
    } else {
      // AMD
      if (typeof define == 'function' && define.amd) {
        define(function () {
          return nativePromiseSupported ? NativePromise : Promise;
        });
      }
    }

    //
    // Polyfill
    //

    var PENDING = 'pending';
    var SEALED = 'sealed';
    var FULFILLED = 'fulfilled';
    var REJECTED = 'rejected';
    var NOOP = function NOOP() {};

    function isArray(value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    }

    // async calls
    var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
    var asyncQueue = [];
    var asyncTimer;

    function asyncFlush() {
      // run promise callbacks
      for (var i = 0; i < asyncQueue.length; i++) {
        asyncQueue[i][0](asyncQueue[i][1]);
      } // reset async asyncQueue
      asyncQueue = [];
      asyncTimer = false;
    }

    function asyncCall(callback, arg) {
      asyncQueue.push([callback, arg]);

      if (!asyncTimer) {
        asyncTimer = true;
        asyncSetTimer(asyncFlush, 0);
      }
    }

    function invokeResolver(resolver, promise) {
      function resolvePromise(value) {
        resolve(promise, value);
      }

      function rejectPromise(reason) {
        reject(promise, reason);
      }

      try {
        resolver(resolvePromise, rejectPromise);
      } catch (e) {
        rejectPromise(e);
      }
    }

    function invokeCallback(subscriber) {
      var owner = subscriber.owner;
      var settled = owner.state_;
      var value = owner.data_;
      var callback = subscriber[settled];
      var promise = subscriber.then;

      if (typeof callback === 'function') {
        settled = FULFILLED;
        try {
          value = callback(value);
        } catch (e) {
          reject(promise, e);
        }
      }

      if (!handleThenable(promise, value)) {
        if (settled === FULFILLED) resolve(promise, value);

        if (settled === REJECTED) reject(promise, value);
      }
    }

    function handleThenable(promise, value) {
      var resolved;

      try {
        if (promise === value) throw new TypeError('A promises callback cannot return that same promise.');

        if (value && (typeof value === 'function' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object')) {
          var then = value.then; // then should be retrived only once

          if (typeof then === 'function') {
            then.call(value, function (val) {
              if (!resolved) {
                resolved = true;

                if (value !== val) resolve(promise, val);else fulfill(promise, val);
              }
            }, function (reason) {
              if (!resolved) {
                resolved = true;

                reject(promise, reason);
              }
            });

            return true;
          }
        }
      } catch (e) {
        if (!resolved) reject(promise, e);

        return true;
      }

      return false;
    }

    function resolve(promise, value) {
      if (promise === value || !handleThenable(promise, value)) fulfill(promise, value);
    }

    function fulfill(promise, value) {
      if (promise.state_ === PENDING) {
        promise.state_ = SEALED;
        promise.data_ = value;

        asyncCall(publishFulfillment, promise);
      }
    }

    function reject(promise, reason) {
      if (promise.state_ === PENDING) {
        promise.state_ = SEALED;
        promise.data_ = reason;

        asyncCall(publishRejection, promise);
      }
    }

    function publish(promise) {
      var callbacks = promise.then_;
      promise.then_ = undefined;

      for (var i = 0; i < callbacks.length; i++) {
        invokeCallback(callbacks[i]);
      }
    }

    function publishFulfillment(promise) {
      promise.state_ = FULFILLED;
      publish(promise);
    }

    function publishRejection(promise) {
      promise.state_ = REJECTED;
      publish(promise);
    }

    /**
    * @class
    */
    function Promise(resolver) {
      if (typeof resolver !== 'function') throw new TypeError('Promise constructor takes a function argument');

      if (this instanceof Promise === false) throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

      this.then_ = [];

      invokeResolver(resolver, this);
    }

    Promise.prototype = {
      constructor: Promise,

      state_: PENDING,
      then_: null,
      data_: undefined,

      then: function then(onFulfillment, onRejection) {
        var subscriber = {
          owner: this,
          then: new this.constructor(NOOP),
          fulfilled: onFulfillment,
          rejected: onRejection
        };

        if (this.state_ === FULFILLED || this.state_ === REJECTED) {
          // already resolved, call callback async
          asyncCall(invokeCallback, subscriber);
        } else {
          // subscribe
          this.then_.push(subscriber);
        }

        return subscriber.then;
      },

      'catch': function _catch(onRejection) {
        return this.then(null, onRejection);
      }
    };

    Promise.all = function (promises) {
      var Class = this;

      if (!isArray(promises)) throw new TypeError('You must pass an array to Promise.all().');

      return new Class(function (resolve, reject) {
        var results = [];
        var remaining = 0;

        function resolver(index) {
          remaining++;
          return function (value) {
            results[index] = value;
            if (! --remaining) resolve(results);
          };
        }

        for (var i = 0, promise; i < promises.length; i++) {
          promise = promises[i];

          if (promise && typeof promise.then === 'function') promise.then(resolver(i), reject);else results[i] = promise;
        }

        if (!remaining) resolve(results);
      });
    };

    Promise.race = function (promises) {
      var Class = this;

      if (!isArray(promises)) throw new TypeError('You must pass an array to Promise.race().');

      return new Class(function (resolve, reject) {
        for (var i = 0, promise; i < promises.length; i++) {
          promise = promises[i];

          if (promise && typeof promise.then === 'function') promise.then(resolve, reject);else resolve(promise);
        }
      });
    };

    Promise.resolve = function (value) {
      var Class = this;

      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Class) return value;

      return new Class(function (resolve) {
        resolve(value);
      });
    };

    Promise.reject = function (reason) {
      var Class = this;

      return new Class(function (resolve, reject) {
        reject(reason);
      });
    };
  })(typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : typeof self != 'undefined' ? self : window);

  /* eslint-disable */
  (function () {
    function assign(target, firstSource) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }

    if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: assign
      });
    }
  })();

  /**
   * @file EventEmitter
   * @author sekiyika(pengxing@baidu.com)
   */

  /* eslint-disable fecs-camelcase */

  /**
   * For determining whether a string is splitted by space or not.
   *
   * @const
   * @inner
   * @type {RegExp}
   */
  var MULTI_REG = /\s+/;

  var EventEmitter = function () {
    /**
     * EventEmitter
     *
     * @constructor
     * @param {?Object} opt Options
     */
    function EventEmitter(opt) {
      classCallCheck(this, EventEmitter);

      if (opt) {
        opt.context && this.setEventContext(opt.context);

        opt.createEventCallback && (this._createEventCallback = opt.createEventCallback);
        opt.removeEventCallback && (this._removeEventCallback = opt.removeEventCallback);
        opt.bindEventCallback && (this._bindEventCallback = opt.bindEventCallback);
      }
    }

    /**
     * Mix EventEmitter's prototype into target object
     *
     * @static
     * @param {Object} obj destination obj
     * @return {Object}
     */


    createClass(EventEmitter, [{
      key: 'on',


      /**
       * Add handler to events
       *
       * @param {string} name name
       * @param {Function} handler handler
       * @return {Object}
       */
      value: function on(name, handler) {
        if (multiArgs(this, this.on, name, handler)) {
          return this;
        }
        this._getEvent(name).push(handler);
        this._bindEventCallback(name, handler);
        return this;
      }

      /**
       * Remove handler from events.
       *
       * @param {?string} name name
       * @param {?Function} handler handler
       * @return {?Object}
       */

    }, {
      key: 'off',
      value: function off(name, handler) {
        // If arguments` length is 0, remove all handlers.
        if (!name) {
          if (!handler) {
            this.off(Object.keys(this.__events).join(' '), handler);
          }
          return null;
        }
        if (multiArgs(this, this.off, name, handler)) {
          return null;
        }

        var list = void 0;
        if (handler) {
          list = this._getEvent(name);
          var index = list.indexOf(handler);
          if (index > -1) {
            list.splice(index, 1);
          }
        }
        if (!handler || list && list.length === 0) {
          delete this.__events[name];
          this._removeEventCallback(name);
        }
        return name ? this.__events && this.__events[name] : null;
      }

      /**
       * Add a one-off handler to events
       *
       * @param {string} name name
       * @param {Function} handler handler
       * @return {Function} the unbinder of the handler
       */

    }, {
      key: 'once',
      value: function once(name, handler) {
        var cb = handler.bind(this);
        var self = this;
        cb.__once = true;
        this.on(name, cb);
        return function () {
          self.off(name, cb);
          cb = self = null;
        };
      }

      /**
       * Trigger events.
       *
       * @param {string} name name
       */

    }, {
      key: 'trigger',
      value: function trigger(name) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (multiArgs(this, this.trigger, name, args)) {
          return;
        }
        var list = this._getEvent(name);
        var context = this.__eventContext || this;
        for (var i = 0; i < list.length; i++) {
          list[i].apply(context, args);
          if (list[i].__once) {
            list.splice(i, 1);
          }
        }
      }

      /**
       * Set the handlers' context
       *
       * @param {Function} context context
       */

    }, {
      key: 'setEventContext',
      value: function setEventContext(context) {
        this.__eventContext = context || this;
      }

      /**
       * Get an event's handler list. If not exist, create it.
       *
       * @param {string} name name
       * @return {Array}
       */

    }, {
      key: '_getEvent',
      value: function _getEvent(name) {
        if (!this.__events) {
          this.__events = {};
        }
        if (!this.__events[name]) {
          this.__events[name] = [];
          this._createEventCallback(name, this.__events[name]);
        }
        return this.__events[name];
      }

      /**
       * Called when an event is created.
       *
       * @param {string} name Event name
       * @param {Array.<Function>} handlers The bound handlers
       */

    }, {
      key: '_createEventCallback',
      value: function _createEventCallback(name, handlers) {}

      /**
       * Called when an event is removed.
       *
       * @param {string} name Event name
       */

    }, {
      key: '_removeEventCallback',
      value: function _removeEventCallback(name) {}

      /**
       * Called when an event is binding.
       *
       * @param {string} name Event name
       * @param {Function} handler Event handler
       */

    }, {
      key: '_bindEventCallback',
      value: function _bindEventCallback(name, handler) {}
    }], [{
      key: 'mixin',
      value: function mixin(obj) {
        var whitelist = ['on', 'off', 'once', 'trigger', 'setEventContext', '_bindEventCallback', '_createEventCallback', '_getEvent', '_removeEventCallback'];

        for (var i = 0, len = whitelist.length; i < len; i++) {
          var key = whitelist[i];
          if (obj[key]) {
            continue;
          }

          obj[key] = EventEmitter.prototype[key];
        }

        return obj;
      }
    }]);
    return EventEmitter;
  }();

  /**
   * If a string is splitted by space, convert string to array and
   * execute function N(n = Array.length) times with the args.
   * Return the result that the string is multiple or not.
   *
   * @param {Object} obj The execute context
   * @param {Function} fn The function to be runned
   * @param {string} name name
   * @param {Array} args args
   * @return {boolean}
   */


  function multiArgs(obj, fn, name, args) {
    if (MULTI_REG.test(name)) {
      var nameList = name.split(MULTI_REG);
      var isApply = typeof args !== 'function';
      for (var i = 0; i < nameList.length; i++) {
        isApply ? fn.apply(obj, [nameList[i]].concat(args)) : fn.call(obj, nameList[i], args);
      }
      return true;
    }
    return false;
  }

  /**
   * @file custom-element.js
   * @author huanghuiquan (huanghuiquan@baidu.com)
   */

  var CustomElement = function () {
    function CustomElement(element) {
      classCallCheck(this, CustomElement);

      /** @public @type {MIPElement} */
      this.element = element;

      // 不推荐使用
      if (this.init) {
        this.init();
      }
    }

    /**
     * Set observed attributes
     *
     * @static
     * @return {Array} array of attribute name
     */


    createClass(CustomElement, [{
      key: 'connectedCallback',


      /**
       * Called when the MIPElement's append to dom.
       */
      value: function connectedCallback() {}

      /**
       * Called when the MIPElement's remove from dom.
       */

    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {}

      /**
       * Called when the MIPElement's attribute is changed.
       */

    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback() {}

      /**
       * Called when the MIPElement first enters the viewport.
       */

    }, {
      key: 'firstInviewCallback',
      value: function firstInviewCallback() {}

      /**
       * Called when the MIPElement has entered or exited the viewport.
       */

    }, {
      key: 'viewportCallback',
      value: function viewportCallback() {}

      /**
       * Control whether the MIPElement is rendred ahead.
       *
       * @return {boolean} If the result is TRUE, the element will be rendred ahead.
       */

    }, {
      key: 'prerenderAllowed',
      value: function prerenderAllowed() {
        return false;
      }

      /**
       * Return the current component containing resources.
       * If it returns true, complete should be called.
       *
       * @return {boolean} whether has resource or not
       */

    }, {
      key: 'hasResources',
      value: function hasResources() {
        return false;
      }

      /**
       * Called when the MIPElement is first inserted into the document.
       */

    }, {
      key: 'build',
      value: function build() {}

      /**
       * Requests the element to unload any expensive resources when the element
       * goes into non-visible state.
       *
       * @return {boolean}
       */

    }, {
      key: 'unlayoutCallback',
      value: function unlayoutCallback() {
        return false;
      }

      /**
       * Subclasses can override this method to create a dynamic placeholder
       * element and return it to be appended to the element. This will only
       * be called if the element doesn't already have a placeholder.
       * @return {?Element}
       */

    }, {
      key: 'createPlaceholderCallback',
      value: function createPlaceholderCallback() {
        return null;
      }

      /**
       * Called when the element should perform layout. At this point the element
       * should load/reload resources associated with it. This method is called
       * by the runtime and cannot be called manually. Returns promise that will
       * complete when loading is considered to be complete.
       *
       * @return {!Promise}
       */

    }, {
      key: 'layoutCallback',
      value: function layoutCallback() {
        return Promise.resolve();
      }

      /**
       * Called to notify the element that the first layout has been successfully
       * completed.
       */

    }, {
      key: 'firstLayoutCompleted',
      value: function firstLayoutCompleted() {}

      /**
       * Hides or shows the placeholder, if available.
       * @param {boolean} state
       */

    }, {
      key: 'togglePlaceholder',
      value: function togglePlaceholder(state) {
        this.element.togglePlaceholder(state);
      }

      /**
       * Indicate a element whether has a loading.
       */

    }, {
      key: 'isLoadingEnabled',
      value: function isLoadingEnabled() {
        return false;
      }

      /**
       * Apply the fill content style to an element
       *
       * @param {HTMLElement} ele element
       * @param {boolean} isReplaced whether replaced or not
       */

    }, {
      key: 'applyFillContent',
      value: function applyFillContent(ele, isReplaced) {
        ele.classList.add('mip-fill-content');
        if (isReplaced) {
          ele.classList.add('mip-replaced-content');
        }
      }

      /**
       * Expend current element's attributes which selected by attrs to an other object.
       *
       * @param {Array.<string>} attrs Attributes' name list
       * @param {Object} element The target element
       * @return {Object}
       */

    }, {
      key: 'expendAttr',
      value: function expendAttr(attrs, element) {
        for (var i = 0; i < attrs.length; i++) {
          var attr = attrs[i];
          if (this.element.hasAttribute(attr)) {
            var val = this.element.getAttribute(attr);
            element.setAttribute ? element.setAttribute(attr, val) : element[attr] = val;
          }
        }
        return element;
      }

      /**
       * Add event actions such as `this.addEventAction("default open", handler)`
       *
       * @param {string} name event name
       * @param {Function} handler event handler
       */

    }, {
      key: 'addEventAction',
      value: function addEventAction() /* name, handler */{
        var evt = this._actionEvent;
        if (!evt) {
          evt = this._actionEvent = new EventEmitter();
          evt.setEventContext(this);
        }

        evt.on.apply(evt, arguments);
      }

      /**
       * Trigger the handlers had been added by `addEventAction` of an action
       *
       * @param {Object} action The action object.
       */

    }, {
      key: 'executeEventAction',
      value: function executeEventAction(action) {
        var eventObj = this._actionEvent;
        if (action && eventObj) {
          eventObj.trigger(action.handler, action.event, action.arg);
        }
      }

      /**
       * Notice that resources are loaded.
       * @deprecated
       */

    }, {
      key: 'resourcesComplete',
      value: function resourcesComplete() {
        // istanbul ignore next
        this.element.resourcesComplete();
      }
    }], [{
      key: 'observedAttributes',
      get: function get$$1() {
        return [];
      }
    }]);
    return CustomElement;
  }();

  /**
   * @file fn
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * Throttle a function.
   *
   * @param {Function} fn fn
   * @param {number} delay The run time interval
   * @return {Function}
   */
  function throttle(fn, delay) {
    var context = void 0;
    var args = void 0;
    var timerId = void 0;
    var execTime = 0;

    !delay && (delay = 10);

    function exec() {
      timerId = 0;
      execTime = Date.now();
      fn.apply(context, args);
    }

    return function () {
      var delta = Date.now() - execTime;
      context = this;
      args = arguments;
      clearTimeout(timerId);
      if (delta >= delay) {
        exec();
      } else {
        timerId = setTimeout(exec, delay - delta);
      }
    };
  }

  /**
   * Get all values of an object.
   *
   * @param {Object} obj obj
   * @return {Array}
   */
  function values(obj) {
    var keys = Object.keys(obj);
    var length = keys.length;
    var ret = [];

    for (var i = 0; i < length; i++) {
      ret.push(obj[keys[i]]);
    }

    return ret;
  }

  /**
   * Return an object is a plain object or not.
   *
   * @param {Object} obj obj
   * @return {boolean}
   */
  function isPlainObject(obj) {
    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
  }

  /* eslint-disable fecs-camelcase */
  /**
   * Extend an object to another object.
   *
   * @inner
   * @param {Object} target target
   * @param {Object} source source
   * @param {boolean} deep Extend deeply
   */
  function _extend(target, source, deep) {
    for (var key in source) {
      if (deep) {
        if (isPlainObject(source[key])) {
          !isPlainObject(target[key]) && (target[key] = {});
        } else if (Array.isArray(source[key])) {
          !Array.isArray(target[key]) && (target[key] = []);
        } else {
          source[key] !== undefined && (target[key] = source[key]);
          continue;
        }
        _extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }

  /**
   * Extend some objects to an object.
   *
   * @param {Object} target target
   * @return {Object}
   */
  function extend(target) {
    var hasDeep = typeof target === 'boolean';
    var deep = false;
    if (hasDeep) {
      deep = target;
      target = arguments[1];
    }
    for (var i = hasDeep ? 2 : 1; i < arguments.length; i++) {
      _extend(target, arguments[i], deep);
    }
    return target;
  }

  /**
   * Pick some attributes from an object.
   *
   * @param {Object} obj obj
   * @return {Object}
   */
  function pick(obj) {
    var keys = arguments[1];
    var result = {};
    if (!Array.isArray(keys)) {
      keys = Array.prototype.slice.call(arguments, 1);
    }
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key in obj) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  /**
   * If varible is string type
   *
   * @param {string} string params string
   * @return {boolean} whehter varible is string
   */
  function isString(string) {
    return Object.prototype.toString.call(string) === '[object String]';
  }

  /**
   * Empty a property
   *
   * @param {Object} obj object
   * @param {string} key key of object
   */
  function del(obj, key) {
    if (!obj || !obj[key]) {
      return;
    }
    try {
      delete obj[key];
    } catch (e) {
      obj[key] = undefined;
    }
  }

  /**
   * if window has Touch event(is mobile) or not (is PC)
   *
   * @return {boolean} if window has Touch event(is mobile) or not (is PC)
   */
  function hasTouch() {
    return 'ontouchstart' in window || window.navigator.maxTouchPoints !== undefined && window.navigator.maxTouchPoints > 0 || window.DocumentTouch !== undefined;
  }

  /**
   * Whether pageUrl is mip cache url.
   *
   * @param {string} pageUrl - current page url.
   * @return {boolean} isCacheUrl.
   */
  function isCacheUrl(pageUrl) {
    return (/mipcache.bdstatic.com/.test(pageUrl) || /^(\/\/|http:\/\/|https:\/\/)[^.]+.mipcdn.com\/(stati)?c\//.test(pageUrl)
    );
  }

  /**
   * 获取 SF 创建的第一个 iframe 的 name，在实例化 messager 时会使用到。
   * 如果是 MIP2 的子页面，通过 window.name 由父页面传递下来。
   * 格式如 iframe-shell-xxxxxx
   */
  function getRootName(name) {
    if (!name) {
      return '';
    }

    if (/^iframe-shell/.test(name)) {
      return name;
    }

    try {
      var info = JSON.parse(name);
      return info.rootName;
    } catch (e) {
      return name;
    }
  }

  var raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout.bind(window);

  var fn = {
    throttle: throttle,
    values: values,
    extend: extend,
    pick: pick,
    isPlainObject: isPlainObject,
    isString: isString,
    del: del,
    hasTouch: hasTouch,
    isCacheUrl: isCacheUrl,
    getRootName: getRootName,
    raf: raf
  };

  /**
   * @file Platform Function. Support identification system, engine, browser type
   * @author sekiyika(pengxing@baidu.com)
   */

  /* globals top */

  /**
   * Platform class
   *
   * @class
   */

  var Platform = function () {
    function Platform() {
      classCallCheck(this, Platform);

      // system
      // deprecated
      this.isIos = false;
      this.isIOS = false;
      this.isAndroid = false;
      // browser
      this.isWechatApp = false;
      this.isBaiduApp = false;
      this.isWeiboApp = false;
      this.isQQApp = false;
      this.isAlipayApp = false;
      this.isUc = false;
      this.isBaidu = false;
      this.isQQ = false;
      this.isAdr = false;
      this.isSafari = false;
      this.isChrome = false;
      // deprecated
      this.isFireFox = false;
      this.isFirefox = false;
      // engine
      this.isTrident = false;
      this.isGecko = false;
      this.isWebkit = false;

      this.start();
    }

    /**
     * Judge system, iOS, android
     */


    createClass(Platform, [{
      key: '_matchOs',
      value: function _matchOs() {
        if (/iPhone|iPad|iPod/i.test(this._ua())) {
          this.isIos = true;
          this.isIOS = true;
        } else if (/Android/i.test(this._ua())) {
          this.isAndroid = true;
        }
      }

      /**
       * Judge browser type
       */

    }, {
      key: '_matchBrowser',
      value: function _matchBrowser() {
        var uaArray = this._ua().split('Mobile');
        var apps = uaArray && uaArray.length > 1 ? uaArray[1] : null;

        if (/\bmicromessenger\/([\d.]+)/i.test(apps)) {
          this.isWechatApp = true;
        } else if (/baiduboxapp/i.test(apps)) {
          this.isBaiduApp = true;
        } else if (/weibo/i.test(apps)) {
          this.isWeiboApp = true;
        } else if (/\sQQ/i.test(apps)) {
          this.isQQApp = true;
        } else if (/\sAlipay/i.test(apps)) {
          this.isAlipayApp = true;
        } else if (/UCBrowser/i.test(this._ua())) {
          this.isUc = true;
        } else if (/baidubrowser/i.test(this._ua())) {
          this.isBaidu = true;
        } else if (/qqbrowser\/([0-9.]+)/i.test(this._ua())) {
          this.isQQ = true;
        } else if (!/android/i.test(this._ua()) && /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(this._ua())) {
          this.isSafari = true;
        } else if (/(?:Chrome|CrMo|CriOS)\/([0-9]{1,2}\.[0-9]\.[0-9]{3,4}\.[0-9]+)/i.test(this._ua()) && !/samsung/i.test(this._ua())) {
          this.isChrome = true;
        } else if (/(firefox|FxiOS+)\/([0-9.ab]+)/i.test(this._ua())) {
          this.isFireFox = true;
          this.isFirefox = true;
        } else if (/android/i.test(this._ua()) && /Android[\s_\-/i686]?[\s_\-/](\d+[.\-_]\d+[.\-_]?\d*)/i.test(this._ua())) {
          this.isAdr = true;
        }
      }

      /**
       * Judge browser engine type
       */

    }, {
      key: '_matchEngine',
      value: function _matchEngine() {
        if (/\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/i.test(this._ua())) {
          this.isTrident = true;
        } else if (/\brv:([\d\w.]+).*\bgecko\/(\d+)/i.test(this._ua())) {
          this.isGecko = true;
        } else if (/\bapplewebkit[/]?([0-9.+]+)/i.test(this._ua())) {
          this.isWebkit = true;
        }
      }

      /**
       * get OS version
       *
       * @return {string}
       */

    }, {
      key: 'getOsVersion',
      value: function getOsVersion() {
        var osVersion = void 0;
        var result = void 0;
        if (this.isAndroid()) {
          result = /Android ([._\d]+)/.exec(this._ua()) || /Android\/([\d.]+)/.exec(this._ua());
          if (result && result.length > 1) {
            osVersion = result[1];
          }
        } else if (this.isIOS()) {
          result = /OS (\d+)_(\d+)_?(\d+)?/.exec(this._appVersion());
          if (result && result.length > 3) {
            osVersion = result[1] + '.' + result[2] + '.' + (result[3] | 0);
          }
        }
        return osVersion;
      }

      /**
       * Wrap engine, browser, engine varible to function
       */

    }, {
      key: '_wrapFun',
      value: function _wrapFun() {
        var self = this;
        for (var key in self) {
          if (self.hasOwnProperty(key) && typeof self[key] !== 'function') {
            var handle = function (key) {
              return key;
            }.bind(null, self[key]);
            self[key] = handle;
          }
        }
        self.needSpecialScroll = self.isIOS() && window !== top;
      }

      /**
       * Get user agent
       *
       * @return {string} user agent
       */

    }, {
      key: '_ua',
      value: function _ua() {
        return navigator.userAgent;
      }

      /**
       * Get app version
       *
       * @return {string} app version
       */

    }, {
      key: '_appVersion',
      value: function _appVersion() {
        return navigator.appVersion;
      }

      /**
       * Start match user agent
       *
       * @return {Object} self object
       */

    }, {
      key: '_start',
      value: function _start() {
        this._matchOs();
        this._matchBrowser();
        this._matchEngine();
        this._wrapFun();

        return this;
      }

      /**
       * empty fn
       */

    }, {
      key: 'start',
      value: function start() {
        this._start();
      }
    }]);
    return Platform;
  }();

  var platform = new Platform();

  /**
   * @file rect
   * @author sekiyika(pengxing@baidu.com)
   */

  // Save the native object or method.
  var docBody = document.body;
  var docElem = document.documentElement;
  var round = Math.round;

  /**
   * When page in IOS-IFRAME, scroll and rect have some bugs.
   * So we need add some elements to solve this problem.
   * https://medium.com/@dvoytenko/amp-ios-scrolling-and-position-fixed-b854a5a0d451
   *
   * @inner
   * @param {boolean} isEnd Create a ending element or not.
   * @return {?HTMLElement}
   */
  function patchForIOS(isEnd) {
    if (platform.needSpecialScroll && window !== window.top) {
      var element = document.createElement('div');
      element.style.cssText = isEnd ? 'position:absolute;width:0;height:0;visibility:hidden;' : 'position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;';
      docBody.appendChild(element);
      return element;
    }
    return null;
  }

  /**
   * Element for getting scroll values.
   *
   * @inner
   * @type {HTMLElement}
   */
  var getterElement = patchForIOS();

  /**
   * Element for setting scroll values.
   *
   * @inner
   * @type {HTMLElement}
   */
  var setterElement = patchForIOS();

  /**
   * Element for get page height.
   *
   * @inner
   * @type {HTMLElement}
   */
  var endElement = patchForIOS(true);

  /**
   * Browsers have some bugs in frame of IOS, the native getBoundingClientRect() also needs to recalculate,
   * so increase the "this" module.
   */
  var rect = {
    get: function get(left, top, width, height) {
      left = round(left);
      top = round(top);
      width = round(width);
      height = round(height);
      return {
        left: left,
        top: top,
        width: width,
        height: height,
        right: left + width,
        bottom: top + height
      };
    },


    /**
     * The scrollingElement
     * @type {HTMLElement}
     */
    scrollingElement: document.scrollingElement || platform.isWebkit() && docBody || docElem,

    /**
     * Get an element's rect.
     *
     * @param {HTMLElement} element element
     * @return {Object}
     */
    getElementRect: function getElementRect(element) {
      var clientRect = element.getBoundingClientRect();
      return this.get(clientRect.left + this.getScrollLeft(), clientRect.top + this.getScrollTop(), clientRect.width, clientRect.height);
    },


    /**
     * Get an element's offset.
     *
     * @param {HTMLElement} element element
     * @return {Object}
     */
    getElementOffset: function getElementOffset(element) {
      var clientRect = element.getBoundingClientRect();
      return {
        left: round(clientRect.left),
        top: round(clientRect.top),
        width: round(clientRect.width),
        height: round(clientRect.height)
      };
    },


    /**
     * Get scrollLeft
     *
     * @return {number}
     */
    getScrollLeft: function getScrollLeft() {
      return round(getterElement && -getterElement.getBoundingClientRect().left || this.scrollingElement.scrollLeft || window.pageXOffset || 0);
    },


    /**
     * Get scrollTop
     *
     * @return {number}
     */
    getScrollTop: function getScrollTop() {
      return round(getterElement && -getterElement.getBoundingClientRect().top || this.scrollingElement.scrollTop || window.pageYOffset || 0);
    },


    /**
     * Set scrollTop
     *
     * @param {number} top top
     */
    setScrollTop: function setScrollTop(top) {
      if (setterElement) {
        setterElement.style.top = top + 'px';
        // 如果页面头部是一个图片（或者其他后续会改变高度的元素）
        // 直接执行 scrollIntoView 会导致页面一打开就滚动到半当中，而不是头部
        // setTimeout 0 可以解决这个问题
        setTimeout(function () {
          return setterElement.scrollIntoView(true);
        }, 0);
      } else {
        this.scrollingElement.scrollTop = top;
      }
    },


    /**
     * Get scrollHeight
     *
     * @return {number}
     */
    getScrollHeight: function getScrollHeight() {
      if (endElement && endElement !== docBody.lastElementChild) {
        docBody.appendChild(endElement);
      }
      return round(endElement ? endElement.offsetTop : this.scrollingElement.scrollHeight);
    },


    /**
     * Get scrollWidth.
     *
     * @return {number}
     */
    getScrollWidth: function getScrollWidth() {
      return window.innerWidth;
    },


    /**
     * Whether two rect object are overlapped.
     *
     * @param {Object} rect1 rect1
     * @param {Object} rect2 rect2
     * @return {boolean}
     */
    overlapping: function overlapping(rect1, rect2) {
      return rect1.top <= rect2.bottom && rect2.top <= rect1.bottom && rect1.left <= rect2.right && rect2.left <= rect1.right;
    }
  };

  /**
   * @file Hash Function. Support hash get function
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * Hash class
   *
   * @class
   */

  var Hash = function () {
    function Hash() {
      classCallCheck(this, Hash);

      // init sessionStorage status
      this.ssEnabled = ssEnabled();
      this.pageId = window.location.href.split('#').shift();
      var hash = window.location.hash;
      if (this.ssEnabled) {
        var ssHash = window.sessionStorage.getItem(this.pageId) || '';
        // add the window.location.hash
        hash = ssHash + hash;
      }
      this.hashTree = this._getHashObj(hash);
      // if hash is exist, try storage the value into sessionStorage
      if (hash) {
        var curHash = this._getHashValue();
        if (this.ssEnabled) {
          window.sessionStorage.setItem(this.pageId, curHash);
        }
        window.location.hash = curHash;
      }
      this.bindAnchor();
    }

    /**
     * get hash value of specific key
     *
     * @param  {string} key key
     * @return {value}     [description]
     */


    createClass(Hash, [{
      key: 'get',
      value: function get$$1(key) {
        var hv = this.hashTree[key];
        return hv && hv.value ? hv.value : '';
      }

      /**
       * If there has anchor, Scroll to it
       *
       */

    }, {
      key: 'bindAnchor',
      value: function bindAnchor() {
        var anchor = this.hashTree.mipanchor;
        if (anchor && anchor.value) {
          if (document.readyState !== 'loading') {
            this.scrollToAnchor(anchor);
          } else {
            var handle = this.scrollToAnchor.bind(null, anchor);
            document.addEventListener('DOMContentLoaded', handle, false);
          }
        }
      }

      /**
       * Scroll to anchor
       *
       * @param {Object} anchor anchor object
       */

    }, {
      key: 'scrollToAnchor',
      value: function scrollToAnchor(anchor) {
        var ele = document.getElementById(anchor.value);
        if (ele) {
          var rt = rect.getElementOffset(ele);
          ele && rt.top && rect.setScrollTop(rt.top);
        }
      }

      /**
       * refresh hash object
       */

    }, {
      key: 'refreshHashTree',
      value: function refreshHashTree() {
        var originalHash = window.location.hash;
        this.hashTree = this._getHashObj(originalHash);
      }

      /**
       * get hash object from hash
       *
       * @param  {string} originalHash originalHash
       * @return {Object} object of each hash
       */

    }, {
      key: '_getHashObj',
      value: function _getHashObj(originalHash) {
        var hashObj = {};
        if (!originalHash) {
          return hashObj;
        }
        var hashString = originalHash.slice(originalHash.indexOf('#') + 1);
        var hashs = hashString.split('&');
        for (var key in hashs) {
          if (hashs.hasOwnProperty(key)) {
            var item = hashs[key];
            var hk = item;
            var hv = '';
            var idx = item.indexOf('=');
            // key invalid
            if (idx === 0) {
              continue;
            }
            // key valid
            if (idx !== -1) {
              hk = item.substring(0, idx);
              hv = item.slice(idx + 1);
            }
            hashObj[hk] = {
              value: hv,
              sep: idx !== -1 ? '=' : ''
            };
          }
        }
        return hashObj;
      }

      /**
       * get hash value from hash tree
       *
       * @return {string} hash
       */

    }, {
      key: '_getHashValue',
      value: function _getHashValue() {
        var hash = [];
        var hashTree = this.hashTree;
        for (var key in hashTree) {
          // dont not storage prerender hash
          if (key === 'prerender') {
            continue;
          }
          if (hashTree.hasOwnProperty(key)) {
            var val = hashTree[key].value;
            var sep = hashTree[key].sep;
            val = key + sep + val;
            hash.push(val);
          }
        }
        return hash.join('&');
      }
    }]);
    return Hash;
  }();

  /**
   * test ss is available
   *
   * @return {boolean} whether enabled or not
   */


  function ssEnabled() {
    var support = false;
    try {
      window.sessionStorage.setItem('_t', 1);
      window.sessionStorage.removeItem('_t');
      support = true;
    } catch (e) {}

    return support;
  }

  var hash = new Hash();

  /**
   * @file dom
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * Save documentElement.
   *
   * @inner
   * @type {Object}
   */
  var docElem$1 = document.documentElement;

  /**
   * Get the supported matches method.
   * @inner
   * @type {Function}
   */
  /* istanbul ignore next */
  var nativeMatches = docElem$1.matches || docElem$1.webkitMatchesSelector || docElem$1.mozMatchesSelector || docElem$1.oMatchesSelector || docElem$1.msMatchesSelector || docElem$1.matchesSelector;

  /**
   * Support for matches. Check whether a element matches a selector.
   *
   * @param {HTMLElement} element target element
   * @param {string} selector element selector
   * @return {boolean}
   */
  function matches(element, selector) {
    if (!element || element.nodeType !== 1) {
      return false;
    }
    return nativeMatches.call(element, selector);
  }

  /**
   * Support for closest. Find the closest parent node that matches the selector.
   *
   * @param {HTMLElement} element element
   * @param {string} selector selector
   * @return {?HTMLElement}
   */
  var closest = docElem$1.closest ? function (element, selector) {
    return element.closest(selector);
  } : /* istanbul ignore next */function (element, selector) {
    while (element) {
      if (matches(element, selector)) {
        return element;
      }
      element = element.parentNode;
    }
    return null;
  };

  /**
   * Support for contains.
   *
   * @param {HTMLElement} element parent node
   * @param {HTMLElement} child child node
   * @return {boolean}
   */
  var contains = docElem$1.contains ? function (element, child) {
    return element && element.contains(child);
  } : /* istanbul ignore next */function (element, child) {
    if (element === document) {
      element = document.documentElement || document.body.parentElement;
    }
    while (child) {
      if (element === child) {
        return true;
      }
      child = child.parentElement;
    }
    return false;
  };

  /**
   * Find the nearest element that matches the selector from current element to target element.
   *
   * @param {HTMLElement} element element
   * @param {string} selector element selector
   * @param {HTMLElement} target target element
   * @return {?HTMLElement}
   */
  function closestTo(element, selector, target) {
    var closestElement = closest(element, selector);
    return contains(target, closestElement) ? closestElement : null;
  }

  /**
   * Temp element for creating element by string.
   * @inner
   * @type {HTMLElement}
   */
  var createTmpElement = document.createElement('div');

  /**
   * Create a element by string
   *
   * @param {string} str Html string
   * @return {HTMLElement}
   */
  function create(str) {
    createTmpElement.innerHTML = str;
    if (!createTmpElement.children.length) {
      return null;
    }
    var children = Array.prototype.slice.call(createTmpElement.children);
    createTmpElement.innerHTML = '';
    return children.length > 1 ? children : children[0];
  }

  /**
   * Executes `callback` when `predicate(parent)` returns `true`.
   *
   * @param {!HTMLElement} parent element.
   * @param {function(!HTMLElement):boolean} predicate function.
   * @param {Function} callback function.
   */
  function waitForChildCallback(parent, predicate, callback) {
    if (predicate(parent)) {
      callback();

      return;
    }

    var win = parent.ownerDocument.defaultView;

    if (win.MutationObserver) {
      /**
       * @type {!MutationObserver}
       */
      var observer = new win.MutationObserver(function () {
        if (predicate(parent)) {
          observer.disconnect();
          callback();
        }
      });

      observer.observe(parent, { childList: true });

      return;
    }

    var intervalId = win.setInterval(function () {
      if (predicate(parent)) {
        win.clearInterval(intervalId);
        callback();
      }
    }, 5);
  }

  /**
   * Returns a promise that resolve when `predicate(parent)` returns `true`.
   *
   * @param {!HTMLElement} parent element.
   * @param {function(!HTMLElement):boolean} predicate function.
   * @returns {!Promise<void>}
   */
  function waitForChild(parent, predicate) {
    return new Promise(function (resolve) {
      return waitForChildCallback(parent, predicate, resolve);
    });
  }

  /**
   * Returns a promise that resolve when `document.body` is available.
   *
   * @param {!Document} doc document.
   * @returns {!Promise<!HTMLBodyElement>}
   */
  function waitForBody(doc) {
    return waitForChild(doc.documentElement, function (documentElement) {
      return !!documentElement.ownerDocument.body;
    });
  }

  /**
   * Waits until the Document is ready. Then the
   * callback is executed.
   *
   * @param {Function} callback callback
   * @deprecated Use {@link Mipdoc#whenBodyAvailable} instead.
   */
  function waitDocumentReady(callback) {
    return waitForChildCallback(document.documentElement, function (documentElement) {
      return !!documentElement.ownerDocument.body;
    }, callback);
  }

  /**
   * Insert dom list to a node
   *
   * @param  {HTMLElement} parent the node will be inserted
   * @param {Array} children node list which will insert into parent
   */
  function insert(parent, children) {
    if (!parent || !children) {
      return;
    }
    var nodes = Array.prototype.slice.call(children);
    if (nodes.length === 0) {
      nodes.push(children);
    }
    for (var i = 0; i < nodes.length; i++) {
      if (this.contains(nodes[i], parent)) {
        continue;
      }
      if (nodes[i] !== parent && parent.appendChild) {
        parent.appendChild(nodes[i]);
      }
    }
  }

  var dom = {
    closest: closest,
    closestTo: closestTo,
    matches: matches,
    contains: contains,
    create: create,
    insert: insert,
    waitForChild: waitForChild,
    waitForBody: waitForBody,
    waitDocumentReady: waitDocumentReady
  };

  /**
   * @file event
   * @author sekiyika(pengxing@baidu.com)
   */

  function delegate(element, selector, event, handler, capture) {
    capture = !!capture;
    function eventHandler(event) {
      var target = event.target;
      var parent = dom.closestTo(target, selector, this);
      if (parent) {
        handler.call(parent, event);
      }
    }
    element.addEventListener(event, eventHandler, capture);
    return function () {
      element.removeEventListener(event, eventHandler);
      /* eslint-disable */
      eventHandler = element = handler = null;
      /* eslint-enable */
    };
  }

  /**
   * Object for getting event's type.
   *
   * @inner
   * @type {Object}
   */
  var specialEvents = {};
  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

  /**
   * Create a event object to dispatch
   *
   * @param {string} type Event name
   * @param {?Object} data Custom data
   * @return {Event}
   */
  function createEvent(type, data) {
    var event = document.createEvent(specialEvents[type] || 'Event');
    event.initEvent(type, true, true);
    data && (event.data = data);
    return event;
  }

  function listen(element, eventType, listener, options) {
    element.addEventListener(eventType, listener, options);
    return function () {
      return element.removeEventListener(eventType, listener);
    };
  }

  /**
   * Listens for the specified event on the element and removes the listener
   * as soon as event has been received.
   * @param {!EventTarget} element
   * @param {string} eventType
   * @param {function(!Event)} listener
   * @param {Object=} optEvtListenerOpts
   * @return {!UnlistenDef}
   */
  function listenOnce(element, eventType, listener, optEvtListenerOpts) {
    var unlisten = listen(element, eventType, function (event) {
      unlisten();
      listener(event);
    }, optEvtListenerOpts);
    return unlisten;
  }

  /**
   * Whether the specified element/window has been loaded already.
   * @param {!Element|!Window} eleOrWindow
   * @return {boolean}
   */
  function isLoaded(eleOrWindow) {
    return !!(eleOrWindow.complete || eleOrWindow.readyState === 'complete' ||
    // If the passed in thing is a Window, infer loaded state from
    eleOrWindow.document && eleOrWindow.document.readyState === 'complete');
  }

  /**
   * Returns a promise that will resolve or fail based on the eleOrWindow's 'load'
   * and 'error' events. Optionally this method takes a timeout, which will reject
   * the promise if the resource has not loaded by then.
   * @param {T} eleOrWindow Supports both Elements and as a special case Windows.
   * @return {!Promise<T>}
   * @template T
   */
  function loadPromise(eleOrWindow) {
    if (isLoaded(eleOrWindow)) {
      return Promise.resolve(eleOrWindow);
    }

    var loadingPromise = new Promise(function (resolve, reject) {
      // Listen once since IE 5/6/7 fire the onload event continuously for
      // animated GIFs.
      var tagName = eleOrWindow.tagName;

      if (tagName === 'AUDIO' || tagName === 'VIDEO') {
        listenOnce(eleOrWindow, 'loadstart', resolve);
      } else {
        listenOnce(eleOrWindow, 'load', resolve);
      }
      // For elements, unlisten on error (don't for Windows).
      if (tagName) {
        listenOnce(eleOrWindow, 'error', reject);
      }
    });

    return loadingPromise;
  }

  var event = {
    delegate: delegate,
    create: createEvent,
    loadPromise: loadPromise,
    listenOnce: listenOnce,
    listen: listen
  };

  /**
   * @file css
   * @author sekiyika(pengxing@baidu.com)
   */

  var camelReg = /(?:(^-)|-)+(.)?/g;

  /**
   * Temp element for checking css properties.
   */
  var supportElement = document.createElement('div');

  var PREFIX_TYPE = ['webkit', 'moz', 'ms', 'o', 'Webkit', 'Moz', 'O'];

  /**
   * Storage of css properties' prefix.
   */
  var prefixCache = {};

  /**
   * Make sure a property is supported by adding prefix.
   *
   * @param {string} property A property to be checked
   * @return {string} the property or its prefixed version
   */
  function prefixProperty(property) {
    property = property.replace(camelReg, function (match, first, char) {
      return first ? char : char.toUpperCase();
    });

    if (prefixCache[property]) {
      return prefixCache[property];
    }

    var prop = void 0;

    if (!(property in supportElement.style)) {
      for (var i = 0; i < PREFIX_TYPE.length; i++) {
        var prefixedProp = PREFIX_TYPE[i] + property.charAt(0).toUpperCase() + property.slice(1);
        if (prefixedProp in supportElement.style) {
          prop = prefixedProp;
          break;
        }
      }
    }

    prefixCache[property] = prop || property;

    return prefixCache[property];
  }

  var UNIT_REG = /^\d+([a-zA-Z]+)/;

  /**
   * Storage of css properties' units.
   */
  var unitCache = {};

  /**
   * Obtain the unit of a property and add it to the value has no unit if exists.
   *
   * @param {string} property property
   * @param {(string|number)} value A value maybe needs unit.
   * @return {(string|number)}
   */
  function unitProperty(property, value) {
    if (value !== +value) {
      return value;
    }

    if (unitCache[property]) {
      return value + unitCache[property];
    }

    supportElement.style[property] = 0;

    var propValue = supportElement.style[property];
    var match = propValue.match && propValue.match(UNIT_REG);

    if (match) {
      return value + (unitCache[property] = match[1]);
    }

    return value;
  }

  /**
   * Set or get the value of the style properties of an element or any elements.
   * Examples:
   *    css(elements, 'left', 0);
   *    css(element, 'left', 0);
   *    css(element, {left: 0, top: 0});
   *    css(element or elements, 'left'); // the value(s) of the computed left property of the element(s)
   *
   * @param {(Array.<HTMLElement>|HTMLElement)} elements The source element(s)
   * @param {(Object|string)} property Object contains style properties or property name
   * @param {?(string|number)} value The value of setting property
   * @return {(Array.<HTMLElement>|HTMLElement|string)}
   */
  function css(elements, property, value) {
    if (!property || !elements) {
      return elements;
    }
    if (elements.length && elements[0]) {
      if (property && value !== undefined) {
        for (var i = 0; i < elements.length; i++) {
          var _element = elements[i];
          css(_element, property, value);
        }
        return elements;
      }
      var ret = [];
      for (var _i = 0; _i < elements.length; _i++) {
        ret.push(css(elements[_i], property));
      }
      return ret;
    }
    if (!elements.nodeType) {
      return elements;
    }
    var element = elements;
    if (typeof property !== 'string' || value !== undefined) {
      var prop = void 0;
      if (typeof property === 'string') {
        prop = prefixProperty(property);
        element.style[prop] = unitProperty(prop, value);
      } else {
        for (var _i2 in property) {
          value = property[_i2];
          prop = prefixProperty(_i2);
          element.style[prop] = unitProperty(prop, value);
        }
      }
      return element;
    }
    property = prefixProperty(property);

    return element.style[property] || document.defaultView.getComputedStyle(element)[property];
  }

  /**
   * @file naboo框架，包含核心调度模块和css3 transition动画工具函数
   * @author zhulei05(zhulei05@baidu.com)
   */

  var Naboo = function (_EventEmitter) {
    inherits(Naboo, _EventEmitter);

    /**
     * Naboo类，抽象出来的一个动画控制和执行的对象
     *
     * @constructor
     */
    function Naboo() {
      classCallCheck(this, Naboo);

      var _this = possibleConstructorReturn(this, (Naboo.__proto__ || Object.getPrototypeOf(Naboo)).call(this));

      _this.steps = [];
      _this._index = -1;
      _this.canceled = false;
      return _this;
    }

    /**
     * 开始执行动画的指令函数
     *
     * @param {Function=} fn - 动画完成后的回调函数
     * @return {Object} 当前naboo实例
     */


    createClass(Naboo, [{
      key: 'start',
      value: function start(fn) {
        if (fn) {
          this.on('end', fn);
        }

        this.trigger('start');
        this.next();
        return this;
      }

      /**
       * 让动画进入下一步的指令函数，一般在Naboo插件中调用
       */

    }, {
      key: 'next',
      value: function next() {
        if (this.canceled) {
          return;
        }

        this._index++;
        if (this._index >= this.steps.length) {
          this.trigger('end');
        } else {
          var currentStep = this.steps[this._index];
          currentStep.call(this);
        }
      }

      /**
       * 取消动画的指令，调用该函数后，当前未执行完的动画仍会继续执行完成，后续的动画不会执行
       */

    }, {
      key: 'cancel',
      value: function cancel() {
        this.canceled = true;
      }

      /**
       * 插件注册函数
       *
       * @param {string} name - 插件名
       * @param {Function} fn - 插件函数，用于定义插件的执行逻辑
       */

    }], [{
      key: 'register',
      value: function register(name, fn) {
        Naboo[name] = function () {
          var ret = new Naboo();
          ret[name].apply(ret, arguments);
          return ret;
        };
        Naboo.prototype[name] = function () {
          var _this2 = this;

          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift(this.next.bind(this));
          this.steps.push(function () {
            return fn.apply(_this2, args);
          });
          return this;
        };
      }
    }]);
    return Naboo;
  }(EventEmitter);

  /**
   * Naboo#p & Naboo.p
   * Naboo的并行插件
   */


  Naboo.register('p', function (next) {
    var args = Array.prototype.slice.call(arguments, 1);
    var n = args.length;
    args.forEach(function (naboo) {
      return naboo.start(function () {
        return n-- === 0 && next();
      });
    });
  });

  /**
   * Naboo#done & Naboo.done
   * Naboo的done插件，可用于在任何一个动画插件后进行回调
   */
  Naboo.register('done', function (next, fn) {
    fn(next);
  });

  Naboo.tool = function () {
    // 定义一批检测浏览器特性需要的变量
    var prefix = '';
    var eventPrefix = '';
    var vendors = {
      Webkit: 'webkit',
      Moz: '',
      O: 'o'
    };
    var testEl = document.createElement('div');

    function dasherize(str) {
      return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    function normalizeEvent(name) {
      return eventPrefix ? eventPrefix + name : name.toLowerCase();
    }

    // 检测浏览器特性
    if (testEl.style.transform === undefined) {
      /* eslint-disable fecs-valid-map-set */
      for (var prop in vendors) {
        if (testEl.style[prop + 'TransitionProperty'] !== undefined) {
          prefix = '-' + prop.toLowerCase() + '-';
          eventPrefix = vendors[prop];
          break;
        }
      }
    }

    // 是否不支持transition
    var off = eventPrefix === undefined && testEl.style.transitionProperty === undefined;

    /**
     * 设置dom对象的css
     *
     * 实现方法同zepto的css
     *
     * @param {Object} dom 要设置css的dom节点
     * @param {Object} obj 存放css信息的对象
     */
    function setCss(dom, obj) {
      var css = '';

      for (var key in obj) {
        if (!obj[key] && obj[key] !== 0) {
          dom.style.removeProperty(dasherize(key));
        } else {
          css += dasherize(key) + ':' + obj[key] + ';';
        }
      }

      dom.style.cssText += ';' + css;
    }

    /**
     * 给一个属性自动添加单位
     *
     * @param  {string} prop 属性名
     * @param  {string|number} val 属性值
     *
     * @return {string}     带单位的属性值
     */
    function handleUnit(prop, val) {
      if (val !== +val) {
        return val;
      }

      testEl.style[prop] = 0;
      var propValue = testEl.style[prop];
      var match = propValue.match && propValue.match(/^\d+([a-zA-Z]+)/);
      if (match) {
        return val + match[1];
      }

      return val;
    }

    /**
     * 获取正确的css属性名
     *
     * @param {string} prop 属性名
     * @return {string | undefined} 自动添加前缀后的属性名或者undefined
     */
    function getPropName(prop) {
      var res = void 0;
      if (testEl.style[prop] !== undefined) {
        res = prop;
      } else {
        for (var key in vendors) {
          var val = '-' + vendors[key] + '-';
          if (testEl.style[val + prop] !== undefined) {
            res = val + prop;
            break;
          }
        }
      }

      return res;
    }

    return {
      prefix: prefix,
      dasherize: dasherize,
      normalizeEvent: normalizeEvent,
      off: off,
      setCss: setCss,
      handleUnit: handleUnit,
      getPropName: getPropName
    };
  }();

  /**
   * Naboo提供的执行css3 transiton动画的函数
   *
   * @param {Object} dom - 需要进行动画的dom元素
   * @param {Object} property - 需要进行动画的css属性键值对对象
   * @param {number=} duration - 动画时长，单位ms
   * @param {string=} ease - 动画的缓动函数名，可选值包括`ease`、`linear`、`ease-in`、`ease-out`、`ease-in-out`
   * @param {number=} delay - 动画延迟执行的时间，单位ms
   * @param {Function=} cb - 动画完成后的回调函数
   */
  Naboo.transition = function () {
    var prefix = Naboo.tool.prefix;

    // css transition各属性名
    var transitionProperty = prefix + 'transition-property';
    var transitionDuration = prefix + 'transition-duration';
    var transitionDelay = prefix + 'transition-delay';
    var transitionTiming = prefix + 'transition-timing-function';
    var transitionEnd = Naboo.tool.normalizeEvent('TransitionEnd');

    // 动画完成后清空设置
    var cssReset = {};
    cssReset[transitionProperty] = '';
    cssReset[transitionDuration] = '';
    cssReset[transitionDelay] = '';
    cssReset[transitionTiming] = '';

    return function (dom, property) {
      var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (dom && Object.prototype.toString.call(property) === '[object Object]') {
        opt = opt || {};
        var duration = parseInt(opt.duration, 10) || 400;
        var easeArr = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'];
        var ease = easeArr.indexOf(opt.ease) > -1 ? opt.ease : 'ease';
        var delay = parseInt(opt.delay, 10) || 0;
        var cb = typeof opt.cb === 'function' ? opt.cb : function () {};
        var nabooNum = dom.getAttribute('data-naboo');
        if (nabooNum !== +nabooNum) {
          nabooNum = 0;
        }

        dom.setAttribute('data-naboo', nabooNum + 1);
        if (Naboo.tool.off) {
          duration = 0;
        }

        duration = Math.max(duration, 0);
        duration /= 1000;
        delay /= 1000;

        var cssProperty = [];
        var cssValues = {};
        for (var key in property) {
          if (!property.hasOwnProperty(key)) {
            continue;
          }

          var originKey = key;
          key = Naboo.tool.getPropName(key);
          var value = Naboo.tool.handleUnit(key, property[originKey]);
          cssValues[key] = value;
          cssProperty.push(Naboo.tool.dasherize(key));
        }
        if (duration > 0) {
          var transitionPropertyVal = dom.style[transitionProperty];
          transitionPropertyVal && (transitionPropertyVal += ', ');
          cssValues[transitionProperty] = transitionPropertyVal + cssProperty.join(', ');

          var transitionDurationVal = dom.style[transitionDuration];
          if (transitionDurationVal || parseInt(transitionDurationVal, 10) === 0) {
            transitionDurationVal += ', ';
          }

          cssValues[transitionDuration] = transitionDurationVal + duration + 's';

          var transitionTimingVal = dom.style[transitionTiming];
          transitionTimingVal && (transitionTimingVal += ', ');
          cssValues[transitionTiming] = transitionTimingVal + ease;

          var transitonDelayVal = dom.style[transitionDelay];
          if (transitonDelayVal || parseInt(transitonDelayVal, 10) === 0) {
            transitonDelayVal += ', ';
          }

          cssValues[transitionDelay] = transitonDelayVal + delay + 's';
        }

        // 回调是否执行
        var fired = false;
        var setCss = Naboo.tool.setCss;

        // 包装后的回调函数
        var wrappedCallback = function wrappedCallback(event) {
          if (event && event.elapsedTime !== duration + delay) {
            return;
          }

          if (typeof event !== 'undefined') {
            if (event.target !== event.currentTarget) {
              // 确保事件不是从底部冒泡上来的
              return;
            }

            event.target.removeEventListener(transitionEnd, wrappedCallback);
          } else {
            // 由setTimeout触发
            dom.removeEventListener(transitionEnd, wrappedCallback);
          }
          fired = true;
          dom.setAttribute('data-naboo', +dom.getAttribute('data-naboo') - 1);
          +dom.getAttribute('data-naboo') === 0 && setCss(dom, cssReset);
          cb && cb();
        };

        duration > 0 && dom.addEventListener(transitionEnd, wrappedCallback);

        // 在某些老式的android手机上，transitionEnd事件有可能不会触发，这时候我们需要手动执行回调
        setTimeout(function () {
          return !fired && wrappedCallback();
        }, (duration + delay) * 1000 + 25);

        // 触发reflow让元素可以执行动画
        /* eslint-disable no-unused-expressions */
        dom.clientLeft;
        /* eslint-enable no-unused-expressions */
        setCss(dom, cssValues);
      }
    };
  }();

  /**
   * 专门用于执行动画的插件
   *
   * @param {Object} dom 要进行动画的dom对象
   * @param {Object} prop 要进行动画的css属性
   * @param {?Object} opt 动画的一些参数
   * @param {?number} opt.duration 动画时长，默认值400，单位ms
   * @param {?string} opt.ease 动画的缓动函数，可选值有'ease','ease-in','ease-out','linear','ease-in-out'，默认值'ease'
   * @param {?number} opt.delay 动画的延时时长，默认值0，单位ms
   * @param {?Function} opt.cb 动画的回调函数
   * @param {?string} opt.mode 动画的模式，可选值有'transition','keyframes(暂未支持)','js(暂未支持)'，默认值'transition'
   * @return {Object} 返回当前的naboo对象
   */
  Naboo.register('animate', function (next, dom, prop, opt) {
    opt = opt || {};
    var cb = opt.cb;
    opt.cb = function () {
      cb && cb();
      next();
    };
    opt.mode = ['transition'].indexOf(opt.mode) > -1 ? opt.mode : 'transition';
    Naboo[opt.mode](dom, prop, opt);
  });

  /**
   * @file gesture-recognizer
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * Mean recognizer is at the beginning of the state.
   *
   * @const
   * @inner
   * @type {number}
   */
  var STATE_START = 1;

  /**
   * Mean the recognizer is waitting timer or another recognizer.
   * @const
   * @inner
   * @type {number}
   */
  var STATE_WAIT = 2;

  /**
   * Mean the recognizer is pending. Need to wait a while.
   *
   * @const
   * @inner
   * @type {number}
   */
  var STATE_PENDING = 3;

  /**
   * Mean the recognizer can be emitted.
   *
   * @const
   * @inner
   * @type {number}
   */
  var STATE_END = 4;

  /**
   * The state is failed or ended. Need to wait next life circle.
   *
   * @const
   * @inner
   * @type {number}
   */
  var STATE_HOLD = 5;

  /**
   * This object is used to get state number fast.
   *
   * @const
   * @inner
   * @type {Object}
   */
  var STATE_NUMBER = {
    start: STATE_START,
    wait: STATE_WAIT,
    pending: STATE_PENDING,
    end: STATE_END,
    hold: STATE_HOLD

    /**
     * Save the direction string, we will use it to get direction by number.
     *
     * @const
     * @inner
     * @type {Object}
     */
  };var DIRECTION_STR = {
    0: '',
    1: 'up',
    2: 'right',
    3: 'down',
    4: 'left'

    /**
     * For storing recognizers.
     *
     * @inner
     * @type {Object}
     */
  };var recognizerList = {};

  /**
   * For storing the event names of recognizers.
   * @inner
   * @type {Object}
   */
  var eventList = {};

  var Recognizer = function () {
    /**
     * Recognizer class.
     *
     * @constructor
     * @param {Gesture} gesture gesture
     */
    function Recognizer(gesture) {
      classCallCheck(this, Recognizer);

      /**
       * Sign the recognizer's state. Default is 'start'.
       *
       * @private
       * @type {number}
       */
      this._state = STATE_START;

      /**
       * The bound gesture.
       *
       * @type {Gesture}
       */
      this.gesture = gesture;

      /**
       * The conflicting list that records the conflicting recognizers in the same gesture object.
       *
       * @type {Object}
       */
      this.conflictList = {};

      /**
       * Recognizer name.
       *
       * @type {string}
       */
      this.name = '';

      /**
       * Mark whether an automatic reset is required.
       *
       * @type {boolean}
       */
      this.needAutoReset = true;

      /**
       * The conflicting level. When the recognizer is conflicted by another,
       * use it to decision which one is to hold.
       *
       * @type {number}
       */
      this.level = 0;
    }

    /**
     * The event list of current recognizer.
     *
     * @type {Array.<string>}
     * @private
     */


    createClass(Recognizer, [{
      key: 'recognize',


      /**
       * Recognize event data.
       *
       * @param {Object} data data
       */
      value: function recognize(data) {
        var eventState = data.eventState;
        if (eventState === 'start' && this._state === STATE_HOLD) {
          this._state = STATE_START;
          this.needAutoReset && this.reset();
        }
        if (this._state === STATE_HOLD) {
          return;
        }
        var state = this.process(data);
        if (this._state === STATE_HOLD) {
          return;
        }
        this._state = state;

        if (this.emitCheck()) {
          this.emit(data);
        }
      }

      /**
       * Determine that current recognizer is at [xxx] state or not.
       * Usage is isState(1, 5) or isState('start', 'hold'). It does not
       * limit the number of parameters.
       *
       * @return {boolean}
       */

    }, {
      key: 'isState',
      value: function isState() {
        var args = arguments;
        for (var i = 0; i < args.length; i++) {
          var st = typeof args[i] === 'string' ? STATE_NUMBER[args[i]] : args[i];
          if (st === this._state) {
            return true;
          }
        }
        return false;
      }

      /**
       * Set state by string or number.
       *
       * @param {string|number} st st
       * @return {number}
       */

    }, {
      key: 'setState',
      value: function setState(st) {
        st = typeof st === 'string' ? STATE_NUMBER[st] : st;
        if (st > 0 && st < 6) {
          this._state = st;
        }
        return this._state;
      }

      /**
       * Check whether the recognizer can be emitted.
       *
       * @return {boolean}
       */

    }, {
      key: 'emitCheck',
      value: function emitCheck() {
        if (this._state === STATE_START || this._state === STATE_HOLD) {
          return false;
        }
        for (var i in this.conflictList) {
          var conflictRecognizer = this.conflictList[i];
          if (conflictRecognizer.level > this.level && this.conflictList[i].state !== STATE_HOLD) {
            return false;
          }
        }

        return true;
      }

      /**
       * Process the event data. The main method of recognizer.
       * It needs to be overrode.
       *
       * @param {Object} data data
       * @return {number}
       */

    }, {
      key: 'process',
      value: function process(data) {
        return this._state;
      }

      /**
       * Emit with event data.
       *
       * @param {Object} data data
       */

    }, {
      key: 'emit',
      value: function emit(data) {}
      // emtting


      /**
       * Reset the recognizer.
       */

    }, {
      key: 'reset',
      value: function reset() {}

      /**
       * Put the state into hold.
       *
       * @return {number}
       */

    }, {
      key: 'hold',
      value: function hold() {
        this._state = STATE_HOLD;
        return this._state;
      }

      /**
       * Trigger the gesture's event.
       *
       * @param {Object} data data
       */

    }, {
      key: 'trigger',
      value: function trigger(data) {
        this.gesture.trigger(data.type, data.event, data);
      }
    }, {
      key: 'eventList',
      get: function get$$1() {
        return this._eventList || [];
      }

      /**
       * setter
       *
       * @param {Array} eventList event list
       */
      ,
      set: function set$$1(eventList) {
        this._eventList = eventList;
      }

      /**
       * Register also as the control of recognizers.
       * Recognizer.xxx means the control's method.
       * This method is used to register Recognizer class.
       *
       * @param {Function} Rec recognizer
       * @param {string} name name
       */

    }], [{
      key: 'register',
      value: function register(Rec, name) {
        !Rec.conflictList && (Rec.conflictList = []);
        Rec.recName = Rec.prototype.recName = name;
        recognizerList[name] = Rec;
        var evlist = Rec.prototype.eventList;
        for (var i = 0; i < evlist.length; i++) {
          eventList[evlist[i]] = Rec;
        }
      }

      /**
       * Get the conflicting list of a recognizer class.
       *
       * @param {string} name name
       * @return {?Array.<Object>}
       */

    }, {
      key: 'getConflictList',
      value: function getConflictList(name) {
        return recognizerList[name] && recognizerList[name].conflictList;
      }

      /**
       * Get recognizer class by name.
       *
       * @param {string} name name
       * @return {Function}
       */

    }, {
      key: 'get',
      value: function get$$1(name) {
        return recognizerList[name];
      }

      /**
       * Get recognizer class by event name.
       *
       * @param {string} event Event name
       * @return {Function}
       */

    }, {
      key: 'getByEventname',
      value: function getByEventname(event) {
        return eventList[event];
      }

      /**
       * Conflict a and b.
       *
       * @param {Function|string} a a
       * @param {Function|string} b b
       */

    }, {
      key: 'conflict',
      value: function conflict(a, b) {
        if (typeof a === 'string') {
          a = Recognizer.get(a);
          b = Recognizer.get(b);
        }
        if (!a || !b) {
          return;
        }
        a.conflictList.push(b.recName);
        b.conflictList.push(a.recName);
      }
    }]);
    return Recognizer;
  }();

  /**
   * Handler for holdTime.
   */


  function holdTimeFn() {
    this._state = STATE_END;
    this.emit();
  }

  var TapRecognizer = function (_Recognizer) {
    inherits(TapRecognizer, _Recognizer);

    /**
     * Recognizer class.
     *
     * @constructor
     * @param {Gesture} gesture gesture
     */
    function TapRecognizer(gesture) {
      classCallCheck(this, TapRecognizer);

      var _this = possibleConstructorReturn(this, (TapRecognizer.__proto__ || Object.getPrototypeOf(TapRecognizer)).call(this, gesture));

      _this.boundHoldTimeFn = holdTimeFn.bind(_this);

      /**
       * The count of tap.
       *
       * @type {number}
       */
      _this.taps = 1;

      /**
       * The count of user tap.
       *
       * @type {number}
       */
      _this.count = 0;

      /**
       * If the gesture has several tap recognizer,
       * we need to wait some time to recognize.
       *
       * @type {number}
       */
      _this.holdTime = 300;

      /**
       * The tap time. It will failed when the time is over this.
       *
       * @type {number}
       */
      _this.time = 250;

      /**
       * The move range of finger.
       *
       * @type {number}
       */
      _this.moveRange = 10;

      /**
       * @override
       */
      _this.level = 1;

      /**
       * @override
       */
      _this.needAutoReset = false;
      return _this;
    }

    /**
     * The event list of current recognizer.
     *
     * @type {Array.<string>}
     * @override
     */


    createClass(TapRecognizer, [{
      key: 'process',


      /**
       * Process the event data. The processing result are determined based on the data.
       * And return the result.
       *
       * @override
       * @param {*} data data
       */
      value: function process(data) {
        if (data.deltaTime > this.time || data.distance > this.moveRange || data.pointers.length > 1) {
          this.reset();
          return this.hold();
        }
        if (data.eventState === 'start') {
          clearTimeout(this.holdTimer);
        }
        if (data.eventState !== 'end') {
          return STATE_WAIT;
        }
        var holdTime = this.preTime && data.timeStamp - this.preTime;
        this.preTime = data.timeStamp;

        if (holdTime < this.holdTime) {
          this.count++;
        } else {
          this.count = 1;
        }
        this._data = data;

        if (this.count === this.taps) {
          if (this.emitCheck()) {
            return STATE_END;
          }

          this.holdTimer = setTimeout(this.boundHoldTimeFn, this.holdTime);
          return STATE_WAIT;
        }
      }

      /**
       * @override
       */

    }, {
      key: 'reset',
      value: function reset() {
        this.preTime = null;
        this.count = 0;
        this._state = STATE_START;
        clearTimeout(this.holdTimer);
      }

      /**
       * @override
       */

    }, {
      key: 'emit',
      value: function emit() {
        if (this._state === STATE_END) {
          var data = this._data;
          var eventData = Object.create(data);
          eventData.type = this.eventList[0];
          this._data = null;
          this.trigger(eventData);
          this.reset();
        }
      }
    }, {
      key: 'eventList',
      get: function get$$1() {
        return this._eventList || ['tap'];
      }
    }]);
    return TapRecognizer;
  }(Recognizer);

  var DoubleTapRecognizer = function (_TapRecognizer) {
    inherits(DoubleTapRecognizer, _TapRecognizer);

    /**
     * The double-tap-recognizer. It inherits from TapRecognizer.
     *
     * @constructor
     * @param {Gesture} gesture gesture instance
     */
    function DoubleTapRecognizer(gesture) {
      classCallCheck(this, DoubleTapRecognizer);

      /**
       * The tap number is 2.
       *
       * @override
       */
      var _this2 = possibleConstructorReturn(this, (DoubleTapRecognizer.__proto__ || Object.getPrototypeOf(DoubleTapRecognizer)).call(this, gesture));

      _this2.taps = 2;

      /**
       * The level is 2. Then, if a gesture has tap and doubletap, the doubletap is high level.
       *
       * @override
       */
      _this2.level = 2;
      return _this2;
    }

    /**
     * The event list of current recognizer.
     *
     * @type {Array.<string>}
     * @override
     */


    createClass(DoubleTapRecognizer, [{
      key: 'eventList',
      get: function get$$1() {
        return this._eventList || ['doubletap'];
      }
    }]);
    return DoubleTapRecognizer;
  }(TapRecognizer);

  var SwipeRecognizer = function (_Recognizer2) {
    inherits(SwipeRecognizer, _Recognizer2);

    /**
     * Swipe recognizer.
     *
     * @constructor
     * @param {Gesture} gesture gesture instance
     */
    function SwipeRecognizer(gesture) {
      classCallCheck(this, SwipeRecognizer);

      /**
       * The speed of finger.
       *
       * @type {number}
       */
      var _this3 = possibleConstructorReturn(this, (SwipeRecognizer.__proto__ || Object.getPrototypeOf(SwipeRecognizer)).call(this, gesture));

      _this3.velocity = 0.03;

      /**
       * Minimum distance.
       *
       * @type {number}
       */
      _this3.distance = 30;

      /**
       * Time limit.
       *
       * @type {number}
       */
      _this3.duration = 1000;
      return _this3;
    }

    /**
     * The event list of current recognizer.
     * Swipe has 5 events. Swipe and another event will be triggered every time.
     *
     * @type {Array.<string>}
     * @override
     */


    createClass(SwipeRecognizer, [{
      key: 'process',


      /**
       * @override
       */
      value: function process(data) {
        if (data.pointers.length > 1 || data.deltaTime > this.duration) {
          return STATE_HOLD;
        }
        if (data.eventState === 'end') {
          if (data.velocity >= this.velocity && data.distance > this.distance) {
            return STATE_END;
          }
        }
      }

      /**
       * @override
       */

    }, {
      key: 'emit',
      value: function emit(data) {
        if (this._state === STATE_END) {
          var dataSwipe = Object.create(data);
          dataSwipe.type = 'swipe';
          dataSwipe.swipeDirection = DIRECTION_STR[data.direction];
          this.trigger(dataSwipe);

          var dataSwipeDir = Object.create(data);
          dataSwipeDir.type = 'swipe' + DIRECTION_STR[data.direction];
          dataSwipeDir.swipeDirection = DIRECTION_STR[data.direction];
          this.trigger(dataSwipeDir);
        }
      }
    }, {
      key: 'eventList',
      get: function get$$1() {
        return this._eventList || ['swipe', 'swipeup', 'swiperight', 'swipeleft', 'swipedown'];
      }
    }]);
    return SwipeRecognizer;
  }(Recognizer);

  // doubletap 和 tap 的注册顺序不能换，得先子类，再父类
  // 否则 conflictList 都指向 tap 的 conflictList，就有问题了


  Recognizer.register(DoubleTapRecognizer, 'doubletap');
  Recognizer.register(TapRecognizer, 'tap');
  Recognizer.register(SwipeRecognizer, 'swipe');

  Recognizer.conflict(DoubleTapRecognizer, TapRecognizer);

  /**
   * @file data-processor
   * @author sekiyika(pengxing@baidu.com)
   */

  var round$1 = Math.round;
  var max = Math.max;
  var abs = Math.abs;

  /**
   * Data processor of touch event object.
   *
   * @type {Object}
   */
  var dataProcessor = {
    /**
     * The center point of starting gesture.
     *
     * @type {?Object}
     */
    startCenter: null,

    /**
     * The center point of last gesture.
     *
     * @type {?Object}
     */
    lastCenter: null,

    /**
     * The starting time of event.
     *
     * @type {?number}
     */
    startTime: null,

    /**
     * Event data processor.
     *
     * @param {Event} event event
     * @param {boolean} preventX preventX
     * @param {boolean} preventY preventY
     * @return {Object}
     */
    process: function process(event, preventX, preventY) {
      var data = {};
      var now = Date.now();
      var touches = event.touches.length ? event.touches : event.changedTouches;
      if (event.type === 'touchstart') {
        this.startCenter = this.getCenter(touches);
        this.startTime = now;
        this.startData = data;
        this.preData = null;
      }
      var startCenter = this.startCenter;
      var center = this.getCenter(touches);
      var deltaTime = data.deltaTime = now - this.startTime;

      data.pointers = touches;

      data.x = center.x;
      data.y = center.y;

      var deltaX = data.deltaX = center.x - startCenter.x;
      var deltaY = data.deltaY = center.y - startCenter.y;

      data.velocityX = deltaX / deltaTime || 0;
      data.velocityY = deltaY / deltaTime || 0;
      data.velocity = max(abs(data.velocityX), abs(data.velocityY));
      data.angle = this.getAngle(startCenter, center);
      data.distance = this.getDistance(startCenter, center);
      data.direction = this.getDirection(deltaX, deltaY);
      data.eventState = event.type.replace('touch', '');
      data.timeStamp = now;

      if (this.preData) {
        var instTime = data.instantDeltaTime = now - this.preData.timeStamp;
        var instX = data.instantVelocityX = (data.x - this.preData.x) / instTime || 0;
        var instY = data.instantVelocityY = (data.y - this.preData.y) / instTime || 0;
        if (data.eventState === 'move' && (preventX || preventY)) {
          var curDirection = abs(instX) > abs(instY);
          if (preventX && curDirection || preventY && !curDirection) {
            event.preventDefault();
          }
        }
      } else {
        data.instantDeltaTime = data.instantVelocityX = data.instantVelocityY = 0;
      }

      this.preData = data;

      data.event = event;
      return Object.freeze(data);
    },


    /**
     * Get the center point from some points.
     * TODO: Calculates the center point of multiple points.
     *
     * @param {Array} points points
     * @return {Object}
     */
    getCenter: function getCenter(points) {
      return {
        x: round$1(points[0].clientX),
        y: round$1(points[0].clientY)
      };
    },


    /**
     * Get the angle of two points.
     *
     * @param {Object} point1 point1
     * @param {Object} point2 point2
     * @return {number}
     */
    getAngle: function getAngle(point1, point2) {
      return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
    },


    /**
     * Get the distance of two points.
     *
     * @param {Object} point1 point1
     * @param {Object} point2 point2
     * @return {number}
     */
    getDistance: function getDistance(point1, point2) {
      var x = point2.x - point1.x;
      var y = point2.y - point1.y;
      return Math.sqrt(x * x + y * y);
    },


    /**
     * Calculate direction according to a coordinate.
     * The meaning of return values:
     *  0: origin
     *  1: up
     *  2: right
     *  3: down
     *  4: left
     *
     * @param {number} x x
     * @param {number} y y
     * @return {number}
     */
    getDirection: function getDirection(x, y) {
      if (x === y) {
        return 0;
      }
      if (abs(x) >= abs(y)) {
        return x > 0 ? 2 : 4;
      }
      return y < 0 ? 1 : 3;
    }
  };

  /**
   * @file gesture
   * @author sekiyika(pengxing@baidu.com)
   */

  /* eslint-disable no-cond-assign */

  /**
   * Gesture
   *
   * @class
   */

  var Gesture = function (_EventEmitter) {
    inherits(Gesture, _EventEmitter);

    /**
     * Gesture
     *
     * @constructor
     * @param {HTMLElement} element Element that need gestures
     * @param {Object} opt Options
     */
    function Gesture(element, opt) {
      classCallCheck(this, Gesture);

      /**
       * Default options.
       *
       * @private
       * @type {Object}
       */
      var _this = possibleConstructorReturn(this, (Gesture.__proto__ || Object.getPrototypeOf(Gesture)).call(this));

      _this._opt = {
        preventDefault: false,
        stopPropagation: false,
        preventX: true,
        preventY: false
      };

      opt && (_this._opt = fn.extend({}, _this._opt, opt));

      /**
       * The events' context.
       *
       * @private
       * @type {?Object}
       */
      _this.__eventContext = _this._element = element;

      /**
       * Touch handler.
       *
       * @private
       * @type {Function}
       */
      _this._boundTouchEvent = touchHandler.bind(_this);

      listenersHelp(element, 'touchstart touchmove touchend touchcancel', _this._boundTouchEvent);

      /**
       * For storing the recoginzers.
       *
       * @private
       * @type {Object}
       */
      _this._recognizers = {};
      return _this;
    }

    /**
     * Cleanup the events.
     */


    createClass(Gesture, [{
      key: 'cleanup',
      value: function cleanup() {
        listenersHelp(this._element, 'touchstart touchmove touchend touchcancel', this._boundTouchEvent, false);
        this.off();
      }

      /**
       * Instantiate a recoginzer and add the recoginzer to the _recognizer and handle the conflicting list when
       * event is created.
       *
       * @param {string} name name
       */

    }, {
      key: '_createEventCallback',
      value: function _createEventCallback(name) {
        if (this._hasRegister(name)) {
          return;
        }
        var RecognizerClass = Recognizer.getByEventname(name);
        if (!RecognizerClass) {
          return;
        }
        name = RecognizerClass.recName;
        var recognizer = this._recognizers[name] = new RecognizerClass(this);
        var conflictList = Recognizer.getConflictList(recognizer.recName);
        for (var i = 0, len = conflictList.length; i < len; i++) {
          var _name = conflictList[i];
          var conflictRecognizer = this._recognizers[_name];
          if (conflictRecognizer) {
            conflictRecognizer.conflictList[recognizer.recName] = recognizer;
            recognizer.conflictList[conflictRecognizer.recName] = conflictRecognizer;
          }
        }
      }

      /**
       * When event is removed, cleanup the recognizer.
       *
       * @param {string} name name
       */

    }, {
      key: '_removeEventCallback',
      value: function _removeEventCallback(name) {
        var recognizer = void 0;
        if (name === undefined) {
          this._recognizers = {};
        } else if (recognizer = this._recognizers[name]) {
          for (var i in recognizer.conflictList) {
            delete recognizer.conflictList[i][name];
          }
          delete this._recognizers[name];
        }
      }

      /**
       * Determine whether a recognizer has been registered.
       *
       * @param {string} name name
       * @return {boolean}
       */

    }, {
      key: '_hasRegister',
      value: function _hasRegister(name) {
        return !!this._recognizers[Recognizer.getByEventname(name)];
      }

      /**
       * Recognize the gesture data.
       *
       * @param {Object} data data
       */

    }, {
      key: '_recognize',
      value: function _recognize(data) {
        var recognizers = this._recognizers;
        for (var i in recognizers) {
          var recognizer = recognizers[i];
          recognizer.recognize(data);
        }
      }
    }]);
    return Gesture;
  }(EventEmitter);

  /**
   * Handle touch event.
   *
   * @inner
   * @param {Event} event event
   */


  function touchHandler(event) {
    var opt = this._opt;
    opt.preventDefault && event.preventDefault();
    opt.stopPropagation && event.stopPropagation();

    // 如果 touchstart 没有被触发(可能被子元素的 touchstart 回调触发了 stopPropagation)，
    // 那么后续的手势将取消计算
    if (event.type !== 'touchstart' && !dataProcessor.startTime) {
      return;
    }

    var data = dataProcessor.process(event, opt.preventX, opt.preventY);
    this._recognize(data);
    this.trigger(event.type, event, data);
  }

  /**
   * Add or remove listeners from an element.
   *
   * @inner
   * @param {HTMLElement} element element
   * @param {string} events Events' name that are splitted by space
   * @param {Function} handler Event handler
   * @param {?boolean} method Add or remove.
   */
  function listenersHelp(element, events, handler, method) {
    var list = events.split(' ');
    for (var i = 0, len = list.length; i < len; i++) {
      var item = list[i];
      if (method === false) {
        element.removeEventListener(item, handler);
      } else {
        element.addEventListener(item, handler, false);
      }
    }
  }

  /**
   * @file customStorage Function. Support publiser management and localstorage
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * Type of storage
   *
   * @inner
   * @type {Object}
   */
  var storageType = {
    LOCALSTORAGE: 0,
    ASYNCSTORAGE: 1,
    COOKIESTORAGE: 2

    /**
     * Error code
     *
     * @inner
     * @type {Object}
     */
  };var eCode = {
    siteExceed: 21,
    lsExceed: 22

    /**
     * When no support local storage, store data temporary
     *
     * @inner
     * @type {Object}
     */
  };var lsCache = {};

  /**
   * Location href
   *
   * @inner
   * @type {string}
   */
  var href = window.location.href;

  /**
   * Domain of website
   *
   * @inner
   * @type {string}
   */
  var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
  var matchArr = href.match(reg);
  var HOST = matchArr && matchArr.length > 1 ? matchArr[1] : '';

  /**
   * Current domain storage size, max is 4k
   *
   * @const
   * @inner
   * @type {number}
   */
  var STORAGESIZE = 4 * 1024;

  /**
   * Local Storage class
   *
   * @class
   */

  var LocalStorage = function () {
    function LocalStorage() {
      classCallCheck(this, LocalStorage);
    }

    createClass(LocalStorage, [{
      key: '_isCachePage',

      /**
       * Whether support Local Storage
       *
       * @return {boolean} Whether support ls
       */
      value: function _isCachePage() {
        return fn.isCacheUrl(href);
      }

      /**
       * Whether support Local Storage
       *
       * @return {boolean} Whether support ls
       */

    }, {
      key: '_supportLs',
      value: function _supportLs() {
        var support = false;
        try {
          window.localStorage.setItem('lsExisted', '1');
          window.localStorage.removeItem('lsExisted');
          support = true;
        } catch (e) {
          support = false;
        }
        return support;
      }

      /**
       * Get local storage
       *
       * @return {Object} value of local storage
       */

    }, {
      key: '_getLocalStorage',
      value: function _getLocalStorage() {
        var ls = this._supportLs() ? localStorage.getItem(HOST) : lsCache[HOST];
        ls = ls ? parseJson(ls) : {};
        updateTime(ls);
        return ls;
      }

      /**
       * Delete local storage
       *
       * @param {string} key the key of local storage
       */

    }, {
      key: '_rmLocalStorage',
      value: function _rmLocalStorage(key) {
        if (!key) {
          key = HOST;
        }
        this._supportLs() ? localStorage.removeItem(key) : fn.del(lsCache, key);
      }

      /**
       * Set current site data in local storage
       *
       * @param {string} name name of storage
       * @param {string} value value of storage
       * @param {string} expire optional
       * @param {string} callback if error callback to publisher
       */

    }, {
      key: 'set',
      value: function set$$1(name, value, expire, callback) {
        if (!name || !value) {
          return;
        }
        callback = typeof expire === 'function' ? expire : callback;
        if (this._isCachePage()) {
          var ls = this._getLocalStorage();
          ls[name] = value;
          expire = parseInt(expire, 10);
          if (!isNaN(expire) && expire > 0) {
            ls.e = new Date().getTime() + expire;
          } else {
            fn.del(ls, 'e');
          }
          ls = JSON.stringify(ls);
          if (ls.length > STORAGESIZE) {
            callback && callback(getError(eCode.siteExceed, getErrorMess(eCode.siteExceed)));
            throw getErrorMess(eCode.siteExceed);
          }
          this._setLocalStorage(HOST, ls, expire, callback);
        } else {
          this._setLocalStorage(name, value, expire, callback);
        }
      }

      /**
       * Set local storage
       *
       * @param {string} key the key of local storage
       * @param {string} value the key of local storage
       * @param {string} expire the expire of local storage
       * @param {string} callback if error callback to publisher
       */

    }, {
      key: '_setLocalStorage',
      value: function _setLocalStorage(key, value, expire, callback) {
        var mess = getErrorMess(eCode.lsExceed, key);
        callback = typeof expire === 'function' ? expire : callback;
        if (this._supportLs()) {
          try {
            localStorage.setItem(key, value);
          } catch (e) {
            if (this._isExceed(e) && this._isCachePage()) {
              this._exceedHandler(key, value, expire);
            } else if (this._isExceed(e) && !this._isCachePage()) {
              callback && callback(getError(eCode.lsExceed, mess));
              throw mess;
            }
          }
        } else {
          var size = value.length / 1024.0 / 1024.0;
          for (var k in lsCache) {
            if (lsCache[k]) {
              size += lsCache[k].length / 1024.0 / 1024.0;
            }
          }
          if (size > 5.0) {
            callback && callback(eCode.lsExceed, mess);
            throw mess;
          }
          lsCache[key] = value;
        }
      }

      /**
       * Get current site data in local storage
       *
       * @param {string} name name of storage
       * @return {string} get data with key
       */

    }, {
      key: 'get',
      value: function get$$1(name) {
        if (!fn.isString(name)) {
          return;
        }

        var result = void 0;
        if (this._isCachePage()) {
          var ls = this._getLocalStorage();
          if (ls && ls[name]) {
            result = ls[name];
          }
        } else {
          result = this._supportLs() ? localStorage.getItem(name) : lsCache[name];
        }
        return result;
      }

      /**
       * Delete current site data in local storage with key
       *
       * @param {string} name name of storage
       */

    }, {
      key: 'rm',
      value: function rm(name) {
        if (!fn.isString(name)) {
          return;
        }

        if (this._isCachePage()) {
          var ls = this._getLocalStorage();
          if (ls && ls[name]) {
            fn.del(ls, name);
            this._setLocalStorage(HOST, JSON.stringify(ls));
          }
        } else {
          this._supportLs() ? localStorage.removeItem(name) : fn.del(lsCache, name);
        }
      }

      /**
       * Clear current site local storage
       *
       */

    }, {
      key: 'clear',
      value: function clear() {
        if (this._isCachePage()) {
          this._rmLocalStorage();
        } else {
          this._supportLs() ? localStorage.clear() : lsCache = {};
        }
      }

      /**
       * Delete all expire storage, scope is all sites
       *
       * @return {boolean} whether storage has expired
       */

    }, {
      key: 'rmExpires',
      value: function rmExpires() {
        var hasExpires = false;

        if (this._isCachePage()) {
          var ls = this._supportLs() ? localStorage : lsCache;

          for (var k in ls) {
            if (ls[k]) {
              var val = void 0;
              if (typeof ls[k] === 'string') {
                val = parseJson(ls[k]);
              }
              if (val && val.e) {
                var expire = parseInt(parseJson(ls[k]).e, 10);
                if (expire && new Date().getTime() >= expire) {
                  hasExpires = true;
                  this._rmLocalStorage(k);
                }
              }
            }
          }
        }
        return hasExpires;
      }

      /**
       * Whether local storage is exceed, http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
       *
       * @param {Object} e set local storage error
       * @return {boolean} whether storage exceed
       */

    }, {
      key: '_isExceed',
      value: function _isExceed(e) {
        var quotaExceeded = false;

        if (e && e.code) {
          switch (e.code) {
            case 22:
              {
                quotaExceeded = true;
                break;
              }
            case 1014:
              {
                // Firefox
                quotaExceeded = e.name === 'NS_ERROR_DOM_QUOTA_REACHED';
                break;
              }
          }
        } else if (e && e.number === -2147024882) {
          // Internet Explorer 8
          quotaExceeded = true;
        }

        return quotaExceeded;
      }

      /**
       * Handle when storage exceed
       *
       * @param {string} name the key of local storage
       * @param {string} value the key of local storage
       * @param {string} expire the expire of local storage
       */

    }, {
      key: '_exceedHandler',
      value: function _exceedHandler(name, value, expire) {
        var minTimeStamp = void 0;
        var key = void 0;

        if (!this.rmExpires()) {
          var ls = localStorage;
          for (var k in ls) {
            if (ls[k]) {
              var item = parseJson(ls[k]).u;
              if (!key || parseInt(item, 10) < minTimeStamp) {
                key = k;
                minTimeStamp = parseInt(item, 10);
              }
            }
          }
          this._rmLocalStorage(key);
        }
        this.set(name, value, expire);
      }
    }]);
    return LocalStorage;
  }();

  /**
   * Publisher manage storage, via request
   *
   * @class
   */


  var AsyncStorage = function () {
    function AsyncStorage() {
      classCallCheck(this, AsyncStorage);
    }

    createClass(AsyncStorage, [{
      key: 'request',

      /**
       * Send request to server with params
       *
       * @param {Object} opt request params
       */
      value: function request(opt) {
        if (!opt || !opt.url) {
          return;
        }

        var myInit = {};
        myInit.mode = opt.mode ? opt.mode : null;
        myInit.method = opt.method ? opt.method : 'GET';
        myInit.credentials = opt.credentials ? opt.credentials : 'omit';
        myInit.cache = opt.cache ? opt.cache : 'default';
        if (opt.headers) {
          myInit.headers = opt.headers;
        }
        if (opt.body) {
          myInit.body = opt.body;
        }
        fetch(opt.url, myInit).then(function (res) {
          if (res.ok) {
            res.text().then(function (data) {
              return opt.success && opt.success(parseJson(data));
            });
          } else {
            opt.error && opt.error(res);
          }
        }).catch(function (err) {
          return opt.error && opt.error(err);
        });
      }
    }]);
    return AsyncStorage;
  }();

  /**
   * Cookie storage
   *
   * @class
   */


  var CookieStorage = function () {
    function CookieStorage() {
      classCallCheck(this, CookieStorage);
    }

    createClass(CookieStorage, [{
      key: 'delExceedCookie',

      /**
       * Delete exceed cookie storage
       *
       * @param {Object} opt request params
       */
      value: function delExceedCookie() {
        // don't execute in origin page
        if (this._notIframed()) {
          return;
        }

        var domain = window.location.hostname;
        var cks = document.cookie;
        var MINSIZE = 3 * 1024;
        var MAXSIZE = 5 * 1024;

        if (document.cookie.length < MAXSIZE) {
          return;
        }

        var items = cks.split(';');
        for (var i = 0; i < items.length; i++) {
          var item = items[i].split('=');
          if (item && item.length > 1) {
            var expires = new Date();
            var key = item[0].trim();
            var value = item[1].trim();

            expires.setMilliseconds(expires.getMilliseconds() - 1 * 864e+5);
            this._set({
              key: key,
              value: value,
              expires: expires,
              domain: domain
            });
            if (this._get(key)) {
              this._set({
                key: key,
                value: value,
                expires: expires,
                domain: domain.split('.').slice(-2).join('.')
              });
            }
          }
          if (document.cookie.length <= MINSIZE) {
            break;
          }
        }
      }

      /**
       * Whether iframed or not
       *
       * @return {string} Whether iframed
       */

    }, {
      key: '_notIframed',
      value: function _notIframed() {
        return window === top;
      }

      /**
       * Get cookie
       *
       * @param {string} name cookie name
       * @return {string} cookie value
       */

    }, {
      key: '_get',
      value: function _get(name) {
        name = name.trim();

        var cks = document.cookie;
        var cookies = cks ? cks.split(';') : [];
        for (var i = 0, len = cookies.length; i < len; i++) {
          var cookie = cookies[i];
          var items = cookie.split('=');
          if (items[0].trim() === name) {
            return items[1];
          }
        }
      }

      /**
       * Set cookie
       *
       * @param {Object} options cookie option
       */

    }, {
      key: '_set',
      value: function _set(options) {
        document.cookie = [options.key, '=', '; expires=' + options.expires.toGMTString(), '; path=/', '; domain=' + options.domain].join('');
      }
    }]);
    return CookieStorage;
  }();

  /**
   * Update local storage operation time
   *
   * @param {Object} storage it's local storage
   */


  function updateTime(storage) {
    storage.u = new Date().getTime();
  }

  /**
   * Parse json link JSON.parse
   *
   * @param {string} str parse string
   * @return {string} parsed string
   */
  function parseJson(str) {
    try {
      str = JSON.parse(str);
    } catch (e) {}
    return str;
  }

  /**
   * Get error message with error code
   *
   * @param {string} code error code
   * @param {string} name error name
   * @return {string} error message
   */
  function getErrorMess(code, name) {
    var mess = void 0;
    switch (code) {
      case eCode.siteExceed:
        mess = 'storage space need less than 4k';
        break;
      case eCode.lsExceed:
        mess = 'Uncaught DOMException: Failed to execute setItem on Storage: Setting the value of ' + name + ' exceeded the quota at ' + window.location.href;
    }
    return mess;
  }

  /**
   * Generate error object
   *
   * @param {string} code error code
   * @param {string} mess error name
   * @return {string} error object
   */
  function getError(code, mess) {
    return {
      errCode: code,
      errMess: mess
    };
  }

  /**
   * Storage Class
   *
   * @param {number} type type of storage
   * @class
   */
  function customStorage(type) {
    switch (type) {
      case storageType.ASYNCSTORAGE:
        return new AsyncStorage();
      case storageType.LOCALSTORAGE:
        return new LocalStorage();
      case storageType.COOKIESTORAGE:
        return new CookieStorage();
    }
  }

  /**
   * object string parser like JSON5
   * Refer to https://github.com/douglascrockford/JSON-js/blob/9139a9f6729f3c1623ca3ff5ccd58dec1523acab/json2.js
   *
   * @param {String} jsonStr Object string
   */

  /* eslint-disable no-eval */
  function jsonParse (jsonStr) {
    jsonStr = jsonStr.replace(/(["'])((\\{2})*|(.*?[^\\](\\{2})*))\1/g, function (item) {
      return item.replace(/[/*]/g, function (s) {
        return '\\' + s;
      });
    }).replace(/\/\/.*\n?/g, '').replace(/\/\*.*\*\//g, '');

    var rxone = /^[\],:{}\s]*$/;
    var rxtwo = /\\(?:["'\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rxthree = /"[^"\n\r]*"|'[^'\n\r]*'|[+-]?(Infinity|NaN)|([\u2e80-\u9fff]+|[_\w$][_\w\d$]*)\s*:|true|false|null|[+-]?\.?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?([xX][0-9a-fA-F]{1,2})?/g;
    var rxfour = /(?:^|:|,)(?:\s*\[)+/g;
    var validate = jsonStr.replace(rxtwo, '@').replace(rxthree, function (item) {
      return ']' + (/:$/.test(item) ? ':' : '');
    }).replace(rxfour, '');

    if (!rxone.test(validate)) {
      throw new Error(jsonStr + ' Content should be a valid JSON string!');
    }

    /**
     * 等价于在全局作用域调用，不影响uglify压缩变量名
     *
     * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval}
     */
    /* eslint-disable-next-line no-eval */
    var geval = eval;

    return geval('(' + jsonStr + ')');
  }

  /**
   * @file templates
   * @author sekiyika(pengxing@baidu.com)
   */

  var CACHED_ATTR = '_mip_template_cached';

  var Template = function () {
    function Template() {
      classCallCheck(this, Template);
    }

    createClass(Template, [{
      key: 'cache',
      value: function cache() {}
    }, {
      key: 'render',
      value: function render() {}
    }]);
    return Template;
  }();

  var Templates = function () {
    /**
     * Templates
     *
     * @constructor
     */
    function Templates() {
      classCallCheck(this, Templates);

      this._templates = {};
      this._solverList = {};
      this.Template = Template;
    }

    createClass(Templates, [{
      key: '_create',
      value: function _create(type) {
        if (!this._templates[type]) {
          var solve = void 0;
          this._templates[type] = new Promise(function (resolve) {
            solve = resolve;
          });
          this._solverList[type] = solve;
        }
        return this._templates[type];
      }
    }, {
      key: '_getTemplate',
      value: function _getTemplate(type) {
        return this._create(type);
      }
    }, {
      key: 'register',
      value: function register(type, Template) {
        this._create(type);
        var solve = this._solverList[type];
        solve(new Template());
      }
    }, {
      key: 'isTemplateClass',
      value: function isTemplateClass(obj) {
        if (!obj || !obj.prototype) {
          return false;
        }
        return Template.prototype.isPrototypeOf(obj.prototype);
      }
    }, {
      key: 'render',
      value: function render(element, data, obj) {
        var _this = this;

        var template = this.find(element);

        if (!template) {
          return;
        }

        var type = template.getAttribute('type');
        var templateHTML = template.innerHTML;

        return this._getTemplate(type).then(function (impl) {
          if (!template[CACHED_ATTR]) {
            template[CACHED_ATTR] = true;
            impl.cache(templateHTML);
          }

          data = _this.extendFun(data);

          // array
          if (Array.isArray(data)) {
            if (data.length === 0) {
              return Promise.resolve([]);
            }
            return data.map(function (item) {
              return impl.render(templateHTML, item);
            });
          }

          // cb
          if (obj) {
            return { element: element, html: impl.render(templateHTML, data) };
          }

          // html
          return impl.render(templateHTML, data);
        });
      }
    }, {
      key: 'find',
      value: function find(element) {
        if (!element || element.nodeType !== 1) {
          return console.error('Template parent element must be a node element');
        }
        var templateId = element.getAttribute('template');
        var template = void 0;

        template = templateId ? document.getElementById(templateId) : element.querySelector('template');

        if (!template) {
          return console.error('Can not find template element');
        }

        return template;
      }
    }, {
      key: 'extendFun',
      value: function extendFun(data) {
        try {
          data.escape2Html = function () {
            return function (text, render) {
              return render(text).replace(/&lt;/ig, '<').replace(/&gt;/ig, '>').replace(/&#x2F;/ig, '/');
            };
          };

          data.isSF = function () {
            return this.urltype === 'sf';
          };
        } catch (e) {}
        return data;
      }
    }, {
      key: 'inheritTemplate',
      value: function inheritTemplate() {
        return function (_Template) {
          inherits(Inheritor, _Template);

          function Inheritor() {
            classCallCheck(this, Inheritor);
            return possibleConstructorReturn(this, (Inheritor.__proto__ || Object.getPrototypeOf(Inheritor)).apply(this, arguments));
          }

          return Inheritor;
        }(Template);
      }
    }]);
    return Templates;
  }();

  var templates = new Templates();

  /**
   * Returns a Deferred struct, which holds a pending promise and its associated
   * resolve and reject functions.
   *
   * This is preferred instead of creating a Promise instance to extract the
   * resolve/reject functions yourself:
   *
   * ```
   * // Avoid doing
   * let resolve;
   * const promise = new Promise(res => {
   *   resolve = res;
   * });
   *
   * // Good
   * const deferred = new Deferred();
   * const {promise, resolve} = deferred;
   * ```
   *
   * @template T
   */
  var Deferred = function Deferred() {
    var _this = this;

    classCallCheck(this, Deferred);

    /**
     * @type {Promise<T>}
     */
    this.promise = new Promise(function (resolve, reject) {
      _this.resolve = resolve;
      _this.reject = reject;
    });
  };

  var LIST = ['info', 'log', 'warn', 'error'];

  var Log = function Log(name) {
    var _this = this;

    classCallCheck(this, Log);

    LIST.forEach(function (item) {
      _this[item] = function (log) {
        console[item]('[' + name + '] ' + log);
      };
    });
  };

  var log = (function (name) {
    return new Log(name);
  });

  /**
   * @file util entry
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * Exchange a url to cache url.
   *
   * @param {string} url Source url.
   * @param {string} type The url type.
   * @param {boolean} containsHost The url type.
   * @return {string} Cache url.
   */
  function makeCacheUrl(url, type, containsHost) {
    if (fn.isCacheUrl(url) || !fn.isCacheUrl(location.href) || url && url.length < 8 || !(url.indexOf('http') === 0 || url.indexOf('//') === 0)) {
      return url;
    }
    var prefix = type === 'img' ? '/i/' : '/c/';
    if (url.indexOf('//') === 0 || url.indexOf('https') === 0) {
      prefix += 's/';
    }
    var urlParas = url.split('//');
    urlParas.shift();
    var host = urlParas[0].substring(0, urlParas[0].indexOf('/'));
    url = urlParas.join('//');

    var result = prefix + url;
    if (containsHost) {
      result = location.protocol + '//' + host.replace(/-/g, '--').replace(/\./g, '-') + '.mipcdn.com' + result;
    }

    return result;
  }

  /**
   * Exchange cache url to origin url.
   * Reg result has many aspects, it's following
   *  reg[0] whole url
   *  reg[1] url protocol
   *  reg[2] url mip cache domain
   *  reg[3] url domain extname
   *  reg[4] /s flag
   *  reg[5] origin url
   *
   * @param {string} url Source url.
   * @return {string} origin url.
   */
  function parseCacheUrl(url) {
    if (!url) {
      return url;
    }
    if (!(url.indexOf('http') === 0 || url.indexOf('/') === 0)) {
      return url;
    }
    var reg = new RegExp('^(http(?:s?):)?(//([^/]+))?/[ic](/s)?/(.*)$', 'g');
    var result = reg.exec(url);
    if (!result) {
      return url;
    }
    var uri = result[4] ? 'https:' : 'http:';
    uri += result[5] ? '//' + result[5] : '';
    var urlRegExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
    if (!urlRegExp.test(uri)) {
      return url;
    }
    return uri;
  }

  /**
   * 获取页面原 mip url，可以将页面 mip-cache url 处理为原页面
   * 由于 cache-url 可能会被改写，需要还原
   *
   * @param {string=} url 传入的 URL
   * @return {string} 原 mip 页 URL
   */
  function getOriginalUrl(url) {
    /* istanbul ignore if */
    if (!url) {
      url = window.location.href;
    }
    var parsedUrl = parseCacheUrl(url);
    if (parsedUrl === url) {
      // 直接打开 MIP 页
      return parsedUrl;
    }
    // mip-cache 页面
    var urlWithoutHash = parsedUrl.split('#')[0];
    var originHash = hash.get('mipanchor');
    return urlWithoutHash + (originHash.length ? '#' : '') + originHash;
  }

  /**
   * Whether pageUrl is mip cache url.
   *
   * @param {string} pageUrl - current page url.
   * @return {boolean} isCacheUrl.
   */
  function isCacheUrl$1(pageUrl) {
    return fn.isCacheUrl(pageUrl);
  }

  var util = {
    fn: fn,
    dom: dom,
    event: event,
    rect: rect,
    css: css,
    hash: hash,
    platform: platform,
    parseCacheUrl: parseCacheUrl,
    makeCacheUrl: makeCacheUrl,
    getOriginalUrl: getOriginalUrl,
    isCacheUrl: isCacheUrl$1,
    EventEmitter: EventEmitter,
    Gesture: Gesture,
    customStorage: customStorage,
    naboo: Naboo,
    jsonParse: jsonParse,
    templates: templates,
    Deferred: Deferred,
    log: log
  };

  var ServicesFactory = function () {
    function ServicesFactory() {
      classCallCheck(this, ServicesFactory);
    }

    createClass(ServicesFactory, null, [{
      key: 'extensionsFor',

      /**
       * @param {!Window} win
       * @returns {import('./extensions').Extensions}
       */
      value: function extensionsFor(win) {
        return Services.getService(win, 'extensions');
      }

      /**
       * @param {!Window} win
       * @returns {import('./mipdoc').Mipdoc}
       */

    }, {
      key: 'mipdocFor',
      value: function mipdocFor(win) {
        return Services.getService(win, 'mipdoc');
      }

      /**
       * @param {!Window} win
       * @returns {import('./timer').Timer}
       */

    }, {
      key: 'timerFor',
      value: function timerFor(win) {
        return Services.getService(win, 'timer');
      }
    }]);
    return ServicesFactory;
  }();

  var ServicesInternal = function () {
    function ServicesInternal() {
      classCallCheck(this, ServicesInternal);
    }

    createClass(ServicesInternal, null, [{
      key: 'getServices',

      /**
       * Returns the object that holds the services registered in a holder.
       *
       * @param {!Window} holder
       * @returns {Object}
       * @private
       */
      value: function getServices(holder) {
        var services = holder.services;


        if (!services) {
          services = holder.services = {};
        }

        return services;
      }

      /**
       * Instantiates the given service. Fulfills the pending promise if the service has been requested.
       * Returns instance of the service.
       *
       * @param {Object} service
       * @returns {Object}
       * @private
       */

    }, {
      key: 'instantiateService',
      value: function instantiateService(service) {
        var instance = service.instance;


        if (instance) {
          return instance;
        }

        var resolve = service.resolve,
            context = service.context,
            Constructor = service.Constructor;


        instance = new Constructor(context);

        service.instance = instance;
        service.context = null;
        service.Constructor = null;

        if (resolve) {
          resolve(instance);
        }

        return instance;
      }

      /**
       * Registers a service on `holder`. Returns the registered service.
       *
       * @param {!Window} holder
       * @param {string} id
       * @param {!Object} context
       * @param {!Function} Constructor
       * @param {?boolean} instantiate
       * @returns {!Object}
       */

    }, {
      key: 'registerService',
      value: function registerService(holder, id, context, Constructor, instantiate) {
        var services = this.getServices(holder);
        var service = services[id];

        /**
         * Service has not been registered on holder.
         */
        if (!service) {
          service = services[id] = {
            instance: null,
            promise: null,
            resolve: null,
            context: null,
            Constructor: null
          };
        }

        /**
         * Service has an implementation.
         */
        if (service.instance || service.Constructor) {
          return service;
        }

        service.context = context;
        service.Constructor = Constructor;

        /**
         * Service may have been requested already, in which case we need to fulfill the pending promise.
         */
        if (service.resolve || instantiate) {
          this.instantiateService(service);
        }

        return service;
      }
      /**
       * Service doesn't have an implementation or a pending promise.
       * It means the service has not been registered on `holder`.
       * Registers a service on `holder` with a pending promise and returns it.
       *
       * @param {!Window} holder
       * @param {string} id
       * @returns {!Object}
       */

    }, {
      key: 'registerPendingService',
      value: function registerPendingService(holder, id) {
        var services = this.getServices(holder);
        var service = services[id] = {
          instance: null,
          context: null,
          Constructor: null
        };

        var _ref = new Deferred(),
            promise = _ref.promise,
            resolve = _ref.resolve;

        service.promise = promise;
        service.resolve = resolve;

        return service;
      }

      /**
       * Returns instance of registered service from `holder` by `id`.
       *
       * @template T
       * @param {!Window} holder
       * @param {string} id
       * @returns {T}
       */

    }, {
      key: 'getService',
      value: function getService(holder, id) {
        var service = this.getServices(holder)[id];

        return this.instantiateService(service);
      }

      /**
       * Similar to `getService`, but returns `null` if the service has not been registered.
       *
       * @template T
       * @param {!Window} holder
       * @param {string} id
       * @returns {?T}
       */

    }, {
      key: 'getServiceOrNull',
      value: function getServiceOrNull(holder, id) {
        var service = this.getServices(holder)[id];

        if (!service || !service.instance && !service.Constructor) {
          return null;
        }

        return this.instantiateService(service);
      }

      /**
       * Similar to `getServicePromiseInternal`, but returns `null` if the service has not been registered.
       *
       * @template T
       * @param {!Window} holder
       * @param {string} id
       * @returns {?Promise<T>}
       */

    }, {
      key: 'getServicePromiseOrNull',
      value: function getServicePromiseOrNull(holder, id) {
        var service = this.getServices(holder)[id];

        if (!service) {
          return null;
        }

        if (!service.promise) {
          service.promise = Promise.resolve(this.instantiateService(service));
        }

        return service.promise;
      }

      /**
       * Returns a promise for a service for the given `id` and `holder`.
       * The promise resolves when the implementation loaded.
       *
       * @template T
       * @param {!Window} holder
       * @param {string} id
       * @returns {Promise<T>}
       */

    }, {
      key: 'getServicePromise',
      value: function getServicePromise(holder, id) {
        var cached = this.getServicePromiseOrNull(holder, id);

        if (cached) {
          return cached;
        }

        var _registerPendingServi = this.registerPendingService(holder, id),
            promise = _registerPendingServi.promise;

        return promise;
      }
    }]);
    return ServicesInternal;
  }();

  var Services = function (_ServicesFactory) {
    inherits(Services, _ServicesFactory);

    function Services() {
      classCallCheck(this, Services);
      return possibleConstructorReturn(this, (Services.__proto__ || Object.getPrototypeOf(Services)).apply(this, arguments));
    }

    createClass(Services, null, [{
      key: 'registerService',

      /**
       * Registers a service on `holder` with given `id` and implementation.
       *
       * @param {!Window} holder currently represents `Window`.
       * @param {string} id of the service.
       * @param {!Function} Constructor of the service.
       * @param {?boolean} instantiate service immediately.
       */
      value: function registerService(holder, id, Constructor, instantiate) {
        ServicesInternal.registerService(holder, id, holder, Constructor, instantiate);
      }

      /**
       * Returns a service for the given `id` and `holder`.
       *
       * @template T typeof service instance.
       * @param {!Window} holder currently represents `Window`.
       * @param {string} id of the service.
       * @returns {T}
       */

    }, {
      key: 'getService',
      value: function getService(holder, id) {
        return ServicesInternal.getService(holder, id);
      }

      /**
       * Similar to `getService`, but returns `null` if the service has not been registered.
       *
       * @template T typeof service instance.
       * @param {!Window} holder currently represents `Window`.
       * @param {string} id of the service.
       * @returns {?T}
       */

    }, {
      key: 'getServiceOrNull',
      value: function getServiceOrNull(holder, id) {
        return ServicesInternal.getServiceOrNull(holder, id);
      }

      /**
       * Similar to `getServicePromise`, but returns `null` if the service has not been registered.
       *
       * @template T typeof service instance.
       * @param {!Window} holder currently represents `Window`.
       * @param {string} id of the service.
       * @returns {?Promise<T>}
       */

    }, {
      key: 'getServicePromiseOrNull',
      value: function getServicePromiseOrNull(holder, id) {
        return ServicesInternal.getServicePromiseOrNull(holder, id);
      }

      /**
       * Returns a promise for a service for the given `id` and `holder`.
       * The promise resolves when the implementation loaded.
       *
       * @template T typeof service instance.
       * @param {!Window} holder currently represents `Window`.
       * @param {string} id of the service.
       * @returns {Promise<T>}
       */

    }, {
      key: 'getServicePromise',
      value: function getServicePromise(holder, id) {
        return ServicesInternal.getServicePromise(holder, id);
      }
    }]);
    return Services;
  }(ServicesFactory);

  /**
   * @file css loader
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * Creates the properly configured style element.
   *
   * @param {Document} doc doc
   * @param {Element|ShadowRoot} cssRoot css root
   * @param {string} cssText css text
   * @param {string} name name
   * @param {boolean} isRuntimeCss is runtime css
   * @return {Element}
  */
  function insertStyleElement(doc, cssRoot, cssText, name, isRuntimeCss) {
    var style = doc.createElement('style');
    var afterElement = null;

    style.textContent = cssText;

    if (isRuntimeCss) {
      style.setAttribute('mip-main', '');
    } else {
      style.setAttribute('mip-extension', name || '');
      afterElement = cssRoot.querySelector('style[mip-main]');
    }

    insertAfterOrAtStart(cssRoot, style, afterElement);
    return style;
  }

  function insertAfterOrAtStart(styleRoot, styleElement, afterElement) {
    afterElement ? afterElement.nextSibling ? styleRoot.insertBefore(styleElement, afterElement.nextSibling) : styleRoot.appendChild(styleElement) : styleRoot.insertBefore(styleElement, styleRoot.firstChild);
  }

  var cssLoader = {
    insertStyleElement: insertStyleElement
  };

  /**
   * @file layout.js
   * @author huanghuiquan (huanghuiquan@baidu.com)
   */

  var dom$1 = util.dom,
      css$1 = util.css;


  var SPACE_TAG_NAME = 'mip-i-space';

  /**
   * Layout types.
   * @inner
   * @const
   * @type {Object}
   */
  var LAYOUT = {
    NODISPLAY: 'nodisplay',
    FIXED: 'fixed',
    FIXED_HEIGHT: 'fixed-height',
    RESPONSIVE: 'responsive',
    CONTAINER: 'container',
    FILL: 'fill',
    FLEX_ITEM: 'flex-item',
    INTRINSIC: 'intrinsic'

    /**
     * Natural dimensions.
     * @inner
     * @const
     * @type {Object}
     */
  };var NATURAL_DIMENSIONS = {
    'mip-pix': {
      width: '1px',
      height: '1px'
    },
    'mip-stats': {
      width: '1px',
      height: '1px'
    },
    'mip-audio': null

    /**
     * get layout name
     *
     * @param {string} s layout type string
     * @return {Layout|undefined} Returns undefined in case of failure to parse
     *   the layout string.
     */
  };function parseLayout(s) {
    for (var i in LAYOUT) {
      if (LAYOUT[i] === s) {
        return s;
      }
    }
    return undefined;
  }

  /**
   * get layout class by layout name
   *
   * @param {Layout} layout layout name
   * @return {string}
   */
  function getLayoutClass(layout) {
    return 'mip-layout-' + layout;
  }

  /**
   * Whether an element with this layout inherently defines the size.
   *
   * @param {Layout} layout layout name
   * @return {boolean}
   */
  function isLayoutSizeDefined(layout) {
    return layout === LAYOUT.FIXED || layout === LAYOUT.FIXED_HEIGHT || layout === LAYOUT.RESPONSIVE || layout === LAYOUT.FILL || layout === LAYOUT.FLEX_ITEM || layout === LAYOUT.INTRINSIC;
  }

  /**
   * Returns the numeric value of a CSS length value.
   *
   * @param {string} length length string
   * @return {number}
   */
  function getLengthNumeral(length) {
    return parseFloat(length);
  }

  /**
   * Determines whether the tagName is a known element that has natural dimensions
   * in our runtime or the browser.
   *
   * @param {string} tagName The element tag name.
   * @return {DimensionsDef}
   */
  function hasNaturalDimensions(tagName) {
    tagName = tagName.toLowerCase();
    return NATURAL_DIMENSIONS[tagName] !== undefined;
  }

  /**
   * Determines the default dimensions for an element which could lety across
   * different browser implementations, like <audio> for instance.
   * This operation can only be completed for an element whitelisted by
   * `hasNaturalDimensions`.
   *
   * @param {!Element} element html element
   * @return {DimensionsDef}
   */
  function getNaturalDimensions(element) {
    var tagName = element.tagName.toLowerCase();
    if (!NATURAL_DIMENSIONS[tagName]) {
      var doc = element.ownerDocument;
      var naturalTagName = tagName.replace(/^mip-/, '');
      var temp = doc.createElement(naturalTagName);
      // For audio, should no-op elsewhere.
      temp.controls = true;
      temp.style.position = 'absolute';
      temp.style.visibility = 'hidden';
      doc.body.appendChild(temp);
      NATURAL_DIMENSIONS[tagName] = {
        width: (temp.offsetWidth || 1) + 'px',
        height: (temp.offsetHeight || 1) + 'px'
      };
      doc.body.removeChild(temp);
    }
    return NATURAL_DIMENSIONS[tagName];
  }

  /**
   * Parses the CSS length value. If no units specified, the assumed value is
   * "px". Returns undefined in case of parsing error.
   *
   * @param {string|undefined} s length string
   * @return {!LengthDef|undefined}
   */
  function parseLength(s) {
    if (typeof s === 'number') {
      return s + 'px';
    }
    if (!s) {
      return undefined;
    }
    if (!/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)?$/.test(s)) {
      return undefined;
    }
    if (/^\d+(\.\d+)?$/.test(s)) {
      return s + 'px';
    }
    return s;
  }

  /**
   * Apply layout for a MIPElement.
   *
   * @param {MIPElement} element html element
   * @return {string}
   */
  function applyLayout(element) {
    var layoutAttr = element.getAttribute('layout');
    var widthAttr = element.getAttribute('width');
    var heightAttr = element.getAttribute('height');
    var sizesAttr = element.getAttribute('sizes');
    var heightsAttr = element.getAttribute('heights');

    // Input layout attributes.
    var inputLayout = layoutAttr ? parseLayout(layoutAttr) : null;
    var inputWidth = widthAttr && widthAttr !== 'auto' ? parseLength(widthAttr) : widthAttr;
    var inputHeight = heightAttr ? parseLength(heightAttr) : null;

    // Effective layout attributes. These are effectively constants.
    var width = void 0;
    var height = void 0;
    var layout = void 0;

    // Calculate effective width and height.
    if ((!inputLayout || inputLayout === LAYOUT.FIXED || inputLayout === LAYOUT.FIXED_HEIGHT) && (!inputWidth || !inputHeight) && hasNaturalDimensions(element.tagName)) {
      // Default width and height: handle elements that do not specify a
      // width/height and are defined to have natural browser dimensions.
      var dimensions = getNaturalDimensions(element);
      width = inputWidth || inputLayout === LAYOUT.FIXED_HEIGHT ? inputWidth : dimensions.width;
      height = inputHeight || dimensions.height;
    } else {
      width = inputWidth;
      height = inputHeight;
    }

    // Calculate effective layout.
    if (inputLayout) {
      layout = inputLayout;
    } else if (!width && !height) {
      layout = LAYOUT.CONTAINER;
    } else if (height && (!width || width === 'auto')) {
      layout = LAYOUT.FIXED_HEIGHT;
    } else if (height && width && (sizesAttr || heightsAttr)) {
      layout = LAYOUT.RESPONSIVE;
    } else {
      layout = LAYOUT.FIXED;
    }

    // Apply UI.
    element.classList.add(getLayoutClass(layout));
    if (isLayoutSizeDefined(layout)) {
      element.classList.add('mip-layout-size-defined');
    }

    switch (layout) {
      case LAYOUT.NODISPLAY:
        css$1(element, {
          display: 'none'
        });
        break;
      case LAYOUT.FIXED:
        css$1(element, {
          width: width,
          height: height
        });
        break;
      case LAYOUT.FIXED_HEIGHT:
        css$1(element, {
          height: height
        });
        break;
      case LAYOUT.RESPONSIVE:
        var space = element.spaceElement || element.ownerDocument.createElement(SPACE_TAG_NAME);
        // 简单搜索会把space误判为广告，把display设置为none，加内容跳过这个坑
        space.innerHTML = 'space';
        css$1(space, {
          display: 'block',
          paddingTop: getLengthNumeral(height) / getLengthNumeral(width) * 100 + '%'
        });
        element.insertBefore(space, element.firstChild);
        element.spaceElement = space;
        break;
      case LAYOUT.INTRINSIC:
        var ispace = element.spaceElement || dom$1.create('\n        <mip-i-space class="mip-i-space">\n          <img class="mip-i-intrinsic-space" />\n        </mip-i-space>');
        var intrinsicSpace = ispace.firstElementChild;
        intrinsicSpace.setAttribute('src', 'data:image/svg+xml;charset=utf-8,<svg height="' + height + '" width="' + width + '" xmlns="http://www.w3.org/2000/svg" version="1.1"/>');
        element.insertBefore(ispace, element.firstChild);
        element.spaceElement = ispace;
        break;
      case LAYOUT.FILL:
        break;
      case LAYOUT.CONTAINER:
        break;
      case LAYOUT.FLEX_ITEM:
        width && css$1(element, { width: width });
        height && css$1(element, { height: height });
        break;
    }

    if (element.classList.contains('mip-hidden')) {
      element.classList.remove('mip-hidden');
    }
    return layout;
  }

  /**
   * @file event-action.js
   * @author huanghuiquan (huanghuiquan@baidu.com)
   */

  /* global MIP */

  /**
   * Regular for parsing params.
   * @const
   * @inner
   * @type {RegExp}
   */
  var PARSE_REG = /^(\w+):\s*([\w-]+)\.([\w-$]+)(?:\((.+)\))?$/;

  /**
   * Regular for parsing event argument.
   * @const
   * @inner
   * @type {RegExp}
   */
  var EVENT_ARG_REG = /event(\.\w+)+/g;

  /**
   * Regular for checking elements.
   * @const
   * @inner
   * @type {RegExp}
   */
  var CHECK_REG = /^mip-/;

  /**
   * Key list of picking options.
   * @const
   * @inner
   * @type {Array}
   */
  var OPTION_KEYS = ['executeEventAction', 'parse', 'checkTarget', 'getTarget', 'attr'];

  /**
   * MIP does not support external JavaScript, so we provide EventAction to trigger events between elements.
   * TODO: refactor
   *
   * @class
   */

  var EventAction = function () {
    function EventAction(opt) {
      classCallCheck(this, EventAction);

      opt && fn.extend(this, fn.pick(opt, OPTION_KEYS));
      this.attr = 'on';
      this.globalTargets = {};

      this.installAction();
    }

    /**
     * Install global action. such as on=tap:MIP.setData
     */


    createClass(EventAction, [{
      key: 'installAction',
      value: function installAction() {
        this.addGlobalTarget('MIP', this.handleMIPTarget);
      }

      /**
       * Handle global action
       *
       * @param {Object} action event action
       */

    }, {
      key: 'handleMIPTarget',
      value: function handleMIPTarget(action) {
        /* istanbul ignore next */
        if (!action) {
          return;
        }

        var target = action.event && action.event.target ? action.event.target : {};

        var allowedGlobals = ('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'm' // MIP global data
        ).split(',');

        var hasProxy = typeof Proxy !== 'undefined';
        var proxy = hasProxy ? new Proxy({
          DOM: target
        }, {
          has: function has(target, key) {
            var allowed = allowedGlobals.indexOf(key) >= 0;
            return target[key] || !allowed;
          }
        }) : {};

        var fn$$1 = new Function('DOM', 'with(this){return ' + action.arg + '}'); // eslint-disable-line
        var data = fn$$1.call(proxy);

        if (action.handler === 'setData') {
          MIP.setData(data);
        } else if (action.handler === '$set') {
          MIP.$set(data);
        } else {
          throw new Error('Can not find handler "' + action.handler + '" from MIP.');
        }
      }

      /**
       * Add global target in order to event
       *
       * @param {string} name name
       * @param {Function} handler handler
       */

    }, {
      key: 'addGlobalTarget',
      value: function addGlobalTarget(name, handler) {
        /* istanbul ignore next */
        if (!name) {
          return;
        }
        this.globalTargets[name] = handler;
      }

      /**
       * Execute the event-action.
       *
       * @param {string} type The event's type
       * @param {HTMLElement} target The source element of native event.
       * @param {Event} nativeEvent The native event.
       */

    }, {
      key: 'execute',
      value: function execute(type, target, nativeEvent) {
        if (!target) {
          return;
        }
        var attr = void 0;
        var attrSelector = '[' + this.attr + ']';

        do {
          attr = target.getAttribute(this.attr);
          if (attr) {
            this._execute(this.parse(attr, type, nativeEvent));
            target = target.parentElement;
            if (!target) {
              return;
            }
          }
          target = dom.closest(target, attrSelector);
        } while (target);
      }

      /**
       * Ensure the target element is a MIPElement
       *
       * @param {HTMLElement} target target
       * @return {boolean}
       */

    }, {
      key: 'checkTarget',
      value: function checkTarget(target) {
        return target && target.tagName && CHECK_REG.test(target.tagName.toLowerCase());
      }

      /**
       * Get the target element by ID
       *
       * @param {string} id id
       * @return {HTMLElement}
       */

    }, {
      key: 'getTarget',
      value: function getTarget(id) {
        return document.getElementById(id);
      }

      /**
       * Excute the 'executeEventAction' of a MIPElement.
       *
       * @param {Object} action action
       * @param {MIPElement} target target
       */

    }, {
      key: 'executeEventAction',
      value: function executeEventAction(action, target) {
        target.executeEventAction && target.executeEventAction(action);
      }

      /**
       * Excute the parsed actions.
       *
       * @private
       * @param {Array.<Object>} actions event action
       */

    }, {
      key: '_execute',
      value: function _execute(actions) {
        for (var i = 0, len = actions.length; i < len; i++) {
          var action = actions[i];
          var globalTarget = this.globalTargets[action.id];
          if (globalTarget) {
            globalTarget(action);
            continue;
          }
          var target = this.getTarget(action.id);
          if (this.checkTarget(target)) {
            this.executeEventAction(action, target);
            // setTimeout(() => this.executeEventAction(action, target))
          }
        }
      }
    }, {
      key: 'parse',
      value: function parse(str, type, event) {
        if (typeof str !== 'string') {
          return [];
        }

        var isQuote = function isQuote(char) {
          return char === '"' || char === '\'';
        };
        var isSpace = function isSpace(char) {
          return char === ' ';
        };
        var isColon = function isColon(char) {
          return char === ':';
        };

        var pos = 0;
        var actions = [];
        var pstack = [];
        for (var i = 0, slen = str.length; i < slen; i++) {
          var peek = pstack[pstack.length - 1];
          var char = str[i];

          if (char === '(' && !isQuote(peek)) {
            pstack.push(char);
          } else if (char === ')' && peek === '(') {
            pstack.pop();
          } else if (isQuote(char) && str[i - 1] !== '\\') {
            if (peek === char) {
              pstack.pop();
            } else {
              pstack.push(char);
            }
          } else if (isColon(char) && !pstack.length) {
            pstack.push(char);
          } else if (isColon(peek) && !isSpace(str[i + 1])) {
            pstack.pop();
          } else if (isSpace(char) && !pstack.length) {
            var _act = str.substring(pos, i).trim(' ');
            _act && actions.push(_act);
            pos = i;
          }
        }

        if (pstack.length) {
          throw new SyntaxError('Can not match ' + pstack[pstack.length - 1] + ' in statement: \'on=' + str + '\'');
        }

        var act = str.substring(pos, str.length).trim(' ');
        act && actions.push(act);

        var result = [];
        for (var _i = 0, len = actions.length; _i < len; _i++) {
          var action = actions[_i].replace(/\n/g, '');
          var matchedResult = action.match(PARSE_REG);
          var arg = this.handleArguments(matchedResult[4], event);
          if (matchedResult && matchedResult[1] === type) {
            result.push({
              type: matchedResult[1],
              id: matchedResult[2],
              handler: matchedResult[3],
              arg: arg,
              event: event
            });
          }
        }
        return result;
      }

      /**
       * Replace the event dot references in arg string with their values
       *
       * @param {string} arg arguments string
       * @param {Event} event event
       * @return {string} new arg
       */

    }, {
      key: 'handleArguments',
      value: function handleArguments(arg, event) {
        var _this = this;

        if (!arg) {
          return undefined;
        }
        var data = { event: event };
        arg = arg.replace(EVENT_ARG_REG, function (expr) {
          // dereference the event dot expression, such as 'event.field1'
          var value = expr.split('.').reduce(function (value, part) {
            return part && value ? value[part] : undefined;
          }, data);
          return _this.convertToString(value);
        });
        return arg;
      }
    }, {
      key: 'convertToString',
      value: function convertToString(value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          return JSON.stringify(value);
        }
        return value + '';
      }
    }]);
    return EventAction;
  }();

  /**
   * Passive event listeners
   * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
   */
  var supportsPassiveFlag = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassiveFlag = true;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}
  var supportsPassive = supportsPassiveFlag;

  /**
   * transition & animation end event
   */
  var transitionEndEventName = 'transitionend';
  var animationEndEventName = 'animationend';

  /* istanbul ignore next */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionEndEventName = 'webkitTransitionEnd';
  }
  /* istanbul ignore next */
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationEndEventName = 'webkitAnimationEnd';
  }
  var transitionEndEvent = transitionEndEventName;
  var animationEndEvent = animationEndEventName;

  /**
   * @file path utils
   * @author panyuqi@baidu.com (panyuqi)
   * @author wangyisheng@baidu.com (wangyisheng)
   */

  function resolvePath(relative, base, append) {
    var firstChar = relative.charAt(0);
    if (firstChar === '/') {
      return relative;
    }

    if (firstChar === '?' || firstChar === '#') {
      return base + relative;
    }

    var stack = base.split('/');

    // remove trailing segment if:
    // - not appending
    // - appending to trailing slash (last segment is empty)
    if (!append || !stack[stack.length - 1]) {
      stack.pop();
    }

    // resolve relative path
    var segments = relative.replace(/^\//, '').split('/');
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      if (segment === '..') {
        stack.pop();
      } else if (segment !== '.') {
        stack.push(segment);
      }
    }

    // ensure leading slash
    if (stack[0] !== '') {
      stack.unshift('');
    }

    return stack.join('/');
  }

  function parsePath(path) {
    var hash = '';
    var query = '';

    var hashIndex = path.indexOf('#');
    if (hashIndex >= 0) {
      hash = path.slice(hashIndex);
      path = path.slice(0, hashIndex);
    }

    var queryIndex = path.indexOf('?');
    if (queryIndex >= 0) {
      query = path.slice(queryIndex + 1);
      path = path.slice(0, queryIndex);
    }

    return {
      path: path,
      query: query,
      hash: hash
    };
  }

  function getLocation() {
    return window.location.href;
  }

  /**
   * clean pageId
   *
   * @param {string} pageId pageId
   * @return {string} cleaned pageId
   */
  function getCleanPageId(pageId) {
    var hashReg = /#.*$/;
    return pageId && pageId.replace(hashReg, '');
  }

  /**
   * @file MIP 视图相关方法集合
   * @author sekiyika(pengxing@baidu.com)
   */
  // import fixedElement from './fixed-element'

  // Native objects.
  var docElem$2 = document.documentElement;
  var win = window;

  var _getWidth = function _getWidth() {
    return win.innerWidth || docElem$2.clientWidth;
  };
  var _getHeight = function _getHeight() {
    return platform.isIOS() ? docElem$2.clientHeight || win.innerHeight : win.innerHeight || docElem$2.clientHeight;
  };

  /**
   * 触发 scroll 事件
   */
  var scrollEvent = fn.throttle(function (event) {
    this.trigger('scroll', event);
  }, 1000 / 60);

  /**
   * 触发 changed 事件
   */
  var changedEvent = fn.throttle(function (event) {
    this.trigger('changed', event);
  }, 200);

  /**
   * 滚动事件回调
   *
   * @param {Object} event 事件对象
   */
  var scrollHandle = function scrollHandle(event) {
    scrollEvent.call(this, event);
    changedEvent.call(this, event);
  };

  /**
   * 窗口改变事件回调
   * https://stackoverflow.com/questions/8898412/iphone-ipad-triggering-unexpected-resize-events
   *
   * @param {Object} event 事件对象
   */
  var savedWindowWidth = null;
  var savedWindowHeight = null;
  var currentWindowWidth = void 0;
  var resizeEvent = fn.throttle(function (event) {
    currentWindowWidth = _getWidth();
    if (currentWindowWidth !== savedWindowWidth) {
      this.trigger('resize', event);
      savedWindowWidth = currentWindowWidth;
    }
    savedWindowHeight = _getHeight();
  }, 200);

  /**
   * The object is to solve a series of problems when the page in an iframe and
   * provide some additional methods.
   */
  var viewport = {
    /**
     * Initialize the viewport
     *
     * @return {Viewport}
     */
    init: function init() {
      this.scroller = platform.needSpecialScroll ? document.body : win;

      this.scroller.addEventListener('scroll', scrollHandle.bind(this), false);

      // 只在 iOS 下处理兼容性问题
      /* istanbul ignore if */
      if (platform.isIOS()) {
        savedWindowWidth = this.getWidth();
      }
      win.addEventListener('resize', resizeEvent.bind(this));
    },


    /**
     * Get the current vertical position of the page
     *
     * @return {number}
     */
    getScrollTop: function getScrollTop() {
      return rect.getScrollTop();
    },


    /**
     * Get the current horizontal position of the page
     *
     * @return {number}
     */
    getScrollLeft: function getScrollLeft() {
      return rect.getScrollLeft();
    },


    /**
     * Set the current vertical position of the page
     *
     * @param {number} top The target scrollTop
     */
    setScrollTop: function setScrollTop(top) {
      rect.setScrollTop(top || 1);
    },


    /**
     * Get the width of the viewport
     *
     * @return {number}
     */
    getWidth: function getWidth() {
      if (savedWindowWidth == null) {
        savedWindowWidth = _getWidth();
      }
      return savedWindowWidth;
    },


    /**
     * Get the height of the viewport
     *
     * @return {number}
     */
    getHeight: function getHeight() {
      /* istanbul ignore next */
      if (savedWindowHeight == null) {
        savedWindowHeight = _getHeight();
      }
      return savedWindowHeight;
    },


    /**
     * Get the scroll width of the page
     *
     * @return {number}
     */
    getScrollWidth: function getScrollWidth() {
      return rect.getScrollWidth();
    },


    /**
     * Get the scroll height of the page
     *
     * @return {number}
     */
    getScrollHeight: function getScrollHeight() {
      return rect.getScrollHeight();
    },


    /**
     * Get the rect of the viewport.
     *
     * @return {Object}
     */
    getRect: function getRect() {
      return rect.get(this.getScrollLeft(), this.getScrollTop(), this.getWidth(), this.getHeight());
    },
    isPortrait: function isPortrait() {
      return this.getHeight() > this.getWidth();
    }
  };

  // Mix the methods and attributes of Event into the viewport.
  EventEmitter.mixin(viewport);

  /**
   * @file const
   * @author wangyisheng@baidu.com (wangyisheng)
   */

  var MIP_IFRAME_CONTAINER = 'mip-page__iframe';
  var DEFAULT_SHELL_CONFIG = {
    header: {
      title: '',
      logo: '',
      buttonGroup: [],
      show: false
    },
    view: {
      isIndex: false
    }
  };

  var MESSAGE_ROUTER_PUSH = 'router-push';
  var MESSAGE_ROUTER_REPLACE = 'router-replace';
  var MESSAGE_ROUTER_BACK = 'router-back';
  var MESSAGE_ROUTER_FORWARD = 'router-forward';
  var MESSAGE_CROSS_ORIGIN = 'page-cross-origin';
  var MESSAGE_BROADCAST_EVENT = 'page-broadcast-event';
  var MESSAGE_PAGE_RESIZE = 'page-resize';
  var MESSAGE_MIPIFRAME_RESIZE = 'mip-iframe-resize';
  var MESSAGE_PAGE_ACTIVE = 'page-active';
  var MESSAGE_PRERENDER_INTERACTIVE = 'prerender-interactive';

  var NON_EXISTS_PAGE_ID = 'non-exists-page-id';
  var CUSTOM_EVENT_RESIZE_PAGE = 'resize-page';
  var CUSTOM_EVENT_SCROLL_TO_ANCHOR = 'scroll-to-anchor';
  var CUSTOM_EVENT_SHOW_PAGE = 'show-page';
  var CUSTOM_EVENT_HIDE_PAGE = 'hide-page';

  var MAX_PAGE_NUM = 6;

  // 和 SF 通讯的事件名称
  var OUTER_MESSAGE_PERFORMANCE_UPDATE = 'performance-update';
  var OUTER_MESSAGE_STABILITY_LOG = 'stability-log';
  var OUTER_MESSAGE_PERFORMANCE_ANALYSIS_LOG = 'performance-analysis-log';
  var OUTER_MESSAGE_CHANGE_STATE = 'change-state';
  var OUTER_MESSAGE_HISTORY_NAVIGATE = 'history-navigate';
  var OUTER_MESSAGE_PUSH_STATE = 'push-state';
  var OUTER_MESSAGE_REPLACE_STATE = 'replace-state';
  var OUTER_MESSAGE_CLOSE = 'close';

  var encodeReserveRE = /[!'()*]/g;
  var encodeReserveReplacer = function encodeReserveReplacer(c) {
    return '%' + c.charCodeAt(0).toString(16);
  };
  var commaRE = /%2C/g;

  // fixed encodeURIComponent which is more conformant to RFC3986:
  // - escapes [!'()*]
  // - preserve commas
  var encode = function encode(str) {
    return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
  };

  var decode = decodeURIComponent;

  function resolveQuery(query) {
    var parsedQuery = void 0;
    try {
      parsedQuery = parseQuery(query || '');
    } catch (e) {
      parsedQuery = {};
    }
    return parsedQuery;
  }

  function parseQuery(query) {
    var res = {};

    query = query.trim().replace(/^(\?|#|&)/, '');

    if (!query) {
      return res;
    }

    query.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = decode(parts.shift());
      var val = parts.length > 0 ? decode(parts.join('=')) : null;

      if (res[key] === undefined) {
        res[key] = val;
      } else if (Array.isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    });

    return res;
  }

  function stringifyQuery(obj) {
    var res = obj ? Object.keys(obj).map(function (key) {
      var val = obj[key];
      if (val === undefined) {
        return '';
      }

      if (val === null) {
        return encode(key);
      }

      if (Array.isArray(val)) {
        var result = [];
        val.forEach(function (val2) {
          if (val2 === undefined) {
            return;
          }

          if (val2 === null) {
            result.push(encode(key));
          } else {
            result.push(encode(key) + '=' + encode(val2));
          }
        });
        return result.join('&');
      }

      return encode(key) + '=' + encode(val);
    }).filter(function (x) {
      return x.length > 0;
    }).join('&') : null;
    return res ? '?' + res : '';
  }

  var trailingSlashRE = /\/?$/;
  var locationRE = /^(http(?:s?):\/\/[^/]+)(.*)/;

  /**
   * create route with raw url
   *
   * @param {string|Object} rawUrl rawUrl or location object
   * @param {Route} current currentRoute
   * @return {Object} route object
   */
  function normalizeLocation(rawUrl, current) {
    var next = rawUrl;

    // split origin out
    if (typeof rawUrl === 'string') {
      next = {
        path: rawUrl
      };
    }

    var matched = next.path.match(locationRE);
    if (matched) {
      next.origin = matched[1];
      next.path = matched[2];
    }

    var origin = next.origin || current.origin;
    var basePath = current && current.path || '/';
    var parsedPath = parsePath(next.path || '');

    var path = parsedPath.path ? resolvePath(parsedPath.path, basePath) : basePath;

    var query = resolveQuery(parsedPath.query);

    var hash = next.hash || parsedPath.hash;
    if (hash && hash.charAt(0) !== '#') {
      hash = '#' + hash;
    }

    return {
      origin: origin,
      path: path,
      query: query,
      hash: hash,
      meta: next.meta || {},
      fullPath: getFullPath({ origin: origin, path: path, query: query, hash: hash })
    };
  }

  /**
   * create route with location object
   *
   * @param {Object} location object
   * @return {Object} route object
   */
  function createRoute(location) {
    var route = {
      origin: location.origin || window.location.origin,
      path: location.path || location.pathname,
      query: location.query || resolveQuery(location.search),
      hash: location.hash,
      meta: location.meta || {}
    };
    var fullPath = getFullPath(route);
    route.fullPath = fullPath;
    return Object.freeze(route);
  }

  // the starting route that represents the initial state
  var START = createRoute({ path: '/' });

  function getFullPath(_ref) {
    var href = _ref.href,
        _ref$origin = _ref.origin,
        origin = _ref$origin === undefined ? window.location.origin : _ref$origin,
        _ref$path = _ref.path,
        path = _ref$path === undefined ? '/' : _ref$path,
        _ref$query = _ref.query,
        query = _ref$query === undefined ? {} : _ref$query,
        _ref$hash = _ref.hash,
        hash = _ref$hash === undefined ? '' : _ref$hash;

    return href || origin + path + stringifyQuery(query) + hash;
  }

  function isSameRoute(a, b, ignoreHash) {
    if (b === START) {
      return a === b;
    } else if (!b) {
      return false;
    } else if (a.origin !== b.origin) {
      return false;
    } else if (a.path && b.path) {
      return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && (ignoreHash || a.hash === b.hash) && isObjectEqual(a.query, b.query);
    }
    return false;
  }

  function isObjectEqual() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // handle null value #1566
    if (!a || !b) {
      return a === b;
    }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every(function (key) {
      var aVal = a[key];
      var bVal = b[key];
      // check nested equality
      if ((typeof aVal === 'undefined' ? 'undefined' : _typeof(aVal)) === 'object' && (typeof bVal === 'undefined' ? 'undefined' : _typeof(bVal)) === 'object') {
        return isObjectEqual(aVal, bVal);
      }
      return String(aVal) === String(bVal);
    });
  }

  /* istanbul ignore file */

  var raf$1 = fn.raf;


  var MIP_SHELL_HEADER = 'mip-shell-header';
  var MIP_PAGE_LOADING_WRAPPER = 'mip-page-loading-wrapper';
  var MIP_PAGE_FADE_HEADER_WRAPPER = 'mip-page-fade-header-wrapper';

  var BACK_BUTTON_SVG = ['<svg t="1530857979993" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3173"', 'xmlns:xlink="http://www.w3.org/1999/xlink">', '<path  fill="currentColor" d="M348.949333 511.829333L774.250667 105.728C783.978667 96 789.333333 83.712 789.333333 71.104c0-12.629333-5.354667-24.917333-15.082666-34.645333-9.728-9.728-22.037333-15.082667-34.645334-15.082667-12.586667 0-24.917333 5.333333-34.624 15.082667L249.557333 471.616A62.570667 62.570667 0 0 0 234.666667 512c0 10.410667 1.130667 25.408 14.890666 40.042667l455.424 435.605333c9.706667 9.728 22.016 15.082667 34.624 15.082667s24.917333-5.354667 34.645334-15.082667c9.728-9.728 15.082667-22.037333 15.082666-34.645333 0-12.608-5.354667-24.917333-15.082666-34.645334L348.949333 511.829333z"', 'p-id="3174"></path>', '</svg>'].join('');

  function createIFrame(_ref) {
    var fullpath = _ref.fullpath,
        pageId = _ref.pageId;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        onLoad = _ref2.onLoad,
        onError = _ref2.onError;

    var container = document.querySelector('.' + MIP_IFRAME_CONTAINER + '[data-page-id="' + pageId + '"]');

    // if exists, delete it first
    if (container) {
      container.parentNode.removeChild(container);
    }

    container = document.createElement('iframe');
    container.onload = function () {
      typeof onLoad === 'function' && onLoad(container);
    };
    container.onerror = function () {
      typeof onError === 'function' && onError(container);
    };
    // TODO: use XHR to load iframe so that we can get httpRequest.status 404
    var targetOrigin = normalizeLocation(pageId).origin;
    var pageMeta = JSON.stringify({
      standalone: window.MIP.standalone,
      isRootPage: false,
      isCrossOrigin: targetOrigin !== window.location.origin,
      rootName: window.MIP.viewer.rootName
    });
    container.setAttribute('name', pageMeta);

    if (!window.MIP.standalone) {
      if (fullpath.indexOf('#') === -1) {
        fullpath += '#mipservice=' + window.mipService;
      } else {
        fullpath += '&mipservice=' + window.mipService;
      }
    }
    container.setAttribute('src', fullpath);
    container.setAttribute('class', MIP_IFRAME_CONTAINER);

    /**
     * Fix an iOS iframe width bug, see examples/mip1/test.html
     * https://stackoverflow.com/questions/23083462/how-to-get-an-iframe-to-be-responsive-in-ios-safari
     */
    container.style.height = viewport.getHeight() + 'px';
    container.setAttribute('width', '100%');
    container.setAttribute('scrolling', platform.isIos() ? 'no' : 'yes');

    container.setAttribute('data-page-id', pageId);
    container.setAttribute('sandbox', 'allow-top-navigation allow-popups allow-scripts allow-forms allow-pointer-lock allow-popups-to-escape-sandbox allow-same-origin allow-modals');
    document.body.appendChild(container);

    return container;
  }

  function getIFrame(iframe) {
    if (typeof iframe === 'string') {
      return document.querySelector('.' + MIP_IFRAME_CONTAINER + '[data-page-id="' + iframe + '"]');
    }

    return iframe;
  }

  function hideAllIFrames() {
    var iframes = document.querySelectorAll('.' + MIP_IFRAME_CONTAINER);
    if (iframes) {
      for (var i = 0; i < iframes.length; i++) {
        css(iframes[i], {
          display: 'none',
          opacity: 0
        });
      }
    }
  }

  function getHeaderHTML(logo, isFake) {
    return ['<div class="' + MIP_SHELL_HEADER + '">', '<span ' + (isFake ? '' : 'mip-header-btn') + ' class="back-button">', BACK_BUTTON_SVG, '</span>', '<div class="' + MIP_SHELL_HEADER + '-logo-title">', '<img class="' + MIP_SHELL_HEADER + '-logo" src="' + logo + '">', '<span class="' + MIP_SHELL_HEADER + '-title"></span>', '</div>', '</div>'].join('');
  }

  /**
   * Create loading div
   *
   * @param {Object} pageMeta Page meta info
   */
  function createLoading(pageMeta) {
    var loading = document.querySelector('#' + MIP_PAGE_LOADING_WRAPPER);
    if (loading) {
      return loading;
    }

    var logo = pageMeta ? pageMeta.header.logo || '' : '';
    loading = document.createElement('mip-fixed');
    loading.id = MIP_PAGE_LOADING_WRAPPER;
    loading.setAttribute('class', MIP_PAGE_LOADING_WRAPPER);
    loading.innerHTML = getHeaderHTML(logo, false);
    document.body.appendChild(loading);
    return loading;
  }

  // 可能已经没人用，之后考虑删除吧
  function setHeaderColor(container, dom, color, backgroundColor, borderColor) {
    css(container, 'background-color', backgroundColor);
    css(dom.querySelectorAll('svg'), 'fill', color);
    css(dom.querySelector('.' + MIP_SHELL_HEADER + '-title'), 'color', color);
    css(dom.querySelector('.' + MIP_SHELL_HEADER + '-logo'), 'border-color', borderColor);
    css(dom.querySelector('.' + MIP_SHELL_HEADER + '-button-group'), 'border-color', borderColor);
    css(dom.querySelector('.' + MIP_SHELL_HEADER + '-button-group .split'), 'background-color', borderColor);
  }

  /**
   * Change loading according to targetMeta
   * Return loading div
   *
   * @param {Object} targetMeta Page meta of target page
   * @param {Object} options
   * @param {boolean} options.onlyHeader Moving out only needs header, not loading body
   * @param {boolean} options.transitionContainsHeader Whether transition contains header
   * @returns {HTMLElement}
   */
  function getLoading(targetMeta) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        onlyHeader = _ref3.onlyHeader,
        transitionContainsHeader = _ref3.transitionContainsHeader;

    var loadingSelector = '#' + MIP_PAGE_LOADING_WRAPPER;
    var loading = document.querySelector(loadingSelector);
    if (!loading) {
      createLoading();
      loading = document.querySelector(loadingSelector);
    }

    if (!targetMeta) {
      return loading;
    }

    // Transition only need header (frameMoveOut) but doesn't contains header (extended from child mip-shell-xxx)
    // Means doesn't need loading
    if (!transitionContainsHeader && onlyHeader) {
      css(loading, 'display', 'none');
      return loading;
    }

    loading.classList.toggle('transition-without-header', !transitionContainsHeader);
    if (transitionContainsHeader) {
      loading.classList.toggle('only-header', !!onlyHeader);
    }

    var mipShellHeader = loading.querySelector('.' + MIP_SHELL_HEADER);
    if (!transitionContainsHeader || !targetMeta.header.show) {
      css(mipShellHeader, 'display', 'none');
    } else {
      css(mipShellHeader, 'display', 'flex');
    }

    var $logo = loading.querySelector('.' + MIP_SHELL_HEADER + '-logo');
    if (targetMeta.header.logo) {
      $logo.setAttribute('src', targetMeta.header.logo);
      css($logo, 'display', 'block');
    } else {
      css($logo, 'display', 'none');
    }

    if (targetMeta.header.title) {
      loading.querySelector('.' + MIP_SHELL_HEADER + '-title').innerHTML = targetMeta.header.title;
    }

    css(loading.querySelector('.back-button'), 'display', targetMeta.view.isIndex ? 'none' : 'flex');

    if (transitionContainsHeader && targetMeta.header.show) {
      // Set color & borderColor & backgroundColor
      var _targetMeta$header = targetMeta.header,
          _targetMeta$header$co = _targetMeta$header.color,
          color = _targetMeta$header$co === undefined ? '#000000' : _targetMeta$header$co,
          borderColor = _targetMeta$header.borderColor,
          _targetMeta$header$ba = _targetMeta$header.backgroundColor,
          backgroundColor = _targetMeta$header$ba === undefined ? '#ffffff' : _targetMeta$header$ba;

      var loadingContainer = loading.querySelector('.' + MIP_SHELL_HEADER);

      setHeaderColor(loadingContainer, loading, color, backgroundColor, borderColor);
    }

    return loading;
  }

  function createFadeHeader(pageMeta) {
    var fadeHeader = document.querySelector('#' + MIP_PAGE_FADE_HEADER_WRAPPER);
    if (fadeHeader) {
      return fadeHeader;
    }

    var logo = pageMeta ? pageMeta.header.logo || '' : '';
    fadeHeader = document.createElement('mip-fixed');
    fadeHeader.id = MIP_PAGE_FADE_HEADER_WRAPPER;
    fadeHeader.setAttribute('class', MIP_PAGE_FADE_HEADER_WRAPPER);
    fadeHeader.innerHTML = getHeaderHTML(logo, true);
    document.body.appendChild(fadeHeader);
    return fadeHeader;
  }

  /**
   * Change fade header according to targetMeta
   * Return fade header div
   *
   * @param {Object} targetMeta Page meta of target page
   * @param {Object} sourceMeta Page meta of source page (undefined when frameMoveIn, NOT undefined when frameMoveOut)
   * @returns {HTMLElement}
   */
  function getFadeHeader(targetMeta, sourceMeta) {
    var fadeHeaderSelector = '#' + MIP_PAGE_FADE_HEADER_WRAPPER;
    var fadeHeader = document.querySelector(fadeHeaderSelector);
    if (!fadeHeader) {
      createFadeHeader();
      fadeHeader = document.querySelector(fadeHeaderSelector);
    }

    if (!targetMeta) {
      return fadeHeader;
    }

    var $logo = fadeHeader.querySelector('.' + MIP_SHELL_HEADER + '-logo');
    if (targetMeta.header.logo) {
      $logo.setAttribute('src', targetMeta.header.logo);
      css($logo, 'display', 'block');
    } else {
      css($logo, 'display', 'none');
    }

    if (targetMeta.header.title) {
      fadeHeader.querySelector('.' + MIP_SHELL_HEADER + '-title').innerHTML = targetMeta.header.title;
    }

    css(fadeHeader.querySelector('.back-button'), 'display', targetMeta.view.isIndex ? 'none' : 'flex');

    // Set color & borderColor & backgroundColor
    var colorConfig = sourceMeta ? sourceMeta.header : {};
    var _colorConfig$color = colorConfig.color,
        color = _colorConfig$color === undefined ? '#000000' : _colorConfig$color,
        _colorConfig$borderCo = colorConfig.borderColor,
        borderColor = _colorConfig$borderCo === undefined ? '#e1e1e1' : _colorConfig$borderCo,
        _colorConfig$backgrou = colorConfig.backgroundColor,
        backgroundColor = _colorConfig$backgrou === undefined ? '#ffffff' : _colorConfig$backgrou;

    var fadeHeaderContainer = fadeHeader.querySelector('.' + MIP_SHELL_HEADER);

    setHeaderColor(fadeHeaderContainer, fadeHeader, color, backgroundColor, borderColor);

    return fadeHeader;
  }

  /**
   * Toggle fade header
   * Invoked by `refreshShell` in MIP Shell with `asyncRefresh` is `true`
   *
   * @param {boolean} toggle Show/Hide fade header
   * @param {Object} pageMeta pageMeta of current page. `undefined` when `toggle` is `false`
   */
  function toggleFadeHeader(toggle, pageMeta) {
    var fadeHeader = getFadeHeader(pageMeta);

    if (!toggle) {
      css(fadeHeader, 'display', 'none');
      return;
    }

    css(fadeHeader, 'display', 'block');
    fadeHeader.classList.add('fade-enter', 'fade-enter-active');

    // trigger layout
    /* eslint-disable no-unused-expressions */
    fadeHeader.offsetWidth;
    /* eslint-enable no-unused-expressions */

    whenTransitionEnds(fadeHeader, 'transition', function () {
      fadeHeader.classList.remove('fade-enter-to', 'fade-enter');
    });

    nextFrame(function () {
      fadeHeader.classList.add('fade-enter-to');
      fadeHeader.classList.remove('fade-enter');
    });
  }

  /**
   * Add empty `<mip-shell>` if not found in page
   */
  function ensureMIPShell() {
    if (!document.querySelector('mip-shell') && !document.querySelector('[mip-shell]')) {
      var shell = document.createElement('mip-shell');
      var script = document.createElement('script');
      script.setAttribute('type', 'application/json');
      script.innerHTML = '{"ignoreWarning": true}';
      shell.appendChild(script);
      document.body.appendChild(shell);
    }
  }

  function nextFrame(fn$$1) {
    raf$1(function () {
      raf$1(fn$$1);
    });
  }

  function whenTransitionEnds(el, type, cb) {
    if (!type) {
      return cb();
    }

    var event = type === 'transition' ? transitionEndEvent : animationEndEvent;
    var onEnd = function onEnd(e) {
      if (e.target === el) {
        end();
      }
    };
    var end = function end() {
      el.removeEventListener(event, onEnd);
      cb();
    };
    el.addEventListener(event, onEnd);
  }

  function scrollTo(height) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 500 : _ref$duration,
        _ref$scrollTop = _ref.scrollTop,
        scrollTop = _ref$scrollTop === undefined ? 0 : _ref$scrollTop;

    var top = height;

    if (top === scrollTop) {
      return Promise.resolve();
    }

    var rest = top - scrollTop;
    var sign = rest > 0;

    return new Promise(function (resolve) {
      transition(duration, function (t) {
        var delta = Math.ceil(t * rest);
        var toScroll = delta + scrollTop;

        if (sign && toScroll >= top || !sign && toScroll <= top) {
          scroll(top);
          return false;
        }

        scroll(toScroll);
        return true;
      }, function () {
        scroll(top);
        resolve();
      });
    });
  }

  function transition(duration, step, callback) {
    var start = Date.now();

    fn.raf(loop);

    function loop() {
      var now = Date.now() - start;

      if (step(bezier(now, 0, 1, duration))) {
        fn.raf(loop);
      } else {
        callback();
      }
    }
  }

  function bezier(t, b, c, d) {
    return 1.0042954579734844 * Math.exp(-6.4041738958415664 * Math.exp(-7.2908241330981340 * t / d)) * c + b;
  }

  function scroll(top) {
    viewport.setScrollTop(top);
    // if (scrollingFunction) {
    //   scrollingFunction.call()
    // } else {
    //   window.scrollTo(0, top)
    // }
  }

  /**
   * @file custom-event.js
   * @author sfe-sy (sfe-sy@baidu.com)
   */

  /* global CustomEvent */

  function customEvent(eventName, detail) {
    var params = { bubbles: false, cancelable: false, detail: detail };
    var event = void 0;
    /* istanbul ignore else */
    if (typeof window.CustomEvent === 'function') {
      event = new CustomEvent(eventName, params);
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
    }

    return event;
  }

  function customEmit(element, eventName) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var event = customEvent(eventName, [].concat(args));
    element.dispatchEvent(event);
  }

  /**
   * @file main entry
   * @author wangyisheng@baidu.com (wangyisheng)
   */

  var Page = function () {
    function Page() {
      classCallCheck(this, Page);

      Object.assign(this, window.MIP.viewer.pageMeta);
      this.pageId = undefined;
      this.fullpath = undefined;
      this.pageMeta = undefined;
      this.currentPageId = undefined;
      this.targetWindow = window;

      // 记录 iframe 内的 page 对象。Root Page 这个属性才有意义，但 Root Page 本身不计入。
      this.children = [];
    }

    createClass(Page, [{
      key: 'initPageId',
      value: function initPageId() {
        // generate pageId
        this.fullpath = window.location.href;
        this.pageId = getCleanPageId(this.fullpath);
        this.currentPageId = this.pageId;
      }

      /**
       * scroll to hash with ease transition
       *
       * @param {string} hash hash
       */

    }, {
      key: 'scrollToHash',
      value: function scrollToHash(hash) {
        if (typeof hash !== 'string' || hash[0] !== '#') {
          return;
        }

        var hashContent = hash.slice(1);

        try {
          /**
           * @see {@link http://w3c.github.io/html/browsers.html#navigating-to-a-fragment-identifier}
           */
          var anchor = document.getElementById(hashContent) || document.getElementById(decodeURIComponent(hashContent)) || document.querySelector('a[name="' + hashContent + '"]');

          /* istanbul ignore next */
          if (anchor) {
            scrollTo(anchor.offsetTop, {
              scrollTop: viewport.getScrollTop()
            });
          }
        } catch (e) {}
      }

      /**
       * notify root page with an eventdata
       *
       * @param {Object} data eventdata
       */

    }, {
      key: 'notifyRootPage',
      value: function notifyRootPage(data) {
        /* istanbul ignore else */
        if (this.isRootPage) {
          window.postMessage(data, window.location.origin);
        } else {
          window.parent.postMessage(data, this.isCrossOrigin ? '*' : window.location.origin);
        }
      }

      /**
       * destroy current page
       *
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        // 原本用于 bouncy 的 removeListener，现在不需要了，但方法还是保留，避免报错
      }
    }, {
      key: 'start',
      value: function start() {
        var _this = this;

        ensureMIPShell();
        this.initPageId();

        /**
         * scroll to anchor after all the elements loaded
         * fix: https://github.com/mipengine/mip2/issues/125
         */
        performance.on('update', function (timing) {
          if (timing.MIPFirstScreen) {
            // scroll to current hash if exists
            _this.scrollToHash(window.location.hash);
          }
        });

        window.addEventListener(CUSTOM_EVENT_SCROLL_TO_ANCHOR, function (e) {
          _this.scrollToHash(e.detail[0]);
        });

        // trigger show page custom event
        this.emitEventInCurrentPage({ name: CUSTOM_EVENT_SHOW_PAGE });

        var mipServiceTmp = window.location.hash.match(/mipservice=(\d)/);
        window.mipService = mipServiceTmp ? mipServiceTmp[1] : '1';
      }

      // ========================= Util functions for developers =========================

    }, {
      key: 'togglePageMask',
      value: function togglePageMask(toggle, options) {
        // Only show page mask in root page
        if (!this.isRootPage) {
          this.emitCustomEvent(window.parent, true, {
            name: 'mipShellEvents',
            data: {
              type: 'togglePageMask',
              data: {
                toggle: toggle,
                options: options
              }
            }
          });
        }
      }
    }, {
      key: 'toggleDropdown',
      value: function toggleDropdown(toggle) {
        var target = this.isRootPage ? window : window.parent;
        customEmit(target, 'mipShellEvents', {
          type: 'toggleDropdown',
          data: {
            toggle: toggle
          }
        });
      }
      /* istanbul ignore next */

    }, {
      key: 'toggleFadeHeader',
      value: function toggleFadeHeader$$1(toggle, pageMeta) {
        toggleFadeHeader(toggle, pageMeta);
      }

      /**
       * Emit a custom event in current page
       *
       * @param {Window} targetWindow Window of target page. Can be `window` or `window.top`
       * @param {boolean} isCrossOrigin Whether targetWindow is cross origin compared with current one
       * @param {Object} event Event needs to be sent
       * @param {string} event.name Event name
       * @param {Object} event.data Event data
       */

    }, {
      key: 'emitCustomEvent',
      value: function emitCustomEvent(targetWindow, isCrossOrigin, event) {
        if (isCrossOrigin) {
          targetWindow.postMessage({
            type: MESSAGE_CROSS_ORIGIN,
            data: event
          }, '*');
        } else {
          customEmit(targetWindow, event.name, event.data);
        }
      }

      /**
       * Broadcast custom event to all pages.
       *
       * @param {Object} event Event needs to be sent
       * @param {string} event.name Event name
       * @param {Object} event.data Event data
       */

    }, {
      key: 'broadcastCustomEvent',
      value: function broadcastCustomEvent(event) {
        if (this.isRootPage) {
          customEmit(window, event.name, event.data);

          this.children.forEach(function (pageMeta) {
            /* istanbul ignore next */
            if (pageMeta.targetWindow) {
              pageMeta.targetWindow.postMessage({
                type: MESSAGE_CROSS_ORIGIN,
                data: event
              }, '*');
            }
          });
        } else {
          window.parent.postMessage({
            type: MESSAGE_BROADCAST_EVENT,
            data: event
          }, '*');
        }
      }
    }, {
      key: 'back',
      value: function back() {
        this.notifyRootPage({ type: MESSAGE_ROUTER_BACK });
      }
    }, {
      key: 'forward',
      value: function forward() {
        this.notifyRootPage({ type: MESSAGE_ROUTER_FORWARD });
      }
    }, {
      key: 'push',
      value: function push(route) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        this.notifyRootPage({
          type: MESSAGE_ROUTER_PUSH,
          data: { route: route, options: options }
        });
      }
    }, {
      key: 'replace',
      value: function replace(route) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        this.notifyRootPage({
          type: MESSAGE_ROUTER_REPLACE,
          data: { route: route, options: options }
        });
      }

      /**
       * Create and prerender iframe(s) sliently
       * Cross Origin is now allowed
       * Each page can invoke this function
       *
       * @param {Array|string} urls
       * @returns {Promise}
       */

    }, {
      key: 'prerender',
      value: function prerender(urls) {
        /* istanbul ignore next */
        if (this.isCrossOrigin) {
          console.warn('跨域 MIP 页面暂不支持预渲染');
          return;
        }

        /* istanbul ignore next */
        var target = this.isRootPage ? this : window.parent.MIP.viewer.page;
        return target.prerenderPages(urls);
      }

      // =============================== Root Page methods ===============================

      /**
       * emit a custom event in current page
       *
       * @param {Object} event event
       */

    }, {
      key: 'emitEventInCurrentPage',
      value: function emitEventInCurrentPage(event) {
        var currentPage = this.getPageById(this.currentPageId);
        this.emitCustomEvent(currentPage.targetWindow, currentPage.isCrossOrigin, event);
      }

      /**
       * add page to `children`
       *
       * @param {Page} page page
       */

    }, {
      key: 'addChild',
      value: function addChild(page) {
        for (var i = 0; i < this.children.length; i++) {
          if (this.children[i].pageId === page.pageId) {
            this.children.splice(i, 1);
            break;
          }
        }
        this.children.push(page);
      }

      /**
       * Check if children.length exceeds MAX_PAGE_NUM
       * If so, remove one
       *
       * @param {string} targetPageId targetPageId
       */

    }, {
      key: 'checkIfExceedsMaxPageNum',
      value: function checkIfExceedsMaxPageNum(targetPageId) {
        /* istanbul ignore next */
        if (!this.isRootPage) {
          console.warn('该方法只能在 rootPage 调用');
          return;
        }
        /* istanbul ignore next */
        if (this.children.length >= MAX_PAGE_NUM) {
          var currentPage = void 0;
          var prerenderIFrames = [];
          var found = false;
          for (var i = 0; i < this.children.length; i++) {
            currentPage = this.children[i];
            // Find first removable page, which can't be target page or current page
            if (currentPage.pageId !== targetPageId && currentPage.pageId !== this.currentPageId) {
              var firstRemovableIframe = getIFrame(currentPage.pageId);

              // If prerendered, skip it first
              if (firstRemovableIframe.getAttribute('prerender') === '1') {
                prerenderIFrames.push({ iframe: firstRemovableIframe, index: i });
                continue;
              }

              if (firstRemovableIframe && firstRemovableIframe.parentNode) {
                firstRemovableIframe.parentNode.removeChild(firstRemovableIframe);
                this.children.splice(i, 1);
                found = true;
              }
              return;
            }
          }

          if (!found) {
            // Find one in prerendered iframe
            for (var _i = 0; _i < prerenderIFrames.length; _i++) {
              var _firstRemovableIframe = prerenderIFrames[_i].iframe;
              if (_firstRemovableIframe && _firstRemovableIframe.parentNode) {
                _firstRemovableIframe.parentNode.removeChild(_firstRemovableIframe);
                this.children.splice(prerenderIFrames[_i].index, 1);
                return;
              }
            }
          }
        }
      }

      /**
       * get page by pageId
       *
       * @param {string} pageId pageId
       * @return {Page} page
       */

    }, {
      key: 'getPageById',
      value: function getPageById(pageId) {
        /* istanbul ignore next */
        if (!pageId) {
          return this;
        }

        for (var i = 0; i < this.children.length; i++) {
          if (this.children[i].pageId === pageId) {
            return this.children[i];
          }
        }

        if (pageId === this.pageId) {
          return this;
        }

        return null;
      }

      /**
       * get elements in root page, except some shared by all the pages
       *
       * @return {Array<HTMLElement>} elements
       */

    }, {
      key: 'getElementsInRootPage',
      value: function getElementsInRootPage() {
        var whitelist = ['.mip-page__iframe', '.mip-page-loading-wrapper', '.mip-page-fade-header-wrapper', 'mip-shell', '[mip-shell]', '[mip-shell-inner]', '.mip-shell-header-wrapper', '.mip-shell-more-button-mask', '.mip-shell-more-button-wrapper', '.mip-shell-header-mask', '[mip-global-component]'];
        var notInWhitelistSelector = whitelist.map(function (selector) {
          return ':not(' + selector + ')';
        }).join('');
        return [].concat(toConsumableArray(document.querySelectorAll('body > ' + notInWhitelistSelector)));
      }

      /**
       * Create and prerender iframe(s) sliently
       * Cross Origin is now allowed
       *
       * @param {Array|string} urls
       * @returns {Promise}
       */

    }, {
      key: 'prerenderPages',
      value: function prerenderPages(urls) {
        var _this2 = this;

        /* istanbul ignore next */
        if (!this.isRootPage) {
          console.warn('该方法只能在 rootPage 调用');
          return Promise.reject();
        }

        /* istanbul ignore next */
        if (typeof urls === 'string') {
          urls = [urls];
        }

        /* istanbul ignore next */
        if (!Array.isArray(urls)) {
          return Promise.reject('预渲染参数必须是一个数组');
        }

        /* istanbul ignore next */
        var createPrerenderIFrame = function createPrerenderIFrame(_ref) {
          var fullpath = _ref.fullpath,
              pageId = _ref.pageId;

          return new Promise(function (resolve, reject) {
            var me = _this2;
            var iframe = getIFrame(pageId);
            /* istanbul ignore next */
            if (iframe) {
              if (iframe.contentWindow.MIP.version === '2') {
                // 预加载前已经存在，直接返回即可
                resolve(iframe);
                return;
              }
              // 如果在断网情况下，内部的 window.MIP 会是一个数组。这样实际上这个 iframe 也不可复用，应当删除
              iframe.parentNode.removeChild(iframe);
            }

            createIFrame({ fullpath: fullpath + '#prerender=1', pageId: pageId }, {
              onLoad: function onLoad(newIframe) {
                newIframe.setAttribute('prerender', '1');
                var targetPageInfo = {
                  pageId: pageId,
                  pageMeta: fn.extend(true, {}, findMetaByPageId(pageId)),
                  fullpath: fullpath,
                  standalone: window.MIP.standalone,
                  isRootPage: false,
                  isCrossOrigin: false,
                  isPrerender: true
                };
                targetPageInfo.targetWindow = newIframe.contentWindow;
                me.addChild(targetPageInfo);
                me.checkIfExceedsMaxPageNum(pageId);

                resolve(newIframe);
              },
              onError: function onError(newIframe) {
                /* istanbul ignore next */
                reject(newIframe);
              }
            });
          });
        };

        /* istanbul ignore next */
        var findMetaByPageId = function findMetaByPageId(pageId) {
          var target = void 0;
          if (!_this2.isRootPage && !_this2.isCrossOrigin) {
            target = window.parent;
          } else {
            target = window;
          }

          if (target.MIP_PAGE_META_CACHE[pageId]) {
            return target.MIP_PAGE_META_CACHE[pageId];
          } else {
            for (var i = 0; i < target.MIP_SHELL_CONFIG.length; i++) {
              var route = target.MIP_SHELL_CONFIG[i];
              if (route.regexp.test(pageId)) {
                target.MIP_PAGE_META_CACHE[pageId] = route.meta;
                return route.meta;
              }
            }
          }

          console.warn('Cannot find MIP Shell Config for current page. Use default instead.');
          return Object.assign({}, DEFAULT_SHELL_CONFIG);
        };

        return Promise.all(urls.map(function (fullpath) {
          /* istanbul ignore next */
          if (window.MIP.viewer._isCrossOrigin(fullpath)) {
            console.warn('跨域 MIP 页面暂不支持预渲染', fullpath);
            return Promise.resolve();
          }

          // 处理 URL 的 query 中带有可转义字符的问题
          // 小说资源方存在一些链接如 http://some-site.com/read?bkid=189169121&crid=1&fr=bdgfh&mip=1?novel&pg=3 (有 2 个问号)
          // viewer.open 跳转时，内部的 normalizeLocation 会把 mip=1?novel 转化为 mip=1%3Fnovel
          // 而 prerender 不处理的话，依然是 mip=1?novel
          // 从而导致两端匹配不上，跳转页面时虽然 cache-first，依然找不到目标从而重新开一个新页面
          // 为了解决这个问题，在 prerender 也要对 query 做相同处理
          var parsedPath = parsePath(fullpath);
          /* istanbul ignore next */
          if (parsedPath.query) {
            // parsedPath.query = 'a=1&b=2&mip=1?novel'
            var query = resolveQuery(parsedPath.query); // query = {a: '1', b: '2', mip: '1?novel'}
            var queryAfterProcess = stringifyQuery(query); // queryAfterProcess = '?a=1&b=2&mip=1%3Fnovel
            if (queryAfterProcess.charAt(0) === '?') {
              queryAfterProcess = queryAfterProcess.substring(1, queryAfterProcess.length);
            }
            fullpath = fullpath.replace(parsedPath.query, queryAfterProcess);
          }

          var pageId = getCleanPageId(fullpath);
          return createPrerenderIFrame({ fullpath: fullpath, pageId: pageId });
        }));
      }
    }]);
    return Page;
  }();

  /* istanbul ignore file */

  var messageTypes = {
    twoWay: 'two-way'
  };
  var messageSentinels = {
    request: 'PM_REQUEST',
    response: 'PM_RESPONSE'
  };

  var messengerInstances = {};

  function getSessionId() {
    return (new Date().getTime() * 1000 + Math.ceil(Math.random() * 1000)).toString(36);
  }

  function messageReceiver(event) {
    // 寻找对应的 messenger 实例
    var messenger = messengerInstances[event.data.name];
    if (!messenger) {
      // console.warn('A window with no messengers is sending message', event);
      // 兼容老 mip，没有给名字
      for (var x in messengerInstances) {
        messengerInstances[x].processMessageEvent(event);
      }
    } else {
      messenger.processMessageEvent(event);
    }
  }

  /**
   * iframe - window 单双向通信组件
   *
   * @constructor
   * @exports iframe-shell/messenger
   * @param {Object} config 实例参数
   * @param {Window} config.targetWindow  通信对端窗口（iframe; parent; top）
   * @param {string} config.targetOrigin  通信对端允许接收的 Origin
   * @param {string} config.sourceOrigins 允许的通信来源 Origin 列表
   * @param {number} config.timeout       双向通信回复超时(ms)
   * @param {string} config.name          若对端为 iframe，则填写 iframe.name；若对端为 parent，则填写 window.name(即父窗口的 iframe.name)
   */

  var Messenger = function () {
    function Messenger() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, Messenger);

      EventEmitter.mixin(this);

      this.targetWindow = config.targetWindow || top;
      this.targetOrigin = config.targetOrigin || '*';
      this.sourceOrigins = config.sourceOrigins || ['*'];
      this.timeout = config.timeout || 500;
      this.name = config.name || window.name;

      /**
       * 存放回调处理函数 sessionId -> Object
       *
       * @private
       * @type    {Object}
       * @example {resolve: function, reject: function, timer: timerId}
       */
      this.defers = {};

      /**
       * 存放双向通信处理函数 eventName -> function
       *
       * @private
       * @type {Object}
       */
      this.handlers = {};

      if (messengerInstances[this.name]) ;

      messengerInstances[this.name] = this;
      Messenger.bindHandler();
    }

    createClass(Messenger, [{
      key: 'processMessageEvent',


      /**
       * 处理消息事件
       *
       * @protected
       * @param  {MessageEvent} event 收到的 message event
       */
      value: function processMessageEvent(event) {
        var origin = event.origin || event.originalEvent.origin;
        var messenger = this;
        // 检查 origin 是否安全
        var isSafe = false;
        for (var i = 0; i < messenger.sourceOrigins.length; i++) {
          var safeOrigin = messenger.sourceOrigins[i];
          if (safeOrigin === '*') {
            isSafe = true;
            break;
          }
          if (safeOrigin === origin) {
            isSafe = true;
            break;
          }
        }
        if (!isSafe) {
          // console.warn('Origin ' + origin + ' is not safe, ignore event', event)
          return;
        }
        // 检查单双向
        var eventData = event.data;
        if (!eventData) {
          // console.warn('Event data %O is invalid, missing data.', event)
          return;
        }
        // console.log(eventData);
        if (eventData.type === messageTypes.twoWay) {
          if (!eventData.sentinel || !eventData.sessionId) {
            // console.warn('Event data %O is invalid, missing sentinel or/and sessionId.', eventData)
            return;
          }
          // 检查请求 or 回复
          if (eventData.sentinel === messageSentinels.request) {
            // 检查是否有对应的 handler
            var response = {};
            if (messenger.handlers[eventData.event]) {
              try {
                response = messenger.handlers[eventData.event].call(messenger, eventData);
              } catch (err) {
                response = {
                  error: err
                };
              }
            }
            var send = function send(response) {
              response = response || {};
              fn.extend(response, {
                type: messageTypes.twoWay,
                sentinel: messageSentinels.response,
                sessionId: eventData.sessionId,
                name: messenger.name
              });
              messenger.getWindow().postMessage(response, messenger.targetOrigin);
            };
            // 检查 promise
            if (response && typeof response.then === 'function') {
              response.then(function (response) {
                return send(response);
              }).catch(function (err) {
                return send({ error: err });
              });
            } else {
              send(response);
            }
          } else if (eventData.sentinel === messageSentinels.response) {
            // 回复
            // console.log('response!', eventData);
            var d = messenger.defers[eventData.sessionId];
            delete messenger.defers[eventData.sessionId];
            if (!d) {
              // console.warn('Event session is not found for two-way communication', eventData.sessionId)
              return;
            }
            clearTimeout(d.timer);
            if (eventData.error) {
              d.reject(eventData.error);
            } else {
              d.resolve(eventData);
            }
          }
        } else {
          // 单向
          if (!eventData || !eventData.event) {
            // console.warn('Event data %O is invalid, missing event name.', eventData)
            return;
          }
          messenger.trigger(eventData.event, eventData.data);
        }
      }

      /**
       * 给绑定的窗口发送消息
       *
       * @public
       * @param  {string}  eventName    消息名
       * @param  {Object}  data         消息数据；必须为 object
       * @param  {boolean} waitResponse 是否为双向消息（等待回复）
       * @return {Promise}              若为双向消息，则返回后 resolve；否则直接 resolve
       */

    }, {
      key: 'sendMessage',
      value: function sendMessage(eventName, data, waitResponse) {
        var _this = this;

        var messenger = this;
        return new Promise(function (resolve, reject) {
          var requestData = {
            name: messenger.name,
            event: eventName,
            sender: 'mip/2',
            data: data
          };
          var sessionId = getSessionId();
          if (waitResponse) {
            fn.extend(requestData, {
              type: messageTypes.twoWay,
              sentinel: messageSentinels.request,
              sessionId: sessionId
            });
            messenger.defers[sessionId] = {
              resolve: resolve.bind(_this),
              reject: reject.bind(_this),
              timer: setTimeout(function () {
                delete messenger.defers[sessionId];
                reject(new Error('timeout'));
              }, messenger.timeout)
            };
          } else {
            setTimeout(resolve, 0);
          }
          // 对于单向通信：requestData = {event, ...}
          // 对于双向通信：requestData = {event, type, sentinel, sessionId, ...}
          messenger.getWindow().postMessage(requestData, messenger.targetOrigin);
        });
      }

      /**
       * 设置双向消息处理函数
       *
       * @public
       * @param {string}   eventName 消息名字
       * @param {Function} fn        处理函数（return object or promise which solves with object）
       */

    }, {
      key: 'setHandler',
      value: function setHandler(eventName, fn$$1) {
        if (typeof fn$$1 !== 'function') {
          throw new Error('Invalid handler for event ' + eventName);
        }
        this.handlers[eventName] = fn$$1;
      }

      /**
       * 移除双向消息处理函数
       *
       * @public
       * @param  {string}   eventName 消息名字
       */

    }, {
      key: 'removeHandler',
      value: function removeHandler(eventName) {
        this.handlers[eventName] = undefined;
      }

      /**
       * 销毁消息处理器
       *
       * @public
       */

    }, {
      key: 'destory',
      value: function destory() {
        delete messengerInstances[this.name];
      }
    }, {
      key: 'getWindow',
      value: function getWindow() {
        if (this.targetWindow instanceof HTMLIFrameElement) {
          return this.targetWindow.contentWindow;
        }
        return this.targetWindow;
      }
    }], [{
      key: 'bindHandler',
      value: function bindHandler() {
        window.removeEventListener('message', messageReceiver);
        window.addEventListener('message', messageReceiver);
      }
    }]);
    return Messenger;
  }();

  /**
   *
   * @file fixed element
   * @author xx
   */

  /**
   * The fixed element processor.
   * https://bugs.webkit.org/show_bug.cgi?id=154399
   *
   * @class
   */

  var FixedElement = function () {
    function FixedElement() {
      classCallCheck(this, FixedElement);

      /**
       * @private
       * @type {HTMLElement}
       */
      this._fixedLayer = null;

      /**
       * @private
       * @type {number}
       */
      this._count = 0;

      /**
       * Whether the platform is android and uc browser.
       * @private
       * @type {boolean}
       */
      this._isAndroidUc = platform.isUc() && /* istanbul ignore next */!platform.isIos();

      /**
       * @private
       * @type {Array.<FixedElement>}
       */
      this._fixedElements = [];
    }

    /**
     * Initializition of current fixed element processor.
     */


    createClass(FixedElement, [{
      key: 'init',
      value: function init() {
        var mipFixedElements = document.body.querySelectorAll('mip-fixed, mip-semi-fixed');

        this.setFixedElement(mipFixedElements);
        var fixedLen = this._fixedElements.length;
        var isIframed = window.MIP.viewer.isIframed;
        if (platform.isIos() && isIframed) {
          // let fixedLayer =
          this.getFixedLayer();
          for (var i = 0; i < fixedLen; i++) {
            var fixedElem = this._fixedElements[i];

            // clone mip-semi-fixed node
            if (fixedElem.element.tagName.toLowerCase() === 'mip-semi-fixed') {
              var ele = fixedElem.element;
              var parentNode = ele.parentNode;
              var nextSbiling = ele.nextElementSibling;
              var node = ele.cloneNode(true);

              if (nextSbiling) {
                parentNode.insertBefore(node, nextSbiling);
              } else {
                parentNode.appendChild(node);
              }
            }
            if (!fixedElem.element.hasAttribute('still')) {
              this.moveToFixedLayer(fixedElem, i);
            }
          }
        }
        /* istanbul ignore if */
        if (isIframed) {
          this.doCustomElements();
        }
      }

      /**
       * Process some fixed elements.
       *
       * @param {Array.<MIPElement>} fixedElements fixed elements
       * @param {boolean}  move flag for if moving to fixedlayer
       * @return {any}
       */

    }, {
      key: 'setFixedElement',
      value: function setFixedElement(fixedElements, move) {
        var fixedEle = {};
        // let fixedTypeCount = {};

        for (var i = 0; i < fixedElements.length; i++) {
          var ele = fixedElements[i];
          var fType = ele.getAttribute('type');

          // check invalid element and delete from document
          var bottom = parseLength(ele.getAttribute('bottom'));
          var top = parseLength(ele.getAttribute('top'));
          /* eslint-disable */
          if (fType === 'left' && !top && !bottom || fType === 'gototop' && ele.firstElementChild.tagName.toLowerCase() !== 'mip-gototop' || ele.tagName.toLowerCase() !== 'mip-semi-fixed' && ele.tagName.toLowerCase() !== 'mip-fixed') {
            ele.parentElement && ele.parentElement.removeChild(ele);
            continue;
          }
          /* eslint-enable */

          // mip-semi-fixed
          if (ele.tagName.toLowerCase() === 'mip-semi-fixed') {
            if (!ele.id) {
              ele.id = 'mip-semi-fixed' + this._count;
            }
            fType = 'semi-fixed';
          }

          // Calculate z-index based on the declared z-index and DOM position.
          css(ele, {
            'z-index': 10000 - this._count
          });

          // While platform is android-uc, change the position to 'absolute'.
          if (this._isAndroidUc) {
            css(ele, {
              position: 'absolute'
            });
          }

          this.setFixedElementRule(ele, fType);
          var eleId = 'Fixed' + this._count;
          fixedEle = {
            id: eleId,
            element: ele
          };
          fixedEle.element.setAttribute('mipdata-fixedIdx', eleId);

          this._count++;
          this._fixedElements.push(fixedEle);

          // when `setFixedElement function` called by components,
          // the element will moved to fixedlayer directly.
          if (move) {
            this.moveToFixedLayer(fixedEle, this._count);
            return 10000 - this._count;
          }
        }
      }

      /**
       * Create the fixed layer of current object if it does not exsit and return it.
       *
       * @return {Element}
       */

    }, {
      key: 'getFixedLayer',
      value: function getFixedLayer() {
        if (this._fixedLayer) {
          return this._fixedLayer;
        }
        this._fixedLayer = document.createElement('body');
        this._fixedLayer.className = 'mip-fixedlayer';
        var height = this._isAndroidUc ? '100%' : 0;
        var width = this._isAndroidUc ? '100%' : 0;
        css(this._fixedLayer, {
          'position': 'absolute',
          'top': 0,
          'left': 0,
          'height': height,
          'width': width,
          'pointer-events': 'none',
          'overflow': 'hidden',
          'animation': 'none',
          '-webkit-animation': 'none',
          'border': 'none',
          'box-sizing': 'border-box',
          'box-shadow': 'none',
          'display': 'block',
          'float': 'none',
          'margin': 0,
          'opacity': 1,
          'outline': 'none',
          'transform': 'none',
          'transition': 'none',
          'visibility': 'visible',
          'background': 'none'
        });
        var html = document.getElementsByTagName('html')[0];
        html.appendChild(this._fixedLayer);
        return this._fixedLayer;
      }

      /**
       * Move a fixed element to the fixed layer.
       *
       * @param {MIPElement} fixedEle fixedEle
       * @param {string} idx idx
       */

    }, {
      key: 'moveToFixedLayer',
      value: function moveToFixedLayer(fixedEle, idx) {
        var element = fixedEle.element;
        if (element.parentElement === this._fixedLayer) {
          return;
        }
        /* istanbul ignore else */
        if (!fixedEle.placeholder) {
          css(element, {
            'pointer-events': 'initial'
          });
          fixedEle.placeholder = document.createElement('mip-i-ph');
          fixedEle.placeholder.setAttribute('mipdata-fixedIdx', fixedEle.id);
          fixedEle.placeholder.style.display = 'none';
        }

        element.parentElement.replaceChild(fixedEle.placeholder, element);
        this.getFixedLayer().appendChild(element);
      }

      /**
       * Process custom elements created by user.
       */

    }, {
      key: 'doCustomElements',
      value: function doCustomElements() {
        var stylesheets = document.styleSheets;
        /* istanbul ignore if */
        if (!stylesheets) {
          return;
        }
        // Find the 'position: fixed' elements.
        // let fixedSelectors = [];
        for (var i = 0; i < stylesheets.length; i++) {
          var stylesheet = stylesheets[i];
          /* istanbul ignore if */
          if (stylesheet.disabled || !stylesheet.ownerNode || stylesheet.ownerNode.tagName !== 'STYLE' || stylesheet.ownerNode.hasAttribute('mip-extension')) {
            continue;
          }
          this._findFixedSelectors(stylesheet.cssRules);
        }
      }

      /**
       * Find the selectors of 'position: fixed' elements.
       * CSSRule: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
       *
       * @param {string} cssRules cssRules
       */

    }, {
      key: '_findFixedSelectors',
      value: function _findFixedSelectors(cssRules) {
        for (var i = 0; i < cssRules.length; i++) {
          var cssRule = cssRules[i];
          var rType = cssRule.type;
          if (rType === 1) {
            // CSSStyleRule
            if (cssRule.selectorText !== '*' && cssRule.style.position === 'fixed') {
              try {
                var fixedSelector = cssRule.selectorText;
                var elements = document.querySelectorAll(fixedSelector);
                for (var j = 0; j < elements.length; j++) {
                  /**
                   * in `development` mode, CSS isn't extracted
                   * and will be inserted in runtime, which will be removed by this func.
                   */
                  /* istanbul ignore next */
                  {
                    /**
                      * hide and warn for debugging instead of removing element
                      */
                    // elements[j].parentElement.removeChild(elements[j])
                    var ele = elements[j];
                    ele.style.cssText = 'display: none!important';
                    console.warn('Can not use "position: fixed" in ' + ele.tagName + '!');
                  }
                }
              } catch (e) {
                /* istanbul ignore next */
                console.warn('Cannot find the selector of custom fixed elements');
              }
            }
          } else if (rType === 4) {
            // CSSMediaRule
            this._findFixedSelectors(cssRule.cssRules);
          } /* istanbul ignore next */else if (rType === 12) {
              // CSSSupportsRule
              this._findFixedSelectors(cssRule.cssRules);
            }
        }
      }

      /**
       * Set styles of a fixed element with type.
       *
       * @param {MIPElement} fixedEle fixedEle
       * @param {string} type Layout type of the fixedEle.
       */

    }, {
      key: 'setFixedElementRule',
      value: function setFixedElementRule(fixedEle, type) {
        switch (type) {
          case 'top':
            break;
          case 'bottom':
            break;
          case 'right':
            this.setStyle(fixedEle);
            break;
          case 'left':
            this.setStyle(fixedEle);
            break;
          case 'semi-fixed':
            break;
          case 'gototop':
            fixedEle.style.bottom = '90px';
            fixedEle.style.right = '10%';
            break;
          default:
            fixedEle.style.display = 'none';
        }
      }

      /**
       * Set styles of a fixed element.
       *
       * @param {MIPElement} fixedEle fixedEle
       */

    }, {
      key: 'setStyle',
      value: function setStyle(fixedEle) {
        var bottom = parseLength(fixedEle.getAttribute('bottom'));
        if (bottom) {
          fixedEle.style.bottom = bottom;
          return;
        }
        var top = parseLength(fixedEle.getAttribute('top'));
        if (top) {
          fixedEle.style.top = top;
        }
      }

      /**
       * Show fixed layer
       *
       * @param {HTMLElement} layer layer
       */

    }, {
      key: 'showFixedLayer',
      value: function showFixedLayer(layer) {
        /* istanbul ignore else */
        if (layer) {
          css(layer, {
            display: 'block'
          });
        }
      }

      /**
       * Hide fixed layer
       *
       * @param {HTMLElement} layer layer
       */

    }, {
      key: 'hideFixedLayer',
      value: function hideFixedLayer(layer) {
        /* istanbul ignore else */
        if (layer) {
          css(layer, {
            display: 'none'
          });
        }
      }

      /**
       * set a placeholder
       *
       * @param {Object} height the height of element
       */

    }, {
      key: 'setPlaceholder',
      value: function setPlaceholder(height) {
        var placeholder = document.body.querySelector('div[mip-fixed-placeholder]');

        if (!placeholder) {
          placeholder = document.createElement('div');
          placeholder.setAttribute('mip-fixed-placeholder', '');
          util.css(placeholder, {
            position: 'relative',
            display: 'none'
          });
          document.body.appendChild(placeholder);
        }

        if (height) {
          util.css(placeholder, {
            display: 'block',
            height: height + 'px'
          });
        }
      }
    }]);
    return FixedElement;
  }();

  var fixedElement = new FixedElement();

  /**
   * @file client-prerender.js 在浏览器端预渲染
   * @author huanghuiquan (huanghuiquan@baidu.com)
   */

  var parsePrerender = function parsePrerender(ele) {
    if (!ele || !ele.getAttribute) {
      return false;
    }

    var prerender = ele.getAttribute('prerender');
    var isFirstScreenElement = ele.getAttribute('firstscreen');
    return isFirstScreenElement != null || prerender != null && prerender !== 'false';
  };

  var resetPrerenderHash = function resetPrerenderHash() {
    var win = window;
    var loc = win.location;
    var hash = loc.hash.replace(/prerender=1&?/, '');
    win.history.replaceState('', document.title, loc.pathname + loc.search + hash);
  };

  var ClientPrerender = function () {
    function ClientPrerender() {
      var _this = this;

      classCallCheck(this, ClientPrerender);

      // 预渲染环境标记, 是否是预渲染状态
      this.isPrerendering = false;

      // 是否执行过预渲染
      this.isPrerendered = false;

      // 延迟执行的的函数队列
      this.queue = [];

      this.messager = new Messenger({
        name: util.fn.getRootName(window.name)
      });

      if (util.hash.get('prerender') === '1') {
        this.isPrerendering = true;
        new Promise(function (resolve) {
          // set client prerender event
          _this.messager.on(MESSAGE_PAGE_ACTIVE, function () {
            _this.isPrerendering = false;
            resetPrerenderHash();
            resolve();
          });
          // can interact with container
          _this.messager.sendMessage(MESSAGE_PRERENDER_INTERACTIVE, {
            time: Date.now()
          });
        }).then(function () {
          _this.isPrerendered = true;
          performance.recordTiming('MIPPageShow');
          performance.lockFirstScreen();
          performance.recordTiming('MIPElementBuildStart');
          var fn = void 0;
          while (fn = _this.queue.shift()) {
            fn();
          }
        }).then(function () {
          performance.recordTiming('MIPElementBuildEnd');
        });
      }
    }

    createClass(ClientPrerender, [{
      key: 'execute',
      value: function execute(fn, ele) {
        if (this.isPrerendering && !parsePrerender(ele)) {
          this.queue.push(fn);
        } else {
          fn();
        }
      }
    }]);
    return ClientPrerender;
  }();

  var prerender = new ClientPrerender();

  /* istanbul ignore file */

  /**
   * Save window.
   *
   * @inner
   * @type {Object}
   */
  var win$1 = window;

  var eventListenerOptions$1 = supportsPassive ? { passive: true } : false;

  /**
   * The mip viewer.Complement native viewer, and solve the page-level problems.
   */
  var viewer = {

    /**
       * The initialise method of viewer
       */
    init: function init() {
      var _this = this;

      /**
       * SF 创建的第一个页面的 window.name
       */
      this.rootName = fn.getRootName(window.name);

      /**
       * SF 创建的第一个页面的 window.name
       */
      this.rootName = fn.getRootName(window.name);

      /**
       * Send Message, keep messager only one if prerender have created
       *
       * @inner
       * @type {Object}
       */
      var messager = prerender.messager;
      this.messager = messager || new Messenger({ name: this.rootName });

      /**
       * The gesture of document.Used by the event-action of Viewer.
       *
       * @private
       * @type {Gesture}
       */
      this._gesture = new Gesture(document, {
        preventX: false
      });

      this.setupEventAction();

      this.page = new Page();

      // solve many browser quirks...
      this.handleBrowserQuirks();

      // start rendering page
      this.page.start();

      // notify internal performance module
      this.isShow = true;
      this._showTiming = Date.now();
      this.trigger('show', this._showTiming);

      // move <mip-fixed> to second <body>. see fixed-element.js
      this.fixedElement = fixedElement;
      fixedElement.init();

      // proxy <a mip-link>
      setTimeout(function () {
        return _this._proxyLink(_this.page);
      }, 0);
    },


    /**
     * whether in an <iframe> ?
     * **Important** if you want to know whether in BaiduResult page, DO NOT use this flag
     *
     * @type {Boolean}
     * @public
     */
    isIframed: win$1 !== top,

    /**
     * Show contents of page. The contents will not be displayed until the components are registered.
     */
    show: function show() {
      // Job complete! Hide the loading spinner
      document.body.setAttribute('mip-ready', '');

      // notify SF hide its loading
      if (win$1.MIP.viewer.page.isRootPage) {
        this.sendMessage('mippageload', {
          time: Date.now(),
          title: encodeURIComponent(document.title)
        });
      }
    },


    /**
     * Send message to BaiduResult page,
     * including following types:
     * 1. `pushState` when clicking a `<a mip-link>` element (called 'loadiframe')
     * 2. `mipscroll` when scrolling inside an iframe, try to let parent page hide its header.
     * 3. `mippageload` when current page loaded
     * 4. `performance-update`
     *
     * @param {string} eventName
     * @param {Object} data Message body
     */
    sendMessage: function sendMessage(eventName) {
      var _this2 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!win$1.MIP.standalone) {
        // Send Message in normal case
        // Save in queue and execute when page-active received, and update recoreded event time if prerendered
        prerender.execute(function () {
          if (prerender.isPrerendered && data.time) {
            data.time = Date.now();
          }
          _this2.messager.sendMessage(eventName, data);
        });
      }
    },
    onMessage: function onMessage(eventName, callback) {
      if (!win$1.MIP.standalone) {
        this.messager.on(eventName, callback);
      }
    },


    /**
     * Setup event-action of viewer. To handle `on="tap:xxx"`.
     */
    setupEventAction: function setupEventAction() {
      var hasTouch = fn.hasTouch();
      var eventAction = this.eventAction = new EventAction();
      if (hasTouch) {
        // In mobile phone, bind Gesture-tap which listen to touchstart/touchend event
        this._gesture.on('tap', function (event$$1) {
          eventAction.execute('tap', event$$1.target, event$$1);
        });
      } else {
        // In personal computer, bind click event, then trigger event. eg. `on=tap:sidebar.open`, when click, trigger open() function of #sidebar
        document.addEventListener('click', function (event$$1) {
          eventAction.execute('tap', event$$1.target, event$$1);
        }, false);
      }

      document.addEventListener('click', function (event$$1) {
        eventAction.execute('click', event$$1.target, event$$1);
      }, false);

      event.delegate(document, 'input', 'change', function (event$$1) {
        eventAction.execute('change', event$$1.target, event$$1);
      });
    },


    /**
     *
     * @param {string} to Target url
     * @param {Object} options
     * @param {boolean} options.isMipLink Whether targetUrl is a MIP page. If not, use `top.location.href`. Defaults to `true`
     * @param {boolean} options.replace If true, use `history.replace` instead of `history.push`. Defaults to `false`
     * @param {Object} options.state Target page info
     * @param {Object} options.cacheFirst If true, use cached iframe when available
     */
    open: function open(to) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$isMipLink = _ref.isMipLink,
          isMipLink = _ref$isMipLink === undefined ? true : _ref$isMipLink,
          _ref$replace = _ref.replace,
          replace = _ref$replace === undefined ? false : _ref$replace,
          state = _ref.state,
          cacheFirst = _ref.cacheFirst;

      if (!state) {
        state = { click: undefined, title: undefined, defaultTitle: undefined };
      }

      var hash = '';
      if (to.lastIndexOf('#') > -1) {
        hash = to.substring(to.lastIndexOf('#'));
      }
      var isHashInCurrentPage = hash && to.indexOf(window.location.origin + window.location.pathname) > -1;

      // Invalid target, ignore it
      if (!to) {
        return;
      }

      // Jump in top window directly
      // 1. Cross origin and NOT in SF
      // 2. Not MIP page and not only hash change
      if (this._isCrossOrigin(to) && window.MIP.standalone || !isMipLink && !isHashInCurrentPage) {
        if (replace) {
          window.top.location.replace(to);
        } else {
          window.top.location.href = to;
        }
        return;
      }

      var completeUrl = void 0;
      if (/^\/\//.test(to)) {
        completeUrl = location.protocol + to;
      } else if (to.charAt(0) === '/' || to.charAt(0) === '.') {
        completeUrl = location.origin + resolvePath(to, location.pathname);
      } else {
        completeUrl = to;
      }
      // Send statics message to BaiduResult page
      var pushMessage = {
        url: parseCacheUrl(completeUrl),
        state: state
      };
      this.sendMessage(replace ? OUTER_MESSAGE_REPLACE_STATE : OUTER_MESSAGE_PUSH_STATE, pushMessage);

      // Create target route
      var targetRoute = {
        path: window.MIP.standalone ? to : makeCacheUrl(to)
      };

      if (isMipLink) {
        // Reload page even if it's already existed
        targetRoute.meta = {
          reload: true,
          cacheFirst: cacheFirst,
          header: {
            title: pushMessage.state.title,
            defaultTitle: pushMessage.state.defaultTitle
          }
        };
      }

      // Handle <a mip-link replace> & hash
      if (isHashInCurrentPage || replace) {
        this.page.replace(targetRoute, { allowTransition: true });
      } else {
        this.page.push(targetRoute, { allowTransition: true });
      }
    },


    /**
     * Event binding callback.
     * For overridding _bindEventCallback of EventEmitter.
     *
     * @private
     * @param {string} name
     * @param {Function} handler
     */
    _bindEventCallback: function _bindEventCallback(name, handler) {
      if (name === 'show' && this.isShow && typeof handler === 'function') {
        handler.call(this, this._showTiming);
      }
    },


    /**
     * Listerning viewport scroll
     *
     * @private
     */
    viewportScroll: function viewportScroll() {
      var self = this;
      var dist = 0;
      var direct = 0;
      var scrollTop = viewport.getScrollTop();
      // let lastDirect;
      var scrollHeight = viewport.getScrollHeight();
      var lastScrollTop = 0;
      var wrapper = viewport.scroller;

      wrapper.addEventListener('touchstart', function (e) {
        scrollTop = viewport.getScrollTop();
        scrollHeight = viewport.getScrollHeight();
      }, eventListenerOptions$1);

      function pagemove(e) {
        scrollTop = viewport.getScrollTop();
        scrollHeight = viewport.getScrollHeight();
        if (scrollTop > 0 && scrollTop < scrollHeight) {
          if (lastScrollTop < scrollTop) {
            // down
            direct = 1;
          } else if (lastScrollTop > scrollTop) {
            // up
            direct = -1;
          }
          dist = lastScrollTop - scrollTop;
          lastScrollTop = scrollTop;
          if (dist > 10 || dist < -10) {
            // 转向判断，暂时没用到，后续升级需要
            // lastDirect = dist / Math.abs(dist);
            self.sendMessage('mipscroll', { direct: direct, dist: dist });
          }
        } else if (scrollTop === 0) {
          self.sendMessage('mipscroll', { direct: 0 });
        }
      }
      wrapper.addEventListener('touchmove', function (event$$1) {
        return pagemove(event$$1);
      }, eventListenerOptions$1);
      wrapper.addEventListener('touchend', function (event$$1) {
        return pagemove(event$$1);
      });
    },


    /**
     * Proxy all the links in page.
     *
     * @private
     */
    _proxyLink: function _proxyLink() {
      var self = this;
      var httpRegexp = /^http/;
      var telRegexp = /^tel:/;

      /**
       * if an <a> tag has `mip-link` or `data-type='mip'` let router handle it,
       * otherwise let TOP jump
       */
      event.delegate(document, 'a', 'click', function (event$$1) {
        /**
         * browser will resolve fullpath, including path, query & hash
         * eg. http://localhost:8080/examples/page/tree.html?a=b#hash
         * don't use `this.getAttribute('href')`
         */
        var to = this.href;
        var isMipLink = this.hasAttribute('mip-link') || this.getAttribute('data-type') === 'mip';
        var replace = this.hasAttribute('replace');
        var cacheFirst = this.hasAttribute('cache-first');
        var state = self._getMipLinkData.call(this);

        /**
         * For mail、phone、market、app ...
         * Safari failed when iframed. So add the `target="_top"` to fix it. except uc and tel.
         */
        if (platform.isUc() && telRegexp.test(to)) {
          return;
        }

        if (!httpRegexp.test(to)) {
          this.setAttribute('target', '_top');
          return;
        }

        // 以下情况使用 MIP 接管页面跳转
        // 1. Standalone
        // 2. New MIP Service
        var useNewMIPService = window.MIP.standalone || window.mipService === '2';
        if (useNewMIPService) {
          self.open(to, { isMipLink: isMipLink, replace: replace, state: state, cacheFirst: cacheFirst });
        } else {
          if (isMipLink) {
            var message = self._getMessageData.call(this);
            self.sendMessage(message.messageKey, message.messageData);
          } else {
            // other jump through '_top'
            top.location.href = this.href;
          }
        }

        event$$1.preventDefault();
      }, false);
    },


    /**
     * get alink postMessage data
     *
     * @return {Object} messageData
     */
    _getMipLinkData: function _getMipLinkData() {
      // compatible with MIP1
      var parentNode = this.parentNode;

      return {
        click: this.getAttribute('data-click') || parentNode.getAttribute('data-click') || undefined,
        title: this.getAttribute('data-title') || parentNode.getAttribute('title') || undefined,
        defaultTitle: this.innerText.trim().split('\n')[0] || undefined
      };
    },


    /**
     * get alink postMessage data
     * @return {Object} messageData
     */
    _getMessageData: function _getMessageData() {
      var messageKey = 'loadiframe';
      var messageData = {};
      messageData.url = this.href;
      if (this.hasAttribute('no-head')) {
        messageData.nohead = true;
      }
      if (this.hasAttribute('mip-link')) {
        var parent = this.parentNode;
        messageData.title = parent.getAttribute('title') || parent.innerText.trim().split('\n')[0];
        messageData.click = parent.getAttribute('data-click');
      } else {
        messageData.title = this.getAttribute('data-title') || this.innerText.trim().split('\n')[0];
        messageData.click = this.getAttribute('data-click');
      }
      return { messageKey: messageKey, messageData: messageData };
    },
    handleBrowserQuirks: function handleBrowserQuirks() {
      var _this3 = this;

      // add normal scroll class to body. except ios in iframe.
      // Patch for ios+iframe is default in mip.css
      if (!platform.needSpecialScroll) {
        setTimeout(function () {
          document.documentElement.classList.add('mip-i-android-scroll');
          document.body.classList.add('mip-i-android-scroll');
        }, 0);
      }

      // prevent bouncy scroll in iOS 7 & 8
      if (platform.isIos()) {
        var iosVersion = platform.getOsVersion();
        iosVersion = iosVersion ? iosVersion.split('.')[0] : '';
        setTimeout(function () {
          document.documentElement.classList.add('mip-i-ios-scroll');
          document.documentElement.classList.add('mip-i-ios-width');
          window.addEventListener('orientationchange', function () {
            document.documentElement.classList.remove('mip-i-ios-scroll');
            setTimeout(function () {
              document.documentElement.classList.add('mip-i-ios-scroll');
            });
          });
        }, 0);

        if (!this.page.isRootPage) {
          this.fixIOSPageFreeze();
        }

        if (this.isIframed) {
          // 这些兼容性的代码会严重触发 reflow，但又不需要在首帧执行
          // 使用 setTimeout 不阻塞 postMessage 回调执行
          setTimeout(function () {
            _this3.fixSoftKeyboard();
            _this3.viewportScroll();
          }, 0);
          this.lockBodyScroll();

          // While the back button is clicked,
          // the cached page has some problems.
          // So we are forced to load the page in below conditions:
          // 1. IOS 8 + UC
          // 2. IOS 9 & 10 + Safari
          // 3. IOS 8 & 9 & 10 + UC & BaiduApp & Baidu
          var needBackReload = iosVersion === '8' && platform.isUc() && screen.width === 320 || (iosVersion === '9' || iosVersion === '10') && platform.isSafari() || (iosVersion === '8' || iosVersion === '9' || iosVersion === '10') && (platform.isUc() || platform.isBaiduApp() || platform.isBaidu());
          if (needBackReload) {
            window.addEventListener('pageshow', function (e) {
              if (e.persisted) {
                document.body.style.display = 'none';
                location.reload();
              }
            });
          }
        }
      }

      /**
       * trigger layout to solve a strange bug in Android Superframe,
       * which will make page unscrollable
       */
      if (platform.isAndroid()) {
        setTimeout(function () {
          document.documentElement.classList.add('trigger-layout');
          document.body.classList.add('trigger-layout');
        });
      }
    },


    /**
     * fix a iOS UC/Shoubai bug when hiding current iframe,
     * which will cause the whole page freeze
     *
     * https://github.com/mipengine/mip2/issues/19
     */
    fixIOSPageFreeze: function fixIOSPageFreeze() {
      var $style = document.createElement('style');
      var $head = document.head || document.getElementsByTagName('head')[0];
      $style.setAttribute('mip-bouncy-scrolling', '');
      $style.textContent = '* {-webkit-overflow-scrolling: auto!important;}';

      if (!platform.isSafari() && !platform.isChrome()) {
        window.addEventListener(CUSTOM_EVENT_SHOW_PAGE, function (e) {
          try {
            $head.removeChild($style);
          } catch (e) {}
        });
        window.addEventListener(CUSTOM_EVENT_HIDE_PAGE, function (e) {
          $head.appendChild($style);
        });
      }
    },


    /**
     * 修复安卓手机软键盘遮挡的问题
     * 在 iframe 内部点击输入框弹出软键盘后，浏览器不会自动聚焦到输入框，从而导致软键盘遮挡住输入框。输入一个字可以恢复。
     */
    fixSoftKeyboard: function fixSoftKeyboard() {
      if (platform.isAndroid()) {
        window.addEventListener('resize', function () {
          var element = document.activeElement;
          var tagName = element.tagName.toLowerCase();

          if (element && (tagName === 'input' || tagName === 'textarea')) {
            setTimeout(function () {
              if (typeof element.scrollIntoViewIfNeeded === 'function') {
                element.scrollIntoViewIfNeeded();
              } else if (typeof element.scrollIntoView === 'function') {
                element.scrollIntoView();
                document.body.scrollTop -= 44;
              }
            }, 250);
          }
        });
      }
    },


    /**
     * lock body scroll in iOS
     *
     * https://medium.com/jsdownunder/locking-body-scroll-for-all-devices-22def9615177
     * http://blog.christoffer.online/2015-06-10-six-things-i-learnt-about-ios-rubberband-overflow-scrolling/
     */
    lockBodyScroll: function lockBodyScroll() {
      viewport.on('scroll', function () {
        var scrollTop = viewport.getScrollTop();
        var totalScroll = viewport.getScrollHeight();
        if (scrollTop === 0) {
          viewport.setScrollTop(1);
        } else if (scrollTop === totalScroll) {
          viewport.setScrollTop(scrollTop - 1);
        }
      }, eventListenerOptions$1);

      // scroll 1px
      document.documentElement.classList.add('trigger-layout');
      document.body.classList.add('trigger-layout');
      viewport.setScrollTop(1);
    },


    /**
     * Whether target url is a cross origin one
     * @param {string} to targetUrl
     */
    _isCrossOrigin: function _isCrossOrigin(to) {
      var target = to;

      // Below 3 conditions are NOT cross origin
      // 1. '/'
      // 2. Absolute path ('/absolute/path')
      // 3. Relative path ('./relative/path' or '../parent/path')
      if (target.length === 1 || target.charAt(0) === '/' && target.charAt(1) !== '/' || target.charAt(0) === '.') {
        return false;
      }

      // Check protocol
      if (/^http(s?):\/\//i.test(target)) {
        // Starts with 'http://' or 'https://'
        if (!new RegExp('^' + location.protocol, 'i').test(target)) {
          return true;
        }

        target = target.replace(/^http(s?):\/\//i, '');
      } else if (/^\/\//.test(target)) {
        // Starts with '//'
        target = target.substring(2, target.length);
      }

      var hostAndPort = target.split('/')[0];
      if (location.host !== hostAndPort) {
        return true;
      }

      return false;
    }
  };

  EventEmitter.mixin(viewer);

  /**
   * @file 首屏标记识别
   * @author liwenqian@baidu.com
   */
  var missList = [];
  var incorrectList = [];

  function getPathTo(element) {
    if (element.tagName === 'HTML') {
      return 'html.1';
    }
    if (element === document.body) {
      return 'html.1/body.1';
    }

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
      var sibling = siblings[i];
      if (sibling === element) {
        return getPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '.' + (ix + 1) + '';
      }
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
    }
  }

  function sendLog() {
    var allLabelImgs = [].concat(toConsumableArray(document.querySelectorAll('mip-img[firstscreen]')));
    var allFirstScreenImgs = [].concat(toConsumableArray(document.querySelectorAll('mip-img[mip-firstscreen-element]')));
    allLabelImgs.forEach(function (element) {
      if (!element.hasAttribute('mip-firstscreen-element')) {
        incorrectList.push(getPathTo(element));
      }
    });
    allFirstScreenImgs.forEach(function (element) {
      if (!element.hasAttribute('firstscreen')) {
        missList.push(getPathTo(element));
      }
    });
    var info = missList.join(',') + '!!' + incorrectList.join(',');
    viewer.sendMessage(OUTER_MESSAGE_PERFORMANCE_ANALYSIS_LOG, {
      type: 'fslabel',
      info: info
    });
  }

  var firstScreenLabel = {
    sendLog: sendLog
  };

  /**
   * @file performance
   * @author sekiyika(pengxing@baidu.com)
   */

  var EventEmitter$1 = util.EventEmitter;

  /**
   * Store first-screen elements.
   * @inner
   */
  var fsElements = [];

  /**
   * Locked flag of fsElements.
   * @inner
   */
  var fsElementsLocked = false;

  /**
   * Start flag. This will be runned only once.
   * @inner
   */
  var isStart = false;

  /**
   * Record time.
   * @inner
   */
  var recorder = {};

  /**
   * Event for updating timing.
   * @inner
   */
  var performanceEvent = new EventEmitter$1();

  /**
   * Add first-screen element.
   *
   * @param {HTMLElement} element html element
   */
  function addFsElement(element) {
    if (!fsElementsLocked) {
      fsElements.push(element);
    }
  }

  /**
   * Remove element from fsElements.
   *
   * @param {HTMLElement} element html element
   */
  function removeFsElement(element) {
    var index = fsElements.indexOf(element);
    if (index !== -1) {
      fsElements.splice(index, 1);
    }
  }

  /**
   * Get the timings.
   *
   * @return {Object}
   */
  function getTiming() {
    var nativeTiming = void 0;
    var performance = window.performance;
    if (performance && performance.timing) {
      nativeTiming = performance.timing.toJSON ? performance.timing.toJSON() : util.fn.extend({}, performance.timing);
    } else {
      nativeTiming = {};
    }
    return util.fn.extend(nativeTiming, recorder);
  }

  /**
   * Record timing by name.
   *
   * @param {string} name Name of the timing.
   * @param {?number} timing timing
   */
  function recordTiming(name, timing) {
    recorder[name] = parseInt(timing, 10) || Date.now();
    performanceEvent.trigger('update', getTiming());
  }

  /**
   * Try recording first-screen loaded.
   */
  function tryRecordFirstScreen() {
    if (recorder.MIPFirstScreen) {
      return;
    }
    fsElements.length === 0 && recordTiming('MIPFirstScreen');
  }

  /**
   * Lock the fsElements. No longer add fsElements.
   */
  function lockFirstScreen() {
    // when is prerendering, iframe container display none,
    // all elements are not in viewport.
    if (prerender.isPrerendering) {
      return;
    }
    var viewportRect = viewport.getRect();
    fsElements = fsElements.filter(function (element) {
      if (prerender.isPrerendered) {
        return element._resources.isInViewport(element, viewportRect);
      }
      return element.inViewport();
    }).map(function (element) {
      element.setAttribute('mip-firstscreen-element', '');
      return element;
    });
    fsElementsLocked = true;
    tryRecordFirstScreen();
    !prerender.isPrerendered && firstScreenLabel.sendLog();
  }
  /**
   * Record dom loaded timing.
   */
  function domLoaded() {
    recordTiming('MIPDomContentLoaded');
    setTimeout(function () {
      lockFirstScreen();
    }, 10);
  }

  /**
   * First screen element loaded.
   *
   * @param {HTMLElement} element htmlElement
   */
  function fsElementLoaded(element) {
    removeFsElement(element);
    tryRecordFirstScreen();
  }

  /**
   * Start.
   *
   * @param {number} startTiming The MIP start timing.
   */
  function start(startTiming) {
    if (isStart) {
      return;
    }
    isStart = true;
    recordTiming('MIPStart', startTiming);
    viewer.on('show', function (showTiming) {
      recordTiming('MIPPageShow', showTiming);
    });

    if (document.readyState === 'complete') {
      domLoaded();
    } else {
      document.addEventListener('DOMContentLoaded', domLoaded, false);
    }
  }

  var performance = {
    start: start,
    addFsElement: addFsElement,
    fsElementLoaded: fsElementLoaded,
    getTiming: getTiming,
    recordTiming: recordTiming,
    lockFirstScreen: lockFirstScreen,
    on: function on() {
      performanceEvent.on.apply(performanceEvent, arguments);
    }
  };

  /**
   * @file Resource Function
   * @author xx
   */

  // const COMPONENTS_NEED_NOT_DELAY = ['MIP-IMG', 'MIP-CAROUSEL', 'MIP-DATA', 'MIP-VIDEO', 'MIP-LAYOUT']

  /**
   * Store the resources.
   * @inner
   * @type {Object}
   */
  var resources = {};

  /**
   * Resources counter.
   * @inner
   * @type {number}
   */
  var counter = 0;

  /**
   * MIP Elements's controller. It's use to manage all the elements's custom life circle and
   * provide the overall interfaces of the MIP Elements.
   *
   * @class
   */

  var Resources = function () {
    function Resources() {
      classCallCheck(this, Resources);

      /**
       * Resources id
       * @private
       * @type {number}
       */
      this._rid = counter++;

      /**
       * Element id
       * @private
       * @type {number}
       */
      this._eid = 0;

      // add to resources
      resources[this._rid] = {};

      /**
       * The method to udpate state.
       * @type {Function}
       */
      this.updateState = this._update.bind(this);

      /**
       * Viewport
       * @private
       * @type {Object}
       */
      this._viewport = viewport;

      /** @private @type {number} */
      this._rafId = null;

      this._gesture = new Gesture(document, {
        preventX: false
      });
      this._bindEvent();
    }

    /**
     * Bind the events of current object.
     */


    createClass(Resources, [{
      key: '_bindEvent',
      value: function _bindEvent() {
        var _this = this;

        var timer = void 0;
        this._viewport.on('changed resize', this.updateState);
        this._gesture.on('swipe', function (e, data) {
          var delay = Math.round(data.velocity * 600);
          delay < 100 && (delay = 100);
          delay > 600 && (delay = 600);
          clearTimeout(timer);
          timer = setTimeout(_this.updateState, delay);
        });
      }

      /**
       * Add an element for current object and update all the elements's state.
       *
       * @param {MIPElement} element A mip element
       */

    }, {
      key: 'add',
      value: function add(element) {
        var _this2 = this;

        element._eid = this._eid++;
        resources[this._rid][element._eid] = element;

        // let fn = () => {
        prerender.execute(function () {
          element.build();
          _this2.updateState();
        }, element);
        // }
        // COMPONENTS_NEED_NOT_DELAY.indexOf(element.tagName) === -1 ? setTimeout(fn, 20) : fn()
      }

      /**
       * Remove element from current resources object.
       *
       * @param {MIPElement|string} element Mip element or _eid of element
       * @return {boolean} the removed state of element
       */

    }, {
      key: 'remove',
      value: function remove(element) {
        var id = element._eid || element;
        if (isFinite(+id) && resources[this._rid][id]) {
          element.unlayoutCallback && element.unlayoutCallback();
          delete resources[this._rid][id];
          return true;
        }
        return false;
      }

      /**
       * Return an object of resources.
       *
       * @return {Object}
       */

    }, {
      key: 'getResources',
      value: function getResources() {
        return resources[this._rid];
      }

      /**
       * Return an array of resources.
       *
       * @return {Array}
       */

    }, {
      key: 'getResourcesList',
      value: function getResourcesList() {
        return fn.values(this.getResources());
      }

      /**
       * Set an element's viewport state to 'true' or 'false'.
       *
       * @param {MIPElement} element element
       * @param {boolean} inViewport inViewport
       */

    }, {
      key: 'setInViewport',
      value: function setInViewport(element, inViewport) {
        if (element.inViewport() !== inViewport) {
          element.viewportCallback(inViewport);
        }
      }

      /**
       * Check element in viewport
       *
       * @param {MIPElement} element element
       * @param {Object} viewportRect viewport Rect
       * @return {boolean} is inViewport
       */

    }, {
      key: 'isInViewport',
      value: function isInViewport(element, viewportRect) {
        var elementRect = rect.getElementRect(element);
        // Compute the viewport state of current element.
        // If current element`s prerenderAllowed returns `true` always set the state to be `true`.
        return element.prerenderAllowed(elementRect, viewportRect) || rect.overlapping(elementRect, viewportRect) ||
        // 在 ios 有个设置滚动${@link ./viewer.lockBodyScroll} 会设置 scrollTop=1
        // 如果部分元素在顶部而且没有设置高度，会导致 elementRect 和 viewportRect 不重叠，
        // 进而导致无法执行元素的生命周期，针对这种情况做特殊处理
        elementRect.bottom === 0 && elementRect.top === 0 && viewportRect.top === 1;
      }

      /**
       * Deffered update elements's viewport state.
       * @return {Promise<undefined>}
       */

    }, {
      key: '_update',
      value: function _update() {
        var _this3 = this;

        if (!this._rafId) {
          // 改用 raf 让页面一帧只计算一次 update
          this._rafId = fn.raf(function () {
            return _this3._doRealUpdate();
          });
        }
        return this._rafId;
      }

      /**
       * Do real update elements's viewport state with performance
       */

    }, {
      key: '_doRealUpdate',
      value: function _doRealUpdate() {
        /* @type {Object} */
        var resources = this.getResources();
        var viewportRect = this._viewport.getRect();
        var elementIds = [];
        while (true) {
          var updatedElementIds = Object.keys(resources);
          // 计算是否有新增的自定义元素
          var newElementIds = updatedElementIds.filter(function (k) {
            return elementIds.indexOf(k) < 0;
          });
          elementIds = updatedElementIds;

          if (!newElementIds.length) {
            break;
          }

          for (var i = 0, len = newElementIds.length; i < len; i++) {
            var ele = resources[newElementIds[i]];
            // The element may have been removed.
            if (ele && ele.isBuilt()) {
              try {
                var inViewport = this.isInViewport(ele, viewportRect);
                this.setInViewport(ele, inViewport);
              } catch (e) {
                console.warn(e);
              }
            }
          }
        }
        this._rafId = null;
      }

      /**
       * Forced set the element's viewport state to 'true'.
       *
       * @param {MIPElement} element element
       */

    }, {
      key: 'prerenderElement',
      value: function prerenderElement(element) {
        if (element.inViewport && !element.inViewport()) {
          element.viewportCallback && element.viewportCallback(true);
        }
      }
    }]);
    return Resources;
  }();

  var resources$1 = new Resources();

  /**
   * @file custom element store
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * element store
   *
   * @type {Object}
   */
  var store = {
    mip1: {},
    mip2: {}
  };

  var customElementsStore = {

    /**
     * get custom element class by name
     *
     * @param {string} name customElment name
     * @param {string=} type customElement type, mip1 or mip2
     * @return {MIPElement}
     */
    get: function get(name, type) {
      name = name.toLowerCase();
      switch (type) {
        case 'mip1':
          return store.mip1[name];
        case 'mip2':
          return store.mip2[name];
        default:
          return store.mip2[name] || store.mip1[name] || undefined;
      }
    },


    /**
     * store custom element name and clazz pair
     *
     * @param {string} name custom element name
     * @param {MIPElement} clazz custom element class
     * @param {string} type mip1 or mip2
     */
    set: function set(name, clazz, type) {
      if (type !== 'mip2' && type !== 'mip1') {
        throw new Error('type: ' + type + ' must be mip1 or mip2');
      }

      store[type][name.toLowerCase()] = clazz;
    }
  };

  /**
   * @file Element Function
   * @author xx
   */

  /* globals HTMLElement */

  /**
   * Save the base element prototype to avoid duplicate initialization.
   * @inner
   * @type {Object}
   */
  var baseElementProto = void 0;

  /**
   * Create a basic prototype of mip elements classes
   *
   * @return {Object}
   */
  function createBaseElementProto() {
    if (baseElementProto) {
      return baseElementProto;
    }

    // Base element inherits from HTMLElement
    var proto = Object.create(HTMLElement.prototype);

    /**
     * Created callback of MIPElement. It will initialize the element.
     */
    proto.createdCallback = function () {
      // get mip1 clazz from custom elements store
      var CustomElement = customElementsStore.get(this.tagName, 'mip1');

      this.classList.add('mip-element');

      /**
       * Viewport state
       * @private
       * @type {boolean}
       */
      this._inViewport = false;

      /**
       * Whether the element is into the viewport.
       * @private
       * @type {boolean}
       */
      this._firstInViewport = false;

      /**
       * The resources object.
       * @private
       * @type {Object}
       */
      this._resources = resources$1;

      /**
       * Instantiated the custom element.
       * @type {Object}
       * @public
       */
      var customElement = this.customElement = new CustomElement(this);
      customElement.createdCallback();

      // Add first-screen element to performance.
      if (customElement.hasResources()) {
        performance.addFsElement(this);
      }
    };

    /**
     * When the element is inserted into the DOM, initialize the layout and add the element to the '_resources'.
     */
    proto.attachedCallback = function () {
      // Apply layout for this.
      this._layout = applyLayout(this);
      this.customElement.attachedCallback();
      this._resources.add(this);
    };

    /**
     * When the element is removed from the DOM, remove it from '_resources'.
     */
    proto.detachedCallback = function () {
      this.customElement.detachedCallback();
      this._resources.remove(this);
      performance.fsElementLoaded(this);
    };

    proto.attributeChangedCallback = function (attributeName, oldValue, newValue, namespace) {
      var _arguments = arguments;

      var ele = this.customElement;
      prerender.execute(function () {
        ele.attributeChangedCallback.apply(ele, _arguments);
      }, this);
    };

    /**
     * Check whether the element is in the viewport.
     *
     * @return {boolean}
     */
    proto.inViewport = function () {
      return this._inViewport;
    };

    /**
     * Called when the element enter or exit the viewport.
     *
     * @param {boolean} inViewport whether in viewport or not
     * And it will call the firstInviewCallback and viewportCallback of the custom element.
     */
    proto.viewportCallback = function (inViewport) {
      this._inViewport = inViewport;
      if (!this._firstInViewport) {
        this._firstInViewport = true;
        this.customElement.firstInviewCallback();
      }
      this.customElement.viewportCallback(inViewport);
    };

    /**
     * Check whether the building callback has been executed.
     *
     * @return {boolean}
     */
    proto.isBuilt = function () {
      return this._built;
    };

    /**
     * Check whether the element need to be rendered in advance.
     *
     * @return {boolean}
     */
    proto.prerenderAllowed = function () {
      return this.customElement.prerenderAllowed();
    };

    /**
     * Build the element and the custom element.
     * This will be executed only once.
     */
    proto.build = function () {
      if (this.isBuilt()) {
        return;
      }

      // Add `try ... catch` avoid the executing build list being interrupted by errors.
      try {
        this.customElement.build();
        this._built = true;
        customEmit(this, 'build');
      } catch (e) {
        customEmit(this, 'build-error', e);
        console.warn('build error:', e);
      }
    };

    /**
     * Method of executing event actions of the custom Element
     *
     * @param {Object} action event action
     */
    proto.executeEventAction = function (action) {
      this.customElement.executeEventAction(action);
    };

    /**
     * Called by customElement. And tell the performance that element is loaded.
     * @deprecated
     */
    proto.resourcesComplete = function () {
      performance.fsElementLoaded(this);
    };

    baseElementProto = proto;

    return baseElementProto;
  }

  /**
   * Create a mip element prototype by name
   *
   * @param {string} name The mip element's name
   * @return {Object}
   */
  function createMipElementProto(name) {
    var proto = Object.create(createBaseElementProto());
    proto.name = name;
    return proto;
  }

  /**
   * Add a style tag to head by csstext
   *
   * @param {string} css Css code
   * @param {string} name name
   */
  function loadCss(css, name) {
    if (css) {
      cssLoader.insertStyleElement(document, document.head, css, name, false);
    }
  }

  /**
   * Register MIPElement.
   *
   * @param {string} name Name of a MIPElement.
   * @param {Class} elementClass element class
   * @param {string} css The csstext of the MIPElement.
   * @return {Array<HTMLElement>|undefined}
   */
  function registerElement(name, elementClass, css) {
    if (customElementsStore.get(name)) {
      return;
    }

    // store the name-clazz pair
    customElementsStore.set(name, elementClass, 'mip1');

    /** @type {Array<BaseElement>} */
    var customElementInstances = [];

    // Override createdCallback to count element instances
    var mipElementProto = createMipElementProto(name);
    var createdCallback = mipElementProto.createdCallback;
    mipElementProto.createdCallback = function () {
      createdCallback.call(this);
      customElementInstances.push(this);
    };

    loadCss(css, name);
    document.registerElement(name, {
      prototype: mipElementProto
    });

    return customElementInstances;
  }

  /**
   * @file size-list.js
   * @author huanghuiquan (huanghuiquan@baidu.com)
   */

  /**
   * SizeList options definition
   * @typedef {Object} SizeListOptDef
   * @property {string|undefined} mediaQuery
   * @property {string} size
   */

  /**
   * Parses the text representation of "sizes" into SizeList object.
   *
   * @param {string} s
   * @param {boolean} allowPercent
   * @return {!SizeList}
   */
  function parseSizeList(s, allowPercent) {
    var sSizes = s.split(',');
    var sizes = [];
    sSizes.forEach(function (sSize) {
      sSize = sSize.replace(/\s+/g, ' ').trim();
      // istanbul ignore next
      if (sSize.length === 0) {
        return;
      }

      var mediaStr = void 0;
      var sizeStr = void 0;

      // Process the expression from the end.
      var lastChar = sSize.charAt(sSize.length - 1);
      var div = void 0;
      var func = false;
      if (lastChar === ')') {
        // Value is the CSS function, e.g. `calc(50vw + 10px)`.
        func = true;

        // First, skip to the opening paren.
        var parens = 1;
        div = sSize.length - 2;
        for (; div >= 0; div--) {
          var c = sSize.charAt(div);
          if (c === '(') {
            parens--;
          } else if (c === ')') {
            parens++;
          }
          if (parens === 0) {
            break;
          }
        }

        // Then, skip to the begining to the function's name.
        var funcEnd = div - 1;
        if (div > 0) {
          div--;
          for (; div >= 0; div--) {
            var _c = sSize.charAt(div);
            if (!(_c === '%' || _c === '-' || _c === '_' || _c >= 'a' && _c <= 'z' || _c >= 'A' && _c <= 'Z' || _c >= '0' && _c <= '9')) {
              break;
            }
          }
        }
        if (div >= funcEnd) {
          throw new Error('Invalid CSS function in "' + sSize + '"');
        }
      } else {
        // Value is the length or a percent: accept a wide range of values,
        // including invalid values - they will be later asserted to conform
        // to exact CSS length or percent value.
        div = sSize.length - 2;
        for (; div >= 0; div--) {
          var _c2 = sSize.charAt(div);
          if (!(_c2 === '%' || _c2 === '.' || _c2 >= 'a' && _c2 <= 'z' || _c2 >= 'A' && _c2 <= 'Z' || _c2 >= '0' && _c2 <= '9')) {
            break;
          }
        }
      }
      if (div >= 0) {
        mediaStr = sSize.substring(0, div + 1).trim();
        sizeStr = sSize.substring(div + 1).trim();
      } else {
        sizeStr = sSize;
        mediaStr = undefined;
      }

      if (!func) {
        if (allowPercent && !/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|%)$/.test(sizeStr)) {
          throw new Error('Invalid length or percent value: ' + sizeStr);
        }

        if (!allowPercent && !/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)$/.test(sizeStr)) {
          throw new Error('Invalid length value: ' + sizeStr);
        }
      }

      sizes.push({
        mediaQuery: mediaStr,
        size: sizeStr
      });
    });
    return new SizeList(sizes);
  }

  /**
   * A SizeList object contains one or more sizes as typically seen in "sizes"
   * attribute.
   */
  var SizeList = function () {
    function SizeList(sizes) {
      classCallCheck(this, SizeList);

      if (sizes.length > 0) {
        /** @private @type {SizeListOptDef} */
        this._sizes = sizes;
      } else {
        throw new Error('SizeList must have at least one option');
      }

      // All sources except for last must have a media query. The last one must not.
      for (var i = 0; i < sizes.length; i++) {
        var option = sizes[i];
        if (i < sizes.length - 1) {
          if (!option.mediaQuery) {
            throw new Error('All options except for the last must have a media condition');
          }
        } else if (option.mediaQuery) {
          throw new Error('The last option must not have a media condition');
        }
      }
    }

    /**
     * Selects the first size that matches media conditions. If no options match,
     * the last option is returned.
     *
     * @param {!Window} win
     * @return {string}
     */


    createClass(SizeList, [{
      key: 'select',
      value: function select(win) {
        var sizes = this._sizes;
        var length = sizes.length - 1;

        // Iterate all but the last size
        for (var i = 0; i < length; i++) {
          var option = sizes[i];
          // Only the last item (which we don't iterate) has an undefined
          // mediaQuery.
          var query = /** @type {string} */option.mediaQuery;
          if (win.matchMedia(query).matches) {
            return option.size;
          }
        }

        // Returns the last size in the SizeList, which is the default.
        return sizes[length].size;
      }
    }]);
    return SizeList;
  }();

  var _fixBabelExtend = function (O) {
    var gPO = O.getPrototypeOf || function (o) {
      return o.__proto__;
    },
        sPO = O.setPrototypeOf || function (o, p) {
      o.__proto__ = p;
      return o;
    },
        construct = (typeof Reflect === 'undefined' ? 'undefined' : _typeof(Reflect)) === 'object' ? Reflect.construct : function (Parent, args, Class) {
      var Constructor,
          a = [null];
      a.push.apply(a, args);
      Constructor = Parent.bind.apply(Parent, a);
      return sPO(new Constructor(), Class.prototype);
    };

    return function fixBabelExtend(Class) {
      var Parent = gPO(Class);
      return sPO(Class, sPO(function Super() {
        return construct(Parent, arguments, gPO(this).constructor);
      }, Parent));
    };
  }(Object);

  /** @param {!Element} element */
  function isInputPlaceholder(element) {
    return 'placeholder' in element;
  }

  /**
   * Finds the last child element that satisfies the callback.
   * @param {!Element} parent
   * @param {function(!Element):boolean} callback
   * @return {?Element}
   */
  function lastChildElement(parent, callback) {
    for (var child = parent.lastElementChild; child; child = child.previousElementSibling) {
      if (callback(child)) {
        return child;
      }
    }
    return null;
  }

  /**
   * Returns "true" for internal MIP nodes or for placeholder elements.
   * @param {!Node} node
   * @return {boolean}
   */
  function isInternalNode(node) {
    var tagName = typeof node === 'string' ? node : node.tagName;
    if (tagName && tagName.toLowerCase().indexOf('mip-i-') === 0) {
      return true;
    }

    if (node.tagName && (node.hasAttribute('placeholder') || node.hasAttribute('fallback') || node.hasAttribute('overflow'))) {
      return true;
    }
    return false;
  }

  var BaseElement = _fixBabelExtend(function (_HTMLElement) {
    inherits(BaseElement, _HTMLElement);

    function BaseElement(element) {
      classCallCheck(this, BaseElement);

      /** @private {string} */
      var _this = possibleConstructorReturn(this, (BaseElement.__proto__ || Object.getPrototypeOf(BaseElement)).call(this, element));

      _this._name = _this.tagName.toLowerCase();

      /** @private {boolean} */
      _this._inViewport = false;

      /** @private {boolean} */
      _this._firstInViewport = false;

      /** @private {Object} */
      _this._resources = resources$1;

      /** @private {?Element} */
      _this._loadingContainer = null;

      /** @private {?Element} */
      _this._laodingElement = null;

      /** @private {boolean|undefined} */
      _this._loadingDisabled = undefined;

      /** @private {string|null|undefined} */
      _this._mediaQuery = undefined;

      /** @private {SizeList|null|undefined} */
      _this._sizeList = undefined;

      /** @private {SizeList|null|undefined} */
      _this._heightsList = undefined;

      /** @private {string} */
      _this._layout = LAYOUT.NODISPLAY;

      /** @private {?Element|undefined} */
      _this.spaceElement = undefined;

      // get mip2 clazz from custom elements store
      var CustomElement = customElementsStore.get(_this._name, 'mip2');

      /**
       * Instantiated the custom element.
       * @type {Object}
       * @public
       */
      _this.customElement = new CustomElement(_this);

      // Add first-screen element to performance.
      if (_this.customElement.hasResources()) {
        performance.addFsElement(_this);
      }
      return _this;
    }

    createClass(BaseElement, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        // Apply layout for this.
        this.classList.add('mip-element');
        this._layout = applyLayout(this);
        this.applySizesAndMediaQuery();
        this.customElement.connectedCallback();
        this._resources.add(this);
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        this.customElement.disconnectedCallback();
        this._resources && this._resources.remove(this);
        // performance.fsElementLoaded(this);
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback() {
        var ele = this.customElement;
        ele.attributeChangedCallback.apply(ele, arguments);
      }

      /**
       * Layout the element with content, and load resources, it must return a
       * promise, if there is not any async operation, it should resolve imediately
       * or it should return a pending promise. A loading animation will be
       * shown during resoures loading.
       *
       * This method is always called for first time in viewport
       *
       * @return {!Promise}
       */

    }, {
      key: 'layoutCallback',
      value: function layoutCallback() {
        this.toggleLoading(true);
        return this.customElement.layoutCallback();
      }

      /**
       * It will be called when element remove by resource, unload resource
       * or unbind event.
       */

    }, {
      key: 'unlayoutCallback',
      value: function unlayoutCallback() {
        return this.customElement.unlayoutCallback();
      }

      /**
       * Creates a placeholder for the element.
       * @return {?Element}
       */

    }, {
      key: 'createPlaceholder',
      value: function createPlaceholder() {
        return this.customElement.createPlaceholderCallback();
      }

      /**
       * Returns an optional placeholder element for this custom element.
       * @return {?Element}
       */

    }, {
      key: 'getPlaceholder',
      value: function getPlaceholder() {
        if (this.hasAttribute('placeholder')) {
          return null;
        }

        return lastChildElement(this, function (el) {
          return el.hasAttribute('placeholder') && !isInputPlaceholder(el);
        });
      }

      /**
       * Hides or shows the placeholder, if available.
       * @param {boolean} show
       */

    }, {
      key: 'togglePlaceholder',
      value: function togglePlaceholder(show) {
        var placeholder = this.getPlaceholder();
        if (!placeholder) {
          return;
        }

        // istanbul ignore next
        if (show) {
          placeholder.classList.remove('mip-hidden');
        } else {
          placeholder.classList.add('mip-hidden');
        }
      }

      // /**
      //  * Returns an optional fallback element for this custom element.
      //  * @return {?Element}
      //  */
      // getFallback () {
      //   return lastChildElement(this, el => el.hasAttribute('fallback'))
      // }

      /**
       * Hides or shows the fallback, if available.
       * @param {boolean} show
       */

    }, {
      key: 'toggleFallback',
      value: function toggleFallback(show) {
        this.classList.toggle('mip-notsupported', show);
      }

      /**
       * Whether the loading can be shown for this element.
       * @return {boolean}
       */

    }, {
      key: 'isLoadingEnabled',
      value: function isLoadingEnabled() {
        // 如果元素本身是 placeholder，则不显示 loading
        if (this.hasAttribute('placeholder')) {
          return false;
        }

        // 如果没有设置容器大小，不显示 loading
        if (!this.classList.contains('mip-layout-size-defined')) {
          return false;
        }

        if (this._loadingDisabled === undefined) {
          this._loadingDisabled = this.hasAttribute('noloading');
        }
        if (this._loadingDisabled) {
          return false;
        }

        return this.customElement.isLoadingEnabled();
      }

      /**
       * Creates a loading object.
       */

    }, {
      key: 'prepareLoading',
      value: function prepareLoading() {
        /* istanbul ignore if */
        if (!this.isLoadingEnabled()) {
          return;
        }

        if (!this._loadingContainer) {
          var container = dom.create('\n        <div class="mip-loading-container mip-fill-content mip-hidden">\n        </div>\n      ');
          var element = dom.create('\n        <div class="mip-loader">\n          <div class="mip-loader-dot"></div>\n          <div class="mip-loader-dot"></div>\n          <div class="mip-loader-dot"></div>\n        </div>\n      ');

          container.appendChild(element);
          this.appendChild(container);
          this._loadingContainer = container;
          this._laodingElement = element;
        }
      }

      /**
       * Turns the loading indicator on or off.
       * @param {boolean} state
       * @param {{cleanup:boolean}=} options
       */

    }, {
      key: 'toggleLoading',
      value: function toggleLoading(state, options) {
        var cleanup = options && options.cleanup;

        if (!this.isLoadingEnabled()) {
          return;
        }

        this.prepareLoading();
        /* istanbul ignore if */
        if (!this._loadingContainer) {
          return;
        }

        this._loadingContainer.classList.toggle('mip-hidden', !state);
        this._laodingElement.classList.toggle('mip-active', state);

        if (!state && cleanup) {
          var loadingContainer = this._loadingContainer;
          this._loadingContainer = null;
          this._loadingElement = null;
          this.removeChild(loadingContainer);
        }
      }
    }, {
      key: 'build',
      value: function build() {
        if (this.isBuilt()) {
          return;
        }

        // Add `try ... catch` avoid the executing build list being interrupted by errors.
        try {
          if (!this.getPlaceholder()) {
            var placeholder = this.createPlaceholder();
            if (placeholder) {
              this.appendChild(placeholder);
            }
          }
          this.customElement.build();
          this._built = true;

          // emit build event
          customEmit(this, 'build');
        } catch (e) {
          this.error = e;
          customEmit(this, 'build-error', e);
          console.warn('build error:', e);
        }
      }
    }, {
      key: 'isBuilt',
      value: function isBuilt() {
        return this._built;
      }
    }, {
      key: '_getSpace',
      value: function _getSpace() {
        /* istanbul ignore if */
        if (this.spaceElement === undefined && this._layout === LAYOUT.RESPONSIVE) {
          // Expect space to exist, just not yet discovered.
          this.spaceElement = this.querySelector('mip-i-space');
        }
        return this.spaceElement || null;
      }

      /**
       * If the element has a media attribute, evaluates the value as a media
       * query and based on the result adds or removes the class
       * `mip-hidden-by-media-query`. The class adds display:none to the
       * element which in turn prevents any of the resource loading to happen for
       * the element.
       */

    }, {
      key: 'applySizesAndMediaQuery',
      value: function applySizesAndMediaQuery() {
        var defaultView = this.ownerDocument.defaultView;

        // Media query.

        if (this._mediaQuery === undefined) {
          this._mediaQuery = this.getAttribute('media') || null;
        }
        if (this._mediaQuery) {
          this.classList.toggle('mip-hidden-by-media-query', !defaultView.matchMedia(this._mediaQuery).matches);
        }

        // Sizes.
        if (this._sizeList === undefined) {
          var sizesAttr = this.getAttribute('sizes');
          this._sizeList = sizesAttr ? parseSizeList(sizesAttr) : null;
        }
        if (this._sizeList) {
          css(this, 'width', this._sizeList.select(defaultView));
        }
        // Heights.
        if (this._heightsList === undefined && this._layout === LAYOUT.RESPONSIVE) {
          var heightsAttr = this.getAttribute('heights');
          this._heightsList = heightsAttr ? parseSizeList(heightsAttr, /* allowPercent */true) : null;
        }
        if (this._heightsList) {
          var space = this._getSpace();
          if (space) {
            css(space, 'paddingTop', this._heightsList.select(defaultView));
          }
        }
      }

      /**
       * Returns the original nodes of the custom element without any service
       * nodes that could have been added for markup. These nodes can include
       * Text, Comment and other child nodes.
       * @return {!Array<!Node>}
       */

    }, {
      key: 'getRealChildNodes',
      value: function getRealChildNodes() {
        return [].concat(toConsumableArray(this.childNodes)).filter(function (node) {
          return !isInternalNode(node);
        });
      }
    }, {
      key: 'inViewport',
      value: function inViewport() {
        return this._inViewport;
      }
    }, {
      key: 'viewportCallback',
      value: function viewportCallback(inViewport) {
        var _this2 = this;

        this.customElement.viewportCallback(inViewport);
        this._inViewport = inViewport;
        // It not support `finaly` in huawei honner h
        var onFinally = function onFinally() {
          _this2.togglePlaceholder(false);
          _this2.toggleLoading(false, {
            cleanup: true
          });
        };
        if (inViewport && !this._firstInViewport) {
          this.layoutCallback().then(function () {
            return _this2.customElement.firstLayoutCompleted();
          }, function () {
            return _this2.toggleFallback(true);
          }).then(onFinally, onFinally);

          this._firstInViewport = true;
          this.customElement.firstInviewCallback();
        }
      }
    }, {
      key: 'executeEventAction',
      value: function executeEventAction(action) {
        this.customElement.executeEventAction(action);
      }

      /**
       * Check whether the element need to be rendered in advance
       *
       * @param {Object} elementRect element rect
       * @param {Object} viewportRect viewport rect
       *
       * @return {boolean}
       */

    }, {
      key: 'prerenderAllowed',
      value: function prerenderAllowed(elementRect, viewportRect) {
        return this.customElement.prerenderAllowed(elementRect, viewportRect);
      }

      /**
       * Called by customElement. And tell the performance that element is loaded.
       * @deprecated
       */

    }, {
      key: 'resourcesComplete',
      value: function resourcesComplete() {
        // istanbul ignore next
        performance.fsElementLoaded(this);
      }
    }]);
    return BaseElement;
  }(HTMLElement));

  /**
   * Add a style tag to head by csstext
   *
   * @param {string} css Css code
   * @param {string} name name
   */


  function loadCss$1(css$$1, name) {
    if (css$$1) {
      cssLoader.insertStyleElement(document, document.head, css$$1, name, false);
    }
  }

  /**
   * Register MIPElement.
   *
   * @param {string} name Name of a MIPElement.
   * @param {Class} elementClass element class
   * @param {string} css The csstext of the MIPElement.
   * @return {Array<HTMLElement>|undefined}
   */
  function registerElement$1(name, elementClass, css$$1) {
    if (customElementsStore.get(name)) {
      return;
    }

    // store the name-clazz pair
    customElementsStore.set(name, elementClass, 'mip2');

    /** @type {Array<BaseElement>} */
    var customElementInstances = [];

    loadCss$1(css$$1, name);
    window.customElements.define(name, function (_BaseElement) {
      inherits(_class, _BaseElement);
      createClass(_class, null, [{
        key: 'observedAttributes',
        get: function get$$1() {
          return elementClass.observedAttributes;
        }
      }]);

      function _class() {
        var _ref;

        classCallCheck(this, _class);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var _this3 = possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

        customElementInstances.push(_this3);
        return _this3;
      }

      return _class;
    }(BaseElement));

    return customElementInstances;
  }

  /**
   * @file helpers.js
   * @author sfe-sy (sfe-sy@baidu.com)
   */

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-+(\w)/g;
  var camelize = function camelize(str) {
    return str.replace(camelizeRE, function (_, c) {
      return c ? c.toUpperCase() : '';
    });
  };

  var isArray = Array.isArray;
  var isFunction = function isFunction(fn) {
    return typeof fn === 'function';
  };

  /**
   * Hyphenate a camelCase string.
   */
  var hyphenate = function hyphenate(str) {
    return str.replace(/[A-Z]/g, function (s) {
      return '-' + s.toLowerCase();
    }).replace(/^-/, '');
  };

  // Convert an Array - like object to a real Array.
  function toArray$1(list) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      // eslint-disable-line no-plusplus
      ret[i] = list[i + start];
    }
    return ret;
  }

  /**
   * @file props.js
   * @author sfe-sy (sfe-sy@baidu.com)
   */

  /**
   * 从 vue 组件定义的 prop 中获取类型，如果没有定义类型，默认返回 String
   * @param {Object|Function} prop prop 规则定义
   * @return {Function} 数据类型
   * @see https://vuejs.org/v2/guide/components-props.html#Prop-Casing-camelCase-vs-kebab-case
   */
  function getPropType(prop) {
    if (isFunction(prop)) {
      return prop;
    }

    if (isArray(prop)) {
      return prop[0];
    }

    if (prop && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' && prop.type) {
      return isArray(prop.type) ? prop.type[0] : prop.type;
    }

    return String;
  }

  /**
   * 根据 component props 指定类型对 attribute 进行数据类型转换
   *
   * @param {string} value attribute value
   * @param {Function} type 基本数据类型 String/Number/Boolean/Array/Object
   */
  function convertAttributeValue(value, type) {
    if (type === Boolean) {
      return value !== 'false';
    }

    if (type === Number) {
      return parseFloat(value, 10);
    }

    if (type === String) {
      return value;
    }

    if (type === Array || type === Object) {
      try {
        return jsonParse(value);
      } catch (e) {
        console.warn(value + ' attribute content should be a valid JSON string!');
      }
    }

    return value;
  }

  /**
   * 解析 vue 组件的 props
   *
   * @see https://vuejs.org/v2/guide/components-props.html#Prop-Casing-camelCase-vs-kebab-case
   * @param {Object} component definition
   * @param {Object} props extract props
   */
  function extractProps(def, propTypes) {
    if (isArray(def.props)) {
      def.props.forEach(function (prop) {
        var camelizeName = camelize(prop);
        if (!propTypes[camelizeName]) {
          propTypes[camelizeName] = getPropType(def.props[prop]);
        }
      });
    } else if (_typeof(def.props) === 'object') {
      for (var prop in def.props) {
        var camelizeName = camelize(prop);
        if (!propTypes[camelizeName]) {
          propTypes[camelizeName] = getPropType(def.props[prop]);
        }
      }
    }

    if (def.extends && def.extends.props) {
      extractProps(def.extends, propTypes);
    }

    if (def.mixins) {
      def.mixins.forEach(function (mixin) {
        return extractProps(mixin, propTypes);
      });
    }

    return propTypes;
  }

  // Extract props from component definition, no matter if it's array or object
  function getProps() {
    var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var props = {
      camelCase: [],
      hyphenate: [],
      types: {}
    };

    var propTypes = extractProps(def, {});

    props.camelCase = Object.keys(propTypes);
    props.hyphenate = Object.keys(propTypes).map(function (key) {
      return hyphenate(key);
    });
    props.types = propTypes;

    return props;
  }

  // If we get DOM node of element we could use it like this:
  // document.querySelector('widget-vue1').prop1 < --get prop
  // document.querySelector('widget-vue1').prop1 = 'new Value' < --set prop
  function reactiveProps(element, props) {
    // Handle param attributes
    props.camelCase.forEach(function (name, index) {
      Object.defineProperty(element, name, {
        get: function get$$1() {
          if (element.customElement && element.customElement.vm) {
            return element.customElement.vm[name];
          }
        },
        set: function set$$1(value) {
          var vm = element.customElement && element.customElement.vm;
          if (vm) {
            vm[name] = value;
          }
        }
      });
    });
  }

  // In root Vue instance we should initialize props as 'propsData'.
  function getPropsData(element, componentDefinition, props) {
    var propsData = componentDefinition.propsData || {};
    var dataElement = element.querySelector('script[type*=json]');

    // if there is a script data in custom element
    if (dataElement) {
      var scriptData = void 0;
      try {
        scriptData = jsonParse(dataElement.innerHTML) || {};
      } catch (err) {
        console.warn(dataElement, 'Content should be a valid JSON string!');
        scriptData = {};
      }

      propsData = Object.assign({}, propsData, scriptData);
    }

    // 从 dom 上获取 props data
    props.hyphenate.forEach(function (name, index) {
      var propCamelCase = props.camelCase[index];
      var attrValue = element.getAttribute(name);

      if (attrValue !== null) {
        propsData[propCamelCase] = convertAttributeValue(attrValue, props.types[propCamelCase]);
      } else if (propCamelCase in element) {
        propsData[propCamelCase] = element[propCamelCase];
      }
    });

    return propsData;
  }

  /**
   * @file create vue instance
   * @author sfe
   */

  /**
   * 获取 element 的 slot content，并将 slot content element 从父元素中移除
   * @param {HTMLElement} element slot content 的父元素
   * @param {[Node]>}  Node 数组
   */
  function getNodeSlots(element) {
    var nodeSlots = toArray$1(element.childNodes).map(function (node) {
      element.removeChild(node);
      return node;
    });

    return nodeSlots;
  }

  /**
   * Create new Vue instance
   *
   * @param {HTMLElement} element
   * @param {Vue} Vue
   * @param {Object} componentDefinition
   * @param {Object} props
   */
  function createVueInstance(element, Vue, componentDefinition, props) {
    var ComponentDefinition = Vue.util.extend({}, componentDefinition);
    var propsData = getPropsData(element, ComponentDefinition, props);

    // Auto event handling based on $emit
    function beforeCreate() {
      // eslint-disable-line no-inner-declarations
      // 将 element 挂到 vue 下方便使用
      this.$element = element;

      this.$emit = function emit(eventName) {
        var _viewer$eventAction, _proto__$$emit;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        customEmit.apply(undefined, [element, eventName].concat(args));
        (_viewer$eventAction = viewer.eventAction).execute.apply(_viewer$eventAction, [eventName, element].concat(args));
        this.__proto__ && (_proto__$$emit = this.__proto__.$emit).call.apply(_proto__$$emit, [this, eventName].concat(args)); // eslint-disable-line no-proto
      };

      this.$on = function on(eventName, callback) {
        this.__proto__ && this.__proto__.$on.call(this, eventName, callback); // eslint-disable-line no-proto
        element.customElement.addEventAction(eventName, callback);
      };
    }
    ComponentDefinition.beforeCreate = [].concat(ComponentDefinition.beforeCreate || [], beforeCreate);

    var nodeSlots = getNodeSlots(element);

    element.innerHTML = '<div></div>';

    var rootElement = {
      propsData: propsData,
      props: props.camelCase,
      computed: {
        reactiveProps: function reactiveProps$$1() {
          var _this = this;

          var reactivePropsList = {};
          props.camelCase.forEach(function (prop) {
            reactivePropsList[prop] = _this[prop];
          });

          return reactivePropsList;
        }
      },
      el: element.children[0],
      render: function render(createElement) {
        return createElement(ComponentDefinition, {
          props: this.reactiveProps
        }, nodeSlots);
      }
    };

    reactiveProps(element, props);

    return new Vue(rootElement);
  }

  /**
   * @file util.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // these helpers produces better vm code in JS engines due to their
  // explicitness and function inlining
  function isUndef(v) {
    return v === undefined || v === null;
  }

  function isDef(v) {
    return v !== undefined && v !== null;
  }

  function isTrue(v) {
    return v === true;
  }

  function isFalse(v) {
    return v === false;
  }

  /**
   * Check if value is primitive
   *
   * @param {any} value value
   * @return {boolean} result
   */
  function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  }

  /**
   * Get the raw type string of a value e.g. [object Object]
   */
  var $toString = Object.prototype.toString;

  function toRawType(value) {
    return $toString.call(value).slice(8, -1);
  }

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject$1(obj) {
    return $toString.call(obj) === '[object Object]';
  }

  function isRegExp(v) {
    return $toString.call(v) === '[object RegExp]';
  }

  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
  }

  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString(val) {
    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
  }

  /**
   * Convert a input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? function (val) {
      return map[val.toLowerCase()];
    } : function (val) {
      return map[val];
    };
  }

  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);

  /**
   * Check if a attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

  /**
   * Remove an item from an array
   */
  function remove(arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1);
      }
    }
  }

  /**
   * Check whether the object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }

  /**
   * Create a cached version of a pure function.
   */
  function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  }

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE$1 = /-(\w)/g;
  var camelize$1 = cached(function (str) {
    return str.replace(camelizeRE$1, function (_, c) {
      return c ? c.toUpperCase() : '';
    });
  });

  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate$1 = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
  });

  /**
   * Simple bind, faster than native
   */
  function bind(fn, ctx) {
    function boundFn(a) {
      var l = arguments.length;
      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }
    // record original fn length
    boundFn._length = fn.length;
    return boundFn;
  }

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray$2(list) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret;
  }

  /**
   * Mix properties into target object.
   */
  function extend$1(to, $from) {
    for (var key in $from) {
      to[key] = $from[key];
    }
    return to;
  }

  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend$1(res, arr[i]);
      }
    }
    return res;
  }

  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
   */
  function noop(a, b, c) {}

  /**
   * Always return false.
   */
  var no = function no(a, b, c) {
    return false;
  };

  /**
   * Return same value
   */
  var identity = function identity(_) {
    return _;
  };

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual(a, b) {
    if (a === b) {
      return true;
    }

    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i]);
          });
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key]);
          });
        }
        /* istanbul ignore next */
        return false;
      } catch (e) {
        /* istanbul ignore next */
        return false;
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b);
    } else {
      return false;
    }
  }

  function looseIndexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Ensure a function is called only once.
   */
  function once(fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    };
  }

  /**
   * @file constants.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */
  var SSR_ATTR = 'data-server-rendered';

  var ASSET_TYPES = ['component', 'directive', 'filter'];

  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured'];

  /**
   * @file config.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var config = {

     /**
        * Option merge strategies (used in core/util/options)
        */
     optionMergeStrategies: Object.create(null),

     /**
        * Whether to suppress warnings.
        */
     silent: false,

     /**
        * Show production mode tip message on boot?
        */
     productionTip: "production" !== 'production',

     /**
        * Whether to enable devtools
        */
     devtools: "production" !== 'production',

     /**
        * Whether to record perf
        */
     performance: false,

     /**
        * Error handler for watcher errors
        */
     errorHandler: null,

     /**
        * Warn handler for watcher warns
        */
     warnHandler: null,

     /**
        * Ignore certain custom elements
        */
     ignoredElements: [],

     /**
        * Custom user key aliases for v-on
        */
     keyCodes: Object.create(null),

     /**
        * Check if a tag is reserved so that it cannot be registered as a
        * component. This is platform-dependent and may be overwritten.
        */
     isReservedTag: no,

     /**
        * Check if an attribute is reserved so that it cannot be used as a component
        * prop. This is platform-dependent and may be overwritten.
        */
     isReservedAttr: no,

     /**
        * Check if a tag is an unknown element.
        * Platform-dependent.
        */
     isUnknownElement: no,

     /**
        * Get the namespace of an element
        */
     getTagNamespace: noop,

     /**
      * Parse the real tag name for the specific platform.
      */
     parsePlatformTagName: identity,

     /**
        * Check if an attribute must be bound using property, e.g. value
        * Platform-dependent.
        */
     mustUseProp: no,

     /* eslint-disable */
     /**
      * Exposed for legacy reasons
      */
     _lifecycleHooks: LIFECYCLE_HOOKS
  };

  /**
   * @file lang.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var emptyObject = Object.freeze({});

  /**
   * Check if a string starts with $ or _
   */
  function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F;
  }

  /**
   * Define a property.
   */
  function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  /**
   * Parse simple path.
   */
  var bailRE = /[^\w.$]/;
  function parsePath$1(path) {
    if (bailRE.test(path)) {
      return;
    }

    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) {
          return;
        }

        obj = obj[segments[i]];
      }
      return obj;
    };
  }

  /**
   * @file debug.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var warn = noop;

  /**
   * @file error.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function handleError(err, vm, info) {
    if (vm) {
      var cur = vm;
      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  }

  function globalHandleError(err, vm, info) {

    logError(err, vm, info);
  }

  function logError(err, vm, info) {

    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err;
    }
  }

  /**
   * @file env.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // can we use __proto__?
  var hasProto = '__proto__' in {};

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = UA && UA.indexOf('android') > 0;
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

  // Firefox has a "watch" function on Object.prototype...
  var nativeWatch = {}.watch;

  var supportsPassive$1 = false;
  if (inBrowser) {
    try {
      var opts$1 = {};
      Object.defineProperty(opts$1, 'passive', {
        get: function get$$1() {
          /* istanbul ignore next */
          supportsPassive$1 = true;
        }
      }); // https://github.com/facebook/flow/issues/285
      window.addEventListener('test-passive', null, opts$1);
    } catch (e) {}
  }

  // this needs to be lazy-evaled because Vue may be required before
  // vue-server-renderer can set VUE_ENV
  var $isServer = void 0;
  var isServerRendering = function isServerRendering() {
    if ($isServer === undefined) {
      /* istanbul ignore if */
      if (!inBrowser && typeof global !== 'undefined') {
        // detect presence of vue-server-renderer and avoid
        // Webpack shimming the process
        $isServer = global.process.env.VUE_ENV === 'server';
      } else {
        $isServer = false;
      }
    }

    return $isServer;
  };

  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  /* istanbul ignore next */
  function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
  }

  var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

  /**
   * Defer a task to execute it asynchronously.
   */
  var nextTick = function () {
    var callbacks = [];
    var pending = false;
    var timerFunc = void 0;

    function nextTickHandler() {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      for (var i = 0; i < copies.length; i++) {
        copies[i]();
      }
    }

    // An asynchronous deferring mechanism.
    // In pre 2.4, we used to use microtasks (Promise/MutationObserver)
    // but microtasks actually has too high a priority and fires in between
    // supposedly sequential events (e.g. #4521, #6690) or even between
    // bubbling of the same event (#6566). Technically setImmediate should be
    // the ideal choice, but it's not available everywhere; and the only polyfill
    // that consistently queues the callback after all DOM events triggered in the
    // same loop is by using MessageChannel.

    /* istanbul ignore if */
    if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
      timerFunc = function timerFunc() {
        setImmediate(nextTickHandler);
      };
    } else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')) {
      var channel = new MessageChannel();
      var port = channel.port2;
      channel.port1.onmessage = nextTickHandler;
      timerFunc = function timerFunc() {
        port.postMessage(1);
      };
    } else

      /* istanbul ignore next */
      if (typeof Promise !== 'undefined' && isNative(Promise)) {
        // use microtask in non-DOM environments, e.g. Weex
        var p = Promise.resolve();
        timerFunc = function timerFunc() {
          p.then(nextTickHandler);
        };
      } else {
        // fallback to setTimeout
        timerFunc = function timerFunc() {
          setTimeout(nextTickHandler, 0);
        };
      }

    return function queueNextTick(cb, ctx) {
      var $resolve = void 0;
      callbacks.push(function () {
        if (cb) {
          try {
            cb.call(ctx);
          } catch (e) {
            handleError(e, ctx, 'nextTick');
          }
        } else if ($resolve) {
          $resolve(ctx);
        }
      });
      if (!pending) {
        pending = true;
        timerFunc();
      }

      // $flow-disable-line
      if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve, reject) {
          $resolve = resolve;
        });
      }
    };
  }();

  var $Set = void 0;

  /* istanbul ignore if */ // $flow-disable-line
  if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    $Set = Set;
  } else {
    // a non-standard Set polyfill that only works with primitive keys.
    $Set = function () {
      function Set() {
        classCallCheck(this, Set);

        this.set = Object.create(null);
      }

      createClass(Set, [{
        key: 'has',
        value: function has(key) {
          return this.set[key] === true;
        }
      }, {
        key: 'add',
        value: function add(key) {
          this.set[key] = true;
        }
      }, {
        key: 'clear',
        value: function clear() {
          this.set = Object.create(null);
        }
      }]);
      return Set;
    }();
  }

  /**
   * @file dep.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var uid = 0;

  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */

  var Dep = function () {
    function Dep() {
      classCallCheck(this, Dep);

      this.id = uid++;
      this.subs = [];
    }

    createClass(Dep, [{
      key: 'addSub',
      value: function addSub(sub) {
        this.subs.push(sub);
      }
    }, {
      key: 'removeSub',
      value: function removeSub(sub) {
        remove(this.subs, sub);
      }
    }, {
      key: 'depend',
      value: function depend() {
        if (Dep.target) {
          Dep.target.addDep(this);
        }
      }
    }, {
      key: 'notify',
      value: function notify() {
        // stabilize the subscriber list first
        var subs = this.subs.slice();
        for (var i = 0, l = subs.length; i < l; i++) {
          subs[i].update();
        }
      }
    }]);
    return Dep;
  }();
  Dep.target = null;
  var targetStack = [];

  function pushTarget($target) {
    if (Dep.target) {
      targetStack.push(Dep.target);
    }

    Dep.target = $target;
  }

  function popTarget() {
    Dep.target = targetStack.pop();
  }

  /**
   * @file vnode.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var VNode = function () {
      // rendered in this component's scope

      // component instance
      // component placeholder node

      // strictly internal
      // contains raw HTML? (server only)
      // hoisted static node
      // necessary for enter transition check
      // empty comment placeholder?
      // is a cloned node?
      // is a v-once node?
      // async component factory function

      // real context vm for functional nodes
      // for SSR caching
      // functioanl scope id support

      /* eslint-disable */
      function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
          classCallCheck(this, VNode);

          this.tag = tag;
          this.data = data;
          this.children = children;
          this.text = text;
          this.elm = elm;
          this.ns = undefined;
          this.context = context;
          this.functionalContext = undefined;
          this.functionalOptions = undefined;
          this.functionalScopeId = undefined;
          this.key = data && data.key;
          this.componentOptions = componentOptions;
          this.componentInstance = undefined;
          this.parent = undefined;
          this.raw = false;
          this.isStatic = false;
          this.isRootInsert = true;
          this.isComment = false;
          this.isCloned = false;
          this.isOnce = false;
          this.asyncFactory = asyncFactory;
          this.asyncMeta = undefined;
          this.isAsyncPlaceholder = false;
      }

      // DEPRECATED: alias for componentInstance for backwards compat.

      /* istanbul ignore next */


      createClass(VNode, [{
          key: 'child',
          get: function get$$1() {
              return this.componentInstance;
          }
      }]);
      return VNode;
  }();


  var createEmptyVNode = function createEmptyVNode() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var node = new VNode();
      node.text = text;
      node.isComment = true;
      return node;
  };

  function createTextVNode(val) {
      return new VNode(undefined, undefined, undefined, String(val));
  }

  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode(vnode, deep) {
      var cloned = new VNode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
      cloned.ns = vnode.ns;
      cloned.isStatic = vnode.isStatic;
      cloned.key = vnode.key;
      cloned.isComment = vnode.isComment;
      cloned.isCloned = true;
      if (deep && vnode.children) {
          cloned.children = cloneVNodes(vnode.children);
      }

      return cloned;
  }

  function cloneVNodes(vnodes, deep) {
      var len = vnodes.length;
      var res = new Array(len);
      for (var i = 0; i < len; i++) {
          res[i] = cloneVNode(vnodes[i], deep);
      }
      return res;
  }

  /**
   * @file array.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto)

  /**
   * Intercept mutating methods and emit events
   */;
  ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted = void 0;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }
      if (inserted) {
        ob.observeArray(inserted);
      }

      // notify change
      ob.dep.notify();
      return result;
    });
  });

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

  /**
   * By default, when a reactive property is set, the new value is
   * also converted to become reactive. However when passing down props,
   * we don't want to force conversion because the value may be a nested value
   * under a frozen data structure. Converting it would defeat the optimization.
   */
  var observerState = {
    shouldConvert: true

    /**
     * Observer class that are attached to each observed
     * object. Once attached, the observer converts target
     * object's property keys into getter/setters that
     * collect dependencies and dispatches updates.
     */
  };var Observer = function () {
    // number of vms that has this object as root $data

    function Observer(value) {
      classCallCheck(this, Observer);

      this.value = value;
      this.dep = new Dep();
      this.vmCount = 0;
      def(value, '__ob__', this);
      if (Array.isArray(value)) {
        var augment = hasProto ? protoAugment : copyAugment;
        augment(value, arrayMethods, arrayKeys);
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    /**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */


    createClass(Observer, [{
      key: 'walk',
      value: function walk(obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
          defineReactive$$1(obj, keys[i], obj[keys[i]]);
        }
      }

      /**
       * Observe a list of Array items.
       */

    }, {
      key: 'observeArray',
      value: function observeArray(items) {
        for (var i = 0, l = items.length; i < l; i++) {
          observe(items[i]);
        }
      }
    }]);
    return Observer;
  }();

  // helpers

  /**
   * Augment an target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment(target, src, keys) {
    /* eslint-disable no-proto */
    target.__proto__ = src;

    /* eslint-enable no-proto */
  }

  /**
   * Augment an target Object or Array by defining
   * hidden properties.
   */

  /* istanbul ignore next */
  function copyAugment(target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe(value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return;
    }

    var ob = void 0;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (observerState.shouldConvert && !isServerRendering() && (Array.isArray(value) || isPlainObject$1(value)) && Object.isExtensible(value) && !value._isVue) {
      ob = new Observer(value);
    }

    if (asRootData && ob) {
      ob.vmCount++;
    }

    return ob;
  }

  /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1(obj, key, val, customSetter, shallow) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return;
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }

        return value;
      },
      set: function reactiveSetter(newVal) {
        var value = getter ? getter.call(obj) : val;

        /* eslint-disable no-self-compare */
        if (newVal === value || newVal !== newVal && value !== value) {
          return;
        }

        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set$1(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }

    if (hasOwn(target, key)) {
      target[key] = val;
      return val;
    }

    var ob = target.__ob__;
    if (target._isVue || ob && ob.vmCount) {
      return val;
    }

    if (!ob) {
      target[key] = val;
      return val;
    }

    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val;
  }

  /**
   * Delete a property and trigger change if necessary.
   */
  function del$1(target, key) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1);
      return;
    }

    var ob = target.__ob__;
    if (target._isVue || ob && ob.vmCount) {
      return;
    }

    if (!hasOwn(target, key)) {
      return;
    }

    delete target[key];
    if (!ob) {
      return;
    }

    ob.dep.notify();
  }

  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray(value) {
    for (var e, i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }

  /**
   * @file options.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;

  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData(to, from) {
    if (!from) {
      return to;
    }

    var key = void 0;
    var toVal = void 0;
    var fromVal = void 0;
    var keys = Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set$1(to, key, fromVal);
      } else if (isPlainObject$1(toVal) && isPlainObject$1(fromVal)) {
        mergeData(toVal, fromVal);
      }
    }
    return to;
  }

  /**
   * Data
   */
  function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal;
      }

      if (!parentVal) {
        return childVal;
      }

      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn() {
        return mergeData(typeof childVal === 'function' ? childVal.call(this) : childVal, typeof parentVal === 'function' ? parentVal.call(this) : parentVal);
      };
    } else if (parentVal || childVal) {
      return function mergedInstanceDataFn() {
        // instance merge
        var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
        var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData);
        }
        return defaultData;
      };
    }
  }

  strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {

        return parentVal;
      }

      return mergeDataOrFn.call(this, parentVal, childVal);
    }

    return mergeDataOrFn(parentVal, childVal, vm);
  };

  /**
   * Hooks and props are merged as arrays.
   */
  function mergeHook(parentVal, childVal) {
    return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets(parentVal, childVal, vm, key) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      return extend$1(res, childVal);
    }
    return res;
  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (parentVal, childVal, vm, key) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) {
      parentVal = undefined;
    }

    if (childVal === nativeWatch) {
      childVal = undefined;
    }

    /* istanbul ignore if */
    if (!childVal) {
      return Object.create(parentVal || null);
    }

    if (!parentVal) {
      return childVal;
    }

    var ret = {};
    extend$1(ret, parentVal);
    for (var _key in childVal) {
      var parent = ret[_key];
      var child = childVal[_key];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }

      ret[_key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
    }
    return ret;
  };

  /**
   * Other object hashes.
   */
  strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
    if (childVal && "production" !== 'production') {
      assertObjectType(key, childVal, vm);
    }

    if (!parentVal) {
      return childVal;
    }

    var ret = Object.create(null);
    extend$1(ret, parentVal);
    if (childVal) {
      extend$1(ret, childVal);
    }

    return ret;
  };
  strats.provide = mergeDataOrFn;

  /**
   * Default strategy.
   */
  function defaultStrat(parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
  }

  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps(options, vm) {
    var props = options.props;
    if (!props) {
      return;
    }

    var res = {};
    var i = void 0;
    var val = void 0;
    var name = void 0;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize$1(val);
          res[name] = {
            type: null
          };
        }
      }
    } else if (isPlainObject$1(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize$1(key);
        res[name] = isPlainObject$1(val) ? val : {
          type: val
        };
      }
    }

    options.props = res;
  }

  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject(options, vm) {
    var inject = options.inject;
    var normalized = options.inject = {};
    if (Array.isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = {
          from: inject[i]
        };
      }
    } else if (isPlainObject$1(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject$1(val) ? extend$1({
          from: key
        }, val) : {
          from: val
        };
      }
    }
  }

  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives(options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def = dirs[key];
        if (typeof def === 'function') {
          dirs[key] = { bind: def, update: def };
        }
      }
    }
  }

  function assertObjectType(name, value, vm) {
    if (!isPlainObject$1(value)) {
      warn('Invalid value for option "' + name + '": expected an Object, ' + ('but got ' + toRawType(value) + '.'), vm);
    }
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions(parent, child, vm) {

    if (typeof child === 'function') {
      child = child.options;
    }

    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives(child);
    var extendsFrom = child.extends;
    if (extendsFrom) {
      parent = mergeOptions(parent, extendsFrom, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }

    var options = {};
    var key = void 0;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField(key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset(options, type, id, warnMissing) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return;
    }

    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) {
      return assets[id];
    }

    var camelizedId = camelize$1(id);
    if (hasOwn(assets, camelizedId)) {
      return assets[camelizedId];
    }

    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) {
      return assets[PascalCaseId];
    }

    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

    return res;
  }

  /**
   * @file props.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function validateProp(key, propOptions, propsData, vm) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // handle boolean props
    if (isType(Boolean, prop.type)) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (!isType(String, prop.type) && (value === '' || value === hyphenate$1(key))) {
        value = true;
      }
    }

    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      // since the default value is a fresh copy,
      // make sure to observe it.
      var prevShouldConvert = observerState.shouldConvert;
      observerState.shouldConvert = true;
      observe(value);
      observerState.shouldConvert = prevShouldConvert;
    }

    return value;
  }

  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue(vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined;
    }

    var def = prop.default;

    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
      return vm._props[key];
    }

    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
  }

  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType(fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : '';
  }

  function isType(type, fn) {
    if (!Array.isArray(fn)) {
      return getType(fn) === getType(type);
    }

    for (var i = 0, len = fn.length; i < len; i++) {
      if (getType(fn[i]) === getType(type)) {
        return true;
      }
    }

    /* istanbul ignore next */
    return false;
  }

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * @file proxy.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * @file perf.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * @file update-listeners.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var normalizeEvent = cached(function (name) {
    var passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name: name,
      once: once$$1,
      capture: capture,
      passive: passive
    };
  });

  function createFnInvoker(fns) {
    function invoker() {
      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        var cloned = fns.slice();
        for (var i = 0; i < cloned.length; i++) {
          cloned[i].apply(null, arguments);
        }
      } else {
        // return handler return value for single handlers
        return fns.apply(null, arguments);
      }
    }
    invoker.fns = fns;
    return invoker;
  }

  function updateListeners(on, oldOn, add, remove$$1, vm) {
    var name = void 0;
    var cur = void 0;
    var old = void 0;
    var event = void 0;
    for (name in on) {
      cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) ; else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur);
        }

        add(event.name, cur, event.once, event.capture, event.passive);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }

  /**
   * @file merge-hook.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function mergeVNodeHook(def, hookKey, hook) {
    var invoker = void 0;
    var oldHook = def[hookKey];
    function wrappedHook() {
      hook.apply(this, arguments);
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook);
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook]);
    } else {
      /* istanbul ignore if */
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        // already a merged invoker
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }

    invoker.merged = true;
    def[hookKey] = invoker;
  }

  /**
   * @file extract-props.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function extractPropsFromVNodeData(data, Ctor, tag) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return;
    }

    var res = {};
    var attrs = data.attrs,
        props = data.props;

    if (isDef(attrs) || isDef(props)) {
      for (var key in propOptions) {
        var altKey = hyphenate$1(key);

        checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
      }
    }

    return res;
  }

  function checkProp(res, hash, key, altKey, preserve) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }

        return true;
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }

        return true;
      }
    }

    return false;
  }

  /**
   * @file normalize-children.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:

  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children);
      }
    }
    return children;
  }

  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren(children) {
    return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
  }

  function isTextNode(node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
  }

  function normalizeArrayChildren(children, nestedIndex) {
    var res = [];
    var i = void 0;
    var c = void 0;
    var lastIndex = void 0;
    var last = void 0;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === 'boolean') {
        continue;
      }

      lastIndex = res.length - 1;
      last = res[lastIndex];
      //  nested
      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, (nestedIndex || '') + '_' + i);
          // merge adjacent text nodes
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + c[0].text);
            c.shift();
          }

          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          // merge adjacent text nodes
          // this is necessary for SSR hydration because text nodes are
          // essentially merged when rendered to HTML strings
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          // merge adjacent text nodes
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
            c.key = '__vlist' + nestedIndex + '_' + i + '__';
          }

          res.push(c);
        }
      }
    }
    return res;
  }

  /**
   * @file resolve-async-component.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function ensureCtor(comp, base) {
    if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
      comp = comp.default;
    }

    return isObject(comp) ? base.extend(comp) : comp;
  }

  function createAsyncPlaceholder(factory, data, context, children, tag) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
    return node;
  }

  function resolveAsyncComponent(factory, baseCtor, context) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp;
    }

    if (isDef(factory.resolved)) {
      return factory.resolved;
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp;
    }

    if (isDef(factory.contexts)) {
      // already pending
      factory.contexts.push(context);
    } else {
      var contexts = factory.contexts = [context];
      var sync = true;

      var forceRender = function forceRender() {
        for (var i = 0, l = contexts.length; i < l; i++) {
          contexts[i].$forceUpdate();
        }
      };

      var resolve = once(function (res) {
        // cache resolved
        factory.resolved = ensureCtor(res, baseCtor);
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          forceRender();
        }
      });

      var reject = once(function (reason) {
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender();
        }
      });

      var res = factory(resolve, reject);

      if (isObject(res)) {
        if (typeof res.then === 'function') {
          // () => Promise
          if (isUndef(factory.resolved)) {
            res.then(resolve, reject);
          }
        } else if (isDef(res.component) && typeof res.component.then === 'function') {
          res.component.then(resolve, reject);

          if (isDef(res.error)) {
            factory.errorComp = ensureCtor(res.error, baseCtor);
          }

          if (isDef(res.loading)) {
            factory.loadingComp = ensureCtor(res.loading, baseCtor);
            if (res.delay === 0) {
              factory.loading = true;
            } else {
              setTimeout(function () {
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender();
                }
              }, res.delay || 200);
            }
          }

          if (isDef(res.timeout)) {
            setTimeout(function () {
              if (isUndef(factory.resolved)) {
                reject(null);
              }
            }, res.timeout);
          }
        }
      }

      sync = false;
      // return in case resolved synchronously
      return factory.loading ? factory.loadingComp : factory.resolved;
    }
  }

  /**
   * @file is-async-placeholder.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function isAsyncPlaceholder(node) {
    return node.isComment && node.asyncFactory;
  }

  /**
   * @file get-first-component-child.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function getFirstComponentChild(children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c;
        }
      }
    }
  }

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * @file events.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function initEvents(vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }

  var target = void 0;

  function add(event, fn, once$$1) {
    if (once$$1) {
      target.$once(event, fn);
    } else {
      target.$on(event, fn);
    }
  }

  function remove$1(event, fn) {
    target.$off(event, fn);
  }

  function updateComponentListeners(vm, listeners, oldListeners) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  }

  function eventsMixin(Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          this.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm;
    };

    Vue.prototype.$once = function (event, fn) {
      var vm = this;
      function on() {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm;
    };

    Vue.prototype.$off = function (event, fn) {
      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm;
      }

      // array of events
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          this.$off(event[i], fn);
        }
        return vm;
      }

      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm;
      }

      if (arguments.length === 1) {
        vm._events[event] = null;
        return vm;
      }

      if (fn) {
        // specific handler
        var cb = void 0;
        var _i = cbs.length;
        while (_i--) {
          cb = cbs[_i];
          if (cb === fn || cb.fn === fn) {
            cbs.splice(_i, 1);
            break;
          }
        }
      }

      return vm;
    };

    Vue.prototype.$emit = function (event) {
      var vm = this;

      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray$2(cbs) : cbs;
        var args = toArray$2(arguments, 1);
        for (var i = 0, l = cbs.length; i < l; i++) {
          try {
            cbs[i].apply(vm, args);
          } catch (e) {
            handleError(e, vm, 'event handler for "' + event + '"');
          }
        }
      }

      return vm;
    };
  }

  /**
   * @file resolve-slots.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots(children, context) {
    var slots = {};
    if (!children) {
      return slots;
    }

    return children[0] instanceof Node ? resolveNodeSlots(children, context) : resolveVNodeSlots(children, context);
  }

  function resolveVNodeSlots(children, context) {
    var slots = {};

    var defaultSlot = [];
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }

      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.functionalContext === context) && data && data.slot != null) {
        var name = child.data.slot;
        var slot = slots[name] || (slots[name] = []);
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children);
        } else {
          slot.push(child);
        }
      } else {
        defaultSlot.push(child);
      }
    }
    // ignore whitespace
    if (!defaultSlot.every(isWhitespace)) {
      slots.default = defaultSlot;
    }

    return slots;
  }

  // mip patch: 支持传入 Node 节点
  function resolveNodeSlots(children, context) {
    var slots = {};

    var defaultSlot = [];
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var name = child.getAttribute && child.getAttribute('slot');

      if (name) {
        var slot = slots[name] || (slots[name] = []);
        if (child.tagName === 'TEMPLATE') {
          slot.push.apply(slot, child.content.childNodes);
        } else {
          slot.push(child);
        }
        child.removeAttribute('slot');
      } else {
        defaultSlot.push(child);
      }
    }

    slots.default = defaultSlot;

    return slots;
  }

  function isWhitespace(node) {
    return node.isComment || node.text === ' ';
  }

  function resolveScopedSlots(fns, // see flow/vnode
  res) {
    res = res || {};
    for (var i = 0; i < fns.length; i++) {
      if (Array.isArray(fns[i])) {
        resolveScopedSlots(fns[i], res);
      } else {
        res[fns[i].key] = fns[i].fn;
      }
    }
    return res;
  }

  /**
   * @file lifecycle.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var activeInstance = null;

  function initLifecycle(vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate');
      }

      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var prevActiveInstance = activeInstance;
      activeInstance = vm;
      vm._vnode = vnode;
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false,
        // removeOnly,
        vm.$options._parentElm, vm.$options._refElm);
        // no need for the ref nodes after initial patch
        // this prevents keeping a detached DOM tree in memory (#5851)
        vm.$options._parentElm = vm.$options._refElm = null;
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      activeInstance = prevActiveInstance;
      // update __vue__ reference
      if (prevEl) {
        prevEl.__vue__ = null;
      }

      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }

      // if parent is an HOC, update its $el as well
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }

      // updated hook is called by the scheduler to ensure that children are
      // updated in a parent's updated hook.
    };

    Vue.prototype.$forceUpdate = function () {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };

    Vue.prototype.$destroy = function () {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return;
      }

      callHook(vm, 'beforeDestroy');
      vm._isBeingDestroyed = true;
      // remove self from parent
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }

      // teardown watchers
      if (vm._watcher) {
        vm._watcher.teardown();
      }

      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }

      // call the last hook...
      vm._isDestroyed = true;
      // invoke destroy hooks on current rendered tree
      vm.__patch__(vm._vnode, null);
      // fire destroyed hook
      callHook(vm, 'destroyed');
      // turn off all instance listeners.
      vm.$off();
      // remove __vue__ reference
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }

      // release circular reference (#6759)
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }

  function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
    }

    callHook(vm, 'beforeMount');

    var updateComponent = void 0;

    /* istanbul ignore if */
    {
      updateComponent = function updateComponent() {
        vm._update(vm._render(), hydrating);
      };
    }

    vm._watcher = new Watcher(vm, updateComponent, noop);
    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }

    return vm;
  }

  function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {

    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren
    var hasChildren = !!(renderChildren || // has new static slots
    vm.$options._renderChildren || // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render

    if (vm._vnode) {
      // update child tree's parent
      vm._vnode.parent = parentVnode;
    }

    vm.$options._renderChildren = renderChildren;

    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    vm.$attrs = parentVnode.data && parentVnode.data.attrs || emptyObject;
    vm.$listeners = listeners || emptyObject;

    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      var props = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        props[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      // keep a copy of raw propsData
      vm.$options.propsData = propsData;
    }

    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, oldListeners);
    }

    // resolve slots + force update if has children
    // mip-patch:
    // 如果 renderChildren 的元素是 Node 表明是 mip 组件的 slot，
    // 不需要重新更新 slot, vue 的 renderChildren 元素是 VNode
    if (hasChildren && !(renderChildren && renderChildren[0] instanceof Node)) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  }

  function isInInactiveTree(vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) {
        return true;
      }
    }
    return false;
  }

  function activateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return;
      }
    } else if (vm._directInactive) {
      return;
    }

    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'activated');
    }
  }

  function deactivateChildComponent(vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return;
      }
    }

    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }

  function callHook(vm, hook) {
    var handlers = vm.$options[hook];

    if (hook === 'beforeMount') {
      var asyncDataHandler = vm.$options.asyncData;
      var syncDataHandler = vm.$options.syncData;
      if (asyncDataHandler) {
        asyncDataHandler.call(vm);
      }

      if (syncDataHandler) {
        syncDataHandler.call(vm);
      }
    }

    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        try {
          handlers[i].call(vm);
        } catch (e) {
          handleError(e, vm, hook + ' hook');
        }
      }
    }

    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
  }

  /**
   * @file scheduler.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var queue = [];
  var activatedChildren = [];
  var has = {};
  var waiting = false;
  var flushing = false;
  var index = 0;

  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState() {
    index = queue.length = activatedChildren.length = 0;
    has = {};

    waiting = flushing = false;
  }

  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue() {
    flushing = true;
    var watcher = void 0;
    var id = void 0;

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) {
      return a.id - b.id;
    });

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      id = watcher.id;
      has[id] = null;
      watcher.run();
    }

    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);

    // devtool hook

    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }

  function callUpdatedHooks(queue) {
    var i = queue.length;
    while (i--) {
      var watcher = queue[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted) {
        callHook(vm, 'updated');
      }
    }
  }

  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent(vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
  }

  function callActivatedHooks(queue) {
    for (var i = 0; i < queue.length; i++) {
      queue[i]._inactive = true;
      activateChildComponent(queue[i], true
      // true
      );
    }
  }

  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
        waiting = true;
        nextTick(flushSchedulerQueue);
      }
    }
  }

  /**
   * @file watcher.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var uid$1 = 0;

  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */

  var Watcher = function () {
    function Watcher(vm, expOrFn, cb, options) {
      classCallCheck(this, Watcher);

      this.vm = vm;
      vm._watchers.push(this);
      // options
      if (options) {
        this.deep = !!options.deep;
        this.user = !!options.user;
        this.lazy = !!options.lazy;
        this.sync = !!options.sync;
      } else {
        this.deep = this.user = this.lazy = this.sync = false;
      }
      this.cb = cb;
      this.id = ++uid$1; // uid for batching
      this.active = true;
      this.dirty = this.lazy; // for lazy watchers
      this.deps = [];
      this.newDeps = [];
      this.depIds = new $Set();
      this.newDepIds = new $Set();
      this.expression = '';
      // parse expression for getter
      if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
      } else {
        this.getter = parsePath$1(expOrFn);
        if (!this.getter) {
          this.getter = function () {};
        }
      }
      this.value = this.lazy ? undefined : this.get();
    }

    /**
     * Evaluate the getter, and re-collect dependencies.
     */


    createClass(Watcher, [{
      key: 'get',
      value: function get$$1() {
        pushTarget(this);
        var value = void 0;
        var vm = this.vm;
        try {
          value = this.getter.call(vm, vm);
        } catch (e) {
          if (this.user) {
            handleError(e, vm, 'getter for watcher "' + this.expression + '"');
          } else {
            throw e;
          }
        } finally {
          // "touch" every property so they are all tracked as
          // dependencies for deep watching
          if (this.deep) {
            traverse(value);
          }

          popTarget();
          this.cleanupDeps();
        }
        return value;
      }

      /**
       * Add a dependency to this directive.
       */

    }, {
      key: 'addDep',
      value: function addDep(dep) {
        var id = dep.id;
        if (!this.newDepIds.has(id)) {
          this.newDepIds.add(id);
          this.newDeps.push(dep);
          if (!this.depIds.has(id)) {
            dep.addSub(this);
          }
        }
      }

      /**
       * Clean up for dependency collection.
       */

    }, {
      key: 'cleanupDeps',
      value: function cleanupDeps() {
        var i = this.deps.length;
        while (i--) {
          var dep = this.deps[i];
          if (!this.newDepIds.has(dep.id)) {
            dep.removeSub(this);
          }
        }
        var tmp = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = tmp;
        this.newDepIds.clear();
        tmp = this.deps;
        this.deps = this.newDeps;
        this.newDeps = tmp;
        this.newDeps.length = 0;
      }

      /**
       * Subscriber interface.
       * Will be called when a dependency changes.
       */

    }, {
      key: 'update',
      value: function update() {
        /* istanbul ignore else */
        if (this.lazy) {
          this.dirty = true;
        } else if (this.sync) {
          this.run();
        } else {
          queueWatcher(this);
        }
      }

      /**
       * Scheduler job interface.
       * Will be called by the scheduler.
       */

    }, {
      key: 'run',
      value: function run() {
        if (this.active) {
          var value = this.get();
          if (value !== this.value ||
          // Deep watchers and watchers on Object/Arrays should fire even
          // when the value is the same, because the value may
          // have mutated.
          isObject(value) || this.deep) {
            // set new value
            var oldValue = this.value;
            this.value = value;
            if (this.user) {
              try {
                this.cb.call(this.vm, value, oldValue);
              } catch (e) {
                handleError(e, this.vm, 'callback for watcher "' + this.expression + '"');
              }
            } else {
              this.cb.call(this.vm, value, oldValue);
            }
          }
        }
      }

      /**
       * Evaluate the value of the watcher.
       * This only gets called for lazy watchers.
       */

    }, {
      key: 'evaluate',
      value: function evaluate() {
        this.value = this.get();
        this.dirty = false;
      }

      /**
       * Depend on all deps collected by this watcher.
       */

    }, {
      key: 'depend',
      value: function depend() {
        var i = this.deps.length;
        while (i--) {
          this.deps[i].depend();
        }
      }

      /**
       * Remove self from all dependencies' subscriber list.
       */

    }, {
      key: 'teardown',
      value: function teardown() {
        if (this.active) {
          // remove self from vm's watcher list
          // this is a somewhat expensive operation so we skip it
          // if the vm is being destroyed.
          if (!this.vm._isBeingDestroyed) {
            remove(this.vm._watchers, this);
          }

          var i = this.deps.length;
          while (i--) {
            this.deps[i].removeSub(this);
          }
          this.active = false;
        }
      }
    }]);
    return Watcher;
  }();
  var seenObjects = new $Set();
  function traverse(val) {
    seenObjects.clear();
    $traverse(val, seenObjects);
  }

  function $traverse(val, seen) {
    var i = void 0;
    var keys = void 0;
    var isA = Array.isArray(val);
    if (!isA && !isObject(val) || !Object.isExtensible(val)) {
      return;
    }

    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      }

      seen.add(depId);
    }

    if (isA) {
      i = val.length;
      while (i--) {
        $traverse(val[i], seen);
      }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) {
        $traverse(val[keys[i]], seen);
      }
    }
  }

  /**
   * @file state.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
      return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function initState(vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) {
      initProps(vm, opts.props);
    }

    if (opts.methods) {
      initMethods(vm, opts.methods);
    }

    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true
      // asRootData
      );
    }
    if (opts.computed) {
      initComputed(vm, opts.computed);
    }

    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

  function initProps(vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    observerState.shouldConvert = isRoot;

    var _loop = function _loop(key) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);

      /* istanbul ignore else */
      {
        defineReactive$$1(props, key, value);
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, '_props', key);
      }
    };

    for (var key in propsOptions) {
      _loop(key);
    }
    observerState.shouldConvert = true;
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};
    if (!isPlainObject$1(data)) {
      data = {};
    }

    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];

      if (props && hasOwn(props, key)) ; else if (!isReserved(key)) {
        proxy(vm, '_data', key);
      }
    }
    // observe data
    observe(data, true
    // asRootData
    );
  }

  function getData(data, vm) {
    try {
      return data.call(vm, vm);
    } catch (e) {
      handleError(e, vm, 'data()');
      return {};
    }
  }

  var computedWatcherOptions = {
    lazy: true
  };

  function initComputed(vm, computed) {
    var watchers = vm._computedWatchers = Object.create(null);
    // computed properties are just getters during SSR
    var isSSR = isServerRendering();

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;

      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
      }

      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      }
    }
  }

  function defineComputed(target, key, userDef) {
    var shouldCache = !isServerRendering();
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : userDef;
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
      sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
    }

    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter(key) {
    return function computedGetter() {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }

        if (Dep.target) {
          watcher.depend();
        }

        return watcher.value;
      }
    };
  }

  function initMethods(vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {

      vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    }
  }

  function initWatch(vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher(vm, keyOrFn, handler, options) {
    if (isPlainObject$1(handler)) {
      options = handler;
      handler = handler.handler;
    }

    if (typeof handler === 'string') {
      handler = vm[handler];
    }

    return vm.$watch(keyOrFn, handler, options);
  }

  function stateMixin(Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    var propsDef = {};
    dataDef.get = function () {
      return this._data;
    };
    propsDef.get = function () {
      return this._props;
    };

    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set$1;
    Vue.prototype.$delete = del$1;

    Vue.prototype.$watch = function (expOrFn, cb, options) {
      var vm = this;
      if (isPlainObject$1(cb)) {
        return createWatcher(vm, expOrFn, cb, options);
      }

      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        cb.call(vm, watcher.value);
      }

      return function unwatchFn() {
        watcher.teardown();
      };
    };
  }

  /**
   * @file inject.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function initProvide(vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
    }
  }

  function initInjections(vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      observerState.shouldConvert = false;
      Object.keys(result).forEach(function (key) {
        /* istanbul ignore else */
        {
          defineReactive$$1(vm, key, result[key]);
        }
      });
      observerState.shouldConvert = true;
    }
  }

  function resolveInject(inject, vm) {
    if (inject) {
      // inject is :any because flow is not smart enough to figure out cached
      var result = Object.create(null);
      var keys = hasSymbol ? Reflect.ownKeys(inject).filter(function (key) {
        return Object.getOwnPropertyDescriptor(inject, key).enumerable;
      }) : Object.keys(inject);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var provideKey = inject[key].from;
        var source = vm;
        while (source) {
          if (source._provided && provideKey in source._provided) {
            result[key] = source._provided[provideKey];
            break;
          }

          source = source.$parent;
        }
        if (!source) {
          if ('default' in inject[key]) {
            var provideDefault = inject[key].default;
            result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
          }
        }
      }
      return result;
    }
  }

  /**
   * @file render-list.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList(val, render) {
    var ret = void 0;
    var i = void 0;
    var l = void 0;
    var keys = void 0;
    var key = void 0;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }

    if (isDef(ret)) {
      ret._isVList = true;
    }

    return ret;
  }

  /**
   * @file render-slot.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot(name, fallback, props, bindObject) {
    var scopedSlotFn = this.$scopedSlots[name];
    if (scopedSlotFn) {
      // scoped slot
      props = props || {};
      if (bindObject) {

        props = extend$1(extend$1({}, bindObject), props);
      }

      return scopedSlotFn(props) || fallback;
    }
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn('Duplicate presence of slot "' + name + '" found in the same render tree ' + '- this will likely cause render errors.', this);
      slotNodes._rendered = true;
    }

    return slotNodes || fallback;
  }

  /**
   * @file resolve-filter.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter(id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity;
  }

  /**
   * @file check-keycodes.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Runtime helper for checking keyCodes from config.
   * exposed as Vue.prototype._k
   * passing in eventKeyName as last argument separately for backwards compat
   */
  function checkKeyCodes(eventKeyCode, key, builtInAlias, eventKeyName) {
    var keyCodes = config.keyCodes[key] || builtInAlias;
    if (keyCodes) {
      if (Array.isArray(keyCodes)) {
        return keyCodes.indexOf(eventKeyCode) === -1;
      }
      return keyCodes !== eventKeyCode;
    } else if (eventKeyName) {
      return hyphenate$1(eventKeyName) !== key;
    }
  }

  /**
   * @file bind-object-props.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps(data, tag, value, asProp, isSync) {
    if (value) {
      if (!isObject(value)) ; else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }

        var hash = void 0;

        var _loop = function _loop(key) {
          if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
          }
          if (!(key in hash)) {
            hash[key] = value[key];
            if (isSync) {
              var on = data.on || (data.on = {});
              on['update:' + key] = function ($event) {
                value[key] = $event;
              };
            }
          }
        };

        for (var key in value) {
          _loop(key);
        }
      }
    }

    return data;
  }

  /**
   * @file render-static.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic(index, isInFor) {
    // static trees can be rendered once and cached on the contructor options
    // so every instance shares the same cached trees
    var renderFns = this.$options.staticRenderFns;
    var cached = renderFns.cached || (renderFns.cached = []);
    var tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree) ? cloneVNodes(tree) : cloneVNode(tree);
    }

    // otherwise, render a fresh tree.
    tree = cached[index] = renderFns[index].call(this._renderProxy, null, this);
    markStatic(tree, '__static__' + index, false);
    return tree;
  }

  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce(tree, index, key) {
    markStatic(tree, '__once__' + index + (key ? '_' + key : ''), true);
    return tree;
  }

  function markStatic(tree, key, isOnce) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], key + '_' + i, isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode(node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  /**
   * @file bind-object-listeners.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function bindObjectListeners(data, value) {
    if (value) {
      if (!isPlainObject$1(value)) ; else {
        var on = data.on = data.on ? extend$1({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(ours, existing) : ours;
        }
      }
    }

    return data;
  }

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function installRenderHelpers(target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
  }

  /**
   * @file create-functional-component.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function FunctionalRenderContext(data, props, children, parent, Ctor) {
    var options = Ctor.options;
    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function () {
      return resolveSlots(children, parent);
    };

    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var contextVm = Object.create(parent);
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;

    // support for compiled functional template
    if (isCompiled) {
      // exposing $options for renderStatic()
      this.$options = options;
      // pre-resolve slots for renderSlot()
      this.$slots = this.slots();
      this.$scopedSlots = data.scopedSlots || emptyObject;
    }

    if (options._scopeId) {
      this._c = function (a, b, c, d) {
        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
        if (vnode) {
          vnode.functionalScopeId = options._scopeId;
          vnode.functionalContext = parent;
        }

        return vnode;
      };
    } else {
      this._c = function (a, b, c, d) {
        return createElement(contextVm, a, b, c, d, needNormalization);
      };
    }
  }

  installRenderHelpers(FunctionalRenderContext.prototype);

  function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
    var options = Ctor.options;
    var props = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs)) {
        mergeProps(props, data.attrs);
      }

      if (isDef(data.props)) {
        mergeProps(props, data.props);
      }
    }

    var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);

    var vnode = options.render.call(null, renderContext._c, renderContext);

    if (vnode instanceof VNode) {
      vnode.functionalContext = contextVm;
      vnode.functionalOptions = options;
      if (data.slot) {
        (vnode.data || (vnode.data = {})).slot = data.slot;
      }
    }

    return vnode;
  }

  function mergeProps(to, from) {
    for (var key in from) {
      to[camelize$1(key)] = from[key];
    }
  }

  /**
   * @file create-component.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
    init: function init(vnode, hydrating, parentElm, refElm) {
      if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
        var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance, parentElm, refElm);
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      } else if (vnode.data.keepAlive) {
        // kept-alive components, treat as a patch
        var mountedNode = vnode; // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      }
    },
    prepatch: function prepatch(oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(child, options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
      );
    },
    insert: function insert(vnode) {
      var context = vnode.context,
          componentInstance = vnode.componentInstance;

      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook(componentInstance, 'mounted');
      }

      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          // vue-router#1212
          // During updates, a kept-alive component's child components may
          // change, so directly walking the tree here may call activated hooks
          // on incorrect children. Instead we push them into a queue which will
          // be processed after the whole patch process ended.
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true
          // direct
          );
        }
      }
    },
    destroy: function destroy(vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true
          // direct
          );
        }
      }
    }
  };

  var hooksToMerge = Object.keys(componentVNodeHooks);

  function createComponent(Ctor, data, context, children, tag, childNodes) {
    if (isUndef(Ctor)) {
      return;
    }

    var baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {

      return;
    }

    // async component
    var asyncFactory = void 0;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
      if (Ctor === undefined) {
        // return a placeholder node for async component, which is rendered
        // as a comment node but preserves all the raw information for the node.
        // the information will be used for async server-rendering and hydration.
        return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
      }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);

    // transform component v-model data into props & events
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }

    // extract props
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);

    // functional component
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children);
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
      // abstract components do not keep anything
      // other than props & listeners & slot

      // work around flow
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }

    // merge component management hooks onto the placeholder node
    mergeHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode('vue-component-' + Ctor.cid + (name ? '-' + name : ''), data, undefined, undefined, undefined, context, { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children, childNodes: childNodes }, asyncFactory);
    return vnode;
  }

  function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm, refElm) {
    var vnodeComponentOptions = vnode.componentOptions;
    var options = {
      _isComponent: true,
      parent: parent,
      propsData: vnodeComponentOptions.propsData,
      _componentTag: vnodeComponentOptions.tag,
      _parentVnode: vnode,
      _parentListeners: vnodeComponentOptions.listeners,
      _renderChildren: vnodeComponentOptions.children,
      _parentElm: parentElm || null,
      _refElm: refElm || null
      // check inline-template render functions
    };var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }

    return new vnodeComponentOptions.Ctor(options);
  }

  function mergeHooks(data) {
    if (!data.hook) {
      data.hook = {};
    }

    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var fromParent = data.hook[key];
      var ours = componentVNodeHooks[key];
      data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
    }
  }

  function mergeHook$1(one, two) {
    return function (a, b, c, d) {
      one(a, b, c, d);
      two(a, b, c, d);
    };
  }

  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel(options, data) {
    var prop = options.model && options.model.prop || 'value';
    var event = options.model && options.model.event || 'input';
    (data.props || (data.props = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    if (isDef(on[event])) {
      on[event] = [data.model.callback].concat(on[event]);
    } else {
      on[event] = data.model.callback;
    }
  }

  /**
   * @file create-element.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;

  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }

    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }

    return $createElement(context, tag, data, children, normalizationType);
  }

  function $createElement(context, tag, data, children, normalizationType) {
    var childNodes = void 0;
    if (Array.isArray(children) && children[0] instanceof Node) {
      childNodes = children;
    }

    if (isDef(data) && isDef(data.__ob__)) {
      return createEmptyVNode();
    }

    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }

    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode();
    }

    // support single function children as default scoped slot
    if (Array.isArray(children) && typeof children[0] === 'function') {
      data = data || {};
      data.scopedSlots = {
        'default': children[0]
      };
      children.length = 0;
    }

    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }

    var vnode = void 0;
    var ns = void 0;
    if (typeof tag === 'string') {
      var Ctor = void 0;
      ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        // platform built-in elements
        vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
      } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag, childNodes);
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(tag, data, children, undefined, undefined, context);
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children, undefined, childNodes);
    }
    if (isDef(vnode)) {
      if (ns) {
        applyNS(vnode, ns);
      }

      return vnode;
    }
    return createEmptyVNode();
  }

  function applyNS(vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
      // use default namespace inside foreignObject
      ns = undefined;
      force = true;
    }

    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
          applyNS(child, ns, force);
        }
      }
    }
  }

  /**
   * @file render.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function initRender(vm) {
    vm._vnode = null; // the root of the child tree
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) {
      return createElement(vm, a, b, c, d, false);
    };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) {
      return createElement(vm, a, b, c, d, true);
    };

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;

    /* istanbul ignore else */
    /* eslint-disable no-mixed-operators */
    {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
    }
  }

  function renderMixin(Vue) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype);

    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this);
    };

    Vue.prototype._render = function () {
      var vm = this;
      var _vm$$options = vm.$options,
          render = _vm$$options.render,
          _parentVnode = _vm$$options._parentVnode;


      if (vm._isMounted) {
        // if the parent didn't update, the slot nodes will be the ones from
        // last render. They need to be cloned to ensure "freshness" for this render.
        for (var key in vm.$slots) {
          var slot = vm.$slots[key];
          if (slot._rendered) {
            vm.$slots[key] = cloneVNodes(slot, true
            // deep
            );
          }
        }
      }

      vm.$scopedSlots = _parentVnode && _parentVnode.data.scopedSlots || emptyObject;

      // set parent vnode. this allows render functions to have access
      // to the data on the placeholder node.
      vm.$vnode = _parentVnode;
      // render self
      var vnode = void 0;
      try {
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, 'render');
        // return error render result,
        // or previous vnode to prevent render error causing blank component

        /* istanbul ignore else */
        {
          vnode = vm._vnode;
        }
      }
      // return empty vnode in case the render function errored out
      if (!(vnode instanceof VNode)) {

        vnode = createEmptyVNode();
      }

      // set parent
      vnode.parent = _parentVnode;
      return vnode;
    };
  }

  /**
   * @file init.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var uid$2 = 0;

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // a uid
      vm._uid = uid$2++;

      // a flag to avoid this being observed
      vm._isVue = true;
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
      }

      /* istanbul ignore else */
      {
        vm._renderProxy = vm;
      }
      // expose real self
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm); // resolve injections before data/props
      initState(vm);
      initProvide(vm); // resolve provide after data/props
      callHook(vm, 'created');

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  function initInternalComponent(vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    opts.parent = options.parent;
    opts.propsData = options.propsData;
    opts._parentVnode = options._parentVnode;
    opts._parentListeners = options._parentListeners;
    opts._renderChildren = options._renderChildren;
    opts._componentTag = options._componentTag;
    opts._parentElm = options._parentElm;
    opts._refElm = options._refElm;
    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions(Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        var modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend$1(Ctor.extendOptions, modifiedOptions);
        }

        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }

    return options;
  }

  function resolveModifiedOptions(Ctor) {
    var modified = void 0;
    var latest = Ctor.options;
    var extended = Ctor.extendOptions;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) {
          modified = {};
        }

        modified[key] = dedupe(latest[key], extended[key], sealed[key]);
      }
    }
    return modified;
  }

  function dedupe(latest, extended, sealed) {
    // compare latest and sealed to ensure lifecycle hooks won't be duplicated
    // between merges
    if (Array.isArray(latest)) {
      var res = [];
      sealed = Array.isArray(sealed) ? sealed : [sealed];
      extended = Array.isArray(extended) ? extended : [extended];
      for (var i = 0; i < latest.length; i++) {
        // push original options and not sealed options to exclude duplicated options
        if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
          res.push(latest[i]);
        }
      }
      return res;
    }
    return latest;
  }

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function Vue(options) {

    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  /**
   * @file use.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function initUse(Vue) {
    Vue.use = function (plugin) {
      var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
      if (installedPlugins.indexOf(plugin) > -1) {
        return this;
      }

      // additional parameters
      var args = toArray$2(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }

      installedPlugins.push(plugin);
      return this;
    };
  }

  /**
   * @file mixin.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function initMixin$1(Vue) {
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this;
    };
  }

  /**
   * @file extend.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function initExtend(Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;

    Vue.extend = function () {
      var extendOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId];
      }

      var name = extendOptions.name || Super.options.name;

      var Sub = function VueComponent(options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(Super.options, extendOptions);
      Sub.super = Super;

      // For props and computed properties, we define the proxy getters on
      // the Vue instances at extension time, on the extended prototype. This
      // avoids Object.defineProperty calls for each instance created.
      if (Sub.options.props) {
        initProps$1(Sub);
      }

      if (Sub.options.computed) {
        initComputed$1(Sub);
      }

      // allow further extension/mixin/plugin usage
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;

      // create asset registers, so extended classes
      // can have their private assets too.
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }

      // keep a reference to the super options at extension time.
      // later at instantiation we can check if Super's options have
      // been updated.
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend$1({}, Sub.options);

      // cache constructor
      cachedCtors[SuperId] = Sub;
      return Sub;
    };
  }

  function initProps$1(Comp) {
    var props = Comp.options.props;
    for (var key in props) {
      proxy(Comp.prototype, '_props', key);
    }
  }

  function initComputed$1(Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }

  /**
   * @file assets.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function initAssetRegisters(Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (id, definition) {
        if (!definition) {
          return this.options[type + 's'][id];
        }

        if (type === 'component' && isPlainObject$1(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      };
    });
  }

  /**
   * @file keep-alive.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function getComponentName(opts) {
    return opts && (opts.Ctor.options.name || opts.tag);
  }

  function matches$1(pattern, name) {
    if (Array.isArray(pattern)) {
      return pattern.indexOf(name) > -1;
    } else if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1;
    } else if (isRegExp(pattern)) {
      return pattern.test(name);
    }

    /* istanbul ignore next */
    return false;
  }

  function pruneCache(keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache,
        keys = keepAliveInstance.keys,
        _vnode = keepAliveInstance._vnode;

    for (var key in cache) {
      var cachedNode = cache[key];
      if (cachedNode) {
        var name = getComponentName(cachedNode.componentOptions);
        if (name && !filter(name)) {
          pruneCacheEntry(cache, key, keys, _vnode);
        }
      }
    }
  }

  function pruneCacheEntry(cache, key, keys, current) {
    var cached$$1 = cache[key];
    if (cached$$1 && cached$$1 !== current) {
      cached$$1.componentInstance.$destroy();
    }

    cache[key] = null;
    remove(keys, key);
  }

  var patternTypes = [String, RegExp, Array];

  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },

    created: function created() {
      this.cache = Object.create(null);
      this.keys = [];
    },
    destroyed: function destroyed() {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },


    watch: {
      include: function include(val) {
        pruneCache(this, function (name) {
          return matches$1(val, name);
        });
      },
      exclude: function exclude(val) {
        pruneCache(this, function (name) {
          return !matches$1(val, name);
        });
      }
    },

    render: function render() {
      var vnode = getFirstComponentChild(this.$slots.default);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        // check pattern
        var name = getComponentName(componentOptions);
        if (name && (this.include && !matches$1(this.include, name) || this.exclude && matches$1(this.exclude, name))) {
          return vnode;
        }

        var cache = this.cache,
            keys = this.keys;

        var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? '::' + componentOptions.tag : '') : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          // make current key freshest
          remove(keys, key);
          keys.push(key);
        } else {
          cache[key] = vnode;
          keys.push(key);
          // prune oldest entry
          if (this.max && keys.length > parseInt(this.max, 10)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
        }

        vnode.data.keepAlive = true;
      }

      return vnode;
    }
  };

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var builtInComponents = {
    KeepAlive: KeepAlive
  };

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function initGlobalAPI(Vue) {
    // config
    var configDef = {
      get: function get() {
        return config;
      }
    };

    Object.defineProperty(Vue, 'config', configDef);

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend$1,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };

    Vue.set = set$1;
    Vue.delete = del$1;
    Vue.nextTick = nextTick;

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;

    extend$1(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  initGlobalAPI(Vue);

  Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
  });

  Object.defineProperty(Vue.prototype, '$ssrContext', {
    get: function get() {
      /* istanbul ignore next */
      return this.$vnode && this.$vnode.ssrContext;
    }
  });

  Vue.version = '2.0.0';

  /**
   * @file attrs.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');

  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  /* eslint-disable no-mixed-operators */
  var mustUseProp = function mustUseProp(tag, type, attr) {
    return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
  };

  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

  var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');

  var xlinkNS = 'http://www.w3.org/1999/xlink';

  var isXlink = function isXlink(name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
  };

  var getXlinkProp = function getXlinkProp(name) {
    return isXlink(name) ? name.slice(6, name.length) : '';
  };

  var isFalsyAttrValue = function isFalsyAttrValue(val) {
    return val == null || val === false;
  };

  /**
   * @file class.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function genClassForVnode(vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode = parentNode.parent)) {
      if (parentNode.data) {
        data = mergeClassData(data, parentNode.data);
      }
    }
    return renderClass(data.staticClass, data.class);
  }

  function mergeClassData(child, parent) {
    return {
      'staticClass': concat(child.staticClass, parent.staticClass),
      'class': isDef(child.class) ? [child.class, parent.class] : parent.class
    };
  }

  function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass));
    }

    /* istanbul ignore next */
    return '';
  }

  function concat(a, b) {
    return a ? b ? a + ' ' + b : a : b || '';
  }

  function stringifyClass(value) {
    if (Array.isArray(value)) {
      return stringifyArray(value);
    }

    if (isObject(value)) {
      return stringifyObject(value);
    }

    if (typeof value === 'string') {
      return value;
    }

    /* istanbul ignore next */
    return '';
  }

  function stringifyArray(value) {
    var res = '';
    var stringified = void 0;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
        if (res) {
          res += ' ';
        }

        res += stringified;
      }
    }
    return res;
  }

  function stringifyObject(value) {
    var res = '';
    for (var key in value) {
      if (value[key]) {
        if (res) {
          res += ' ';
        }

        res += key;
      }
    }
    return res;
  }

  /**
   * @file element.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
  };

  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');

  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
  var isReservedTag = function isReservedTag(tag) {
    return isHTMLTag(tag) || isSVG(tag);
  };

  function getTagNamespace(tag) {
    if (isSVG(tag)) {
      return 'svg';
    }

    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
      return 'math';
    }
  }

  var unknownElementCache = Object.create(null);
  function isUnknownElement(tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
      return true;
    }

    if (isReservedTag(tag)) {
      return false;
    }

    tag = tag.toLowerCase();

    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag];
    }

    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    }
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }

  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Query an element selector if it's not an element already.
   *
   * @param {Object} el element
   * @return {any} any result
   */
  function query(el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        return document.createElement('div');
      }

      return selected;
    }
    return el;
  }

  /**
   * @file node-ops.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function createElement$1(tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm;
    }

    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute('multiple', 'multiple');
    }

    return elm;
  }

  function createElementNS(namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName);
  }

  function createTextNode(text) {
    return document.createTextNode(text);
  }

  function createComment(text) {
    return document.createComment(text);
  }

  function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }

  function removeChild(node, child) {
    node.removeChild(child);
  }

  function appendChild(node, child) {
    node.appendChild(child);
  }

  function parentNode(node) {
    return node.parentNode;
  }

  function nextSibling(node) {
    return node.nextSibling;
  }

  function tagName(node) {
    return node.tagName;
  }

  function setTextContent(node, text) {
    node.textContent = text;
  }

  function setAttribute(node, key, val) {
    node.setAttribute(key, val);
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setAttribute: setAttribute
  });

  /**
   * @file ref.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var ref = {
    create: function create(_, vnode) {
      registerRef(vnode);
    },
    update: function update(oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy(vnode) {
      registerRef(vnode, true);
    }
  };

  function registerRef(vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!key) {
      return;
    }

    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref);
      } else if (refs[key] === ref) {
        refs[key] = undefined;
      }
    } else {
      if (vnode.data.refInFor) {
        if (!Array.isArray(refs[key])) {
          refs[key] = [ref];
        } else if (refs[key].indexOf(ref) < 0) {
          // $flow-disable-line
          refs[key].push(ref);
        }
      } else {
        refs[key] = ref;
      }
    }
  }

  /**
   * @file patch.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var emptyNode = new VNode('', {}, []);

  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

  function sameVnode(a, b) {
    return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
  }

  function sameInputType(a, b) {
    if (a.tag !== 'input') {
      return true;
    }

    var i = void 0;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    /* eslint-disable */
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
    /* eslint-enable */
  }

  function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i = void 0;
    var key = void 0;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) {
        map[key] = i;
      }
    }
    return map;
  }

  function createPatchFunction(backend) {
    var i = void 0;
    var j = void 0;
    var cbs = {};

    var modules = backend.modules,
        nodeOps = backend.nodeOps;


    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function emptyNodeAt(elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
    }

    function createRmCb(childElm, listeners) {
      function remove$$1() {
        if (--remove$$1.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$1.listeners = listeners;
      return remove$$1;
    }

    function removeNode(el) {
      var parent = nodeOps.parentNode(el);
      // element may have already been removed due to v-html / v-text
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested) {
      // mip patch: 如果是渲染好的 Node 节点，直接插入
      if (vnode instanceof Node) {
        nodeOps.insertBefore(parentElm, vnode, refElm);
        return;
      }

      vnode.isRootInsert = !nested; // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return;
      }

      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {

        vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
        setScope(vnode);

        createChildren(vnode, children, insertedVnodeQueue);

        // mip patch: 将 CustomElement 传进来的 slot dom 插入到 element 子节点中
        if (vnode.childrenElm) {
          vnode.elm.appendChild(vnode.childrenElm);
        }

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef(i = i.hook) && isDef(i = i.init)) {
          i(vnode, false,
          // hydrating,
          parentElm, refElm);
        }

        // after calling the init hook, if the vnode is a child component
        // it should've created a child instance and mounted it. the child
        // component also has set the placeholder vnode's elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }

          return true;
        }
      }
    }

    function initComponent(vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }

      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        // empty component root.
        // skip all element-related modules except for ref (#3455)
        registerRef(vnode);
        // make sure to invoke the insert hook
        insertedVnodeQueue.push(vnode);
      }
    }

    function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = void 0;
      // hack for #4339: a reactivated component with inner transition
      // does not trigger because the inner node's created hooks are not called
      // again. It's not ideal to involve module-specific logic in here but
      // there doesn't seem to be a better way to do it.
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
          for (i = 0; i < cbs.activate.length; ++i) {
            cbs.activate[i](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break;
        }
      }
      // unlike a newly created component,
      // a reactivated keep-alive component doesn't insert itself
      insert(parentElm, vnode.elm, refElm);
    }

    function insert(parent, elm, ref$$1) {
      if (isDef(parent)) {
        if (isDef(ref$$1)) {
          if (ref$$1.parentNode === parent) {
            nodeOps.insertBefore(parent, elm, ref$$1);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createChildren(vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        for (var _i = 0; _i < children.length; ++_i) {
          createElm(children[_i], insertedVnodeQueue, vnode.elm, null, true);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
      }
    }

    function isPatchable(vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag);
    }

    function invokeCreateHooks(vnode, insertedVnodeQueue) {
      for (var _i2 = 0; _i2 < cbs.create.length; ++_i2) {
        cbs.create[_i2](emptyNode, vnode);
      }
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (isDef(i.create)) {
          i.create(emptyNode, vnode);
        }

        if (isDef(i.insert)) {
          insertedVnodeQueue.push(vnode);
        }
      }
    }

    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope(vnode) {
      var i = void 0;
      if (isDef(i = vnode.functionalScopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
            nodeOps.setAttribute(vnode.elm, i, '');
          }

          ancestor = ancestor.parent;
        }
      }
      // for slot content they should also get the scopeId from the host instance.
      if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.functionalContext && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
    }

    function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
      }
    }

    function invokeDestroyHook(vnode) {
      var i = void 0;
      var j = void 0;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) {
          i(vnode);
        }

        for (i = 0; i < cbs.destroy.length; ++i) {
          cbs.destroy[i](vnode);
        }
      }

      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }

    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else {
            // Text node
            removeNode(ch.elm);
          }
        }
      }
    }

    function removeAndInvokeRemoveHook(vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var _i3 = void 0;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        }
        // recursively invoke hooks on child component root node
        if (isDef(_i3 = vnode.componentInstance) && isDef(_i3 = _i3._vnode) && isDef(_i3.data)) {
          removeAndInvokeRemoveHook(_i3, rm);
        }

        for (_i3 = 0; _i3 < cbs.remove.length; ++_i3) {
          cbs.remove[_i3](vnode, rm);
        }
        if (isDef(_i3 = vnode.data.hook) && isDef(_i3 = _i3.remove)) {
          _i3(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx = void 0;
      var idxInOld = void 0;
      var vnodeToMove = void 0;
      var refElm = void 0;

      // removeOnly is a special flag used only by <transition-group>
      // to ensure removed elements stay in correct relative positions
      // during leaving transitions
      var canMove = !removeOnly;

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode instanceof Node && oldStartVnode instanceof VNode) {
          newCh[newStartIdx++] = oldStartVnode;
          oldStartVnode = oldCh[oldStartIdx++];
        } else if (oldEndVnode instanceof Node && newEndVnode instanceof VNode) {
          newCh[newEndIdx--] = oldEndVnode;
          oldEndVnode = oldCh[oldEndIdx--];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) {
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          }

          idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) {
            // New element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          } else {
            vnodeToMove = oldCh[idxInOld];

            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
              oldCh[idxInOld] = undefined;
              canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              // same key but different element. treat as new element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }

    function findIdxInOld(node, oldCh, start, end) {
      for (var _i4 = start; _i4 < end; _i4++) {
        var c = oldCh[_i4];
        if (isDef(c) && sameVnode(node, c)) {
          return _i4;
        }
      }
    }

    function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
      if (oldVnode === vnode) {
        return;
      }

      var elm = vnode.elm = oldVnode.elm;

      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return;
      }

      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
        vnode.componentInstance = oldVnode.componentInstance;
        return;
      }

      var i = void 0;
      var data = vnode.data;
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        i(oldVnode, vnode);
      }

      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) {
          cbs.update[i](oldVnode, vnode);
        }
        if (isDef(i = data.hook) && isDef(i = i.update)) {
          i(oldVnode, vnode);
        }
      }

      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) {
            updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
          }
        } else if (isDef(ch)) {
          if (isDef(oldVnode.text)) {
            nodeOps.setTextContent(elm, '');
          }

          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text);
      }

      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
          i(oldVnode, vnode);
        }
      }
    }

    function invokeInsertHook(vnode, queue, initial) {
      // delay insert hooks for component root nodes, invoke them after the
      // element is really inserted
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue;
      } else {
        for (var _i5 = 0; _i5 < queue.length; ++_i5) {
          queue[_i5].data.hook.insert(queue[_i5]);
        }
      }
    }
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate(elm, vnode, insertedVnodeQueue) {
      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.elm = elm;
        vnode.isAsyncPlaceholder = true;
        return true;
      }

      vnode.elm = elm;
      var tag = vnode.tag,
          data = vnode.data,
          children = vnode.children;

      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) {
          i(vnode, true
          // hydrating
          );
        }

        if (isDef(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true;
        }
      }

      if (isDef(tag)) {
        if (isDef(children)) {
          // empty element, allow client to pick up and populate children
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            // v-html and domProps: innerHTML
            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
              if (i !== elm.innerHTML) {

                return false;
              }
            } else {
              // iterate and compare children lists
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var _i6 = 0; _i6 < children.length; _i6++) {
                if (!childNode || !hydrate(childNode, children[_i6], insertedVnodeQueue)) {
                  childrenMatch = false;
                  break;
                }

                childNode = childNode.nextSibling;
              }
              // if childNode is not null, it means the actual childNodes list is
              // longer than the virtual children list.
              if (!childrenMatch || childNode) {

                return false;
              }
            }
          }
        }

        if (isDef(data)) {
          for (var key in data) {
            if (!isRenderedModule(key)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break;
            }
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }

      return true;
    }

    return function patch(oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) {
          invokeDestroyHook(oldVnode);
        }

        return;
      }

      var isInitialPatch = false;
      var insertedVnodeQueue = [];

      if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue, parentElm, refElm);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }

            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode;
              }
            }

            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode);
          }

          // replacing existing element
          var oldElm = oldVnode.elm;
          var _parentElm = nodeOps.parentNode(oldElm);
          createElm(vnode, insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : _parentElm, nodeOps.nextSibling(oldElm));

          if (isDef(vnode.parent)) {
            // component root element replaced.
            // update parent placeholder node element, recursively
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var _i7 = 0; _i7 < cbs.destroy.length; ++_i7) {
                cbs.destroy[_i7](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var _i8 = 0; _i8 < cbs.create.length; ++_i8) {
                  cbs.create[_i8](emptyNode, ancestor);
                }
                // #6513
                // invoke insert hooks that may have been merged by create hooks.
                // e.g. for directives that uses the "inserted" hook.
                var _insert = ancestor.data.hook.insert;
                if (_insert.merged) {
                  // start at index 1 to avoid re-invoking component mounted hook
                  for (var _i9 = 1; _i9 < _insert.fns.length; _i9++) {
                    _insert.fns[_i9]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }

          if (isDef(_parentElm)) {
            removeVnodes(_parentElm, [oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }

      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm;
    };
  }

  /**
   * @file directives.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives(vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };

  function updateDirectives(oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      $update(oldVnode, vnode);
    }
  }

  function $update(oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

    var dirsWithInsert = [];
    var dirsWithPostpatch = [];

    var key = void 0;
    var oldDir = void 0;
    var dir = void 0;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        // new directive, bind
        callHook$1(dir, 'bind', vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        // existing directive, update
        dir.oldValue = oldDir.value;
        callHook$1(dir, 'update', vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }

    if (dirsWithInsert.length) {
      var callInsert = function callInsert() {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
      } else {
        callInsert();
      }
    }

    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
        }
      });
    }

    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          // no longer present, unbind
          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }

  var emptyModifiers = Object.create(null);

  function normalizeDirectives$1(dirs, vm) {
    var res = Object.create(null);
    if (!dirs) {
      return res;
    }

    var i = void 0;
    var dir = void 0;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        dir.modifiers = emptyModifiers;
      }

      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
    }
    return res;
  }

  function getRawDirName(dir) {
    return dir.rawName || dir.name + '.' + Object.keys(dir.modifiers || {}).join('.');
  }

  function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, 'directive ' + dir.name + ' ' + hook + ' hook');
      }
    }
  }

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var baseModules = [ref, directives];

  /**
   * @file attrs.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function updateAttrs(oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return;
    }

    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return;
    }

    var key = void 0;
    var cur = void 0;
    var old = void 0;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__)) {
      attrs = vnode.data.attrs = extend$1({}, attrs);
    }

    for (key in attrs) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur);
      }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    // #6666: IE/Edge forces progress value down to 1 before setting a max

    /* istanbul ignore if */
    if ((isIE9 || isEdge) && attrs.value !== oldAttrs.value) {
      setAttr(elm, 'value', attrs.value);
    }

    for (key in oldAttrs) {
      if (isUndef(attrs[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }

  function setAttr(el, key, value) {
    if (isBooleanAttr(key)) {
      // set attribute for blank value
      // e.g. <option disabled>Select one</option>
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        // technically allowfullscreen is a boolean attribute for <iframe>,
        // but Flash expects a value of "true" when used on <embed> tag
        value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else if (/^mip-/i.test(el.tagName) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        // update for mip
        // mip 自定义标签不支持 object 数据传递，必须转成 json 字符串
        el.setAttribute(key, JSON.stringify(value));
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };

  /**
   * @file class.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function updateClass(oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
      return;
    }

    var cls = genClassForVnode(vnode);

    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }

    // set the class
    if (cls !== el._prevClass) {
      el.setAttribute('class', cls);
      el._prevClass = cls;
    }
  }

  var klass = {
    create: updateClass,
    update: updateClass
  };

  /**
   * @file filter-parser.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * @file helpers.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * @file model.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * @file model.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';

  /**
   * @file events.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents(on) {
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
      // IE input[type=range] only supports `change` event
      var event = isIE ? 'change' : 'input';
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
  }

  var target$1 = void 0;

  function add$1(event, _handler, once$$1, capture, passive) {
    if (once$$1) {
      var oldHandler = _handler;
      /* eslint-disable fecs-camelcase */
      var _target = target$1; // save current target element in closure
      /* eslint-enable fecs-camelcase */
      _handler = function handler(ev) {
        var res = arguments.length === 1 ? oldHandler(ev) : oldHandler.apply(null, arguments);
        if (res !== null) {
          remove$2(event, _handler, capture, _target);
        }
      };
    }

    target$1.addEventListener(event, _handler, supportsPassive$1 ? { capture: capture, passive: passive } : capture);
  }

  function remove$2(event, handler, capture,
  /* eslint-disable fecs-camelcase */
  _target
  /* eslint-enable fecs-camelcase */
  ) {
    (_target || target$1).removeEventListener(event, handler, capture);
  }

  function updateDOMListeners(oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return;
    }

    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  }

  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };

  /**
   * @file dom-props.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function updateDOMProps(oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return;
    }

    var key = void 0;
    var cur = void 0;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__)) {
      props = vnode.data.domProps = extend$1({}, props);
    }

    for (key in oldProps) {
      if (isUndef(props[key])) {
        elm[key] = '';
      }
    }
    for (key in props) {
      cur = props[key];
      // ignore children if the node has textContent or innerHTML,
      // as these will throw away existing DOM nodes and cause removal errors
      // on subsequent patches (#3360)
      if (key === 'textContent' || key === 'innerHTML') {
        if (vnode.children) {
          vnode.children.length = 0;
        }

        if (cur === oldProps[key]) {
          continue;
        }

        // #6601 work around Chrome version <= 55 bug where single textNode
        // replaced by innerHTML/textContent retains its parentNode property
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }

      if (key === 'value') {
        // store value as _value as well since
        // non-string values will be stringified
        elm._value = cur;
        // avoid resetting cursor position when value is the same
        var strCur = isUndef(cur) ? '' : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else {
        elm[key] = cur;
      }
    }
  }

  // check platforms/web/util/attrs.js acceptValue

  function shouldUpdateValue(elm, checkVal) {
    return !elm.composing && (elm.tagName === 'OPTION' || isDirty(elm, checkVal) || isInputChanged(elm, checkVal));
  }

  function isDirty(elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    var notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try {
      notInFocus = document.activeElement !== elm;
    } catch (e) {}
    return notInFocus && elm.value !== checkVal;
  }

  function isInputChanged(elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers) && modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (isDef(modifiers) && modifiers.trim) {
      return value.trim() !== newVal.trim();
    }

    return value !== newVal;
  }

  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };

  /**
   * @file style.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res;
  });

  // merge static and dynamic style data on the same vnode
  function normalizeStyleData(data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle ? extend$1(data.staticStyle, style) : style;
  }

  // normalize possible array / string values into Object
  function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle);
    }

    if (typeof bindingStyle === 'string') {
      return parseStyleText(bindingStyle);
    }

    return bindingStyle;
  }

  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   *
   * @param {Object} vnode vnode object
   * @param {boolen} checkChild if check child flag
   * @return {Object} result
   */
  function getStyle(vnode, checkChild) {
    var res = {};
    var styleData = void 0;

    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
          extend$1(res, styleData);
        }
      }
    }

    if (styleData = normalizeStyleData(vnode.data)) {
      extend$1(res, styleData);
    }

    var parentNode = vnode;
    while (parentNode = parentNode.parent) {
      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
        extend$1(res, styleData);
      }
    }
    return res;
  }

  /**
   * @file style.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function setProp(el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(name, val.replace(importantRE, ''), 'important');
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        // Support values array created by autoprefixer, e.g.
        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
        // Set them one by one, and the browser will only set those it can recognize
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };

  var vendorNames = ['Webkit', 'Moz', 'ms'];

  var emptyStyle = void 0;
  var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize$1(prop);
    if (prop !== 'filter' && prop in emptyStyle) {
      return prop;
    }

    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name = vendorNames[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  });

  function updateStyle(oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
      return;
    }

    var cur = void 0;
    var name = void 0;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;

    var style = normalizeStyleBinding(vnode.data.style) || {};

    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likely wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__) ? extend$1({}, style) : style;

    var newStyle = getStyle(vnode, true);

    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, '');
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        // ie9 setting to null has no effect, must use empty string
        setProp(el, name, cur == null ? '' : cur);
      }
    }
  }

  var style = {
    create: updateStyle,
    update: updateStyle
  };

  /**
   * @file class-util.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return;
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(/\s+/).forEach(function (c) {
          return el.classList.add(c);
        });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = ' ' + (el.getAttribute('class') || '') + ' ';
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        el.setAttribute('class', (cur + cls).trim());
      }
    }
  }

  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return;
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(/\s+/).forEach(function (c) {
          return el.classList.remove(c);
        });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute('class');
      }
    } else {
      var cur = ' ' + (el.getAttribute('class') || '') + ' ';
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute('class', cur);
      } else {
        el.removeAttribute('class');
      }
    }
  }

  /**
   * @file transition-util.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function resolveTransition(def$$1) {
    if (!def$$1) {
      return;
    }

    /* istanbul ignore else */
    if ((typeof def$$1 === 'undefined' ? 'undefined' : _typeof(def$$1)) === 'object') {
      var res = {};
      if (def$$1.css !== false) {
        extend$1(res, autoCssTransition(def$$1.name || 'v'));
      }

      extend$1(res, def$$1);
      return res;
    } else if (typeof def$$1 === 'string') {
      return autoCssTransition(def$$1);
    }
  }

  var autoCssTransition = cached(function (name) {
    return {
      enterClass: name + '-enter',
      enterToClass: name + '-enter-to',
      enterActiveClass: name + '-enter-active',
      leaveClass: name + '-leave',
      leaveToClass: name + '-leave-to',
      leaveActiveClass: name + '-leave-active'
    };
  });

  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';

  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent$1 = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent$1 = 'animationend';
  if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
      transitionProp = 'WebkitTransition';
      transitionEndEvent$1 = 'webkitTransitionEnd';
    }

    if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
      animationProp = 'WebkitAnimation';
      animationEndEvent$1 = 'webkitAnimationEnd';
    }
  }

  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf$2 = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function (fn) {
    return fn();
  };

  function nextFrame$1(fn) {
    raf$2(function () {
      raf$2(fn);
    });
  }

  function addTransitionClass(el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }

  function removeTransitionClass(el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }

    removeClass(el, cls);
  }

  function whenTransitionEnds$1(el, expectedType, cb) {
    var _getTransitionInfo = getTransitionInfo(el, expectedType),
        type = _getTransitionInfo.type,
        timeout = _getTransitionInfo.timeout,
        propCount = _getTransitionInfo.propCount;

    if (!type) {
      return cb();
    }

    var event = type === TRANSITION ? transitionEndEvent$1 : animationEndEvent$1;
    var ended = 0;
    var onEnd = function onEnd(e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    var end = function end() {
      el.removeEventListener(event, onEnd);
      cb();
    };
    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }

  var transformRE = /\b(transform|all)(,|$)/;

  function getTransitionInfo(el, expectedType) {
    var styles = window.getComputedStyle(el);
    var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
    var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = styles[animationProp + 'Delay'].split(', ');
    var animationDurations = styles[animationProp + 'Duration'].split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);

    var type = void 0;
    var timeout = 0;
    var propCount = 0;

    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
      propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
    }
    var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    };
  }

  function getTimeout(delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      var _delays;

      delays = (_delays = delays).concat.apply(_delays, toConsumableArray(delays));
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i]);
    }));
  }

  function toMs(s) {
    return Number(s.slice(0, -1)) * 1000;
  }

  /**
   * @file transition.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  function enter(vnode, toggleDisplay) {
    var el = vnode.elm;

    // call leave callback now
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return;
    }

    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return;
    }

    var css = data.css,
        type = data.type,
        enterClass = data.enterClass,
        enterToClass = data.enterToClass,
        enterActiveClass = data.enterActiveClass,
        appearClass = data.appearClass,
        appearToClass = data.appearToClass,
        appearActiveClass = data.appearActiveClass,
        beforeEnter = data.beforeEnter,
        enter = data.enter,
        afterEnter = data.afterEnter,
        enterCancelled = data.enterCancelled,
        beforeAppear = data.beforeAppear,
        appear = data.appear,
        afterAppear = data.afterAppear,
        appearCancelled = data.appearCancelled,
        duration = data.duration;

    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.

    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      transitionNode = transitionNode.parent;
      context = transitionNode.context;
    }

    var isAppear = !context._isMounted || !vnode.isRootInsert;

    if (isAppear && !appear && appear !== '') {
      return;
    }

    var startClass = isAppear && appearClass ? appearClass : enterClass;
    var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
    var toClass = isAppear && appearToClass ? appearToClass : enterToClass;

    var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
    var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
    var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
    var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;

    var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);

    var cb = el._enterCb = once(function () {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }

      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }

        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });

    if (!vnode.data.show) {
      // remove pending leave element on enter by injecting an insert hook
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
          pendingNode.elm._leaveCb();
        }

        enterHook && enterHook(el, cb);
      });
    }

    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame$1(function () {
        addTransitionClass(el, toClass);
        removeTransitionClass(el, startClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds$1(el, type, cb);
          }
        }
      });
    }

    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }

  function leave(vnode, rm) {
    var el = vnode.elm;

    // call enter callback now
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return rm();
    }

    /* istanbul ignore if */
    if (isDef(el._leaveCb) || el.nodeType !== 1) {
      return;
    }

    var css = data.css,
        type = data.type,
        leaveClass = data.leaveClass,
        leaveToClass = data.leaveToClass,
        leaveActiveClass = data.leaveActiveClass,
        beforeLeave = data.beforeLeave,
        leave = data.leave,
        afterLeave = data.afterLeave,
        leaveCancelled = data.leaveCancelled,
        delayLeave = data.delayLeave,
        duration = data.duration;


    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);

    var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

    var cb = el._leaveCb = once(function () {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }

      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }

      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }

        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });

    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }

    function performLeave() {
      // the delayed leave may have already been cancelled
      if (cb.cancelled) {
        return;
      }

      // record leaving element
      if (!vnode.data.show) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
      }

      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame$1(function () {
          addTransitionClass(el, leaveToClass);
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled && !userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds$1(el, type, cb);
            }
          }
        });
      }

      leave && leave(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }

  function isValidDuration(val) {
    return typeof val === 'number' && !isNaN(val);
  }

  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   *
   * @param {Function} fn callback
   * @return {boolean|number} length
   */
  function getHookArgumentsLength(fn) {
    if (isUndef(fn)) {
      return false;
    }

    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      // invoker
      return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
    }
    return (fn._length || fn.length) > 1;
  }

  /* eslint-disable fecs-camelcase */
  function _enter(_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }
  /* eslint-enable fecs-camelcase */

  var transition$1 = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1(vnode, rm) {
      /* istanbul ignore else */
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var platformModules = [attrs, klass, events, domProps, style, transition$1];

  /**
   * @file patch.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);

  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  /**
   * @file model.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  /* istanbul ignore if */
  if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, 'input');
      }
    });
  }

  var model$1 = {
    inserted: function inserted(el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          // Safari < 10.2 & UIWebView doesn't fire compositionend when
          // switching focus before confirming composition choice
          // this also fixes the issue where some browsers e.g. iOS Chrome
          // fires "change" instead of "input" on autocomplete.
          el.addEventListener('change', onCompositionEnd);
          if (!isAndroid) {
            el.addEventListener('compositionstart', onCompositionStart);
            el.addEventListener('compositionend', onCompositionEnd);
          }

          /* istanbul ignore if */
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        // in case the options rendered by v-for have changed,
        // it's possible that the value is out-of-sync with the rendered options.
        // detect such cases and filter out values that no longer has a matching
        // option in the DOM.
        var prevOptions = el._vOptions;
        var curOptions = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions.some(function (o, i) {
          return !looseEqual(o, prevOptions[i]);
        })) {
          // trigger change event if
          // no matching option found for at least one value
          var needReset = el.multiple ? binding.value.some(function (v) {
            return hasNoMatchingOption(v, curOptions);
          }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
          if (needReset) {
            trigger(el, 'change');
          }
        }
      }
    }
  };

  function setSelected(el, binding, vm) {
    actuallySetSelected(el, binding, vm);

    /* istanbul ignore if */
    if (isIE || isEdge) {
      setTimeout(function () {
        actuallySetSelected(el, binding, vm);
      }, 0);
    }
  }

  function actuallySetSelected(el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      return;
    }

    var selected = void 0;
    var option = void 0;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }

          return;
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }

  function hasNoMatchingOption(value, options) {
    return options.every(function (o) {
      return !looseEqual(o, value);
    });
  }

  function getValue(option) {
    return '_value' in option ? option._value : option.value;
  }

  function onCompositionStart(e) {
    e.target.composing = true;
  }

  function onCompositionEnd(e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing) {
      return;
    }

    e.target.composing = false;
    trigger(e.target, 'input');
  }

  function trigger(el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }

  /**
   * @file show.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // recursively search for possible transition defined inside the component root
  function locateNode(vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
  }

  var show = {
    bind: function bind(el, _ref, vnode) {
      var value = _ref.value;

      vnode = locateNode(vnode);
      var transition = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
      if (value && transition) {
        vnode.data.show = true;
        enter(vnode, function () {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : 'none';
      }
    },
    update: function update(el, _ref2, vnode) {
      var value = _ref2.value,
          oldValue = _ref2.oldValue;

      /* istanbul ignore if */
      if (value === oldValue) {
        return;
      }

      vnode = locateNode(vnode);
      var transition = vnode.data && vnode.data.transition;
      if (transition) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function () {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function () {
            el.style.display = 'none';
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : 'none';
      }
    },
    unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var platformDirectives = {
    model: model$1,
    show: show
  };

  /**
   * @file transition.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]

    // in case the child is also an abstract component, e.g. <keep-alive>
    // we want to recursively retrieve the real component to be rendered
  };function getRealChild(vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children));
    }
    return vnode;
  }

  function extractTransitionData(comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var _key in listeners) {
      data[camelize$1(_key)] = listeners[_key];
    }
    return data;
  }

  function placeholder(h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h('keep-alive', {
        props: rawChild.componentOptions.propsData
      });
    }
  }

  function hasParentTransition(vnode) {
    while (vnode = vnode.parent) {
      if (vnode.data.transition) {
        return true;
      }
    }
  }

  function isSameChild(child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag;
  }

  var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render(h) {
      var _this = this;

      var children = this.$options._renderChildren;
      if (!children) {
        return;
      }

      // filter out text nodes (possible whitespaces)
      children = children.filter(function (c) {
        return c.tag || isAsyncPlaceholder(c);
      });

      /* istanbul ignore if */
      if (!children.length) {
        return;
      }

      var mode = this.mode;

      var rawChild = children[0];

      // if this is a component root node and the component's
      // parent container node also has transition, skip.
      if (hasParentTransition(this.$vnode)) {
        return rawChild;
      }

      // apply transition data to child
      // use getRealChild() to ignore abstract components e.g. keep-alive
      var child = getRealChild(rawChild);

      /* istanbul ignore if */
      if (!child) {
        return rawChild;
      }

      if (this._leaving) {
        return placeholder(h, rawChild);
      }

      // ensure a key that is unique to the vnode type and to this transition
      // component instance. This key will be used to remove pending leaving nodes
      // during entering.
      var id = '__transition-' + this._uid + '-';
      child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;

      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);

      // mark v-show
      // so that the transition module can hand over the control to the directive
      if (child.data.directives && child.data.directives.some(function (d) {
        return d.name === 'show';
      })) {
        child.data.show = true;
      }

      if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
        // replace old child transition data with fresh one
        // important for dynamic transitions!
        var oldData = oldChild.data.transition = extend$1({}, data);
        // handle transition mode
        if (mode === 'out-in') {
          // return placeholder node and queue update when leave finishes
          this._leaving = true;
          mergeVNodeHook(oldData, 'afterLeave', function () {
            _this._leaving = false;
            _this.$forceUpdate();
          });
          return placeholder(h, rawChild);
        } else if (mode === 'in-out') {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild;
          }

          var delayedLeave = void 0;
          var performLeave = function performLeave() {
            return delayedLeave();
          };
          mergeVNodeHook(data, 'afterEnter', performLeave);
          mergeVNodeHook(data, 'enterCancelled', performLeave);
          mergeVNodeHook(oldData, 'delayLeave', function (leave) {
            delayedLeave = leave;
          });
        }
      }

      return rawChild;
    }
  };

  /**
   * @file transition-group.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var props = extend$1({
    tag: String,
    moveClass: String
  }, transitionProps);

  delete props.mode;

  var TransitionGroup = {
    props: props,

    render: function render(h) {
      var tag = this.tag || this.$vnode.data.tag || 'span';
      var map = Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);

      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
            children.push(c);
            map[c.key] = c;
            (c.data || (c.data = {})).transition = transitionData;
          }
        }
      }

      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var _i = 0; _i < prevChildren.length; _i++) {
          var _c = prevChildren[_i];
          _c.data.transition = transitionData;
          _c.data.pos = _c.elm.getBoundingClientRect();
          if (map[_c.key]) {
            kept.push(_c);
          } else {
            removed.push(_c);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }

      return h(tag, null, children);
    },
    beforeUpdate: function beforeUpdate() {
      // force removing pass
      this.__patch__(this._vnode, this.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );
      this._vnode = this.kept;
    },
    updated: function updated() {
      var children = this.prevChildren;
      var moveClass = this.moveClass || (this.name || 'v') + '-move';
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return;
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);

      // force reflow to put everything in position
      var body = document.body;
      var f = body.offsetHeight; // eslint-disable-line

      children.forEach(function (c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = '';
          el.addEventListener(transitionEndEvent$1, el._moveCb = function cb(e) {
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent$1, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },


    methods: {
      hasMove: function hasMove(el, moveClass) {
        /* istanbul ignore if */
        if (!hasTransition) {
          return false;
        }

        /* istanbul ignore if */
        if (this._hasMove) {
          return this._hasMove;
        }

        // Detect whether an element with the move class applied has
        // CSS transitions. Since the element may be inside an entering
        // transition at this very moment, we make a clone of it and remove
        // all other transition classes applied to ensure only the move class
        // is applied.
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function (cls) {
            removeClass(clone, cls);
          });
        }

        addClass(clone, moveClass);
        clone.style.display = 'none';
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return this._hasMove = info.hasTransform;
      }
    }
  };

  function callPendingCbs(c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }

    /* istanbul ignore if */
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }

  function recordPosition(c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }

  function applyTranslation(c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = 'translate(' + dx + 'px,' + dy + 'px)';
      s.transitionDuration = '0s';
    }
  }

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };

  /**
   * @file index.js
   * @author sfe-sy(sfe-sy@baidu.com)
   */

  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;

  // install platform runtime directives & components
  extend$1(Vue.options.directives, platformDirectives);
  extend$1(Vue.options.components, platformComponents);

  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop;

  // public mount method
  Vue.prototype.$mount = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating);
  };

  // devtools global hook

  /* istanbul ignore next */
  Vue.nextTick(function () {

    // if ("production" !== 'production' &&
    //       config.productionTip !== false &&
    //       inBrowser &&
    //       typeof console !== 'undefined'
    // ) {
    //   console[console.info ? 'info' : 'log'](
    //     'You are running Vue in development mode.\n' +
    //     'Make sure to turn on production mode when deploying for production.\n' +
    //     'See more tips at https://vuejs.org/guide/deployment.html\n'
    //   )
    // }
  }, 0);

  /**
   * @file index.js
   * @author sfe-sy (sfe-sy@baidu.com)
   */

  Vue.use(function (Vue$$1) {
    Vue$$1.config.ignoredElements = [/^mip-/i];
    Vue$$1.customElement = function (tag, componentDefinition) {
      var props = getProps(componentDefinition);

      function callLifeCycle(ctx, name) {
        if (typeof componentDefinition[name] === 'function') {
          return componentDefinition[name].apply(ctx, [].slice.call(arguments, 2));
        }
      }

      var VueCustomElement = function (_CustomElement) {
        inherits(VueCustomElement, _CustomElement);

        function VueCustomElement() {
          classCallCheck(this, VueCustomElement);
          return possibleConstructorReturn(this, (VueCustomElement.__proto__ || Object.getPrototypeOf(VueCustomElement)).apply(this, arguments));
        }

        createClass(VueCustomElement, [{
          key: 'prerenderAllowed',

          /** @override */
          value: function prerenderAllowed(elementRect, viewportRect) {
            if (typeof componentDefinition.prerenderAllowed === 'function') {
              return componentDefinition.prerenderAllowed(elementRect, viewportRect);
            }

            return false;
          }

          /** @private */

        }, {
          key: '_build',
          value: function _build() {
            var vueInstance = this.vueInstance = createVueInstance(this.element, Vue$$1, componentDefinition, props);
            this.props = props;
            this.vm = vueInstance.$children[0];
          }

          /** @override */

        }, {
          key: 'build',
          value: function build() {
            if (this.prerenderAllowed()) {
              this._build();
            }
          }

          /** @override */

        }, {
          key: 'connectedCallback',
          value: function connectedCallback() {
            callLifeCycle(this, 'connectedCallback', this.element);
          }

          /** @override */

        }, {
          key: 'disconnectedCallback',
          value: function disconnectedCallback() {
            callLifeCycle(this, 'disconnectedCallback', this.element);
          }

          /** @override */

        }, {
          key: 'firstInviewCallback',
          value: function firstInviewCallback() {
            if (!this.prerenderAllowed()) {
              this._build();
            }

            callLifeCycle(this.vm, 'firstInviewCallback', this.element);
          }

          /** @override */

        }, {
          key: 'viewportCallback',
          value: function viewportCallback(inViewport) {
            callLifeCycle(this.vm, 'viewportCallback', inViewport, this.element);
          }

          /** @override */

        }, {
          key: 'attributeChangedCallback',
          value: function attributeChangedCallback(name, oldValue, value) {
            if (this.vueInstance) {
              var nameCamelCase = camelize(name);
              var type = this.props.types[nameCamelCase];
              this.vueInstance[nameCamelCase] = convertAttributeValue(value, type);
            }
          }

          /** @override */

        }], [{
          key: 'observedAttributes',
          get: function get$$1() {
            return props.hyphenate;
          }
        }]);
        return VueCustomElement;
      }(CustomElement);

      return registerElement$1(tag, VueCustomElement);
    };
  });

  /**
   * register vue as custom element v1
   *
   * @param {string} tag custom elment name, mip-*
   * @param {*} component vue component
   * @return {Array<HTMLElement>|undefined}
   */
  function registerVueCustomElement(tag, component) {
    return Vue.customElement(tag, component);
  }

  var listen$1 = event.listen;


  var UNKNOWN_EXTENSION_ID = 'unknown';

  var Extensions = function () {
    /**
     * @param {!Window} win
     */
    function Extensions(win) {
      classCallCheck(this, Extensions);

      /**
       * @private
       * @const
       */
      this.win = win;

      /**
       * @private
       * @const
       */
      this.doc = win.document;

      /**
       * @type {!Object}
       * @private
       */
      this.extensions = {};

      /**
       * @type {?string}
       * @private
       */
      this.currentExtensionId = null;

      /**
       * @private
       * @const
       */
      this.mipdoc = Services.mipdocFor(win);

      /**
       * @private
       * @const
       */
      this.timer = Services.timerFor(win);

      /**
       * Binds methods exposed to `MIP`.
       */
      this.installExtension = this.installExtension.bind(this);
      this.registerElement = this.registerElement.bind(this);
      this.registerService = this.registerService.bind(this);
      this.registerTemplate = this.registerTemplate.bind(this);
    }

    /**
     * Returns or creates extension holder for `extensionId`.
     *
     * @param {string} extensionId of extension.
     * @returns {!Object}
     * @private
     */


    createClass(Extensions, [{
      key: 'getExtensionHolder',
      value: function getExtensionHolder(extensionId) {
        var holder = this.extensions[extensionId];

        if (!holder) {
          var extension = {
            elements: {},
            services: {}
          };

          holder = this.extensions[extensionId] = {
            extension: extension,
            elementInstances: [],
            promise: null,
            resolve: null,
            reject: null,
            loaded: null,
            error: null
          };
        }

        return holder;
      }

      /**
       * Returns holder for extension which is currently being registered.
       *
       * @returns {!Object}
       * @private
       */

    }, {
      key: 'getCurrentExtensionHolder',
      value: function getCurrentExtensionHolder() {
        return this.getExtensionHolder(this.currentExtensionId || UNKNOWN_EXTENSION_ID);
      }

      /**
       * Returns or creates a promise waiting for extension loaded.
       *
       * @param {!Object} holder of extension.
       * @returns {!Promise<!Object>}
       * @private
       */

    }, {
      key: 'waitFor',
      value: function waitFor(holder) {
        if (!holder.promise) {
          if (holder.loaded) {
            holder.promise = Promise.resolve(holder.extension);
          } else if (holder.error) {
            holder.promise = Promise.reject(holder.error);
          } else {
            var _ref = new Deferred(),
                promise = _ref.promise,
                resolve = _ref.resolve,
                reject = _ref.reject;

            holder.promise = promise;
            holder.resolve = resolve;
            holder.reject = reject;
          }
        }

        return holder.promise;
      }

      /**
       * Returns or creates a promise waiting for extension loaded.
       *
       * @param {string} extensionId of extension.
       * @returns {!Promise<!Object>}
       */

    }, {
      key: 'waitForExtension',
      value: function waitForExtension(extensionId) {
        return this.waitFor(this.getExtensionHolder(extensionId));
      }

      /**
       * Disables `extension.deps` temporarily.
       */
      /**
       * Preloads an extension as a dependency of others.
       *
       * @param {string} extensionId of extension.
       * @returns {!Promise<!Object>}
       */
      /*
      preloadExtension (extensionId) {
        return this.waitForExtension(extensionId)
      }
      /*
       /**
       * Loads dependencies before the extension itself.
       *
       * @param {!Extension} extension
       * @returns {!Promise<Object>}
       * @private
       */
      /*
      preloadDepsOf (extension) {
        if (Array.isArray(extension.deps)) {
          return Promise.all(extension.deps.map(dep => this.preloadExtension(dep)))
        }
         if (typeof extension.deps === 'string') {
          return this.preloadExtension(extension.deps)
        }
         return Promise.resolve()
      }
      */

      /**
       * Registers an extension in extension holder.
       * An extension factory may include multiple registration methods,
       * such as `registerElement`, `registerService` or `registerTemplate`.
       *
       * @param {string} extensionId of extension.
       * @param {!Function} factory of extension.
       * @param  {...Object} args passed to extension factory.
       * @private
       */

    }, {
      key: 'registerExtension',
      value: function registerExtension(extensionId, factory) {
        var _this = this;

        var holder = this.getExtensionHolder(extensionId);

        try {
          this.currentExtensionId = extensionId;

          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          factory.apply(undefined, args);

          /**
           * It still possible that all element instances in current extension call lifecycle `build` synchronously.
           * Executes callback in microtask to make sure all these elements are built.
           */
          this.timer.then(function () {
            return _this.tryToResolveExtension(holder);
          });
        } catch (err) {
          this.tryToRejectError(holder, err);

          throw err;
        } finally {
          this.currentExtensionId = null;
        }
      }

      /**
       * To see if all elements registered in current extension are built.
       *
       * @param {!Object} holder of extension.
       * @private
       */

    }, {
      key: 'tryToResolveExtension',
      value: function tryToResolveExtension(holder) {
        if (!holder.elementInstances.every(function (el) {
          return el.isBuilt();
        })) {
          return;
        }

        holder.elementInstances.length = 0;

        holder.loaded = true;

        if (holder.resolve) {
          holder.resolve(holder.extension);
        }
      }

      /**
       * An error occurs in registeration of current extension.
       *
       * @param {!Object} holder of extension.
       * @param {Error} error to reject.
       * @private
       */

    }, {
      key: 'tryToRejectError',
      value: function tryToRejectError(holder, error) {
        holder.error = error;

        if (holder.reject) {
          holder.reject(error);
        }
      }

      /**
       * Installs an extension. The same as `MIP.push`.
       *
       * @param {!Object} extension
       */

    }, {
      key: 'installExtension',
      value: function installExtension(extension) {
        this.registerExtension(extension.name, extension.func, this.win.MIP);
      }

      /**
       * Returns the appropriate registrator for an element.
       * An element implementation could be a class written in native JavaScript or a Vue object.
       * If `element.version === '1'`, then it will fallback to the registration of MIP1 elements.
       *
       * @param {!Object} element contains implementation, css and version.
       * @returns {!function(string, !Function | !Object, string)}
       * @private
       */

    }, {
      key: 'getElementRegistrator',
      value: function getElementRegistrator(element) {
        if (element.version && element.version.split('.')[0] === '1') {
          return registerElement;
        }

        if (_typeof(element.implementation) === 'object') {
          return registerVueCustomElement;
        }

        return registerElement$1;
      }

      /**
       * Registers an element in extension currently being registered (by calling `MIP.push`).
       *
       * @param {string} name
       * @param {!Function | !Object} implementation
       * @param {string=} css
       * @param {Object=} options
       */

    }, {
      key: 'registerElement',
      value: function registerElement$$1(name, implementation, css, options) {
        var _this2 = this;

        var holder = this.getCurrentExtensionHolder();
        var element = { implementation: implementation, css: css };
        var version = options && options.version && '' + options.version;

        if (version) {
          element.version = version;
        }

        holder.extension.elements[name] = element;

        /** @type {HTMLElement[]} */
        var elementInstances = this.getElementRegistrator(element)(name, implementation, css);

        if (elementInstances && elementInstances.length) {
          holder.elementInstances = holder.elementInstances.concat(elementInstances);

          var _loop = function _loop(i, len) {
            var el = elementInstances[i];

            // Delay to last processing extension resolve.
            if (el.isBuilt()) {
              return 'continue';
            }

            // It can't catch error of customElements.define with try/catch.
            // @see https://github.com/w3c/webcomponents/issues/547
            if (el.error) {
              _this2.tryToRejectError(holder, el.error);
              return 'break';
            }

            /**
             * Lifecycle `build` of element instances is probably delayed with `setTimeout`.
             * If they are not, these event listeners would not be registered before they emit events.
             */
            var unlistenBuild = listen$1(el, 'build', function () {
              _this2.tryToResolveExtension(holder);
              unlistenBuild();
              unlistenBuildError();
            });
            var unlistenBuildError = listen$1(el, 'build-error', function (event$$1) {
              _this2.tryToRejectError(holder, event$$1.detail[0]);
              unlistenBuild();
              unlistenBuildError();
            });
          };

          _loop2: for (var i = 0, len = elementInstances.length; i < len; i++) {
            var _ret = _loop(i, len);

            switch (_ret) {
              case 'continue':
                continue;

              case 'break':
                break _loop2;}
          }
        }
      }

      /**
       * Registers a service in extension currently being registered (by calling `MIP.push`).
       * A service in extension is still a class contains some useful functions,
       * it's no conceptual difference with other internal services.
       * However, external services will be instantiated immediately.
       *
       * @param {string} name
       * @param {!Function} implementation
       */

    }, {
      key: 'registerService',
      value: function registerService(name, implementation) {
        var holder = this.getCurrentExtensionHolder();

        holder.extension.services[name] = { implementation: implementation };

        Services.registerService(this.win, name, implementation, true);
      }

      /**
       * Registers a template in extension currently being registered (by calling `MIP.push`).
       *
       * @param {string} name
       * @param {!Function} implementation
       * @param {Object=} options
       */

    }, {
      key: 'registerTemplate',
      value: function registerTemplate(name, implementation, options) {
        templates.register(name, implementation);
      }
    }]);
    return Extensions;
  }();

  /**
   * @param {!Window} win
   */
  function installExtensionsService(win) {
    Services.registerService(win, 'extensions', Extensions);
  }

  var Mipdoc = function () {
    /**
     * @param {!Window} win
     */
    function Mipdoc(win) {
      var _this = this;

      classCallCheck(this, Mipdoc);

      /**
       * @private
       * @const
       */
      this.win = win;

      /**
       * @private
       * @const
       */
      this.doc = win.document;

      /**
       * @type {!Promise<!HTMLBodyElement>}
       * @private
       * @const
       */
      this.bodyAvailable = this.doc.body ? Promise.resolve(this.doc.body) : dom.waitForBody(this.doc).then(function () {
        return _this.getBody();
      });
    }

    /**
     * Returns the URL for this mipdoc.
     *
     * @returns {string}
     */


    createClass(Mipdoc, [{
      key: 'getUrl',
      value: function getUrl() {
        return this.win.location.href;
      }

      /**
       * Returns the root node for this mipdoc.
       *
       * @returns {!Document}
       */

    }, {
      key: 'getRootNode',
      value: function getRootNode() {
        return this.doc;
      }

      /**
       * Returns the head element for this mipdoc.
       *
       * @returns {!HTMLHeadElement}
       */

    }, {
      key: 'getHead',
      value: function getHead() {
        return this.doc.head;
      }

      /**
       * Returns the body element for this mipdoc.
       *
       * @returns {!HTMLBodyElement}
       */

    }, {
      key: 'getBody',
      value: function getBody() {
        return this.doc.body;
      }

      /**
       * Whether `document.body` is available.
       *
       * @returns {boolean}
       */

    }, {
      key: 'isBodyAvailable',
      value: function isBodyAvailable() {
        return !!this.doc.body;
      }

      /**
       * Returns a promise that resolve when `document.body` is avaliable.
       *
       * @returns {!Promise<HTMLBodyElement>}
       */

    }, {
      key: 'whenBodyAvailable',
      value: function whenBodyAvailable() {
        return this.bodyAvailable;
      }
    }]);
    return Mipdoc;
  }();

  /**
   * @param {!Window} win
   */
  function installMipdocService(win) {
    Services.registerService(win, 'mipdoc', Mipdoc);
  }

  var Timer = function () {
    /**
     * @param {!Window} win
     */
    function Timer(win) {
      classCallCheck(this, Timer);

      /**
       * @type {!Window}
       * @private
       * @const
       */
      this.win = win;

      /**
       * @type {!Promise<void>}
       * @private
       * @const
       */
      this.resolved = win.Promise.resolve();

      /**
       * @type {number}
       * @private
       */
      this.timeoutId = 0;

      /**
       * @type {!Object}
       * @private
       */
      this.canceled = {};

      /**
       * @type {number}
       * @private
       * @const
       */
      this.startTime = Date.now();
    }

    /**
     * Returns time since start in millionseconds.
     *
     * @returns {number}
     */


    createClass(Timer, [{
      key: 'timeSinceStart',
      value: function timeSinceStart() {
        return Date.now() - this.startTime;
      }

      /**
       * Executes non-delay callback in microtask queue. Returns a promise.
       *
       * @template T typeof return value from callback.
       * @param {function():T} callback function to be executed in microtask queue.
       * @returns {Promise<T>}
       */

    }, {
      key: 'then',
      value: function then(callback) {
        return this.resolved.then(callback);
      }

      /**
       * Executes non-delay callback in microtask queue. Returns a `timeoutId` for cancellation.
       *
       * @param {Function} callback function to be executed in microtask queue.
       * @returns {string}
       */

    }, {
      key: 'cancelableThen',
      value: function cancelableThen(callback) {
        var _this = this;

        this.timeoutId++;

        this.resolved.then(function () {
          if (_this.canceled[_this.timeoutId]) {
            delete _this.canceled[_this.timeoutId];

            return;
          }
          callback();
        });

        /**
         * Returns a string to distinguish from `setTimeout`.
         */
        return '' + this.timeoutId;
      }

      /**
       * Executes callback after specified milliseconds.
       *
       * @param {Function} callback function to be executed after the timer expires.
       * @param {number=} ms delay milliseconds.
       * @returns {number}
       */

    }, {
      key: 'delay',
      value: function delay(callback, ms) {
        return this.win.setTimeout(callback, ms);
      }

      /**
       * Cancels a specified `delay` or `cancelableThen` callback.
       *
       * @param {string | number} timeoutId returns from `delay` or `cancelableThen`.
       */

    }, {
      key: 'cancel',
      value: function cancel(timeoutId) {
        if (typeof timeoutId === 'string') {
          this.canceled[timeoutId] = true;

          return;
        }
        this.win.clearTimeout(timeoutId);
      }

      /**
       * Returns a promise that will resolve after specified milliseconds.
       *
       * @param {number} ms delay milliseconds.
       * @returns {Promise<void>}
       */

    }, {
      key: 'sleep',
      value: function sleep(ms) {
        var _this2 = this;

        return new this.win.Promise(function (resolve) {
          return _this2.delay(resolve, ms);
        });
      }

      /**
       * Returns a promise that will reject after specified milliseconds.
       * If there's a racing promise, it will depend on whichever is faster.
       *
       * @template T typeof resolved value of racing promise.
       * @param {number} ms delay milliseconds.
       * @param {?Promise<T>=} racing promise.
       * @param {string=} message will be thrown after time expires.
       * @returns {!Promise<T | void>}
       */

    }, {
      key: 'timeout',
      value: function timeout(ms, racing) {
        var _this3 = this;

        var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'timeout';

        var timeoutId = void 0;
        var delaying = new this.win.Promise(function (resolve, reject) {
          timeoutId = _this3.delay(function () {
            return reject(new Error(message));
          }, ms);
        });

        if (!racing) {
          return delaying;
        }

        var cancel = function cancel() {
          return _this3.cancel(timeoutId);
        };

        racing.then(cancel, cancel);

        return this.win.Promise.race([delaying, racing]);
      }

      /**
       * Returns a promise that will resolve when `predicate()` returns `true`.
       * Polls `predicate` with `timeout` delay.
       *
       * @param {function():boolean} predicate function.
       * @param {number} ms delay millionseconds.
       * @returns {Promise<void>}
       */

    }, {
      key: 'poll',
      value: function poll(predicate, ms) {
        var _this4 = this;

        return new this.win.Promise(function (resolve) {
          var intervalId = _this4.win.setInterval(function () {
            if (!predicate()) {
              return;
            }

            _this4.win.clearInterval(intervalId);
            resolve();
          }, ms);
        });
      }
    }]);
    return Timer;
  }();

  /**
   * @param {!Window} win
   */
  function installTimerService(win) {
    Services.registerService(win, 'timer', Timer);
  }

  /**
   * @file MIP Shell utils
   * @author wangyisheng@baidu.com (wangyisheng)
   */

  /**
   * convert pattern to regexp
   * @param {string} pattern pattern string
   * @return {Regexp} regexp
   */
  function convertPatternToRegexp(pattern) {
    if (pattern === '*') {
      return (/.*/
      );
    }
    return new RegExp(pattern);
  }

  /**
   * 检查 MIP Shell Config 中的 routes 数组的每个元素是否把所有配置项都配齐了。
   * @param {*} route
   */
  function checkRouteConfig(route) {
    if (!route) {
      console.warn('检测到空的路由配置，MIP 将跳过这条配置');
    } else if (!route.pattern) {
      routeConfigWarning('pattern', '*', route);
    } else if (!route.meta) {
      routeConfigWarning('meta', 'meta', route);
    } else if (!route.meta.header) {
      routeConfigWarning('meta.header', 'meta.header', route);
    } else if (!route.meta.view) {
      routeConfigWarning('meta.view', 'meta.view', route);
    }
  }

  /* istanbul ignore next */
  function routeConfigWarning(configName, replaceName, route) {
    console.warn('\u68C0\u6D4B\u5230\u4E00\u6761\u8DEF\u7531\u914D\u7F6E\u4E2D\u6CA1\u6709\u8BBE\u7F6E ' + configName + ' \u9009\u9879\uFF0CMIP \u5C06\u4F7F\u7528 ' + replaceName + ' \u4EE3\u66FF\u3002\n', route);
  }

  /**
   * @file DOM 相关的方法
   * @author wangyisheng@baidu.com (wangyisheng)
   */

  var MORE_BUTTON_SVG = ['<svg t="1530857985972" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3393"', 'xmlns:xlink="http://www.w3.org/1999/xlink">', '<path d="M128 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="3394" fill="currentColor"></path>', '<path d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="3395" fill="currentColor"></path>', '<path d="M896 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" p-id="3396" fill="currentColor"></path>', '</svg>'].join('');
  var CLOSE_BUTTON_SVG = ['<svg t="1530857971603" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2953"', 'xmlns:xlink="http://www.w3.org/1999/xlink">', '<path  fill="currentColor" d="M586.026667 533.248l208.789333-208.576c9.856-8.874667 15.488-21.248 15.850667-34.858667a53.717333 53.717333 0 0 0-15.829334-39.146666 48.042667 48.042667 0 0 0-36.224-15.872c-14.165333 0-27.584 5.632-37.802666 15.850666L512 459.221333l-208.789333-208.576a48.042667 48.042667 0 0 0-36.245334-15.850666c-14.144 0-27.562667 5.632-37.781333 15.850666A48.085333 48.085333 0 0 0 213.333333 285.504a53.717333 53.717333 0 0 0 15.850667 39.168l208.789333 208.576-208.576 208.853333a48.085333 48.085333 0 0 0-15.850666 34.88 53.717333 53.717333 0 0 0 15.850666 39.146667c9.194667 10.24 22.058667 15.872 36.224 15.872 14.144 0 27.562667-5.632 37.802667-15.850667L512 607.274667l208.597333 208.853333c9.216 10.24 22.08 15.872 36.224 15.872s27.584-5.632 37.802667-15.850667c9.856-8.874667 15.488-21.269333 15.850667-34.88a53.717333 53.717333 0 0 0-15.850667-39.146666l-208.597333-208.853334z"', 'p-id="2954"></path>', '</svg>'].join('');
  var MIP_SHELL_HEADER$1 = 'mip-shell-header';
  var MIP_SHELL_HEADER_BUTTON_GROUP = MIP_SHELL_HEADER$1 + '-button-group';
  var MIP_SHELL_HEADER_BUTTON_GROUP_STANDALONE = MIP_SHELL_HEADER_BUTTON_GROUP + '-standalone';
  var MIP_HEADER_BTN = 'mip-header-btn';
  var DATA_BUTTON_NAME = 'data-button-name';

  function getSVGWrapper(type, standalone) {
    if (standalone) {
      return ['<div class="' + MIP_SHELL_HEADER_BUTTON_GROUP_STANDALONE + '" ' + MIP_HEADER_BTN + ' ' + DATA_BUTTON_NAME + '="' + type + '">', type === 'more' ? MORE_BUTTON_SVG : CLOSE_BUTTON_SVG, '</div>'].join('');
    }

    return ['<div class="button ' + type + '" ' + MIP_HEADER_BTN + ' ' + DATA_BUTTON_NAME + '="' + type + '">', type === 'more' ? MORE_BUTTON_SVG : CLOSE_BUTTON_SVG, '</div>'].join('');
  }

  function renderMoreButton() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        name = _ref.name,
        text = _ref.text,
        link = _ref.link;

    if (!name || !text) {
      return;
    }

    return ['<div class="mip-shell-button" mip-header-btn data-button-name="' + name + '">', '' + (link ? '<a mip-link href="' + link + '">' + text + '</a>' : text), '</div>'].join('');
  }

  /**
   * Create wrapper for more button in header
   *
   * @param {Array<Object>} buttonGroup configures for buttonGroup
   * @param {Object} options options
   * @param {boolean} options.update If this is an update operation
   */
  function createMoreButtonWrapper(buttonGroup) {

    if (!Array.isArray(buttonGroup)) {
      buttonGroup = [];
    }

    var renderButtonWrapper = function renderButtonWrapper(buttonWrapper) {
      var buttonGroupHTMLArray = [];
      buttonGroup.forEach(function (button) {
        var tmp = renderMoreButton(button);
        tmp && buttonGroupHTMLArray.push(tmp);
      });

      css(buttonWrapper, 'height', 48 * buttonGroupHTMLArray.length);
      buttonWrapper.innerHTML = buttonGroupHTMLArray.join('');
    };

    var mask = document.querySelector('.mip-shell-more-button-mask');
    var buttonWrapper = document.querySelector('.mip-shell-more-button-wrapper');

    if (!mask && !buttonWrapper) {
      mask = document.createElement('mip-fixed');
      mask.classList.add('mip-shell-more-button-mask');
      document.body.appendChild(mask);

      buttonWrapper = document.createElement('mip-fixed');
      buttonWrapper.classList.add('mip-shell-more-button-wrapper');
      renderButtonWrapper(buttonWrapper);
      document.body.appendChild(buttonWrapper);
    } else {
      renderButtonWrapper(buttonWrapper);
    }

    return { mask: mask, buttonWrapper: buttonWrapper };
  }

  /**
   * Create page mask to cover header
   * Mainly used in dialog within iframes
   */
  function createPageMask() {
    var mask = document.createElement('mip-fixed');
    mask.classList.add(MIP_SHELL_HEADER$1 + '-mask');
    document.body.appendChild(mask);

    return mask;
  }

  /**
   * Toggle something
   *
   * @param {HTMLElement} element
   * @param {boolean} toggle
   * @param {Object} options
   * @param {boolean} options.skipTransition Show result without transition
   * @param {boolean} options.transitionName Transition name. Defaults to 'fade'
   */
  function toggleInner(element, toggle) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        skipTransition = _ref2.skipTransition,
        _ref2$transitionName = _ref2.transitionName,
        transitionName = _ref2$transitionName === undefined ? 'fade' : _ref2$transitionName;

    if (skipTransition) {
      css(element, 'display', toggle ? 'block' : 'none');
      return;
    }
    var display = element.style.display;
    if (toggle && display === 'block' || !toggle && display === 'none') {
      return;
    }

    var direction = toggle ? 'enter' : 'leave';
    element.classList.add(transitionName + '-' + direction, transitionName + '-' + direction + '-active');
    css(element, 'display', 'block');
    // trigger layout
    /* eslint-disable no-unused-expressions */
    element.offsetWidth;
    /* eslint-enable no-unused-expressions */

    whenTransitionEnds(element, 'transition', function () {
      element.classList.remove(transitionName + '-' + direction + '-to', transitionName + '-' + direction + '-active');
      css(element, 'display', toggle ? 'block' : 'none');
    });

    nextFrame(function () {
      element.classList.add(transitionName + '-' + direction + '-to');
      element.classList.remove(transitionName + '-' + direction);
    });
  }

  /**
   * Render shell header
   *
   * @param {Object} shell MIP shell instance
   * @param {HTMLElement} container container of shell header
   */
  function renderHeader(shell, container) {
    var pageMeta = shell.currentPageMeta;
    var _pageMeta$header = pageMeta.header,
        buttonGroup = _pageMeta$header.buttonGroup,
        _pageMeta$header$titl = _pageMeta$header.title,
        title = _pageMeta$header$titl === undefined ? '' : _pageMeta$header$titl,
        logo = _pageMeta$header.logo,
        _pageMeta$header$colo = _pageMeta$header.color,
        color = _pageMeta$header$colo === undefined ? '#000000' : _pageMeta$header$colo,
        borderColor = _pageMeta$header.borderColor,
        _pageMeta$header$back = _pageMeta$header.backgroundColor,
        backgroundColor = _pageMeta$header$back === undefined ? '#ffffff' : _pageMeta$header$back;


    if (shell.priorTitle && !shell.alwaysUseTitleInShellConfig) {
      title = pageMeta.header.title = shell.priorTitle;
    }
    var showBackIcon = !pageMeta.view.isIndex;

    // 为了代码体积考虑，拼接 HTML 代码看起来比较复杂
    var headerHTML = '';
    if (showBackIcon) {
      headerHTML += ['<a href="javascript:void(0)" class="back-button" ' + MIP_HEADER_BTN + ' ' + DATA_BUTTON_NAME + '="back">', BACK_BUTTON_SVG, '</a>'].join('');
    }
    headerHTML += ['<div class="' + MIP_SHELL_HEADER$1 + '-logo-title">', '' + (logo ? '<img class="' + MIP_SHELL_HEADER$1 + '-logo" src="' + logo + '">' : ''), '<span class="' + MIP_SHELL_HEADER$1 + '-title">' + title + '</span>', '</div>'].join('');

    var moreFlag = Array.isArray(buttonGroup) && buttonGroup.length > 0;
    var closeFlag = !window.MIP.standalone && shell.showHeaderCloseButton();

    if (moreFlag && closeFlag) {
      // more & close
      headerHTML += ['<div class="' + MIP_SHELL_HEADER_BUTTON_GROUP + '">', getSVGWrapper('more'), '<div class="split"></div>', getSVGWrapper('close'), '</div>'].join('');
    } else if (moreFlag && !closeFlag) {
      // only more
      headerHTML += getSVGWrapper('more', true);
    } else if (!moreFlag && closeFlag) {
      // only close
      headerHTML += getSVGWrapper('close', true);
    }

    container.innerHTML = headerHTML;

    // Set color & borderColor & backgroundColor
    setHeaderColor(container, container, color, backgroundColor, borderColor);
  }

  function bindHeaderEvents(shell) {
    // Delegate header
    shell.headerEventHandler = event.delegate(shell.$el, '[mip-header-btn]', 'click', function (e) {
      var buttonName = this.dataset.buttonName;
      shell.handleClickHeaderButton(buttonName);
    });

    // Delegate dropdown button
    shell.buttonEventHandler = event.delegate(shell.$buttonWrapper, '[mip-header-btn]', 'click', function (e) {
      var buttonName = this.dataset.buttonName;
      shell.handleClickHeaderButton(buttonName);

      // Fix buttonGroup with 'link' config
      var children = this.children && this.children[0];
      if (children && children.tagName.toLowerCase() === 'a' && children.hasAttribute('mip-link')) {
        shell.toggleDropdown(false);
      }
    });

    var fadeHeader = document.querySelector('#mip-page-fade-header-wrapper');
    if (fadeHeader) {
      shell.fadeHeaderEventHandler = event.delegate(fadeHeader, '[mip-header-btn]', 'click', function (e) {
        if (this.dataset.buttonName === 'back') {
          window.MIP_SHELL_OPTION.allowTransition = true;
          window.MIP_SHELL_OPTION.isForward = false;
          window.MIP.viewer.page.back();
        }
      });
    }

    if (shell.$buttonMask) {
      shell.$buttonMask.addEventListener('click', function () {
        return shell.toggleDropdown(false);
      });
      shell.$buttonMask.addEventListener('touchmove', function (e) {
        return e.preventDefault();
      }, supportsPassive ? { passive: false } : false);
    }
  }

  function unbindHeaderEvents(shell) {
    if (shell.headerEventHandler) {
      shell.headerEventHandler();
      shell.headerEventHandler = undefined;
    }

    if (shell.buttonEventHandler) {
      shell.buttonEventHandler();
      shell.buttonEventHandler = undefined;
    }

    if (shell.fadeHeaderEventHandler) {
      shell.fadeHeaderEventHandler();
      shell.fadeHeaderEventHandler = undefined;
    }
  }

  /**
   * @file 处理过场动画
   * @author wangyisheng@baidu.com (wangyisheng)
   */

  var activeZIndex = 10000;

  /**
   * Apply transition effect when switching page
   *
   * @param {Object} shell shell instance
   * @param {Object} options
   * @param {string} options.targetPageId targetPageId
   * @param {Object} options.targetPageMeta pageMeta of target page
   * @param {string} options.sourcePageId sourcePageId
   * @param {Object} options.sourcePageMeta pageMeta of source page
   * @param {boolean} options.newPage whether a new iframe should be created
   * @param {boolean} options.isForward whether transition direction is forward
   * @param {Function} options.onComplete complete callback
   */
  function switchPage(shell, options) {
    if (viewport.isPortrait() && window.MIP_SHELL_OPTION.allowTransition) {
      // enable transition
      if (options.newPage) {
        if (options.isForward) {
          forwardTransitionAndCreate(shell, options);
        } else {
          backwardTransitionAndCreate(shell, options);
        }
      } else {
        if (options.isForward) {
          forwardTransition(shell, options);
        } else {
          backwardTransition(shell, options);
        }
      }
    } else {
      // disable transition
      if (options.newPage) {
        skipTransitionAndCreate(shell, options);
      } else {
        skipTransition(shell, options);
      }
    }
  }

  /**
   * Forward transition and create new iframe
   *
   * @param {Object} shell shell instance
   * @param {Object} options
   * @param {string} options.targetPageId targetPageId
   * @param {Object} options.targetPageMeta pageMeta of target page
   * @param {string} options.sourcePageId sourcePageId
   * @param {Object} options.sourcePageMeta pageMeta of source page
   * @param {boolean} options.newPage whether a new iframe should be created (true)
   * @param {boolean} options.isForward whether transition direction is forward (true)
   * @param {Function} options.onComplete complete callback
   */
  function forwardTransitionAndCreate(shell, options) {
    var sourcePageId = options.sourcePageId,
        targetPageId = options.targetPageId,
        targetPageMeta = options.targetPageMeta,
        onComplete = options.onComplete;

    var loading = getLoading(targetPageMeta, { transitionContainsHeader: shell.transitionContainsHeader });
    loading.classList.add('slide-enter', 'slide-enter-active');
    css(loading, 'display', 'block');

    var headerLogoTitle = void 0;
    var fadeHeader = void 0;
    if (!shell.transitionContainsHeader) {
      headerLogoTitle = document.querySelector('.mip-shell-header-wrapper .mip-shell-header-logo-title');
      headerLogoTitle && headerLogoTitle.classList.add('fade-out');
      fadeHeader = getFadeHeader(targetPageMeta);
      fadeHeader.classList.add('fade-enter', 'fade-enter-active');
      css(fadeHeader, 'display', 'block');
    }

    whenTransitionEnds(loading, 'transition', function () {
      loading.classList.remove('slide-enter-to', 'slide-enter-active');
      if (!shell.transitionContainsHeader) {
        fadeHeader.classList.remove('fade-enter-to', 'fade-enter-active');
      }

      hideAllIFrames();
      fixRootPageScroll(shell, { sourcePageId: sourcePageId, targetPageId: targetPageId });
      onComplete && onComplete();

      var iframe = getIFrame(targetPageId);
      css(iframe, 'z-index', activeZIndex++);

      shell.afterSwitchPage(options);
    });

    nextFrame(function () {
      loading.classList.add('slide-enter-to');
      loading.classList.remove('slide-enter');
      if (!shell.transitionContainsHeader) {
        fadeHeader.classList.add('fade-enter-to');
        fadeHeader.classList.remove('fade-enter');
      }
    });
  }

  /**
   * Backward transition and create new iframe
   *
   * @param {Object} shell shell instance
   * @param {Object} options
   * @param {string} options.targetPageId targetPageId
   * @param {Object} options.targetPageMeta pageMeta of target page
   * @param {string} options.sourcePageId sourcePageId
   * @param {Object} options.sourcePageMeta pageMeta of source page
   * @param {boolean} options.newPage whether a new iframe should be created (true)
   * @param {boolean} options.isForward whether transition direction is forward (false)
   * @param {Function} options.onComplete complete callback
   */
  function backwardTransitionAndCreate(shell, options) {
    var targetPageId = options.targetPageId,
        targetPageMeta = options.targetPageMeta,
        sourcePageId = options.sourcePageId,
        sourcePageMeta = options.sourcePageMeta,
        onComplete = options.onComplete;
    // Goto root page, resume scroll position (Only appears in backward)

    var rootPageScrollPosition = 0;
    fixRootPageScroll(shell, { targetPageId: targetPageId });
    if (targetPageId === window.MIP.viewer.page.pageId) {
      rootPageScrollPosition = shell.rootPageScrollPosition;
    }

    var iframe = getIFrame(sourcePageId);
    // If source page is root page, skip transition
    if (!iframe) {
      document.documentElement.classList.add('mip-no-scroll');
      window.MIP.viewer.page.getElementsInRootPage().forEach(function (e) {
        return e.classList.add('hide');
      });

      onComplete && onComplete();

      var targetIFrame = getIFrame(targetPageId);
      if (targetIFrame) {
        activeZIndex -= 2;
        css(targetIFrame, 'z-index', activeZIndex++);
      }

      shell.afterSwitchPage(options);
      return;
    }

    // Moving out only needs header, not loading body
    var loading = getLoading(sourcePageMeta, {
      onlyHeader: true,
      transitionContainsHeader: shell.transitionContainsHeader
    });
    var headerLogoTitle = void 0;
    var fadeHeader = void 0;

    if (shell.transitionContainsHeader) {
      css(loading, 'display', 'block');
    } else {
      headerLogoTitle = document.querySelector('.mip-shell-header-wrapper .mip-shell-header-logo-title');
      headerLogoTitle && headerLogoTitle.classList.add('fade-out');
      fadeHeader = getFadeHeader(targetPageMeta, sourcePageMeta);
      css(fadeHeader, 'display', 'block');
    }

    iframe.classList.add('slide-leave', 'slide-leave-active');
    if (shell.transitionContainsHeader) {
      loading.classList.add('slide-leave', 'slide-leave-active');
    } else {
      fadeHeader.classList.add('fade-enter', 'fade-enter-active');
    }

    // trigger layout and move current iframe to correct position
    /* eslint-disable no-unused-expressions */
    css(iframe, {
      opacity: 1,
      top: rootPageScrollPosition + 'px'
    });
    /* eslint-enable no-unused-expressions */

    whenTransitionEnds(iframe, 'transition', function () {
      css(iframe, {
        display: 'none',
        'z-index': 10000,
        top: 0
      });
      iframe.classList.remove('slide-leave-to', 'slide-leave-active');
      if (shell.transitionContainsHeader) {
        loading.classList.remove('slide-leave-to', 'slide-leave-active');
        css(loading, 'display', 'none');
      } else {
        fadeHeader.classList.remove('fade-enter-to', 'fade-enter');
      }

      onComplete && onComplete();

      var targetIFrame = getIFrame(targetPageId);
      if (targetIFrame) {
        activeZIndex -= 2;
        css(targetIFrame, 'z-index', activeZIndex++);
      }

      shell.afterSwitchPage(options);
    });

    nextFrame(function () {
      iframe.classList.add('slide-leave-to');
      iframe.classList.remove('slide-leave');
      if (shell.transitionContainsHeader) {
        loading.classList.add('slide-leave-to');
        loading.classList.remove('slide-leave');
      } else {
        fadeHeader.classList.add('fade-enter-to');
        fadeHeader.classList.remove('fade-enter');
      }
    });
  }

  /**
   * Forward transition
   *
   * @param {Object} shell shell instance
   * @param {Object} options
   * @param {string} options.targetPageId targetPageId
   * @param {Object} options.targetPageMeta pageMeta of target page
   * @param {string} options.sourcePageId sourcePageId
   * @param {Object} options.sourcePageMeta pageMeta of source page
   * @param {boolean} options.newPage whether a new iframe should be created (false)
   * @param {boolean} options.isForward whether transition direction is forward (true)
   * @param {Function} options.onComplete complete callback
   */
  function forwardTransition(shell, options) {
    var sourcePageId = options.sourcePageId,
        targetPageId = options.targetPageId,
        targetPageMeta = options.targetPageMeta,
        onComplete = options.onComplete;

    var iframe = getIFrame(targetPageId);
    var rootPageScrollPosition = 0;
    if (sourcePageId === window.MIP.viewer.page.pageId) {
      rootPageScrollPosition = shell.rootPageScrollPosition;
    }
    css(iframe, {
      display: 'block',
      opacity: 1,
      'z-index': activeZIndex++,
      top: rootPageScrollPosition + 'px'
    });
    iframe.classList.add('slide-enter', 'slide-enter-active');

    var headerLogoTitle = void 0;
    var fadeHeader = void 0;
    if (!shell.transitionContainsHeader) {
      headerLogoTitle = document.querySelector('.mip-shell-header-wrapper .mip-shell-header-logo-title');
      headerLogoTitle && headerLogoTitle.classList.add('fade-out');
      fadeHeader = getFadeHeader(targetPageMeta);
      fadeHeader.classList.add('fade-enter', 'fade-enter-active');
      css(fadeHeader, 'display', 'block');
    }

    whenTransitionEnds(iframe, 'transition', function () {
      iframe.classList.remove('slide-enter-to', 'slide-enter-active');
      if (!shell.transitionContainsHeader) {
        fadeHeader.classList.remove('fade-enter-to', 'fade-enter-active');
      }

      hideAllIFrames();
      fixRootPageScroll(shell, { sourcePageId: sourcePageId, targetPageId: targetPageId });
      css(iframe, 'top', 0);
      onComplete && onComplete();

      shell.afterSwitchPage(options);
    });

    nextFrame(function () {
      iframe.classList.add('slide-enter-to');
      iframe.classList.remove('slide-enter');
      if (!shell.transitionContainsHeader) {
        fadeHeader.classList.add('fade-enter-to');
        fadeHeader.classList.remove('fade-enter');
      }
    });
  }

  /**
   * Backward transition
   *
   * @param {Object} shell shell instance
   * @param {Object} options
   * @param {string} options.targetPageId targetPageId
   * @param {Object} options.targetPageMeta pageMeta of target page
   * @param {string} options.sourcePageId sourcePageId
   * @param {Object} options.sourcePageMeta pageMeta of source page
   * @param {boolean} options.newPage whether a new iframe should be created (false)
   * @param {boolean} options.isForward whether transition direction is forward (true)
   * @param {Function} options.onComplete complete callback
   */
  function backwardTransition(shell, options) {
    var targetPageId = options.targetPageId,
        targetPageMeta = options.targetPageMeta,
        sourcePageId = options.sourcePageId,
        sourcePageMeta = options.sourcePageMeta,
        onComplete = options.onComplete;


    var targetIFrame = getIFrame(targetPageId);
    if (targetIFrame) {
      activeZIndex -= 2;
      css(targetIFrame, {
        opacity: 1,
        display: 'block',
        'z-index': activeZIndex++
      });
    }

    // Goto root page, resume scroll position (Only appears in backward)
    var rootPageScrollPosition = 0;
    fixRootPageScroll(shell, { targetPageId: targetPageId });
    if (targetPageId === window.MIP.viewer.page.pageId) {
      rootPageScrollPosition = shell.rootPageScrollPosition;
    }

    var iframe = getIFrame(sourcePageId);
    // If source page is root page, skip transition
    if (!iframe) {
      document.documentElement.classList.add('mip-no-scroll');
      window.MIP.viewer.page.getElementsInRootPage().forEach(function (e) {
        return e.classList.add('mip-hide');
      });

      onComplete && onComplete();
      shell.afterSwitchPage(options);
      return;
    }

    // Moving out only needs header, not loading body
    var loading = getLoading(sourcePageMeta, {
      onlyHeader: true,
      transitionContainsHeader: shell.transitionContainsHeader
    });
    var headerLogoTitle = void 0;
    var fadeHeader = void 0;

    if (shell.transitionContainsHeader) {
      css(loading, 'display', 'block');
    } else {
      headerLogoTitle = document.querySelector('.mip-shell-header-wrapper .mip-shell-header-logo-title');
      headerLogoTitle && headerLogoTitle.classList.add('fade-out');
      fadeHeader = getFadeHeader(targetPageMeta, sourcePageMeta);
      css(fadeHeader, 'display', 'block');
    }

    iframe.classList.add('slide-leave', 'slide-leave-active');
    if (shell.transitionContainsHeader) {
      loading.classList.add('slide-leave', 'slide-leave-active');
    } else {
      fadeHeader.classList.add('fade-enter', 'fade-enter-active');
    }

    // trigger layout and move current iframe to correct position
    /* eslint-disable no-unused-expressions */
    css(iframe, {
      opacity: 1,
      top: rootPageScrollPosition + 'px'
    });
    /* eslint-enable no-unused-expressions */

    whenTransitionEnds(iframe, 'transition', function () {
      css(iframe, {
        display: 'none',
        'z-index': 10000,
        top: 0
      });
      iframe.classList.remove('slide-leave-to', 'slide-leave-active');
      if (shell.transitionContainsHeader) {
        loading.classList.remove('slide-leave-to', 'slide-leave-active');
        css(loading, 'display', 'none');
      } else {
        fadeHeader.classList.remove('fade-enter-to', 'fade-enter');
      }

      onComplete && onComplete();
      shell.afterSwitchPage(options);
    });

    nextFrame(function () {
      iframe.classList.add('slide-leave-to');
      iframe.classList.remove('slide-leave');
      if (shell.transitionContainsHeader) {
        loading.classList.add('slide-leave-to');
        loading.classList.remove('slide-leave');
      } else {
        fadeHeader.classList.add('fade-enter-to');
        fadeHeader.classList.remove('fade-enter');
      }
    });
  }

  /**
   * Skip transition and create new iframe
   *
   * @param {Object} shell shell instance
   * @param {Object} options
   * @param {string} options.targetPageId targetPageId
   * @param {Object} options.targetPageMeta pageMeta of target page
   * @param {string} options.sourcePageId sourcePageId
   * @param {Object} options.sourcePageMeta pageMeta of source page
   * @param {boolean} options.newPage whether a new iframe should be created (false)
   * @param {boolean} options.isForward whether transition direction is forward (true)
   * @param {Function} options.onComplete complete callback
   */
  function skipTransitionAndCreate(shell, options) {
    var sourcePageId = options.sourcePageId,
        targetPageId = options.targetPageId,
        onComplete = options.onComplete;


    hideAllIFrames();
    fixRootPageScroll(shell, { sourcePageId: sourcePageId, targetPageId: targetPageId });
    onComplete && onComplete();

    var iframe = getIFrame(targetPageId);
    css(iframe, 'z-index', activeZIndex++);

    shell.afterSwitchPage(options);
  }

  /**
   * Skip transition
   *
   * @param {Object} shell shell instance
   * @param {Object} options
   * @param {string} options.targetPageId targetPageId
   * @param {Object} options.targetPageMeta pageMeta of target page
   * @param {string} options.sourcePageId sourcePageId
   * @param {Object} options.sourcePageMeta pageMeta of source page
   * @param {boolean} options.newPage whether a new iframe should be created (false)
   * @param {boolean} options.isForward whether transition direction is forward (true)
   * @param {Function} options.onComplete complete callback
   */
  function skipTransition(shell, options) {
    // Currently act the same as skipTransitionAndCreate
    // This can be extended by sub-shell which executes different operations
    skipTransitionAndCreate(shell, options);
  }

  /**
   * Disable scrolling of root page when covered by an iframe
   * NOTE: it doesn't work in iOS, see `_lockBodyScroll()` in viewer.js
   */
  function fixRootPageScroll(shell) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        sourcePageId = _ref.sourcePageId,
        targetPageId = _ref.targetPageId;

    var page = window.MIP.viewer.page;
    if (sourcePageId === page.pageId) {
      document.documentElement.classList.add('mip-no-scroll');
      page.getElementsInRootPage().forEach(function (e) {
        return e.classList.add('mip-hide');
      });
    }
    if (targetPageId === page.pageId) {
      document.documentElement.classList.remove('mip-no-scroll');
      page.getElementsInRootPage().forEach(function (e) {
        return e.classList.remove('mip-hide');
      });
      shell.restoreScrollPosition();
    }
  }

  /**
   * @file render 方法
   * @author wangyisheng@baidu.com (wangyisheng)
   */

  var innerBodyHeight = void 0;
  var innerBodyFreezeTime = void 0;

  function render(shell, from, to) {
    var page = window.MIP.viewer.page;

    shell.resizeAllPages();

    // If `to` route is the same with `from` route in path & query, scroll in current page
    if (isSameRoute(from, to, true)) {
      // Emit event to current active page
      page.emitEventInCurrentPage({
        name: CUSTOM_EVENT_SCROLL_TO_ANCHOR,
        data: to.hash
      });
      return;
    }

    // Render target page
    var sourcePage = page.getPageById(page.currentPageId);
    var targetFullPath = getFullPath(to);
    var targetPageId = getCleanPageId(targetFullPath);
    var targetPage = page.getPageById(targetPageId);
    var targetIFrame = getIFrame(targetPageId);
    var isTargetRootPage = targetPage ? targetPage.isRootPage : false;

    /**
     * priority of header.title:
     * 1. <a mip-link data-title> (to.meta.title)
     * 2. <mip-shell> targetPageMeta.header.title (findMetaById(id).header.title)
     * 3. <a mip-link></a> innerText (to.meta.defaultTitle)
     */
    var targetPageMeta = fn.extend(true, {}, shell.findMetaByPageId(targetPageId));

    shell.priorTitle = to.meta.header && to.meta.header.title;
    document.title = targetPageMeta.header.title = to.meta.header ? to.meta.header.title || targetPageMeta.header.title || to.meta.header.defaultTitle : targetPageMeta.header.title;

    // Transition direction
    var isForward = void 0;
    if (targetPageMeta.view.isIndex) {
      isForward = false;
    } else {
      isForward = window.MIP_SHELL_OPTION.isForward;
    }

    // Hide page mask and skip transition
    shell.togglePageMask(false, { skipTransition: true });

    var params = {
      targetPageId: targetPageId,
      targetPageMeta: targetPageMeta,
      sourcePageId: page.currentPageId,
      sourcePageMeta: sourcePage.pageMeta,
      isForward: isForward

      // Leave from root page, save scroll position
    };if (page.currentPageId === page.pageId) {
      shell.saveScrollPosition();
    }

    // 目标页面是否存在。这是下面决定是否创建 iframe 时要用到的重要判断指标。
    // 如果是 rootPage，要求 page 存在。但因为 isTargetRootPage 本身就是用 targetPage 判断的，所以直接等价于目标页存在。
    // 如果不是 rootPage，则要求 iframe 和 page 同时存在
    // 之所以要判断两个都存在，是因为预渲染情况在 iframe load 之后才添加 page，所以可能 page=null 但是 iframe 已经有了
    var targetExists = isTargetRootPage || targetIFrame && targetPage;
    var isCacheFirst = to.meta && to.meta.cacheFirst && !isTargetRootPage;

    if (!targetExists || to.meta && to.meta.reload && !isCacheFirst) {
      // 进入这个分支表示需要创建新的 iframe，有以下情况：
      // 1. 目标页面不存在
      // 2. 目标页面的 iframe 和 page 虽然都存在，但是因为是点击链接跳转的（to.meta.reload = true)，因此为了实时性需要重新加载。
      //    但是 cacheFirst 时还是应该优先使用已有的 iframe，因此不要创建

      // If target page is root page
      if (page.pageId === targetPageId) {
        // Clear root pageId and destroy root page (Root page will exist in newly created iframe)
        page.pageId = NON_EXISTS_PAGE_ID;
        // if (targetPage) {
        //   targetPage.destroy()
        // }
        // Delete DOM & trigger disconnectedCallback in root page
        page.getElementsInRootPage().forEach(function (el) {
          return el.parentNode && el.parentNode.removeChild(el);
        });
      }

      if (!targetPage) {
        page.checkIfExceedsMaxPageNum(targetPageId);
      }

      var targetPageInfo = {
        pageId: targetPageId,
        pageMeta: targetPageMeta,
        fullpath: targetFullPath,
        standalone: window.MIP.standalone,
        isRootPage: false,
        isCrossOrigin: to.origin !== window.location.origin
      };

      var iframeCreated = false;
      var _targetIFrame = void 0;
      innerBodyHeight = 0;
      innerBodyFreezeTime = 0;
      var initHackForAndroidScroll = function initHackForAndroidScroll() {
        var mask = document.createElement('div');
        mask.classList.add('hack-for-android-scroll-mask');
        document.body.appendChild(mask);
        return mask;
      };
      var executeHackForAndroidScroll = function executeHackForAndroidScroll(mask) {
        css(mask, {
          opacity: '0.01',
          display: 'block'
        });
        setTimeout(function () {
          css(mask, {
            display: 'none',
            opacity: ''
          });
        }, 20);
      };
      var iframeOnLoad = function iframeOnLoad() {
        if (!targetPageInfo.isCrossOrigin && platform.isAndroid()) {
          var doc = _targetIFrame.contentWindow.document;
          var intervalTimes = 0;
          var hackMask = initHackForAndroidScroll();
          var checkInterval = setInterval(function () {
            intervalTimes++;
            var currentHeight = doc.body.clientHeight;
            if (doc.body.clientHeight !== innerBodyHeight) {
              innerBodyHeight = currentHeight;
              innerBodyFreezeTime = 0;
              executeHackForAndroidScroll(hackMask);
            } else {
              innerBodyFreezeTime++;
            }

            if (innerBodyFreezeTime >= 10 || intervalTimes >= 20) {
              clearInterval(checkInterval);
            }
          }, 500);
        }
      };
      // Bugs appear in QQBrowser when [pushState] and [create iframe] invoked together
      // Ensure [create iframe] before [pushState] and eliminate async operations can help
      // Thus, disable transition in QQBrowser
      if (platform.isQQ() || platform.isQQApp()) {
        _targetIFrame = createIFrame(targetPageInfo, { onLoad: iframeOnLoad });
        targetPageInfo.targetWindow = _targetIFrame.contentWindow;
        iframeCreated = true;
        window.MIP_SHELL_OPTION.allowTransition = false;
      }

      page.addChild(targetPageInfo);
      params.newPage = true;

      shell.beforeSwitchPage(params);

      params.onComplete = function () {
        shell.currentPageMeta = targetPageMeta;
        window.MIP_SHELL_OPTION.allowTransition = false;
        window.MIP_SHELL_OPTION.isForward = true;

        if (!iframeCreated) {
          _targetIFrame = createIFrame(targetPageInfo, { onLoad: iframeOnLoad });
          targetPageInfo.targetWindow = _targetIFrame.contentWindow;
        }
        css(_targetIFrame, {
          display: 'block',
          opacity: 1
        });

        // Get <mip-shell> from root page
        var shellDOM = document.querySelector('mip-shell') || document.querySelector('[mip-shell]');
        if (shellDOM) {
          window.MIP.viewer.eventAction.execute('active', shellDOM, {});
        }

        // Emit show/hide event to both pages
        page.emitEventInCurrentPage({ name: CUSTOM_EVENT_HIDE_PAGE });
        page.currentPageId = targetPageId;
        page.emitEventInCurrentPage({ name: CUSTOM_EVENT_SHOW_PAGE });
      };

      switchPage(shell, params);
    } else {
      // 进到这个分支表示复用已有的 iframe，不重新创建。需要满足：
      // 1. 目标页面的 iframe 和 page 对象都已经存在
      // 2. 并且可能是后退来的（to.meta.reload = false）或者指明从缓存读取（to.meta.cacheFirst = true）

      if (platform.isQQ() || platform.isQQApp()) {
        window.MIP_SHELL_OPTION.allowTransition = false;
      }
      // When transition contains header, fadeHeader won't appear
      // Thus updating shell of target page first is required
      if (shell.transitionContainsHeader) {
        shell.refreshShell({ pageMeta: targetPageMeta });
      }

      // 如果是预渲染页面
      if (targetPage.isPrerender || targetIFrame && targetIFrame.getAttribute('prerender') === '1') {
        params.isPrerender = true;
        targetIFrame.contentWindow.postMessage({
          name: window.name,
          event: MESSAGE_PAGE_ACTIVE
        }, '*');
        targetPage.isPrerender = false;
        targetIFrame.removeAttribute('prerender');

        if (targetPageId === page.pageId) {
          // Clear root pageId and destroy root page (Root page will exist in newly created iframe)
          page.pageId = NON_EXISTS_PAGE_ID;
          // if (targetPage) {
          //   targetPage.destroy()
          // }
          // Delete DOM & trigger disconnectedCallback in root page
          page.getElementsInRootPage().forEach(function (el) {
            return el.parentNode && el.parentNode.removeChild(el);
          });
        }
      }

      params.newPage = false;
      params.cacheFirst = to.meta && to.meta.cacheFirst;
      shell.beforeSwitchPage(params);

      params.onComplete = function () {
        shell.currentPageMeta = targetPageMeta;
        window.MIP_SHELL_OPTION.allowTransition = false;
        window.MIP_SHELL_OPTION.isForward = true;

        window.MIP.$recompile();

        css(targetIFrame, {
          display: 'block',
          opacity: 1
        });

        if (shell.transitionContainsHeader) {
          css(shell.$loading, 'display', 'none');
        } else {
          shell.refreshShell({ pageMeta: targetPageMeta });
        }

        // Get <mip-shell> from root page
        var shellDOM = document.querySelector('mip-shell') || document.querySelector('[mip-shell]');
        if (shellDOM) {
          window.MIP.viewer.eventAction.execute('active', shellDOM, {});
        }

        // Emit show/hide event to both pages
        page.emitEventInCurrentPage({ name: CUSTOM_EVENT_HIDE_PAGE });
        page.currentPageId = targetPageId;
        page.emitEventInCurrentPage({ name: CUSTOM_EVENT_SHOW_PAGE });
      };

      switchPage(shell, params);
    }
  }

  var supportsPushState = window.history && 'pushState' in window.history;

  // use User Timing api (if present) for more accurate key precision
  var Time = window.performance && window.performance.now ? window.performance : /* istanbul ignore next */Date;

  var _key = genKey();

  function genKey() {
    return Time.now().toFixed(3);
  }

  // export function getStateKey () {
  //   return _key
  // }

  // export function setStateKey (key) {
  //   _key = key
  // }

  function pushState(url, replace) {
    // try...catch the pushState call to get around Safari
    // DOM Exception 18 where it limits to 100 pushState calls
    var history = window.history;
    try {
      if (replace) {
        history.replaceState({ key: _key }, '', url);
      } else {
        _key = genKey();
        history.pushState({ key: _key }, '', url);
      }
    } catch (e) {
      /* istanbul ignore next */
      if (window.MIP.standalone) {
        window.location[replace ? 'replace' : 'assign'](url);
      }
    }
  }

  function replaceState(url) {
    pushState(url, true);
  }

  var HTML5History = function () {
    function HTML5History(router) {
      var _this = this;

      classCallCheck(this, HTML5History);

      this.router = router;

      // start with a route object that stands for "nowhere"
      this.current = START;

      // route changed callback
      this.cb = null;

      var initLocation = getLocation();
      window.addEventListener('popstate', function (e) {
        // Avoiding first `popstate` event dispatched in some browsers but first
        // history route not updated since async guard at the same time.
        var location = getLocation();
        /* istanbul ignore next */
        if (_this.current === START && location === initLocation) {
          return;
        }

        _this.transitionTo(location);
      });
    }

    createClass(HTML5History, [{
      key: 'listen',
      value: function listen(cb) {
        this.cb = cb;
      }
    }, {
      key: 'go',
      value: function go(n) {
        window.history.go(n);
      }
    }, {
      key: 'push',
      value: function push(location) {
        this.transitionTo(location, function (route) {
          /* istanbul ignore next */
          pushState(route.fullPath);
        });
      }
    }, {
      key: 'replace',
      value: function replace(location) {
        this.transitionTo(location, function (route) {
          /* istanbul ignore next */
          replaceState(route.fullPath);
        });
      }
    }, {
      key: 'getCurrentLocation',
      value: function getCurrentLocation() {
        return getLocation();
      }
    }, {
      key: 'transitionTo',
      value: function transitionTo(location, onComplete) {
        var route = normalizeLocation(location, this.current);
        /* istanbul ignore next */
        if (platform.isAndroid() && (platform.isQQ() || platform.isQQApp())) {
          onComplete && onComplete(route);
          this.updateRoute(route);
        } else {
          this.updateRoute(route);
          onComplete && onComplete(route);
        }
      }
    }, {
      key: 'updateRoute',
      value: function updateRoute(route) {
        var prev = this.current;
        this.current = route;
        this.cb && this.cb(prev, route);
      }
    }]);
    return HTML5History;
  }();

  var Router = function () {
    function Router() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, Router);

      this.options = options;
      this.history = new HTML5History(this);
    }

    createClass(Router, [{
      key: 'init',
      value: function init() {
        var history = this.history;

        var currentLocation = history.getCurrentLocation();
        history.transitionTo(currentLocation);
      }
    }, {
      key: 'listen',
      value: function listen(cb) {
        this.history.listen(cb);
      }
    }, {
      key: 'push',
      value: function push(location) {
        if (!window.MIP.standalone) {
          this.history.replace(location);
        } else {
          this.history.push(location);
        }
      }
    }, {
      key: 'replace',
      value: function replace(location) {
        this.history.replace(location);
      }
    }, {
      key: 'go',
      value: function go(n) {
        if (window.MIP.standalone) {
          this.history.go(n);
        } else {
          // SF can help to navigate by 'changeState' when standalone = false
          window.MIP.viewer.sendMessage(OUTER_MESSAGE_HISTORY_NAVIGATE, { step: n });
        }
      }
    }, {
      key: 'back',
      value: function back() {
        this.go(-1);
      }
    }, {
      key: 'forward',
      value: function forward() {
        this.go(1);
      }
    }]);
    return Router;
  }();

  /* istanbul ignore file */

  var viewer$1 = null;
  var page = null;
  var isHeaderShown = false;

  window.MIP_PAGE_META_CACHE = Object.create(null);
  window.MIP_SHELL_CONFIG = null;
  window.MIP_SHELL_ROUTES_AUTO_GENERATED = false;

  var MipShell = function (_CustomElement) {
    inherits(MipShell, _CustomElement);

    // ===================== CustomElement LifeCycle =====================
    function MipShell() {
      var _ref;

      classCallCheck(this, MipShell);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref = MipShell.__proto__ || Object.getPrototypeOf(MipShell)).call.apply(_ref, [this].concat(args)));

      _this.messageHandlers = [];

      // If true, always load configures from `<mip-shell>` and overwrite shellConfig when opening new page
      _this.alwaysReadConfigOnLoad = true;

      // If true, always use title in shell config of target page when switing page
      // Otherwise, use title from last page (`data-title` and shell config and innerText)
      _this.alwaysUseTitleInShellConfig = false;

      // If true, page switching transition contains header
      _this.transitionContainsHeader = true;

      // If true, all MIP Shell Config warning won't be shown
      _this.ignoreWarning = false;
      return _this;
    }

    createClass(MipShell, [{
      key: 'build',
      value: function build() {
        var _this2 = this;

        viewer$1 = window.MIP.viewer;
        page = viewer$1.page;

        // Read config
        var ele = this.element.querySelector('script[type="application/json"]');
        var tmpShellConfig = void 0;

        if (ele) {
          try {
            tmpShellConfig = JSON.parse(ele.textContent.toString()) || {}
            // 开头的分号是为了应对 rollup 的 BUG，否则会导致方括号和上一句的 || {} 连接在一起从而不执行
            ;['alwaysReadConfigOnLoad', 'transitionContainsHeader', 'ignoreWarning'].forEach(function (key) {
              if (tmpShellConfig[key] !== undefined) {
                _this2[key] = tmpShellConfig[key];
              }
            });

            if (!tmpShellConfig.routes) {
              !this.ignoreWarning && console.warn('检测到 MIP Shell 配置没有包含 `routes` 数组，MIP 将自动生成一条默认的路由配置。');
              tmpShellConfig.routes = [{
                pattern: '*',
                meta: DEFAULT_SHELL_CONFIG
              }];
              window.MIP_SHELL_ROUTES_AUTO_GENERATED = true;
            }
          } catch (e) {
            !this.ignoreWarning && console.warn('检测到格式非法的 MIP Shell 配置，MIP 将使用默认的配置代替。');
            tmpShellConfig = {
              routes: [{
                pattern: '*',
                meta: DEFAULT_SHELL_CONFIG
              }]
            };
            window.MIP_SHELL_ROUTES_AUTO_GENERATED = true;
          }
        } else {
          !this.ignoreWarning && console.warn('没有检测到 MIP Shell 配置，MIP 将使用默认的配置代替。');
          tmpShellConfig = {
            routes: [{
              pattern: '*',
              meta: DEFAULT_SHELL_CONFIG
            }]
          };
          window.MIP_SHELL_ROUTES_AUTO_GENERATED = true;
        }

        if (page.isRootPage) {
          tmpShellConfig.routes.forEach(function (route) {
            !_this2.ignoreWarning && checkRouteConfig(route);
            route.meta = fn.extend(true, {}, DEFAULT_SHELL_CONFIG, route.meta || {});
            route.regexp = convertPatternToRegexp(route.pattern || '*');

            // Get title from <title> tag
            if (!route.meta.header.title) {
              route.meta.header.title = (document.querySelector('title') || {}).innerHTML || '';
            }
          });
          this.processShellConfig(tmpShellConfig);

          window.MIP_SHELL_CONFIG = tmpShellConfig.routes;
          // Append other DOM
          var children = this.element.children;
          var otherDOM = [].slice.call(children).slice(1, children.length);
          if (otherDOM.length > 0) {
            otherDOM.forEach(function (dom$$1) {
              dom$$1.setAttribute('mip-shell-inner', '');
              document.body.appendChild(dom$$1);
            });
          }
        } else {
          var pageId = page.pageId;
          var pageMeta = void 0;

          if (page.isCrossOrigin) {
            // If this iframe is a cross origin one
            // Read all config and save it in window.
            // Avoid find page meta from `window.parent`
            tmpShellConfig.routes.forEach(function (route) {
              !_this2.ignoreWarning && checkRouteConfig(route);
              route.meta = fn.extend(true, {}, DEFAULT_SHELL_CONFIG, route.meta || {});
              route.regexp = convertPatternToRegexp(route.pattern || '*');

              // Get title from <title> tag
              if (!route.meta.header.title) {
                route.meta.header.title = (document.querySelector('title') || {}).innerHTML || '';
              }

              // Find current page meta
              if (route.regexp.test(pageId)) {
                pageMeta = window.MIP_PAGE_META_CACHE[pageId] = route.meta;
              }
            });

            window.MIP_SHELL_CONFIG = tmpShellConfig.routes;
            window.MIP_PAGE_META_CACHE = Object.create(null);
          } else if (this.alwaysReadConfigOnLoad) {
            // If `alwaysReadConfigOnLoad` equals `true`
            // Read config in leaf pages and pick up the matched one. Send it to page for updating.
            pageMeta = DEFAULT_SHELL_CONFIG;
            for (var i = 0; i < tmpShellConfig.routes.length; i++) {
              var config = tmpShellConfig.routes[i];
              !this.ignoreWarning && checkRouteConfig(config);
              config.regexp = convertPatternToRegexp(config.pattern || '*');

              // Only process matched page meta
              if (config.regexp.test(pageId)) {
                config.meta = fn.extend(true, {}, DEFAULT_SHELL_CONFIG, config.meta || {});
                // get title from <title> tag
                if (!config.meta.header.title) {
                  config.meta.header.title = (document.querySelector('title') || {}).innerHTML || '';
                }

                this.processShellConfigInLeaf(tmpShellConfig, i);

                pageMeta = window.parent.MIP_PAGE_META_CACHE[pageId] = config.meta;
                break;
              }
            }
          }

          if (!pageMeta) {
            pageMeta = this.findMetaByPageId(pageId);
          }
          if (window.parent.MIP_SHELL_ROUTES_AUTO_GENERATED) {
            window.parent.document.title = pageMeta.header.title = (document.querySelector('title') || {}).innerHTML || '';
          }

          page.emitCustomEvent(window.parent, page.isCrossOrigin, {
            name: 'mipShellEvents',
            data: {
              type: 'updateShell',
              data: { pageMeta: pageMeta }
            }
          });
        }
      }
    }, {
      key: 'prerenderAllowed',
      value: function prerenderAllowed() {
        return true;
      }
    }, {
      key: 'firstInviewCallback',
      value: function firstInviewCallback() {
        var _this3 = this;

        this.currentPageMeta = this.findMetaByPageId(page.pageId);

        if (page.isRootPage) {
          page.pageMeta = this.currentPageMeta;
          this.initShell();
          this.initRouter();
        }

        // 绑定事件改为异步，不阻塞发送 mippageload 事件，下同
        setTimeout(function () {
          if (page.isRootPage) {
            _this3.bindRootEvents();
          }
          _this3.bindAllEvents();
        }, 0);
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        if (page.isRootPage) {
          this.unbindHeaderEvents();
        }
      }

      // ===================== Only Root Page Functions =====================

      /**
       * Create belows:
       * 1. Shell wrapper
       * 2. Header
       * 3. Button wrapper & mask
       * 4. Page mask (mainly used to cover header)
       */

    }, {
      key: 'initShell',
      value: function initShell() {
        var _this4 = this;

        if (this.currentPageMeta.header && this.currentPageMeta.header.show) {
          isHeaderShown = true;
          this.createHeader(true);
        } else {
          isHeaderShown = false;
        }

        // Other sync parts
        this.renderOtherParts();

        setTimeout(function () {
          if (!isHeaderShown) {
            _this4.createHeader(false);
          }

          // Button wrapper & mask
          var buttonGroup = _this4.currentPageMeta.header.buttonGroup;

          var _createMoreButtonWrap = createMoreButtonWrapper(buttonGroup),
              mask = _createMoreButtonWrap.mask,
              buttonWrapper = _createMoreButtonWrap.buttonWrapper;

          _this4.$buttonMask = mask;
          _this4.$buttonWrapper = buttonWrapper;

          // Page mask
          _this4.$pageMask = createPageMask();

          // Loading
          _this4.$loading = createLoading(_this4.currentPageMeta);

          // Other async parts
          _this4.renderOtherPartsAsync();
        }, 0);
      }
    }, {
      key: 'createHeader',
      value: function createHeader(showHeader) {
        // Shell wrapper
        this.$wrapper = document.createElement('mip-fixed');
        this.$wrapper.setAttribute('type', 'top');
        this.$wrapper.classList.add('mip-shell-header-wrapper');
        if (!showHeader) {
          this.$wrapper.classList.add('hide');
        }

        // Header
        this.$el = document.createElement('div');
        this.$el.classList.add('mip-shell-header', 'transition');
        this.renderHeader(this.$el);
        this.$wrapper.insertBefore(this.$el, this.$wrapper.firstChild);

        document.body.insertBefore(this.$wrapper, document.body.firstChild);
      }
    }, {
      key: 'initRouter',
      value: function initRouter() {
        // Init router
        var router = new Router();
        router.init();
        router.listen(this.render.bind(this));
        this.router = router;

        // Handle events emitted by SF
        // DELETE ME
        viewer$1.onMessage('changeState', function (_ref2) {
          var url = _ref2.url;

          router.replace(makeCacheUrl(url, 'url', true));
        });
        viewer$1.onMessage(OUTER_MESSAGE_CHANGE_STATE, function (_ref3) {
          var url = _ref3.url;

          router.replace(makeCacheUrl(url, 'url', true));
        });

        window.MIP_SHELL_OPTION = {
          allowTransition: false,
          isForward: true
        };

        this.messageHandlers.push(function (type, data) {
          // Deal message and operate router
          if (type === MESSAGE_ROUTER_PUSH) {
            if (data.options.allowTransition) {
              window.MIP_SHELL_OPTION.allowTransition = true;
            }
            router.push(data.route);
          } else if (type === MESSAGE_ROUTER_REPLACE) {
            if (data.options.allowTransition) {
              window.MIP_SHELL_OPTION.allowTransition = true;
            }
            router.replace(data.route);
          } else if (type === MESSAGE_ROUTER_BACK) {
            window.MIP_SHELL_OPTION.allowTransition = true;
            window.MIP_SHELL_OPTION.isForward = false;
            router.back();
          } else if (type === MESSAGE_ROUTER_FORWARD) {
            window.MIP_SHELL_OPTION.allowTransition = true;
            router.forward();
          }
        });
      }
    }, {
      key: 'bindRootEvents',
      value: function bindRootEvents() {
        var _this5 = this;

        this.currentViewportHeight = viewport.getHeight();
        this.currentViewportWidth = viewport.getWidth();

        // Receive and resend message
        this.messageHandlers.push(function (type, data) {
          if (type === MESSAGE_BROADCAST_EVENT) {
            // Broadcast Event
            page.broadcastCustomEvent(data);
          } else if (type === MESSAGE_PAGE_RESIZE) {
            _this5.resizeAllPages();
          }
        });

        // update every iframe's height when viewport resizing
        var resizeHandler = function resizeHandler() {
          // only when screen gets spinned
          var currentViewportHeight = viewport.getHeight();
          if (_this5.currentViewportHeight !== currentViewportHeight) {
            _this5.currentViewportWidth = viewport.getWidth();
            _this5.currentViewportHeight = currentViewportHeight;
            _this5.resizeAllPages();
          }
        };
        // viewport.on('resize', resizeHandler)
        setInterval(resizeHandler, 250);

        // Listen events
        window.addEventListener('mipShellEvents', function (e) {
          var _e$detail$ = e.detail[0],
              type = _e$detail$.type,
              data = _e$detail$.data;


          switch (type) {
            case 'updateShell':
              _this5.refreshShell({ pageMeta: data.pageMeta });
              break;
            case 'togglePageMask':
              _this5.togglePageMask(data.toggle, data.options);
              break;
            case 'toggleDropdown':
              _this5.toggleDropdown(data.toggle);
              break;
            case 'toggleTransition':
              _this5.toggleTransition(data.toggle);
              break;
          }
        });

        // Bind DOM events
        this.bindHeaderEvents();

        window.MIP.viewer.eventAction.execute('active', this.element, {});
      }

      /**
       * Render with current route
       *
       * @param {Route} from route
       * @param {Route} to route
       */

    }, {
      key: 'render',
      value: function render$$1(from, to) {
        render(this, from, to);
      }

      /**
       * Render shell header
       * @param {HTMLElement} container container of shell header
       */

    }, {
      key: 'renderHeader',
      value: function renderHeader$$1(container) {
        renderHeader(this, container);
      }

      /**
       * Save scroll position in root page
       */

    }, {
      key: 'saveScrollPosition',
      value: function saveScrollPosition() {
        this.rootPageScrollPosition = viewport.getScrollTop();
      }

      /**
       * Restore scroll position in root page
       */

    }, {
      key: 'restoreScrollPosition',
      value: function restoreScrollPosition() {
        viewport.setScrollTop(this.rootPageScrollPosition);
      }

      /**
       * Handle resize event
       */

    }, {
      key: 'resizeAllPages',
      value: function resizeAllPages() {
        var _this6 = this;

        // 1.set every page's iframe
        Array.prototype.slice.call(document.querySelectorAll('.mip-page__iframe')).forEach(function ($el) {
          $el.style.height = _this6.currentViewportHeight + 'px';
        });
        // 2.notify <mip-iframe> in every page
        page.broadcastCustomEvent({
          name: CUSTOM_EVENT_RESIZE_PAGE,
          data: {
            height: this.currentViewportHeight
          }
        });
      }
    }, {
      key: 'bindHeaderEvents',
      value: function bindHeaderEvents$$1() {
        bindHeaderEvents(this);
      }
    }, {
      key: 'unbindHeaderEvents',
      value: function unbindHeaderEvents$$1() {
        unbindHeaderEvents(this);
      }
    }, {
      key: 'handleClickHeaderButton',
      value: function handleClickHeaderButton(buttonName) {
        if (buttonName === 'back') {
          // **Important** only allow transition happens when Back btn & <a> clicked
          window.MIP_SHELL_OPTION.allowTransition = true;
          window.MIP_SHELL_OPTION.isForward = false;
          page.back();
        } else if (buttonName === 'more') {
          this.toggleDropdown(true);
        } else if (buttonName === 'close') {
          window.MIP.viewer.sendMessage(OUTER_MESSAGE_CLOSE);
        } else if (buttonName === 'cancel') {
          this.toggleDropdown(false);
        }

        this.handleShellCustomButton(buttonName);

        page.emitEventInCurrentPage({
          name: 'shell-header:click-' + buttonName
        });
      }

      /**
       *
       * @param {Object} options
       * @param {Object} pageMeta Updated pageMeta
       * @param {string} pageId Current pageId. If `pageMeta` is not provided, `pageId` will be used to find pageMeta
       * @param {boolean} asyncRefresh `true` when `refreshShell` invoked in `processShellConfig` in async mode
       */

    }, {
      key: 'refreshShell',
      value: function refreshShell() {
        var _this7 = this;

        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            pageMeta = _ref4.pageMeta,
            pageId = _ref4.pageId,
            asyncRefresh = _ref4.asyncRefresh;

        // Unbind header events
        this.unbindHeaderEvents();

        if (pageId) {
          pageMeta = this.findMetaByPageId(pageId);
        }
        this.currentPageMeta = pageMeta;

        if (!(pageMeta.header && pageMeta.header.show)) {
          this.$wrapper.classList.add('hide');
          css(this.$loading, 'display', 'none');
          if (!this.transitionContainsHeader) {
            var headerLogoTitle = this.$el.querySelector('.mip-shell-header-logo-title');
            headerLogoTitle && headerLogoTitle.classList.remove('fade-out');
            toggleFadeHeader(false);
          }
          return;
        }

        // Refresh header
        if (asyncRefresh) {
          // In async mode: (Invoked from `processShellConfig` by user)
          // 1. Render fade header with updated pageMeta
          // 2. Show fade header with trnasition (fade)
          // 3. Wait for transition ending
          // 4. Update real header (along with otherParts, buttonWrapper, buttonMask)
          // 5. Hide fade header
          // 6. Bind header events
          toggleFadeHeader(true, pageMeta);
          setTimeout(function () {
            _this7.renderHeader(_this7.$el);
            toggleFadeHeader(false);
            // Rebind header events
            _this7.bindHeaderEvents();
          }, 350);
        } else {
          // In sync mode: (Invoked from event 'updateShell' by MIP Page)
          // 1. Update real header (along with otherParts, buttonWrapper, buttonMask)
          // 2. Bind header events
          // 3. Wait for transition ending
          // 4. Hide fade header (Fade header was shown in MIP Page)
          this.renderHeader(this.$el);
          css(this.$loading, 'display', 'none');
        }

        this.updateOtherParts();

        // Button wrapper & mask
        var buttonGroup = pageMeta.header.buttonGroup;

        var _createMoreButtonWrap2 = createMoreButtonWrapper(buttonGroup, { update: true }),
            mask = _createMoreButtonWrap2.mask,
            buttonWrapper = _createMoreButtonWrap2.buttonWrapper;

        this.$buttonMask = mask;
        this.$buttonWrapper = buttonWrapper;

        this.$wrapper.classList.remove('hide');

        if (!asyncRefresh) {
          if (!this.transitionContainsHeader) {
            var _headerLogoTitle = this.$el.querySelector('.mip-shell-header-logo-title');
            _headerLogoTitle && _headerLogoTitle.classList.remove('fade-out');
            toggleFadeHeader(false);
          }

          // Rebind header events
          this.bindHeaderEvents();
        }
      }

      /**
       * Toggle more button wrapper
       *
       * @param {boolean} toggle display or not
       */

    }, {
      key: 'toggleDropdown',
      value: function toggleDropdown(toggle) {
        toggleInner(this.$buttonMask, toggle);
        toggleInner(this.$buttonWrapper, toggle, { transitionName: 'slide' });
      }

      /**
       * Toggle display of page mask
       * Mainly used to cover header in iframes
       *
       * @param {boolean} toggle display or not
       * @param {Object} options
       * @param {boolean} options.skipTransition show result without transition
       */

    }, {
      key: 'togglePageMask',
      value: function togglePageMask(toggle) {
        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            skipTransition = _ref5.skipTransition,
            extraClass = _ref5.extraClass;

        if (!isHeaderShown) {
          return;
        }

        if (extraClass) {
          toggle ? this.$pageMask.classList.add(extraClass) : this.$pageMask.classList.remove(extraClass);
        }

        toggleInner(this.$pageMask, toggle, { skipTransition: skipTransition });
      }

      /**
       * Toggle something
       *
       * @param {HTMLElement} dom
       * @param {boolean} toggle
       * @param {Object} options
       * @param {boolean} options.skipTransition Show result without transition
       * @param {boolean} options.transitionName Transition name. Defaults to 'fade'
       */

    }, {
      key: 'toggleDOM',
      value: function toggleDOM(dom$$1, toggle, options) {
        toggleInner(dom$$1, toggle, options);
      }

      /**
       * Toggle header transition class
       * Remove transition during page switching
       *
       * @param {boolean} toggle
       */

    }, {
      key: 'toggleTransition',
      value: function toggleTransition(toggle) {
        toggle ? this.$el.classList.add('transition') : this.$el.classList.remove('transition');
      }

      // ===================== All Page Functions =====================

    }, {
      key: 'bindAllEvents',
      value: function bindAllEvents() {
        var _this8 = this;

        // Don't let browser restore scroll position.
        if (!window.MIP.standalone && 'scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }

        var showHeader = this.currentPageMeta.header.show;
        // Set `padding-top` on scroller

        if (showHeader) {
          document.body.classList.add('with-header');
        }

        // Cross origin
        this.messageHandlers.push(function (type, data) {
          if (type === MESSAGE_CROSS_ORIGIN) {
            customEmit(window, data.name, data.data);
          }
        });

        window.addEventListener('message', function (e) {
          try {
            _this8.messageHandlers.forEach(function (handler) {
              handler.call(_this8, e.data.type, e.data.data || {});
            });
          } catch (e) {
            // Message sent from SF will cause cross domain error when reading e.source.location
            // Just ignore these messages.
          }
        }, false);
      }
    }, {
      key: 'updateShellConfig',
      value: function updateShellConfig(newShellConfig) {
        if (page.isRootPage) {
          window.MIP_SHELL_CONFIG = newShellConfig.routes;
          window.MIP_PAGE_META_CACHE = Object.create(null);
          page.notifyRootPage({
            type: 'set-mip-shell-config',
            data: {
              shellConfig: newShellConfig.routes,
              update: true
            }
          });
        }
      }

      /**
       * find route.meta by pageId
       *
       * @param {string} pageId pageId
       * @return {Object} meta object
       */

    }, {
      key: 'findMetaByPageId',
      value: function findMetaByPageId(pageId) {
        var target = void 0;
        if (!page.isRootPage && !page.isCrossOrigin) {
          target = window.parent;
        } else {
          target = window;
        }

        if (target.MIP_PAGE_META_CACHE[pageId]) {
          return target.MIP_PAGE_META_CACHE[pageId];
        } else {
          for (var i = 0; i < target.MIP_SHELL_CONFIG.length; i++) {
            var route = target.MIP_SHELL_CONFIG[i];
            if (route.regexp.test(pageId)) {
              target.MIP_PAGE_META_CACHE[pageId] = route.meta;
              return route.meta;
            }
          }
        }

        console.warn('Cannot find MIP Shell Config for current page. Use default instead.');
        return Object.assign({}, DEFAULT_SHELL_CONFIG);
      }

      // ===================== Interfaces =====================

    }, {
      key: 'processShellConfig',
      value: function processShellConfig(shellConfig) {
        // Change shell config
        // E.g. `shellConfig.routes.forEach(route => route.meta.header.buttonGroup = [])` forces empty buttons
      }
    }, {
      key: 'processShellConfigInLeaf',
      value: function processShellConfigInLeaf(shellConfig, matchIndex) {
        // Change shell config in leaf page
        // E.g. `shellConfig.routes[matchIndex].meta.header.bouncy = false` disables bouncy feature
        // Only works when `alwaysReadConfigOnLoad` equals `true`
      }
    }, {
      key: 'handleShellCustomButton',
      value: function handleShellCustomButton(buttonName) {
        // Handle click on custom button
        // The only param `butonName` equals attribute values of `data-button-name`
        // E.g. click on `<div mip-header-btn data-button-name="hello"></div>` will pass `'hello'` as buttonName
      }
    }, {
      key: 'renderOtherParts',
      value: function renderOtherParts() {
        // Render other shell parts (except header)
        // Use `this.currentPageMeta` to get page config
        // E.g. footer, sidebar
      }
    }, {
      key: 'renderOtherPartsAsync',
      value: function renderOtherPartsAsync() {
        // Render other shell parts (async version for performance's sake)
        // Use `this.currentPageMeta` to get page config
        // E.g. footer, sidebar
      }
    }, {
      key: 'updateOtherParts',
      value: function updateOtherParts() {
        // Update other shell parts (except header)
        // Use `this.currentPageMeta` to get page config
        // E.g. footer, sidebar
      }
    }, {
      key: 'showHeaderCloseButton',
      value: function showHeaderCloseButton() {
        // Whether show close button in header
        // Only effective when window.MIP.standalone = false
        return true;
      }
    }, {
      key: 'beforeSwitchPage',
      value: function beforeSwitchPage(options) {
        // Operations before switch page transition
        // params `options` contains:
        // targetPageId
        // targetPageMeta
        // sourcePageId
        // sourcePageMeta
        // newPage, true/false, whether a new frame should be created
        // isForward, true/false, indicates transition direction
      }
    }, {
      key: 'afterSwitchPage',
      value: function afterSwitchPage(options) {
        // Operations before switch page transition
        // params `options` contains:
        // targetPageId
        // targetPageMeta
        // sourcePageId
        // sourcePageMeta
        // newPage, true/false, whether a new frame should be created
        // isForward, true/false, indicates transition direction
      }
    }]);
    return MipShell;
  }(CustomElement);

  /* eslint-disable */
  var define$1, require, esl;!function (n) {
    function e(n, e) {
      d(n, e) || (H[n] = Math.max(H[n] || 0, e));
    }function t(n, e) {
      function t(n) {
        0 === n.indexOf(".") && o.push(n);
      }var o = [];if ("string" == typeof n ? t(n) : U(n, function (n) {
        t(n);
      }), o.length > 0) throw new Error("[REQUIRE_FATAL]Relative ID is not allowed in global require: " + o.join(", "));var i = J.waitSeconds;return i && n instanceof Array && (F && clearTimeout(F), F = setTimeout(r, 1e3 * i)), Z(n, e);
    }function r() {
      function n(a, u) {
        if (!i[a] && !d(a, G)) {
          i[a] = 1;var f = L[a];f ? (u || !d(a, C) || f.hang) && (r[a] || (r[a] = 1, e.push(a)), U(f.depMs, function (e) {
            n(e.absId, e.hard);
          })) : o[a] || (o[a] = 1, t.push(a));
        }
      }var e = [],
          t = [],
          r = {},
          o = {},
          i = {};for (var a in H) {
        H[a] >= G && n(a, 1);
      }if (e.length || t.length) throw new Error("[MODULE_TIMEOUT]Hang: " + (e.join(", ") || "none") + "; Miss: " + (t.join(", ") || "none"));
    }function o(n) {
      U(W, function (e) {
        U(n, function (n) {
          u(n, e.deps, e.factory);
        });
      }), W.length = 0;
    }function i(n, e, t) {
      if (null == t && (null == e ? (t = n, n = null) : (t = e, e = null, n instanceof Array && (e = n, n = null))), null != t) {
        var r,
            o = window.opera;if (!n && document.attachEvent && (!o || "[object Opera]" !== o.toString())) {
          var i = T();r = i && ee[i.getAttribute("data-src")];
        }n ? u(n, e, t) : r ? U(r, function (n) {
          u(n, e, t);
        }) : W[0] = { deps: e, factory: t };
      }
    }function a() {
      var n = J.config[this.id];return n && "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? n : {};
    }function u(n, e, t) {
      L[n] || (L[n] = { id: n, depsDec: e, deps: e || ["require", "exports", "module"], factoryDeps: [], factory: t, exports: {}, config: a, state: 0, require: I(n), depMs: [], depMkv: {}, depRs: [], hang: 0 }, g(n, z));
    }function f(n) {
      var e = L[n];if (e && !d(n, B)) {
        var t = e.deps,
            r = e.factory,
            o = 0;"function" == typeof r && (o = Math.min(r.length, t.length), !e.depsDec && r.toString().replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, "").replace(/require\(\s*(['"])([^'"]+)\1\s*\)/g, function (n, e, r) {
          t.push(r);
        }));var i = [],
            a = [];U(t, function (t, r) {
          var u,
              f,
              c = R(t),
              s = S(c.mod, n);s && !Y[s] ? (c.res && (f = { id: t, mod: s, res: c.res }, a.push(t), e.depRs.push(f)), u = e.depMkv[s], u || (u = { id: c.mod, absId: s, hard: o > r }, e.depMs.push(u), e.depMkv[s] = u, i.push(s))) : u = { absId: s }, o > r && e.factoryDeps.push(f || u);
        }), g(n, B), l(n), b(i), a.length && e.require(a, function () {
          U(e.depRs, function (e) {
            e.absId || (e.absId = S(e.id, n));
          }), c();
        });
      }
    }function c() {
      for (var n in H) {
        var e = H[n];e >= C && (f(n), s(n)), e >= G && p(n);
      }
    }function s(n) {
      function e(n) {
        if (f(n), !d(n, B)) return !1;if (d(n, C) || t[n]) return !0;t[n] = 1;var r = L[n],
            o = !0;return U(r.depMs, function (n) {
          o = e(n.absId) && o;
        }), o && U(r.depRs, function (n) {
          return o = !!n.absId;
        }), o && (g(n, C), t[n] = 0), o;
      }var t = {};e(n);
    }function l(e) {
      function t() {
        if (!r && o.state === C) {
          r = 1;var t = 1;if (U(o.factoryDeps, function (n) {
            var e = n.absId;return Y[e] ? void 0 : (p(e), t = d(e, G));
          }), t) {
            try {
              var i = o.factory,
                  a = "function" == typeof i ? i.apply(n, v(o.factoryDeps, { require: o.require, exports: o.exports, module: o })) : i;null != a && (o.exports = a), o.invokeFactory = null;
            } catch (u) {
              if (/^\[MODULE_MISS\]"([^"]+)/.test(u.message)) {
                var f = o.depMkv[RegExp.$1];return f && (f.hard = 1), void (r = 0);
              }throw o.hang = 1, u;
            }m(e);
          }
        }
      }var r,
          o = L[e];o.invokeFactory = t;
    }function d(n, e) {
      return L[n] && L[n].state >= e;
    }function p(n) {
      var e = L[n];e && e.invokeFactory && e.invokeFactory();
    }function v(n, e) {
      var t = [];return U(n, function (n, r) {
        "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && (n = n.absId), t[r] = e[n] || L[n].exports;
      }), t;
    }function h(n, e, t) {
      if (d(n, e)) return void t();var r = X[e][n];r || (r = X[e][n] = []), r.push(t);
    }function g(n, e) {
      if (!d(n, e)) {
        var t = L[n];t.state = e;var r = X[e][n];X[e][n] = null, U(r, function (n) {
          n();
        });var o = J[X[e][":hook"]];"function" == typeof o && o(t.id, t.deps, t.factory), r = K[n];var i = r && r[e];U(i, function (n) {
          n(t.id, t.deps, t.factory);
        });
      }
    }function m(n) {
      delete H[n], g(n, G);
    }function y(n) {
      return L[n] ? L[n].state : Q[n] ? _ : P;
    }function b(e, t, r) {
      function o() {
        if ("function" == typeof t && !i) {
          var r = 1;U(e, function (n) {
            return Y[n] ? void 0 : r = !!d(n, G);
          }), r && (i = 1, t.apply(n, v(e, Y)));
        }
      }var i = 0;U(e, function (n) {
        if (!Y[n] && !d(n, G)) {
          h(n, G, o);var e,
              t = { id: n, load: function load(e) {
              Q[n] || L[n] || E(n, e);
            }, getModuleState: y };Q[n] || L[n] || (U(V, function (n) {
            return e = n(t, c), "undefined" == typeof e;
          }), "string" == typeof e ? E(n, e) : e !== !1 && (n.indexOf("!") > 0 ? k(n, r) : E(n)));
        }
      }), o();
    }function E(e, t) {
      function r() {
        ee[t] || (ee[t] = []), ee[t].push(e), $(t, e, function () {
          if (u) {
            var r;"function" == typeof u.init && (r = u.init.apply(n, v(f, Y))), null == r && u.exports && (r = n, U(u.exports.split("."), function (n) {
              return r = r[n], !!r;
            })), i(e, f, function () {
              return r || {};
            });
          } else o(ee[t]);c();
        });
      }Q[e] = 1;var a = A(e) || e;t = t || w(a + ".js");var u = J.shim[e];u instanceof Array && (J.shim[e] = u = { deps: u });var f = u && (u.deps || []);f ? (U(f, function (n) {
        J.shim[n] || (J.shim[n] = {});
      }), Z(f, r)) : r();
    }function k(n, e) {
      function t(e) {
        f.exports = e || !0, m(n);
      }function r(r) {
        var o = e ? L[e].require : Z;r.load(u.res, o, t, a.call({ id: n }));
      }var i = A(n);if (i) return void E(i);var u = R(n),
          f = { id: n, state: B };L[n] = f, t.fromText = function (n, e) {
        new Function(e)(), o([n]);
      }, r(Z(u.mod));
    }function x(n, e) {
      var t = [];for (var r in n) {
        n.hasOwnProperty(r) && t.push({ k: r, v: n[r], reg: "*" === r && e ? /^/ : j(r) });
      }return t.sort(N), t;
    }function M() {
      function n(n) {
        n instanceof RegExp ? ae.push([n, a]) : ie[q(n)] = S(a);
      }J.baseUrl = J.baseUrl.replace(/\/$/, "") + "/", te = x(J.paths), oe = x(J.map, 1), U(oe, function (n) {
        n.v = x(n.v);
      });var e = oe[oe.length - 1];e && "*" === e.k && U(oe, function (n) {
        n !== e && (n.v = n.v.concat(e.v));
      });var t = {},
          r = J.packages.length;for (re = []; r--;) {
        var o,
            i = J.packages[r];switch (typeof i === "undefined" ? "undefined" : _typeof(i)) {case "string":
            o = { name: i.split("/")[0], location: i };break;case "object":
            o = { name: i.name, location: i.location, main: i.main };}t[o.name] || (t[o.name] = 1, o.location = o.location || o.name, o.main = (o.main || "main").replace(/\.js$/i, ""), o.reg = j(o.name), re.push(o));
      }re.sort(N), ue = x(J.urlArgs, 1), ie = {}, ae = [];for (var a in J.bundles) {
        U(J.bundles[a], n);
      }
    }function A(n) {
      var e = ie[n];return e || U(ae, function (t) {
        return t[0].test(n) ? (e = t[1], !1) : void 0;
      }), e;
    }function D(n, e, t) {
      U(e, function (e) {
        return e.reg.test(n) ? (t(e.v, e.k, e), !1) : void 0;
      });
    }function w(n, e) {
      var t = /(\.[a-z0-9]+)$/i,
          r = /(\?[^#]*)$/,
          o = "",
          i = n,
          a = "";r.test(n) && (a = RegExp.$1, n = n.replace(r, "")), t.test(n) && (o = RegExp.$1, i = n.replace(t, "")), null != e && (i = S(i, e));var u,
          f = i;return D(i, te, function (n, e) {
        f = f.replace(e, n), u = 1;
      }), u || D(i, re, function (n, e, t) {
        f = f.replace(t.name, t.location);
      }), /^([a-z]{2,10}:\/)?\//i.test(f) || (f = J.baseUrl + f), f += o + a, D(i, ue, function (n) {
        f += (f.indexOf("?") > 0 ? "&" : "?") + n;
      }), f;
    }function I(n) {
      function t(t, r) {
        var o = [],
            i = [];return U(t, function (t, a) {
          var u = R(t),
              f = S(u.mod, n),
              c = u.res,
              s = f;if (c) {
            var l = f + "!" + c;0 !== c.indexOf(".") && A(l) ? f = s = l : s = null;
          }i[a] = s, e(f, r), o.push(f);
        }), { mods: o, ids: i };
      }function r(r, i) {
        if ("string" == typeof r) {
          if (!o[r]) {
            var a = S(r, n);if (p(a), !d(a, G)) throw new Error('[MODULE_MISS]"' + a + '" is not exists!');o[r] = L[a].exports;
          }return o[r];
        }if (r instanceof Array) {
          var u = t(r, G);b(u.mods, function () {
            U(u.ids, function (t, o) {
              null == t && (t = u.ids[o] = S(r[o], n), e(t, G));
            }), b(u.ids, i, n), c();
          }, n), c();
        }
      }var o = {};return r.toUrl = function (e) {
        return w(e, n || "");
      }, r.fetch = function (n, e) {
        function r() {
          o++, o >= n.length && e();
        }var o = 0,
            i = t(n, C);U(i.mods, function (n) {
          h(n, C, r);
        }), b(i.mods), c();
      }, r;
    }function S(n, e) {
      if (!n) return "";e = e || "";var t = R(n);if (!t) return n;var r = t.res,
          o = O(t.mod, e);if (D(e, oe, function (n) {
        D(o, n, function (n, e) {
          o = o.replace(e, n);
        });
      }), o = q(o), r) {
        var i = d(o, G) && Z(o);r = i && i.normalize ? i.normalize(r, function (n) {
          return S(n, e);
        }) : S(r, e), o += "!" + r;
      }return o;
    }function q(n) {
      return U(re, function (e) {
        var t = e.name;return t === n ? (n = t + "/" + e.main, !1) : void 0;
      }), n;
    }function O(n, e) {
      if (0 !== n.indexOf(".")) return n;for (var t = e.split("/").slice(0, -1).concat(n.split("/")), r = [], o = 0; o < t.length; o++) {
        var i = t[o];switch (i) {case ".":
            break;case "..":
            r.length && ".." !== r[r.length - 1] ? r.pop() : r.push(i);break;default:
            i && r.push(i);}
      }return r.join("/");
    }function R(n) {
      var e = n.split("!");return e[0] ? { mod: e[0], res: e[1] } : void 0;
    }function j(n) {
      return new RegExp("^" + n + "(/|$)");
    }function U(n, e) {
      if (n instanceof Array) for (var t = 0, r = n.length; r > t && e(n[t], t) !== !1; t++) {}
    }function N(n, e) {
      var t = n.k || n.name,
          r = e.k || e.name;return "*" === r ? -1 : "*" === t ? 1 : r.length - t.length;
    }function T() {
      if (fe) return fe;if (ce && "interactive" === ce.readyState) return ce;for (var n = document.getElementsByTagName("script"), e = n.length; e--;) {
        var t = n[e];if ("interactive" === t.readyState) return ce = t, t;
      }
    }function $(n, e, t) {
      function r() {
        var n = o.readyState;("undefined" == typeof n || /^(loaded|complete)$/.test(n)) && (o.onload = o.onreadystatechange = null, o = null, t());
      }if (!ne[n]) {
        ne[n] = 1;var o = document.createElement("script");o.setAttribute("data-src", n), o.src = n, o.async = !0, o.readyState ? o.onreadystatechange = r : o.onload = r;var i = J.onNodeCreated;"function" == typeof i && i(o, J, e, n), fe = o, le ? se.insertBefore(o, le) : se.appendChild(o), fe = null;
      }
    }var F,
        L = {},
        P = -1,
        _ = 0,
        z = 1,
        B = 2,
        C = 3,
        G = 4,
        H = {},
        Q = {},
        Y = { require: t, exports: 1, module: 1 },
        Z = I(),
        J = { baseUrl: "./", paths: {}, config: {}, map: {}, packages: [], shim: {}, waitSeconds: 0, bundles: {}, urlArgs: {} };t.version = "2.2.1", t.toUrl = Z.toUrl, t.fetch = Z.fetch, t.ModuleState = { NOT_FOUND: P, LOADING: _, PRE_DEFINED: z, ANALYZED: B, PREPARED: C, DEFINED: G };var K = {};t.listenModuleStateChange = function (n, e, t) {
      if ("function" == typeof t && e >= z && G >= e) if (d(n, e)) {
        var r = L[n];t(r.id, r.deps, r.factory);
      } else {
        var o = K[n];o || (o = K[n] = {}), o[e] = o[e] || [], o[e].push(t);
      }
    }, t.unlistenModuleStateChange = function (n, e, t) {
      var r = K[n];if (r) if (t) for (var o = r[e], i = o && o.length; i--;) {
        o[i] === t && o.splice(i, 1);
      } else r[e] = null;
    }, t.undef = function (n) {
      delete Q[n], delete L[n];
    };var V = [];t.addLoader = function (n) {
      "function" == typeof n && V.push(n);
    }, t.removeLoader = function (n) {
      for (var e = V.length; e--;) {
        n === V[e] && V.splice(e, 1);
      }
    };var W = [];i.amd = {};var X = {};X[B] = { ":hook": "onModuleAnalyzed" }, X[G] = { ":hook": "onModuleDefined" }, X[z] = { ":hook": "onModulePreDefined" }, X[C] = { ":hook": "onModulePrepared" };var ne = {},
        ee = {};t.config = function (n) {
      if (n) {
        for (var e in n) {
          var t = n[e],
              r = J[e];if (0 === e.indexOf("on")) J[e] = t;else if ("urlArgs" === e && "string" == typeof t) J.urlArgs["*"] = t;else if (r instanceof Array) r.push.apply(r, t);else if (null != r) if ("object" == (typeof r === "undefined" ? "undefined" : _typeof(r))) for (var o in t) {
            r[o] = t[o];
          } else J[e] = t;
        }M();
      }
    }, M();var te,
        re,
        oe,
        ie,
        ae,
        ue,
        fe,
        ce,
        se = document.getElementsByTagName("head")[0],
        le = document.getElementsByTagName("base")[0];le && (se = le.parentNode), define$1 || (define$1 = i, "function" != typeof require && (t.config(require), require = t), "function" != typeof esl && (t.config(esl), esl = t), "undefined" != typeof requirejs && "function" != typeof requirejs && t.config(requirejs));var de;!function () {
      for (var n = document.getElementsByTagName("script"), e = n.length; e--;) {
        var t = n[e];if (de = t.getAttribute("data-main")) break;
      }
    }(), de && setTimeout(function () {
      t([de]);
    }, 4);
  }(window);window.define = define$1;window.require = require;window.esl = esl;

  /**
   * @file Custom Element
   * @author xx
   */

  /**
   * The constructor of  base class of custom element
   *
   * @param {MIPElement} element element
   * @class
   */
  function customElement(element) {
    /**
     * @type {MIPElement}
     * @public
     */
    this.element = element;
    if (this.init) {
      this.init();
    }
  }

  /**
   * Apply the fill content style to an element
   *
   * @param {HTMLElement} ele element
   * @param {boolean} isReplaced whether replaced or not
   */
  customElement.prototype.applyFillContent = function (ele, isReplaced) {
    ele.classList.add('mip-fill-content');
    if (isReplaced) {
      ele.classList.add('mip-replaced-content');
    }
  };

  /**
   * Called when the MIPElement is created.
   */
  customElement.prototype.createdCallback = function () {};

  /**
   * Called when the MIPElement is inserted into the DOM.
   */
  customElement.prototype.attachedCallback = function () {};

  /**
   * Called when the MIPElement is removed from the DOM.
   */
  customElement.prototype.detachedCallback = function () {};

  /**
   * Called when the MIPElement's attribute is changed.
   */
  customElement.prototype.attributeChangedCallback = function () {};

  /**
   * Called when the MIPElement first enters the viewport.
   */
  customElement.prototype.firstInviewCallback = function () {};

  /**
   * Called when the MIPElement has entered or exited the viewport.
   */
  customElement.prototype.viewportCallback = function () {};

  /**
   * Control whether the MIPElement is rendred ahead.
   *
   * @return {boolean} If the result is TRUE, the element will be rendred ahead.
   */
  customElement.prototype.prerenderAllowed = function () {
    return false;
  };

  /**
   * Return the current component containing resources.
   * If it returns true, complete should be called.
   *
   * @return {boolean} whether has resource or not
   */
  customElement.prototype.hasResources = function () {
    return false;
  };

  /**
   * Called when the MIPElement is first inserted into the document.
   */
  customElement.prototype.build = function () {};

  /**
   * Expend current element's attributes which selected by attrs to an other object.
   *
   * @param {Array.<string>} attrs Attributes' name list
   * @param {Object} element The target element
   * @return {Object}
   */
  customElement.prototype.expendAttr = function (attrs, element) {
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      if (this.element.hasAttribute(attr)) {
        var val = this.element.getAttribute(attr);
        element.setAttribute ? element.setAttribute(attr, val) : element[attr] = val;
      }
    }
    return element;
  };

  /**
   * Add event actions such as `this.addEventAction("default open", handler)`
   *
   * @param {string} name event name
   * @param {Function} handler event handler
   */
  customElement.prototype.addEventAction = function () /* name, handler */{
    var evt = this._actionEvent;
    if (!evt) {
      evt = this._actionEvent = new EventEmitter();
      evt.setEventContext(this);
    }

    evt.on.apply(evt, arguments);
  };

  /**
   * Trigger the handlers had been added by `addEventAction` of an action
   *
   * @param {string} action The action's name
   */
  customElement.prototype.executeEventAction = function (action) {
    var eventObj = this._actionEvent;
    if (action && eventObj) {
      eventObj.trigger(action.handler, action.event, action.arg);
    }
  };

  /**
   * Notice that resources are loaded.
   * @deprecated
   */
  customElement.prototype.resourcesComplete = function () {
    this.element.resourcesComplete();
  };

  var customElement$1 = {

    /**
     * Create a class of a new type mip element
     *
     * @return {Function}
     */
    create: function create() {
      function impl(element) {
        customElement.call(this, element);
      }
      impl.prototype = Object.create(customElement.prototype);
      return impl;
    }
  };

  /**
   * @file mip1-polyfill MIP2 兼容 MIP1 的方式之一
   * @author sekiyika(pengxing@baidu.com)
   */

  // 将 jquery 配置为远程的，需要时才引入
  window.require.config({
    paths: {
      'searchbox/openjs/aio': '//m.baidu.com/static/searchbox/openjs/aio.js?v=201606',
      jquery: '//c.mipcdn.com/static/deps/jquery',
      zepto: '//c.mipcdn.com/static/deps/zepto'
    }
  });

  window.define('util', function () {
    return util;
  });
  window.define('viewer', function () {
    return viewer;
  });
  window.define('viewport', function () {
    return viewport;
  });
  window.define('templates', function () {
    return templates;
  });
  window.define('customElement', function () {
    return customElement$1;
  });
  window.define('performance', function () {
    return performance;
  });
  window.define('utils/customStorage', function () {
    return util.customStorage;
  });
  window.define('fetch-jsonp', function () {
    return window.fetchJsonp;
  });
  window.define('fixed-element', function () {
    return fixedElement;
  });
  window.define('hash', function () {
    return hash;
  });
  window.define('dom/event', function () {
    return util.event;
  });
  window.define('mip', function () {
    return window.MIP;
  });
  window.define('naboo', function () {
    return util.naboo;
  });
  window.define('dom/css-loader', function () {
    return cssLoader;
  });
  window.define('dom/css', function () {
    return util.css;
  });
  window.define('dom/dom', function () {
    return util.dom;
  });
  window.define('dom/rect', function () {
    return util.rect;
  });
  window.define('utils/event-action', function () {
    return EventAction;
  });
  window.define('utils/event-emitter', function () {
    return util.EventEmitter;
  });
  window.define('utils/fn', function () {
    return util.fn;
  });
  window.define('utils/platform', function () {
    return util.platform;
  });
  window.define('utils/gesture', function () {
    return util.Gesture;
  });

  function install(mip) {
    Object.assign(mip, {
      /**
       * register mip1 element
       *
       * @deprecated
       * @param {string} name element tag name
       * @param {string} clazz class
       * @param {string} css css
       */
      registerMipElement: function registerMipElement(name, clazz, css) {
        if (templates.isTemplateClass(clazz)) {
          mip.registerTemplate(name, clazz, { version: '1' });
        } else {
          mip.registerElement(name, clazz, css, { version: '1' });
        }
      }
    });
  }

  var commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function unwrapExports(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }function createCommonjsModule(e, t) {
    return e(t = { exports: {} }, t.exports), t.exports;
  }var ceil = Math.ceil,
      floor = Math.floor,
      _toInteger = function _toInteger(e) {
    return isNaN(e = +e) ? 0 : (e > 0 ? floor : ceil)(e);
  },
      _defined = function _defined(e) {
    if (void 0 == e) throw TypeError("Can't call method on  " + e);return e;
  },
      _stringAt = function _stringAt(e) {
    return function (t, r) {
      var o,
          n,
          i = String(_defined(t)),
          a = _toInteger(r),
          s = i.length;return a < 0 || a >= s ? e ? "" : void 0 : (o = i.charCodeAt(a)) < 55296 || o > 56319 || a + 1 === s || (n = i.charCodeAt(a + 1)) < 56320 || n > 57343 ? e ? i.charAt(a) : o : e ? i.slice(a, a + 2) : n - 56320 + (o - 55296 << 10) + 65536;
    };
  },
      _library = !0,
      _global = createCommonjsModule(function (e) {
    var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = t);
  }),
      _core = createCommonjsModule(function (e) {
    var t = e.exports = { version: "2.5.7" };"number" == typeof __e && (__e = t);
  }),
      _core_1 = _core.version,
      _aFunction = function _aFunction(e) {
    if ("function" != typeof e) throw TypeError(e + " is not a function!");return e;
  },
      _ctx = function _ctx(e, t, r) {
    if (_aFunction(e), void 0 === t) return e;switch (r) {case 1:
        return function (r) {
          return e.call(t, r);
        };case 2:
        return function (r, o) {
          return e.call(t, r, o);
        };case 3:
        return function (r, o, n) {
          return e.call(t, r, o, n);
        };}return function () {
      return e.apply(t, arguments);
    };
  },
      _isObject = function _isObject(e) {
    return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? null !== e : "function" == typeof e;
  },
      _anObject = function _anObject(e) {
    if (!_isObject(e)) throw TypeError(e + " is not an object!");return e;
  },
      _fails = function _fails(e) {
    try {
      return !!e();
    } catch (e) {
      return !0;
    }
  },
      _descriptors = !_fails(function () {
    return 7 != Object.defineProperty({}, "a", { get: function get$$1() {
        return 7;
      } }).a;
  }),
      document$1 = _global.document,
      is = _isObject(document$1) && _isObject(document$1.createElement),
      _domCreate = function _domCreate(e) {
    return is ? document$1.createElement(e) : {};
  },
      _ie8DomDefine = !_descriptors && !_fails(function () {
    return 7 != Object.defineProperty(_domCreate("div"), "a", { get: function get$$1() {
        return 7;
      } }).a;
  }),
      _toPrimitive = function _toPrimitive(e, t) {
    if (!_isObject(e)) return e;var r, o;if (t && "function" == typeof (r = e.toString) && !_isObject(o = r.call(e))) return o;if ("function" == typeof (r = e.valueOf) && !_isObject(o = r.call(e))) return o;if (!t && "function" == typeof (r = e.toString) && !_isObject(o = r.call(e))) return o;throw TypeError("Can't convert object to primitive value");
  },
      dP = Object.defineProperty,
      f = _descriptors ? Object.defineProperty : function (e, t, r) {
    if (_anObject(e), t = _toPrimitive(t, !0), _anObject(r), _ie8DomDefine) try {
      return dP(e, t, r);
    } catch (e) {}if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");return "value" in r && (e[t] = r.value), e;
  },
      _objectDp = { f: f },
      _propertyDesc = function _propertyDesc(e, t) {
    return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
  },
      _hide = _descriptors ? function (e, t, r) {
    return _objectDp.f(e, t, _propertyDesc(1, r));
  } : function (e, t, r) {
    return e[t] = r, e;
  },
      hasOwnProperty$1 = {}.hasOwnProperty,
      _has = function _has(e, t) {
    return hasOwnProperty$1.call(e, t);
  },
      PROTOTYPE = "prototype",
      $export = function $export(e, t, r) {
    var o,
        n,
        i,
        a = e & $export.F,
        s = e & $export.G,
        c = e & $export.S,
        l = e & $export.P,
        u = e & $export.B,
        f = e & $export.W,
        _ = s ? _core : _core[t] || (_core[t] = {}),
        p = _[PROTOTYPE],
        d = s ? _global : c ? _global[t] : (_global[t] || {})[PROTOTYPE];for (o in s && (r = t), r) {
      (n = !a && d && void 0 !== d[o]) && _has(_, o) || (i = n ? d[o] : r[o], _[o] = s && "function" != typeof d[o] ? r[o] : u && n ? _ctx(i, _global) : f && d[o] == i ? function (e) {
        var t = function t(_t, r, o) {
          if (this instanceof e) {
            switch (arguments.length) {case 0:
                return new e();case 1:
                return new e(_t);case 2:
                return new e(_t, r);}return new e(_t, r, o);
          }return e.apply(this, arguments);
        };return t[PROTOTYPE] = e[PROTOTYPE], t;
      }(i) : l && "function" == typeof i ? _ctx(Function.call, i) : i, l && ((_.virtual || (_.virtual = {}))[o] = i, e & $export.R && p && !p[o] && _hide(p, o, i)));
    }
  };$export.F = 1, $export.G = 2, $export.S = 4, $export.P = 8, $export.B = 16, $export.W = 32, $export.U = 64, $export.R = 128;var _export = $export,
      _redefine = _hide,
      _iterators = {},
      toString$1 = {}.toString,
      _cof = function _cof(e) {
    return toString$1.call(e).slice(8, -1);
  },
      _iobject = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
    return "String" == _cof(e) ? e.split("") : Object(e);
  },
      _toIobject = function _toIobject(e) {
    return _iobject(_defined(e));
  },
      min = Math.min,
      _toLength = function _toLength(e) {
    return e > 0 ? min(_toInteger(e), 9007199254740991) : 0;
  },
      max$1 = Math.max,
      min$1 = Math.min,
      _toAbsoluteIndex = function _toAbsoluteIndex(e, t) {
    return (e = _toInteger(e)) < 0 ? max$1(e + t, 0) : min$1(e, t);
  },
      _arrayIncludes = function _arrayIncludes(e) {
    return function (t, r, o) {
      var n,
          i = _toIobject(t),
          a = _toLength(i.length),
          s = _toAbsoluteIndex(o, a);if (e && r != r) {
        for (; a > s;) {
          if ((n = i[s++]) != n) return !0;
        }
      } else for (; a > s; s++) {
        if ((e || s in i) && i[s] === r) return e || s || 0;
      }return !e && -1;
    };
  },
      _shared = createCommonjsModule(function (e) {
    var t = _global["__core-js_shared__"] || (_global["__core-js_shared__"] = {});(e.exports = function (e, r) {
      return t[e] || (t[e] = void 0 !== r ? r : {});
    })("versions", []).push({ version: _core.version, mode: "pure", copyright: "© 2018 Denis Pushkarev (zloirock.ru)" });
  }),
      id = 0,
      px = Math.random(),
      _uid = function _uid(e) {
    return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++id + px).toString(36));
  },
      shared = _shared("keys"),
      _sharedKey = function _sharedKey(e) {
    return shared[e] || (shared[e] = _uid(e));
  },
      arrayIndexOf = _arrayIncludes(!1),
      IE_PROTO = _sharedKey("IE_PROTO"),
      _objectKeysInternal = function _objectKeysInternal(e, t) {
    var r,
        o = _toIobject(e),
        n = 0,
        i = [];for (r in o) {
      r != IE_PROTO && _has(o, r) && i.push(r);
    }for (; t.length > n;) {
      _has(o, r = t[n++]) && (~arrayIndexOf(i, r) || i.push(r));
    }return i;
  },
      _enumBugKeys = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
      _objectKeys = Object.keys || function (e) {
    return _objectKeysInternal(e, _enumBugKeys);
  },
      _objectDps = _descriptors ? Object.defineProperties : function (e, t) {
    _anObject(e);for (var r, o = _objectKeys(t), n = o.length, i = 0; n > i;) {
      _objectDp.f(e, r = o[i++], t[r]);
    }return e;
  },
      document$2 = _global.document,
      _html = document$2 && document$2.documentElement,
      IE_PROTO$1 = _sharedKey("IE_PROTO"),
      Empty = function Empty() {},
      PROTOTYPE$1 = "prototype",
      _createDict = function createDict() {
    var e,
        t = _domCreate("iframe"),
        r = _enumBugKeys.length;for (t.style.display = "none", _html.appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), _createDict = e.F; r--;) {
      delete _createDict[PROTOTYPE$1][_enumBugKeys[r]];
    }return _createDict();
  },
      _objectCreate = Object.create || function (e, t) {
    var r;return null !== e ? (Empty[PROTOTYPE$1] = _anObject(e), r = new Empty(), Empty[PROTOTYPE$1] = null, r[IE_PROTO$1] = e) : r = _createDict(), void 0 === t ? r : _objectDps(r, t);
  },
      _wks = createCommonjsModule(function (e) {
    var t = _shared("wks"),
        r = _global.Symbol,
        o = "function" == typeof r;(e.exports = function (e) {
      return t[e] || (t[e] = o && r[e] || (o ? r : _uid)("Symbol." + e));
    }).store = t;
  }),
      def$1 = _objectDp.f,
      TAG = _wks("toStringTag"),
      _setToStringTag = function _setToStringTag(e, t, r) {
    e && !_has(e = r ? e : e.prototype, TAG) && def$1(e, TAG, { configurable: !0, value: t });
  },
      IteratorPrototype = {};_hide(IteratorPrototype, _wks("iterator"), function () {
    return this;
  });var _iterCreate = function _iterCreate(e, t, r) {
    e.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, r) }), _setToStringTag(e, t + " Iterator");
  },
      _toObject = function _toObject(e) {
    return Object(_defined(e));
  },
      IE_PROTO$2 = _sharedKey("IE_PROTO"),
      ObjectProto = Object.prototype,
      _objectGpo = Object.getPrototypeOf || function (e) {
    return e = _toObject(e), _has(e, IE_PROTO$2) ? e[IE_PROTO$2] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? ObjectProto : null;
  },
      ITERATOR = _wks("iterator"),
      BUGGY = !([].keys && "next" in [].keys()),
      FF_ITERATOR = "@@iterator",
      KEYS = "keys",
      VALUES = "values",
      returnThis = function returnThis() {
    return this;
  },
      _iterDefine = function _iterDefine(e, t, r, o, n, i, a) {
    _iterCreate(r, t, o);var s,
        c,
        l,
        u = function u(e) {
      if (!BUGGY && e in d) return d[e];switch (e) {case KEYS:case VALUES:
          return function () {
            return new r(this, e);
          };}return function () {
        return new r(this, e);
      };
    },
        f = t + " Iterator",
        _ = n == VALUES,
        p = !1,
        d = e.prototype,
        y = d[ITERATOR] || d[FF_ITERATOR] || n && d[n],
        h = y || u(n),
        m = n ? _ ? u("entries") : h : void 0,
        E = "Array" == t && d.entries || y;if (E && (l = _objectGpo(E.call(new e()))) !== Object.prototype && l.next && (_setToStringTag(l, f, !0), _library), _ && y && y.name !== VALUES && (p = !0, h = function h() {
      return y.call(this);
    }), !a || !BUGGY && !p && d[ITERATOR] || _hide(d, ITERATOR, h), _iterators[t] = h, _iterators[f] = returnThis, n) if (s = { values: _ ? h : u(VALUES), keys: i ? h : u(KEYS), entries: m }, a) for (c in s) {
      c in d || _redefine(d, c, s[c]);
    } else _export(_export.P + _export.F * (BUGGY || p), t, s);return s;
  },
      $at = _stringAt(!0);_iterDefine(String, "String", function (e) {
    this._t = String(e), this._i = 0;
  }, function () {
    var e,
        t = this._t,
        r = this._i;return r >= t.length ? { value: void 0, done: !0 } : (e = $at(t, r), this._i += e.length, { value: e, done: !1 });
  });var _iterStep = function _iterStep(e, t) {
    return { value: t, done: !!e };
  },
      es6_array_iterator = _iterDefine(Array, "Array", function (e, t) {
    this._t = _toIobject(e), this._i = 0, this._k = t;
  }, function () {
    var e = this._t,
        t = this._k,
        r = this._i++;return !e || r >= e.length ? (this._t = void 0, _iterStep(1)) : _iterStep(0, "keys" == t ? r : "values" == t ? e[r] : [r, e[r]]);
  }, "values");_iterators.Arguments = _iterators.Array;for (var TO_STRING_TAG = _wks("toStringTag"), DOMIterables = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i],
        Collection = _global[NAME],
        proto = Collection && Collection.prototype;proto && !proto[TO_STRING_TAG] && _hide(proto, TO_STRING_TAG, NAME), _iterators[NAME] = _iterators.Array;
  }var f$1 = _wks,
      _wksExt = { f: f$1 },
      iterator = _wksExt.f("iterator"),
      iterator$1 = createCommonjsModule(function (e) {
    e.exports = { default: iterator, __esModule: !0 };
  });unwrapExports(iterator$1);var _meta = createCommonjsModule(function (e) {
    var t = _uid("meta"),
        r = _objectDp.f,
        o = 0,
        n = Object.isExtensible || function () {
      return !0;
    },
        i = !_fails(function () {
      return n(Object.preventExtensions({}));
    }),
        a = function a(e) {
      r(e, t, { value: { i: "O" + ++o, w: {} } });
    },
        s = e.exports = { KEY: t, NEED: !1, fastKey: function fastKey(e, r) {
        if (!_isObject(e)) return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? e : ("string" == typeof e ? "S" : "P") + e;if (!_has(e, t)) {
          if (!n(e)) return "F";if (!r) return "E";a(e);
        }return e[t].i;
      }, getWeak: function getWeak(e, r) {
        if (!_has(e, t)) {
          if (!n(e)) return !0;if (!r) return !1;a(e);
        }return e[t].w;
      }, onFreeze: function onFreeze(e) {
        return i && s.NEED && n(e) && !_has(e, t) && a(e), e;
      } };
  }),
      _meta_1 = _meta.KEY,
      _meta_2 = _meta.NEED,
      _meta_3 = _meta.fastKey,
      _meta_4 = _meta.getWeak,
      _meta_5 = _meta.onFreeze,
      defineProperty$1 = _objectDp.f,
      _wksDefine = function _wksDefine(e) {
    var t = _core.Symbol || (_core.Symbol = {});"_" == e.charAt(0) || e in t || defineProperty$1(t, e, { value: _wksExt.f(e) });
  },
      f$2 = Object.getOwnPropertySymbols,
      _objectGops = { f: f$2 },
      f$3 = {}.propertyIsEnumerable,
      _objectPie = { f: f$3 },
      _enumKeys = function _enumKeys(e) {
    var t = _objectKeys(e),
        r = _objectGops.f;if (r) for (var o, n = r(e), i = _objectPie.f, a = 0; n.length > a;) {
      i.call(e, o = n[a++]) && t.push(o);
    }return t;
  },
      _isArray = Array.isArray || function (e) {
    return "Array" == _cof(e);
  },
      hiddenKeys = _enumBugKeys.concat("length", "prototype"),
      f$4 = Object.getOwnPropertyNames || function (e) {
    return _objectKeysInternal(e, hiddenKeys);
  },
      _objectGopn = { f: f$4 },
      gOPN = _objectGopn.f,
      toString$1$1 = {}.toString,
      windowNames = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
      getWindowNames = function getWindowNames(e) {
    try {
      return gOPN(e);
    } catch (e) {
      return windowNames.slice();
    }
  },
      f$5 = function f$5(e) {
    return windowNames && "[object Window]" == toString$1$1.call(e) ? getWindowNames(e) : gOPN(_toIobject(e));
  },
      _objectGopnExt = { f: f$5 },
      gOPD = Object.getOwnPropertyDescriptor,
      f$6 = _descriptors ? gOPD : function (e, t) {
    if (e = _toIobject(e), t = _toPrimitive(t, !0), _ie8DomDefine) try {
      return gOPD(e, t);
    } catch (e) {}if (_has(e, t)) return _propertyDesc(!_objectPie.f.call(e, t), e[t]);
  },
      _objectGopd = { f: f$6 },
      META = _meta.KEY,
      gOPD$1 = _objectGopd.f,
      dP$1 = _objectDp.f,
      gOPN$1 = _objectGopnExt.f,
      _$Symbol = _global.Symbol,
      $JSON = _global.JSON,
      _stringify = $JSON && $JSON.stringify,
      PROTOTYPE$2 = "prototype",
      HIDDEN = _wks("_hidden"),
      TO_PRIMITIVE = _wks("toPrimitive"),
      isEnum = {}.propertyIsEnumerable,
      SymbolRegistry = _shared("symbol-registry"),
      AllSymbols = _shared("symbols"),
      OPSymbols = _shared("op-symbols"),
      ObjectProto$1 = Object[PROTOTYPE$2],
      USE_NATIVE = "function" == typeof _$Symbol,
      QObject = _global.QObject,
      setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild,
      setSymbolDesc = _descriptors && _fails(function () {
    return 7 != _objectCreate(dP$1({}, "a", { get: function get$$1() {
        return dP$1(this, "a", { value: 7 }).a;
      } })).a;
  }) ? function (e, t, r) {
    var o = gOPD$1(ObjectProto$1, t);o && delete ObjectProto$1[t], dP$1(e, t, r), o && e !== ObjectProto$1 && dP$1(ObjectProto$1, t, o);
  } : dP$1,
      wrap = function wrap(e) {
    var t = AllSymbols[e] = _objectCreate(_$Symbol[PROTOTYPE$2]);return t._k = e, t;
  },
      isSymbol = USE_NATIVE && "symbol" == _typeof(_$Symbol.iterator) ? function (e) {
    return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e));
  } : function (e) {
    return e instanceof _$Symbol;
  },
      $defineProperty = function $defineProperty(e, t, r) {
    return e === ObjectProto$1 && $defineProperty(OPSymbols, t, r), _anObject(e), t = _toPrimitive(t, !0), _anObject(r), _has(AllSymbols, t) ? (r.enumerable ? (_has(e, HIDDEN) && e[HIDDEN][t] && (e[HIDDEN][t] = !1), r = _objectCreate(r, { enumerable: _propertyDesc(0, !1) })) : (_has(e, HIDDEN) || dP$1(e, HIDDEN, _propertyDesc(1, {})), e[HIDDEN][t] = !0), setSymbolDesc(e, t, r)) : dP$1(e, t, r);
  },
      $defineProperties = function $defineProperties(e, t) {
    _anObject(e);for (var r, o = _enumKeys(t = _toIobject(t)), n = 0, i = o.length; i > n;) {
      $defineProperty(e, r = o[n++], t[r]);
    }return e;
  },
      $create = function $create(e, t) {
    return void 0 === t ? _objectCreate(e) : $defineProperties(_objectCreate(e), t);
  },
      $propertyIsEnumerable = function $propertyIsEnumerable(e) {
    var t = isEnum.call(this, e = _toPrimitive(e, !0));return !(this === ObjectProto$1 && _has(AllSymbols, e) && !_has(OPSymbols, e)) && (!(t || !_has(this, e) || !_has(AllSymbols, e) || _has(this, HIDDEN) && this[HIDDEN][e]) || t);
  },
      $getOwnPropertyDescriptor = function $getOwnPropertyDescriptor(e, t) {
    if (e = _toIobject(e), t = _toPrimitive(t, !0), e !== ObjectProto$1 || !_has(AllSymbols, t) || _has(OPSymbols, t)) {
      var r = gOPD$1(e, t);return !r || !_has(AllSymbols, t) || _has(e, HIDDEN) && e[HIDDEN][t] || (r.enumerable = !0), r;
    }
  },
      $getOwnPropertyNames = function $getOwnPropertyNames(e) {
    for (var t, r = gOPN$1(_toIobject(e)), o = [], n = 0; r.length > n;) {
      _has(AllSymbols, t = r[n++]) || t == HIDDEN || t == META || o.push(t);
    }return o;
  },
      $getOwnPropertySymbols = function $getOwnPropertySymbols(e) {
    for (var t, r = e === ObjectProto$1, o = gOPN$1(r ? OPSymbols : _toIobject(e)), n = [], i = 0; o.length > i;) {
      !_has(AllSymbols, t = o[i++]) || r && !_has(ObjectProto$1, t) || n.push(AllSymbols[t]);
    }return n;
  };USE_NATIVE || (_redefine((_$Symbol = function $Symbol() {
    if (this instanceof _$Symbol) throw TypeError("Symbol is not a constructor!");var e = _uid(arguments.length > 0 ? arguments[0] : void 0),
        t = function t(r) {
      this === ObjectProto$1 && t.call(OPSymbols, r), _has(this, HIDDEN) && _has(this[HIDDEN], e) && (this[HIDDEN][e] = !1), setSymbolDesc(this, e, _propertyDesc(1, r));
    };return _descriptors && setter && setSymbolDesc(ObjectProto$1, e, { configurable: !0, set: t }), wrap(e);
  })[PROTOTYPE$2], "toString", function () {
    return this._k;
  }), _objectGopd.f = $getOwnPropertyDescriptor, _objectDp.f = $defineProperty, _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames, _objectPie.f = $propertyIsEnumerable, _objectGops.f = $getOwnPropertySymbols, _descriptors && !_library && _redefine(ObjectProto$1, "propertyIsEnumerable", $propertyIsEnumerable, !0), _wksExt.f = function (e) {
    return wrap(_wks(e));
  }), _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: _$Symbol });for (var es6Symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), j = 0; es6Symbols.length > j;) {
    _wks(es6Symbols[j++]);
  }for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) {
    _wksDefine(wellKnownSymbols[k++]);
  }_export(_export.S + _export.F * !USE_NATIVE, "Symbol", { for: function _for(e) {
      return _has(SymbolRegistry, e += "") ? SymbolRegistry[e] : SymbolRegistry[e] = _$Symbol(e);
    }, keyFor: function keyFor(e) {
      if (!isSymbol(e)) throw TypeError(e + " is not a symbol!");for (var t in SymbolRegistry) {
        if (SymbolRegistry[t] === e) return t;
      }
    }, useSetter: function useSetter() {
      setter = !0;
    }, useSimple: function useSimple() {
      setter = !1;
    } }), _export(_export.S + _export.F * !USE_NATIVE, "Object", { create: $create, defineProperty: $defineProperty, defineProperties: $defineProperties, getOwnPropertyDescriptor: $getOwnPropertyDescriptor, getOwnPropertyNames: $getOwnPropertyNames, getOwnPropertySymbols: $getOwnPropertySymbols }), $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
    var e = _$Symbol();return "[null]" != _stringify([e]) || "{}" != _stringify({ a: e }) || "{}" != _stringify(Object(e));
  })), "JSON", { stringify: function stringify(e) {
      for (var t, r, o = [e], n = 1; arguments.length > n;) {
        o.push(arguments[n++]);
      }if (r = t = o[1], (_isObject(t) || void 0 !== e) && !isSymbol(e)) return _isArray(t) || (t = function t(e, _t2) {
        if ("function" == typeof r && (_t2 = r.call(this, e, _t2)), !isSymbol(_t2)) return _t2;
      }), o[1] = t, _stringify.apply($JSON, o);
    } }), _$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide(_$Symbol[PROTOTYPE$2], TO_PRIMITIVE, _$Symbol[PROTOTYPE$2].valueOf), _setToStringTag(_$Symbol, "Symbol"), _setToStringTag(Math, "Math", !0), _setToStringTag(_global.JSON, "JSON", !0), _wksDefine("asyncIterator"), _wksDefine("observable");var defer,
      channel,
      port,
      symbol = _core.Symbol,
      symbol$1 = createCommonjsModule(function (e) {
    e.exports = { default: symbol, __esModule: !0 };
  }),
      symbol$2 = unwrapExports(symbol$1),
      TAG$1 = _wks("toStringTag"),
      ARG = "Arguments" == _cof(function () {
    return arguments;
  }()),
      tryGet = function tryGet(e, t) {
    try {
      return e[t];
    } catch (e) {}
  },
      _classof = function _classof(e) {
    var t, r, o;return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (r = tryGet(t = Object(e), TAG$1)) ? r : ARG ? _cof(t) : "Object" == (o = _cof(t)) && "function" == typeof t.callee ? "Arguments" : o;
  },
      _anInstance = function _anInstance(e, t, r, o) {
    if (!(e instanceof t) || void 0 !== o && o in e) throw TypeError(r + ": incorrect invocation!");return e;
  },
      _iterCall = function _iterCall(e, t, r, o) {
    try {
      return o ? t(_anObject(r)[0], r[1]) : t(r);
    } catch (t) {
      var n = e.return;throw void 0 !== n && _anObject(n.call(e)), t;
    }
  },
      ITERATOR$1 = _wks("iterator"),
      ArrayProto = Array.prototype,
      _isArrayIter = function _isArrayIter(e) {
    return void 0 !== e && (_iterators.Array === e || ArrayProto[ITERATOR$1] === e);
  },
      ITERATOR$2 = _wks("iterator"),
      core_getIteratorMethod = _core.getIteratorMethod = function (e) {
    if (void 0 != e) return e[ITERATOR$2] || e["@@iterator"] || _iterators[_classof(e)];
  },
      _forOf = createCommonjsModule(function (e) {
    var t = {},
        r = {},
        o = e.exports = function (e, o, n, i, a) {
      var s,
          c,
          l,
          u,
          f = a ? function () {
        return e;
      } : core_getIteratorMethod(e),
          _ = _ctx(n, i, o ? 2 : 1),
          p = 0;if ("function" != typeof f) throw TypeError(e + " is not iterable!");if (_isArrayIter(f)) {
        for (s = _toLength(e.length); s > p; p++) {
          if ((u = o ? _(_anObject(c = e[p])[0], c[1]) : _(e[p])) === t || u === r) return u;
        }
      } else for (l = f.call(e); !(c = l.next()).done;) {
        if ((u = _iterCall(l, _, c.value, o)) === t || u === r) return u;
      }
    };o.BREAK = t, o.RETURN = r;
  }),
      SPECIES = _wks("species"),
      _speciesConstructor = function _speciesConstructor(e, t) {
    var r,
        o = _anObject(e).constructor;return void 0 === o || void 0 == (r = _anObject(o)[SPECIES]) ? t : _aFunction(r);
  },
      _invoke = function _invoke(e, t, r) {
    var o = void 0 === r;switch (t.length) {case 0:
        return o ? e() : e.call(r);case 1:
        return o ? e(t[0]) : e.call(r, t[0]);case 2:
        return o ? e(t[0], t[1]) : e.call(r, t[0], t[1]);case 3:
        return o ? e(t[0], t[1], t[2]) : e.call(r, t[0], t[1], t[2]);case 4:
        return o ? e(t[0], t[1], t[2], t[3]) : e.call(r, t[0], t[1], t[2], t[3]);}return e.apply(r, t);
  },
      process = _global.process,
      setTask = _global.setImmediate,
      clearTask = _global.clearImmediate,
      MessageChannel$1 = _global.MessageChannel,
      Dispatch = _global.Dispatch,
      counter$1 = 0,
      queue$1 = {},
      ONREADYSTATECHANGE = "onreadystatechange",
      run = function run() {
    var e = +this;if (queue$1.hasOwnProperty(e)) {
      var t = queue$1[e];delete queue$1[e], t();
    }
  },
      listener = function listener(e) {
    run.call(e.data);
  };setTask && clearTask || (setTask = function setTask(e) {
    for (var t = [], r = 1; arguments.length > r;) {
      t.push(arguments[r++]);
    }return queue$1[++counter$1] = function () {
      _invoke("function" == typeof e ? e : Function(e), t);
    }, defer(counter$1), counter$1;
  }, clearTask = function clearTask(e) {
    delete queue$1[e];
  }, "process" == _cof(process) ? defer = function defer(e) {
    process.nextTick(_ctx(run, e, 1));
  } : Dispatch && Dispatch.now ? defer = function defer(e) {
    Dispatch.now(_ctx(run, e, 1));
  } : MessageChannel$1 ? (port = (channel = new MessageChannel$1()).port2, channel.port1.onmessage = listener, defer = _ctx(port.postMessage, port, 1)) : _global.addEventListener && "function" == typeof postMessage && !_global.importScripts ? (defer = function defer(e) {
    _global.postMessage(e + "", "*");
  }, _global.addEventListener("message", listener, !1)) : defer = ONREADYSTATECHANGE in _domCreate("script") ? function (e) {
    _html.appendChild(_domCreate("script"))[ONREADYSTATECHANGE] = function () {
      _html.removeChild(this), run.call(e);
    };
  } : function (e) {
    setTimeout(_ctx(run, e, 1), 0);
  });var _task = { set: setTask, clear: clearTask },
      macrotask = _task.set,
      Observer$1 = _global.MutationObserver || _global.WebKitMutationObserver,
      process$1 = _global.process,
      Promise$1 = _global.Promise,
      isNode = "process" == _cof(process$1),
      _microtask = function _microtask() {
    var e,
        t,
        r,
        o = function o() {
      var o, n;for (isNode && (o = process$1.domain) && o.exit(); e;) {
        n = e.fn, e = e.next;try {
          n();
        } catch (o) {
          throw e ? r() : t = void 0, o;
        }
      }t = void 0, o && o.enter();
    };if (isNode) r = function r() {
      process$1.nextTick(o);
    };else if (!Observer$1 || _global.navigator && _global.navigator.standalone) {
      if (Promise$1 && Promise$1.resolve) {
        var n = Promise$1.resolve(void 0);r = function r() {
          n.then(o);
        };
      } else r = function r() {
        macrotask.call(_global, o);
      };
    } else {
      var i = !0,
          a = document.createTextNode("");new Observer$1(o).observe(a, { characterData: !0 }), r = function r() {
        a.data = i = !i;
      };
    }return function (o) {
      var n = { fn: o, next: void 0 };t && (t.next = n), e || (e = n, r()), t = n;
    };
  };function PromiseCapability(e) {
    var t, r;this.promise = new e(function (e, o) {
      if (void 0 !== t || void 0 !== r) throw TypeError("Bad Promise constructor");t = e, r = o;
    }), this.resolve = _aFunction(t), this.reject = _aFunction(r);
  }var f$7 = function f$7(e) {
    return new PromiseCapability(e);
  },
      _newPromiseCapability = { f: f$7 },
      _perform = function _perform(e) {
    try {
      return { e: !1, v: e() };
    } catch (e) {
      return { e: !0, v: e };
    }
  },
      navigator$1 = _global.navigator,
      _userAgent = navigator$1 && navigator$1.userAgent || "",
      _promiseResolve = function _promiseResolve(e, t) {
    if (_anObject(e), _isObject(t) && t.constructor === e) return t;var r = _newPromiseCapability.f(e);return (0, r.resolve)(t), r.promise;
  },
      _redefineAll = function _redefineAll(e, t, r) {
    for (var o in t) {
      r && e[o] ? e[o] = t[o] : _hide(e, o, t[o]);
    }return e;
  },
      SPECIES$1 = _wks("species"),
      _setSpecies = function _setSpecies(e) {
    var t = "function" == typeof _core[e] ? _core[e] : _global[e];_descriptors && t && !t[SPECIES$1] && _objectDp.f(t, SPECIES$1, { configurable: !0, get: function get$$1() {
        return this;
      } });
  },
      ITERATOR$3 = _wks("iterator"),
      SAFE_CLOSING = !1;try {
    var riter = [7][ITERATOR$3]();riter.return = function () {
      SAFE_CLOSING = !0;
    };
  } catch (e) {}var Internal,
      newGenericPromiseCapability,
      OwnPromiseCapability,
      Wrapper,
      _iterDetect = function _iterDetect(e, t) {
    if (!t && !SAFE_CLOSING) return !1;var r = !1;try {
      var o = [7],
          n = o[ITERATOR$3]();n.next = function () {
        return { done: r = !0 };
      }, o[ITERATOR$3] = function () {
        return n;
      }, e(o);
    } catch (e) {}return r;
  },
      task = _task.set,
      microtask = _microtask(),
      PROMISE = "Promise",
      TypeError$1 = _global.TypeError,
      process$2 = _global.process,
      versions = process$2 && process$2.versions,
      v8 = versions && versions.v8 || "",
      _$Promise = _global[PROMISE],
      isNode$1 = "process" == _classof(process$2),
      empty = function empty() {},
      newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f,
      USE_NATIVE$1 = !!function () {
    try {
      var e = _$Promise.resolve(1),
          t = (e.constructor = {})[_wks("species")] = function (e) {
        e(empty, empty);
      };return (isNode$1 || "function" == typeof PromiseRejectionEvent) && e.then(empty) instanceof t && 0 !== v8.indexOf("6.6") && -1 === _userAgent.indexOf("Chrome/66");
    } catch (e) {}
  }(),
      isThenable = function isThenable(e) {
    var t;return !(!_isObject(e) || "function" != typeof (t = e.then)) && t;
  },
      notify = function notify(e, t) {
    if (!e._n) {
      e._n = !0;var r = e._c;microtask(function () {
        for (var o = e._v, n = 1 == e._s, i = 0, a = function a(t) {
          var r,
              i,
              a,
              s = n ? t.ok : t.fail,
              c = t.resolve,
              l = t.reject,
              u = t.domain;try {
            s ? (n || (2 == e._h && onHandleUnhandled(e), e._h = 1), !0 === s ? r = o : (u && u.enter(), r = s(o), u && (u.exit(), a = !0)), r === t.promise ? l(TypeError$1("Promise-chain cycle")) : (i = isThenable(r)) ? i.call(r, c, l) : c(r)) : l(o);
          } catch (e) {
            u && !a && u.exit(), l(e);
          }
        }; r.length > i;) {
          a(r[i++]);
        }e._c = [], e._n = !1, t && !e._h && onUnhandled(e);
      });
    }
  },
      onUnhandled = function onUnhandled(e) {
    task.call(_global, function () {
      var t,
          r,
          o,
          n = e._v,
          i = isUnhandled(e);if (i && (t = _perform(function () {
        isNode$1 ? process$2.emit("unhandledRejection", n, e) : (r = _global.onunhandledrejection) ? r({ promise: e, reason: n }) : (o = _global.console) && o.error && o.error("Unhandled promise rejection", n);
      }), e._h = isNode$1 || isUnhandled(e) ? 2 : 1), e._a = void 0, i && t.e) throw t.v;
    });
  },
      isUnhandled = function isUnhandled(e) {
    return 1 !== e._h && 0 === (e._a || e._c).length;
  },
      onHandleUnhandled = function onHandleUnhandled(e) {
    task.call(_global, function () {
      var t;isNode$1 ? process$2.emit("rejectionHandled", e) : (t = _global.onrejectionhandled) && t({ promise: e, reason: e._v });
    });
  },
      $reject = function $reject(e) {
    var t = this;t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), notify(t, !0));
  },
      $resolve = function $resolve(e) {
    var t,
        r = this;if (!r._d) {
      r._d = !0, r = r._w || r;try {
        if (r === e) throw TypeError$1("Promise can't be resolved itself");(t = isThenable(e)) ? microtask(function () {
          var o = { _w: r, _d: !1 };try {
            t.call(e, _ctx($resolve, o, 1), _ctx($reject, o, 1));
          } catch (e) {
            $reject.call(o, e);
          }
        }) : (r._v = e, r._s = 1, notify(r, !1));
      } catch (e) {
        $reject.call({ _w: r, _d: !1 }, e);
      }
    }
  };USE_NATIVE$1 || (_$Promise = function $Promise(e) {
    _anInstance(this, _$Promise, PROMISE, "_h"), _aFunction(e), Internal.call(this);try {
      e(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (e) {
      $reject.call(this, e);
    }
  }, (Internal = function Internal(e) {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = _redefineAll(_$Promise.prototype, { then: function then(e, t) {
      var r = newPromiseCapability(_speciesConstructor(this, _$Promise));return r.ok = "function" != typeof e || e, r.fail = "function" == typeof t && t, r.domain = isNode$1 ? process$2.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && notify(this, !1), r.promise;
    }, catch: function _catch(e) {
      return this.then(void 0, e);
    } }), OwnPromiseCapability = function OwnPromiseCapability() {
    var e = new Internal();this.promise = e, this.resolve = _ctx($resolve, e, 1), this.reject = _ctx($reject, e, 1);
  }, _newPromiseCapability.f = newPromiseCapability = function newPromiseCapability(e) {
    return e === _$Promise || e === Wrapper ? new OwnPromiseCapability(e) : newGenericPromiseCapability(e);
  }), _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: _$Promise }), _setToStringTag(_$Promise, PROMISE), _setSpecies(PROMISE), Wrapper = _core[PROMISE], _export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, { reject: function reject(e) {
      var t = newPromiseCapability(this);return (0, t.reject)(e), t.promise;
    } }), _export(_export.S + _export.F * (_library), PROMISE, { resolve: function resolve(e) {
      return _promiseResolve(this === Wrapper ? _$Promise : this, e);
    } }), _export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (e) {
    _$Promise.all(e).catch(empty);
  })), PROMISE, { all: function all(e) {
      var t = this,
          r = newPromiseCapability(t),
          o = r.resolve,
          n = r.reject,
          i = _perform(function () {
        var r = [],
            i = 0,
            a = 1;_forOf(e, !1, function (e) {
          var s = i++,
              c = !1;r.push(void 0), a++, t.resolve(e).then(function (e) {
            c || (c = !0, r[s] = e, --a || o(r));
          }, n);
        }), --a || o(r);
      });return i.e && n(i.v), r.promise;
    }, race: function race(e) {
      var t = this,
          r = newPromiseCapability(t),
          o = r.reject,
          n = _perform(function () {
        _forOf(e, !1, function (e) {
          t.resolve(e).then(r.resolve, o);
        });
      });return n.e && o(n.v), r.promise;
    } }), _export(_export.P + _export.R, "Promise", { finally: function _finally(e) {
      var t = _speciesConstructor(this, _core.Promise || _global.Promise),
          r = "function" == typeof e;return this.then(r ? function (r) {
        return _promiseResolve(t, e()).then(function () {
          return r;
        });
      } : e, r ? function (r) {
        return _promiseResolve(t, e()).then(function () {
          throw r;
        });
      } : e);
    } }), _export(_export.S, "Promise", { try: function _try(e) {
      var t = _newPromiseCapability.f(this),
          r = _perform(e);return (r.e ? t.reject : t.resolve)(r.v), t.promise;
    } });var promise = _core.Promise,
      promise$1 = createCommonjsModule(function (e) {
    e.exports = { default: promise, __esModule: !0 };
  });unwrapExports(promise$1);var asyncGeneratorDelegate$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = i(iterator$1),
        o = i(symbol$1),
        n = i(promise$1);function i(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function (e, t) {
      var i = {},
          a = !1;function s(r, o) {
        return a = !0, o = new n.default(function (t) {
          t(e[r](o));
        }), { done: !1, value: t(o) };
      }return "function" == typeof o.default && r.default && (i[r.default] = function () {
        return this;
      }), i.next = function (e) {
        return a ? (a = !1, e) : s("next", e);
      }, "function" == typeof e.throw && (i.throw = function (e) {
        if (a) throw a = !1, e;return s("throw", e);
      }), "function" == typeof e.return && (i.return = function (e) {
        return s("return", e);
      }), i;
    };
  }),
      _asyncGeneratorDelegate = unwrapExports(asyncGeneratorDelegate$1),
      _asyncGeneratorDelegate$1 = asyncGeneratorDelegate$1,
      asyncGenerator$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = n(symbol$1),
        o = n(promise$1);function n(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function () {
      function e(e) {
        this.value = e;
      }function t(t) {
        var r, n;function i(r, n) {
          try {
            var s = t[r](n),
                c = s.value;c instanceof e ? o.default.resolve(c.value).then(function (e) {
              i("next", e);
            }, function (e) {
              i("throw", e);
            }) : a(s.done ? "return" : "normal", s.value);
          } catch (e) {
            a("throw", e);
          }
        }function a(e, t) {
          switch (e) {case "return":
              r.resolve({ value: t, done: !0 });break;case "throw":
              r.reject(t);break;default:
              r.resolve({ value: t, done: !1 });}(r = r.next) ? i(r.key, r.arg) : n = null;
        }this._invoke = function (e, t) {
          return new o.default(function (o, a) {
            var s = { key: e, arg: t, resolve: o, reject: a, next: null };n ? n = n.next = s : (r = n = s, i(e, t));
          });
        }, "function" != typeof t.return && (this.return = void 0);
      }return "function" == typeof r.default && r.default.asyncIterator && (t.prototype[r.default.asyncIterator] = function () {
        return this;
      }), t.prototype.next = function (e) {
        return this._invoke("next", e);
      }, t.prototype.throw = function (e) {
        return this._invoke("throw", e);
      }, t.prototype.return = function (e) {
        return this._invoke("return", e);
      }, { wrap: function wrap(e) {
          return function () {
            return new t(e.apply(this, arguments));
          };
        }, await: function _await(t) {
          return new e(t);
        } };
    }();
  }),
      _asyncGenerator = unwrapExports(asyncGenerator$1),
      _asyncGenerator$1 = asyncGenerator$1,
      core_getIterator = _core.getIterator = function (e) {
    var t = core_getIteratorMethod(e);if ("function" != typeof t) throw TypeError(e + " is not iterable!");return _anObject(t.call(e));
  },
      getIterator = core_getIterator,
      getIterator$1 = createCommonjsModule(function (e) {
    e.exports = { default: getIterator, __esModule: !0 };
  });unwrapExports(getIterator$1);var asyncIterator$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = i(getIterator$1),
        o = i(iterator$1),
        n = i(symbol$1);function i(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function (e) {
      if ("function" == typeof n.default) {
        if (n.default.asyncIterator) {
          var t = e[n.default.asyncIterator];if (null != t) return t.call(e);
        }if (o.default) return (0, r.default)(e);
      }throw new TypeError("Object is not async iterable");
    };
  }),
      _asyncIterator = unwrapExports(asyncIterator$1),
      _asyncIterator$1 = asyncIterator$1,
      asyncToGenerator$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = (r = promise$1) && r.__esModule ? r : { default: r };t.default = function (e) {
      return function () {
        var t = e.apply(this, arguments);return new o.default(function (e, r) {
          return function n(i, a) {
            try {
              var s = t[i](a),
                  c = s.value;
            } catch (e) {
              return void r(e);
            }if (!s.done) return o.default.resolve(c).then(function (e) {
              n("next", e);
            }, function (e) {
              n("throw", e);
            });e(c);
          }("next");
        });
      };
    };
  }),
      _asyncToGenerator = unwrapExports(asyncToGenerator$1),
      _asyncToGenerator$1 = asyncToGenerator$1,
      classCallCheck$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = function (e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    };
  }),
      _classCallCheck = unwrapExports(classCallCheck$1),
      _classCallCheck$1 = classCallCheck$1;_export(_export.S + _export.F * !_descriptors, "Object", { defineProperty: _objectDp.f });var $Object = _core.Object,
      defineProperty$1$1 = function defineProperty$1(e, t, r) {
    return $Object.defineProperty(e, t, r);
  },
      defineProperty$2 = createCommonjsModule(function (e) {
    e.exports = { default: defineProperty$1$1, __esModule: !0 };
  });unwrapExports(defineProperty$2);var createClass$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = (r = defineProperty$2) && r.__esModule ? r : { default: r };t.default = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), (0, o.default)(e, n.key, n);
        }
      }return function (t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
      };
    }();
  }),
      _createClass = unwrapExports(createClass$1),
      _createClass$1 = createClass$1,
      _objectSap = function _objectSap(e, t) {
    var r = (_core.Object || {})[e] || Object[e],
        o = {};o[e] = t(r), _export(_export.S + _export.F * _fails(function () {
      r(1);
    }), "Object", o);
  },
      $getOwnPropertyDescriptor$1 = _objectGopd.f;_objectSap("getOwnPropertyDescriptor", function () {
    return function (e, t) {
      return $getOwnPropertyDescriptor$1(_toIobject(e), t);
    };
  });var $Object$1 = _core.Object,
      getOwnPropertyDescriptor = function getOwnPropertyDescriptor(e, t) {
    return $Object$1.getOwnPropertyDescriptor(e, t);
  },
      getOwnPropertyDescriptor$1 = createCommonjsModule(function (e) {
    e.exports = { default: getOwnPropertyDescriptor, __esModule: !0 };
  });unwrapExports(getOwnPropertyDescriptor$1), _objectSap("getOwnPropertyNames", function () {
    return _objectGopnExt.f;
  });var $Object$2 = _core.Object,
      getOwnPropertyNames = function getOwnPropertyNames(e) {
    return $Object$2.getOwnPropertyNames(e);
  },
      getOwnPropertyNames$1 = createCommonjsModule(function (e) {
    e.exports = { default: getOwnPropertyNames, __esModule: !0 };
  });unwrapExports(getOwnPropertyNames$1);var defaults$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = i(defineProperty$2),
        o = i(getOwnPropertyDescriptor$1),
        n = i(getOwnPropertyNames$1);function i(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function (e, t) {
      for (var i = (0, n.default)(t), a = 0; a < i.length; a++) {
        var s = i[a],
            c = (0, o.default)(t, s);c && c.configurable && void 0 === e[s] && (0, r.default)(e, s, c);
      }return e;
    };
  }),
      _defaults = unwrapExports(defaults$1),
      _defaults$1 = defaults$1,
      defineEnumerableProperties$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = (r = defineProperty$2) && r.__esModule ? r : { default: r };t.default = function (e, t) {
      for (var r in t) {
        var n = t[r];n.configurable = n.enumerable = !0, "value" in n && (n.writable = !0), (0, o.default)(e, r, n);
      }return e;
    };
  }),
      _defineEnumerableProperties = unwrapExports(defineEnumerableProperties$1),
      _defineEnumerableProperties$1 = defineEnumerableProperties$1,
      defineProperty$4 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = (r = defineProperty$2) && r.__esModule ? r : { default: r };t.default = function (e, t, r) {
      return t in e ? (0, o.default)(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
    };
  }),
      _defineProperty = unwrapExports(defineProperty$4),
      _defineProperty$1 = defineProperty$4,
      $assign = Object.assign,
      _objectAssign = !$assign || _fails(function () {
    var e = {},
        t = {},
        r = Symbol(),
        o = "abcdefghijklmnopqrst";return e[r] = 7, o.split("").forEach(function (e) {
      t[e] = e;
    }), 7 != $assign({}, e)[r] || Object.keys($assign({}, t)).join("") != o;
  }) ? function (e, t) {
    for (var r = _toObject(e), o = arguments.length, n = 1, i = _objectGops.f, a = _objectPie.f; o > n;) {
      for (var s, c = _iobject(arguments[n++]), l = i ? _objectKeys(c).concat(i(c)) : _objectKeys(c), u = l.length, f = 0; u > f;) {
        a.call(c, s = l[f++]) && (r[s] = c[s]);
      }
    }return r;
  } : $assign;_export(_export.S + _export.F, "Object", { assign: _objectAssign });var assign = _core.Object.assign,
      assign$1 = createCommonjsModule(function (e) {
    e.exports = { default: assign, __esModule: !0 };
  });unwrapExports(assign$1);var _extends$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = (r = assign$1) && r.__esModule ? r : { default: r };t.default = o.default || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];for (var o in r) {
          Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
        }
      }return e;
    };
  }),
      _extends$1$1 = unwrapExports(_extends$1),
      _extends$2 = _extends$1;_objectSap("getPrototypeOf", function () {
    return function (e) {
      return _objectGpo(_toObject(e));
    };
  });var getPrototypeOf = _core.Object.getPrototypeOf,
      getPrototypeOf$1 = createCommonjsModule(function (e) {
    e.exports = { default: getPrototypeOf, __esModule: !0 };
  });unwrapExports(getPrototypeOf$1);var get$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = n(getPrototypeOf$1),
        o = n(getOwnPropertyDescriptor$1);function n(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function e(t, n, i) {
      null === t && (t = Function.prototype);var a = (0, o.default)(t, n);if (void 0 === a) {
        var s = (0, r.default)(t);return null === s ? void 0 : e(s, n, i);
      }if ("value" in a) return a.value;var c = a.get;return void 0 !== c ? c.call(i) : void 0;
    };
  }),
      _get = unwrapExports(get$1),
      _get$1 = get$1,
      check = function check(e, t) {
    if (_anObject(e), !_isObject(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
  },
      _setProto = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, t, r) {
      try {
        (r = _ctx(Function.call, _objectGopd.f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array);
      } catch (e) {
        t = !0;
      }return function (e, o) {
        return check(e, o), t ? e.__proto__ = o : r(e, o), e;
      };
    }({}, !1) : void 0), check: check };_export(_export.S, "Object", { setPrototypeOf: _setProto.set });var setPrototypeOf = _core.Object.setPrototypeOf,
      setPrototypeOf$1 = createCommonjsModule(function (e) {
    e.exports = { default: setPrototypeOf, __esModule: !0 };
  });unwrapExports(setPrototypeOf$1), _export(_export.S, "Object", { create: _objectCreate });var $Object$3 = _core.Object,
      create$1 = function create(e, t) {
    return $Object$3.create(e, t);
  },
      create$1$1 = createCommonjsModule(function (e) {
    e.exports = { default: create$1, __esModule: !0 };
  });unwrapExports(create$1$1);var _typeof_1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = i(iterator$1),
        o = i(symbol$1),
        n = "function" == typeof o.default && "symbol" == _typeof(r.default) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    };function i(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = "function" == typeof o.default && "symbol" === n(r.default) ? function (e) {
      return void 0 === e ? "undefined" : n(e);
    } : function (e) {
      return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : void 0 === e ? "undefined" : n(e);
    };
  }),
      _typeof$1 = unwrapExports(_typeof_1),
      inherits$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = i(setPrototypeOf$1),
        o = i(create$1$1),
        n = i(_typeof_1);function i(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : (0, n.default)(t)));e.prototype = (0, o.default)(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (r.default ? (0, r.default)(e, t) : e.__proto__ = t);
    };
  }),
      _inherits = unwrapExports(inherits$1),
      _inherits$1 = inherits$1,
      HAS_INSTANCE = _wks("hasInstance"),
      FunctionProto = Function.prototype;HAS_INSTANCE in FunctionProto || _objectDp.f(FunctionProto, HAS_INSTANCE, { value: function value(e) {
      if ("function" != typeof this || !_isObject(e)) return !1;if (!_isObject(this.prototype)) return e instanceof this;for (; e = _objectGpo(e);) {
        if (this.prototype === e) return !0;
      }return !1;
    } });var hasInstance = _wksExt.f("hasInstance"),
      hasInstance$1 = createCommonjsModule(function (e) {
    e.exports = { default: hasInstance, __esModule: !0 };
  });unwrapExports(hasInstance$1);var _instanceof$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = n(hasInstance$1),
        o = n(symbol$1);function n(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function (e, t) {
      return null != t && void 0 !== o.default && t[r.default] ? t[r.default](e) : e instanceof t;
    };
  }),
      _instanceof$1$1 = unwrapExports(_instanceof$1),
      _instanceof$2 = _instanceof$1,
      interopRequireDefault$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  }),
      _interopRequireDefault = unwrapExports(interopRequireDefault$1),
      _interopRequireDefault$1 = interopRequireDefault$1,
      interopRequireWildcard$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    };
  }),
      _interopRequireWildcard = unwrapExports(interopRequireWildcard$1),
      _interopRequireWildcard$1 = interopRequireWildcard$1,
      _for = _core.Symbol.for,
      _for$1 = createCommonjsModule(function (e) {
    e.exports = { default: _for, __esModule: !0 };
  });unwrapExports(_for$1);var jsx$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = i(_for$1),
        n = i(symbol$1);function i(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = (r = "function" == typeof n.default && o.default && (0, o.default)("react.element") || 60103, function (e, t, o, n) {
      var i = e && e.defaultProps,
          a = arguments.length - 3;if (t || 0 === a || (t = {}), t && i) for (var s in i) {
        void 0 === t[s] && (t[s] = i[s]);
      } else t || (t = i || {});if (1 === a) t.children = n;else if (a > 1) {
        for (var c = Array(a), l = 0; l < a; l++) {
          c[l] = arguments[l + 3];
        }t.children = c;
      }return { $$typeof: r, type: e, key: void 0 === o ? null : "" + o, ref: null, props: t, _owner: null };
    });
  }),
      _jsx = unwrapExports(jsx$1),
      _jsx$1 = jsx$1,
      newArrowCheck$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = function (e, t) {
      if (e !== t) throw new TypeError("Cannot instantiate an arrow function");
    };
  }),
      _newArrowCheck = unwrapExports(newArrowCheck$1),
      _newArrowCheck$1 = newArrowCheck$1,
      objectDestructuringEmpty$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = function (e) {
      if (null == e) throw new TypeError("Cannot destructure undefined");
    };
  }),
      _objectDestructuringEmpty = unwrapExports(objectDestructuringEmpty$1),
      _objectDestructuringEmpty$1 = objectDestructuringEmpty$1,
      objectWithoutProperties$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = function (e, t) {
      var r = {};for (var o in e) {
        t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
      }return r;
    };
  }),
      _objectWithoutProperties = unwrapExports(objectWithoutProperties$1),
      _objectWithoutProperties$1 = objectWithoutProperties$1,
      possibleConstructorReturn$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = (r = _typeof_1) && r.__esModule ? r : { default: r };t.default = function (e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" !== (void 0 === t ? "undefined" : (0, o.default)(t)) && "function" != typeof t ? e : t;
    };
  }),
      _possibleConstructorReturn = unwrapExports(possibleConstructorReturn$1),
      _possibleConstructorReturn$1 = possibleConstructorReturn$1,
      selfGlobal$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = void 0 === commonjsGlobal ? self : commonjsGlobal;
  }),
      _selfGlobal = unwrapExports(selfGlobal$1),
      _selfGlobal$1 = selfGlobal$1,
      set$2 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = n(getPrototypeOf$1),
        o = n(getOwnPropertyDescriptor$1);function n(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function e(t, n, i, a) {
      var s = (0, o.default)(t, n);if (void 0 === s) {
        var c = (0, r.default)(t);null !== c && e(c, n, i, a);
      } else if ("value" in s && s.writable) s.value = i;else {
        var l = s.set;void 0 !== l && l.call(a, i);
      }return i;
    };
  }),
      _set = unwrapExports(set$2),
      _set$1 = set$2,
      ITERATOR$4 = _wks("iterator"),
      core_isIterable = _core.isIterable = function (e) {
    var t = Object(e);return void 0 !== t[ITERATOR$4] || "@@iterator" in t || _iterators.hasOwnProperty(_classof(t));
  },
      isIterable = core_isIterable,
      isIterable$1 = createCommonjsModule(function (e) {
    e.exports = { default: isIterable, __esModule: !0 };
  });unwrapExports(isIterable$1);var slicedToArrayLoose$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = n(getIterator$1),
        o = n(isIterable$1);function n(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function (e, t) {
      if (Array.isArray(e)) return e;if ((0, o.default)(Object(e))) {
        for (var n, i = [], a = (0, r.default)(e); !(n = a.next()).done && (i.push(n.value), !t || i.length !== t);) {}return i;
      }throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }),
      _slicedToArrayLoose = unwrapExports(slicedToArrayLoose$1),
      _slicedToArrayLoose$1 = slicedToArrayLoose$1,
      slicedToArray$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = n(isIterable$1),
        o = n(getIterator$1);function n(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function () {
      return function (e, t) {
        if (Array.isArray(e)) return e;if ((0, r.default)(Object(e))) return function (e, t) {
          var r = [],
              n = !0,
              i = !1,
              a = void 0;try {
            for (var s, c = (0, o.default)(e); !(n = (s = c.next()).done) && (r.push(s.value), !t || r.length !== t); n = !0) {}
          } catch (e) {
            i = !0, a = e;
          } finally {
            try {
              !n && c.return && c.return();
            } finally {
              if (i) throw a;
            }
          }return r;
        }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }();
  }),
      _slicedToArray = unwrapExports(slicedToArray$1),
      _slicedToArray$1 = slicedToArray$1,
      taggedTemplateLiteralLoose$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = function (e, t) {
      return e.raw = t, e;
    };
  }),
      _taggedTemplateLiteralLoose = unwrapExports(taggedTemplateLiteralLoose$1),
      _taggedTemplateLiteralLoose$1 = taggedTemplateLiteralLoose$1;_export(_export.S + _export.F * !_descriptors, "Object", { defineProperties: _objectDps });var $Object$4 = _core.Object,
      defineProperties = function defineProperties(e, t) {
    return $Object$4.defineProperties(e, t);
  },
      defineProperties$1 = createCommonjsModule(function (e) {
    e.exports = { default: defineProperties, __esModule: !0 };
  });unwrapExports(defineProperties$1);var meta = _meta.onFreeze;_objectSap("freeze", function (e) {
    return function (t) {
      return e && _isObject(t) ? e(meta(t)) : t;
    };
  });var freeze = _core.Object.freeze,
      freeze$1 = createCommonjsModule(function (e) {
    e.exports = { default: freeze, __esModule: !0 };
  });unwrapExports(freeze$1);var taggedTemplateLiteral$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r = n(defineProperties$1),
        o = n(freeze$1);function n(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function (e, t) {
      return (0, o.default)((0, r.default)(e, { raw: { value: (0, o.default)(t) } }));
    };
  }),
      _taggedTemplateLiteral = unwrapExports(taggedTemplateLiteral$1),
      _taggedTemplateLiteral$1 = taggedTemplateLiteral$1,
      temporalRef$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = function (e, t, r) {
      if (e === r) throw new ReferenceError(t + " is not defined - temporal dead zone");return e;
    };
  }),
      _temporalRef = unwrapExports(temporalRef$1),
      _temporalRef$1 = temporalRef$1,
      temporalUndefined$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0, t.default = {};
  }),
      _temporalUndefined = unwrapExports(temporalUndefined$1),
      _temporalUndefined$1 = temporalUndefined$1,
      _createProperty = function _createProperty(e, t, r) {
    t in e ? _objectDp.f(e, t, _propertyDesc(0, r)) : e[t] = r;
  };_export(_export.S + _export.F * !_iterDetect(function (e) {}), "Array", { from: function from(e) {
      var t,
          r,
          o,
          n,
          i = _toObject(e),
          a = "function" == typeof this ? this : Array,
          s = arguments.length,
          c = s > 1 ? arguments[1] : void 0,
          l = void 0 !== c,
          u = 0,
          f = core_getIteratorMethod(i);if (l && (c = _ctx(c, s > 2 ? arguments[2] : void 0, 2)), void 0 == f || a == Array && _isArrayIter(f)) for (r = new a(t = _toLength(i.length)); t > u; u++) {
        _createProperty(r, u, l ? c(i[u], u) : i[u]);
      } else for (n = f.call(i), r = new a(); !(o = n.next()).done; u++) {
        _createProperty(r, u, l ? _iterCall(n, c, [o.value, u], !0) : o.value);
      }return r.length = u, r;
    } });var from_1 = _core.Array.from,
      from_1$1 = createCommonjsModule(function (e) {
    e.exports = { default: from_1, __esModule: !0 };
  }),
      arrayFrom = unwrapExports(from_1$1),
      toArray$3 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = (r = from_1$1) && r.__esModule ? r : { default: r };t.default = function (e) {
      return Array.isArray(e) ? e : (0, o.default)(e);
    };
  }),
      _toArray = unwrapExports(toArray$3),
      _toArray$1 = toArray$3,
      toConsumableArray$1 = createCommonjsModule(function (e, t) {
    t.__esModule = !0;var r,
        o = (r = from_1$1) && r.__esModule ? r : { default: r };t.default = function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) {
          r[t] = e[t];
        }return r;
      }return (0, o.default)(e);
    };
  }),
      _toConsumableArray = unwrapExports(toConsumableArray$1),
      _toConsumableArray$1 = toConsumableArray$1,
      _typeof$1$1 = _typeof_1,
      asyncGeneratorDelegate$1$1 = asyncGeneratorDelegate$1,
      asyncGenerator$1$1 = asyncGenerator$1,
      asyncIterator$1$1 = asyncIterator$1,
      asyncToGenerator$1$1 = asyncToGenerator$1,
      classCallCheck$1$1 = classCallCheck$1,
      createClass$1$1 = createClass$1,
      defineEnumerableProperties$1$1 = defineEnumerableProperties$1,
      defineProperty$5 = defineProperty$4,
      interopRequireDefault$1$1 = interopRequireDefault$1,
      interopRequireWildcard$1$1 = interopRequireWildcard$1,
      newArrowCheck$1$1 = newArrowCheck$1,
      objectDestructuringEmpty$1$1 = objectDestructuringEmpty$1,
      objectWithoutProperties$1$1 = objectWithoutProperties$1,
      possibleConstructorReturn$1$1 = possibleConstructorReturn$1,
      selfGlobal$1$1 = selfGlobal$1,
      slicedToArrayLoose$1$1 = slicedToArrayLoose$1,
      slicedToArray$1$1 = slicedToArray$1,
      taggedTemplateLiteralLoose$1$1 = taggedTemplateLiteralLoose$1,
      taggedTemplateLiteral$1$1 = taggedTemplateLiteral$1,
      temporalRef$1$1 = temporalRef$1,
      temporalUndefined$1$1 = temporalUndefined$1,
      toArray$1$1 = toArray$3,
      toConsumableArray$1$1 = toConsumableArray$1,
      runtime = createCommonjsModule(function (e) {
    !function (t) {
      var r,
          o = Object.prototype,
          n = o.hasOwnProperty,
          i = "function" == typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          s = i.asyncIterator || "@@asyncIterator",
          c = i.toStringTag || "@@toStringTag",
          l = t.regeneratorRuntime;if (l) e.exports = l;else {
        (l = t.regeneratorRuntime = e.exports).wrap = b;var u = "suspendedStart",
            f = "suspendedYield",
            _ = "executing",
            p = "completed",
            d = {},
            y = {};y[a] = function () {
          return this;
        };var h = Object.getPrototypeOf,
            m = h && h(h(I([])));m && m !== o && n.call(m, a) && (y = m);var E = P.prototype = v.prototype = Object.create(y);$.prototype = E.constructor = P, P.constructor = $, P[c] = $.displayName = "GeneratorFunction", l.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;return !!t && (t === $ || "GeneratorFunction" === (t.displayName || t.name));
        }, l.mark = function (e) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e, P) : (e.__proto__ = P, c in e || (e[c] = "GeneratorFunction")), e.prototype = Object.create(E), e;
        }, l.awrap = function (e) {
          return { __await: e };
        }, T(S.prototype), S.prototype[s] = function () {
          return this;
        }, l.AsyncIterator = S, l.async = function (e, t, r, o) {
          var n = new S(b(e, t, r, o));return l.isGeneratorFunction(t) ? n : n.next().then(function (e) {
            return e.done ? e.value : n.next();
          });
        }, T(E), E[c] = "Generator", E[a] = function () {
          return this;
        }, E.toString = function () {
          return "[object Generator]";
        }, l.keys = function (e) {
          var t = [];for (var r in e) {
            t.push(r);
          }return t.reverse(), function r() {
            for (; t.length;) {
              var o = t.pop();if (o in e) return r.value = o, r.done = !1, r;
            }return r.done = !0, r;
          };
        }, l.values = I, R.prototype = { constructor: R, reset: function reset(e) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate = null, this.method = "next", this.arg = r, this.tryEntries.forEach(j), !e) for (var t in this) {
              "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = r);
            }
          }, stop: function stop() {
            this.done = !0;var e = this.tryEntries[0].completion;if ("throw" === e.type) throw e.arg;return this.rval;
          }, dispatchException: function dispatchException(e) {
            if (this.done) throw e;var t = this;function o(o, n) {
              return s.type = "throw", s.arg = e, t.next = o, n && (t.method = "next", t.arg = r), !!n;
            }for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                  s = a.completion;if ("root" === a.tryLoc) return o("end");if (a.tryLoc <= this.prev) {
                var c = n.call(a, "catchLoc"),
                    l = n.call(a, "finallyLoc");if (c && l) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!l) throw new Error("try statement without catch or finally");if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          }, abrupt: function abrupt(e, t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r];if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                var i = o;break;
              }
            }i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);var a = i ? i.completion : {};return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, d) : this.complete(a);
          }, complete: function complete(e, t) {
            if ("throw" === e.type) throw e.arg;return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), d;
          }, finish: function finish(e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), j(r), d;
            }
          }, catch: function _catch(e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];if (r.tryLoc === e) {
                var o = r.completion;if ("throw" === o.type) {
                  var n = o.arg;j(r);
                }return n;
              }
            }throw new Error("illegal catch attempt");
          }, delegateYield: function delegateYield(e, t, o) {
            return this.delegate = { iterator: I(e), resultName: t, nextLoc: o }, "next" === this.method && (this.arg = r), d;
          } };
      }function b(e, t, r, o) {
        var n = t && t.prototype instanceof v ? t : v,
            i = Object.create(n.prototype),
            a = new R(o || []);return i._invoke = function (e, t, r) {
          var o = u;return function (n, i) {
            if (o === _) throw new Error("Generator is already running");if (o === p) {
              if ("throw" === n) throw i;return L();
            }for (r.method = n, r.arg = i;;) {
              var a = r.delegate;if (a) {
                var s = O(a, r);if (s) {
                  if (s === d) continue;return s;
                }
              }if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {
                if (o === u) throw o = p, r.arg;r.dispatchException(r.arg);
              } else "return" === r.method && r.abrupt("return", r.arg);o = _;var c = g(e, t, r);if ("normal" === c.type) {
                if (o = r.done ? p : f, c.arg === d) continue;return { value: c.arg, done: r.done };
              }"throw" === c.type && (o = p, r.method = "throw", r.arg = c.arg);
            }
          };
        }(e, r, a), i;
      }function g(e, t, r) {
        try {
          return { type: "normal", arg: e.call(t, r) };
        } catch (e) {
          return { type: "throw", arg: e };
        }
      }function v() {}function $() {}function P() {}function T(e) {
        ["next", "throw", "return"].forEach(function (t) {
          e[t] = function (e) {
            return this._invoke(t, e);
          };
        });
      }function S(e) {
        var t;this._invoke = function (r, o) {
          function i() {
            return new Promise(function (t, i) {
              !function t(r, o, i, a) {
                var s = g(e[r], e, o);if ("throw" !== s.type) {
                  var c = s.arg,
                      l = c.value;return l && "object" == (typeof l === "undefined" ? "undefined" : _typeof(l)) && n.call(l, "__await") ? Promise.resolve(l.__await).then(function (e) {
                    t("next", e, i, a);
                  }, function (e) {
                    t("throw", e, i, a);
                  }) : Promise.resolve(l).then(function (e) {
                    c.value = e, i(c);
                  }, a);
                }a(s.arg);
              }(r, o, t, i);
            });
          }return t = t ? t.then(i, i) : i();
        };
      }function O(e, t) {
        var o = e.iterator[t.method];if (o === r) {
          if (t.delegate = null, "throw" === t.method) {
            if (e.iterator.return && (t.method = "return", t.arg = r, O(e, t), "throw" === t.method)) return d;t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
          }return d;
        }var n = g(o, e.iterator, t.arg);if ("throw" === n.type) return t.method = "throw", t.arg = n.arg, t.delegate = null, d;var i = n.arg;return i ? i.done ? (t[e.resultName] = i.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = r), t.delegate = null, d) : i : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, d);
      }function w(e) {
        var t = { tryLoc: e[0] };1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
      }function j(e) {
        var t = e.completion || {};t.type = "normal", delete t.arg, e.completion = t;
      }function R(e) {
        this.tryEntries = [{ tryLoc: "root" }], e.forEach(w, this), this.reset(!0);
      }function I(e) {
        if (e) {
          var t = e[a];if (t) return t.call(e);if ("function" == typeof e.next) return e;if (!isNaN(e.length)) {
            var o = -1,
                i = function t() {
              for (; ++o < e.length;) {
                if (n.call(e, o)) return t.value = e[o], t.done = !1, t;
              }return t.value = r, t.done = !0, t;
            };return i.next = i;
          }
        }return { next: L };
      }function L() {
        return { value: r, done: !0 };
      }
    }(function () {
      return this;
    }() || Function("return this")());
  }),
      g = function () {
    return this;
  }() || Function("return this")(),
      hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0,
      oldRuntime = hadRuntime && g.regeneratorRuntime;g.regeneratorRuntime = void 0;var runtimeModule = runtime;if (hadRuntime) g.regeneratorRuntime = oldRuntime;else try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = void 0;
  }var regenerator = runtimeModule,
      cssBase = function cssBase(e) {
    var t = [];return t.toString = function () {
      return this.map(function (t) {
        var r = cssWithMappingToString(t, e);return t[2] ? "@media " + t[2] + "{" + r + "}" : r;
      }).join("");
    }, t.i = function (e, r) {
      "string" == typeof e && (e = [[null, e, ""]]);for (var o = {}, n = 0; n < this.length; n++) {
        var i = this[n][0];"number" == typeof i && (o[i] = !0);
      }for (n = 0; n < e.length; n++) {
        var a = e[n];"number" == typeof a[0] && o[a[0]] || (r && !a[2] ? a[2] = r : r && (a[2] = "(" + a[2] + ") and (" + r + ")"), t.push(a));
      }
    }, t;
  };function cssWithMappingToString(e, t) {
    var r = e[1] || "",
        o = e[3];if (!o) return r;if (t && "function" == typeof btoa) {
      var n = toComment(o),
          i = o.sources.map(function (e) {
        return "/*# sourceURL=" + o.sourceRoot + e + " */";
      });return [r].concat(i).concat([n]).join("\n");
    }return [r].join("\n");
  }function toComment(e) {
    return "/*# " + ("sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e))))) + " */";
  }function normalizeComponent(e, t, r, o, n, i, a, s) {
    var c,
        l = "function" == typeof e ? e.options : e;if (t && (l.render = t, l.staticRenderFns = r, l._compiled = !0), o && (l.functional = !0), i && (l._scopeId = "data-v-" + i), a ? (c = function c(e) {
      (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), n && n.call(this, e), e && e._registeredComponents && e._registeredComponents.add(a);
    }, l._ssrRegister = c) : n && (c = s ? function () {
      n.call(this, this.$root.$options.shadowRoot);
    } : n), c) if (l.functional) {
      l._injectStyles = c;var u = l.render;l.render = function (e, t) {
        return c.call(t), u(e, t);
      };
    } else {
      var f = l.beforeCreate;l.beforeCreate = f ? [].concat(f, c) : [c];
    }return { exports: e, options: l };
  }function listToStyles(e, t) {
    for (var r = [], o = {}, n = 0; n < t.length; n++) {
      var i = t[n],
          a = i[0],
          s = { id: e + ":" + n, css: i[1], media: i[2], sourceMap: i[3] };o[a] ? o[a].parts.push(s) : r.push(o[a] = { id: a, parts: [s] });
    }return r;
  }var hasDocument = "undefined" != typeof document;if ("undefined" != typeof DEBUG && DEBUG && !hasDocument) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var stylesInDom = {},
      head = hasDocument && (document.head || document.getElementsByTagName("head")[0]),
      singletonElement = null,
      singletonCounter = 0,
      isProduction = !1,
      noop$1 = function noop() {},
      options = null,
      ssrIdKey = "data-vue-ssr-id",
      isOldIE = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function addStylesClient(e, t, r, o) {
    isProduction = r, options = o || {};var n = listToStyles(e, t);return addStylesToDom(n), function (t) {
      for (var r = [], o = 0; o < n.length; o++) {
        var i = n[o];(a = stylesInDom[i.id]).refs--, r.push(a);
      }t ? addStylesToDom(n = listToStyles(e, t)) : n = [];for (o = 0; o < r.length; o++) {
        var a;if (0 === (a = r[o]).refs) {
          for (var s = 0; s < a.parts.length; s++) {
            a.parts[s]();
          }delete stylesInDom[a.id];
        }
      }
    };
  }function addStylesToDom(e) {
    for (var t = 0; t < e.length; t++) {
      var r = e[t],
          o = stylesInDom[r.id];if (o) {
        o.refs++;for (var n = 0; n < o.parts.length; n++) {
          o.parts[n](r.parts[n]);
        }for (; n < r.parts.length; n++) {
          o.parts.push(addStyle(r.parts[n]));
        }o.parts.length > r.parts.length && (o.parts.length = r.parts.length);
      } else {
        var i = [];for (n = 0; n < r.parts.length; n++) {
          i.push(addStyle(r.parts[n]));
        }stylesInDom[r.id] = { id: r.id, refs: 1, parts: i };
      }
    }
  }function createStyleElement() {
    var e = document.createElement("style");return e.type = "text/css", head.appendChild(e), e;
  }function addStyle(e) {
    var t,
        r,
        o = document.querySelector("style[" + ssrIdKey + '~="' + e.id + '"]');if (o) {
      if (isProduction) return noop$1;o.parentNode.removeChild(o);
    }if (isOldIE) {
      var n = singletonCounter++;o = singletonElement || (singletonElement = createStyleElement()), t = applyToSingletonTag.bind(null, o, n, !1), r = applyToSingletonTag.bind(null, o, n, !0);
    } else o = createStyleElement(), t = applyToTag.bind(null, o), r = function r() {
      o.parentNode.removeChild(o);
    };return t(e), function (o) {
      if (o) {
        if (o.css === e.css && o.media === e.media && o.sourceMap === e.sourceMap) return;t(e = o);
      } else r();
    };
  }var replaceText = function () {
    var e = [];return function (t, r) {
      return e[t] = r, e.filter(Boolean).join("\n");
    };
  }();function applyToSingletonTag(e, t, r, o) {
    var n = r ? "" : o.css;if (e.styleSheet) e.styleSheet.cssText = replaceText(t, n);else {
      var i = document.createTextNode(n),
          a = e.childNodes;a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i);
    }
  }function applyToTag(e, t) {
    var r = t.css,
        o = t.media,
        n = t.sourceMap;if (o && e.setAttribute("media", o), options.ssrId && e.setAttribute(ssrIdKey, t.id), n && (r += "\n/*# sourceURL=" + n.sources[0] + " */", r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(n)))) + " */"), e.styleSheet) e.styleSheet.cssText = r;else {
      for (; e.firstChild;) {
        e.removeChild(e.firstChild);
      }e.appendChild(document.createTextNode(r));
    }
  }var _validateCollection = function _validateCollection(e, t) {
    if (!_isObject(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");return e;
  },
      dP$2 = _objectDp.f,
      fastKey = _meta.fastKey,
      SIZE = _descriptors ? "_s" : "size",
      getEntry = function getEntry(e, t) {
    var r,
        o = fastKey(t);if ("F" !== o) return e._i[o];for (r = e._f; r; r = r.n) {
      if (r.k == t) return r;
    }
  },
      _collectionStrong = { getConstructor: function getConstructor(e, t, r, o) {
      var n = e(function (e, i) {
        _anInstance(e, n, t, "_i"), e._t = t, e._i = _objectCreate(null), e._f = void 0, e._l = void 0, e[SIZE] = 0, void 0 != i && _forOf(i, r, e[o], e);
      });return _redefineAll(n.prototype, { clear: function clear() {
          for (var e = _validateCollection(this, t), r = e._i, o = e._f; o; o = o.n) {
            o.r = !0, o.p && (o.p = o.p.n = void 0), delete r[o.i];
          }e._f = e._l = void 0, e[SIZE] = 0;
        }, delete: function _delete(e) {
          var r = _validateCollection(this, t),
              o = getEntry(r, e);if (o) {
            var n = o.n,
                i = o.p;delete r._i[o.i], o.r = !0, i && (i.n = n), n && (n.p = i), r._f == o && (r._f = n), r._l == o && (r._l = i), r[SIZE]--;
          }return !!o;
        }, forEach: function forEach(e) {
          _validateCollection(this, t);for (var r, o = _ctx(e, arguments.length > 1 ? arguments[1] : void 0, 3); r = r ? r.n : this._f;) {
            for (o(r.v, r.k, this); r && r.r;) {
              r = r.p;
            }
          }
        }, has: function has(e) {
          return !!getEntry(_validateCollection(this, t), e);
        } }), _descriptors && dP$2(n.prototype, "size", { get: function get$$1() {
          return _validateCollection(this, t)[SIZE];
        } }), n;
    }, def: function def(e, t, r) {
      var o,
          n,
          i = getEntry(e, t);return i ? i.v = r : (e._l = i = { i: n = fastKey(t, !0), k: t, v: r, p: o = e._l, n: void 0, r: !1 }, e._f || (e._f = i), o && (o.n = i), e[SIZE]++, "F" !== n && (e._i[n] = i)), e;
    }, getEntry: getEntry, setStrong: function setStrong(e, t, r) {
      _iterDefine(e, t, function (e, r) {
        this._t = _validateCollection(e, t), this._k = r, this._l = void 0;
      }, function () {
        for (var e = this._k, t = this._l; t && t.r;) {
          t = t.p;
        }return this._t && (this._l = t = t ? t.n : this._t._f) ? _iterStep(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, _iterStep(1));
      }, r ? "entries" : "values", !r, !0), _setSpecies(t);
    } },
      SPECIES$2 = _wks("species"),
      _arraySpeciesConstructor = function _arraySpeciesConstructor(e) {
    var t;return _isArray(e) && ("function" != typeof (t = e.constructor) || t !== Array && !_isArray(t.prototype) || (t = void 0), _isObject(t) && null === (t = t[SPECIES$2]) && (t = void 0)), void 0 === t ? Array : t;
  },
      _arraySpeciesCreate = function _arraySpeciesCreate(e, t) {
    return new (_arraySpeciesConstructor(e))(t);
  },
      _arrayMethods = function _arrayMethods(e, t) {
    var r = 1 == e,
        o = 2 == e,
        n = 3 == e,
        i = 4 == e,
        a = 6 == e,
        s = 5 == e || a,
        c = t || _arraySpeciesCreate;return function (t, l, u) {
      for (var f, _, p = _toObject(t), d = _iobject(p), y = _ctx(l, u, 3), h = _toLength(d.length), m = 0, E = r ? c(t, h) : o ? c(t, 0) : void 0; h > m; m++) {
        if ((s || m in d) && (_ = y(f = d[m], m, p), e)) if (r) E[m] = _;else if (_) switch (e) {case 3:
            return !0;case 5:
            return f;case 6:
            return m;case 2:
            E.push(f);} else if (i) return !1;
      }return a ? -1 : n || i ? i : E;
    };
  },
      dP$3 = _objectDp.f,
      each = _arrayMethods(0),
      _collection = function _collection(e, t, r, o, n, i) {
    var a = _global[e],
        s = a,
        c = n ? "set" : "add",
        l = s && s.prototype,
        u = {};return _descriptors && "function" == typeof s && (i || l.forEach && !_fails(function () {
      new s().entries().next();
    })) ? (s = t(function (t, r) {
      _anInstance(t, s, e, "_c"), t._c = new a(), void 0 != r && _forOf(r, n, t[c], t);
    }), each("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","), function (e) {
      var t = "add" == e || "set" == e;e in l && (!i || "clear" != e) && _hide(s.prototype, e, function (r, o) {
        if (_anInstance(this, s, e), !t && i && !_isObject(r)) return "get" == e && void 0;var n = this._c[e](0 === r ? 0 : r, o);return t ? this : n;
      });
    }), i || dP$3(s.prototype, "size", { get: function get$$1() {
        return this._c.size;
      } })) : (s = o.getConstructor(t, e, n, c), _redefineAll(s.prototype, r), _meta.NEED = !0), _setToStringTag(s, e), u[e] = s, _export(_export.G + _export.W + _export.F, u), i || o.setStrong(s, e, n), s;
  },
      SET = "Set",
      es6_set = _collection(SET, function (e) {
    return function () {
      return e(this, arguments.length > 0 ? arguments[0] : void 0);
    };
  }, { add: function add(e) {
      return _collectionStrong.def(_validateCollection(this, SET), e = 0 === e ? 0 : e, e);
    } }, _collectionStrong),
      _arrayFromIterable = function _arrayFromIterable(e, t) {
    var r = [];return _forOf(e, !1, r.push, r, t), r;
  },
      _collectionToJson = function _collectionToJson(e) {
    return function () {
      if (_classof(this) != e) throw TypeError(e + "#toJSON isn't generic");return _arrayFromIterable(this);
    };
  };_export(_export.P + _export.R, "Set", { toJSON: _collectionToJson("Set") });var _setCollectionOf = function _setCollectionOf(e) {
    _export(_export.S, e, { of: function of() {
        for (var e = arguments.length, t = new Array(e); e--;) {
          t[e] = arguments[e];
        }return new this(t);
      } });
  };_setCollectionOf("Set");var _setCollectionFrom = function _setCollectionFrom(e) {
    _export(_export.S, e, { from: function from(e) {
        var t,
            r,
            o,
            n,
            i = arguments[1];return _aFunction(this), (t = void 0 !== i) && _aFunction(i), void 0 == e ? new this() : (r = [], t ? (o = 0, n = _ctx(i, arguments[2], 2), _forOf(e, !1, function (e) {
          r.push(n(e, o++));
        })) : _forOf(e, !1, r.push, r), new this(r));
      } });
  };_setCollectionFrom("Set");var set$1$1 = _core.Set,
      set$2$1 = createCommonjsModule(function (e) {
    e.exports = { default: set$1$1, __esModule: !0 };
  }),
      set$3 = unwrapExports(set$2$1);function mount(e, t, r) {
    void 0 === (r = r || window)[t] && (r[t] = e);
  }var helpers = {},
      cssLoaderKey = "css-loader/lib/css-base",
      regeneratorKey = "babel-runtime/regenerator";var BABEL_RUNTIME_HELPERS = "babel-runtime/helpers/";helpers[BABEL_RUNTIME_HELPERS + "_async-generator-delegate"] = _asyncGeneratorDelegate$1, helpers[BABEL_RUNTIME_HELPERS + "_async-generator"] = _asyncGenerator$1, helpers[BABEL_RUNTIME_HELPERS + "_async-iterator"] = _asyncIterator$1, helpers[BABEL_RUNTIME_HELPERS + "_async-to-generator"] = _asyncToGenerator$1, helpers[BABEL_RUNTIME_HELPERS + "_class-call-check"] = _classCallCheck$1, helpers[BABEL_RUNTIME_HELPERS + "_create-class"] = _createClass$1, helpers[BABEL_RUNTIME_HELPERS + "_defaults"] = _defaults$1, helpers[BABEL_RUNTIME_HELPERS + "_define-enumerable-properties"] = _defineEnumerableProperties$1, helpers[BABEL_RUNTIME_HELPERS + "_define-property"] = _defineProperty$1, helpers[BABEL_RUNTIME_HELPERS + "_extends"] = _extends$2, helpers[BABEL_RUNTIME_HELPERS + "_get"] = _get$1, helpers[BABEL_RUNTIME_HELPERS + "_inherits"] = _inherits$1, helpers[BABEL_RUNTIME_HELPERS + "_instanceof"] = _instanceof$2, helpers[BABEL_RUNTIME_HELPERS + "_interop-require-default"] = _interopRequireDefault$1, helpers[BABEL_RUNTIME_HELPERS + "_interop-require-wildcard"] = _interopRequireWildcard$1, helpers[BABEL_RUNTIME_HELPERS + "_jsx"] = _jsx$1, helpers[BABEL_RUNTIME_HELPERS + "_new-arrow-check"] = _newArrowCheck$1, helpers[BABEL_RUNTIME_HELPERS + "_object-destructuring-empty"] = _objectDestructuringEmpty$1, helpers[BABEL_RUNTIME_HELPERS + "_object-without-properties"] = _objectWithoutProperties$1, helpers[BABEL_RUNTIME_HELPERS + "_possible-constructor-return"] = _possibleConstructorReturn$1, helpers[BABEL_RUNTIME_HELPERS + "_self-global"] = _selfGlobal$1, helpers[BABEL_RUNTIME_HELPERS + "_set"] = _set$1, helpers[BABEL_RUNTIME_HELPERS + "_sliced-to-array-loose"] = _slicedToArrayLoose$1, helpers[BABEL_RUNTIME_HELPERS + "_sliced-to-array"] = _slicedToArray$1, helpers[BABEL_RUNTIME_HELPERS + "_tagged-template-literal-loose"] = _taggedTemplateLiteralLoose$1, helpers[BABEL_RUNTIME_HELPERS + "_tagged-template-literal"] = _taggedTemplateLiteral$1, helpers[BABEL_RUNTIME_HELPERS + "_temporal-ref"] = _temporalRef$1, helpers[BABEL_RUNTIME_HELPERS + "_temporal-undefined"] = _temporalUndefined$1, helpers[BABEL_RUNTIME_HELPERS + "_to-array"] = _toArray$1, helpers[BABEL_RUNTIME_HELPERS + "_to-consumable-array"] = _toConsumableArray$1, helpers[BABEL_RUNTIME_HELPERS + "_typeof"] = _typeof$1$1, helpers[BABEL_RUNTIME_HELPERS + "async-generator-delegate"] = asyncGeneratorDelegate$1$1, helpers[BABEL_RUNTIME_HELPERS + "async-generator"] = asyncGenerator$1$1, helpers[BABEL_RUNTIME_HELPERS + "async-iterator"] = asyncIterator$1$1, helpers[BABEL_RUNTIME_HELPERS + "async-to-generator"] = asyncToGenerator$1$1, helpers[BABEL_RUNTIME_HELPERS + "asyncGenerator"] = _asyncGenerator, helpers[BABEL_RUNTIME_HELPERS + "asyncGeneratorDelegate"] = _asyncGeneratorDelegate, helpers[BABEL_RUNTIME_HELPERS + "asyncIterator"] = _asyncIterator, helpers[BABEL_RUNTIME_HELPERS + "asyncToGenerator"] = _asyncToGenerator, helpers[BABEL_RUNTIME_HELPERS + "class-call-check"] = classCallCheck$1$1, helpers[BABEL_RUNTIME_HELPERS + "classCallCheck"] = _classCallCheck, helpers[BABEL_RUNTIME_HELPERS + "create-class"] = createClass$1$1, helpers[BABEL_RUNTIME_HELPERS + "createClass"] = _createClass, helpers[BABEL_RUNTIME_HELPERS + "defaults"] = _defaults, helpers[BABEL_RUNTIME_HELPERS + "define-enumerable-properties"] = defineEnumerableProperties$1$1, helpers[BABEL_RUNTIME_HELPERS + "define-property"] = defineProperty$5, helpers[BABEL_RUNTIME_HELPERS + "defineEnumerableProperties"] = _defineEnumerableProperties, helpers[BABEL_RUNTIME_HELPERS + "defineProperty"] = _defineProperty, helpers[BABEL_RUNTIME_HELPERS + "extends"] = _extends$1$1, helpers[BABEL_RUNTIME_HELPERS + "get"] = _get, helpers[BABEL_RUNTIME_HELPERS + "inherits"] = _inherits, helpers[BABEL_RUNTIME_HELPERS + "instanceof"] = _instanceof$1$1, helpers[BABEL_RUNTIME_HELPERS + "interop-require-default"] = interopRequireDefault$1$1, helpers[BABEL_RUNTIME_HELPERS + "interop-require-wildcard"] = interopRequireWildcard$1$1, helpers[BABEL_RUNTIME_HELPERS + "interopRequireDefault"] = _interopRequireDefault, helpers[BABEL_RUNTIME_HELPERS + "interopRequireWildcard"] = _interopRequireWildcard, helpers[BABEL_RUNTIME_HELPERS + "jsx"] = _jsx, helpers[BABEL_RUNTIME_HELPERS + "new-arrow-check"] = newArrowCheck$1$1, helpers[BABEL_RUNTIME_HELPERS + "newArrowCheck"] = _newArrowCheck, helpers[BABEL_RUNTIME_HELPERS + "object-destructuring-empty"] = objectDestructuringEmpty$1$1, helpers[BABEL_RUNTIME_HELPERS + "object-without-properties"] = objectWithoutProperties$1$1, helpers[BABEL_RUNTIME_HELPERS + "objectDestructuringEmpty"] = _objectDestructuringEmpty, helpers[BABEL_RUNTIME_HELPERS + "objectWithoutProperties"] = _objectWithoutProperties, helpers[BABEL_RUNTIME_HELPERS + "possible-constructor-return"] = possibleConstructorReturn$1$1, helpers[BABEL_RUNTIME_HELPERS + "possibleConstructorReturn"] = _possibleConstructorReturn, helpers[BABEL_RUNTIME_HELPERS + "self-global"] = selfGlobal$1$1, helpers[BABEL_RUNTIME_HELPERS + "selfGlobal"] = _selfGlobal, helpers[BABEL_RUNTIME_HELPERS + "set"] = _set, helpers[BABEL_RUNTIME_HELPERS + "sliced-to-array-loose"] = slicedToArrayLoose$1$1, helpers[BABEL_RUNTIME_HELPERS + "sliced-to-array"] = slicedToArray$1$1, helpers[BABEL_RUNTIME_HELPERS + "slicedToArray"] = _slicedToArray, helpers[BABEL_RUNTIME_HELPERS + "slicedToArrayLoose"] = _slicedToArrayLoose, helpers[BABEL_RUNTIME_HELPERS + "tagged-template-literal-loose"] = taggedTemplateLiteralLoose$1$1, helpers[BABEL_RUNTIME_HELPERS + "tagged-template-literal"] = taggedTemplateLiteral$1$1, helpers[BABEL_RUNTIME_HELPERS + "taggedTemplateLiteral"] = _taggedTemplateLiteral, helpers[BABEL_RUNTIME_HELPERS + "taggedTemplateLiteralLoose"] = _taggedTemplateLiteralLoose, helpers[BABEL_RUNTIME_HELPERS + "temporal-ref"] = temporalRef$1$1, helpers[BABEL_RUNTIME_HELPERS + "temporal-undefined"] = temporalUndefined$1$1, helpers[BABEL_RUNTIME_HELPERS + "temporalRef"] = _temporalRef, helpers[BABEL_RUNTIME_HELPERS + "temporalUndefined"] = _temporalUndefined, helpers[BABEL_RUNTIME_HELPERS + "to-array"] = toArray$1$1, helpers[BABEL_RUNTIME_HELPERS + "to-consumable-array"] = toConsumableArray$1$1, helpers[BABEL_RUNTIME_HELPERS + "toArray"] = _toArray, helpers[BABEL_RUNTIME_HELPERS + "toConsumableArray"] = _toConsumableArray, helpers[BABEL_RUNTIME_HELPERS + "typeof"] = _typeof$1, helpers[cssLoaderKey] = cssBase, helpers[regeneratorKey] = regenerator, helpers["vue-loader/lib/runtime/componentNormalizer"] = normalizeComponent, helpers["vue-style-loader/lib/addStylesClient"] = addStylesClient, helpers["vue-style-loader/lib/listToStyles"] = listToStyles;for (var e in helpers) {
    var t = helpers[e];e === regeneratorKey || e === cssLoaderKey || t.__esModule || (helpers[e] = { __esModule: !0, default: t });
  }function installMipComponentsPolyfill() {
    mount(symbol$2, "Symbol"), mount(set$3, "Set"), mount(arrayFrom, "from", Array), mount(helpers, "__mipComponentsWebpackHelpers__");
  }

  var Runtime = function () {
    /**
     * @param {!Window} win
     */
    function Runtime(win) {
      classCallCheck(this, Runtime);

      this.installServices(win);

      /**
       * @private
       * @const
       */
      this.win = win;

      /**
       * @private
       * @const
       */
      this.extensions = Services.extensionsFor(win);
    }

    /**
     * Install services.
     *
     * @param {!Window} win
     * @private
     */


    createClass(Runtime, [{
      key: 'installServices',
      value: function installServices(win) {
        installMipdocService(win);
        installExtensionsService(win);
        installTimerService(win);
      }

      /**
       * Returns `pageMeta` and `standalone` of this page.
       *
       * @returns {!Object}
       * @private
       */

    }, {
      key: 'getPageMetadata',
      value: function getPageMetadata() {
        // 通过 window.name 传递信息，可用于跨域情况
        var pageMeta = void 0;
        var pageMetaConfirmed = false;
        try {
          pageMeta = JSON.parse(this.win.name);
          /* istanbul ignore next */
          pageMetaConfirmed = true;
        } catch (e) {
          pageMeta = {
            standalone: false,
            isRootPage: true,
            isCrossOrigin: false
          };
        }

        // 当前是否是独立站
        var standalone = void 0;
        /* istanbul ignore if */
        if (pageMetaConfirmed) {
          standalone = pageMeta.standalone;
        } else {
          try {
            standalone = pageMeta.standalone || !viewer.isIframed || typeof this.win.top.MIP !== 'undefined';
          } catch (e) {
            /* istanbul ignore next */
            standalone = false;
          }
          pageMeta.standalone = standalone;
        }

        return {
          pageMeta: pageMeta,
          standalone: standalone
        };
      }

      /**
       * Returns the runtime object.
       */

    }, {
      key: 'get',
      value: function get$$1() {
        var _getPageMetadata = this.getPageMetadata(),
            pageMeta = _getPageMetadata.pageMeta,
            standalone = _getPageMetadata.standalone;

        viewer.pageMeta = pageMeta;

        var _extensions = this.extensions,
            installExtension = _extensions.installExtension,
            registerElement = _extensions.registerElement,
            registerService = _extensions.registerService,
            registerTemplate = _extensions.registerTemplate;


        var MIP = {
          version: '2',
          CustomElement: CustomElement,
          Services: Services,
          builtinComponents: {
            MipShell: MipShell,
            MIPShell: MipShell
          },
          css: {},
          hash: util.hash,
          performance: performance,
          prerenderElement: resources$1.prerenderElement,
          push: installExtension,
          registerElement: registerElement,
          registerService: registerService,
          registerTemplate: registerTemplate,
          /**
           * @deprecated Use `MIP.push` and `MIP.registerElement` instead.
           */
          registerCustomElement: registerElement,
          /**
           * @deprecated Use `MIP.push` and `MIP.registerElement` instead.
           */
          registerVueCustomElement: registerElement,
          standalone: standalone,
          templates: util.templates,
          util: util,
          viewer: viewer,
          viewport: viewport
        };

        install(MIP);
        installMipComponentsPolyfill();

        return MIP;
      }
    }]);
    return Runtime;
  }();

  /**
   * @param {!Window} win
   * @returns {!Runtime}
   */


  function getRuntime(win) {
    var runtime = new Runtime(win);

    return runtime.get();
  }

  /**
   * @file mip-img 图片组件
   * @author wangpei07,JennyL
   */

  var css$2 = util.css,
      rect$1 = util.rect,
      event$1 = util.event,
      naboo = util.naboo,
      makeCacheUrl$1 = util.makeCacheUrl;

  // 取值根据 https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement

  var imgAttributes = ['alt', 'ismap', 'src', 'sizes', 'srcset', 'usemap', 'title'];

  /**
   * 获取弹出图片的位置
   * 2018-10-11 增加：由于浏览效果改为了 contain 效果，所以 carousel 内部采用 div 的 background-image 来显示图片。
   * 所以 carousel 必须设置的高宽都固定成了视口的高宽。保留这个函数只是为了动画效果。
   *
   * @param  {number} imgWidth  原始图片的宽度
   * @param  {number} imgHeight 原始图片的高度
   * @return {Object}           包含定位信息的对象
   */
  function getPopupImgPos(imgWidth, imgHeight) {
    var viewportW = viewport.getWidth();
    var viewportH = viewport.getHeight();
    var top = 0;
    var left = 0;
    if (viewportH / viewportW < imgHeight / imgWidth) {
      var width = Math.round(viewportH * imgWidth / imgHeight);
      left = (viewportW - width) / 2;
      return {
        height: viewportH,
        width: width,
        left: left,
        top: 0
      };
    }
    var height = Math.round(viewportW * imgHeight / imgWidth);
    top = (viewportH - height) / 2;
    return {
      height: height,
      width: viewportW,
      left: 0,
      top: top
    };
  }
  /**
   * 从mip-img属性列表里获取属性
   *
   * @param {Object} attributes 参考: https://dom.spec.whatwg.org/#interface-namednodemap
   * @return {Object} 属性列表JSON
   * @example
   * {
   *     "src": "http://xx.jpeg"
   *     "width": "720"
   * }
   */
  function getAttributeSet(attributes) {
    var attrs = {};
    Array.prototype.slice.apply(attributes).forEach(function (attr) {
      attrs[attr.name] = attr.value;
    });
    return attrs;
  }
  /**
   * 获取图片的offset
   *
   * @param  {HTNMLElement} img img
   * @return {Object}     一个包含offset信息的对象
   */
  function getImgOffset(img) {
    var imgOffset = rect$1.getElementOffset(img);
    return imgOffset;
  }
  /**
   * 获取所有图片的 src
   * @return {Array.<HTMLElement>} 返回修改的元素集
   */
  function getImgsSrc() {
    return [].concat(toConsumableArray(document.querySelectorAll('mip-img'))).filter(function (value) {
      return value.hasAttribute('popup');
    }).map(function (value) {
      return value.getAttribute('src');
    });
  }
  /**
   * 找出当前视口下的图片
   * @param  {HTMLElement} carouselWrapper carouselWrapper
   * @param  {HTMLElement} mipCarousel mipCarousel
   * @return {HTMLElement} img
   */
  function getCurrentImg(carouselWrapper, mipCarousel) {
    // 例如：'translate3d(-90px,0,0)'
    var str = carouselWrapper.style.webkitTransform || carouselWrapper.style.transform;
    var result = /translate3d\(-?([0-9]+)/i.exec(str);
    // 原先宽度是视口宽度，现在需要的是图片本身宽度。最后还是一样的。。。
    var width = mipCarousel.getAttribute('width');
    var number = parseInt(result[1], 10) / width;
    return carouselWrapper.querySelectorAll('.div-mip-img')[number];
  }
  /**
   * 创建图片弹层
   *
   * @param  {HTMLElement} element mip-img组件元素
   * @param  {HTMLElment} img     mip-img元素包裹的img
   * @return {HTMLElment}         图片弹层的div
   */
  function createPopup(element, img) {
    // 获取图片数组
    var imgsSrcArray = getImgsSrc();
    var index = parseInt(element.getAttribute('index'), 10) || 0;

    var popup = document.createElement('div');
    css$2(popup, 'display', 'block');

    popup.className = 'mip-img-popUp-wrapper';
    popup.setAttribute('data-name', 'mip-img-popUp-name');

    // 创建图片预览图层
    var popUpBg = document.createElement('div');
    // 创建多图预览 wrapper
    var carouselWrapper = document.createElement('div');
    // 计算 wrapper 窗口大小，变为视口大小
    css$2(carouselWrapper, {
      'position': 'absolute',
      'width': viewport.getWidth(),
      'height': viewport.getHeight(),
      'left': 0,
      'top': 0
    });
    // 创建 mip-carousel
    var carousel = document.createElement('mip-carousel');

    carousel.setAttribute('layout', 'responsive');
    carousel.setAttribute('index', index + 1);
    carousel.setAttribute('width', viewport.getWidth());
    carousel.setAttribute('height', viewport.getHeight());

    for (var i = 0; i < imgsSrcArray.length; i++) {
      var mipImg = document.createElement('div');
      mipImg.className = 'div-mip-img';
      mipImg.setAttribute('data-src', imgsSrcArray[i]);
      css$2(mipImg, {
        'background-image': 'url(' + imgsSrcArray[i] + ')',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'background-position': 'center'
      });
      carousel.appendChild(mipImg);
    }
    popUpBg.className = 'mip-img-popUp-bg';

    carouselWrapper.appendChild(carousel);
    popup.appendChild(popUpBg);
    popup.appendChild(carouselWrapper);
    document.body.appendChild(popup);

    return popup;
  }
  /**
   * 将图片与弹层绑定
   *
   * @param  {HTMLElement} element mip-img
   * @param  {HTMLElement} img     mip-img下的img
   * @return {void}         无
   */
  function bindPopup(element, img) {
    // 图片点击时展现图片
    img.addEventListener('click', function (event$$1) {
      event$$1.stopPropagation();
      // 图片未加载则不弹层
      /* istanbul ignore if */
      if (img.width + img.naturalWidth === 0) {
        return;
      }

      // Show page mask
      window.MIP.viewer.page.togglePageMask(true, {
        skipTransition: true,
        extraClass: 'black'
      });
      var popup = createPopup(element, img);
      var popupBg = popup.querySelector('.mip-img-popUp-bg');
      var mipCarousel = popup.querySelector('mip-carousel');
      var popupImg = new Image();
      popupImg.setAttribute('src', img.src);
      popup.appendChild(popupImg);

      var imgOffset = getImgOffset(img);

      popup.addEventListener('click', imagePop, false);

      function imagePop() {
        // Hide page mask
        window.MIP.viewer.page.togglePageMask(false, {
          skipTransition: true,
          extraClass: 'black'
        });

        var mipCarouselWrapper = popup.querySelector('.mip-carousel-wrapper');
        /* istanbul ignore if */
        if (mipCarouselWrapper == null) return;

        // 找出当前视口下的图片
        var currentImg = getCurrentImg(mipCarouselWrapper, mipCarousel);
        popupImg.setAttribute('src', currentImg.getAttribute('data-src'));
        var previousPos = getImgOffset(img);
        // 获取弹出图片滑动的距离，根据前面的设定，top大于0就不是长图，小于0才是滑动的距离。
        var currentImgPos = getImgOffset(currentImg);
        currentImgPos.top < 0 && (previousPos.top -= currentImgPos.top);
        currentImgPos.left < 0 && (previousPos.left -= currentImgPos.left);
        css$2(popupImg, getPopupImgPos(popupImg.naturalWidth, popupImg.naturalHeight));
        css$2(popupImg, 'display', 'block');
        css$2(mipCarousel, 'display', 'none');
        naboo.animate(popupBg, {
          opacity: 0
        }).start();

        naboo.animate(popup, { 'display': 'none' });
        naboo.animate(popupImg, previousPos).start(function () {
          css$2(img, 'visibility', 'visible');
          css$2(popup, 'display', 'none');
          popup.removeEventListener('click', imagePop, false);
          popup.remove();
        });
      }

      var onResize = function onResize() {
        imgOffset = getImgOffset(img);
        css$2(popupImg, imgOffset);
        naboo.animate(popupImg, getPopupImgPos(img.naturalWidth, img.naturalHeight)).start();
      };
      window.addEventListener('resize', onResize);

      css$2(popupImg, imgOffset);
      css$2(mipCarousel, 'visibility', 'hidden');
      css$2(popupBg, 'opacity', 1);

      naboo.animate(popupImg, getPopupImgPos(img.naturalWidth, img.naturalHeight)).start(function () {
        css$2(popupImg, 'display', 'none');
        css$2(mipCarousel, 'visibility', 'visible');
      });
      css$2(img, 'visibility', 'hidden');
      css$2(img.parentNode, 'zIndex', 'inherit');
    }, false);
  }

  var MipImg = function (_CustomElement) {
    inherits(MipImg, _CustomElement);

    function MipImg() {
      classCallCheck(this, MipImg);
      return possibleConstructorReturn(this, (MipImg.__proto__ || Object.getPrototypeOf(MipImg)).apply(this, arguments));
    }

    createClass(MipImg, [{
      key: 'isLoadingEnabled',
      value: function isLoadingEnabled() {
        return true;
      }

      /**
       * Check whether the element need to be rendered in advance
       *
       * @param {Object} elementRect element rect
       * @param {Object} viewportRect viewport rect
       *
       * @return {boolean}
       */

    }, {
      key: 'prerenderAllowed',
      value: function prerenderAllowed(elementRect, viewportRect) {
        var threshold = viewportRect.height;
        return viewportRect.top + viewportRect.height + threshold >= elementRect.top && elementRect.top + elementRect.height + threshold >= viewportRect.top;
      }

      /** @overwrite */

    }, {
      key: 'build',
      value: function build() {
        this.createPlaceholder();
      }

      /**
       * Create default placeholder if element has not define size
       */

    }, {
      key: 'createPlaceholder',
      value: function createPlaceholder() {
        if (this.element.classList.contains('mip-layout-size-defined')) {
          return;
        }

        /* istanbul ignore if */
        if (this.element.querySelector('.mip-default-placeholder')) {
          return;
        }

        var placeholder = document.createElement('mip-i-space');
        placeholder.classList.add('mip-default-placeholder');

        this.element.appendChild(css$2(placeholder, {
          'padding-bottom': '75%',
          'background': 'rgba(0, 0, 0, 0.08)',
          'opacity': '1'
        }));
      }
    }, {
      key: 'removePlaceholder',
      value: function removePlaceholder() {
        var placeholder = this.element.querySelector('.mip-default-placeholder');
        if (placeholder) {
          this.element.removeChild(placeholder);
        }
      }
    }, {
      key: 'layoutCallback',
      value: function layoutCallback() {
        var _this2 = this;

        var ele = this.element;
        var img = new Image();
        if (ele.hasAttribute('popup')) {
          var allMipImg = [].concat(toConsumableArray(document.querySelectorAll('mip-img'))).filter(function (value) {
            return value.hasAttribute('popup');
          });
          ele.setAttribute('index', allMipImg.indexOf(ele));
        }

        this.applyFillContent(img, true);

        // transfer attributes from mip-img to img tag
        this.attributes = getAttributeSet(this.element.attributes);
        for (var k in this.attributes) {
          if (this.attributes.hasOwnProperty(k) && imgAttributes.indexOf(k) > -1) {
            if (k === 'src') {
              // src attribute needs to be mip-cached
              var imgsrc = makeCacheUrl$1(this.attributes.src, 'img');
              img.setAttribute(k, imgsrc);
            } else if (k === 'srcset') {
              var imgSrcset = this.attributes.srcset;
              var reg = /[\w-/]+\.(jpg|jpeg|png|gif|webp|bmp|tiff) /g;
              var srcArr = imgSrcset.replace(reg, function (url) {
                return makeCacheUrl$1(url, 'img');
              });
              img.setAttribute('srcset', srcArr);
            } else {
              img.setAttribute(k, this.attributes[k]);
            }
          }
        }

        ele.appendChild(img);
        if (ele.hasAttribute('popup')) {
          bindPopup(ele, img);
        }
        this.element.classList.add('mip-img-loading');
        return event$1.loadPromise(img).then(function () {
          // 标识资源已加载完成
          try {
            _this2.resourcesComplete();
          } catch (e) {}

          _this2.removePlaceholder();
          _this2.element.classList.remove('mip-img-loading');
          _this2.element.classList.add('mip-img-loaded');
          customEmit(_this2.element, 'load');
        }).catch(function (reason) {
          /* istanbul ignore if */
          if (!viewer.isIframed) {
            return Promise.reject(reason);
          }
          var ele = document.createElement('a');
          ele.href = img.src;
          if (!/(\?|&)mip_img_ori=1(&|$)/.test(ele.search)) {
            var search = ele.search || '?';
            ele.search += (/[?&]$/.test(search) ? '' : '&') + 'mip_img_ori=1';
            img.src = ele.href;
          }

          return Promise.reject(reason);
        });
      }
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        var _this3 = this;

        if (attributeName === 'src' && oldValue !== newValue) {
          var img = this.element.querySelector('img');

          if (!img) {
            return;
          }

          event$1.loadPromise(img).then(function () {
            _this3.element.toggleFallback(false);
          });

          img.src = newValue;
        }
      }
    }, {
      key: 'hasResources',
      value: function hasResources() {
        return true;
      }
    }], [{
      key: 'observedAttributes',
      get: function get$$1() {
        return imgAttributes;
      }
    }]);
    return MipImg;
  }(CustomElement);

  /**
   * @file       mip-font-size
   * @author     chenyongle(chenyongle@baidu.com)
   * @description 设置页面文档根元素的 font-size
   */

  var MipRem = function (_CustomElement) {
    inherits(MipRem, _CustomElement);

    function MipRem() {
      classCallCheck(this, MipRem);
      return possibleConstructorReturn(this, (MipRem.__proto__ || Object.getPrototypeOf(MipRem)).apply(this, arguments));
    }

    createClass(MipRem, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        this.changeHtmlFontSize();
        window.addEventListener('resize', this.changeHtmlFontSize.bind(this), false);
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        document.documentElement.style.fontSize = '';
      }
    }, {
      key: 'changeHtmlFontSize',
      value: function changeHtmlFontSize() {
        // 获取fontSize 格式类似于 [{"maxWidth": 360, "size": 80}, {"minWidth": 361, "maxWidth": 720, "size": 90}, {"minWidth": 721, "size": 100}]
        var init = '';
        var fontSize = this.element.getAttribute('font-size') || init;
        var width = viewport.getWidth();
        try {
          fontSize = JSON.parse(fontSize);
        } catch (e) {
          fontSize = init;
          console.warn('mip-rem 的 font-size 属性值格式不对！');
        }
        // 类似于 media query 的效果
        var size = init;
        for (var i = fontSize.length - 1; i >= 0; i--) {
          if (fontSize[i]['maxWidth'] && fontSize[i]['maxWidth'] < width) {
            continue;
          }
          if (fontSize[i]['minWidth'] && fontSize[i]['minWidth'] > width) {
            continue;
          }
          size = fontSize[i].size || init;
          break;
        }
        document.documentElement.style.fontSize = size + 'px';
      }
    }]);
    return MipRem;
  }(CustomElement);

  /**
   * @file 视频播放组件
   * @author @author harttle<yangjun14@baidu.com>, liangjiaying<jennyliang220@github>
   * @version 1.0
   * @copyright 2016 Baidu.com, Inc. All Rights Reserved
   */
  // import {OUTER_MESSAGE_CHANGE_STATE} from '../page/const/index'

  var windowInIframe = viewer.isIframed;

  var videoAttributes = ['ads', 'src', 'controls', 'loop', 'autoplay', 'autobuffer', 'crossorigin', 'height', 'muted', 'preload', 'poster', 'width', 'currenttime'];

  /**
   * Get attribute Set from attribute List
   *
   * @param {NamedNodeMap} attributes the attribute list, spec: https://dom.spec.whatwg.org/#interface-namednodemap
   * @return {Object} the attribute set, legacy:
   * @example
   * {
   *     "src": "http://xx.mp4",
   *     "autoplay": "",
   *     "width": "720"
   * }
   */
  function getAttributeSet$1(attributes) {
    var attrs = {};
    Array.prototype.slice.apply(attributes).forEach(function (attr) {
      attrs[attr.name] = attr.value;
    });
    return attrs;
  }

  var MipVideo = function (_CustomElement) {
    inherits(MipVideo, _CustomElement);

    function MipVideo() {
      classCallCheck(this, MipVideo);
      return possibleConstructorReturn(this, (MipVideo.__proto__ || Object.getPrototypeOf(MipVideo)).apply(this, arguments));
    }

    createClass(MipVideo, [{
      key: 'layoutCallback',
      value: function layoutCallback() {
        var _this2 = this;

        this.attributes = getAttributeSet$1(this.element.attributes);
        this.sourceDoms = this.element.querySelectorAll('source');
        this.src = this.attributes.src;

        // if window is https
        var windowProHttps = !!window.location.protocol.match(/^https:/);
        // if video source is https
        var sourceIsHttps = true;
        if (!this.sourceDoms.length) {
          sourceIsHttps = false;
        }
        Array.prototype.slice.apply(this.sourceDoms).forEach(function (node) {
          if (!node.src.match(/^https:|^\/\//)) {
            sourceIsHttps = false;
          }
        });
        var videoProHttps = this.src && this.src.match(/^https:|^\/\//) || this.sourceDoms && sourceIsHttps;

        // page ishttps         + video is https    = renderInView
        // page ishttps(in iframe) + video is http    = renderPlayElsewhere
        // page ishttps(else)   + video is http     = renderInView（not mip）
        // page ishttp          + random video      = renderInView
        // page not iframe || video src is https ||  video http + page http
        /* istanbul ignore else */
        if (!windowInIframe || videoProHttps ||
        /* istanbul ignore next */windowInIframe && !videoProHttps && !windowProHttps) {
          this.videoElement = this.renderInView();
        } else {
          // 再细分为 iframe 外层页面是否为百度搜索结果页，如果是就 renderPlayElsewhere，否则就 renderError
          // 考虑安全性，renderPlayElsewhere 可以在其他地方来打开视频，而renderError 则是直接显示X，不建议播放
          if (!window.MIP.standalone) {
            this.videoElement = this.renderPlayElsewhere();
          } else {
            this.videoElement = this.renderError();
          }
        }

        this.addEventAction('seekTo', function (e, currentTime) {
          _this2.videoElement.currentTime = currentTime;
        });
        this.addEventAction('play', function () {
          // renderPlayElsewhere 的 videoElement 是 div，没有 play
          /* istanbul ignore next */
          _this2.videoElement.play && _this2.videoElement.play();
        });
        this.addEventAction('pause', function () {
          // renderPlayElsewhere 的 videoElement 是 div，没有 pause
          /* istanbul ignore next */
          _this2.videoElement.pause && _this2.videoElement.pause();
        });

        this.applyFillContent(this.videoElement, true);
        return Promise.resolve();
      }

      // Render the `<video>` element, and append to `this.element`

    }, {
      key: 'renderInView',
      value: function renderInView() {
        var videoEl = document.createElement('video');
        for (var k in this.attributes) {
          if (this.attributes.hasOwnProperty(k) && videoAttributes.indexOf(k) > -1) {
            videoEl.setAttribute(k, this.attributes[k]);
          }
        }
        var currentTime = this.attributes['currenttime'];
        videoEl.setAttribute('playsinline', 'playsinline');
        // 兼容qq浏览器
        videoEl.setAttribute('x5-playsinline', 'x5-playsinline');
        videoEl.setAttribute('webkit-playsinline', 'webkit-playsinline');
        videoEl.setAttribute('t7-video-player-type', 'inline');
        Array.prototype.slice.apply(this.element.childNodes).forEach(function (node) {
          // FIXME: mip layout related, remove this!
          if (node.nodeName.toLowerCase() === 'mip-i-space') {
            return;
          }
          videoEl.appendChild(node);
        });
        // 如果设置了播放时间点，则直接跳转至播放时间的位置开始播放
        videoEl.addEventListener('loadedmetadata', function () {
          if (currentTime) {
            this.currentTime = +currentTime;
          }
        });
        this.element.appendChild(videoEl);
        return videoEl;
      }
      // 混合内容警告：出于安全因素的考虑，不予播放，显示一个 X

    }, {
      key: 'renderError',
      value: function renderError() {
        var videoEl = document.createElement('div');
        videoEl.setAttribute('class', 'mip-video-poster');
        if (this.attributes.poster) {
          videoEl.style.backgroundImage = 'url(' + this.attributes.poster + ')';
          videoEl.style.backgroundSize = 'cover';
        }

        var playBtn = document.createElement('span');
        playBtn.setAttribute('class', 'mip-video-error');
        videoEl.appendChild(playBtn);
        this.element.appendChild(videoEl);
        return videoEl;
      }
      // Render the `<div>` element with poster and play btn, and append to `this.element`

    }, {
      key: 'renderPlayElsewhere',
      value: function renderPlayElsewhere() {
        var videoEl = document.createElement('div');
        var urlSrc = void 0;
        videoEl.setAttribute('class', 'mip-video-poster');
        if (this.attributes.poster) {
          videoEl.style.backgroundImage = 'url(' + this.attributes.poster + ')';
          videoEl.style.backgroundSize = 'cover';
        }

        var playBtn = document.createElement('span');
        playBtn.setAttribute('class', 'mip-video-playbtn');
        videoEl.appendChild(playBtn);
        videoEl.dataset.videoSrc = this.attributes.src;
        videoEl.dataset.videoPoster = util.parseCacheUrl(this.attributes.poster);
        videoEl.addEventListener('click', sendVideoMessage, false);

        // make sourceList, send to outer iframe
        var sourceList = [];
        Array.prototype.slice.apply(this.sourceDoms).forEach(function (node) {
          var obj = {};
          obj[node.type] = node.src;
          sourceList.push(obj);
        });

        if (!sourceList.length) {
          urlSrc = videoEl.dataset.videoSrc;
        } else {
          urlSrc = JSON.stringify([videoEl.dataset.videoSrc, sourceList]);
        }

        function sendVideoMessage() {
          /* istanbul ignore if */
          if (windowInIframe) {
            // mip_video_jump is written outside iframe
            // TODO 改成 OUTER_MESSAGE_VIDEO_JUMP
            viewer.sendMessage('mip-video-jump', {
              poster: videoEl.dataset.videoPoster,
              src: urlSrc
            });
          }
        }
        this.element.appendChild(videoEl);
        return videoEl;
      }
    }]);
    return MipVideo;
  }(CustomElement);

  /**
   * @file mip-carousel 轮播组件
   *
   * @author fengchuantao
   * @modify wangpei07 2016-11-30
   */

  var prerenderElement = resources$1.prerenderElement;

  var carouselParas = {
    boxClass: 'mip-carousel-container',
    wrapBoxClass: 'mip-carousel-wrapper',
    slideBox: 'mip-carousel-slideBox',
    activeitem: 'mip-carousel-activeitem',
    threshold: 0.2
    /**
     * 当前图片为 index，懒加载 index 前后各 NUM 个图
     * @type {Number}
     */
  };var NUM = 1;
  /**
   * 由于动态创建的 mip-carousel 下的 mip-img 无法正确地懒加载，所以调整方案为修改 src 使其加载
   * @param  {Array.<HTMLElement>} allMipImgs   carousel 下的 childNodes 组成的数组
   * @param  {number} index    起始点
   * @param  {number} num      当前图片前后 num 个图需要渲染
   * @param  {Array} arraySrc  childNodes 中的 src 组成的数组
   * @return {void}            无
   */
  function prerenderSetSrc(allMipImgs, index, num, arraySrc) {
    var start = Math.max(index - num, 0);
    var end = Math.min(index + num + 1, allMipImgs.length);
    for (var i = start; i < end; i++) {
      if (allMipImgs[i].tagName === 'MIP-IMG') {
        allMipImgs[i].setAttribute('src', arraySrc[i]);
        // 头尾增加的两个 dom 没有正确渲染，多了个img，TODO
        var imgs = [].concat(toConsumableArray(allMipImgs[i].querySelectorAll('img')));
        for (var j = 0; j < imgs.length; j++) {
          imgs[j].setAttribute('src', arraySrc[i]);
        }
      } else {
        var mipImg = allMipImgs[i].querySelector('mip-img');
        mipImg && mipImg.setAttribute('src', arraySrc[i]);
      }
    }
  }
  /**
   * 修改 src 为某张图的 src
   * @param  {NodeList} childList 一般是 mip-img 标签的集合
   * @param  {number} imgIndex    imgIndex是显示的第一张图片的在arraySrc中的index
   * @param   {Array} arraySrc    所有图片的src组成的数组
   * @return {NodeList}           返回 childList
   */
  function changeSrc(childList, imgIndex, arraySrc) {
    // 由于懒加载方案是修改 src，所以在第一次加载图片的时候需要修改所有图片的 src，如若不是图片('no-src')则重定向，防止404。
    var src = arraySrc[imgIndex] !== 'no-src' ? arraySrc[imgIndex] : '?mip_img_ori=1';
    for (var i = 0; i < childList.length; i++) {
      if (childList[i].tagName === 'MIP-IMG') {
        childList[i].setAttribute('src', src);
      } else {
        var mipImg = childList[i].querySelector('mip-img');
        mipImg && mipImg.setAttribute('src', src);
      }
    }
    return childList;
  }
  /**
   * 求 carousel 的高度，这是 autoheight 的需求，即宽度 100%，高度自适应时的高度。
   *
   * @param {number} containerWidth 主要是 carousel 的宽度
   * @param {HTMLImageElement} img img
   * @returns {number} 求得 carousel 的高度
   */
  function getCarouselHeight(containerWidth, img) {
    return containerWidth * img.naturalHeight / img.naturalWidth;
  }
  /**
   * 高度变化的动画
   *
   * @param {number} value 高度值
   * @param {number} time 耗时
   * @param {HTMLElement} dom
   */
  function translateHeight(value, time, dom$$1) {
    util.css(dom$$1, {
      height: value,
      transition: 'height ' + time + 's'
    });
  }
  /**
   * 改变 carousel 高度。
   *
   * @param {HTMLElement} carousel
   * @param {number} index
   * @param {number} time
   */
  function changeCarouselHeight(carousel, index, time) {
    var img = carousel.querySelectorAll('.mip-carousel-slideBox')[index].querySelector('img');
    var containerWidth = parseInt(window.getComputedStyle(carousel, null).getPropertyValue('width'), 10);
    translateHeight(getCarouselHeight(containerWidth, img), time, carousel);
  }
  /**
   * 针对 autoheight 需求，carousel 第一次改变高度，动画时间是 0 。
   * 由于 mip-img 的渲染问题，首尾的 slider 内部依然有 mip-placeholder ，这个需要删除。
   * TODO: 1. 找出 mip-placeholder 的原因
   *
   * @param {HTMLElement} carousel carousel
   * @param {number} index 第几个 slider ，即求第几张图片对应的 carousel 高度
   */
  function initHeight(carousel, index) {
    // carousel.style.position = 'relative'
    /* global Image */
    var newImage = new Image();
    newImage.src = carousel.querySelectorAll('.mip-carousel-slideBox')[index].querySelector('img').src;
    newImage.onload = function () {
      [].concat(toConsumableArray(carousel.querySelectorAll('.mip-placeholder'))).map(function (value) {
        return value.parentNode.removeChild(value);
      });
      changeCarouselHeight(carousel, index, 0);
    };
  }
  /**
   * 获取carousel下所有mip-img的src，目前只处理一层和两层的，3层也当两层处理
   * @param  {Array.<HTMLElement>} childNodes getChildNodes函数得出的数组
   * @return {Array.<string>}                 mip-img中的src组成的数组
   */
  function getAllMipImgSrc(childNodes) {
    var arr = [];
    for (var i = 0; i < childNodes.length; i++) {
      if (childNodes[i].tagName === 'MIP-IMG') {
        arr.push(childNodes[i].getAttribute('src'));
      } else {
        var node = childNodes[i].querySelector('mip-img');
        if (node) {
          arr.push(node.getAttribute('src'));
        } else {
          arr.push('no-src');
        }
      }
    }
    return arr;
  }
  // 按tagName创建一个固定class的tag
  function createTagWithClass(className, tagName) {
    tagName = tagName || 'div';
    var tag = document.createElement(tagName);
    tag.className = className || '';
    return tag;
  }
  // 获取carouse标签下所有非mip layout引入的元素
  function getChildNodes(element) {
    var allChildNodes = element.children;
    var arrNode = Array.prototype.slice.call(allChildNodes);
    var childList = [];

    arrNode.map(function (ele, i) {
      if (ele.tagName.toLowerCase() !== 'mip-i-space') {
        // 如果是 autoplay，则不允许有 popup 功能
        if (element.hasAttribute('autoplay')) {
          if (ele.hasAttribute('popup')) {
            ele.removeAttribute('popup');
          }
        }
        childList.push(ele);
        element.removeChild(ele);
      }
    });
    if (childList.length > 0) {
      // 拷贝第一个和最后一个节点拼接dom
      var firstCard = childList[0].cloneNode(true);
      var endCard = childList[childList.length - 1].cloneNode(true);
      childList.unshift(endCard);
      childList.push(firstCard);
    }
    return childList;
  }

  // 移动函数
  function translateFn(value, time, wrapBox) {
    wrapBox.style.webkitTransform = 'translate3d(' + value + 'px, 0px, 0px)';
    wrapBox.style.transitionDuration = time;
  }

  // 移出class
  function removeClass$1(dom$$1, className) {
    /* istanbul ignore if */
    if (!dom$$1) {
      return;
    }
    var curClassName = dom$$1.className;
    dom$$1.className = curClassName.replace(className, '').replace(/(^\s*)|(\s*$)/g, '');
  }

  // 追加class
  function addClass$1(dom$$1, className) {
    /* istanbul ignore if */
    if (!dom$$1) {
      return;
    }
    var curClassName = dom$$1.className;
    if (!curClassName) {
      dom$$1.className = className;
    } else {
      dom$$1.className = curClassName + ' ' + className;
    }
  }

  /**
   * 计算滚动之后需要到达的坐标 resetPosAndIdx
   *
   * @param {number} curIndex curIndex
   * @param {number} totalNum totalNum
   * @param {number} deviceWidth deviceWidth
   * @param {number} endPos endPos
   * @return {Object}
   */
  function resetPosAndIdx(curIndex, totalNum, deviceWidth, endPos) {
    var endInfo = {
      endPos: 0,
      endIndex: curIndex
    };
    if (curIndex === totalNum - 1) {
      endInfo.endPos = -deviceWidth;
      endInfo.endIndex = 1;
    } else if (curIndex === 0) {
      // if it is last one
      endInfo.endPos = -(totalNum - 2) * deviceWidth;
      endInfo.endIndex = totalNum - 2;
    } else {
      endInfo.endPos = endPos;
    }
    return endInfo;
  }

  // changeIndicatorStyle
  function changeIndicatorStyle(startDot, endDot, className) {
    removeClass$1(startDot, className);
    addClass$1(endDot, className);
  }

  var MIPCarousel = function (_CustomElement) {
    inherits(MIPCarousel, _CustomElement);

    function MIPCarousel() {
      classCallCheck(this, MIPCarousel);
      return possibleConstructorReturn(this, (MIPCarousel.__proto__ || Object.getPrototypeOf(MIPCarousel)).apply(this, arguments));
    }

    createClass(MIPCarousel, [{
      key: 'layoutCallback',

      /* eslint-disable fecs-max-statements */
      value: function layoutCallback() {
        var ele = this.element;
        var self = this;
        var eleWidth = ele.clientWidth;

        var dotItems = [];

        // 获取用户填写属性
        // 是否自动播放
        var isAutoPlay = ele.hasAttribute('autoplay');

        // 图片间隔时长默认为4000
        var isDefer = ele.getAttribute('defer');

        var isDeferNum = isDefer || 4000;

        // 分页显示器
        var showPageNum = ele.hasAttribute('indicator');

        // 翻页按钮
        var showBtn = ele.hasAttribute('buttonController');

        // 翻页按钮
        var indicatorId = ele.getAttribute('indicatorId');

        // 跳转索引
        var index = ele.getAttribute('index');

        var indexNum = parseInt(index) || 1;

        // Gesture锁
        var slideLock = {
          stop: 1

          // btn按钮手势锁
        };var btnLock = {
          stop: 1

          // 缓存上一次手势位置
        };var prvGestureClientx = 0;

        // 缓存当前值轮播位置
        var curGestureClientx = -eleWidth;

        // 当前图片显示索引
        // let imgIndex = 1
        var imgIndex = indexNum;

        // 定时器时间hold
        var moveInterval = void 0;

        // 禁止左右滑动配置
        var startPos = {};
        var endPos = {};
        var isScrolling = 0;

        // 获取carousel下的所有节点
        var childNodes = getChildNodes(ele);
        // 获取所有的 src
        var arraySrc = getAllMipImgSrc(childNodes);
        childNodes = changeSrc(childNodes, imgIndex, arraySrc);

        // 图片显示个数
        // 其实图片个数应该为实际个数+2.copy了头和尾的两部分
        var childNum = childNodes.length;

        // length 等于0时，不做任何处理
        if (childNum === 0) {
          return Promise.resolve();
        }
        // 将getChildNodes获取的元素拼装轮播dom
        var carouselBox = createTagWithClass(carouselParas.boxClass);

        var wrapBox = createTagWithClass(carouselParas.wrapBoxClass);

        childNodes.map(function (ele, i) {
          var slideBox = createTagWithClass(carouselParas.slideBox);
          slideBox.appendChild(ele);
          slideBox.style.width = 100 / childNum + '%';
          wrapBox.appendChild(slideBox);

          // 遍历mip-img计算布局
          self.applyFillContent(ele, true);
          prerenderElement(ele);
          // inview callback  bug, TODO
          // let MIP = window.MIP || {};
          // 没有对下面的代码进行处理
          var allImgs = ele.querySelectorAll('mip-img');
          var len = allImgs.length;
          for (var idx = 0; idx < len; idx++) {
            self.applyFillContent(allImgs[idx], true);
            prerenderElement(allImgs[idx]);
          }
        });

        wrapBox.style.width = childNum * 100 + '%';

        carouselBox.appendChild(wrapBox);
        ele.appendChild(carouselBox);

        // 初始渲染时应该改变位置到第一张图
        // let initPostion = -eleWidth
        // 初始渲染时如果有跳转索引就改变位置到指定图片
        var initPostion = index ? -eleWidth * indexNum : -eleWidth;
        curGestureClientx = initPostion;
        prerenderSetSrc(childNodes, indexNum, NUM, arraySrc);
        wrapBox.style.webkitTransform = 'translate3d(' + initPostion + 'px, 0, 0)';
        // 针对 autoHeight 需求
        var autoHeight = ele.hasAttribute('autoheight');
        if (autoHeight) {
          initHeight(ele, indexNum);
        }
        // 绑定wrapBox的手势事件
        // 手势移动的距离
        var diffNum = 0;

        // 绑定手势点击事件
        wrapBox.addEventListener('touchstart', function (event$$1) {
          // 以下兼容横屏时禁止左右滑动
          var touch = event$$1.targetTouches[0];
          startPos = {
            x: touch.pageX,
            y: touch.pageY,
            time: Date.now()
          };
          isScrolling = 0; // 这个参数判断是垂直滚动还是水平滚动

          // 获取手势点击位置
          prvGestureClientx = touch.pageX;
          clearInterval(moveInterval);
        }, false);

        wrapBox.addEventListener('touchmove', function (event$$1) {
          // 阻止触摸事件的默认行为，即阻止滚屏
          var touch = event$$1.targetTouches[0];
          endPos = {
            x: touch.pageX - startPos.x,
            y: touch.pageY - startPos.y
          };
          isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; // isScrolling为1时，表示纵向滑动，0为横向滑动
          if (isScrolling === 0) {
            event$$1.preventDefault();
          }

          // 获取手指移动的距离
          diffNum = event$$1.targetTouches[0].pageX - prvGestureClientx;

          // 外框同步运动
          translateFn(diffNum + curGestureClientx, '0ms', wrapBox);

          // 滚动手势锁 正在滑动
          slideLock.stop = 0;
        }, false);

        wrapBox.addEventListener('touchend', function (event$$1) {
          //  只有滑动之后才会触发
          if (!slideLock.stop) {
            var startIdx = imgIndex;
            var endIdx = startIdx;
            // 如果大于设定阈值
            if (Math.abs(diffNum) > eleWidth * carouselParas.threshold) {
              endIdx = diffNum > 0 ? imgIndex - 1 : imgIndex + 1;
            }
            move(wrapBox, startIdx, endIdx);
            slideLock.stop = 1;
          }

          // 如果存在自动则调用自动轮播
          if (isAutoPlay) {
            clearInterval(moveInterval);
            autoPlay();
          }
        }, false);

        // 自动轮播
        if (isAutoPlay) {
          autoPlay();
        }

        // 指示器
        if (showPageNum) {
          indicator();
        }

        // 控制按钮
        if (showBtn) {
          cratebutton();
        }

        // 是否关联indicator
        if (indicatorId) {
          indicatorDot(indicatorId);
        }

        // 自动轮播
        function autoPlay() {
          moveInterval = setInterval(function () {
            move(wrapBox, imgIndex, imgIndex + 1);
          }, isDeferNum);
        }

        // 创建指示器
        function indicator() {
          var indicatorBox = createTagWithClass('mip-carousel-indicatorbox');
          var indicatorBoxWrap = createTagWithClass('mip-carousel-indicatorBoxwrap', 'p');
          var indicatorNow = createTagWithClass('mip-carousel-indicatornow', 'span');
          var indicatorAllNum = createTagWithClass('', 'span');
          indicatorAllNum.innerHTML = '/' + (childNum - 2);
          indicatorNow.innerHTML = imgIndex;
          indicatorBoxWrap.appendChild(indicatorNow);
          indicatorBoxWrap.appendChild(indicatorAllNum);
          indicatorBox.appendChild(indicatorBoxWrap);
          ele.appendChild(indicatorBox);
        }

        // 指示器数字变化
        function indicatorChange(idx) {
          if (!showPageNum) {
            return;
          }
          var indicatorNow = ele.querySelector('.mip-carousel-indicatornow');
          indicatorNow.innerHTML = idx;
        }

        // 创建左右轮播切换btn
        function cratebutton() {
          var preBtn = document.createElement('p');
          preBtn.className = 'mip-carousel-preBtn';
          var nextBtn = document.createElement('p');
          nextBtn.className = 'mip-carousel-nextBtn';

          ele.appendChild(preBtn);
          ele.appendChild(nextBtn);
          bindBtn();
        }

        // 绑定按钮切换事件
        function bindBtn() {
          ele.querySelector('.mip-carousel-preBtn').addEventListener('click', function (event$$1) {
            /* istanbul ignore if */
            if (!btnLock.stop) {
              return;
            }

            btnLock.stop = 0;

            imgIndex = imgIndex - 1;

            clearInterval(moveInterval);
            move(wrapBox, imgIndex + 1, imgIndex);
            if (isAutoPlay) {
              autoPlay();
            }
          }, false);

          ele.querySelector('.mip-carousel-nextBtn').addEventListener('click', function (event$$1) {
            /* istanbul ignore if */
            if (!btnLock.stop) {
              return;
            }

            btnLock.stop = 0;

            imgIndex = imgIndex + 1;
            clearInterval(moveInterval);
            move(wrapBox, imgIndex - 1, imgIndex);
            if (isAutoPlay) {
              autoPlay();
            }
          }, false);
        }

        // 图片滑动处理与手势滑动函数endPosition为最终距离,Duration变换时间
        function move(wrapBox, startIdx, endIdx, Duration) {
          /* istanbul ignore if */
          if (!wrapBox) {
            return;
          }
          // 双保险，确认位移的是 ele 的 width
          if (eleWidth !== ele.clientWidth) {
            eleWidth = ele.clientWidth;
          }
          imgIndex = endIdx;
          var endPosition = -eleWidth * endIdx;
          if (Duration) {
            translateFn(endPosition, '0ms', wrapBox);
            wrapBox.style.transitionDuration = '0ms';
          } else {
            translateFn(endPosition, '300ms', wrapBox);
            wrapBox.style.transitionDuration = '300ms';
          }
          // resetPosAndIdx
          var posIdxObj = resetPosAndIdx(imgIndex, childNum, eleWidth, endPosition);
          curGestureClientx = posIdxObj.endPos;
          endIdx = posIdxObj.endIndex;
          imgIndex = endIdx;

          // 如果有指示器，需更新选中位置的样式
          if (dotItems.length > 0) {
            changeIndicatorStyle(dotItems[startIdx - 1], dotItems[endIdx - 1], carouselParas.activeitem);
          }
          // 如果切换了坐标，需要在动画结束后重置translatex位置
          if (curGestureClientx !== endPosition) {
            setTimeout(function () {
              translateFn(curGestureClientx, '0ms', wrapBox);
              btnLock.stop = 1;
            }, 400);
          }
          btnLock.stop = 1;
          indicatorChange(imgIndex);
          viewer.eventAction.execute('switchCompleted', ele, {
            currIndex: imgIndex,
            currCarouselItem: childNodes[imgIndex],
            carouselChildrenLength: childNum
          });
          // 加载需要的图片
          prerenderSetSrc(childNodes, imgIndex, NUM, arraySrc);
          // autoHeight
          if (autoHeight) {
            var time = 0.3;
            if (Duration) time = 0;
            changeCarouselHeight(wrapBox.parentNode.parentNode, imgIndex, time);
          }
        }

        // 处理圆点型指示器
        function indicatorDot(domId) {
          var indicDom = document.getElementById(domId);
          if (!indicDom) {
            return;
          }
          dotItems = indicDom.children;
          var dotLen = dotItems.length;

          if (index) {
            // 清除DOM中预先设置的mip-carousel-activeitem类
            dotItems = Array.prototype.slice.call(dotItems);
            dotItems.forEach(function (dotItem) {
              removeClass$1(dotItem, carouselParas.activeitem);
            });
            addClass$1(dotItems[imgIndex - 1], carouselParas.activeitem);
          }

          if (dotLen === childNum - 2) {
            for (var i = 0; i < dotLen; i++) {
              dotItems[i].count = i;
              dotItems[i].addEventListener('click', function (event$$1) {
                var count = this.count;
                clearInterval(moveInterval);
                move(wrapBox, imgIndex, count + 1);
                if (isAutoPlay) {
                  autoPlay();
                }
              });
            }
          } else {
            // 若个数不匹配，则隐藏掉indicator
            addClass$1(indicDom, 'mip-hide');
            dotItems = [];
          }
        }
        // 横竖屏兼容处理
        window.addEventListener('resize', function () {
          eleWidth = ele.clientWidth;
          move(wrapBox, imgIndex, imgIndex, '0ms');
        }, false);

        // 跳转索引
        this.addEventAction('go', function (event$$1, num) {
          clearInterval(moveInterval);
          move(wrapBox, imgIndex, parseInt(num));
          if (isAutoPlay) {
            autoPlay();
          }
        });
        return Promise.resolve();
      }
    }]);
    return MIPCarousel;
  }(CustomElement);

  /**
   * @file mip-iframe
   * @author zhangzhiqiang(zhiqiangzhang37@163.com)
   */

  var css$3 = util.css,
      event$2 = util.event;


  var attrList = ['allowfullscreen', 'allowtransparency', 'sandbox'];

  var MipIframe = function (_CustomElement) {
    inherits(MipIframe, _CustomElement);

    function MipIframe() {
      var _ref;

      classCallCheck(this, MipIframe);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref = MipIframe.__proto__ || Object.getPrototypeOf(MipIframe)).call.apply(_ref, [this].concat(args)));

      _this.iframe = undefined;
      return _this;
    }

    createClass(MipIframe, [{
      key: 'isLoadingEnabled',
      value: function isLoadingEnabled() {
        return true;
      }
    }, {
      key: 'layoutCallback',
      value: function layoutCallback() {
        var _this2 = this;

        this.handlePageResize = this.handlePageResize.bind(this);
        this.notifyRootPage = this.notifyRootPage.bind(this);

        var element = this.element;
        var src = element.getAttribute('src');
        var srcdoc = element.getAttribute('srcdoc');

        if (srcdoc) {
          src = 'data:text/html;charset=utf-8;base64,' + window.btoa(srcdoc);
        }

        var height = element.getAttribute('height');
        var width = element.getAttribute('width') || '100%';

        if (!src || !height) {
          return Promise.resolve();
        }

        this.iframe = document.createElement('iframe');
        this.iframe.frameBorder = '0';
        this.iframe.scrolling = 'no';

        this.applyFillContent(this.iframe);
        this.element.appendChild(this.iframe);

        // window.addEventListener('message', )
        window.addEventListener('message', this.notifyRootPage.bind(this));

        css$3(this.iframe, {
          width: width,
          height: height
        });

        this.iframe.src = src;

        this.expendAttr(attrList, this.iframe);
        element.appendChild(this.iframe);

        /**
         * 修复一个 iOS UC 下的 bug
         * 设置 100% 还不够，必须是精确值，否则弹起再收起软键盘后，iframe 高度不会恢复
         */
        if (height === '100%') {
          this.fullscreen = true;
          // 定时器是此时 iframe 可能处于隐藏状态，viewport.getHeight() 获取不到高度
          var timer = setInterval(function () {
            var viewportHeight = viewport.getHeight();
            /* istanbul ignore if */
            if (viewportHeight === 0) {
              return;
            }
            _this2.setIframeHeight(viewportHeight);
            clearInterval(timer);
          }, 500);
        }

        return event$2.loadPromise(this.iframe);
      }
    }, {
      key: 'firstInviewCallback',
      value: function firstInviewCallback() {
        window.addEventListener(CUSTOM_EVENT_RESIZE_PAGE, this.handlePageResize.bind(this));
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        window.removeEventListener(CUSTOM_EVENT_RESIZE_PAGE, this.handlePageResize.bind(this));
        window.removeEventListener('message', this.notifyRootPage.bind(this));
      }
    }, {
      key: 'notifyRootPage',
      value: function notifyRootPage(_ref2) {
        var data = _ref2.data;

        if (data.type === MESSAGE_MIPIFRAME_RESIZE) {
          window.MIP.viewer.page.notifyRootPage({
            type: MESSAGE_PAGE_RESIZE
          });
        }
      }
    }, {
      key: 'handlePageResize',
      value: function handlePageResize(e) {
        if (e.detail && e.detail.length) {
          this.setIframeHeight(e.detail[0].height || viewport.getHeight());
        }
      }
    }, {
      key: 'setIframeHeight',
      value: function setIframeHeight(height) {
        /* istanbul ignore if */
        if (!this.fullscreen) {
          return;
        }

        if (height !== this.height) {
          css$3(this.iframe, {
            height: height
          });
          this.height = height;
        }
      }
    }]);
    return MipIframe;
  }(CustomElement);

  /**
   * @file mip-pix 统计组件
   * @author baidu-authors, liangjiaying<jiaojiaomao220@163.com>
   */

  var DEFAULT_PARAMS = {
    TIME: 't',
    TITLE: 'title',
    HOST: 'host'

    /**
     * 替换请求链接中的参数
     *
     * @param {string} src      用户填写在mip-pix中的src
     * @param {string} paraName key, 如"title"
     * @param {string} paraVal  value, 如当前时间戳
     * @return {string} url
     */
  };function addParas(src, paraName, paraVal) {
    var paraNameQ = new RegExp('\\$?{' + paraName + '}', 'g');
    if (src.search(paraNameQ) > -1) {
      return src.replace(paraNameQ, paraVal);
    }
    src += src.indexOf('?') > -1 ? '&' : '?';
    paraName = DEFAULT_PARAMS[paraName] || /* istanbul ignore next */paraName;
    return src + paraName + '=' + paraVal;
  }

  /**
   * 从body获取mip-expeirment实验分组
   *
   * @param  {string} attr 实验名
   * @return {string}      实验分组
   */
  function getBodyAttr(attr) {
    var body = document.getElementsByTagName('body')[0];
    return body.getAttribute(attr) || 'default';
  }

  var MipPix = function (_CustomElement) {
    inherits(MipPix, _CustomElement);

    function MipPix() {
      classCallCheck(this, MipPix);
      return possibleConstructorReturn(this, (MipPix.__proto__ || Object.getPrototypeOf(MipPix)).apply(this, arguments));
    }

    createClass(MipPix, [{
      key: 'layoutCallback',
      value: function layoutCallback() {
        // 获取统计所需参数
        var ele = this.element;
        var src = ele.getAttribute('src');
        var host = window.location.href;
        var title = (document.querySelector('title') || /* istanbul ignore next */{}).innerHTML || '';
        var time = Date.now();

        // 替换通用参数
        src = addParas(src, 'TIME', time);
        src = addParas(src, 'TITLE', encodeURIComponent(title));
        src = addParas(src, 'HOST', encodeURIComponent(host));

        // 增加对<mip-experiment>支持，获取实验分组
        var expReg = /MIP-X-((\w|-|\d|_)+)/g;
        var matchExpArr = src.match(expReg);
        for (var i in matchExpArr) {
          var matchExp = matchExpArr[i];
          src = addParas(src, matchExp, getBodyAttr(matchExp));
        }

        // 去除匹配失败的其餘{參數}
        src = src.replace(/\$?{.+?}/g, '');
        // 去除其餘 '${', '{', '}' 確保輸出不包含 MIP 定义的语法
        src = src.replace(/\$?{|}/g, '');

        // 创建请求img
        var image = new Image();
        image.src = src;
        image.setAttribute('width', 0);
        image.setAttribute('height', 0);
        ele.setAttribute('width', '');
        ele.setAttribute('height', '');
        ele.appendChild(image);
        util.css(ele, { display: 'none' });
        return Promise.resolve();
      }
    }]);
    return MipPix;
  }(CustomElement);

  /**
   * @file deps.js denpendency store
   * @author qiusiqi (qiusiqi@baidu.com)
   */

  // Record watcher id, avoid add repeatly
  var uid$3 = 0;

  var Deps = function () {
    function Deps() {
      classCallCheck(this, Deps);

      this.isDep = true;
      this.subs = [];
      this.id = uid$3++;
    }

    createClass(Deps, [{
      key: 'addWatcher',
      value: function addWatcher() {
        Deps.target.addWatcher(this);
      }

      /*
       * to notify and call callbacks of related watchers
       * @param {string} key key to trigger notify
       */

    }, {
      key: 'notify',
      value: function notify(key) {
        this.subs.forEach(function (sub) {
          if (sub.specWatcher === 'Watch' && sub.exp.match(new RegExp('.?' + key + '\\[?\\d*\\]?$'))) {
            sub.update();
          } else if (sub.specWatcher !== 'Watch') {
            sub.update();
          }
        });
      }
    }]);
    return Deps;
  }();

  /**
   * @file util.js
   * @author sfe
   */

  var regVar = /[\w\d-._]+/g;
  var regTpl = /(\${)([^}]+)(})/g;
  var vendorNames$1 = ['Webkit', 'Moz', 'ms'];
  var RESERVED = ['Math', 'Number', 'String', 'Object', 'window'];
  var emptyStyle$1 = void 0;

  function isObject$1(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  }

  function isArray$1(obj) {
    return obj && obj.constructor === Array;
  }

  function objNotEmpty(obj) {
    return isObject$1(obj) && Object.keys(obj).length !== 0;
  }

  function arrayToObject(arr) {
    var obj = {};
    arr.forEach(function (item) {
      if (isObject$1(item)) {
        Object.assign(obj, item);
      } else if (isArray$1(item)) {
        Object.assign(obj, arrayToObject(item));
      } else if (typeof item === 'string') {
        Object.assign(obj, classSplit(item));
      }
    });
    return obj;
  }

  /*
   * parse class binding
   * @param {Object|Array} classSpecs new classObject
   * @param {Object|Array} oldSpecs old classObject
   */
  function parseClass(classSpecs) {
    var oldSpecs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // reset old classes
    Object.keys(oldSpecs).forEach(function (k) {
      oldSpecs[k] = false;
    });
    if (typeof classSpecs === 'string') {
      // deal with multiple class-defined case
      classSpecs = classSplit(classSpecs);
      // set new classes
      return Object.assign({}, oldSpecs, classSpecs);
    }
    // parse Object only
    if (isArray$1(classSpecs)) {
      classSpecs = arrayToObject(classSpecs);
    }

    var newClasses = {};
    if (isObject$1(classSpecs)) {
      Object.keys(classSpecs).forEach(function (k) {
        typeof classSpecs[k] !== 'undefined' && k && (newClasses[k] = classSpecs[k]);
      });
    }
    return Object.assign({}, oldSpecs, newClasses);
  }

  function classSplit(classSpecs) {
    return classSpecs.trim().split(/\s+/).reduce(function (res, target) {
      return Object.assign(res, defineProperty({}, target, true));
    }, {});
  }

  /*
   * parse style binding
   * @param {Object|Array} styleSpecs new styleObject
   */
  function parseStyle(styleSpecs) {
    var styles = {};

    // parse Object only
    if (isArray$1(styleSpecs)) {
      styleSpecs.forEach(function (styleObj) {
        Object.assign(styles, parseStyle(styleObj));
      });
      return styles;
    }
    if (!isObject$1(styleSpecs)) {
      return '';
    }

    Object.keys(styleSpecs).forEach(function (k) {
      var normalizedName = normalize$1(k);
      if (!normalizedName) {
        return;
      }

      var newKey = normalizedName.replace(/[A-Z]/g, function (match) {
        return '-' + match.toLowerCase();
      });
      var val = styleSpecs[k];
      if (isArray$1(val)) {
        var div = document.createElement('div');
        for (var i = 0, len = val.length; i < len; i++) {
          div.style[newKey] = val[i];
        }
        styles[newKey] = div.style[newKey];
      } else {
        styles[newKey] = val;
      }
    });
    return styles;
  }

  /*
   * autoprefixer
   * @param {string} prop css prop needed to be prefixed
   */
  function normalize$1(prop) {
    emptyStyle$1 = emptyStyle$1 || document.createElement('div').style;
    prop = prop.replace(/-(\w)/g, function (_, c) {
      return c ? c.toUpperCase() : /* istanbul ignore next */'';
    });

    if (prop !== 'filter' && prop in emptyStyle$1) {
      return prop;
    }

    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames$1.length; i++) {
      var name = vendorNames$1[i] + capName;
      if (name in emptyStyle$1) {
        return name;
      }
    }
    return '';
  }

  function styleToObject(style) {
    if (!style) {
      return {};
    }

    // etc: font-size:12px; => {fontSize: '12px'}
    var styles = style.split(';');
    var styleObj = {};
    for (var i = 0, len = styles.length; i < len; i++) {
      var item = styles[i];
      if (!item) {
        continue;
      }
      var parts = item.split(':');
      styleObj[parts[0]] = parts[1];
    }
    return styleObj;
  }

  function objectToStyle(obj) {
    var styles = '';
    // etc: {fontSize: '12px'} => font-size:12px;
    Object.keys(obj).forEach(function (k) {
      styles += k + ':' + obj[k] + ';';
    });
    return styles;
  }

  function getter(ctx, exp) {
    var fn = getWithResult.bind(ctx, exp);
    var get$$1 = fn.call(ctx.data);
    return get$$1.call(ctx.data, ctx.data);
  }

  function getWithResult(exp) {
    exp = namespaced(exp) || '';
    var matches = exp.match(/(this\.[\w\d-._]+|this\['[\w\d-._]+'\])/gmi);
    var read = '';
    if (matches && matches.length) {
      matches.forEach(function (e) {
        read += ';typeof ' + e + ' === \'undefined\' && (hadReadAll = false)';
      });
    }
    var func = void 0;
    try {
      /* eslint-disable */
      func = new Function('\n      with (this) {\n        try {\n          var hadReadAll = true\n          ' + read + '\n          return {\n            value: ' + exp + ',\n            hadReadAll: hadReadAll\n          }\n        } catch (e) {\n          return {}\n        }\n      }\n    ');
      /* eslint-enable */
    } catch (e) {
      /* istanbul ignore next */
      func = function func() {
        return {};
      };
    }
    return func;
  }

  function setter$1(ctx, exp, value) {
    var fn = setWithResult.bind(ctx, exp, value);
    var set$$1 = fn.call(ctx.data);
    set$$1.call(ctx.data);
  }

  function setWithResult(exp, value) {
    exp = namespaced(exp);
    var func = void 0;
    try {
      func = new Function('with(this){try {' + exp + ' = "' + value + '"} catch (e) {}}'); // eslint-disable-line
    } catch (e) {
      /* istanbul ignore next */
      func = function func() {
        return '';
      };
    }
    return func;
  }

  function namespaced(str) {
    if (!str) {
      return;
    }
    var newExp = '';
    var match = null;
    var pointer = 0;
    var tpls = [];

    // deal with template-like str first and save results
    str = str.replace(/(`[^`]+`|'[^']+')/g, function (match) {
      // template need to recursively parse
      if (match[0] === '`') {
        match = match.replace(regTpl, function (tplMatch) {
          return namespaced(tplMatch);
        });
      }
      tpls.push(match);
      return 'MIP-STR-TPL' + (tpls.length - 1);
    });

    while ((match = regVar.exec(str)) != null) {
      var index = match['index'];
      var matched = match[0];

      newExp += str.substring(pointer, index);

      pointer = index + matched.length;

      // get template-like str result directly
      if (matched.indexOf('MIP-STR-TPL') !== -1) {
        newExp += tpls[+match[0].substr(11)];
        continue;
      }
      // skip special cases
      if (!isNaN(match[0]) || /^\./.test(match[0]) || !match[0].replace(/[-._]/g, '').length || RESERVED.indexOf(match[0].split('.')[0]) !== -1) {
        newExp += match[0];
        continue;
      }

      // to get the next not blankspace char of matched, to tell its nature
      var i = findChar(str, pointer, true);
      // not key of an obj or string warpped by quotes - vars
      /* istanbul ignore else */
      if (i >= str.length || !/['`:]/.test(str[i])) {
        newExp += wrap$1(match[0]);
      } else if (str[i] === ':') {
        i = findChar(str, index - 1, false);
        // tell if conditional operator ?:
        if (i < 0 || str[i] !== '?') {
          newExp += match[0];
        } else {
          newExp += wrap$1(match[0]);
        }
      } else {
        newExp += match[0];
      }
    }
    newExp += str.substr(pointer);

    return newExp;
  }

  function wrap$1(exp) {
    if (/-/.test(exp)) {
      return 'this[\'' + exp + '\']';
    }
    return 'this.' + exp;
  }

  function findChar(str, i, forward) {
    while (str[i] && str[i] === ' ') {
      forward ? i++ : i--;
    }
    return i;
  }

  var util$1 = /*#__PURE__*/Object.freeze({
    isObject: isObject$1,
    isArray: isArray$1,
    objNotEmpty: objNotEmpty,
    arrayToObject: arrayToObject,
    parseClass: parseClass,
    parseStyle: parseStyle,
    normalize: normalize$1,
    styleToObject: styleToObject,
    objectToStyle: objectToStyle,
    getter: getter,
    getWithResult: getWithResult,
    setter: setter$1,
    setWithResult: setWithResult,
    namespaced: namespaced
  });

  /**
   * @file watcher.js
   * @author qiusiqi (qiusiqi@baidu.com)
   */

  var queue$2 = [];
  var has$1 = {};
  var flushing$1 = false;
  var index$2 = 0;
  var lock = false;

  // Record watcher id, avoid add repeatly
  var uid$4 = 0;

  var Watcher$1 = function () {
    /*
     * @constructor
     * params {NODE} node DOM NODE
     * params {Object} data pageData
     * params {string} dir directive
     * params {string} exp expression
     * params {Function} cb watcher callback
     */
    function Watcher(node, data, dir, exp, cb) {
      classCallCheck(this, Watcher);

      this.data = data;
      this.dir = dir;
      this.exp = exp;
      this.id = uid$4++;
      var specPrefix = void 0;
      if ((specPrefix = exp.slice(0, 6)) === 'Class:' || specPrefix === 'Style:' || specPrefix === 'Watch:') {
        this.specWatcher = specPrefix.slice(0, 5);
        this.exp = exp = exp.slice(6);
      }
      this.node = node;
      this.depIds = {};
      var fn = getWithResult.bind(this, this.exp);
      this.getter = fn.call(this.data);
      this.cb = cb;
      this.value = this.get();
    }

    /*
     * scheduler to update
     */


    createClass(Watcher, [{
      key: 'update',
      value: function update() {
        if (lock) {
          var id = this.id;
          if (has$1[id] != null) {
            return;
          }
          has$1[id] = true;

          if (flushing$1) {
            queue$2.push(this);
          } else {
            var i = queue$2.length - 1;
            /* istanbul ignore next */
            while (i > index$2 && queue$2[i].id > id) {
              i--;
            }
            queue$2.splice(i + 1, 0, this);
          }
        } else {
          this.run();
        }
      }

      /*
       * controller to update dom or call callbacks of watchers
       */

    }, {
      key: 'run',
      value: function run() {
        var oldVal = this.value;
        var newVal = this.get(oldVal);
        if (newVal !== oldVal) {
          this.value = newVal;
          if (this.dir) {
            this.cb.call(this.data, this.dir, newVal);
          } else {
            this.cb.call(this.data, newVal);
          }
        }
      }

      /*
       * get new val for comparing
       * @param {*} oldVal oldValue used to build new value
       */

    }, {
      key: 'get',
      value: function get$$1(oldVal) {
        var value = void 0;
        Deps.target = this;
        // get new value
        value = this.getter.call(this.data, this.data).value;
        // parse class/style with spectial parser
        if (this.specWatcher && this.specWatcher !== 'Watch') {
          value = util$1['parse' + this.specWatcher](value, oldVal);
        }
        Deps.target = null;
        return value;
      }

      /*
       * save dependencies
       */

    }, {
      key: 'addWatcher',
      value: function addWatcher(dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
          dep.subs.push(this);
          this.depIds[dep.id] = dep;
        }
      }
    }]);
    return Watcher;
  }();

  /**
   * Reset the scheduler's state.
   */
  function resetState() {
    index$2 = queue$2.length = 0;
    has$1 = {};
    flushing$1 = false;
  }

  /**
   * Flush queues and run the watchers.
   */
  function flushWatcherQueue() {
    flushing$1 = true;
    var watcher = void 0;
    var id = void 0;

    queue$2.sort(function (a, b) {
      return a.id - b.id;
    });

    for (index$2 = 0; index$2 < queue$2.length; index$2++) {
      watcher = queue$2[index$2];
      id = watcher.id;
      has$1[id] = null;
      watcher.run();
    }

    resetState();
  }

  function locker(status) {
    // avoid flushing again, watcher had queued
    if (queue$2.length && !status && flushing$1) {
      return;
    }
    // set lock status
    lock = status;
    // when unlock, do flushing
    if (!status) {
      flushWatcherQueue();
    }
  }

  /**
   * @file compile.js
   * @author qiusiqi (qiusiqi@baidu.com)
   */

  var VALUE = /^value$/;
  var TAGNAMES = /^(input|textarea|select)$/i;
  var ATTRS = /^(checked|selected|autofocus|controls|disabled|hidden|multiple|readonly)$/i;

  var Compile = function () {
    function Compile() {
      classCallCheck(this, Compile);

      this.el = document.documentElement;
    }

    createClass(Compile, [{
      key: 'start',
      value: function start(data) {
        if (!data || !objNotEmpty(data)) {
          return;
        }
        this.data = data;
        this.compileElement(this.el);
        // this.fragment = this.cloneNode();
        // this.compileElement(this.fragment);
        // this.el.appendChild(this.fragment);
      }

      /* istanbul ignore next */

    }, {
      key: 'cloneNode',
      value: function cloneNode() {
        var child = void 0;
        var fragment = document.createDocumentFragment();
        /* eslint-disable */
        while (child = this.el.firstChild) {
          /* eslint-enable */
          fragment.appendChild(child);
        }
        return fragment;
      }
    }, {
      key: 'compileElement',
      value: function compileElement(el) {
        var _this = this;

        var nodes = el.childNodes;
        [].slice.call(nodes).forEach(function (node) {
          if (!_this.isElementNode(node)) {
            return;
          }
          _this.compileAttributes(node);
          if (node.childNodes && node.childNodes.length) {
            _this.compileElement(node);
          }
        });
      }
    }, {
      key: 'isDirective',
      value: function isDirective(attr) {
        return attr.indexOf('m-') === 0;
      }
    }, {
      key: 'isElementNode',
      value: function isElementNode(node) {
        return node.nodeType === 1;
      }
    }, {
      key: 'compileAttributes',
      value: function compileAttributes(node) {
        var _this2 = this;

        /* istanbul ignore if */
        if (!node) {
          return;
        }
        var attrs = node.attributes;
        [].slice.call(attrs).forEach(function (attr) {
          if (!_this2.isDirective(attr.name)) {
            return;
          }
          _this2.compileDirective(node, attr, attr.value);
        });
      }

      /*
       * compile directive that meet spec: m-text/m-bind
       * @param {DOM.ELEMENT} node node
       * @param {string} directive m-xx directive
       * @param {string} exp expression to calculate value that needs to be bound
       */

    }, {
      key: 'compileDirective',
      value: function compileDirective(node, directive, expression) {
        var me = this;
        var fnName = directive.name.slice(2);
        var attrName = directive.name;
        var data = void 0;
        var shouldRm = void 0;

        // if is m-bind directive, check if binding class/style
        // compile these two spectially
        if (/^bind:.*/.test(fnName)) {
          var attr = fnName.slice(5);
          if (attr === 'class' || attr === 'style') {
            var attrKey = attr.charAt(0).toUpperCase() + attr.slice(1);
            try {
              var res = getter(this, expression);
              data = util$1['parse' + attrKey](res.value);
              shouldRm = res.hadReadAll;
            } catch (e) {
              // istanbul ignore next
              data = {};
            }
            expression = attrKey + ':' + expression;
          }
          fnName = 'bind';
        }
        !data && (data = me.getMVal(node, attrName, expression));
        if (typeof data !== 'undefined') {
          me[fnName] && me[fnName](node, attrName, data, shouldRm);
        }

        this.listenerFormElement(node, directive, expression);
        /* eslint-disable */
        new Watcher$1(node, me.data, attrName, expression, function (dir, newVal) {
          me[fnName] && me[fnName](node, dir, newVal);
        });
        /* eslint-enable */
      }

      /*
       * add eventlistener of form element
       * @param {DOM.ELEMENT} node node
       * @param {string} directive m-xx directive
       * @param {string} exp expression to calculate value that needs to be bound
       */

    }, {
      key: 'listenerFormElement',
      value: function listenerFormElement(node, directive, expression) {
        if (TAGNAMES.test(node.tagName)) {
          var attr = directive.name.split(':');
          attr = attr.length > 1 ? attr[1] : '';
          if (attr.trim() !== 'value') {
            return;
          }
          var handle = function handle(e) {
            setter$1(this, expression, e.target.value);
          };
          node.addEventListener('input', handle.bind(this));
        }
      }

      /*
       * directive m-text
       * params {NODE} node DOM NODE
       * params {string} newVal value to set as node.textContent
       */

    }, {
      key: 'text',
      value: function text(node, directive, newVal) {
        node.textContent = newVal;
      }

      /*
       * directive m-bind
       * params {NODE} node DOM NODE
       * params {string} directive directive
       * params {string} newVal value to bind
       * params {boolean} shouldRm tell if should remove directive
       */

    }, {
      key: 'bind',
      value: function bind(node, directive, newVal, shouldRm) {
        var reg = /bind:(.*)/;
        var result = reg.exec(directive);
        if (!result) {
          return;
        }
        var attr = result[1];
        /* istanbul ignore if */
        if (attr !== 'disabled' && node.disabled) {
          Object.assign(window.m, this.origin);
          return;
        }
        if (attr === 'class') {
          if (objNotEmpty(newVal)) {
            Object.keys(newVal).forEach(function (k) {
              return node.classList.toggle(k, newVal[k]);
            });
            shouldRm && node.removeAttribute(directive);
          }
        } else if (attr === 'style') {
          if (objNotEmpty(newVal)) {
            var staticStyle = styleToObject(node.getAttribute(attr) || '');
            Object.keys(newVal).forEach(function (styleAttr) {
              staticStyle[styleAttr] = newVal[styleAttr];
            });
            node.setAttribute(attr, objectToStyle(staticStyle));
            shouldRm && node.removeAttribute(directive);
          }
        } else {
          if ((typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object') {
            newVal = JSON.stringify(newVal);
          }
          newVal !== '' ? node.setAttribute(attr, newVal) : node.removeAttribute(attr);
          if (TAGNAMES.test(node.tagName)) {
            if (ATTRS.test(attr)) {
              node[attr] = !!newVal;
            } else if (VALUE.test(attr)) {
              node[attr] = newVal;
            }
          }
        }
      }
    }, {
      key: 'updateData',
      value: function updateData(data) {
        this.origin = data;
      }

      /*
       * to get value
       * @param {DOM.ELEMENT} node node
       * @param {string} attrName attribute
       * @param {string} exp expression to calculate value that needs to be bound
       */

    }, {
      key: 'getMVal',
      value: function getMVal(node, attrName, exp) {
        if (!exp) {
          return;
        }
        var value = void 0;
        try {
          var res = getter(this, exp);
          value = res.value;
          if (res.hadReadAll) {
            node.removeAttribute(attrName);
          }
        } catch (e) {
          // console.error(e)
        }
        return value;
      }
    }]);
    return Compile;
  }();

  /**
   * @file observer.js
   * @author qiusiqi (qiusiqi@baidu.com)
   */

  var Observer$2 = function () {
    function Observer() {
      classCallCheck(this, Observer);
    }

    createClass(Observer, [{
      key: 'start',

      /*
       * start to defineProperty
       * @param {Object} data target to be defined
       */
      value: function start(data) {
        // supporting dependencies map
        this.depMap = this.depMap || {};
        for (var key in data) {
          this.depMap[key] = JSON.parse(JSON.stringify(data[key]));
        }
        this.walk(data, this.depMap);
      }

      /*
       * to traverse
       * @param {Object} data target to be defined
       * @param {Object} depMap supporting dependencies map
       */

    }, {
      key: 'walk',
      value: function walk(data, depMap) {
        var _this = this;

        if (!isObject$1(data) || !isObject$1(depMap)) {
          return;
        }

        Object.keys(data).forEach(function (key) {
          return _this.define(data, key, data[key], depMap);
        });
      }

      /*
       * to define
       * @param {Object} data target to be defined
       * @param {string} key key
       * @param {*} value value
       * @param {Object} depMap supporting dependencies map
       */

    }, {
      key: 'define',
      value: function define(data, key, value, depMap) {
        if (typeof depMap[key] === 'undefined') {
          return;
        }

        var me = this;
        var deep = value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
        // if value is object, define it's value
        if (deep) {
          this.walk(value, depMap[key]);
        }

        var property = Object.getOwnPropertyDescriptor(data, key);
        /* istanbul ignore if */
        if (property && property.configurable === false) {
          return;
        }
        var getter$$1 = property && property.get;
        var setter = property && property.set;

        // save or reset deps
        var deps = void 0;
        if (!deep && depMap[key] && depMap[key].isDep) {
          deps = depMap[key];
        } else if (deep && depMap[key] && depMap[key]._deps) {
          deps = depMap[key]._deps;
        } else {
          deps = new Deps();
          if (!deep) {
            depMap[key] = deps;
          } else {
            depMap[key]._deps = deps;
          }
        }

        // observe
        Object.defineProperty(data, key, {
          enumerable: true,
          configurable: true,
          get: function get$$1() {
            value = getter$$1 ? getter$$1.call(data) : value;
            if (Deps.target) {
              deps.addWatcher();
            }
            return value;
          },
          set: function set$$1(newVal) {
            value = getter$$1 ? getter$$1.call(data) : value;
            if (newVal === value) {
              return;
            }
            if (setter) {
              setter.call(data, newVal);
            } else {
              value = newVal;
            }
            me.walk(newVal, depMap[key]);
            if (depMap[key]._deps && (typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) !== 'object') {
              depMap[key] = depMap[key]._deps;
            } else if (depMap[key].isDep && (typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object') {
              depMap[key]._deps = depMap[key];
            }
            deps.notify(key);
          }
        });
      }
    }]);
    return Observer;
  }();

  /**
   * @file bind.js
   * @author qiusiqi (qiusiqi@baidu.com)
   */

  /* global MIP */
  /* eslint-disable no-new-func */

  var Bind = function () {
    function Bind() {
      var _this = this;

      classCallCheck(this, Bind);

      this.win = window;
      // save and check watcher defined by MIP.watch
      this.watcherIds = [];
      // save local states of page
      this.win.pgStates = new Set();
      // require mip data extension runtime
      this.compile = new Compile();
      this.observer = new Observer$2();
      // open APIs
      MIP.setData = function (data) {
        _this.bindTarget(false, data);
      };
      MIP.getData = function (key) {
        var ks = key.split('.');
        var res = _this.win.m[ks[0]];
        var i = 1;
        while (isObject$1(res) && i < ks.length) {
          res = res[ks[i]];
          i++;
        }
        return res;
      };
      MIP.watch = function (target, cb) {
        _this.bindWatch(target, cb);
      };
      // inner APIs - isolated by sandbox, not available to developers
      MIP.$set = function (data, cancel) {
        return _this.bindTarget(true, data, cancel);
      };
      MIP.$recompile = function () {
        _this.observer.start(_this.win.m);
        _this.compile.start(_this.win.m);
      };
      MIP.$update = function (data, pageId) {
        _this.update(data, pageId);
      };

      window.m = window.m || {};
      // store for async mip-data(s)
      window.mipDataPromises = window.mipDataPromises || [];
      // initialize
      MIP.$set(window.m);
    }

    /*
     * fake postmessage - to broadcast global-data-changes to other iframes
     * @param {Object} data data
     */


    createClass(Bind, [{
      key: 'postMessage',
      value: function postMessage(data) {
        Object.keys(data).forEach(function (k) {
          data['#' + k] = data[k];
          delete data[k];
        });

        var win = this.win;
        var targetWin = win;
        /* istanbul ignore if */
        if (!isSelfParent(win)) {
          targetWin = win.parent;
          // parent update
          targetWin.MIP.$set(data, true);
        }
        // self update
        win.MIP.$set(data, true);

        var pageId = win.location.href.replace(win.location.hash, '');
        // defer
        setTimeout(function () {
          targetWin.MIP.$update(data, pageId);
        }, 10);
      }

      /*
       * to broadcast global data diff to mip iframes under rootpage
       * @param {Object} data data to be set
       * @param {string} pageId pageId to avoid repeated setting
       */
      /* istanbul ignore next */

    }, {
      key: 'update',
      value: function update(data, pageId) {
        var win = this.win;

        for (var i = 0, frames = win.document.getElementsByTagName('iframe'); i < frames.length; i++) {
          if (frames[i].classList.contains('mip-page__iframe') && frames[i].getAttribute('data-page-id') && pageId !== frames[i].getAttribute('data-page-id')) {
            var subwin = frames[i].contentWindow;
            subwin && subwin.MIP && subwin.MIP.$set(data, true);
          }
        }
      }

      /*
       * to set data
       * @param {boolean} compile should-compile
       * @param {Object} data data to be set
       * @param {boolean} cancel should stop data-broadcasting
       */

    }, {
      key: 'bindTarget',
      value: function bindTarget(compile, data, cancel) {
        var _this2 = this;

        var win = this.win;

        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
          var origin = JSON.stringify(win.m);
          this.compile.updateData(JSON.parse(origin));
          var classified = this.normalize(data);
          // need compile - $set
          if (compile) {
            this.setGlobalState(classified.globalData, cancel);
            this.setPageState(classified, cancel);
            // defineProperty and set dependency hooks
            this.observer.start(win.m);
            // compile and bind
            this.compile.start(win.m);
          } else {
            locker(true); // lock, don't call watchers immediatly
            // set/update data directly - setData
            if (classified.globalData && objNotEmpty(classified.globalData)) {
              !cancel && this.postMessage(classified.globalData);
            }
            data = classified.pageData;
            Object.keys(data).forEach(function (field) {
              if (win.pgStates.has(field)) {
                assign$2(win.m, defineProperty({}, field, data[field]));
              } else {
                _this2.dispatch(field, data[field], cancel);
              }
            });
            locker(false); // unlock
          }
        } else {
          throw new Error('setData method MUST accept an object! Check your input:' + data);
        }
      }

      /*
       * set watcher
       * @param {string|Array} target target(s) needed to be watched
       * @param {Function} cb callback triggered when target changed
       */

    }, {
      key: 'bindWatch',
      value: function bindWatch(target, cb) {
        var _this3 = this;

        if (target.constructor === Array) {
          target.forEach(function (key) {
            return _this3.bindWatch(key, cb);
          });
          return;
        }
        if (typeof target !== 'string' || !target) {
          return;
        }
        if (!cb || typeof cb !== 'function') {
          return;
        }

        var reg = target.split('.').reduce(function (total, current) {
          if (total) {
            total += '{("[^{}:"]+":[^,]+,)*';
          }
          return total + ('"' + current + '":');
        }, '');
        if (!JSON.stringify(this.win.m).match(new RegExp(reg))) {
          return;
        }

        var watcherId = ('' + target + cb.toString()).replace(/[\n\t\s]/g, '');
        /* istanbul ignore if */
        if (this.watcherIds.indexOf(watcherId) !== -1) {
          return;
        }

        this.watcherIds.push(watcherId);
        new Watcher$1(null, this.win.m, '', 'Watch:' + target, cb); // eslint-disable-line no-new
      }

      /*
       * dispatch globaldata
       * @param {string} key key
       * @param {*} val value
       * @param {boolean} cancel should stop data-broadcasting
       */

    }, {
      key: 'dispatch',
      value: function dispatch(key, val, cancel) {
        var win = this.win;
        var data = defineProperty({}, key, val);
        if (win.g && win.g.hasOwnProperty(key)) {
          !cancel && this.postMessage(data);
        } else {
          /* istanbul ignore if */
          if (!isSelfParent(win) &&
          /* istanbul ignore next */win.parent.g &&
          /* istanbul ignore next */win.parent.g.hasOwnProperty(key)) {
            !cancel && this.postMessage(data);
          } else {
            Object.assign(win.m, data);
          }
        }
      }

      /*
       * set global data that shared around pages
       * @param {Object} data data
       * @param {boolean} cancel should stop data-broadcasting
       */

    }, {
      key: 'setGlobalState',
      value: function setGlobalState(data, cancel) {
        var win = this.win;
        // only set global data under rootpage
        /* istanbul ignore else */
        if (isSelfParent(win)) {
          win.g = win.g || {};
          assign$2(win.g, data);
        } else {
          !cancel && objNotEmpty(data) && this.postMessage(data);
        }
      }

      /*
       * set page data that used only under this page
       * @param {Object} data data
       * @param {boolean} cancel should stop data-broadcasting
       */

    }, {
      key: 'setPageState',
      value: function setPageState(data, cancel) {
        var win = this.win;
        Object.assign(win.m, data.pageData);
        // record props of pageData
        !cancel && Object.keys(data.pageData).forEach(function (k) {
          return win.pgStates.add(k);
        });

        var globalData = data.globalData;
        // update props from globalData
        Object.keys(globalData).forEach(function (key) {
          if (!win.pgStates.has(key) && win.m.hasOwnProperty(key)) {
            if (isObject$1(globalData[key]) && win.m[key] && isObject$1(win.m[key])) {
              assign$2(win.m[key], globalData[key]);
              win.m[key] = JSON.parse(JSON.stringify(win.m[key]));
            } else {
              win.m[key] = globalData[key];
            }
          }
        });

        // inherit
        setProto(win.m, getGlobalData(win));
        // win.m.__proto__ = getGlobalData(win) // eslint-disable-line no-proto
      }

      /*
       * normalize data if there is global data
       * @param {Object} data data
       */

    }, {
      key: 'normalize',
      value: function normalize(data) {
        var globalData = {};
        var pageData = {};

        Object.keys(data).forEach(function (k) {
          if (typeof data[k] === 'function') {
            throw 'setData method MUST NOT accept object that contains functions'; // eslint-disable-line no-throw-literal
          }
          if (/^#/.test(k)) {
            globalData[k.substr(1)] = data[k];
          } else {
            pageData[k] = data[k];
          }
        });

        return {
          globalData: globalData,
          pageData: pageData
        };
      }
    }]);
    return Bind;
  }();

  /*
   * deep assign
   * @param {Object} oldData oldData
   * @param {Object} newData newData
   */


  function assign$2(oldData, newData) {
    Object.keys(newData).forEach(function (k) {
      if (isObject$1(newData[k]) && oldData[k] && isObject$1(oldData[k])) {
        assign$2(oldData[k], newData[k]);
        var obj = JSON.parse(JSON.stringify(defineProperty({}, k, oldData[k])));
        Object.assign(oldData, obj);
      } else {
        oldData[k] = newData[k];
      }
    });
  }
  /*
   * data inherit
   * @param {Object} oldObj oldObj
   * @param {Object} newObj newObj
   */
  function setProto(oldObj, newObj) {
    Object.keys(newObj).forEach(function (key) {
      if (!oldObj[key]) {
        oldObj[key] = JSON.parse(JSON.stringify(newObj[key]));
      }
    });
  }
  /*
   * Tell if the page is rootPage - crossOrigin page is rootpage too
   * @param {Object} win window
   */
  function isSelfParent(win) {
    var page = win.MIP.viewer.page;
    return page.isRootPage || /* istanbul ignore next */page.isCrossOrigin;
  }
  /*
   * get the unique global data stored under rootpage
   * @param {Object} win window
   */
  function getGlobalData(win) {
    return isSelfParent(win) ? win.g : /* istanbul ignore next */win.parent.g;
  }

  /**
   * @file customeELement mip-data
   * @author qiusiqi (qiusiqi@baidu.com)
   */

  /*
   * Remove promise from global mipDataPromises array
   * @param {Promise} target promise need to be removed
   */
  function dropPromise(target) {
    var index = mipDataPromises.indexOf(target);
    mipDataPromises.splice(index, ~index ? 1 : 0);
  }

  var MipData = function (_CustomElement) {
    inherits(MipData, _CustomElement);

    function MipData() {
      classCallCheck(this, MipData);
      return possibleConstructorReturn(this, (MipData.__proto__ || Object.getPrototypeOf(MipData)).apply(this, arguments));
    }

    createClass(MipData, [{
      key: 'build',
      value: function build() {
        var src = this.element.getAttribute('src');
        var ele = this.element.querySelector('script[type="application/json"]');

        /* istanbul ignore if */
        if (src) {
          this.getData(src);
        } else if (ele) {
          var data = ele.textContent.toString();
          if (data) {
            MIP.$set(jsonParse(data));
          }
        }
      }

      /*
       * get initial data asynchronouslly
       */

    }, {
      key: 'getData',
      value: function getData(url) {
        var stuckResolve = void 0;
        var stuckReject = void 0;
        // only resolve/reject when sth truly comes to a result
        // such as only to resolve when res.json() done
        var stuckPromise = new Promise(function (resolve, reject) {
          stuckResolve = resolve;
          stuckReject = reject;
        });
        mipDataPromises.push(stuckPromise);

        fetch(url, { credentials: 'include' }).then(function (res) {
          if (res.ok) {
            res.json().then(function (data) {
              MIP.$set(data);
              dropPromise(stuckPromise);
              stuckResolve();
            });
          } else {
            console.error('Fetch request failed!');
            dropPromise(stuckPromise);
            stuckReject();
          }
        }).catch(function (e) {
          console.error(e);
          dropPromise(stuckPromise);
          stuckReject();
        });
      }

      /* istanbul ignore next  */

    }, {
      key: 'prerenderAllowed',
      value: function prerenderAllowed() {
        return true;
      }
    }]);
    return MipData;
  }(CustomElement);

  /**
   * @file mip-fixed
   * @author panyuqi(panyuqi@baidu.com)
   * @desc 解决 MIP1 <mip-fixed> 遗留的问题
   */

  var MipFixed = function (_CustomElement) {
    inherits(MipFixed, _CustomElement);

    function MipFixed() {
      classCallCheck(this, MipFixed);
      return possibleConstructorReturn(this, (MipFixed.__proto__ || Object.getPrototypeOf(MipFixed)).apply(this, arguments));
    }

    createClass(MipFixed, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        var viewer = window.MIP.viewer;
        var platform = window.MIP.util.platform;

        // Hack: mip1 站点强制重写 mip-layout-container display，导致无法隐藏 loading
        // 针对 mip-fixed 先把 mip-layout-container 去掉，这个不会对现有样式造成影响
        // TODO: 1. 考虑针对 mip-fixed 统一不使用 layout 处理 2. 推动下游去掉这个 class 的重写
        // 站点 http://mip.cntrades.com/15995352952/sell/itemid-170607633.html
        this.element.classList.remove('mip-layout-container');

        if (this.element.getAttribute('mipdata-fixedidx')) {
          return;
        }

        // should not move
        var still = this.element.hasAttribute('still');

        if (!still) {
          // only in iOS + iframe need moving element to fixedlayer
          var shouldMoveToFixedLayer = platform.isIos() && viewer.isIframed;
          viewer.fixedElement.setFixedElement([this.element], shouldMoveToFixedLayer);
        }
      }
    }]);
    return MipFixed;
  }(CustomElement);

  /**
   * @file mip-layout.js
   * @author huanghuiquan (huanghuiquan@baidu.com)
   */

  /**
   *
   */

  var MipLayout = function (_CustomElement) {
    inherits(MipLayout, _CustomElement);

    function MipLayout() {
      classCallCheck(this, MipLayout);
      return possibleConstructorReturn(this, (MipLayout.__proto__ || Object.getPrototypeOf(MipLayout)).apply(this, arguments));
    }

    createClass(MipLayout, [{
      key: 'build',

      /** @override */
      value: function build() {
        var container = this.element.ownerDocument.createElement('div');
        this.applyFillContent(container);
        this.element.getRealChildNodes().forEach(function (child) {
          return container.appendChild(child);
        });
        this.element.appendChild(container);
      }

      /** @override */

    }, {
      key: 'prerenderAllowed',
      value: function prerenderAllowed() {
        return true;
      }
    }]);
    return MipLayout;
  }(CustomElement);

  /**
   * @file index.js Builtins register
   * @author zhangzhiqiang(zhiqiangzhang37@163.com)
   */

  var builtinComponents = {

    /**
     * Register the builtin components.
     */
    register: function register() {
      registerElement$1('mip-layout', MipLayout);
      registerElement$1('mip-pix', MipPix);
      registerElement$1('mip-img', MipImg);
      registerElement$1('mip-rem', MipRem);
      registerElement$1('mip-carousel', MIPCarousel);
      registerElement$1('mip-iframe', MipIframe);
      registerElement$1('mip-video', MipVideo);
      registerElement$1('mip-fixed', MipFixed);
      new Bind();
      registerElement$1('mip-data', MipData);
      registerElement$1('mip-shell', MipShell);
    }
  };

  /**
   * @file keys.js
   * @author clark-t (clarktanglei@163.com)
   */

  var keys = function keys(node, reserved) {
    if (!reserved) {
      return node.map(function (child) {
        if (typeof child === 'string') {
          return child;
        }
        return child.name;
      });
    }

    return node.filter(function (child) {
      return typeof child === 'string';
    });
  };

  /**
   * @file flatten.js
   * @author clark-t (clarktanglei@163.com)
   */

  var flatten = function flatten(arr) {
    return Array.prototype.concat.apply([], arr);
  };

  /**
   * @file constant.js
   * @author clark-t (clarktanglei@163.com)
   */

  var constant = {
    TYPE: {
      PROPS: false,
      FUNCTION: true
    },
    // MODE: {
    //   NORMAL: false,
    //   RUNTIME: true
    // },
    ACCESS: {
      READONLY: false,
      READWRITE: true
    }
  };

  /**
   * @file safe-this.js
   * @author clark-t (clarktanglei@163.com)
   */

  /**
   * this sandbox，避免诸如
   *
   * (function () {
   *   console.log(this)
   * }).call(undefined)
   *
   * 上面的 this 指向 window
   *
   * @param {Object} that this
   * @return {Function} 返回 safe this 的方法
   */
  var safeThis = function safeThis(sandbox) {
    // safe this
    return function (that) {
      return that === window ? sandbox : that === document ? sandbox.document : that;
    };
  };

  /**
   * @file safe-keywords.js
   * @author clark-t (clarktanglei@163.com)
   */

  /* globals MIP, location */

  var TYPE_PROPS = constant.TYPE.PROPS;
  var TYPE_FUNCTION = constant.TYPE.FUNCTION;
  var ACCESS_READONLY = constant.ACCESS.READONLY;
  var ACCESS_READWRITE = constant.ACCESS.READWRITE;

  function flat(properties) {
    return flatten(properties.map(function (prop) {
      return prop.props;
    }));
  }

  var keywordsGenerate = function keywordsGenerate() {
    var ORIGINAL = [{
      type: TYPE_PROPS,
      access: ACCESS_READONLY,
      props: ['Array', 'ArrayBuffer', 'Blob', 'Boolean', 'DOMError', 'DOMException',
      // https://github.com/mipengine/mip2/issues/336
      'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array', 'FormData', 'Headers', 'Infinity', 'Int16Array', 'Int32Array', 'Int8Array', 'JSON', 'Map', 'Math', 'NaN', 'Number', 'Object', 'Promise', 'Proxy', 'ReadableStream', 'ReferenceError', 'Reflect', 'RegExp', 'Request', 'Response', 'Set', 'String', 'Symbol', 'SyntaxError',
      // https://github.com/mipengine/mip2/issues/347
      'TextDecoder', 'TextEncoder', 'TypeError', 'URIError', 'URL', 'URLSearchParams', 'Uint16Array', 'Uint32Array', 'Uint8Array', 'Uint8ClampedArray',
      // 1.0.17 新增 WebSocket
      'WebSocket', 'WritableStream',
      // issue https://github.com/mipengine/mip2/issues/62
      'crypto', 'console', 'decodeURI', 'decodeURIComponent', 'localStorage', 'navigator', 'sessionStorage', 'screen', 'undefined']
    }, {
      type: TYPE_PROPS,
      access: ACCESS_READONLY,
      props: ['devicePixelRatio', 'innerHeight', 'innerWidth', 'isSecureContext', 'length', 'outerHeight', 'outerWidth', 'screenLeft', 'screenTop', 'screenX', 'screenY', 'scrollX', 'scrollY',
      // mip-data ready status
      'mipDataPromises']
    }, {
      type: TYPE_FUNCTION,
      access: ACCESS_READONLY,
      props: [
      // https://github.com/mipengine/mip2/issues/347
      'atob', 'clearInterval', 'clearTimeout', 'encodeURI', 'encodeURIComponent', 'escape', 'fetch', 'getComputedStyle', 'isFinite', 'isNaN', 'matchMedia', 'parseFloat', 'parseInt', 'setInterval', 'setTimeout', 'unescape',
      // mip1 polyfill
      'fetchJsonp']
    }];

    var RESERVED = ['arguments', 'require', 'module', 'exports', 'define', 'import',
    // "production"
    'process'];

    var SANDBOX_STRICT = {
      name: 'strict',
      access: ACCESS_READONLY,
      origin: function origin() {
        return window;
      },
      properties: ORIGINAL.concat([{
        type: TYPE_PROPS,
        access: ACCESS_READONLY,
        props: [{
          name: 'document',
          origin: function origin() {
            return document;
          },
          properties: [{
            type: TYPE_PROPS,
            access: ACCESS_READWRITE,
            props: ['cookie',
            // https://github.com/mipengine/mip2/issues/95
            'domain']
          }]
        }, {
          name: 'location',
          // host: 'location',
          origin: function origin() {
            return location;
          },
          properties: [{
            type: TYPE_PROPS,
            access: ACCESS_READONLY,
            props: ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash', 'origin']
          }]
        }, {
          name: 'MIP',
          // host: 'MIP',
          origin: function origin() {
            return MIP;
          },
          properties: [{
            type: TYPE_PROPS,
            access: ACCESS_READONLY,
            props: ['viewport', 'util', 'sandbox', {
              name: 'viewer',
              origin: function origin() {
                return MIP.viewer;
              },
              properties: [{
                type: TYPE_PROPS,
                access: ACCESS_READONLY,
                props: ['isIframed']
              }, {
                type: TYPE_FUNCTION,
                access: ACCESS_READONLY,
                props: ['sendMessage', 'open']
              }]
            }]
          }, {
            type: TYPE_PROPS,
            access: ACCESS_READONLY,
            props: ['MIP_ROOT_PAGE']
          }, {
            type: TYPE_FUNCTION,
            access: ACCESS_READONLY,
            props: ['watch', 'setData', 'getData']
          }]
        }, {
          name: 'window',
          getter: function getter() {
            return MIP.sandbox.strict;
          }
        }]
      }, {
        type: TYPE_FUNCTION,
        access: ACCESS_READONLY,
        props: [{
          name: 'this',
          getter: function getter() {
            return safeThis(MIP.sandbox.strict);
          }
        }]
      }])
    };

    var SANDBOX = {
      name: 'sandbox',
      access: ACCESS_READONLY,
      origin: function origin() {
        return window;
      },
      properties: ORIGINAL.concat([{
        type: TYPE_PROPS,
        access: ACCESS_READONLY,
        props: [
        // https://github.com/mipengine/mip2/issues/143
        'CustomEvent', 'File', 'FileList', 'FileReader', 'Image', 'ImageBitmap', 'MutationObserver', 'Notification',
        // 待定
        'history',
        // 待定
        'location', 'scrollbars', {
          name: 'document',
          origin: function origin() {
            return document;
          },
          properties: [{
            type: TYPE_PROPS,
            access: ACCESS_READWRITE,
            props: [
            // https://github.com/mipengine/mip2/issues/95
            'domain', 'head', 'body', 'title', 'cookie', 'referrer', 'readyState', 'documentElement']
          }, {
            type: TYPE_FUNCTION,
            access: ACCESS_READONLY,
            props: ['createElement', 'createDocumentFragment', 'getElementById', 'getElementsByClassName', 'getElementsByTagName', 'querySelector', 'querySelectorAll']
          }]
        }, {
          name: 'window',
          getter: function getter() {
            return MIP.sandbox;
          }
        }, {
          name: 'MIP',
          getter: function getter() {
            return MIP;
          }
        }, SANDBOX_STRICT]
      }, {
        type: TYPE_FUNCTION,
        access: ACCESS_READONLY,
        props: ['addEventListener', 'cancelAnimationFrame', 'createImageBitmap', 'removeEventListener', 'requestAnimationFrame', 'scrollBy', 'scrollTo', 'scroll', 'webkitCancelAnimationFrame', 'webkitRequestAnimationFrame', {
          name: 'this',
          getter: function getter() {
            return safeThis(MIP.sandbox);
          }
        }]
      }])
    };

    var sandboxProperties = flat(SANDBOX.properties);
    var sandboxStrictProperties = flat(SANDBOX_STRICT.properties);

    var WHITELIST = keys(sandboxProperties).concat(RESERVED);
    var WHITELIST_STRICT = keys(sandboxStrictProperties).concat(RESERVED);
    var WHITELIST_RESERVED = keys(sandboxProperties, true).concat(RESERVED);
    var WHITELIST_STRICT_RESERVED = keys(sandboxStrictProperties, true).concat(RESERVED);

    // 防止用户篡改数组，因此每次返回的都是数组浅拷贝

    var whiteListProperties = {
      type: TYPE_PROPS,
      access: ACCESS_READONLY,
      props: [{
        name: 'WHITELIST',
        getter: function getter() {
          return WHITELIST.slice();
        }
      }, {
        name: 'WHITELIST_STRICT',
        getter: function getter() {
          return WHITELIST_STRICT.slice();
        }
      }, {
        name: 'WHITELIST_RESERVED',
        getter: function getter() {
          return WHITELIST_RESERVED.slice();
        }
      }, {
        name: 'WHITELIST_STRICT_RESERVED',
        getter: function getter() {
          return WHITELIST_STRICT_RESERVED.slice();
        }
      }]
    };

    SANDBOX.properties = SANDBOX.properties.concat(whiteListProperties);
    SANDBOX_STRICT.properties = SANDBOX_STRICT.properties.concat(whiteListProperties);

    return {
      ORIGINAL: ORIGINAL,
      RESERVED: RESERVED,
      SANDBOX: SANDBOX,
      SANDBOX_STRICT: SANDBOX_STRICT,
      WHITELIST: WHITELIST,
      WHITELIST_STRICT: WHITELIST_STRICT,
      WHITELIST_RESERVED: WHITELIST_RESERVED,
      WHITELIST_STRICT_RESERVED: WHITELIST_STRICT_RESERVED
    };
  };

  /**
   * @file def.js
   * @author clark-t (clarktanglei@163.com)
   */

  var TYPE_PROPS$1 = constant.TYPE.PROPS;
  var TYPE_FUNCTION$1 = constant.TYPE.FUNCTION;
  var ACCESS_READONLY$1 = constant.ACCESS.READONLY;

  function noop$2() {}

  function getGlobals() {
    return window;
  }

  function propFactory(name, origin) {
    return function () {
      return origin()[name];
    };
  }

  function funcFactory(name, origin) {
    return function () {
      var parent = origin();
      var fn = parent[name];
      return fn && fn.bind(parent);
    };
  }

  function propGetter(name, type, origin) {
    return type === TYPE_FUNCTION$1 ? funcFactory(name, origin) : propFactory(name, origin);
  }

  function mockGetter(name, desc, origin) {
    var mock = {};
    var isDefined = false;

    var properties = desc.properties;
    var childOrigin = desc.origin || propFactory(name, origin);

    return function () {
      if (isDefined) {
        return mock;
      }

      for (var i = 0; i < properties.length; i++) {
        var group = properties[i];

        var childType = group.type;
        var childAccess = group.access;
        var props = group.props;

        for (var j = 0; j < props.length; j++) {
          var prop = props[j];
          def$2(mock, prop.name || prop, prop, childType, childAccess, childOrigin);
        }
      }

      isDefined = true;
      return mock;
    };
  }

  function proxyFactory(name, desc, type, access, origin) {
    return {
      get: typeof desc.getter === 'function' ? desc.getter : desc.properties ? mockGetter(name, desc, origin) : propGetter(name, type, origin),
      set: typeof desc.setter === 'function' ? desc.setter : access === ACCESS_READONLY$1 ? noop$2 : function (val) {
        var parent = origin();
        parent[name] = val;
      }
    };
  }

  function getDescriptor(name, desc, type, access, origin) {
    if (desc.descriptor) {
      return desc.descriptor;
    }

    var descriptor = {
      enumerable: true,
      configurable: false
    };

    if (typeof desc === 'function') {
      descriptor.get = desc;
      descriptor.set = noop$2;
      return descriptor;
    }

    var proxy = proxyFactory(name, desc, desc.type || type || TYPE_PROPS$1, desc.access || access || ACCESS_READONLY$1, origin || getGlobals);

    descriptor.get = proxy.get;
    descriptor.set = proxy.set;

    return descriptor;
  }

  function def$2(obj, name, desc, type, access, origin) {
    var descriptor = getDescriptor(name, desc, type, access, origin);

    if (obj) {
      Object.defineProperty(obj, name, descriptor);
    }

    return descriptor;
  }

  var def_1 = def$2;

  /**
   * @file sandbox-generate.js
   * @author clark-t (clarktanglei@163.com)
   */

  // only use in browser env


  var sandboxGenerate = function sandboxGenerate(mip) {
    var keywords = keywordsGenerate();
    var descriptor = def_1(mip, keywords.SANDBOX.name, keywords.SANDBOX);

    if (mip) {
      return;
    }

    var sandbox = descriptor.get();
    return sandbox;
  };

  /**
   * @file sandbox.js 提供组件内部使用的沙盒环境，主要用于隔离全局环境和限制部分API能力
   * @author clark-t (clarktanglei@163.com)
   */

  /**
   * @file skeepWakeModule
   * @author sekiyika(pengxing@baidu.com)
   */

  /**
   * The mip viewer.Complement native viewer, and solve the page-level problems.
   *
   * @class
   */
  var SleepWakeModule = function () {
    function SleepWakeModule() {
      classCallCheck(this, SleepWakeModule);

      this._domObj = {};
      this._isAlreadyWake = {};
    }

    /**
     * The initialise method of sleepWakeModule
     */


    createClass(SleepWakeModule, [{
      key: 'init',
      value: function init() {
        var confCon = '';
        try {
          var moduleConf = document.querySelector('#mip-sleep-wake-module');
          confCon = JSON.parse(moduleConf.textContent);
        } catch (e) {
          return;
        }
        if (!confCon) {
          return;
        }
        this._initConf('||', confCon);
        // init
        for (var key in confCon) {
          this._stateChange(key, true);
        }
      }

      /**
       * init page conf.
       *
       * @param {string} split spliter
       * @param {Object} confContent config
       */

    }, {
      key: '_initConf',
      value: function _initConf(split, confContent) {
        // default value
        split = split || '||';
        for (var key in confContent) {
          var val = confContent[key];
          var valList = val.split(split);
          var len = valList.length;
          this._domObj[key] = [];
          for (var i = 0; i < len; i++) {
            try {
              var idx = i;
              var sleepDom = document.querySelector(valList[i]);
              var domInfo = {
                par: sleepDom.parentNode,
                cln: 'mip-sleep-wake-textarea-' + key + '-' + idx
              };
              sleepDom.setAttribute('data-cln', domInfo.cln);
              this._domObj[key].push(domInfo);
            } catch (e) {
              continue;
            }
          }
        }
      }

      /**
       * wake the doms which are sleeped in conf by key
       *
       * @param {string} key key
       */

    }, {
      key: 'wake',
      value: function wake(key) {
        this._stateChange(key);
        this._close(key);
      }

      /**
       * reset the stutas of doms by the key
       *
       * @param {string} key key
       */

    }, {
      key: 'reset',
      value: function reset(key) {
        this._isAlreadyWake[key] = 0;
      }

      /**
       * close the operation of doms by the key
       *
       * @param {string} key key
       */

    }, {
      key: '_close',
      value: function _close(key) {
        this._isAlreadyWake[key] = 1;
      }

      /**
       * change the status of doms by paras[key, isSleep]
       *
       * @param {string} key key
       * @param {boolean} isSleep isSleep
       */

    }, {
      key: '_stateChange',
      value: function _stateChange(key, isSleep) {
        if (!key) {
          return;
        }
        var domList = this._domObj[key];
        if (!domList) {
          return;
        }
        var len = domList.length;
        if (len < 1) {
          return;
        }
        for (var i = 0; i < len; i++) {
          var sleepDom = domList[i];
          if (isSleep && !this._isAlreadyWake[key]) {
            var self = sleepDom.par && sleepDom.cln ? sleepDom.par.querySelector('[data-cln=' + sleepDom.cln + ']') : null;
            // let parent = sleepDom.par;
            var tmpTextArea = document.createElement('textarea');
            // let idx = i;
            if (self && self.tagName.toLowerCase() === 'textarea') {
              continue;
            }
            if (!self) {
              continue;
            }
            tmpTextArea.textContent = self.outerHTML;
            tmpTextArea.style.display = 'none';
            tmpTextArea.setAttribute('data-cln', sleepDom.cln);

            self.outerHTML = tmpTextArea.outerHTML;
          }
          if (!isSleep && !this._isAlreadyWake[key]) {
            var par = sleepDom.par;
            if (par) {
              var tmpdom = par.querySelector('[data-cln=' + sleepDom.cln + ']');
              if (tmpdom && tmpdom.tagName.toLowerCase() === 'textarea') {
                tmpdom.outerHTML = tmpdom.textContent;
              }
            }
          }
        }
      }
    }]);
    return SleepWakeModule;
  }();

  var sleepWakeModule = new SleepWakeModule();

  /**
   * @file core-tags.js
   * @description 官方组件list, 之后有编译自动维护
   * @author schoeu
   */

  var coreTags = ['mip-carousel', 'mip-iframe', 'mip-img', 'mip-pix', 'mip-video', 'mip-access', 'mip-accordion', 'mip-ad', 'mip-analytics', 'mip-anim', 'mip-app-banner', 'mip-appdl', 'mip-audio', 'mip-bind', 'mip-custom', 'mip-experiment', 'mip-filter', 'mip-fixed', 'mip-form', 'mip-gototop', 'mip-history', 'mip-infinitescroll', 'mip-install-serviceworker', 'mip-lightbox', 'mip-link', 'mip-list', 'mip-login-done', 'mip-map', 'mip-mustache', 'mip-nav-slidedown', 'mip-sample', 'mip-semi-fixed', 'mip-share', 'mip-showmore', 'mip-sidebar', 'mip-stats-baidu', 'mip-stats-bidu', 'mip-stats-cnzz', 'mip-vd-baidu', 'mip-vd-tabs'];

  /**
   * @file error-monitor.js
   * @description javascript error monitor
   * 
   * 1. 仅收集百度&神马 CDN 地址下官方组件和 MIP 核心错误
   * 2. 抽样比例 0.1
   * 
   * @author schoeu, liwenqian
   */

  var RATE = 0.1;
  var tags = Array.isArray(coreTags) ? coreTags.filter(function () {
    var it = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return !!it.trim();
  }) : [];

  /**
   * MIP错误捕获处理
   *
   * @param {Object} e 错误事件对象
   * @param {?Object} opts 可选项
   * @param {?number} opts.rate 抽样率
   */
  function errorHandler() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var rate = opts.rate || RATE;

    // 报错文件请求路径, 跨域js文件中错误无信息暂不上报
    var filename = e.filename;
    var legalPathRegex = /(c\.mipcdn\.com|mipcache\.bdstatic\.com|\S+\.sm-tc\.cn|\S+\.transcode\.cn)\/static/;
    if (!filename || !legalPathRegex.test(filename)) {
      return;
    }

    // 错误信息
    var message = e.message || '';

    // 错误行号
    var lineno = e.lineno || '';

    // 错误列号
    var colno = e.colno || window.event && window.event.errorCharacter || 0;

    var tagInfo = /\/(mip-.+)\//g.exec(filename) || [];
    var tagName = tagInfo[1] || '';
    var sampling = Math.random() <= rate;
    var shouldReportError = (filename.match(/(mip\.js)/g) || tags.indexOf(tagName) > -1) && sampling;

    if (shouldReportError) {
      // 数据处理
      var logData = {
        file: filename,
        msg: message,
        ln: lineno,
        col: colno,
        href: window.location.href
      };
      viewer.sendMessage(OUTER_MESSAGE_STABILITY_LOG, logData);
    }
  }

  function install$1() {
    window.removeEventListener('error', errorHandler);
    window.addEventListener('error', errorHandler);
  }

  /**
   * @file mip entry
   * @author sfe
   */

  // Ensure loaded only once
  /* istanbul ignore next */
  if (typeof window.MIP === 'undefined' || typeof window.MIP.version === 'undefined') {
    install$1();
    var MIP$1 = getRuntime(window);

    // init viewport
    viewport.init();

    util.dom.waitDocumentReady(function () {
      // Initialize sleepWakeModule
      sleepWakeModule.init();

      var preregisteredExtensions = window.MIP || [];

      window.MIP = MIP$1;

      sandboxGenerate(window.MIP);

      // Initialize viewer
      viewer.init();

      // Find the default-hidden elements.
      var hiddenElements = Array.prototype.slice.call(document.getElementsByClassName('mip-hidden'));

      // Regular for checking mip elements.
      var mipTagReg = /mip-/i;

      // Apply layout for default-hidden elements.
      /* istanbul ignore next */
      hiddenElements.forEach(function (element) {
        return element.tagName.search(mipTagReg) > -1 && applyLayout(element);
      });

      // register buildin components
      builtinComponents.register();
      Array.isArray(preregisteredExtensions) && preregisteredExtensions.forEach(window.MIP.push);

      performance.start(window._mipStartTiming);
      // send performance data
      performance.on('update', function (timing) {
        viewer.sendMessage(OUTER_MESSAGE_PERFORMANCE_UPDATE, timing);
      });

      // Show page
      viewer.show();

      // clear cookie
      var storage = util.customStorage(2);
      storage.delExceedCookie();
    });
  }

})));
