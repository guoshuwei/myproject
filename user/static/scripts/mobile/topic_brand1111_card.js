var
    app = require('./app'),
    _body =$("body"),
    bombreceive=$('[role-parent=bombreceive]'),
    bombcount=$('[role-parent=bombcount]'),
     dataUrl = window.location.href,
     wxReady = require('../modules/jssdk'),
    nowTime = $('body').attr('data-nowtime'),
    receiveBtn=$('[role-tap="receive"]'),
    receiveOff=false,
    uid = $('body').attr('uid'),
    receiveBtnSign,pid,cardId,pidJson={};
$("body")
.on('tap','[role-tap=close]',function(){
	$(this).parents(".ui-bombbox").hide();
	return false;
})
.on('tap','[role-tap=receive]',function(){
	if(!_Fn.isLogin())return false;
    if(receiveOff) return false;
	bombreceive.show();
	var that=$(this);
	cardId=that.data("cardid");
	pid=that.data("pid");
	receiveBtnSign=that.index();
	pidJson={
		"pid":pid,
		"card_id":cardId
	}
	return false;
})
.on('tap','[role-tap=count]',function(){
	bombcount.show();
	return false;
})
.on('tap','[role-tap=bombox] .ui-bombbox-bg',function(){
	$(this).parents(".ui-bombbox").hide();
	return false;
})
.on('tap','[role-tap=receivecard]',function(){
	if(!_Fn.isLogin())return false;
	if(receiveOff) return  false;
	receiveOff=true;
	var that=$(this);
	$.ajax({
		url:_Fn.mockServer + "/topic/brand1111/receive_card",
        type: 'post',
        dataType: 'json',
        data:pidJson,
        success: function (res) {
        	that.parents(".ui-bombbox").hide();
        	if(res.code==200){
				$.each(receiveBtn,function(i,m){
					if(i==receiveBtnSign){
						$(this).addClass("receive-cardbrought");
					}else{
						$(this).addClass('receive-cardnobrought')
					}
				})
				_Fn.alert("领取成功");

        	}else{
        		_Fn.alert(res.message);
        		receiveOff=false;
        	}
        },
        error:function(){
        	that.parents(".ui-bombbox").hide();
            _Fn.alert("系统繁忙，稍后重试~");
            receiveOff=false;
        }
	})
	return false;
})
$(window).bind( 'orientationchange', function(e){
    e.stopPropagation();
    e.cancelBubble = true;
    window.location.href = window.location.href;
});
wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        link: dataUrl, // 分享链接
        imgUrl:'//licai.p2peye.com/styles/images/topic/brand1111/mobile/wxshare_logo.png'
    });
})

