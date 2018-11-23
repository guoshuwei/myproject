<?php
function escape($string){
	return htmlentities($string,ENT_QUOTES,'UTF-8');
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
	// var_dump($res);die;
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


function modifyMobileCode($mobile,$step){
	$return_data = array();
	if($step == 0){
		getMobilecode($mobile);
	}elseif($step == 1){
		$return_data['step'] = 2;
		$_SESSION['time'] = 0;//结束第一次清空记时
		Lib_Function::getInstance()->returnJson(200,$return_data,'');
	}elseif($step == 2){
		//验证手机号是否已注册
		//验证手机格式
		$checkmobile = Lib_Function::getInstance()->checkmobile($mobile);
		$user = new User();		
		$is_mobile = $user->findbyfield('mobile',$mobile);
		if($is_mobile){
			Lib_Function::getInstance()->returnJson(5101);
		}
		//跟新手机号
		$user_model= new Model('t_user_dd');
		$res 	= $user_model->update(['mobile'=>$mobile], $_SESSION['user']);
		if($res){
			Lib_Function::getInstance()->returnJson(200, $return_data, '手机号修改成功!');
		}else{
			Lib_Function::getInstance()->returnJson(400,'','网络异常，请稍后再试!');
		}
				
	}

}
// function get_error_messagebycode($code){
// 	if(intval($code)) return '';
// 	$error_code = array(
// 		'100' => '用户名不能为空!'
// 	)
// }

