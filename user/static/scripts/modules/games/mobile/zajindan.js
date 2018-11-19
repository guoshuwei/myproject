/**
 * Created by yx on 16-10-13.
 */
var zajindan = function(){ //惰性加载
    var domCache = {isZajindanBegin:[false, false, false]};
    var default_ = {
        template: null, //模板html 字符串數組
        message: '',
        hasSound: false,//是否开启声音
        soundPlayer: null,//声音播放器
        url: '', //获取結果的url
        urlData: null, //請求数据
        successCallback: null,//获取数据成功回调
        errorCallback: null,//获取数据失敗回调
        beforePlay: function(){return true;}//抽奖前回调
    };
    var postting = false;
    /**
     * 返回状态
     * @returns {boolean}true: 正在玩，false:空闲
     */
    function isPlaying(){
        return domCache.isZajindanBegin[0] || domCache.isZajindanBegin[1] || domCache.isZajindanBegin[2];
    }
    function toggleSound(flag){
        default_.hasSound = flag;
        var isPlaying = domCache.isZajindanBegin[0] || domCache.isZajindanBegin[1] || domCache.isZajindanBegin[2];
        if(flag){
            isPlaying && default_.soundPlayer && default_.soundPlayer.play();
        }else{
            isPlaying && default_.soundPlayer && default_.soundPlayer.pause();
        }
    }
    function setSoundPlayer(player){
        default_.soundPlayer = player;
    }
    function refreshEggs(){
        if(isPlaying() || domCache.refreshing){
            return;
        }
        domCache = $.extend(domCache, {
            isZajindanBegin:[false, false, false],
            jindan_results:[null, null, null],
            refreshing: true
        });
        postting = false;

        var $eggs = domCache.$jindan.find('.egg,.egg_break_bm');

        for(var i=0;i<$eggs.length;i++){
            $eggs.eq(i).replaceWith(
                '<div class="egg egg'+(i+1)+'"><img class="egg_mc fallstart" draggable="false" ondragstart="return false;" onselectstart="return false;" src="/styles/images/topic/xtyyh/pc/egg/jindan-dan.png"></div>'
            )
        }

        /*domCache.$eggs.vmouseover(function(e){
         var $this = $(this), index = $this.index();
         if(!$this.hasClass('egg'+(index+1)+'_jump')){
         $this.addClass('egg'+(index+1)+'_jump');
         domCache.$jd_cz.attr('class', 'jd_cz p_egg'+(index+1));
         }
         }).vmouseout(function(e){
         var $this = $(this), index = $this.index();
         if($this.hasClass('egg'+(index+1)+'_jump')){
         $this.removeClass('egg'+(index+1)+'_jump');
         }
         });*/
        var $newEggs = domCache.$jindan.find('.egg'),i=0;

        setTimeout(function(){
            $newEggs.eq(0).children().eq(0).addClass('fall_animate fallend').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                $(this).removeClass('fallstart fall_animate fallend').addClass('egg_falled').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                    setTimeout(function($c_egg){
                        $c_egg.removeClass('egg_falled');
                    }.bind(null, $(this)), 600);
                });
                $newEggs.eq(1).children().eq(0).addClass('fall_animate fallend').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                    $(this).removeClass('fallstart fall_animate fallend').addClass('egg_falled').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                        setTimeout(function($c_egg){
                            $c_egg.removeClass('egg_falled');
                        }.bind(null, $(this)), 600);
                    });
                    $newEggs.eq(2).children().eq(0).addClass('fall_animate fallend').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                        $(this).removeClass('fallstart fall_animate fallend').addClass('egg_falled').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                            setTimeout(function($c_egg){
                                domCache.refreshing = false;
                                $c_egg.removeClass('egg_falled');
                            }.bind(null, $(this)), 600);
                        });
                    });
                });
            });
        }, 15);
    }
    /**
     * 游戏初始化
     * @param $gameContainer 模板容器
     * @param options 选项{
     *  template: [], 模板html 字符串數組
     *  url: 'http://', //获取結果的url
     *  urlData: null, //请求数据
     *  successCallback: null,//获取数据成功回调
     *  errorCallback: null,//获取数据失敗回调
     *  beforePlay: null,//抽奖前回调 f
     * }
     */
    function init($gameContainer, option){
        default_ = $.extend(default_, option);
        var template = default_.template || [
            '<div id="gameItems" class="gameItems">',
                '<div class="btn go_back" id="go_back"></div>',
                '<div class="btn music_btn offmusic" id="musicbtn"></div>',
                /*'<div class="bgg"></div>',*/
                '<img id="game_bg" class="bg" src="/styles/images/topic/xtyyh/mobile/laohuji/laohuji_bg.jpg">',
                '<div class="g_jindan" id="g_jindan">',
                    '<div class="egg egg1"><img class="egg_mc" draggable="false" ondragstart="return false;" onselectstart="return false;" src="/styles/images/topic/xtyyh/mobile/zajindan/egg.png"></div>',
                    '<div class="egg egg2"><img class="egg_mc" draggable="false" ondragstart="return false;" onselectstart="return false;" src="/styles/images/topic/xtyyh/mobile/zajindan/egg.png"></div>',
                    '<div class="egg egg3"><img class="egg_mc" draggable="false" ondragstart="return false;" onselectstart="return false;" src="/styles/images/topic/xtyyh/mobile/zajindan/egg.png"></div>',
                    '<div class="jd_cz p_egg3"></div>',
                    '<div class="btn get_more_cz"></div>',

                    '<form action="'+default_.url_config.duihuan+'" method="post" role="ajaxfrom">',
                        '<input type="text" class="redeemkey" name="code" data-valid="notempty">',
                        '<div class="btn redeem"></div>',
                    '</form>',
                    '<div class="btn show_more_item"></div>',
                    '<div class="message">'+default_.message+'</div>',
                    '<div class="refresh">【换一批】</div>',
                '</div>',
            '</div>'
        ];
        $gameContainer.html(template.join(''));
        domCache = {
            isZajindanBegin:[false, false, false],
            jindan_results:[null, null, null]
        };
        /*
         * JQuery CSS Rotate property using CSS3 Transformations
         * Copyright (c) 2011 Jakub Jankiewicz  <http://jcubic.pl>
         * licensed under the LGPL Version 3 license.
         * http://www.gnu.org/licenses/lgpl.html
         */
        (function($) {
            function getTransformProperty(element) {
                var properties = ['transform', 'WebkitTransform',
                    'MozTransform', 'msTransform',
                    'OTransform'];
                var p;
                while (p = properties.shift()) {
                    if (element.style[p] !== undefined) {
                        return p;
                    }
                }
                return false;
            }
            $.cssHooks['rotate'] = {
                get: function(elem, computed, extra){
                    var property = getTransformProperty(elem);
                    if (property) {
                        return elem.style[property].replace(/.*rotate\((.*)deg\).*/, '$1');
                    } else {
                        return '';
                    }
                },
                set: function(elem, value){
                    var property = getTransformProperty(elem);
                    if (property) {
                        value = parseInt(value);
                        $(elem).data('rotatation', value);
                        if (value == 0) {
                            elem.style[property] = '';
                        } else {
                            elem.style[property] = 'rotate(' + value%360 + 'deg)';
                        }
                    } else {
                        return '';
                    }
                }
            };
            $.fx.step['rotate'] = function(fx){
                $.cssHooks['rotate'].set(fx.elem, fx.now);
            };
        })(jQuery);

        domCache.$gameItems = $('#gameItems');
        domCache.$gameItemss = domCache.$gameItems.find('div.gameItem');
        domCache.$game_bg = $('#game_bg');
        domCache.$jindan = $('#g_jindan');
        domCache.$eggs = domCache.$jindan.find('div.egg');
        domCache.$jd_cz = domCache.$jindan.find('div.jd_cz');
        domCache.$go_back = $("#go_back");
        domCache.$musicbtn = $("#musicbtn");

        /*domCache.$game_bg.show().css('left', (domCache.$gameItems.width() - 1334) / 2 + 'px');
        $(window).unbind("resize.game_bg").bind("resize.game_bg", function(){
            domCache.$game_bg.css('left', (domCache.$gameItems.width() - 1334) / 2 + 'px');
        })*/

        //音乐按钮事件注册
        domCache.$musicbtn.on("touchstart", function(e){
                domCache.touchmove = false;
            }).on("touchmove", function(e){
                domCache.touchmove = true;
            }).on("touchend", function(e){
                if(domCache.touchmove){
                    return;
                }
            if(domCache.$musicbtn.hasClass('offmusic')) {
                toggleSound(false);
                domCache.$musicbtn.removeClass('offmusic').addClass('onmusic');
            }else{
                toggleSound(true);
                domCache.$musicbtn.removeClass('onmusic').addClass('offmusic');
            }
        });

        //金蛋mouseover特效
        /*domCache.$eggs.mouseover(function(e){
            var $this = $(this), index = $this.index();
            $this = $this.children().eq(0);
            if(!$this.hasClass('egg_jump')){
                $this.addClass('egg_jump');
                domCache.$jd_cz.attr('class', 'jd_cz p_egg'+(index+1));
            }
        }).mouseout(function(e){
            var $this = $(this), index = $this.index();
            $this = $this.children().eq(0);
            if($this.hasClass('egg_jump')){
                $this.removeClass('egg_jump');
            }
        });*/
        //金蛋點擊事件
        domCache.$jindan.on("touchstart", function(e){
                domCache.touchmove = false;
            }).on("touchmove", function(e){
                domCache.touchmove = true;
            }).on("touchend", function(e){
                if(domCache.touchmove){
                    return;
                }
            var t = e.target || e.srcELement,
                $t = $(t),
                $egg = $t.closest('div.egg');

            if(postting) return;
            if($t.hasClass('refresh')){
                refreshEggs();
            }else if($egg.length && !$t.data('requesting')){
                var index = $egg.index();
                domCache.$jd_cz.attr('class', 'jd_cz p_egg'+(index+1));
                if(!default_.beforePlay() || domCache.refreshing)
                    return false;
                $t.data('requesting', true);
                domCache.isZajindanBegin[index] = true;
                postting = true;

                domCache.$jd_cz.animate({rotate: '-45'}, 100, function(){
                    domCache.$jd_cz.css('rotate', 0);
                    $t.removeClass('egg_mc').addClass('sway');
                });

                $.ajax({
                    type: "post",
                    url: default_.url,
                    data: default_.urlData || {},
                    dataType: "json",
                    success: function(data){
                        $t.data('requesting', false);
                        setTimeout(function(){
                            if(data.code == 200){
                                domCache.jindan_results[index] = data;
                                breakEggAnimate($egg, index);
                            }else{
                                domCache.jindan_results[index] = data;
                                breakEggAnimate($egg, index);
                            }
                        }, Math.floor(Math.random()*3+1)*1000);

                    },
                    error: function(){
                        setTimeout(function(){
                            $t.data('requesting', false);
                            domCache.jindan_results[index] = 500;
                            breakEggAnimate($egg, index);
                        }, Math.floor(Math.random()*3+1)*1000);
                    }
                });
            }
        });
    }
    function breakEggAnimate($egg, index){
        var $breakedEgg = $('<div class="egg_break_bm egg'+(index+1)+'"><div class="egg_break_fragment"></div><div class="egg_break_tp"></div></div>');
        $egg.replaceWith($breakedEgg);
        default_.hasSound && default_.soundPlayer && (default_.soundPlayer.stop(),default_.soundPlayer.play());
        $breakedEgg.children().eq(1).animate({
            top: '-17%',
            opacity: 0
        },{
            duration: 2000,
            easing: "easeOutCirc",
            complete: function(){
                default_.soundPlayer && default_.soundPlayer.stop();
                $breakedEgg.children().eq(0).show();
                var index = $breakedEgg.index();
                if(domCache.jindan_results[index].code != 200){
                    default_.errorCallback && default_.errorCallback(domCache.jindan_results[index]);
                }else{
                    default_.successCallback && default_.successCallback(domCache.jindan_results[index]);
                }

                //alert('恭喜你！获得了奖品：'+domCache.jindan_results[index]);
                domCache.jindan_results[index] = null;
                domCache.isZajindanBegin[index] = false;
                postting = false;
            }
        });
    }
    return {
        init: init,
        result: domCache.jindan_results,
        toggleSound: toggleSound,
        setSoundPlayer: setSoundPlayer,
        isPlaying: isPlaying,
        refreshEggs: refreshEggs
    }
}();


exports.init = zajindan.init;
exports.result = zajindan.result;
exports.toggleSound = zajindan.toggleSound;
exports.setSoundPlayer = zajindan.setSoundPlayer;
exports.isPlaying = zajindan.isPlaying;
exports.refreshEggs = zajindan.refreshEggs;