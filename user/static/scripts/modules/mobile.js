
var 
    mobile,
    btnCode,
    code,
    mobileStatus = false,
    timer,seconds,
    validata = require('../modules/validate');

function countDown(){
    if(seconds < 0){
        window.clearInterval(timer);
        btnCode.val('重发验证码');
        btnCode.removeAttr('disabled');
        mobile.removeAttr('readonly');
        btnCode.removeClass('btnCodeing');
        return;
    }
    btnCode.val(seconds +'秒后重新获取');
    seconds--;
}

return {
    getCode : function(obj,checker,coder,validataAPI,errorCall,successCall,url){
        var _jq = window['jQuery'] ? jQuery : Zepto;
        btnCode = (obj instanceof _jq) ? obj : $(obj);
        mobile = (checker instanceof _jq) ? checker : $(checker);

        btnCode.attr('disabled','disabled');
        mobile.attr('readonly','readonly');
        btnCode.addClass('btnCodeing');
        var errorMessage = $('.errorMessage');
        
        code = (coder instanceof _jq) ? coder : $(coder);

        var sendType = btnCode.siblings('.sendType').val();

        seconds = 60;
        //初始化,清空提示，重新计时
        if(timer){
            window.clearInterval(timer);
        }

        var number = mobile.val();
        mobileStatus = validata.api[validataAPI](number);
        if(btnCode.attr('data') == 'rvbtnCode'){
            mobileStatus = true;
        }
        if(!mobileStatus){
            btnCode.removeAttr('disabled');
            mobile.removeAttr('readonly');
            btnCode.removeClass('btnCodeing');
            if(errorCall){
                errorCall('请填写正确的手机号');
            }
            return;
        }
        var codeData = {mobile:number,type:sendType};
        var url = url ? url : '/member/send';
        //发送验证码
        $.post(url,codeData,function(response){ 
            var error = (response.code || response.code == '0') ? response.code :response.error;
            if(error != '0'){
                if(error == 4100){
                    window.location.href = 'https://www.touyouquan.com/';
                }
                btnCode.removeAttr('disabled');
                mobile.removeAttr('readonly');
                btnCode.removeClass('btnCodeing');
                if(errorCall){
                    errorCall(response.message);
                }
                return;
            }
            if(successCall){
                successCall();
            }
            //倒计时
            btnCode.val(seconds +'秒后重新获取');
            timer = window.setInterval(countDown,1000);
        },'json');
    }
}