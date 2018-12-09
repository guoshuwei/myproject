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
<title>基本设置</title>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 系统管理 <span class="c-gray en">&gt;</span> 基本设置 <a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-20">
	<form action="" method="post" class="form form-horizontal" id="form-article-add">
		<div id="tab-system" class="HuiTab">
			<div class="tabBar cl"><span>推标</span><span>推订单</span><span>推投资人</span><span>其他设置</span></div>
			<div class="tabCon">
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>平台appid:：</label>
					<div class="formControls col-10">
						<input type="text" name="appid" id="website-title" placeholder="控制在25个字、50个字节以内" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>标的名称：</label>
					<div class="formControls col-10">
						<input type="text" id="website-Keywords" placeholder="5个左右,8汉字以内,用英文,隔开" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>标的loan_id:：</label>
					<div class="formControls col-10">
						<input type="text" name="loan_id" id="website-title" placeholder="控制在25个字、50个字节以内" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>标的总额：</label>
					<div class="formControls col-10">
						<input type="text" name="amount" id="website-Keywords" placeholder="5个左右,8汉字以内,用英文,隔开" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>利率：</label>
					<div class="formControls col-10">
						<input type="text" name="rate" id="website-title" placeholder="控制在25个字、50个字节以内" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>发标时间：</label>
					<div class="formControls col-10">
						<input type="text" name="release_time" id="website-Keywords" placeholder="5个左右,8汉字以内,用英文,隔开" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>还款方式：</label>
					<div class="formControls col-10">
						<input type="radio" name="pay_way" value="1" />等额本息<input type="radio" name="pay_way" value="2" />先息后本<input type="radio" name="pay_way" value="3" />到期还本息<input type="radio" name="pay_way" value="4" />等额本金<input type="radio" name="pay_way" value="5" />随存随取<br/>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>投资期限：</label>
					<div class="formControls col-10">
						<input type="text" name="period" id="website-Keywords" placeholder="5个左右,8汉字以内,用英文,隔开" value="" class="input-text">
					</div>
				</div>
					<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>投资期限单位：</label>
					<div class="formControls col-10">
						<input type="radio" name="period_type" value="1" />月<input type="radio" name="period_type" value="2" />天<br/>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>投标奖励：</label>
					<div class="formControls col-10">
						<input type="text" name="reward" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>奖励方式：</label>
					<div class="formControls col-10">
						<input type="radio" name="reward_type" value="1" />%<input type="radio" name="reward_type" value="2" />元<br/>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>项目类型：</label>
					<div class="formControls col-10">
						<select name="project_type">
					        <option value="8">其他</option>
							<option value="1">车贷</option>
							<option value="2">房贷</option>
							<option value="3">个人信用贷</option>
							<option value="4">中小企业贷</option>
							<option value="5">债权流转</option>
							<option value="6">票据抵押</option>
							<option value="7">优选理财</option>
					    </select><br/>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>保障方式：</label>
					<div class="formControls col-10">
						<select name="security_type">
					        <option value="8">其他</option>
							<option value="1">平台自有资金</option>
							<option value="2">平台风险准备金</option>
							<option value="3">银行</option>
							<option value="4">保险公司</option>
							<option value="5">小贷公司</option>
							<option value="6">融资性担保公司</option>
							<option value="7">非融资性担保公司</option>
					    </select><br/>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>利息管理费 ：</label>
					<div class="formControls col-10">
						<input type="text" name="cost" value="" /><br/>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2"><span class="c-red">*</span>标的状态：</label>
					<div class="formControls col-10">
						<select name="status">
					        <option value="5">下架</option>
							<option value="1">在投</option>
							<option value="2">还款中</option>
							<option value="3">正常还款</option>
							<option value="4">提前还款</option>
					    </select><br/>
					</div>
				</div>
			</div>
			<div class="tabCon">
				<div class="row cl">
					<label class="form-label col-2">允许访问后台的IP列表：</label>
					<div class="formControls col-10">
						<textarea class="textarea"></textarea>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2">后台登录失败最大次数：</label>
					<div class="formControls col-10">
						<input type="text" id="" value="5" class="input-text">
					</div>
				</div>
			</div>
			<div class="tabCon">
				<div class="row cl">
					<label class="form-label col-2">邮件发送模式：</label>
					<div class="formControls col-10">
						<input type="text" id="" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2">SMTP服务器：</label>
					<div class="formControls col-10">
						<input type="text" id="" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2">SMTP 端口：</label>
					<div class="formControls col-10">
						<input type="text" id="" value="25" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2">邮箱帐号：</label>
					<div class="formControls col-10">
						<input type="text" id="email-name" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2">邮箱密码：</label>
					<div class="formControls col-10">
						<input type="password" id="email-password" value="" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-2">收件邮箱地址：</label>
					<div class="formControls col-10">
						<input type="text" id="email-address" value="" class="input-text">
					</div>
				</div>
			</div>
			<div class="tabCon">
				<div class="row cl">
					<label class="form-label col-2 scheme-manager">数据库管理：</label>
					<div class="formControls col-2"> 
		                <span class="select-box">
			                <select name="tablelist" class="select">
			                	<?php if(is_array($refresh_tables)): foreach($refresh_tables as $k=>$refresh_tables): ?><option value="<?php echo ($refresh_tables); ?>"><?php echo ($k); ?></option><?php endforeach; endif; ?>
			                </select>
		                </span> 
		            </div>
				</div>
				<div class="col-10 col-offset-2 tool" style="margin-top:10px;">
					<button onClick="database_refresh(this);return false;" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe632;</i>刷新</button>
				</div>
			</div>
		</div>
		<!-- <div class="row cl">
			<div class="col-10 col-offset-2 tool">
				<button onClick="article_save_submit();" class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存</button>
				<button onClick="layer_close();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
			</div>
		</div> -->
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

<script type="text/javascript">
var current_select;
$(function(){
     console.log(current_select);
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	$.Huitab("#tab-system .tabBar span","#tab-system .tabCon","current","click","0");
});
// ajax 提交数据,刷新数据库
function database_refresh(t){
    // current_select = $(t).closest('.tabCon').index();
	$.ajax({
			url:'<?php echo U('OA/table_refresh');?>',
			type:'POST',
			data:{'table_code':$("select[name=tablelist]").val()},
			dataType:'json',
			beforeSend:function(){
			},
			complete:function(){
                
			},
			success:function(data){
				layer.confirm('确认要刷新吗？',function(index){	
					if(data == 1)
					{
						layer.msg('刷新成功!',{icon: 5,time:1000});
					}else{
						layer.msg('操作失败!',{icon: 6,time:1000});
					}
				});
			},
			error:function(xhr,textStatus){

			}
	});
	return false;
}
</script>
</body>
</html>