<?php
/**
 * 投友圈 cpas 接口
 * 适用于 /cpas/xxxxx
 * 2017年 12月 26日 重新整理
 */
class TyLib_Tyqapi_cpas extends TyLib_Tyqapi_Base {
	private static $obj = null;
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new TyLib_Tyqapi_cpas ();
		}
		return self::$obj;
	}
	
	/**
	 * 获取平台策略
	 */
	public function getPlatformStrategy($pid) {
		$data = array (
				'pid' => $pid
		);
		$memkey = 'TyLib_Tyqapi_cpas_getPlatformStrategy_' . $pid;
		$res = TyFunc_Cachefunc::getInstance ()->get ( $memkey );
		if (! empty ( $res )) {
			return $res;
		}
		$res = $this->getTyqData ( '/cpas/getPlatformStrategy', $data );
		TyFunc_Cachefunc::getInstance ()->set ( $memkey, $res, 600 );
		return $res;
	}
}