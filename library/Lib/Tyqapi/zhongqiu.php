<?php
/**
 * 理财中秋活动投友圈接口
 * @author znz
 * 2016-08-31
 * UTF-8
 */
class TyLib_Tyqapi_zhongqiu extends TyLib_Tyqapi_Base{
	
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_zhongqiu();
        }
        return self::$obj;
    }
    /**
	 * 获取活动统计（总投资和总人数）
	 */
	public function getActivityStatistics($activity){
		$data = array(
			'activity' => trim($activity)
		);
		return $this->getTyqData('/loan/getActivityStatistics', $data);
	}
	/**
	 * 专场标
	 * @param number $member_num
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getMajorLoans($page, $member_num = 4){
		$data =array(
			'rn' => $member_num,
		    'pn' => $page
		);
		return $this->getTyqData('/loan/getMajorLoans', $data);
	}
	/**
	 * 普通标
	 */
	public function getNormalLoans(){
		$data = array();
		return $this->getTyqData('/loan/getNormalLoans', $data);
	}
	/**
	 * 获取所有专场平台
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getTomorrowMajorPlatforms(){
		$data = array();
		return $this->getTyqData('/loan/getTomorrowMajorPlatforms', $data);
	}
	/**
	 * 获取我的中秋礼金
	 */
	public function getActivityMemberCoupon($activity, $userkey){
		$data = array(
			'activity'   => $activity,
		    'userkey'    => $userkey
		);
		return $this->getTyqData('/cpas/getActivityMemberCoupon', $data);
	}
	/**
	 * 获取我的投资纪录
	 */
	public function getUserActivityTrade($activity, $userkey, $pn, $rn = 10){
	    $data = array(
	        'activity'   => $activity,
	        'userkey'    => $userkey,
	        'pn'         => $pn,
	        'rn'         => $rn
	    );
	    //return json_decode('{"code":"200","message":"OK","data":{"trade_list":[{"id":"101583","cid":"16","status":"\u5df2\u8d77\u606f","amount":"1000.00","cname":"\u4eba\u4eba\u8d37","trade_time":"1471950067","name":"\u4e13\u573a\u6807\u6d4b\u8bd53","loan_id":"16082203","is_new_first":"\u5426","type":"\u666e\u901a\u6807\u7684"},{"id":"101586","cid":"16","status":"\u5df2\u8d77\u606f","amount":"1000.00","cname":"\u4eba\u4eba\u8d37","trade_time":"1471950067","name":"\u4e13\u573a\u6807\u6d4b\u8bd54","loan_id":"16082204","is_new_first":"\u5426","type":"\u666e\u901a\u6807\u7684"},{"id":"101606","cid":"993","status":"\u5df2\u8d77\u606f","amount":"1000.00","cname":"\u77ed\u878d\u7f51","trade_time":"1472118963","name":"\u77ed\u878d\u7f51","loan_id":"16082501","is_new_first":"\u5426","type":"\u666e\u901a\u6807\u7684"},{"id":"101593","cid":"1245","status":"\u5df2\u8d77\u606f","amount":"1000.00","cname":"\u535a\u91d1\u8d37","trade_time":"1471955668","name":"\u535a\u91d1\u8d37\u6d4b\u8bd52","loan_id":"16082303","is_new_first":"\u5426","type":"\u666e\u901a\u6807\u7684"}],"has_more":1}}',true);
	    return $this->getTyqData('/cpas/getUserActivityTrades', $data);
	}
	/**
	 * 活动红包纪录
	 * @param unknown $activity
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getActivityCombineCoupons($activity, $userkey){
	    $data = array(
	        'activity' => $activity,
	        'userkey'  => $userkey
	    );
	    //return json_decode('{"code":"200","message":"OK","data":[{"amount":"9.00","major_platform":"\u4eba\u4eba\u8d37","second_platform":"\u7231\u623f\u7b79","second_loan_id":"75143","second_loan_name":"\u666e\u901a\u6807\u6d4b\u8bd51"},{"amount":"9.00","major_platform":"\u535a\u91d1\u8d37","second_platform":"\u535a\u91d1\u8d37","second_loan_id":"75144","second_loan_name":"\u535a\u91d1\u8d37\u6d4b\u8bd51"}]}',true);
	    return $this->getTyqData('/cpas/getActivityCombineCoupons', $data);
	}
	/**
	 * 江湖救急领取优惠券接口
	 * @param unknown $activity
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function jhjjSendCard($userkey){
		$data = array(
				'userkey'  => $userkey
		);
		//return json_decode('{"code":"200","message":"OK","data":[{"amount":"9.00","major_platform":"\u4eba\u4eba\u8d37","second_platform":"\u7231\u623f\u7b79","second_loan_id":"75143","second_loan_name":"\u666e\u901a\u6807\u6d4b\u8bd51"},{"amount":"9.00","major_platform":"\u535a\u91d1\u8d37","second_platform":"\u535a\u91d1\u8d37","second_loan_id":"75144","second_loan_name":"\u535a\u91d1\u8d37\u6d4b\u8bd51"}]}',true);
		return $this->getTyqData('/cpas/jhjjSendCard', $data);
	}
}