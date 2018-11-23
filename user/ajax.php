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
	// var_dump($mobile);
	// getMobilecode($mobile);

	// $return_data = array();
	// 		//查询手机号信息
	// $step = intval($this->_request->getQuery('step')) ? intval($this->_request->getQuery('step')) : 1;
	// //１.身份验证
	// $mobile_code = $this->_request->getPost('mobile_code');
	// //验证手机验证码
	// $res = TyLib_Duanxin_Main::verifyCode($this->_session['mobile'], 1, $mobile_code);
	// if (!$res) {
	// 	$this->_returnJson(5114);
	// }
	// if($step == 1) {
	// 	$return_data['step'] = 2;
	// 	$this->_session['time'] = 0;//结束第一次清空记时
	// 	$this->_returnJson(200,$return_data,'');
	// }elseif($step == 2){

	// }
}

