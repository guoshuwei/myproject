var 
    app = require('./app'),
	dialogUi = require('../modules/dialogUi'),
	bxSlider = require('../plugins/jquery.bxslider.min'),
    formMod = require('../modules/form'),
    template = require('../modules/template'),
    wxReady = require('../modules/jssdk'),
    proportion = 0,
    window_width = $(window).width(),
    window_height = $(window).height(),
    windowStyle = null,
    dataidStr = '',
	proportion = window_width/window_height;
    
if(proportion > 1){
    windowStyle = 1;
}else{
    windowStyle = 2;
}
function hengshuping(event){
    if(window.orientation == 0 || window.orientation == 180 || windowStyle == 2){
        //竖屏 return false;
        window.location.href = window.location.href;
    }else if(window.orientation == -90 || window.orientation == 90 || windowStyle == 1){
        //横屏return false;
        window.location.href = window.location.href;
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

$('.slider').bxSlider({
    pager: false,
    controls: true,
    auto: false,
    infiniteLoop: true,
    autoHover: false,
    pause : 5000,
    prevSelector : '.prve',
    nextSelector : '.next',
    prevText : '',
    nextText : '',
    mode: 'fade',
    touchEnabled:true,
    adaptiveHeight:true,
    onSlideAfter : function(ele){
        var parent=$(ele).parents('.mod-manypic');
        //联动文字
        parent.find(".p").removeClass('active');
        parent.find(".p").eq(ele.attr('data')).addClass('active');
    },
    onSliderLoad:function(){
        $('.slider-parent .prve,.slider-parent .next').css('height',$('.slider-parent .bx-viewport').height());
    }

});

var page = 1,
    zId = $('.mod-talk:eq(0)').attr('data-zid');
var clock = false;
$('.pulllable').click(function(){
    if(clock) return;
    clock = true;
    page++;
    $.ajax({
        url: "/Eyespecial/commentAjax",
        type: "get",
        dataType: 'json',
        data:"zid="+zId+"&page="+page,
        async:false,
        success: function(msg){ 
            clock = false;
            if(msg.code==200){
                $("#thelist").append(msg.data.str);
            }else if(msg.code==4530){
                $('#pullup .pulllable').html('已经没有更多啦！');
            }
        },
        error: function(err){
            // console.log(err)
        }
    })
})


function createPraise(data,ele){

    var url = ele.data('url');
    $.ajax({
        url : url?url:'/User/seteyespecialpraise',
        type : 'post',
        dataType : 'json',
        data : data,
        success : function(res){
            if(res.code == 200){
                var numi = ele.find('span');
                if(res.data.total>0){
                    numi.html(res.data.total);
                }else{
                    var total = parseInt(numi.html());
                    numi.html(total+1);
                }
            }else{
                alertMessage(res.message)
            }
        },
        error:function(){
            console.log("返回信息错误");
        }
    })
}
function alertMessage(msg){
    var alert = $('.alert'),
        timer=null;
    clearTimeout(timer);
    alert.find('span').html(msg);
    alert.stop().fadeIn();
    timer = setTimeout(function(){
        alert.stop().fadeOut();
    },2000)
}
function formModErrorHandler(validResutl){
    var item  = validResutl.element,
        parent = item.parent();
    if(item.attr('name')=='content'){
        alertMessage('请输入10-500个字符的回复内容');
    }
}

function formModAjaxBefore(form){
    var submit = form.find('input[type=submit]');
}
function createComment(data,ele,limit){
    var 
    html = data.str,
    parent = $(ele).parents('.mod-comment .mc-bd');
    item = $(ele).parents('.feed-detail');
    var add = item.attr('replayadd');
    if(!limit){
        var _parent = parent.find('.comment-inner');
        if(_parent.length == 0){
            $('.comment-inner').prepend(html);
        }else{
            parent.find('.comment-inner').prepend(html);        
        }
        
    }else{
        parent.find('.comment-inner').append(html); 
    }
    $(ele).find('textarea').val('');
    
    
}

formMod.listen('/User/seteyespecialcomment',{
    //验证错误
    validError:formModErrorHandler,
    ajaxBefore : formModAjaxBefore,
    success:function(res){
        var res = res.data ? res.data : null;
        var that = this;
        if(!res) return;
        if(res.code == 200){
            that.find('textarea').text('');
            createComment(res.data,that);
            alertMessage('评论成功');
        }else{
           alertMessage(res.message);
        }
    }
});
$("body")
.on('click','[role=praise]',function(){
    if(!_Fn.isLogin())return;
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
//点击跳转到评论区
.on("touchend",".talk-btn",function(){
    $("document").scrollTop($('.mod-comment').offset().top);    
    $(window).scrollTop($('.mod-comment').offset().top);
})

// 315投票活动

$('.vote_list li').on('click','span',function(){
    $(this).hasClass('sure') ? $(this).removeClass("sure") : $(this).addClass('sure')
    
    var BlueArrLen = document.getElementsByClassName('sure').length
	if(BlueArrLen>15){
		_Fn.alert('亲~最多只能选择15个选项哦~')
		$(this).removeClass("sure")
	}else{
        dataidStr += ','+$(this).attr('dataid')
    }
    
})

var modid = $('#modid').val()
$('#vote_btn').on('click',function(){
    var len = document.getElementsByClassName('sure').length
	if(len>0){
        dataidStr = dataidStr.slice(1)
        window._Fn.loading().show($('.vote_add'))
		$.ajax({
            url:'//licai.p2peye.com/Eyespecial/voteAjax?voteid='+dataidStr,
            type:"get",
			dataType:"json",
			success: function(json){
				if( json.code == 201 ){
                    _Fn.alert(json.message)
                    sortFn()
				} else {
                    _Fn.alert('投票成功！')
                    sortFn()
                }
				window._Fn.loading().hide()
			}
		})
		
		
	}else{
		_Fn.alert('请选择您要支持的平台~')
	}
})

function sortFn(){
    $.ajax({
        url:"//licai.p2peye.com/Eyespecial/getVoteList",
        type:"get",
        dataType:"json",
        data:"modid="+modid,
        success: function(json){
            if( json.code == 200 ){
                var content=template.render("dataTpl",{json:json.data});
                $(".mod-vote .inner").html(content);
            }
            window._Fn.loading().hide()
        },
        error:function(){
            _Fn.alert('排行榜找不到了咩~')
        }
    })
}
var getwxurl = $('.getimgurl').val();
if(getwxurl){
    getwxurl = getwxurl;
}else{
    getwxurl = ''
}
wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        imgUrl:getwxurl
    });
})