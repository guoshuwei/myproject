<<<<<<< HEAD
<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<LINK rel="Bookmark" href="/myproject/main/Public/Admin/css/favicon.ico" >
<LINK rel="Shortcut Icon" href="/myproject/main/Public/Admin/css/favicon.ico"/>
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link href="/myproject/main/Public/Admin/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/skin/default/skin.css" rel="stylesheet" type="text/css" id="skin" />
<link href="/myproject/main/Public/Admin/css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="/myproject/main/Public/Admin/lib/zTree/v3/css/zTreeStyle/zTreeStyle.css" type="text/css">
<link href="/myproject/main/Public/Admin/lib/icheck/icheck.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/lib/webuploader/0.1.5/webuploader.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/css/H-ui.login.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/css/style.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
<title>后台管理</title>

</head>
<body>
<title>功能介绍</title>
</head>
<body>
<div class="pd-20">
	<div>
		<p>商品模块</p>
		<div>
			<p>商品分类：</p>
			<div>该模块实现无限级分类，模块可以平行移动;</div>
			<p>商品列表：</p>
			<div>商品查看，编辑，删除，添加</div>
			<p>数据表设计</p>
			<div>
				<span style="display:block">商品分类表: t_products_branch_dd;</span>
				<span style="display:block">商品表: t_products_dd;</span>
				<span style="display:block">商品分类关系表: t_products_branch_relation_dd</span>
				<span style="display:block">商户表: t_merchant_dd</span>
				<span style="display:block">商户详情表: t_merchant_details_dd</span>
				<span style="display:block">商户分类表: t_merchant_relation_dd</span>
			</div>
			<p>数据关系(ORM)</p>
			<div>
				<q>1.商户和商品的关系:</q>
				<span style="display:block">商品所属商户:</span>
			</div>
			<p>接入支付</p>
			<div>
				<span style="display:block">在商城中接入支付宝需要经过注册账户、实名认证、签约申请、订单审核、技术集成，5个步骤。除了最后一步之外，均需要您直接在支付宝平台上进行操作。支付宝商家服务电话：0571 - 88158090。</span>
			</div>
			<p>注册公司</p>
			<div>
				<a href="https://www.zhihu.com/question/19585093">
					链接
				</a>
				<span style="display:block">在商城中接入支付宝需要经过注册账户、实名认证、签约申请、订单审核、技术集成，5个步骤。除了最后一步之外，均需要您直接在支付宝平台上进行操作。支付宝商家服务电话：0571 - 88158090。</span>
			</div>

			<p>用户权限管理</p>
			<div>
				<a href="https://www.zhihu.com/question/19585093">
					thinkphp 用户权限
				</a>
				<span style="display:block">(RBAC)权限管理系统 ，角色，权限</span>
				<span style="display:block">一期权限分类：用户组只涉及两种 = 管理员（1），商户（2）</span>
				<span style="display:block">通用权限的设计思想
					RBAC 模型描述：

				    RBAC0的模型中包括用户（U）、角色（R）和许可权（P）等3类实体集合。

					实用的RBAC模型的数据库建模
				</span>
			</div>
			<p>数据表设计</p>
			<div>
				<span style="display:block">角色表: t_roles_dd（角色id(pk)，角色名）;</span>
				<span style="display:block">权限表: t_permissions_dd（权限id(pk)，权限描述）;</span>
				<span style="display:block">角色权限关系表: t_role_perm_dd(角色id(fk)，权限id(fk))</span>
				<span style="display:block">用户角色关系表: t_user_role_dd(用户id(fk)，角色id(fk))</span>
				<span style="display:block">用户表: t_user_dd（用户id(pk)）</span>
			</div>
			<div>
				操作流程:
				添加角色（管理员）
				添加权限（商品管理=商品分类,商品列表）

				商户用户组的权限：商品添加，订单查看，商品编辑;

				用户和角色（many to many）

				代码规范:
				1.创建一个用户类和一个角色类，用户类里边定义一个方法：roles，角色类里边定义一个方法 users
				2.授权
				3.该系统可用的功能列表;所有可以访问该系统的人员列表;权限列表标识功能可以被用户访问；

				建模：存取矩阵。
				1.Access Control Objects (ACOs)  访问控制对象。
				2.Access Request Objects (AROs) 访问请求对象。
				3.AROs request access to the ACOs

				An ARO tree defines a hierarchy of Groups and AROs (things that request
access). This is very similar to a tree view of folders and files. The
'folders' are the Groups and the 'files' are AROs.

			    phpGACL 定义权限：

			    When the ship's computer (running phpGACL of course) checks access, the
