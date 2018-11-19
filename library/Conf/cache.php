<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-23
 * UTF-8
 */
$cache['local'] = array(
	'memcache' => array(
		array(
			'host' => '127.0.0.1',
			'port' => '11211',
			'weight' => '1'
		)
	),
	'memcached' => array(
		array(
			'host' => '127.0.0.1',
			'port' => '11211',
			'weight' => '1'
		)
	)
);

$cache['test'] = array(
	'memcache' => array(
		array(
			'host' => '127.0.0.1',
			'port' => '12306',
			'weight' => '1'
		)
	),
	'memcached' => array(
		array(
			'host' => '127.0.0.1',
			'port' => '12306',
			'weight' => '1'
		)
	)
);

$cache['rls'] = array(
	'memcache' => array(
		array(
			'host' => '192.168.2.191',
			'port' => '12306',
			'weight' => '1'
		),
		array(
			'host' => '192.168.2.192',
			'port' => '12306',
			'weight' => '1'
		),
		array(
			'host' => '192.168.2.193',
			'port' => '12306',
			'weight' => '1'
		),
		array(
			'host' => '192.168.2.197',
			'port' => '12306',
			'weight' => '1'
		)
	),
	'memcached' => array(
		array(
			'host' => '192.168.2.191',
			'port' => '12306',
			'weight' => '1'
		),
		array(
			'host' => '192.168.2.192',
			'port' => '12306',
			'weight' => '1'
		),
		array(
			'host' => '192.168.2.193',
			'port' => '12306',
			'weight' => '3'
		),
		array(
			'host' => '192.168.2.197',
			'port' => '12306',
			'weight' => '1'
		)
	)
);

return $cache;