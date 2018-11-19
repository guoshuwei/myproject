function reset(ele) {
	var _ele,form;
	//矫正对象返回dom对象
	if(ele instanceof jQuery){
		_ele = ele[0];
	}else{
		_ele = ele;
	}
	//矫正对象，返回form对象
	if(_ele.nodeName == 'FORM'){
		form = $(_ele);
	}else{
		form = $(_ele).parents('form');
	}

	form.find('input[type=text]').val('');

	form.find('textarea').val('');

	form.find('select').val('');

}

return function(){
	$('body').on('click','input[type=reset]',function(){
		reset(this);
		return false;
	})
}();

