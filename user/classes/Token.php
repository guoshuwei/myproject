<?php
class Token{

	public static function generate(){
		$aa = Session::put(Config::get('session/token_name'),uniqid());
		// Log::dolog('register',array('session_generate'=>$aa,'logtime' => date('Y-m-d H:i:s',time())));
		return $aa;
	}

	public static function check($token){
		$tokenName = Config::get('session/token_name');
		if(Session::exists($tokenName) && $token === Session::get($tokenName)){
			Session::delete($tokenName);
			return true;
		}
		return false;
	}
}

//v5M7F4b9  15210668564   5bd29164ccd2d