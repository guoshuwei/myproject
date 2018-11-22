<!DOCTYPE html>
<html lang="en">
<head>
	{include file="partials/header.tpl"}
    {block name=page_style}
    <link rel="stylesheet" type="text/css" href="/css/login.css">
    {/block}
	<title>{block name=title}登录{/block}</title>
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
                    <input type="hidden" name="token" value="{$login_token}">
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
{include file="inc/invest_script_template.tpl"}
{include file="partials/footer.tpl"}
</body></html>
{block name="page_scripts"}
    <script type="text/javascript" src="/scripts/pc/spacecp_login_com.js" init="pc/spacecp_login"></script>
{/block}