<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<LINK rel="Bookmark" href="/tp32/Public/Admin/css/favicon.ico" >
<LINK rel="Shortcut Icon" href="/tp32/Public/Admin/css/favicon.ico"/>
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link href="/tp32/Public/Admin/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="/tp32/Public/Admin/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="/tp32/Public/Admin/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
<link href="/tp32/Public/Admin/skin/default/skin.css" rel="stylesheet" type="text/css" id="skin" />
<link href="/tp32/Public/Admin/css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="/tp32/Public/Admin/lib/zTree/v3/css/zTreeStyle/zTreeStyle.css" type="text/css">
<link href="/tp32/Public/Admin/lib/icheck/icheck.css" rel="stylesheet" type="text/css" />
<link href="/tp32/Public/Admin/lib/webuploader/0.1.5/webuploader.css" rel="stylesheet" type="text/css" />
<link href="/tp32/Public/Admin/css/H-ui.login.css" rel="stylesheet" type="text/css" />
<link href="/tp32/Public/Admin/css/style.css" rel="stylesheet" type="text/css" />
<link href="/tp32/Public/Admin/lib/Hui-iconfont/1.0.7/iconfont.css" rel="stylesheet" type="text/css" />
<title>后台管理</title>

</head>
<body>
<title>编辑图片</title>
</head>
<body>
<div class="pd-20">
	<form action="<?php echo U('UL/picture_edit');?>" method="post" class="form form-horizontal" id="form-article-add">
		<div class="row cl">
			<label class="form-label col-2"><span class="c-red">*</span>图片标题：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="<?php echo ($picinfo['title']); ?>" placeholder="" name="title">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">简略标题：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="" placeholder="" id="" name="sname">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2"><span class="c-red">*</span>分类栏目：</label>
			<div class="formControls col-2"> <span class="select-box">
				<select name="column" class="select">
					<option value="0">全部栏目</option>
                    <!-- 一级分类栏目 -->
                    <?php if(is_array($mitemlist)): foreach($mitemlist as $key=>$mitemlist): if($picinfo['mid'] == $mitemlist['id'] ) $sel_s = 'selected';else $sel_s = ' ';?>
					    <option <?php echo ($sel_s); ?> value="<?php echo ($mitemlist["id"]); ?>"><?php echo ($mitemlist["name"]); ?></option><?php endforeach; endif; ?>   
				</select>
				</span> </div>
			<label class="form-label col-2">排序值：</label>
			<div class="formControls col-2">
				<input type="text" class="input-text" value="<?php echo ($picinfo['vsort']); ?>" placeholder="" id="" name="vsort">
			</div>
            <label class="form-label col-2">跳转地址(url): </label>
            <div class="formControls col-2">
                <input type="text" class="input-text" value="<?php echo ($picinfo['jump_url']); ?>" placeholder="" id="" name="jump_url">
            </div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">关键词：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="0" placeholder="" id="" name="keywords">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">图片摘要：</label>
			<div class="formControls col-10">
				<textarea name="description" cols="" rows="" class="textarea"  placeholder="说点什么...最少输入10个字符" datatype="*10-100" dragonfly="true" nullmsg="备注不能为空！" onKeyUp="textarealength(this,200)"></textarea>
				<p class="textarea-numberbar"><em class="textarea-length">0</em>/200</p>
			</div>
		</div>
		
        <div class="row cl">
            <label class="form-label col-2">详细内容：</label>
            <div class="formControls col-10">
                <textarea name="contents" id="editor" style="width:100%;height:400px;"><?php echo stripslashes(trim($picinfo['src'],"\"")) ;?></textarea>
            </div>
        </div>
		<div class="row cl">
			<div class="col-10 col-offset-2">
				<button class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交审核</button>
				<button onClick="article_save();" class="btn btn-secondary radius" type="button"><i class="Hui-iconfont">&#xe632;</i> 保存草稿</button>
				<button onClick="layer_close();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
			</div>
		</div>
		<input type="hidden" name="id" value="<?php echo ($picinfo['id']); ?>">
	</form>
</div>
</div>
<script type="text/javascript" src="/tp32/Public/Admin/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="/tp32/Public/Admin/lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="/tp32/Public/Admin/js/H-ui.js"></script> 
<script type="text/javascript" src="/tp32/Public/Admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="/tp32/Public/Admin/lib/laypage/1.2/laypage.js"></script> 
<script type="text/javascript" src="/tp32/Public/Admin/lib/My97DatePicker/WdatePicker.js"></script> 
<!-- <script type="text/javascript" src="/tp32/Public/Admin/lib/datatables/1.10.0/jquery.dataTables.js"></script>   -->
<script type="text/javascript" src="/tp32/Public/Admin/lib/My97DatePicker/WdatePicker.js"></script> 
<script type="text/javascript" src="/tp32/Public/Admin/lib/datatables/1.10.0/jquery.dataTables.min.js"></script> 
<script type="text/javascript" src="/tp32/Public/Admin/lib/zTree/v3/js/jquery.ztree.all-3.5.js"></script> 
<script type="text/javascript" src="/tp32/Public/Admin/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="/tp32/Public/Admin/lib/Validform/5.3.2/Validform.min.js"></script> 
<!-- <script type="text/javascript" src="/tp32/Public/Admin/lib/webuploader/0.1.5/webuploader.min.js"></script>  -->
<script type="text/javascript" src="/tp32/Public/Admin/lib/webuploader/0.1.5/webuploader.js"></script>
<script type="text/javascript" src="/tp32/Public/Admin/lib/ueditor/1.4.3/ueditor.config.js"></script>
<script type="text/javascript" src="/tp32/Public/Admin/lib/ueditor/1.4.3/ueditor.all.min.js"> </script>
<script type="text/javascript" src="/tp32/Public/Admin/lib/ueditor/1.4.3/lang/zh-cn/zh-cn.js"></script>

<script type="text/javascript">
$(function(){ 
    var ue = UE.getEditor('editor');

});
</script>
</body>
</html>