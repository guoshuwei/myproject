<?php
/**
 * 理财H5
 * @author yx
 * UTF-8
 */
class TyLib_Tyqapi_licaiH5 extends TyLib_Tyqapi_Base {
	private static $obj = null;
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new TyLib_Tyqapi_licaiH5 ();
		}
		return self::$obj;
	}
	
	/**
	 * 我的绑定平台列表
	 */
	public function getInfo($userkey) {
		$data = array (
				'userkey' => $userkey 
		);
		return $this->getTyqData ( '/member/getInfo', $data );
	}
	
	/**
	 * 我的绑定平台列表
	 */
	public function getCpasinviteCashMoreThanTen($userkey) {
		$data = array (
				'userkey' => $userkey 
		);
		return $this->getTyqData ( '/member/getCpasinviteCashMoreThanTen', $data );
	}
}