var 

api = {

	money : function(val){

		val = parseInt(val);

		val = val * 1 - 0;

		if(isNaN(val)) return '';

		if(val <= 0) return '';

		return val;

	},
	fmoney : function(val){

		var 

		point  = val.indexOf('.') > -1 ? true : false,

		_val = val;

		if(!point){

			return api.money(val);
		}

		val = val.split('.');

		if(val.length > 2){

			val.splice(2,val.length-1);

		}

		if(!api.money(val[0])){
			return ''
		}

		if(val[1] == '00'){
			return val[0]+'.00';
		}
		if(val[1] == '000'){
			return val[0]+'.00';
		}

		if(val[1] == '0'){
			return val[0]+'.0';
		}
		

		if(!api.money(val[1])){
			return val[0]+'.';
		}

		if(val[1].length > 2){

			var arr = val[1].split('');

			arr.splice(2,arr.length-1);

			return val[0]+'.'+arr.join('');
		}else{
			return _val;
		}

		return '';



	}
}

$('body')

.on('input','input[role=autoinput]',function(){

	var 
	that = $(this),
	data = that.attr('data-autoinput'),
	val = that.val();

	if(!data) return;

	that.val( api[data](val) );

})

if(!document.body.addEventListener){

	$('input[role=autoinput]').each(function(){
		var that = $(this);
		this.attachEvent('onpropertychange',function(e) {
			if(e.propertyName!='value') return;
			that.input();
		});
	})
}



