(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

var __Events__ = {},
  _slice = Array.prototype.slice;

function Event(name){
  this.NAMESPACE = name;
}

var _EP_ = Event.prototype;

_EP_.listen = _EP_.addEventListener = function (name,fn) {

  if(!fn)
    return;

  var id = this.NAMESPACE,
    space = __Events__[id].evs;

  space[name] ? space[name].push(fn):space[name] = [fn];
  return this;

}

_EP_.fire =  function  (name) {
  var args = _slice.call(arguments,1),
    id = this.NAMESPACE,
    fns = __Events__[id].evs[name],
    i=0,l,j=0,k,
    fns2 = __Events__[id].once[name];

  if(fns && fns.length){
  	l= fns.length;

  	for(;i<l;i++){
  		fns[i].apply(fns[i],args);
  	}
  }

  if(fns2 && fns2.length){
  	k=fns2.length;

  	for(;j<k;j++){
  		fns2[j].apply(fns2[j],args);
  	}
    try{
  	 delete __Events__[id].once[name];
    }catch(e){
      __Events__[id].once[name] = null;
    }
  }

  return this;
}

_EP_.once = function(name,fn){
  if(!fn)
    return;

  var id = this.NAMESPACE,
    space = __Events__[id].once;

  space[name] ? space[name].push(fn):space[name] = [fn];
  return this;
}

_EP_.remove = function(name,fn){
	var E = __Events__[name];

	if(!E)
		return;

	var space = E.evs,
		i = 0,
		l,
		fnStr = fn.toString();

	if(space && space.length){
    l = space.length;

		for(;i<l;i++){
			if(fnStr == space[i].toString()){
				space.splice(i,1);
			}
		}
	}
}

module.exports = function(name) {

  var E = __Events__[name];

  if(!E){
     E = __Events__[name] = {
      cons:new Event(name),
      evs:{},
      once:{}
    }
  }
  return E['cons'];
}


},{}],2:[function(require,module,exports){
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

var __Events__ = {},
  _slice = Array.prototype.slice;

function Event(name){
  this.NAMESPACE = name;
}

var _EP_ = Event.prototype;

_EP_.listen = _EP_.addEventListener = function (name,fn) {

  if(!fn)
    return;

  var id = this.NAMESPACE,
    space = __Events__[id].evs;

  space[name] ? space[name].push(fn):space[name] = [fn];
  return this;

}

_EP_.fire =  function  (name) {
  var args = _slice.call(arguments,1),
    id = this.NAMESPACE,
    fns = __Events__[id].evs[name],
    i=0,l,j=0,k,
    fns2 = __Events__[id].once[name];

  if(fns && fns.length){
  	l= fns.length;

  	for(;i<l;i++){
  		fns[i].apply(fns[i],args);
  	}
  }

  if(fns2 && fns2.length){
  	k=fns2.length;

  	for(;j<k;j++){
  		fns2[j].apply(fns2[j],args);
  	}
    try{
  	 delete __Events__[id].once[name];
    }catch(e){
      __Events__[id].once[name] = null;
    }
  }

  return this;
}

_EP_.once = function(name,fn){
  if(!fn)
    return;

  var id = this.NAMESPACE,
    space = __Events__[id].once;

  space[name] ? space[name].push(fn):space[name] = [fn];
  return this;
}

_EP_.remove = function(name,fn){
	var E = __Events__[name];

	if(!E)
		return;

	var space = E.evs,
		i = 0,
		l,
		fnStr = fn.toString();

	if(space && space.length){
    l = space.length;

		for(;i<l;i++){
			if(fnStr == space[i].toString()){
				space.splice(i,1);
			}
		}
	}
}

module.exports = function(name) {

  var E = __Events__[name];

  if(!E){
     E = __Events__[name] = {
      cons:new Event(name),
      evs:{},
      once:{}
    }
  }
  return E['cons'];
}


},{}],2:[function(require,module,exports){
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
},{"./Event":1,"./validate":3}],3:[function(require,module,exports){

exports.api = {
	useremail:function(val){ //邮箱验证
		var obj={};
		obj.ret = true;
		obj.message = '';
		$.ajax(
			{
				url:"/ajax/tyCheckemail",
				type:"post",
				async:false,
				data:"email="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	username:function(val){ //用户名验证
		var obj={};
		obj.ret = true;
		obj.message = '';

		$.ajax(
			{
				url:"/ajax/tyCheckusername",
				type:"post",
				async:false,
				data:"username="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	hasmobile:function(val){
		var obj={};
		obj.ret = true;
		obj.message = '';
		$.ajax(
			{
				url:"/ajax/tyCheckmobile",
				type:"post",
				async:false,
				data:"mobile="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	captcha:function(val){ //图形验证码
		var ret = true;
		$.ajax(
			{
				url:"/ajax/checkVcode",
				type:"post",
				async:false,
				data:"type=register&code="+val,
				success:function(res){
					if(res.code != 200){
						ret = false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
    httpregname:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/activity/verifyUname?uname="+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regname:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/user/verifyUname?uname="+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regInvests:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/fund/verifyCompanyRecord",
				type : 'post',
				data : 'company='+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regtimeoutInvests:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/fund/verifyCompanyRun",
				type : 'post',
				data : 'company='+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regemail:function(val){
		var ret = true;
		$.ajax({
			url : "/user/verifyUemail?uemail="+val,
			async:false,
			success:function(res){
				if(res !=1){
					ret =false;
				}
			},
			error:function(){
				ret = false;
			}
		});
		return ret;
	},
	companyName:function(val){
		var obj={};
		obj.ret = true;
		obj.message = '';
		val = val.trim();
		val = encodeURI(val);
		$.ajax({
			url : "/member/getCompany?company_name="+val,
			async:false,
			success:function(res){
				if(res.code == 200){
					obj.message = res.data.id;
				}else{
					obj.ret = false;
				}
			},
			error:function(){
				obj.ret = false;
			}
		});
		return obj;
	},
	equal:function(val,nameId){
		if(val !==$(nameId).val())
			return false;
		return true;
	},
	notempty:function(val){
		if($.trim(val) ==='')
			return false;
		return true;
	},
	len:function(val,minlen,maxlen){
		if(val.length<minlen || val.length>maxlen)
			return false;
		return true;
	},
	cha:function(val,reg){
		if(new RegExp(reg).test(val))
			return true;
		return false;
	},
	number:function(val){
		if(/^\d+$/.test(val))
			return true;
		return false;
	},
	user_name:function(val){

	},
	times:function(val,radix){
		return val%radix == 0;
	},
	cn_or_en:function(val){
		var reg = /^([\u4E00-\u9FA5]|[a-zA-Z])+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	firstplace_cn_or_num:function(val) {
		var reg = /^[\u4e00-\u9fa5|a-z|A-z]/i;
		if(reg.test(val))
			return true;
		return false;
	},
	floatNumber : function(val){
		var reg = /^\d+((\.{1}\d+)|\d?)$/;
		if(reg.test(val))
			return true;
		return false;
	},
	// 是数字或小数,小数最多可写两位小数
	numberFixed2 : function(val){
		var reg = /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/;
		if(reg.test(val))
			return true;
		return false;
	},
	cn : function(val){
		var reg = /^[\u4e00-\u9fa5]+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	filter : function(val){
		var reg = /^[0-9a-zA-Z_]{1,}$/;
		if(reg.test(val))
			return true;
		return false;
	},
	// pwd : 密码校验规则，至少包含 数字/字母/符号 中的两种。
	pwd : function(val){
		var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{1,}$/;
		if(reg.test(val))
			return true;
		return false;
	},
	reg_cn_letter_number : function(val){
		var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	reg_cn_len : function(val,minlen,maxlen){
		var len = val.replace(/[^\x00-\xFF]/g,'***').length;
		if(len<minlen || len>maxlen)
			return false;
		return true;
	},
	reg_cn_len2 : function(val,minlen,maxlen){
		var len = val.replace(/[^\x00-\xFF]/g,'**').length;
		if(len<minlen || len>maxlen)
			return false;
		return true;
	},
	email:function(val){
		if(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val))
			return true;
		return false;
	},
	mobile:function(val){
		if(!val) return false;
	  	val = val.replace(/\s+/g,'');

		if(/^(13\d|18\d|15\d|17\d|14\d|19\d|16\d)\d{8}$/.test(val))
			return true;
		return false;
	},
    notmobile:function(val){
		if(/1\d{10}/.test(val))
			return false;
		return true;
	},
	ID_card : function(val){
		val = $.trim(val);
		if(/(^\d{15}$)|(^\d{16}$)|(^\d{18}$)|(^\d{19}$)|(^\d{17}(\d|X|x)$)/.test(val))
			return true;
		return false;
	},
	numberRegion : function(val,min,max){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			max = max - 0;
			if(val > max || val < min) return false;

			return true;

		}else{
			return false;
		}
	},
	// 最大值 开区间
	numberMaxOpen : function(val,max){
		if(/\d+/.test(val)){
			val = val - 0;
			max = max - 0;
			return val < max;
		}else{
			return false;
		}
	},
	// 最大值 闭区间
	numberMaxClosed : function(val,max){
		if(/\d+/.test(val)){
			val = val - 0;
			max = max - 0;
			return val <= max;

		}else{
			return false;
		}
	},
	// 最小值 开区间
	numberMinOpen : function(val,min){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			return val > min;
		}else{
			return false;
		}
	},
	// 最小值 闭区间
	numberMinClosed : function(val,min){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			return val >= min;
		}else{
			return false;
		}
	},
	vcode:function(code,type){
		var ret = true;
		$.ajax(
			{
				url:"/vcode/check?type="+type+"&vcode="+code,
				async:false,
				success:function(res){
					if(res !=0){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	checkRegMobileCode:function(code,mobilenum){
		var ret = true;
		$.ajax({
            url:"/Usermobile/checkPhoneCode",
            data:{
                mobile:mobilenum,
                mobilecode:code
            },
            async:false,
            success:function(res){
                res = res*1;
                if(res>0){
                	ret = false;
                }
            },
            error:function(){
            	ret = false;
            }
        });
        return ret;
	},
	tyregistervcode:function(code){
		var ret = true;
		$.ajax(
            {
                url:"/ajax/checkVcode",
                type:"post",
                async:false,
                data:"type=register&code="+code,
                success:function(res){
                    if(res.code != 200){
                    	ret = false;
                    }
                },
                error:function(){
                	ret = false;
                }
            }
        );
        return ret;
	}
};

//验证元素
exports.valid = function(item){
	var $item = $(item),
		validResult = {};
	
	if($item[0] && $item[0].tagName.toUpperCase()==='FORM'){
		var items = $item.find('[data-valid]'),
			i = 0,
			l = items.length,
			ret = true;

		for(;i<l;i++){
			ret = exports.valid(items.eq(i));
			if(ret && ret.error){
				validResult = ret;
				break;
			}
		}
		return validResult;

	}else{
		var valid = $item.attr('data-valid'),
			configs = valid.split('|'),
			validFn,
			validParams,
			validConfig,
			i = 0,
			l = configs.length;

		for(;i<l;i++){
			validConfig = configs[i].split(':');
			validFn = validConfig[0];
			validParams = validConfig.slice(1);
			validParams.unshift($item.val());

			if(exports.api[validFn] && $.isFunction(exports.api[validFn])){
				var ret = exports.api[validFn].apply($item,validParams);
				if(typeof(ret) == 'object'){
					if(ret.ret == false){
						validResult = {
							error:1,
							element:$item,
							valid:validFn,
							message:ret.message
						};
						break;
					}else if(ret.ret == true){
						validResult = {
							error:0,
							element:$item,
							valid:validFn,
							message:ret.message
						};
					}
				}else{
					if(ret == false){
						validResult = {
							error:1,
							element:$item,
							valid:validFn
						};
						break;
					}else{
						validResult = {
							error:0,
							element:$item,
							valid:validFn
						};
					}
				}

			}
		}
	}
	return validResult;
}
},{}]},{},[2]);

},{"./Event":1,"./validate":3}],3:[function(require,module,exports){

exports.api = {
	useremail:function(val){ //邮箱验证
		var obj={};
		obj.ret = true;
		obj.message = '';
		$.ajax(
			{
				url:"/ajax/tyCheckemail",
				type:"post",
				async:false,
				data:"email="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	username:function(val){ //用户名验证
		var obj={};
		obj.ret = true;
		obj.message = '';

		$.ajax(
			{
				url:"/ajax/tyCheckusername",
				type:"post",
				async:false,
				data:"username="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	hasmobile:function(val){
		var obj={};
		obj.ret = true;
		obj.message = '';
		$.ajax(
			{
				url:"/ajax/tyCheckmobile",
				type:"post",
				async:false,
				data:"mobile="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	captcha:function(val){ //图形验证码
		var ret = true;
		$.ajax(
			{
				url:"/ajax/checkVcode",
				type:"post",
				async:false,
				data:"type=register&code="+val,
				success:function(res){
					if(res.code != 200){
						ret = false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
    httpregname:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/activity/verifyUname?uname="+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regname:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/user/verifyUname?uname="+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regInvests:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/fund/verifyCompanyRecord",
				type : 'post',
				data : 'company='+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regtimeoutInvests:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/fund/verifyCompanyRun",
				type : 'post',
				data : 'company='+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regemail:function(val){
		var ret = true;
		$.ajax({
			url : "/user/verifyUemail?uemail="+val,
			async:false,
			success:function(res){
				if(res !=1){
					ret =false;
				}
			},
			error:function(){
				ret = false;
			}
		});
		return ret;
	},
	companyName:function(val){
		var obj={};
		obj.ret = true;
		obj.message = '';
		val = val.trim();
		val = encodeURI(val);
		$.ajax({
			url : "/member/getCompany?company_name="+val,
			async:false,
			success:function(res){
				if(res.code == 200){
					obj.message = res.data.id;
				}else{
					obj.ret = false;
				}
			},
			error:function(){
				obj.ret = false;
			}
		});
		return obj;
	},
	equal:function(val,nameId){
		if(val !==$(nameId).val())
			return false;
		return true;
	},
	notempty:function(val){
		if($.trim(val) ==='')
			return false;
		return true;
	},
	len:function(val,minlen,maxlen){
		if(val.length<minlen || val.length>maxlen)
			return false;
		return true;
	},
	cha:function(val,reg){
		if(new RegExp(reg).test(val))
			return true;
		return false;
	},
	number:function(val){
		if(/^\d+$/.test(val))
			return true;
		return false;
	},
	user_name:function(val){

	},
	times:function(val,radix){
		return val%radix == 0;
	},
	cn_or_en:function(val){
		var reg = /^([\u4E00-\u9FA5]|[a-zA-Z])+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	firstplace_cn_or_num:function(val) {
		var reg = /^[\u4e00-\u9fa5|a-z|A-z]/i;
		if(reg.test(val))
			return true;
		return false;
	},
	floatNumber : function(val){
		var reg = /^\d+((\.{1}\d+)|\d?)$/;
		if(reg.test(val))
			return true;
		return false;
	},
	// 是数字或小数,小数最多可写两位小数
	numberFixed2 : function(val){
		var reg = /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/;
		if(reg.test(val))
			return true;
		return false;
	},
	cn : function(val){
		var reg = /^[\u4e00-\u9fa5]+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	filter : function(val){
		var reg = /^[0-9a-zA-Z_]{1,}$/;
		if(reg.test(val))
			return true;
		return false;
	},
	// pwd : 密码校验规则，至少包含 数字/字母/符号 中的两种。
	pwd : function(val){
		var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{1,}$/;
		if(reg.test(val))
			return true;
		return false;
	},
	reg_cn_letter_number : function(val){
		var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	reg_cn_len : function(val,minlen,maxlen){
		var len = val.replace(/[^\x00-\xFF]/g,'***').length;
		if(len<minlen || len>maxlen)
			return false;
		return true;
	},
	reg_cn_len2 : function(val,minlen,maxlen){
		var len = val.replace(/[^\x00-\xFF]/g,'**').length;
		if(len<minlen || len>maxlen)
			return false;
		return true;
	},
	email:function(val){
		if(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val))
			return true;
		return false;
	},
	mobile:function(val){
		if(!val) return false;
	  	val = val.replace(/\s+/g,'');

		if(/^(13\d|18\d|15\d|17\d|14\d|19\d|16\d)\d{8}$/.test(val))
			return true;
		return false;
	},
    notmobile:function(val){
		if(/1\d{10}/.test(val))
			return false;
		return true;
	},
	ID_card : function(val){
		val = $.trim(val);
		if(/(^\d{15}$)|(^\d{16}$)|(^\d{18}$)|(^\d{19}$)|(^\d{17}(\d|X|x)$)/.test(val))
			return true;
		return false;
	},
	numberRegion : function(val,min,max){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			max = max - 0;
			if(val > max || val < min) return false;

			return true;

		}else{
			return false;
		}
	},
	// 最大值 开区间
	numberMaxOpen : function(val,max){
		if(/\d+/.test(val)){
			val = val - 0;
			max = max - 0;
			return val < max;
		}else{
			return false;
		}
	},
	// 最大值 闭区间
	numberMaxClosed : function(val,max){
		if(/\d+/.test(val)){
			val = val - 0;
			max = max - 0;
			return val <= max;

		}else{
			return false;
		}
	},
	// 最小值 开区间
	numberMinOpen : function(val,min){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			return val > min;
		}else{
			return false;
		}
	},
	// 最小值 闭区间
	numberMinClosed : function(val,min){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			return val >= min;
		}else{
			return false;
		}
	},
	vcode:function(code,type){
		var ret = true;
		$.ajax(
			{
				url:"/vcode/check?type="+type+"&vcode="+code,
				async:false,
				success:function(res){
					if(res !=0){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	checkRegMobileCode:function(code,mobilenum){
		var ret = true;
		$.ajax({
            url:"/Usermobile/checkPhoneCode",
            data:{
                mobile:mobilenum,
                mobilecode:code
            },
            async:false,
            success:function(res){
                res = res*1;
                if(res>0){
                	ret = false;
                }
            },
            error:function(){
            	ret = false;
            }
        });
        return ret;
	},
	tyregistervcode:function(code){
		var ret = true;
		$.ajax(
            {
                url:"/ajax/checkVcode",
                type:"post",
                async:false,
                data:"type=register&code="+code,
                success:function(res){
                    if(res.code != 200){
                    	ret = false;
                    }
                },
                error:function(){
                	ret = false;
                }
            }
        );
        return ret;
	}
};

//验证元素
exports.valid = function(item){
	var $item = $(item),
		validResult = {};
	
	if($item[0] && $item[0].tagName.toUpperCase()==='FORM'){
		var items = $item.find('[data-valid]'),
			i = 0,
			l = items.length,
			ret = true;

		for(;i<l;i++){
			ret = exports.valid(items.eq(i));
			if(ret && ret.error){
				validResult = ret;
				break;
			}
		}
		return validResult;

	}else{
		var valid = $item.attr('data-valid'),
			configs = valid.split('|'),
			validFn,
			validParams,
			validConfig,
			i = 0,
			l = configs.length;

		for(;i<l;i++){
			validConfig = configs[i].split(':');
			validFn = validConfig[0];
			validParams = validConfig.slice(1);
			validParams.unshift($item.val());

			if(exports.api[validFn] && $.isFunction(exports.api[validFn])){
				var ret = exports.api[validFn].apply($item,validParams);
				if(typeof(ret) == 'object'){
					if(ret.ret == false){
						validResult = {
							error:1,
							element:$item,
							valid:validFn,
							message:ret.message
						};
						break;
					}else if(ret.ret == true){
						validResult = {
							error:0,
							element:$item,
							valid:validFn,
							message:ret.message
						};
					}
				}else{
					if(ret == false){
						validResult = {
							error:1,
							element:$item,
							valid:validFn
						};
						break;
					}else{
						validResult = {
							error:0,
							element:$item,
							valid:validFn
						};
					}
				}

			}
		}
	}
	return validResult;
}
},{}]},{},[2]);
