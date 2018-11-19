<?php
/**
 * 理财活动投友圈接口
 * 2017-03-22
 * UTF-8
 */
class TyLib_Tyqapi_topic extends TyLib_Tyqapi_Base {
	private static $obj = null;
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new TyLib_Tyqapi_topic ();
		}
		return self::$obj;
	}
	
	/**
	 * 获取专场平台的卡券是否领取
	 */
	public function get_platform_status($userkey) {
		$data = array (
				'userkey' => $userkey
		);
		return $this->getTyqData ( '/cpas/get_platform_status', $data );
	}
	
	/**
	 * 获取专场平台的卡券
	 */
	public function send_card($userkey, $activity) {
		$data = array (
				'userkey' => $userkey,
				'activity' => $activity
		);
		return $this->getTyqData ( '/cpas/send_card', $data );
	}
	
	/**
	 * 获取专场平台的标的
	 */
	public function getMajorClientLoans() {
		$data = array ();
		return $this->getTyqData ( '/loan/getMajorClientLoans', $data );
	}
	/**
	 * 2017 918 活动 插入预约爆款标接口
	 * @param unknown $userkey
	 * @param unknown $time
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function set_reserve($userkey, $time){
		$data = array(
			'userkey'		=> $userkey,
			'reserveTime'	=> $time
		);
		return $this->getTyqData('/activity/reserveHot', $data);
	}
	/**
	 * 查询用记账信息
	 * @param unknown $userkey
	 * @param unknown $pid
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function get_automatic($userkey, $pid, $tyname){
		$data = array(
			'userkey'	=> $userkey,
			'typid'		=> $pid,
			'tyname'		=> $tyname
		);
		return $this->getTyqData('/activity/getAutomaticJz', $data);
	}
	/**
	 * 2017 918 获取用户投资记录
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function get_invest918($userkey, $type = 'Award17918'){
		$data = array(
			'userkey'	=> $userkey,
			'type'		=> $type
		);
		//return json_decode('{"code":200,"message":"OK","data":[{"id":"114","trade_id":"541732","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1400.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505272271","add_interest_time":"1505306850","add_time":"1505220451","last_redirect_type":"2","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"114","trade_id":"541732","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1400.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505272271","add_interest_time":"1505306850","add_time":"1505220451","last_redirect_type":"2","tuid":"376121","level":"0","type":"Award17918","reward":10},{"id":"112","trade_id":"541730","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1200.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"1","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505217860","add_time":"1505217860","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"111","trade_id":"541729","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1100.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"1","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505217635","add_time":"1505217635","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"110","trade_id":"541728","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1000.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"1","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505217258","add_time":"1505217258","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"109","trade_id":"541727","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1000.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505205139","add_time":"1505205139","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"108","trade_id":"541726","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"500.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505203834","add_time":"1505203835","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"107","trade_id":"541725","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"500.00","cash":"0.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505203267","add_time":"1505203267","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20}]}',true);
		return $this->getTyqData('/Activity/get918List', $data);
	}
	/**
	 * 2017 1018 获取用户投资记录
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function get_invest($userkey, $type = 'Award171018'){
		$data = array(
				'userkey'	=> $userkey,
				'type'		=> $type
		);
		//return json_decode('{"code":200,"message":"OK","data":[{"id":"114","trade_id":"541732","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1400.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505272271","add_interest_time":"1505306850","add_time":"1505220451","last_redirect_type":"2","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"114","trade_id":"541732","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1400.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505272271","add_interest_time":"1505306850","add_time":"1505220451","last_redirect_type":"2","tuid":"376121","level":"0","type":"Award17918","reward":10},{"id":"112","trade_id":"541730","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1200.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"1","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505217860","add_time":"1505217860","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"111","trade_id":"541729","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1100.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"1","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505217635","add_time":"1505217635","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"110","trade_id":"541728","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1000.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"1","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505217258","add_time":"1505217258","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"109","trade_id":"541727","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"1000.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505205139","add_time":"1505205139","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"108","trade_id":"541726","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"500.00","cash":"100.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505203834","add_time":"1505203835","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20},{"id":"107","trade_id":"541725","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"500.00","cash":"0.00","is_first":"0","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505201336","add_interest_time":"1505203267","add_time":"1505203267","last_redirect_type":"7","tuid":"376121","level":"0","type":"Award17918","reward":20}]}',true);
		return $this->getTyqData('/activity/getActivityList', $data);
	}
	/**
	 * 查看自动同步记账的红包
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getAutosyncRed($userkey){
		$data = array(
			'userkey'	=> $userkey
		);
		return $this->getTyqData('/invest/getAutosyncRed', $data);
	}
	/**
	 * 20171218 活动获取投资额外奖励
	 * @param unknown $userkey
	 * @param string $type
	 */
	public function reward($userkey, $type = 'Award171018'){
		$data = array(
				'userkey'	=> $userkey,
				'type'		=> $type
		);
		//return json_decode('{"code":200,"message":"OK","data":{"sum_reward_coupon":"20.00"}}',true);
		return $this->getTyqData('/activity/getActivityReward', $data);
	}
}