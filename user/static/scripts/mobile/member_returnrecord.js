var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList'),
    template = require('../modules/template');
if($(".fn-loading").length){
    getMoreList.init({
        url: '/member/returnRecord?ajax=1',
        data: {
            p:2
        },
        tpl: 'returnrecordTpl',
        ajaxtype: 'get',
        viewport: $('[role-parent=returnrecord]')
    });
}
