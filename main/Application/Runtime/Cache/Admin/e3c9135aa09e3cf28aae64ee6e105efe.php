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
<body>
<?php
 ?>
<div class="pd-20">
    <form action="<?php echo U('MV/product_edit');?>" method="post" class="form form-horizontal" id="form-article-add">
        <div class="row cl">
            <label class="form-label col-2"><span class="c-red">*</span>文章标题：</label>
            <div class="formControls col-10">
                <input type="text" class="input-text" value="<?php echo ($editlist['title']); ?>" placeholder="" id="" name="article_title">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2">简略标题：</label>
            <div class="formControls col-10">
                <input type="text" class="input-text" value="" placeholder="" id="" name="sarticle_title">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2"><span class="c-red">*</span>分类栏目：</label>
            <div class="formControls col-2"> 
                <span class="select-box">
                    <select name="pid" class="select">
                    <option value="0">顶级分类</option>
                    <?php if(is_array($selectlist)): foreach($selectlist as $key=>$selectlist): ?><option value="<?php echo @$selectlist['id'];?>"><?php echo ($selectlist["name"]); ?>
                        </option>
                            <?php if(is_array($selectlist["subname"])): foreach($selectlist["subname"] as $key=>$subname): if($editlist['pid'] == $key ) $sel_s = 'selected';else $sel_s = ' ';?>
                                    <option <?php echo ($sel_s); ?> value="<?php echo ($key); ?>">&nbsp;&nbsp;├<?php echo ($subname); ?></option><?php endforeach; endif; endforeach; endif; ?>   
                    </select>
                </span> 
            </div>
            <label class="form-label col-2">排序值：</label>
            <div class="formControls col-2">
                <input type="text" class="input-text" value="<?php echo ($editlist['vsort']); ?>" placeholder="" id="" name="vsort">
            </div>
            <label class="form-label col-2">跳转地址(url)：</label>
            <div class="formControls col-2">
                <input type="text" class="input-text" value="<?php echo ($editlist['jump_url']); ?>" placeholder="" id="" name="jump_url">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2">产品关键字：</label>
            <div class="formControls col-10">
                <input type="text" name="keywords" id="" placeholder="" value="<?php echo ($editlist['keywords']); ?>" class="input-text">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2">更新时间：</label>
            <div class="formControls col-10">
                <input type="text" name="updatetime" value="<?php echo ($editlist['updatetime']); ?>" onfocus="WdatePicker()" id="logmin" class="input-text Wdate" style="width:120px;">
            </div>
        </div>
        <?php if((!empty($editlist['picture_uplist']) && ($editlist['picture_uplist'] != 'null'))): ?><div class="row cl">
            <label class="form-label col-2">已上传图片：</label>
            <div class="formControls col-10" style="height:100px;">
        <?php  $uprootdir = '/myproject/main/Uploads/'.$editlist['picture_updata']; $complete_images = json_decode($editlist['picture_uplist'] , true); ?>
                <ul class="complete_images_list" id="ul-image-container">
                    <?php if(is_array($complete_images)): foreach($complete_images as $key=>$complete_images): ?><li style="float:left;position:relative" >
                            <p class="imgWrap" style="margin-left:10px;">
                                <img width="110" height="100" src="<?php echo ($uprootdir); ?>/<?php echo ($complete_images); ?>">
                            </p>
                            <div class="file-panel"  style="height: 0px;display:none;position:absolute;top:0px;left:10px;z-index:300;background:rgba(0,0,0,0.5)">
                                <span class="cancel" style="color:#fff;cursor:default;">删除</span>
                            </div>
                            <input type="hidden" name="imglist[]" value="<?php echo ($complete_images); ?>">

                        </li><?php endforeach; endif; ?>
                </ul>
            </div>
        </div><?php endif; ?>
        <div class="row cl">
            <label class="form-label col-2">图片上传：</label>
            <div class="formControls col-10">
                <div class="uploader-list-container"> 
                    <div class="queueList">
                        <div id="dndArea" class="placeholder">
                            <div id="filePicker-2"></div>
                            <p>或将照片拖到这里，单次最多可选300张</p>
                        </div>
                    </div>
                    <div class="statusBar" style="display:none;">
                        <div class="progress"> <span class="text">0%</span> <span class="percentage"></span> </div>
                        <div class="info"></div>
                        <div class="btns">
                            <div id="filePicker2"></div>
                            <div class="uploadBtn">开始上传</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2">详细内容：</label>
            <div class="formControls col-10">
                <textarea name="contents" id="editor" style="width:100%;height:400px;"><?php echo stripslashes($editlist['content']) ;?></textarea>
            </div>
        </div>
        <div class="row cl">
            <div class="col-10 col-offset-2">
                <button onClick="article_save_submit();" class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交审核</button>
                <button onClick="article_save();" class="btn btn-secondary radius" type="button"><i class="Hui-iconfont">&#xe632;</i> 保存草稿</button>
                <button onClick="layer_close();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
            </div>
        </div>
        <input type="hidden" name="id" value="<?php echo ($editlist['id']); ?>">
    </form>
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

