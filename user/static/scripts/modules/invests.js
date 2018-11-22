var
dialogUi = require('../modules/dialogUi'),
template = require('../modules/template'),
$datepicer = require('../plugins/datepic'),
formMod = require('../modules/form'),
resultCall = require('../modules/ajaxcodecall'),
animate = require('../modules/animate'),
autocomplete = require('../plugins/autocomplete');

var
    addCompanyDialog,
    addInvestDialog,
    handleInvestDialog,
    aheadRepayDialog,
    updateInvestDialog,
    badcurrentDialog,
    addcurrentDialog,
    infoInvestDialog,
    validateCach,
    stocktradingDialog,
    spacpceMobileSetDialog,
    spacpceMobileChangeDialog,
    setTradePasswordDialog,
    inputTradePasswordDialog;

//联动等额本息投资记录
function selectRate(val, repay_day){
    var 
    timerParentDom = $('#periodParent');
    timerParentInput = $('.input',timerParentDom);
    if(val==1){
        $('#radio-day').hide();
        $('#radio-month').show().find('input').trigger('click');           
    }else{
        $('#needInp').attr("data-valid","notempty|floatNumber");
        if(val == 3){
            $('#needInp').removeAttr("data-valid");
            $('#radio-month').show().find('input').trigger('click');
            $('#radio-day').show();
        }else if(val == 2){
            //$('#radio-day').show().find('input').trigger('click');
            //$('#radio-month').hide();
            $('#radio-day').hide();
            $('#radio-month').show().find('input').trigger('click');
        }else{
            $('#radio-month').show().find('input').trigger('click');
            $('#radio-day').hide();
        }
        
    }

    // 展示或隐藏 投资期限 或 截止日期
    if (val==2 && repay_day>0) {
        $('#dl_period').hide();
        $('#dl_end_date').show();
        
        timerParentInput.attr('data-valid-temp',timerParentInput.attr('data-valid'))
        timerParentInput.removeAttr("data-valid");

        $('#repay_day').val(repay_day);
    } else {
        $('#dl_end_date').hide();
        $('#dl_period').show();
        timerParentInput.attr("data-valid",timerParentInput.attr('data-valid-temp'));
        $('#repay_day').val('');
    }
}

// 设置天眼手机号
dialogUi.listen('spacpceMobileSet',function(){
    this.showLightbox = true;
    this.setTitle('设置天眼手机号');
    this.setBox(600,280);
    var content = template.render('spacpceMobileSetTpl');
    this.setContent(content);
    spacpceMobileSetDialog = this;
    this.open();
});
// 修改天眼手机号
dialogUi.listen('spacpceMobileChange',function(){
    this.showLightbox = true;
    this.setTitle('修改手机号123');
    this.setBox(600,280);
    var content = template.render('spacpceMobileChangeTpl');
    this.setContent(content);
    spacpceMobileChangeDialog = this;
    this.open();
});
// 设置交易密码
dialogUi.listen('setTradePassword',function(templateSign){
    // templateSign 是页面标识，因为在不同页面 设置交易密的后续操作不一样，所以要区分
    var data = {};
    data.templateSign = templateSign;
    this.showLightbox = true;
    this.setTitle('设置交易密码<span class="title-small" style="font-size: 12px;margin-left: 10px;">提示：您还未设置交易密码，请先设置交易密码再进行后续操作！</span>');
    this.setBox(600,280);
    var content = template.render('setTradePasswordTpl',data);
    this.setContent(content);
    setTradePasswordDialog = this;
    this.open();
});
// 输入交易密码 开关
dialogUi.listen('inputTradePassword',function(){
    this.showLightbox = true;
    this.setTitle('请输入您的交易密码');
    this.setBox(600,245);
    var content = template.render('inputTradePasswordTpl');
    this.setContent(content);
    inputTradePasswordDialog = this;
    this.open();
});
// 实名认证
dialogUi.listen('certify',function(jumpway){
    var data = {};
    data.jumpway = jumpway.length ? jumpway : "";
    this.showLightbox = true;
    this.setTitle('实名认证');
    this.setBox(600,280);
    var content = template.render('certifyTpl',data);
    this.setContent(content);
    setTradePasswordDialog = this;
    this.open();
});


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

