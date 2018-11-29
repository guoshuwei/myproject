/**
 * Created by yx on 16-10-13.
 */
var laohuji = function(){
    var domCache = {isLaohujiBegin: false};
    var default_ = {
        template: null, //模板html 字符串數組
        prizes: [],//奖品图片id，及地址
        topMessage: '',//顶部消息
        errorprizes:{
            id:0,
            name:'额外奖品',
            img:'/styles/images/topic/xtyyh/pc/prizes/wenhao.png'
        },
        hasSound: false,//是否开启声音
        soundPlayer: null,//声音播放器
        url: '', //获取結果的url
        urlData: null, //請求数据
        successCallback: null,//获取数据成功回调
        errorCallback: null,//获取数据失敗回调
        beforePlay: function(){return true;},//抽奖前回调
        prizeH: null,
        resultReset:null
    }
    function setPrizeHeight(prizeH){
        default_.prizeH = prizeH;
    }
    function getResult(){
        return domCache.laohuji_results;
    }
    function getPrizes(){
        return default_.prizes;
    }
    /**
     * 返回老虎机状态
     * @returns {boolean}true: 正在玩，false:空闲
     */
    function isPlaying(){
        return domCache.isLaohujiBegin;
    }
    function toggleSound(flag){
        default_.hasSound = flag;
        if(flag){
            domCache.isLaohujiBegin && default_.soundPlayer && default_.soundPlayer.play();
        }else{
            domCache.isLaohujiBegin && default_.soundPlayer && default_.soundPlayer.pause();
        }
    }
    function setSoundPlayer(player){
        default_.soundPlayer = player;
    }
    /**
     * 游戏初始化
     * @param $gameContainer 模板容器
     * @param option 选项{
     *  template: [], 模板html 字符串數組
     *  topMessage: '',
     *  url: 'http://', //获取結果的url
     *  urlData: null, //请求数据
     *  successCallback: null,//获取数据成功回调
     *  errorCallback: null,//获取数据失敗回调
     *  beforePlay: null,//抽奖前回调 f
     * }
     */
    function init($gameContainer, option){


        default_ = $.extend(default_, option);

        //问号
        default_.prizes.unshift(default_.errorprizes);
        var template = null;
        if(default_.template){
            template = default_.template;
        }else {
            var prizesTpl = '',
                len = default_.prizes.length;

            var totalH = 104*len;
            default_.prizeH = 100.000000000/len;

            for(var i=0;i<len;i++){
                var prize = default_.prizes[i];
                prizesTpl += '<div class="g_prize prize1" style="height: '+default_.prizeH+'%;padding-top: 5.68%;" prize_num="'+prize.id+'" prize_name="'+prize.award_name+'"><img class="prizeImg" src="'+prize.img+'"/></div>';
            }

            template = [];
            template.push('<div id="gameItems" class="gameItems">');
            template.push(  '<div class="btn go_back" id="go_back"></div>');
            template.push(  '<div class="btn music_btn offmusic" id="musicbtn"></div>');
            /*template.push(  '<div class="bgg"></div>');*/
            template.push(  '<img id="game_bg" class="bg" src="/styles/images/topic/xtyyh/mobile/laohuji/laohuji_bg.jpg">');
            template.push(      '<div id="laohuji" class="gameItem laohuji">');
            template.push(          '<div class="g_machine" id="g_machine">');
            template.push(              '<img class="g_machine_bg" src="/styles/images/topic/xtyyh/mobile/laohuji/laohuji.png"/>');
            template.push(              '<div class="message_t"><div>' + default_.topMessage + '</div></div>');
            template.push(              '<div class="btn lucky_draw"></div>');
            template.push(              '<div class="btn get_changes"></div>');
            template.push(              '<div class="btn g_currency"></div>');
            template.push(              '<a href="//licai.p2peye.com/loans/" target="_blank" class="btn more_jiabiaoxi"></a>');
            template.push(              '<div class="message_b"><div>中奖说明:摇中三张相同图片);即获得该奖品.活动规则由网贷天眼在法律允许范围內依法解释.</div></div>');
            template.push(          '</div>');
            template.push(          '<div class="g_prize_container">');
            template.push(              '<div class="g_prize_container1">');
            template.push(                  '<div class="g_prizes" style="height:'+totalH+'%;">');
            template.push(                      prizesTpl);
            template.push(                  '</div>');
            template.push(              '</div>');
            template.push(              '<div class="g_prize_container2">');
            template.push(                  '<div class="g_prizes" style="height:'+totalH+'%;">');
            template.push(                      prizesTpl);
            template.push(                  '</div>');
            template.push(              '</div>');
            template.push(              '<div class="g_prize_container3">');
            template.push(                  '<div class="g_prizes" style="height:'+totalH+'%;">');
            template.push(                      prizesTpl);
            template.push(                  '</div>');
            template.push(              '</div>');
            template.push(          '</div>');
            template.push(      '</div>');
            template.push('</div>');
        }
        $gameContainer.html(template.join(''));



        /*domCache.$game_bg.show();
        var gW = domCache.$gameItems.width();
        if(gW < 1334){
            domCache.$game_bg.show().css('left', (domCache.$gameItems.width() - 1334) / 2 + 'px');
            $(window).unbind("resize.game_bg").bind("resize.game_bg", function(){
                domCache.$game_bg.css('left', (domCache.$gameItems.width() - 1334) / 2 + 'px');
            })
        }else{
            domCache.$game_bg.show().css({'left': '0px', 'width':'100%'});
        }*/

        domCache = {
            isLaohujiBegin: false,
            laohuji_results: {code:0}
        }
        domCache.$g_board = $('.g_board');
        domCache.$gameItems = $('#gameItems');
        domCache.$gameItemss = domCache.$gameItems.find('div.gameItem');
        domCache.$game_bg = $('#game_bg');
        domCache.$laohuji = $('#laohuji');
        domCache.$g_prizes = $(".g_prizes");
        domCache.$g_prize_container = $(".g_prize_container");
        domCache.$lucky_draw = $(".lucky_draw");
        domCache.$go_back = $("#go_back");
        domCache.$musicbtn = $("#musicbtn");
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

        $('#g_machine').on("touchstart", function(e){
                domCache.touchmove = false;
            }).on("touchmove", function(e){
                domCache.touchmove = true;
            }).on("touchend", function(e){
                if(domCache.touchmove){
                    return;
                }
            var t = e.target || e.srcELement,
                $t = $(t);
            if ($t.hasClass('lucky_draw')) {//老虎机抽奖
                if(!default_.beforePlay())
                    return false;
                if(domCache.isLaohujiBegin) return false;
                $t.addClass('lucky_draw_playing');
                var prizesH = 940;
                jQuery.Tween.prototype.run = function(e) {
                    var t, n = jQuery.Tween.propHooks[this.prop];
                    console.log('now:'+this.now+", end:"+this.end+', start:'+this.start);
                    if(-this.now >= prizesH ){
                        this._loopCount = this._loopCount ? ++this._loopCount : 1;
                    }
                    if(this.options.duration){
                        this.pos = t = $.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)
                    }else
                        this.pos = t = e
                    this.now = (this.end - this.start) * t + this.start + (this._loopCount? this._loopCount*prizesH : 0)
                    this.options.step && this.options.step.call(this.elem, this.now, this)
                    n && n.set ? n.set(this) : jQuery.Tween.propHooks._default.set(this)
                    return this;
                };
                domCache.isLaohujiBegin = true;
                domCache.laohujiEndPresetState = [false, false, false];
                default_.hasSound && default_.soundPlayer && (default_.soundPlayer.stop(), default_.soundPlayer.play());
                domCache.laohuji_results = {code:0};
                domCache.$g_prizes.css('bottom',0);
                var result = numRand();
                //$('#res').text('result = '+result);
                var num_arr = (result+'').split('');
                domCache.$g_prizes.each(function(index){
                    var _num = $(this);
                    setTimeout(function(_num){
                        _num.animate({
                            bottom: -(100*30)+"%"
                        },{
                            duration: 4000,
                            easing: "easeInCirc",
                            complete: function(_num){
                                //laohujiAnimate(_num, default_.prizeH, index);
                            }.bind(null, _num)
                        });
                    }.bind(null, _num), index * 800);
                });
                $.ajax({
                    type: "post",
                    url: default_.url,
                    data: default_.urlData || {},
                    dataType: "json",
                    success: function(data){
                        if(data.code == 200){
                            domCache.laohuji_results_server = data;
                            domCache.laohuji_results = default_.resultReset ? default_.resultReset($.extend({}, data)) : data;
                        }
                    },
                    error: function(){}
                });
            } else{


            }
        }.bind(this));
    }
    function numRand() {
        var x = 99999; //上限
        var y = 11111; //下限
        var rand = parseInt(Math.random() * (x - y + 1) + y);
        return rand;
    }
    function laohujiAnimate(_num, prizeH, index){

        _num.animate({
            bottom: -(prizeH*80)
        },{
            duration: 5000,
            easing: "linear",
            complete: function(_num, _i){
                var results = domCache.laohuji_results.data;


                if(results){
                    if(_i == 0){
                        domCache.laohujiEndPresetState[0] = true;
                    }else{
                        if(domCache.laohujiEndPresetState[0]){
                            domCache.laohujiEndPresetState[_i] = true;
                        }else{
                            return laohujiAnimate(_num, prizeH, _i);
                        }
                    }
                    var container = domCache.$g_prizes.eq(_i);

                    if(results[0] == results[1] && results[1] == results[2]){
                        var prizeId = 0, lhj_ps= default_.prizes, i= 0,len=lhj_ps.length;
                        for(;i<len;i++){
                            if(lhj_ps[i].id == results[_i]){
                                prizeId = results[_i];
                                break;
                            }
                        }
                    }else{
                        var prizeId = results[_i];
                    }
                    var prizeIndex = container.find('div[prize_num="'+prizeId+'"]').index();

                    _num.animate({
                        bottom: -(prizeH*((container.children().length-1)*4 - prizeIndex))
                    },{
                        duration: 3000,
                        easing: "easeOutCirc",
                        complete: function(index){
                            if(index==2){
                                domCache.isLaohujiBegin = false;
                                domCache.$lucky_draw.removeClass('lucky_draw_playing');

                                jQuery.Tween.prototype.run = function( percent ) {
                                    var eased,
                                        hooks = jQuery.Tween.propHooks[ this.prop ];

                                    if ( this.options.duration ) {
                                        this.pos = eased = jQuery.easing[ this.easing ](
                                            percent, this.options.duration * percent, 0, 1, this.options.duration
                                        );
                                    } else {
                                        this.pos = eased = percent;
                                    }
                                    this.now = ( this.end - this.start ) * eased + this.start;

                                    if ( this.options.step ) {
                                        this.options.step.call( this.elem, this.now, this );
                                    }

                                    if ( hooks && hooks.set ) {
                                        hooks.set( this );
                                    } else {
                                        jQuery.Tween.propHooks._default.set( this );
                                    }
                                    return this;
                                };

                                default_.hasSound && default_.soundPlayer && default_.soundPlayer.stop();

                                if(domCache.laohuji_results.code != 200){
                                    default_.errorCallback && default_.errorCallback(results);
                                }else{
                                    default_.successCallback && default_.successCallback(domCache.laohuji_results_server);
                                }
                            }
                        }.bind(null, _i)
                    });
                }else{
                    laohujiAnimate(_num, prizeH, _i);
                }
            }.bind(null, _num, index)
        });
    }



    
    return {
        init: init,
        getResult: getResult,
        toggleSound: toggleSound,
        setSoundPlayer: setSoundPlayer,
        isPlaying: isPlaying,
        setPrizeHeight: setPrizeHeight,
        getPrizes: getPrizes
    }
}();


exports.init = laohuji.init;
exports.getResult = laohuji.getResult;
exports.toggleSound = laohuji.toggleSound;
exports.setSoundPlayer = laohuji.setSoundPlayer;
exports.isPlaying = laohuji.isPlaying;
exports.setPrizeHeight = laohuji.setPrizeHeight;
exports.getPrizes = laohuji.getPrizes;