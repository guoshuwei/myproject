
var
	app = require('./app'),
	dialogUi = require('../modules/dialogUi'),
	template = require('../modules/template'),
	formMod = require('../modules/form'),
	timedownLock = false,
	windowHeight = $('body'),
	bluck=true,
	circleTimer = null;

function orient(e) {
	fnorient();
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orient, false);
function fnorient(){
	if(window.orientation==0||window.orientation==180){
		//竖屏 return false;
		$('.traverse-ban').hide();
	}else if(window.orientation==-90||window.orientation==90){
		setTimeout(function(){
			$('.traverse-ban').show();
		},500);

	}
}
fnorient();

//F码焦点滚动
$('.subcode .txt').on('focus',function(){
	var headerHeight=$('header').height();
	var bannerHeigth=$('.banner').height();

	$('body').scrollTop(headerHeight+bannerHeigth);
});
$("[role='activeover']").on('click',function(){
	window._Fn.alert('活动已结束');
	return;
});

//F码激活验证
formMod.listen('/topic/verifycode',{

	validError:function(validResutl){

		var item  = validResutl.element;

		if(item.attr('name')=='code'){

			if(validResutl.valid == 'notempty'){

				item.attr({'placeholder':'F码不能为空'});

			}

		}

	},
	success:function(result){
		if(result.data.code == 200){

			var num = $('.subcode .tit .em').text();

			$('.subcode .tit .num').text(num * 1 + 1);

			window._Fn.alert('F码激活成功！');

			$('.subcode input.txt').val('');

		}else{

			window._Fn.alert(result.data.message);

		}

	},
	error:function(){

	}

});
//开启宝箱
function fnOpenchest(){
	var iNum=$('.floatcover .fcode .item').length;
	var block=false;
	var timer=null;
	var inittimer=null;
	var R=$('.fcode').outerWidth()/2;
	function init(){				//初始化F码位置
		$('.fcode').show();
		$('.fcode').removeClass('deg');
		for (var i = 0; i < iNum; i++) {
			startmove($('.floatcover .fcode .item').eq(i),0);
		}

		$('.fcode .item').css({'top':0,'left':'50%'});
		$('.alertbox .chestclose').css({'opacity':1});
	}
	function fnChest(){				//宝箱开启
		if($('.floatcover').is(":hidden")){
			$('.floatcover').show();
			for (var i = 0; i < iNum; i++) {
				startmove($('.floatcover .fcode .item').eq(i),i*360/iNum);//F码位置从一个变为八个
			}
			setTimeout(function(){
				$('.fcode').addClass('deg');//F码旋转


			},200);
		}
		setTimeout(function(){
			$('.fcode').hide();
			$('.fcode').next().addClass('chestopen');	//宝箱开启
			window._Fn.loading().show($('.close'));		//loading
		},1000);
	}

	$('body').on('click','.treasure-box .btn',function(){	//请求数据;
		if($(this).hasClass('logined')){

			var times = $('.treasure .num').html() * 1;

			if(times <= 0 || isNaN(times)){

				window._Fn.alert('剩余F码为 0 无法开启宝箱');

				return;

			}

			fnChest();
			$.ajax({
				url: '/topic/award',

				type: 'post',

				data:'hid=2',

				dataType: 'json',

				success: function (msg) {

					if(msg.code==200){
						window._Fn.loading().hide();
						var num = $('.treasure .em').text() * 1;

						$('.treasure .num').text(num - 1);
						setTimeout(function(){
							fngetPize(msg);				//获取奖品;
						},1500);

					}else{
						window._Fn.alert(msg.message);
					}
				},

				error: function () {

					locked = false;


				}

			});
		}else{
			return;
		}

	});

	function fngetPize(msg){
		window._Fn.loading().hide(function(){
			$('.alertbox .chestclose').stop().animate({'opacity':0},1000);
			$('.alertbox .chestopen').stop().animate({'opacity':1},1000);
		});
		var contents = template.render("prizealertTpl",msg.data);
		$('.floatcover').append(contents);
		setTimeout(function(){
			$('.alertchest').fadeIn();
			$('.alertbox .chestopen').stop().animate({'opacity':0},500);

		},1000);
	}
	$('body').on('click','.alertchest .continue',function(){
		$('.floatcover').fadeOut();
		$('.alertchest').hide();
		$('.floatcover').children('.alertchest').remove();
		inittimer=setTimeout(init,400);
	});
	function startmove(obj,iTarget){
		var start=0;
		if(isNaN(obj.attr('data-deg'))){
			start=0;
		}else{
			start=obj.attr('data-deg');
		}

		var count=Math.floor(500/16);
		var n= 0;
		var dis=iTarget-start;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			var b=1-n/count;

			var cur=start+dis*(1-Math.pow(b,3));

			var x=R+Math.sin(cur*Math.PI/180)*R;

			var y=R-Math.cos(cur*Math.PI/180)*R;

			var obja=cur;
			obj.attr('data-deg',cur);
			obj.css({'left':x,'top':y});
			if(n==count){
				clearInterval(obj.timer);
			}
		},16);

	}
}
fnOpenchest();
//奖池抽奖关闭弹层
function luckDraw(){
	$('.floatluck .btn').bind('click',function(){

		$('.floatluck').fadeOut();

		$('section').children('.floatluck').remove();

	});
	$('.floatluck .closewindow').bind('click',function(){

		$('.floatluck').fadeOut();

		$('section').children('.floatluck').remove();

	});
}
//分享弹层
function fnshare(){
	$('.invited .btn').on('click',function(){
		if($(this).hasClass('logined')){

			$('.myshare').fadeIn();
		}

	});
	$('.myshare').on('click',function(){
		$('.myshare').fadeOut();
	});


}
fnshare();
//收货地址验证
formMod.listen('/topic/goodsreceipt',{
	validSuccess:function(validResutl){
		var item  = validResutl.element;
	},
	validError:function(validResutl){
		var item  = validResutl.element;
		if(item.attr('name')=='consignee'){
			if(validResutl.valid == 'notempty'){
				item.attr({'placeholder':'收货人不能为空'});
			}
		}
		if(item.attr('name')=='address'){
			if(validResutl.valid == 'notempty'){
				item.attr({'placeholder':'收货地址不能为空'});
			}
		}
	},
	cleanup:function(item){
		if(item.attr('name')=='data[phone]'){
			item.css({'color':'#383838'});
		}
	},
	success:function(result){
		if(result.data.code == 200){
				window._Fn.alert('提交成功！');

				window.location.reload();
		}else{

			window._Fn.alert(result.data.message);

		}

	},
	error:function(){
	}
});
//顶部跑马灯
function fnMarqee(){
	window.onload=function(){
		var sHtml=$('.marqee ul').html();
		var W=0;
		var left=0;
		var result=0;
		$('.marqee ul').html(sHtml+=sHtml);
		$('.marqee ul .item').each(function(ele,i){
			result+=$(this).outerWidth();
		});
		$('.marqee ul').css({'width':result});
		W=result/2;
		setTimeout(fnMove,30);

		function fnMove(){
			left-=2;
			$('.marqee ul').css({'left':(left%W-W)%W});
			setTimeout(fnMove,30);
		}
	};

}
fnMarqee();
var locked=false;
//奖池抽奖
function prizeCircle(){
	var

		circleStep = 0,

		circleTime = 80,

		times = $('.luck-draw span').html() * 1,

		step = document.getElementById('step'),

		circleAmount = 3,

		index = 0,

		statusCircle = 0;

	if(times <= 0 || isNaN(times)){

		window._Fn.alert('抱歉，请先获得抽奖机会');

		return;

	}

	window._Fn.loading().show($('.luck-draw'));

	if(locked)return;

	step.className = 'item pos1';

	$(step).fadeIn();

	function _prizeCircle(data,callback){

		locked = true;

		circleTimer = setTimeout(function(){

			if(circleStep >= 16){

				circleStep = 1;

			}else{

				circleStep ++;

			}

			if(circleTime <= 20){

				circleTime = 20;

			}else{

				circleTime -= 5;

			}

			statusCircle ++;

			step.className = 'item pos' + circleStep;

			if(statusCircle == index + circleAmount * 16){

				$(step).fadeOut();

				clearTimeout(circleTimer);

				locked = false;

				callback();
				
				return;
			}

			

			_prizeCircle(data,callback);

		},circleTime)

	}
	//请求奖品数据
	getPrizeDate(function(callback,data) {

		if(data.award_type && data.award_type == 22){

			index = $('.luck-draw .item[data-type=22]').index();

		}else if(data.award_type && data.award_type != 20){

			index = $('.luck-draw .item[data-id='+data.id+']').index();

		}else{

			index = $('.luck-draw .item[data-type=20]').index();

		}
		_prizeCircle(data,function(){

			callback();

		});

	});	

	function getPrizeDate(callback){

		$.ajax({

			url: '/topic/award',

			type: 'post',

			data:'hid=1',

			dataType: 'json',

			success: function (msg) {
				var contents=null;
				if(msg.code==200){
					callback(function(){

						if(msg.data.award_type==20){

							contents = template.render("loansitemTpl", msg.data);

						}else{

							contents = template.render("prizemessage", msg.data);
						}


						$('section').append(contents);

						luckDraw();

						$('.luck-draw span').html(times - 1);

					},msg.data)

				}else{

					window._Fn.alert(msg.message);

				}

				window._Fn.loading().hide();
			},

			error: function () {

				window._Fn.loading().hide();

			}

		});

	}

}
//奖池抽奖按钮事件
$('.luck-draw .btn').on('click',function(){

	if($(this).hasClass('logined')){
		
		prizeCircle();
		
	}else{
		return;
	}

});
//倒计时
function timeDown(timeing,countDown,that){//(倒计时秒差，倒计时显示容器)

	if(timeing <= 0 || timeing =='')return;

	var hourMinute = parseInt(timeing / 60),

		hour = parseInt(hourMinute / 60),

		minute = hourMinute - hour * 60,

		second = timeing % 60,

		timer = null;

	function numberDown(hour,minute,second){

		clearTimeout(timer);

		if(second == 0){

			if(minute >0){

				second = 59;

				minute = minute - 1;

			}else if(minute ==0){

				if(hour>0){

					hour = hour - 1;

					minute = 59;

					second = 59;

				}else if(hour == 0){

					hour = 0;

					minute = 0;

				}

			}

		}else{

			second = second - 1;

		}

		if(hour == 0 && minute == 0 && second == 0){//倒计时完成

			var state = that.attr('data-state');

			if(state == 0){//已经结束

			}else if(state == 1 && !timedownLock){//即将开始

				var contents = template.render("openboxTpl");

				var _numbox = that.find('[role=countdown]');

				that.children('.treasure-box .open-time').find('span').text('(进行中)');

				that.children('.treasure-box .btnbox').html(contents);

				timeDown(1800,countDown,_numbox);

				timedownLock = true;


			}else if(state == 2){//进行中

				var contents = template.render("openboxingTpl");

				that.children('.treasure-box .open-time').find('span').text('(已结束)').addClass('status-will');

				that.children('.treasure-box .box').find('.desc').html('已结束');

				that.children('.treasure-box .btnbox').html(contents);

			}

			return;

		}

		timer = setTimeout(function(){

			numberDown(hour,minute,second);

		},1000);

		var hourText = hour > 9 ? hour:'0' + hour,

			minuteText = minute > 9 ? minute:'0' + minute,

			secondText = second > 9 ? second:'0' + second;

		countDown.html(hourText+':'+minuteText+':'+secondText);

	}

	numberDown(hour,minute,second);

}

