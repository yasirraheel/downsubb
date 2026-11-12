"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [603], {
        603: function(e, t, n) {
            var o = n(2396);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.windowAddListener = t.translateFabric = t.storeFrequencyImpression = t.shuffleArray = t.sendEventsJointTrackerFabric = t.sendEventFabricExp = t.sendEventFabric = t.safeLocalStorage = t.once = t.onLastSuccessfulResultWrapper = t.moveElementToTheEnd = t.mergeRecursive = t.loadYandexRtbBannerNew = t.loadYandexRtbBanner = t.loadStylesheet = t.loadAdfoxBanner = t.isYoutubeHost = t.inViewport = t.getWordsMapFromTags = t.getTest = t.getSampledItem = t.getHostCode = t.getHost = t.getFrequencyCapValue = t.getCookie = t.getBestMatchedTagCloud = t.getAdsContainer = t.checkSample = t.checkFrequencyCap = void 0;
            const r = {
                host: /^(?:(?:https?:)?\/\/www\.)?([^\/]+)/i,
                youtubeHost: /^(.+\.)?(youtube\.com|youtu\.be)$/i
            };
            t.getTest = function(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 30,
                    o = window.cookie.get(e);
                return null === o && (o = (e => {
                    const t = e.reduce(((e, t) => {
                            let [n] = t;
                            return e + n
                        }), 0),
                        n = Math.random() * t;
                    let o = 0;
                    for (const [t, r] of e)
                        if (o += t, o >= n) return r
                })(t), window.cookie.set(e, o, n)), o
            }, t.getCookie = function(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 30;
                const o = window.cookie.get(e);
                return !o && t ? (window.cookie.set(e, String(t), n), t) : o
            }, t.sendEventFabric = e => {
                let {
                    trackerName: t,
                    ...n
                } = e;
                return e => {
                    const {
                        category: o,
                        action: r,
                        label: a,
                        value: s,
                        eventName: i,
                        ...c
                    } = { ...n,
                        ...e
                    };
                    let l = {
                        hitType: "event",
                        eventAction: i || r,
                        ...o && {
                            eventCategory: o
                        },
                        ...a && {
                            eventLabel: a
                        },
                        ...void 0 !== s && {
                            value: s
                        },
                        ...c
                    };
                    "function" == typeof ga ? ga(`${t}.send`, l) : (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                        event: l.eventAction,
                        ...l
                    }))
                }
            }, t.sendEventFabricExp = e => {
                let {
                    expName: t,
                    ...n
                } = e;
                return e => {
                    const {
                        category: o,
                        action: r,
                        label: a,
                        value: s,
                        eventName: i,
                        ...c
                    } = { ...n,
                        ...e
                    };
                    let l;
                    i ? l = i : r ? l = r : (l = "event", console.warn(`[sendEventFabricExp] No eventName or action provided. Using "${l}".`));
                    let d = {
                        hitType: "event",
                        eventAction: t,
                        experiment_action: l,
                        ...o && {
                            eventCategory: o
                        },
                        ...a && {
                            eventLabel: a
                        },
                        ...void 0 !== s && {
                            value: s
                        },
                        ...c
                    };
                    "function" == typeof ga ? ga("send", d) : (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                        event: d.eventAction,
                        ...d
                    }))
                }
            }, t.sendEventsJointTrackerFabric = e => {
                let {
                    trackerName: t,
                    expName: n,
                    ...o
                } = e;
                return e => {
                    const {
                        category: r,
                        action: a,
                        label: s,
                        value: i,
                        eventName: c,
                        ...l
                    } = { ...o,
                        ...e
                    };
                    let d;
                    c ? d = c : a ? d = a : (d = "event", console.warn(`[sendEventsJointTrackerFabric] No eventName or action provided. Using "${d}".`));
                    let u = {
                        hitType: "event",
                        eventAction: n,
                        experiment_action: d,
                        ...r && {
                            eventCategory: r
                        },
                        ...s && {
                            eventLabel: s
                        },
                        ...void 0 !== i && {
                            value: i
                        },
                        ...l
                    };
                    "function" == typeof ga ? ga(`${t}.send`, u) : (window.dataLayer = window.dataLayer || [], window.dataLayer.push({
                        event: u.eventAction,
                        ...u
                    }))
                }
            }, t.translateFabric = e => {
                let {
                    localizations: t,
                    defaultLang: n = "en",
                    useKeyAsFallback: o = !1,
                    variablePrefix: r = "{{",
                    variableSuffix: a = "}}"
                } = e;
                return (e, s) => {
                    let i;
                    if (t[_sf.lang] && Object.prototype.hasOwnProperty.call(t[_sf.lang], e) ? i = t[_sf.lang][e] : t[n] && Object.prototype.hasOwnProperty.call(t[n], e) && (i = t[n][e]), void 0 !== i) {
                        if (s)
                            for (const e in s) Object.prototype.hasOwnProperty.call(s, e) && (i = i.replace(new RegExp(r + e + a, "g"), s[e]));
                        return i
                    }
                    return _sf.debug && console.error("Translation key not found:", e), o ? e : ""
                }
            }, t.getWordsMapFromTags = e => e.toLowerCase().replace(/[#?()]/g, "").split(/[ ,\-_]/).reduce(((e, t) => (e[t] = !0, e)), {}), t.getBestMatchedTagCloud = (e, t) => {
                let n = 0,
                    o = null;
                for (const r of e) {
                    let e = 0;
                    for (const n of r.tags) e += t[n] ? 1 : 0;
                    e > n && (n = e, o = r)
                }
                return o
            }, t.onLastSuccessfulResultWrapper = e => (t, n, o, r) => {
                t && (void 0 === t.listItem || t.listLastItem) && e(t, n, o, r)
            }, t.windowAddListener = e => {
                window.addEventListener("message", e)
            };
            const a = (e, t) => {
                for (const n in t) try {
                    t[n].constructor === Object ? e[n] = a(e[n], t[n]) : e[n] = t[n]
                } catch (o) {
                    e[n] = t[n]
                }
                return e
            };
            t.mergeRecursive = a;
            const s = e => ({
                    minute: 6e4,
                    hour: 36e5,
                    day: 864e5
                }[e]),
                i = (e, t) => {
                    let n = t;
                    try {
                        n = JSON.parse(e)
                    } catch (e) {}
                    return n
                };
            t.checkFrequencyCap = (e, t) => {
                if (!e || !window.localStorage || !window.JSON) return !0;
                let n = l.getItem(t);
                if (!n) return !0;
                if (n = i(n, !1), !n || !Array.isArray(n)) return !0;
                if (n.length < e.cap) return !0;
                const o = s(e.intervalType) * e.intervalAmount,
                    r = Date.now() - o;
                for (let t = 0; t < e.cap; t++)
                    if (n[t] < r) return !0;
                return !1
            }, t.getFrequencyCapValue = (e, t) => {
                if (!e || !window.localStorage || !window.JSON) return 0;
                let n = l.getItem(t);
                if (!n) return 0;
                if (n = i(n, !1), !n || !Array.isArray(n)) return 0;
                const o = s(e.intervalType) * e.intervalAmount,
                    r = Date.now() - o;
                let a = 0;
                for (let t = 0; t < e.cap; t++) n[t] > r && a++;
                return a
            }, t.storeFrequencyImpression = (e, t) => {
                if (!e || !window.localStorage || !window.JSON) return;
                let n = l.getItem(t);
                n && (n = i(n, !1));
                const o = Date.now();
                if (n && Array.isArray(n)) {
                    const t = o - s(e.intervalType) * e.intervalAmount;
                    n = n.filter((e => e > t))
                } else n = [];
                n.unshift(o), n.length > e.cap && (n = n.slice(0, e.cap)), l.setItem(t, JSON.stringify(n))
            }, t.once = e => {
                let t, n;
                return function() {
                    return t || (n = e.apply(this, arguments), e = void 0, t = !0), n
                }
            }, t.checkSample = function(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 100;
                return t = Math.max(0, Math.min(t || 0, 100)), n = Math.max(0, Math.min(n || 0, 100)), o = Math.max(0, Math.min(o || 0, 100)), o < n && ([n, o] = [o, n]), n < e && e <= Math.ceil(n + (o - n) * t / 100)
            }, t.getSampledItem = function(e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 100;
                if (e.length && t > n && t <= o) {
                    e = e.filter((e => e && isFinite(e.sample) && e.sample > 0));
                    const r = Math.min(o / e.reduce(((e, t) => {
                        let {
                            sample: n
                        } = t;
                        return e + n
                    }), 0), 1);
                    for (let o = 0, a = n; o < e.length; o++)
                        if (a += e[o].sample * r, a >= t) return e[o]
                }
                return null
            };
            const c = e => {
                if (!e) return "";
                const t = String(e).match(r.host);
                return t ? t[1] : ""
            };
            t.getHost = c, t.getHostCode = e => {
                const t = c(e);
                return e && window.gaHandler.hostReplacement[t] || "other"
            }, t.isYoutubeHost = e => r.youtubeHost.test(e), t.shuffleArray = e => {
                let t = e.length;
                for (; t;) {
                    const n = Math.floor(Math.random() * t);
                    t--, [e[t], e[n]] = [e[n], e[t]]
                }
            }, t.moveElementToTheEnd = (e, t) => {
                const n = e.indexOf(t); - 1 !== n && n !== e.length - 1 && (e.splice(n, 1), e.push(t))
            }, t.loadYandexRtbBannerNew = (e, t, n, r) => {
                window.yaContextCb = window.yaContextCb || [], window.yaContextCb.push((() => {
                    Ya.Context.AdvManager.render({
                        blockId: e,
                        renderTo: t,
                        statId: n,
                        onRender: r
                    })
                }));
                const a = "//yandex.ru/ads/system/context.js";
                if (!o(`script[src="${a}"]`)[0]) {
                    const e = document.getElementsByTagName("script")[0],
                        t = document.createElement("script");
                    t.src = a, t.async = !0, e.parentNode.insertBefore(t, e)
                }
            }, t.loadYandexRtbBanner = (e, t, n, r) => {
                window.yandexContextAsyncCallbacks = window.yandexContextAsyncCallbacks || [], window.yandexContextAsyncCallbacks.push((() => {
                    Ya.Context.AdvManager.render({
                        blockId: e,
                        renderTo: t,
                        statId: n,
                        async: !0,
                        onRender: r
                    })
                }));
                const a = "//an.yandex.ru/system/context.js";
                if (!o(`script[src="${a}"]`)[0]) {
                    const e = document.getElementsByTagName("script")[0],
                        t = document.createElement("script");
                    t.src = a, t.async = !0, e.parentNode.insertBefore(t, e)
                }
            }, t.loadAdfoxBanner = (e, t, n) => {
                const o = () => {
                    Ya.adfoxCode.create({
                        ownerId: e,
                        containerId: t,
                        params: n
                    })
                };
                if (window.Ya && window.Ya.adfoxCode) return void o();
                const r = document.getElementsByTagName("script")[0],
                    a = document.createElement("script");
                a.src = "//yastatic.net/pcode/adfox/loader.js", a.async = !0, a.onload = o, r.parentNode.insertBefore(a, r)
            }, t.inViewport = e => {
                if (!e.length) return !1;
                const t = e.offset().top,
                    n = t + e.outerHeight(),
                    r = o(window).scrollTop();
                return t < r + o(window).height() && n > r
            }, t.getAdsContainer = () => {
                const e = "ox7";
                let t = o("#" + e)[0];
                if (!t) {
                    t = document.createElement("div"), t.id = e, t.className = e;
                    const n = o("#main>.wrapper")[0];
                    if (!n) throw Error("No wrapper for ads is found");
                    o(n).prepend(t)
                }
                return o(t)
            }, t.loadStylesheet = e => {
                const t = document.createElement("link");
                t.rel = "stylesheet", t.href = e;
                const n = new Promise(((e, n) => {
                    document.head.appendChild(t), t.onload = e, t.onerror = n
                }));
                return {
                    link: t,
                    promise: n
                }
            };
            const l = t.safeLocalStorage = {
                getItem(e) {
                    try {
                        return localStorage.getItem(e)
                    } catch (e) {
                        return null
                    }
                },
                setItem(e, t) {
                    try {
                        localStorage.setItem(e, t)
                    } catch (e) {}
                },
                removeItem(e) {
                    try {
                        localStorage.removeItem(e)
                    } catch (e) {}
                }
            }
        }
    }
]);