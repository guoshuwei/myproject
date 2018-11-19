<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-22
 * UTF-8
 */
class DB_Factory{
	private $adapter = null;
	private $db_config = null;
	private $db_tag = null;
	
	/**
	 * 获得 DBFactory
	 * @param unknown $db_tag
	 * @param string $db_adapter
	 * @throws Exception
	 */
	function __construct($db_tag,$db_adapter='pdo'){
		// $env = getenv('RUNTIME_ENVIROMENT') ? getenv('RUNTIME_ENVIROMENT') : (defined('SHELL_VARIABLE') ? SHELL_VARIABLE : '');
		// $env = empty($env)?'local':$env;
		$env = 'local';
		$config = require(LIBRARY_DIR.'/Conf/db.php');
		if(!isset($config[$env][$db_tag])){
			throw new Exception('can not found the db_config env:'.$env.' db_tag:'.$db_tag);
		}
		$this->db_config = $config[$env][$db_tag];
		$this->adapter = $db_adapter;
		$this->db_tag = $db_tag;
	}
	
	/**
	 * 
	 * @return Ambigous <NULL,TyDB_Abstract,TyDB_Interface>
	 */
	public function getDBAdapter(){
		$adapter = null;
		switch ($this->adapter){
// 			case 'mysqli':
// 				$adapter = new TyDB_Adapter_Mysqli($this->db_config);
// 				break;
			case 'pdo':
				$adapter = new DB_Adapter_Pdo($this->db_config,$this->db_tag);
				break;
			default:
		}
		return $adapter;
	}
}