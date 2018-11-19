var
    app = require('./app'),
    template = require('../modules/template'),
    lazyload = require('../modules/lazyer'),
    countDown = require('../modules/countDown'),
    cookie = require('../plugins/$.cookie'),
    _timer = null,
    addrateBox = $('.fn-addrate'),
    hotloanBox = $('.fn-brand18-hotloan'),
    nowTime = $('body').attr('data-nowtime'),
    uid = $('body').attr('uid'),
    levalV = $('.fn-leval-v'),
    levalVNum = levalV.html(),
    levalDouble = $('.fn-leval-double').html(),
    getvTimes = $('.fn-getv-times'),
    getvLock = false,
    cardLock = false,
    tagTime = 1505318400,//09-14 00:00:00
    startTime = 1503417600;//08-23 00:00:00



$(window).bind( 'orientationchange', function(e){
    e.stopPropagation();
    e.cancelBubble = true;
    window.location.href = window.location.href;
});


$('body')
    .on('tap','.fn-login-bind',function(){
        if(!_Fn.isLogin())return false;
        if(!_Fn.isBind())return false;
    })
    .on('tap','.fn-alertbox-close',function(){
        $('.fn-alertbox').fadeOut();
        _Fn.lightboxWrap()._fadeOut();
    })
    .on('tap','.fn-getv-item',function(){
        if(!_Fn.isLogin())return;
        if(!_Fn.isBind())return;
        if(nowTime >= tagTime){
            _Fn.alert('活动已结束');
            return;
        }
        if(getvTimes.html() <= 0){
            _Fn.alert('请先获得更多抽奖机会！');
            return;
        }
        if(getvLock)return;
        getvLock = true;
        var that = $(this);
        _Fn.loadingMulti().show(that);
        $.ajax({
            url: _Fn.mockServer + '/topic/award818',
            type: 'post',
            dataType: 'json',
            success: function(res){
                _Fn.loadingMulti().hide(that);
                if(res.code == 200){
                    alertInfo(res.data);
                    getvTimes.html(res.data.ordinary);
                      
                }else{
                    _Fn.alert(res.message);
                }
                getvLock = false;
            },
            error: function(){
                _Fn.loadingMulti().hide(that);
                getvLock = false;
                _Fn.alert('请稍后重试！');
            }
        })
    })
    .on('tap','.fn-card',function(){
        if(!_Fn.isLogin())return;
        if(!_Fn.isBind())return;
        if(cardLock) return;
        cardLock = true;
        var that = $(this),
            pid = that.attr('data-pid'),
            siblings = that.siblings('.ui-cards-list-note'),
            doMainbody = that.attr('data-domainbody');
        _Fn.loadingMulti().show(that);
        $.ajax({
            url: _Fn.mockServer + '/topic/acquiringcard',
            type: 'post',
            data: {
                pid: pid
            },
            dataType: 'json',
            success: function(res){
                _Fn.loadingMulti().hide(that);
                cardLock = false;
                if(res.code == 200){
                    _Fn.alert('领取成功！');
                    that.remove();
                    siblings.after('<a href="//' + doMainbody + '.p2peye.com" class="ui-cards-list-btn">领取成功，查看平台档案</a>');
                      
                }else{
                    _Fn.alert(res.message);
                }
            },
            error: function(){
                cardLock = false;
                _Fn.loadingMulti().hide(that);
                _Fn.alert('请稍后重试！');
            }
        }) 
    })

_Fn.backTop();

lazyload.bind($('.ui-reward'),function(){
    var rankMyself = $('.ui-rank');
    _Fn.loadingMulti().show(rankMyself);
    $.ajax({
        url: _Fn.mockServer + '/topic/ranklist818',
        type: 'post',
        dataType: 'json',
        success: function(res){
            _Fn.loadingMulti().hide(rankMyself);
            if(res.code == 200){
                if(uid > 0){
                    var contents = template.render('rankmineTpl',{data:res.data});
                    $('.fn-rank-mine').html(contents);
                }
                if(res.data.popular.length <= 0)return;
                var content = template.render('rankTpl',{data:res.data});
                $('.fn-rank').html(content);
            }else{
                _Fn.alert(res.message);
            }
        },
        error: function(){
            _Fn.alert('请稍后刷新重试！');
            _Fn.loadingMulti().hide(rankMyself);
        }
    })


    
})

