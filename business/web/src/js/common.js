/**
 *
 * @author: XieJun
 * @e-mail: jununx@qq.com
 * @q    q: 121318538
 * @update: 2015/10/16
 */

var eHR = eHR || {};

// calcSiteBodyHeight
eHR.calcSiteBodyHeight = function(){
    var iSiteTop = 70,
        winH = $(window).height(),
        oSiteBody = $('.J_SiteBody');
    oSiteBody.height(winH - iSiteTop);
};


// change hover class
eHR.changeHoverClass = function(obj, sClass){
    obj.hover(function(){
        $(this).addClass(sClass);
    },function(){
        $(this).removeClass(sClass);
    });
};

// checkbox
eHR.check = function(){
    $('.J_Check').each(function(i, el){
        var elem = $(el);
        // 是否禁用
        var disabled = elem.find('input').prop('disabled');
        // 设置初始状态
        var checkState = function(){
            // 是否选中
            var checked = elem.find('input').prop('checked');

            if(disabled){
                elem.addClass('m-check-dis');
            } else {
                if (checked) {
                    elem.addClass('m-check-on').prop('checked', true);
                } else {
                    elem.removeClass('m-check-on').removeAttr('checked');
                }
            }
        };
        checkState();

        if(!disabled){
            elem.find('input').on('click', checkState);
        }
    });
};

eHR.autoscroll = function (obj, scrollTop) {
    $(obj).animate({
        scrollTop: scrollTop
    },500);
};

eHR.scrollMenu = function(){
    var oScrollMenu = $('.J_ScrollMenu');
    if(oScrollMenu.size()){
        oScrollMenu.slimscroll({
            color: '#ccc',
            width: '90px',
            height: '100%'
        });
    }
};

eHR.calcToTopPosition = function(){
    var w = $('body').width() - 17,
        m = $('.J_SiteMain'),
        s = $('.J_SiteSide').width() || 0,
        ss = (function(){
            var oss = $('.slimScroll-policy'),
                res = 0;
            if(oss.size() && oss.is(':visible')){
                res = oss.width();
            }
            return res;
        }()),
        o = $('.J_ToTop'),
        empty = 10,
        layout = 1000,
        gap = (w - s - ss - layout) / 2,
        l = s + ss + layout + empty + ( gap < 0 ? 0 : gap ),
        cssMap = null;
    if(m.scrollTop() > 0){
        cssMap = {
            left: l,
            display: 'block'
        };
    } else {
        cssMap = {
            left: l,
            display: 'none'
        };
    }
    o.css(cssMap);
};

$(function(){
    // change topbar avatar
    eHR.changeHoverClass($('.J_Avatar'), 'active');

    // calcSiteBodyHeight
    $(window).on('load resize', function(){
        eHR.calcSiteBodyHeight();
        eHR.calcToTopPosition();
    });

    // 所有check
    eHR.check();

    // 返回顶部
    $('.J_SiteMain').on('scroll', eHR.calcToTopPosition);
    $('.J_ToTop').on('click', function(){
        eHR.autoscroll('.J_SiteMain', 0);
    });

    // scrollMenu
    eHR.scrollMenu();
});

