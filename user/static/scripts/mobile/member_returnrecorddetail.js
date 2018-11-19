var
    app = require('./app');
$('body').on('tap','[role-tap=remind]',function(){
	_Fn.alert($(this).data("text"))
})