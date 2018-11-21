<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-20 05:47:36
  from 'D:\tools\phpStudy\PHPTutorial\WWW\myproject\user\templates\partials\header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bf39ff830f317_44007390',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c21f888b5823f1f825410b5bf8ca4b5df2a0820c' => 
    array (
      0 => 'D:\\tools\\phpStudy\\PHPTutorial\\WWW\\myproject\\user\\templates\\partials\\header.tpl',
      1 => 1542610593,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5bf39ff830f317_44007390 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="Dashboard">
<meta name="keyword" content="Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
<title><?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_17474891955bf39ff8307612_08763614', 'title');
?>
</title>
<!-- Favicons -->
<link href="" rel="icon">
<link href="" rel="apple-touch-icon">

<!-- Bootstrap core CSS -->
<link href="/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<!--external css-->
<link href="/lib/font-awesome/css/font-awesome.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="/css/zabuto_calendar.css">
<link rel="stylesheet" type="text/css" href="/lib/gritter/css/jquery.gritter.css" />
<!-- Custom styles for this template -->
<link href="/css/style.css" rel="stylesheet">
<link href="/css/style-responsive.css" rel="stylesheet">
<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.4.1.3.css">
<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_5747727485bf39ff830b498_96477252', 'page_style');
?>





<?php }
/* {block 'title'} */
class Block_17474891955bf39ff8307612_08763614 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'title' => 
  array (
    0 => 'Block_17474891955bf39ff8307612_08763614',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>
农联网<?php
}
}
/* {/block 'title'} */
/* {block 'page_style'} */
class Block_5747727485bf39ff830b498_96477252 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_style' => 
  array (
    0 => 'Block_5747727485bf39ff830b498_96477252',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'page_style'} */
}
