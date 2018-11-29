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
},{"./Event":3,"./uid":13}],2:[function(require,module,exports){
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
var resultCodeMap = {
	4100 : function(){
		_Fn.isLogin();
	}
}

module.exports = function(res){
	if(resultCodeMap[res.code]){
		resultCodeMap[res.code]();	
	}else if(res.code){
		_Fn.alert(res.message);
	}else{
		if(window[console] && window[console][log]){
			console.log('The ajax result code : "' + res.code +'" not define!');
		}
	}
	
}
},{}],5:[function(require,module,exports){
var template = require('../modules/template');
window._Fn =  window._Fn  || {};

function getAdd(ele){
	var add = {};

	add.left = ele.offset().left;

	add.top = ele.offset().top;

	add.width = ele.width()+parseInt(ele.css('paddingLeft'))+parseInt(ele.css('paddingRight'));

	add.height = ele.height()+parseInt(ele.css('paddingTop'))+parseInt(ele.css('paddingBottom'));

	add.center = {
		x : add.left + add.width / 2,
		y : add.top +add.height / 2
	}
	add.centerLeft = {
		x : add.left,
		y : add.top +add.height / 2
	}
	add.centerTop = {
		x : add.left + add.width / 2,
		y : add.top
	}

	add.centerRight = {
		x : add.left + add.width,
		y : add.top +add.height / 2
	}
	add.centerBottom = {
		x : add.left + add.width / 2,
		y : add.top + add.height
	}

	add.roleLeftTop = {
		x : add.left,
		y : add.top
	}

	add.roleLeftBottom = {
		x : add.left,
		y : add.top + add.height
	}

	add.roleRightTop = {
		x : add.left + add.width,
		y : add.top
	}

	add.roleRightBottom = {
		x : add.left + add.width,
		y : add.top + add.height
	}


	return add;
}
function createNumerDom(type){
	if(document.getElementById('animate_dom_num')){
		return $('#animate_dom_num');
	}
	$('body').append('<div id="animate_dom_num">+1</div>');
	return $('#animate_dom_num');
}


function Jumper(ele,delay){
    this.ele = ele;
    this.reg=/^(\d|([1-9]\d+))(\.\d+){1}$/;
    this.reg1=/^(\d+)(,\d+)/;  
    this.delay = delay ? delay : null;
}

Jumper.prototype.move = function(stopNumber,ele,innerText){
        var 
        that = this,
	    time=820,  
        outTime=0,  
	    interTime=10;
        if(that.reg1.test(innerText)){
    	    var timer = setInterval(function(){
        		outTime+=interTime;
               
        		if(outTime<time){
        			ele.text(that.toThousandPoints(stopNumber/time*outTime,innerText));
        		}else{    		 
        			ele.text(that.toThousandPoints(stopNumber,innerText));
                    clearInterval(timer)
        		}
    		},interTime);
        }else{
            var timer = setInterval(function(){
        		outTime+=interTime;
               
        		if(outTime<time){
        			ele.text(that.toNormalNumber(stopNumber/time*outTime,innerText));
        		}else{    		 
        			ele.text(that.toNormalNumber(stopNumber,innerText));
                    clearInterval(timer)
        		}
    		},interTime);
        }
    }  
Jumper.prototype.toNumber = function(number){
        var nuwString = number.split(',');
        return parseFloat(nuwString.join(""));
    } 
Jumper.prototype.toThousandPoints = function(number,innerText){
        var that = this;
        number=Number(number);
        if(that.reg.test(innerText)){
            number=number.toFixed(2)+"";
        }else{
            number=number.toFixed(0) +"";
        }
        var re=/(-?\d+)(\d{3})/;
        while(re.test(number)){
            number=number.replace(re,"$1,$2");
        }
        return number;
    } 
Jumper.prototype.toNormalNumber = function(number,innerText){
        var that = this;
        number=Number(number);
        if(that.reg.test(innerText)){
            number=number.toFixed(2)+"";
        }else{
            number=number.toFixed(0) +"";
        }
        return number;
    } 

Jumper.prototype.init = function(){
    var 
    that=this,
    innerText=that.ele.text(),
    stopNumber = parseFloat(that.toNumber(innerText)),
    numberLength = stopNumber.length,
    numberList="";
    if(that.delay&&that.delay==true){
        setTimeout(function(){
            that.move(stopNumber,that.ele,innerText);  
        },1000);
    }else{
        that.move(stopNumber,that.ele,innerText);      
    }  
}


function Loading(ele,type){
    this.ele = ele;
    this.type = type;
}

Loading.prototype.create = function(){
    var that = this;
    if(that.type && that.type == 'big'){
        $('body').append('<img style="display:none;" class="ui-loading big" id="loading-big" src="/styles/images/common/loading-big.gif" />');
        return $('#loading-big');
    }else{
        $('body').append('<img style="display:none;" class="ui-loading small" id="loading-small" src="/styles/images/common/loading-small.gif" />');
        var add = getAdd(that.ele);
        $('#loading-small').css({
            top : add.center.y - 15,
            left : add.center.x - 15
        })
        return $('#loading-small');
    }
}

var _loading = function(){
    function create(ele,type){
        if(type && type == 'big'){
            $('body').append('<img style="display:none;" class="ui-loading big" id="loading-big" src="/styles/images/common/loading-big.gif" />');
            return $('#loading-big');
        }else{
            $('body').append('<img style="display:none;" class="ui-loading small" id="loading-small" src="/styles/images/common/loading-small.gif" />');
            var add = getAdd(ele);
            $('#loading-small').css({
                top : add.center.y - 8,
                left : add.center.x - 8
            })
            return $('#loading-small');
        }
    }
    return {
        show : function(ele,type,callback){
            $('.ui-loading').remove();
            create(ele,type);
            $('.ui-loading').fadeIn(250,function(){
               callback && callback();
            });
        },
        hide : function(callback){
            $('.ui-loading').fadeOut(250, function() {
                callback && callback();
            });
        }
    }
};



var _circle = function(){
    function create(ele){
        var content = template.render('circleTpl');
        $('body').append(content);
        var add = getAdd(ele);
        $('.ui-circle').css({
            top : add.center.y - 8,
            left : add.center.x - 8
        })
        $(ele).css('position','relative');
        return $('.ui-circle');
    }
    return {
        show : function(ele,callback){
            $('.ui-circle').remove();
            create(ele);
            $('.ui-circle').fadeIn(250,function(){
               callback && callback();
            });
        },
        hide : function(callback){
            $('.ui-circle').fadeOut(250, function() {
                callback && callback();
            });
        }
    }
};

var _circleMulti = function(){
    function create(ele){
        var content = template.render('circleTpl');
        $(ele).append(content);
        var add = getAdd(ele);
        $(ele).find('.ui-circle').css({
            top : add.height / 2,
            left : add.width / 2
        })
        if($(ele).css('position') == 'static'){
            $(ele).css('position','relative');
        }
        return $(ele).find('.ui-circle');
    }
    return {
        show : function(ele,callback){
            var _len = $(ele).find('.ui-circle').length;
            if(_len == 0){
                create(ele);
            }
            $(ele).find('.ui-circle').fadeIn(250,function(){
               callback && callback();
            });
        },
        hide : function(ele,callback){
            $(ele).find('.ui-circle').fadeOut(250, function() {
                callback && callback();
            });
        }
    }
};

$("[role='role-jump']").each(function(){
    new Jumper($(this)).init();              
}) 


exports.numberUp = function(ele,css,content){
	if(ele.length== 0) return;
	var add = getAdd(ele);
	var numer = createNumerDom();
	numer.css({
		left : add.centerTop.x + 'px',
		top : add.top - 24 + 'px'
	})
	if(css){
		numer.css(css);
	}
	if(content){
		numer.html(content);
	}
	setTimeout(function(){
		numer.addClass('uping');
		setTimeout(function(){
			numer.remove();
		},1000)
	},10)
}

exports.jump = function(ele,delay){
    new Jumper($(ele),delay).init();   
}
exports.loading = function(ele,type,callback){
    return _loading(ele,type,callback);
}
exports.circle = function(ele,callback){
    return _circle(ele,callback);
}
exports.circleMulti = function(ele,callback){
    return _circleMulti(ele,callback);
}


},{"../modules/template":11}],6:[function(require,module,exports){
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

exports.fire = function(api,params){
	params = params ? params : [];
	if(!api) return;

	if(_ApiContainer[api])
		for(var p in _ApiContainer[api])
			try{
				if(!_ApiContainer[api]._dialog)
					_ApiContainer[api]._dialog = new Dialog();

				_ApiContainer[api]._dialog.event_source	 = document.body;
				_ApiContainer[api][p].apply(_ApiContainer[api]._dialog,params);
			}catch(e){}
}
//监听dialog
$('body').on('click','[role=dialog]',function(event){
	
	event.stopPropagation();

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
},{"./Dialog":2,"./uid":13}],7:[function(require,module,exports){
var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;
window.isIELower = isIE6 || isIE7 || isIE8;
if($(".mod-floatlayer").length > 0){
    $(window).scroll(function(){
        var footer = $('.footer');
        var hasfooter = footer.length;
        var footerHeight=hasfooter ? $('.footer').outerHeight():0;
        var footerTop=hasfooter?footer.offset().top : 0;
        var bodyScrollTop=$(document).scrollTop();
        var bodyheight=$(document).outerHeight();
        if(document.compatMode=="CSS1Compat"){
            var winHeight=document.documentElement.clientHeight;
        }else{
            var winHeight=document.body.clientHeight;
        }    
        if(bodyScrollTop>=winHeight){
            $(".mod-floatlayer .home").css("display","block")        
        }else{
             $(".mod-floatlayer .home").css("display","none")
        }
        if(bodyScrollTop+winHeight>=footerTop){
             $(".mod-floatlayer").css({
                "position":"absolute",
                "bottom":footerHeight+30+"px",
                "right":"20px"
             })
        }else{
            $(".mod-floatlayer").css({
                "position":"fixed",
                "bottom":"50px",
                "right":"20px"
             })
        }
    });
    var bDShareBox = $('.bdshare_popup_box');
    $(".mod-floatlayer .home").click(function(){
        $(".mod-floatlayer .home").css("display","none");
        $("document").scrollTop(0);
    })
    $('body')
        .on('mouseenter','.baidushare',function(){
            bDShareBox.show();
        })
        .on('mouseleave','.baidushare',function(){
            bDShareBox.hide();
        });
    function flip(){
        var redland = $('.redland');
        if(redland.length == 0){
            return;
        }
        var isAnimating = false;
        var nextLoop = true;
        var timer = null;

        function flipAnimate(){
            isAnimating = true;
            var logo_ = redland.find('img:visible');
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            /*if(redland.hasClass('hongbao')){
                if(redland.hasClass('flipInY_90')){
                    redland.removeClass('flipInY_90 animated_in').addClass('flipInY_270');
                    redland.addClass('flipInY_360 animated_out');
                }else{
                    redland.removeClass('flipInY_360 animated_out').addClass('flipInY_90 animated_in');
                }
            }else{
                if(redland.hasClass('flipInY_90')){
                    redland.removeClass('redland2 flipInY_90 animated_in').addClass('redland1 flipInY_270');
                    redland.addClass('flipInY_360 animated_out');
                }else{
                    redland.removeClass('flipInY_360 animated_out').addClass('flipInY_90 animated_in');
                }
            }*/
            //.css("cssText", "width:650px !important;overflow:hidden !important");
            if(window.isIELower){
                if(logo_.hasClass('hongbao')){
                    logo_.hide().next().show();
                }else{
                    logo_.hide().prev().show();
                }
                timer = setTimeout(flipAnimate,1800);
            }else{
                if(logo_.attr('data-flipInY') == '90'){
                    var $nextObj = logo_.css("cssText", "display: none !important;").attr('data-flipInY', 0);
                    $nextObj = $nextObj.hasClass('hongbao') ? $nextObj.next() : $nextObj.prev();
                    $nextObj.css("cssText", "width: 0;left: 24.5px;opacity: 0;display: block !important;")
                      .animate({
                        'width': '49px',
                        'left': 0,
                        'opacity': 1
                    }, 600, function(){
                        isAnimating = false;
                        if(nextLoop){
                            timer = setTimeout(flipAnimate,1800);
                        }
                    }).attr('data-flipInY', 0);
                }else{
                    logo_.attr('data-flipInY', 90).animate({
                        'width': 0,
                        'left': '24.5px',
                        'opacity': 0
                    }, 400, function(){
                        isAnimating = false;
                        nextLoop && flipAnimate();
                    });
                }
            }
            //timer = setTimeout(flipAnimate,redland.hasClass('flipInY_90') ? 400 : 1500);
        }
        flipAnimate();
        redland.hover(function(){
            if(window.isIELower){
                clearTimeout(timer);
                timer = null;
            }else{
                nextLoop = false;
                var logo_1 = redland.find('img:visible');
                if(logo_1.attr('data-flipInY') == '90') {
                    !isAnimating && flipAnimate();
                }else{
                    clearTimeout(timer);
                    timer = null;
                }
            }
        },window.isIELower ? flipAnimate : function(){
            nextLoop = true;
            !isAnimating && !timer && flipAnimate();
        })
    }
    flip()
    //客服icon
    var imUrl = location.href.split(":");
    imUrl.shift();
    imUrl = imUrl.join();
    var imEle = document.getElementById("udesk-im-40");imEle.onclick = function(){ window.open("http://touyouquan.udesk.cn/im/select?cur_url=http:"+imUrl+"&pre_url="+document.referrer,"", "width=780,height=560,top=200,left=350,resizable=yes"); };
}


},{}],8:[function(require,module,exports){
var 
resultCall = require('../modules/ajaxcodecall'),
animate = require('../modules/animate');


function changeHtml(type,that,api){
	if(api[3] && api[type].indexOf('#') > -1){
		that.html(api[type].replace(/#/,api[3]));
	}else{
		that.html(api[type]);
	}

	that.attr('role-api',api.join(':'));

}

$('[role=follow]').each(function(){
	var that = $(this),
	api = that.attr('role-api');
	api = api.split(':');
	changeHtml(api[2] == "" ? 0 : api[2],that,api);
	
})

$('body')
.on('click','[role=follow]',function(){
	var that = $(this),
	url = that.attr('href'),
	status = that.attr('status'),
	api = that.attr('role-api');
	api = api.split(':');
	if(!_Fn.isLogin()) return false;
	if(status && status>0) return false;
	that.attr('status',1);

	animate.loading().show(that);

	

	$.ajax({
		url : url,
		type : 'post',
		dataType:'json',
		success : function(res){
			animate.loading().hide(function(){
				that.attr('status',0);
				if(res.code != 200){
					resultCall(res);
					return;
				}
				if(api[2] == 0 || api[2] == ""){
					that.addClass('ed');
					api[2] = 1;
					animate.numberUp(that);

				}else{
					that.removeClass('ed');
					api[2] = 0;
				
					animate.numberUp(that,{
						'color' : '#0080cc'
					},'-1');
				}
				changeHtml(api[2],that,api);

			});

		},
		error : function(){
			animate.loading().hide(function(){
				_Fn.alert('关注失败，请稍后尝试!');
				following = false;
			});
		}
	});

	return false;
})
},{"../modules/ajaxcodecall":4,"../modules/animate":5}],9:[function(require,module,exports){

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
			if($this.attr('role-clock') == '1') return false;
			$this.attr('role-clock',1);
			formEventCenter.fire(action+'_ajax_before',$this);
			$.ajax({
				url:action,
				type:method,
				data:$this.serializeArray(),
				success:function(res,restxt,xhr){
					formEventCenter.fire(action+'_success',{data:res,text:restxt,xhr:xhr},$this);
					$this.attr('role-clock',0);
				},
				error:function(xhr,restxt,e){
					formEventCenter.fire(action+'_error',{xhr:xhr,text:restxt,error:e},$this);
					$this.attr('role-clock',0);
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
	var that = this;
	setTimeout(function(){
		var $this = $(that),
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
				formEventCenter.fire(action+'_valid_success',$this,form,result);
		}
	},200);

	
		
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
		formEventCenter.addEventListener(action+'_valid_success',function(item,form,result){
			opt.validSuccess(item,form,result);
		})
	if(opt.cleanup)
		formEventCenter.addEventListener(action+'_valid_cleanup',function(item){
			opt.cleanup(item);
		})
	if(opt.ajaxBefore)
		formEventCenter.addEventListener(action+'_ajax_before',function(item){
			opt.ajaxBefore(item);
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
},{"./Event":3,"./validate":14}],10:[function(require,module,exports){
/*
* 事件统计
* 依赖百度统计
* worker liujinqiang
* 2016-11-15
*/
(function($){

function trackEvent(that){
	var tracker,trackkey,trackType = 'click';
	tracker = that.attr('track-event');
	if(tracker){
		if(tracker == 'ignore'){
			return;
		}else{
			tracker = tracker.split(',');
		}

		if(tracker.length > 1){
			trackType = tracker[1];
		}
		trackkey = tracker[0];

		_hmt.push(['_trackEvent',trackkey,trackType,'p2peye']);
		return;

	}
	tracker = that.parents('[track]');
	if(!tracker.length)return;
	tracker = tracker.attr('track').split(',');
	if(tracker.length > 1){
		trackType = tracker[1];
	}
	trackkey = tracker[0];

	_hmt.push(['_trackEvent',trackkey,trackType,'p2peye']);
}
$('body')
.on('click','a',function(){
	var that = $(this);
	if(!window._hmt){
		return console.log('百度统计未成功加载，请检测百度统计是否安装！');
	}
	trackEvent(that);
});

exports.fire = function(category, action){
	if(!window._hmt){
		return console.log('百度统计未成功加载，请检测百度统计是否安装！');
	}
	action = action ? action : 'click';
	_hmt.push(['_trackEvent',category,action,'p2peye']);
}
})(jQuery);
},{}],11:[function(require,module,exports){
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

    //js method
    + ',parseFloat,parseInt'
    
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
},{}],12:[function(require,module,exports){


var 
	following = false,
	selector = require('../plugins/select'),
	resultCall = require('../modules/ajaxcodecall'),
	animate = require('../modules/animate'),
	dialogUi= require('../modules/dialogUi');




$('body')
.on('focus','.ui-search .input',function(){
	$(this).parents('.ui-search').addClass('in');
})
.on('click','.ui-pop a',function(){
	var parent = $(this).parents('.ui-pop');
	parent.fadeOut(400, function() {
		parent.remove();
	});
})
.on('blur','.ui-search .input',function(){
	$(this).parents('.ui-search').removeClass('in');
})
.on('mouseenter','.ui-radio',function(){
	$(this).addClass('ui-radio-hover');
})
.on('mouseleave','.ui-radio',function(){
	$(this).removeClass('ui-radio-hover');	
})
.on('click','.ui-radio input[type=radio]',function(){
	var parents = $(this).parents('.ui-item');
	var radios = parents.find('input[type=radio]');

	if(parents.hasClass('ui-radio-checked')) return;

	radios.each(function(index,that){
		if($(that).attr('checked') == 'checked'){
			$(that).parents('.ui-radio').addClass('ui-radio-checked');
		}else{
			$(that).parents('.ui-radio').removeClass('ui-radio-checked');
		}
	})
})
.on('click','.ui-follow,.ui-follow-easy',function(){
	var that = $(this),
	url = that.attr('url'),
	followed = that.hasClass('ed');

	if(!_Fn.isLogin()) return false;

	if(following) return false;

	following = true;
	animate.loading().show(that);
	$.ajax({
		url : url?url:'/user/follow',
		type : 'post',
		dataType:'json',
		success : function(res){
			animate.loading().hide(function(){
				following = false;
				if(res.code != 200){
					resultCall(res);
					return;
				}

				var isHasNum = $.trim(that.find('span').html());

				if(!followed){
					that.addClass('ed');
					if(isHasNum!='')
						that.find('span').html(parseInt(that.find('span').html())+1);

					if(that.hasClass('ui-follow-easy')){
						that.html('已关注');
					}
					if(that.hasClass('ui-follow')){
						that.html('<em></em>已关注');
					}
					animate.numberUp(that);
				}else{
					that.removeClass('ed');
					if(isHasNum!='')
						that.find('span').html(parseInt(that.find('span').html())-1);
					if(that.hasClass('ui-follow-easy')){
						that.html('<em><i>+</i></em>关注');
					}
					if(that.hasClass('ui-follow')){
						that.html('<em></em>关注');
					}
					animate.numberUp(that,{
						'color' : '#0080cc'
					},'-1');
				}

			});

		},
		error : function(){
			animate.loading().hide(function(){
				_Fn.alert('关注失败，请稍后尝试!');
				following = false;
			});
		}
	});
	
});

//for关闭消息提醒
$('#msg-tiplist').on('click','span.close',function(e){
	var _this =$(this),
	_parent = _this.parent(),
	msgid;

	if(_parent.length){
		msgid = _parent.data('id');
		_parent.remove();
		if(msgid>0){
			$.ajax({
				type:"post",
				data:{msgid:msgid},
				url:"/user/readmsg"
			})
		}
	}
	

})





},{"../modules/ajaxcodecall":4,"../modules/animate":5,"../modules/dialogUi":6,"../plugins/select":17}],13:[function(require,module,exports){
exports.create = function () {
    var S4 = function () {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4());
}
},{}],14:[function(require,module,exports){

exports.api = {
	useremail:function(val){ //邮箱验证
		var obj={};
		obj.ret = true;
		obj.message = '';
		$.ajax(
			{
				url:"/ajax/tyCheckemail",
				type:"post",
				async:false,
				data:"email="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	username:function(val){ //用户名验证
		var obj={};
		obj.ret = true;
		obj.message = '';

		$.ajax(
			{
				url:"/ajax/tyCheckusername",
				type:"post",
				async:false,
				data:"username="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	hasmobile:function(val){
		var obj={};
		obj.ret = true;
		obj.message = '';
		$.ajax(
			{
				url:"/ajax/tyCheckmobile",
				type:"post",
				async:false,
				data:"mobile="+val,
				success:function(res){
					if(res.code != 200){
						obj.ret = false;
					}
					obj.message = res.message;
				},
				error:function(){
					obj.ret = false;
				}
			}
		);
		return obj;
	},
	captcha:function(val){ //图形验证码
		var ret = true;
		$.ajax(
			{
				url:"/ajax/checkVcode",
				type:"post",
				async:false,
				data:"type=register&code="+val,
				success:function(res){
					if(res.code != 200){
						ret = false;
					}
				},
				error:function(){
					ret = false;
				}
			}
		);
		return ret;
	},
    httpregname:function(val){
		var ret = true;
		$.ajax(
			{
				url:"/activity/verifyUname?uname="+val,
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
	companyName:function(val){
		var obj={};
		obj.ret = true;
		obj.message = '';
		val = val.trim();
		val = encodeURI(val);
		$.ajax({
			url : "/member/getCompany?company_name="+val,
			async:false,
			success:function(res){
				if(res.code == 200){
					obj.message = res.data.id;
				}else{
					obj.ret = false;
				}
			},
			error:function(){
				obj.ret = false;
			}
		});
		return obj;
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
		if(new RegExp(reg).test(val))
			return true;
		return false;
	},
	number:function(val){
		if(/^\d+$/.test(val))
			return true;
		return false;
	},
	user_name:function(val){

	},
	times:function(val,radix){
		return val%radix == 0;
	},
	cn_or_en:function(val){
		var reg = /^([\u4E00-\u9FA5]|[a-zA-Z])+$/;
		if(reg.test(val))
			return true;
		return false;
	},
	firstplace_cn_or_num:function(val) {
		var reg = /^[\u4e00-\u9fa5|a-z|A-z]/i;
		if(reg.test(val))
			return true;
		return false;
	},
	floatNumber : function(val){
		var reg = /^\d+((\.{1}\d+)|\d?)$/;
		if(reg.test(val))
			return true;
		return false;
	},
	// 是数字或小数,小数最多可写两位小数
	numberFixed2 : function(val){
		var reg = /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/;
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
	// pwd : 密码校验规则，至少包含 数字/字母/符号 中的两种。
	pwd : function(val){
		var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{1,}$/;
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
	reg_cn_len2 : function(val,minlen,maxlen){
		var len = val.replace(/[^\x00-\xFF]/g,'**').length;
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

		if(/^(13\d|18\d|15\d|17\d|14\d|19\d|16\d)\d{8}$/.test(val))
			return true;
		return false;
	},
    notmobile:function(val){
		if(/1\d{10}/.test(val))
			return false;
		return true;
	},
	ID_card : function(val){
		val = $.trim(val);
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
	// 最大值 开区间
	numberMaxOpen : function(val,max){
		if(/\d+/.test(val)){
			val = val - 0;
			max = max - 0;
			return val < max;
		}else{
			return false;
		}
	},
	// 最大值 闭区间
	numberMaxClosed : function(val,max){
		if(/\d+/.test(val)){
			val = val - 0;
			max = max - 0;
			return val <= max;

		}else{
			return false;
		}
	},
	// 最小值 开区间
	numberMinOpen : function(val,min){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			return val > min;
		}else{
			return false;
		}
	},
	// 最小值 闭区间
	numberMinClosed : function(val,min){
		if(/\d+/.test(val)){
			val = val - 0;
			min = min - 0;
			return val >= min;
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
	},
	tyregistervcode:function(code){
		var ret = true;
		$.ajax(
            {
                url:"/ajax/checkVcode",
                type:"post",
                async:false,
                data:"type=register&code="+code,
                success:function(res){
                    if(res.code != 200){
                    	ret = false;
                    }
                },
                error:function(){
                	ret = false;
                }
            }
        );
        return ret;
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
				if(typeof(ret) == 'object'){
					if(ret.ret == false){
						validResult = {
							error:1,
							element:$item,
							valid:validFn,
							message:ret.message
						};
						break;
					}else if(ret.ret == true){
						validResult = {
							error:0,
							element:$item,
							valid:validFn,
							message:ret.message
						};
					}
				}else{
					if(ret == false){
						validResult = {
							error:1,
							element:$item,
							valid:validFn
						};
						break;
					}else{
						validResult = {
							error:0,
							element:$item,
							valid:validFn
						};
					}
				}

			}
		}
	}
	return validResult;
}
},{}],15:[function(require,module,exports){
var
dialogUi= require('../modules/dialogUi'),
statistics = require('../modules/statistics'),
resultCall = require('../modules/ajaxcodecall'),
template = require('../modules/template'),
// member = require('../modules/member_header'),
// bind = require('../modules/bind'),
ui = require('../modules/ui'),
// cookie = require('../modules/cookie'),
follow = require('../modules/follow'),
animate = require('../modules/animate'),
// cookie = require('../plugins/$.cookie'),
floatlayer = require('../modules/floatlayer');

// var
// mockHost = '/mockserver',
// mockVal = parseInt($('meta[name=p2peye_mock]').attr('content'));

var NOTICETITLE = [];
window.noticeTitle = function noticeTitle() {
	NOTICETITLE = {'State':0, 'oldTitle':document.title, flashNumber:0, sleep:15};
	window.setInterval(function(){
		noticeTitleFlash();
	}, 500);
}

function noticeTitleFlash() {
	if(NOTICETITLE.flashNumber < 5 || NOTICETITLE.flashNumber > 4 && !NOTICETITLE['State']) {
		document.title = (NOTICETITLE['State'] ? '【　　　】' : '【新提醒】') + NOTICETITLE['oldTitle'];
		NOTICETITLE['State'] = !NOTICETITLE['State'];
	}
	NOTICETITLE.flashNumber = NOTICETITLE.flashNumber < NOTICETITLE.sleep ? ++NOTICETITLE.flashNumber : 0;
}

window._Fn =  window._Fn  || {};
// document.domain = "nonglian.com";
window._Fn.track = statistics;

window._Fn.alert = function(text){
    $('.ui-alert').remove();
    var content = template.render('alertTpl',{text:text});
    $("body").append(content);
    var ele = $('.ui-alert');
    var left = ele.width()/2;
    ele.css("margin-left","-"+left+"px");
    ele.click(function(){
        ele.fadeOut();
    });
    setTimeout(function(){
        ele.fadeOut();
    },3000);
};
window._Fn.message = function(text){
    $('.ui-alert').remove();
    var content = template.render('messageTpl',{text:text});
    $("body").append(content);
    var ele = $('.ui-alert');
    var left = ele.width()/2;
    ele.css("margin-left","-"+left+"px");
    ele.click(function(){
        ele.fadeOut();
    });
    setTimeout(function(){
        ele.fadeOut();
    },3000);
};

window._Fn.navFixed = function(){
	return;

	var status = 1;

	var handle = function(){

		var nav = $('.header').eq(0);

		var clone = nav.clone();

		clone.addClass("pettyheader");

		$('body').append(clone);

		$(".pettyheader .logo img").attr("src","/styles/images/common/smalllogo.png");

		clone.css({
			width : '100%'
		});

		return {
			fixed : function(){
				clone.css({
					position:'fixed',
					left: 0,
					top:'-80px',
					display:"block"
				}).animate({
					top:0
				}, 500)
			},
			absolute : function(){
				clone.css({
					top:0
				}).css({
					top:'-80px',
					display:'none'
				}, 500)
			}
		}
	}();

	$(window).scroll(function(){

		var scrollTop = $(window).scrollTop();

		if(status == 1 && scrollTop > 200){
			status = 2;
			handle.fixed();
		}

		if(status == 2 && scrollTop <= 200){
			status = 1;
			handle.absolute();
		}
	})
};

window._Fn.loading = function(){

	return animate.circle();
}
window._Fn.loadingMulti = function(){
    return animate.circleMulti();
}
window._Fn.lightboxWrap = function(){

    var h=Math.max($('body').outerHeight(),$(window).height());

	if(!$('#lightbox_wrap').length){

        var lightbox = $('<div id="lightbox_wrap"></div>');

        lightbox.css({

            'width':'100%',

            'height':h

        }).appendTo($('body'));

    }else{

        var lightbox = $('#lightbox_wrap');

        lightbox.fadeIn();

    }
}
/*

arg :
{
	text : '',
	confirm: fn,
	cancel : fn,
	confirmText : 'yes',
	cancelText : 'no'
}
 */
window._Fn.confirm = function(options){
    var time = new Date().getTime();
    var data = {
    	text : options.text ? options.text : null,
    	confirmText : options.confirmText ? options.confirmText : null,
    	cancelText : options.cancelText ? options.cancelText : null
    };
    var content = template.render('confirmTpl',data);
    $("body").append(content);
    var ele = $('.ui-confirm');
    var left = ele.width()/2;
    ele.css("margin-left","-"+left+"px");
    ele.attr('id','confirm_'+time);

    var

    confirm = $('#confirm_'+time).find('.confirm'),
    cancel = $('#confirm_'+time).find('.cancel');

    confirm.click(function(){
		$('#confirm_'+time).fadeOut(400,function(){
			$('#confirm_'+time).remove();
		});
		if(options.confirm){
    		options.confirm();
		}
	});
	confirm.mouseenter(function(event) {
		$(this).addClass('current');
	});
	confirm.mouseleave(function(event) {
		$(this).removeClass('current');
	});

	cancel.click(function(){
		$('#confirm_'+time).fadeOut(400,function(){
			$('#confirm_'+time).remove();
		});
		if(options.cancel){
    		options.cancel();
		}
	});
    cancel.mouseenter(function(event) {
		$(this).addClass('current');
	});
	cancel.mouseleave(function(event) {
		$(this).removeClass('current');
	});

};

$('body')
.on('click','[role=readmore]',function(){
	var that = $(this);
	getMore(that);
	return false;
})
.on('click','.mod-floatlayer .home',function(){
	$('body,html').animate({
		scrollTop : 0
	}, 500)
});
window._Fn = _Fn;

},{"../modules/ajaxcodecall":4,"../modules/animate":5,"../modules/dialogUi":6,"../modules/floatlayer":7,"../modules/follow":8,"../modules/statistics":10,"../modules/template":11,"../modules/ui":12}],16:[function(require,module,exports){
var
app = require('./app'),
dialogUi = require('../modules/dialogUi'),
template = require('../modules/template'),
formMod = require('../modules/form'),
animate = require('../modules/animate'),
datajson=$("form.login-form").serialize(),
floatlayer = require('../modules/floatlayer');
formMod.listen('login.php',{
    ajaxBefore:function(){

    },
    validSuccess:function(validResutl){    },
    validError:function(validResutl){
        var item  = validResutl.element;
        var prompt = item.parents('[role-prompt=login]').find('[role-prompt=info]');
        var promptText = prompt.find('span');
        prompt.show();
        if(item.attr('name')=='username'){
            if(validResutl.valid == 'notempty'){
                promptText.html('用户名或手机号不能为空！');
            }
        }
        if(item.attr('name')=='password'){
            if(validResutl.valid == 'notempty'){
                promptText.html('密码长度为6-20个字符!');
            }else if(validResutl.valid == 'pwd'){
                promptText.html('密码必须至少包含数字/字母/符号中的两种!');
            }
        }

    },
    cleanup:function(item){

        $('[role-prompt=info]').hide();

    },
    success:function(result){

        var res = result.data;
        if(res.code == 200){
            window.location.href = res.data.url;
        }else{
            _Fn.alert(res.message);

        }
    },
    error:function(){
        window._Fn.alert("网络异常,请稍后刷新重试");
    }

});
},{"../modules/animate":5,"../modules/dialogUi":6,"../modules/floatlayer":7,"../modules/form":9,"../modules/template":11,"./app":15}],17:[function(require,module,exports){
/**jquery.mCustomScrollbar.concat**/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b)["offsetParent"in a.fn?"offsetParent":"parent"]();return c.length||(c=a("body")),parseInt(c.css("fontSize"),10)},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.0.2, License: MIT License (MIT) */
(function(h,l,m,d){var e="mCustomScrollbar",a="mCS",k=".mCustomScrollbar",f={setWidth:false,setHeight:false,setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:true,autoHideScrollbar:false,autoExpandScrollbar:false,alwaysShowScrollbar:0,snapAmount:null,snapOffset:0,mouseWheel:{enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false,disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{enable:false,scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:true,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,advanced:{autoExpandHorizontalScroll:false,autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:true,updateOnImageLoad:true,updateOnSelectorChange:false},theme:"light",callbacks:{onScrollStart:false,onScroll:false,onTotalScroll:false,onTotalScrollBack:false,whileScrolling:false,onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:true},live:false,liveSelector:null},j=0,o={},c=function(p){if(o[p]){clearTimeout(o[p]);g._delete.call(null,o[p])}},i=(l.attachEvent&&!l.addEventListener)?1:0,n=false,b={init:function(q){var q=h.extend(true,{},f,q),p=g._selector.call(this);if(q.live){var s=q.liveSelector||this.selector||k,r=h(s);if(q.live==="off"){c(s);return}o[s]=setTimeout(function(){r.mCustomScrollbar(q);if(q.live==="once"&&r.length){c(s)}},500)}else{c(s)}q.setWidth=(q.set_width)?q.set_width:q.setWidth;q.setHeight=(q.set_height)?q.set_height:q.setHeight;q.axis=(q.horizontalScroll)?"x":g._findAxis.call(null,q.axis);q.scrollInertia=q.scrollInertia<17?17:q.scrollInertia;if(typeof q.mouseWheel!=="object"&&q.mouseWheel==true){q.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}}q.mouseWheel.scrollAmount=!q.mouseWheelPixels?q.mouseWheel.scrollAmount:q.mouseWheelPixels;q.mouseWheel.normalizeDelta=!q.advanced.normalizeMouseWheelDelta?q.mouseWheel.normalizeDelta:q.advanced.normalizeMouseWheelDelta;q.scrollButtons.scrollType=g._findScrollButtonsType.call(null,q.scrollButtons.scrollType);g._theme.call(null,q);return h(p).each(function(){var u=h(this);if(!u.data(a)){u.data(a,{idx:++j,opt:q,scrollRatio:{y:null,x:null},overflowed:null,bindEvents:false,tweenRunning:false,sequential:{},langDir:u.css("direction"),cbOffsets:null,trigger:null});var w=u.data(a).opt,v=u.data("mcs-axis"),t=u.data("mcs-scrollbar-position"),x=u.data("mcs-theme");if(v){w.axis=v}if(t){w.scrollbarPosition=t}if(x){w.theme=x;g._theme.call(null,w)}g._pluginMarkup.call(this);b.update.call(null,u)}})},update:function(q){var p=q||g._selector.call(this);return h(p).each(function(){var t=h(this);if(t.data(a)){var v=t.data(a),u=v.opt,r=h("#mCSB_"+v.idx+"_container"),s=[h("#mCSB_"+v.idx+"_dragger_vertical"),h("#mCSB_"+v.idx+"_dragger_horizontal")];if(!r.length){return}if(v.tweenRunning){g._stop.call(null,t)}if(t.hasClass("mCS_disabled")){t.removeClass("mCS_disabled")}if(t.hasClass("mCS_destroyed")){t.removeClass("mCS_destroyed")}g._maxHeight.call(this);g._expandContentHorizontally.call(this);if(u.axis!=="y"&&!u.advanced.autoExpandHorizontalScroll){r.css("width",g._contentWidth(r.children()))}v.overflowed=g._overflowed.call(this);g._scrollbarVisibility.call(this);if(u.autoDraggerLength){g._setDraggerLength.call(this)}g._scrollRatio.call(this);g._bindEvents.call(this);var w=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];if(u.axis!=="x"){if(!v.overflowed[0]){g._resetContentPosition.call(this);if(u.axis==="y"){g._unbindEvents.call(this)}else{if(u.axis==="yx"&&v.overflowed[1]){g._scrollTo.call(this,t,w[1].toString(),{dir:"x",dur:0,overwrite:"none"})}}}else{if(s[0].height()>s[0].parent().height()){g._resetContentPosition.call(this)}else{g._scrollTo.call(this,t,w[0].toString(),{dir:"y",dur:0,overwrite:"none"})}}}if(u.axis!=="y"){if(!v.overflowed[1]){g._resetContentPosition.call(this);if(u.axis==="x"){g._unbindEvents.call(this)}else{if(u.axis==="yx"&&v.overflowed[0]){g._scrollTo.call(this,t,w[0].toString(),{dir:"y",dur:0,overwrite:"none"})}}}else{if(s[1].width()>s[1].parent().width()){g._resetContentPosition.call(this)}else{g._scrollTo.call(this,t,w[1].toString(),{dir:"x",dur:0,overwrite:"none"})}}}g._autoUpdate.call(this)}})},scrollTo:function(r,q){if(typeof r=="undefined"||r==null){return}var p=g._selector.call(this);return h(p).each(function(){var u=h(this);if(u.data(a)){var x=u.data(a),w=x.opt,v={trigger:"external",scrollInertia:w.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:false,callbacks:true,onStart:true,onUpdate:true,onComplete:true},s=h.extend(true,{},v,q),y=g._arr.call(this,r),t=s.scrollInertia<17?17:s.scrollInertia;y[0]=g._to.call(this,y[0],"y");y[1]=g._to.call(this,y[1],"x");if(s.moveDragger){y[0]*=x.scrollRatio.y;y[1]*=x.scrollRatio.x}s.dur=t;setTimeout(function(){if(y[0]!==null&&typeof y[0]!=="undefined"&&w.axis!=="x"&&x.overflowed[0]){s.dir="y";s.overwrite="all";g._scrollTo.call(this,u,y[0].toString(),s)}if(y[1]!==null&&typeof y[1]!=="undefined"&&w.axis!=="y"&&x.overflowed[1]){s.dir="x";s.overwrite="none";g._scrollTo.call(this,u,y[1].toString(),s)}},60)}})},stop:function(){var p=g._selector.call(this);return h(p).each(function(){var q=h(this);if(q.data(a)){g._stop.call(null,q)}})},disable:function(q){var p=g._selector.call(this);return h(p).each(function(){var r=h(this);if(r.data(a)){var t=r.data(a),s=t.opt;g._autoUpdate.call(this,"remove");g._unbindEvents.call(this);if(q){g._resetContentPosition.call(this)}g._scrollbarVisibility.call(this,true);r.addClass("mCS_disabled")}})},destroy:function(){var p=g._selector.call(this);return h(p).each(function(){var s=h(this);if(s.data(a)){var u=s.data(a),t=u.opt,q=h("#mCSB_"+u.idx),r=h("#mCSB_"+u.idx+"_container"),v=h(".mCSB_"+u.idx+"_scrollbar");if(t.live){c(p)}g._autoUpdate.call(this,"remove");g._unbindEvents.call(this);g._resetContentPosition.call(this);s.removeData(a);g._delete.call(null,this.mcs);v.remove();q.replaceWith(r.contents());s.removeClass(e+" _"+a+"_"+u.idx+" mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed")}})}},g={_selector:function(){return(typeof h(this)!=="object"||h(this).length<1)?k:this},_theme:function(s){var r=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],q=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],p=["minimal","minimal-dark"],u=["minimal","minimal-dark"],t=["minimal","minimal-dark"];s.autoDraggerLength=h.inArray(s.theme,r)>-1?false:s.autoDraggerLength;s.autoExpandScrollbar=h.inArray(s.theme,q)>-1?false:s.autoExpandScrollbar;s.scrollButtons.enable=h.inArray(s.theme,p)>-1?false:s.scrollButtons.enable;s.autoHideScrollbar=h.inArray(s.theme,u)>-1?true:s.autoHideScrollbar;s.scrollbarPosition=h.inArray(s.theme,t)>-1?"outside":s.scrollbarPosition},_findAxis:function(p){return(p==="yx"||p==="xy"||p==="auto")?"yx":(p==="x"||p==="horizontal")?"x":"y"},_findScrollButtonsType:function(p){return(p==="stepped"||p==="pixels"||p==="step"||p==="click")?"stepped":"stepless"},_pluginMarkup:function(){var y=h(this),x=y.data(a),r=x.opt,t=r.autoExpandScrollbar?" mCSB_scrollTools_onDrag_expand":"",B=["<div id='mCSB_"+x.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+x.idx+"_scrollbar mCS-"+r.theme+" mCSB_scrollTools_vertical"+t+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+x.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+x.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+x.idx+"_scrollbar mCS-"+r.theme+" mCSB_scrollTools_horizontal"+t+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+x.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],u=r.axis==="yx"?"mCSB_vertical_horizontal":r.axis==="x"?"mCSB_horizontal":"mCSB_vertical",w=r.axis==="yx"?B[0]+B[1]:r.axis==="x"?B[1]:B[0],v=r.axis==="yx"?"<div id='mCSB_"+x.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",s=r.autoHideScrollbar?" mCS-autoHide":"",p=(r.axis!=="x"&&x.langDir==="rtl")?" mCS-dir-rtl":"";if(r.setWidth){y.css("width",r.setWidth)}if(r.setHeight){y.css("height",r.setHeight)}r.setLeft=(r.axis!=="y"&&x.langDir==="rtl")?"989999px":r.setLeft;y.addClass(e+" _"+a+"_"+x.idx+s+p).wrapInner("<div id='mCSB_"+x.idx+"' class='mCustomScrollBox mCS-"+r.theme+" "+u+"'><div id='mCSB_"+x.idx+"_container' class='mCSB_container' style='position:relative; top:"+r.setTop+"; left:"+r.setLeft+";' dir="+x.langDir+" /></div>");var q=h("#mCSB_"+x.idx),z=h("#mCSB_"+x.idx+"_container");if(r.axis!=="y"&&!r.advanced.autoExpandHorizontalScroll){z.css("width",g._contentWidth(z.children()))}if(r.scrollbarPosition==="outside"){if(y.css("position")==="static"){y.css("position","relative")}y.css("overflow","visible");q.addClass("mCSB_outside").after(w)}else{q.addClass("mCSB_inside").append(w);z.wrap(v)}g._scrollButtons.call(this);var A=[h("#mCSB_"+x.idx+"_dragger_vertical"),h("#mCSB_"+x.idx+"_dragger_horizontal")];A[0].css("min-height",A[0].height());A[1].css("min-width",A[1].width())},_contentWidth:function(p){return Math.max.apply(Math,p.map(function(){return h(this).outerWidth(true)}).get())},_expandContentHorizontally:function(){var q=h(this),s=q.data(a),r=s.opt,p=h("#mCSB_"+s.idx+"_container");if(r.advanced.autoExpandHorizontalScroll&&r.axis!=="y"){p.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:(Math.ceil(p[0].getBoundingClientRect().right+0.4)-Math.floor(p[0].getBoundingClientRect().left)),position:"relative"}).unwrap()}},_scrollButtons:function(){var s=h(this),u=s.data(a),t=u.opt,q=h(".mCSB_"+u.idx+"_scrollbar:first"),r=["<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"],p=[(t.axis==="x"?r[2]:r[0]),(t.axis==="x"?r[3]:r[1]),r[2],r[3]];if(t.scrollButtons.enable){q.prepend(p[0]).append(p[1]).next(".mCSB_scrollTools").prepend(p[2]).append(p[3])}},_maxHeight:function(){var t=h(this),w=t.data(a),v=w.opt,r=h("#mCSB_"+w.idx),q=t.css("max-height"),s=q.indexOf("%")!==-1,p=t.css("box-sizing");if(q!=="none"){var u=s?t.parent().height()*parseInt(q)/100:parseInt(q);if(p==="border-box"){u-=((t.innerHeight()-t.height())+(t.outerHeight()-t.innerHeight()))}r.css("max-height",Math.round(u))}},_setDraggerLength:function(){var u=h(this),s=u.data(a),p=h("#mCSB_"+s.idx),v=h("#mCSB_"+s.idx+"_container"),y=[h("#mCSB_"+s.idx+"_dragger_vertical"),h("#mCSB_"+s.idx+"_dragger_horizontal")],t=[p.height()/v.outerHeight(false),p.width()/v.outerWidth(false)],q=[parseInt(y[0].css("min-height")),Math.round(t[0]*y[0].parent().height()),parseInt(y[1].css("min-width")),Math.round(t[1]*y[1].parent().width())],r=i&&(q[1]<q[0])?q[0]:q[1],x=i&&(q[3]<q[2])?q[2]:q[3];y[0].css({height:r,"max-height":(y[0].parent().height()-10)}).find(".mCSB_dragger_bar").css({"line-height":q[0]+"px"});y[1].css({width:x,"max-width":(y[1].parent().width()-10)})},_scrollRatio:function(){var t=h(this),v=t.data(a),q=h("#mCSB_"+v.idx),r=h("#mCSB_"+v.idx+"_container"),s=[h("#mCSB_"+v.idx+"_dragger_vertical"),h("#mCSB_"+v.idx+"_dragger_horizontal")],u=[r.outerHeight(false)-q.height(),r.outerWidth(false)-q.width()],p=[u[0]/(s[0].parent().height()-s[0].height()),u[1]/(s[1].parent().width()-s[1].width())];v.scrollRatio={y:p[0],x:p[1]}},_onDragClasses:function(r,t,q){var s=q?"mCSB_dragger_onDrag_expanded":"",p=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag"],u=r.closest(".mCSB_scrollTools");if(t==="active"){r.toggleClass(p[0]+" "+s);u.toggleClass(p[1]);r[0]._draggable=r[0]._draggable?0:1}else{if(!r[0]._draggable){if(t==="hide"){r.removeClass(p[0]);u.removeClass(p[1])}else{r.addClass(p[0]);u.addClass(p[1])}}}},_overflowed:function(){var t=h(this),u=t.data(a),q=h("#mCSB_"+u.idx),s=h("#mCSB_"+u.idx+"_container"),r=u.overflowed==null?s.height():s.outerHeight(false),p=u.overflowed==null?s.width():s.outerWidth(false);return[r>q.height(),p>q.width()]},_resetContentPosition:function(){var t=h(this),v=t.data(a),u=v.opt,q=h("#mCSB_"+v.idx),r=h("#mCSB_"+v.idx+"_container"),s=[h("#mCSB_"+v.idx+"_dragger_vertical"),h("#mCSB_"+v.idx+"_dragger_horizontal")];g._stop(t);if((u.axis!=="x"&&!v.overflowed[0])||(u.axis==="y"&&v.overflowed[0])){s[0].add(r).css("top",0)}if((u.axis!=="y"&&!v.overflowed[1])||(u.axis==="x"&&v.overflowed[1])){var p=dx=0;if(v.langDir==="rtl"){p=q.width()-r.outerWidth(false);dx=Math.abs(p/v.scrollRatio.x)}r.css("left",p);s[1].css("left",dx)}},_bindEvents:function(){var r=h(this),t=r.data(a),s=t.opt;if(!t.bindEvents){g._draggable.call(this);if(s.contentTouchScroll){g._contentDraggable.call(this)}if(s.mouseWheel.enable){function q(){p=setTimeout(function(){if(!h.event.special.mousewheel){q()}else{clearTimeout(p);g._mousewheel.call(r[0])}},1000)}var p;q()}g._draggerRail.call(this);g._wrapperScroll.call(this);if(s.advanced.autoScrollOnFocus){g._focus.call(this)}if(s.scrollButtons.enable){g._buttons.call(this)}if(s.keyboard.enable){g._keyboard.call(this)}t.bindEvents=true}},_unbindEvents:function(){var s=h(this),t=s.data(a),p=a+"_"+t.idx,u=".mCSB_"+t.idx+"_scrollbar",r=h("#mCSB_"+t.idx+",#mCSB_"+t.idx+"_container,#mCSB_"+t.idx+"_container_wrapper,"+u+" .mCSB_draggerContainer,#mCSB_"+t.idx+"_dragger_vertical,#mCSB_"+t.idx+"_dragger_horizontal,"+u+">a"),q=h("#mCSB_"+t.idx+"_container");if(t.bindEvents){h(m).unbind("."+p);r.each(function(){h(this).unbind("."+p)});clearTimeout(s[0]._focusTimeout);g._delete.call(null,s[0]._focusTimeout);clearTimeout(t.sequential.step);g._delete.call(null,t.sequential.step);clearTimeout(q[0].onCompleteTimeout);g._delete.call(null,q[0].onCompleteTimeout);t.bindEvents=false}},_scrollbarVisibility:function(q){var t=h(this),v=t.data(a),u=v.opt,p=h("#mCSB_"+v.idx+"_container_wrapper"),r=p.length?p:h("#mCSB_"+v.idx+"_container"),w=[h("#mCSB_"+v.idx+"_scrollbar_vertical"),h("#mCSB_"+v.idx+"_scrollbar_horizontal")],s=[w[0].find(".mCSB_dragger"),w[1].find(".mCSB_dragger")];if(u.axis!=="x"){if(v.overflowed[0]&&!q){w[0].add(s[0]).add(w[0].children("a")).css("display","block");r.removeClass("mCS_no_scrollbar_y mCS_y_hidden")}else{if(u.alwaysShowScrollbar){if(u.alwaysShowScrollbar!==2){s[0].add(w[0].children("a")).css("display","none")}r.removeClass("mCS_y_hidden")}else{w[0].css("display","none");r.addClass("mCS_y_hidden")}r.addClass("mCS_no_scrollbar_y")}}if(u.axis!=="y"){if(v.overflowed[1]&&!q){w[1].add(s[1]).add(w[1].children("a")).css("display","block");r.removeClass("mCS_no_scrollbar_x mCS_x_hidden")}else{if(u.alwaysShowScrollbar){if(u.alwaysShowScrollbar!==2){s[1].add(w[1].children("a")).css("display","none")}r.removeClass("mCS_x_hidden")}else{w[1].css("display","none");r.addClass("mCS_x_hidden")}r.addClass("mCS_no_scrollbar_x")}}if(!v.overflowed[0]&&!v.overflowed[1]){t.addClass("mCS_no_scrollbar")}else{t.removeClass("mCS_no_scrollbar")}},_coordinates:function(q){var p=q.type;switch(p){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return[q.originalEvent.pageY,q.originalEvent.pageX];break;case"touchstart":case"touchmove":case"touchend":var r=q.originalEvent.touches[0]||q.originalEvent.changedTouches[0];return[r.pageY,r.pageX];break;default:return[q.pageY,q.pageX]}},_draggable:function(){var u=h(this),s=u.data(a),p=s.opt,r=a+"_"+s.idx,t=["mCSB_"+s.idx+"_dragger_vertical","mCSB_"+s.idx+"_dragger_horizontal"],v=h("#mCSB_"+s.idx+"_container"),w=h("#"+t[0]+",#"+t[1]),A,y,z;w.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r,function(E){E.stopImmediatePropagation();E.preventDefault();if(!g._mouseBtnLeft(E)){return}n=true;if(i){m.onselectstart=function(){return false}}x(false);g._stop(u);A=h(this);var F=A.offset(),G=g._coordinates(E)[0]-F.top,B=g._coordinates(E)[1]-F.left,D=A.height()+F.top,C=A.width()+F.left;if(G<D&&G>0&&B<C&&B>0){y=G;z=B}g._onDragClasses(A,"active",p.autoExpandScrollbar)}).bind("touchmove."+r,function(C){C.stopImmediatePropagation();C.preventDefault();var D=A.offset(),E=g._coordinates(C)[0]-D.top,B=g._coordinates(C)[1]-D.left;q(y,z,E,B)});h(m).bind("mousemove."+r+" pointermove."+r+" MSPointerMove."+r,function(C){if(A){var D=A.offset(),E=g._coordinates(C)[0]-D.top,B=g._coordinates(C)[1]-D.left;if(y===E){return}q(y,z,E,B)}}).add(w).bind("mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r,function(B){if(A){g._onDragClasses(A,"active",p.autoExpandScrollbar);A=null}n=false;if(i){m.onselectstart=null}x(true)});function x(B){var C=v.find("iframe");if(!C.length){return}var D=!B?"none":"auto";C.css("pointer-events",D)}function q(D,E,G,B){v[0].idleTimer=p.scrollInertia<233?250:0;if(A.attr("id")===t[1]){var C="x",F=((A[0].offsetLeft-E)+B)*s.scrollRatio.x}else{var C="y",F=((A[0].offsetTop-D)+G)*s.scrollRatio.y}g._scrollTo(u,F.toString(),{dir:C,drag:true})}},_contentDraggable:function(){var y=h(this),K=y.data(a),I=K.opt,F=a+"_"+K.idx,v=h("#mCSB_"+K.idx),z=h("#mCSB_"+K.idx+"_container"),w=[h("#mCSB_"+K.idx+"_dragger_vertical"),h("#mCSB_"+K.idx+"_dragger_horizontal")],E,G,L,M,C=[],D=[],H,A,u,t,J,x,r=0,q,s=I.axis==="yx"?"none":"all";z.bind("touchstart."+F+" pointerdown."+F+" MSPointerDown."+F,function(N){if(!g._pointerTouch(N)||n){return}var O=z.offset();E=g._coordinates(N)[0]-O.top;G=g._coordinates(N)[1]-O.left}).bind("touchmove."+F+" pointermove."+F+" MSPointerMove."+F,function(Q){if(!g._pointerTouch(Q)||n){return}Q.stopImmediatePropagation();A=g._getTime();var P=v.offset(),S=g._coordinates(Q)[0]-P.top,U=g._coordinates(Q)[1]-P.left,R="mcsLinearOut";C.push(S);D.push(U);if(K.overflowed[0]){var O=w[0].parent().height()-w[0].height(),T=((E-S)>0&&(S-E)>-(O*K.scrollRatio.y))}if(K.overflowed[1]){var N=w[1].parent().width()-w[1].width(),V=((G-U)>0&&(U-G)>-(N*K.scrollRatio.x))}if(T||V){Q.preventDefault()}x=I.axis==="yx"?[(E-S),(G-U)]:I.axis==="x"?[null,(G-U)]:[(E-S),null];z[0].idleTimer=250;if(K.overflowed[0]){B(x[0],r,R,"y","all",true)}if(K.overflowed[1]){B(x[1],r,R,"x",s,true)}});v.bind("touchstart."+F+" pointerdown."+F+" MSPointerDown."+F,function(N){if(!g._pointerTouch(N)||n){return}N.stopImmediatePropagation();g._stop(y);H=g._getTime();var O=v.offset();L=g._coordinates(N)[0]-O.top;M=g._coordinates(N)[1]-O.left;C=[];D=[]}).bind("touchend."+F+" pointerup."+F+" MSPointerUp."+F,function(P){if(!g._pointerTouch(P)||n){return}P.stopImmediatePropagation();u=g._getTime();var N=v.offset(),T=g._coordinates(P)[0]-N.top,V=g._coordinates(P)[1]-N.left;if((u-A)>30){return}J=1000/(u-H);var Q="mcsEaseOut",R=J<2.5,W=R?[C[C.length-2],D[D.length-2]]:[0,0];t=R?[(T-W[0]),(V-W[1])]:[T-L,V-M];var O=[Math.abs(t[0]),Math.abs(t[1])];J=R?[Math.abs(t[0]/4),Math.abs(t[1]/4)]:[J,J];var U=[Math.abs(z[0].offsetTop)-(t[0]*p((O[0]/J[0]),J[0])),Math.abs(z[0].offsetLeft)-(t[1]*p((O[1]/J[1]),J[1]))];x=I.axis==="yx"?[U[0],U[1]]:I.axis==="x"?[null,U[1]]:[U[0],null];q=[(O[0]*4)+I.scrollInertia,(O[1]*4)+I.scrollInertia];var S=parseInt(I.contentTouchScroll)||0;x[0]=O[0]>S?x[0]:0;x[1]=O[1]>S?x[1]:0;if(K.overflowed[0]){B(x[0],q[0],Q,"y",s,false)}if(K.overflowed[1]){B(x[1],q[1],Q,"x",s,false)}});function p(P,N){var O=[N*1.5,N*2,N/1.5,N/2];if(P>90){return N>4?O[0]:O[3]}else{if(P>60){return N>3?O[3]:O[2]}else{if(P>30){return N>8?O[1]:N>6?O[0]:N>4?N:O[2]}else{return N>8?N:O[3]}}}}function B(P,R,S,O,N,Q){if(!P){return}g._scrollTo(y,P.toString(),{dur:R,scrollEasing:S,dir:O,overwrite:N,drag:Q})}},_mousewheel:function(){var s=h(this),u=s.data(a),t=u.opt,q=a+"_"+u.idx,p=h("#mCSB_"+u.idx),r=[h("#mCSB_"+u.idx+"_dragger_vertical"),h("#mCSB_"+u.idx+"_dragger_horizontal")];p.bind("mousewheel."+q,function(z,D){g._stop(s);if(g._disableMousewheel(s,z.target)){return}var B=t.mouseWheel.deltaFactor!=="auto"?parseInt(t.mouseWheel.deltaFactor):(i&&z.deltaFactor<100)?100:z.deltaFactor<40?40:z.deltaFactor||100;if(t.axis==="x"||t.mouseWheel.axis==="x"){var w="x",C=[Math.round(B*u.scrollRatio.x),parseInt(t.mouseWheel.scrollAmount)],y=t.mouseWheel.scrollAmount!=="auto"?C[1]:C[0]>=p.width()?p.width()*0.9:C[0],E=Math.abs(h("#mCSB_"+u.idx+"_container")[0].offsetLeft),A=r[1][0].offsetLeft,x=r[1].parent().width()-r[1].width(),v=z.deltaX||z.deltaY||D}else{var w="y",C=[Math.round(B*u.scrollRatio.y),parseInt(t.mouseWheel.scrollAmount)],y=t.mouseWheel.scrollAmount!=="auto"?C[1]:C[0]>=p.height()?p.height()*0.9:C[0],E=Math.abs(h("#mCSB_"+u.idx+"_container")[0].offsetTop),A=r[0][0].offsetTop,x=r[0].parent().height()-r[0].height(),v=z.deltaY||D}if((w==="y"&&!u.overflowed[0])||(w==="x"&&!u.overflowed[1])){return}if(t.mouseWheel.invert){v=-v}if(t.mouseWheel.normalizeDelta){v=v<0?-1:1}if((v>0&&A!==0)||(v<0&&A!==x)||t.mouseWheel.preventDefault){z.stopImmediatePropagation();z.preventDefault()}g._scrollTo(s,(E-(v*y)).toString(),{dir:w})})},_disableMousewheel:function(r,t){var p=t.nodeName.toLowerCase(),q=r.data(a).opt.mouseWheel.disableOver,s=["select","textarea"];return h.inArray(p,q)>-1&&!(h.inArray(p,s)>-1&&!h(t).is(":focus"))},_draggerRail:function(){var s=h(this),t=s.data(a),q=a+"_"+t.idx,r=h("#mCSB_"+t.idx+"_container"),u=r.parent(),p=h(".mCSB_"+t.idx+"_scrollbar .mCSB_draggerContainer");p.bind("touchstart."+q+" pointerdown."+q+" MSPointerDown."+q,function(v){n=true}).bind("touchend."+q+" pointerup."+q+" MSPointerUp."+q,function(v){n=false}).bind("click."+q,function(z){if(h(z.target).hasClass("mCSB_draggerContainer")||h(z.target).hasClass("mCSB_draggerRail")){g._stop(s);var w=h(this),y=w.find(".mCSB_dragger");if(w.parent(".mCSB_scrollTools_horizontal").length>0){if(!t.overflowed[1]){return}var v="x",x=z.pageX>y.offset().left?-1:1,A=Math.abs(r[0].offsetLeft)-(x*(u.width()*0.9))}else{if(!t.overflowed[0]){return}var v="y",x=z.pageY>y.offset().top?-1:1,A=Math.abs(r[0].offsetTop)-(x*(u.height()*0.9))}g._scrollTo(s,A.toString(),{dir:v,scrollEasing:"mcsEaseInOut"})}})},_focus:function(){var r=h(this),t=r.data(a),s=t.opt,p=a+"_"+t.idx,q=h("#mCSB_"+t.idx+"_container"),u=q.parent();q.bind("focusin."+p,function(x){var w=h(m.activeElement),y=q.find(".mCustomScrollBox").length,v=0;if(!w.is(s.advanced.autoScrollOnFocus)){return}g._stop(r);clearTimeout(r[0]._focusTimeout);r[0]._focusTimer=y?(v+17)*y:0;r[0]._focusTimeout=setTimeout(function(){var C=[w.offset().top-q.offset().top,w.offset().left-q.offset().left],B=[q[0].offsetTop,q[0].offsetLeft],z=[(B[0]+C[0]>=0&&B[0]+C[0]<u.height()-w.outerHeight(false)),(B[1]+C[1]>=0&&B[0]+C[1]<u.width()-w.outerWidth(false))],A=(s.axis==="yx"&&!z[0]&&!z[1])?"none":"all";if(s.axis!=="x"&&!z[0]){g._scrollTo(r,C[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:A,dur:v})}if(s.axis!=="y"&&!z[1]){g._scrollTo(r,C[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:A,dur:v})}},r[0]._focusTimer)})},_wrapperScroll:function(){var q=h(this),r=q.data(a),p=a+"_"+r.idx,s=h("#mCSB_"+r.idx+"_container").parent();s.bind("scroll."+p,function(t){s.scrollTop(0).scrollLeft(0)})},_buttons:function(){var u=h(this),w=u.data(a),v=w.opt,p=w.sequential,r=a+"_"+w.idx,t=h("#mCSB_"+w.idx+"_container"),s=".mCSB_"+w.idx+"_scrollbar",q=h(s+">a");q.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(z){z.preventDefault();if(!g._mouseBtnLeft(z)){return}var y=h(this).attr("class");p.type=v.scrollButtons.scrollType;switch(z.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if(p.type==="stepped"){return}n=true;w.tweenRunning=false;x("on",y);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if(p.type==="stepped"){return}n=false;if(p.dir){x("off",y)}break;case"click":if(p.type!=="stepped"||w.tweenRunning){return}x("on",y);break}function x(A,B){p.scrollAmount=v.snapAmount||v.scrollButtons.scrollAmount;g._sequentialScroll.call(this,u,A,B)}})},_keyboard:function(){var u=h(this),t=u.data(a),q=t.opt,x=t.sequential,s=a+"_"+t.idx,r=h("#mCSB_"+t.idx),w=h("#mCSB_"+t.idx+"_container"),p=w.parent(),v="input,textarea,select,datalist,keygen,[contenteditable='true']";r.attr("tabindex","0").bind("blur."+s+" keydown."+s+" keyup."+s,function(D){switch(D.type){case"blur":if(t.tweenRunning&&x.dir){y("off",null)}break;case"keydown":case"keyup":var A=D.keyCode?D.keyCode:D.which,B="on";if((q.axis!=="x"&&(A===38||A===40))||(q.axis!=="y"&&(A===37||A===39))){if(((A===38||A===40)&&!t.overflowed[0])||((A===37||A===39)&&!t.overflowed[1])){return}if(D.type==="keyup"){B="off"}if(!h(m.activeElement).is(v)){D.preventDefault();D.stopImmediatePropagation();y(B,A)}}else{if(A===33||A===34){if(t.overflowed[0]||t.overflowed[1]){D.preventDefault();D.stopImmediatePropagation()}if(D.type==="keyup"){g._stop(u);var C=A===34?-1:1;if(q.axis==="x"||(q.axis==="yx"&&t.overflowed[1]&&!t.overflowed[0])){var z="x",E=Math.abs(w[0].offsetLeft)-(C*(p.width()*0.9))}else{var z="y",E=Math.abs(w[0].offsetTop)-(C*(p.height()*0.9))}g._scrollTo(u,E.toString(),{dir:z,scrollEasing:"mcsEaseInOut"})}}else{if(A===35||A===36){if(!h(m.activeElement).is(v)){if(t.overflowed[0]||t.overflowed[1]){D.preventDefault();D.stopImmediatePropagation()}if(D.type==="keyup"){if(q.axis==="x"||(q.axis==="yx"&&t.overflowed[1]&&!t.overflowed[0])){var z="x",E=A===35?Math.abs(p.width()-w.outerWidth(false)):0}else{var z="y",E=A===35?Math.abs(p.height()-w.outerHeight(false)):0}g._scrollTo(u,E.toString(),{dir:z,scrollEasing:"mcsEaseInOut"})}}}}}break}function y(F,G){x.type=q.keyboard.scrollType;x.scrollAmount=q.snapAmount||q.keyboard.scrollAmount;if(x.type==="stepped"&&t.tweenRunning){return}g._sequentialScroll.call(this,u,F,G)}})},_sequentialScroll:function(r,u,s){var w=r.data(a),q=w.opt,y=w.sequential,x=h("#mCSB_"+w.idx+"_container"),p=y.type==="stepped"?true:false;switch(u){case"on":y.dir=[(s==="mCSB_buttonRight"||s==="mCSB_buttonLeft"||s===39||s===37?"x":"y"),(s==="mCSB_buttonUp"||s==="mCSB_buttonLeft"||s===38||s===37?-1:1)];g._stop(r);if(g._isNumeric(s)&&y.type==="stepped"){return}t(p);break;case"off":v();if(p||(w.tweenRunning&&y.dir)){t(true)}break}function t(z){var F=y.type!=="stepped",J=!z?1000/60:F?q.scrollInertia/1.5:q.scrollInertia,B=!z?2.5:F?7.5:40,I=[Math.abs(x[0].offsetTop),Math.abs(x[0].offsetLeft)],E=[w.scrollRatio.y>10?10:w.scrollRatio.y,w.scrollRatio.x>10?10:w.scrollRatio.x],C=y.dir[0]==="x"?I[1]+(y.dir[1]*(E[1]*B)):I[0]+(y.dir[1]*(E[0]*B)),H=y.dir[0]==="x"?I[1]+(y.dir[1]*parseInt(y.scrollAmount)):I[0]+(y.dir[1]*parseInt(y.scrollAmount)),G=y.scrollAmount!=="auto"?H:C,D=!z?"mcsLinear":F?"mcsLinearOut":"mcsEaseInOut",A=!z?false:true;if(z&&J<17){G=y.dir[0]==="x"?I[1]:I[0]}g._scrollTo(r,G.toString(),{dir:y.dir[0],scrollEasing:D,dur:J,onComplete:A});if(z){y.dir=false;return}clearTimeout(y.step);y.step=setTimeout(function(){t()},J)}function v(){clearTimeout(y.step);g._stop(r)}},_arr:function(r){var q=h(this).data(a).opt,p=[];if(typeof r==="function"){r=r()}if(!(r instanceof Array)){p[0]=r.y?r.y:r.x||q.axis==="x"?null:r;p[1]=r.x?r.x:r.y||q.axis==="y"?null:r}else{p=r.length>1?[r[0],r[1]]:q.axis==="x"?[null,r[0]]:[r[0],null]}if(typeof p[0]==="function"){p[0]=p[0]()}if(typeof p[1]==="function"){p[1]=p[1]()}return p},_to:function(v,w){if(v==null||typeof v=="undefined"){return}var C=h(this),B=C.data(a),u=B.opt,D=h("#mCSB_"+B.idx+"_container"),r=D.parent(),F=typeof v;if(!w){w=u.axis==="x"?"x":"y"}var q=w==="x"?D.outerWidth(false):D.outerHeight(false),x=w==="x"?D.offset().left:D.offset().top,E=w==="x"?D[0].offsetLeft:D[0].offsetTop,z=w==="x"?"left":"top";switch(F){case"function":return v();break;case"object":if(v.nodeType){var A=w==="x"?h(v).offset().left:h(v).offset().top}else{if(v.jquery){if(!v.length){return}var A=w==="x"?v.offset().left:v.offset().top}}return A-x;break;case"string":case"number":if(g._isNumeric.call(null,v)){return Math.abs(v)}else{if(v.indexOf("%")!==-1){return Math.abs(q*parseInt(v)/100)}else{if(v.indexOf("-=")!==-1){return Math.abs(E-parseInt(v.split("-=")[1]))}else{if(v.indexOf("+=")!==-1){var s=(E+parseInt(v.split("+=")[1]));return s>=0?0:Math.abs(s)}else{if(v.indexOf("px")!==-1&&g._isNumeric.call(null,v.split("px")[0])){return Math.abs(v.split("px")[0])}else{if(v==="top"||v==="left"){return 0}else{if(v==="bottom"){return Math.abs(r.height()-D.outerHeight(false))}else{if(v==="right"){return Math.abs(r.width()-D.outerWidth(false))}else{if(v==="first"||v==="last"){var y=D.find(":"+v),A=w==="x"?h(y).offset().left:h(y).offset().top;return A-x}else{if(h(v).length){var A=w==="x"?h(v).offset().left:h(v).offset().top;return A-x}else{D.css(z,v);b.update.call(null,C[0]);return}}}}}}}}}}break}},_autoUpdate:function(q){var t=h(this),F=t.data(a),z=F.opt,v=h("#mCSB_"+F.idx+"_container");if(q){clearTimeout(v[0].autoUpdate);g._delete.call(null,v[0].autoUpdate);return}var s=v.parent(),p=[h("#mCSB_"+F.idx+"_scrollbar_vertical"),h("#mCSB_"+F.idx+"_scrollbar_horizontal")],D=function(){return[p[0].is(":visible")?p[0].outerHeight(true):0,p[1].is(":visible")?p[1].outerWidth(true):0]},E=y(),x,u=[v.outerHeight(false),v.outerWidth(false),s.height(),s.width(),D()[0],D()[1]],H,B=G(),w;C();function C(){clearTimeout(v[0].autoUpdate);v[0].autoUpdate=setTimeout(function(){if(z.advanced.updateOnSelectorChange){x=y();if(x!==E){r();E=x;return}}if(z.advanced.updateOnContentResize){H=[v.outerHeight(false),v.outerWidth(false),s.height(),s.width(),D()[0],D()[1]];if(H[0]!==u[0]||H[1]!==u[1]||H[2]!==u[2]||H[3]!==u[3]||H[4]!==u[4]||H[5]!==u[5]){r();u=H}}if(z.advanced.updateOnImageLoad){w=G();if(w!==B){v.find("img").each(function(){A(this.src)});B=w}}if(z.advanced.updateOnSelectorChange||z.advanced.updateOnContentResize||z.advanced.updateOnImageLoad){C()}},60)}function G(){var I=0;if(z.advanced.updateOnImageLoad){I=v.find("img").length}return I}function A(L){var I=new Image();function K(M,N){return function(){return N.apply(M,arguments)}}function J(){this.onload=null;r()}I.onload=K(I,J);I.src=L}function y(){if(z.advanced.updateOnSelectorChange===true){z.advanced.updateOnSelectorChange="*"}var I=0,J=v.find(z.advanced.updateOnSelectorChange);if(z.advanced.updateOnSelectorChange&&J.length>0){J.each(function(){I+=h(this).height()+h(this).width()})}return I}function r(){clearTimeout(v[0].autoUpdate);b.update.call(null,t[0])}},_snapAmount:function(r,p,q){return(Math.round(r/p)*p-q)},_stop:function(p){var r=p.data(a),q=h("#mCSB_"+r.idx+"_container,#mCSB_"+r.idx+"_container_wrapper,#mCSB_"+r.idx+"_dragger_vertical,#mCSB_"+r.idx+"_dragger_horizontal");q.each(function(){g._stopTween.call(this)})},_scrollTo:function(q,s,u){var I=q.data(a),E=I.opt,D={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:false,dur:E.scrollInertia,overwrite:"all",callbacks:true,onStart:true,onUpdate:true,onComplete:true},u=h.extend(D,u),G=[u.dur,(u.drag?0:u.dur)],v=h("#mCSB_"+I.idx),B=h("#mCSB_"+I.idx+"_container"),K=E.callbacks.onTotalScrollOffset?g._arr.call(q,E.callbacks.onTotalScrollOffset):[0,0],p=E.callbacks.onTotalScrollBackOffset?g._arr.call(q,E.callbacks.onTotalScrollBackOffset):[0,0];I.trigger=u.trigger;if(E.snapAmount){s=g._snapAmount(s,E.snapAmount,E.snapOffset)}switch(u.dir){case"x":var x=h("#mCSB_"+I.idx+"_dragger_horizontal"),z="left",C=B[0].offsetLeft,H=[v.width()-B.outerWidth(false),x.parent().width()-x.width()],r=[s,(s/I.scrollRatio.x)],L=K[1],J=p[1],A=L>0?L/I.scrollRatio.x:0,w=J>0?J/I.scrollRatio.x:0;break;case"y":var x=h("#mCSB_"+I.idx+"_dragger_vertical"),z="top",C=B[0].offsetTop,H=[v.height()-B.outerHeight(false),x.parent().height()-x.height()],r=[s,(s/I.scrollRatio.y)],L=K[0],J=p[0],A=L>0?L/I.scrollRatio.y:0,w=J>0?J/I.scrollRatio.y:0;break}if(r[1]<0){r=[0,0]}else{if(r[1]>=H[1]){r=[H[0],H[1]]}else{r[0]=-r[0]}}clearTimeout(B[0].onCompleteTimeout);if(!I.tweenRunning&&((C===0&&r[0]>=0)||(C===H[0]&&r[0]<=H[0]))){return}g._tweenTo.call(null,x[0],z,Math.round(r[1]),G[1],u.scrollEasing);g._tweenTo.call(null,B[0],z,Math.round(r[0]),G[0],u.scrollEasing,u.overwrite,{onStart:function(){if(u.callbacks&&u.onStart&&!I.tweenRunning){if(t("onScrollStart")){F();E.callbacks.onScrollStart.call(q[0])}I.tweenRunning=true;g._onDragClasses(x);I.cbOffsets=y()}},onUpdate:function(){if(u.callbacks&&u.onUpdate){if(t("whileScrolling")){F();E.callbacks.whileScrolling.call(q[0])}}},onComplete:function(){if(u.callbacks&&u.onComplete){if(E.axis==="yx"){clearTimeout(B[0].onCompleteTimeout)}var M=B[0].idleTimer||0;B[0].onCompleteTimeout=setTimeout(function(){if(t("onScroll")){F();E.callbacks.onScroll.call(q[0])}if(t("onTotalScroll")&&r[1]>=H[1]-A&&I.cbOffsets[0]){F();E.callbacks.onTotalScroll.call(q[0])}if(t("onTotalScrollBack")&&r[1]<=w&&I.cbOffsets[1]){F();E.callbacks.onTotalScrollBack.call(q[0])}I.tweenRunning=false;B[0].idleTimer=0;g._onDragClasses(x,"hide")},M)}}});function t(M){return I&&E.callbacks[M]&&typeof E.callbacks[M]==="function"}function y(){return[E.callbacks.alwaysTriggerOffsets||C>=H[0]+L,E.callbacks.alwaysTriggerOffsets||C<=-J]}function F(){var O=[B[0].offsetTop,B[0].offsetLeft],P=[x[0].offsetTop,x[0].offsetLeft],M=[B.outerHeight(false),B.outerWidth(false)],N=[v.height(),v.width()];q[0].mcs={content:B,top:O[0],left:O[1],draggerTop:P[0],draggerLeft:P[1],topPct:Math.round((100*Math.abs(O[0]))/(Math.abs(M[0])-N[0])),leftPct:Math.round((100*Math.abs(O[1]))/(Math.abs(M[1])-N[1])),direction:u.dir}}},_tweenTo:function(r,u,s,q,A,t,J){var J=J||{},G=J.onStart||function(){},B=J.onUpdate||function(){},H=J.onComplete||function(){},z=g._getTime(),x,v=0,D=r.offsetTop,E=r.style;if(u==="left"){D=r.offsetLeft}var y=s-D;r._mcsstop=0;if(t!=="none"){C()}p();function I(){if(r._mcsstop){return}if(!v){G.call()}v=g._getTime()-z;F();if(v>=r._mcstime){r._mcstime=(v>r._mcstime)?v+x-(v-r._mcstime):v+x-1;if(r._mcstime<v+1){r._mcstime=v+1}}if(r._mcstime<q){r._mcsid=_request(I)}else{H.call()}}function F(){if(q>0){r._mcscurrVal=w(r._mcstime,D,y,q,A);E[u]=Math.round(r._mcscurrVal)+"px"}else{E[u]=s+"px"}B.call()}function p(){x=1000/60;r._mcstime=v+x;_request=(!l.requestAnimationFrame)?function(K){F();return setTimeout(K,0.01)}:l.requestAnimationFrame;r._mcsid=_request(I)}function C(){if(r._mcsid==null){return}if(!l.requestAnimationFrame){clearTimeout(r._mcsid)}else{l.cancelAnimationFrame(r._mcsid)}r._mcsid=null}function w(M,L,Q,P,N){switch(N){case"linear":case"mcsLinear":return Q*M/P+L;break;case"mcsLinearOut":M/=P;M--;return Q*Math.sqrt(1-M*M)+L;break;case"easeInOutSmooth":M/=P/2;if(M<1){return Q/2*M*M+L}M--;return -Q/2*(M*(M-2)-1)+L;break;case"easeInOutStrong":M/=P/2;if(M<1){return Q/2*Math.pow(2,10*(M-1))+L}M--;return Q/2*(-Math.pow(2,-10*M)+2)+L;break;case"easeInOut":case"mcsEaseInOut":M/=P/2;if(M<1){return Q/2*M*M*M+L}M-=2;return Q/2*(M*M*M+2)+L;break;case"easeOutSmooth":M/=P;M--;return -Q*(M*M*M*M-1)+L;break;case"easeOutStrong":return Q*(-Math.pow(2,-10*M/P)+1)+L;break;case"easeOut":case"mcsEaseOut":default:var O=(M/=P)*M,K=O*M;return L+Q*(0.499999999999997*K*O+-2.5*O*O+5.5*K+-6.5*O+4*M)}}},_getTime:function(){if(l.performance&&l.performance.now){return l.performance.now()}else{if(l.performance&&l.performance.webkitNow){return l.performance.webkitNow()}else{if(Date.now){return Date.now()}else{return new Date().getTime()}}}},_stopTween:function(){var p=this;if(p._mcsid==null){return}if(!l.requestAnimationFrame){clearTimeout(p._mcsid)}else{l.cancelAnimationFrame(p._mcsid)}p._mcsid=null;p._mcsstop=1},_delete:function(r){try{delete r}catch(q){r=null}},_mouseBtnLeft:function(p){return !(p.which&&p.which!==1)},_pointerTouch:function(q){var p=q.originalEvent.pointerType;return !(p&&p!=="touch"&&p!==2)},_isNumeric:function(p){return !isNaN(parseFloat(p))&&isFinite(p)}};h.fn[e]=function(p){if(b[p]){return b[p].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof p==="object"||!p){return b.init.apply(this,arguments)}else{h.error("Method "+p+" does not exist")}}};h[e]=function(p){if(b[p]){return b[p].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof p==="object"||!p){return b.init.apply(this,arguments)}else{h.error("Method "+p+" does not exist")}}};h[e].defaults=f;l[e]=true;h(l).load(function(){h(k)[e]()})})(jQuery,window,document);

/**jquery.selectBox**/
/*
 * jQuery selectBox - A cosmetic, styleable replacement for SELECT elements
 *
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 *
 * v1.2.0
 *
 * https://github.com/marcj/jquery-selectBox
 */
;(function ($) {

    /**
     * SelectBox class.
     *
     * @param {HTMLElement|jQuery} select If it's a jQuery object, we use the first element.
     * @param {Object}             options
     * @constructor
     */
    var SelectBox = this.SelectBox = function (select, options) {
        if (select instanceof jQuery) {
            if (select.length > 0) {
                select = select[0];
            } else {
                return;
            }
        }

        this.typeTimer     = null;
        this.typeSearch    = '';
        this.isMac         = navigator.platform.match(/mac/i);
        options            = 'object' === typeof options ? options :  {};
        this.selectElement = select;

        // Disable for iOS devices (their native controls are more suitable for a touch device)
        if (!options.mobile && navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)) {
            return false;
        }

        // Element must be a select control
        if ('select' !== select.tagName.toLowerCase()) {
            return false;
        }

        this.init(options);
    };

    /**
     * @type {String}
     */
    SelectBox.prototype.version = '1.2.0';

    /**
     * @param {Object} options
     *
     * @returns {Boolean}
     */
    SelectBox.prototype.init = function (options) {
        var select = $(this.selectElement);
        if (select.data('selectBox-control')) {
            return false;
        }

        var control    = $('<a class="selectBox" />')
            , inline   = select.attr('multiple') || parseInt(select.attr('size')) > 1
            , settings = options || {}
            , tabIndex = parseInt(select.prop('tabindex')) || 0
            , self     = this;

        control
            .width(select.outerWidth())
            .addClass(select.attr('class'))
            .attr('title', select.attr('title') || '')
            .attr('tabindex', tabIndex)
            .css('display', 'inline-block')
            .bind('focus.selectBox', function () {
                if (this !== document.activeElement && document.body !== document.activeElement) {
                    $(document.activeElement).blur();
                }
                if (control.hasClass('selectBox-active')) {
                    return;
                }
                control.addClass('selectBox-active');
                select.trigger('focus');
            })
            .bind('blur.selectBox', function () {
                if (!control.hasClass('selectBox-active')) {
                    return;
                }
                control.removeClass('selectBox-active');
                select.trigger('blur');
            });

        if (!$(window).data('selectBox-bindings')) {
            $(window)
                .data('selectBox-bindings', true)
                .bind('scroll.selectBox', (settings.hideOnWindowScroll) ? this.hideMenus : $.noop)
                .bind('resize.selectBox', this.hideMenus);
        }

        if (select.attr('disabled')) {
            control.addClass('selectBox-disabled');
        }

        // Focus on control when label is clicked
        select.bind('click.selectBox', function (event) {
            control.focus();
            event.preventDefault();
        });

        // Generate control
        if (inline) {
            // Inline controls
            options = this.getOptions('inline');

            control
                .append(options)
                .data('selectBox-options', options).addClass('selectBox-inline selectBox-menuShowing')
                .bind('keydown.selectBox', function (event) {
                    self.handleKeyDown(event);
                })
                .bind('keypress.selectBox',function (event) {
                    self.handleKeyPress(event);
                })
                .bind('mousedown.selectBox',function (event) {
                    if (1 !== event.which) {
                        return;
                    }
                    if ($(event.target).is('A.selectBox-inline')) {
                        event.preventDefault();
                    }
                    if (!control.hasClass('selectBox-focus')) {
                        control.focus();
                    }
                })
                .insertAfter(select);

            // Auto-height based on size attribute
            if (!select[0].style.height) {
                var size = select.attr('size') ? parseInt(select.attr('size')) : 5;
                // Draw a dummy control off-screen, measure, and remove it
                var tmp = control
                    .clone()
                    .removeAttr('id')
                    .css({
                        position: 'absolute',
                        top: '-9999em'
                    })
                    .show()
                    .appendTo('body');
                tmp.find('.selectBox-options').html('<li><a>\u00A0</a></li>');
                var optionHeight = parseInt(tmp.find('.selectBox-options A:first').html('&nbsp;').outerHeight());
                tmp.remove();
                control.height(optionHeight * size);
            }
            this.disableSelection(control);
        } else {
            // Dropdown controls
            var label = $('<span class="selectBox-label" />'),
                arrow = $('<span class="selectBox-arrow" />');

            // Update label
            label.attr('class', this.getLabelClass()).text(this.getLabelText());
            options = this.getOptions('dropdown');
            options.appendTo('BODY');

            control
                .data('selectBox-options', options)
                .addClass('selectBox-dropdown')
                .append(label)
                .append(arrow)
                .bind('mousedown.selectBox', function (event) {
                    if (1 === event.which) {
                        if (control.hasClass('selectBox-menuShowing')) {
                            self.hideMenus();
                        } else {
                            event.stopPropagation();
                            // Webkit fix to prevent premature selection of options
                            options
                                .data('selectBox-down-at-x', event.screenX)
                                .data('selectBox-down-at-y', event.screenY);
                            self.showMenu();
                        }
                    }
                })
                .bind('keydown.selectBox', function (event) {
                    self.handleKeyDown(event);
                })
                .bind('keypress.selectBox', function (event) {
                    self.handleKeyPress(event);
                })
                .bind('open.selectBox',function (event, triggerData) {
                    if (triggerData && triggerData._selectBox === true) {
                        return;
                    }
                    self.showMenu();
                })
                .bind('close.selectBox', function (event, triggerData) {
                    if (triggerData && triggerData._selectBox === true) {
                        return;
                    }
                    self.hideMenus();
                })
                .insertAfter(select);

            // Set label width
            var labelWidth =
                    control.width()
                  - arrow.outerWidth()
                  - (parseInt(label.css('paddingLeft')) || 0)
                  - (parseInt(label.css('paddingRight')) || 0);

            label.width(labelWidth);
            this.disableSelection(control);
        }
        // Store data for later use and show the control
        select
            .addClass('selectBox')
            .data('selectBox-control', control)
            .data('selectBox-settings', settings)
            .hide();
    };

    /**
     * @param {String} type 'inline'|'dropdown'
     * @returns {jQuery}
     */
    SelectBox.prototype.getOptions = function (type) {
        var options;
        var select = $(this.selectElement);
        var self   = this;
        // Private function to handle recursion in the getOptions function.
        var _getOptions = function (select, options) {
            // Loop through the set in order of element children.
            select.children('OPTION, OPTGROUP').each(function () {
                // If the element is an option, add it to the list.
                if ($(this).is('OPTION')) {
                    // Check for a value in the option found.
                    if ($(this).length > 0) {
                        // Create an option form the found element.
                        self.generateOptions($(this), options);
                    } else {
                        // No option information found, so add an empty.
                        options.append('<li>\u00A0</li>');
                    }
                } else {
                    // If the element is an option group, add the group and call this function on it.
                    var optgroup = $('<li class="selectBox-optgroup" />');
                    optgroup.text($(this).attr('label'));
                    options.append(optgroup);
                    options = _getOptions($(this), options);
                }
            });
            // Return the built strin
            return options;
        };

        switch (type) {
            case 'inline':
                options = $('<ul class="selectBox-options" />');
                options = _getOptions(select, options);
                options
                    .find('A')
                    .bind('mouseover.selectBox', function (event) {
                        self.addHover($(this).parent());
                    })
                    .bind('mouseout.selectBox',function (event) {
                        self.removeHover($(this).parent());
                    })
                    .bind('mousedown.selectBox',function (event) {
                        if (1 !== event.which) {
                            return
                        }
                        event.preventDefault(); // Prevent options from being "dragged"
                        if (!select.selectBox('control').hasClass('selectBox-active')) {
                            select.selectBox('control').focus();
                        }
                    })
                    .bind('mouseup.selectBox', function (event) {
                        if (1 !== event.which) {
                            return;
                        }
                        self.hideMenus();
                        self.selectOption($(this).parent(), event);
                    });

                this.disableSelection(options);
                return options;
            case 'dropdown':
                options = $('<ul class="selectBox-dropdown-menu selectBox-options" />');
                options = _getOptions(select, options);

                options
                    .data('selectBox-select', select)
                    .css('display', 'none')
                    .appendTo('BODY')
                    .find('A')
                    .bind('mousedown.selectBox', function (event) {
                        if (event.which === 1) {
                            event.preventDefault(); // Prevent options from being "dragged"
                            if (event.screenX === options.data('selectBox-down-at-x') &&
                                event.screenY === options.data('selectBox-down-at-y')) {
                                options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                                if (/android/i.test(navigator.userAgent.toLowerCase()) &&
                                    /chrome/i.test(navigator.userAgent.toLowerCase())) {
                                    self.selectOption($(this).parent());        
                                }
                                self.hideMenus();
                            }
                        }
                    })
                    .bind('mouseup.selectBox', function (event) {
                        if (1 !== event.which) {
                            return;
                        }
                        if (event.screenX === options.data('selectBox-down-at-x') &&
                            event.screenY === options.data('selectBox-down-at-y')) {
                            return;
                        } else {
                            options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                        }
                        self.selectOption($(this).parent());
                        self.hideMenus();
                    })
                    .bind('mouseover.selectBox', function (event) {
                        self.addHover($(this).parent());
                    })
                    .bind('mouseout.selectBox', function (event) {
                        self.removeHover($(this).parent());
                    });

                // Inherit classes for dropdown menu
                var classes = select.attr('class') || '';
                if ('' !== classes) {
                    classes = classes.split(' ');
                    for (var i = 0; i < classes.length; i++) {
                        options.addClass(classes[i] + '-selectBox-dropdown-menu');
                    }
                    
                }
                this.disableSelection(options);
                return options;
        }
    };

    /**
     * Returns the current class of the selected option.
     *
     * @returns {String}
     */
    SelectBox.prototype.getLabelClass = function () {
        var selected = $(this.selectElement).find('OPTION:selected');
        return ('selectBox-label ' + (selected.attr('class') || '')).replace(/\s+$/, '');
    };

    /**
     * Returns the current label of the selected option.
     *
     * @returns {String}
     */
    SelectBox.prototype.getLabelText = function () {
        var selected = $(this.selectElement).find('OPTION:selected');
        return selected.text() || '\u00A0';
    };

    /**
     * Sets the label.
     * This method uses the getLabelClass() and getLabelText() methods.
     */
    SelectBox.prototype.setLabel = function () {
        var select = $(this.selectElement);
        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }

        control
            .find('.selectBox-label')
            .attr('class', this.getLabelClass())
            .text(this.getLabelText());
    };

    /**
     * Destroys the SelectBox instance and shows the origin select element.
     *
     */
    SelectBox.prototype.destroy = function () {
        var select = $(this.selectElement);
        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }

        var options = control.data('selectBox-options');
        options.remove();
        control.remove();
        select
            .removeClass('selectBox')
            .removeData('selectBox-control')
            .data('selectBox-control', null)
            .removeData('selectBox-settings')
            .data('selectBox-settings', null)
            .show();
    };

    /**
     * Refreshes the option elements.
     */
    SelectBox.prototype.refresh = function () {
        var select = $(this.selectElement)
            , control = select.data('selectBox-control')
            , type = control.hasClass('selectBox-dropdown') ? 'dropdown' : 'inline'
            , options;

        // Remove old options
        control.data('selectBox-options').remove();

        // Generate new options
        options  = this.getOptions(type);
        control.data('selectBox-options', options);

        switch (type) {
            case 'inline':
                control.append(options);
                break;
            case 'dropdown':
                // Update label
                this.setLabel();
                $("BODY").append(options);
                break;
        }

        // Restore opened dropdown state (original menu was trashed)
        if ('dropdown' === type && control.hasClass('selectBox-menuShowing')) {
            this.showMenu();
        }
    };

    /**
     * Shows the dropdown menu.
     */
    SelectBox.prototype.showMenu = function () {
        var self = this
            , select   = $(this.selectElement)
            , control  = select.data('selectBox-control')
            , settings = select.data('selectBox-settings')
            , options  = control.data('selectBox-options');

        if (control.hasClass('selectBox-disabled')) {
            return false;
        }

        this.hideMenus();
        
        // Get top and bottom width of selectBox
        var borderBottomWidth = parseInt(control.css('borderBottomWidth')) || 0;
        var borderTopWidth = parseInt(control.css('borderTopWidth')) || 0;
        
        // Get proper variables for keeping options in viewport
        var pos = control.offset()
            , topPositionCorrelation = (settings.topPositionCorrelation) ? settings.topPositionCorrelation : 0
            , bottomPositionCorrelation = (settings.bottomPositionCorrelation) ? settings.bottomPositionCorrelation : 0
            , optionsHeight = options.height()
            , controlHeight = control.height()
            , maxHeight = parseInt(options.css('max-height'))
            , scrollPos = $(window).scrollTop()
            , heightToTop = pos.top - scrollPos
            , heightToBottom = $(window).height() - ( heightToTop + controlHeight )
            , posTop = (heightToTop > heightToBottom) && (settings.keepInViewport == null ? true : settings.keepInViewport)
            , top = posTop
                  ? pos.top - optionsHeight + borderTopWidth + topPositionCorrelation
                  : pos.top + controlHeight - borderBottomWidth - bottomPositionCorrelation;        
        
        var fixedTop = pos.top - scrollPos - optionsHeight;

        
        // If the height to top and height to bottom are less than the max-height
        if(heightToTop < maxHeight&& heightToBottom < maxHeight){
            
            // Set max-height and top
            if(posTop){
                var maxHeightDiff = maxHeight - ( heightToTop - 5 );
                options.css({'max-height': maxHeight - maxHeightDiff + 'px'});
                top = fixedTop;
            }else{
                var maxHeightDiff = maxHeight - ( heightToBottom - 5 );
                options.css({'max-height': maxHeight - maxHeightDiff + 'px'});
            }
            
        }
        
        // Save if position is top to options data
        options.data('posTop',fixedTop);
        
        
        // Menu position
        options
            .width(control.innerWidth())
            .css({
                top: fixedTop,
                left: control.offset().left,
                position:'fixed'
            })
            // Add Top and Bottom class based on position
            .addClass('selectBox-options selectBox-options-'+(posTop?'top':'bottom'));


        if (select.triggerHandler('beforeopen')) {
            return false;
        }

        var dispatchOpenEvent = function () {
            select.triggerHandler('open', {
                _selectBox: true
            });
        };

        // Show menu
        switch (settings.menuTransition) {
            case 'fade':
                options.fadeIn(settings.menuSpeed, dispatchOpenEvent);
                break;
            case 'slide':
                options.slideDown(settings.menuSpeed, dispatchOpenEvent);
                break;
            default:
                options.show(settings.menuSpeed, dispatchOpenEvent);
                break;
        }

        if (!settings.menuSpeed) {
            dispatchOpenEvent();
        }

        // Center on selected option
        var li = options.find('.selectBox-selected:first');
        this.keepOptionInView(li, true);
        this.addHover(li);
        control.addClass('selectBox-menuShowing selectBox-menuShowing-'+(posTop?'top':'bottom'));

        $(document).bind('mousedown.selectBox', function (event) {
            if (1 === event.which) {
                if ($(event.target).parents().andSelf().hasClass('selectBox-options')) {
                    return;
                }
                self.hideMenus();
            }
        });
    };

    /**
     * Hides the menu of all instances.
     */
    SelectBox.prototype.hideMenus = function () {
        if ($(".selectBox-dropdown-menu:visible").length === 0) {
            return;
        }

        $(document).unbind('mousedown.selectBox');
        $(".selectBox-dropdown-menu").each(function () {
            var options = $(this)
                , select = options.data('selectBox-select')
                , control = select.data('selectBox-control')
                , settings = select.data('selectBox-settings')
                , posTop = options.data('posTop');

            if (select.triggerHandler('beforeclose')) {
                return false;
            }

            var dispatchCloseEvent = function () {
                select.triggerHandler('close', {
                    _selectBox: true
                });
            };
            if (settings) {
                switch (settings.menuTransition) {
                    case 'fade':
                        options.fadeOut(settings.menuSpeed, dispatchCloseEvent);
                        break;
                    case 'slide':
                        options.slideUp(settings.menuSpeed, dispatchCloseEvent);
                        break;
                    default:
                        options.hide(settings.menuSpeed, dispatchCloseEvent);
                        break;
                }
                if (!settings.menuSpeed) {
                    dispatchCloseEvent();
                }
                control.removeClass('selectBox-menuShowing selectBox-menuShowing-'+(posTop?'top':'bottom'));
            } else {
                $(this).hide();
                $(this).triggerHandler('close', {
                    _selectBox: true
                });
                $(this).removeClass('selectBox-menuShowing selectBox-menuShowing-'+(posTop?'top':'bottom'));
            }
            
            options.css('max-height','');
            //Remove Top or Bottom class based on position
            options.removeClass('selectBox-options-'+(posTop?'top':'bottom'));
            options.data('posTop' , false);
        });
    };

    /**
     * Selects an option.
     *
     * @param {HTMLElement} li
     * @param {DOMEvent}    event
     * @returns {Boolean}
     */
    SelectBox.prototype.selectOption = function (li, event) {
        var select = $(this.selectElement);
        li         = $(li);

        var control    = select.data('selectBox-control')
            , settings = select.data('selectBox-settings');

        if (control.hasClass('selectBox-disabled')) {
            return false;
        }

        if (0 === li.length || li.hasClass('selectBox-disabled')) {
            return false;
        }

        if (select.attr('multiple')) {
            // If event.shiftKey is true, this will select all options between li and the last li selected
            if (event.shiftKey && control.data('selectBox-last-selected')) {
                li.toggleClass('selectBox-selected');
                var affectedOptions;
                if (li.index() > control.data('selectBox-last-selected').index()) {
                    affectedOptions = li
                        .siblings()
                        .slice(control.data('selectBox-last-selected').index(), li.index());
                } else {
                    affectedOptions = li
                        .siblings()
                        .slice(li.index(), control.data('selectBox-last-selected').index());
                }
                affectedOptions = affectedOptions.not('.selectBox-optgroup, .selectBox-disabled');
                if (li.hasClass('selectBox-selected')) {
                    affectedOptions.addClass('selectBox-selected');
                } else {
                    affectedOptions.removeClass('selectBox-selected');
                }
            } else if ((this.isMac && event.metaKey) || (!this.isMac && event.ctrlKey)) {
                li.toggleClass('selectBox-selected');
            } else {
                li.siblings().removeClass('selectBox-selected');
                li.addClass('selectBox-selected');
            }
        } else {
            li.siblings().removeClass('selectBox-selected');
            li.addClass('selectBox-selected');
        }

        if (control.hasClass('selectBox-dropdown')) {
            control.find('.selectBox-label').text(li.text());
        }

        // Update original control's value
        var i = 0, selection = [];
        if (select.attr('multiple')) {
            control.find('.selectBox-selected A').each(function () {
                selection[i++] = $(this).attr('rel');
            });
        } else {
            selection = li.find('A').attr('rel');
        }

        // Remember most recently selected item
        control.data('selectBox-last-selected', li);

        // Change callback
        if (select.val() !== selection) {
            select.val(selection);
            this.setLabel();
            select.trigger('change');
        }

        return true;
    };

    /**
     * Adds the hover class.
     *
     * @param {HTMLElement} li
     */
    SelectBox.prototype.addHover = function (li) {
        li = $(li);
        var select = $(this.selectElement)
            , control   = select.data('selectBox-control')
            , options = control.data('selectBox-options');

        options.find('.selectBox-hover').removeClass('selectBox-hover');
        li.addClass('selectBox-hover');
    };

    /**
     * Returns the original HTML select element.
     *
     * @returns {HTMLElement}
     */
    SelectBox.prototype.getSelectElement = function () {
        return this.selectElement;
    };

    /**
     * Remove the hover class.
     *
     * @param {HTMLElement} li
     */
    SelectBox.prototype.removeHover = function (li) {
        li = $(li);
        var select = $(this.selectElement)
            , control = select.data('selectBox-control')
            , options = control.data('selectBox-options');

        options.find('.selectBox-hover').removeClass('selectBox-hover');
    };

    /**
     * Checks if the widget is in the view.
     *
     * @param {jQuery}      li
     * @param {Boolean}     center
     */
    SelectBox.prototype.keepOptionInView = function (li, center) {
        if (!li || li.length === 0) {
            return;
        }

        var select = $(this.selectElement)
            , control     = select.data('selectBox-control')
            , options   = control.data('selectBox-options')
            , scrollBox = control.hasClass('selectBox-dropdown') ? options : options.parent()
            , top       = parseInt(li.offset().top -scrollBox.position().top)
            , bottom    = parseInt(top + li.outerHeight());

        if (center) {
            scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop() -
                (scrollBox.height() / 2));
        } else {
            if (top < 0) {
                scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop());
            }
            if (bottom > scrollBox.height()) {
                scrollBox.scrollTop((li.offset().top + li.outerHeight()) - scrollBox.offset().top +
                    scrollBox.scrollTop() - scrollBox.height());
            }
        }
    };

    /**
     * Handles the keyDown event.
     * Handles open/close and arrow key functionality
     *
     * @param {DOMEvent}    event
     */
    SelectBox.prototype.handleKeyDown = function (event) {
        var select = $(this.selectElement)
            , control        = select.data('selectBox-control')
            , options      = control.data('selectBox-options')
            , settings     = select.data('selectBox-settings')
            , totalOptions = 0, i = 0;

        if (control.hasClass('selectBox-disabled')) {
            return;
        }

        switch (event.keyCode) {
            case 8:
                // backspace
                event.preventDefault();
                this.typeSearch = '';
                break;
            case 9:
            // tab
            case 27:
                // esc
                this.hideMenus();
                this.removeHover();
                break;
            case 13:
                // enter
                if (control.hasClass('selectBox-menuShowing')) {
                    this.selectOption(options.find('LI.selectBox-hover:first'), event);
                    if (control.hasClass('selectBox-dropdown')) {
                        this.hideMenus();
                    }
                } else {
                    this.showMenu();
                }
                break;
            case 38:
            // up
            case 37:
                // left
                event.preventDefault();
                if (control.hasClass('selectBox-menuShowing')) {
                    var prev = options.find('.selectBox-hover').prev('LI');
                    totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                    i = 0;
                    while (prev.length === 0 || prev.hasClass('selectBox-disabled') ||
                        prev.hasClass('selectBox-optgroup')) {
                        prev = prev.prev('LI');
                        if (prev.length === 0) {
                            if (settings.loopOptions) {
                                prev = options.find('LI:last');
                            } else {
                                prev = options.find('LI:first');
                            }
                        }
                        if (++i >= totalOptions) {
                            break;
                        }
                    }
                    this.addHover(prev);
                    this.selectOption(prev, event);
                    this.keepOptionInView(prev);
                } else {
                    this.showMenu();
                }
                break;
            case 40:
            // down
            case 39:
                // right
                event.preventDefault();
                if (control.hasClass('selectBox-menuShowing')) {
                    var next = options.find('.selectBox-hover').next('LI');
                    totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                    i = 0;
                    while (0 === next.length || next.hasClass('selectBox-disabled') ||
                        next.hasClass('selectBox-optgroup')) {
                        next = next.next('LI');
                        if (next.length === 0) {
                            if (settings.loopOptions) {
                                next = options.find('LI:first');
                            } else {
                                next = options.find('LI:last');
                            }
                        }
                        if (++i >= totalOptions) {
                            break;
                        }
                    }
                    this.addHover(next);
                    this.selectOption(next, event);
                    this.keepOptionInView(next);
                } else {
                    this.showMenu();
                }
                break;
        }
    };

    /**
     * Handles the keyPress event.
     * Handles type-to-find functionality
     *
     * @param {DOMEvent}    event
     */
    SelectBox.prototype.handleKeyPress = function (event) {
        var select = $(this.selectElement)
            , control = select.data('selectBox-control')
            , options = control.data('selectBox-options')
            , self    = this;

        if (control.hasClass('selectBox-disabled')) {
            return;
        }

        switch (event.keyCode) {
            case 9:
            // tab
            case 27:
            // esc
            case 13:
            // enter
            case 38:
            // up
            case 37:
            // left
            case 40:
            // down
            case 39:
                // right
                // Don't interfere with the keydown event!
                break;
            default:
                // Type to find
                if (!control.hasClass('selectBox-menuShowing')) {
                    this.showMenu();
                }
                event.preventDefault();
                clearTimeout(this.typeTimer);
                this.typeSearch += String.fromCharCode(event.charCode || event.keyCode);
                options.find('A').each(function () {
                    if ($(this).text().substr(0, self.typeSearch.length).toLowerCase() === self.typeSearch.toLowerCase()) {
                        self.addHover($(this).parent());
                        self.selectOption($(this).parent(), event);
                        self.keepOptionInView($(this).parent());
                        return false;
                    }
                });
                // Clear after a brief pause
                this.typeTimer = setTimeout(function () {
                    self.typeSearch = '';
                }, 1000);
                break;
        }
    };

    /**
     * Enables the selectBox.
     */
    SelectBox.prototype.enable = function () {
        var select = $(this.selectElement);
        select.prop('disabled', false);
        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }
        control.removeClass('selectBox-disabled');
    };

    /**
     * Disables the selectBox.
     */
    SelectBox.prototype.disable = function () {
        var select = $(this.selectElement);
        select.prop('disabled', true);
        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }
        control.addClass('selectBox-disabled');
    };

    /**
     * Sets the current value.
     *
     * @param {String}      value
     */
    SelectBox.prototype.setValue = function (value) {
        var select = $(this.selectElement);
        select.val(value);
        value = select.val(); // IE9's select would be null if it was set with a non-exist options value

        if (null === value) { // So check it here and set it with the first option's value if possible
            value = select.children().first().val();
            select.val(value);
        }

        var control = select.data('selectBox-control');
        if (!control) {
            return;
        }

        var settings = select.data('selectBox-settings')
            , options = control.data('selectBox-options');

        // Update label
        this.setLabel();

        // Update control values
        options.find('.selectBox-selected').removeClass('selectBox-selected');
        options.find('A').each(function () {
            if (typeof(value) === 'object') {
                for (var i = 0; i < value.length; i++) {
                    if ($(this).attr('rel') == value[i]) {
                        $(this).parent().addClass('selectBox-selected');
                    }
                }
            } else {
                if ($(this).attr('rel') == value) {
                    $(this).parent().addClass('selectBox-selected');
                }
            }
        });

        if (settings.change) {
            settings.change.call(select);
        }
    };

    /**
     * Sets the option elements.
     *
     * @param {String|Object} options
     */
    SelectBox.prototype.setOptions = function (options) {
        var select = $(this.selectElement)
            , control = select.data('selectBox-control');

        switch (typeof(options)) {
            case 'string':
                select.html(options);
                break;
            case 'object':
                select.html('');
                for (var i in options) {
                    if (options[i] === null) {
                        continue;
                    }
                    if (typeof(options[i]) === 'object') {
                        var optgroup = $('<optgroup label="' + i + '" />');
                        for (var j in options[i]) {
                            optgroup.append('<option value="' + j + '">' + options[i][j] + '</option>');
                        }
                        select.append(optgroup);
                    } else {
                        var option = $('<option value="' + i + '">' + options[i] + '</option>');
                        select.append(option);
                    }
                }
                break;
        }

        if (control) {
            // Refresh the control
            this.refresh();
        }
    };

    /**
     * Disables the selection.
     *
     * @param {*} selector
     */
    SelectBox.prototype.disableSelection = function (selector) {
        $(selector).css('MozUserSelect', 'none').bind('selectstart', function (event) {
            event.preventDefault();
        });
    };

    /**
     * Generates the options.
     *
     * @param {jQuery} self
     * @param {jQuery} options
     */
    SelectBox.prototype.generateOptions = function (self, options) {
        var li = $('<li />'), a = $('<a />');
        li.addClass(self.attr('class'));
        li.data(self.data());
        a.attr('rel', self.val()).text(self.text());
        li.append(a);
        if (self.attr('disabled')) {
            li.addClass('selectBox-disabled');
        }
        if (self.attr('selected')) {
            li.addClass('selectBox-selected');
        }
        options.append(li);
    };

    /**
     * Extends the jQuery.fn object.
     */
    $.extend($.fn, {
        selectBox: function (method, options) {
            var selectBox;

            switch (method) {
                case 'control':
                    return $(this).data('selectBox-control');
                case 'settings':
                    if (!options) {
                        return $(this).data('selectBox-settings');
                    }
                    $(this).each(function () {
                        $(this).data('selectBox-settings', $.extend(true, $(this).data('selectBox-settings'), options));
                    });
                    break;
                case 'options':
                    // Getter
                    if (undefined === options) {
                        return $(this).data('selectBox-control').data('selectBox-options');
                    }
                    // Setter
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.setOptions(options);
                        }
                    });
                    break;
                case 'value':
                    // Empty string is a valid value
                    if (undefined === options) {
                        return $(this).val();
                    }
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.setValue(options);
                        }
                    });
                    break;
                case 'refresh':
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.refresh();
                        }
                    });
                    break;
                case 'enable':
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.enable(this);
                        }
                    });
                    break;
                case 'disable':
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.disable();
                        }
                    });
                    break;
                case 'destroy':
                    $(this).each(function () {
                        if (selectBox = $(this).data('selectBox')) {
                            selectBox.destroy();
                            $(this).data('selectBox', null);
                        }
                    });
                    break;
                case 'instance':
                    return $(this).data('selectBox');
                default:
                    $(this).each(function (idx, select) {
                        if (!$(select).data('selectBox')) {
                            $(select).data('selectBox', new SelectBox(select, method));
                        }
                    });
                    break;
            }
            return $(this);
        }
    });
})(jQuery);
},{}]},{},[16]);
