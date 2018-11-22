exports.on = function (xingx,clickCallback) {

	var flagXingx = $('.act',xingx).length;

	xingx

	.on('mouseenter','a',function(){

		var index = $(this).index();

		var parent = $(this).parents('.xingx');

		if(parent.hasClass('clicked')){
			parent.removeClass('clicked');
		}

		$('a',parent).each(function(i,that){

			if(i <= index){

				if(!$(that).hasClass('act')){

					$(that).addClass('act');
				}
			}else{
				if($(that).hasClass('act')){

					$(that).removeClass('act');
				}
			}
		});

		
	})

	.on('click','a',function(){
		var parent = $(this).parents('.xingx');
		var index = $(this).index();
		if(!parent.hasClass('clicked')){
			parent.addClass('clicked')
		}
		flagXingx = index + 1;
		clickCallback(index+1);
	})

	.on('mouseleave',function(){

		if($(this).hasClass('clicked')) return;

		var index = flagXingx - 1;

		$('a',xingx).each(function(i,that){

			if(i <= index){

				if(!$(that).hasClass('act')){

					$(that).addClass('act');
				}
			}else{
				if($(that).hasClass('act')){

					$(that).removeClass('act');
				}
			}

		})
	})


}