function timeDownHander(){

	$('.treasure-box .item').each(function(){

		var

			that = $(this),

			timeing = Number($(this).attr('data-time')),

			countDown = $(this).find('[role=countdown]');

		timeDown(timeing,countDown,that);

	})

}
timeDownHander();
//ui交互
function fnTouchDownUi(){
	$('body').on('touchstart','.treasure .activation',function(){
		$('.treasure .activation').css({'color':'#e388b6','border':'2px solid #e388b6'});
	}).on('touchend','.treasure .activation',function(){
		$('.treasure .activation').css({'color':'#fff','border':'2px solid #fff'});
	}).on('touchstart','.treasure-box .on',function(){
		$('.treasure-box .on').css({'boxShadow':'none'});
	}).on('touchend','.treasure-box .on',function(){
		$('.treasure-box .on').css({'boxShadow':'none'});
	}).on('touchstart','.chance .btn',function(){
		$('.chance .btn').css({'background':'#d13178'});
	}).on('touchend','.chance .btn',function(){
		$('.chance .btn').css({'background':'#e9453e'});
	}).on('touchstart','.invited .btn',function(){
		$('.invited .btn').css({'background':'#d13178'});
	}).on('touchend','.invited .btn',function(){
		$('.invited .btn').css({'background':'#e9453e'});
	}).on('touchstart','.partner-plat .btn',function(){
		$('.partner-plat .btn').css({'background':'#c11511'});
	}).on('touchend','.partner-plat .btn',function(){
		$('.partner-plat .btn').css({'background':'#ed2d4c'});
	}).on('touchstart','.prize-rule .btn',function(){
		$('.prize-rule .btn a').css({'background':'#c11511'});
	}).on('touchend','.prize-rule .btn',function(){

		$('.prize-rule .btn a').css({'background':'#ed2d4c'});
	});
}

fnTouchDownUi();




