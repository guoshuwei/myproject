

var 
	following = false,
	selector = require('../plugins/select'),
	resultCall = require('../modules/ajaxcodecall'),
	animate = require('../modules/animate'),
	dialogUi= require('../modules/dialogUi');




$('body')
.on('focus','.ui-search .input',function(){
	$(this).parents('.ui-search').addClass('in');
})
.on('click','.ui-pop a',function(){
	var parent = $(this).parents('.ui-pop');
	parent.fadeOut(400, function() {
		parent.remove();
	});
})
.on('blur','.ui-search .input',function(){
	$(this).parents('.ui-search').removeClass('in');
})
.on('mouseenter','.ui-radio',function(){
	$(this).addClass('ui-radio-hover');
})
.on('mouseleave','.ui-radio',function(){
	$(this).removeClass('ui-radio-hover');	
})
.on('click','.ui-radio input[type=radio]',function(){
	var parents = $(this).parents('.ui-item');
	var radios = parents.find('input[type=radio]');

	if(parents.hasClass('ui-radio-checked')) return;

	radios.each(function(index,that){
		if($(that).attr('checked') == 'checked'){
			$(that).parents('.ui-radio').addClass('ui-radio-checked');
		}else{
			$(that).parents('.ui-radio').removeClass('ui-radio-checked');
		}
	})
})
.on('click','.ui-follow,.ui-follow-easy',function(){
	var that = $(this),
	url = that.attr('url'),
	followed = that.hasClass('ed');

	if(!_Fn.isLogin()) return false;

	if(following) return false;

	following = true;
	animate.loading().show(that);
	$.ajax({
		url : url?url:'/user/follow',
		type : 'post',
		dataType:'json',
		success : function(res){
			animate.loading().hide(function(){
				following = false;
				if(res.code != 200){
					resultCall(res);
					return;
				}

				var isHasNum = $.trim(that.find('span').html());

				if(!followed){
					that.addClass('ed');
					if(isHasNum!='')
						that.find('span').html(parseInt(that.find('span').html())+1);

					if(that.hasClass('ui-follow-easy')){
						that.html('已关注');
					}
					if(that.hasClass('ui-follow')){
						that.html('<em></em>已关注');
					}
					animate.numberUp(that);
				}else{
					that.removeClass('ed');
					if(isHasNum!='')
						that.find('span').html(parseInt(that.find('span').html())-1);
					if(that.hasClass('ui-follow-easy')){
						that.html('<em><i>+</i></em>关注');
					}
					if(that.hasClass('ui-follow')){
						that.html('<em></em>关注');
					}
					animate.numberUp(that,{
						'color' : '#0080cc'
					},'-1');
				}

			});

		},
		error : function(){
			animate.loading().hide(function(){
				_Fn.alert('关注失败，请稍后尝试!');
				following = false;
			});
		}
	});
	
});

//for关闭消息提醒
$('#msg-tiplist').on('click','span.close',function(e){
	var _this =$(this),
	_parent = _this.parent(),
	msgid;

	if(_parent.length){
		msgid = _parent.data('id');
		_parent.remove();
		if(msgid>0){
			$.ajax({
				type:"post",
				data:{msgid:msgid},
				url:"/user/readmsg"
			})
		}
	}
	

})




