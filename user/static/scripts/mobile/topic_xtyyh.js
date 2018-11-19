/**
 * Created by yx on 16-9-28.

 server
 {
        laohujichoujiang: "/topic/slotmachines",
        //laohujichoujiang: "/scripts/json/laohujichoujiang.json",
        jiangpinliebiao: '/topic/getawardList',
        //jiangpinliebiao: '/scripts/json/jiangpinliebiao.json',
        duihuan: '/topic/verifycode',
        //duihuan: '/scripts/json/duihuan.json',
        zajindan: "/topic/throwingeggs",
        //zajindan: "/scripts/json/zajindan.json",
        baokuanbiao: '/topic/recommendedloans',
        //baokuanbiao: '/scripts/json/baokuanbiao.json',
        save_address: '/topic/goodsreceipt',
        //save_address: '/scripts/json/save_address.json',
        my_gameCurrency: '/topic/getUserlotteryList',
        //my_gameCurrency: '/scripts/json/my_gameCurrency.json',
        my_award: '/topic/getMyAward',
        //my_award: '/scripts/json/my_award.json',
        timedistance: '/ajax/timedistance',
        //timedistance: '/scripts/json/timedistance.json', //params: position:14
        serverTime: '/ajax/serverTime',
        //serverTime: '/scripts/json/serverTime.json',
        getKillLoans: '/ajax/getKillLoans',
        //getKillLoans: '/scripts/json/getKillLoans.json',
        amusementgoods: '/topic/amusementgoods'
        //amusementgoods: '/../scripts/json/amusementgoods.json'
    }

 local

 {
        //laohujichoujiang: "/topic/slotmachines",
        laohujichoujiang: "/scripts/json/laohujichoujiang.json",
        //jiangpinliebiao: '/topic/getawardList',
        jiangpinliebiao: '/scripts/json/jiangpinliebiao.json',
        //duihuan: '/topic/verifycode',
        duihuan: '/scripts/json/duihuan.json',
        //zajindan: "/topic/throwingeggs",
        zajindan: "/scripts/json/zajindan.json",
        //baokuanbiao: '/topic/recommendedloans',
        baokuanbiao: '/scripts/json/baokuanbiao.json',
        //save_address: '/topic/goodsreceipt',
        save_address: '/scripts/json/save_address.json',
        //my_gameCurrency: '/topic/getUserlotteryList',
        my_gameCurrency: '/../scripts/json/my_gameCurrency.json',
        //my_award: '/topic/getMyAward',
        my_award: '/../scripts/json/my_award.json',
        //timedistance: '/ajax/timedistance',
        timedistance: '/../scripts/json/timedistance.json', //params: position:14
        //serverTime: '/ajax/serverTime',
        serverTime: '/scripts/json/serverTime.json',
        //getKillLoans: '/ajax/getKillLoans',
        getKillLoans: '/../scripts/json/getKillLoans.json',
        //amusementgoods: '/topic/amusementgoods'
        amusementgoods: '/../scripts/json/amusementgoods.json'
    }













 */

