<?php

$doc = <<<AAA
<html>
 <head>
  <title>
   The Dormouse's story
  </title>
 </head>
 <body>
  <p class="title">
   <b>
    The Dormouse's story
   </b>
  </p>
  <p class="story">
   Once upon a time there were three little sisters; and their names were
   <a class="sister" href="http://example.com/elsie" id="link1">
    Elsie
   </a>
   ,
   <a class="sister" href="http://example.com/lacie" id="link2">
    Lacie
   </a>
   and
   <a class="sister" href="http://example.com/tillie" id="link2">
    Tillie
   </a>
    and they lived at the bottom of a well.
  </p>
  <p class="story">
   
  </p>
 </body>
</html>
AAA;

//分析dom结构
$doc = new DOMDocument();
$doc->loadHTML($doc);
var_dump($doc);die;

//
$tree = array(
	'推荐' => array(
		'url' => '/',
		'list' => array(
			'0' => array(
				'href' => '11'//执行递归
				'imgsrc' => '',
				'title' => '',
				'pub_time' => '',
				'source' => ''
			),
			'1' => array(
				'href' => ''
				'imgsrc' => '',
				'title' => '',
				'pub_time' => '',
				'source' => ''
			),
		)
	)

)
//设置选择器
setSelector($selector);
isParent();//是否是父亲节点
isChild();//是否是孩子节点

//只需要定义两个选择器，就可以生成json

$selector = ['.y-left .index-channel # channel ul li a href'] = href()  

$selector['a span'] = data()

$left_selector['riot-tag="feedBox" feedBox listNewsTimeLy item']
