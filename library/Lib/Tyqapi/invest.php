<?php
class TyLib_Tyqapi_invest extends TyLib_Tyqapi_Base{

    private static $obj= null;
    private $_userKey = '';
    public static function getInstance(){
        if(is_null(self::$obj)){
            self::$obj = new self();
        }
        return self::$obj;
    }

    /**
     * 设置用户userKey
     * @param $userKey
     * @return $this
     */
    public function setUserKey($userKey){
        $this->_userKey = $userKey;
        return $this;
    }

    /**
     * 获取投资概况
     * @return Ambigous|bool
     */
    public function getInvest($from_type = 'app_jizhang'){
        $data = array(
            'from_type' => $from_type,
            'userkey' => $this->_userKey
        );
        return $this->getTyqData('/invest/getInvest',$data);
    }

    /**
     * 获取投资详情
     * @return Ambigous|bool
     */
    public function getInvestDetail(){
        $data = array(
            'userkey' => $this->_userKey
        );
        return $this->getTyqData('/invest/getInvestDetail',$data);
    }


    /**
     * 在投平台汇总数据
     * @return Ambigous|bool
     */
    public function getInvestCompanyCount(){
        $data = array(
            'userkey' => $this->_userKey
        );
        return $this->getTyqData('/invest/getInvestCompanyCount',$data);
    }

    /**
     * 获取在投平台列表
     * @return Ambigous|bool
     */
    public function getInvestCompany($page = 1,$limit = 20){
        $data = array(
            'userkey' => $this->_userKey,
            'page' => $page,
            'limit' => $limit
        );
        return $this->getTyqData('/invest/getInvestCompany',$data);
    }

    /**
     * 获取全部投资平台名称
     * @return Ambigous|bool
     */
    public function getInvestAllCompany(){
        $data = array(
            'userkey' => $this->_userKey,
        );
        return $this->getTyqData('/invest/getInvestAllCompany',$data);
    }

    /**
     * 新版定期记账添加
     * @param array $investData
     * @param int $terminalId
     * @return Ambigous|bool
     */
    public function addLoan(array $investData,$terminalId = 2){
        $data = array(
            'userkey' => $this->_userKey,
            'investData' => json_encode($investData),
            'terminalId' => $terminalId
        );
        return $this->getTyqData('/invest/newAddLoan',$data);
    }

    /**
     * 根据loanId获取base数据详情
     * @param $loanId
     * @return Ambigous|bool
     */
    public function getBaseByLoanId($loanId){
        $data = array(
            'userkey' => $this->_userKey,
            'loanId' => $loanId
        );
        return $this->getTyqData('/invest/getBaseById',$data);
    }

    /**
     * 获取定期记账概况
     * @param $loanId
     * @return Ambigous|bool
     */
    public function getBaseInfoById($loanId){
        $data = array(
            'userkey' => $this->_userKey,
            'loanId' => $loanId
        );
        return $this->getTyqData('/invest/getBaseInfoById',$data);
    }

    /**
     * 获取定期记账详情
     * @param $loanId
     * @param int $page
     * @param int $limit
     * @return Ambigous|bool
     */
    public function getLoanDetailById($loanId,$page = 1,$limit = 20){
        $data = array(
            'userkey' => $this->_userKey,
            'loanId' => $loanId,
            'page' => $page,
            'limit' => $limit
        );
        return $this->getTyqData('/invest/getDetailInfoById',$data);
    }


    /**
     * 删除记账
     * @param $loanId
     * @return Ambigous|bool
     */
    public function delLoanById($loanId,$terminalId = 2){
        $data = array(
            'userkey' => $this->_userKey,
            'loanId' => $loanId,
            'terminalId' => $terminalId
        );
        return $this->getTyqData('/invest/delLoanById',$data);
    }

    /**
     * 批量已收记账详情
     * @param array $detailIds
     * @param int $terminalId
     * @param int $status
     * @return Ambigous|bool
     */
    public function mutiOpLoan(array $detailIds,$status = 2,$terminalId = 2){
        $data = array(
            'userkey' => $this->_userKey,
            'detailIds' => json_encode($detailIds),
            'status' => $status,
            'terminalId' => $terminalId
        );
        return $this->getTyqData('/invest/mutiOpLoan',$data);
    }

