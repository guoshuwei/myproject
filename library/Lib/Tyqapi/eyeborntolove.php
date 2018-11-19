<?php
/**
 * EYE为爱而生
 * @author znz
 * 2017-02-08
 * UTF-8
 */
class TyLib_Tyqapi_eyeborntolove extends TyLib_Tyqapi_Base{
	
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_eyeborntolove();
        }
        return self::$obj;
    }
    /**
     * 资金池
     */
    public function getActivityPool(){
    	$data = array(
    			'activity' => 'valentine2017'
    	);
    	return $this->getTyqData('/activity/getActivityPool', $data);
    }
    /**
     * 获取短期标
     * @return Ambigous <boolean, Ambigous, mixed>
     */
    public function getShortLoans(){
    	$data = array();
    	return $this->getTyqData('/cpas/getShortLoans', $data);
    }
}