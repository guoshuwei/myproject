exports.buildAboutMe = function(feed_msg){ //@我的 dom
	if (feed_msg==null || feed_msg=='') {
		return '';
	};
	
	var returnStr = [];
	var src_img = feed_msg.src_img == ''? '/uploads/avatar/default.png':feed_msg.src_img;
	switch(feed_msg.type){
		//关注的人发表的动态
		case '1':
			
		break;
		//@我评论
		case '2':
            returnStr.push('<div>');
			returnStr.push('<div class="dy_list">');
			returnStr.push('<a class="dy_userimg" href="/feed/other?uid='+feed_msg.from_uid+'" target="_blank"><img onerror="this.src=\'/uploads/avatar/default.png\'" alt="" src="'+feed_msg.from_img+'"></a>');
			if(feed_msg.src_feed.src_id){
                returnStr.push('<div class="dy_main" content_str="'+feed_msg.content_str+'" src_uid="'+feed_msg.src_uid+'" src_id="'+feed_msg.src_feed.src_id+'" main_id="'+feed_msg.main_id+'" type="'+feed_msg.type+'">');    
            }else{
                returnStr.push('<div class="dy_main" content_str="'+feed_msg.content_str+'" src_uid="'+feed_msg.src_uid+'" src_id="0" main_id="'+feed_msg.main_id+'" type="'+feed_msg.type+'">');
            }
			returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.from_uid+'" target="_blank">'+feed_msg.from_nickname+'</a><em>|</em><span>'+feed_msg.create_time+'</span></p>');
			returnStr.push('<p class="dy_content">'+feed_msg.content+'</p>');
            returnStr.push('<div class="dy_atbox qt-pr">');
            returnStr.push('<span class="qt-pa dy_atj">&nbsp;</span>');
            returnStr.push('<p class="dy_at"><a href="/feed/other?uid='+feed_msg.src_feed.src_uid+'">@'+feed_msg.src_feed.src_nickname+'</a></p>');
            returnStr.push('<p class="dy_content">'+feed_msg.src_feed.content+'</p>');
            returnStr.push('</div>');
			returnStr.push('<div class="dy_habox">');
			returnStr.push('<div class="dy_handle">');
			returnStr.push('<ul>');
			returnStr.push('<li class="dy_delete" aboutme="is"><a href="javascript:void(0);">删除</a></li>');
			returnStr.push('<li class="dy_forwarding"><a href="javascript:void(0);">转发(<span>'+feed_msg.src_feed.turn_num+'</span>)</a></li>');
			returnStr.push('<li class="dy_comments"><a href="javascript:void(0);">评论(<span>'+feed_msg.src_feed.reply_num+'</span>)</a></li>');
			returnStr.push('<li class="dy_praise"><a href="javascript:void(0);"><em></em><b>'+up_str(feed_msg.src_feed.up_att)+'</b>(<span>'+feed_msg.src_feed.up_num+'</span>)</a></li>');
			returnStr.push('</ul>');
			returnStr.push('</div>');
            returnStr.push('<div class="dy_insert"></div>');
			returnStr.push('</div>');
			returnStr.push('</div>');
			returnStr.push('</div>');
            returnStr.push('</div>');
		break;
		//@我动态
		case '3':
            returnStr.push('<div>');
			returnStr.push("<div class=\"dy_list\">");
			returnStr.push('<a class="dy_userimg" href="/feed/other?uid='+feed_msg.src_uid+'" target="_blank"><img onerror="this.src=\'/uploads/avatar/default.png\'" alt="" src="'+src_img+'"></a>');
            if(feed_msg.src_feed.src_id){
                returnStr.push('<div class="dy_main" content_str="'+feed_msg.content_str+'" src_uid="'+feed_msg.src_uid+'" src_id="'+feed_msg.src_feed.src_id+'" main_id="'+feed_msg.main_id+'" type="'+feed_msg.type+'">');    
            }else{
                returnStr.push('<div class="dy_main" content_str="'+feed_msg.content_str+'" src_uid="'+feed_msg.src_uid+'" src_id="0" main_id="'+feed_msg.main_id+'" type="'+feed_msg.type+'">');
            }
			
			returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.src_uid+'" target="_blank">'+feed_msg.src_nickname+'</a><em>|</em><span>'+feed_msg.create_time+'</span></p>');
			returnStr.push('<p class="dy_content">'+feed_msg.content+'</p>');
            returnStr.push('<div class="dy_habox">');
			returnStr.push('<div class="dy_handle">');
			returnStr.push('<ul>');
			returnStr.push('<li class="dy_delete" aboutme="is"><a href="javascript:void(0);">删除</a></li>');
			returnStr.push('<li class="dy_forwarding"><a href="javascript:void(0);">转发(<span>'+feed_msg.turn_num+'</span>)</a></li>');
			returnStr.push('<li class="dy_comments"><a href="javascript:void(0);">评论(<span>'+feed_msg.reply_num+'</span>)</a></li>');
			returnStr.push('<li class="dy_praise"><a href="javascript:void(0);"><em></em><b>'+up_str(feed_msg.up_att)+'</b>(<span>'+feed_msg.up_num+'</span>)</a></li>');
			returnStr.push('</ul>');
			returnStr.push('</div>');
            returnStr.push('<div class="dy_insert"></div>');
			returnStr.push('</div>');
			returnStr.push('</div>');
			returnStr.push('</div>');
            returnStr.push('</div>');
		break;
		//回复我的评论
		case '4':
            returnStr.push('<div>');
			returnStr.push('<div class="dy_list">');
			returnStr.push('<a class="dy_userimg" href="/feed/other?uid='+feed_msg.from_uid+'" target="_blank"><img onerror="this.src=\'/uploads/avatar/default.png\'" alt="" src="'+feed_msg.from_img+'"></a>');
			if(feed_msg.src_feed.src_id){
                returnStr.push('<div class="dy_main" content_str="'+feed_msg.content_str+'" src_uid="'+feed_msg.src_uid+'" src_id="'+feed_msg.src_feed.src_id+'" main_id="'+feed_msg.main_id+'" type="'+feed_msg.type+'">');    
            }else{
                returnStr.push('<div class="dy_main" content_str="'+feed_msg.content_str+'" src_uid="'+feed_msg.src_uid+'" src_id="0" main_id="'+feed_msg.main_id+'" type="'+feed_msg.type+'">');
            }
			returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.from_uid+'" target="_blank">'+feed_msg.from_nickname+'</a><em>|</em><span>'+feed_msg.create_time+'</span></p>');
			returnStr.push('<p class="dy_content">'+feed_msg.content+'</p>');
			returnStr.push('<div class="dy_atbox qt-pr">');
			returnStr.push('<span class="qt-pa dy_atj">&nbsp;</span>');
			returnStr.push('<p class="dy_at"><a href="/feed/other?uid='+feed_msg.src_feed.src_uid+'">@'+feed_msg.src_feed.src_nickname+'</a></p>');
			returnStr.push('<p class="dy_content">'+feed_msg.src_feed.content+'</p>');
			returnStr.push('</div>');
			returnStr.push('<div class="dy_handle">');
			returnStr.push('<ul>');
			returnStr.push('<li class="dy_delete" aboutme="is"><a href="javascript:void(0);">删除</a></li>');
			returnStr.push('<li class="dy_forwarding"><a href="javascript:void(0);">转发(<span>'+feed_msg.src_feed.turn_num+'</span>)</a></li>');
			returnStr.push('<li class="dy_comments"><a href="javascript:void(0);">评论(<span>'+feed_msg.src_feed.reply_num+'</span>)</a></li>');
			returnStr.push('<li class="dy_praise"><a href="javascript:void(0);"><em></em><b>'+up_str(feed_msg.src_feed.up_att)+'</b>(<span>'+feed_msg.src_feed.up_num+'</span>)</a></li>');
			returnStr.push('</ul>');
			returnStr.push('</div>');
			returnStr.push('<div class="dy_insert"></div>');
			returnStr.push('</div>');
			returnStr.push('</div>');
			returnStr.push('</div>');
            returnStr.push('</div>');
		break;
		//话题
		case '5':
			
		break;
		//小纸条
		case '6':
			
		break;
		//关注我
		case '7':
            returnStr.push('<div>');
			returnStr.push("<div class=\"dy_list\">");
			returnStr.push('<a class="dy_userimg" href="/feed/other?uid='+feed_msg.src_uid+'" target="_blank"><img onerror="this.src=\'/uploads/avatar/default.png\'" alt="" src="'+src_img+'"></a>');
			returnStr.push('<div class="dy_main" src_uid="'+feed_msg.src_uid+'" main_id="'+feed_msg.main_id+'" type="'+feed_msg.type+'" >');
			returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.src_uid+'" target="_blank">'+feed_msg.src_nickname+'</a><em>|</em><span>'+feed_msg.create_time+'</span></p>');
			returnStr.push('<p class="dy_content">'+feed_msg.content+'</p>');
            returnStr.push('<div class="dy_handle">');
			returnStr.push('<ul>');
			returnStr.push('<li class="dy_delete" aboutme="is"><a href="javascript:void(0);">删除</a></li>');
			returnStr.push('</ul>');
			returnStr.push('</div>');
			returnStr.push('</div>');
			returnStr.push('</div>');
            returnStr.push('</div>');

		break;
		//
		default:

	}
	return returnStr.join('');
};

