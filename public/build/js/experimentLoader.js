(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [4471], {
        1460: function(e, t, a) {
            var r = {
                "./apkApp/js/main.js": [5789, 8355],
                "./apkDistributionAnalytics/js/main.js": [7640, 603, 2198],
                "./apkFileManager/js/main.js": [9171, 4121, 603, 8481],
                "./apkInterstitial/js/main.js": [402, 4121, 603, 8578],
                "./apkLanding/js/main.js": [5797, 4121, 603, 8295],
                "./apkLandingFree/js/main.js": [4587, 4121, 603, 2137],
                "./apkTopBanner/js/main.js": [4115, 4121, 603, 8509],
                "./apkTopQuality/js/main.js": [5868, 4121, 603, 6496],
                "./bannerOnError/js/main.js": [725, 4121, 603, 2321],
                "./basicMetrics/js/main.js": [9471, 2589],
                "./downloadButtonOnThumbnail/js/main.js": [2765, 603, 281],
                "./downloadYtViaTag/js/main.js": [5365, 4121, 603, 4559],
                "./expCheckGA/js/main.js": [7530, 603, 2159],
                "./hdMp3ButtonConfig/js/main.js": [9250, 603, 8546],
                "./helperBanner/js/main.js": [2558, 4121, 603, 4772],
                "./helperOffer/js/main.js": [3868, 4121, 603, 7436],
                "./helperWidget/js/main.js": [8116, 4121, 603, 9478],
                "./igStoriesTest/js/main.js": [7671, 3011],
                "./inpagePush2/js/main.js": [2844, 603, 9476],
                "./iosDevice/js/main.js": [1609, 5789],
                "./koreanPU/js/main.js": [275, 5357],
                "./output-stats/js/main.js": [6399, 603, 9157],
                "./pBlock/js/main.js": [1921, 4121, 603, 2303],
                "./partnersBlock/js/main.js": [8954, 4121, 603, 3614],
                "./popupAfterDownload/js/main.js": [2868, 4121, 603, 9658],
                "./popupInOutput/js/main.js": [9278, 603, 3470],
                "./proSubscribed/js/main.js": [9549, 4121, 603, 3229],
                "./proSubscription/js/main.js": [3776, 4121, 603, 708],
                "./propclick/js/main.js": [777, 4121, 603, 6405],
                "./propclickOnError/js/main.js": [1108, 603, 2370],
                "./propellerPush/js/main.js": [5473, 4121, 603, 2601],
                "./reference/js/main.js": [8611, 603, 1819],
                "./restoreSubscription/js/main.js": [105, 4121, 603, 9369],
                "./rsya/js/main.js": [6801, 603, 4423],
                "./rsyaFullscreen/js/main.js": [408, 603, 5574],
                "./rsyaRuBanners/js/main.js": [4289, 603, 3373],
                "./searchMusicVk/js/main.js": [4194, 4121, 603, 8018],
                "./sf-helper/js/main.js": [94, 603, 4306],
                "./sfProxyBanner/js/main.js": [2659, 4121, 603, 6059],
                "./ssstikPopup/js/main.js": [1855, 4121, 603, 1007],
                "./ssstikTopBanner/js/main.js": [912, 4121, 603, 3804],
                "./steamBanner/js/main.js": [6900, 4121, 603, 900],
                "./tgWidget/js/main.js": [8633, 4121, 2511],
                "./tzLanding/js/main.js": [387, 4121, 603, 1691],
                "./tzLandingFree/js/main.js": [897, 4121, 603, 773],
                "./tzTopQuality/js/main.js": [7158, 4121, 603, 6220],
                "./tzTopQualityV2/js/main.js": [8386, 4121, 603, 8660],
                "./widgetUser/js/main.js": [9691, 4121, 603, 5217]
            };

            function s(e) {
                if (!a.o(r, e)) return Promise.resolve().then((function() {
                    var t = new Error("Cannot find module '" + e + "'");
                    throw t.code = "MODULE_NOT_FOUND", t
                }));
                var t = r[e],
                    s = t[0];
                return Promise.all(t.slice(1).map(a.e)).then((function() {
                    return a.t(s, 23)
                }))
            }
            s.keys = function() {
                return Object.keys(r)
            }, s.id = 1460, e.exports = s
        },
        4526: function(e, t, a) {
            "use strict";
            var r = a(2396),
                s = a(3769),
                n = s(a(5194)),
                p = s(a(282));
            let i = Promise.resolve();
            window._isProd || (i = Promise.all([a.e(603), a.e(4855)]).then(a.bind(a, 8166)).then((e => {
                let {
                    default: t
                } = e;
                return t.init(p.default, n.default)
            })));
            const o = {
                configPath: "config.json",
                configExtraPath: "extra.json",
                expUrl: "/build/experiment/",
                staticDir: "/assets/experiment/",
                mainScriptPath: "js/main.js",
                mainFormNoAutoSubmitClassPrefix: "no-autosubmit-exp-",
                extraDefaultChannel: ["main", "ssyoutube", "article", "downloader", "second"],
                styleIdPrefix: "temp-exp-",
                exclude: {},
                excludeExtra: {},
                excludeDir: {},
                excludeAds: {},
                complete: !1,
                initMainForm: !1,
                removeBodyClass: !0,
                allowedExperiments: null,
                gaStats: {
                    id: "UA-156923636-31",
                    sampleRate: 5,
                    tracker: "expStats",
                    eventCategory: "experiment"
                },
                init() {
                    this.config = p.default, this.configExtra = n.default, this.gaStats.id && (_sf.gaTrackers[this.gaStats.tracker] = {
                        id: this.gaStats.id,
                        parameters: {
                            sampleRate: this.gaStats.sampleRate
                        }
                    }, ga(`${this.gaStats.tracker}.set`, {
                        dimension1: _sf.country || "",
                        dimension2: _sf.lang,
                        dimension3: _sf.os.name || "",
                        dimension4: _sf.browser.name || "",
                        dimension5: _sf.mobile ? "true" : "false",
                        dimension6: _sf.channel.join(",")
                    }), this.sendStats("init")), this.run(), this.runExtraIndependent()
                },
                run() {
                    if (!this.config) return;
                    const e = this.chooseExp();
                    if (e) return _sf.debug && this.printDebug("Start main experiment: ", e), void this.runExp(e);
                    this.removeBodyClass && r(document.body).removeClass("p-e5"), this.complete = !0, this.runExtra()
                },
                runExtraIndependent() {
                    if (this.configExtra)
                        for (const e in this.configExtra)
                            if (this.isExpAllowed(e)) {
                                if (!this.excludeExtra[e]) {
                                    const t = this.configExtra[e];
                                    t._name = e, t.channel = t.channel || this.extraDefaultChannel, t.independent && (this.excludeExtra[e] = !0, this.checkExp(t, !0) && this.runExtraExp(t))
                                }
                            } else this.printDebug("Experiment is blocked by the reference experiment: ", e)
                },
                runExtra() {
                    if (this.configExtra && this.complete && !this.extraStarted) {
                        this.extraStarted = !0;
                        for (const e in this.configExtra)
                            if (this.isExpAllowed(e)) {
                                if (!this.excludeExtra[e]) {
                                    const t = this.configExtra[e];
                                    t._name = e, t.channel = t.channel || this.extraDefaultChannel, t.independent || (this.excludeExtra[e] = !0, this.checkExp(t, !0) && this.runExtraExp(t))
                                }
                            } else this.printDebug("Experiment is blocked by the reference experiment: ", e)
                    }
                },
                isExpAllowed(e) {
                    return !this.allowedExperiments || this.allowedExperiments[e]
                },
                chooseExp() {
                    if (!this.config) return "";
                    for (const e in this.config)
                        if (!this.exclude[e] && this.isExpAllowed(e)) {
                            if (this.checkExp(this.config[e])) return e;
                            this.exclude[e] = !0
                        }
                    return ""
                },
                checkChannel(e) {
                    if (!(e && e.length && _sf.channel && _sf.channel.length)) return !0;
                    for (let t = 0, a = e.length; t < a; t++)
                        for (let a = 0, r = _sf.channel.length; a < r; a++)
                            if (e[t] === _sf.channel[a]) return !0;
                    return !1
                },
                checkExp(e, t) {
                    if (!e || !e.active) return !1;
                    if (e.ads && _sf.isPro) return !1;
                    if (e.lang && -1 === e.lang.indexOf(_sf.lang)) return !1;
                    if (e.excludedLang && e.excludedLang.indexOf(_sf.lang) > -1) return !1;
                    if (e.os && -1 === e.os.indexOf(_sf.os.name)) return !1;
                    if (e.excludedOS && e.excludedOS.indexOf(_sf.os.name) > -1) return !1;
                    if (e.mobile && !_sf.mobile || !1 === e.mobile && _sf.mobile) return !1;
                    if (e.browser && -1 === e.browser.indexOf(_sf.browser.name)) return !1;
                    if (e.excludedBrowser && e.excludedBrowser.indexOf(_sf.browser.name) > -1) return !1;
                    if (e.country) {
                        if (!_sf.country) return !1;
                        if (-1 === e.country.indexOf(_sf.country) && (!_sf.countryTierName || -1 === e.country.indexOf(_sf.countryTierName))) return !1
                    }
                    if (e.excludedCountry && _sf.country) {
                        if (e.excludedCountry.indexOf(_sf.country) > -1) return !1;
                        if (_sf.countryTierName && e.excludedCountry.indexOf(_sf.countryTierName) > -1) return !1
                    }
                    return !(e.channel && !this.checkChannel(e.channel)) && !(e.articleId && (!_sf.article || _sf.article.id !== e.articleId)) && !(e.article && (!_sf.article || -1 === e.article.indexOf(_sf.article.id))) && !(!0 === e.inAppBrowser && !_sf.browser.inApp || !1 === e.inAppBrowser && _sf.browser.inApp) && !(e.runInPartnerApp && !_sf.app || !1 === e.runInPartnerApp && _sf.app) && (!1 !== e.sfHelper || !window.sf || !sf.extension.id && !sf.cookie.get("browser_ext")) && (!e.app || -1 !== e.app.indexOf(_sf.app)) && !(e.excludedApp && e.excludedApp.indexOf(_sf.app) > -1) && !(e.minScreenWidth && this.getScreenWidth() < e.minScreenWidth) && !(e.maxScreenWidth && this.getScreenWidth() > e.maxScreenWidth) && !(e.minScreenHeight && this.getScreenHeight() < e.minScreenHeight) && !(e.maxScreenHeight && this.getScreenHeight() > e.maxScreenHeight) && (t ? this.checkExtraExp(e) : !e.parameters || !e.parameters.expSample || !1 !== this.checkExpSample(e))
                },
                checkExtraExpAdsType(e, t) {
                    return "sf-proxy" === _sf.app ? (this.printDebug('Experiment skipped because "sf-proxy" partner app is used: ', e), !1) : t.some((e => {
                        let {
                            type: t,
                            placement: a
                        } = e;
                        return this.excludeAds[t] && this.excludeAds[t][a]
                    })) ? (this.printDebug("Experiment is skipped due to ad type and placement intersection: ", e), !1) : _sf.ads && _sf.ads.allowed ? !(!_sf.ads.allowed.all || !_sf.ads.allowed.all.all) || (!t.some((e => {
                        let {
                            type: t,
                            placement: a
                        } = e;
                        return !_sf.ads.allowed[t] || !_sf.ads.allowed[t][a]
                    })) || (this.printDebug("Experiment is skipped due to disallowed ad type and placement: ", e), !1)) : !_sf.experiment || (this.printDebug(`Experiment skipped because advertising experiments are not allowed by the main experiment "${_sf.experiment}": `, e), !1)
                },
                checkExtraExp(e) {
                    if ((e.changeContent || e.changeOutput) && _sf.experiment) return this.printDebug("Experiment is skipped because it changes content or output: ", e._name), !1;
                    if (e.ads && !this.checkExtraExpAdsType(e._name, e.ads)) return !1;
                    if (e.excludeExperiments && _sf.extraExperiments.has(e.excludeExperiments)) return this.printDebug("Experiment is skipped due to conflict with another experiment: ", e._name), !1;
                    if (e.dir) {
                        if (this.excludeDir[e.dir]) return this.printDebug("Experiment is skipped due to directory conflict: ", e._name), !1
                    } else if (e.bundle && !this.checkBundleDir(e.bundle)) return !1;
                    return e.skipCheckingExpSample || !1 !== this.checkExpSample(e) ? (_sf.extraExperiments.add(e._name), !0) : (this.printDebug("Experiment is skipped due to sampling: ", e._name), !1)
                },
                checkExpSample(e) {
                    if (!e || !e.parameters) return !0;
                    const t = new Experiment({
                        name: e.parameters.expName
                    }).getValue();
                    return !(e.parameters.expSample && t > e.parameters.expSample || (e.parameters.expValue = t, 0))
                },
                checkBundleDir(e) {
                    for (const t in e)
                        if (Object.prototype.hasOwnProperty.call(e, t) && e[t].dir && this.excludeDir[e[t].dir]) return !1;
                    return !0
                },
                stopExp(e) {
                    _sf.experiment = "";
                    const t = this.config[e];
                    this.removeBodyClass = !0, t.hideElements && this.removeStyle(e), t.mainForm && (r(document.body).removeClass(this.mainFormNoAutoSubmitClassPrefix + e), this.initMainForm = !0), t.object && window[t.object] && delete window[t.object], this.exclude[e] = !0
                },
                runExp(e) {
                    _sf.experiment = e;
                    const t = this.config[e];
                    this.removeBodyClass = !1, t.mainForm && !1 === t.mainForm.autosubmit && r(document.body).addClass(this.mainFormNoAutoSubmitClassPrefix + e), t.hideElements && this.addStyle(e, `${t.hideElements}{display:none;`), a(1460)(`./${t.dir}/js/main.js`).then((() => {
                        if (t.object && window[t.object]) {
                            const a = window[t.object];
                            if (t.parameters && this.setParameters(a, t.parameters), void 0 === a.path && (a.path = `${this.staticDir}${t.dir}/`), a.isAvailable && !a.isAvailable()) return this.stopExp(e), void this.run();
                            if (a.init && !a.init()) return this.stopExp(e), void this.run();
                            if (this.sendStats(e, "start"), "reference" === e) return _sf.user = _sf.user || {}, _sf.user.reference = !0, _sf.experiment = "", this.exclude[e] = !0, this.setAllowedExperiments(t), this.removeBodyClass = !0, void this.run();
                            this.setAllowedExperiments(t), t.allowedAds && (_sf.ads = _sf.ads || {}, _sf.ads.allowed = _sf.ads.allowed || {}, t.allowedAds.forEach((e => {
                                let {
                                    type: t,
                                    placement: a
                                } = e;
                                _sf.ads.allowed[t] = _sf.ads.allowed[t] || {}, _sf.ads.allowed[t][a] = !0
                            }))), t.ads && this.updateExcludedAds(t.ads), this.complete = !0, this.runExtra()
                        }
                    })).catch((t => {
                        _sf.debug && (console.error(`Failed to load "${e}" experiment`), console.error(t)), console.error(t), this.stopExp(e), this.sendStats(e, "fail"), this.run()
                    }))
                },
                setAllowedExperiments(e) {
                    e.allowedIntegrations && (this.allowedExperiments = {}, e.allowedIntegrations.forEach((e => {
                        this.allowedExperiments[e] = !0
                    })))
                },
                stopExtraExp(e) {
                    if (e.object && window[e.object]) {
                        const t = window[e.object];
                        t.stop && "function" == typeof t.stop ? t.stop() : delete window[e.object]
                    }
                },
                runExtraExp(e) {
                    if (e) {
                        if (e.bundle) return this.runExtraExpBundle(e);
                        this.excludeDir[e.dir] = !0, e.ads && this.updateExcludedAds(e.ads), _sf.debug && this.printDebug("Start extra experiment: ", e._name), "documentReady" !== e.runAt ? e.startDelay ? window.setTimeout((() => {
                            this.loadAndExecExtraExp(e.dir, e)
                        }), e.startDelay) : this.loadAndExecExtraExp(e.dir, e) : window.addEventListener("load", (() => {
                            e.startDelay ? window.setTimeout((() => {
                                this.loadAndExecExtraExp(e.dir, e)
                            }), e.startDelay) : this.loadAndExecExtraExp(e.dir, e)
                        }))
                    }
                },
                runExtraExpBundle(e) {
                    const t = e._name;
                    for (const a in e.bundle)
                        if (Object.prototype.hasOwnProperty.call(e.bundle, a)) {
                            const r = e.bundle[a];
                            e._name = `${t}-${a}`, r.parameters.expValue || (r.parameters.expValue = e.parameters.expValue), this.runExtraExp(r)
                        }
                },
                loadAndExecExtraExp(e, t) {
                    const r = (e, t) => {
                        t.init() ? this.sendStats(e._name, "start") : this.stopExtraExp(e)
                    };
                    a(1460)(`./${e}/js/main.js`).then((() => {
                        if (!t.object || !window[t.object]) return;
                        const e = window[t.object];
                        t.parameters && this.setParameters(e, t.parameters), void 0 === e.path && (e.path = `${this.staticDir}${t.dir}/`), e.isAvailable && e.isAvailable() && e.init ? r(t, e) : this.stopExtraExp(t)
                    })).catch((e => {
                        _sf.debug && (console.error(`Failed to load "${t.dir}" experiment`), console.error(e)), this.stopExtraExp(t), this.sendStats(t._name, "fail")
                    }))
                },
                updateExcludedAds(e) {
                    e && e.forEach((e => {
                        let {
                            type: t,
                            placement: a
                        } = e;
                        this.excludeAds[t] = this.excludeAds[t] || {}, this.excludeAds[t][a] = !0
                    }))
                },
                intersect(e, t) {
                    const a = {},
                        r = [];
                    for (let e = 0; e < t.length; e++) a[t[e]] = !0;
                    for (let t = 0; t < e.length; t++) a[e[t]] && r.push(e[t]);
                    return r
                },
                getScreenWidth() {
                    return window.innerWidth || document.documentElement.clientWidth
                },
                getScreenHeight() {
                    return window.innerHeight || document.documentElement.clientHeight
                },
                setParameters(e, t) {
                    if (e && "object" == typeof e && t && "object" == typeof t)
                        for (const a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
                },
                addStyle(e, t) {
                    const a = document.createElement("style");
                    a.id = this.styleIdPrefix + e, a.appendChild(document.createTextNode(t)), document.getElementsByTagName("head")[0].appendChild(a)
                },
                removeStyle(e) {
                    const t = document.getElementById(this.styleIdPrefix + e);
                    t && t.parentNode.removeChild(t)
                },
                sendStats(e, t) {
                    t = t || "", this.gaStats.id && ga(`${this.gaStats.tracker}.send`, "event", this.gaStats.eventCategory, e, t)
                },
                printDebug() {
                    if (_sf.debug) {
                        const e = [...arguments];
                        e[0] = `EXP: ${e[0]}`, console.log.apply(console, e)
                    }
                },
                getTimestamp(e) {
                    return new Date(e).getTime()
                }
            };
            i.then((() => o.init()))
        },
        2396: function(e) {
            "use strict";
            e.exports = window.$
        },
        282: function(e) {
            "use strict";
            e.exports = JSON.parse('{"reference":{"active":true,"dir":"reference","object":"reference","allowedIntegrations":["outputStats"],"channel":["main","ssyoutube","article","downloader","second"],"version":"5","parameters":{"expName":"reference","expSample":4,"gaResource":"G-52DE8HHGTB"}},"proSubscription":{"active":false,"_note":"Выключен. Перед включением обязательно проверить работу вручную: одиночный результат и плейлист (#sf_multi_result) — правки скоупинга под multi на живой выдаче не проверялись","dir":"proSubscription","object":"proSubscription","country":["kr","de","br","fr"],"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"inpage-push","placement":"page-top"},{"type":"promo-block","placement":"inside-output"},{"type":"banner","placement":"inside-error-output"},{"type":"banner","placement":"page-top"},{"type":"native","placement":"inside-main-form"},{"type":"banner","placement":"mobile-page-top"},{"type":"promo-block","placement":"inside-output"},{"type":"promo-block","placement":"inside-output-2"}],"parameters":{"expName":"proSubscription","gaResource":"G-YZBZRGCYS9","expSample":20,"paywallUrl":"https://allvideoconverter.net/{lang}paywall?from_pro_paywall=true&utm_source=s010601","successPageUrl":"https://allvideoconverter.net/setcookie","supportedLangs":["ar","de","es","fr","id","it","ja","ko","ms","nl","pl","pt","ro","ru","th","tr","uk","vi"],"controlGroupSample":50}},"sfHelperRu":{"active":true,"lang":["ru"],"excludedCountry":["ua"],"channel":["main","ssyoutube"],"os":["Windows"],"browser":["Chrome","Firefox"],"mainForm":{"simple":true,"autosubmit":false},"sfHelper":false,"hideElements":".partners_v1","ads":[{"type":"paywall","placement":"processing"},{"type":"banner","placement":"after-main-form"}],"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"inpage-push","placement":"page-top"},{"type":"promo-block","placement":"inside-output"},{"type":"banner","placement":"inside-error-output"},{"type":"banner","placement":"page-top"},{"type":"native","placement":"inside-main-form"},{"type":"banner","placement":"mobile-page-top"},{"type":"promo-block","placement":"inside-output"},{"type":"promo-block","placement":"inside-output-2"}],"dir":"sf-helper","version":"15","object":"sfHelper","parameters":{"expName":"sfHelper","expSample":100,"gaResourceMain":"","gaOldResourceMain":"UA-7055055-37","gaResourceSSYoutube":"","gaOldResourceSSYoutube":"UA-7055055-25","distributeExtensions":true,"frequencyParams":{"cap":4,"intervalAmount":1,"intervalType":"day"}}},"sfHelperTr":{"active":true,"lang":["tr"],"excludedCountry":["ua"],"channel":["main","ssyoutube"],"os":["Windows"],"browser":["Chrome","Firefox"],"mainForm":{"simple":true,"autosubmit":false},"sfHelper":false,"hideElements":".partners_v1","ads":[{"type":"paywall","placement":"processing"},{"type":"banner","placement":"after-main-form"}],"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"inpage-push","placement":"page-top"},{"type":"promo-block","placement":"inside-output"},{"type":"banner","placement":"inside-error-output"},{"type":"banner","placement":"page-top"},{"type":"banner","placement":"mobile-page-top"},{"type":"banner-2","placement":"after-main-form"},{"type":"promo-block","placement":"inside-output"},{"type":"promo-block","placement":"inside-output-2"}],"dir":"sf-helper","version":"15","object":"sfHelper","parameters":{"expName":"sfHelper","expSample":25,"gaResourceMain":"","gaOldResourceMain":"UA-7055055-37","gaResourceSSYoutube":"","gaOldResourceSSYoutube":"UA-7055055-25","distributeExtensions":true,"frequencyParams":{"cap":4,"intervalAmount":1,"intervalType":"day"}}},"sfHelper":{"active":true,"lang":["ar","de","en","es","fr","id","pt"],"excludedCountry":["ua"],"channel":["main","ssyoutube"],"os":["Windows"],"browser":["Chrome","Firefox"],"mainForm":{"simple":true,"autosubmit":false},"sfHelper":false,"hideElements":".partners_v1","ads":[{"type":"paywall","placement":"processing"},{"type":"banner","placement":"after-main-form"}],"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"inpage-push","placement":"page-top"},{"type":"promo-block","placement":"inside-output"},{"type":"banner","placement":"inside-error-output"},{"type":"banner","placement":"page-top"},{"type":"banner","placement":"mobile-page-top"},{"type":"banner-2","placement":"after-main-form"},{"type":"promo-block","placement":"inside-output"},{"type":"promo-block","placement":"inside-output-2"}],"dir":"sf-helper","version":"15","object":"sfHelper","parameters":{"expName":"sfHelper","expSample":10,"gaResourceMain":"","gaOldResourceMain":"UA-7055055-37","gaResourceSSYoutube":"","gaOldResourceSSYoutube":"UA-7055055-25","distributeExtensions":true,"frequencyParams":{"cap":4,"intervalAmount":1,"intervalType":"day"}}},"steamBanner":{"active":false,"dir":"steamBanner","object":"steamBanner","excludedCountry":["in","id"],"version":"1","task":["tea-6790"],"ads":[{"type":"banner","placement":"after-main-form"}],"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"banner","placement":"page-top"},{"type":"banner","placement":"sidebar"},{"type":"banner","placement":"mobile-page-top"}],"parameters":{"expName":"steamBanner","expSample":10,"controlGroupSample":0,"gaResource":"G-YZBZRGCYS9","banners":{"desktop":["900x600_1.jpg","900x600_2.jpg","900x600_3.jpg","900x600_4.jpg","900x600_5.jpg","900x600_6.jpg","900x600_7.jpg","900x600_8.jpg","900x600_9.jpg","900x600_10.jpg","900x600_11.jpg"],"mobile":["360x240_1.jpg","360x240_2.jpg","360x240_3.jpg","360x240_4.jpg","360x240_5.jpg","360x240_6.jpg","360x240_7.jpg","360x240_8.jpg","360x240_9.jpg","360x240_10.jpg","360x240_11.jpg"]},"link":{"href":"https://store.steampowered.com/app/4202430/Veterans_Napoleonic_Wars/?utm_source=facebook","target":"_blank"}}},"tzLandingForChannelSsyoutube":{"active":true,"lang":["nl","it"],"country":["tier1","tier2"],"excludedCountry":["us"],"channel":["ssyoutube"],"os":["Windows"],"mainForm":{"simple":true},"ads":[{"type":"paywall","placement":"processing"}],"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"banner","placement":"page-top"},{"type":"banner","placement":"sidebar"},{"type":"banner","placement":"mobile-page-top"},{"type":"banner-2","placement":"after-main-form"},{"type":"promo-block","placement":"inside-output-2"}],"dir":"tzLanding","version":"43","object":"tzLanding","parameters":{"expName":"tzLanding","expSample":100}},"tzLanding":{"active":true,"lang":["en","pt","es","fr","ko","ja","de","nl","it"],"country":["tier1","tier2","br","ko","ru"],"excludedCountry":["us"],"channel":["main","article","downloader"],"os":["Windows"],"mainForm":{"simple":true},"ads":[{"type":"paywall","placement":"processing"}],"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"banner","placement":"page-top"},{"type":"banner","placement":"entry-top"},{"type":"banner","placement":"sidebar"},{"type":"banner","placement":"mobile-page-top"},{"type":"banner-2","placement":"after-main-form"},{"type":"promo-block","placement":"inside-output-2"}],"dir":"tzLanding","version":"43","object":"tzLanding","parameters":{"expName":"tzLanding","expSample":100}},"tzLandingFree":{"active":true,"country":["in","pk","ph","eg","id","tr","co","ar","bd","ng","ec","ua","ve","lk","bo","ke","pe"],"channel":["main","article","downloader"],"os":["Windows"],"mainForm":{"simple":true},"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"banner","placement":"page-top"},{"type":"banner","placement":"sidebar"},{"type":"banner","placement":"mobile-page-top"},{"type":"banner-2","placement":"after-main-form"},{"type":"promo-block","placement":"inside-output-2"},{"type":"popup","placement":"page-bottom-right"},{"type":"banner","placement":"inside-error-output"},{"type":"clickunder","placement":"inside-error-output"},{"type":"popup","placement":"output"}],"dir":"tzLandingFree","version":"1","object":"tzLandingFree","parameters":{"expName":"tzLandingFree","gaResource":"G-YZBZRGCYS9","expSample":50,"controlGroupSample":5}},"apkLandingFree":{"active":true,"country":["in"],"channel":["main","article","downloader"],"os":["Android"],"mobile":true,"mainForm":{"simple":true},"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"banner","placement":"page-top"},{"type":"banner","placement":"sidebar"},{"type":"banner","placement":"mobile-page-top"},{"type":"banner-2","placement":"after-main-form"},{"type":"promo-block","placement":"inside-output-2"},{"type":"clickunder","placement":"inside-error-output"}],"dir":"apkLandingFree","version":"1","object":"apkLandingFree","parameters":{"expName":"apkLandingFree","expSample":20,"minYtDuration":90,"youtubeHostingId":"101","apkUrl":"https://downloadhelper.app/download/apk/latest.apk"}},"tzLandingMac":{"active":true,"excludedCountry":["us"],"channel":["main","article","downloader"],"os":["Mac OS"],"mainForm":{"simple":true},"ads":[{"type":"paywall","placement":"processing"}],"allowedAds":[{"type":"clickunder","placement":"output"},{"type":"push","placement":"page-loading"},{"type":"banner","placement":"page-top"},{"type":"banner","placement":"entry-top"},{"type":"banner","placement":"sidebar"},{"type":"banner","placement":"mobile-page-top"},{"type":"banner-2","placement":"after-main-form"},{"type":"promo-block","placement":"inside-output-2"}],"dir":"tzLanding","version":"43","object":"tzLanding","parameters":{"expName":"tzLanding","expSample":100}},"widgetUser":{"active":false,"runAt":"documentReady","dir":"widgetUser","object":"widgetUser","mobile":true,"channel":["user"],"os":["Android","iOS"],"version":"1","parameters":{"expName":"widgetUser","expSample":100,"testSample":50,"testOs":"Android","gaResource":"","gaOldResource":"UA-156919089-57","gaParameters":{"sampleRate":100}}},"downloadYtViaTag":{"active":false,"runAt":"documentReady","dir":"downloadYtViaTag","object":"downloadYtViaTag","mobile":false,"browser":["Chrome","Chromium","Opera","Edge","Yandex","Firefox","Safari"],"allowedAds":[{"type":"all","placement":"all"}],"parameters":{"expName":"downloadYtViaTag","expSample":100,"gaResource":"G-R1P8SYKKYC","instruction":[{"type":"typeA","browser":["Chrome","Chromium","Opera","Edge","Yandex"]},{"type":"typeB","browser":["Firefox","Safari"]}]}}}')
        },
        5194: function(e) {
            "use strict";
            e.exports = JSON.parse('{"outputStats":{"active":true,"independent":true,"channel":["main","ssyoutube","article","downloader","second","reddit-page"],"dir":"output-stats","version":"4","object":"outputStats","skipCheckingExpSample":true,"parameters":{"gaResource":"G-R1P8SYKKYC","gaParameters":{"sampleRate":10}}},"basicMetrics":{"active":false,"dir":"basicMetrics","object":"basicMetrics","lang":["ru"],"parameters":{"expName":"basicMetrics","expSample":100,"gaResource":"","gaOldResource":"UA-156919089-39","gaParameters":{}}},"clickAds":{"active":true,"runAt":"documentReady","excludedCountry":["ru","ua"],"excludedApp":["televzr"],"excludeExperiments":["clickAdsDouble"],"dir":"propclick","object":"clickAds","version":"29","ads":[{"type":"clickunder","placement":"output"}],"parameters":{"expName":"clickAds","eventName":"clickAds","expSample":100,"gaResource":"G-86VST0VL88","gaOldResource":"UA-156919089-14","banners":{"propelleradsGlobal":{"sample":100,"excludedLang":["ko"],"urls":[{"url":"https://1nto.com/4/11966818","limit":6}],"gaResource":"G-86VST0VL88","gaOldResource":"UA-156919089-14","gaParameters":{"sampleRate":2}},"propelleradsKo":{"sample":100,"lang":["ko"],"urls":[{"url":"https://thetime.at/kr3.html","limit":6},{"url":"https://thetime.at/kr3.html","limit":6},{"url":"https://1nto.com/4/11966818","limit":6}],"gaResource":"G-86VST0VL88","gaOldResource":"UA-156919089-14","gaParameters":{"sampleRate":2}}},"frequencyParams":{"cap":7,"intervalAmount":1,"intervalType":"day"}}},"clickAdsRu":{"active":true,"runAt":"documentReady","country":["ru"],"excludedApp":["televzr"],"dir":"propclick","object":"clickAds","version":"29","ads":[{"type":"clickunder","placement":"output"}],"parameters":{"expName":"clickAds","eventName":"clickAdsRu","gaResource":"G-86VST0VL88","gaOldResource":"UA-156919089-14","banners":{"propelleradsDominantroute":{"sample":100,"urls":[{"url":"https://8ploraon.com/bens/vinos.js?24925&mode=redir","limit":6}],"gaResource":"G-86VST0VL88","gaOldResource":"UA-156919089-14","gaParameters":{"sampleRate":2}}},"frequencyParams":{"cap":7,"intervalAmount":1,"intervalType":"day"}}},"clickAdsUa":{"active":true,"runAt":"documentReady","country":["ua"],"excludedApp":["televzr"],"dir":"propclick","object":"clickAds","version":"29","ads":[{"type":"clickunder","placement":"output"}],"parameters":{"expName":"clickAds","eventName":"clickAdsUa","gaResource":"G-86VST0VL88","gaOldResource":"UA-156919089-14","banners":{"propelleradsDominantroute":{"sample":100,"urls":[{"url":"https://8ploraon.com/bens/vinos.js?26231&mode=redir","limit":6}],"gaResource":"G-86VST0VL88","gaOldResource":"UA-156919089-14","gaParameters":{"sampleRate":2}}},"frequencyParams":{"cap":7,"intervalAmount":1,"intervalType":"day"}}},"clickAdsOnError":{"active":true,"runAt":"documentReady","excludedCountry":["ru","ua"],"excludedApp":["televzr"],"dir":"propclickOnError","object":"clickAdsOnError","ads":[{"type":"clickunder","placement":"inside-error-output"}],"parameters":{"expName":"clickAdsOnError","eventName":"clickAdsOnError","expSample":100,"url":"https://1nto.com/4/11966818","gaResource":"G-86VST0VL88","frequencyParams":{"cap":6,"intervalAmount":1,"intervalType":"day"},"gaParameters":{"sampleRate":2}}},"clickAdsOnErrorRu":{"active":true,"runAt":"documentReady","country":["ru"],"excludedApp":["televzr"],"dir":"propclickOnError","object":"clickAdsOnError","ads":[{"type":"clickunder","placement":"inside-error-output"}],"parameters":{"expName":"clickAdsOnError","eventName":"clickAdsOnErrorRu","expSample":100,"url":"https://8ploraon.com/bens/vinos.js?24925&mode=redir","gaResource":"G-86VST0VL88","frequencyParams":{"cap":6,"intervalAmount":1,"intervalType":"day"},"gaParameters":{"sampleRate":2}}},"clickAdsOnErrorUa":{"active":true,"runAt":"documentReady","country":["ua"],"excludedApp":["televzr"],"dir":"propclickOnError","object":"clickAdsOnError","ads":[{"type":"clickunder","placement":"inside-error-output"}],"parameters":{"expName":"clickAdsOnError","eventName":"clickAdsOnErrorUa","expSample":100,"url":"https://8ploraon.com/bens/vinos.js?26231&mode=redir","gaResource":"G-86VST0VL88","frequencyParams":{"cap":6,"intervalAmount":1,"intervalType":"day"},"gaParameters":{"sampleRate":2}}},"poropellerAdsPush":{"active":true,"runAt":"documentReady","dir":"propellerPush","ads":[{"type":"push","placement":"page-loading"}],"version":"8","object":"poropellerAdsPush","startDelay":1250,"parameters":{"expName":"poropellerAdsPush-e","expSample":100,"gaResource":"","gaOldResource":"UA-156919089-11","gaParameters":{"sampleRate":2},"src":"https://3nbf4.com/act/files/micro.tag.min.js?z=6537600&sw=/sw-check-permissions.js"}},"rsya":{"active":true,"runAt":"documentReady","startDelay":2000,"dir":"rsya","object":"rsya","country":["az","am","by","kg","kz","md","ru","tj","uz"],"excludeExperiments":[],"version":"3","ads":[{"type":"banner","placement":"before-output"}],"parameters":{"expName":"rsya-e","expSample":100,"gaResource":"","gaOldResource":"UA-156919089-13","gaParameters":{"sampleRate":10},"statId":1,"blockId":{"desktop":"R-A-247195-19","mobile":"R-A-247195-20"}}},"rsyaRuBannersNew":{"active":true,"runAt":"documentReady","dir":"rsyaRuBanners","object":"rsyaRuBanners","lang":["ru"],"excludeExperiments":[],"version":"6","ads":[{"type":"banner","placement":"after-main-form"}],"startDelay":2000,"parameters":{"expName":"rsyaRuBanners-new","expSample":100,"gaResource":"","gaOldResource":"UA-156919089-12","gaParameters":{"sampleRate":10},"statId":4,"blockId":{"desktop":"R-A-247195-41","mobile":"R-A-247195-42"}}},"rsyaSFAppNew":{"active":true,"runAt":"documentReady","startDelay":450,"dir":"rsya","object":"rsya","country":["az","am","by","kg","kz","md","ru","tj","uz"],"excludeExperiments":[],"version":"3","app":["sf-android"],"ads":[{"type":"banner","placement":"before-output"}],"parameters":{"expName":"rsyaSFApp-e-new","expSample":50,"gaResource":"","gaOldResource":"UA-156919089-13","gaParameters":{"sampleRate":10},"statId":6,"blockId":{"desktop":"R-A-247195-41","mobile":"R-A-247195-42"}}},"rsyaSFApp":{"active":true,"runAt":"documentReady","startDelay":450,"dir":"rsya","object":"rsya","country":["az","am","by","kg","kz","md","ru","tj","uz"],"excludeExperiments":[],"version":"3","app":["sf-android"],"ads":[{"type":"banner","placement":"before-output"}],"parameters":{"expName":"rsyaSFApp-e","expSample":100,"gaResource":"","gaOldResource":"UA-156919089-13","gaParameters":{"sampleRate":10},"statId":5,"blockId":{"desktop":"R-A-247195-19","mobile":"R-A-247195-20"}}},"rsyaLangRu":{"active":true,"runAt":"documentReady","dir":"rsya","object":"rsya","excludedCountry":["az","am","by","kg","kz","md","ru","tj","uz"],"lang":["ru"],"version":"3","excludeExperiments":[],"ads":[{"type":"banner","placement":"before-output"}],"parameters":{"expName":"rsyaLangRu-e","expSample":100,"gaResource":"","gaOldResource":"UA-156919089-13","gaParameters":{"sampleRate":10},"statId":7,"blockId":{"desktop":"R-A-247195-19","mobile":"R-A-247195-20"}}},"rsyaFullscreen":{"active":true,"dir":"rsyaFullscreen","object":"rsyaFullscreen","runAt":"documentReady","country":["ru"],"ads":[{"type":"banner","placement":"processing"}],"mobile":true,"parameters":{"expName":"rsyaFullscreen","blockId":"R-A-247195-43"}},"promoBlock":{"active":true,"runAt":"documentReady","dir":"pBlock","object":"promoBlock","changeOutput":true,"version":"2","ads":[{"type":"promo-block","placement":"inside-output"}],"parameters":{"expName":"promoBlock","expSample":100,"gaResource":"","gaOldResource":"UA-156923636-47","gaParameters":{"sampleRate":10},"banners":{"helperAndroidDefault":{"active":false,"href2":"https://play.google.com/store/apps/details?id=org.mozilla.firefox","href":"https://addons.mozilla.org/ru/firefox/addon/savefromnet-helper/","os":{"include":["Android"]},"services":{"exclude":["rutube.ru"]},"browser":{"exclude":["Firefox"]}},"sfApk":{"active":false,"href":"https://downloadhelper.app/download/apk/sf-3.2.20-3120.apk","services":{"exclude":["rutube.ru"]},"os":{"include":["Android"]},"parameters":{"gaResource":"","gaOldResource":"UA-156923636-67","gaParameters":{"sampleRate":5}}},"helper":{"active":true,"href":"/user.php","services":{"exclude":["rutube.ru"]},"os":{"include":["Windows","Mac OS","Linux","Arch","CentOS","Chromium OS","Fedora","FreeBSD","Debian","Gentoo","Mandriva","Mageia","Mint","Ubuntu","SUSE"]},"browser":{"exclude":["IE","Yandex"],"include":["Firefox","Mozilla","Chrome","Chromium","Iron","Safari","Edge","Opera"]},"parameters":{"gaResource":"","gaOldResource":"UA-156923636-41"}},"televzr":{"active":true,"services":{"include":["101","youtube.com","rutube.ru","tiktok.com","mp4"]},"browser":{"include":["Opera","Yandex","Safari"]},"os":{"include":["Windows","Mac OS"]},"showSample":[67,100],"parameters":{"gaResource":"","gaOldResource":"UA-156923636-45"}},"yandexBrowser":{"active":false,"href":"https://redirect.appmetrica.yandex.com/serve/530909133495382437?c=savefromnet","os":{"include":["Android"]},"lang":{"include":["ru"]},"browser":{"exclude":["Yandex"]},"parameters":{"gaResource":"","gaOldResource":"UA-156923636-32"}},"blurbPromoBlock":{"active":false,"href":"https://applicationstore.me/blurb","os":{"include":["Windows","Mac OS"]},"showSample":[0,10],"parameters":{"gaResource":"","gaOldResource":""}}},"helperForChromeHref":[{"value":"/user.php","sample":100}]}},"apkApp":{"active":true,"dir":"apkApp","object":"apkApp","channel":["apk"],"version":"1","lang":["en","ru"],"parameters":{"expName":"newapk-e2","expSample":100,"btnSelector":"a[data-action=\'download\']"}},"helperWidget":{"active":true,"runAt":"documentReady","dir":"helperWidget","object":"helperWidget","mobile":false,"sfHelper":false,"helper":false,"startDelay":1000,"browser":["Chrome","Firefox","Opera","Edge"],"version":"3","task":["320-3398"],"ads":[{"type":"popup","placement":"page-bottom-right"}],"parameters":{"expName":"helperWidget","expSample":100,"controlGroupSample":0,"gaResource":"G-YZBZRGCYS9","gaOldResource":"UA-156923636-44","gaParameters":{"sampleRate":25}}},"helperBanner":{"active":true,"runAt":"documentReady","dir":"helperBanner","object":"helperBanner","version":"1","browser":["Chrome","Firefox","Opera"],"excludeExperiments":["proSubscription"],"mobile":false,"ads":[{"type":"banner","placement":"inside-error-output"}],"parameters":{"expName":"helperBanner","expSample":100,"controlGroupSample":0,"gaResource":"G-YZBZRGCYS9","gaOldResource":"UA-156923636-15","gaParameters":{"sampleRate":1},"showOnErrors":true}},"bannerOnError":{"active":true,"runAt":"documentReady","dir":"bannerOnError","object":"bannerOnError","version":"1","os":["Android","Mac OS","Windows"],"excludeExperiments":["helperBanner"],"ads":[{"type":"banner","placement":"inside-error-output"}],"parameters":{"expName":"bannerOnError","expSample":100,"controlGroupSample":0,"gaResource":"G-YZBZRGCYS9","showOnErrors":true}},"helperOfferTr":{"active":true,"dir":"helperOffer","object":"helperOffer","lang":["tr"],"changeContent":true,"mobile":false,"sfHelper":false,"ads":[{"type":"native","placement":"inside-main-form"}],"parameters":{"expName":"helperOffer","expSample":100,"controlGroupSample":0,"gaResource":"G-YZBZRGCYS9","gaOldResource":"UA-156923636-25"}},"helperOffer":{"active":true,"dir":"helperOffer","object":"helperOffer","country":["ru","by","kz","tier3"],"excludeExperiments":[],"ads":[{"type":"native","placement":"inside-main-form"}],"mobile":false,"sfHelper":false,"parameters":{"expName":"helperOffer","expSample":100,"controlGroupSample":0,"gaResource":"G-YZBZRGCYS9","gaOldResource":"UA-156923636-25"}},"iosDevice":{"active":false,"dir":"iosDevice","object":"iosDevice","independent":true,"skipCheckingExpSample":true,"os":["iOS"],"version":"1","task":["320-3628"],"parameters":{"expName":"iosDevice","gaResource":"","gaOldResource":"UA-142528268-40"}},"partnersBlock":{"active":true,"runAt":"documentReady","channel":["main","ssyoutube"],"dir":"partnersBlock","object":"partnersBlock","version":1,"task":["320-3818"],"parameters":{"expName":"partnersBlock","expSample":100,"expAnalyticsSample":5,"gaResource":"","gaOldResource":"UA-7055055-67","partners":{"televzr":{"active":false,"href":"http://desktop.televzr.com/?vid=615&utm_source=savefrom&utm_medium=partners&utm_campaign=televzr","os":{"include":["Windows","Mac OS"]},"eventLabel":"televzr"},"yandexBrowser":{"active":false,"href":"https://redirect.appmetrica.yandex.com/serve/530909133495382437?c=savefromnet","gaResource":"","gaOldResource":"UA-156923636-32","gaResourceName":"YandexBrowser","gaSendPageview":true,"gaClickParameters":{"eventCategory":"YandexBrowser","eventAction":"click","eventLabel":"partners"},"lang":{"include":["ru"]},"os":{"include":["Android"]},"eventLabel":"yabrowser"},"apk":{"active":false,"href":"/apk","os":{"include":["Android"]},"eventLabel":"sfapk"},"pdfedit":{"active":false,"href":{"en":"https://pdfedit.pro/","es":"https://pdfedit.pro/es","pt":"https://pdfedit.pro/pt","de":"https://pdfedit.pro/de","fr":"https://pdfedit.pro/fr"},"lang":{"include":["en","es","pt","de","fr"]},"eventLabel":"pdfedit"},"storiesig":{"active":true,"href":{"en":"https://storiesig.info/en/","ar":"https://storiesig.info/ar/","bn":"https://storiesig.info/bn/","cs":"https://storiesig.info/cs/","de":"https://storiesig.info/de/","el":"https://storiesig.info/el/","es":"https://storiesig.info/es/","fr":"https://storiesig.info/fr/","id":"https://storiesig.info/id/","it":"https://storiesig.info/it/","ja":"https://storiesig.info/ja/","ko":"https://storiesig.info/ko/","nl":"https://storiesig.info/nl/","pl":"https://storiesig.info/pl/","pt":"https://storiesig.info/pt/","ro":"https://storiesig.info/ro/","ru":"https://storiesig.info/ru/","sr":"https://storiesig.info/sr/","th":"https://storiesig.info/th/","tr":"https://storiesig.info/tr/","zh":"https://storiesig.info/zh/"},"lang":{"include":["en","ar","bn","cs","de","el","es","fr","id","it","ja","ko","nl","pl","pt","ro","ru","sr","th","tr","zh"]},"eventLabel":"storiesig"},"instasupersave":{"active":true,"href":{"en":"https://instasupersave.com/en/","de":"https://instasupersave.com/de/","es":"https://instasupersave.com/es/","fr":"https://instasupersave.com/fr/","id":"https://instasupersave.com/id/","it":"https://instasupersave.com/it/","pl":"https://instasupersave.com/pl/","pt":"https://instasupersave.com/pt/","ru":"https://instasupersave.com/ru/","th":"https://instasupersave.com/th/","tr":"https://instasupersave.com/tr/","vi":"https://instasupersave.com/vi/"},"lang":{"include":["en","de","es","fr","id","it","pl","pt","ru","th","tr","vi"]},"eventLabel":"instasupersave"},"ummy":{"active":false,"href":{"en":"https://videodownloader.ummy.net/","ru":"https://videodownloader.ummy.net/ru/","tr":"https://videodownloader.ummy.net/tr/","es":"https://videodownloader.ummy.net/es/","id":"https://videodownloader.ummy.net/id/","de":"https://videodownloader.ummy.net/de/","uk":"https://videodownloader.ummy.net/ua/","ar":"https://videodownloader.ummy.net/ar/","pt":"https://videodownloader.ummy.net/pt/"},"lang":{"include":["en","ru","tr","es","id","de","uk","ar","pt"]},"eventLabel":"ummy"},"tiktok":{"active":false,"href":{"en":"https://ssstik.live/","tr":"https://ssstik.live/tr/","es":"https://ssstik.live/es/","id":"https://ssstik.live/id/","de":"https://ssstik.live/de/","ar":"https://ssstik.live/ar/","pt":"https://ssstik.live/pt/","fr":"https://ssstik.live/fr/","vi":"https://ssstik.live/vi/","th":"https://ssstik.live/th/","ja":"https://ssstik.live/ja/","hi":"https://ssstik.live/","it":"https://ssstik.live/","ko":"https://ssstik.live/","pl":"https://ssstik.live/","ru":"https://ssstik.live/ru/","uk":"https://ssstik.live/","zh":"https://ssstik.live/"},"lang":{"include":["ar","de","en","es","fr","hi","id","it","ja","ko","pl","pt","ru","th","tr","uk","vi","zh"]},"eventLabel":"tiktok"},"ssyoutube":{"active":true,"href":{"en":"https://ssyoutube.to/en/","es":"https://ssyoutube.to/es/","de":"https://ssyoutube.to/","ar":"https://ssyoutube.to/","pt":"https://ssyoutube.to/pt/","ru":"https://ssyoutube.to/ru/","id":"https://ssyoutube.to/id/","tr":"https://ssyoutube.to/tr/","fr":"https://ssyoutube.to/fr/","vi":"https://ssyoutube.to/","th":"https://ssyoutube.to/","ja":"https://ssyoutube.to/ja/","hi":"https://ssyoutube.to/","it":"https://ssyoutube.to/it/","ko":"https://ssyoutube.to/ko/","pl":"https://ssyoutube.to/","uk":"https://ssyoutube.to/","zh":"https://ssyoutube.to/"},"lang":{"include":["en","es","de","ar","pt","ru","id","tr","fr","vi","th","ja","hi","it","ko","pl","uk","zh"]},"eventLabel":"ssyoutube"},"savef":{"active":false,"href":{"ar":"https://savef.net/ar/","de":"https://savef.net/de/","en":"https://savef.net/","es":"https://savef.net/es/","fr":"https://savef.net/fr/","hi":"https://savef.net/hi/","id":"https://savef.net/id/","it":"https://savef.net/it/","ja":"https://savef.net/ja/","ko":"https://savef.net/ko/","pl":"https://savef.net/pl/","pt":"https://savef.net/pt/","ru":"https://savef.net/ru/","th":"https://savef.net/th/","tr":"https://savef.net/tr/","uk":"https://savef.net/uk/","vi":"https://savef.net/vi/","zh":"https://savef.net/zh/"},"lang":{"include":["ar","de","en","es","fr","hi","id","it","ja","ko","pl","pt","ru","th","tr","uk","vi","zh"]},"eventLabel":"savef"},"igram":{"active":true,"href":{"en":"https://igram.world/","tr":"https://igram.world/tr/","es":"https://igram.world/es/","id":"https://igram.world/id/","de":"https://igram.world/de/","ar":"https://igram.world/ar/","pt":"https://igram.world/pt/","fr":"https://igram.world/fr/","vi":"https://igram.world/vi/","th":"https://igram.world/th/","ja":"https://igram.world/ja/","hi":"https://igram.world/hi/","it":"https://igram.world/it/","ko":"https://igram.world/ko/","pl":"https://igram.world/pl/","ru":"https://igram.world/ru/","uk":"https://igram.world/","zh":"https://igram.world/zh/"},"lang":{"include":["ar","de","en","es","fr","hi","id","it","ja","ko","pl","pt","ru","th","tr","uk","vi","zh"]},"eventLabel":"igram"},"ovc":{"active":false,"href":"https://onlinevideoconverter.pro/","eventLabel":"onlinevideoconverter"},"saveFrom":{"active":false,"href":"https://save-from.net/","eventLabel":"save-from"},"anonyig":{"active":false,"href":"https://anonyig.com/","eventLabel":"anonyig"},"ssstik":{"active":true,"href":{"ar":"https://ssstik.live/ar/","de":"https://ssstik.live/de/","en":"https://ssstik.live/","es":"https://ssstik.live/es/","fr":"https://ssstik.live/fr/","id":"https://ssstik.live/id/","ja":"https://ssstik.live/ja/","pt":"https://ssstik.live/pt/","ru":"https://ssstik.live/ru/","th":"https://ssstik.live/th/","tr":"https://ssstik.live/tr/","vi":"https://ssstik.live/vi/"},"lang":{"include":["ar","de","en","es","fr","id","ja","pt","ru","th","tr","vi"]},"eventLabel":"ssstik"}}}},"apkDistributionAnalytics":{"active":true,"dir":"apkDistributionAnalytics","object":"apkDistributionAnalytics","channel":["apk"],"os":["Android","iOS"],"mobile":true,"version":"1","task":["320-7917"],"parameters":{"expName":"apkDistributionAnalytics","expSample":100,"gaResource":"","gaOldResource":"UA-156923636-55","gaParameters":{"sampleRate":5},"btnSelector":"a[data-action=\'download\']"}},"apkDistributionAnalyticsArticle":{"active":true,"dir":"apkDistributionAnalytics","object":"apkDistributionAnalytics","article":["16","1","9","instagram","7"],"os":["Android","iOS"],"mobile":true,"version":"1","task":["320-7917"],"parameters":{"expName":"apkDistributionAnalytics","expSample":100,"gaResource":"","gaOldResource":"UA-156923636-55","gaParameters":{"sampleRate":5},"btnSelector":".ytdapp-android-wrapper a.install-btn-android, .download-btn a, a.google-button, a[data-btn=\'download\']"}},"ssstikTopBanner":{"active":false,"dir":"ssstikTopBanner","object":"ssstikTopBanner","changeContent":true,"runAt":"documentReady","os":["iOS"],"mobile":true,"ads":[{"type":"banner","placement":"mobile-page-top"}],"excludeExperiments":[],"parameters":{"expName":"ssstikTopBanner","expSample":100,"controlGroupSample":0,"gaResource":"","gaOldResource":"UA-156919089-42","gaParameters":{"sampleRate":5},"link":{"href":"https://ssstik.onelink.me/U2L4/w2vstaxl","target":"_blank"}}},"ssstikPopup":{"active":false,"runAt":"documentReady","os":["iOS"],"dir":"ssstikPopup","object":"ssstikPopup","ads":[{"type":"popup","placement":"output"}],"excludeExperiments":[],"parameters":{"expName":"ssstikPopup","expSample":100,"controlGroupSample":0,"gaResource":"","gaOldResource":"","frequencyParams":{"cap":1,"intervalAmount":1,"intervalType":"day"},"link":{"href":"https://ssstik.onelink.me/U2L4/xn6h6911","target":"_blank"}}},"apkTopBanner":{"active":false,"dir":"apkTopBanner","object":"apkTopBanner","changeContent":true,"runAt":"documentReady","os":["Android"],"mobile":true,"ads":[{"type":"banner","placement":"mobile-page-top"}],"excludeExperiments":["apkFileManager"],"parameters":{"expName":"apkTopBanner","expSample":100,"controlGroupSample":3,"gaResource":"","gaOldResource":"UA-156923636-26","gaParameters":{"sampleRate":5},"banners":{"apkTopBannerVideoMate":{"active":true,"sample":8,"lang":["en"],"smartAppBanner":true,"link":{"href":"https://downloadhelper.app/download/apk/sf-3.2.20-3120.apk","target":"_blank"},"image":"video-maker.svg"},"apkTopBanner":{"active":true,"sample":95,"excludedCountry":["in","ru"],"smartAppBanner":true,"link":{"href":"https://downloadhelper.app/download/apk/sf-3.2.20-3120.apk","target":"_blank"},"image":"sf-icon.svg"},"apkTopBannerAlt":{"active":true,"sample":5,"lang":["en"],"excludedCountry":["in","ru"],"smartAppBanner":true,"link":{"href":"https://downloadhelper.app/download/apk/sf-3.2.20-3120.apk","target":"_blank"},"image":"sf-icon-alt.svg"},"apkTopBannerIn":{"active":true,"sample":100,"country":["in"],"excludedBrowser":["Mozilla"],"smartAppBanner":true,"link":{"href":"https://downloadhelper.app/download/apk/sf-3.2.20-3120.apk","target":"_blank"},"image":"sf-icon.svg"},"apkTopBannerRu":{"active":true,"sample":100,"country":["ru"],"smartAppBanner":true,"link":{"href":"https://downloadhelper.app/download/apk/sf-3.2.20-3120.apk","target":"_blank"},"image":"sf-icon.svg"}}}},"apkInterstitial":{"active":false,"dir":"apkInterstitial","object":"apkInterstitial","changeContent":true,"runAt":"documentReady","excludeExperiments":["apkInterstitialSmartAppTest"],"os":["Android"],"excludedCountry":["id","tr"],"mobile":true,"parameters":{"expName":"apkInterstitial","expSample":60,"controlGroupSample":3,"closeTimeout":5000,"gaResource":"","gaOldResource":"UA-156923636-28","gaParameters":{"sampleRate":5},"frequencyParams":{"cap":1,"intervalAmount":1,"intervalType":"day"}}},"apkInterstitialTr":{"active":false,"dir":"apkInterstitial","object":"apkInterstitial","changeContent":true,"runAt":"documentReady","excludeExperiments":["apkInterstitialSmartAppTest"],"os":["Android"],"country":["tr"],"mobile":true,"parameters":{"expName":"apkInterstitial","expSample":100,"controlGroupSample":3,"closeTimeout":5000,"gaResource":"","gaOldResource":"UA-156923636-28","gaParameters":{"sampleRate":5},"frequencyParams":{"cap":1,"intervalAmount":1,"intervalType":"day"}}},"inpagePush2":{"active":false,"runAt":"documentReady","dir":"inpagePush2","ads":[{"type":"inpage-push","placement":"page-top"}],"version":"1","task":["320-4507"],"excludeExperiments":[],"object":"inpagePush2","startDelay":850,"parameters":{"expName":"inpagePush2","expSample":100,"gaResource":"","gaOldResource":"UA-156923636-18","banners":[{"sample":100,"src":"https://baithoph.net/400/2983203","dimension1":"new-push"}]}},"popupInOutput":{"active":true,"runAt":"documentReady","os":["Windows","Mac OS"],"excludeExperiments":[],"dir":"popupInOutput","object":"popupInOutput","ads":[{"type":"popup","placement":"output"}],"task":["320-3437"],"parameters":{"expName":"popupInOutput","expSample":100,"gaResource":"G-YZBZRGCYS9","gaOldResource":"UA-156923636-40","gaParameters":{"sampleRate":10},"timeoutHours":72,"preferred":"","maxCount":1,"rotate":true,"randomize":false,"showDelay":1000,"popups":{"televzr":{"active":true,"url":"https://desktop.televzr.com/?video={video}&vid={vid}&utm_source=savefrom&utm_medium=popup&utm_campaign=savefrom-popup","os":["Windows","Mac OS"],"service":["101 (h)","101","youtube.com","dailymotion.com","facebook.com","mail.ru","my.mail.ru","video.mail.ru","rutube.ru","vk.com","vimeo.com","instagram.com","cdninstagram.com"],"browser":["Opera","Yandex"]},"sfHelperYt":{"active":true,"url":"/user.php?vid=360","service":["101","youtube.com"],"browser":["Firefox","Mozilla","Chrome","Chromium","Safari"]},"sfHelper":{"active":true,"url":"/user.php?vid=361","service":["dailymotion.com","facebook.com","mail.ru","my.mail.ru","video.mail.ru","ok.ru","rutube.ru","vk.com","vimeo.com","instagram.com","cdninstagram.com"],"browser":["Firefox","Mozilla","Chrome","Chromium","Opera","Yandex","Safari"]}}}},"searchMusicVk":{"active":true,"dir":"searchMusicVk","object":"searchMusicVk","lang":["ru"],"country":["ru"],"channel":["main","article"],"version":1,"task":["320-3781"],"excludeExperiments":["apkTopBanner","apkTopBannerIn","apkTopBannerRu","apkFileManager","apkInterstitial","apkInterstitialSmartAppTest"],"parameters":{"expName":"searchMusicVk","expSample":100,"gaResource":"","gaOldResource":"UA-156923636-35","distributionVid":384}},"koreanPopunder":{"active":true,"runAt":"documentReady","dir":"koreanPU","object":"koreanPopunder","lang":["ko"],"mobile":false,"ads":[{"type":"popunder","placement":"page-loading"}],"startDelay":200,"task":["320-6646"],"parameters":{"expName":"koreanPopunder","expSample":100,"gaResource":"","gaOldResource":"UA-156919089-26","banner":{"ko":{"id":"342672"},"vi":{"id":"531307"}}}},"igStoriesTest":{"active":true,"dir":"igStoriesTest","object":"igStoriesTest","article":["20"],"mobile":false,"parameters":{"expName":"igStoriesTest","expSample":100,"controlGroupSample":50,"gaResource":"","gaOldResource":"UA-156923636-38"}},"downloadButtonOnThumbnail":{"active":true,"dir":"downloadButtonOnThumbnail","object":"downloadButtonOnThumbnail","mobile":true,"excludedBrowser":["Firefox","Firefox Mobile"],"changeOutput":true,"maxScreenWidth":360,"parameters":{"expName":"downloadButtonOnThumbnail","expSample":100,"gaResource":"","gaOldResource":"UA-156919089-41","gaParameters":{"sampleRate":2}}},"popupAfterDownload":{"active":true,"runAt":"documentReady","os":["Android","Windows"],"dir":"popupAfterDownload","object":"popupAfterDownload","excludeExperiments":[],"lang":["en","ru","es","id","pt","tr","vi","th","ar","fr"],"parameters":{"expName":"popupAfterDownload","expSample":100,"gaResource":"","gaOldResource":"UA-156923636-69","textsType":"en","frequencyParams":{"cap":1,"intervalAmount":1,"intervalType":"day"}}},"tgWidget":{"active":false,"dir":"tgWidget","object":"tgWidget","runAt":"documentReady","lang":["ru"],"mobile":false,"parameters":{"expName":"tgWidget","expSample":25,"templateParams":{"href":"https://applicationstore.me/tg_saver_bot/","target":"_blank"},"gaResource":"G-YVWV6BJQ3G","gaParameters":{"sampleRate":5}}},"proSubscribed":{"active":true,"dir":"proSubscribed","object":"proSubscribed","parameters":{"expName":"proSubscribed","gaResource":"G-YZBZRGCYS9","expSample":100}},"restoreSubscription":{"active":false,"dir":"restoreSubscription","object":"restoreSubscription","parameters":{"expName":"restoreSubscription","paywallLink":"https://allvideoconverter.net/{lang}paywall?from_pro_paywall=true&utm_source=s010701","supportedLangs":["ar","de","es","fr","id","it","ja","ko","ms","nl","pl","pt","ro","ru","th","tr","uk","vi"],"expSample":100,"gaResource":"G-YZBZRGCYS9","gaParameters":{}}},"hdMp3ButtonConfig":{"active":false,"dir":"hdMp3ButtonConfig","object":"hdMp3ButtonConfig","mobile":false,"version":"2","excludeExperiments":["proSubscription"],"parameters":{"expName":"hdMp3ButtonConfig","expSample":100}},"apkLanding":{"active":false,"mobile":true,"runAt":"documentReady","dir":"apkLanding","object":"apkLanding","os":["Android"],"lang":["en","pt","es","fr","ko","ja","de","nl","it"],"country":["tier1","tier2","br","ko"],"excludeExperiments":["proSubscription"],"ads":[{"type":"promo-block","placement":"inside-output-2"}],"parameters":{"expName":"apkLanding","gaResource":"G-YZBZRGCYS9","expSample":20,"controlGroupSample":50,"promoUrl":"#apk-offer"}},"tzTopQualityV2":{"active":true,"dir":"tzTopQualityV2","object":"tzTopQualityV2","os":["Android","Windows","Mac OS"],"excludeExperiments":["apkLanding","proSubscription"],"ads":[{"type":"promo-block","placement":"inside-output-2"}],"parameters":{"expName":"tzTopQualityV2","gaResource":"G-YZBZRGCYS9","expSample":20,"controlGroupSample":50,"tzUrl":"https://televzr.com/en/clickunder-landing-v5","apkUrl":"https://downloadhelper.app/download/apk/sf-3.2.20-3120.apk"}},"tzTopQuality":{"active":true,"dir":"tzTopQuality","object":"tzTopQuality","mobile":false,"excludeExperiments":["tzTopQualityV2","proSubscription"],"ads":[{"type":"promo-block","placement":"inside-output-2"}],"parameters":{"expName":"tzTopQuality","gaResource":"G-YZBZRGCYS9","expSample":100,"controlGroupSample":34,"url":"https://televzr.com/en/clickunder-landing-v5"}},"apkTopQuality":{"active":false,"_note":"Выключен. Перед включением обязательно проверить работу вручную: одиночный результат и плейлист (#sf_multi_result) — правки скоупинга под multi на живой выдаче не проверялись","dir":"apkTopQuality","object":"apkTopQuality","mobile":true,"excludeExperiments":["tzTopQualityV2","apkLanding"],"os":["Android"],"parameters":{"expName":"apkTopQuality","expSample":100,"controlGroupSample":55,"url":"https://downloadhelper.app/download/apk/sf-3.2.20-3120.apk"}},"expCheckGA":{"active":true,"dir":"expCheckGA","object":"expCheckGA","allowedAds":[],"parameters":{"expName":"expCheckGA","gaResource":"G-YZBZRGCYS9","expSample":10,"controlGroupSample":50}},"sfProxyBanner":{"active":true,"runAt":"documentReady","dir":"sfProxyBanner","object":"sfProxyBanner","country":["ru"],"mobile":false,"excludeExperiments":["apkTopBanner"],"version":"3","task":["TEA-6877","Tea-8772"],"ads":[{"type":"banner","placement":"entry-top"}],"parameters":{"expName":"sfProxyBanner","expSample":50,"groupASample":20,"groupBSample":20,"ctaUrl":"https://t.me/sfproxy_bot","eventsResource":"G-YZBZRGCYS9","userPropsResource":"G-R1P8SYKKYC","closeSuppressHours":24,"gaParameters":{"sampleRate":100}}}}')
        }
    },
    function(e) {
        e.O(0, [4121], (function() {
            return e(e.s = 4526)
        })), e.O()
    }
]);