<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-8-24
 * UTF-8
 */
abstract class DB_Abstract{
	protected $_writer;
	protected $_reader;
	protected $_isReader = true;
	private static $_reader_dbs = array();
	
	/**
	 * 初始化数据库
	 *
	 * @throws Exception
	 */
	protected function _init($db_config,$db_tags='') {
		if (empty ( $db_config ['writer'] )) {
			throw new Exception ( 'Can not found the database writer config.' );
		}
		if (empty ( $db_config ['reader'] ) || ! is_array ( $db_config ['reader'] )) {
			throw new Exception ( 'Can not found the database reader config.' );
		}
		$this->_writer = $db_config ['writer'];
		$this->_reader = $db_config ['reader'];
		//todo 后面是之前的代码，暂时理解不了，有报错，以后看
		// if(!empty($db_tags) && isset(self::$_reader_dbs[$db_tags])){
		// 	$this->_reader = self::$_reader_dbs[$db_tags];
		// }else{
		// 	$readerIndex = rand ( 0, count ( $db_config ['reader'] ) - 1 );
		// 	$this->_reader = $db_config ['reader'] [$readerIndex];
		// 	self::$_reader_dbs[$db_tags] = $db_config ['reader'] [$readerIndex];
		// }
	}
	
	/**
	 * 连接
	 */
	abstract protected function _connect($isReader = true);
	
	/**
	 * 断开连接
	 */
	abstract protected function _close();
}