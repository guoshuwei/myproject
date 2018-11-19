var template = require('../modules/template');

exports.viewLargerImage = function(data){
	/* data参数
	{
		src			//图片路径
		uname 		//姓名
		job 		//职务
		describe 	//照片描述
		event_source //事件源元素
		editorfn 	//编辑功能  
		deletefn 	//删除功能
		input_name 	// 需要传到后的图片input的name
	}
	*/
	/* 点击看大图加属性 当属性值是0时代表不需要
	uname="0" job="0" describe="0" 
	deletefn="1" editorfn="1" 1代表有这个功能
	deletefn="0" editorfn="0" 0代表没有这个功能
	*/

	var viewLargerImageDom = template.render('viewLargerImageTpl',data);
    $('body').append(viewLargerImageDom);
    var parents = $('.larger-image'),
    	imageParent = parents.find('.larger-image-imgbox'),
    	editorBtn = parents.find('.larger-image-btnbox-editor'),
    	deleteBtn = parents.find('.larger-image-btnbox-delete'),
    	closeBtn = parents.find('.larger-image-btnbox-close'),
    	dialogInput = data.event_source.parent().find('input[role="dialog"]'),
    	str = '';

    setWidthHigh();

    $(window).resize(function(){
		setWidthHigh();
	});

	function setWidthHigh(){
		var clientWidth = Math.max(parseInt($(window).width()),1000),
    		clientHeight = Math.max(parseInt($(window).height()),500),
    		imageParentHeight = parseInt(imageParent.height()),
    		t = 0;

    	if(clientHeight > 500){
    		t = (clientHeight-imageParentHeight)/2;
    	}else{
    		t = 0;
    	}
		
	    imageParent.css({ 'margin-top': t });

	    parents.children().css({ 'height': clientHeight });
	    parents.css({
	        width: clientWidth,
	        height: clientHeight
	    });
	}

	parents.show();
	
	editorBtn.click(function(){
		//配置role-api
		str = dialogInput.attr('editor')+'|'+'editor,';
		str += dialogInput.attr('api');
		
		triggerClick(str);
	});
	deleteBtn.click(function(){
		str = dialogInput.attr('delete')
		triggerClick(str);
	});
	closeBtn.click(function(){
		largerImageRemoveFn();
	});

	function triggerClick(str){
		dialogInput.attr({
			'role-api' : str
		});
		dialogInput.trigger('click');
		largerImageRemoveFn();
	}

	function largerImageRemoveFn(){
		$('.larger-image').remove();
	}
}

