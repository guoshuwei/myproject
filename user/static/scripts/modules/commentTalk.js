var moveFocus = require('../modules/movefocus');

var formMod = require('../modules/form');

var resultCall = require('../modules/ajaxcodecall');

var animate = require('../modules/animate');

var pk = require('../modules/pk');

var template = require('../modules/template');

var username = $('#comment-username').val();

var eventTouchEnd = "touchend", isTouchSupported = true;
if (!("createTouch" in document)) {
    eventTouchEnd = "click";
    isTouchSupported = false;
}
var mask = function(){
	function createDom() {
        var masker = document.createElement('div'),
        height = $('body').height(),
        width = $('body').width();
        masker.id = 'comment-popup-mask';
        $('body').append(masker);
        $(masker).css({
            width: width,
            height: height,
            background: '#000',
            zIndex: 30,
            opacity: '.7',
            position: 'fixed',
            top: 0,
            left: 0
        });
    }

      return {
          show: function(html, txt) {

              var ele = document.getElementById('comment-popup-mask');
              if (!ele) {
                  createDom();
              } else {
                  $(ele).show();
              }
          },
          hide: function() {
              $('#comment-popup-mask').remove();
          }
      }		
}();

var popupBox = function(){
	var 

	popupBoxHtml = function(){
		var _html = [];

		var platname = $('#template-plat-name').val();
		var platDomain = $('#template-plat-domainBody').val();
		var comment= $('[role=comment-popup]').attr('role-data');

		var content = template.render('commnetPopupTpl',{platDomain:platDomain,platname:platname,commentcon:comment,time:new Date().getTime()});

		$('body').append(content);

		return $('.mod-comment-popup');
	};

	return {
		show : function(){
			var popup = popupBoxHtml();
			mask.show();
			popup.fadeIn(500);
		},
		hide : function(){
			$('.mod-comment-popup').fadeOut(500,function(){
				mask.hide();
				$('.mod-comment-popup').remove();	
			});
		}
	}
}();

var replayBox = function(){

	var replayBoxHtml = function(data,url){

		data = data.split('|');

		var 
		_data = {};
		_data.data = {};

		for(var i = 0 ; i < data.length ; i++){
			var _temp = data[i].split(':');
			_data.data[_temp[0]] = _temp[1];
		}

		_data.url = url;

		var content = template.render('replyTpl',_data);

		return content;
	}

	return {

		show : function(parent,data,url){
			parent.append(replayBoxHtml(data,url));
			var replayBox = parent.find('.reply-box');
			textarea = replayBox.find('textarea');
			rut_width = replayBox.find('div.reply_user_txt').width();
			textarea.css('text-indent',(rut_width+5)+"px");
			
			replayBox.hide().slideDown(600, function() {

				var _textarea = replayBox.find('.reply-textarea');

				_textarea.trigger('focus');
				moveFocus.end(_textarea[0]);

				if(_textarea[0].attachEvent) {
				    _textarea[0].attachEvent('onpropertychange',function(e) {
				        if(e.propertyName!='value') return;
				        $(_textarea[0]).trigger('input');
				    });
				}
			});
		},
		hide : function(target){
			target.slideUp(600,function(){
				target.remove();
			})
		}
	}
}();

var listenChange = function(ele){
	var parent = ele.parents('.reply-box');
	var baseLineHeight = 36;
	var max = parseInt(parent.attr('max'));
	var len = ele.val().length;;
	var popup = ele.parents('.mod-comment-popup');
	var scrollval = ele[0].scrollTop;
	var scrollHeight = ele[0].scrollHeight - parseInt(ele.css('padding-top')) - parseInt(ele.css('padding-bottom'));

	if(popup.length > 0){
		max = parseInt(popup.attr('max'));
	}

	var min = max - len;

	if(popup.length == 0){

		parent.find('.shownum').html(min);

		
		ele.css({
			height : scrollval + scrollHeight
		});

	}else{
		
		popup.find('.shownum').html(min);
	}
}

