/**
 * jquery.tab.js
 * 
 * @author: XieJun
 * @e-mail: jununx@qq.com
 * @q    q: 121318538
 */

;(function($) {
    $.fn.extend({
        tabs: function(hd, bd, option) {
            var defaultOptions = {
                "sClass": "active",
                "ev": "click"
            };
            var options = $.extend(defaultOptions, option || {});

            return this.each(function() {
            	var $this = $(this);

                $this.find(hd).on(options.ev, function() {
                    $(this).siblings().removeClass(options.sClass).end().addClass(options.sClass);
                    $this.find(bd).hide().removeClass(options.sClass);
                    $this.find(bd).eq($(this).index()).show().addClass(options.sClass);
                }).eq(0).trigger(options.ev);
            });
        }
    });
}(jQuery));
