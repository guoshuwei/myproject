<!DOCTYPE html>
<html lang="en">
<head>
{include file="partials/header.tpl"}
{block name=page_style}
    <link rel="stylesheet" type="text/css" href="/css/index.css">
{/block}
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
          <li><a class="logout" href="login.php">退出登录</a></li>
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
          <h5 class="centered">{$username}</h5>
          <li class="mt">
            <a class="active" href="home.php">
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
            <a href="passwd.php">
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
                <div class="my-account">
                    <div class="bind-wrap-head">
                        <div class="bind-wrap-head-ui">我的账户信息</div>
                    </div>
                    <table class="my-table">
                        <tbody>
                        <tr>
                            <td class="center">我的用户名</td>
                            <td class="have"><div class="have-icon"></div></td>
                            <td class="content-ui">{$user_inf.username}</td>
                            <td class="link"></td>
                        </tr>
                        <tr>
                            <td class="center">我的头像</td>
                            <td class="have"><div class="have-icon"></div></td>
                            
                                <td class="content-ui">已上传头像/系统默认头像</td>
                            
                                <!-- <td class="content-ui">系统默认头像</td> -->
                           
                            <td class="link"><a href="avatar.php">修改头像</a></td>
                        </tr>
                        <tr>
                            <td class="center">手机号</td>
                            <td class="have"><div class="have-icon"></div></td>
                            <td class="content-ui">{$user_inf.mobile}</td>
                            <td class="link">
                                    <a href="javascript:;" role="dialog" role-api="spacpceMobileChange">
                                    修改号码</a>&nbsp;<a href="">设置</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="center">实名认证</td>
                            <td class="have"><div class="have-icon"></div></td>
                            {if isset($user_det.certify_at) && ($user_det.certify_at>0)}
                            <td class="content-ui text-success">已实名</td>
                            <td class="link">
                                <a href="#" role-click="tipmobile">更改</a>
                            </td>
                            {else}
                            <td class="content-ui text-error">未实名</td>
                            <td class="link">
                                <a href="certify.php" role-click="tipmobile">立即认证</a>
                            </td>
                            {/if}
                            
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div class="password-ui">
                    <div class="bind-wrap-head">
                        <div class="bind-wrap-head-ui">密码设置</div>
                    </div>
                    <table class="my-table">
                        <tbody>
                        <tr>
                            <td class="center">登录密码</td>
                            <td class="have"><div class="have-icon"></div></td>
                            <!-- <td class="content-ui">qq登录账户 登录密码已设置</td> -->
                            <td class="content-ui">已设置</td>
                            <td class="link"><a href="passwd.php">修改密码</a></td>
                          
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="person-ui">
                    <div class="bind-wrap-head">
                        <div class="bind-wrap-head-ui">我的个人信息</div>
                    </div>
                    <table class="my-table">
                        <tbody>
                        <tr>
                            <td class="center">性别</td>
                            <td class="have"><div class="{if $userprofile['gender_des']}have-icon{/if}"></div></td>
                            <td class="content-ui">
                            {$sex = ['保密','男','女']}  
                            {if isset($user_det.sex)}
                            {$sex[$user_det.sex]}
                            {else}
                            无
                            {/if}
                            </td>
                            <td class="link"><a href="profile.php">修改个人信息</a></td>
                        </tr>
                        <tr>
                            <td class="center">生日</td>
                            <td class="have"><div class="have-icon"></div></td>
                            <td class="content-ui">{$user_det.birthday}</td>
                            <td class="link"><a></a></td>
                        </tr>
                        <tr>
                            <td class="center">行业</td>
                            <td class="have"><div class=""></div></td>
                            <td class="content-ui">{$user_det.occupation}</td>
                            <td class="link"><a></a></td>
                        </tr>
                        <tr>
                            <td class="center">年收入</td>
                            <td class="have"><div class=""></div></td>
                            <td class="content-ui">{$user_det.revenue}</td>
                            <td class="link"><a></a></td>
                        </tr>
                        <!-- <tr>
                            <td class="center">最高学历</td>
                            <td class="have"><div class=""></div></td>
                            <td class="content-ui"></td>
                            <td class="link"><a></a></td>
                        </tr> -->
                        </tbody>
                    </table>
                </div>
                <div class="myaddress-ui">
                    <div class="bind-wrap-head">
                        <div class="bind-wrap-head-ui">我的收货信息</div>
                    </div>
                    <table class="my-table">
                        <tbody>
                        <tr>
                            <td class="center">收货人</td>
                            <td class="have"><div class=""></div></td>
                            <td class="content-ui"></td>
                            <td class="link"><a href="address.php">修改收货信息</a></td>
                        </tr>
                        <tr>
                            <td class="center">手机/电话</td>
                            <td class="have"><div class=""></div></td>
                            <td class="content-ui"></td>
                            <td class="link"><a></a></td>
                        </tr>
                        <tr>
                            <td class="center">收货地址</td>
                            <td class="have"><div class="have-icon"></div></td>
                            <td class="content-ui"></td>
                            <td class="link"><a></a></td>
                        </tr>
                        </tbody>
                    </table>
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
  {include file="inc/invest_script_template.tpl"}
  {include file="partials/footer.tpl"}
</body>
</html>
{block name="page_scripts"}
    <script type="text/javascript" src="/scripts/pc/spacecp_index_com.js" init="pc/spacecp_index"></script>
{/block}