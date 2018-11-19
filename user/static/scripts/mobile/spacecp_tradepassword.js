var
    app = require('./app'),
    formMod = require('../modules/form'),
    phone=$("[name=mobile]").val(),
    submit = $("#submit"),
    referer=$("#referer").val(),
    jumpUrl=referer?referer:"//licai.p2peye.com/spacecp/securitycenter",
    numberDown = function(ele,time){
        time = time ? time : 60;
        var i = 1;
        var eleHtml=ele.find("span");
        function myself(){
            eleHtml.html(time - i + '秒后重发送');
            i++;
            if(i <= time){
                setTimeout(myself,1000);
            }else{
                eleHtml.html('重新获取验证码');
                ele.removeClass('disabled');
            }
        }
        myself();
    };
$("body").on("tap",'[role-tap="code"]',function(){
	var mobileVal = $(".your-mobile").val(),
            that = $(this);
        if(that.hasClass("disabled")){
            return;
        }
        that.addClass('disabled');
        $.ajax({
            url : "/spacecp/getmobilecode",
            type : "post",
            data : {
                mobileval : phone,
                type : "tradepwd"
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
                    that.removeClass('disabled');
                }
            },
            error : function(){
                _Fn.alert("您的网络有问题，请稍后再试");
                that.removeClass('disabled');
            }
        })
})
.on('keypress','input',function(){
    return event.keyCode>=48&&event.keyCode<=57
})
.on('input','input',function(){
    var that=$(this),
        value=that.val();
        if(value.length>6){
            that.val(value.slice(0,6))
        }
 })
    // 设置交易密码
formMod.listen("/spacecp/setTradePassword",{
    ajaxBefore: function(){
        submit.addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element;
        if(item.attr('name')=="pwd"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入交易密码");
            }else if(validResutl.valid == 'number'){
            	_Fn.alert("请输入6位数字")
            }else if(validResutl.valid == 'len'){
            	_Fn.alert("请输入6位数字")
        	}
        }
        if(item.attr('name')=="repwd"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入交易密码");
            }else if(validResutl.valid == 'equal'){
                _Fn.alert("两次输入的密码不一致，请重新输入");
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        $('.error-prompt span').hide();
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
           _Fn.alert("设置成功");
           setTimeout(function(){
                window.location.href=jumpUrl;
            },4000)

        }else{
            _Fn.alert(res.message);
            submit.removeClass("disabled").val("完成");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        submit.removeClass("disabled").val("完成");
    }
});
//修改交易密码
formMod.listen("/spacecp/modifytradepasswordh5",{
    ajaxBefore: function(){
        submit.addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element;
        if(item.attr('name')=="oldpwd"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入交易密码");
            }else if(validResutl.valid == 'number'){
            	_Fn.alert("请输入6位数字")
            }else if(validResutl.valid == 'len'){
            	_Fn.alert("请输入6位数字")
        	}
        }
        if(item.attr('name')=="newpwd"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入交易密码");
            }else if(validResutl.valid == 'number'){
            	_Fn.alert("请输入6位数字")
            }else if(validResutl.valid == 'len'){
            	_Fn.alert("请输入6位数字")
        	}
        }
        if(item.attr('name')=="renewpwd"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入交易密码");
            }else if(validResutl.valid == 'equal'){
                _Fn.alert("两次输入的密码不一致，请重新输入");
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        $('.error-prompt span').hide();
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.alert("设置成功");
            setTimeout(function(){
                window.location.href=jumpUrl;
            },4000)
        }else{
            _Fn.alert(res.message);
            submit.removeClass("disabled").val("完成");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        submit.removeClass("disabled").val("完成");
    }
});
//找回交易密码
formMod.listen("/spacecp/findtradepasswordh5",{
    ajaxBefore: function(){
        submit.addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element;
        if(item.attr('name')=="mobile_code"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入手机验证码");
            }else if(validResutl.valid == 'number'){
                _Fn.alert("请输入6位数字")
            }else if(validResutl.valid == 'len'){
                _Fn.alert("请输入6位数字")
            }
        }
        if(item.attr('name')=="psword"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入交易密码");
            }else if(validResutl.valid == 'number'){
                _Fn.alert("请输入6位数字")
            }else if(validResutl.valid == 'len'){
                _Fn.alert("请输入6位数字")
            }
        }
        if(item.attr('name')=="newpsword"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入交易密码");
            }else if(validResutl.valid == 'equal'){
                _Fn.alert("两次输入的密码不一致，请重新输入");
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        $('.error-prompt span').hide();
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.alert("设置成功");
            setTimeout(function(){
                window.location.href=jumpUrl;
            },4000)
        }else{
            _Fn.alert(res.message);
            submit.removeClass("disabled").val("完成");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        submit.removeClass("disabled").val("完成");
    }
});

$("body")
    .on("click","#submit",function(){
        if($(this).hasClass("disabled")){
            return false;
        }
    });