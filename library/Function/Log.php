<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-23
 * UTF-8
 */
class Function_Log{
	
	public static function write($module_name,$notice_header,$notice_body=''){
		$path = LIBRARY_DIR.'/../logs/';
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
		@chmod($filepath, 0755);
		return true;
	}
}