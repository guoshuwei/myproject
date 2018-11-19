var
    app = require('./app');
$("body").on('tap','[role-tap="tipmobile"]',function(){
	_Fn.alert("请先绑定手机号")
})