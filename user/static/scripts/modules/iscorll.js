$ = jQuery;

var
    myScroll;

var opt = {

    pull : document.getElementById('pullup'),

    pullLable : $('#pullup').find('.pulllable'),

    over : false,

    wrapper : $('#wrapper'),

    content : $('#sresult-list'),

    getData : function(){},

    useTransition : true,

    desktopCompatibility:true,

    pullUpAction: function(){
        if(opt.over) return;
        setTimeout(function () {
            var str=(opt.getData());
            if(str.length==0)return;
            //str=str.join("");
            opt.content.append(str);
            myScroll.refresh();
        }, 1000);
    },

    onRefresh: function () {
        if (opt.pull.className.match('loading')) {
            opt.pull.className = '';
            opt.pullLable.html('\u6ed1\u52a8\u52a0\u8f7d\u66f4\u591a');
        }
    },
    onScrollMove: function () {
        if (this.y < (this.maxScrollY - 5) && !opt.pull.className.match('flip')) {
            opt.pull.className = 'flip';
            if(opt.over){
                opt.pullLable.html('\u5df2\u7ecf\u6ca1\u6709\u66f4\u591a\u5566...');
            }else{
                opt.pullLable.html('\u52a0\u8f7d\u4e2d...');
            }
            this.maxScrollY = this.maxScrollY;
        } else if (this.y > (this.maxScrollY + 5) && opt.pull.className.match('flip')) {
            opt.pull.className = '';
            opt.pullLable.html('\u6ed1\u52a8\u52a0\u8f7d\u66f4\u591a');
            this.maxScrollY = opt.pull.offsetHeight;
        }
    },
    onScrollEnd: function () {
        if (opt.pull.className.match('flip')) {
            opt.pull.className = 'loading';
            if(opt.over){
                opt.pullLable.html('\u5df2\u7ecf\u6ca1\u6709\u66f4\u591a\u5566...');
            }else{
                opt.pullLable.html('\u52a0\u8f7d\u4e2d...');
            }
            opt.pullUpAction();
        }
    },
    onBeforeScrollStart: function (e) {
        var target = e.target;
        while (target.nodeType != 1) target = target.parentNode;
        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'A')
            e.preventDefault();
    }
};

function listener(){

    if(opt.wrapper.length == 0 ) return;

    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

    var height = document.documentElement.clientHeight;

    opt.wrapper.css({'height':height});

    myScroll = new iScroll('wrapper',opt);

}

var _iScroll = {};

_iScroll.init = function(option){
    for(var key in option){
        opt[key] = option[key];
    }
    document.addEventListener('DOMContentLoaded',function(){setTimeout(listener,200)},false);
};

_iScroll.update = function(option){
    for(var key in option){
        opt[key] = option[key];
    }
};

exports.iScroll = _iScroll;





