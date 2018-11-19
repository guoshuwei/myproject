var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList'),
    investlistType = $('.ui-investlist-tab').attr('data-type');

_Fn.backTop();
getMoreList.init({
    url: '/member/investlist',
    data: {
        ajax: 1,
        type: investlistType,
        p:2
    },
    tpl: 'investlistTpl',
    ajaxtype: 'get',
    viewport: $('.ui-investlist-table'),
    topDom: [$('.ui-header'),$('.ui-investlist-tab')]
});

