<?php
/**
 * 暂时作废
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-8-24
 * UTF-8
 */
class DB_Adapter_Mysqli extends DB_Abstract implements DB_Interface {
	private $mysqli = null;
	
	function __construct($db_config) {
		$this->_init ($db_config);
	}
	
	/**
	 * 不检测sql注入
	 * (non-PHPdoc)
	 * 
	 * @see DB_Interface::query()
	 */
	function query($sql) {
		$this->_connect ($this->_isReader);
		$res = $this->mysqli->query ( $sql );
		
		$returnArr = array ();
		while ( $row = $res->fetch_assoc () ) {
			$returnArr [] = $row;
		}
		$this->_close ();
		
		//还原
		$this->_isReader = true;
		return $returnArr;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see DB_Interface::insert()
	 */
	function insert($table, $data) {
		$this->_connect(false);
		$sql = "INSERT INTO `{$table}` ";
		if (is_array ( $data )) {
			$data = $this->_escapse_params($data);
			$sql .= $this->_buildInsertStr($data);
		}else{
			$this->_close();
			throw new Exception('Insert data is not an array.');
		}

		$res = $this->mysqli->query($sql);
		
		if($res){
			$res = $this->mysqli->insert_id;
		}else{
			$res = $this->mysqli->affected_rows;
		}
		$this->_close();
		return $res;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see DB_Interface::delete()
	 */
	public function delete($table,$where){
		if(empty($where)){
			throw new Exception('The where param is empty');
		}

		$this->_connect(false);
		$sql = "DELETE FROM `{$table}` ";
		$sqlAppend = $this->_buildWhereStr($where);
		$sql .= 'WHERE '.$sqlAppend;
		$this->mysqli->query($sql);
		$res = $this->mysqli->affected_rows;
		$this->_close();
		return $res;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see DB_Interface::update()
	 */
	public function update($table, $where, $data){
		if(empty($where)||empty($data)){
			return new Exception('The where or data param is empty.');
		}
		$this->_connect(false);
		$sql = "UPDATE `{$table}` SET ";
		$sql .= $this->_buildUpdateStr($data) . ' WHERE ' . $this->_buildWhereStr($where);
		$this->mysqli->query($sql);
		$res = $this->mysqli->affected_rows;
		return $res;
	}
	

	
	/**
	 * (non-PHPdoc)
	 * 
	 * @see DB_Abstarct::_connect()
	 */
	function _connect($isReader = true) {
		$config = $isReader ? $this->_reader : $this->_writer;
		$conn = new mysqli ( $config ['host'], $config ['user'], $config ['password'], $config['database'], $config ['port'] );
		$charset = isset($config['charset']) ? $config['charset'] : 'utf8';
		$conn->set_charset ( $charset );
		if ($conn->connect_errno) {
			throw new Exception ( $conn->connect_errno );
		}
		$this->mysqli = $conn;
	}
	
	/**
	 * (non-PHPdoc)
	 * 
	 * @see DB_Abstarct::_close()
	 */
	function _close() {
		if(!empty($this->mysqli)){
			$this->mysqli->close ();
			$this->mysqli = null;			
		}
	}
	
	
	/**
	 * 组建where串
	 *
	 * @param unknown $where
	 * @return string
	 */
	protected function _buildWhereStr($where) {
		$sql = '';
		if (is_array ( $where )) {
			foreach ( $where as $column => $value ) {
				if (strlen ( $value ) > 0) {
					$whereChar = substr ( $value, 0, 1 );
					if (in_array ( $whereChar, array (
							'<',
							'>',
							'='
					) )) {
						$value = $this->_escapse_params($value,false);
						$sql .= '`' . $column . '`' . $value;
					} else {
						$value = $this->_escapse_params($value);
						$sql .= '`' . $column . '`=' . $value;
					}
				} else {
					$sql .= '`' . $column . '`=' . $value;
				}
				$sql .= ' AND ';
			}
			if (! empty ( $sql )) {
				$sql .= '1=1';
			}
		} else {
			$sql .= ' ' . $where;
		}
		return $sql;
	}
	
	/**
	 * Build insert column and values
	 *
	 * @param unknown $data
	 * @return string
	 */
	protected function _buildInsertStr($data) {
		$columns = array_keys ( $data );
		$values = array_values ( $data );
		$str = '';
		foreach ( $columns as $key => $value ) {
			$columns [$key] = '`' . $value . '`';
		}
		$columns = '(' . implode ( ',', $columns ) . ')';
		$values = '(' . implode ( ',', $values ) . ')';
		$str .= $columns . ' values ' . $values;
		return $str;
	}
	
	/**
	 * Build update column and values string
	 * @param unknown $data
	 * @return string
	 */
	protected function _buildUpdateStr($data){
		$columns = $this->_escapse_params($columns,true);
		$values = $this->_escapse_params($values);
		$str = '';
		foreach ( $data as $column => $value ) {
			$column = $this->_escapse_params($column,false);
			$value = $this->_escapse_params($value);
			$str .= '`' . $column . '`='.$value;
		}
		return $str;
	}
	
	/**
	 * 去掉危险字符
	 * @param unknown $params
	 * @param string $quotes
	 * @return Ambigous <string, number>
	 */
	protected function _escapse_params($params, $quotes = true) {
		if (is_array ( $params )) {
			foreach ( $params as $key => $value ) {
				$params [$key] = $this->_escapse_params ( $value );
			}
		} else if ($params === null) {
			$params = 'NULL';
		} else if (is_bool ( $params )) {
			$params = $params ? 1 : 0;
		} else if (! is_numeric ( $params )) {
			$params = mysql_real_escape_string ( $params );
			if ($quotes) {
				$params = '"' . $params . '"';
			}
		}
		return $params;
	}
	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::getConn()
	 */
	public function getConn($isReader)
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::setData()
	 */
	public function setData($sql, $data)
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::excute()
	 */
	public function excute()
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::beginTransaction()
	 */
	public function beginTransaction()
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::commit()
	 */
	public function commit()
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::fetchAll()
	 */
	public function fetchAll()
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::lastInsertId()
	 */
	public function lastInsertId()
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::affectedCount()
	 */
	public function affectedCount()
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::fetchOne()
	 */
	public function fetchOne()
	{
		// TODO Auto-generated method stub
		
	}

	/**
	 * {@inheritDoc}
	 * @see TyDB_Interface::fetchColumn()
	 */
	public function fetchColumn($column_num)
	{
		// TODO Auto-generated method stub
		
	}

}