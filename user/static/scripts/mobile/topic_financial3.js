var
    app = require('./app'),
    wxReady = require('../modules/jssdk'),
    template = require('../modules/template'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    drawing = false,
    dataUrl = window.location.href,
    sliderLength = $('.fn-prize518-list-warp').children().length,
    exist = $('.fn-prize518').attr('data-exist'),
    nowTime = $('body').attr('data-nowtime'),
    tagTime = 1496246400;//2017-06-01 00:00:00

wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        link: dataUrl, // 分享链接
    });
})
if($('.fn-prize518-list-warp').children().length > 0){
    $('.fn-prize518-list-warp').bxSlider({
        ticker:true,
        speed: sliderLength * 5000      
    }); 
}

function turntableDraw(callback){
    if(drawing) return;
    drawing = true;

    var interval = 100;

    var circle = $('.fn-prize518-item-active');

    var index = circle.attr('class').split('ui-prize518-position')[1];

    var getDate = false;

    var runcount = 0;

    var target = null;

    var _message = null;

    function prizeCircle(){

        circle.attr('class','ui-prize518-item ui-prize518-item-active fn-prize518-item-active ui-prize518-position'+(parseInt(index)));
        var awardid = $('.fn-prize518-box .ui-prize518-position'+(parseInt(index))).attr('data-id');
        var awardtype = $('.fn-prize518-box .ui-prize518-position'+(parseInt(index))).attr('data-type');
        index++;

        if(index == 15){
            index = 1;
        }

        runcount++;
        //旋转一圈之后开始进行异步
        if(runcount == 14){
            $.ajax({
                url : _Fn.mockServer + '/topic/financialaward',
                type : 'post',
                dataType :'json',
                success: function(res){
                    _message = res.message;
                    if(res.code == 200){
                        target = res.data;
                    }else if(res.code == 5155){
                        var  content = template.render('overTpl');
                        _Fn.lightboxWrap()._fadeIn();
                        $('body').append(content);
                        target = true;
                    }else{
                        target = true;
                        _Fn.alert(res.message);
                    }                    
                    
                },
                error : function(){
                    target = true;
                    drawing = false;
                    _Fn.loading().hide();
                }
            })
        }

        if(!target){
            setTimeout(prizeCircle,interval);
        }else{
            if(target['award_type']){
                if(target['award_type'] != 22 && target['award_type'] != 28){
                    if(target['id'] != awardid){
                        setTimeout(prizeCircle,interval);
                    }else{
                        awardSuccessCallback(target);
                    }
                }else{
                    if(target['award_type'] != awardtype){
                        setTimeout(prizeCircle,interval);
                    }else{
                        awardSuccessCallback(target);
                    }
                }
            }else{
                _Fn.alert(_message);
                _Fn.loading().hide();
            }
        }

    }

    function awardSuccessCallback(data){
        callback && callback();
        _Fn.loading().hide();
        var  content = template.render('successTpl',data);
        _Fn.lightboxWrap()._fadeIn();
        $('body').append(content);
        drawing = false;
        $('.fn-prize518-number').html(data.ordinary);
        
    }
    setTimeout(prizeCircle,interval);

}
function addressChange(){
    var timer = null;
    //获取收货地址
    if(exist == 1){
        turntableDraw();
    }else{
        var  content = template.render('addressTpl');
        _Fn.lightboxWrap()._fadeIn();
        timer = setTimeout(function(){
            $('body').append(content);
            _Fn.loading().hide();
        },100);  

    }

}

_Fn.backTop();
$('body')
    .on('tap','.fn-login-bind',function(){
        if(!_Fn.isLogin())return false;
        if(!_Fn.isBind())return false;  
    })
    .on('tap','.fn-prize518',function(e){
        if(!_Fn.isLogin())return false;
        if(!_Fn.isBind())return false;  
        if(nowTime >= tagTime){
            _Fn.alert('活动已结束！');
            return false;
        }
        var number = $('.fn-prize518-number').html();
        if(number <= 0){
            var  content = template.render('overTpl');
            _Fn.lightboxWrap()._fadeIn();
            $('body').append(content);
            return false;
        }
        _Fn.loading().show($('.fn-prize518'));
        $('.fn-prize518-item-active').removeClass('.ui-prize518-none');
        addressChange();
    })
    .on('tap','.fn-close',function(){
        _Fn.lightboxWrap()._fadeOut();
        $('.fn-dialog').remove();
    })


        


















