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
<body class="pos-r">
<div>
	<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 模块管理 <span class="c-gray en">&gt;</span> 子级分类管理<span class="c-gray en">&gt;</span>文章列表<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
	<div class="pd-20" style="padding-top:0px;">
		<div class="cl pd-5 bg-1 bk-gray mt-20"> <span class="l"><a class="btn btn-primary radius" onclick="product_add('添加文章','<?php echo U('MV/product_add');?>')" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 添加文章</a></span></div>
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-hover table-sort">
				<thead>
					<tr class="text-c">
						<th width="40"><input name="" type="checkbox" value=""></th>
						<th width="40">ID</th>
						<th width="60">所属分类</th>
						<th width="100">文章标题</th>
						<th width="100">添加时间</th>
						<th width="60">发布状态</th>
						<th width="100">操作</th>
					</tr>
				</thead>
				<tbody>
				<?php if(is_array($zjlist)): foreach($zjlist as $key=>$zjlist): ?><tr class="text-c va-m">
						<td><input name="" type="checkbox" value=""></td>
						<td><?php echo ($zjlist["id"]); ?></td>
						<td><?php echo ($zjlist["tname"]); ?></td>
						<td class="text-l"><?php echo ($zjlist["title"]); ?></td>
						<td><span class="price"><?php echo date('Y-m-d H:i:s',$zjlist['dt']);?></td>
						<td class="td-status">
						<?php if(($zjlist["pubstatus"] == 1) OR ($zjlist["pubstatus"] == null)): ?><span class="label label-success radius">已发布</span>
						<?php else: ?>
							<span class="label label-defaunt radius">已下架</span><?php endif; ?>
						</td>
						<td class="td-manage">
							<?php if(($zjlist["pubstatus"] == 1) OR ($zjlist["pubstatus"] == null)): ?><a style="text-decoration:none" onClick="product_stop(this,<?php echo ($zjlist['id']); ?>,0)" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i>
							</a> 
							<?php else: ?>
							<a style="text-decoration:none" onClick="product_start(this,<?php echo ($zjlist['id']); ?>,1)" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i>
							</a><?php endif; ?>
							<a style="text-decoration:none" class="ml-5" onClick="product_edit('产品编辑','<?php echo U('MV/product_edit','id='.$zjlist['id'].'&op=edit');?>',<?php echo ($zjlist['id']); ?>)" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i>
							</a> 
							<a style="text-decoration:none" class="ml-5" onClick="product_del(this,<?php echo ($zjlist['id']); ?>,'10001')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i>
							</a>
						</td>
					</tr><?php endforeach; endif; ?>
				</tbody>
			</table>
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
/*产品-下架*/
function product_stop(obj,id,status){
	$.ajax({
			url:'<?php echo U('MV/product_stop');?>',
			type:'POST',
			data:{'id':id,'status':status},
			dataType:'json',
			beforeSend:function(){
				
			},
			complete:function(){
                
			},
			success:function(data){
				layer.confirm('确认要下架吗？',function(index){	
					if(data == 1)
					{
						$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="product_start(this,'+id+',1)" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i></a>');
						$(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
						$(obj).remove();
						layer.msg('已下架!',{icon: 5,time:1000});
					}else{
						$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="product_stop(this,'+id+',0)" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>');
						$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
						$(obj).remove();
						layer.msg('操作失败!',{icon: 6,time:1000});
					}
				});
			},
			error:function(xhr,textStatus){

			}
	});
	
}

/*产品-发布*/
function product_start(obj,id,status){
	$.ajax({
			url:'<?php echo U('MV/product_stop');?>',
			type:'POST',
			data:{'id':id,'status':status},
			dataType:'json',
			beforeSend:function(){
			},
			complete:function(){
                
			},
			success:function(data){
				layer.confirm('确认要发布吗？',function(index){
					if(data ==1)
					{
						$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="product_stop(this,'+id+',0)" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>');
						$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
						$(obj).remove();
						layer.msg('已发布!',{icon: 6,time:1000});
					}else{
						$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="product_start(this,'+id+',1)" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i></a>');
						$(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
						$(obj).remove();
						layer.msg('操作失败',{icon: 5,time:1000});
					}
				});
			},
			error:function(xhr,textStatus){

			}
	});
	
}
/*图片-申请上线*/
function product_shenqing(obj,id){
	$(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">待审核</span>');
	$(obj).parents("tr").find(".td-manage").html("");
	layer.msg('已提交申请，耐心等待审核!', {icon: 1,time:2000});
}
/*图片-编辑*/
function product_edit(title,url,id){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
//添加产品
function product_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*图片-删除*/
function product_del(obj,id){
	$.ajax({
		url:'<?php echo U('MV/product_del');?>',
			type:'POST',
			data:{'id':id},
			dataType:'json',
			beforeSend:function(){
			},
			complete:function(){
                
			},
			success:function(data){
				layer.confirm('确认要删除吗？',function(index){
					if(data ==1)
					{
						$(obj).parents("tr").remove();
						layer.msg('已删除!',{icon:1,time:1000});
					}else{
						layer.msg('操作失败',{icon: 5,time:1000});
					}
				});
			},
			error:function(xhr,textStatus){

			}
	})
}

</script>
</body>
</html>