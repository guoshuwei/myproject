var app = require('./app'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    resultCall = require('../modules/ajaxcodecall'),
     wxReady = require('../modules/jssdk');
    validate = require('../modules/validate'),
    registerDom = $('.start'),
    getPhoneDom = $('.phone'),
    getImgcode=$('.changecode img'),
    regTimes = Number($("#regTimes").val()),
    vcodeError = false,
    vcoder = $('#vcode'),
    layer = $(".layer"),
    prompt =layer.find(".text"),
    winHeight = $(window).height();
$('body')
    .on('tap','.phonecode',function(){
        var that = $(this);
        var val = $('#moblie').val();
        val = val.replace(/\s+/g,'');
        if(that.hasClass('disabled')) return;
            if(!validate.api.mobile(val)){
                _Fn.alert('请先输入正确手机号');
                return false;
            }else{
            var vcode = $.trim($('#vcode').val());
            if(vcode == '' || vcode.length != 4){
                _Fn.alert('请输入正确的图片验证码');
                return false;
            }else{
                getMobileCode();
            }
        }
    })
    .on('input','#moblie',function(){
        $('.phonecode').removeClass('disabled');
        return false;
    })
    .on('tap','.layer .close, .layer .mask',function(){
        layer.hide();
        return false;
    })
    .on('tap','.changecode img',function(){
        $(this).attr('src','/Ajax/getVcode?type=register&v'+new Date().getTime());
    });


$(function(){
    var str='';
    var hiddenInput = $('#formhash');
    $.ajax(
        {
            url:"/ajax/tyFormhash",
            type:"post",
            success:function(res){
                if(res.code == 200){
                    str = res.data.formhash;
                    hiddenInput.val(str);
                }
            },
            error:function(){

            }
        }
    );
});
formMod.listen('/ajax/tyRegister',{
    validError:function(validResutl){
        var item  = validResutl.element;

        if(item.attr('name')=='password1'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('密码不能为空');
            }else if(validResutl.valid == 'pwd'){
                _Fn.alert('密码为字母、数字和符号两种及以上组合');
            }else if(validResutl.valid == 'len'){
                _Fn.alert('密码长度为6-20位');
            }
        }else if(item.attr('name')=='password2'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('确认密码不能为空');
            }else if(validResutl.valid == 'equal'){
                _Fn.alert('两次输入的密码不一致');
            }

        }else if(item.attr('name')=='moblie'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('手机号不能为空');
            }else if(validResutl.valid == 'hasmobile'){
                _Fn.alert('手机号已存在，请更换其他手机号！');
            }else if(validResutl.valid == 'mobile'){
                _Fn.alert('请输入正确手机号');
            }
        }else if(item.attr('name')=='mobile_code'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('验证码不能为空');
            }else if(validResutl.valid == 'number'){
                _Fn.alert('验证码只能是数字');
            }else if(validResutl.valid == 'len'){
                _Fn.alert('验证码是6位数字');
            }
        }
    },
    cleanup:function(item){
    },
    success:function(result){
        var data = result.data;
        if(data.code == 200){
            if(data.data.binding == 'binding'){
                var json ={};
                json.mobile = $('#moblie').val();
                tyRegisteSuccessful('bindTyqTpl',json);

            }else if(data.data.binding == 'end'){
                window.location.href="//a.app.qq.com/o/simple.jsp?pkgname=com.p2peye.remember";

            }
        }else{
            _Fn.alert(data.message);
        }

    },
    error:function(){
        _Fn.alert("系统繁忙，请稍后重试");
    }
});
formMod.listen('/user/userBinding?t=yq',{
    validError:function(validResutl){
        var item  = validResutl.element;

        if(item.attr('name')=='password'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('密码不能为空');
            }else if(validResutl.valid == 'filter'){
                _Fn.alert('密码由字母和数字组成');
            }else if(validResutl.valid == 'len'){
                _Fn.alert('密码长度为6-20位');
            }
        }
    },
    cleanup:function(item){
    },
    success:function(result){
        var data = result.data;
        if(data.code == 200){
            if(data.data.action == 'end' || data.data.action =='verified'){
                window.location.href="//a.app.qq.com/o/simple.jsp?pkgname=com.p2peye.remember";
            }
        }else{
            _Fn.alert(data.message);
        }
    },
    error:function(){
        _Fn.alert("系统繁忙，请稍后重试");
    }
});
function tyRegisteSuccessful(tpl,data){
    $('.form').hide().remove();
    var content = template.render(tpl,data);
    $('#formparent').html(content);
    $('.form').show();
}
function getMobileCode(){
    var that = $('.phonecode');
    var val = $('#moblie').val();
    val = val.replace(/\s+/g,'');
    that.addClass('disabled');
    regTimes += 1;
    $.ajax({
        url : '/ajax/getMobilecode',
        type : 'post',
        dataType : 'json',
        data : {
            type :'register',
            mobile : val,
            code : vcoder.val()
        },
        success : function(res){
            if(res.code == 200){
                numberDown(that,res.data.time);
                _Fn.alert('验证码已发送至您的手机，请查收');
            }else{
                if(res.code == 5112){
                    _Fn.alert('验证码发频繁请稍后重试');
                    numberDown(that,res.data.time);
                }else if(res.code == 4105){
                    _Fn.alert("图片验证码错误，请重新输入");
                    that.removeClass('disabled');
                    $('.changecode img').tap();
                    $("[name=vcode]").val('');
                }else{
                    _Fn.alert(res.message);
                    that.removeClass('disabled');
                }
            }
        },
        error : function(){
            _Fn.alert('获取验证码出错，请稍后再试!');
            that.removeClass('disabled');
        }
    })
}
function numberDown(ele,time){
    time = time ? time : 60;
    var i = 1;
    function myself(){
        ele.html(time - i + '秒后重新发送');
        i++;
        if(i <= time){
            setTimeout(myself,1000);
        }else{
            ele.html('重新发送验证码');
            ele.removeClass('disabled');
        }
    }

    myself();

}