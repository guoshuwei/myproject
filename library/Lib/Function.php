<?php
/**
 * 函数库
 * @author nengzhi
 * 2015-07-15
 * UTF-8
 */
class Lib_Function{

	private static $obj = null;
	private $charset="abcdefghzkmnpqrstuvwxyABCDEFGHZKMNPQRSTUVWXY23456789"; //随机因子
	private function __construct(){}

	/**
	 * 获取单例对象
	 * @param string $hl
	 * @param number $timeout
	 * @return TyLib_Function
	 */
	public static function getInstance(){
		if(is_null(self::$obj)){
			self::$obj = new Lib_Function();
		}

		return self::$obj;
	}

	/**
	 * 二维数组排序
	 * @param type $multi_array
	 * @param type $sort_key
	 * @param type $sort
	 * @return boolean
	 */
	public function multi_array_sort($multi_array,$sort_key,$sort=SORT_DESC){

	    if(!is_array($multi_array)){
			return false;
		}
		$key_array = array();
		foreach ($multi_array as $row_array){
			if(!is_array($row_array)){
				return false;
			}
			$key_array[] = $row_array[$sort_key];
		}
		array_multisort($key_array,$sort,$multi_array);
		return $multi_array;
	}

	/**
	 * 数据转码
	 * @param unknown $str
	 * @param unknown $code 目标编码
	 * @return unknown
	 */
	public function conversion_coding($str, $code){
		$encode = mb_detect_encoding($str, array('UTF-8','GBK','GB2312','BIG5','ASCII'));
		if($encode == $code or !$encode){
			return $str;
		}
		if(!is_string($str)){
			return $str;
		}
		if($encode === 'GB2312' or $encode === 'GBK'){
			$encode = $encode . '//IGNORE';
		}
		return iconv($encode, $code, $str);
	}

	/**
	 * 拆分域名方法
	 * @param unknown $domainname
	 * @param string $location head前部分 body主域名 foot尾部
	 * @return unknown|NULL
	 */

	public function domain_name_extract($domainname, $location = 'body'){

		$locationarr = array('head','body','foot');
		if(!in_array($location, $locationarr) or empty($domainname)){
			return false;
		}
		$foot = null;
		if(strstr($domainname, 'http://')){
			$domainname = str_replace('http://', '' , $domainname);
		}else if(strstr($domainname, 'https://')){
			$domainname = str_replace('https://', '' , $domainname);
		}
		$domainarr = array('com.cn','com','cn','net','org','gov','info','cc','co','la','vc','top');
		if(strstr($domainname, ':')){
			$len = strpos($domainname, ':');
		}else{
			$len = strpos($domainname, '/');
		}
		if($len !== false){
			$domainname = substr($domainname, 0, $len);
		}
		$domainname = trim($domainname);

		$domainnamenew = array_reverse(explode('.', $domainname));
		foreach($domainnamenew as $value){
			if(!in_array($value,$domainarr)){
				continue;
			}
			$foot[] = $value;
			break;
		}

		$foot = implode('.', array_reverse($foot));
		$domainname = strstr($domainname, '.'.$foot, true);
		$domainname = explode('.',$domainname);
		if(count($domainname) == 1){
			array_unshift($domainname, '');
		}
		$retname = null;

		switch($location){
			case 'head':
				$retname = $domainname[0];
				break;
			case 'body':
				$retname = $domainname[1];
				break;
			default:
				$retname = $foot;
		}
		return $retname;
	}

