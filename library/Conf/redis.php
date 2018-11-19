<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-29
 * UTF-8
 */
$config['local'] = array(
		'host'=>'127.0.0.1',
		'port'=>'6379',
		'auth'=>'123456'
);

$config['test'] = array(
		'host'=>'127.0.0.1',
		'port'=>'6379',
		'auth'=>''
);

$config['rls'] = array(
		'host'=>'192.168.2.193',
		'port'=>'16379',
		'auth'=>''
);
return $config;
