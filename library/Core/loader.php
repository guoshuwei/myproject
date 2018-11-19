<?php
/**
 *
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-22
 * UTF-8
 */

function load_library($class_name) {
	if (empty ( $class_name )) {
		return false;
	}
	// if (substr ( $class_name, 0, 2 ) != 'Ty') {
	// 	return false;
	// }
	
	$file_path = str_replace ( '_', '/', $class_name ) . '.php';
	if(file_exists(LIBRARY_DIR . '/' . $file_path)){
		require_once LIBRARY_DIR . '/' . $file_path;
	}

	return true;
}
spl_autoload_register ( 'load_library' );


// if(file_exists(LIBRARY_DIR.'/vendor/autoload.php')){
//     include LIBRARY_DIR."/vendor/autoload.php";
// }