<?php
namespace Home\Controller;
// 本类由系统自动生成，仅供测试用途
class ContentController extends CommonController {
    public function __construct()
    {

        parent::__construct();
        //获取rpc配置
        $this->data_center_urls = C('API_COMPONENT.data_center');
        // print_r($this->data_center_urls);
    }
	//首页一周排行列表
	public function week()
	{
        $index_weeklist_item = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/index_weeklist_item.json');
        // var_dump($index_weeklist_item);die;
        $index_weeklist_item = json_decode($index_weeklist_item,true);
        $this->assign('content',$index_weeklist_item[$_GET['id']]);
        $this->display('week');
	}

    //首页头条
    public function toutiao(){
        $toutiao_apires = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/items.json');
        $toutiao_apires = json_decode(str_replace("'", "\"", $toutiao_apires),true);
        $this->assign('content',$toutiao_apires[$_GET['id']]);
        $this->display('toutiao');
    }

    //行业观察
    public function hygc(){
        $hygc_apires = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/hygc.json');
        $hygc_apires = json_decode($hygc_apires,true);
        // var_dump($hygc_apires[$_GET['id']]);die;
        $this->assign('content',$hygc_apires[$_GET['id']]);
        $this->display('hygc');
    }
}