formMod.listen('/member/getCompany',{
    ajaxBefore : formModAjaxBefore,
    success : function(res){
        animate.loading().hide(function(){
            res = res.data;
            if(res.code == 200){
                var tplcontent = template.render('addInvestTpl',{
                    pid:res.data.id,
                    iid:0,
                    typid:res.data.typid,
                    repay_day : res.data.repay_day
                });
                addCompanyDialog.setTitle('添加投资记录-'+res.data.name);
                addCompanyDialog.setBox(700,206);
                addCompanyDialog.setPos('absolute');
                addCompanyDialog.setContent(tplcontent);
                addCompanyDialog.open();
            }else{
                resultCall(res);
            }
        });
    }
});

formMod.listen('/member/add',{
    validError:formVaildErrorHandler,
    ajaxBefore : formModAjaxBefore,
    cleanup:formCleanHandler,
    success:function(res){
        var that = this;
        animate.loading().hide(function(){
            res = res.data;
            if(res.code != 200){
                resultCall(res);
            }else{
                addInvestDialog &&　addInvestDialog.close();
                addCompanyDialog && addCompanyDialog.close();
                updateInvestDialog && updateInvestDialog.close();
                if($(that).hasClass('updateInvest')){
                    _Fn.message('编辑成功!');
                }else{
                    _Fn.message('记账添加成功!');
                }
                
                setTimeout(function(){
                    window.location.href = window.location.href;
                },2000)
            }
        })
    }
});
formMod.listen('/member/opLoan',{
    validError:formVaildErrorHandler,
    ajaxBefore : formModAjaxBefore,
    cleanup:formCleanHandler,
    success:function(res){
        animate.loading().hide(function(){
            res = res.data;
            if(res.code != 200){
                resultCall(res);
            }else{
                handleInvestDialog && handleInvestDialog.close();
                if($(".assetsp2ploan-float").length){
                    // 有弹窗的dom,需要更新弹窗。
                    var id = $(".assetsp2ploan-float").data("id");
                    // 更新回款详情的弹窗 函数在 /static/scripts/modules/assetsp2ploan.js
                    printInfo(id);
                }else{
                    setTimeout(function(){
                        if(window.location.href.indexOf("?") >= 0){
                            // 说明url中有参数
                            if(window.location.href.indexOf("?comment") >= 0){
                                window.location.href = window.location.href.split("?comment")[0] + "?comment=1&typid=" + res.data.typid;
                            }else{
                                window.location.href = window.location.href.split("&comment")[0] + "&comment=1&typid=" + res.data.typid;
                            }
                        }else{
                            // 说明url中没有参数
                            window.location.href = window.location.href.split("?")[0] + "?comment=1&typid=" + res.data.typid;
                        }
                    },100)
                }
            }
        });
    }
});


//追加和赎回
formMod.listen('/member/addAliveRecord',{
    //验证错误
    validError:formVaildErrorHandler,
    ajaxBefore : formModAjaxBefore,
    //操作中清除提示
    cleanup:formCleanHandler,
    success:function(res){
        animate.loading().hide(function(){
            res = res.data;
            if(res.code != 200){
                resultCall(res);
            }else{
                addcurrentDialog && addcurrentDialog.close();
                setTimeout(function(){
                    window.location.href = window.location.href;
                },2000)
            }
        });
    }
});

//坏账
formMod.listen('/member/updateAlive',{
    //验证错误
    validError:formVaildErrorHandler,
    ajaxBefore : formModAjaxBefore,
    //操作中清除提示
    cleanup:formCleanHandler,
    success:function(res){
        animate.loading().hide(function(){
            res = res.data;
            if(res.code != 200){
                resultCall(res);
            }else{
                badcurrentDialog && badcurrentDialog.close();
                setTimeout(function(){
                    window.location.href = window.location.href;
                },2000)
            }
        });
    }
});


//坏账
formMod.listen('/member/opAheadLoan',{
    //验证错误
    validError:formVaildErrorHandler,
    ajaxBefore : formModAjaxBefore,
    //操作中清除提示
    cleanup:formCleanHandler,
    success:function(res){
        animate.loading().hide(function(){
            res = res.data;
            if(res.code != 200){
                resultCall(res);
            }else{
                aheadRepayDialog && aheadRepayDialog.close();
                setTimeout(function(){
                    window.location.href = window.location.href;
                },2000)
            }
        });
    }
});



