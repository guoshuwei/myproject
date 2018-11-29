<?php
namespace Home\Controller;
// 本类由系统自动生成，仅供测试用途
class ZhaoshangController extends CommonController {
    public function __construct()
    {

        parent::__construct();
        
        //获取rpc配置
        // $this->data_center_urls = C('API_COMPONENT.data_center');
        // print_r($this->data_center_urls);
    }

    public function list(){
        $this->display('list');
    }

	
}