var app = require('./app'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    resultCall = require('../modules/ajaxcodecall'),
    validate = require('../modules/validate'),
    registerDom = $('.start'),
    getImgcode=$('.changecode img'),
    getPhoneDom = $('.phone'),
    welfareUrl = null;             // 新手任务跳转链接

$('body').on('touchend','.changecode img',function(){
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

var vcodeError = false;

formMod.listen('/ajax/tyRegister',{
    validError:function(validResutl){
        var item  = validResutl.element;

        if(item.attr('name')=='username'){
            if(validResutl.valid == 'notempty'){
                msgshow('用户名不能为空');
            }else if(validResutl.valid == 'firstplace_cn_or_num'){
                msgshow('首位必须为中文或字母');
            }else if(validResutl.valid == 'username'){
                msgshow(validResutl.message);
            }else if(validResutl.valid =='reg_cn_len2'){
                msgshow('用户名长度为3-15个字符');
            }
        }else if(item.attr('name')=='password1'){
            if(validResutl.valid == 'notempty'){
                msgshow('密码不能为空');
            }else if(validResutl.valid == 'filter'){
                msgshow('密码由字母和数字组成');
            }else if(validResutl.valid == 'len'){
                msgshow('密码长度为6-20位');
            }
        }else if(item.attr('name')=='password2'){
            if(validResutl.valid == 'notempty'){
                msgshow('确认密码不能为空');
            }else if(validResutl.valid == 'equal'){
                msgshow('两次输入的密码不一致');
            }

        }else if(item.attr('name')=='moblie'){
            if(validResutl.valid == 'notempty'){
                msgshow('手机号不能为空');
            }else if(validResutl.valid == 'number'){
                msgshow('请输入数字');
            }else if(validResutl.valid == 'mobile'){
                msgshow('请输入正确手机号');
            }
        }else if(item.attr('name')=='mobile_code'){
            if(validResutl.valid == 'notempty'){
                msgshow('验证码不能为空');
            }else if(validResutl.valid == 'number'){
                msgshow('验证码只能是数字');
            }else if(validResutl.valid == 'len'){
                msgshow('验证码是6位数字');
            }
        }else if(item.attr('name')=='vcode'){
            if(validResutl.valid == 'notempty'){
                msgshow('图片验证码不能为空');
            }else{
                msgshow('图片验证码不正确');
            }
            vcodeError = true;
        }
    },
    cleanup:function(item){
    },
    success:function(result){
        var data = result.data;
        if(data.code == 200){
            if(data.data.url){
                welfareUrl = data.data.url;
            }
            if(data.data.binding == 'binding'){
                var json ={};
                json.mobile = $('#moblie').val();
                tyRegisteSuccessful('bindTyqTpl',json);

            }else if(data.data.binding == 'end'){
                if(welfareUrl){
                    window.location.href = welfareUrl;
                }else{
                    window.location.href="//licai.p2peye.com/help/guide3";
                }
            }
        }else{
            msgshow(data.message);
        }

    },
    error:function(){
        msgshow("系统繁忙，请稍后重试");
    }
});
formMod.listen('/user/userBinding?t=yq',{
    validError:function(validResutl){
        var item  = validResutl.element;

        if(item.attr('name')=='password'){
            if(validResutl.valid == 'notempty'){
                msgshow('密码不能为空');
            }else if(validResutl.valid == 'filter'){
                msgshow('密码由字母和数字组成');
            }else if(validResutl.valid == 'len'){
                msgshow('密码长度为6-20位');
            }
        }
    },
    cleanup:function(item){
    },
    success:function(result){
        var data = result.data;
        if(data.code == 200){
            if(data.data.action == 'end' || data.data.action =='verified'){
                if(welfareUrl){
                    window.location.href = welfareUrl;
                }else{
                    window.location.href="//licai.p2peye.com/help/guide3";
                }
            }
        }else{
            msgshow(data.message);
        }
    },
    error:function(){
        msgshow("系统繁忙，请稍后重试");
    }
});
function tyRegisteSuccessful(tpl,data){
    $('.section1-form ').hide().remove();
    var content = template.render(tpl,data);
    $('#formparent').append(content);
    $('.section1-form ').show();
}

var vcoder = $('#vcode');

function getMobileCode(){
    var that = $('.phonecode');
    var val = $('#moblie').val();
    val = val.replace(/\s+/g,'');
    that.addClass('disabled');
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
                msgshow('验证码已发送至您的手机，请查收');
            }else{
                if(res.code == 5112){
                    msgshow('验证码发频繁请稍后重试');
                    numberDown(that,res.data.time);
                }else if(res.code == 4105){
                    _Fn.alert("图片验证码错误，请重新输入");
                    that.removeClass('disabled');
                    getImgcode.touchend();
                    $("[name=vcode]").val('');
                }else{
                    msgshow(res.message);
                    that.removeClass('disabled');
                }
            }
        },
        error : function(){
            msgshow('获取验证码出错，请稍后再试!');
            that.removeClass('disabled');
        }
    })
}
$('body').on('touchend','.phonecode',function(){
    var that = $(this);
    var val = $('#moblie').val();
    var vcode = $.trim($('#vcode').val());

    val = val.replace(/\s+/g,'');

    if(that.hasClass('disabled')) return;

    if(vcode == '' || vcode.length != 4){
        msgshow('请输入正确的图片验证码');
        return false;
    }

    if(!validate.api.mobile(val)){
        msgshow('请先输入正确手机号');
        return false;
    }else{
        getMobileCode();
    }
})

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
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
/*if(isiOS){
    $("input[type=text]").on('focus',function(){
        if($(".download").css("position") != 'absolute'){
            $(".download").css({'position': 'absolute','bottom':'0'});
        }
    })
        .on('blur',function(){
            $(".download").css('position', 'fixed');
        })
    $("input[type=password]").on('focus',function(){
        if($(".download").css("position") != 'absolute'){
            $(".download").css({'position': 'absolute','bottom':'0'});
        }
    })
        .on('blur',function(){
            $(".download").css('position', 'fixed');
        })
}*/

var layer = $(".layer");
var prompt =layer.find(".text");
$('body').on('input','#moblie',function(){
    $('.phonecode').removeClass('disabled');
    return false;
})
    .on('touchend','.download .close',function(){
        $(".download").remove();
        return false;
    })
    .on('touchend','.layer .close, .layer .mask',function(){
        layer.hide();
        return false;
    });
//关闭弹层
function msgshow(msg) {
    prompt.html(msg);
    layer.show();
}
//红包规则
var redRule = $(".red-rule");
$(".red-rule-close-btn").on('touchstart',function(){
    redRule.hide();
});
$(".section4-layer").on('touchstart',function(){
    redRule.show();
})



var winHeight = $(window).height();
$(window).resize(function(){
    var thisHeight=$(this).height();
    if(winHeight - thisHeight >50){
        $(".download").css({'position': 'absolute','bottom':'0'});
    }else{
        $(".download").css('position', 'fixed');
    }
});