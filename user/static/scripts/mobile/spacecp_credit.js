var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList');

getMoreList.init({
    url:'/spacecp/credit?op=base&h5=1',
    data:{
        p : 2
    },
    tpl:'creditTpl',
    ajaxtype: 'get'
});