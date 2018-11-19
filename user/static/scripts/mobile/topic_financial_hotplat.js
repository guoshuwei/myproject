var
    app = require('./app');

_Fn.backTop();

var ua = window.navigator.userAgent.toLowerCase();
var licaiapp = ua.indexOf('licaiapp') > -1; //android终端或者uc浏览器
var obj = {};
$('body')
    .on('tap','.fn-hotplatform',function(){
        var that = $(this);
        var cid = that.attr('data-cid');
        var companyName = that.attr('data-companyname');
        obj = {"cid":cid, "pid":cid, "company_name" : companyName, "pn" : 1};
        if (licaiapp) {
            if(window.BillJSInterface){
                try{
                    BillJSInterface.jumpManageList(JSON.stringify(obj));
                }catch(e){
                    return false;
                }
            }else{
                try{
                    window.webkit.messageHandlers.searchLoans.postMessage(obj);
                }catch(e){
                    return false;
                }
            }
            return false;
        }
    })