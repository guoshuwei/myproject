<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2015-7-20
 * UTF-8 
 */
//设置时区
date_default_timezone_set('Asia/Shanghai');
session_start();
//全局常量
define('ROOT_PATH', dirname(__FILE__));
define('APP_PATH',ROOT_PATH.'/application');

$env_get = getenv('RUNTIME_ENVIROMENT');
$rtime = getenv('RUNTIME_ENVIROMENT');
$rtime2 = getenv('RUNTIME_ENVIROMENT');
$env = 'local';// empty($env_get)?'local':(in_array($rtime, array('rls','test','local'))?$rtime2:'local');

define("RUNTIME_ENVIROMENT", $env);

//版本号
define('CSS_VERSION', 20171117);//css
define('JS_VERSION', 20171117);//js
//注册smarty的自动加载

define('SMARTY_SYSPLUGINS_DIR', ROOT_PATH.'/library/Third/Smarty/sysplugins/');

spl_autoload_register('__smatyAutoload');
require_once ROOT_PATH.'/../library/bootstrap.php';
//创建application

$application = new Yaf_Application( ROOT_PATH . "/conf/{$env}/application.ini");
$application->bootstrap()->run();


function __smatyAutoload($strClassName){
	$_class = strtolower($strClassName);
	if (substr($_class, 0, 16) === 'smarty_internal_' || $_class == 'smarty_security') {
		return include SMARTY_SYSPLUGINS_DIR . $_class . '.php';
	}
}
