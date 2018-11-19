<?php
require_once 'core/init.php';

if(Session::exists('home')){
	echo "<p>".Session::flash('home')."</p>";
}
$islogin = Session::get(Config::get('session/session_name'));
$user = new User();
if($islogin){
	$userinfo =  $user->findbyfield('id',$_SESSION['user']);
}
$smarty->assign("username", $userinfo['username']);
$smarty->display('index.tpl');
// var_dump($user->data()->username);