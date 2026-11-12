"use strict";
(self.webpackChunksavefrom_net = self.webpackChunksavefrom_net || []).push([
    [7832], {
        1539: function(e, s, i) {
            var a = i(2396);
            a((function() {
                const e = a(".owl-carousel");
                e.length && (e.removeClass("owl-carousel").wrapInner('<div class="swiper-container says-swiper-container"><div class="swiper-wrapper"></div></div>'), a(".says-swiper-container").append('<div class="swiper-pagination"></div>').find(".says__item").addClass("swiper-slide"), new Swiper(".says-swiper-container", {
                    pagination: {
                        el: ".swiper-pagination"
                    },
                    watchOverflow: !0,
                    slidesPerView: 1,
                    spaceBetween: 10,
                    breakpointsBase: "container",
                    breakpoints: {
                        426: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        769: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }
                }))
            })), a(".faq_item_title").on("click", (function() {
                var e = a(this).closest(".faq_item");
                e.siblings(".active").removeClass("active"), e.toggleClass("active")
            }))
        },
        2396: function(e) {
            e.exports = window.$
        }
    },
    function(e) {
        e(e.s = 1539)
    }
]);