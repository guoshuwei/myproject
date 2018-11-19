var
    app = require('./app'),
    validate = require('../modules/validate'),
    template = require('../modules/template'),
    countDown = require('../modules/countDown'),
    jPages = require('../plugins/jPages.min'),
    getKillLoans = require('../modules/getKillLoans'),
    tabControl = require('../plugins/tabControl'),
    _getStage = getKillLoans.getStage(),
    nowTime = $('body').attr('data-nowtime'),
    cookie = require('../plugins/$.cookie'),
    brandtable = $('.my-yuyue-alert'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    wxReady = require('../modules/jssdk'),
    yuYueRecord = $('.ui-user-info li').length,
    uid = $('body').attr('uid'),
    ismyyuyue = true,
    startTime = 1513526400,//2017-12-18 00:00:00;
    tagTime = 1513958400;//2017-12-23 00:00:00;



wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        success : function(res){
            // 分享成功的回调函数
            // console.log(res);
        }
    });
});

$(window).bind( 'orientationchange', function(e){
    e.stopPropagation();
    e.cancelBubble = true;
    window.location.href = window.location.href;
});


function getList(loading,url,data,tpl,parent,pager,id){
    // _Fn.loadingMulti().show(loading);
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        success: function(res){
            // _Fn.loadingMulti().hide(loading);
            if(res.code == 200){
                // console.log(res);
                var content = template.render(tpl,{data:res.data});
                if(!res.data || res.data.length != 0){
                    var content = template.render(tpl,{data:res.data});
                    parent.html(content);
                    pager.jPages({
                        containerID : id,
                        previous : '上一页',
                        next : '下一页',
                        perPage : 5,
                        delay : 20,
                        scrollBrowse : false
                    });
                    ismyyuyue = true;
                    $('.my-yuyue-alert').css('display', 'block');
                    $('.my-yuyue-alert-wrap').css('display', 'block');

                } else {
                    _Fn.alert('您还没有预约记录~');
                    ismyyuyue = false;
                }
            }else{
                _Fn.alert(res.message);

            }
            // _Fn.loadingMulti().hide(loading);
        },
        error: function(){
            _Fn.alert('请稍后刷新重试！');
            // _Fn.loadingMulti().hide(loading);
        }
    });

    return ismyyuyue;
}


getList(brandtable,'//licai.p2peye.com/topic/welfare/my_convention',{type: '19-20-21-22'},'lotteryrecordTpl',$('.fn-lotteryrecord-box'),$('.fn-lotteryrecord-pager'),'lotteryrecord');