	/**
	 * curl全局封装方法
	 * @param unknown $url
	 * @param number $limit
	 * @param string $post
	 * @param string $cookie
	 * @param string $bysocket
	 * @param string $ip
	 * @param number $timeout
	 * @param string $block
	 * @param string $encodetype
	 * @param string $allowcurl
	 */
	public function dfopen($url, $limit = 0, $post = '', $cookie = '', $bysocket = FALSE, $ip = '', $timeout = 3, $block = TRUE, $encodetype  = 'URLENCODE', $allowcurl = TRUE) {
		$return = '';
		$matches = parse_url($url);
		$scheme = isset($matches['scheme']) ? $matches['scheme'].'://' : $_SERVER['HTTP_HOST'];
		$host = isset($matches['host']) ? $matches['host'] : '';
		$path = $matches['path'] ? $matches['path'].(isset($matches['query']) && $matches['query'] ? '?'.$matches['query'] : '') : '/';
		$port = !empty($matches['port']) ? $matches['port'] : ($scheme == 'https' ? 443 : 80);
		if(function_exists('curl_init') && $allowcurl) {
			$ch = curl_init();
			$ip && curl_setopt($ch, CURLOPT_HTTPHEADER, array("Host: ".$host));
			curl_setopt($ch, CURLOPT_URL, $scheme.($ip ? $ip : $host).':'.$port.$path);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  // 从证书中检查SSL加密算法是否存在
			if($post) {
				curl_setopt($ch, CURLOPT_POST, 1);
				if($encodetype == 'URLENCODE') {
					curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
				} else {
					parse_str($post, $postarray);
					curl_setopt($ch, CURLOPT_POSTFIELDS, $postarray);
				}
			}

			if($cookie) {
				curl_setopt($ch, CURLOPT_COOKIE, $cookie);
			}
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
			$data = curl_exec($ch);
			$status = curl_getinfo($ch);
			$errno = curl_errno($ch);
			curl_close($ch);
			if($errno || $status['http_code'] != 200) {
				$status['code'] = 503;
				return json_encode($status);
			}
			return !$limit ? $data : substr($data, 0, $limit);
		}

		if($post) {
			$out = "POST $path HTTP/1.0\r\n";
			$header = "Accept: */*\r\n";
			$header .= "Accept-Language: zh-cn\r\n";
			$boundary = $encodetype == 'URLENCODE' ? '' : '; boundary='.trim(substr(trim($post), 2, strpos(trim($post), "\n") - 2));
			$header .= $encodetype == 'URLENCODE' ? "Content-Type: application/x-www-form-urlencoded\r\n" : "Content-Type: multipart/form-data$boundary\r\n";
			$header .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
			$header .= "Host: $host:$port\r\n";
			$header .= 'Content-Length: '.strlen($post)."\r\n";
			$header .= "Connection: Close\r\n";
			$header .= "Cache-Control: no-cache\r\n";
			$header .= "Cookie: $cookie\r\n\r\n";
			$out .= $header.$post;
		} else {
			$out = "GET $path HTTP/1.0\r\n";
			$header = "Accept: */*\r\n";
			$header .= "Accept-Language: zh-cn\r\n";
			$header .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
			$header .= "Host: $host:$port\r\n";
			$header .= "Connection: Close\r\n";
			$header .= "Cookie: $cookie\r\n\r\n";
			$out .= $header;
		}

		$fpflag = 0;
		if(!$fp = @fsocketopen(($ip ? $ip : $host), $port, $errno, $errstr, $timeout)) {
			$context = array(
					'http' => array(
							'method' => $post ? 'POST' : 'GET',
							'header' => $header,
							'content' => $post,
							'timeout' => $timeout,
					),
			);
			$context = stream_context_create($context);
			$fp = @fopen($scheme.'://'.($ip ? $ip : $host).':'.$port.$path, 'b', false, $context);
			$fpflag = 1;
		}

		if(!$fp) {
			return '';
		}
		stream_set_blocking($fp, $block);
		stream_set_timeout($fp, $timeout);
		@fwrite($fp, $out);
		$status = stream_get_meta_data($fp);
		if(!$status['timed_out']) {
			while (!feof($fp) && !$fpflag) {
				if(($header = @fgets($fp)) && ($header == "\r\n" ||  $header == "\n")) {
					break;
				}
			}

			$stop = false;
			while(!feof($fp) && !$stop) {
				$data = fread($fp, ($limit == 0 || $limit > 8192 ? 8192 : $limit));
				$return .= $data;
				if($limit) {
					$limit -= strlen($data);
					$stop = $limit <= 0;
				}
			}
		}
		@fclose($fp);
		return $return;
	}

	public function openCurl($url, $data){ // 模拟提交数据函数
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // 从证书中检查SSL加密算法是否存在
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
        $tmpInfo = curl_exec($curl); // 执行操作
        if (curl_errno($curl)) {
            echo 'Errno'.curl_error($curl);//捕抓异常
        }
        curl_close($curl); // 关闭CURL会话
        return $tmpInfo; // 返回数据，json格式
    }

