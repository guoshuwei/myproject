var
    app = require('./app'),
    getKillLoans = require('../modules/getKillLoans'),
    tabControl = require('../plugins/tabControl'),
    _getStage = getKillLoans.getStage(),
    nowTime = $('body').attr('data-nowtime'),
    startTime = 1516204800,//2018-1-18 00:00:00;
    uid = $('body').attr('uid'),
    template = require('../modules/template'),
    wxReady = require('../modules/jssdk'),
    tagTime = 1516636800;//2018-2-18 00:00:00;

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


$('body')
    .on('tap', '.liji-login', function () {
        if (!_Fn.isLogin()) return false;
    })
    // .on('tap','.my-yuyue', function () {
    //     if(!_Fn.isLogin())return false;
    //     if(!_Fn.isBind())return false;
    //     // getList(brandtable,'//licai.p2peye.com/topic/welfare/my_convention',{type: '19-20-21-22'},'lotteryrecordTpl',$('.fn-lotteryrecord-box'),$('.fn-lotteryrecord-pager'),'lotteryrecord');
    // })
    .on('tap', '.yuyue-close', function () {
        $('.my-yuyue-alert-wrap').css('display', 'none');
        ismyyuyue = true;
    });




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



new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    pagination: '.fn-hotloan-pager',
    slidesPerView: 1,
    spaceBetween: 20,
    onTouchEnd: function(){
        if (_getStage.day < 18 ||_getStage.day > 22) return;
        if($('.fn-hotloan-item11 .ui-hotloan-item-empty').length == 0)return;
        if(_getStage.hour == 14 && _getStage.minutes >= 55 || _getStage.hour > 14){
            getKillLoans.init({
                url: '/ajax/getKillLoans',
                position:{
                    position: 11
                },
                resident: '.fn-time-box-wait',//常驻的
                forecast: '.fn-time-box',//预告
                ending: '.fn-time-box-ing',//即将终止
                parents: '.fn-hotloan-item11',//添加到
                waitParents: '.fn-hotloan-item11',
                timeStyle: [1,0,1],//1表示时分秒，0表示分秒
                custom: _Fn.terminalInfo.app,
                fiveMinutesCallback: function(){
                    // $('.fn-time-box').remove();
                    // $('.fn-hotloan').removeClass('ui-hidden');
                }
            })
        }
    }

})

if (_getStage.day < 18 ||_getStage.day > 22) return;
if(_getStage.hour < 14 || _getStage.hour == 14 && _getStage.minutes < 55){
    getKillLoans.init({
        url: '/ajax/getKillLoans',
        position:{
            position: 11
        },
        resident: '.fn-time-box-wait',//常驻的
        forecast: '.fn-time-box',//预告
        ending: '.fn-time-box-ing',//即将终止
        parents: '.fn-hotloan-item11',//添加到
        waitParents: '.fn-hotloan-item11',
        timeStyle: [1,0,1],//1表示时分秒，0表示分秒
        custom: _Fn.terminalInfo.app,
        fiveMinutesCallback: function(){
            // $('.fn-hotloan-wait').remove();
            // $('.fn-hotloan').removeClass('ui-hidden');
        }
    })
}else if(_getStage.hour == 14 && _getStage.minutes >= 55 || _getStage.hour > 14){
    getKillLoans.init({
        url: '/ajax/getKillLoans',
        position:{
            position: 15
        },
        parents: '.fn-hotloan-item15',//添加到
        custom: _Fn.terminalInfo.app

    })
}

// if(uid > 0) {
//     $.ajax({
//         url : _Fn.mockServer + '/topic/welfare/reservationstatus',
//         type: 'post',
//         dataType: 'json',
//         success : function (res) {
//             if (res.code == 200) {
//                 console.log(res);
//                 var content = template.render('yuyueTpl',{data:res.data});
//                 $('.ui-banner-yuyue').append(content);
//             } else {
//                 _Fn.alert(res.message);
//             }
//         },
//         error: function (res) {
//             _Fn.alert('请稍后刷新重试！');
//         }
//     })
// }


