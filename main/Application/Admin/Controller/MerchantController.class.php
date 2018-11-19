<?php
namespace Admin\Controller;
use Think\Controller;
// 本类由系统自动生成，仅供测试用途
class MerchantController extends Controller{
    public function __construct()
    {
        //todo tp 不知道为啥屏蔽了php的系统错误日志
        parent::__construct();
    }
    public function shenhe(){
        $this->display('Merchant/shenhe');
    }

    public function step1(){
        //获取地址组件
        Vendor('Yar.Client');
        $current_domain = 'http://'.$_SERVER['HTTP_HOST'];
        $yar_client = new \Client($current_domain.'/discuz/api/nonglian/server.php');
        $space = array();
        $api_res = $yar_client->execute('getResidecityComponent',$space);
        // var_dump($api_data['data']['residecity_component']);die;
        $api_res['data']['residecity_component'] = str_replace(array("ps"),array("select"),$api_res['data']['residecity_component']);
        $this->assign('residecity_component',$api_res['data']['residecity_component']);

        // // $yar_client = 
        $this->display('Merchant/step1');
    }

    public function ajaxGetDistrict(){
        $apidata ['reside'] = array(//居住地组件
            'uid' => 2,//用户id
            'mod' => 'msic',
            'ac'=>'ajax',
            'op' =>'district',
            'container' => $_POST['container'],
            'containertype' => $_POST['containertype'],
            'province' => $_POST['province'],
            'city' => $_POST['city'],
            'district' => $_POST['district'],
            'community' => $_POST['community'],
            'pid' => $_POST['pid'],
            'cid' => $_POST['cid'],
            'did' => $_POST['did'],
            'coid' => $_POST['coid'],
            'level' => $_POST['level'],
            'handlekey' => $_POST['handlekey'],
            'showdefault' => $_POST['showdefault'],
        );
        $apidata ['user'] = array(
            'uid' => 2,
            'member' => array(
                'resideprovince' => '',
                'residecity' => '',
                'residedist' => '',
                'residecommunity' => '',
            ),//用户组信息
        );
        Vendor('Yar.Client');
        $current_domain = 'http://'.$_SERVER['HTTP_HOST'];
        $yar_client = new \Client($current_domain.'/discuz/api/nonglian/server.php');
        $api_res = $yar_client->execute('ajaxMisDistrict',$apidata);
        $api_res['data']['district'] = str_replace(array("ps"),array("select-box"),$api_res['data']['district']);
        echo json_encode($api_res);

    }

    public function index(){
       $this->display('Merchant/index');
    }
}