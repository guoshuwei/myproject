<?php
require_once 'core/init.php';
if(Input::exists()){
	$data =array(
		'url' => '/user/home.php',
	); 
	 Lib_Function::getInstance()->returnJson('400',$data,'2222');
	 exit;
	//接入实名认证：
	// $chk_idcard = Lib_Function::getInstance()->Identity($idcard);
	// if(!$chk_idcard){
	// 	$this->_returnJson('400','','请输入正确的身份证号!');
	// }
	
}
$smarty->display('address.tpl');
// var_dump($user->data()->username);