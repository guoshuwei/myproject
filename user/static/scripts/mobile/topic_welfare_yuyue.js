var
    app = require('./app'),
    validate = require('../modules/validate'),
    template = require('../modules/template'),
    countDown = require('../modules/countDown'),
    jPages = require('../plugins/jPages.min'),
    getKillLoans = require('../modules/getKillLoans'),
    tabControl = require('../plugins/tabControl'),
    _getStage = getKillLoans.getStage(),
    nowTime = $('body').attr('data-nowtime'),
    cookie = require('../plugins/$.cookie'),
    brandtable = $('.my-yuyue-alert'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    wxReady = require('../modules/jssdk'),
    yuYueRecord = $('.ui-user-info li').length,
    uid = $('body').attr('uid'),
    ismyyuyue = true,
    startTime = 1513526400,//2017-12-18 00:00:00;
    tagTime = 1513958400;//2017-12-23 00:00:00;



wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        success : function(res){
            // 分享成功的回调函数
            // console.log(res);
        }
    });
});

$(window).bind( 'orientationchange', function(e){
    e.stopPropagation();
    e.cancelBubble = true;
    window.location.href = window.location.href;
});

if(yuYueRecord > 0){
    $('.ui-user-info').bxSlider({
        ticker:true,
        speed: 3000 * yuYueRecord,
        tickerHover: true,
        infiniteLoop: true,
        useCSS: false,
        WebkitPerspective: false,
        nextText : '',
        prevText : '',
        prevSelector : '',
        nextSelector : '',
    });
};

// var liner = $('.progress-num').html();
// var lines = liner.substring(0,liner.length-1);
// var intLinner = parseInt(lines);
// $('.progress-num').html(intLinner+ '%');


if (uid > 0) {

    $.ajax({
        url : '//licai.p2peye.com/topic/welfare/reservationstatus',
        type : 'post',
        dataType: 'json',
        success : function (res) {
            if (res.code == 200) {
                // console.log(res);
                if(res.data.status == 1) {
                    $('.progress-button').text('立即预约').css('background-color','#ffe21c').addClass('progress-button-click');
                } else if(res.data.status == 2) {
                    $('.progress-button').text('每月1日开始预约').css('background-color', 'darkgray').css('color','#fff').removeClass('progress-button-click');
                } else if(res.data.status == 3) {
                    $('.progress-button').text('每日11点开始预约').css('background-color', 'darkgray').css('color','#fff').removeClass('progress-button-click');
                } else if(res.data.status == 4) {
                    $('.progress-button').text('您已预约成功').css('background-color', 'darkgray').css('color','#fff').removeClass('progress-button-click');
                } else if(res.data.status == 6) {
                    $('.progress-button').text('已约满').css('background-color', 'darkgray').css('color','#fff').removeClass('progress-button-click');
                }else if (res.data.status == 7) {
                    $('.progress-button').text('活动未开始').css('background-color', 'darkgray').css('color','#fff').removeClass('progress-button-click');
                } else {
                    $('.progress-button').text('已约满，明日11点再来').css('background-color', 'darkgray').css('color','#fff').removeClass('progress-button-click');
                }
            } else {
                _Fn.alert(res.message);
            }
        },
        error: function (res) {
            _Fn.alert('请稍后刷新重试！');
        }
    })
}else {
    $('.progress-button').text('立即预约').css('background-color', '#ffe21c').addClass('progress-button-click');
}

$('body')
    .on('tap','.progress-button-click',function(){
        if(!_Fn.isLogin())return false;
        if(!_Fn.isBind())return false;
        $('.progress-button').text('排队中...').css('background-color', 'darkgray').removeClass('progress-button-click');
        $.ajax({
            url : '//licai.p2peye.com/topic/welfare/convention',
            type: 'post',
            success: function(res){
                // console.log(res);
                if(res.code == 200) {
                    _Fn.alert('您已预约成功');
                    $('.progress-button').text('您已预约成功').css('background-color', 'darkgray').removeClass('progress-button-click')
                } else {
                    // console.log(res.message);
                    _Fn.alert(res.message);
                    $('.progress-button').text('立即预约').css('background-color', '#ffe21c').addClass('progress-button-click');
                }
            },
            error: function(){
                _Fn.alert('请稍后刷新重试！');
                $('.progress-button').text('立即预约').css('background-color', '#ffe21c').addClass('progress-button-click');
                // _Fn.loadingMulti().hide(loading);
            }
        });
    })
    .on('tap','.my-yuyue', function () {
            if(!_Fn.isLogin())return false;
            if(!_Fn.isBind())return false;
            getList(brandtable,'//licai.p2peye.com/topic/welfare/my_convention',{type: '19-20-21-22'},'lotteryrecordTpl',$('.fn-lotteryrecord-box'),$('.fn-lotteryrecord-pager'),'lotteryrecord');
    })
    .on('tap', '.yuyue-close', function () {
        $('.my-yuyue-alert-wrap').css('display', 'none');
        ismyyuyue = true;
    })
    .on('tap', '.liqiang-h5', function () {
        if(_Fn.terminalInfo.app == "licai") {
    // 如果在app内, 跳转失效页面
            _Fn.fireApp({
                trigger : "newyear",
                data : ""
            });
            return false;
        }
    })
    .on('tap','.baokuan-h5', function () {
        if(_Fn.terminalInfo.app == "licai") {
            // 如果在app内, 跳转失效页面
            _Fn.fireApp({
                trigger : "baokuan",
                data : ""
            });
            return false;
        }
    })





function getList(loading,url,data,tpl,parent,pager,id){
    // _Fn.loadingMulti().show(loading);
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        success: function(res){
             // _Fn.loadingMulti().hide(loading);
            if(res.code == 200){
                // console.log(res);
                var content = template.render(tpl,{data:res.data});
                if(!res.data || res.data.length != 0){
                    var content = template.render(tpl,{data:res.data});
                    parent.html(content);
                    pager.jPages({
                        containerID : id,
                        previous : '上一页',
                        next : '下一页',
                        perPage : 5,
                        delay : 20,
                        scrollBrowse : false
                    });
                    $('.my-yuyue-alert').css('display', 'block');
                    $('.my-yuyue-alert-wrap').css('display', 'block');

                } else {
                    _Fn.alert('您还没有预约记录~');
                    ismyyuyue = false;
                }
            }else{
                _Fn.alert(res.message);

            }
            // _Fn.loadingMulti().hide(loading);
        },
        error: function(){
            _Fn.alert('请稍后刷新重试！');
            // _Fn.loadingMulti().hide(loading);
        }
    });

    return ismyyuyue;
}


