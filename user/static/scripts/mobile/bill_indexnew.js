var
    app = require('./app'),
    animate = require('../modules/newanimate'),
    listenType = _Fn.isMobile() ? 'tap' : 'click',
    weiXinInvite = $('.fn-invite-weixin'),
    picInvite = $('.share-bill'),
    dataUrl = $('[role-tap=share]').attr('data-url'),
    is_app = $('#is_app').val(),
    app_type = $('#app_type').val(),
    share_uid = $('#data-share_uid').val(),
    dobackground = $('.dobackground').html(),
    doloan = $('.doloan').val(),
    getmonth = $('.getmonth').val(),
    timepage = $('.timepage').val(),
    doperiod = $('.doperiod').val(),
    month=$("#month").val(),
    year=$("#year").val(),
    switchnext = $(".swiper-button-next"),
    chartsPiedule = $("#charts-piedule"),
    chartsPie = $("#charts-pie"),
    animateBar=$('[role-animate=bar]'),
    animateJump=$('[role-animate=jumps]'),
    prizeParent=$(".ui-send-prizes");

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
        $('[role-animate=jumps]').each(function(){
            var that = $(this);
            var indexnub = that.attr('attr-index');
              that.html(indexnub);
        })
    },
    onTransitionEnd: function(swiper){
        var activeindex = swiper.activeIndex;
        if(timepage!=0){
            if(activeindex==1 || activeindex==2 || activeindex==3 ){
                switchnext.css('display','block');
            }else {
                switchnext.css('display','none');
            }
            if(activeindex==0){
                mySwiper.lockSwipeToNext();
            }
            if(activeindex==1){
                chartsPiedule.html("");
                animateJump.each(function(){
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
                mySwiper.unlockSwipeToNext();
                animateBar.addClass("animarebar");
            }else{
                animateBar.removeClass("animarebar");
            }
            if(activeindex==2){
                chartsPie.html("");
                viewEchart('charts-piedule',resetPieOption());
            }else if(activeindex==3){
                chartsPiedule.html("");
                mySwiper.unlockSwipeToNext();
                viewEchart('charts-pie',plantbjOption());
            }else if(activeindex==4){
                chartsPie.html("");
                mySwiper.lockSwipeToNext();
            }
        }else{
            if(activeindex==0){
                mySwiper.lockSwipeToNext();
            }
            if(activeindex==1){
                mySwiper.unlockSwipeToNext();
                animateBar.addClass("animarebar");
                animateJump.each(function(){
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
            }else{
                animateBar.removeClass("animarebar");
            }
            if(activeindex==2){
                viewEchart('charts-piedule',resetPieOption());
            }else if(activeindex==3){
                chartsPiedule.html("");
                mySwiper.unlockSwipeToNext();
                viewEchart('charts-pie',plantbjOption());
            }else if(activeindex==4){
                chartsPie.html("");
                mySwiper.lockSwipeToNext();
            }
        }

    }

});
//关闭弹框
$('body')
    .on(listenType,'#lightbox_wrap,[role-tap=close]',function(){
        _Fn.lightboxWrap()._fadeOut();
        weiXinInvite.fadeOut();
        picInvite.fadeOut();
        return false;
    })
    .on(listenType,'[role-tap=close1]',function(){
        prizeParent.hide();
    })
    //生成账单点击
    .on(listenType,'[role-tap=bill]',function(){
        mySwiper.unlockSwipeToNext();
        mySwiper.slideNext();
    })
    //推荐标的跳转app需要的参数
    .on(listenType,'[role-tap=loan]',function(){
        if(is_app == 1 && app_type=='licaiapp'){
            var appjson = eval(doloan);
            var appjsondata = JSON.stringify(appjson);
            if(window.BillJSInterface && window.BillJSInterface.jumpManageDetails){//andoid标的列表
                window.BillJSInterface.jumpManageDetails(appjsondata)   //跳转标的列表
            }else{//iso
                window.webkit.messageHandlers.enterLoanDetail.postMessage(appjson)
            }
        }
    })
    //往期标的转app需要的参数
    .on(listenType,'[role-tap=timeslot]',function(){
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
    .on(listenType,'[role-tap=bgmarker]',function(){
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
    //立即分享的弹框
    .on('tap','[role-tap=share]',function(){
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
                return false;
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
//横屏竖屏　提示
 function shupingTip(){
    var $shuping = $('#shupingTip');
    if($shuping.length == 0){
        var shupingHtml = '<div id="shupingTip" class="shuping"><div class="content"><img class="img" src="/styles/images/topic/xtyyh/mobile/shenpingshuping.jpg"><div class="text">为了更好的体验，请使用竖屏浏览</div></div></div>';
        var $shupingDom = $(shupingHtml);
        $('body').append($shupingDom);
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
        $('#shupingTip').hide();
    }
});
//app 分享完的提示
window.dopop = function dopop(){
    $.ajax({
        url: '/bill/share',
        type: 'post',
        data :{
            "year":year,
            "month":month
        },
        dataType: 'json',
        success: function (res) {
            if (res.code == 200) {
                prizeParent.show();
            }
        }
    })
}
wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        success:function(){
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
var termdata = $('.termdata').html();
var domore = $('.domore').html();
var doplatform = $('.doplatform').html();
if(termdata){
    termdata = eval(termdata);
}
if(domore){
    domore =  eval(domore);
    var domoredata=[],domore1=[],domorearr=[];
    $.each(domore,function(i,n){
        $.each(n,function(index,main){
            if(index=="name"&&main!="0%"){
                domorearr.push(i);
            }
        });
    })
    if(domorearr.length>1){
        domore1=domore;
    }else {
        domore1.push(domore[domorearr]);
    }
    if(domore1.length>1){
        domoredata=[
                    {
                        name:domore1[0].name,
                        value:domore1[0].value,
                        itemStyle: {
                            normal: {
                                color: '#f49d9d',
                                labelLine: { show: false}
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>一万元以上 : {c} ({d}%)"
                        }
                    },
                    {
                        name:domore1[1].name,
                        value:domore1[1].value,
                        itemStyle: {
                            normal: {
                                color: '#ed6969',
                                labelLine: { show: false}
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/> 一万元以下: {c} ({d}%)"
                        }
                    },
                ];
    }else {
        if(domore1[0].type==1){//1万元以上
            domoredata=[
                    {
                        name:domore1[0].name,
                        value:domore1[0].value,
                        itemStyle: {
                            normal: {
                                color: '#ed6969',
                                labelLine: { show: false}
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/> 一万元以下: {c} ({d}%)"
                        }
                    }
                ];
        }else{
            domoredata=[
                    {
                        name:domore1[0].name,
                        value:domore1[0].value,
                        itemStyle: {
                            normal: {
                                color: '#f49d9d',
                                labelLine: { show: false}
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>一万元以上 : {c} ({d}%)"
                        }
                    }
                ];
        }
        
    }
}
if(doplatform){
    doplatform = eval(doplatform);
}
var color=['#92a9f9','#6ad1e4','#ef8369','#ffd295','#5582d1'];
function resetPieOption(){ //配置饼图option
    if(!domore)return;
    option = {
        color:color,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            textStyle: {
                fontSize:12*getsize()
            }

        },
        series: [
            {
                name:'投资金额',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '20%'],
                label: {
                    normal: {
                        position: 'inner',
                        align:'center',
                        textStyle: {
                            fontSize:12*getsize()
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:domoredata
            },
            {
                name:'投资时间',
                type:'pie',
                radius: ['35%', '50%'],
                center: ['50%', '50%'],
                data:termdata,
                itemStyle: {
                    normal: {
                        label: {
                            textStyle: {
                                // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                fontSize:12*getsize(),
                                color:"#666"
                            }
                        },
                        labelLine: {
                            show: true,
                            length:10*getsize(),
                            smooth: 0.1,
                            length2: 8*getsize(),
                            lineStyle:{
                                color:"#999",
                            }
                        }
                    }
                }
            }
        ]
    };
    return option
}
function plantbjOption(){ //配置饼图option
    if(!doplatform)return;
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            textStyle: {
                fontSize:12*getsize()
            }
        },
        color:color,
         series: [
                        {
                name:'平台背景',
                type:'pie',
                radius: ['35%', '50%'],
                center: ['50%', '50%'],
                data:doplatform,
                itemStyle: {
                    normal: {
                        label: {
                            textStyle: {
                                fontSize:12*getsize(),
                                color:"#666"
                            },
                        },
                        labelLine: {
                            show: true,
                            length:10*getsize(),
                            smooth: 0.1,
                            length2: 8*getsize(),
                            lineStyle:{
                                color:"#999",
                            }
                        }
                    }
                }
            }
        ]
    };
    return option
}
//echarts
function viewEchart(id,option){  //Echarts图表
    if(!option)return;
    var receiveSummary = echarts.init(document.getElementById(id),'walden');
    receiveSummary.showLoading('default',{
        text: 'loading',
        color: '#3fb1e3',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
    });
    receiveSummary.hideLoading();
    receiveSummary.setOption(option);

}

