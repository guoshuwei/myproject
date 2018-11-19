var
    app = require('./app'),
    wxReady = require('../modules/jssdk'),
    pid=$("#pid").val(),
    $more=$(".fn-loading"),
    getMoreList = require('../modules/getMoreList');
 if($more.length>0){
    getMoreList.init({
        url: '/platform/loanPageAjax',
        data: {
            pid: pid,
            p:2,
            d:2
        },
        tpl: 'dataTpl',
        ajaxtype: 'post',
        viewport: $('[role-parent=data]')
    });
}