var
    app = require('./app'),
    _echart = require('../modules/echart'),
    animate = require('../modules/newanimate'),
    listenType = _Fn.isMobile() ? 'touchend' : 'click',
    is_app = $('#is_app').val(),
    app_type = $('#app_type').val(),
    share_uid = $('#data-share_uid').val(),
    dataUrl = $('.my-bill-btn').attr('data-url'),
    weiXinInvite = $('.fn-invite-weixin'),
    picInvite = $('.share-bill'),
    dobackground = $('.dobackground').html(),
    doloan = $('.doloan').html(),
    getmonth = $('.getmonth').html(),
    month=$("#month").val(),
    year=$("#year").val(),
    timepage = $('.timepage').html(),
    doperiod = $('.doperiod').html();

//微信分享
var wxReady = require('../modules/jssdk');
var wxShareTitle = $('.wxShareTitle').val();
var wxShareDesc = $('.wxShareDesc').val();


var lasttime = {
    place1: null,
    place2: null,
    place3: null
};
var mySwiper = new Swiper('.swiper-container', {
    direction:'vertical',
    nextButton: '.swiper-button-next',
    parallax : true,
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function(swiper){
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    },
    onTransitionStart: function(swiper){
        $('.jumps').each(function(){
            var that = $(this);
            var indexnub = that.attr('attr-index');
            that.html(indexnub);
        })
    },
    onTransitionEnd: function(swiper){
        $('.jumps').each(function(){
            var that  = $(this);
            var indexnub = that.attr('attr-index');
            that.html(indexnub);
            var index = that.attr('attr-idx');
            if(lasttime['place'+index]==null){
                animate.jump(that,1);
                lasttime['place'+index]=new Date().getTime();
            }else{
                if(new Date().getTime() - lasttime['place'+index] > 820){
                    animate.jump(that,0);
                    lasttime['place'+index]=new Date().getTime();
                }
            }

        })
        var activeindex = swiper.activeIndex;
        if(timepage!=0){
            if(activeindex==1 || activeindex==2 || activeindex==3 || activeindex==4 || activeindex==5 ){
                $('.swiper-button-next').css('display','block');
            }
            if(activeindex==0 || activeindex==6){
                $('.swiper-button-next').css('display','none');
            }
            if(activeindex==4){
                viewEchart('charts-main',resetPieOption());
            }
            if(activeindex==5){
                viewEchart('charts-context',plantbjOption());
            }
        }else{
            if(activeindex==1 || activeindex==2 || activeindex==3 || activeindex==4 ){
                $('.swiper-button-next').css('display','block');
            }
            if(activeindex==0 || activeindex==5){
                $('.swiper-button-next').css('display','none');
            }
            if(activeindex==4){
                viewEchart('charts-context',plantbjOption());
            }
        }

    }
});
//echarts
function viewEchart(id,option){  //Echarts图表
    window.require(['echarts', 'echarts/chart/bar', 'echarts/chart/line','echarts/chart/radar','echarts/chart/pie'],
        function (echarts) {
            var myChart = echarts.init(document.getElementById(id));
            if(!myChart){return;}
            myChart.setOption(option);
        }
    )

}
var term = $('.term').html();
    term = eval(term);
var domore = $('.domore').html();
    domore =  eval(domore);
var doplatform = $('.doplatform').html();
    doplatform = eval(doplatform);
function resetPieOption(){ //配置饼图option
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#06d3ff', '#509bff','#ff7878','#fff','#fef018'],
        series: [
            {
                name:'投资金额',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '20%'],

                label: {
                    normal: {
                        show: false,
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:domore[1],
                        itemStyle: {
                        normal: {
                            color: '#3f7ccd',
                            labelLine: { show: false}
                        }
                    }},
                    {value:domore[0],
                        itemStyle: {
                            normal: {
                                color: '#509bff',
                                labelLine: { show: false}
                            }
                        }}
                ]
            },
            {
                name:'投资时间',
                type:'pie',
                radius: ['35%', '50%'],
                center: ['50%', '50%'],
                data:term,
                itemStyle: {
                    normal: {
                        label: {
                            textStyle: {
                                // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                fontSize:12*getsize()
                            }
                        },
                        labelLine: {
                            show: true,
                            length:20*getsize()
                        }
                    }
                }
            }
        ]
    };
    return option
}


function getsize(){
    var b = {},d, e = window.document,
        f = e.documentElement,
        g = e.querySelector('meta[name="viewport"]'),
        h = e.querySelector('meta[name="flexible"]'),
        i = 0,
        j = 0,
        k = b.flexible || (b.flexible = {});
    if (g) {
        var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        l && (j = parseFloat(l[1]), i = parseInt(1 / j))
    } else if (h) {
        var m = h.getAttribute("content");
        if (m) {
            var n = m.match(/initial\-dpr=([\d\.]+)/),
                o = m.match(/maximum\-dpr=([\d\.]+)/);
            n && (i = parseFloat(n[1]), j = parseFloat((1 / i).toFixed(2))),
            o && (i = parseFloat(o[1]), j = parseFloat((1 / i).toFixed(2)))
        }
    }
    if (!i && !j) {
        var p = (a.navigator.appVersion.match(/android/gi), a.navigator.appVersion.match(/iphone/gi)),
            q = a.devicePixelRatio;
        i = p ? q >= 3 && (!i || i >= 3) ? 3 : q >= 2 && (!i || i >= 2) ? 2 : 1 : 1,
            j = 1 / i
    }
    return i;
}


