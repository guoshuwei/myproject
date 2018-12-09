<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-22
 * UTF-8
 */
class Model_BaseModel{
	protected $db_adapter = null;
	protected $cache_adapter = null;
	private $tag = '';
	private $key = '';
	protected $dao = null;
	
	protected function _init($db_tag){
		$db_factory = new DB_Factory($db_tag);
		$this->db_adapter = $db_factory->getDBAdapter();
		$cache_factory = new Cache_Factory();
		$this->cache_adapter = $cache_factory->getCacheAdapter();
		$this->dao = new Lib_Dao($db_tag);
	}
	
	protected function setTag($cache_tag){
		$this->tag = $cache_tag;
		return $this;
	}
	
	protected function key($cache_key){
		$this->key = $cache_key;
		return $this;
	}
	
}