var app = require('./app'),
    //userMobile = $('body').attr('data-mobile'),
    userMobile = '***********',


    url_config = {
        laohujichoujiang: "/topic/slotmachines",
        //laohujichoujiang: "/scripts/json/laohujichoujiang.json",
        laohujigetprize: "/topic/laohujigetprize",
        //laohujigetprize: "/scripts/json/laohujigetprize.json",
        jiangpinliebiao: '/topic/getawardList',
        //jiangpinliebiao: '/scripts/json/jiangpinliebiao.json',
        duihuan: '/topic/verifycode',
        //duihuan: '/scripts/json/duihuan.json',
        zajindan: "/topic/throwingeggs",
        //zajindan: "/scripts/json/zajindan.json",
        zajindangetprize: "/topic/zajindangetprize",
        //zajindangetprize: "/scripts/json/zajindangetprize.json",
        baokuanbiao: '/topic/recommendedloans',
        //baokuanbiao: '/scripts/json/baokuanbiao.json',
        save_address: '/topic/goodsreceipt',
        //save_address: '/scripts/json/save_address.json',
        my_gameCurrency: '/topic/getUserlotteryList',
        //my_gameCurrency: '/scripts/json/my_gameCurrency.json',
        my_award: '/topic/getMyAward',
        //my_award: '/scripts/json/my_award.json',
        timedistance: '/ajax/timedistance',
        //timedistance: '/scripts/json/timedistance.json', //params: position:14
        serverTime: '/ajax/serverTime',
        //serverTime: '/scripts/json/serverTime.json',
        getKillLoans: '/ajax/getKillLoans',
        //getKillLoans: '/scripts/json/getKillLoans.json',
        amusementgoods: '/topic/amusementgoods'
        //amusementgoods: '/../scripts/json/amusementgoods.json'
    },
    cloud_ = require('../modules/games/mobile/cloud'),
    laohuji_ = require('../modules/games/mobile/laohuji'),
    zajindan_ = require('../modules/games/mobile/zajindan'),
    popwin_ = require('../modules/games/mobile/popwin'),

    bxSlider = require('../plugins/jquery.bxslider.min'),
    easing = require('../lib/jquery.easing.1.3'),
    template = require('../modules/template'),
    province = require('../modules/province'),
    jPages = require('../plugins/jPages.min'),
    countDown = require('../modules/countDown'),
    formMod = require('../modules/form'),
    player = require('../modules/audio'),
    loadmanage = require('../modules/loadmanage'),

    //hit_prize_name_list_ = require('../modules/games/mobile/hit_prize_name_list'),
    //balloon_ = require('../modules/games/balloon'),
    _countdowner = null,
    nowTime = $('body').attr('data-nowtime'),//当前时间戳（php）
    _tagTime = 1479398400,
    //_tagTime = 1478792929,
    uid = $('body').attr('uid'),
    prizeList = function(){
        var _cache = null;
        return function(callback){
            if(_cache){
                return callback(_cache);
            }else{
                $.ajax({
                    url: url_config.jiangpinliebiao,
                    type: 'post',
                    data:{
                        "topc_type":7
                    },
                    dataType: 'json',
                    success: function(res){
                        if(res.code == 200){
                            callback && callback(res.data);
                        }else{
                            callback && callback([]);
                        }
                    }
                });
            }
            return false;
        }
    }(),
    //创建随机数
    numberRandom = function(maxNum,minNmum){
        if(!minNmum)minNmum = 0;
        var _numberRandom = Math.round(minNmum + Math.random() * maxNum);
        return _numberRandom;
    },

    /*inBalloonTime = function(nowTime){
        var _nowTime = nowTime;
        _nowTime = new Date(_nowTime);
        var _beginDate = new Date();
        var _afterDate = new Date();
        _beginDate.setFullYear(_nowTime.getFullYear(),_nowTime.getMonth(),_nowTime.getDate());
        _beginDate.setHours(10,30,0);
        _afterDate.setFullYear(_nowTime.getFullYear(),_nowTime.getMonth(),_nowTime.getDate());
        _afterDate.setHours(11,0,0);
        _beginDate = _beginDate.getTime();
        _afterDate = _afterDate.getTime();
        if(nowTime < _beginDate){
            return 'before';
        }else if(nowTime > _afterDate){
            return 'after';
        }else{
            return 'can';
        }
    },
    canBalloon = inBalloonTime(nowTime*1000),*/
    xtyyhPager = function (obj){
        $.ajax({
            url : _Fn.mockServer + obj.url,
            type : 'post',
            data :{
                topc_type: obj.postData
            },
            dataType :'json',
            success: function(res){
                if(res.code == 200){
                    obj.successCallback && obj.successCallback(res);
                }
            },
            error : function(){

            }
        })
    },
    lightboxWrap = function (){

        if(!$('#lightbox_wrap').length){

            var lightbox = $('<div id="lightbox_wrap"></div>');

            lightbox.css({

                'width':'100%',

                'height':$(window).outerHeight()

            }).appendTo($('body'));

        }else{

            var lightbox = $('#lightbox_wrap');

            lightbox.fadeIn();

        }
    },
    //惊喜爆款标
    loansBuy = function(){
        var _timer = null;
        function getData(ele,callback){
            $.ajax({
                url: _Fn.mockServer + url_config.getKillLoans,
                type: 'post',
                data:{
                    "data_time":nowTime,//当前时间戳
                    "position":14//放标的整点时间
                },
                dataType: 'json',
                success: function(res){
                    if(res.code == 200){
                        var rate = res.data['rate'] ? res.data['rate'] : false,
                            tyRat = res.data['hot_rate_new'] ? res.data['hot_rate_new'] : false;
                        if(rate){
                            res.data.rate = rate.split(".")[0];
                            res.data.ratenum = rate.split(".")[1];
                        }
                        if(tyRat){
                            res.data.ty_rate = tyRat.split(".")[0];
                            res.data.ty_rate_num = tyRat.split(".")[1] ;
                        }

                    }
                    createdom && createdom(ele,res.data,'loansTpl');
                },
                error: function(){
                }
            })

        }
        function listen(ele,data){
            if(_timer){
                countDown.cleartimer();
            }
            if(data.countdown > 0){

                _timer = countDown.listen(
                    ele,
                    function(){
                        getData(ele);
                    },
                    url_config.serverTime,
                    function(timeFormart,time){
                        //每秒执行
                        //30/60关键秒执行
                        if(time <= 300000 && (time % 30000 == 0)){
                            if(!data.logo){
                                getData(ele,createdom);
                            }
                        }
                        if(time == 300000){
                            $('.fn-loans-tag').show();
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
                        //开始倒计时5分钟并且logo存在

                        if(data.logo){
                            html.push('<span class="ui-laons-loading-time-top-item">');
                            html.push(htmlTime[2]);
                            html.push('</span>');
                            html.push('<span class="ui-laons-loading-time-top-item">');
                            html.push(htmlTime[3]);
                            html.push('</span>');
                            html.push('<span class="ui-laons-loading-time-top-icons"></span>');
                            html.push('<span class="ui-laons-loading-time-top-item">');
                            html.push(htmlTime[4]);
                            html.push('</span>');
                            html.push('<span class="ui-laons-loading-time-top-item">');
                            html.push(htmlTime[5]);
                            html.push('</span>');
                        }else{
                            html.push('<span class="ui-laons-waiting-time-item">');
                            html.push(htmlTime[0]);
                            html.push('</span>');
                            html.push('<span class="ui-laons-waiting-time-item">');
                            html.push(htmlTime[1]);
                            html.push('</span>');
                            html.push('<span class="ui-laons-waiting-time-icons"></span>');
                            html.push('<span class="ui-laons-waiting-time-item">');
                            html.push(htmlTime[2]);
                            html.push('</span>');
                            html.push('<span class="ui-laons-waiting-time-item">');
                            html.push(htmlTime[3]);
                            html.push('</span>');
                            html.push('<span class="ui-laons-waiting-time-icons"></span>');
                            html.push('<span class="ui-laons-waiting-time-item">');
                            html.push(htmlTime[4]);
                            html.push('</span>');
                            html.push('<span class="ui-laons-waiting-time-item">');
                            html.push(htmlTime[5]);
                            html.push('</span>');
                        }
                        if(time <= 300000){
                            htmlTime.splice(4, 0, ':');
                            htmlTime.splice(0, 2);
                            $('.fn-loans-tag').html(htmlTime.join(''))
                        }
                        ele.html(html.join(''))

                    }
                ).id
            }
        }
        function createdom(ele,data,tpl){
            var content = template.render(tpl,{data: data});
            xtyyh.domCache.$games.html(content);
            listen($(ele),data);
        }

        return {
            init : function(ele){
                getData(ele);
                //lightboxWrap();
            }
        }
    }(),
    alertTplCreat = function (alertType,data,callback){
        $('.fn-alertbg').remove();
        data.alertType = alertType;
        var content = template.render('alertlistTpl',{data:data});
        lightboxWrap();
        $('body').append(content);
        callback && callback();
    },
    _timeRange = function(){
        if(nowTime < _tagTime){
            return true;
        }else{
            xtyyh.alert('不在活动时间范围内！');
            return false;
        }
    };

popwin_.init({
    url_config: url_config,
    laohuji_: laohuji_,
    zajindan_: zajindan_
});
cloud_.setLoadmanage(loadmanage);
var xtyyh = function(){
    return {
        domCache : {},
        getQueryString: function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        //alert
        alert: function(message){
            if(xtyyh.domCache.alert_flag) {
                clearTimeout(xtyyh.domCache.alert_flag);
                xtyyh.domCache.alert_flag = null;
            }
            var $popupBasic = $('#popupBasic').find('span').html(message).end().show();
            setTimeout(function(){
                $popupBasic.addClass('shake_popup').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                    $(this).removeClass('shake_popup').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                        $(this).hide();
                    });
                });
            }, 18);

            xtyyh.domCache.alert_flag = setTimeout(function(){
                $('#popupBasic').hide();
            }, 2500);
        },
        //横屏竖屏　提示
        shupingTip: function(){
            var $shuping = $('#shupingTip');
            if($shuping.length == 0){
                var shupingHtml = '<div id="shupingTip" class="shuping"><div class="content"><img class="img" src="/styles/images/topic/xtyyh/mobile/shenpingshuping.jpg"><div class="text">为了更好的体验，请使用横屏浏览</div></div></div>';
                var $shupingDom = $(shupingHtml);
                $('body').append($shupingDom);
                /*$shupingDom.on('touchend click',function(e){
                    $shupingDom.hide().find('img.img').removeClass('shupingAnimate');
                });*/
                $shupingDom.find('img.img').addClass('shupingAnimate')
            }else{
                $shuping.show().find('img.img').addClass('shupingAnimate');
            }
        },
        //首页标题放大样式
        loopZoomTitleAnimate:　function ($dom, $g_title_imgs){
            if(!xtyyh.domCache.inMainBoard) {
                if(xtyyh.domCache.deng_play_flag){
                    clearInterval(xtyyh.domCache.deng_play_flag);
                    xtyyh.domCache.deng_play_flag = null;
                    xtyyh.domCache.$g_deng.show();
                }
                if(xtyyh.domCache.tuzi_play_flag){
                    clearInterval(xtyyh.domCache.tuzi_play_flag);
                    xtyyh.domCache.tuzi_play_flag = null;
                    xtyyh.domCache.$g_tuzi.show();
                }
                return;
            }else{
                if(!xtyyh.domCache.deng_play_flag)
                xtyyh.domCache.deng_play_flag = setInterval(function(){
                    var flag = xtyyh.domCache.$g_deng.css('display');
                    if(flag == 'none'){
                        xtyyh.domCache.$g_deng.show();
                    }else{
                        xtyyh.domCache.$g_deng.hide();
                    }
                }, 600);
                if(!xtyyh.domCache.tuzi_play_flag)
                    xtyyh.domCache.tuzi_play_flag = setInterval(function(){
                        var flag = xtyyh.domCache.$g_tuzi.css('display');
                        if(flag == 'none'){
                            xtyyh.domCache.$g_tuzi.show();
                        }else{
                            xtyyh.domCache.$g_tuzi.hide();
                        }
                    }, 800);
            }

            $dom.addClass('play').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('play');
                var index = 0,i=0,len=$g_title_imgs.length;
                for(;i<len;i++){
                    if(this == $g_title_imgs.get(i)){
                        index = i;
                        break;
                    }
                }
                if(i == len - 1){
                    xtyyh.loopZoomTitleAnimate($g_title_imgs.eq(0), $g_title_imgs);
                }else{
                    xtyyh.loopZoomTitleAnimate($g_title_imgs.eq(i+1), $g_title_imgs);
                }
            });
        },
        gameTimeDown: function (){
            _countdowner = countDown.listen(
                $('.fn-balloon-head-time-inner'),
                function(){
                    balloon_.gametimeout();
                    $('.fn-balloon-head-time-inner').html('00');
                },
                url_config.serverTime,
                function(timeFormart,time){
                    timer = timeFormart.split('|')[1].split(',');
                    var html = [];
                    for(var i = 0 ; i < timer.length ; i++){
                        if(i<5){
                            continue;
                        }
                        for(var j = 0 ; j < timer[i].length; j++){
                            if(j > 0){

                            }
                            html.push(timer[i][j]);
                        }
                    }

                    $('.fn-balloon-head-time-inner').html(html.join(''));
                }
            ).id;
        },
        isWeiXin : function (){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        },
        //页面初始化方法
        init : function () {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('showToolbar');
                    WeixinJSBridge.call('showOptionMenu');
            });

            jQuery.easing['jswing'] = jQuery.easing['swing'];


            $(document).ready(function () {
                var currentScrollValue_ = 1;
                var domCache = this.domCache;
                domCache.$first_loading = $('.first_loading');
                domCache.$first_loading.css({
                    width:$(window).width(),
                    height:$(window).height()
                })
                domCache.$first_loading.find('img').css({
                    height:$(window).height(),
                    width:'auto',
                    position:'absolute',
                    left:'50%',
                    top:'50%',
                    transform: 'translate(-50%, -50%)',
                    '-webkit-transform': 'translate(-50%, -50%)',
                    '-moz-transform': 'translate(-50%, -50%)',
                    '-o-transform': 'translate(-50%, -50%)'
                });
                domCache.$g_board = $('.g_board');
                domCache.$main_board = $('#main_board');
                domCache.$cloud_container = $('#cloud_container');
                if(xtyyh.isWeiXin()){
                    /*domCache.$g_board.addClass('g_board_weixin');
                    domCache.$cloud_container.addClass('cloud_container_weixin');*/
                }else{
                    /*$('#main_board').css("height", window.innerHeight+1+'px');
                    document.addEventListener('touchend', function(e){
                        if(domCache.$main_board.hasClass('ui-page-active')) {
                            currentScrollValue_ == 1 ? currentScrollValue_ = 2 : currentScrollValue_ = 1;
                            window.scrollTo(0, currentScrollValue_);
                        }
                    }, false);
                    setTimeout(function(){
                        window.scrollTo(0, 1);
                    }, 1);*/
                }





                /*document.addEventListener('touchmove', function(e){
                    e.preventDefault();
                    window.scrollTo(0, 1);
                }, false);
                setTimeout(function(){
                    window.scrollTo(0, 1);
                }, 1);
                $(document).on('scroll', function(){
                    if(domCache.$main_board.hasClass('ui-page-active')){
                        window.scrollTo(0, 1);
                    }
                });*/


                /*$(window).on('resize', function(){
                    alert('fldsjflsdf');
                    window.scrollTo(0, 0);
                    window.scrollTo(0, 1);
                });
                $(document).on('scroll', function(){
                    alert('000000');
                    window.scrollTo(0, 0);
                    window.scrollTo(0, 1);
                });*/

                /*document.addEventListener('touchmove', function(e){
                    e.preventDefault();
                }, false);*/
                /*$(document).on('scroll', function(){
                    window.scrollTo(0, 1);
                });*/
                //$('#main_board').height(window.innerHeight+2);
                /*setTimeout(function () {
                    $(window).stop().animate({scrollTop: 85}, 400);
                }, 1000);*/

                /*function hideBar(fn) {
                    document.body.style.height = Math.max(window.innerHeight, window.innerWidth) * 2 + 'px';
                    setTimeout(function () {
                        window.scrollTo(0, 1);
                        setTimeout(function () {
                            document.body.style.height = windows.innerHeight + 'px';
                        }, 10);
                    }, 10);
                };
                setTimeout(function () {
                    hideBar();
                }, 1000);*/
                    //$('#main_board').autoHidingNavbar();

                //<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, minimal-ui" />
                /*window.onload=function(){
                    if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
                        bodyTag = document.getElementsByTagName('body')[0];
                        bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
                    }
                    setTimeout(function() {
                        window.scrollTo(0, 1)
                    }, 0);
                };
                document.documentElement.webkitRequestFullScreen();*/






                /*$('body').css({height: '101%', 'padding-top': '1%'});
                setTimeout(function(){
                    window.scrollTo(0, '1%');
                }, 1);
                $(document).on('scrollstop', function(){
                    if(domCache.$main_board.hasClass('ui-page-active')){
                        $('html').stop().animate({scrollTop: '1%'}, 10, function(window){
                            window.scrollTo(0, '1%');
                        }.bind(null, window));
                    }
                });*/
                /**
                 * 判断屏幕是否横屏
                 */
                window.addEventListener('orientationchange', function(event){
                    if ( window.orientation == 180 || window.orientation == 0 ) {
                        xtyyh.shupingTip();
                    }else{
                        //$('#shupingTip').click().touchend();
                        $('#shupingTip').hide();
                    }
                });



                /*$(window).on('resize', function(){
                    var $g_prize_container = $('.g_prize_container');
                    if($g_prize_container.length){
                        var prizeH = $g_prize_container.height();
                        $g_prize_container.find('div.g_prize').each(function(i, o){
                            o.style.cssText = 'height:'+prizeH+'px;';
                        });
                        laohuji_.setPrizeHeight(prizeH+8);
                        var results = laohuji_.getResult().data;

                        if(results) {
                            prizeH+=8;
                            $g_prize_container.find('div.g_prizes').each(function(_i, o){
                                var container = $(this);
                                if (results[0] == results[1] && results[1] == results[2]) {
                                    var prizeId = 0, lhj_ps = laohuji_.getPrizes(), i = 0, len = lhj_ps.length;
                                    for (; i < len; i++) {
                                        if (lhj_ps[i].id == results[_i]) {
                                            prizeId = results[_i];
                                            break;
                                        }
                                    }
                                } else {
                                    var prizeId = results[_i];
                                }
                                var prizeIndex = container.find('div[prize_num="' + prizeId + '"]').index();
                                container.css('bottom', -(prizeH * (container.children().length - 1 - prizeIndex))+'px');
                            });
                        }
                    }
                });*/


                var isShuping = window.orientation == 180 || window.orientation == 0;
                if ( isShuping ) {
                    xtyyh.shupingTip();
                }

               

                domCache.$g_zaqiqiu = domCache.$g_board.find('div.g_zaqiqiu');
                domCache.$g_deng = domCache.$g_board.find('div.g_deng');
                domCache.$g_tuzi = domCache.$g_board.find('div.g_tuzi');
                domCache.$g_laohuji = domCache.$g_board.find('div.g_laohuji');
                domCache.$g_zajindan = domCache.$g_board.find('div.g_zajindan');
                domCache.$g_baokuanbiao = domCache.$g_board.find('div.g_baokuanbiao');

                domCache.$bg = $('.bg');
                domCache.$g_title_imgs = $('.t_img');
                domCache.$games = $('.games');
                domCache.$site_btns = $('.site_btns');
                domCache._laohujiNum = parseInt(domCache.$games.attr('data-laohuji'));
                domCache._zajindanNum = parseInt(domCache.$games.attr('data-zajindan'));

                xtyyh.domCache.inMainBoard = true;

                //判断用户是否登入，如果没有登入显示登入按钮，否则隐藏按钮
                if(uid == '0'){//
                    domCache.$site_btns.removeClass('logined');
                }else
                    domCache.$site_btns.addClass('logined');
                //初始化代码-------------------start--------------------------


                loadmanage([
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/board.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/cloud.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/loading.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/login.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/logo_tianyan.jpg',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/menu.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/processbar.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/processbar_slider.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/shenpingshuping.jpg',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/tip.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/tip1.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/g_title/g_title_baokuanbiao.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/g_title/g_title_gonglue.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/g_title/g_title_shuang11.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/g_title/g_title_zajindan.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/g_title/g_title_zaqiqiu.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/g_title/shuang11_deng.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/g_title/tuzi.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/hit_prize_record.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/activity_finished.png',
                    '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/address.png'
                ],function(){
                    setTimeout(function(){
                        domCache.$first_loading.hide();
                        xtyyh.loopZoomTitleAnimate(domCache.$g_title_imgs.eq(0), domCache.$g_title_imgs);

                        var gameType = localStorage.getItem("gameType");
                        if(gameType == "g_baokuanbiao"){
                            domCache.$g_baokuanbiao.trigger('touchend');
                        }else if(gameType == "g_zaqiqiu"){
                            domCache.$g_zaqiqiu.trigger('touchend');
                        }else if(gameType == "g_laohuji"){
                            domCache.$g_laohuji.trigger('touchend');
                        }else if(gameType == "g_zajindan"){
                            domCache.$g_zajindan.trigger('touchend');
                        }
                        localStorage.setItem("gameType", "g_board");
                    }, 500);

                },function(a,b){
                    if((b/a*100) == 100){

                    }
                });

                //初始化代码-------------------end--------------------------



                $("body").on("touchstart", function(e){
                    domCache.touchmove = false;
                }).on("touchmove", function(e){
                    domCache.touchmove = true;
                }).on("touchend", function(e){
                    if(domCache.touchmove){
                        return;
                    }
                    var t = e.target,
                        $t = $(t);
                    if($t.hasClass('g_baokuanbiao')){//爆款标页面
                        return;
                        xtyyh.domCache.inMainBoard = false;
                        cloud_.play(domCache.$g_board, function($games){
                            loansBuy.init('.fn-laons-timedown');
                        }.bind(null, domCache.$games), null, [
                            '//licai.p2peye.com/styles/images/topic/xtyyh/pc/loans-bg.png'
                        ]);
                    }else if($t.hasClass('g_laohuji')){//老虎机页面
                        xtyyh.domCache.inMainBoard = false;
                        cloud_.play(domCache.$g_board, function(){
                            prizeList(function(prizesdata){
                                var _prizesdata = function(){
                                    for(var i in prizesdata){
                                        prizesdata[i]['img'] = '//img.p2peye.com'+prizesdata[i]['img'];
                                    }
                                    return prizesdata;
                                }();
                                prizesdata = _prizesdata;
                                laohuji_.init(domCache.$games, {
                                    template: null,
                                    url: url_config.laohujichoujiang,
                                    url_prize_result: url_config.laohujigetprize,
                                    soundPlayer: player({
                                        src:[{
                                            src:'//licai.p2peye.com/styles/audio/laohuji.mp3',
                                            type:'audio/mpeg'
                                        },{
                                            src:'//licai.p2peye.com/styles/audio/laohuji.ogg',
                                            type:'audio/ogg'
                                        }],
                                        autoplay:false,
                                        preload:'auto',
                                        controls:'controls',
                                        loop:'loop',
                                        show:'show'
                                    }),
                                    beforePlay:function(){
                                        if(!_timeRange())return;
                                        if(!_Fn.isLogin(function(){
                                                $.cookie('_xtyyh_login_t','slotmachines',{path:'/'});
                                            }))return;
                                        if(!_Fn.isBind())return;
                                        if($('.hasgamegold').html() <= 0){
                                            xtyyh.alert('游戏币已用完，去获取游戏币吧！');
                                        }else{
                                            return true;
                                        }
                                    },
                                    topMessage: '您还有<span class="hasgamegold">' + domCache._laohujiNum + '</span>次抽奖机会!',
                                    errorprizes : {
                                        id:0,
                                        award_name:'神秘奖品',
                                        img:'/styles/images/topic/xtyyh/pc/prize.jpg'
                                    },
                                    hasSound: true,
                                    successCallback: function(data){
                                        if(data.data.award_type != "20"){//活动还没开始
                                            popwin_.pop_getPrize_win(domCache.$g_board, {
                                                prize: data.data
                                            });
                                        }else{//award_type
                                            popwin_.pop_xiexiecanyu_win(domCache.$g_board);
                                        }
                                        domCache._laohujiNum = data.data.ordinary ? data.data.ordinary : 0;
                                        $('.hasgamegold').html(domCache._laohujiNum);

                                    },
                                    errorCallback: function(data){
                                        xtyyh.alert(data.message);
                                    },
                                    resultReset : function(data){
                                        function getnewData(){
                                            var arr = [];

                                            function isHasData(index){

                                                var temp = false;

                                                var len = arr.length;

                                                for(var i = 0 ; i <arr.length; i++){

                                                    if(arr[i] == index){
                                                        temp = true;
                                                    }
                                                }

                                                return temp;
                                            }
                                            function newData(){
                                                var _random = parseInt(numberRandom(prizesdata.length - 1,0));

                                                if(isHasData(_random) && arr.length < 3){
                                                    return newData();
                                                }else{
                                                    arr.push(_random);
                                                    if(arr.length != 3){
                                                        return newData();
                                                    }else{
                                                        return arr;
                                                    }
                                                }

                                            }
                                            var data = newData(),
                                                defaultdata = [];

                                            for(var i in data){
                                                defaultdata.push(prizesdata[data[i]]['id']);
                                            }

                                            return defaultdata;

                                        }
                                        if(data.code == 200){
                                            if(data.data.award_type == 20){
                                                data.data = getnewData();
                                                return data;
                                            }else{
                                                var arr = [];
                                                arr.push(data.data['id']);
                                                arr.push(data.data['id']);
                                                arr.push(data.data['id']);
                                                data.data = arr;
                                                return data;
                                            }
                                        }else{
                                            data.data = getnewData()
                                            return data;
                                        }
                                    },
                                    errorCallback:function(data){
                                        xtyyh.alert(data.message);
                                    },
                                    prizes:prizesdata
                                });
                            });
                        }, null, [
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/laohuji/back.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/laohuji/laohuji.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/laohuji/laohuji_bg.jpg',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/laohuji/btns/sound_off.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/laohuji/btns/sound_on.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/laohuji/btns/start.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/laohuji/btns/start_light.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/pc/prize.jpg',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/zaocheng.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/get_game_currency_raiders.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/jiaxibiao.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/my_game_currency.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/thank_participating.png'
                        ], 'laohuji');
                    }else if($t.hasClass('g_zaqiqiu')){//进入砸气球页面
                        popwin_.pop_end_of_activity_win(domCache.$g_board);
                        return;
                    }else if($t.hasClass('g_zajindan')){//砸金蛋页面
                        xtyyh.domCache.inMainBoard = false;
                        cloud_.play(domCache.$g_board, function(){
                            zajindan_.init(domCache.$games, {
                                template: null,
                                url: url_config.zajindan,
                                url_prize_result: url_config.zajindangetprize,
                                url_config: url_config,
                                soundPlayer: player({
                                    src:[{
                                        src:'//licai.p2peye.com/styles/audio/zajindan.mp3',
                                        type:'audio/mpeg'
                                    },{
                                        src:'//licai.p2peye.com/styles/audio/zajindan.ogg',
                                        type:'audio/ogg'
                                    }],
                                    autoplay:false,
                                    preload:'auto',
                                    controls:'controls',
                                    show:'show'
                                }),
                                message: '您当前还有<span class="hasgamehammer">' + domCache._zajindanNum + '</span>个金锤可用！',
                                hasSound: true,
                                beforePlay:function(){
                                    if(!_timeRange())return;
                                    if(!_Fn.isLogin(function(){
                                            $.cookie('_xtyyh_login_t','throwingeggs',{path:'/'});
                                        }))return;
                                    if(!_Fn.isBind())return;
                                    if($('.hasgamehammer').html() == 0){
                                        xtyyh.alert('请获取更多抽奖机会!');
                                        return;
                                    }
                                    return true;
                                },
                                successCallback: function(data){
                                    if(data.data.award_type != '20'){//活动还没开始
                                        popwin_.pop_zajindan_win(domCache.$g_board, {
                                            prize: data.data
                                        });
                                    }else{
                                        popwin_.pop_xiexiecanyu_win(domCache.$g_board);
                                    }
                                    domCache._zajindanNum = data.data && data.data.ordinary ? data.data.ordinary : 0;
                                    $('.hasgamehammer').html(domCache._zajindanNum);
                                },
                                errorCallback: function(data){
                                    xtyyh.alert(data.message);
                                }
                            });
                        }, null, [
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/laohuji/laohuji_bg.jpg',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/zajindan/chuizi.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/zajindan/egg.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/zajindan/egg_board.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/zajindan/egg_down.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/zajindan/egg_up.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/zajindan/jindan-suipian.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/cz_cash_prize.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/get_more_cz.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/jiaxibiao.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/t_hit_prize.png',
                            '//licai.p2peye.com/styles/images/topic/xtyyh/mobile/popwin/thank_participating.png'
                        ], 'zajindan');
                    }else if($t.hasClass('hit_record')){//中奖记录查询按钮
                        if(!_Fn.isLogin())return;
                        if(!_Fn.isBind())return;
                        xtyyhPager({
                            url: url_config.my_award,
                            num: 4,//每页显示条数
                            postData: null,
                            successCallback: function(data){
                                popwin_.pop_myHitRecord_win(domCache.$g_board, {
                                    data: data,
                                    callback: function(data, $pagerDom){
                                        $pagerDom.jPages({
                                            containerID : "myHitRecord",
                                            previous : "上一页",
                                            next : "下一页",
                                            perPage : 4,
                                            delay : 20,
                                            scrollBrowse : true
                                        });
                                    }
                                });
                            }
                        });
                    }else if($t.hasClass('address')){//收货地址
                        //if(!_timeRange())return;
                        if(!_Fn.isLogin())return;
                        if(!_Fn.isBind())return;

                        var data = {};
                        $.ajax({
                            url: _Fn.mockServer + '/topic/amusementgoods',
                            type: 'post',
                            dataType: 'json',
                            success: function(res){
                                if(res.code == 200){
                                    var addressType = 0;
                                    if(!res.data){
                                        addressType = 1;
                                    }
                                    alertTplCreat(7,{
                                        'data': res.data,
                                        'addressType': addressType,
                                        'mobile':userMobile
                                    },function(){
                                        if(addressType == 1){
                                            province.init('cmbProvince', 'cmbCity', 'cmbArea');
                                        }                    
                                    });
                                }
                            }
                        });
                    }else if($t.hasClass('go_back')){//退出游戏按钮
                        var isplaying = (laohuji_ && laohuji_.isPlaying()) || (zajindan_ && zajindan_.isPlaying())
                        if(isplaying){
                            xtyyh.alert('游戏进行中，客官不要走！');
                        }else{
                            cloud_.play(domCache.$g_board, function(){
                                domCache.$games.empty();
                                var $lightbox = $('#lightbox_wrap');
                                $lightbox.length > 0 ? $lightbox.hide() : null;
                            }, function(){
                                xtyyh.domCache.inMainBoard = true;
                                xtyyh.loopZoomTitleAnimate(domCache.$g_title_imgs.eq(0), domCache.$g_title_imgs);
                                //hit_prize_name_list_.play(xtyyh);
                            });
                        }
                    }else if($t.hasClass('fn-balloon-head-close')){
                        $('.fn-alertbg').hide();
                        $('#lightbox_wrap').hide();
                        cloud_.play(domCache.$g_board, function(){
                            domCache.$games.empty();
                            $('#lightbox_wrap').remove();
                            $('.fn-alertbg').remove();
                        }, function(){
                            xtyyh.domCache.inMainBoard = true;
                            xtyyh.loopZoomTitleAnimate(domCache.$g_title_imgs.eq(0), domCache.$g_title_imgs);
                            //hit_prize_name_list_.play(xtyyh);
                        });
                    //老虎机页面
                    }else if ($t.hasClass('get_changes')) {//获取更多机会
                        if(!_timeRange())return;
                        if(!_Fn.isLogin())return;
                        if(!_Fn.isBind())return;
                        popwin_.pop_getGameCurrency_win(domCache.$g_board);
                    } else if ($t.hasClass('g_currency')) {//我的游戏币
                        if(!_timeRange())return;
                        if(!_Fn.isLogin())return;
                        if(!_Fn.isBind())return;

                        xtyyhPager({
                            url: url_config.my_gameCurrency,
                            num: 5,//每页显示条数
                            postData: 7,
                            successCallback: function(data){
                                popwin_.pop_myGameCurrency_win(domCache.$g_board, {
                                    data: data,
                                    callback: function(data, $pagerDom){
                                        $pagerDom.jPages({
                                            containerID : "myGameCurrency",
                                            previous : "上一页",
                                            next : "下一页",
                                            perPage : 5,
                                            delay : 20,
                                            scrollBrowse : true
                                        });
                                    }
                                });
                            }
                        });
                    //金蛋页面
                    } else if ($t.hasClass('get_more_cz')){
                        if(!_timeRange())return;
                        popwin_.pop_getMoreCZ_win(domCache.$g_board);
                    }/* else if ($t.hasClass('g_shuang11')){
                        xtyyh.alert('11月11日，即将开启!');
                    }*/ else if ($t.hasClass('redeem')){
                        if(!_timeRange())return;
                        if($t.data('isRequesting')){
                            return;
                        }
                        $t.data('isRequesting', true).parent().submit();
                        setTimeout(function(){
                            $t.data('isRequesting', false);
                        }, 2000);
                    } else if ($t.hasClass('show_more_item')){
                        if(!_timeRange())return;
                        if(!_Fn.isLogin())return;
                        if(!_Fn.isBind())return;
                        xtyyhPager({
                            url: url_config.my_gameCurrency,
                            num: 5,//每页显示条数
                            postData: 6,
                            successCallback: function(data){
                                popwin_.pop_cz_awardRecords_win(domCache.$g_board, {
                                    data: data,
                                    callback: function(data, $pagerDom){
                                        $pagerDom.jPages({
                                            containerID : "cz_awardRecords",
                                            previous : "上一页",
                                            next : "下一页",
                                            perPage : 5,
                                            delay : 20,
                                            scrollBrowse : true
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

            }.bind(this));
        }
    }
}();



//收货地址表单验证
formMod.listen('/topic/goodsreceipt',{
    validSuccess:function(validResutl){
    },
    validError:function(validResutl){
        var item  = validResutl.element;
        if(item.attr('name')=='consignee'){
            if(validResutl.valid == 'notempty'){
                if(!item.siblings('.ui-address-error').length){
                    item.parent().append('<span class="ui-address-error">*收件人不能为空！</span>');
                }
            }
        }
        if(item.attr('name')=='address'){
            if(validResutl.valid == 'notempty'){
                if(!item.siblings('.ui-address-error').length){
                    item.parent().append('<span class="ui-address-error">*地址不能为空！</span>');
                }
            }
        }
        if(item.attr('name')=='phone'){
            if(validResutl.valid == 'mobile'){
                if(!item.siblings('.ui-address-error').length){
                    item.parent().append('<span class="ui-address-error">*请确认手机号准确无误！</span>');
                }
            }
        }
        if(item.attr('name')=='zip'){
            if(validResutl.valid == 'notempty' || validResutl.valid == 'len'){
                if(!item.siblings('.ui-address-error').length){
                    item.parent().append('<span class="ui-address-error">*请输入正确的邮编号！</span>');
                }
            }
        }

    },
    cleanup:function(item){
        item.siblings('.ui-address-error').remove();
    },
    success:function(result){

        if(result.data.code == 200){

            $('.popwin_address_close').click();
            xtyyh.alert('保存成功！')

        }else{

            xtyyh.alert(result.data.message);

        }

    },
    error:function(){
    }
});
formMod.listen(url_config.duihuan, {
    validSuccess:function(validResutl){
    },
    validError:function(validResutl){
        if(!_timeRange())return;
        var item  = validResutl.element;
        if(item.attr('name')=='code'){
            if(validResutl.valid == 'notempty'){
                xtyyh.alert('兑换码不能为空！');
            }
        }

    },
    cleanup:function(item){

    },
    success:function(result){
        if(!_timeRange())return;
        if(result.data.code == 200){

            var valHammer = $('.hasgamehammer').html() * 1;

            $('.hasgamehammer').html(valHammer + 1);
            xtyyh.alert('恭喜您，成功兑换一个金锤！');
        }else{
            xtyyh.alert(result.data.message);
        }

    },
    error:function(){
    }
});
xtyyh.init.bind(xtyyh)();




function timeDownHide(){
    var htmlAddLock1 = true,
        htmlAddLock2 = true,
        htmlAddLock3 = true;
        
    //每天14：00时间戳
    $.ajax({
        url : _Fn.mockServer + '/ajax/timedistance',
        data:{
            position: 14
        },
        type : 'post',
        dataType :'json',
        success: function(res){
            if(res.code == 200){
                var data = {
                    server_time: nowTime + 0,
                    countdown: res.data.countdown + 0
                }
                var content = template.render('timedownhideTpl',data);
                $('body').append(content);
                __countDown();
            }
        },
        error : function(){
        }
    });
    function __countDown(){
        countDown.listen(
            $('.fn-timedownhide'),
            function(){
                var str = '<div class="ui-october-main-body-loans-tag-top">开始时间</div><div class="ui-october-main-body-loans-tag-bottom fn-loans-tag-time">14:00</div>';
                $('.fn-loans-tag').html(str);
            },
            '/ajax/serverTime',
            function(timeFormart,time){
                timer = timeFormart.split('|')[1].split(',');
                var html = [];
                for(var i = 0 ; i < timer.length ; i++){
                    if(i < 4){
                        continue;
                    }
                    for(var j = 0 ; j < timer[i].length; j++){
                        if(j > 0){
                            
                        }
                        html.push(timer[i][j]);
                    }
                }
                var _html = html;
                var beginHtml4 = '<div class="up">距离开始</div><div class="down fn-loans-tag-time">00:00</div>';
                if(time <= 300000){
                    //主场爆款标倒计时开始13：55
                    if(htmlAddLock3){
                        $('#s_t_baokuanbiao').html(beginHtml4);
                        htmlAddLock2 = false;
                    }
                    html.splice(2, 0, ':');
                    $('.fn-loans-tag-time').html(html.join(''));
                }

            }
        );
    }
    
}
if(nowTime < _tagTime){
    timeDownHide();
}
$('body')
    .on('touchend click','.popwin_address_close',function(){
        $('#lightbox_wrap').remove();
        $('.fn-alertbg').remove();
    })

