var template = require('../modules/template'),
    resultCall = require('../modules/ajaxcodecall'),
    getImgcode=$('#changecode1'),
    regTimes = Number($("#regTimes").val());
$("body").on('click','[role-api=registerlayer]',function(){
    var content = template.render("formlayerTpl");
    $("body").append(content);
    inputAction();
    getImgcode=$('#changecode1');
    $(".mod-fromlayer").attr({"locationhref":$(this).attr("role-url")});
    $(".mod-fromlayer input.phonecode").click(function(){
        if($.trim($(".mod-fromlayer").find("input[name = code]").val()).length<4){
            _Fn.alert('验证码不能为空或长度不够');
        }else{
            getMobileCode(".mod-fromlayer");
        }
    });
    setTimeout(function(){$('body').on('click','#changecode1',function(){
        $(this).attr('src','/Ajax/getVcode?type=register&v'+new Date().getTime());
    });},1000)
    $(".mod-fromlayer").find("input[name=username]").focus();
    layerClose($(".mod-fromlayer").attr("locationhref"));
    $(".mod-fromlayer").find("input[name=username]").focus();
})
function layerClose(url){
    var url = url?url:"//licai.p2peye.com/";
    $(".mod-fromlayer-close").click('click',function(){
        var flayerold = document.getElementById("flayerold");
        if(flayerold){
            _Fn.alert("已成功注册天眼，未绑定手机，即将跳转到标的详情页....!");
            setTimeout(function(){window.location.href =  url;},1000);
        }else{
            $(".mod-fromlayer").remove();
        }
    })
}
function setHolder(el, type) {

    var placeholderTXT = $(el).attr('placeholder');

    if (!type && $(el).val() == '') {

        $(el).parents('dd').append('<span class="placeholder">' + placeholderTXT + '</span>')


    }

    if (type == 1 && $(el).val() == '') {
        $(el).parents('.box').find('.placeholder').show();
    } else if (type == 2) {
        $(el).parents('.box').find('.placeholder').hide();
    }

}
function inputAction(){
    var inputFocus= $(".mod-fromlayer .bd .text");
    if($.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0' || $.browser.version == '8.0' || $.browser.version == '9.0')){
        $('body').on('blur','[placeholder]',function(){
            setHolder(this,1);
        })
        $('body').on('focus','[placeholder]',function(){
            setHolder(this,2);
        })
        $('[placeholder]').each(function(){
            setHolder(this,1);
        });
        $('body').on('click','.placeholder',function(){
            $(this).hide();
            $(this).parents('.box').find('input').focus();
        })

    }
    inputFocus
        .on('focus',function(){
            $(this).parents(".box").addClass("boxfocus");
        })
        .on('blur',function(){
            $(this).parents(".box").removeClass("boxfocus");
        });
    $(".phonecode")
        .on('mouseenter',function(){
            $(this).addClass("phonecode-color");
        })
        .on('mouseleave',function(){
            $(this).removeClass("phonecode-color");
        });
    $(".submit")
        .on('mouseenter',function(){
            $(this).addClass("submit-color");
        })
        .on('mouseleave',function(){
            $(this).removeClass("submit-color");
        });
}
function getMobileCode(parent){
    var that = $(parent).find('.phonecode');
    if(that.hasClass('disabled')) return;
    var _picode = $.trim($(parent).find('input[name=code]').val());
    var val = $(parent).find('input[name=moblie]').val().replace(/\s+/g,'');
    if($.trim($(parent).find("input[name = password1]").val()).length <6){
        _Fn.alert('请先输入合适的密码');
        return;
    }else if(!/^(13\d|18\d|15\d|17\d|14\d|19\d|16\d)\d{8}$/.test(val)){
        _Fn.alert('请先输入正确手机号');
        return false;
    }else {
        regTimes += 1;
        $("#regTimes").val(regTimes);
        $.ajax({
            url : '/ajax/getMobilecode',
            type : 'post',
            dataType : 'json',
            data : {
                type :'register',
                mobile : val,
                code : _picode
            },
            success : function(res){
                if(res.code == 200){
                    that.addClass('disabled');
                    numberDown(that,res.data.time);
                    _Fn.alert('验证码已发送至您的手机，请查收');
                }else{
                    if(res.code == 5112){
                        that.addClass('disabled');
                        numberDown(that,res.data.time);
                        _Fn.alert('验证码发频繁请稍后重试');
                    }else if(res.code == 4105){
                        //resultCall(res);
                        _Fn.alert("图片验证码错误，请重新输入");
                        getImgcode.click();
                        $(".mod-fromlayer input[name=code]").val('');
                        that.removeClass('disabled');
                    }else {
                        resultCall(res);
                        $(parent).find('input[name=code]').val('');
                        that.removeClass('disabled');
                    }
                }
            },
            error:function(){
                _Fn.alert('系统繁忙，请稍后重试');
            }
        })
    }

}
function numberDown(ele,time){
    time = time ? time : 60;
    var i = 1;
    function myself(){
        ele.val(time - i + '秒后重新发送');
        i++;
        if(i <= time){
            setTimeout(myself,1000);
        }else{
            ele.val('重新发送验证码');
            ele.removeClass('disabled changecolor');
        }
    }
    myself();
}
exports.layerOld = function layerOld(phone){
    var flayerold = template.render("flayeroldphoneTpl",{mobile:phone});
    $(".mod-fromlayer .from-wrap").html(flayerold);
    //inputAction();
};
exports.flayersuccess = function flayersuccess(url){
    var url = url?url:"//licai.p2peye.com/";
    var successlayer = template.render("successlayerTpl");
    $(".mod-fromlayer .mod-fromlayer-main-right-wrap").html(successlayer);
    var timeParent = $(".success-time-main");
    var time = timeParent.html();
    var timer;
    successtime(time);
    function successtime(num){
        timer = setTimeout(function(){
            num -- ;
            if(num>0){
                timeParent.html(num);
                successtime(num);
            }else {
                timeParent.html(num);
                window.location.href = url;
            }
        },1000);
    }
};