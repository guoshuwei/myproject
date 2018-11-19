var
    app = require('./app'),
    template = require('../modules/template'),
    resultEle = $('.ui-result'),
    mobilePopup = require('../modules/mobile_popup'); //手机版弹出层

window.deviceNumber = function(data){
	$('.ui-fcode-list-btn').attr({'device':data});
}
$('body')
.on('tap','.ui-fcode-list-btn',function(){
    var fCode = $('.ui-fcode-list-text').val(),
    	deviceNumber = $(this).attr('device'); 
    if(!fCode){
    	mobilePopup.showPromptMessage('请输入F码');
    	return false;
    }

    if(!_Fn.isLogin())return false;
    $.ajax({
        url: _Fn.mockServer + '/topic/verifycode',
        type: 'post',
        dataType: 'json',
        data : {
        	code : fCode,
        	ac   : deviceNumber
        },
        success: function(res){
        	var data = {};
        	if(res.code == 200){ 
	        	data.money = res.data.price;
	        	var contents = template.render('succeedTpl',data);
        	}else{
                /*
        		if(res.code == 5160){
        			data.message = '活动未开始';
        		}else if(res.code == 5158){
        			data.message = '活动已结束';
        		}else if(res.code == 4100){
        			data.message = '未登陆';
        		}else if(res.code == 4108){
        			data.message = '未绑定';
        		}else if(res.code == 5140){
        			data.message = '参数不正确';
        		}else if(res.code == 5172){
        			data.message = '操作太快';
        		}else if(res.code == 5198){
        			data.message = '该设备已兑换过F码';
        		}else if(res.code == 5199){
        			data.message = '此账号已兑换过F码';
        		}else if(res.code == 5167){
        			data.message = 'F码输入有误';
        		}else if(res.code == 5166){
        			data.message = '错误次数过多';
        		}else if(res.code == 5168){
        			data.message = 'F码已被使用';
        		}else if(res.code == 5169){
        			data.message = '使用失败';
        		}*/
                data.message = res.message;
        		var contents = template.render('failTpl',data);
        	}		
			resultEle.html(contents);
            mobilePopup.showMaskLayer();
			mobilePopup.showEle(resultEle);
        },
        error: function(){
            mobilePopup.showPromptMessage('网络错误，请稍后再试~~');
        }
    });
})
.on('tap','.fn-close',function(){
	mobilePopup.hideEle(resultEle);
	mobilePopup.hideMaskLayer();
	resultEle.html('');
});

