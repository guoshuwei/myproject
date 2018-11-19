var app = require('./app'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    resultCall = require('../modules/ajaxcodecall'),
    validate = require('../modules/validate'),
    registerDom = $('.start'),
    getPhoneDom = $('.phone'),
    proportion=0,
    window_width=$(window).width(),
    window_height=$(window).height(),
    sectionFirst= $('.box-first'),
    sectionSecond= $('.box-second'),
    sectionForm= $('.box-form');

proportion=window_width/window_height;

if(proportion>1){
    windowStyle=2;
}else{
    windowStyle=1;
}

function hengshuping(event){
    if(window.orientation==0||window.orientation==180){
        //竖屏 return false;  
        windowStyle=1;
    }else if(window.orientation==-90||window.orientation==90){ 
        //横屏return false;  
        windowStyle=2;
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

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
    ajaxBefore:function(item){
        disabledFn();
    },
    success:function(result){
        var data = result.data;
        if(data.code == 200){
            
            if(data.data.binding == 'binding'){
                var json ={};
                json.mobile = $('#moblie').val();
                tyRegisteSuccessful('bindTyqTpl',json);

            }else if(data.data.binding == 'end'){
                signRedBag(); 
            }
            
        }else{
            msgshow(data.message);
        }

    },
    error:function(){
        msgshow("系统繁忙，请稍后重试");
    }
});

function disabledFn(){
    var input = $('.submit input');
    input.attr({'disabled':'disabled'});
    input.val('红包领取中，请稍等~~');
}
function removeDisabledFn(){
    var input = $('.submit input');
    input.removeAttr('disabled');
    input.val('领取红包');
}
function signRedBag(){
    $.ajax({
        url: '/redland/setSignin',
        type:'get',
        dataType:'json',
        data: {
            PromoteRed : 1
        },
        async:true,
        success:function(result){
            var data = result.data;
            if(result.code == 200){
                var money = data.price_count;
                maskLayer();
                RedbagDialog(money);
            }else{
                msgshow(result.message);
                removeDisabledFn();
            }
            removeDisabledFn();
        },
        error: function(){
            msgshow("系统繁忙，请稍后重试");
            removeDisabledFn();
        }
    });
}

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
                signRedBag(); 
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
    $('.local-reg').hide();
    var content = template.render(tpl,data);
    $('#formparent').append(content);
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
                }else{
                    msgshow(res.message);
                    that.removeClass('disabled');
                }
                $('#moblie').val('');
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

var layer = $(".layer");
var prompt =layer.find(".text");
$('body')
.on('input','#moblie',function(){
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
})
.on('touchend','.box-second-get-redbag',function(event){
    event.stopPropagation();
    sectionFirst.hide();
    sectionSecond.hide();
    sectionForm.show();
    return false;
})
.on('touchend','.popup-redbag-close-btn',function(){
    $('#lightbox_wrap').hide();
    $('.popup-redbag').hide();
})
.on('touchend','.box-first-todown-icon',function(event){
    event.stopPropagation();
    var height = $('.box-first').outerHeight();
    
    $('body,html').animate({
        scrollTop : height
    }, 500);
    
    return false;
});
//关闭弹层
function msgshow(msg) {
    prompt.html(msg);
    layer.show();
}

function maskLayer(){ //设置遮罩层并显示
    var lightbox=$('#lightbox_wrap');
    var w=$('body').outerWidth();
    var screenHeight=$(window).height();
    var bodyHeight=$('body').outerHeight();
    var h=Math.max(screenHeight,bodyHeight);
    
    if(!$('#lightbox_wrap').length){
        var lightbox=$('<div id="lightbox_wrap"></div>');
        lightbox.css({
            'width':$('body').outerWidth(),
            'height':h
        }).appendTo($('body')).show().attr({'open':'yes'});
    }else{
        lightbox.show().attr({'open':'yes'});
    }
}
function RedbagDialog(str){ //设置弹层宽高并显示
    var popupRedbag=$('.popup-redbag');
    var moneyEle=popupRedbag.find('.money');
    moneyEle.html(str);
    
    var dialogHeight=popupRedbag.outerHeight();
    var dialogWidth=popupRedbag.outerWidth();
    var screenHeight=$(window).height();
    var t=0;

    
    if(windowStyle == 1 || windowStyle === null){
        if(dialogHeight<screenHeight){
            t=(screenHeight-dialogHeight)/2;
        }
    }else{
        t=50;
    }
    
    if($(document).scrollTop()){
        t=$(document).scrollTop()+t;
    }

    popupRedbag.css({
        position: 'absolute',
        left    : '50%',
        top     : t,
        zIndex : '1000',
        marginLeft : -dialogWidth/2
    });
    popupRedbag.show();
}








