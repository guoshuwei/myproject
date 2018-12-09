<?php
/**
 * @author znz
 * email:zhangnengzhi@p2peye.com
 * 2015-7-20
 * UTF-8
 */
class AjaxController extends Controller_Base {

	// 验证用户是否登录
	public function init() {
		parent::init ();
		// var_dump($_SERVER);
	}

	// 平台首页上传图片
	public function uploadeimgAction() {
		$data = array();
		$img_url = Lib_Upload::getInstance()->init('business',$_FILES['file'])->uplodfile();
        if($img_url){
        	$data =array(
				'url' =>'/myproject/imgs/nonglian/'.$img_url,
			); 
    	}
		Lib_Function::getInstance()->returnJson('200',$data);
		// SmartyAdapter::display();
	}
	public function homeAction(){
		
	}

}