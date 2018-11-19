
var ua = window.navigator.userAgent.toLowerCase();
if((ua.match(/androidapp/i) == 'androidapp')||(ua.match(/iosapp/i) == 'iosapp')){
    if ((ua.match(/androidapp/i) == 'androidapp') &&(ua.match(/p2peye/i) == 'p2peye')){//如果是安卓天眼app 访问原版隐藏
        $(".linkold").hide();
    }else {
        $(".linkold").show();
    }
}
$("body")
    .on('tap',".down",function(){
        if(ua.match(/iosapp/i) == 'iosapp'){
            window.webkit.messageHandlers.download.postMessage({"url":"https://itunes.apple.com/cn/app/%E8%AE%B0%E5%91%97-%E6%82%A8%E8%BA%AB%E8%BE%B9%E7%9A%84%E7%90%86%E8%B4%A2%E8%AE%B0%E8%B4%A6%E7%AE%A1%E5%AE%B6/id1211093541?mt=8"});
        }else if(ua.match(/androidapp/i) == 'androidapp'){
            window.location.href="//a.app.qq.com/o/simple.jsp?pkgname=com.p2peye.remember"
        }else {
            window.location.href="//a.app.qq.com/o/simple.jsp?pkgname=com.p2peye.remember"
        }
    })
if((ua.match(/licaiapp/i) == 'licaiapp')||(ua.match(/p2peye/i) == 'p2peye')||(ua.match(/touyouquan/i) == 'touyouquan')){
    $("body")
        .on('touchend',".linkold",function(){
            if(ua.match(/iosapp/i) == 'iosapp'){
                window.webkit.messageHandlers.original.postMessage({"type":"1"})
            }else if(ua.match(/androidapp/i) == 'androidapp'){
                BillJSInterface.jumpJibeiApp();
            }
        })
}
