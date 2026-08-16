//#region \0rolldown/runtime.js
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
//#endregion
//#region ../../node_modules/.pnpm/react@18.3.1/node_modules/react/cjs/react.production.min.js
/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var l = Symbol.for("react.element");
	var n = Symbol.for("react.portal");
	var p = Symbol.for("react.fragment");
	var q = Symbol.for("react.strict_mode");
	var r = Symbol.for("react.profiler");
	var t = Symbol.for("react.provider");
	var u = Symbol.for("react.context");
	var v = Symbol.for("react.forward_ref");
	var w = Symbol.for("react.suspense");
	var x = Symbol.for("react.memo");
	var y = Symbol.for("react.lazy");
	var z = Symbol.iterator;
	function A(a) {
		if (null === a || "object" !== typeof a) return null;
		a = z && a[z] || a["@@iterator"];
		return "function" === typeof a ? a : null;
	}
	var B = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var C = Object.assign;
	var D = {};
	function E(a, b, e) {
		this.props = a;
		this.context = b;
		this.refs = D;
		this.updater = e || B;
	}
	E.prototype.isReactComponent = {};
	E.prototype.setState = function(a, b) {
		if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, a, b, "setState");
	};
	E.prototype.forceUpdate = function(a) {
		this.updater.enqueueForceUpdate(this, a, "forceUpdate");
	};
	function F() {}
	F.prototype = E.prototype;
	function G(a, b, e) {
		this.props = a;
		this.context = b;
		this.refs = D;
		this.updater = e || B;
	}
	var H = G.prototype = new F();
	H.constructor = G;
	C(H, E.prototype);
	H.isPureReactComponent = !0;
	var I = Array.isArray;
	var J = Object.prototype.hasOwnProperty;
	var K = { current: null };
	var L = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function M(a, b, e) {
		var d, c = {}, k = null, h = null;
		if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
		var g = arguments.length - 2;
		if (1 === g) c.children = e;
		else if (1 < g) {
			for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
			c.children = f;
		}
		if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
		return {
			$$typeof: l,
			type: a,
			key: k,
			ref: h,
			props: c,
			_owner: K.current
		};
	}
	function N(a, b) {
		return {
			$$typeof: l,
			type: a.type,
			key: b,
			ref: a.ref,
			props: a.props,
			_owner: a._owner
		};
	}
	function O(a) {
		return "object" === typeof a && null !== a && a.$$typeof === l;
	}
	function escape(a) {
		var b = {
			"=": "=0",
			":": "=2"
		};
		return "$" + a.replace(/[=:]/g, function(a) {
			return b[a];
		});
	}
	var P = /\/+/g;
	function Q(a, b) {
		return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
	}
	function R(a, b, e, d, c) {
		var k = typeof a;
		if ("undefined" === k || "boolean" === k) a = null;
		var h = !1;
		if (null === a) h = !0;
		else switch (k) {
			case "string":
			case "number":
				h = !0;
				break;
			case "object": switch (a.$$typeof) {
				case l:
				case n: h = !0;
			}
		}
		if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a) {
			return a;
		})) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
		h = 0;
		d = "" === d ? "." : d + ":";
		if (I(a)) for (var g = 0; g < a.length; g++) {
			k = a[g];
			var f = d + Q(k, g);
			h += R(k, b, e, f, c);
		}
		else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
		else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
		return h;
	}
	function S(a, b, e) {
		if (null == a) return a;
		var d = [], c = 0;
		R(a, d, "", "", function(a) {
			return b.call(e, a, c++);
		});
		return d;
	}
	function T(a) {
		if (-1 === a._status) {
			var b = a._result;
			b = b();
			b.then(function(b) {
				if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
			}, function(b) {
				if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
			});
			-1 === a._status && (a._status = 0, a._result = b);
		}
		if (1 === a._status) return a._result.default;
		throw a._result;
	}
	var U = { current: null };
	var V = { transition: null };
	var W = {
		ReactCurrentDispatcher: U,
		ReactCurrentBatchConfig: V,
		ReactCurrentOwner: K
	};
	function X() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	exports.Children = {
		map: S,
		forEach: function(a, b, e) {
			S(a, function() {
				b.apply(this, arguments);
			}, e);
		},
		count: function(a) {
			var b = 0;
			S(a, function() {
				b++;
			});
			return b;
		},
		toArray: function(a) {
			return S(a, function(a) {
				return a;
			}) || [];
		},
		only: function(a) {
			if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
			return a;
		}
	};
	exports.Component = E;
	exports.Fragment = p;
	exports.Profiler = r;
	exports.PureComponent = G;
	exports.StrictMode = q;
	exports.Suspense = w;
	exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
	exports.act = X;
	exports.cloneElement = function(a, b, e) {
		if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
		var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
		if (null != b) {
			void 0 !== b.ref && (k = b.ref, h = K.current);
			void 0 !== b.key && (c = "" + b.key);
			if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
			for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
		}
		var f = arguments.length - 2;
		if (1 === f) d.children = e;
		else if (1 < f) {
			g = Array(f);
			for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
			d.children = g;
		}
		return {
			$$typeof: l,
			type: a.type,
			key: c,
			ref: k,
			props: d,
			_owner: h
		};
	};
	exports.createContext = function(a) {
		a = {
			$$typeof: u,
			_currentValue: a,
			_currentValue2: a,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		};
		a.Provider = {
			$$typeof: t,
			_context: a
		};
		return a.Consumer = a;
	};
	exports.createElement = M;
	exports.createFactory = function(a) {
		var b = M.bind(null, a);
		b.type = a;
		return b;
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(a) {
		return {
			$$typeof: v,
			render: a
		};
	};
	exports.isValidElement = O;
	exports.lazy = function(a) {
		return {
			$$typeof: y,
			_payload: {
				_status: -1,
				_result: a
			},
			_init: T
		};
	};
	exports.memo = function(a, b) {
		return {
			$$typeof: x,
			type: a,
			compare: void 0 === b ? null : b
		};
	};
	exports.startTransition = function(a) {
		var b = V.transition;
		V.transition = {};
		try {
			a();
		} finally {
			V.transition = b;
		}
	};
	exports.unstable_act = X;
	exports.useCallback = function(a, b) {
		return U.current.useCallback(a, b);
	};
	exports.useContext = function(a) {
		return U.current.useContext(a);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(a) {
		return U.current.useDeferredValue(a);
	};
	exports.useEffect = function(a, b) {
		return U.current.useEffect(a, b);
	};
	exports.useId = function() {
		return U.current.useId();
	};
	exports.useImperativeHandle = function(a, b, e) {
		return U.current.useImperativeHandle(a, b, e);
	};
	exports.useInsertionEffect = function(a, b) {
		return U.current.useInsertionEffect(a, b);
	};
	exports.useLayoutEffect = function(a, b) {
		return U.current.useLayoutEffect(a, b);
	};
	exports.useMemo = function(a, b) {
		return U.current.useMemo(a, b);
	};
	exports.useReducer = function(a, b, e) {
		return U.current.useReducer(a, b, e);
	};
	exports.useRef = function(a) {
		return U.current.useRef(a);
	};
	exports.useState = function(a) {
		return U.current.useState(a);
	};
	exports.useSyncExternalStore = function(a, b, e) {
		return U.current.useSyncExternalStore(a, b, e);
	};
	exports.useTransition = function() {
		return U.current.useTransition();
	};
	exports.version = "18.3.1";
}));
//#endregion
//#region ../../node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production_min();
}));
//#endregion
//#region ../../node_modules/.pnpm/scheduler@0.23.2/node_modules/scheduler/cjs/scheduler.production.min.js
/**
* @license React
* scheduler.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_scheduler_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	function f(a, b) {
		var c = a.length;
		a.push(b);
		a: for (; 0 < c;) {
			var d = c - 1 >>> 1, e = a[d];
			if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
			else break a;
		}
	}
	function h(a) {
		return 0 === a.length ? null : a[0];
	}
	function k(a) {
		if (0 === a.length) return null;
		var b = a[0], c = a.pop();
		if (c !== b) {
			a[0] = c;
			a: for (var d = 0, e = a.length, w = e >>> 1; d < w;) {
				var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
				if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
				else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
				else break a;
			}
		}
		return b;
	}
	function g(a, b) {
		var c = a.sortIndex - b.sortIndex;
		return 0 !== c ? c : a.id - b.id;
	}
	if ("object" === typeof performance && "function" === typeof performance.now) {
		var l = performance;
		exports.unstable_now = function() {
			return l.now();
		};
	} else {
		var p = Date, q = p.now();
		exports.unstable_now = function() {
			return p.now() - q;
		};
	}
	var r = [];
	var t = [];
	var u = 1;
	var v = null;
	var y = 3;
	var z = !1;
	var A = !1;
	var B = !1;
	var D = "function" === typeof setTimeout ? setTimeout : null;
	var E = "function" === typeof clearTimeout ? clearTimeout : null;
	var F = "undefined" !== typeof setImmediate ? setImmediate : null;
	"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function G(a) {
		for (var b = h(t); null !== b;) {
			if (null === b.callback) k(t);
			else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
			else break;
			b = h(t);
		}
	}
	function H(a) {
		B = !1;
		G(a);
		if (!A) if (null !== h(r)) A = !0, I(J);
		else {
			var b = h(t);
			null !== b && K(H, b.startTime - a);
		}
	}
	function J(a, b) {
		A = !1;
		B && (B = !1, E(L), L = -1);
		z = !0;
		var c = y;
		try {
			G(b);
			for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M());) {
				var d = v.callback;
				if ("function" === typeof d) {
					v.callback = null;
					y = v.priorityLevel;
					var e = d(v.expirationTime <= b);
					b = exports.unstable_now();
					"function" === typeof e ? v.callback = e : v === h(r) && k(r);
					G(b);
				} else k(r);
				v = h(r);
			}
			if (null !== v) var w = !0;
			else {
				var m = h(t);
				null !== m && K(H, m.startTime - b);
				w = !1;
			}
			return w;
		} finally {
			v = null, y = c, z = !1;
		}
	}
	var N = !1;
	var O = null;
	var L = -1;
	var P = 5;
	var Q = -1;
	function M() {
		return exports.unstable_now() - Q < P ? !1 : !0;
	}
	function R() {
		if (null !== O) {
			var a = exports.unstable_now();
			Q = a;
			var b = !0;
			try {
				b = O(!0, a);
			} finally {
				b ? S() : (N = !1, O = null);
			}
		} else N = !1;
	}
	var S;
	if ("function" === typeof F) S = function() {
		F(R);
	};
	else if ("undefined" !== typeof MessageChannel) {
		var T = new MessageChannel(), U = T.port2;
		T.port1.onmessage = R;
		S = function() {
			U.postMessage(null);
		};
	} else S = function() {
		D(R, 0);
	};
	function I(a) {
		O = a;
		N || (N = !0, S());
	}
	function K(a, b) {
		L = D(function() {
			a(exports.unstable_now());
		}, b);
	}
	exports.unstable_IdlePriority = 5;
	exports.unstable_ImmediatePriority = 1;
	exports.unstable_LowPriority = 4;
	exports.unstable_NormalPriority = 3;
	exports.unstable_Profiling = null;
	exports.unstable_UserBlockingPriority = 2;
	exports.unstable_cancelCallback = function(a) {
		a.callback = null;
	};
	exports.unstable_continueExecution = function() {
		A || z || (A = !0, I(J));
	};
	exports.unstable_forceFrameRate = function(a) {
		0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
	};
	exports.unstable_getCurrentPriorityLevel = function() {
		return y;
	};
	exports.unstable_getFirstCallbackNode = function() {
		return h(r);
	};
	exports.unstable_next = function(a) {
		switch (y) {
			case 1:
			case 2:
			case 3:
				var b = 3;
				break;
			default: b = y;
		}
		var c = y;
		y = b;
		try {
			return a();
		} finally {
			y = c;
		}
	};
	exports.unstable_pauseExecution = function() {};
	exports.unstable_requestPaint = function() {};
	exports.unstable_runWithPriority = function(a, b) {
		switch (a) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: a = 3;
		}
		var c = y;
		y = a;
		try {
			return b();
		} finally {
			y = c;
		}
	};
	exports.unstable_scheduleCallback = function(a, b, c) {
		var d = exports.unstable_now();
		"object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
		switch (a) {
			case 1:
				var e = -1;
				break;
			case 2:
				e = 250;
				break;
			case 5:
				e = 1073741823;
				break;
			case 4:
				e = 1e4;
				break;
			default: e = 5e3;
		}
		e = c + e;
		a = {
			id: u++,
			callback: b,
			priorityLevel: a,
			startTime: c,
			expirationTime: e,
			sortIndex: -1
		};
		c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = !0, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));
		return a;
	};
	exports.unstable_shouldYield = M;
	exports.unstable_wrapCallback = function(a) {
		var b = y;
		return function() {
			var c = y;
			y = b;
			try {
				return a.apply(this, arguments);
			} finally {
				y = c;
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/scheduler@0.23.2/node_modules/scheduler/index.js
var require_scheduler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_scheduler_production_min();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/cjs/react-dom.production.min.js
/**
* @license React
* react-dom.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var aa = require_react();
	var ca = require_scheduler();
	function p(a) {
		for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
		return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var da = /* @__PURE__ */ new Set();
	var ea = {};
	function fa(a, b) {
		ha(a, b);
		ha(a + "Capture", b);
	}
	function ha(a, b) {
		ea[a] = b;
		for (a = 0; a < b.length; a++) da.add(b[a]);
	}
	var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
	var ja = Object.prototype.hasOwnProperty;
	var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
	var la = {};
	var ma = {};
	function oa(a) {
		if (ja.call(ma, a)) return !0;
		if (ja.call(la, a)) return !1;
		if (ka.test(a)) return ma[a] = !0;
		la[a] = !0;
		return !1;
	}
	function pa(a, b, c, d) {
		if (null !== c && 0 === c.type) return !1;
		switch (typeof b) {
			case "function":
			case "symbol": return !0;
			case "boolean":
				if (d) return !1;
				if (null !== c) return !c.acceptsBooleans;
				a = a.toLowerCase().slice(0, 5);
				return "data-" !== a && "aria-" !== a;
			default: return !1;
		}
	}
	function qa(a, b, c, d) {
		if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return !0;
		if (d) return !1;
		if (null !== c) switch (c.type) {
			case 3: return !b;
			case 4: return !1 === b;
			case 5: return isNaN(b);
			case 6: return isNaN(b) || 1 > b;
		}
		return !1;
	}
	function v(a, b, c, d, e, f, g) {
		this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
		this.attributeName = d;
		this.attributeNamespace = e;
		this.mustUseProperty = c;
		this.propertyName = a;
		this.type = b;
		this.sanitizeURL = f;
		this.removeEmptyString = g;
	}
	var z = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
		z[a] = new v(a, 0, !1, a, null, !1, !1);
	});
	[
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(a) {
		var b = a[0];
		z[b] = new v(b, 1, !1, a[1], null, !1, !1);
	});
	[
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach(function(a) {
		z[a] = new v(a, 2, !1, a.toLowerCase(), null, !1, !1);
	});
	[
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach(function(a) {
		z[a] = new v(a, 2, !1, a, null, !1, !1);
	});
	"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
		z[a] = new v(a, 3, !1, a.toLowerCase(), null, !1, !1);
	});
	[
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach(function(a) {
		z[a] = new v(a, 3, !0, a, null, !1, !1);
	});
	["capture", "download"].forEach(function(a) {
		z[a] = new v(a, 4, !1, a, null, !1, !1);
	});
	[
		"cols",
		"rows",
		"size",
		"span"
	].forEach(function(a) {
		z[a] = new v(a, 6, !1, a, null, !1, !1);
	});
	["rowSpan", "start"].forEach(function(a) {
		z[a] = new v(a, 5, !1, a.toLowerCase(), null, !1, !1);
	});
	var ra = /[\-:]([a-z])/g;
	function sa(a) {
		return a[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
		var b = a.replace(ra, sa);
		z[b] = new v(b, 1, !1, a, null, !1, !1);
	});
	"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
		var b = a.replace(ra, sa);
		z[b] = new v(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
	});
	[
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach(function(a) {
		var b = a.replace(ra, sa);
		z[b] = new v(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
	});
	["tabIndex", "crossOrigin"].forEach(function(a) {
		z[a] = new v(a, 1, !1, a.toLowerCase(), null, !1, !1);
	});
	z.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
	[
		"src",
		"href",
		"action",
		"formAction"
	].forEach(function(a) {
		z[a] = new v(a, 1, !1, a.toLowerCase(), null, !0, !0);
	});
	function ta(a, b, c, d) {
		var e = z.hasOwnProperty(b) ? z[b] : null;
		if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
	}
	var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
	var va = Symbol.for("react.element");
	var wa = Symbol.for("react.portal");
	var ya = Symbol.for("react.fragment");
	var za = Symbol.for("react.strict_mode");
	var Aa = Symbol.for("react.profiler");
	var Ba = Symbol.for("react.provider");
	var Ca = Symbol.for("react.context");
	var Da = Symbol.for("react.forward_ref");
	var Ea = Symbol.for("react.suspense");
	var Fa = Symbol.for("react.suspense_list");
	var Ga = Symbol.for("react.memo");
	var Ha = Symbol.for("react.lazy");
	var Ia = Symbol.for("react.offscreen");
	var Ja = Symbol.iterator;
	function Ka(a) {
		if (null === a || "object" !== typeof a) return null;
		a = Ja && a[Ja] || a["@@iterator"];
		return "function" === typeof a ? a : null;
	}
	var A = Object.assign;
	var La;
	function Ma(a) {
		if (void 0 === La) try {
			throw Error();
		} catch (c) {
			var b = c.stack.trim().match(/\n( *(at )?)/);
			La = b && b[1] || "";
		}
		return "\n" + La + a;
	}
	var Na = !1;
	function Oa(a, b) {
		if (!a || Na) return "";
		Na = !0;
		var c = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			if (b) if (b = function() {
				throw Error();
			}, Object.defineProperty(b.prototype, "props", { set: function() {
				throw Error();
			} }), "object" === typeof Reflect && Reflect.construct) {
				try {
					Reflect.construct(b, []);
				} catch (l) {
					var d = l;
				}
				Reflect.construct(a, [], b);
			} else {
				try {
					b.call();
				} catch (l) {
					d = l;
				}
				a.call(b.prototype);
			}
			else {
				try {
					throw Error();
				} catch (l) {
					d = l;
				}
				a();
			}
		} catch (l) {
			if (l && d && "string" === typeof l.stack) {
				for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) h--;
				for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
					if (1 !== g || 1 !== h) do
						if (g--, h--, 0 > h || e[g] !== f[h]) {
							var k = "\n" + e[g].replace(" at new ", " at ");
							a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
							return k;
						}
					while (1 <= g && 0 <= h);
					break;
				}
			}
		} finally {
			Na = !1, Error.prepareStackTrace = c;
		}
		return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
	}
	function Pa(a) {
		switch (a.tag) {
			case 5: return Ma(a.type);
			case 16: return Ma("Lazy");
			case 13: return Ma("Suspense");
			case 19: return Ma("SuspenseList");
			case 0:
			case 2:
			case 15: return a = Oa(a.type, !1), a;
			case 11: return a = Oa(a.type.render, !1), a;
			case 1: return a = Oa(a.type, !0), a;
			default: return "";
		}
	}
	function Qa(a) {
		if (null == a) return null;
		if ("function" === typeof a) return a.displayName || a.name || null;
		if ("string" === typeof a) return a;
		switch (a) {
			case ya: return "Fragment";
			case wa: return "Portal";
			case Aa: return "Profiler";
			case za: return "StrictMode";
			case Ea: return "Suspense";
			case Fa: return "SuspenseList";
		}
		if ("object" === typeof a) switch (a.$$typeof) {
			case Ca: return (a.displayName || "Context") + ".Consumer";
			case Ba: return (a._context.displayName || "Context") + ".Provider";
			case Da:
				var b = a.render;
				a = a.displayName;
				a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
				return a;
			case Ga: return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
			case Ha:
				b = a._payload;
				a = a._init;
				try {
					return Qa(a(b));
				} catch (c) {}
		}
		return null;
	}
	function Ra(a) {
		var b = a.type;
		switch (a.tag) {
			case 24: return "Cache";
			case 9: return (b.displayName || "Context") + ".Consumer";
			case 10: return (b._context.displayName || "Context") + ".Provider";
			case 18: return "DehydratedFragment";
			case 11: return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
			case 7: return "Fragment";
			case 5: return b;
			case 4: return "Portal";
			case 3: return "Root";
			case 6: return "Text";
			case 16: return Qa(b);
			case 8: return b === za ? "StrictMode" : "Mode";
			case 22: return "Offscreen";
			case 12: return "Profiler";
			case 21: return "Scope";
			case 13: return "Suspense";
			case 19: return "SuspenseList";
			case 25: return "TracingMarker";
			case 1:
			case 0:
			case 17:
			case 2:
			case 14:
			case 15:
				if ("function" === typeof b) return b.displayName || b.name || null;
				if ("string" === typeof b) return b;
		}
		return null;
	}
	function Sa(a) {
		switch (typeof a) {
			case "boolean":
			case "number":
			case "string":
			case "undefined": return a;
			case "object": return a;
			default: return "";
		}
	}
	function Ta(a) {
		var b = a.type;
		return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
	}
	function Ua(a) {
		var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
		if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
			var e = c.get, f = c.set;
			Object.defineProperty(a, b, {
				configurable: !0,
				get: function() {
					return e.call(this);
				},
				set: function(a) {
					d = "" + a;
					f.call(this, a);
				}
			});
			Object.defineProperty(a, b, { enumerable: c.enumerable });
			return {
				getValue: function() {
					return d;
				},
				setValue: function(a) {
					d = "" + a;
				},
				stopTracking: function() {
					a._valueTracker = null;
					delete a[b];
				}
			};
		}
	}
	function Va(a) {
		a._valueTracker || (a._valueTracker = Ua(a));
	}
	function Wa(a) {
		if (!a) return !1;
		var b = a._valueTracker;
		if (!b) return !0;
		var c = b.getValue();
		var d = "";
		a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
		a = d;
		return a !== c ? (b.setValue(a), !0) : !1;
	}
	function Xa(a) {
		a = a || ("undefined" !== typeof document ? document : void 0);
		if ("undefined" === typeof a) return null;
		try {
			return a.activeElement || a.body;
		} catch (b) {
			return a.body;
		}
	}
	function Ya(a, b) {
		var c = b.checked;
		return A({}, b, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: null != c ? c : a._wrapperState.initialChecked
		});
	}
	function Za(a, b) {
		var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
		c = Sa(null != b.value ? b.value : c);
		a._wrapperState = {
			initialChecked: d,
			initialValue: c,
			controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
		};
	}
	function ab(a, b) {
		b = b.checked;
		null != b && ta(a, "checked", b, !1);
	}
	function bb(a, b) {
		ab(a, b);
		var c = Sa(b.value), d = b.type;
		if (null != c) if ("number" === d) {
			if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
		} else a.value !== "" + c && (a.value = "" + c);
		else if ("submit" === d || "reset" === d) {
			a.removeAttribute("value");
			return;
		}
		b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
		null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
	}
	function db(a, b, c) {
		if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
			var d = b.type;
			if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
			b = "" + a._wrapperState.initialValue;
			c || b === a.value || (a.value = b);
			a.defaultValue = b;
		}
		c = a.name;
		"" !== c && (a.name = "");
		a.defaultChecked = !!a._wrapperState.initialChecked;
		"" !== c && (a.name = c);
	}
	function cb(a, b, c) {
		if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
	}
	var eb = Array.isArray;
	function fb(a, b, c, d) {
		a = a.options;
		if (b) {
			b = {};
			for (var e = 0; e < c.length; e++) b["$" + c[e]] = !0;
			for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
		} else {
			c = "" + Sa(c);
			b = null;
			for (e = 0; e < a.length; e++) {
				if (a[e].value === c) {
					a[e].selected = !0;
					d && (a[e].defaultSelected = !0);
					return;
				}
				null !== b || a[e].disabled || (b = a[e]);
			}
			null !== b && (b.selected = !0);
		}
	}
	function gb(a, b) {
		if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
		return A({}, b, {
			value: void 0,
			defaultValue: void 0,
			children: "" + a._wrapperState.initialValue
		});
	}
	function hb(a, b) {
		var c = b.value;
		if (null == c) {
			c = b.children;
			b = b.defaultValue;
			if (null != c) {
				if (null != b) throw Error(p(92));
				if (eb(c)) {
					if (1 < c.length) throw Error(p(93));
					c = c[0];
				}
				b = c;
			}
			b ??= "";
			c = b;
		}
		a._wrapperState = { initialValue: Sa(c) };
	}
	function ib(a, b) {
		var c = Sa(b.value), d = Sa(b.defaultValue);
		null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
		null != d && (a.defaultValue = "" + d);
	}
	function jb(a) {
		var b = a.textContent;
		b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
	}
	function kb(a) {
		switch (a) {
			case "svg": return "http://www.w3.org/2000/svg";
			case "math": return "http://www.w3.org/1998/Math/MathML";
			default: return "http://www.w3.org/1999/xhtml";
		}
	}
	function lb(a, b) {
		return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
	}
	var mb;
	var nb = function(a) {
		return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
			MSApp.execUnsafeLocalFunction(function() {
				return a(b, c, d, e);
			});
		} : a;
	}(function(a, b) {
		if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
		else {
			mb = mb || document.createElement("div");
			mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
			for (b = mb.firstChild; a.firstChild;) a.removeChild(a.firstChild);
			for (; b.firstChild;) a.appendChild(b.firstChild);
		}
	});
	function ob(a, b) {
		if (b) {
			var c = a.firstChild;
			if (c && c === a.lastChild && 3 === c.nodeType) {
				c.nodeValue = b;
				return;
			}
		}
		a.textContent = b;
	}
	var pb = {
		animationIterationCount: !0,
		aspectRatio: !0,
		borderImageOutset: !0,
		borderImageSlice: !0,
		borderImageWidth: !0,
		boxFlex: !0,
		boxFlexGroup: !0,
		boxOrdinalGroup: !0,
		columnCount: !0,
		columns: !0,
		flex: !0,
		flexGrow: !0,
		flexPositive: !0,
		flexShrink: !0,
		flexNegative: !0,
		flexOrder: !0,
		gridArea: !0,
		gridRow: !0,
		gridRowEnd: !0,
		gridRowSpan: !0,
		gridRowStart: !0,
		gridColumn: !0,
		gridColumnEnd: !0,
		gridColumnSpan: !0,
		gridColumnStart: !0,
		fontWeight: !0,
		lineClamp: !0,
		lineHeight: !0,
		opacity: !0,
		order: !0,
		orphans: !0,
		tabSize: !0,
		widows: !0,
		zIndex: !0,
		zoom: !0,
		fillOpacity: !0,
		floodOpacity: !0,
		stopOpacity: !0,
		strokeDasharray: !0,
		strokeDashoffset: !0,
		strokeMiterlimit: !0,
		strokeOpacity: !0,
		strokeWidth: !0
	};
	var qb = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(pb).forEach(function(a) {
		qb.forEach(function(b) {
			b = b + a.charAt(0).toUpperCase() + a.substring(1);
			pb[b] = pb[a];
		});
	});
	function rb(a, b, c) {
		return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
	}
	function sb(a, b) {
		a = a.style;
		for (var c in b) if (b.hasOwnProperty(c)) {
			var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
			"float" === c && (c = "cssFloat");
			d ? a.setProperty(c, e) : a[c] = e;
		}
	}
	var tb = A({ menuitem: !0 }, {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function ub(a, b) {
		if (b) {
			if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
			if (null != b.dangerouslySetInnerHTML) {
				if (null != b.children) throw Error(p(60));
				if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
			}
			if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
		}
	}
	function vb(a, b) {
		if (-1 === a.indexOf("-")) return "string" === typeof b.is;
		switch (a) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var wb = null;
	function xb(a) {
		a = a.target || a.srcElement || window;
		a.correspondingUseElement && (a = a.correspondingUseElement);
		return 3 === a.nodeType ? a.parentNode : a;
	}
	var yb = null;
	var zb = null;
	var Ab = null;
	function Bb(a) {
		if (a = Cb(a)) {
			if ("function" !== typeof yb) throw Error(p(280));
			var b = a.stateNode;
			b && (b = Db(b), yb(a.stateNode, a.type, b));
		}
	}
	function Eb(a) {
		zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
	}
	function Fb() {
		if (zb) {
			var a = zb, b = Ab;
			Ab = zb = null;
			Bb(a);
			if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
		}
	}
	function Gb(a, b) {
		return a(b);
	}
	function Hb() {}
	var Ib = !1;
	function Jb(a, b, c) {
		if (Ib) return a(b, c);
		Ib = !0;
		try {
			return Gb(a, b, c);
		} finally {
			if (Ib = !1, null !== zb || null !== Ab) Hb(), Fb();
		}
	}
	function Kb(a, b) {
		var c = a.stateNode;
		if (null === c) return null;
		var d = Db(c);
		if (null === d) return null;
		c = d[b];
		a: switch (b) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
				a = !d;
				break a;
			default: a = !1;
		}
		if (a) return null;
		if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
		return c;
	}
	var Lb = !1;
	if (ia) try {
		var Mb = {};
		Object.defineProperty(Mb, "passive", { get: function() {
			Lb = !0;
		} });
		window.addEventListener("test", Mb, Mb);
		window.removeEventListener("test", Mb, Mb);
	} catch (a) {
		Lb = !1;
	}
	function Nb(a, b, c, d, e, f, g, h, k) {
		var l = Array.prototype.slice.call(arguments, 3);
		try {
			b.apply(c, l);
		} catch (m) {
			this.onError(m);
		}
	}
	var Ob = !1;
	var Pb = null;
	var Qb = !1;
	var Rb = null;
	var Sb = { onError: function(a) {
		Ob = !0;
		Pb = a;
	} };
	function Tb(a, b, c, d, e, f, g, h, k) {
		Ob = !1;
		Pb = null;
		Nb.apply(Sb, arguments);
	}
	function Ub(a, b, c, d, e, f, g, h, k) {
		Tb.apply(this, arguments);
		if (Ob) {
			if (Ob) {
				var l = Pb;
				Ob = !1;
				Pb = null;
			} else throw Error(p(198));
			Qb || (Qb = !0, Rb = l);
		}
	}
	function Vb(a) {
		var b = a, c = a;
		if (a.alternate) for (; b.return;) b = b.return;
		else {
			a = b;
			do
				b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
			while (a);
		}
		return 3 === b.tag ? c : null;
	}
	function Wb(a) {
		if (13 === a.tag) {
			var b = a.memoizedState;
			null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
			if (null !== b) return b.dehydrated;
		}
		return null;
	}
	function Xb(a) {
		if (Vb(a) !== a) throw Error(p(188));
	}
	function Yb(a) {
		var b = a.alternate;
		if (!b) {
			b = Vb(a);
			if (null === b) throw Error(p(188));
			return b !== a ? null : a;
		}
		for (var c = a, d = b;;) {
			var e = c.return;
			if (null === e) break;
			var f = e.alternate;
			if (null === f) {
				d = e.return;
				if (null !== d) {
					c = d;
					continue;
				}
				break;
			}
			if (e.child === f.child) {
				for (f = e.child; f;) {
					if (f === c) return Xb(e), a;
					if (f === d) return Xb(e), b;
					f = f.sibling;
				}
				throw Error(p(188));
			}
			if (c.return !== d.return) c = e, d = f;
			else {
				for (var g = !1, h = e.child; h;) {
					if (h === c) {
						g = !0;
						c = e;
						d = f;
						break;
					}
					if (h === d) {
						g = !0;
						d = e;
						c = f;
						break;
					}
					h = h.sibling;
				}
				if (!g) {
					for (h = f.child; h;) {
						if (h === c) {
							g = !0;
							c = f;
							d = e;
							break;
						}
						if (h === d) {
							g = !0;
							d = f;
							c = e;
							break;
						}
						h = h.sibling;
					}
					if (!g) throw Error(p(189));
				}
			}
			if (c.alternate !== d) throw Error(p(190));
		}
		if (3 !== c.tag) throw Error(p(188));
		return c.stateNode.current === c ? a : b;
	}
	function Zb(a) {
		a = Yb(a);
		return null !== a ? $b(a) : null;
	}
	function $b(a) {
		if (5 === a.tag || 6 === a.tag) return a;
		for (a = a.child; null !== a;) {
			var b = $b(a);
			if (null !== b) return b;
			a = a.sibling;
		}
		return null;
	}
	var ac = ca.unstable_scheduleCallback;
	var bc = ca.unstable_cancelCallback;
	var cc = ca.unstable_shouldYield;
	var dc = ca.unstable_requestPaint;
	var B = ca.unstable_now;
	var ec = ca.unstable_getCurrentPriorityLevel;
	var fc = ca.unstable_ImmediatePriority;
	var gc = ca.unstable_UserBlockingPriority;
	var hc = ca.unstable_NormalPriority;
	var ic = ca.unstable_LowPriority;
	var jc = ca.unstable_IdlePriority;
	var kc = null;
	var lc = null;
	function mc(a) {
		if (lc && "function" === typeof lc.onCommitFiberRoot) try {
			lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
		} catch (b) {}
	}
	var oc = Math.clz32 ? Math.clz32 : nc;
	var pc = Math.log;
	var qc = Math.LN2;
	function nc(a) {
		a >>>= 0;
		return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
	}
	var rc = 64;
	var sc = 4194304;
	function tc(a) {
		switch (a & -a) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return a & 4194240;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return a & 130023424;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 1073741824;
			default: return a;
		}
	}
	function uc(a, b) {
		var c = a.pendingLanes;
		if (0 === c) return 0;
		var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
		if (0 !== g) {
			var h = g & ~e;
			0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
		} else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
		if (0 === d) return 0;
		if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
		0 !== (d & 4) && (d |= c & 16);
		b = a.entangledLanes;
		if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
		return d;
	}
	function vc(a, b) {
		switch (a) {
			case 1:
			case 2:
			case 4: return b + 250;
			case 8:
			case 16:
			case 32:
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return b + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return -1;
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function wc(a, b) {
		for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {
			var g = 31 - oc(f), h = 1 << g, k = e[g];
			if (-1 === k) {
				if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
			} else k <= b && (a.expiredLanes |= h);
			f &= ~h;
		}
	}
	function xc(a) {
		a = a.pendingLanes & -1073741825;
		return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
	}
	function yc() {
		var a = rc;
		rc <<= 1;
		0 === (rc & 4194240) && (rc = 64);
		return a;
	}
	function zc(a) {
		for (var b = [], c = 0; 31 > c; c++) b.push(a);
		return b;
	}
	function Ac(a, b, c) {
		a.pendingLanes |= b;
		536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
		a = a.eventTimes;
		b = 31 - oc(b);
		a[b] = c;
	}
	function Bc(a, b) {
		var c = a.pendingLanes & ~b;
		a.pendingLanes = b;
		a.suspendedLanes = 0;
		a.pingedLanes = 0;
		a.expiredLanes &= b;
		a.mutableReadLanes &= b;
		a.entangledLanes &= b;
		b = a.entanglements;
		var d = a.eventTimes;
		for (a = a.expirationTimes; 0 < c;) {
			var e = 31 - oc(c), f = 1 << e;
			b[e] = 0;
			d[e] = -1;
			a[e] = -1;
			c &= ~f;
		}
	}
	function Cc(a, b) {
		var c = a.entangledLanes |= b;
		for (a = a.entanglements; c;) {
			var d = 31 - oc(c), e = 1 << d;
			e & b | a[d] & b && (a[d] |= b);
			c &= ~e;
		}
	}
	var C = 0;
	function Dc(a) {
		a &= -a;
		return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
	}
	var Ec;
	var Fc;
	var Gc;
	var Hc;
	var Ic;
	var Jc = !1;
	var Kc = [];
	var Lc = null;
	var Mc = null;
	var Nc = null;
	var Oc = /* @__PURE__ */ new Map();
	var Pc = /* @__PURE__ */ new Map();
	var Qc = [];
	var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function Sc(a, b) {
		switch (a) {
			case "focusin":
			case "focusout":
				Lc = null;
				break;
			case "dragenter":
			case "dragleave":
				Mc = null;
				break;
			case "mouseover":
			case "mouseout":
				Nc = null;
				break;
			case "pointerover":
			case "pointerout":
				Oc.delete(b.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Pc.delete(b.pointerId);
		}
	}
	function Tc(a, b, c, d, e, f) {
		if (null === a || a.nativeEvent !== f) return a = {
			blockedOn: b,
			domEventName: c,
			eventSystemFlags: d,
			nativeEvent: f,
			targetContainers: [e]
		}, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
		a.eventSystemFlags |= d;
		b = a.targetContainers;
		null !== e && -1 === b.indexOf(e) && b.push(e);
		return a;
	}
	function Uc(a, b, c, d, e) {
		switch (b) {
			case "focusin": return Lc = Tc(Lc, a, b, c, d, e), !0;
			case "dragenter": return Mc = Tc(Mc, a, b, c, d, e), !0;
			case "mouseover": return Nc = Tc(Nc, a, b, c, d, e), !0;
			case "pointerover":
				var f = e.pointerId;
				Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
				return !0;
			case "gotpointercapture": return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), !0;
		}
		return !1;
	}
	function Vc(a) {
		var b = Wc(a.target);
		if (null !== b) {
			var c = Vb(b);
			if (null !== c) {
				if (b = c.tag, 13 === b) {
					if (b = Wb(c), null !== b) {
						a.blockedOn = b;
						Ic(a.priority, function() {
							Gc(c);
						});
						return;
					}
				} else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
					a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
					return;
				}
			}
		}
		a.blockedOn = null;
	}
	function Xc(a) {
		if (null !== a.blockedOn) return !1;
		for (var b = a.targetContainers; 0 < b.length;) {
			var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
			if (null === c) {
				c = a.nativeEvent;
				var d = new c.constructor(c.type, c);
				wb = d;
				c.target.dispatchEvent(d);
				wb = null;
			} else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, !1;
			b.shift();
		}
		return !0;
	}
	function Zc(a, b, c) {
		Xc(a) && c.delete(b);
	}
	function $c() {
		Jc = !1;
		null !== Lc && Xc(Lc) && (Lc = null);
		null !== Mc && Xc(Mc) && (Mc = null);
		null !== Nc && Xc(Nc) && (Nc = null);
		Oc.forEach(Zc);
		Pc.forEach(Zc);
	}
	function ad(a, b) {
		a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
	}
	function bd(a) {
		function b(b) {
			return ad(b, a);
		}
		if (0 < Kc.length) {
			ad(Kc[0], a);
			for (var c = 1; c < Kc.length; c++) {
				var d = Kc[c];
				d.blockedOn === a && (d.blockedOn = null);
			}
		}
		null !== Lc && ad(Lc, a);
		null !== Mc && ad(Mc, a);
		null !== Nc && ad(Nc, a);
		Oc.forEach(b);
		Pc.forEach(b);
		for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
		for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn);) Vc(c), null === c.blockedOn && Qc.shift();
	}
	var cd = ua.ReactCurrentBatchConfig;
	var dd = !0;
	function ed(a, b, c, d) {
		var e = C, f = cd.transition;
		cd.transition = null;
		try {
			C = 1, fd(a, b, c, d);
		} finally {
			C = e, cd.transition = f;
		}
	}
	function gd(a, b, c, d) {
		var e = C, f = cd.transition;
		cd.transition = null;
		try {
			C = 4, fd(a, b, c, d);
		} finally {
			C = e, cd.transition = f;
		}
	}
	function fd(a, b, c, d) {
		if (dd) {
			var e = Yc(a, b, c, d);
			if (null === e) hd(a, b, d, id, c), Sc(a, d);
			else if (Uc(e, a, b, c, d)) d.stopPropagation();
			else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
				for (; null !== e;) {
					var f = Cb(e);
					null !== f && Ec(f);
					f = Yc(a, b, c, d);
					null === f && hd(a, b, d, id, c);
					if (f === e) break;
					e = f;
				}
				null !== e && d.stopPropagation();
			} else hd(a, b, d, null, c);
		}
	}
	var id = null;
	function Yc(a, b, c, d) {
		id = null;
		a = xb(d);
		a = Wc(a);
		if (null !== a) if (b = Vb(a), null === b) a = null;
		else if (c = b.tag, 13 === c) {
			a = Wb(b);
			if (null !== a) return a;
			a = null;
		} else if (3 === c) {
			if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
			a = null;
		} else b !== a && (a = null);
		id = a;
		return null;
	}
	function jd(a) {
		switch (a) {
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 1;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "toggle":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 4;
			case "message": switch (ec()) {
				case fc: return 1;
				case gc: return 4;
				case hc:
				case ic: return 16;
				case jc: return 536870912;
				default: return 16;
			}
			default: return 16;
		}
	}
	var kd = null;
	var ld = null;
	var md = null;
	function nd() {
		if (md) return md;
		var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
		for (a = 0; a < c && b[a] === e[a]; a++);
		var g = c - a;
		for (d = 1; d <= g && b[c - d] === e[f - d]; d++);
		return md = e.slice(a, 1 < d ? 1 - d : void 0);
	}
	function od(a) {
		var b = a.keyCode;
		"charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
		10 === a && (a = 13);
		return 32 <= a || 13 === a ? a : 0;
	}
	function pd() {
		return !0;
	}
	function qd() {
		return !1;
	}
	function rd(a) {
		function b(b, d, e, f, g) {
			this._reactName = b;
			this._targetInst = e;
			this.type = d;
			this.nativeEvent = f;
			this.target = g;
			this.currentTarget = null;
			for (var c in a) a.hasOwnProperty(c) && (b = a[c], this[c] = b ? b(f) : f[c]);
			this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;
			this.isPropagationStopped = qd;
			return this;
		}
		A(b.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var a = this.nativeEvent;
				a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = pd);
			},
			stopPropagation: function() {
				var a = this.nativeEvent;
				a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = pd);
			},
			persist: function() {},
			isPersistent: pd
		});
		return b;
	}
	var sd = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(a) {
			return a.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	};
	var td = rd(sd);
	var ud = A({}, sd, {
		view: 0,
		detail: 0
	});
	var vd = rd(ud);
	var wd;
	var xd;
	var yd;
	var Ad = A({}, ud, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: zd,
		button: 0,
		buttons: 0,
		relatedTarget: function(a) {
			return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
		},
		movementX: function(a) {
			if ("movementX" in a) return a.movementX;
			a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
			return wd;
		},
		movementY: function(a) {
			return "movementY" in a ? a.movementY : xd;
		}
	});
	var Bd = rd(Ad);
	var Dd = rd(A({}, Ad, { dataTransfer: 0 }));
	var Fd = rd(A({}, ud, { relatedTarget: 0 }));
	var Hd = rd(A({}, sd, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	}));
	var Jd = rd(A({}, sd, { clipboardData: function(a) {
		return "clipboardData" in a ? a.clipboardData : window.clipboardData;
	} }));
	var Ld = rd(A({}, sd, { data: 0 }));
	var Md = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	};
	var Nd = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	};
	var Od = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Pd(a) {
		var b = this.nativeEvent;
		return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;
	}
	function zd() {
		return Pd;
	}
	var Rd = rd(A({}, ud, {
		key: function(a) {
			if (a.key) {
				var b = Md[a.key] || a.key;
				if ("Unidentified" !== b) return b;
			}
			return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: zd,
		charCode: function(a) {
			return "keypress" === a.type ? od(a) : 0;
		},
		keyCode: function(a) {
			return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
		},
		which: function(a) {
			return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
		}
	}));
	var Td = rd(A({}, Ad, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	}));
	var Vd = rd(A({}, ud, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: zd
	}));
	var Xd = rd(A({}, sd, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	}));
	var Zd = rd(A({}, Ad, {
		deltaX: function(a) {
			return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
		},
		deltaY: function(a) {
			return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	}));
	var $d = [
		9,
		13,
		27,
		32
	];
	var ae = ia && "CompositionEvent" in window;
	var be = null;
	ia && "documentMode" in document && (be = document.documentMode);
	var ce = ia && "TextEvent" in window && !be;
	var de = ia && (!ae || be && 8 < be && 11 >= be);
	var ee = String.fromCharCode(32);
	var fe = !1;
	function ge(a, b) {
		switch (a) {
			case "keyup": return -1 !== $d.indexOf(b.keyCode);
			case "keydown": return 229 !== b.keyCode;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function he(a) {
		a = a.detail;
		return "object" === typeof a && "data" in a ? a.data : null;
	}
	var ie = !1;
	function je(a, b) {
		switch (a) {
			case "compositionend": return he(b);
			case "keypress":
				if (32 !== b.which) return null;
				fe = !0;
				return ee;
			case "textInput": return a = b.data, a === ee && fe ? null : a;
			default: return null;
		}
	}
	function ke(a, b) {
		if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = !1, a) : null;
		switch (a) {
			case "paste": return null;
			case "keypress":
				if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
					if (b.char && 1 < b.char.length) return b.char;
					if (b.which) return String.fromCharCode(b.which);
				}
				return null;
			case "compositionend": return de && "ko" !== b.locale ? null : b.data;
			default: return null;
		}
	}
	var le = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function me(a) {
		var b = a && a.nodeName && a.nodeName.toLowerCase();
		return "input" === b ? !!le[a.type] : "textarea" === b ? !0 : !1;
	}
	function ne(a, b, c, d) {
		Eb(d);
		b = oe(b, "onChange");
		0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({
			event: c,
			listeners: b
		}));
	}
	var pe = null;
	var qe = null;
	function re(a) {
		se(a, 0);
	}
	function te(a) {
		if (Wa(ue(a))) return a;
	}
	function ve(a, b) {
		if ("change" === a) return b;
	}
	var we = !1;
	if (ia) {
		var xe;
		if (ia) {
			var ye = "oninput" in document;
			if (!ye) {
				var ze = document.createElement("div");
				ze.setAttribute("oninput", "return;");
				ye = "function" === typeof ze.oninput;
			}
			xe = ye;
		} else xe = !1;
		we = xe && (!document.documentMode || 9 < document.documentMode);
	}
	function Ae() {
		pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
	}
	function Be(a) {
		if ("value" === a.propertyName && te(qe)) {
			var b = [];
			ne(b, qe, a, xb(a));
			Jb(re, b);
		}
	}
	function Ce(a, b, c) {
		"focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
	}
	function De(a) {
		if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
	}
	function Ee(a, b) {
		if ("click" === a) return te(b);
	}
	function Fe(a, b) {
		if ("input" === a || "change" === a) return te(b);
	}
	function Ge(a, b) {
		return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
	}
	var He = "function" === typeof Object.is ? Object.is : Ge;
	function Ie(a, b) {
		if (He(a, b)) return !0;
		if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
		var c = Object.keys(a), d = Object.keys(b);
		if (c.length !== d.length) return !1;
		for (d = 0; d < c.length; d++) {
			var e = c[d];
			if (!ja.call(b, e) || !He(a[e], b[e])) return !1;
		}
		return !0;
	}
	function Je(a) {
		for (; a && a.firstChild;) a = a.firstChild;
		return a;
	}
	function Ke(a, b) {
		var c = Je(a);
		a = 0;
		for (var d; c;) {
			if (3 === c.nodeType) {
				d = a + c.textContent.length;
				if (a <= b && d >= b) return {
					node: c,
					offset: b - a
				};
				a = d;
			}
			a: {
				for (; c;) {
					if (c.nextSibling) {
						c = c.nextSibling;
						break a;
					}
					c = c.parentNode;
				}
				c = void 0;
			}
			c = Je(c);
		}
	}
	function Le(a, b) {
		return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
	}
	function Me() {
		for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement;) {
			try {
				var c = "string" === typeof b.contentWindow.location.href;
			} catch (d) {
				c = !1;
			}
			if (c) a = b.contentWindow;
			else break;
			b = Xa(a.document);
		}
		return b;
	}
	function Ne(a) {
		var b = a && a.nodeName && a.nodeName.toLowerCase();
		return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
	}
	function Oe(a) {
		var b = Me(), c = a.focusedElem, d = a.selectionRange;
		if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
			if (null !== d && Ne(c)) {
				if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
				else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
					a = a.getSelection();
					var e = c.textContent.length, f = Math.min(d.start, e);
					d = void 0 === d.end ? f : Math.min(d.end, e);
					!a.extend && f > d && (e = d, d = f, f = e);
					e = Ke(c, f);
					var g = Ke(c, d);
					e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
				}
			}
			b = [];
			for (a = c; a = a.parentNode;) 1 === a.nodeType && b.push({
				element: a,
				left: a.scrollLeft,
				top: a.scrollTop
			});
			"function" === typeof c.focus && c.focus();
			for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
		}
	}
	var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
	var Qe = null;
	var Re = null;
	var Se = null;
	var Te = !1;
	function Ue(a, b, c) {
		var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
		Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = {
			start: d.selectionStart,
			end: d.selectionEnd
		} : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {
			anchorNode: d.anchorNode,
			anchorOffset: d.anchorOffset,
			focusNode: d.focusNode,
			focusOffset: d.focusOffset
		}), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({
			event: b,
			listeners: d
		}), b.target = Qe)));
	}
	function Ve(a, b) {
		var c = {};
		c[a.toLowerCase()] = b.toLowerCase();
		c["Webkit" + a] = "webkit" + b;
		c["Moz" + a] = "moz" + b;
		return c;
	}
	var We = {
		animationend: Ve("Animation", "AnimationEnd"),
		animationiteration: Ve("Animation", "AnimationIteration"),
		animationstart: Ve("Animation", "AnimationStart"),
		transitionend: Ve("Transition", "TransitionEnd")
	};
	var Xe = {};
	var Ye = {};
	ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
	function Ze(a) {
		if (Xe[a]) return Xe[a];
		if (!We[a]) return a;
		var b = We[a], c;
		for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
		return a;
	}
	var $e = Ze("animationend");
	var af = Ze("animationiteration");
	var bf = Ze("animationstart");
	var cf = Ze("transitionend");
	var df = /* @__PURE__ */ new Map();
	var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function ff(a, b) {
		df.set(a, b);
		fa(b, [a]);
	}
	for (var gf = 0; gf < ef.length; gf++) {
		var hf = ef[gf];
		ff(hf.toLowerCase(), "on" + (hf[0].toUpperCase() + hf.slice(1)));
	}
	ff($e, "onAnimationEnd");
	ff(af, "onAnimationIteration");
	ff(bf, "onAnimationStart");
	ff("dblclick", "onDoubleClick");
	ff("focusin", "onFocus");
	ff("focusout", "onBlur");
	ff(cf, "onTransitionEnd");
	ha("onMouseEnter", ["mouseout", "mouseover"]);
	ha("onMouseLeave", ["mouseout", "mouseover"]);
	ha("onPointerEnter", ["pointerout", "pointerover"]);
	ha("onPointerLeave", ["pointerout", "pointerover"]);
	fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
	fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
	fa("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]);
	fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
	fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
	fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
	var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
	function nf(a, b, c) {
		var d = a.type || "unknown-event";
		a.currentTarget = c;
		Ub(d, b, void 0, a);
		a.currentTarget = null;
	}
	function se(a, b) {
		b = 0 !== (b & 4);
		for (var c = 0; c < a.length; c++) {
			var d = a[c], e = d.event;
			d = d.listeners;
			a: {
				var f = void 0;
				if (b) for (var g = d.length - 1; 0 <= g; g--) {
					var h = d[g], k = h.instance, l = h.currentTarget;
					h = h.listener;
					if (k !== f && e.isPropagationStopped()) break a;
					nf(e, h, l);
					f = k;
				}
				else for (g = 0; g < d.length; g++) {
					h = d[g];
					k = h.instance;
					l = h.currentTarget;
					h = h.listener;
					if (k !== f && e.isPropagationStopped()) break a;
					nf(e, h, l);
					f = k;
				}
			}
		}
		if (Qb) throw a = Rb, Qb = !1, Rb = null, a;
	}
	function D(a, b) {
		var c = b[of];
		void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
		var d = a + "__bubble";
		c.has(d) || (pf(b, a, 2, !1), c.add(d));
	}
	function qf(a, b, c) {
		var d = 0;
		b && (d |= 4);
		pf(c, a, d, b);
	}
	var rf = "_reactListening" + Math.random().toString(36).slice(2);
	function sf(a) {
		if (!a[rf]) {
			a[rf] = !0;
			da.forEach(function(b) {
				"selectionchange" !== b && (mf.has(b) || qf(b, !1, a), qf(b, !0, a));
			});
			var b = 9 === a.nodeType ? a : a.ownerDocument;
			null === b || b[rf] || (b[rf] = !0, qf("selectionchange", !1, b));
		}
	}
	function pf(a, b, c, d) {
		switch (jd(b)) {
			case 1:
				var e = ed;
				break;
			case 4:
				e = gd;
				break;
			default: e = fd;
		}
		c = e.bind(null, b, c, a);
		e = void 0;
		!Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = !0);
		d ? void 0 !== e ? a.addEventListener(b, c, {
			capture: !0,
			passive: e
		}) : a.addEventListener(b, c, !0) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, !1);
	}
	function hd(a, b, c, d, e) {
		var f = d;
		if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (;;) {
			if (null === d) return;
			var g = d.tag;
			if (3 === g || 4 === g) {
				var h = d.stateNode.containerInfo;
				if (h === e || 8 === h.nodeType && h.parentNode === e) break;
				if (4 === g) for (g = d.return; null !== g;) {
					var k = g.tag;
					if (3 === k || 4 === k) {
						if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
					}
					g = g.return;
				}
				for (; null !== h;) {
					g = Wc(h);
					if (null === g) return;
					k = g.tag;
					if (5 === k || 6 === k) {
						d = f = g;
						continue a;
					}
					h = h.parentNode;
				}
			}
			d = d.return;
		}
		Jb(function() {
			var d = f, e = xb(c), g = [];
			a: {
				var h = df.get(a);
				if (void 0 !== h) {
					var k = td, n = a;
					switch (a) {
						case "keypress": if (0 === od(c)) break a;
						case "keydown":
						case "keyup":
							k = Rd;
							break;
						case "focusin":
							n = "focus";
							k = Fd;
							break;
						case "focusout":
							n = "blur";
							k = Fd;
							break;
						case "beforeblur":
						case "afterblur":
							k = Fd;
							break;
						case "click": if (2 === c.button) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							k = Bd;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							k = Dd;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							k = Vd;
							break;
						case $e:
						case af:
						case bf:
							k = Hd;
							break;
						case cf:
							k = Xd;
							break;
						case "scroll":
							k = vd;
							break;
						case "wheel":
							k = Zd;
							break;
						case "copy":
						case "cut":
						case "paste":
							k = Jd;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup": k = Td;
					}
					var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h ? h + "Capture" : null : h;
					t = [];
					for (var w = d, u; null !== w;) {
						u = w;
						var F = u.stateNode;
						5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
						if (J) break;
						w = w.return;
					}
					0 < t.length && (h = new k(h, n, null, c, e), g.push({
						event: h,
						listeners: t
					}));
				}
			}
			if (0 === (b & 7)) {
				a: {
					h = "mouseover" === a || "pointerover" === a;
					k = "mouseout" === a || "pointerout" === a;
					if (h && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
					if (k || h) {
						h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;
						if (k) {
							if (n = c.relatedTarget || c.toElement, k = d, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
						} else k = null, n = d;
						if (k !== n) {
							t = Bd;
							F = "onMouseLeave";
							x = "onMouseEnter";
							w = "mouse";
							if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
							J = null == k ? h : ue(k);
							u = null == n ? h : ue(n);
							h = new t(F, w + "leave", k, c, e);
							h.target = J;
							h.relatedTarget = u;
							F = null;
							Wc(e) === d && (t = new t(x, w + "enter", n, c, e), t.target = u, t.relatedTarget = J, F = t);
							J = F;
							if (k && n) b: {
								t = k;
								x = n;
								w = 0;
								for (u = t; u; u = vf(u)) w++;
								u = 0;
								for (F = x; F; F = vf(F)) u++;
								for (; 0 < w - u;) t = vf(t), w--;
								for (; 0 < u - w;) x = vf(x), u--;
								for (; w--;) {
									if (t === x || null !== x && t === x.alternate) break b;
									t = vf(t);
									x = vf(x);
								}
								t = null;
							}
							else t = null;
							null !== k && wf(g, h, k, t, !1);
							null !== n && null !== J && wf(g, J, n, t, !0);
						}
					}
				}
				a: {
					h = d ? ue(d) : window;
					k = h.nodeName && h.nodeName.toLowerCase();
					if ("select" === k || "input" === k && "file" === h.type) var na = ve;
					else if (me(h)) if (we) na = Fe;
					else {
						na = De;
						var xa = Ce;
					}
					else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (na = Ee);
					if (na && (na = na(a, d))) {
						ne(g, na, c, e);
						break a;
					}
					xa && xa(a, h, d);
					"focusout" === a && (xa = h._wrapperState) && xa.controlled && "number" === h.type && cb(h, "number", h.value);
				}
				xa = d ? ue(d) : window;
				switch (a) {
					case "focusin":
						if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d, Se = null;
						break;
					case "focusout":
						Se = Re = Qe = null;
						break;
					case "mousedown":
						Te = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Te = !1;
						Ue(g, c, e);
						break;
					case "selectionchange": if (Pe) break;
					case "keydown":
					case "keyup": Ue(g, c, e);
				}
				var $a;
				if (ae) b: {
					switch (a) {
						case "compositionstart":
							var ba = "onCompositionStart";
							break b;
						case "compositionend":
							ba = "onCompositionEnd";
							break b;
						case "compositionupdate":
							ba = "onCompositionUpdate";
							break b;
					}
					ba = void 0;
				}
				else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
				ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), xa = oe(d, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e), g.push({
					event: ba,
					listeners: xa
				}), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
				if ($a = ce ? je(a, c) : ke(a, c)) d = oe(d, "onBeforeInput"), 0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), g.push({
					event: e,
					listeners: d
				}), e.data = $a);
			}
			se(g, b);
		});
	}
	function tf(a, b, c) {
		return {
			instance: a,
			listener: b,
			currentTarget: c
		};
	}
	function oe(a, b) {
		for (var c = b + "Capture", d = []; null !== a;) {
			var e = a, f = e.stateNode;
			5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
			a = a.return;
		}
		return d;
	}
	function vf(a) {
		if (null === a) return null;
		do
			a = a.return;
		while (a && 5 !== a.tag);
		return a ? a : null;
	}
	function wf(a, b, c, d, e) {
		for (var f = b._reactName, g = []; null !== c && c !== d;) {
			var h = c, k = h.alternate, l = h.stateNode;
			if (null !== k && k === d) break;
			5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
			c = c.return;
		}
		0 !== g.length && a.push({
			event: b,
			listeners: g
		});
	}
	var xf = /\r\n?/g;
	var yf = /\u0000|\uFFFD/g;
	function zf(a) {
		return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
	}
	function Af(a, b, c) {
		b = zf(b);
		if (zf(a) !== b && c) throw Error(p(425));
	}
	function Bf() {}
	var Cf = null;
	var Df = null;
	function Ef(a, b) {
		return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
	}
	var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
	var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
	var Hf = "function" === typeof Promise ? Promise : void 0;
	var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
		return Hf.resolve(null).then(a).catch(If);
	} : Ff;
	function If(a) {
		setTimeout(function() {
			throw a;
		});
	}
	function Kf(a, b) {
		var c = b, d = 0;
		do {
			var e = c.nextSibling;
			a.removeChild(c);
			if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
				if (0 === d) {
					a.removeChild(e);
					bd(b);
					return;
				}
				d--;
			} else "$" !== c && "$?" !== c && "$!" !== c || d++;
			c = e;
		} while (c);
		bd(b);
	}
	function Lf(a) {
		for (; null != a; a = a.nextSibling) {
			var b = a.nodeType;
			if (1 === b || 3 === b) break;
			if (8 === b) {
				b = a.data;
				if ("$" === b || "$!" === b || "$?" === b) break;
				if ("/$" === b) return null;
			}
		}
		return a;
	}
	function Mf(a) {
		a = a.previousSibling;
		for (var b = 0; a;) {
			if (8 === a.nodeType) {
				var c = a.data;
				if ("$" === c || "$!" === c || "$?" === c) {
					if (0 === b) return a;
					b--;
				} else "/$" === c && b++;
			}
			a = a.previousSibling;
		}
		return null;
	}
	var Nf = Math.random().toString(36).slice(2);
	var Of = "__reactFiber$" + Nf;
	var Pf = "__reactProps$" + Nf;
	var uf = "__reactContainer$" + Nf;
	var of = "__reactEvents$" + Nf;
	var Qf = "__reactListeners$" + Nf;
	var Rf = "__reactHandles$" + Nf;
	function Wc(a) {
		var b = a[Of];
		if (b) return b;
		for (var c = a.parentNode; c;) {
			if (b = c[uf] || c[Of]) {
				c = b.alternate;
				if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a;) {
					if (c = a[Of]) return c;
					a = Mf(a);
				}
				return b;
			}
			a = c;
			c = a.parentNode;
		}
		return null;
	}
	function Cb(a) {
		a = a[Of] || a[uf];
		return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
	}
	function ue(a) {
		if (5 === a.tag || 6 === a.tag) return a.stateNode;
		throw Error(p(33));
	}
	function Db(a) {
		return a[Pf] || null;
	}
	var Sf = [];
	var Tf = -1;
	function Uf(a) {
		return { current: a };
	}
	function E(a) {
		0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
	}
	function G(a, b) {
		Tf++;
		Sf[Tf] = a.current;
		a.current = b;
	}
	var Vf = {};
	var H = Uf(Vf);
	var Wf = Uf(!1);
	var Xf = Vf;
	function Yf(a, b) {
		var c = a.type.contextTypes;
		if (!c) return Vf;
		var d = a.stateNode;
		if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
		var e = {}, f;
		for (f in c) e[f] = b[f];
		d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
		return e;
	}
	function Zf(a) {
		a = a.childContextTypes;
		return null !== a && void 0 !== a;
	}
	function $f() {
		E(Wf);
		E(H);
	}
	function ag(a, b, c) {
		if (H.current !== Vf) throw Error(p(168));
		G(H, b);
		G(Wf, c);
	}
	function bg(a, b, c) {
		var d = a.stateNode;
		b = b.childContextTypes;
		if ("function" !== typeof d.getChildContext) return c;
		d = d.getChildContext();
		for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
		return A({}, c, d);
	}
	function cg(a) {
		a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
		Xf = H.current;
		G(H, a);
		G(Wf, Wf.current);
		return !0;
	}
	function dg(a, b, c) {
		var d = a.stateNode;
		if (!d) throw Error(p(169));
		c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
		G(Wf, c);
	}
	var eg = null;
	var fg = !1;
	var gg = !1;
	function hg(a) {
		null === eg ? eg = [a] : eg.push(a);
	}
	function ig(a) {
		fg = !0;
		hg(a);
	}
	function jg() {
		if (!gg && null !== eg) {
			gg = !0;
			var a = 0, b = C;
			try {
				var c = eg;
				for (C = 1; a < c.length; a++) {
					var d = c[a];
					do
						d = d(!0);
					while (null !== d);
				}
				eg = null;
				fg = !1;
			} catch (e) {
				throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
			} finally {
				C = b, gg = !1;
			}
		}
		return null;
	}
	var kg = [];
	var lg = 0;
	var mg = null;
	var ng = 0;
	var og = [];
	var pg = 0;
	var qg = null;
	var rg = 1;
	var sg = "";
	function tg(a, b) {
		kg[lg++] = ng;
		kg[lg++] = mg;
		mg = a;
		ng = b;
	}
	function ug(a, b, c) {
		og[pg++] = rg;
		og[pg++] = sg;
		og[pg++] = qg;
		qg = a;
		var d = rg;
		a = sg;
		var e = 32 - oc(d) - 1;
		d &= ~(1 << e);
		c += 1;
		var f = 32 - oc(b) + e;
		if (30 < f) {
			var g = e - e % 5;
			f = (d & (1 << g) - 1).toString(32);
			d >>= g;
			e -= g;
			rg = 1 << 32 - oc(b) + e | c << e | d;
			sg = f + a;
		} else rg = 1 << f | c << e | d, sg = a;
	}
	function vg(a) {
		null !== a.return && (tg(a, 1), ug(a, 1, 0));
	}
	function wg(a) {
		for (; a === mg;) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
		for (; a === qg;) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
	}
	var xg = null;
	var yg = null;
	var I = !1;
	var zg = null;
	function Ag(a, b) {
		var c = Bg(5, null, null, 0);
		c.elementType = "DELETED";
		c.stateNode = b;
		c.return = a;
		b = a.deletions;
		null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
	}
	function Cg(a, b) {
		switch (a.tag) {
			case 5:
				var c = a.type;
				b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
				return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), !0) : !1;
			case 6: return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, !0) : !1;
			case 13: return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? {
				id: rg,
				overflow: sg
			} : null, a.memoizedState = {
				dehydrated: b,
				treeContext: c,
				retryLane: 1073741824
			}, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, !0) : !1;
			default: return !1;
		}
	}
	function Dg(a) {
		return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
	}
	function Eg(a) {
		if (I) {
			var b = yg;
			if (b) {
				var c = b;
				if (!Cg(a, b)) {
					if (Dg(a)) throw Error(p(418));
					b = Lf(c.nextSibling);
					var d = xg;
					b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = !1, xg = a);
				}
			} else {
				if (Dg(a)) throw Error(p(418));
				a.flags = a.flags & -4097 | 2;
				I = !1;
				xg = a;
			}
		}
	}
	function Fg(a) {
		for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;
		xg = a;
	}
	function Gg(a) {
		if (a !== xg) return !1;
		if (!I) return Fg(a), I = !0, !1;
		var b;
		(b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
		if (b && (b = yg)) {
			if (Dg(a)) throw Hg(), Error(p(418));
			for (; b;) Ag(a, b), b = Lf(b.nextSibling);
		}
		Fg(a);
		if (13 === a.tag) {
			a = a.memoizedState;
			a = null !== a ? a.dehydrated : null;
			if (!a) throw Error(p(317));
			a: {
				a = a.nextSibling;
				for (b = 0; a;) {
					if (8 === a.nodeType) {
						var c = a.data;
						if ("/$" === c) {
							if (0 === b) {
								yg = Lf(a.nextSibling);
								break a;
							}
							b--;
						} else "$" !== c && "$!" !== c && "$?" !== c || b++;
					}
					a = a.nextSibling;
				}
				yg = null;
			}
		} else yg = xg ? Lf(a.stateNode.nextSibling) : null;
		return !0;
	}
	function Hg() {
		for (var a = yg; a;) a = Lf(a.nextSibling);
	}
	function Ig() {
		yg = xg = null;
		I = !1;
	}
	function Jg(a) {
		null === zg ? zg = [a] : zg.push(a);
	}
	var Kg = ua.ReactCurrentBatchConfig;
	function Lg(a, b, c) {
		a = c.ref;
		if (null !== a && "function" !== typeof a && "object" !== typeof a) {
			if (c._owner) {
				c = c._owner;
				if (c) {
					if (1 !== c.tag) throw Error(p(309));
					var d = c.stateNode;
				}
				if (!d) throw Error(p(147, a));
				var e = d, f = "" + a;
				if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
				b = function(a) {
					var b = e.refs;
					null === a ? delete b[f] : b[f] = a;
				};
				b._stringRef = f;
				return b;
			}
			if ("string" !== typeof a) throw Error(p(284));
			if (!c._owner) throw Error(p(290, a));
		}
		return a;
	}
	function Mg(a, b) {
		a = Object.prototype.toString.call(b);
		throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
	}
	function Ng(a) {
		var b = a._init;
		return b(a._payload);
	}
	function Og(a) {
		function b(b, c) {
			if (a) {
				var d = b.deletions;
				null === d ? (b.deletions = [c], b.flags |= 16) : d.push(c);
			}
		}
		function c(c, d) {
			if (!a) return null;
			for (; null !== d;) b(c, d), d = d.sibling;
			return null;
		}
		function d(a, b) {
			for (a = /* @__PURE__ */ new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
			return a;
		}
		function e(a, b) {
			a = Pg(a, b);
			a.index = 0;
			a.sibling = null;
			return a;
		}
		function f(b, c, d) {
			b.index = d;
			if (!a) return b.flags |= 1048576, c;
			d = b.alternate;
			if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;
			b.flags |= 2;
			return c;
		}
		function g(b) {
			a && null === b.alternate && (b.flags |= 2);
			return b;
		}
		function h(a, b, c, d) {
			if (null === b || 6 !== b.tag) return b = Qg(c, a.mode, d), b.return = a, b;
			b = e(b, c);
			b.return = a;
			return b;
		}
		function k(a, b, c, d) {
			var f = c.type;
			if (f === ya) return m(a, b, c.props.children, d, c.key);
			if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === Ha && Ng(f) === b.type)) return d = e(b, c.props), d.ref = Lg(a, b, c), d.return = a, d;
			d = Rg(c.type, c.key, c.props, null, a.mode, d);
			d.ref = Lg(a, b, c);
			d.return = a;
			return d;
		}
		function l(a, b, c, d) {
			if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Sg(c, a.mode, d), b.return = a, b;
			b = e(b, c.children || []);
			b.return = a;
			return b;
		}
		function m(a, b, c, d, f) {
			if (null === b || 7 !== b.tag) return b = Tg(c, a.mode, d, f), b.return = a, b;
			b = e(b, c);
			b.return = a;
			return b;
		}
		function q(a, b, c) {
			if ("string" === typeof b && "" !== b || "number" === typeof b) return b = Qg("" + b, a.mode, c), b.return = a, b;
			if ("object" === typeof b && null !== b) {
				switch (b.$$typeof) {
					case va: return c = Rg(b.type, b.key, b.props, null, a.mode, c), c.ref = Lg(a, null, b), c.return = a, c;
					case wa: return b = Sg(b, a.mode, c), b.return = a, b;
					case Ha:
						var d = b._init;
						return q(a, d(b._payload), c);
				}
				if (eb(b) || Ka(b)) return b = Tg(b, a.mode, c, null), b.return = a, b;
				Mg(a, b);
			}
			return null;
		}
		function r(a, b, c, d) {
			var e = null !== b ? b.key : null;
			if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);
			if ("object" === typeof c && null !== c) {
				switch (c.$$typeof) {
					case va: return c.key === e ? k(a, b, c, d) : null;
					case wa: return c.key === e ? l(a, b, c, d) : null;
					case Ha: return e = c._init, r(a, b, e(c._payload), d);
				}
				if (eb(c) || Ka(c)) return null !== e ? null : m(a, b, c, d, null);
				Mg(a, c);
			}
			return null;
		}
		function y(a, b, c, d, e) {
			if ("string" === typeof d && "" !== d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);
			if ("object" === typeof d && null !== d) {
				switch (d.$$typeof) {
					case va: return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
					case wa: return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
					case Ha:
						var f = d._init;
						return y(a, b, c, f(d._payload), e);
				}
				if (eb(d) || Ka(d)) return a = a.get(c) || null, m(b, a, d, e, null);
				Mg(b, d);
			}
			return null;
		}
		function n(e, g, h, k) {
			for (var l = null, m = null, u = g, w = g = 0, x = null; null !== u && w < h.length; w++) {
				u.index > w ? (x = u, u = null) : x = u.sibling;
				var n = r(e, u, h[w], k);
				if (null === n) {
					null === u && (u = x);
					break;
				}
				a && u && null === n.alternate && b(e, u);
				g = f(n, g, w);
				null === m ? l = n : m.sibling = n;
				m = n;
				u = x;
			}
			if (w === h.length) return c(e, u), I && tg(e, w), l;
			if (null === u) {
				for (; w < h.length; w++) u = q(e, h[w], k), null !== u && (g = f(u, g, w), null === m ? l = u : m.sibling = u, m = u);
				I && tg(e, w);
				return l;
			}
			for (u = d(e, u); w < h.length; w++) x = y(u, e, w, h[w], k), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g = f(x, g, w), null === m ? l = x : m.sibling = x, m = x);
			a && u.forEach(function(a) {
				return b(e, a);
			});
			I && tg(e, w);
			return l;
		}
		function t(e, g, h, k) {
			var l = Ka(h);
			if ("function" !== typeof l) throw Error(p(150));
			h = l.call(h);
			if (null == h) throw Error(p(151));
			for (var u = l = null, m = g, w = g = 0, x = null, n = h.next(); null !== m && !n.done; w++, n = h.next()) {
				m.index > w ? (x = m, m = null) : x = m.sibling;
				var t = r(e, m, n.value, k);
				if (null === t) {
					null === m && (m = x);
					break;
				}
				a && m && null === t.alternate && b(e, m);
				g = f(t, g, w);
				null === u ? l = t : u.sibling = t;
				u = t;
				m = x;
			}
			if (n.done) return c(e, m), I && tg(e, w), l;
			if (null === m) {
				for (; !n.done; w++, n = h.next()) n = q(e, n.value, k), null !== n && (g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
				I && tg(e, w);
				return l;
			}
			for (m = d(e, m); !n.done; w++, n = h.next()) n = y(m, e, w, n.value, k), null !== n && (a && null !== n.alternate && m.delete(null === n.key ? w : n.key), g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
			a && m.forEach(function(a) {
				return b(e, a);
			});
			I && tg(e, w);
			return l;
		}
		function J(a, d, f, h) {
			"object" === typeof f && null !== f && f.type === ya && null === f.key && (f = f.props.children);
			if ("object" === typeof f && null !== f) {
				switch (f.$$typeof) {
					case va:
						a: {
							for (var k = f.key, l = d; null !== l;) {
								if (l.key === k) {
									k = f.type;
									if (k === ya) {
										if (7 === l.tag) {
											c(a, l.sibling);
											d = e(l, f.props.children);
											d.return = a;
											a = d;
											break a;
										}
									} else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === Ha && Ng(k) === l.type) {
										c(a, l.sibling);
										d = e(l, f.props);
										d.ref = Lg(a, l, f);
										d.return = a;
										a = d;
										break a;
									}
									c(a, l);
									break;
								} else b(a, l);
								l = l.sibling;
							}
							f.type === ya ? (d = Tg(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Rg(f.type, f.key, f.props, null, a.mode, h), h.ref = Lg(a, d, f), h.return = a, a = h);
						}
						return g(a);
					case wa:
						a: {
							for (l = f.key; null !== d;) {
								if (d.key === l) if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
									c(a, d.sibling);
									d = e(d, f.children || []);
									d.return = a;
									a = d;
									break a;
								} else {
									c(a, d);
									break;
								}
								else b(a, d);
								d = d.sibling;
							}
							d = Sg(f, a.mode, h);
							d.return = a;
							a = d;
						}
						return g(a);
					case Ha: return l = f._init, J(a, d, l(f._payload), h);
				}
				if (eb(f)) return n(a, d, f, h);
				if (Ka(f)) return t(a, d, f, h);
				Mg(a, f);
			}
			return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = Qg(f, a.mode, h), d.return = a, a = d), g(a)) : c(a, d);
		}
		return J;
	}
	var Ug = Og(!0);
	var Vg = Og(!1);
	var Wg = Uf(null);
	var Xg = null;
	var Yg = null;
	var Zg = null;
	function $g() {
		Zg = Yg = Xg = null;
	}
	function ah(a) {
		var b = Wg.current;
		E(Wg);
		a._currentValue = b;
	}
	function bh(a, b, c) {
		for (; null !== a;) {
			var d = a.alternate;
			(a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
			if (a === c) break;
			a = a.return;
		}
	}
	function ch(a, b) {
		Xg = a;
		Zg = Yg = null;
		a = a.dependencies;
		null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = !0), a.firstContext = null);
	}
	function eh(a) {
		var b = a._currentValue;
		if (Zg !== a) if (a = {
			context: a,
			memoizedValue: b,
			next: null
		}, null === Yg) {
			if (null === Xg) throw Error(p(308));
			Yg = a;
			Xg.dependencies = {
				lanes: 0,
				firstContext: a
			};
		} else Yg = Yg.next = a;
		return b;
	}
	var fh = null;
	function gh(a) {
		null === fh ? fh = [a] : fh.push(a);
	}
	function hh(a, b, c, d) {
		var e = b.interleaved;
		null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
		b.interleaved = c;
		return ih(a, d);
	}
	function ih(a, b) {
		a.lanes |= b;
		var c = a.alternate;
		null !== c && (c.lanes |= b);
		c = a;
		for (a = a.return; null !== a;) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
		return 3 === c.tag ? c.stateNode : null;
	}
	var jh = !1;
	function kh(a) {
		a.updateQueue = {
			baseState: a.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				interleaved: null,
				lanes: 0
			},
			effects: null
		};
	}
	function lh(a, b) {
		a = a.updateQueue;
		b.updateQueue === a && (b.updateQueue = {
			baseState: a.baseState,
			firstBaseUpdate: a.firstBaseUpdate,
			lastBaseUpdate: a.lastBaseUpdate,
			shared: a.shared,
			effects: a.effects
		});
	}
	function mh(a, b) {
		return {
			eventTime: a,
			lane: b,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function nh(a, b, c) {
		var d = a.updateQueue;
		if (null === d) return null;
		d = d.shared;
		if (0 !== (K & 2)) {
			var e = d.pending;
			null === e ? b.next = b : (b.next = e.next, e.next = b);
			d.pending = b;
			return ih(a, c);
		}
		e = d.interleaved;
		null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
		d.interleaved = b;
		return ih(a, c);
	}
	function oh(a, b, c) {
		b = b.updateQueue;
		if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
			var d = b.lanes;
			d &= a.pendingLanes;
			c |= d;
			b.lanes = c;
			Cc(a, c);
		}
	}
	function ph(a, b) {
		var c = a.updateQueue, d = a.alternate;
		if (null !== d && (d = d.updateQueue, c === d)) {
			var e = null, f = null;
			c = c.firstBaseUpdate;
			if (null !== c) {
				do {
					var g = {
						eventTime: c.eventTime,
						lane: c.lane,
						tag: c.tag,
						payload: c.payload,
						callback: c.callback,
						next: null
					};
					null === f ? e = f = g : f = f.next = g;
					c = c.next;
				} while (null !== c);
				null === f ? e = f = b : f = f.next = b;
			} else e = f = b;
			c = {
				baseState: d.baseState,
				firstBaseUpdate: e,
				lastBaseUpdate: f,
				shared: d.shared,
				effects: d.effects
			};
			a.updateQueue = c;
			return;
		}
		a = c.lastBaseUpdate;
		null === a ? c.firstBaseUpdate = b : a.next = b;
		c.lastBaseUpdate = b;
	}
	function qh(a, b, c, d) {
		var e = a.updateQueue;
		jh = !1;
		var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
		if (null !== h) {
			e.shared.pending = null;
			var k = h, l = k.next;
			k.next = null;
			null === g ? f = l : g.next = l;
			g = k;
			var m = a.alternate;
			null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
		}
		if (null !== f) {
			var q = e.baseState;
			g = 0;
			m = l = k = null;
			h = f;
			do {
				var r = h.lane, y = h.eventTime;
				if ((d & r) === r) {
					null !== m && (m = m.next = {
						eventTime: y,
						lane: 0,
						tag: h.tag,
						payload: h.payload,
						callback: h.callback,
						next: null
					});
					a: {
						var n = a, t = h;
						r = b;
						y = c;
						switch (t.tag) {
							case 1:
								n = t.payload;
								if ("function" === typeof n) {
									q = n.call(y, q, r);
									break a;
								}
								q = n;
								break a;
							case 3: n.flags = n.flags & -65537 | 128;
							case 0:
								n = t.payload;
								r = "function" === typeof n ? n.call(y, q, r) : n;
								if (null === r || void 0 === r) break a;
								q = A({}, q, r);
								break a;
							case 2: jh = !0;
						}
					}
					null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
				} else y = {
					eventTime: y,
					lane: r,
					tag: h.tag,
					payload: h.payload,
					callback: h.callback,
					next: null
				}, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
				h = h.next;
				if (null === h) if (h = e.shared.pending, null === h) break;
				else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
			} while (1);
			null === m && (k = q);
			e.baseState = k;
			e.firstBaseUpdate = l;
			e.lastBaseUpdate = m;
			b = e.shared.interleaved;
			if (null !== b) {
				e = b;
				do
					g |= e.lane, e = e.next;
				while (e !== b);
			} else null === f && (e.shared.lanes = 0);
			rh |= g;
			a.lanes = g;
			a.memoizedState = q;
		}
	}
	function sh(a, b, c) {
		a = b.effects;
		b.effects = null;
		if (null !== a) for (b = 0; b < a.length; b++) {
			var d = a[b], e = d.callback;
			if (null !== e) {
				d.callback = null;
				d = c;
				if ("function" !== typeof e) throw Error(p(191, e));
				e.call(d);
			}
		}
	}
	var th = {};
	var uh = Uf(th);
	var vh = Uf(th);
	var wh = Uf(th);
	function xh(a) {
		if (a === th) throw Error(p(174));
		return a;
	}
	function yh(a, b) {
		G(wh, b);
		G(vh, a);
		G(uh, th);
		a = b.nodeType;
		switch (a) {
			case 9:
			case 11:
				b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
				break;
			default: a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
		}
		E(uh);
		G(uh, b);
	}
	function zh() {
		E(uh);
		E(vh);
		E(wh);
	}
	function Ah(a) {
		xh(wh.current);
		var b = xh(uh.current);
		var c = lb(b, a.type);
		b !== c && (G(vh, a), G(uh, c));
	}
	function Bh(a) {
		vh.current === a && (E(uh), E(vh));
	}
	var L = Uf(0);
	function Ch(a) {
		for (var b = a; null !== b;) {
			if (13 === b.tag) {
				var c = b.memoizedState;
				if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
			} else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
				if (0 !== (b.flags & 128)) return b;
			} else if (null !== b.child) {
				b.child.return = b;
				b = b.child;
				continue;
			}
			if (b === a) break;
			for (; null === b.sibling;) {
				if (null === b.return || b.return === a) return null;
				b = b.return;
			}
			b.sibling.return = b.return;
			b = b.sibling;
		}
		return null;
	}
	var Dh = [];
	function Eh() {
		for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
		Dh.length = 0;
	}
	var Fh = ua.ReactCurrentDispatcher;
	var Gh = ua.ReactCurrentBatchConfig;
	var Hh = 0;
	var M = null;
	var N = null;
	var O = null;
	var Ih = !1;
	var Jh = !1;
	var Kh = 0;
	var Lh = 0;
	function P() {
		throw Error(p(321));
	}
	function Mh(a, b) {
		if (null === b) return !1;
		for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return !1;
		return !0;
	}
	function Nh(a, b, c, d, e, f) {
		Hh = f;
		M = b;
		b.memoizedState = null;
		b.updateQueue = null;
		b.lanes = 0;
		Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
		a = c(d, e);
		if (Jh) {
			f = 0;
			do {
				Jh = !1;
				Kh = 0;
				if (25 <= f) throw Error(p(301));
				f += 1;
				O = N = null;
				b.updateQueue = null;
				Fh.current = Qh;
				a = c(d, e);
			} while (Jh);
		}
		Fh.current = Rh;
		b = null !== N && null !== N.next;
		Hh = 0;
		O = N = M = null;
		Ih = !1;
		if (b) throw Error(p(300));
		return a;
	}
	function Sh() {
		var a = 0 !== Kh;
		Kh = 0;
		return a;
	}
	function Th() {
		var a = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		null === O ? M.memoizedState = O = a : O = O.next = a;
		return O;
	}
	function Uh() {
		if (null === N) {
			var a = M.alternate;
			a = null !== a ? a.memoizedState : null;
		} else a = N.next;
		var b = null === O ? M.memoizedState : O.next;
		if (null !== b) O = b, N = a;
		else {
			if (null === a) throw Error(p(310));
			N = a;
			a = {
				memoizedState: N.memoizedState,
				baseState: N.baseState,
				baseQueue: N.baseQueue,
				queue: N.queue,
				next: null
			};
			null === O ? M.memoizedState = O = a : O = O.next = a;
		}
		return O;
	}
	function Vh(a, b) {
		return "function" === typeof b ? b(a) : b;
	}
	function Wh(a) {
		var b = Uh(), c = b.queue;
		if (null === c) throw Error(p(311));
		c.lastRenderedReducer = a;
		var d = N, e = d.baseQueue, f = c.pending;
		if (null !== f) {
			if (null !== e) {
				var g = e.next;
				e.next = f.next;
				f.next = g;
			}
			d.baseQueue = e = f;
			c.pending = null;
		}
		if (null !== e) {
			f = e.next;
			d = d.baseState;
			var h = g = null, k = null, l = f;
			do {
				var m = l.lane;
				if ((Hh & m) === m) null !== k && (k = k.next = {
					lane: 0,
					action: l.action,
					hasEagerState: l.hasEagerState,
					eagerState: l.eagerState,
					next: null
				}), d = l.hasEagerState ? l.eagerState : a(d, l.action);
				else {
					var q = {
						lane: m,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					};
					null === k ? (h = k = q, g = d) : k = k.next = q;
					M.lanes |= m;
					rh |= m;
				}
				l = l.next;
			} while (null !== l && l !== f);
			null === k ? g = d : k.next = h;
			He(d, b.memoizedState) || (dh = !0);
			b.memoizedState = d;
			b.baseState = g;
			b.baseQueue = k;
			c.lastRenderedState = d;
		}
		a = c.interleaved;
		if (null !== a) {
			e = a;
			do
				f = e.lane, M.lanes |= f, rh |= f, e = e.next;
			while (e !== a);
		} else null === e && (c.lanes = 0);
		return [b.memoizedState, c.dispatch];
	}
	function Xh(a) {
		var b = Uh(), c = b.queue;
		if (null === c) throw Error(p(311));
		c.lastRenderedReducer = a;
		var d = c.dispatch, e = c.pending, f = b.memoizedState;
		if (null !== e) {
			c.pending = null;
			var g = e = e.next;
			do
				f = a(f, g.action), g = g.next;
			while (g !== e);
			He(f, b.memoizedState) || (dh = !0);
			b.memoizedState = f;
			null === b.baseQueue && (b.baseState = f);
			c.lastRenderedState = f;
		}
		return [f, d];
	}
	function Yh() {}
	function Zh(a, b) {
		var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
		f && (d.memoizedState = e, dh = !0);
		d = d.queue;
		$h(ai.bind(null, c, d, a), [a]);
		if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
			c.flags |= 2048;
			bi(9, ci.bind(null, c, d, e, b), void 0, null);
			if (null === Q) throw Error(p(349));
			0 !== (Hh & 30) || di(c, b, e);
		}
		return e;
	}
	function di(a, b, c) {
		a.flags |= 16384;
		a = {
			getSnapshot: b,
			value: c
		};
		b = M.updateQueue;
		null === b ? (b = {
			lastEffect: null,
			stores: null
		}, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
	}
	function ci(a, b, c, d) {
		b.value = c;
		b.getSnapshot = d;
		ei(b) && fi(a);
	}
	function ai(a, b, c) {
		return c(function() {
			ei(b) && fi(a);
		});
	}
	function ei(a) {
		var b = a.getSnapshot;
		a = a.value;
		try {
			var c = b();
			return !He(a, c);
		} catch (d) {
			return !0;
		}
	}
	function fi(a) {
		var b = ih(a, 1);
		null !== b && gi(b, a, 1, -1);
	}
	function hi(a) {
		var b = Th();
		"function" === typeof a && (a = a());
		b.memoizedState = b.baseState = a;
		a = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Vh,
			lastRenderedState: a
		};
		b.queue = a;
		a = a.dispatch = ii.bind(null, M, a);
		return [b.memoizedState, a];
	}
	function bi(a, b, c, d) {
		a = {
			tag: a,
			create: b,
			destroy: c,
			deps: d,
			next: null
		};
		b = M.updateQueue;
		null === b ? (b = {
			lastEffect: null,
			stores: null
		}, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
		return a;
	}
	function ji() {
		return Uh().memoizedState;
	}
	function ki(a, b, c, d) {
		var e = Th();
		M.flags |= a;
		e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
	}
	function li(a, b, c, d) {
		var e = Uh();
		d = void 0 === d ? null : d;
		var f = void 0;
		if (null !== N) {
			var g = N.memoizedState;
			f = g.destroy;
			if (null !== d && Mh(d, g.deps)) {
				e.memoizedState = bi(b, c, f, d);
				return;
			}
		}
		M.flags |= a;
		e.memoizedState = bi(1 | b, c, f, d);
	}
	function mi(a, b) {
		return ki(8390656, 8, a, b);
	}
	function $h(a, b) {
		return li(2048, 8, a, b);
	}
	function ni(a, b) {
		return li(4, 2, a, b);
	}
	function oi(a, b) {
		return li(4, 4, a, b);
	}
	function pi(a, b) {
		if ("function" === typeof b) return a = a(), b(a), function() {
			b(null);
		};
		if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
			b.current = null;
		};
	}
	function qi(a, b, c) {
		c = null !== c && void 0 !== c ? c.concat([a]) : null;
		return li(4, 4, pi.bind(null, b, a), c);
	}
	function ri() {}
	function si(a, b) {
		var c = Uh();
		b = void 0 === b ? null : b;
		var d = c.memoizedState;
		if (null !== d && null !== b && Mh(b, d[1])) return d[0];
		c.memoizedState = [a, b];
		return a;
	}
	function ti(a, b) {
		var c = Uh();
		b = void 0 === b ? null : b;
		var d = c.memoizedState;
		if (null !== d && null !== b && Mh(b, d[1])) return d[0];
		a = a();
		c.memoizedState = [a, b];
		return a;
	}
	function ui(a, b, c) {
		if (0 === (Hh & 21)) return a.baseState && (a.baseState = !1, dh = !0), a.memoizedState = c;
		He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = !0);
		return b;
	}
	function vi(a, b) {
		var c = C;
		C = 0 !== c && 4 > c ? c : 4;
		a(!0);
		var d = Gh.transition;
		Gh.transition = {};
		try {
			a(!1), b();
		} finally {
			C = c, Gh.transition = d;
		}
	}
	function wi() {
		return Uh().memoizedState;
	}
	function xi(a, b, c) {
		var d = yi(a);
		c = {
			lane: d,
			action: c,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (zi(a)) Ai(b, c);
		else if (c = hh(a, b, c, d), null !== c) {
			var e = R();
			gi(c, a, d, e);
			Bi(c, b, d);
		}
	}
	function ii(a, b, c) {
		var d = yi(a), e = {
			lane: d,
			action: c,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (zi(a)) Ai(b, e);
		else {
			var f = a.alternate;
			if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
				var g = b.lastRenderedState, h = f(g, c);
				e.hasEagerState = !0;
				e.eagerState = h;
				if (He(h, g)) {
					var k = b.interleaved;
					null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
					b.interleaved = e;
					return;
				}
			} catch (l) {}
			c = hh(a, b, e, d);
			null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
		}
	}
	function zi(a) {
		var b = a.alternate;
		return a === M || null !== b && b === M;
	}
	function Ai(a, b) {
		Jh = Ih = !0;
		var c = a.pending;
		null === c ? b.next = b : (b.next = c.next, c.next = b);
		a.pending = b;
	}
	function Bi(a, b, c) {
		if (0 !== (c & 4194240)) {
			var d = b.lanes;
			d &= a.pendingLanes;
			c |= d;
			b.lanes = c;
			Cc(a, c);
		}
	}
	var Rh = {
		readContext: eh,
		useCallback: P,
		useContext: P,
		useEffect: P,
		useImperativeHandle: P,
		useInsertionEffect: P,
		useLayoutEffect: P,
		useMemo: P,
		useReducer: P,
		useRef: P,
		useState: P,
		useDebugValue: P,
		useDeferredValue: P,
		useTransition: P,
		useMutableSource: P,
		useSyncExternalStore: P,
		useId: P,
		unstable_isNewReconciler: !1
	};
	var Oh = {
		readContext: eh,
		useCallback: function(a, b) {
			Th().memoizedState = [a, void 0 === b ? null : b];
			return a;
		},
		useContext: eh,
		useEffect: mi,
		useImperativeHandle: function(a, b, c) {
			c = null !== c && void 0 !== c ? c.concat([a]) : null;
			return ki(4194308, 4, pi.bind(null, b, a), c);
		},
		useLayoutEffect: function(a, b) {
			return ki(4194308, 4, a, b);
		},
		useInsertionEffect: function(a, b) {
			return ki(4, 2, a, b);
		},
		useMemo: function(a, b) {
			var c = Th();
			b = void 0 === b ? null : b;
			a = a();
			c.memoizedState = [a, b];
			return a;
		},
		useReducer: function(a, b, c) {
			var d = Th();
			b = void 0 !== c ? c(b) : b;
			d.memoizedState = d.baseState = b;
			a = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: a,
				lastRenderedState: b
			};
			d.queue = a;
			a = a.dispatch = xi.bind(null, M, a);
			return [d.memoizedState, a];
		},
		useRef: function(a) {
			var b = Th();
			a = { current: a };
			return b.memoizedState = a;
		},
		useState: hi,
		useDebugValue: ri,
		useDeferredValue: function(a) {
			return Th().memoizedState = a;
		},
		useTransition: function() {
			var a = hi(!1), b = a[0];
			a = vi.bind(null, a[1]);
			Th().memoizedState = a;
			return [b, a];
		},
		useMutableSource: function() {},
		useSyncExternalStore: function(a, b, c) {
			var d = M, e = Th();
			if (I) {
				if (void 0 === c) throw Error(p(407));
				c = c();
			} else {
				c = b();
				if (null === Q) throw Error(p(349));
				0 !== (Hh & 30) || di(d, b, c);
			}
			e.memoizedState = c;
			var f = {
				value: c,
				getSnapshot: b
			};
			e.queue = f;
			mi(ai.bind(null, d, f, a), [a]);
			d.flags |= 2048;
			bi(9, ci.bind(null, d, f, c, b), void 0, null);
			return c;
		},
		useId: function() {
			var a = Th(), b = Q.identifierPrefix;
			if (I) {
				var c = sg;
				var d = rg;
				c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
				b = ":" + b + "R" + c;
				c = Kh++;
				0 < c && (b += "H" + c.toString(32));
				b += ":";
			} else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
			return a.memoizedState = b;
		},
		unstable_isNewReconciler: !1
	};
	var Ph = {
		readContext: eh,
		useCallback: si,
		useContext: eh,
		useEffect: $h,
		useImperativeHandle: qi,
		useInsertionEffect: ni,
		useLayoutEffect: oi,
		useMemo: ti,
		useReducer: Wh,
		useRef: ji,
		useState: function() {
			return Wh(Vh);
		},
		useDebugValue: ri,
		useDeferredValue: function(a) {
			return ui(Uh(), N.memoizedState, a);
		},
		useTransition: function() {
			return [Wh(Vh)[0], Uh().memoizedState];
		},
		useMutableSource: Yh,
		useSyncExternalStore: Zh,
		useId: wi,
		unstable_isNewReconciler: !1
	};
	var Qh = {
		readContext: eh,
		useCallback: si,
		useContext: eh,
		useEffect: $h,
		useImperativeHandle: qi,
		useInsertionEffect: ni,
		useLayoutEffect: oi,
		useMemo: ti,
		useReducer: Xh,
		useRef: ji,
		useState: function() {
			return Xh(Vh);
		},
		useDebugValue: ri,
		useDeferredValue: function(a) {
			var b = Uh();
			return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
		},
		useTransition: function() {
			return [Xh(Vh)[0], Uh().memoizedState];
		},
		useMutableSource: Yh,
		useSyncExternalStore: Zh,
		useId: wi,
		unstable_isNewReconciler: !1
	};
	function Ci(a, b) {
		if (a && a.defaultProps) {
			b = A({}, b);
			a = a.defaultProps;
			for (var c in a) void 0 === b[c] && (b[c] = a[c]);
			return b;
		}
		return b;
	}
	function Di(a, b, c, d) {
		b = a.memoizedState;
		c = c(d, b);
		c = null === c || void 0 === c ? b : A({}, b, c);
		a.memoizedState = c;
		0 === a.lanes && (a.updateQueue.baseState = c);
	}
	var Ei = {
		isMounted: function(a) {
			return (a = a._reactInternals) ? Vb(a) === a : !1;
		},
		enqueueSetState: function(a, b, c) {
			a = a._reactInternals;
			var d = R(), e = yi(a), f = mh(d, e);
			f.payload = b;
			void 0 !== c && null !== c && (f.callback = c);
			b = nh(a, f, e);
			null !== b && (gi(b, a, e, d), oh(b, a, e));
		},
		enqueueReplaceState: function(a, b, c) {
			a = a._reactInternals;
			var d = R(), e = yi(a), f = mh(d, e);
			f.tag = 1;
			f.payload = b;
			void 0 !== c && null !== c && (f.callback = c);
			b = nh(a, f, e);
			null !== b && (gi(b, a, e, d), oh(b, a, e));
		},
		enqueueForceUpdate: function(a, b) {
			a = a._reactInternals;
			var c = R(), d = yi(a), e = mh(c, d);
			e.tag = 2;
			void 0 !== b && null !== b && (e.callback = b);
			b = nh(a, e, d);
			null !== b && (gi(b, a, d, c), oh(b, a, d));
		}
	};
	function Fi(a, b, c, d, e, f, g) {
		a = a.stateNode;
		return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : !0;
	}
	function Gi(a, b, c) {
		var d = !1, e = Vf;
		var f = b.contextType;
		"object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
		b = new b(c, f);
		a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
		b.updater = Ei;
		a.stateNode = b;
		b._reactInternals = a;
		d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
		return b;
	}
	function Hi(a, b, c, d) {
		a = b.state;
		"function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
		"function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
		b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
	}
	function Ii(a, b, c, d) {
		var e = a.stateNode;
		e.props = c;
		e.state = a.memoizedState;
		e.refs = {};
		kh(a);
		var f = b.contextType;
		"object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
		e.state = a.memoizedState;
		f = b.getDerivedStateFromProps;
		"function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
		"function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
		"function" === typeof e.componentDidMount && (a.flags |= 4194308);
	}
	function Ji(a, b) {
		try {
			var c = "", d = b;
			do
				c += Pa(d), d = d.return;
			while (d);
			var e = c;
		} catch (f) {
			e = "\nError generating stack: " + f.message + "\n" + f.stack;
		}
		return {
			value: a,
			source: b,
			stack: e,
			digest: null
		};
	}
	function Ki(a, b, c) {
		return {
			value: a,
			source: null,
			stack: null != c ? c : null,
			digest: null != b ? b : null
		};
	}
	function Li(a, b) {
		try {
			console.error(b.value);
		} catch (c) {
			setTimeout(function() {
				throw c;
			});
		}
	}
	var Mi = "function" === typeof WeakMap ? WeakMap : Map;
	function Ni(a, b, c) {
		c = mh(-1, c);
		c.tag = 3;
		c.payload = { element: null };
		var d = b.value;
		c.callback = function() {
			Oi || (Oi = !0, Pi = d);
			Li(a, b);
		};
		return c;
	}
	function Qi(a, b, c) {
		c = mh(-1, c);
		c.tag = 3;
		var d = a.type.getDerivedStateFromError;
		if ("function" === typeof d) {
			var e = b.value;
			c.payload = function() {
				return d(e);
			};
			c.callback = function() {
				Li(a, b);
			};
		}
		var f = a.stateNode;
		null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
			Li(a, b);
			"function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
			var c = b.stack;
			this.componentDidCatch(b.value, { componentStack: null !== c ? c : "" });
		});
		return c;
	}
	function Si(a, b, c) {
		var d = a.pingCache;
		if (null === d) {
			d = a.pingCache = new Mi();
			var e = /* @__PURE__ */ new Set();
			d.set(b, e);
		} else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
		e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
	}
	function Ui(a) {
		do {
			var b;
			if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
			if (b) return a;
			a = a.return;
		} while (null !== a);
		return null;
	}
	function Vi(a, b, c, d, e) {
		if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
		a.flags |= 65536;
		a.lanes = e;
		return a;
	}
	var Wi = ua.ReactCurrentOwner;
	var dh = !1;
	function Xi(a, b, c, d) {
		b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
	}
	function Yi(a, b, c, d, e) {
		c = c.render;
		var f = b.ref;
		ch(b, e);
		d = Nh(a, b, c, d, f, e);
		c = Sh();
		if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
		I && c && vg(b);
		b.flags |= 1;
		Xi(a, b, d, e);
		return b.child;
	}
	function $i(a, b, c, d, e) {
		if (null === a) {
			var f = c.type;
			if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
			a = Rg(c.type, null, d, b, b.mode, e);
			a.ref = b.ref;
			a.return = b;
			return b.child = a;
		}
		f = a.child;
		if (0 === (a.lanes & e)) {
			var g = f.memoizedProps;
			c = c.compare;
			c = null !== c ? c : Ie;
			if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
		}
		b.flags |= 1;
		a = Pg(f, d);
		a.ref = b.ref;
		a.return = b;
		return b.child = a;
	}
	function bj(a, b, c, d, e) {
		if (null !== a) {
			var f = a.memoizedProps;
			if (Ie(f, d) && a.ref === b.ref) if (dh = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = !0);
			else return b.lanes = a.lanes, Zi(a, b, e);
		}
		return cj(a, b, c, d, e);
	}
	function dj(a, b, c) {
		var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
		if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = {
			baseLanes: 0,
			cachePool: null,
			transitions: null
		}, G(ej, fj), fj |= c;
		else {
			if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
				baseLanes: a,
				cachePool: null,
				transitions: null
			}, b.updateQueue = null, G(ej, fj), fj |= a, null;
			b.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			};
			d = null !== f ? f.baseLanes : c;
			G(ej, fj);
			fj |= d;
		}
		else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
		Xi(a, b, e, c);
		return b.child;
	}
	function gj(a, b) {
		var c = b.ref;
		if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
	}
	function cj(a, b, c, d, e) {
		var f = Zf(c) ? Xf : H.current;
		f = Yf(b, f);
		ch(b, e);
		c = Nh(a, b, c, d, f, e);
		d = Sh();
		if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
		I && d && vg(b);
		b.flags |= 1;
		Xi(a, b, c, e);
		return b.child;
	}
	function hj(a, b, c, d, e) {
		if (Zf(c)) {
			var f = !0;
			cg(b);
		} else f = !1;
		ch(b, e);
		if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = !0;
		else if (null === a) {
			var g = b.stateNode, h = b.memoizedProps;
			g.props = h;
			var k = g.context, l = c.contextType;
			"object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
			var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
			q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
			jh = !1;
			var r = b.memoizedState;
			g.state = r;
			qh(b, d, g, e);
			k = b.memoizedState;
			h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
		} else {
			g = b.stateNode;
			lh(a, b);
			h = b.memoizedProps;
			l = b.type === b.elementType ? h : Ci(b.type, h);
			g.props = l;
			q = b.pendingProps;
			r = g.context;
			k = c.contextType;
			"object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
			var y = c.getDerivedStateFromProps;
			(m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
			jh = !1;
			r = b.memoizedState;
			g.state = r;
			qh(b, d, g, e);
			var n = b.memoizedState;
			h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || !1) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = !1);
		}
		return jj(a, b, c, d, f, e);
	}
	function jj(a, b, c, d, e, f) {
		gj(a, b);
		var g = 0 !== (b.flags & 128);
		if (!d && !g) return e && dg(b, c, !1), Zi(a, b, f);
		d = b.stateNode;
		Wi.current = b;
		var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
		b.flags |= 1;
		null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
		b.memoizedState = d.state;
		e && dg(b, c, !0);
		return b.child;
	}
	function kj(a) {
		var b = a.stateNode;
		b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, !1);
		yh(a, b.containerInfo);
	}
	function lj(a, b, c, d, e) {
		Ig();
		Jg(e);
		b.flags |= 256;
		Xi(a, b, c, d);
		return b.child;
	}
	var mj = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function nj(a) {
		return {
			baseLanes: a,
			cachePool: null,
			transitions: null
		};
	}
	function oj(a, b, c) {
		var d = b.pendingProps, e = L.current, f = !1, g = 0 !== (b.flags & 128), h;
		(h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
		if (h) f = !0, b.flags &= -129;
		else if (null === a || null !== a.memoizedState) e |= 1;
		G(L, e & 1);
		if (null === a) {
			Eg(b);
			a = b.memoizedState;
			if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
			g = d.children;
			a = d.fallback;
			return f ? (d = b.mode, f = b.child, g = {
				mode: "hidden",
				children: g
			}, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
		}
		e = a.memoizedState;
		if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
		if (f) {
			f = d.fallback;
			g = b.mode;
			e = a.child;
			h = e.sibling;
			var k = {
				mode: "hidden",
				children: d.children
			};
			0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
			null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
			f.return = b;
			d.return = b;
			d.sibling = f;
			b.child = d;
			d = f;
			f = b.child;
			g = a.child.memoizedState;
			g = null === g ? nj(c) : {
				baseLanes: g.baseLanes | c,
				cachePool: null,
				transitions: g.transitions
			};
			f.memoizedState = g;
			f.childLanes = a.childLanes & ~c;
			b.memoizedState = mj;
			return d;
		}
		f = a.child;
		a = f.sibling;
		d = Pg(f, {
			mode: "visible",
			children: d.children
		});
		0 === (b.mode & 1) && (d.lanes = c);
		d.return = b;
		d.sibling = null;
		null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
		b.child = d;
		b.memoizedState = null;
		return d;
	}
	function qj(a, b) {
		b = pj({
			mode: "visible",
			children: b
		}, a.mode, 0, null);
		b.return = a;
		return a.child = b;
	}
	function sj(a, b, c, d) {
		null !== d && Jg(d);
		Ug(b, a.child, null, c);
		a = qj(b, b.pendingProps.children);
		a.flags |= 2;
		b.memoizedState = null;
		return a;
	}
	function rj(a, b, c, d, e, f, g) {
		if (c) {
			if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
			if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
			f = d.fallback;
			e = b.mode;
			d = pj({
				mode: "visible",
				children: d.children
			}, e, 0, null);
			f = Tg(f, e, g, null);
			f.flags |= 2;
			d.return = b;
			f.return = b;
			d.sibling = f;
			b.child = d;
			0 !== (b.mode & 1) && Ug(b, a.child, null, g);
			b.child.memoizedState = nj(g);
			b.memoizedState = mj;
			return f;
		}
		if (0 === (b.mode & 1)) return sj(a, b, g, null);
		if ("$!" === e.data) {
			d = e.nextSibling && e.nextSibling.dataset;
			if (d) var h = d.dgst;
			d = h;
			f = Error(p(419));
			d = Ki(f, d, void 0);
			return sj(a, b, g, d);
		}
		h = 0 !== (g & a.childLanes);
		if (dh || h) {
			d = Q;
			if (null !== d) {
				switch (g & -g) {
					case 4:
						e = 2;
						break;
					case 16:
						e = 8;
						break;
					case 64:
					case 128:
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152:
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432:
					case 67108864:
						e = 32;
						break;
					case 536870912:
						e = 268435456;
						break;
					default: e = 0;
				}
				e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
				0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
			}
			tj();
			d = Ki(Error(p(421)));
			return sj(a, b, g, d);
		}
		if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
		a = f.treeContext;
		yg = Lf(e.nextSibling);
		xg = b;
		I = !0;
		zg = null;
		null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
		b = qj(b, d.children);
		b.flags |= 4096;
		return b;
	}
	function vj(a, b, c) {
		a.lanes |= b;
		var d = a.alternate;
		null !== d && (d.lanes |= b);
		bh(a.return, b, c);
	}
	function wj(a, b, c, d, e) {
		var f = a.memoizedState;
		null === f ? a.memoizedState = {
			isBackwards: b,
			rendering: null,
			renderingStartTime: 0,
			last: d,
			tail: c,
			tailMode: e
		} : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
	}
	function xj(a, b, c) {
		var d = b.pendingProps, e = d.revealOrder, f = d.tail;
		Xi(a, b, d.children, c);
		d = L.current;
		if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
		else {
			if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
				if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
				else if (19 === a.tag) vj(a, c, b);
				else if (null !== a.child) {
					a.child.return = a;
					a = a.child;
					continue;
				}
				if (a === b) break a;
				for (; null === a.sibling;) {
					if (null === a.return || a.return === b) break a;
					a = a.return;
				}
				a.sibling.return = a.return;
				a = a.sibling;
			}
			d &= 1;
		}
		G(L, d);
		if (0 === (b.mode & 1)) b.memoizedState = null;
		else switch (e) {
			case "forwards":
				c = b.child;
				for (e = null; null !== c;) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
				c = e;
				null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
				wj(b, !1, e, c, f);
				break;
			case "backwards":
				c = null;
				e = b.child;
				for (b.child = null; null !== e;) {
					a = e.alternate;
					if (null !== a && null === Ch(a)) {
						b.child = e;
						break;
					}
					a = e.sibling;
					e.sibling = c;
					c = e;
					e = a;
				}
				wj(b, !0, c, null, f);
				break;
			case "together":
				wj(b, !1, null, null, void 0);
				break;
			default: b.memoizedState = null;
		}
		return b.child;
	}
	function ij(a, b) {
		0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
	}
	function Zi(a, b, c) {
		null !== a && (b.dependencies = a.dependencies);
		rh |= b.lanes;
		if (0 === (c & b.childLanes)) return null;
		if (null !== a && b.child !== a.child) throw Error(p(153));
		if (null !== b.child) {
			a = b.child;
			c = Pg(a, a.pendingProps);
			b.child = c;
			for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
			c.sibling = null;
		}
		return b.child;
	}
	function yj(a, b, c) {
		switch (b.tag) {
			case 3:
				kj(b);
				Ig();
				break;
			case 5:
				Ah(b);
				break;
			case 1:
				Zf(b.type) && cg(b);
				break;
			case 4:
				yh(b, b.stateNode.containerInfo);
				break;
			case 10:
				var d = b.type._context, e = b.memoizedProps.value;
				G(Wg, d._currentValue);
				d._currentValue = e;
				break;
			case 13:
				d = b.memoizedState;
				if (null !== d) {
					if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
					if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
					G(L, L.current & 1);
					a = Zi(a, b, c);
					return null !== a ? a.sibling : null;
				}
				G(L, L.current & 1);
				break;
			case 19:
				d = 0 !== (c & b.childLanes);
				if (0 !== (a.flags & 128)) {
					if (d) return xj(a, b, c);
					b.flags |= 128;
				}
				e = b.memoizedState;
				null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
				G(L, L.current);
				if (d) break;
				else return null;
			case 22:
			case 23: return b.lanes = 0, dj(a, b, c);
		}
		return Zi(a, b, c);
	}
	var zj = function(a, b) {
		for (var c = b.child; null !== c;) {
			if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
			else if (4 !== c.tag && null !== c.child) {
				c.child.return = c;
				c = c.child;
				continue;
			}
			if (c === b) break;
			for (; null === c.sibling;) {
				if (null === c.return || c.return === b) return;
				c = c.return;
			}
			c.sibling.return = c.return;
			c = c.sibling;
		}
	};
	var Bj = function(a, b, c, d) {
		var e = a.memoizedProps;
		if (e !== d) {
			a = b.stateNode;
			xh(uh.current);
			var f = null;
			switch (c) {
				case "input":
					e = Ya(a, e);
					d = Ya(a, d);
					f = [];
					break;
				case "select":
					e = A({}, e, { value: void 0 });
					d = A({}, d, { value: void 0 });
					f = [];
					break;
				case "textarea":
					e = gb(a, e);
					d = gb(a, d);
					f = [];
					break;
				default: "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
			}
			ub(c, d);
			var g;
			c = null;
			for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
				var h = e[l];
				for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
			} else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
			for (l in d) {
				var k = d[l];
				h = null != e ? e[l] : void 0;
				if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
					for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
					for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
				} else c || (f || (f = []), f.push(l, c)), c = k;
				else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
			}
			c && (f = f || []).push("style", c);
			var l = f;
			if (b.updateQueue = l) b.flags |= 4;
		}
	};
	var Cj = function(a, b, c, d) {
		c !== d && (b.flags |= 4);
	};
	function Dj(a, b) {
		if (!I) switch (a.tailMode) {
			case "hidden":
				b = a.tail;
				for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;
				null === c ? a.tail = null : c.sibling = null;
				break;
			case "collapsed":
				c = a.tail;
				for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;
				null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
		}
	}
	function S(a) {
		var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
		if (b) for (var e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
		else for (e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
		a.subtreeFlags |= d;
		a.childLanes = c;
		return b;
	}
	function Ej(a, b, c) {
		var d = b.pendingProps;
		wg(b);
		switch (b.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return S(b), null;
			case 1: return Zf(b.type) && $f(), S(b), null;
			case 3:
				d = b.stateNode;
				zh();
				E(Wf);
				E(H);
				Eh();
				d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
				if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
				S(b);
				return null;
			case 5:
				Bh(b);
				var e = xh(wh.current);
				c = b.type;
				if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
				else {
					if (!d) {
						if (null === b.stateNode) throw Error(p(166));
						S(b);
						return null;
					}
					a = xh(uh.current);
					if (Gg(b)) {
						d = b.stateNode;
						c = b.type;
						var f = b.memoizedProps;
						d[Of] = b;
						d[Pf] = f;
						a = 0 !== (b.mode & 1);
						switch (c) {
							case "dialog":
								D("cancel", d);
								D("close", d);
								break;
							case "iframe":
							case "object":
							case "embed":
								D("load", d);
								break;
							case "video":
							case "audio":
								for (e = 0; e < lf.length; e++) D(lf[e], d);
								break;
							case "source":
								D("error", d);
								break;
							case "img":
							case "image":
							case "link":
								D("error", d);
								D("load", d);
								break;
							case "details":
								D("toggle", d);
								break;
							case "input":
								Za(d, f);
								D("invalid", d);
								break;
							case "select":
								d._wrapperState = { wasMultiple: !!f.multiple };
								D("invalid", d);
								break;
							case "textarea": hb(d, f), D("invalid", d);
						}
						ub(c, f);
						e = null;
						for (var g in f) if (f.hasOwnProperty(g)) {
							var h = f[g];
							"children" === g ? "string" === typeof h ? d.textContent !== h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
						}
						switch (c) {
							case "input":
								Va(d);
								db(d, f, !0);
								break;
							case "textarea":
								Va(d);
								jb(d);
								break;
							case "select":
							case "option": break;
							default: "function" === typeof f.onClick && (d.onclick = Bf);
						}
						d = e;
						b.updateQueue = d;
						null !== d && (b.flags |= 4);
					} else {
						g = 9 === e.nodeType ? e : e.ownerDocument;
						"http://www.w3.org/1999/xhtml" === a && (a = kb(c));
						"http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
						a[Of] = b;
						a[Pf] = d;
						zj(a, b, !1, !1);
						b.stateNode = a;
						a: {
							g = vb(c, d);
							switch (c) {
								case "dialog":
									D("cancel", a);
									D("close", a);
									e = d;
									break;
								case "iframe":
								case "object":
								case "embed":
									D("load", a);
									e = d;
									break;
								case "video":
								case "audio":
									for (e = 0; e < lf.length; e++) D(lf[e], a);
									e = d;
									break;
								case "source":
									D("error", a);
									e = d;
									break;
								case "img":
								case "image":
								case "link":
									D("error", a);
									D("load", a);
									e = d;
									break;
								case "details":
									D("toggle", a);
									e = d;
									break;
								case "input":
									Za(a, d);
									e = Ya(a, d);
									D("invalid", a);
									break;
								case "option":
									e = d;
									break;
								case "select":
									a._wrapperState = { wasMultiple: !!d.multiple };
									e = A({}, d, { value: void 0 });
									D("invalid", a);
									break;
								case "textarea":
									hb(a, d);
									e = gb(a, d);
									D("invalid", a);
									break;
								default: e = d;
							}
							ub(c, e);
							h = e;
							for (f in h) if (h.hasOwnProperty(f)) {
								var k = h[f];
								"style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
							}
							switch (c) {
								case "input":
									Va(a);
									db(a, d, !1);
									break;
								case "textarea":
									Va(a);
									jb(a);
									break;
								case "option":
									null != d.value && a.setAttribute("value", "" + Sa(d.value));
									break;
								case "select":
									a.multiple = !!d.multiple;
									f = d.value;
									null != f ? fb(a, !!d.multiple, f, !1) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, !0);
									break;
								default: "function" === typeof e.onClick && (a.onclick = Bf);
							}
							switch (c) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									d = !!d.autoFocus;
									break a;
								case "img":
									d = !0;
									break a;
								default: d = !1;
							}
						}
						d && (b.flags |= 4);
					}
					null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
				}
				S(b);
				return null;
			case 6:
				if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
				else {
					if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
					c = xh(wh.current);
					xh(uh.current);
					if (Gg(b)) {
						d = b.stateNode;
						c = b.memoizedProps;
						d[Of] = b;
						if (f = d.nodeValue !== c) {
							if (a = xg, null !== a) switch (a.tag) {
								case 3:
									Af(d.nodeValue, c, 0 !== (a.mode & 1));
									break;
								case 5: !0 !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
							}
						}
						f && (b.flags |= 4);
					} else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
				}
				S(b);
				return null;
			case 13:
				E(L);
				d = b.memoizedState;
				if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
					if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = !1;
					else if (f = Gg(b), null !== d && null !== d.dehydrated) {
						if (null === a) {
							if (!f) throw Error(p(318));
							f = b.memoizedState;
							f = null !== f ? f.dehydrated : null;
							if (!f) throw Error(p(317));
							f[Of] = b;
						} else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
						S(b);
						f = !1;
					} else null !== zg && (Fj(zg), zg = null), f = !0;
					if (!f) return b.flags & 65536 ? b : null;
				}
				if (0 !== (b.flags & 128)) return b.lanes = c, b;
				d = null !== d;
				d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
				null !== b.updateQueue && (b.flags |= 4);
				S(b);
				return null;
			case 4: return zh(), null === a && sf(b.stateNode.containerInfo), S(b), null;
			case 10: return ah(b.type._context), S(b), null;
			case 17: return Zf(b.type) && $f(), S(b), null;
			case 19:
				E(L);
				f = b.memoizedState;
				if (null === f) return S(b), null;
				d = 0 !== (b.flags & 128);
				g = f.rendering;
				if (null === g) if (d) Dj(f, !1);
				else {
					if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
						g = Ch(a);
						if (null !== g) {
							b.flags |= 128;
							Dj(f, !1);
							d = g.updateQueue;
							null !== d && (b.updateQueue = d, b.flags |= 4);
							b.subtreeFlags = 0;
							d = c;
							for (c = b.child; null !== c;) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : {
								lanes: a.lanes,
								firstContext: a.firstContext
							}), c = c.sibling;
							G(L, L.current & 1 | 2);
							return b.child;
						}
						a = a.sibling;
					}
					null !== f.tail && B() > Gj && (b.flags |= 128, d = !0, Dj(f, !1), b.lanes = 4194304);
				}
				else {
					if (!d) if (a = Ch(g), null !== a) {
						if (b.flags |= 128, d = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, !0), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
					} else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = !0, Dj(f, !1), b.lanes = 4194304);
					f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
				}
				if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
				S(b);
				return null;
			case 22:
			case 23: return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
			case 24: return null;
			case 25: return null;
		}
		throw Error(p(156, b.tag));
	}
	function Ij(a, b) {
		wg(b);
		switch (b.tag) {
			case 1: return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
			case 3: return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
			case 5: return Bh(b), null;
			case 13:
				E(L);
				a = b.memoizedState;
				if (null !== a && null !== a.dehydrated) {
					if (null === b.alternate) throw Error(p(340));
					Ig();
				}
				a = b.flags;
				return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
			case 19: return E(L), null;
			case 4: return zh(), null;
			case 10: return ah(b.type._context), null;
			case 22:
			case 23: return Hj(), null;
			case 24: return null;
			default: return null;
		}
	}
	var Jj = !1;
	var U = !1;
	var Kj = "function" === typeof WeakSet ? WeakSet : Set;
	var V = null;
	function Lj(a, b) {
		var c = a.ref;
		if (null !== c) if ("function" === typeof c) try {
			c(null);
		} catch (d) {
			W(a, b, d);
		}
		else c.current = null;
	}
	function Mj(a, b, c) {
		try {
			c();
		} catch (d) {
			W(a, b, d);
		}
	}
	var Nj = !1;
	function Oj(a, b) {
		Cf = dd;
		a = Me();
		if (Ne(a)) {
			if ("selectionStart" in a) var c = {
				start: a.selectionStart,
				end: a.selectionEnd
			};
			else a: {
				c = (c = a.ownerDocument) && c.defaultView || window;
				var d = c.getSelection && c.getSelection();
				if (d && 0 !== d.rangeCount) {
					c = d.anchorNode;
					var e = d.anchorOffset, f = d.focusNode;
					d = d.focusOffset;
					try {
						c.nodeType, f.nodeType;
					} catch (F) {
						c = null;
						break a;
					}
					var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
					b: for (;;) {
						for (var y;;) {
							q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
							q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
							3 === q.nodeType && (g += q.nodeValue.length);
							if (null === (y = q.firstChild)) break;
							r = q;
							q = y;
						}
						for (;;) {
							if (q === a) break b;
							r === c && ++l === e && (h = g);
							r === f && ++m === d && (k = g);
							if (null !== (y = q.nextSibling)) break;
							q = r;
							r = q.parentNode;
						}
						q = y;
					}
					c = -1 === h || -1 === k ? null : {
						start: h,
						end: k
					};
				} else c = null;
			}
			c = c || {
				start: 0,
				end: 0
			};
		} else c = null;
		Df = {
			focusedElem: a,
			selectionRange: c
		};
		dd = !1;
		for (V = b; null !== V;) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
		else for (; null !== V;) {
			b = V;
			try {
				var n = b.alternate;
				if (0 !== (b.flags & 1024)) switch (b.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (null !== n) {
							var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode;
							x.__reactInternalSnapshotBeforeUpdate = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
						}
						break;
					case 3:
						var u = b.stateNode.containerInfo;
						1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
						break;
					case 5:
					case 6:
					case 4:
					case 17: break;
					default: throw Error(p(163));
				}
			} catch (F) {
				W(b, b.return, F);
			}
			a = b.sibling;
			if (null !== a) {
				a.return = b.return;
				V = a;
				break;
			}
			V = b.return;
		}
		n = Nj;
		Nj = !1;
		return n;
	}
	function Pj(a, b, c) {
		var d = b.updateQueue;
		d = null !== d ? d.lastEffect : null;
		if (null !== d) {
			var e = d = d.next;
			do {
				if ((e.tag & a) === a) {
					var f = e.destroy;
					e.destroy = void 0;
					void 0 !== f && Mj(b, c, f);
				}
				e = e.next;
			} while (e !== d);
		}
	}
	function Qj(a, b) {
		b = b.updateQueue;
		b = null !== b ? b.lastEffect : null;
		if (null !== b) {
			var c = b = b.next;
			do {
				if ((c.tag & a) === a) {
					var d = c.create;
					c.destroy = d();
				}
				c = c.next;
			} while (c !== b);
		}
	}
	function Rj(a) {
		var b = a.ref;
		if (null !== b) {
			var c = a.stateNode;
			switch (a.tag) {
				case 5:
					a = c;
					break;
				default: a = c;
			}
			"function" === typeof b ? b(a) : b.current = a;
		}
	}
	function Sj(a) {
		var b = a.alternate;
		null !== b && (a.alternate = null, Sj(b));
		a.child = null;
		a.deletions = null;
		a.sibling = null;
		5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
		a.stateNode = null;
		a.return = null;
		a.dependencies = null;
		a.memoizedProps = null;
		a.memoizedState = null;
		a.pendingProps = null;
		a.stateNode = null;
		a.updateQueue = null;
	}
	function Tj(a) {
		return 5 === a.tag || 3 === a.tag || 4 === a.tag;
	}
	function Uj(a) {
		a: for (;;) {
			for (; null === a.sibling;) {
				if (null === a.return || Tj(a.return)) return null;
				a = a.return;
			}
			a.sibling.return = a.return;
			for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
				if (a.flags & 2) continue a;
				if (null === a.child || 4 === a.tag) continue a;
				else a.child.return = a, a = a.child;
			}
			if (!(a.flags & 2)) return a.stateNode;
		}
	}
	function Vj(a, b, c) {
		var d = a.tag;
		if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
		else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a;) Vj(a, b, c), a = a.sibling;
	}
	function Wj(a, b, c) {
		var d = a.tag;
		if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
		else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a;) Wj(a, b, c), a = a.sibling;
	}
	var X = null;
	var Xj = !1;
	function Yj(a, b, c) {
		for (c = c.child; null !== c;) Zj(a, b, c), c = c.sibling;
	}
	function Zj(a, b, c) {
		if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
			lc.onCommitFiberUnmount(kc, c);
		} catch (h) {}
		switch (c.tag) {
			case 5: U || Lj(c, b);
			case 6:
				var d = X, e = Xj;
				X = null;
				Yj(a, b, c);
				X = d;
				Xj = e;
				null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
				break;
			case 18:
				null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
				break;
			case 4:
				d = X;
				e = Xj;
				X = c.stateNode.containerInfo;
				Xj = !0;
				Yj(a, b, c);
				X = d;
				Xj = e;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
					e = d = d.next;
					do {
						var f = e, g = f.destroy;
						f = f.tag;
						void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
						e = e.next;
					} while (e !== d);
				}
				Yj(a, b, c);
				break;
			case 1:
				if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
					d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
				} catch (h) {
					W(c, b, h);
				}
				Yj(a, b, c);
				break;
			case 21:
				Yj(a, b, c);
				break;
			case 22:
				c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
				break;
			default: Yj(a, b, c);
		}
	}
	function ak(a) {
		var b = a.updateQueue;
		if (null !== b) {
			a.updateQueue = null;
			var c = a.stateNode;
			null === c && (c = a.stateNode = new Kj());
			b.forEach(function(b) {
				var d = bk.bind(null, a, b);
				c.has(b) || (c.add(b), b.then(d, d));
			});
		}
	}
	function ck(a, b) {
		var c = b.deletions;
		if (null !== c) for (var d = 0; d < c.length; d++) {
			var e = c[d];
			try {
				var f = a, g = b, h = g;
				a: for (; null !== h;) {
					switch (h.tag) {
						case 5:
							X = h.stateNode;
							Xj = !1;
							break a;
						case 3:
							X = h.stateNode.containerInfo;
							Xj = !0;
							break a;
						case 4:
							X = h.stateNode.containerInfo;
							Xj = !0;
							break a;
					}
					h = h.return;
				}
				if (null === X) throw Error(p(160));
				Zj(f, g, e);
				X = null;
				Xj = !1;
				var k = e.alternate;
				null !== k && (k.return = null);
				e.return = null;
			} catch (l) {
				W(e, b, l);
			}
		}
		if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) dk(b, a), b = b.sibling;
	}
	function dk(a, b) {
		var c = a.alternate, d = a.flags;
		switch (a.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ck(b, a);
				ek(a);
				if (d & 4) {
					try {
						Pj(3, a, a.return), Qj(3, a);
					} catch (t) {
						W(a, a.return, t);
					}
					try {
						Pj(5, a, a.return);
					} catch (t) {
						W(a, a.return, t);
					}
				}
				break;
			case 1:
				ck(b, a);
				ek(a);
				d & 512 && null !== c && Lj(c, c.return);
				break;
			case 5:
				ck(b, a);
				ek(a);
				d & 512 && null !== c && Lj(c, c.return);
				if (a.flags & 32) {
					var e = a.stateNode;
					try {
						ob(e, "");
					} catch (t) {
						W(a, a.return, t);
					}
				}
				if (d & 4 && (e = a.stateNode, null != e)) {
					var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
					a.updateQueue = null;
					if (null !== k) try {
						"input" === h && "radio" === f.type && null != f.name && ab(e, f);
						vb(h, g);
						var l = vb(h, f);
						for (g = 0; g < k.length; g += 2) {
							var m = k[g], q = k[g + 1];
							"style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
						}
						switch (h) {
							case "input":
								bb(e, f);
								break;
							case "textarea":
								ib(e, f);
								break;
							case "select":
								var r = e._wrapperState.wasMultiple;
								e._wrapperState.wasMultiple = !!f.multiple;
								var y = f.value;
								null != y ? fb(e, !!f.multiple, y, !1) : r !== !!f.multiple && (null != f.defaultValue ? fb(e, !!f.multiple, f.defaultValue, !0) : fb(e, !!f.multiple, f.multiple ? [] : "", !1));
						}
						e[Pf] = f;
					} catch (t) {
						W(a, a.return, t);
					}
				}
				break;
			case 6:
				ck(b, a);
				ek(a);
				if (d & 4) {
					if (null === a.stateNode) throw Error(p(162));
					e = a.stateNode;
					f = a.memoizedProps;
					try {
						e.nodeValue = f;
					} catch (t) {
						W(a, a.return, t);
					}
				}
				break;
			case 3:
				ck(b, a);
				ek(a);
				if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
					bd(b.containerInfo);
				} catch (t) {
					W(a, a.return, t);
				}
				break;
			case 4:
				ck(b, a);
				ek(a);
				break;
			case 13:
				ck(b, a);
				ek(a);
				e = a.child;
				e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
				d & 4 && ak(a);
				break;
			case 22:
				m = null !== c && null !== c.memoizedState;
				a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
				ek(a);
				if (d & 8192) {
					l = null !== a.memoizedState;
					if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m;) {
						for (q = V = m; null !== V;) {
							r = V;
							y = r.child;
							switch (r.tag) {
								case 0:
								case 11:
								case 14:
								case 15:
									Pj(4, r, r.return);
									break;
								case 1:
									Lj(r, r.return);
									var n = r.stateNode;
									if ("function" === typeof n.componentWillUnmount) {
										d = r;
										c = r.return;
										try {
											b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
										} catch (t) {
											W(d, c, t);
										}
									}
									break;
								case 5:
									Lj(r, r.return);
									break;
								case 22: if (null !== r.memoizedState) {
									gk(q);
									continue;
								}
							}
							null !== y ? (y.return = r, V = y) : gk(q);
						}
						m = m.sibling;
					}
					a: for (m = null, q = a;;) {
						if (5 === q.tag) {
							if (null === m) {
								m = q;
								try {
									e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
								} catch (t) {
									W(a, a.return, t);
								}
							}
						} else if (6 === q.tag) {
							if (null === m) try {
								q.stateNode.nodeValue = l ? "" : q.memoizedProps;
							} catch (t) {
								W(a, a.return, t);
							}
						} else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
							q.child.return = q;
							q = q.child;
							continue;
						}
						if (q === a) break a;
						for (; null === q.sibling;) {
							if (null === q.return || q.return === a) break a;
							m === q && (m = null);
							q = q.return;
						}
						m === q && (m = null);
						q.sibling.return = q.return;
						q = q.sibling;
					}
				}
				break;
			case 19:
				ck(b, a);
				ek(a);
				d & 4 && ak(a);
				break;
			case 21: break;
			default: ck(b, a), ek(a);
		}
	}
	function ek(a) {
		var b = a.flags;
		if (b & 2) {
			try {
				a: {
					for (var c = a.return; null !== c;) {
						if (Tj(c)) {
							var d = c;
							break a;
						}
						c = c.return;
					}
					throw Error(p(160));
				}
				switch (d.tag) {
					case 5:
						var e = d.stateNode;
						d.flags & 32 && (ob(e, ""), d.flags &= -33);
						Wj(a, Uj(a), e);
						break;
					case 3:
					case 4:
						var g = d.stateNode.containerInfo;
						Vj(a, Uj(a), g);
						break;
					default: throw Error(p(161));
				}
			} catch (k) {
				W(a, a.return, k);
			}
			a.flags &= -3;
		}
		b & 4096 && (a.flags &= -4097);
	}
	function hk(a, b, c) {
		V = a;
		ik(a, b, c);
	}
	function ik(a, b, c) {
		for (var d = 0 !== (a.mode & 1); null !== V;) {
			var e = V, f = e.child;
			if (22 === e.tag && d) {
				var g = null !== e.memoizedState || Jj;
				if (!g) {
					var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
					h = Jj;
					var l = U;
					Jj = g;
					if ((U = k) && !l) for (V = e; null !== V;) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
					for (; null !== f;) V = f, ik(f, b, c), f = f.sibling;
					V = e;
					Jj = h;
					U = l;
				}
				kk(a, b, c);
			} else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
		}
	}
	function kk(a) {
		for (; null !== V;) {
			var b = V;
			if (0 !== (b.flags & 8772)) {
				var c = b.alternate;
				try {
					if (0 !== (b.flags & 8772)) switch (b.tag) {
						case 0:
						case 11:
						case 15:
							U || Qj(5, b);
							break;
						case 1:
							var d = b.stateNode;
							if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
							else {
								var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
								d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
							}
							var f = b.updateQueue;
							null !== f && sh(b, f, d);
							break;
						case 3:
							var g = b.updateQueue;
							if (null !== g) {
								c = null;
								if (null !== b.child) switch (b.child.tag) {
									case 5:
										c = b.child.stateNode;
										break;
									case 1: c = b.child.stateNode;
								}
								sh(b, g, c);
							}
							break;
						case 5:
							var h = b.stateNode;
							if (null === c && b.flags & 4) {
								c = h;
								var k = b.memoizedProps;
								switch (b.type) {
									case "button":
									case "input":
									case "select":
									case "textarea":
										k.autoFocus && c.focus();
										break;
									case "img": k.src && (c.src = k.src);
								}
							}
							break;
						case 6: break;
						case 4: break;
						case 12: break;
						case 13:
							if (null === b.memoizedState) {
								var l = b.alternate;
								if (null !== l) {
									var m = l.memoizedState;
									if (null !== m) {
										var q = m.dehydrated;
										null !== q && bd(q);
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25: break;
						default: throw Error(p(163));
					}
					U || b.flags & 512 && Rj(b);
				} catch (r) {
					W(b, b.return, r);
				}
			}
			if (b === a) {
				V = null;
				break;
			}
			c = b.sibling;
			if (null !== c) {
				c.return = b.return;
				V = c;
				break;
			}
			V = b.return;
		}
	}
	function gk(a) {
		for (; null !== V;) {
			var b = V;
			if (b === a) {
				V = null;
				break;
			}
			var c = b.sibling;
			if (null !== c) {
				c.return = b.return;
				V = c;
				break;
			}
			V = b.return;
		}
	}
	function jk(a) {
		for (; null !== V;) {
			var b = V;
			try {
				switch (b.tag) {
					case 0:
					case 11:
					case 15:
						var c = b.return;
						try {
							Qj(4, b);
						} catch (k) {
							W(b, c, k);
						}
						break;
					case 1:
						var d = b.stateNode;
						if ("function" === typeof d.componentDidMount) {
							var e = b.return;
							try {
								d.componentDidMount();
							} catch (k) {
								W(b, e, k);
							}
						}
						var f = b.return;
						try {
							Rj(b);
						} catch (k) {
							W(b, f, k);
						}
						break;
					case 5:
						var g = b.return;
						try {
							Rj(b);
						} catch (k) {
							W(b, g, k);
						}
				}
			} catch (k) {
				W(b, b.return, k);
			}
			if (b === a) {
				V = null;
				break;
			}
			var h = b.sibling;
			if (null !== h) {
				h.return = b.return;
				V = h;
				break;
			}
			V = b.return;
		}
	}
	var lk = Math.ceil;
	var mk = ua.ReactCurrentDispatcher;
	var nk = ua.ReactCurrentOwner;
	var ok = ua.ReactCurrentBatchConfig;
	var K = 0;
	var Q = null;
	var Y = null;
	var Z = 0;
	var fj = 0;
	var ej = Uf(0);
	var T = 0;
	var pk = null;
	var rh = 0;
	var qk = 0;
	var rk = 0;
	var sk = null;
	var tk = null;
	var fk = 0;
	var Gj = Infinity;
	var uk = null;
	var Oi = !1;
	var Pi = null;
	var Ri = null;
	var vk = !1;
	var wk = null;
	var xk = 0;
	var yk = 0;
	var zk = null;
	var Ak = -1;
	var Bk = 0;
	function R() {
		return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
	}
	function yi(a) {
		if (0 === (a.mode & 1)) return 1;
		if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
		if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
		a = C;
		if (0 !== a) return a;
		a = window.event;
		a = void 0 === a ? 16 : jd(a.type);
		return a;
	}
	function gi(a, b, c, d) {
		if (50 < yk) throw yk = 0, zk = null, Error(p(185));
		Ac(a, c, d);
		if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
	}
	function Dk(a, b) {
		var c = a.callbackNode;
		wc(a, b);
		var d = uc(a, a === Q ? Z : 0);
		if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
		else if (b = d & -d, a.callbackPriority !== b) {
			null != c && bc(c);
			if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
				0 === (K & 6) && jg();
			}), c = null;
			else {
				switch (Dc(d)) {
					case 1:
						c = fc;
						break;
					case 4:
						c = gc;
						break;
					case 16:
						c = hc;
						break;
					case 536870912:
						c = jc;
						break;
					default: c = hc;
				}
				c = Fk(c, Gk.bind(null, a));
			}
			a.callbackPriority = b;
			a.callbackNode = c;
		}
	}
	function Gk(a, b) {
		Ak = -1;
		Bk = 0;
		if (0 !== (K & 6)) throw Error(p(327));
		var c = a.callbackNode;
		if (Hk() && a.callbackNode !== c) return null;
		var d = uc(a, a === Q ? Z : 0);
		if (0 === d) return null;
		if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
		else {
			b = d;
			var e = K;
			K |= 2;
			var f = Jk();
			if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
			do
				try {
					Lk();
					break;
				} catch (h) {
					Mk(a, h);
				}
			while (1);
			$g();
			mk.current = f;
			K = e;
			null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
		}
		if (0 !== b) {
			2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
			if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
			if (6 === b) Ck(a, d);
			else {
				e = a.current.alternate;
				if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
				a.finishedWork = e;
				a.finishedLanes = d;
				switch (b) {
					case 0:
					case 1: throw Error(p(345));
					case 2:
						Pk(a, tk, uk);
						break;
					case 3:
						Ck(a, d);
						if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
							if (0 !== uc(a, 0)) break;
							e = a.suspendedLanes;
							if ((e & d) !== d) {
								R();
								a.pingedLanes |= a.suspendedLanes & e;
								break;
							}
							a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
							break;
						}
						Pk(a, tk, uk);
						break;
					case 4:
						Ck(a, d);
						if ((d & 4194240) === d) break;
						b = a.eventTimes;
						for (e = -1; 0 < d;) {
							var g = 31 - oc(d);
							f = 1 << g;
							g = b[g];
							g > e && (e = g);
							d &= ~f;
						}
						d = e;
						d = B() - d;
						d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
						if (10 < d) {
							a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
							break;
						}
						Pk(a, tk, uk);
						break;
					case 5:
						Pk(a, tk, uk);
						break;
					default: throw Error(p(329));
				}
			}
		}
		Dk(a, B());
		return a.callbackNode === c ? Gk.bind(null, a) : null;
	}
	function Nk(a, b) {
		var c = sk;
		a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
		a = Ik(a, b);
		2 !== a && (b = tk, tk = c, null !== b && Fj(b));
		return a;
	}
	function Fj(a) {
		null === tk ? tk = a : tk.push.apply(tk, a);
	}
	function Ok(a) {
		for (var b = a;;) {
			if (b.flags & 16384) {
				var c = b.updateQueue;
				if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
					var e = c[d], f = e.getSnapshot;
					e = e.value;
					try {
						if (!He(f(), e)) return !1;
					} catch (g) {
						return !1;
					}
				}
			}
			c = b.child;
			if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
			else {
				if (b === a) break;
				for (; null === b.sibling;) {
					if (null === b.return || b.return === a) return !0;
					b = b.return;
				}
				b.sibling.return = b.return;
				b = b.sibling;
			}
		}
		return !0;
	}
	function Ck(a, b) {
		b &= ~rk;
		b &= ~qk;
		a.suspendedLanes |= b;
		a.pingedLanes &= ~b;
		for (a = a.expirationTimes; 0 < b;) {
			var c = 31 - oc(b), d = 1 << c;
			a[c] = -1;
			b &= ~d;
		}
	}
	function Ek(a) {
		if (0 !== (K & 6)) throw Error(p(327));
		Hk();
		var b = uc(a, 0);
		if (0 === (b & 1)) return Dk(a, B()), null;
		var c = Ik(a, b);
		if (0 !== a.tag && 2 === c) {
			var d = xc(a);
			0 !== d && (b = d, c = Nk(a, d));
		}
		if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
		if (6 === c) throw Error(p(345));
		a.finishedWork = a.current.alternate;
		a.finishedLanes = b;
		Pk(a, tk, uk);
		Dk(a, B());
		return null;
	}
	function Qk(a, b) {
		var c = K;
		K |= 1;
		try {
			return a(b);
		} finally {
			K = c, 0 === K && (Gj = B() + 500, fg && jg());
		}
	}
	function Rk(a) {
		null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
		var b = K;
		K |= 1;
		var c = ok.transition, d = C;
		try {
			if (ok.transition = null, C = 1, a) return a();
		} finally {
			C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
		}
	}
	function Hj() {
		fj = ej.current;
		E(ej);
	}
	function Kk(a, b) {
		a.finishedWork = null;
		a.finishedLanes = 0;
		var c = a.timeoutHandle;
		-1 !== c && (a.timeoutHandle = -1, Gf(c));
		if (null !== Y) for (c = Y.return; null !== c;) {
			var d = c;
			wg(d);
			switch (d.tag) {
				case 1:
					d = d.type.childContextTypes;
					null !== d && void 0 !== d && $f();
					break;
				case 3:
					zh();
					E(Wf);
					E(H);
					Eh();
					break;
				case 5:
					Bh(d);
					break;
				case 4:
					zh();
					break;
				case 13:
					E(L);
					break;
				case 19:
					E(L);
					break;
				case 10:
					ah(d.type._context);
					break;
				case 22:
				case 23: Hj();
			}
			c = c.return;
		}
		Q = a;
		Y = a = Pg(a.current, null);
		Z = fj = b;
		T = 0;
		pk = null;
		rk = qk = rh = 0;
		tk = sk = null;
		if (null !== fh) {
			for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
				c.interleaved = null;
				var e = d.next, f = c.pending;
				if (null !== f) {
					var g = f.next;
					f.next = e;
					d.next = g;
				}
				c.pending = d;
			}
			fh = null;
		}
		return a;
	}
	function Mk(a, b) {
		do {
			var c = Y;
			try {
				$g();
				Fh.current = Rh;
				if (Ih) {
					for (var d = M.memoizedState; null !== d;) {
						var e = d.queue;
						null !== e && (e.pending = null);
						d = d.next;
					}
					Ih = !1;
				}
				Hh = 0;
				O = N = M = null;
				Jh = !1;
				Kh = 0;
				nk.current = null;
				if (null === c || null === c.return) {
					T = 1;
					pk = b;
					Y = null;
					break;
				}
				a: {
					var f = a, g = c.return, h = c, k = b;
					b = Z;
					h.flags |= 32768;
					if (null !== k && "object" === typeof k && "function" === typeof k.then) {
						var l = k, m = h, q = m.tag;
						if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
							var r = m.alternate;
							r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
						}
						var y = Ui(g);
						if (null !== y) {
							y.flags &= -257;
							Vi(y, g, h, f, b);
							y.mode & 1 && Si(f, l, b);
							b = y;
							k = l;
							var n = b.updateQueue;
							if (null === n) {
								var t = /* @__PURE__ */ new Set();
								t.add(k);
								b.updateQueue = t;
							} else n.add(k);
							break a;
						} else {
							if (0 === (b & 1)) {
								Si(f, l, b);
								tj();
								break a;
							}
							k = Error(p(426));
						}
					} else if (I && h.mode & 1) {
						var J = Ui(g);
						if (null !== J) {
							0 === (J.flags & 65536) && (J.flags |= 256);
							Vi(J, g, h, f, b);
							Jg(Ji(k, h));
							break a;
						}
					}
					f = k = Ji(k, h);
					4 !== T && (T = 2);
					null === sk ? sk = [f] : sk.push(f);
					f = g;
					do {
						switch (f.tag) {
							case 3:
								f.flags |= 65536;
								b &= -b;
								f.lanes |= b;
								var x = Ni(f, k, b);
								ph(f, x);
								break a;
							case 1:
								h = k;
								var w = f.type, u = f.stateNode;
								if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
									f.flags |= 65536;
									b &= -b;
									f.lanes |= b;
									var F = Qi(f, h, b);
									ph(f, F);
									break a;
								}
						}
						f = f.return;
					} while (null !== f);
				}
				Sk(c);
			} catch (na) {
				b = na;
				Y === c && null !== c && (Y = c = c.return);
				continue;
			}
			break;
		} while (1);
	}
	function Jk() {
		var a = mk.current;
		mk.current = Rh;
		return null === a ? Rh : a;
	}
	function tj() {
		if (0 === T || 3 === T || 2 === T) T = 4;
		null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
	}
	function Ik(a, b) {
		var c = K;
		K |= 2;
		var d = Jk();
		if (Q !== a || Z !== b) uk = null, Kk(a, b);
		do
			try {
				Tk();
				break;
			} catch (e) {
				Mk(a, e);
			}
		while (1);
		$g();
		K = c;
		mk.current = d;
		if (null !== Y) throw Error(p(261));
		Q = null;
		Z = 0;
		return T;
	}
	function Tk() {
		for (; null !== Y;) Uk(Y);
	}
	function Lk() {
		for (; null !== Y && !cc();) Uk(Y);
	}
	function Uk(a) {
		var b = Vk(a.alternate, a, fj);
		a.memoizedProps = a.pendingProps;
		null === b ? Sk(a) : Y = b;
		nk.current = null;
	}
	function Sk(a) {
		var b = a;
		do {
			var c = b.alternate;
			a = b.return;
			if (0 === (b.flags & 32768)) {
				if (c = Ej(c, b, fj), null !== c) {
					Y = c;
					return;
				}
			} else {
				c = Ij(c, b);
				if (null !== c) {
					c.flags &= 32767;
					Y = c;
					return;
				}
				if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
				else {
					T = 6;
					Y = null;
					return;
				}
			}
			b = b.sibling;
			if (null !== b) {
				Y = b;
				return;
			}
			Y = b = a;
		} while (null !== b);
		0 === T && (T = 5);
	}
	function Pk(a, b, c) {
		var d = C, e = ok.transition;
		try {
			ok.transition = null, C = 1, Wk(a, b, c, d);
		} finally {
			ok.transition = e, C = d;
		}
		return null;
	}
	function Wk(a, b, c, d) {
		do
			Hk();
		while (null !== wk);
		if (0 !== (K & 6)) throw Error(p(327));
		c = a.finishedWork;
		var e = a.finishedLanes;
		if (null === c) return null;
		a.finishedWork = null;
		a.finishedLanes = 0;
		if (c === a.current) throw Error(p(177));
		a.callbackNode = null;
		a.callbackPriority = 0;
		var f = c.lanes | c.childLanes;
		Bc(a, f);
		a === Q && (Y = Q = null, Z = 0);
		0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = !0, Fk(hc, function() {
			Hk();
			return null;
		}));
		f = 0 !== (c.flags & 15990);
		if (0 !== (c.subtreeFlags & 15990) || f) {
			f = ok.transition;
			ok.transition = null;
			var g = C;
			C = 1;
			var h = K;
			K |= 4;
			nk.current = null;
			Oj(a, c);
			dk(c, a);
			Oe(Df);
			dd = !!Cf;
			Df = Cf = null;
			a.current = c;
			hk(c, a, e);
			dc();
			K = h;
			C = g;
			ok.transition = f;
		} else a.current = c;
		vk && (vk = !1, wk = a, xk = e);
		f = a.pendingLanes;
		0 === f && (Ri = null);
		mc(c.stateNode, d);
		Dk(a, B());
		if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, {
			componentStack: e.stack,
			digest: e.digest
		});
		if (Oi) throw Oi = !1, a = Pi, Pi = null, a;
		0 !== (xk & 1) && 0 !== a.tag && Hk();
		f = a.pendingLanes;
		0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
		jg();
		return null;
	}
	function Hk() {
		if (null !== wk) {
			var a = Dc(xk), b = ok.transition, c = C;
			try {
				ok.transition = null;
				C = 16 > a ? 16 : a;
				if (null === wk) var d = !1;
				else {
					a = wk;
					wk = null;
					xk = 0;
					if (0 !== (K & 6)) throw Error(p(331));
					var e = K;
					K |= 4;
					for (V = a.current; null !== V;) {
						var f = V, g = f.child;
						if (0 !== (V.flags & 16)) {
							var h = f.deletions;
							if (null !== h) {
								for (var k = 0; k < h.length; k++) {
									var l = h[k];
									for (V = l; null !== V;) {
										var m = V;
										switch (m.tag) {
											case 0:
											case 11:
											case 15: Pj(8, m, f);
										}
										var q = m.child;
										if (null !== q) q.return = m, V = q;
										else for (; null !== V;) {
											m = V;
											var r = m.sibling, y = m.return;
											Sj(m);
											if (m === l) {
												V = null;
												break;
											}
											if (null !== r) {
												r.return = y;
												V = r;
												break;
											}
											V = y;
										}
									}
								}
								var n = f.alternate;
								if (null !== n) {
									var t = n.child;
									if (null !== t) {
										n.child = null;
										do {
											var J = t.sibling;
											t.sibling = null;
											t = J;
										} while (null !== t);
									}
								}
								V = f;
							}
						}
						if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
						else b: for (; null !== V;) {
							f = V;
							if (0 !== (f.flags & 2048)) switch (f.tag) {
								case 0:
								case 11:
								case 15: Pj(9, f, f.return);
							}
							var x = f.sibling;
							if (null !== x) {
								x.return = f.return;
								V = x;
								break b;
							}
							V = f.return;
						}
					}
					var w = a.current;
					for (V = w; null !== V;) {
						g = V;
						var u = g.child;
						if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
						else b: for (g = w; null !== V;) {
							h = V;
							if (0 !== (h.flags & 2048)) try {
								switch (h.tag) {
									case 0:
									case 11:
									case 15: Qj(9, h);
								}
							} catch (na) {
								W(h, h.return, na);
							}
							if (h === g) {
								V = null;
								break b;
							}
							var F = h.sibling;
							if (null !== F) {
								F.return = h.return;
								V = F;
								break b;
							}
							V = h.return;
						}
					}
					K = e;
					jg();
					if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
						lc.onPostCommitFiberRoot(kc, a);
					} catch (na) {}
					d = !0;
				}
				return d;
			} finally {
				C = c, ok.transition = b;
			}
		}
		return !1;
	}
	function Xk(a, b, c) {
		b = Ji(c, b);
		b = Ni(a, b, 1);
		a = nh(a, b, 1);
		b = R();
		null !== a && (Ac(a, 1, b), Dk(a, b));
	}
	function W(a, b, c) {
		if (3 === a.tag) Xk(a, a, c);
		else for (; null !== b;) {
			if (3 === b.tag) {
				Xk(b, a, c);
				break;
			} else if (1 === b.tag) {
				var d = b.stateNode;
				if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
					a = Ji(c, a);
					a = Qi(b, a, 1);
					b = nh(b, a, 1);
					a = R();
					null !== b && (Ac(b, 1, a), Dk(b, a));
					break;
				}
			}
			b = b.return;
		}
	}
	function Ti(a, b, c) {
		var d = a.pingCache;
		null !== d && d.delete(b);
		b = R();
		a.pingedLanes |= a.suspendedLanes & c;
		Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
		Dk(a, b);
	}
	function Yk(a, b) {
		0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
		var c = R();
		a = ih(a, b);
		null !== a && (Ac(a, b, c), Dk(a, c));
	}
	function uj(a) {
		var b = a.memoizedState, c = 0;
		null !== b && (c = b.retryLane);
		Yk(a, c);
	}
	function bk(a, b) {
		var c = 0;
		switch (a.tag) {
			case 13:
				var d = a.stateNode;
				var e = a.memoizedState;
				null !== e && (c = e.retryLane);
				break;
			case 19:
				d = a.stateNode;
				break;
			default: throw Error(p(314));
		}
		null !== d && d.delete(b);
		Yk(a, c);
	}
	var Vk = function(a, b, c) {
		if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = !0;
		else {
			if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = !1, yj(a, b, c);
			dh = 0 !== (a.flags & 131072) ? !0 : !1;
		}
		else dh = !1, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
		b.lanes = 0;
		switch (b.tag) {
			case 2:
				var d = b.type;
				ij(a, b);
				a = b.pendingProps;
				var e = Yf(b, H.current);
				ch(b, c);
				e = Nh(null, b, d, a, e, c);
				var f = Sh();
				b.flags |= 1;
				"object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = !0, cg(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, !0, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
				return b;
			case 16:
				d = b.elementType;
				a: {
					ij(a, b);
					a = b.pendingProps;
					e = d._init;
					d = e(d._payload);
					b.type = d;
					e = b.tag = Zk(d);
					a = Ci(d, a);
					switch (e) {
						case 0:
							b = cj(null, b, d, a, c);
							break a;
						case 1:
							b = hj(null, b, d, a, c);
							break a;
						case 11:
							b = Yi(null, b, d, a, c);
							break a;
						case 14:
							b = $i(null, b, d, Ci(d.type, a), c);
							break a;
					}
					throw Error(p(306, d, ""));
				}
				return b;
			case 0: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
			case 1: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
			case 3:
				a: {
					kj(b);
					if (null === a) throw Error(p(387));
					d = b.pendingProps;
					f = b.memoizedState;
					e = f.element;
					lh(a, b);
					qh(b, d, null, c);
					var g = b.memoizedState;
					d = g.element;
					if (f.isDehydrated) if (f = {
						element: d,
						isDehydrated: !1,
						cache: g.cache,
						pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
						transitions: g.transitions
					}, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
						e = Ji(Error(p(423)), b);
						b = lj(a, b, d, c, e);
						break a;
					} else if (d !== e) {
						e = Ji(Error(p(424)), b);
						b = lj(a, b, d, c, e);
						break a;
					} else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = !0, zg = null, c = Vg(b, null, d, c), b.child = c; c;) c.flags = c.flags & -3 | 4096, c = c.sibling;
					else {
						Ig();
						if (d === e) {
							b = Zi(a, b, c);
							break a;
						}
						Xi(a, b, d, c);
					}
					b = b.child;
				}
				return b;
			case 5: return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
			case 6: return null === a && Eg(b), null;
			case 13: return oj(a, b, c);
			case 4: return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
			case 11: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
			case 7: return Xi(a, b, b.pendingProps, c), b.child;
			case 8: return Xi(a, b, b.pendingProps.children, c), b.child;
			case 12: return Xi(a, b, b.pendingProps.children, c), b.child;
			case 10:
				a: {
					d = b.type._context;
					e = b.pendingProps;
					f = b.memoizedProps;
					g = e.value;
					G(Wg, d._currentValue);
					d._currentValue = g;
					if (null !== f) if (He(f.value, g)) {
						if (f.children === e.children && !Wf.current) {
							b = Zi(a, b, c);
							break a;
						}
					} else for (f = b.child, null !== f && (f.return = b); null !== f;) {
						var h = f.dependencies;
						if (null !== h) {
							g = f.child;
							for (var k = h.firstContext; null !== k;) {
								if (k.context === d) {
									if (1 === f.tag) {
										k = mh(-1, c & -c);
										k.tag = 2;
										var l = f.updateQueue;
										if (null !== l) {
											l = l.shared;
											var m = l.pending;
											null === m ? k.next = k : (k.next = m.next, m.next = k);
											l.pending = k;
										}
									}
									f.lanes |= c;
									k = f.alternate;
									null !== k && (k.lanes |= c);
									bh(f.return, c, b);
									h.lanes |= c;
									break;
								}
								k = k.next;
							}
						} else if (10 === f.tag) g = f.type === b.type ? null : f.child;
						else if (18 === f.tag) {
							g = f.return;
							if (null === g) throw Error(p(341));
							g.lanes |= c;
							h = g.alternate;
							null !== h && (h.lanes |= c);
							bh(g, c, b);
							g = f.sibling;
						} else g = f.child;
						if (null !== g) g.return = f;
						else for (g = f; null !== g;) {
							if (g === b) {
								g = null;
								break;
							}
							f = g.sibling;
							if (null !== f) {
								f.return = g.return;
								g = f;
								break;
							}
							g = g.return;
						}
						f = g;
					}
					Xi(a, b, e.children, c);
					b = b.child;
				}
				return b;
			case 9: return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
			case 14: return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
			case 15: return bj(a, b, b.type, b.pendingProps, c);
			case 17: return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = !0, cg(b)) : a = !1, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, !0, a, c);
			case 19: return xj(a, b, c);
			case 22: return dj(a, b, c);
		}
		throw Error(p(156, b.tag));
	};
	function Fk(a, b) {
		return ac(a, b);
	}
	function $k(a, b, c, d) {
		this.tag = a;
		this.key = c;
		this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
		this.index = 0;
		this.ref = null;
		this.pendingProps = b;
		this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
		this.mode = d;
		this.subtreeFlags = this.flags = 0;
		this.deletions = null;
		this.childLanes = this.lanes = 0;
		this.alternate = null;
	}
	function Bg(a, b, c, d) {
		return new $k(a, b, c, d);
	}
	function aj(a) {
		a = a.prototype;
		return !(!a || !a.isReactComponent);
	}
	function Zk(a) {
		if ("function" === typeof a) return aj(a) ? 1 : 0;
		if (void 0 !== a && null !== a) {
			a = a.$$typeof;
			if (a === Da) return 11;
			if (a === Ga) return 14;
		}
		return 2;
	}
	function Pg(a, b) {
		var c = a.alternate;
		null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
		c.flags = a.flags & 14680064;
		c.childLanes = a.childLanes;
		c.lanes = a.lanes;
		c.child = a.child;
		c.memoizedProps = a.memoizedProps;
		c.memoizedState = a.memoizedState;
		c.updateQueue = a.updateQueue;
		b = a.dependencies;
		c.dependencies = null === b ? null : {
			lanes: b.lanes,
			firstContext: b.firstContext
		};
		c.sibling = a.sibling;
		c.index = a.index;
		c.ref = a.ref;
		return c;
	}
	function Rg(a, b, c, d, e, f) {
		var g = 2;
		d = a;
		if ("function" === typeof a) aj(a) && (g = 1);
		else if ("string" === typeof a) g = 5;
		else a: switch (a) {
			case ya: return Tg(c.children, e, f, b);
			case za:
				g = 8;
				e |= 8;
				break;
			case Aa: return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
			case Ea: return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
			case Fa: return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
			case Ia: return pj(c, e, f, b);
			default:
				if ("object" === typeof a && null !== a) switch (a.$$typeof) {
					case Ba:
						g = 10;
						break a;
					case Ca:
						g = 9;
						break a;
					case Da:
						g = 11;
						break a;
					case Ga:
						g = 14;
						break a;
					case Ha:
						g = 16;
						d = null;
						break a;
				}
				throw Error(p(130, null == a ? a : typeof a, ""));
		}
		b = Bg(g, c, b, e);
		b.elementType = a;
		b.type = d;
		b.lanes = f;
		return b;
	}
	function Tg(a, b, c, d) {
		a = Bg(7, a, d, b);
		a.lanes = c;
		return a;
	}
	function pj(a, b, c, d) {
		a = Bg(22, a, d, b);
		a.elementType = Ia;
		a.lanes = c;
		a.stateNode = { isHidden: !1 };
		return a;
	}
	function Qg(a, b, c) {
		a = Bg(6, a, null, b);
		a.lanes = c;
		return a;
	}
	function Sg(a, b, c) {
		b = Bg(4, null !== a.children ? a.children : [], a.key, b);
		b.lanes = c;
		b.stateNode = {
			containerInfo: a.containerInfo,
			pendingChildren: null,
			implementation: a.implementation
		};
		return b;
	}
	function al(a, b, c, d, e) {
		this.tag = b;
		this.containerInfo = a;
		this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
		this.timeoutHandle = -1;
		this.callbackNode = this.pendingContext = this.context = null;
		this.callbackPriority = 0;
		this.eventTimes = zc(0);
		this.expirationTimes = zc(-1);
		this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
		this.entanglements = zc(0);
		this.identifierPrefix = d;
		this.onRecoverableError = e;
		this.mutableSourceEagerHydrationData = null;
	}
	function bl(a, b, c, d, e, f, g, h, k) {
		a = new al(a, b, c, h, k);
		1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
		f = Bg(3, null, null, b);
		a.current = f;
		f.stateNode = a;
		f.memoizedState = {
			element: d,
			isDehydrated: c,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		};
		kh(f);
		return a;
	}
	function cl(a, b, c) {
		var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: wa,
			key: null == d ? null : "" + d,
			children: a,
			containerInfo: b,
			implementation: c
		};
	}
	function dl(a) {
		if (!a) return Vf;
		a = a._reactInternals;
		a: {
			if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
			var b = a;
			do {
				switch (b.tag) {
					case 3:
						b = b.stateNode.context;
						break a;
					case 1: if (Zf(b.type)) {
						b = b.stateNode.__reactInternalMemoizedMergedChildContext;
						break a;
					}
				}
				b = b.return;
			} while (null !== b);
			throw Error(p(171));
		}
		if (1 === a.tag) {
			var c = a.type;
			if (Zf(c)) return bg(a, c, b);
		}
		return b;
	}
	function el(a, b, c, d, e, f, g, h, k) {
		a = bl(c, d, !0, a, e, f, g, h, k);
		a.context = dl(null);
		c = a.current;
		d = R();
		e = yi(c);
		f = mh(d, e);
		f.callback = void 0 !== b && null !== b ? b : null;
		nh(c, f, e);
		a.current.lanes = e;
		Ac(a, e, d);
		Dk(a, d);
		return a;
	}
	function fl(a, b, c, d) {
		var e = b.current, f = R(), g = yi(e);
		c = dl(c);
		null === b.context ? b.context = c : b.pendingContext = c;
		b = mh(f, g);
		b.payload = { element: a };
		d = void 0 === d ? null : d;
		null !== d && (b.callback = d);
		a = nh(e, b, g);
		null !== a && (gi(a, e, g, f), oh(a, e, g));
		return g;
	}
	function gl(a) {
		a = a.current;
		if (!a.child) return null;
		switch (a.child.tag) {
			case 5: return a.child.stateNode;
			default: return a.child.stateNode;
		}
	}
	function hl(a, b) {
		a = a.memoizedState;
		if (null !== a && null !== a.dehydrated) {
			var c = a.retryLane;
			a.retryLane = 0 !== c && c < b ? c : b;
		}
	}
	function il(a, b) {
		hl(a, b);
		(a = a.alternate) && hl(a, b);
	}
	function jl() {
		return null;
	}
	var kl = "function" === typeof reportError ? reportError : function(a) {
		console.error(a);
	};
	function ll(a) {
		this._internalRoot = a;
	}
	ml.prototype.render = ll.prototype.render = function(a) {
		var b = this._internalRoot;
		if (null === b) throw Error(p(409));
		fl(a, b, null, null);
	};
	ml.prototype.unmount = ll.prototype.unmount = function() {
		var a = this._internalRoot;
		if (null !== a) {
			this._internalRoot = null;
			var b = a.containerInfo;
			Rk(function() {
				fl(null, a, null, null);
			});
			b[uf] = null;
		}
	};
	function ml(a) {
		this._internalRoot = a;
	}
	ml.prototype.unstable_scheduleHydration = function(a) {
		if (a) {
			var b = Hc();
			a = {
				blockedOn: null,
				target: a,
				priority: b
			};
			for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++);
			Qc.splice(c, 0, a);
			0 === c && Vc(a);
		}
	};
	function nl(a) {
		return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
	}
	function ol(a) {
		return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
	}
	function pl() {}
	function ql(a, b, c, d, e) {
		if (e) {
			if ("function" === typeof d) {
				var f = d;
				d = function() {
					var a = gl(g);
					f.call(a);
				};
			}
			var g = el(b, d, a, 0, null, !1, !1, "", pl);
			a._reactRootContainer = g;
			a[uf] = g.current;
			sf(8 === a.nodeType ? a.parentNode : a);
			Rk();
			return g;
		}
		for (; e = a.lastChild;) a.removeChild(e);
		if ("function" === typeof d) {
			var h = d;
			d = function() {
				var a = gl(k);
				h.call(a);
			};
		}
		var k = bl(a, 0, !1, null, null, !1, !1, "", pl);
		a._reactRootContainer = k;
		a[uf] = k.current;
		sf(8 === a.nodeType ? a.parentNode : a);
		Rk(function() {
			fl(b, k, c, d);
		});
		return k;
	}
	function rl(a, b, c, d, e) {
		var f = c._reactRootContainer;
		if (f) {
			var g = f;
			if ("function" === typeof e) {
				var h = e;
				e = function() {
					var a = gl(g);
					h.call(a);
				};
			}
			fl(b, g, a, e);
		} else g = ql(c, b, a, e, d);
		return gl(g);
	}
	Ec = function(a) {
		switch (a.tag) {
			case 3:
				var b = a.stateNode;
				if (b.current.memoizedState.isDehydrated) {
					var c = tc(b.pendingLanes);
					0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
				}
				break;
			case 13: Rk(function() {
				var b = ih(a, 1);
				if (null !== b) gi(b, a, 1, R());
			}), il(a, 1);
		}
	};
	Fc = function(a) {
		if (13 === a.tag) {
			var b = ih(a, 134217728);
			if (null !== b) gi(b, a, 134217728, R());
			il(a, 134217728);
		}
	};
	Gc = function(a) {
		if (13 === a.tag) {
			var b = yi(a), c = ih(a, b);
			if (null !== c) gi(c, a, b, R());
			il(a, b);
		}
	};
	Hc = function() {
		return C;
	};
	Ic = function(a, b) {
		var c = C;
		try {
			return C = a, b();
		} finally {
			C = c;
		}
	};
	yb = function(a, b, c) {
		switch (b) {
			case "input":
				bb(a, c);
				b = c.name;
				if ("radio" === c.type && null != b) {
					for (c = a; c.parentNode;) c = c.parentNode;
					c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + "][type=\"radio\"]");
					for (b = 0; b < c.length; b++) {
						var d = c[b];
						if (d !== a && d.form === a.form) {
							var e = Db(d);
							if (!e) throw Error(p(90));
							Wa(d);
							bb(d, e);
						}
					}
				}
				break;
			case "textarea":
				ib(a, c);
				break;
			case "select": b = c.value, null != b && fb(a, !!c.multiple, b, !1);
		}
	};
	Gb = Qk;
	Hb = Rk;
	var sl = {
		usingClientEntryPoint: !1,
		Events: [
			Cb,
			ue,
			Db,
			Eb,
			Fb,
			Qk
		]
	};
	var tl = {
		findFiberByHostInstance: Wc,
		bundleType: 0,
		version: "18.3.1",
		rendererPackageName: "react-dom"
	};
	var ul = {
		bundleType: tl.bundleType,
		version: tl.version,
		rendererPackageName: tl.rendererPackageName,
		rendererConfig: tl.rendererConfig,
		overrideHookState: null,
		overrideHookStateDeletePath: null,
		overrideHookStateRenamePath: null,
		overrideProps: null,
		overridePropsDeletePath: null,
		overridePropsRenamePath: null,
		setErrorHandler: null,
		setSuspenseHandler: null,
		scheduleUpdate: null,
		currentDispatcherRef: ua.ReactCurrentDispatcher,
		findHostInstanceByFiber: function(a) {
			a = Zb(a);
			return null === a ? null : a.stateNode;
		},
		findFiberByHostInstance: tl.findFiberByHostInstance || jl,
		findHostInstancesForRefresh: null,
		scheduleRefresh: null,
		scheduleRoot: null,
		setRefreshHandler: null,
		getCurrentFiber: null,
		reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
	};
	if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
		var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!vl.isDisabled && vl.supportsFiber) try {
			kc = vl.inject(ul), lc = vl;
		} catch (a) {}
	}
	exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
	exports.createPortal = function(a, b) {
		var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!nl(b)) throw Error(p(200));
		return cl(a, b, null, c);
	};
	exports.createRoot = function(a, b) {
		if (!nl(a)) throw Error(p(299));
		var c = !1, d = "", e = kl;
		null !== b && void 0 !== b && (!0 === b.unstable_strictMode && (c = !0), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
		b = bl(a, 1, !1, null, null, c, !1, d, e);
		a[uf] = b.current;
		sf(8 === a.nodeType ? a.parentNode : a);
		return new ll(b);
	};
	exports.findDOMNode = function(a) {
		if (null == a) return null;
		if (1 === a.nodeType) return a;
		var b = a._reactInternals;
		if (void 0 === b) {
			if ("function" === typeof a.render) throw Error(p(188));
			a = Object.keys(a).join(",");
			throw Error(p(268, a));
		}
		a = Zb(b);
		a = null === a ? null : a.stateNode;
		return a;
	};
	exports.flushSync = function(a) {
		return Rk(a);
	};
	exports.hydrate = function(a, b, c) {
		if (!ol(b)) throw Error(p(200));
		return rl(null, a, b, !0, c);
	};
	exports.hydrateRoot = function(a, b, c) {
		if (!nl(a)) throw Error(p(405));
		var d = null != c && c.hydratedSources || null, e = !1, f = "", g = kl;
		null !== c && void 0 !== c && (!0 === c.unstable_strictMode && (e = !0), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
		b = el(b, null, a, 1, null != c ? c : null, e, !1, f, g);
		a[uf] = b.current;
		sf(a);
		if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(c, e);
		return new ml(b);
	};
	exports.render = function(a, b, c) {
		if (!ol(b)) throw Error(p(200));
		return rl(null, a, b, !1, c);
	};
	exports.unmountComponentAtNode = function(a) {
		if (!ol(a)) throw Error(p(40));
		return a._reactRootContainer ? (Rk(function() {
			rl(null, null, a, !1, function() {
				a._reactRootContainer = null;
				a[uf] = null;
			});
		}), !0) : !1;
	};
	exports.unstable_batchedUpdates = Qk;
	exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
		if (!ol(c)) throw Error(p(200));
		if (null == a || void 0 === a._reactInternals) throw Error(p(38));
		return rl(a, b, c, !1, d);
	};
	exports.version = "18.3.1-next-f1338f8080-20240426";
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production_min();
}));
//#endregion
//#region ../../node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/client.js
var require_client = /* @__PURE__ */ __commonJSMin(((exports) => {
	var m = require_react_dom();
	exports.createRoot = m.createRoot;
	exports.hydrateRoot = m.hydrateRoot;
}));
//#endregion
//#region src/mobile/rpc.ts
var import_react = require_react();
var import_client = require_client();
/**
* Mobile-surface unary RPC over the shared /api transport: the four-quadrant
* envelope (client-request → server-response), minted rpcIds, and typed
* error mapping. This is a thin, self-contained slice of the harness
* apiproxy fetch carrier — the mobile page is an independent bundle and must
* not depend on the main UI's module loader, so the wire contract is
* reimplemented here over plain fetch.
*/
/** Transport-level failure (network, HTTP status, malformed envelope). */
var RpcTransportError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "RpcTransportError";
	}
};
/** A business error the host answered with (200 + err result). */
var RpcCallError = class extends Error {
	/** The wire error (code + message + details). */
	error;
	constructor(error) {
		super(error.message);
		this.name = "RpcCallError";
		this.error = error;
	}
};
let rpcCounter = 0;
/** Mint one process-unique rpcId (stable under crypto.randomUUID absence). */
function mintRpcId() {
	const random = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
	rpcCounter += 1;
	return `${random}-${rpcCounter.toString(36)}`;
}
/**
* One unary call: POST /m/api/<method> (the plugin's own mobile channel —
* NOT the connection plugin's /api prefix, so the tunneled Host never needs
* to enter the transport trust fence) with the client-request envelope,
* resolve the server-response value, reject with the mapped error classes.
* @param method - the dotted RPC method, e.g. `session.list`.
* @param payload - the business payload.
* @param signal - optional abort.
* @returns the response value.
*/
async function callUnary(method, payload, signal) {
	const rpcId = mintRpcId();
	let response;
	try {
		response = await fetch(`/m/api/${method}`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				type: "client-request",
				rpcId,
				method,
				payload
			}),
			...signal !== void 0 ? { signal } : {}
		});
	} catch (error) {
		throw new RpcTransportError(`transport failed: ${error instanceof DOMException && error.name === "AbortError" ? "aborted" : error instanceof Error ? error.message : String(error)}`);
	}
	if (!response.ok) throw new RpcTransportError(`HTTP ${String(response.status)}`);
	let envelope;
	try {
		envelope = await response.json();
	} catch {
		throw new RpcTransportError("malformed response body");
	}
	const parsed = envelope;
	if (parsed?.type !== "server-response" || parsed.rpcId !== rpcId) throw new RpcTransportError("response envelope mismatch");
	const result = parsed.result;
	if (result?.ok === true) return result.value;
	if (result?.ok === false && result.error !== void 0) throw new RpcCallError(result.error);
	throw new RpcTransportError("malformed result envelope");
}
//#endregion
//#region src/mobile/api.ts
/** The workspace roster (session ids come back per workspace). */
async function listWorkspaces() {
	const { items } = await callUnary("workspace.list", {});
	return items;
}
/** Read-only mobile display preferences (answered by the plugin, not the host proxy). */
async function fetchMobilePreferences() {
	return await callUnary("mobile.preferences", {});
}
/** One session.list page; omit the cursor for the first page. */
async function listSessions(cursor) {
	return await callUnary("session.list", cursor === void 0 ? {} : { cursor });
}
/**
* Create a blank session (entity birth precedes the first message). Name a
* workspace to attach it there, or a cwd; omitting both uses the host cwd.
*/
async function createSession(options = {}) {
	return await callUnary("session.create", options);
}
/** One history window; omit beforeSeq for the tail page, pass a signal to abort. */
async function history(sessionId, beforeSeq, maxMessages = 30, signal) {
	return await callUnary("session.history", {
		sessionId,
		maxMessages,
		...beforeSeq !== void 0 ? { beforeSeq } : {}
	}, signal);
}
/** Send one text prompt (queued: the agent picks it up in order). */
async function prompt(sessionId, text) {
	await callUnary("session.prompt", {
		sessionId,
		mode: "queue",
		content: [{
			type: "text",
			text
		}]
	});
}
/** Send one slash command line (e.g. `/permission workspace-write`). */
async function sendCommand(sessionId, line) {
	return await callUnary("session.prompt", {
		sessionId,
		mode: "queue",
		content: [{
			type: "text",
			text: line
		}]
	});
}
/** Fresh advisory model directory for one session (current + groups + failures). */
async function models(sessionId) {
	return await callUnary("session.models", { sessionId });
}
/** Select the complete model selection (provider/model/reasoning effort) for a session. */
async function selectModel(sessionId, selection) {
	return await callUnary("session.selectModel", {
		sessionId,
		provider: selection.provider,
		model: selection.model,
		...selection.reasoningEffort !== void 0 ? { reasoningEffort: selection.reasoningEffort } : {}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
var _a$1;
function $constructor(name, initializer, params) {
	function init(inst, def) {
		if (!inst._zod) Object.defineProperty(inst, "_zod", {
			value: {
				def,
				constr: _,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: false
		});
		if (inst._zod.traits.has(name)) return;
		inst._zod.traits.add(name);
		initializer(inst, def);
		const proto = _.prototype;
		const keys = Object.keys(proto);
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];
			if (!(k in inst)) inst[k] = proto[k].bind(inst);
		}
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var $ZodEncodeError = class extends Error {
	constructor(name) {
		super(`Encountered unidirectional transform during encode: ${name}`);
		this.name = "ZodEncodeError";
	}
};
(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
const globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
	const numericValues = Object.values(entries).filter((v) => typeof v === "number");
	return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
}
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
		throw new Error("cached value already set");
	} };
}
function nullish(input) {
	return input === null || input === void 0;
}
function cleanRegex(source) {
	const start = source.startsWith("^") ? 1 : 0;
	const end = source.endsWith("$") ? source.length - 1 : source.length;
	return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
	const ratio = val / step;
	const roundedRatio = Math.round(ratio);
	const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
	if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
	return ratio - roundedRatio;
}
const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
function defineLazy(object, key, getter) {
	let value = void 0;
	Object.defineProperty(object, key, {
		get() {
			if (value === EVALUATING) return;
			if (value === void 0) {
				value = EVALUATING;
				value = getter();
			}
			return value;
		},
		set(v) {
			Object.defineProperty(object, key, { value: v });
		},
		configurable: true
	});
}
function assignProp(target, prop, value) {
	Object.defineProperty(target, prop, {
		value,
		writable: true,
		enumerable: true,
		configurable: true
	});
}
function mergeDefs(...defs) {
	const mergedDescriptors = {};
	for (const def of defs) {
		const descriptors = Object.getOwnPropertyDescriptors(def);
		Object.assign(mergedDescriptors, descriptors);
	}
	return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
	return JSON.stringify(str);
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
	return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = /* @__PURE__*/ cached(() => {
	if (globalConfig.jitless) return false;
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
function isPlainObject(o) {
	if (isObject(o) === false) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	if (typeof ctor !== "function") return true;
	const prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
	return true;
}
function shallowClone(o) {
	if (isPlainObject(o)) return { ...o };
	if (Array.isArray(o)) return [...o];
	if (o instanceof Map) return new Map(o);
	if (o instanceof Set) return new Set(o);
	return o;
}
const propertyKeyTypes = /* @__PURE__*/ new Set([
	"string",
	"number",
	"symbol"
]);
function escapeRegex(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
	const cl = new inst._zod.constr(def ?? inst._zod.def);
	if (!def || params?.parent) cl._zod.parent = inst;
	return cl;
}
function normalizeParams(_params) {
	const params = _params;
	if (!params) return {};
	if (typeof params === "string") return { error: () => params };
	if (params?.message !== void 0) {
		if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
		params.error = params.message;
	}
	delete params.message;
	if (typeof params.error === "string") return {
		...params,
		error: () => params.error
	};
	return params;
}
function optionalKeys(shape) {
	return Object.keys(shape).filter((k) => {
		return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
	});
}
const NUMBER_FORMAT_RANGES = {
	safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function pick(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = {};
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				newShape[key] = currDef.shape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function omit(schema, mask) {
	const currDef = schema._zod.def;
	const checks = currDef.checks;
	if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const newShape = { ...schema._zod.def.shape };
			for (const key in mask) {
				if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				delete newShape[key];
			}
			assignProp(this, "shape", newShape);
			return newShape;
		},
		checks: []
	}));
}
function extend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) {
		const existingShape = schema._zod.def.shape;
		for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function safeExtend(schema, shape) {
	if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const _shape = {
			...schema._zod.def.shape,
			...shape
		};
		assignProp(this, "shape", _shape);
		return _shape;
	} }));
}
function merge(a, b) {
	if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return clone(a, mergeDefs(a._zod.def, {
		get shape() {
			const _shape = {
				...a._zod.def.shape,
				...b._zod.def.shape
			};
			assignProp(this, "shape", _shape);
			return _shape;
		},
		get catchall() {
			return b._zod.def.catchall;
		},
		checks: b._zod.def.checks ?? []
	}));
}
function partial(Class, schema, mask) {
	const checks = schema._zod.def.checks;
	if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
	return clone(schema, mergeDefs(schema._zod.def, {
		get shape() {
			const oldShape = schema._zod.def.shape;
			const shape = { ...oldShape };
			if (mask) for (const key in mask) {
				if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
				if (!mask[key]) continue;
				shape[key] = Class ? new Class({
					type: "optional",
					innerType: oldShape[key]
				}) : oldShape[key];
			}
			else for (const key in oldShape) shape[key] = Class ? new Class({
				type: "optional",
				innerType: oldShape[key]
			}) : oldShape[key];
			assignProp(this, "shape", shape);
			return shape;
		},
		checks: []
	}));
}
function required(Class, schema, mask) {
	return clone(schema, mergeDefs(schema._zod.def, { get shape() {
		const oldShape = schema._zod.def.shape;
		const shape = { ...oldShape };
		if (mask) for (const key in mask) {
			if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
			if (!mask[key]) continue;
			shape[key] = new Class({
				type: "nonoptional",
				innerType: oldShape[key]
			});
		}
		else for (const key in oldShape) shape[key] = new Class({
			type: "nonoptional",
			innerType: oldShape[key]
		});
		assignProp(this, "shape", shape);
		return shape;
	} }));
}
function aborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
	return false;
}
function explicitlyAborted(x, startIndex = 0) {
	if (x.aborted === true) return true;
	for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
	return false;
}
function prefixIssues(path, issues) {
	return issues.map((iss) => {
		var _a;
		(_a = iss).path ?? (_a.path = []);
		iss.path.unshift(path);
		return iss;
	});
}
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
	rest.path ?? (rest.path = []);
	rest.message = message;
	if (ctx?.reportInput) rest.input = _input;
	return rest;
}
function getLengthableOrigin(input) {
	if (Array.isArray(input)) return "array";
	if (typeof input === "string") return "string";
	return "unknown";
}
function issue(...args) {
	const [iss, input, inst] = args;
	if (typeof iss === "string") return {
		message: iss,
		code: "custom",
		input,
		inst
	};
	return { ...iss };
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
const initializer$1 = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false
	});
};
const $ZodError = $constructor("$ZodError", initializer$1);
const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
	const fieldErrors = {};
	const formErrors = [];
	for (const sub of error.issues) if (sub.path.length > 0) {
		fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
		fieldErrors[sub.path[0]].push(mapper(sub));
	} else formErrors.push(mapper(sub));
	return {
		formErrors,
		fieldErrors
	};
}
function formatError(error, mapper = (issue) => issue.message) {
	const fieldErrors = { _errors: [] };
	const processError = (error, path = []) => {
		for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
		else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
		else {
			const fullpath = [...path, ...issue.path];
			if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < fullpath.length) {
					const el = fullpath[i];
					if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
					else {
						curr[el] = curr[el] || { _errors: [] };
						curr[el]._errors.push(mapper(issue));
					}
					curr = curr[el];
					i++;
				}
			}
		}
	};
	processError(error);
	return fieldErrors;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
const _parse = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true
	} : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
const _safeParse = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: false
	} : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	return result.issues.length ? {
		success: false,
		error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		async: true
	} : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	return result.issues.length ? {
		success: false,
		error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	} : {
		success: true,
		data: result.value
	};
};
const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
const _encode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _parse(_Err)(schema, value, ctx);
};
const _decode = (_Err) => (schema, value, _ctx) => {
	return _parse(_Err)(schema, value, _ctx);
};
const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _parseAsync(_Err)(schema, value, ctx);
};
const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _parseAsync(_Err)(schema, value, _ctx);
};
const _safeEncode = (_Err) => (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParse(_Err)(schema, value, ctx);
};
const _safeDecode = (_Err) => (schema, value, _ctx) => {
	return _safeParse(_Err)(schema, value, _ctx);
};
const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
	const ctx = _ctx ? {
		..._ctx,
		direction: "backward"
	} : { direction: "backward" };
	return _safeParseAsync(_Err)(schema, value, ctx);
};
const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
	return _safeParseAsync(_Err)(schema, value, _ctx);
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link cuid2} instead.
* See https://github.com/paralleldrive/cuid.
*/
const cuid = /^[cC][0-9a-z]{6,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
*
* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
const uuid = (version) => {
	if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
	return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
/** Practical email validation */
const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
	return new RegExp(_emoji$1, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^[A-Za-z0-9_-]*$/;
const httpProtocol = /^https?$/;
const e164 = /^\+[1-9]\d{6,14}$/;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
function timeSource(args) {
	const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
	return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function time$1(args) {
	return new RegExp(`^${timeSource(args)}$`);
}
function datetime$1(args) {
	const time = timeSource({ precision: args.precision });
	const opts = ["Z"];
	if (args.local) opts.push("");
	if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
	const timeRegex = `${time}(?:${opts.join("|")})`;
	return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
const string$1 = (params) => {
	const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
	return new RegExp(`^${regex}$`);
};
const integer = /^-?\d+$/;
const number$1 = /^-?\d+(?:\.\d+)?$/;
const boolean$1 = /^(?:true|false)$/i;
const lowercase = /^[^A-Z]*$/;
const uppercase = /^[^a-z]*$/;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
	var _a;
	inst._zod ?? (inst._zod = {});
	inst._zod.def = def;
	(_a = inst._zod).onattach ?? (_a.onattach = []);
});
const numericOriginMap = {
	number: "number",
	bigint: "bigint",
	object: "date"
};
const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
		if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
		else bag.exclusiveMaximum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
	$ZodCheck.init(inst, def);
	const origin = numericOriginMap[typeof def.value];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
		if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
		else bag.exclusiveMinimum = def.value;
	});
	inst._zod.check = (payload) => {
		if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
			input: payload.value,
			inclusive: def.inclusive,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		var _a;
		(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
	});
	inst._zod.check = (payload) => {
		if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
		if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
		payload.issues.push({
			origin: typeof payload.value,
			code: "not_multiple_of",
			divisor: def.value,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
	$ZodCheck.init(inst, def);
	def.format = def.format || "float64";
	const isInt = def.format?.includes("int");
	const origin = isInt ? "int" : "number";
	const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		bag.minimum = minimum;
		bag.maximum = maximum;
		if (isInt) bag.pattern = integer;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (isInt) {
			if (!Number.isInteger(input)) {
				payload.issues.push({
					expected: origin,
					format: def.format,
					code: "invalid_type",
					continue: false,
					input,
					inst
				});
				return;
			}
			if (!Number.isSafeInteger(input)) {
				if (input > 0) payload.issues.push({
					input,
					code: "too_big",
					maximum: Number.MAX_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				else payload.issues.push({
					input,
					code: "too_small",
					minimum: Number.MIN_SAFE_INTEGER,
					note: "Integers must be within the safe integer range.",
					inst,
					origin,
					inclusive: true,
					continue: !def.abort
				});
				return;
			}
		}
		if (input < minimum) payload.issues.push({
			origin: "number",
			input,
			code: "too_small",
			minimum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
		if (input > maximum) payload.issues.push({
			origin: "number",
			input,
			code: "too_big",
			maximum,
			inclusive: true,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
		if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length <= def.maximum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_big",
			maximum: def.maximum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
		if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		if (input.length >= def.minimum) return;
		const origin = getLengthableOrigin(input);
		payload.issues.push({
			origin,
			code: "too_small",
			minimum: def.minimum,
			inclusive: true,
			input,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
	var _a;
	$ZodCheck.init(inst, def);
	(_a = inst._zod.def).when ?? (_a.when = (payload) => {
		const val = payload.value;
		return !nullish(val) && val.length !== void 0;
	});
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.minimum = def.length;
		bag.maximum = def.length;
		bag.length = def.length;
	});
	inst._zod.check = (payload) => {
		const input = payload.value;
		const length = input.length;
		if (length === def.length) return;
		const origin = getLengthableOrigin(input);
		const tooBig = length > def.length;
		payload.issues.push({
			origin,
			...tooBig ? {
				code: "too_big",
				maximum: def.length
			} : {
				code: "too_small",
				minimum: def.length
			},
			inclusive: true,
			exact: true,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
	var _a, _b;
	$ZodCheck.init(inst, def);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.format = def.format;
		if (def.pattern) {
			bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
			bag.patterns.add(def.pattern);
		}
	});
	if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: def.format,
			input: payload.value,
			...def.pattern ? { pattern: def.pattern.toString() } : {},
			inst,
			continue: !def.abort
		});
	});
	else (_b = inst._zod).check ?? (_b.check = () => {});
});
const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		def.pattern.lastIndex = 0;
		if (def.pattern.test(payload.value)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: payload.value,
			pattern: def.pattern.toString(),
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
	def.pattern ?? (def.pattern = lowercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
	def.pattern ?? (def.pattern = uppercase);
	$ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
	$ZodCheck.init(inst, def);
	const escapedRegex = escapeRegex(def.includes);
	const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
	def.pattern = pattern;
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.includes(def.includes, def.position)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: def.includes,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.startsWith(def.prefix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: def.prefix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
	$ZodCheck.init(inst, def);
	const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
	def.pattern ?? (def.pattern = pattern);
	inst._zod.onattach.push((inst) => {
		const bag = inst._zod.bag;
		bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
		bag.patterns.add(pattern);
	});
	inst._zod.check = (payload) => {
		if (payload.value.endsWith(def.suffix)) return;
		payload.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: def.suffix,
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
	$ZodCheck.init(inst, def);
	inst._zod.check = (payload) => {
		payload.value = def.tx(payload.value);
	};
});
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
var Doc = class {
	constructor(args = []) {
		this.content = [];
		this.indent = 0;
		if (this) this.args = args;
	}
	indented(fn) {
		this.indent += 1;
		fn(this);
		this.indent -= 1;
	}
	write(arg) {
		if (typeof arg === "function") {
			arg(this, { execution: "sync" });
			arg(this, { execution: "async" });
			return;
		}
		const lines = arg.split("\n").filter((x) => x);
		const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
		const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
		for (const line of dedented) this.content.push(line);
	}
	compile() {
		const F = Function;
		const args = this?.args;
		const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
		return new F(...args, lines.join("\n"));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
const version = {
	major: 4,
	minor: 4,
	patch: 3
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
	var _a;
	inst ?? (inst = {});
	inst._zod.def = def;
	inst._zod.bag = inst._zod.bag || {};
	inst._zod.version = version;
	const checks = [...inst._zod.def.checks ?? []];
	if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
	for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
	if (checks.length === 0) {
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		inst._zod.deferred?.push(() => {
			inst._zod.run = inst._zod.parse;
		});
	} else {
		const runChecks = (payload, checks, ctx) => {
			let isAborted = aborted(payload);
			let asyncResult;
			for (const ch of checks) {
				if (ch._zod.def.when) {
					if (explicitlyAborted(payload)) continue;
					if (!ch._zod.def.when(payload)) continue;
				} else if (isAborted) continue;
				const currLen = payload.issues.length;
				const _ = ch._zod.check(payload);
				if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
				if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
					await _;
					if (payload.issues.length === currLen) return;
					if (!isAborted) isAborted = aborted(payload, currLen);
				});
				else {
					if (payload.issues.length === currLen) continue;
					if (!isAborted) isAborted = aborted(payload, currLen);
				}
			}
			if (asyncResult) return asyncResult.then(() => {
				return payload;
			});
			return payload;
		};
		const handleCanaryResult = (canary, payload, ctx) => {
			if (aborted(canary)) {
				canary.aborted = true;
				return canary;
			}
			const checkResult = runChecks(payload, checks, ctx);
			if (checkResult instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
			}
			return inst._zod.parse(checkResult, ctx);
		};
		inst._zod.run = (payload, ctx) => {
			if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
			if (ctx.direction === "backward") {
				const canary = inst._zod.parse({
					value: payload.value,
					issues: []
				}, {
					...ctx,
					skipChecks: true
				});
				if (canary instanceof Promise) return canary.then((canary) => {
					return handleCanaryResult(canary, payload, ctx);
				});
				return handleCanaryResult(canary, payload, ctx);
			}
			const result = inst._zod.parse(payload, ctx);
			if (result instanceof Promise) {
				if (ctx.async === false) throw new $ZodAsyncError();
				return result.then((result) => runChecks(result, checks, ctx));
			}
			return runChecks(result, checks, ctx);
		};
	}
	defineLazy(inst, "~standard", () => ({
		validate: (value) => {
			try {
				const r = safeParse$1(inst, value);
				return r.success ? { value: r.data } : { issues: r.error?.issues };
			} catch (_) {
				return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
});
const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
	inst._zod.parse = (payload, _) => {
		if (def.coerce) try {
			payload.value = String(payload.value);
		} catch (_) {}
		if (typeof payload.value === "string") return payload;
		payload.issues.push({
			expected: "string",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
	$ZodCheckStringFormat.init(inst, def);
	$ZodString.init(inst, def);
});
const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
	def.pattern ?? (def.pattern = guid);
	$ZodStringFormat.init(inst, def);
});
const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
	if (def.version) {
		const v = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[def.version];
		if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
		def.pattern ?? (def.pattern = uuid(v));
	} else def.pattern ?? (def.pattern = uuid());
	$ZodStringFormat.init(inst, def);
});
const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
	def.pattern ?? (def.pattern = email);
	$ZodStringFormat.init(inst, def);
});
const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		try {
			const trimmed = payload.value.trim();
			if (!def.normalize && def.protocol?.source === httpProtocol.source) {
				if (!/^https?:\/\//i.test(trimmed)) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid URL format",
						input: payload.value,
						inst,
						continue: !def.abort
					});
					return;
				}
			}
			const url = new URL(trimmed);
			if (def.hostname) {
				def.hostname.lastIndex = 0;
				if (!def.hostname.test(url.hostname)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: def.hostname.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.protocol) {
				def.protocol.lastIndex = 0;
				if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: def.protocol.source,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			}
			if (def.normalize) payload.value = url.href;
			else payload.value = trimmed;
			return;
		} catch (_) {
			payload.issues.push({
				code: "invalid_format",
				format: "url",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
	def.pattern ?? (def.pattern = emoji());
	$ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
	def.pattern ?? (def.pattern = nanoid);
	$ZodStringFormat.init(inst, def);
});
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
	def.pattern ?? (def.pattern = cuid);
	$ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
	def.pattern ?? (def.pattern = cuid2);
	$ZodStringFormat.init(inst, def);
});
const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
	def.pattern ?? (def.pattern = ulid);
	$ZodStringFormat.init(inst, def);
});
const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
	def.pattern ?? (def.pattern = xid);
	$ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
	def.pattern ?? (def.pattern = ksuid);
	$ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
	def.pattern ?? (def.pattern = datetime$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
	def.pattern ?? (def.pattern = date$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
	def.pattern ?? (def.pattern = time$1(def));
	$ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
	def.pattern ?? (def.pattern = duration$1);
	$ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
	def.pattern ?? (def.pattern = ipv4);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv4`;
});
const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
	def.pattern ?? (def.pattern = ipv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.format = `ipv6`;
	inst._zod.check = (payload) => {
		try {
			new URL(`http://[${payload.value}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv4);
	$ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
	def.pattern ?? (def.pattern = cidrv6);
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		const parts = payload.value.split("/");
		try {
			if (parts.length !== 2) throw new Error();
			const [address, prefix] = parts;
			if (!prefix) throw new Error();
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) throw new Error();
			if (prefixNum < 0 || prefixNum > 128) throw new Error();
			new URL(`http://[${address}]`);
		} catch {
			payload.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: payload.value,
				inst,
				continue: !def.abort
			});
		}
	};
});
function isValidBase64(data) {
	if (data === "") return true;
	if (/\s/.test(data)) return false;
	if (data.length % 4 !== 0) return false;
	try {
		atob(data);
		return true;
	} catch {
		return false;
	}
}
const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
	def.pattern ?? (def.pattern = base64);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64";
	inst._zod.check = (payload) => {
		if (isValidBase64(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
function isValidBase64URL(data) {
	if (!base64url.test(data)) return false;
	const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
	return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
}
const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
	def.pattern ?? (def.pattern = base64url);
	$ZodStringFormat.init(inst, def);
	inst._zod.bag.contentEncoding = "base64url";
	inst._zod.check = (payload) => {
		if (isValidBase64URL(payload.value)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
	def.pattern ?? (def.pattern = e164);
	$ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
	try {
		const tokensParts = token.split(".");
		if (tokensParts.length !== 3) return false;
		const [header] = tokensParts;
		if (!header) return false;
		const parsedHeader = JSON.parse(atob(header));
		if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
		if (!parsedHeader.alg) return false;
		if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
		return true;
	} catch {
		return false;
	}
}
const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	inst._zod.check = (payload) => {
		if (isValidJWT(payload.value, def.alg)) return;
		payload.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: payload.value,
			inst,
			continue: !def.abort
		});
	};
});
const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Number(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
		const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
		payload.issues.push({
			expected: "number",
			code: "invalid_type",
			input,
			inst,
			...received ? { received } : {}
		});
		return payload;
	};
});
const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
	$ZodCheckNumberFormat.init(inst, def);
	$ZodNumber.init(inst, def);
});
const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.pattern = boolean$1;
	inst._zod.parse = (payload, _ctx) => {
		if (def.coerce) try {
			payload.value = Boolean(payload.value);
		} catch (_) {}
		const input = payload.value;
		if (typeof input === "boolean") return payload;
		payload.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input,
			inst
		});
		return payload;
	};
});
const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload) => payload;
});
const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _ctx) => {
		payload.issues.push({
			expected: "never",
			code: "invalid_type",
			input: payload.value,
			inst
		});
		return payload;
	};
});
function handleArrayResult(result, final, index) {
	if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
	final.value[index] = result.value;
}
const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!Array.isArray(input)) {
			payload.issues.push({
				expected: "array",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = Array(input.length);
		const proms = [];
		for (let i = 0; i < input.length; i++) {
			const item = input[i];
			const result = def.element._zod.run({
				value: item,
				issues: []
			}, ctx);
			if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
			else handleArrayResult(result, payload, i);
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
	const isPresent = key in input;
	if (result.issues.length) {
		if (isOptionalIn && isOptionalOut && !isPresent) return;
		final.issues.push(...prefixIssues(key, result.issues));
	}
	if (!isPresent && !isOptionalIn) {
		if (!result.issues.length) final.issues.push({
			code: "invalid_type",
			expected: "nonoptional",
			input: void 0,
			path: [key]
		});
		return;
	}
	if (result.value === void 0) {
		if (isPresent) final.value[key] = void 0;
	} else final.value[key] = result.value;
}
function normalizeDef(def) {
	const keys = Object.keys(def.shape);
	for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
	const okeys = optionalKeys(def.shape);
	return {
		...def,
		keys,
		keySet: new Set(keys),
		numKeys: keys.length,
		optionalKeys: new Set(okeys)
	};
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
	const unrecognized = [];
	const keySet = def.keySet;
	const _catchall = def.catchall._zod;
	const t = _catchall.def.type;
	const isOptionalIn = _catchall.optin === "optional";
	const isOptionalOut = _catchall.optout === "optional";
	for (const key in input) {
		if (key === "__proto__") continue;
		if (keySet.has(key)) continue;
		if (t === "never") {
			unrecognized.push(key);
			continue;
		}
		const r = _catchall.run({
			value: input[key],
			issues: []
		}, ctx);
		if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
		else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
	}
	if (unrecognized.length) payload.issues.push({
		code: "unrecognized_keys",
		keys: unrecognized,
		input,
		inst
	});
	if (!proms.length) return payload;
	return Promise.all(proms).then(() => {
		return payload;
	});
}
const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
	$ZodType.init(inst, def);
	if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
		const sh = def.shape;
		Object.defineProperty(def, "shape", { get: () => {
			const newSh = { ...sh };
			Object.defineProperty(def, "shape", { value: newSh });
			return newSh;
		} });
	}
	const _normalized = cached(() => normalizeDef(def));
	defineLazy(inst._zod, "propValues", () => {
		const shape = def.shape;
		const propValues = {};
		for (const key in shape) {
			const field = shape[key]._zod;
			if (field.values) {
				propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
				for (const v of field.values) propValues[key].add(v);
			}
		}
		return propValues;
	});
	const isObject$2 = isObject;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$2(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		payload.value = {};
		const proms = [];
		const shape = value.shape;
		for (const key of value.keys) {
			const el = shape[key];
			const isOptionalIn = el._zod.optin === "optional";
			const isOptionalOut = el._zod.optout === "optional";
			const r = el._zod.run({
				value: input[key],
				issues: []
			}, ctx);
			if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
			else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
		}
		if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
		return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
	};
});
const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
	$ZodObject.init(inst, def);
	const superParse = inst._zod.parse;
	const _normalized = cached(() => normalizeDef(def));
	const generateFastpass = (shape) => {
		const doc = new Doc([
			"shape",
			"payload",
			"ctx"
		]);
		const normalized = _normalized.value;
		const parseStr = (key) => {
			const k = esc(key);
			return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
		};
		doc.write(`const input = payload.value;`);
		const ids = Object.create(null);
		let counter = 0;
		for (const key of normalized.keys) ids[key] = `key_${counter++}`;
		doc.write(`const newResult = {};`);
		for (const key of normalized.keys) {
			const id = ids[key];
			const k = esc(key);
			const schema = shape[key];
			const isOptionalIn = schema?._zod?.optin === "optional";
			const isOptionalOut = schema?._zod?.optout === "optional";
			doc.write(`const ${id} = ${parseStr(key)};`);
			if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
			else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
			else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
		}
		doc.write(`payload.value = newResult;`);
		doc.write(`return payload;`);
		const fn = doc.compile();
		return (payload, ctx) => fn(shape, payload, ctx);
	};
	let fastpass;
	const isObject$1 = isObject;
	const jit = !globalConfig.jitless;
	const fastEnabled = jit && allowsEval.value;
	const catchall = def.catchall;
	let value;
	inst._zod.parse = (payload, ctx) => {
		value ?? (value = _normalized.value);
		const input = payload.value;
		if (!isObject$1(input)) {
			payload.issues.push({
				expected: "object",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
			if (!fastpass) fastpass = generateFastpass(def.shape);
			payload = fastpass(payload, ctx);
			if (!catchall) return payload;
			return handleCatchall([], input, payload, ctx, value, inst);
		}
		return superParse(payload, ctx);
	};
});
function handleUnionResults(results, final, inst, ctx) {
	for (const result of results) if (result.issues.length === 0) {
		final.value = result.value;
		return final;
	}
	const nonaborted = results.filter((r) => !aborted(r));
	if (nonaborted.length === 1) {
		final.value = nonaborted[0].value;
		return nonaborted[0];
	}
	final.issues.push({
		code: "invalid_union",
		input: final.value,
		inst,
		errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
	});
	return final;
}
const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
	defineLazy(inst._zod, "values", () => {
		if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
	});
	defineLazy(inst._zod, "pattern", () => {
		if (def.options.every((o) => o._zod.pattern)) {
			const patterns = def.options.map((o) => o._zod.pattern);
			return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
		}
	});
	const first = def.options.length === 1 ? def.options[0]._zod.run : null;
	inst._zod.parse = (payload, ctx) => {
		if (first) return first(payload, ctx);
		let async = false;
		const results = [];
		for (const option of def.options) {
			const result = option._zod.run({
				value: payload.value,
				issues: []
			}, ctx);
			if (result instanceof Promise) {
				results.push(result);
				async = true;
			} else {
				if (result.issues.length === 0) return result;
				results.push(result);
			}
		}
		if (!async) return handleUnionResults(results, payload, inst, ctx);
		return Promise.all(results).then((results) => {
			return handleUnionResults(results, payload, inst, ctx);
		});
	};
});
const $ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
	def.inclusive = false;
	$ZodUnion.init(inst, def);
	const _super = inst._zod.parse;
	defineLazy(inst._zod, "propValues", () => {
		const propValues = {};
		for (const option of def.options) {
			const pv = option._zod.propValues;
			if (!pv || Object.keys(pv).length === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
			for (const [k, v] of Object.entries(pv)) {
				if (!propValues[k]) propValues[k] = /* @__PURE__ */ new Set();
				for (const val of v) propValues[k].add(val);
			}
		}
		return propValues;
	});
	const disc = cached(() => {
		const opts = def.options;
		const map = /* @__PURE__ */ new Map();
		for (const o of opts) {
			const values = o._zod.propValues?.[def.discriminator];
			if (!values || values.size === 0) throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
			for (const v of values) {
				if (map.has(v)) throw new Error(`Duplicate discriminator value "${String(v)}"`);
				map.set(v, o);
			}
		}
		return map;
	});
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isObject(input)) {
			payload.issues.push({
				code: "invalid_type",
				expected: "object",
				input,
				inst
			});
			return payload;
		}
		const opt = disc.value.get(input?.[def.discriminator]);
		if (opt) return opt._zod.run(payload, ctx);
		if (def.unionFallback || ctx.direction === "backward") return _super(payload, ctx);
		payload.issues.push({
			code: "invalid_union",
			errors: [],
			note: "No matching discriminator",
			discriminator: def.discriminator,
			options: Array.from(disc.value.keys()),
			input,
			path: [def.discriminator],
			inst
		});
		return payload;
	};
});
const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		const left = def.left._zod.run({
			value: input,
			issues: []
		}, ctx);
		const right = def.right._zod.run({
			value: input,
			issues: []
		}, ctx);
		if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
			return handleIntersectionResults(payload, left, right);
		});
		return handleIntersectionResults(payload, left, right);
	};
});
function mergeValues(a, b) {
	if (a === b) return {
		valid: true,
		data: a
	};
	if (a instanceof Date && b instanceof Date && +a === +b) return {
		valid: true,
		data: a
	};
	if (isPlainObject(a) && isPlainObject(b)) {
		const bKeys = Object.keys(b);
		const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
			};
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return {
			valid: false,
			mergeErrorPath: []
		};
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return {
				valid: false,
				mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
			};
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	}
	return {
		valid: false,
		mergeErrorPath: []
	};
}
function handleIntersectionResults(result, left, right) {
	const unrecKeys = /* @__PURE__ */ new Map();
	let unrecIssue;
	for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
		unrecIssue ?? (unrecIssue = iss);
		for (const k of iss.keys) {
			if (!unrecKeys.has(k)) unrecKeys.set(k, {});
			unrecKeys.get(k).l = true;
		}
	} else result.issues.push(iss);
	for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
		if (!unrecKeys.has(k)) unrecKeys.set(k, {});
		unrecKeys.get(k).r = true;
	}
	else result.issues.push(iss);
	const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
	if (bothKeys.length && unrecIssue) result.issues.push({
		...unrecIssue,
		keys: bothKeys
	});
	if (aborted(result)) return result;
	const merged = mergeValues(left.value, right.value);
	if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
	result.value = merged.data;
	return result;
}
const $ZodRecord = /*@__PURE__*/ $constructor("$ZodRecord", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, ctx) => {
		const input = payload.value;
		if (!isPlainObject(input)) {
			payload.issues.push({
				expected: "record",
				code: "invalid_type",
				input,
				inst
			});
			return payload;
		}
		const proms = [];
		const values = def.keyType._zod.values;
		if (values) {
			payload.value = {};
			const recordKeys = /* @__PURE__ */ new Set();
			for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
				recordKeys.add(typeof key === "number" ? key.toString() : key);
				const keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (keyResult.issues.length) {
					payload.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					continue;
				}
				const outKey = keyResult.value;
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[outKey] = result.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[outKey] = result.value;
				}
			}
			let unrecognized;
			for (const key in input) if (!recordKeys.has(key)) {
				unrecognized = unrecognized ?? [];
				unrecognized.push(key);
			}
			if (unrecognized && unrecognized.length > 0) payload.issues.push({
				code: "unrecognized_keys",
				input,
				inst,
				keys: unrecognized
			});
		} else {
			payload.value = {};
			for (const key of Reflect.ownKeys(input)) {
				if (key === "__proto__") continue;
				if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
				let keyResult = def.keyType._zod.run({
					value: key,
					issues: []
				}, ctx);
				if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
				if (typeof key === "string" && number$1.test(key) && keyResult.issues.length) {
					const retryResult = def.keyType._zod.run({
						value: Number(key),
						issues: []
					}, ctx);
					if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
					if (retryResult.issues.length === 0) keyResult = retryResult;
				}
				if (keyResult.issues.length) {
					if (def.mode === "loose") payload.value[key] = input[key];
					else payload.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
						input: key,
						path: [key],
						inst
					});
					continue;
				}
				const result = def.valueType._zod.run({
					value: input[key],
					issues: []
				}, ctx);
				if (result instanceof Promise) proms.push(result.then((result) => {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[keyResult.value] = result.value;
				}));
				else {
					if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
					payload.value[keyResult.value] = result.value;
				}
			}
		}
		if (proms.length) return Promise.all(proms).then(() => payload);
		return payload;
	};
});
const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
	$ZodType.init(inst, def);
	const values = getEnumValues(def.entries);
	const valuesSet = new Set(values);
	inst._zod.values = valuesSet;
	inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (valuesSet.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values,
			input,
			inst
		});
		return payload;
	};
});
const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
	$ZodType.init(inst, def);
	if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
	const values = new Set(def.values);
	inst._zod.values = values;
	inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
	inst._zod.parse = (payload, _ctx) => {
		const input = payload.value;
		if (values.has(input)) return payload;
		payload.issues.push({
			code: "invalid_value",
			values: def.values,
			input,
			inst
		});
		return payload;
	};
});
const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		const _out = def.transform(payload.value, payload);
		if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
			payload.value = output;
			payload.fallback = true;
			return payload;
		});
		if (_out instanceof Promise) throw new $ZodAsyncError();
		payload.value = _out;
		payload.fallback = true;
		return payload;
	};
});
function handleOptionalResult(result, input) {
	if (input === void 0 && (result.issues.length || result.fallback)) return {
		issues: [],
		value: void 0
	};
	return result;
}
const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	inst._zod.optout = "optional";
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
	});
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (def.innerType._zod.optin === "optional") {
			const input = payload.value;
			const result = def.innerType._zod.run(payload, ctx);
			if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
			return handleOptionalResult(result, input);
		}
		if (payload.value === void 0) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
	inst._zod.parse = (payload, ctx) => {
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "pattern", () => {
		const pattern = def.innerType._zod.pattern;
		return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
	});
	defineLazy(inst._zod, "values", () => {
		return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		if (payload.value === null) return payload;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) {
			payload.value = def.defaultValue;
			/**
			* $ZodDefault returns the default value immediately in forward direction.
			* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
			return payload;
		}
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
		return handleDefaultResult(result, def);
	};
});
function handleDefaultResult(payload, def) {
	if (payload.value === void 0) payload.value = def.defaultValue;
	return payload;
}
const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		if (payload.value === void 0) payload.value = def.defaultValue;
		return def.innerType._zod.run(payload, ctx);
	};
});
const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => {
		const v = def.innerType._zod.values;
		return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
	});
	inst._zod.parse = (payload, ctx) => {
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
		return handleNonOptionalResult(result, inst);
	};
});
function handleNonOptionalResult(payload, inst) {
	if (!payload.issues.length && payload.value === void 0) payload.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: payload.value,
		inst
	});
	return payload;
}
const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
	$ZodType.init(inst, def);
	inst._zod.optin = "optional";
	defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then((result) => {
			payload.value = result.value;
			if (result.issues.length) {
				payload.value = def.catchValue({
					...payload,
					error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
					input: payload.value
				});
				payload.issues = [];
				payload.fallback = true;
			}
			return payload;
		});
		payload.value = result.value;
		if (result.issues.length) {
			payload.value = def.catchValue({
				...payload,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value
			});
			payload.issues = [];
			payload.fallback = true;
		}
		return payload;
	};
});
const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "values", () => def.in._zod.values);
	defineLazy(inst._zod, "optin", () => def.in._zod.optin);
	defineLazy(inst._zod, "optout", () => def.out._zod.optout);
	defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") {
			const right = def.out._zod.run(payload, ctx);
			if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
			return handlePipeResult(right, def.in, ctx);
		}
		const left = def.in._zod.run(payload, ctx);
		if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
		return handlePipeResult(left, def.out, ctx);
	};
});
function handlePipeResult(left, next, ctx) {
	if (left.issues.length) {
		left.aborted = true;
		return left;
	}
	return next._zod.run({
		value: left.value,
		issues: left.issues,
		fallback: left.fallback
	}, ctx);
}
const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
	defineLazy(inst._zod, "values", () => def.innerType._zod.values);
	defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
	defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
	inst._zod.parse = (payload, ctx) => {
		if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
		const result = def.innerType._zod.run(payload, ctx);
		if (result instanceof Promise) return result.then(handleReadonlyResult);
		return handleReadonlyResult(result);
	};
});
function handleReadonlyResult(payload) {
	payload.value = Object.freeze(payload.value);
	return payload;
}
const $ZodLazy = /*@__PURE__*/ $constructor("$ZodLazy", (inst, def) => {
	$ZodType.init(inst, def);
	defineLazy(inst._zod, "innerType", () => {
		const d = def;
		if (!d._cachedInner) d._cachedInner = def.getter();
		return d._cachedInner;
	});
	defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
	defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
	defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
	defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
	inst._zod.parse = (payload, ctx) => {
		return inst._zod.innerType._zod.run(payload, ctx);
	};
});
const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
	$ZodCheck.init(inst, def);
	$ZodType.init(inst, def);
	inst._zod.parse = (payload, _) => {
		return payload;
	};
	inst._zod.check = (payload) => {
		const input = payload.value;
		const r = def.fn(input);
		if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
		handleRefineResult(r, payload, input, inst);
	};
});
function handleRefineResult(result, payload, input, inst) {
	if (!result) {
		const _iss = {
			code: "custom",
			input,
			inst,
			path: [...inst._zod.def.path ?? []],
			continue: !inst._zod.def.abort
		};
		if (inst._zod.def.params) _iss.params = inst._zod.def.params;
		payload.issues.push(issue(_iss));
	}
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
var _a;
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new WeakMap();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			const f = {
				...pm,
				...this._map.get(schema)
			};
			return Object.keys(f).length ? f : void 0;
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry() {
	return new $ZodRegistry();
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
const globalRegistry = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function _string(Class, params) {
	return new Class({
		type: "string",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _email(Class, params) {
	return new Class({
		type: "string",
		format: "email",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _guid(Class, params) {
	return new Class({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuid(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv4(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v4",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv6(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v6",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uuidv7(Class, params) {
	return new Class({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: false,
		version: "v7",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _url(Class, params) {
	return new Class({
		type: "string",
		format: "url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _emoji(Class, params) {
	return new Class({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _nanoid(Class, params) {
	return new Class({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link _cuid2} instead.
* See https://github.com/paralleldrive/cuid.
*/
// @__NO_SIDE_EFFECTS__
function _cuid(Class, params) {
	return new Class({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cuid2(Class, params) {
	return new Class({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ulid(Class, params) {
	return new Class({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _xid(Class, params) {
	return new Class({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ksuid(Class, params) {
	return new Class({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv4(Class, params) {
	return new Class({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _ipv6(Class, params) {
	return new Class({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv4(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _cidrv6(Class, params) {
	return new Class({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64(Class, params) {
	return new Class({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _base64url(Class, params) {
	return new Class({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _e164(Class, params) {
	return new Class({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _jwt(Class, params) {
	return new Class({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: false,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDateTime(Class, params) {
	return new Class({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: false,
		local: false,
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDate(Class, params) {
	return new Class({
		type: "string",
		format: "date",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoTime(Class, params) {
	return new Class({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _isoDuration(Class, params) {
	return new Class({
		type: "string",
		format: "duration",
		check: "string_format",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _number(Class, params) {
	return new Class({
		type: "number",
		checks: [],
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _int(Class, params) {
	return new Class({
		type: "number",
		check: "number_format",
		abort: false,
		format: "safeint",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _boolean(Class, params) {
	return new Class({
		type: "boolean",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _unknown(Class) {
	return new Class({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function _never(Class, params) {
	return new Class({
		type: "never",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _lt(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
// @__NO_SIDE_EFFECTS__
function _lte(value, params) {
	return new $ZodCheckLessThan({
		check: "less_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
// @__NO_SIDE_EFFECTS__
function _gt(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: false
	});
}
// @__NO_SIDE_EFFECTS__
function _gte(value, params) {
	return new $ZodCheckGreaterThan({
		check: "greater_than",
		...normalizeParams(params),
		value,
		inclusive: true
	});
}
// @__NO_SIDE_EFFECTS__
function _multipleOf(value, params) {
	return new $ZodCheckMultipleOf({
		check: "multiple_of",
		...normalizeParams(params),
		value
	});
}
// @__NO_SIDE_EFFECTS__
function _maxLength(maximum, params) {
	return new $ZodCheckMaxLength({
		check: "max_length",
		...normalizeParams(params),
		maximum
	});
}
// @__NO_SIDE_EFFECTS__
function _minLength(minimum, params) {
	return new $ZodCheckMinLength({
		check: "min_length",
		...normalizeParams(params),
		minimum
	});
}
// @__NO_SIDE_EFFECTS__
function _length(length, params) {
	return new $ZodCheckLengthEquals({
		check: "length_equals",
		...normalizeParams(params),
		length
	});
}
// @__NO_SIDE_EFFECTS__
function _regex(pattern, params) {
	return new $ZodCheckRegex({
		check: "string_format",
		format: "regex",
		...normalizeParams(params),
		pattern
	});
}
// @__NO_SIDE_EFFECTS__
function _lowercase(params) {
	return new $ZodCheckLowerCase({
		check: "string_format",
		format: "lowercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _uppercase(params) {
	return new $ZodCheckUpperCase({
		check: "string_format",
		format: "uppercase",
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _includes(includes, params) {
	return new $ZodCheckIncludes({
		check: "string_format",
		format: "includes",
		...normalizeParams(params),
		includes
	});
}
// @__NO_SIDE_EFFECTS__
function _startsWith(prefix, params) {
	return new $ZodCheckStartsWith({
		check: "string_format",
		format: "starts_with",
		...normalizeParams(params),
		prefix
	});
}
// @__NO_SIDE_EFFECTS__
function _endsWith(suffix, params) {
	return new $ZodCheckEndsWith({
		check: "string_format",
		format: "ends_with",
		...normalizeParams(params),
		suffix
	});
}
// @__NO_SIDE_EFFECTS__
function _overwrite(tx) {
	return new $ZodCheckOverwrite({
		check: "overwrite",
		tx
	});
}
// @__NO_SIDE_EFFECTS__
function _normalize(form) {
	return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
}
// @__NO_SIDE_EFFECTS__
function _trim() {
	return /* @__PURE__ */ _overwrite((input) => input.trim());
}
// @__NO_SIDE_EFFECTS__
function _toLowerCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _toUpperCase() {
	return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _slugify() {
	return /* @__PURE__ */ _overwrite((input) => slugify(input));
}
// @__NO_SIDE_EFFECTS__
function _array(Class, element, params) {
	return new Class({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
// @__NO_SIDE_EFFECTS__
function _custom(Class, fn, _params) {
	const norm = normalizeParams(_params);
	norm.abort ?? (norm.abort = true);
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...norm
	});
}
// @__NO_SIDE_EFFECTS__
function _refine(Class, fn, _params) {
	return new Class({
		type: "custom",
		check: "custom",
		fn,
		...normalizeParams(_params)
	});
}
// @__NO_SIDE_EFFECTS__
function _superRefine(fn, params) {
	const ch = /* @__PURE__ */ _check((payload) => {
		payload.addIssue = (issue$2) => {
			if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
			else {
				const _issue = issue$2;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = ch);
				_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
				payload.issues.push(issue(_issue));
			}
		};
		return fn(payload.value, payload);
	}, params);
	return ch;
}
// @__NO_SIDE_EFFECTS__
function _check(fn, params) {
	const ch = new $ZodCheck({
		check: "custom",
		...normalizeParams(params)
	});
	ch._zod.check = fn;
	return ch;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
	let target = params?.target ?? "draft-2020-12";
	if (target === "draft-4") target = "draft-04";
	if (target === "draft-7") target = "draft-07";
	return {
		processors: params.processors ?? {},
		metadataRegistry: params?.metadata ?? globalRegistry,
		target,
		unrepresentable: params?.unrepresentable ?? "throw",
		override: params?.override ?? (() => {}),
		io: params?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: params?.cycles ?? "ref",
		reused: params?.reused ?? "inline",
		external: params?.external ?? void 0
	};
}
function process(schema, ctx, _params = {
	path: [],
	schemaPath: []
}) {
	var _a;
	const def = schema._zod.def;
	const seen = ctx.seen.get(schema);
	if (seen) {
		seen.count++;
		if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
		return seen.schema;
	}
	const result = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: _params.path
	};
	ctx.seen.set(schema, result);
	const overrideSchema = schema._zod.toJSONSchema?.();
	if (overrideSchema) result.schema = overrideSchema;
	else {
		const params = {
			..._params,
			schemaPath: [..._params.schemaPath, schema],
			path: _params.path
		};
		if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
		else {
			const _json = result.schema;
			const processor = ctx.processors[def.type];
			if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
			processor(schema, ctx, _json, params);
		}
		const parent = schema._zod.parent;
		if (parent) {
			if (!result.ref) result.ref = parent;
			process(parent, ctx, params);
			ctx.seen.get(parent).isParent = true;
		}
	}
	const meta = ctx.metadataRegistry.get(schema);
	if (meta) Object.assign(result.schema, meta);
	if (ctx.io === "input" && isTransforming(schema)) {
		delete result.schema.examples;
		delete result.schema.default;
	}
	if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
	delete result.schema._prefault;
	return ctx.seen.get(schema).schema;
}
function extractDefs(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const idToSchema = /* @__PURE__ */ new Map();
	for (const entry of ctx.seen.entries()) {
		const id = ctx.metadataRegistry.get(entry[0])?.id;
		if (id) {
			const existing = idToSchema.get(id);
			if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			idToSchema.set(id, entry[0]);
		}
	}
	const makeURI = (entry) => {
		const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
		if (ctx.external) {
			const externalId = ctx.external.registry.get(entry[0])?.id;
			const uriGenerator = ctx.external.uri ?? ((id) => id);
			if (externalId) return { ref: uriGenerator(externalId) };
			const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
			entry[1].defId = id;
			return {
				defId: id,
				ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
			};
		}
		if (entry[1] === root) return { ref: "#" };
		const defUriPrefix = `#/${defsSegment}/`;
		const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
		return {
			defId,
			ref: defUriPrefix + defId
		};
	};
	const extractToDef = (entry) => {
		if (entry[1].schema.$ref) return;
		const seen = entry[1];
		const { ref, defId } = makeURI(entry);
		seen.def = { ...seen.schema };
		if (defId) seen.defId = defId;
		const schema = seen.schema;
		for (const key in schema) delete schema[key];
		schema.$ref = ref;
	};
	if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (schema === entry[0]) {
			extractToDef(entry);
			continue;
		}
		if (ctx.external) {
			const ext = ctx.external.registry.get(entry[0])?.id;
			if (schema !== entry[0] && ext) {
				extractToDef(entry);
				continue;
			}
		}
		if (ctx.metadataRegistry.get(entry[0])?.id) {
			extractToDef(entry);
			continue;
		}
		if (seen.cycle) {
			extractToDef(entry);
			continue;
		}
		if (seen.count > 1) {
			if (ctx.reused === "ref") {
				extractToDef(entry);
				continue;
			}
		}
	}
}
function finalize(ctx, schema) {
	const root = ctx.seen.get(schema);
	if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
	const flattenRef = (zodSchema) => {
		const seen = ctx.seen.get(zodSchema);
		if (seen.ref === null) return;
		const schema = seen.def ?? seen.schema;
		const _cached = { ...schema };
		const ref = seen.ref;
		seen.ref = null;
		if (ref) {
			flattenRef(ref);
			const refSeen = ctx.seen.get(ref);
			const refSchema = refSeen.schema;
			if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
				schema.allOf = schema.allOf ?? [];
				schema.allOf.push(refSchema);
			} else Object.assign(schema, refSchema);
			Object.assign(schema, _cached);
			if (zodSchema._zod.parent === ref) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (!(key in _cached)) delete schema[key];
			}
			if (refSchema.$ref && refSeen.def) for (const key in schema) {
				if (key === "$ref" || key === "allOf") continue;
				if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
			}
		}
		const parent = zodSchema._zod.parent;
		if (parent && parent !== ref) {
			flattenRef(parent);
			const parentSeen = ctx.seen.get(parent);
			if (parentSeen?.schema.$ref) {
				schema.$ref = parentSeen.schema.$ref;
				if (parentSeen.def) for (const key in schema) {
					if (key === "$ref" || key === "allOf") continue;
					if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
				}
			}
		}
		ctx.override({
			zodSchema,
			jsonSchema: schema,
			path: seen.path ?? []
		});
	};
	for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
	const result = {};
	if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
	else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
	else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
	else if (ctx.target === "openapi-3.0") {}
	if (ctx.external?.uri) {
		const id = ctx.external.registry.get(schema)?.id;
		if (!id) throw new Error("Schema is missing an `id` property");
		result.$id = ctx.external.uri(id);
	}
	Object.assign(result, root.def ?? root.schema);
	const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
	if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
	const defs = ctx.external?.defs ?? {};
	for (const entry of ctx.seen.entries()) {
		const seen = entry[1];
		if (seen.def && seen.defId) {
			if (seen.def.id === seen.defId) delete seen.def.id;
			defs[seen.defId] = seen.def;
		}
	}
	if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
	else result.definitions = defs;
	try {
		const finalized = JSON.parse(JSON.stringify(result));
		Object.defineProperty(finalized, "~standard", {
			value: {
				...schema["~standard"],
				jsonSchema: {
					input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
					output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
				}
			},
			enumerable: false,
			writable: false
		});
		return finalized;
	} catch (_err) {
		throw new Error("Error converting schema to JSON.");
	}
}
function isTransforming(_schema, _ctx) {
	const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
	if (ctx.seen.has(_schema)) return false;
	ctx.seen.add(_schema);
	const def = _schema._zod.def;
	if (def.type === "transform") return true;
	if (def.type === "array") return isTransforming(def.element, ctx);
	if (def.type === "set") return isTransforming(def.valueType, ctx);
	if (def.type === "lazy") return isTransforming(def.getter(), ctx);
	if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
	if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
	if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
	if (def.type === "pipe") {
		if (_schema._zod.traits.has("$ZodCodec")) return true;
		return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
	}
	if (def.type === "object") {
		for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
		return false;
	}
	if (def.type === "union") {
		for (const option of def.options) if (isTransforming(option, ctx)) return true;
		return false;
	}
	if (def.type === "tuple") {
		for (const item of def.items) if (isTransforming(item, ctx)) return true;
		if (def.rest && isTransforming(def.rest, ctx)) return true;
		return false;
	}
	return false;
}
/**
* Creates a toJSONSchema method for a schema instance.
* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
*/
const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
	const ctx = initializeContext({
		...params,
		processors
	});
	process(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
	const { libraryOptions, target } = params ?? {};
	const ctx = initializeContext({
		...libraryOptions ?? {},
		target,
		io,
		processors
	});
	process(schema, ctx);
	extractDefs(ctx, schema);
	return finalize(ctx, schema);
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
const formatMap = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
};
const stringProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	json.type = "string";
	const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
	if (typeof minimum === "number") json.minLength = minimum;
	if (typeof maximum === "number") json.maxLength = maximum;
	if (format) {
		json.format = formatMap[format] ?? format;
		if (json.format === "") delete json.format;
		if (format === "time") delete json.format;
	}
	if (contentEncoding) json.contentEncoding = contentEncoding;
	if (patterns && patterns.size > 0) {
		const regexes = [...patterns];
		if (regexes.length === 1) json.pattern = regexes[0].source;
		else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
			...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: regex.source
		}))];
	}
};
const numberProcessor = (schema, ctx, _json, _params) => {
	const json = _json;
	const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
	if (typeof format === "string" && format.includes("int")) json.type = "integer";
	else json.type = "number";
	const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
	const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
	const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
	if (exMin) if (legacy) {
		json.minimum = exclusiveMinimum;
		json.exclusiveMinimum = true;
	} else json.exclusiveMinimum = exclusiveMinimum;
	else if (typeof minimum === "number") json.minimum = minimum;
	if (exMax) if (legacy) {
		json.maximum = exclusiveMaximum;
		json.exclusiveMaximum = true;
	} else json.exclusiveMaximum = exclusiveMaximum;
	else if (typeof maximum === "number") json.maximum = maximum;
	if (typeof multipleOf === "number") json.multipleOf = multipleOf;
};
const booleanProcessor = (_schema, _ctx, json, _params) => {
	json.type = "boolean";
};
const neverProcessor = (_schema, _ctx, json, _params) => {
	json.not = {};
};
const enumProcessor = (schema, _ctx, json, _params) => {
	const def = schema._zod.def;
	const values = getEnumValues(def.entries);
	if (values.every((v) => typeof v === "number")) json.type = "number";
	if (values.every((v) => typeof v === "string")) json.type = "string";
	json.enum = values;
};
const literalProcessor = (schema, ctx, json, _params) => {
	const def = schema._zod.def;
	const vals = [];
	for (const val of def.values) if (val === void 0) {
		if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
	} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
	else vals.push(Number(val));
	else vals.push(val);
	if (vals.length === 0) {} else if (vals.length === 1) {
		const val = vals[0];
		json.type = val === null ? "null" : typeof val;
		if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
		else json.const = val;
	} else {
		if (vals.every((v) => typeof v === "number")) json.type = "number";
		if (vals.every((v) => typeof v === "string")) json.type = "string";
		if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
		if (vals.every((v) => v === null)) json.type = "null";
		json.enum = vals;
	}
};
const customProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
};
const transformProcessor = (_schema, ctx, _json, _params) => {
	if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
};
const arrayProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	const { minimum, maximum } = schema._zod.bag;
	if (typeof minimum === "number") json.minItems = minimum;
	if (typeof maximum === "number") json.maxItems = maximum;
	json.type = "array";
	json.items = process(def.element, ctx, {
		...params,
		path: [...params.path, "items"]
	});
};
const objectProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	json.properties = {};
	const shape = def.shape;
	for (const key in shape) json.properties[key] = process(shape[key], ctx, {
		...params,
		path: [
			...params.path,
			"properties",
			key
		]
	});
	const allKeys = new Set(Object.keys(shape));
	const requiredKeys = new Set([...allKeys].filter((key) => {
		const v = def.shape[key]._zod;
		if (ctx.io === "input") return v.optin === void 0;
		else return v.optout === void 0;
	}));
	if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
	if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
	else if (!def.catchall) {
		if (ctx.io === "output") json.additionalProperties = false;
	} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
		...params,
		path: [...params.path, "additionalProperties"]
	});
};
const unionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const isExclusive = def.inclusive === false;
	const options = def.options.map((x, i) => process(x, ctx, {
		...params,
		path: [
			...params.path,
			isExclusive ? "oneOf" : "anyOf",
			i
		]
	}));
	if (isExclusive) json.oneOf = options;
	else json.anyOf = options;
};
const intersectionProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const a = process(def.left, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			0
		]
	});
	const b = process(def.right, ctx, {
		...params,
		path: [
			...params.path,
			"allOf",
			1
		]
	});
	const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
	json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
};
const recordProcessor = (schema, ctx, _json, params) => {
	const json = _json;
	const def = schema._zod.def;
	json.type = "object";
	const keyType = def.keyType;
	const patterns = keyType._zod.bag?.patterns;
	if (def.mode === "loose" && patterns && patterns.size > 0) {
		const valueSchema = process(def.valueType, ctx, {
			...params,
			path: [
				...params.path,
				"patternProperties",
				"*"
			]
		});
		json.patternProperties = {};
		for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
	} else {
		if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = process(def.keyType, ctx, {
			...params,
			path: [...params.path, "propertyNames"]
		});
		json.additionalProperties = process(def.valueType, ctx, {
			...params,
			path: [...params.path, "additionalProperties"]
		});
	}
	const keyValues = keyType._zod.values;
	if (keyValues) {
		const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
		if (validKeyValues.length > 0) json.required = validKeyValues;
	}
};
const nullableProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	const inner = process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	if (ctx.target === "openapi-3.0") {
		seen.ref = def.innerType;
		json.nullable = true;
	} else json.anyOf = [inner, { type: "null" }];
};
const nonoptionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const defaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
const prefaultProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
const catchProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	let catchValue;
	try {
		catchValue = def.catchValue(void 0);
	} catch {
		throw new Error("Dynamic catch values are not supported in JSON Schema");
	}
	json.default = catchValue;
};
const pipeProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	const inIsTransform = def.in._zod.traits.has("$ZodTransform");
	const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
	process(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
const readonlyProcessor = (schema, ctx, json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
	json.readOnly = true;
};
const optionalProcessor = (schema, ctx, _json, params) => {
	const def = schema._zod.def;
	process(def.innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = def.innerType;
};
const lazyProcessor = (schema, ctx, _json, params) => {
	const innerType = schema._zod.innerType;
	process(innerType, ctx, params);
	const seen = ctx.seen.get(schema);
	seen.ref = innerType;
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function datetime(params) {
	return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
	$ZodISODate.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function date(params) {
	return /* @__PURE__ */ _isoDate(ZodISODate, params);
}
const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
	$ZodISOTime.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function time(params) {
	return /* @__PURE__ */ _isoTime(ZodISOTime, params);
}
const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
	$ZodISODuration.init(inst, def);
	ZodStringFormat.init(inst, def);
});
function duration(params) {
	return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
const initializer = (inst, issues) => {
	$ZodError.init(inst, issues);
	inst.name = "ZodError";
	Object.defineProperties(inst, {
		format: { value: (mapper) => formatError(inst, mapper) },
		flatten: { value: (mapper) => flattenError(inst, mapper) },
		addIssue: { value: (issue) => {
			inst.issues.push(issue);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		addIssues: { value: (issues) => {
			inst.issues.push(...issues);
			inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
		} },
		isEmpty: { get() {
			return inst.issues.length === 0;
		} }
	});
};
const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
const parse = /* @__PURE__ */ _parse(ZodRealError);
const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
const encode = /* @__PURE__ */ _encode(ZodRealError);
const decode = /* @__PURE__ */ _decode(ZodRealError);
const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
//#endregion
//#region ../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
const _installedGroups = /* @__PURE__ */ new WeakMap();
function _installLazyMethods(inst, group, methods) {
	const proto = Object.getPrototypeOf(inst);
	let installed = _installedGroups.get(proto);
	if (!installed) {
		installed = /* @__PURE__ */ new Set();
		_installedGroups.set(proto, installed);
	}
	if (installed.has(group)) return;
	installed.add(group);
	for (const key in methods) {
		const fn = methods[key];
		Object.defineProperty(proto, key, {
			configurable: true,
			enumerable: false,
			get() {
				const bound = fn.bind(this);
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: bound
				});
				return bound;
			},
			set(v) {
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: v
				});
			}
		});
	}
}
const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
	$ZodType.init(inst, def);
	Object.assign(inst["~standard"], { jsonSchema: {
		input: createStandardJSONSchemaMethod(inst, "input"),
		output: createStandardJSONSchemaMethod(inst, "output")
	} });
	inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
	inst.def = def;
	inst.type = def.type;
	Object.defineProperty(inst, "_def", { value: def });
	inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
	inst.safeParse = (data, params) => safeParse(inst, data, params);
	inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
	inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
	inst.spa = inst.safeParseAsync;
	inst.encode = (data, params) => encode(inst, data, params);
	inst.decode = (data, params) => decode(inst, data, params);
	inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
	inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
	inst.safeEncode = (data, params) => safeEncode(inst, data, params);
	inst.safeDecode = (data, params) => safeDecode(inst, data, params);
	inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
	inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
	_installLazyMethods(inst, "ZodType", {
		check(...chks) {
			const def = this.def;
			return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)] }), { parent: true });
		},
		with(...chks) {
			return this.check(...chks);
		},
		clone(def, params) {
			return clone(this, def, params);
		},
		brand() {
			return this;
		},
		register(reg, meta) {
			reg.add(this, meta);
			return this;
		},
		refine(check, params) {
			return this.check(refine(check, params));
		},
		superRefine(refinement, params) {
			return this.check(superRefine(refinement, params));
		},
		overwrite(fn) {
			return this.check(/* @__PURE__ */ _overwrite(fn));
		},
		optional() {
			return optional(this);
		},
		exactOptional() {
			return exactOptional(this);
		},
		nullable() {
			return nullable(this);
		},
		nullish() {
			return optional(nullable(this));
		},
		nonoptional(params) {
			return nonoptional(this, params);
		},
		array() {
			return array(this);
		},
		or(arg) {
			return union([this, arg]);
		},
		and(arg) {
			return intersection(this, arg);
		},
		transform(tx) {
			return pipe(this, transform(tx));
		},
		default(d) {
			return _default(this, d);
		},
		prefault(d) {
			return prefault(this, d);
		},
		catch(params) {
			return _catch(this, params);
		},
		pipe(target) {
			return pipe(this, target);
		},
		readonly() {
			return readonly(this);
		},
		describe(description) {
			const cl = this.clone();
			globalRegistry.add(cl, { description });
			return cl;
		},
		meta(...args) {
			if (args.length === 0) return globalRegistry.get(this);
			const cl = this.clone();
			globalRegistry.add(cl, args[0]);
			return cl;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(fn) {
			return fn(this);
		}
	});
	Object.defineProperty(inst, "description", {
		get() {
			return globalRegistry.get(inst)?.description;
		},
		configurable: true
	});
	return inst;
});
/** @internal */
const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
	const bag = inst._zod.bag;
	inst.format = bag.format ?? null;
	inst.minLength = bag.minimum ?? null;
	inst.maxLength = bag.maximum ?? null;
	_installLazyMethods(inst, "_ZodString", {
		regex(...args) {
			return this.check(/* @__PURE__ */ _regex(...args));
		},
		includes(...args) {
			return this.check(/* @__PURE__ */ _includes(...args));
		},
		startsWith(...args) {
			return this.check(/* @__PURE__ */ _startsWith(...args));
		},
		endsWith(...args) {
			return this.check(/* @__PURE__ */ _endsWith(...args));
		},
		min(...args) {
			return this.check(/* @__PURE__ */ _minLength(...args));
		},
		max(...args) {
			return this.check(/* @__PURE__ */ _maxLength(...args));
		},
		length(...args) {
			return this.check(/* @__PURE__ */ _length(...args));
		},
		nonempty(...args) {
			return this.check(/* @__PURE__ */ _minLength(1, ...args));
		},
		lowercase(params) {
			return this.check(/* @__PURE__ */ _lowercase(params));
		},
		uppercase(params) {
			return this.check(/* @__PURE__ */ _uppercase(params));
		},
		trim() {
			return this.check(/* @__PURE__ */ _trim());
		},
		normalize(...args) {
			return this.check(/* @__PURE__ */ _normalize(...args));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ _toLowerCase());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ _toUpperCase());
		},
		slugify() {
			return this.check(/* @__PURE__ */ _slugify());
		}
	});
});
const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
	$ZodString.init(inst, def);
	_ZodString.init(inst, def);
	inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
	inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
	inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
	inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
	inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
	inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
	inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
	inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
	inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
	inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
	inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
	inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
	inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
	inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
	inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
	inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
	inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
	inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
	inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
	inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
	inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
	inst.datetime = (params) => inst.check(datetime(params));
	inst.date = (params) => inst.check(date(params));
	inst.time = (params) => inst.check(time(params));
	inst.duration = (params) => inst.check(duration(params));
});
function string(params) {
	return /* @__PURE__ */ _string(ZodString, params);
}
const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	_ZodString.init(inst, def);
});
const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
	$ZodEmail.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
	$ZodGUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
	$ZodUUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
	$ZodURL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
	$ZodEmoji.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
	$ZodNanoID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
/**
* @deprecated CUID v1 is deprecated by its authors due to information leakage
* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
* See https://github.com/paralleldrive/cuid.
*/
const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
	$ZodCUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
	$ZodCUID2.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
	$ZodULID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
	$ZodXID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
	$ZodKSUID.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
	$ZodIPv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
	$ZodIPv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
	$ZodCIDRv4.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
	$ZodCIDRv6.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
	$ZodBase64.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
	$ZodBase64URL.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
	$ZodE164.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
	$ZodJWT.init(inst, def);
	ZodStringFormat.init(inst, def);
});
const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
	_installLazyMethods(inst, "ZodNumber", {
		gt(value, params) {
			return this.check(/* @__PURE__ */ _gt(value, params));
		},
		gte(value, params) {
			return this.check(/* @__PURE__ */ _gte(value, params));
		},
		min(value, params) {
			return this.check(/* @__PURE__ */ _gte(value, params));
		},
		lt(value, params) {
			return this.check(/* @__PURE__ */ _lt(value, params));
		},
		lte(value, params) {
			return this.check(/* @__PURE__ */ _lte(value, params));
		},
		max(value, params) {
			return this.check(/* @__PURE__ */ _lte(value, params));
		},
		int(params) {
			return this.check(int(params));
		},
		safe(params) {
			return this.check(int(params));
		},
		positive(params) {
			return this.check(/* @__PURE__ */ _gt(0, params));
		},
		nonnegative(params) {
			return this.check(/* @__PURE__ */ _gte(0, params));
		},
		negative(params) {
			return this.check(/* @__PURE__ */ _lt(0, params));
		},
		nonpositive(params) {
			return this.check(/* @__PURE__ */ _lte(0, params));
		},
		multipleOf(value, params) {
			return this.check(/* @__PURE__ */ _multipleOf(value, params));
		},
		step(value, params) {
			return this.check(/* @__PURE__ */ _multipleOf(value, params));
		},
		finite() {
			return this;
		}
	});
	const bag = inst._zod.bag;
	inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
	inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
	inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
	inst.isFinite = true;
	inst.format = bag.format ?? null;
});
function number(params) {
	return /* @__PURE__ */ _number(ZodNumber, params);
}
const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodNumber.init(inst, def);
});
function int(params) {
	return /* @__PURE__ */ _int(ZodNumberFormat, params);
}
const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean(params) {
	return /* @__PURE__ */ _boolean(ZodBoolean, params);
}
const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => void 0;
});
function unknown() {
	return /* @__PURE__ */ _unknown(ZodUnknown);
}
const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
	$ZodNever.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
	return /* @__PURE__ */ _never(ZodNever, params);
}
const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
	inst.element = def.element;
	_installLazyMethods(inst, "ZodArray", {
		min(n, params) {
			return this.check(/* @__PURE__ */ _minLength(n, params));
		},
		nonempty(params) {
			return this.check(/* @__PURE__ */ _minLength(1, params));
		},
		max(n, params) {
			return this.check(/* @__PURE__ */ _maxLength(n, params));
		},
		length(n, params) {
			return this.check(/* @__PURE__ */ _length(n, params));
		},
		unwrap() {
			return this.element;
		}
	});
});
function array(element, params) {
	return /* @__PURE__ */ _array(ZodArray, element, params);
}
const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
	$ZodObjectJIT.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
	defineLazy(inst, "shape", () => {
		return def.shape;
	});
	_installLazyMethods(inst, "ZodObject", {
		keyof() {
			return _enum(Object.keys(this._zod.def.shape));
		},
		catchall(catchall) {
			return this.clone({
				...this._zod.def,
				catchall
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: unknown()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: unknown()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: never()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(incoming) {
			return extend(this, incoming);
		},
		safeExtend(incoming) {
			return safeExtend(this, incoming);
		},
		merge(other) {
			return merge(this, other);
		},
		pick(mask) {
			return pick(this, mask);
		},
		omit(mask) {
			return omit(this, mask);
		},
		partial(...args) {
			return partial(ZodOptional, this, args[0]);
		},
		required(...args) {
			return required(ZodNonOptional, this, args[0]);
		}
	});
});
function object(shape, params) {
	const def = {
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	};
	return new ZodObject(def);
}
function looseObject(shape, params) {
	return new ZodObject({
		type: "object",
		shape,
		catchall: unknown(),
		...normalizeParams(params)
	});
}
const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
	inst.options = def.options;
});
function union(options, params) {
	return new ZodUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
const ZodDiscriminatedUnion = /*@__PURE__*/ $constructor("ZodDiscriminatedUnion", (inst, def) => {
	ZodUnion.init(inst, def);
	$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
	return new ZodDiscriminatedUnion({
		type: "union",
		options,
		discriminator,
		...normalizeParams(params)
	});
}
const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
	return new ZodIntersection({
		type: "intersection",
		left,
		right
	});
}
const ZodRecord = /*@__PURE__*/ $constructor("ZodRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
	inst.keyType = def.keyType;
	inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
	if (!valueType || !valueType._zod) return new ZodRecord({
		type: "record",
		keyType: string(),
		valueType: keyType,
		...normalizeParams(valueType)
	});
	return new ZodRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
	inst.enum = def.entries;
	inst.options = Object.values(def.entries);
	const keys = new Set(Object.keys(def.entries));
	inst.extract = (values, params) => {
		const newEntries = {};
		for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
	inst.exclude = (values, params) => {
		const newEntries = { ...def.entries };
		for (const value of values) if (keys.has(value)) delete newEntries[value];
		else throw new Error(`Key ${value} not found in enum`);
		return new ZodEnum({
			...def,
			checks: [],
			...normalizeParams(params),
			entries: newEntries
		});
	};
});
function _enum(values, params) {
	const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
	return new ZodEnum({
		type: "enum",
		entries,
		...normalizeParams(params)
	});
}
const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
	inst.values = new Set(def.values);
	Object.defineProperty(inst, "value", { get() {
		if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
		return def.values[0];
	} });
});
function literal(value, params) {
	return new ZodLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
	inst._zod.parse = (payload, _ctx) => {
		if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
		payload.addIssue = (issue$1) => {
			if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
			else {
				const _issue = issue$1;
				if (_issue.fatal) _issue.continue = false;
				_issue.code ?? (_issue.code = "custom");
				_issue.input ?? (_issue.input = payload.value);
				_issue.inst ?? (_issue.inst = inst);
				payload.issues.push(issue(_issue));
			}
		};
		const output = def.transform(payload.value, payload);
		if (output instanceof Promise) return output.then((output) => {
			payload.value = output;
			payload.fallback = true;
			return payload;
		});
		payload.value = output;
		payload.fallback = true;
		return payload;
	};
});
function transform(fn) {
	return new ZodTransform({
		type: "transform",
		transform: fn
	});
}
const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
	return new ZodOptional({
		type: "optional",
		innerType
	});
}
const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
	$ZodExactOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
	return new ZodExactOptional({
		type: "optional",
		innerType
	});
}
const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
	return new ZodNullable({
		type: "nullable",
		innerType
	});
}
const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
	return new ZodDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
	$ZodPrefault.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
	return new ZodPrefault({
		type: "prefault",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
	$ZodNonOptional.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
	return new ZodNonOptional({
		type: "nonoptional",
		innerType,
		...normalizeParams(params)
	});
}
const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
	$ZodCatch.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
	inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
	return new ZodCatch({
		type: "catch",
		innerType,
		catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
	});
}
const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
	inst.in = def.in;
	inst.out = def.out;
});
function pipe(in_, out) {
	return new ZodPipe({
		type: "pipe",
		in: in_,
		out
	});
}
const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
	$ZodReadonly.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
	return new ZodReadonly({
		type: "readonly",
		innerType
	});
}
const ZodLazy = /*@__PURE__*/ $constructor("ZodLazy", (inst, def) => {
	$ZodLazy.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
	inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
	return new ZodLazy({
		type: "lazy",
		getter
	});
}
const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
	$ZodCustom.init(inst, def);
	ZodType.init(inst, def);
	inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function custom(fn, _params) {
	return /* @__PURE__ */ _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
	return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
	return /* @__PURE__ */ _superRefine(fn, params);
}
//#endregion
//#region ../../node_modules/.pnpm/@deepseek-ai+dsh-host-apiproxy@0.1.0-rc.6_8335eca05d5647f26dcc0c8fd5a39ec0/node_modules/@nuaagent/host-apiproxy/lib/types/api/rpc.schema.js
/**
* Message-layer zod schemas: the four wire full forms + error body +
* carrier receipt. The payload slot is unknown in the full-form schemas — business payloads
* get a second parse dispatched by method (two-level parse discipline).
* Brand cast point: rpcIdSchema, and only there.
*/
/**
* RpcId: one brand cast after schema validation (the only cast point in this
* file). No min-length: the id is an opaque echo token, and rejecting values
* here would only turn a correlatable error report into a client-side parse
* failure (the handler substitutes a sentinel when a request's id is unreadable).
*/
const rpcIdSchema = string();
/** Error body: discriminated by code, per-branch details aligned to RpcErrorDetailsMap; details is required. */
const rpcErrorSchema = discriminatedUnion("code", [
	object({
		code: literal("bad-request"),
		message: string(),
		details: object({ issues: array(custom()) })
	}),
	object({
		code: literal("cancelled"),
		message: string(),
		details: object({})
	}),
	object({
		code: literal("session-not-found"),
		message: string(),
		details: object({ sessionId: string() })
	}),
	object({
		code: literal("model-unavailable"),
		message: string(),
		details: object({
			provider: string(),
			model: string()
		})
	}),
	object({
		code: literal("session-conflict"),
		message: string(),
		details: object({
			sessionId: string(),
			requestedCwd: string(),
			existingCwd: string().optional()
		})
	}),
	object({
		code: literal("invalid-time-zone"),
		message: string(),
		details: object({ value: string() })
	}),
	object({
		code: literal("workspace-attach-failed"),
		message: string(),
		details: object({
			sessionId: string(),
			workspaceId: string()
		})
	}),
	object({
		code: literal("workspace-not-found"),
		message: string(),
		details: object({ workspaceId: string() })
	}),
	object({
		code: literal("workspace-invalid-path"),
		message: string(),
		details: object({ path: string() })
	}),
	object({
		code: literal("workspace-name-conflict"),
		message: string(),
		details: object({ name: string() })
	}),
	object({
		code: literal("workspace-move-invalid"),
		message: string(),
		details: object({
			workspaceId: string(),
			sessionId: string(),
			beforeSessionId: string().optional()
		})
	}),
	object({
		code: literal("directory-unreadable"),
		message: string(),
		details: object({ path: string() })
	}),
	object({
		code: literal("directory-exists"),
		message: string(),
		details: object({ path: string() })
	}),
	object({
		code: literal("directory-create-failed"),
		message: string(),
		details: object({ path: string() })
	}),
	object({
		code: literal("directory-picker-unavailable"),
		message: string(),
		details: object({ capability: string() })
	}),
	object({
		code: literal("agent-preset-read-only"),
		message: string(),
		details: object({
			agentPreset: string(),
			reason: string()
		})
	}),
	object({
		code: literal("agent-preset-locked"),
		message: string(),
		details: object({
			sessionId: string(),
			agentPreset: string()
		})
	}),
	object({
		code: literal("agent-preset-conflict"),
		message: string(),
		details: object({
			sessionId: string(),
			requestedPreset: string(),
			existingPreset: string().optional()
		})
	}),
	object({
		code: literal("agent-preset-not-found"),
		message: string(),
		details: object({
			agentPreset: string(),
			available: array(string())
		})
	}),
	object({
		code: literal("agent-preset-invalid"),
		message: string(),
		details: object({
			agentPreset: string(),
			reason: string()
		})
	}),
	object({
		code: literal("agent-busy"),
		message: string(),
		details: object({ reason: string() })
	}),
	object({
		code: literal("attachment-error"),
		message: string(),
		details: object({ reason: string() })
	}),
	object({
		code: literal("queue-item-not-found"),
		message: string(),
		details: object({ itemId: string() })
	}),
	object({
		code: literal("steer-unavailable"),
		message: string(),
		details: object({ itemId: string() })
	}),
	object({
		code: literal("command-error"),
		message: string(),
		details: object({})
	}),
	object({
		code: literal("unknown-command"),
		message: string(),
		details: object({})
	}),
	object({
		code: literal("settings-rejected"),
		message: string(),
		details: object({ ns: string() })
	}),
	object({
		code: literal("settings-not-exposed"),
		message: string(),
		details: object({ ns: string() })
	}),
	object({
		code: literal("settings-conflict"),
		message: string(),
		details: object({
			ns: string(),
			expected: number(),
			actual: number()
		})
	}),
	object({
		code: literal("credential-rejected"),
		message: string(),
		details: object({ ref: string() })
	}),
	object({
		code: literal("model-discovery-failed"),
		message: string(),
		details: object({
			settingsNs: string(),
			baseURL: string().optional()
		})
	}),
	object({
		code: literal("title-invalid"),
		message: string(),
		details: object({ sessionId: string() })
	}),
	object({
		code: literal("fork-unavailable"),
		message: string(),
		details: object({ sessionId: string() })
	}),
	object({
		code: literal("subagent-parent-unavailable"),
		message: string(),
		details: object({ parentSessionId: string() })
	}),
	object({
		code: literal("subagent-not-found"),
		message: string(),
		details: object({
			parentSessionId: string(),
			childSessionId: string()
		})
	}),
	object({
		code: literal("subagent-catalog-diagnostic"),
		message: string(),
		details: object({
			parentSessionId: string(),
			childSessionId: string(),
			reason: union([
				literal("corrupt"),
				literal("unsupported"),
				literal("unavailable")
			])
		})
	}),
	object({
		code: literal("subagent-not-resumable"),
		message: string(),
		details: object({ childSessionId: string() })
	}),
	object({
		code: literal("subagent-unauthorized"),
		message: string(),
		details: object({ childSessionId: string() })
	}),
	object({
		code: literal("subagent-delivery-unavailable"),
		message: string(),
		details: object({ childSessionId: string() })
	}),
	object({
		code: literal("internal"),
		message: string(),
		details: object({})
	})
]);
/**
* Business success/failure result schema (generic, reusable).
* @param value - Schema for the business value.
* @returns Schema for RpcResult<T>.
*/
function rpcResultSchema(value) {
	return union([object({
		ok: literal(true),
		value
	}), object({
		ok: literal(false),
		error: rpcErrorSchema
	})]);
}
/** ClientRequest full form (payload stays wide — the business layer runs the second parse). */
const clientRequestSchema = object({
	type: literal("client-request"),
	rpcId: rpcIdSchema,
	method: string(),
	payload: unknown()
});
/** ServerResponse full form (result.value stays wide). */
const serverResponseSchema = object({
	type: literal("server-response"),
	rpcId: rpcIdSchema,
	result: rpcResultSchema(unknown().optional())
});
/** ServerRequest full form (payload stays wide). */
const serverRequestSchema = object({
	type: literal("server-request"),
	rpcId: rpcIdSchema,
	method: string(),
	payload: unknown()
});
discriminatedUnion("type", [
	clientRequestSchema,
	serverResponseSchema,
	serverRequestSchema,
	object({
		type: literal("client-response"),
		rpcId: rpcIdSchema,
		result: rpcResultSchema(unknown().optional())
	})
]);
union([object({ accepted: literal(true) }), object({
	accepted: literal(false),
	reason: union([literal("not-pending"), literal("bad-response")])
})]);
//#endregion
//#region ../../node_modules/.pnpm/@deepseek-ai+dsh-host-apiproxy@0.1.0-rc.6_8335eca05d5647f26dcc0c8fd5a39ec0/node_modules/@nuaagent/host-apiproxy/lib/types/api/session-search.js
/**
* Return the longest prefix containing at most `maximum` Unicode code points.
* @param value - text to bound.
* @param maximum - non-negative code-point limit.
* @returns `value` unchanged when it fits, otherwise a code-point-safe prefix.
*/
function truncateUnicodeCodePoints(value, maximum) {
	let count = 0;
	let end = 0;
	for (const codePoint of value) {
		if (count === maximum) return value.slice(0, end);
		count++;
		end += codePoint.length;
	}
	return value;
}
//#endregion
//#region ../../node_modules/.pnpm/@deepseek-ai+dsh-host-apiproxy@0.1.0-rc.6_8335eca05d5647f26dcc0c8fd5a39ec0/node_modules/@nuaagent/host-apiproxy/lib/types/api/sessions.schema.js
/**
* sessions domain zod schemas (names derived from map keys: sessionListRequestSchema /
* sessionListValueSchema). SessionEvent passthrough = strict envelope (type/seq/time) + wide
* data: the merge-extensible event API keeps an unknown-type branch at the union level,
* with no field-level passthrough. SessionId brand cast point: sessionIdSchema, and only there.
*/
/** SessionId: one brand cast after schema validation (the only cast point in this domain). */
const sessionIdSchema = string().min(1);
/** MessageId: one brand cast after non-empty string validation. */
const messageIdSchema = string().min(1);
/**
* WorkspaceId: the workspace domain's one brand cast. Hosted here rather
* than in workspace.schema because session.create references it while
* workspace.schema references sessionIdSchema — schema modules must stay a
* DAG (both casts used at module top level; a cycle is a load-time TDZ).
*/
const workspaceIdSchema = string().min(1);
/** SessionEvent passthrough: strict envelope, wide data (the client fold handles unknown types via its documented default). */
const sessionEventSchema = object({
	type: string(),
	seq: number().int().nonnegative(),
	time: number(),
	data: unknown(),
	sourceEventSeqs: array(number()).optional(),
	surfaceOp: unknown().optional(),
	ignorable: literal(true).optional()
});
/** SessionSummary row of session.list (`projections` reuses the history block's shape and schema). */
const sessionSummarySchema = object({
	sessionId: sessionIdSchema,
	updatedAt: number(),
	running: boolean(),
	blank: boolean(),
	parentSessionId: sessionIdSchema.optional(),
	origin: literal("subagent").optional(),
	cwd: string().optional(),
	agentPreset: string().optional(),
	projections: lazy(() => sessionProjectionsBlockSchema).optional()
});
object({ cursor: string().optional() });
object({ items: array(sessionSummarySchema) });
object({ query: string().trim().min(1).max(500).refine((query) => !query.includes("\0"), { message: "search query must not contain NUL" }) });
object({
	items: array(object({
		sessionId: sessionIdSchema,
		snippet: string().refine((snippet) => truncateUnicodeCodePoints(snippet, 240) === snippet, { message: `search snippet must contain at most 240 Unicode code points` })
	})).max(20),
	hasMore: boolean()
});
object({
	workspaceId: workspaceIdSchema.optional(),
	cwd: string().optional(),
	sessionId: sessionIdSchema.optional(),
	agentPreset: string().optional()
}).refine((payload) => payload.workspaceId === void 0 || payload.cwd === void 0, { message: "session.create accepts workspaceId or cwd, not both" });
object({
	sessionId: sessionIdSchema,
	agentPreset: string().optional()
});
object({
	sessionId: sessionIdSchema,
	title: string()
});
object({
	title: string().min(1),
	seq: number().int().nonnegative()
});
object({
	sessionId: sessionIdSchema,
	atSeq: number().int().nonnegative().optional()
});
object({ sessionId: sessionIdSchema });
object({
	sessionId: sessionIdSchema,
	beforeSeq: number().int().nonnegative().optional(),
	maxMessages: number().int().positive().optional()
});
/** Complete provider/model selection. */
const modelSelectionSchema = object({
	provider: string().min(1),
	model: string().min(1),
	reasoningEffort: string().min(1).optional()
});
/** Exact-model reasoning metadata. */
const modelReasoningSchema = object({
	efforts: array(object({
		id: string().min(1),
		name: string().min(1),
		description: string().optional()
	})).min(1),
	defaultEffort: string().min(1).optional()
});
/** One advisory model entry inside a provider group. */
const modelCatalogModelSchema = object({
	id: string().min(1),
	name: string().min(1),
	description: string().optional(),
	reasoning: modelReasoningSchema.optional()
});
/** One successfully loaded provider group. */
const modelProviderGroupSchema = object({
	id: string().min(1),
	name: string().min(1),
	models: array(modelCatalogModelSchema)
});
/** One provider-local catalog failure. */
const modelCatalogFailureSchema = object({
	id: string().min(1),
	name: string().min(1),
	message: string()
});
/**
* ToolEventView passthrough: lock only the `for` discriminant and the presence
* of a card-tagged `view` object. The view interior is a host-computed product
* the client reads without echoing back; deep-validating it would hand-copy
* the dsh-tools vocabulary into this schema and drift with it.
*/
const toolEventViewSchema = discriminatedUnion("for", [object({
	for: literal("call"),
	view: looseObject({ card: string() })
}), object({
	for: literal("result"),
	view: looseObject({ card: string() })
})]);
/** One session.history item: the session event plus its optional host-computed tool view. */
const historyEntrySchema = object({
	event: sessionEventSchema,
	view: toolEventViewSchema.optional()
});
/**
* Projection baseline passthrough: `values` stays a wide record — each value
* was already parsed by its provider's own schema on the host side, and
* deep-validating here would import every domain's schema into the carrier.
*/
const sessionProjectionsBlockSchema = object({
	asOfSeq: number().int().min(-1),
	values: record(string(), unknown())
});
object({
	blank: boolean(),
	lastPromptAt: number().nullable()
});
object({
	maxImageBytes: number().int().positive(),
	maxImagesPerMessage: number().int().positive(),
	maxMessageImageBytes: number().int().positive(),
	maxImagePixels: number().int().positive(),
	mediaTypes: array(string())
});
object({
	events: array(historyEntrySchema),
	hasMore: boolean(),
	projections: sessionProjectionsBlockSchema.optional()
});
object({ sessionId: sessionIdSchema });
object({
	current: modelSelectionSchema,
	routable: boolean(),
	groups: array(modelProviderGroupSchema),
	failures: array(modelCatalogFailureSchema)
});
object({
	sessionId: sessionIdSchema,
	provider: string().min(1),
	model: string().min(1),
	reasoningEffort: string().min(1).optional()
});
object({ selected: modelSelectionSchema });
/** ContentBlock passthrough: core is merge-extensible — the type discriminant envelope is strict, the rest stays wide. */
const contentBlockSchema = looseObject({ type: string() });
/** Raster image media types accepted by the version-one browser wire. */
const imageMediaTypeSchema = union([
	literal("image/png"),
	literal("image/jpeg"),
	literal("image/webp"),
	literal("image/gif")
]);
/** Prompt wire content is intentionally narrower than merge-extensible durable core content. */
const promptContentPartSchema = discriminatedUnion("type", [object({
	type: literal("text"),
	text: string()
}), object({
	type: literal("image"),
	mediaType: imageMediaTypeSchema,
	data: string(),
	name: string().optional()
})]);
object({
	sessionId: sessionIdSchema,
	mode: union([literal("queue"), literal("steer")]),
	content: array(promptContentPartSchema),
	clientTimeZone: string().optional()
});
object({
	accepted: literal(true),
	command: object({
		kind: literal("success"),
		text: string().optional()
	}).optional()
});
/** Opaque attachment id after string-shape validation. */
const attachmentIdSchema = string().min(1);
/** Durable image reference returned from the authenticated session lookup. */
const imageAttachmentRefSchema = object({
	attachmentId: attachmentIdSchema,
	mediaType: imageMediaTypeSchema,
	bytes: number().int().positive(),
	width: number().int().positive(),
	height: number().int().positive(),
	name: string().optional()
});
object({
	sessionId: sessionIdSchema,
	attachmentId: attachmentIdSchema
});
object({
	attachment: imageAttachmentRefSchema,
	data: string()
});
object({
	sessionId: sessionIdSchema,
	itemId: messageIdSchema,
	action: discriminatedUnion("kind", [
		object({
			kind: literal("edit"),
			content: array(contentBlockSchema)
		}),
		object({ kind: literal("remove") }),
		object({ kind: literal("steer") })
	])
});
object({ accepted: literal(true) });
object({ sessionId: sessionIdSchema });
object({ accepted: literal(true) });
//#endregion
//#region ../../node_modules/.pnpm/@deepseek-ai+dsh-host-apiproxy@0.1.0-rc.6_8335eca05d5647f26dcc0c8fd5a39ec0/node_modules/@nuaagent/host-apiproxy/lib/types/api/approvals.schema.js
/**
* approvals domain zod schemas (respond is a client-response; the payload schema serves
* the /api/respond endpoint's second parse after routing via the pending table).
* ApprovalRequestId brand cast point: one.
*/
/** ApprovalRequestId: one brand cast after schema validation (the only cast point in this domain). */
const approvalRequestIdSchema = string().min(1);
object({
	sessionId: sessionIdSchema,
	approvalId: approvalRequestIdSchema,
	outcome: union([literal("allowed-once"), literal("rejected")])
});
/**
* One wire task view. `kind` stays an open string because producer plugins
* extend the registry's kind map by declaration merging, so the closed set is
* not knowable at this boundary.
*/
const taskViewSchema = object({
	id: string().min(1),
	kind: string().min(1),
	label: string().min(1),
	status: union([
		literal("running"),
		literal("stopping"),
		literal("completed"),
		literal("killed"),
		literal("failed")
	]),
	detail: string().optional(),
	startedAt: number().int().nonnegative(),
	finishedAt: number().int().nonnegative().optional()
});
//#endregion
//#region ../../node_modules/.pnpm/@deepseek-ai+dsh-host-apiproxy@0.1.0-rc.6_8335eca05d5647f26dcc0c8fd5a39ec0/node_modules/@nuaagent/host-apiproxy/lib/types/api/workspace.schema.js
/**
* workspace domain zod schemas (names derived from map keys). The
* WorkspaceId brand cast lives in sessions.schema (see the note there) and
* is re-exported here as the domain-local name.
*/
/** WorkspaceView row of every workspace.* response. */
const workspaceViewSchema = object({
	workspaceId: workspaceIdSchema,
	path: string(),
	title: string(),
	sessionIds: array(sessionIdSchema),
	createdAt: string(),
	updatedAt: string()
});
object({});
object({
	items: array(workspaceViewSchema),
	archivedSessionIds: array(sessionIdSchema)
});
object({ path: string() });
object({
	workspace: workspaceViewSchema,
	created: boolean()
});
object({
	workspaceId: workspaceIdSchema,
	title: string()
}).refine((payload) => payload.title.trim() !== "", { message: "workspace.rename requires a non-blank title" });
object({ workspace: workspaceViewSchema });
object({ workspaceId: workspaceIdSchema });
object({ deleted: literal(true) });
object({
	workspaceId: workspaceIdSchema,
	beforeWorkspaceId: workspaceIdSchema.optional()
});
object({ workspaceIds: array(workspaceIdSchema) });
object({
	workspaceId: workspaceIdSchema,
	sessionId: sessionIdSchema,
	beforeSessionId: sessionIdSchema.optional()
});
object({ workspace: workspaceViewSchema });
object({ sessionId: sessionIdSchema });
object({ archivedSessionIds: array(sessionIdSchema) });
//#endregion
//#region ../../node_modules/.pnpm/@deepseek-ai+dsh-host-apiproxy@0.1.0-rc.6_8335eca05d5647f26dcc0c8fd5a39ec0/node_modules/@nuaagent/host-apiproxy/lib/types/api/events.schema.js
/**
* events domain zod schemas: MuxFrame / HostFrame unions (discriminatedUnion('type')).
* A frame is the payload slot of the ServerRequest full form; the SessionEvent inside
* a session/event frame reuses sessions.schema's strict-envelope + wide-data passthrough branch.
*/
/** Question fields validated strictly against core dsh-user-questions. */
const askUserQuestionItemSchema = object({
	id: string(),
	question: string(),
	header: string().optional(),
	detail: string().optional(),
	options: array(object({
		label: string(),
		description: string().optional()
	})).optional(),
	multiSelect: boolean().optional(),
	intent: discriminatedUnion("kind", [object({
		kind: literal("plan-review"),
		approve: string()
	})]).optional()
});
/** Unified message envelope carried by transient queue frames. */
const messageSchema = object({
	id: string().min(1),
	role: union([
		literal("system"),
		literal("user"),
		literal("assistant")
	]),
	content: array(contentBlockSchema),
	source: looseObject({ kind: string() })
});
/** MuxFrame union (payload slot of a mux-stream ServerRequest). */
const muxFrameSchema = discriminatedUnion("type", [
	object({
		type: literal("session/event"),
		sessionId: sessionIdSchema,
		event: sessionEventSchema,
		view: toolEventViewSchema.optional()
	}),
	object({
		type: literal("session/subscribed"),
		sessionId: sessionIdSchema,
		lastSeq: number().int()
	}),
	object({
		type: literal("approval/requested"),
		sessionId: sessionIdSchema,
		approvalId: approvalRequestIdSchema,
		toolName: string(),
		callId: string().optional(),
		reason: string().optional()
	}),
	object({
		type: literal("approval/resolved"),
		sessionId: sessionIdSchema,
		approvalId: approvalRequestIdSchema,
		outcome: union([
			literal("allowed-once"),
			literal("rejected"),
			literal("cancelled"),
			literal("unavailable")
		])
	}),
	object({
		type: literal("question/requested"),
		sessionId: sessionIdSchema,
		questions: array(askUserQuestionItemSchema).min(1)
	}),
	object({
		type: literal("question/resolved"),
		sessionId: sessionIdSchema,
		questionRpcId: rpcIdSchema,
		outcome: union([literal("answered"), literal("cancelled")])
	}),
	object({
		type: literal("session/queue"),
		sessionId: sessionIdSchema,
		items: array(object({
			id: messageIdSchema,
			placement: union([
				literal("queued"),
				literal("steering"),
				literal("context")
			]),
			message: messageSchema
		}))
	}),
	object({
		type: literal("session/jobs"),
		sessionId: sessionIdSchema,
		jobs: array(taskViewSchema)
	}),
	object({
		type: literal("session/projection"),
		sessionId: sessionIdSchema,
		key: string().min(1),
		value: unknown(),
		seq: number().int().nonnegative()
	}),
	object({
		type: literal("stream/error"),
		error: rpcErrorSchema
	})
]);
discriminatedUnion("type", [
	object({
		type: literal("host/session-added"),
		sessionId: sessionIdSchema,
		blank: boolean(),
		parentSessionId: sessionIdSchema.optional(),
		origin: literal("subagent").optional(),
		cwd: string().optional(),
		agentPreset: string().optional()
	}),
	object({
		type: literal("host/session-removed"),
		sessionId: sessionIdSchema
	}),
	object({
		type: literal("host/session-status"),
		sessionId: sessionIdSchema,
		running: boolean()
	}),
	object({
		type: literal("host/agent-error"),
		sessionId: sessionIdSchema,
		message: string()
	}),
	object({
		type: literal("host/workspace-changed"),
		workspace: workspaceViewSchema
	}),
	object({
		type: literal("host/workspace-removed"),
		workspaceId: workspaceIdSchema
	}),
	object({
		type: literal("host/workspace-order-changed"),
		workspaceIds: array(workspaceIdSchema)
	}),
	object({
		type: literal("host/archived-sessions-changed"),
		archivedSessionIds: array(sessionIdSchema)
	}),
	object({
		type: literal("host/remote-event"),
		event: string().min(1),
		args: array(unknown())
	}),
	object({
		type: literal("stream/error"),
		error: rpcErrorSchema
	})
]);
//#endregion
//#region src/mobile/mux.ts
/** Browser default source factory. */
function browserSource(url) {
	return new EventSource(url);
}
const DEFAULT_POLL_INTERVAL_MS = 3e3;
const DEFAULT_STALL_THRESHOLD_MS = 12e3;
/**
* Stall-check granularity: the single scheduler tick runs at least this
* often so fallback arms within a second of the stall threshold passing,
* while the poll cadence itself stays {@link MuxClientOptions.pollIntervalMs}.
*/
const STALL_CHECK_MS = 1e3;
/** Poll window: enough recent events to cover a few seconds of agent output. */
const DEFAULT_POLL_PAGE_SIZE = 50;
/**
* Keep one SSE subscription open, fanning validated frames out to
* subscribers. EventSource owns reconnection (with its own backoff); this
* class only manages the subscription lifecycle, plus a polling fallback
* that keeps the open session live when the SSE channel cannot deliver.
*/
var MuxClient = class {
	sourceFactory;
	pollLatest;
	pollIntervalMs;
	stallThresholdMs;
	now;
	listeners = /* @__PURE__ */ new Set();
	source;
	stopped = false;
	url;
	/** The session to keep live via fallback polling (undefined = none). */
	observeSessionId;
	/** Last epoch ms the SSE channel produced a frame (or the stream opened). */
	lastDataAt = 0;
	/**
	* Whether the SSE channel has ever delivered a frame in this stream (a
	* delivered frame proves the tunnel forwards SSE; silence alone then means
	* the agent idle, not a dead channel — only an onerror re-arms fallback).
	*/
	sseAlive = false;
	/** Per-session highest event seq already emitted, for poll dedup. */
	pollWatermark = /* @__PURE__ */ new Map();
	/** Single scheduler tick: both the stall check and the poll cadence ride this one interval. */
	tickTimer;
	polling = false;
	/** Epoch ms of the next due poll while polling (kept on the same tick timer). */
	nextPollAt = 0;
	/**
	* @param url - the mobile events endpoint (browser-relative).
	* @param options - seams.
	*/
	constructor(url = "/m/api/events.mux", options = {}) {
		this.url = url;
		this.sourceFactory = options.sourceFactory ?? browserSource;
		this.pollLatest = options.pollLatest ?? ((sessionId) => history(sessionId, void 0, DEFAULT_POLL_PAGE_SIZE));
		this.pollIntervalMs = options.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
		this.stallThresholdMs = options.stallThresholdMs ?? DEFAULT_STALL_THRESHOLD_MS;
		this.now = options.now ?? (() => Date.now());
	}
	/** Open the stream (idempotent; EventSource reconnects until {@link stop}). */
	start() {
		this.stopped = false;
		this.lastDataAt = this.now();
		if (this.source === void 0) this.connect();
		this.startTick();
	}
	/** Close for good. */
	stop() {
		this.stopped = true;
		this.stopTick();
		this.stopPolling();
		this.closeSource();
		this.observeSessionId = void 0;
		this.nextPollAt = 0;
	}
	/** Subscribe to validated frames; returns an unsubscribe function. */
	onFrame(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	/**
	* Point the fallback at one open session (or `undefined` to stop it).
	* While the SSE channel is stalled this client polls that session's
	* history and re-emits new events as `session/event` frames.
	*/
	observe(sessionId) {
		this.observeSessionId = sessionId;
		if (sessionId === void 0) {
			this.stopPolling();
			return;
		}
		if (!this.polling && !this.stopped && !this.sseAlive && this.now() - this.lastDataAt > this.stallThresholdMs) this.startPolling();
	}
	connect() {
		this.sseAlive = false;
		const source = this.sourceFactory(this.url);
		this.source = source;
		source.onmessage = (event) => {
			this.handleMessage(event.data);
		};
		source.onerror = () => {
			if (this.stopped && this.source === source) {
				this.closeSource();
				return;
			}
			this.sseAlive = false;
			if (this.observeSessionId !== void 0) this.startPolling();
		};
	}
	/**
	* The single scheduler tick is the only interval this client owns. One
	* timer (at the finer of the stall-check and poll cadences) both arms the
	* polling fallback once the stall threshold passes and drives each poll at
	* {@link MuxClientOptions.pollIntervalMs} — one timer instead of two.
	*/
	startTick() {
		if (this.tickTimer !== void 0) return;
		const cadence = Math.min(this.pollIntervalMs, STALL_CHECK_MS);
		this.tickTimer = setInterval(() => {
			this.tick();
		}, cadence);
	}
	stopTick() {
		if (this.tickTimer !== void 0) {
			clearInterval(this.tickTimer);
			this.tickTimer = void 0;
		}
	}
	tick() {
		if (this.stopped) return;
		if (this.observeSessionId === void 0) return;
		if (this.polling) {
			if (this.now() >= this.nextPollAt) {
				this.nextPollAt = this.now() + this.pollIntervalMs;
				this.pollTick();
			}
			return;
		}
		if (this.sseAlive) return;
		if (this.now() - this.lastDataAt > this.stallThresholdMs) this.startPolling();
	}
	startPolling() {
		if (this.polling || this.stopped) return;
		this.polling = true;
		this.nextPollAt = this.now() + this.pollIntervalMs;
		this.pollTick();
	}
	stopPolling() {
		this.polling = false;
	}
	/**
	* Fetch the latest history page for the observed session and re-emit any
	* event above the per-session watermark as a `session/event` frame.
	* Idempotent by seq: listeners (and the fold) never see a duplicate.
	*/
	async pollTick() {
		const sessionId = this.observeSessionId;
		if (sessionId === void 0) {
			this.stopPolling();
			return;
		}
		try {
			const page = await this.pollLatest(sessionId);
			let maxSeq = this.pollWatermark.get(sessionId) ?? -1;
			for (const entry of page.events) {
				const event = entry.event;
				const seq = typeof event?.seq === "number" ? event.seq : -1;
				if (seq <= maxSeq) continue;
				maxSeq = seq;
				this.emit({
					type: "session/event",
					sessionId,
					event
				});
			}
			this.pollWatermark.set(sessionId, maxSeq);
		} catch {}
	}
	handleMessage(data) {
		if (typeof data !== "string" || data === "") return;
		let parsed;
		try {
			parsed = JSON.parse(data);
		} catch {
			return;
		}
		const envelope = serverRequestSchema.safeParse(parsed);
		if (!envelope.success) return;
		const frame = muxFrameSchema.safeParse(envelope.data.payload);
		if (!frame.success) return;
		this.sseAlive = true;
		this.lastDataAt = this.now();
		if (this.polling) this.stopPolling();
		this.emit(frame.data);
	}
	emit(frame) {
		for (const listener of this.listeners) try {
			listener(frame);
		} catch {}
	}
	closeSource() {
		const source = this.source;
		this.source = void 0;
		if (source !== void 0) {
			source.onmessage = null;
			source.onerror = null;
			try {
				source.close();
			} catch {}
		}
	}
};
//#endregion
//#region src/mobile/messages.ts
/** Runtime shape guard for the lossless-JSON `data` of a `WireEvent`. */
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function pickString(value) {
	return typeof value === "string" ? value : void 0;
}
function pickNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
/** Fallback message id for events without a stable wire id. */
function syntheticId(prefix, seq) {
	return `${prefix}#${String(seq)}`;
}
/** Concatenate the plain text of every `text` content block. */
function textFromContent(content) {
	return blocksOfType(content, "text");
}
/** Concatenate the plain text of every `reasoning` content block. */
function reasoningFromContent(content) {
	return blocksOfType(content, "reasoning");
}
/** Concatenate the plain text of every content block of one type. */
function blocksOfType(content, type) {
	if (!Array.isArray(content)) return "";
	let out = "";
	for (const block of content) {
		if (!isRecord$1(block)) continue;
		if (block["type"] !== type) continue;
		const text = pickString(block["text"]);
		if (text !== void 0) out += text;
	}
	return out;
}
/**
* Extract a text-chunk target from `assistant/chunk` or the mobile alias
* `message/chunk`.
*
* - DSH shape: `data.chunk = { type: 'text-delta', text }` keyed by
*   `(turn, step)`; the pending message is created/aggregated on the owning
*   step and later finalized by the matching `assistant/message`.
* - Mobile shape: `data.text` with an optional `messageId` binding the delta
*   to a specific assistant message.
*
* Returns null for non-text chunk variants (usage / finish / block-start).
*/
function chunkTarget(data) {
	if (!isRecord$1(data)) return null;
	let text;
	let kind = "text";
	let idValue;
	let turn;
	let step;
	const chunk = data["chunk"];
	if (isRecord$1(chunk)) {
		if (chunk["type"] !== "text-delta" && chunk["type"] !== "reasoning-delta") return null;
		text = pickString(chunk["text"]);
		kind = chunk["type"] === "reasoning-delta" ? "reasoning" : "text";
		turn = pickNumber(data["turn"]);
		step = pickNumber(data["step"]);
	} else {
		text = pickString(data["text"]);
		kind = pickString(data["kind"]) === "reasoning" ? "reasoning" : "text";
		idValue = pickString(data["messageId"]) ?? pickString(data["id"]);
		turn = pickNumber(data["turn"]);
		step = pickNumber(data["step"]);
	}
	if (text === void 0) return null;
	const result = {
		text,
		kind
	};
	if (idValue !== void 0) result.id = idValue;
	if (turn !== void 0) result.turn = turn;
	if (step !== void 0) result.step = step;
	return result;
}
/** Max message seq across an existing list, or -1 for an empty list. */
function watermarkOf(existing) {
	if (existing === void 0) return -1;
	let maxSeq = -1;
	for (const message of existing) if (message.seq > maxSeq) maxSeq = message.seq;
	return maxSeq;
}
function createState(existing) {
	const messages = existing === void 0 ? [] : [...existing];
	const state = {
		messages,
		byId: /* @__PURE__ */ new Map(),
		pendingByTurnStep: /* @__PURE__ */ new Map(),
		turnStepMessage: /* @__PURE__ */ new Map(),
		messageTurn: /* @__PURE__ */ new Map(),
		toolNames: /* @__PURE__ */ new Map()
	};
	for (const message of messages) {
		state.byId.set(message.id, message);
		if (message.kind !== "assistant") continue;
		const decoded = decodePendingTurnStep(message.id);
		const key = decoded === void 0 ? void 0 : tsKey(decoded.turn, decoded.step);
		if (message.pending === true && key !== void 0) {
			state.pendingByTurnStep.set(key, message);
			state.turnStepMessage.set(key, message);
		}
		if (decoded !== void 0) state.messageTurn.set(message.id, decoded.turn);
	}
	return state;
}
function tsKey(turn, step) {
	return turn === void 0 || step === void 0 ? void 0 : `${turn}.${step}`;
}
/**
* Recover the `(turn, step)` a pending assistant message was created under from
* its synthetic id (`assistant,<turn>.<step>#<seq>`), so an incremental fold
* over an `existing` list can re-attach index maps that were lost across calls.
*/
function decodePendingTurnStep(id) {
	if (!id.startsWith("assistant,")) return void 0;
	const rest = id.slice(10);
	const hash = rest.indexOf("#");
	const tsPart = hash === -1 ? rest : rest.slice(0, hash);
	const dot = tsPart.indexOf(".");
	if (dot <= 0 || dot === tsPart.length - 1) return void 0;
	const turn = Number(tsPart.slice(0, dot));
	const step = Number(tsPart.slice(dot + 1));
	if (!Number.isInteger(turn) || !Number.isInteger(step)) return void 0;
	return {
		turn,
		step
	};
}
/**
* Swap in a replacement message object at the old message's position and
* re-index it. Immutable: `next` is a fresh object; the old one is untouched.
*/
function replaceMessage(state, oldMessage, next) {
	const index = state.messages.indexOf(oldMessage);
	if (index !== -1) state.messages[index] = next;
	state.byId.delete(oldMessage.id);
	state.byId.set(next.id, next);
}
/** Bundle the maps keyed per `(turn, step)` over to a newly swapped message. */
function retargetTurnStep(state, key, oldMessage, next) {
	if (key === void 0) return;
	if (state.pendingByTurnStep.get(key) === oldMessage) state.pendingByTurnStep.set(key, next);
	if (state.turnStepMessage.get(key) === oldMessage) state.turnStepMessage.set(key, next);
}
/** Fold one event into the working state. Assumes the event passes the watermark. */
function applyEvent(state, event) {
	switch (event.type) {
		case "user/message":
			applyUserMessage(state, event);
			break;
		case "assistant/message":
			applyAssistantMessage(state, event);
			break;
		case "assistant/chunk":
		case "message/chunk":
			applyChunk(state, event);
			break;
		case "message/update":
			applyUpdate(state, event);
			break;
		case "message/delete":
			applyDelete(state, event);
			break;
		case "turn/end":
			applyTurnEnd(state, event);
			break;
		case "tool/call":
			applyToolCall(state, event);
			break;
		case "request/context": {
			const window = pickNumber((isRecord$1(event.data) ? event.data : {})["contextWindow"]);
			if (window !== void 0) state.contextWindow = window;
			break;
		}
		default: break;
	}
}
function applyUserMessage(state, event) {
	const data = isRecord$1(event.data) ? event.data : {};
	const id = pickString(data["id"]) ?? syntheticId("user", event.seq);
	const text = textFromContent(data["content"]);
	const sourceKind = pickString((isRecord$1(data["source"]) ? data["source"] : {})["kind"]);
	const existing = state.byId.get(id);
	if (existing !== void 0) {
		replaceMessage(state, existing, {
			...existing,
			...sourceKind !== void 0 ? { sourceKind } : {},
			text,
			seq: event.seq,
			time: event.time
		});
		return;
	}
	const message = {
		id,
		kind: "user",
		text,
		...sourceKind !== void 0 ? { sourceKind } : {},
		seq: event.seq,
		time: event.time
	};
	state.messages.push(message);
	state.byId.set(id, message);
}
function applyAssistantMessage(state, event) {
	const data = isRecord$1(event.data) ? event.data : {};
	const messageData = isRecord$1(data["message"]) ? data["message"] : data;
	const id = pickString(messageData["id"]) ?? pickString(data["id"]) ?? syntheticId("assistant", event.seq);
	const turn = pickNumber(data["turn"]);
	const step = pickNumber(data["step"]);
	const finalText = textFromContent(messageData["content"]);
	const finalReasoning = reasoningFromContent(messageData["content"]);
	const key = tsKey(turn, step);
	const usage = usageFromData(data);
	const contextWindow = state.contextWindow;
	let target = state.byId.get(id);
	if (target === void 0 && key !== void 0) target = state.pendingByTurnStep.get(key);
	if (target !== void 0) {
		const next = {
			...target,
			id,
			text: finalText,
			...finalReasoning !== "" ? { reasoning: finalReasoning } : {},
			...usage !== void 0 ? { usage } : {},
			...usage !== void 0 && contextWindow !== void 0 ? { contextWindow } : {},
			seq: event.seq,
			time: event.time,
			pending: false
		};
		replaceMessage(state, target, next);
		retargetTurnStep(state, key, target, next);
		if (turn !== void 0) state.messageTurn.set(next.id, turn);
		return;
	}
	const message = {
		id,
		kind: "assistant",
		text: finalText,
		...finalReasoning !== "" ? { reasoning: finalReasoning } : {},
		...usage !== void 0 ? { usage } : {},
		...usage !== void 0 && contextWindow !== void 0 ? { contextWindow } : {},
		seq: event.seq,
		time: event.time
	};
	state.messages.push(message);
	state.byId.set(id, message);
	if (key !== void 0) {
		state.pendingByTurnStep.delete(key);
		state.turnStepMessage.set(key, message);
	}
	if (turn !== void 0) state.messageTurn.set(id, turn);
}
/**
* Extract token usage from an assistant event payload. Only attaches when the
* wire carries finite `inputTokens` AND `outputTokens`; the cache fields are
* included only for finite numbers.
*/
function usageFromData(data) {
	const usageData = data["usage"];
	if (!isRecord$1(usageData)) return void 0;
	const inputTokens = pickNumber(usageData["inputTokens"]);
	const outputTokens = pickNumber(usageData["outputTokens"]);
	if (inputTokens === void 0 || outputTokens === void 0) return void 0;
	const usage = {
		inputTokens,
		outputTokens
	};
	const cacheReadTokens = pickNumber(usageData["cacheReadTokens"]);
	const cacheWriteTokens = pickNumber(usageData["cacheWriteTokens"]);
	if (cacheReadTokens !== void 0) usage.cacheReadTokens = cacheReadTokens;
	if (cacheWriteTokens !== void 0) usage.cacheWriteTokens = cacheWriteTokens;
	return usage;
}
function applyChunk(state, event) {
	const target = chunkTarget(event.data);
	if (target === null) return;
	const key = tsKey(target.turn, target.step);
	let message;
	if (target.id !== void 0) message = state.byId.get(target.id);
	else if (key !== void 0) message = state.pendingByTurnStep.get(key) ?? state.turnStepMessage.get(key);
	if (message !== void 0 && message.kind === "assistant") {
		const next = target.kind === "reasoning" ? {
			...message,
			reasoning: (message.reasoning ?? "") + target.text,
			seq: event.seq,
			time: event.time
		} : {
			...message,
			text: message.text + target.text,
			seq: event.seq,
			time: event.time
		};
		replaceMessage(state, message, next);
		retargetTurnStep(state, key, message, next);
		return;
	}
	const id = target.id ?? (key !== void 0 ? syntheticId(`assistant,${key}`, event.seq) : syntheticId("assistant", event.seq));
	const created = target.kind === "reasoning" ? {
		id,
		kind: "assistant",
		text: "",
		reasoning: target.text,
		seq: event.seq,
		time: event.time,
		pending: true
	} : {
		id,
		kind: "assistant",
		text: target.text,
		seq: event.seq,
		time: event.time,
		pending: true
	};
	state.messages.push(created);
	state.byId.set(id, created);
	if (key !== void 0) {
		state.pendingByTurnStep.set(key, created);
		state.turnStepMessage.set(key, created);
	}
	if (target.turn !== void 0) state.messageTurn.set(id, target.turn);
}
function findByIdOrSeq(state, event) {
	const data = isRecord$1(event.data) ? event.data : {};
	const id = pickString(data["id"]);
	if (id !== void 0) {
		const byId = state.byId.get(id);
		if (byId !== void 0) return byId;
	}
	const seq = pickNumber(data["seq"] ?? data["messageSeq"]);
	if (seq !== void 0) return state.messages.find((message) => message.seq === seq);
}
function applyUpdate(state, event) {
	const message = findByIdOrSeq(state, event);
	if (message === void 0) return;
	const text = pickString((isRecord$1(event.data) ? event.data : {})["text"]);
	replaceMessage(state, message, {
		...message,
		...text !== void 0 ? { text } : {},
		seq: event.seq,
		time: event.time
	});
}
function removeMessage(state, message) {
	const index = state.messages.indexOf(message);
	if (index !== -1) state.messages.splice(index, 1);
	state.byId.delete(message.id);
	state.messageTurn.delete(message.id);
	state.toolNames.delete(message.id);
	for (const [key, candidate] of state.turnStepMessage) if (candidate === message) state.turnStepMessage.delete(key);
	for (const [key, candidate] of state.pendingByTurnStep) if (candidate === message) state.pendingByTurnStep.delete(key);
}
function applyDelete(state, event) {
	const message = findByIdOrSeq(state, event);
	if (message === void 0) return;
	removeMessage(state, message);
}
function applyToolCall(state, event) {
	const data = isRecord$1(event.data) ? event.data : {};
	const name = pickString(data["name"]);
	if (name === void 0) return;
	const turn = pickNumber(data["turn"]);
	const key = tsKey(turn, pickNumber(data["step"]));
	let target = key === void 0 ? void 0 : state.turnStepMessage.get(key);
	if (target === void 0 && turn !== void 0) for (let i = state.messages.length - 1; i >= 0; i--) {
		const candidate = state.messages[i];
		if (candidate !== void 0 && candidate.kind === "assistant" && state.messageTurn.get(candidate.id) === turn) {
			target = candidate;
			break;
		}
	}
	if (target === void 0) for (let i = state.messages.length - 1; i >= 0; i--) {
		const candidate = state.messages[i];
		if (candidate !== void 0 && candidate.kind === "assistant") {
			target = candidate;
			break;
		}
	}
	if (target === void 0) return;
	const names = state.toolNames.get(target.id) ?? /* @__PURE__ */ new Set();
	const isNewName = !names.has(name);
	if (isNewName) {
		names.add(name);
		state.toolNames.set(target.id, names);
	}
	const callId = pickString(data["callId"]) ?? `${name}#${String(event.seq)}`;
	const args = pickString(data["arguments"]);
	const tools = target.tools ?? [];
	const existingIndex = tools.findIndex((tool) => tool.callId === callId);
	const isNewCall = existingIndex === -1;
	const nextTools = isNewCall ? [...tools, {
		callId,
		name,
		...args !== void 0 ? { arguments: args } : {}
	}] : tools.map((tool, index) => index === existingIndex ? {
		...tool,
		...args !== void 0 ? { arguments: args } : {}
	} : tool);
	const next = {
		...target,
		...isNewName ? { toolSummary: `使用 ${[...names].join(" / ")}` } : {},
		...isNewCall || args !== void 0 ? { tools: nextTools } : {},
		seq: event.seq,
		time: event.time
	};
	replaceMessage(state, target, next);
	retargetTurnStep(state, key, target, next);
}
function applyTurnEnd(state, event) {
	const data = isRecord$1(event.data) ? event.data : {};
	const turn = pickNumber(data["turn"]);
	const failed = (isRecord$1(data["reason"]) ? data["reason"] : {})["kind"] === "error";
	let targets;
	if (turn !== void 0) targets = state.messages.filter((message) => message.kind === "assistant" && state.messageTurn.get(message.id) === turn);
	else targets = state.messages.filter((message) => message.kind === "assistant");
	if (targets.length === 0) for (let i = state.messages.length - 1; i >= 0; i--) {
		const candidate = state.messages[i];
		if (candidate !== void 0 && candidate.kind === "assistant") {
			targets = [candidate];
			break;
		}
	}
	for (const message of targets) {
		const wasPending = message.pending === true;
		replaceMessage(state, message, {
			...message,
			...wasPending ? { pending: false } : {},
			...failed ? { failed: true } : {},
			seq: Math.max(message.seq, event.seq),
			time: event.time
		});
	}
}
/**
* Fold a batch of session events into a renderable message list.
*
* @param events - events to apply, in any order (folded by ascending seq).
* @param existing - the previously rendered list (live-stream incremental tail).
* @returns messages sorted by seq.
*/
function foldEvents(events, existing) {
	const sorted = [...events].sort((a, b) => a.seq - b.seq);
	const watermark = watermarkOf(existing);
	const state = createState(existing);
	for (const event of sorted) {
		if (event.seq <= watermark) continue;
		applyEvent(state, event);
	}
	return [...state.messages].sort((a, b) => a.seq - b.seq || (a.id < b.id ? -1 : 1));
}
//#endregion
//#region src/mobile/markdown.ts
/**
* A compact GFM-subset markdown renderer for the mobile chat: headings,
* paragraphs, fenced + inline code, bold/italic/strikethrough, links,
* images, lists, blockquotes, hr, and tables. All HTML is escaped before
* transformation — the output only ever contains the renderer's own tags.
* Dependency-free on purpose (the mobile bundle stays at ~456 KB); the
* escape-first + protocol allow-list design mirrors the desktop panel's
* preview renderer (dsh-aionui-panel/src/client/preview/markdown.ts).
* Pure and exported for tests.
* @module dsh-remote-web-ui/mobile/markdown
*/
/** Escape HTML special characters. */
function escapeHtml(text) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/**
* Guard a raw link/image target against dangerous protocols. Returns the
* (trimmed) raw string when safe, else null. Only http:, https:, mailto:
* and fragment anchors (#...) are allowed; anything with another scheme
* — javascript:, data:, vbscript:, etc. — is rejected so the value never
* reaches dangerouslySetInnerHTML.
*/
function safeUrl(raw) {
	const trimmed = raw.trim();
	if (trimmed === "") return null;
	if (trimmed.startsWith("#")) return trimmed;
	const scheme = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(trimmed);
	if (scheme === null) return trimmed;
	const name = scheme[1].toLowerCase();
	return name === "http" || name === "https" || name === "mailto" ? trimmed : null;
}
/** Find the ')' closing a link/image target, skipping nested parens. */
function findCloseParen(text, from) {
	let depth = 0;
	for (let i = from; i < text.length; i += 1) {
		const char = text[i];
		if (char === "(") depth += 1;
		else if (char === ")") {
			if (depth === 0) return i;
			depth -= 1;
		}
	}
	return -1;
}
/** Inline pass: code spans, bold, italic, strikethrough, images, links. */
function renderInline(text) {
	let out = "";
	let i = 0;
	const n = text.length;
	while (i < n) {
		const char = text[i];
		if (char === "`") {
			const end = text.indexOf("`", i + 1);
			if (end !== -1) {
				out += "<code>" + escapeHtml(text.slice(i + 1, end)) + "</code>";
				i = end + 1;
				continue;
			}
		}
		if (char === "!" && text[i + 1] === "[") {
			const close = text.indexOf("](", i + 2);
			if (close !== -1) {
				const parenEnd = findCloseParen(text, close + 2);
				if (parenEnd !== -1) {
					const alt = text.slice(i + 2, close);
					const safe = safeUrl(text.slice(close + 2, parenEnd));
					if (safe === null) out += escapeHtml(alt);
					else {
						const srcEsc = escapeHtml(safe).replace(/\s+/g, "%20");
						out += "<img alt=\"" + escapeHtml(alt) + "\" src=\"" + srcEsc + "\" />";
					}
					i = parenEnd + 1;
					continue;
				}
			}
		}
		if (char === "[") {
			const close = text.indexOf("](", i + 1);
			if (close !== -1) {
				const parenEnd = findCloseParen(text, close + 2);
				if (parenEnd !== -1) {
					const label = text.slice(i + 1, close);
					const safe = safeUrl(text.slice(close + 2, parenEnd));
					if (safe === null) out += renderInline(label);
					else out += "<a href=\"" + escapeHtml(safe) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + renderInline(label) + "</a>";
					i = parenEnd + 1;
					continue;
				}
			}
		}
		if (char === "*" && text[i + 1] === "*") {
			const end = text.indexOf("**", i + 2);
			if (end !== -1) {
				out += "<strong>" + renderInline(text.slice(i + 2, end)) + "</strong>";
				i = end + 2;
				continue;
			}
		}
		if (char === "*" && text[i - 1] !== "*" && text[i + 1] !== "*") {
			const end = text.indexOf("*", i + 1);
			if (end !== -1 && text[end + 1] !== "*") {
				out += "<em>" + renderInline(text.slice(i + 1, end)) + "</em>";
				i = end + 1;
				continue;
			}
		}
		if (char === "~" && text[i + 1] === "~") {
			const end = text.indexOf("~~", i + 2);
			if (end !== -1) {
				out += "<del>" + renderInline(text.slice(i + 2, end)) + "</del>";
				i = end + 2;
				continue;
			}
		}
		out += escapeHtml(char);
		i += 1;
	}
	return out;
}
/** Render a markdown document to HTML (block pass). */
function renderMarkdown(source) {
	const lines = source.replace(/\r\n/g, "\n").split("\n");
	const out = [];
	let i = 0;
	const n = lines.length;
	const flushParagraph = (buffer) => {
		if (buffer.length === 0) return;
		out.push("<p>" + renderInline(buffer.join("\n")) + "</p>");
		buffer.length = 0;
	};
	let paragraph = [];
	while (i < n) {
		const line = lines[i];
		const fence = /^```([\w+-]*)\s*$/.exec(line);
		if (fence !== null) {
			flushParagraph(paragraph);
			const lang = fence[1] ?? "";
			i += 1;
			const code = [];
			while (i < n && !/^```\s*$/.test(lines[i])) {
				code.push(lines[i]);
				i += 1;
			}
			i += 1;
			const langAttr = lang === "" ? "" : " class=\"language-" + escapeHtml(lang) + "\"";
			out.push("<pre" + langAttr + "><code>" + escapeHtml(code.join("\n")) + "</code></pre>");
			continue;
		}
		const heading = /^(#{1,6})\s+(.*)$/.exec(line);
		if (heading !== null) {
			flushParagraph(paragraph);
			const level = heading[1].length;
			out.push("<h" + level + ">" + renderInline(heading[2] ?? "") + "</h" + level + ">");
			i += 1;
			continue;
		}
		if (/^\s*(---+|\*\*\*+|___+)\s*$/.test(line)) {
			flushParagraph(paragraph);
			out.push("<hr />");
			i += 1;
			continue;
		}
		if (line.includes("|") && i + 1 < n && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) && lines[i + 1].includes("-")) {
			flushParagraph(paragraph);
			const headerCells = splitTableRow(line);
			i += 2;
			const rows = [];
			while (i < n && lines[i].includes("|")) {
				rows.push(splitTableRow(lines[i]));
				i += 1;
			}
			out.push("<table>");
			out.push("<thead><tr>" + headerCells.map((cell) => "<th>" + renderInline(cell) + "</th>").join("") + "</tr></thead>");
			if (rows.length > 0) out.push("<tbody>" + rows.map((row) => "<tr>" + row.map((cell) => "<td>" + renderInline(cell) + "</td>").join("") + "</tr>").join("") + "</tbody>");
			out.push("</table>");
			continue;
		}
		if (/^>\s?(.*)$/.exec(line) !== null) {
			flushParagraph(paragraph);
			const body = [];
			while (i < n) {
				const q = /^>\s?(.*)$/.exec(lines[i]);
				if (q === null) break;
				body.push(q[1] ?? "");
				i += 1;
			}
			out.push("<blockquote><p>" + body.map((bodyLine) => renderInline(bodyLine)).join("<br />") + "</p></blockquote>");
			continue;
		}
		if (/^\s*([-*+])\s+(.*)$/.exec(line) !== null) {
			flushParagraph(paragraph);
			const items = [];
			while (i < n) {
				const item = /^\s*([-*+])\s+(.*)$/.exec(lines[i]);
				if (item === null) break;
				items.push("<li>" + renderInline(item[2] ?? "") + "</li>");
				i += 1;
			}
			out.push("<ul>" + items.join("") + "</ul>");
			continue;
		}
		if (/^\s*\d+[.)]\s+(.*)$/.exec(line) !== null) {
			flushParagraph(paragraph);
			const items = [];
			while (i < n) {
				const item = /^\s*\d+[.)]\s+(.*)$/.exec(lines[i]);
				if (item === null) break;
				items.push("<li>" + renderInline(item[1] ?? "") + "</li>");
				i += 1;
			}
			out.push("<ol>" + items.join("") + "</ol>");
			continue;
		}
		if (line.trim() === "") {
			flushParagraph(paragraph);
			i += 1;
			continue;
		}
		paragraph.push(line);
		i += 1;
	}
	flushParagraph(paragraph);
	return out.join("\n");
}
/** Split one table row into cells (respecting the leading/trailing pipes). */
function splitTableRow(line) {
	const trimmed = line.trim();
	const inner = trimmed.startsWith("|") ? trimmed.slice(1) : trimmed;
	return (inner.endsWith("|") ? inner.slice(0, -1) : inner).split("|").map((cell) => cell.trim());
}
//#endregion
//#region src/mobile/mobile-theme.ts
const STORAGE_KEY = "dsh.remote.theme";
const THEME_COLOR_META_NAME = "theme-color";
const LIGHT_THEME_COLOR = "#f3f5f9";
const DARK_THEME_COLOR = "#111418";
let current = readStored() ?? "light";
const listeners = /* @__PURE__ */ new Set();
function readStored() {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		return value === "dark" || value === "light" ? value : void 0;
	} catch {
		return;
	}
}
function persist(theme) {
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {}
}
/** Apply the theme to the document: data-theme attribute + browser chrome color. */
function applyToDocument(theme) {
	if (typeof document === "undefined") return;
	document.documentElement.dataset.theme = theme;
	const meta = document.querySelector(`meta[name="${THEME_COLOR_META_NAME}"]`);
	if (meta !== null) meta.content = theme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
}
/** Current theme (light unless the user explicitly toggled to dark). */
function getMobileTheme() {
	return current;
}
/** Subscribe to theme changes; returns the unsubscribe function. */
function subscribeMobileTheme(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
/** Set the theme explicitly (persisted + applied to the document). */
function setMobileTheme(theme) {
	if (theme === current) return;
	current = theme;
	persist(theme);
	applyToDocument(theme);
	for (const listener of [...listeners]) listener();
}
/** Flip light/dark and return the new theme. */
function toggleMobileTheme() {
	setMobileTheme(current === "light" ? "dark" : "light");
	return current;
}
/** Apply the persisted (or default) theme once at boot, before first paint. */
function initMobileTheme() {
	applyToDocument(current);
}
//#endregion
//#region ../../node_modules/.pnpm/react@18.3.1/node_modules/react/cjs/react-jsx-runtime.production.min.js
/**
* @license React
* react-jsx-runtime.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var f = require_react();
	var k = Symbol.for("react.element");
	var m = Object.prototype.hasOwnProperty;
	var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
	var p = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function q(c, a, g) {
		var b, d = {}, e = null, h = null;
		void 0 !== g && (e = "" + g);
		void 0 !== a.key && (e = "" + a.key);
		void 0 !== a.ref && (h = a.ref);
		for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
		if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
		return {
			$$typeof: k,
			type: c,
			key: e,
			ref: h,
			props: d,
			_owner: n.current
		};
	}
	exports.jsx = q;
	exports.jsxs = q;
}));
//#endregion
//#region src/mobile/theme-toggle.tsx
/**
* Theme toggle button: sits at the right end of every view header and flips
* the mobile surface between the light (default) and dark palettes. The
* glyph shows the theme you will switch TO (moon in light mode, sun in dark
* mode); the choice persists across visits.
*/
var import_jsx_runtime = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production_min();
})))();
/** Sun glyph: circle + eight rays (inline SVG, no emoji). */
function SunIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "4.2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" })]
	});
}
/** Moon glyph: crescent path (inline SVG, no emoji). */
function MoonIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" })
	});
}
/**
* Render the header theme toggle.
* @returns the toggle button.
*/
function ThemeToggle() {
	const dark = (0, import_react.useSyncExternalStore)(subscribeMobileTheme, getMobileTheme) === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "mobile-theme-toggle",
		"aria-label": dark ? "切换到浅色" : "切换到深色",
		onClick: () => {
			toggleMobileTheme();
		},
		children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonIcon, {})
	});
}
/** localStorage key for the tool-call display toggle (persisted on the /m origin). */
const SHOW_TOOL_CALLS_KEY = "dsh.mobile.showToolCalls";
/** localStorage key for the injected-system-message display toggle. */
const SHOW_SYSTEM_MESSAGES_KEY = "dsh.mobile.showSystemMessages";
/** Read a boolean from localStorage defensively; falls back to the default. */
function readStoredBoolean(key, fallback) {
	try {
		const raw = localStorage.getItem(key);
		if (raw === null) return fallback;
		return raw === "1" || raw.toLowerCase() === "true";
	} catch {
		return fallback;
	}
}
/** Persist a boolean toggle; storage failures are ignored (feature stays non-persistent). */
function writeStoredBoolean(key, value) {
	try {
		localStorage.setItem(key, value ? "1" : "0");
	} catch {}
}
/** Extract the raw event from one history entry (the fold consumes events only). */
function eventOf(entry) {
	return entry.event;
}
/** Defensive runtime guard for projection payloads. */
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** Parse the wire `permissions` projection defensively; undefined when absent. */
function parsePermissionSelect(value) {
	if (!isRecord(value)) return void 0;
	const rawOptions = Array.isArray(value["options"]) ? value["options"] : [];
	const options = [];
	for (const raw of rawOptions) {
		if (!isRecord(raw)) continue;
		const optionValue = typeof raw["value"] === "string" ? raw["value"] : void 0;
		const name = typeof raw["name"] === "string" ? raw["name"] : void 0;
		if (optionValue === void 0 || name === void 0) continue;
		options.push({
			value: optionValue,
			name,
			...typeof raw["description"] === "string" ? { description: raw["description"] } : {}
		});
	}
	const currentValue = typeof value["currentValue"] === "string" ? value["currentValue"] : void 0;
	if (currentValue === void 0 || options.length === 0) return void 0;
	return {
		options,
		currentValue
	};
}
/** One display-name transform for kebab-case machine names (web-UI parity). */
function displayName(name) {
	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) return name;
	return name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
/** First non-empty line of reasoning text (the collapsed summary). */
function firstMeaningfulLine(text) {
	const trimmed = text.trim();
	if (trimmed === "") return "";
	const newline = trimmed.indexOf("\n");
	return newline === -1 ? trimmed : trimmed.slice(0, newline);
}
/**
* Render one session's chat.
* @param props - the session, the mux client, and the back action.
* @returns the chat surface.
*/
function ChatView({ session, mux, onBack }) {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [hasOlder, setHasOlder] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(void 0);
	const [input, setInput] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(void 0);
	const pendingRef = (0, import_react.useRef)(false);
	/**
	* True while the initial tail page is in flight. Live events arriving in
	* that window go to {@link liveBufferRef} instead of the message list: the
	* tail load replaces the list wholesale, so a directly folded event would
	* flash once, be discarded by the snapshot, and then be skipped forever by
	* the seq watermark.
	*/
	const tailLoadingRef = (0, import_react.useRef)(true);
	/** Live session events buffered while the initial tail page loads. */
	const liveBufferRef = (0, import_react.useRef)([]);
	/** True once the live buffer hit its cap (oldest events were dropped). */
	const liveBufferOverflowRef = (0, import_react.useRef)(false);
	/** The session's permission select (absent = capability not composed). */
	const [permissions, setPermissions] = (0, import_react.useState)(void 0);
	/** The current model selection for the toolbar chip (best-effort label). */
	const [currentModel, setCurrentModel] = (0, import_react.useState)(void 0);
	/** Which bottom sheet is open. */
	const [sheet, setSheet] = (0, import_react.useState)(null);
	/** Show tool-call disclosures (default on, persisted on the /m origin). */
	const [showToolCalls, setShowToolCalls] = (0, import_react.useState)(() => readStoredBoolean(SHOW_TOOL_CALLS_KEY, true));
	/** Show injected system messages (default off, persisted on the /m origin). */
	const [showSystemMessages, setShowSystemMessages] = (0, import_react.useState)(() => readStoredBoolean(SHOW_SYSTEM_MESSAGES_KEY, false));
	/**
	* Composer preference from the plugin's host settings (default true keeps
	* the legacy Enter-to-send behavior until the preference loads).
	*/
	const [mobileEnterToSend, setMobileEnterToSend] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetchMobilePreferences().then((preferences) => {
			if (!cancelled) setMobileEnterToSend(preferences.mobileEnterToSend !== false);
		}, () => {});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const controller = new AbortController();
		const timeout = setTimeout(() => {
			controller.abort(new DOMException("history load timed out", "TimeoutError"));
		}, 15e3);
		tailLoadingRef.current = true;
		liveBufferRef.current = [];
		liveBufferOverflowRef.current = false;
		setLoading(true);
		setError(void 0);
		setMessages([]);
		loadHistory(session.sessionId, void 0, controller.signal).then((page) => {
			if (cancelled) return;
			const buffered = liveBufferRef.current;
			liveBufferRef.current = [];
			tailLoadingRef.current = false;
			setMessages(foldEvents(buffered, foldEvents(page.events.map(eventOf))));
			setHasOlder(page.hasMore);
			setLoading(false);
			const projections = page.projections?.values;
			setPermissions(parsePermissionSelect(projections?.["permissions"]));
			if (liveBufferOverflowRef.current) loadHistory(session.sessionId, void 0, controller.signal).then((fresh) => {
				if (cancelled) return;
				setMessages((previous) => foldEvents(fresh.events.map(eventOf), previous));
				liveBufferOverflowRef.current = false;
			}, (reason) => {
				if (cancelled) return;
				console.warn("history tail re-pull after live buffer overflow failed", reason);
			});
		}, (reason) => {
			if (cancelled) return;
			const buffered = liveBufferRef.current;
			liveBufferRef.current = [];
			tailLoadingRef.current = false;
			if (buffered.length > 0) setMessages(foldEvents(buffered));
			setError(errorText(reason));
			setLoading(false);
		});
		models(session.sessionId).then((directory) => {
			if (!cancelled) setCurrentModel(directory.current);
		}, () => {});
		return () => {
			cancelled = true;
			clearTimeout(timeout);
			controller.abort();
		};
	}, [session.sessionId]);
	(0, import_react.useEffect)(() => {
		if (mux === void 0) return;
		return mux.onFrame((frame) => {
			if (frame.type === "session/event") {
				if (frame.sessionId !== session.sessionId) return;
				const event = frame.event;
				if (tailLoadingRef.current) {
					if (liveBufferRef.current.length >= 500) {
						liveBufferRef.current.shift();
						if (!liveBufferOverflowRef.current) {
							console.warn(`history tail is slow: live buffer reached 500 events; oldest buffered events will be re-fetched`);
							liveBufferOverflowRef.current = true;
						}
					}
					liveBufferRef.current.push(event);
					return;
				}
				setMessages((previous) => foldEvents([event], previous));
				return;
			}
			if (frame.type === "session/projection" && frame.sessionId === session.sessionId && frame.key === "permissions") setPermissions(parsePermissionSelect(frame.value));
		});
	}, [mux, session.sessionId]);
	const scrollToBottom = (0, import_react.useCallback)(() => {
		const el = scrollRef.current;
		if (el === void 0) return;
		el.scrollTop = el.scrollHeight;
	}, []);
	const lastMessageKeyRef = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		const last = messages[messages.length - 1];
		if (last === void 0) return;
		const key = last.seq + ":" + (last.pending === true ? "p" : "f");
		if (key === lastMessageKeyRef.current) return;
		lastMessageKeyRef.current = key;
		scrollToBottom();
	}, [messages, scrollToBottom]);
	/** Load one older page and prepend it. The fold is directional (incremental
	*  tails only), so the older page folds standalone and concatenates ahead —
	*  host page boundaries never cut a message, so the seam is exact. */
	const loadOlder = (0, import_react.useCallback)(() => {
		if (pendingRef.current) return;
		pendingRef.current = true;
		setLoading(true);
		const first = messages[0];
		if (first === void 0) {
			pendingRef.current = false;
			setLoading(false);
			return;
		}
		loadHistory(session.sessionId, first.seq).then((page) => {
			pendingRef.current = false;
			setLoading(false);
			const older = foldEvents(page.events.map(eventOf));
			setMessages((previous) => [...older, ...previous]);
			setHasOlder(page.hasMore);
		}, (reason) => {
			pendingRef.current = false;
			setLoading(false);
			setError(errorText(reason));
		});
	}, [session.sessionId, messages]);
	/** Send the drafted prompt (the echoed user/message arrives over mux). */
	const send = (0, import_react.useCallback)(() => {
		const text = input.trim();
		if (text === "" || sending) return;
		setSending(true);
		prompt(session.sessionId, text).then(() => {
			setSending(false);
			setInput("");
		}, (reason) => {
			setSending(false);
			setError(errorText(reason));
		});
	}, [
		input,
		sending,
		session.sessionId
	]);
	const modelLabel = currentModel?.model ?? "模型";
	const permissionLabel = permissions === void 0 ? void 0 : permissions.options.find((option) => option.value === permissions.currentValue)?.name ?? displayName(permissions.currentValue);
	const contextUsage = (0, import_react.useMemo)(() => {
		for (let index = messages.length - 1; index >= 0; index--) {
			const message = messages[index];
			const usage = message.usage;
			if (message.kind !== "assistant" || usage === void 0) continue;
			const window = message.contextWindow;
			if (window === void 0 || window <= 0) continue;
			const tokens = usage.inputTokens + (usage.cacheReadTokens ?? 0) + (usage.cacheWriteTokens ?? 0);
			return { pct: Math.round(tokens / window * 100) };
		}
	}, [messages]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "chat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mobile-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mobile-back",
						"aria-label": "返回",
						onClick: onBack,
						children: "‹"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mobile-title mobile-titleInline",
						children: session.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
				]
			}),
			error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mobile-error mobile-pad",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chat-scroll",
				ref: (ref) => {
					scrollRef.current = ref ?? void 0;
				},
				children: [
					hasOlder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "chat-load-older",
						disabled: loading,
						onClick: () => {
							loadOlder();
						},
						children: loading ? "加载中…" : "加载更早的消息"
					}),
					messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageRow, {
						message,
						showToolCalls,
						showSystemMessages
					}, message.id)),
					loading && messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "chat-typing",
						children: "加载中…"
					}),
					!loading && messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "chat-typing",
						children: "还没有消息，发一句话开始吧"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chat-tools",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "chat-chip",
						onClick: () => {
							setSheet("model");
						},
						"aria-haspopup": "dialog",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chat-chip-label",
								children: "模型"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chat-chip-value",
								children: modelLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chat-chip-chevron",
								"aria-hidden": true,
								children: "›"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "chat-chip",
						onClick: () => {
							setSheet("display");
						},
						"aria-haspopup": "dialog",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chat-chip-label",
							children: "显示"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chat-chip-chevron",
							"aria-hidden": true,
							children: "›"
						})]
					}),
					permissionLabel !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "chat-chip",
						onClick: () => {
							setSheet("permission");
						},
						"aria-haspopup": "dialog",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chat-chip-label",
								children: "权限"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chat-chip-value",
								children: permissionLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chat-chip-chevron",
								"aria-hidden": true,
								children: "›"
							})
						]
					}),
					contextUsage !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chat-context" + (contextUsage.pct >= 80 ? " chat-context-warn" : ""),
						children: [
							"上下文 ",
							contextUsage.pct,
							"%"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chat-inputbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "chat-input",
					rows: 1,
					value: input,
					placeholder: mobileEnterToSend ? "输入消息，Enter 发送…" : "输入消息，Enter 换行，点按钮发送…",
					enterKeyHint: mobileEnterToSend ? "send" : "enter",
					onChange: (event) => {
						setInput(event.target.value);
					},
					onKeyDown: (event) => {
						if (mobileEnterToSend && event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							send();
						}
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "chat-send",
					disabled: sending || input.trim() === "",
					onClick: () => {
						send();
					},
					children: sending ? "发送中…" : "发送"
				})]
			}),
			sheet === "model" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSheet, {
				sessionId: session.sessionId,
				current: currentModel,
				onCurrent: (selection) => {
					setCurrentModel(selection);
				},
				onClose: () => {
					setSheet(null);
				}
			}),
			sheet === "permission" && permissions !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionSheet, {
				sessionId: session.sessionId,
				value: permissions,
				onChanged: (value) => {
					setPermissions((previous) => previous === void 0 ? previous : {
						...previous,
						currentValue: value
					});
				},
				onClose: () => {
					setSheet(null);
				}
			}),
			sheet === "display" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplaySheet, {
				showToolCalls,
				showSystemMessages,
				onToolCalls: (value) => {
					setShowToolCalls(value);
					writeStoredBoolean(SHOW_TOOL_CALLS_KEY, value);
				},
				onSystemMessages: (value) => {
					setShowSystemMessages(value);
					writeStoredBoolean(SHOW_SYSTEM_MESSAGES_KEY, value);
				},
				onClose: () => {
					setSheet(null);
				}
			})
		]
	});
}
/** One rendered message row (user bubble or assistant bubble with folds). */
function MessageRow({ message, showToolCalls, showSystemMessages }) {
	if (message.kind === "user" && message.sourceKind !== void 0 && message.sourceKind !== "user" && !showSystemMessages) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `chat-msg chat-msg-${message.kind}${message.pending === true ? " chat-msg-pending" : ""}${message.failed === true ? " chat-msg-failed" : ""}`,
		children: [
			message.kind === "assistant" && message.reasoning !== void 0 && message.reasoning !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReasoningDisclosure, {
				text: message.reasoning,
				pending: message.pending === true
			}),
			showToolCalls && message.kind === "assistant" && message.tools !== void 0 && message.tools.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolDisclosure, { tools: message.tools }),
			message.kind === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownText, { text: message.text }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollapsibleText, { text: message.text }),
			message.failed === true && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "chat-msg-failtag",
				children: "本次回复失败"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "chat-msg-time",
				children: formatTime(message.time)
			})
		]
	});
}
/** Collapsed-by-default reasoning disclosure (web-UI Think-row parity). */
function ReasoningDisclosure({ text, pending }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const summary = pending ? lastLine(text) : firstMeaningfulLine(text);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `chat-disclosure chat-reasoning${open ? " chat-disclosure-open" : ""}`,
		"data-pending": pending || void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "chat-disclosure-head",
			"aria-expanded": open,
			onClick: () => {
				setOpen((value) => !value);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chat-disclosure-caret",
					"aria-hidden": true,
					children: "›"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chat-disclosure-label",
					children: pending ? "思考中…" : "深度思考"
				}),
				!open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chat-disclosure-summary",
					children: summary
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chat-disclosure-body",
			children: text
		})]
	});
}
/** Collapsed-by-default tool-call disclosure: summary row + expandable details. */
function ToolDisclosure({ tools }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const names = [...new Set(tools.map((tool) => tool.name))].join(" / ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `chat-disclosure chat-tools${open ? " chat-disclosure-open" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "chat-disclosure-head",
			"aria-expanded": open,
			onClick: () => {
				setOpen((value) => !value);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chat-disclosure-caret",
					"aria-hidden": true,
					children: "›"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chat-disclosure-label",
					children: "工具"
				}),
				!open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chat-disclosure-summary",
					children: names
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "chat-disclosure-count",
					children: [tools.length, " 次"]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chat-disclosure-body chat-tools-body",
			children: tools.map((tool, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chat-tool-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chat-tool-name",
					children: tool.name
				}), tool.arguments !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "chat-tool-args",
					children: tool.arguments
				})]
			}, `${tool.callId}-${index}`))
		})]
	});
}
/**
* Assistant text rendered as GFM markdown (escape-first, protocol
* allow-list — see markdown.ts). Long replies collapse by clamping the
* rendered block height instead of slicing the source, so half-cut code
* fences or tables never leak malformed markup into the DOM. User
* messages stay plain text (CollapsibleText).
*/
function MarkdownText({ text }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const html = (0, import_react.useMemo)(() => renderMarkdown(text), [text]);
	const long = text.length > LONG_TEXT_LIMIT;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "chat-msg-text chat-md" + (long && !open ? " chat-md-collapsed" : ""),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "chat-md-body",
			dangerouslySetInnerHTML: { __html: html }
		}), long && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "chat-msg-toggle",
			onClick: () => {
				setOpen((value) => !value);
			},
			children: open ? "收起" : "展开全文（" + text.length + " 字）"
		})]
	});
}
/** Long assistant text collapses behind an explicit expand toggle. */
function CollapsibleText({ text }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	if (text.length <= LONG_TEXT_LIMIT) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "chat-msg-text",
		children: text
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "chat-msg-text",
		children: [
			open ? text : text.slice(0, LONG_TEXT_PREVIEW),
			!open ? "…" : "",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "chat-msg-toggle",
				onClick: () => {
					setOpen((value) => !value);
				},
				children: open ? "收起" : `展开全文（${text.length} 字）`
			})
		]
	});
}
const LONG_TEXT_LIMIT = 1600;
const LONG_TEXT_PREVIEW = 800;
/** Latest non-empty line of a streaming reasoning buffer. */
function lastLine(text) {
	const trimmed = text.trimEnd();
	if (trimmed === "") return "";
	const newline = trimmed.lastIndexOf("\n");
	const line = newline === -1 ? trimmed : trimmed.slice(newline + 1);
	return line.trim() === "" ? "" : line;
}
/** Shared bottom-sheet chrome (backdrop + slide-up panel). */
function Sheet({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sheet-backdrop",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			onClick: (event) => {
				event.stopPropagation();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sheet-handle",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sheet-title",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sheet-body",
					children
				})
			]
		})
	});
}
/** The model + thinking-effort picker (fresh advisory directory per open). */
function ModelSheet({ sessionId, current, onCurrent, onClose }) {
	const [state, setState] = (0, import_react.useState)({ status: "loading" });
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(void 0);
	const load = (0, import_react.useCallback)(() => {
		setState({ status: "loading" });
		models(sessionId).then((data) => {
			setState({
				status: "ready",
				data
			});
		}, (reason) => {
			setState({
				status: "error",
				message: errorText(reason)
			});
		});
	}, [sessionId]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	/** Select model/effort and close on success (one-shot action per sheet). */
	const apply = (0, import_react.useCallback)((selection) => {
		if (busy) return;
		setBusy(true);
		setError(void 0);
		selectModel(sessionId, selection).then((result) => {
			setBusy(false);
			onCurrent(result.selected);
			onClose();
		}, (reason) => {
			setBusy(false);
			setError(errorText(reason));
		});
	}, [
		busy,
		sessionId,
		onCurrent,
		onClose
	]);
	if (state.status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		title: "模型与思考强度",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sheet-status",
			children: "正在加载模型目录…"
		})
	});
	if (state.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		title: "模型与思考强度",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sheet-status sheet-status-error",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: state.message }),
				staleHostHint(state.message) !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sheet-hint",
					children: staleHostHint(state.message)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "chat-load-older",
					onClick: load,
					children: "重试"
				})
			]
		})
	});
	const { data } = state;
	const selected = current ?? data.current;
	const choices = data.groups.flatMap((group) => group.models.map((model) => ({
		group,
		model
	})));
	const reasoning = choices.find((choice) => choice.group.id === selected.provider && choice.model.id === selected.model)?.model.reasoning;
	const effectiveEffort = selected.reasoningEffort ?? reasoning?.defaultEffort;
	const effortChoices = reasoning === void 0 ? [] : [...reasoning.defaultEffort === void 0 ? [{
		key: "provider-default",
		effort: void 0,
		label: "跟随模型默认"
	}] : [], ...reasoning.efforts.map((effort) => ({
		key: `effort:${effort.id}`,
		effort: effort.id,
		label: effort.name,
		description: effort.description
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: "模型与思考强度",
		onClose,
		children: [
			error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sheet-error",
				children: error
			}),
			error !== void 0 && staleHostHint(error) !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sheet-hint",
				children: staleHostHint(error)
			}),
			data.failures.map((failure) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sheet-error",
				children: [
					failure.name,
					": ",
					failure.message
				]
			}, failure.id)),
			data.groups.length === 0 && choices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sheet-status",
				children: "没有可用的模型"
			}),
			data.groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sheet-section-title",
					children: group.name
				}), group.models.map((model) => {
					const isSelected = selected.provider === group.id && selected.model === model.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `sheet-option${isSelected ? " sheet-option-selected" : ""}`,
						disabled: busy,
						onClick: () => {
							apply({
								provider: group.id,
								model: model.id,
								...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "sheet-option-copy",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sheet-option-title",
								children: model.name
							}), model.description !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sheet-option-desc",
								children: model.description
							})]
						}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sheet-option-check",
							"aria-hidden": true,
							children: "√"
						})]
					}, model.id);
				})]
			}, group.id)),
			effortChoices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sheet-section-title",
					children: "思考强度"
				}), effortChoices.map((choice) => {
					const isSelected = effectiveEffort === choice.effort;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `sheet-option${isSelected ? " sheet-option-selected" : ""}`,
						disabled: busy,
						onClick: () => {
							apply({
								provider: selected.provider,
								model: selected.model,
								...choice.effort !== void 0 ? { reasoningEffort: choice.effort } : {}
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sheet-option-copy",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sheet-option-title",
								children: choice.label
							})
						}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sheet-option-check",
							"aria-hidden": true,
							children: "√"
						})]
					}, choice.key);
				})]
			})
		]
	});
}
/** The permission-preset picker; full access needs an explicit confirm. */
function PermissionSheet({ sessionId, value, onChanged, onClose }) {
	const [confirming, setConfirming] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(void 0);
	/** Submit `/permission <value>` as a slash command (mode-agnostic). */
	const submit = (0, import_react.useCallback)((next) => {
		if (busy) return;
		setBusy(true);
		setError(void 0);
		sendCommand(sessionId, `/permission ${next}`).then(() => {
			setBusy(false);
			setConfirming(null);
			onChanged(next);
			onClose();
		}, (reason) => {
			setBusy(false);
			setConfirming(null);
			setError(errorText(reason));
		});
	}, [
		busy,
		sessionId,
		onChanged,
		onClose
	]);
	const choose = (next) => {
		if (next === value.currentValue) {
			onClose();
			return;
		}
		if (next === "danger-full-access") {
			setConfirming(next);
			return;
		}
		submit(next);
	};
	if (confirming !== null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: "确认完全权限",
		onClose: () => {
			setConfirming(null);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sheet-confirm-desc",
				children: "开启完全权限后，远程会话可以在工作区内执行任意操作（包括运行命令、修改所有文件与访问凭证）。 仅在您信任当前设备和网络时开启。"
			}),
			error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sheet-error",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet-confirm-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mobile-button",
					disabled: busy,
					onClick: () => {
						setConfirming(null);
					},
					children: "取消"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "sheet-confirm-danger",
					disabled: busy,
					onClick: () => {
						submit(confirming);
					},
					children: busy ? "提交中…" : "确认开启"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: "权限",
		onClose,
		children: [error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "sheet-error",
			children: error
		}), value.options.map((option) => {
			const isSelected = option.value === value.currentValue;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: `sheet-option${isSelected ? " sheet-option-selected" : ""}`,
				disabled: busy,
				onClick: () => {
					choose(option.value);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "sheet-option-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sheet-option-title",
						children: option.name
					}), option.description !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sheet-option-desc",
						children: option.description
					})]
				}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sheet-option-check",
					"aria-hidden": true,
					children: "√"
				})]
			}, option.value);
		})]
	});
}
/** The display-options sheet: tool calls and injected system messages toggles. */
function DisplaySheet({ showToolCalls, showSystemMessages, onToolCalls, onSystemMessages, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		title: "显示",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "group",
			"aria-label": "显示选项",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet-toggle-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet-toggle-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sheet-toggle-title",
						children: "工具调用"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sheet-toggle-desc",
						children: "显示助手使用的工具调用"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "switch",
					"aria-label": "工具调用",
					"aria-checked": showToolCalls,
					className: `sheet-toggle-switch${showToolCalls ? " sheet-toggle-switch-on" : ""}`,
					onClick: () => {
						onToolCalls(!showToolCalls);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sheet-toggle-switch-knob",
						"aria-hidden": true
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet-toggle-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet-toggle-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sheet-toggle-title",
						children: "系统提示词"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sheet-toggle-desc",
						children: "显示注入到对话中的系统消息"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "switch",
					"aria-label": "系统提示词",
					"aria-checked": showSystemMessages,
					className: `sheet-toggle-switch${showSystemMessages ? " sheet-toggle-switch-on" : ""}`,
					onClick: () => {
						onSystemMessages(!showSystemMessages);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sheet-toggle-switch-knob",
						"aria-hidden": true
					})
				})]
			})]
		})
	});
}
//#endregion
//#region src/mobile/views/SessionListView.tsx
/**
* Sessions level: one workspace's sessions, loaded incrementally — the
* first page fetches session.list with a cursor, scrolling appends further
* pages (never the whole list at once). Rows are filtered to the opened
* workspace by its owned session ids; extra pages are pulled on demand so
* a workspace with many sessions converges without a full transfer.
*
* Creating a session is this level's other action: the workspace's id is
* sent to session.create (the host attaches the new session to it), the
* fresh row is prepended optimistically, and the user lands straight in
* the new chat — the same "new session opens" flow as the desktop UI.
*/
/** Rows that belong to the opened workspace (its owned session id set). */
function ownedItems(page, workspace) {
	const owned = new Set(workspace.sessionIds);
	return page.filter((item) => owned.has(item.sessionId)).map((item) => toSessionView(item));
}
/**
* Render one workspace's paged session list.
* @param props - the workspace, back action, and pick action.
* @returns the session list.
*/
function SessionListView({ workspace, onBack, onPick }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [hasMore, setHasMore] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(void 0);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [createError, setCreateError] = (0, import_react.useState)(void 0);
	const cursorRef = (0, import_react.useRef)(void 0);
	const busyRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		setError(void 0);
		Promise.all([listSessions(), listWorkspaces()]).then(([page, workspaces]) => {
			if (cancelled) return;
			const current = workspaces.find((candidate) => candidate.workspaceId === workspace.workspaceId) ?? workspace;
			setRows(ownedItems(page.items, current));
			cursorRef.current = page.nextCursor;
			setHasMore(page.hasMore);
			setLoading(false);
		}, (reason) => {
			if (cancelled) return;
			setError(errorText(reason));
			setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [workspace]);
	/** Pull the next page and append the rows that belong to this workspace. */
	const loadMore = (0, import_react.useCallback)(() => {
		if (busyRef.current) return;
		const cursor = cursorRef.current;
		if (cursor === void 0) return;
		busyRef.current = true;
		setLoading(true);
		listSessions(cursor).then((page) => {
			busyRef.current = false;
			setLoading(false);
			cursorRef.current = page.nextCursor;
			setHasMore(page.hasMore);
			setRows((previous) => [...previous, ...ownedItems(page.items, workspace)]);
		}, (reason) => {
			busyRef.current = false;
			setLoading(false);
			setError(errorText(reason));
		});
	}, [workspace]);
	/** Create a blank session in this workspace and open it immediately. */
	const handleCreate = (0, import_react.useCallback)(() => {
		if (creating) return;
		setCreating(true);
		setCreateError(void 0);
		createSession({ workspaceId: workspace.workspaceId }).then((created) => {
			setCreating(false);
			const view = {
				sessionId: created.sessionId,
				title: "新会话",
				updatedAt: Date.now(),
				running: false,
				blank: true
			};
			setRows((previous) => [view, ...previous]);
			onPick(view);
		}, (reason) => {
			setCreating(false);
			setCreateError(errorText(reason));
		});
	}, [
		creating,
		workspace,
		onPick
	]);
	const createHint = createError !== void 0 ? staleHostHint(createError) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mobile",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mobile-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mobile-back",
						"aria-label": "返回",
						onClick: onBack,
						children: "‹"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mobile-title mobile-titleInline",
						children: workspace.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
				]
			}),
			error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mobile-error mobile-pad",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-pad",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mobile-new",
					disabled: creating,
					onClick: () => {
						handleCreate();
					},
					children: creating ? "创建中…" : "+ 新建会话"
				})
			}),
			createError !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mobile-error mobile-pad",
				children: [createError, createHint !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mobile-hint",
					children: createHint
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mobile-list",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "mobile-row",
					onClick: () => {
						onPick(row);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mobile-rowMain",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mobile-rowTitle",
							children: [row.blank ? "新会话" : row.title, row.running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mobile-live",
								children: "●"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mobile-rowMeta",
							children: formatTime(row.updatedAt)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mobile-chevron",
						children: "›"
					})]
				}) }, row.sessionId))
			}),
			hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-pad",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mobile-button mobile-block",
					disabled: loading,
					onClick: () => {
						loadMore();
					},
					children: loading ? "加载中…" : "加载更多会话"
				})
			}),
			!hasMore && rows.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-empty",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mobile-muted",
					children: "该工作区还没有会话，点上方按钮新建一个"
				})
			})
		]
	});
}
//#endregion
//#region src/mobile/views/WorkspaceView.tsx
/**
* Landing level: the workspace roster. The mobile surface opens straight
* here — no new-session homepage — and every workspace row is a thin
* fetch from workspace.list (the roster is small; sessions are not loaded
* until a workspace is opened).
*/
/**
* Render the workspace roster.
* @param props - the pick action.
* @returns the roster.
*/
function WorkspaceView({ initialWorkspaceId, onPick }) {
	const [items, setItems] = (0, import_react.useState)(void 0);
	const [error, setError] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listWorkspaces().then((rows) => {
			if (cancelled) return;
			const target = initialWorkspaceId === void 0 ? void 0 : rows.find((workspace) => workspace.workspaceId === initialWorkspaceId);
			if (target !== void 0) {
				onPick(target);
				return;
			}
			setItems(rows);
		}, (reason) => {
			if (cancelled) return;
			setError(errorText(reason));
		});
		return () => {
			cancelled = true;
		};
	}, [initialWorkspaceId, onPick]);
	if (error !== void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mobile",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mobile-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mobile-title",
				children: "工作区"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mobile-empty",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mobile-error",
				children: ["加载失败：", error]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mobile-button",
				onClick: () => {
					setError(void 0);
					setItems(void 0);
				},
				children: "重试"
			})]
		})]
	});
	if (items === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mobile",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mobile-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mobile-title",
				children: "工作区"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mobile-empty",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mobile-muted",
				children: "加载中…"
			})
		})]
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mobile",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mobile-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mobile-title",
				children: "工作区"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mobile-empty",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mobile-muted",
				children: "暂无工作区"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mobile",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mobile-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mobile-title",
				children: "工作区"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mobile-list",
			children: items.map((workspace) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "mobile-row",
				onClick: () => {
					onPick(workspace);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mobile-rowTitle",
						children: workspace.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mobile-rowMeta",
						children: workspace.path
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mobile-chevron",
						children: "›"
					})
				]
			}) }, workspace.workspaceId))
		})]
	});
}
//#endregion
//#region src/mobile/views/App.tsx
/**
* Mobile surface root: the view state machine (workspaces → sessions →
* chat) and the top-level data flows. Deliberately plain React state — no
* router, no state library: the surface is three fixed levels with a back
* affordance, and every piece of data is fetched on demand.
*/
/** Read the optional workspace target carried from the pairing QR flow. */
function mobileWorkspaceTarget(search) {
	const value = new URLSearchParams(search).get("workspace");
	return value === null || value === "" ? void 0 : value;
}
/** Map a list row to the surface model; the title comes from projections when present. */
function toSessionView(item) {
	const titleValue = item.projections?.values?.title;
	const title = typeof titleValue === "string" && titleValue !== "" ? titleValue : item.cwd !== void 0 ? item.cwd.split("/").filter(Boolean).at(-1) ?? item.cwd : "新会话";
	return {
		sessionId: item.sessionId,
		title,
		...item.cwd !== void 0 ? { cwd: item.cwd } : {},
		updatedAt: item.updatedAt,
		running: item.running,
		blank: item.blank
	};
}
/** Human clock, e.g. "14:05" or "昨天 20:31". */
function formatTime(epochMs) {
	const date = new Date(epochMs);
	const clock = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
	const today = /* @__PURE__ */ new Date();
	if (date.toDateString() === today.toDateString()) return clock;
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	if (date.toDateString() === yesterday.toDateString()) return `昨天 ${clock}`;
	return `${String(date.getMonth() + 1)}月${String(date.getDate())}日 ${clock}`;
}
/**
* The surface root.
* @returns the app tree.
*/
function App() {
	const [route, setRoute] = (0, import_react.useState)({ kind: "workspaces" });
	const [initialWorkspaceId, setInitialWorkspaceId] = (0, import_react.useState)(() => mobileWorkspaceTarget(window.location.search));
	const muxRef = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		const mux = new MuxClient();
		muxRef.current = mux;
		mux.start();
		return () => {
			mux.stop();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		muxRef.current?.observe(route.kind === "chat" ? route.session.sessionId : void 0);
	}, [route]);
	const back = (0, import_react.useCallback)(() => {
		setRoute((previous) => {
			if (previous.kind === "chat") return {
				kind: "sessions",
				workspace: previous.workspace
			};
			if (previous.kind === "sessions") return { kind: "workspaces" };
			return previous;
		});
	}, []);
	const openChat = (0, import_react.useCallback)((session, workspace) => {
		setRoute({
			kind: "chat",
			session,
			workspace
		});
	}, []);
	const openWorkspace = (0, import_react.useCallback)((workspace) => {
		if (initialWorkspaceId !== void 0) {
			const url = new URL(window.location.href);
			url.searchParams.delete("workspace");
			window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
			setInitialWorkspaceId(void 0);
		}
		setRoute({
			kind: "sessions",
			workspace
		});
	}, [initialWorkspaceId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mobile",
		children: route.kind === "workspaces" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceView, {
			initialWorkspaceId,
			onPick: openWorkspace
		}) : route.kind === "sessions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionListView, {
			workspace: route.workspace,
			onBack: back,
			onPick: (session) => {
				openChat(session, route.workspace);
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatView, {
			session: route.session,
			mux: muxRef.current,
			onBack: back
		})
	});
}
/** Shared error text for the surface's small failure affordances. */
function errorText(error) {
	if (error instanceof RpcCallError) return error.error.message;
	if (error instanceof RpcTransportError) return error.message;
	if (error instanceof Error) return error.message;
	return String(error);
}
/**
* Actionable hint for transport-level 403s on host-gated channels (model
* picker, session creation): the phone's UI bundle is served fresh from disk
* per request, while the host-side allowlist lives in the long-running
* process — a rebuild without a restart shows the new surface against the
* old allowlist (HTTP 403 forbidden).
*/
function staleHostHint(message) {
	return /^HTTP 403/.test(message) ? "宿主端插件可能仍在运行旧版本：请重启 dsh web 后再试。" : void 0;
}
/** Fetch one history page (tail by default) — thin wrapper so views share the call shape. */
function loadHistory(sessionId, beforeSeq, signal) {
	return history(sessionId, beforeSeq, void 0, signal);
}
//#endregion
//#region src/mobile/mobile-styles.ts
/**
* Mobile surface stylesheet, shipped as a string and injected at boot (the
* standalone page has no CSS-module pipeline).
*/
const mobileCss = `/* Mobile surface chrome: standalone stylesheet (no main-UI design tokens —
   this page boots without the shell). Light-first palette; the dark palette
   applies only when the header toggle sets [data-theme='dark']. */

:root {
  --m-bg: #f3f5f9;
  --m-bg-raised: #ffffff;
  --m-bg-input: #ffffff;
  --m-border: #dfe4ec;
  --m-text: #1c2333;
  --m-text-secondary: #4d5768;
  --m-text-tertiary: #8b95a7;
  --m-accent: #2f6fed;
  --m-accent-soft: rgba(47, 111, 237, 0.12);
  --m-danger: #d64545;
  --m-success: #1e9e6a;
  --m-radius: 12px;
  --m-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
  --m-shadow-raise: 0 6px 20px rgba(16, 24, 40, 0.1);
  --m-backdrop: rgba(15, 23, 42, 0.4);
}

:root[data-theme='dark'] {
  --m-bg: #111418;
  --m-bg-raised: #1a1f26;
  --m-bg-input: #20262e;
  --m-border: #2b333d;
  --m-text: #e8eaed;
  --m-text-secondary: #9aa3ad;
  --m-text-tertiary: #6b747f;
  --m-accent: #4f8cff;
  --m-accent-soft: rgba(79, 140, 255, 0.14);
  --m-danger: #e5534b;
  --m-success: #3fb68b;
  --m-radius: 12px;
  --m-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  --m-shadow-raise: 0 6px 20px rgba(0, 0, 0, 0.4);
  --m-backdrop: rgba(0, 0, 0, 0.55);
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: var(--m-bg);
  color: var(--m-text);
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Noto Sans SC', 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
}

/* The app fills exactly one viewport: the page itself never scrolls, each
   view owns its scroll region (chat history, session lists) and the chat
   composer stays pinned to the bottom of the screen. */
#root {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mobile {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── header ─────────────────────────────────────────────────────────── */

.mobile-header {
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: calc(env(safe-area-inset-top, 0px) + 12px) 16px 10px;
  background: color-mix(in srgb, var(--m-bg) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--m-border);
}

.mobile-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}

.mobile-titleInline {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-back {
  flex: none;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--m-text);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.12s ease, box-shadow 0.12s ease;
}

.mobile-back:active {
  background: var(--m-bg-raised);
}

.mobile-back:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--m-bg), 0 0 0 4px var(--m-accent);
}

.mobile-theme-toggle {
  flex: none;
  margin-left: auto;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--m-text-secondary);
  cursor: pointer;
  transition: background-color 0.12s ease, color 0.12s ease, box-shadow 0.12s ease;
}

.mobile-theme-toggle:active {
  background: var(--m-bg-raised);
}

.mobile-theme-toggle:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--m-bg), 0 0 0 4px var(--m-accent);
}

.mobile-theme-toggle svg {
  width: 18px;
  height: 18px;
}

/* ── lists ───────────────────────────────────────────────────────────── */

.mobile-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 8px 0 calc(env(safe-area-inset-bottom, 0px) + 16px);
}

.mobile-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: calc(100% - 24px);
  margin: 0 12px 8px;
  padding: 13px 14px;
  border: 1px solid var(--m-border);
  border-radius: 14px;
  background: var(--m-bg-raised);
  box-shadow: var(--m-shadow);
  color: var(--m-text);
  text-align: left;
  cursor: pointer;
}

.mobile-row:active {
  background: color-mix(in srgb, var(--m-text) 5%, var(--m-bg-raised));
}

.mobile-rowMain {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.mobile-rowTitle {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
}

.mobile-rowMeta {
  flex: none;
  color: var(--m-text-tertiary);
  font-size: 12px;
}

.mobile-chevron {
  flex: none;
  color: var(--m-text-tertiary);
  font-size: 18px;
}

.mobile-live {
  margin-left: 6px;
  color: var(--m-success);
  font-size: 10px;
  vertical-align: middle;
}

/* ── empty / error states ────────────────────────────────────────────── */

.mobile-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px;
}

.mobile-muted {
  margin: 0;
  color: var(--m-text-tertiary);
}

.mobile-error {
  margin: 0;
  color: var(--m-danger);
}

.mobile-pad {
  padding: 8px 16px;
}

/* ── buttons ─────────────────────────────────────────────────────────── */

.mobile-button {
  height: 38px;
  padding: 0 18px;
  border: 1px solid var(--m-border);
  border-radius: 10px;
  background: var(--m-bg-raised);
  color: var(--m-text);
  font-size: 14px;
  cursor: pointer;
}

.mobile-button:disabled {
  opacity: 0.5;
}

.mobile-block {
  display: block;
  width: calc(100% - 32px);
  margin: 4px 16px;
}

/* Primary action (create session): accent fill, readable on both themes. */
.mobile-new {
  display: block;
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--m-accent) 0%, #4c8dff 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(47, 111, 237, 0.3);
}

.mobile-new:active {
  opacity: 0.88;
}

.mobile-new:disabled {
  opacity: 0.6;
}

.mobile-hint {
  display: block;
  margin-top: 2px;
  color: var(--m-text-tertiary);
  font-size: 12px;
}

/* ── chat ────────────────────────────────────────────────────────────── */

.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chat-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px 14px calc(env(safe-area-inset-bottom, 0px) + 12px);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-msg {
  max-width: 88%;
  padding: 10px 12px;
  border-radius: var(--m-radius);
  font-size: 14.5px;
  line-height: 1.55;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.chat-msg-user {
  align-self: flex-end;
  background: linear-gradient(135deg, var(--m-accent) 0%, #4c8dff 100%);
  color: #fff;
  border-bottom-right-radius: 4px;
  box-shadow: 0 1px 3px rgba(47, 111, 237, 0.28);
}

.chat-msg-assistant {
  align-self: flex-start;
  background: var(--m-bg-raised);
  border: 1px solid var(--m-border);
  border-bottom-left-radius: 4px;
  box-shadow: var(--m-shadow);
}

.chat-msg-pending .chat-msg-text::after {
  content: '▍';
  animation: chat-blink 1s steps(2) infinite;
}

@keyframes chat-blink {
  50% {
    opacity: 0;
  }
}

.chat-msg-failed {
  border-color: var(--m-danger);
}

.chat-msg-failtag {
  display: inline-block;
  margin-top: 6px;
  padding: 1px 8px;
  border: 1px solid var(--m-danger);
  border-radius: 999px;
  color: var(--m-danger);
  font-size: 11px;
}

.chat-msg-time {
  display: block;
  margin-top: 4px;
  color: var(--m-text-tertiary);
  font-size: 10.5px;
  line-height: 1.2;
}

.chat-msg-toggle {
  display: block;
  margin-top: 8px;
  padding: 4px 0;
  border: none;
  background: transparent;
  color: var(--m-accent);
  font-size: 13px;
  cursor: pointer;
}

/* Assistant markdown content (GFM subset; renderer in markdown.ts). */
.chat-md {
  white-space: normal;
}
.chat-md-collapsed {
  max-height: 45vh;
  overflow: hidden;
  position: relative;
}
.chat-md-collapsed::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 28px;
  background: linear-gradient(transparent, var(--m-bg-raised));
  pointer-events: none;
}
.chat-md-body p { margin: 0 0 8px; }
.chat-md-body p:last-child { margin-bottom: 0; }
.chat-md-body h1, .chat-md-body h2, .chat-md-body h3,
.chat-md-body h4, .chat-md-body h5, .chat-md-body h6 {
  margin: 12px 0 6px;
  font-weight: 650;
  line-height: 1.3;
}
.chat-md-body h1 { font-size: 1.35em; }
.chat-md-body h2 { font-size: 1.25em; }
.chat-md-body h3 { font-size: 1.15em; }
.chat-md-body h4, .chat-md-body h5, .chat-md-body h6 { font-size: 1.05em; }
.chat-md-body code {
  font-family: var(--m-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: 0.9em;
  background: var(--m-accent-soft);
  padding: 1px 5px;
  border-radius: 4px;
}
.chat-md-body pre {
  margin: 8px 0;
  padding: 10px;
  background: #101726;
  color: #dbe4f5;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 12.5px;
  line-height: 1.5;
}
.chat-md-body pre code {
  background: transparent;
  padding: 0;
  color: inherit;
}
.chat-md-body ul, .chat-md-body ol { margin: 4px 0 8px; padding-left: 22px; }
.chat-md-body li { margin: 2px 0; }
.chat-md-body blockquote {
  margin: 8px 0;
  padding: 4px 10px;
  border-left: 3px solid var(--m-accent);
  background: var(--m-accent-soft);
  border-radius: 0 6px 6px 0;
  color: var(--m-text-secondary);
}
.chat-md-body table {
  margin: 8px 0;
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
  font-size: 13px;
}
.chat-md-body th, .chat-md-body td {
  border: 1px solid var(--m-border);
  padding: 4px 8px;
}
.chat-md-body th { background: var(--m-accent-soft); }
.chat-md-body a { color: var(--m-accent); }
.chat-md-body hr { border: none; border-top: 1px solid var(--m-border); margin: 10px 0; }
.chat-md-body img { max-width: 100%; border-radius: 8px; }

/* ── message disclosures (reasoning / tools) ─────────────────────────── */

.chat-disclosure {
  margin-bottom: 8px;
  border: 1px solid var(--m-border);
  border-radius: 10px;
  background: color-mix(in srgb, var(--m-bg) 55%, transparent);
  overflow: hidden;
}

.chat-disclosure-head {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 7px 10px;
  border: none;
  background: transparent;
  color: var(--m-text);
  font-size: 12.5px;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
}

.chat-disclosure-caret {
  flex: none;
  color: var(--m-text-tertiary);
  font-size: 14px;
  line-height: 1;
  transition: transform 0.15s ease;
}

.chat-disclosure-open .chat-disclosure-caret {
  transform: rotate(90deg);
}

.chat-disclosure-label {
  flex: none;
  color: var(--m-text-secondary);
}

.chat-reasoning[data-pending] .chat-disclosure-label {
  color: var(--m-accent);
}

.chat-disclosure-summary {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--m-text-tertiary);
  font-size: 12px;
}

.chat-disclosure-count {
  flex: none;
  color: var(--m-text-tertiary);
  font-size: 11px;
}

.chat-disclosure-body {
  padding: 8px 10px 10px;
  border-top: 1px dashed var(--m-border);
  color: var(--m-text-secondary);
  font-size: 12.5px;
  line-height: 1.6;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-height: 40vh;
  overflow-y: auto;
}

.chat-tools-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-tool-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat-tool-name {
  color: var(--m-text);
  font-size: 12.5px;
  font-weight: 600;
}

.chat-tool-args {
  margin: 0;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--m-bg-input);
  color: var(--m-text-secondary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

/* ── composer toolbar (model / permission chips) ─────────────────────── */

.chat-tools {
  display: flex;
  gap: 8px;
  padding: 6px 12px 0;
}

.chat-chip {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--m-border);
  border-radius: 999px;
  background: var(--m-bg-raised);
  box-shadow: var(--m-shadow);
  color: var(--m-text);
  font-size: 12px;
  cursor: pointer;
}

.chat-chip:active {
  border-color: var(--m-accent);
  background: var(--m-accent-soft);
}

.chat-chip-label {
  flex: none;
  color: var(--m-text-tertiary);
}

.chat-chip-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-chip-chevron {
  flex: none;
  color: var(--m-text-tertiary);
  font-size: 14px;
}

/* ── bottom sheets ───────────────────────────────────────────────────── */

.sheet-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: var(--m-backdrop);
  animation: sheet-fade 0.18s ease;
}

@keyframes sheet-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.sheet {
  max-height: 74dvh;
  display: flex;
  flex-direction: column;
  background: var(--m-bg-raised);
  border: 1px solid var(--m-border);
  border-bottom: none;
  border-radius: 16px 16px 0 0;
  box-shadow: var(--m-shadow-raise);
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 10px);
  animation: sheet-up 0.22s ease;
}

@keyframes sheet-up {
  from {
    transform: translateY(40px);
    opacity: 0.6;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.sheet-handle {
  flex: none;
  align-self: center;
  width: 36px;
  height: 4px;
  margin: 8px 0 4px;
  border-radius: 999px;
  background: var(--m-border);
}

.sheet-title {
  flex: none;
  padding: 6px 16px 10px;
  font-size: 15px;
  font-weight: 600;
}

.sheet-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 0 12px 8px;
}

.sheet-status {
  padding: 18px 8px;
  color: var(--m-text-tertiary);
  font-size: 13px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.sheet-status-error {
  color: var(--m-danger);
}

.sheet-hint {
  margin: 0;
  color: var(--m-text-secondary);
  font-size: 12px;
  line-height: 1.5;
  max-width: 32em;
}

.sheet-error {
  margin: 0 0 8px;
  color: var(--m-danger);
  font-size: 12.5px;
}

.sheet-section {
  margin-bottom: 14px;
}

.sheet-section-title {
  padding: 4px 8px 6px;
  color: var(--m-text-tertiary);
  font-size: 12px;
  font-weight: 600;
}

.sheet-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: var(--m-text);
  text-align: left;
  cursor: pointer;
}

.sheet-option:active {
  background: var(--m-bg-input);
}

.sheet-option-selected {
  border-color: var(--m-accent);
  background: color-mix(in srgb, var(--m-accent) 12%, transparent);
}

.sheet-option:disabled {
  opacity: 0.5;
}

.sheet-option-copy {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sheet-option-title {
  font-size: 14px;
}

.sheet-option-desc {
  color: var(--m-text-tertiary);
  font-size: 12px;
  line-height: 1.4;
}

.sheet-option-check {
  flex: none;
  color: var(--m-accent);
  font-size: 15px;
  font-weight: 700;
}

.sheet-confirm-desc {
  margin: 0 4px 14px;
  color: var(--m-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.sheet-confirm-actions {
  display: flex;
  gap: 10px;
  padding: 4px;
}

.sheet-confirm-actions .mobile-button {
  flex: 1;
}

.sheet-confirm-danger {
  flex: 1;
  height: 38px;
  border: none;
  border-radius: 10px;
  background: var(--m-danger);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.sheet-confirm-danger:disabled {
  opacity: 0.5;
}

.chat-meta {
  margin-top: 4px;
  color: var(--m-text-tertiary);
  font-size: 11px;
}

.chat-typing {
  color: var(--m-text-tertiary);
  font-size: 13px;
  padding: 4px 2px;
}

.chat-inputbar {
  display: flex;
  gap: 8px;
  padding: 10px 12px calc(env(safe-area-inset-bottom, 0px) + 10px);
  border-top: 1px solid var(--m-border);
  background: var(--m-bg);
}

.chat-input {
  flex: 1;
  min-width: 0;
  min-height: 40px;
  max-height: 120px;
  /* Grow with the content (still bounded by min/max-height); browsers
     without field-sizing support ignore this line and keep the old size. */
  field-sizing: content;
  padding: 9px 12px;
  border: 1px solid var(--m-border);
  border-radius: 10px;
  background: var(--m-bg-input);
  color: var(--m-text);
  font: inherit;
  font-size: 14.5px;
  resize: none;
  outline: none;
}

.chat-input:focus {
  border-color: var(--m-accent);
}

.chat-send {
  flex: none;
  align-self: flex-end;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 10px;
  background: var(--m-accent);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.chat-send:disabled {
  opacity: 0.5;
}

.chat-load-older {
  align-self: center;
  margin: 4px 0;
  border: none;
  background: transparent;
  color: var(--m-text-secondary);
  font-size: 13px;
  cursor: pointer;
  padding: 6px 10px;
}

/* Touch surfaces have no hover, so keyboard focus must be fully visible.
   One shared ring keeps every interactive control consistent and readable
   on both palettes. */
.mobile-row:focus-visible,
.mobile-button:focus-visible,
.mobile-new:focus-visible,
.chat-send:focus-visible,
.chat-chip:focus-visible,
.chat-msg-toggle:focus-visible,
.chat-load-older:focus-visible,
.chat-disclosure-head:focus-visible,
.sheet-option:focus-visible,
.sheet-confirm-danger:focus-visible,
.sheet-toggle-switch:focus-visible,
.chat-input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--m-bg), 0 0 0 4px var(--m-accent);
}

/* ── chat context usage chip (chat-tools row) ───────────────────────── */

.chat-context {
  flex: none;
  align-self: center;
  padding: 2px 10px;
  border: 1px solid var(--m-border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--m-text-tertiary) 10%, transparent);
  color: var(--m-text-tertiary);
  font-size: 11px;
  line-height: 1.6;
  white-space: nowrap;
}

.chat-context-warn {
  border-color: var(--m-danger);
  background: color-mix(in srgb, var(--m-danger) 14%, transparent);
  color: var(--m-danger);
}

/* ── display sheet toggle rows ──────────────────────────────────────── */

.sheet-toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-bottom: 1px solid var(--m-border);
}

.sheet-toggle-row:last-child {
  border-bottom: none;
}

.sheet-toggle-copy {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sheet-toggle-title {
  font-size: 14px;
}

.sheet-toggle-desc {
  color: var(--m-text-tertiary);
  font-size: 12px;
  line-height: 1.4;
}

.sheet-toggle-switch {
  position: relative;
  flex: none;
  width: 44px;
  height: 26px;
  border: none;
  border-radius: 999px;
  background: var(--m-border);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.sheet-toggle-switch-on {
  background: var(--m-accent);
}

.sheet-toggle-switch-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.2);
  transition: transform 0.15s ease;
}

.sheet-toggle-switch-on .sheet-toggle-switch-knob {
  transform: translateX(18px);
}

/* Accessibility: collapse every interaction/enter animation for
   reduced-motion users; surface layout itself stays static. */
@media (prefers-reduced-motion: reduce) {
  .mobile-theme-toggle,
  .mobile-back,
  .mobile-row,
  .mobile-button,
  .mobile-new,
  .chat-send,
  .chat-chip,
  .chat-msg-toggle,
  .chat-load-older,
  .chat-disclosure-head,
  .chat-disclosure-caret,
  .chat-msg-pending .chat-msg-text::after,
  .sheet-backdrop,
  .sheet,
  .sheet-option,
  .sheet-confirm-danger,
  .sheet-toggle-switch,
  .sheet-toggle-switch-knob,
  .chat-input {
    animation: none;
    transition: none;
  }
}
`;
//#endregion
//#region src/mobile/index.tsx
/**
* Mobile surface entry: the standalone phone UI served at /m. Boots its own
* React tree (no main-UI module loader), talks to the host over the shared
* /api transport with the paired-device cookie, and renders a deliberately
* thin three-level surface:
*   workspaces (landing, no new-session homepage) → sessions (paged) →
*   chat (history paged on demand + live mux stream + prompt input).
*/
initMobileTheme();
const style = document.createElement("style");
style.dataset.plugin = "remote-web-ui/mobile";
style.textContent = mobileCss;
document.head.appendChild(style);
const root = document.getElementById("root");
if (root === null) throw new Error("mobile: #root missing");
(0, import_client.createRoot)(root).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}));
//#endregion

//# sourceMappingURL=mobile.js.map