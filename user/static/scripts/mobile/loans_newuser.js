var
    app = require('./app'),
    template = require('../modules/template'),
    getMoreList = require('../modules/getMoreList'),
    moreInput = $('input[name="argument"]'),
    layerOff=false;
    mobilePopup = require('../modules/mobile_popup'); //手机版弹出层

if(moreInput.length){
    var orderD = $('input[name="argument"]').attr('data-d'),
        orderL = $('input[name="argument"]').attr('data-l');

    getMoreList.init({
        url:'/loans/ajax',
        data:{
            d: orderD,
            p: 2,
            l: orderL
        },
        tpl:'loansTpl',
        ajaxtype: 'get'
    });
}
_Fn.backTop();

$('body')
.on('tap','.mask-layer',function(event){ //点击遮罩层
    if(layerOff) return false;
    layerOff=true;
    var item = $('.ui-classly-item-current');
    if(item.length){
        item.eq(0).trigger('tap');
    }
    return false;
})
.on('tap','.ui-classly-item',function(event){  //点击选项
    event.stopPropagation();
    var btn = $(this),
        index = btn.index(),
        slideDown = btn.attr('slideDown');
    
    $('.ui-classly-item').removeClass('ui-classly-item-current');
    btn.addClass('ui-classly-item-current');
    $('.ui-class-box').hide();
    $('.ui-class-box').eq(index).show();

    if(slideDown == 0){
        mobilePopup.showMaskLayer();
        $('.ui-class').slideDown();
        btn.attr({'slideDown':'1'});
        btn.parent().attr({'show' : 1});
        layerOff=false;
    }else if(slideDown == 1){
        $('.ui-class').slideUp('slow',function(){
            mobilePopup.hideMaskLayer();
            layerOff=false;
            $('.ui-classly-item').removeClass('ui-classly-item-current');
        });
        btn.attr({'slideDown':'0'});
    }

    if(index == 0){
        $('.ui-classly-item').eq(1).attr({'slideDown':'0'});
    }else if(index == 1){
        $('.ui-classly-item').eq(0).attr({'slideDown':'0'});
    }
    return false;
})
.on('tap','.ui-sort-packup',function(event){ //综合排序收起
    event.stopPropagation();
    $('.ui-classly-item').eq(0).trigger('tap');
    return false;
})
.on('tap','.ui-sort-item',function(event){ //综合排序里的列表
    event.stopPropagation();
    var that = $(this),
        text = that.find('span').html(),
        url = that.attr('url');
    $('.ui-sort-item').removeClass('ui-sort-current');
    that.addClass('ui-sort-current');
    $('.ui-classly-left span').eq(0).html(text);
    window.location.href = url; 
    return false;
})
.on('tap','.fn-switch',function(){ //展开收起
    var btn = $(this),
        showEle = $('.ui-screen-ulist'),
        defaultHeight = btn.attr('defaultHeight'),
        span = btn.find('span').eq(0),
        em = btn.find('em').eq(0);
    
    if(!btn.attr('show') || btn.attr('show')=='no'){
        //btn.attr({'defaultHeight' : showEle.css('height')});
        //showEle.css({ 'height' : 'auto' });
        showEle.addClass('ui-screen-ulist-scroll');
        span.html('收起');
        em.addClass('arrow-up');
        btn.attr({'show':'yes'});
    }else{
        //showEle.css({ 'height' : defaultHeight });
        showEle.removeClass('ui-screen-ulist-scroll');
        span.html('展开');
        em.removeClass('arrow-up');
        btn.attr({'show':'no'});
    }
})
.on('tap','.ui-screen-ulist li',function(event){ //筛选平台里的列表
    event.stopPropagation();
    var li = $(this),
        index = li.index();

    if(index == 0){
        $('.ui-screen-ulist li').removeClass('ui-screen-selected');
        $('.ui-screen-ulist li').eq(0).addClass('ui-screen-selected');
        screeningPlatform(0);
    }else{
        $('.ui-screen-ulist li').eq(0).removeClass('ui-screen-selected');

        if(li.hasClass('ui-screen-selected')){
            if(li.siblings().hasClass('ui-screen-selected')){  //如果没有任一兄弟节点选中，就不能取消
                li.removeClass('ui-screen-selected');
            }
        }else{
            li.addClass('ui-screen-selected');
        }
        screeningPlatform();
    }
    
    return false;
})
.on('tap','.ui-screen-btn-left',function(event){ //筛选平台里的重置
    event.stopPropagation();
    var li = $(this),
        index = li.index();

    $('.ui-screen-ulist li').eq(0).trigger('tap');
    return false;
});

function screeningPlatform(num){
    var parent = $('#screening'),
        ul = parent.find('ul'),
        list = ul.find('.ui-screen-selected'),
        platformEle = parent.find('.ui-screen-hd-left b').eq(0),
        tenderEle = parent.find('.ui-screen-hd-left b').eq(1),
        aEle = parent.find('.ui-screen-btn-right a'),
        url = '',
        tenderNum = 0,
        platformNum = 0;

    if(num ==0){//不限
        url = '/loans/newuser/b0r0t0ld0p1.html';
        tenderNum = parseInt(ul.attr('tenderNum'));
        platformNum = parseInt(ul.attr('platformNum'));
    }else{
        if(list.length == 1){ //1个
            url = list.attr('url');
            tenderNum = parseInt(list.attr('tender'));
            platformNum = list.length;
        }else if(list.length > 1){ //多个
            var id_str = '';
            list.each(function(i){
                id_str += $(this).attr('data');
                tenderNum += parseInt($(this).attr('tender'));
            });
            url = '/loans/newuser/b0r0t0l' + id_str + 'd0p1.html';
            platformNum = list.length;
        }
    }
    platformEle.html(platformNum);
    tenderEle.html(tenderNum);
    aEle.attr({'href' : url});

}
$(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
    if(scrollTop > 0){
        $('.ui-classly-wrap').css({'border-bottom':'2px solid #e9e9e9'})
    }
});


