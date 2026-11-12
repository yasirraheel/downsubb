"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [9157], {
        6399: function(e, t, s) {
            var r = s(2396),
                a = s(603);
            const o = "outputStats";
            let i, l;
            const n = e => {
                let {
                    category: t,
                    action: s,
                    label: r,
                    parameters: a
                } = e;
                ga(`${o}.send`, "event", t || "", s || "", r || "", a)
            };
            window[o] = {
                isAvailable() {
                    return !!this.gaResource
                },
                init() {
                    return _sf.gaTrackers[o] || (_sf.gaTrackers[o] = {
                        id: this.gaResource,
                        parameters: this.gaParameters
                    }), _sf.stats.basicMetricsTracking[o] = {
                        events: ["all"]
                    }, r(document.body).on("submit", "form.sf-form", (() => {
                        i = Date.now(), l = null
                    })).on("timeout retry", "form.sf-form", ((e, t) => {
                        n({
                            category: e.type,
                            action: t && t.url || "?",
                            label: "true"
                        }), _sf.debug && console.log(e.type, t)
                    })), sf.result.addResultCallback(((e, t, s) => {
                        if (l = Date.now(), e)
                            if (null === e.supported_resource) n({
                                category: "unsupported",
                                action: e.resource || e.source_url,
                                label: "true",
                                parameters: {
                                    dimension1: e.srv || ""
                                }
                            });
                            else if (void 0 === e.listItem || e.listLastItem) {
                            const t = 101 === e.hosting_id ? 101 : e.hosting || "?";
                            if (e.blacklist) n({
                                category: "failure",
                                action: t,
                                label: "blacklist",
                                parameters: {
                                    dimension1: e.srv || ""
                                }
                            });
                            else if (!1 === e.success) n({
                                category: "failure",
                                action: t,
                                label: (0, a.isYoutubeHost)((0, a.getHost)(e.source_url)) ? t : e.source_url,
                                parameters: {
                                    dimension1: e.srv || ""
                                }
                            });
                            else {
                                let r = i ? Math.floor(((l || Date.now()) - i) / 1e3) : 0;
                                r >= 20 ? r = 10 * Math.floor(Math.min(r, 30) / 10) : r >= 5 && (r = 5 * Math.floor(r / 5)), n({
                                    category: "success",
                                    action: t,
                                    label: s ? "multi" : "true",
                                    parameters: {
                                        dimension1: e.srv || "",
                                        dimension2: r
                                    }
                                })
                            }
                        }
                    })), !0
                }
            }
        }
    }
]);