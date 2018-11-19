$(window).ready(function(){
    var app=require('./app');
    var receiveOff=$('[role-touch="revice"]').data('revice');//是否领取卡券
    var shareBtn=$('[role-touch="revice"] .item-link-right');
    var ua = window.navigator.userAgent.toLowerCase();
    var url=window.location.href;
    var ajaxOff = true;//ajax请求过程
    //微信分享
    var wxReady = require('../modules/jssdk');
    var wxShareTitle = $('.wxShareTitle').val();
    var wxShareDesc = $('.wxShareDesc').val();
    setTimeout(function(){
        wxReady.init(function(status){
            if(status == 'error'){return;}
            wxReady.share({
                title : wxShareTitle,
                desc : wxShareDesc
            });
        });
    },5000)
    $('body')
    .on('touchend','[role-touch=weixin]',function(event){
        event.stopPropagation();
        $('.weixin-flayer').show();
    })
    .on('touchend','[role-touch="stop"]',function(event){
        event.stopPropagation();
    })
    .on('touchend','.mod-mask',function(){
        $(this).hide();
        return false;
    })
    .on('touchend','.mask-close',function(){
        $(this).parents('.mod-mask').hide();
        return false;
    })
    .on('touchend','[role-touch="revice"]',function(event){
        event.stopPropagation();
        if(receiveOff){
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){//微信打开
                $('.share-weixin').show();
            }else if(ua.match(/licaiapp/i) == 'licaiapp'){//app打开
                _app();
            }else {
                $('.share-flayer').show();
            }

        }else {
            if(ajaxOff){
                ajaxOff=false;
                shareBtn.html('领取中...');
                $.ajax({
                    url:'//licai.p2peye.com/topic/platday?action=get_card',
                    type:'get',
                    dataType:'json',
                    success:function(message){
                        if(message.code == 200){
                            _Fn.alert('领取成功，快去投资！');
                            receiveOff=1;
                            shareBtn.html('分享给好友');
                        }else if(message.code == 45200){
                            _Fn.alert('今日已领取');
                            receiveOff=1;
                            shareBtn.html('分享给好友');
                        }else if(message.code == 5158){
                            _Fn.alert('活动已结束');
                            setTimeout(function(){
                                window.location.reload();
                            },1000);
                        }else {
                            _Fn.alert('网络环境较差，稍后尝试吧~');
                            shareBtn.html('点击领取');
                            ajaxOff=true;
                        }
                    },
                    error:function(){
                        _Fn.alert('网络环境较差，稍后尝试吧~');
                        shareBtn.html('点击领取');
                        ajaxOff=true;
                    }
                })


            }
        }
    })
    .on('click','[role-event="track"]',function(){
        _Fn.track.fire($(this).attr('event-track'));
    });
    //调用app分享

    function _app(){
        var app_url=url;
        var app_title=wxShareTitle;
        var app_desc=wxShareDesc;
        var jsonapp={"url":app_url,"title":app_title,"desc":app_desc,"imgUrl":"//www.p2peye.com/static/image/wechatshare.jpg"};
        if(window.JSInterface){
            JSInterface.payResult(JSON.stringify(jsonapp));
        }else {
            window.webkit.messageHandlers.appleP2plicaiShare.postMessage({body: jsonapp});
        }
    }
})