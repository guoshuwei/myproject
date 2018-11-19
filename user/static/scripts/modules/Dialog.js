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