<?php
/**
 * 
 * @author Abel
 * email:abel.zhou@hotmail.com
 * 2014-8-24
 * UTF-8
 */
interface DB_Interface{
	
	/**
	 * 获得链接
	 * @param unknown $isReader
	 */
	function getConn($isReader);
	
	/**
	 * 设置预加载sql
	 * @param unknown $sql
	 * @param unknown $data
	 */
	function setData($sql,$data);
	
	/**
	 * 执行
	 */
	function excute();
	
	/**
	 * 开启事物
	 */
	function beginTransaction();
	
	/**
	 * 关闭事物
	 */
	function commit();
	
	/**
	 * 获得全部查询结果
	 * @param unknown $isObj
	 */
	function fetchAll();
	
	/**
	 * 获得最后一个插入的id
	 */
	function lastInsertId();
	
	/**
	 * 获得受影响的行数
	 */
	function affectedCount();
	
	/**
	 * 获取单行记录
	 */
	function fetchOne();
	
	/**
	 * 获取单列记录
	 */
	function fetchColumn($column_num);
	
// 	/**
// 	 * 查询语句 不做过滤
// 	 * @param unknown $sql
// 	 * @param unknown $sqlStr
// 	 * @return array
// 	 */
// 	function query($sql);
	
// 	/**
// 	 * 插入一个数据
// 	 * @param string $table
// 	 * @param array $data
// 	 * @return int 插入成功则返回当前插入的自增id 否则返回受影响的行数
// 	 */
// 	function insert($table,$data);
	
// 	/**
// 	 * 根据条件删除一条语句
// 	 * @param unknown $table
// 	 * @param unknown $where
// 	 * @return int 受影响的行数
// 	 */
// 	function delete($table,$where);
	
// 	/**
// 	 * 修改记录
// 	 * @param unknown $table
// 	 * @param unknown $where
// 	 * @param unknown $data
// 	 * @return int 受影响的行数
// 	 */
// 	function update($table,$where,$data);	
	
// 	/**
// 	 * 获得全部
// 	 * @param string $table 表名
// 	 * @param array $where 条件
// 	 * @param string|array $orderby 排序
// 	 * @param int $offset 起始位置
// 	 * @param int $limit 读取个数
// 	 * @return array
// 	 */
// 	function fetchAll($table,$where,$orderby,$offset,$limit);
}