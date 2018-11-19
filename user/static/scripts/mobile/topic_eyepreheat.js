
var app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    countDown = require('../modules/countDown'),
    formMod = require('../modules/form'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    jPages = require('../plugins/jPages.min'),
    nowTime = $('body').attr('data-nowtime'),//当前时间戳（php）
    cookie = require('../plugins/$.cookie'),
    carrousel=require('../modules/carrousel');

//微信分享
var wxReady = require('../modules/jssdk');
var wxShareTitle = $('.wxShareTitle').val();
var wxShareDesc = $('.wxShareDesc').val();
wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        title : wxShareTitle,
        desc : wxShareDesc

    });
});
$(document).ready(function(){


    $('.top-btn').addClass('breathmove');
    var flag
    var downtime;
    var stop;
    var tofadein;
    var isLastCompleteFlag = false;
    $(".top-btn").on('touchstart',function(event){
        var event = event || window.event;
        if(!_Fn.isLogin())return;
        flag = false;
        downtime=false;
        var putdown;
        event.preventDefault();
        $('.spin-btn').addClass('rotatemove');
        $(".charge-success").hide();
        if(isLastCompleteFlag){
            $('.charge-box').removeClass('move_animate').addClass('move_out');
        }
        setTimeout(function(){$('.charge-box').removeClass('move_in').removeClass('move_out').addClass('move_animate');},1);
        stop = setTimeout(function() {//down 1s，才运行。
            flag = true;
            $('.top-btn').removeClass('breathmove');
            $('.charge-wrong').css('display','none');
            $('.preheat-eye').css('display', 'none');
            $('.preheat-battery').css('visibility', 'visible');
            $('.charge-box').addClass('move_in');
            tofadein = setTimeout(function () {
                downtime = true;
                isLastCompleteFlag = true;
                //$(".charge-bj").removeAttr("style");
                $(".charge-success").show();
                var hadecookie = $.cookie('EYETHUMB');
                if (hadecookie) {
                    $('.bj').css('display', 'block');
                    $('.remind').css('display', 'block');
                    $('.spin-btn').removeClass('rotatemove');
                } else {
                    $.ajax({
                        url: '/topic/eyethumb',
                        type: 'get',
                        data: {
                        },
                        dataType: 'json',
                        success: function (res) {
                            if (res.code == 5140) {
                                $('.bj').css('display', 'block');
                                $('.remind').css('display', 'block');
                                $('.spin-btn').removeClass('rotatemove');
                            }else if(res.code != 200 && res.code != 5140){
                                getalert(res.message);
                            }
                        }
                    });
                }
            },2000);
        },1000);
    });
    $(".top-btn").on('touchend',function(event){
        var event = event || window.event;
        $('.spin-btn').removeClass('rotatemove');
        $('.top-btn').addClass('breathmove');
        if (!flag) {
            clearTimeout(stop);
        }
        if(!downtime){
            if(isLastCompleteFlag){
                clearTimeout(tofadein);
                $('.charge-box').removeClass('move_in');
                setTimeout(function(){
                    $('.charge-box').removeClass('move_animate').addClass('move_in');
                    $(".charge-success").show();},500);

            }else{
                //isLastCompleteFlag = false;
                clearTimeout(tofadein);
                $('.charge-box').removeClass('movewidth');
                $('.charge-box').removeClass('move_in');
                setTimeout(function(){
                    $('.charge-wrong').css('display','block');},1000);
            }
        }
    });
    $('.remind-btn').click(function(){
        $('.bj').css('display','none');
        $('.remind').css('display','none');
    })

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