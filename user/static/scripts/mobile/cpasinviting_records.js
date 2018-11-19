var
    app = require('./app'),
    template = require('../modules/template'),
    getMoreList = require('../modules/getMoreList');
    getMoreList.init({
        url:'/cpasinviting/loadmore',
        data:{
            p: 2,
        },
        viewport:$("[role-operation=dataparent]"),
        tpl:'dataTpl',
        ajaxtype: 'get'
    });
if($("body").height()<$(window).height()){
    $("body").height($(window).height())
}
