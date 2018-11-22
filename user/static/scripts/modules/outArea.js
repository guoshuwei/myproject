exports.listen = function(eles,callback){

	var isjQuery = eles instanceof jQuery;

	if(!isjQuery && !eles) return;

	if(isjQuery && eles.length == 0) return;

	var isArray = function(){

		if(Object.prototype.toString.call(eles) == '[object Array]'){
			return true;
		}else{
			return false;
		}
	}();

	var isInarea = function(mouse){

        var out = function(el){

        	var ele = {
	            startX : el.offset().left,
	            startY : el.offset().top,
	            endX : el.offset().left + el.width(),
	            endY : el.offset().top + el.height()
	        }

	        if(mouse.x < ele.startX || mouse.y < ele.startY || mouse.x > ele.endX || mouse.y > ele.endY){
	            return true;
	        }else{
	        	return false;
	        }

        }

        if(!isArray){

        	var result = out(eles);

        	return result;

        }

        if(isArray){

        	var flag = true;

        	for(var i=0;i<eles.length;i++){

        		var result = out(eles);

        		if(!result){

        			flag = false;

        			break;
        		}

        	}

        	return flag;
        }

	}


	$('body').one('click',function(e){
		
        
        if(isInarea({x : e.pageX,y:e.pageY})){

        	callback();
        }

	})

}