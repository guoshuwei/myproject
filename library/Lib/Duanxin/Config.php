<?php
/**
 *
 * @author WangYan
 * email:phperwangyan@foxmail.com
 * 2015-1-28
 * UTF-8
 */
class Lib_Duanxin_Config {
	private static $duanxin_config = array (
			1 => array (
				'class_name' => 'Lib_Duanxin_Adapter_iHuYi',
				'config' => array (
					'url' => 'http://106.ihuyi.cn/webservice/sms.php?method=Submit',
					'account' => 'nonglian',
					'password' => 'nonglian@2018$%^',
					'code_expire' => 600, // 验证码失效时间
				),
			),
			2 => array (
				'class_name' => 'Lib_Duanxin_Adapter_DieXin',
				'config' => array (
					'url' => 'http://120.106818.com/SendMTU8/SendMessage_utf8.aspx',
					'UserName' => 'nonglian',
					'UserPass' => 'nonglian@2018$%^',
					'subid' => '', // 选填 通道号码末尾添加的扩展号码
					'code_expire' => 600, // 验证码失效时间
				),
			),
			3 => array (
				'class_name' => 'Lib_Duanxin_Adapter_Zhizhen',
				'config' => array (
					'url' => 'http://115.28.112.245:8082/SendMT/SendMessage',
					'UserName' => 'nonglian',
					'UserPass' => 'nonglian@2018$%^',
					'subid' => '', // 选填 通道号码末尾添加的扩展号码
					'code_expire' => 600, // 验证码失效时间
				),
			),
	    4 => array (
	        'class_name' => 'Lib_Duanxin_Adapter_Zhizhen',
	        'config' => array (
	            'url' => 'http://115.28.112.245:8082/SendMT/SendMessage',
	            'UserName' => 'nonglian',
	            'UserPass' => 'nognlian@2018$%^',
	            'subid' => '', // 选填 通道号码末尾添加的扩展号码
	            'code_expire' => 600, // 验证码失效时间
	        ),
	    ),
	);
	
	/**
	 * 封闭构造
	 */
	private function __construct() {
	}
	
	/**
	 * 获得配置文件
	 *
	 * @param unknown $config_key
	 * @throws Yaf_Exception
	 */
	public static function getConfig($config_key) {
		if (! isset ( self::$duanxin_config [$config_key] )) {
			return null;
		}
		return self::$duanxin_config [$config_key];
	}

    // 获取配置的个数
    public static function getAdapterNum() {
        return count(self::$duanxin_config);
    }
    //验证码的message
    public static $_sms_message = array(
        1 =>"【农联网】您的验证码是：%s。请不要把验证码泄露给其他人。",
        2 =>"【农联交易】 %s （动态验证码），请在30分钟内填写",
        3 =>"【农联APP】 您的验证码是：%s。请不要把验证码泄露给其他人。",
    	4 =>"【农联数据】 您的验证码是：%s。请不要把验证码泄露给其他人。",
    );
}