<?php
/**
 * 现金券投友圈接口
 * @author znz
 * 2016-08-31
 * UTF-8
 */
class TyLib_Tyqapi_coupon extends TyLib_Tyqapi_Base{
	
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_coupon();
        }
        return self::$obj;
    }
    /**
	 * 发送红包接口
	 * @param unknown $amount
	 * @param string $activity
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function sendCoupon($userkey, $amount, $activity = 'tyjnh', $pname = '', $relieveRestriction = false, $coupon_name = ''){
		
		$data = array(
				'amount'	=> $amount,
				'activity'	=> $activity,
				'userkey'	=> $userkey,
                'pname'     => $pname,
                'relieveRestriction'     => $relieveRestriction,
                'coupon_name'     => $coupon_name,
		);
		$api_arr = array(
			'/member/send_coupon',
            '/member/send_coupon_assist_one',
            '/member/send_coupon_assist_two',
            '/member/send_coupon_assist_three',
		);
		//随机挑选一个接口使用
		$api = $api_arr[array_rand($api_arr,1)];
		return $this->getTyqData($api, $data);
	}
	public function sendCard($userkey, $activity, $card_id = null, $amount = null, $pid = null,$terminal_type = 6){
		
		$data = array(
			'userkey'	=> $userkey,
			'activity'	=> $activity,
			'amount'	=> $amount,
			'pid'		=> $pid,
			'card_id'	=> $card_id,
            'terminal_type'=>$terminal_type,
			'microtime'	=> microtime(true),
		);
		return $this->getTyqData('/member/send_gift', $data);
	}

	/**
	 * 发放新手福利红包28.88
	 */
	public function newcomerTask($userkey, $order_id) {
		$data = array(
				'userkey'	=> $userkey,
				'order_id'	=> $order_id
		);
		return $this->getTyqData('/Activity/newcomerTask', $data);
	}

	/**
	 * 发放新手福利红包58
	 */
	public function newcomerTask2($userkey, $order_id) {
		$data = array(
			'userkey'	=> $userkey,
			'order_id'	=> $order_id
		);
		return $this->getTyqData('/Activity/newcomerTask2', $data);
	}

	//调用swoole发送红包
	public function newSendCoupon($userkey, $amount, $activity = 'coupon170718'){

		$data = array(
			'amount'	=> $amount,
			'activity'	=> $activity,
			'userkey'	=> $userkey,
			'microtime'	=> microtime(true),
		);
		return $this->getNewTyqData('coupon', $data);
	}

}