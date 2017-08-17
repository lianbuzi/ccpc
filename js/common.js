define(function(require, exports, module){
    var Track=require('./sendTrack.js');
    Track.init();
    module.exports= {
    init:function(){
        var self= this;
        this.isLogin();
        this.showSalerByTime();
        this.Track=Track;
        window.onload=function(){
            self.initKefuFloat();
            self.saleAfter();
            self.salePre();
        }
    },
    /**
     * 移动端用户浏览跳转 duoyun
     * @returns {boolean}
     */
    isToMobile: function () {
        var str = location.search
        var res = this.Util.parseSearch(str);
        var par = res['index'];
        if (par != 'gfan') {
            var ua = navigator.userAgent.toLowerCase();
            var contains = function (a, b) {
                if (a.indexOf(b) != -1) {
                    return true;
                }
            };
            //改成wap手机版页面地址
            var toMobileVertion = function () {
                window.location.href = '/duoqun'
            }
            if (contains(ua, "ipad") || (contains(ua, "rv:1.2.3.4")) || (contains(ua, "0.0.0.0")) || (contains(ua, "8.0.552.237"))) {
                return false
            }
            if ((contains(ua, "android") && contains(ua, "mobile")) || (contains(ua, "android") && contains(ua, "mozilla")) || (contains(ua, "android") && contains(ua, "opera"))
                || contains(ua, "ucweb7") || contains(ua, "iphone")) {
                toMobileVertion();
            }
        }
    },

    _isLogin: null,
    isLogin: function (afterCallback) {
        var self = this;
        if (this._isLogin == null) {
            this.API.getData("/v1.3/users/hasLogin", {}, function (response) {
                if (response.code == 200 && response.data && response.data.result == true) {
                    self._isLogin = true;
                    self._loginMobile = response.data.mobile;
                }
                else{
                    self._isLogin = false;
                    (typeof afterCallback  == 'function' )&& afterCallback.apply(self, {});
                }

            });
        }
    },

    /**
     * 在线客服 右侧浮动
     * **/
    initKefuFloat:function(){
        $('body').append('<div class="u-bar"> <div class="sub-bar"><ul><li id="online-saler" data-track="fuchuang_zixun" ></li><li class="qr" data-track="fuchuang_app"><div class="qr-code down1"></div></li><li class="qr" data-track="fuchuang_wechat"><div class="qr-code"></div></li></ul><div class="j-top scroll2Top"></div></div></div>')
        this.showSalerPopup();
        this.Util.middleTop($('.u-bar'),37);
        this.Util.scroll2top();
        $('.qr').on('click',function(e){
                Track.collection(e)
        })
        //Track.sendTrack();
    },

    salePre:function(){
        $('[data-presale]').on('click',function(){
            openZoosUrl('chatwin');
        })
    },
    saleAfter:function(){
        $('[data-aftersale]').on('click',function(){
            window.open('http://ala.zoosnet.net/LR/Chatpre.aspx?id=ALA38577497&lng=cn&oname=%e5%b0%8f%e6%b7%87','_blank')
        })
    },
    /**
     * 30s,90s各弹出客服层
     * */
    showSalerByTime:function(){
        var self= this;
        var salerPopupM= $('.sale-girl');
        this.timer30=window.setTimeout(function(){
            showSP();
        },30000);
        this.timer90=window.setTimeout(function(){
            showSP();
        },90000);
        function showSP(){
            if($('.popup-sweep').length) return false;
            if(!salerPopupM.lenth) {
                self.initOnlineSale()
            }
        }
    },
    /***
     *客服弹出层UI
     */
    initOnlineSale:function(){
        var imagePath ='/website/wp-content/themes/cheche/assets/v2/';
        var salePopupHtml=' <img src="'+imagePath+'images/kefu/kefugroup.png" alt="" class="sale-girl">'+
            '<ul>'+
            '<li data-presale="LR_User_Icon0">'+
            '<img src="'+imagePath+'images/kefu/kefu01.jpg" alt="">'+
            '<div class="kefu-button" data-track="yue_zixun">立即咨询</div>'+
            '</li>'+
            '<li data-presale="LR_User_Icon0">'+
            '<img src="'+imagePath+'images/kefu/kefu02.jpg" alt="">'+
            '<div class="kefu-button" data-track="jia_zixun">立即咨询</div>'+
            '</li>'+
            '<li data-presale="LR_User_Icon0">'+
            '<img src="'+imagePath+'images/kefu/kefu03.jpg" alt="">'+
            '<div class="kefu-button" data-track="xiao_zixun">立即咨询</div>'+
            '</li>'+
            '</ul>'+
            '<ul>'+
            '<li data-presale="LR_User_Icon0">'+
            '<img src="'+imagePath+'images/kefu/kefu04.jpg" alt="">'+
            '<div class="kefu-button" data-track="bing_zixun">立即咨询</div>'+
            '</li>'+
            '<li data-presale="LR_User_Icon0">'+
            '<img src="'+imagePath+'images/kefu/kefu05.jpg" alt="">'+
            '<div class="kefu-button" data-track="wei_zixun">立即咨询</div>'+
            '</li>'+
            '<li data-aftersale="LR_User_Icon0">'+
            '<img src="'+imagePath+'images/kefu/kefu06.jpg" alt="">'+
            '<div class="kefu-button" data-track="shouhou_zixun">立即咨询</div>'+
            '</li>'+
            '</ul>'
        var self= this;
        self.Util.showPopup(function(){
            $('.popup-sweep .quto-contnet').addClass('sale-popup').css({top:0,left:0});
            self.Util.initPopup($(".popup-sweep .quto-contnet"));
            self.salePre();
            self.saleAfter();
            $('.kefu-button').on('click',function(e){
                Track.collection(e)
            })
        },'',salePopupHtml);


    },
    /***
     * 点击右侧在线客服弹出客户
     */
    showSalerPopup:function(){
        var self= this;
        $('#online-saler').on('click',function(){
            self.initOnlineSale();
        })
    },
    Util: {
        /***
         *
         * @param arr 加载图片数组
         */
        preLoadImg:function(path,arr,callback){
            var k=0,url= path||'/website/wp-content/themes/cheche/assets/v2/images/';
            if(arr){
                for(var i=0;i<arr.length;i++){
                    var img=new Image();
                    img.src=url+arr[i];
                    img.onload=function(){
                        k++;
                        if(k==i&&(typeof callback =='function')){
                            callback();
                        }
                    }
                }
            }

        },
        /**
         * 适配窗口设置html-size
         */
        resetWindow:function(){
            $(window).load(function ()// 绑定到窗口的这个事件中
            {
                var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
                var wW = window.innerWidth;// 当前窗口的宽度
                var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
                $('html').css('font-size', rem + "px");
            });
        },
        getDate:function(){
            var date=new Date();
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            return year+'年'+month+'月';
        },
        /**
         * 验证手机号
         * @param str
         * @returns {boolean}
         */
        isPhone: function (str) {
            return /^1[3|4|5|7|8]\d{9}$/.test(str);
        },
        isChineseChar: function (str) {
            var reg = new RegExp(/[\u4E00-\u9FA5\uF900-\uFA2D]/);//判断是否包含中文字符,正正则表达式,也可以检测日文,韩文
            return reg.test(str);
        },
        /**
         * 验证车牌号
         * @param licensePlateNo
         * @returns {{licensePlateNo: (string|*), flag: boolean, msg: string}}
         */
        validateLicenseNo: function (licensePlateNo) {
            licensePlateNo = licensePlateNo.toUpperCase();
            var flag = false, msg = '';
            if (licensePlateNo == '') {
                msg = "请输入正确的车牌号";
            } else if (!this.isChineseChar(licensePlateNo.substring(0, 1))) {
                msg = "车牌号地区简称应为中文"
            } else if (!/^[a-zA-Z]/.test(licensePlateNo.substring(1, 2))) {
                msg = "车牌号地区之后应为字母"
            } else if ("京B" == licensePlateNo.substring(0, 2)) {
                msg = "不支持京B开头的车牌号"
            } else if (this.isChineseChar(licensePlateNo.substring(1))) {
                msg = "车牌号地区之后不应有中文"
            } else if (licensePlateNo.length > 8) {
                msg = "车牌号最长是8位";
            } else if (licensePlateNo.length < 7) {
                msg = "车牌号最小长度是7位";
            } else {
                flag = true;
            }
            return {licensePlateNo: licensePlateNo, flag: flag, msg: msg};
        },
        errormsg: function (obj, str, time) {
            var t = time || 2000;
            obj.val(str).addClass('error');
            window.setTimeout(function () {
                obj.val('').removeClass('error').focus();
            }, t)
        },
        //浏览器获取参数
        parseSearch: function () {
            var obj = {};
            var search = location.search.substring(location.search.indexOf("?") + 1);
            if (search) {
                search = search.split("&");
                for (var i in search) {
                    var tmp = search[i].split("=");
                    obj[tmp[0]] = tmp[1];
                }
            }
            return obj;
        },
        /***
         * 初始化弹出框
         * @param pop
         */
        initPopup:function(pop){
            var pH=+pop.height();
            var pW=+pop[0].clientWidth;
            var sH=+window.screen.height;
            var top=(sH-pH)/200;
            var left=-pW/2;
            pop.css({top:top+'rem',left:left+'px'});
        },
        /**
         * 创建弹出框
         * @param title
         * @param content
         * @param callback
         */
        showPopup: function (callback, title, content) {
            var self = this;

            $('.popup-sweep').length==0&&$("body").append('<div class="popup-sweep"></div>');
            $(".popup-sweep").html('<div class="quto-contnet popup-contain"><i class="popup-close">&times;</i><div class="p-title">'+title+'</div><div class="p-content shadow">'+content+'</div></div>');
            $('.popup-sweep').fadeIn('300').find('input').text('');
            $('body').addClass('no-scroll');
            if (typeof callback == 'function') {
                callback();
                this.initPopup($(".popup-sweep .quto-contnet"));
            }
            $('.popup-sweep').on('click', function (e) {
                e.stopPropagation();
                var target = $(e.target);
             if (!target.parents().hasClass('popup-sweep') || target.hasClass('popup-close')) {
                    self.closePopup();
                }
            })
        },
        /***
         * 回调信息展示
         * @param msg  展示信息
         * @param type  回调类型
         * @param content 展示html
         * @param markText iconfont
         */
        showMsg:function(msg,type,content,markText){
            var self=this;
            var title='<span class="p-tip">提示</span>';
            var tClass=type||'success';
            this.showPopup(function () {
                $('.quto-contnet').addClass('msg-box');
                $('.msg-box .msg-mark').addClass(tClass);
                markText&&$('.msg-box .msg-mark').html(markText);
                $('.msg-text').text(msg);
                $('.p-close').on('click',function(){
                    self.closePopup(500);
                })
            },title,content);
        },
        /**
         * 关闭弹出框
         */
        closePopup: function (time) {
            var self= this;
            var t = time || 0
            window.setTimeout(function () {
                $('.popup-sweep').length && $('.popup-sweep').fadeOut(300).remove();
                $('body').removeClass('no-scroll');
                self.resetQuto();
            }, t)

        },
        /**
         * 重置输入框
         * */
        resetQuto:function(){
            $('input[type=text]').val('');
        },
        /****
         * 关闭吸低
         */
        closeFix: function () {
            $('.fix-close').click(function () {
                $('.fix-bottom').hide()
            })
        },
        /**
         *hover 高亮显示
         * **/
        changeHight: function (obj, cls) {
            obj.hover(function () {
                $(this).addClass(cls).siblings().removeClass(cls)
            })
        },
        /***
         *滚动到 顶部
         */
        scroll2top: function () {
            $(window).scroll(function () {
                var sY = +$(window).scrollTop();
                var sH = +window.screen.height;
                if (sY > sH) {
                    $('.scroll2Top').show()
                } else {
                    $('.scroll2Top').hide()
                }
            });
            $('.scroll2Top').on('click', function (e) {
                e.stopPropagation();
                $('body,html').animate({scrollTop: 0}, 200);

            })

        },
        /****
         *
         * @param num
         * @param precision
         * @param separator
         * @returns {*}
         */
       toThousands:function(num,precision, separator){
           var parts;
           // 判断是否为数字
           if (!isNaN(parseFloat(num)) && isFinite(num)) {
               num = Number(num);
               // 处理小数点位数
               num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
               // 分离数字的小数部分和整数部分
               parts = num.split('.');
               // 整数部分加[separator]分隔, 借用一个著名的正则表达式
               parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

               return parts.join('.');
           }
           return NaN;
        },
        /***
         *
         * @param obj
         */
        middleTop:function(obj,h){
            var oH=obj[0].clientHeight;
            var top=isNaN(h) ? -oH/2:-(oH+h)/2
            obj.css({"margin-top":top+'px','top':'50%'});

        },
        middleLeft:function(obj){
            var oW=obj[0].clientWidth;
            var left=-oH/2
            obj.css({left:'50%','margin-left':left+'px'});
        },
        middleAll:function (obj) {
            var oW=obj[0].clientWidth;
            var left=-oH/2
            obj.css({left:'50%','margin-left':left+'px'});
            var oH=obj[0].clientHeight;
            var top=-oH/2
            obj.css({"margin-top":top+'px','top':'50%'});
        }
    },
    API: {
        getData: function (url, params, callback) {
            var self = this;
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                data: params
            }).always(function (data) {
                callback && typeof callback === 'function' && callback.apply(this, arguments);
            });
        },
        postData: function (url, params, callback) {
            var self = this;
            $.ajax({
                contentType: "application/json;",
                type: "POST",
                url: url,
                dataType: "json",
                data: JSON.stringify(params),
                success: function (response) {
                    callback && typeof callback === 'function' && callback.apply(this, arguments);
                }
            });
        }
    }

};


})