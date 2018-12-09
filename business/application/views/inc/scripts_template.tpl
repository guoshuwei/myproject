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