<?php
/**
 * 理财直投标
 */
class TyLib_Tyqapi_loans extends TyLib_Tyqapi_Base {
	private static $obj = null;
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new TyLib_Tyqapi_loans ();
		}
		return self::$obj;
	}
	
	/**
	 * 校验用户是否首投
	 */
	public function is_first($userkey, $loanID) {
		$data = array (
				'userkey' => $userkey,
				'id' => $loanID
		);
		return $this->getTyqData ( '/cpas/is_first', $data );
	}
	
	/**
	 * 可用直投卡劵数量和列表
	 * @param string $userkey 用户userkey
	 * @param int $loanID 天眼标的id
	 * @param int $is_new 新老用户区分
	 */
	public function get_loan_use_card($userkey, $loanID, $is_new) {
		$is_new = $is_new == 1 ? 1 : 2;
		$data = array (
				'userkey' => $userkey,
				'id' => $loanID,
				'is_new' => $is_new
		);
		return $this->getTyqData ( '/cpas/get_loan_use_card', $data );
	}
	
	/**
	 * 计算器
	 */
	public function calculator($userkey, $amount, $loanID, $is_new, $is_mobile = 0) {
		$data = array (
				'userkey' => $userkey,
				'amount' => $amount,
				'id' => $loanID,
				'is_new' => $is_new,
				'is_mobile' => $is_mobile
		);
		return $this->getTyqData ( '/cpas/calculator', $data );
	}


    public function get_loans_num($userkey,$pid)
    {
        $data = array(
            'userkey'=>$userkey,
            'pid' => $pid,
        );

        return $this->getTyqData('/loan/get_loans_num', $data);
    }
}