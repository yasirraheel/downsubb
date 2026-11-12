"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [849], {
        2396: function(e) {
            e.exports = window.$
        },
        3532: function(e, a, n) {
            var s = n(2396);
            s((function() {
                var e, a = s(".lang-box"),
                    n = "active",
                    t = "current",
                    c = ".langbox";

                function r() {
                    a.removeClass(n), s("body").off(c)
                }

                function i() {
                    a.addClass(n), e = s("li.active", a), s("body").off(c).on("click" + c, (function() {
                        r()
                    })).on("keydown" + c, (function(n) {
                        switch (n.which) {
                            case 27:
                                r();
                                break;
                            case 13:
                            case 32:
                                ! function() {
                                    s(".active", a).removeClass("active"), e.addClass("active").removeClass(t), r();
                                    var n = s("li.active a", a).attr("href");
                                    n && (location.href = n)
                                }();
                                break;
                            case 38:
                                o(e.prev("li"));
                                break;
                            case 40:
                                o(e.next("li"));
                                break;
                            case 36:
                                o(s("li", a).first());
                                break;
                            case 35:
                                o(s("li", a).last());
                                break;
                            default:
                                return !0
                        }
                        return !1
                    }))
                }

                function o(a) {
                    a[0] && !a.hasClass(t) && (e.removeClass(t), a.addClass(t), e = a)
                }
                a.on("click", (function(e) {
                    if ("A" != e.target.tagName) return a.hasClass(n) ? r() : i(), !1
                })).on("keydown", (function(e) {
                    if (a.hasClass(n)) return !0;
                    switch (e.which) {
                        case 13:
                        case 32:
                            i();
                            break;
                        default:
                            return !0
                    }
                    return !1
                }))
            }))
        }
    },
    function(e) {
        e(e.s = 3532)
    }
]);