    /**
     * 添加活期记账
     * @param $product_id
     * @param $amount
     * @param $start_time
     * @return Ambigous|bool
     */
    public function addAliveLoan($product_id,$amount,$start_time,$terminalId = 2){
        $data = array (
            'userkey' => $this->_userKey,
            'product_id' => $product_id,
            'amount' => $amount,
            'start_time' => $start_time,
            'terminalId' => $terminalId
        );
        return $this->getTyqData ( '/invest/addAlive', $data );
    }

    /**
     * 获取活期记账详情
     * 活期编辑使用
     * @param $aliveId
     * @return Ambigous|bool
     */
    public function getAliveInfoById($aliveId){
        $data = array(
            'userkey' => $this->_userKey,
            'alive_id' => $aliveId
        );
        return $this->getTyqData('/invest/getAliveInfoById',$data);
    }


    /**
     * 修改活期记账
     * @param $aliveId
     * @param $product_id
     * @param $amount
     * @param $start_time
     * @param int $terminalId
     * @return Ambigous|bool
     */
    public function editAliveLoan($aliveId,$product_id,$amount,$start_time,$terminalId = 2){
        $data = array (
            'userkey' => $this->_userKey,
            'id' => $aliveId,
            'product_id' => $product_id,
            'amount' => $amount,
            'start_time' => $start_time,
            'terminalId' => $terminalId
        );
        return $this->getTyqData ( '/invest/editAlive', $data );
    }


    /**
     * 删除活期记账
     * @param $aliveId
     * @param int $terminalId
     * @return Ambigous|bool
     */
    public function delAliveLoan($aliveId,$terminalId = 2){
        $data = array(
            'userkey' => $this->_userKey,
            'aliveId' => $aliveId,
            'terminalId' => $terminalId
        );
        return $this->getTyqData ( '/invest/delAliveLoan', $data );
    }

    /**
     * 获取活期记账详情
     * @param $aliveId
     * @return Ambigous|bool
     */
    public function getAliveLoanInfo($aliveId){
        $data = array(
            'userkey' => $this->_userKey,
            'aliveId' => $aliveId,
        );
        return $this->getTyqData('/invest/getAliveLoanInfo',$data);
    }


    /**
     * 获取平台投资汇总数据
     * @param $companyId
     * @return Ambigous|bool
     */
    public function getInvestCompanyBase($companyId){
        $data = array(
            'userkey' => $this->_userKey,
            'companyId' => $companyId,
        );
        return $this->getTyqData('/invest/getInvestCompanyBase',$data);
    }


    /**
     * 获取平台投资汇总数据
     * @param $companyId
     * @return Ambigous|bool
     */
    public function getNewInvestCompanyBase($companyId,$accountId = 0){
        $data = array(
            'userkey' => $this->_userKey,
            'companyId' => $companyId,
            'accountId' => $accountId
        );
        return $this->getTyqData('/invest/getNewInvestCompanyBase',$data);
    }

    /**
     * 平台投资详情
     * @param $companyId
     * @param string $type
     * @param int $page
     * @param int $limit
     * @return Ambigous|bool
     */
    public function getInvestCompanyDetail($companyId,$type = '1',$page = 1,$limit = 20){
        $data = array(
            'userkey' => $this->_userKey,
            'companyId' => $companyId,
            'type' => $type,
            'page' => $page,
            'limit' => $limit
        );
        return $this->getTyqData('/invest/getInvestCompanyList',$data);
    }


    /**
     * 获取在投平台分布
     */
    public function getInvestingCompanyList(){
        $data = array(
            'userkey' => $this->_userKey,
        );
        return $this->getTyqData('/invest/getInvestingCompanys',$data);
    }

    /**
     * 获取全部投资平台列表
     * @return Ambigous|bool
     */
    public function getAllInvestCompany(){
        $data = array(
            'userkey' => $this->_userKey,
        );
        return $this->getTyqData('/invest/getAllInvestCompany',$data);
    }


