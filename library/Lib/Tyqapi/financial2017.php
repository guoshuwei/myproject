<?php
/**
 * 2017 518 活动
 * @author znz
 * 2017-02-08
 * UTF-8
 */
class TyLib_Tyqapi_financial2017 extends TyLib_Tyqapi_Base{
	
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_financial2017();
        }
        return self::$obj;
    }
    public function platformCard($userkey = null){
    	$data = array(
    		'userkey'	=> $userkey
    	);
    	return $this->getTyqData('/cpas/get_pre_platform', $data);
    }
    public function rankList($userkey = ''){
    	$data = array(
    		'userkey'	=> $userkey
    	);
    	//return json_decode('{"code":200,"message":"OK","data":{"people_num_rank_list":[{"source_uid":"1","total":"3","add_time":"1493002427","cuid":"821812"},{"source_uid":"123","total":1,"add_time":"1493001035","cuid":"132865","highlight":1}],"trade_num_rank_list":[{"source_uid":"1","total":1,"add_time":"1493002496","cuid":"821812"}],"current_user":{"source_uid":"123","trade_num":"0"}}}',true);
    	return $this->getTyqData('/activity/getImcRankList', $data);
    }
    public function rankListStep($step){
    	$data = array(
    		'step'	  => $step
    	);
    	//return json_decode('{"code":200,"message":"OK","data":{"rank_list":[{"source_uid":"172","total":7,"add_time":"1492851144"},{"source_uid":"123","total":3,"add_time":"1492772467"},{"source_uid":"6683","total":3,"add_time":"1492859359"},{"source_uid":"13","total":3,"add_time":"1493023681"},{"source_uid":"834","total":2,"add_time":"1492844214"}]}}',true);
    	return $this->getTyqData('/activity/getImcRankListStep', $data);
    }
    public function hotPlatform($num){
    	$data = array(
    		'num'	=> $num
    	);
    	return $this->getTyqData('/loan/get_short_loan_platform', $data);
    }
    public function trees($activity){
    	$data = array(
    			'activity' => $activity,
    	);
    	return $this->getTyqData('/activity/getactivitypool',$data);
    }
    public function card_status($userkey){
    	$data = array(
    			'userkey' => $userkey,
    	);
    	return $this->getTyqData('/card/get_current_card_status',$data);
    }
    public function max_rate(){
    	$data = array();
    	return $this->getTyqData('/loan/get_max_rate',$data);
    }
}