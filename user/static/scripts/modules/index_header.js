var template = require('../modules/template'),
    bxSlider = require('../plugins/jquery.bxslider_.min');
if(document.compatMode=="CSS1Compat"){
    var winHeight=document.documentElement.clientHeight;
}else{
    var winHeight=document.body.clientHeight;
}

var 
navs = $('.navs'),
listTop = $('.navsparent').offset().top;

$(window,document).scroll(function(){

	var winTop = $(window).scrollTop();
	

	if(winTop >= listTop  && !navs.hasClass('fixed')){
		navs.addClass('fixed');
		$('.navs').addClass('navs-fixed');
		$('.mod-platfixed .webname').css('display','block');
	}
	if(winTop < listTop && navs.hasClass('fixed')){
		navs.removeClass('fixed');
		$('.navs').removeClass('navs-fixed');
		$('.mod-platfixed .webname').hide();
	}
});
$('body')
	.on('click','.webnamebtn',function(){

		var data = {},contents='',that = $(this);

		data = {
			platname: that.attr('data-name'),
			href: that.attr('data-href')
		};

		contents = template.render('officialwebsiteTpl',data);

		$('body').append(contents);

		lightboxWrap();
		$('.hotplatforms-tab ul').bxSlider({
		  controls: true,
		  auto: false,
		  infiniteLoop: false,
		  autoHover: false,
		  pause : 4000,
		  mod:'vertical',
		  prevText:'&nbsp;',
		  nextText:'&nbsp;',
		  prevSelector:'.hotplatforms-tab .hotplatforms-prev',
		  nextSelector:'.hotplatforms-tab .hotplatforms-next'
		});

	})
	.on('click','.closebtn',function(){
		$(this).parents('.officialwebsite').remove();
		$('#lightbox_wrap').fadeOut();
	})
	.on('mouseenter','.fn-contact',function(){
		$(this).find('.ui-contact-boxp').show();
	})
	.on('mouseleave','.fn-contact',function(){
		$(this).find('.ui-contact-boxp').hide();
	});
function lightboxWrap(){

	if(!$('#lightbox_wrap').length){

        var lightbox = $('<div id="lightbox_wrap"></div>');

        lightbox.css({

            'width':'100%',

            'height':$('body').outerHeight()

        }).appendTo($('body'));

    }else{

        var lightbox = $('#lightbox_wrap');

        lightbox.fadeIn();

    }
}


/**
 * 平台实力详情弹窗
 */
$('#btn_ptsl_detail').click(function(){
    _Fn.track.fire(116000001);
	$('.ptsl_detail').css('display', 'table');
});
$('.ptsl_detail .close').click(function(){
	$('.ptsl_detail').hide();
});
/**
 * 对比链接
 */
$('#c_btn').click(function(){
	var platId = $(this).attr('data-platId');
	$.cookie('plat_select_id',platId+'%%%',{domain:'.p2peye.com',path:'/'});
});

/**
 * 平台活动
 * {
    "code": 200,
    "message": "Success.",
    "data": {
        "id": "8",
        "pic": "//img.p2peye.com/2016/10/14/6741e599b5bbe789e6cf0d2dfb822e04.jpg",
        "title": "芒果金融活动1",
        "time_distance": "18003800",
        "distance": 208
		}
	}
 */
$.ajax({
	type: 'GET',
	url: '/index/getCpc',
	data: {},
	dataType:'json',
	success: function(msg){
		var targetSrc = '';
		if(msg.code==200){
			targetSrc = '<div class="key_val key_val_even" track="116000021">'+
					'<div class="key">平台活动 :</div>'+
					'<div class="val">'+msg.data.title+
						'<a style="padding-left:17px;" class="detail" href="//www.p2peye.com/huodong/clicks/'+msg.data.id+'/?source=cpc_danganxqypc">领红包>></a>'+
					'</div>'+
				'</div>';

		}else{
			targetSrc = '<div class="key_val key_val_even" track="116000021">'+
				'<div class="key">平台活动 :</div>'+
				'<div class="val">暂无'+
					'<a style="padding-left:17px;" class="detail" href="//www.p2peye.com/huodong/" title="更多活动" target="_blank">查看更多活动>></a>'+
				'</div>'+
			'</div>';
		}
		$('.key_vals').children().eq(2).after(targetSrc);
	}
});