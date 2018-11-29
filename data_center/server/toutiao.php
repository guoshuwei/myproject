<?php
require_once './../../library/bootstrap.php';
//创建数据操作对象
//引入模板

class API {
	// private $dao = null;
	// private $news_table = "news";
	public function __construct(){
		// $this->dao = new Lib_Dao('data_center');
        
	}
	public function getLatestNewsByMod(array $data){
        $data_template = file_get_contents('../Spider/Spider/moa/template/items.json');
        return $data_template;
    }

    public function getLatestHYGC(array $data){
        $data_template = file_get_contents('../Spider/Spider/nongyeguancha/template/hygc.json');
        return $data_template;
    }
    /**
     * 
     */
    public function getNewsByMod_ID(array $data){
        // $sql = 'SELECT * FROM ' . $this->news_table .' WHERE mod_type=:mod_type AND id=:id';
        // $data = array(
        //     ':id' => $data['id'],
        //     ':mod_type' => $data['mod'],
        // );
        // $res = $this->dao->conn(false)->noCache()->preparedSql($sql, $data)->fetchOne();
        // return $res;
    }
    /**
     * [getProductsBranchLists description]
     * @return [type] [description]
     * 获取所有的产品分类
     */
    public function getProductsBranchLists(){
        $sql = 'SELECT * FROM ' . $this->products_branch_table;
        $data = array();
        $res = $this->dao->conn(false)->noCache()->preparedSql($sql, $data)->fetchAll();
        return $res;
    }



    /**
     * [getBidProduct description]
     * @return [type] [description]
     * 获取竞价商品
     */
    public function getBidProduct(){
        $sql = 'SELECT * FROM ' . $this->products_bid_table .' LIMIT 1';
        $data = array();
        $res = $this->dao->conn(false)->noCache()->preparedSql($sql, $data)->fetchOne();
        return $res;
    }
	
}
$service = new Yar_Server(new API());
$service->handle();


