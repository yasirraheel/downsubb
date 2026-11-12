"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [7653], {
        2396: function(e) {
            e.exports = window.$
        },
        293: function(e, t, n) {
            var a = n(2396);
            window.mainFormOutput = function(e) {
                var t = "";
                const n = new Notyf;
                var s, o, i, r;
                1 == _sf.query.hi && a("#sf_form").closest(".wrapper").hide(), sf.isPrimitiveBrowser() ? a(".downloader-2").addClass("simple") : (a("body").on("click", (function(e) {
                        var t = a(".link-box.expand .drop-down-box"),
                            n = t[0];
                        n && e.target != n && a(".list", t).slideUp("fast", (function() {
                            t.closest(".link-box").removeClass("expand")
                        }))
                    })).on("keyup", (function(e) {
                        var t = a(".link-box.expand");
                        t[0] && 27 == e.which && a(".list", t).slideUp("fast", (function() {
                            t.closest(".link-box").removeClass("expand")
                        }))
                    })).on("click", ".link-box .def-btn-name", (function(e) {
                        e.preventDefault(), e.stopPropagation();
                        var t = a(this).closest(".link-box");
                        t.hasClass("expand") ? a(".list", t).slideUp("fast", (function() {
                            t.removeClass("expand")
                        })) : (a(".link-box.expand .list").slideUp("fast", (function() {
                            a(this).closest(".link-box").removeClass("expand")
                        })), a(".list", t).slideDown("fast", (function() {
                            t.addClass("expand")
                        })))
                    })).on("click", ".link-box .more-links a", (function(e) {
                        e.preventDefault(), e.stopPropagation(), a(this).closest(".link-box").toggleClass("showall"), sf.result.trackElementAction(this, "more-btn-click", !0)
                    })), _sf.mobile || "Safari" != _sf.browser.name || a("body").on("click", ".result-box .link-download", (function(e) {
                        if (!(e.button || e.ctrlKey || e.altKey || e.shitfKey || a(this).attr("data-copy"))) {
                            var t = null;
                            try {
                                "function" == typeof MouseEvent ? t = new MouseEvent("click", {
                                    bubbles: e.bubbles,
                                    cancelable: e.cancelable,
                                    view: e.view,
                                    screenX: e.screenX,
                                    screenY: e.screenY,
                                    clientX: e.clientX,
                                    clientY: e.clientY,
                                    altKey: !0,
                                    metaKey: e.metaKey,
                                    button: e.button,
                                    relatedTarget: e.relatedTarget
                                }) : (t = document.createEvent("MouseEvents")).initMouseEvent("click", e.bubbles, e.cancelable, window, 0, e.screenX, e.screenY, e.clientX, e.clientY, !1, !0, !1, e.metaKey, e.button, e.relatedTarget)
                            } catch (e) {
                                return void console.log(e)
                            }
                            t && (_sf.debug && console.log("Click + Alt simulation"), e.preventDefault(), e.stopPropagation(), this.dispatchEvent(t))
                        }
                    }))), a("body").on("click", ".link-box a[data-copy]", (function(e) {
                        e.preventDefault();
                        var t = a(this).data("copy");
                        const s = document.getElementById("output-dialog");
                        a(s).find(".a11y-dialog-content-for-js").html(a("#tplCopyBox").render({
                            text: t
                        })), createA11yDialog({
                            element: s
                        }).show(), document.querySelectorAll(".link-copy-btn").forEach((function(e) {
                            e.addEventListener("click", (function() {
                                const t = e.getAttribute("data-clipboard-target") || e.dataset.clipboardTarget,
                                    a = t ? document.querySelector(t) : null,
                                    s = a ? a.value || a.textContent : null;
                                s ? navigator.clipboard.writeText(s).then((function() {
                                    n.success({
                                        message: sf.lng.copyLinkSuccess,
                                        ripple: !1,
                                        duration: 3e3
                                    })
                                })).catch((function() {
                                    n.error({
                                        message: sf.lng.copyLinkFail,
                                        ripple: !1,
                                        duration: 3e3
                                    })
                                })) : n.error({
                                    message: sf.lng.copyLinkFail,
                                    ripple: !1,
                                    duration: 3e3
                                })
                            }))
                        }))
                    })).on("click", ".click-box", (function(e) {
                        var t = a(this).data("href");
                        t && (e.preventDefault(), window.gaHandler && window.gaHandler.trackNode(this), window.open(t))
                    })), s = sf.getFormConst(), o = a("#" + s.FORM_ID), i = a("#" + s.INPUT_ID), r = o.find(".clear-btn"), 0 !== o.length && (document.addEventListener && document.getElementById(s.INPUT_ID).addEventListener("paste", sf.onPasteUrl), i.on("focus keyup click change input paste", (function() {
                        i.val() ? r.show() : (o.removeClass("ready invalid"), r.fadeOut("fast"))
                    })), r.on("click", (function(e) {
                        e.preventDefault(), i.val(""), o.removeClass("ready invalid"), r.fadeOut("fast"), i.focus()
                    })), a(document).width() <= 680 && i.attr("placeholder", e), function() {
                        var e = i.val();

                        function t(e) {
                            window.ga && i.trigger("link-insert", {
                                type: e
                            })
                        }
                        i.on("propertychange change input paste jschange", (function(n) {
                            if (i.val() != e) {
                                e = i.val();
                                var a = n.type.toLowerCase();
                                "paste" != a && "jschange" != a || (t(a), i.addClass("ready")), "input" == a && n.originalEvent && n.originalEvent.inputType && (a += "-" + n.originalEvent.inputType), o.hasClass("ready") ? i.hasClass("ready") || (t(a), i.addClass("ready")) : i.removeClass("ready")
                            }
                        }))
                    }()), a(document).ready((function() {
                        var e = _sf.query;
                        if ((!e || !e.url) && location.hash) {
                            var n = location.hash.replace(/(^|#|&)url=(https?:?\/\/?.+)$/i, (function(e, t, n) {
                                return n ? t + "url=" + escape(n) : e
                            }));
                            e = sf.parseQuery(n)
                        }
                        if (e && e.url) - 1 == (t = (t = decodeURIComponent(e.url)).replace(/^(https?):?\/\/?/i, "$1://")).search(/^https?:\/\//i) && (t = "http://" + t), sf && sf.isTimestampExpired(_sf.hash.a_ts || _sf.query.a_ts) && (t = "", _sf.url = _sf.url || {}, _sf.url.ts = _sf.hash.a_ts || _sf.query.a_ts, _sf.url.expired = !0, a(document).trigger("url-expired"));
                        else {
                            var s = location.href.match(/^https?:\/\/[\w\-\.]+\/(https?\:?\/\/?[^\s\"]+)/i);
                            if (s && s.length > 1) {
                                var o = (t = s[1].replace(/^(https?):?\/\/?/i, "$1://")).match(/^https?:\/\/([^\/+])/i);
                                o && o.length > 1 && (o = (o = o[1]).replace(/^[^@]+@/i, "").replace(/:\d+$/, "")).indexOf("%") > -1 && (t = decodeURIComponent(t))
                            }
                        }
                        t && (t = (t = (t = t.replace(/(\?|#|&)(?:_openstat|a_ts)-[^&#]*&/g, "$1")).replace(/[\?&#](?:_openstat|a_ts)=[^&#]*($|#)/, "$1")).replace(/(\?|#|&)(?:utm_[a-z]+=[^&#]*&?)+/gi, "$1").replace(/[\?&]#/, "#").replace(/[\?#&]+$/, ""), a(".lang :not(.active) a").each((function() {
                            ! function(e, t) {
                                var n = e.href;
                                n && (n = (n = n.replace(/^(https?:\/\/[\w\-\.]+\/)https?\:?\/\/?.+/i, "$1")).replace(/^(https?:\/\/[\w\-\.]+\/)\d+\-.+/i, "$1"), t = "url=" + encodeURIComponent(t), -1 == n.search(/(\?|#|&)url=[^\s\"&]+/i) && (-1 != n.search(/#$/) ? e.href = n + t : -1 != n.search(/#.+/) ? e.href = n + "&" + t : e.href = n + "#" + t))
                            }(this, t)
                        })), setTimeout((function() {
                            a("body").hasClass("no-autosubmit") || -1 != document.body.className.search(/(?:^| )no-autosubmit-[\w\-]+/) || (a('input[name="sf_url"]').val(t).trigger("jschange"), sf.autoSubmitForm("sf_submit"))
                        }), 1e3))
                    })),
                    function() {
                        var e = "",
                            t = "retention720p";

                        function n(n, a) {
                            window.ga(t + ".send", "event", e, n || "", a || "")
                        }
                        _sf.gaTrackers[t] = {
                            id: "UA-119781451-35",
                            sendPageview: !1,
                            parameters: {
                                sampleRate: 3
                            }
                        }, sf.result.addResultCallback((function(t) {
                            e = "", t && null !== t.supported_resource && !1 !== t.success && t.hosting && 101 == t.hosting && (void 0 === t.listItem || t.listLastItem) && (e = "-", t.video_quality && (e = "A", t.video_quality[t.video_quality.length - 1] >= 720 && (e = "B"), t.itags && t.itags.indexOf("136") > -1 && -1 === t.itags.indexOf("22") && (e = "C"), t.url && t.url[0] && t.url[0].url.search("converter.savefrom.net") > 0 && (e = "D"), n("vidacha-show", "true")))
                        })), a("body").on("click", '.result-box[data-hid="101"] .link-download', (function() {
                            var e = [];
                            this.classList.contains("converter-link") ? e.push("webm converter") : this.dataset.type && e.push(this.dataset.type), this.dataset.quality && e.push(this.dataset.quality), this.classList.contains("no-audio") && e.push("no-audio"), n("download-click", e.join(" "))
                        }))
                    }(),
                    function() {
                        var e = "ytCBError";
                        _sf.gaTrackers[e] = {
                            id: "UA-156919089-19",
                            sendPageview: !1
                        };
                        var t = {
                            "country binding": "error",
                            "country restriction": "error-regional"
                        };
                        sf.result.addResultCallback((function(n) {
                            !1 === n.success && n.response_type && t[n.response_type] && window.ga(e + ".send", "event", t[n.response_type], _sf.country, "101")
                        }))
                    }()
            }
        }
    },
    function(e) {
        e(e.s = 293)
    }
]);