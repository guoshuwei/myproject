var
    app = require('./app'),
    countDown = require('../modules/countDown'),
     dataUrl = window.location.href,
    wxReady = require('../modules/jssdk'),
    template = require('../modules/template');
 var
 	click='tap',
 	windowH=window.screen.height,
 	nowTime = $('body').attr('data-nowtime'),
    uid = $('body').attr('uid'),
    layerRule=$('[role-show=layerrule]'),
    layerPrize=$('[role-show=layerprize]'),
    _body=$("body"),
    prizeDataChange=$('[role-obtain=change]'),
    layerResule=$('[role-prize=show]'),
    prizeType=$(".prize-item"),
    navItem=$('[role-tap=swipernav]'),
    navFixed=$('[role-operation=nav]'),
    navadden=$('.ui-nav-added'),
    explosion11=$('[role-parent=explosion11]'),
    explosion15=$('[role-parent=explosion15]'),
    counttrailer11=$('.counttrailer11'),
    counttrailer15=$('.counttrailer15'),
    lumpFlashing=$('[role-lump="flashing"]'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    _main=$("main"),
    _mainTop=_main.offset().top,
    _theme=$(".ui-theme"),
    navHeight=navFixed.outerHeight(true),
    navTop=$('.ui-nav').offset().top,
    prizeNum=0,
    prizeNumResule=-2,
    mainScroll=0,
     prizeOff=false,
     _timer,
     prizedrawId=[],_timedraw,luckdrawresult,lumpTimer;
  var _activityend=function(){//活动时间过了返回true ,活动时间内是false
        if(1512057599-nowTime<=0){
            return true
        }else{
            return false;
        }
    }(),
    _nowRedpacket=function(){//双11当天
        if(nowTime>1510329599&&nowTime<1510415999){
            return true
        }else{
            return false;
        }
    }(),
    _startActivity=function(){//到活动时间
        if(nowTime>1509465600){
            return true
        }else{
            return false;
        }

    }()
var _getStage = function(){
	var
	    t = new Date($('body').attr('data-nowtime') * 1000),
	    year  = t.getFullYear(),
	    month = t.getMonth() + 1,
	    day   = t.getUTCDate(),
	    h     = t.getHours(),
	    m     = t.getMinutes(),
	    s     = t.getSeconds();

	    return {
	        year: year,
	        month: month,
	        day: day,
	        hour: h,
	        minutes: m,
	        seconds: s
	    }
}();
if(!_activityend&&_startActivity){
    if(_getStage.hour == 14 && _getStage.minutes >= 55 || _getStage.hour > 14){
        getData(explosion15,15);
     }else {
        getData(explosion11,11);
     }

}
//导航
swiperindex=0;
var swipernav = new Swiper('.swiper-container-nav', { //滑动选项卡
    freeMode:true,
    freeModeMomentum : false,
    slidesPerView : 3.39,//'auto'
    initialSlide:swiperindex
});
swiperexplosionindex=1;
var swiperexplosion = new Swiper('.swiper-container-explosion', { //滑动选项卡
    pagination: '.swiper-pagination',
    loop: false,
    onTouchEnd: function(swiper){
        if(_activityend)return;
        if($('[role-explosion=off]').length == 0)return;
        if((_getStage.hour == 14 && _getStage.minutes <55)||_getStage.hour < 14){
            getData($('[role-parent="explosion15"]'),15);
        }else if(_getStage.hour == 14 && _getStage.minutes >= 55 || _getStage.hour > 14){
            getData($('[role-parent="explosion11"]'),11);
        }
    }
});
var winningrollChild=$("[role-child=winningrolldata]"),
    sliderLength = winningrollChild.length;
    sliderWidth=winningrollChild.eq(0).outerWidth(true);
if (sliderLength>2) {
    $('.winningroll-list').bxSlider({
        ticker:true,
        maxSlides:4,//显示li的个数
        slideWidth:sliderWidth+"px",
        speed: sliderLength * 5000
    });
}

//导航浮动
 var
    navItemTop=[];
function getDataNav(){
    navItem.each(function(i){
        var nav=$(this).data("for");
        navItemTop[i]=$('[tab-child='+nav+']').offset().top-navHeight-navHeight/3;
    })
}
getDataNav();
var navItemNum=navItemTop[0];
var navItemLength=navItem.length;
$(window).scroll(function(){
	var scrollTop=$(window).scrollTop();
	if(scrollTop>navTop&&!navFixed.hasClass('ui-navfixed')){
		navadden.show();
		navFixed.addClass('ui-navfixed');
	}else if(scrollTop<=navTop&&navFixed.hasClass('ui-navfixed')){
		navadden.hide();
		navFixed.removeClass('ui-navfixed');
	}
	for(var i=0;i<navItemTop.length;i++){
            if(scrollTop>=navItemTop[i]){
                navItemNum= navItemTop[i];
            }else if(navItemTop[navItemLength]>=scrollTop){
            	navItemNum= navItemTop[i];
            }else if(navItemTop[i]<scrollTop&&scrollTop<navItemTop[i+1]){
                navItemNum= navItemTop[i];
            }
        }
      $.each(navItemTop,function(index,main){
        if(main==navItemNum){
            tabnav(navItem.eq(index),index);
            return;
        }
    })
})
$('body')
.on(click,'[role-close=layer]',function(){
	$(this).parents("[role-parent=layer]").hide();
    //maskhide();
    return false;
})
.on(click,'[role-tap=prizechange]',function(){
	layerRule.show();
    //maskShow();
    return false;
})
.on(click,'[role-parent=layer] .ui-layer-bg',function(){
    $(this).parents("[role-parent=layer]").hide();
    //maskhide();
    return false;
})
.on('tap','[role-tap=prize]',function(){
    if(!_Fn.isLogin())return false;
    if(!_Fn.isBind())return false;
	if(_activityend){
        _Fn.alert("活动已结束");
        return false;
    }
    if(prizeDataChange.html()<=0){
        _Fn.alert("抽奖机会用完啦~");
        prizeType.removeClass("prize-itemactive");
        return false;
	}
	if (prizeOff) return;
	prizeOff=true;
	prizeNum=0;
	 window._Fn.loading().show($(this));
	prizedraw(prizeNum);
    return false;
})
.on(click,'[role-tap=continue]',function(){
	layerPrize.hide();
    //maskhide();
	prizeOff=false;
    if(prizeDataChange.html()<=0){
       prizeType.removeClass('prize-itemactive');
        _Fn.alert("抽奖机会用完啦~");
       prizeOff=true;
        return;
    }else{
        $('[role-tap=prize]').tap();
    }
    return false;
})
.on("click",'[role-tap=swipernav]',function(){
	var that=$(this);
	var parent=that.parents("[role-parent=swipernav]");
	var index=parent.index();
	$(window).scrollTop($('[tab-child='+that.data("for")+']').offset().top-navHeight)
})
.on('tap','[role-show=layerrule] a',function(){
    layerRule.hide();
    window.location.href=$(this).attr("href");
})
function tabnav(obj,index){
	if(!obj.hasClass("item-active")){
		navItem.removeClass("item-active");
		obj.addClass("item-active");
		swipernav.slideTo(index, 0, false);
	};
}
$.each(prizeType,function(i,n){
	prizedrawId.push($(this).data("id"));
})
function prizedraw(num){
	if(num==7){
        $.ajax({
            url: _Fn.mockServer + "/topic/brand1111/rafflemain",
            type: 'post',
            dataType: 'json',
            success: function (res) {
                $.each(prizedrawId,function(i,n){
                    if(n==res.data.id){
                        prizeNumResule=i;
                        return;
                    }
                })
                if(prizeType.eq(prizeNumResule).data("type")!=res.data.award_type){
                    prizeNumResule=-1;
                }
                luckdrawresult=res;
            },
            error:function(){
                prizeNumResule=-1;
            }
        })
	}
	var step=num%14;
	_timedraw=setTimeout(function(){
		prizeType.removeClass("prize-itemactive");
		prizeType.eq(step).addClass('prize-itemactive');
		clearTimeout(_timedraw);
		num++;
		if(prizeNumResule>=0&&step==prizeNumResule){
			prizedrawShow();
			prizeNumResule=-2;
		}else if(prizeNumResule==-1){
			prizeType.removeClass("prize-itemactive");
            prizedrawShow();
			prizeNumResule=-2;
		}else {
			prizedraw(num);
		}
	},200)
}
function  prizedrawShow(){
    if(luckdrawresult){
        if(luckdrawresult.code==200){
            if(luckdrawresult.data.award_type==1){//实物奖品
                luckdrawresult.data.type="prize";
                dailydrawprize(luckdrawresult.data);
            }else if(luckdrawresult.data.award_type==20){//谢谢参与
                luckdrawresult.data.type="thank";
                dailydrawprize(luckdrawresult.data);
            }else if(luckdrawresult.data.award_type==22){//现金红包
                luckdrawresult.data.type="prize";
                dailydrawprize(luckdrawresult.data);
            }else if(luckdrawresult.data.award_type==28){//卡券
                luckdrawresult.data.type="prize";
                dailydrawprize(luckdrawresult.data);
            }else{//其他奖品
                luckdrawresult.data.type="prize";
                dailydrawprize(luckdrawresult.data);
            }
            prizeDataChange.html(luckdrawresult.data.ordinary);
        }else if(luckdrawresult.code==5155){//没有抽奖机会啦
            prizeType.removeClass("prize-itemactive");
            _Fn.alert("抽奖机会用完啦~");
        }else {
            prizeType.removeClass("prize-itemactive");
            _Fn.alert(luckdrawresult.message);
        }
    }else {
        prizeType.removeClass("prize-itemactive");
        _Fn.alert("网络错误，请稍后重试");

    }
    window._Fn.loading().hide();
	prizeOff=false;
}
function dailydrawprize(data){
    var content=template.render('prizeTpl',data);
    layerResule.html(content);
    layerPrize.show();
    //maskShow();
}
//爆款标
function getData(ele,position,callback){
    $.ajax({
        url: _Fn.mockServer + '/ajax/getKillLoans',
        type: 'post',
        data: {
            position: position
        },
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                // if(res.data.countdown > 0 && !res.data.id)return;
                var rate = res.data['rate'] ? res.data['rate'] : false,
                tyRat = res.data['hot_rate_new'] ? res.data['hot_rate_new'] : false;
                if(rate){
                    res.data.rate = rate.split(".")[0];
                    res.data.rate_num = rate.split(".")[1];
                }
                if(tyRat){
                    res.data.hot_rate_new = tyRat.split(".")[0];
                    res.data.hot_rate_new_num = tyRat.split(".")[1] ;
                }
                res.data.min_amount=parseInt(res.data.min_amount);
                res.data.up_amount=parseInt(res.data.up_amount);
                var content = template.render('explosionTpl',{data:res.data});
                ele.html(content);
                if(res.data.countdown > 0){//预告
                    if(res.data.id){
                        countdownFn && countdownFn(ele,position,ele.find('.cunttimerecored'),1,res.data);
                    }else{
                        countdownFn&&countdownFn(ele,position,ele.find(".body-trailer"),3);
                    }
                }else if(res.data.countdown < 0 && res.data.id && res.data.hot_time_range > 0){//快下架
                    countdownFn && countdownFn(ele,position,ele.find('.countdown2'),2);
                }
            }
        },
        error: function(){
        }
    })
}
function countdownFn(ele,position,timeBox,status,data){
    if (_timer) {
        countDown.cleartimer();
    }
    _timer = countDown.listen(
        timeBox,
        function(){
            getData(ele,position);
        },
        '/ajax/serverTime',
        function (timeFormart, time) {
            if(time == 300000){
                //加载5分钟预告
                getData(ele,position);
                countDown.cleartimer();
                return;
            }
             timer = timeFormart.split('|')[1].split(',');
            var html = [], htmlTime = [];
            for (var i = 0; i < timer.length; i++) {
                if (i < 3) {
                    continue;
                }
                for (var j = 0; j < timer[i].length; j++) {
                    if (j > 0) {

                    }
                    htmlTime.push(timer[i][j]);
                }
            }
            timer = timeFormart.split('|')[1].split(',');
            var html = [],htmlTime = [];
            for(var i = 0 ; i < timer.length ; i++){
                if(i<3){
                    continue;
                }
                for(var j = 0 ; j < timer[i].length; j++){
                    if(j > 0){

                    }
                    htmlTime.push(timer[i][j]);
                }
            }
            if(status==1){
                if (data.id) {
                    html.push('<span class="qt-gl body-time warn-time">');
                    html.push(htmlTime[2]);
                    html.push('</span>');
                    html.push('<span class="qt-gl body-time warn-time">');
                    html.push(htmlTime[3]);
                    html.push('</span>');
                    html.push('<span class="qt-gl time-symbol ui-icon warn-time"></span>');
                    html.push('<span class="qt-gl body-time warn-time">');
                    html.push(htmlTime[4]);
                    html.push('</span>');
                    html.push('<span class="qt-gl body-time warn-time">');
                    html.push(htmlTime[5]);
                    html.push('</span>');
                }

            }else if(status==2){
                 html.push(htmlTime[0]);
                html.push(htmlTime[1]);
                html.push(':');
                html.push(htmlTime[2]);
                html.push(htmlTime[3]);
                html.push(':');
                html.push(htmlTime[4]);
                html.push(htmlTime[5]);
            }else if(status==3){
                html.push('<span class="qt-gl body-time trailer-time">');
                html.push(htmlTime[0]);
                html.push('</span>');
                html.push('<span class="qt-gl body-time trailer-time">');
                html.push(htmlTime[1]);
                html.push('</span>');
                html.push('<span class="qt-gl time-symbol ui-icon trailer-time"></span>');
                html.push('<span class="qt-gl body-time trailer-time">');
                html.push(htmlTime[2]);
                html.push('</span>');
                html.push('<span class="qt-gl body-time trailer-time">');
                html.push(htmlTime[3]);
                html.push('</span>');
                html.push('<span class="qt-gl time-symbol ui-icon trailer-time"></span>');
                html.push('<span class="qt-gl body-time trailer-time">');
                html.push(htmlTime[4]);
                html.push('</span>');
                html.push('<span class="qt-gl body-time trailer-time">');
                html.push(htmlTime[5]);
                html.push('</span>');
            }
            timeBox.html(html.join(''))

        }
    ).id
}
lumpFlashingFn();
function lumpFlashingFn(){
    lumpTimer=setTimeout(function(){
        lumpFlashing.toggleClass('luckdraw-prize-lumpflashing');
        lumpFlashingFn();
    },800);
}
if(_nowRedpacket){
    var redpacketstart=$('.ui-redpacketstart');
    var localstorage=window.localStorage;
    if(localstorage.getItem("redpacketstart")!=1){
        window.localStorage.setItem("redpacketstart","1");
        redpacketstart.show();
        // maskShow();
    }
} 
wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        link: dataUrl, // 分享链接
        imgUrl:'//licai.p2peye.com/styles/images/topic/brand1111/mobile/wxshare_logo.png'
    });
})
$(window).bind( 'orientationchange', function(e){
    e.stopPropagation();
    e.cancelBubble = true;
    window.location.href = window.location.href;
});
function maskShow(){
    mainScroll=$(window).scrollTop();
    _theme.addClass('zIndex');
    _main.css("margin-top",-(mainScroll+_mainTop)+"px");
    _body.addClass("hidden");
}
function maskhide(){
    _main.css("margin-top",0);
    _theme.removeClass('zIndex');
     _body.removeClass("hidden");
    $(window).scrollTop(mainScroll);
}


