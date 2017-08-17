/**
 * Created by cheche on 2017/8/9.
 */
define(function(require, exports, module){
    /**
     * 点击处理埋点
     */
    module.exports = {
        init:function(){
            this.loadGa('UA-66493876-11');
            this.loadBaidu();
            this.sendTrack();
        },
        loadGa: function (code) {
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

            ga('create', code, 'auto');
            ga('send', 'pageview');

        },
        loadBaidu: function () {
            var _hmt = _hmt || [];
            (function () {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?40477464bf81de4fa931fc7c7dae4575";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        },
        collection: function (e) {
            function sendCode(platform, code) {
                var platform = platform ? platform : 'M';
                try {
                    ga('send', 'event', platform, 'click', code);
                } catch (e) {
                    console.log('ga is not a function');
                }
                //百度跟踪代码
                try {
                    _hmt.push(['_trackEvent', platform, 'click', code]);
                } catch (e) {
                }
            }
            e = e || window.event;
            var track = $(e.target).closest("[data-track]").data('track');
            track && sendCode('PC', track);



        },
        sendTrack:function(){
            var self = this;
            $('[data-track]').on('click',function (e) {
                e.stopPropagation();
                self.collection(e)
            })
        }
    };
})