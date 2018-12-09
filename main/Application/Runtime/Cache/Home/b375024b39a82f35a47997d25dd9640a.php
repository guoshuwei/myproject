<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
<title>农联网</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="shop project">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="/myproject/main/Public/Home/lib/bootstrap4/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/myproject/main/Public/Home/css/main_styles.css">
<link rel="stylesheet" type="text/css" href="/myproject/main/Public/Home/css/responsive.css">

</head>
<body>
    <div class="super_container">
    
    <!-- Header -->
    
    <header class="header">
    
    <!-- Top Bar -->


    <div class="top_bar">
      <div class="container">
        <div class="row">
          <div class="col d-flex flex-row">
            <div class="top_bar_contact_item"><div class="top_bar_icon"><img src="/images/phone.png" alt=""></div>农联网LOGO</div>
            <div class="top_bar_contact_item"><div class="top_bar_icon"><img src="/images/mail.png" alt=""></div><a href="mailto:fastsales@gmail.com"></a></div>
            <div class="top_bar_content ml-auto">
              <div class="top_bar_menu">
                <ul class="standard_dropdown top_bar_dropdown">
                </ul>
              </div>
              <div class="top_bar_user">
                <div class="user_icon"><img src="/images/user.svg" alt=""></div>
                <?php if($logining_user_name != ''): ?><div><?php echo ($logining_user_name); ?></div>
                <?php else: ?>
                  <div><a href="/myproject/user/login.php">登录</a></div>
                  <div><a href="/myproject/user/register.php">注册</a></div><?php endif; ?>
                <div><a href="/myproject/cart/public/home.php">交易平台</a></div>
                <div><a href="/myproject/business/application.php">商户入口</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
    
     <!-- Top Bar -->




  


<style>
  .wrap{
    margin-top:50px;
    width:1000px;
    margin:0 auto;
  }
</style>
<body>
  <div class="container">
    <div class="wrap">
      <div class="title" style="text-align:center;padding-top:20px;"><h3><?php echo ($content['title']); ?></h3></div>  
      <div class="pub_time" style="text-align:center;"><?php echo ($content['pub_time']); ?></div>  
      <div class="source" style="text-align:center;"><?php echo ($content['source']); ?></div> 
      <div class="source"><?php echo ($content['content']); ?></div> 
    </div> 
  </div>
</body>
</html>