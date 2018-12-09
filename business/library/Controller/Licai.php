<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2015-7-20
 * UTF-8
 */

class Controller_Licai extends Yaf_Controller_Abstract{
	
	protected $_user = null;
	protected $_request = null;
	protected $_session = null;
	
	
	public function init(){
		//装载User
		$uid = DiscuzTool::getUid();
		$userInfo = null;
		if(!empty($uid)){
			$userInfo = TyModule_P2peye_UcenterMembers::getInstance()->getUserInfoByUid($uid);
		}
		
		$this->_user = $userInfo;
		SmartyAdapter::assign('user',$this->_user);
		
		//装载请求request
		$this->_request = $this->getRequest();
		
		//获得yaf注册session
		$this->_session = Yaf_Registry::get("session");
	}
	
	/**
	 * 返回Json数据
	 * @param unknown $code
	 * @param array $data
	 * @param string $message
	 * @throws Exception
	 */
	protected function _returnJson($code,array $data=array(),$message=''){
		$code = intval($code);
		if(!is_array($data)){
			throw new Exception("data mast be an array");
		}
		
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
	protected function _checkPost(){
		if(!$this->_request->isPost()){
			$this->_returnJson(4101, array());
		}
	}
	
	/**
	 * 校验是否登录
	 * @return integer | null
	 */
	protected function _checkLogin(){
		if(empty($this->_user)){
			$this->_returnJson(4100, array());
		}
		return $this->_user['uid'];
	}
	
	
}