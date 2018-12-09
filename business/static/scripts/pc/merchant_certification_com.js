(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Event = require('./Event'),
	uid = require('./uid'),

	_globalMessageCenter = Event('class');

function _Class(){
	this.id = uid.create();
	this.__event__ = Event('class.event.'+this.id);
}

_Class.prototype.fire = function(){
	this.__event__.fire.apply(this.__event__,arguments);
}

_Class.prototype.addEventListener = function(){
	this.__event__.addEventListener.apply(this.__event__,arguments);
}

_Class.prototype.dispatchGlobalMessage = function(){
	_globalMessageCenter.fire.apply(_globalMessageCenter,arguments);
}

_Class.prototype.listenGlobalMessage = function(){
	_globalMessageCenter.addEventListener.apply(_globalMessageCenter,arguments);
}

exports.create =  function(constractor,_extends){

	var emptyFunc = function(){},
		fp,
		Class;

	if(typeof constractor  === 'object'){
		_extends = constractor;
		constractor = emptyFunc;
	}

	if(_extends && _extends.superClass){
		emptyFunc.prototype = _extends.superClass;
		delete _extends.superClass;
	}
	else{
		emptyFunc.prototype = _Class.prototype;
	}


	Class = function(){
		_Class.call(this);
		constractor.apply(this,arguments);
	}

	fp = Class.prototype = new emptyFunc();

	//保证constructor 不会乱
	fp.constructor = constractor.constructor;

	// fp.extend = _extend;
	Class.extend = function(obj){
		_extend.call(Class,fp,obj);
	}
	_extends &&  _extend.call(Class,fp,_extends);

	return  Class;
}

function _extend(fp,json){
	for(var p in json){
		if(json.hasOwnProperty(p))
			fp[p] = json[p];
	}
}
},{"./Event":3,"./uid":8}],2:[function(require,module,exports){
var Class = require('./Class'),
//Dialog类
	Dialog = Class.create(function(opt){

		opt = opt || {};

		var defaults = {
			fixed:true,
			width:400,
			height:250,
			title:"标题",
			content:"内容"
		},
		_id = 'dialog_'+this.id,
		_self =this;

		opt = $.extend(defaults,opt);

		this.options = opt;

		this.target = $(Dialog.template);
		this.target.attr('id',_id);
		this.position = null;

		if(opt.extendClass)
			this.target.addClass(opt.extendClass);

		if(opt.width)
			this.target.css('width',opt.width+'px');
		if(opt.height)
			this.target.css('height',opt.height+'px');

		this.target.css('position','fixed');

		this.titleTarget = this.target.find('div.dialog_title div:first');
		this.contentTarget = this.target.find('div.dialog_content');
		this.footerTarget = this.target.find('div.dialog_footer');

		this.contentTarget.html(opt.content);
		this.titleTarget.html(opt.title);

		if(opt.hiddenTitlte)
			this.titleTarget.hide();

		if(!opt.footer)
			this.footerTarget.hide();

		Dialog.instances[this.id] = this;

	},{
	open:function(){

		var self =this;
		if(!$('#dialog_'+this.id).length){

			$('body').append(this.target);

			this.target.on('click','.dialog_close',function(e){
				self.close(e.target);
			}).hide();

			self.addEventListener('close_dialog',function(a){
				self.close(a);
			});
		}

		this.target.fadeIn();

		if(!this._customPos)
			this.center();

		//lightbox
		var w=Math.max($('body').outerWidth(),$(window).width());
		var h=Math.max($('body').outerHeight(),$(window).height());

		if(this.showLightbox ){
			if(!$('#lightbox_wrap').length){
				var lightbox = $('<div id="lightbox_wrap"></div>');
				lightbox.css({
					'width':w,
					'height':h
				}).appendTo($('body'));
			}else{
				var lightbox = $('#lightbox_wrap');
			}

			lightbox.show();

		}else{
			lightbox.hide();
		}

	},
	close:function(target){
		this.target.hide();
		if(this.showLightbox)
			$('#lightbox_wrap').hide();

		this.fire('close',this,target);
	},
	setTitle:function(str){
		this.options.title = str;
		this.titleTarget.html(str);
	},
	setContent:function(str){
		this.options.content = str;
		this.contentTarget.html(str);
	},
	setPos:function(pos){
		this._customPos = true;
		this.target.css(pos);
	},
	setSkin:function(skin){
		this.target.addClass(skin);
	},
	setPos : function(val){
		this.position = val;
	},
	showTitle:function(){
		this.titleTarget.show()
	},
	showFooter:function(){
		this.footerTarget.show();
	},
	center:function(){

		var that = this;
		var width = this.target.outerWidth(),
			height = this.target.outerHeight(),
			
			$win = $(window),
			winWidth = $win.width(),
			winHeight = $win.height();
			scrollTop = $win.scrollTop();
		this.target.css({
			left:'50%',
			top:(that.position =='absolute' ? 200 + $(window).scrollTop()+'px' : (height > winHeight ? 0 :'50%')),
			marginLeft: -width/2,
			marginTop: that.position =='absolute' ? 0 : (height > winHeight ? 0 : -height/2),
			position:(that.position ? that.position : 'fixed')
		});

	},
	setBox:function(width,height){
		this.options.width = width;
		this.options.height = height;
		this.target.css({
			"width":width,
			"height":height
		});

		if(!this._customPos)
			this.center();
	},
	setWidth:function(width){
		this.options.width = width;
		this.target.css('width',width+'px');

		if(!this._customPos)
			this.center();
	},
	setHeight:function(height){

		this.options.height = height;
		this.target.css('height',height+'px');

		if(!this._customPos)
			this.center();
	}
});


Dialog.template = [
	'<div class="dialog">',
	'<div class="dialog_title"><div></div><a class="dialog_close closebtn" href="javascript:void(0)"></a></div>',
	'<div class="dialog_content"></div>',
	'<div class="dialog_footer"></div>',
	'</div>'
].join('');

Dialog.instances = {};

module.exports = Dialog;
},{"./Class":1}],3:[function(require,module,exports){

var __Events__ = {},
  _slice = Array.prototype.slice;

function Event(name){
  this.NAMESPACE = name;
}

var _EP_ = Event.prototype;

_EP_.listen = _EP_.addEventListener = function (name,fn) {

  if(!fn)
    return;

  var id = this.NAMESPACE,
    space = __Events__[id].evs;

  space[name] ? space[name].push(fn):space[name] = [fn];
  return this;

}

_EP_.fire =  function  (name) {
  // console.log(name,arguments)
  var args = _slice.call(arguments,1),
    id = this.NAMESPACE,

    fns = __Events__[id].evs[name],
    i=0,l,j=0,k,
    fns2 = __Events__[id].once[name];

  if(fns && fns.length){
    l= fns.length;

    for(;i<l;i++){
      fns[i].apply(fns[i],args);
    }
  }

  if(fns2 && fns2.length){
    k=fns2.length;

    for(;j<k;j++){
      fns2[j].apply(fns2[j],args);
    }
    try{
     delete __Events__[id].once[name];
    }catch(e){
      __Events__[id].once[name] = null;
    }
  }

  return this;
}

_EP_.once = function(name,fn){
  if(!fn)
    return;

  var id = this.NAMESPACE,
    space = __Events__[id].once;

  space[name] ? space[name].push(fn):space[name] = [fn];
  return this;
}

_EP_.remove = function(name,fn){
  var E = __Events__[name];

  if(!E)
    return;

  var space = E.evs,
    i = 0,
    l,
    fnStr = fn.toString();

  if(space && space.length){
    l = space.length;

    for(;i<l;i++){
      if(fnStr == space[i].toString()){
        space.splice(i,1);
      }
    }
  }
}

module.exports = function(name) {

  var E = __Events__[name];

  if(!E){
     E = __Events__[name] = {
      cons:new Event(name),
      evs:{},
      once:{}
    }
  }
  return E['cons'];
}


},{}],4:[function(require,module,exports){
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
},{"../modules/dialogUi":5,"../modules/form":6,"../modules/template":7,"../modules/viewLargerImage":10}],5:[function(require,module,exports){
var Dialog = require('./Dialog'),
	uid = require('./uid'),
	_ApiContainer = {};


//监听Api
exports.listen = function(name,fn,key){
	if(!_ApiContainer[name])
		_ApiContainer[name] = {};

	if(!key)
		key = uid.create();

	_ApiContainer[name][key] = fn;

}

exports.remove = function(name,key){
	if(!_ApiContainer[name])
		return;

	delete _ApiContainer[name][key];
}

//监听dialog
$('body').on('click','[role=dialog]',function(){
	var $this = $(this),
		api = $this.attr('role-api');

	if(!api || api=='')
		return;
	else
		params = api.split('|');

	if(typeof params !=='undefined'){
		api = params[0];
		params = params[1]?params[1].split(','):[];
	}else{
		return;
	}
	if(_ApiContainer[api])
		for(var p in _ApiContainer[api])
			try{
				if(!_ApiContainer[api]._dialog)
					_ApiContainer[api]._dialog = new Dialog();

				_ApiContainer[api]._dialog.event_source	 = $this;
				_ApiContainer[api][p].apply(_ApiContainer[api]._dialog,params);
			}catch(e){}
});



},{"./Dialog":2,"./uid":8}],6:[function(require,module,exports){

//加载验证模块
var validate = require('./validate'),
	Event = require('./Event'),
	formEventCenter = Event('formModule');

//若不支持parentsUntil
function parentsUntil($el,srcTarget){
	if($el['parentsUntil']){
		var parents = $el.parentsUntil(srcTarget),
			len = parents.length,
			target;
		if(len){
			target = parents.eq(len-1).parent();
		}else{
			target = $el;
		}
		return target;

	}else{
		var parent = $el.parent().get(0),
		srcTarget = srcTarget.toUpperCase();
		while(parent && parent.tagName &&  parent.tagName.toUpperCase() !==srcTarget){
			parent = parent.parentNode;
		}

		return $(parent);
	}
}

$('body').on('submit','[role=ajaxfrom],[role=validform]',function(e){
	
	var $this = $(this),
		method = $this.attr('method')||'GET',
		action = $this.attr('action'),
		validResult = validate.valid($this);
		
	// formEventCenter._action = action;
	//通过验证
	if(validResult && !validResult.error){
		if($this.attr('role') == 'ajaxfrom'){
			$.ajax({
				url:action,
				type:method,
				data:$this.serializeArray(),
				success:function(res,restxt,xhr){
					formEventCenter.fire(action+'_success',{data:res,text:restxt,xhr:xhr},$this);
				},
				error:function(xhr,restxt,e){
					formEventCenter.fire(action+'_error',{xhr:xhr,text:restxt,error:e},$this);
				}
			})
		}else{
			return true;
		}
	}else{
		// e.preventDefault();
		formEventCenter.fire(action+'_valid_failure',validResult,$this);
	}
	
	e.preventDefault();

}).on('focus','[data-valid]',function(e){
	
	var $this = $(this),
		form = parentsUntil($this,'form'),
		action,
		result;

	if(form.attr('valid-after')) return;

	action = form.attr('action');
	if(form.length){
		formEventCenter.fire(action+'_valid_cleanup',$this);
	}
	
		
}).on('blur','[data-valid]',function(e){
	
	var $this = $(this),
		form = parentsUntil($this,'form'),
		action,
		result;

	if(form.attr('valid-after')) return;

	result = validate.valid($this);

	action = form.attr('action');
	if(form.length){
		if(result.error)
			formEventCenter.fire(action+'_valid_failure',result,form);
		if(!result.error)
			formEventCenter.fire(action+'_valid_success',$this,form);
	}
	
		
}).on('keyup','[data-valid]',function(e){
	
	var $this = $(this),
		form = parentsUntil($this,'form'),
		action;
	if(form.length){
		action = form.attr('action');
		formEventCenter.fire(action+'_valid_cleanup',$this);
	}
	
}).on('change','[data-valid]',function(e){
	
	var $this = $(this),
		form = parentsUntil($this,'form'),
		action;

	if(form.attr('valid-after')) return;

	if(form.length){
		action = form.attr('action');
		formEventCenter.fire(action+'_valid_cleanup',$this);
	}
}).on('click','.reflashVcode',function(e){
	e.preventDefault();
	var parent = $(this).parent(),
		vcodeimg = parent.find('img.vcodeimg'),
		src = vcodeimg.attr('src');

	if(src && src !=''){
		vcodeimg.attr('src',src+'1');
	}
	
});
//监听action
exports.listen = function(action,opt){
	if(opt.success)
		formEventCenter.addEventListener(action+'_success',function(data,form){
			opt.success.apply(form,[data]);
		});
	if(opt.error)
		formEventCenter.addEventListener(action+'_error',function(data,form){
			opt.error.apply(form,[data]);
		})
	if(opt.validError)
		formEventCenter.addEventListener(action+'_valid_failure',function(item){
			opt.validError(item);
		})
	if(opt.validSuccess)
		formEventCenter.addEventListener(action+'_valid_success',function(item){
			opt.validSuccess(item);
		})
	if(opt.cleanup)
		formEventCenter.addEventListener(action+'_valid_cleanup',function(item){
			opt.cleanup(item);
		})
}
exports.ajax = function(options){
	var d = {
		type : 'get',
		async : false,
		url : '',
        callback : '',
        dataType : "json",
        error : false
	},
	v = new Date().getTime();

	for(var i in options){
		d[i]  = options [i];
	}

	$.ajax({
		type : d.type,
        async : d.async,
        url : d.url + ((d.type != 'get') ? '':'&v=' + v),
        dataType : d.dataType,
        data : d.data,
        success : function(json){
            d.callback(json);
        },
        error : d.error
	})
}
},{"./Event":3,"./validate":9}],7:[function(require,module,exports){
var _cache = {},
    _helpers = {},
    _plugins={},
    _isNewEngine = ''.trim;

/**
* 前后标志符
*/
exports.openTag = '<%';
exports.closeTag = '%>';

// *
//  * 渲染模板
//  * @name    template.render
//  * @param   {String}    模板ID
//  * @param   {Object}    数据
//  * @return  {String}    渲染好的HTML字符串
 
exports.render = function (id, data,debug) {

    var cache = _getCache(id,debug);
    if (cache === undefined) {
        return _debug({
            id: id,
            name: 'Render Error',
            message: 'Not get template'
        });
    }
    
    return cache(data); 
};

/**
 * 编译模板
 * @name    template.compile
 * @param   {String}    模板ID (可选)
 * @param   {String}    模板字符串
 * @return  {Function}  渲染方法
 */
exports.compile = function (id, source) {
    
    var debug = arguments[2];
    
    if (typeof source !== 'string') {
        debug = source;
        source = id;
        id = null;
    }  

    
    try {
        var cache = _compile(source, debug);
    } catch (e) {
    
        e.id = id || source;
        e.name = 'Syntax Error';
        return _debug(e);
        
    }
    
    function render (data) {           
        
        try {
            
            return cache.call(_helpers,data); 
            
        } catch (e) {
            
            if (!debug) {
                return exports.compile(id, source, true)(data);
            }

            e.id = id || source;
            e.name = 'Render Error';
            e.source = source;
            
            return _debug(e);
            
        };
        
    };
    
    
    render.toString = function () {
        return cache.toString();
    };
    
    
    if (id) {
        _cache[id] = render;
    }

    return render;

};

/**
 * 扩展模板辅助方法
 * @name    template.helper
 * @param   {String}    名称
 * @param   {Function}  方法
 */
exports.helper = function (name, helper) {
    if (helper === undefined) {
        return _helpers[name];
    } else {
        _helpers[name] = helper;
    }
};

/**
 * 扩展模板插件方法
 * @name    template.helper
 * @param   {String}    名称
 * @param   {Function}  方法
 */
exports.plugin = function (name, plugin) {
    if (plugin === undefined) {
        return _plugins[name];
    } else {
       _plugins[name] = plugin;
    }
};


// 模板编译器
var _compile = function (source, debug) {

    var openTag = exports.openTag;
    var closeTag = exports.closeTag;
    var parser = exports.parser;

    
    var code = source;
    var tempCode = '';
    var line = 1;
    var outKey = {};
    var uniq = {$out:true,$line:true};
    
    var variables = "var $helpers=this,"
    + (debug ? "$line=0," : "");
    
    var replaces = _isNewEngine
    ? ["$out='';", "$out+=", ";", "$out"]
    : ["$out=[];", "$out.push(", ");", "$out.join('')"];
    
    var include = "function(id,data){"
    +     "if(data===undefined){data=$data}"
    +     "return $helpers.$render(id,data)"
    + "}";
    
    // html与逻辑语法分离
    _forEach.call(code.split(openTag), function (code, i) {
        code = code.split(closeTag);
        
        var $0 = code[0];
        var $1 = code[1];
        
        // code: [html]
        if (code.length === 1) {
            tempCode += html($0);
        // code: [logic, html]
        } else {
            tempCode += logic($0);
            
            if ($1) {
                tempCode += html($1);
            }
        }
    });
    
    code = tempCode;
    
    // 调试语句
    if (debug) {
        code = 'try{' + code + '}catch(e){'
        +       'e.line=$line;'
        +       'throw e'
        + '}';
    }
    
    code = variables + replaces[0] + code + 'return ' + replaces[3];
    
    try {

        return new Function('$data', code);
        
    } catch (e) {
        e.temp = 'function anonymous($data) {' + code + '}';
        throw e;
    };
    
    // 处理 HTML 语句
    function html (code) {
        
        // 记录行号
        line += code.split(/\n/).length - 1;
        
        code = code
        // 单双引号与反斜杠转义
        .replace(/('|"|\\)/g, '\\$1')
        // 换行符转义(windows + linux)
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n');
        
        code = replaces[1] + "'" + code + "'" + replaces[2];
        
        return code + '\n';
    };
    
    
    // 处理逻辑语句
    function logic (code) {

        var thisLine = line;
       
        if (parser) {
             // 语法转换器
            code = parser(code);
        } else if (debug) {
            // 记录行号
            code = code.replace(/\n/g, function () {
                line ++;
                return '$line=' + line +  ';';
            });
        }
        
        // 输出语句
        if (code.indexOf('=') === 0) {

            //添加插件方法
            var _scode = code.substring(1).replace(/[\s;]*$/, ''),
            vars,_plugin,
            trueCode,
            plugingFlag = _scode.split('|'),
            i=1,l=plugingFlag.length;

            if(l){
                //变量
                _scode = plugingFlag[0];

                for(;i<l;i++){
                    _plugin = plugingFlag[i].split(":");

                    fn = _plugin[0];

                    vars = _plugin.slice(1);

                    vars.unshift(_scode);
                    vars.unshift('"'+fn+'"');

                    _scode = '$plugins('+vars.join(',')+')';
                }
                
               trueCode = _scode;

            }else{
                trueCode = _scode;
            }
            
            code = replaces[1]
            + (_isNewEngine ? '$getValue(' : '')
            + trueCode
            + (_isNewEngine ? ')' : '')
            + replaces[2];

        }

        if (debug) {
            code = '$line=' + thisLine + ';' + code;
        }

        getKey(code);
        
        return code + '\n';
    };
    
    
    // 提取模板中的变量名
    function getKey (code) {
        
        // 过滤注释、字符串、方法名
        code = code.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g, '');

        // 分词
        _forEach.call(code.split(/[^\$\w\d]+/), function (name) {
         
            // 沙箱强制语法规范：禁止通过套嵌函数的 this 关键字获取全局权限
            if (/^(this|\$helpers)$/.test(name)) {
                throw {
                    message: 'Prohibit the use of the "' + name +'"'
                };
            }

            // 过滤关键字与数字
            if (!name || _keyWordsMap[name] || /^\d/.test(name)) {
                return;
            }
            
            // 除重
            if (!uniq[name]) {
                setValue(name);
                uniq[name] = true;
            }
            
        });
        
    };
    
    
    // 声明模板变量
    // 赋值优先级: 内置特权方法(include) > 公用模板方法 > 数据
    function setValue (name) {  
        var value;

        if (name === 'include') {
        
            value = include;
            
        } else if (_helpers[name]) {
            
            value = '$helpers.' + name;
            
        } else {
            value = '$data.' + name;
        }
        
        variables += name + '=' + value + ',';
    };
};



// 获取模板缓存
var _getCache = function (id,debug) {
    var cache = _cache[id];
    
    if (cache === undefined ) {
        var elem = document.getElementById(id);
        
        if (elem) {
            exports.compile(id, elem.value || elem.innerHTML,debug);
        }
        
        return _cache[id];
    }
    
    return cache;
};

// 模板调试器
var _debug = function (e) {

    var content = '[template]:\n'
        + e.id
        + '\n\n[name]:\n'
        + e.name;
    
    if (e.message) {
        content += '\n\n[message]:\n'
        + e.message;
    }
    
    if (e.line) {
        content += '\n\n[line]:\n'
        + e.line;
        content += '\n\n[source]:\n'
        + e.source.split(/\n/)[e.line - 1].replace(/^[\s\t]+/, '');
    }
    
    if (e.temp) {
        content += '\n\n[temp]:\n'
        + e.temp;
    }
    
    if (window.console) {
        console.error(content);
    }
    
    function error () {
        return error + '';
    };
    
    error.toString = function () {
        return '{Template Error}';
    };
    
    return error;
};


// 数组迭代方法
var _forEach =  Array.prototype.forEach || function (block, thisObject) {
    var len = this.length >>> 0;
    
    for (var i = 0; i < len; i++) {
        if (i in this) {
            block.call(thisObject, this[i], i, this);
        }
    }
    
};

// javascript 关键字表
var _keyWordsMap = {};
_forEach.call((

    // 关键字
    'break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if'
    + ',in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with'
    
    // 保留字
    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto'
    + ',implements,import,int,interface,long,native,package,private,protected,public,short'
    + ',static,super,synchronized,throws,transient,volatile'
    
    // ECMA 5 - use strict
    + ',arguments,let,yield'
    
).split(','), function (key) {
    _keyWordsMap[key] = true;
});


// 模板私有辅助方法
exports.helper('$forEach', _forEach);
exports.helper('$render', exports.render);
exports.helper('$getValue', function (value) {
    return value === undefined ? '' : value;
});

//插件私有方法
exports.helper('$plugins',function(){
    var args = Array.prototype.slice.call(arguments,0),
        name = args[0];

    if(_plugins[name]){
     return _plugins[name].apply(this,args.slice(1));
    }
});

/*
* 常规通用插件
*/
//截字
exports.plugin('truncate',function(str,num,buf){
    buf = buf||'...';
    if(str.length>num){
        return str.substring(0,num)+buf;
    }else{
        return str;
    }
});

//encode plugin
var htmlDecodeDict = { "quot": '"', "lt": "<", "gt": ">", "amp": "&", "nbsp": " " };
var htmlEncodeDict = { '"': "quot", "<": "lt", ">": "gt", "&": "amp", " ": "nbsp" };

exports.plugin('encode',function(str,type){
    //html encode
    if(type === 'html'){
        return String(str).replace(/["<>& ]/g, function(all) {
                return "&" + htmlEncodeDict[all] + ";";
            });
    }else if(type === 'url'){
        return encodeURIComponent(String(str));
    }else{
        return str;
    }
});
//decode plugin
exports.plugin('decode',function(str,type){
    if(type==='html'){
        return String(str).replace(/["<>& ]/g, function(all) {
                return "&" + htmlEncodeDict[all] + ";";
            });
    }else if(type==='url'){
        return decodeURIComponent(String(str));
    }else{
        return str;
    }
});

exports.plugin('replace',function(str,parten,replacer){
    return str.replace(parten,replacer);
});

exports.plugin('parseDate',function(timestr,split){
    var payTime = new Date(timestr*1000); 
    return payTime.getFullYear()+split+(payTime.getMonth()+1)+split+payTime.getDate() ;
});


exports.plugin('default',function(str,val){
    if(str==="")
        return val;
    
    return str;
});
},{}],8:[function(require,module,exports){
exports.create = function () {
    var S4 = function () {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4());
}
},{}],9:[function(require,module,exports){

exports.api = {
	regname:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/user/verifyUname?uname="+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regInvests:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/fund/verifyCompanyRecord",
				type : 'post',
				data : 'company='+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regtimeoutInvests:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/fund/verifyCompanyRun",
				type : 'post',
				data : 'company='+val,
				async:false,
				success:function(res){
					if(res !=1){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	regemail:function(val){
		var ret = true;
		$.ajax({
			url : "/user/verifyUemail?uemail="+val,
			async:false,
			success:function(res){
				if(res !=1){
					ret =false;
				}
			},
			error:function(){
				ret = false;
			}
		});
		return ret;
	},
	equal:function(val,nameId){
		if(val !==$(nameId).val())
			return false;
		return true;
	},
	notempty:function(val){
		if($.trim(val) ==='')
			return false;
		return true;
	},
	len:function(val,minlen,maxlen){
		if(val.length<minlen || val.length>maxlen)
			return false;
		return true;
	},
	cha:function(val,reg){
		// console.log(val);
		if(new RegExp(reg).test(val))
			return true;
		return false;
	},
	number:function(val,oldval){
		if(oldval){
			if(val==oldval){
				return true;
			}else{
				return false;
			}
		}else{
			if(/^\d+$/.test(val))
				return true;
			return false;
		}
	},
	notnumber:function(val){
		if(/^\D+$/.test(val))
			return true;
		return false;
	},
    ip:function(val){
		if(/^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(val))
			return true;
		return false;
	},
    serverip:function(val){
		if(/^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(val))
			return true;
		return false;
	},
	user_name:function(val){

	},
	floatNumber : function(val,num){
		if(num){
			if(num == 1){
				var reg = /^\d+(\.\d{1})?$/;
			}
			if(num == 2){
				var reg = /^\d+(\.\d{1,2})?$/;
			}
		}else{
			var reg = /^\d+((\.{1}\d+)|\d?)$/;
		}
		
		if(reg.test(val))
			return true;
		return false;
	},
	cn : function(val){
		var reg = /^[\u4e00-\u9fa5]+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	filter : function(val){
		var reg = /^[0-9a-zA-Z_]{1,}$/;
		if(reg.test(val))
			return true;
		return false;
	},
	netname : function(val){
        var reg = /([https|http|ftp|rtsp|mms+:\/\/])?([www]\.)?[a-z]\.[com|cn|com.cn|net]/
		if(reg.test(val))
			return true;
		return false;
	},
	reg_cn_letter_number : function(val){
		var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	reg_cn_len : function(val,minlen,maxlen){
		var len = val.replace(/[^\x00-\xFF]/g,'***').length;
		if(len<minlen || len>maxlen)
			return false;
		return true;
	},
	email:function(val){
		 if(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val))
		 return true;
		 return false;
	},
	mobile:function(val){
		if(!val) return false;
	  	val = val.replace(/\s+/g,'');
        
		if(/^(13\d|18\d|15\d|17\d|14\d)\d{8}$/.test(val))
			return true;
		return false;
	},
    notmobile:function(val){
		if(/1\d{10}/.test(val))
			return false;
		return true;
	},
	ID_card : function(val){
		if(/(^\d{15}$)|(^\d{16}$)|(^\d{18}$)|(^\d{19}$)|(^\d{17}(\d|X|x)$)/.test(val))
			return true;
		return false;
	},
	numberRegion : function(val,min,max){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			max = max - 0;
			if(val > max || val < min) return false;

			return true;

		}else{
			return false;
		}
			
	},
	multiple : function(val,base){
		if(val%base == 0){
			return true;
		}else{
			return false;
		}
	},
	vcode:function(code,type){
		var ret = true;
		$.ajax(
			{
				url:"/vcode/check?type="+type+"&vcode="+code,
				async:false,
				success:function(res){
					if(res !=0){
						ret =false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
	checkRegMobileCode:function(code,mobilenum){
		var ret = true;
		$.ajax({
            url:"/Usermobile/checkPhoneCode",
            data:{
                mobile:mobilenum,
                mobilecode:code
            },
            async:false,
            success:function(res){
                res = res*1;
                if(res>0){
                	ret = false;
                }
            },
            error:function(){
            	ret = false;
            }
        });
        return ret;
	},money:function(val){
		if(/^\d+(\.[\d]{1,2})?$/.test(val))
			return true;
		return false;
	},section1_3:function(val){
		if(/^[123]$/.test(val))
			return true;
		return false;
	},
    limitNum : function(val,max){
		if(/\d+/.test(val)){
			val = val - 0;
			max = max - 0;
			if(val > max) return false;

			return true;

		}else{
			return false;
		}
			
	},notZero:function(val){
		if(/[0]/.test(val))
			return false;
		return true;
	},
	urlCheck : function(val){
		var reg = /^(http:\/\/|https:\/\/)/
		if(reg.test(val))
			return true;
		return false;
	},
	minExceptZero : function(val,min){
		if(/\d+/.test(val)){
			if(val-0 == 0){
				return true
			}else{
				val = val - 0;
				min = min - 0;
				if(val < min) return false;
				return true;
			}
		}else{
			return false;
		}
	}
};

//验证元素
exports.valid = function(item){
	var $item = $(item),
		validResult = {};
	
	if($item[0] && $item[0].tagName.toUpperCase()==='FORM'){
		var items = $item.find('[data-valid]'),
			i = 0,
			l = items.length,
			ret = true;

		for(;i<l;i++){
			ret = exports.valid(items.eq(i));
			if(ret && ret.error){
				validResult = ret;
				break;
			}
		}
		return validResult;

	}else{
		var valid = $item.attr('data-valid'),
			configs = valid.split('|'),
			validFn,
			validParams,
			validConfig,
			i = 0,
			l = configs.length;

		for(;i<l;i++){
			validConfig = configs[i].split(':');
			validFn = validConfig[0];
			validParams = validConfig.slice(1);
			validParams.unshift($item.val());

			if(exports.api[validFn] && $.isFunction(exports.api[validFn])){
				var ret = exports.api[validFn].apply($item,validParams);
				// console.log(i,validConfig,validFn);
				if(ret == false){
					validResult = {
						error:1,
						element:$item,
						valid:validFn
					};
					break;
				}
			}
		}
	}
	return validResult;
}
},{}],10:[function(require,module,exports){
var template = require('../modules/template');

exports.viewLargerImage = function(data){
	/* data参数
	{
		src			//图片路径
		uname 		//姓名
		job 		//职务
		describe 	//照片描述
		event_source //事件源元素
		editorfn 	//编辑功能  
		deletefn 	//删除功能
		input_name 	// 需要传到后的图片input的name
	}
	*/
	/* 点击看大图加属性 当属性值是0时代表不需要
	uname="0" job="0" describe="0" 
	deletefn="1" editorfn="1" 1代表有这个功能
	deletefn="0" editorfn="0" 0代表没有这个功能
	*/

	var viewLargerImageDom = template.render('viewLargerImageTpl',data);
    $('body').append(viewLargerImageDom);
    var parents = $('.larger-image'),
    	imageParent = parents.find('.larger-image-imgbox'),
    	editorBtn = parents.find('.larger-image-btnbox-editor'),
    	deleteBtn = parents.find('.larger-image-btnbox-delete'),
    	closeBtn = parents.find('.larger-image-btnbox-close'),
    	dialogInput = data.event_source.parent().find('input[role="dialog"]'),
    	str = '';

    setWidthHigh();

    $(window).resize(function(){
		setWidthHigh();
	});

	function setWidthHigh(){
		var clientWidth = Math.max(parseInt($(window).width()),1000),
    		clientHeight = Math.max(parseInt($(window).height()),500),
    		imageParentHeight = parseInt(imageParent.height()),
    		t = 0;

    	if(clientHeight > 500){
    		t = (clientHeight-imageParentHeight)/2;
    	}else{
    		t = 0;
    	}
		
	    imageParent.css({ 'margin-top': t });

	    parents.children().css({ 'height': clientHeight });
	    parents.css({
	        width: clientWidth,
	        height: clientHeight
	    });
	}

	parents.show();
	
	editorBtn.click(function(){
		//配置role-api
		str = dialogInput.attr('editor')+'|'+'editor,';
		str += dialogInput.attr('api');
		
		triggerClick(str);
	});
	deleteBtn.click(function(){
		str = dialogInput.attr('delete')
		triggerClick(str);
	});
	closeBtn.click(function(){
		largerImageRemoveFn();
	});

	function triggerClick(str){
		dialogInput.attr({
			'role-api' : str
		});
		dialogInput.trigger('click');
		largerImageRemoveFn();
	}

	function largerImageRemoveFn(){
		$('.larger-image').remove();
	}
}


},{"../modules/template":7}],11:[function(require,module,exports){
var dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    aboutImageFunction = require('../modules/aboutImageFunction'); //关于图片的功能

$('body')
.on('mouseenter','.upload-photo-thumbnail',function(){//查看大图移入
    aboutImageFunction.showThumbnailMask($(this),1);
})
.on('mouseleave','.upload-photo-thumbnail',function(){//查看大图移出
    aboutImageFunction.showThumbnailMask($(this),0);
})
.on('click','.upload-photo-thumbnail',function(){ //点击查看大图点击
    aboutImageFunction.viewLargerImage($(this));
})
.on('click','.cancel',function(){ //取消按钮
    var parents = $(this).parents('.dialog');
    var closeBtn = parents.find('.dialog_close');
    closeBtn.trigger('click');
});

/* 表单验证start */

formMod.listen('shenhelist',{
    validError:function(validResutl){ 
        var item  = validResutl.element,
        parent = item.parents('div.row'),
        warning = parent.find('.warning');
        if(item.attr('name')=='name'){
            if(validResutl.valid == 'notempty'){
                warning.html('企业名称不能为空');
                warning.css({'display':'block'});
            }
        }     
    },
    cleanup:function(item){
        var parent = item.parents('div.row'),
        warning = parent.find('.warning');
        warning.css({'display':'none'});
    },
    success:function(result){
        console.log(result);
        //result = $.parseJSON(result.data);
    }
});


/* 表单验证end */

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
            url: 'Index/ajaxGetDistrict',
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
},{"../modules/aboutImageFunction":4,"../modules/dialogUi":5,"../modules/form":6,"../modules/template":7}]},{},[11]);
