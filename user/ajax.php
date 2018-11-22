<?php
require_once 'core/init.php';
$islogin = Session::get(Config::get('session/session_name'));
if($islogin && Input::exists()){
	$mobile = Input::get('mobileval');
	// var_dump($mobile);
	getMobilecode($mobile);
}

/**
 * 异步获取手机验证码
 */
function getMobilecode($mobile){
	if(!$mobile){
		//手机号不存在
		Lib_Function::getInstance()->returnJson('5104',array(),'手机号不存在!');
	}
	$time = 0;
	//这个过期时间60秒是存在memcached中的。
	if(isset($_SESSION['time'])){
		$time = $_SESSION['time'] - time();
	}
	if($time > 0){
		//手机验证码还未过期
		Lib_Function::getInstance()->returnJson(5112,array('time'=>$time));
	}
	//验证手机格式
	$mobile = Lib_Function::getInstance()->checkmobile($mobile);
	if(!$mobile){
		//格式错误
		Lib_Function::getInstance()->returnJson(5100);
	}
	//放入到SESSION 为公用绑定流程作铺垫
	$_SESSION['mobile'] = $mobile;

	//发短信
	$res =Lib_Duanxin_Main::sendCode($mobile, 1);
	//短信次数超过10次提示
	if($res['code'] == '400'){
        Lib_Function::getInstance()->returnJson(400,array('error'=>"今日获取验证码次数超过上限，明天再试吧!"),"今日获取验证码次数超过上限，明天再试吧!");
    }
	if(!$res){
		Lib_Function::getInstance()->returnJson(5113);
	}
	$_SESSION['time'] = time() + 60;
	$time = 60;
	Lib_Function::getInstance()->returnJson(200,array('time'=>$time));
}