if(nowTime >= tagTime || nowTime < startTime)return;

function levalAlert(){
    if(uid <= 0)return;
    if($.cookie('leavl') == 'exist'){
        return;
    }else{
        $.cookie('leavl','exist',{expires: 365,path:'/'});
    }
    if(isNaN(levalVNum) || levalVNum <= 0){
        alertInfo({noLeval: true});
    }else{
        alertInfo({
            firstCome: true,
            levalVNum: levalVNum,
            levalDouble: levalDouble
        });
    }
}
levalAlert();

function alertInfo(data){
    var content = template.render('alertboxTpl',data);
    _Fn.lightboxWrap()._fadeIn();
    $('body').append(content);
}
new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    pagination: '.fn-hotloan-pager',
    onTouchEnd: function(swiper){
        if(nowTime >= tagTime || nowTime < startTime)return;
        if($('.fn-hotloan-item11 .ui-hotloan-item-empty').length == 0)return;
        if(_getStage.hour == 10 && _getStage.minutes >= 55 || _getStage.hour < 14 && _getStage.hour > 10 || _getStage.hour == 14 && _getStage.minutes < 55){
            
        }else if(_getStage.hour == 14 && _getStage.minutes >= 55 || _getStage.hour > 14){
            getData($('.fn-hotloan-item11'),11,true);
        }
    }

})

lazyload.bind($('.fn-cards-parents'),function(){
    var fnCards = $('.fn-cards');

    _Fn.loadingMulti().show(fnCards);
    $.ajax({
        url: _Fn.mockServer + '/topic/cardlist',
        type: 'post',
        dataType: 'json',
        success: function(res){
            _Fn.loadingMulti().hide(fnCards);
            if(res.code == 200){
                var content = template.render('cardsTpl',{data:res.data});
                $('.fn-cards-parents').html(content);
                new Swiper ('.swiper-container1', {
                    direction: 'horizontal',
                    loop: true,
                    pagination: '.fn-cards-pager',
                    autoplayDisableOnInteraction : false,
                    autoplay: 5000
                })
            }else{
                _Fn.alert(res.message);
            }
        },
        error: function(){
            _Fn.alert('请稍后刷新重试！');
            _Fn.loadingMulti().hide(fnCards);
        }
    })

    
})


function getStage(){
    var
    t = new Date($('body').attr('data-nowtime') * 1000),
    year  = t.getFullYear(),
    month = t.getMonth() + 1,
    day   = t.getUTCDate(),
    h     = t.getHours(),
    m     = t.getMinutes(),
    s     = t.getSeconds();

    return {
        year: year,
        month: month,
        day: day,
        hour: h,
        minutes: m,
        seconds: s
    }

}
var _getStage = getStage();

