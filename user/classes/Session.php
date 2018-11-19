<?php
class Session{
	public static function exists($name){
		if(isset($_SESSION[$name])){
			return true;
		}
		return false;
	}

	public static function put($name , $value){
		return $_SESSION[$name] = $value;
	}

	public static function get($name){
		return isset($_SESSION[$name]);
	}

	public static function flash($name,$string = ''){
		if(self::exists($name)){
			$session = self::get($name);
			self::delete($name);
			return $session;
		}else{
			self::put($name,$string);
		}
	} 

	public static function delete($name){
		if(isset($_SESSION[$name])){
			unset($_SESSION[$name]);
			return true;
		}
		return false;
	}
}