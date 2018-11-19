<?php
/**
 * 投友圈消息接口
 */
class TyLib_Tyqapi_app extends TyLib_Tyqapi_Base {
	private static $obj = null;
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new TyLib_Tyqapi_app ();
		}
		return self::$obj;
	}
	
	/**
	 * 消息通知
	 */
	public function unread_notice($userkey){
		$data = array(
				'userkey'=> $userkey
		);
		return $this->getTyqData('/app/unread_notice', $data);
	}
	
	/**
	 * 投友圈后台系统消息
	 */
	public function system($userkey, $page){
		$data = array(
				'userkey'=> $userkey,
				'page' => $page
		);
		return $this->getTyqData('/app/system', $data);
	}
	
	/**
	 * 快到期的红包
	 */
	public function recent_coupon($userkey){
		$data = array(
				'userkey'=> $userkey
		);
		return $this->getTyqData('/app/recent_coupon', $data);
	}
	
	/**
	 * 新收到的红包
	 */
	public function receive_coupon($userkey){
		$data = array(
				'userkey'=> $userkey
		);
		return $this->getTyqData('/app/receive_coupon', $data);
	}
	
	/**
	 * cpas订单通知
	 */
	public function trade_notice($userkey, $page){
		$data = array(
				'userkey'=> $userkey,
				'page' => $page
		);
		return $this->getTyqData('/app/trade_notice', $data);
	}
	
	/**
	 * 所有的红包 近期待收 累计加息
	 */
	public function getMyCouponTotal($userkey){
		$data = array(
				'userkey'=> $userkey
		);
		return $this->getTyqData('/app/getMyCouponTotal', $data);
	}
	
	/**
	 * 卡券信息，交易记录详情中直投卡券的详情
	 */
	public function tradeCardInfo($userkey, $card_type, $card_id){
		$data = array(
				'userkey'=> $userkey,
				'card_type' => $card_type,
				'card_id' => $card_id
		);
		return $this->getTyqData('/app/tradeCardInfo', $data);
	}
	
	/**
     * 获取现金红包
     */
    public function coupon($userkey){
    	$data = array(
    			'userkey'   => $userkey
    	);
    	return $this->getTyqData('/app/coupon',$data);
    }
    
    /**
     * 标的详情
     */
    public function loanInfo($userkey,$id){
    	$data = array(
    			'userkey'   => $userkey,
    			'id' => $id
    	);
    	return $this->getTyqData('/app/loanInfo',$data);
    }
    
    /**
     * 使用红包
     */
    public function useCoupon($userkey, $id, $terminal_type){
    	$data = array(
    			'userkey'   => $userkey,
    			'id' => $id,
    			'terminal_type' => $terminal_type
    	);
    	return $this->getTyqData('/app/useFxCoupon',$data);
    }
    
    /**
     * 我的特权加息记录列表
     */
    public function myPlatformTradesList($userkey, $pn, $rn, $pid){
    	$data = array(
    			'userkey'   => $userkey,
    			'pn'   => $pn,
    			'rn' => $rn,
    			'pid' => $pid
    	);
    	return $this->getTyqData('/app/myPlatformTradesList',$data);
    }

	/**
	 *获取直投卡券详情
	 */
	public function cardCouponsInfo($userkey,$id){
		$data = array(
			'userkey'   => $userkey,
			'id'   => $id,
		);
		return $this->getTyqData('/app/cardCouponsInfo',$data);
	}

    /**
     *获取直投卡券详情
     */
    public function getCardInfo($userkey,$id){
        $data = array(
            'userkey'   => $userkey,
            'id'   => $id,
        );
        return $this->getTyqData('/app/getCardInfo',$data);
    }

	/**
	  *强制更新
	  */
	public function systemupdatetip($version,$application_type){
		$data = array(
			'version' => $version,
			'application_type' => $application_type
		);
		return $this->getTyqData('/app/systemupdatetip',$data);
	}
}