    /**
	 * APISTORE 获取数据
	 * @param $url 请求地址
	 * @param array $params 请求的数据
	 * @param $appCode 您的APPCODE
	 * @param $method
	 * @return array|mixed
	 */
	function APISTORE($url, $params = array(), $appCode, $method = "GET")
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


	/**
	 * 验证手机号码
	 * @param unknown $mobile
	 * @return boolean|unknown
	 */
	public function checkmobile($mobile){
		$rule = '/^1[3|4|5|6|7|8|9][\d]{9}/';
		preg_match($rule, $mobile, $regex);
		if(!$regex[0] || strlen($mobile) > 11){
			return false;
		}
		return $mobile;
	}

	/**
	 * 计算平台档案收益
	 * @param array $rate
	 * @return string
	 */
	public function interestRate($rate){
		if(!is_array($rate) or empty($rate)){
			return '';
		}
		$rate = array_filter($rate);
		if(empty($rate)){
			return '';
		}
		$pos1 = array_search(max($rate), $rate);
		$pos2 = array_search(min($rate), $rate);
		$max =  $rate[$pos1];
		$min = $rate[$pos2];
		if ($min == $max && $max == 1){
			$str = '<8% ';
		}elseif ($max == $min && $max == 2){
			$str = '8%~12%';
		}elseif ($max == $min && $max == 3){
			$str = '13%~16%';
		}elseif ($max == $min && $max == 4){
			$str = '17%~20%';
		}elseif ($max == $min && $max == 5){
			$str = '>20%';
		}elseif ($min==1 && $max==2){
			$str = '8%~12%';
		}elseif ($min==1 && $max==3){
			$str = '8%~16%';
		}elseif ($min==1 && $max==4){
			$str = '8%~20%';
		}elseif ($min==1 && $max==5){
			$str = '>20%';
		}elseif ($min==2 && $max==3){
			$str = '8%~16%';
		}elseif ($min==2 && $max==4){
			$str = '8%~20%';
		}elseif ($min==2 && $max==5){
			$str = '>20%';
		}elseif ($min==3 && $max==4){
			$str = '13%~20%';
		}elseif ($min==3 && $max==5){
			$str = '>20%';
		}elseif ($min==4 && $max==5){
			$str = '>20%';
		}
		return $str;
	}

	public function interestRateNew($platform){
		if(!is_array($platform['interest_rate']) or empty($platform['interest_rate'])){
			return '';
		}
		$platform['interest_rate'] = array_filter($platform['interest_rate']);
		if(empty($platform['interest_rate'])){
			return '';
		}
		return $platform['start_rate'].'%~'.$platform['end_rate'].'%';
	}

	/**
	 * 计算平台档案范围期限
	 * @param unknown $arr
	 * @return string
	 */
	public function interval($arr){
		if(!is_array($arr)){
			return '';
		}
		$arr = array_filter($arr);
		if(empty($arr)){
			return '';
		}
		$pos1 = array_search(max($arr), $arr);
		$pos2 = array_search(min($arr), $arr);
		$max =  $arr[$pos1];
		$min = $arr[$pos2];
		if ($min == $max && $max == 1){
			$str = '天标';
		}elseif ($max == $min && $max == 2){
			$str = '1~3月';
		}elseif ($max == $min && $max == 3){
			$str = '4~6月';
		}elseif ($max == $min && $max == 4){
			$str = '7~12月';
		}elseif ($max == $min && $max == 5){
			$str = '12月以上';
		}elseif ($min==1 && $max==2){
			$str = '天标~3月';
		}elseif ($min==1 && $max==3){
			$str = '天标~6月';
		}elseif ($min==1 && $max==4){
			$str = '天标~12月';
		}elseif ($min==1 && $max==5){
			$str = '天标~12月以上';
		}elseif ($min==2 && $max==3){
			$str = '1~6月';
		}elseif ($min==2 && $max==4){
			$str = '1~12月';
		}elseif ($min==2 && $max==5){
			$str = '1~12月以上';
		}elseif ($min==3 && $max==4){
			$str = '4~12月';
		}elseif ($min==3 && $max==5){
			$str = '4~12月以上';
		}elseif ($min==4 && $max==5){
			$str = '7~12月以上';
		}
		return $str;
	}
	/**
	 * 组合平台项目类型
	 * @param unknown $arr
	 * @return string
	 */
	public function project($arr = array()){
		if(!is_array($arr)){
			return '';
		}
		$arr = array_filter($arr);
		if(empty($arr)){
			return '';
		}
		$return_arr = '';
		$project_type = TyLib_WebVar::$platform_project_type;
		foreach($arr as $value){
			$return_arr[] = $project_type[$value];
		}
		return implode('|',$return_arr);
	}

