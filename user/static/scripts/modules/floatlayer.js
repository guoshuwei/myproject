var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;
window.isIELower = isIE6 || isIE7 || isIE8;
if($(".mod-floatlayer").length > 0){
    $(window).scroll(function(){
        var footer = $('.footer');
        var hasfooter = footer.length;
        var footerHeight=hasfooter ? $('.footer').outerHeight():0;
        var footerTop=hasfooter?footer.offset().top : 0;
        var bodyScrollTop=$(document).scrollTop();
        var bodyheight=$(document).outerHeight();
        if(document.compatMode=="CSS1Compat"){
            var winHeight=document.documentElement.clientHeight;
        }else{
            var winHeight=document.body.clientHeight;
        }    
        if(bodyScrollTop>=winHeight){
            $(".mod-floatlayer .home").css("display","block")        
        }else{
             $(".mod-floatlayer .home").css("display","none")
        }
        if(bodyScrollTop+winHeight>=footerTop){
             $(".mod-floatlayer").css({
                "position":"absolute",
                "bottom":footerHeight+30+"px",
                "right":"20px"
             })
        }else{
            $(".mod-floatlayer").css({
                "position":"fixed",
                "bottom":"50px",
                "right":"20px"
             })
        }
    });
    var bDShareBox = $('.bdshare_popup_box');
    $(".mod-floatlayer .home").click(function(){
        $(".mod-floatlayer .home").css("display","none");
        $("document").scrollTop(0);
    })
    $('body')
        .on('mouseenter','.baidushare',function(){
            bDShareBox.show();
        })
        .on('mouseleave','.baidushare',function(){
            bDShareBox.hide();
        });
    function flip(){
        var redland = $('.redland');
        if(redland.length == 0){
            return;
        }
        var isAnimating = false;
        var nextLoop = true;
        var timer = null;

        function flipAnimate(){
            isAnimating = true;
            var logo_ = redland.find('img:visible');
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            /*if(redland.hasClass('hongbao')){
                if(redland.hasClass('flipInY_90')){
                    redland.removeClass('flipInY_90 animated_in').addClass('flipInY_270');
                    redland.addClass('flipInY_360 animated_out');
                }else{
                    redland.removeClass('flipInY_360 animated_out').addClass('flipInY_90 animated_in');
                }
            }else{
                if(redland.hasClass('flipInY_90')){
                    redland.removeClass('redland2 flipInY_90 animated_in').addClass('redland1 flipInY_270');
                    redland.addClass('flipInY_360 animated_out');
                }else{
                    redland.removeClass('flipInY_360 animated_out').addClass('flipInY_90 animated_in');
                }
            }*/
            //.css("cssText", "width:650px !important;overflow:hidden !important");
            if(window.isIELower){
                if(logo_.hasClass('hongbao')){
                    logo_.hide().next().show();
                }else{
                    logo_.hide().prev().show();
                }
                timer = setTimeout(flipAnimate,1800);
            }else{
                if(logo_.attr('data-flipInY') == '90'){
                    var $nextObj = logo_.css("cssText", "display: none !important;").attr('data-flipInY', 0);
                    $nextObj = $nextObj.hasClass('hongbao') ? $nextObj.next() : $nextObj.prev();
                    $nextObj.css("cssText", "width: 0;left: 24.5px;opacity: 0;display: block !important;")
                      .animate({
                        'width': '49px',
                        'left': 0,
                        'opacity': 1
                    }, 600, function(){
                        isAnimating = false;
                        if(nextLoop){
                            timer = setTimeout(flipAnimate,1800);
                        }
                    }).attr('data-flipInY', 0);
                }else{
                    logo_.attr('data-flipInY', 90).animate({
                        'width': 0,
                        'left': '24.5px',
                        'opacity': 0
                    }, 400, function(){
                        isAnimating = false;
                        nextLoop && flipAnimate();
                    });
                }
            }
            //timer = setTimeout(flipAnimate,redland.hasClass('flipInY_90') ? 400 : 1500);
        }
        flipAnimate();
        redland.hover(function(){
            if(window.isIELower){
                clearTimeout(timer);
                timer = null;
            }else{
                nextLoop = false;
                var logo_1 = redland.find('img:visible');
                if(logo_1.attr('data-flipInY') == '90') {
                    !isAnimating && flipAnimate();
                }else{
                    clearTimeout(timer);
                    timer = null;
                }
            }
        },window.isIELower ? flipAnimate : function(){
            nextLoop = true;
            !isAnimating && !timer && flipAnimate();
        })
    }
    flip()
    //客服icon
    var imUrl = location.href.split(":");
    imUrl.shift();
    imUrl = imUrl.join();
    var imEle = document.getElementById("udesk-im-40");imEle.onclick = function(){ window.open("http://touyouquan.udesk.cn/im/select?cur_url=http:"+imUrl+"&pre_url="+document.referrer,"", "width=780,height=560,top=200,left=350,resizable=yes"); };
}

