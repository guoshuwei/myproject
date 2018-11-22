<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-17 06:25:50
  from '/var/www/user/templates/profile.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5befb46e210aa2_68739630',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '22c3b85a95ac33caace98009d6c1ff00968f1345' => 
    array (
      0 => '/var/www/user/templates/profile.tpl',
      1 => 1542435900,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:partials/header.tpl' => 1,
    'file:partials/footer.tpl' => 1,
  ),
),false)) {
function content_5befb46e210aa2_68739630 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php $_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_4357662955befb46e2092d2_29360226', 'page_style');
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
          <li><a class="logout" href="login.php">退出登录</a></li>
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
          <h5 class="centered"><?php echo $_smarty_tpl->tpl_vars['username']->value;?>
</h5>
          <li class="mt">
            <a class="active" href="home.php">
              <i class="fa fa-dashboard"></i>
              <span>帐号信息</span>
              </a>
          </li>
          <li class="sub-menu">
            <a href="javascript:;">
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
            <a href="javascript:;">
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
                    <form action="profile.php" method="post" role="ajaxfrom">
                        <div class="bind-wrap-head">
                            <div class="bind-wrap-head-ui">基本资料<a class="bind-wrap-return" onclick="window.history.back()">< 返回</a></div>
                        </div>
                        <table cellspacing="0" cellpadding="0" class="tfm personal" id="profilelist">
                            <tbody>
                                <tr class="tr-name">
                                    <th class="th-width">用户名</th>
                                    <td class="td-width"></td>
                                    <td class="overt-width">&nbsp;</td>
                                </tr>
                                <tr class="tr-margin tr-gender">
                                    <th class="th-width">性别</th>
                                    <th id="th_gender" class="th_box">
                                    </th>
                                    <td class="td-width">
                                        <?php echo $_smarty_tpl->tpl_vars['gender_component']->value;?>
     
                                    </td>                
                                </tr>
                                <tr class="tr-margin tr-birthday">
                                    <th class="th-width">生日</th>
                                    <th id="th_birthday" class="th_box"></th>
                                    <td class="td-width"><?php echo $_smarty_tpl->tpl_vars['birth_component']->value;?>
</td>
                                    <td class="overt-width">&nbsp;</td>
                                </tr>
                                <tr class="tr-margin th_residecity">
                                    <th class="th-width">居住地</th>
                                    <th id="th_residecity" class="th_box"></th>
                                    <td class="td-width"><?php echo $_smarty_tpl->tpl_vars['residecity_component']->value;?>
</td>
                                    <td class="overt-width">&nbsp;</td>
                                </tr>
                                <tr class="tr-margin tr-field1">
                                    <th class="th-width">邮箱</th>
                                    <th id="th_field1" class="th_box">
                                    </th>
                                    <td class="td-width">
                                        <input type="text" name="field1" id="field1" class="rel-width" value="" tabindex="1">     
                                    </td>                
                                </tr>
                                <tr class="tr-margin tr-field3">
                                    <th class="th-width">微信号</th>
                                    <th id="th_field3" class="th_box">
                                    </th>
                                    <td class="td-width">
                                        <input type="text" name="field3" id="field3" class="rel-width" value="" tabindex="1">     
                                    </td>                
                                </tr>
                                <tr class="tr-margin">
                                        <th class="th-width">固定电话</th>
                                        <th id="th_telephone" class="th_box">
                                            
                                        </th>
                                        <td class="td-width">
                                            <input type="text" name="telephone" id="telephone" class="rel-width" value="" tabindex="1">
                                        </td> 
                                </tr>
                                <tr class="tr-margin">
                                        <th class="th-width">QQ</th>
                                        <th id="th_qq" class="th_box">
                                            
                                        </th>
                                        <td class="td-width">
                                            <input type="text" name="qq" id="qq" class="rel-width" value="" tabindex="1">
                                        </td> 
                                </tr>
                                <tr class="tr-margin">
                                        <th class="th-width">公司</th>
                                        <td class="td-width">
                                            <input type="text" name="company" id="company" class="rel-width" value="" tabindex="1">
                                        </td>
                                    </tr>
                                    <tr class="tr-margin">
                                        <th class="th-width">职业</th>
                                        <td class="td-width">
                                            <input type="text" name="occupation" id="occupation" class="rel-width" value="" tabindex="1">
                                        </td>
                    
                                    </tr>
                                    <tr class="tr-margin">
                                        <th class="th-width">职位</th>
                                        <td class="td-width">
                                            <input type="text" name="position" id="position" class="rel-width" value="" tabindex="1">
                                        </td>
                                    </tr>    
                                    <tr class="tr-margin">
                                        <th class="th-width">年收入</th>
                                       <!--  <th id="th_revenue" class="th_box">
                                            <span class="rstar" color="red" title="必填"></span>
                                        </th> -->
                                        <td class="td-width">
                                            <input type="text" name="revenue" id="revenue" class="rel-width" value="" tabindex="1">
                                        </td>
                                    </tr> 
                            </tbody>
                        </table>
                        <input type="submit" value="保存" class="presson-btn" id="Submitskip"/>
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
  <?php $_smarty_tpl->_subTemplateRender("file:partials/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</body>

</html>
<?php }
/* {block 'page_style'} */
class Block_4357662955befb46e2092d2_29360226 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_style' => 
  array (
    0 => 'Block_4357662955befb46e2092d2_29360226',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <link rel="stylesheet" type="text/css" href="/css/profile.css">
<?php
}
}
/* {/block 'page_style'} */
}
