define(function(require, exports, module){
    require('./lib/jquery.SuperSlide.2.1.2.js');
    var cheche= require('./common.js');
    cheche.init();
    cheche.isToMobile();
    var Util=cheche.Util;
    var API=cheche.API;
    var Track=cheche.Track;
    var home = {
        /*banner 轮播处理*/
        bannerSlid: function () {
            jQuery(".banner-slid").slide({
                mainCell: ".bd ul",
                effect: "leftLoop",
                autoPlay: true,
                easing: "easeOutCirc",
                delayTime: 1000,
                pnLoop: false
            });
        },
        //顶部报价部分轮播滚动单条
        slidToTop: function () {
            jQuery(".txtScroll-top").slide({
                titCell: ".hd ul",
                mainCell: ".bd ul",
                autoPage: true,
                effect: "topLoop",
                autoPlay: true,
                vis: 5
            });
        },
        //车主信息切换
        chezhuChange: function () {
            var chezhuData = {
                'myf': {
                    title: '体验聊天买车险，真酷',
                    subTitle: '买车险很无聊的，不如选个妹子聊聊天',
                    image: 'myf-big.png',
                    content: '选一个客服妹子,愉快的聊聊天,再选一个保险公司,愉快的付完钱',
                    subContent: '聊天买车险就像下楼吃饭一样，几句寒暄之后，事情就解决了，从未有过的愉快，从未有过的简单',
                    desc: '育果医生 创始人'
                },
                'xxp': {
                    title: '绿色出行，不开车领现金',
                    subTitle: '车不是房，闲置不会增值，但绿色出行可以',
                    image: 'xxp-big.png',
                    content: '一年要买365天的车险， 而我只开车200天，剩下的时间怎么办？在绿色出行换成现金，不开车的日子也挣钱',
                    subContent: '绿色出行大概是最理想车险，不需要安装任何莫名其妙的硬件，只需要打开手机，选择今天不开车，然后就能领现金',
                    desc: "神州数码网络大学校长"
                },
                'dsy': {
                    title: '你要的，是性价比',
                    subTitle: '便宜的车险不一定划算，划算的车险却可以很便宜',
                    image: 'dsy-big.png',
                    content: '花一样的钱，选到更大牌的保险公司，相比较为了省钱而选不满意的，我认为这样才是性价比最高的选择',
                    subContent: '车车车险只需提交一次信息，就能获取最多15家保险公司的报价，这足以让你选出最具性价比的选择',
                    desc: '三个爸爸 创始人'
                },
                'gx': {
                    title: '关于理赔，你能得到更多',
                    subTitle: '理赔就像打官司，就连吵架都是律师更有效',
                    image: 'gx-big.png',
                    content: '事故理赔虽然只是小概率事件，一旦遇到，你有信心完美索赔吗？如果有十多年理赔经验的车车管家在旁全程指导呢？',
                    subContent: '事故现场的一个小疏忽，就可能白白损失几万块，为了避免这个损失，车车特聘请有十多年车险理赔经验的车险顾问，让你感受完美理赔是一种怎样的体验',
                    desc: '睿格VR 创始人'
                }

            };
            var imagePath ='/website/wp-content/themes/cheche/assets/v2/images/home/';
            $('.chezhu-left').on('mouseover ', function (e) {
                var target=$(e.target).closest('[data-name]');
                var type = target.data('name') || 'dsy';
                var targetName=$('.chezhu-photo').attr('name');
                if(type==targetName) return ;
                changeChezhu(type)
            });
            function changeChezhu(type){
                $('.chezhu-photo').hide();
                $('.chezhu-tip').hide();
                $('.chezhu-photo').attr('src', imagePath + chezhuData[type].image).fadeIn(300,function(){
                    $('.chezhu-tip').fadeIn(300);
                }).attr('name',type);

                $('.chezhu-t').html(chezhuData[type].title);
                $('.chezhu-s-t').text(chezhuData[type].subTitle);
                $('.chezhu-c').text(chezhuData[type].subTitle);
                $('.chezhu-name').attr('src', imagePath + type + '.png');
                $('.chezhu-desc').text(chezhuData[type].desc);
                $('.chezhu-content').text(chezhuData[type].content);
                $('.chezhu-subC').text(chezhuData[type].subContent);

            }
        },
        //理赔轮播切换
        lipeiSlide:function(){
            jQuery(".lipei-exp").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true,easing:"easeInQuint",
                endFun:function(i,c,s){
                    $('.lipei-temp li').eq()
                    $('.slider-lipei').removeClass('show');
                    $('.slider-lipei').eq(i).addClass('show');
                }});
        },
        //切换攻略部分
        tooglePsp:function(){
            $('.t-s-container').hover(function(){
                $(this).addClass('active').siblings().removeClass('active')
            })
        },
        //报价弹出框展示
        showPopup:function(){
            var self= this;
            var title='<img src="" alt="" height="0.86rem">'
            $('[data-quto]').on('click',function(e){
                var qutoType=$(e.target).closest('[data-quto]').data('quto');
                if(qutoType){
                    Util.showPopup(function () {
                        var imgUrl='/website/wp-content/themes/cheche/assets/v2/images/insurance/'+qutoType+'-big.png';
                        $('.p-title img').attr('src',imgUrl);
                        var track=$(e.target).closest('[data-track]').data('track')+'_submit';
                        $('.submit-b').attr('data-track',track);
                        $('.popup-sweep .submit-b').on('click',function(e){
                            Track.collection(e);
                        })
                        self.submitInfo();
                    },title,$('.quto-submit-html').html());
                };

            })

        },

        //提交报价信息
        submitInfo:function(callback){
            var resMsg={
                success:'尊敬的用户，您的报价请求已为您提交至保险公司，请等候专人与您联系，谢谢！',
                error:'提交失败！请重新输入或拨打4000-150-999咨询客服'
            }
            $('.submit-b').on('click',function(){
                var license=$(this).siblings('.license');
                var phone=$(this).siblings('.phone');
                var isLicense=Util.validateLicenseNo(license.val());
                if(!isLicense.flag){
                    Util.errormsg(license,isLicense.msg)
                }else if(!Util.isPhone(phone.val())){
                    Util.errormsg(phone,'请输入正确的手机号')
                }else{
                    API.postData('/v1.5/marketings/201707004',{
                        mobile:phone.val(),
                        licensePlateNo:license.val()
                    },function(data){
                        if(data.code=='200'){
                            Util.showMsg(resMsg['success'],'success',$('.submit-msg-html').html());

                        }else{
                            Util.showMsg(resMsg['error'],'error',$('.submit-msg-html').html(),'&#xe64a;');
                        }
                        Util.resetQuto();
                    })

                    if(typeof callback == 'function'){
                        callback()
                    }
                }
            });
        },
        //切换高亮
        changHonor:function(){
            Util.changeHight($('.honor-c1 li'),'rd-active');
            Util.changeHight($('.honor-c2 li'),'acc-active');
        },
        //媒体查询
        loadMdia:function(){
            API.getData('/website/wp-admin/admin-ajax.php?action=getReport',{},function(data){
                $("#media").html(data&&data.responseText);
            })
        },
        //获取投保信息
        getCount:function(){
            API.getData('/v1.5/system/count',{},function(data){
                if(data.code=='200'){
                    var data=data.data;
                    var  insured=data.insured&&Util.toThousands(data.insured) || '--';
                    var  totalAmount=data.totalAmount&&Util.toThousands(data.totalAmount) || '--';
                    var  savedMoney=data.savedMoney&&Util.toThousands(data.savedMoney) || '--';
                    var  claimCount=data.claimCount&&Util.toThousands(data.claimCount) || '--';

                    $('.ghs-title b').text(insured );
                    $('.amount-no').text(totalAmount);
                    $('.chezhu-save').text(savedMoney);
                    $('.ass-lipei').text(claimCount);
                    var newDate=Util.getDate();
                    $('.new-date').text(newDate);
                }
            })
        }
    }
    $(function () {
        Util.preLoadImg('../images/',['home/banner/banner1.jpg']);
        home.loadMdia();
        Util.closeFix();
        // home.bannerSlid();
        home.chezhuChange();
        home.getCount();
        home.lipeiSlide();
        home.slidToTop();
        home.tooglePsp();
        home.showPopup();
        home.submitInfo();
        home.changHonor();
    })
    //   })
})