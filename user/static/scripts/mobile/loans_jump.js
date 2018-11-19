var 
    app = require('./app'),
    template = require('../modules/template'),
    postPhoneDialog,
    $jump_to = $('#jump_to'),
    $data = $('#data'),
    id = $data.attr("data-id"),
    through = $data.attr("data-through"),
    bind = $data.attr('data-bind'),
    is_new = $data.attr('data-is_new'),
    isZT = $data.attr('data-jumptype'),
    url = "/loans/redirect?t=" + new Date().getTime()+(through==1?'&through=1':''),
    timer = null,
    data,
    loadingInterval,
    platname = $data.attr('data-plat'),
    username = $data.attr('data-username');

function getRedirectUrlFailed(isFirstJump){//return; 
    //芳芳说就要这个网络错误提示 非200和error都是这个提示
    if(!isFirstJump) {
        loadingInterval && clearInterval(loadingInterval);
        loadingInterval = null;
    }
    var content = template.render('webfailTpl',{id:id});
    $('body').html(content);
}
function afterFirstBind(data){
    $('.ui-jum-bind').hide();
    var $tit = $('.ui-bd-s').show().find('.ui-s-hd');
    
    if(bind){
        if(is_new == '1'){//已绑定新用户
            $tit.html('<div class="s-hd-z1">Hi，'+username+'</div>'+
                '<div class="s-hd-z2">您是<span>'+platname+'</span>新用户</div>');
        }else{//已绑定老用户

            $tit.html('<div class="s-hd-z1">Hi，'+username+'</div>'+
                '<div class="s-hd-z2">您是<span>'+platname+'</span>老用户</div>');
        }
    }else{
        if(data.autoRegister == '1'){//未绑定新用户从绑定过渡页跳转到此绑定成功页面
            $tit.html('<div class="s-hd-s"></div>'+
                '<div class="s-hd-2">绑定成功</div>'+
                '<div class="s-hd-3">'+username+'，您是<span>'+platname+'</span>新用户</div>');
        }else{//未绑定老用户
            if(data.platformLimitold == '1'){
                $tit.html('<div class="s-hd-f"></div>'+
                '<div class="s-hd-2">未完成绑定</div>'+
                '<div class="s-hd-inner">很遗憾，您是<span>【'+platname+'】</span>老用户该平台暂时不支持已有账号与天眼进行绑定，您可以查看其他平台标的</div>');
                $('.ui-s-bd').html('<div class="ui-btnbox"><a href="/loans/" class="ui-btn" title="查看其它平台标的">查看其它平台标的</a></div>');
                $('.ui-s-fd').hide();
            }else{
                $tit.html('<div class="s-hd-f"></div>'+
                '<div class="s-hd-2">未完成绑定</div>'+
                '<div class="s-hd-3">'+username+'，您是<span>'+platname+'</span>老用户，去平台登录即可绑定</div>');
            }
        }
    }


}
function platJump(isFirstJump){
    if(!isFirstJump){
        loadingInterval && clearInterval(loadingInterval);
        $jump_to.html('正在跳转中<span>.</span><span>.</span><span>.</span>');
        loadingInterval = setInterval(function(){
            var x = $jump_to.data('x');
            x = x ? (x > 2 ? 0 : x) : 0;
            if(x == 0){
                $jump_to.children().css('visibility', 'hidden');
            }
            var $dot = $jump_to.children().eq(x);
            $dot.css('visibility') == 'hidden' ? $dot.css('visibility', 'visible') : $dot.css('visibility', 'hidden');
            $jump_to.data('x', x+1);
        },400);
    }
    //timer = window.setTimeout(function () {
        $.ajax({
            url: /*_Fn.mockServer +*/ url,
            type: "post",
            dataType: 'json',
            data: "id=" + id,
            success: function (msg) {
                if (msg.code == 200) {
                    data = msg.data.redirect;
                    if(!data){
                        getRedirectUrlFailed(isFirstJump);
                        return;
                    }
                    /*if(isZT == 1){
                        $jump_to.attr({'data-url':true,href:$data.attr('data-href')});
                    }else{
                        $jump_to.attr({'data-url':true,href:data});
                    }*/
                    
                    // if(isZT == 1){
                    //     $('body').append('<iframe style="display:none;" src="'+data+'"></iframe>');
                    //     setTimeout(function(){
                    //         window.location.href = $("#data").attr('data-href');
                    //     },2500);
                    // }else{
                    //     window.location.href = data;
                    // }
                    if(isZT == 1){
                        $('body').append('<iframe style="display:none;" src="'+data+'"></iframe>');
                        if(isFirstJump){
                            afterFirstBind(msg.data);
                            $jump_to.data('newHref',　$("#data").attr('data-href')).data('newTime',　new Date().getTime());
                        }else{
                            setTimeout(function () {
                                window.location.href = $data.attr('data-href');
                            }, 2500);
                        }
                    }else{
                        if(isFirstJump){
                            afterFirstBind(msg.data);
                            $jump_to.data('newHref',　data).data('newTime',　new Date().getTime());
                        }else {
                            window.location.href = data;
                        }
                    }

                }else{
                    //$('body').html($('.webfail'));
                    getRedirectUrlFailed(isFirstJump);
                }
            },
            error: function () {
                //$('body').html($('.webfail'));
                getRedirectUrlFailed(isFirstJump);
            }
        });
    //}, 2000);
}
/*function timeDown(){
    var num=5;
    function _timeDown(){
        num=num-1;
        if(num==0){
            clearInterval(timer);
            if(!data){
                var content = template.render('webfailTpl',{id:id});         
                $('body').html(content);
            }else if(isZT == 1){
                $('body').append('<iframe style="display:none;" src="'+data+'"></iframe>');
                setTimeout(function () {
                    window.location.href = $data.attr('data-href');
                }, 2500);
            }else{
                window.location.href = data;
            }
            return;
        }
        $(".fn-timedown").html(num);
        var timer=setTimeout(_timeDown,1000)
        
    }  
    _timeDown();  
}*/
if(!bind){
    platJump(1);
}
//timeDown();
$('body')
    .on('touchend','#jump_to',function(){
        var newHref = $(this).data('newHref'),
            newTime  = $(this).data('newTime');
        if(newHref && (new Date().getTime()-newTime)/1000 < 30){
            window.location.href = newHref;
        }else{
            platJump();
        }
    });

if(bind == '1' && $data.attr('data-jump') == '1')
    $jump_to.trigger('touchend');




