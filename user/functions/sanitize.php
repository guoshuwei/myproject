<?php
function escape($string){
	return htmlentities($string,ENT_QUOTES,'UTF-8');
}

// function get_error_messagebycode($code){
// 	if(intval($code)) return '';
// 	$error_code = array(
// 		'100' => '用户名不能为空!'
// 	)
// }

