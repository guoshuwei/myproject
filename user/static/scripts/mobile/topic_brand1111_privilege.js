var  wxReady = require('../modules/jssdk'), 
dataUrl = window.location.href;

wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        link: dataUrl, // 分享链接
        imgUrl:'//licai.p2peye.com/styles/images/topic/brand1111/mobile/wxshare_logo.png'
    });
})
$(window).bind( 'orientationchange', function(e){
    e.stopPropagation();
    e.cancelBubble = true;
    window.location.href = window.location.href;
});
