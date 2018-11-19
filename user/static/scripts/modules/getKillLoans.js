var 
    countDown = require('../modules/countDown'),
    template = require('../modules/template'),
    getKillLoans = function(){
        var 
            option = {
                url: '/ajax/getKillLoans',
                position:{
                        position: 11
                    },
                resident: '.fn-time-box-wait',//常驻的
                forecast: '.fn-time-box',//预告
                ending: '.fn-time-box-ing',//即将终止
                parents: '.fn-hotloan-item11',//添加到
                waitParents: '.fn-hotloan-wait', //5分钟外模板盒子
                template: 'loanTpl',//模板
                timeStyle: [1,0,1],//1表示时分秒，0表示分秒
                custom: null,//自定义参数方便模板绘制
                fiveMinutesBefore: true, //是否在5分钟外开启倒计时
                fiveMinutesCallback: null, //5分钟时执行方法（function）
                successCallback: function(res){
                    if(res.code != 200){
                        _Fn.alert(res.message);
                    }
                },
                errorCallback: function(){
                    _Fn.alert('网络错误，请稍后刷新重试！');
                }

            },
            timer = null;

        function getStage(){
            var
                t = new Date($('body').attr('data-nowtime') * 1000),
                year  = t.getFullYear(),
                month = t.getMonth() + 1,
                //day   = t.getUTCDate(),
                day   = t.getDate(),
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
        function countdownFn(timeBox,ele,state,fiveget){
            if(timer){
                countDown.cleartimer();
            }
            timer = countDown.listen(   
                timeBox,
                function(){                
                    getData(ele,option.position);
                },
                '/ajax/serverTime',
                function(timeFormart,time){
                    if(time == 300000 && !fiveget){
                        //加载5分钟预告
                        option.fiveMinutesCallback && option.fiveMinutesCallback();
                        
                        if(option.fiveMinutesBefore){
                            getData(ele,option.position);
                            countDown.cleartimer();
                            return false;
                        }
                    }
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

                    if(state == 1){//显示6位倒计时
                        html.push('<span>' + htmlTime[0] + '</span>');
                        html.push('<span>' + htmlTime[1] + '</span>');
                        html.push('<em>:</em>');
                        html.push('<span>' + htmlTime[2] + '</span>');
                        html.push('<span>' + htmlTime[3] + '</span>');
                        html.push('<em>:</em>');
                        html.push('<span>' + htmlTime[4] + '</span>');
                        html.push('<span>' + htmlTime[5] + '</span>');
                    }else{
                        html.push('<span>' + htmlTime[2] + '</span>');
                        html.push('<span>' + htmlTime[3] + '</span>');
                        html.push('<em>:</em>');
                        html.push('<span>' + htmlTime[4] + '</span>');
                        html.push('<span>' + htmlTime[5] + '</span>');
                    }
                    
                    timeBox.html(html.join(''))

                }
            ).id
        }
        function getData(){
            $.ajax({
                url: _Fn.mockServer + option.url,
                type: 'post',
                data: option.position,
                dataType: 'json',
                success: function(res){
                    if(res.code == 200){

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
                        res.data._custom = option.custom;
                        var content = template.render('loanTpl',{data:res.data});
                        if(res.data.countdown > 300){
                            $(option.waitParents).html(content);
                        }else{
                            $(option.parents).html(content);
                        }
                        /* 5minutes before*/
                        if(res.data.countdown > 300 && option.fiveMinutesBefore){
                            countdownFn && countdownFn($(option.waitParents).find(option.resident),$(option.waitParents),option.timeStyle[0]);
                        /* 5minutes Between && id ready*/
                        }else if(res.data.countdown > 0 && res.data.id && res.data.countdown <= 300){
                            countdownFn && countdownFn($(option.parents).find(option.forecast),$(option.parents),option.timeStyle[1]);
                        /* 5minutes Between && id unready*/
                        }else if(res.data.countdown > 0 && !res.data.id && res.data.countdown <= 300){

                        /* ongoing*/
                        }else if(res.data.countdown < 0 && res.data.id && res.data.hot_time_range > 0  && res.data.is_hot_end_time == 1){
                            countdownFn && countdownFn($(option.parents).find(option.ending),$(option.parents),option.timeStyle[2],true);
                        }
                    }
                    
                    option.successCallback && option.successCallback(res);
                },
                error: function(){
                    option.errorCallback && option.errorCallback();
                }
            }) 
        }

        function init(options){
            $.extend(option,options);
            getData();
        }
        return{
            getStage: getStage,
            init: function(options){
                init(options);
            }

        }
    }();

exports.init = getKillLoans.init;
exports.getStage = getKillLoans.getStage;
