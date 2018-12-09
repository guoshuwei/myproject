<?php /* Smarty version Smarty-3.1.12, created on 2018-12-08 19:38:16
         compiled from "/var/www/myproject/business/application/views/index/home.tpl" */ ?>
<?php /*%%SmartyHeaderCode:16641432015c0b99a2726b10-43942267%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '619ea753075a3c937b1d65d062d19cbfd9afb4d5' => 
    array (
      0 => '/var/www/myproject/business/application/views/index/home.tpl',
      1 => 1544267132,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '16641432015c0b99a2726b10-43942267',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.12',
  'unifunc' => 'content_5c0b99a2776135_68297938',
  'variables' => 
  array (
    'user' => 0,
    'shenhe_info' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c0b99a2776135_68297938')) {function content_5c0b99a2776135_68297938($_smarty_tpl) {?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<!-- IE / Chrome -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- 360极速模式 -->
	<meta name="renderer" content="webkit" />
	<title> 我的信息 </title>
	<link rel="stylesheet" href="/myproject/business/static/libs/selectbox/selectbox-min.css">

	<link rel="stylesheet" href="/myproject/business/static/css/common.css">
	<link rel="stylesheet" href="/myproject/business/static/css/info.css">
</head>
<body>

<div class="g-site-wrap">
	<div class="g-site-top">

		<!-- g-head -->
		<div class="g-head clearfix">
    <h1 class="fl m-logo">
        <a href="/">
            <img width="86" class="fl logo" src="" alt="">
            <span class="fl msg">农联网商户系统</span>
        </a>
    </h1>

    <ul class="fr m-login">
        <li class="fl avatar J_Avatar">
            <div class="info clearfix">
                <div class="fl pic m-coverimg" style="background-image: url(/myproject/business/static/img/tmp/avatar1-ORCH.jpg)"></div>
                <span class="fl name"></span>
            </div>
            <div class="handle">
                <div class="inner">
                    <a href="#">注销</a>
                </div>
            </div>
        </li>
        <li class="fl help line">
            <i class="fl pic ico ico-help"></i>
            <a href="#" class="fl name">帮助</a>
        </li>
    </ul>
	
    <!-- <div class="m-search">
        <input class="search" type="text" placeholder="搜索HR政策流程">
        <span class="query ico ico-search"><input class="btn" type="submit"></span>
        <ul class="datalist">
            
    </div> -->
</div>
	</div>
	<div class="J_SiteBody g-site-body">
		
		<div class="J_SiteSide g-site-side">

    <div class="J_ScrollMenu">
        <!-- m-leftbar -->
        <ul class="m-leftbar">
            <!-- 选中状态的li添加class名active -->
            <li class="active">
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-home"></i>
                    <i class="now ico ico-nav-home2"></i>
                </span>
                    <span class="name">首页</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-info"></i>
                    <i class="now ico ico-nav-info2"></i>
                </span>
                    <span class="name">我的信息</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-salary"></i>
                    <i class="now ico ico-nav-salary2"></i>
                </span>
                    <span class="name">我的薪酬</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-team"></i>
                    <i class="now ico ico-nav-team2"></i>
                </span>
                    <span class="name">我的团队</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-structure"></i>
                    <i class="now ico ico-nav-structure2"></i>
                </span>
                    <span class="name">组织结构</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-prove"></i>
                    <i class="now ico ico-nav-prove2"></i>
                </span>
                    <span class="name">证明办理</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-welfare"></i>
                    <i class="now ico ico-nav-welfare2"></i>
                </span>
                    <span class="name">福利政策</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-service"></i>
                    <i class="now ico ico-nav-service2"></i>
                </span>
                    <span class="name">自助服务</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                    <span class="pic">
                        <i class="def ico ico-nav-backlog"></i>
                        <i class="now ico ico-nav-backlog2"></i>
                    </span>
                    <span class="name">待办流程</span>
                    <span class="num">10</span>
                </a>
            </li>
            <li>
                <a class="item" href="#">
                <span class="pic">
                    <i class="def ico ico-nav-staff"></i>
                    <i class="now ico ico-nav-staff2"></i>
                </span>
                    <span class="name">查看员工信息</span>
                </a>
            </li>
        </ul>
    </div>

</div>
		
		<div class="J_SiteMain g-site-main">
			
			<!-- 我的信息 -->
			<div class="p-info m-layout">
				<h2 class="m-title2">商户信息 <a class="fr u-back" href="#">返回</a></h2>

				<div class="p-basic clearfix">
					<div class="m-coverimg fl avatar" style="background-image: url(../img/tmp/avatar1-CARD.jpg)"></div>
					<div class="box fl">
						<ul class="p-list fl">
							<li class="fl wb25">姓名：--</li>
							<!-- <li class="fl wb35">工作地点：北京</li>
							<li class="fl wb40">直接上级：赵荣荣</li> -->
						</ul>
						<ul class="p-list fl">
							<!-- <li class="fl wb25">职位：界面设计师</li> -->
							<li class="fl wb35">电话：<?php echo $_smarty_tpl->tpl_vars['user']->value['mobile'];?>
</li>
						</ul>
						<ul class="p-list fl">
							<!-- <li class="fl wb25">所属团队：the one</li>
							<li class="fl wb35">email：<a class="u-link" href="#">liguokai@didichuxing.com</a></li> -->
						</ul>
						<ul class="p-list fl">
							<!-- <li class="fl wb25">第四行</li> -->
						</ul>
					</div>
				</div>

				<div class="m-tab p-tab J_Tab">
					<ul class="hd clearfix">
						<li class="active">审核信息</li>
						<li>招商信息</li>
						<li>广告信息</li>
						<li>产品信息</li>
					</ul>
					<div class="bd">
						<div class="item">
							<ul class="p-list clearfix">
								<li class="fl wb25">企业名称：<?php echo $_smarty_tpl->tpl_vars['shenhe_info']->value['name'];?>
</li>
								<li class="fl wb25">电话：</li>
								<li class="fl wb25">企业简介：<?php echo $_smarty_tpl->tpl_vars['shenhe_info']->value['description'];?>
</li>
								<!-- <li class="fl wb25">直接上级：赵荣荣</li> -->
							</ul>
							<ul class="p-list clearfix">
								<li class="fl wb25">经营类型：养殖</li>
								<li class="fl wb25">营业执照：<?php echo $_smarty_tpl->tpl_vars['shenhe_info']->value['business_license'];?>
</li>
								<!-- <li class="fl wb25">email：liguokai@didichuxing.com</li> -->
							</ul>
							<ul class="p-list clearfix">
								<li class="fl wb25">地址：<?php echo $_smarty_tpl->tpl_vars['shenhe_info']->value['address'];?>
</li>
								<li class="fl wb25">授权公函：<?php echo $_smarty_tpl->tpl_vars['shenhe_info']->value['authorization_letter'];?>
</li>
								<!-- <li class="fl wb25">管理级别：设计经理</li> -->
							</ul>
						</div>
						<div class="item">
							<div class="p-table-edu">
								<table class="m-table">
									<tr>
										<td class="wb16">开始日期</td>
										<td class="wb16">结束日期</td>
										<td class="wb16">学历</td>
										<td class="wb16">学位</td>
										<td class="wb16">毕业名称</td>
										<td class="wb16">专业</td>
									</tr>
									<tr>
										<td>2015.07</td>
										<td>2015.08</td>
										<td>本科</td>
										<td>学士</td>
										<td>哈弗大学</td>
										<td>哈哈</td>
									</tr>
									<tr>
										<td>2015.07</td>
										<td>2015.08</td>
										<td>-</td>
										<td>-</td>
										<td>哈弗大学</td>
										<td>-</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="item">
							<div class="p-table-edu">
								<table class="m-table">
									<tr>
										<td class="wb25">开始日期</td>
										<td class="wb25">结束日期</td>
										<td class="wb25">雇主</td>
										<td class="wb25">职位</td>
									</tr>
									<tr>
										<td>2015.07</td>
										<td>2015.08</td>
										<td>大大</td>
										<td>哈哈</td>
									</tr>
									<tr>
										<td>2015.07</td>
										<td>2015.08</td>
										<td>大大</td>
										<td>哈哈</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="item">
							<table class="table-family">
								<tr>
									<th class="w50">主要</th>
									<th class="w130">姓名</th>
									<th class="w100">关系</th>
									<th class="w270">地址</th>
									<th class="w100">邮编</th>
									<th class="w140">联系方式</th>
									<th class="w150">操作</th>
								</tr>
								<tr>
									<td><input type="radio"></td>
									<td><input type="text" class="w90 m-input"></td>
									<td>
										<select class="m-select J_Select">
											<option value="父子">父子</option>
										</select>
									</td>
									<td><input type="text" class="w230 m-input"></td>
									<td><input type="text" class="w60 m-input"></td>
									<td><input type="text" class="w100 m-input"></td>
									<td>
										<a class="handle-item" href="javascript:;">
											<i class="ico ico-add-table"></i>
											<span class="handle-text">添加</span>
										</a>
										<a class="handle-item" href="javascript:;">
											<i class="ico ico-del-table"></i>
											<span class="handle-text">删除</span>
										</a>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>

<script src="/myproject/business/static/libs/jquery/jquery.min.js"></script>
<script src="/myproject/business/static/libs/jquery/jquery.slimscroll.min.js"></script>
<script src="/myproject/business/static/libs/selectbox/selectbox-min.js"></script>
<script src="/myproject/business/static/js/jquery.tab.js"></script>
<script src="/myproject/business/static/js/common.js"></script>
<script>
	$(function(){
		// 模拟select选择框 by http://aui.github.io/popupjs/doc/selectbox.html
		$('.J_Select').each(function(){
			selectbox(this);
		});

		// tab switch
		$('.J_Tab').tabs('.hd li', '.bd .item');
	});
</script>
</body>
</html><?php }} ?>