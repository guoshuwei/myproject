<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-01 12:21:26
  from '/var/www/otc_option/templates/partials/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bdaefc69c3a98_28643927',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c6d8727e0d374915b48a8cf35bab83ae9a5e5652' => 
    array (
      0 => '/var/www/otc_option/templates/partials/header.tpl',
      1 => 1541070895,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5bdaefc69c3a98_28643927 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_16184053305bdaefc69c19c9_92871288', 'title');
?>
</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	
</head>
<body>
	<?php echo '<script'; ?>
 src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"><?php echo '</script'; ?>
>
	<?php echo '<script'; ?>
 src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"><?php echo '</script'; ?>
>
	<?php echo '<script'; ?>
 src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"><?php echo '</script'; ?>
>
</body>
</html>


<?php }
/* {block 'title'} */
class Block_16184053305bdaefc69c19c9_92871288 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'title' => 
  array (
    0 => 'Block_16184053305bdaefc69c19c9_92871288',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>
农联网<?php
}
}
/* {/block 'title'} */
}
