/**
 * Created by Jununx on 14-9-22.
 *
 * @param   hd{object list} 切换头列表
 * @param   bd{object list} 切换内容列表
 * @param   active{string}  当前className
 * @param   ev{string}      触发事件（默认mouseover）
 * @param   delay{number}   延时触发（毫秒，默认0，mouseover时才有）
 * @param   now{number}     默认选项（默认0）
 *
 * @fun     select{number}  切换到某个选项
 *
 * @event   onBefore(n)     切换之前，可接收一个参数n，表示当前的index
 * @event   onAfter(n)      切换之后，可接收一个参数n，表示当前的index
 */

var TabTools = {
    create: function() {
        return function() {
            this.init.apply(this, arguments);
        };
    },
    extend: function (d, s){
        for(var i in s){
            d[i] = s[i];
        }
        return d;
    },
    bindEvent: function(o, ev, fn){
        return window.addEventListener ? o.addEventListener(ev, fn, false) : o.attachEvent('on'+ev, fn);
    }
};

var Tab = TabTools.create();
Tab.prototype = {
    init: function(opts){
        this.opts = TabTools.extend({
            'hd': [],
            'bd': [],
            'active': 'active',
            'bdClassName': 'item',
            'ev': 'mouseover',
            'delay': 0,
            'now': 0,
            'onBefore': function(n){},
            'onAfter': function(n){}
        }, opts || {});

        this.render();
        this.select(this.opts.now);
    },
    select: function(n){
        this.opts.onBefore(n);
        for(var i = 0, len = this.opts.hd.length; i < len; i++){
            this.opts.hd[i].className = '';
            this.opts.bd[i].className = this.opts.bdClassName;
            this.opts.bd[i].style.display = 'none';
        }
        this.opts.hd[n].className = this.opts.active;
        this.opts.bd[n].className = (this.opts.bdClassName + ' ' + this.opts.active);
        this.opts.bd[n].style.display = 'block';
        this.opts.onAfter(n);
    },
    render: function(){
        var This = this;
        for(var i = 0, len = this.opts.hd.length; i < len; i++){
            (function(n){
                if(This.opts.ev === 'mouseover'){
                    var timer = null, iStartTime = 0, iEndTime = 0;
                    TabTools.bindEvent(This.opts.hd[n], 'mouseover', function(){
                        if(This.opts.now === n) return ;
                        iStartTime = new Date().getTime();
                        clearTimeout(timer);
                        timer = setTimeout(function(){
                            This.select(This.opts.now = n);
                        }, This.opts.delay);
                    });
                    TabTools.bindEvent(This.opts.hd[n], 'mouseout', function(){
                        iEndTime = new Date().getTime();
                        if(iEndTime - iStartTime < This.opts.delay){
                            clearTimeout(timer);
                        }
                    });
                }else{
                    TabTools.bindEvent(This.opts.hd[n], This.opts.ev, function(){
                        if(This.opts.now === n) return ;
                        This.select(This.opts.now = n);
                    });
                }
            })(i);
        }
    }
};