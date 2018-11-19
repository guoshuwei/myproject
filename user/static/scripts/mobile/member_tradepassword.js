var
    app = require('./app'),
    mobile = $('#mobile').val(),
    vcode = $('#vcode'),
    vcodenumber = $('#vcodenumber').val(),
    submit = $('#submit');

vcode.click(function(){
    var that = $(this);
    if(that.hasClass('disabled')) return;
    that.addClass('disabled');
    mobile = $('#mobile').val();
    $.ajax({
        url :  '/ajax/getMobileCodeEasy',
        type : 'post',
        data: {
            mobile: mobile,
            type:1
        },
        dataType :'json',
        success: function(res){
            if(res.code == 200){
                numberDown(that,res.data.time);
            }else{
                if(res.code == 5112){
                    numberDown(that,res.data.time);
                }else{
                    _Fn.alert(res.message)
                }
            }
        },
        error : function(){
        }
    })
})
submit.click(function(){
    vcodenumber = $('#vcodenumber').val();
    $.ajax({
        url :  '/ajax/checkMobileCodeEasy',
        type : 'post',
        data: {
            mobile_code: vcodenumber
        },
        dataType :'json',
        success: function(res){
            if(res.code == 200){
                window.location.href = 'https://zxyh.nccbank.com.cn/dbesbservice/app/pinsettingN.html';
            }else{
                _Fn.alert('请输入正确验证码');
            }
        },
        error : function(){
        }
    })
    return false;
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

