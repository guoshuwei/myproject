var app = require('./app'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    resultCall = require('../modules/ajaxcodecall'),
    validate = require('../modules/validate'),
    registerDom = $('.start'),
    getPhoneDom = $('.phone'),
    getImgcode=$('.changecode img'),
    regTimes = Number($("#regTimes").val()),
    curUrl = window.location.href,
    pageType = $('#pageType').val(),
    linkSuccess = $('#linkSuccess').val(),
    regtimes= $("#regtimes").val(),
    welfareUrl = null,            // 新手任务跳转链接
    toutiaoInput = $('#toutiao');

if(curUrl.indexOf('response=ruidao-tt') > -1){
    var jsCount = document.createElement('script');
    jsCount.src = '//yun.tuia.cn/h5-tuia/tuiac.js';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(jsCount, s);
}

$('body').on('touchend','.changecode img',function(){
    $(this).attr('src','/Ajax/getVcode?type=register&v'+new Date().getTime());
})
    .on("click",".huodong-item",function(){
        _Fn.track.fire(252000001);
        window.location.href = $(this).attr("data-href");
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
        if(item.attr('name')=='moblie'){
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
        }
    },
    cleanup:function(item){

    },
    success:function(result){
        var data = result.data;
        if(data.code == 200){
            if(curUrl.indexOf('response=ruidao-tt') > -1){
                if(!!window.TuiaAdverter) {
                    TuiaAdverter.init();
                }
            }
            if(data.regtimes==3){
                $("#vcode").parents("item").after(template.render("codeimgTpl"))
                return false;
            }

            if(pageType == 2){
                if(data.data.binding == 'binding'){
                    var json ={};
                    json.mobile = $('#moblie').val();
                    tyRegisteSuccessful('bindTyqTpl',json);
                }else if(data.data.binding == 'end'){
                    jbAlert('register');
                }
            }else{
                if(data.data.url){
                    welfareUrl = data.data.url;
                }
                if(data.data.binding == 'binding'){
                    var json ={};
                    json.mobile = $('#moblie').val();
                    tyRegisteSuccessful('bindTyqTpl',json);
                }else if(data.data.binding == 'end'){
                    if(linkSuccess){
                        window.location.href = linkSuccess;
                    }else if(welfareUrl){
                        window.location.href = welfareUrl;
                    }else{
                        window.location.href = "//licai.p2peye.com/help/guide2";
                    }
                }
            }
            if(toutiaoInput.length){
                _taq.push({convert_id:"84028276963", event_type:"form"});
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
            if(pageType == 2){
                jbAlert('bind');
            }else{
                if(data.data.action == 'end' || data.data.action =='verified'){
                    if(linkSuccess){
                        window.location.href = linkSuccess;
                    }else if(welfareUrl){
                        window.location.href = welfareUrl;
                    }else{
                        window.location.href="//licai.p2peye.com/help/guide2";
                    }
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
    $('.form').hide().remove();
    var content = template.render(tpl,data);
    $('#formparent').append(content);
    $('.form').show();
}
var vcoder = $('#vcode');

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
    val = val.replace(/\s+/g,'');
    if(that.hasClass('disabled')) return;
    if(!validate.api.mobile(val)){
        msgshow('请先输入正确手机号');
        return false;
    }else{
        var vcode = $.trim($('#vcode').val());
        if($('#vcode').length>0 && (vcode == '' || vcode.length != 4)){
            msgshow('请输入正确的图片验证码');
            return false;
        }else{
            getMobileCode();
        }
    }
});

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
var layer = $(".layer");
var prompt =layer.find(".text");
$('body')
    .on('input','#moblie',function(){
        $('.phonecode').removeClass('disabled');
        return false;
    })
    .on('tap','.downloadNew .close',function(){
        $(".downloadNew").remove();
        return false;
    })
    .on('tap','.layer .close, .layer .mask',function(){
        layer.hide();
        return false;
    })
    .on('tap','[role=jbregister]',function(){
        _Fn.lightboxWrap()._fadeOut()
        $('.fn-jblead').fadeOut();
        if(linkSuccess){
            window.location.href = linkSuccess;
        }else if(welfareUrl){
            window.location.href = welfareUrl;
        }else{
            window.location.href = '//m.p2peye.com/jb_app.html';
        }
    })
//关闭弹层
function msgshow(msg) {
    prompt.html(msg);
    layer.show();
}
//banner轮播
var bannerImg = $(".img .img-item");
if(bannerImg.length>1){
    var parent = $(".img .img-list");
    var parentNum = 0;
    var length = bannerImg.length;
    var width = $(document.body).width();
    var height = bannerImg.height();
    var str =  parent.html();
    var timer = null;
    parent.append(str);
    bannerImg = $(".img .img-item");
    $(window).resize(function(){
        orientChange();
    })
    orientChange();
    function orientChange(){
         width = $(window).width();
        bannerImg.width(width);
        parent.width(width*4);
        height = bannerImg.height();
        parent.height(height);
    }
    carousel(parentNum);
    function carousel(num){
        num++;
        parent.animate({"margin-left":-num*width+"px"},1000,function(){
            if(num>=length){
                num = 0;
                parent.css({"margin-left":"0px"})
            }
            timer=setTimeout(function(){carousel(num);},3000)
        });
    }
}


var winHeight = $(window).height();
$(window).resize(function(){
    var thisHeight=$(this).height();
    if(winHeight - thisHeight >50){
        $(".downloadNew").css({'position': 'absolute','bottom':'0'});
    }else{
        $(".downloadNew").css('position', 'fixed');
    }
});
function jbAlert(status){
    var content = template.render("jbleadTpl",{bind: status});
    _Fn.lightboxWrap()._fadeIn();
    $('body').append(content);

}
