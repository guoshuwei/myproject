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
</head>
<body>
<div class="pd-20">
  <form class="form form-horizontal" id="form-user-add">
    <div class="row cl">
        <label class="form-label col-2"><span class="c-red">*</span>名称：</label>
        <div class="formControls col-5">
            <input type="text" class="input-text" value="<?php echo @$zjinfo[0]['name'];?>" id="item_name" name="name">
        </div>
    </div>
    <div class="row cl">
        <label class="form-label col-2"><span class="c-red">*</span>跳转地址(url)：</label>
        <div class="formControls col-5">
            <input type="text" class="input-text" value="<?php echo @$zjinfo[0]['jump_url'];?>" id="jump_url" name="jump_url">
        </div>
    </div>
    <div class="row cl">
        <label class="form-label col-2"><span class="c-red">*</span>父级分类：</label>
        <div class="formControls col-2"> 
            <span class="select-box">
                <select name="pid" class="select">
                <option value="0">顶级分类</option>
                <?php if(is_array($selectlist)): foreach($selectlist as $key=>$selectlist): ?><!-- 判断当前选中状态 -->
                    <?php if($zjinfo[0]['pid'] == $selectlist['id'] ) $sel_s = 'selected="selected"';else $sel_s = ' ';?>
                    <option <?php echo ($sel_s); ?> value="<?php echo @$selectlist['id'];?>"><?php echo ($selectlist["name"]); ?></option>
                        <?php if(is_array($selectlist["subname"])): foreach($selectlist["subname"] as $key=>$subname): ?><option value="<?php echo ($key); ?>">&nbsp;&nbsp;├<?php echo ($subname); ?></option><?php endforeach; endif; endforeach; endif; ?>   
                </select>
            </span> 
        </div>
        <label class="form-label col-1" >排序值：</label>
        <div class="formControls col-2">
            <input type="text" class="input-text" value="<?php echo ($zjinfo[0]['vsort']); ?>" placeholder="" id="vsort" name="vsort">
        </div>
    </div>
    <div class="row cl">
      <label class="form-label col-2">备注：</label>
      <div class="formControls col-5">
        <textarea name="comments" id="comments" class="textarea"  placeholder="说点什么...最少输入10个字符" datatype="*10-100" dragonfly="true" nullmsg="备注不能为空！" onKeyUp="textarealength(this,100)"><?php echo ($zjinfo[0]['comments']); ?></textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/100</p>
      </div>
      <div class="col-5"> </div>
    </div>
    <div class="row cl">
      <div class="col-9 col-offset-2">
        <?php if((isset($zjinfo[0]['id']))): ?><input class="btn btn-primary radius" onClick="item_edit(<?php echo ($zjinfo[0]['id']); ?>)" type="button" value="&nbsp;&nbsp;修改&nbsp;&nbsp;">
        <?php else: ?>
        <input class="btn btn-primary radius" onClick="item_edit(0)" type="button" value="&nbsp;&nbsp;添加&nbsp;&nbsp;"><?php endif; ?>
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

<script>
function item_edit(id){
        $.ajax({
            url:'<?php echo U('FL/item_edit');?>',
            type:'POST',
            data:{'id':id,'name':$('#item_name').val(),'jump_url':$('#jump_url').val(),'pid':$('select option:selected').val(),'vsort':$('#vsort').val(),'comments':$('#comments').val()},
            dataType:'json',
            beforeSend:function(){
                
            },
            complete:function(){
                
            },
            success:function(data){
                if(!id){
                    $mes = '确认要添加吗？' ;
                    $okmsg = "添加成功!";
                }else{
                    $mes = '确认要修改吗？' ;
                    $okmsg = "修改成功!";
                }
                layer.confirm($mes,function(index){    
                    if(data)
                    {
                        layer.msg($okmsg,{icon: 6,time:1000});
                    }else{
                        layer.msg('操作失败!',{icon: 5,time:1000});
                    }
                });
            },
            error:function(xhr,textStatus){

            }
        });
}
</script>