var 
    numberRandom = function(maxNum,minNmum){
        if(!minNmum)minNmum = 0;
        var _numberRandom = Math.round(minNmum + Math.random() * maxNum);
        return _numberRandom;
    },
    listenType = _Fn.isMobile() ? 'touchend' : 'click',
    //疯狂扎气球
    balloonGame = function(){
        var balloonStyleArray = [
            {
                "class":'balloon1',
                height: 88,
                width: 62
            },
            {
                "class":'balloon2',
                height: 97,
                width: 68
            },
            {
                "class":'balloon3',
                height: 106,
                width: 99
            },
            {
                "class":'balloon4',
                height: 100,
                width: 94
            },
            {
                "class":'balloon5',
                height: 124,
                width: 94
            },
            {
                "class":'balloon6',
                height: 113,
                width: 112
            },
            {
                "class":'balloon7',
                height: 119,
                width: 82
            },
            {
                "class":'balloon8',
                height: 104,
                width: 75
            },
            {
                "class":'balloon9',
                height: 112,
                width: 100
            },
            {
                "class":'balloon10',
                height: 122,
                width: 108
            }
        ],
        //形态各异的气球
        option = {
            url: '/topic/balloon',//异步请求奖品地址
            _url: '/topic/balloonTimecheck',//游戏机会次数校验
            uid: null,
            ajaxData: {
                bomb: 0,
                balloon: 0
            },//异步请求奖品传的参数
            _ajaxData: null,//异步请求游戏机会次数的参数
            balloonStyleArray: balloonStyleArray,//不同样式的气球class以及宽高
            balloonClickSound: null,//气球音
            bombClickSound: null,//炸弹音
            bgSound: null,//背景音
            gameOverDiv: '.fn-balloon-foot',//游戏结束提示
            balloonItem: '.ui-balloon-body-item',//单个气球项
            timeOutFn: null,//游戏超时
            successFn: null,//游戏结束，请求成功回调
            successCheckFn: null,
            errorFn: null,
            errorCheckFn: null,
            gameTimeDownFn: null,//游戏倒计时
            clearTimerFn: null,//清除游戏倒计时
            closeSound: 'ui-balloon-music-close',
            openSound: 'ui-balloon-music-open',
            soundAllow: true,
            playing: false
        },
        balloonTimer = null
        killBalloonNumber = 0;
        $('body')
            .on(listenType,'.' + option.closeSound,function(){
                soundPlayer(option.bgSound);               
                option.soundAllow = false;
                $(this).attr('class',option.openSound);
            })
            .on(listenType,'.' + option.openSound,function(){
                soundStop(option.bgSound);
                option.soundAllow = true;
                $(this).attr('class',option.closeSound)
            })
        
        function balloonGameTime(options){
            $.ajax({
                type: 'post',
                url: _Fn.mockServer + option._url,
                dataType:'json',
                success: function(res){
                    init(options);
                    if(res.code == 200){
                        _init();
                        option.successCheckFn && option.successCheckFn();
                    }else if(res.code == 5160){                       
                        $('.fn-balloon-foot').html('<img class="ui-balloon-foot-timeout" src="/styles/images/topic/xtyyh/pc/balloons-timeout.png" alt="游戏时间已到"/>');
                        gameOverIn();
                    }else{
                        option.errorCheckFn && option.errorCheckFn(res.message);
                    }
                },
                error: function(){
                    _Fn.alert('谢谢参与！');
                }
            });
        }
        function circleCreate(type){
            var htmlArray = [];
            var outheight = 50;
            var balloon = option.balloonStyleArray[numberRandom(option.balloonStyleArray.length-1)];
            var _itemparent = document.createElement('div'); 
            var itemparent = $(_itemparent);
                
            if(type == 1){
                itemparent.html('<a href="javascript:;" class="bomb"></a>');
                itemparent.attr({
                    'class':'ui-balloon-body-item bombs'
                })
                
            }else{
                itemparent.html('<a href="javascript:;" class="balloon"></a>');
                itemparent.attr({
                    'class':'ui-balloon-body-item '+balloon["class"]
                })
            }

            itemparent.css({
              top: $(window).height() + outheight,
              left:numberRandom($(window).width() - balloon["width"])
            })

            $('.ui-balloon-body').append(itemparent);

            circleAnimate(_itemparent,itemparent);
        }
        //单个气球或炸弹上升动画
        function circleAnimate(item,$item){

            var top = $item.css('top');
            $item.animate({
                top: '-124px'
            },numberRandom(9000,5000),function(){
                if(!item.parentNode)return;
                item.parentNode.removeChild(item);
                delete item;
            });
            $item.find('.balloon').on(listenType, function(event){
                var that = $(this);
                if(that.hasClass('ed')){
                    return;
                }
                $(this).addClass('ed');

                var clickX = parseFloat($(this).parents('.ui-balloon-body-item').css('left')),
                    clickY = parseFloat($(this).parents('.ui-balloon-body-item').css('top')),
                    giftNumer = $('.fn-balloon-head-gift-num').text() - 0;
                giftNumer ++;
                option.ajaxData.balloon ++;
                $(this).attr('class','ui-balloon-body-item balloon-click ed');
                $(this).css({
                    left: clickX + 60,
                    top: clickY + 80
                });
                $('.fn-balloon-head-gift-num').text(giftNumer);
                $('.fn-balloon-head-gift-up').fadeIn();
                $(this).stop().fadeOut(200,function(){
                    item.parentNode.removeChild(item);
                    delete item;
                    $('.fn-balloon-head-gift-up').hide();
                });
                killBalloonNumber ++;
                if(option.soundAllow){
                    soundPlayer(option.balloonClickSound);
                }
                
            });
            $item.find('.bomb').on(listenType, function(){
                option.ajaxData.bomb = 1;
                gameOver();
                if(option.soundAllow){
                    soundPlayer(option.bombClickSound);
                }
            })

        }
        //批量创建气球或炸弹
        function circlesCreate(len,time){

            var balloonBombRandom = [0,0,0,1];
                
            function create(){
                for(var i = 0 ; i < len ; i++){
                    circleCreate(balloonBombRandom[numberRandom(3)]);

                    if(i == len - 1){
                        balloonTimer = setTimeout(create,time);                
                    }
                }
            }
            balloonTimer = setTimeout(create,time);
        }
        function getPrizes(){
            
            var timeRandom = numberRandom(5000,1000);

            if(!option.url)return;
            
            setTimeout(function(){
                $.ajax({
                    type: 'post',
                    url: _Fn.mockServer + option.url,
                    data: option.ajaxData,
                    dataType:'json',
                    success: function(res){
                        if(!res){
                            option.errorFn && option.errorFn('谢谢参与!');
                            return;
                        }
                        if(res.code == 200){
                            res.data.killBalloonNumber = killBalloonNumber;
                            option.successFn && option.successFn(res.data);
                        }else{
                            option.errorFn && option.errorFn(res.message);
                        }
                        gameOverOut();
                    },
                    error: function(){
                        option.errorFn && option.errorFn('谢谢参与!');
                    }
                });
            },timeRandom)
            
            
        }
        //时间超时
        function gameOverOut(){
            $(option.gameOverDiv).animate({
                top: $(window).height() + 0 + 200
            },500)
        }
        //倒计时结束或点击到炸弹提示
        function gameOverIn(){
            $(option.gameOverDiv).animate({
                top: '40%'
            },500,getPrizes)
        }
        //点击到炸弹
        function gameOver(){        
            gameOverIn();
            $(option.balloonItem).remove();
            clearInterval(balloonTimer);
            option.clearTimerFn && option.clearTimerFn();
            soundStop(option.bgSound);
        }
        //倒计时结束
        function gametimeout(){
            $('.fn-balloon-foot-pic').html('<img class="ui-balloon-foot-timeout" src="/styles/images/topic/xtyyh/pc/balloons-timeout.png" alt="游戏时间已到"/>');
            gameOver();
        }
        function soundPlayer(player){
            if(window.Audio){
                player && player.play();
            }
        }
        function soundStop(player){
            if(window.Audio){
                player && player.pause();
            }
        }
        function init(options){
            //option = options;
            option = $.extend({},option,options);

                
        }

        function _init(){
            var num = numberRandom(4,1);
            circlesCreate(num,800);
            option.gameTimeDownFn && option.gameTimeDownFn();
            if(option.soundAllow){
                soundPlayer(option.bgSound);
            }
        }

        return {
            init : balloonGameTime,
            
            gameOver: gameOver,

            soundStop: function(){
                soundStop(option.bgSound);
                option.soundAllow = false;
            },
            soundPlayer: function(){
                soundPlayer(option.bgSound);
                option.soundAllow = true;
            },
            gametimeout: gametimeout
        }

        
    }();
exports.init = balloonGame.init;
exports.gameOver = balloonGame.gameOver;
exports.soundStop = balloonGame.soundStop;
exports.soundPlayer = balloonGame.soundPlayer;
exports.gametimeout = balloonGame.gametimeout;




