var
    app = require('./app'),
    formMod = require('../modules/form'),
    submit = $("#submit");


// 表单验证
formMod.listen("/spacecp/certify",{
    ajaxBefore: function(){
        submit.addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element;
        if(item.attr('name')=="name"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入姓名");
            }
        }
        if(item.attr('name')=="idnumber"){
            if(validResutl.valid == 'notempty'){
                _Fn.alert("请输入身份证号");
            }else if(validResutl.valid == 'number'){
                _Fn.alert("请输入正确的18位身份证号码");
            }else if(validResutl.valid == 'len'){
                _Fn.alert("请输入正确的18位身份证号码");
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
            $(".content-form").hide();
            $(".content-success").show();
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
