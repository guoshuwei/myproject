//----------------------ios 隐藏前往平台按钮 ------------------------
var $con = $('.section1-nav-list');
if(_Fn.terminalInfo.terminal == 'ios' && _Fn.terminalInfo.app == 'p2peye'){
    if(_Fn.terminalInfo.version <= '2017080901'){
        $con.children().eq($con.children().length-1).show();
    }
}else{
    $con.children().eq($con.children().length-1).show();
}