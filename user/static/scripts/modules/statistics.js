/*
* 事件统计
* 依赖百度统计
* worker liujinqiang
* 2016-11-15
*/
(function($){

function trackEvent(that){
	var tracker,trackkey,trackType = 'click';
	tracker = that.attr('track-event');
	if(tracker){
		if(tracker == 'ignore'){
			return;
		}else{
			tracker = tracker.split(',');
		}

		if(tracker.length > 1){
			trackType = tracker[1];
		}
		trackkey = tracker[0];

		_hmt.push(['_trackEvent',trackkey,trackType,'p2peye']);
		return;

	}
	tracker = that.parents('[track]');
	if(!tracker.length)return;
	tracker = tracker.attr('track').split(',');
	if(tracker.length > 1){
		trackType = tracker[1];
	}
	trackkey = tracker[0];

	_hmt.push(['_trackEvent',trackkey,trackType,'p2peye']);
}
$('body')
.on('click','a',function(){
	var that = $(this);
	if(!window._hmt){
		return console.log('百度统计未成功加载，请检测百度统计是否安装！');
	}
	trackEvent(that);
});

exports.fire = function(category, action){
	if(!window._hmt){
		return console.log('百度统计未成功加载，请检测百度统计是否安装！');
	}
	action = action ? action : 'click';
	_hmt.push(['_trackEvent',category,action,'p2peye']);
}
})(jQuery);