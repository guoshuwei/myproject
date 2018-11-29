var 
resultCall = require('../modules/ajaxcodecall'),
animate = require('../modules/animate');


function changeHtml(type,that,api){
	if(api[3] && api[type].indexOf('#') > -1){
		that.html(api[type].replace(/#/,api[3]));
	}else{
		that.html(api[type]);
	}

	that.attr('role-api',api.join(':'));

}

$('[role=follow]').each(function(){
	var that = $(this),
	api = that.attr('role-api');
	api = api.split(':');
	changeHtml(api[2] == "" ? 0 : api[2],that,api);
	
})

$('body')
.on('click','[role=follow]',function(){
	var that = $(this),
	url = that.attr('href'),
	status = that.attr('status'),
	api = that.attr('role-api');
	api = api.split(':');
	if(!_Fn.isLogin()) return false;
	if(status && status>0) return false;
	that.attr('status',1);

	animate.loading().show(that);

	

	$.ajax({
		url : url,
		type : 'post',
		dataType:'json',
		success : function(res){
			animate.loading().hide(function(){
				that.attr('status',0);
				if(res.code != 200){
					resultCall(res);
					return;
				}
				if(api[2] == 0 || api[2] == ""){
					that.addClass('ed');
					api[2] = 1;
					animate.numberUp(that);

				}else{
					that.removeClass('ed');
					api[2] = 0;
				
					animate.numberUp(that,{
						'color' : '#0080cc'
					},'-1');
				}
				changeHtml(api[2],that,api);

			});

		},
		error : function(){
			animate.loading().hide(function(){
				_Fn.alert('关注失败，请稍后尝试!');
				following = false;
			});
		}
	});

	return false;
})