var animate = require('../modules/animate');
var resultCall = require('../modules/ajaxcodecall');

function pkHandel(that,parent){
	var left = that.hasClass('l-side') ? 1 : 0;

	var rate = parent.find('.pk-line-rate');

	var leftNumber = parent.find('.l-num');

	var rightNumber = parent.find('.r-num');

	var ln,rn,_css;

	if(left){
		leftNumber.html(parseInt(leftNumber.html()) + 1);
	}else{
		rightNumber.html(parseInt(rightNumber.html()) + 1);
	}

	ln = parseInt(leftNumber.html());
	rn = parseInt(rightNumber.html());

	rate.css({
		width : ln / (ln + rn ) * 100 + '%'
	})
	if(!left){
		_css = {
			color:'#0080cc'
		}
	}
	animate.numberUp(that,_css);

}


exports.listen = function(options){

	var 
	parent = options.parent ? options.parent : $('body');
	$(parent)
	.on('click','.mod-pk a',function(){
		var that = $(this);
		var parent = that.parents('.mod-pk');

		if(!_Fn.isLogin()) return;
		
		
		var data = that.attr('data').split('|');

		if(data.length < 5) return;
	
		$.ajax({
			url : data[0],
			type : 'post',
			dataType : 'json',
			data : {
				src_id : data[1],
				src_type : data[2],
				id : data[3],
				type : data[4]
			},
			success : function(res){
				if(res.code  == 200){
					pkHandel(that,parent);
				}else{
					resultCall(res);
				}
			}
		})
	})
}