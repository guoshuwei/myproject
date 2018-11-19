<?php
// print_r($_SERVER);die;
require_once 'core/init.php';
$apidata ['uid'] = 2;
$apidata ['cookie'] = 'cookie';
$api_data = Lib_DiscuzApi::getInstance()->setAvatar($apidata);
$api_data['data'] = "'".implode("','", $api_data['data'])."'";
$smarty->assign("uc_avatarflash", $api_data['data']);
$smarty->display('avatar.tpl');
// var_dump($user->data()->username);