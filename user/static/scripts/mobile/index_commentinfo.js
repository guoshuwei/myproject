$(window).ready(function(){
    
    var app=require('./app'),
        lidernav=require("../modules/index_slidenav"),
        navDropDown = require('../modules/mobileIndexNav');//nav下拉框
    navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);
    $('body')
    .on('click',"[role-touch='member']",function(){
        window.location.href=$(this).data('url');
        return false;
    }).on('click','[role=praise]',function(){//点赞
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
            dataType : 'text',
            data : data,
            success : function(res){
                res = JSON.parse(res);
                /*document.write(res);
                return;*/
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
                    var numi = that.find('.txt');

                    if(numi.text() != '999+'){
                        if(res.data.total>0){
                            numi.html(res.data.total);
                        }else{
                            var total = numi.html() == '点赞' ? 0 : parseInt(numi.html());
                            numi.html(total+1);
                        }
                    }

                    numi.addClass('txt-hov').prev().addClass('hov');
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
    }).on('click','[role=addcomment]',function(){//点评按钮
        if(!_Fn.isLogin()) return false;
        if(!_Fn.certification()) return false;
        $('.popwin-wrap').show().find('.btn-sure').attr('role-data', this.getAttribute('role-data'));
        $('.popwin-wrap textarea').attr('placeholder', '对 '+this.getAttribute('role-uname')+' 说：');
    }).on('click','[role=replycomment]',function(){//回复评论按钮
        if(!_Fn.isLogin()) return false;
        if(!_Fn.certification()) return false;
        $('.popwin-wrap').show().find('.btn-sure').attr('role-data', this.getAttribute('role-data'));
        $('.popwin-wrap textarea').attr('placeholder', '对 '+this.getAttribute('role-uname')+' 说：');
    }).on('click','.btn-cancel',function(){//关闭评论弹层
        $('.popwin-wrap').hide();
    }).on('click','.btn-sure',function(){//提交评论
        $popwin.find('textarea').blur();
        if(!_Fn.isLogin()) return false;
        var that = $(this);
        if(that.data('requesting')) return false;
        /*$.ajax({
            type: "post",
            url: "//www.p2peye.com?ajax=1",
            data: {},
            dataType: "json",
            success: function(data){
                if(data.code == "200"){
                    searchbox_data = data.data;
                }else{
                    searchbox_data = [];
                }
            },
            error: function(){
                searchbox_data = [];
            }
        });*/
        var data = function(){
            var data = that.attr('role-data').split('|');
            var _data = {}
            for(var i = 0 ; i < data.length ; i++){
                var _temp = data[i].split(':');
                _data[_temp[0]] = _temp[1];
            }
            _data.content = $.trim($popwin.find('textarea').val());
            return _data;
        }();
        if(data.content.length < 10){
            _Fn.alert('请输入10-2000个字符的回复内容！');
            return false;
        }
        that.data('requesting', true).text('发送中...');

        $.ajax({
            url : '/User/commentcommit?t=reply',
            type : 'post',
            dataType : 'json',
            data : data,
            success : function(res){
                if(res.code == 200){
                    window.location.reload();
                }else{
                    $loading.hide();
                    _Fn.alert('服务器繁忙，请稍后再试！');
                    that.data('requesting', false).text('发送');
                }
            },
            error: function(){
                $loading.hide();
                _Fn.alert('服务器繁忙，请稍后再试！');
                that.data('requesting', false).text('发送');
            }
        });
        return false;
    })

    $popwin = $('.popwin-wrap');
    $loading = $popwin.find('.loading');
    $inputCount = $popwin.find('.txt');
    //输入框字数控制逻辑
    $textarea = $popwin.find('textarea')/*.keydown(function(e){
        if(e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 39 && $(this).val().length > 1999){
            return false;
        }
    })*/.keyup(function(e) {
        var currValue = $(this).val();
        if(currValue.length > 2000){
            $(this).val(currValue.substring(0, 2000));
        }
        $inputCount.html((currValue.length > 2000 ? 2000 : currValue.length) + '/2000个字');
    });



    /*var ua = window.navigator.userAgent.toLowerCase();
    if((ua.indexOf("iosapp")>0 || ua.indexOf("androidapp")>0)&&ua.indexOf("licaiApp")){
        $('.section-commentBtn').children().eq(0).addClass('commentBtn-fixed');
    }else{
        //底部评论按钮悬浮逻辑
        function fixedCommentBtn(isDown){
            var footer = $('.section-commentBtn');
            var hasfooter = footer.length;
            var footerHeight=hasfooter ? $('.footer').outerHeight():0;
            var footerTop=hasfooter?footer.offset().top : 0;
            var bodyScrollTop=$(document).scrollTop();
            var bodyheight=$(document).outerHeight();
            var btn = $(".commentBtn");
            var btnHeight = btn.parent().outerHeight();
            if(document.compatMode=="CSS1Compat"){
                var winHeight=document.documentElement.clientHeight;
            }else{
                var winHeight=document.body.clientHeight;
            }
            /!*var $test = $('#test');
             if($test.length == 0){
             $test = $('<div id="test" style="width: 80%;white-space: normal;word-break: break-all;z-index:100000;position:fixed;top:30%;left:10%;background-color:red;color:#fff;"></div>');
             $('body').append($test);
             }
             $test.html('clientHeight:'+document.body.clientHeight+',offsetHeight:'+document.body.offsetHeight+',scrollHeight:'+document.body.scrollHeight+',scrollTop:'+document.body.scrollTop+',availHeight:'+window.screen.availHeight+',isDown:'+isDown);*!/
            if(isDown){//down
                if(bodyScrollTop+winHeight+btnHeight>=footerTop){
                    btn.removeClass('commentBtn-fixed');
                }else{
                    btn.addClass('commentBtn-fixed');
                }
            }else{//up
                if(bodyScrollTop+winHeight>=footerTop){
                    btn.removeClass('commentBtn-fixed');
                }else{
                    btn.addClass('commentBtn-fixed');
                }
            }
        }
        var afterScrollH_=0,beginScrollH_=$(window).scrollTop();
        fixedCommentBtn(beginScrollH_<=afterScrollH_);

        $(window).scroll(function(e){
            afterScrollH_ = $(this).scrollTop();
            fixedCommentBtn(beginScrollH_<=afterScrollH_);
            setTimeout(function(){beginScrollH_ = afterScrollH_;},0);
        });
        $('body').on('touchmove',function(){//点评按钮
            afterScrollH_ = $(this).scrollTop();
            fixedCommentBtn(beginScrollH_<=afterScrollH_);
            setTimeout(function(){beginScrollH_ = afterScrollH_;},0);
        });
    }*/

})
