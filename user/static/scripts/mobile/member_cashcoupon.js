var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList'),
    realnameCheck = $("#realnameCheck").val();

$(".details-jump-cunguan .ui-details-jump-confirm").attr("href","https://www.touyouquan.com/reg.html");
$(".details-jump-bind .ui-details-jump-confirm").attr("href","//licai.p2peye.com/member/bind?referer=" + window.location.href);



_Fn.backTop();
getMoreList.init({
    url: '/member/cashcoupon',
    data: {
        ajax: 1,
        p:2
    },
    tpl: 'cardListTpl',
    ajaxtype: 'get',
    viewport: $('.card-list')
});



$("body")
    .on("tap",".card-item-red",function(){
        if(realnameCheck != 1){
            window.location.href = "//licai.p2peye.com/spacecp/certify";
            return;
        }
        var that = $(this);
        var loading = $(this).find(".ajax-style");
        loading.show();
        var id = $(this).attr("data-id");
        $.ajax({
            url:'/member/getMyCashCoupon',
            type:'post',
            dataType:'json',
            data : {
                "id" : id
            },
            success:function(msg){
                loading.hide();
                var code = msg.code;
                if(code == 4303){
                    _Fn.lightboxWrap()._fadeIn();
                    $('.fn-details-jump.details-jump-cunguan').fadeIn();
                }else if(code == 4108){
                    _Fn.lightboxWrap()._fadeIn();
                    $('.fn-details-jump.details-jump-bind').fadeIn();
                }else if(code == 4106){
                    _Fn.alert('网络异常');
                }else if(code == 4601){
                    _Fn.lightboxWrap()._fadeIn();
                    $('.fn-details-jump.details-jump-bind').fadeIn();
                }else if(code == 4602){
                    _Fn.lightboxWrap()._fadeIn();
                    $('.fn-details-jump.details-jump-cunguan').fadeIn();
                }else if(code == 4603){
                    _Fn.alert('已领取');
                }else if(code == 4604){
                    _Fn.alert('已领取');
                }else if(code == 4605){
                    _Fn.alert('网络异常');
                }else if(code == 4606){
                    _Fn.alert('网络异常');
                }else{
                    if(code == 200){
                        that.remove();
                        if(!$(".card-item-red").length){
                            var el = '<div class="ui-empty">' +
                                '<img src="/styles/images/member/mobile/empty3.png" alt="热门理财直投" />' +
                                '<div class="ui-empty-descript">暂无未使用现金红包</div>' +
                                '</div>';
                            $(".card-list").append(el);
                        }
                        _Fn.alert('使用成功');
                    }else{
                        _Fn.alert('网络异常');
                    }
                }
            },
            error : function(){
                loading.hide();
                _Fn.alert('请求失败,请稍后再试。');
            }
        })
    })
    .on('tap','.ui-details-jump-cancel',function(){
        _Fn.lightboxWrap()._fadeOut();
        $('.fn-details-jump').hide();
    });