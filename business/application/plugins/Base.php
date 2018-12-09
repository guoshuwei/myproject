<?php
/**
* @class BasePlugin
* @desc 运行每个action 要做的hook,主要包括，cookie设置,定位用户城市等...
* @author mt
*/
class BasePlugin extends Yaf_Plugin_Abstract {
	private $arrCity = NULL;
	public function routerStartup(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {

		// 前插逻辑
		$config = Yaf_Registry::get ( "config" );
	}
	
	
	public function routerShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		if (SmartyAdapter::$disable)
			return;
		$config = Yaf_Registry::get ( "config" );
		$smatyConfig = $config ['smarty'];
		// 确定路由后，开始判断显示逻辑
		// 显示逻辑包括：选择模板,抽样,判断缓存等
		$config = Yaf_Registry::get ( "config" );
		$template_path = $config['application']['directory'] . '/views/';
		$smatyConfig['template_dir'] = $template_path;
		$template_path .= strtolower($request->controller . '/' . $request->action);
		if(file_exists($template_path)){
			$keys = array_keys($request->getParams());
			$request->extend_name = $request->action;
			if(isset($keys[2])){
				$request->action = $keys[2];
			}
		}
		
		SmartyAdapter::setConfig ( $smatyConfig );
		$params = $request->getParams ();
		SmartyAdapter::assign('controller',ucfirst($request->controller));
		SmartyAdapter::assign('action',ucfirst($request->action));
		
		$defaultTtemplateName = strtolower ( $request->controller . '/' . $request->action);

	
		SmartyAdapter::$templateName = $defaultTtemplateName;
		
		SmartyAdapter::assign ( 'application_type', 0 );
		
		// 测试环境删除缓存
		$envConfig = Yaf_Registry::get ( 'config' );
		$envConfig = $envConfig['env'];
		if ($envConfig['is_dubug'] == 1) {
			SmartyAdapter::disableCache ();
		}

		
	}
	
	// public function dispatchLoopStartup(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
	// }
	
	// public function preDispatch(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
	// }
	
	// public function postDispatch(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
	// }
	public function dispatchLoopShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response) {
		if (! SmartyAdapter::$disable) {
			SmartyAdapter::display ();
		}
		
		// IQTLog::end ();
	}
	
}
