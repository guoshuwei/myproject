var
    app = require('./app');

$('body')
    .on('tap','.get-fuli', function () {
        if(_Fn.terminalInfo.app == "licai") {
// 如果在app内, 跳转失效页面
            _Fn.fireApp({
                trigger : "newyear",
                data : ""
            });
            return false;
        }
    })

