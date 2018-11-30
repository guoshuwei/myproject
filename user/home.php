<?php
require_once 'core/init.php';
if(Session::exists('home')){
	echo "<p>".Session::flash('home')."</p>";
}
$islogin = Session::get(Config::get('session/session_name'));
if ($islogin) {
	$user 		= new User();
	$userinfo 	= $user->findbyfield('id',$_SESSION['user']);

	$user_detail= new Model('t_user_details_dd');
	$user_det 	= $user_detail->get_one(['uid','=',$_SESSION['user']]);

	$smarty->assign("username", $userinfo['username']);
	$smarty->assign("user_inf", $userinfo);
	$smarty->assign("user_det", json_decode(json_encode($user_det), true));
	$smarty->display('index.tpl');
} else {
	$smarty->display('404.tpl');
}

// $user = new User();
// if($islogin){
// 	$userinfo =  $user->findbyfield('id',$_SESSION['user']);
// }
// $smarty->assign("username", $userinfo['username']);
// $smarty->display('index.tpl');
// var_dump($user->data()->username);