exports.getAboutMeData = function(offset,callback){ //请求@我的数据
	var timenow = (new Date()).valueOf();
	var obj = new Object();
	obj.localCount = offset;
	var result = null;
    var b=true;
    if(offset==0){
        b=false;
    }

	$.ajax({
        url:'/feedajax/getrelates?v='+timenow,
        type:'post',
        dataType:'json',
        data:obj,
        async:b,
        success:function(msg){
        	if(msg.code==200){
        		callback(msg.data);
        	}
        }
     });
};

exports.buildGetLetters = function(feed_msg){  //请求小纸条数据 dom
    var returnStr = [];
    var src_img = feed_msg.src_img == ''? '/uploads/avatar/default.png':feed_msg.src_img;
	if (feed_msg==null || feed_msg=='') {
        return '';
	}else{
	    returnStr.push('<div>');
        returnStr.push("<div class=\"dy_list\">");
		returnStr.push('<a class="dy_userimg" href="/feed/other?uid='+feed_msg.src_uid+'" target="_blank"><img onerror="this.src=\'/uploads/avatar/default.png\'" alt="" src="'+src_img+'"></a>');
		returnStr.push('<div class="dy_main" src_uid="'+feed_msg.src_uid+'" main_id="'+feed_msg.main_id+'" type="'+feed_msg.type+'" >');
		returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.src_uid+'" target="_blank">'+feed_msg.src_nickname+'</a><em>|</em><span>'+feed_msg.create_time+'</span></p>');
		returnStr.push('<p class="dy_content">'+feed_msg.content+'</p>');
        returnStr.push('<div class="dy_handle">');
		returnStr.push('<ul>');
        returnStr.push('<li class="dy_rletter"><a href="javascript:void(0);">小纸条</a></li>');
		returnStr.push('<li class="dy_delete" aboutme="is"><a href="javascript:void(0);">删除</a></li>');
		returnStr.push('</ul>');
		returnStr.push('</div>');
		returnStr.push('</div>');
		returnStr.push('</div>');
        returnStr.push('</div>');
	}
	return returnStr.join('');
};

