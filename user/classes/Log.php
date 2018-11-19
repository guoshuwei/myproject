<?php
class Log{
	public static function dolog($module,$data){
		if(!$module) return false;
		$logging_dir = Config::get('logging/dir');
		if(!dir($logging_dir)){
			@mkdir('logs',0777);
		}
		$login_path = $logging_dir . '/' . $module . '.txt';
		file_put_contents($login_path, json_encode($data));
	}
}

//v5M7F4b9  15210668564   5bd29164ccd2d