only question it can ask itself is "Does person X have access to room
Y?" In phpGACL terms, this is rephrased as "Does ARO 'X' have access to
ACO 'Y'?"


				权限树:

				














			</div>
			<p>接入第三方支付</p>
			<div>
				braintree  支付接入
				前端ui
				1.提供完整的客户端和server SDK 去完成集成（Client SDKs：javasript; Server SDKs:php）
				流程说明：
				1.app或者web前端向服务器请求一个client端token ，用来初始化客户端SDK
				2.服务端通过服务端SDK产生，并且发送一个token 给前端，
				3.一旦客户端SDK初始化，并且用户提交了支付信息，SDK传递信息并返回一个随机数；
				4.客户端发送返回的随机数给服务端；
				5.服务端代码接受返回的随机数，使用服务端SDK创建交易，

				测试----创建沙箱环境（sandbox）
				braintree 的帐号：braintree  密码:braintree
				
			</div>
			<p>RPC(Remote Procedure Call Protocal)</p>
			<div>
				远程过程调用。
				(客户机/服务器模式，请求程序就是一个客户机，服务提供程序就是一个服务器)
				
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/js/H-ui.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/laypage/1.2/laypage.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/My97DatePicker/WdatePicker.js"></script> 
<!-- <script type="text/javascript" src="/myproject/main/Public/Admin/lib/datatables/1.10.0/jquery.dataTables.js"></script>   -->
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/My97DatePicker/WdatePicker.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/datatables/1.10.0/jquery.dataTables.min.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/zTree/v3/js/jquery.ztree.all-3.5.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/Validform/5.3.2/Validform.min.js"></script> 
<!-- <script type="text/javascript" src="/myproject/main/Public/Admin/lib/webuploader/0.1.5/webuploader.min.js"></script>  -->
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/webuploader/0.1.5/webuploader.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/ueditor/1.4.3/ueditor.config.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/ueditor/1.4.3/ueditor.all.min.js"> </script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/ueditor/1.4.3/lang/zh-cn/zh-cn.js"></script>

<script type="text/javascript">
$(function(){
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	form[0].submit();
	var index = parent.layer.getFrameIndex(window.name);
	parent.$('.btn-refresh').click();
	parent.layer.close(index);
});
</script>
</body>
=======
<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<LINK rel="Bookmark" href="/myproject/main/Public/Admin/css/favicon.ico" >
<LINK rel="Shortcut Icon" href="/myproject/main/Public/Admin/css/favicon.ico"/>
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link href="/myproject/main/Public/Admin/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/skin/default/skin.css" rel="stylesheet" type="text/css" id="skin" />
<link href="/myproject/main/Public/Admin/css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="/myproject/main/Public/Admin/lib/zTree/v3/css/zTreeStyle/zTreeStyle.css" type="text/css">
<link href="/myproject/main/Public/Admin/lib/icheck/icheck.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/lib/webuploader/0.1.5/webuploader.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/css/H-ui.login.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/css/style.css" rel="stylesheet" type="text/css" />
<link href="/myproject/main/Public/Admin/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
<title>后台管理</title>

