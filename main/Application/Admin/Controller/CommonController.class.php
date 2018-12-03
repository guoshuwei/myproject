<?php
namespace Admin\Controller;
use Think\Controller;
// 公共类
class CommonController extends Controller {

    public function __construct()
    {
        parent::__construct();
        // if(!$_SESSION['emplid']){
        //      $this->tip('nologin');
        //      die;
        // }
       
    }
    // function _initialize()
    // {
    //     //用户权限检查
    //     if(C('USER_AUTH_ON') && in_array(MODULE_NAME,explode(',',C('NOT_AUTH_MODULE'))))
    //     {
    //         //如果需要验证
    //         if(!\Org\Util\Rbac::AccessDecision ())
    //     }
    // }
    public function login(){
        $um = M('t_user_dd');
        $data['username'] = $_POST['username'];
        $data['password'] = $_POST['password'];
        $um->add($data);
    }
    public function tip($type)
    {
        // switch ($type) {
        //     case 'nologin':
        //         $this->assign('msg','请先登录');
        //         $this->display('Login/tip');
        //         break;
        //     default:
        //         break;
        // }
    }
}