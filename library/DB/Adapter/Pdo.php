<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-23
 * UTF-8
 */
class DB_Adapter_Pdo extends DB_Abstract implements DB_Interface {
	private $pdo = null;
	private $stmt = null;
	private $prep_sql = array ();
	private $prep_data = array ();
	private static $pdo_arr = array();
	
	
	/**
	 * pdo值类型
	 *
	 * @var Array
	 */
	private $pdo_type = array (
			'integer' => PDO::PARAM_INT,
			'int' => PDO::PARAM_INT,
			'boolean' => PDO::PARAM_BOOL,
			'bool' => PDO::PARAM_BOOL,
			'string' => PDO::PARAM_STR,
			'null' => PDO::PARAM_NULL,
			'object' => PDO::PARAM_LOB,
			'float' => PDO::PARAM_STR,
			'double' => PDO::PARAM_STR 
	);
	function __construct($db_config,$db_tag="") {
		
		$this->_init ( $db_config ,$db_tag);
	}
	
	/**
	 * 获得链接
	 *
	 * @param string $isReader
	 *        	是否使用从库
	 */
	function getConn($isReader = true) {
		$this->pdo = $this->_connect ( $isReader );
		return $this;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::setData()
	 */
	function setData($sql, $data) {
		if (! is_array ( $data )) {
			throw new Exception ( 'The data must be array.' );
		}
		if (!is_string ( $sql )) {
			throw new Exception ( 'The sql must be string.' );
		} 
		$this->prep_sql = $sql;
		$this->prep_data = $data;
		
		return $this;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::excute()
	 */
	function excute() {
		$this->exec ();
		return true;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::beginTransaction()
	 */
	function beginTransaction() {
		//开启事务之前清除参与执行sql
		if (! empty ( $this->prep_sql )) {
			$this->prep_sql = '';
		}
		if (! $this->pdo->inTransaction ()) {
			$this->pdo->beginTransaction ();
		}
		return $this;
	}
	
	/**
	 * (non-PHPdoc)
	 * 
	 * @see TyqDB_Interface::rollback()
	 */
	public function rollback() {
		// TODO Auto-generated method stub
		$res = false;
		
		if ($this->pdo->inTransaction ()) {
			try {
				$res = $this->pdo->rollBack ();
			} catch ( PDOException $e ) {
				$this->_close ();
				TyFunc_Log::write ( 'system_sql', 'transaction', $e->getMessage () );
			}
		}
		$this->_close ();
		return $res;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::commit()
	 */
	function commit() {
		$res = null;
		if ($this->pdo->inTransaction ()) {
			try {
				$res = $this->pdo->commit ();
			} catch ( PDOException $e ) {
				// 出问题回滚 写入日志
				$this->pdo->rollBack ();
				$this->_close ();
				TyFunc_Log::write ( 'system_sql', 'transaction', $e->getMessage () );
				return false;
			}
			$this->_close ();
			return $res;
		} else {
			$this->_close ();
			throw new Exception ( 'There is no active transaction.' );
		}
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::fetchAll()
	 */
	function fetchAll() {
		$this->checkStatus ();
		$this->excute ();
		$res = $this->stmt->fetchAll ( PDO::FETCH_ASSOC );
		$this->_close ();
		return $res;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::fetchColumn()
	 */
	function fetchColumn($column_num) {
		$this->checkStatus ();
		$this->excute ();
		$res = $this->stmt->fetchColumn ( $column_num );
		$this->_close ();
		return $res;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::fetchOne()
	 */
	function fetchOne() {
		$this->checkStatus ();
		$this->excute ();
		$res = $this->stmt->fetch ( PDO::FETCH_ASSOC );
		$this->_close ();
		return $res;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::lastInsertId()
	 */
	function lastInsertId() {
		$this->checkStatus ();
		$this->excute ();
		$res = $this->pdo->lastInsertId ();
		$this->_close ();
		return $res;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Interface::affectedCount()
	 */
	function affectedCount() {
		$this->checkStatus ();
		$this->excute ();
		$res = $this->stmt->rowCount ();
		$this->_close ();
		return $res;
	}
	
	/**
	 * 校验链接
	 *
	 * @throws Exception
	 */
	private function checkStatus() {
		if (empty ( $this->pdo )) {
			throw new Exception ( 'pdo is null.' );
		}
	}
	
	/**
	 * 执行语句
	 * 调整为单条执行，执行完毕后清理 sql
	 * @throws Exception
	 */
	private function exec() {
		// 校验数据是否正确
		if (!is_string ( $this->prep_sql ) || !is_array ( $this->prep_data )) {
			throw new Exception ( 'Type is error.' );
		}
		
		$this->stmt = $this->pdo->prepare ( $this->prep_sql, array (
				PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY 
		) );
		$data_keys = array_keys ( $this->prep_data );
		$data_values = array_values ( $this->prep_data );
		for($j = 0; $j < count ( $this->prep_data ); $j ++) {
			$type = $this->pdo_type [gettype ( $data_values [$j] )];
			if ($type == PDO::PARAM_INT) {
				$data_values [$j] = intval ( $data_values [$j] );
			}
			$this->stmt->bindParam ( $data_keys [$j], $data_values [$j], $type );
		}
		
		$this->stmt->execute ();
		$this->prep_sql = '';
		$this->prep_data = array();
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Abstract::_connect()
	 */
	protected function _connect($isReader = true) {
		$config = $isReader ? $this->_reader : $this->_writer;
		try {
			$hash = md5($config ['host'].$config['database'].$config['port'].$config ['user']);
			if(!isset(self::$pdo_arr[$hash]) || !$this->pdo_ping(self::$pdo_arr[$hash])){
				$pdo = new PDO ( "mysql:host={$config ['host']};dbname={$config['database']};port={$config['port']};charset={$config['charset']}", $config ['user'], $config ['password'], array (
						PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
						PDO::ATTR_TIMEOUT => 2 
				) );
				self::$pdo_arr[$hash] = $pdo;
			}
		} catch ( PDOException $e ) {
			$msg = $e->getMessage ();
			TyFunc_Log::write ( 'system_sql', 'connect', $msg );
		}
		return self::$pdo_arr[$hash];
	}
	
	/**
	 * 检查连接是否可用
	 * @param  Link $dbconn 数据库连接
	 * @return Boolean
	 */
	function pdo_ping($dbconn){
	    try{
	        $dbconn->getAttribute(PDO::ATTR_SERVER_INFO);
	    } catch (PDOException $e) {
	        if(strpos($e->getMessage(), 'MySQL server has gone away')!==false){
	            return false;
	        }
	    }
	    return true;
	}
	
	/**
	 * (non-PHPdoc)
	 *
	 * @see TyDB_Abstract::_close()
	 */
	protected function _close() {
		if (! empty ( $this->pdo ) && ! ($this->pdo->inTransaction ())) {
			$this->stmt = null;
			//$this->pdo = null;
			$this->prep_sql ='';
			$this->prep_data = array ();
		}
	}
}