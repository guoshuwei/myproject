<?php
/**
 * 获取数字小数部分
 * @param unknown $params
 * @param unknown $compiler
 * @return string
 */
function smarty_modifiercompiler_smarty_decimal($params, $compiler) {
	$number_format = 'number_format(' . $params [0] . ', 2, \'.\', \'\' )';
	$strpos_i = 'strpos(' . $number_format . ',\'.\'' . ')';
	$substr_str = 'substr(' . $number_format . ',' . $strpos_i . ')';
	return 'str_replace(' . '\'.\'' . ',' . '\'\'' . ',' . $substr_str . ')';
}

?>