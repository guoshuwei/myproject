<?php
/**
 * 现金券投友圈接口
 * @author znz
 * 2016-08-31
 * UTF-8
 */
class TyLib_Tyqapi_licaiminecenter extends TyLib_Tyqapi_Base{
    
    private static $obj= null;
    
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new TyLib_Tyqapi_licaiminecenter();
        }
        return self::$obj;
    }
    /**
     * 获取现金红包
     * @param unknown $status
     * @param string $pn
     * @param string $rn
     * @return Ambigous <boolean, Ambigous, unknown>
     */
    public function getMemberCouponList($userkey, $status, $pn,$rn){
        
        $data = array(
                'status'    => $status,
                'pn'    => $pn,
                'rn'    => $rn,
                'userkey'   => $userkey
        );
        return $this->getTyqData('/cpas/getMemberCouponList',$data);
    }
    /**
     * 获取直投奖励列表
     * @param unknown $status
     * @param string $pn
     * @param string $rn
     * @return Ambigous <boolean, Ambigous, unknown>
     */
    public function getMarketingCashListByStatusUid($userkey, $status, $pn,$rn){
        $data = array(
            'status'    => $status,
            'pn'    => $pn,
            'rn'    => $rn,
            'userkey'   => $userkey
        );
        return $this->getTyqData('/cpas/getMarketingCashListByStatusUid',$data);
    }
    /**
     * 获取未领取直投奖励总额
     * @return Ambigous <boolean, Ambigous, unknown>
     */
    public function getNotReceiveSumMarketingCash($userkey){
        $data = array(
            'userkey'   => $userkey
        );
        return $this->getTyqData('/cpas/getNotReceiveSumMarketingCash',$data);
    }
    /**
     * 使用返现红包
     * @return Ambigous <boolean, Ambigous, unknown>
     */
    public function useCoupon($id,$userkey,$terminal_type){
        $data = array(
            'id'   => $id,
            'userkey'   => $userkey,
            'terminal_type' => $terminal_type,
        );
        return $this->getTyqData('/cpas/useCoupon',$data);
    }
    /**
     * 直投奖励和现金红包可使用数量统计
     * @return Ambigous <boolean, Ambigous, unknown>
     */
    public function getCouponCashNum($userkey){
        $data = array(
            'userkey'   => $userkey
        );
        return $this->getTyqData('/cpas/getCouponCashNum',$data);
    }
    /**
     * 直投奖励和现金红包可使用数量统计
     * @return Ambigous <boolean, Ambigous, unknown>
     */
    public function newBindList($userkey,$pn,$rn,$order_bind,$order_first){
        $data = array(
            'userkey'   => $userkey,
            'pn'=>$pn,
            'rn'=>$rn,
            'order_bind'=>$order_bind,
            'order_first'=>$order_first,

        );
        return $this->getTyqData('/cpas/newBindList',$data);
    }
    /**
     * 理财记账３条记录
     * @return Ambigous <boolean, Ambigous, unknown>
     */
    public function getAliveBase($userkey,$pn,$rn){
       $data = array(
            'userkey' => $userkey,
            'pn'    => $pn,
            'rn'    => $rn
        );
        return $this->getTyqData('/invest/getAliveBase',$data);
    }
    
    /**
     * 可使用奖励订单
     */
    public function get_activate_trades($userkey, $page_index) {
        $data = array (
                'userkey' => $userkey,
                'pn' => $page_index
        );
        return $this->getTyqData ( '/cpas/get_activate_trades', $data );
    }
    
    /**
     * 可使用奖励订单
     */
    public function trade_info($userkey, $order_id) {
        $data = array (
                'userkey' => $userkey,
                'id' => $order_id
        );
        return $this->getTyqData ( '/cpas/trade_info', $data );
    }
    
    /**
     * 未使用卡劵
     */

    public function get_valid_card($userkey, $page,$type,$pagesize,$new_limit=1,$first_limit=1
) {
        $data = array (
                'userkey' => $userkey,
                'pn' => $page,
                'order' => $type,
                'rn' => $pagesize,
                'new_limit' => $new_limit,
                'first_limit' => $first_limit
        );
        return $this->getTyqData ( '/cpas/get_valid_card', $data );
    }
    
    /**
     * 已失效卡劵
     * $status 空 - 全部 2 - 已使用 3 - 已过期
     */
    public function get_invalid_card($userkey, $page, $pagesize, $status = '') {
        $data = array (
                'userkey' => $userkey,
                'pn' => $page,
                'rn' => $pagesize,
        		'status' => $status
        );
        return $this->getTyqData ( '/cpas/get_invalid_card', $data );
    }
    
    /**
     * 使用卡劵
     * @param string $userkey 用户userkey
     * @param int $id 卡券id
     */
    public function card_info($userkey, $id) {
        $data = array (
                'userkey' => $userkey,
                'id' => $id
        );
        return $this->getTyqData ( '/cpas/card_info', $data );
    }
    
    /**
     * 使用卡劵
     * @param string $userkey 用户userkey
     * @param int $id 卡券id
     */
    public function use_card($userkey, $id,$terminal_type = 6) {
        $data = array (
            'userkey' => $userkey,
            'id' => $id,
            'terminal_type' => $terminal_type,
        );
        return $this->getTyqData ( '/cpas/use_card', $data );
    }
    
    /**
     * 使用卡劵
     * @param string $userkey 用户userkey
     * @param int $id 卡券id
     */
    public function get_activate_trade_num($userkey, $id) {
        $data = array (
                'userkey' => $userkey,
                'id' => $id
        );
        return $this->getTyqData ( '/cpas/get_activate_trade_num', $data );
    }
    
    /**
     * 请选择直投卡劵列表
     * @param string $userkey 用户userkey
     * @param int $id 订单id
     */
    public function get_card($userkey, $order_id,$terminal_type = 6) {
        $data = array (
                'userkey' => $userkey,
                'id' => $order_id,
                'terminal_type' => $terminal_type
        );
        return $this->getTyqData ( '/cpas/get_card', $data );
    }
    
    /**
     * 订单和卡劵绑定接口
     * @param string $userkey 用户userkey
     * @param int $id 卡券id
     * @param int $order_id 订单id
     */
    public function match_card($userkey, $id, $order_id) {
        $data = array (
                'userkey' => $userkey,
                'id' => $id,
                'order_id' => $order_id
        );
        return $this->getTyqData ( '/cpas/match_card', $data );
    }
    
    /**
     * 获取未读直投卡劵数量
     * @param string $userkey
     * @param int $access_time
     */
    public function getValidCardTotal($userkey, $access_time) {
        $data = array (
                'userkey' => $userkey,
                'access_time' => $access_time
        );
        return $this->getTyqData ( '/cpas/getValidCardTotal', $data );
    }
    
    /**
     * 获取领取的奖励
     * @param string $userkey
     * @param int $access_time
     */
    public function getLastUsedCardInfo($userkey, $access_time) {
        $data = array (
                'userkey' => $userkey
        );
        return $this->getTyqData ( '/cpas/getLastUsedCardInfo', $data );
    }
    
    /**
     * 定期：计算收益估算
     */
    public function getInvestCalculation($userkey, $receive_data) {
    	$data = array (
    			'userkey' => $userkey,
                'investData' => json_encode($receive_data)
    	);
    	return $this->getTyqData ( '/invest/getInvestCalculation', $data );
    }
    
    /**
     * 定期：保存/修改
     */
    /* public function addLoan($userkey, $access_time) {
    	$data = array (
    			'userkey' => $userkey
    	);
    	return $this->getTyqData ( '/invest/addLoan', $data );
    } */
    
    /**
     * 定期：模板列表接口
     */
    public function getTplList($userkey, $company_id) {
    	$data = array (
    			'userkey' => $userkey,
    			'company_id' => $company_id
    	);
    	return $this->getTyqData ( '/invest/getTplList', $data );
    }
    
    /**
     * 定期：删除模板接口
     */
    public function delTpl($userkey, $tpl_id) {
    	$data = array (
    			'userkey' => $userkey,
    			'id' => $tpl_id
    	);
    	return $this->getTyqData ( '/invest/delTpl', $data );
    }
    
    /**
     * 定期：通过平台名称获取平台id接口
     */
    /* public function getCompany($userkey, $companyName) {
    	$data = array (
    			'userkey' => $userkey,
    			'companyName' => $companyName
    	);
    	return $this->getTyqData ( '/invest/getCompany', $data );
    } */
    
    /**
     * 通过平台id获取平台名称的接口
     */
    public function getCompanyInfoById($userkey, $id) {
    	$data = array (
    			'userkey' => $userkey,
    			'id' => $id
    	);
    	return $this->getTyqData ( '/invest/getCompanyInfoById', $data );
    }
    
    /**
     * 定期：获取还款方式
     */
    public function getPayWayList($userkey) {
    	$data = array (
    			'userkey' => $userkey
    	);
    	return $this->getTyqData ( '/invest/getPayWayList', $data );
    }
    
    /**
     * 活期：获取产品名称和对应的收益率接口
     */
    public function getAliveProductList($userkey, $company_id) {
    	$data = array (
    			'userkey' => $userkey,
    			'company_id' => $company_id
    	);
    	return $this->getTyqData ( '/invest/getAliveProductList', $data );
    }
    
    /**
     * 活期：保存接口
     */
    public function addAlive($userkey, $product_id, $amount, $start_time) {
    	$data = array (
    			'userkey' => $userkey,
    			'product_id' => $product_id,
    			'amount' => $amount,
    			'start_time' => $start_time,
    	);
    	return $this->getTyqData ( '/invest/addAlive', $data );
    }

    //投友圈系统通知
    public function getTyqSystemMessage($userkey,$page = 1,$limit = 20,$start_time = '',$end_time = ''){
        $data = array(
            'userkey' => $userkey,
            'page' => $page,
            'limit' => $limit,
            'start_time' => $start_time,
            'end_time' => $end_time
        );
        return $this->getTyqData('/common/systemNotice',$data);
    }

    //投友圈未读系统通知数目
    public function getTyqSystemMessageNum($userkey,$start_time = '',$end_time = ''){
        $data = array(
            'userkey' => $userkey,
            'start_time' => $start_time,
            'end_time' => $end_time
        );
        return $this->getTyqData('/common/systemNoticeNum',$data);
    }

    /**
     *根据orderid获取直投奖励来源
     */
    public function getRewardInfo($userkey,$order_id){
        $data = array(
            'userkey' => $userkey,
            'order_id' => $order_id
        );
        return $this->getTyqData('/card/getRewardInfo',$data);
    }

    /**
     *交易记录的详情
     */
    public function getTradeCardInfo($userkey,$card_type,$card_id){
        $data = array(
            'userkey' => $userkey,
            'card_type' => $card_type,
            'card_id' => $card_id
        );
        return $this->getTyqData('/card/getTradeCardInfo',$data);
    }
	
	/**
     *请求账户的交易记录
     */
    public function getAccountChangeList($userkey){
    	$data = array(
    			'userkey' => $userkey
    	);
    	return $this->getTyqData('/member/getAccountChangeList',$data);
    }
}