// 股票 买入卖出
formMod.listen("/member/stockBuyOrSell",{
    ajaxBefore: function(){
        //animate.loading().show(stockSubmit);
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_span = $('.popup-error-tips span');
            var type = $("#stockAction").val() == 1;
        if(item.attr('name')=="invest[cost]"){
            if(validResutl.valid == 'notempty'){
                item_span.html(type ? '成本价不能为空1234567！' : '卖出单价不能为空！').show();
            }else if(validResutl.valid == 'floatNumber'){
                item_span.html(type ? '成本价中请输入数字！' : '卖出单价中请输入数字！').show();
            }
        }
        if(item.attr('name')=="invest[nums]"){
            if(validResutl.valid == 'notempty'){
                item_span.html(type ? '买入数量不能为空！' : '卖出数量不能为空！').show();
            }else if(validResutl.valid == 'floatNumber'){
                item_span.html(type ? '买入数量中请输入数字！' : '卖出数量中请输入数字！').show();
            }
        }
        if(item.attr('name')=="invest[trade_date]"){
            if(validResutl.valid == 'notempty'){
                item_span.html(type ? '买入日期不能为空！' : '卖出日期不能为空！').show();
            }
        }
        if(item.attr('name')=="invest[trade_date]"){
            if(validResutl.valid == 'notempty'){
                item_span.html(type ? '买入日期不能为空！' : '卖出日期不能为空！').show();
            }
        }

    },
    //操作中清除提示
    cleanup:function(item){
        $('.popup-error-tips span').hide();
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            window.location.reload();
        }else{
            _Fn.alert(res.message);
        }
    },
    error:function(){
        //animate.loading().hide();
        //stockSubmit.removeClass("disabled").val("提交");
    }
});




// 批量处理
formMod.listen("/member/assetsp2pProcess/?ajax=1&aType=batchProcess",{
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            window.location.reload();
        }else{
            _Fn.alert(res.message);
        }
    },
    error:function(){
        _Fn.alert("您的网络有问题，请检查网络后重试");
    }
});





