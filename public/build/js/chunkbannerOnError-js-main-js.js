"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [2321], {
        725: function(e, t, r) {
            var n = r(2396);
            r(5538);
            var a = r(603),
                o = r(2041);
            const i = "bannerOnError";

            function l() {
                let e = "";
                return "Windows" === _sf.os.name ? e = "win" : "Mac OS" === _sf.os.name && (e = "mac"), e ? `https://televzr.com/download/?platform=${e}&uid=${_sf.stats.uid}&vid=717` : ""
            }
            window[i] = {
                isAvailable() {
                    return !0
                },
                init() {
                    const e = !(0, a.checkSample)(this.expValue, this.controlGroupSample || 0, 0, this.expSample),
                        t = e ? "test" : "control";
                    _sf.gaTrackers[i] || (_sf.gaTrackers[i] = {
                        id: this.gaResource,
                        parameters: this.gaParameters
                    }), _sf.stats.basicMetricsTracking[i] = {
                        trackerName: this.gaResource,
                        experiment: i,
                        group: t,
                        events: ["main-page:link-insert", "main-page:link-insert-error", "main-page:link-submit", "vidacha:show", "vidacha:vidacha_error", "vidacha:download-click"]
                    };
                    const r = (0, a.sendEventsJointTrackerFabric)({
                        trackerName: this.gaResource,
                        expName: i,
                        experiment: i,
                        category: "main-page",
                        group: t
                    });
                    return r({
                        action: "start_exp"
                    }), e && (sf.result.addResultCallback((e => {
                        e && (void 0 === e.listItem || e.listLastItem) && (n("#sf_result").removeClass("hide-promo-banner"), n("#js-install-now").hide()), !1 === e.success && -1 !== e.source_url.indexOf("youtube") && (() => {
                            const e = document.querySelector("#js-install-now");
                            _sf.mobile ? (e.innerHTML = (0, o.apkBannerTemplate)({
                                path: window[i].path,
                                href: _sf.apk.getDownloadUrl(),
                                target: "_blank"
                            }), r({
                                action: "banner-show",
                                label: "apk"
                            })) : (e.innerHTML = (0, o.televzrBannerTemplate)({
                                path: window[i].path,
                                href: l(),
                                target: "_blank"
                            }), r({
                                action: "banner-show",
                                label: "televzr"
                            })), n("#js-install-now").show(), n("#sf_result").addClass("hide-promo-banner")
                        })()
                    })), n(document.body).on("click", "#televzr-on-error-banner__button", (() => {
                        r({
                            action: "banner-click",
                            label: "televzr"
                        })
                    })), n(document.body).on("click", "#apk-on-error-banner__button", (() => {
                        r({
                            action: "banner-click",
                            label: "apk"
                        })
                    }))), !0
                }
            }
        },
        2041: function(e, t, r) {
            var n = r(3769);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.televzrBannerTemplate = t.apkBannerTemplate = void 0;
            var a = r(603),
                o = n(r(4226));
            const i = (0, a.translateFabric)({
                localizations: o.default
            });
            t.televzrBannerTemplate = e => {
                let {
                    path: t,
                    href: r,
                    target: n
                } = e;
                return `\n  <div class="televzr-on-error-banner">\n    <div>\n      <p class="televzr-on-error-banner__text">\n        ${i("televzrText")}\n      </p>\n      <p class="televzr-on-error-banner__alt">\n        ${i("televzrAlt")}\n      </p>\n    </div>\n    </p>\n    <a id="televzr-on-error-banner__button" href="${r}" target="${n}">\n      <img src="${t}img/mac.svg" alt="Mac"> ${i("televzrButton")}\n    </a>\n  </div>\n`
            }, t.apkBannerTemplate = e => {
                let {
                    path: t,
                    href: r,
                    target: n
                } = e;
                return `\n  <div class="apk-on-error-banner">\n    <div>\n      <p class="apk-on-error-banner__text">\n        ${i("apkText")}\n      </p>\n      <p class="apk-on-error-banner__alt">\n        ${i("apkAlt")}\n      </p>\n    </div>\n    <a id="apk-on-error-banner__button" href="${r}" target="${n}">\n      <img src="${t}img/android.svg" alt="Android"> ${i("apkButton")}\n    </a>\n  </div>\n`
            }
        },
        5293: function(e, t, r) {
            var n = r(1354),
                a = r.n(n),
                o = r(6314),
                i = r.n(o)()(a());
            i.push([e.id, '.televzr-on-error-banner{padding:14px 24px;display:flex;justify-content:space-between;align-items:center;border:1px solid #c21b08;border-radius:6px;background-color:#f9f9f9;max-width:912px;margin:0 auto}.televzr-on-error-banner__alt,.televzr-on-error-banner__text{color:#1b1b1b;font-family:Roboto,sans-serif;font-weight:400;font-size:18px;line-height:24px;padding:0;margin:0}#televzr-on-error-banner__button{display:flex;align-items:center;justify-content:center;background:linear-gradient(89.02deg,#1697f1 2.5%,#47a6e8 101.34%);border-radius:6px;color:#fff;padding:16px 24px;width:240px;text-decoration:none;font-family:Roboto,sans-serif;font-weight:700;font-size:16px;line-height:24px}#televzr-on-error-banner__button img{margin-right:12px;width:24px;height:24px}#js-install-now{margin:16px auto}.apk-on-error-banner{padding:16px 14px;flex-direction:column;display:flex;justify-content:space-between;align-items:center;border:1px solid #c21b08;border-radius:6px;background-color:#f9f9f9}.apk-on-error-banner__text{color:#c21b08;font-weight:500}.apk-on-error-banner__alt,.apk-on-error-banner__text{font-family:Roboto,sans-serif;font-size:18px;line-height:24px;letter-spacing:0;text-align:center}.apk-on-error-banner__alt{color:#1b1b1b;font-weight:400}#apk-on-error-banner__button{display:flex;align-items:center;justify-content:center;background-color:#7ed320;border-radius:6px;padding:12px;align-self:stretch;text-decoration:none;font-family:Roboto,sans-serif;font-weight:700;font-size:16px;line-height:24px;color:#fff}#apk-on-error-banner__button img{margin-right:12px;width:24px;height:24px}.result-failure[data-hid="youtube.com"]{display:none!important}', "", {
                version: 3,
                sources: ["webpack://./assets/experiment/bannerOnError/css/style.css"],
                names: [],
                mappings: "AAAA,yBAAyB,iBAAiB,CAAC,YAAY,CAAC,6BAA6B,CAAC,kBAAkB,CAAC,wBAAwB,CAAC,iBAAiB,CAAC,wBAAwB,CAAC,eAAe,CAAC,aAAa,CAAC,6DAA6D,aAAa,CAAC,6BAA6B,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,SAAS,CAAC,QAAQ,CAAC,iCAAiC,YAAY,CAAC,kBAAkB,CAAC,sBAAsB,CAAC,iEAAiE,CAAC,iBAAiB,CAAC,UAAU,CAAC,iBAAiB,CAAC,WAAW,CAAC,oBAAoB,CAAC,6BAA6B,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,qCAAqC,iBAAiB,CAAC,UAAU,CAAC,WAAW,CAAC,gBAAgB,gBAAgB,CAAC,qBAAqB,iBAAiB,CAAC,qBAAqB,CAAC,YAAY,CAAC,6BAA6B,CAAC,kBAAkB,CAAC,wBAAwB,CAAC,iBAAiB,CAAC,wBAAwB,CAAC,2BAA2B,aAAa,CAAC,eAAe,CAAC,qDAAqD,6BAA6B,CAAC,cAAc,CAAC,gBAAgB,CAAC,gBAAgB,CAAC,iBAAiB,CAAC,0BAA0B,aAAa,CAAC,eAAe,CAAC,6BAA6B,YAAY,CAAC,kBAAkB,CAAC,sBAAsB,CAAC,wBAAwB,CAAC,iBAAiB,CAAC,YAAY,CAAC,kBAAkB,CAAC,oBAAoB,CAAC,6BAA6B,CAAC,eAAe,CAAC,cAAc,CAAC,gBAAgB,CAAC,UAAU,CAAC,iCAAiC,iBAAiB,CAAC,UAAU,CAAC,WAAW,CAAC,wCAAwC,sBAAsB",
                sourcesContent: ['.televzr-on-error-banner{padding:14px 24px;display:flex;justify-content:space-between;align-items:center;border:1px solid #c21b08;border-radius:6px;background-color:#f9f9f9;max-width:912px;margin:0 auto}.televzr-on-error-banner__alt,.televzr-on-error-banner__text{color:#1b1b1b;font-family:Roboto,sans-serif;font-weight:400;font-size:18px;line-height:24px;padding:0;margin:0}#televzr-on-error-banner__button{display:flex;align-items:center;justify-content:center;background:linear-gradient(89.02deg,#1697f1 2.5%,#47a6e8 101.34%);border-radius:6px;color:#fff;padding:16px 24px;width:240px;text-decoration:none;font-family:Roboto,sans-serif;font-weight:700;font-size:16px;line-height:24px}#televzr-on-error-banner__button img{margin-right:12px;width:24px;height:24px}#js-install-now{margin:16px auto}.apk-on-error-banner{padding:16px 14px;flex-direction:column;display:flex;justify-content:space-between;align-items:center;border:1px solid #c21b08;border-radius:6px;background-color:#f9f9f9}.apk-on-error-banner__text{color:#c21b08;font-weight:500}.apk-on-error-banner__alt,.apk-on-error-banner__text{font-family:Roboto,sans-serif;font-size:18px;line-height:24px;letter-spacing:0;text-align:center}.apk-on-error-banner__alt{color:#1b1b1b;font-weight:400}#apk-on-error-banner__button{display:flex;align-items:center;justify-content:center;background-color:#7ed320;border-radius:6px;padding:12px;align-self:stretch;text-decoration:none;font-family:Roboto,sans-serif;font-weight:700;font-size:16px;line-height:24px;color:#fff}#apk-on-error-banner__button img{margin-right:12px;width:24px;height:24px}.result-failure[data-hid="youtube.com"]{display:none!important}'],
                sourceRoot: ""
            }]), t.A = i
        },
        5538: function(e, t, r) {
            r.r(t);
            var n = r(5072),
                a = r.n(n),
                o = r(7825),
                i = r.n(o),
                l = r(7659),
                A = r.n(l),
                s = r(5056),
                p = r.n(s),
                d = r(540),
                c = r.n(d),
                v = r(1113),
                u = r.n(v),
                g = r(5293),
                b = {};
            b.styleTagTransform = u(), b.setAttributes = p(), b.insert = A().bind(null, "head"), b.domAPI = i(), b.insertStyleElement = c(), a()(g.A, b), t.default = g.A && g.A.locals ? g.A.locals : void 0
        },
        4226: function(e) {
            e.exports = JSON.parse('{"ar":{"televzrText":"لا يمكننا تنزيل هذا الملف الآن.","televzrAlt":"جرّب تنزيله في Televzr — إنه سريع وموثوق.","televzrButton":"تنزيل Televzr","apkText":"يتعذر تنزيل هذا الملف","apkAlt":"قم بتنزيله في تطبيق SaveFrom الآن!","apkButton":"تنزيل التطبيق"},"de":{"televzrText":"Wir konnten diese Datei gerade nicht herunterladen.","televzrAlt":"Versuche, sie in Televzr herunterzuladen — schnell und zuverlässig.","televzrButton":"Mit Televzr herunterladen","apkText":"Diese Datei kann nicht heruntergeladen werden","apkAlt":"Lade sie jetzt in der SaveFrom-App herunter!","apkButton":"App herunterladen"},"en":{"televzrText":"We couldn’t download this file right now.","televzrAlt":"Try downloading it in Televzr — it’s fast and reliable.","televzrButton":"Download Televzr","apkText":"Unable to download this file","apkAlt":"Download it in the SaveFrom mobile app right now!","apkButton":"Download the app"},"es":{"televzrText":"No pudimos descargar este archivo ahora.","televzrAlt":"Intenta descargarlo en Televzr — es rápido y confiable.","televzrButton":"Descargar Televzr","apkText":"No se puede descargar este archivo","apkAlt":"¡Descárgalo ahora en la aplicación móvil de SaveFrom!","apkButton":"Descargar la app"},"fr":{"televzrText":"Nous n’avons pas pu télécharger ce fichier pour le moment.","televzrAlt":"Essayez de le télécharger avec Televzr — rapide et fiable.","televzrButton":"Télécharger Televzr","apkText":"Impossible de télécharger ce fichier","apkAlt":"Téléchargez-le dès maintenant avec l’application mobile SaveFrom !","apkButton":"Télécharger l’application"},"hi":{"televzrText":"हम अभी इस फ़ाइल को डाउनलोड नहीं कर पाए।","televzrAlt":"इसे Televzr में डाउनलोड करने का प्रयास करें — तेज़ और भरोसेमंद।","televzrButton":"Televzr डाउनलोड करें","apkText":"इस फ़ाइल को डाउनलोड नहीं किया जा सकता","apkAlt":"इसे अभी SaveFrom मोबाइल ऐप में डाउनलोड करें!","apkButton":"ऐप डाउनलोड करें"},"id":{"televzrText":"Kami tidak dapat mengunduh file ini sekarang.","televzrAlt":"Coba unduh di Televzr — cepat dan andal.","televzrButton":"Unduh Televzr","apkText":"File ini tidak dapat diunduh","apkAlt":"Unduh sekarang di aplikasi seluler SaveFrom!","apkButton":"Unduh aplikasi"},"it":{"televzrText":"Non siamo riusciti a scaricare questo file al momento.","televzrAlt":"Prova a scaricarlo con Televzr — veloce e affidabile.","televzrButton":"Scarica Televzr","apkText":"Impossibile scaricare questo file","apkAlt":"Scaricalo ora nell’app mobile di SaveFrom!","apkButton":"Scarica l’app"},"ja":{"televzrText":"このファイルを今すぐダウンロードできませんでした。","televzrAlt":"Televzrでダウンロードしてみてください — 高速で信頼できます。","televzrButton":"Televzr をダウンロード","apkText":"このファイルをダウンロードできません","apkAlt":"今すぐ SaveFrom モバイルアプリでダウンロード！","apkButton":"アプリをダウンロード"},"ko":{"televzrText":"지금 이 파일을 다운로드할 수 없습니다.","televzrAlt":"Televzr에서 다운로드해보세요 — 빠르고 신뢰할 수 있습니다.","televzrButton":"Televzr 다운로드","apkText":"이 파일을 다운로드할 수 없습니다","apkAlt":"지금 SaveFrom 모바일 앱에서 다운로드하세요!","apkButton":"앱 다운로드"},"pl":{"televzrText":"Nie udało się pobrać tego pliku.","televzrAlt":"Spróbuj pobrać go w Televzr — szybko i niezawodnie.","televzrButton":"Pobierz Televzr","apkText":"Nie można pobrać tego pliku","apkAlt":"Pobierz go teraz w aplikacji mobilnej SaveFrom!","apkButton":"Pobierz aplikację"},"pt":{"televzrText":"Não foi possível baixar este arquivo agora.","televzrAlt":"Tente baixá-lo no Televzr — rápido e confiável.","televzrButton":"Baixar Televzr","apkText":"Não é possível baixar este arquivo","apkAlt":"Baixe agora no aplicativo móvel SaveFrom!","apkButton":"Baixar aplicativo"},"ru":{"televzrText":"Не удалось скачать этот файл прямо сейчас.","televzrAlt":"Попробуйте скачать его в Televzr — он быстрый и надёжный.","televzrButton":"Скачать Televzr","apkText":"Не удалось скачать этот файл","apkAlt":"Скачайте его в нашем мобильном приложении прямо сейчас!","apkButton":"Скачать приложение"},"th":{"televzrText":"ไม่สามารถดาวน์โหลดไฟล์นี้ได้ในขณะนี้","televzrAlt":"ลองดาวน์โหลดด้วย Televzr — เร็วและเชื่อถือได้","televzrButton":"ดาวน์โหลด Televzr","apkText":"ไม่สามารถดาวน์โหลดไฟล์นี้ได้","apkAlt":"ดาวน์โหลดเลยในแอปมือถือ SaveFrom!","apkButton":"ดาวน์โหลดแอป"},"tr":{"televzrText":"Bu dosyayı şu anda indiremedik.","televzrAlt":"Televzr ile indirmeyi deneyin — hızlı ve güvenilir.","televzrButton":"Televzr\'i indir","apkText":"Bu dosya indirilemiyor","apkAlt":"Şimdi SaveFrom mobil uygulamasında indirin!","apkButton":"Uygulamayı indir"},"uk":{"televzrText":"Не вдалося завантажити цей файл зараз.","televzrAlt":"Спробуйте завантажити його в Televzr — швидко та надійно.","televzrButton":"Завантажити Televzr","apkText":"Неможливо завантажити цей файл","apkAlt":"Завантажте його зараз у мобільному додатку SaveFrom!","apkButton":"Завантажити додаток"},"vi":{"televzrText":"Không thể tải xuống tệp này ngay bây giờ.","televzrAlt":"Hãy thử tải bằng Televzr — nhanh và đáng tin cậy.","televzrButton":"Tải Televzr","apkText":"Không thể tải xuống tệp này","apkAlt":"Tải ngay trong ứng dụng di động SaveFrom!","apkButton":"Tải ứng dụng"},"zh":{"televzrText":"暂时无法下载此文件。","televzrAlt":"尝试在 Televzr 中下载 — 快速且可靠。","televzrButton":"下载 Televzr","apkText":"无法下载此文件","apkAlt":"立即在 SaveFrom 手机应用中下载！","apkButton":"下载应用"}}')
        }
    }
]);