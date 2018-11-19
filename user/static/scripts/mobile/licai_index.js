var
    app = require('./app'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    bannerLength = $('.fn-banner-inner .ui-banner-inner-item').length;

_Fn.backTop();
if(bannerLength > 1){
    var slider1 = $('.fn-banner-inner').bxSlider({
        auto: true,
        pause: 5000,
        controls: false,
        onSlideAfter: function(){
            slider1.startAuto()
        }
    })
}
$('.fn-close').click(function(){
    $('.ui-invite').remove();
});

/* 新手任务 */
var isWelfare = Number($("#isWelfare").val()),
    floatLayerWelfare = $(".float-layer-welfare"),
    welfareHide = Number($.cookie("welfareHide"));
if(isWelfare && !welfareHide){
    floatLayerWelfare.fadeIn();
}

$("body")
    .on("tap",".float-layer-welfare-close",function(){
        // 设置一天的 cookie
        $.cookie("welfareHide",1, {path : '/',expires : 1});
        floatLayerWelfare.fadeOut();
    })
    .on('tap',".ui-header-user a",function(){
        bdpa.track("click",{
            titles:"理财H5-用户头像"
        })
    })
    .on('tap',"[role-tap=bdpa]",function(){
        var titleText=$(this).data("bdpa");
        bdpa.track("click",{
            titles:titleText
        })
    })
