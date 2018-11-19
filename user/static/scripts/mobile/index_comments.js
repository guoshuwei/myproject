$(window).ready(function(){
    var navDropDown = require('../modules/mobileIndexNav'),//nav下拉框
        template = require('../modules/template'),
        ie678_pollyfill = require('../modules/ie678_pollyfill'),
        lidernav=require("../modules/index_slidenav"),
        app=require('./app');
    var dataParent=$('[role-main="parents"]'),
        ajaxoff = false,
        morebtn = $('a[role-touch="more"]'),
        dataJson={type:'comment',pid:Number($('#platid').val()),page:2,level:Number(morebtn.data("level")),tagid:0};
    navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);

    $('body')
    .on('tap','a[role-touch="more"]',function(){
        if(ajaxoff) return false;
            ajaxoff = true;
            morebtn.html('加载中....')
            $.ajax({
                url:'/index/getSubpageList',
                type:'post',
                dataType:'json',
                data:dataJson,
                success:function(res){
                    if(res.code == 200){
                        ajaxoff=false;
                        dataJson.page++;
                        creatData(res.data,dataJson.page);
                        morebtn.html('加载更多评价');
                        return false;
                    }else if(res.code == 4550){//数据请求结束
                        ajaxoff=false;
                        morebtn.html('没有更多内容啦~');
                        morebtn.addClass("more-disable");
                        return false;
                    }else{
                        ajaxoff=false;
                        _Fn.alert(res.message);
                        morebtn.html('加载更多评价');
                        return false;
                    }
                },
                error:function(res){
                    ajaxoff=false;
                    _Fn.alert(res.message);
                    morebtn.html('加载更多评价');
                    return false;
                }
            })
        return false;
    })
    .on('click',"[role-touch='member']",function(){
        window.location.href=$(this).data('url');
        return false;
    })
    //点赞
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
        var url = that.data('url');
        $.ajax({
            url : url?url:'/User/setPraise',
            type : 'post',
            dataType : 'json',
            data : data,
            success : function(res){
                /*res = {
                    code: 200,
                    data: {
                        total:10
                    }
                };*/
                /*res = {
                    code: 201,
                    message: '你已经点赞过了'
                };*/
                if(res.code == 200){//点赞
                    var numi = that.find('.praise-txt');
                    if(numi.text() != '999+'){
                        if(res.data.total>0){
                            numi.html(res.data.total);
                        }else{
                            var total = numi.html() == '点赞' ? 0 : parseInt(numi.html());
                            numi.html(total+1);
                        }
                    }

                    numi.addClass('praise-txt-hov').prev().addClass('praise-icon-hov');
                    var $animateNum = $('<div class="praise-animate-num">+1</div>');
                    that.append($animateNum);
                    setTimeout(function(){
                        $animateNum.addClass('praise-animate-num-uping');
                    },10);
                }else if(res.code == 4527){//取消点赞
                    /*var numi = that.find('.praise-txt');
                    var total = parseInt(numi.html());
                    numi.html(total-1);*/
                }else{//已经点赞过了或者点赞失败等其他原因,弹层提示
                    _Fn.alert(res.message);
                }
            },
            error:function(){
                _Fn.alert('服务器繁忙，请稍后再试！');
            }
        })
        return false;
    })
    //点评按钮
        .on('click','[role=go2comment]',function(){
            if(!_Fn.isLogin()) return false;
    })
    //数据模板
    function creatData(data,num){
        var content = [];
        for(var i in  data){
            content.push(template.render('contentTpl',data[i]));
        }
        var numstartbtn=num*10;
        var numendbtn=(num-1)*data.length;
        var urlbtn = $("[role-touch='member']");
        dataParent.append(content.join(''));
        for(var i=numstartbtn;i<numendbtn;i++){
            touchmember(urlbtn.eq(i));
        }
    }
    function touchmember(obj){
        obj.touchend(function(){
            window.location.href=$(this).data('url');
            return false;
        })
    }

    /*var ua = window.navigator.userAgent.toLowerCase();
    if((ua.indexOf("iosapp")>0 || ua.indexOf("androidapp")>0)&&ua.indexOf("licaiApp")){
        $('.section-commentBtn').children().eq(0).addClass('commentBtn-wrap-fixed');
    }else{
        //底部评论按钮悬浮逻辑
        function fixedCommentBtn(isDown, eT){
            var footer = $('.footer');
            var hasfooter = footer.length;
            var footerHeight=hasfooter ? $('.footer').outerHeight():0;
            var footerTop=hasfooter?footer.offset().top : 0;
            var bodyScrollTop=$(document).scrollTop();
            var bodyheight=$(document).outerHeight();
            var btn = $(".commentBtn-wrap");
            var btnHeight = btn.parent().outerHeight();
            if(document.compatMode=="CSS1Compat"){
                var winHeight=document.documentElement.clientHeight;
            }else{
                var winHeight=document.body.clientHeight;
            }
            if(isDown){//down
                if(bodyScrollTop+winHeight+(eT == 'scroll' ? btnHeight : 0)>=footerTop){
                    btn.removeClass('commentBtn-wrap-fixed');
                }else{
                    btn.addClass('commentBtn-wrap-fixed');
                }
            }else{//up
                if(bodyScrollTop+winHeight>=footerTop){
                    btn.removeClass('commentBtn-wrap-fixed');
                }else{
                    btn.addClass('commentBtn-wrap-fixed');
                }
            }
        }
        var afterScrollH_=0,beginScrollH_=$(window).scrollTop();
        fixedCommentBtn(beginScrollH_<=afterScrollH_);

        $(window).scroll(function(e){
            afterScrollH_ = $(this).scrollTop();
            fixedCommentBtn(beginScrollH_<=afterScrollH_, 'scroll');
            setTimeout(function(){beginScrollH_ = afterScrollH_;},0);
        });
        $('body').on('touchmove',function(){//点评按钮
            afterScrollH_ = $(this).scrollTop();
            fixedCommentBtn(beginScrollH_<=afterScrollH_, 'move');
            setTimeout(function(){beginScrollH_ = afterScrollH_;},0);
        });
    }*/

})