var
    app = require('./app');


$('body')
    .on('tap','.fn-brandjb-button',function(){
        if((_Fn.terminalInfo.terminal == "ios" && _Fn.terminalInfo.version < "2017092201") || (_Fn.terminalInfo.terminal == "android" && _Fn.terminalInfo.version < "1.3.0")){
            _Fn.alert("请升级至1.3.0版本");
            return;
        }
        _Fn.fireApp({trigger:"jumpPlatPage"},'');
    });




