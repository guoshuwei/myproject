var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList');

getMoreList.init({
    url:'/club/goodslist',
    data:{
        p : 2
    },
    tpl:'listTpl',
    ajaxtype: 'get'
});