
//加载验证模块
var validate = require('./validate'),
	Event = require('./Event'),
	formEventCenter = Event('formModule');

//若不支持parentsUntil
function parentsUntil($el,srcTarget){
	if($el['parentsUntil']){
		var parents = $el.parentsUntil(srcTarget),
			len = parents.length,
			target;
		if(len){
			target = parents.eq(len-1).parent();
		}else{
			target = $el;
		}
		return target;

	}else{
		var parent = $el.parent().get(0),
		srcTarget = srcTarget.toUpperCase();
		while(parent && parent.tagName &&  parent.tagName.toUpperCase() !==srcTarget){
			parent = parent.parentNode;
		}

		return $(parent);
	}
}

$('body').on('submit','[role=ajaxfrom],[role=validform]',function(e){
	var $this = $(this),
		method = $this.attr('method')||'GET',
		action = $this.attr('action'),
		validResult = validate.valid($this);
	
	// formEventCenter._action = action;
	//通过验证
	if(validResult && !validResult.error){
		if($this.attr('role') == 'ajaxfrom'){
			if($this.attr('role-clock') == '1') return false;
			$this.attr('role-clock',1);
			formEventCenter.fire(action+'_ajax_before',$this);
			$.ajax({
				url:action,
				type:method,
				data:$this.serializeArray(),
				success:function(res,restxt,xhr){
					formEventCenter.fire(action+'_success',{data:res,text:restxt,xhr:xhr},$this);
					$this.attr('role-clock',0);
				},
				error:function(xhr,restxt,e){
					formEventCenter.fire(action+'_error',{xhr:xhr,text:restxt,error:e},$this);
					$this.attr('role-clock',0);
				}
			})
		}else{
			return true;
		}
	}else{
		// e.preventDefault();
		formEventCenter.fire(action+'_valid_failure',validResult,$this);
	}
	
	e.preventDefault();

}).on('focus','[data-valid]',function(e){

	var $this = $(this),
		form = parentsUntil($this,'form'),
		action,
		result;

	if(form.attr('valid-after')) return;

	action = form.attr('action');
	if(form.length){
		formEventCenter.fire(action+'_valid_cleanup',$this);
	}


}).on('blur','[data-valid]',function(e){
	var that = this;
	setTimeout(function(){
		var $this = $(that),
			form = parentsUntil($this,'form'),
			action,
			result;

		if(form.attr('valid-after')) return;

		result = validate.valid($this);

		action = form.attr('action');
		if(form.length){
			if(result.error)
				formEventCenter.fire(action+'_valid_failure',result,form);
			if(!result.error)
				formEventCenter.fire(action+'_valid_success',$this,form,result);
		}
	},200);

	
		
}).on('keyup','[data-valid]',function(e){
	
	var $this = $(this),
		form = parentsUntil($this,'form'),
		action;
	if(form.length){
		action = form.attr('action');
		formEventCenter.fire(action+'_valid_cleanup',$this);
	}
	
}).on('change','[data-valid]',function(e){
	
	var $this = $(this),
		form = parentsUntil($this,'form'),
		action;

	if(form.attr('valid-after')) return;

	if(form.length){
		action = form.attr('action');
		formEventCenter.fire(action+'_valid_cleanup',$this);
	}
}).on('click','.reflashVcode',function(e){
	e.preventDefault();
	var parent = $(this).parent(),
		vcodeimg = parent.find('img.vcodeimg'),
		src = vcodeimg.attr('src');

	if(src && src !=''){
		vcodeimg.attr('src',src+'1');
	}
	
});
//监听action
exports.listen = function(action,opt){
	if(opt.success)
		formEventCenter.addEventListener(action+'_success',function(data,form){
			opt.success.apply(form,[data]);
		});
	if(opt.error)
		formEventCenter.addEventListener(action+'_error',function(data,form){
			opt.error.apply(form,[data]);
		})
	if(opt.validError)
		formEventCenter.addEventListener(action+'_valid_failure',function(item){
			opt.validError(item);
		})
	if(opt.validSuccess)
		formEventCenter.addEventListener(action+'_valid_success',function(item,form,result){
			opt.validSuccess(item,form,result);
		})
	if(opt.cleanup)
		formEventCenter.addEventListener(action+'_valid_cleanup',function(item){
			opt.cleanup(item);
		})
	if(opt.ajaxBefore)
		formEventCenter.addEventListener(action+'_ajax_before',function(item){
			opt.ajaxBefore(item);
		})
}
exports.ajax = function(options){
	var d = {
		type : 'get',
		async : false,
		url : '',
        callback : '',
        dataType : "json",
        error : false
	},
	v = new Date().getTime();

	for(var i in options){
		d[i]  = options [i];
	}

	$.ajax({
		type : d.type,
        async : d.async,
        url : d.url + ((d.type != 'get') ? '':'&v=' + v),
        dataType : d.dataType,
        data : d.data,
        success : function(json){
            d.callback(json);
        },
        error : d.error
	})
}