<?php
namespace Home\Controller;
// 本类由系统自动生成，仅供测试用途
class IndexController extends CommonController {
    public function __construct()
    {

        parent::__construct();
    }
	//首页列表
	public function navlist()
	{
		$remod =  M('t_relation_dd');
        $navlist = $remod->where('pid=0')->order('vsort asc')->select();
        return $navlist;
	}
    public function index(){
        //导航内容
        $this->assign('navlist',$this->navlist());
        $this->assign('bannerlist',$this->getbannerpic());
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