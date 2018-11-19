<?php
namespace Admin\Controller;
use Think\Controller;
// 本类由系统自动生成，仅供测试用途
class LoginController extends Controller{
    public function __construct()
    {
        parent::__construct();
        // var_dump($_SESSION);die;
        if($_SESSION['user']){
            Vendor('Yar.Client');
            $yar_client = new \Client('http://192.168.186.143/acl/api/acl.php');
            $acl = $yar_client->execute('getRoleIdByUid',$_SESSION['user']);
            if(empty($acl) || $acl['role_id'] !=2 ){
                //还不是商户，跳转商户信息审核页面
                $this->redirect('Merchant/shenhe');
                exit;
            }
            //查处用户组信息
            // $roleID =   
        }else{
          $_SESSION = array();
        }
    }
    public function login(){
      $this->display('Login/login');
    }
    public function ajaxdologin()
    {  
       $emplid = I('post.emplid');
       $password = I('post.password');
       //超管限制
       $empl = M('t_emplid_manager_dd');
       // var_dump($empl);die;
       $re = $empl->where("emplid='$emplid' and password='$password'")->find();
       //记录登陆日志

       $data = array();
       $data['last_login_time'] = time();
       if($re){
          $up_login_time_re = $empl->where("emplid='$emplid'")->save($data);
       }
       if($up_login_time_re){ 
        session_start();
        $_SESSION['emplid'] = $emplid;
        echo 1;
       }else{
        echo 0;
       }
    }
    public function outlogin()
    {
        $_SESSION = array();
        session_destroy();
        $this->display('login');
    }
}