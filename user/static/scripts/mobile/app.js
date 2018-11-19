
var
dialogUi= require('../modules/dialogUi'),
resultCall = require('../modules/ajaxcodecall'),
statistics = require('../modules/statistics'),
template = require('../modules/template'),
member = require('../modules/member_header'),
bind = require('../modules/mbind'),
animate = require('../modules/animate'),
ui = require('../modules/ui'),
cookie = require('../modules/cookie'),
windowWidth = $(window).width(),
windowHeight = $(window).height(),
u = navigator.userAgent, app = navigator.appVersion;

var
mockHost = '/mockserver',
mockVal = parseInt($('meta[name=p2peye_mock]').attr('content'));

function getMore(that){
	var 
	data = {},
	post = that.attr('role-url'),
	parent = $(document.getElementById(that.attr('role-parent'))),
	staticurl = that.attr('role-staticurl'),
	clock = that.attr('data-clock');
	data.data= function(){
		var 
		_option = that.attr('role-data'),
		temp = {};

		_option = _option.split('|');

		for(var i = 0 ; i < _option.length ; i++){
			var _temp = _option[i];
			var _option_ = _temp.split(':');
			temp[_option_[0]] = _option_[1];
		}
		return temp;
	}();
	if(clock > 0) return;
	if(that.hasClass('over')) return;
	that.attr('data-clock','1');
	that.html('加载中...');
	$.ajax({
		url : post,
		type : 'get',
		dataType : 'json',
		data : data.data,
		success : function(res){

			that.attr('data-clock','0');
			that.html('查看更多');

			if(res.code == 200){
				if($.trim(res.data) == ''){
					that.remove();
					return;
				}
				data.data.page = data.data.page ? data.data.page : data.data.pn;
				
				data.data.page = data.data.page * 1 + 1;

				parent.append(res.data.str ? res.data.str : res.data);
				
				var tempstr = [];
				var flag = 0;
				for(var i in data.data){
					if(flag > 0){
						tempstr.push('|');
					}
					tempstr.push(i+':'+data.data[i]);
					flag++;
					
				}
				that.attr('role-data',tempstr.join(''));

				if(staticurl){
					staticurl = staticurl.replace('{}',data.data.page);
					that.attr('href',staticurl);
				}

			}else{
				if(res.code == 4530){
					that.addClass('over');
					that.html('没有更多了~');
					return;
				}
				resultCall(res);
			}
		}
	})
}


window._Fn =  window._Fn  || {};

document.domain = "p2peye.com";

window._Fn.track = statistics;


window._Fn.mockServer = mockVal ? mockHost : '';

window._Fn.backTop = function() {

    var status = 1;
    
    $('body').on('touchend','.fn-backtop',function(){
        $(window).scrollTop(0);
        return false;
    })
    var handle = function(){
        var back = $('.fn-backtop');
        return {
            _show : function(){
                back.fadeIn();
            },
            _hide : function(){
                back.hide();
            }
        }
    }();
    $(window).scroll(function(){

        var scrollTop = $(window).scrollTop();
        
        if(status == 1 && scrollTop > 20){
            status = 2;
            handle._show();
        }

        if(status == 2 && scrollTop <= 20){
            status = 1;
            handle._hide();
        }
    })
}

window._Fn.isWeiXin = function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

window._Fn.resizeWindow = function(){
    var windowWidthNew = $(window).width();
    var windowHeightNew = $(window).height();
    if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
        windowWidth = windowWidthNew;
        windowHeight = windowHeightNew;
        return{
            windowWidth: windowWidth,
            windowHeight: windowHeight
        }
    }
    return false;
    
}

window._Fn.lightboxWrap = function(){

    var h=Math.max($('body').outerHeight(),$(window).height());

    var _fadeIn = function(){
        if(!$('#lightbox_wrap').length){
            var lightbox = $('<div id="lightbox_wrap"></div>');
            lightbox.css({

                'width':'100%',

                'height':h

            }).appendTo($('body'));

        }else{

            var lightbox = $('#lightbox_wrap');

            lightbox.fadeIn();

        }
    };   
    var _fadeOut = function(){

        $('#lightbox_wrap').fadeOut();
    };
    return {
        _fadeIn: _fadeIn,
        _fadeOut: _fadeOut
    }
}

/*
*
* Check if the brower is mobile
*
*/

window._Fn.isMobile = function(){

    if(_Fn.isAndroid || _Fn.isiOS){
        return true;
    }else{
        return false;
    }
}

/*
*
* Check if the brower is ios
*
*/

