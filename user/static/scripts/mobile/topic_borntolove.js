var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    countDown = require('../modules/countDown'),
    formMod = require('../modules/form'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    jPages = require('../plugins/jPages.min'),
    nowTime = $('body').attr('data-nowtime'),//当前时间戳（php）
    template = require('../modules/template');


//微信分享
var wxReady = require('../modules/jssdk');
var wxShareTitle = $('.wxShareTitle').val();
var wxShareDesc = $('.wxShareDesc').val();
wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        title : wxShareTitle,
        desc : wxShareDesc

    });
});
window.onload = function() {
    var hasCookie = $.cookie('hadlook');
    if (hasCookie) {
        $(".cover").css('display', 'none');
        $('.cartoon').css('display', 'none');
    }else{
        var bodyh = $(".cartoon").height();
        $('body').height(bodyh);
        $("body").css('overflow', "hidden");
        var heightW = $("body").outerHeight();
        $(".cover").css({
            height: heightW,
            width: "100%",
            display: 'block'
        });
        $('.cartoon').css('display', 'block')
    }
    $('.cartoon-bagin').click(function(){
        $.cookie('hadlook', '1', {expires: 30});
    })
    $('.cartoon-end').click(function () {
        $(".cover").css('display', 'none');
        $('.cartoon').css('display', 'none');
        window.location.reload();
        $('body').height();
        $('body').css('overflow', 'visible');
        $.cookie('hadlook', '1', {expires: 30});
    })


//福袋轮播
    var arr = [ "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00" ];
    var gettime = $('.nowtime').children('.time').text();
    var getnumb = $.inArray(gettime, arr);
    var mySwiper = new Swiper ('.mod-slider-bj', {
        direction: 'horizontal',
        loop: false,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        initialSlide:getnumb,
        autoplay:3600000
    })
    //$('.mod-slider-lb').bxSlider({
    //    controls: false,//左右按钮
    //    pagerActiveClass: 'active',
    //    pagerCustom: '.mod-slider-bj  .pager-wrap',
    //    autoHover: true,//将暂停，当鼠标悬停在滑块
    //    pause: 3600000,//自动滑动时停留时间，数字，ms
    //    infiniteLoop: false,//点击下一步，是否跳转
    //    slideMargin: 0,//幻灯片间距
    //    startSlide:getnumb,
    //    auto: false,//幻灯片是否自动过渡
    //    hideControlOnEnd: true,//“下一步”控制将被隐藏在最后一个幻灯片
    //    prevText: '',
    //    nextText: '',
    //    nextSelector: '.next',
    //    prevSelector: '.prev'
    //});

//奖金池
    var strnum = 0;

    function pad(num, n) {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        strnum = num;
    }

    var money = Math.floor($('.moneyhide').text());
    var str = money;
    if (str < 0) {
        str = 0;
    }
    pad(str, 9);
    strnum = strnum.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('');
    var strarr = strnum.split('');
    var html = [];
    var moneyhtml = [];
    for (var i = 0; i < strarr.length; i++) {
        if (strarr[i] == ',') {
            html.push('<span class="comma">');
            html.push(',');
            html.push('</span>');
        } else {
            html.push('<span class="money-list">');
            html.push(strarr[i]);
            html.push('</span>');
        }
    }
    moneyhtml.push(html.join(""));
    $(".money").html(moneyhtml.join(""));

//前三名变红
    for (var i = 0; i < 3; i++) {
        $('.rank-content li').eq(i).addClass('topthree');
    }

//奖品轮播
    $('.mod-slider-prize').bxSlider({
        controls: false,//左右按钮
        pagerActiveClass: 'active',
        pagerCustom: '.prize  .pager-wrap',
        autoHover: true,//将暂停，当鼠标悬停在滑块
        pause: 2000,//自动滑动时停留时间，数字，ms
        infiniteLoop: false,//点击下一步，是否跳转
        slideMargin: 0,//幻灯片间距
        auto: false,//幻灯片是否自动过渡
        hideControlOnEnd: true,//“下一步”控制将被隐藏在最后一个幻灯片
        prevText: '',
        nextText: '',
        nextSelector: '.next',
        prevSelector: '.prev'
    });

//页面上方回放功能
    $('.playback').addClass('doswinging');


    var heightW = $("body").outerHeight();
    $(".bj").css({
        height: heightW,
        width: "100%"
    });

    $('.playback').on('touchend', function () {
        var doheight = $(window).height();
        var dotop = (doheight-244)/2;
        var chatop = dotop-42;
        $('.boxback').css('top',dotop);
        $('.boxback-btn').css('top',chatop);
        $('.bj').css('display', 'block');
        $('.boxback').css('display', 'block');
        $('.boxback-btn').css('display', 'block')
    })
    $('.boxback-btn').on('touchend', function () {
        $(this).css('display', 'none');
        $('.bj').css('display', 'none');
        $('.boxback').css('display', 'none');
    })

}
$('.jigsaw-examine').on('touchend',function(){
    if(!_Fn.isLogin())return;
    if(!_Fn.isBind())return;
    window.location.href="//licai.p2peye.com/topic/jigsaw";
})
//答题环节
$('.lucky').click(function(){
    if(!_Fn.isLogin())return;
    if(!_Fn.isBind())return;
    var newtime = $(this).siblings('.opendval').val();
    var that = $(this);
    $.ajax({
        url: '/topic/gettitle',
        type: 'post',
        data: {
            name: newtime
        },
        //async:false,
        dataType: 'json',
        success: function (res) {
            var htmlsearch = '';
            var  tinumb = '';
            if (res.code == 200) {
                var data = res.data;
                function doanswer() {
                    that.siblings('.question').html(template.render('problemTpl', {data: data}));
                    $('.error-close').click(function(){
                        $(this).parent('.question').css('display','none');
                        $(this).parent('.question').siblings('.lucky').css('display','block');
                    })
                }
                doanswer();
                that.css('display','none');
                that.siblings('.question').css('display','block')
                $('.answer').click(function(){
                    var val =  $(this).children('.answer-item').val();
                    tinumb=$(this).siblings('.tinumb').val();
                    var thatthis = $(this);
                        $.ajax({
                            url: 'giftbox',
                            type: 'post',
                            data: {
                                "id":tinumb,
                                "correct":val,
                                "name":newtime
                            },
                            //async:false,
                            dataType: 'json',
                            success: function (res) {
                                if (res.code == 200) {
                                    var data = res.data;
                                    thatthis.parent().parent('.question').html(template.render('successTpl', {data: data}));
                                }else if(res.code == 5190){
                                    var data = res.data;
                                    thatthis.parent().parent('.question').html(template.render('errorTpl', {data: data}));
                                    $('.error-close').click(function(){
                                        $(this).parent('.question').css('display','none');
                                        $(this).parent('.question').siblings('.lucky').css('display','block');
                                    })
                                    $('.error-btn').click(function(){
                                        $(this).parent().parent('.question').siblings('.lucky').click();
                                    })
                                }else if(res.code == 5180){
                                    var data = res.data;
                                    thatthis.parent().parent('.question').html(template.render('lateTpl', {data: data}));
                                }else{
                                    _Fn.alert(res.message)
                                }
                            }
                        })

                })
            }else if(res.code == 5112){
                var data = res.data;
                data.nowtime = newtime;
                that.siblings('.question').html(template.render('expectTpl', {data: data}));
                that.css('display','none');
                that.siblings('.question').css('display','block')
                $('.do-close').click(function(){
                    $(this).parent('.question').css('display','none');
                    $(this).parent('.question').siblings('.lucky').css('display','block');
                })
            }else if(res.code == 5180){
                var data = res.data;
                that.siblings('.question').html(template.render('lateTpl', {data: data}));
                that.css('display','none');
                that.siblings('.question').css('display','block')
                $('.do-close').click(function(){
                    $(this).parent('.question').css('display','none');
                    $(this).parent('.question').siblings('.lucky').css('display','block');
                })
            }else if(res.code == 5166){
                var data = res.data;
                that.siblings('.question').html(template.render('muchTpl', {data: data}));
                that.css('display','none');
                that.siblings('.question').css('display','block')
                $('.do-close').click(function(){
                    $(this).parent('.question').css('display','none');
                    $(this).parent('.question').siblings('.lucky').css('display','block');
                })
            }else{
                _Fn.alert(res.message)
            }
        }
    })
})

