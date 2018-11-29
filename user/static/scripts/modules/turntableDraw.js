// $('.fn-luckdraw-button').turntableDraw({
//     drawBox: '.ui-luckdraw-list',
//     item: 'ui-luckdraw-position-item',
//     lampJump: true,
//     lampBox: '.fn-luckdraw-box',
//     lampBox2: 'ui-luckdraw-box1',
//     successCallback: function(data){
//         var  content = template.render('drawsuccessTpl',data);
//         $('body').append(content);
//     }
// })
$.fn.turntableDraw = function(ops){
    ops = $.extend({
        drawBox: '.ui-drawbox',//抽奖最外层父级
        lampBox: 'ui-lampBox',//闪烁灯的第一张图片背景
        lampBox2: 'ui-lampBox2',//闪烁灯的第二张图片背景
        lampInterval: 1000, //灯图片替换间隔
        item: 'ui-draw-item',//每一个奖品块
        ordinary: '.fn-ordinary-number',//剩余抽奖次数
        luckdrawAgain:'.fn-luckdraw-again', //再抽一次按钮
        ordinaryHint: '您的抽奖机会不足，快去活动中获得吧！',
        enevtType: 'click',
        drawsuccessTpl: 'drawsuccessTpl',
        lampJump: false,//是否开启闪烁灯
        itemTotal: 14, //奖品总数
        itemWidth: '142px', //奖品块宽
        itemHeigth: '107px', //奖品块高
        borderWidth: '4px', //选中奖品边宽
        borderColor: '#f00',//选中奖品边颜色
        borderRadius: '10px',//选中奖品圆角
        interval: 100,
        closeButton: '.fn-close', //中奖弹层关闭按钮
        alertBox: '.fn-dialog', //中奖弹层最外层
        lightboxWrap: false, //是否需要蒙层
        ajaxUrl: '/topic/brand1111/rafflemain',
        beforeCallBack: function(){
            //before ajax function
            //点击按钮最先触发
        },
        successCallback: function(res){
            //成功回调
        },
        codeErrorCallback: function(res){
            if(res.code == 5155){
                _Fn.alert('您的抽奖机会不足，快去活动中获得吧！');
            }else{
                res.message && _Fn.alert(res.message);
            }   
        },
        errorCallback: function(){
            _Fn.alert('网络错误，请稍后重试！');
        }
    },ops);
    var that = $(this),
        drawBox = $(ops.drawBox),
        items = drawBox.find(ops.item),
        drawingLock = false,
        ajaxData = null,
        runcount = 0,
        ajaxRes = null,
        circle = $('<div></div>'),
        circleClass = circle.attr('class'),
        ordinaryBox = $(ops.ordinary),
        index = circleClass ? parseInt(circleClass.split(ops.item)[1]) : 1;

    circle.css({
        position: 'absolute',
        zIndex: 3,
        borderWidth: ops.borderWidth,
        borderColor: ops.borderColor,
        borderStyle: 'solid',
        borderRadius: ops.borderRadius,
        marginTop: '-' + ops.borderWidth,
        marginLeft: '-' + ops.borderWidth,
        width: ops.itemWidth,
        height: ops.itemHeigth
    });
    

    function prizeCircle(){
        
        circle.attr('class',ops.item + index);
        var awardid = drawBox.find('.' + ops.item +(parseInt(index))).attr('data-id');
        var awardtype = drawBox.find('.' + ops.item +(parseInt(index))).attr('data-type');
        index++;

        if(index > ops.itemTotal){
            index = 1;
        }

        runcount++;
        if(runcount == ops.itemTotal){
            $.ajax({
                url : _Fn.mockServer + ops.ajaxUrl,
                type : 'post',
                dataType :'json',
                success: function(res){
                    ajaxRes = res;
                    if(res.code == 200){
                        ajaxData = res.data;
                    }else{
                        drawingLock = false;
                        circle.hide();
                        ajaxData = true;
                    }                  
                    
                },
                error : function(){
                    circle.hide();
                    drawingLock = false;
                    ajaxData = true;
                    errorCallback && errorCallback();
                }
            })
        }
        if(!ajaxData){
            setTimeout(prizeCircle,ops.interval);
        }else{
            if(ajaxData['award_type']){
                if(ajaxData['award_type'] != 22 && ajaxData['award_type'] != 28){
                    if(ajaxData['id'] != awardid){
                        setTimeout(prizeCircle,ops.interval);
                    }else{
                        awardSuccessCallback(ajaxData);
                    }
                }else{
                    if(ajaxData['award_type'] != awardtype){
                        setTimeout(prizeCircle,ops.interval);
                    }else{
                        awardSuccessCallback(ajaxData);
                    }
                }
            }else{
                ops.codeErrorCallback && ops.codeErrorCallback(ajaxRes);
            }
        }
    }

    function awardSuccessCallback(data){
        ops.successCallback && ops.successCallback(data);
        ops.lightboxWrap && _Fn.lightboxWrap() && _Fn.lightboxWrap()._fadeIn();   
        drawingLock = false;
        ordinaryBox.html(data.ordinary);     
    }
    function lampJump(){
        var _lampBox = $(ops.lampBox);
        if(_lampBox.hasClass(ops.lampBox2)){
            _lampBox.removeClass(ops.lampBox2);
        }else{
            _lampBox.addClass(ops.lampBox2);
        }
        timer = setTimeout(function(){
            lampJump()
        },ops.lampInterval)
    }
    if(ops.lampJump){
        lampJump();
    }
    that.on(ops.enevtType,function(e){
        ops.beforeCallBack && ops.beforeCallBack();
        if(ordinaryBox.html() < 1){
            _Fn.alert(ops.ordinaryHint);
            return false;
        }
        if(drawingLock)return;
        drawingLock = true;
        circle.attr('class',ops.item + index);
        drawBox.append(circle);
        setTimeout(prizeCircle,ops.interval);
    });
    $('body')
        .on(ops.enevtType,ops.closeButton,function(){
            $('#lightbox_wrap').fadeOut();
            $(ops.alertBox).remove();
        })
        .on(ops.enevtType,ops.luckdrawAgain,function(){
            ops.beforeCallBack && ops.beforeCallBack();
            if(ordinaryNumber < 1){
                _Fn.alert(ops.ordinaryHint);
                return false;
            }
            if(drawingLock)return;
            drawingLock = true;
            circle.attr('class',ops.item + index);
            drawBox.append(circle);
            setTimeout(prizeCircle,ops.interval);
        })

   return this;
}