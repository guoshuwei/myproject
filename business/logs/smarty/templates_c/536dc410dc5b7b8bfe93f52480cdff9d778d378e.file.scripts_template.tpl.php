<?php /* Smarty version Smarty-3.1.12, created on 2018-12-08 19:17:24
         compiled from "/var/www/myproject/business/application/views/inc/scripts_template.tpl" */ ?>
<?php /*%%SmartyHeaderCode:10258813945c0ba844f02709-13689939%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '536dc410dc5b7b8bfe93f52480cdff9d778d378e' => 
    array (
      0 => '/var/www/myproject/business/application/views/inc/scripts_template.tpl',
      1 => 1544014467,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '10258813945c0ba844f02709-13689939',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.12',
  'unifunc' => 'content_5c0ba844f34d23_66264218',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5c0ba844f34d23_66264218')) {function content_5c0ba844f34d23_66264218($_smarty_tpl) {?><script type="text/template" id="viewLargerImageTpl">
    <div class="larger-image">
        <div class="larger-image-mask larger-image-pos qt-pa">&nbsp;</div>
        <div class="larger-image-wrapper larger-image-pos qt-pa">
            <div class="larger-image-btnbox qt-pa clearfix">
                <<?php ?>% if(editorfn !=0 && fl !=1){ %<?php ?>>                <a href="javascript:void(0);" class="qt-gl larger-image-btnbox-editor" title="编辑">
                    <span class="larger-image-btnbox-editorbg"></span>
                    <span class="larger-image-btnbox-txt">编辑</span>
                </a>
                <<?php ?>% } %<?php ?>>                <a href="javascript:void(0);" class="qt-gr larger-image-btnbox-close" title="关闭">
                    <span class="larger-image-btnbox-closebg"></span>
                    <span class="larger-image-btnbox-txt">关闭</span>
                </a>
                <<?php ?>% if(deletefn !=0 && fl !=1){ %<?php ?>>                <a href="javascript:void(0);" class="qt-gr larger-image-btnbox-delete" title="删除">
                    <span class="larger-image-btnbox-deletebg"></span>
                    <span class="larger-image-btnbox-txt">删除</span>
                </a>
                <<?php ?>% } %<?php ?>>            </div>
            <div class="larger-image-imgbox">
                <img src="<<?php ?>%=src%<?php ?>>" class="larger-image-imgbox-img"/>
            </div>
            <<?php ?>% if(uname != 0 || job != 0 || describe != 0){ %<?php ?>>                <div class="larger-image-txtbox qt-pa">
                    <<?php ?>% if(uname != 0){ %<?php ?>>                    <div class="larger-image-txtbox-main clearfix">
                        <span class="qt-gl larger-image-txtbox-span">姓名：</span>
                        <p class="qt-gl larger-image-txtbox-inner"><<?php ?>%=uname%<?php ?>></p>
                    </div>
                    <<?php ?>% } %<?php ?>>                    <<?php ?>% if(job != 0){ %<?php ?>>                    <div class="larger-image-txtbox-main clearfix">
                        <span class="qt-gl larger-image-txtbox-span">职务：</span>
                        <p class="qt-gl larger-image-txtbox-inner"><<?php ?>%=job%<?php ?>></p>
                    </div>
                    <<?php ?>% } %<?php ?>>                    <<?php ?>% if(describe != 0){ %<?php ?>>                    <div class="larger-image-txtbox-main clearfix">
                        <span class="qt-gl larger-image-txtbox-span">照片描述：</span>
                        <p class="qt-gl larger-image-txtbox-inner"><<?php ?>%=describe%<?php ?>></p>
                    </div>
                    <<?php ?>% } %<?php ?>>                </div>
            <<?php ?>% } %<?php ?>>        </div>
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
                            <<?php ?>% if(src){ %<?php ?>>                            <img src="<<?php ?>%=src%<?php ?>>" alt="" />
                            <<?php ?>% } %<?php ?>>                        </div>
                    </div>
                    <p class="imageadd-list-error"></p>
                </div>
            </li>
            <<?php ?>% if(uname != 0 ){ %<?php ?>>            <li class="imageadd-list clearfix qt-gl">
                <span class="imageadd-list-inst qt-gl">姓名:</span>
                <div class="imageadd-list-box qt-gl">
                    <input type="text" class="imageadd-list-box-text" data-valid="notempty" name="uname" value="<<?php ?>% if(uname != 'uname' ){ %<?php ?>><<?php ?>%=uname%<?php ?>><<?php ?>% } %<?php ?>>" />
                    <p class="imageadd-list-error"></p>
                </div>
            </li>
            <<?php ?>% } %<?php ?>>            <<?php ?>% if(job != 0 ){ %<?php ?>>            <li class="imageadd-list clearfix qt-gl">
                <span class="imageadd-list-inst qt-gl">职务:</span>
                <div class="imageadd-list-box qt-gl">
                    <input type="text" class="imageadd-list-box-text" data-valid="notempty" name="job" value="<<?php ?>% if(job != 'job' ){ %<?php ?>><<?php ?>%=job%<?php ?>><<?php ?>% } %<?php ?>>" />
                    <p class="imageadd-list-error"></p>
                </div>
            </li>
            <<?php ?>% } %<?php ?>>            <<?php ?>% if(describe != 0 ){ %<?php ?>>            <li class="imageadd-list clearfix qt-gl">
                <span class="imageadd-list-inst qt-gl">照片描述:</span>
                <div class="imageadd-list-box qt-gl">
                    <textarea class="imageadd-list-box-textarea" data-valid="notempty" name="describe"><<?php ?>% if(describe != 'describe' ){ %<?php ?>><<?php ?>%=describe%<?php ?>><<?php ?>% } %<?php ?>></textarea>
                    <p class="imageadd-list-error"></p>
                </div>
            </li>
            <<?php ?>% } %<?php ?>>            <li class="imageadd-list qt-gl">
                <div class="imageadd-list-btnbox">
                    <input type="button" value="确定" class="btn80_red imageadd-confirm" title="确定" /><input type="button" value="取消" class="btn80_red cancel" title="取消" />
                </div>
            </li>
        </ul>
    </form>
</script>


<script type="text/template" id="imageToPageTpl">
    <div class="upload-photo-box">
        <div class="upload-photo-thumbnail" title="点击放大查看图片" uname="<<?php ?>%=uname%<?php ?>>" job="<<?php ?>%=job%<?php ?>>" describe="<<?php ?>%=describe%<?php ?>>" deletefn="<<?php ?>%=deletefn%<?php ?>>" editorfn ="<<?php ?>%=editorfn%<?php ?>>">
            <img src="<<?php ?>%=src%<?php ?>>" alt="" class="upload-photo-image" />
            <span class="upload-photo-mask">&nbsp;</span>
            <span class="upload-photo-glass"></span>
            <span class="upload-photo-toviewbig">点击放大查看图片</span>
            <input type="hidden" name="<<?php ?>%=input_name%<?php ?>>" value="<<?php ?>%=src%<?php ?>>" class="image_input_name" />
            <<?php ?>% if(uname != 0){ %<?php ?>> 
            <input type="hidden" name="<<?php ?>%=username%<?php ?>>" value="<<?php ?>% if(uname != 'uname' ){ %<?php ?>><<?php ?>%=uname%<?php ?>><<?php ?>% } %<?php ?>>" class="user_input_name" />
            <<?php ?>% } %<?php ?>>            <<?php ?>% if(job != 0){ %<?php ?>> 
            <input type="hidden" name="<<?php ?>%=jobname%<?php ?>>" value="<<?php ?>% if(job != 'job' ){ %<?php ?>><<?php ?>%=job%<?php ?>><<?php ?>% } %<?php ?>>" class="job_input_name" />
            <<?php ?>% } %<?php ?>>            <<?php ?>% if(describe != 0){ %<?php ?>> 
            <input type="hidden" name="<<?php ?>%=descname%<?php ?>>" value="<<?php ?>% if(describe != 'describe' ){ %<?php ?>><<?php ?>%=describe%<?php ?>><<?php ?>% } %<?php ?>>" class="describe_input_name" />
            <<?php ?>% } %<?php ?>>        </div>
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
        <div class="upload-photo-addimg" title="点击添加图片" role="dialog" role-api="<<?php ?>%=api%<?php ?>>" max="<<?php ?>%=max%<?php ?>>" num="0">
        </div>
    </div>
</script><?php }} ?>