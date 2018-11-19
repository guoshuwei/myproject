//调用app分享
var app=require("./app"),
    $d=$(document),
    $apptitle=$d.attr("title"),
    $appdesc=$d.find("meta[name=description]").attr("content"),
    $appurl=$('input[name=share_url]').val();
$('body').on('tap','[role-tap=btn]',function(){
    var jsonapp={"title":$apptitle,"desc":$appdesc,"url":$appurl};
    _Fn.fireAppShare(jsonapp);
})
if($("body").height()<$(window).height()){
    $("body").height($(window).height())
}
