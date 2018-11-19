<?php
/**
 * @author znz
 * email:zhangnengzhi@p2peye.com
 * 2015-7-20
 * UTF-8
 */
class Lib_Api{
	
	private static $obj= null;
	private $token		= '61KTk4sC';
	private $appid		= 'p2peye';
	private $sendtime	= null;
	private $signkey	= null;
	private $urlPre		= 'http://soa.p2peye.com';
//	 private $urlPre		= 'http://open.touyouquan.com';
	private $retData	= array();
	private $codeArr	= array(500,503,4004,4005,4006);//非逻辑code统一处理
	private $timeout    = 3;
	/**
	 * 获取单例对象
	 * @param string $hl
	 * @param number $timeout
	 * @return TyLib_TyqApi
	 */
	public static function getInstance(){
		if(is_null(self::$obj)){
			self::$obj = new TyLib_TyqApi();
		}
		return self::$obj;
	}
	/**
	 * 设置timeout
	 */
	public function settimeout($seconds) {
		$this->timeout = $seconds;
		return $this;
	}
	/**
	 * 获取请求数据
	 * @param unknown $url
	 * @param unknown $parameter
	 * @return boolean|Ambigous <void, string, unknown>
	 */
	private function getTyqData($url, $parameter){
		if(!is_string($url)){
			return false;
		}
		$data = array(
				'token' 	=> $this->token,
				'appid'		=> $this->appid,
                'userip'    => TyLib_Function::getInstance()->getip(),
				'sendtime'	=> time() ,

		);
		
		$data = array_merge($data,$parameter);
		$this->getSignkey($data);
		$data['signkey'] = $this->signkey;
		unset($data['token']);
		$url = $this->urlPre.$url;
		$res = TyLib_Function::getInstance()->dfopen($url,0,http_build_query($data), '', FALSE, '', $this->timeout);
		$data = json_decode($res,true);
		if(in_array($data['code'], $this->codeArr, true) or empty($res) or !isset($data['code'])){
			//记录日志
			TyFunc_Log::write('TyqApi', $url.http_build_query($data), $res);
			//去错误页面
			throw new Exception('Request interface error !', 505);exit;
		}
		return $data;

	}

	/**
	 * 获取signkey
	 * @param unknown $data
	 */
	private function getSignkey($data){
		ksort($data);
		$this->signkey = md5(http_build_query($data));
	}
	/**
	 * 删除绑定信息
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function unbind($userkey){

		$data = array(
				'userkey'	=> $userkey
		);
		return $this->getTyqData('/user/unbind', $data);
	}
	/**
	 * 注册投友圈账号
	 * @param unknown $mobile
	 * @param unknown $uid
	 * @param unknown $userName
	 * @param unknown $tyqPassword
	 */
	public function setTyqRegister($mobile, $uid, $userName, $tyqPassword, $mobileCode , $channels = ''){

		$data = array(
				'mobile'	=> trim($mobile),
				'cuid'		=> trim($uid),
				'cuname'	=> trim($userName),
				'password'  => trim($tyqPassword),
				'code'		=> trim($mobileCode),
				'cupic'		=> trim($uid),
				'cuspace'	=> trim($uid),
				'channels'  => trim($channels),//增加参数：channels 子渠道
		);
		return $this->getTyqData('/user/reg', $data);
	}
	
	/**
	 * 绑定投友圈已有账号
	 * @param unknown $mobile
	 * @param unknown $uid
	 * @param unknown $name
	 * @param unknown $tyqPassword
	 */
	public function setTyqBinding($mobile, $uid, $userName, $tyqPassword, $channels = ''){
	    $userName=TyLib_Function::getInstance()->conversion_coding($userName,'UTF-8');
		$data = array(
				'mobile'	=> trim($mobile),
				'cuid'		=> trim($uid),
				'cuname'	=> trim($userName),
				'password'	=> trim($tyqPassword),
				'cupic'		=> trim($uid),
				'cuspace'	=> trim($uid),
				'channels'  => trim($channels),//增加参数：channels 子渠道
		);
		return $this->getTyqData('/user/bind', $data);
	}
	
	/**
	 * 获取按照上线时间、期限、加息排序的标的
	 */
	public function getloansLimit($limit) {
	    $data = array (
	        'limit' => $limit
	    );
	    return $this->getTyqData ( '/cpas/getloansLimit', $data );
	}
	
	/**
	 * 根据订单查询平台标相关信息
	 * @param unknown $userkey
	 * @param unknown $orderid
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getCardByOrderId($userkey,$orderid){
	    $data = array(
	        'userkey' => $userkey,
	        'order_id' => $orderid
	    );
	    return $this->getTyqData('/card/getCardByOrderId', $data);
	}
	
	/**
	 * 短信验证码绑定投友圈账号
	 * @param unknown $mobile
	 * @param unknown $uid
	 * @param unknown $name
	 * @param unknown $tyqPassword
	 */
	public function quickbind($mobile, $uid, $userName, $bindkey, $channels = ''){
		$userName=TyLib_Function::getInstance()->conversion_coding($userName,'UTF-8');
		$data = array(
				'mobile'	=> trim($mobile),
				'cuid'		=> trim($uid),
				'cuname'	=> trim($userName),
				'bindkey'	=> trim($bindkey),
				'cupic'		=> trim($uid),
				'cuspace'	=> trim($uid),
				'channels'  => trim($channels),//增加参数：channels 子渠道
		);
		return $this->getTyqData('/user/quickbind', $data);
	}
	/**
	 * 绑定投友圈账号
	 * @param unknown $mobile
	 * @param unknown $uid
	 * @param unknown $userName
	 * @param unknown $tyq_token
	 * @return boolean|Ambigous
	 */
	public function setTyqBindingToken($mobile, $uid, $userName, $tyq_token){
		$userName=TyLib_Function::getInstance()->conversion_coding($userName,'UTF-8');
		$data = array(
				'mobile'	=> trim($mobile),
				'cuid'		=> trim($uid),
				'cuname'	=> trim($userName),
				'tyqtoken'	=> trim($tyq_token),
				'cupic'		=> trim($uid),
				'cuspace'	=> trim($uid)
		);
		return $this->getTyqData('/user/tyqty_bind', $data);
	}
	
	/**
	 * 理财app的登陆接口
	 * @param unknown $mobile
	 * @param unknown $Password
	 * @param unknown $code
	 */
	public function licai_login($mobile, $Password, $code = ''){
	    $data = array(
	        'mobile'	=> trim($mobile),
	        'password'		=> trim($Password),
	        'code'	=> trim($code)
	    );
	    return $this->getTyqData('/user/licai_login', $data);
	}
	
	/**
	 * 理财app的注册接口
	 * @param unknown $mobile
	 * @param unknown $Password
	 * @param unknown $code
	 */
	public function licai_reg($mobile, $Password, $code = ''){
	    $data = array(
	        'mobile'	=> trim($mobile),
	        'password'		=> trim($Password),
	        'code'	=> trim($code)
	    );
	    return $this->getTyqData('/user/licai_reg', $data);
	}
	
