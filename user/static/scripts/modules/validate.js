
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