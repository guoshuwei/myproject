var
    app = require('./app'),
    wxReady = require('../modules/jssdk'),
    dataUrl = window.location.href;

wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        link: dataUrl, // 分享链接
    });
})


$('body')
    .on('tap','.fn-login-bind',function(){
        if(!_Fn.isLogin())return false;
        if(!_Fn.isBind())return false;  
    })

_Fn.backTop();