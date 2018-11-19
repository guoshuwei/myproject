<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-01 14:54:27
  from '/var/www/otc_option/templates/register.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bdb13a3ef6043_25730625',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd1ed85bd375a2423f7a6a80144c4804041165654' => 
    array (
      0 => '/var/www/otc_option/templates/register.tpl',
      1 => 1541119076,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:partials/header.tpl' => 1,
  ),
),false)) {
function content_5bdb13a3ef6043_25730625 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>注册</title>
	<link rel="stylesheet" href="/otc_option/public/css/login.css">
</head>
<body>
	<section class="login-block">
    <div class="container">
	<div class="row">
		<div class="col-md-4 login-sec">
        <h2 class="text-center">注册</h2>
        <form action="/otc_option/register.php" method="post" class="register-form">
            <div class="form-group">
                <label for="exampleInputEmail1" class="text-uppercase">用户名</label>
                <input type="text" class="form-control" name="username" id="username" autocomplete="off">
                
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">密码</label>
                <input type="password" class="form-control" name="password" id="password" autocomplete="off">
            </div>
            <div class="form-group">
                <label for="password_agian" class="text-uppercase">确认密码</label>
                <input type="password" class="form-control" name="password_again" id="password_again"> 
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">手机号</label>
                <input type="text" class="form-control" name="mobile" id="mobile" autocomplete="off">
            </div>
            <div class="form-check">
                <label class="form-check-label">
                <input type="checkbox" class="form-check-input">
                <small>Remember Me</small>
                </label>
                <input type="hidden" name="token" value="<?php echo $_smarty_tpl->tpl_vars['register_token']->value;?>
">
                <button type="submit" class="btn btn-login float-right">注册</button>
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
      <img class="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <div class="banner-text">
            <h2>This is Heaven</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>	
  </div>
    </div>
    <div class="carousel-item">
      <img class="d-block img-fluid" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg" alt="First slide">
      <div class="carousel-caption d-none d-md-block">
        <div class="banner-text">
            <h2>This is Heaven</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </div>	
    </div>
    </div>
    <div class="carousel-item">
      <img class="d-block img-fluid" src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg" alt="First slide">
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
</section>
</body>
</html><?php }
}
