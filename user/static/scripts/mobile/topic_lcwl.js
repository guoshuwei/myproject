var
    app = require('./app'),
    formMod = require('../modules/form');

/* 微信分享成功 */
var wxReady = require('../modules/jssdk');

wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        title : "“联畅未来”2017科技金融行业峰会 - 网贷天眼",
        desc : "“联畅未来”2017科技金融行业峰会"
    });
});

var mySwiper = new Swiper('.swiper-container', {
    direction:'vertical',
    nextButton: '.swiper-button-next',
    parallax : true
});


// 表单验证
formMod.listen("/topic/enroll",{
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_notice = item.siblings(".error-tips");
        if(item.attr('name')=='name'){
            if(validResutl.valid == 'notempty'){
                item_notice.html('*姓名不能为空');
                item.addClass("error-style");
            }else if(validResutl.valid == 'cn_or_en'){
                item_notice.html('*请输入中文或英文');
                item.addClass("error-style");
            }else if(validResutl.valid == 'len'){
                item_notice.html('*请最多输入20个字符');
                item.addClass("error-style");
            }
        }
        if(item.attr('name')=='mobile'){
            if(validResutl.valid == 'notempty'){
                item_notice.html('*手机号不能为空！');
                item.addClass("error-style");
            }else if(validResutl.valid == 'mobile'){
                item_notice.html('*请输入正确的手机号');
                item.addClass("error-style");
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        $(".error-tips").html("");
        $(".form-input input").removeClass("error-style");
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.alert(res.message);
            $(".form-input input,.form-input textarea").attr("disabled","disabled");
            $("#submitBtn").val("报名成功").attr("disabled","disabled");
        }else{
            _Fn.alert(res.message);
        }
    },
    error:function(){
        _Fn.alert("网络错误，请稍后重试");
    }
});