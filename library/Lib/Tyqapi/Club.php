<?php

/**
 * 会员俱乐部
 * @author yx
 * 2017年 09月 30日
 */
class TyLib_Tyqapi_Club extends TyLib_Tyqapi_Base
{
    private static $obj = null;
    private $_userKey = '';

    public static function getInstance()
    {
        if (is_null(self::$obj)) {
            self::$obj = new self ();
        }
        return self::$obj;
    }

    /**
     * 添加商品
     */
    public function addGoods($userkey, array $goodsData)
    {
        $data = array(
            'userkey' => $userkey,
            'goodsData' => json_encode($goodsData)
        );
        return $this->getTyqData('/club/addGoods', $data);
    }

    /**
     * 编辑商品
     */
    public function editGoods($userkey, array $goodsData)
    {
        $data = array(
            'userkey' => $userkey,
            'goodsData' => json_encode($goodsData)
        );
        return $this->getTyqData('/club/editGoods', $data);
    }

    /**
     * 商品列表
     */
    public function goodsList($userkey,$query, $page, $limit,$cache = false) {
        $data = array (
            'userkey' => $userkey,
            'query' => json_encode($query),
            'page' => $page,
            'limit' => $limit,
        );
        return $this->getTyqData ( '/club/goodsList', $data );
    }

    /**
     * 获取商品
     */
    public function getGoods($userkey, $goods_id, $cache = false)
    {
        $data = array(
            'userkey' => $userkey,
            'goods_id' => $goods_id
        );
        return $this->getTyqData('/club/getGoods', $data);
    }

    /**
     * 兑换商品
     */
    public function exchangeGoods($userkey, $goods_id, $activity, $pid, $terminal_type)
    {
        $data = array(
            'userkey' => $userkey,
            'goods_id' => $goods_id,
            'activity' => 'clubgoods',
            'pid' => null,
            'terminal_type' => $terminal_type
        );
        return $this->getTyqData('/club/exchangeGoods', $data);
    }

    /**
     * 兑换记录
     */
    public function exchangeRecord($userkey, $page = 1, $limit = 20)
    {
        $data = array(
            'userkey' => $userkey,
            'page' => $page,
            'limit' => $limit,
        );
        return $this->getTyqData('/club/getOrderGoods', $data);
    }

    /**
     * 兑换理财币
     */
    public function exchangeCurrency($userkey, $funds, $terminal_type)
    {
        $data = array(
            'userkey' => $userkey,
            'funds' => $funds,
            'terminal_type' => $terminal_type,
        );
        return $this->getTyqData('/club/exchangeCurrency', $data);
    }
    
    /**
     * 兑换记录全部
     */
    public function getOrderGoodsAll($page, $limit,$query) {
    	$data = array(
    			'page' => $page,
            	'limit' => $limit,
                'query' => json_encode($query),
    	);
    	return $this->getTyqData('/club/getOrderGoodsAll', $data);
    }

    
    /**
     * 处理订单
     */
    public function handlingOrder($rec_id, $order_status) {
    	$data = array(
    			'rec_id' => $rec_id,
    			'order_status' => $order_status
    	);
    	return $this->getTyqData('/club/handlingOrder', $data);
    }

}