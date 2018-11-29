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
<title>信息审核</title>
<style>
.til_email {
    padding: 60px 0 30px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    color: #666;
}
.til_email h4 {
    font-weight: normal;
}
.icon_email {
    display: inline-block;
    margin: 0 15px;
    margin-top: -3px;
    width: 24px;
    height: 28px;
    vertical-align: middle;
    background-position: -74px 0;
}
.icon {
    background: url(../../images/aut_icon.png) no-repeat 0 0;
}
i {
    font-style: normal;
}
.select{
    float:left;
}
.upload-photo-box {
    float: left;
    width: 120px;
    height: 120px;
    margin-right: 30px;
    cursor: pointer;
    margin-bottom: 20px;
    padding-top:10px;
}
.upload-photo-addimg {
    width: 120px;
    height: 120px;
    background: url(/myproject/main/Public/Admin/images/ptdatybg.png) 0 0 no-repeat;
}
</style>
</head>
<body>
<div class="til_email">
    <h4><i class="icon icon_email"></i>企业信息审核</h4>
</div>
<div class="pd-20">
    <form action="<?php echo U('UL/picture_edit');?>" method="post" class="form form-horizontal" id="form-article-add">
        <div class="row cl">
            <label class="form-label col-2"><span class="c-red">*</span>名称：(企业/个人)</label>
            <div class="formControls col-5">
                <input type="text" class="input-text" value="<?php echo ($picinfo['title']); ?>" placeholder="" name="title">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2">经营范围：</label>
            <div class="formControls col-2"> 
                <span class="select-box">
                    <select name="column" class="select">
                        <option value="0">请选择</option>
                        <option value="1">养殖</option>
                        <option value="2">农产品</option>
                        <option value="3">租赁</option>
                        <option value="4">杂项</option>  
                    </select>
                </span> 
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2"><span class="c-red">*</span>地址：</label>
            <div class="formControls col-2 div-residecity"> 
                <span class="select-box">
                    <?php echo ($residecity_component); ?>
                </span> 
            </div>
        <div class="row cl">
            <label class="form-label col-2">上传照片：</label>
            <div class="formControls col-5">
                <div class="upload-photo-box">
                    <div class="upload-photo-addimg" title="点击添加图片" role="dialog" role-api="addOrEditor|add,data[ptimg123][],0,0,0,editorfn,deletefn,,data[pdesc][]" num="2" max="infinite">
                    </div>
                </div>    
               <span class="c-red">
                上传营业执照、税务登记证、组织机构代码证或三证合一扫描 件，并在上加盖公章且手写申请日期。</span>
            </div>
        </div>


  <!--       <div class="upload-photo">
            <div class="clearfix">
                <div class="upload-photo-box">
                    <div class="upload-photo-addimg" title="上传盖章授权公函" role="dialog" role-api="addOrEditor|add,data[authorizationletter],0,0,0,editorfn,deletefn" num="0" max="1">
                    </div>
                </div>
                <div class="upload-text-box"><a href="/uploads/authorizationletter.docx" class="upload-text-download" title="授权公函模板下载">授权公函模板下载</a></div>
            </div>
             <div class="upload-photo-explain">请先下载授权公函，填好后盖章,再上传授权公函。 </div>
        </div> -->
        <div class="row cl">
            <label class="form-label col-2">授权公函：</label>
            <div class="formControls col-5">
                <input type="text" class="input-text" value="0" placeholder="" id="" name="keywords"><span class="c-red">请先下载授权公函，填好后盖章,再上传授权公函。</span>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2">实名信息：</label>
            <div class="formControls col-5">
                <span style="display:inline-block;font-size: 14px;height: 31px;line-height: 1.42857;padding: 4px;">郭书伟&nbsp;&nbsp;140****2910</span><a href="">去实名认证</a>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2">企业描述：</label>
            <div class="formControls col-10">
                <textarea name="description" cols="" rows="" class="textarea"  placeholder="说点什么...最少输入10个字符" datatype="*10-100" dragonfly="true" nullmsg="备注不能为空！" onKeyUp="textarealength(this,200)"></textarea>
                <p class="textarea-numberbar"><em class="textarea-length">0</em>/200</p>
            </div>
        </div>
        <div class="row cl">
            <div class="col-10 col-offset-2">
                <button class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交审核</button>
            </div>
        </div>
    </form>
