var app = require('./app'),
    validate = require('../modules/validate'),
    step1 = $("#step1"),
    step2 = $("#step2"),
    step3 = $("#step3"),
    mobile = "",
    openid = $("#openid").val(),
    accessToken = $("#access_token").val();

$("body")
    .on("input",".list-item-input.phone",function(){
        mobile = $(this).val();
    })
    .on("touchend",".list-input-button",function(){
        if($(this).hasClass("disable")){
            return;
        }
        var code = "";
        if(!mobile.length){
            alert("请输入手机号！");
            return false;
        }else if(!validate.api.mobile(mobile)){
            alert("请输入正确的手机号！");
            return false;
        }
        $.ajax({
            url:"/weixin/sendCode/",
            type:"post",
            data:{
                "mobile" : mobile,
                "code" : code
            },
            dataType:"json",
            success:function(res){
                if(res.code == 200){
                    $(".list-input-button").addClass("disable");
                    countDown(60);
                    alert("手机验证码发送成功！");
                }else if(res.code == 301){
                    $(".image-code-image").attr("src","/weixin/on_vcode/?mobile=" + mobile);
                    $(".image-code-layer").fadeIn();
                }else{
                    alert(res.message);
                }
            },
            error:function(){
                alert("网络错误，请稍后再试");
            }
        });
    })
    .on("touchend",".image-code-image",function(){
        getVcode(mobile);
    })
    .on("touchend",".image-code-close",function(){
        $(".image-code-layer").fadeOut();
    })
    .on("touchend",".image-code-box-btn",function(){                   /* 提交验证码 */
        var code = $(".image-code-input").val();
        if(code.length == 0){
            alert("请输入图形验证码");
            return;
        }
        $.ajax({
            url:"/weixin/sendCode",
            type:"post",
            data:{
                "mobile" : mobile,
                "code" : code
            },
            dataType:"json",
            success:function(res){
                if(res.code == 200){
                    $(".list-input-button").addClass("disable");
                    countDown(60);
                    $(".image-code-layer").fadeOut();
                    alert("手机验证码发送成功！");
                }else{
                    alert(res.message);
                }
            },
            error:function(){
                alert("网络错误，请稍后再试");
            }
        });
    })
    .on("touchend",".list-submit",function(){
        if($(this).hasClass("disable")){
            return;
        }
        if(!mobile.length){
            alert("请输入手机号！");
            return false;
        }else if(!validate.api.mobile(mobile)){
            alert("请输入正确的手机号！");
            return false;
        }
        _Fn.track.fire(213000013);
        var code = $(".list-item-input.code").val();
        if(code.length == 0){
            alert("请输入短信验证码！");
            return false;
        }
        $(".list-submit").addClass("disable").html("绑定中...");
        $.ajax({
            url:"/weixin/bindpost",
            type:"post",
            data:{
                "openid" : openid,
                "access_token" : accessToken,
                "mobile" : mobile,
                "mobilecode" : code
            },
            dataType:"json",
            success:function(res){
                if(res.code == 200){
                    $(".list-submit").html("已绑定");
                    _Fn.alert("绑定成功");
                    setTimeout(function(){
                        WeixinJSBridge.call('closeWindow');
                    },2000);
                }else{
                    $(".list-submit").removeClass("disable").html("立即绑定");
                    _Fn.alert(res.message);
                }
            },
            error:function(){
                _Fn.alert("网络错误，请稍后再试");
            }
        });
    })
    .on("touchend",".unbind-btn",function(){
        step1.hide();
        step2.show();
    })
    .on("touchend",".unbind-sure",function(){
        $.ajax({
            url:"/weixin/unbind",
            type:"post",
            data:{
                openid:openid
            },
            dataType:"json",
            success:function(res){
                if(res.code == 200){
                    step2.hide();
                    step3.show();
                }else{
                    _Fn.alert(res.message);
                }
            },
            error:function(){
                _Fn.alert("您的网络有问题，请稍后再试");
            }
        })
    })
    .on("touchend",".unbind-cancel",function(){
        step2.hide();
        step1.show();
    })
    .on("touchend",".unbind-back",function(){
        WeixinJSBridge.call('closeWindow');
    });

var getVcode = function(mobile){
        $(".image-code-image").attr("src","/weixin/on_vcode/?mobile=" + mobile);
        $(".image-code-layer").fadeIn();
    },
    countDown = function(sec){
        var btn = $(".list-input-button");
        setTimeout(function(){
            sec -= 1;
            btn.html(sec + "秒后重发");
            if(sec > 0){
                countDown(sec);
            }else{
                btn.html("获取验证码").removeClass("disable");
            }
        },1000);
    };
