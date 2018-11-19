var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    countDown = require('../modules/countDown'),
    formMod = require('../modules/form'),
    jPages = require('../plugins/jPages.min'),
    nowTime = $('body').attr('data-nowtime'),//当前时间戳（php）
    template = require('../modules/template');

$(document).ready(function() {
    //剩余特权金
    var strnum = 0;
    function pad(num, n) {
        var len = num.toString().length;
        while(len < n) {
            num = "0" + num;
            len++;
        }
        strnum =num;
    }
    var money = Math.floor($('.moneyhide').text());
    var str=money;
    pad(str, 9);
    strnum=strnum.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
    var strarr = strnum.split('');
    var html = [];
    var moneyhtml = [];
    for (var i = 0; i < strarr.length; i++) {
        if (strarr[i] == ',') {
            html.push('<span class="comma">');
            html.push(',');
            html.push('</span>');
        } else {
            html.push('<span class="money-list">');
            html.push(strarr[i]);
            html.push('</span>');
        }
    }
    moneyhtml.push(html.join(""));
    $(".money").html(moneyhtml.join(""));

    //爆款标
    //function createdom(ele, data, tpl) {
    //    var content = template.render(tpl, {data: data});
    //    $('.surprised').html(content);
    //    //listen($(ele),data);
    //}
    //
    ////惊喜爆款标
    //function _getData() {
    //    $.ajax({
    //        url: _Fn.mockServer + '/ajax/getKillLoans',
    //        type: 'post',
    //        data: {
    //            "data_time": nowTime,//当前时间戳
    //            "position": 14//放标的整点时间
    //        },
    //        dataType: 'json',
    //        success: function (res) {
    //            if (res.code == 200) {
    //                var rate = res.data['rate'] ? res.data['rate'] : false,
    //                    tyRat = res.data['hot_rate_new'] ? res.data['hot_rate_new'] : false;
    //                if (rate) {
    //                    res.data.rate = rate.split(".")[0];
    //                    res.data.ratenum = rate.split(".")[1];
    //                }
    //                if (tyRat) {
    //                    res.data.ty_rate = tyRat.split(".")[0];
    //                    res.data.ty_rate_num = tyRat.split(".")[1];
    //                }
    //
    //            }
    //            if (res.data['is_hot'] == 2) {
    //                createdom && createdom(null, res.data, 'loansTpl');
    //            } else {
    //
    //                createdom && createdom(null, res.data, 'loansTpl');
    //            }
    //        },
    //        error: function () {
    //        }
    //    })
    //}
    //
    //_getData();
    //


    $('body').on('touchend','.reward',function(){
        $('html, body').animate({scrollTop: 0}, 'slow');
        $('.pop').css('display', 'block');
        $('.pop-up').css('display', 'block');
        var income = $('.income-hidden').text();
        if(income==''){
            income='0.00';
        }
        $('.income').html(income);
    })

    $('body').on('touchend','.hidebtn',function(){
        $('.pop').css('display', 'none');
        $('.pop-up').css('display', 'none');
    })

    $('body').on('touchend','.invite-btn',function(){
        $('html, body').animate({scrollTop: 0}, 'slow');
        $('.pop').css('display', 'block');
        $('.pop-invite').css('display', 'block');
    })

    $('body').on('touchend','.know',function(){
        $('.pop').css('display', 'none');
        $('.pop-invite').css('display', 'none');
    })

    $('body').on('touchend','.break-egg-btn',function(){
        localStorage.setItem("gameType","g_zajindan");
        window.location.href = '//licai.p2peye.com/topic/xtyyh';
    })

    $('body').on('touchend','.tigger-btn',function(){
        localStorage.setItem("gameType","g_laohuji");
        window.location.href = '//licai.p2peye.com/topic/xtyyh';
    })

    $('body').on('touchend','.strategy-box',function(){
        window.location.href = '//licai.p2peye.com/topic/gonglue';
    })



    function gethammer(){
        $.ajax({
            url:'/topic/roblottery',
            type: 'post',
            data:{
            },
            dataType: 'json',
            success: function(res){
                if(res.code == 200){
                    hammerend()
                }else{
                    lose()
                }
            }

        })
    }
    function hammerend(){
        $('.golden-right').text('已领取');
        $('.golden-right').attr('href', 'javascript:void(0);');
        $('.golden-right').css({'background':'#eb1440','color':'#ffffff','cursor':'default'})
        $('.golden-prompt').css('display','block');
        $('.golden-prompt').touchend(function(){
            localStorage.setItem("gameType","g_zajindan");
            window.location.href = '//licai.p2peye.com/topic/xtyyh';
        })
    }

    function lose(){
        $('.golden-right').text('已抢光！');
        $('.golden-right').attr('href', 'javascript:void(0);');
        $('.golden-right').css({'background':'#eb1440','color':'#ffffff','cursor':'default'});
        $('.golden-prompt').css('display','block');
        $('.golden-prompt').text('去平台领取');
        $('.golden-prompt').attr('href','//licai.p2peye.com/topic/xtyyh/gonglue#plat')
    }

    var brought = $('.has-brought').text();
    if(brought==1){
        lose()
    }

    $('body').on('touchend','.golden-right',function(){
        if(time_range ("10:00", "20:00")){
            _Fn.isLogin();
            if(!_Fn.isLogin()){
                return;
            }else{
                gethammer();
            }
        }else{
            getalert('记得活动领取时间哦，请在活动时间内领取。')
            return;
        }

    })
//判断是否在时间内
    var time_range = function (beginTime, endTime) {
        var strb = beginTime.split (":");
        if (strb.length != 2) {
            return false;
        }
        var stre = endTime.split (":");
        if (stre.length != 2) {
            return false;
        }
        var b = new Date ();
        var e = new Date ();
        var n = new Date ();
        b.setHours (strb[0]);
        b.setMinutes (strb[1]);
        e.setHours (stre[0]);
        e.setMinutes (stre[1]);

        if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
            return true;
        } else {
            return false;
        }
    }

 //仿alert
    function getalert(message){
        var $popupBasic = $('#popupBasic').find('span').html(message).end().show();
        setTimeout(function(){
            $popupBasic.addClass('shake_popup').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                $(this).removeClass('shake_popup').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                    $(this).hide();
                });
            });
        }, 18);

        setTimeout(function(){
            $('#popupBasic').hide();
        }, 2500);
    }
})