<?php

/**
* 实名认证
*/
class Lib_Certification
{
	private static $instance;

	// 内部使用配置
	private $conf = array(
			// 身份实名认证：https://market.aliyun.com/products/56928004/cmapi014760.html
			'lianzhuo' => array(
					// 接口地址
					'url' 		=> 'http://idcard.market.alicloudapi.com/lianzhuo/idcard',
					// appcode
					'appcode' 	=> 'd97e7dd77f6b411f923adb6445836b36',
				),
		);

	// 防止外部实例化
	private function __construct()
	{
	}

	// 防止克隆
	private function __clone(){
	}

	// 获取实例
	public static function getInstance(){
		if (!self::$instance instanceof self) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	// 阿里云实名认证接口
	public function apiLianzhuo($real_name, $idcard){
		// 进行数据校验
		if ($this->check_real_name($real_name) && $this->check_idcard($idcard)) {
			// 
			$url = $this->conf['lianzhuo']['url'] . '?cardno=' . $idcard . '&name=' . $real_name;

			return $this->APISTORE($url, array(), $this->conf['lianzhuo']['appcode']);
		}
		return false;
	}

	/**
	 * APISTORE 获取数据
	 * @param $url 请求地址
	 * @param array $params 请求的数据
	 * @param $appCode 您的APPCODE
	 * @param $method
	 * @return array|mixed
	 */
	private function APISTORE($url, $params = array(), $appCode, $method = "GET")
	{
	    $curl = curl_init();
	    curl_setopt($curl, CURLOPT_URL, $method == "POST" ? $url : $url . '?' . http_build_query($params));
	    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	        'Authorization:APPCODE ' . $appCode
	    ));
	    //如果是https协议
	    if (stripos($url, "https://") !== FALSE) {
	        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
	        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
	        //CURL_SSLVERSION_TLSv1
	        curl_setopt($curl, CURLOPT_SSLVERSION, 1);
	    }
	    //超时时间
	    curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 60);
	    curl_setopt($curl, CURLOPT_TIMEOUT, 60);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	    //通过POST方式提交
	    if ($method == "POST") {
	        curl_setopt($curl, CURLOPT_POST, true);
	        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($params));
	    }
	    //返回内容
	    $callbcak = curl_exec($curl);
	    //http status
	    $CURLINFO_HTTP_CODE = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	    //关闭,释放资源
	    curl_close($curl);
	    //如果返回的不是200,请参阅错误码 https://help.aliyun.com/document_detail/43906.html
	    if ($CURLINFO_HTTP_CODE == 200)
	        return json_decode($callbcak, true);
	    else if ($CURLINFO_HTTP_CODE == 403)
	        return array("error_code" => $CURLINFO_HTTP_CODE, "reason" => "剩余次数不足");
	    else if ($CURLINFO_HTTP_CODE == 400)
	        return array("error_code" => $CURLINFO_HTTP_CODE, "reason" => "APPCODE错误");
	    else
	        return array("error_code" => $CURLINFO_HTTP_CODE, "reason" => "APPCODE错误");
	}

	// 校验真实姓名
	private function check_real_name($name){
		// 2-4个中文字符
		if (preg_match('/^[\x{4e00}-\x{9fa5}]{2,4}+$/u', $name)) return true;
		return false;
	}

	// 校验身份证号
	private function check_idcard($idcard){
	    // 城市前缀
		$vCity = array(
			'11', '12', '13', '14', '15', '21', '22',
			'23', '31', '32', '33', '34', '35', '36',
			'37', '41', '42', '43', '44', '45', '46',
			'50', '51', '52', '53', '54', '61', '62',
			'63', '64', '65', '71', '81', '82', '91'
		);
	 
		// 简单校验
		if (!preg_match('/^([\d]{17}[xX\d]|[\d]{15})$/', $idcard)) return false;
		
		if (!in_array(substr($idcard, 0, 2), $vCity)) return false;
		
		$idcard = preg_replace('/[xX]$/i', 'a', $idcard);
	    $vLength = strlen($idcard);
		
		$vBirthday = '';
		if ($vLength == 18) {
			$vBirthday = substr($idcard, 6, 4) . '-' . substr($idcard, 10, 2) . '-' . substr($idcard, 12, 2);
		} else {
	        $vBirthday = '19' . substr($idcard, 6, 2) . '-' . substr($idcard, 8, 2) . '-' . substr($idcard, 10, 2);
		}
		// 校验日期格式
		if (date('Y-m-d', strtotime($vBirthday)) != $vBirthday) return false;

		// DIY规则一：未满18周岁禁止实名
		if ($this->cal_age($vBirthday) < 18) return false;

		// 核实校验位
		if ($vLength == 18) {
			$vSum = 0;
			
			for ($i = 17; $i >= 0; $i--) {
				$vSubStr = substr($idcard, 17 - $i, 1);
				$vSum += (pow(2, $i) % 11) * (($vSubStr == 'a') ? 10 : intval($vSubStr, 11));
			}
			
			if ($vSum % 11 != 1) return false;
		}
		
		return true;
	}

	/**
	 * 根据生日计算年龄
	 * function decsribe
	 *
	 * @copyright [copyright]
	 * @license   [license]
	 * @version   [version]
	 * @author Xuyer
	 * @datetime  2018-11-27T10:09:58+0800
	 *
	 * @param     string 	$birthday 	出生日期
	 * @return    int
	 */
	private function cal_age($birthday){
		$age = 0;
		// if (strtotime($birthday) !== false) {
		if (date('Y-m-d',strtotime($birthday)) == $birthday) {
			
			list($y1, $m1, $d1) = explode('-', $birthday);
			list($y2, $m2, $d2) = explode('-', date('Y-m-d'));

			$age = $y2 - $y1;

			if ((int)($m2.$d2) < (int)($m1.$d1)) {
				$age--;
			}
		}
		return $age;
	}
}