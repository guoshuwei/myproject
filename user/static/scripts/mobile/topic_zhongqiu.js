/**
 * Created by yx on 16-8-29.
 */
var
    app = require('./app'),
    template = require('../modules/template'),
    countDown = require('../modules/countDown');

var
    renderLoans = function(){

        //爆款标

        if($('.hotLoans').length){
            getHotLoans();
        }

        function getHotLoans (){
            var nowTime = $('body').attr('data-nowtime');
            $.ajax({
                //url: _Fn.mockServer + '/ajax/getKillLoans',
                url: '/ajax/getKillLoans',
                type: 'post',
                data:{
                    "data_time":nowTime,//当前时间戳
                    "position":10//放标的整点时间
                },
                //async:false,
                dataType: 'json',
                success: function(res){

                    if(res.code == 200){

                        if(!res.data){
                            $('.hotLoansTpl').html(template.render('emptyLoansTpl'));
                        }else{
                            var data = res.data;
                            var rate = data['rate'] ? data['rate'] : false,
                                tyRat = data['hot_rate_new'] ? data['hot_rate_new'] : false;

                            if(rate){
                                data.rate = rate.split(".")[0];
                                data.ratenum = rate.split(".")[1];
                            }
                            if(tyRat){
                                data.ty_rate = tyRat.split(".")[0];
                                data.ty_rate_num = tyRat.split(".")[1] ;
                            }

                            if(data.countdown){
                                if(data.countdown > 0){
                                    $('.hotLoansTpl').html(template.render('hotLoansTpl',data));
                                    countDownHander($(".count"));
                                }else{
                                    if(data.loan_id){
                                        $('.hotLoansTpl').html(template.render('hotLoansTpl',data));
                                    }else{
                                        $('.hotLoansTpl').html(template.render('emptyLoansTpl'));
                                    }
                                }
                            }
                        }
                    }else{
                        $('.hotLoansTpl').html(template.render('emptyLoansTpl'));
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $('.hotLoansTpl').html(template.render('emptyLoansTpl'));
                }
            });
        }
        //倒计时
        function countDownHander (ele){
            countDown.listen(
                ele,function(){
                    getHotLoans();
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

                    html.push('<li class="time number">');
                    html.push(htmlTime[0]);
                    html.push('</li>');
                    html.push('<li class="time number">');
                    html.push(htmlTime[1]);
                    html.push('</li>');
                    html.push('<li class="time sign">:</li>');
                    html.push('<li class="time number">');
                    html.push(htmlTime[2]);
                    html.push('</li>');
                    html.push('<li class="time number">');
                    html.push(htmlTime[3]);
                    html.push('</li>');
                    html.push('<li class="time sign">:</li>');
                    html.push('<li class="time number">');
                    html.push(htmlTime[4]);
                    html.push('</li>');
                    html.push('<li class="time number">');
                    html.push(htmlTime[5]);
                    html.push('</li>');
                    ele.html(html.join(''));
                }
            )
        }
    };

    renderLoans();

var bindEvent = function(){
    var list=$(".wrap .hd").find(".list");
    var time_status=$('.wrap').data('status');
    list.find('.play').eq(0).addClass('today');
    list.find('.play').eq(1).addClass('forward1');
    list.find('.play').eq(2).addClass('forward2');

    if(!time_status){
        $('.wrap .hd').hide();
        $('.wrap .bd .normalLoans').hide();
        $('.wrap .bd .hotLoans').hide();
        $('.placeholderbox').show();
        $('.wrap .bd .totalInvest');
        //$('.wrap .bd .totalInvest').css("margin-top","410px");
        if($('.wrap .bd .totalInvest').find('.title').length){
            $('.wrap .bd .totalInvest').find('.title').hide();
        }
    }

};

    bindEvent();