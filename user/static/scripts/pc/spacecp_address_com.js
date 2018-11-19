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
},{"./Event":3,"./uid":14}],2:[function(require,module,exports){
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


},{"../modules/template":12}],6:[function(require,module,exports){
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
},{"./Dialog":2,"./uid":14}],7:[function(require,module,exports){
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
},{"./Event":3,"./validate":15}],10:[function(require,module,exports){
var SelectBox = require('../plugins/select');

var provinceList = [
{name:'北京', cityList:[         
{name:'市辖区', areaList:['东城区','西城区','崇文区','宣武区','朝阳区','丰台区','石景山区','海淀区','门头沟区','房山区','通州区','顺义区','昌平区','大兴区','怀柔区','平谷区']},        
{name:'县', areaList:['密云县','延庆县']}
]},
{name:'上海', cityList:[         
{name:'市辖区', areaList:['黄浦区','卢湾区','徐汇区','长宁区','静安区','普陀区','闸北区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东新区','金山区','松江区','青浦区','南汇区','奉贤区']},         
{name:'县', areaList:['崇明县']}
]},
{name:'天津', cityList:[         
{name:'市辖区', areaList:['和平区','河东区','河西区','南开区','河北区','红桥区','塘沽区','汉沽区','大港区','东丽区','西青区','津南区','北辰区','武清区','宝坻区']},        
{name:'县', areaList:['宁河县','静海县','蓟　县']}
]},
{name:'重庆', cityList:[         
{name:'市辖区', areaList:['万州区','涪陵区','渝中区','大渡口区','江北区','沙坪坝区','九龙坡区','南岸区','北碚区','万盛区','双桥区','渝北区','巴南区','黔江区','长寿区']},         
{name:'县', areaList:['綦江县','潼南县','铜梁县','大足县','荣昌县','璧山县','梁平县','城口县','丰都县','垫江县','武隆县','忠　县','开　县','云阳县','奉节县','巫山县','巫溪县','石柱土家族自治县','秀山土家族苗族自治县','酉阳土家族苗族自治县','彭水苗族土家族自治县']},        
{name:'市', areaList:['江津市','合川市','永川市','南川市']}
]},
{name:'四川', cityList:[         
{name:'成都市', areaList:['市辖区','锦江区','青羊区','金牛区','武侯区','成华区','龙泉驿区','青白江区','新都区','温江县','金堂县','双流县','郫　县','大邑县','蒲江县','新津县','都江堰市','彭州市','邛崃市','崇州市']},           
{name:'自贡市', areaList:['市辖区','自流井区','贡井区','大安区','沿滩区','荣　县','富顺县']},           
{name:'攀枝花市', areaList:['市辖区','东　区','西　区','仁和区','米易县','盐边县']},         
{name:'泸州市', areaList:['市辖区','江阳区','纳溪区','龙马潭区','泸　县','合江县','叙永县','古蔺县']},         
{name:'德阳市', areaList:['市辖区','旌阳区','中江县','罗江县','广汉市','什邡市','绵竹市']},        
{name:'绵阳市', areaList:['市辖区','涪城区','游仙区','三台县','盐亭县','安　县','梓潼县','北川羌族自治县','平武县','江油市']},          
{name:'广元市', areaList:['市辖区','市中区','元坝区','朝天区','旺苍县','青川县','剑阁县','苍溪县']},          
{name:'遂宁市', areaList:['市辖区','船山区','安居区','蓬溪县','射洪县','大英县']},          
{name:'内江市', areaList:['市辖区','市中区','东兴区','威远县','资中县','隆昌县']},          
{name:'乐山市', areaList:['市辖区','市中区','沙湾区','五通桥区','金口河区','犍为县','井研县','夹江县','沐川县','峨边彝族自治县','马边彝族自治县','峨眉山市']},           
{name:'南充市', areaList:['市辖区','顺庆区','高坪区','嘉陵区','南部县','营山县','蓬安县','仪陇县','西充县','阆中市']},          
{name:'眉山市', areaList:['市辖区','东坡区','仁寿县','彭山县','洪雅县','丹棱县','青神县']},        
{name:'宜宾市', areaList:['市辖区','翠屏区','宜宾县','南溪县','江安县','长宁县','高　县','珙　县','筠连县','兴文县','屏山县']},        
{name:'广安市', areaList:['市辖区','广安区','岳池县','武胜县','邻水县','华莹市']},          
{name:'达州市', areaList:['市辖区','通川区','达　县','宣汉县','开江县','大竹县','渠　县','万源市']},          
{name:'雅安市', areaList:['市辖区','雨城区','名山县','荥经县','汉源县','石棉县','天全县','芦山县','宝兴县']},        
{name:'巴中市', areaList:['市辖区','巴州区','通江县','南江县','平昌县']},        
{name:'资阳市', areaList:['市辖区','雁江区','安岳县','乐至县','简阳市']},        
{name:'阿坝藏族羌族自治州', areaList:['汶川县','理　县','茂　县','松潘县','九寨沟县','金川县','小金县','黑水县','马尔康县','壤塘县','阿坝县','若尔盖县','红原县']},           
{name:'甘孜藏族自治州', areaList:['康定县','泸定县','丹巴县','九龙县','雅江县','道孚县','炉霍县','甘孜县','新龙县','德格县','白玉县','石渠县','色达县','理塘县','巴塘县','乡城县','稻城县','得荣县']},          
{name:'凉山彝族自治州', areaList:['西昌市','木里藏族自治县','盐源县','德昌县','会理县','会东县','宁南县','普格县','布拖县','金阳县','昭觉县','喜德县','冕宁县','越西县','甘洛县','美姑县','雷波县']}
]},
{name:'贵州', cityList:[         
{name:'贵阳市', areaList:['市辖区','南明区','云岩区','花溪区','乌当区','白云区','小河区','开阳县','息烽县','修文县','清镇市']},        
{name:'六盘水市', areaList:['钟山区','六枝特区','水城县','盘　县']},        
{name:'遵义市', areaList:['市辖区','红花岗区','汇川区','遵义县','桐梓县','绥阳县','正安县','道真仡佬族苗族自治县','务川仡佬族苗族自治县','凤冈县','湄潭县','余庆县','习水县','赤水市','仁怀市']},         
{name:'安顺市', areaList:['市辖区','西秀区','平坝县','普定县','镇宁布依族苗族自治县','关岭布依族苗族自治县','紫云苗族布依族自治县']},           
{name:'铜仁地区', areaList:['铜仁市','江口县','玉屏侗族自治县','石阡县','思南县','印江土家族苗族自治县','德江县','沿河土家族自治县','松桃苗族自治县','万山特区']},        
{name:'黔西南布依族苗族自治州', areaList:['兴义市','兴仁县','普安县','晴隆县','贞丰县','望谟县','册亨县','安龙县']},          
{name:'毕节地区', areaList:['毕节市','大方县','黔西县','金沙县','织金县','纳雍县','威宁彝族回族苗族自治县','赫章县']},         
{name:'黔东南苗族侗族自治州', areaList:['凯里市','黄平县','施秉县','三穗县','镇远县','岑巩县','天柱县','锦屏县','剑河县','台江县','黎平县','榕江县','从江县','雷山县','麻江县','丹寨县']},           
{name:'黔南布依族苗族自治州', areaList:['都匀市','福泉市','荔波县','贵定县','瓮安县','独山县','平塘县','罗甸县','长顺县','龙里县','惠水县','三都水族自治县']}
]},
{name:'云南', cityList:[         
{name:'昆明市', areaList:['市辖区','五华区','盘龙区','官渡区','西山区','东川区','呈贡县','晋宁县','富民县','宜良县','石林彝族自治县','嵩明县','禄劝彝族苗族自治县','寻甸回族彝族自治县','安宁市']},        
{name:'曲靖市', areaList:['市辖区','麒麟区','马龙县','陆良县','师宗县','罗平县','富源县','会泽县','沾益县','宣威市']},          
{name:'玉溪市', areaList:['市辖区','红塔区','江川县','澄江县','通海县','华宁县','易门县','峨山彝族自治县','新平彝族傣族自治县','元江哈尼族彝族傣族自治县']},           
{name:'保山市', areaList:['市辖区','隆阳区','施甸县','腾冲县','龙陵县','昌宁县']},          
{name:'昭通市', areaList:['市辖区','昭阳区','鲁甸县','巧家县','盐津县','大关县','永善县','绥江县','镇雄县','彝良县','威信县','水富县']},          
{name:'丽江市', areaList:['市辖区','古城区','玉龙纳西族自治县','永胜县','华坪县','宁蒗彝族自治县']},         
{name:'思茅市', areaList:['市辖区','翠云区','普洱哈尼族彝族自治县','墨江哈尼族自治县','景东彝族自治县','景谷傣族彝族自治县','镇沅彝族哈尼族拉祜族自治县','江城哈尼族彝族自治县','孟连傣族拉祜族佤族自治县','澜沧拉祜族自治县','西盟佤族自治县']},           
{name:'临沧市', areaList:['市辖区','临翔区','凤庆县','云　县','永德县','镇康县','双江拉祜族佤族布朗族傣族自治县','耿马傣族佤族自治县','沧源佤族自治县']},          
{name:'楚雄彝族自治州', areaList:['楚雄市','双柏县','牟定县','南华县','姚安县','大姚县','永仁县','元谋县','武定县','禄丰县']},          
{name:'红河哈尼族彝族自治州', areaList:['个旧市','开远市','蒙自县','屏边苗族自治县','建水县','石屏县','弥勒县','泸西县','元阳县','红河县','金平苗族瑶族傣族自治县','绿春县','河口瑶族自治县']},         
{name:'文山壮族苗族自治州', areaList:['文山县','砚山县','西畴县','麻栗坡县','马关县','丘北县','广南县','富宁县']},           
{name:'西双版纳傣族自治州', areaList:['景洪市','勐海县','勐腊县']},          
{name:'大理白族自治州', areaList:['大理市','漾濞彝族自治县','祥云县','宾川县','弥渡县','南涧彝族自治县','巍山彝族回族自治县','永平县','云龙县','洱源县','剑川县','鹤庆县']},        
{name:'德宏傣族景颇族自治州', areaList:['瑞丽市','潞西市','梁河县','盈江县','陇川县']},         
{name:'怒江傈僳族自治州', areaList:['泸水县','福贡县','贡山独龙族怒族自治县','兰坪白族普米族自治县']},           
{name:'迪庆藏族自治州', areaList:['香格里拉县','德钦县','维西傈僳族自治县']}
]},
{name:'西藏', cityList:[         
{name:'拉萨市', areaList:['市辖区','城关区','林周县','当雄县','尼木县','曲水县','堆龙德庆县','达孜县','墨竹工卡县']},        
{name:'昌都地区', areaList:['昌都县','江达县','贡觉县','类乌齐县','丁青县','察雅县','八宿县','左贡县','芒康县','洛隆县','边坝县']},          
{name:'山南地区', areaList:['乃东县','扎囊县','贡嘎县','桑日县','琼结县','曲松县','措美县','洛扎县','加查县','隆子县','错那县','浪卡子县']},        
{name:'日喀则地区', areaList:['日喀则市','南木林县','江孜县','定日县','萨迦县','拉孜县','昂仁县','谢通门县','白朗县','仁布县','康马县','定结县','仲巴县','亚东县','吉隆县','聂拉木县','萨嘎县','岗巴县']},        
{name:'那曲地区', areaList:['那曲县','嘉黎县','比如县','聂荣县','安多县','申扎县','索　县','班戈县','巴青县','尼玛县']},         
{name:'阿里地区', areaList:['普兰县','札达县','噶尔县','日土县','革吉县','改则县','措勤县']},           
{name:'林芝地区', areaList:['林芝县','工布江达县','米林县','墨脱县','波密县','察隅县','朗　县']}
]},
{name:'河南', cityList:[         
{name:'郑州市', areaList:['市辖区','中原区','二七区','管城回族区','金水区','上街区','邙山区','中牟县','巩义市','荥阳市','新密市','新郑市','登封市']},          
{name:'开封市', areaList:['市辖区','龙亭区','顺河回族区','鼓楼区','南关区','郊　区','杞　县','通许县','尉氏县','开封县','兰考县']},          
{name:'洛阳市', areaList:['市辖区','老城区','西工区','廛河回族区','涧西区','吉利区','洛龙区','孟津县','新安县','栾川县','嵩　县','汝阳县','宜阳县','洛宁县','伊川县','偃师市']},        
{name:'平顶山市', areaList:['市辖区','新华区','卫东区','石龙区','湛河区','宝丰县','叶　县','鲁山县','郏　县','舞钢市','汝州市']},           
{name:'安阳市', areaList:['市辖区','文峰区','北关区','殷都区','龙安区','安阳县','汤阴县','滑　县','内黄县','林州市']},          
{name:'鹤壁市', areaList:['市辖区','鹤山区','山城区','淇滨区','浚　县','淇　县']},          
{name:'新乡市', areaList:['市辖区','红旗区','卫滨区','凤泉区','牧野区','新乡县','获嘉县','原阳县','延津县','封丘县','长垣县','卫辉市','辉县市']},        
{name:'焦作市', areaList:['市辖区','解放区','中站区','马村区','山阳区','修武县','博爱县','武陟县','温　县','济源市','沁阳市','孟州市']},          
{name:'濮阳市', areaList:['市辖区','华龙区','清丰县','南乐县','范　县','台前县','濮阳县']},        
{name:'许昌市', areaList:['市辖区','魏都区','许昌县','鄢陵县','襄城县','禹州市','长葛市']},        
{name:'漯河市', areaList:['市辖区','源汇区','郾城区','召陵区','舞阳县','临颍县']},          
{name:'三门峡市', areaList:['市辖区','湖滨区','渑池县','陕　县','卢氏县','义马市','灵宝市']},           
{name:'南阳市', areaList:['市辖区','宛城区','卧龙区','南召县','方城县','西峡县','镇平县','内乡县','淅川县','社旗县','唐河县','新野县','桐柏县','邓州市']},          
{name:'商丘市', areaList:['市辖区','梁园区','睢阳区','民权县','睢　县','宁陵县','柘城县','虞城县','夏邑县','永城市']},          
{name:'信阳市', areaList:['市辖区','师河区','平桥区','罗山县','光山县','新　县','商城县','固始县','潢川县','淮滨县','息　县']},        
{name:'周口市', areaList:['市辖区','川汇区','扶沟县','西华县','商水县','沈丘县','郸城县','淮阳县','太康县','鹿邑县','项城市']},        
{name:'驻马店市', areaList:['市辖区','驿城区','西平县','上蔡县','平舆县','正阳县','确山县','泌阳县','汝南县','遂平县','新蔡县']}
]},
{name:'湖北', cityList:[         
{name:'武汉市', areaList:['市辖区','江岸区','江汉区','乔口区','汉阳区','武昌区','青山区','洪山区','东西湖区','汉南区','蔡甸区','江夏区','黄陂区','新洲区']},         
{name:'黄石市', areaList:['市辖区','黄石港区','西塞山区','下陆区','铁山区','阳新县','大冶市']},          
{name:'十堰市', areaList:['市辖区','茅箭区','张湾区','郧　县','郧西县','竹山县','竹溪县','房　县','丹江口市']},           
{name:'宜昌市', areaList:['市辖区','西陵区','伍家岗区','点军区','猇亭区','夷陵区','远安县','兴山县','秭归县','长阳土家族自治县','五峰土家族自治县','宜都市','当阳市','枝江市']},           
{name:'襄樊市', areaList:['市辖区','襄城区','樊城区','襄阳区','南漳县','谷城县','保康县','老河口市','枣阳市','宜城市']},         
{name:'鄂州市', areaList:['市辖区','梁子湖区','华容区','鄂城区']},         
{name:'荆门市', areaList:['市辖区','东宝区','掇刀区','京山县','沙洋县','钟祥市']},          
{name:'孝感市', areaList:['市辖区','孝南区','孝昌县','大悟县','云梦县','应城市','安陆市','汉川市']},          
{name:'荆州市', areaList:['市辖区','沙市区','荆州区','公安县','监利县','江陵县','石首市','洪湖市','松滋市']},        
{name:'黄冈市', areaList:['市辖区','黄州区','团风县','红安县','罗田县','英山县','浠水县','蕲春县','黄梅县','麻城市','武穴市']},        
{name:'咸宁市', areaList:['市辖区','咸安区','嘉鱼县','通城县','崇阳县','通山县','赤壁市']},        
{name:'随州市', areaList:['市辖区','曾都区','广水市']},        
{name:'恩施土家族苗族自治州', areaList:['恩施市','利川市','建始县','巴东县','宣恩县','咸丰县','来凤县','鹤峰县']},           
{name:'省直辖行政单位', areaList:['仙桃市','潜江市','天门市','神农架林区']}
]},
{name:'湖南', cityList:[         
{name:'长沙市', areaList:['市辖区','芙蓉区','天心区','岳麓区','开福区','雨花区','长沙县','望城县','宁乡县','浏阳市']},          
{name:'株洲市', areaList:['市辖区','荷塘区','芦淞区','石峰区','天元区','株洲县','攸　县','茶陵县','炎陵县','醴陵市']},          
{name:'湘潭市', areaList:['市辖区','雨湖区','岳塘区','湘潭县','湘乡市','韶山市']},          
{name:'衡阳市', areaList:['市辖区','珠晖区','雁峰区','石鼓区','蒸湘区','南岳区','衡阳县','衡南县','衡山县','衡东县','祁东县','耒阳市','常宁市']},        
{name:'邵阳市', areaList:['市辖区','双清区','大祥区','北塔区','邵东县','新邵县','邵阳县','隆回县','洞口县','绥宁县','新宁县','城步苗族自治县','武冈市']},        
{name:'岳阳市', areaList:['市辖区','岳阳楼区','云溪区','君山区','岳阳县','华容县','湘阴县','平江县','汨罗市','临湘市']},         
{name:'常德市', areaList:['市辖区','武陵区','鼎城区','安乡县','汉寿县','澧　县','临澧县','桃源县','石门县','津市市']},          
{name:'张家界市', areaList:['市辖区','永定区','武陵源区','慈利县','桑植县']},          
{name:'益阳市', areaList:['市辖区','资阳区','赫山区','南　县','桃江县','安化县','沅江市']},        
{name:'郴州市', areaList:['市辖区','北湖区','苏仙区','桂阳县','宜章县','永兴县','嘉禾县','临武县','汝城县','桂东县','安仁县','资兴市']},          
{name:'永州市', areaList:['市辖区','芝山区','冷水滩区','祁阳县','东安县','双牌县','道　县','江永县','宁远县','蓝山县','新田县','江华瑶族自治县']},         
{name:'怀化市', areaList:['市辖区','鹤城区','中方县','沅陵县','辰溪县','溆浦县','会同县','麻阳苗族自治县','新晃侗族自治县','芷江侗族自治县','靖州苗族侗族自治县','通道侗族自治县','洪江市']},          
{name:'娄底市', areaList:['市辖区','娄星区','双峰县','新化县','冷水江市','涟源市']},         
{name:'湘西土家族苗族自治州', areaList:['吉首市','泸溪县','凤凰县','花垣县','保靖县','古丈县','永顺县','龙山县']}
]},
{name:'广东', cityList:[         
{name:'广州市', areaList:['市辖区','东山区','荔湾区','越秀区','海珠区','天河区','芳村区','白云区','黄埔区','番禺区','花都区','增城市','从化市']},        
{name:'韶关市', areaList:['市辖区','武江区','浈江区','曲江区','始兴县','仁化县','翁源县','乳源瑶族自治县','新丰县','乐昌市','南雄市']},        
{name:'深圳市', areaList:['市辖区','罗湖区','福田区','南山区','宝安区','龙岗区','盐田区']},        
{name:'珠海市', areaList:['市辖区','香洲区','斗门区','金湾区']},          
{name:'汕头市', areaList:['市辖区','龙湖区','金平区','濠江区','潮阳区','潮南区','澄海区','南澳县']},          
{name:'佛山市', areaList:['市辖区','禅城区','南海区','顺德区','三水区','高明区']},          
{name:'江门市', areaList:['市辖区','蓬江区','江海区','新会区','台山市','开平市','鹤山市','恩平市']},          
{name:'湛江市', areaList:['市辖区','赤坎区','霞山区','坡头区','麻章区','遂溪县','徐闻县','廉江市','雷州市','吴川市']},          
{name:'茂名市', areaList:['市辖区','茂南区','茂港区','电白县','高州市','化州市','信宜市']},        
{name:'肇庆市', areaList:['市辖区','端州区','鼎湖区','广宁县','怀集县','封开县','德庆县','高要市','四会市']},        
{name:'惠州市', areaList:['市辖区','惠城区','惠阳区','博罗县','惠东县','龙门县']},          
{name:'梅州市', areaList:['市辖区','梅江区','梅　县','大埔县','丰顺县','五华县','平远县','蕉岭县','兴宁市']},        
{name:'汕尾市', areaList:['市辖区','城　区','海丰县','陆河县','陆丰市']},        
{name:'河源市', areaList:['市辖区','源城区','紫金县','龙川县','连平县','和平县','东源县']},        
{name:'阳江市', areaList:['市辖区','江城区','阳西县','阳东县','阳春市']},        
{name:'清远市', areaList:['市辖区','清城区','佛冈县','阳山县','连山壮族瑶族自治县','连南瑶族自治县','清新县','英德市','连州市']},          
{name:'东莞市', areaList:['东莞市']},        
{name:'中山市', areaList:['中山市']},        
{name:'潮州市', areaList:['市辖区','湘桥区','潮安县','饶平县']},          
{name:'揭阳市', areaList:['市辖区','榕城区','揭东县','揭西县','惠来县','普宁市']},          
{name:'云浮市', areaList:['市辖区','云城区','新兴县','郁南县','云安县','罗定市']}
]},
{name:'广西', cityList:[         
{name:'南宁市', areaList:['市辖区','兴宁区','青秀区','江南区','西乡塘区','良庆区','邕宁区','武鸣县','隆安县','马山县','上林县','宾阳县','横　县']},           
{name:'柳州市', areaList:['市辖区','城中区','鱼峰区','柳南区','柳北区','柳江县','柳城县','鹿寨县','融安县','融水苗族自治县','三江侗族自治县']},        
{name:'桂林市', areaList:['市辖区','秀峰区','叠彩区','象山区','七星区','雁山区','阳朔县','临桂县','灵川县','全州县','兴安县','永福县','灌阳县','龙胜各族自治县','资源县','平乐县','荔蒲县','恭城瑶族自治县']},          
{name:'梧州市', areaList:['市辖区','万秀区','蝶山区','长洲区','苍梧县','藤　县','蒙山县','岑溪市']},          
{name:'北海市', areaList:['市辖区','海城区','银海区','铁山港区','合浦县']},           
{name:'防城港市', areaList:['市辖区','港口区','防城区','上思县','东兴市']},           
{name:'钦州市', areaList:['市辖区','钦南区','钦北区','灵山县','浦北县']},        
{name:'贵港市', areaList:['市辖区','港北区','港南区','覃塘区','平南县','桂平市']},          
{name:'玉林市', areaList:['市辖区','玉州区','容　县','陆川县','博白县','兴业县','北流市']},        
{name:'百色市', areaList:['市辖区','右江区','田阳县','田东县','平果县','德保县','靖西县','那坡县','凌云县','乐业县','田林县','西林县','隆林各族自治县']},        
{name:'贺州市', areaList:['市辖区','八步区','昭平县','钟山县','富川瑶族自治县']},        
{name:'河池市', areaList:['市辖区','金城江区','南丹县','天峨县','凤山县','东兰县','罗城仫佬族自治县','环江毛南族自治县','巴马瑶族自治县','都安瑶族自治县','大化瑶族自治县','宜州市']},           
{name:'来宾市', areaList:['市辖区','兴宾区','忻城县','象州县','武宣县','金秀瑶族自治县','合山市']},        
{name:'崇左市', areaList:['市辖区','江洲区','扶绥县','宁明县','龙州县','大新县','天等县','凭祥市']}
]},
{name:'陕西', cityList:[         
{name:'西安市', areaList:['市辖区','新城区','碑林区','莲湖区','灞桥区','未央区','雁塔区','阎良区','临潼区','长安区','蓝田县','周至县','户　县','高陵县']},          
{name:'铜川市', areaList:['市辖区','王益区','印台区','耀州区','宜君县']},        
{name:'宝鸡市', areaList:['市辖区','渭滨区','金台区','陈仓区','凤翔县','岐山县','扶风县','眉　县','陇　县','千阳县','麟游县','凤　县','太白县']},        
{name:'咸阳市', areaList:['市辖区','秦都区','杨凌区','渭城区','三原县','泾阳县','乾　县','礼泉县','永寿县','彬　县','长武县','旬邑县','淳化县','武功县','兴平市']},        
{name:'渭南市', areaList:['市辖区','临渭区','华　县','潼关县','大荔县','合阳县','澄城县','蒲城县','白水县','富平县','韩城市','华阴市']},          
{name:'延安市', areaList:['市辖区','宝塔区','延长县','延川县','子长县','安塞县','志丹县','吴旗县','甘泉县','富　县','洛川县','宜川县','黄龙县','黄陵县']},          
{name:'汉中市', areaList:['市辖区','汉台区','南郑县','城固县','洋　县','西乡县','勉　县','宁强县','略阳县','镇巴县','留坝县','佛坪县']},          
{name:'榆林市', areaList:['市辖区','榆阳区','神木县','府谷县','横山县','靖边县','定边县','绥德县','米脂县','佳　县','吴堡县','清涧县','子洲县']},        
{name:'安康市', areaList:['市辖区','汉滨区','汉阴县','石泉县','宁陕县','紫阳县','岚皋县','平利县','镇坪县','旬阳县','白河县']},        
{name:'商洛市', areaList:['市辖区','商州区','洛南县','丹凤县','商南县','山阳县','镇安县','柞水县']}
]},
{name:'甘肃', cityList:[         
{name:'兰州市', areaList:['市辖区','城关区','七里河区','西固区','安宁区','红古区','永登县','皋兰县','榆中县']},           
{name:'嘉峪关市', areaList:['市辖区']},           
{name:'金昌市', areaList:['市辖区','金川区','永昌县']},        
{name:'白银市', areaList:['市辖区','白银区','平川区','靖远县','会宁县','景泰县']},          
{name:'天水市', areaList:['市辖区','秦城区','北道区','清水县','秦安县','甘谷县','武山县','张家川回族自治县']},         
{name:'武威市', areaList:['市辖区','凉州区','民勤县','古浪县','天祝藏族自治县']},        
{name:'张掖市', areaList:['市辖区','甘州区','肃南裕固族自治县','民乐县','临泽县','高台县','山丹县']},           
{name:'平凉市', areaList:['市辖区','崆峒区','泾川县','灵台县','崇信县','华亭县','庄浪县','静宁县']},          
{name:'酒泉市', areaList:['市辖区','肃州区','金塔县','安西县','肃北蒙古族自治县','阿克塞哈萨克族自治县','玉门市','敦煌市']},          
{name:'庆阳市', areaList:['市辖区','西峰区','庆城县','环　县','华池县','合水县','正宁县','宁　县','镇原县']},        
{name:'定西市', areaList:['市辖区','安定区','通渭县','陇西县','渭源县','临洮县','漳　县','岷　县']},          
{name:'陇南市', areaList:['市辖区','武都区','成　县','文　县','宕昌县','康　县','西和县','礼　县','徽　县','两当县']},          
{name:'临夏回族自治州', areaList:['临夏市','临夏县','康乐县','永靖县','广河县','和政县','东乡族自治县','积石山保安族东乡族撒拉族自治县']},           
{name:'甘南藏族自治州', areaList:['合作市','临潭县','卓尼县','舟曲县','迭部县','玛曲县','碌曲县','夏河县']}
]},
{name:'青海', cityList:[         
{name:'西宁市', areaList:['市辖区','城东区','城中区','城西区','城北区','大通回族土族自治县','湟中县','湟源县']},        
{name:'海东地区', areaList:['平安县','民和回族土族自治县','乐都县','互助土族自治县','化隆回族自治县','循化撒拉族自治县']},          
{name:'海北藏族自治州', areaList:['门源回族自治县','祁连县','海晏县','刚察县']},          
{name:'黄南藏族自治州', areaList:['同仁县','尖扎县','泽库县','河南蒙古族自治县']},         
{name:'海南藏族自治州', areaList:['共和县','同德县','贵德县','兴海县','贵南县']},        
{name:'果洛藏族自治州', areaList:['玛沁县','班玛县','甘德县','达日县','久治县','玛多县']},          
{name:'玉树藏族自治州', areaList:['玉树县','杂多县','称多县','治多县','囊谦县','曲麻莱县']},         
{name:'海西蒙古族藏族自治州', areaList:['格尔木市','德令哈市','乌兰县','都兰县','天峻县']}
]},
{name:'宁夏', cityList:[         
{name:'银川市', areaList:['市辖区','兴庆区','西夏区','金凤区','永宁县','贺兰县','灵武市']},        
{name:'石嘴山市', areaList:['市辖区','大武口区','惠农区','平罗县']},        
{name:'吴忠市', areaList:['市辖区','利通区','盐池县','同心县','青铜峡市']},           
{name:'固原市', areaList:['市辖区','原州区','西吉县','隆德县','泾源县','彭阳县','海原县']},        
{name:'中卫市', areaList:['市辖区','沙坡头区','中宁县']}
]},
{name:'新疆', cityList:[         
{name:'乌鲁木齐市', areaList:['市辖区','天山区','沙依巴克区','新市区','水磨沟区','头屯河区','达坂城区','东山区','乌鲁木齐县']},           
{name:'克拉玛依市', areaList:['市辖区','独山子区','克拉玛依区','白碱滩区','乌尔禾区']},         
{name:'吐鲁番地区', areaList:['吐鲁番市','鄯善县','托克逊县']},        
{name:'哈密地区', areaList:['哈密市','巴里坤哈萨克自治县','伊吾县']},         
{name:'昌吉回族自治州', areaList:['昌吉市','阜康市','米泉市','呼图壁县','玛纳斯县','奇台县','吉木萨尔县','木垒哈萨克自治县']},         
{name:'博尔塔拉蒙古自治州', areaList:['博乐市','精河县','温泉县']},          
{name:'巴音郭楞蒙古自治州', areaList:['库尔勒市','轮台县','尉犁县','若羌县','且末县','焉耆回族自治县','和静县','和硕县','博湖县']},         
{name:'阿克苏地区', areaList:['阿克苏市','温宿县','库车县','沙雅县','新和县','拜城县','乌什县','阿瓦提县','柯坪县']},        
{name:'克孜勒苏柯尔克孜自治州', areaList:['阿图什市','阿克陶县','阿合奇县','乌恰县']},           
{name:'喀什地区', areaList:['喀什市','疏附县','疏勒县','英吉沙县','泽普县','莎车县','叶城县','麦盖提县','岳普湖县','伽师县','巴楚县','塔什库尔干塔吉克自治县']},          
{name:'和田地区', areaList:['和田市','和田县','墨玉县','皮山县','洛浦县','策勒县','于田县','民丰县']},         
{name:'伊犁哈萨克自治州', areaList:['伊宁市','奎屯市','伊宁县','察布查尔锡伯自治县','霍城县','巩留县','新源县','昭苏县','特克斯县','尼勒克县']},         
{name:'塔城地区', areaList:['塔城市','乌苏市','额敏县','沙湾县','托里县','裕民县','和布克赛尔蒙古自治县']},        
{name:'阿勒泰地区', areaList:['阿勒泰市','布尔津县','富蕴县','福海县','哈巴河县','青河县','吉木乃县']},          
{name:'省直辖行政单位', areaList:['石河子市','阿拉尔市','图木舒克市','五家渠市']}
]},
{name:'河北', cityList:[         
{name:'石家庄市', areaList:['市辖区','长安区','桥东区','桥西区','新华区','井陉矿区','裕华区','井陉县','正定县','栾城县','行唐县','灵寿县','高邑县','深泽县','赞皇县','无极县','平山县','元氏县','赵　县','辛集市','藁城市','晋州市','新乐市','鹿泉市']},        
{name:'唐山市', areaList:['市辖区','路南区','路北区','古冶区','开平区','丰南区','丰润区','滦　县','滦南县','乐亭县','迁西县','玉田县','唐海县','遵化市','迁安市']},        
{name:'秦皇岛市', areaList:['市辖区','海港区','山海关区','北戴河区','青龙满族自治县','昌黎县','抚宁县','卢龙县']},           
{name:'邯郸市', areaList:['市辖区','邯山区','丛台区','复兴区','峰峰矿区','邯郸县','临漳县','成安县','大名县','涉　县','磁　县','肥乡县','永年县','邱　县','鸡泽县','广平县','馆陶县','魏　县','曲周县','武安市']},         
{name:'邢台市', areaList:['市辖区','桥东区','桥西区','邢台县','临城县','内丘县','柏乡县','隆尧县','任　县','南和县','宁晋县','巨鹿县','新河县','广宗县','平乡县','威　县','清河县','临西县','南宫市','沙河市']},          
{name:'保定市', areaList:['市辖区','新市区','北市区','南市区','满城县','清苑县','涞水县','阜平县','徐水县','定兴县','唐　县','高阳县','容城县','涞源县','望都县','安新县','易　县','曲阳县','蠡　县','顺平县','博野县','雄　县','涿州市','定州市','安国市','高碑店市']},         
{name:'张家口市', areaList:['市辖区','桥东区','桥西区','宣化区','下花园区','宣化县','张北县','康保县','沽源县','尚义县','蔚　县','阳原县','怀安县','万全县','怀来县','涿鹿县','赤城县','崇礼县']},        
{name:'承德市', areaList:['市辖区','双桥区','双滦区','鹰手营子矿区','承德县','兴隆县','平泉县','滦平县','隆化县','丰宁满族自治县','宽城满族自治县','围场满族蒙古族自治县']},        
{name:'沧州市', areaList:['市辖区','新华区','运河区','沧　县','青　县','东光县','海兴县','盐山县','肃宁县','南皮县','吴桥县','献　县','孟村回族自治县','泊头市','任丘市','黄骅市','河间市']},        
{name:'廊坊市', areaList:['市辖区','安次区','广阳区','固安县','永清县','香河县','大城县','文安县','大厂回族自治县','霸州市','三河市']},        
{name:'衡水市', areaList:['市辖区','桃城区','枣强县','武邑县','武强县','饶阳县','安平县','故城县','景　县','阜城县','冀州市','深州市']}
]},
{name:'山西', cityList:[         
{name:'太原市', areaList:['市辖区','小店区','迎泽区','杏花岭区','尖草坪区','万柏林区','晋源区','清徐县','阳曲县','娄烦县','古交市']},         
{name:'大同市', areaList:['市辖区','城　区','矿　区','南郊区','新荣区','阳高县','天镇县','广灵县','灵丘县','浑源县','左云县','大同县']},          
{name:'阳泉市', areaList:['市辖区','城　区','矿　区','郊　区','平定县','盂　县']},          
{name:'长治市', areaList:['市辖区','城　区','郊　区','长治县','襄垣县','屯留县','平顺县','黎城县','壶关县','长子县','武乡县','沁　县','沁源县','潞城市']},          
{name:'晋城市', areaList:['市辖区','城　区','沁水县','阳城县','陵川县','泽州县','高平市']},        
{name:'朔州市', areaList:['市辖区','朔城区','平鲁区','山阴县','应　县','右玉县','怀仁县']},        
{name:'晋中市', areaList:['市辖区','榆次区','榆社县','左权县','和顺县','昔阳县','寿阳县','太谷县','祁　县','平遥县','灵石县','介休市']},          
{name:'运城市', areaList:['市辖区','盐湖区','临猗县','万荣县','闻喜县','稷山县','新绛县','绛　县','垣曲县','夏　县','平陆县','芮城县','永济市','河津市']},          
{name:'忻州市', areaList:['市辖区','忻府区','定襄县','五台县','代　县','繁峙县','宁武县','静乐县','神池县','五寨县','岢岚县','河曲县','保德县','偏关县','原平市']},        
{name:'临汾市', areaList:['市辖区','尧都区','曲沃县','翼城县','襄汾县','洪洞县','古　县','安泽县','浮山县','吉　县','乡宁县','大宁县','隰　县','永和县','蒲　县','汾西县','侯马市','霍州市']},          
{name:'吕梁市', areaList:['市辖区','离石区','文水县','交城县','兴　县','临　县','柳林县','石楼县','岚　县','方山县','中阳县','交口县','孝义市','汾阳市']}
]},
{name:'内蒙古', cityList:[        
{name:'呼和浩特市', areaList:['市辖区','新城区','回民区','玉泉区','赛罕区','土默特左旗','托克托县','和林格尔县','清水河县','武川县']},          
{name:'包头市', areaList:['市辖区','东河区','昆都仑区','青山区','石拐区','白云矿区','九原区','土默特右旗','固阳县','达尔罕茂明安联合旗']},        
{name:'乌海市', areaList:['市辖区','海勃湾区','海南区','乌达区']},         
{name:'赤峰市', areaList:['市辖区','红山区','元宝山区','松山区','阿鲁科尔沁旗','巴林左旗','巴林右旗','林西县','克什克腾旗','翁牛特旗','喀喇沁旗','宁城县','敖汉旗']},          
{name:'通辽市', areaList:['市辖区','科尔沁区','科尔沁左翼中旗','科尔沁左翼后旗','开鲁县','库伦旗','奈曼旗','扎鲁特旗','霍林郭勒市']},        
{name:'鄂尔多斯市', areaList:['东胜区','达拉特旗','准格尔旗','鄂托克前旗','鄂托克旗','杭锦旗','乌审旗','伊金霍洛旗']},         
{name:'呼伦贝尔市', areaList:['市辖区','海拉尔区','阿荣旗','莫力达瓦达斡尔族自治旗','鄂伦春自治旗','鄂温克族自治旗','陈巴尔虎旗','新巴尔虎左旗','新巴尔虎右旗','满洲里市','牙克石市','扎兰屯市','额尔古纳市','根河市']},           
{name:'巴彦淖尔市', areaList:['市辖区','临河区','五原县','磴口县','乌拉特前旗','乌拉特中旗','乌拉特后旗','杭锦后旗']},         
{name:'乌兰察布市', areaList:['市辖区','集宁区','卓资县','化德县','商都县','兴和县','凉城县','察哈尔右翼前旗','察哈尔右翼中旗','察哈尔右翼后旗','四子王旗','丰镇市']},           
{name:'兴安盟', areaList:['乌兰浩特市','阿尔山市','科尔沁右翼前旗','科尔沁右翼中旗','扎赉特旗','突泉县']},          
{name:'锡林郭勒盟', areaList:['二连浩特市','锡林浩特市','阿巴嘎旗','苏尼特左旗','苏尼特右旗','东乌珠穆沁旗','西乌珠穆沁旗','太仆寺旗','镶黄旗','正镶白旗','正蓝旗','多伦县']},           
{name:'阿拉善盟', areaList:['阿拉善左旗','阿拉善右旗','额济纳旗']}
]},
{name:'江苏', cityList:[         
{name:'南京市', areaList:['市辖区','玄武区','白下区','秦淮区','建邺区','鼓楼区','下关区','浦口区','栖霞区','雨花台区','江宁区','六合区','溧水县','高淳县']},         
{name:'无锡市', areaList:['市辖区','崇安区','南长区','北塘区','锡山区','惠山区','滨湖区','江阴市','宜兴市']},        
{name:'徐州市', areaList:['市辖区','鼓楼区','云龙区','九里区','贾汪区','泉山区','丰　县','沛　县','铜山县','睢宁县','新沂市','邳州市']},          
{name:'常州市', areaList:['市辖区','天宁区','钟楼区','戚墅堰区','新北区','武进区','溧阳市','金坛市']},         
{name:'苏州市', areaList:['市辖区','沧浪区','平江区','金阊区','虎丘区','吴中区','相城区','常熟市','张家港市','昆山市','吴江市','太仓市']},         
{name:'南通市', areaList:['市辖区','崇川区','港闸区','海安县','如东县','启东市','如皋市','通州市','海门市']},        
{name:'连云港市', areaList:['市辖区','连云区','新浦区','海州区','赣榆县','东海县','灌云县','灌南县']},         
{name:'淮安市', areaList:['市辖区','清河区','楚州区','淮阴区','清浦区','涟水县','洪泽县','盱眙县','金湖县']},        
{name:'盐城市', areaList:['市辖区','亭湖区','盐都区','响水县','滨海县','阜宁县','射阳县','建湖县','东台市','大丰市']},          
{name:'扬州市', areaList:['市辖区','广陵区','邗江区','郊　区','宝应县','仪征市','高邮市','江都市']},          
{name:'镇江市', areaList:['市辖区','京口区','润州区','丹徒区','丹阳市','扬中市','句容市']},        
{name:'泰州市', areaList:['市辖区','海陵区','高港区','兴化市','靖江市','泰兴市','姜堰市']},        
{name:'宿迁市', areaList:['市辖区','宿城区','宿豫区','沭阳县','泗阳县','泗洪县']}
]},
{name:'浙江', cityList:[         
{name:'杭州市', areaList:['市辖区','上城区','下城区','江干区','拱墅区','西湖区','滨江区','萧山区','余杭区','桐庐县','淳安县','建德市','富阳市','临安市']},          
{name:'宁波市', areaList:['市辖区','海曙区','江东区','江北区','北仑区','镇海区','鄞州区','象山县','宁海县','余姚市','慈溪市','奉化市']},          
{name:'温州市', areaList:['市辖区','鹿城区','龙湾区','瓯海区','洞头县','永嘉县','平阳县','苍南县','文成县','泰顺县','瑞安市','乐清市']},          
{name:'嘉兴市', areaList:['市辖区','秀城区','秀洲区','嘉善县','海盐县','海宁市','平湖市','桐乡市']},          
{name:'湖州市', areaList:['市辖区','吴兴区','南浔区','德清县','长兴县','安吉县']},          
{name:'绍兴市', areaList:['市辖区','越城区','绍兴县','新昌县','诸暨市','上虞市','嵊州市']},        
{name:'金华市', areaList:['市辖区','婺城区','金东区','武义县','浦江县','磐安县','兰溪市','义乌市','东阳市','永康市']},          
{name:'衢州市', areaList:['市辖区','柯城区','衢江区','常山县','开化县','龙游县','江山市']},        
{name:'舟山市', areaList:['市辖区','定海区','普陀区','岱山县','嵊泗县']},        
{name:'台州市', areaList:['市辖区','椒江区','黄岩区','路桥区','玉环县','三门县','天台县','仙居县','温岭市','临海市']},          
{name:'丽水市', areaList:['市辖区','莲都区','青田县','缙云县','遂昌县','松阳县','云和县','庆元县','景宁畲族自治县','龙泉市']}
]},
{name:'安徽', cityList:[         
{name:'合肥市', areaList:['市辖区','瑶海区','庐阳区','蜀山区','包河区','长丰县','肥东县','肥西县']},          
{name:'芜湖市', areaList:['市辖区','镜湖区','马塘区','新芜区','鸠江区','芜湖县','繁昌县','南陵县']},          
{name:'蚌埠市', areaList:['市辖区','龙子湖区','蚌山区','禹会区','淮上区','怀远县','五河县','固镇县']},         
{name:'淮南市', areaList:['市辖区','大通区','田家庵区','谢家集区','八公山区','潘集区','凤台县']},         
{name:'马鞍山市', areaList:['市辖区','金家庄区','花山区','雨山区','当涂县']},          
{name:'淮北市', areaList:['市辖区','杜集区','相山区','烈山区','濉溪县']},        
{name:'铜陵市', areaList:['市辖区','铜官山区','狮子山区','郊　区','铜陵县']},          
{name:'安庆市', areaList:['市辖区','迎江区','大观区','郊　区','怀宁县','枞阳县','潜山县','太湖县','宿松县','望江县','岳西县','桐城市']},          
{name:'黄山市', areaList:['市辖区','屯溪区','黄山区','徽州区','歙　县','休宁县','黟　县','祁门县']},          
{name:'滁州市', areaList:['市辖区','琅琊区','南谯区','来安县','全椒县','定远县','凤阳县','天长市','明光市']},        
{name:'阜阳市', areaList:['市辖区','颍州区','颍东区','颍泉区','临泉县','太和县','阜南县','颍上县','界首市']},        
{name:'宿州市', areaList:['市辖区','墉桥区','砀山县','萧　县','灵璧县','泗　县']},          
{name:'巢湖市', areaList:['市辖区','居巢区','庐江县','无为县','含山县','和　县']},          
{name:'六安市', areaList:['市辖区','金安区','裕安区','寿　县','霍邱县','舒城县','金寨县','霍山县']},          
{name:'亳州市', areaList:['市辖区','谯城区','涡阳县','蒙城县','利辛县']},        
{name:'池州市', areaList:['市辖区','贵池区','东至县','石台县','青阳县']},        
{name:'宣城市', areaList:['市辖区','宣州区','郎溪县','广德县','泾　县','绩溪县','旌德县','宁国市']}
]},
{name:'福建', cityList:[
{name:'福州市', areaList:['市辖区','鼓楼区','台江区','仓山区','马尾区','晋安区','闽侯县','连江县','罗源县','闽清县','永泰县','平潭县','福清市','长乐市']},          
{name:'厦门市', areaList:['市辖区','思明区','海沧区','湖里区','集美区','同安区','翔安区']},        
{name:'莆田市', areaList:['市辖区','城厢区','涵江区','荔城区','秀屿区','仙游县']},          
{name:'三明市', areaList:['市辖区','梅列区','三元区','明溪县','清流县','宁化县','大田县','尤溪县','沙　县','将乐县','泰宁县','建宁县','永安市']},        
{name:'泉州市', areaList:['市辖区','鲤城区','丰泽区','洛江区','泉港区','惠安县','安溪县','永春县','德化县','金门县','石狮市','晋江市','南安市']},        
{name:'漳州市', areaList:['市辖区','芗城区','龙文区','云霄县','漳浦县','诏安县','长泰县','东山县','南靖县','平和县','华安县','龙海市']},          
{name:'南平市', areaList:['市辖区','延平区','顺昌县','浦城县','光泽县','松溪县','政和县','邵武市','武夷山市','建瓯市','建阳市']},           
{name:'龙岩市', areaList:['市辖区','新罗区','长汀县','永定县','上杭县','武平县','连城县','漳平市']},          
{name:'宁德市', areaList:['市辖区','蕉城区','霞浦县','古田县','屏南县','寿宁县','周宁县','柘荣县','福安市','福鼎市']}
]},
{name:'江西', cityList:[
{name:'南昌市', areaList:['市辖区','东湖区','西湖区','青云谱区','湾里区','青山湖区','南昌县','新建县','安义县','进贤县']},        
{name:'景德镇市', areaList:['市辖区','昌江区','珠山区','浮梁县','乐平市']},           
{name:'萍乡市', areaList:['市辖区','安源区','湘东区','莲花县','上栗县','芦溪县']},          
{name:'九江市', areaList:['市辖区','庐山区','浔阳区','九江县','武宁县','修水县','永修县','德安县','星子县','都昌县','湖口县','彭泽县','瑞昌市']},        
{name:'新余市', areaList:['市辖区','渝水区','分宜县']},        
{name:'鹰潭市', areaList:['市辖区','月湖区','余江县','贵溪市']},          
{name:'赣州市', areaList:['市辖区','章贡区','赣　县','信丰县','大余县','上犹县','崇义县','安远县','龙南县','定南县','全南县','宁都县','于都县','兴国县','会昌县','寻乌县','石城县','瑞金市','南康市']},        
{name:'吉安市', areaList:['市辖区','吉州区','青原区','吉安县','吉水县','峡江县','新干县','永丰县','泰和县','遂川县','万安县','安福县','永新县','井冈山市']},         
{name:'宜春市', areaList:['市辖区','袁州区','奉新县','万载县','上高县','宜丰县','靖安县','铜鼓县','丰城市','樟树市','高安市']},        
{name:'抚州市', areaList:['市辖区','临川区','南城县','黎川县','南丰县','崇仁县','乐安县','宜黄县','金溪县','资溪县','东乡县','广昌县']},          
{name:'上饶市', areaList:['市辖区','信州区','上饶县','广丰县','玉山县','铅山县','横峰县','弋阳县','余干县','鄱阳县','万年县','婺源县','德兴市']}
]},
{name:'山东', cityList:[
{name:'济南市', areaList:['市辖区','历下区','市中区','槐荫区','天桥区','历城区','长清区','平阴县','济阳县','商河县','章丘市']},        
{name:'青岛市', areaList:['市辖区','市南区','市北区','四方区','黄岛区','崂山区','李沧区','城阳区','胶州市','即墨市','平度市','胶南市','莱西市']},        
{name:'淄博市', areaList:['市辖区','淄川区','张店区','博山区','临淄区','周村区','桓台县','高青县','沂源县']},        
{name:'枣庄市', areaList:['市辖区','市中区','薛城区','峄城区','台儿庄区','山亭区','滕州市']},           
{name:'东营市', areaList:['市辖区','东营区','河口区','垦利县','利津县','广饶县']},          
{name:'烟台市', areaList:['市辖区','芝罘区','福山区','牟平区','莱山区','长岛县','龙口市','莱阳市','莱州市','蓬莱市','招远市','栖霞市','海阳市']},        
{name:'潍坊市', areaList:['市辖区','潍城区','寒亭区','坊子区','奎文区','临朐县','昌乐县','青州市','诸城市','寿光市','安丘市','高密市','昌邑市']},        
{name:'济宁市', areaList:['市辖区','市中区','任城区','微山县','鱼台县','金乡县','嘉祥县','汶上县','泗水县','梁山县','曲阜市','兖州市','邹城市']},        
{name:'泰安市', areaList:['市辖区','泰山区','岱岳区','宁阳县','东平县','新泰市','肥城市']},        
{name:'威海市', areaList:['市辖区','环翠区','文登市','荣成市','乳山市']},        
{name:'日照市', areaList:['市辖区','东港区','岚山区','五莲县','莒　县']},        
{name:'莱芜市', areaList:['市辖区','莱城区','钢城区']},
{name:'临沂市', areaList:['市辖区','兰山区','罗庄区','河东区','沂南县','郯城县','沂水县','苍山县','费　县','平邑县','莒南县','蒙阴县','临沭县']},        
{name:'德州市', areaList:['市辖区','德城区','陵　县','宁津县','庆云县','临邑县','齐河县','平原县','夏津县','武城县','乐陵市','禹城市']},          
{name:'聊城市', areaList:['市辖区','东昌府区','阳谷县','莘　县','茌平县','东阿县','冠　县','高唐县','临清市']},           
{name:'滨州市', areaList:['市辖区','滨城区','惠民县','阳信县','无棣县','沾化县','博兴县','邹平县']},          
{name:'荷泽市', areaList:['市辖区','牡丹区','曹　县','单　县','成武县','巨野县','郓城县','鄄城县','定陶县','东明县']}
]},
{name:'辽宁', cityList:[
{name:'沈阳市', areaList:['市辖区','和平区','沈河区','大东区','皇姑区','铁西区','苏家屯区','东陵区','新城子区','于洪区','辽中县','康平县','法库县','新民市']},        
{name:'大连市', areaList:['市辖区','中山区','西岗区','沙河口区','甘井子区','旅顺口区','金州区','长海县','瓦房店市','普兰店市','庄河市']},           
{name:'鞍山市', areaList:['市辖区','铁东区','铁西区','立山区','千山区','台安县','岫岩满族自治县','海城市']},          
{name:'抚顺市', areaList:['市辖区','新抚区','东洲区','望花区','顺城区','抚顺县','新宾满族自治县','清原满族自治县']},          
{name:'本溪市', areaList:['市辖区','平山区','溪湖区','明山区','南芬区','本溪满族自治县','桓仁满族自治县']},        
{name:'丹东市', areaList:['市辖区','元宝区','振兴区','振安区','宽甸满族自治县','东港市','凤城市']},        
{name:'锦州市', areaList:['市辖区','古塔区','凌河区','太和区','黑山县','义　县','凌海市','北宁市']},          
{name:'营口市', areaList:['市辖区','站前区','西市区','鲅鱼圈区','老边区','盖州市','大石桥市']},          
{name:'阜新市', areaList:['市辖区','海州区','新邱区','太平区','清河门区','细河区','阜新蒙古族自治县','彰武县']},        
{name:'辽阳市', areaList:['市辖区','白塔区','文圣区','宏伟区','弓长岭区','太子河区','辽阳县','灯塔市']},        
{name:'盘锦市', areaList:['市辖区','双台子区','兴隆台区','大洼县','盘山县']},          
{name:'铁岭市', areaList:['市辖区','银州区','清河区','铁岭县','西丰县','昌图县','调兵山市','开原市']},         
{name:'朝阳市', areaList:['市辖区','双塔区','龙城区','朝阳县','建平县','喀喇沁左翼蒙古族自治县','北票市','凌源市']},          
{name:'葫芦岛市', areaList:['市辖区','连山区','龙港区','南票区','绥中县','建昌县','兴城市']}
]},
{name:'吉林', cityList:[         
{name:'长春市', areaList:['市辖区','南关区','宽城区','朝阳区','二道区','绿园区','双阳区','农安县','九台市','榆树市','德惠市']},        
{name:'吉林市', areaList:['市辖区','昌邑区','龙潭区','船营区','丰满区','永吉县','蛟河市','桦甸市','舒兰市','磐石市']},          
{name:'四平市', areaList:['市辖区','铁西区','铁东区','梨树县','伊通满族自治县','公主岭市','双辽市']},           
{name:'辽源市', areaList:['市辖区','龙山区','西安区','东丰县','东辽县']},        
{name:'通化市', areaList:['市辖区','东昌区','二道江区','通化县','辉南县','柳河县','梅河口市','集安市']},        
{name:'白山市', areaList:['市辖区','八道江区','抚松县','靖宇县','长白朝鲜族自治县','江源县','临江市']},          
{name:'松原市', areaList:['市辖区','宁江区','前郭尔罗斯蒙古族自治县','长岭县','乾安县','扶余县']},          
{name:'白城市', areaList:['市辖区','洮北区','镇赉县','通榆县','洮南市','大安市']},          
{name:'延边朝鲜族自治州', areaList:['延吉市','图们市','敦化市','珲春市','龙井市','和龙市','汪清县','安图县']}
]},
{name:'黑龙江', cityList:[        
{name:'哈尔滨市', areaList:['市辖区','道里区','南岗区','道外区','香坊区','动力区','平房区','松北区','呼兰区','依兰县','方正县','宾　县','巴彦县','木兰县','通河县','延寿县','阿城市','双城市','尚志市','五常市']},         
{name:'齐齐哈尔市', areaList:['市辖区','龙沙区','建华区','铁锋区','昂昂溪区','富拉尔基区','碾子山区','梅里斯达斡尔族区','龙江县','依安县','泰来县','甘南县','富裕县','克山县','克东县','拜泉县','讷河市']},         
{name:'鸡西市', areaList:['市辖区','鸡冠区','恒山区','滴道区','梨树区','城子河区','麻山区','鸡东县','虎林市','密山市']},         
{name:'鹤岗市', areaList:['市辖区','向阳区','工农区','南山区','兴安区','东山区','兴山区','萝北县','绥滨县']},        
{name:'双鸭山市', areaList:['市辖区','尖山区','岭东区','四方台区','宝山区','集贤县','友谊县','宝清县','饶河县']},          
{name:'大庆市', areaList:['市辖区','萨尔图区','龙凤区','让胡路区','红岗区','大同区','肇州县','肇源县','林甸县','杜尔伯特蒙古族自治县']},         
{name:'伊春市', areaList:['市辖区','伊春区','南岔区','友好区','西林区','翠峦区','新青区','美溪区','金山屯区','五营区','乌马河区','汤旺河区','带岭区','乌伊岭区','红星区','上甘岭区','嘉荫县','铁力市']},         
{name:'佳木斯市', areaList:['市辖区','永红区','向阳区','前进区','东风区','郊　区','桦南县','桦川县','汤原县','抚远县','同江市','富锦市']},         
{name:'七台河市', areaList:['市辖区','新兴区','桃山区','茄子河区','勃利县']},          
{name:'牡丹江市', areaList:['市辖区','东安区','阳明区','爱民区','西安区','东宁县','林口县','绥芬河市','海林市','宁安市','穆棱市']},          
{name:'黑河市', areaList:['市辖区','爱辉区','嫩江县','逊克县','孙吴县','北安市','五大连池市']},          
{name:'绥化市', areaList:['市辖区','北林区','望奎县','兰西县','青冈县','庆安县','明水县','绥棱县','安达市','肇东市','海伦市']},        
{name:'大兴安岭地区', areaList:['呼玛县','塔河县','漠河县']}
]},
{name:'海南', cityList:[         
{name:'海口市', areaList:['市辖区','秀英区','龙华区','琼山区','美兰区']},        
{name:'三亚市', areaList:['市辖区']},        
{name:'省直辖县级行政单位', areaList:['五指山市','琼海市','儋州市','文昌市','万宁市','东方市','定安县','屯昌县','澄迈县','临高县','白沙黎族自治县','昌江黎族自治县','乐东黎族自治县','陵水黎族自治县','保亭黎族苗族自治县','琼中黎族苗族自治县','西沙群岛','南沙群岛','中沙群岛的岛礁及其海域']}
]},
{name:'台湾', cityList:[
{name:'台湾', areaList:['台湾']},
]},
{name:'香港', cityList:[
{name:'香港', areaList:['香港']},
]},
{name:'澳门', cityList:[
{name:'澳门', areaList:['澳门']},
]}
];
window.provinceList = provinceList;
exports.init = function(_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea,mobile)
{
    var cmbProvince = document.getElementById(_cmbProvince);
    var cmbCity = document.getElementById(_cmbCity);
    var cmbArea = document.getElementById(_cmbArea);
    
    function cmbSelect(cmb, str)
    {
        for(var i=0; i<cmb.options.length; i++)
        {
            if(cmb.options[i].value == str)
            {
                cmb.selectedIndex = i;
                return;
            }
        }
    }
    function cmbAddOption(cmb, str, obj)
    {
        var option = document.createElement("OPTION");
        cmb.options.add(option);
        option.innerHTML = str;
        option.value = str;
        option.obj = obj;
        if(!mobile) {
            $(cmbProvince).selectBox('refresh');
            $(cmbCity).selectBox('refresh');
            $(cmbArea).selectBox('refresh');
        }
    }
    
    function changeCity()
    {
        cmbArea.options.length = 0;
        if(cmbCity.selectedIndex == -1)return;
        var item = cmbCity.options[cmbCity.selectedIndex].obj;
        for(var i=0; i<item.areaList.length; i++)
        {
            cmbAddOption(cmbArea, item.areaList[i], null);
        }
        cmbSelect(cmbArea, defaultArea);
        if(!mobile) {
            $(cmbProvince).selectBox('refresh');
            $(cmbCity).selectBox('refresh');
            $(cmbArea).selectBox('refresh');
        }
    }
    function changeProvince()
    {
        cmbCity.options.length = 0;
        cmbCity.onchange = null;
        if(cmbProvince.selectedIndex == -1)return;
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        for(var i=0; i<item.cityList.length; i++)
        {
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
        }
        cmbSelect(cmbCity, defaultCity);
        changeCity();
        cmbCity.onchange = changeCity;
        if(!mobile) {
            $(cmbProvince).selectBox('refresh');
            $(cmbCity).selectBox('refresh');
            $(cmbArea).selectBox('refresh');
        }
    }
    
    for(var i=0; i<provinceList.length; i++)
    {
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);
    }
    cmbSelect(cmbProvince, defaultProvince);
    changeProvince();
    cmbProvince.onchange = changeProvince;
    if(!mobile){
        $(cmbProvince).selectBox();
        $(cmbCity).selectBox();
        $(cmbArea).selectBox();
    }
}
},{"../plugins/select":18}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){


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





},{"../modules/ajaxcodecall":4,"../modules/animate":5,"../modules/dialogUi":6,"../plugins/select":18}],14:[function(require,module,exports){
exports.create = function () {
    var S4 = function () {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4());
}
},{}],15:[function(require,module,exports){

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
},{}],16:[function(require,module,exports){
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

},{"../modules/ajaxcodecall":4,"../modules/animate":5,"../modules/dialogUi":6,"../modules/floatlayer":7,"../modules/follow":8,"../modules/statistics":11,"../modules/template":12,"../modules/ui":13}],17:[function(require,module,exports){
var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    province = require('../modules/province'),
    formMod = require('../modules/form'),
    currentSubmit = $("#currentSubmit"),
    animate = require('../modules/animate'),
    datajson=$("form.address-form").serialize(),
    floatlayer = require('../modules/floatlayer');
var getprovince = $('.getprovince').val();
if(getprovince==null){
    getprovince='北京'
};
var getcity = $('.getcity').val();
if(getcity==null){
    getcity= '市辖区'
};
var getcounty = $('.getcounty').val();
if(getcounty==null){
    getcounty = '东城区'
};
province.init('cmbProvince', 'cmbCity', 'cmbArea',getprovince,getcity,getcounty,1);

//收货地址表单验证
formMod.listen('address.php',{
    ajaxBefore:function(){

    },
    validSuccess:function(validResutl){    },
    validError:function(validResutl){
        var item  = validResutl.element;
        var prompt = item.parents('[role-prompt=address]').find('[role-prompt=info]');
        var promptText = prompt.find('span');
        prompt.show();
        if(item.attr('name')=='consignee'){
            if(validResutl.valid == 'notempty'){
                promptText.html('收件人不能为空！');
            }
        }
        if(item.attr('name')=='address'){
            if(validResutl.valid == 'notempty'){
                promptText.html('地址不能为空！');
            }
        }
        if(item.attr('name')=='phone'){
            if(validResutl.valid == 'mobile'){
                promptText.html('请确认手机号准确无误！');
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
},{"../modules/animate":5,"../modules/dialogUi":6,"../modules/floatlayer":7,"../modules/form":9,"../modules/province":10,"../modules/template":12,"./app":16}],18:[function(require,module,exports){
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
},{}]},{},[17]);
