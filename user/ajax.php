<?php
require_once 'core/init.php';
$islogin = Session::get(Config::get('session/session_name'));
if($islogin && Input::exists()){
	$mobile = Input::get('mobile');
	$type = Input::get('type');
	$step = null !== Input::get('step') ? Input::get('step') : 0;
	switch($type){
		case 'modify_mobile_code':
			modifyMobileCode($mobile,$step);
		default:
			break;
	}
}

