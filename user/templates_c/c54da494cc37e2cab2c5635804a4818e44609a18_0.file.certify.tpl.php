<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-27 03:41:58
  from 'D:\tools\phpStudy\PHPTutorial\WWW\myproject\user\templates\certify.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bfcbd066d8119_02253626',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c54da494cc37e2cab2c5635804a4818e44609a18' => 
    array (
      0 => 'D:\\tools\\phpStudy\\PHPTutorial\\WWW\\myproject\\user\\templates\\certify.tpl',
      1 => 1543290113,
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
function content_5bfcbd066d8119_02253626 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php $_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_2323696215bfcbd066cc598_98983491', 'page_style');
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
          <h5 class="centered"><?php echo $_smarty_tpl->tpl_vars['username']->value;?>
</h5>
          <li class="mt">
            <a class="active" href="profile.php">
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
                    <div class="bind-wrap-head">
                        <div class="bind-wrap-head-ui">实名认证<a class="bind-wrap-return" href="/spacecp">< 返回</a></div>
                    </div>
                    <?php if (isset($_smarty_tpl->tpl_vars['user_det']->value['certify_at']) && ($_smarty_tpl->tpl_vars['user_det']->value['certify_at'] > 0)) {?>
                    <div class="revise-password">
                        <div class="form-list-item">
                            <div class="revise-password-item">
                                <div class="text-success">已实名！</div>
                            </div>
                        </div>
                        <div class="form-list-item">
                            <div class="revise-password-item">
                                <div>真实姓名</div>
                                <div><?php echo $_smarty_tpl->tpl_vars['user_det']->value['truename'];?>
</div>
                            </div>
                        </div>
                        <div class="form-list-item">
                            <div class="revise-password-item">
                                <div>身份证号</div>
                                <div><?php echo $_smarty_tpl->tpl_vars['user_det']->value['idcard'];?>
</div>
                            </div>
                        </div>
                    </div>
                    <?php } else { ?>
                    <form action="certify.php" method="post" role="ajaxfrom" id="formBox">
                        <div class="revise-password">
                            <div class="form-list-item">
                                <div class="revise-password-item">
                                    <div>真实姓名</div>
                                    <input type="text" placeholder="请输入真实姓名" name="name" data-valid="notempty" autocomplete="off"/>
                                </div>
                                <div class="error-prompt now-password">
                                    <span><i></i>对不起，输入有误！</span>
                                </div>
                            </div>
                            <div class="form-list-item">
                                <div class="revise-password-item">
                                    <div>身份证号</div>
                                    <input type="text" placeholder="请输入本人真实身份证号" name="idnumber" data-valid="notempty|len:18:18" maxlength="18" autocomplete="off"/>
                                </div>
                                <div class="error-prompt new-password">
                                    <span><i></i>对不起，输入有误！</span>
                                </div>
                            </div>
                        </div>
                        <input type="submit" class="revise-password-btn" id="submit" value="完成">
                    </form>
                    <?php }?>
                    
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
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_16918822325bfcbd066d4298_60073391', "page_scripts");
?>

<?php }
/* {block 'page_style'} */
class Block_2323696215bfcbd066cc598_98983491 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_style' => 
  array (
    0 => 'Block_2323696215bfcbd066cc598_98983491',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <link rel="stylesheet" type="text/css" href="/css/certify.css">
<?php
}
}
/* {/block 'page_style'} */
/* {block "page_scripts"} */
class Block_16918822325bfcbd066d4298_60073391 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_scripts' => 
  array (
    0 => 'Block_16918822325bfcbd066d4298_60073391',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php echo '<script'; ?>
 type="text/javascript" src="/scripts/pc/spacecp_certify_com.js" init="pc/spacecp_certify"><?php echo '</script'; ?>
>
<?php
}
}
/* {/block "page_scripts"} */
}
