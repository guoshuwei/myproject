var domCache = {
        touchmove : false
    };


$(document).ready(function(){
    $('#gl_board').on("touchstart", function(e){
            domCache.touchmove = false;
        }).on("touchmove", function(e){
            domCache.touchmove = true;
        }).on("touchend", function(e){
        if(domCache.touchmove){
            return;
        }
        /**
         * localStorage.setItem("b","isaac");//设置b为"isaac"
         var a1 = localStorage["a"];//获取a的值
         var a2 = localStorage.a;//获取a的值
         var b = localStorage.getItem("gameType");//获取b的值
         localStorage.removeItem("c");//清除c的值
         */

        var t = e.target;
            $t = $(t);
        if($t.hasClass('gl_zaqiqiu')){
            localStorage.setItem("gameType","g_zaqiqiu");
            window.location.href = '//licai.p2peye.com/topic/xtyyh';
        }else if($t.hasClass('gl_baokuanbiao')){
            return;
            localStorage.setItem("gameType","g_baokuanbiao");
            window.location.href = '//licai.p2peye.com/topic/xtyyh';
        }else if($t.hasClass('gl_laohuji')){
            localStorage.setItem("gameType","g_laohuji");
            window.location.href = '//licai.p2peye.com/topic/xtyyh';
        }else if($t.hasClass('gl_zajindan')){
            localStorage.setItem("gameType","g_zajindan");
            window.location.href = '//licai.p2peye.com/topic/xtyyh';
        }else if($t.hasClass('go_to_back')){
            localStorage.setItem("gameType","g_board");
            window.location.href = '//licai.p2peye.com/topic/xtyyh';
        }

    });
    var url = window.location.toString();
    var id = url.split("#")[1];
    if(id)
        $("html,body").animate({scrollTop:$("#"+id).offset().top},1000);
});