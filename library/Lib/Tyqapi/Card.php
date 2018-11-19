<?php
/**
 * 直投卡券类
 * @author yx
 * 2018年 02月 01日
 */
class TyLib_Tyqapi_Card extends TyLib_Tyqapi_Base {
	private static $obj = null;
	private $_userKey = '';
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new self ();
		}
		return self::$obj;
	}
	
	/**
	 * 新手任务卡券
	 */
	public function newcomerTaskCard($userkey, $activity) {
		$data = array (
				'userkey' => $userkey,
				'activity' => $activity
		);
		return $this->getTyqData ( '/card/newcomerTaskCard', $data );
	}
}