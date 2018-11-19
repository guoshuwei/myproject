<?php
namespace Admin\Controller;
// 本类由系统自动生成，仅供测试用途
class GNJSController extends CommonController{
    public function index(){
        // $gnjsm = M('');
		$this->display('GNJS/index');
    }
    public function category()
    {
    	$this->display('Index/category');
    }
    public function category_list()
    {
    	$this->display('Index/category_list');
    }
    public function personal()
    {
       $emp = M('t_emplid_manager_dd');
       $empinfo = $emp->where('emplid = '.$_SESSION['emplid'])->find();
       $this->assign('empinfo',$empinfo);
       $this->display('Index/personal'); 
    }
    public function personal_edit()
    {
         $emp = M('t_emplid_manager_dd');
         $data['name'] = I('post.name');
         $data['name'] = I('post.name');
    }
}