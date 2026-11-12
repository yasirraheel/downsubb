"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [7279], {
        5209: function() {
            window.sfHelperDownloadBox = {
                fetch(t) {
                    let {
                        btn: e = {},
                        icon: n = "/img/extension/icon_128_2.png",
                        iconWidth: o = 128,
                        iconHeight: s = 117,
                        name: i,
                        description: a,
                        target: r = {},
                        safetyInfo: l,
                        note: c
                    } = t;
                    if ("string" == typeof arguments[0]) return arguments[0];
                    const f = this.getHtmlAttributes(e.attr || {});
                    let d = "&nbsp;",
                        p = ["target-info"];
                    return r.name && r.text ? d = `${r.text} &nbsp; <a href="#helper_install" class="action">${r.name}</a>` : p.push("empty"), `\n      <div class="download-box">\n        <div class="icon"><a name="download-box" href="${e.href}" ${f}><img src="${n}" width="${o}" height="${s}" alt="icon"></a></div>\n        <div class="info">\n          <h3>${i}</h3>\n          <p>${a}</p>\n        </div>\n        <div class="button-box">\n          <div class="download-btn">\n            <a href="${e.href}" ${f}>${e.text.toUpperCase()}</a>\n          </div>\n          <div class="${p.join(" ")}">${d}</div>\n          <div class="safety-info"><b>${l}</b> &nbsp;\n            <a href="https://safeweb.norton.com/report/show?url=savefrom.net" rel="nofollow" target="_blank"><b>Norton</b>&trade; Safe Web</a>\n          </div>\n          <div class="note" style="display:none">${c}</div>\n        </div>\n      </div>\n    `
                },
                append(t, e) {
                    document.querySelector(t).insertAdjacentHTML("beforeend", this.fetch(e))
                },
                getHtmlAttributes(t) {
                    const e = [];
                    for (const n in t)
                        if (Object.prototype.hasOwnProperty.call(t, n)) {
                            const o = this.formatHtmlAttribute(n, t[n]);
                            o && e.push(o)
                        }
                    return e.join(" ")
                },
                formatHtmlAttribute(t, e) {
                    return "boolean" == typeof e ? e ? t : "" : `${t}="${this.escapeDoubleQuotes(e)}"`
                },
                escapeDoubleQuotes(t) {
                    return "string" == typeof t ? t.replace(/\"/g, '\\"') : t
                }
            }
        }
    },
    function(t) {
        t(t.s = 5209)
    }
]);