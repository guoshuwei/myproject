<?php
require_once 'core/init.php';
if(Input::exists()){
	// if(Token::check(Input::get('token'))){
		$validate = new Validate();
		$validation = $validate->check($_POST,array(
				'username' => array('required' => true),
				'password' => array('required' => true),
				// 'mobile' =>array('required' => true)
			));
		if($validation->passed()){
			$user = new User();
			$login = $user->login(Input::get('username'), Input::get('password'));
			if($login){
				$data =array(
					// 'url' => '/user/home.php',
					'url' => ROOT_URL . 'user/home.php',
				); 
				Lib_Function::getInstance()->returnJson('200',$data);
			}else{
				Lib_Function::getInstance()->returnJson('400',array(),'用户名或密码不正确!');
			}
		}else{
			$errors = $validation->errors();
			var_dump($errors);die;
		}
	// }
}
//产生token，防止重放攻击  todo 暂时去掉
$login_token = Token::generate();
$smarty->assign("login_token", $login_token);
$smarty->display('login.tpl');
?>