var fixedImg = function(){
	function create(src,callback){
		var img = new Image();
        img.src = src;
		img.onload = function(){
            var str = "<div id='mod-comment-fixedImg'>";
            var reg = /_invest_/img;
            var title = reg.test(src) ? "【平台分布】" : "【流动性】";
            str += "<div style='position:absolute;top:14px;width:100%;text-align:center;color:#0080cc;font-size:18px;'>" + title + "</div>"
            str += "<img src='"+src+"'/></div>";
			$('body').append(str);
			callback(str);
		}	
	}

	return {
		show : function(src){
			create(src,function(imgBox){
				mask.show();
				$('#mod-comment-fixedImg').fadeIn();
			})
		},
		hide : function(){
			$('#mod-comment-fixedImg').fadeOut(function(){
				mask.hide();
				$('#mod-comment-fixedImg').remove();
			});
		}
	}

}();

var getView = function(){
	var url = function(){
		var host = window.location.host;
		host = host.split('.')[0];
		if(host == 'licai'){
			return '/getViewsTpl';
		}else{
			return '/ajax/getViewsTpl';
		}
	}();
	$.ajax({
		url : url,
		type : 'get',
		dataType :'json',
		data : {type : 'comment'},
		success : function(res){
			if(res.code == 200){
				$('body').append(res.data[0]);
			}
		}
	})
}();


function createComment(data,ele,limit){
	var 
	html = data.str,
	parent = $(ele).parents('.mod-comment .mc-bd'),
	item = $(ele).parents('.feed-detail');
	var add = item.attr('replayadd');
	if(!limit){
		comm_ = $(html);
		var _parent = parent.find('.comment-inner');
		if(_parent.length == 0){
			$('.comment-inner').prepend(comm_);
		}else{
			parent.find('.comment-inner').prepend(comm_);
		}
	}else{
		parent.find('.comment-inner').append(html);	
	}
	$(ele).find('textarea').val('');


}

function createReply(data,ele){

	var 

	html = data.str,

	parent = $(ele).parents('.feed-detail'),

	replyList = parent.find('.item-list'),

	_replayBox;

	if(replyList.length == 0){
		replyList = document.createElement('ul');
		$(replyList).addClass('item-list');
		parent.find('.detail-wrap').append(replyList);
	}
	$(replyList).append(html);

	_replayBox = ele.parents('.reply-box');

	replayBox.hide(_replayBox);

	parent.find('.floor .reply i').html(data.reply_count);
}

function createPraise(data,ele){

	var url = ele.data('url');
	if(!_Fn.isLogin()) return false;
	$.ajax({
		url : url?url:'/User/setPraise',
		type : 'post',
		dataType : 'json',
		data : data,
		success : function(res){
			if(res.code == 200){
				var numi = ele.find('i');
				if(res.data.total>0){
					numi.html(res.data.total);
				}else{
					var total = parseInt(numi.html());
					numi.html(total+1);
				}
				animate.numberUp(ele);
			}else{
				resultCall(res);
			}
		},
        error:function(){
            console.log("返回信息错误");
        }
	})
}

function saveInvest(that){

	var 

	data = that.attr('role-data').split('|'),

	_data = {};

	for(var i = 0 ; i < data.length ; i++){
		var _temp = data[i].split(':');
		_data[_temp[0]] = _temp[1];
	}

	$.ajax({
		url : _data.url,
		type : 'post',
		dataType : 'json',
		data : _data,
		success : function(res){
			if(res.code == 200){
				that.find('i').html(parseInt(that.find('i').html())+1);
				that.find('em').addClass('ed');
				animate.numberUp(that);

			}else if(res.code == 4527){
				that.find('i').html(parseInt(that.find('i').html())-1);
				that.find('em').removeClass('ed');
				animate.numberUp(that,{
					color:'#0080cc'
				},"-1");
			}else{
				resultCall(res);
			}
		}
	})


}

