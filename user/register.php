<?php

require_once 'core/init.php';
// Log::dolog('register',array('session1' => $_SESSION,'logtime' => date('Y-m-d H:i:s',time())));
if(Input::exists()){
	// var_dump(Token::check(Input::get('token')));die;
	// if(Token::check(Input::get('token'))){
		$valicate = new Validate();
		$validation = $valicate->check($_POST,array(
			'username' => array(
				'required' => true,
				'min'=> 2,
				'max' => 20,
				'unique' => 't_user_dd'
				),
			'password' => array(
				'required' => true,
				'min' => 6
				),
			'renewpwd' => array(
				'required' => true,
				'matches' => 'password'
				),
			'mobile' => array(
				'required' => true,
				'min' => 2,
				'max' => 50,
				'unique' => 't_user_dd'
				)	
			)
		);

		if($validation->passed()){
			$user = new User();
			$salt = Hash::salt(32);
			try{
				$user->create(
					array(
						'username' => Input::get('username'),
						'password' => Hash::make(Input::get('password'),$salt),
						'salt' => $salt,
						'mobile' => Input::get('mobile'),
						'created_at' => date('Y-m-d H:i:s'),
						'group' => 1,
						)
					);
				Session::flash('home','注册成功，即将跳转首页！');
				// Redirect::to('/main/index.php');
				Redirect::to(ROOT_URL . 'main/index.php');
			}catch(Exception $e){
				die($e->getMessage());
			}
		}else{
			$error_message = $validation->errors()[0];
			Lib_Function::getInstance()->returnJson('400',array(),$error_message);
		}
	// }
	
}
$register_token = Token::generate();

$smarty->assign("register_token", $register_token);

$smarty->display('register.tpl');

?>