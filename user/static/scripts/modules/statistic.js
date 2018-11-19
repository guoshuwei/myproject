
var body = document.body,
	$configure = {},
	$x,$y;


exports.configure = function(config){

	for(var p in config)
		$configure[p] = config[p];

	return this;
}


exports.run = function(){
	listener(body);
}

exports.removeListen = function(name){
	if(name)
		delete config.listener[name];
	else
		removeEvent(body,listener)
}

function listener(){

	if($configure['type']['m'])
		addEvent(body,'mousemove',function(e){
			$x = e.pageX;
			$y = e.pageY;

		});

	if($configure['type']['c'])
		addEvent(body,'mousedown',function(e){

		});

}


function addEvent(el,name,fn){

	if(typeof fn !=='function')
		return;

	if(el.addEventListener)
		return el.addEventListener(name,fn,false);
	else
		el.attachEvent('on'+name,fn);
}

function getPath(el){

}


function getMouse(){

}