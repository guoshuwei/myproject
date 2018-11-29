<?php
require_once 'core/init.php';

if(Session::exists('home')){
	echo "<p>".Session::flash('home')."</p>";
}
$islogin = Session::get(Config::get('session/session_name'));
if ($islogin) {
	$user 		= new User();
	$userinfo 	= $user->findbyfield('id',$_SESSION['user']);

	$user_detail= new Model('t_user_details_dd');
	$user_det 	= $user_detail->get_one(['uid','=',$_SESSION['user']]);

	if(Input::exists()){
		// if(Token::check(Input::get('token'))){
			$validate 	= new Validate();
			$validation = $validate->check($_POST,array(
					'email' 		=> array('reg' => "/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/"),
					'wechat' 		=> array('max' => 100),
					'telephone' 	=> array('max' => 20),
					'qq' 			=> array('max' => 15),
					'company' 		=> array('max' => 255),
					'occupation' 	=> array('max' => 255),
					'position' 		=> array('max' => 255),
					'revenue' 		=> array('max' => 20),
				));
			if (empty($validation->errors())) {
				$data = array(
						'email' 	=> Input::get('email'),
						'wechat' 	=> Input::get('wechat'),
						'telephone' => Input::get('telephone'),
						'qq' 		=> Input::get('qq'),
						'company' 	=> Input::get('company'),
						'occupation'=> Input::get('occupation'),
						'position' 	=> Input::get('position'),
						'revenue' 	=> Input::get('revenue'),
					);
				if (!empty($user_det)) {
					// 更新
					$data['updated_at'] = date('Y-m-d H:i:s');
					$res = $user_detail->update($data, $user_det->id);
					$res ? Lib_Function::getInstance()->returnJson('200', array(), '保存成功') : Lib_Function::getInstance()->returnJson('400', array(), '保存失败');
				} else {
					// 插入
					$data['uid'] 		= $_SESSION['user'];
					$data['created_at'] = date('Y-m-d H:i:s');
					$res = $user_detail->insert($data);
					$res ? Lib_Function::getInstance()->returnJson('200', array(), '保存成功') : Lib_Function::getInstance()->returnJson('400', array(), '保存失败');
				}
			} else {
				// var_dump($validation->errors()); die;
				Lib_Function::getInstance()->returnJson('400', array(), '信息有误');
			}
		// }
	}

	$smarty->assign("username", $userinfo['username']);
	$smarty->assign("user_det", json_decode(json_encode($user_det), true));
	$smarty->display('profile.tpl');
} else {
	$smarty->display('404.tpl');
}

// var_dump($user_det);



//discuz 用户信息拉取
//获取省份组件
// $apidata = array();
// $res = Lib_DiscuzApi::getInstance ()->getProfileInfo ( $apidata );
// var_dump($res);die;
// $res['data']['residecity'] = $res['data']['htmls']['residecity'];//省份组件

// var_dump(222);die;


// $smarty->assign("birth_component",$res['data']['birth_component']);
// $smarty->assign("residecity_component",$res['data']['residecity_component']);
// $smarty->assign("gender_component",$res['data']['gender_component']);

// var_dump($user->data()->username);