	/**
	 * @param array $arr
	 * 组合保障模式
	 *
	 */
	public function support_mode($arr = array()){
		if(!is_array($arr)){
			return array();
		}
		$support_mode_str = '';
		$support_mode = 0;
		foreach ($arr as $key=>$val){
			$support_mode_str .= '|'.TyLib_WebVar::$platform_support_mode["{$val}"];
			$support_mode = $val;
		}
		$mode_str = '';
		if($support_mode >= 20){
			$mode_str = '第三方机构保障';
		}else if($support_mode >= 10 && $support_mode < 20){
			$mode_str = '平台垫付';
		}
		$support_mode_str = ltrim($support_mode_str,'|');
		$support_mode_str = $mode_str.$support_mode_str;
		return $support_mode_str;
	}
	/**
	 * 组合平台背景标签
	 * @param unknown $arr
	 * @return multitype:|multitype:unknown
	 */
	public function background($arr){
		if(!is_array($arr)){
			return array();
		}
		$ret = array();
		foreach($arr as $value){
			if($value and isset(TyLib_WebVar::$platform_background[$value])){
				$ret[$value] = TyLib_WebVar::$platform_background[$value];
			}
		}
		return $ret;
	}

	/**
	 * 获取平台运营时间
	 */
	public function getPlatformRuntime($online_time){
		if(!empty($online_time)){
			$time_gap = time() - $online_time;
			$time_day = $time_gap/24/3600;
			$time_month = $time_day/30;
			$time_year = $time_month/12;
			if($time_year > 1){
				$runtime = round($time_year).'年';
			}elseif($time_month > 1){
				$runtime = round($time_month).'月';
			}elseif($time_day > 1){
				$runtime = round($time_day).'日';
			}
		}else{
			$runtime = '';
		}
		return $runtime;
	}
	//****************平台相关end*************************************************/
	/**
	 * 去除discuz标签公用方法
	 * @param unknown $thread
	 * @return unknown
	 */
	public function ubbAllstring($thread){
		$thread = preg_replace('/\[attach\](\d+)\[\/attach\]/','',$thread);
		$thread = preg_replace(
				array('/&amp;(#\d{3,5};)/', "/\[hide=?\d*\](.*?)\[\/hide\]/is", "/\[\/?\w+=?.*?\]/",'/本帖最后由.*编辑/'),
				array('&\1','<b>**** Hidden Message *****</b>',''),
				str_replace(
				   	array('&', '"', '"', '"', '"', '"',' ', '<', '>', "\t", '   ', '  '),
				    array('&amp;', '&quot;', ' &quot;', '&quot; ','&amp;quot;','&amp;nbsp;','&nbsp;&nbsp;&nbsp;&nbsp;', '&lt;', '&gt;', '&nbsp; &nbsp; &nbsp; &nbsp; ', '&nbsp; &nbsp;', '&nbsp;&nbsp;'),$thread));
		return $thread;
	}

	/**
	* 推送P2PEYE消息
	*/

	public function pushP2peyeNitification($pushData){
		if(empty($pushData))
			return;

		$pushData['mod'] = 'notification';
		$notificationUrl = 'http://www.p2peye.com/ajax.php';
		return $this->dfopen($notificationUrl, 0, http_build_query($pushData));

	}
	/**
	 * 表情解析
	 * @param unknown $message
	 * @param unknown $types
	 * @param unknown $smiles_data
	 * @return unknown
	 */
	public static function parsesmiles($message, $types, $smiles_data) {
		foreach($smiles_data as $smile){
			$smiles['searcharray'][$smile['id']] = '/' . preg_quote($smile['code']) . '/';
			$smiles['replacearray'][$smile['id']] = $smile['url'];
			$smiles['typearray'][$smile['id']] = $smile['typeid'];
		}

		foreach($smiles['replacearray'] as $key => $smiley) {
			if(!isset($smiles['replacearray'][$key]) || !isset($types[$smiles['typearray'][$key]]['directory'])){
				continue;
			}
			$smiles['replacearray'][$key] = '<img src="http://www.p2peye.com/static/image/smiley/'.$types[$smiles['typearray'][$key]]['directory'].'/'.$smiley.'" smilieid="'.$key.'" border="0" alt="" />';
		}
		$message = preg_replace($smiles['searcharray'], $smiles['replacearray'], $message, 20);
		return $message;
	}

