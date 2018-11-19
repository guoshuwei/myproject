<?php
function exception_error_handler($errno, $errstr, $errfile, $errline ) {
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
}
set_error_handler("exception_error_handler");

class Log{
	
	public static function write($module_name,$notice_header,$notice_body=''){
		$path = '/var/www/main/logs/';
		if(!file_exists($path)){
			@mkdir($path,0755);
		}
		$date_str = date('Y-m-d');
		$date_fmt = date('Y-m-d H:i:s',time());
		$path = $path.$module_name.'/';
		if(!file_exists($path)){
			@mkdir($path,0755);
		}
		$filepath = $path.$date_str.'.log';
		if ( ! $fp = @fopen($filepath, 'ab'))
		{
			return false;
		}
		$message = $date_fmt.'::'.$notice_header.'::'.$notice_body."\n";
		flock($fp, LOCK_EX);
		fwrite($fp, $message);
		flock($fp, LOCK_UN);
		fclose($fp);
		chmod($filepath, 0755);
		return true;
	}
}