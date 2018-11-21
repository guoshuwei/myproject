<?php
header('content-type;text/html;charset=utf-8');
session_start();

require __DIR__ . '/../smarty/libs/Smarty.class.php';
$smarty = new Smarty;
// smarty.template_dir = APP_PATH "/views/"
//$smarty->force_compile = true;
// $smarty->template_dir = APP_PATH "/views/"
// $smarty->debugging = true;
$smarty->caching = false;//关闭Smarty模板缓存
$smarty->cache_lifetime = 1;
//
$GLOBALS['config'] = array(
	'mysql' => array(
			'host' => '127.0.0.1',
			'dbname' => 'main',
			'username' => 'root',
			// 'password' => '',
			'password' => '123456',
			'charset' => 'utf8',
			'collation' => 'utf8_unicode_ci',
			'prefix' => '',
		),
	'remember' => array(
		'cookie_name' => 'hash',
		'cookie_expiry' => 604800,
		),
	'session' => array(
		'session_name' => 'user',
		'token_name' => 'token'
		),
	'logging' => array(
		'dir' => 'logs',
		'type' => 'file',
		),
	);

// function exception_error_handler($errno, $errstr, $errfile, $errline ) {
//     throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
// }
// set_error_handler("exception_error_handler");
// //全局常量
define('ROOT_PATH', dirname(__FILE__));
// 站点根URL
define('ROOT_URL', 'http://localhost/myproject/');
// //获取一个目录下的所有文件名
$inter_class = array();
$classes_dir = ROOT_PATH."/../classes";
try{
	if(is_dir($classes_dir)){
		$handler = opendir($classes_dir);
		while(($file = readdir($handler)) !== false){
			if($file != '.' && $file != '..'){
				$inter_class[] = substr($file,0,strpos($file , '.'));
			}
		}
		closedir($handler);
	}
}catch(ErrorException $ex){
	echo $ex->getMessage();
}

spl_autoload_register(function($class) use ($inter_class){
	if(in_array($class,$inter_class)){
		require_once 'classes/' . $class .'.php';
	}else{
		//引入外部library公有库
		require_once ROOT_PATH.'/../../library/bootstrap.php';
	}
	//@include_once 'classes/' . $class .'.php';//常见问题：require_once 有报错直接挂掉，include_once ,有报错提示waring,后面代码继续执行
});
//自定义方法
require_once 'functions/sanitize.php';
