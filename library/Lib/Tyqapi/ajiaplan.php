<?php
/**
 * A+保障计划接口
 */
class TyLib_Tyqapi_ajiaplan extends TyLib_Tyqapi_Base{
	
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_ajiaplan();
        }
        return self::$obj;
    }

	public function getApplyInfo($mobile){
		$data = array(
		    'mobile'    => $mobile,
		);
		return $this->getTyqData('/cpas/getApplyInfo', $data);
	}
	public function getInvest($tyuid, $platform_name){
		$data = array(
			'tyuid'   => $tyuid,
			'platform_name'    => $platform_name,
		);
		return $this->getTyqData('/cpas/getInvest', $data);
	}
	public function insertApplyInfo($mobile, $username, $tyuid, $platform_name){
		$data = array(
			'mobile' => $mobile,
			'username' => $username,
			'tyuid'  => $tyuid,
			'platform_name'    => $platform_name,
		);
		return $this->getTyqData('/cpas/insertApplyInfo', $data);
	}
}