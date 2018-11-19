var app=require("./app"),
	btnParent=$("[role-parent=btn]"),
	btnEle=$("[role-operation=fixed]"),
	$d=$(document),
	$apptitle=$d.attr("title"),
    $appdesc=$d.find("meta[name=description]").attr("content"),
    $appurl=$('input[name=share_url]').val();
$('body').on('tap','[role-tap=jumpbtn]',function(){
	var jsonapp={"title":$apptitle,"desc":$appdesc,"url":$appurl};
    _Fn.fireAppShare(jsonapp);
     return false;
})