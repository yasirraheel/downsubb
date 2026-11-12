"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [7550], {
        2396: function(e) {
            e.exports = window.$
        },
        6068: function(e, n, t) {
            var r = t(2396);
            ! function() {
                const e = r("h1:first");
                if (!e.length) return !1;
                const n = e.html(),
                    t = r(".main-form-header"),
                    a = document.querySelector('img[src="/img/main/steps/step-1.png"]');
                let c;
                c = t.length ? t.html() : a ? `<div class="search-panel__container ${_sf.extraExperiments.includes("helperOffer")?"":"container_arrow_new"}">\n            <h1 class="search-panel__mobile__header">\n              ${n}\n            </h1>\n          </div>` : `<h1 class="search-panel__mobile__header-not-main">${n}</h1>`, t && t.remove(), document.querySelector(".search-panel__container") || (e.replaceWith('<div style="height: 23px;"></div>'), r(_sf.extraExperiments.includes("helperOffer") || _sf.extraExperiments.includes("helperOfferTr") ? ".downloader-2.downloader-2-part2" : ".downloader-2.downloader-2-part1").prepend(c));
                const s = document.querySelector(".file-upload-wrapper, .transcript-widget");
                if (s) {
                    let e;
                    e = t.length ? t.html() : a ? `<div class="search-panel__container ${_sf.extraExperiments.includes("helperOffer")?"":"container_arrow_new"}">\n              <h1 class="search-panel__mobile__header">\n                ${n}\n              </h1>\n            </div>` : `<h1 class="search-panel__mobile__header-not-main">${n}</h1>`;
                    const r = document.createElement("div");
                    r.classList.add("article-header"), r.innerHTML = e, s.parentNode.insertBefore(r, s)
                }
                const i = "sf_form:header_ready";
                let o;
                try {
                    o = new Event(i)
                } catch (e) {
                    document.createEvent ? (o = document.createEvent("Event"), o.initEvent(i, !1, !1)) : (o = document.createEventObject(), o.type = i)
                }
                document.dispatchEvent(o)
            }()
        }
    },
    function(e) {
        e(e.s = 6068)
    }
]);