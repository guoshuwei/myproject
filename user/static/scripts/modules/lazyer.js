var lazyload = function(){ //惰性加载
	var
      tempArray = [],
      winHeight = $(window).height(),
      reladyed = function(ele){
		   if(ele&&ele.length>0){
			   var
				   offsettop = ele.offset().top,
				   endPx  = winHeight + $(window).scrollTop();
			   if(endPx >= offsettop) return true;
			   return false;
		   }else{
			   return;
		   }

      };
      $('.lazyer').each(function(){
      	var
      	that = this,
      	$that = $(this);
      	checkLazy($($that),function(){
      		if(that.nodeName == 'IMG'){
      			$that.attr('src',$that.attr('data-data'));
      		}else{
      			$that.find('img').each(function(){
      				if($(this).attr('data-data')){
      					$(this).attr('src',$(this).attr('data-data'));
      				}
      			})
      		}
      	});
      })

    function init(){
    	if(tempArray.length == 0) return;
		$(tempArray).each(function(index){
				var that = this;
				if(this.status) return;
				if(reladyed(that.lazyer)){
					that.status = true;
					that.callback();
				}
		})
    }

	function checkLazy(lazyer,callback){
			if(reladyed(lazyer)){
				callback();
			}else{
				tempArray.push({
					lazyer : lazyer,
					callback : callback,
					status : false
				})
			}
	}

	$(window).scroll(init);

	(function(){
		init();
	})
	return {
		bind : function(lazyer,callback){
			checkLazy(lazyer,callback);
		}
	}
}();


exports.bind = lazyload.bind;

