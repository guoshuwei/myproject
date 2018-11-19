var
    app = require('./app'),
    template = require('../modules/template'),
    lazyload = require('../modules/lazyer'),
    countDown = require('../modules/countDown'),
    tabControl = require('../plugins/tabControl'),
    _timer = null,
    nowTime = $('body').attr('data-nowtime'),
    addrateBox = $('.fn-addrate'),
    hotloanBox = $('.fn-brand18-hotloan'),
    tagTime = 1501516800,//2017-08-01 00:00:00;
    startTime = 1500307200,//2017-07-18 00:00:00;
    center = $('.ui-position-center'),
    centerPosition = {top: parseFloat(center.css('top')),left: parseFloat(center.css('left'))},
    pokerItem = $('.fn-card-item'),
    pokerLength = pokerItem.length,
    recordLock = false,
    pokerPosition = [],
    moneyArray = [{
            amount: 0.18,
            note: '1'
        },
        {
            amount: 0.38,
            note: '1'
        },
        {
            amount: 5.18,
            note: '1'
        },
        {
            amount: 6.18,
            note: '1'
        },
        {
            amount: 7.18,
            note: '1'
        },
        {
            amount: 8.18,
            note: '1'
        }],
    newMoneyArray = [];

//四个红包的位置
for(var i = 0;i < pokerLength;i ++){
    pokerPosition.push({top: pokerItem.eq(i).position().top,left: pokerItem.eq(i).position().left});
}
$('.fn-record').tabControl({
    hand:'.ui-record-tab-item',
    handleType:'tap',
});
$('body')
    .on('tap click','.fn-info-record',function(){
        if(recordLock)return;
        recordLock = true;
        _Fn.loading().show($(this));
        $('.fn-record').show();
        _Fn.lightboxWrap()._fadeIn();
        recordLock = false; 
        _Fn.loading().hide();
        
    })
    .on('tap click','.fn-record-close',function(){
        $('.fn-record').hide();
        _Fn.lightboxWrap()._fadeOut();
        
    })
    .on('tap click','.fn-getmore',function(){
        //open licai app
        if(_Fn.isiOS){
            try{
                var json = {'url': '//licai.p2peye.com/loans/'};
                window.webkit.messageHandlers.openP2plicai.postMessage(json);
                return false;
            }catch(e){}
            
        }else{
            try{
                JumpLiCai.intentInToLiCai('//licai.p2peye.com/loans/');
                return false;
            }catch(e){}
        }
    })
function randomArray(){
    //随机取值
    function shuffle(array) {
        var m = array.length,
            t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    newMoneyArray = shuffle(moneyArray);
    newMoneyArray = newMoneyArray.slice(0, 2);
    newMoneyArray.push({
                amount: 0,
                note: ''
            });
    newMoneyArray = shuffle(newMoneyArray);
    newMoneyArray = newMoneyArray.slice(0, 3);
    return newMoneyArray;
}
var poker = function(){
        var defaults = {
            that: null,
            url: '/topic/packet',
            data: null,
            item: '.fn-card-item',
            itemChoiceClass: 'fn-card-choice',
            initial: pokerPosition,
            target: centerPosition,
            myTimes: $('.fn-info-times'),
            siblingsContent: newMoneyArray,
            flipEnd: null,
            errorCallback: null
        },
        itemLock = false,
        againLock = false,
        flipstatus = false;

        function flip(ele,content){
            ele.addClass('flipInY');
            ele.html(content);
            setTimeout(function(){
                ele.removeClass('flipInY');
            },1000)
        }
        function getAward(ele){
            if(itemLock)return;
            _Fn.loading().show(ele);
            itemLock = true;
            $.ajax({
                url: _Fn.mockServer + options.url,
                data: options.data,
                dataType: 'json',
                success: function(res){
                    _Fn.loading().hide();
                    var _siblings = ele.siblings();
                    if(res.code == 200){
                        var content = template.render('choiceTpl',res.data);

                        flip(ele,content);
                        flipstatus = true;
                        $(options.item).removeClass(options.itemChoiceClass);
                        options.myTimes.html(res.data.remaining);
                        setTimeout(function(){
                            var _randomArray = randomArray();
                            _siblings.each(function(index){
                                var that = $(this),
                                    content = template.render('otherTpl',_randomArray[index]);

                                flip($(this),content);
                                itemLock = false;
                            })
                        },1000);
                    }else{
                        itemLock = false;
                        _Fn.alert(res.message);
                    }
                    options.flipEnd&&options.flipEnd(res);
                    
                },
                error: function(){
                    _Fn.loading().hide();
                    _Fn.alert('网络错误，请稍后重试！');
                    itemLock = false;
                    options.errorCallback&&options.errorCallback();
                }
            })
        }
        function choiceAgain(ele){
            if(againLock)return;
            _Fn.loading().show(ele);
            againLock = true;
            var index = 0;
            var ele = $(options.item);
            if(flipstatus){
                var content = template.render('initialTpl');
                flip(ele,content);
            }
            flipstatus = false;
            setTimeout(function(){
                ele.addClass(options.itemChoiceClass).animate(options.target,500);
                $(options.item).each(function(index){
                    ele.removeClass('flipInY');
                    $(this).animate(options.initial[index]);
                    againLock = false;
                    _Fn.loading().hide();
                })
            },1000)
        }
        function init(option){
            options = $.extend({},defaults,option);
        }
        $('body')
            .on('tap click','.fn-card-choice',function(){
                if(nowTime < startTime){
                    _Fn.alert('活动18日开始');
                    return;
                }
                if(options.myTimes.html() < 1){
                    _Fn.alert('您的抽奖次数不足');
                    return;
                }
                poker.getAward($(this));
            })
            .on('tap click','.fn-choice-again',function(){
                
                poker.choiceAgain($(this));
            })
        return{
            init: init,
            getAward: getAward,
            choiceAgain: choiceAgain
        }
    }();
    
poker.init();  



$(window).bind( 'orientationchange', function(e){
    e.stopPropagation();
    e.cancelBubble = true;
    window.location.href = window.location.href;
});


