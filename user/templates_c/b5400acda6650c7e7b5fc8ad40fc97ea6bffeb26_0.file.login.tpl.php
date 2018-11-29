<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-16 10:17:00
  from '/var/www/user/templates/login.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bee991caf87f9_42740518',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'b5400acda6650c7e7b5fc8ad40fc97ea6bffeb26' => 
    array (
      0 => '/var/www/user/templates/login.tpl',
      1 => 1542361820,
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
function content_5bee991caf87f9_42740518 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<?php $_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_20461329955bee991cae9a54_42659584', 'page_style');
?>

	<title><?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_17144599175bee991caed2c8_49355606', 'title');
?>
</title>
</head>
<body>
	<section class="login-block">
    <div class="container">
	<div class="row">
		<div class="col-md-4 login-sec">
		<h2 class="text-center">登录</h2>
        <form action="login.php" method="post" role="ajaxfrom" class="login-form">
            <div class="login-form-list">
                <div class="form-group login-form-item" role-prompt="login">
                    <label for="exampleInputEmail1" class="text-uppercase">用户名/手机号</label>
                    <input type="text" data-valid="notempty" class="form-control" name="username" id="username" autocomplete="off">
                    <div class="login-form-desc">
                        <span class="login-form-desc-text color" role-prompt="info">*<span></span></span>
                    </div>
                </div>
                <div class="form-group login-form-item" role-prompt="login">
                    <label for="exampleInputPassword1" class="text-uppercase">密码</label>
                    <input type="password" data-valid="notempty|len:6:20|pwd" class="form-control" name="password" id="password" autocomplete="off">
                    <div class="login-form-desc">
                        <span class="login-form-desc-text color" role-prompt="info">*<span></span></span>
                    </div>
                </div>
                <div class="form-check">
                    <!-- <label class="form-check-label">
                    <input type="checkbox" class="form-check-input">
                    <small>记住密码</small>
                    </label> -->
                    <input type="hidden" name="token" value="<?php echo $_smarty_tpl->tpl_vars['login_token']->value;?>
">
                    <button type="submit" class="btn btn-login float-right" id="currentSubmit">登录</button>
                </div>
            </div>
        </form>
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
      <img class="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <div class="banner-text">
            <h2>村村互联</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>	
  </div>
    </div>
    <div class="carousel-item">
      <img class="d-block img-fluid" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <div class="banner-text">
            <h2>农贸交易</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>	
    </div>
    </div>
    <div class="carousel-item">
      <img class="d-block img-fluid" src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <div class="banner-text">
            <h2>政策扶持</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>	
    </div>
  </div>
            </div>	   
		    
		</div>
	</div>
</div>
</section>
<?php $_smarty_tpl->_subTemplateRender("file:inc/invest_script_template.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
$_smarty_tpl->_subTemplateRender("file:partials/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
</body></html>
<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1889030985bee991caf7283_91804751', "page_scripts");
}
/* {block 'page_style'} */
class Block_20461329955bee991cae9a54_42659584 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_style' => 
  array (
    0 => 'Block_20461329955bee991cae9a54_42659584',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <link rel="stylesheet" type="text/css" href="/css/login.css">
    <?php
}
}
/* {/block 'page_style'} */
/* {block 'title'} */
class Block_17144599175bee991caed2c8_49355606 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'title' => 
  array (
    0 => 'Block_17144599175bee991caed2c8_49355606',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>
登录<?php
}
}
/* {/block 'title'} */
/* {block "page_scripts"} */
class Block_1889030985bee991caf7283_91804751 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_scripts' => 
  array (
    0 => 'Block_1889030985bee991caf7283_91804751',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php echo '<script'; ?>
 type="text/javascript" src="/scripts/pc/spacecp_login_com.js" init="pc/spacecp_login"><?php echo '</script'; ?>
>
<?php
}
}
/* {/block "page_scripts"} */
}
