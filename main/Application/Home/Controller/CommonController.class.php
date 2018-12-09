<?php
namespace Home\Controller;
use Think\Controller;
// 本类由系统自动生成，仅供测试用途
class CommonController extends Controller {
    private static $hasVisitedCount=0;
    //首页列表
    public function __construct()
    {

        parent::__construct();
        header("Content-Type: text/html; charset=utf-8");//设置编码  
        //处理404不存在页面
        // self::_count('IP');
        //登录判断
        if(isset($_SESSION['user'])){
            $muser =M('t_user_dd');
            $user_res = $muser->where('id='.$_SESSION['user'])->find(); 
            $this->assign('logining_user_name',$user_res['username']);
        }
        
        // var_dump(phpinfo());
        // Vendor('Yar.Client');
        $this->assign('visited_count',self::$hasVisitedCount);
    }
    //访问 统计
    public static function _count($type)
    {
        // print_r(get_loaded_extensions());die;
        // var_dump(phpinfo());die;
        $mip = M('t_ip_manage_dd');
        if($type == 'IP')
        {
            //得到客户端的ip
            $client_ip = ip2long(get_client_ip());
            //读数据库 ，统计数量
            //现有ip统计
            self::$hasVisitedCount = $mip->count();
            $res = $mip->where('ip='.$client_ip)->find();
            if(!$res){
                $data['ip'] = $client_ip;
                $data['dt'] = time();
                $mip->add($data);
                self::$hasVisitedCount++;
            }else{
                $data['dt'] = time();
                $mip->save($data);
            }
        }
    }
    public function navlist()
    {
        $remod =  M('t_relation_dd');
        $navlist = $remod->where('pid=0 and name<>"二级导航" and name<>"妇幼保健" and name<>"公开" and name<>"就医指南-体检指南" and  show_status = 1 and jump_url is not null and jump_url<>""')->order('vsort asc')->select();
        return $navlist;
    }
    public function getbannerpic()
    {
        $bannermod = M('t_pic_manager_dd');
        $bannerlist = $bannermod->where('mid=5')->select();
        return $bannerlist;
    }
    public function getleftsublist($id)
    {
        $remod = M('t_relation_dd');
        $leftsublist = $remod->where('pid='.$id)->select();
        return $leftsublist;     
    }
}