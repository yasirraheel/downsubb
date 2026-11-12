"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [3229], {
        9549: function(o, i, e) {
            var t = e(2396);
            e(3118);
            var n = e(603),
                r = e(1057);
            const d = e(3830),
                a = "proSubscribed",
                A = "test",
                s = (0, n.sendEventsJointTrackerFabric)({
                    trackerName: "G-YZBZRGCYS9",
                    expName: a,
                    experiment: a,
                    category: "experiment",
                    group: A
                });

            function p(o, i) {
                let e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                const n = new Set,
                    r = [];
                return o.find("a[data-type]").each((function() {
                    const o = this.classList.contains("no-audio"),
                        a = "#/convert" === t(this).attr("href");
                    this.classList.add("proSubscription__dowloads__download-button");
                    let A = t(this).attr("data-quality"),
                        p = `${A}|${t(this).attr("data-type").split(" ").join("-")}|${a}`;
                    this.setAttribute("quality", A), this.setAttribute("format", t(this).attr("data-type"));
                    let l = this.innerText.split(" ");
                    l.pop(), l.join(" "), this.innerText = l.includes("MP4") || l.includes("WEBM") ? d[i].downloadVideo : d[i].downloadAudio, n.has(p) || "Download" === this.innerText || (this.hidden = !1, n.add(p), r.push({
                        elem: this,
                        quality: Number(A),
                        id: p,
                        format: l.join(" "),
                        isConverter: a,
                        isVideoWithoutAudio: o
                    }), this.addEventListener("click", (function() {
                        e && e.format === this.getAttribute("format") && e.quality == this.getAttribute("quality") && s({
                            action: "prev-selected-media-download",
                            quality: perSubscriptionQuality,
                            file_extension: perSubscriptionFormat.toLowerCase()
                        }), s({
                            action: "media-download",
                            quality: t(this).attr("quality"),
                            file_extension: t(this).attr("format").toLowerCase()
                        })
                    })))
                })), r
            }
            window[a] = {
                isAvailable() {
                    return !0
                },
                init() {
                    let o, i;
                    const e = _sf.isPro;
                    try {
                        const o = new URL(window.location.href).searchParams.get("user");
                        if (o) return cookie.set("user_jwt", atob(o), 3650, _sf.cookieDomain, !0), void(window.location.href = "/")
                    } catch (o) {
                        console.error("Error setting user_jwt", o)
                    }
                    if (_sf.proSubscriptionExperimentActive || document.querySelectorAll('a[href*="/login"]').forEach((o => {
                            o.style.display = "none"
                        })), !e) return;
                    _sf.gaTrackers[a] || (_sf.gaTrackers[a] = {
                            id: this.gaResource,
                            parameters: this.gaParameters
                        }), _sf.stats.basicMetricsTracking[a] = {
                            trackerName: this.gaResource,
                            experiment: a,
                            group: A,
                            events: ["main-page:link-insert", "main-page:link-submit", "vidacha:download-click", "vidacha:show"]
                        }, s({
                            action: "start_exp"
                        }), document.querySelectorAll('a[href*="/login"]').forEach((o => {
                            o.style.display = "none"
                        })), document.querySelectorAll('a[href*="/user.php"]').forEach((o => {
                            o.style.display = "none"
                        })),
                        function(o) {
                            if (o) {
                                const o = t(".header #nav_top .nav-top-2");
                                null == o || o.append((0, r.logoutBtn)(_sf.lang)), t(".logout-btn").on("click", (async o => {
                                    o.stopPropagation(), s({
                                        action: "logout-clicked"
                                    }), await fetch("/logout.php", {}), window.location.reload()
                                }))
                            }
                        }(e), t(".header__left").addClass("pro"), t(".header #nav_top").addClass("pro"), t(".header #nav_top .nav-top-2").addClass("pro");
                    const n = JSON.parse(localStorage.getItem("sf_pro_selected_video"));
                    null != n && n.url && (i = n.quality, o = n.format, localStorage.removeItem("sf_pro_selected_video"), t(".tarea-wrap input").val(n.url), t(".sf-form").submit(), s({
                        action: "video-search-repeat"
                    }));
                    const l = null != n && n.format && null != n && n.quality ? {
                            format: n.format,
                            quality: n.quality
                        } : null,
                        c = _sf.lang ? ? "en";
                    return sf.result.addResultCallback((o => {
                        o.blacklist || !1 === o.success && (void 0 === o.listItem || o.listLastItem) ? s({
                            action: "result-fail"
                        }) : "101" === o.hosting && setTimeout((() => {
                            const i = t(".media-result");
                            t(".def-btn-box").remove(), t(".sf-helper.extra").remove(),
                                function(o) {
                                    o.find("*").each((function() {
                                        this.hidden = !0
                                    }))
                                }(i);
                            const e = p(i, c, l);
                            let n = e.findIndex((o => o.id.includes("audio")));
                            n < 3 && (n = 3);
                            const a = e.map(((o, i) => (0, r.getMediaElement)({ ...o,
                                alwaysShow: i <= n
                            }, c))).join(" ");
                            i.append((0, r.proSubscriptionOutput)(c, o.thumb, o.meta.title, null, o.meta.duration)), t(".proSubscription__show-more").before(a), e.filter((o => o.id)).forEach((o => {
                                    var i;
                                    null === (i = document.querySelector(`[identifier="${o.id}"]`)) || void 0 === i || i.append(o.elem)
                                })),
                                function() {
                                    const o = _sf.lang ? ? "en";
                                    t(".proSubscription__show-more-btn").on("click", (i => {
                                        document.querySelectorAll('.proSubscription__dowloads > div[alwaysShown="false"]').forEach((e => {
                                            e.classList.contains("hidden") ? (i.target.innerText = d[o].showLess, e.classList.remove("hidden")) : (i.target.innerText = d[o].showMore, e.classList.add("hidden"))
                                        }))
                                    }))
                                }()
                        }), 0)
                    })), !0
                }
            }
        },
        1057: function(o, i, e) {
            Object.defineProperty(i, "__esModule", {
                value: !0
            }), i.getMediaElement = void 0, i.logoutBtn = function() {
                return `\n        <button class="logout-btn">${t[arguments.length>0&&void 0!==arguments[0]?arguments[0]:"en"].logout}</button>\n    `
            }, i.proSubscriptionOutput = void 0;
            const t = e(3830);
            i.proSubscriptionOutput = (o, i, e, n, r) => `\n    <div class="proSubscription">\n        <div class="proSubscription__info">\n            <img class="proSubscription__info-img" src="${i}">\n            \n            <div class="proSubscription__info-text-container">\n            <p class="proSubscription__info-title">${e}</p>\n            ${n?`<p class="proSubscription__info-description">${n}</p>`:""}\n            <span class="proSubscription__info-duration">${r}</span>\n            </div>\n        </div>\n        <div class="proSubscription__dowloads">\n            <div class="proSubscription__dowloads_header">${t[o].format}</div>\n            <div class="proSubscription__dowloads_header">${t[o].download}</div>\n\n            <div class="proSubscription__show-more"> <button class="proSubscription__show-more-btn">${t[o].showMore}</button></div>\n        </div>\n    </div>\n    `, i.getMediaElement = (o, i) => `\n        <div alwaysShown="${o.alwaysShow?"true":"false"}" ${o.alwaysShow?"":'class="hidden"'} id="proSubscription__dowloads__media-type"><span>${o.format}</span><span class="proSubscription__dowloads__media-quality">${o.isVideoWithoutAudio?'<img src="/img/no_audio_red.png" alt="No audio" />':""} ${o.quality}</span></div>\n        <div empty-to-append="true" identifier="${o.id}" alwaysShown="${o.alwaysShow?"true":"false"}" ${o.alwaysShow?"":'class="hidden"'}>\n            \n        </div>\n    `
        },
        9813: function(o, i, e) {
            var t = e(1354),
                n = e.n(t),
                r = e(6314),
                d = e.n(r)()(n());
            d.push([o.id, '.proSubscription{display:flex;max-width:892px;gap:24px;margin:0 auto}.proSubscription button{border:none}.proSubscription button:hover{cursor:pointer}.proSubscription__dowloads{flex-grow:1;display:grid;grid-template-columns:1fr 1fr;border-radius:2px;border:1px solid #dbdbdb;overflow:hidden}.proSubscription__dowloads>div{padding:10px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #dbdbdb}.proSubscription__dowloads>div.hidden{display:none}.proSubscription__dowloads>div:first-child{border-right:1px solid #dbdbdb}.proSubscription__dowloads>div:nth-child(2){border-right:none}#proSubscription__dowloads__media-type{justify-content:space-between!important;padding:20px}.proSubscription__dowloads__media-quality{display:flex;justify-content:center;align-items:center;gap:15px}.proSubscription__dowloads>div:nth-child(odd){border-right:1px solid #dbdbdb}.proSubscription__dowloads>div:first-child,.proSubscription__dowloads>div:nth-child(2){border-top:none}.proSubscription__dowloads>div:last-child{border-bottom:none;border-right:none}.proSubscription__dowloads_header{font-weight:700;background-color:#f7f7f7}.proSubscription__dowloads__download-button{background-color:#28a745;color:#fff;padding:10px 0;width:100%;text-align:center;text-decoration:none;border-radius:4px;font-weight:700}.proSubscription__dowloads__download-button:hover{background-color:#218838;color:#fff}.proSubscription__info{max-width:316px}.proSubscription__info-img{width:100%;height:200px;border-radius:4px;margin-bottom:20px;-o-object-fit:cover;object-fit:cover}.proSubscription__info-text-container{text-align:left}.proSubscription__info-title{max-height:145px;overflow:hidden;text-overflow:ellipsis;font-size:24px;line-height:1.2;font-family:Roboto,sans-serif;font-weight:600;margin:none none 16px}.proSubscription__info-description,.proSubscription__info-duration{color:#292929;font-size:16px;line-height:1.3;font-family:Roboto,sans-serif;margin-bottom:16px;opacity:.6}.proSubscription__show-more{grid-column:1/span 2}.proSubscription__show-more-btn{width:100%;height:100%;padding:10px;background-color:inherit;font-weight:700;text-align:center;border-radius:4px;border:none}.proSubscription__show-more-btn:hover{text-decoration:underline}@media screen and (max-width:930px){.proSubscription__show-more{max-width:760px}.proSubscription__info{max-width:280px}}@media screen and (max-width:800px){.proSubscription{max-width:748px}.proSubscription__info{max-width:260px}}@media screen and (max-width:768px){.proSubscription{width:auto;margin:0 14px;flex-direction:column}.proSubscription__info{max-width:100%}.proSubscription__info-duration{display:none}}.header__left{position:relative}.header__left.pro:after{content:"";position:absolute;width:36px;height:24px;top:19%;right:-25%;background:url(/img/pro.svg) no-repeat}.header__left .become-pro-btn{display:none;position:absolute;right:57px;top:calc(50% - 15px)}.become-pro-btn{border:none;background:#006be8;color:#fff;padding:6px 20px;border-radius:100px;line-height:24px;font-size:16px}#nav_top:not(:has(.pro)){width:79%}.nav-top-2.pro .become-pro-btn{display:none}.nav-top-2.pro .logout-btn{padding:0;border:none;background:transparent;color:#333;font-size:17px;cursor:pointer}.nav-top-2.pro .logout-btn:hover{text-decoration:underline}@media screen and (max-width:950px){.become-pro-btn{padding:4px 10px;font-size:13px}}@media (min-width:768px) and (max-width:950px){.header .nav-top-2__item{padding:0 5px;margin:0;font-size:14px}.header.header_v2 .logo{background-size:120px 30px;width:120px;height:30px}}@media screen and (max-width:768px){.header__left.pro .logo{background:url(/img/pro.svg) calc(50% + 110px) 50% no-repeat,url(/img/logo_small2.svg) 50% 50% no-repeat;background-size:35px 35px,167px 40px}html.no-svg .header__left.pro .logo{background:url(/img/pro.png) calc(50% + 110px) 50% no-repeat,url(/img/logo_small2.png?v=1) 50% 50% no-repeat;background-size:36px 24px,167px 40px}.header__left.pro:after,.nav-top-2 .become-pro-btn{display:none}.nav-top-2.pro .logout-btn{font-size:14px}}', "", {
                version: 3,
                sources: ["webpack://./assets/experiment/proSubscribed/css/style.css"],
                names: [],
                mappings: "AAAA,iBAAiB,YAAY,CAAC,eAAe,CAAC,QAAQ,CAAC,aAAa,CAAC,wBAAwB,WAAW,CAAC,8BAA8B,cAAc,CAAC,2BAA2B,WAAW,CAAC,YAAY,CAAC,6BAA6B,CAAC,iBAAiB,CAAC,wBAAwB,CAAC,eAAe,CAAC,+BAA+B,YAAY,CAAC,YAAY,CAAC,kBAAkB,CAAC,sBAAsB,CAAC,+BAA+B,CAAC,sCAAsC,YAAY,CAAC,2CAA2C,8BAA8B,CAAC,4CAA4C,iBAAiB,CAAC,uCAAuC,uCAAuC,CAAC,YAAY,CAAC,0CAA0C,YAAY,CAAC,sBAAsB,CAAC,kBAAkB,CAAC,QAAQ,CAAC,8CAA8C,8BAA8B,CAAC,uFAAuF,eAAe,CAAC,0CAA0C,kBAAkB,CAAC,iBAAiB,CAAC,kCAAkC,eAAe,CAAC,wBAAwB,CAAC,4CAA4C,wBAAwB,CAAC,UAAU,CAAC,cAAc,CAAC,UAAU,CAAC,iBAAiB,CAAC,oBAAoB,CAAC,iBAAiB,CAAC,eAAe,CAAC,kDAAkD,wBAAwB,CAAC,UAAU,CAAC,uBAAuB,eAAe,CAAC,2BAA2B,UAAU,CAAC,YAAY,CAAC,iBAAiB,CAAC,kBAAkB,CAAC,mBAAmB,CAAC,gBAAgB,CAAC,sCAAsC,eAAe,CAAC,6BAA6B,gBAAgB,CAAC,eAAe,CAAC,sBAAsB,CAAC,cAAc,CAAC,eAAe,CAAC,6BAA6B,CAAC,eAAe,CAAC,qBAAqB,CAAC,mEAAmE,aAAa,CAAC,cAAc,CAAC,eAAe,CAAC,6BAA6B,CAAC,kBAAkB,CAAC,UAAU,CAAC,4BAA4B,oBAAoB,CAAC,gCAAgC,UAAU,CAAC,WAAW,CAAC,YAAY,CAAC,wBAAwB,CAAC,eAAe,CAAC,iBAAiB,CAAC,iBAAiB,CAAC,WAAW,CAAC,sCAAsC,yBAAyB,CAAC,oCAAoC,4BAA4B,eAAe,CAAC,uBAAuB,eAAe,CAAC,CAAC,oCAAoC,iBAAiB,eAAe,CAAC,uBAAuB,eAAe,CAAC,CAAC,oCAAoC,iBAAiB,UAAU,CAAC,aAAa,CAAC,qBAAqB,CAAC,uBAAuB,cAAc,CAAC,gCAAgC,YAAY,CAAC,CAAC,cAAc,iBAAiB,CAAC,wBAAwB,UAAU,CAAC,iBAAiB,CAAC,UAAU,CAAC,WAAW,CAAC,OAAO,CAAC,UAAU,CAAC,sCAAsC,CAAC,8BAA8B,YAAY,CAAC,iBAAiB,CAAC,UAAU,CAAC,oBAAoB,CAAC,gBAAgB,WAAW,CAAC,kBAAkB,CAAC,UAAU,CAAC,gBAAgB,CAAC,mBAAmB,CAAC,gBAAgB,CAAC,cAAc,CAAC,yBAAyB,SAAS,CAAC,+BAA+B,YAAY,CAAC,2BAA2B,SAAS,CAAC,WAAW,CAAC,sBAAsB,CAAC,UAAU,CAAC,cAAc,CAAC,cAAc,CAAC,iCAAiC,yBAAyB,CAAC,oCAAoC,gBAAgB,gBAAgB,CAAC,cAAc,CAAC,CAAC,+CAA+C,yBAAyB,aAAa,CAAC,QAAQ,CAAC,cAAc,CAAC,wBAAwB,0BAA0B,CAAC,WAAW,CAAC,WAAW,CAAC,CAAC,oCAAoC,wBAAwB,wGAAwG,CAAC,oCAAoC,CAAC,oCAAoC,4GAA4G,CAAC,oCAAoC,CAAC,mDAAmD,YAAY,CAAC,2BAA2B,cAAc,CAAC",
                sourcesContent: ['.proSubscription{display:flex;max-width:892px;gap:24px;margin:0 auto}.proSubscription button{border:none}.proSubscription button:hover{cursor:pointer}.proSubscription__dowloads{flex-grow:1;display:grid;grid-template-columns:1fr 1fr;border-radius:2px;border:1px solid #dbdbdb;overflow:hidden}.proSubscription__dowloads>div{padding:10px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #dbdbdb}.proSubscription__dowloads>div.hidden{display:none}.proSubscription__dowloads>div:first-child{border-right:1px solid #dbdbdb}.proSubscription__dowloads>div:nth-child(2){border-right:none}#proSubscription__dowloads__media-type{justify-content:space-between!important;padding:20px}.proSubscription__dowloads__media-quality{display:flex;justify-content:center;align-items:center;gap:15px}.proSubscription__dowloads>div:nth-child(odd){border-right:1px solid #dbdbdb}.proSubscription__dowloads>div:first-child,.proSubscription__dowloads>div:nth-child(2){border-top:none}.proSubscription__dowloads>div:last-child{border-bottom:none;border-right:none}.proSubscription__dowloads_header{font-weight:700;background-color:#f7f7f7}.proSubscription__dowloads__download-button{background-color:#28a745;color:#fff;padding:10px 0;width:100%;text-align:center;text-decoration:none;border-radius:4px;font-weight:700}.proSubscription__dowloads__download-button:hover{background-color:#218838;color:#fff}.proSubscription__info{max-width:316px}.proSubscription__info-img{width:100%;height:200px;border-radius:4px;margin-bottom:20px;-o-object-fit:cover;object-fit:cover}.proSubscription__info-text-container{text-align:left}.proSubscription__info-title{max-height:145px;overflow:hidden;text-overflow:ellipsis;font-size:24px;line-height:1.2;font-family:Roboto,sans-serif;font-weight:600;margin:none none 16px}.proSubscription__info-description,.proSubscription__info-duration{color:#292929;font-size:16px;line-height:1.3;font-family:Roboto,sans-serif;margin-bottom:16px;opacity:.6}.proSubscription__show-more{grid-column:1/span 2}.proSubscription__show-more-btn{width:100%;height:100%;padding:10px;background-color:inherit;font-weight:700;text-align:center;border-radius:4px;border:none}.proSubscription__show-more-btn:hover{text-decoration:underline}@media screen and (max-width:930px){.proSubscription__show-more{max-width:760px}.proSubscription__info{max-width:280px}}@media screen and (max-width:800px){.proSubscription{max-width:748px}.proSubscription__info{max-width:260px}}@media screen and (max-width:768px){.proSubscription{width:auto;margin:0 14px;flex-direction:column}.proSubscription__info{max-width:100%}.proSubscription__info-duration{display:none}}.header__left{position:relative}.header__left.pro:after{content:"";position:absolute;width:36px;height:24px;top:19%;right:-25%;background:url(/img/pro.svg) no-repeat}.header__left .become-pro-btn{display:none;position:absolute;right:57px;top:calc(50% - 15px)}.become-pro-btn{border:none;background:#006be8;color:#fff;padding:6px 20px;border-radius:100px;line-height:24px;font-size:16px}#nav_top:not(:has(.pro)){width:79%}.nav-top-2.pro .become-pro-btn{display:none}.nav-top-2.pro .logout-btn{padding:0;border:none;background:transparent;color:#333;font-size:17px;cursor:pointer}.nav-top-2.pro .logout-btn:hover{text-decoration:underline}@media screen and (max-width:950px){.become-pro-btn{padding:4px 10px;font-size:13px}}@media (min-width:768px) and (max-width:950px){.header .nav-top-2__item{padding:0 5px;margin:0;font-size:14px}.header.header_v2 .logo{background-size:120px 30px;width:120px;height:30px}}@media screen and (max-width:768px){.header__left.pro .logo{background:url(/img/pro.svg) calc(50% + 110px) 50% no-repeat,url(/img/logo_small2.svg) 50% 50% no-repeat;background-size:35px 35px,167px 40px}html.no-svg .header__left.pro .logo{background:url(/img/pro.png) calc(50% + 110px) 50% no-repeat,url(/img/logo_small2.png?v=1) 50% 50% no-repeat;background-size:36px 24px,167px 40px}.header__left.pro:after,.nav-top-2 .become-pro-btn{display:none}.nav-top-2.pro .logout-btn{font-size:14px}}'],
                sourceRoot: ""
            }]), i.A = d
        },
        3118: function(o, i, e) {
            e.r(i);
            var t = e(5072),
                n = e.n(t),
                r = e(7825),
                d = e.n(r),
                a = e(7659),
                A = e.n(a),
                s = e(5056),
                p = e.n(s),
                l = e(540),
                c = e.n(l),
                u = e(1113),
                C = e.n(u),
                h = e(9813),
                w = {};
            w.styleTagTransform = C(), w.setAttributes = p(), w.insert = A().bind(null, "head"), w.domAPI = d(), w.insertStyleElement = c(), n()(h.A, w), i.default = h.A && h.A.locals ? h.A.locals : void 0
        },
        3830: function(o) {
            o.exports = JSON.parse('{"ar":{"format":"تنسيق","download":"تنزيل","downloadVideo":"تحميل الفيديو","downloadAudio":"تحميل الصوت","showMore":"عرض المزيد","showLess":"عرض أقل","logout":"تسجيل الخروج"},"be":{"format":"Фармат","download":"Спампаваць","downloadVideo":"Спампаваць відэа","downloadAudio":"Спампаваць аўдыё","showMore":"Паказаць больш","showLess":"Паказаць менш","logout":"Выйсці"},"de":{"format":"Format","download":"Herunterladen","downloadVideo":"Video herunterladen","downloadAudio":"Audio herunterladen","showMore":"Mehr anzeigen","showLess":"Weniger anzeigen","logout":"Abmelden"},"en":{"format":"Format","download":"Download","downloadVideo":"Download video","downloadAudio":"Download audio","showMore":"Show more","showLess":"Show less","logout":"Logout"},"es":{"format":"Formato","download":"Descargar","downloadVideo":"Descargar vídeo","downloadAudio":"Descargar audio","showMore":"Mostrar más","showLess":"Mostrar menos","logout":"Cerrar sesión"},"fr":{"format":"Format","download":"Télécharger","downloadVideo":"Télécharger la vidéo","downloadAudio":"Télécharger l’audio","showMore":"Voir plus","showLess":"Voir moins","logout":"Se déconnecter"},"hi":{"format":"प्रारूप","download":"डाउनलोड","downloadVideo":"वीडियो डाउनलोड करें","downloadAudio":"ऑडियो डाउनलोड करें","showMore":"और दिखाएं","showLess":"कम दिखाएं","logout":"लॉगआउट"},"id":{"format":"Format","download":"Unduh","downloadVideo":"Unduh video","downloadAudio":"Unduh audio","showMore":"Tampilkan lebih banyak","showLess":"Tampilkan lebih sedikit","logout":"Keluar"},"it":{"format":"Formato","download":"Scarica","downloadVideo":"Scarica video","downloadAudio":"Scarica audio","showMore":"Mostra di più","showLess":"Mostra di meno","logout":"Disconnetti"},"ja":{"format":"形式","download":"ダウンロード","downloadVideo":"動画をダウンロード","downloadAudio":"音声をダウンロード","showMore":"もっと見る","showLess":"表示を減らす","logout":"ログアウト"},"ko":{"format":"형식","download":"다운로드","downloadVideo":"비디오 다운로드","downloadAudio":"오디오 다운로드","showMore":"더 보기","showLess":"간략히 보기","logout":"로그아웃"},"pl":{"format":"Format","download":"Pobierz","downloadVideo":"Pobierz wideo","downloadAudio":"Pobierz audio","showMore":"Pokaż więcej","showLess":"Pokaż mniej","logout":"Wyloguj się"},"pt":{"format":"Formato","download":"Baixar","downloadVideo":"Baixar vídeo","downloadAudio":"Baixar áudio","showMore":"Mostrar mais","showLess":"Mostrar menos","logout":"Sair"},"ru":{"format":"Формат","download":"Скачать","downloadVideo":"Скачать видео","downloadAudio":"Скачать аудио","showMore":"Показать больше","showLess":"Показать меньше","logout":"Выйти"},"th":{"format":"รูปแบบ","download":"ดาวน์โหลด","downloadVideo":"ดาวน์โหลดวิดีโอ","downloadAudio":"ดาวน์โหลดเสียง","showMore":"แสดงเพิ่มเติม","showLess":"แสดงน้อยลง","logout":"ออกจากระบบ"},"tr":{"format":"Format","download":"İndir","downloadVideo":"Videoyu indir","downloadAudio":"Sesi indir","showMore":"Daha fazla göster","showLess":"Daha az göster","logout":"Çıkış yap"},"uk":{"format":"Формат","download":"Завантажити","downloadVideo":"Завантажити відео","downloadAudio":"Завантажити аудіо","showMore":"Показати більше","showLess":"Показати менше","logout":"Вийти"},"vi":{"format":"Định dạng","download":"Tải xuống","downloadVideo":"Tải video","downloadAudio":"Tải âm thanh","showMore":"Hiển thị thêm","showLess":"Hiển thị ít hơn","logout":"Đăng xuất"},"zh":{"format":"格式","download":"下载","downloadVideo":"下载视频","downloadAudio":"下载音频","showMore":"显示更多","showLess":"显示更少","logout":"退出登录"}}')
        }
    }
]);