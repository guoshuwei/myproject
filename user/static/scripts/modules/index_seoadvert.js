var template = require('../modules/template');
$.ajax({
    url: '//www.p2peye.com/ajax.php?mod=ad&ajaxtype=seoqdpc&callback=callback',
    type: 'post',
    data: {},
    dataType: 'jsonp',
    jsonp:'callback',
    success: function (res) {
        if (res.code == 200) {
            var data = res.data[0];
            $('body').append(template.render('seoTpl',{data: data}));
        }
    }
})
$('body').on('click','.ui-seoadvert-close',function(){
    $('.ui-seoadvert').remove();
})