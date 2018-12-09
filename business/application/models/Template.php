<?php
class TemplateModel {
	//缓存配置
	public static $cache = array(
		//需要缓存的模板
		//格式：controller/action
		'index/index' => array(
			//缓存参数
			'key'=>array(
				'uid'
			),
			//是否缓存
			'cache' => 0, 
			//缓存周期
			'lifeTime' => 300
		)
	);
	//抽样配置
	public static $sample = array(
		/*
		* 抽样模板
		*/
		'index/index'=> array(
			'sample'=>false,
			'config'=>array(
				/*
				* 抽样标志：(按用户uid),ua(按浏览类型),ucity(按城市)
				* 暂时只支持按uid抽样，若使用其它，请在base plugin里添加方法
				*/
				"key"=>'uid',
				//抽样比率
				//type 为hash是有效
				'value'=>array(
					//用户总共分为1000份：start为起始用户，end为结束，sample为该部分用户单独的模板
					array('start'=>100,'end'=>300,'sample'=>'index/index1'),
					array('start'=>300,'end'=>1000,'sample'=>'index/index2')
				)
			)
		)
	);

}