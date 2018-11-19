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
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 图片管理 <span class="c-gray en">&gt;</span> 图片列表 <a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-20">
	<div class="cl pd-5 bg-1 bk-gray mt-20"> 
		<span class="l">
			<a class="btn btn-primary radius" onclick="picture_add('添加图片','<?php echo U('UL/picture_add');?>')" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 添加图片</a>
		</span> <span class="r">共有数据：<strong>54</strong> 条</span> 
	</div>
	<div class="mt-20">
		<table class="table table-border table-bordered table-bg table-hover table-sort">
			<thead>
				<tr class="text-c">
					<th width="40"><input name="" type="checkbox" value=""></th>
					<th width="80">ID</th>
					<th width="100">分类</th>
					<th>图片标题</th>
					<th>图片内容</th>
					<th width="150">更新时间</th>
					<th width="60">发布状态</th>
					<th width="100">操作</th>
				</tr>
			</thead>
			<tbody>
			<?php if(is_array($piclist)): foreach($piclist as $key=>$piclist): ?><tr class="text-c">
					<td><input name="" type="checkbox" value=""></td>
					<td><?php echo ($piclist["id"]); ?></td>
					<td>首页banner轮播图</td>
					<td class="text-l"><a class="maincolor" href="javascript:;" onClick="picture_edit('图库编辑','picture-show.html','10001')"><?php echo ($piclist["title"]); ?></a></td>
					
					<td class="text-l"><div><?php echo stripslashes(trim($piclist['src'],"\"")) ;?></div></td>
					<td><?php echo date('Y-m-d',$piclist['dt']);?></td>
					<td class="td-status"><span class="label label-success radius">已发布</span></td>
					<td class="td-manage"><a style="text-decoration:none" onClick="picture_stop(this,'10001')" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a> <a style="text-decoration:none" class="ml-5" onClick="picture_edit('图片编辑','<?php echo U('UL/picture_edit?id='.$piclist['id']);?>')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a> <a style="text-decoration:none" class="ml-5" onClick="picture_del(this,'10001')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a></td>
				</tr><?php endforeach; endif; ?>
			</tbody>
		</table>
	</div>
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

<script type="text/javascript">
    //分页
$(document).ready(function() {
  $('.table-sort').dataTable({
  	
    "bPaginate": true, //翻页功能
    "bLengthChange":true, //改变每页显示数据数量
    "bFilter": true, //过滤功能
    "bSort": true, //排序功能
    "bInfo": true,//页脚信息
    "bAutoWidth": true,//自动宽度
    "aLengthMenu": [10],//每页显示的条数
    "language": {
        "sInfo": "_PAGE_/_PAGES_ 共_TOTAL_条数据",
        "paginate": {
            "sFirst": "首页",
            "sPrevious": "前一页",
            "sNext": "后一页",
            "sLast": "尾页"
        }
    }
  });
});
function picture_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
function picture_edit(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*图片-删除*/
function picture_del(obj,id){
	layer.confirm('确认要删除吗？',function(index){
		$(obj).parents("tr").remove();
		layer.msg('已删除!',{icon:1,time:1000});
	});
}
</script>
</body>
</html>