<?php
/**
 * @author znz
 * email:zhangnengzhi@p2peye.com
 * 2015-7-20
 * UTF-8
 */
class IndexController extends Controller_Base {

	// 验证用户是否登录
	public function init() {
		parent::init ();
		//没有登录挑转登录
		if(!isset($this->_user['id'])){
			header('Location:/myproject/user/login.php');
			exit();
		}
		//没有完成商户审核，不能进行其他审核
		$is_shenhe = 0;
		$entrant_validate_array = array(
			'Index::alliance',//广告联盟
		);
		if(!$is_shenhe && in_array($this->controllerAction, $entrant_validate_array)){
			$this->redirect('/myproject/business/guide_shenhe.html');
			exit();
		}
		// var_dump($this->controllerAction );die;
		// var_dump($_SERVER);
	}

	// 平台首页
	public function indexAction() {
		// SmartyAdapter::display();
	}
	public function homeAction(){
		$shenhe_info = array();
		//获取商户审核信息
		if(isset($this->_user['id']) && $this->_user['id']){
			$shenhe_info = Module_Merchant_Shenhe::getInstance()->selectByUid($this->_user['id']);		
		}
		// var_dump($this->_user['username']);die;
		SmartyAdapter::assign('shenhe_info',$shenhe_info);
	}

	/*
	引导审核页
	 */
	public function guide_shenheAction(){
		
	}

	public function shenheAction(){
		// var_dump($this->_user);die;
		//获取地址组件
        $current_domain = 'http://'.$_SERVER['HTTP_HOST'];
        $yar_client = new Lib_Yar($current_domain.'/myproject/discuz/api/nonglian/server.php');
        $space = array();
        $api_res = $yar_client->execute('getResidecityComponent',$space);
        $api_res['data']['residecity_component'] = str_replace(array("ps"),array("select"),$api_res['data']['residecity_component']);
        // var_dump($api_res['data']['residecity_component']);die;
        SmartyAdapter::assign('residecity_component',$api_res['data']['residecity_component']);
	}

	public function shenheListAction(){
		if($_POST){
			$_POST['business_license'] = isset($_POST['data']['ptimg123']) ? json_encode($_POST['data']['ptimg123']) : '';
			$data = array(
				'name' => $_POST['name'],
				'uid' => $this->_user['id'],
				'business_type' => $_POST['business_type'],
				'business_license' => $_POST['business_license'],
				'authorization_letter' => '',
				'description' => $_POST['description'],
				'address' => $_POST["resideprovince"] . '-' . $_POST["residecity"] . '-' . $_POST["residedist"] . '-' . $_POST['residecommunity'],
			);
			$res = Module_Merchant_Shenhe::getInstance()->insert($data);
			//创建一条审核记录
			if($res){
				
			}
			
			if($res){
				Lib_Function::getInstance()->returnJson('200',array(''));
			}
		}
		// var_dump($_POST);die;

	}

    //广告模块
	public function guanggaoAction(){
		if($_POST){
			var_dump($_POST);die;
		}
	}

	//招商联盟
	public function allianceAction(){		
		// var_dump(SmartyAdapter::$templateName);die;
		// SmartyAdapter::$templateName = '/index/zhaoshang';
		// SmartyAdapter::display();
  //       exit();
	}

	//模板导入
	public function templateAction(){
		
	}


	public function itemAddAction(){

	}

	public function ajaxGetDistrictAction(){
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
            'showdefault' => isset($_POST['showdefault']) ? $_POST['showdefault'] : '',
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
        $current_domain = 'http://'.$_SERVER['HTTP_HOST'];
        $yar_client = new Lib_Yar($current_domain.'/myproject/discuz/api/nonglian/server.php');
        $api_res = $yar_client->execute('ajaxMisDistrict',$apidata);
        $api_res['data']['district'] = str_replace(array("ps"),array("select-box"),$api_res['data']['district']);
        echo json_encode($api_res);
        exit();
    }
}