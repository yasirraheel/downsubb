"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [9658], {
        2868: function(e, o, n) {
            var t = n(2396);
            n(9371);
            var a = n(6186),
                A = n(603);
            const i = "popupAfterDownload",
                p = (0, A.sendEventFabric)({
                    trackerName: i,
                    category: "popup"
                });

            function l() {
                let e = new Date,
                    o = e.getDate() + 1,
                    n = e.getFullYear(),
                    t = e.getMonth();
                localStorage.setItem("nextInitialDownloadVideo", +new Date(n, t, o))
            }
            window[i] = {
                isAvailable() {
                    return !0
                },
                init() {
                    function e(e) {
                        p({
                            label: `${e}`
                        }), t(".popup-after-download").addClass("popup-after-download_disable"), setTimeout((() => {
                            t(".popup-after-download").remove()
                        }), 700)
                    }
                    return _sf.gaTrackers[i] = {
                        id: this.gaResource,
                        parameters: this.gaParameters
                    }, _sf.stats.basicMetricsTracking[i] = {
                        events: ["main-page:link-insert", "main-page:link-submit", "vidacha:show", "vidacha:download-click"]
                    }, t(document.body).on("click", ".link-download", (() => {
                        localStorage.getItem("countDownloadVideo") < 3 && (0, A.checkFrequencyCap)(this.frequencyParams, i) && localStorage.setItem("countDownloadVideo", (null === localStorage.getItem("countDownloadVideo") ? (l(), 0) : null === localStorage.getItem("nextInitialDownloadVideo") ? (l(), Number(localStorage.getItem("countDownloadVideo"))) : Date.now() <= Number(localStorage.getItem("nextInitialDownloadVideo")) ? Number(localStorage.getItem("countDownloadVideo")) : (l(), 0)) + 1), localStorage.getItem("countDownloadVideo") >= 3 && (0, A.checkFrequencyCap)(this.frequencyParams, i) && ((0, A.storeFrequencyImpression)(this.frequencyParams, i), localStorage.setItem("countDownloadVideo", 0), p({
                            label: "show"
                        }), setTimeout((() => {
                            if (_sf.mobile) t("#main").append((0, a.popupMob)({
                                path: this.path,
                                link: _sf.apk.getDownloadUrl()
                            })), t(".popup-after-download__content-mobile-btn").on("click", (() => {
                                e("download")
                            }));
                            else {
                                const o = (() => {
                                    const e = _sf.helper.getLinkUrlForBrowser();
                                    return !!e && {
                                        url: e,
                                        id: _sf.helper.browserConfig.id
                                    }
                                })();
                                t("#main").append((0, a.popupWeb)({
                                    path: this.path,
                                    link: o.url
                                })), t(".popup-after-download__content-btn").on("click", (() => {
                                    e("download")
                                }))
                            }
                            t(".popup-after-download__block").addClass("popup-after-download__block_active"), t(".popup-after-download__close").on("click", (() => {
                                e("close")
                            }))
                        }), 10))
                    })), !0
                }
            }
        },
        6186: function(e, o, n) {
            var t = n(3769);
            Object.defineProperty(o, "__esModule", {
                value: !0
            }), o.popupWeb = o.popupMob = void 0;
            var a = t(n(6869)),
                A = n(603);
            o.popupWeb = e => {
                let {
                    path: o,
                    link: n
                } = e;
                const t = (0, A.translateFabric)({
                    localizations: a.default
                });
                return `\n    <div class="popup-after-download">\n        <div class="popup-after-download__block">\n            <img src="${o}img/img_web.png" alt="" class="popup-after-download__img">\n            <div class="popup-after-download__content">\n                <h3 class="popup-after-download__content-title">\n                ${t("titleWeb")}\n                </h3>\n               <span class="popup-after-download__content-halper">\n                   <img src="${o}img/logo.svg" alt="">\n                                  ${t("helperWeb")}<span>!</span>\n               </span>\n                <p class="popup-after-download__content-text">\n                    ${t("safeWeb")}\n                </p>\n                <a class="popup-after-download__content-btn" href="${n}">\n                    <span>\n                       ${t("download")}\n                    </span>\n                    <img src="${o}img/download_icon.svg" alt="">\n                </a>\n                <a href="/user.php" rel="help" class="popup-after-download__content-more">\n                    ${t("moreWeb")}\n                </a>\n            </div>\n            <button class="popup-after-download__close">\n                <img src="${o}img/close.svg" alt="">\n            </button>\n        </div>\n    </div>\n  `
            }, o.popupMob = e => {
                let {
                    path: o,
                    link: n
                } = e;
                const t = (0, A.translateFabric)({
                    localizations: a.default
                });
                return `\n   <div class="popup-after-download">\n        <div class="popup-after-download__block">\n            <div class="popup-after-download__content-mobile">\n                 <a href="/apk" rel="help" class="popup-after-download__content-mobile-link">${t("helperMob")}</a>\n                 <a href="/apk" rel="help" >\n                    <img src="${o}img/logo_mob.png" alt="" class="popup-after-download__content-mobile-img">\n                 </a>\n                 <h3 class="popup-after-download__content-mobile-title">${t("titleMob")}</h3>\n                 <a class="popup-after-download__content-mobile-btn" href="${n}">${t("download")}</a>\n                 <div class="popup-after-download__content-mobile-safe">\n                    <img src="${o}img/safe.svg" alt="">\n                    <span>${t("safeMob")}</span>\n                 </div>\n            </div>\n            <button class="popup-after-download__close">\n                <img src="${o}img/close.svg" alt="">\n            </button>\n        </div>\n    </div>\n`
            }
        },
        9834: function(e, o, n) {
            var t = n(1354),
                a = n.n(t),
                A = n(6314),
                i = n.n(A)()(a());
            i.push([e.id, ".popup-after-download{font-family:Roboto,sans-serif;overflow:hidden;position:fixed;top:0;left:0;bottom:0;min-width:100%;min-height:100%;background:rgba(5,5,5,.3);z-index:9999;display:flex;justify-content:center;align-items:center}.popup-after-download_disable{opacity:1;animation:closePopup 1s forwards}.popup-after-download__block{position:relative;display:flex;align-items:center;background:#fff;border-radius:10px;opacity:0}.popup-after-download__block_active{opacity:0;animation:showPopup 1s forwards}.popup-after-download__img{padding-top:42px;padding-bottom:69px;padding-right:40px}.popup-after-download__content{display:flex;flex-direction:column;padding-right:20px}.popup-after-download__content-title{max-width:300px;font-style:normal;font-weight:500;font-size:24px;line-height:28px;color:#1b1b1b;margin:0}.popup-after-download__content-halper{display:flex;font-style:normal;font-weight:500;font-size:22px;line-height:26px;color:#8fc012}.popup-after-download__content-halper span{color:#1b1b1b}.popup-after-download__content-halper img{padding-right:4px}.popup-after-download__content-text{font-weight:400;font-size:14px;line-height:16px;color:#2d2d2d;padding:24px 0;margin:0}.popup-after-download__content-btn{width:228px;height:50px;display:flex;justify-content:center;align-items:center;background:linear-gradient(96.82deg,#a8e41e -15%,#abdb43 10.59%,#75ac00 107.11%);border-radius:6px;padding:0;border:none;text-decoration:none}.popup-after-download__content-btn span{font-style:normal;font-weight:500;font-size:22px;line-height:38px;color:#fff;padding-right:8px}.popup-after-download__content-btn:hover{background:#7ed320}.popup-after-download__content-more{font-style:normal;font-weight:400;font-size:14px;line-height:16px;-webkit-text-decoration-line:underline;text-decoration-line:underline;color:#b7b7b7;padding-top:8px}.popup-after-download__close{border:none;background:inherit;position:absolute;right:10px;top:10px;padding:0;margin:0}.popup-after-download__content-mobile{display:flex;flex-direction:column;align-items:center;padding:60px 48px 36px}@media (max-width:359px){.popup-after-download__content-mobile{padding:60px 30px 36px}}.popup-after-download__content-mobile-link{font-style:normal;font-weight:500;font-size:16px;line-height:16px;text-transform:lowercase;color:#cbcbcb;padding-bottom:18px}.popup-after-download__content-mobile-img{opacity:.8;border:.2px solid #f1f1f1;box-shadow:0 6px 8px hsla(0,0%,69.8%,.25);border-radius:20px;padding:14px 9px 4px}.popup-after-download__content-mobile-title{max-width:228px;font-style:normal;font-weight:500;font-size:24px;line-height:28px;color:#1b1b1b;text-align:center;margin:24px 0}.popup-after-download__content-mobile-btn{width:100%;height:50px;display:flex;justify-content:center;align-items:center;background:#7ed320;border-radius:10px;font-style:normal;font-weight:700;font-size:16px;line-height:16px;text-transform:uppercase;text-decoration:none;color:#fff;border:none;padding:0}.popup-after-download__content-mobile-safe{display:flex;justify-content:center;align-items:center;padding-top:24px}.popup-after-download__content-mobile-safe img{padding-right:4px}.popup-after-download__content-mobile-safe span{font-style:normal;font-weight:400;font-size:16px;line-height:19px;color:#74ca16}@keyframes closePopup{0%{opacity:1}to{opacity:0}}@keyframes showPopup{0%{opacity:0}to{opacity:1}}", "", {
                version: 3,
                sources: ["webpack://./assets/experiment/popupAfterDownload/css/style.css"],
                names: [],
                mappings: "AAAA,sBAAsB,6BAA6B,CAAC,eAAe,CAAC,cAAc,CAAC,KAAK,CAAC,MAAM,CAAC,QAAQ,CAAC,cAAc,CAAC,eAAe,CAAC,yBAAyB,CAAC,YAAY,CAAC,YAAY,CAAC,sBAAsB,CAAC,kBAAkB,CAAC,8BAA8B,SAAS,CAAC,gCAAgC,CAAC,6BAA6B,iBAAiB,CAAC,YAAY,CAAC,kBAAkB,CAAC,eAAe,CAAC,kBAAkB,CAAC,SAAS,CAAC,oCAAoC,SAAS,CAAC,+BAA+B,CAAC,2BAA2B,gBAAgB,CAAC,mBAAmB,CAAC,kBAAkB,CAAC,+BAA+B,YAAY,CAAC,qBAAqB,CAAC,kBAAkB,CAAC,qCAAqC,eAAe,CAAC,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,aAAa,CAAC,QAAQ,CAAC,sCAAsC,YAAY,CAAC,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,aAAa,CAAC,2CAA2C,aAAa,CAAC,0CAA0C,iBAAiB,CAAC,oCAAoC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,aAAa,CAAC,cAAc,CAAC,QAAQ,CAAC,mCAAmC,WAAW,CAAC,WAAW,CAAC,YAAY,CAAC,sBAAsB,CAAC,kBAAkB,CAAC,gFAAgF,CAAC,iBAAiB,CAAC,SAAS,CAAC,WAAW,CAAC,oBAAoB,CAAC,wCAAwC,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,UAAU,CAAC,iBAAiB,CAAC,yCAAyC,kBAAkB,CAAC,oCAAoC,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,sCAAsC,CAAC,8BAA8B,CAAC,aAAa,CAAC,eAAe,CAAC,6BAA6B,WAAW,CAAC,kBAAkB,CAAC,iBAAiB,CAAC,UAAU,CAAC,QAAQ,CAAC,SAAS,CAAC,QAAQ,CAAC,sCAAsC,YAAY,CAAC,qBAAqB,CAAC,kBAAkB,CAAC,sBAAsB,CAAC,yBAAyB,sCAAsC,sBAAsB,CAAC,CAAC,2CAA2C,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,wBAAwB,CAAC,aAAa,CAAC,mBAAmB,CAAC,0CAA0C,UAAU,CAAC,yBAAyB,CAAC,yCAAyC,CAAC,kBAAkB,CAAC,oBAAoB,CAAC,4CAA4C,eAAe,CAAC,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,aAAa,CAAC,iBAAiB,CAAC,aAAa,CAAC,0CAA0C,UAAU,CAAC,WAAW,CAAC,YAAY,CAAC,sBAAsB,CAAC,kBAAkB,CAAC,kBAAkB,CAAC,kBAAkB,CAAC,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,wBAAwB,CAAC,oBAAoB,CAAC,UAAU,CAAC,WAAW,CAAC,SAAS,CAAC,2CAA2C,YAAY,CAAC,sBAAsB,CAAC,kBAAkB,CAAC,gBAAgB,CAAC,+CAA+C,iBAAiB,CAAC,gDAAgD,iBAAiB,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,aAAa,CAAC,sBAAsB,GAAG,SAAS,CAAC,GAAG,SAAS,CAAC,CAAC,qBAAqB,GAAG,SAAS,CAAC,GAAG,SAAS,CAAC",
                sourcesContent: [".popup-after-download{font-family:Roboto,sans-serif;overflow:hidden;position:fixed;top:0;left:0;bottom:0;min-width:100%;min-height:100%;background:rgba(5,5,5,.3);z-index:9999;display:flex;justify-content:center;align-items:center}.popup-after-download_disable{opacity:1;animation:closePopup 1s forwards}.popup-after-download__block{position:relative;display:flex;align-items:center;background:#fff;border-radius:10px;opacity:0}.popup-after-download__block_active{opacity:0;animation:showPopup 1s forwards}.popup-after-download__img{padding-top:42px;padding-bottom:69px;padding-right:40px}.popup-after-download__content{display:flex;flex-direction:column;padding-right:20px}.popup-after-download__content-title{max-width:300px;font-style:normal;font-weight:500;font-size:24px;line-height:28px;color:#1b1b1b;margin:0}.popup-after-download__content-halper{display:flex;font-style:normal;font-weight:500;font-size:22px;line-height:26px;color:#8fc012}.popup-after-download__content-halper span{color:#1b1b1b}.popup-after-download__content-halper img{padding-right:4px}.popup-after-download__content-text{font-weight:400;font-size:14px;line-height:16px;color:#2d2d2d;padding:24px 0;margin:0}.popup-after-download__content-btn{width:228px;height:50px;display:flex;justify-content:center;align-items:center;background:linear-gradient(96.82deg,#a8e41e -15%,#abdb43 10.59%,#75ac00 107.11%);border-radius:6px;padding:0;border:none;text-decoration:none}.popup-after-download__content-btn span{font-style:normal;font-weight:500;font-size:22px;line-height:38px;color:#fff;padding-right:8px}.popup-after-download__content-btn:hover{background:#7ed320}.popup-after-download__content-more{font-style:normal;font-weight:400;font-size:14px;line-height:16px;-webkit-text-decoration-line:underline;text-decoration-line:underline;color:#b7b7b7;padding-top:8px}.popup-after-download__close{border:none;background:inherit;position:absolute;right:10px;top:10px;padding:0;margin:0}.popup-after-download__content-mobile{display:flex;flex-direction:column;align-items:center;padding:60px 48px 36px}@media (max-width:359px){.popup-after-download__content-mobile{padding:60px 30px 36px}}.popup-after-download__content-mobile-link{font-style:normal;font-weight:500;font-size:16px;line-height:16px;text-transform:lowercase;color:#cbcbcb;padding-bottom:18px}.popup-after-download__content-mobile-img{opacity:.8;border:.2px solid #f1f1f1;box-shadow:0 6px 8px hsla(0,0%,69.8%,.25);border-radius:20px;padding:14px 9px 4px}.popup-after-download__content-mobile-title{max-width:228px;font-style:normal;font-weight:500;font-size:24px;line-height:28px;color:#1b1b1b;text-align:center;margin:24px 0}.popup-after-download__content-mobile-btn{width:100%;height:50px;display:flex;justify-content:center;align-items:center;background:#7ed320;border-radius:10px;font-style:normal;font-weight:700;font-size:16px;line-height:16px;text-transform:uppercase;text-decoration:none;color:#fff;border:none;padding:0}.popup-after-download__content-mobile-safe{display:flex;justify-content:center;align-items:center;padding-top:24px}.popup-after-download__content-mobile-safe img{padding-right:4px}.popup-after-download__content-mobile-safe span{font-style:normal;font-weight:400;font-size:16px;line-height:19px;color:#74ca16}@keyframes closePopup{0%{opacity:1}to{opacity:0}}@keyframes showPopup{0%{opacity:0}to{opacity:1}}"],
                sourceRoot: ""
            }]), o.A = i
        },
        9371: function(e, o, n) {
            n.r(o);
            var t = n(5072),
                a = n.n(t),
                A = n(7825),
                i = n.n(A),
                p = n(7659),
                l = n.n(p),
                r = n(5056),
                d = n.n(r),
                s = n(540),
                c = n.n(s),
                C = n(1113),
                f = n.n(C),
                g = n(9834),
                b = {};
            b.styleTagTransform = f(), b.setAttributes = d(), b.insert = l().bind(null, "head"), b.domAPI = i(), b.insertStyleElement = c(), a()(g.A, b), o.default = g.A && g.A.locals ? g.A.locals : void 0
        },
        6869: function(e) {
            e.exports = JSON.parse('{"en":{"titleWeb":"How often do you download videos? Make it even faster and easier with","helperWeb":"Savefrom.net helper","safeWeb":"Safe and without restrictions!","moreWeb":"More","download":"Download","helperMob":"savefrom.net","titleMob":"The app is more convenient!","safeMob":"Security verified"},"ru":{"titleWeb":"Как часто вы скачиваете видео? Делайте это ещё быстрее и проще с помощью","helperWeb":"Savefrom.net helper","safeWeb":"Безопасно и без ограничений!","moreWeb":"Больше","download":"Скачать","helperMob":"savefrom.net","titleMob":"Приложение удобнее!","safeMob":"Безопасность подтверждена"},"es":{"titleWeb":"¿Con qué frecuencia descargas videos? Hazlo aún más rápido y fácil con","helperWeb":"Savefrom.net helper","safeWeb":"Seguro y sin restricciones!","moreWeb":"Más","download":"Descargar","helperMob":"savefrom.net","titleMob":"¡La aplicación es más conveniente!","safeMob":"Seguridad verificada"},"id":{"titleWeb":"Seberapa sering Anda mengunduh video? Jadikan lebih cepat dan lebih mudah dengan","helperWeb":"Savefrom.net helper","safeWeb":"Aman dan tanpa batasan!","moreWeb":"Lagi","download":"Unduh","helperMob":"savefrom.net","titleMob":"Aplikasi ini lebih nyaman!","safeMob":"Keamanan diverifikasi"},"pt":{"titleWeb":"Com que frequência você baixa vídeos? Torne-o ainda mais rápido e fácil com","helperWeb":"Savefrom.net helper","safeWeb":"Seguro e sem restrições!","moreWeb":"Mais","download":"Baixar","helperMob":"savefrom.net","titleMob":"O aplicativo é mais conveniente!","safeMob":"Segurança verificada"},"tr":{"titleWeb":"Ne sıklıkla video indiriyorsunuz? ile daha da hızlı ve kolay hale getirin","helperWeb":"Savefrom.net helper","safeWeb":"Güvenli ve kısıtlamasız!","moreWeb":"Daha","download":"İndirmek","helperMob":"savefrom.net","titleMob":"Uygulama daha uygun!","safeMob":"Güvenlik doğrulandı"},"vi":{"titleWeb":"Bạn có thường xuyên tải xuống video không? Làm cho nó nhanh hơn và dễ dàng hơn với","helperWeb":"Savefrom.net helper","safeWeb":"An toàn và không có hạn chế!","moreWeb":"Hơn","download":"Tải xuống","helperMob":"savefrom.net","titleMob":"Ứng dụng tiện lợi hơn!","safeMob":"Đã xác minh bảo mật"},"th":{"titleWeb":"คุณดาวน์โหลดวิดีโอบ่อยแค่ไหน? ให้เร็วขึ้นและง่ายขึ้นด้วย","helperWeb":"Savefrom.net helper","safeWeb":"ปลอดภัยและไร้ข้อจำกัด!","moreWeb":"มากกว่า","download":"ดาวน์โหลด","helperMob":"savefrom.net","titleMob":"แอพสะดวกกว่า!","safeMob":"ตรวจสอบความปลอดภัยแล้ว"},"ar":{"titleWeb":"كم مرة تقوم بتنزيل الفيديوهات؟ اجعلها أسرع وأسهل مع","helperWeb":"Savefrom.net helper","safeWeb":"آمن وبدون قيود!","moreWeb":"أكثر","download":"تحميل","helperMob":"savefrom.net","titleMob":"التطبيق أكثر ملاءمة!","safeMob":"تم التحقق من الأمن"},"fr":{"titleWeb":"À quelle fréquence téléchargez-vous des vidéos ? Rendez-le encore plus rapide et plus facile avec","helperWeb":"Savefrom.net helper","safeWeb":"Sûr et sans restrictions!","moreWeb":"Plus","download":"Télécharger","helperMob":"savefrom.net","titleMob":"L\'appli est plus pratique !","safeMob":"Sécurité vérifiée"}}')
        }
    }
]);