function plantbjOption(){ //配置饼图option

    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#fef018', '#fff','#2efbfd','#06d3ff','#ff7878','#509bff'],
        series: [

            {
                name:'平台背景',
                type:'pie',
                radius: ['20%', '40%'],
                center: ['50%', '50%'],
                data:doplatform,
                itemStyle: {
                    normal: {
                        label: {
                            textStyle: {
                                fontSize:12*getsize()
                            }
                        },
                        labelLine: {
                            show: true,
                            length:20*getsize()
                        }
                    }
                }
            }
        ]
    };
    return option
}

$('.seemybill').on('touchend',function(){
    mySwiper.slideNext();
})
$('.generate-bill').on('touchend',function(){
    mySwiper.slideNext();
})

window.dopop = function dopop(){
    $.ajax({
        url: '/bill/share',
        type: 'post',
        data: {
            "year":year,
            "month":month
        },
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                $('.black-bj').css('display','block');
                $('.send-prizes').css('display','block');
                $('body').on('touchend','.send-prizes-btn',function(){
                    $('.black-bj').css('display','none');
                    $('.send-prizes').css('display','none');
                })
            }
        }
    })
}

function sharebill(){
    $('.black-bj').css('display','block');
    $('.share-bill').css('display','block');
}

$('body')
    .on(listenType,'#lightbox_wrap,.send-prizes-btn',function(){
        _Fn.lightboxWrap()._fadeOut();
        weiXinInvite.fadeOut();
        picInvite.fadeOut();
    })
$('.my-bill-btn').on('touchend',function(){
    if(is_app == 1){
        var params = {
            'desc':'我的'+getmonth+'月账单_网贷天眼',
            'title':'我的'+getmonth+'月账单_网贷天眼',
            'url' : dataUrl,
            'imgUrl' : ''};
        if(window.BillJSInterface && window.BillJSInterface.resultWxShareInfo){//andoid
            window.BillJSInterface.resultWxShareInfo(JSON.stringify(params));
        }else{//iso
            window.webkit.messageHandlers.billShare.postMessage(params);
        }
    }else {
        if (!_Fn.isBind())return false;
        if (_Fn.isWeiXin()) {
            _Fn.lightboxWrap()._fadeIn();
            weiXinInvite.show();
        } else {
            _Fn.lightboxWrap()._fadeIn();
            picInvite.show();
            $.ajax({
                url: '/bill/share',
                type: 'post',
                data: {
                    "year":year,
                    "month":month
                },
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {

                    }
                }
            })
        }
    }
})

wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        success:function(){
            $.ajax({
                url: '/bill/share',
                type: 'post',
                data: {
                },
                dataType: 'json',
                success: function (res) {
                    if (res.code == 200) {
                        if(res.data.code == 4514){
                            _Fn.alert('惊喜只能领取一次，请至【我的】中查看哦');
                        }
                    }
                }
            })
        },
        link: dataUrl, // 分享链接
        title: wxShareTitle,
        desc:wxShareDesc
    });
})

$('.look-eye-item').on('click',function(){
    if(is_app == 1){
        var appjson = {'app_name' : 'p2plicai', 'pn' : 1, 'period' : doperiod ,'background ':''};
        var appjsondata = JSON.stringify(appjson);
        if(window.BillJSInterface && window.BillJSInterface.jumpManageList){//andoid标的列表
            window.BillJSInterface.jumpManageList(appjsondata)   //跳转标的列表
        }else{//iso
            window.webkit.messageHandlers.searchLoans.postMessage(appjson)
        }
    }

})

$('.look-eye-background').on('click',function(){
    if(is_app == 1){
        var appjson = {'app_name' : 'p2plicai', 'pn' : 1, 'period' : '','background ':dobackground};
        var appjsondata = JSON.stringify(appjson);
        if(window.BillJSInterface && window.BillJSInterface.jumpManageList){//andoid标的列表
            window.BillJSInterface.jumpManageList(appjsondata)   //跳转标的列表
        }else{//iso
            window.webkit.messageHandlers.searchLoans.postMessage(appjson)
        }
    }

})

$('.ibds-a').click(function(){
    if(is_app == 1 && app_type=='licaiapp'){
        var appjson = doloan;
        var appjsondata = JSON.stringify(appjson);
        if(window.BillJSInterface && window.BillJSInterface.jumpManageDetails){//andoid标的列表
            window.BillJSInterface.jumpManageDetails(appjsondata)   //跳转标的列表
        }else{//iso
            window.webkit.messageHandlers.enterLoanDetail.postMessage(appjson)
        }
    }
})

//横屏竖屏　提示
 function shupingTip(){
    var $shuping = $('#shupingTip');
    if($shuping.length == 0){
        var shupingHtml = '<div id="shupingTip" class="shuping"><div class="content"><img class="img" src="/styles/images/topic/xtyyh/mobile/shenpingshuping.jpg"><div class="text">为了更好的体验，请使用竖屏浏览</div></div></div>';
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
/**
 * 判断屏幕是否横屏
 */
window.addEventListener('orientationchange', function(event){
    if ( window.orientation == 90 || window.orientation == -90 ) {
        shupingTip();
    }else{
        //$('#shupingTip').click().touchend();
        $('#shupingTip').hide();
    }
});