<?php
require_once 'core/init.php';
// $userInsert = DB::getInstance()->update('user',3,
// 	array(
// 		'username' => 'ajsz1234',
// 		'password' => 'password1234',
// 		'salt' => 'salt34'
// 	)
// );
if(Session::exists('home')){
	echo "<p>".Session::flash('home')."</p>";
}


// if($user->error()){
// 	'user is not exist';
// }else{
// 	'OK!';
// }
