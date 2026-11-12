"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [3784], {
        2396: function(e) {
            e.exports = window.$
        },
        638: function(e, t, s) {
            var r = s(2396);
            e.exports = {
                id: "audio_player",
                player: null,
                currentBoxId: null,
                currentBtn: null,
                btnClass: "play-btn",
                continuousMode: !0,
                types: ["mp3", "mp4", "m4a", "webm", "ogg", "oga", "opus", "flv"],
                toggle(e, t, s) {
                    if (this.currentBoxId) {
                        const r = t !== this.currentBoxId;
                        this.switchOff(), r && this.switchOn(e, t, s)
                    } else this.switchOn(e, t, s)
                },
                async switchOn(e, t, s) {
                    if (!e || !e.url || !t) return;
                    await sf.videoPlayerHTML5.loadLibraries(), this.currentBoxId = t;
                    let n = document.getElementById(t);
                    if (!n && s) {
                        const e = r(s).closest(".result-box").find(".thumb-box").get(0);
                        e && (n = sf.append(e, "div", {
                            id: t,
                            class: "audio-player-box"
                        }))
                    }
                    if (!n) return;
                    const i = document.createElement("audio");
                    i.id = `${t}_tmp`, n.appendChild(i), n.style.display = "block", r(s).addClass("active"), this.currentBtn = s, this.player = videojs(i, {
                        techOrder: ["html5"],
                        controls: !0,
                        autoplay: !0,
                        preload: "auto",
                        height: 30,
                        width: 30,
                        sources: this.getSources(e)
                    }), this.player.on("ended", (() => {
                        this.playNext()
                    }))
                },
                getSources(e) {
                    let {
                        url: t,
                        type: s
                    } = e;
                    return [this.normalizeSource(t, s)]
                },
                normalizeSource(e, t) {
                    if (!t) {
                        const s = sf.videoPlayerHTML5.urlObject({
                            url: e
                        });
                        t = s.parameters.mime ? decodeURIComponent(s.parameters.mime) : -1 !== this.types.indexOf(sf.videoPlayerHTML5.getExtension(s.pathname)) ? sf.videoPlayerHTML5.getExtension(s.pathname) : "mp3"
                    }
                    return 0 !== t.indexOf("audio/") && (t = `audio/${t}`), {
                        src: e,
                        type: t
                    }
                },
                playNext() {
                    if (!this.continuousMode || !this.currentBtn) return;
                    const e = r(this.currentBtn).closest(".result-box").next(".result-box");
                    if (!e.length) return;
                    const t = e.find(`.${this.btnClass}`);
                    t.length && t.trigger("click")
                },
                switchOff() {
                    this.player && (this.player.pause(), this.player.dispose(), this.player = null), this.currentBoxId && (r(`#${this.currentBoxId}`).empty().hide(), this.currentBoxId = null), this.currentBtn && (r(this.currentBtn).removeClass("active"), this.currentBtn = null)
                }
            }
        },
        8812: function(e, t, s) {
            var r = s(2396);
            e.exports = {
                showRows(e, t) {
                    if (!e || "object" != typeof e || 0 === e.length) return;
                    sf.multi.validCount++;
                    let s = e[e.length - 1];
                    s.more ? (s = s.more, e.pop()) : s = null;
                    let r = 0;
                    for (let s = 0; s < e.length; s++) {
                        if (e[s].listItem = s, s === e.length - 1 && (e[s].listLastItem = !0), t && !e[s].hosting && (e[s].hosting = t), !e[s].extra) {
                            let t = {};
                            r++, t = 1 === r ? sf.promoBlock.get(e[s].hosting) : {}, e[s].extra = t
                        }
                        this.show(e[s], !1, !1)
                    }
                    s && s.url && s.id && sf.result.appendMoreBtn(!1, !1, s)
                },
                show(e, t) {
                    let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                        n = arguments.length > 3 ? arguments[3] : void 0;
                    if (!e || "object" != typeof e) return null;
                    sf.multi.validCount++;
                    let i = t ? r("#sf_multi_result .media-result").get(0) : r("#sf_result .media-result").get(0);
                    if (i || (i = sf.result.createBox(t)), !i) return null;
                    const o = r(r("#tplAudioBox").render({
                        thumb: e.thumb || "",
                        player: !(!e.player || !e.player.url)
                    }));
                    if (e.attr && (e.attr.class && (o.addClass(e.attr.class), delete e.attr.class), o.attr(e.attr)), e.hosting && o.attr("data-hid", e.hosting), sf.result.appendAllLinks(e.url, e.action, o.find(".link-box").get(0), e.meta && e.meta.title ? e.meta.title : "", !1, e.hosting), sf.result.appendMetaInfo(e.meta, o.find(".meta").get(0), ""), e.player && e.player.url) {
                        const t = `audio_player_${Date.now()}_${Math.round(1e4*Math.random())}_${r(".result-box").length}`;
                        o.find(".thumb-box .clip").on("click", (s => {
                            s.preventDefault(), sf.audioPlayerHTML5.toggle(e.player, t, r(s.currentTarget).find(`.${sf.audioPlayerHTML5.btnClass}`).get(0)), sf.result.sendResultStats("audio-player-click", e.hosting)
                        }))
                    }
                    return sf.result.postProcessResult(o), sf.result.execFunctions(e.fn, e), n || (s ? (o.css("display", "none"), o.appendTo(i), o.slideDown()) : o.appendTo(i), e.extra || t || (e.extra = sf.promoBlock.get(e.hosting)), e.extra && sf.result.appendExtraInfo(i, e.extra), sf.result.notifyResult(e, !1, t, o)), o.get(0)
                }
            }
        },
        6841: function(e, t, s) {
            var r = s(2396);
            e.exports = {
                apiPath: "/api/captcha",
                imagePath: "/captcha",
                workerTokenKey: "sfWorkerToken",
                dialogElementId: "output-captcha-dialog",
                dialog: null,
                getDialogTemplate(e, t) {
                    return `\n      <div id="${this.dialogElementId}" class="a11y-dialog" aria-hidden="true">\n        <div class="a11y-dialog-overlay"></div>\n        <div role="document" class="a11y-dialog-content captcha-dialog__document">\n          <div class="captcha-dialog__container">\n            <form class="captcha-dialog__form" onsubmit="sf.captcha.onDialogSubmit(event)" target="_blank">\n              <div class="captcha-dialog__img__ctr">\n                <img src="${e}" alt="Captcha"></div>\n              <div class="captcha-dialog__input__ctr">\n                <input type="hidden" name="hash" value="${t}">\n                <input type="text" name="val" autocomplete="off" required>\n              </div>\n              <button class="captcha-dialog__button " type="submit">${sf.lng.submit}</button>\n              <button class="captcha-dialog__close" type="button" data-a11y-dialog-hide="${this.dialogElementId}">${sf.lng.goBack}</button>\n            </form>\n          </div>\n        </div>\n      </div>\n    `
                },
                createDialog(e, t) {
                    this.dialog && this.destroyDialog(), r(this.getDialogTemplate(e, t)).appendTo(document.body), this.dialog = createA11yDialog({
                        element: document.querySelector(`#${this.dialogElementId}`),
                        hideCloseButton: !0
                    }), this.dialog.on("hide", (e => {
                        this.destroyDialog()
                    })), this.dialog.show()
                },
                destroyDialog() {
                    this.dialog && (this.dialog.destroy(), this.dialog = null), r(`#${this.dialogElementId}`).remove()
                },
                async onDialogSubmit(e) {
                    e.preventDefault(), e.stopPropagation();
                    const t = new Notyf;
                    try {
                        var s, r;
                        const e = document.querySelector(`#${this.dialogElementId} form`),
                            n = null == e || null === (s = e.elements) || void 0 === s || null === (s = s.hash) || void 0 === s ? void 0 : s.value,
                            i = null == e || null === (r = e.elements) || void 0 === r || null === (r = r.val) || void 0 === r ? void 0 : r.value,
                            {
                                result: o
                            } = await this.checkCaptcha(i, n);
                        return console.log("token: ", o), o ? (localStorage.setItem(this.workerTokenKey, o), t.success({
                            message: sf.lng.captchaSuccessMessage,
                            ripple: !1,
                            duration: 3e3
                        }), ga("send", "event", "getToken", "captcha", "success")) : ga("send", "event", "getToken", "captcha", "failure"), this.dialog.hide(), void this.destroyDialog()
                    } catch (e) {
                        _sf.debug && console.error(e), ga("send", "event", "getToken", "captcha", "error")
                    }
                    t.error({
                        message: sf.lng.captchaErrorMessage,
                        ripple: !1,
                        duration: 3e3
                    })
                },
                async getCaptcha() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e4;
                    const t = new AbortController,
                        s = t.signal;
                    setTimeout((() => {
                        t.abort()
                    }), e);
                    const r = await fetch(`https://${_sf.workerHost}${this.apiPath}?sf-nomad=1`, {
                        signal: s
                    });
                    if (!r.ok) throw new Error(`${r.status}: ${r.statusText}`);
                    return r.json()
                },
                async checkCaptcha(e, t) {
                    let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e4;
                    if (!e || !t) throw new Error("Missing required parameters");
                    const r = new AbortController,
                        n = r.signal;
                    setTimeout((() => {
                        r.abort()
                    }), s);
                    const i = new URLSearchParams({
                            value: e,
                            hash: t,
                            "sf-nomad": 1
                        }),
                        o = await fetch(`https://${_sf.workerHost}${this.apiPath}`, {
                            signal: n,
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: i.toString()
                        });
                    if (!o.ok) throw new Error(`${o.status}: ${o.statusText}`);
                    return o.json()
                },
                getCaptchaImage(e) {
                    const t = new URLSearchParams({
                        captcha: e,
                        "sf-nomad": 1
                    });
                    return `https://${_sf.workerHost}${this.imagePath}?${t.toString()}`
                },
                async showDialog() {
                    try {
                        const {
                            captcha: e,
                            hash: t
                        } = await this.getCaptcha();
                        return this.createDialog(this.getCaptchaImage(e), t), void ga("send", "event", "showDialog", "captcha", "success")
                    } catch (e) {
                        _sf.debug && console.error(e), ga("send", "event", "showDialog", "captcha", "error")
                    }(new Notyf).error({
                        message: "An error has occurred. Please try again.",
                        ripple: !1,
                        duration: 3e3
                    })
                }
            }
        },
        9531: function(e, t, s) {
            var r = s(3769)(s(9967));
            e.exports = {
                showPopup: function(e, t, s, n) {
                    const {
                        gaResource: i,
                        adsGaResource: o
                    } = n, a = (e, t) => {
                        window.gtag("event", e, t || void 0)
                    }, l = ["finished", "CONVERTED"], u = ["failed", "FAILED"], c = ["cancelled", "CANCELLED"], d = "c-ui-ads-data", p = function() {
                        let e = "";
                        return "Windows" === _sf.os.name ? e = "win" : "Mac OS" === _sf.os.name && (e = "mac"), e ? `https://televzr.com/download/?platform=${e}&uid=${_sf.stats.uid}&vid=718` : ""
                    }(), f = "Android" === _sf.os.name ? _sf.apk.getDownloadUrl() : "";
                    if ((() => {
                            if (!window.clickAds || "function" != typeof window.clickAds.startFlow || "function" != typeof window.clickAds.triggerAdClick || "function" != typeof window.clickAds.cancelFlow) return a("converter_popup_ads_core_missing", {
                                send_to: i
                            }), !1;
                            const e = window.clickAds.startFlow({
                                vidacha_type: "converter-ui"
                            });
                            if (!s) return window.clickAds.cancelFlow(e, "empty_ads_url"), !1;
                            const t = e => {
                                let {
                                    flow_id: t,
                                    frequencyCapValue: r,
                                    freqCap: n
                                } = e;
                                return !(!window.clickAds || "function" != typeof window.clickAds.triggerAdClick) && window.clickAds.triggerAdClick(s, {
                                    flow_id: t,
                                    vidacha_type: "converter-ui",
                                    frequencyCapValue: r,
                                    freqCap: n
                                })
                            };
                            let r = {
                                attempts: 0,
                                count: 0,
                                timestamp: Date.now()
                            };
                            const n = localStorage.getItem(d);
                            if (n ? r = JSON.parse(n) : localStorage.setItem(d, JSON.stringify(r)), Date.now() - r.timestamp < 864e5) {
                                if (r.count < 7) {
                                    if (r.attempts += 1, !t({
                                            flow_id: e,
                                            frequencyCapValue: r.count,
                                            freqCap: 7
                                        })) return;
                                    return r.count += 1, localStorage.setItem(d, JSON.stringify(r)), !(r.count % 2 == 0)
                                }
                                return window.clickAds.cancelFlow(e, "frequency_capped"), r.attempts += 1, localStorage.setItem(d, JSON.stringify(r)), !1
                            }
                            return r.attempts = 1, t({
                                flow_id: e,
                                frequencyCapValue: 0,
                                freqCap: 7
                            }) ? (r.count = 1, r.timestamp = Date.now(), localStorage.setItem(d, JSON.stringify(r)), !0) : void 0
                        })()) return;
                    let m = {},
                        h = "0";
                    if (document.getElementById("c-ui-popup")) return;
                    const g = document.createElement("div");
                    g.id = "c-ui-popup";
                    const v = "undefined" != typeof crypto && crypto.randomUUID ? crypto.randomUUID() : `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
                    let y = null,
                        w = () => {},
                        b = () => {};
                    const k = () => b();
                    window.addEventListener("pagehide", k);
                    const _ = () => {
                        b(), w(), window.removeEventListener("pagehide", k), g.remove()
                    };
                    g.addEventListener("click", (e => {
                        e.target === g && (a("converter_popup_close", {
                            send_to: i
                        }), _())
                    })), document.body.appendChild(g);
                    const x = e => {
                            m = e, l.includes(m.status) && a("converter_popup_success", {
                                send_to: i
                            }), u.includes(m.status) && a("converter_popup_fail", {
                                send_to: i,
                                er_msg: m.error
                            }), $()
                        },
                        C = () => {
                            if (a("converter_popup_download_click", {
                                    send_to: i
                                }), !window.open(m.downloadUrl, "_blank")) {
                                const e = document.createElement("a");
                                e.href = m.downloadUrl, e.target = "_blank", e.rel = "noopener noreferrer", e.download = "", e.classList.add("temporary-download-link"), document.body.appendChild(e), e.click(), e.remove()
                            }
                        },
                        $ = () => {
                            const e = l.includes(m.status),
                                s = u.includes(m.status),
                                n = c.includes(m.status),
                                o = s || n;
                            g.innerHTML = `\n      <div class="c-ui-popup">\n        <button class="c-ui-popup-btn-close" type="button">\n          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">\n            <g stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" opacity=".4">\n              <path d="M18 6 6 18M6 6l12 12"/>\n            </g>\n          </svg>\n        </button>\n        <div class="c-ui-popup-content">\n          <p class="c-ui-popup-title" style="${o?"color: #ff0000":""}">\n            ${e?"Your video is ready for downloading!":n?"Download cancelled":s?"Unable to download file":"Your video will be ready in a few minutes"}\n          </p>\n          ${e?'<p class="c-ui-popup-subtitle">Click on Download video button to download it</p>':n?'<p class="c-ui-popup-subtitle">The download was cancelled</p>':s?_sf.isPro?'<p class="c-ui-popup-subtitle">Something went wrong, please try download this file later</p>':p?`<p class="c-ui-popup-subtitle">Something went wrong.<br/>\n          Download this file with Televzr right now!</p>\n          <a href="${p}" class="c-ui-televzr-button" rel="nofollow" target="_blank">Download with Televzr</a>`:f?`<p class="c-ui-popup-subtitle">Something went wrong.<br/>\n          Download this file with our application right now!</p>\n          <a href="${f}" class="c-ui-apk-button" rel="nofollow">\n            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n              <path fill-rule="evenodd" clip-rule="evenodd"\n                    d="M13.7818 2.19368L14.8198 0.304878C14.8391 0.257889 14.8404 0.205433 14.8234 0.157549C14.8065 0.109665 14.7725 0.0697172 14.7279 0.0453507C14.6833 0.0209841 14.6313 0.0139107 14.5819 0.0254841C14.5324 0.0370575 14.4889 0.0664649 14.4598 0.108078L13.411 2.01608C12.4929 1.61214 11.5005 1.40451 10.4974 1.40648C9.45461 1.40648 8.46941 1.62368 7.5886 2.01368L6.53741 0.108078C6.5247 0.0842287 6.50738 0.0631417 6.48646 0.0460414C6.46553 0.0289411 6.44142 0.0161683 6.41552 0.00846482C6.38962 0.00076135 6.36244 -0.00171929 6.33557 0.00116696C6.30871 0.00405321 6.28268 0.0122488 6.25901 0.0252779C6.23516 0.0379842 6.21407 0.0553022 6.19697 0.0762261C6.17987 0.0971501 6.1671 0.121263 6.15939 0.147165C6.15169 0.173066 6.14921 0.20024 6.15209 0.227108C6.15498 0.253976 6.16318 0.280003 6.1762 0.303678L7.2154 2.19008C5.17541 3.23888 3.7954 5.23448 3.7966 7.52648L17.1958 7.52528C17.1958 5.23328 15.8206 3.24248 13.7818 2.19368ZM7.4482 5.10848C7.37461 5.1084 7.30176 5.09383 7.2338 5.06559C7.16583 5.03736 7.1041 4.99601 7.05212 4.94392C7.00014 4.89182 6.95892 4.83 6.93083 4.76198C6.90274 4.69396 6.88833 4.62107 6.8884 4.54748C6.88848 4.47389 6.90306 4.40103 6.93129 4.33307C6.95953 4.26511 7.00087 4.20337 7.05297 4.15139C7.10506 4.09941 7.16688 4.0582 7.2349 4.03011C7.30292 4.00202 7.37581 3.9876 7.44941 3.98768C7.59819 3.98768 7.74088 4.04678 7.84609 4.15199C7.9513 4.2572 8.01041 4.39989 8.01041 4.54868C8.01041 4.69746 7.9513 4.84016 7.84609 4.94537C7.74088 5.05057 7.59819 5.10968 7.44941 5.10968M17.1502 8.04008L17.1526 17.6545C17.1526 18.2317 16.8382 18.7309 16.375 19.0069C16.131 19.1556 15.8508 19.2345 15.565 19.2349L14.4802 19.2361V22.5169C14.48 22.7374 14.4307 22.955 14.3359 23.1541C14.241 23.3531 14.1031 23.5286 13.9319 23.6676C13.7608 23.8067 13.5609 23.9058 13.3467 23.958C13.1324 24.0101 12.9093 24.0138 12.6934 23.9689C12.359 23.9001 12.0584 23.7183 11.8421 23.4542C11.6258 23.19 11.5069 22.8595 11.5054 22.5181V19.2361H9.49541V22.5181C9.49477 22.9116 9.33793 23.2887 9.05936 23.5666C8.78079 23.8445 8.40329 24.0004 8.00981 24.0001C7.61662 23.9995 7.23966 23.8432 6.9613 23.5655C6.68293 23.2878 6.52579 22.9113 6.5242 22.5181V19.2361H5.443C4.8178 19.2361 4.2826 18.8761 4.02461 18.3529C3.91481 18.1368 3.85687 17.8981 3.8554 17.6557L3.853 8.04368L17.1502 8.04008ZM1.7878 7.76408C2.6086 7.76408 3.2758 8.42768 3.2758 9.24488V15.4489C3.2758 15.5505 3.2658 15.6501 3.2458 15.7477C3.19648 15.9855 3.08958 16.2077 2.93447 16.3946C2.77936 16.5816 2.58077 16.7277 2.3561 16.82C2.13143 16.9124 1.88753 16.9483 1.64577 16.9245C1.40402 16.9007 1.17178 16.8181 0.969405 16.6837C0.764047 16.5494 0.595389 16.3661 0.478686 16.1503C0.361983 15.9345 0.300915 15.693 0.301005 15.4477L0.299805 9.24488C0.299805 8.42888 0.965805 7.76408 1.7878 7.76408ZM19.2118 7.76288C20.0326 7.76288 20.6998 8.42528 20.6998 9.24368V15.4465C20.6998 16.2661 20.0338 16.9285 19.213 16.9285C18.391 16.9285 17.725 16.2661 17.725 15.4465V9.24248C17.725 8.42408 18.3898 7.76048 19.2106 7.76168M13.5478 3.99008C13.6235 3.98657 13.6991 3.99845 13.7701 4.02501C13.8411 4.05156 13.9059 4.09223 13.9607 4.14455C14.0155 4.19688 14.0592 4.25978 14.089 4.32945C14.1188 4.39911 14.1341 4.4741 14.1341 4.54988C14.1341 4.62565 14.1188 4.70064 14.089 4.77031C14.0592 4.83998 14.0155 4.90288 13.9607 4.9552C13.9059 5.00753 13.8411 5.0482 13.7701 5.07475C13.6991 5.1013 13.6235 5.11318 13.5478 5.10968C13.4721 5.11318 13.3965 5.1013 13.3255 5.07475C13.2545 5.0482 13.1897 5.00753 13.1349 4.9552C13.0801 4.90288 13.0365 4.83998 13.0067 4.77031C12.9768 4.70064 12.9615 4.62565 12.9615 4.54988C12.9615 4.4741 12.9768 4.39911 13.0067 4.32945C13.0365 4.25978 13.0801 4.19688 13.1349 4.14455C13.1897 4.09223 13.2545 4.05156 13.3255 4.02501C13.3965 3.99845 13.4721 3.98657 13.5478 3.99008Z"\n                    fill="white"/>\n            </svg>\n            Download with app</a>`:'<p class="c-ui-popup-subtitle">Something went wrong, try download this file later</p>':'<p class="c-ui-popup-subtitle">Please do not close this page until the download starts</p>'}\n          </p>\n          ${e?`\n            <button class="c-ui-download-button" type='button' data-type="${m.format}" data-quality="${m.quality}">Download video</button>\n          `:o?"":`\n            <div class="c-ui-progress-bar" style="background-color: #d6f3c5">\n              <div class="c-ui-progress" style="width: ${h}%; background-color: #85e34b"></div>\n            </div>\n            <p class="c-ui-progress-text">\n              ${0===Object.keys(m).length?"Starting...":m.step?`Step ${m.step}: ${m.stepLabel}`:m.status}\n            </p>\n          `}\n          <div class="c-ui-video-info">\n            ${Object.keys(m).length?`\n              <img src="${m.thumb}" alt="${m.title}" class="c-ui-video-thumbnail" />\n              <div class="c-ui-video-details">\n                <p class="c-ui-video-title">${m.title}</p>\n                ${m.duration?`<p class="c-ui-video-duration">${(e=>{const t=e%60;return`${Math.floor(e/60)}:${t<10?`0${t}`:t}`})((0,r.default)(m.duration))}</p>`:""}\n                <div class="c-ui-video-quality">\n                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="24" fill="none">\n                    <path fill=${t} d="M5.6 0A5.605 5.605 0 0 0 0 5.6v12.8C0 21.488 2.512 24 5.6 24h20.8c3.089 0 5.6-2.512 5.6-5.6V5.6C32 2.511 29.49 0 26.4 0H5.6Zm0 1.6h20.8c2.23 0 4 1.77 4 4v12.8c0 2.23-1.77 4-4 4H5.6c-2.23 0-4-1.77-4-4V5.6c0-2.23 1.77-4 4-4Zm6.8 5.2v10.4L22 12l-9.6-5.2Z" />\n                  </svg>\n                  ${m.format.toUpperCase()} ${m.quality}\n                </div>\n              </div>\n            `:""}\n          </div>\n        </div>\n      </div>\n    `;
                            const d = document.querySelector(".c-ui-download-button");
                            d && (d.addEventListener("click", C), d.style.backgroundColor = t);
                            const v = document.querySelector(".c-ui-video-quality");
                            v && (v.style.color = t);
                            const y = document.querySelector(".c-ui-popup-btn-close");
                            y && y.addEventListener("click", (() => {
                                a("converter_popup_close", {
                                    send_to: i
                                }), _()
                            }))
                        },
                        S = new URL(e);
                    S.searchParams.append("popup", "true");
                    let P = S.origin;
                    P = P.includes("test") ? "https://du-test.sf-converter.com" : "https://du.sf-converter.com", b = () => {
                        if (y && !(l.includes(m.status) || u.includes(m.status) || c.includes(m.status))) try {
                            navigator.sendBeacon(`${P}/tasks/${y}/cancel?v=${v}`)
                        } catch (e) {}
                    };
                    const I = cookie.get("user_jwt"),
                        T = {};
                    I && (T.Authorization = "Bearer " + I), fetch(S.toString(), {
                        headers: T
                    }).then((e => e.json())).then((e => {
                        if (e.taskId) {
                            y = e.taskId, fetch(`${P}/tasks/${y}/touch?v=${v}`, {
                                method: "POST",
                                headers: T
                            }).catch((() => {}));
                            let t = !1,
                                s = null;
                            const n = 5;
                            let i = 0;
                            w = () => {
                                t = !0, clearTimeout(s)
                            };
                            const o = async () => {
                                var e;
                                if (!t) try {
                                    const n = await fetch(`${P}/tasks/${y}/status?v=${v}`, {
                                        headers: T
                                    });
                                    if (!n.ok) throw new Error(`HTTP ${n.status}`);
                                    const i = await n.json();
                                    if (t) return;
                                    if (x(i), e = (e => {
                                            if (void 0 !== e.progress && null !== e.progress && "" !== e.progress) return (0, r.default)(e.progress).toString();
                                            let t = 0;
                                            return void 0 !== e.downloadProgress && (0, r.default)(e.downloadProgress) < 100 ? t = (0, r.default)(e.downloadProgress) : void 0 !== e.convertProgress && e.convertProgress && (t = (0, r.default)(e.convertProgress)), t ? t.toString() : h
                                        })(i), h = e, $(), l.includes(i.status) || u.includes(i.status) || c.includes(i.status)) return;
                                    s = setTimeout(o, 2e3)
                                } catch (e) {
                                    console.error("Polling error", e), ++i < n ? s = setTimeout(o, 5e3) : x({ ...m,
                                        status: "failed",
                                        error: e.message
                                    })
                                }
                            };
                            o()
                        }
                        var t;
                        e.meta ? (x({
                            status: "Starting...",
                            title: e.meta.title,
                            thumb: e.meta.thumb,
                            duration: e.meta.duration,
                            format: e.meta.format,
                            quality: e.meta.quality
                        }), a("converter_popup_open", {
                            send_to: i,
                            with_dl_url: !1
                        })) : (x({
                            status: e.task.status,
                            downloadUrl: e.task.downloadUrl,
                            thumb: e.task.thumb,
                            title: e.task.title,
                            duration: null === (t = e.task) || void 0 === t ? void 0 : t.duration,
                            format: e.task.format,
                            quality: e.task.quality
                        }), a("converter_popup_open", {
                            send_to: i,
                            with_dl_url: !0
                        })), $()
                    })).catch((e => {
                        console.error("Converter UI fetch error", e), x({
                            status: "failed",
                            error: e.message
                        })
                    }))
                }
            }
        },
        9733: function(e) {
            e.exports = {
                set(e, t, s, r) {
                    let n = new Date;
                    s && "number" == typeof s && n.setDate(n.getDate() + s), e = encodeURIComponent(e), t = t ? encodeURIComponent(t) : "", r = r || "", n = n.toUTCString(), document.cookie = `${e}=${t}; domain=${r}; path=/; expires=${n}`
                },
                get(e) {
                    const t = `${e}=`,
                        s = document.cookie.indexOf(t);
                    if (-1 === s) return null;
                    let r = document.cookie.indexOf(";", s + t.length);
                    return -1 === r && (r = document.cookie.length), unescape(document.cookie.substring(s + t.length, r))
                },
                del(e, t) {
                    const s = new Date(Date.now() - 1e11).toUTCString();
                    t = t || "", document.cookie = `${e}=; domain=${t}; path=/; expires=${s}`
                }
            }
        },
        5984: function(e, t, s) {
            var r = s(2396);
            e.exports = {
                showMessage(e, t) {
                    const s = sf.getElement("sf_result");
                    s && r(s).empty().append(r("#tplMessageBox").render({
                        message: e,
                        theme: t || ""
                    }))
                },
                showError(e) {
                    this.showMessage(e || "linkNotFound", "error")
                },
                getServiceClass(e) {
                    return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "icon-") + e.replace(/[^\w-]/g, "_")
                },
                show(e) {
                    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                        s = arguments.length > 2 ? arguments[2] : void 0;
                    if (!e || "object" != typeof e || e.error) return this.showError(e && e.error), null;
                    let n = r("#sf_result .file-result").get(0);
                    if (n || (n = sf.result.createBox(!1, "file-result")), !n) return null;
                    const i = r(r("#tplFileBox").render({
                        thumb: e.service ? this.getServiceClass(e.service, "") : ""
                    }));
                    return e.hosting && i.attr("data-hid", e.hosting), sf.result.appendAllLinks(e.url, e.action, i.find(".link-box").get(0), "", !1, e.hosting), e.meta && (!e.meta.size && e.size && (e.meta.size = e.size), sf.result.appendMetaInfo(e.meta, i.find(".meta").get(0), "")), sf.result.postProcessResult(i), sf.result.execFunctions(e.fn, e), s || (t ? (i.css("display", "none"), i.appendTo(n), i.slideDown()) : i.appendTo(n), e.extra && sf.result.appendExtraInfo(n, e.extra)), i.get(0)
                }
            }
        },
        5879: function(e, t, s) {
            window.sf = s(7900), sf.cookie = s(9733), sf.result = s(5702), sf.captcha = s(6841), sf.videoResult = s(5361), sf.audioResult = s(8812), sf.multi = s(9994), sf.fileResult = s(5984), sf.audioPlayerHTML5 = s(638), sf.videoPlayerHTML5 = s(9149), sf.promoBlock = s(4603), sf.converterUI = s(9531)
        },
        9994: function(module, __unused_webpack_exports, __webpack_require__) {
            var $ = __webpack_require__(2396);
            module.exports = {
                links: null,
                validCount: 0,
                queueSize: 5,
                queueCount: 0,
                timer: 0,
                timeout: 3e4,
                limit: null,
                retry: 0,
                set(e, t) {
                    let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                    clearTimeout(this.timer), this.retry = s, e && (1 !== e.length ? (this.validCount = 0, this.queueCount = 0, this.links = e, this.limit = t || null, this.processNextLink()) : sf.processLink(e[0], s))
                },
                processNextLink(e) {
                    if (clearTimeout(this.timer), e && e.parentNode.removeChild(e), !this.links || this.links.length <= 0) {
                        if (this.limit && this.limit.message) {
                            if (this.queueCount > 0) return void this.endQueue();
                            this.showLimitMessage()
                        }
                        return void this.endProcessing()
                    }
                    if (this.queueCount === this.queueSize) return void this.endQueue();
                    const t = $("#sf_multi_form_box");
                    if (!t.length) return;
                    t.empty();
                    const s = sf.createElement("form", {
                            action: "/savefrom.php",
                            method: "POST",
                            target: "sf_frame"
                        }),
                        r = this.links.shift();
                    sf.append(s, "input", {
                        type: "hidden",
                        id: "sf_url",
                        name: "sf_url",
                        value: r
                    }), sf.append(s, "input", {
                        type: "hidden",
                        id: "sf_submit",
                        name: "sf_submit",
                        value: "Download"
                    }), sf.append(s, "input", {
                        type: "hidden",
                        name: "new",
                        value: "2"
                    }), sf.append(s, "input", {
                        type: "hidden",
                        name: "sf_multi",
                        value: "1"
                    }), sf.append(s, "input", {
                        type: "hidden",
                        name: "retry",
                        value: this.retry
                    }), t.append(s), sf.preSubmitForm(r, null, !1, !1) && (s.submit(), this.timer = setTimeout((() => {
                        sf.multi.show(null)
                    }), this.timeout))
                },
                endQueue() {
                    this.queueCount = 0, sf.removeBusyIndicator(), $('#sf_multi_form input[name="sf_url"]').val(""), $("#sf_multi_result .media-result").append(`<div class="link-plus"><a href="#" class="action" onclick="sf.multi.processNextLink(this); return false;">${sf.lng.multiMore}</a></div>`)
                },
                showLimitMessage() {
                    this.limit.message && $("#sf_multi_result .media-result").append(`<div class="center medium spacer1">${this.limit.message}</div>`), this.limit = null
                },
                endProcessing() {
                    if (this.validCount < 1) {
                        const e = sf.getElement("sf_result");
                        e && $(e).empty().append(sf.createElement("div", {
                            class: "center"
                        }, null, sf.lng.linkNotFound))
                    }
                    this.validCount = 0, this.queueCount = 0, this.limit = null, sf.removeBusyIndicator(), $('#sf_multi_form input[name="sf_url"]').val("")
                },
                show(info, audio, simple) {
                    clearTimeout(this.timer);
                    let json = null;
                    if (info)
                        if ("object" == typeof info) json = info;
                        else {
                            try {
                                json = JSON.parse(info)
                            } catch (e) {}
                            json && json.url || (json = eval(`(${info})`))
                        }
                    json && json.url ? (this.validCount++, simple || this.queueCount++, audio ? sf.audioResult.show(json, !0) : sf.videoResult.show(json, !0), this.processNextLink()) : this.processNextLink()
                }
            }
        },
        4603: function(e, t, s) {
            var r = s(2396);
            class n {
                constructor(e, t, s, r, n, i) {
                    this.params = e, this.href = t, this.href2 = s, this.service = r, this.query = n, this.fileId = i
                }
                getParams() {
                    if (!this.href || !this.service) return null;
                    const e = this.params || {},
                        t = sf.promoBlock.getServiceStatsName(this.service),
                        s = sf.promoBlock.getServiceName(this.service);
                    let n = this.href;
                    if (this.query.vid || this.query.utm_campaign) {
                        const s = {
                            vid: "",
                            utm_source: "savefrom",
                            utm_medium: "vidacha",
                            utm_campaign: "new_design",
                            utm_content: `${t}-promo`
                        };
                        this.fileId && e.fileIdParam && (e.fileIdFormat && (this.fileId = e.fileIdFormat(this.fileId, t)), s[e.fileIdParam] = this.fileId);
                        const i = this.query ? r.extend(s, this.query) : s;
                        n = this.href.replace(/\?$/g, ""), n += (n.indexOf("?") > -1 ? "&" : "?") + r.param(i)
                    }
                    const i = e.event_prefix || "promo";
                    let o = e.eventAttr;
                    if (o || (o = null === o ? "" : `send;event;vidacha;${i}-click;${t}`), e.html) "string" == typeof e.html && (e.html = r(e.html));
                    else {
                        let t = e.template || "tplPromoBox"; - 1 === t.search(/[^\w-]/) && (t = `#${t}`);
                        const i = r.templates(t);
                        e.html = r(i.render({
                            offer: e.name,
                            offer_icon: e.icon,
                            href: n,
                            href2: this.href2 || "",
                            event_attr: o,
                            service: s,
                            install_btn: e.install_btn || ""
                        }))
                    }
                    const a = {
                        attr: {
                            class: e.simple ? "" : "promo click-box",
                            "data-href": n,
                            "data-ga-event": o
                        },
                        delay: 100,
                        html: e.html
                    };
                    return e.className && (a.attr.class += ` ${e.className}`), e.callback && e.callback(), a
                }
            }
            e.exports = {
                disabled: !1,
                serviceName: {
                    "dailymotion.com": "Dailymotion",
                    "facebook.com": "Facebook",
                    "mail.ru": "Mail.ru",
                    "video.mail.ru": "Mail.ru",
                    "rutube.ru": "Rutube.ru",
                    "vk.com": "VK.com",
                    "vimeo.com": "Vimeo",
                    "youtube.com": "YouTube",
                    101: "YouTube",
                    "cdninstagram.com": "Instagram",
                    all: () => sf.lng.allSites
                },
                productParams: {},
                defaultProductParamsForErrors: {
                    helper: {
                        active: !0,
                        href: "/user.php",
                        name: "SaveFrom.net Helper",
                        icon: "/img/extension/icon_32.png",
                        vid: "312",
                        utmCampaign: "sf_helper",
                        eventPrefix: "helper-promo",
                        className: "sf-helper",
                        installBtn: "installHelper",
                        template: "tplHelperSimplePromoBox",
                        simple: !0,
                        services: {
                            exclude: ["rutube.ru"]
                        },
                        os: {
                            include: ["Windows", "Mac OS", "Linux", "Arch", "CentOS", "Chromium OS", "Fedora", "FreeBSD", "Debian", "Gentoo", "Mandriva", "Mageia", "Mint", "Ubuntu", "SUSE"]
                        },
                        browser: {
                            exclude: ["IE", "Yandex"],
                            include: ["Firefox", "Mozilla", "Chrome", "Chromium", "Iron", "Safari", "Opera", "Edge"]
                        },
                        isExists() {
                            return !!sf.extension.id
                        },
                        isAllowed(e) {
                            return !sf.extension.id
                        }
                    }
                },
                getServiceStatsName(e) {
                    return !e || "string" != typeof e && "number" != typeof e ? "" : String(e).toLowerCase().replace(/^([\w.-]+).*$/g, "$1")
                },
                getServiceName(e) {
                    return e ? this.serviceName[e] && "function" == typeof this.serviceName[e] ? this.serviceName[e]() : this.serviceName[e] || e : ""
                },
                getProductBlock(e, t, s, r, i) {
                    if (!e || !this.productParams[e]) return null;
                    const o = this.productParams[e];
                    if (!1 === o.active) return null;
                    if (!0 !== this.checkSample(o)) return null;
                    (s = s || {}).vid || (s.vid = o.vid), void 0 === s.utm_campaign && (s.utm_campaign = o.utmCampaign), r || (r = "function" == typeof o.href ? o.href() : o.href);
                    const a = o.href2,
                        l = {
                            name: o.name,
                            icon: o.icon,
                            id: e,
                            query: s,
                            event_prefix: o.eventPrefix,
                            className: o.className,
                            simple: o.simple || !1,
                            eventAttr: o.eventAttr,
                            callback: o.callback
                        };
                    return o.installBtn && sf.lng[o.installBtn] && (l.install_btn = sf.lng[o.installBtn]), o.html ? l.html = o.html : o.template && (l.template = o.template), o.fileIdParam && (l.fileIdParam = o.fileIdParam, o.fileIdFormat && (l.fileIdFormat = o.fileIdFormat)), new n(l, r, a, t, s, i)
                },
                checkProductName(e, t) {
                    if (!e || !t || !this.productParams[e]) return !1;
                    const s = this.productParams[e];
                    if (!1 === s.active) return !1;
                    if (s.isExists && s.isExists()) return !1;
                    if (s.services) {
                        if (s.services.include && -1 === s.services.include.indexOf(t)) return !1;
                        if (s.services.exclude && -1 !== s.services.exclude.indexOf(t)) return !1
                    }
                    if (s.os && _sf.os.name) {
                        if (s.os.include && -1 === s.os.include.indexOf(_sf.os.name)) return !1;
                        if (s.os.exclude && -1 !== s.os.exclude.indexOf(_sf.os.name)) return !1
                    }
                    if (s.browser && _sf.browser.name) {
                        if (s.browser.include && -1 === s.browser.include.indexOf(_sf.browser.name)) return !1;
                        if (s.browser.exclude && -1 !== s.browser.exclude.indexOf(_sf.browser.name)) return !1
                    }
                    if (s.lang && _sf.lang) {
                        if (s.lang.include && -1 === s.lang.include.indexOf(_sf.lang)) return !1;
                        if (s.lang.exclude && -1 !== s.lang.exclude.indexOf(_sf.lang)) return !1
                    }
                    return !s.isAllowed || s.isAllowed(t)
                },
                selectProductName(e, t) {
                    const s = [];
                    for (const r in this.productParams)
                        if (Object.prototype.hasOwnProperty.call(this.productParams, r) && this.checkProductName(r, e)) {
                            if (!t) return r;
                            s.push(r)
                        }
                    return t ? s : ""
                },
                checkSample(e) {
                    if (e.showSample) {
                        const t = e.showSample[0],
                            s = e.showSample[1],
                            r = cookie.get("promoBlock");
                        return t <= r && r <= s
                    }
                    return !0
                },
                getBlock(e, t) {
                    if (this.disabled) return null;
                    let s = this.getServiceStatsName(e);
                    this.serviceName[s] || (s = "all");
                    const r = this.selectProductName(s, !0);
                    if (!r.length) return null;
                    if (1 === r.length) return this.getProductBlock(r[0], s, null, "", t);
                    if (-1 !== r.indexOf("yandexBrowser")) return this.getProductBlock("yandexBrowser", s, null, "", t);
                    if (r.length >= 2) {
                        for (let e = 0; e < r.length; e++)
                            if (this.productParams[r[e]].showSample && this.checkSample(this.productParams[r[e]])) return this.getProductBlock(r[e], s, null, "", t);
                        return this.getProductBlock(r[0], s, null, "", t)
                    }
                    return this.getProductBlock(r[0], s, null, "", t)
                },
                get(e, t) {
                    if (this.disabled) return null;
                    const s = this.getBlock(e, t);
                    return s ? s.getParams() : null
                },
                getServiceByHost(e) {
                    if (!e) return "";
                    if (e = e.toLowerCase(), this.serviceName[e]) return e;
                    let t = e.split(".");
                    if (t.length < 3) return "";
                    for (t = t.slice(-3), e = t.pop(); t.length;)
                        if (e = `${t.pop()}.${e}`, this.serviceName[e]) return e;
                    return ""
                },
                getServiceByUrl(e) {
                    const t = sf.parseUrl(e, "host");
                    return t ? this.getServiceByHost(t) : null
                },
                getBlockByUrl(e) {
                    if (this.disabled) return null;
                    const t = this.getServiceByUrl(e);
                    return t ? this.getBlock(t) : null
                }
            }
        },
        5702: function(e, t, s) {
            var r = s(2396),
                n = s(3769)(s(9967));
            e.exports = {
                filterCallback: null,
                resultCallbacks: [],
                failCallbacks: [],
                mediaQuality: {
                    regExp: [/^(\d+)(?:p|i|\s|$)/i, /\d+\s*x\s*(\d+)/i],
                    map: {
                        low: 2,
                        medium: 3,
                        high: 5,
                        mobile: 3,
                        sd: 4,
                        hq: 5,
                        hd: 6,
                        "4k": 2160,
                        "8k": 4320
                    },
                    typePriority: {
                        mp4: 10,
                        webm: 9,
                        flv: 8,
                        "3gp": 7
                    },
                    compareLinks(e, t) {
                        return e.priority !== t.priority ? t.priority - e.priority : e.quality || t.quality ? t.quality - e.quality : 0
                    },
                    filterDuplicates(e) {
                        if (!Array.isArray(e)) return;
                        const t = ["av01", "vp9", "avc1"],
                            s = {};
                        for (const r of e) {
                            const e = r.no_audio ? "noaudio" : "audio",
                                n = `${r.ext}_${r.quality}_${e}`,
                                i = s[n];
                            if (!i) {
                                s[n] = r;
                                continue
                            }
                            const o = -1 === t.indexOf(i.videoCodec) ? 1 / 0 : t.indexOf(i.videoCodec);
                            (-1 === t.indexOf(r.videoCodec) ? 1 / 0 : t.indexOf(r.videoCodec)) < o && (s[n] = r)
                        }
                        e.length = 0, e.push(...Object.values(s))
                    },
                    sortLinks(e) {
                        e && Array.isArray(e) && (this.setLinkQuality(e), this.setLinkPriority(e), this.filterDuplicates(e), e.sort(this.compareLinks))
                    },
                    setLinkQuality(e) {
                        if (e && Array.isArray(e))
                            for (let t = 0; t < e.length; t++) e[t].quality ? e[t].quality = this.strToInt(e[t].quality) : e[t].subname ? e[t].quality = this.strToInt(e[t].subname) : e[t].quality = 1
                    },
                    setLinkPriority(e) {
                        if (e && Array.isArray(e))
                            for (let t = 0; t < e.length; t++)
                                if (void 0 === e[t].priority && e[t].type) {
                                    let s = 0;
                                    if ("string" == typeof e[t].type) {
                                        const r = e[t].type.toLowerCase();
                                        this.typePriority[r] && (s = this.typePriority[r])
                                    }
                                    e[t].priority = s
                                }
                    },
                    strToInt(e) {
                        if (!e) return 1;
                        if ("number" == typeof e) return e;
                        let t = e;
                        if ("string" != typeof t) {
                            if (!t.toString) return 1;
                            t = t.toString()
                        }
                        if (t = t.toLowerCase(), this.map[t]) return this.map[t];
                        for (let e = 0; e < this.regExp.length; e++) {
                            const s = t.match(this.regExp[e]);
                            if (s) return (0, n.default)(s[1])
                        }
                        for (const e in this.map)
                            if (0 === t.indexOf(this.map[e])) return this.map[e];
                        return 1
                    }
                },
                createBox(e, t) {
                    const s = r(e ? "#sf_multi_result" : "#sf_result");
                    if (!s.length) return null;
                    const n = sf.createElement("div", {
                        class: t || "media-result"
                    });
                    return s.append(n), n
                },
                show(e, t) {
                    let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                        n = arguments.length > 3 ? arguments[3] : void 0;
                    if (!e) return null;
                    let i = "";
                    if ("string" == typeof e ? i = e : "object" == typeof e && (i = e.html || e.text), !i) return null;
                    const o = !!e.video || "video" === e.content_type,
                        a = this.getResponseMessage(e, o);
                    let l = null,
                        u = "result-box simple center";
                    const c = !1 === e.success;
                    a && (i = a, u += " warning", sf.promoBlock && !sf.promoBlock.disabled && (!0 === e.noOffer || _sf.isPro || (l = this.getResponseMessageOffer(e.hosting, o))));
                    let d = r("#sf_result .file-result").get(0);
                    if (d || (d = sf.result.createBox(!1, "file-result")), !d) return null;
                    const p = e.attr || {};
                    p.class ? p.class += ` ${u}` : p.class = u, c && (p.class += " result-failure");
                    const f = r(sf.createElement("div", p, null, i));
                    return e.hosting && f.attr("data-hid", e.hosting), l && f.append(l), sf.result.execFunctions(e.fn, e), n || (s ? (f.css("display", "none"), f.appendTo(d), f.slideDown()) : f.appendTo(d), e.extra || t || a || (e.extra = sf.promoBlock.get(e.hosting)), e.extra && (c && (e.extra.attr = e.extra.attr || {}, e.extra.attr.class ? e.extra.attr.class += " result-failure" : e.extra.attr.class = "result-failure"), sf.result.appendExtraInfo(d, e.extra)), sf.result.notifyResult(e, !1, t, f)), f.get(0)
                },
                getResponseMessage(e, t) {
                    if (!e.response_type || !sf.lng.errorMessages) return "";
                    const s = e.response_type;
                    if (!sf.lng.errorMessages[s]) return "";
                    let r = e.hosting;
                    if (!r) return "";
                    r = sf.promoBlock.getServiceName(r);
                    let n = sf.lng.errorMessages[s];
                    return t && sf.lng.errorMessages[`video:${s}`] && (n = sf.lng.errorMessages[`video:${s}`]), n += this.getTryAnotherMessage(s, t), n = n.replace(/{service}/g, r), n
                },
                getResponseMessageOffer(e, t) {
                    let s = null;
                    if (!Object.assign || sf.promoBlock.productParams && 0 !== Object.keys(sf.promoBlock.productParams).length) s = sf.promoBlock.getBlock(e);
                    else try {
                        const t = Object.assign({}, sf.promoBlock);
                        t.disabled = !1, t.productParams = t.defaultProductParamsForErrors, s = t.getBlock(e)
                    } catch (e) {
                        _sf.debug && console.error(error)
                    }
                    if (!(s && s.params && s.params.id && s.params.name)) return "";
                    let r = t ? sf.lng["video:offer"] : sf.lng.offer;
                    r = r.replace(/{service}/g, "{{:service}}").replace(/{offer}/g, '<a href="{{:href}}" class="ga_track_events bold" target="_blank" data-ga-event="{{:event_attr}}">{{:offer}}</a>'), s.params.template = `<div class="center"><img src="{{:offer_icon}}" alt="">&nbsp;${r}</div>`;
                    const n = s.getParams().html;
                    return n && n.get(0) ? n : void 0
                },
                getTryAnotherMessage(e, t) {
                    return "page not found" === e || "restricted access" === e ? t ? sf.lng["video:tryAnother"] : sf.lng.tryAnother : ""
                },
                showEmptyResult(e, t, s, r) {
                    let n = !1;
                    return "string" == typeof e ? e = {
                        html: e
                    } : "object" == typeof e && e.supported_resource && (n = e.supported_resource), n || (e.attr = e.attr || {
                        class: ""
                    }, e.attr.class && (e.attr.class += " "), e.attr.class += "unsupported"), this.notifyFailCallback(e, t, s, r), this.show(e, t, s, r)
                },
                addFailCallback(e) {
                    "function" == typeof e && this.failCallbacks.push(e)
                },
                notifyFailCallback() {
                    const e = arguments;
                    this.failCallbacks.forEach((function(t) {
                        t.apply(this, e)
                    }))
                },
                appendLink(e, t, s, n, i) {
                    if (!t || !e.name && !e.text_url) return null;
                    e.attr || (e.attr = {}), !e.url && e.text_url && (e.url = "#", e.attr["data-copy"] = e.text_url), e.url && s && !e.attr.download && !e.no_download && -1 === e.url.search(/savefrom\.net\//i) && (e.attr.download = e.ext ? `${sf.modifyTitle(s)}.${e.ext}` : sf.modifyTitle(s));
                    let o = null;
                    if (e.name) {
                        o = sf.append(t, e.url ? "a" : "span", e.attr, null, e.name);
                        const s = r(o);
                        s.addClass("link"), e.quality && s.attr("data-quality", e.quality);
                        const n = /^(twitter\.com|x\.com|tw)$/,
                            a = r(t).closest(".result-box").attr("data-hid") || "",
                            l = String(r("#sf_url").val() || "");
                        if ((n.test(i) || n.test(a) || /twitter\.com|t\.co|x\.com/.test(l)) && (s.attr("rel", "noreferrer"), s.attr("target", "_blank")), e.type && s.attr("data-type", e.type), e.url && (e.isConverterUI ? (o.href = "#/convert", s.on("click", (t => {
                                var s, r;
                                t.preventDefault(), t.stopPropagation();
                                const n = "G-R1P8SYKKYC";
                                window.gtag && window.gtag("event", "converter_link_click", {
                                    send_to: n
                                });
                                const i = window.clickAds;
                                sf.converterUI.showPopup(e.url, "#7ed338", i ? null == i || null === (s = i.getAdsUrl) || void 0 === s ? void 0 : s.call(i, null === (r = i.banner) || void 0 === r ? void 0 : r.urls) : "", {
                                    gaResource: n,
                                    adsGaResource: "G-YZBZRGCYS9"
                                })
                            }))) : e.url.indexOf(sf.linksListToken) > -1 ? (o.href = "#", s.on("click", (t => {
                                t.preventDefault(), t.stopPropagation(), sf.processLink(e.url)
                            }))) : (o.href = e.url, s.addClass("link-download"))), !1 === e.downloadable && s.addClass("no-downloadable"), e.subname && (s.addClass("subname"), o.appendChild(document.createTextNode(" ")), sf.append(o, "span", {
                                class: "subname"
                            }, null, e.subname)), i && !_sf.app) {
                            const e = sf.newMain ? "resultNew" : "result";
                            s.addClass("ga_track_events").attr("data-ga-event", `send;event;${e};click;${i}`)
                        }
                        if (e.bind && "object" == typeof e.bind)
                            for (const t in e.bind) Object.prototype.hasOwnProperty.call(e.bind, t) && e.bind[t].fn && s.on(t, (s => {
                                !1 !== e.bind[t].preventDefault && s.preventDefault(), !1 !== e.bind[t].stopPropagation && s.stopPropagation(), new Function(e.bind[t].fn)()
                            }))
                    }
                    return o
                },
                appendAction(e, t, s, n) {
                    if (!t || !e.name || !e.attr && !e.bind) return null;
                    e.attr ? e.attr.href || (e.attr.href = "#") : e.attr = null;
                    const i = sf.append(t, "a", e.attr, null, e.name),
                        o = r(i);
                    if (o.addClass("link"), o.attr("data-copy") && (o.addClass("link-download"), n && !_sf.app && o.addClass("ga_track_events").attr("data-ga-event", `send;event;result;click;${n}`)), e.subname && (r(i).addClass("subname"), i.appendChild(document.createTextNode(" ")), sf.append(i, "span", {
                            class: "subname"
                        }, null, e.subname)), e.bind && "object" == typeof e.bind)
                        for (const t in e.bind) Object.prototype.hasOwnProperty.call(e.bind, t) && e.bind[t].fn && o.on(t, (s => {
                            !1 !== e.bind[t].preventDefault && s.preventDefault(), !0 === e.bind[t].stopPropagation && s.stopPropagation(), new Function(e.bind[t].fn).call(s.currentTarget)
                        }));
                    return i
                },
                appendAllLinks(e, t, s, n, i, o) {
                    if (!e || "object" != typeof e || 0 === e.length || !s) return;
                    let a;
                    sf.result.mediaQuality.sortLinks(e), this.filterLinks(e, t, n, i, o);
                    let l = r(s).find(".list .main").get(0),
                        u = _sf.mobile ? null : r(s).find(".second-btn-box").get(0),
                        c = l;
                    u && "" === r(u).css("content") && (u = null);
                    for (let t = 0; t < e.length; t++)(e[t].name || e[t].text_url) && (a || e[t].disabled ? e[t]["second-btn"] && u && r(u).is(":empty") && (c = u, u = null) : (a = e[t], sf.result.setDefaultLink(a, !1, s, n, i, o)), sf.result.appendLink(e[t], c, n, !1, o), c = l);
                    if (a || !e[0].name && !e[0].text_url || (a = e[0], sf.result.setDefaultLink(a, !1, s, n, i, o)), t) {
                        l = r(s).find(".list .actions").get(0), c = l;
                        for (let e = 0; e < t.length; e++) a || t[e].disabled ? t[e]["second-btn"] && u && r(u).is(":empty") && (c = u, u = null) : (a = t[e], sf.result.setDefaultLink(a, !0, s, n, i, o)), sf.result.appendAction(t[e], c, !1, o), c = l
                    }
                },
                appendMetaInfo(e, t, s) {
                    if (!e || "object" != typeof e || !t) return;
                    const n = r.extend({}, e),
                        i = {
                            cls: s || "",
                            meta: []
                        },
                        o = ["title", "size", "duration"];
                    for (let e = 0; e < o.length; e++) {
                        const t = o[e];
                        if (n[t]) {
                            const e = {
                                name: t,
                                html: "&nbsp;",
                                title: ""
                            };
                            if ("title" === t) e.html = sf.modifyTitle(n[t]), e.title = e.html;
                            else if ("size" === t) {
                                const s = sf.sizeHuman(n[t], 2);
                                e.html = sf.sizeHumanToString(s)
                            } else e.html = n[t];
                            i.meta.push(e), delete n[t]
                        }
                    }
                    i.meta && (r(t).append(r("#tplResultMeta").render(i)), i.meta = [])
                },
                setDefaultLink(e, t, s, n, i, o) {
                    if (!e || !s) return;
                    const a = r(s).find(".def-btn-box"),
                        l = r(s).find(".def-btn-name");
                    if (t) {
                        const t = sf.result.appendAction(e, a.get(0), i, o);
                        e.attr && e.attr["data-copy"] && (l.html(r(t).html()), r(t).html(sf.lng.download).addClass("download-icon"))
                    } else {
                        const t = sf.result.appendLink(e, a.get(0), n, i, o);
                        t && (l.html(r(t).html()), r(t).html(sf.lng.download).addClass("download-icon"))
                    }
                },
                postProcessResult(e) {
                    if (!e) return;
                    const t = r(e);
                    let s = t.find(".drop-down-box");
                    s.length || (s = t);
                    const n = s.find(".main:empty");
                    n.length && (n.remove(), t.find(".link-box").addClass("no-links"));
                    const i = s.find(".hidden:empty");
                    i.length && (i.remove(), s.find(".more-links").remove()), s.find(".actions:empty").remove();
                    const o = s.find(".list a.link").length;
                    if (0 === o) t.find(".link-box").addClass("empty").find(".list").remove();
                    else if (o < 2) {
                        t.find(".link-box").addClass("single").find(".list").remove();
                        const e = s.find(".def-btn-name"),
                            r = e.html();
                        e.empty(), r && t.find(".def-btn-box a").append(` <span class="spacer">&nbsp;</span> ${r}`)
                    }
                    s.find(".def-btn-name:empty").remove(), t.find(".second-btn-box:empty").remove()
                },
                ajax(e, t, s, n, i, o, a) {
                    "string" == typeof o && (o = r(o).get(0));
                    let l = r(o).closest(".link-box"),
                        u = l.get(0);
                    if (u || (l = r(o.parentNode), u = l.get(0)), !e || !t) return l.html(sf.lng.linkNotFound), !1;
                    const c = r(o).closest(".result-box"),
                        d = `busy_box_${Date.now()}_${Math.round(1e4*Math.random())}`;
                    l.empty(), u = sf.append(u, "span", {
                        id: d,
                        class: "no-file-info"
                    }, {
                        display: "block"
                    }), l = r(u), sf.busy(d);
                    const p = setTimeout((() => {
                        l.html(sf.lng.linkNotFound)
                    }), sf.multi.timeout);
                    r.ajax({
                        type: "POST",
                        url: "https://" + _sf.workerHost + "/savefrom.php",
                        dataType: "text",
                        data: {
                            sf_url: e,
                            sf_token: t,
                            sf_ts: s,
                            sf_ajax: 1,
                            "sf-nomad": 1
                        },
                        crossDomain: !0,
                        xhrFields: {
                            withCredentials: !0
                        }
                    }).then((e => {
                        if (clearTimeout(p), a && a(u), e) {
                            let t = e.indexOf(sf.jsonToken);
                            if (-1 !== t && (t = (e = e.substring(t + sf.jsonToken.length)).indexOf(sf.jsonToken), t > 0 && (e = e.substring(0, t))), sf.result.setAjaxResult(e, n, i, l, c)) return
                        }
                        l.html(sf.lng.linkNotFound)
                    })).catch((e => {
                        _sf.debug && console.error(e)
                    }))
                },
                setAjaxResult(e, t, s, n, i) {
                    if ("string" == typeof e) try {
                        e = JSON.parse(e)
                    } catch (e) {
                        return !1
                    }
                    if (e && "object" == typeof e) {
                        if (e.response && e.message) return r(n).html(e.message), !0;
                        let o = null;
                        if (t ? (e.length && sf.videoResult.showRows(e), o = sf.videoResult.show(e, s, !1, !0)) : (e.length && sf.audioResult.showRows(e), o = sf.audioResult.show(e, s, !1, !0)), o && i) return r(i).replaceWith(o), !0
                    }
                    return !1
                },
                replaceAjaxResult(e, t, s, n) {
                    if (!n) return;
                    s && !r(n).closest("#sf_result_multi").length && (s = !1);
                    const i = r(n).closest(".result-box");
                    if (!i.length) return void r(n).replaceWith(sf.lng.linkNotFound);
                    const o = r(n.parentNode);
                    sf.result.setAjaxResult(e, t, s, o, i) || o.html(sf.lng.linkNotFound)
                },
                appendExtraInfo(e, t) {
                    if ("object" != typeof t) sf.append(e, "div", {
                        class: "extra"
                    }, null, t);
                    else {
                        const s = t.attr || {},
                            n = t.style || {},
                            i = t.html || t.txt || "",
                            o = t.delay || 0;
                        if (!i) return;
                        s.class ? -1 === s.class.search(/(^|\s+)extra(\s+|$)/) && (s.class += " extra") : s.class = "extra", o && (n.display = "none");
                        const a = sf.append(e, "div", s, n, i);
                        o && setTimeout((() => {
                            r(a).slideDown()
                        }), o)
                    }
                },
                appendMoreBtn(e, t, s) {
                    if (!s || !s.url || !s.id) return null;
                    const n = t ? "#sf_multi_result" : "#sf_result",
                        i = sf.createElement("div", {
                            class: "link-plus"
                        }),
                        o = sf.append(i, "a", {
                            href: "#",
                            id: s.id,
                            class: "action"
                        }, null, sf.lng.multiMore);
                    return r(o).on("click", (() => (sf.result.ajax(s.url, s.token, s.ts, e, t, o, (e => {
                        e.parentNode.removeChild(e)
                    })), !1))), r(`${n} .media-result`).append(i), o
                },
                execFunctions(e, t) {
                    if (e && e.length)
                        for (let s = 0; s < e.length; s++) new Function(e[s]).call(window, t)
                },
                sendResultStats(e, t, s) {
                    if (window.ga) {
                        const r = ["send", "event", "result"];
                        e && r.push(e), t && r.push(t), s && r.push(s), window.ga.apply(null, r)
                    }
                },
                getResultHostingId(e) {
                    return r(e).closest(".result-box").attr("data-hid")
                },
                trackElementAction(e, t, s) {
                    const n = r(e);
                    if (s) {
                        if (n.hasClass("tracked")) return;
                        n.addClass("tracked")
                    }
                    this.sendResultStats(t, this.getResultHostingId(n))
                },
                addFilterCallback(e) {
                    return !!e && (this.filterCallback = this.filterCallback || [], this.filterCallback.push(e), !0)
                },
                filterLinks(e, t, s, r, n) {
                    if (!e || !this.filterCallback) return !1;
                    for (let i = 0; i < this.filterCallback.length; i++) this.filterCallback[i](e, t, s, r, n);
                    return !0
                },
                addResultCallback(e) {
                    return !!e && (this.resultCallbacks.push(e), !0)
                },
                notifyResult(e, t, s, r) {
                    for (const n of this.resultCallbacks) n(e, t, s, r)
                }
            }
        },
        7900: function(e, t, s) {
            var r = s(2396),
                n = s(3769),
                i = n(s(9967)),
                o = n(s(8032));
            e.exports = {
                lng: null,
                lang: "en",
                linksListToken: "",
                jsonToken: "",
                allowedHosts: [],
                requestTimer: 0,
                requestTimeout: 4e4,
                extension: {
                    id: null,
                    version: null
                },
                lastUrlAttr: "data-lasturl",
                timeAttr: "data-time",
                formTimeout: 3e3,
                setLanguage(e) {
                    sf.lng = e, sf.lang = sf.lng.lang || sf.lang
                },
                getUVDSiteLanguage(e) {
                    return {
                        de: "de",
                        es: "es",
                        id: "id",
                        ru: "ru",
                        tr: "tr",
                        uk: "ua"
                    }[e || this.lang] || ""
                },
                getUVDSiteUrl(e, t) {
                    let s = this.getUVDSiteLanguage(e);
                    return s = s ? `${s}/` : s, `${t=t||"https:"}//videodownloader.ummy.net/${s}`
                },
                getElement(e) {
                    return document.getElementById(e) || (alert(sf.lng.error20.replace(/%s/g, e)), null)
                },
                createElement(e, t, s, n) {
                    const i = document.createElement(e);
                    if (!i) return null;
                    const o = r(i);
                    return n && o.html(n), t && o.attr(t), s && o.css(s), i
                },
                append(e, t, s, r, n) {
                    return e && t ? e.appendChild(sf.createElement(t, s, r, n)) : null
                },
                pluralize(e, t) {
                    if ("object" != typeof t) {
                        if (!sf.lng[t]) return t;
                        t = sf.lng[t]
                    }
                    return e = Math.abs(e), "id" === sf.lng.lang ? t[0] : "fr" === sf.lng.lang ? t[e > 1 ? 1 : 0] : "ru" === sf.lng.lang || "uk" === sf.lng.lang ? t[e % 100 > 4 && e % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][Math.min(e % 10, 5)]] : t[1 === e ? 0 : 1]
                },
                sizeHuman(e, t) {
                    if (!e) return "";
                    if ("number" != typeof e) {
                        if ("string" != typeof e || e.search(/\D/) > -1) return e;
                        if (e = (0, i.default)(e), isNaN(e)) return ""
                    }
                    null == t && (t = 2);
                    const s = e < 0;
                    s && (e = Math.abs(e));
                    const r = ["B", "KB", "MB", "GB", "TB", "PB"];
                    let n = 0;
                    for (; e >= 1024 && n < r.length - 1;) e /= 1024, ++n;
                    return s && (e *= -1), [e.toFixed(t), r[n]]
                },
                sizeHumanToString(e) {
                    if ("object" != typeof e) return e.toString();
                    const t = e[0],
                        s = e[1] ? sf.lng[e[1]] || e[1] : "";
                    return s ? `${t} ${s}` : t
                },
                autoSubmitForm(e) {
                    const t = document.getElementById(e);
                    t && setTimeout((() => {
                        t.click()
                    }), 1e3)
                },
                blockExtensionUrl() {
                    return !1
                },
                validateUrl(e) {
                    if (!e) return !1;
                    const t = {
                        savefrom: {
                            "is-hash": /^(https?:\/\/)?([a-z0-9].*)?savefrom\.[a-z0-9].*\/#url=/i,
                            "get-hash": /#url=(.+)/i,
                            "is-path": /(https?:\/\/)?(sfrom.net|safefrom.net)\/(https?:\/\/)?(www\.)?([а-яёa-z.]+)\.([а-яёa-z.]+)/i,
                            "get-path": /(?:sfrom.net|safefrom.net)\/(.+)/i
                        },
                        protocol: {
                            "is-exist": /^(https?)?:\/\//i
                        },
                        "is-url": /(www\.)?([а-яёa-z.]+)\.([а-яёa-z.]+)/i,
                        "is-frame": /^<iframe/i,
                        "get-frame-src": /src=(['"])(.*?)\1/i
                    };
                    if (t["is-frame"].test(e)) {
                        if (e = e.match(t["get-frame-src"]), !(e = Array.isArray(e) && e[2])) return !1
                    } else t.savefrom["is-hash"].test(e) ? (e = e.match(t.savefrom["get-hash"]), e = Array.isArray(e) && e[1]) : t.savefrom["is-path"].test(e) && (e = e.match(t.savefrom["get-path"]), e = Array.isArray(e) && e[1]);
                    return e = (e = (e = e.replace(/^(s|p|tp|ttp|htp|htpp|htt|htts)(s)?\b/i, "http$2")).replace(/(https?)(:)?(\/)+/gi, "$1://")).replace(/\s/gi, ""), t["is-url"].test(e) ? (e = (e = e.replace(/ss(youtube.com)/i, "$1")).replace(/^:?\/?\//i, "http://"), t.protocol["is-exist"].test(e) || (e = `http://${e}`), e) : !!(_sf.article && _sf.article.name && _sf.article.name.includes("instagram") || _sf.channel && _sf.channel.includes("main")) && `https://www.instagram.com/${e=e.replace(/@/g,"")}/`
                },
                checkUrlForAllowedHosts(e) {
                    if (!this.allowedHosts.length) return !0;
                    try {
                        let t = new URL(e).hostname.split(".");
                        do {
                            const e = t.join(".");
                            if (this.allowedHosts.includes(e)) return !0;
                            t.shift()
                        } while (t.length > 1);
                        return sf.result.show({
                            source_url: e,
                            html: "link is not supported",
                            response: 8,
                            response_type: "link is not supported",
                            success: !1,
                            hosting: "other",
                            noOffer: !0
                        }, !1, !0, !1), !1
                    } catch (e) {}
                    return !0
                },
                getFormConst() {
                    return {
                        FORM_ID: "sf_form",
                        INPUT_ID: "sf_url",
                        SUBMIT_ID: "sf_submit"
                    }
                },
                onPasteUrl() {
                    const {
                        FORM_ID: e,
                        INPUT_ID: t,
                        SUBMIT_ID: s
                    } = sf.getFormConst();
                    setTimeout((() => {
                        const n = r(`#${t}`).val();
                        if (!n) return;
                        const i = r(`#${e}`);
                        i.hasClass("result") && i.attr(sf.lastUrlAttr) === n || sf.autoSubmitForm(s)
                    }), 10)
                },
                checkForm(e) {
                    e = e || window.event;
                    const {
                        FORM_ID: t,
                        INPUT_ID: s,
                        SUBMIT_ID: n
                    } = sf.getFormConst(), i = r(`#${t}`), o = r(`#${s}`);
                    if (!o.length) return e.preventDefault(), e.stopImmediatePropagation(), !1;
                    const a = r(`#${n}`);
                    if (!a.length) return e.preventDefault(), e.stopImmediatePropagation(), !1;
                    if (!o.val()) return sf.removeBusyIndicator(), setTimeout((() => {
                        i.removeClass("ready").addClass("invalid")
                    }), 200), sf.fileResult.showMessage(sf.lng.error1), i.trigger("empty-url"), e.preventDefault(), e.stopImmediatePropagation(), !1;
                    const l = sf.validateUrl(o.val());
                    if (!this.checkUrlForAllowedHosts(l)) return sf.removeBusyIndicator(), !1;
                    if (!l) return sf.removeBusyIndicator(), setTimeout((() => {
                        i.removeClass("ready").addClass("invalid")
                    }), 200), i.trigger("invalid-url"), e.preventDefault(), e.stopImmediatePropagation(), !1;
                    const u = Date.now();
                    if (i.attr(sf.lastUrlAttr) === l && u - (i.attr(sf.timeAttr) || 0) < sf.formTimeout) return sf.removeBusyIndicator(), e.preventDefault(), e.stopImmediatePropagation(), !1;
                    i.addClass("ready").attr(sf.lastUrlAttr, l).attr(sf.timeAttr, u), o.val(l), sf.blockExtensionUrl(l) ? i.attr("data-extension-disabled", 1) : i.removeAttr("data-extension-disabled");
                    try {
                        localStorage.setItem("last_url", JSON.stringify({
                            url: 1,
                            ts: Date.now()
                        }))
                    } catch (e) {}
                    return window._sf && _sf.mobile && o.trigger("blur"), !!sf.preSubmitForm(l, a.get(0), !0, !0) || (sf.removeBusyIndicator(), e.preventDefault(), e.stopImmediatePropagation(), !1)
                },
                createSubmitFrame(e) {
                    sf.append(e, "iframe", {
                        name: "sf_frame",
                        id: "sf_frame",
                        width: "0",
                        height: "0",
                        frameborder: "0",
                        scrolling: "no"
                    })
                },
                preSubmitForm(e, t, s, n, i) {
                    clearTimeout(this.requestTimer);
                    const o = sf.getElement("sf_result");
                    if (!o) return !1;
                    n && (r("#sf_multi_result").empty(), r("#sf_premium_result").empty());
                    const a = sf.getElement("sf_indicator_box");
                    if (!a) return !1;
                    let l = !1;
                    if (!document.getElementById("sf_indicator")) {
                        i || r(o).empty(), l = !0;
                        const e = sf.createElement("div", {
                            id: "sf_indicator"
                        });
                        r(a).empty().append(e).show()
                    }
                    return i || sf.createSubmitFrame(o), t && (setTimeout((() => {
                        t.disabled = !0
                    }), 10), s && setTimeout((() => {
                        t.disabled = !1
                    }), 1e4), r("#sf_form").addClass("result").removeClass("ready")), l && sf.busy(), n && (this.requestTimer = setTimeout((() => {
                        r("#sf_indicator_box").attr("class", "timeout-msg").html(sf.getTimeoutMessage(e)), r("#sf_form").trigger("timeout", {
                            url: e
                        })
                    }), this.requestTimeout)), !0
                },
                getTimeoutMessage(e) {
                    const t = `<div class="result-box simple center">${sf.lng.request_err1}</div>`,
                        s = sf.promoBlock.getBlockByUrl(e);
                    if (!s || !s.params || !s.params.id) return t;
                    const r = {
                        helper: "313",
                        uvd: "142"
                    };
                    if (!r[s.params.id] || !sf.lng.recommendProduct[s.params.id]) return t;
                    const n = sf.lng.recommendProduct[s.params.id].replace(/"{href}"/g, '"{{:href}}" class="ga_track_events bold" target="_blank" data-ga-event="{{:event_attr}}"').replace(/{service}/g, "{{:service}}");
                    s.params.className = "", s.params.event_prefix += "-timeout", s.query.utm_campaign += "_timeout", s.query.vid = r[s.params.id], s.params.template = `<div class="result-box simple center">${sf.lng.request_err2} ${n}</div>`;
                    const i = s.getParams().html;
                    return i && i.get(0) ? i : t
                },
                finishRequest(e) {
                    clearTimeout(this.requestTimer), e && this.removeBusyIndicator();
                    const {
                        FORM_ID: t
                    } = sf.getFormConst();
                    r(`#${t}`).find('input[data-type="special"]').remove()
                },
                busy(e, t) {
                    const s = document.getElementById(e || "sf_indicator");
                    if (!s) return;
                    const n = sf.lng.form_preloader_text,
                        i = document.createElement("img"),
                        o = document.createElement("p"),
                        a = document.createTextNode(n);
                    o.appendChild(a), t ? (i.src = "../img/busy.gif", i.style.margin = "2px 0") : i.src = "../img/busy.gif", i.alt = "...", r(s).empty(), r(s).append(o, i)
                },
                removeBusyIndicator() {
                    r("#sf_indicator_box").empty().css("display", "none")
                },
                enableElement(e, t) {
                    r(`#${e}`).attr("disabled", !t)
                },
                checkCode() {
                    const e = sf.getElement("sf_imgcode");
                    if (!e) return !1;
                    if (!e.value) return alert(sf.lng.error3), !1;
                    const t = sf.getElement("sf_result");
                    return t && sf.createSubmitFrame(t), !0
                },
                wait(e, t, s) {
                    const n = r(`#${t}`);
                    if (!n.length) return;
                    const i = () => {
                        if (e <= 0) return n.empty().attr("disabled", !1), void(s && s());
                        n.html(e), e--, setTimeout(i, 1e3, e)
                    };
                    i(e)
                },
                parseUrl(e, t) {
                    const s = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
                        r = /^(?:([^:/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@/]*):?([^:@/]*))?@)?([^:/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e),
                        n = {};
                    let i = 14;
                    for (; i--;) r[i] && (n[s[i]] = r[i]);
                    return t ? n[t.replace("PHP_URL_", "").toLowerCase()] : (delete n.source, n)
                },
                parseQuery(e) {
                    if (!(e = e || window.location.search)) return null;
                    const t = new URLSearchParams(e);
                    let s = {};
                    for (let [e, r] of Object.assign(t)) s[e.replace(/^[#\?]/, "")] = r;
                    return /youtube/.test(s.url) && s.v && (s.url = s.url + "&v=" + s.v), s
                },
                processLink(e, t) {
                    const s = sf.getElement("sf_url");
                    if (!s) return;
                    const n = sf.getElement("sf_submit");
                    if (!n) return;
                    const i = r(n.form);
                    if (t) {
                        const s = "number" == typeof t ? t : 1;
                        i.find('input[name="retry"]').remove(), i.trigger("retry", {
                            url: e,
                            value: s
                        }), i.append(r('<input type="hidden" name="retry" data-type="special">').val(s))
                    }
                    s.value = e, i.attr(sf.lastUrlAttr, ""), r(n.form).trigger("submit")
                },
                isTimestampExpired(e, t) {
                    return 0 === e || !!e && (t = t || 3600, e = (0, o.default)(e), !!isNaN(e) || e + t <= Math.floor(Date.now() / 1e3))
                },
                showDebugInfo(e) {
                    const t = r("#debug_info");
                    t.length ? t.append(`<p>${e}</p>`) : r("footer").after(`<div id="debug_info" class="wrapper"><p>${e}</p></div>`)
                },
                modifyTitle(e) {
                    return e ? e.replace(/(\\u0027|\\u0022|")/gi, "'").replace(/</g, "&lt;").replace(/\\u0028/gi, "(").replace(/\\u0029/gi, ")") : e
                },
                isPrimitiveBrowser() {
                    return !(!_sf.browser || !_sf.browser.name || -1 === _sf.browser.name.search(/UCBrowser|Opera Mini/i)) || !(!_sf.os || !_sf.os.name || -1 === _sf.os.name.search(/Series40|Symbian/i)) || !!window.navigator && ("" === window.navigator.userAgent || !!window.navigator.userAgent && -1 !== window.navigator.userAgent.search(/^java|blackberry|midp|opera mini|ucweb|uc ?browser/i))
                }
            }
        },
        9149: function(e, t, s) {
            var r = s(2396),
                n = s(3769),
                i = n(s(9967)),
                o = n(s(8032));
            e.exports = {
                player: null,
                types: ["webm", "mp4", "flv", "ogv"],
                normalizeSDHD(e, t) {
                    const s = [];
                    return Object.entries({
                        sd: e,
                        hd: t
                    }).forEach((e => {
                        let [t, r] = e;
                        r && (r.html5 && r.html5.forEach((e => {
                            s.push(this.normalizeVideoSource(e.url, e.type, t))
                        })), r.url && s.push(this.normalizeVideoSource(r.url, r.format, t)), r.url2 && s.push(this.normalizeVideoSource(r.url2, r.format, t)))
                    })), [...new Set(s)]
                },
                normalizeUrls(e) {
                    return e.url.filter((e => {
                        const t = e.type || e.ext;
                        return "no-audio" !== e.attr.class && -1 !== this.types.indexOf(t.toLowerCase())
                    })).map((e => this.normalizeVideoSource(e.url, e.type, e.subname || e.name || e.quality)))
                },
                getSources(e) {
                    return -1 === e.hosting.toString().indexOf("(h)") && (e.sd || e.hd) ? this.normalizeSDHD(e.sd, e.hd) : this.normalizeUrls(e)
                },
                normalizeVideoSource(e, t, s) {
                    if (!t) {
                        const s = this.urlObject({
                            url: e
                        });
                        s.parameters.mime ? t = decodeURIComponent(s.parameters.mime) : -1 !== this.types.indexOf(this.getExtension(s.pathname)) ? t = this.getExtension(s.pathname) : console.log("Can't detect video type")
                    }
                    return t && 0 !== t.indexOf("video/") && (t = `video/${t}`), {
                        src: e,
                        type: t,
                        res: s.toString().toUpperCase(),
                        label: s.toString().toUpperCase()
                    }
                },
                getExtension(e) {
                    return e.split(".").pop().toLowerCase()
                },
                urlObject(e) {
                    const t = {},
                        s = document.createElement("a");
                    e = {
                        url: window.location.href,
                        unescape: !0,
                        convert_num: !0,
                        ...e
                    }, s.href = e.url;
                    const r = s.search.substring(1).split("&");
                    for (let s = 0; s < r.length; s++) {
                        let [n, a] = r[s].split("=");
                        e.unescape && (n = decodeURI(n), a = decodeURI(a) || ""), e.convert_num && (a.match(/^\d+$/) ? a = (0, i.default)(a, 10) : a.match(/^\d+\.\d+$/) && (a = (0, o.default)(a))), void 0 === t[n] ? t[n] = a : Array.isArray(t[n]) ? t[n].push(a) : t[n] = [t[n], a]
                    }
                    return {
                        protocol: s.protocol,
                        hostname: s.hostname,
                        host: s.host,
                        port: s.port,
                        hash: s.hash.substr(1),
                        pathname: s.pathname,
                        search: s.search,
                        parameters: t
                    }
                },
                toggle(e, t) {
                    this.switchOn(this.getSources(e), t)
                },
                switchOn(e, t) {
                    e.length && t && this.createPlayer(e, t)
                },
                async createPlayer(e, t) {
                    const s = `${t}_tmp`;
                    if (await this.loadLibraries(), this.checkLibsAvailability()) {
                        const t = e.filter((e => "video/youtube" === e.type));
                        this.showPopup(s);
                        const {
                            width: r,
                            height: n
                        } = this.calculateSizeByScreenSize();
                        this.player = videojs(s, {
                            techOrder: t.length ? ["youtube"] : ["html5"],
                            controls: !0,
                            autoplay: !0,
                            preload: "auto",
                            height: n,
                            width: r,
                            responsive: !0,
                            sources: t.length ? t : e
                        }), window.addEventListener("resize", (() => {
                            this.resize()
                        })), window.addEventListener("orientationchange", (() => {
                            this.resize()
                        }))
                    }
                },
                calculateSizeByScreenSize() {
                    const e = Math.min(640, (window.innerWidth || document.documentElement.clientWidth) - 50);
                    return {
                        width: e,
                        height: Math.min(Math.round(e / 1.6), (window.innerHeight || document.documentElement.clientHeight) - 50)
                    }
                },
                resize() {
                    const {
                        width: e,
                        height: t
                    } = this.calculateSizeByScreenSize();
                    this.player && (this.player.width(e), this.player.height(t))
                },
                showPopup(e) {
                    const t = document.getElementById("output-dialog");
                    r(t).find(".a11y-dialog-content-for-js").html(`<div id="video-player-box" class="video-js vjs-default-skin" style="width:auto;height:auto;overflow:hidden;"><video id="${e}"></video></div>`);
                    const s = createA11yDialog({
                        element: t,
                        hideCloseButton: !0
                    });
                    s.on("hide", (e => {
                        this.switchOff(), ga("send", "event", "player", "close-click", "true")
                    })), s.show()
                },
                switchOff() {
                    this.player && (this.player.pause(), this.player.trigger("ended"), this.player.dispose()), this.player = null
                },
                checkLibsAvailability() {
                    return "function" == typeof videojs
                },
                loadLibraries() {
                    return new Promise(((e, t) => {
                        if (this.checkLibsAvailability()) e();
                        else {
                            if (this.librariesLoaded) return void e();
                            this.librariesLoaded = !0;
                            const s = document.createElement("link");
                            s.href = "https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video-js.min.css", s.rel = "stylesheet", document.head.appendChild(s);
                            const r = document.createElement("style");
                            r.setAttribute("type", "text/css"), r.innerHTML = '.vjs-error .vjs-error-display::before{content:"Error";}', document.head.appendChild(r);
                            const n = document.createElement("script");
                            n.src = "https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video.min.js", n.onload = e, n.onerror = t, document.head.appendChild(n)
                        }
                    }))
                }
            }
        },
        5361: function(e, t, s) {
            var r = s(2396);
            e.exports = {
                template: "#tplVideoBox",
                primaryGroup: "primary",
                visibleGroups: ["primary", "mp4", "ummy", "opus audio", "m4a audio"],
                imageExtensions: ["jpg", "jpeg", "png", "webp", "gif", "tiff"],
                downloadHistClass: "download-hint",
                downloadHint: !1,
                prepareCallbacks: [],
                showRows(e, t) {
                    if (!e || "object" != typeof e || 0 === e.length) return;
                    sf.multi.validCount++;
                    let s = e[e.length - 1];
                    s.more ? (s = s.more, e.pop()) : s = null;
                    let r = 0;
                    for (let s = 0; s < e.length; s++) {
                        if (e[s].listItem = s, s === e.length - 1 && (e[s].listLastItem = !0), t && !e[s].hosting && (e[s].hosting = t), !e[s].extra) {
                            let t = {};
                            r++, t = 1 === r ? sf.promoBlock.get(e[s].hosting) : {}, e[s].extra = t
                        }
                        this.show(e[s], !1, !1)
                    }
                    s && s.url && s.id && sf.result.appendMoreBtn(!0, !1, s)
                },
                set prepareVideo(e) {
                    this.prepareCallbacks.push(e)
                },
                get prepareVideo() {
                    return (e, t) => {
                        for (let s = 0; s < this.prepareCallbacks.length; s++)
                            if (!1 === (0, this.prepareCallbacks[s])(e, t)) return !1;
                        return !0
                    }
                },
                isImageUrl(e) {
                    return e.ext && this.imageExtensions.includes(e.ext) || e.type && this.imageExtensions.includes(e.type)
                },
                areThereNonImageUrls(e) {
                    return e.some((e => !this.isImageUrl(e)))
                },
                show(e, t) {
                    let s = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                        n = arguments.length > 3 ? arguments[3] : void 0;
                    if (!e || "object" != typeof e) return null;
                    sf.multi.validCount++;
                    const i = r((t ? "#sf_multi_result" : "#sf_result") + " .media-result").get(0) || sf.result.createBox(t);
                    if (!1 === this.prepareVideo(e, t)) return null;
                    const o = !(sf.sfApp || !(e.sd || e.url && e.url.length && this.areThereNonImageUrls(e.url))),
                        a = Date.now(),
                        l = Math.round(1e4 * Math.random()),
                        u = r(r(this.template).render({
                            thumb: e.thumb ? e.thumb.replace(/^http:/i, "") : "",
                            isPlayerAvailable: o,
                            playerId: `video_player_${a}_${l}`
                        }));
                    e.attr && (e.attr.class && (u.addClass(e.attr.class), delete e.attr.class), u.attr(e.attr)), e.hosting && u.attr("data-hid", e.hosting);
                    const c = u.find(".link-box").get(0);
                    return this.appendLinks(e.url, e.action, e.meta && e.meta.title ? e.meta.title : "", c, e.hosting), sf.result.appendMetaInfo(e.meta, u.find(".meta").get(0), ""), e.thumb && u.find(".thumb-box img").on("load", (e => {
                        const t = r(e.currentTarget),
                            s = t.width(),
                            n = t.height();
                        s && n && s / n > 1.5 && t.addClass("wide")
                    })), u.find(".thumb-box .clip").on("click", (t => (o && sf.videoPlayerHTML5.loadLibraries().then((() => {
                        const s = r(t.currentTarget).data("player-id");
                        sf.videoPlayerHTML5.toggle(e, s), sf.result.sendResultStats("video-player-click", e.hosting), ga("send", "event", "player", "play-click", "true")
                    })).catch((e => {
                        console.log(e)
                    })), !1))), sf.result.postProcessResult(u), sf.result.execFunctions(e.fn, e), n ? (sf.result.notifyResult(e, !0, t, u), u.get(0)) : (s ? (u.css("display", "none"), u.appendTo(i), u.slideDown()) : u.appendTo(i), e.extra || t || (e.extra = sf.promoBlock.get(e.hosting, e.id || "")), this.addDownloadHint(i), e.extra && sf.result.appendExtraInfo(i, e.extra), sf.result.notifyResult(e, !0, t, u), u.get(0))
                },
                appendLinks(e, t, s, n, i) {
                    if (!e || "object" != typeof e || 0 === e.length || !n) return;
                    sf.result.mediaQuality.sortLinks(e), this.sortLinks(e), sf.result.filterLinks(e, t, s, !0, i);
                    const o = this.groupLinks(e),
                        a = r(n).find(".links").get(0),
                        l = r(a).find(".main").get(0);
                    let u = _sf.mobile ? null : r(n).find(".second-btn-box").get(0),
                        c = null,
                        d = null;
                    for (const t in o)
                        if (Object.prototype.hasOwnProperty.call(o, t))
                            if (o[t].visible) {
                                const r = sf.append(l, "div", {
                                    class: "link-group"
                                });
                                for (let a = 0; a < o[t].index.length; a++) d || e[o[t].index[a]].disabled || (d = e[o[t].index[a]], sf.result.setDefaultLink(d, !1, n, s, !0, i)), sf.result.appendLink(e[o[t].index[a]], r, s, !0, i);
                                d || (d = e[o[t].index[0]], sf.result.setDefaultLink(d, !1, n, s, !0, i))
                            } else {
                                c = c || r(a).find(".hidden").get(0);
                                const n = sf.append(c, "div", {
                                    class: "link-group"
                                });
                                for (let r = 0; r < o[t].index.length; r++) sf.result.appendLink(e[o[t].index[r]], n, s, !0, i)
                            }
                    if (t) {
                        const e = r(a).find(".actions").get(0);
                        let o = e;
                        for (let a = 0; a < t.length; a++) d ? t[a]["second-btn"] && u && r(u).is(":empty") && (o = u, u = null) : (d = t[a], sf.result.setDefaultLink(d, !0, n, s, !0, i)), sf.result.appendAction(t[a], o, !0, i), o = e
                    }
                },
                sortLinks(e) {
                    e.sort(((e, t) => {
                        let s = e.group || e.type || "",
                            r = t.group || t.type || "";
                        return s = s === this.primaryGroup ? 1 : 0, r = r === this.primaryGroup ? 1 : 0, r - s
                    }))
                },
                groupLinks(e) {
                    const t = {};
                    let s = !1;
                    for (let r = 0; r < e.length; r++)
                        if (e[r].name) {
                            let n = "0";
                            if (e[r].group ? n = e[r].group.toLowerCase() : e[r].type && (n = e[r].type.toString().toLowerCase()), t[n]) t[n].index.push(r);
                            else {
                                const i = !1 !== e[r].group_visible;
                                i && (s = !0), t[n] = {
                                    index: [r],
                                    visible: i
                                }
                            }
                        }
                    if (sf.isPrimitiveBrowser()) return t;
                    if (e.length > 6 && t.mp4 && t.mp4.visible)
                        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && -1 === this.visibleGroups.indexOf(e) && (t[e].visible = !1);
                    if (!s)
                        for (const e in t) {
                            t[e].visible = !0;
                            break
                        }
                    return t
                },
                isDownloadHintExist() {
                    const e = [`#sf_result .extra.${this.downloadHistClass}`, `#sf_multi_result .extra.${this.downloadHistClass}`];
                    return !!r(e.join(",")).length
                },
                addDownloadHint(e) {
                    this.downloadHint && !this.isDownloadHintExist() && sf.result.appendExtraInfo(e, {
                        attr: {
                            class: this.downloadHistClass
                        },
                        html: `<p class="hint1">${sf.lng.videoDownloadIssue}</p><p class="hint2">${sf.lng.downloadHint}</p>`
                    })
                }
            }
        }
    },
    function(e) {
        e.O(0, [4121], (function() {
            return e(e.s = 5879)
        })), e.O()
    }
]);