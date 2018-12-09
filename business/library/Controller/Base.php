<?php
/**
 *
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2015-7-20
 * UTF-8
 */

class Controller_Base extends Yaf_Controller_Abstract{
	protected $_request = null;
	protected $_user = null;
	public function init(){
		//装载请求request
		$this->_request = $this->getRequest();
		$this->_user = array();
		$is_login = 0;
		//获得yaf注册session
		// $this->_session = Yaf_Registry::get("session");
		if(isset($_SESSION['user'])){
			$dao = new Lib_Dao('main');
			$sql = "SELECT * FROM `t_user_dd` WHERE id={$_SESSION['user']}";
        	$this->_user = $dao->conn(false)->noCache()->preparedSql($sql, array())->fetchOne();
        	$is_login = 1;
        }

        //登录标识
        SmartyAdapter::assign('is_login',$is_login);
        SmartyAdapter::assign('user',$this->_user);
		// 当前访问的Controller和Action
		$this->controllerAction = $this->getRequest()->getControllerName() . '::' . $this->getRequest()->getActionName();
		SmartyAdapter::assign('Controller', $this->getRequest()->getControllerName());
		SmartyAdapter::assign('ControllerAction', $this->controllerAction);

	}
	// public function er
	
	/**
	 * 返回Json数据
	 * @param unknown $code
	 * @param array|string|int|bool $data
	 * @param string $message
	 * @throws Exception
	 */
	public function _returnJson($code,$data=array(),$message=''){
		$code = intval($code);
		if(empty($message)){
			$message = TyLib_Error::getMsg($code);
		}
		
		$returnData = array(
				'code'=>$code,
				'message'=>$message,
				'data'=>$data
		);
		header("Content-type: application/json");
		echo json_encode($returnData);
		exit;
	}
	
	/**
	 * 校验是否为Post请求
	 */
	public function _checkPost(){
		if(!$this->_request->isPost()){
			$this->_returnJson(4101, array());
		}
	}
	
	/**
	 * 校验是否登录
	 * @return integer | null
	 */
	public function _checkLogin(){
		if(empty($this->_user)){
			$is_jsonp = $this->_request->getQuery('jsonp');
			$is_jsonp = empty($is_jsonp) ? 0 : intval($is_jsonp);
			if ($is_jsonp > 0) {
				$returnData = array(
						'code'=>4100,
						'message'=>'未登录',
						'data'=>array()
				);
				$info = json_encode($returnData);
				echo 'jsonpCallback('.$info.')';exit;
			} else {
				$this->_returnJson(4100, array());
			}
		}
		return $this->_user['uid'];
	}
	
	public function getuser(){
		return $this->_user;
	}
	
	public function getrequest(){
		return $this->_request;
	}
	
	public function getconfig(){
		return $this->_config;
	}

	//将时间戳转换成时间描述，$show_time为时间戳
	public function tran_timestamp($show_time, $format='n月j日'){
		date_default_timezone_set("Asia/Shanghai");   //设置时区
		$now_time = date("Y-m-d H:i:s", time());
		$now_time = strtotime($now_time);
		$dur = $now_time - $show_time;
		if ($dur < 0) {
			return date($format, $show_time);
		} else {
			if ($dur < 60) {
				return $dur . '秒前';
			} else {
				if ($dur < 3600) {
					return floor($dur / 60) . '分钟前';
				} else {
					if ($dur < 86400) {
						return floor($dur / 3600) . '小时前';
					} else {
						return date($format, $show_time);
					}
				}
			}
		}
	}


	//添加时间描述
	public function addTimeDesc($list,$field = 'createtime'){
		if(empty($list)){
			return $list;
		}
		foreach ($list as $key=>$item){
			$list[$key]['createtime_desc'] = $this->tran_timestamp(intval($item[$field]));
			$list[$key]['createtime_desc_total'] = $this->tran_timestamp(intval($item[$field]), 'Y-m-d H:i:s');
		}
		return $list;
	}

	//判断终端类型
	public function checkTerminalType(){
		//			    判断终端类型
//			    终端标识
//				0=>'web-tyq',
//				1=>'iOS-tyq',
//				2=>'iOS-licai',
//				3=>'Android-tyq',
//				4=>'Android-licai',
//				5=>'H5',
//				6=>'web-ty',
//				7=>'H5-licai',

		if(ISMOBILE){
			$terminal_type = 7;
		}else{
			$terminal_type = 6;
		}
	}
	
	/**
	 * 从新指定路由文件位置
	 * @return boolean
	 */
	public function dispenser(){
		if(!$this->_request->extend_name){
			return false;
		}
		$file_path = APP_PATH . '/extend/' . $this->_request->controller . '/' . $this->_request->extend_name . '.php';
		if(!file_exists($file_path)){
			return false;
		}
		include_once $file_path;
		$extend = new $this->_request->extend_name($this);
		$action_name = $this->_request->action;
		if(method_exists($extend, $action_name) === false){
			return false;
		}
		$extend->$action_name();
		//获取链接地址第三个目录层级
		SmartyAdapter::$templateName = strtolower("{$this->_request->controller}/{$this->_request->extend_name}/{$this->_request->action}");
		SmartyAdapter::display();exit;
	}

    /**
     * 是否ajax请求
     * @return bool
     */
    public function isAjax()
    {
        if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == "xmlhttprequest") {
            //ajax请求
            return true;
        }
        return false;
    }
}
