
var cloud_ = function(){
	var default_ = {isPlaying: false};

	//创建随机数
	function numberRandom(maxNum,minNmum){
		if(!minNmum)minNmum = 0;
		if(!maxNum)maxNum = 0;
		if(maxNum <= minNmum) return 0;
		var _numberRandom = Math.round(minNmum + Math.random() * maxNum);
		return _numberRandom;
	};

	var loadmanage = function(loaders){

	};
	function setLoadmanage(loadmanage_){
		loadmanage = loadmanage_;
	}
	function play($container, cb, cbb, loaders, gameType){
		if(default_.isPlaying)
			return;
		default_.isPlaying = true;
		var $clouds = $container.find('img.random_supplier');
		loaders = loaders || [];
		if($clouds.length == 0){
			$container.data('isFirstTime', true);
			var logoHtml;
			if(_gonglueData.length > 0){
				$('#random_supplier').attr('src', '//img.p2peye.com'+_gonglueData[parseInt(numberRandom(_gonglueData.length - 1,0))].logo);
				//logoHtml = '<img class="random_supplier" src="//img.p2peye.com'+_gonglueData[parseInt(numberRandom(_gonglueData.length - 1,0))].logo+'" />';
			}else{
				$('#random_supplier').attr('src', "/styles/images/topic/xtyyh/mobile/logo_tianyan.jpg");
				//logoHtml = '<img class="random_supplier" src="/styles/images/topic/xtyyh/mobile/logo_tianyan.jpg" />';
			}
			//$container.append('<img class="cloud cloud_l" src="/styles/images/topic/xtyyh/mobile/cloud.png"/><img class="cloud cloud_r" src="/styles/images/topic/xtyyh/mobile/cloud.png"/><div class="hot_air_ball"><img class="hot_air_ball_bg" src="/styles/images/topic/xtyyh/mobile/loading.png"/>'+logoHtml+'<div class="processbar"><img class="bg" src="/styles/images/topic/xtyyh/mobile/processbar.png"><img class="slider" src="/styles/images/topic/xtyyh/mobile/processbar_slider.png"></div></div>');
		}else{
			$container.data('isFirstTime', false);
			/*if($clouds.parent().prev().hasClass('cloud_animate')){
			 return false;
			 }*/
			if(_gonglueData.length > 0){
				$clouds.attr('src', "//img.p2peye.com"+_gonglueData[parseInt(numberRandom(_gonglueData.length - 1,0))].logo);
			}else{
				$clouds.attr('src', "/styles/images/topic/xtyyh/mobile/logo_tianyan.jpg");
			}

		}
		var cloud_l = $container.find('img.cloud_l').removeClass('cloud_animate cloud_l_m cloud_l_e');
		var cloud_r = $container.find('img.cloud_r').removeClass('cloud_animate cloud_r_m cloud_r_e');
		var hot_air_ball = $container.find('div.hot_air_ball').removeClass('hot_ball_animate_in hot_ball_animate_out hot_air_ball_loading hot_air_ball_loaded').show();
		var slider = $container.find('img.slider').removeClass('slider_animate').css('left', 0);

		hot_air_ball.data('loaded', 'start').unbind('webkitTransitionEnd.hot_air_ball_loading mozTransitionEnd.hot_air_ball_loading MSTransitionEnd.hot_air_ball_loading oTransitionend.hot_air_ball_loading transitionend.hot_air_ball_loading');
		//slider.unbind('webkitTransitionEnd.slider_end mozTransitionEnd.slider_end MSTransitionEnd.slider_end oTransitionend.slider_end transitionend.slider_end');
		cloud_r.unbind('webkitTransitionEnd.cloud_r_e mozTransitionEnd.cloud_r_e MSTransitionEnd.cloud_r_e oTransitionend.cloud_r_e transitionend.cloud_r_e');
		setTimeout(function(){
			cloud_l.addClass('cloud_animate cloud_l_m');
			cloud_r.addClass('cloud_animate cloud_r_m');
			hot_air_ball.addClass('hot_ball_animate_in hot_air_ball_loading').one('webkitTransitionEnd.hot_air_ball_loading mozTransitionEnd.hot_air_ball_loading MSTransitionEnd.hot_air_ball_loading oTransitionend.hot_air_ball_loading transitionend.hot_air_ball_loading', function(){

				if(hot_air_ball.data('loaded') != 'start')
					return;
				hot_air_ball.data('loaded', 'loading');
				slider.addClass('slider_animate');
				//slider.addClass('slider_animate_in slider_half');

				/*var $games = $('#games');
				 if($games.children().length > 0){//$games
				 $('#dabeijing').css({
				 'z-index': 0
				 }).attr('src', "/styles/images/topic/xtyyh/mobile/board_bg.png");
				 }else if(gameType == 'laohuji' || gameType == 'zajindan'){
				 $('#dabeijing').css({
				 'z-index': 10
				 }).attr('src', "/styles/images/topic/xtyyh/mobile/laohuji/laohuji_bg.jpg");
				 }*/
				loadmanage(loaders,function(){

				},function(a,b){
					if((b/a*100) == 100){

						cb && cb();
						slider.css('left', b/a*69.8+'%');
						//slider.addClass('slider_animate_out slider_end').one('webkitTransitionEnd.slider_end mozTransitionEnd.slider_end MSTransitionEnd.slider_end oTransitionend.slider_end transitionend.slider_end', function(){
						setTimeout(function(){
							hot_air_ball.addClass('hot_ball_animate_out hot_air_ball_loaded')/*.one('webkitTransitionEnd.hot_air_ball_loaded mozTransitionEnd.hot_air_ball_loaded MSTransitionEnd.hot_air_ball_loaded oTransitionend.hot_air_ball_loaded transitionend.hot_air_ball_loaded', function(){
							 //setTimeout(function() {
							 hot_air_ball.hide();
							 //}, 1000);
							 });*/
							cloud_l.addClass('cloud_l_e');
							//setTimeout(function(){
							cloud_r.addClass('cloud_r_e').one('webkitTransitionEnd.cloud_r_e mozTransitionEnd.cloud_r_e MSTransitionEnd.cloud_r_e oTransitionend.cloud_r_e transitionend.cloud_r_e', function(){
								//setTimeout(function() {
								if (hot_air_ball.data('loaded') != 'loading')
									return;
								cbb && cbb();
								default_.isPlaying = false;
								hot_air_ball.data('loaded', 'end');
								var isFirstTime = $container.data('isFirstTime');
								hot_air_ball.hide();
								//});
							});
						}, 50);
						//}, 10);
						///});
					}else{

						slider.css('left', b/a*69.8+'%');
					}
				});

			});

		}, 100);



	}

	return {
		play: play,
		setLoadmanage: setLoadmanage
	};
}();

exports.play = cloud_.play;
exports.setLoadmanage = cloud_.setLoadmanage;