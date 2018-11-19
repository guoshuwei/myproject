(function(){

	function setHolder(el,type){

		var placeholderTXT = $(el).attr('placeholder');

		if(!type && $(el).val() == ''){

			$(el).parents('dd').append('<span class="placeholder">'+placeholderTXT+'</span>')


		}

		if(type==1 && $(el).val() == ''){
			$(el).parents('dd').find('.placeholder').show();
		}else if(type ==2){
			$(el).parents('dd').find('.placeholder').hide();
		}

	}
	if($.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0' || $.browser.version == '8.0' || $.browser.version == '9.0')){
		$('body').on('blur','[placeholder]',function(){
			setHolder(this,1);
		})
		$('body').on('focus','[placeholder]',function(){
			setHolder(this,2);
		})
		$('body').on('click','.placeholder',function(){
			$(this).hide();
			$(this).parents('dd').find('input').focus();
		})

		$('[placeholder]').each(function(){
			setHolder(this);
		});
	}
})();