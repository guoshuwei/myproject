<!DOCTYPE html>
<html lang="en">
<head>
{include file="partials/header.tpl"}
{block name=page_style}
    <link rel="stylesheet" type="text/css" href="/css/address.css">
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
            <a class="active" href="profile.php">
              <i class="fa fa-dashboard"></i>
              <span>帐号信息</span>
              </a>
          </li>
          <li class="sub-menu">
            <a href="javascript:;">
              <i class="fa fa-desktop"></i>
              <span>绑定信息</span>
              </a>
          </li>
          <li class="sub-menu">
            <a href="javascript:;">
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
            <a href="javascript:;">
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
                    <form action="address.php" method="post" role="ajaxfrom" class="address-form" >
                        <input type="hidden" name="id" value=""/>
                        <input type="hidden" class="getprovince" value=""/>
                        <input type="hidden" class="getcity" value=""/>
                        <input type="hidden" class="getcounty" value=""/>
                        <ul class="address-form-list">
                            <li class="address-form-item" role-prompt="address">
                                <div class="address-form-box clearfix">
                                    <div class="left address-form-box-text">收件人:</div>
                                    <input type="text" class="left address-form-box-input" name="consignee" value="" data-valid="notempty" placeholder="不得大于15个汉字">
                                </div>
                                <div class="address-form-desc">
                                    <span class="address-form-desc-text color" role-prompt="info">*<span></span></span>
                                </div>
                            </li>
                            <li class="address-form-item" role-prompt="address">
                                <div class="address-form-box clearfix">
                                    <div class="left address-form-box-text">手机号码:</div>
                                    <input type="text" class="left address-form-box-input" name="phone" value="" data-valid="mobile" placeholder="电话号码">
                                </div>
                                <div class="address-form-desc">
                                    <span class="address-form-desc-text" role-prompt="info">*<span></span></span>
                                </div>
                            </li>
                            <li class="address-form-item">
                                <div class="address-form-box clearfix">
                                    <div class="left address-form-box-text">地址:</div>
                                    <div class="left clearfix">
                                        <div class="address-form-box-select clearfix">
                                            <div class="address-select-item">
                                                <select id="cmbProvince" name="province" class="cmbProvince">
                                                </select>
                                            </div>
                                            <div class="address-select-item">
                                                <select id="cmbCity" name="city" class="cmbCity"></select>
                                            </div>
                                            <div class="address-select-item nomargin">
                                                <select id="cmbArea" name="county" class="cmbArea"></select>
                                            </div>
                                        </div>
                                        <div class="address-form-desc"></div>
                                    </div>
                                </div>
                            </li>
                            <li class="address-form-item" role-prompt="address">
                                <div class="address-form-box clearfix">
                                    <div class="left address-form-box-text">详细地址:</div>
                                    <textarea rows="10" cols="30" class="left address-form-box-input w573 " placeholder="请输入详细地址" name="address" data-valid="notempty"></textarea>
                                </div>
                                <div class="address-form-desc">
                                    <span class="address-form-desc-text" role-prompt="info">*<span></span></span>
                                </div>
                            </li>
                            <li class="address-form-item address-submit">
                                <input type="submit" class="address-submit-btn" value="保存">
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
{include file="inc/invest_script_template.tpl"}
{include file="partials/footer.tpl"}
</body>
</html>
{block name="page_scripts"}
    <script type="text/javascript" src="/scripts/pc/spacecp_address_com.js" init="pc/spacecp_address"></script>
{/block}
