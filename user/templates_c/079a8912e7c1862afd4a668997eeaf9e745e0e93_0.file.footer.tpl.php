<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-13 04:08:39
  from '/var/www/user/templates/partials/footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bea4e47ecd285_84700049',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '079a8912e7c1862afd4a668997eeaf9e745e0e93' => 
    array (
      0 => '/var/www/user/templates/partials/footer.tpl',
      1 => 1542081831,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5bea4e47ecd285_84700049 (Smarty_Internal_Template $_smarty_tpl) {
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
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_7064496515bea4e47ecc083_24298989', "page_scripts");
}
/* {block "page_scripts"} */
class Block_7064496515bea4e47ecc083_24298989 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_scripts' => 
  array (
    0 => 'Block_7064496515bea4e47ecc083_24298989',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>


  <?php
}
}
/* {/block "page_scripts"} */
}
