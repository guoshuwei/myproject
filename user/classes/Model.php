<?php
//数据业务层通用类
class Model{
	private $_db,
			$_table;		

	public function __construct($table = null){
		$this->_db = DB::getInstance();
		$this->_table = $table;
	}

	public function create($fields = array()){
		if(!$this->_db->insert($this->_table,$fields)){
			throw new Exception('there was a problem creating an account!');
		}
	}
	public function find($user = null){
		if($user){
			$field = (is_numeric($user)) ? 'mobile' : 'username';
			$data =$this->_db->get($this->table,array($field, '=' ,$user));
			if($data->count()){
				$this->_data = $data->first();
				return true;
			}
		}
		return false;
	}

	
	public function data(){
		return $this->_data;
	}

	// 获取一条信息
	public function get_one($where){
		$res = $this->_db->get($this->_table, $where);
		if ($res->count()) {
			return $res->first();
		}
		return false;
	}

	// 插入一条信息
	public function insert($data){
		$res = $this->_db->insert($this->_table, $data);
		return $res;
	}

	// 更新一条信息
	public function update($data, $id){
		$res = $this->_db->update($this->_table, $id, $data);
		return $res;
	}
}