exports.getGetLettersData = function(offset,callback){ //请求小纸条数据
    
    var timenow = (new Date()).valueOf();
	var obj = new Object();
	obj.localCount = offset;
	var result = null;
    
	$.ajax({
        url:'/feedajax/getletters?t=' + new Date().getTime(),
        type:'post',
        dataType:'json',
        data:obj,
        success:function(msg){
        	if(msg.code==200){
                
        		callback(msg.data);
        	}
        }
     });
};

//exports.buildInvestment = function(feed_msg){  //投资动态 dom
//    var returnStr = [];
//    var src_img = feed_msg.src_img == ''? '/uploads/avatar/default.png':feed_msg.src_img;
//	if (feed_msg==null || feed_msg=='') {
//        return '';
//	}else{
//        returnStr.push('<div>');
//        returnStr.push('<div class="dy_list">');
//        returnStr.push('<a href="/feed/other?uid='+feed_msg.uid+'" class="dy_userimg" target="_blank" title="'+feed_msg.nickname+'"><img src="'+feed_msg.user_img+'" alt="'+feed_msg.nickname+'" onerror="this.src=\'/uploads/avatar/default.png\'" /></a>');
//        returnStr.push('<div class="dy_main">');
//        returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.uid+'" target="_blank" title="'+feed_msg.nickname+'">'+feed_msg.nickname+'</a><em>|</em><span>'+feed_msg.addtime+'</span></p>');
//        returnStr.push('<p class="dy_content">'+'投资  '+feed_msg.company_name+'  '+feed_msg.amount+'</p>');
//        returnStr.push('<div class="dy_habox">');
//        returnStr.push('<div class="dy_handle">');
//        returnStr.push('<ul><li><a href="/feed/other?uid='+feed_msg.uid+'" title="查看详情" target="_blank">查看详情</a></li></ul>');
//        returnStr.push('</div>');
//        returnStr.push('</div>');
//        returnStr.push('</div>');
//        returnStr.push('</div>');
//        returnStr.push('</div>');
//	}
//	return returnStr.join('');
//};

