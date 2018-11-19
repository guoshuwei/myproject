var
dialogUi= require('../modules/dialogUi'),
statistics = require('../modules/statistics'),
resultCall = require('../modules/ajaxcodecall'),
template = require('../modules/template'),
// member = require('../modules/member_header'),
// bind = require('../modules/bind'),
ui = require('../modules/ui'),
// cookie = require('../modules/cookie'),
follow = require('../modules/follow'),
animate = require('../modules/animate'),
// cookie = require('../plugins/$.cookie'),
floatlayer = require('../modules/floatlayer');

// var
// mockHost = '/mockserver',
// mockVal = parseInt($('meta[name=p2peye_mock]').attr('content'));

var NOTICETITLE = [];
window.noticeTitle = function noticeTitle() {
	NOTICETITLE = {'State':0, 'oldTitle':document.title, flashNumber:0, sleep:15};
	window.setInterval(function(){
		noticeTitleFlash();
	}, 500);
}

function noticeTitleFlash() {
	if(NOTICETITLE.flashNumber < 5 || NOTICETITLE.flashNumber > 4 && !NOTICETITLE['State']) {
		document.title = (NOTICETITLE['State'] ? '【　　　】' : '【新提醒】') + NOTICETITLE['oldTitle'];
		NOTICETITLE['State'] = !NOTICETITLE['State'];
	}
	NOTICETITLE.flashNumber = NOTICETITLE.flashNumber < NOTICETITLE.sleep ? ++NOTICETITLE.flashNumber : 0;
}

window._Fn =  window._Fn  || {};
// document.domain = "nonglian.com";
window._Fn.track = statistics;

window._Fn.alert = function(text){
    $('.ui-alert').remove();
    var content = template.render('alertTpl',{text:text});
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
};
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
};

window._Fn.navFixed = function(){
	return;

	var status = 1;

	var handle = function(){

		var nav = $('.header').eq(0);

		var clone = nav.clone();

		clone.addClass("pettyheader");

		$('body').append(clone);

		$(".pettyheader .logo img").attr("src","/styles/images/common/smalllogo.png");

		clone.css({
			width : '100%'
		});

		return {
			fixed : function(){
				clone.css({
					position:'fixed',
					left: 0,
					top:'-80px',
					display:"block"
				}).animate({
					top:0
				}, 500)
			},
			absolute : function(){
				clone.css({
					top:0
				}).css({
					top:'-80px',
					display:'none'
				}, 500)
			}
		}
	}();

	$(window).scroll(function(){

		var scrollTop = $(window).scrollTop();

		if(status == 1 && scrollTop > 200){
			status = 2;
			handle.fixed();
		}

		if(status == 2 && scrollTop <= 200){
			status = 1;
			handle.absolute();
		}
	})
};

window._Fn.loading = function(){

	return animate.circle();
}
window._Fn.loadingMulti = function(){
    return animate.circleMulti();
}
window._Fn.lightboxWrap = function(){

    var h=Math.max($('body').outerHeight(),$(window).height());

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
    };
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
	});
    cancel.mouseenter(function(event) {
		$(this).addClass('current');
	});
	cancel.mouseleave(function(event) {
		$(this).removeClass('current');
	});

};

$('body')
.on('click','[role=readmore]',function(){
	var that = $(this);
	getMore(that);
	return false;
})
.on('click','.mod-floatlayer .home',function(){
	$('body,html').animate({
		scrollTop : 0
	}, 500)
});
window._Fn = _Fn;
