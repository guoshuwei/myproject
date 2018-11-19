<?php
require_once 'core/init.php';

if(Session::exists('home')){
	echo "<p>".Session::flash('home')."</p>";
}
$islogin = Session::get(Config::get('session/session_name'));
$user_detail = new Model('t_user_details_dd');

//discuz 用户信息拉取
//获取省份组件
$apidata = array();
$res = Lib_DiscuzApi::getInstance ()->getProfileInfo ( $apidata );
// var_dump($res);die;
// $res['data']['residecity'] = $res['data']['htmls']['residecity'];//省份组件

// var_dump(222);die;
$smarty->assign("username", '');
$smarty->assign("birth_component",$res['data']['birth_component']);
$smarty->assign("residecity_component",$res['data']['residecity_component']);
$smarty->assign("gender_component",$res['data']['gender_component']);
$smarty->display('profile.tpl');
// var_dump($user->data()->username);