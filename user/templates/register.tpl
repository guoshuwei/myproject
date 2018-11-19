{include file="partials/header.tpl"}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{block name=title}注册{/block}</title>
    {block name=page_style}
    <link rel="stylesheet" type="text/css" href="/css/login.css">
    {/block}
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
                    <input type="hidden" name="token" value="{$register_token}">
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
{include file="inc/invest_script_template.tpl"}
{include file="partials/footer.tpl"}
</body></html>
{block name="page_scripts"}
    <script type="text/javascript" src="/scripts/pc/spacecp_register_com.js" init="pc/spacecp_register"></script>
{/block}