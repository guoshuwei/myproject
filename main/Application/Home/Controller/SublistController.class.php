<?php
// 本类由系统自动生成，仅供测试用途
class SublistController extends CommonController{
	//首页列表
    public function __construct()
    {
        parent::__construct();
    }
    public function getrightsublist($id)
    {
        $zjm = M('t_zj_dd');
        $rightsublist = $zjm->where('pid='.$id)->select();
        return $rightsublist;
    }
	public function news()
    {
        $id = I('get.id');
        $this->assign('navlist',$this->navlist());
        $this->assign('rightsublist',$this->getrightsublist($id));
        $this->display('news');
    }
    public function show_content()
    {
        $id = I('get.id');
        $zjm = M('t_zj_dd');
        $contentinfo = $zjm->where('id='.$id)->select();
        $this->assign('navlist',parent::navlist());
        $this->assign('contentinfo',$contentinfo);
        $this->display('show_content');
    }
}