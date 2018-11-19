(function(){
    window.onpageshow=function(e){
        var a=e||window.event;
        if(a.persisted){
            //window.location.refresh();
            window.location.reload();
        }
    }
})();

function hengshuping(event){
    if(window.orientation==0||window.orientation==180){
        //竖屏 return false;  
        $.cookie('nomobile','',{expires:'-1',path:'/'});
        window.location.reload();
    }else if(window.orientation==-90||window.orientation==90){ 
        //横屏return false;  
        $.cookie('nomobile','1',{expires:'1',path:'/'});
        window.location.reload();
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
$(function(){
	$.cookie = function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
});




var formMod = require('../modules/form');

formMod.listen('/User/setqpscomment',{
    validError:function(validResutl){
         var item  = validResutl.element;
         if(item.attr('name')=='content'){
            if(validResutl.valid == 'notempty'){ 
                Fnalert("请输入10-500个字符的内容");
                item.attr({'placeholder':'内容不能为空'});
            }else if(validResutl.valid == 'len'){ 
                Fnalert("请输入10-500个字符的内容");
                item.attr({'placeholder':'字数必须在10到500字之间'});
            }
        }
    },
    cleanup:function(item){
        //console.log(item);
    //这里是清除之前验证失败的错误提示
    },
    success:function(res){//评论成功
        if(res.data.code=="200"){
            Fnalert("评论成功");
            $("textarea").val("");
        }else {
             Fnalert(res.data.message);
        }
        
    },
    error:function(){
       //ajax 提交失败  需要做点什么。。。
    }
});
var height=$(window).height();
var width=$(window).width();
var length=$(".contant .mod-wrap").length-1;
var startX,startY,endX,endY;
var slidestep=height/5;//滑动的距离
var n=0;
var touceoff=false;//控制滑动
var slide=1;
var slideoff=true;//控制整平的滑动
var slidemore=true;//加载更多
var slideshu=false;//请求数据
var datamore=true;//数据返回的时间控制
var newheight=$(".new").height();
var wonderfulheight=$(".wonderful").height();
var newdata=$(".mod-comment .new").attr("data-page");
var wonderfuldata=$(".mod-comment .wonderful").attr("data-page");
var newpage=2;
var wonderfulpage=2;
var slideheight2=$(".comment-slide").height();//加载更多的高度          
var slidetop=slideheight2-height;//判断请求数据
var slidedefault=true;//阻止默认行为
var timerui=null;//提示
newdata={"page":newpage};
wonderfuldata={"page":wonderfulpage};
$(".contant").height(height);
$(".contant").width(width);
var slidingheight=parseInt($(".mod-comment .new li").eq(0).outerHeight());
var slideheight=height-10-parseInt($(".mod-comment .regain").height())-parseInt($(".mod-comment .main").css("margin-top"))-parseInt($(".mod-comment .banner").outerHeight())-parseInt($(".mod-comment .title").outerHeight());
$(".turn").height(height-parseInt($(".mod-index .main").css("margin-top"))-parseInt($(".mod-index .main").css("height"))/2);
$(".contant .mod-wrap-height").height(height);
$(".contant .mod-wrap").width(width);
//标题伸缩
if($(".mod-video .head .title").width()>$(".mod-video .head .max-width").outerWidth()){
    $(".mod-video .head .head-title").width($(".mod-video .head .title").width()+parseInt($(".mod-video .head .head-title").css("padding-left"))*2);
    $(".mod-video .head .head-title").css({"margin":"0px auto"});
    $(".mod-video .head .head-title").removeClass("max-width");
}else {
    $(".mod-video .head .head-title").width($(".mod-video .head .title").outerWidth()+parseInt($(".mod-video .head .head-title").css("padding-left"))*2);
    $(".mod-video .head .head-title").css({"margin":"0px auto"});
}
$(window).resize(function(){
    isPhone();
    
});
function isPhone(){
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid){
        height=$(window).height();
        $(".contant .mod-wrap-height").height(height);
        $(".slide").css({"top":-height*n+"px"});
        if(n<(length-1)){
            $(".contant").height(height);
        }else {
            return false;
        }
    }
}

createTouchEvent();
// 登陆
$('.reply-textarea').focus(function(){
   var isLogin=$(this).attr('islogin');
   if(isLogin=='no'){
        window.location.href='//m.p2peye.com/member.php?mod=logging&action=login&mobile=2&referer=//licai.p2peye.com/topic/qps/';
   }
});
function createTouchEvent(){
	try {
	   document.addEventListener('touchstart', touchSatrtFunc, false);
	   document.addEventListener('touchmove', touchMoveFunc, false);
	   document.addEventListener('touchend', touchEndFunc, false);
	}
	catch(e){}
}

function touchSatrtFunc(event){
	try {
		var touch=event.touches[0];
		var x=Number(touch.pageX);
		var y=Number(touch.pageY);
		startX=x;
		startY=y;
        return false;
	}
	catch(e){return false;} 

}
function touchMoveFunc(event){
	try {
		var touch=event.touches[0];
		var x=Number(touch.pageX);
		var y=Number(touch.pageY);
		endX=x;
		endY=y;
        if(startY-endY<100){
            touceoff=true;
        }else if(startY-endY>100){
            touceoff=true;
        }       
        if(n<length){
            slideoff=true;
	       event.preventDefault();
        }
        if(n==length){
            slideheight2=$(".mod-comment").height();//加载更多的高度
            slidetop=slideheight2-height*2;
            slideshu=false;
            if(startY-endY>0&&slidemore){
            slideoff=false;//控制整平的滑动
            alideshu=false;
            $(".contant").height($(".mod-comment").height());
            $(".mod-comment .banner").css({"position":"fixed"});
            $(".mod-comment .comment-slide").height($(".mod-comment .comment-slide .show").height());
            if((endY-startY)>5&&$(document).scrollTop()<=0){
                event.preventDefault();
                slideoff=true;
                slidemore=false;
                }
            }else if($(document).scrollTop()<=0){
                event.preventDefault();
                 if(endY-startY>slidestep){
                    slidemore=false;
                    slideoff=true;
                 }
            }
            if($(document).scrollTop()>slidetop){
                slideshu=true;
                if(datamore){
                    event.preventDefault();
                }
                if($(document).scrollTop()>=(slideheight2-height)&&(startY-endY)>0){
                    event.preventDefault();
                }
            }
            if((startX-endX)>=10){                
                event.preventDefault();
            }else if((endX-startX)>=10){
                event.preventDefault();
            }
            if((startX-endX)>slidestep){
                event.preventDefault();
                $(".mod-comment .title a").removeClass("active").eq(0).addClass("active");
                $(".mod-comment .com-wrap").removeClass("show").eq(0).addClass("show");
                $(document).scrollTop(0);
                 slideoff=true;
                 datamore=true;
                 clearTimeout(timerui);
                 $(".ui").fadeOut();
                  slideheight2=$(".mod-comment").height();
            }else if((endX-startX)>slidestep){
                event.preventDefault();
                $(".mod-comment .title a").removeClass("active").eq(1).addClass("active");
                $(".mod-comment .com-wrap").removeClass("show").eq(1).addClass("show");
                $(document).scrollTop(0);
                slideoff=true;
                datamore=true;
                clearTimeout(timerui);
                $(".ui").fadeOut();
                slideheight2=$(".mod-comment").height();
            }
            
            
        }
	}
	catch(e){ }
}
function touchEndFunc(event){
    if(touceoff&&slideoff){
        touceoff=false;
        slideshu=false;
        $(".mod-comment .banner").css({"position":"absolute"});
        $(".contant").height(height);
        if($(document).scrollTop()<=0){
            slideoff=false;
            if((endY-startY)>slidestep){//下滑
                n--;
        		if(n<0){
        			n=0;
                    slideoff=true;
        		}else {
        			$(".slide").animate({"top":-height*n+"px"},500,function(){
        			     slideoff=true;
        			});
        		}
        	}else if((startY-endY)>slidestep){//上滑
        		n++;
        		if(n>=length){
        			n=length;
        			$(".slide").animate({"top":-height*n+"px"},500,function(){
        			     slideoff=true;
                         slidemore=true;
        			});
        		}else {
        			$(".slide").animate({"top":-height*n+"px"},500,function(){
        			     slideoff=true;
        			});
        		}
        	}else {
        	   slideoff=true;
        	}
            
        }        
        if(n==0){
            clearTimeout(timer);
            $(".mod-index .banner img").css({"animation":"motionturn 5s linear forwards"});
            $(".mod-index .banner img").css({"webkitAnimation":"motionturn 5s linear forwards"});
            timer=setTimeout(function(){$(".sponsor").on({'click':sponsorline})},5000);
        }else{
            $(".mod-index .banner img").css({"animation":"2s"});
            $(".mod-index .banner img").css({"webkitAnimation":"2s"});
            $(".sponsor").click(function(){$(this).attr({"href":"javascript:;"})});
        }
    }
   else {
        if(slideshu){
            slideshu=false;
            var dataurl=$(".mod-comment .show").attr("role-url");
            if($(".mod-comment .new").attr("class")=="new com-wrap show"){
                $.ajax({
                    url: dataurl,
                    type: "get",
                    dataType: 'json',
                    async:true,
                    data: newdata,
                    success: function(res) {  //json是从后台获取的数据
                        if(res.code=="200"){
                            $(".mod-comment .new").append(res.data.str);
                            newpage++;
                            newdata={"page":newpage};
                            newpage=parseInt(newdata.page);
                            slide++;
                            slideshu=true;
                            return 
                        }else {
                             datamore=false;
                             if($(document).scrollTop()>=(slideheight2-height)){
                                 Fnalert(res.message);
                            }
                             slidemore=true;
                             slideshu=true;
                        }
                    },
                    error:function(){
                        //失败回调
                        console.log("请求数据失败");
                    }
                 });
            }else {
                $.ajax({
                    url: dataurl,
                    type: "get",
                    dataType: 'json',
                    async:true,
                    data: wonderfuldata,
                    success: function(res) {  //json是从后台获取的数据
                        if(res.code=="200"){
                            wonderfulpage++;
                            wonderfuldata={"page":wonderfulpage};
                            wonderfulpage=parseInt(wonderfuldata.page);
                            slide++;
                            $(".mod-comment .wonderful").append(res.data.str);
                            slideshu=true;
                            return 
                        }else {
                            datamore=false;
                            if($(document).scrollTop()>=(slideheight2-height)){
                                 Fnalert(res.message);
                            }
                             slidemore=true;
                             slideshu=true;
                        }
                    },
                    error:function(){
                        //失败回调
                        console.log("请求数据失败");
                    }
                 });
            }
        }
    }

}
//切换
$(".mod-comment .title a").on(
'click',function(){
    var index=$(this).index();
     clearTimeout(timerui);
     $(".ui").fadeOut();
     $(".mod-comment .title a").removeClass("active");
     $(this).addClass("active");
     $(".mod-comment .com-wrap").removeClass("show").eq(index).addClass("show");
     $(document).scrollTop(0);
     datamore=true;
     slideheight2=$(".mod-comment").height();
})
//分享给更多好友
$(".share").on(
'click',function(event){
    event.stopPropagation();
    $(".share-wrap").show();
    slidemore=true;
})
$(document).on(
'touchstart',function(){
     $(".share-wrap").hide();
});
//回到顶部

$(".regain").on(
'touchend',function(){
    n=0;
    $(".mod-comment .comment-slide").css({"top":"0px"});
    $(".mod-comment .banner").css({"position":"absolute"});
    $(".contant").height(height);
    clearTimeout(timerui);
    $(".ui").fadeOut();
    $(".slide").animate({"top":"0px"},500,function(){
        $(".mod-index .banner").css({"animation":"motion2 5s linear forwards"});
        touceoff=true;
        slideoff=true;
        slidedefault=true;
    });
    return false;
});



//点赞 
var isLogin1=$('.reply-textarea').attr('islogin');
$('body').on('click','[role=praise]',function(){
    isLogin1=$('.reply-textarea').attr('islogin');
	if(isLogin1=="no") {
	   Fnalert("未登录");
	   return false;
	};
	var that = $(this);
	var data = function(){
		var data = that.attr('role-data').split('|');
		var _data = {}
		for(var i = 0 ; i < data.length ; i++){
			var _temp = data[i].split(':');
			_data[_temp[0]] = _temp[1];
		}
		return _data;
	}();
	createPraise(data,that);
	return false;
});

function createPraise(data,ele){
	var url = ele.data('url');
	if(isLogin1=="no") {
	   Fnalert("未登录");
	   return false;
	};
	$.ajax({
		url : url?url:'/User/setPraise',
		type : 'post',
		dataType : 'json',
		data : data,
		success : function(res){
			if(res.code == 200){
				var numi = ele.find('i');
				if(res.data.total>0){
					numi.html(res.data.total);
				}else{
					var total = parseInt(numi.html());
					numi.html(total+1);
				}
			}else{
			}
		},
        error:function(){
            console.log("返回信息错误");
        }
	})
}
function Fnalert(text){
    $(".ui").show();
    var ele = $(".ui");
    ele.find("span").text(text);
    var left = ele.width()/2;
    ele.css("margin-left","-"+left+"px");  
    ele.click(function(){
        ele.fadeOut();              
    });
    timerui=setTimeout(function(){
        ele.fadeOut();
    },1000)
}
//视频
var vediosrc=$(".video").attr("data-src").split("==");
var vedio=vediosrc[0].split('/')
$(".video .videoclose").on(
'click',function(){
    $(this).hide();
    player = new YKU.Player('youkuplayer',{
    styleid: '0',
    autoplay: true,
    client_id: '4018dcb0bbbdda7f',
    vid: vedio[vedio.length-1],
    events:{
        onPlayerReady:function(){
            window.removeEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
        },
        onPlayEnd:function(){
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
        }
    }
    });
});
//自适应高
var textmax=$(document).height()-$(".mod-commentlist .banner").height()-$(".mod-commentlist .reply-submit").outerHeight()-$(".share").outerHeight()-40;
var _textarea = $('.reply-textarea');
var baseLineHeight = _textarea.height();
$('body').on('input','.reply-textarea',function(){
	var that = $(this);
	listenChange(that);	
	
});
if(_textarea[0].attachEvent) {
    _textarea[0].attachEvent('onpropertychange',function(e) {
        if(e.propertyName!='value') return;
        $(_textarea[0]).trigger('input');
    });
}

var listenChange = function(ele){
	var scrollval = ele[0].scrollTop;
	var scrollHeight = ele[0].scrollHeight - parseInt(ele.css('padding-top')) - parseInt(ele.css('padding-bottom'));
    var h=scrollval + scrollHeight;
    
    if(h>textmax)return;
    
    if(scrollval>0){
        ele.css({ 'height' : h });
    }

}
//冠名的连接
var timer=null;
timer=setTimeout(function(){$(".sponsor").on({'click':sponsorline})},5000);
function sponsorline(){
    $(".sponsor").attr({"href":$(".sponsor").attr("data-url")});
}