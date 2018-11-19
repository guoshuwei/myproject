<?php
// 本类由系统自动生成，仅供测试用途
class UserController extends CommonController {
	public function __construct(){
		parent::__construct();
	}

	public function register(){
		$TBBehavior = new TokenBuildBehavior();
		// $content = '';
		$create_content = $TBBehavior->create_action();
		var_dump($create_content);die;

		$this->display('register');
	}
}