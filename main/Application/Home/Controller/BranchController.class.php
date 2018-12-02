<?php
namespace Home\Controller;
// 本类由系统自动生成，仅供测试用途
class BranchController extends CommonController {
    public function __construct()
    {

        parent::__construct();
        
        //获取rpc配置
        // $this->data_center_urls = C('API_COMPONENT.data_center');
        // print_r($this->data_center_urls);
    }

    public function list(){
        // var_dump($_SERVER);die;
        $archeve = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/archeve.json');
        $archeve_info = json_decode($archeve,true);
        $this->assign('archeve_info',$archeve_info[0]); 
        $this->display('list');
    }

	
}