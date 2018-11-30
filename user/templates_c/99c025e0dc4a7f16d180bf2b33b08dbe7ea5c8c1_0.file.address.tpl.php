<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-29 11:06:21
  from 'D:\tools\phpStudy\PHPTutorial\WWW\myproject\user\templates\address.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bff57ad21a895_26669977',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '99c025e0dc4a7f16d180bf2b33b08dbe7ea5c8c1' => 
    array (
      0 => 'D:\\tools\\phpStudy\\PHPTutorial\\WWW\\myproject\\user\\templates\\address.tpl',
      1 => 1543460778,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:partials/header.tpl' => 1,
    'file:inc/invest_script_template.tpl' => 1,
    'file:partials/footer.tpl' => 1,
  ),
),false)) {
function content_5bff57ad21a895_26669977 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php $_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_8989998205bff57ad212b89_19808050', 'page_style');
?>

</head>
<body>
  <section id="container">
    <!-- **********************************************************************************************************************************************************
        TOP BAR CONTENT & NOTIFICATIONS
        *********************************************************************************************************************************************************** -->
    <!--header start-->
    <header class="header black-bg">
      <div class="sidebar-toggle-box">
        <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
      </div>
      <!--logo start-->
      <a href="index.html" class="logo"><b>农联网</span>LOGO</b></a>
      <!--logo end-->
      <div class="nav notify-row" id="top_menu">
        <!--  notification start -->
        <ul class="nav top-menu">
          <!-- notification dropdown end -->
        </ul>
        <!--  notification end -->
      </div>
      <div class="top-menu">
        <ul class="nav pull-right top-menu">
          <li><a class="logout" href="login.html">退出登录</a></li>
        </ul>
      </div>
    </header>
    <!--header end-->
    <!-- **********************************************************************************************************************************************************
        MAIN SIDEBAR MENU
        *********************************************************************************************************************************************************** -->
    <!--sidebar start-->
    <aside>
      <div id="sidebar" class="nav-collapse ">
        <!-- sidebar menu start-->
        <ul class="sidebar-menu" id="nav-accordion">
          <p class="centered"><a href="profile.html"><img src="/img/ui-sam.jpg" class="img-circle" width="80"></a></p>
          <h5 class="centered"></h5>
          <li class="mt">
            <a href="home.php">
              <i class="fa fa-dashboard"></i>
              <span>帐号信息</span>
              </a>
          </li>
          <li class="sub-menu">
            <a href="profile.php">
              <i class="fa fa-desktop"></i>
              <span>绑定信息</span>
              </a>
          </li>
          <li class="sub-menu">
            <a href="javascript:;">
              <i class="fa fa-cogs"></i>
              <span>修改密码</span>
              </a>
          </li>
          <li class="sub-menu">
            <a href="javascript:;">
              <i class="fa fa-book"></i>
              <span>我的奖励</span>
              </a>
          </li>
          <li class="sub-menu">
            <a class="active" href="address.php">
              <i class="fa fa-tasks"></i>
              <span>收货地址</span>
              </a>
          </li>
          <li class="sub-menu">
            <a href="javascript:;">
              <i class="fa fa-th"></i>
              <span>我的订单</span>
              </a>
          </li>
          <li>
            <a href="inbox.html">
              <i class="fa fa-envelope"></i>
              <span>消息</span>
              <span class="label label-theme pull-right mail-info">2</span>
              </a>
          </li>
          <li>
            <a href="google_maps.html">
              <i class="fa fa-map-marker"></i>
              <span>FAQ </span>
              </a>
          </li>
        </ul>
        <!-- sidebar menu end-->
      </div>
    </aside>
    <!--sidebar end-->
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        ******************************************************************************************
        ****************************************************************** -->
    <!--main content start-->
    <section id="main-content">
      <section class="wrapper">
          <div class="bind-wrap">
                <div class="my-bind">
                    <div class="bind-wrap-head">
                        <div class="bind-wrap-head-ui">收货信息<a class="bind-wrap-return" onclick="window.history.back()">< 返回</a></div>
                    </div>
                    <form action="address.php" method="post" role="ajaxfrom" class="address-form" >
                        <input type="hidden" name="id" value=""/>
                        <input type="hidden" class="getprovince" value=""/>
                        <input type="hidden" class="getcity" value=""/>
                        <input type="hidden" class="getcounty" value=""/>
                        <ul class="address-form-list">
                            <li class="address-form-item" role-prompt="address">
                                <div class="address-form-box clearfix">
                                    <div class="left address-form-box-text">收件人:</div>
                                    <input type="text" class="left address-form-box-input" name="consignee" value="" data-valid="notempty" placeholder="不得大于15个汉字">
                                </div>
                                <div class="address-form-desc">
                                    <span class="address-form-desc-text color" role-prompt="info">*<span></span></span>
                                </div>
                            </li>
                            <li class="address-form-item" role-prompt="address">
                                <div class="address-form-box clearfix">
                                    <div class="left address-form-box-text">手机号码:</div>
                                    <input type="text" class="left address-form-box-input" name="phone" value="" data-valid="mobile" placeholder="电话号码">
                                </div>
                                <div class="address-form-desc">
                                    <span class="address-form-desc-text" role-prompt="info">*<span></span></span>
                                </div>
                            </li>
                            <li class="address-form-item">
                                <div class="address-form-box clearfix">
                                    <div class="left address-form-box-text">地址:</div>
                                    <div class="left clearfix">
                                        <div class="address-form-box-select clearfix">
                                            <div class="address-select-item">
                                                <select id="cmbProvince" name="province" class="cmbProvince">
                                                </select>
                                            </div>
                                            <div class="address-select-item">
                                                <select id="cmbCity" name="city" class="cmbCity"></select>
                                            </div>
                                            <div class="address-select-item nomargin">
                                                <select id="cmbArea" name="county" class="cmbArea"></select>
                                            </div>
                                        </div>
                                        <div class="address-form-desc"></div>
                                    </div>
                                </div>
                            </li>
                            <li class="address-form-item" role-prompt="address">
                                <div class="address-form-box clearfix">
                                    <div class="left address-form-box-text">详细地址:</div>
                                    <textarea rows="10" cols="30" class="left address-form-box-input w573 " placeholder="请输入详细地址" name="address" data-valid="notempty"></textarea>
                                </div>
                                <div class="address-form-desc">
                                    <span class="address-form-desc-text" role-prompt="info">*<span></span></span>
                                </div>
                            </li>
                            <li class="address-form-item address-submit">
                                <input type="submit" class="address-submit-btn" value="保存">
                            </li>
                        </ul>
                    </form>
                </div>
            </div>     
      </section>
    </section>
    <!--main content end-->
    <!--footer start-->
    <footer class="site-footer">
        <div class="text-center">
            <p>
              &copy; Copyrights <strong>农联网</strong>. All Rights Reserved
            </p>
            <a href="index.html#" class="go-top">
               <i class="fa fa-angle-up"></i>
            </a>
        </div>
    </footer>
    <!--footer end-->
  </section>
<?php $_smarty_tpl->_subTemplateRender("file:inc/invest_script_template.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->_subTemplateRender("file:partials/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</body>
</html>
<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_5291396855bff57ad216a07_59139599', "page_scripts");
?>

<?php }
/* {block 'page_style'} */
class Block_8989998205bff57ad212b89_19808050 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_style' => 
  array (
    0 => 'Block_8989998205bff57ad212b89_19808050',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <link rel="stylesheet" type="text/css" href="/css/address.css">
<?php
}
}
/* {/block 'page_style'} */
/* {block "page_scripts"} */
class Block_5291396855bff57ad216a07_59139599 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_scripts' => 
  array (
    0 => 'Block_5291396855bff57ad216a07_59139599',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php echo '<script'; ?>
 type="text/javascript" src="/scripts/pc/spacecp_address_com.js" init="pc/spacecp_address"><?php echo '</script'; ?>
>
<?php
}
}
/* {/block "page_scripts"} */
}
