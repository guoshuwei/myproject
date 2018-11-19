<?php
/**
 * 投友圈cpas用户check_reg_url时间
 * @author wangwei
 * 2016-11-24
 * UTF-8
 */
class TyLib_Tyqapi_checkreg extends TyLib_Tyqapi_Base{
	
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_checkreg();
        }
        return self::$obj;
    }
	/*
     * 查询cpas用户check_reg_url操作时间
     */
	public function get_check_reg_time($uid,$cid){
		$data = array(
			'uid'    => $uid,
			'cid'    => $cid,
		);
		return $this->getTyqData('/cpas/get_check_reg_time', $data);
	}
	/*
     * 记录cpas用户check_reg_url操作时间
     */
	public function insert_check_reg_time($uid,$check_reg_time,$cid){
		$data = array(
			'uid'    => $uid,
			'check_reg_time'    => $check_reg_time,
			'cid'    => $cid
		);
		return $this->getTyqData('/cpas/insert_check_reg_time', $data);
	}
}