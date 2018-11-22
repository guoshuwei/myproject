<?php
require_once 'core/init.php';
if(Input::exists()){
	echo 11;die;
	//判断登录状态
	if($_POST['type'] == "modify_mobile_code"){//修改手机号

	}elseif($_POST['type'] == "get_mobile_code"){//获取手机验证码
		//发短信
		$res =Lib_Duanxin_Main::sendCode($mobile, 1);
	}
}

/**
 * 异步获取手机验证码
 */
function getMobilecode(){
	$this->_checkPost();
	if($this->_user['uid']){
		//已登录
		$this->_returnJson(2002);
	}
	//获取参数
	$mobile = $this->_request->getPost('mobile');
	$type = $this->_request->getPost('type');
	if(!$mobile){
		//手机号不存在
		$this->_returnJson(5104);
	}
	//验证手机号是否已注册
	$is_mobile = TyModule_P2peye_CommonMemberProfile::getInstance()->getUserMobile($mobile);
	if($is_mobile){
		$this->_returnJson(5101);
	}
	$time = 0;
	if(isset($this->_session['time'])){
		$time = $this->_session['time'] - time();
	}
	if($time > 0){
		//手机验证码还未过期
		$this->_returnJson(5112,array('time'=>$time));
	}
	//验证手机格式
	$mobile = TyLib_Function::getInstance()->checkmobile($mobile);
	if(!$mobile){
		//格式错误
		$this->_returnJson(5100);
	}
	//放入到SESSION 为公用绑定流程作铺垫
	$this->_session['mobile'] = $mobile;
	//验证验证码
	$code = $this->_request->getPost('code');
	if(!$code){
		$this->_returnJson( 4105 );
	}
	//发短信
	$res =TyLib_Duanxin_Main::sendCode($mobile, 1);
	//短信次数超过10次提示
	if($res['code'] == '400'){
        $this->_returnJson(400,array('error'=>"今日获取验证码次数超过上限，明天再试吧!"),"今日获取验证码次数超过上限，明天再试吧!");
    }
	if(!$res){
		$this->_returnJson(5113);
	}
	$this->_session['time'] = time() + 60;
	$time = 60;
	$this->_returnJson(200,array('time'=>$time));
}