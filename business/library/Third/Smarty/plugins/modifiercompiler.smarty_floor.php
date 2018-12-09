<?php
/**
 * 获取数字整数部分
 * @param unknown $params
 * @param unknown $compiler
 * @return string
 */
function smarty_modifiercompiler_smarty_floor($params, $compiler) {
	$number_format = 'number_format(' . $params [0] . ', 2, \'.\', \'\' )';
	$strpos_i = 'strpos(' . $number_format . ',\'.\'' . ')';
	return 'substr(' . $number_format . ',' . '0' . ',' . $strpos_i . ')';
}

?>