	/**
	 * 概率计算
	 * @param unknown $proarr
	 * @return Ambigous <string, unknown>
	 */
	public function proarr_rand($proarr) {
	    if(empty($proarr)){
	        return false;
	    }
	    $sum = array_sum($proarr);
	    $rand_num = mt_rand(0, $sum);

	    $rand_begin = 0;
	    $rand_end = 0;
	    $proarr_id = 0;
	    foreach ($proarr as $id => $prop) {
	        $rand_end += $prop;
	        if ($rand_num >= $rand_begin && $rand_num <= $rand_end) {
	            $proarr_id = $id;
	            break;
	        }
	        $rand_begin += $prop;
	    }
	    return $proarr_id;
	}

	/**
	 * PHP获取当前客户端请求IP地址
	 * @return Ambigous <unknown, mixed>
	 */
    public function getip() {
        $unknown = 'unknown';
        $ip = '';
        if(isset($_SERVER['HTTP_X_CONNECTING_IP']) && trim($_SERVER['HTTP_X_CONNECTING_IP']) != false){
            $ip = trim($_SERVER['HTTP_X_CONNECTING_IP']);
        }else{
            if(!empty($_SERVER['HTTP_X_REAL_FORWARDED_FOR'])){
                $ip = $_SERVER['HTTP_X_REAL_FORWARDED_FOR'];
            }else{
                if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], $unknown)) {
                    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                    //处理多层代理的情况
                    if(false !== strpos($_SERVER['HTTP_X_FORWARDED_FOR'], ',')){
                        if (false !== strpos($ip, ',')) $ip = reset(explode(',', $ip));
                        $ip = trim($ip);
                    }
                }elseif(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], $unknown)){
                    $ip = $_SERVER['REMOTE_ADDR'];
                }
            }
        }
        return $ip;
    }

	/**
	 * 获取当前星期几
	 * @return Ambigous <number>
	 */
	public function getWeekMember(){
		$week_english = array(
			'Monday'     => 1,
            'Tuesday'    => 2,
            'Wednesday'  => 3,
            'Thursday'   => 4,
            'Friday'     => 5,
            'Saturday'   => 6,
            'Sunday'     => 7,
		);
		return $week_english[date('l')];
	}
	/**
	 * 获得当前月份的前一月或后一月数字
	 * @param string $sign
	 * @return string
	 */
	public function getMonth($sign="1"){
	    //得到系统的年月
	    $tmp_date=date("Ym");
	    //切割出年份
	    $tmp_year=substr($tmp_date,0,4);
	    //切割出月份
	    $tmp_mon =substr($tmp_date,4,2);
	    $tmp_nextmonth=mktime(0,0,0,$tmp_mon+1,1,$tmp_year);
	    $tmp_forwardmonth=mktime(0,0,0,$tmp_mon-1,1,$tmp_year);
	    $return_arr = array();
	    if($sign==0){
	        //得到当前月的下一个月
	        $return_arr['month'] = $fm_next_month=date("m",$tmp_nextmonth);
	        $return_arr['year'] = $fm_next_month=date("Y",$tmp_nextmonth);
	    }else{
	        //得到当前月的上一个月
	        $return_arr['month'] = date("m",$tmp_forwardmonth);
	        $return_arr['year'] = date("Y",$tmp_forwardmonth);
	    }
	    return $return_arr;
	}

	/**
	 * 过滤discuz内容的标签
	 */
	public function discuzFilterReg($content){
		$reg = '/\[\w+=[\w[:punct:][:space:]微软雅黑宋体新宋体黑体仿宋楷体]+\]|\[\/\w+\]|本帖最后由.*编辑|\[img\][\w\/\.]+|\[attach\]\d+|\[\/?\w+=?.*?\]/';
		$content = preg_replace($reg,'',$content);
		$content = strip_tags($content);
		return trim($content);
	}

	/**
	 * 检查是否有不良关键词（discuz）
	 */
	public function discuzFilterContent($content) {
		$res = TyLib_P2peyeApi::getInstance()->filterContent($content);
		if ($res['code'] == 200 && $res['message'] == 'succeed') {
			$code = 200;
			$content = $res['data']['content'];
		} else {
			$code = 5161; // 含不良词语,无法提交
			$content = '';
		}
		$returnData = array(
				'code' => $code,
				'data' => $content
		);
		return $returnData;
	}
	/**
	 * 随机生成用户名, 用户名生成规则：字母+数字_cn 字母+数字共6位，随机组合，举例：3d8hd9_cn
	 */
	public function randCreateUname(){
		$suffix = '_cn';//后缀
		//随机字母数字6位
        return $this->createCode(6).$suffix;

	}

	/**
	 * @param $len 生成字串长度
	 * @return mixed
	 */
	private function createCode($len){
		$this->code = '';
		$_leng=strlen($this->charset)-1;
		for($i=1;$i<=$len;$i++){
			$this->code.=$this->charset[mt_rand(0,$_leng)];
		}
		return $this->code;
	}

    //公用的生成随机妈的方法
    public function publicRand($len){
        return $this->createCode($len);
    }
    /**
     * 去除ubb标签（不包含attach）
     * @param $thread
     * @return mixed
     */
    public function ubbAllStringExceptAttach($thread){
        $thread = preg_replace(
            array('/&amp;(#\d{3,5};)/', "/\[hide=?\d*\](.*?)\[\/hide\]/is", "/(?!\[attach\]|\[\/attach\])\[\/?\w+=?.*?\]/",'/本帖最后由.*编辑/'),
            array('&\1','<b>**** Hidden Message *****</b>',''),
            str_replace(
                array('&', '"', '"', '"', '"', '"',' ', '<', '>', "\t", '   ', '  '),
                array('&amp;', '&quot;', ' &quot;', '&quot; ','&amp;quot;','&amp;nbsp;','&nbsp;&nbsp;&nbsp;&nbsp;', '&lt;', '&gt;', '&nbsp; &nbsp; &nbsp; &nbsp; ', '&nbsp; &nbsp;', '&nbsp;&nbsp;'),$thread));
        return $thread;
    }

    /**
     * @身份证
     */
    public  function Identity($subject) {
		//新加验证
		$value = strtoupper($subject);
		$length = strlen($value);
		//判断位数,只支持18位
		if($length != 18)
		{
			return false;
		}
		//验证是否是数字和X
		$sublength = $length - 1;
		$pattern = '/[0-9]{' . $sublength . '}[0-9X]/';
		$match = preg_match($pattern, $value);
		if(!$match)
		{
			return false;
		}
		//验证加权
		$year = substr($value, 6, 2);
		if($year < 19 || $year > 20)
		{
			return false;
		}
		$w = array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
		$y = array('1','0','X','9','8','7','6','5','4','3','2');
		$sum = 0;
		for($i = 0; $i < $length - 1; $i++)
		{
			$sum += substr($value, $i, 1) * $w[$i];
		}
		$last = $sum % 11;
		if(substr($value, 17, 1) != $y[$last])
		{
			return false;
		}
		return true;
    }

    //通过输入的身份证，获取得到自己的年龄
    public function getAge($card){
        if(empty($card)) return '';
        //出生年月
        $date=strtotime(substr($card,6,8));
        $today=strtotime('today');
        $diff=floor(($today-$date)/86400/365);
        //得到两个日期相差的大体年数
        //strtotime加上这个年数后得到那日的时间戳后与今日的时间戳相比
        $age=strtotime(substr($card,6,8).' +'.$diff.'years')>$today?($diff+1):$diff;
        return $age;
    }

	//将时间戳转换成时间描述，$show_time为时间戳
	public function tran_timestamp($show_time, $format='Y-m-d'){
		date_default_timezone_set("Asia/Shanghai");   //设置时区
		$now_time = date("Y-m-d H:i:s", time());
		$now_time = strtotime($now_time);
		$dur = $now_time - $show_time;
		if ($dur < 0) {
			return date($format, $show_time);
		} else {
			if ($dur < 60) {
				return $dur . '秒前';
			} else {
				if ($dur < 3600) {
					return floor($dur / 60) . '分钟前';
				} else {
					if ($dur < 86400) {
						return floor($dur / 3600) . '小时前';
					} else {
						return date($format, $show_time);
					}
				}
			}
		}
	}