//默认排行
var linumb = $('.rank-content li').length;
if(linumb==0){
    for(var i=0;i<10;i++){
        $('.rank-content').append(" <li class='ranknumber'><span class='username'>虚位以待</span><span class='userscore'>0</span></li>");
    }
}

/**
* 判断屏幕是否横屏
*/
window.addEventListener('orientationchange', function(event){
    if ( window.orientation == 180 || window.orientation == 0 ) {
        $('#shupingTip').hide();
    }else{
        //$('#shupingTip').click().touchend();
        shupingTip();
        location.reload();
    }
});

//横屏竖屏　提示
function shupingTip(){
    var $shuping = $('#shupingTip');
    if($shuping.length == 0){
        var shupingHtml = '<div id="shupingTip" class="shuping"><div class="content"><img class="img" src="/styles/images/topic/borntolove/mobile/shenpingshuping.jpg"><div class="text">为了更好的体验，请使用竖屏浏览</div></div></div>';
        var $shupingDom = $(shupingHtml);
        $('body').append($shupingDom);
        /*$shupingDom.on('touchend click',function(e){
         $shupingDom.hide().find('img.img').removeClass('shupingAnimate');
         });*/
        $shupingDom.find('img.img').addClass('shupingAnimate')
    }else{
        $shuping.show().find('img.img').addClass('shupingAnimate');
    }
}