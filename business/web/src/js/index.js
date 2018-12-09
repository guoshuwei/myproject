/**
 *
 * @author: XieJun
 * @e-mail: jununx@qq.com
 * @q    q: 121318538
 * @update: 2015/10/19
 */

$(function(){
    // index menu change class
    menuChangeClass();
    function menuChangeClass(){
        var oIndexMenu = $('.J_IndexMenu'),
            sChangeClass = 'active',
            timer = null;

        oIndexMenu.find('.handle').on('mouseenter', function(){
            var $this = $(this);
            timer = setTimeout(function(){
                $this.parent().addClass(sChangeClass).siblings().removeClass(sChangeClass);
            }, 10);
        }).on('mouseleave', function(){
            clearTimeout(timer);
        });
        oIndexMenu.find('.shade').on('mouseleave', function(){
            $(this).parent().removeClass(sChangeClass);
        });
    }

});