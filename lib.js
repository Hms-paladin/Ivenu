! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("react")) : "function" == typeof define && define.amd ? define(["react"], t) : "object" == typeof exports ? exports.ReactPhoneInput = t(require("react")) : e.ReactPhoneInput = t(e.React)
}(this, function(e) {
    return function(e) {
        var t = {};

        function r(n) {
            if (t[n]) return t[n].exports;
            var a = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports
        }
        return r.m = e, r.c = t, r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }, r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, r.t = function(e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var a in e) r.d(n, a, function(t) {
                    return e[t]
                }.bind(null, a));
            return n
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return r.d(t, "a", t), t
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, r.p = "", r(r.s = 8)
    }([function(t, r) {
        t.exports = e
    }, function(e, t, r) {
        var n;
        /*!
          Copyright (c) 2017 Jed Watson.
          Licensed under the MIT License (MIT), see
          http://jedwatson.github.io/classnames
        */
        /*!
          Copyright (c) 2017 Jed Watson.
          Licensed under the MIT License (MIT), see
          http://jedwatson.github.io/classnames
        */
        ! function() {
            "use strict";
            var r = {}.hasOwnProperty;

            function a() {
                for (var e = [], t = 0; t < arguments.length; t++) {
                    var n = arguments[t];
                    if (n) {
                        var o = typeof n;
                        if ("string" === o || "number" === o) e.push(n);
                        else if (Array.isArray(n) && n.length) {
                            var i = a.apply(null, n);
                            i && e.push(i)
                        } else if ("object" === o)
                            for (var u in n) r.call(n, u) && n[u] && e.push(u)
                    }
                }
                return e.join(" ")
            }
            e.exports ? (a.default = a, e.exports = a) : void 0 === (n = function() {
                return a
            }.apply(t, [])) || (e.exports = n)
        }()
    }, function(e, t) {
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || new Function("return this")()
        } catch (e) {
            "object" == typeof window && (r = window)
        }
        e.exports = r
    }, function(e, t, r) {
        (function(t) {
            var r = "Expected a function",
                n = "__lodash_hash_undefined__",
                a = "[object Function]",
                o = "[object GeneratorFunction]",
                i = /^\[object .+?Constructor\]$/,
                u = "object" == typeof t && t && t.Object === Object && t,
                c = "object" == typeof self && self && self.Object === Object && self,
                s = u || c || Function("return this")();
            var l, f = Array.prototype,
                d = Function.prototype,
                p = Object.prototype,
                h = s["__core-js_shared__"],
                y = (l = /[^.]+$/.exec(h && h.keys && h.keys.IE_PROTO || "")) ? "Symbol(src)_1." + l : "",
                m = d.toString,
                g = p.hasOwnProperty,
                b = p.toString,
                v = RegExp("^" + m.call(g).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                C = f.splice,
                _ = I(s, "Map"),
                w = I(Object, "create");

            function S(e) {
                var t = -1,
                    r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }

            function j(e) {
                var t = -1,
                    r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }

            function k(e) {
                var t = -1,
                    r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }

            function x(e, t) {
                for (var r, n, a = e.length; a--;)
                    if ((r = e[a][0]) === (n = t) || r != r && n != n) return a;
                return -1
            }

            function O(e) {
                return !(!N(e) || (t = e, y && y in t)) && (function(e) {
                    var t = N(e) ? b.call(e) : "";
                    return t == a || t == o
                }(e) || function(e) {
                    var t = !1;
                    if (null != e && "function" != typeof e.toString) try {
                        t = !!(e + "")
                    } catch (e) {}
                    return t
                }(e) ? v : i).test(function(e) {
                    if (null != e) {
                        try {
                            return m.call(e)
                        } catch (e) {}
                        try {
                            return e + ""
                        } catch (e) {}
                    }
                    return ""
                }(e));
                var t
            }

            function E(e, t) {
                var r, n, a = e.__data__;
                return ("string" == (n = typeof(r = t)) || "number" == n || "symbol" == n || "boolean" == n ? "__proto__" !== r : null === r) ? a["string" == typeof t ? "string" : "hash"] : a.map
            }

            function I(e, t) {
                var r = function(e, t) {
                    return null == e ? void 0 : e[t]
                }(e, t);
                return O(r) ? r : void 0
            }

            function T(e, t) {
                if ("function" != typeof e || t && "function" != typeof t) throw new TypeError(r);
                var n = function() {
                    var r = arguments,
                        a = t ? t.apply(this, r) : r[0],
                        o = n.cache;
                    if (o.has(a)) return o.get(a);
                    var i = e.apply(this, r);
                    return n.cache = o.set(a, i), i
                };
                return n.cache = new(T.Cache || k), n
            }

            function N(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }
            S.prototype.clear = function() {
                this.__data__ = w ? w(null) : {}
            }, S.prototype.delete = function(e) {
                return this.has(e) && delete this.__data__[e]
            }, S.prototype.get = function(e) {
                var t = this.__data__;
                if (w) {
                    var r = t[e];
                    return r === n ? void 0 : r
                }
                return g.call(t, e) ? t[e] : void 0
            }, S.prototype.has = function(e) {
                var t = this.__data__;
                return w ? void 0 !== t[e] : g.call(t, e)
            }, S.prototype.set = function(e, t) {
                return this.__data__[e] = w && void 0 === t ? n : t, this
            }, j.prototype.clear = function() {
                this.__data__ = []
            }, j.prototype.delete = function(e) {
                var t = this.__data__,
                    r = x(t, e);
                return !(r < 0 || (r == t.length - 1 ? t.pop() : C.call(t, r, 1), 0))
            }, j.prototype.get = function(e) {
                var t = this.__data__,
                    r = x(t, e);
                return r < 0 ? void 0 : t[r][1]
            }, j.prototype.has = function(e) {
                return x(this.__data__, e) > -1
            }, j.prototype.set = function(e, t) {
                var r = this.__data__,
                    n = x(r, e);
                return n < 0 ? r.push([e, t]) : r[n][1] = t, this
            }, k.prototype.clear = function() {
                this.__data__ = {
                    hash: new S,
                    map: new(_ || j),
                    string: new S
                }
            }, k.prototype.delete = function(e) {
                return E(this, e).delete(e)
            }, k.prototype.get = function(e) {
                return E(this, e).get(e)
            }, k.prototype.has = function(e) {
                return E(this, e).has(e)
            }, k.prototype.set = function(e, t) {
                return E(this, e).set(e, t), this
            }, T.Cache = k, e.exports = T
        }).call(this, r(2))
    }, function(e, t, r) {
        (function(t) {
            var r = "Expected a function",
                n = NaN,
                a = "[object Symbol]",
                o = /^\s+|\s+$/g,
                i = /^[-+]0x[0-9a-f]+$/i,
                u = /^0b[01]+$/i,
                c = /^0o[0-7]+$/i,
                s = parseInt,
                l = "object" == typeof t && t && t.Object === Object && t,
                f = "object" == typeof self && self && self.Object === Object && self,
                d = l || f || Function("return this")(),
                p = Object.prototype.toString,
                h = Math.max,
                y = Math.min,
                m = function() {
                    return d.Date.now()
                };

            function g(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function b(e) {
                if ("number" == typeof e) return e;
                if (function(e) {
                        return "symbol" == typeof e || function(e) {
                            return !!e && "object" == typeof e
                        }(e) && p.call(e) == a
                    }(e)) return n;
                if (g(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = g(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(o, "");
                var r = u.test(e);
                return r || c.test(e) ? s(e.slice(2), r ? 2 : 8) : i.test(e) ? n : +e
            }
            e.exports = function(e, t, n) {
                var a, o, i, u, c, s, l = 0,
                    f = !1,
                    d = !1,
                    p = !0;
                if ("function" != typeof e) throw new TypeError(r);

                function v(t) {
                    var r = a,
                        n = o;
                    return a = o = void 0, l = t, u = e.apply(n, r)
                }

                function C(e) {
                    var r = e - s;
                    return void 0 === s || r >= t || r < 0 || d && e - l >= i
                }

                function _() {
                    var e = m();
                    if (C(e)) return w(e);
                    c = setTimeout(_, function(e) {
                        var r = t - (e - s);
                        return d ? y(r, i - (e - l)) : r
                    }(e))
                }

                function w(e) {
                    return c = void 0, p && a ? v(e) : (a = o = void 0, u)
                }

                function S() {
                    var e = m(),
                        r = C(e);
                    if (a = arguments, o = this, s = e, r) {
                        if (void 0 === c) return function(e) {
                            return l = e, c = setTimeout(_, t), f ? v(e) : u
                        }(s);
                        if (d) return c = setTimeout(_, t), v(s)
                    }
                    return void 0 === c && (c = setTimeout(_, t)), u
                }
                return t = b(t) || 0, g(n) && (f = !!n.leading, i = (d = "maxWait" in n) ? h(b(n.maxWait) || 0, t) : i, p = "trailing" in n ? !!n.trailing : p), S.cancel = function() {
                    void 0 !== c && clearTimeout(c), l = 0, a = s = o = c = void 0
                }, S.flush = function() {
                    return void 0 === c ? u : w(m())
                }, S
            }
        }).call(this, r(2))
    }, function(e, t, r) {
        (function(e, r) {
            var n = 200,
                a = "Expected a function",
                o = "__lodash_hash_undefined__",
                i = 1,
                u = 2,
                c = 1 / 0,
                s = 9007199254740991,
                l = "[object Arguments]",
                f = "[object Array]",
                d = "[object Boolean]",
                p = "[object Date]",
                h = "[object Error]",
                y = "[object Function]",
                m = "[object GeneratorFunction]",
                g = "[object Map]",
                b = "[object Number]",
                v = "[object Object]",
                C = "[object RegExp]",
                _ = "[object Set]",
                w = "[object String]",
                S = "[object Symbol]",
                j = "[object ArrayBuffer]",
                k = "[object DataView]",
                x = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                O = /^\w*$/,
                E = /^\./,
                I = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                T = /\\(\\)?/g,
                N = /^\[object .+?Constructor\]$/,
                A = /^(?:0|[1-9]\d*)$/,
                D = {};
            D["[object Float32Array]"] = D["[object Float64Array]"] = D["[object Int8Array]"] = D["[object Int16Array]"] = D["[object Int32Array]"] = D["[object Uint8Array]"] = D["[object Uint8ClampedArray]"] = D["[object Uint16Array]"] = D["[object Uint32Array]"] = !0, D[l] = D[f] = D[j] = D[d] = D[k] = D[p] = D[h] = D[y] = D[g] = D[b] = D[v] = D[C] = D[_] = D[w] = D["[object WeakMap]"] = !1;
            var P = "object" == typeof e && e && e.Object === Object && e,
                M = "object" == typeof self && self && self.Object === Object && self,
                R = P || M || Function("return this")(),
                z = t && !t.nodeType && t,
                F = z && "object" == typeof r && r && !r.nodeType && r,
                B = F && F.exports === z && P.process,
                L = function() {
                    try {
                        return B && B.binding("util")
                    } catch (e) {}
                }(),
                G = L && L.isTypedArray;

            function K(e, t, r, n) {
                var a = -1,
                    o = e ? e.length : 0;
                for (n && o && (r = e[++a]); ++a < o;) r = t(r, e[a], a, e);
                return r
            }

            function $(e, t) {
                for (var r = -1, n = e ? e.length : 0; ++r < n;)
                    if (t(e[r], r, e)) return !0;
                return !1
            }

            function W(e, t, r, n, a) {
                return a(e, function(e, a, o) {
                    r = n ? (n = !1, e) : t(r, e, a, o)
                }), r
            }

            function q(e) {
                var t = !1;
                if (null != e && "function" != typeof e.toString) try {
                    t = !!(e + "")
                } catch (e) {}
                return t
            }

            function U(e) {
                var t = -1,
                    r = Array(e.size);
                return e.forEach(function(e, n) {
                    r[++t] = [n, e]
                }), r
            }

            function V(e) {
                var t = -1,
                    r = Array(e.size);
                return e.forEach(function(e) {
                    r[++t] = e
                }), r
            }
            var H, Z, J, Q = Array.prototype,
                Y = Function.prototype,
                X = Object.prototype,
                ee = R["__core-js_shared__"],
                te = (H = /[^.]+$/.exec(ee && ee.keys && ee.keys.IE_PROTO || "")) ? "Symbol(src)_1." + H : "",
                re = Y.toString,
                ne = X.hasOwnProperty,
                ae = X.toString,
                oe = RegExp("^" + re.call(ne).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                ie = R.Symbol,
                ue = R.Uint8Array,
                ce = X.propertyIsEnumerable,
                se = Q.splice,
                le = (Z = Object.keys, J = Object, function(e) {
                    return Z(J(e))
                }),
                fe = qe(R, "DataView"),
                de = qe(R, "Map"),
                pe = qe(R, "Promise"),
                he = qe(R, "Set"),
                ye = qe(R, "WeakMap"),
                me = qe(Object, "create"),
                ge = Xe(fe),
                be = Xe(de),
                ve = Xe(pe),
                Ce = Xe(he),
                _e = Xe(ye),
                we = ie ? ie.prototype : void 0,
                Se = we ? we.valueOf : void 0,
                je = we ? we.toString : void 0;

            function ke(e) {
                var t = -1,
                    r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }

            function xe(e) {
                var t = -1,
                    r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }

            function Oe(e) {
                var t = -1,
                    r = e ? e.length : 0;
                for (this.clear(); ++t < r;) {
                    var n = e[t];
                    this.set(n[0], n[1])
                }
            }

            function Ee(e) {
                var t = -1,
                    r = e ? e.length : 0;
                for (this.__data__ = new Oe; ++t < r;) this.add(e[t])
            }

            function Ie(e) {
                this.__data__ = new xe(e)
            }

            function Te(e, t) {
                var r = nt(e) || rt(e) ? function(e, t) {
                        for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
                        return n
                    }(e.length, String) : [],
                    n = r.length,
                    a = !!n;
                for (var o in e) !t && !ne.call(e, o) || a && ("length" == o || Ve(o, n)) || r.push(o);
                return r
            }

            function Ne(e, t) {
                for (var r = e.length; r--;)
                    if (tt(e[r][0], t)) return r;
                return -1
            }
            ke.prototype.clear = function() {
                this.__data__ = me ? me(null) : {}
            }, ke.prototype.delete = function(e) {
                return this.has(e) && delete this.__data__[e]
            }, ke.prototype.get = function(e) {
                var t = this.__data__;
                if (me) {
                    var r = t[e];
                    return r === o ? void 0 : r
                }
                return ne.call(t, e) ? t[e] : void 0
            }, ke.prototype.has = function(e) {
                var t = this.__data__;
                return me ? void 0 !== t[e] : ne.call(t, e)
            }, ke.prototype.set = function(e, t) {
                return this.__data__[e] = me && void 0 === t ? o : t, this
            }, xe.prototype.clear = function() {
                this.__data__ = []
            }, xe.prototype.delete = function(e) {
                var t = this.__data__,
                    r = Ne(t, e);
                return !(r < 0 || (r == t.length - 1 ? t.pop() : se.call(t, r, 1), 0))
            }, xe.prototype.get = function(e) {
                var t = this.__data__,
                    r = Ne(t, e);
                return r < 0 ? void 0 : t[r][1]
            }, xe.prototype.has = function(e) {
                return Ne(this.__data__, e) > -1
            }, xe.prototype.set = function(e, t) {
                var r = this.__data__,
                    n = Ne(r, e);
                return n < 0 ? r.push([e, t]) : r[n][1] = t, this
            }, Oe.prototype.clear = function() {
                this.__data__ = {
                    hash: new ke,
                    map: new(de || xe),
                    string: new ke
                }
            }, Oe.prototype.delete = function(e) {
                return We(this, e).delete(e)
            }, Oe.prototype.get = function(e) {
                return We(this, e).get(e)
            }, Oe.prototype.has = function(e) {
                return We(this, e).has(e)
            }, Oe.prototype.set = function(e, t) {
                return We(this, e).set(e, t), this
            }, Ee.prototype.add = Ee.prototype.push = function(e) {
                return this.__data__.set(e, o), this
            }, Ee.prototype.has = function(e) {
                return this.__data__.has(e)
            }, Ie.prototype.clear = function() {
                this.__data__ = new xe
            }, Ie.prototype.delete = function(e) {
                return this.__data__.delete(e)
            }, Ie.prototype.get = function(e) {
                return this.__data__.get(e)
            }, Ie.prototype.has = function(e) {
                return this.__data__.has(e)
            }, Ie.prototype.set = function(e, t) {
                var r = this.__data__;
                if (r instanceof xe) {
                    var a = r.__data__;
                    if (!de || a.length < n - 1) return a.push([e, t]), this;
                    r = this.__data__ = new Oe(a)
                }
                return r.set(e, t), this
            };
            var Ae, De, Pe = (Ae = function(e, t) {
                    return e && Me(e, t, ft)
                }, function(e, t) {
                    if (null == e) return e;
                    if (!at(e)) return Ae(e, t);
                    for (var r = e.length, n = De ? r : -1, a = Object(e);
                        (De ? n-- : ++n < r) && !1 !== t(a[n], n, a););
                    return e
                }),
                Me = function(e) {
                    return function(t, r, n) {
                        for (var a = -1, o = Object(t), i = n(t), u = i.length; u--;) {
                            var c = i[e ? u : ++a];
                            if (!1 === r(o[c], c, o)) break
                        }
                        return t
                    }
                }();

            function Re(e, t) {
                for (var r = 0, n = (t = He(t, e) ? [t] : Ke(t)).length; null != e && r < n;) e = e[Ye(t[r++])];
                return r && r == n ? e : void 0
            }

            function ze(e, t) {
                return null != e && t in Object(e)
            }

            function Fe(e, t, r, n, a) {
                return e === t || (null == e || null == t || !ut(e) && !ct(t) ? e != e && t != t : function(e, t, r, n, a, o) {
                    var c = nt(e),
                        s = nt(t),
                        y = f,
                        m = f;
                    c || (y = (y = Ue(e)) == l ? v : y);
                    s || (m = (m = Ue(t)) == l ? v : m);
                    var x = y == v && !q(e),
                        O = m == v && !q(t),
                        E = y == m;
                    if (E && !x) return o || (o = new Ie), c || lt(e) ? $e(e, t, r, n, a, o) : function(e, t, r, n, a, o, c) {
                        switch (r) {
                            case k:
                                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                                e = e.buffer, t = t.buffer;
                            case j:
                                return !(e.byteLength != t.byteLength || !n(new ue(e), new ue(t)));
                            case d:
                            case p:
                            case b:
                                return tt(+e, +t);
                            case h:
                                return e.name == t.name && e.message == t.message;
                            case C:
                            case w:
                                return e == t + "";
                            case g:
                                var s = U;
                            case _:
                                var l = o & u;
                                if (s || (s = V), e.size != t.size && !l) return !1;
                                var f = c.get(e);
                                if (f) return f == t;
                                o |= i, c.set(e, t);
                                var y = $e(s(e), s(t), n, a, o, c);
                                return c.delete(e), y;
                            case S:
                                if (Se) return Se.call(e) == Se.call(t)
                        }
                        return !1
                    }(e, t, y, r, n, a, o);
                    if (!(a & u)) {
                        var I = x && ne.call(e, "__wrapped__"),
                            T = O && ne.call(t, "__wrapped__");
                        if (I || T) {
                            var N = I ? e.value() : e,
                                A = T ? t.value() : t;
                            return o || (o = new Ie), r(N, A, n, a, o)
                        }
                    }
                    if (!E) return !1;
                    return o || (o = new Ie),
                        function(e, t, r, n, a, o) {
                            var i = a & u,
                                c = ft(e),
                                s = c.length,
                                l = ft(t).length;
                            if (s != l && !i) return !1;
                            for (var f = s; f--;) {
                                var d = c[f];
                                if (!(i ? d in t : ne.call(t, d))) return !1
                            }
                            var p = o.get(e);
                            if (p && o.get(t)) return p == t;
                            var h = !0;
                            o.set(e, t), o.set(t, e);
                            for (var y = i; ++f < s;) {
                                d = c[f];
                                var m = e[d],
                                    g = t[d];
                                if (n) var b = i ? n(g, m, d, t, e, o) : n(m, g, d, e, t, o);
                                if (!(void 0 === b ? m === g || r(m, g, n, a, o) : b)) {
                                    h = !1;
                                    break
                                }
                                y || (y = "constructor" == d)
                            }
                            if (h && !y) {
                                var v = e.constructor,
                                    C = t.constructor;
                                v != C && "constructor" in e && "constructor" in t && !("function" == typeof v && v instanceof v && "function" == typeof C && C instanceof C) && (h = !1)
                            }
                            return o.delete(e), o.delete(t), h
                        }(e, t, r, n, a, o)
                }(e, t, Fe, r, n, a))
            }

            function Be(e) {
                return !(!ut(e) || (t = e, te && te in t)) && (ot(e) || q(e) ? oe : N).test(Xe(e));
                var t
            }

            function Le(e) {
                return "function" == typeof e ? e : null == e ? dt : "object" == typeof e ? nt(e) ? function(e, t) {
                    if (He(e) && Ze(t)) return Je(Ye(e), t);
                    return function(r) {
                        var n = function(e, t, r) {
                            var n = null == e ? void 0 : Re(e, t);
                            return void 0 === n ? r : n
                        }(r, e);
                        return void 0 === n && n === t ? function(e, t) {
                            return null != e && function(e, t, r) {
                                t = He(t, e) ? [t] : Ke(t);
                                var n, a = -1,
                                    o = t.length;
                                for (; ++a < o;) {
                                    var i = Ye(t[a]);
                                    if (!(n = null != e && r(e, i))) break;
                                    e = e[i]
                                }
                                if (n) return n;
                                return !!(o = e ? e.length : 0) && it(o) && Ve(i, o) && (nt(e) || rt(e))
                            }(e, t, ze)
                        }(r, e) : Fe(t, n, void 0, i | u)
                    }
                }(e[0], e[1]) : function(e) {
                    var t = function(e) {
                        var t = ft(e),
                            r = t.length;
                        for (; r--;) {
                            var n = t[r],
                                a = e[n];
                            t[r] = [n, a, Ze(a)]
                        }
                        return t
                    }(e);
                    if (1 == t.length && t[0][2]) return Je(t[0][0], t[0][1]);
                    return function(r) {
                        return r === e || function(e, t, r, n) {
                            var a = r.length,
                                o = a,
                                c = !n;
                            if (null == e) return !o;
                            for (e = Object(e); a--;) {
                                var s = r[a];
                                if (c && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1
                            }
                            for (; ++a < o;) {
                                var l = (s = r[a])[0],
                                    f = e[l],
                                    d = s[1];
                                if (c && s[2]) {
                                    if (void 0 === f && !(l in e)) return !1
                                } else {
                                    var p = new Ie;
                                    if (n) var h = n(f, d, l, e, t, p);
                                    if (!(void 0 === h ? Fe(d, f, n, i | u, p) : h)) return !1
                                }
                            }
                            return !0
                        }(r, e, t)
                    }
                }(e) : He(t = e) ? (r = Ye(t), function(e) {
                    return null == e ? void 0 : e[r]
                }) : function(e) {
                    return function(t) {
                        return Re(t, e)
                    }
                }(t);
                var t, r
            }

            function Ge(e) {
                if (r = (t = e) && t.constructor, n = "function" == typeof r && r.prototype || X, t !== n) return le(e);
                var t, r, n, a = [];
                for (var o in Object(e)) ne.call(e, o) && "constructor" != o && a.push(o);
                return a
            }

            function Ke(e) {
                return nt(e) ? e : Qe(e)
            }

            function $e(e, t, r, n, a, o) {
                var c = a & u,
                    s = e.length,
                    l = t.length;
                if (s != l && !(c && l > s)) return !1;
                var f = o.get(e);
                if (f && o.get(t)) return f == t;
                var d = -1,
                    p = !0,
                    h = a & i ? new Ee : void 0;
                for (o.set(e, t), o.set(t, e); ++d < s;) {
                    var y = e[d],
                        m = t[d];
                    if (n) var g = c ? n(m, y, d, t, e, o) : n(y, m, d, e, t, o);
                    if (void 0 !== g) {
                        if (g) continue;
                        p = !1;
                        break
                    }
                    if (h) {
                        if (!$(t, function(e, t) {
                                if (!h.has(t) && (y === e || r(y, e, n, a, o))) return h.add(t)
                            })) {
                            p = !1;
                            break
                        }
                    } else if (y !== m && !r(y, m, n, a, o)) {
                        p = !1;
                        break
                    }
                }
                return o.delete(e), o.delete(t), p
            }

            function We(e, t) {
                var r, n, a = e.__data__;
                return ("string" == (n = typeof(r = t)) || "number" == n || "symbol" == n || "boolean" == n ? "__proto__" !== r : null === r) ? a["string" == typeof t ? "string" : "hash"] : a.map
            }

            function qe(e, t) {
                var r = function(e, t) {
                    return null == e ? void 0 : e[t]
                }(e, t);
                return Be(r) ? r : void 0
            }
            var Ue = function(e) {
                return ae.call(e)
            };

            function Ve(e, t) {
                return !!(t = null == t ? s : t) && ("number" == typeof e || A.test(e)) && e > -1 && e % 1 == 0 && e < t
            }

            function He(e, t) {
                if (nt(e)) return !1;
                var r = typeof e;
                return !("number" != r && "symbol" != r && "boolean" != r && null != e && !st(e)) || (O.test(e) || !x.test(e) || null != t && e in Object(t))
            }

            function Ze(e) {
                return e == e && !ut(e)
            }

            function Je(e, t) {
                return function(r) {
                    return null != r && (r[e] === t && (void 0 !== t || e in Object(r)))
                }
            }(fe && Ue(new fe(new ArrayBuffer(1))) != k || de && Ue(new de) != g || pe && "[object Promise]" != Ue(pe.resolve()) || he && Ue(new he) != _ || ye && "[object WeakMap]" != Ue(new ye)) && (Ue = function(e) {
                var t = ae.call(e),
                    r = t == v ? e.constructor : void 0,
                    n = r ? Xe(r) : void 0;
                if (n) switch (n) {
                    case ge:
                        return k;
                    case be:
                        return g;
                    case ve:
                        return "[object Promise]";
                    case Ce:
                        return _;
                    case _e:
                        return "[object WeakMap]"
                }
                return t
            });
            var Qe = et(function(e) {
                var t;
                e = null == (t = e) ? "" : function(e) {
                    if ("string" == typeof e) return e;
                    if (st(e)) return je ? je.call(e) : "";
                    var t = e + "";
                    return "0" == t && 1 / e == -c ? "-0" : t
                }(t);
                var r = [];
                return E.test(e) && r.push(""), e.replace(I, function(e, t, n, a) {
                    r.push(n ? a.replace(T, "$1") : t || e)
                }), r
            });

            function Ye(e) {
                if ("string" == typeof e || st(e)) return e;
                var t = e + "";
                return "0" == t && 1 / e == -c ? "-0" : t
            }

            function Xe(e) {
                if (null != e) {
                    try {
                        return re.call(e)
                    } catch (e) {}
                    try {
                        return e + ""
                    } catch (e) {}
                }
                return ""
            }

            function et(e, t) {
                if ("function" != typeof e || t && "function" != typeof t) throw new TypeError(a);
                var r = function() {
                    var n = arguments,
                        a = t ? t.apply(this, n) : n[0],
                        o = r.cache;
                    if (o.has(a)) return o.get(a);
                    var i = e.apply(this, n);
                    return r.cache = o.set(a, i), i
                };
                return r.cache = new(et.Cache || Oe), r
            }

            function tt(e, t) {
                return e === t || e != e && t != t
            }

            function rt(e) {
                return function(e) {
                    return ct(e) && at(e)
                }(e) && ne.call(e, "callee") && (!ce.call(e, "callee") || ae.call(e) == l)
            }
            et.Cache = Oe;
            var nt = Array.isArray;

            function at(e) {
                return null != e && it(e.length) && !ot(e)
            }

            function ot(e) {
                var t = ut(e) ? ae.call(e) : "";
                return t == y || t == m
            }

            function it(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= s
            }

            function ut(e) {
                var t = typeof e;
                return !!e && ("object" == t || "function" == t)
            }

            function ct(e) {
                return !!e && "object" == typeof e
            }

            function st(e) {
                return "symbol" == typeof e || ct(e) && ae.call(e) == S
            }
            var lt = G ? function(e) {
                return function(t) {
                    return e(t)
                }
            }(G) : function(e) {
                return ct(e) && it(e.length) && !!D[ae.call(e)]
            };

            function ft(e) {
                return at(e) ? Te(e) : Ge(e)
            }

            function dt(e) {
                return e
            }
            r.exports = function(e, t, r) {
                var n = nt(e) ? K : W,
                    a = arguments.length < 3;
                return n(e, Le(t), r, a, Pe)
            }
        }).call(this, r(2), r(6)(e))
    }, function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                enumerable: !0,
                get: function() {
                    return e.l
                }
            }), Object.defineProperty(e, "id", {
                enumerable: !0,
                get: function() {
                    return e.i
                }
            }), e.webpackPolyfill = 1), e
        }
    }, function(e, t, r) {}, function(e, t, r) {
        "use strict";

        function n(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r, e
        }

        function a(e) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
        }

        function o(e) {
            return function(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, r = new Array(e.length); t < e.length; t++) r[t] = e[t];
                    return r
                }
            }(e) || a(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }

        function i(e) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || a(e) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }

        function u(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function c(e) {
            return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function s(e) {
            return (s = "function" == typeof Symbol && "symbol" === c(Symbol.iterator) ? function(e) {
                return c(e)
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : c(e)
            })(e)
        }

        function l(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function f(e) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function d(e, t) {
            return (d = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }
        r.r(t);
        var p, h = r(0),
            y = r.n(h),
            m = r(4),
            g = r.n(m),
            b = r(3),
            v = r.n(b),
            C = r(5),
            _ = r.n(C),
            w = r(1),
            S = r.n(w);
        var j = {};

        function k(e, t, r) {
            t in j || (j[t] = []);
            var n = r || 0;
            j[t][n] = e
        }
        var x = {
                allCountries: (p = []).concat.apply(p, o([
                    ["Afghanistan", ["asia"], "af", "93"],
                    ["Albania", ["europe"], "al", "355"],
                    ["Algeria", ["africa", "north-africa"], "dz", "213"],
                    ["American Samoa", ["oceania"], "as", "1684"],
                    ["Andorra", ["europe"], "ad", "376"],
                    ["Angola", ["africa"], "ao", "244"],
                    ["Anguilla", ["america", "carribean"], "ai", "1264"],
                    ["Antigua and Barbuda", ["america", "carribean"], "ag", "1268"],
                    ["Argentina", ["america", "south-america"], "ar", "54", "+.. (..) ........"],
                    ["Armenia", ["asia", "ex-ussr"], "am", "374"],
                    ["Aruba", ["america", "carribean"], "aw", "297"],
                    ["Australia", ["oceania"], "au", "61", "+.. ... ... ..."],
                    ["Austria", ["europe", "european-union"], "at", "43"],
                    ["Azerbaijan", ["asia", "ex-ussr"], "az", "994"],
                    ["Bahamas", ["america", "carribean"], "bs", "1242"],
                    ["Bahrain", ["middle-east"], "bh", "973"],
                    ["Bangladesh", ["asia"], "bd", "880"],
                    ["Barbados", ["america", "carribean"], "bb", "1246"],
                    ["Belarus", ["europe", "ex-ussr"], "by", "375", "+... (..) ... .. .."],
                    ["Belgium", ["europe", "european-union"], "be", "32", "+.. ... .. .. .."],
                    ["Belize", ["america", "central-america"], "bz", "501"],
                    ["Benin", ["africa"], "bj", "229"],
                    ["Bermuda", ["america", "north-america"], "bm", "1441"],
                    ["Bhutan", ["asia"], "bt", "975"],
                    ["Bolivia", ["america", "south-america"], "bo", "591"],
                    ["Bosnia and Herzegovina", ["europe"], "ba", "387"],
                    ["Botswana", ["africa"], "bw", "267"],
                    ["Brazil", ["america", "south-america"], "br", "55", "+.. (..) ........."],
                    ["British Indian Ocean Territory", ["asia"], "io", "246"],
                    ["British Virgin Islands", ["america", "carribean"], "vg", "1284"],
                    ["Brunei", ["asia"], "bn", "673"],
                    ["Bulgaria", ["europe", "european-union"], "bg", "359"],
                    ["Burkina Faso", ["africa"], "bf", "226"],
                    ["Burundi", ["africa"], "bi", "257"],
                    ["Cambodia", ["asia"], "kh", "855"],
                    ["Cameroon", ["africa"], "cm", "237"],
                    ["Canada", ["america", "north-america"], "ca", "1", "+. (...) ...-....", 1, ["204", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
                    ["Cape Verde", ["africa"], "cv", "238"],
                    ["Caribbean Netherlands", ["america", "carribean"], "bq", "599", "", 1],
                    ["Cayman Islands", ["america", "carribean"], "ky", "1345"],
                    ["Central African Republic", ["africa"], "cf", "236"],
                    ["Chad", ["africa"], "td", "235"],
                    ["Chile", ["america", "south-america"], "cl", "56"],
                    ["China", ["asia"], "cn", "86", "+.. ..-........."],
                    ["Colombia", ["america", "south-america"], "co", "57"],
                    ["Comoros", ["africa"], "km", "269"],
                    ["Congo", ["africa"], "cd", "243"],
                    ["Congo", ["africa"], "cg", "242"],
                    ["Cook Islands", ["oceania"], "ck", "682"],
                    ["Costa Rica", ["america", "central-america"], "cr", "506", "+... ....-...."],
                    ["CÃ´te dâ€™Ivoire", ["africa"], "ci", "225"],
                    ["Croatia", ["europe", "european-union"], "hr", "385"],
                    ["Cuba", ["america", "carribean"], "cu", "53"],
                    ["CuraÃ§ao", ["america", "carribean"], "cw", "599", "", 0],
                    ["Cyprus", ["europe", "european-union"], "cy", "357", "+... .. ......"],
                    ["Czech Republic", ["europe", "european-union"], "cz", "420"],
                    ["Denmark", ["europe", "european-union"], "dk", "45", "+.. .. .. .. .."],
                    ["Djibouti", ["africa"], "dj", "253"],
                    ["Dominica", ["america", "carribean"], "dm", "1767"],
                    ["Dominican Republic", ["america", "carribean"], "do", "1", "", 2, ["809", "829", "849"]],
                    ["Ecuador", ["america", "south-america"], "ec", "593"],
                    ["Egypt", ["africa", "north-africa"], "eg", "20"],
                    ["El Salvador", ["america", "central-america"], "sv", "503", "+... ....-...."],
                    ["Equatorial Guinea", ["africa"], "gq", "240"],
                    ["Eritrea", ["africa"], "er", "291"],
                    ["Estonia", ["europe", "european-union", "ex-ussr"], "ee", "372", "+... .... ......"],
                    ["Ethiopia", ["africa"], "et", "251"],
                    ["Falkland Islands", ["america", "south-america"], "fk", "500"],
                    ["Faroe Islands", ["europe"], "fo", "298"],
                    ["Fiji", ["oceania"], "fj", "679"],
                    ["Finland", ["europe", "european-union"], "fi", "358", "+... .. ... .. .."],
                    ["France", ["europe", "european-union"], "fr", "33", "+.. . .. .. .. .."],
                    ["French Guiana", ["america", "south-america"], "gf", "594"],
                    ["French Polynesia", ["oceania"], "pf", "689"],
                    ["Gabon", ["africa"], "ga", "241"],
                    ["Gambia", ["africa"], "gm", "220"],
                    ["Georgia", ["asia", "ex-ussr"], "ge", "995"],
                    ["Germany", ["europe", "european-union"], "de", "49", "+.. .... ........"],
                    ["Ghana", ["africa"], "gh", "233"],
                    ["Gibraltar", ["europe"], "gi", "350"],
                    ["Greece", ["europe", "european-union"], "gr", "30"],
                    ["Greenland", ["america"], "gl", "299"],
                    ["Grenada", ["america", "carribean"], "gd", "1473"],
                    ["Guadeloupe", ["america", "carribean"], "gp", "590", "", 0],
                    ["Guam", ["oceania"], "gu", "1671"],
                    ["Guatemala", ["america", "central-america"], "gt", "502", "+... ....-...."],
                    ["Guinea", ["africa"], "gn", "224"],
                    ["Guinea-Bissau", ["africa"], "gw", "245"],
                    ["Guyana", ["america", "south-america"], "gy", "592"],
                    ["Haiti", ["america", "carribean"], "ht", "509", "+... ....-...."],
                    ["Honduras", ["america", "central-america"], "hn", "504"],
                    ["Hong Kong", ["asia"], "hk", "852", "+... .... ...."],
                    ["Hungary", ["europe", "european-union"], "hu", "36"],
                    ["Iceland", ["europe"], "is", "354", "+... ... ...."],
                    ["India", ["asia"], "in", "91", "+.. .....-....."],
                    ["Indonesia", ["asia"], "id", "62"],
                    ["Iran", ["middle-east"], "ir", "98"],
                    ["Iraq", ["middle-east"], "iq", "964"],
                    ["Ireland", ["europe", "european-union"], "ie", "353", "+... .. ......."],
                    ["Israel", ["middle-east"], "il", "972", "+... ... ... ...."],
                    ["Italy", ["europe", "european-union"], "it", "39", "+.. ... .......", 0],
                    ["Jamaica", ["america", "carribean"], "jm", "1876"],
                    ["Japan", ["asia"], "jp", "81", "+.. .. .... ...."],
                    ["Jordan", ["middle-east"], "jo", "962"],
                    ["Kazakhstan", ["asia", "ex-ussr"], "kz", "7", "+. ... ...-..-..", 1, ["313", "327", "7172", "312", "73622", "321", "324", "336", "318", "315", "325", "311", "326", "310"]],
                    ["Kenya", ["africa"], "ke", "254"],
                    ["Kiribati", ["oceania"], "ki", "686"],
                    ["Kuwait", ["middle-east"], "kw", "965"],
                    ["Kyrgyzstan", ["asia", "ex-ussr"], "kg", "996"],
                    ["Laos", ["asia"], "la", "856"],
                    ["Latvia", ["europe", "european-union", "ex-ussr"], "lv", "371"],
                    ["Lebanon", ["middle-east"], "lb", "961"],
                    ["Lesotho", ["africa"], "ls", "266"],
                    ["Liberia", ["africa"], "lr", "231"],
                    ["Libya", ["africa", "north-africa"], "ly", "218"],
                    ["Liechtenstein", ["europe"], "li", "423"],
                    ["Lithuania", ["europe", "european-union", "ex-ussr"], "lt", "370"],
                    ["Luxembourg", ["europe", "european-union"], "lu", "352"],
                    ["Macau", ["asia"], "mo", "853"],
                    ["Macedonia", ["europe"], "mk", "389"],
                    ["Madagascar", ["africa"], "mg", "261"],
                    ["Malawi", ["africa"], "mw", "265"],
                    ["Malaysia", ["asia"], "my", "60", "+.. ..-....-...."],
                    ["Maldives", ["asia"], "mv", "960"],
                    ["Mali", ["africa"], "ml", "223"],
                    ["Malta", ["europe", "european-union"], "mt", "356"],
                    ["Marshall Islands", ["oceania"], "mh", "692"],
                    ["Martinique", ["america", "carribean"], "mq", "596"],
                    ["Mauritania", ["africa"], "mr", "222"],
                    ["Mauritius", ["africa"], "mu", "230"],
                    ["Mexico", ["america", "central-america"], "mx", "52"],
                    ["Micronesia", ["oceania"], "fm", "691"],
                    ["Moldova", ["europe"], "md", "373", "+... (..) ..-..-.."],
                    ["Monaco", ["europe"], "mc", "377"],
                    ["Mongolia", ["asia"], "mn", "976"],
                    ["Montenegro", ["europe"], "me", "382"],
                    ["Montserrat", ["america", "carribean"], "ms", "1664"],
                    ["Morocco", ["africa", "north-africa"], "ma", "212"],
                    ["Mozambique", ["africa"], "mz", "258"],
                    ["Myanmar", ["asia"], "mm", "95"],
                    ["Namibia", ["africa"], "na", "264"],
                    ["Nauru", ["africa"], "nr", "674"],
                    ["Nepal", ["asia"], "np", "977"],
                    ["Netherlands", ["europe", "european-union"], "nl", "31", "+.. .. ........"],
                    ["New Caledonia", ["oceania"], "nc", "687"],
                    ["New Zealand", ["oceania"], "nz", "64", "+.. ...-...-...."],
                    ["Nicaragua", ["america", "central-america"], "ni", "505"],
                    ["Niger", ["africa"], "ne", "227"],
                    ["Nigeria", ["africa"], "ng", "234"],
                    ["Niue", ["asia"], "nu", "683"],
                    ["Norfolk Island", ["oceania"], "nf", "672"],
                    ["North Korea", ["asia"], "kp", "850"],
                    ["Northern Mariana Islands", ["oceania"], "mp", "1670"],
                    ["Norway", ["europe"], "no", "47", "+.. ... .. ..."],
                    ["Oman", ["middle-east"], "om", "968"],
                    ["Pakistan", ["asia"], "pk", "92", "+.. ...-......."],
                    ["Palau", ["oceania"], "pw", "680"],
                    ["Palestine", ["middle-east"], "ps", "970"],
                    ["Panama", ["america", "central-america"], "pa", "507"],
                    ["Papua New Guinea", ["oceania"], "pg", "675"],
                    ["Paraguay", ["america", "south-america"], "py", "595"],
                    ["Peru", ["america", "south-america"], "pe", "51"],
                    ["Philippines", ["asia"], "ph", "63", "+.. .... ......."],
                    ["Poland", ["europe", "european-union"], "pl", "48", "+.. ...-...-..."],
                    ["Portugal", ["europe", "european-union"], "pt", "351"],
                    ["Puerto Rico", ["america", "carribean"], "pr", "1", "", 3, ["787", "939"]],
                    ["Qatar", ["middle-east"], "qa", "974"],
                    ["RÃ©union", ["africa"], "re", "262"],
                    ["Romania", ["europe", "european-union"], "ro", "40"],
                    ["Russia", ["europe", "asia", "ex-ussr"], "ru", "7", "+. (...) ...-..-..", 0],
                    ["Rwanda", ["africa"], "rw", "250"],
                    ["Saint BarthÃ©lemy", ["america", "carribean"], "bl", "590", "", 1],
                    ["Saint Helena", ["africa"], "sh", "290"],
                    ["Saint Kitts and Nevis", ["america", "carribean"], "kn", "1869"],
                    ["Saint Lucia", ["america", "carribean"], "lc", "1758"],
                    ["Saint Martin", ["america", "carribean"], "mf", "590", "", 2],
                    ["Saint Pierre and Miquelon", ["america", "north-america"], "pm", "508"],
                    ["Saint Vincent and the Grenadines", ["america", "carribean"], "vc", "1784"],
                    ["Samoa", ["oceania"], "ws", "685"],
                    ["San Marino", ["europe"], "sm", "378"],
                    ["SÃ£o TomÃ© and PrÃ­ncipe", ["africa"], "st", "239"],
                    ["Saudi Arabia", ["middle-east"], "sa", "966"],
                    ["Senegal", ["africa"], "sn", "221"],
                    ["Serbia", ["europe"], "rs", "381"],
                    ["Seychelles", ["africa"], "sc", "248"],
                    ["Sierra Leone", ["africa"], "sl", "232"],
                    ["Singapore", ["asia"], "sg", "65", "+.. ....-...."],
                    ["Sint Maarten", ["america", "carribean"], "sx", "1721"],
                    ["Slovakia", ["europe", "european-union"], "sk", "421"],
                    ["Slovenia", ["europe", "european-union"], "si", "386"],
                    ["Solomon Islands", ["oceania"], "sb", "677"],
                    ["Somalia", ["africa"], "so", "252"],
                    ["South Africa", ["africa"], "za", "27"],
                    ["South Korea", ["asia"], "kr", "82", "+.. ... .... ...."],
                    ["South Sudan", ["africa", "north-africa"], "ss", "211"],
                    ["Spain", ["europe", "european-union"], "es", "34", "+.. ... ... ..."],
                    ["Sri Lanka", ["asia"], "lk", "94"],
                    ["Sudan", ["africa"], "sd", "249"],
                    ["Suriname", ["america", "south-america"], "sr", "597"],
                    ["Swaziland", ["africa"], "sz", "268"],
                    ["Sweden", ["europe", "european-union"], "se", "46", "+.. (...) ...-..."],
                    ["Switzerland", ["europe"], "ch", "41", "+.. .. ... .. .."],
                    ["Syria", ["middle-east"], "sy", "963"],
                    ["Taiwan", ["asia"], "tw", "886"],
                    ["Tajikistan", ["asia", "ex-ussr"], "tj", "992"],
                    ["Tanzania", ["africa"], "tz", "255"],
                    ["Thailand", ["asia"], "th", "66"],
                    ["Timor-Leste", ["asia"], "tl", "670"],
                    ["Togo", ["africa"], "tg", "228"],
                    ["Tokelau", ["oceania"], "tk", "690"],
                    ["Tonga", ["oceania"], "to", "676"],
                    ["Trinidad and Tobago", ["america", "carribean"], "tt", "1868"],
                    ["Tunisia", ["africa", "north-africa"], "tn", "216"],
                    ["Turkey", ["europe"], "tr", "90", "+.. ... ... .. .."],
                    ["Turkmenistan", ["asia", "ex-ussr"], "tm", "993"],
                    ["Turks and Caicos Islands", ["america", "carribean"], "tc", "1649"],
                    ["Tuvalu", ["asia"], "tv", "688"],
                    ["U.S. Virgin Islands", ["america", "carribean"], "vi", "1340"],
                    ["Uganda", ["africa"], "ug", "256"],
                    ["Ukraine", ["europe", "ex-ussr"], "ua", "380", "+... (..) ... .. .."],
                    ["United Arab Emirates", ["middle-east"], "ae", "971"],
                    ["United Kingdom", ["europe", "european-union"], "gb", "44", "+.. .... ......"],
                    ["United States", ["america", "north-america"], "us", "1", "+. (...) ...-....", 0, ["907", "205", "251", "256", "334", "479", "501", "870", "480", "520", "602", "623", "928", "209", "213", "310", "323", "408", "415", "510", "530", "559", "562", "619", "626", "650", "661", "707", "714", "760", "805", "818", "831", "858", "909", "916", "925", "949", "951", "303", "719", "970", "203", "860", "202", "302", "239", "305", "321", "352", "386", "407", "561", "727", "772", "813", "850", "863", "904", "941", "954", "229", "404", "478", "706", "770", "912", "808", "319", "515", "563", "641", "712", "208", "217", "309", "312", "618", "630", "708", "773", "815", "847", "219", "260", "317", "574", "765", "812", "316", "620", "785", "913", "270", "502", "606", "859", "225", "318", "337", "504", "985", "413", "508", "617", "781", "978", "301", "410", "207", "231", "248", "269", "313", "517", "586", "616", "734", "810", "906", "989", "218", "320", "507", "612", "651", "763", "952", "314", "417", "573", "636", "660", "816", "228", "601", "662", "406", "252", "336", "704", "828", "910", "919", "701", "308", "402", "603", "201", "609", "732", "856", "908", "973", "505", "575", "702", "775", "212", "315", "516", "518", "585", "607", "631", "716", "718", "845", "914", "216", "330", "419", "440", "513", "614", "740", "937", "405", "580", "918", "503", "541", "215", "412", "570", "610", "717", "724", "814", "401", "803", "843", "864", "605", "423", "615", "731", "865", "901", "931", "210", "214", "254", "281", "325", "361", "409", "432", "512", "713", "806", "817", "830", "903", "915", "936", "940", "956", "972", "979", "435", "801", "276", "434", "540", "703", "757", "804", "802", "206", "253", "360", "425", "509", "262", "414", "608", "715", "920", "304", "307"]],
                    ["Uruguay", ["america", "south-america"], "uy", "598"],
                    ["Uzbekistan", ["asia", "ex-ussr"], "uz", "998"],
                    ["Vanuatu", ["oceania"], "vu", "678"],
                    ["Vatican City", ["europe"], "va", "39", "+.. .. .... ....", 1],
                    ["Venezuela", ["america", "south-america"], "ve", "58"],
                    ["Vietnam", ["asia"], "vn", "84"],
                    ["Wallis and Futuna", ["oceania"], "wf", "681"],
                    ["Yemen", ["middle-east"], "ye", "967"],
                    ["Zambia", ["africa"], "zm", "260"],
                    ["Zimbabwe", ["africa"], "zw", "263"]
                ].map(function(e) {
                    var t = {
                            name: e[0],
                            regions: e[1],
                            iso2: e[2],
                            dialCode: e[3],
                            format: e[4] || void 0,
                            priority: e[5] || 0,
                            hasAreaCodes: !!e[6]
                        },
                        r = [];
                    return e[6] && e[6].map(function(a) {
                        var o = function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var r = null != arguments[t] ? arguments[t] : {},
                                    a = Object.keys(r);
                                "function" == typeof Object.getOwnPropertySymbols && (a = a.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
                                    return Object.getOwnPropertyDescriptor(r, e).enumerable
                                }))), a.forEach(function(t) {
                                    n(e, t, r[t])
                                })
                            }
                            return e
                        }({}, t);
                        o.regions = e[1], o.dialCode = e[3] + a, o.isAreaCode = !0, r.push(o), k(e[2], o.dialCode)
                    }), k(t.iso2, t.dialCode, t.hasAreaCodes), r.length > 0 ? [t].concat(r) : [t]
                }))),
                allCountryCodes: j
            },
            O = (r(7), function(e) {
                function t(e) {
                    var r, a, u;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), a = this, u = f(t).call(this, e), (r = !u || "object" !== s(u) && "function" != typeof u ? l(a) : u).deleteAreaCodes = function(e) {
                        return e.filter(function(e) {
                            return !0 !== e.isAreaCode
                        })
                    }, r.filterRegions = function(e, t) {
                        if ("string" == typeof e) {
                            var r = e;
                            return t.filter(function(e) {
                                return e.regions.some(function(e) {
                                    return e === r
                                })
                            })
                        }
                        return t.filter(function(t) {
                            return e.map(function(e) {
                                return t.regions.some(function(t) {
                                    return t === e
                                })
                            }).some(function(e) {
                                return e
                            })
                        })
                    }, r.insertMasks = function(e, t) {
                        var r = function(r) {
                            var n = t.findIndex(function(e) {
                                return e.iso2 == r
                            }); - 1 != n && (t[n].format = e[r])
                        };
                        for (var n in e) r(n);
                        return t
                    }, r.getOnlyCountries = function(e, t) {
                        return 0 === e.length ? t : t.filter(function(t) {
                            return e.some(function(e) {
                                return e === t.iso2
                            })
                        })
                    }, r.excludeCountries = function(e, t) {
                        return 0 === t.length ? e : e.filter(function(e) {
                            return !t.includes(e.iso2)
                        })
                    }, r.getProbableCandidate = v()(function(e) {
                        return e && 0 !== e.length ? r.state.onlyCountries.filter(function(t) {
                            return t.name.toLowerCase().startsWith(e.toLowerCase())
                        }, l(l(r)))[0] : null
                    }), r.guessSelectedCountry = v()(function(e, t, n) {
                        var a = t.find(function(e) {
                            return e.iso2 == n
                        }) || {};
                        if ("" === e.trim()) return a;
                        var o = t.reduce(function(t, r) {
                            if (e.startsWith(r.dialCode)) {
                                if (r.dialCode.length > t.dialCode.length) return r;
                                if (r.dialCode.length === t.dialCode.length && r.priority < t.priority) return r
                            }
                            return t
                        }, {
                            dialCode: "",
                            priority: 10001
                        }, l(l(r)));
                        return o.name ? o : a
                    }), r.updateDefaultCountry = function(e) {
                        var t = r.state.onlyCountries.find(function(t) {
                            return t.iso2 == e
                        });
                        r.setState({
                            defaultCountry: e,
                            selectedCountry: t,
                            formattedNumber: r.props.disableCountryCode ? "" : "+" + t.dialCode
                        })
                    }, r.scrollTo = function(e, t) {
                        if (e) {
                            var n = r.dropdownRef;
                            if (n && document.body) {
                                var a = n.offsetHeight,
                                    o = n.getBoundingClientRect().top + document.body.scrollTop,
                                    i = o + a,
                                    u = e,
                                    c = u.getBoundingClientRect(),
                                    s = u.offsetHeight,
                                    l = c.top + document.body.scrollTop,
                                    f = l + s,
                                    d = l - o + n.scrollTop,
                                    p = a / 2 - s / 2;
                                if (l < o) t && (d -= p), n.scrollTop = d;
                                else if (f > i) {
                                    t && (d += p);
                                    var h = a - s;
                                    n.scrollTop = d - h
                                }
                            }
                        }
                    }, r.formatNumber = function(e, t) {
                        var n, a = r.props,
                            o = a.disableCountryCode,
                            u = a.enableLongNumbers,
                            c = a.autoFormat;
                        if (o && t ? ((n = t.split(" ")).shift(), n = n.join(" ")) : n = t, !e || 0 === e.length) return o ? "" : "+";
                        if (e && e.length < 2 || !n || !c) return o ? e : "+".concat(e);
                        var s, l = _()(n, function(e, t) {
                            if (0 === e.remainingText.length) return e;
                            if ("." !== t) return {
                                formattedText: e.formattedText + t,
                                remainingText: e.remainingText
                            };
                            var r = i(e.remainingText),
                                n = r[0],
                                a = r.slice(1);
                            return {
                                formattedText: e.formattedText + n,
                                remainingText: a
                            }
                        }, {
                            formattedText: "",
                            remainingText: e.split("")
                        });
                        return (s = u ? l.formattedText + l.remainingText.join("") : l.formattedText).includes("(") && !s.includes(")") && (s += ")"), s
                    }, r.cursorToEnd = function() {
                        var e = r.numberInputRef;
                        e.focus();
                        var t = e.value.length;
                        e.setSelectionRange(t, t)
                    }, r.getElement = function(e) {
                        return r["flag_no_".concat(e)]
                    }, r.getCountryData = function() {
                        return r.state.selectedCountry ? {
                            name: r.state.selectedCountry.name || "",
                            dialCode: r.state.selectedCountry.dialCode || "",
                            countryCode: r.state.selectedCountry.iso2 || ""
                        } : {}
                    }, r.handleFlagDropdownClick = function() {
                        if (r.state.showDropdown || !r.props.disabled)
                            if (r.state.preferredCountries.includes(r.state.selectedCountry)) r.setState({
                                showDropdown: !r.state.showDropdown,
                                highlightCountryIndex: r.state.preferredCountries.findIndex(function(e) {
                                    return e == r.state.selectedCountry
                                })
                            }, function() {
                                r.state.showDropdown && r.scrollTo(r.getElement(r.state.highlightCountryIndex))
                            });
                            else {
                                var e = r.props.disableAreaCodes ? r.deleteAreaCodes(r.state.onlyCountries) : r.state.onlyCountries;
                                r.setState({
                                    showDropdown: !r.state.showDropdown,
                                    highlightCountryIndex: r.props.disableAreaCodes ? e.findIndex(function(e) {
                                        return e.iso2 == r.state.selectedCountry.iso2
                                    }) : e.findIndex(function(e) {
                                        return e == r.state.selectedCountry
                                    })
                                }, function() {
                                    r.state.showDropdown && r.scrollTo(r.getElement(r.state.highlightCountryIndex + r.state.preferredCountries.length))
                                })
                            }
                    }, r.handleInput = function(e) {
                        var t = r.props.disableCountryCode ? "" : "+",
                            n = r.state.selectedCountry,
                            a = r.state.freezeSelection;
                        if (!r.props.countryCodeEditable) {
                            var o = "+" + n.dialCode;
                            if (e.target.value.length < o.length) return
                        }
                        if (!(e.target.value.replace(/\D/g, "").length > 15) && e.target.value !== r.state.formattedNumber) {
                            if (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.target.value.length > 0) {
                                var i = e.target.value.replace(/\D/g, "");
                                (!r.state.freezeSelection || r.state.selectedCountry.dialCode.length > i.length) && (n = r.guessSelectedCountry(i.substring(0, 6), r.state.onlyCountries, r.state.defaultCountry), a = !1), t = r.formatNumber(i, n.format), n = n.dialCode ? n : r.state.selectedCountry
                            }
                            var u = e.target.selectionStart,
                                c = r.state.formattedNumber,
                                s = t.length - c.length;
                            r.setState({
                                formattedNumber: t,
                                freezeSelection: a,
                                selectedCountry: n
                            }, function() {
                                s > 0 && (u -= s), ")" == t.charAt(t.length - 1) ? r.numberInputRef.setSelectionRange(t.length - 1, t.length - 1) : u > 0 && c.length >= t.length && r.numberInputRef.setSelectionRange(u, u), r.props.onChange && r.props.onChange(r.state.formattedNumber, r.getCountryData(),r.state.selectedCountry)
                            })
                        }
                    }, r.handleInputClick = function(e) {
                        r.setState({
                            showDropdown: !1
                        }), r.props.onClick && r.props.onClick(e, r.getCountryData())
                    }, r.handleFlagItemClick = function(e) {
                        var t = r.state.selectedCountry,
                            n = r.state.onlyCountries.find(function(t) {
                                return t == e
                            }),
                            a = r.state.formattedNumber.replace(" ", "").replace("(", "").replace(")", "").replace("-", ""),
                            o = a.length > 1 ? a.replace(t.dialCode, n.dialCode) : n.dialCode,
                            i = r.formatNumber(o.replace(/\D/g, ""), n.format);
                        r.setState({
                            showDropdown: !1,
                            selectedCountry: n,
                            freezeSelection: !0,
                            formattedNumber: i
                        }, function() {
                            r.cursorToEnd(), r.props.onChange && r.props.onChange(i.replace(/[^0-9]+/g, ""), r.getCountryData(),r.state.selectedCountry)
                        })
                    }, r.handleInputFocus = function(e) {
                        r.numberInputRef && "+" === r.numberInputRef.value && r.state.selectedCountry && !r.props.disableCountryCode && r.setState({
                            formattedNumber: "+" + r.state.selectedCountry.dialCode
                        }, function() {
                            return setTimeout(r.cursorToEnd, 10)
                        }), r.setState({
                            placeholder: ""
                        }), r.props.onFocus && r.props.onFocus(e, r.getCountryData()), setTimeout(r.cursorToEnd, 10)
                    }, r.handleInputBlur = function(e) {
                        e.target.value || r.setState({
                            placeholder: r.props.placeholder
                        }), r.props.onBlur && r.props.onBlur(e, r.getCountryData())
                    }, r.getHighlightCountryIndex = function(e) {
                        var t = r.state.highlightCountryIndex + e;
                        return t < 0 || t >= r.state.onlyCountries.length + r.state.preferredCountries.length ? t - e : t
                    }, r.searchCountry = function() {
                        var e = r.getProbableCandidate(r.state.queryString) || r.state.onlyCountries[0],
                            t = r.state.onlyCountries.findIndex(function(t) {
                                return t == e
                            }) + r.state.preferredCountries.length;
                        r.scrollTo(r.getElement(t), !0), r.setState({
                            queryString: "",
                            highlightCountryIndex: t
                        })
                    }, r.handleKeydown = function(e) {
                        var t = r.props.keys;
                        if (r.state.showDropdown && !r.props.disabled && "search-box" !== e.target.id) {
                            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                            var n = function(e) {
                                r.setState({
                                    highlightCountryIndex: r.getHighlightCountryIndex(e)
                                }, function() {
                                    r.scrollTo(r.getElement(r.state.highlightCountryIndex + r.state.preferredCountries.length), !0)
                                })
                            };
                            switch (e.which) {
                                case t.DOWN:
                                    n(1);
                                    break;
                                case t.UP:
                                    n(-1);
                                    break;
                                case t.ENTER:
                                    r.handleFlagItemClick(r.state.onlyCountries[r.state.highlightCountryIndex], e);
                                    break;
                                case t.ESC:
                                    r.setState({
                                        showDropdown: !1
                                    }, r.cursorToEnd);
                                    break;
                                default:
                                    (e.which >= t.A && e.which <= t.Z || e.which === t.SPACE) && r.setState({
                                        queryString: r.state.queryString + String.fromCharCode(e.which)
                                    }, r.state.debouncedQueryStingSearcher)
                            }
                        }
                    }, r.handleInputKeyDown = function(e) {
                        var t = r.props.keys;
                        e.which === t.ENTER && r.props.onEnterKeyPress(e), r.props.onKeyDown && r.props.onKeyDown(e)
                    }, r.handleClickOutside = function(e) {
                        r.dropdownRef && !r.dropdownContainerRef.contains(e.target) && r.state.showDropdown && r.setState({
                            showDropdown: !1
                        })
                    }, r.handleSearchChange = function(e) {
                        var t = e.currentTarget.value;
                        r.setState({
                            searchValue: t
                        })
                    }, r.getDropdownCountryName = function(e) {
                        return null != r.props.localization[e.name] ? r.props.localization[e.name] : null != r.props.localization[e.iso2] ? r.props.localization[e.iso2] : e.name
                    }, r.getCountryDropdownList = function() {
                        var e, t = r.state,
                            a = t.preferredCountries,
                            i = t.onlyCountries,
                            u = t.highlightCountryIndex,
                            c = t.showDropdown,
                            s = t.searchValue,
                            l = r.props,
                            f = l.enableSearchField,
                            d = l.disableSearchIcon,
                            p = l.searchClass,
                            h = l.searchStyle,
                            m = l.searchPlaceholder,
                            g = r.state.preferredCountries.includes(r.state.selectedCountry),
                            b = a.concat(i),
                            v = s.trim().toLowerCase(),
                            C = f && v ? o(new Set(b.filter(function(e) {
                                var t = e.name,
                                    r = e.iso2,
                                    n = e.dialCode;
                                return ["".concat(t), "".concat(r), "+".concat(n)].some(function(e) {
                                    return e.toLowerCase().includes(v)
                                })
                            }))) : b;
                        r.props.disableAreaCodes && (C = r.deleteAreaCodes(C));
                        var _ = C.map(function(e, t) {
                                var n = S()({
                                        country: !0,
                                        preferred: "us" === e.iso2 || "gb" === e.iso2,
                                        active: "us" === e.iso2,
                                        highlight: g ? u === t : u === t - a.length
                                    }),
                                    o = "flag ".concat(e.iso2);
                                return y.a.createElement("li", {
                                    ref: function(e) {
                                        return r["flag_no_".concat(t)] = e
                                    },
                                    key: "flag_no_".concat(t),
                                    "data-flag-key": "flag_no_".concat(t),
                                    className: n,
                                    "data-dial-code": "1",
                                    "data-country-code": e.iso2,
                                    onClick: function() {
                                        return r.handleFlagItemClick(e)
                                    }
                                }, y.a.createElement("div", {
                                    className: o
                                }), y.a.createElement("span", {
                                    className: "country-name"
                                }, r.getDropdownCountryName(e)), y.a.createElement("span", {
                                    className: "dial-code"
                                }, "+" + e.dialCode))
                            }),
                            w = y.a.createElement("li", {
                                key: "dashes",
                                className: "divider"
                            });
                        a.length > 0 && _.splice(a.length, 0, w);
                        var j = S()((n(e = {}, r.props.dropdownClass, !0), n(e, "country-list", !0), n(e, "hide", !c), e));
                        return y.a.createElement("ul", {
                            ref: function(e) {
                                return r.dropdownRef = e
                            },
                            className: j,
                            style: r.props.dropdownStyle
                        }, f && y.a.createElement("li", {
                            className: S()(n({
                                search: !0
                            }, p, p))
                        }, !d && y.a.createElement("span", {
                            className: S()(n({
                                "search-emoji": !0
                            }, "".concat(p, "-emoji"), p)),
                            role: "img",
                            "aria-label": "Magnifying glass"
                        }, "ðŸ”Ž"), y.a.createElement("input", {
                            className: S()(n({
                                "search-box": !0
                            }, "".concat(p, "-box"), p)),
                            style: h,
                            id: "search-box",
                            type: "search",
                            placeholder: m,
                            autoFocus: !0,
                            value: s,
                            onChange: r.handleSearchChange
                        })), _.length > 0 ? _ : y.a.createElement("li", {
                            className: "no-entries-message"
                        }, y.a.createElement("span", null, "No entries to show.")))
                    };
                    var c = x.allCountries;
                    e.regions && (c = r.filterRegions(e.regions, c)), 0 !== Object.keys(e.masks).length && (c = r.insertMasks(e.masks, c));
                    var d, p = r.excludeCountries(r.getOnlyCountries(e.onlyCountries, c), e.excludeCountries),
                        h = c.filter(function(t) {
                            return e.preferredCountries.some(function(e) {
                                return e === t.iso2
                            })
                        }),
                        m = e.value.replace(/[^0-9\.]+/g, "") || "";
                    d = m.length > 1 ? r.guessSelectedCountry(m.substring(0, 6), p, e.defaultCountry) || 0 : e.defaultCountry && p.find(function(t) {
                        return t.iso2 == e.defaultCountry
                    }) || 0;
                    var b, C = m.length < 2 && d && !m.replace(/\D/g, "").startsWith(d.dialCode) ? d.dialCode : "";
                    b = "" === m && 0 === d ? "" : r.formatNumber((e.disableCountryCode ? "" : C) + m.replace(/\D/g, ""), d.name ? d.format : void 0);
                    var w = c.findIndex(function(e) {
                        return e == d
                    });
                    return r.state = {
                        formattedNumber: b,
                        onlyCountries: p,
                        preferredCountries: h,
                        defaultCountry: e.defaultCountry,
                        selectedCountry: d,
                        highlightCountryIndex: w,
                        queryString: "",
                        showDropdown: !1,
                        freezeSelection: !1,
                        debouncedQueryStingSearcher: g()(r.searchCountry, 250),
                        searchValue: ""
                    }, r
                }
                var r, a, c;
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && d(e, t)
                }(t, y.a.Component), r = t, (a = [{
                    key: "componentDidMount",
                    value: function() {
                        document.addEventListener && (document.addEventListener("mousedown", this.handleClickOutside), document.addEventListener("keydown", this.handleKeydown))
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        document.removeEventListener && (document.removeEventListener("mousedown", this.handleClickOutside), document.removeEventListener("keydown", this.handleKeydown))
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function(e) {
                        e.defaultCountry && e.defaultCountry !== this.state.defaultCountry ? this.updateDefaultCountry(e.defaultCountry) : e.value !== this.state.formattedNumber && this.updateFormattedNumber(e.value)
                    }
                }, {
                    key: "updateFormattedNumber",
                    value: function(e) {
                        var t, r = this.state,
                            n = r.onlyCountries,
                            a = r.defaultCountry,
                            o = e,
                            i = e;
                        if (o.startsWith("+")) o = o.replace(/\D/g, ""), t = this.guessSelectedCountry(o.substring(0, 6), n, a), i = this.formatNumber(o, t.format);
                        else {
                            var u = (t = n.find(function(e) {
                                return e.iso2 == a
                            }) || this.state.selectedCountry) && !o.replace(/\D/g, "").startsWith(t.dialCode) ? t.dialCode : "";
                            i = this.formatNumber((this.props.disableCountryCode ? "" : u) + o.replace(/\D/g, ""), t ? t.format : void 0)
                        }
                        this.setState({
                            selectedCountry: t,
                            formattedNumber: i
                        })
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e, t, r = this,
                            a = this.state,
                            o = a.selectedCountry,
                            i = a.showDropdown,
                            u = a.formattedNumber,
                            c = this.props.disableDropdown,
                            s = S()({
                                arrow: !0,
                                up: i
                            }),
                            l = S()((n(e = {}, this.props.inputClass, !0), n(e, "form-control", !0), n(e, "invalid-number", !this.props.isValid(u.replace(/\D/g, ""))), e)),
                            f = S()((n(t = {}, this.props.buttonClass, !0), n(t, "flag-dropdown", !0), n(t, "open-dropdown", i), t)),
                            d = "flag ".concat(o.iso2);
                        return y.a.createElement("div", {
                            className: this.props.containerClass,
                            style: this.props.containerStyle
                        }, y.a.createElement("input", Object.assign({
                            className: l,
                            style: this.props.inputStyle,
                            onChange: this.handleInput,
                            onClick: this.handleInputClick,
                            onFocus: this.handleInputFocus,
                            onBlur: this.handleInputBlur,
                            value: u,
                            ref: function(e) {
                                return r.numberInputRef = e
                            },
                            onKeyDown: this.handleInputKeyDown,
                            placeholder: this.props.placeholder,
                            disabled: this.props.disabled,
                            type: "tel"
                        }, this.props.inputExtraProps)), y.a.createElement("div", {
                            className: f,
                            style: this.props.buttonStyle,
                            onKeyDown: this.handleKeydown,
                            ref: function(e) {
                                return r.dropdownContainerRef = e
                            }
                        }, y.a.createElement("div", {
                            onClick: c ? void 0 : this.handleFlagDropdownClick,
                            className: "selected-flag",
                            title: o ? "".concat(o.name, ": + ").concat(o.dialCode) : ""
                        }, y.a.createElement("div", {
                            className: d
                        }, !c && y.a.createElement("div", {
                            className: s
                        }))), i && this.getCountryDropdownList()))
                    }
                }]) && u(r.prototype, a), c && u(r, c), t
            }());
        O.defaultProps = {
            excludeCountries: [],
            onlyCountries: [],
            preferredCountries: [],
            defaultCountry: "",
            value: "",
            placeholder: "+1 (702) 123-4567",
            searchPlaceholder: "search",
            flagsImagePath: "./flags.png",
            disabled: !1,
            containerStyle: {},
            inputStyle: {},
            buttonStyle: {},
            dropdownStyle: {},
            searchStyle: {},
            containerClass: "react-tel-input",
            inputClass: "",
            buttonClass: "",
            dropdownClass: "",
            searchClass: "",
            autoFormat: !0,
            disableAreaCodes: !1,
            isValid: function(e) {
                return x.allCountries.some(function(t) {
                    return e.startsWith(t.dialCode) || t.dialCode.startsWith(e)
                })
            },
            disableCountryCode: !1,
            disableDropdown: !1,
            enableLongNumbers: !1,
            countryCodeEditable: !0,
            enableSearchField: !1,
            disableSearchIcon: !1,
            regions: "",
            inputExtraProps: {},
            localization: {},
            masks: {},
            onEnterKeyPress: function() {},
            keys: {
                UP: 38,
                DOWN: 40,
                RIGHT: 39,
                LEFT: 37,
                ENTER: 13,
                ESC: 27,
                PLUS: 43,
                A: 65,
                Z: 90,
                SPACE: 32
            }
        };
        t.default = O
    }])
});