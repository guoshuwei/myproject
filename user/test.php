<?php
require_once 'core/init.php';
// require_once(__DIR__.'/../library/Lib/Duanxin/Main.php');

/*echo 'hello，许爷！';
$moblie = '15201130778';
$type 	= '10';
$res = Lib_Duanxin_Main::sendCode($moblie, $type);

var_dump($res);*/
$name 		= '你好';
$idnumber 	= '410927198301175026';
$result 	= Lib_Certification::getInstance()->apiLianzhuo($name,$idnumber);
var_dump($result);