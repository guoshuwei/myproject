var dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    BASE_URL = '/../../static/libs/webuploader',
    viewImage = require('../modules/viewLargerImage'), //查看大图
    deleteImageDialog, //删除图片对话框
    addOrEditorImageDialog; //添加或编辑图片对话框

/*
参数 请注意：如果需要新增参数，请按顺序增加在后面，前面参数的顺序已写好不能改变，不能改变，不能改变。
role-api="addOrEditor|add(editor),input_name,uname,job,describe,editorFn,deleteFn,src,descname,username,jobname,fl" 
operate 操作：add(editor)
input_name 		//需要传到后的图片input的name
uname 			//姓名-如果不需要写0
job 			//职务-如果不需要写0
describe 		//照片描述-如果不需要写0
editorfn 		//编辑功能-如果不需要写0
deletefn 		//删除功能-如果不需要写0
src				//图片路径-如果没有空着
descname		//需要传到后的图片的描述input的name-如果没有空着
username		//需要传到后的图片的高管名字input的name-如果没有空着
jobname			//需要传到后的图片的高管职务input的name-如果没有空着
fl              //新增的有关返利的
属性
max="infinite" //数字代表可以上传的最大个数 infinite不限
num="1" //当前的
*/
dialogUi.listen('addOrEditor',function(operate,input_name,uname,job,describe,editorfn,deletefn,src,descname,username,jobname,fl){
    addOrEditorImageDialog = this;
    var that = this,
    	title = '',
    	content = '',
    	data = {},
    	height = 325;

    data.input_name = input_name;
    data.uname = uname;
    data.job = job;
    data.describe = describe;
    data.editorfn = editorfn;
    data.deletefn = deletefn;
    data.src = src;
    data.descname = descname;
    data.username = username;
    data.jobname = jobname;
    data.fl = fl;

    if(operate == 'add'){
    	title = '上传图片'; 
    }else if(operate == 'editor'){
    	data.src =src;
    	title = '编辑图片'; 
    }
    content = template.render('addOrEditorImageTpl',data); 

    if(data.uname != 0){ height+=60;}
    if(data.job != 0){ height+=60; }
    if(data.describe != 0){ height+=90; }

    that.showLightbox = true;
    that.setBox(500,height);
    that.setPos('absolute');
    that.setTitle(title);
    that.setContent(content);
    that.setSkin('dialog1');
    that.open();

    var parents = that.contentTarget,
        confirmBtn = parents.find('.imageadd-confirm');
     	
    if(operate == 'add'){
    	var maxNum = parseInt(that.event_source.attr('max')),
			num = parseInt(that.event_source.attr('num'));
    	data.maxNum = maxNum;
    	data.num = num;
    }
    
    toUploadPictures('.imageadd-file-choose',input_name);

    confirmBtn.click(function(){ 
    	var img = parents.find('img');
    
    	if(operate == 'add'){
    		if(data.uname !=0){ data.uname = parents.find('input[name="uname"]').val(); }
    		if(data.job !=0){ data.job = parents.find('input[name="job"]').val(); }
    		if(data.describe !=0){ data.describe = parents.find('textarea[name="describe"]').val(); }
    		
    		if(img.length > 0){
    			data.src =img.attr('src');
    			
    			addImage(that.event_source,data);
    		}else{
    			parents.find('.imageadd-list-error').eq(0).html('请选择图片');
    		}
	    	
	    }else if(operate == 'editor'){
	    	var editorData = {};
	    	editorData.src = img.attr('src');
	    	editorData.uname = parents.find('input[name="uname"]').val();
	    	editorData.job = parents.find('input[name="job"]').val();
	    	editorData.describe = parents.find('textarea[name="describe"]').val();
	    	editorImage(that.event_source,data,editorData);
	    }
    });
});

function editorImage(event_source,data,editorData){

    if(data.src == editorData.src && data.uname == editorData.uname && data.job == editorData.job && data.describe == editorData.describe){
        addOrEditorImageDialog.close();
    }else{
        var pageParent = event_source.parent().find('.upload-photo-thumbnail'),
            pageImage = pageParent.find('img'),
            imageInput = pageParent.find('.image_input_name');
            userInput = pageParent.find('.user_input_name');
            jobInput = pageParent.find('.job_input_name');
            describeInput = pageParent.find('.describe_input_name');

        pageImage.attr({'src': editorData.src});
        imageInput.attr({'value': editorData.src});
        userInput.attr({'value': editorData.uname});
        jobInput.attr({'value': editorData.job});
        describeInput.attr({'value': editorData.describe});
        pageParent.attr({'uname': editorData.uname});
        pageParent.attr({'job': editorData.job});
        pageParent.attr({'describe': editorData.describe});
        pageParent.attr({'deletefn': data.deletefn});
        pageParent.attr({'editorfn': data.editorfn});
        pageParent.attr({'fl': data.fl});

        addOrEditorImageDialog.close();
    }
}

function addImage(event_source,data){
	var sourceParent = event_source.parent(),
		nowNum;
	
	nowNum = data.num+1;
    var insertImgDom = template.render('imageToPageTpl',data);
    sourceParent.before(insertImgDom);
    event_source.attr({'num':nowNum});

    if(nowNum == data.maxNum){
        sourceParent.hide();
    }
    var uploadimageInput = sourceParent.parent().find('input[name="data[uploadimage]"]');
    if(uploadimageInput.length){
        uploadimageInput.val('ok');
    }
    addOrEditorImageDialog.close();
}

