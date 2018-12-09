var Dialog = require('./Dialog'),
	uid = require('./uid'),
	_ApiContainer = {};


//监听Api
exports.listen = function(name,fn,key){
	if(!_ApiContainer[name])
		_ApiContainer[name] = {};

	if(!key)
		key = uid.create();

	_ApiContainer[name][key] = fn;

}

exports.remove = function(name,key){
	if(!_ApiContainer[name])
		return;

	delete _ApiContainer[name][key];
}

//监听dialog
$('body').on('click','[role=dialog]',function(){
	var $this = $(this),
		api = $this.attr('role-api');

	if(!api || api=='')
		return;
	else
		params = api.split('|');

	if(typeof params !=='undefined'){
		api = params[0];
		params = params[1]?params[1].split(','):[];
	}else{
		return;
	}
	if(_ApiContainer[api])
		for(var p in _ApiContainer[api])
			try{
				if(!_ApiContainer[api]._dialog)
					_ApiContainer[api]._dialog = new Dialog();

				_ApiContainer[api]._dialog.event_source	 = $this;
				_ApiContainer[api][p].apply(_ApiContainer[api]._dialog,params);
			}catch(e){}
});


