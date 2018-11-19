var
    app = require('./app'),
    wxReady = require('../modules/jssdk'),
    listenType = _Fn.isMobile() ? 'touchend' : 'click',
    invite = $('.fn-invite'),
    is_app = $('#is_app').val(),
    share_uid = $('#data-share_uid').val(),
    dataUrl = invite.attr('data-url'),
    weiXinInvite = $('.fn-invite-weixin'),
    picInvite = $('.fn-invite-pic');
if(is_app == 1){
    //'isoapp licaiapp version20170407'
    var _userAgent = navigator.userAgent.toLowerCase();
    var appVLower = true;

    if(window.JSInterface && window.JSInterface.payResult){//andoid licaiApp AndroidApp Version
        var appFlag = 'licaiapp androidapp version';
        if(_userAgent.indexOf(appFlag) > -1){
            var appFlagIndex = _userAgent.indexOf(appFlag)+appFlag.length;
            var banben = _userAgent.substring(appFlagIndex,appFlagIndex+5);
            if(banben > '4.1.4'){
                appVLower = false;
            }
        }
    }else{//iso
        if(_userAgent.indexOf('iosapp') > -1
            && _userAgent.indexOf('licaiapp') > -1){
            var iosbanben = _userAgent.match(/\(iosapp.*Version[\d|\.]*\)/i);
            if(iosbanben[0]){
                iosbanben = iosbanben[0].match(/Version[\d|\.]*/i);
                if(iosbanben[0].indexOf('.') == -1){
                    iosbanben = iosbanben[0].substring(7,iosbanben[0].length);
                    if(iosbanben >= '20170407'){
                        appVLower = false;
                    }
                }
            }
        }
    }
    if(appVLower){
        invite.length > 0 && invite.css({
            'background-color': '#8a8a8a',
            color: '#fff'
        }).text('请更新至新版APP，享受邀请大礼');

        var $ui_sec3 = $('.ui_sec3');
        $ui_sec3.length > 0 && $ui_sec3.hide();
    }
}

$(window).bind('resize', _Fn.resizeWindow);

invite.click(function() {
    if(is_app == 1){
        var curProtocol = window.location.protocol.split(':')[0],
            paramsUrl;
        if (curProtocol === 'https') {
            paramsUrl = 'https://licai.p2peye.com/help/register?source_uid='+share_uid+'&activity=cpasinvite&response=yqyl';
        }
        else {
            paramsUrl = 'http://licai.p2peye.com/help/register?source_uid='+share_uid+'&activity=cpasinvite&response=yqyl';
        }
        var params = {
            "desc":"国内理财权威门户网站网贷天眼邀请活动火热进行中，投资就有加息，红包双份拿，还有智能记账保驾护航。等你来投~",
            "title" : "注册领168元理财大礼包，还有最高天眼加息4%，理财不等待！",
            "url" : paramsUrl,
            "imgUrl" : ''};
        if(!appVLower){
            if(window.JSInterface && window.JSInterface.payResult){//andoid
                window.JSInterface.payResult(JSON.stringify(params));
            }else{//iso
                //navigator.userAgent
                window.webkit.messageHandlers.p2plicaiInviteShare.postMessage(params);
            }
        }
    }else{
        if(!_Fn.isBind())return false;
        if(_Fn.isWeiXin()){
            //_Fn.lightboxWrap()._fadeIn();
            weiXinInvite.show();
        }else{
            _Fn.lightboxWrap()._fadeIn();
            picInvite.show();
        }
    }
})
if(_Fn.resizeWindow()){
    _Fn.lightboxWrap()._fadeIn();
}
$('body')
    .on(listenType,'.ui-invite-weixin .bg,.ui-invite-pic-word',function(){
        if(_Fn.isWeiXin()){
            weiXinInvite.fadeOut();
        }else{
            _Fn.lightboxWrap()._fadeOut();
            picInvite.fadeOut();
        }

    })

wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        success:function(){
            alert('分享成功');
        },
        link: dataUrl, // 分享链接
        title: '网贷天眼送您10元红包，速来领取吧~'
    });
})


$('.ui-footer').hide();