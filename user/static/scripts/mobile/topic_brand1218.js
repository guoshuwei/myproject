var
    app = require('./app'),
    getKillLoans = require('../modules/getKillLoans'),
    tabControl = require('../plugins/tabControl'),
    _getStage = getKillLoans.getStage(),
    nowTime = $('body').attr('data-nowtime'),
    startTime = 1513526400,//2017-12-18 00:00:00;
    tagTime = 1513958400;//2017-12-23 00:00:00;

    

new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    pagination: '.fn-hotloan-pager',
    slidesPerView: 1,
    spaceBetween: 20,
    onTouchEnd: function(){
        if(nowTime >= tagTime || nowTime < startTime)return;
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


