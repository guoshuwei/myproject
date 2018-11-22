<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-20 05:47:36
  from 'D:\tools\phpStudy\PHPTutorial\WWW\myproject\user\templates\partials\footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bf39ff83cab46_56798614',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ef659d5e67fa597682fae95c774190d37a76a2dc' => 
    array (
      0 => 'D:\\tools\\phpStudy\\PHPTutorial\\WWW\\myproject\\user\\templates\\partials\\footer.tpl',
      1 => 1542610593,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5bf39ff83cab46_56798614 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!-- js placed at the end of the document so the pages load faster -->
  <?php echo '<script'; ?>
 src="/lib/jquery/jquery.min.js"><?php echo '</script'; ?>
>

  <!-- <?php echo '<script'; ?>
 src="/lib/bootstrap/js/bootstrap.min.js"><?php echo '</script'; ?>
> -->
  <?php echo '<script'; ?>
 class="include" type="text/javascript" src="/lib/jquery.dcjqaccordion.2.7.js"><?php echo '</script'; ?>
>
  <?php echo '<script'; ?>
 src="/lib/jquery.scrollTo.min.js"><?php echo '</script'; ?>
>
  <?php echo '<script'; ?>
 src="/lib/jquery.nicescroll.js" type="text/javascript"><?php echo '</script'; ?>
>
  <?php echo '<script'; ?>
 src="/lib/jquery.sparkline.js"><?php echo '</script'; ?>
>
  <!--common script for all pages-->
  <!-- <?php echo '<script'; ?>
 src="/lib/common-scripts.js"><?php echo '</script'; ?>
> -->
  <?php echo '<script'; ?>
 type="text/javascript" src="/lib/gritter/js/jquery.gritter.js"><?php echo '</script'; ?>
>
  <?php echo '<script'; ?>
 type="text/javascript" src="/lib/gritter-conf.js"><?php echo '</script'; ?>
>
  <!--script for this page-->
  <?php echo '<script'; ?>
 src="/lib/sparkline-chart.js"><?php echo '</script'; ?>
>
  <?php echo '<script'; ?>
 src="/lib/zabuto_calendar.js"><?php echo '</script'; ?>
>
  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_8963048935bf39ff83c6cc6_19160788', "page_scripts");
}
/* {block "page_scripts"} */
class Block_8963048935bf39ff83c6cc6_19160788 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_scripts' => 
  array (
    0 => 'Block_8963048935bf39ff83c6cc6_19160788',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>


  <?php
}
}
/* {/block "page_scripts"} */
}
