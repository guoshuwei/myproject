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
<title>新建品牌</title>
<link rel="stylesheet" type="text/css" href="/lib/validate/jquery.validate.css">
</head>
<body>
<div class="pd-20">
	<form id="brandForm" action="<?php echo U('PP/brand_add');?>" method="post" class="form form-horizontal" id="form-user-character-add">
	<!-- <form id="brandForm" method="post" class="form form-horizontal" id="form-user-character-add"> -->
        <input type="hidden" value="<?php echo ($brand["id"]); ?>" name="id" />
		<div class="row cl">
			<label class="form-label col-2"><span class="c-red">*</span>品牌名称：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["name"]); ?>" id="name" name="name">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">品牌英文名称：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["egname"]); ?>" placeholder="" id="egname" name="egname">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">logo链接：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["logo"]); ?>" placeholder="" id="logo" name="logo">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">品牌副标题：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["subtitle"]); ?>" placeholder="" id="logo" name="subtitle">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">星级：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["star"]); ?>" placeholder="" id="logo" name="star">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">浏览量：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["hits"]); ?>" placeholder="" id="logo" name="hits">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">品牌宣传缩略图：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["brandimage"]); ?>" placeholder="" id="logo" name="brandimage">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">品牌分类：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["brand_type"]); ?>" placeholder="" id="logo" name="brand_type">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">品牌特点：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["character"]); ?>" placeholder="" id="logo" name="character">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">创立时间：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["brand_create_time"]); ?>" placeholder="" id="logo" name="brand_create_time">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">年营业额：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["annual_sale"]); ?>" placeholder="" id="logo" name="annual_sale">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">公司地址：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["company_address"]); ?>" placeholder="" id="logo" name="company_address">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">公司名称：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["company_name"]); ?>" placeholder="" id="logo" name="company_name">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">门店数：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["store_num"]); ?>" placeholder="" id="logo" name="store_num">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">公司联系电话：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["company_phone"]); ?>" placeholder="" id="logo" name="company_phone">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">官网链接：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($brand["company_link"]); ?>" placeholder="" id="logo" name="company_link">
			</div>
		</div>

		<div class="row cl">
			<div class="col-10 col-offset-2">
				<button type="button" class="btn btn-success radius" id="brandSave"><i class="icon-ok"></i> 保存</button>
			</div>
		</div>
	</form>
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

<script type="text/javascript" src="/lib/validate/jquery.validate.min.js" ></script>
<script type="text/javascript" src="/lib/validate/jquery.validate.extend.js" ></script>
<script type="text/javascript" src="/lib/noty/jquery.noty.packaged.min.js" ></script>
<script type="text/javascript" src="/lib/noty/jquery.noty.packaged.extend.js" ></script>
<script>
	// 添加
    $('#brandSave').click(function(){
        $('#brandForm').submit();
    });
    $("#brandForm").validate({
        rules: {
			name:{
				required: true,
				maxlength: 50,
			},
			egname:{
				required: true,
				maxlength: 50,
			},
			logo:{
				required: true,
				maxlength: 255,
			},
			subtitle:{
				required: true,
				maxlength: 100,
			},
			star:{
				required: true,
			},
			hits:{
				required: true,
			},
			brandimage:{
				required: true,
				maxlength: 255,
			},
			brand_type:{
				required: true,
				maxlength: 100,
			},
			character:{
				required: true,
				maxlength: 255,
			},
			brand_create_time:{
				date: true,
			},
			annual_sale:{
				digits: true,
			},
			company_address:{
				required: true,
				maxlength: 255,
			},
			company_name:{
				required: true,
				maxlength: 255,
			},
			store_num:{
				digits: true,
			},
			company_phone:{
				required: true,
				isTel: true,
			},
			company_link:{
				required: true,
			},
        },
        errorClass: "error invalid",
    });
</script>
</body>
</html>