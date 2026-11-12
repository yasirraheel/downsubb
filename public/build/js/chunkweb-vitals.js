"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [650], {
        5565: function(e, n, a) {
            var t = a(8796);
            const o = e => {
                var n;
                let {
                    name: a,
                    delta: t,
                    value: o,
                    id: l,
                    rating: i
                } = e;
                null === (n = window) || void 0 === n || n.gtag("event", a, {
                    value: t,
                    value_category: i,
                    metric_id: l,
                    metric_value: o,
                    metric_delta: t
                })
            };
            (0, t.onCLS)(o), (0, t.onFID)(o), (0, t.onLCP)(o), (0, t.onFCP)(o), (0, t.onTTFB)(o), (0, t.onINP)(o)
        }
    }
]);