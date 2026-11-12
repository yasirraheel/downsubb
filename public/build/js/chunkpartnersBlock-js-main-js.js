"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [3614], {
        8954: function(e, t, a) {
            var i = a(2396);
            a(5415);
            var r = a(603),
                n = a(1452);
            const o = "partnersBlock",
                s = (0, r.sendEventFabric)({
                    trackerName: o,
                    category: "partner-funnel"
                });
            window[o] = {
                isAvailable() {
                    return !0
                },
                init() {
                    const e = this.expValue <= this.expAnalyticsSample;
                    return (e => {
                        const t = window[o].partners,
                            a = i(".site-info-tabs"),
                            x = Object.keys(t).filter((e => (e => {
                                if (!e || !e.active) return !1;
                                if (e.os && _sf.os.name) {
                                    if (e.os.include && -1 === e.os.include.indexOf(_sf.os.name)) return !1;
                                    if (e.os.exclude && -1 !== e.os.exclude.indexOf(_sf.os.name)) return !1
                                }
                                if (e.lang && _sf.lang) {
                                    if (e.lang.include && -1 === e.lang.include.indexOf(_sf.lang)) return !1;
                                    if (e.lang.exclude && -1 !== e.lang.exclude.indexOf(_sf.lang)) return !1
                                }
                                return !0
                            })(t[e]))).map((e => ({ ...t[e],
                                name: e,
                                icon: `${e}.png`
                            })));
                        if (!x.length || !a.length) return;
                        x.forEach((e => {
                            e.gaResource && e.gaResourceName && !_sf.gaTrackers[e.gaResourceName] && (_sf.gaTrackers[e.gaResourceName] = {
                                id: e.gaResource,
                                parameters: e.gaParameters
                            }, e.gaSendPageview && ga(`${e.gaResourceName}.send`, "pageview"))
                        }));
                        const A = (e => e.map((e => "string" == typeof e.href ? e : { ...e,
                            href: e.href[_sf.lang]
                        })))(x);
                        a.after((0, n.partnersTemplate)({
                            path: window[o].path,
                            partners: A
                        }));
                        const m = i(".partners"),
                            T = m.find("a");
                        if (T.on("click", (a => {
                                const i = t[a.currentTarget.dataset.partner];
                                i.gaResourceName && i.gaClickParameters && ga(`${i.gaResourceName}.send`, "event", i.gaClickParameters), e && s({
                                    action: "click",
                                    label: i.eventLabel
                                })
                            })), e) {
                            let e = !1;
                            i(window).on("scroll load resize", (() => {
                                !e && (0, r.inViewport)(m) && (e = !0, T.each(((e, a) => {
                                    const i = t[a.dataset.partner];
                                    s({
                                        action: "block-show",
                                        label: i.eventLabel
                                    })
                                })))
                            }))
                        }
                    })(e), e && (_sf.gaTrackers[o] = {
                        id: this.gaResource,
                        parameters: this.gaParameters
                    }, ga(`${o}.send`, "pageview")), !0
                }
            }
        },
        1452: function(e, t, a) {
            var i = a(3769);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.partnersTemplate = void 0;
            var r = a(603),
                n = i(a(4961));
            const o = (0, r.translateFabric)({
                localizations: n.default
            });
            t.partnersTemplate = e => {
                let {
                    path: t,
                    partners: a
                } = e;
                return `\n  <section class="partners partners_v1 clearfix">\n    <div>\n      <h2>\n        ${o("title")}\n      </h2>\n    <ul>\n        ${a.map((e=>{let{icon:a,name:i,href:r}=e;return`\
                n < li > \n < a href = "${r}"
                target = "_blank"
                data - partner = "${i}" > \n < div > \n < img src = "${t}img/${a}"
                alt = "" > \n < span > $ {
                    o(`${i}Text`)
                } < /span>\n              </div > \n < /a>\n          </li > \n `})).join("")}\n      </ul>\n    </div>\n  </section>\n`
            }
        },
        8820: function(e, t, a) {
            var i = a(1354),
                r = a.n(i),
                n = a(6314),
                o = a.n(n)()(r());
            o.push([e.id, ".partners{margin-bottom:60px;max-width:100%;width:100%;margin-left:0}.partners h2{font-family:Roboto,sans-serif;font-style:normal;font-weight:700;font-size:35px;line-height:41px;text-align:center;color:#000;margin-top:60px;margin-bottom:32px}.partners ul{justify-content:center;display:flex;flex-wrap:wrap}.partners li{width:300px;margin:0 0 10px;padding:0 10px;display:inline-block}.partners li a{display:flex;font-family:Roboto,sans-serif;font-weight:400;font-size:16px;line-height:20px;color:#000;width:100%;height:80px;padding:20px;margin:0;text-decoration:none;border-radius:6px;background:linear-gradient(90deg,rgba(106,199,49,.2),rgba(147,214,107,.2) 48.96%,rgba(146,226,154,.2));box-shadow:0 2px 8px rgba(57,57,57,.05);box-sizing:border-box}.partners li a div{display:flex;align-content:center}.partners li a div img{height:40px;border-radius:6px;margin-right:12px;width:40px;box-shadow:0 3px 12px rgba(57,57,57,.05);align-self:center}.partners li a div img:lang(ar){margin:0 0 0 12px}.partners li a div span{align-self:center}@media screen and (max-width:720px){.partners h2{margin-top:40px;margin-bottom:24px;font-size:22px;line-height:26px;text-align:center}}@media screen and (max-width:668px){.partners li{width:100%;margin:0 auto 10px;padding:0}.partners li a{justify-content:center}.partners li a div{width:300px}}@media (max-width:360px){.partners li a{padding:20px 10px}}", "", {
                version: 3,
                sources: ["webpack://./assets/experiment/partnersBlock/css/style.css"],
                names: [],
                mappings: "AAAA,UAAU,kBAAkB,CAAC,cAAc,CAAC,UAAU,CAAC,aAAa,CAAC,aAAa,6BAA6B,CAAC,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,iBAAiB,CAAC,UAAU,CAAC,eAAe,CAAC,kBAAkB,CAAC,aAAa,sBAAsB,CAAC,YAAY,CAAC,cAAc,CAAC,aAAa,WAAW,CAAC,eAAe,CAAC,cAAc,CAAC,oBAAoB,CAAC,eAAe,YAAY,CAAC,6BAA6B,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,UAAU,CAAC,UAAU,CAAC,WAAW,CAAC,YAAY,CAAC,QAAQ,CAAC,oBAAoB,CAAC,iBAAiB,CAAC,sGAAsG,CAAC,uCAAuC,CAAC,qBAAqB,CAAC,mBAAmB,YAAY,CAAC,oBAAoB,CAAC,uBAAuB,WAAW,CAAC,iBAAiB,CAAC,iBAAiB,CAAC,UAAU,CAAC,wCAAwC,CAAC,iBAAiB,CAAC,gCAAgC,iBAAiB,CAAC,wBAAwB,iBAAiB,CAAC,oCAAoC,aAAa,eAAe,CAAC,kBAAkB,CAAC,cAAc,CAAC,gBAAgB,CAAC,iBAAiB,CAAC,CAAC,oCAAoC,aAAa,UAAU,CAAC,kBAAkB,CAAC,SAAS,CAAC,eAAe,sBAAsB,CAAC,mBAAmB,WAAW,CAAC,CAAC,yBAAyB,eAAe,iBAAiB,CAAC",
                sourcesContent: [".partners{margin-bottom:60px;max-width:100%;width:100%;margin-left:0}.partners h2{font-family:Roboto,sans-serif;font-style:normal;font-weight:700;font-size:35px;line-height:41px;text-align:center;color:#000;margin-top:60px;margin-bottom:32px}.partners ul{justify-content:center;display:flex;flex-wrap:wrap}.partners li{width:300px;margin:0 0 10px;padding:0 10px;display:inline-block}.partners li a{display:flex;font-family:Roboto,sans-serif;font-weight:400;font-size:16px;line-height:20px;color:#000;width:100%;height:80px;padding:20px;margin:0;text-decoration:none;border-radius:6px;background:linear-gradient(90deg,rgba(106,199,49,.2),rgba(147,214,107,.2) 48.96%,rgba(146,226,154,.2));box-shadow:0 2px 8px rgba(57,57,57,.05);box-sizing:border-box}.partners li a div{display:flex;align-content:center}.partners li a div img{height:40px;border-radius:6px;margin-right:12px;width:40px;box-shadow:0 3px 12px rgba(57,57,57,.05);align-self:center}.partners li a div img:lang(ar){margin:0 0 0 12px}.partners li a div span{align-self:center}@media screen and (max-width:720px){.partners h2{margin-top:40px;margin-bottom:24px;font-size:22px;line-height:26px;text-align:center}}@media screen and (max-width:668px){.partners li{width:100%;margin:0 auto 10px;padding:0}.partners li a{justify-content:center}.partners li a div{width:300px}}@media (max-width:360px){.partners li a{padding:20px 10px}}"],
                sourceRoot: ""
            }]), t.A = o
        },
        5415: function(e, t, a) {
            a.r(t);
            var i = a(5072),
                r = a.n(i),
                n = a(7825),
                o = a.n(n),
                s = a(7659),
                x = a.n(s),
                A = a(5056),
                m = a.n(A),
                T = a(540),
                p = a.n(T),
                d = a(1113),
                l = a.n(d),
                g = a(8820),
                v = {};
            v.styleTagTransform = l(), v.setAttributes = m(), v.insert = x().bind(null, "head"), v.domAPI = o(), v.insertStyleElement = p(), r()(g.A, v), t.default = g.A && g.A.locals ? g.A.locals : void 0
        },
        4961: function(e) {
            e.exports = JSON.parse('{"ar":{"title":"عملاءنا","apkText":"تطبيق SaveFrom.Net لـ Android","ummyText":"Ummy Video Downloader","tiktokText":"SSSTIK","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"de":{"title":"Partner","apkText":"SaveFrom.Net App für Android","pdfeditText":"Online PDF Editor","storiesigText":"StoriesIG","ummyText":"Ummy Video Downloader","tiktokText":"SSSTIK","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","ssstikText":"SSSTik"},"en":{"title":"Partners","apkText":"SaveFrom.Net App for Android","televzrText":"HD YouTube Downloader","ummyConverterText":"Free Video Converter","yandexBrowserText":"Yandex.Browser with Savefrom.net Helper","pdfeditText":"Online PDF Editor","storiesigText":"StoriesIG","instasupersaveText":"InstaSuperSave","ummyText":"Ummy Video Downloader","tiktokText":"SSSTIK","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","ssstikText":"SSSTik"},"es":{"title":"Colaborados","apkText":"App SaveFrom.Net para Android","pdfeditText":"Online PDF Editor","storiesigText":"StoriesIG","ummyText":"Ummy Video Downloader","tiktokText":"SSSTIK","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","ssstikText":"SSSTik"},"fr":{"title":"Partenaires","apkText":"SaveFrom.Net App pour Android","pdfeditText":"Online PDF Editor","instasupersaveText":"InstaSuperSave","storiesigText":"StoriesIG","tiktokText":"SSSTIK","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","ssstikText":"SSSTik"},"hi":{"title":"भागीदारों","apkText":"Android के लिए SaveFrom.Net ऐप","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"id":{"title":"Mitra","apkText":"SaveFrom.Net App untuk Android","instasupersaveText":"InstaSuperSave","ummyText":"Ummy Video Downloader","tiktokText":"SSSTIK","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"it":{"title":"Partners","apkText":"SaveFrom.Net App per Android","storiesigText":"StoriesIG","instasupersaveText":"InstaSuperSave","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","ssstikText":"SSSTik"},"ja":{"title":"パートナー","apkText":"Android 用 SaveFrom.Net App","tiktokText":"SSSTIK","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"ko":{"title":"파트너","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"pl":{"title":"Wzmacniacz","apkText":"Aplikacja SaveFrom.Net na Androida","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"pt":{"title":"Parceiros","apkText":"App SaveFrom.Net para Android","pdfeditText":"Editor de PDF Online","ummyText":"Ummy Video Downloader","tiktokText":"SSSTIK","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"ru":{"title":"Наши партнеры","apkText":"SaveFrom.Net для Android","televzrText":"Скачать видео с YouTube","yandexBrowserText":"Яндекс.Браузер с Savefrom.net Helper","ummyText":"Ummy Video Downloader","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"th":{"title":"หุ้นส่วน","tiktokText":"SSSTIK","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"tr":{"title":"Ortaklık","apkText":"Android için SaveFrom.Net App","ummyText":"Ummy Video Downloader","tiktokText":"SSSTIK","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","savefText":"SaveFrom 2.0","igramText":"iGram","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"uk":{"title":"Партнери","apkText":"SaveFrom.Net App для Android","ummyText":"Ummy Video Downloader","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"vi":{"title":"Đối tác","instasupersaveText":"InstaSuperSave","tiktokText":"SSSTIK","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","storiesigText":"StoriesIG","ssstikText":"SSSTik"},"zh":{"title":"合作伙伴","apkText":"适用于 Android 的 SaveFrom.Net 应用程序","savefText":"SaveFrom 2.0","igramText":"iGram","ssyoutubeText":"ssYouTube.com","ovcText":"OnlineVideoConverter","saveFromText":"Save-From.net","anonyigText":"IGanony","storiesigText":"StoriesIG","ssstikText":"SSSTik"}}')
        }
    }
]);