<!-- 引入剪裁js插件 -->
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/cut/excanvas.js"></script>
<script type="text/javascript" src="/myproject/main/Public/Admin/lib/cut/zxx.crop_rotation.js"></script>
<!-- 图片拖拽排序 -->
<script type="" src="/myproject/main/Public/Admin/lib/cut/datouwang.js"></script>

<script type="text/javascript">
$(function(){ 
   //图片拖拽
    // var oUl= document.getElementById("ul-image-container");
    // var aLi = oUl.getElementsByTagName("li");
    // var disX = 0;
    // var disY = 0;
    // var minZindex = 1;
    // var aPos =[];
    // for(var i=0;i<aLi.length;i++){
    //     var t = aLi[i].offsetTop;
    //     var l = aLi[i].offsetLeft;
    //     aLi[i].style.top = t+"px";
    //     aLi[i].style.left = l+"px";
    //     aPos[i] = {left:l,top:t};//绝对定位 保存初始化位置
    //     aLi[i].index = i;
    // }
    // for(var i=0;i<aLi.length;i++){
    //     aLi[i].style.position = "absolute";
    //     aLi[i].style.margin = 0;
    //     setDrag(aLi[i]);//注册拖动事件
    // }
    // //拖拽
    // //拖动的步奏  鼠标移上去状态变化 ，鼠标点击时候事件(标记鼠标拖动的范围,)
    // function setDrag(obj){
    //     obj.onmouseover = function(){
    //         obj.style.cursor = "move";
    //     }
    //     obj.onmousedown = function(event){
    //         var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //         var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
    //         obj.style.zIndex = minZindex++;
    //         //当鼠标按下时计算鼠标与拖拽对象的距离(鼠标当前的位置【鼠标对象】,滚轮位置【Document对象】,元素相对偏移【Dom对象】)
    //         disX = event.clientX +scrollLeft-obj.offsetLeft;
    //         disY = event.clientY +scrollTop-obj.offsetTop;
    //         document.onmousemove=function(event){
    //             //当鼠标拖动时计算div的位置
    //             var l = event.clientX -disX +scrollLeft;
    //             var t = event.clientY -disY + scrollTop;
    //             obj.style.left = l + "px";
    //             obj.style.top = t + "px";
    //             /*for(var i=0;i<aLi.length;i++){
    //                 aLi[i].className = "";
    //                 if(obj==aLi[i])continue;//如果是自己则跳过自己不加红色虚线
    //                 if(colTest(obj,aLi[i])){
    //                     aLi[i].className = "active";
    //                 }
    //             }*/
    //             for(var i=0;i<aLi.length;i++){
    //                 aLi[i].className = "";
    //             }
    //             var oNear = findMin(obj);//查找最近的元素
    //             if(oNear){
    //                 oNear.className = "active";
    //             }
    //         }
    //         //鼠标抬起事件
    //         document.onmouseup = function(){
    //             document.onmousemove = null;//当鼠标弹起时移出移动事件
    //             document.onmouseup = null;//移出up事件，清空内存
    //             //检测是否普碰上，在交换位置
    //             var oNear = findMin(obj);
    //             if(oNear){
    //                 oNear.className = "";
    //                 oNear.style.zIndex = minZindex++;
    //                 obj.style.zIndex = minZindex++;
    //                 startMove(oNear,aPos[obj.index]);
    //                 startMove(obj,aPos[oNear.index]);
    //                 //交换index
    //                 oNear.index += obj.index;
    //                 obj.index = oNear.index - obj.index;
    //                 oNear.index = oNear.index - obj.index;
    //             }else{
    //                 startMove(obj,aPos[obj.index]);
    //                 // doSort(); //赋给排序值
    //             }
    //         }
    //         clearInterval(obj.timer);
    //         return false;//低版本出现禁止符号
    //     }
    //     obj.onmouseout = function()
    //     {
    //         doSort();
    //     }
    // }
    // //移动完成后排序 ,根据元素style 中的left 值
    // function doSort()
    // {
    //     // var slist = [];
    //     // for(var i=0;i<aLi.length;i++)
    //     // {
    //     //     slist.push({'left':parseInt($(aLi[i]).css('left'))});
    //     // }  
    //     // for(var k=0;k<slist.length-1;k++)
    //     // {
    //     //     var tmp;
    //     //     if(slist[k].left > slist[k+1].left)
    //     //     {
    //     //         tmp = slist[k].index; 
    //     //         slist[k].index = slist[k+1].index; 
    //     //         slist[k+1].index = tmp; 
    //     //     }
    //     // }
    //     // console.log(slist);
    // }
    // //碰撞检测（确定交换元素）
    // function colTest(obj1,obj2){
    //     var t1 = obj1.offsetTop;
    //     var r1 = obj1.offsetWidth+obj1.offsetLeft;
    //     var b1 = obj1.offsetHeight+obj1.offsetTop;
    //     var l1 = obj1.offsetLeft;

    //     var t2 = obj2.offsetTop;
    //     var r2 = obj2.offsetWidth+obj2.offsetLeft;
    //     var b2 = obj2.offsetHeight+obj2.offsetTop;
    //     var l2 = obj2.offsetLeft;

    //     if(t1>b2||r1<l2||b1<t2||l1>r2){
    //         return false;
    //     }else{
    //         return true;
    //     }
    // }
    // //勾股定理求距离
    // function getDis(obj1,obj2){
    //     var a = obj1.offsetLeft-obj2.offsetLeft;
    //     var b = obj1.offsetTop-obj2.offsetTop;
    //     return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
    // }
    // //找到距离最近的
    // function findMin(obj){
    //     //初始化
    //     var minDis = 999999999;
    //     var minIndex = -1;
    //     for(var i=0;i<aLi.length;i++){
    //         if(obj==aLi[i])continue; //当前元素排外
    //         if(colTest(obj,aLi[i])){
    //             var dis = getDis(obj,aLi[i]);
    //             if(dis<minDis){
    //                 minDis = dis;
    //                 minIndex = i;
    //             }
    //         }
    //     }
    //     if(minIndex==-1){
    //         return null;
    //     }else{
    //         return aLi[minIndex]; //返回查找到的最近元素对象
    //     }
    // }   
    var ue = UE.getEditor('editor');
    //删除图片
    $.each($('.complete_images_list li'),function(){
        $(this).on('mouseover',function(){
            $(this).find('.file-panel').height(30).width('91%').show();
        }).on('mouseout',function(){
            $(this).find('.file-panel').height(0).width('91%').hide();
        }).on('click',function(){
            $(this).remove();
        })
    })
});

