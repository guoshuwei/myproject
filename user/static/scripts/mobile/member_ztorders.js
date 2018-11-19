var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList'),
    ua = navigator.userAgent.toLowerCase(),
    is_weixin = ua.match(/MicroMessenger/i)=="micromessenger";

_Fn.backTop();


if(is_weixin){
    getMoreList.init({
        url: '/member/ajax',
        data: {
            type: "ztorders_list",
            p:2
        },
        tpl: 'ztordersWeixinTpl',
        ajaxtype: 'get',
        viewport: $('.order')
    });
}else{
    getMoreList.init({
        url: '/member/ajax',
        data: {
            type: "ztorders_list",
            p:2
        },
        tpl: 'ztordersTpl',
        ajaxtype: 'get',
        viewport: $('.order')
    });
}

