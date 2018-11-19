var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList');

_Fn.backTop();
getMoreList.init({
    url: '/member/bindplatlist',
    data: {
        ajax: 1,
        p:2
    },
    tpl: 'bindplatlistTpl',
    ajaxtype: 'get',
    topDom: [$('.ui-header'),$('.ui-bindplatlist-total')],
    viewport: $('.ui-bindplatlist-list')
});