<?php
/**
 * 理财18常规活动投友圈接口
 * 2018-01-10
 * UTF-8
 */
class TyLib_Tyqapi_welfare extends TyLib_Tyqapi_Base {
	private static $obj = null;
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new TyLib_Tyqapi_welfare ();
		}
		return self::$obj;
	}
	/**
	 * 预约18活动奖励翻倍
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function makeReservation($userkey){
		$data = array(
			'userkey'	=> $userkey
		);
		return $this->getTyqData('/activity/makeReservation', $data);
	}
	/**
	 * 获取当前用户预约列表
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getReservationRecords($userkey){
		$data = array(
			'userkey'	=> $userkey
		);
		//return json_decode('{"code":200,"message":"success","data":[{"id":20,"tuid":417264,"cuid":309384,"mobile":18612777784,"year":2018,"month":7,"created_time":1515140724},{"id":19,"tuid":417264,"cuid":309384,"mobile":18612777784,"year":2018,"month":6,"created_time":1515140724},{"id":18,"tuid":417264,"cuid":309384,"mobile":18612777784,"year":2018,"month":5,"created_time":1515140724}]}',true);exit;
		return $this->getTyqData('/activity/getReservationRecords', $data);
	}
	/**
	 * 获取预约列表
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getReservationList($query,$limit,$orderBy){
		$data = array(
		    'query'=>json_encode($query),
            'order'=>json_encode($orderBy),
            'limit'=>$limit
        );
		//return json_decode('{"code":200,"message":"success","data":[{"id":20,"tuid":417264,"cuid":309384,"mobile":18612777784,"year":2018,"month":7,"created_time":1515140724},{"id":19,"tuid":417264,"cuid":309384,"mobile":18612777784,"year":2018,"month":6,"created_time":1515140724},{"id":18,"tuid":417264,"cuid":309384,"mobile":18612777784,"year":2018,"month":5,"created_time":1515140724}]}',true);exit;
        return $this->getTyqData('/activity/getReservationList', $data);
	}
	/**
	 * 获取当月预约名额数量
	 * @return mixed|Ambigous <boolean, Ambigous, mixed>
	 */
	public function getReservationNumbe(){
		$data = array();
		//return json_decode('{"code":200,"message":"","data":{"reservation_count":"2","total_count":100}}', true);
		return $this->getTyqData('/activity/getReservationNumber', $data);
	}
	public function getReservationStatus($userkey){
		$data = array(
			'userkey'	=> $userkey
		);
		//return json_decode('{"code":200,"message":"","data":{"status":"1"}}',true);
		return $this->getTyqData('/activity/getReservationStatus', $data);
	}
}