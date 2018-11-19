var cookie = require('../modules/cookie');
$("#memberHeader .img")
.on("click",function(){
    $("#memberHeader").addClass("current");
    $(this).parent().animate({height:220},250);
});
$("#memberHeader")
.on("mouseleave",function(){
    var _this=$(this);
    _this.find(".inner").animate({height:140},250,function(){
         _this.removeClass("current");
    });
});
$('body')
    .on('mouseenter','.bind',function(){
        $(this).children('.wrapBox').stop().fadeIn();
    })
    .on('mouseleave','.bind',function(){
        $(this).children('.wrapBox').stop().fadeOut();
    })
    .on('click','.loanslead .close',function(){
        $.cookie('loanslead','close',{path:'/member'});
        $(this).parents('.loanslead').remove();
    });
if($.cookie('loanslead') != 'close'){
    $('.loanslead').show();
}
