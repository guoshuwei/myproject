<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-20 06:28:57
  from 'D:\tools\phpStudy\PHPTutorial\WWW\myproject\user\templates\register.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bf3a9a9b2d109_81747429',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'eff36e93b67da89da4b4b675e0d053f2d18bbb46' => 
    array (
      0 => 'D:\\tools\\phpStudy\\PHPTutorial\\WWW\\myproject\\user\\templates\\register.tpl',
      1 => 1542610593,
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
function content_5bf3a9a9b2d109_81747429 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_567290005bf3a9a9b21580_18047681', 'title');
?>
</title>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_120994725bf3a9a9b25408_94402728', 'page_style');
?>

</head>
<body>
	<section class="login-block">
    <div class="container">
	<div class="row">
		<div class="col-md-4 login-sec">
        <h2 class="text-center">注册</h2>
        <form action="register.php" method="post" role="ajaxfrom" class="register-form">
            <div class="register-form-list">
                <div class="form-group register-form-item" role-prompt="register">
                    <label for="exampleInputEmail1" class="text-uppercase">用户名</label>
                    <input type="text" data-valid="notempty" class="form-control" name="username" id="username" autocomplete="off">
                    <div class="register-form-desc">
                        <span class="register-form-desc-text color" role-prompt="info">*<span></span></span>
                    </div>
                </div>
                <div class="form-group register-form-item" role-prompt="register">
                    <label for="exampleInputPassword1" class="text-uppercase">密码</label>
                    <input type="password" data-valid="notempty|len:6:20|pwd" class="form-control" name="password" id="password" autocomplete="off">
                    <div class="register-form-desc">
                        <span class="register-form-desc-text color" role-prompt="info">*<span></span></span>
                    </div>
                </div>
                <div class="form-group register-form-item" role-prompt="register">
                    <label for="password_agian" class="text-uppercase">确认密码</label>
                    <input type="password" class="form-control" data-valid="notempty|len:6:20|pwd" name="renewpwd" id="renewpwd"> 
                    <div class="register-form-desc">
                        <span class="register-form-desc-text color" role-prompt="info">*<span></span></span>
                    </div>
                </div>
                <div class="form-group register-form-item" role-prompt="register">
                    <label for="mobile" class="text-uppercase">手机号</label>
                    <input type="text" class="form-control" data-valid="mobile" name="mobile" id="mobile" autocomplete="off">
                    <div class="register-form-desc">
                        <span class="register-form-desc-text color" role-prompt="info">*<span></span></span>
                    </div>
                </div>
                <div class="form-group form-check">
                    <input type="hidden" name="token" value="<?php echo $_smarty_tpl->tpl_vars['register_token']->value;?>
">
                    <button type="submit" class="btn btn-login float-right">注册</button>
                </div>
            </div>
        </form>
<div class="copy-text">版权所有 <i class="fa fa-heart"></i><a href="http://nonglian.com">nonglian.com</a></div>
		</div>
		<div class="col-md-8 banner-sec">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                 <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
            <div class="carousel-inner" role="listbox">
    <div class="carousel-item active">
      <img class="d-block img-fluid" src="/img/pexels-photo.jpg" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <div class="banner-text">
            <h2>This is Heaven</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>	
  </div>
    </div>
    <div class="carousel-item">
      <img class="d-block img-fluid" src="/img/people-coffee-tea-meeting.jpg" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <div class="banner-text">
            <h2>This is Heaven</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>	
    </div>
    </div>
    <div class="carousel-item">
      <img class="d-block img-fluid" src="/img/pexels-photo-872957.jpeg" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <div class="banner-text">
            <h2>This is Heaven</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>	
    </div>
  </div>
            </div>	   
		    
		</div>
	</div>
</div>
<?php $_smarty_tpl->_subTemplateRender("file:inc/invest_script_template.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->_subTemplateRender("file:partials/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</body></html>
<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_10862418265bf3a9a9b29283_14816455', "page_scripts");
}
/* {block 'title'} */
class Block_567290005bf3a9a9b21580_18047681 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'title' => 
  array (
    0 => 'Block_567290005bf3a9a9b21580_18047681',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>
注册<?php
}
}
/* {/block 'title'} */
/* {block 'page_style'} */
class Block_120994725bf3a9a9b25408_94402728 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_style' => 
  array (
    0 => 'Block_120994725bf3a9a9b25408_94402728',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <link rel="stylesheet" type="text/css" href="/css/login.css">
    <?php
}
}
/* {/block 'page_style'} */
/* {block "page_scripts"} */
class Block_10862418265bf3a9a9b29283_14816455 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_scripts' => 
  array (
    0 => 'Block_10862418265bf3a9a9b29283_14816455',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php echo '<script'; ?>
 type="text/javascript" src="/scripts/pc/spacecp_register_com.js" init="pc/spacecp_register"><?php echo '</script'; ?>
>
<?php
}
}
/* {/block "page_scripts"} */
}
