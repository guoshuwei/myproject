var 

hasPopup = function(){

	var len = $('.alt-popup').length;

	if (len > 0) return $('.alt-popup');

	return false;
},

createPopup = function(content,parent){

	var popup = document.createElement('div');

	popup.className = 'alt-popup';

	var html = [];

	html.push('<div class="warp">');
		html.push('<div class="bg">');
			html.push(content);
		html.push('</div>');
		html.push('<div class="icon_warp"></div>');
		html.push('<div class="icon"></div>');
	html.push('</div>');

	$(popup).append(html.join(""));

	$('body').append(popup);

	var parentOffset = parent.offset();

	var maxWidth = parentOffset.left - 14 + $(popup).width();
	if(maxWidth < $('body').width()){
		$(popup).css({
			top : parentOffset.top - 43 + 'px',
			left : parentOffset.left - 14 + 'px'
		})
		$(popup).addClass('alt-popup-left');
	}else{
		$(popup).css({
			top : parentOffset.top - 43 + 'px',
			left : (parentOffset.left - $(popup).width() + 34) + 'px'
		})
		$(popup).addClass('alt-popup-right');
	}

	

	$(popup).fadeIn();
},

update = function(content,popup,target){

	popup.stop();

	popup.hide();

	var parentOffset = target.offset();

	popup.find('.bg').html(content);

	var maxWidth = parentOffset.left - 14 + popup.width();
	if(maxWidth < $('body').width()){
		popup.css({
			top : parentOffset.top - 43 + 'px',
			left : parentOffset.left - 14 + 'px'
		})

		popup.removeClass('alt-popup-right');
		popup.removeClass('alt-popup-left');

		popup.addClass('alt-popup-left');
	}else{
		popup.css({
			top : parentOffset.top - 43 + 'px',
			left : (parentOffset.left - popup.width() + 34) + 'px'
		})
		popup.removeClass('alt-popup-right');
		popup.removeClass('alt-popup-left');

		popup.addClass('alt-popup-right');
	}

	

	popup.fadeIn();
}

$('body')
.on('mouseenter','[role=alt-tip]',function(){


	var 
	popup = hasPopup(),
	content = $(this).attr('data-content');

	if(popup){
		popup.stop();
		update(content,popup,$(this));
	}else{

		createPopup(content,$(this));
	}
})
.on('mouseleave','[role=alt-tip]',function(){
	var 
	popup = hasPopup();
	popup.fadeOut();
});