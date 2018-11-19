<?php
/* Smarty version 3.1.34-dev-5, created on 2018-11-01 12:24:31
  from '/var/www/otc_option/templates/login.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bdaf07fc29304_63361656',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ee4a6e4e9128ada9f07f0d5e8021862a0c9b8258' => 
    array (
      0 => '/var/www/otc_option/templates/login.tpl',
      1 => 1541070836,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:partials/header.tpl' => 1,
  ),
),false)) {
function content_5bdaf07fc29304_63361656 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->_subTemplateRender("file:partials/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_4793994505bdaf07fc04ae3_49550795', 'title');
?>
</title>
	<link rel="stylesheet" href="/otc_option/public/css/login.css">
</head>
<body>
	<!-- <form action="" method="post">
		<div class="field">
			<label for="username">Username</label>
			<input type="text" name="username" id="username" autocomplete="off">
		</div>

		<div class="field">
			<label for="password">Password</label>
			<input type="password" name="password" id="password" autocomplete="off">
		</div>
		<input type="hidden" name="token" value="<?php echo '<?php ';?>echo Token::generate();<?php echo '?>';?>">
		<input type="submit" value="login in">

	</form> -->
	<section class="login-block">
    <div class="container">
	<div class="row">
		<div class="col-md-4 login-sec">
		<h2 class="text-center">登录</h2>
        <form action="/otc_option/login.php" method="post" class="login-form">
            <div class="form-group">
                <label for="exampleInputEmail1" class="text-uppercase">用户名</label>
                <input type="text" class="form-control" name="username" id="username" autocomplete="off">
            </div>
                <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">密码</label>
                <input type="password" class="form-control" name="password" id="password" autocomplete="off">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1" class="text-uppercase">手机号</label>
                <input type="password" class="form-control" name="mobile" id="mobile" autocomplete="off">
            </div>
            <div class="form-check">
                <label class="form-check-label">
                <input type="checkbox" class="form-check-input">
                <small>记住密码</small>
                </label>
                <input type="hidden" name="token" value="<?php echo $_smarty_tpl->tpl_vars['login_token']->value;?>
">
                <button type="submit" class="btn btn-login float-right">登录</button>
            </div>

        </form>
<!-- <div class="copy-text">Created with <i class="fa fa-heart"></i> by <a href="http://grafreez.com">Grafreez.com</a></div> -->
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
</body>
</html>


<?php }
/* {block 'title'} */
class Block_4793994505bdaf07fc04ae3_49550795 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'title' => 
  array (
    0 => 'Block_4793994505bdaf07fc04ae3_49550795',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>
登录<?php
}
}
/* {/block 'title'} */
}
