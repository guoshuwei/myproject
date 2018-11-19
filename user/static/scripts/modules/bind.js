var
dialogUi = require('../modules/dialogUi'),
template = require('../modules/template'),
$datepicer = require('../plugins/datepic'),
formMod = require('../modules/form'),
animate = require('../modules/animate'),
resultCall = require('../modules/ajaxcodecall');


function formVaildErrorHandler(validResutl){
    var 
    item  = validResutl.element,
    parent = item.parent();
    parent.addClass('onerror');
}

function formCleanHandler(item){
    var parent = item.parent();
    parent.removeClass('onerror');
}

function formModAjaxBefore(form){
    var submit = form.find('input[type=submit]');
    animate.loading().show(submit);
}

var postPhoneDialog;

dialogUi.listen('bind',function(){
    if(!_Fn.isLogin()) return;
	postPhoneDialog = this;
    this.showLightbox = true;
    // var content;
    // this.setTitle('绑定投友圈安全账户<a href="//licai.p2peye.com/investhelp" class="why" target="_blank"><em></em>为什么要绑定投友圈？</a>');
    // this.setBox(600,300);
    // var  content = template.render('bindPostphoneTpl');
    // this.setContent(content);
    // this.open();

    this.setTitle('设置天眼手机号');
    this.setBox(600,280);
    var content = template.render('bindPostphoneTpl');
    this.setContent(content);
    this.open();
})
dialogUi.listen('realname',function(mobile){
    if(!_Fn.isLogin()) return;
    postPhoneDialog = this;
    this.showLightbox = true;
    var content,data = {mobile : mobile};
    this.setTitle('绑定实名信息');
    this.setBox(600,300);

    var  content = template.render('verifiedTpl',data);
    this.setContent(content);
    this.open();
})


/* 设置天眼手机号 start */
// 设置天眼手机号 表单验证
formMod.listen("/spacecp/setTyMobile",{
    ajaxBefore: function(){
        $("#setTyMobileSubmit").addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');

        if(item.attr('name')=="mobile"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入手机号').show();
            }else if(validResutl.valid == 'mobile'){
                item_notice.html('<i></i>请输入正确的11位手机号').show();
            }
        }
        if(item.attr('name')=="mobile_code"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入验证码').show();
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        var item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');
        if(item.attr('name')=='mobile'){
            item_notice.hide();
        }
        if(item.attr('name')=='mobile_code'){
            item_notice.hide();
        }
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.message("设置成功！");
            window.location.reload();
        }else{
            _Fn.alert(res.message);
            $("#setTyMobileSubmit").removeClass("disabled").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#setTyMobileSubmit").removeClass("disabled").val("确定");
    }
});



/* 设置天眼手机号 end */



formMod.listen('/user/userBinding',{
    validError:formVaildErrorHandler,
    cleanup:formCleanHandler,
    ajaxBefore : formModAjaxBefore,
    success:function(res){
        animate.loading().hide(function(){
            res = res.data;
            if(res.code != 200)
                if(res.code==5102){
                $('.already_bind').css('display','block');
                  return;
                }else{
                resultCall(res);
            }else{
                var tpl;
                if(res.data.action == 'end'){
                    tpl = res.data.current+'endTpl';
                    postPhoneDialog.setTitle('成功提示');
                    $(".dialog_close").attr("role","closedialog");
                }else if(res.data.action == 'verified'){
                    tpl = res.data.action+'Tpl';
                    postPhoneDialog.setTitle('绑定实名信息');
                }else{
                    tpl = res.data.action+'Tpl';
                    postPhoneDialog.setTitle('绑定投友圈安全账户<a href="//licai.p2peye.com/investhelp" class="why" target="_blank"><em></em>为什么要绑定投友圈？</a>');
                }
                var content = template.render(tpl,res.data);
                postPhoneDialog.setContent(content);
                if(res.data.action == 'register'){
                    postPhoneDialog.setBox(600,340);
                }else{
                    postPhoneDialog.setBox(600,300);
                }
            }
        });
    }
})


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
            ele.removeClass('disabled');
        }
    }

    myself();

}

$('body')
    .on("click","#setTyMobileCode",function(){
        var mobileVal = $("#setTyMobileMoblie").val(),
            that = $(this);
        if(that.hasClass("disabled")){
            return;
        }
        if(!/^(13\d|18\d|15\d|17\d|14\d|19\d|16\d)\d{8}$/.test(mobileVal)){
            _Fn.alert("请输入正确的手机号");
            return;
        }
        that.addClass('disabled');
        $.ajax({
            url : "/spacecp/getmobilecode",
            type : "post",
            data : {
                mobileval : mobileVal,
                type : "settymobile"
            },
            dataType : "json",
            success : function(res){
                if(res.code == 200){
                    _Fn.message("发送成功");
                    numberDown(that,60);
                }else if(res.code == 5112){
                    _Fn.message("验证码发送频繁，请稍后再发");
                    numberDown(that,res.data.time);
                }else{
                    _Fn.alert(res.message);
                }
            },
            error : function(){
                _Fn.alert("您的网络有问题，请稍后再试");
            }
        })
    })
.on('click','.mod-bindtyq .vcode',function(){
    var that = $(this);
    if(that.hasClass('disabled')) return;
    that.addClass('disabled');
    $.ajax({
        url : '/user/userBinding',
        type : 'post',
        dataType : 'json',
        data : {type:'mobile_code'},
        success : function(res){
            if(res.code == 200){
                numberDown(that,res.data.time);
            }else{
                if(res.code == 5112){
                    numberDown(that,res.data.time);
                }else{
                    resultCall(res);
                }
            }
        }
    })
})
.on('click','.mod-bindtyq .close',function(){
    postPhoneDialog && postPhoneDialog.close();
    setTimeout(function(){
        window.location.href = window.location.href;
    },1000)
})
.on('click','[role=closedialog]',function(){
    postPhoneDialog && postPhoneDialog.close();
    setTimeout(function(){
        window.location.href = window.location.href;
    },1000)
});