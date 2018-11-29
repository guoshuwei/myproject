var store__ = (function () {
    var api               = {},
        win               = window,
        doc               = win.document,
        localStorageName  = 'localStorage',
        globalStorageName = 'globalStorage',
        tableKeys=[],
        storage;


    api.set    = function (key, value) {};
    api.get    = function (key)        {};
    api.remove = function (key)        {};
    api.clear  = function ()           {};


    if (localStorageName in win && win[localStorageName]) {
        storage    = win[localStorageName];
        api.set    = function (key, val) { storage.setItem(key, val) };
        api.get    = function (key)      { return storage.getItem(key) };
        api.remove = function (key)      { storage.removeItem(key) };
        api.clear  = function ()         { storage.clear() };
        api.forEach = function() {

            return storage;
        }


    } else if (globalStorageName in win && win[globalStorageName]) {
        storage    = win[globalStorageName][win.location.hostname];
        api.set    = function (key, val) { storage[key] = val };
        api.get    = function (key)      { return storage[key] && storage[key].value };
        api.remove = function (key)      { delete storage[key] };
        api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };


    } else if (doc.documentElement.addBehavior) {
        function getStorage() {
            if (storage) { return storage }
            storage = doc.body.appendChild(doc.createElement('div'));
            storage.style.display = 'none';
            // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
            // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
            storage.addBehavior('#default#userData');
            storage.load(localStorageName);
            return storage;
        }
        api.set = function (key, val) {
            var storage = getStorage();
            storage.setAttribute(key, val);
            storage.save(localStorageName);
        };
        api.get = function (key) {
            var storage = getStorage();
            return storage.getAttribute(key);
        };
        api.remove = function (key) {
            var storage = getStorage();
            storage.removeAttribute(key);
            storage.save(localStorageName);
        }
        api.clear = function () {
            var storage = getStorage();
            var attributes = storage.XMLDocument.documentElement.attributes;;
            storage.load(localStorageName);
            for (var i=0, attr; attr = attributes[i]; i++) {
                storage.removeAttribute(attr.name);
            }
            storage.save(localStorageName);
        }
    }
    return api;
})();
if(store__.get('double_one_flag_is_played') == '1'){
    (function ($) {
        var words_ = $('.double_one_words');
        var words_source = words_.find('.words');
        var words_target_wrap = words_.find('.words_target_wrap');
        var words_target = words_.find('.words_target');
        words_source.hide();
        words_target_wrap.show();
        words_.css({
            left: '10px',
            top: 'auto',
            bottom: '10px',
            width: '200px',
            height: '200px',
            display: 'table'
        });
        words_target.css({
            width: '100%'
        });
        $('.words_close').click(function(e){
            words_.hide();
        });
    })(jQuery);
}else{
    jQuery.easing['jswing'] = jQuery.easing['swing'];
    jQuery.extend( jQuery.easing,
        {
            def: 'easeOutQuad',
            swing: function (x, t, b, c, d) {
                //alert(jQuery.easing.default);
                return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
            },
            easeInQuad: function (x, t, b, c, d) {
                return c*(t/=d)*t + b;
            },
            easeOutQuad: function (x, t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOutQuad: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInCubic: function (x, t, b, c, d) {
                return c*(t/=d)*t*t + b;
            },
            easeOutCubic: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOutCubic: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            },
            easeInQuart: function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t + b;
            },
            easeOutQuart: function (x, t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOutQuart: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            easeInQuint: function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOutQuint: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOutQuint: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            },
            easeInSine: function (x, t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOutSine: function (x, t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOutSine: function (x, t, b, c, d) {
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            },
            easeInExpo: function (x, t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOutExpo: function (x, t, b, c, d) {
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOutExpo: function (x, t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function (x, t, b, c, d) {
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOutCirc: function (x, t, b, c, d) {
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOutCirc: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            },
            easeInElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOutElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },
            easeInOutElastic: function (x, t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            },
            easeInBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOutBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOutBack: function (x, t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            easeInBounce: function (x, t, b, c, d) {
                return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
            },
            easeOutBounce: function (x, t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOutBounce: function (x, t, b, c, d) {
                if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
                return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        });



    /*
     * JQuery CSS Rotate property using CSS3 Transformations
     * Copyright (c) 2011 Jakub Jankiewicz  <http://jcubic.pl>
     * licensed under the LGPL Version 3 license.
     * http://www.gnu.org/licenses/lgpl.html
     */
    (function($) {
        var property = (function() {
            var element = document.createElement('div');
            var properties = ['transform', 'WebkitTransform',
                'MozTransform', 'msTransform',
                'OTransform'];
            var p;
            while (p = properties.shift()) {
                if (element.style[p] !== undefined) {
                    return p;
                }
            }
            return false;
        })();
        $.cssHooks['rotate'] = {
            get: function(elem, computed, extra){
                if (property) {
                    var transform = elem.style[property];
                    if (transform) {
                        return transform.replace(/.*rotate\((.*)deg\).*/, '$1');
                    } else {
                        var matrix = getComputedStyle(elem, null)[property];
                        if (matrix.match(/matrix\(1, *0, *0, *1, *0, *0\)/)) {
                            return '';
                        } else {
                            var m = matrix.match(/matrix\([^,]+, *([^,]+),/);
                            var angle = Math.round(Math.asin(m[1]) * (180/Math.PI));
                            return angle;
                        }
                    }
                } else {
                    return '';
                }
            },
            set: function(elem, value){
                if (property) {
                    value = parseInt(value);
                    if (value == 0) {
                        elem.style[property] = '';
                    } else {
                        elem.style[property] = 'rotate(' + value%360 + 'deg)';
                    }
                } else {
                    return '';
                }
            }
        };
        $.fx.step['rotate'] = function(fx){
            $.cssHooks['rotate'].set(fx.elem, fx.now);
        };
    })(jQuery);

    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    var prefix;
    //通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
    for( var i = 0; i < prefixes.length; i++ ) {
        if ( requestAnimationFrame && cancelAnimationFrame ) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
        cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
    }

    //如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
    if ( !requestAnimationFrame || !cancelAnimationFrame ) {
        requestAnimationFrame = function( callback, element ) {
            var currTime = new Date().getTime();
            //为了使setTimteout的尽可能的接近每秒60帧的效果
            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
            var id = window.setTimeout( function() {
                callback( currTime + timeToCall );
            }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };

        cancelAnimationFrame = function( id ) {
            window.clearTimeout( id );
        };
    }

    //得到兼容各浏览器的API
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;


    /**
     * Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
     * scale and rotation independently.
     * https://github.com/zachstronaut/jquery-animate-css-rotate-scale
     * Released under dual MIT/GPL license just like jQuery.
     * 2009-2012 Zachary Johnson www.zachstronaut.com
     */
    (function ($) {
        // Updated 2010.11.06
        // Updated 2012.10.13 - Firefox 16 transform style returns a matrix rather than a string of transform functions.  This broke the features of this jQuery patch in Firefox 16.  It should be possible to parse the matrix for both scale and rotate (especially when scale is the same for both the X and Y axis), however the matrix does have disadvantages such as using its own units and also 45deg being indistinguishable from 45+360deg.  To get around these issues, this patch tracks internally the scale, rotation, and rotation units for any elements that are .scale()'ed, .rotate()'ed, or animated.  The major consequences of this are that 1. the scaled/rotated element will blow away any other transform rules applied to the same element (such as skew or translate), and 2. the scaled/rotated element is unaware of any preset scale or rotation initally set by page CSS rules.  You will have to explicitly set the starting scale/rotation value.

        function initData(el_dom) {
            var _ARS_data = el_dom.data('_ARS_data');
            if (!_ARS_data) {
                _ARS_data = {
                    rotateUnits: 'deg',
                    scale: 1,
                    rotate: 0
                };

                el_dom.data('_ARS_data', _ARS_data);
            }

            return _ARS_data;
        }

        function setTransform(el__, data) {
            el__.css('transform', 'rotate(' + data.rotate + data.rotateUnits + ') scale(' + data.scale + ',' + data.scale + ')');
        }

        $.fn.rotate = function (val) {
            var self__ = $(this), m, data = initData(self__);

            if (typeof val == 'undefined') {
                return data.rotate + data.rotateUnits;
            }

            m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
            if (m) {
                if (m[3]) {
                    data.rotateUnits = m[3];
                }

                data.rotate = m[1];

                setTransform(self__, data);
            }

            return this;
        };

        // Note that scale is unitless.
        $.fn.scale = function (val) {
            var self__ = $(this), data = initData(self__);

            if (typeof val == 'undefined') {
                return data.scale;
            }

            data.scale = val;

            setTransform(self__, data);

            return this;
        };

        // fx.cur() must be monkey patched because otherwise it would always
        // return 0 for current rotate and scale values
        var curProxied = $.fx.prototype.cur;
        $.fx.prototype.cur = function () {
            if (this.prop == 'rotate') {
                return parseFloat($(this.elem).rotate());

            } else if (this.prop == 'scale') {
                return parseFloat($(this.elem).scale());
            }

            return curProxied.apply(this, arguments);
        };

        $.fx.step.rotate = function (fx) {
            var data = initData($(fx.elem));
            $(fx.elem).rotate(fx.now + data.rotateUnits);
        };

        $.fx.step.scale = function (fx) {
            $(fx.elem).scale(fx.now);
        };

        /*

         Starting on line 3905 of jquery-1.3.2.js we have this code:

         // We need to compute starting value
         if ( unit != "px" ) {
         self.style[ name ] = (end || 1) + unit;
         start = ((end || 1) / e.cur(true)) * start;
         self.style[ name ] = start + unit;
         }

         This creates a problem where we cannot give units to our custom animation
         because if we do then this code will execute and because self.style[name]
         does not exist where name is our custom animation's name then e.cur(true)
         will likely return zero and create a divide by zero bug which will set
         start to NaN.

         The following monkey patch for animate() gets around this by storing the
         units used in the rotation definition and then stripping the units off.

         */

        var animateProxied = $.fn.animate;
        $.fn.animate = function (prop) {
            if (typeof prop['rotate'] != 'undefined') {
                var self__, data, m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
                if (m && m[5]) {
                    self__ = $(this);
                    data = initData(self__);
                    data.rotateUnits = m[5];
                }

                prop['rotate'] = m[1];
            }

            return animateProxied.apply(this, arguments);
        };
    })(jQuery);



    (function(sources, callback){
        var count = 0,
            imgNum = sources.length;
        for(var i=0;i<imgNum;i++){
            var image = new Image();
            image.onload = function(){
                if(++count >= imgNum){
                    callback();
                }
            }
            image.src = sources[i];
        }
    })([
        '//www.p2peye.com/static/styles/images/activity/double_one/ufo/ufo_fragment.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/ufo/ufo_door.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/shadow/1.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/shadow/2.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/shadow/3.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/shadow/4.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/shadow/5.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/1.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/2.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/3.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/gift/gift_final.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/jump/1.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/jump/2.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/ufo/ufo.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/ufo/ufo_all.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/light/light.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/words/1.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/kneel/1.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/kneel/2.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/kneel/3.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/kneel/4.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/kneel/5.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/kneel/6.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/man/kneel/7.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/cloud/1.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/cloud/2.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/boom/1.png',
        '//www.p2peye.com/static/styles/images/activity/double_one/close.png',
        '//www.p2peye.com/static/image/ad_close_left.png'
    ], function(){
        var body = $('body');
        var activity_double_one = $('.activity_double_one').show();
        var container = $('.double_one');
        var ufo_fragment = container.find('.ufo_fragment');
        var ufo_img = container.find('.ufo_img');
        var ufo = container.find('.ufo');
        var ufo_all = container.find('.ufo_all');
        var ufo_door = container.find('.ufo_door');
        var ufo_light = container.find('.ufo_light');
        var ufo_gifts = container.find('.ufo_gift');
        var gift_shadows = container.find('.gift_shadows');
        var jump_man = container.find('.jump_man');
        var jump_shadow = container.find('.jump_shadow');
        var ufo_cloud1 = container.find('.ufo_cloud1');
        var ufo_cloud2 = container.find('.ufo_cloud2');
        var ufo_cloud3 = container.find('.ufo_cloud3');
        var ufo_cloud4 = container.find('.ufo_cloud4');
        var ufo_boom = container.find('.ufo_boom');
        var words = ufo.find('.words');
        var words_ = $('.double_one_words');
        var words_close = words_.find('.words_close');
        var words_source = words_.find('.words');
        var words_target_wrap = words_.find('.words_target_wrap');
        var words_target = words_.find('.words_target');
        var kneel_man7_copy = words_.find('.kneel_man7_copy');
        var kneel_man1 = container.find('.kneel_man1');
        var kneel_man2 = container.find('.kneel_man2');
        var kneel_man3 = container.find('.kneel_man3');
        var kneel_man4 = container.find('.kneel_man4');
        var kneel_man5 = container.find('.kneel_man5');
        var kneel_man6 = container.find('.kneel_man6');
        var kneel_man7 = container.find('.kneel_man7');
        var close = container.find('.close');
        var close_img = close.find('.close_img');
        var close_txt = close.find('.close_txt');
        var cW = screen.availWidth;
        var cH = container.height();
        var isStopAnimate = false;

        words_close.click(function(e){
            words_.hide();
        });
        close_img.click(function(e){
            store__.set('double_one_flag_is_played', '1');
            close_img.hide();
            close_txt.show();
            isStopAnimate = true;
            ufo.hide();
            words_.css({
                display: 'table',
                left: parseFloat(ufo.css('left').replace('px',''))+parseFloat(words.css('left').replace('px',''))+'px',
                top: parseFloat(ufo.css('top').replace('px',''))+parseFloat(words.css('top').replace('px',''))-47+'px'
            }).animate({
                left: '10px',
                top: document.documentElement.clientHeight - 200 - 10 + 'px',
                width: '200px',
                height: '200px',
                rotate: '720deg'
            }, 1000, function(){
                words_.css({
                    top: 'auto',
                    bottom: '10px'
                });
                var tempH = words_source.height();
                words_source.css({
                    height: tempH +'px'
                }).animate({
                    width: 0
                }, 700, function(){
                    words_source.hide();
                    words_target_wrap.show();
                    words_target.css({
                        width: 0
                    }).animate({
                        width: '100%'
                    }, 1000, function(){
                        activity_double_one.remove();
                    });
                });
            });
        });

        var isIE = !!window.ActiveXObject;
        var isIE6 = isIE && !window.XMLHttpRequest;
        var isIE8 = isIE && !!document.documentMode;
        var isIE7 = isIE && !isIE6 && !isIE8;
        window.isIELower = isIE6 || isIE7 || isIE8;
        if(window.isIELower){
            if (!Function.prototype.bind) {
                Function.prototype.bind = function (oThis) {
                    if (typeof this !== "function") {
                        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                    }
                    var aArgs = Array.prototype.slice.call(arguments, 1),
                        fToBind = this,
                        fNOP = function () {},
                        fBound = function () {
                            return fToBind.apply(this instanceof fNOP && oThis
                                    ? this
                                    : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
                        };
                    fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();
                    return fBound;
                };
            }
        }


        function step_one(){
            var num = 150;     // 输出点数
            var output = [];    // 输出点数组
            var diff_w = 147;
            var diff_distance = window.isIELower? 0: 150;
            var input = [
                [cW*0.995 -diff_w, 266*cW/800],
                [cW*0.77875 -diff_w, -17*cW/800],
                [cW*0.25 -diff_w, -86*cW/800],
                [cW*0.17625 -diff_w, 61*cW/800],
                [cW/2 -diff_w - diff_distance, 0]
            ]; // 输入点
            var input_w = [
                [501,433],
                [325,95],
                [-226,130],
                [150,224],
                [294,194]
            ];
            var output_w = [];
            ufo.css({
                display: 'block',
                left: input[0][0] + 'px',
                top: input[0][1] + 'px'
            });
            function draw_bezier_curves(input,num, output)
            {
                var step = 1.0 / num;
                var t =0;
                var count = input.length;
                for(var i=0; i<num; i++)
                {
                    var tmp_points = [];
                    for (var j = 1; j < count; ++j)
                    {
                        for (var k = 0; k < count - j; ++k)
                        {
                            var tmp_point = {};
                            if (j == 1)
                            {
                                tmp_point.x = input[k][0] * (1 - t) + input[k + 1][0] * t;
                                tmp_point.y = input[k][1] * (1 - t) + input[k + 1][1] * t;
                                tmp_points[k] = tmp_point;
                                continue;
                            }
                            tmp_point.x = tmp_points[k].x * (1 - t) + tmp_points[k + 1].x * t;
                            tmp_point.y = tmp_points[k].y * (1 - t) + tmp_points[k + 1].y * t;
                            tmp_points[k] = tmp_point;
                        }
                    }
                    t += step;
                    output[i] = tmp_points[0];
                }
            }

            draw_bezier_curves(input,num, output);// 二阶贝塞尔曲线
            draw_bezier_curves(input_w,num, output_w);// 二阶贝塞尔曲线
            output_w[output_w.length-1].x = 294;
            var i = 0;

            function step() {
                if(!output[i] || isStopAnimate){
                    return;
                }
                ufo.css({
                    left: output[i].x + 'px',
                    top: output[i].y + 'px',
                    width: output_w[i].x + 'px'
                });
                i++;
                if (i >= num) {
                    if(window.isIELower){
                        ufo_all.hide();
                        ufo_img.show();
                        ufo_fragment.show();
                        step_two();
                    }else{
                        ufo.animate({
                            left: parseFloat(ufo.css('left').replace('px',''))+diff_distance+'px',
                            rotate: '-8deg'
                        }, 1000, 'easeOutExpo', function(){
                            if(isStopAnimate)return;
                            ufo.animate({
                                rotate: '0deg'
                            }, 200, 'easeInOutExpo', function(){
                                if(isStopAnimate)return;
                                ufo_all.hide();
                                ufo_img.show();
                                ufo_fragment.show();
                                step_two();
                            });
                        });
                    }
                }
                requestAnimationFrame(step);
            }

            step();

        }



        step_one();


        function step_two(){
            ufo_door.show().animate({
                width: '83.5px',
                height: '12px',
                'margin-top': '147px'
            }, 1000, function(){
                if(isStopAnimate)return;
                var lightcount = 0;
                var lightInterval = setInterval(function(){
                    if(isStopAnimate){clearInterval(lightInterval); return;}
                    if(lightcount%2 == 0){
                        ufo_light.show();
                        if(lightcount > 4){
                            clearInterval(lightInterval);
                            step_three();
                        }
                    }else{
                        ufo_light.hide();
                    }
                    lightcount++;
                }, 100);
            });
        }

        function step_three(){
            var total_time = 1000;
            setTimeout(function(){
                var shadowcount = 0;
                var shadowInterval = setInterval(function(){
                    if(shadowcount > 4 || isStopAnimate){
                        clearInterval(shadowInterval);
                        return;
                    }
                    gift_shadows.children().hide().eq(shadowcount).show();
                    shadowcount++;
                }, total_time/10);
            }, total_time/2);


            ufo_gifts.eq(0).show().animate({
                top: '376px',
                width: '110px',
                left: '95px'
            }, total_time, 'easeInExpo', function(){
                if(isStopAnimate)return;
                setTimeout(function(){
                    if(isStopAnimate)return;
                    ufo_gifts.eq(0).hide();
                    ufo_gifts.eq(1).show();
                    setTimeout(function(){
                        if(isStopAnimate)return;
                        ufo_gifts.eq(1).hide();
                        ufo_gifts.eq(2).show();
                        setTimeout(function(){
                            if(isStopAnimate)return;
                            ufo_gifts.eq(2).hide();
                            ufo_gifts.eq(1).show();
                            setTimeout(function(){
                                if(isStopAnimate)return;
                                ufo_gifts.eq(1).hide();
                                ufo_gifts.eq(2).css('top', '385px').show();
                                step_four();
                            }, 60);
                        }, 60);
                    }, 60);
                }, 30);
            });
        }

        function step_four(){
            var total_time = 1000;

            setTimeout(function(){
                if(isStopAnimate)return;
                ufo_light.hide();
                ufo_door.show().animate({
                    width: '0',
                    height: '0',
                    'margin-top': '153px'
                }, 1500);
            }, 800);

            jump_man.show().animate({
                top: '319px',
                width: '89px',
                left: '105px'
            }, total_time, 'easeInExpo', function(){
                if(isStopAnimate)return;
                jump_shadow.show();
                ufo_gifts.eq(2).hide();
                ufo_gifts.eq(0).show();
                step_five();
            });
        }


        var step_five_count = 0;
        var step_five_time = 100;
        function step_five(){
            if(isStopAnimate)return;
            /*if(step_five_count > 33){
             return;
             }*/
            if(step_five_count == 0){
                ufo_fragment.hide();
                ufo_img.hide();
                ufo_all.show();
                var time_count = 150;


                setTimeout(function(){
                    ufo_cloud1.show();

                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, 300);
            }else if(step_five_count == 1){
                setTimeout(function(){
                    ufo_cloud1.css({
                        width: '500px',
                        top: '207px',
                        left: '-25px'
                    });
                    ufo_boom.show();
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 2){
                setTimeout(function(){
                    ufo_boom.css({
                        top: '120px'
                    });
                    ufo_cloud1.css({
                        width: '600px',
                        top: '150px',
                        left: '-80px'
                    });

                    //hide gift and shadow
                    gift_shadows.hide();
                    ufo_gifts.hide();

                    ufo_cloud2.show();
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 3){
                setTimeout(function(){
                    ufo_all.css({
                        left: '10px'
                    });
                    ufo_boom.css({
                        width: '410px',
                        top: '110px',
                        left: '-60px'
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 4){
                setTimeout(function(){
                    ufo_all.css({
                        left: '0px'
                    });
                    ufo_cloud2.css({
                        top: '350px',
                        left: '-162px',
                        width: '420px'
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 5){
                setTimeout(function(){
                    ufo_all.css({
                        top: '-5px',
                        left: '-5px',
                        width: '95%'
                    });
                    ufo_boom.css({
                        width: '450px',
                        top: '85px',
                        left: '-85px'
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 6){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-42px',
                        top: '-26px',
                        width: '90%'
                    });
                    ufo_cloud2.css({
                        opacity: .9,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
                        filter: "alpha(opacity=90)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 7){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-83px',
                        top: '-50px',
                        width: '85%'
                    });
                    ufo_cloud2.css({
                        opacity: .8,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",
                        filter: "alpha(opacity=80)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 8){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-125px',
                        top: '-75px',
                        width: '80%'
                    });
                    ufo_cloud2.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 9){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-166px',
                        top: '-100px',
                        width: '75%'
                    });
                    ufo_cloud2.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 10){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-208px',
                        top: '-125px',
                        width: '70%'
                    });
                    ufo_cloud2.css({
                        opacity: .4,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)",
                        filter: "alpha(opacity=40)"
                    });

                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 11){
                setTimeout(function(){

                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 12){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-250px',
                        top: '-150px',
                        width: '65%'
                    });
                    ufo_cloud2.css({
                        opacity: .5,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
                        filter: "alpha(opacity=50)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 13){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-350px',
                        top: '-250px',
                        width: '45%'
                    });
                    ufo_boom.hide();

                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 14){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-450px',
                        top: '-350px',
                        width: '25%'
                    });
                    ufo_cloud2.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 15){
                setTimeout(function(){
                    ufo_all.css({
                        left: '-550px',
                        top: '-450px',
                        width: '5%'
                    });
                    ufo_cloud2.css({
                        opacity: .8,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",
                        filter: "alpha(opacity=80)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 16){
                setTimeout(function(){
                    ufo_all.hide();
                    ufo_cloud2.css({
                        opacity: .9,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
                        filter: "alpha(opacity=90)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 17){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: 1,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        filter: "alpha(opacity=100)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 18){
                setTimeout(function(){
                    ufo_cloud3.show();
                    ufo_cloud4.show();
                    jump_man.hide();
                    jump_shadow.hide();
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 19){
                setTimeout(function(){
                    ufo_cloud3.css({
                        opacity: .3,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)",
                        filter: "alpha(opacity=30)"
                    });
                    ufo_cloud4.css({
                        opacity: .3,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)",
                        filter: "alpha(opacity=30)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 20){
                setTimeout(function(){
                    ufo_cloud1.css({
                        opacity: .9,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
                        filter: "alpha(opacity=90)"
                    });
                    ufo_cloud3.css({
                        opacity: .4,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)",
                        filter: "alpha(opacity=40)"
                    });
                    ufo_cloud4.css({
                        opacity: .4,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)",
                        filter: "alpha(opacity=40)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 21){
                setTimeout(function(){
                    ufo_cloud1.css({
                        opacity: .8,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",
                        filter: "alpha(opacity=80)"
                    });
                    ufo_cloud3.css({
                        opacity: .5,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
                        filter: "alpha(opacity=50)"
                    });
                    ufo_cloud4.css({
                        opacity: .5,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
                        filter: "alpha(opacity=50)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 22){
                setTimeout(function(){
                    ufo_cloud1.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    ufo_cloud3.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    ufo_cloud4.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 23){
                setTimeout(function(){
                    ufo_cloud1.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    ufo_cloud3.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    ufo_cloud4.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 24){
                setTimeout(function(){
                    ufo_cloud1.css({
                        opacity: .5,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
                        filter: "alpha(opacity=50)"
                    });
                    ufo_cloud3.css({
                        opacity: .8,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",
                        filter: "alpha(opacity=80)"
                    });
                    ufo_cloud4.css({
                        opacity: .8,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",
                        filter: "alpha(opacity=80)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 25){
                setTimeout(function(){
                    ufo_cloud1.css({
                        opacity: .4,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)",
                        filter: "alpha(opacity=40)"
                    });
                    ufo_cloud3.css({
                        opacity: .9,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
                        filter: "alpha(opacity=90)"
                    });
                    ufo_cloud4.css({
                        opacity: .9,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
                        filter: "alpha(opacity=90)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 26){
                setTimeout(function(){
                    ufo_cloud1.css({
                        opacity: .1,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)",
                        filter: "alpha(opacity=10)"
                    });
                    ufo_cloud3.css({
                        opacity: 1,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        filter: "alpha(opacity=100)"
                    });
                    ufo_cloud4.css({
                        opacity: 1,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        filter: "alpha(opacity=100)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time/2);
            }else if(step_five_count == 27){
                setTimeout(function(){
                    words.show();
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 28){
                setTimeout(function(){
                    kneel_man1.show();
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 29){
                setTimeout(function(){
                    kneel_man1.css({
                        opacity: .5,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
                        filter: "alpha(opacity=50)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 30){
                setTimeout(function(){
                    kneel_man1.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 31){
                setTimeout(function(){
                    kneel_man1.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 32){
                setTimeout(function(){
                    kneel_man1.css({
                        opacity: .85,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=85)",
                        filter: "alpha(opacity=85)"
                    });
                    step_five_count++;
                    requestAnimationFrame(step_five);
                }, step_five_time);
            }else if(step_five_count == 33){
                setTimeout(function(){
                    kneel_man1.css({
                        opacity: 1,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
                        filter: "alpha(opacity=100)"
                    });
                    step_six();
                }, step_five_time);
            }
        }


        var step_six_count = 0;
        var step_six_time = 70;
        function step_six(){
            if(isStopAnimate)return;
            var diff_top = 2;
            /*if(step_six_count > 23){
             return;
             }*/
            if(step_six_count == 0){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .9,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
                        filter: "alpha(opacity=90)"
                    });
                    ufo_cloud3.css({
                        opacity: .9,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
                        filter: "alpha(opacity=90)"
                    });
                    ufo_cloud4.css({
                        opacity: .9,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)",
                        filter: "alpha(opacity=90)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 1){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .8,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",
                        filter: "alpha(opacity=80)"
                    });
                    ufo_cloud3.css({
                        opacity: .8,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",
                        filter: "alpha(opacity=80)"
                    });
                    ufo_cloud4.css({
                        opacity: .8,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",
                        filter: "alpha(opacity=80)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 2){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    ufo_cloud3.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    ufo_cloud4.css({
                        opacity: .7,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)",
                        filter: "alpha(opacity=70)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 3){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    ufo_cloud3.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    ufo_cloud4.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    kneel_man1.hide();
                    kneel_man2.show();
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 4){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    ufo_cloud3.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    ufo_cloud4.css({
                        opacity: .6,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
                        filter: "alpha(opacity=60)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 5){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .5,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
                        filter: "alpha(opacity=50)"
                    });
                    ufo_cloud3.css({
                        opacity: .5,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
                        filter: "alpha(opacity=50)"
                    });
                    ufo_cloud4.css({
                        opacity: .5,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
                        filter: "alpha(opacity=50)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 6){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .4,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)",
                        filter: "alpha(opacity=40)"
                    });
                    ufo_cloud3.css({
                        opacity: .4,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)",
                        filter: "alpha(opacity=40)"
                    });
                    ufo_cloud4.css({
                        opacity: .4,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)",
                        filter: "alpha(opacity=40)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 7){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .3,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)",
                        filter: "alpha(opacity=30)"
                    });
                    ufo_cloud3.css({
                        opacity: .3,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)",
                        filter: "alpha(opacity=30)"
                    });
                    ufo_cloud4.css({
                        opacity: .3,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)",
                        filter: "alpha(opacity=30)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 8){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .2,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",
                        filter: "alpha(opacity=20)"
                    });
                    ufo_cloud3.css({
                        opacity: .2,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",
                        filter: "alpha(opacity=20)"
                    });
                    ufo_cloud4.css({
                        opacity: .2,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",
                        filter: "alpha(opacity=20)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 9){
                setTimeout(function(){
                    ufo_cloud2.css({
                        opacity: .1,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)",
                        filter: "alpha(opacity=10)"
                    });
                    ufo_cloud3.css({
                        opacity: .1,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)",
                        filter: "alpha(opacity=10)"
                    });
                    ufo_cloud4.css({
                        opacity: .1,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)",
                        filter: "alpha(opacity=10)"
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 10){
                setTimeout(function(){
                    ufo_cloud1.css({
                        display: 'none',
                        opacity: 0,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                        filter: "alpha(opacity=0)"
                    });
                    ufo_cloud2.css({
                        display: 'none',
                        opacity: 0,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                        filter: "alpha(opacity=0)"
                    });
                    ufo_cloud3.css({
                        display: 'none',
                        opacity: 0,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                        filter: "alpha(opacity=0)"
                    });
                    ufo_cloud4.css({
                        display: 'none',
                        opacity: 0,
                        '-ms-filter': "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
                        filter: "alpha(opacity=0)"
                    });
                    kneel_man2.css({
                        top: parseInt(kneel_man2.css('top').replace('px', ''))-diff_top+'px'//'196px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'236px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 11){
                setTimeout(function(){
                    kneel_man2.css({
                        top: parseInt(kneel_man2.css('top').replace('px', ''))-diff_top+'px'//'192px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'232px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 12){
                setTimeout(function(){
                    kneel_man2.hide();
                    kneel_man3.css({
                        display: 'block',
                        top: parseInt(kneel_man2.css('top').replace('px', ''))-diff_top+'px'//'188px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'228px'
                    });

                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 13){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'184px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'224px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 14){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'180px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'220px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 15){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'176px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'216px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 16){
                setTimeout(function(){
                    kneel_man3.hide();
                    kneel_man4.css({
                        display: 'block',
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'172px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'212px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 17){
                setTimeout(function(){
                    kneel_man4.hide();
                    kneel_man3.css({
                        display: 'block',
                        top: parseInt(kneel_man4.css('top').replace('px', ''))-diff_top+'px'//'168px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'208px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 18){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'164px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'204px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 19){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'160px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'200px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 20){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'156px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'196px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 21){
                setTimeout(function(){
                    kneel_man3.hide();
                    kneel_man4.css({
                        display: 'block',
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'152px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'192px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 22){
                setTimeout(function(){
                    kneel_man4.hide();
                    kneel_man3.css({
                        display: 'block',
                        top: parseInt(kneel_man4.css('top').replace('px', ''))-diff_top+'px'//'148px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'188px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 23){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'144px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'184px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 24){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'140px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'180px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 25){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'136px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'176px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 26){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'132px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'172px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 27){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'128px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'168px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 28){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'124px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'164px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 29){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'120px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'160px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 30){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'116px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'156px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 31){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'112px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'152px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 32){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'108px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'148px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 33){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'104px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'144px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 34){
                setTimeout(function(){
                    kneel_man3.css({
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'100px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'140px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 35){
                setTimeout(function(){
                    kneel_man3.hide();

                    kneel_man5.css({
                        display: 'block',
                        top: parseInt(kneel_man3.css('top').replace('px', ''))-diff_top+'px'//'96px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'136px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 36){
                setTimeout(function(){
                    kneel_man5.hide();
                    kneel_man6.css({
                        display: 'block',
                        top: parseInt(kneel_man5.css('top').replace('px', ''))-diff_top+'px'//'92px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'132px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 37){
                setTimeout(function(){
                    kneel_man6.css({
                        top: parseInt(kneel_man6.css('top').replace('px', ''))-diff_top+'px'//'88px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'128px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 38){
                setTimeout(function(){
                    kneel_man6.css({
                        top: parseInt(kneel_man6.css('top').replace('px', ''))-diff_top+'px'//'84px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'124px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 39){
                setTimeout(function(){
                    kneel_man6.css({
                        top: parseInt(kneel_man6.css('top').replace('px', ''))-diff_top+'px'//'80px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'120px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 40){
                setTimeout(function(){
                    kneel_man6.css({
                        top: parseInt(kneel_man6.css('top').replace('px', ''))-diff_top+'px'//'76px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'116px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 41){
                setTimeout(function(){
                    kneel_man6.css({
                        top: parseInt(kneel_man6.css('top').replace('px', ''))-diff_top+'px'//'72px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'112px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 42){
                setTimeout(function(){
                    kneel_man6.hide();
                    kneel_man7.css({
                        display: 'block',
                        top: parseInt(kneel_man6.css('top').replace('px', ''))-diff_top+'px'//'68px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'108px'
                    });
                    step_six_count++;
                    requestAnimationFrame(step_six);
                }, step_six_time);
            } else if(step_six_count == 43){
                setTimeout(function(){
                    kneel_man7.css({
                        top: parseInt(kneel_man7.css('top').replace('px', ''))-diff_top+'px'//'64px'
                    });
                    words.css({
                        top: parseInt(words.css('top').replace('px', ''))-diff_top+'px'//'104px'
                    });
                    close.show();
                }, step_six_time);
            }
        }
    });
}