<?php
/**
 * 投友圈消息接口
 */
class TyLib_Tyqapi_brand11 extends TyLib_Tyqapi_Base {
	private static $obj = null;
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new TyLib_Tyqapi_brand11();
		}
		return self::$obj;
	}
	/**
	 * 获取记呗红包
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getJiBeiCoupon($userkey){
		$data = array(
			'userkey'	=> $userkey
		);
		//return json_decode('{"code":200,"message":"OK","data":{"list":{"fcode":{"id":"672572586114974901","cid":"30","uid":"119969","start_time":"1463816610","end_time":"1466408610","status":"2","aid":"88","aname":"F\u7801\u62bd\u5956","user_amount":"0.66","up_amount":"0.00","pid":"0","is_send":"0","add_time":"1509552000","local_id":"","coupon_name":""},"autosyncred":{"id":"672572586114908172","cid":"30","uid":"119969","start_time":"1463625615","end_time":"1466217615","status":"2","aid":"93","aname":"\u8bb0\u5457\u540c\u6b65\u8bb0\u8d26","user_amount":"0.28","up_amount":"0.00","pid":"0","is_send":"0","add_time":"1509552000","local_id":"","coupon_name":""},"jblogin":{"id":"672572586114908176","cid":"30","uid":"119969","start_time":"1463625619","end_time":"1466217619","status":"2","aid":"92","aname":"\u8bb0\u5457\u767b\u5f55","user_amount":"0.28","up_amount":"0.00","pid":"0","is_send":"0","add_time":"1509552000","local_id":"","coupon_name":""}},"total_amount":"1.22"}}',true);
		return $this->getTyqData('/activity/getJiBeiCoupon', $data);
	}
	/**
	 * 获取所有卡券平台
	 * @return mixed|Ambigous <boolean, Ambigous, mixed>
	 */
	public function platform_card($user_key){
		$data = array();
		if($user_key){
			$data['userkey'] = $user_key;
		}
		//return json_decode('{"code":200,"message":"SUCCESS","data":{"16":{"pid":"16","face_value":"300.00","min_amount":"15000.00","platform_name":"\u4eba\u4eba\u8d37","logo_img":"http:\/\/apanel.p2peye.com\/uploads\/platform_logo\/20171021-59eb1943697d8.png","min_period":"30","already_get":1},"2":{"pid":"2","face_value":"500.00","min_amount":"20000.00","platform_name":"\u5fae\u8d37\u7f51","logo_img":"http:\/\/apanel.p2peye.com\/uploads\/platform_logo\/20171021-59eb3d67dbad3.jpg","min_period":"60","already_get":1}}}',true);
		return $this->getTyqData('/card/getAllPlatformCards', $data);
	}
	/**
	 * 获取卡券详情页数据
	 */
	public function platform_single($pid, $userkey = null){
		$data = array(
			'userkey'	=> $userkey,
			'pid'		=> $pid
		);
		//return json_decode('{"code":200,"message":"SUCCESS","data":{"platform_name":"\u4eba\u4eba\u8d37","logo_img":"http:\/\/apanel.p2peye.com\/uploads\/platform_logo\/20171021-59eb1943697d8.png","max_face_value":"300.00","status":"2","platform_cards":{"4":{"id":"4","pid":16,"face_value":"200.00","min_amount":"10000.00","min_period":"1","rate":"12.24","activity_rate":732.24,"expire_time":1508860799,"is_receive":1,"can_be_received":2,"is_empty":2},"6":{"id":"6","pid":16,"face_value":"300.00","min_amount":"15000.00","min_period":"1","rate":"12.24","activity_rate":732.24,"expire_time":1508860799,"is_receive":2,"can_be_received":2,"is_empty":2},"9":{"id":"9","pid":16,"face_value":"50.00","min_amount":"1000.00","min_period":"2","rate":"12.24","activity_rate":912.24,"expire_time":1508860799,"is_receive":2,"can_be_received":2,"is_empty":2}}}}',true);
		return $this->getTyqData('/card/getSinglePlatformCards', $data);
	}
	/**
	 * 领取卡券
	 * @param unknown $pid
	 * @param unknown $card_id
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function receive_card($pid, $card_id, $userkey){
		$data = array(
			'pid'		=> $pid,
			'card_id'	=> $card_id,
			'userkey'	=> $userkey
		);
		return $this->getTyqData('/card/receivePlatformCards ', $data);
	}
	/**
	 * 投资列表
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function activity_list($userkey, $type = 'appcoupon201711'){
		$data = array(
			'userkey'	=> $userkey,
			'type'		=> $type
		);
		//return json_decode('{"code":200,"message":"OK","data":[{"id":"3","trade_id":"559640","cid":"2863","cname":"e\u878d\u6240","loan_name":"\u8f66e\u8d37\uff08\u62b5\u62bc1708695\uff09","amount":"500.00","cash":"2.50","is_first":"1","is_new":"1","is_hot":"0","period":"3","period_type":"1","trade_time":"1505667450","add_interest_time":"1505674829","add_time":"1505674829","last_redirect_type":"7","tuid":"119969","level":"0","percent":"1","type":"appcoupon201711","receive":"1","reward":0},{"id":"2","trade_id":"559639","cid":"56","cname":"\u82b1\u679c\u91d1\u878d","loan_name":"\u519c\u53cb\u5b9d02052\u53f7","amount":"500.00","cash":"3.49","is_first":"1","is_new":"1","is_hot":"0","period":"85","period_type":"2","trade_time":"1505667450","add_interest_time":"1505673787","add_time":"1505673787","last_redirect_type":"6","tuid":"119969","level":"0","percent":"1","type":"appcoupon201711","receive":"0","reward":0},{"id":"1","trade_id":"559638","cid":"767","cname":"\u679c\u6811\u8d22\u5bcc","loan_name":"\u679c\u6811\u4f18\u8f66\u8d37-\u6d1b\u963317081595","amount":"500.00","cash":"0.00","is_first":"0","is_new":"1","is_hot":"0","period":"1","period_type":"1","trade_time":"1505667450","add_interest_time":"1505673197","add_time":"1505673197","last_redirect_type":"2","tuid":"119969","level":"0","percent":"1","type":"appcoupon201711","receive":"1","reward":1}]}', true);
		return $this->getTyqData('/activity/getActivityList', $data);
	}
	/**
	 * 领券记录
	 * @param unknown $userkey
	 * @return mixed|Ambigous <boolean, Ambigous, mixed>
	 */
	public function my_card_list($userkey){
		$data = array(
			'userkey'	=> $userkey
		);
		//return json_decode('{"code":200,"message":"OK","data":[{"card_id":"4","add_time":"1508592157","status":"1","platform_name":"\u4eba\u4eba\u8d37","face_value":"200.00","min_amount":"10000.00"},{"card_id":"5","add_time":"1508727241","status":"1","platform_name":"\u5fae\u8d37\u7f51","face_value":"200.00","min_amount":"10000.00"}]}',true);
		return $this->getTyqData('/card/platformCardRecords', $data);
	}
	/**
	 * 特权金一期
	 * @param unknown $userkey
	 * @param string $activity
	 * @return mixed|Ambigous <boolean, Ambigous, mixed>
	 */
	public function funds($userkey = '', $activity = 'funds201711'){
		$data = array(
			'userkey'	=> $userkey,
			'activity'	=> $activity
		);
		//return json_decode('{"code": 200,"message": "SUCCESS","data": {"total_funds": "100000000.00","total_collected": "12400.00","user_collected": "1200.00","user_funds": 9677419.3548387,"user_bonus": 8749.45,"level": 1,"orders": []}}',true);
		//return json_decode('{"code": 200,"message": "SUCCESS","data": {"total_funds": "1000000000.00","total_collected": "12000.00","user_collected": "12000.00","user_funds": "12000.00","user_bonus": 0,"level": "2","orders": [{"id": 1,"cname": "\u4eba\u4eba\u8d37","amount": "12000.00","period": "3\u6708","is_new_first": 1,"trade_time": "1508935932","start_time": "1509004239","level": "2","bonus": "10.85"},{"id": 1,"cname": "\u4eba\u4eba\u8d37","amount": "12000.00","period": "3\u6708","is_new_first": 1,"trade_time": "1508935932","start_time": "1509004239","level": "2","bonus": "10.85"},{"id": 1,"cname": "\u4eba\u4eba\u8d37","amount": "12000.00","period": "3\u6708","is_new_first": 1,"trade_time": "1508935932","start_time": "1509004239","level": "2","bonus": "10.85"},{"id": 1,"cname": "\u4eba\u4eba\u8d37","amount": "12000.00","period": "3\u6708","is_new_first": 1,"trade_time": "1508935932","start_time": "1509004239","level": "2","bonus": "10.85"}]}}', true);
		return $this->getTyqData('/cpas/get_funds', $data);
	}
	
	public function funds_max($userkey, $activity = 'funds201711'){
		$data = array(
				'userkey'	=> $userkey,
				'activity'	=> $activity
		);
		//return json_decode('{"code": 200,"message": "SUCCESS","data": {"max_user_funds": 6000}}', true);
		return $this->getTyqData('/cpas/get_max_user_funds', $data);
	}
	/**
	 * app 判断标的是否可以加息
	 * @param unknown $userkey
	 * @param string $activity
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function coupon_total($userkey, $activity = 'appcoupon201711'){
		$data = array(
			'userkey'	=> $userkey,
			'activity'	=> $activity
		);
		return $this->getTyqData('/activity/getActivityCouponTotal', $data);
	}
}