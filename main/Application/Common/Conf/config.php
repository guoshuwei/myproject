<?php
return array(
	//'配置项'=>'配置值'
	'MODULE_ALLOW_LIST'     =>  array(
            'Home',
            'Admin',
    ),
	'URL_ROUTER_ON'		=>	true,
	//路由定义
	'URL_ROUTE_RULES'	=> 	array(
		'blog/:year\d/:month\d'	=>	'Home/Route/archive', //规则路由
		'blog/:id\d'			=>	'Home/Route/read', //规则路由
		'blog/:cate'			=>	'Home/Route/category', //规则路由
	),
	'DB_TYPE'		=>	'mysqli',
	'DB_HOST'		=>	'127.0.0.1',
	'DB_NAME'		=>	'main',
	'DB_USER'		=>	'root',
	'DB_PWD'		=>	'',
	'DB_PORT'		=>	'3306',
	'DB_PREFIX'		=>	'',
	'LOG_RECORD' => true, // 开启日志记录
	'API_COMPONENT' => array(
		'data_center' => array(
			'news' => 'http://192.168.186.158/data_center/server/news.php',
			'zixun' => '',	
		),
	),
);
