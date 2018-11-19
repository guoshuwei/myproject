var
    app = require('./app'),
    template = require('../modules/template'),
    selectTap=$("[role-tap=select]"),
    selectChild=$("[role-ele=select]"),
    selectResulrt=$("[role-parent=dataWrap]"),
    wxReady = require('../modules/jssdk'),
    condition=$("[role-tap=condition]"),
    condition1=$("[role-tap=condition1]"),
    getMoreList = require('../modules/getMoreList'),
    sorttext=$("[role-ele=sorttext]"),
    masklayer=$('.mask-layer'),
    $more=$(".fn-loading"),
    $empty=$(".ui-empty"),
    platNum=$("[role-ele=total]"),
    platNumLoans=platNum.find("b").eq(1),
    platNumCountele=platNum.find("b").eq(0),
    loanstNumCountint=platNumLoans.html(),
    platNumCountint=platNumCountele.html(),
    loanstNumCount=platNumLoans.html(),
    platNumCount=platNumCountint,
    conditionoff=false,
    slideoff=false,
    profitoff=false,
    isPlatnum=0,
    conditionStr="0",
    emptyOff=false,
    timer,
    thatpre,
    dataJson={
    	"z":1,//综合排序：1，从高到底2，从底到高3，
    	"is_show":0,//0是有标，1是无标
    	"background":0,//平台背景不限是0
    	"p":2
    },
    dataJsonIsshow=0,
    mobilePopup = require('../modules/mobile_popup'), //手机版弹出层;
    cacheData=function(){
    	var cache={};
    	return {
    		set:function(key,val){
    			cache[key]=val;
    		},
    		get:function(key){
    			return cache[key]
    		}
    	}
    }(),
    cacheDataSelect=function(){
    	var cache={};
    	return {
    		set:function(key,val){
    			cache[key]=val;
    		},
    		get:function(key){
    			return cache[key]
    		}
    	}
    }();
ajaxDataPage();
$('body')
    .on('tap',"[role-tap=select]",function(){
    	if(isAjax()) return false;
    	if(slideoff) return false;
    	slideoff=true;
    	var that=$(this),
    		index=that.parent(".ui-selectnav-item").index(),
    		child=$("[role-operation="+that.data("tab")+"]");
		if(thatpre==index){
			that.toggleClass("ui-selectnav-itemcurrent");
	    	if(that.hasClass('ui-selectnav-itemcurrent')){
	    		selectChild.hide();
	    		mobilePopup.showMaskLayer();
	    		child.slideDown("fast",function(){
	    			slideoff=false;
	    		});
	    	}else{
	    		selectChild.hide();
	    		child.slideUp("fast",function(){
	    			mobilePopup.hideMaskLayer();
	    			slideoff=false;
	    		});
	       	}
		}else {
			selectTap.removeClass('ui-selectnav-itemcurrent');
			that.toggleClass("ui-selectnav-itemcurrent");
	    	if(that.hasClass('ui-selectnav-itemcurrent')){
	    		selectChild.hide();
	    		mobilePopup.showMaskLayer();
	    		child.slideDown("fast",function(){
	    			slideoff=false;
	    		});
	    	}else{
	    		electChild.hide();
	    		child.slideUp("fast",function(){
	    			mobilePopup.hideMaskLayer();
	    			slideoff=false;
	    		});
	       	}
		}
		if(masklayer.length==0){
			masklayer=$('.mask-layer');	
		}
   	thatpre=that.parent(".ui-selectnav-item").index();
	})
	.on('tap','.mask-layer',function(){
		selectChild.hide();
		selectTap.removeClass('ui-selectnav-itemcurrent');
		mobilePopup.hideMaskLayer();
		return false;
	})
    .on('tap',"[role-tap=condition]",function(){
    	if( conditionoff) return false;
       	 conditionoff=true;
       	var that=$(this),
       		arrbg=[],
       		key,
       		arrData="",
       		index=that.index();
    	if(index==0){
    		condition.removeClass("current");
    		platNumCount=platNumCountint;
   			that.addClass('current');
			conditionoff=false;
			conditionStr=0;
			key="key"+dataJson.z+dataJsonIsshow+conditionStr;
       		platNumFn(key,conditionStr,dataJsonIsshow)
    		return false;
       	}
   		condition.eq(0).removeClass("current");
   		that.toggleClass('current');
   		$.each(condition,function(i,m){
    		if(condition.eq(i).hasClass("current")){
    			arrbg.push(condition.eq(i).data("term"));
    		}
    	})
    	if(arrbg.length>0){
    		arrData=arrbg.join("|");
    	}else{
    		that.toggleClass('current');
    		arrData=that.data("term");
    	}
    	if(arrData==conditionStr){
       		conditionoff=false;
       		return false
       	}else{
       		conditionStr=arrData;
       	}
       	key="key"+dataJson.z+dataJsonIsshow+conditionStr;
       	platNumFn(key,conditionStr,dataJsonIsshow)
   	})
    .on('tap',"[role-tap=profit]",function(){
    	if(profitoff) return false;
    	var that=$(this);
    	if(dataJson.z==that.data("val")){
    		masklayer.tap();
    		return false;
    	}
 		dataJson.z=that.data("val");
 		dataJson.p=1;
 		that.addClass('ui-selectmain-sortitemcurrent');
		ajaxData(that);
		return false;
  	})
    .on('tap',"[role-tap=condition1]",function(){
    	condition1.removeClass("current");
    	$(this).addClass('current');
    	dataJsonIsshow=$(this).data("term");
    	var key="key"+dataJson.z+dataJsonIsshow+conditionStr;
    	platNumFn(key,conditionStr,dataJsonIsshow)
    })
    .on('tap',"[role-tap=cancel]",function(){
    	dataJson.is_show="0";
    	dataJson.background="0";
    	condition.removeClass("current").eq(0).addClass("current");
    	condition1.removeClass("current").eq(0).addClass("current");
    	platNumCount=platNumCountint;
    	platNumCountele.html(platNumCountint);
		platNumLoans.html(loanstNumCountint);
    })
    .on('tap',"[role-tap=ensure]",function(){
    	if(profitoff) return false;
    	var arrbg=[],strbg='',strshow='';
    	$.each(condition1,function(i,m){
    		if(condition1.eq(i).hasClass("current")){
    			strshow=condition1.eq(i).data("term");
    		}
    	})
    	$.each(condition,function(i,m){
    		if(condition.eq(i).hasClass("current")){
    			arrbg.push(condition.eq(i).data("term"));
    		}
    	})
    	if(arrbg.length>0){
    		strbg=arrbg.join("|");
    	}else{
    		_Fn.alert("请勾选筛选项");
    		return false;
    	}
      	if(dataJson.is_show==strshow&&dataJson.background==strbg){
      		masklayer.tap();
      		return false;
    	}else{
       		dataJson.p=1;
    		dataJson.is_show=strshow;
    		dataJson.background=strbg;
    		ajaxData();
    		return false;
    	}
      })
