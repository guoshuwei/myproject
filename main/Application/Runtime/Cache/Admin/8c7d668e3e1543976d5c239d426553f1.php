<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<LINK rel="Bookmark" href="/main/Public/Admin/css/favicon.ico" >
<LINK rel="Shortcut Icon" href="/main/Public/Admin/css/favicon.ico"/>
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link href="/main/Public/Admin/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="/main/Public/Admin/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="/main/Public/Admin/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
<link href="/main/Public/Admin/skin/default/skin.css" rel="stylesheet" type="text/css" id="skin" />
<link href="/main/Public/Admin/css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="/main/Public/Admin/lib/zTree/v3/css/zTreeStyle/zTreeStyle.css" type="text/css">
<link href="/main/Public/Admin/lib/icheck/icheck.css" rel="stylesheet" type="text/css" />
<link href="/main/Public/Admin/lib/webuploader/0.1.5/webuploader.css" rel="stylesheet" type="text/css" />
<link href="/main/Public/Admin/css/H-ui.login.css" rel="stylesheet" type="text/css" />
<link href="/main/Public/Admin/css/style.css" rel="stylesheet" type="text/css" />
<link href="/main/Public/Admin/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
<title>后台管理</title>

</head>
<body>
<title>新建网站角色</title>
</head>
<body>
<div class="pd-20">
	<form action="<?php echo U('AD/admin_role_add');?>" method="post" class="form form-horizontal" id="form-user-character-add">
		<div class="row cl">
			<label class="form-label col-2"><span class="c-red">*</span>角色名称：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" id="rname" name="rname">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">描述：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="" placeholder="" id="description" name="description">
			</div>
		</div>
		<div class="row cl">
			<div class="col-10 col-offset-2">
				<button type="submit" class="btn btn-success radius" id="admin-role-save" name="admin-role-save"><i class="icon-ok"></i> 确定</button>
			</div>
		</div>
	</form>
</div>
<script type="text/javascript" src="/main/Public/Admin/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="/main/Public/Admin/lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="/main/Public/Admin/js/H-ui.js"></script> 
<script type="text/javascript" src="/main/Public/Admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="/main/Public/Admin/lib/laypage/1.2/laypage.js"></script> 
<script type="text/javascript" src="/main/Public/Admin/lib/My97DatePicker/WdatePicker.js"></script> 
<!-- <script type="text/javascript" src="/main/Public/Admin/lib/datatables/1.10.0/jquery.dataTables.js"></script>   -->
<script type="text/javascript" src="/main/Public/Admin/lib/My97DatePicker/WdatePicker.js"></script> 
<script type="text/javascript" src="/main/Public/Admin/lib/datatables/1.10.0/jquery.dataTables.min.js"></script> 
<script type="text/javascript" src="/main/Public/Admin/lib/zTree/v3/js/jquery.ztree.all-3.5.js"></script> 
<script type="text/javascript" src="/main/Public/Admin/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="/main/Public/Admin/lib/Validform/5.3.2/Validform.min.js"></script> 
<!-- <script type="text/javascript" src="/main/Public/Admin/lib/webuploader/0.1.5/webuploader.min.js"></script>  -->
<script type="text/javascript" src="/main/Public/Admin/lib/webuploader/0.1.5/webuploader.js"></script>
<script type="text/javascript" src="/main/Public/Admin/lib/ueditor/1.4.3/ueditor.config.js"></script>
<script type="text/javascript" src="/main/Public/Admin/lib/ueditor/1.4.3/ueditor.all.min.js"> </script>
<script type="text/javascript" src="/main/Public/Admin/lib/ueditor/1.4.3/lang/zh-cn/zh-cn.js"></script>

<script>
// $(function(){
// 	$(".permission-list dt input:checkbox").click(function(){
// 		$(this).closest("dl").find("dd input:checkbox").prop("checked",$(this).prop("checked"));
// 	});
// 	$(".permission-list2 dd input:checkbox").click(function(){
// 		var l =$(this).parent().parent().find("input:checked").length;
// 		var l2=$(this).parents(".permission-list").find(".permission-list2 dd").find("input:checked").length;
// 		if($(this).prop("checked")){
// 			$(this).closest("dl").find("dt input:checkbox").prop("checked",true);
// 			$(this).parents(".permission-list").find("dt").first().find("input:checkbox").prop("checked",true);
// 		}
// 		else{
// 			if(l==0){
// 				$(this).closest("dl").find("dt input:checkbox").prop("checked",false);
// 			}
// 			if(l2==0){
// 				$(this).parents(".permission-list").find("dt").first().find("input:checkbox").prop("checked",false);
// 			}
// 		}
		
// 	});
// });
</script>
</body>
</html>