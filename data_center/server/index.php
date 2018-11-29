<?php


require_once './../../library/bootstrap.php';

$dao = new Lib_Dao('data_center');

$table = 'news';
//处理数据
// news 模块数据
$news_list =  json_decode(file_get_contents('../sannong.json'),true);
// print_r($news_list);die;
// $pattern = "/^来源：(.*)\s(\d{4}年\d{2}月\d{2}日\s.*)/";
foreach($news_list as $list){
	//正则匹配来源后面的字符
	// preg_match($pattern, $list['source'][0], $matches);
	// $data = array(
	// 	'title' => $list['title'],	
	// 	'source' => $matches[1],
	// 	'pub_time' => $matches[2],
	// 	'content' => implode("\n", $list['content']),
	// 	'mod_type' => 2,
	// 	'type' => 5,
	// 	'created_at' => time(),
	// );
	
	$data = array(
		'title' => $list['title'],	
		'source' => $list['source'],
		'pub_time' => $list['pub_time'],
		'content' => $list['content'],
		'mod_type' => 3,
		'type' => 5,
		'created_at' => time(),
	);
}
foreach ($data as $key => $value) {
    $fields [] = '`' . $key . '`';
    $temp = ':' . $key;
    $bind_value [] = $temp;    
    $data [$temp] = $value;
}


$sql = 'INSERT INTO ' . $table . '(' . implode(',', $fields) . ') VALUES (' . implode(',', $bind_value) . ')';
$res = $dao->conn(false)->noCache()->preparedSql($sql, $data)->lastInsertId();
var_dump($res);
//return $res;