function ajaxDataPage(){//翻页
	if($more.length>0){
    clearTimeout(timer);
		timer=setTimeout(function(){
			getMoreList.init({
			    url: '/platform/kitSearch',
			    data:dataJson,
			    tpl: 'dataTpl',
			    ajaxtype: 'post',
          noMores:false,
			    viewport: $('[role-parent=data]')
			})
		},1000)
	}
}
function ajaxData(obj){//异步请求筛选数据
	var key="key"+dataJson.z+dataJson.is_show+dataJson.background;
	if(cacheData.get(key)){
		if(cacheData.get(key).code==200||cacheData.get(key).code==400){
			drawDate(obj,cacheData.get(key).data);
			return false;
		}
	}
	if(profitoff) return false;
	profitoff=true;
	$.ajax({
		url:"/platform/kitSearch",
		data:dataJson,
		type:"post",
		success:function(res){
			isAjaxResult(key,obj,res);
		},
		error:function(){
			_Fn.alert("网络请求错误，请稍后重试");
			profitoff=false;
			return false;
		}
	})
}
function isAjaxResult(key,obj,res){
	cacheData.set(key,res);
	if(res.code==200){
		if(platNumCount==0){
			if(!emptyOff){
				$empty.show();
				emptyOff=true;
				selectResulrt.html("").hide();
				$more.remove();
			}
			masklayer.tap();
		}else{
			if(emptyOff){
				$empty.hide();
				emptyOff=false;
			}
			drawDate(obj,res.data)
		}
		profitoff=false;
		return false;
	}else if(res.code==400){
		if(!emptyOff){
			$empty.show();
			emptyOff=true;
			selectResulrt.html("").hide();
			$more.remove();
			profitoff=false;
		}
		masklayer.tap();
		return false;
	}else {
		_Fn.alert("网络请求错误，请稍后重试");
		profitoff=false;
		return false;
	}
}
function drawDate(obj,dataList){//筛选结构数据绘制
  $more.remove();
	selectResulrt.html('<ul class="ui-hotplat-list" role-parent="data">'+template.render("dataTpl",{data:dataList})+"</ul>");
	selectResulrt.show();
	if(platNumCount>10){
			selectResulrt.after('<div class="ui-loading fn-loading">滑动加载更多</div>');
			$more=$(".fn-loading");
		  dataJson.p=2;
 		  ajaxDataPage();
	}else if($more.length>0){
		$more.remove();
		$more=$(".fn-loading");
	}
	if(obj){
		sorttext.html(obj.html());
		obj.removeClass('ui-selectmain-sortitemcurrent');
	}
	masklayer.tap();
	return false;
}
function isAjax(){
	if($more.length>0&&$more.html()=="加载中，请稍后…"){
		return true;
	}
}
function platNumFn(key,conditionStr,dataJsonIsshow){//筛选平台数和标的个数
	if(cacheDataSelect.get(key)){
   		platNumCountele.html(cacheDataSelect.get(key).platform_count);
		platNumLoans.html(cacheDataSelect.get(key).loans_count);
		platNumCount=cacheDataSelect.get(key).platform_count;
		loanstNumCount=cacheDataSelect.get(key).loans_count;
		conditionoff=false;
		return false;
   	}
	$.ajax({
   		url:"/platform/getPlatCountByBackground",
   		type:"post",
   		data:{
   			background:conditionStr,
   			"is_show":dataJsonIsshow
   		},
   		success:function(res){
   			platNumCount=res.data.platform_count;
   			loanstNumCount=res.data.loans_count;
   			if(res.code==200){
     			platNumCountele.html(platNumCount);
				platNumLoans.html(loanstNumCount);
				cacheDataSelect.set(key,res.data);
   			}
   			conditionoff=false;
   		},
   		error:function(){
   			conditionoff=false;
   			_Fn.alert("网络请求错误，请稍后重试");
   		}
   	})
}
