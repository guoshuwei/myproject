<?php
// 本类由系统自动生成，仅供测试用途
namespace Admin\Controller;
use Think\Controller;
class CFController extends Controller {
    public function __construct()
    {
        parent::__construct();
    }
    public function setConfig()
    {
        //后台图片保存路径
        $pic = M('t_pic_dd');
        var_dump($pic);
        $re = $pic->select();
        var_dump($re);

    }
}