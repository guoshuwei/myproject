<?php
class Module_Merchant_Shenhe {
	private static $obj = null;	
	/**
	 * 封闭构造
	 */
	private function __construct(){
		$this->shenhe = new Model_Merchant_Shenhe();
	}
	
	/**
	 * 单例获取
	 * 保证一条进程只产生一个Module对象
	 */
	public static function getInstance() {
		if (empty ( self::$obj )) {
			self::$obj = new Module_Merchant_Shenhe();
		}
		return self::$obj;
	}
	
	/**
	 * 插入信息
	 * @return 
	 */
	public function insert($data){
		return $this->shenhe->insert($data);
	}

	public function selectByUid($uid){
		if(intval($uid) < 0) return '';
		return $this->shenhe->selectByUid($uid);
	}
}