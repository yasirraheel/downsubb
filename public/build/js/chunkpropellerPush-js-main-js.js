"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [2601], {
        5473: function(e, s, a) {
            a(7946);
            var n = a(603);
            const t = "poropellerAdsPush",
                i = (0, n.sendEventFabric)({
                    trackerName: t,
                    category: t
                });
            window[t] = {
                isAvailable() {
                    return !0
                },
                init() {
                    _sf.gaTrackers[t] = {
                        id: this.gaResource,
                        parameters: this.gaParameters
                    }, _sf.stats.basicMetricsTracking[t] = {
                        events: ["vidacha:show", "vidacha:download-click"]
                    }, ga(`${t}.set`, "dimension1", "propellerads-push"), ga(`${t}.send`, "pageview"), cookie.del("pushsw"), cookie.del("pushsw", _sf.cookieDomain);
                    const e = document.createElement("script");
                    return e.src = this.src, e.async = !0, e.dataset.cfasync = "false", document.body.appendChild(e), i({
                        action: "show",
                        label: "true"
                    }), !0
                }
            }
        },
        6857: function(e, s, a) {
            var n = a(1354),
                t = a.n(n),
                i = a(6314),
                r = a.n(i)()(t());
            r.push([e.id, "iframe[id^=_pn_]{z-index:10001}", "", {
                version: 3,
                sources: ["webpack://./assets/experiment/propellerPush/css/style.css"],
                names: [],
                mappings: "AAAA,iBAAiB,aAAa",
                sourcesContent: ["iframe[id^=_pn_]{z-index:10001}"],
                sourceRoot: ""
            }]), s.A = r
        },
        7946: function(e, s, a) {
            a.r(s);
            var n = a(5072),
                t = a.n(n),
                i = a(7825),
                r = a.n(i),
                o = a(7659),
                c = a.n(o),
                l = a(5056),
                d = a.n(l),
                u = a(540),
                p = a.n(u),
                h = a(1113),
                m = a.n(h),
                A = a(6857),
                f = {};
            f.styleTagTransform = m(), f.setAttributes = d(), f.insert = c().bind(null, "head"), f.domAPI = r(), f.insertStyleElement = p(), t()(A.A, f), s.default = A.A && A.A.locals ? A.A.locals : void 0
        }
    }
]);