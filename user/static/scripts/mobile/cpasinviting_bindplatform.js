var app=require("./app"),
	jump=$('input[name=app-jump-data]').val();
if(jump=="Array"||jump==""){
	jump={"data":"nologin"};
}else {
	jump=$.parseJSON(jump);
}
$('body').on('tap','[role-tap=jumpbtn]',function(){
	_Fn.fireApp({
        trigger : "jumpAccountPage",
        data : jump
    });
    return false;
})
if($("body").height()<$(window).height()){
    $("body").height($(window).height())
}
