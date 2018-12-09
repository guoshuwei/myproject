<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2015-7-20
 * UTF-8
 */

class Bootstrap extends Yaf_Bootstrap_Abstract{

	public function _initConfig() {
		//把配置保存起来
		$arrConfig = Yaf_Application::app()->getConfig()->toArray();
		//合并配置信息
		if(!empty($arrConfig[RUNTIME_ENVIROMENT])){
			$arrConfig = array_merge($arrConfig, $arrConfig[RUNTIME_ENVIROMENT]);
		}

		Yaf_Registry::set('config', $arrConfig);

		//session start
		// $session = Yaf_Session::getInstance();
		// $session->start();

		// Yaf_Registry::set('session',$session);
	}

	public function _initPlugin(Yaf_Dispatcher $dispatcher) {
		//注册BasePlugin
		$basePlugin = new BasePlugin();
		// var_dump($basePlugin);die;
		$dispatcher->registerPlugin($basePlugin);
	}

	public function _initRoute(Yaf_Dispatcher $dispatcher) {
		//在这里注册自己的路由协议,默认使用简单路由
		$router = $dispatcher->getRouter();
		$arrConfig = Yaf_Registry::get("config");
		$routes = $arrConfig['routes'];
		$host = $_SERVER['HTTP_HOST'];
		$hostArr = explode('.', $host);
		$hostPrefix = $hostArr[0];
		
        
		
		if(!empty($routes))
			$router->addConfig($routes);
	}

	public function _initView(Yaf_Dispatcher $dispatcher){
		//不使用yaf本身的view
		$dispatcher->disableView();
	}
}