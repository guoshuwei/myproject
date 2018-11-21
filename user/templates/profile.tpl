<!DOCTYPE html>
<html lang="en">
<head>
{include file="partials/header.tpl"}
{block name=page_style}
    <link rel="stylesheet" type="text/css" href="/css/profile.css">
    <link rel="stylesheet" type="text/css" href="/lib/validate/jquery.validate.css">
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
                    <!-- <form id="userForm" action="profile.php" method="post" role="ajaxfrom"> -->
                    <form id="userForm" method="post" role="ajaxfrom">
                        <div class="bind-wrap-head">
                            <div class="bind-wrap-head-ui">基本资料<a class="bind-wrap-return" onclick="window.history.back()">< 返回</a></div>
                        </div>
                        <table cellspacing="0" cellpadding="0" class="tfm personal" id="profilelist">
                            <tbody>
                                <tr class="tr-margin tr-name">
                                    <th class="th-width">用户名</th>
                                    <th id="th_username" class="th_box">
                                    </th>
                                    <td class="td-width">{$username}</td>
                                    <td class="overt-width"></td>
                                </tr>
                                <tr class="tr-margin tr-gender">
                                    <th class="th-width">性别</th>
                                    <th id="th_gender" class="th_box">
                                    </th>
                                    <td class="td-width">
                                        {$sex = ['保密','男','女']}  
                                        {if isset($user_det.sex)}
                                        {$sex[$user_det.sex]}
                                        {else}
                                        无
                                        {/if}  
                                    </td>
                                    <td class="overt-width"></td>      
                                </tr>
                                <tr class="tr-margin tr-birthday">
                                    <th class="th-width">生日</th>
                                    <td class="td-width">
                                      <input type="text" name="birthday" id="birthday" class="rel-width" value="{$user_det.birthday}" tabindex="1">
                                    </td>
                                    <td class="overt-width">&nbsp;</td>
                                </tr>
                                <tr class="tr-margin th_residecity">
                                    <th class="th-width">居住地</th>
                                    <td class="td-width">
                                      <input type="text" name="address" id="address" class="rel-width" value="{$user_det.address}" tabindex="1">
                                    </td>
                                    <td class="overt-width">&nbsp;</td>
                                </tr>
                                <tr class="tr-margin tr-field1">
                                    <th class="th-width">邮箱</th>
                                    <td class="td-width">
                                        <input type="text" name="email" id="email" data-valid="notempty|email" class="rel-width" value="{$user_det.email}" tabindex="1">     
                                    </td>                
                                </tr>
                                <tr class="tr-margin tr-field3">
                                    <th class="th-width">微信号</th>
                                    <td class="td-width">
                                        <input type="text" name="wechat" id="wechat" class="rel-width" value="{$user_det.wechat}" tabindex="1">     
                                    </td>                
                                </tr>
                                <tr class="tr-margin">
                                        <th class="th-width">固定电话</th>
                                        <td class="td-width">
                                            <input type="text" name="telephone" id="telephone" class="rel-width" value="{$user_det.telephone}" tabindex="1">
                                        </td> 
                                </tr>
                                <tr class="tr-margin">
                                        <th class="th-width">QQ</th>
                                        <td class="td-width">
                                            <input type="text" name="qq" id="qq" class="rel-width" value="{$user_det.qq}" tabindex="1">
                                        </td> 
                                </tr>
                                <tr class="tr-margin">
                                        <th class="th-width">公司</th>
                                        <td class="td-width">
                                            <input type="text" name="company" id="company" class="rel-width" value="{$user_det.company}" tabindex="1">
                                        </td>
                                    </tr>
                                    <tr class="tr-margin">
                                        <th class="th-width">职业</th>
                                        <td class="td-width">
                                            <input type="text" name="occupation" id="occupation" class="rel-width" value="{$user_det.occupation}" tabindex="1">
                                        </td>
                    
                                    </tr>
                                    <tr class="tr-margin">
                                        <th class="th-width">职位</th>
                                        <td class="td-width">
                                            <input type="text" name="position" id="position" class="rel-width" value="{$user_det.position}" tabindex="1">
                                        </td>
                                    </tr>    
                                    <tr class="tr-margin">
                                        <th class="th-width">年收入</th>
                                       <!--  <th id="th_revenue" class="th_box">
                                            <span class="rstar" color="red" title="必填"></span>
                                        </th> -->
                                        <td class="td-width">
                                            <input type="text" name="revenue" id="revenue" class="rel-width" value="{$user_det.revenue}" tabindex="1">
                                        </td>
                                    </tr> 
                            </tbody>
                        </table>
                        <input type="button" value="保存" class="presson-btn" id="Submitskip"/>
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
  {include file="partials/footer.tpl"}
</body>
{block name="page_scripts"}
    <!-- <script type="text/javascript" src="/scripts/pc/spacecp_login_com.js" init="pc/spacecp_login"></script> -->
    <script type="text/javascript" src="/lib/validate/jquery.validate.min.js" ></script>
    <script type="text/javascript" src="/lib/validate/jquery.validate.extend.js" ></script>
    <script type="text/javascript" src="/lib/noty/jquery.noty.packaged.min.js" ></script>
    <script type="text/javascript" src="/lib/noty/jquery.noty.packaged.extend.js" ></script>
    <script type="text/javascript">
      $(function(){
        // 添加
        $('#Submitskip').click(function(){
            $('#userForm').submit();
        });
        $("#userForm").validate({
            rules: {
              birthday:{
                date: true,
              },
              address:{
                maxlength: 80,
              },
              email:{
                email: true,
              },
              wechat:{
                maxlength: 80,
              },
              telephone:{
                isTel: true,
              },
              qq:{
                rangelength: [5, 15],
              },
              company:{
                maxlength: 200,
              },
              occupation:{
                maxlength: 200,
              },
              position:{
                maxlength: 200,
              },
              revenue:{
                maxlength: 20,
              },
            },
            errorClass: "error invalid",
            // errorPlacement:function(error,element) {  
            //   error.appendTo(element.parent(".form-group").children("label:first"));
            // },
            submitHandler:function(form){ 
                var $data = $(form).serialize(); //序列化表单数据 

                $.post('#',$data,function(dat){
                    if(dat.code=='200'){
                        notyTip('topRight','success',dat.message);
                        setTimeout(function(){
                            window.location.reload();
                        },800);
                    }else{
                        notyTip('topRight','error',dat.message);
                        setTimeout(function(){
                            window.location.reload();
                        },800);
                    }
                },'json');

              return false;
            },
        });
      });
    </script>
{/block}
</html>
