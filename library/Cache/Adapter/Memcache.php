<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-23
 * UTF-8
 */
class Cache_Adapter_Memcache extends Cache_Abstract implements Cache_Interface {
	private $mem = null;
	
	function __construct($cache_config) {
		$this->mem = new Memcache ();
		foreach ( $cache_config as $config ) {
			$this->mem->addserver ( $config ['host'], $config ['port'],false, $config ['weight'] );
		}
		
	}
	
	/**
	 * (non-PHPdoc)
	 * @see TyCache_Interface::set()
	 */
	public function set($key, $value, $expire=600) {
		$obj = serialize($value);
		$result = $this->mem->replace ( $key, $obj, false, $expire );
		
		if (! $result) {
			$result = $this->mem->set ( $key, $obj, false, $expire );
			
		}
		return $result;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see TyCache_Interface::get()
	 */
	public function get($key) {
		$result = $this->mem->get($key);
		if(!empty($result)){
			$result = unserialize($result);
		}
		return $result;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see TyCache_Interface::delete()
	 */
	public function delete($key){
		$result = $this->mem->delete($key);
		return $result;
	}
}