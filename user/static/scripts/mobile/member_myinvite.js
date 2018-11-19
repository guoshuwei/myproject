var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList');

_Fn.backTop();
getMoreList.init({
    url: '/member/myinvite',
    data: {
        ajax: 1,
        p:2
    },
    tpl: 'myinviteTpl',
    ajaxtype: 'get',
    viewport: $('.ui-tbd')
});