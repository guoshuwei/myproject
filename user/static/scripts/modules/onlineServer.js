var 
dialogUi = require('../modules/dialogUi'),
mask = require('../alert/mask'),
message = require('../alert/alertMsg');

var online = (function(){

	var 

	username,//存储用户名

	dialog,

	template = function(uname){
		var html = [];
		html.push('<div style="margin-left:-15px;margin-top:-15px;">');
			html.push('<iframe id="iframeparent" src="https://www.touyouquan.com/webim/client.php?locale=zh-cn&amp;style=simplicity&username='+uname+'" frameborder="0" scrolling="no" width="688" height="518"></iframe>');
		html.push('</div>');

		return html.join('');
	};

	function createDom(call){
		if(dialog){
			dialog.open();
			return;
		}

		var parent = $('.page_container .qt-grid');
		parent.append('<a style="display:block;width:75px;height:96px;background:url(/styles/images/online.png) no-repeat;position:absolute;bottom:-96px;right:-75px;" id="server_online" href="javascript:;" role="dialog" role-api="contact_service"></a>');
		parent.css('position','relative');
		call();
	}

	var checkListener = function(){

	    var flag = null;

	    return function(that){

	        if (flag) return;

	        that.addEventListener('close',function(listenType,_target){
	            var iframe=document.getElementById("iframeparent");
				var iframeWindow = iframe.contentWindow;
				
				window.closedialog = function(){
					that.target.remove();
				}
				iframeWindow.st.fh.fu(closedialog);
	        });

	        flag = true;
	    }
	}();
	function listen(){

		dialogUi.listen('contact_service',function(){

			var _dialog = this;

			$.post("/member/contactcustomer",function(result){
				if(result.code == 200){
					username = result.username;
					dialog = _dialog;
					dialog.showLightbox = true;
				    dialog.setTitle('在线客服');
				    dialog.setSkin('newdialog');
				    dialog.setBox(688,558);
				    var htm = 
				    dialog.setContent(template(username));
				    checkListener(dialog);
				    dialog.open();
				}else if(result.code == 4000){
					message.show(result.msg);
				}else{
					location = "/";
				}
			},'json');
		});
	}


	return {
		init : function(){
			createDom(listen);
		}
	}

})();


online.init();

