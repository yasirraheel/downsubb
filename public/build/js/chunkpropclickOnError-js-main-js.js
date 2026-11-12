"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [2370], {
        1108: function(e, t, s) {
            var n = s(603);
            const a = "clickAdsOnError",
                r = (0, n.sendEventFabric)({
                    trackerName: "clickAds"
                });
            let c = 1;
            const i = (e, t) => {
                const s = window[a].eventName;
                "init" === e ? r({
                    eventName: `${s}_init`,
                    ...t
                }) : "start" === e ? (r({
                    eventName: `${s}_start`,
                    ...t
                }), c += 1) : "show" === e ? r({
                    eventName: `${s}_show`,
                    ...t
                }) : "notOpening" === e && r({
                    eventName: `${s}_not_open`,
                    ...t
                })
            };
            window[a] = {
                isAvailable() {
                    return !0
                },
                init() {
                    return _sf.gaTrackers[a] = {
                        id: this.gaResource,
                        parameters: this.gaParameters
                    }, i("init"), sf.result.addResultCallback((e => {
                        if (e.blacklist || !1 === e.success && (void 0 === e.listItem || e.listLastItem)) {
                            i("start", {
                                error_count: c
                            });
                            const e = (0, n.getFrequencyCapValue)(window[a].frequencyParams, "clickAds"),
                                t = window[a].frequencyParams.cap;
                            e <= t && (window.open(this.url) ? ((0, n.storeFrequencyImpression)(window[a].frequencyParams, "clickAds"), i("show", {
                                show_count: e + 1,
                                freq_cap: t
                            })) : i("notOpening", {
                                show_count: e,
                                freq_cap: t
                            }))
                        }
                    })), !0
                }
            }
        }
    }
]);