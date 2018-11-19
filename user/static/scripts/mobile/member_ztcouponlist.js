var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList'),
    realnameCheck = $("#realnameCheck").val();

$(".details-jump-cunguan .ui-details-jump-confirm").attr("href","https://www.touyouquan.com/reg.html");
$(".details-jump-bind .ui-details-jump-confirm").attr("href","//licai.p2peye.com/member/bind?referer=" + window.location.href);


_Fn.backTop();
getMoreList.init({
    url: '/member/ztcouponlist',
    data: {
        ajax: 1,
        p:2
    },
    tpl: 'ztcouponlistTpl',
    ajaxtype: 'get',
    viewport: $('.ui-ztcouponlist-list')
});

$('body')
    .on('tap','.ui-serial',function(){
        if(realnameCheck != 1){
            window.location.href = "//licai.p2peye.com/spacecp/certify";
            return;
        }
        var that = $(this),
            serial = that.attr('data-serial'),
            loading = that.find(".ajax-style");
        loading.show();

        $.ajax({
            url: _Fn.mockServer + '/member/getMyCoupon',
            type: "post",
            dataType: 'json',
            data: {
                serial : serial
            },
            success: function (res) {
                loading.hide();
                if(res.code == 200){
                    that.remove();
                    _Fn.alert('领取成功！');
                }else if(data.code == 4108 || data.code == 4601){            /* 没绑定投友圈 */
                    _Fn.lightboxWrap()._fadeIn();
                    $('.fn-details-jump.details-jump-bind').fadeIn();
                }else if(data.code == 4602){            /* 没开通存管 */
                    _Fn.lightboxWrap()._fadeIn();
                    $('.fn-details-jump.details-jump-cunguan').fadeIn();
                }else{
                    _Fn.alert(res.message);
                }
            },
            error: function () {
                _Fn.alert('网络错误，请稍后重试！');
            }
        });
    })
    .on('tap','.ui-details-jump-cancel',function(){
        _Fn.lightboxWrap()._fadeOut();
        $('.fn-details-jump').hide();
    });