window._Fn.isiOS = function(){
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}();

/*
*
* Check if the brower is android
*
*/

window._Fn.isAndroid = function(){
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
}();
/*
* Check if the app info
*/
window._Fn.terminalInfo = function(){
    if(!_Fn.isMobile()) return false;

    if(u.indexOf('iOSApp') >= 0 ||u.indexOf('AndroidApp') >= 0){

        return {
            version : function(){
                var reg = /Version[\d.]+/;
                return u.match(reg)[0].replace('Version','');

            }(),
            terminal : function(){
                if(u.indexOf('iOSApp') >= 0){
                    return 'ios'
                }else if(u.indexOf('AndroidApp') >= 0){
                    return 'android'
                }else{
                    return 'h5'
                }
            }(),
            app : function(){
                if(u.indexOf('p2peye') >= 0){
                    return 'p2peye'
                }else if(u.indexOf('licaiApp') >= 0){
                    return 'licai'
                }else if(u.indexOf('jibei') >= 0){
                    return 'jibei'
                }else{
                    return 'h5'
                }
            }()
        }
    }
    return {
        version: "1.0",
        terminal:'h5',
        app: window.navigator.userAgent.match(/MicroMessenger/i) == "MicroMessenger" ? 'wechat' : 'other'
    }
}();
/*
*
* trigger  ： 事件类型
* data     ： 结构参数
*
* Demo ：
_Fn.fireApp({
    trigger : 'showimage',
    data : {targetIndex:index,dataArray:array}
})

*/
window._Fn.fireApp = function(options){
    if(_Fn.isiOS){
        if(window.webkit && window.webkit.messageHandlers){
            window.webkit.messageHandlers.fireApp.postMessage(options);
        }
    }
    if(_Fn.isAndroid){
        if(window.webJSInterface){
            webJSInterface.resultStr(JSON.stringify(options));
        }
    }
}
window._Fn.fireAppShare = function(options){
    if(_Fn.isiOS){
        if(window.webkit && window.webkit.messageHandlers){
            window.webkit.messageHandlers.appleP2plicaiShare.postMessage({body: options});
        }
    }
    if(_Fn.isAndroid){
        if(window.webJSInterface){
            JSInterface.payResult(JSON.stringify(options));
        }
    }
}
/*
*
* trigger  ： 事件类型
* data     ： 结构参数
*
* Demo ：
_Fn.listenApp({
    trigger : string,
    data : JSONString
})
*/
window._Fn.listenApp = function(trigger,data){

    if(typeof data  == 'object'){
        data = JSON.stringify(data);
    }

    handleApp.fire(trigger,data);
}
dialogUi.listen('loginp2peye',function(){
	var loginUrl = '//m.p2peye.com/member.php?mod=logging&action=login&mobile=2&referer=';
	if(_Fn.isMobile()){
		window.location.href = loginUrl + window.location.href;
		return;
	}
	this.showLightbox = true;
	this.setTitle('请登录');
	var eTarget = this.event_source,
	ref = encodeURIComponent(document.location);

	this.setBox(600,490);
	this.setContent("<iframe frameborder=0 border=0 width=520 height=400 src='"+eTarget.attr('href')+"?referer="+encodeURIComponent(ref)+"'></iframe>");
	this.open()
})

window._Fn.isLogin = function(callback){
	var loginUrl = '//m.p2peye.com/member.php?mod=logging&action=login&mobile=2&referer=';
	var uid = $('body').attr('uid');
	if(uid <= 0){
		if(_Fn.isMobile()){
			window.location.href = loginUrl + window.location.href;
			return;
		}
		callback && callback();
		$('[role-api=loginp2peye]').eq(0).trigger('click');
		return false;
	}
	return true;
}

/*
 *
 * 实名认证
 *
 */
window._Fn.certification = function(callback){
    if(!_Fn.isLogin)return false;
    var realname = $('body').attr('data-certification');
    if(realname == ''){
        window.location.href = '//m.p2peye.com/member.php?mod=certification';
        callback && callback();
        return false;
    }
    return true;
}

window._Fn.isBind = function(){
    if(!_Fn.isLogin())return;
	var
		url = window.location.href,
		_G_uid = parseInt($('body').attr('uid')),
	    _G_userkey = parseInt($('body').attr('userkey')),
	    _islogin = parseInt(_G_uid),
	    _isbind = _islogin ? _G_userkey : _islogin;
	url = '/member/bind?referer='+url;
	if(!_isbind){
		window.location.href = url;
		return false;
	}
	return true;
}

