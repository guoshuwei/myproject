/**
 * Created by yx on 16-10-17.
 */
var popwin_ = function(){
    var default_ = {
        url_config: {}
    };
    //创建随机数
    function numberRandom(maxNum,minNmum){
        if(!minNmum)minNmum = 0;
        if(!maxNum)maxNum = 0;
        if(maxNum <= minNmum) return 0;
        var _numberRandom = Math.round(minNmum + Math.random() * maxNum);
        return _numberRandom;
    }
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }

    function init(options){
        default_ = $.extend(default_, options);
    }
    function close(){

    }
    /*------------------------------------------首页 start-------------------------------------------*/

    /**
     * 收货地址
     * @param $container
     * @param data
     */
    /**
     * 活动结束提示框
     * @param $container
     */
    function pop_end_of_activity_win($container){
        var popwin = $container.find('div.popwin_end_of_activity');
        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_end_of_activity">',
                '<div class="pw_bg"></div>',
                '<div class="pw_main">',
                '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/activity_finished.png">',
                '<a href="//licai.p2peye.com/topic/xtyyh/bigcarnival" target="_blank" class="popwin_end_of_activity_txt"></a>',
                '<div class="popwin_end_of_activity_close"></div>',
                '</div>',
                '</div>']
            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            popwin.on('touchend click', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_end_of_activity_close')){
                    popwin.hide();
                }
            });
        }else{
            popwin.show();
        }
    }
    /**
     * 中奖记录
     * @param $container
     * @param options
     */
    function pop_myHitRecord_win($container, options){
        var popwin = $container.find('div.popwin_myHitRecord');
        var tbSrc = [], len = options.data.data.length;
        for(var i = 0;i < len;i++){
            var d = options.data.data[i];
            tbSrc.push('<tr>');
            tbSrc.push('<td>'+(i+1)+'</td>');
            tbSrc.push('<td>'+d.award_name+'</td>');
            tbSrc.push('<td>'+(d.code_key? d.code_key: '无')+'</td>');
            tbSrc.push('<td>'+d.topic_type+'</td>');
            tbSrc.push('<td>'+d.create_time+'</td>');
            tbSrc.push('</tr>');
        }

        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_myHitRecord">',
                    '<div class="pw_bg"></div>',
                    '<div class="pw_main">',
                        '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/hit_prize_record.png">',
                        '<div class="popwin_myHitRecord_close"></div>',
                        '<div class="popwin_content">',
                            '<table cellpadding="0" cellspacing="0">',
                                '<thead>',
                                    '<tr>',
                                        '<th>编号</th>',
                                        '<th>名称</th>',
                                        '<th>卡密</th>',
                                        '<th>奖品来源</th>',
                                        '<th>中奖时间</th>',
                                    '</tr>',
                                '</thead>',
                                '<tbody id="myHitRecord">',
                                    tbSrc.join(''),
                                '</tbody>',
                            '</table>',
                        '</div>',
                        '<div class="popwin_foot">',

                        '</div>',
                    '</div>',
                '</div>'];



            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            popwin.find('table').css('height', 20*(len+1)+'%');
            popwin.on('touchend click', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_myHitRecord_close')){
                    popwin.hide();
                }else if($t.hasClass('s_btn')){
                    $t.prev().submit();
                }else if($t.closest('div.popwin_foot').length > 0){
                    popwin.find('table').css('height', 20*($('#myHitRecord').children('tr:visible').length+1)+'%');
                }
            });
        }else{
            var $tbody = $('#myHitRecord');
            $tbody.html(tbSrc.join('')).css('height', 20*($tbody.children('tr:visible').length+1)+'%');
            popwin.show();
        }
        options.callback && options.callback(options.data, popwin.find('div.popwin_foot'));
    }


    /*------------------------------------------首页 end-------------------------------------------*/


    /*------------------------------------------老虎机 start-------------------------------------------*/
    /**
     * 我的游戏币
     * @param $container
     * @param options
     */
    function pop_myGameCurrency_win($container, options){
        var popwin = $container.find('div.popwin_myGameCurrency');
        var tbSrc = [], len = options.data.data.data.length;
        for(var i = 0;i < len;i++){
            tbSrc.push('<tr>');
            tbSrc.push('<td>'+(i+1)+'</td>');
            tbSrc.push('<td>'+options.data.data.data[i].type_name+'</td>');
            tbSrc.push('<td>'+options.data.data.data[i].num+'个</td>');
            tbSrc.push('<td>'+options.data.data.data[i].create_time+'</td>');
            tbSrc.push('</tr>');
        }
        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_myGameCurrency">',
                    '<div class="pw_bg"></div>',
                    '<div class="pw_main">',
                        '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/my_game_currency.png">',
                        '<div class="popwin_myGameCurrency_close"></div>',
                        '<div class="popwin_title">你共获得<span>'+(options.data.data.num? options.data.data.num : 0)+'</span>个游戏币</div>',
                        '<div class="popwin_content">',
                            '<table cellpadding="0" cellspacing="0">',
                                '<thead>',
                                    '<tr>',
                                        '<th>编号</th>',
                                        '<th>获取途径</th>',
                                        '<th>获取个数</th>',
                                        '<th>获取时间</th>',
                                    '</tr>',
                                '</thead>',
                                '<tbody id="myGameCurrency">',
                                    tbSrc.join(''),
                                '</tbody>',
                            '</table>',
                        '</div>',
                        '<div class="popwin_foot">',
                        '</div>',
                    '</div>',
                '</div>']
            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            popwin.find('table').css('height', 20*(len+1)+'%');
            popwin.on('touchend', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_myGameCurrency_close')){
                    popwin.hide();
                }else if($t.closest('div.popwin_foot').length > 0){
                    popwin.find('table').css('height', 20*($('#myGameCurrency').children('tr:visible').length+1)+'%');
                }
            });
        }else{
            popwin.find('div.popwin_title').html('你共获得<span>'+(options.data.data.num? options.data.data.num : 0)+'</span>个游戏币');
            var $tbody = $('#myGameCurrency');
            $tbody.html(tbSrc.join('')).css('height', 20*($tbody.children('tr:visible').length+1)+'%');
            popwin.show();
        }
        options.callback && options.callback(options.data, popwin.find('div.popwin_foot'));
    }
    /**
     * 游戏币领取攻略
     * @param $container
     * @param options
     */
    function pop_getGameCurrency_win($container, options){
        var //iosLow8DownUrl = "https://itunes.apple.com/us/app/apple-store/id382201985?pt=328057&ct=sf8-20160307&mt=8" || "https://itunes.apple.com/us/app/apple-store/id382201985?pt=328057&ct=sf8-20160307&mt=8",
            iosDownUrl = "//itunes.apple.com/cn/app/p2p-li-cai-wang-dai-fen-san/id867971761?mt=8",
            //androidUrl = "baiduboxapp://utils?word=胭脂",
            andDownUrl = "//www.p2peye.com/static/app/android/p2plicai_3.0.1.apk";
            //ios9Url = "https://boxer.baidu.com/scheme?scheme=" + encodeURIComponent("baiduboxapp://search?word=胭脂");


        var popwin = $container.find('div.popwin_getGameCurrency');
        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_getGameCurrency">',
                    '<div class="pw_bg"></div>',
                    '<div class="pw_main">',
                        '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/get_game_currency_raiders.png">',
                        '<div class="popwin_getGameCurrency_close"></div>',
                        '<a href="//licai.p2peye.com/loans/" target="_blank" class="p_btn investment"></a>',
                        '<a href="javascript:void(0);" class="p_btn visit"></a>',
                        '<a class="p_btn share"></a>',
                        /*'<a id="btndown" href="'+
                        (/(iphone|itouch)/.test(navigator.userAgent.toLowerCase()) ? iosDownUrl : andDownUrl)
                        +'" target="_blank" class="p_btn download"></a>',*/
                    '</div>',
                '</div>']
            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            $('#btndown').on('touchend',function(){
                if(isWeiXin()){
                    alert('请通过浏览器打开页面并点击下载');
                    return false;
                }
            })
            popwin.on('touchend', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_getGameCurrency_close')){
                    popwin.hide();
                }else if($t.hasClass('share')){
                    var zhaocheng = popwin.find('div.zhaocheng');
                    if(zhaocheng.length == 0){
                        zhaocheng = $('<div class="zhaocheng"><div class="zc_btn"></div></div>');
                        popwin.find('div.pw_main').append(zhaocheng);
                        zhaocheng.children().eq(0).on('touchend click', function(e){
                            $(this).parent().hide();
                        });
                    }else{
                        zhaocheng.show();
                    }
                }else if($t.hasClass('visit')){
                    var isplaying = default_.laohuji_ && default_.laohuji_.isPlaying();
                    if(isplaying) {
                        xtyyh.alert('游戏进行中，客官不要走！');
                        return;
                    }
                    window.location.href = '//licai.p2peye.com/topic/gonglue#gl_sls_a';
                        //zajindan_ && zajindan_.isPlaying())
                }
            });
        }else{
            popwin.show();
        }
    }
    /**
     * 老虎机获奖提示
     * @param $container
     * @param options
     */
    function pop_getPrize_win($container, options){
        var popwin = $container.find('div.popwin_get_prize');
        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_get_prize">',
                    '<div class="pw_bg"></div>',
                    '<div class="pw_main">',
                        '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/t_hit_prize.png">',
                        '<img class="pw_prize_img" src="//img.p2peye.com'+options.prize.img+'">',
                        '<div class="pw_prize_text">恭喜你获得一个<span class="rate_font">'+options.prize.award_name+'</span>奖品</div>',
                        '<div class="popwin_get_prize_close"></div>',
                        //'<div class="lijitouzi"></div>',
                        '<div class="bkb_list">',
                            '<div class="bkb_title">【'+options.prize.loan.pname+'】'+options.prize.loan.name+'</div>',
                            '<table cellpadding="0" cellspacing="0">',
                                '<thead>',
                                    '<tr>',
                                        '<th>投资期限</th>',
                                        '<th>加息限额</th>',
                                        '<th>年化利率</th>',
                                        '<th>新用户加息</th>',
                                    '</tr>',
                                '</thead>',
                                '<tbody id="laohuji_tb">',
                                '</tbody>',
                            '</table>',
                            '<div class="bkb_foot">请到PC端投资</div>',
                            '<img class="jiaxibiao" src="/styles/images/topic/xtyyh/mobile/popwin/jiaxibiao.png">',
                        '</div>',
                        //'<a class="more_bkb" href="//licai.p2peye.com/loans/" target="_blank" title="查看更多加息标">查看更多加息标</a>',
                    '</div>',
                '</div>']
            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            popwin.on('touchend click', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_get_prize_close')){
                    popwin.hide();
                }
            });
        }else{
            popwin.find('div.bkb_title').html('【'+options.prize.loan.pname+'】'+options.prize.loan.name).end()
                .find('img.pw_prize_img').attr('src', '//img.p2peye.com'+options.prize.img).next().html('恭喜你获得一个<span class="rate_font">'+options.prize.award_name+'</span>奖品');
            popwin.show();
        }


        var tbSrc = [];
        var bkb_d = options.prize.loan;
        tbSrc.push('<tr>');
        tbSrc.push('<td>'+bkb_d.period+'</td>');
        tbSrc.push('<td>'+bkb_d.up_amount+'</td>');
        tbSrc.push('<td><span class="rate_font">'+bkb_d.rate+'%</span></td>');
        tbSrc.push('<td><span class="rate_font">'+bkb_d.ty_rate+'%</span></td>');
        tbSrc.push('</tr>');
        $('#laohuji_tb').html(tbSrc.join(''));
    }

    /**
     * 谢谢参与
     * @param $container
     */
    function pop_xiexiecanyu_win($container){
        var popwin = $container.find('div.popwin_xiexiecanyu');
        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_xiexiecanyu">',
                    '<div class="pw_bg"></div>',
                    '<div class="pw_main">',
                        '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/thank_participating.png">',
                        '<div class="popwin_xiexiecanyu_close"></div>',
                    '</div>',
                '</div>']
            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            popwin.on('touchend click', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_xiexiecanyu_close')){
                    popwin.hide();
                }
            });
        }else{
            popwin.show();
        }
    }
    /*------------------------------------------老虎机 end-------------------------------------------*/


    /*------------------------------------------砸金蛋 start-------------------------------------------*/

    /**
     * 砸金蛋获奖提示
     * @param $container
     * @param options
     */
    function pop_zajindan_win($container, options){
        var popwin = $container.find('div.popwin_zajindan');


        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_zajindan">',
                    '<div class="pw_bg"></div>',
                    '<div class="pw_main">',
                        '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/t_hit_prize.png">',
                        '<img class="pw_prize_img" src="//img.p2peye.com'+options.prize.img+'">',
                        '<div class="pw_prize_text">恭喜你获得一个<span class="rate_font">'+options.prize.award_name+'</span>奖品</div>',
                        '<div class="popwin_zajindan_close"></div>',
                        //'<div class="lijitouzi"></div>',
                        '<div class="bkb_list">',
                            '<div class="bkb_title">【'+options.prize.loan.pname+'】'+options.prize.loan.name+'</div>',
                            '<table cellpadding="0" cellspacing="0">',
                                '<thead>',
                                    '<tr>',
                                        '<th>投资期限</th>',
                                        '<th>加息限额</th>',
                                        '<th>年化利率</th>',
                                        '<th>新用户加息</th>',
                                    '</tr>',
                                '</thead>',
                                '<tbody id="zajindan_tb">',
                                '</tbody>',
                            '</table>',
                            '<div class="bkb_foot">请到PC端投资</div>',
                            '<img class="jiaxibiao" src="/styles/images/topic/xtyyh/mobile/popwin/jiaxibiao.png">',
                        '</div>',
                        //'<a class="more_bkb" href="//licai.p2peye.com/loans/" target="_blank" title="查看更多加息标">查看更多加息标</a>',
                    '</div>',
                '</div>']
            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            popwin.on('touchend click', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_zajindan_close')){
                    popwin.hide();
                }
            });
        }else{
            popwin.find('div.bkb_title').html('【'+options.prize.loan.pname+'】'+options.prize.loan.name).end()
                .find('img.pw_prize_img').attr('src', '//img.p2peye.com'+options.prize.img);

            popwin.find('div.pw_prize_text').html('恭喜你获得一个<span class="rate_font">'+options.prize.award_name+'</span>奖品').end()
                .show();
        }


        var tbSrc = [];
        var bkb_d = options.prize.loan;
        tbSrc.push('<tr>');
        tbSrc.push('<td>'+bkb_d.period+'</td>');
        tbSrc.push('<td>'+bkb_d.up_amount+'</td>');
        tbSrc.push('<td><span class="rate_font">'+bkb_d.rate+'%</span></td>');
        tbSrc.push('<td><span class="rate_font">'+bkb_d.ty_rate+'%</span></td>');
        tbSrc.push('</tr>');
        $('#zajindan_tb').html(tbSrc.join(''));
    }
    /**
     * 金锤兑换记录
     * @param $container
     * @param options
     */
    function pop_cz_awardRecords_win($container, options){
        var popwin = $container.find('div.popwin_cz_awardRecords');
        var tbSrc = [], len = options.data.data.data.length;
        for(var i = 0;i < len;i++){
            tbSrc.push('<tr>');
            tbSrc.push('<td>'+(i+1)+'</td>');
            tbSrc.push('<td>'+options.data.data.data[i].type_name+'</td>');
            tbSrc.push('<td>'+options.data.data.data[i].num+'个</td>');
            tbSrc.push('<td>'+options.data.data.data[i].create_time+'</td>');
            tbSrc.push('</tr>');
        }
        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_cz_awardRecords">',
                    '<div class="pw_bg"></div>',
                    '<div class="pw_main">',
                        '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/cz_cash_prize.png">',
                        '<div class="popwin_cz_awardRecords_close"></div>',
                        '<div class="popwin_title">您共获得<span>'+(options.data.data.num?options.data.data.num:0)+'</span>个金锤！</div>',
                        '<div class="popwin_content">',
                            '<table cellpadding="0" cellspacing="0">',
                                '<thead>',
                                    '<tr>',
                                        '<th>编号</th>',
                                        '<th>获取途径</th>',
                                        '<th>获取个数</th>',
                                        '<th>获取时间</th>',
                                    '</tr>',
                                '</thead>',
                                '<tbody id="cz_awardRecords">',
                                    tbSrc.join(''),
                                '</tbody>',
                            '</table>',
                        '</div>',
                        '<div class="popwin_foot">',
                        '</div>',
                    '</div>',
                '</div>']
            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            popwin.find('table').css('height', 20*(len+1)+'%');
            popwin.on('touchend click', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_cz_awardRecords_close')){
                    popwin.hide();
                }else if($t.closest('div.popwin_foot').length > 0){
                    popwin.find('table').css('height', 20*($('#cz_awardRecords').children('tr:visible').length+1)+'%');
                }
            });
        }else{
            popwin.find('div.popwin_title').html('您共获得<span>'+(options.data.data.num?options.data.data.num:0)+'</span>个金锤！');
            var $tbody = $('#cz_awardRecords');
            $tbody.html(tbSrc.join('')).css('height', 20*($tbody.children('tr:visible').length+1)+'%');
            popwin.show();
        }
        options.callback && options.callback(options.data, popwin.find('div.popwin_foot'));
    }
    /**
     * 获取更多金锤
     * @param $container
     */
    function pop_getMoreCZ_win($container){
        var popwin = $container.find('div.popwin_getMoreCZ');
        if(popwin.length == 0){
            var targetSrc = [
                '<div class="popwin_getMoreCZ">',
                '<div class="pw_bg"></div>',
                '<div class="pw_main">',
                '<img class="bg" src="/styles/images/topic/xtyyh/mobile/popwin/get_more_cz.png">',
                '<div class="popwin_getMoreCZ_close"></div>',
                '<a href="javascript:void(0);" class="p_btn get_more"></a>',
                '</div>',
                '</div>']
            popwin = $(targetSrc.join(''));
            $container.append(popwin);
            popwin.on('touchend click', function(e){
                var t = e.target,$t = $(t);
                if($t.hasClass('popwin_getMoreCZ_close')){
                    popwin.hide();
                }else if($t.hasClass('get_more')){
                    var isplaying = default_.zajindan_ && default_.zajindan_.isPlaying();
                    if(isplaying) {
                        xtyyh.alert('游戏进行中，客官不要走！');
                        return;
                    }
                    window.location.href = '//licai.p2peye.com/topic/gonglue#gl_sls_a';
                }
            });
        }else{
            popwin.show();
        }
    }

    /*------------------------------------------砸金蛋 end-------------------------------------------*/
    return {
        pop_getPrize_win: pop_getPrize_win,
        pop_xiexiecanyu_win: pop_xiexiecanyu_win,
        pop_getGameCurrency_win: pop_getGameCurrency_win,
        pop_myGameCurrency_win: pop_myGameCurrency_win,
        pop_myHitRecord_win: pop_myHitRecord_win,
        pop_cz_awardRecords_win: pop_cz_awardRecords_win,
        pop_zajindan_win: pop_zajindan_win,
        pop_getMoreCZ_win: pop_getMoreCZ_win,
        pop_end_of_activity_win: pop_end_of_activity_win,
        close: close,
        init: init
    };
}();

exports.pop_getPrize_win = popwin_.pop_getPrize_win;
exports.pop_xiexiecanyu_win = popwin_.pop_xiexiecanyu_win;
exports.pop_getGameCurrency_win = popwin_.pop_getGameCurrency_win;
exports.pop_myGameCurrency_win = popwin_.pop_myGameCurrency_win;
exports.pop_myHitRecord_win = popwin_.pop_myHitRecord_win;
exports.pop_cz_awardRecords_win = popwin_.pop_cz_awardRecords_win;
exports.pop_zajindan_win = popwin_.pop_zajindan_win;
exports.pop_getMoreCZ_win = popwin_.pop_getMoreCZ_win;
exports.pop_end_of_activity_win = popwin_.pop_end_of_activity_win;
exports.close = popwin_.close;
exports.init = popwin_.init;