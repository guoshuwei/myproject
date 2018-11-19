//绑定data-url
$('body').on('click','[data-url]',function(e){
	var target = $(this),
		trueTarget = e.target,
		url = target.data('url'),
		urltarget = target.data('urltarget');

	//不处理A链接
	if(trueTarget && trueTarget.tagName && trueTarget.tagName.toUpperCase() ==='A')
		return;

	if(urltarget && urltarget =='_blank'){
		window.open(url);
	}else{
		document.location.href = url;
	}

}).on('mouseenter','[data-url],[hover-class]',function(e){
	$(this).addClass('onhover');
}).on('mouseleave','[data-url],[hover-class]',function(e){
	$(this).removeClass('onhover');
});