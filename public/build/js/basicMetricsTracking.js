"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [6297], {
        2396: function(t) {
            t.exports = window.$
        },
        8569: function(t, e, n) {
            var i = n(2396);
            ! function() {
                if (!window.sf) return;
                const t = o({
                        category: "vidacha"
                    }),
                    e = o({
                        category: "main-page"
                    });

                function n(t) {
                    return window.gaHandler && window.gaHandler.replaceEventField ? window.gaHandler.replaceEventField(String(t || ""), !0) : t || ""
                }

                function s(t, e) {
                    return e.indexOf("all") > -1 || e.indexOf(t) > -1
                }

                function o(t) {
                    let { ...e
                    } = t;
                    return t => {
                        const {
                            category: n,
                            action: i,
                            label: o,
                            value: a,
                            ...r
                        } = { ...e,
                            ...t
                        };
                        let l = {
                            hitType: "event",
                            eventCategory: n,
                            eventAction: i,
                            eventLabel: o
                        };
                        a && (l.value = a), r && Object.keys(r).length > 0 && (l = { ...l,
                            ...r
                        });
                        const c = `${n}:${i}`;
                        for (let t in _sf.stats.basicMetricsTracking)
                            if (_sf.stats.basicMetricsTracking.hasOwnProperty(t) && s(c, _sf.stats.basicMetricsTracking[t].events)) {
                                let e = l;
                                const n = _sf.stats.basicMetricsTracking[t].experiment,
                                    i = _sf.stats.basicMetricsTracking[t].group;
                                t = _sf.stats.basicMetricsTracking[t].trackerName || t, n && (e = { ...e,
                                    experiment: n
                                }), i && (e = { ...e,
                                    group: i
                                }), window.ga(`${t}.send`, e)
                            }
                    }
                }
                sf.result.addResultCallback(((e, i, s, o) => {
                    let a = e.hosting || "";
                    e.hosting_id && 101 == e.hosting_id && (a = 101), !1 === e.success ? (!a && e.source_url && (a = e.source_url), t({
                        action: "vidacha_error",
                        label: n(a),
                        er_msg: e.response_type || "unknown error"
                    })) : (void 0 === e.listItem || e.listLastItem) && (!a && e.meta && e.meta.source && (a = e.meta.source), t({
                        action: "show",
                        label: n(a)
                    }))
                })), i("body").on("link-insert", "#sf_url", (function(t, i) {
                    "input-insertText" != i.type && e({
                        action: "link-insert",
                        label: n(this.value)
                    })
                })).on("submit", "form.sf-form", (function() {
                    e({
                        action: "link-submit",
                        label: n(this.sf_url ? this.sf_url.value : "")
                    })
                })).on("custom-submit", "form.sf-form", (function(t, i) {
                    e({
                        action: "link-submit",
                        label: n(i || (this.sf_url ? this.sf_url.value : ""))
                    })
                })).on("invalid-url", "form.sf-form", (function(t, i) {
                    e({
                        action: "link-insert-error",
                        label: n(i || (this.sf_url ? this.sf_url.value : ""))
                    })
                })).on("click", ".link-download", (function() {
                    let e = i(this).closest(".result-box").data("hid");
                    !e && this.href && (e = this.href);
                    const s = i(this).attr("data-quality").toLowerCase(),
                        o = i(this).attr("data-type").split(" ").join("-").toLowerCase();
                    t({
                        action: "download-click",
                        label: n(e),
                        quality: s || "",
                        file_extension: o || ""
                    })
                })).on("click", ".c-ui-download-button", (function(e, s) {
                    let o = i(".result-box").data("hid");
                    const a = i(this).attr("data-quality").toLowerCase(),
                        r = i(this).attr("data-type").split(" ").join("-").toLowerCase();
                    t({
                        action: "download-click",
                        label: n(o || s),
                        quality: a || "",
                        file_extension: r || ""
                    })
                })).on("custom-download-click", (function(e, i) {
                    t({
                        action: "download-click",
                        label: n(i)
                    })
                })).on("custom-result-show", (function(e, i) {
                    t({
                        action: "show",
                        label: n(i)
                    })
                })).on("custom-result-error", (function(e, i, s) {
                    t({
                        action: "vidacha_error",
                        label: n(i),
                        er_msg: s || "unknown error"
                    })
                }))
            }()
        }
    },
    function(t) {
        t(t.s = 8569)
    }
]);