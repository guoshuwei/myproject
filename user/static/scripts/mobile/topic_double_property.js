var
    app = require('./app'),
    moneyEle = $('#money'),
    loadEle = $('.ui-loading'),
    redPaperLock = false,
    mobilePopup = require('../modules/mobile_popup'); //手机版弹出层

$(".details-jump-cunguan .ui-details-jump-confirm").attr("href","https://www.touyouquan.com/reg.html");
$(".details-jump-bind .ui-details-jump-confirm").attr("href","//licai.p2peye.com/member/bind?referer=" + window.location.href);
if($("body").height()<$(window).height()){
    $("body").height($(window).height())
}
$('body')
.on('tap','.ui-details-jump-cancel',function(){
	_Fn.lightboxWrap()._fadeOut();
    $('.fn-details-jump').hide();
})
.on('tap click','.fn-receive',function(){
    if(redPaperLock) return;
    redPaperLock = true;
	var that = $(this),
		parent = that.parents('.ui-ulist-item'),
		currentMoney = parseFloat(that.attr('money')),
		id = that.attr('data-id');


	mobilePopup.showMaskLayer();
	mobilePopup.showEle(loadEle);
	
    $.ajax({
        url:_Fn.mockServer + '/member/getMyCashCoupon',
        type:'post',
        dataType:'json',
        data : {
            "id" : id
        },
        success:function(msg){
            var code = msg.code;
            mobilePopup.hideEle(loadEle);
            if(code == 4303){
            	_Fn.lightboxWrap()._fadeIn();
                $('.fn-details-jump.details-jump-cunguan').fadeIn();
            }else if(code == 4108){
            	_Fn.lightboxWrap()._fadeIn();
                $('.fn-details-jump.details-jump-bind').fadeIn();
            }else if(code == 4106){
                mobilePopup.showPromptMessage('网络异常');
            }else if(code == 4601){
            	_Fn.lightboxWrap()._fadeIn();
                $('.fn-details-jump.details-jump-bind').fadeIn();
            }else if(code == 4602){
            	_Fn.lightboxWrap()._fadeIn();
                $('.fn-details-jump.details-jump-cunguan').fadeIn();
            }else if(code == 4603){
                mobilePopup.showPromptMessage('已领取');
            }else if(code == 4604){
                mobilePopup.showPromptMessage('已领取');
            }else if(code == 4605){
                mobilePopup.showPromptMessage('网络异常');
            }else if(code == 4606){
                mobilePopup.showPromptMessage('网络异常');
            }else{
                if(code == 200){
					parent.stop().animate({'height': '0'}, 'normal',function(){
                        parent.remove();
						totalMoney(currentMoney);
						mobilePopup.showPromptMessage('使用成功');
                        var uList = $('.ui-ulist');
                        var item = uList.find('.ui-ulist-item');
                        if(!item.length){
                            uList.remove();
                        }
					});
                }else{
                   mobilePopup.showPromptMessage('网络异常');
                }
            }
            mobilePopup.hideMaskLayer();
            redPaperLock = false;
        },
        error : function(){
        	mobilePopup.hideEle(loadEle);
			mobilePopup.hideMaskLayer();
            mobilePopup.showPromptMessage('网络错误，请稍后再试~~');
            redPaperLock = false;
        }
    });
});
function totalMoney(num){
	var oldMoney = parseFloat(moneyEle.html()),
		resultMoney = parseFloat(parseFloat(num + oldMoney).toFixed(2));
        resultMoney=resultMoney.toString();
        resultMoney1=resultMoney.split(".");
  if(!resultMoney1[1]){
        resultMoney=resultMoney+".00";
	}else if(resultMoney1[1]&&resultMoney1[1].length<2){
        resultMoney=resultMoney+"0";
    }
	moneyEle.html(resultMoney);
}

