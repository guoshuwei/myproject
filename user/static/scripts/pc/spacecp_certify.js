var
    app = require('./app'),
    formMod = require('../modules/form'),
    submit = $("#submit");



// 表单验证
formMod.listen("certify.php",{
    ajaxBefore: function(){
        submit.addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_notice = item.parents('.form-list-item').find('.error-prompt span');
        if(item.attr('name')=="name"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入姓名').show();
            }
        }
        if(item.attr('name')=="idnumber"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入身份证号').show();
            }else if(validResutl.valid == 'number'){
                item_notice.html('<i></i>请输入正确的18位身份证号码').show();
            }else if(validResutl.valid == 'len'){
                item_notice.html('<i></i>请输入正确的18位身份证号码').show();
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
            window.location.href = res.data.url;
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