	/**
	 * 理财app添加绑定接口
	 * @param unknown $mobile
	 * @param unknown $cuid
	 * @param unknown $cuname
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function licai_bind($mobile, $uid, $cuname){
	    $userName=TyLib_Function::getInstance()->conversion_coding($cuname,'UTF-8');
		$data = array(
				'mobile'	=> trim($mobile),
				'cuid'		=> trim($uid),
				'cuname'	=> trim($userName),
				'cupic'		=> trim($uid),
				'cuspace'	=> trim($uid)
		);
		return $this->getTyqData('/user/licai_bind', $data);
	}

	/**
	 * 新的天眼登录注册绑定接口
	 * @param $uid 天眼用户uid(必填)
	 * @param $cuname　天眼用户名(必填)
	 * @param string $mobile　天眼用户手机号(非必填)
	 * @return Ambigous|bool
	 * @throws Exception
	 */
	public function new_licai_bind($uid, $cuname, $mobile = ''){
		$userName=TyLib_Function::getInstance()->conversion_coding($cuname,'UTF-8');
		$data = array(
			'cuid'	    => trim($uid),
			'cuname'	=> trim($userName),
		);
		if($mobile){
			$data['mobile'] = trim($mobile);
		}
		return $this->getTyqData('/user/new_licai_bind', $data);
	}

	/** 同步跟新投友圈手机号
	 * @param $userkey
	 * @param $mobile
	 * @return Ambigous|bool
	 * @throws Exception
	 */
	public function synTyqMobile($userkey, $mobile){
		$data = array(
			'userkey'	=> $userkey,
			'mobile'	=> $mobile,
		);
		return $this->getTyqData('/member/verifyMobile', $data);
	}

    /**
     * 查询投友圈是否已存在账号
     * @param unknown $mobile
     */
    public function selectUser($uid, $mobile){

        $data = array(
            'mobile'	=> $mobile,
            'cuid'		=> $uid
        );
        return $this->getTyqData('/user/checkMobile', $data);
    }

    /**
     * 查询并同步投友圈绑定手机号
     * @param integer $uid
     * @param unknown $mobile
     */
    public function syncUser($uid, $mobile){

        $data = array(
            'mobile'	=> $mobile,
            'cuid'		=> $uid,
        );
        return $this->getTyqData('/user/checkSyncMobile', $data);
    }
	
	/**
	 * 实名认证
	 * @param unknown $userkeyddd
	 * @param unknown $realname
	 * @param unknown $sid
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function setTyqVerified($userkey, $realname, $sid){
		
		$data = array(
				'userkey'	=> $userkey,
				'realname'	=> $realname,
				'sid'		=> $sid
		);
		return $this->getTyqData('/member/checkRealname', $data);
	}
	
	/**
	 * 检查投友圈绑定
	 */
	public function checkBind($data) {
		$data = array(
				'cuname'	=> $data['cuname'],
				'password'	=> $data['password']
		);
		return $this->getTyqData('/user/checkBind', $data);
	}
	
	/**
	 * 校验手机号是否可以注册
	 */
	public function newCheckMobile($data) {
		$data = array(
				'mobile'	=> $data['mobile']
		);
		return $this->getTyqData('/user/newCheckMobile', $data);
	}
	
	/**
	 * 修改绑定用户名
	 */
	public function updateBindUsername($data) {
		$data = array(
				'userkey'	=> $data['userkey'],
				'username'	=> iconv('gbk', 'utf-8', $data['username'])
		);
		return $this->getTyqData('/member/updateBindUsername', $data);
	}
	
	/**
	 * 获取用户信息
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function getUserInfo($userkey, $clear = false){
	    $memkey = 'TyqApi_licai_userinfo_' . $userkey;
	    if(!$clear){
	        $res = TyFunc_Cachefunc::getInstance()->get($memkey);
	        if(!empty($res)){
	            return $res;
	        }
	    }
	    $data = array(
				'userkey'	=> $userkey
		);
		$res = $this->getTyqData('/member/getinfo', $data);
		if(empty($res['data']) or $res['code'] != 200){
		    return array();
		}
		TyFunc_Cachefunc::getInstance()->set($memkey, $res, 600);
		return $res;
	}
	/**
	 * 获取用户信息
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function newGetUserInfo($userkey, $clear = false){
	    $memkey = 'TyqApi_licai_newuserinfo_' . $userkey;
        if(!$clear){
            $res = TyFunc_Cachefunc::getInstance()->get($memkey);
            if(!empty($res)){
                return $res;
            }
        }
        $data = array(
	        'userkey'	=> $userkey
	    );
        $res = $this->getTyqData('/member/newGetInfo', $data);

        if(empty($res['data']) or $res['code'] != 200){
            return array();
        }
	    TyFunc_Cachefunc::getInstance()->set($memkey, $res, 600);
	    return $res;
	    
	}
	/**
	 * 获取手机验证码
	 * @param unknown $mobile
	 * @param unknown $type
	 */
	public function getMobileCode($mobile, $type, $channel = ''){
		$codeType = array('reg', 'bind');
		if(!in_array($type,$codeType)){
			return false;
		}
		$data = array(
				'type'		=> $type,
				'mobile'	=> $mobile,
				'channel'	=> $channel
		);
		return $this->getTyqData('/user/getCode', $data);
	}
	/**
	 * 验证投友圈手机验证码
	 * @param unknown $mobile
	 * @param unknown $type
	 * @return boolean|Ambigous <boolean, Ambigous, mixed>
	 */
	public function verifycode($mobile, $type, $mobile_code){
		$codeType = array('reg', 'bind');
		if(!in_array($type,$codeType)){
			return false;
		}
		$data = array(
				'type'		=> $type,
				'mobile'	=> $mobile,
				'code'		=> $mobile_code
		);
		return $this->getTyqData('/user/verifyCode', $data);
	}

	/**
	* 获取用户投资评论列表
	* @param String $userKey  用户的userKey
	* @param Int $pn  分布页码
	*/
	public function getInvestComments($userKey,$pn){
		return $this->getTyqData('/invest/getComment',array(
			'userkey'=>$userKey,
			'pn'=>$pn,
			'rn'=>10
		));
	}
	
	/**
	 * 个人主页评论列表
	 */
	public function getHomepageComments($userKey, $uid, $pn){
		$data = array(
				'userkey'=>$userKey,
				'uid' => $uid,
				'pn'=>$pn,
				'rn'=>10
		);
		return $this->getTyqData('/invest/getHomepageComments',$data);
	}
	
	/**
	 * 个人主页单条评论的回复列表
	 */
	public function getUserCenterCommentReply($userKey,$comment_id){
		$data = array(
				'userkey'=>$userKey,
				'comment_id'=>$comment_id
		);
		return $this->getTyqData('/invest/getUserCenterCommentReply',$data);
	}

	/**
	* 评论及回复用户资产
	*/
	public function pushInvestComment($data){
		if(!empty($data['comment_id'])){
			$pushRoute = '/invest/addReply';
		}else{
			$pushRoute = '/invest/addComment';
		}
		$ret = $this->getTyqData($pushRoute,$data);
		return $ret;
	}

