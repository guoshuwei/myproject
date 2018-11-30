<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-29 15:44:16
  from 'D:\tools\phpStudy\PHPTutorial\WWW\myproject\user\templates\passwd.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bff98d06ec068_70931672',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '122f0278a93b0e6433030f3eb741ab063271c8f4' => 
    array (
      0 => 'D:\\tools\\phpStudy\\PHPTutorial\\WWW\\myproject\\user\\templates\\passwd.tpl',
      1 => 1543477451,
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
function content_5bff98d06ec068_70931672 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php $_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_15843195315bff98d06e4361_11793856', 'page_style');
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
            <a class="active" href="passwd.php">
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
            <a href="address.php">
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
                    <form id="passWdForm" method="post" role="ajaxfrom" class="passwd-form" >
                        <ul class="passwd-form-list">
                            <li class="passwd-form-item" role-prompt="passwd">
                                <div class="passwd-form-box clearfix">
                                    <div class="left passwd-form-box-text">旧的密码:</div>
                                    <input type="password" class="left passwd-form-box-input" name="old_passwd" placeholder="原来的登录密码">
                                </div>
                                <div class="passwd-form-desc">
                                </div>
                            </li>
                            <li class="passwd-form-item" role-prompt="passwd">
                                <div class="passwd-form-box clearfix">
                                    <div class="left passwd-form-box-text">新的密码:</div>
                                    <input type="password" class="left passwd-form-box-input" name="new_passwd" id="new_passwd" value="" placeholder="新的登录密码">
                                </div>
                                <div class="passwd-form-desc">
                                </div>
                            </li>
                            <li class="passwd-form-item">
                                <div class="passwd-form-box clearfix">
                                    <div class="left passwd-form-box-text">确认密码:</div>
                                    <input type="password" class="left passwd-form-box-input" name="rep_passwd" value="" placeholder="重复输入新密码">
                                </div>
                                <div class="passwd-form-desc">
                                </div>
                            </li>
                            <li class="passwd-form-item passwd-submit">
                                <input type="button" class="passwd-submit-btn" id="Submitskip" value="保存">
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
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_20461898175bff98d06e81e4_86728426', "page_scripts");
?>

<?php }
/* {block 'page_style'} */
class Block_15843195315bff98d06e4361_11793856 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_style' => 
  array (
    0 => 'Block_15843195315bff98d06e4361_11793856',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <link rel="stylesheet" type="text/css" href="/css/passwd.css">
    <link rel="stylesheet" type="text/css" href="/lib/validate/jquery.validate.css">
<?php
}
}
/* {/block 'page_style'} */
/* {block "page_scripts"} */
class Block_20461898175bff98d06e81e4_86728426 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_scripts' => 
  array (
    0 => 'Block_20461898175bff98d06e81e4_86728426',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <!-- <?php echo '<script'; ?>
 type="text/javascript" src="/scripts/pc/spacecp_address_com.js" init="pc/spacecp_address"><?php echo '</script'; ?>
> -->
    <?php echo '<script'; ?>
 type="text/javascript" src="/lib/validate/jquery.validate.min.js" ><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="/lib/validate/jquery.validate.extend.js" ><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="/lib/noty/jquery.noty.packaged.min.js" ><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript" src="/lib/noty/jquery.noty.packaged.extend.js" ><?php echo '</script'; ?>
>
    <?php echo '<script'; ?>
 type="text/javascript">
      $(function(){
        // 添加
        $('#Submitskip').click(function(){
            $('#passWdForm').submit();
        });
        $("#passWdForm").validate({
            rules: {
              old_passwd:{
                required: true,
                rangelength:[6,32],
              },
              new_passwd:{
                required: true,
                rangelength:[6,32],
              },
              rep_passwd:{
                required: true,
                rangelength:[6,32],
                equalTo:'#new_passwd',
              },
            },
            errorClass: "error invalid",
            errorPlacement:function(error,element) {  
              error.appendTo(element.parent().siblings('.passwd-form-desc'));
            },
            submitHandler:function(form){ 
                var $data = $(form).serialize(); //序列化表单数据 

                $.post('#',$data,function(dat){
                    if(dat.code=='200'){
                        notyTip('topRight','success',dat.message);
                        setTimeout(function(){
                            window.location.reload();
                        },800);
                    }else{
                        notyTip('topRight','error',dat.message);
                        setTimeout(function(){
                            window.location.reload();
                        },800);
                    }
                },'json');

              return false;
            },
        });
      });
    <?php echo '</script'; ?>
>
<?php
}
}
/* {/block "page_scripts"} */
}