if(_getStage.hour == 10 && _getStage.minutes >= 55 || _getStage.hour < 14 && _getStage.hour > 10 || _getStage.hour == 14 && _getStage.minutes < 55){
    getData($('.fn-hotloan-item11'),11);
}else if(_getStage.hour == 14 && _getStage.minutes >= 55 || _getStage.hour > 14){
    getData($('.fn-hotloan-item15'),15);
}else{
    loanspreheat('天眼加息爆款标，每天11点、15点准时开抢');
}
function loanspreheat(text){
    $('.fn-hotloan18').remove();  
    $('.fn-loans-preheat-text').html(text);
    $('.fn-loans-preheat').show();
}
function getData(ele,position,_hide,callback){
    _Fn.loadingMulti().show(hotloanBox);
    
    $.ajax({
        url: _Fn.mockServer + '/ajax/getKillLoans',
        type: 'post',
        data: {
            position: position
        },
        dataType: 'json',
        success: function(res){
            _Fn.loadingMulti().hide(hotloanBox);
            if(res.code == 200){
                if(res.data.countdown > 0 && !res.data.id)return;

                var rate = res.data['rate'] ? res.data['rate'] : false,
                tyRat = res.data['hot_rate_new'] ? res.data['hot_rate_new'] : false;
                if(rate){  
                    res.data.rate = rate.split(".")[0];
                    res.data.rate_num = rate.split(".")[1];
                }  
                if(tyRat){
                    res.data.hot_rate_new = tyRat.split(".")[0];
                    res.data.hot_rate_new_num = tyRat.split(".")[1] ;
                } 
                if(res.data.id && res.data.countdown < 0 && res.data.is_hot == 2 || res.data.id && res.data.countdown < 0 && res.data.hot_time_range < 0 && !_hide){
                    if(position == 11){
                        loanspreheat('天眼加息爆款标，11点场已售罄，15点场即将开始');
                    }else{
                        loanspreheat('天眼加息爆款标，每天11点、15点准时开抢');
                    }
                    return;
                }
                
                var content = template.render('loanTpl',{data:res.data});
                ele.html(content);
                $('.fn-hotloan18').show();
                if(res.data.countdown > 0 && res.data.id){
                    countdownFn && countdownFn(ele.find('.fn-time-box'),position,res.data,ele);
                }
                if(res.data.countdown < 0 && res.data.id && res.data.hot_time_range > 0  && res.data.is_hot_end_time == 1){
                    countdownOver && countdownOver(ele,position,ele.find('.fn-time-box-ing'));
                }
            }else{
                _Fn.alert(res.message);
                
            }
            callback && callback();
        },
        error: function(){
            _Fn.alert('请稍后刷新重试！');
            _Fn.loadingMulti().hide(hotloanBox);
        }
    }) 
}


function countdownOver(ele,position,timeBox){
    if(_timer){
        countDown.cleartimer();
    }
    _timer = countDown.listen(   
        timeBox,
        function(){  
            if(position == 11){
                loanspreheat('天眼加息爆款标，11点场已售罄，15点场即将开始');
            }else{
                loanspreheat('天眼加息爆款标，每天11点、15点准时开抢');
            }
        },
        '/ajax/serverTime',
        function(timeFormart,time){
            timer = timeFormart.split('|')[1].split(',');
            var html = [],htmlTime = [];
            for(var i = 0 ; i < timer.length ; i++){
                if(i<3){
                    continue;
                }
                for(var j = 0 ; j < timer[i].length; j++){
                    if(j > 0){

                    }
                    htmlTime.push(timer[i][j]);
                }                          
            }                         
            html.push(htmlTime[0]);
            html.push(htmlTime[1]);
            html.push(':');
            html.push(htmlTime[2]);
            html.push(htmlTime[3]);
            html.push(':');
            html.push(htmlTime[4]);
            html.push(htmlTime[5]);

            timeBox.html(html.join(''))

        }
    ).id
}
function countdownFn(timeBox,position,data,ele){
    if(_timer){
        countDown.cleartimer();
    }
    _timer = countDown.listen(   
        timeBox,
        function(){                
            getData(ele,position);
        },
        '/ajax/serverTime',
        function(timeFormart,time){
            timer = timeFormart.split('|')[1].split(',');
            var html = [],htmlTime = [];
            for(var i = 0 ; i < timer.length ; i++){
                if(i<3){
                    continue;
                }
                for(var j = 0 ; j < timer[i].length; j++){
                    if(j > 0){

                    }
                    htmlTime.push(timer[i][j]);
                }                          
            }
            //开始倒计时5分钟并且logo存在
            if(data.id){                          
                html.push('<span class="ui-hotloan-item-timedown-item">');
                html.push(htmlTime[2]);
                html.push('</span>');
                html.push('<span class="ui-hotloan-item-timedown-item">');
                html.push(htmlTime[3]);
                html.push('</span>');
                html.push('<span class="ui-hotloan-item-timedown-symbol">:</span>');
                html.push('<span class="ui-hotloan-item-timedown-item">');
                html.push(htmlTime[4]);
                html.push('</span>');
                html.push('<span class="ui-hotloan-item-timedown-item">');
                html.push(htmlTime[5]);
                html.push('</span>');
            }
            timeBox.html(html.join(''))

        }
    ).id
}




