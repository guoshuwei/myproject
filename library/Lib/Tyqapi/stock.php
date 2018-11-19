<?php
/**
 * 投友圈股票接口
 * @author yx
 *
 */
class TyLib_Tyqapi_stock extends TyLib_Tyqapi_Base {
	private static $obj = null;
	private $_userKey = '';
	public static function getInstance() {
		if (is_null ( self::$obj )) {
			self::$obj = new self ();
		}
		return self::$obj;
	}
	
	/**
	 * 设置用户userKey
	 * @param $userKey
	 * @return $this
	 */
	public function setUserKey($userKey) {
		$this->_userKey = $userKey;
		return $this;
	}
	
	/**
	 * 股票记一笔
	 */
	public function addStock($tradeInfo) {
		$data = array (
				'userkey' => $this->_userKey,
				'tradeInfo' => json_encode ( $tradeInfo )
		);
		return $this->getTyqData ( '/stock/addStock', $data );
	}
	
	/**
	 * 股票追加，赎回
	 */
	public function buyOrSell($tradeInfo) {
		$data = array (
				'userkey' => $this->_userKey,
				'tradeInfo' => json_encode ( $tradeInfo )
		);
		return $this->getTyqData ( '/stock/buyOrSell', $data );
	}
	
	/**
	 * 我的股票投资概况
	 */
	public function myStock() {
		$data = array (
				'userkey' => $this->_userKey
		);
		return $this->getTyqData ( '/stock/myStock', $data );
	}
	
	/**
	 * 持有股票统计，分布，列表
	 */
	public function stockList(array $query = array(), $page = 1, $limit = 20, $sort_col = '', $sort_type = 1) {
		$data = array (
				'userkey' => $this->_userKey,
				'query' => json_encode ( $query ),
				'page' => $page,
				'limit' => $limit,
				'sort_col' => $sort_col,
				'sort_type' => $sort_type
		);
		return $this->getTyqData ( '/stock/stockList', $data );
	}
	
	/**
	 * 用户单只股票投资概况
	 */
	public function getUserStockInfo($stockId) {
		$data = array (
				'userkey' => $this->_userKey,
				'stockId' => $stockId
		);
		return $this->getTyqData ( '/stock/getUserStockInfo', $data );
	}
	
	/**
	 * 删除用户单只股票投资概况
	 */
	public function delUserStockInfo($stockId) {
		$data = array (
				'userkey' => $this->_userKey,
				'stockId' => $stockId
		);
		return $this->getTyqData ( '/stock/delUserStockInfo', $data );
	}
	
	/**
	 * 单只股票的投资记录
	 */
	public function stockRecords($stockId, $page = 1, $limit = 20) {
		$data = array (
				'userkey' => $this->_userKey,
				'stockId' => $stockId,
				'page' => $page,
				'limit' => $limit
		);
		return $this->getTyqData ( '/stock/stockRecords', $data );
	}
	
	/**
	 * 股票30k数据
	 */
	public function getStock30KList($stockId, $limit) {
		$data = array (
				'userkey' => '',
				'stockId' => $stockId,
				'limit' => $limit
		);
		return $this->getTyqData ( '/stock/getStock30KList', $data );
	}

	/**
	 * 股票日k数据
	 */
	public function getStockDayList($stockId, $beginTime, $endTime) {
		$data = array (
			'userkey' => '',
			'stockId' => $stockId,
			'beginDate' => $beginTime,
			'endDate' => $endTime
		);
		return $this->getTyqData ( '/stock/getStockDayList', $data );
	}

	/**
	 * 用户每日收益列表
	 * @return bool|void
	 */
	public function getUserStockDayGains($beginTime, $endTime) {
		$data = array (
			'userkey' => $this->_userKey,
			'beginDate' => $beginTime,
			'endDate' => $endTime
		);
		return $this->getTyqData ( '/stock/getUserStockDayGains', $data );
	}
	
	/**
	 * 全部股票列表
	 */
	public function getAllListedStockList() {
		$data = array (
				'userkey' => $this->_userKey
		);
		return $this->getTyqData ( '/stock/getAllListedStockList', $data );
	}
}