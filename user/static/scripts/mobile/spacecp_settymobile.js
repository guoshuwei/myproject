var app = require('./app'),
    formMod = require('../modules/form'),
    validate = require('../modules/validate'),
    referer = $("#referer").val();


// 倒计时
var numberDown = function(ele,time){
    time = time ? time : 60;
    var i = 1;
    function myself(){
        ele.html(time - i + '秒后重发');
        i++;
        if(i <= time){
            setTimeout(myself,1000);
        }else{
            ele.html('重新获取验证码').removeClass('disable');
        }
    }
    myself();
};

$("body")
    .on("click","#formSubmit",function(){
        if($(this).hasClass("disable")){
            return false;
        }
    })
    // 发送手机验证码
    .on("tap","#getCode",function(){
        var mobileVal = $("#phoneNumber").val(),
            that = $(this);
        if(that.hasClass("disable")){
            return;
        }
        if(!validate.api.mobile(mobileVal)){
            _Fn.alert("请输入正确的手机号");
            return;
        }
        that.addClass('disable');
        $.ajax({
            url : "/spacecp/getmobilecode",
            type : "post",
            data : {
                mobileval : mobileVal,
                type : "settymobile"
            },
            dataType : "json",
            success : function(res){
                if(res.code == 200){
                    _Fn.alert("发送成功");
                    numberDown(that,60);
                }else if(res.code == 5112){
                    _Fn.alert("验证码发送频繁，请稍后再发");
                    numberDown(that,res.data.time);
                }else{
                    _Fn.alert(res.message);
                }
            },
            error : function(){
                _Fn.alert("您的网络有问题，请稍后再试");
            }
        })
    });


// 设置天眼手机号 表单验证
formMod.listen("/spacecp/setTyMobile",{
    ajaxBefore: function(){
        $("#formSubmit").addClass("disable").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        console.log(1111);
        var item  = validResutl.element;
        if(item.attr('name')=="mobile"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('请输入手机号');
            }else if(validResutl.valid == 'mobile'){
                _Fn.alert('请输入正确的11位手机号');
            }
        }
        if(item.attr('name')=="mobile_code"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('请输入验证码');
            }
        }
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.alert("设置成功！");
            window.location.href = referer;
        }else{
            _Fn.alert(res.message);
            $("#formSubmit").removeClass("disable").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#formSubmit").removeClass("disable").val("确定");
    }
});


















/*





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
    .on("touchend",".image-code-box-btn",function(){                   /!* 提交验证码 *!/
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
*/