// 修改天眼手机号 发送验证码
var numberDown = function(ele,time){
    time = time ? time : 60;
    var i = 1;
    function myself(){
        ele.html(time - i + '秒后重发');
        i++;
        if(i <= time){
            setTimeout(myself,1000);
        }else{
            ele.html('重新获取验证码').removeClass('disabled');
        }
    }
    myself();
};
$("body")
    .on("click","#spacpceMobileSetCode",function(){
        var mobileVal = $("#spacpceMobileSetMoblie").val(),
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
            url : "ajax.php",
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
    .on("click","#spacpceMobileCode1",function(){
        var mobileVal = $("#spacpceMobileChangeStep1Moblie").val(),
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
            url : "ajax.php",
            type : "post",
            data : {
                mobileval : mobileVal,
                type : "modify_mobile_code"
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
    .on("click","#spacpceMobileCode2",function(){
        var mobileVal = $("#spacpceMobileChangeStep2Moblie").val(),
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
                type : "modifytymobile"
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
    });




// 设置天眼手机号 表单验证
formMod.listen("/spacecp/setTyMobile",{
    ajaxBefore: function(){
        $("#spacpceMobileSetSubmit").addClass("disabled").val("提交中 ... ");
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
            $("#spacpceMobileSetSubmit").removeClass("disabled").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#spacpceMobileSetSubmit").removeClass("disabled").val("确定");
    }
});


// 修改天眼手机号第一步 表单验证
formMod.listen("/spacecp/modifytymobile?step=1",{
    ajaxBefore: function(){
        $("#spacpceMobileChangeStep1Submit").addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');
        if(item.attr('name')=="mobile_code"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入验证码').show();
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        var item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');
        if(item.attr('name')=='mobile_code'){
            item_notice.hide();
        }
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            $("#spacpceMobileChangeStep1").hide();
            $("#spacpceMobileChangeStep2").show();
        }else{
            _Fn.alert(res.message);
            $("#spacpceMobileChangeStep1Submit").removeClass("disabled").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#spacpceMobileChangeStep1Submit").removeClass("disabled").val("确定");
    }
});




// 修改天眼手机号第二步 表单验证
formMod.listen("/spacecp/modifytymobile?step=2",{
    ajaxBefore: function(){
        $("#spacpceMobileChangeStep2Submit").addClass("disabled").val("提交中 ... ");
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
            _Fn.message("修改成功！");
            window.location.reload();
        }else{
            _Fn.alert(res.message);
            $("#spacpceMobileChangeStep2Submit").removeClass("disabled").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#spacpceMobileChangeStep2Submit").removeClass("disabled").val("确定");
    }
});


// 设置交易密码 表单验证
formMod.listen("/spacecp/setTradePassword",{
    ajaxBefore: function(){
        $("#setTradePasswordSubmit").addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');
        if(item.attr('name')=="pwd"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入交易密码').show();
            }else if(validResutl.valid == 'number'){
                item_notice.html('<i></i>请输入6位数字').show();
            }else if(validResutl.valid == 'len'){
                item_notice.html('<i></i>请输入6位数字').show();
            }
        }
        if(item.attr('name')=="repwd"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入交易密码').show();
            }else if(validResutl.valid == 'equal'){
                item_notice.html('<i></i>两次输入的密码不一致，请重新输入').show();
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        var item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');
        if(item.attr('name')=='pwd'){
            item_notice.hide();
        }
        if(item.attr('name')=='repwd'){
            item_notice.hide();
        }
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            var templateSign = $("#templateSign").val();
            if(templateSign == "spacecp_index"){
                // 个人设置--账号设置页面
                setTradePasswordDialog.close();
                $(".secret-btn-bg").removeClass("off").addClass("on").attr("role-api","inputTradePassword");
                var paypwdTr = $("#paypwdTr");
                paypwdTr.find(".have").html('<div class="have-icon"></div>');
                paypwdTr.find(".content-ui").html('交易密码已设置');
                paypwdTr.find(".link").html('<a href="/spacecp/modifytradepassword">修改密码</a><span class="breakline">|</span><a href="/spacecp/findtradepassword">找回密码</a>');
            }else if(templateSign == "member_index"){
                // 个人中心--首页
                window.location.href = "//licai.p2peye.com/member/withdraw";
            }else{
                // 其他情况
                window.location.reload();
            }
        }else{
            _Fn.alert(res.message);
            $("#setTradePasswordSubmit").removeClass("disabled").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#setTradePasswordSubmit").removeClass("disabled").val("确定");
    }
});



// 输入交易密码 表单验证
formMod.listen("/spacecp/openTradePassword",{
    ajaxBefore: function(){
        $("#inputTradePasswordSubmit").addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');
        if(item.attr('name')=="psword"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入交易密码').show();
            }else if(validResutl.valid == 'number'){
                item_notice.html('<i></i>请输入6位数字').show();
            }else if(validResutl.valid == 'len'){
                item_notice.html('<i></i>请输入6位数字').show();
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        var item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');

        if(item.attr('name')=='psword'){
            item_notice.hide();
        }
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            inputTradePasswordDialog.close();
            var secretBtnBg = $(".secret-btn-bg");
            if(secretBtnBg.hasClass("off")){
                secretBtnBg.removeClass("off").addClass("on");
                $("#pswOpenTag").addClass("have-icon");
            }else if(secretBtnBg.hasClass("on")){
                secretBtnBg.removeClass("on").addClass("off");
                $("#pswOpenTag").removeClass("have-icon");
            }
        }else{
            _Fn.alert(res.message);
            $("#inputTradePasswordSubmit").removeClass("disabled").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#inputTradePasswordSubmit").removeClass("disabled").val("确定");
    }
});




// 实名认证 表单验证
formMod.listen("/spacecp/certify",{
    ajaxBefore: function(){
        $("#certifySubmit").addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');

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
        var item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');
        if(item.attr('name')=='name'){
            item_notice.hide();
        }
        if(item.attr('name')=='idnumber'){
            item_notice.hide();
        }
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.message("认证成功");
            var jumpLink = $("#jumpWay").val();
            if(jumpLink.length){
                if(jumpLink == "reload"){
                    window.location.reload();
                }else{
                    window.location.href = jumpLink;
                }
            }else{
                window.location.reload();
            }
        }else{
            _Fn.alert(res.message);
            $("#certifySubmit").removeClass("disabled").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#certifySubmit").removeClass("disabled").val("确定");
    }
});