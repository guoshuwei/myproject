<?php
/**
 *
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-22
 * UTF-8
 */

// acl
$db ['local'] ['acl'] ['writer'] = array (
		'host' => '127.0.0.1',
		'port' => '3306',
		'user' => 'root',
		'password' => '',
		'database' => 'acl',
		'charset' => 'utf8' 
);
$db ['local'] ['acl'] ['reader'] = array (
		'host' => '127.0.0.1',
		'port' => '3306',
		'user' => 'root',
		'password' => '',
		'database' => 'acl',
		'charset' => 'utf8' 
);
//main
$db ['local'] ['main'] ['writer'] = array (
		'host' => '127.0.0.1',
		'port' => '3306',
		'user' => 'root',
		'password' => '',
		'database' => 'main',
		'charset' => 'utf8' 
);
$db ['local'] ['main'] ['reader'] = array (
		'host' => '127.0.0.1',
		'port' => '3306',
		'user' => 'root',
		'password' => '',
		'database' => 'main',
		'charset' => 'utf8' 
);
//merchant
$db ['local'] ['merchant'] ['writer'] = array (
		'host' => '127.0.0.1',
		'port' => '3306',
		'user' => 'root',
		'password' => '',
		'database' => 'merchant',
		'charset' => 'utf8' 
);
$db ['local'] ['merchant'] ['reader'] = array (
		'host' => '127.0.0.1',
		'port' => '3306',
		'user' => 'root',
		'password' => '',
		'database' => 'merchant',
		'charset' => 'utf8' 
);
return $db;