</div>
</div>
<script type="text/template" id="viewLargerImageTpl">
    <div class="larger-image">
        <div class="larger-image-mask larger-image-pos qt-pa">&nbsp;</div>
        <div class="larger-image-wrapper larger-image-pos qt-pa">
            <div class="larger-image-btnbox qt-pa clearfix">
                <% if(editorfn !=0 && fl !=1){ %>                <a href="javascript:void(0);" class="qt-gl larger-image-btnbox-editor" title="编辑">
                    <span class="larger-image-btnbox-editorbg"></span>
                    <span class="larger-image-btnbox-txt">编辑</span>
                </a>
                <% } %>                <a href="javascript:void(0);" class="qt-gr larger-image-btnbox-close" title="关闭">
                    <span class="larger-image-btnbox-closebg"></span>
                    <span class="larger-image-btnbox-txt">关闭</span>
                </a>
                <% if(deletefn !=0 && fl !=1){ %>                <a href="javascript:void(0);" class="qt-gr larger-image-btnbox-delete" title="删除">
                    <span class="larger-image-btnbox-deletebg"></span>
                    <span class="larger-image-btnbox-txt">删除</span>
                </a>
                <% } %>            </div>
            <div class="larger-image-imgbox">
                <img src="<%=src%>" class="larger-image-imgbox-img"/>
            </div>
            <% if(uname != 0 || job != 0 || describe != 0){ %>                <div class="larger-image-txtbox qt-pa">
                    <% if(uname != 0){ %>                    <div class="larger-image-txtbox-main clearfix">
                        <span class="qt-gl larger-image-txtbox-span">姓名：</span>
                        <p class="qt-gl larger-image-txtbox-inner"><%=uname%></p>
                    </div>
                    <% } %>                    <% if(job != 0){ %>                    <div class="larger-image-txtbox-main clearfix">
                        <span class="qt-gl larger-image-txtbox-span">职务：</span>
                        <p class="qt-gl larger-image-txtbox-inner"><%=job%></p>
                    </div>
                    <% } %>                    <% if(describe != 0){ %>                    <div class="larger-image-txtbox-main clearfix">
                        <span class="qt-gl larger-image-txtbox-span">照片描述：</span>
                        <p class="qt-gl larger-image-txtbox-inner"><%=describe%></p>
                    </div>
                    <% } %>                </div>
            <% } %>        </div>
    </div>
</script>


<script type="text/template" id="addOrEditorImageTpl">
    <form action="/abc/abcd" method="post" role="ajaxfrom" class="imageadd">
        <ul class="imageadd-ulist clearfix">
            <li class="imageadd-list clearfix qt-gl">
                <span class="imageadd-list-inst qt-gl">上传照片:</span>
                <div class="imageadd-list-box qt-gl">
                    <div class="imageadd-file">
                        <div class="imageadd-file-choose">选择文件</div>
                        <div class="imageadd-file-preview">
                            <% if(src){ %>                            <img src="<%=src%>" alt="" />
                            <% } %>                        </div>
                    </div>
                    <p class="imageadd-list-error"></p>
                </div>
            </li>
            <% if(uname != 0 ){ %>            <li class="imageadd-list clearfix qt-gl">
                <span class="imageadd-list-inst qt-gl">姓名:</span>
                <div class="imageadd-list-box qt-gl">
                    <input type="text" class="imageadd-list-box-text" data-valid="notempty" name="uname" value="<% if(uname != 'uname' ){ %><%=uname%><% } %>" />
                    <p class="imageadd-list-error"></p>
                </div>
            </li>
            <% } %>            <% if(job != 0 ){ %>            <li class="imageadd-list clearfix qt-gl">
                <span class="imageadd-list-inst qt-gl">职务:</span>
                <div class="imageadd-list-box qt-gl">
                    <input type="text" class="imageadd-list-box-text" data-valid="notempty" name="job" value="<% if(job != 'job' ){ %><%=job%><% } %>" />
                    <p class="imageadd-list-error"></p>
                </div>
            </li>
            <% } %>            <% if(describe != 0 ){ %>            <li class="imageadd-list clearfix qt-gl">
                <span class="imageadd-list-inst qt-gl">照片描述:</span>
                <div class="imageadd-list-box qt-gl">
                    <textarea class="imageadd-list-box-textarea" data-valid="notempty" name="describe"><% if(describe != 'describe' ){ %><%=describe%><% } %></textarea>
                    <p class="imageadd-list-error"></p>
                </div>
            </li>
            <% } %>            <li class="imageadd-list qt-gl">
                <div class="imageadd-list-btnbox">
                    <input type="button" value="确定" class="btn80_red imageadd-confirm" title="确定" /><input type="button" value="取消" class="btn80_red cancel" title="取消" />
                </div>
            </li>
        </ul>
    </form>
