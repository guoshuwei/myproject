<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-9-23
 * UTF-8
 */
interface Cache_Interface{
	
	/**
	 * 设置一个cache缓存
	 * @param unknown $key
	 * @param unknown $value
	 * @return boolean
	 */
	function set($key,$value,$expire);
	
	/**
	 * 取出一个缓存key的值
	 * @param unknown $key
	 * @return array
	 */
	function get($key);
	
	/**
	 * 删除一个缓存
	 * @param unknown $key
	 * @return boolean
	 */
	function delete($key);
	
}