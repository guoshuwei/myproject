var
    app = require('./app'),
    nowTime = $('body').attr('data-nowtime'),
    uid = $('body').attr('uid'),
    hengpingTip =  function(){
        var $shuping = $('#hengpingTip');
        if($shuping.length == 0){
            var shupingHtml = '<div id="hengpingTip" class="ui-hengping"><div class="content"><img class="img" src="/styles/images/topic/xtyyh/mobile/shenpingshuping.jpg"><div class="text">为了更好的体验，请使用竖屏浏览</div></div></div>';
            var $shupingDom = $(shupingHtml);
            $('body').append($shupingDom);
            $shupingDom.find('img.img').addClass('shupingAnimate')
        }else{
            $shuping.show().find('img.img').addClass('shupingAnimate');
        }
    };

var mywSwiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical',
    loop: false,
    onTouchEnd: function(swiper){
        // var move = swiper.translate;
        // var item = $('.swiper-slide').eq(0).height();
        // if(move < -item * 4){
        //     $('.fn-notprev').click();
        // }

    }
});

$('body')
    .on('tap','.fn-notprev',function(){
        $('.swiper-pagination-bullet').eq(0).click();
    })

function checkOrient() {
        
    if (window.orientation == 0 || window.orientation == 180){
        //shu
        $('#hengpingTip').hide();
    }
    else if (window.orientation == 90 || window.orientation == -90){
        //heng
        hengpingTip();
    }

}

addEventListener('load', function(){
    checkOrient();
    window.onorientationchange = checkOrient;
});


