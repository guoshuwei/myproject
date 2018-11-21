/*******************************插件新功能-设置插件validator的默认参数*****************************************/
$.validator.setDefaults({
    /*关闭键盘输入时的实时校验*/
    onkeyup: null,
    /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
    success: function(label){
        /*label的默认正确样式为valid，需要通过validClass来重置，否则这里添加的其他样式不能被清除*/
        label.text('').addClass('valid');
    },
    /*重写校验元素获得焦点后的执行函数--增加[1.光标移入元素时的帮助提示,2.校验元素的高亮显示]两个功能点*/
    onfocusin: function( element ) {
        this.lastActive = element;
        
        /*1.帮助提示功能*/
        this.addWrapper(this.errorsFor(element)).hide();
        var tip = $(element).attr('tip');
        if(tip && $(element).parent().children(".tip").length === 0){
            //$(element).parent().append("<label class='tip'>" + tip + "</label>");
            // $("<label class='tip'>" + tip + "</label>").insertAfter(element);
            $(element).parent().next("span").append("<label class='tip'>" + tip + "</label>");
        }
        
        /*2.校验元素的高亮显示*/
        $(element).addClass('highlight');

        // Hide error label and remove error class on focus if enabled
        if ( this.settings.focusCleanup ) {
            if ( this.settings.unhighlight ) {
                this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
            }
            this.hideThese( this.errorsFor( element ) );
        }
    },
    /*重写校验元素焦点离开时的执行函数--移除[1.添加的帮助提示,2.校验元素的高亮显示]*/
    onfocusout: function( element ) {
        /*1.帮助提示信息移除*/
        $(element).parent().children(".tip").remove();

        /*2.校验元素高亮样式移除*/
        $(element).removeClass('highlight');
        
        /*3.替换下面注释的原始代码，任何时候光标离开元素都触发校验功能*/
        this.element( element );
        
        /*if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
            this.element( element );
        }*/
    }
});

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
$.extend($.validator.messages, {
    required: "必填",
    remote: "请修正此字段",
    // email: "请输入有效的电子邮件地址",
    email: "邮箱非法",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入有效的数字",
    digits: "只能输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "两次输入不同",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format("最多{0}字"),
    minlength: $.validator.format("最少{0}字"),
    rangelength: $.validator.format("{0}到{1}字"),
    range: $.validator.format("{0}到{1}之间的数值"),
    max: $.validator.format("不大于{0}的数"),
    min: $.validator.format("不小于{0}的数")
});


$(function(){
    // 手机号码验证    
    jQuery.validator.addMethod("isMobile", function(value, element) {    
        var length = value.length;    
        return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));    
    }, "手机号码格式不对");

    // 电话号码验证    
    jQuery.validator.addMethod("isPhone", function(value, element) {    
        //var tel = /^(\d{3}-)(\d{3,4}-?)?\d{7,9}$/g;
        //中国城市电话区号为3位或4位，以0开头 
        //var tel = /^(\d{3}-)(\d{3,4}-)(\d{7,9})$/g;   
        var tel = /^(\d{3}-)(0\d{2,3}-)(\d{7,9})$/g;
        return this.optional(element) || (tel.test(value));    
    }, "请正确填写您的电话号码。");

    // 联系电话(手机/电话皆可)验证   
    jQuery.validator.addMethod("isTel", function(value,element) {   
        var length = value.length;   
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;   
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;       
        return this.optional(element) || tel.test(value) || (length==11 && mobile.test(value));   
    }, "请正确填写您的联系方式"); 

    // IP地址验证   
    jQuery.validator.addMethod("ip", function(value, element) {    
        // return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
        return this.optional(element) || /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value);
    }, "ip格式不正确");

    // 是否合法的用户名   
    jQuery.validator.addMethod("username", function(value, element) {    
        return this.optional(element) || /^[a-zA-Z0-9_]{5,20}$/.test(value);
    }, "用户名非法(5-20个字母、数字、下划线)");

    // 是否合法的群组名   
    jQuery.validator.addMethod("groupname", function(value, element) {    
        return this.optional(element) || /^[a-zA-Z]{5,20}$/.test(value);
    }, "群组名非法(5-20个字母)");

    // 判断正整数
    jQuery.validator.addMethod("isIntGtZero", function(value, element) {
        return this.optional(element) || /^[0-9]*[1-9][0-9]*$/.test(value);
    }, "必须是大于0的整数");

    // 非负整数
    jQuery.validator.addMethod("isIntGEZero", function(value, element) {
        return this.optional(element) || /^(0)|[1-9][0-9]*$/.test(value);
    }, "非法");

    // IP地址验证2   
    jQuery.validator.addMethod("isIp", function(value, element) {    
        // return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
        return this.optional(element) || /^(((1?\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((1?\d{1,2})|(2[0-4]\d)|(25[0-5]))$/.test(value);
    }, "ip非法");

    // 日期验证
    jQuery.validator.addMethod("isDate", function(value, element) {    
        // return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
        return this.optional(element) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(value);
    }, "日期非法");

    // 时间验证
    jQuery.validator.addMethod("isTime", function(value, element) {    
        // return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
        return this.optional(element) || /^(0\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/.test(value);
    }, "时间非法");

    // 非负整数和正小数（最多后两位）^[0-9]+([.]{1}[0-9]{1,2})?$/
    jQuery.validator.addMethod("isValidNum", function(value, element) {
        return this.optional(element) || /^\d+([.]{1}[0-9]{1,2})?$/.test(value);
    }, "非法");

    // 身份证号码验证
    jQuery.validator.addMethod("isIdCardNo", function(value, element) { 
      // var idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;   
      return this.optional(element) || isIdCardNo(value);    
    }, "身份证号非法");

    // 身份证号码验证
    jQuery.validator.addMethod("isLicenseNo", function(value, element) { 
      // var idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;   
      return this.optional(element) || isLicenseNo(value);    
    }, "营业执照号码非法"); 

    //身份证号码的验证规则  
    function isIdCardNo(code){   
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var pass= true;
        
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            pass = false;
        }
        
       else if(!city[code.substr(0,2)]){
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    pass =false;
                }
            }
        }
        return pass;
    }

    //营业执照号码的验证规则  
    function isLicenseNo(code){   
        if ( /^[0-9]{15}$/.test(code) ){
            var license_no14       = code.substr(0, 14);// 获取营业执照注册号前14位数字用来计算校验码  
            var license_no_last    = code.substr(14);// 获取营业执照号的校验码  

            var ti = 0;  
            var si = 0;    // pi|11+ti  
            var cj = 0;    // (si||10==0？10：si||10)*2  
            var pj = 10;   // pj=cj|11==0?10:cj|11 
            var checkcode = -1; 
            for (var i = 0; i < 14; i++) { 
                ti = parseInt(license_no14[i]);
                pj = ((cj % 11) == 0) ? 10 : (cj % 11);
                si = pj + ti;
                cj = (0 == si % 10 ? 10 : si % 10) * 2;
                if( i == 13 ){
                    pj = (cj % 11) == 0 ? 10 : (cj % 11);
                    checkcode = (pj == 1) ? 1 : (11 - pj);
                }
            }
            
            if( license_no_last == checkcode ){// 比较 填写的营业执照注册号的校验码和计算的校验码是否一致  
                return true;
            }else{
                return false;
            }   
        }else{
            return false;         
        }  
    }  
});
