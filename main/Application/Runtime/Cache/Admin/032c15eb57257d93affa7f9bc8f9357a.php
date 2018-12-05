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
<title>产品分类</title>
<style>
	.ztree li span.button.add {margin-right:2px; background-position:-143px 0px; vertical-align:top;vertical-align:middle}
	.layui-layer-btn {
	    text-align: center !important;
	    padding: 0 10px 12px;
	    pointer-events: auto;
	}
</style>
</head>
<body>
<style>
	.ztree li span.button.add {margin-right:2px; background-position:-143px 0px; vertical-align:top;vertical-align:middle}
</style>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 分类管理 <a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<table class="table">
	<tr>
		<td width="200" class="va-t"><ul id="treeDemo" class="ztree"></ul></td>
		<td class="va-t"><IFRAME ID="testIframe" Name="testIframe" FRAMEBORDER=0 SCROLLING=AUTO width=100%  height=390px SRC="subedit.html"></IFRAME></td>
	</tr>
</table>
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
//进来加载
$(document).ready(function(){
function query()//查询分类
{
	$.ajax({
			url:'<?php echo U('SPGL/query');?>',
			type:'POST',
			dataType:'json',
			beforeSend:function(){
			},
			complete:function(treeNode){
                var zTree = $.fn.zTree.getZTreeObj('treeDemo');//初始化zTree
                var sel_treeNode = eval(treeNode.responseText);
				zTree.selectNode(zTree.getNodeByParam("id",sel_treeNode[0].id));//选中第一个
				if(sel_treeNode[0].pId == "")
				{
					sel_treeNode[0].pId = 0;
				}
				var param = '/m/'+sel_treeNode[0].pId+'/s/'+sel_treeNode[0].id;
				demoIframe.attr("src","<?php echo U('subedit"+param+"');?>");
				return true;
			},
			success:function(data){
				backdata = eval(data);
				// console.log(backdata);
				zNodes = backdata;
				zTreeInit(zNodes);
			},
			error:function(xhr,textStatus){

			}
	});
}
query();
function zTreeInit(zNodes)
{
	var setting = {
		view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			dblClickExpand: false,
			showLine: false,
			selectedMulti: false
		},
		async: {
			enable: true,
		},
		edit: {
            enable: true,
            removeTitle:'删除',
            showRemoveBtn: true,
            showRenameBtn: false
        },
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: ""
			}
		},
		callback: {
			beforeClick: function(treeId, treeNode) {
				if(treeNode.pId == "")
				{
					treeNode.pId = 0;
				}
				var zTree = $.fn.zTree.getZTreeObj("tree");
				if (treeNode.isParent) {
					var param = '/p/'+treeNode['pId']+'/s/'+treeNode['id'];
					demoIframe.attr("src","<?php echo U('subedit"+param+"');?>");
					return true;
				} else {
					var param = '/p/'+treeNode['pId']+'/s/'+treeNode['id'];
					demoIframe.attr("src","<?php echo U('subedit"+param+"');?>");
					return true;
				}
			},
			beforeRemove: delTreeNode,
		}	
	};	
	var t = $("#treeDemo");//展示ZTree的Dom容器,
	$.fn.zTree.init(t, setting, zNodes);// setting  zTree 的配置数据 zNodes zTree的节点数据
	demoIframe = $("#testIframe");
	demoIframe.bind("load", loadReady);
	var zTree = $.fn.zTree.getZTreeObj('treeDemo');
	zTree.selectNode(zTree.getNodeByParam("id",'1'));
	
	function loadReady(){
			var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
			htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
			maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
			h = demoIframe.height() >= maxH ? minH:maxH ;
			if (h < 530) h = 530;
			demoIframe.height(h);
	}
	//删除节点函数
	function delTreeNode(treeId,treeNode){
		var cb = false;
        layer.confirm('确认要删除吗？',function(index){
				treeNode.id = String(treeNode.id).substr(String(treeNode.pId).length);
				//是否有子元素
				var hasChild = false;
				if(typeof treeNode.children == 'object' && treeNode.children !== "undefined"){
					hasChild= true;
				}
				if(hasChild){
					layer.alert('该节点有子节点，不能删除！'); return;
				}

				$.ajax({
						url:'<?php echo U('SPGL/del');?>',
						type:'POST',
						data:{'id':treeNode.id,'pId':treeNode.pId},
						dataType:'json',
						async:true,
						beforeSend:function(){
						},
						complete:function(){
			                
						},
						success:function(data){
							if(data == 1){
								layer.msg('已删除！',{icon: 6,time:1000});
								location.replace(location.href); 
							}else{
								layer.msg('操作失败!',{icon: 5,time:1000});
								return false;
							}
						},
						error:function(xhr,textStatus){

						}
				});
			});
        return cb;
		
	}
	var newCount = 1;
    function addHoverDom(treeId,treeNode){
    	// console.log(treeNode.getParentNode());
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='添加节点' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
        	layer.open({
				content: '当前节点【'+treeNode.name+'】'
				,btn:(treeNode.getParentNode() == null)?['添加同级节点','添加子节点']:['添加同级节点']
				,yes: function(index, layero){
					if(treeNode.getParentNode() == null){
						treeNode.pname = '顶级分类';
                        treeNode.pId = 0;
					}else{
						treeNode.pname = treeNode.getParentNode().name;	 
					}
					treeNode.id = String(treeNode.id).substr(String(treeNode.pId).length);
					demoIframe.attr("src",'pitemedit.html?pname='+treeNode.pname+'&pid='+treeNode.pId+'&id='+treeNode.id);
					layer.close(index);    
				},btn2: function(index, layero){
				    demoIframe.attr("src",'citemedit.html?pname='+treeNode.name+'&pid='+treeNode.pId+'&id='+treeNode.id);
				    layer.close(index);
				}
				,cancel: function(){ 
				    //右上角关闭回调
				}
			});
        });
    }
    function removeHoverDom(treeId,treeNode){
        $("#addBtn_"+treeNode.tId).unbind().remove();
    }
}
});
</script>
</body>
</html>