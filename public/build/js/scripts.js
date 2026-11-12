/*! For license information please see scripts.js.LICENSE.txt */
"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [4385], {
        8460: function(e, t, n) {
            n(1408), window.UAParser = n(7232), n(8138), n(7081), n(2371), n(6080), n(4598), n(8747), n(4887), n(1328), n(7759), n(9988), n(4620), Math.random() < 1 && Promise.all([n.e(4121), n.e(650)]).then(n.t.bind(n, 5565, 23))
        },
        2396: function(e) {
            e.exports = window.$
        },
        8138: function(e, t, n) {
            var o = n(2396);
            window.jsviews || window.jQuery && o.views || function(e, t) {
                var n, o, i, r, s = "{",
                    a = "{",
                    l = "}",
                    u = "}",
                    p = {},
                    c = !1,
                    d = !0,
                    f = e.jQuery,
                    h = /^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.]*?)(?:[.[]([\w$]+)\]?)?|(['"]).*\8)$/g,
                    w = /(\()(?=|\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)/g,
                    g = /\r?\n/g,
                    v = /\\(['"])/g,
                    m = /\\?(['"])/g,
                    y = /\x08(~)?([^\x08]+)\x08/g,
                    b = 0,
                    _ = 0,
                    x = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;"
                    },
                    C = "data-jsv-tmpl",
                    k = "var j=j||" + (f ? "jQuery." : "js") + "views,",
                    E = /[\x00"&'<>]/g,
                    P = Array.prototype.slice,
                    O = {},
                    A = {
                        jsviews: "v1.0pre",
                        sub: p,
                        debugMode: d,
                        render: O,
                        templates: T,
                        tags: I,
                        helpers: z,
                        converters: V,
                        View: S,
                        delimiters: D,
                        _convert: function(e, t, n, o) {
                            var i = n.converters;
                            return (e = i && i[e] || V[e]) ? e.call(t, o) : o
                        },
                        _err: function(e) {
                            return A.debugMode ? "<br/><b>Error:</b> <em> " + (e.message || e) + ". </em>" : '""'
                        },
                        _tmplFn: L,
                        _tag: function(e, n, o, i, r, s) {
                            var a, l = o.tags,
                                u = o.templates,
                                p = s.props && s.props.tmpl,
                                c = arguments,
                                f = l && l[e] || I[e];
                            return f ? (r = r && o.tmpls[r - 1], p = p || r || t, s.tmpl = "" + p === p ? u && u[p] || T[p] || T(p) : p, s.isTag = d, s.converter = i, s.view = n, s.renderContent = B, (a = f.apply(s, c.length > 6 ? P.call(c, 6) : [])) || (a == t ? "" : a.toString())) : ""
                        }
                    };

                function D(e, t) {
                    return A.rTag && !arguments.length || (s = e ? "\\" + e.charAt(0) : s, a = e ? "\\" + e.charAt(1) : a, l = t ? "\\" + t.charAt(0) : l, u = t ? "\\" + t.charAt(0) : u, A.rTag = o = "(?:(?:(\\w+(?=[\\/\\s" + l + "]))|(?:(\\w+)?(:)|(>)|(\\*)))\\s*((?:[^" + l + "]|" + l + "(?!" + u + "))*?)", o = new RegExp(s + a + o + "(\\/)?|(?:\\/(\\w+)))" + l + u, "g"), i = new RegExp("<.*>|" + e + ".*" + t)), [s, a, l, u]
                }

                function M(e) {
                    var n = this,
                        o = n.tmpl.helpers || {};
                    return "function" != typeof(e = (n.ctx[e] !== t ? n.ctx : o[e] !== t ? o : z[e] !== t ? z : {})[e]) ? e : function() {
                        return e.apply(n, arguments)
                    }
                }

                function S(e, n, o, i, r, s, a, l) {
                    var u, p = {
                        tmpl: r,
                        path: n,
                        parent: o,
                        data: i,
                        ctx: e,
                        views: l ? [] : {},
                        isArray: l,
                        _hlp: M,
                        _onRender: a
                    };
                    return o && (u = o.views, o.isArray ? u.splice(p.key = p.index = s !== t ? s : u.length, 0, p) : (u[p.key = "_" + b++] = p, p.index = o.index)), p
                }

                function j(e, n, o, i, r) {
                    var s, a;
                    if (o && "object" == typeof o && !o.nodeType) {
                        for (s in o) n(s, o[s]);
                        return e
                    }
                    return o && i !== t ? "" + o === o && (null === i ? delete n[o] : (i = r ? r(o, i) : i) && (n[o] = i)) : r && (i = r(t, i || o)), (a = p.onStoreItem) && a(n, o, i, r), i
                }

                function T(e, t) {
                    return j(this, T, e, t, $)
                }

                function I(e, t) {
                    return j(this, I, e, t)
                }

                function z(e, t) {
                    return j(this, z, e, t)
                }

                function V(e, t) {
                    return j(this, V, e, t)
                }

                function B(e, n, o, i, s, a) {
                    var l, u, p, c, f, h, w, g, v, m, y = this,
                        b = "";
                    if (i === d && (v = d, i = 0), y.isTag ? (w = y.tmpl, y.props && y.ctx && r(y.ctx, y.props), y.ctx && n && (n = r(y.ctx, n)), n = y.ctx || n, s = s || y.view, o = o || y.path, i = i || y.key, g = y.props) : w = y.jquery && y[0] || y, w && (s ? (h = s.ctx, e === s && (e = s.data, m = d), a = a || s._onRender) : h = A.helpers, n = n && n !== h ? r(r({}, h), n) : h, w.fn || (w = T[w] || T(w)), w)) {
                        if (Array.isArray(e) && !m)
                            for (c = v ? s : i !== t && s || S(n, o, s, e, w, i, a, d), l = 0, u = e.length; l < u; l++) p = e[l], f = w.fn(p, S(n, o, c, p, w, (i || 0) + l, a), A), b += a ? a(f, w, g) : f;
                        else(c = v ? s : S(n, o, s, e, w, i, a))._onRender = a, b += w.fn(e, c, A);
                        return a ? a(b, w, g, c.key, o) : b
                    }
                    return ""
                }

                function q(e, t) {
                    throw (t ? t.name + ': "' + t.message + '"' : "Syntax error") + (e ? " \n" + e : "")
                }

                function L(e, t, n) {
                    var i, r, s, a, l, u, p, f, b, _, x, C, E, P, O, A, D = t ? {
                            allowCode: A = t.allowCode,
                            debug: t.debug
                        } : {},
                        M = t && t.tmpls,
                        S = [],
                        j = 0,
                        T = [],
                        I = S,
                        z = [, , , S],
                        V = 0;

                    function B(t) {
                        (t -= j) && I.push(e.substr(j, t).replace(g, "\\n"))
                    }
                    for ((e = e.replace(m, "\\$1")).replace(o, (function(t, o, r, s, a, l, u, p, f, g) {
                            a && (s = ":", r = "html");
                            var m = "",
                                b = "",
                                _ = !p && !s && !n;
                            if (o = o || s, B(g), j = g + t.length, l ? A && I.push(["*", u.replace(v, "$1")]) : o ? ("else" === o && (z[5] = e.substring(z[5], g), z = T.pop(), I = z[3], _ = d), u = u ? function(e, t) {
                                    var n, o = {},
                                        i = 0,
                                        r = c,
                                        s = c;
                                    return e = (e + " ").replace(w, (function(e, a, l, u, p, f, w, g, v, m, y, b, _, x, C, k) {
                                        l = l || a || y, u = u || g, v = v || C || "", p = (p = p || "") || "";
                                        var E = t && "(" !== v;
                                        if (!f) return s ? (s = !b) ? e : '"' : r ? (r = !_) ? e : '"' : (l ? (i++, l) : "") + (k ? i ? "" : n ? (n = c, "\b") : "," : w ? (i && q(), n = d, "\b" + u + ":") : u ? u.replace(h, (function(e, t, n, o, i, r, s) {
                                            if (t) {
                                                var a, l = (n ? 'view._hlp("' + n + '")' : o ? "view" : "data") + (s ? (i ? "." + i : n || o ? "" : "." + t) + (r || "") : (s = n ? "" : o ? i || "" : t, ""));
                                                return a = s ? "." + s : "", E || (l += a), l = "view.data" === l.slice(0, 9) ? l.slice(5) : l, E && (l = "b(" + l + ',"' + s + '")' + a), l
                                            }
                                            return e
                                        })) + (v ? (o[++i] = d, v) : p) : p || (x ? (o[i--] = c, x + (v ? (o[++i] = d, v) : "")) : m ? (o[i] || q(), ",") : a ? "" : (s = b, r = _, '"')));
                                        q()
                                    })), e
                                }(u, n).replace(y, (function(e, t, n) {
                                    return t ? b += n + "," : m += n + ",", ""
                                })) : "", m = m.slice(0, -1), u = u.slice(0, -1), i = [o, r || "", u, _ && [], "{" + (m ? "props:{" + m + "}," : "") + "path:'" + u + "'" + (b ? ",ctx:{" + b.slice(0, -1) + "}" : "") + "}"], _ && (T.push(z), (z = i)[5] = j), I.push(i)) : f && (z[5] = e.substring(z[5], g), z = T.pop()), !z) throw "Expected block tag";
                            I = z[3]
                        })), B(e.length), l = (a = S.length) ? "" : '"";', s = 0; s < a; s++) "" + (r = S[s]) === r ? l += '"' + r + '"+' : "*" === r[0] ? l = l.slice(0, s ? -1 : -3) + ";" + r[1] + (s + 1 < a ? "ret+=" : "") : (x = r[0], C = r[1], E = r[2], I = r[3], P = r[4], e = r[5], I && (O = H(e, D, t, V++), L(e, O), M.push(O)), _ = _ || P.indexOf("view") > -1, l += (":" === x ? "html" === C ? (p = d, "e(" + E) : C ? (b = d, 'c("' + C + '",view,this,' + E) : (f = d, "((v=" + E + ')!=u?v:""') : (u = d, 't("' + x + '",view,this,"' + (C || "") + '",' + (I ? M.length : '""') + "," + P + (E ? "," : "") + E)) + ")+");
                    l = k + (f ? "v," : "") + (u ? "t=j._tag," : "") + (b ? "c=j._convert," : "") + (p ? "e=j.converters.html," : "") + "ret; try{\n\n" + (D.debug ? "debugger;" : "") + (A ? "ret=" : "return ") + l.slice(0, -1) + ";\n\n" + (A ? "return ret;" : "") + "}catch(e){return j._err(e);}";
                    try {
                        l = new Function("data, view, j, b, u", l)
                    } catch (e) {
                        q("Error in compiled template code:\n" + l, e)
                    }
                    return t && (t.fn = l), l
                }

                function $(e, n, o, s) {
                    var a, l, u, p, c;

                    function d(t) {
                        if ("" + t === t || t.nodeType > 0) {
                            try {
                                l = t.nodeType > 0 ? t : !i.test(t) && f && f(t)[0]
                            } catch (e) {}
                            if (l) {
                                if (!l.type) return;
                                (t = T[l.getAttribute(C)]) || (e = e || "_" + _++, l.setAttribute(C, e), t = $(e, l.innerHTML, o, s), T[e] = t)
                            }
                            return t
                        }
                    }
                    if (a = d(n = n || ""), (s = s || (n.markup ? n : {})).name = e, p = s.templates, !a && n.markup && (a = d(n.markup)) && (!a.fn || a.debug === n.debug && a.allowCode === n.allowCode || (a = a.markup)), a !== t) {
                        for (u in e && !o && (O[e] = function() {
                                return n.render.apply(n, arguments)
                            }), a.fn || n.fn ? a.fn && (n = e && e !== a.name ? r(r({}, a), s) : a) : L(a, n = H(a, s, o, 0)), p)(c = p[u]).name !== u && (p[u] = $(u, c, n));
                        return n
                    }
                }

                function H(e, t, n, o) {
                    function i(e) {
                        n[e] && (s[e] = r(r({}, n[e]), t[e]))
                    }
                    t = t || {};
                    var s = {
                        markup: e,
                        tmpls: [],
                        links: [],
                        render: B
                    };
                    return n && (n.templates && (s.templates = r(r({}, n.templates), t.templates)), s.parent = n, s.name = n.name + "[" + o + "]", s.key = o), r(s, t), n && (i("templates"), i("tags"), i("helpers"), i("converters")), s
                }

                function N(e) {
                    return x[e] || (x[e] = "&#" + e.charCodeAt(0) + ";")
                }
                f ? ((n = f).templates = T, n.render = O, n.views = A, n.fn.render = B) : (n = e.jsviews = A).extend = function(e, t) {
                    var n;
                    for (n in e = e || {}, t) e[n] = t[n];
                    return e
                }, r = n.extend, I({
                    if: function() {
                        var e = this.view;
                        return e.onElse = function(n, o) {
                            for (var i = 0, r = o.length; r && !o[i++];)
                                if (i === r) return "";
                            return e.onElse = t, n.path = "", n.renderContent(e)
                        }, e.onElse(this, arguments)
                    },
                    else: function() {
                        var e = this.view;
                        return e.onElse ? e.onElse(this, arguments) : ""
                    },
                    for: function() {
                        var e, t = "",
                            n = arguments,
                            o = n.length;
                        for (0 === o && (o = 1), e = 0; e < o; e++) t += this.renderContent(n[e]);
                        return t
                    },
                    "*": function(e) {
                        return e
                    }
                }), V({
                    html: function(e) {
                        return e != t ? String(e).replace(E, N) : ""
                    }
                }), D()
            }(window)
        },
        2371: function(e, t, n) {
            var o = n(2396);
            window.initSfJs = function(e, t, i, r, s, a, l, u, p) {
                var c = {
                    lang: e,
                    isRtlLanguage: a,
                    languages: l,
                    cookieDomain: t,
                    gaTrackers: {
                        televzrIos: {
                            id: "UA-7055055-41",
                            sendPageview: !0
                        },
                        televzrAndroid: {
                            id: "UA-7055055-42",
                            sendPageview: !0
                        }
                    },
                    channel: [],
                    sfProxy: u,
                    isPro: p
                };
                c.uaParser = new UAParser, c.ua = c.uaParser.getUA(), c.browser = c.uaParser.getBrowser() || {}, c.device = c.uaParser.getDevice() || {}, c.os = c.uaParser.getOS() || {}, c.country = i || cookie.get("country"), c.country && (c.country = c.country.toLowerCase()), c.countryTier = n(9096), c.countryTierName = function() {
                    if (!c.country || !c.countryTier) return "";
                    for (var e in c.countryTier)
                        if (c.countryTier.hasOwnProperty(e) && c.countryTier[e].indexOf(c.country) > -1) return e;
                    return ""
                }(), c.query = h() || {}, c.hash = h(location.hash) || {}, c.requestedWithApp = {
                    "com.inc_3205.televzr": "televzr",
                    "com.inc_3205.televzr_player": "televzr"
                };
                var d = {
                    televzr: "tz_in_app",
                    rd_documents: "RDDocuments"
                };

                function f(e) {
                    return "string" == typeof e || (c.debug && console.error("Your value is not a string"), !1)
                }

                function h(e) {
                    if (void 0 === e && (e = window.location.search), !e) return {};
                    const t = new URLSearchParams(e);
                    let n = {};
                    for (let [e, o] of Object.assign(t)) n[e.replace(/^[#\?]/, "")] = o;
                    return /youtube/.test(n.url) && n.v && (n.url = n.url + "&v=" + n.v), n
                }
                c.extraExperiments = [], c.extraExperiments.has = function(e) {
                        if ("Array" !== e.constructor.name) return c.debug && console.error('Prop "expNames" is not an array'), !1;
                        for (var t = 0; t < e.length; t++) {
                            if (!1 === f(e[t])) return !1;
                            if (-1 !== this.indexOf(e[t])) return !0
                        }
                        return !1
                    }, c.extraExperiments.add = function(e) {
                        return !1 !== f(e) && (!1 === this.has([e]) && this.push(e), !0)
                    }, c.extraExperiments.remove = function(e) {
                        if (!1 === f(e)) return !1;
                        const t = this.indexOf(e);
                        return -1 !== t && (this.splice(t, 1), !0)
                    },
                    function(e) {
                        c.applications = e;
                        var t = c.query.app || c.hash.app || c.query.from || c.hash.from || "";
                        if (c.sfProxy && (t = "sf-proxy"), !t)
                            if ((t = cookie.get("x-requested-with")) && c.requestedWithApp[t]) t = c.requestedWithApp[t];
                            else if (d)
                            for (var n in d) d.hasOwnProperty(n) && c.ua.indexOf(d[n]) > -1 && (t = n);
                        t && -1 != c.applications.indexOf(t) && (c.app = t)
                    }(r), !c.device.type && c.os.name && ["Android", "Bada", "BlackBerry", "Firefox OS", "iOS", "MeeGo", "Sailfish", "Series40", "Symbian", "Tizen", "WebOS", "Windows Phone"].indexOf(c.os.name) > -1 && (c.device.type = "mobile"), c.device.type && ("tablet" == c.device.type ? (c.mobile = !0, o("html").addClass("tablet")) : "mobile" == c.device.type || "wearable" == c.device.type ? (c.mobile = !0, o("html").addClass("mobile")) : c.mobile = !1), c.mobile && (c.browser.inApp = !1, c.browser.name && -1 === ["Android Browser", "Chrome", "Chrome Mobile", "Chrome Mobile iOS", "Edge Mobile", "IE Mobile", "Fennec", "Firefox", "Firefox Mobile", "Opera", "Opera Mobile", "Opera Mini", "Safari", "Mobile Safari", "UCBrowser", "UC Browser", "Yandex", "Yandex Browser"].indexOf(c.browser.name) && (c.browser.inApp = !0)), c.user = {
                        loggedIn: cookie.get("logged_in")
                    }, c.user.loggedIn && "0" != c.user.loggedIn ? "televzr" != c.user.loggedIn && "email" != c.user.loggedIn && (c.user.loggedIn = !0) : c.user.loggedIn = !1, c.stats = {
                        uid: s || "",
                        basicMetricsTracking: {}
                    }, s || (c.stats.uid = cookie.get("uid"), c.stats.uid || (c.stats.uid = function() {
                        var e, t = "0123456789abcdef".split(""),
                            n = [];
                        for (e = 0; e < 16; e++) n[e] = t[0 | 16 * Math.random()];
                        return n.join("")
                    }(), cookie.set("uid", c.stats.uid, 3650, c.cookieDomain))), window._sf = c
            }
        },
        8747: function() {
            window.apkDistribution = function(e, t) {
                this.config = e, this.country = t;
                const n = new Experiment({
                    name: "apkHelperDist"
                });
                this.expValue = n.getValue(), this.init()
            }, apkDistribution.prototype.init = function() {
                this.config && (this.defaultConfig = this.getConfig(this.country))
            }, apkDistribution.prototype.getConfig = function(e) {
                const t = this.config.distribution.filter((e => !(!e.query || !Object.keys(e.query).length) && Object.keys(e.query).every((t => e.query[t] === _sf.query[t]))));
                let n = t.length > 0 ? t : this.config.distribution.filter((e => !e.query || !Object.keys(e.query).length));
                var o = function(e) {
                        return !e || 0 === e.length
                    },
                    i = function(e, t) {
                        return _sf.countryTierName && -1 !== t.indexOf(_sf.countryTierName)
                    },
                    r = {
                        equal: [{
                            userValue: _sf.lang,
                            expProp: "lang"
                        }, {
                            userValue: e,
                            expProp: "country",
                            extCheck: i
                        }],
                        exclude: [{
                            userValue: _sf.lang,
                            expProp: "excludeLang"
                        }, {
                            userValue: e,
                            expProp: "excludeCountry",
                            extCheck: i
                        }]
                    };
                if (n = n.filter((function(e) {
                        var t = !0;
                        for (let n in r)
                            if (!1 === (t = r[n].every((function(t) {
                                    var i = t.expProp,
                                        r = t.userValue,
                                        s = t.extCheck && !o(e[i]) && t.extCheck(r, e[i]);
                                    if (!r || o(e[i])) return !0;
                                    var a = -1 !== e[i].indexOf(r) || s;
                                    return "equal" === n ? a : !a
                                })))) return t;
                        return t
                    })), !n.length) return null;
                for (let e = 0; e < n.length; e++) {
                    var s = this.chooseFileConfigBySample(n[e].files);
                    if (s.url) return s
                }
                return null
            }, apkDistribution.prototype.chooseFileConfigBySample = function(e) {
                var t = 0;
                for (let n = 0, o = e.length; n < o; n++)
                    if (e[n].sample || (e[n].sample = 100), (t += e[n].sample) >= this.expValue) return e[n];
                return null
            }, apkDistribution.prototype.getDownloadUrl = function(e) {
                var t = e ? this.getConfig(e) : this.defaultConfig;
                return t && t.url ? t.url : ""
            }
        },
        7081: function() {
            window.cookie = {
                set: function(e, t, n, o) {
                    if (e = encodeURIComponent(e), t = t ? encodeURIComponent(t) : "", o = o || "", n && "number" == typeof n) {
                        var i = n,
                            r = n = new Date;
                        r.setDate(r.getDate() + i)
                    } else n = new Date;
                    document.cookie = e + "=" + t + "; domain=" + o + "; path=/; expires=" + n.toUTCString()
                },
                get: function(e) {
                    if (!document.cookie) return null;
                    var t = new RegExp("(?:^|; )" + e + "=([^;]*)"),
                        n = document.cookie.match(t);
                    return n ? n[1] : null
                },
                del: function(e, t) {
                    t = t || "", document.cookie = e + "=; domain=" + t + "; path=/; expires=" + new Date((new Date).getTime() - 1e11).toGMTString()
                }
            }
        },
        7759: function(e, t, n) {
            var o = n(3769)(n(7083));
            window.A11yDialog = o.default, window.createA11yDialog = e => {
                let {
                    element: t,
                    hideCloseButton: n = !1
                } = e;
                const i = new o.default(t);
                let r = "";
                return i.on("show", (e => {
                    r = document.body.style.overflow, document.body.style.overflow = "hidden", e.classList[n ? "add" : "remove"]("a11y-dialog-no-close-button")
                })).on("hide", (e => {
                    document.body.style.overflow = r, e.classList.remove("a11y-dialog-no-close-button")
                })), i
            }
        },
        6080: function(e, t, n) {
            var o = n(3769)(n(9967));

            function i(e) {
                e ? (this.options = e, this.expValue = this._getCookieValue(), "" === this.expValue && (this.expValue = this._getRandom(), this._setCookie())) : console && console.error("no Experiment options")
            }
            window.Experiment = i, i.prototype = {
                getValue: function() {
                    return this.expValue
                },
                _setCookie: function() {
                    var e = this.options.name;
                    !e && window.debug && window.console && window.console.error("Experiment can`t set cookie, because options not is set the name"), cookie.set(e, this.expValue.toString(), 30, window._sf.cookieDomain)
                },
                _getCookieValue: function() {
                    var e = cookie.get(this.options.name);
                    return "" === e ? e : (e = (0, o.default)(e), isNaN(e) ? "" : e)
                },
                _getRandom: function() {
                    return Math.floor(100 * Math.random()) + 1
                }
            }
        },
        1328: function(e, t, n) {
            var o = n(2396),
                i = n(3769)(n(9967));
            const r = {
                    en: {
                        title: "How to install?",
                        step1: "<b>1. Download</b> Savefrom Downloader",
                        step2: "<b>2. Run</b> the downloaded APK file",
                        step3: "<b>3. (First time only)</b> Please go to <b>Settings &gt; Security, and turn on Unknown sources,</b> this step enables you to install apps out of Google Play",
                        v2_title: "Allow app installs",
                        v2_text: "To open the app you need to allow installation.",
                        v2_button: "Open the app"
                    }
                },
                s = e => {
                    const t = "en",
                        n = window.sf && sf.lang || t;
                    return r[n] && Object.prototype.hasOwnProperty.call(r[n], e) ? r[n][e] : r[t] && Object.prototype.hasOwnProperty.call(r[t], e) ? r[t][e] : e
                };
            let a;
            window.showHowToInstallPopup = function() {
                let {
                    onClose: e,
                    callback: t,
                    v: n
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = o(".how-to-install-popup");
                if (!r.length) {
                    const t = 2 === n ? `\n  <div class="how-to-install-popup how-to-install-popup--v2">\n    <div class="how-to-install-popup__background"></div>\n    <div class="how-to-install-popup__content">\n      <div class="how-to-install-popup__head">\n        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">\n          <rect width="36" height="36" rx="5" fill="#C8C8C8"/>\n          <path d="M0 5a5 5 0 015-5h26a5 5 0 015 5v26a5 5 0 01-5 5H5a5 5 0 01-5-5V5z" fill="#7ED214"/>\n          <path d="M31.387 10.659l1.45.296c.256.052.301.37.092.525l-6.513 4.26a.282.282 0 01-.1.04v-.036c-.018-1.2.016-3.017.307-5.331.565-4.577 2.534-6.549 2.534-6.549.368.52.78 1.302 1.178 2.485.737 2.154.866 3.37.822 4.02a.281.281 0 00.23.29z" fill="#EBEDEE"/>\n          <path opacity=".1" fill-rule="evenodd" clip-rule="evenodd" d="M27.842 14.808a39.265 39.265 0 01-.26-4.103c-.064-4.343 1.424-6.567 1.597-6.811l-.021-.03s-1.969 1.971-2.534 6.549a37.887 37.887 0 00-.308 5.33v.036a.275.275 0 00.1-.039l1.426-.932z" fill="#1C1C1C"/>\n          <path d="M4.74 10.615l-1.458.26c-.257.046-.31.363-.105.523l6.405 4.42c.03.02.065.034.1.042l.001-.036c.048-1.2.058-3.017-.176-5.337-.451-4.59-2.37-6.609-2.37-6.609-.381.511-.812 1.282-1.24 2.455-.79 2.135-.95 3.346-.921 3.999a.281.281 0 01-.237.283z" fill="#EBEDEE"/>\n          <path opacity=".1" fill-rule="evenodd" clip-rule="evenodd" d="M8.182 14.85c.155-1.082.3-2.457.362-4.095.17-4.34-1.263-6.6-1.429-6.848l.022-.03s1.92 2.02 2.37 6.61c.236 2.32.224 4.138.177 5.337v.036a.275.275 0 01-.1-.042l-1.402-.967z" fill="#1C1C1C"/>\n          <path d="M29.781 17.216h-2.277a1.576 1.576 0 01-1.575-1.543c-.034-1.234 0-3.154.326-5.657.513-4.097 2.687-6.342 2.687-6.342h-.034c-1.61 1.148-5.82 1.97-10.768 1.97-4.947 0-9.159-.822-10.768-1.97h-.017s1.969 1.97 2.534 6.548a38.13 38.13 0 01.308 5.33 1.69 1.69 0 01-1.695 1.646H5.934c-1.147 0-1.746 1.355-.976 2.212l11.915 13.113a1.587 1.587 0 002.363 0l11.64-12.822c.874-.943.206-2.485-1.095-2.485z" fill="#fff"/>\n        </svg>\n        <span>${s("v2_title")}</span>\n      </div>\n      <div class="how-to-install-popup__text">\n        ${s("v2_text")}\n      </div>\n      <div class="how-to-install-popup__instruction how-to-install-popup__instruction--step-1">\n        <img class="how-to-install-popup__instruction__image" src="/img/android/instruction-step-1.png" alt="">\n        <img class="how-to-install-popup__instruction__image" src="/img/android/instruction-step-2.png" alt="">\n        <img class="how-to-install-popup__instruction__image" src="/img/android/instruction-step-3.png" alt="">\n        <img class="how-to-install-popup__instruction__image" src="/img/android/instruction-step-4.png" alt="">\n        <div class="how-to-install-popup__instruction__hand"></div>\n      </div>\n      <a class="how-to-install-popup__button" href="https://savefrom.net/?how-to-install-apk">\n        ${s("v2_button")}\n      </a>\n    </div>\n  </div>\n` : `\n  <div class="how-to-install-popup">\n    <div class="how-to-install-popup__background"></div>\n    <div class="how-to-install-popup__content">\n      <span class="how-to-install-popup__close" aria-label="Close">\n        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">\n          <path d="M9 0.875C4.51992 0.875 0.875 4.51992 0.875 9C0.875 13.4801 4.51992 17.125 9 17.125C13.4801 17.125 17.125 13.4801 17.125 9C17.125 4.51992 13.4801 0.875 9 0.875ZM11.9418 11.0582C12.0023 11.1157 12.0506 11.1846 12.084 11.2611C12.1174 11.3375 12.1352 11.4199 12.1363 11.5033C12.1373 11.5867 12.1217 11.6695 12.0903 11.7468C12.0588 11.8241 12.0122 11.8943 11.9533 11.9533C11.8943 12.0122 11.8241 12.0588 11.7468 12.0903C11.6695 12.1217 11.5867 12.1373 11.5033 12.1363C11.4199 12.1352 11.3375 12.1174 11.2611 12.084C11.1846 12.0506 11.1157 12.0023 11.0582 11.9418L9 9.88398L6.9418 11.9418C6.82363 12.0541 6.66629 12.1157 6.50331 12.1136C6.34034 12.1115 6.18462 12.0459 6.06937 11.9306C5.95412 11.8154 5.88845 11.6597 5.88637 11.4967C5.88428 11.3337 5.94594 11.1764 6.0582 11.0582L8.11602 9L6.0582 6.9418C5.94594 6.82363 5.88428 6.66629 5.88637 6.50331C5.88845 6.34034 5.95412 6.18462 6.06937 6.06937C6.18462 5.95412 6.34034 5.88845 6.50331 5.88637C6.66629 5.88428 6.82363 5.94594 6.9418 6.0582L9 8.11602L11.0582 6.0582C11.1764 5.94594 11.3337 5.88428 11.4967 5.88637C11.6597 5.88845 11.8154 5.95412 11.9306 6.06937C12.0459 6.18462 12.1115 6.34034 12.1136 6.50331C12.1157 6.66629 12.0541 6.82363 11.9418 6.9418L9.88398 9L11.9418 11.0582Z" fill="#838383"/>\n        </svg>\n      </span>\n      <div class="how-to-install-popup__head">\n        ${s("title")}\n      </div>\n      <div class="how-to-install-popup-body">\n        <div class="how-to-install-popup__step">\n          ${s("step1")}\n        </div>\n        <div class="how-to-install-popup__step">\n          ${s("step2")}\n          <div class="how-to-install-popup__step__img">\n            <img src="/img/how-to-install-popup-android/step-2.png" alt="">\n          </div>\n        </div>\n        <div class="how-to-install-popup__step">\n          ${s("step3")}\n          <div class="how-to-install-popup__step__img">\n            <img src="/img/how-to-install-popup-android/step-3.png" alt="">\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n`;
                    r = o(t), o(document.body).append(r), o([".how-to-install-popup__background", ".how-to-install-popup__close", ".how-to-install-popup__button"].join(",")).on("click", (() => {
                        o(".how-to-install-popup").removeClass("how-to-install-popup--show"), 2 === n && clearInterval(a), e && e()
                    }))
                }
                if (r.addClass("how-to-install-popup--show"), 2 === n) {
                    const e = r.find(".how-to-install-popup__instruction");
                    e.attr("data-step", 1), clearInterval(a), a = setInterval((() => {
                        const t = (0, i.default)(e.attr("data-step")) || 1;
                        4 === t ? e.attr("data-step", 1) : e.attr("data-step", t + 1)
                    }), 2e3), r.find(".how-to-install-popup__instruction")
                }
                t && t()
            }, location.search.match(/\bhow-to-install-apk\b/) && o((() => {
                let e = setInterval((() => {
                    window.sf && (clearInterval(e), showHowToInstallPopup({
                        v: 2
                    }))
                }), 100)
            }))
        },
        9988: function(e, t, n) {
            var o = n(8549);
            n(647), window.Notyf = o.Notyf
        },
        4620: function(e, t, n) {
            var o = n(3769)(n(6217));
            if (Math.random() < .001) {
                const e = new o.default({
                    projectKey: "lFqqmp0k2UiYoiSMywKF",
                    ingestPoint: "https://openreplay.multitool.cloud/ingest",
                    __DISABLE_SECURE_MODE: "localhost" === location.hostname || "https:" !== location.protocol,
                    inlineCss: 3
                });
                e.setUserID("savefrom_net_user_id"), e.start().then((() => {
                    if (window.__sentry) {
                        const t = e.getSessionID();
                        t && window.__sentry.setTag("openReplaySession.id", t)
                    }
                }))
            }
        },
        1408: function() {
            window.Promise || (window.Promise = Promise), Number.isNaN = Number.isNaN || (e => "number" == typeof e && e != e)
        },
        4598: function(e, t, n) {
            var o = n(3769)(n(8032));
            window.sfHelper = function(e, t, n, o, i) {
                this.config = e, this.browser = t, this.os = n, this.isMobile = o, this.country = i, this.extension = null;
                var r = new Experiment({
                    name: "sfHelperDist"
                });
                this.expValue = r.getValue(), this.init()
            }, sfHelper.prototype.init = function() {
                this.config && (this.browserConfig = this.getConfigForBrowser(this.browser, this.isMobile))
            }, sfHelper.prototype.isAvailable = function() {
                return !!this.browserConfig
            }, sfHelper.prototype.isInstalled = function() {
                if (this.extension) return !0;
                var e = new RegExp("(?:^|; )" + this.config.cookie + "=([^;]+)");
                return !!document.cookie.match(e)
            }, sfHelper.prototype.getConfigForBrowser = function(e, t) {
                if (!e || !e.name) return null;
                var n = e.name.toLowerCase();
                if (!this.config.setup.browser[n]) return null;
                var o = this.config.setup.browser[n];
                if (o.id = n, o.minVersion && e.major) {
                    var i = this.versionToNumber(e.major);
                    if (i && i < o.minVersion) return null
                }
                return t && o.mobile || !t && o.desktop ? o : null
            }, sfHelper.prototype.setExtensionParameters = function(e) {
                this.extension = e
            }, sfHelper.prototype.getLinkUrlForBrowser = function() {
                return this.browserConfig ? this.browserConfig.url : ""
            }, sfHelper.prototype.isBrowserSupported = function(e, t) {
                return !!this.getConfigForBrowser(e, t)
            }, sfHelper.prototype.versionToNumber = function(e) {
                return "number" == typeof e ? e : "string" != typeof e ? 0 : (0, o.default)(e) || 0
            }
        },
        4887: function(e, t, n) {
            var o = n(2396);
            window.showMessage = (e, t, n) => {
                if (e) {
                    o(".top-message-bar").remove();
                    var i = o('<div class="top-message-bar"/>').hide();
                    i.append('<div class="content-box"><div class="message-box">' + e + '</div><div class="close-btn"></div></div>'), i.prependTo("body").slideDown(), i.on("click", ".close-btn", (function() {
                        t && t(), i.fadeOut((function() {
                            i.remove()
                        }))
                    })), n && i.on("click", ".button", n)
                }
            }
        },
        9096: function(e) {
            e.exports = JSON.parse('{"tier1":["au","ca","gb","nz","us"],"tier2":["at","be","ch","cy","cz","de","dk","ee","es","fi","fr","gr","hr","ie","it","jp","kr","lt","lu","lv","mt","nl","no","pl","pt","se","si","sk","za"],"cis":["az","am","by","kg","kz","md","ru","tj","ua","uz"]}')
        }
    },
    function(e) {
        e.O(0, [4121], (function() {
            return e(e.s = 8460)
        })), e.O()
    }
]);