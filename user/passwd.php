<?php
require_once 'core/init.php';

$islogin = Session::get(Config::get('session/session_name'));
if ($islogin) {
	$user 		= new User();
	$userinfo 	= $user->findbyfield('id',$_SESSION['user']);

	if (Input::exists()) {
		// if(Token::check(Input::get('token'))){
			$validate = new Validate();
			$validation = $validate->check($_POST,array(
					'old_passwd' => array('required' => true),
					'new_passwd' => array('required' => true),
					'rep_passwd' => array('matches' => 'new_passwd'),
				));
			if ($validation->passed()) {
				// $user 		= new User();
				$res_upd = $user->chgPasswd(Input::get('old_passwd'), Input::get('new_passwd'));
				if($res_upd){
					Lib_Function::getInstance()->returnJson('200', array(), '修改成功，下次登录生效！');
				}else{
					Function_Log::write('user', '修改密码出错', json_encode(['uid'=>$_SESSION['user']]));
					Lib_Function::getInstance()->returnJson('400', array(), '修改失败');
				}
			}else{
				Function_Log::write('user', '修改密码出错', json_encode(['uid'=>$_SESSION['user'], 'reason'=>'参数有误！']));
				Lib_Function::getInstance()->returnJson('400', array(), '修改失败');
			}
		// }
	}
	//产生token，防止重放攻击  todo 暂时去掉
	// $login_token = Token::generate();
	// $smarty->assign("login_token", $login_token);
	$smarty->assign("username", $userinfo['username']);
	$smarty->display('passwd.tpl');
} else {
	$smarty->display('404.tpl');
}