(function( $ ){
    // 当domReady的时候开始初始化
    $(function() {
        var $wrap = $('.uploader-list-container'),

            // 图片容器
            $queue = $( '<ul class="filelist"></ul>' )
                .appendTo( $wrap.find( '.queueList' ) ),

            // 状态栏，包括进度和控制按钮
            $statusBar = $wrap.find( '.statusBar' ),

            // 文件总体选择信息。
            $info = $statusBar.find( '.info' ),

            // 上传按钮
            $upload = $wrap.find( '.uploadBtn' ),

            // 没选择文件之前的内容。
            $placeHolder = $wrap.find( '.placeholder' ),

            $progress = $statusBar.find( '.progress' ).hide(),

            // 添加的文件数量
            fileCount = 0,

            // 添加的文件总大小
            fileSize = 0,

            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,

            // 缩略图大小
            // thumbnailWidth = 110 * ratio,
            // thumbnailHeight = 110 * ratio,

            // 可能有pedding, ready, uploading, confirm, done.
            state = 'pedding',

            // 所有文件的进度信息，key为file id
            percentages = {},
            // 判断浏览器是否支持图片的base64
            isSupportBase64 = ( function() {
                var data = new Image();
                var support = true;
                data.onload = data.onerror = function() {
                    if( this.width != 1 || this.height != 1 ) {
                        support = false;
                    }
                }
                data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                return support;
            })(),
            supportTransition = (function(){
                var s = document.createElement('p').style,
                    r = 'transition' in s ||
                            'WebkitTransition' in s ||
                            'MozTransition' in s ||
                            'msTransition' in s ||
                            'OTransition' in s;
                s = null;
                return r;
            })(),

            // WebUploader实例
            uploader;

        // 实例化
        uploader = WebUploader.create({
            pick: {
                id: '#filePicker-2',
                label: '点击选择图片'
            },
            formData: {
                uid: 123
            },
            thumb:{
                width: 110,
                height: 110,

                // 图片质量，只有type为`image/jpeg`的时候才有效。
                quality: 70,

                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: true,

                // 是否允许裁剪。
                crop: true
            },
            dnd: '#dndArea',
            paste: '#uploader',
            chunked: false,
            chunkSize: 512 * 1024,
            server: '<?php echo U('MV/fileupload');?>',

            // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
            disableGlobalDnd: true,
            fileNumLimit: 300,
            fileSizeLimit: 200 * 1024 * 1024,    // 200 M
            fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
        });

        // 拖拽时不接受 js, txt 文件。
        uploader.on( 'dndAccept', function( items ) {
            var denied = false,
                len = items.length,
                i = 0,
                // 修改js类型
                unAllowed = 'text/plain;application/javascript ';

            for ( ; i < len; i++ ) {
                // 如果在列表里面
                if ( ~unAllowed.indexOf( items[ i ].type ) ) {
                    denied = true;
                    break;
                }
            }

            return !denied;
        });

        uploader.on('dialogOpen', function() {
            console.log('here');
        });
        // 添加“添加文件”的按钮，
        uploader.addButton({
            id: '#filePicker2',
            label: '继续添加'
        });

        uploader.on('ready', function() {
            window.uploader = uploader;
        });

        // 当有文件添加进来时执行，负责view的创建
        function addFile( file ) {
            var $li = $( '<li id="' + file.id + '">' +
                    '<p class="title">' + file.name + '</p>' +
                    '<p class="imgWrap"></p>'+
                    '<p class="progress"><span></span></p>' +
                    '</li>' ),
                $btns = $('<div class="file-panel">' +
                    '<span onclick="">裁剪</span>' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
                $prgress = $li.find('p.progress span'),
                $wrap = $li.find('p.imgWrap' ),
                $info = $('<p class="error"></p>'),

                showError = function( code ) {
                    switch( code ) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;

                        case 'interrupt':
                            text = '上传暂停';
                            break;

                        default:
                            text = '上传失败，请重试';
                            break;
                    }

                    $info.text( text ).appendTo( $li );
                };
            if ( file.getStatus() === 'invalid' ) {
                showError( file.statusText );
            } else {
                // @todo lazyload
                $wrap.text( '预览中' );
                uploader.makeThumb( file, function( error, src ) {
                    var img;

                    if ( error ) {
                        $wrap.text( '不能预览' );
                        return;
                    }

                    if( isSupportBase64 ) {
                        img = $('<img src="'+src+'">');
                        $wrap.empty().append( img );
                    } else {
                        $.ajax('<?php echo U('MV/preview');?>', {
                            method: 'POST',
                            data: src,
                            dataType:'json'
                        }).done(function( response ) {
                            if (response.result) {
                                img = $('<img src="'+response.result+'">');
                                $wrap.empty().append( img );
                            } else {
                                $wrap.text("预览出错");
                            }
                        });
                    }
                });

                percentages[ file.id ] = [ file.size, 0 ];
                file.rotation = 0;
            }
            //状态改变 
            file.on('statuschange', function( cur, prev ) {
                if ( prev === 'progress' ) {
                    $prgress.hide().width(0);
                } else if ( prev === 'queued' ) {
                    $li.off( 'mouseenter mouseleave' );
                    $btns.remove();
                }

                // 成功
                if ( cur === 'error' || cur === 'invalid' ) {
                    showError( file.statusText );
                    percentages[ file.id ][ 1 ] = 1;
                } else if ( cur === 'interrupt' ) {
                    showError( 'interrupt' );
                } else if ( cur === 'queued' ) {
                    percentages[ file.id ][ 1 ] = 0;
                } else if ( cur === 'progress' ) {
                    $info.remove();
                    $prgress.css('display', 'block');
                } else if ( cur === 'complete' ) {
                    $li.append( '<span class="success"></span>' );
                }

                $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
            });

            $li.on( 'mouseenter', function() {
                $btns.stop().animate({height: 30});
            });

            $li.on( 'mouseleave', function() {
                $btns.stop().animate({height: 0});
            });

            $btns.on( 'click', 'span', function() {
                var index = $(this).index(),
                    deg;
                switch ( index ) {
                    case 0:
                        // uploader.crop( file );
                        return;
                    case 1:
                        uploader.removeFile( file );
                        return;

                    case 2:
                        file.rotation += 90;
                        break;

                    case 3:
                        file.rotation -= 90;
                        break;
                }

                if ( supportTransition ) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    $wrap.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                }


            });

            $li.appendTo( $queue );
        }

        // 负责view的销毁
        function removeFile( file ) {
            var $li = $('#'+file.id);

            delete percentages[ file.id ];
            updateTotalProgress();
            $li.off().find('.file-panel').off().end().remove();
        }
        //裁剪跳转新页
        // function picture_crop(title){
        //     alert(1);
        //     // var url = '<?php echo U('MV/picture_crop');?>';
        //     // var index = layer.open({
        //     //     type: 2,
        //     //     title: title,
        //     //     content: url
        //     // });
        //     // layer.full(index);
        // }
        //放大
        function manify(file)
        {
            alert(1);
            // var $li = $('#'+file.id);

            // fullscreen(t);
        }
        function fullscreen(t){
            var runPrefixMethod = function(element, method) {
            var usablePrefixMethod;
            ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
                if (usablePrefixMethod) return;
                if (prefix === "") {
                // 无前缀，方法首字母小写
                 method = method.slice(0,1).toLowerCase() +  method.slice(1);
                
            }  
            var typePrefixMethod = typeof element[prefix + method];
            if (typePrefixMethod + "" !== "undefined") {
                if (typePrefixMethod === "function") {
                 usablePrefixMethod = element[prefix + method]();
                } else {
                 usablePrefixMethod = element[prefix + method];
                }
            }
           });
            
           return usablePrefixMethod;
        };
        if (typeof window.screenX === "number") {
                if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")){
                       runPrefixMethod(document, "CancelFullScreen");
                }else if(runPrefixMethod(t, "RequestFullScreen")) {

                }
            } 
        }
        function updateTotalProgress() {
            var loaded = 0,
                total = 0,
                spans = $progress.children(),
                percent;

            $.each( percentages, function( k, v ) {
                total += v[ 0 ];
                loaded += v[ 0 ] * v[ 1 ];
            } );

            percent = total ? loaded / total : 0;


            spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
            spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
            updateStatus();
        }

        function updateStatus() {
            var text = '', stats;

            if ( state === 'ready' ) {
                text = '选中' + fileCount + '张图片，共' +
                        WebUploader.formatSize( fileSize ) + '。';
            } else if ( state === 'confirm' ) {
                stats = uploader.getStats();
                if ( stats.uploadFailNum ) {
                    text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                        stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                }

            } else {
                stats = uploader.getStats();
                text = '共' + fileCount + '张（' +
                        WebUploader.formatSize( fileSize )  +
                        '），已上传' + stats.successNum + '张';

                if ( stats.uploadFailNum ) {
                    text += '，失败' + stats.uploadFailNum + '张';
                }
            }

            $info.html( text );
        }

        function setState( val ) {
            var file, stats;

            if ( val === state ) {
                return;
            }

            $upload.removeClass( 'state-' + state );
            $upload.addClass( 'state-' + val );
            state = val;

            switch ( state ) {
                case 'pedding':
                    $placeHolder.removeClass( 'element-invisible' );
                    $queue.hide();
                    $statusBar.addClass( 'element-invisible' );
                    uploader.refresh();
                    break;

                case 'ready':
                    $placeHolder.addClass( 'element-invisible' );
                    $( '#filePicker2' ).removeClass( 'element-invisible');
                    $queue.show();
                    $statusBar.removeClass('element-invisible');
                    uploader.refresh();
                    break;

                case 'uploading':
                    $( '#filePicker2' ).addClass( 'element-invisible' );
                    $progress.show();
                    $upload.text( '暂停上传' );
                    break;

                case 'paused':
                    $progress.show();
                    $upload.text( '继续上传' );
                    break;

                case 'confirm':
                    $progress.hide();
                    $( '#filePicker2' ).removeClass( 'element-invisible' );
                    $upload.text( '开始上传' );

                    stats = uploader.getStats();
                    if ( stats.successNum && !stats.uploadFailNum ) {
                        setState( 'finish' );
                        return;
                    }
                    break;
                case 'finish':
                    stats = uploader.getStats();
                    if ( stats.successNum ) {
                        alert( '上传成功' );
                    } else {
                        // 没有成功的图片，重设
                        state = 'done';
                        location.reload();
                    }
                    break;
            }

            updateStatus();
        }

        uploader.onUploadProgress = function( file, percentage ) {
            var $li = $('#'+file.id),
                $percent = $li.find('.progress span');

            $percent.css( 'width', percentage * 100 + '%' );
            percentages[ file.id ][ 1 ] = percentage;
            updateTotalProgress();
        };

        uploader.onFileQueued = function( file ) {
            fileCount++;
            fileSize += file.size;

            if ( fileCount === 1 ) {
                $placeHolder.addClass( 'element-invisible' );
                $statusBar.show();
            }

            addFile( file );
            setState( 'ready' );
            updateTotalProgress();
        };

        uploader.onFileDequeued = function( file ) {
            fileCount--;
            fileSize -= file.size;

            if ( !fileCount ) {
                setState( 'pedding' );
            }

            removeFile( file );
            updateTotalProgress();

        };

        uploader.on( 'all', function( type ) {
            var stats;
            switch( type ) {
                case 'uploadFinished':
                    setState( 'confirm' );
                    break;

                case 'startUpload':
                    setState( 'uploading' );
                    break;

                case 'stopUpload':
                    setState( 'paused' );
                    break;

            }
        });
        //成功上传回调函数
        uploader.onUploadSuccess = function( file ,data) {
           //添加图片的路径
           $curr_li = $('#'+file.id);
           $curr_li.attr('data-imgname',data.imgname);
           $curr_li.attr('data-uptime',data.uptime);
           $curr_li.append('<input type="hidden" name="imglist[]" value="'+data.imgname+'">');
        };
        uploader.onError = function( code ) {
            alert( 'Eroor: ' + code );
        };

        $upload.on('click', function() {
            if ( $(this).hasClass( 'disabled' ) ) {
                return false;
            }

            if ( state === 'ready' ) {
                uploader.upload();
            } else if ( state === 'paused' ) {
                uploader.upload();
            } else if ( state === 'uploading' ) {
                uploader.stop();
            }
        });

        $info.on( 'click', '.retry', function() {
            uploader.retry();
        } );

        $info.on( 'click', '.ignore', function() {
            alert( 'todo' );
        } );

        $upload.addClass( 'state-' + state );
        updateTotalProgress();
    });

})( jQuery );
</script>
</body>
</html>