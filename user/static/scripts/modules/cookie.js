var cookie = require('../plugins/$.cookie');

/*对应cookie的处理函数*/
var cookieHandle = {
	//个人中心自动记账提示处理函数
	licai_auto_invest : function(value,that){
		if(value == 1){
			that.parents('.ui-pop').remove();
		}
	},
	//个人中心绑定提示tip处理函数
	bind_remember : function(value,that){
		if(value == 1){
			that.parents('.ui-pop').remove();
		}
	}
}

$('body')
.on('click','[role=cookie]',function(){
	var that = $(this);
	var data = that.attr('role-api').split('|');
	if(data.length < 2) return;
	$.cookie(data[0],data[1],{expires:365,path:'/'});
});


$('[role=cookie]').each(function(index,that){
	that = $(that);
	var cache = that.attr('role-api').split('|')[0];
	var cookieValue = $.cookie(cache);
	if(cookieHandle[cache]){
		cookieHandle[cache](cookieValue,that);
	}else if(window[cache]){
		window[cache](cookieValue,that);
	}else if(_Fn[cache]){
		_Fn[cache](cookieValue,that);
	}
})



