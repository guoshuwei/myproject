var resultCodeMap = {
	4100 : function(){
		_Fn.isLogin();
	}
}

module.exports = function(res){
	if(resultCodeMap[res.code]){
		resultCodeMap[res.code]();	
	}else if(res.code){
		_Fn.alert(res.message);
	}else{
		if(window[console] && window[console][log]){
			console.log('The ajax result code : "' + res.code +'" not define!');
		}
	}
	
}