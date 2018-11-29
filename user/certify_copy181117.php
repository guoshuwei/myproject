<?php
require_once 'core/init.php';

$islogin = Session::get(Config::get('session/session_name'));

if ($islogin) {
	$user 		= new User();
	$userinfo 	= $user->findbyfield('id',$_SESSION['user']);

	$user_detail= new Model('t_user_details_dd');
	$user_det 	= $user_detail->get_one(['uid','=',$_SESSION['user']]);

	if(Input::exists()){
		// $data =array(
		// 	'url' => '/user/home.php',
		// ); 
		// Lib_Function::getInstance()->returnJson('400',$data,'2222');
		// exit;
		//接入实名认证：
		// $chk_idcard = Lib_Function::getInstance()->Identity($idcard);
		// if(!$chk_idcard){
		// 	$this->_returnJson('400','','请输入正确的身份证号!');
		// }
		// 
		$validate 	= new Validate();
		$validation = $validate->check($_POST,array(
				'name' 		=> array('required' => true),
				'idnumber' 	=> array('required' => true),
				// 'mobile' =>array('required' => true)
			));
		if (empty($validation->errors())) {
			
			$flag_upd = true;

			if (!empty($user_det)) {
				// 是否已经进行过实名认证
				if ($user_det->certify_at > 0) {
					Lib_Function::getInstance()->returnJson('400', array(), '您已认证');
				}
			} else {
				$flag_upd = false;
			}

			// 接入阿里云实名认证
			/*
			//--->全国身份证实名认证【需是阿里云认证企业用户才可购买】
			//接口地址
			$url 		= 'http://1.api.apistore.cn/idcard3';
			//appcode查看地址 https://market.console.aliyun.com/imageconsole/
			$appCode 	= '您的appcode';
			//姓名
			$params['realName'] = Input::get('name');
			//身份证号码
			$params['cardNo'] 	= Input::get('name');
			//发送远程请求;
			$result = Lib_Function::getInstance()->APISTORE($url, $params, $appCode, "POST");
			//返回结果
			if ($result['error_code'] == 0){
			    // echo $result['reason']; //信息一致
			    // 认证通过
			    $certify_dat= array(
			    		'uid' 		=> $_SESSION['user'],
			    		'realName' 	=> $result['realName'],
			    		'cardNo' 	=> $result['cardNo'],
			    		'addrCode' 	=> $result['result']['addrCode'],
			    		'birthday' 	=> $result['result']['birth'],
			    		'sex' 		=> $result['result']['sex'],
			    		'length' 	=> $result['result']['length'],
			    		'checkBit' 	=> $result['result']['checkBit'],
			    		'addr' 		=> $result['result']['addr'],
			    		'orderNo' 	=> $result['orderNo'],
			    		'created_at'=> date('Y-m-d H:i:s'),
			    	);
			    $certify = new Model('t_pay_certify');
				$certify->insert($certify_dat);

				$data = array(
						'uid' 		=> $_SESSION['user'],
						'truename' 	=> Input::get('name'),
						'idcard' 	=> Input::get('idnumber'),
						'certify_at'=> time(),
					);
				$res = 0;
			    // 
				if ($flag_upd) {
					unset($data['uid']);
				    $res = $user_detail->update($data, $user_det->id);
				} else {
					$res = $user_detail->insert($data);
				}
				$res ? Lib_Function::getInstance()->returnJson('200', array(), '认证成功') : Lib_Function::getInstance()->returnJson('400', array(), '认证失败');
			} else {
			    // echo $result['reason'];  //信息不一致
			    // 认证不通过
			    Lib_Function::getInstance()->returnJson('400', array(), '认证失败');
			}
			//<---全国身份证实名认证
			*/
			
			//--->身份证实名认证
			//<文档地址：https://market.aliyun.com/products/56928004/cmapi014760.html>
			$url 		= 'http://idcard.market.alicloudapi.com/lianzhuo/idcard';
			//appcode查看地址 https://market.console.aliyun.com/imageconsole/
			$appCode 	= 'd97e7dd77f6b411f923adb6445836b36';
			
			$url .= '?cardno='.Input::get('idnumber').'&name='.Input::get('name');
			//发送远程请求;
			$result = Lib_Function::getInstance()->APISTORE($url, array(), $appCode, "GET");
			//返回结果【注：调试用时，合法的身份证号返回的code为5】
			if ($result['resp']['code'] == 0){
			    // 认证通过
			    $certify_dat= array(
			    		'uid' 		=> $_SESSION['user'],
			    		'realName' 	=> Input::get('name'),
			    		'cardNo' 	=> Input::get('idnumber'),
			    		'birthday' 	=> $result['data']['birthday'],
			    		'sex' 		=> $result['data']['sex'],
			    		'addr' 		=> $result['data']['address'],
			    		'created_at'=> date('Y-m-d H:i:s'),
			    	);
			    $certify = new Model('t_pay_certify');
				$certify->insert($certify_dat);

				$data = array(
						'uid' 		=> $_SESSION['user'],
						'truename' 	=> Input::get('name'),
						'idcard' 	=> Input::get('idnumber'),
						'certify_at'=> time(),
					);
				$res = 0;
				// 
				if ($flag_upd) {
					unset($data['uid']);
				    $res = $user_detail->update($data, $user_det->id);
				} else {
					$res = $user_detail->insert($data);
				}
				$res ? Lib_Function::getInstance()->returnJson('200', array(), '认证成功') : Lib_Function::getInstance()->returnJson('400', array(), '认证失败');
			    
			} else {
			    // echo $result['reason'];  //信息不一致
			    // 认证不通过
			    Lib_Function::getInstance()->returnJson('400', $result, '认证失败');
			}
			//<---身份证实名认证
		} else {
			Lib_Function::getInstance()->returnJson('400', array(), '信息有误');
		}	
	}

	$smarty->assign("username", $userinfo['username']);
	$smarty->assign("user_det", json_decode(json_encode($user_det), true));
	$smarty->display('certify.tpl');
} else {
	$smarty->display('404.tpl');
}

// var_dump($user->data()->username);