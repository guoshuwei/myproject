var
    app = require('./app'),
    template = require('../modules/template'),
    lazyload = require('../modules/lazyer'),
    countDown = require('../modules/countDown'),
    _timer = null,
    nowTime = $('body').attr('data-nowtime'),
    addrateBox = $('.fn-addrate'),
    hotloanBox = $('.fn-brand18-hotloan'),
    tagTime = 1506787200,//2017-10:01 00:00:00;
    startTime = 0;


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

_Fn.backTop();


if(nowTime >= tagTime || nowTime < startTime)return;

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

if(_getStage.hour == 10 && _getStage.minutes >= 55 || _getStage.hour > 10){
    getData($('.fn-hotloan-item11'),11);
    getData($('.fn-hotloan-item15'),15);
}

function getData(ele,position,callback){
    _Fn.loading().show(hotloanBox);
    $.ajax({
        url: _Fn.mockServer + '/ajax/getKillLoans',
        type: 'post',
        data: {
            position: position
        },
        dataType: 'json',
        success: function(res){
            _Fn.loading().hide();
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

                ele.find('.ui-hotloan-item-empty').remove();
                var content = template.render('loanTpl',{data:res.data});
                ele.html(content);
                if(res.data.countdown > 0 && res.data.id){
                    countdownFn && countdownFn(ele.find('.fn-time-box'),position,res.data,ele);
                }
                if(res.data.countdown < 0 && res.data.id && res.data.hot_time_range > 0  && res.data.is_hot_end_time == 1){
                    countdownOver && countdownOver(ele,position,ele.find('.fn-time-box-ing'));
                }
            }else{
                _Fn.alert(res.message);
                
            }
            _Fn.loading().hide();
            callback && callback();
        },
        error: function(){
            _Fn.alert('请稍后刷新重试！');
            _Fn.loading().hide();
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
            //每秒执行
            //30/60关键秒执行轮循取logo
            // if(time <= 300000 && (time % 30000 == 0)){
            //     if(!data.id){
            //         getData(ele,position);
            //     }
            // }
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




