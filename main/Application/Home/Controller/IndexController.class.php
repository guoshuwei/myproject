<?php
namespace Home\Controller;
// 本类由系统自动生成，仅供测试用途
class IndexController extends CommonController {
    public function __construct()
    {

        parent::__construct();
        //获取rpc配置
        $this->data_center_urls = C('API_COMPONENT.data_center');
        // print_r($this->data_center_urls);
    }
	//首页列表
	public function navlist()
	{
		$remod =  M('t_relation_dd');
        $navlist = $remod->where('pid=0')->order('vsort asc')->select();
        return $navlist;
	}

    public function getbannerpic()
    {
        $bannermod = M('t_pic_manager_dd');
        $bannerlist = $bannermod->where('mid=6')->order('vsort desc')->select();
        return $bannerlist;
    }

    public function index(){
        //导航内容
        $this->assign('navlist',$this->navlist());
        $this->assign('bannerlist',$this->getbannerpic());
        //一周内排行聚合的数据:
        $index_weeklist_item = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/index_weeklist_item.json');
        $index_weeklist_item = json_decode($index_weeklist_item,true);
        //首页头条板块。
        //rpc请求数据中心    
        $toutiao_apidata = array(
            'mod' => 1,
            'id' => 2,
        );
        // $yar_client_toutiao = new \Client($this->data_center_urls['toutiao']);
        // $toutiao_apires = $yar_client_toutiao->execute('getLatestNewsByMod',$toutiao_apidata);
        $toutiao_apires = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/items.json');
        $toutiao_apires = json_decode(str_replace("'", "\"", $toutiao_apires),true);
        // var_dump($toutiao_apires);die;
        //首页行业观察板块。
        // $hygc_apidata = array(
        //     'mod' => 1,
        //     'id' => 2,
        // );
        // $hygc_apires = $yar_client_toutiao->execute('getLatestHYGC',$hygc_apidata);
        $hygc_apires = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/hygc.json');
        $hygc_apires = array_slice(json_decode($hygc_apires,true),0,4);
        $yumi_index_item = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/yumi_index_item.json');
        $yumi_index_item = json_decode($yumi_index_item,true);

        $dami_index_item = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/dami_price_item.json');
        $dami_index_item = json_decode($dami_index_item,true);

        $zhu_index_item = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/myproject/data_center/template/zhu_price_item.json');
        $zhu_index_item = json_decode($zhu_index_item,true);
        // var_dump($dami_index_item);die;
        // var_dump($index_weeklist_item);die;
        $this->assign('index_weeklist_item',$index_weeklist_item);
        $this->assign('zhu_index_item',$zhu_index_item);
        $this->assign('dami_index_item',$dami_index_item);
        $this->assign('yumi_index_item',$yumi_index_item);
        $this->assign('hygclist',$hygc_apires);   
        $this->assign('toutiaolist',$toutiao_apires);     
		$this->display('index');
    }
    public function about()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
    	$this->assign('navlist',$this->navlist());
    	$this->display('about');
    }
    public function pub()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
        $this->assign('navlist',$this->navlist());
        $this->display('pub');
    }
    public function active()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
    	$this->assign('navlist',$this->navlist());
    	$this->display('active');
    }
    public function culture()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
     	$this->assign('navlist',$this->navlist());
    	$this->display('culture');
    }
    public function ksintro()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
    	$this->assign('navlist',$this->navlist());
        //查询
        
    	$this->display('ksintro');
    }
    public function service()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
    	$this->assign('navlist',$this->navlist());
    	$this->display('service');
    }
    public function prointro()
    {
        $id = I('get.id');
        $this->assign('perintro',$this->getListByName('人员介绍'));//查处人员介绍信息
    	$this->assign('navlist',$this->navlist());
    	$this->display('prointro');
    }
    public function pre_marital()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
    	$this->assign('navlist',$this->navlist());
    	$this->display('pre_marital');
    }
    public function disabled_child()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
    	$this->assign('navlist',$this->navlist());
    	$this->display('disabled_child');
    }
    public function guide()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
    	$this->assign('navlist',$this->navlist());
    	$this->display('guide');
    }
    //就医指南-体检指南
    public function phy_examination()
    {
        $leftsublist = $this->getSublistByName('就医指南-体检指南');
        // var_dump($leftsublist);die;
        $this->assign('leftsublist',$this->getleftsublist($leftsublist[0]['pid']));
        $this->assign('navlist',$this->navlist());
        $this->display('phy_examination');
    }
    public function mc_care()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
        $this->assign('navlist',$this->navlist());
        $this->display('mc_care');
    }
    //院务公开
    public function publist()
    {
        $id = I('get.id');
        $this->assign('leftsublist',$this->getleftsublist($id));
        $this->assign('navlist',$this->navlist());
        $this->display('publist');
    }
    //院务公开
    public function ywpub()
    {
        $id = I('get.id');//92-93
        $this->assign('leftsublist',$this->getleftsublist($id));
        $this->assign('navlist',$this->navlist());
        $this->display('ywpub');
    }
    //党务公开
    public function dwpub()
    {
        $id = I('get.sid');
        $this->assign('leftsublist',$this->getListByName('党务公开'));
        $this->assign('navlist',$this->navlist());
        $this->display('dwpub');
    }
    public function lzjs()
    {
        $id = I('get.sid');
        $this->assign('leftsublist',$this->getListByName('廉政建设'));
        $this->assign('navlist',$this->navlist());
        $this->display('lzjs');
    }
}