$('body')
.on('click','[role=comment-reply]',function(){

	if(!_Fn.isLogin()) return;

	var data = $(this).attr('role-data');
	var url = $(this).attr('role-url');
	var floor = $(this).parents('.floor');
	var isFloor = floor.length;
	var replyParent = isFloor ? floor : $(this).parents('.item-wrap');
	var replyButtom = replyParent.find('.reply-box');
	if(replyButtom.length > 0){
		replayBox.hide(replyButtom);
	}else{
		replayBox.show(replyParent,data,url);	
	}

})
.on('mouseenter','.reply-submit',function(){
	$(this).addClass('current');
})
.on('mouseleave','.reply-submit',function(){
	$(this).removeClass('current');
})
.on('input','.reply-textarea',function(){
	var that = $(this);
	listenChange(that);	
	
})
.on('click','[role=praise]',function(){
	if(!_Fn.isLogin()) return false;
	var that = $(this);
	var data = function(){
		var data = that.attr('role-data').split('|');
		var _data = {}
		for(var i = 0 ; i < data.length ; i++){
			var _temp = data[i].split(':');
			_data[_temp[0]] = _temp[1];
		}
		return _data;
	}();
	createPraise(data,that);
	return false;
})
.on('mouseenter','.mod-comment-popup .mod-starbig .img-wrap em',function(){
	var that = $(this);
	var index = that.index();
	var parent = that.parents('.mod-starbig');
	
	parent.find('.img-rate').css({
		width : (index+1) * 20 + '%'
	});
})
.on('mouseleave','.mod-comment-popup .mod-starbig .img-wrap em',function(){
	var that = $(this);
	var parent = that.parents('.mod-starbig');

	if(!parent.hasClass('clock')){
		parent.find('.img-rate').css({
			width : '0%'
		})
	}else{
		parent.find('.img-rate').css({
			width : parent.find('input').val() * 20 + '%'
		})
	}
})

.on('click','.mod-comment-popup .mod-starbig .img-wrap em',function(){
	var that = $(this);
	var parent = that.parents('.mod-starbig');
	var index = that.index() + 1;
	parent.addClass('clock').attr('data',index);

	parent.find('input').val(index);
})

.on('click','.mod-comment-popup .close',function(){
	popupBox.hide();
})

.on('click','[role=comment-popup]',function(){
	if(!_Fn.isLogin()) return;
	popupBox.show();
})
.on('click','.mod-comment-popup .imgcode',function(){
	$(this).attr('src','/Ajax/getVcode?type=platcomment&v='+new Date().getTime());
})
.on('click','.mod-comment-popup .changecode',function(){
	var parent = $('.mod-comment-popup');
	parent.find('.imgcode').attr('src','/Ajax/getVcode?type=platcomment&v='+new Date().getTime());
})
.on('mouseenter','.mod-comment-popup .reply-submit',function(){
	$(this).addClass('current');
})
.on('mouseleave','.mod-comment-popup .reply-submit',function(){
	$(this).removeClass('current');
})
.on('mouseenter','.mod-comment .share-pic li',function(){
	$(this).addClass('current');
})
.on('mouseleave','.mod-comment .share-pic li',function(){
	$(this).removeClass('current');
})
.on(eventTouchEnd,'.mod-comment .share-pic li',function(){
	var data = $(this).attr('data');
	fixedImg.show(data);
})
.on(eventTouchEnd,'#comment-popup-mask',function(){
	fixedImg.hide();
})

.on('click','[role=saveInvest]',function(){
	var that = $(this);
	if(!_Fn.isLogin()) return;
	saveInvest(that);


	
	//animate.numberUp(that.find('a'));
})

pk.listen({
	parent : '.mod-comment'
});

function formModErrorHandler(validResutl){
	var item  = validResutl.element,
        parent = item.parent();
    if(item.attr('name')=='content'){
        _Fn.alert('请输入10-2000个字符的回复内容');
    }
}

function formModAjaxBefore(form){
	var submit = form.find('input[type=submit]');
	animate.loading().show(submit);
}