exports.buildInvestment = function(feed_msg){  //投资动态 dom
    var returnStr = [];
    var src_img = feed_msg.src_img == ''? '/uploads/avatar/default.png':feed_msg.src_img;
    if (feed_msg==null || feed_msg=='') {
        return '';
    }else{
        returnStr.push('<div>');
        returnStr.push('<div class="dy_list">');
        returnStr.push('<a href="/feed/other?uid='+feed_msg.uid+'" class="dy_userimg" target="_blank" title="'+feed_msg.nickname+'"><img src="'+feed_msg.user_img+'" alt="'+feed_msg.nickname+'" onerror="this.src=\'/uploads/avatar/default.png\'" /></a>');
        returnStr.push('<div class="dy_main">');
        returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.uid+'" target="_blank" title="'+feed_msg.nickname+'">'+feed_msg.nickname+'</a><em>|</em><span>'+feed_msg.addtime+'</span></p>');
        returnStr.push('<p class="dy_content">'+'投资  '+feed_msg.company_name+'  '+feed_msg.amount+'</p>');
        returnStr.push('<div class="dy_habox">');
        returnStr.push('<div class="dy_handle">');
        returnStr.push('<ul><li><a href="/feed/other?uid='+feed_msg.uid+'" title="查看详情" target="_blank">查看详情</a></li></ul>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
    }
    return returnStr.join('');
};

exports.getInvestmentData = function(offset,callback){ //请求投资动态
	var timenow = (new Date()).valueOf();
	var obj = new Object();
	obj.localCount = offset;
	var result = null;

	$.ajax({
        url:'/feedajax/getinvests?v='+timenow,
        type:'post',
        dataType:'json',
        data:obj,
        success:function(msg){
        	if(msg.code==200){
        		callback(msg.data);
        	}
        }
     });
};

//获得当前选中的标签索引
exports.getTabIndex = function(){
	var index = $('.tab_hd').children('.current').index();    
	return index;
}
// 加载更多动态
exports.getMoreFeedData = function(paramArr,callback){ //请求最新动态 加载更多
    //type 1:最新动态（index） 2：个人动态（other）
    var param = new Object();
    param.localCount = paramArr.feedsOffset ;
    param.type = paramArr.type ;
    if(paramArr.type==2)
    {
        param.userid = paramArr.userid ;
    }
    if(paramArr.feedsOffset<0 || paramArr.type>2 || paramArr.type<1)
    {
        alert('参数错误！');
        return;
    }
    $.ajax({
        url:'/feedajax/loadfeeds',
        type:'post',
        dataType:'json',
        data:param,
        success:function(msg){
            if(msg.code==200){
                callback(msg.data);
            }
        }
    });
}


// 加载更多圈子动态
exports.getCircleFeedData = function(paramArr,callback){

    var param = new Object();
    param.localCount = paramArr.feedsOffset ;
    param.type = 1 ;

    $.ajax({
        url:'/feedajax/loadCircle',
        type:'post',
        dataType:'json',
        data:param,
        success:function(msg){
            if(msg.code==200){
                callback(msg.data);
            }
        }
    });
}


//动态DOM
exports.feed_dom_str = function(data,userid){ // 加载更多  DOM
    var dom_str = new String() ;
    if(data==null || data=='' || userid <= 0)
    {
        dom_str = '' ;
    }else{
        dom_str = '';
        dom_str += '<div>';
        dom_str += '<div class="dy_list">';
        dom_str += '<a href="/feed/other?uid='+data.src_uid+'" target="_blank" class="dy_userimg"><img src="'+data.src_img+'" alt="'+data.src_nickname+'" onerror="this.src=\'/uploads/avatar/default.png\'" /></a>';
        dom_str += '<div class="dy_main" main_id="'+data.main_id+'" src_id="'+data.src_id+'" content_str="'+data.content_str+'">';
        dom_str += '<p class="dy_info"><a href="/feed/other?uid='+data.src_uid+'" target="_blank">'+data.src_nickname+'</a><em>|</em><span>'+data.create_time+'</span></p>';
        dom_str += '<p class="dy_content">'+data.content+'</p>';
        if(data.src_info != null && data.src_info != '')
        {
            dom_str += '<div class="dy_atbox qt-pr">';
            dom_str += '<span class="qt-pa dy_atj">&nbsp;</span>';
            dom_str += '<p class="dy_content"><a href="/feed/other?uid='+data.src_info.src_uid+'" target="_blank">@'+data.src_info.src_nickname+'</a><br />'+data.src_info.content+'</p>';
            dom_str += '</div>';
        }
        dom_str += '<div class="dy_habox">';
        dom_str += '<div class="dy_handle">';
        dom_str += '<ul>';
        if(data.src_uid==userid)
        {
            dom_str += '<li class="dy_delete" title="删除"><a href="javascript:void(0);" >删除</a></li>';
        }
        dom_str += '<li class="dy_forwarding" title="转发"><a href="javascript:void(0);" >转发(<span>'+turn_num(data)+'</span>)</a></li>';
        dom_str += '<li class="dy_comments" title="评论"><a href="javascript:void(0);" >评论(<span>'+data.reply_num+'</span>)</a></li>';
        dom_str += '<li class="dy_praise" title="'+up_str(data.up_att)+'"><a href="javascript:void(0);" ><em></em><b>'+up_str(data.up_att)+'</b>(<span>'+data.up_num+'</span>)</a></li>';
        dom_str += '</ul></div>';
        dom_str += '<div class="dy_insert">';
        dom_str += '</div>';
        dom_str += '</div>';
        dom_str += '</div>';
        dom_str += '</div>';
        dom_str += '</div>';
    }
    return dom_str ;
}