//删除图片对话框
dialogUi.listen('deleteImage',function(){ 
    deleteImageDialog = this;
    var that = this,
        title = '删除图片',
        content = template.render('deleteImageTpl');
    
    this.showLightbox = true;
    this.setBox(400,220);
    this.setPos('absolute');
    this.setTitle(title);
    this.setContent(content);
    this.setSkin('dialog1');
    this.open();

    var parents = this.contentTarget,
        confirmBtn = parents.find('.imageadd-confirm');
    confirmBtn.click(function(){ //删除确定按钮
        var pageParent = that.event_source.parent(),
        	pageParents = pageParent.parent(),
        	uploadDom = pageParents.find('.upload-photo-addimg');
        	

    	if(uploadDom.length){
    		var num = parseInt(uploadDom.attr('num'));
    		uploadDom.attr({ 'num' : num-1 });
	        
	        if(num-1 == 0){
	        	uploadDom.parent().show();
	        }
    	}else{
    		var data = {},
    		    uploadDom;
    		
    		data.api = that.event_source.attr('add-api');
    		data.max = that.event_source.attr('max');
    		uploadDom = template.render('upImageBtnTpl',data);
    		pageParents.append(uploadDom);
    	}
    	pageParent.remove();
        deleteImageDialog.close();
    });
});

/* 上传图片start */

function toUploadPictures (btnClassName,input_name){
    var witch = '';
    if(input_name == 'data[logo]'){
        witch = 'logo';
    }else if(input_name == 'data[icon]'){
        witch = 'icon';
    }

    var curProtocol = window.location.protocol.split(':')[0];
    
    var uploader= WebUploader.create({
        auto: true,
        swf: BASE_URL + '/Uploader.swf',
        server: '/myproject/business/uploadeimg',
        pick: btnClassName,
        duplicate:true,
        formData: {  
            witch: witch  
        }  
    });
    uploader.on( 'uploadAccept', function( file, response ) {
    	var parents = $(btnClassName).parent();
    	var errorEle = parents.parent().find('.imageadd-list-error').eq(0);
    	var containerEle = parents.find('.imageadd-file-preview');

        var obj = parents.find('.input input[type=hidden]');

        if(obj.length>0){
            obj.val(response.file);
        }else{
            parents.append('<input type="hidden" name="'+input_name+'" value="'+response.file+'" />');
        }

        if(response.code != 200){
            errorEle.html(response.data);
            return;
        }else{
            var img = containerEle.find('img');

            if(img.length > 0){
                img.attr({'src': response.data.url});
            }else{
                $('<img />', {
                    src: response.data.url
                }).appendTo(containerEle);
            }
            
            errorEle.html(response.data);
        }

    });
}
/* 上传图片end */

//查看大图移入移出
exports.showThumbnailMask = function (obj,num){
	var spanMask = obj.find('.upload-photo-mask');
    var spanGlass = obj.find('.upload-photo-glass');
    if(num == 1){   //查看大图移入
        spanMask.css({'height': '120'});
        spanGlass.show();
    }else if(num == 0){ //查看大图移出
        spanMask.css({'height': '20'});
        spanGlass.hide();
    }
}
exports.viewLargerImage = function (obj){
	var data = {};
    var str = '';
    var dialogInput = obj.parent().find('input[role="dialog"]')
    data.event_source = obj;
    data.src = obj.find('img').attr('src');
    if(obj.attr('uname')){
        data.uname = obj.attr('uname');
    }else{
        data.uname = '&nbsp;';
    }
    if(obj.attr('job')){
        data.job = obj.attr('job');
    }else{
        data.job = '&nbsp;';
    }
    if(obj.attr('describe')){
        data.describe = obj.attr('describe');
    }else{
        data.describe = '&nbsp;';
    }
    data.editorfn = obj.attr('editorfn');
    data.fl = obj.attr('fl');
    data.deletefn = obj.attr('deletefn');
    data.input_name = obj.find('.image_input_name').attr('name');

    if(obj.find('.describe_input_name').length){
        data.descname = obj.find('.describe_input_name').attr('name');
    }else{
        data.descname = '0';
    }
    if(obj.find('.user_input_name').length){
        data.username = obj.find('.user_input_name').attr('name');
    }else{
        data.username = '0';
    }
    if(obj.find('.job_input_name').length){
       data.jobname = obj.find('.job_input_name').attr('name'); 
    }else{
        data.jobname = '0';
    }
    str += data.input_name+',';
    str += data.uname+',';
    str += data.job+',';
    str += data.describe+',';
    str += data.editorfn+',';
    str += data.deletefn+',';
    str += data.src+',';
    str += data.descname+',';
    str += data.username+',';
    str += data.jobname+',';
    str += data.fl;
    //str 配置修改时所需要的参数
    dialogInput.attr({'api': str});
	viewImage.viewLargerImage(data); 
}
/*
formMod.listen('/abc/abcd',{
    validError:function(validResutl){  
        var item  = validResutl.element,
        parent = item.parents('li'),
        wrongEle = parent.find('.imageadd-list-error');
        
        if(item.attr('name')=='uname'){
            if(validResutl.valid == 'notempty'){
                wrongEle.html('真实姓名不能为空');
            }
        }else if(item.attr('name')=='job'){
            if(validResutl.valid == 'notempty'){
                wrongEle.html('职务不能为空');
            }
        }else if(item.attr('name')=='describe'){
            if(validResutl.valid == 'notempty'){
                wrongEle.html('描述不能为空');
            }
        }
    },
    cleanup:function(item){
        var parent = item.parents('li');
        wrongEle = parent.find('.imageadd-list-error');
        wrongEle.html('');
    },
    success:function(result){
        //result = $.parseJSON(result.data);
    }
});
*/