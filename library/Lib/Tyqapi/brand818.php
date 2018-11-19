<?php
/**
 * 2017 818 活动
 * @author znz
 * 2017-8-8
 * UTF-8
 */
class TyLib_Tyqapi_brand818 extends TyLib_Tyqapi_Base{
	
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_brand818();
        }
        return self::$obj;
    }
    /**
     * V 等级数据
     * @param unknown $userkey
     * @return Ambigous <boolean, Ambigous, mixed>
     */
    public function v_level($userkey){
    	$data = array(
    		'userkey'	=> $userkey
    	);
    	//return array('data'	=> array('sum_amount' => 5000,'count_cid' => 1,'count_new_first' => 3,));
    	return $this->getTyqData('/activity/get818', $data);
    }
    /**
     * 获取投资列表数据
     */
    public function inves_list($userkey){
    	$data = array(
    			'userkey'=> $userkey,
    			'pn'		=> 1,
    			'rn'		=> 1000,
    	);
    	//return json_decode('{"code":200,"message":"OK","data":{"res_records":[{"id":"46","trade_id":"541700","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"500.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"1503127109","add_interest_time":"1503134746","add_time":"1503134746","tuid":"376121","level":"2"},{"id":"45","trade_id":"541699","cid":"16","cname":"\u4eba\u4eba\u8d37","loan_name":"\u4eba\u4eba","amount":"500.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"1503127109","add_interest_time":"1503127597","add_time":"1503127597","tuid":"376121","level":"2"},{"id":"44","trade_id":"541698","cid":"16","cname":"","loan_name":"","amount":"501.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"0","add_interest_time":"0","add_time":"1503127335","tuid":"376121","level":"2"},{"id":"43","trade_id":"541697","cid":"16","cname":"","loan_name":"","amount":"501.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"0","add_interest_time":"0","add_time":"1503127335","tuid":"376121","level":"2"},{"id":"42","trade_id":"541696","cid":"16","cname":"","loan_name":"","amount":"501.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"0","add_interest_time":"0","add_time":"1503127335","tuid":"376121","level":"2"},{"id":"41","trade_id":"541692","cid":"9","cname":"","loan_name":"","amount":"5000.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"0","add_interest_time":"0","add_time":"1502101565","tuid":"376121","level":"2"},{"id":"40","trade_id":"541691","cid":"8","cname":"","loan_name":"","amount":"5000.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"0","add_interest_time":"0","add_time":"1502101531","tuid":"376121","level":"2"},{"id":"39","trade_id":"541690","cid":"7","cname":"","loan_name":"","amount":"5000.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"0","add_interest_time":"0","add_time":"1502101504","tuid":"376121","level":"2"},{"id":"38","trade_id":"541689","cid":"6","cname":"","loan_name":"","amount":"5000.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"0","add_interest_time":"0","add_time":"1502101485","tuid":"376121","level":"2"},{"id":"37","trade_id":"541688","cid":"5","cname":"","loan_name":"","amount":"5000.00","cash":"0.00","is_first":"0","is_new":"1","period":"3","period_type":"1","trade_time":"0","add_interest_time":"0","add_time":"1502099410","tuid":"376121","level":"2"}]}}',true);
    	return $this->getTyqData('/activity/get818List', $data);
    }
    
}