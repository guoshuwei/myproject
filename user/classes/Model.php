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
}