</head>
<body>
<title>功能介绍</title>
</head>
<body>
<div class="pd-20">
	<div>
		<p>商品模块</p>
		<div>
			<p>商品分类：</p>
			<div>该模块实现无限级分类，模块可以平行移动;</div>
			<p>商品列表：</p>
			<div>商品查看，编辑，删除，添加</div>
			<p>数据表设计</p>
			<div>
				<span style="display:block">商品分类表: t_products_branch_dd;</span>
				<span style="display:block">商品表: t_products_dd;</span>
				<span style="display:block">商品分类关系表: t_products_branch_relation_dd</span>
				<span style="display:block">商户表: t_merchant_dd</span>
				<span style="display:block">商户详情表: t_merchant_details_dd</span>
				<span style="display:block">商户分类表: t_merchant_relation_dd</span>
			</div>
			<p>数据关系(ORM)</p>
			<div>
				<q>1.商户和商品的关系:</q>
				<span style="display:block">商品所属商户:</span>
			</div>
			<p>接入支付</p>
			<div>
				<span style="display:block">在商城中接入支付宝需要经过注册账户、实名认证、签约申请、订单审核、技术集成，5个步骤。除了最后一步之外，均需要您直接在支付宝平台上进行操作。支付宝商家服务电话：0571 - 88158090。</span>
			</div>
			<p>注册公司</p>
			<div>
				<a href="https://www.zhihu.com/question/19585093">
					链接
				</a>
				<span style="display:block">在商城中接入支付宝需要经过注册账户、实名认证、签约申请、订单审核、技术集成，5个步骤。除了最后一步之外，均需要您直接在支付宝平台上进行操作。支付宝商家服务电话：0571 - 88158090。</span>
			</div>

			<p>用户权限管理</p>
			<div>
				<a href="https://www.zhihu.com/question/19585093">
					thinkphp 用户权限
				</a>
				<span style="display:block">(RBAC)权限管理系统 ，角色，权限</span>
				<span style="display:block">一期权限分类：用户组只涉及两种 = 管理员（1），商户（2）</span>
				<span style="display:block">通用权限的设计思想
					RBAC 模型描述：

				    RBAC0的模型中包括用户（U）、角色（R）和许可权（P）等3类实体集合。

					实用的RBAC模型的数据库建模
				</span>
			</div>
			<p>数据表设计</p>
			<div>
				<span style="display:block">角色表: t_roles_dd（角色id(pk)，角色名）;</span>
				<span style="display:block">权限表: t_permissions_dd（权限id(pk)，权限描述）;</span>
				<span style="display:block">角色权限关系表: t_role_perm_dd(角色id(fk)，权限id(fk))</span>
				<span style="display:block">用户角色关系表: t_user_role_dd(用户id(fk)，角色id(fk))</span>
				<span style="display:block">用户表: t_user_dd（用户id(pk)）</span>
			</div>
			<div>
				操作流程:
				添加角色（管理员）
				添加权限（商品管理=商品分类,商品列表）

				商户用户组的权限：商品添加，订单查看，商品编辑;

				用户和角色（many to many）

				代码规范:
				1.创建一个用户类和一个角色类，用户类里边定义一个方法：roles，角色类里边定义一个方法 users
				2.授权
				3.该系统可用的功能列表;所有可以访问该系统的人员列表;权限列表标识功能可以被用户访问；

				建模：存取矩阵。
				1.Access Control Objects (ACOs)  访问控制对象。
				2.Access Request Objects (AROs) 访问请求对象。
				3.AROs request access to the ACOs

				An ARO tree defines a hierarchy of Groups and AROs (things that request
access). This is very similar to a tree view of folders and files. The
'folders' are the Groups and the 'files' are AROs.

			    phpGACL 定义权限：

			    When the ship's computer (running phpGACL of course) checks access, the
only question it can ask itself is "Does person X have access to room
Y?" In phpGACL terms, this is rephrased as "Does ARO 'X' have access to
ACO 'Y'?"


				权限树:

				














			</div>
			<p>接入第三方支付</p>
			<div>
				braintree  支付接入
				前端ui
				1.提供完整的客户端和server SDK 去完成集成（Client SDKs：javasript; Server SDKs:php）
				流程说明：
				1.app或者web前端向服务器请求一个client端token ，用来初始化客户端SDK
				2.服务端通过服务端SDK产生，并且发送一个token 给前端，
				3.一旦客户端SDK初始化，并且用户提交了支付信息，SDK传递信息并返回一个随机数；
				4.客户端发送返回的随机数给服务端；
				5.服务端代码接受返回的随机数，使用服务端SDK创建交易，

				测试----创建沙箱环境（sandbox）
				braintree 的帐号：braintree  密码:braintree
				
			</div>
			<p>RPC(Remote Procedure Call Protocal)</p>
			<div>
				远程过程调用。
				(客户机/服务器模式，请求程序就是一个客户机，服务提供程序就是一个服务器)
				
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/js/H-ui.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/laypage/1.2/laypage.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/My97DatePicker/WdatePicker.js"></script> 
<!-- <script type="text/javascript" src="/myproject/main/Public/Admin/lib/datatables/1.10.0/jquery.dataTables.js"></script>   -->
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/My97DatePicker/WdatePicker.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/datatables/1.10.0/jquery.dataTables.min.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/zTree/v3/js/jquery.ztree.all-3.5.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/Validform/5.3.2/Validform.min.js"></script> 
<!-- <script type="text/javascript" src="/myproject/main/Public/Admin/lib/webuploader/0.1.5/webuploader.min.js"></script>  -->
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/webuploader/0.1.5/webuploader.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/ueditor/1.4.3/ueditor.config.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/ueditor/1.4.3/ueditor.all.min.js"> </script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/ueditor/1.4.3/lang/zh-cn/zh-cn.js"></script>

<script type="text/javascript">
$(function(){
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	form[0].submit();
	var index = parent.layer.getFrameIndex(window.name);
	parent.$('.btn-refresh').click();
	parent.layer.close(index);
});
</script>
</body>
>>>>>>> c04a19038846600c58b0b199ea1b925aeb706037
</html>