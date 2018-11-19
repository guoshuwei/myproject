var
    app = require('./app'),
    ruleEle=$("[role-ele=rule]"),
    addbankEle=$("[role-ele=addbank]"),
    password1Ele=$("[role-ele=password1]"),
    withdrawCrashEle=$("[role-ele=crash]"),
    crashshowEle=$("[role-ele=crashshow]"),
    totleCrash=parseFloat($("[role-tap=totle]").data("crash")),
    formMod = require('../modules/form'),
    password2Ele=$('[role-ele=password2]'),
    carddefailEle=$("[role-tap=bank]").find('.withdraw-add'),
    cardiconEle=$("[role-ele=cardicon]"),
    getcodeEle=$('[role-tap="getcode"]'),
    dianOff=false,//金额中的小数点未出现
    pwdEle=$("[name=pwd]"),
    inputEle=$("input"),
    drawcodeEle=$("[name=drawcode]"),
    phone=$(".password-main-phone").find("span").html(),
    drawCode,drawPass,drawMoney,cardId=$("[role-tap=bank]").data("cardid"),
     numberDown = function(ele,time){
        time = time ? time : 60;
        var i = 1;
        function myself(){
            ele.html(time - i + '秒');
            i++;
            if(i <= time){
                setTimeout(myself,1000);
            }else{
                ele.html('重新获取验证码').removeClass('disabled');
            }
        }
        myself();
    };
$("body")
.on('tap','[role-tap=parentlayer]',function(){
     inputEle.blur();
	$(this).hide();
     drawcodeEle.val(" ");
	return false;
})
.on('tap','[role-tap=close]',function(){
     inputEle.blur();
    drawcodeEle.val(" ");
	$(this).parents("[role-tap=parentlayer]").hide();
	return false;
})
.on('tap','[role-ele="layermain"]',function(event){
	event.stopPropagation();
})
.on('tap','[role-tap=parentlayer] a[href]',function(){
	window.location.href=$(this).attr('href');
})
.on('tap','[role-tap="getcode"]',function(){
	var   that = $(this);
        if(that.hasClass("disabled")){
            return;
        }
        that.addClass('disabled');
        $.ajax({
            url : "/ajax/getTYCode",
            type : "post",
            data : {
                mobile : phone,
                type : "withdraw"
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
.on('tap','[role-tap="totle"]',function(){
    if(totleCrash>5000){
        withdrawCrashEle.val(5000);
        drawMoney=5000;
    }else{
        withdrawCrashEle.val(totleCrash);
        drawMoney=totleCrash;
    }
	return false;
})
.on('tap','[role-tap=next]',function(){
	var rmb=withdrawCrashEle.val();
    if(!cardId){
        _Fn.alert("请添加银行卡");
        return false;
    }else if(rmb<=1){
		_Fn.alert("提现的金额不得少于1元");
		return false;
	}else if(rmb>totleCrash){
		_Fn.alert("您输入的金额大于提现的总额");
		return false;
	}
	password1Ele.show();
    crashshowEle.html(rmb);
    withdrawCrashEle.blur();
    pwdEle.focus();
	return false;
})
.on('tap','[role-tap="bank"]',function(){
	addbankEle.show();
	return false;
})
.on('tap','[role-tap="seclectbankcard"]',function(){
	var that=$(this),
        child=that.find("[role-ele=cardicon]");
	if(child.hasClass("addvank-item-select")){
         $(this).parents("[role-tap=parentlayer]").hide();
         return false;;
    }
	cardiconEle.removeClass("addvank-item-select");
	child.addClass("addvank-item-select");
    carddefailEle.html(that.find(".addvank-item-text").html());
    cardId=that.data("cardid")
    $(this).parents("[role-tap=parentlayer]").hide();
    return false;
})
.on('tap','[role-tap=rule]',function(){
    inputEle.blur();
	ruleEle.show();
	return false;
})
.on('keypress','[role-tap=number6]',function(event){
    return event.keyCode>=48&&event.keyCode<=57
})
.on('keypress','[role-ele=crash]',function(event){
    if($(this).val().length==0&&event.keyCode==46){
        return false;
    }
    if(dianOff){
        return event.keyCode>=48&&event.keyCode<=57;
    }else{
        if(event.keyCode==46){
            dianOff=true;
        }
        return event.keyCode==46||event.keyCode>=48&&event.keyCode<=57
    }
})
.on('input','[role-tap=number6]',function(){
    var that=$(this),
        value=that.val();
        if(value.length>6){
            that.val(value.slice(0,6))
        }
 })
.on('input','[role-ele=crash]',function(event){
    var that = $(this),
        max = totleCrash,
        arr=[],
        thatVal = that.val();
    if(max=="0"){
        that.val("0");
        return false;
    }
    if(thatVal.length==0){
        dianOff=false;
    }
    if(/^\d+((\.{1}\d+)|\d?)$/.test(thatVal)){
        // 强制最多输入两位小数
        if(!/^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/.test(thatVal)){
            that.val(thatVal.slice(0,thatVal.indexOf('.') + 3));
        }
        // 强制限制最大值
        if(thatVal>5000&&max>5000){
            that.val(5000);
        }else if(Number(thatVal) > max){
            that.val(max);
        }
    }
    drawMoney=that.val();
})
.on('tap','[role-tap="ajaxdraw"]',function(){
    drawCode=drawcodeEle.val();
    if(drawCode.length<6){
        _Fn.alert("请输入6位数字的验证码");
        return false;
    }else if(!drawMoney){
        _Fn.alert("请输入交易金额");
        password2Ele.hide();
        return false;
    }else if(!cardId){
        _Fn.alert("请添加银行卡");
        password2Ele.hide();
        return false;
    }else if(!drawPass){
        _Fn.alert("请输入交易密码");
        password2Ele.hide();
        return false;
    }
    $.ajax({
            url : "/member/ajaxdraw",
            type : "post",
            data : {
                "draw_money":drawMoney,
                "card_id":cardId,
                draw_code:drawCode,
                draw_pass:drawPass,
                mobile:phone
            },
            dataType : "json",
            success : function(res){
                if(res.code == 200){
                    password2Ele.hide();
                    withdrawCrashEle.val("");
                     window.location.href="//licai.p2peye.com/member/withdrawFinished "
                }else{
                    _Fn.alert(res.message);
                    that.removeClass('disabled');
                }
            },
            error : function(){
                _Fn.alert("您的网络有问题，请稍后再试");
            }
        })
    //         "draw_money" : drawMoney,//提现金额
    //         "card_id"  : cardId,//银行卡id
    //         "draw_code":drawCode,//手机验证码
    //         "draw_pass" :drawPass,//交易密码
    //         "mobile":phone//手机号
})
//交易密码的验证
formMod.listen("/spacecp/checkTradPassword",{
    ajaxBefore: function(){
        // submit.addClass("disabled").val("提交中 ... ");
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
    },
    //操作中清除提示
    cleanup:function(item){
     },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            password1Ele.hide();
            password2Ele.show();
            drawPass=pwdEle.val();
            pwdEle.val("");
            drawcodeEle.val("");
            getcodeEle.tap();
        }else{
            _Fn.alert(res.message);
            // submit.removeClass("disabled").val("完成");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        // submit.removeClass("disabled").val("完成");
    }
});
