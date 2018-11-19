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