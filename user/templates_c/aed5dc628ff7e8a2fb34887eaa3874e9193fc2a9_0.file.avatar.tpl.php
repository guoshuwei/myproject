<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-17 06:33:33
  from '/var/www/user/templates/avatar.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5befb63d08f583_86542271',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'aed5dc628ff7e8a2fb34887eaa3874e9193fc2a9' => 
    array (
      0 => '/var/www/user/templates/avatar.tpl',
      1 => 1542436166,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:partials/header.tpl' => 1,
  ),
),false)) {
function content_5befb63d08f583_86542271 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php $_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_16180751905befb63d089a97_92666452', 'page_style');
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
                        <div class="bind-wrap-head-ui">修改头像<a class="bind-wrap-return" href="/spacecp">< 返回</a></div>
                    </div>
                    <div class="revise-img">
                        <div class="revise-img-left">
                            <div class="revise-img-title">当前我的头像</div>
                            <p class="revise-img-text">如果您还没有设置自己的头像，系统会 显示为默认头像，您需要自己上传一张 新照片来作为自己的个人头像。</p>
                            <img src="/discuz/uc_server/avatar.php?uid=1&size=big" class="my-img"/>
                                                    </div>
                        <div class="revise-img-right" >
                            <div class="revise-img-title">设置我的新头像</div>
                            <div class="revise-img-hight">请选择一个新照片进行上传编辑。</div>
                            <p class="revise-img-text">（头像保存后，您可能需要刷新一下本页面(按ctrl+F5键)，才能查看最新的头像效果）</p>
                            <div class="avatar">
                            <?php echo '<script'; ?>
 src="/discuz/static/js/upload.js"><?php echo '</script'; ?>
> 
                            <?php echo '<script'; ?>
 src="/discuz/static/js/swfupload.js"><?php echo '</script'; ?>
> 
                            <?php echo '<script'; ?>
 src="/discuz/static/js/common.js"><?php echo '</script'; ?>
>   

                            <?php echo '<script'; ?>
 type="text/javascript">document.write(AC_FL_RunContent(<?php echo $_smarty_tpl->tpl_vars['uc_avatarflash']->value;?>
))<?php echo '</script'; ?>
> 
                             
                            </div>
                        </div>
                    </div>
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
  
</body>

</html>
<?php }
/* {block 'page_style'} */
class Block_16180751905befb63d089a97_92666452 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_style' => 
  array (
    0 => 'Block_16180751905befb63d089a97_92666452',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <link rel="stylesheet" type="text/css" href="/css/avatar.css">
<?php
}
}
/* {/block 'page_style'} */
}