	/**
	* 给用户资产评论点赞
	*/
	public function setInvestPraise($id,$uid){
		if(empty($id)){
			return array();
		}
		$data = array(
			'comment_id'=>$id,
			'type'=>1,
			'from_uid'=>$uid
		);
		return $this->getTyqData('/invest/addDeclare',$data);
	}

	
	/**
	 * 获取基金详情
	 * @param unknown $tyqid
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function getFundItem($tyqid){

		$data = array(
				'id'	=> $tyqid
		);
		return $this->getTyqData('/fund/item', $data);
	}
	
	/**
	 * 获取链接跳转许可
	 * @param unknown $rk
	 * @param unknown $forward
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function getRedirect($rk, $forward, $userkey){
		
		$data = array(
				'rk'		=> $rk,
				'forward'   => $forward,
				'userkey'	=> $userkey
		);
		return $this->getTyqData('/member/setRedirect', $data);
	}
	
	/**
	 * 获取理财基金信息
	 * @param unknown $pname
	 */
	public function getPinancialMessage($pname){
	    $data = array(
	        'pname'	=> $pname
	    );
	    return $this->getTyqData('/fund/main', $data);
	}

	/**
	* 获取用户记账概况
	*/
	public function getUserInvestCount($userkey){
		$data = array(
				'userkey'=>$userkey
		);
		return $this->getTyqData('/invest/getGeneral',$data);
	}

	/**
	*获取用户记账平台列表
	*/
	public function getUserInvestPlatform($userkey){
		$data = array(
				'userkey'=>$userkey
		);
		return $this->getTyqData('/invest/getInvestedCompanys',$data);
	}

