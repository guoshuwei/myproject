var
    app = require('./app'),
    listenType = _Fn.isMobile() ? 'touchend' : 'click',
    $cardNum = parseInt($('#use_card_num').val()),
    isTouchmove,
    uid = $('body').attr('uid');

_Fn.backTop();
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
    }).on(listenType, '.ui-details-header-rate', function(e){
        if(isTouchmove)return;
        var tips = $(this).find('.deleteTip');
        if(tips.length > 0){
            var tipClearTimeout = tips.data('tipClearTimeout');
            if(tipClearTimeout){
                clearTimeout(tipClearTimeout);
                tips.data('tipClearTimeout', null);
            }
            tips.addClass('showDeleteTip');
            tips.data('tipClearTimeout', setTimeout(function(){
                tips.removeClass('showDeleteTip');
            }, 5000));
        }
    }).on(listenType, '.ui-rate-delete', function(e){
        if(isTouchmove)return;
        var tips = $(this).find('.ui-rate-deleteTip');
        if(tips.length > 0){
            var tipClearTimeout = tips.data('tipClearTimeout');
            if(tipClearTimeout){
                clearTimeout(tipClearTimeout);
                tips.data('tipClearTimeout', null);
            }
            tips.addClass('showDeleteTip');
            tips.data('tipClearTimeout', setTimeout(function(){
                tips.removeClass('showDeleteTip');
            }, 5000));
        }
    })

if(!isNaN($cardNum) && $cardNum > 0){
    var $kjlist = $('#ui-details-kjlist');
    $('body').bind(listenType, function(e){
        if(isTouchmove)return;
        var t = e.target,
            $t = $(t);
        if($t.attr('id') == 'ui-details-kjs'){
            //if(!_Fn.isBind())return false;
            $('body, html').css({'overflow': 'hidden', 'height': '100%'});
            _Fn.lightboxWrap()._fadeIn();
            $kjlist.removeClass('ui-details-kjlist-show').addClass('ui-details-kjlist-show');
            return;
        }

        if(($t.hasClass('ui-kjlist-close') || $t.closest('.ui-details-kjlist').length == 0)
            && $kjlist.hasClass('ui-details-kjlist-show')){
            $('html, body').css({'overflow': 'scroll', 'height': 'auto'});
            $kjlist.removeClass('ui-details-kjlist-show');
            _Fn.lightboxWrap()._fadeOut();
        }

    });

    if ( window.orientation == 180 || window.orientation == 0 ) {
        $kjlist.removeClass('ui-heng-ping').addClass('ui-shu-ping');
    }else{//横
        $kjlist.removeClass('ui-shu-ping').addClass('ui-heng-ping');
    }
    /**
     * 判断屏幕是否横屏
     */
    window.addEventListener('orientationchange', function(event){
        if ( window.orientation == 180 || window.orientation == 0 ) {
            $kjlist.removeClass('ui-heng-ping').addClass('ui-shu-ping');
        }else{//横
            $kjlist.removeClass('ui-shu-ping').addClass('ui-heng-ping');
        }
    });
}

$.ajax({
    type: "post",
    url: "//licai.p2peye.com/loans/ajax?type=calculate_amount",
    data: uid && uid.length > 0 ?{
        amount: parseInt($('#loan_amount').val()),
        is_new:$('#is_new_user').val(),
        id:$('#loan_id').val()
    }: {
        amount: parseInt($('#loan_amount').val()),
        is_new:0,
        id:$('#loan_id').val()
    },
    dataType: "json",
    success: function(data){
        if(data.code == 200){
            $('#ui-font-eded2a').html(data.data.data.total_profit+'元');
        }else{
            $('#ui-font-eded2a').html('');
        }
    },
    error: function(error){
        $('#ui-font-eded2a').html('');
    }
});

var $addRateBtn = $('#ui-addRateBtn'); //天眼加息规则
if($addRateBtn.length){
    var $addRateBox = $('#ui-addRate');
    $('body').bind(listenType, function(e){
        if(isTouchmove)return;
        var t = e.target,
            $t = $(t);
        if($t.attr('id') == 'ui-addRateBtn'){
            $('body, html').css({'overflow': 'hidden', 'height': '100%'});
            _Fn.lightboxWrap()._fadeIn();
            $addRateBox.addClass('ui-addRate-show');
            return;
        }
        
        if(($t.hasClass('ui-addRate-close') || $t.closest('.ui-addRate').length == 0)
            && $addRateBox.hasClass('ui-addRate-show')){
            $('html, body').css({'overflow': 'scroll', 'height': 'auto'});
            $addRateBox.removeClass('ui-addRate-show');
            _Fn.lightboxWrap()._fadeOut();
        }
        
    });
    
    if ( window.orientation == 180 || window.orientation == 0 ) {
        $addRateBox.removeClass('ui-heng-ping').addClass('ui-shu-ping');
    }else{//横
        $addRateBox.removeClass('ui-shu-ping').addClass('ui-heng-ping');
    }
    
    window.addEventListener('orientationchange', function(event){
        if ( window.orientation == 180 || window.orientation == 0 ) {
            $addRateBox.removeClass('ui-heng-ping').addClass('ui-shu-ping');
        }else{//横
            $addRateBox.removeClass('ui-shu-ping').addClass('ui-heng-ping');
        }
    });
}

