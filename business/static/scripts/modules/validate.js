
exports.api = {
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
		// console.log(val);
		if(new RegExp(reg).test(val))
			return true;
		return false;
	},
	number:function(val,oldval){
		if(oldval){
			if(val==oldval){
				return true;
			}else{
				return false;
			}
		}else{
			if(/^\d+$/.test(val))
				return true;
			return false;
		}
	},
	notnumber:function(val){
		if(/^\D+$/.test(val))
			return true;
		return false;
	},
    ip:function(val){
		if(/^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(val))
			return true;
		return false;
	},
    serverip:function(val){
		if(/^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(val))
			return true;
		return false;
	},
	user_name:function(val){

	},
	floatNumber : function(val,num){
		if(num){
			if(num == 1){
				var reg = /^\d+(\.\d{1})?$/;
			}
			if(num == 2){
				var reg = /^\d+(\.\d{1,2})?$/;
			}
		}else{
			var reg = /^\d+((\.{1}\d+)|\d?)$/;
		}
		
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
	netname : function(val){
        var reg = /([https|http|ftp|rtsp|mms+:\/\/])?([www]\.)?[a-z]\.[com|cn|com.cn|net]/
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
	email:function(val){
		 if(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val))
		 return true;
		 return false;
	},
	mobile:function(val){
		if(!val) return false;
	  	val = val.replace(/\s+/g,'');
        
		if(/^(13\d|18\d|15\d|17\d|14\d)\d{8}$/.test(val))
			return true;
		return false;
	},
    notmobile:function(val){
		if(/1\d{10}/.test(val))
			return false;
		return true;
	},
	ID_card : function(val){
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
	multiple : function(val,base){
		if(val%base == 0){
			return true;
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
	},money:function(val){
		if(/^\d+(\.[\d]{1,2})?$/.test(val))
			return true;
		return false;
	},section1_3:function(val){
		if(/^[123]$/.test(val))
			return true;
		return false;
	},
    limitNum : function(val,max){
		if(/\d+/.test(val)){
			val = val - 0;
			max = max - 0;
			if(val > max) return false;

			return true;

		}else{
			return false;
		}
			
	},notZero:function(val){
		if(/[0]/.test(val))
			return false;
		return true;
	},
	urlCheck : function(val){
		var reg = /^(http:\/\/|https:\/\/)/
		if(reg.test(val))
			return true;
		return false;
	},
	minExceptZero : function(val,min){
		if(/\d+/.test(val)){
			if(val-0 == 0){
				return true
			}else{
				val = val - 0;
				min = min - 0;
				if(val < min) return false;
				return true;
			}
		}else{
			return false;
		}
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
				// console.log(i,validConfig,validFn);
				if(ret == false){
					validResult = {
						error:1,
						element:$item,
						valid:validFn
					};
					break;
				}
			}
		}
	}
	return validResult;
}