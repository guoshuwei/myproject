var template = require('../modules/template'),
    getMoreList = function(){
    var options = {
        viewport: $('.ui-loans-list'),
        working: false,
        url: '/topic/getMyAward',
        data: null,
        ajaxtype: 'post',
        tpl: 'mywardsTpl',
        successCallback: null,
        errorCallback: null,
        topDom: [$('.ui-header'),$('.ui-loans-order')],
        moveRange: 50,
        defaultInfo: '滑动加载更多',
        touchStartInfo: '正在加载',
        touchMoveInfo: '加载中，请稍后…',
        noMoreInfo: '没有更多了',
        webError:'网络异常，请稍后重试',
        infoBox: '.fn-loading',
        infoBoxShow: true,
        topHeight: 0,
        winHeight: $(window).height(),
        bodyHeight: $('body').height(),
        bodyScroll: $('body').scrollTop(),
        touch: {
            start: {x: 0, y: 0},
            end: {x: 0, y: 0}
        },
        touchViewport: null,
        touchendFn: null,
        noMores: false
    }
    var onTouchStart = function(e){
        if(options.touchViewport && options.touchendFn){
            options.touchViewport.unbind('touchend', options.touchendFn);
        }        
        if(options.working){
            e.preventDefault();
        }else{
            var orig = e.originalEvent;
            options.touch.start.x = orig.changedTouches[0].pageX;
            options.touch.start.y = orig.changedTouches[0].pageY;
            options.viewport.bind('touchmove', onTouchMove);
            options.viewport.bind('touchend', onTouchEnd);
            options.viewport.bind('touchcancel', onTouchEnd);
            //$(options.infoBox).html(options.touchStartInfo);
        }
        //console.log('Start')
    }

    var onTouchMove = function(e){
        var orig = e.originalEvent;
        var xMovement = Math.abs(orig.changedTouches[0].pageX - options.touch.start.x);
        var yMovement = Math.abs(orig.changedTouches[0].pageY - options.touch.start.y);
        if(yMovement > options.moveRange && options.infoBoxShow){
            //$(options.infoBox).html(options.touchStartInfo);
            options.infoBoxShow = false;
        }
        //console.log('Move')
        

    }

    var onTouchEnd = function(e){
        options.viewport.unbind('touchmove', onTouchMove);
        var orig = e.originalEvent;
        var value = 0;
        options.touch.end.x = orig.changedTouches[0].pageX;
        options.touch.end.y = orig.changedTouches[0].pageY;
        //console.log(isBottom())
        //console.log(Math.abs(options.touch.end.y - options.touch.start.y))
        if(isBottom() && (Math.abs(options.touch.end.y - options.touch.start.y) > options.moveRange) && !options.noMores){
            $(options.infoBox).html(options.touchMoveInfo);
            options.working = true;
            getData();
        }else{
            if(options.touchViewport && options.touchendFn){
                var _element = e.srcElement ? e.srcElement : e.target;
                options.touchendFn(_element);

            } 
        }
        //console.log('End')
        options.viewport.unbind('touchend', onTouchEnd);    
        
    }
    var getData = function(){

        if(options.noMores)return;
        $.ajax({
            url : /*_Fn.mockServer + */options.url,
            //url : options.url,
            type : options.ajaxtype,
            data: typeof options.data == 'function' ? options.data() : options.data,
            dataType :'json',
            success: function(res){
                if(res.code == 200){
                    var content = template.render(options.tpl,{data:res.data});
                    options.viewport.append(content);
                    $(options.infoBox).html(options.defaultInfo);
                    if(res.data.more == 0){
                        $(options.infoBox).html(options.noMoreInfo);
                        options.noMores = true;
                    } 
                }else{
                    
                    $(options.infoBox).html(options.webError);
                }
                options.successCallback && options.successCallback(res);
                options.working = false;
                options.infoBoxShow = true;
            },
            error : function(res){
                options.working = false;
                options.infoBoxShow = true;
                options.errorCallback && options.errorCallback(res);
                $(options.infoBox).html(options.webError);
            }
        })
        options.data.p += 1;
    }
    var isBottom = function(){
        options.bodyScroll = $(window).scrollTop();
        options.bodyHeight = $('body').height();
        options.topHeight = 0;
        for(var i = 0; i < options.topDom.length; i++ ){
            options.topHeight += options.topDom[i].height();
        }
        options.topHeight += options.viewport.height();
        if((options.bodyScroll + options.winHeight + 30) > options.topHeight){
            return true;
        }else{
            return false;
        }
    }
    var initTouch = function(){
        options.viewport.bind('touchstart', onTouchStart);

    }
    return {
        init: function(option){
            options = $.extend(true,options,option);
            initTouch();
        }
    }
    
}()
exports.init = getMoreList.init;