function up_str(type){
    var str = new String() ;
    if(type)
    {
        str = '取消赞' ;
    }else
    {
        str = '赞' ;
    }
    return str ;
}

function turn_num(data)
{
    src = data.src_info ;
    if(src != null && src != '')
    {
        var turn_num = parseInt(src.turn_num);
        if(!isNaN(turn_num))
        {
            return turn_num ;
        }else
        {
            return 0 ;
        }
    }else
    {
        var num = parseInt(data.turn_num);
        if(!isNaN(num))
        {
            return num ;
        }else
        {
            return 0 ;
        }
    }
}

exports.buildInvest_feed = function(feed_msg){  //投资动态 dom
    var returnStr = [];
    var src_img = feed_msg.src_img == ''? '/uploads/avatar/default.png':feed_msg.src_img;
    if (feed_msg==null || feed_msg=='') {
        return '';
    }else{
        returnStr.push('<div>');
        returnStr.push('<div class="dy_list">');
        returnStr.push('<a href="/feed/other?uid='+feed_msg.src_uid+'" class="dy_userimg" target="_blank" title="'+feed_msg.src_nickname+'"><img src="'+feed_msg.src_img+'" alt="'+feed_msg.src_nickname+'" onerror="this.src=\'/uploads/avatar/default.png\'" /></a>');
        returnStr.push('<div class="dy_main">');
        returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.src_uid+'" target="_blank" title="'+feed_msg.src_nickname+'">'+feed_msg.src_nickname+'</a><em>|</em><span>'+feed_msg.create_time+'</span></p>');
        returnStr.push('<p class="dy_content">'+feed_msg.content+'</p>');
        returnStr.push('<div class="dy_habox">');
        returnStr.push('<div class="dy_handle">');
        returnStr.push('<ul><li><a href="/feed/other?uid='+feed_msg.src_uid+'" title="查看详情" target="_blank">查看详情</a></li></ul>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
    }
    return returnStr.join('');
};

exports.buildTopic_feed = function(feed_msg){ // 话题DOM
    var returnStr = [];
    var src_img = feed_msg.src_img == ''? '/uploads/avatar/default.png':feed_msg.src_img;
    if (feed_msg==null || feed_msg=='') {
        return '';
    }else{
        returnStr.push('<div>');
        returnStr.push('<div class="dy_list">');
        returnStr.push('<a href="/topic/new?id='+feed_msg.src_id+'" class="dy_userimg" target="_blank" title="投友圈"><img src="/styles/images/tyq_default.png" alt="投友圈" onerror="this.src=\'/uploads/avatar/default.png\'" /></a>');
        returnStr.push('<div class="dy_main">');
        returnStr.push('<p class="dy_info"><a href="/feed/other?uid='+feed_msg.src_id+'" target="_blank" title="touyouquan">touyouquan</a><em>|</em><span>'+feed_msg.create_time+'</span></p>');
        returnStr.push('<p class="dy_content">'+feed_msg.content+'</p>');
        returnStr.push('<div class="dy_habox">');
        returnStr.push('<div class="dy_handle">');
        returnStr.push('<ul><li><a href="/feed/other?uid='+feed_msg.src_id+'" title="查看详情" target="_blank">查看详情</a></li></ul>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
        returnStr.push('</div>');
    }
    return returnStr.join('');
};