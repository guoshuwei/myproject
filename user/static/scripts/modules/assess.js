var 
	err_msg = require('../modules/errmessage'),
	template = require('../modules/template'),
    getUrl = require('../modules/urlParam'),
	message = require('../alert/alertMsg');
exports.upordown = function (url,ele,type) {

	var parents = $(ele).parents('li');

    var id = parents.attr('commentid');

    $.ajax({
        url : url,
        type:'post',
        dataType:'json',
        data:{
        	id : id,
        	type : type
        },
        success:function(result){

        	if(result.code == 200){

        		//message.show('顶踩成功!');

                if(type == 1){

        		  $(ele).html(parseInt($(ele).html()) + 1);

                }else{
                    var _ele = $(ele).parents('li').find('.rw-agr');
                    _ele.html(parseInt(_ele.html()) - 1);  
                }

                return ;
            }

            if(result.code == 4100){

                window.location.href = 'https://www.touyouquan.com/login.html';
            }

            //message.show(err_msg[result.code]);
            
        }
    });
}
exports.upDown = function (url,ele,type) {

	var parents = $(ele).parents('li');
    var hid = parents.attr('hid');
    var id = parents.attr('commentid');
    var page = parents.attr('page');

    $.ajax({
        url : url,
        type:'post',
        dataType:'json',
        data:{
        	pid : id,
        	type : type,
            page : page,
            hid : hid
        },
        success:function(result){
            
        	if(result.code == 200){
                
        		//message.show('顶踩成功!');

                if(type == 1){

        		  $(ele).html(parseInt($(ele).html()) + 1);

                }else{
                    var _ele = $(ele).parents('li').find('.rw-agr');
                    _ele.html(parseInt(_ele.html()) - 1);  
                }

                return ;
            }

            if(result.code == 4100){

                window.location.href = 'https://www.touyouquan.com/login.html';
            }

            //message.show(err_msg[result.code]);
            
        }
    });
}
exports.showLoading = function(obj){
    $(obj).show();
};
exports.hideLoading = function(obj){
    $(obj).hide();
};
exports.loadMore = function(url,data,parent,that,templateName,successCall,errorCall,endCall){
	var 

	html = [];

    $.ajax({
        url: url,
        type:'post',
        dataType:'json',
        data:data,
        success:function(result){
            var localData = {};
        	if(result.code == 200){
                if(typeof data == 'string'){
                    data = '?'+data;
                    var getData = getUrl.get(data);
                    if(getData&&getData.params){
                        localData = getUrl.get(data).params;
                    }
                }else{
                    localData = data;
                }

                if(!successCall){

            		if(result.data){
    	        		$.each(result.data,function(i,item){
                            item['params'] = localData;
    	                    html.push(template.render(templateName,item));
    	                });

    	                parent.append(html.join(''));
            		}else{
            			that.html('已全部加载！');
                    	that.attr('status',2);
            		}

            		that.attr('clock','');
	        	}else{
                    successCall(result.data);
                }

                if(endCall){
                    endCall();
                }

        		return;
        	}

            if(result.code == 4100){

                window.location.href = 'https://www.touyouquan.com/login.html';
                
                return;
            }

        	message.show(err_msg[result.code]);

        	if(errorCall){
        		errorCall();
        	}
            //moreFlag = false;

        }
    });
}