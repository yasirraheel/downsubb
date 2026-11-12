"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [6405], {
        2992: function(e, t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.FlowManagerFactory = function() {
                let {
                    sendAnalytics: e = () => {}
                } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const t = {
                    start() {
                        let {
                            vidacha_type: t = "",
                            group: r = "",
                            click_count: c = 0,
                            extra: i = {}
                        } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        const l = a(),
                            d = {
                                id: l,
                                vidacha_type: t,
                                group: r,
                                click_count: c,
                                started_at: o(),
                                status: "started",
                                ...i
                            };
                        return n.set(l, d), e("start", { ...s(d)
                        }), l
                    },
                    _getFresh(e) {
                        const t = e ? n.get(e) : null;
                        return t ? o() - t.started_at > r || "finished" === t.status ? (n.delete(t.id), null) : t : null
                    },
                    ensureForShow(t) {
                        let {
                            vidacha_type: n = "",
                            group: r = "",
                            click_count: a = 0,
                            repair_reason: o = "show_without_start"
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        const s = this._getFresh(t);
                        return s ? {
                            flow_id: s.id,
                            created: !1
                        } : (e("show_orphaned", {
                            reason: "no_active_start",
                            flow_id_attempt: t || "",
                            vidacha_type: n
                        }), {
                            flow_id: this.start({
                                vidacha_type: n,
                                group: r,
                                click_count: a,
                                extra: {
                                    auto_started: !0,
                                    repair_reason: o
                                }
                            }),
                            created: !0
                        })
                    },
                    markShown(t) {
                        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        const r = this._getFresh(t);
                        r && (e("show", { ...s(r),
                            ...n
                        }), r.status = "shown")
                    },
                    success(t) {
                        const r = this._getFresh(t);
                        r ? (e("ad_open_success", s(r)), r.status = "finished", n.delete(t)) : e("ad_open_success", {
                            flow_id: t
                        })
                    },
                    fail(t) {
                        const r = this._getFresh(t);
                        r ? (e("ad_open_failed", s(r)), r.status = "finished", n.delete(t)) : e("ad_open_failed", {
                            flow_id: t
                        })
                    },
                    cancel(t) {
                        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "cancelled";
                        const a = n.get(t);
                        a && (e("show_cancelled", { ...s(a),
                            reason: r
                        }), a.status = "finished", n.delete(t))
                    }
                };
                return t
            };
            const n = new Map,
                r = 3e5,
                a = () => `${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`,
                o = () => Date.now(),
                s = e => ({
                    group: e.group,
                    flow_id: e.id,
                    vidacha_type: e.vidacha_type,
                    click_count: e.click_count,
                    started_at: e.started_at
                })
        },
        777: function(e, t, n) {
            var r = n(2396),
                a = n(3769)(n(9967)),
                o = n(603),
                s = n(2992);
            const c = "clickAds",
                i = 2e3;
            let l, d, u = "",
                _ = "",
                f = 1;
            const p = (0, o.sendEventFabric)({
                    trackerName: "clickAds"
                }),
                w = () => {
                    const e = window[c];
                    return e && "string" == typeof e.eventName && e.eventName ? e.eventName : c
                },
                h = function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    p({
                        eventName: `${w()}_${e}`,
                        ...t
                    }), "start" === e && (f += 1)
                },
                g = (0, s.FlowManagerFactory)({
                    sendAnalytics: h
                }),
                m = (e, t) => {
                    let n = 0;
                    return localStorage.getItem("clickAdsLinkCounter") && (n = +localStorage.getItem("clickAdsLinkCounter")), n >= e.length && (n = 0), localStorage.setItem("clickAdsLinkCounter", n + 1), e[n].url
                },
                b = function(e, t, n) {
                    let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "normal";
                    const a = g.ensureForShow(e, {
                        vidacha_type: "unknown",
                        group: _,
                        click_count: f,
                        repair_reason: r
                    }).flow_id;
                    return g.markShown(a, {
                        show_count: t + 1,
                        freq_cap: n
                    }), a
                },
                v = (e, t) => {
                    let {
                        flow_id: n
                    } = t;
                    const s = r(e.currentTarget);
                    if (_sf.mobile && "cis" === _sf.countryTierName && s.hasClass("no-downloadable")) return void g.cancel(n, "blocked_no_downloadable");
                    const d = (0, o.getFrequencyCapValue)(window[c].frequencyParams, "clickAds"),
                        u = window[c].frequencyParams.cap;
                    if (d >= u) return void g.cancel(n, "frequency_capped");
                    (0, o.storeFrequencyImpression)(window[c].frequencyParams, "clickAds");
                    const _ = m(window[c].banner.urls);
                    if (_sf.app && "rd_documents" !== _sf.app) return void(e => {
                        const t = Date.now();
                        r.get(`${window[c].path}img/100kb.data?_=${t}${Math.random()}`).then(((n, r, o) => {
                            const s = Date.now();
                            let c = 0,
                                i = Math.max(0, (0, a.default)(o.getResponseHeader("Content-Length")) || 0);
                            if (i) {
                                const e = o.getAllResponseHeaders();
                                e && (i += e.length), c = Math.round(8 * i / ((s - t) / 1e3) / 1024)
                            }
                            e && e(c)
                        }), ((t, n, r) => {
                            e && e(null), _sf.debug && console.error(r)
                        })).catch((t => {
                            e && e(null), _sf.debug && console.error(t)
                        }))
                    })((e => {
                        const t = e ? Math.max(i, Math.min(Math.round(2e6 / e), 1e4)) : i;
                        l = setTimeout((() => {
                            n = b(n, d, u, "clickunder_delayed_show"), g.success(n), window.location = _
                        }), t)
                    }));
                    n = b(n, d, u, "normal");
                    const f = window.open(_, "_blank", window[c].banner.noreferrer ? "noopener noreferrer" : "");
                    !f || f.closed || void 0 === f.closed ? g.fail(n) : g.success(n), _sf.mobile && (e.preventDefault(), clearTimeout(l), l = setTimeout((() => {
                        const e = new MouseEvent("click", {
                            bubbles: !0,
                            cancelable: !0,
                            view: window
                        });
                        s.get(0).dispatchEvent(e)
                    }), i))
                };
            window[c] = {
                banner: null,
                windowHandler: null,
                isAvailable() {
                    return !0
                },
                getAdsUrl(e) {
                    return m(e)
                },
                init() {
                    const e = (0, o.checkSample)(this.expValue, this.expSample || 100, this.controlGroupSample);
                    if (_ = e ? "test" : "control", e) {
                        const e = (() => {
                            const e = Object.entries(window[c].banners).map((e => {
                                    let [t, n] = e;
                                    return {
                                        bannerName: t,
                                        banner: n,
                                        sample: n.sample
                                    }
                                })).filter((e => {
                                    let {
                                        banner: t
                                    } = e;
                                    return (e => !(!e || !e.urls || e.lang && -1 === e.lang.indexOf(_sf.lang) || e.excludedLang && -1 !== e.excludedLang.indexOf(_sf.lang) || e.country && -1 === e.country.indexOf(_sf.country) || e.mobile && !_sf.mobile || e.os && -1 === e.os.indexOf(_sf.os.name)))(t)
                                })),
                                t = (0, o.getSampledItem)(e, window[c].expValue);
                            return t && t.bannerName
                        })();
                        if (!e) return !1;
                        this.banner = { ...this.banners[e],
                            name: e
                        }
                    }
                    return _sf.gaTrackers[c] = {
                        id: e && this.banner.gaResource ? this.banner.gaResource : this.gaResource,
                        parameters: e ? this.banner.gaParameters : this.gaParameters
                    }, u = e ? `${c.toLowerCase()}-${this.banner.name}` : `${c.toLowerCase()}-control`, h("init", {
                        group: _,
                        eventCategory: u
                    }), e && this.banner.urls && (sf.videoResult.prepareVideo = (e, t) => {
                        if (!e || !e.diffConverter || !0 === e.diffConverterHasDiff || !e.url) return;
                        if ((0, o.getFrequencyCapValue)(window[c].frequencyParams, "clickAds") >= window[c].frequencyParams.cap)
                            for (let t = 0; t < e.url.length; t++)
                                if (e.url[t].url && -1 !== e.url[t].url.indexOf("//du.sf-converter.com/")) {
                                    e.url[t].url += "&b=" + encodeURIComponent(m(this.banner.urls));
                                    break
                                }
                    }), r(document.body).on("link-insert", "#sf_url", (() => {
                        d = !1, h("link-insert", {
                            group: _,
                            eventCategory: u
                        })
                    })).on("submit", "form.sf-form", (() => {
                        d = !1, h("submit", {
                            group: _,
                            eventCategory: u
                        })
                    })).on("custom-submit", "form.sf-form", (() => {
                        d = !1, h("custom-submit", {
                            group: _,
                            eventCategory: u
                        })
                    })).on("click", ".link-download:not(.skip-propclick)", (e => {
                        const t = g.start({
                            vidacha_type: "sf",
                            group: _,
                            click_count: f
                        });
                        this.banner ? ((e, t) => {
                            let {
                                flow_id: n
                            } = t;
                            d ? g.cancel(n, "already_shown") : (d = !0, v(e, {
                                flow_id: n
                            }))
                        })(e, {
                            flow_id: t
                        }) : g.cancel(t, "empty_banner")
                    })).on("click", ".ig-stories__modal__button, .ig-stories__card__button", (e => {
                        const t = g.start({
                            vidacha_type: "instagram",
                            group: _,
                            click_count: f
                        });
                        this.banner ? v(e, {
                            flow_id: t
                        }) : g.cancel(t, "empty_banner")
                    })), !0
                }
            }, window.clickAds = { ...window[c],
                eventName: "clickAds",
                triggerAdClick: (e, t) => {
                    let {
                        flow_id: n,
                        vidacha_type: r = "external",
                        frequencyCapValue: a = 0,
                        freqCap: s = 0
                    } = t, i = n;
                    if (i || (i = g.start({
                            vidacha_type: r,
                            group: _,
                            click_count: f,
                            extra: {
                                auto_started: !0
                            }
                        }), h("start_auto", {
                            flow_id: i
                        })), a >= s) return g.cancel(i, "frequency_capped"), !1;
                    (0, o.storeFrequencyImpression)(window[c].frequencyParams, "clickAds");
                    const l = b(i, a, s, "external_trigger"),
                        d = window.open(e, "_blank");
                    return !d || d.closed || void 0 === d.closed ? (g.fail(l), !1) : (g.success(l), !0)
                },
                startFlow: e => {
                    let {
                        vidacha_type: t,
                        extra: n = {}
                    } = e;
                    return g.start({
                        vidacha_type: t,
                        group: _,
                        click_count: f,
                        extra: n
                    })
                },
                cancelFlow: function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "cancelled";
                    g.cancel(e, t)
                }
            }
        }
    }
]);