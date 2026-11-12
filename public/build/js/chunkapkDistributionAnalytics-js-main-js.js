"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [2198], {
        7640: function(e, a, t) {
            var n = t(2396),
                i = t(603);
            const r = "apkDistributionAnalytics",
                s = (0, i.sendEventFabric)({
                    trackerName: r,
                    category: _sf.article ? _sf.article.id : _sf.channel ? _sf.channel[0] : "unknown"
                }),
                c = e => {
                    const a = e.match(/[\w-]+(?=\.[html|php])/);
                    return a ? a[0] : ""
                };
            window[r] = {
                isAvailable() {
                    return !0
                },
                init() {
                    return _sf.gaTrackers[r] = {
                        id: this.gaResource,
                        parameters: this.gaParameters
                    }, _sf.stats.basicMetricsTracking[r] = {
                        events: ["main-page:link-insert", "main-page:link-submit", "vidacha:download-click", "vidacha:show"]
                    }, ga(`${r}.set`, "dimension1", `savefrom.net${location.pathname}`), ga(`${r}.send`, "pageview"), s({
                        action: "visit",
                        label: "true"
                    }), n(document.body).on("click", this.btnSelector, (e => {
                        const a = (e => {
                                const a = e.match(/-([\d.|.|-]+)\.apk/);
                                return a ? a[1] : ""
                            })(e.currentTarget.href),
                            t = e.currentTarget.getAttribute("data-pos") || "1";
                        s({
                            action: a ? "download-click" : "navigate-to-download",
                            label: a || c(e.currentTarget.href),
                            dimension2: t
                        })
                    })), !0
                }
            }
        }
    }
]);