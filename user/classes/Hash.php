<?php
class Hash{
	public static function make($string, $salt =''){
		return hash('sha256',$string . $salt);
	}

	public static function salt($length){
		//return mcrypt_create_iv($length);
		//return self::getSalt($length);
		return rand(10000,99999);
	}

	public static function getSalt($length) {
	    $charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\][{}\'";:?.>,<!@#$%^&*()-_=+|';
	    $randString = "";
	    $randStringLen = $length;

	    while(strlen($randString) < $randStringLen) {
	        $randChar = substr(str_shuffle($charset), mt_rand(0, strlen($charset)), 1);
	        $randString .= $randChar;
	    }

	    return $randString;
	}

	public static function unique(){
		return self::make(unique());
	}
}