</script>

<script type="text/template" id="imageToPageTpl">
    <div class="upload-photo-box">
        <div class="upload-photo-thumbnail" title="点击放大查看图片" uname="<%=uname%>" job="<%=job%>" describe="<%=describe%>" deletefn="<%=deletefn%>" editorfn ="<%=editorfn%>">
            <img src="<%=src%>" alt="" class="upload-photo-image" />
            <span class="upload-photo-mask">&nbsp;</span>
            <span class="upload-photo-glass"></span>
            <span class="upload-photo-toviewbig">点击放大查看图片</span>
            <input type="hidden" name="<%=input_name%>" value="<%=src%>" class="image_input_name" />
            <% if(uname != 0){ %> 
            <input type="hidden" name="<%=username%>" value="<% if(uname != 'uname' ){ %><%=uname%><% } %>" class="user_input_name" />
            <% } %>            <% if(job != 0){ %> 
            <input type="hidden" name="<%=jobname%>" value="<% if(job != 'job' ){ %><%=job%><% } %>" class="job_input_name" />
            <% } %>            <% if(describe != 0){ %> 
            <input type="hidden" name="<%=descname%>" value="<% if(describe != 'describe' ){ %><%=describe%><% } %>" class="describe_input_name" />
            <% } %>        </div>
        <input type="hidden" value=""
        role="dialog" editor="addOrEditor" delete="deleteImage" />
    </div>
</script>

<script type="text/template" id="deleteImageTpl">
    <form action="" class="imagedelete">
        <p class="imagedelete-ask">你确定要删除当前照片及描述？</p>
        <div class="imagedelete-btnbox">
            <input type="button" value="确定" class="btn80_red imageadd-confirm" title="确定" /><input type="button" value="取消" class="btn80_red cancel" title="取消" />
        </div>
    </form>
</script>

<script type="text/template" id="upImageBtnTpl">
    <div class="upload-photo-box">
        <div class="upload-photo-addimg" title="点击添加图片" role="dialog" role-api="<%=api%>" max="<%=max%>" num="0">
        </div>
    </div>
</script>
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
    var ue = UE.getEditor('editor');

});
  window.showdistrict = function (container, elems, totallevel, changelevel, containertype) {
        var resideprovince = $('#resideprovince option:selected').attr('did');
        var residecity = $('#residecity option:selected').attr('did');
        var residedist = $('#residedist option:selected').attr('did');
        var residecommunity = $('#residecommunity option:selected').attr('did'); 
        if(residecity==undefined){
            residecity=''
        }
        if(residedist==undefined){
            residedist=''
        }
        if(residecommunity==undefined){
            residecommunity=''
        }
        var url = "container="+container+"&containertype="+containertype
          +"&province="+elems[0]+"&city="+elems[1]+"&district="+elems[2]+"&community="+elems[3]
      +"&pid="+resideprovince + "&cid="+residecity+"&did="+residedist+"&coid="+residecommunity+"&level="+totallevel+'&handlekey='+container+'&inajax=1'+(!changelevel ? '&showdefault=1' : '')

        $.ajax({
            url: 'ajaxGetDistrict',
            data: url,
            dataType: "json",
            type: "POST",
            traditional: true,
            success: function (res) {
                // alert(12345);
                if (res.code == 200) {
                    var district = res.data.district;
                    $('.div-residecity').html(district);
                }
            }
        })
    }
</script>
<script type="text/javascript" src="/js/libs/webuploader/webuploader.js"></script>
<script type="text/javascript" src="/scripts/pc/companycertification_com.js?" init="pc/companycertification"></script>
</body>
</html>