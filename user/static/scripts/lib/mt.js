/*
* mt application framework
* author: mt
*/
(function(win){

	var exportsName = 'mt',
		version = '1.0.0',
		emptyArray = [], 
        slice = emptyArray.slice,
        empty = function(){},
		mt = win[exportsName];

	//Avoid re-load mt
	if(mt && mt.version >= version)
		return;

	//define console
	if(typeof window.console =='undefined')
		window.console = {log:empty,warn:empty,error:empty}

	//define mt
	mt = win.mt = {
		version:version,
		isFunction:function(obj) {
	        return typeof obj === "function";
	    },
		isObject:function(obj) {
	        return typeof obj === "object";
	    },
	    isNumber:function(obj){
	        return '[object Number]' == Object.prototype.toString.call(obj) && isFinite(obj);
	    },
	    isArray:function(obj) {
	        return obj instanceof Array && obj['push'] != undefined; //ios 3.1.3 doesn't have Array.isArray
	    },
	    extend:function(target) {
	        if (target == undefined)
	            target = this;
	        if (arguments.length === 1) {
	            for (var key in target)
	                this[key] = target[key];
	            return this;
	        } else {
	            slice.call(arguments, 1).forEach(function(source) {
	                for (var key in source)
	                    target[key] = source[key];
	            });
	        }
	        return target;
	    },
	    each:function(elements, callback) {
	        var i, key;
	        if (mt.isArray(elements))
	            for (i = 0; i < elements.length; i++) {
	                if (callback(i, elements[i]) === false)
	                    return elements;
	            }
	        else if (mt.isObject(elements))
	            for (key in elements) {
	                if (!elements.hasOwnProperty(key))
	                    continue;
	                if (callback(key, elements[key]) === false)
	                    return elements;
	            }
	        return elements;
	    },
	    buildQuery:function(obj, prefix) {
            var str = [];
            
            for (var p in obj) {
            	if(obj.hasOwnProperty(p)){
                	var k = prefix ? prefix + "[" + p + "]" : p, 
               		v = obj[p];
                	str.push(mt.isObject(v) ? mt.buildQuery(v, k) : (k) + "=" + encodeURIComponent(v));
            	}
            }
            
            return str.join("&");
        },
        //parse Url to json
        parseUrl:function(query){
            
            var params  = query.split('&'),
                len     = params.length,
                result  = {},
                i       = 0,
                key, value, item, param;
            
            for (; i < len; i++) {
                if(!params[i]){
                    continue;
                }
                param   = params[i].split('=');
                key     = param[0];
                value   = decodeURIComponent(param[1]);
               
                item = result[key];
                if ('undefined' == typeof item) {
                    result[key] = value;
                } else if (mt.isArray(item)) {
                    item.push(value);
                } else { 
                    result[key] = [item, value];
                }
            }
            
            return result;
        },
        //getUrl query value;
        getQuery:function(url,key){
            var reg = new RegExp("(^|&|\\?|#)" + key + "=([^&#]*)(&|\x24|#)",""),
                match = url.match(reg);

            if (match) {
                return decodeURIComponent(match[2]);
            }
            
            return null;
        },
        uuid:function () {
            var S4 = function () {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+S4());
        }
	}

    /*
	* 浏览器判断
    */
    function detectUA(userAgent) {
        mt.os = {};
        mt.os.webkit = userAgent.match(/WebKit\/([\d.]+)/) ? true : false;
        mt.os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
        mt.os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
        mt.os.iphone = !mt.os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
        mt.os.webos = userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? true : false;
        mt.os.touchpad = mt.os.webos && userAgent.match(/TouchPad/) ? true : false;
        mt.os.ios = mt.os.ipad || mt.os.iphone;
        mt.os.blackberry = userAgent.match(/BlackBerry/) || userAgent.match(/PlayBook/) ? true : false;
        mt.os.opera = userAgent.match(/Opera Mobi/) ? true : false;
        mt.os.fennec = userAgent.match(/fennec/i) ? true : false;
        mt.os.desktop = !(mt.os.ios || mt.os.android || mt.os.blackberry || mt.os.opera || mt.os.fennec);
    }
   	detectUA(navigator.userAgent);

   	//ajax
	(function(){
		/* ajax request*/
	    var ajaxSettings = {
	        type: 'GET',
	        beforeSend: empty,
	        success: empty,
	        error: empty,
	        complete: empty,
	        context: undefined,
	        timeout: 0,
	        crossDomain:false
	    };

		mt.ajax = function(opts) {
	        var xhr,
	        reqId = mt.uuid();

	        try {
	            xhr = new window.XMLHttpRequest();
	            var settings = opts || {};
	            for (var key in ajaxSettings) {
	                if (!settings[key])
	                    settings[key] = ajaxSettings[key];
	            }
	            
	            if (!settings.url)
	                settings.url = window.location;
	            if (!settings.contentType)
	                settings.contentType = "application/x-www-form-urlencoded";
	            if (!settings.headers)
	                settings.headers = {};
	           
	            if(!('async' in settings)||settings.async!==false)
	                settings.async=true;
	            
	            if (!settings.dataType)
	                settings.dataType = "text/html";
	            else {
	                switch (settings.dataType) {
	                    case "script":
	                        settings.dataType = 'text/javascript, application/javascript';
	                        break;
	                    case "json":
	                        settings.dataType = 'application/json';
	                        break;
	                    case "xml":
	                        settings.dataType = 'application/xml, text/xml';
	                        break;
	                    case "html":
	                        settings.dataType = 'text/html';
	                        break;
	                    case "text":
	                        settings.dataType = 'text/plain';
	                        break;
	                    default:
	                        settings.dataType = "text/html";
	                        break;
	                }
	            }
	            if (mt.isObject(settings.data))
	                settings.data = mt.buildQuery(settings.data);
	            if (settings.type.toLowerCase() === "get" && settings.data) {
	                if (settings.url.indexOf("?") === -1)
	                    settings.url += "?" + settings.data;
	                else
	                    settings.url += "&" + settings.data;
	            }
	            
	            
	            if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
	                RegExp.$2 != window.location.host;
	            
	            if(!settings.crossDomain)
	                settings.headers = mt.extend({'X-Requested-With': 'XMLHttpRequest'}, settings.headers);
	            var abortTimeout;
	            var context = settings.context;
	            var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
	            xhr.onreadystatechange = function() {
	                var mime = settings.dataType;
	                if (xhr.readyState === 4) {
	                    clearTimeout(abortTimeout);

	                    var result, error = false;
	                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0&&protocol=='file:') {
	                        if (mime === 'application/json' && !(/^\s*$/.test(xhr.responseText))) {
	                            try {
	                                result = JSON.parse(xhr.responseText);
	                            } catch (e) {
	                                error = e;
	                            }
	                        } else
	                            result = xhr.responseText;
	                        //If we're looking at a local file, we assume that no response sent back means there was an error
	                        if(xhr.status===0&&result.length===0)
	                            error=true;
	                        if (error)
	                            settings.error.call(context, xhr, 'parsererror', error);
	                        else {
	                            settings.success.call(context, result, 'success', xhr);
	                        }
	                    } else {
	                        error = true;
	                        settings.error.call(context, xhr, 'error');
	                    }
	                    settings.complete.call(context, xhr, error ? 'error' : 'success');
	                }
	            };
	            xhr.open(settings.type, settings.url, settings.async);
	            
	            if (settings.contentType)
	                settings.headers['Content-Type'] = settings.contentType;
	            for (var name in settings.headers)
	                xhr.setRequestHeader(name, settings.headers[name]);
	            if (settings.beforeSend.call(context, xhr, settings) === false) {
	                xhr.abort();
	                return false;
	            }
	            
	            if (settings.timeout > 0)
	                abortTimeout = setTimeout(function() {
	                    xhr.onreadystatechange = empty;
	                    xhr.abort();
	                    settings.error.call(context, xhr, 'timeout');
	                }, settings.timeout);
	            xhr.send(settings.data);
	        } catch (e) {
	            console.log(e);
	        }
	        return xhr;
	    };
	})();


})(window);
/*mt event*/
(function(exports){
	var __Events__ = {},
	  _slice = Array.prototype.slice;

	function Event(name){
	  this.NAMESPACE = name;
	}

	var _EP_ = Event.prototype;

	_EP_.add = _EP_.addEvent = _EP_.addEventListener = function  (name,fn) {

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
	    fns2 = __Events__[id].once[name];

	  fns && fns.forEach(function(fn,i){
	    fn.apply(fn,args);
	  });

	  fns2 &&fns2.forEach(function(fn,i){
	    fn.apply(fn,args);
	  });
	  __Events__[id].once[name] = null;

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

	exports.Event = function  (name) {

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
})(mt);
//Class
(function(){

	var _globalMessageCenter = mt.Event('class');

	function _Class(){
		this.id = mt.uuid();
		this.__event__ = mt.Event('class.event.'+this.id);
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


	mt.createClass =  function(constractor,_extends){

		if(typeof constractor  === 'object'){
			_extends = constractor;
		}

		var emptyFunc = function(){};
		emptyFunc.prototype = _Class.prototype;

		var Class = function(){
			_Class.call(this);
			constractor.apply(this,arguments);
		}

		var fp = Class.prototype = new emptyFunc();

		// fp.extend = _extend;
		fp.extend = function(obj){
			_extend.call(this,fp,obj);
		}
		_extends &&  _extend.call(Class,fp,_extends);

		return  Class;
	}

	function _extend(fp,json){
		for(var p in json){
			fp[p] = json[p];
		}
	}
})();
/* Application*/
(function(){
	/*
	* Application Class
	*/
	var $routeConfig = {},
		$routeRegConfig = {};

	var  Application = mt.createClass(
		//construct
		function(ops){

			ops = ops || {};

			var self = this,
				__DATA__ = {
					action:{},
					controller:{},
					routeConfig:{},
					routeRegConfig:{},
					'status.runing':false
				};

			//添加action
			self.addEventListener('addAction',function(name,action){
				__DATA__['action'][name] = action;
			});
			//添加controller
			self.addEventListener('addController',function(name,controller){
				__DATA__['controller'][name] = controller;
			});
			//监听hash变化
			self.addEventListener('Action.change',function(hash,params){
				self.analyticRoute(self.getRoute(hash,params));
			});

			//错误处理
			self.addEventListener('error',function(code,action,msg,e){
				self.fire('error.'+code,{
					errorno:code,
					action:action,
					msg:msg,
					detail:e
				});
			});

			//获取
			self.get = function(key){
				return  __DATA__[key];
			}

			//扩展配置
			if(ops.route){
				this.addRoute(ops.route);
				delete ops.route;

				mt.extend(self,ops);
			}
		},
		//methods and prop
		{	
			routeSep:"/",
			hashStart:"#",
			defaultController:"site",
			defaultAction:"index",
			history:[],
			isFirstAction:true,
			run:function(fn){

				var isRuning = this.get('status.runing');

				if(!isRuning){
					this.fire('run');
					isRuning = true;
				}

				if(fn && mt.isFunction(fn))
					fn.apply(this);
			},
			isBackAction:function(route){
				var len = self.history.length,
					currentAction;

				if(len<=0)
					return false;

				currentAction = self.history[len-2];

				return (currentAction === route);
			},
			addAction:function(name,action){
				this.fire('addAction',name,action);
			},
			addController:function(name,controller){
				this.fire('addController',name,controller);
			},
			addRoute:function(strRoute,route){
				var $routeRegConfig = this.get('routeRegConfig'),
					$routeConfig = this.get('routeConfig');

				var _addRoute = function(routeKey,routeVal){
					var _matches = /<([^>]+)>/g.exec(routeKey);

					if(_matches && _matches[1]){
						 var retRoute = parseRoute(_matches,routeKey);

						 $routeRegConfig[retRoute['route']] = {
						 	route:routeVal,
						 	params:retRoute['params']
						 }
					}else{
						$routeConfig[routeKey] = routeVal;
					}
				}

				if('object' === typeof strRoute){
					for(var p in strRoute){
						_addRoute(p,strRoute[p]);
					}
				}else if(route){
					_addRoute(strRoute,route);
				}

				return this;
			},
			analyticRoute:function(routeObj){

				var self = this,
					isBack,
					arrRoute = routeObj.route.split(self.routeSep),
					strController = arrRoute[0],
					controllers  = self.get('controller'),
					controllerObj = controllers[strController],
					strAction = arrRoute[1]?self.routeSep + arrRoute[1]:null,
					strRoute = strController + (strAction?strAction:''),
					actions = self.get('action'),
					next = true,
					action;

				//save to fromAction
				if(self.history.length >0 )
					self.from = self.history[self.history.length-1];

				if(self.isBackAction(strRoute))
					isBack = true;

				self.fire('action.start',strRoute);
				/*
				* 执行全局性的beforeAction
				*/
				if(self.beforeAction && mt.isFunction(self.beforeAction))
					next = self.beforeAction.apply(self,[routeObj.params,self]);

				/*全等于false时*/
				if(next !== false){
					/*解析action*/
					if(controllerObj){
						
						if(!strAction)
							strAction = self.defaultAction;

						if(controllerObj[strAction+'Action'] && mt.isFunction(controllerObj[strAction+'Action'])){
							/*
							* 解析controller
							*/
							try{
								if(controllerObj.beforeAction && mt.isFunction(controllerObj.beforeAction)){
									next = controllerObj.beforeAction.apply(self,[routeObj.params,self]);
								}

								if(next !==false){
									next = controllerObj[strAction+'Action'].apply(self,[routeObj.params,self]);
									
									if(next !== false){
										if(controllerObj.afterAction && mt.isFunction(controllerObj.afterAction)){
											controllerObj.afterAction.apply(self,[routeObj.params,self])
										}
									}else{
										self.fire('action.stop',strRoute);
									}
								}else{
									self.fire('action.stop',strController+self.routeSep+'beforeAction',strController);
								}
								self.fire('action.complete',strRoute);
							}catch(e){
								self.fire('error',500,strRoute,'action has some error.',e);
							}
						}else{
							self.fire('error',404,strRoute,'not found action.');
						}
					}else{
						/*
						* 函数级别的action处理
						*/
						action = actions[strRoute];

						if(!action){
							self.fire('error',404,strRoute,'not found action.');
						}else{
							try{
								action.apply(self,[routeObj.params,self]);
								self.fire('action.complete',strRoute);
							}catch(e){
								self.fire('error',500,strRoute,'action has some error.',e);
							}
						}
					}
				}else{
					self.fire('action.stop','beforeAction');
				}

				if(self.isFirstAction){
					self.fire('ready',self);
					delete self.isFirstAction
				}

				//清理浏览记录
				if(isBack){
					self.history.pop();
				}else{
					self.history.push(strRoute);
				}

			},
			addErrorHandle:function(errorcode,fn){
				this.addEventListener('error.'+errorcode,fn);
			},
			getRoute:function(hash,$params){

				hash = hash.replace(this.hashStart,'');

				if(hash == '')
					hash = this.defaultController;

				if(hash){
					var path = hash.split('?'),
						dir = path[0],
						route,
						reg,
						match,
						params = $params || {},
						$routeRegConfig = this.get('routeRegConfig'),
						$routeConfig = this.get('routeConfig');;

					//传入params时不解析url
					if(path[1] && !$params){
						params = mt.parseUrl(path[1]);
					}
					
					if($routeConfig[dir]){
						route = $routeConfig[dir];
					}else{

						for(var p in $routeRegConfig){

							reg  = new RegExp(p);

							if(match = reg.exec(dir)){
								route = $routeRegConfig[p].route;

								var _params = $routeRegConfig[p]['params'],
									i=0,l;

								if(_params){
									l = _params.length;

									for(;i<l;i+=1){
										params[_params[i]] = match[i+1];
									}

								}
								break;
							}
						}

						if(!route){
							route = dir;
						}
						
					}

					return {
						route:route,
						params:params
					}
				}
			}
		}
	);
	
	function parseRoute(match,strRoter){
		var i = 1,
			l = match.length,
			_arr,
			reg,
			params = [];

		for(;i<l;i+=1){
			_arr = match[i].split(':');
			
			if(_arr.length===2){
				reg = _arr[1];
				params.push(_arr[0]);
				strRoter = strRoter.replace('<'+match[i]+'>','('+reg+')');

			}
		}
		return  {'route':strRoter,'params':params};
	}
	mt.createApp = function(ops){
		return new Application(ops);
	}
})();
/*
* mt.module lib
*/
(function(api){
	var version = "1.0.0",
	Module = function(){
		if(arguments.length==2){
			return define.apply(define,arguments);
		}else{
			return require.apply(require,arguments);
		}
	},
    //设置：不异步请求模块
    $async_off,
    //设置，不缓存模块
	$noCache,
	require_reg = /\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|[;=(,:!^]\s*\/(?:\\.|[^\/\\])+\/|(?:^|\W)\s*require\s*\(\s*("[^"\\]*"|'[^'\\]*')\s*\)/g,
	baseUri = document.location.pathname,
    _maps = {},
	blankFn = function(){},
	//cached modules 
	_modules = {},
	//utils 
	_slice = Array.prototype.slice;

	var define = function (id,fn,update){
                          
		if(id === '')
			return;
		                          
		if(_maps[id]){
		    id= _maps[id];
		}

		if(_modules[id] && !update)
			throw 'Module '+id+' already exist!';

        //对象，数据，字符串模块
		if(mt.isFunction(fn)){
            _modules[id] = {
                id:id,
                fn:fn,
                exports:{}
            };                    
		}else{
            _modules[id] = {exports:fn};
        }
	}
	
	var require = function(id){
		
		var mod = _modules[id],
		fn,
		ret;

		if(mod){
			fn = mod.fn;
			if(fn){
				ret =  typeof fn==='function'?fn(require,mod.exports,mod):fn;
				if(ret)
					mod.exports = ret;
				delete mod.fn;	
			}
			return  mod.exports;
		}else{
            //未关闭异步获取模块
            if(!$async_off)
		      return loadMod(id);
		}
	}

	;(function initMod(){
		var scripts = document.getElementsByTagName('script'),
			len = scripts.length,
			currentScript = scripts[len-1],
			_url = currentScript.getAttribute('src'),
			noCache = mt.getQuery(_url,'noCache')*1,
            async_off = mt.getQuery(_url,'async'),
			_baseUri;
            
		if(noCache)
			$noCache = noCache;

        if(async_off && async_off == 0)
            $async_off = true;

		_baseUri = mt.getQuery(_url,'baseUri')||mt.getQuery(_url,'b');

		if(_baseUri){
			baseUri = _baseUri;
		}
		
	})();
	Module.setBaseUri = function(uri){
		baseUri = uri;
	}
	Module.setMap = function(key,val){
		if(typeof key === 'object'){
			for(var p in key){
				_maps[p] = key[p]
			}
		}else if(typeof key ==='string' && val){
			_maps[key] = val;
		}
	}

	api['module'] = Module;
	//old require
	// if(api.require){
	// 	api.require = require;
	// 	// api.oldRequire = api.require;
	// 	console.warn("Already exist another module engine,please use mt.module.require load qmobi's modules.");
	// }else{
	// 	api.require = require;
	// }

	if(!window.require)
		window.require = require;
	//
	// Removes relative segments from a path
	function collapse(path) {
		var a = path.split("/"), out = [], i=0, e;

		for (; i < a.length; ++i) {
			e = a[i];

			if (e === ".")
				continue;
			else if (e === ".." && out.length > 0)
				out.pop();
			else
				out.push(e);
		}

		return out.join("/");
	}

	/** 获取文件path
	 * get path dir
	 * @param  {String} path js module path
	 * @return {String} dir of js module
	 */
	function dir(path) {
		var i = path.lastIndexOf("/");
		return (i >= 0) ? path.substring(0, i + 1) : "";
	}

	/**
	 * 获取唯一的模块id
	 * @param  {String} id 模块路径
	 * @param  {String} path 所在的路径
	 * @param  {Boolen} full 是还是需要完整的路径
	 * @param  {String} lib [description]
	 * @return {String}
	 */
	function resolve(id, path, full, lib) {

		if (typeof id !=='string')
			return "";

		// Trim input
		id = id.trim();
		//id = id.replace(/\.js.*$/,'');

		var c = id.charAt(0),
		map,
		term,
		pos,
		pkg;

		if (c === ".") // Relative
		{
			id = (path || "") + id;
		}

		id = collapse(id);
		return id;
	}

	function loadMod(id){

		var ret,
		getEng,
		prevId = id;

		if(_maps[id]){
			id = _maps[id];
		}

		if(!/\.js\??.*$/.test(id))
			id+='.js';

		id = resolve(id);

        if($noCache)
            id +='?r='+new Date().getTime(); 
        
        if(api.ajax)
        	getEng = api.ajax;
        //for jquery
        if(typeof $ !=='undefined' && typeof $.ajax !='undefined')
        	getEng = $.ajax;

		getEng({
			url:baseUri+id,
			async:false,
			timeout:2000,
			error:function(res){
				console.error('Load module "'+prevId+'" Error:'+'(code:'+res.status+',msg:'+res.statusText+')')
			},
			success:function(res){
				if(res){
					var dep =[],
						resTxt = res,
						i,
						path = dir(id),
						modStr,
						trueId;

					for (require_reg.lastIndex = 0; m = require_reg.exec(resTxt);){
						if (m[1])
							dep.push(m);
					}

					if(dep.length>0){
						for(i =0;i<dep.length;i++){
							tureId = resolve(path+ collapse(dep[i][1].replace(/['"]/g,'')));
							resTxt = resTxt.replace(dep[i][0],'=require("'+tureId+'")');
						}
					}

					id = id.replace(/\.js\??.*$/,'');

					modStr = 'define("'+id+'",function(require,exports,mod){'+resTxt+'})';
					
					try{
						eval(modStr);
						ret = Module(id);
					}catch(e){
						console.warn('Parse module "'+id+'" error:');
						console.error(e);
					}
				}
			}
		});
		return ret;
	}	
})(mt);
/*
* mt.template
*/
(function(){

	var exports = mt.template = {};

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
	            message: 'Not Cache'
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

	exports.plugin('default',function(str,val){
	    if(str==="")
	        return val;
	    
	    return str;
	});
})();