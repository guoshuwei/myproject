<?php
//公共函数文件
static $imgarr=1;
function standard_print($content)
{
	echo '<pre>';
	print_r($content);
	echo '</pre>';
}
function static_saveimg()
{
	static $imgarr = 0;
	$imgarr++;
	echo $imgarr;
}
/**
	*	多文件上传
	*	文件重命名为time()  . "_" .  md5(fileName) 的格式
	*	参数：
	*		$dest_dir，上传目录
	*		$type，允许的类型array
	*		$maxsize，允许上传的最大值,以b为单位
	*		$upfile，从页面传进来的file
	*/
function doBatchUpload($dest_dir, $type, $maxsize, $upfile ,$create = false ) {
	
}
?>