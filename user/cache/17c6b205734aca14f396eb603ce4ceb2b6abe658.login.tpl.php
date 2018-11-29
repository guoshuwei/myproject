<?php
/* Smarty version 3.1.34-dev-5, created on 2018-10-26 04:17:09
  from '/var/www/otc_option/templates/login.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-5',
  'unifunc' => 'content_5bd29545f243c3_51139091',
  'has_nocache_code' => true,
  'file_dependency' => 
  array (
    'ee4a6e4e9128ada9f07f0d5e8021862a0c9b8258' => 
    array (
      0 => '/var/www/otc_option/templates/login.tpl',
      1 => 1540519084,
      2 => 'file',
    ),
    'c6d8727e0d374915b48a8cf35bab83ae9a5e5652' => 
    array (
      0 => '/var/www/otc_option/templates/partials/header.tpl',
      1 => 1540384556,
      2 => 'file',
    ),
  ),
  'cache_lifetime' => 120,
),true)) {
function content_5bd29545f243c3_51139091 (Smarty_Internal_Template $_smarty_tpl) {
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	
</head>
<body>
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>	</title>
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
                <input type="hidden" name="token" value="5bd29545f0a58">
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
}
