<?php
/**
 * 格式化数字
 * @param unknown $params
 * @param unknown $compiler
 * @return string
 */
function smarty_modifiercompiler_smarty_number_format($params, $compiler) {
	return 'number_format(' . $params [0] . ', 2, \'.\', \'\' )';
}

?>