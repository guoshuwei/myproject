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
	public function getbannerpic()
	{
		$bannermod = M('t_pic_manager_dd');
        $bannerlist = $bannermod->where('mid=6')->order('vsort desc')->select();
        return $bannerlist;
	}
    public function getleftsublist($id)
    {
        $leftsublist = $this->seperate_TC_fun($id);
        return $leftsublist;     
    }
    //分离内容和标题
    public function seperate_TC_fun($id)
    {
       
        $tcnon = array();
        $remod = M('t_relation_dd');
        $zjm = M('t_zj_dd');
        $reinfo = $remod->where('pid ='.$id.' and show_status=1')->order('vsort asc')->select();//左侧列表按照自定义排序值排
        foreach($reinfo as $key=>$value)
        {
            $tcnon[$value['id']]['id'] = $value['id'];
            $tcnon[$value['id']]['index'] = $key;
            $tcnon[$value['id']]['name'] = $value['name'];
            $tcnon[$value['id']]['jump_url'] = $value['jump_url'];
            $zjinfo = $zjm->where('pid ='.$value['id'].' and pubstatus=1 and showstatus=1')->order('updatetime desc')->select();//右侧子列表按照添加时间排
            foreach($zjinfo as $zkey=>$zvalue){
                $tcnon[$value['id']]['sub']['title'][] = $zvalue['title'];
                $tcnon[$value['id']]['sub']['dt'][] = $zvalue['dt'];
                $tcnon[$value['id']]['sub']['content'][] = $zvalue['content'];
                $tcnon[$value['id']]['sub']['id'][] = $zvalue['id'];
                $tcnon[$value['id']]['sub']['jump_url'][] = $zvalue['jump_url'];
                $tcnon[$value['id']]['sub']['updatetime'][] = $zvalue['updatetime'];
                $tcnon[$value['id']]['sub']['picture_uplist'][] = @$zvalue['picture_uplist'];
                $tcnon[$value['id']]['sub']['picture_updata'][] = @$zvalue['picture_updata'];
            }

        }
        return $tcnon;
    }

    //分类名 ，查询参数 根据排序查询
    public function getListByName($name,$vsort,$limit,$sep)
    {
        $rem = M('t_relation_dd');
        if(isset($sep))
        {
            $M= M();
            $narr = explode('-',$name);
            if(!isset($vsort))
            {
                $vsort = 0;
            }
            //查询本院动态下的最新信息
            $result = M()->table('t_relation_dd'.' trd')->join('t_zj_dd'.' tzd on trd.id=tzd.pid','LEFT')->where("trd.name ='{$narr[1]}' and trd.show_status=1 and tzd.pubstatus=1 and tzd.showstatus=1")->order('tzd.updatetime desc')->limit($limit)->field('trd.pid as tpid,tzd.*')->select();
            // var_dump($result);
            $currnameinfo = $result;
            return $currnameinfo;

        }
        $re = $rem->where("name='{$name}'")->select();//id96
        $zjm = M('t_zj_dd');
        if(empty($vsort))
        {
            if($name == '人员介绍'){
                $currnameinfo = $zjm->where('pid='.$re[0]['id'].' and pubstatus=1')->order('vsort asc')->limit($limit)->select();
            }else{
                $currnameinfo = $zjm->where('pid='.$re[0]['id'].' and pubstatus=1')->order('updatetime desc')->limit($limit)->select();
            }
        }else{
            if($vsort == 1)
            {
                $currnameinfo = $zjm->where("pid ={$re[0]['id']} and vsort={$vsort}")->select();
                $p = array('tpid' => $re[0]['pid']);
                $currnameinfo = array_merge($currnameinfo,$p);
            }else{
                $currnameinfo = $zjm->where("pid ={$re[0]['id']} and vsort".$vsort)->limit($limit)->select();
                $p = array('tpid' => $re[0]['pid']);
                $currnameinfo = array_merge($currnameinfo,$p);
            }
        }   
        return $currnameinfo; 
    }
    public function getSublistByName($name,$limit)
    {
        $rem = M('t_relation_dd');//分类表
        $pinfo = $rem->where("name='{$name}'")->select();
        if(empty($pinfo)) return array();
        $sublist = $rem->where("pid=".$pinfo[0]['id']." and show_status = 1")->order('vsort asc')->limit($limit)->select();
        return $sublist;
    }
    public function getSpecialListByName($name)
    {
        $rem = M('t_relation_dd');
        $re = $rem->where("name='{$name}'")->select();//id96
        $zjm = M('t_zj_dd');
        $specialinfo = $zjm->where("pid ={$re[0]['id']}")->order('vsort asc')->select();
        $specialinfo = $this->sepimgfromstr($specialinfo);
        return  $specialinfo;
    }
    // 提取图片
    private function sepimgfromstr($info)
    {
    	$patten ='/<\s*img\s+[^>]*?src\s*=\s*(\'|\")(.*?)\\1[^>]*?\/?\s*>/i'; 
    	$speciallist =array();
    	foreach($info as $k=>$content)
    	{
    		// var_dump($content['id']);
    		preg_match($patten,stripslashes($content['content']),$match);
    		$speciallist[$k]['img'] = $match[0];
    		$speciallist[$k]['id'] = $content['id'];
    		$speciallist[$k]['keywords'] = $content['keywords'];
    	}
    	return $speciallist;
    }
    //查询左侧分类的内容
    public function getLeftContent($ids = array())
    {

    }
    public function index(){
        //查询本院动态
        $this->assign('second_navitem',$this->getSublistByName('二级导航',''));
        $this->assign('aditem',$this->getListByName('Linux-最新公告','','',true));//
        $this->assign('activeitem',$this->getListByName('Linux-最新信息','',5,true));//查询本院动态下的最新信息，显示最新的4条
        // $this->assign('serviceitem',$this->getSublistByName('特色服务',5));
        // $this->assign('affairpublic',$this->getSublistByName('院务公开',5));//院务公开
        // $this->assign('poypublic',$this->getListByName('公开-党务公开','',5,ture));
        // $this->assign('lzestablish',$this->getListByName('公开-廉政建设','',5,ture));
        // $this->assign('fybjinfo',$this->getSublistByName('妇幼保健'));
        // $this->assign('specialistintro',$this->getListByName('人员介绍','>1','4'));
        // //首页指定专家显示  
        // $this->assign('specialists',$this->getSpecialListByName('人员介绍'));
        // $this->assign('specialistintro_1',$this->getListByName('人员介绍','1','1'));//查询排序为1的记录
        //查处所有的父级分类
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