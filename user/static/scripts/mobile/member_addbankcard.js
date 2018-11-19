var
    app = require('./app'),
    formMod = require('../modules/form');

//交易密码的验证
formMod.listen("/member/addbankcard",{
    ajaxBefore: function(){
        // submit.addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element;
        if(item.attr('name')=="card_no"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入您的银行卡号");
            }else if(validResutl.valid == 'len'){
                _Fn.alert("银行卡位数不正确，请重新输入")
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
     },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.alert("设置已完成");
            setTimeout(function(){
                window.location.href="//licai.p2peye.com/member/withdrawcash"
            },3000)
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
$("body").on("keypress",'[name="card_no"]',function(){
	if($(this).val().length>18){
		return false;
	}
	return event.keyCode>=48&&event.keyCode<=57
})