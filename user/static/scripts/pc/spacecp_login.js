var
app = require('./app'),
dialogUi = require('../modules/dialogUi'),
template = require('../modules/template'),
formMod = require('../modules/form'),
animate = require('../modules/animate'),
datajson=$("form.login-form").serialize(),
floatlayer = require('../modules/floatlayer');
formMod.listen('login.php',{
    ajaxBefore:function(){

    },
    validSuccess:function(validResutl){    },
    validError:function(validResutl){
        var item  = validResutl.element;
        var prompt = item.parents('[role-prompt=login]').find('[role-prompt=info]');
        var promptText = prompt.find('span');
        prompt.show();
        if(item.attr('name')=='username'){
            if(validResutl.valid == 'notempty'){
                promptText.html('用户名或手机号不能为空！');
            }
        }
        if(item.attr('name')=='password'){
            if(validResutl.valid == 'notempty'){
                promptText.html('密码长度为6-20个字符!');
            }else if(validResutl.valid == 'pwd'){
                promptText.html('密码必须至少包含数字/字母/符号中的两种!');
            }
        }

    },
    cleanup:function(item){

        $('[role-prompt=info]').hide();

    },
    success:function(result){

        var res = result.data;
        if(res.code == 200){
            window.location.href = res.data.url;
        }else{
            _Fn.alert(res.message);

        }
    },
    error:function(){
        window._Fn.alert("网络异常,请稍后刷新重试");
    }

});