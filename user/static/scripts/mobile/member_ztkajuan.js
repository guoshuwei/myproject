var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList'),
    template = require('../modules/template');
_Fn.backTop();
getMoreList.init({
    url: '/member/ajax',
    data: {
        type: "ztkajuan_list",
        p:2
    },
    tpl: 'ztkaquanTpl',
    ajaxtype: 'get',
    viewport: $('.card-list')
});
//卡卷筛选
//$('.col-choice a').click(function(){
//    $(this).addClass('current');
//    $(this).siblings('a').removeClass('current');
//    var datatype = $(this).attr('data-type');
//    $.ajax({
//        url: 'ztkajuanSort',
//        type: 'post',
//        data: {
//            type: datatype
//        },
//        dataType: 'json',
//        success: function (res) {
//            if (res.code == 200) {
//                var data = res.data;
//                $('.c-m-list').html(template.render('sortTpl', {data: data}))
//
//            }
//        }
//    })
//})