window._Fn.alert = function(text){

    var alertLen = $('.alert').length;
	if(alertLen > 0){

		var alert = $('.alert'),

        	timer=null;

	    clearTimeout(timer);

	    alert.find('span').html(text);

	    alert.fadeIn();

	    timer = setTimeout(function(){

	        alert.fadeOut();

	    },2000)

		return;
	}
    $('.ui-alert-box').remove();
    var content = template.render('alertTpl',{text:text});
    setTimeout(function(){
        $("body").append(content);
        var ele = $('.ui-alert-box');
        //var left = ele.outerWidth()/2;
        //ele.css("margin-left","-"+left+"px");  
        ele.click(function(){
            ele.fadeOut();              
        });
        setTimeout(function(){
            ele.fadeOut();
        },2000);
    },150)
}

window._Fn.loading = function(){

	return animate.circle();
	
}

window._Fn.loadingMulti = function(){
    return animate.circleMulti();
}

window._Fn.message = function(text){
    $('.ui-alert').remove();
    var content = template.render('messageTpl',{text:text});
    $("body").append(content);
    var ele = $('.ui-alert');
    var left = ele.width()/2;
    ele.css("margin-left","-"+left+"px");  
    ele.click(function(){
        ele.fadeOut();              
    });
    setTimeout(function(){
        ele.fadeOut();
    },3000);
}

window._Fn.history = function(){
    var url = window.location.href.split('/'),
        refererUrl = window.location.href.split(':');
    if(url[url.length - 1] == ''){
        url.splice(url.length - 1,1);
    }
    url.splice(url.length - 1,1);
    var targetUrl = url.join('/');

    

    if(targetUrl.indexOf('member') == targetUrl.length - 6){
        targetUrl = targetUrl.replace('/member','');
    }
    if(refererUrl.length > 2){
        targetUrl = refererUrl.splice(-1,1);
    }
    window.location.href = targetUrl;
}

/*
arg : 
{
	text : '',
	confirm: fn, 
	cancel : fn, 
	confirmText : 'yes',
	cancelText : 'no'
}
 */

window._Fn.confirm = function(options){
    var time = new Date().getTime();
    var data = {
    	text : options.text ? options.text : null,
    	confirmText : options.confirmText ? options.confirmText : null,
    	cancelText : options.cancelText ? options.cancelText : null
    }
    var content = template.render('confirmTpl',data);
    $("body").append(content);
    var ele = $('.ui-confirm');
    var left = ele.width()/2;
    ele.css("margin-left","-"+left+"px");
    ele.attr('id','confirm_'+time);

    var 
    
    confirm = $('#confirm_'+time).find('.confirm'),
    cancel = $('#confirm_'+time).find('.cancel');

    confirm.click(function(){
		$('#confirm_'+time).fadeOut(400,function(){
			$('#confirm_'+time).remove();
		});
		if(options.confirm){
    		options.confirm();
		}
	});
	confirm.mouseenter(function(event) {
		$(this).addClass('current');
	});
	confirm.mouseleave(function(event) {
		$(this).removeClass('current');
	});
    
	cancel.click(function(){
		$('#confirm_'+time).fadeOut(400,function(){
			$('#confirm_'+time).remove();
		});
		if(options.cancel){
    		options.cancel();
		}
	})
    cancel.mouseenter(function(event) {
		$(this).addClass('current');
	});
	cancel.mouseleave(function(event) {
		$(this).removeClass('current');
	});

}



$('body')
.on('touchend','[role=readmore]',function(){
	var that = $(this);
	getMore(that);
	return false;
})
.on('touchend','.mod-floatlayer .home',function(){
	$('body,html').animate({
		scrollTop : 0
	}, 500)
})
.on('touchend','.fn-back',function(){
    _Fn.history();
})
window._Fn = _Fn;

var ua = window.navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    document.addEventListener('DOMContentLoaded', function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee, false);
        var startCheckDate = new Date().getTime();
        var checkBaiduJsIsLoaded = setInterval(function(){

            var timeDiff = (new Date().getTime() - startCheckDate)/1000.0/60.0;
            if(timeDiff > 5){
                clearInterval(checkBaiduJsIsLoaded);
                return;
            }
            if(_hmt && _hmt.id == '556481319fcc744485a7d4122cb86ca7'){
                //alert('统计成功');
                _hmt.push(['_trackEvent','113000048','click','p2peye']);
                clearInterval(checkBaiduJsIsLoaded);
            }
        },10);
    }, false);
}
