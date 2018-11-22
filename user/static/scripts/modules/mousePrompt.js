var 
timeout,
hasMousePopup = function(){
	var len = $('.mouse-popup').length;
	if (len > 0) return $('.mouse-popup');
	return false; 
},
createPopup = function(content,e){ 
	var mousePopup;
	if(!hasMousePopup()){
		mousePopup = $('<div>',{'class':'mouse-popup'});
		$('body').append(mousePopup);
	}else{
		mousePopup = hasMousePopup();
	}
	
	mousePopup.html(content);

	var left = e.pageX;
	var top = e.pageY-mousePopup.outerHeight()-25;
	mousePopup.css({'left':left,'top':top});
	mousePopup.show();
},
removePopup = function(ele){
	var mousePopup;
	if(!hasMousePopup()){
		clearTimeout(timeout);
		return;
	}else{
		mousePopup = hasMousePopup();
		mousePopup.hide();
		mousePopup.html('');
	}
	ele.removeAttr('lock');
}
timeDelay = function(time,fn){  
	timeout = setTimeout(function(){
		if(timeout)
			clearTimeout(timeout);
		fn();
	},time);
};

$('body')
.on('mouseenter','[role-prompt=mouse-prompt]',function(e){
	var lock = $(this).attr('lock');
	if(lock)return;
    var e = event || ev;
    var content = $(this).attr('data-prompt');
    $(this).attr({'lock':'1'});
    timeDelay(1000,function(){
    	createPopup(content,e);
    });   
})
.on('mouseleave','[role-prompt=mouse-prompt]',function(){
	if(timeout){
		clearTimeout(timeout);
	}	
    removePopup($(this));
});









