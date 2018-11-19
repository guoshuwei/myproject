//页面逻辑
var _blankFn = function(){};

function getScript(src,onload,nocache){

	var doc = document,
	domHead = doc.getElementsByTagName('head')[0]||doc.documentElement;

	var script = doc.createElement('script');

	script.type = 'text/javascript';

	function complete(){
		onload && 
			typeof onload === 'function' &&
			onload();

		domHead.removeChild(script);
	}
	
	script.onload = complete;
	//script.onerror = onerror;

	script.onreadystatechange = function () {
		var state = this.readyState;
		if (state === 'loaded' || state === 'complete') {
			script.onreadystatechange = _blankFn;
			complete();
		}
	}

	script.async = 'async';
	script.src = src + (nocache?'?r='+new Date().getTime():'');
	domHead.insertBefore(script,domHead.children[0]);
}

//save to api
exports.getScript = getScript;

//加载页面js
var page = $('html').attr('name');
getScript('//'+STATIC_DOMAIN+'/scripts/page/'+page+'.min.js',function(){
	$(function(){
		//执行页面模块
		mt.module('page/'+page);
	});
});