//平台评论
formMod.listen('/User/commentcommit',{
	//验证错误
    validError:function(validResutl){

        var item  = validResutl.element,
            parent = item.parent();
        if(item.attr('name')=='service_score'){
        	_Fn.alert('请为平台的服务态度打分');
        }
        if(item.attr('name')=='ex_score'){
        	_Fn.alert('请为平台的服务体验打分');
        }
        if(item.attr('name')=='safe_score'){
        	_Fn.alert('请为平台的安全性打分');
        }

        if(item.attr('name')=='content'){
        	_Fn.alert('请输入10-2000个字符的回复内容');
        }
        if(item.attr('name')=='code'){
        	alert('请输入正确的验证码');
        }
    },
    ajaxBefore : formModAjaxBefore,
    success:function(res){
    	var that = this;
    	var res = res.data ? res.data : null;
    	animate.loading().hide(function(){
	    	if(!res) return;
	        if(res.code == 200){
                var _url = window.location.href;
                _urlSplit = _url.split('/');
				if(_url.indexOf('licai.p2peye.com') > -1){//回款页面回复的统计 8.1 00:00 ---8.15:24:00后删除
					_Fn.track.fire(113000020);
				}else if(_urlSplit[3] == '#tocomment' || _urlSplit[3] == '#tocomment' ||  _urlSplit[3] == ''){
                    _Fn.track.fire(116000009);
                }else if(_urlSplit[3] == 'comment'){
                    _Fn.track.fire(116000011);
                }
	        	popupBox.hide();
	        	createComment(res.data,that);
	        	that.find('textarea').text('');
	        	that.find('.shownum').html(2000);
				_Fn.message('点评成功！');
	        }else if(res.code == 5199){
				popupBox.hide();
				createComment(res.data,that);
				that.find('textarea').text('');
				that.find('.shownum').html(2000);
				_Fn.alert(res.message);
				setTimeout(function(){
					window.location.reload()
				},1000)
			}else{
	        	resultCall(res);
	        }
        });
    }
});
//平台评论回复
formMod.listen('/User/commentcommit?t=reply',{
	//验证错误
    validError:formModErrorHandler,
    ajaxBefore : formModAjaxBefore,
    success:function(res){
    	var that = this;
    	var res = res.data ? res.data : null;
    	animate.loading().hide(function(){
	    	if(!res) return;
	        if(res.code == 200){
	        	that.find('textarea').text('');
	        	that.find('.shownum').html(2000);
	        	createReply(res.data,that);

	        }else{
	        	resultCall(res);
	        }
        });
    }
});

//资产配置评论
formMod.listen('/pushProfileComment',{
	//验证错误
    validError:formModErrorHandler,
    ajaxBefore : formModAjaxBefore,
    success:function(res){
    	var that = this;
    	var res = res.data ? res.data : null;
    	animate.loading().hide(function(){
    		if(!res) return;
	        if(res.code == 200){
	        	popupBox.hide();
	        	createComment(res.data,that);
	        	that.find('textarea').val('');
	        	that.find('.shownum').html(2000);
	        }else{
	        	resultCall(res);
	        }
        });
    }
});

//平台评论回复
formMod.listen('/pushProfileComment?t=reply',{
	//验证错误
    validError:formModErrorHandler,
    ajaxBefore : formModAjaxBefore,
    success:function(res){
    	var that = this;
    	var res = res.data ? res.data : null;
    	animate.loading().hide(function(){
	    	if(!res) return;
	        if(res.code == 200){
	        	that.find('textarea').val('');
	        	that.find('.shownum').html(2000);
	        	createReply(res.data,that);
	        }else{
	        	resultCall(res);
	        }
        });
    }
});


function listen(url1,url2,type){

	//资产分享评论
	formMod.listen(url1,{
		//验证错误
	    validError:formModErrorHandler,
	    ajaxBefore : formModAjaxBefore,
	    success:function(res){
            var res = res.data ? res.data : null;
	    	var that = this;
	    	animate.loading().hide(function(){
		    	if(!res) return;
		        if(res.code == 200){
                    _Fn.message('评论成功！')
		        	that.find('textarea').val('');
		        	that.find('.shownum').html(2000);
                    if(!type){
	                   popupBox.hide();
                    }
		        	createComment(res.data,that);
		        }else{
		        	resultCall(res);
		        }
	        });
	    }
	});

	//资产分享评论回复
	formMod.listen(url2,{
		//验证错误
	    validError:formModErrorHandler,
	    ajaxBefore : formModAjaxBefore,
	    success:function(res){
	    	var res = res.data ? res.data : null;

	    	var that = this;

	    	animate.loading().hide(function(){
		    	if(!res) return;

		        if(res.code == 200){
                    _Fn.message('评论成功！')
		        	that.find('textarea').text('');
		        	that.find('.shownum').html(2000);
		        	createReply(res.data,that);
		        }else{
		        	resultCall(res);
		        }
		    });
	    }
	});

}


listen('/User/setFeedComment','/User/setFeedComment?t=reply');

//专题模板
listen('/User/seteyespecialcomment','/User/seteyespecialcomment?t=reply');

return {
	listen : function(url1,url2){
		listen(url1,url2);		
	},
    logn :function(){
        if(!_Fn.isLogin()) return false;
        return true;
    }
}

