<?php
class Validate{
	private $_passed = false,
			$_errors = array(),
			$_db = null;

 	public function  __construct(){
 		$this->_db = DB::getInstance();
 	}

 	public function check($source, $items = array()){
 		foreach($items as $item => $rules){
 			foreach($rules as $rule => $rule_value){
				$value = trim($source[$item]);

				if($rule === 'required' && empty($value)){
					$this->addError("请填写{$item}"); 
				}elseif(!empty($value)){
					switch($rule){
						case 'min':
							if(strlen($value) < $rule_value){
								$this->addError("{$item}必须大于{$rule_value}个字符!");
							}
						break;
						case 'max':
							if(strlen($value) > $rule_value){
								$this->addError("{$item}不能大于{$rule_value}个字符!");
							}
						break;
						case 'matches':
							if($value != $source[$rule_value]){
								// $this->addError("{$rule_value} must match {$item}");
								$this->addError("两次输入密码不一致,请重新输入!");
							}
						break;
						case 'reg':
							if (!preg_match($rule_value, $value)) {
								$this->addError("格式有误！");
							}
						break;
						case 'unique':
							$check = $this->_db->get($rule_value,array($item ,'=',$value));
							if($check->count()){
								if($item == 'username'){
									$this->addError("用户名已经存在，请直接登录！");
								}elseif($item == 'mobile'){
									$this->addError("手机号已被注册，请跟换手机号登录！");
								}
							}
						break;
					}
				} 				
 			}
 		}
 		if(empty($this->_errors)){
 			$this->_passed = true;
 		}
 		return $this;
 	}

 	private function addError($error){
 		$this->_errors[] = $error;
 	}

 	public function errors(){
 		return $this->_errors;
 	}

 	public function passed(){
 		return $this->_passed;
 	}
}