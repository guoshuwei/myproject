var
    app = require('./app'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    jPages = require('../plugins/jPages.min'),
    tabControl = require('../plugins/tabControl'),
    address = null,
    awardType = null,
    id = 0,
    staus = true,
    nowTime = $('body').attr('data-nowtime'),
    tagTime = 1496246400;//2017-06-01 00:00:00


    _Fn.backTop();

    _Fn.loading().show($('.ui-financial-empty'));
    //奖品列表
    $.ajax({
        url: _Fn.mockServer + '/topic/prizelist',
        type: 'post',
        //data: null,
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                if(nowTime >= tagTime){
                    staus = false;
                }
                var content = template.render('integralTpl',{data: res.data,staus: staus});
                $('.fn-integral').html(content);
            }else{
                _Fn.alert(res.message);
            }
            _Fn.loading().hide();
        },
        error: function(){
            _Fn.alert('请稍后刷新重试！');
            _Fn.loading().hide();
        }
    }) 
$('body')
    .on('tap','.fn-integral-item-btn',function(){
        if(!_Fn.isLogin())return;
        if(!_Fn.isBind())return;
        if(nowTime >= tagTime)return;
        var that = $(this);

        id = that.attr('data-id');
        awardType = that.attr('data-awardType');

        var sureData = {
            src : that.attr('data-src'),
            name : that.attr('data-name'),
            conditions : that.attr('data-conditions')
        }
        
        //确认兑换
        var res = {};
            res.code = 400;
        alertResult(res,sureData);

        
    })
    .on('tap','.fn-prize-get',function(){
        _Fn.loading().show($(this));
        //收货地址是否提交保存 || 虚拟奖品 ！=1
        if(address || awardType != 1){
            getPrize(id);
        }else{
            addressChange(id);
        }
    })
    .on('tap','.fn-close',function(){
        _Fn.lightboxWrap()._fadeOut();
        $('.fn-dialog').remove();
    })
    .on('tap','.fn-close-sure',function(){
        _Fn.lightboxWrap()._fadeOut();
        $('.fn-dialog-sure').remove();
    })
    .on('tap','.fn-refresh',function(){
        window.location.href = window.location.href;
    })
function addressChange(id){
    //获取收货地址
    $.ajax({
        url: _Fn.mockServer + '/topic/getContact',
        type: 'post',
        //data: null,
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                address = res.data;
                if(!res.data || res.data.is_exist && res.data.is_exist == 0){
                    res.code = 201;
                    alertResult(res);
                    return;
                }else{
                    //确认是否兑换当前产品
                    getPrize(id,address);
                }
            }else{
                _Fn.alert(res.message);
            }
        },
        error: function(){
            _Fn.alert('请稍后刷新重试！');
        }
    })
}
function getPrize(id,address){
    if(address && address.is_exist == 0){
        var res = {};
        res.code = 201;
        alertResult(res);
    }
    $.ajax({
        url: _Fn.mockServer + '/topic/financialexchange',
        type: 'post',
        data: {
            prize_id: id
        },
        dataType: 'json',
        success: function(res){
            alertResult(res);
            $('.fn-dialog-sure').remove();
        },
        error: function(){
            _Fn.alert('请稍后重试！');
        }
    }) 
}
function alertResult(res,sureData){

        _Fn.lightboxWrap()._fadeIn();
        $('.fn-dialog').remove();
        $('.fn-dialog-sure').remove();
        //地址未保存
        if(res.code == 201){
            var  content = template.render('addressTpl');
        //中奖
        }else if(res.code == 200){
            var  content = template.render('successTpl',res.data);
        //手慢无
        }else if(res.code == 302){
            var  content = template.render('slowTpl');
        //积分不足
        }else if(res.code == 304){
            var  content = template.render('conditionstTpl');
        //已兑换过
        }else if(res.code == 306){
            var  content = template.render('overTpl');
        //兑换确认
        }else if(res.code == 400){
            var  content = template.render('sureTpl',sureData);
        }else{
            _Fn.alert(res.message);
            _Fn.lightboxWrap()._fadeOut();
        }      
        $('body').append(content);

        var width = $('.fn-dialog').outerWidth(),
            height = $('.fn-dialog').outerHeight();

        $('.fn-dialog').css({
            'margin-left': -width/2,
            'margin-top': -height/2
        });
        _Fn.loading().hide();
}



