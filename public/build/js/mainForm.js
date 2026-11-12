"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [3466], {
        2396: function(e) {
            e.exports = window.$
        },
        9748: function(e, n, t) {
            var r = t(2396);
            window.newMainForm = {
                setForm() {
                    _sf.mobile || this.appendInstructions()
                },
                appendInstructions() {
                    if (!r(".main-form__wrapper").length) return;
                    const e = document.querySelector(".main-form__watch");
                    e && (document.querySelector(".main-form__wrapper").removeAttribute("style"), e.addEventListener("click", (() => {
                        r(".main-form__watch").hide(), r(".main-form__video").show(), r(".search-result-video")[0].play()
                    })))
                }
            }
        }
    },
    function(e) {
        e(e.s = 9748)
    }
]);