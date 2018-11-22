wxReady = function(callback){
	var debug = window.location.href.indexOf('debug') > 0 ? true : false;
	var debug = false;
	if(debug){
		alert('debug=true');
	}

	$.ajax({
		url:'//www.p2peye.com/wechat.php',
		type:'get',
		data:{
			mod:'share',
			url:encodeURIComponent(location.href.split('#')[0])
		},
		dataType:'jsonp',
		jsonp: "callback",
		jsonpCallback:"success_jsonpCallback",
		success:function(data){
			if(data.code != 200){
				return callback('error');
			}
			wx.config({
				debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: "wx4c26a6e0f7d85519", // 必填，公众号的唯一标识
			    timestamp: data.data.timestamp, // 必填，生成签名的时间戳
			    nonceStr: data.data.wxnonceStr, // 必填，生成签名的随机串
			    signature: data.data.signature,// 必填，签名，见附录1
			    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','chooseImage','previewImage','uploadImage','downloadImage','translateVoice','getNetworkType','openLocation','getLocation','hideOptionMenu','showOptionMenu','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem','closeWindow','scanQRCode','chooseWXPay','openProductSpecificView','addCard','chooseCard','openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			callback('success');
		},
		error:function(){
			callback('error');
		}
	})
};


exports.init = wxReady;

exports.share = function(options){
	var
	_default = {
		title: $('title').html(), // 分享标题
	    link: window.location.href.split('#')[0], // 分享链接
	    imgUrl: '//www.p2peye.com/static/image/wechatshare.jpg', // 分享图标
	    desc: $('meta[name=description]').attr('content')||'', // 分享描述
	    type: 'link', // 分享类型,music、video或link，不填默认为link
    	dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () {
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () {
	        // 用户取消分享后执行的回调函数
	    }
	}

	for(var i in options){
		_default[i] = options[i];
	}

	wx.ready(function(){
	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		wx.checkJsApi({
		    jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','chooseImage','previewImage','uploadImage','downloadImage','translateVoice','getNetworkType','openLocation','getLocation','hideOptionMenu','showOptionMenu','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem','closeWindow','scanQRCode','chooseWXPay','openProductSpecificView','addCard','chooseCard','openCard'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
		    success: function(res) {
		        // 以键值对的形式返回，可用的api值true，不可用为false
		        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
		    }
		});
		wx.onMenuShareTimeline(_default);
		wx.onMenuShareAppMessage(_default);
		wx.onMenuShareQQ(_default);
		wx.onMenuShareWeibo(_default);
		wx.onMenuShareQZone(_default);
	});
}