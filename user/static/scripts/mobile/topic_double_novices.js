var
    app = require('./app');

$('body')
.on('tap','.fn-backIndex',function(){
	_Fn.fireApp({
	    trigger : 'backhome'
	});
});