	/**
	 * 回款 待处理
	 * @param unknown $uid
	 * @param unknown $pm
	 * @param unknown $m
	 */
	public function getHandleLoans($userkey,$pn,$m)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'pn'=>$pn,
	        'rn'=>$m
	    );
	    return $this->getTyqData('/Invest/getHandleLoans',$data);
	}
	
	/**
	 * 回款 日志
	 * @param unknown $uid
	 * @param unknown $pm
	 * @param unknown $m
	 */
	public function getbackCalendar($userkey)
	{
	    $data = array(
	        'userkey'=>$userkey
	    );
	    return $this->getTyqData('/Invest/backCalendar',$data);
	}
	
	/**
	 * 获取标的
	 * @param unknown $uid
	 * @param unknown $pn
	 * @param unknown $rn
	 */
	public  function getinvestCompanyLoans($userkey,$pn,$rn,$companyID=NULL,$status=NULL,$type=NULL)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'pn'=>$pn,
	        'rn'=>$rn,
	        'companyID'=>$companyID,
	        'status'=>$status,
	        'type'=>$type
	    );
	    return $this->getTyqData('/Invest/investCompanyLoans',$data);
	}
	
	/**
	 * 获取所以平台信息列表
	 * @param unknown $userkey
	 */
	public function  searchCompany($userkey,$q)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'q'=>$q
	    );
	    return $this->getTyqData('/invest/searchCompany',$data);
	}
	
	/**
	 * 获取所以平台信息列表
	 * @param unknown $userkey
	 */
	public function allCompany($userkey)
	{
	    $data = array(
	        'userkey'=>$userkey
	    );
	    return $this->getTyqData('/invest/getAllCompanys',$data);
	}
	
	/**
	 * 获取某平台信息
	 * @param unknown $userkey
	 * @param unknown $companyname
	 */
	public function  getCompany($userkey,$companyname)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'companyName'=>$companyname
	    );
	    return $this->getTyqData('/invest/getCompany',$data);
	}
	
	/**
	 * 统计-流动性数据获取
	 * @param unknown $userkey
	 */
	public function  getFluidity($userkey)
	{
	    $data = array(
	        'userkey'=>$userkey
	    );
	    return $this->getTyqData('/invest/getFluidity',$data);
	}
	
	//添加,修改记账
	// 新增 reply_day 1-28
	// 新增 save_tpl 0-1
	public function addInvest($pid,$userkey,$title,$begin_data, $pay_way,$amount,$rate,$reward,$reward_type,$period,$period_type,$rate_fee,$repay_day=NULL,$end_date=NULL,$id=NULL,$update=NULL, $reply_day=NULL,$invest_date, $reward_way, $cash_reward, $reward_deduction, $remark, $save_tpl=0)
	{
	    $data = array(
	        'pid'=>$pid,
	        'userkey'=>$userkey,
	        'title'=>$title,
	        'begin_date'=>$begin_data,
	        'pay_way'=>$pay_way,
	        'amount'=>$amount,
	        'rate'=>$rate,
	        'reward'=>$reward,
	        'reward_type'=>$reward_type,
	        'period'=>$period,
	        'period_type'=>$period_type,
	        'cost'=>$rate_fee,
	        'repay_day'=>$repay_day,
	        'end_date'=>$end_date,
    		'reply_day' => $reply_day,
			'invest_date' => $invest_date,
			'reward_way' => $reward_way,
			'cash_reward' => $cash_reward,
			'reward_deduction' => $reward_deduction,
	    	'remark' => $remark,
    		'save_tpl' => $save_tpl
	    );
	    if(!empty($update)&&$update==1){
    	    $upst=array(
    	        'id'=>$id,
    	        'update'=>$update,
    	    );
    	  $data= array_merge($upst, $data);
	    }
		return TyLib_Tyqapi_invest::getInstance()->setUserKey($data['userkey'])->addLoan($data);
//	    return $this->getTyqData('/invest/addLoan',$data);
	}
	
	/**
	 * 删除平台
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function delInvestCompany($userkey, $pid)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'companyID'=>$pid
	    );
	    return $this->getTyqData('/invest/delInvestCompany',$data);
	}
	
	/**
	 * 标的提前回款
	 * @param unknown $userkey
	 * @param unknown $loanID
	 * @param unknown $Amount
	 */
	public function opAheadLoan($userkey, $loanID, $Amount,$terminalId = 2)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'loanID'=>$loanID,
	        'Amount'=>$Amount,
            'terminalId' => $terminalId
	    );
	    return $this->getTyqData('/invest/opAheadLoan',$data);
	}
	
	/**
	 * 处理标的
	 * @param unknown $userkey
	 * @param unknown $detailID
	 * @param unknown $status
     * @param $terminalId 终端类型 默认理财web
	 */
	public function opLoan($userkey, $detailID, $status,$terminalId = 2)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'detailID'=>$detailID,
	        'status'=>$status,
            'terminalId' => $terminalId
	    );
	    return $this->getTyqData('/invest/opLoan',$data);
	}
	
	
	/**
	 * 追加或赎回活期
	 * @param unknown $userkey
	 * @param unknown $product_id
	 * @param unknown $amount
	 * @param unknown $start_time
	 * @param unknown $action
	 * @param unknown $alive_id
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function addAliveRecord($userkey, $product_id, $amount,$start_time,$action,$alive_id,$terminalId = 2)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'product_id'=>$product_id,
	        'amount'=>$amount,
	        'start_time'=>$start_time,
	        'action'=>$action,
	        'alive_id'=>$alive_id,
            'terminalId' => $terminalId
	    );
	    return $this->getTyqData('/invest/addAliveRecord',$data);
	}

	/**
	 * 活期坏账处理
	 * @param unknown $userkey
	 * @param unknown $alive_id
	 * @param unknown $status
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function updateAlive($userkey, $alive_id, $status,$terminalId = 2)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'alive_id'=>$alive_id,
	        'status'=>$status,
            'terminalId' => $terminalId
	    );
	    return $this->getTyqData('/invest/updateAlive',$data);
	}
	
	/**
	 * 删除标的
	 * @param unknown $userkey
	 * @param unknown $loans
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function delLoan($userkey, $loans)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'loans'=>$loans
	    );
	    return $this->getTyqData('/invest/delLoan',$data);
	}
	
	/**
	 * 标的详情
	 * @param unknown $userkey
	 * @param unknown $id
	 * @param unknown $type
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function companyLoanDetail($userkey, $id,$type)
	{
	    $data = array(
	        'userkey'=>$userkey,
	        'id'=>$id,
	        'type'=>$type
	    );
	    return $this->getTyqData('/invest/companyLoanDetail',$data);
	}
	/**
	 * 获得用户投资数据
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function getUserInvest($userkey){
		$data = array(
				'userkey'=>$userkey
		);
		return $this->getTyqData('/member/invest', $data);
	}
	
	/**
	 * 获得基金列表
	 * @param unknown $userkey
	 * @param unknown $type
	 * @param unknown $pn
	 * @param unknown $rn
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function getUserFundlist($userkey,$type,$pn,$rn){
		$data = array(
				'userkey' => $userkey,
				'type' => $type,
				'pn' => $pn,
				'rn' => $rn
		);
		return $this->getTyqData('/member/fund', $data);
	}
	
	/**
	 * 基金详情
	 * @param unknown $userkey
	 * @param unknown $status
	 * @param unknown $item_id
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function getUserFunddesc($userkey, $status, $item_id){
		$data = array(
				'userkey' => $userkey,
				'status' => $status,
				'item_id' => $item_id
		);
		return $this->getTyqData('/member/funddetail', $data);
	}
	
	/**
	 * 获得用户交易记录列表
	 * @param unknown $userkey
	 * @param unknown $pid
	 * @param unknown $pn
	 * @param unknown $rn
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function getUserRecordlist($userkey,$pid,$pn,$rn){
		$data = array(
				'userkey' => $userkey,
				'pid' => $pid,
				'pn' => $pn,
				'rn' => $rn
		);
		
		return $this->getTyqData('/member/trade', $data);
	}
	
	/**
	 * 获取账户记录列表
	 * @param unknown $userkey
	 * @param unknown $pid
	 * @param unknown $ind
	 * @param unknown $inpd
	 * @param unknown $reld
	 * @param unknown $inpt
	 * @param unknown $trnn
	 * @param unknown $pn
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function getUserAccountList($userkey,$ind,$inpd,$reld,$inpt,$trnn,$pn){
	    $data = array(
	        'userkey' => $userkey,
	        'ind' => $ind,
	        'inpd' => $inpd,
	        'reld' => $reld,
	        'inpt' => $inpt,
	        'trnn' => $trnn,
	        'pn' => $pn
	    );
	
	    return $this->getTyqData('/member/accountlist', $data);
	}
	
	/**
	 * 获得记录详情
	 * @param unknown $userkey
	 * @param unknown $pid
	 * @param unknown $oid
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function getUserRecordDesc($userkey,$pid,$oid){
		$data = array(
				'userkey' => $userkey,
				'pid' => $pid,
				'oid' => $oid
		);
		return $this->getTyqData('/member/tradedetail', $data);
	}
	
	/**
	 * 获得记录详情
	 * @param unknown $userkey
	 * @param unknown $pid
	 * @param unknown $oid
	 * @return Ambigous <boolean, Ambigous, multitype:, mixed>
	 */
	public function getUserinfoByCardnbr($userkey,$cardnbr){
	    $data = array(
	        'userkey' => $userkey,
	        'cardnbr' => $cardnbr
	    );
	    return $this->getTyqData('/member/getUserinfoByCardnbr', $data);
	}
	
	/**
	 * 领取返现
	 * @param unknown $userkey
	 * @param unknown $cardnbr
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function getuse_card($userkey,$cardnbr,$terminal_type = 7){
	    $data = array(
	        'userkey' => $userkey,
	        'id' => $cardnbr,
            'terminal_type' => $terminal_type
	    );
	    return $this->getTyqData('/cpas/use_card', $data);
	}
	
	/**
	 * 查询是否领取卡卷
	 * @param unknown $userkey
	 * @param unknown $orderid
	 * @param unknown $kid
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function selectuse_card($userkey,$orderid,$kid){
	    $data = array(
	        'card_id'=>$kid,
	        'order_id'=>$orderid,
	        'userkey' => $userkey
	    );
	    return $this->getTyqData('/cpas/getCardRecordsStatus', $data);
	}
	
	/**
	 * 领取卡卷
	 * @param unknown $userkey
	 * @param unknown $cardnbr
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function get_share_card($mobile,$type,$cid,$order_id){
	    $data = array(
	        'mobile' => $mobile,
	        'type' => $type,
	        'cid' => $cid,
	        'order_id' => $order_id
	    );
	    return $this->getTyqData('/cpas/get_share_card', $data);
	}
	
	/**
	 * 活动领取卡卷
	 * @param unknown $userkey
	 * @param unknown $cardnbr
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function activity_get_share_card($mobile,$type,$cid,$uid){
	    $data = array(
	        'activity'=>'share170214',
            'mobile'=>$mobile,
            'cid'=>$cid,
            'type'=>$type,
            'source_cuid'=>$uid
	    );
	    return $this->getTyqData('/cpas/get_share_card', $data);
	}
	
	/**
	 * 投友圈动态推送
	 * @param unknown $userkey
	 * @param unknown $content
	 * @param unknown $type 1、说说动态  2、话题 3、小纸条 4、关注 、5、投资动态 6、天眼投资分享
	 * umber $is_img
	 * @param unknown $imgarr
	 * @return Ambigous <boolean, Ambigous, multitype:, unknown>
	 */
	public function setTyqFedd($userkey, $content, $type, $is_img = 1, $images = array(),$is_report=1,$reports = array()){
	
		$data = array(
				'userkey'	=> $userkey,
				'content'	=> $content,
				'type'		=> $type,
				'is_report'	=> $is_report,
				'is_img'    => $is_img
		);
		if($is_report == 2){
			$data['reports'] = json_encode($reports);
		}
		if($is_img == 2){
			$data['images'] = json_encode($images);
		}
		return $this->getTyqData('/feed/addFeed', $data);
	}
	
	/**
	 * 获取所有基金在投平台
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function getInvestedPlatforms(){
		$data = array();
		return $this->getTyqData('/fund/getInvestedPlatforms', $data);
	}
	
	/**
	 * 获取最高平台加息值
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function getpaltLoansSum(){
		$data = array();
		return $this->getTyqData('/cpas/paltLoansSum', $data);
	}
	
	/**
	 * 标的搜索
	 * @param unknown $profit
	 * @param unknown $period
	 * @param unknown $pid
	 * @param number $pn
	 * @param number $rn
	 */
	public function getLoanList($profit, $period, $order, $pid, $pn = 1, $rn = 10, $loan_id='',$background = '', $is_mobile = '' ,$invest_type = 0,$is_first = 0,$lt_rate = 0){
		$sort = 1;
		if($order - 20 > 0){
			$order = $order - 20;
			$sort = 0;
		}
		$data = array(
				'background'=> $background,
				'profit'	=> $profit,
				'period'	=> $period,
				'pid'		=> $pid,
				'order'		=> $order,
				'pn'		=> $pn,
				'rn'		=> $rn,
				'sort'		=> $sort,
				'loan_id'            =>$loan_id,
				'is_mobile' => $is_mobile,
				'first' => $invest_type,//投资类型
				'is_first' => $is_first,//1.首投，2.复投(根据用户对应的平台),
                'lt_rate' => $lt_rate
		);
		if (empty($is_mobile)) {
			if(defined('ISMOBILE') && ISMOBILE){
				$data['is_mobile'] = 1;
			}
		}
		return $this->getTyqData('/cpas/loanList', $data);
	}

	/**
	 * @param $userkey
	 * @param $month
	 * @return Ambigous|bool
	 * @throws Exception
	 * 获取指定月份账单信息
	 */
	public function get_bill_data($userkey,$month){
		$data = array(
			'userkey' => $userkey,
			'month_num' => $month
		);
		return $this->getTyqData('/card/get_bill_data', $data);
	}

	/**
	 * @param $userkey
	 * @param $month
	 * @return Ambigous|bool
	 * @throws Exception
	 * 获取分享成功的卡券
	 */
	public function get_bill_share_card($userkey, $month){
		$data = array(
			'userkey' => $userkey,
			'month_num' => $month
		);
		return $this->getTyqData('/card/get_bill_share_card', $data);
	}
	/**
	 * 去重标的搜索
	 * $order = 1(新上架),$order = 2(收益高),$order = 3(期限短)
	 */
	public function orderByLoanList($order, $pn = 1, $rn = 10){
		$data = array(
			'order'		=> $order,
			'pn'		=> $pn,
			'rn'		=> $rn,
		);
		return $this->getTyqData('/cpas/orderByLoanList', $data);
	}
	/**
	 * 理财首页展示最新上架
	 *
	 */
	public function getNewLoanList($num){
		$data = array(
			'num'		=> $num,
		);
		return $this->getTyqData('/cpas/getNewLoanList', $data);
	}

	
	/**
	 * 获取标的搜索项
	 */
	public function getLoanSearchConds($clear = false){
		$memkey = 'TyqApi_licai_loans_2';
		if(!$clear){
			$res = TyFunc_Cachefunc::getInstance()->get($memkey);
			if(!empty($res)){
				return $res;
			}
		}
		$res = $this->getTyqData('/cpas/loanSearchConds',array());
		if(empty($res['data'])){
			return array();
		}
		TyFunc_Cachefunc::getInstance()->set($memkey, $res['data'], 300);
		return $res['data'];
	}
	
	/**
	 * 标的详情页
	 * @param unknown $id
	 */
	public function getLoanInfo($userkey, $id, $is_mobile = ''){
		$data = array(
				'userkey' => $userkey,
				'id'	=> $id
		);
        if (empty($is_mobile)) {
            if(defined('ISMOBILE') && ISMOBILE){
                $data['is_mobile'] = 1;
            }
        }
		return $this->getTyqData('/cpas/loanInfo',$data);
	}

	/**
	 * 注册大礼包未登录请求接口
	 * @return Ambigous|bool
	 * @throws Exception
	 */
	public function appRegCardInfo(){
		$data = array(
		);
		return $this->getTyqData('/card/appRegCardInfo',$data);
	}
	
	/**
	 * 获取平台落地页标
	 * @param unknown $pid
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function getPlatRecommendLoan($pid){
		
		$data = array(
				'pid' => $pid
		);
		return $this->getTyqData('/cpas/platRecommendLoan', $data);
	}
	
	/**
	 * 获取用户返利信息
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function getRebateSum($userkey){
		
		$data = array(
				'userkey'=> $userkey
		);
		return $this->getTyqData('/cpas/myReward', $data);
		
	}
	/**
	 * 获取用户现金券
	 */
	public function coupon($userkey, $pn, $status, $rn){
		
		$data = array(
				'userkey'	=> $userkey,
				'status'	=> $status,
				'pn'		=> $pn,
				'rn'		=> $rn
		);
		return $this->getTyqData('/cpas/myCashList', $data);
	}
	/**
	 * 获取用户投标记录
	 * @param unknown $userkey
	 * @param unknown $pn
	 */
	public function loansList($userkey, $pn, $status){
		
		$data = array(
				'userkey' => $userkey,
				'pn'	  => $pn,
				'status'  => $status
		);
		return $this->getTyqData('/cpas/myTradesList', $data);
	}
	/**
	 * 使用现金券
	 * @param unknown $serial
	 */
	public function setcashing($userkey, $serial,$terminal_type = 6){
		
		$data = array(
			'serial'	=> $serial,
			'userkey'	=> $userkey,
			'terminal_type' => $terminal_type,
		);
		return $this->getTyqData('/cpas/cashing', $data);
	}
	/**
	 * 获取当前用户指定平台投标个数
	 * @param unknown $userkey
	 * @param unknown $typid
	 */
	public function userPlatTradesNum($userkey, $typid){
		
		$data = array(
				'typid'		=> $typid,
				'userkey'	=> $userkey
		);
		return $this->getTyqData('/cpas/userPlatTradesNum', $data);
	}
	/**
	 * 获取标的详情页投资列表
	 * @param unknown $loan_id
	 * @param unknown $pn
	 * @param unknown $rn
	 */
	public function investorsList($loan_id, $pn, $rn){
		
		$data = array(
				'loan_id'	=> $loan_id,
				'pn'		=> $pn,
				'rn'		=> $rn
		);
		return $this->getTyqData('/cpas/InvestorsList', $data);
	}
	
	/**
	 * 发送红包接口
	 * @param unknown $amount
	 * @param string $activity
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function sendCoupon($userkey, $amount, $activity = 'tyjnh'){
		
		$data = array(
				'amount'	=> $amount,
				'activity'	=> $activity,
				'userkey'	=> $userkey
		);
		return $this->getTyqData('/member/send_coupon', $data);
	}
	/**
	 * 获取签到活动红包纪录
	 * @param unknown $amount
	 * @param string $activity
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function getSignConponRecords($userkey){
	    $data = array(
	        'userkey'	=> $userkey
	    );
	    return $this->getTyqData('/member/getSignConponRecords', $data);
	}

	/**
	 * 获取账单卡卷信息
	 * @return Ambigous|bool
	 * @throws Exception
	 *
	 */
	public function get_card_info(){
		$data = array();
		return $this->getTyqData('/card/get_card_info', $data);
	}
	/**
	 * 签到领取卡劵
	 */
	public function get_sign_card($userkey, $type){
		$data = array(
				'userkey'	=> $userkey,
				'type'	=> $type
		);
		return $this->getTyqData('/cpas/get_sign_card', $data);
	}
	
    /**
     * 获取理财首页特权标数据
     */
	public function indexLoanList($pn, $rn) {
		$memkey = 'TyLib_TyqApi-indexLoanList-' . $pn . '-' . $rn;
		$res = TyFunc_Cachefunc::getInstance ()->get ( $memkey );
		if (! empty ( $res )) {
			return $res;
		}
		$res = array ();
		$data = array (
				'rn' => $rn,
				'pn' => $pn
		);
		$res_temp = $this->getTyqData ( '/cpas/indexLoanList', $data );
		if ($res_temp ['code'] == 200 && ! empty ( $res_temp ['data'] )) {
			$res = $res_temp ['data'];
		}
		TyFunc_Cachefunc::getInstance ()->set ( $memkey, $res, 60 );
		return $res;
	}

	/**
	 * 获取网贷平台首页特权标数据
	 */
	public function platformIndexLoanList(){

		$data = array(
		);
		return $this->getTyqData('/cpas/platformIndexLoanList', $data);
	}

    /**
     * 获取理财首页7日热投记账数排行数据
     * @param unknown $loan_id
     * @param unknown $rn
     */
    public function indexPlatformInvestList($pn, $rn){

        $data = array(
            'rn'		=> $rn,
            'pn'		=> $pn
        );
        return $this->getTyqData('/invest/indexPlatformInvest', $data);
    }
	/**
	 * 投资该平台的用户
	 */
	public function getInvestorsByPlatName($pname){
		$data = array(
			'pname' => $pname
		);

		$memkey = 'TyqApi_licai_getInverstor_'.$pname;
		$res = TyFunc_Cachefunc::getInstance()->get($memkey);
		if(!empty($res)){
			return $res;
		}
		$res = $this->getTyqData('/invest/investorsByPlatName', $data);
		if(empty($res['data'])){
			return array();
		}
		TyFunc_Cachefunc::getInstance()->set($memkey, $res['data'], 3600);
		return $res['data'];
	}
	/**
	 * 元宵节活动获取用户信息（含抽奖信息）
	 * @param unknown $userkey
	 */
	public function activityGetInfo($userkey){
		
		$data = array(
				'userkey'	=> $userkey
		);
		return $this->getTyqData('/member/activityGetInfo', $data);
	}
	/**
	 * 元宵节活动增加分享抽奖机会
	 * @param unknown $userkey
	 */
	public function activityShare($userkey){
		
		$data = array(
				'userkey'	=> $userkey
		);
		return $this->getTyqData('/member/activityShare', $data);
	}
	/**
	 * 元宵节活动拆红包
	 * @param unknown $userkey
	 */
	public function openCoupon($userkey){
		
		$data = array(
				'userkey'	=> $userkey
		);
		return $this->getTyqData('/member/openCoupon', $data);
	}
	/**
	 * 获取元宵节活动页面其他数据
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function couponList(){
		
		$data = array();
		return $this->getTyqData('/user/yxj', $data);
	}

	/**
	 * 获取乐投宝收益
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function ltbsy(){

		$data = array();
		return $this->getTyqData('/ltb/todayrightsinfo', $data);
	}

	/**
	 * 查询平台最新标的
	 * @param unknown $pid
	 */
	public function getLatestLoan($pid){
		$data = array(
				'pid'	=> $pid
		);
		return $this->getTyqData('/cpas/getLatestLoan', $data);
	}

	/**
	 * 添加邀请人(capas邀请有礼)
	 * $act_name value(cpasinvite,)
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function insertInviter($uid, $source_uid, $act_name){
		$data = array(
			'uid' 			=> $uid,
			'source_uid' 	=> $source_uid,
			'act_name' 		=> $act_name
		);
		return $this->getTyqData('/activity/addinviterecords', $data);
	}

	/**
	 * 获取邀请人列表(capas邀请有礼)
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function getInviterList($pn, $rn, $act_name, $userkey){
		$data = array(
			//'type' => 0//非必须  默认0：获取列表和统计信息；1：只获取统计信息 2:获取奖励大于0
			'pn' => $pn,
			'rn' => $rn,
			'act_name' => $act_name,
			'userkey'	=> $userkey,
		);
		return $this->getTyqData('/activity/invitelist', $data);
	}

	/**
	 * 获取活动标的(capas邀请有礼)
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function getInviteLoans(){
		$data = array();
		return $this->getTyqData('/activity/cpasinviteloans', $data);
	}

	/**
	 * 获取活动详情接口(capas邀请有礼)
	 *  @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function getActivityDetail(){
		$data = array(
			'act_name' => "cpasinvite",
		);
		return $this->getTyqData('/activity/detail', $data);
	}

    
    /**
     * 验证手机号是否存在，手机号密码是否正确
     * @param unknown $mobile
     * @param unknown $password
     */
    public function checkMember($mobile,$password = ''){
        $data = array(
            'mobile'	=> $mobile
        );
        if(!empty($password)){
        	$data['password'] = $password;
        }
        return $this->getTyqData('/user/checkMember', $data);
    }
    
    /**
     * 新注册用户同步创建投友圈账号
     * @param unknown $mobile
     * @param unknown $password
     */
	public function setRegistertyq($mobile, $uid, $userName, $tyqPassword){
	    $userName=TyLib_Function::getInstance()->conversion_coding($userName,'UTF-8');
		$data = array(
				'mobile'	=> trim($mobile),
				'cuid'		=> trim($uid),
				'cuname'	=>  trim($userName),
				'password'  => trim($tyqPassword),
				'cupic'		=> trim($uid),
				'cuspace'	=> trim($uid)
		);
		return $this->getTyqData('/user/ty_reg', $data);
	}
	/**
	 * cpas
	 * @return Ambigous <boolean, Ambigous, unknown>
	 */
	public function abnormal_add($cid,$action_type,$reason){
	
		$data = array(
				'cid' => $cid,
				'action_type' => $action_type,
				'reason' => $reason,
		);
		return $this->getTyqData('/cpas/abnormal_add', $data);
	}
	/**
	 * 518理财活动
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function sendSignCoupon($userkey){
		$data = array(
			'userkey'    => $userkey
		);
		return $this->getTyqData('/member/send_sign_coupon',$data);
	}
	/**
	 * 获取短期标
	 * $order = 1(新上架),$order = 2(收益高),$order = 3(期限短)
	 */
	public function orderByLoanListto($order, $pn = 1, $rn = 10){
	    $data = array(
	        'order'		=> $order,
	        'pn'		=> $pn,
	        'rn'		=> $rn,
	    );
	    return $this->getTyqData('/cpas/orderByLoanList2', $data);
	}
	/**
	 * 获取秒杀标
	 * @param string $date
	 */
	public function getHotLoan($date = false){
		if(!$date){
			$date = date('Y-m-d');
		}
	    $data = array(
			'data_time'  => $date
		);
		return $this->getTyqData('/cpas/gethotloan',$data);
	}
	/**
	 * 获取秒杀标
	 * @param string $date
	 */
	public function getHotLoans($date_time, $position){
	    $data = array(
	        'data_time'  => $date_time,
	        'position'   => $position
	    );
	    return $this->getTyqData('/loan/gethotloans',$data);
	}
	/**
	 * 获取投友圈cpas投标纪录
	 * @param unknown $activity
	 * @return Ambigous <boolean, Ambigous, mixed>
	 */
	public function investment($activity, $type = 1){
		$data = array(
			'activity' => $activity,
		    'type'     => $type
		);
		return $this->getTyqData('/cpas/getchance',$data);
	}
	/**
	 * 获取直投主页数据
	 * @param unknown $userkey
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function getZhitouIndexData($userkey){
	    $data = array(
				'userkey'=> $userkey
		);
	    return $this->getTyqData('/cpas/loansIndexGetInfo',$data);
	}
	
	/**
	 * 我的投资记录列表
	 * status:　１进行中的投资　　２加息投资记录　　３已到期投资记录
	 * @param unknown $userkey
	 * @param unknown $pn
	 * @param unknown $rn
	 * @param unknown $status
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function getInvestList($userkey, $pn, $rn, $status){
	    $data = array(
	        'userkey'=> $userkey,
	        'pn'		=> $pn,
	        'rn'		=> $rn,
	        'status' => $status
	    );
	    return $this->getTyqData('/cpas/tradesdetail',$data);
	}

	public function getInvestDetail($userkey,$id){
	    $data = array(
	        'userkey'=>$userkey,
            'id'=>$id,
        );
	    return $this->getTyqData('/cpas/investDetail',$data);

    }
	
	/**
	 * 我的绑定平台列表
	 * @param unknown $userkey
	 * @param unknown $pn
	 * @param unknown $rn
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function getBindPlatList($userkey, $pn, $rn){
	    $data = array(
	        'userkey'=> $userkey,
	        'pn'		=> $pn,
	        'rn'		=> $rn
	    );
	    return $this->getTyqData('/cpas/bindlist',$data);
	}
	
	/**
	 * 我的直投红包列表
	 * @param unknown $userkey
	 * @param unknown $pn
	 * @param unknown $rn
	 * @return Ambigous <boolean, Ambigous>
	 */
	public function getZtCouponList($userkey, $pn, $rn){
	    $data = array(
	        'userkey'=> $userkey,
	        'pn'		=> $pn,
	        'rn'		=> $rn
	    );
	    return $this->getTyqData('/cpas/marketingcashlist',$data);
	}
	/**
	 * USER : znz
	 * 注意 : 之后的投友圈接口请写到 /TyLib/Tyqapi/ 文件下 示例：/TyLib/Tyqapi/zhongqiu.php
	 */

	/**
	 * 最近直投到期日
	 * @param unknown $userkey
	 */
	public function getUserCpas($userkey){
	    $data = array(
	        'userkey'=> $userkey
	    );
	    return $this->getTyqData('/cpas/getUserCpas',$data);
	}

	/**
	 * 统计数据
	 * @param 当天0点时间戳 $end_time
	 */
	public function getCpasTotal($end_time){
	    $data = array(
	        'end_time'=> $end_time
	    );
	    return $this->getTyqData('/cpas/getCpasTotal',$data);
	}

	/**
	 * 首页热门平台接口
	 * @param
	 */
	public function getIndexClient(){
	   $data = array();
	    return $this->getTyqData('/cpas/getIndexClient',$data);
	}

	/**
	 * 首页热门平台接口
	 * @param
	 */
	public function getH5IndexClient(){
	   $data = array();
	    return $this->getTyqData('/cpas/getH5IndexClient',$data);
	}

	/**
	 * 获取直投平台列表
	 * @param
	 */
	public function getH5Client(){
	   $data = array();
	    return $this->getTyqData('/cpas/getH5Client',$data);
	}

	/**
	 * 首页热门平台接口
	 * @param  平台的cid  $cid
	 */
	public function getIndexLoan($cid){
	    $data = array(
	        'cid'=> $cid
	    );
	    return $this->getTyqData('/loan/getIndexLoan',$data);
	}

	/**
	 * 首页标的区间
	 * @param unknown $profit
	 * @param unknown $period
	 * @param unknown $pid
	 * @param number $pn
	 * @param number $rn
	 */
	public function getIndexLoanList ($period, $loan_id='', $pn, $rn, $show_h5 = ''){
		$data = array(
			'period'=> $period,
			'loan_id'	=> $loan_id,
			'pn'		=> $pn,
			'rn'		=> $rn,
			'show_h5'	=> $show_h5
		);
		return $this->getTyqData('/loan/getIndexLoanList ', $data);
	}
	
	//获取标的状态
	public function getLoanStatus ($loan_id){
		$data = array(
			'loan_id'=> $loan_id
		);
		return $this->getTyqData('/loan/getLoanStatus ', $data);
	}

	//根据平台id获取信息
	public function getClientInfo($typid){
		$data = array(
			'typid'=> $typid
		);
		return $this->getTyqData('/cpas/getClientInfo', $data);
	}
	
	/**
	 * 获取5分钟内投资和注册用户
	 */
	public function get_lastest_records(){
		$data = array();
		return $this->getTyqData('/cpas/get_lastest_records', $data);
	}

	/**
	* 理财app直投页面--标的搜索
	* @param unknown $profit 收益
	* @param unknown $period 期限
	* @param unknown $order 排序
	* @param unknown $pid
	* @param number $pn 分页
	* @param number $rn 每页条数
	* @param number $loan_id
	* @param number $background  背景
	*/
	public function appLoanList($profit, $period, $order, $pid, $pn = 1, $rn = 10, $loan_id='',$background = '',$app_version='',$app_type=''){
		$sort = 1;
		if($order - 20 > 0){
			$order = $order - 20;
			$sort = 0;
		}
		$data = array(
			'background'=> $background,
			'profit'	=> $profit,
			'period'	=> $period,
			'pid'		=> $pid,
			'order'		=> $order,
			'pn'		=> $pn,
			'rn'		=> $rn,
			'sort'		=> $sort,
			'loan_id'            =>$loan_id,
			'app_version'            =>$app_version,
			'app_type'            =>$app_type
		);
		return $this->getTyqData('/cpas/appLoanList', $data);
	}

	/**
	  *江湖救急列表
	  */
	public function getJhjj($userkey){
		$data = array(
	       	'userkey'=> $userkey
	    	);
		return $this->getTyqData('/member/getJhjj', $data);
	}

    /**
     * 获取卡券列表
     * @param $userkey 用户key
     * @param $gift_name 礼包Code码
     * @param $activity_name 活动Code码
     * @param bool $login_required 是否需要登录
     * @return Ambigous|bool
     */
    public function getMarketingCard($userkey,$gift_name,$activity_name, $login_required = false)
    {
        $data = array(
            'userkey' => $userkey,
            'gift_name' => $gift_name,
            'activity_name' => $activity_name,
            'login_required' => $login_required
        );

        return $this->getTyqData('/member/getMarketingCard', $data);
    }

    public function getCard($userkey,$card_id){
        $data = array(
            'userkey'=> $userkey,
            'card_id'=>$card_id
        );
        return $this->getTyqData('/member/getCard', $data);
    }

	/**
	  *根据手机号查询投友圈是否存在信息
	  */
	public function getMembersByMobile($mobile){
		$data = array(
			'mobile' => $mobile
		);
		return $this->getTyqData('/member/getMembersByMobile', $data);
	}

	/**
	  *更新原来投友圈的手机号
	  */
	public  function updateMembersById($tuid,$mobile=''){
		$data = array(
			'tuid' => $tuid,
			'mobile' => $mobile
		);
		return $this->getTyqData('/member/updateMembersById', $data);
	}

	/**
	  *根据手机号查询投友圈是否存在信息
	 */
	public function getBindByCidCuid($cid,$cuid){
		$data = array(
			'cid' => $cid,
			'cuid' => $cuid
		);
		return $this->getTyqData('/member/getBindByCidCuid', $data);
	}

	/**
	  *根据手机号查询投友圈是否存在信息
	 */
	public function myRebateSum($userid){
		$data = array(
			'userid'=> $userid
		);
		return $this->getTyqData('/cpas/myRebateSum', $data);
	}

	/**
	 * 实名认证
	 */
	public function checkRealname($userkey,$username,$idcard){
		$data = array(
			'userkey'=> $userkey,
			'realname' => $username,
			'sid' => $idcard
		);
		return $this->getTyqData('/member/checkRealname', $data);
	}

	public function  checkpayPwd($userkey,$password){
		$data = array(
			'userkey'=> $userkey,
			'pwd' => $password
		);
		return $this->getTyqData('/member/checkpayPwd', $data);
	}

	/**
	 * 设置交易密码
	 */
	public function setPaypwd($userkey ,$pwd1 ,$pwd2 ,$type){
		$data = array(
			'userkey'=> $userkey,
			'pwd1' => $pwd1,
			'pwd2' => $pwd2,
			'type' => $type
		);
		return $this->getTyqData('/member/setPaypwd', $data);
	}

	/**
	 * 修改交易密码
	 */
	public function changePaypwd($userkey, $oldpwd, $pwd1, $pwd2){
		$data = array(
			'userkey'=> $userkey,
			'oldpwd' => $oldpwd,
			'pwd1' => $pwd1,
			'pwd2' => $pwd2
		);
		return $this->getTyqData('/member/changePaypwd', $data);
	}

	/**
	  *资金流水记录
	  */
	public function getAccountChangeList($userkey, $page, $pagesize=10){
		$data = array(
			'userkey'=> $userkey,
			'page' => $page,
			'pagesize' => $pagesize
		);
		return $this->getTyqData('/member/getAccountChangeList', $data);
	}

	/**
	  *资金记录明细
	  */
	public function getAccountChangeDetail($userkey, $id){
		$data = array(
			'userkey'=> $userkey,
			'id' => $id
		);
		return $this->getTyqData('/member/getAccountChangeDetail', $data);
	}
	/**
	  *提现页面
	  */
	public function withdraw($userkey){
		$data = array(
			'userkey'=> $userkey
		);
		return $this->getTyqData('/lianlian/withdraw', $data);
	}
	/**
	 *提现记录
	 */
	public function withdrawlog($userkey,$pn,$rn=10){
		$data = array(
			'userkey'=> $userkey,
			'pn'=>$pn,
			'rn'=>$rn
		);
		return $this->getTyqData('/lianlian/withdraw_list', $data);
	}

	/**
	  *提现记录明细
	  */
	public function withdraw_detail($userkey,$order_id){
		$data = array(
			'userkey'=> $userkey,
			'order_id'=>$order_id
		);
		return $this->getTyqData('/lianlian/withdraw_detail', $data);
	}
	/**
	 *校验银行卡
	 */
	public function checkBank($userkey,$card_no){
		$data = array(
			'userkey'=> $userkey,
			'card_no'=> $card_no
		);
		return $this->getTyqData('/lianlian/cardbin_query', $data);
	}
	/**
	  *申请提现
	  */
	public function ajaxDraw($userkey,$draw_pass,$draw_money,$draw_bank,$terminal_type,$card_id){
		$data = array(
			'userkey'=> $userkey,
			'pay_pwd' =>$draw_pass,
			'amount' => $draw_money,
			'card_no' => $draw_bank,
			'terminal_type' => $terminal_type,
			'card_id' => $card_id
		);
		return $this->getTyqData('/lianlian/withdraw_post', $data);
	}

	public function addBankCard($userkey,$card_no){

        $data = array(
            'userkey' => $userkey,
            'card_no' => $card_no
        );

        return $this->getTyqData('/lianlian/add_bank_card', $data);
    }

	/**
	 * 检查是否有绑定关系
	 */
	public function new_check_bind($type,$uid){
		$data = array(
			'type' => $type,
			'uid'=> $uid
		);
		return $this->getTyqData('/user/new_check_bind', $data);
	}
	/**
	 * @param $pid
	 * @return Ambigous|bool
	 * @throws Exception
	 * 获取天眼加息
	 */
	public function get_platform_rate($pid){
	    $data = array(
	        'pid' => $pid,
	    );
	    return $this->getTyqData('/cpas/get_platform_rate', $data);
	}
	
	/**
	 * @param $pid
	 * @param $userkey
	 * @return Ambigous|bool
	 * @throws Exception
	 * 获取投友圈用户投资详情
	 */
	public function get_user_invest($pid,$userkey){
	    $data = array(
	        'pid' => $pid,
	        'userkey'=> $userkey,
	    );
	    return $this->getTyqData('/cpas/get_user_invest', $data);
	}
	
	/*****************会员中心***********************/
	/**
	 * @param $userkey
	 * @param $goodsData　商品信息
	 * @return Ambigous|bool
	 * @throws Exception
	 * 添加商品信息
	 */
	public function addGoods($userkey,$goodsData){
		$data = array(
			'userkey' => $userkey,
			'goodsData'=> $goodsData
		);
		return $this->getTyqData('/club/addGoods', $data);
	}

	/**
	 * @param $userkey
	 * @param $page
	 * @param $limit
	 * @return Ambigous|bool
	 * @throws Exception
	 * 获取商品列表
	 */
	public function goodsList($userkey,$page,$limit){
		$data = array(
			'userkey' => $userkey,
			'page'=> $page,
			'limit'=>$limit
		);
		return $this->getTyqData('/club/goodsList', $data);
	}

	/**
	 * @param $userkey
	 * @param $goodid
	 * 根据商品id获取商品详情
	 */
	public function getGoods($userkey,$goodid){
		$data = array(
			'userkey' => $userkey,
			'goods_id'=> $goodid
		);
		return $this->getTyqData('/club/getGoods', $data);
	}

	/**
	 * 投友圈添加平台
	 */
	public function addPlatform($userkey,$platform_data){
		$data = array(
			'userkey' => $userkey,
			'name' => $platform_data['name'],
			'link' => $platform_data['link'],
		);
		return $this->getTyqData('/invest/addPlatform', $data);
	}

	/**
	 * @param $userkey
	 * @param string $activity
	 * @return Ambigous|bool
	 * @throws Exception
	 * 获取制定活动红包个数
	 */
	public function getSyncInfo($userkey, $activity = ''){
		$data = array(
			'userkey'	=> $userkey,
			'activity'	=> $activity
		);
		return $this->getTyqData('/activity/getSyncInfo', $data);
	}
}
