<?php
namespace Admin\Controller;

// 本类由系统自动生成，仅供测试用途
class IndexController extends CommonController{
    public function index(){
        // var_dump(phpinfo());die;
        //用一下yar扩展
        // $yar_client = new TyLib_Yar('http://rpc.p2peye.com/cpas/loan.php');
        // $loan = $yar_client->execute('getLoanById',array($tyLoanId));
        // Vendor('Log.Log');
        // $log = new \Log();
        // $log::write('test','111','111');
        // var_dump($log,111);die;
        // $yar_client = new \Client('http://192.168.186.143/acl/api/acl.php');
        // $acl = $yar_client->execute('get',array(1));
        // var_dump($acl);die;
		$this->display('Index/index');
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