    /**
     * 回款明细按月统计
     * @param array  1=>在投 1=>已收 3=>坏账 4=>逾期
     * @param string $companyId
     * @param string $start_date
     * @param string $end_date
     * @return Ambigous|bool
     */
    public function getInvestingDetailByMonth(array $status,$companyId = '',$start_date = '',$end_date = ''){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date
        );
        return $this->getTyqData('/invest/getInvestingDetailByMonth',$data);
    }

    /**
     * 回款明细按月统计(含回款明细)
     * @param array  1=>在投 1=>已收 3=>坏账 4=>逾期
     * @param string $companyId
     * @param string $start_date
     * @param string $end_date
     * @return Ambigous|bool
     */
    public function getNewInvestDetailByMonth(array $status,$companyId = '',$start_date = '',$end_date = '', $has_list = 1){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date,
            'has_list' => $has_list,
        );
        return $this->getTyqData('/invest/getNewInvestDetailByMonth',$data);
    }


    /**
     * 回款明细按月统计
     * @param array  1=>在投 1=>已收 3=>坏账 4=>逾期
     * @param string $companyId
     * @param string $start_date
     * @param string $end_date
     * @return Ambigous|bool
     */
    public function getInvestingDetailByWeek(array $status,$companyId = '',$start_date = '',$end_date = ''){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date
        );
        return $this->getTyqData('/invest/getInvestingDetailByWeek',$data);
    }

    /**
     * 回款明细按天统计
     * @param array $status
     * @param string $companyId
     * @param string $start_date
     * @param string $end_date
     */
    public function getInvestsDetailByDaySum(array $status,$companyId = '',$start_date = '',$end_date = ''){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date
        );
        return $this->getTyqData('/invest/getInvestsDetailByDaySum',$data);
    }


    /**
     * 按天获取记账详情(含列表详情)
     * @param string $companyId
     * @param string $start_date
     * @param string $end_date
     * @return Ambigous|bool
     */
    public function getInvestingDetailByDay($companyId = '',$start_date = '',$end_date = '', $page = 0, $page_size = 0){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode( array('1','4')),
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date,
            'page' => $page,
            'page_size' => $page_size
        );
        return $this->getTyqData('/invest/getInvestingDetailByDay',$data);
    }

    /**
     * 回款日历概况
     * @param string $type 1待收 2已收
     * @param int $companyId
     * @param string $start_date
     * @param string $end_date
     */
    public function getCalendarBase($type = '1',$companyId = 0,$start_date = '',$end_date = ''){
        $data = array(
            'userkey' => $this->_userKey,
            'type' => $type,
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date
        );
        return $this->getTyqData('/invest/getCalendarBase',$data);
    }

    /**
     * 获得逾期列表
     * @param int $companyId
     * @param string $start_date
     * @param string $end_date
     * @param string $page
     * @param int $limit
     * @return Ambigous|bool
     */
    public function getInvestDetailList( array $status = array('1'), $companyId = 0,$start_date = '',$end_date  = '',$page = '1',$limit = 20,$show_tyq = 1){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date,
            'page' => $page,
            'limit' => $limit,
            'showTyq' => $show_tyq
        );
        return $this->getTyqData('/invest/getInvestDetailList',$data);
    }

    /**
     * 获取回款详情
     * @param array $status 状态
     * @param array $query
     *   包含参数 companyId = 1 默认 0
     *          start_date = '2017-05-05' 默认 ""
     *          end_date = '2017-05-05' 默认 ""
     *          loan_type = 0=>全部 1=>定期 2=>活期 默认 1
     *          title = 'loan标题' 默认 ""
     * @param int $page
     * @param int $limit
     * @param string $sort_col 排序列  allamount=>总额(本金+利息+奖励-利息管理费) amount=>本金  gain=>利息(利息-利息管理费) rewards=>奖励 end_time=>到期时间
     * @param int $sort_type 1=>倒序 -1正序
     * @param int $show_tyq 是否展示投友圈记账数据 默认展示
     */
    public function getInvestDetailListSummary( array $status = array('1'), array $query = array(),$page = 1,$limit = 20,$sort_col = '',$sort_type = 1 ,$show_tyq = 1 ){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'query' => json_encode($query),
            'page' => $page,
            'limit' => $limit,
            'sort_col' => $sort_col,
            'sort_type' => $sort_type,
            'showTyq' => $show_tyq
        );
        return $this->getTyqData('/invest/getInvestDetailListSummary',$data);
    }
    
    /**
     * 获取待处理资金笔数
     */
    public function getPendingCount(){
    	$data = array(
    			'userkey' => $this->_userKey
    	);
    	return $this->getTyqData('/invest/getPendingCount',$data);
    }

    /**
     * 获得逾期列表
     * @param int $companyId
     * @param string $start_date
     * @param string $end_date
     * @param string $page
     * @param int $limit
     * @return Ambigous|bool
     */
    public function getInvestDetailSum( array $status = array('1'), $companyId = 0,$start_date = '',$end_date  = '',$show_tyq = 1){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date,
            'showTyq' => $show_tyq
        );
        return $this->getTyqData('/invest/getInvestDetailSum',$data);
    }


    /**
     * 筛选记账数据
     * @param array $status
     * @param array $query 包含参数 loan_type company_id start_date end_date title
     * @param int $page
     * @param int $limit
     * @param string $sort_col
     * @param string $sort_type 1正序　-1倒序
     * @param int $is_summary 是否显示汇总数据
     * @return Ambigous|bool
     */
    public function getInvestBase(array $status = array(), array $query = array(), $page = 1,$limit = 20,$sort_col = 'date',$sort_type = '1',$is_summary = 0){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'query' => json_encode($query),
            'page' => $page,
            'limit' => $limit,
            'sort_col' => $sort_col,
            'sort_type' => $sort_type,
            'is_summary' => $is_summary
        );
        return $this->getTyqData('/invest/getInvestBase',$data);
    }

    /**
     * 提前还款理论还款金额
     * @param $investId
     */
    public function opAheadLoanAmount($investId){
        $data = array(
            'userkey' => $this->_userKey,
            'loanID' => $investId
        );
        return $this->getTyqData('/invest/opAheadLoanAmount',$data);
    }

    /**
     * 债权转让
     * @return Ambigous|bool
     */
    public function transferLoan($loanId,$amount,$terminalId = 2){
        $data = array(
            'userkey' => $this->_userKey,
            'loanId' => $loanId,
            'amount' => $amount,
            'terminalId' => $terminalId
        );
        return $this->getTyqData('/invest/transferLoan',$data);
    }


    /**
     * 添加建议平台
     * @param $name
     * @param $link
     * @return Ambigous|bool
     */
    public function addSuggestCompany($name,$link){
        $data = array(
            'userkey' => $this->_userKey,
            'name' => $name,
            'link' => $link
        );
        return $this->getTyqData('/common/addSuggestCompany',$data);
    }

    /**
     * 获取待处理数据汇总
     * 记账APP信息定时提醒用
     * @return bool|void
     */
    public function getPendingDataSum($endTime = ''){
        $data = array(
            'userkey' => '',
            'endTime' => $endTime
        );
        return $this->getTyqData('/invest/getPendingDataSum',$data);
    }

    /**
     * 添加平台名称
     * @param string $pName
     * @return Ambigous|bool
     */
    public function addPlatformName($pName = ''){
        $data = array(
            'userkey' => $this->_userKey,
            'pname' => $pName
        );
        return $this->getTyqData('/invest/addPlatformName',$data);
    }

    /**
     * 更新平台名称
     * @param $id
     * @param $pName
     * @return Ambigous|bool
     */
    public function updatePlatformName($id,$pName){
        $data = array(
            'userkey' => $this->_userKey,
            'id' => $id,
            'pname' => $pName
        );
        return $this->getTyqData('/invest/updatePlatformName',$data);
    }

    /**
     * 平台用户名列表
     * @return Ambigous|bool
     */
    public function getPlatformNameList(){
        $data = array(
            'userkey' => $this->_userKey
        );
        return $this->getTyqData('/invest/getPlatformNameList',$data);
    }

    /**
     * 删除平台用户名
     * @param $id
     * @return Ambigous|bool
     */
    public function deletePlatformName($id){
        $data = array(
            'userkey' => $this->_userKey,
            'id' => $id
        );
        return $this->getTyqData('/invest/deletePlatformName',$data);
    }


    /**
     * 调整回款数据
     * @param $detailId
     * @param $amount
     * @param $gains
     * @param $endDate
     * @return Ambigous|bool
     */
    public function updateInvestsDetail($detailId,$amount,$gains,$endDate,$terminalId){
        $data = array(
            'userkey' => $this->_userKey,
            'amount' => $amount,
            'detailId' => $detailId,
            'gains' => $gains,
            'endDate' => $endDate,
            'terminalId' => $terminalId
        );
        return $this->getTyqData('/invest/updateInvestsDetail',$data);
    }


    /**
     * 按照回款方式统计投资本金
     * @return Ambigous|bool
     */
    public function getInvestsDetailByPayWay($type, $has_list = 1, $page = 0, $page_size = 0){
        $data = array(
            'type' => $type,
            'userkey' => $this->_userKey,
            'has_list' => $has_list,
            'page' => $page,
            'page_size' => $page_size,
        );
        return $this->getTyqData('/invest/getInvestsDetailByPayWay',$data);
    }


    /**
     * 根据投资期限类型获取投资本金
     * @return Ambigous|bool
     */
    public function getInvestsDetailByPeriodLevel($type, $has_list = 1, $page = 0, $page_size = 0){
        $data = array(
            'status' => $type,
            'userkey' => $this->_userKey,
            'has_list' => $has_list,
            'page' => $page,
            'page_size' => $page_size,
        );
        return $this->getTyqData('/invest/getInvestsDetailByPeriodLevel',$data);
    }

    /**
     * 根据投资期限类型获取投资本金
     * @return Ambigous|bool
     */
    public function getInvestsDetailByPName($type, $has_list = 1, $page = 0, $page_size = 0){
        $data = array(
            'status' => $type,
            'userkey' => $this->_userKey,
            'has_list' => $has_list,
            'page' => $page,
            'page_size' => $page_size,
        );
        return $this->getTyqData('/invest/getInvestsDetailByPName',$data);
    }

    public function getInvestsDetailByCompany($status, $has_list = 1, $page = 0, $page_size = 0){
        $data = array(
            'status' => $status,
            'userkey' => $this->_userKey,
            'has_list' => $has_list,
            'page' => $page,
            'page_size' => $page_size,
        );
        return $this->getTyqData('/invest/getInvestsDetailByCompany',$data);
    }


 /**
     * 更新邮件通知
     * @param $data
     * @return Ambigous|bool
     */
    public function updateMailReminder($data)
    {
        $data = array(
            'status' => $data['status'],
            'userkey' => $this->_userKey
        );

        return $this->getTyqData('/invest/updateMailReminder', $data);
    }

    public function getMailReminder()
    {
        $data = array(
            'userkey' => $this->_userKey
        );

        return $this->getTyqData('/invest/getMailReminder', $data);
    }

    /**
     * 同步记账平台列表
     * @return Ambigous|bool
     */
    public function getAllSyncCompany(){
        $data = array(

        );
        return $this->getTyqData('/invest/getAllSyncCompany',$data);
    }

    /**
     * 添加同步平台账户信息
     * @param $companyId
     * @param $accountInfo
     * @return Ambigous|bool
     */
    public function addSyncUserAccount($companyId,$accountInfo){
        $data = array(
            'account' => $accountInfo,
            'userkey' => $this->_userKey,
            'companyId' => $companyId
        );
        return $this->getTyqData('/invest/addSyncAccountInfo',$data);
    }

    /**
     * 手动同步记账
     * @param $accountId
     * @return Ambigous|bool
     */
    public function handleSyncAccount($accountId){
        $data = array(
            'accountId' => $accountId,
            'userkey' => $this->_userKey,
        );
        return $this->getTyqData('/invest/handleSyncAccount',$data);
    }

    /**
     * 获取同步状态
     * @param $taskId
     * @return Ambigous|bool
     */
    public function getTaskProcess($taskId){
        $data = array(
            'userkey' => $this->_userKey,
            'taskId' => $taskId
        );
        return $this->getTyqData('/invest/getTaskProcess',$data);
    }

    /**
     * 同步记账修改额外收益
     * @param $accountId
     * @param $extraAmount
     *
     */
    public function editSyncExtraAmount($investId,$extraAmount){
        $data = array(
            'userkey' => $this->_userKey,
            'investId' => $investId,
            'extraAmount' => $extraAmount
        );
        return $this->getTyqData('/invest/editSyncExtraAmount',$data);
    }

    /**
     * 获取平台账号信息
     * @param $companyId
     * @param $accountId
     * @return Ambigous|bool
     */
    public function getAccountInfo($companyId,$accountId){
        $data = array(
            'userkey' => $this->_userKey,
            'companyId' => $companyId,
            'accountId' => $accountId
        );
        return $this->getTyqData('/invest/getAccountInfo',$data);
    }

    /**
     * 获取同步记账平台列表
     * @return Ambigous|bool
     */
    public function getSyncAccountList($page,$limit,$isSyncType = 1, $terminal_type = '', $app_version = ''){
        $data = array(
            'userkey' => $this->_userKey,
            'page' => $page,
            'limit' => $limit,
            'isSyncType' => $isSyncType,
            'terminal_type' => $terminal_type,
            'app_version' => $app_version
        );
        return $this->getTyqData('/invest/getSyncAccountList',$data);
    }


    /**
     * 获取非同步的记账平台列表
     * @return Ambigous|bool
     */
    public function getAccountCountData($isSyncType = 1){
        $data = array(
            'userkey' => $this->_userKey,
            'isSyncType' => $isSyncType
        );
        return $this->getTyqData('/invest/getAccountCountData',$data);
    }

    /**
     * 销毁账户
     * @param $accountId
     * @param $companyId
     * @return Ambigous|bool
     */
    public function destroyAccount($accountId,$companyId){
        $data = array(
            'userkey' => $this->_userKey,
            'companyId' => $companyId,
            'accountId' => $accountId
        );
        return $this->getTyqData('/invest/destroyAccount',$data);
    }
    
    /**
     * 查看自动同步记账列表
     */
    public function getSyncList(){
    	$data = array(
    			'userkey' => $this->_userKey
    	);
    	return $this->getTyqData('/invest/getSyncList',$data);
    }
    
    /**
     *获取单条评论
     */
    public function getSingleComment($id, $userKey = ''){
    	$data = array(
    			'userkey'=>$userKey,
    			'id' => $id
    	);
    	return $this->getTyqData('/Invest/getSingleComment',$data);
    }
    
    /**
     *获取单条评论下的回复列表
     */
    public function getCommentReply($id){
    	$data = array(
    			'id' => $id
    	);
    	return $this->getTyqData('/Invest/getCommentReply',$data);
    }
    
    /**
     *获取单条回复
     */
    public function getSingleReply($id){
    	$data = array(
    			'id' => $id
    	);
    	return $this->getTyqData('/Invest/getSingleReply',$data);
    }

    /**
     * 图表统计 根据平台名称
     */
    public function getInvestsByCompany($status, $page = 0, $page_size = 0){
        $data = array(
            'status' => $status,
            'userkey' => $this->_userKey,
            'page' => $page,
            'page_size' => $page_size,
        );
        return $this->getTyqData('/newinvest/getInvestsByCompany', $data);
    }

    /**
     * 图表统计 根据付款方式
     */
    public function getInvestsByPayWay($status, $page = 0, $page_size = 0){
        $data = array(
            'status' => $status,
            'userkey' => $this->_userKey,
            'page' => $page,
            'page_size' => $page_size,
        );
        return $this->getTyqData('/newinvest/getInvestsByPayWay', $data);
    }

    /**
     * 图表统计  根据平台账号
     */
    public function getInvestsByPName($status, $page = 0, $page_size = 0){
        $data = array(
            'status' => $status,
            'userkey' => $this->_userKey,
            'page' => $page,
            'page_size' => $page_size,
        );
        return $this->getTyqData('/newinvest/getInvestsByPName', $data);
    }

    /**
     * 图表统计  根据期限
     */
    public function getInvestsByPeriodLevel($status, $page = 0, $page_size = 0){
        $data = array(
            'status' => $status,
            'userkey' => $this->_userKey,
            'page' => $page,
            'page_size' => $page_size,
        );
        return $this->getTyqData('/newinvest/getInvestsByPeriodLevel', $data);
    }

    /**
     * 图表统计 二级接口
     */
    public function getInvestsList($type, $status, $params, $page, $page_size) {
        $data = array(
            'type' => $type,
            'status' => $status,
            'params' => $params,
            'page' => $page,
            'pageSize' => $page_size,
            'userkey' => $this->_userKey,
            );
        return $this->getTyqData('/newinvest/getInvestsList', $data);
    }

    public function getNewInvestByMonth(array $status,$companyId = '',$start_date = '',$end_date = '', $has_list = 1){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'companyId' => $companyId,
            'startDate' => $start_date,
            'endDate' => $end_date,
            'has_list' => $has_list,
        );
        return $this->getTyqData('/newinvest/getNewInvestByMonth',$data);
    }


    public function getInvestListByMonth(array $status,$companyId = '',$start = '', $end = '', $page = 1, $page_size = 10){
        $data = array(
            'userkey' => $this->_userKey,
            'status' => json_encode($status),
            'companyId' => $companyId,
            'start' => $start,
            'end' => $end,
            'page' => $page,
            'page_size' => $page_size
        );
        return $this->getTyqData('/newinvest/getInvestListByMonth',$data);
    }

}