<?php
/**
 * 小天游乐园投友圈接口
 * @author znz
 * 2016-08-31
 * UTF-8
 */
class TyLib_Tyqapi_amusementpark extends TyLib_Tyqapi_Base{
	
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_amusementpark();
        }
        return self::$obj;
    }
    /**
     * 投友圈投标记录
     * @return Ambigous <boolean, Ambigous, mixed>
     */
    public function gettrades(){
        $data = array(
            'activity' => 'award201711'
        );
        return $this->getTyqData('/cpas/gettrades', $data);
    }
    /**
     * 获取投友圈注册记录
     */
    public function getregisterlist(){
        $data = array(
            'activity' => 'pushmobile1610'
        );
        return $this->getTyqData('/cpas/get_push_mobile', $data);
    }
    
    /**
     * 获取双十一用户投资记录
     * @param unknown $userkey
     * @param unknown $activity
     * @param number $page
     * @param number $pagesize
     */
    public function activityTrade($userkey, $activity = 'singleday1611', $page = 1, $pagesize = 4){
    	$data = array(
    			'page' => $page,
    			'pagesize' => $pagesize,
    			'activity' => $activity,
    			'userkey'  => $userkey
    	);
    	//return json_decode('{"code":"200","message":"OK","data":[{"aid":"46","uid":"37","trade_id":"151935","trade_amount":"20000.00","cash":"0.00","trade_time":"1478404748","add_interest_time":"1478406247","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"0","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"},{"aid":"46","uid":"37","trade_id":"151934","trade_amount":"20000.00","cash":"0.00","trade_time":"1478404748","add_interest_time":"1478406010","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"0","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"},{"aid":"46","uid":"37","trade_id":"151933","trade_amount":"20000.00","cash":"0.00","trade_time":"1478404748","add_interest_time":"1478404968","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"0","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"},{"aid":"46","uid":"37","trade_id":"151932","trade_amount":"20000.00","cash":"0.00","trade_time":"1478404748","add_interest_time":"1478404964","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"0","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"},{"aid":"46","uid":"37","trade_id":"151931","trade_amount":"20000.00","cash":"0.00","trade_time":"1478404748","add_interest_time":"1478404926","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"0","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"},{"aid":"46","uid":"37","trade_id":"151930","trade_amount":"20000.00","cash":"0.00","trade_time":"1478404748","add_interest_time":"1478404921","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"0","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"},{"aid":"46","uid":"37","trade_id":"151929","trade_amount":"20000.00","cash":"0.00","trade_time":"1478404748","add_interest_time":"1478404835","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"0","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"},{"aid":"46","uid":"37","trade_id":"151927","trade_amount":"3052.00","cash":"0.00","trade_time":"1478247161","add_interest_time":"1478248179","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"0","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"},{"aid":"46","uid":"37","trade_id":"151926","trade_amount":"3052.00","cash":"6.44","trade_time":"1478247161","add_interest_time":"1478247327","cid":"959","typid":"827","tuid":"37","cuid":"20427","mobile":"18387481363","send_type":"1","loan_name":"\u666e\u901a\u6807","pname":"\u5408\u62cd\u5728\u7ebf"}]}',true);
    	return $this->getTyqData('/member/get_activity_trade', $data);
    }
    /**
     * 获取双十一活动平台
     * @param number $num
     */
    public function activityPlatform($num = 6){
    	$data = array(
    			'num' => $num
    	);
    	return $this->getTyqData('/loan/get_rank_loans', $data);
    }
    /**
     * 获取双十一活动资金池数据
     * @param string $activity
     * @return Ambigous <boolean, Ambigous, mixed>
     */
    public function activityPool($activity = 'singleday1611'){
    	$data = array(
    			'activity' => $activity
    	);
    	return $this->getTyqData('/loan/get_activity_pool', $data);
    }
    /**
     * 获取活动投资动态
     * @param string $activity
     * @return Ambigous <boolean, Ambigous, mixed>
     */
    public function activitytimely($activity = 'singleday1611'){
    	$data = array(
    			'activity' => $activity
    	);
    	//return json_decode('{"code":200,"message":"SUCCESS","data":[{"id":"125684","amount":"50.00","trade_time":"1470843075","pname":"\u535a\u91d1\u8d37","mobile":"13202294707"},{"id":"125680","amount":"1000.00","trade_time":"1470842631","pname":"\u5408\u76d8\u8d37 ","mobile":"18174700662"},{"id":"125675","amount":"500.00","trade_time":"1470842363","pname":"\u871c\u8702\u6709\u94b1","mobile":"15527753897"},{"id":"125674","amount":"2000.00","trade_time":"1470842197","pname":"\u871c\u8702\u6709\u94b1","mobile":"15527753897"},{"id":"125673","amount":"9500.00","trade_time":"1470842171","pname":"\u4eca\u65e5\u6377\u8d22","mobile":"13301160199"},{"id":"125678","amount":"1000.00","trade_time":"1470842115","pname":"\u94b1\u6ee1\u4ed3","mobile":"13622411727"},{"id":"125677","amount":"1000.00","trade_time":"1470842086","pname":"\u94b1\u6ee1\u4ed3","mobile":"13622411727"},{"id":"125672","amount":"1000.00","trade_time":"1470841802","pname":"\u535a\u91d1\u8d37","mobile":"13202294707"},{"id":"125670","amount":"162.00","trade_time":"1470841448","pname":"\u6613\u901a\u8d37","mobile":"13489205430"},{"id":"125668","amount":"5000.00","trade_time":"1470841020","pname":"\u56fd\u8bda\u91d1\u878d","mobile":"15308736003"},{"id":"125666","amount":"1025.64","trade_time":"1470840858","pname":"\u534f\u4f17\u91d1\u878d","mobile":"18857793395"},{"id":"125665","amount":"100.00","trade_time":"1470840086","pname":"\u5e7f\u4fe1\u8d37","mobile":"18006963856"},{"id":"125664","amount":"1546.00","trade_time":"1470840018","pname":"\u6dfb\u7c73\u8d22\u5bcc","mobile":"15931137761"},{"id":"125659","amount":"5000.00","trade_time":"1470839404","pname":"\u56fd\u8bda\u91d1\u878d","mobile":"13707745262"},{"id":"125762","amount":"205.78","trade_time":"1470839256","pname":"\u79c1\u623f\u94b1","mobile":"13624652698"},{"id":"125656","amount":"500.00","trade_time":"1470839145","pname":"\u94b1\u6ee1\u4ed3","mobile":"18512177705"},{"id":"125650","amount":"2000.00","trade_time":"1470838612","pname":"\u871c\u8702\u6709\u94b1","mobile":"18117302422"},{"id":"125648","amount":"9000.00","trade_time":"1470838254","pname":"\u878d\u91d1\u6240","mobile":"13757153960"},{"id":"125645","amount":"430.00","trade_time":"1470838117","pname":"\u5e7f\u4fe1\u8d37","mobile":"13756096618"},{"id":"125641","amount":"1000.00","trade_time":"1470837810","pname":"\u4eba\u4eba\u805a\u8d22","mobile":"13751831267"}]}',true);
    	return $this->getTyqData('/cpas/get_trade_timely', $data);
    }
}