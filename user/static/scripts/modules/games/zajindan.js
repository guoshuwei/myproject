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
        if(!window.isIELower){
            var isPlaying = domCache.isZajindanBegin[0] || domCache.isZajindanBegin[1] || domCache.isZajindanBegin[2];
            if(flag){
                isPlaying && default_.soundPlayer && default_.soundPlayer.play();
            }else{
                isPlaying && default_.soundPlayer && default_.soundPlayer.pause();
            }
        }
    }
    function setSoundPlayer(player){
        default_.soundPlayer = player;
    }
    function eggHover(){
        domCache.$eggs.children().unbind('mouseover mouseout');
        //金蛋mouseover特效
        domCache.$eggs.children().mouseover(function(e){
            var $this = $(this), index = $this.parent().index();
            if(!$this.hasClass('egg_jump')){
                $this.addClass('egg_jump');
                domCache.$jd_cz.attr('class', 'jd_cz p_egg'+(index+1));
            }
        }).mouseout(function(e){
            var $this = $(this);
            if($this.hasClass('egg_jump')){
                $this.removeClass('egg_jump');
            }
        });
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
        domCache.$eggs = $newEggs;
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
                                eggHover();
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
        
        var isIE = !!window.ActiveXObject;
        var isIE6 = isIE && !window.XMLHttpRequest;
        var isIE8 = isIE && !!document.documentMode;
        var isIE7 = isIE && !isIE6 && !isIE8;
        window.isIELower = isIE6 || isIE7 || isIE8;
        if(window.isIELower){
            if (!Function.prototype.bind) {
                Function.prototype.bind = function (oThis) {
                    if (typeof this !== "function") {
                        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                    }
                    var aArgs = Array.prototype.slice.call(arguments, 1),
                        fToBind = this,
                        fNOP = function () {},
                        fBound = function () {
                            return fToBind.apply(this instanceof fNOP && oThis
                                    ? this
                                    : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
                        };
                    fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();
                    return fBound;
                };
            }
        }
        default_ = $.extend(default_, option);
        var _eggs = '<div class="egg egg1"><img class="egg_mc" draggable="false" ondragstart="return false;" onselectstart="return false;" src="/styles/images/topic/xtyyh/pc/egg/jindan-dan.png"></div>' +
            '<div class="egg egg2"><img class="egg_mc" draggable="false" ondragstart="return false;" onselectstart="return false;" src="/styles/images/topic/xtyyh/pc/egg/jindan-dan.png"></div>' +
            '<div class="egg egg3"><img class="egg_mc" draggable="false" ondragstart="return false;" onselectstart="return false;" src="/styles/images/topic/xtyyh/pc/egg/jindan-dan.png"></div>';
                        
        var template = default_.template || [
            '<div id="gameItems" class="gameItems">',
                '<div class="btn go_back" id="go_back"></div>',
                '<div class="btn offmusic" id="musicbtn"></div>',
                '<a href="//licai.p2peye.com/topic/xtyyh/gonglue" target="_blank" class="ui-game-gonglue ui-gameother-gonglue"></a>',
                '<img id="game_bg" class="bg" src="/styles/images/topic/xtyyh/pc/laohuji_bg.jpg">',
                '<div class="subwrap">',
                '<div class="gameItem jindan">',
                    '<div class="g_jindan" id="g_jindan">',
                        '<div  id="jindan">',
                            _eggs,
                            '<div class="jd_cz p_egg3"></div>',
                        '</div>',
                        '<div class="btn get_more_cz"></div>',
                        '<form action="/topic/verifycode" method="post" role="ajaxfrom">',
                        '<input type="text" class="redeemkey" name="code" data-valid="notempty">',
                        '<input type="submit" class="btn redeem" value=""/>',
                        '</form>',
                        '<div class="btn show_more_item fn-hammer-record"></div>',
                        '<div class="message">'+default_.message+'</div>',
                        '<a href="javascript:;" class="changemoreeggs">【换一批】</a>',
                    '</div>',
                '</div>',
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
        domCache.$jindan = $('#jindan');
        domCache.$eggs = domCache.$jindan.find('div.egg');
        domCache.$jd_cz = domCache.$jindan.find('div.jd_cz');
        domCache.$go_back = $("#go_back");
        domCache.$musicbtn = $("#musicbtn");

        domCache.$game_bg.show().css('left', (domCache.$gameItems.width() - 1920) / 2 + 'px');
        $(window).unbind("resize.game_bg").bind("resize.game_bg", function(){
            domCache.$game_bg.css('left', (domCache.$gameItems.width() - 1920) / 2 + 'px');
        })

        //音乐按钮事件注册
        domCache.$musicbtn.click(function(e){
            if(domCache.$musicbtn.hasClass('offmusic')) {
                if(!window.Audio){
                    _Fn.alert('当前浏览器版本不支持音效');
                    return;
                };
                toggleSound(false);
                domCache.$musicbtn.removeClass('offmusic').addClass('onmusic');
            }else{
                toggleSound(true);
                domCache.$musicbtn.removeClass('onmusic').addClass('offmusic');
            }
        });

        eggHover();
        //金蛋點擊事件
        domCache.$jindan.click(function (e) {
            if(postting) return;

            var t = e.target || e.srcELement,
                $t = $(t),
                $egg = $t.closest('.egg');

            if($egg.length > 0 && !$egg.data('requesting')){
                if(!default_.beforePlay())
                    return false;
                if($('.jindan .hasgamehammer').html() <= 0){
                    _Fn.alert('您的金锤已用完，请获取金锤！');
                    return;
                }
                var index = $egg.data('requesting', true).index();
                domCache.isZajindanBegin[index] = true;
                postting = true;
                if(window.isIELower){
                    var d1= 0;
                    var animateFun1 = setInterval(function() {
                        var width = 117;
                        var height = 85;
                        var dx = -width/2*Math.cos(d1)+height/2*Math.sin(d1)+width/2;
                        var dy = -width/2*Math.sin(d1)-height/2*Math.cos(d1)+height/2;
                        domCache.$jd_cz.get(0).style.filter = 'progid:DXImageTransform.Microsoft.Matrix(dx='+dx+',dy='+dy+',M11='+Math.cos(d1)+',M12='+(Math.sin(d1)*-1)+',M21='+Math.sin(d1)+',M22='+Math.cos(d1)+',sizingMethod="auto expand");';
                        //$t.width(height);
                        if(Math.abs(d1) >= .9) {
                            clearInterval(animateFun1);
                            domCache.$jd_cz.get(0).style.filter = '';
                            ie8rotate(t);
                        }else{
                            d1-=.1;
                        }
                    }, 10);
                }else{
                    domCache.$jd_cz.animate({rotate: '-45'}, 100, function(){
                        domCache.$jd_cz.css('rotate', 0);
                        $t.removeClass('egg_mc').addClass('sway');
                    });
                }


                $.ajax({
                    type: "post",
                    url: _Fn.mockServer + default_.url,
                    data: default_.urlData || {},
                    dataType: "json",
                    success: function(data){
                        if(data.code == 200){
                            setTimeout(function(){
                                $egg.data('requesting', false);

                                domCache.jindan_results[$egg.index()] = data;
                                if(!window.isIELower){
                                    breakEggAnimate(t);
                                }

                            }, Math.floor(Math.random()*3+1)*1000);

                        }else{
                            setTimeout(function(){
                                domCache.jindan_results[$egg.index()] = data;
                                breakEggAnimate(t);
                            },Math.floor(Math.random()*3+1)*1000);
                        }
                    },
                    error: function(){
                        // setTimeout(function(){
                        //     $t.data('requesting', false);
                        //     domCache.jindan_results[$t.index()] = 500;
                        //     breakEggAnimate(t);
                        // },Math.floor(Math.random()*3+1)*1000);
                        _Fn.alert('请检查网络，大奖离你不远啦！');

                    }
                });
            }
        });

        $('.changemoreeggs').click(function(){
            refreshEggs();
        });
    }
    function ie8rotate(dom){
        var d= 0;
        var max = .45;
        var count = 1;
        var animateFun = setInterval(function(){
            var diff = .3;
            var width = 130;
            var height = 178;
            var dx = -width/2*Math.cos(d)+height/2*Math.sin(d)+width/2;
            var dy = -width/2*Math.sin(d)-height/2*Math.cos(d)+height/2;
            //sizingMethod="auto expand"
            //alert('progid:DXImageTransform.Microsoft.Matrix(dx='+dx+',dy='+dy+',M11='+Math.cos(d)+',M12='+(Math.sin(d)*-1)+',M21='+Math.sin(d)+',M22='+Math.cos(d)+');');
            //dx='+dx+',dy='+dy+',
            dom.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(dx='+dx+',dy='+dy+',M11='+Math.cos(d)+',M12='+(Math.sin(d)*-1)+',M21='+Math.sin(d)+',M22='+Math.cos(d)+');';
            //$t.width(height);
            if(count == 1){
                if(Math.abs(d) >= max) {
                    count = 2;
                }else{
                    d-= diff;
                }
            } else if(count == 2){
                if(d >= 0) {
                    count = 3;
                }else{
                    d+= diff;
                }
            } else if(count == 3){
                if(d >= max) {
                    count = 4;
                }else{
                    d+= diff;
                }
            } else if(count == 4){
                if(d <= 0) {
                    clearInterval(animateFun);
                    var results = domCache.jindan_results[$(dom).parent().index()];
                    if(results){
                        breakEggAnimate(dom);
                    }else
                        ie8rotate(dom);
                }else{
                    d-= diff;
                }
            }
        }, 10);
    }
    function breakEggAnimate(dom){
        var $eggDom = $(dom).parent();
        var index = $eggDom.index();
        var top = 0;
        var left = 0;
        if(index == 0){
            top = 192;
            left = 178;
        }else if(index == 1){
            top = 232;
            left = 357;
        }else if(index == 2){
            top = 192;
            left = 541;
        }
        var $breakedEgg = $('<div class="egg_break_bm" style="top: '+top+'px;left: '+left+'px;"><div class="egg_break_fragment"></div><div class="egg_break_tp"></div></div>');
        $eggDom.replaceWith($breakedEgg);
        if(!window.isIELower){
            default_.hasSound && default_.soundPlayer && (default_.soundPlayer.stop(),default_.soundPlayer.play());
        }
        $breakedEgg.children().eq(1).animate({
            top: '-40px',
            opacity: 0
        },{
            duration: 2000,
            easing: "easeOutCirc",
            complete: function(){
                default_.soundPlayer && default_.soundPlayer.stop && default_.soundPlayer.stop();
                $breakedEgg.children().eq(0).show();
                var index = $breakedEgg.index();

                if(domCache.jindan_results[index].code != 200){
                    default_.errorCallback && default_.errorCallback(domCache.jindan_results[index]);
                }else{
                    default_.successCallback && default_.successCallback(domCache.jindan_results[index]);
                }
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
        isPlaying: isPlaying
    }
}();


exports.init = zajindan.init;
exports.result = zajindan.result;
exports.toggleSound = zajindan.toggleSound;
exports.setSoundPlayer = zajindan.setSoundPlayer;
exports.isPlaying = zajindan.isPlaying;