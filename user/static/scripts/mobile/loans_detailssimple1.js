var
    app = require('./app'),
    listenType = _Fn.isMobile() ? 'touchend' : 'click',
    $kjlist = $('#ui-details-kjlist'),
    isTouchmove;

$('body')
    .on(listenType,'.fn-details-toloans',function(){
        if(!_Fn.isBind())return false;
        _Fn.lightboxWrap()._fadeIn();
        $('.fn-details-jump').fadeIn()
    })
    .on(listenType,'.ui-details-jump-cancel',function(){
        _Fn.lightboxWrap()._fadeOut();
        $('.fn-details-jump').hide();
    })
    .bind("touchstart", function(e){
        isTouchmove = false;
    }).bind("touchmove", function(e){
        isTouchmove = true;
    }).bind(listenType, function(e){
        if(isTouchmove)return;
        var t = e.target,
            $t = $(t);
        if($t.attr('id') == 'ui-details-kjs'){
            //if(!_Fn.isBind())return false;
            _Fn.lightboxWrap()._fadeIn();
            $kjlist.removeClass('ui-details-kjlist-show').addClass('ui-details-kjlist-show');
            return;
        }

        if(($t.hasClass('ui-kjlist-close') || $t.closest('.ui-details-kjlist').length == 0)
            && $kjlist.hasClass('ui-details-kjlist-show')){
            $kjlist.removeClass('ui-details-kjlist-show');
            _Fn.lightboxWrap()._fadeOut();
        }

    });

if ( window.orientation == 180 || window.orientation == 0 ) {
    $kjlist.removeClass('ui-heng-ping').addClass('ui-shu-ping');
}else{//横
    $kjlist.removeClass('ui-shu-ping').addClass('ui-heng-ping');
}
/*
 * 判断屏幕是否横屏
 */
window.addEventListener('orientationchange', function(event){
    if ( window.orientation == 180 || window.orientation == 0 ) {
        $kjlist.removeClass('ui-heng-ping').addClass('ui-shu-ping');
    }else{//横
        $kjlist.removeClass('ui-shu-ping').addClass('ui-heng-ping');
    }
});