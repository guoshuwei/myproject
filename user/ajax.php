<?php
require_once 'core/init.php';
if(Input::exists()){
	//判断登录状态
	if($_POST['type'] == "modify_mobile_code"){//修改手机号

	}elseif($_POST['type'] == "get_mobile_code"){//获取手机验证码
		//发短信
		$res =Lib_Duanxin_Main::sendCode($mobile, 1);
	}
}