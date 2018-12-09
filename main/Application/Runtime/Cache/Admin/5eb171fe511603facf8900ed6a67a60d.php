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
<div class="pd-20">
	<form action="<?php echo U('MV/product_add');?>" method="post" class="form form-horizontal" id="form-article-add">
		<div class="row cl">
			<label class="form-label col-2"><span class="c-red">*</span>文章标题：</label>
			<div class="formControls col-10">
				<input type="text" class="input-text" value="" placeholder="" id="" name="article_title">
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
	                <select name="pname" class="select">
	                <option value="0">顶级分类</option>
	                <?php if(is_array($selectlist)): foreach($selectlist as $key=>$selectlist): ?><option value="<?php echo @$selectlist['id'];?>"><?php echo ($selectlist["name"]); ?>
	                    </option>
	                    <?php if($selectlist['subname']): if(is_array($selectlist["subname"])): foreach($selectlist["subname"] as $key=>$subname): ?><option value="<?php echo ($key); ?>">&nbsp;&nbsp;├<?php echo ($subname); ?></option><?php endforeach; endif; endif; endforeach; endif; ?>   
	                </select>
	            </span> 
            </div>
			<label class="form-label col-2">排序值：</label>
			<div class="formControls col-2">
				<input type="text" class="input-text" value="0" placeholder="" id="" name="vsort">
			</div>
			<label class="form-label col-2">跳转地址(url)：</label>
			<div class="formControls col-2">
				<input type="text" class="input-text" value="0" placeholder="" id="" name="jump_url">
			</div>
		</div>
		<div class="row cl">
			<label class="form-label col-2">产品关键字：</label>
			<div class="formControls col-10">
				<input type="text" name="keywords" id="" placeholder="多个关键字用英文逗号隔开，限10个关键字" value="" class="input-text">
			</div>
		</div>
        <div class="row cl">
            <label class="form-label col-2">更新时间：</label>
            <div class="formControls col-10">
                <input type="text" name="addtime"  onfocus="WdatePicker()" id="logmin" class="input-text Wdate" style="width:120px;">
            </div>
        </div>
		<!-- 图片上传 start-->
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
		<!-- 图片上传 end-->
		<div class="row cl">
			<label class="form-label col-2">详细内容：</label>
			<div class="formControls col-10"> 
				<textarea name="contents" id="editor" style="width:100%;height:400px;"></textarea>
			</div>
		</div>
		<div class="row cl">
			<div class="col-10 col-offset-2">
				<button onClick="article_save_submit();" class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交审核</button>
				<button onClick="article_save();" class="btn btn-secondary radius" type="button"><i class="Hui-iconfont">&#xe632;</i> 保存草稿</button>
				<button onClick="layer_close();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
			</div>
		</div>
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

<script type="text/javascript">
(function( $ ){
    // 当domReady的时候开始初始化
    $(function() {
    	//ueditor 初始化
    	var ue = UE.getEditor('editor');
        //WebUploader 内容
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
            thumbnailWidth = 110 * ratio,
            thumbnailHeight = 110 * ratio,

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
            } )(),

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
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
			resize: true,
            accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			},
            //配置压缩的图片的选项。如果此选项为false, 则图片在上传前不进行压缩。
	        compress:{
	            width: 1600,
	            height: 1600,

	            // 图片质量，只有type为`image/jpeg`的时候才有效。
	            quality: 90,

	            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
	            allowMagnify: false,

	            // 是否允许裁剪。
	            crop: false,

	            // 是否保留头部meta信息。
	            preserveHeaders: true,

	            // 如果发现压缩后文件大小比原来还大，则使用原来图片
	            // 此属性可能会影响图片自动纠正功能
	            noCompressIfLarger: false,

	            // 单位字节，如果图片大小小于此值，不会采用压缩。
	            compressSize: 0
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
        // console.log(uploader);
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
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
                $prgress = $li.find('p.progress span'),
                $wrap = $li.find( 'p.imgWrap' ),
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
                }, thumbnailWidth, thumbnailHeight );

                percentages[ file.id ] = [ file.size, 0 ];
                file.rotation = 0;
            }

            file.on('statuschange', function( cur, prev ) {
                if ( prev === 'progress' ) {
                    $prgress.hide().width(0);
                } else if ( prev === 'queued' ) {
                    $li.off( 'mouseenter mouseleave' );
                    $btns.remove();
                }

                // 成功
                if ( cur === 'error' || cur === 'invalid' ) {
                    console.log( file.statusText );
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
                        uploader.removeFile( file );
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
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
                    // use jquery animate to rotation
                    // $({
                    //     rotation: rotation
                    // }).animate({
                    //     rotation: file.rotation
                    // }, {
                    //     easing: 'linear',
                    //     step: function( now ) {
                    //         now = now * Math.PI / 180;

                    //         var cos = Math.cos( now ),
                    //             sin = Math.sin( now );

                    //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                    //     }
                    // });
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
        uploader.onUploadSuccess = function( file ,data) {
           //添加图片的路径
           $curr_li = $('#'+file.id);
           $curr_li.attr('data-imgname',data.imgname);
           $curr_li.attr('data-uptime',data.uptime);
           $curr_li.append('<input type="hidden" name="imglist[]" value="'+data.imgname+'">');
        };
        uploader.onUploadProgress = function( file, percentage ) {
            var $li = $('#'+file.id),
                $percent = $li.find('.progress span');

            $percent.css( 'width', percentage * 100 + '%' );
            percentages[ file.id ][ 1 ] = percentage;
            updateTotalProgress();
        };
        //添加事件方法
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