function _app(){
    var app_url="//licai.p2peye.com/loans/help";
    var app_title='加息特权帮助';
    var app_desc="返利平台与理财平台之间有协议，凡是通过返利平台前往理财平台的用户成功投资，理财平台就需要支付给返利平台一定的费用。而返利加息就是返利平台把获得的费用转而支付给投资者的模式。";
    var jsonapp={"url":app_url,"title":app_title,"desc":app_desc};
    if(window.JSInviteInterface){
        $(".jumpapp").click(function(e){
            JSInviteInterface.payResult(JSON.stringify(jsonapp));
        });
    }else {
        function connectWebViewJavascriptBridge(callback) {

                if (window.WebViewJavascriptBridge) {
                    callback(WebViewJavascriptBridge)
                } else {
                    document.addEventListener('WebViewJavascriptBridgeReady', function() {
                        callback(WebViewJavascriptBridge)
                    }, false)
                }


        }

        connectWebViewJavascriptBridge(function(bridge) {
            /* Init your app here */
            bridge.init(function(message, responseCallback) {
            })
            $(".jumpapp").click(function(e){
                e.preventDefault();

                var data =jsonapp;
                bridge.send(data, function(responseData) {
                })

            });
        })
    }
}
_app()
