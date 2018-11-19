<?php
/**
 * 理财师
 * @author yx
 * 2018年 01月 18日
 */
class TyLib_Tyqapi_Financial extends TyLib_Tyqapi_Base {
	private static $obj = null;
	private $_userKey = '';
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new self ();
		}
		return self::$obj;
	}
	
	/**
	 * 获取理财师列表
	 */
	public function getFPUsers() {
		$memkey = 'TyLib_Tyqapi_Financial-getFPUsers';
		$res = TyFunc_Cachefunc::getInstance ()->get ( $memkey );
		if (! empty ( $res )) {
			return $res;
		}
		$res = array ();
		$data = array ();
		$res_temp = $this->getTyqData ( '/financial/getFPUsers', $data );
		if ($res_temp ['code'] == 200 && ! empty ( $res_temp ['data'] )) {
			foreach ( $res_temp ['data'] as $row ) {
				$res [] = $row ['fp_key'];
			}
		}
		TyFunc_Cachefunc::getInstance ()->set ( $memkey, $res, 600 );
		return $res;
	}
	
	/**
	 * 获取理财师详情
	 */
	public function getFPByKey($fp_key) {
		$memkey = 'TyLib_Tyqapi_Financial-getFPByKey-' . $fp_key;
		$res = TyFunc_Cachefunc::getInstance ()->get ( $memkey );
		if (! empty ( $res )) {
			return $res;
		}
		$res = array ();
		$data = array (
				'fp_key' => $fp_key
		);
		$res_temp = $this->getTyqData ( '/financial/getFPByKey', $data );
		if ($res_temp ['code'] == 200 && ! empty ( $res_temp ['data'] )) {
			$res = $res_temp ['data'];
		}
		TyFunc_Cachefunc::getInstance ()->set ( $memkey, $res, 600 );
		return $res;
	}
	
	/**
	 * 理财师绑定用户
	 */
	public function addFPBind($fp_key, $reg_mobile, $cuid, $reg_time, $user_source) {
		$tag_name = TyModule_Mis_Regstics::getInstance ()->getUserRegsticsTag ( $cuid );
		$data = array (
				'fp_key' => $fp_key,
				'reg_mobile' => $reg_mobile,
				'cuid' => $cuid,
				'reg_time' => $reg_time,
				'user_source' => $user_source,
				'tag_name' => $tag_name
		);
		$res = $this->getTyqData ( '/financial/addFPBind', $data );
		return $res;
	}
	
	/**
	 * 自动分配理财师绑定用户
	 */
	public function autoAddFPBind($reg_mobile, $cuid, $reg_time, $user_source) {
		$tag_name = TyModule_Mis_Regstics::getInstance ()->getUserRegsticsTag ( $cuid );
		$FPUsers = $this->getFPUsers ();
		$memkey = md5 ( 'TyLib_Tyqapi_Financial-autoAddFPBind' );
		$memRes = TyFunc_Cachefunc::getInstance ()->get ( $memkey );
		if ($memRes === false) {
			$arr_key = 0;
		} else {
			$arr_key = $memRes + 1 == count ( $FPUsers ) ? 0 : $memRes + 1;
		}
		$fp_key = $FPUsers [$arr_key];
		$res = $this->addFPBind ( $fp_key, $reg_mobile, $cuid, $reg_time, $user_source );
		TyFunc_Cachefunc::getInstance ()->set ( $memkey, $arr_key, 86400 );
		return $res;
	}
	
	/**
	 * 获取用户对应的理财师
	 */
	public function getUserFP($cuid) {
		$memKey = md5 ( 'TyLib_Tyqapi_Financial-getUserFP' . $cuid );
		$memRes = TyFunc_Cachefunc::getInstance ()->get ( $memKey );
		if (! empty ( $memRes )) {
			return $memRes;
		}
		$res = array ();
		$data = array (
				'cuid' => $cuid
		);
		$res_temp = $this->getTyqData ( '/financial/getUserFP', $data );
		if ($res_temp ['code'] == 200 && ! empty ( $res_temp ['data'] )) {
			$res = $res_temp ['data'];
		}
		TyFunc_Cachefunc::getInstance ()->set ( $memKey, $res, 600 );
		return $res;
	}
}