//添加时间描述
	public function addTimeDesc($list,$field = 'create_time'){
		if(empty($list)){
			return $list;
		}
		foreach ($list as $key=>$item){
			$list[$key]['createtime_desc'] = $this->tran_timestamp(intval($item[$field]));
			$list[$key]['createtime_desc_total'] = $this->tran_timestamp(intval($item[$field]), 'Y-m-d H:i:s');
		}
		return $list;
	}

	/**
	  *隐藏银行卡号码
	  */
	public function hideBankCard($bank_card){
		$bank_card = trim($bank_card);
		$card_length = strlen($bank_card);
		$card_tail_len = $card_length % 4;
		$card_sections = floor($card_length/4);
		$card_tail_len = $card_tail_len ? $card_tail_len : 4;
		$card_sections = $card_tail_len == 4 ? $card_sections - 1 : $card_sections;
		$hide_bank_card = str_repeat('**** ', $card_sections) . substr($bank_card , -1*$card_tail_len);
		return $hide_bank_card;
	}


    /**
     * 数据转码
     * @param unknown $str
     * @param unknown $code 目标编码
     * @return unknown
     */
    public function conversion_coding_new($str, $code){
        $encode = mb_detect_encoding($str, array('UTF-8','GBK','GB2312','BIG5','ASCII'));
        if($encode == $code or !$encode){
            return $str;
        }
        if(!is_string($str)){
            return $str;
        }
        return mb_convert_encoding($str, $code, $encode);
    }

    function get_app_version() {
        $version = $_SERVER['HTTP_USER_AGENT'];
        preg_match('/iOSApp/', $version, $isiOS);
        preg_match('/AndroidApp/', $version, $isAndroid);
        $isiOS = $isiOS ? $isiOS[0] : null;
        $isAndroid = $isAndroid ? $isAndroid[0] : null;
        $arr = array('app_type' => 'unknown','app_version' => 0);
        if ($isiOS) {
            preg_match('/Version[\d.]+/', $version, $app_version);
            $app_version = str_replace('.','',$app_version[0]);
            $app_version =  str_replace('Version','',$app_version);
            $arr['app_type'] = 'iOS';
            $arr['app_version'] = $app_version ? $app_version : 0;
        } else if ($isAndroid) {
            preg_match('/Version([\d.]+)/', $version, $app_version);
            $app_version = str_replace('.','',$app_version[1]);
            $app_version =  str_replace('Version','',$app_version);
            $arr['app_type'] = 'Android';
            $arr['app_version'] = $app_version ? $app_version : 0;
        }
        return $arr;
    }

    /**
     * 访问限制控制
     * @param string $controllerAction 控制器方法
     * @param number $limitTime 限制时间
     * @param number $limitNumber 限制次数
     */
    public function accessLimitControl($controllerAction, $limitTime = 60, $limitNumber = 60) {
    	$clientip = TyLib_Function::getInstance ()->getip ();
    	$memKey = '_accessLimitControl_KEY_' . $clientip . '_' . $controllerAction;
    	$exist_accessLimitControl_KEY = TyFunc_Cachefunc::getInstance ()->get ( $memKey );
    	if ($exist_accessLimitControl_KEY > $limitNumber) {
    		throw new Exception ( 'There is no user !', 404 );
    		exit ();
    	}
    	if ($exist_accessLimitControl_KEY) {
    		$countNnumber = $exist_accessLimitControl_KEY + 1;
    		TyFunc_Cachefunc::getInstance ()->set ( $memKey, $countNnumber, $limitTime );
    	} else {
    		$countNnumber = 1;
    		TyFunc_Cachefunc::getInstance ()->set ( $memKey, $countNnumber, $limitTime );
    	}
    }

    /**
     * 数字一万转换
     * 11050000 => 1105.00万
     */
    function conversion_ten_thousand($number)
    {
        if (!$number) {
            return 0;
        }
        if ($number <= 1000000) {
            return number_format($number, 2, '.', '');
        }

        $ten_thousand_number = number_format($number / 10000, 2, '.', '');

        return $ten_thousand_number . '万';
    }

    public function changeImg($imgPath){
        list ($sourceName, $width, $height, $is_full, $rotate, $watermark ) = explode ( "_", $imgPath );
        //判断是否是原始图片
        if($width){
            $imgInfo = pathinfo($imgPath);
            $oldImgPath = $sourceName.'.'.$imgInfo['extension'];
            //判断图片文件是否存在
            if(@fopen($oldImgPath, 'r' )) {
                //判断是pc还是h5
                $isMobile = self::isMobile();
                $imgData = getimagesize($oldImgPath);
                if($isMobile){
                    if($imgData[0] == $width){
                        return $imgPath;
                    }else{
                        return $sourceName.'_200_140_1'.'.'.$imgInfo['extension'];
                    }
                }else{
                    $oldImgInfo = pathinfo($oldImgPath);
                    if($imgData[0] > 400){
                        return $oldImgInfo['dirname'].'/'.$oldImgInfo['filename'].'_400_280_1.'.$oldImgInfo['extension'];
                    }else{
                        return $imgPath;
                    }
                }
            } else {
                return $imgPath;
            }
        }else{
            //判断图片文件是否存在
            if(@fopen($imgPath, 'r' )) {
                //判断是pc还是h5
                $isMobile = self::isMobile();

                //获取图片信息
                $imgInfo = pathinfo($imgPath);

                if($isMobile){
                    if($imgPath[0] == 200){
                        return $imgPath;
                    }else{
                        return $imgInfo['dirname'].'/'.$imgInfo['filename'].'_200_140_1.'.$imgInfo['extension'];
                    }
                }else{
                    //获取图片尺寸
                    $imgData = getimagesize($imgPath);
                    if($imgData[0] < 400){
                        return $imgPath;
                    }else{
                        return $imgInfo['dirname'].'/'.$imgInfo['filename'].'_400_280_1.'.$imgInfo['extension'];
                    }
                }
            } else {
                return $imgPath;
            }
        }
    }

    function isMobile() {
        // 如果有HTTP_X_WAP_PROFILE则一定是移动设备
        if (isset($_SERVER['HTTP_X_WAP_PROFILE'])) {
            return true;
        }
        // 如果via信息含有wap则一定是移动设备,部分服务商会屏蔽该信息
        if (isset($_SERVER['HTTP_VIA'])) {
            // 找不到为flase,否则为true
            return stristr($_SERVER['HTTP_VIA'], "wap") ? true : false;
        }
        // 脑残法，判断手机发送的客户端标志,兼容性有待提高。其中'MicroMessenger'是电脑微信
        if (isset($_SERVER['HTTP_USER_AGENT'])) {
            $clientkeywords = array('nokia','sony','ericsson','mot','samsung','htc','sgh','lg','sharp','sie-','philips','panasonic','alcatel','lenovo','iphone','ipod','blackberry','meizu','android','netfront','symbian','ucweb','windowsce','palm','operamini','operamobi','openwave','nexusone','cldc','midp','wap','mobile','MicroMessenger');
            // 从HTTP_USER_AGENT中查找手机浏览器的关键字
            if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
                return true;
            }
        }
        // 协议法，因为有可能不准确，放到最后判断
        if (isset ($_SERVER['HTTP_ACCEPT'])) {
            // 如果只支持wml并且不支持html那一定是移动设备
            // 如果支持wml和html但是wml在html之前则是移动设备
            if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
                return true;
            }
        }
        return false;
    }


    /**
     * 返回Json数据
     * @param unknown $code
     * @param array|string|int|bool $data
     * @param string $message
     * @throws Exception
     */
    public function returnJson($code, $data=array(), $message=''){
    	$code = intval($code);
    	// if(empty($message)){
    	// 	$message = TyLib_Error::getMsg($code);
    	// }

    	$returnData = array(
    			'code'=>$code,
    			'message'=>$message,
    			'data'=>$data
    	);
    	header("Content-type: application/json");
    	echo json_encode($returnData);
    	exit;
    }

	public function httpToHttps($url){

		if(substr_count($url,'http://') > 0){
			$url = str_replace('http://','https://',$url);
		}
		return $url;
	}
}