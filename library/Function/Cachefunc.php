<?php
/**
 * cache 独立应用
 * User: nengzhi
 * Date: 15-10-18
 */
class Function_Cachefunc{

	private static $cache_obj = null;
	private static $obj = null;
	private static $cache_tag = 'Func_Cachefunc_tag_';
	
	public function __construct(){
		$cache_factory = new Cache_Factory();
		self::$cache_obj = $cache_factory->getCacheAdapter();
	}
	
	/**
	 * 单例获取
	 * 保证一条进程只产生一个Module对象
	 */
	public static function getInstance() {
	
		if (empty ( self::$obj )) {
			self::$obj = new Function_Cachefunc();
		}
		return self::$obj;
	}
	/**
	 * 评论防灌水--（获取当前评论条数）
	 * @param unknown $cacheName
	 * @param unknown $cid
	 * @param unknown $cuid
	 * @return multitype:number unknown
	 */
	public function getInvestCommentNum($cacheName,$cid,$cuid){;
		$memkey = self::$cache_tag . "{$cacheName}_{$cid}_{$cuid}";
		$num = self::$cache_obj->get($memkey);
		if(!$num || !$num){
			$now = time();
			$num = array('num'=>0,'last_comment'=>$now);
			//离明天的时间
			$timeleap = strtotime(date('Ymd')) + 86400 - $now;
			self::$cache_obj->set($memkey,$num,$timeleap);
			return $num;
		}
		return $num;
	}
	/**
	 * 评论防灌水--（记录评论条数）
	 * @param unknown $cacheName
	 * @param unknown $cid
	 * @param unknown $cuid
	 * @return boolean
	 */
	public function addInvestCommentNum($cacheName,$cid,$cuid){
		$memkey = self::$cache_tag . "{$cacheName}_{$cid}_{$cuid}";
		$num = $this->getInvestCommentNum($cacheName,$cid,$cuid);
		$num['num'] = $num['num'] + 1;
		$num['last_comment'] = time();
		
		//离明天的时间
		$timeleap = strtotime(date('Ymd')) + 86400 - time();
		$res = self::$cache_obj->set($memkey,$num,$timeleap);
		return $res;
	}
	
	/**
	 * 评论防灌水--（验证是否可评论）
	 * @param unknown $cacheName
	 * @param unknown $cid
	 * @param unknown $cuid
	 * @return boolean
	 */
	public function checkInvestCommentLeap($cacheName, $cid,$cuid){
		$num = $this->getInvestCommentNum($cacheName,$cid,$cuid);
		if($num['num'] > 0 && (time() - $num['last_comment']) <= 1){
			return false;
		}
		if($num['num']){
			$leap = time() - $num['last_comment'];
			$limit = pow(1.5,floatval($num['num']));
			return $leap > $limit;
		}
		return true;
	}
	/**
	 * 添加一个cache缓存
	 * @param unknown $memkey
	 * @param unknown $value 
	 * @param unknown $timeleap
	 * @return boolean
	 */
	public function set($memkey,$value, $timeleap){
		return self::$cache_obj->set($memkey,$value,$timeleap);
	}
	/**
	 * 获取一个cache缓存
	 * @param unknown $memkey
	 */
	public function get($memkey){
		return self::$cache_obj->get($memkey);
	}
	/**
	 * 删除一个cache缓存
	 * @param unknown $memkey
	 */
	public function delete($memkey){
		return self::$cache_obj->delete($memkey);
	}
}