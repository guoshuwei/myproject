$(window).ready(function(){
    var navDropDown = require('../modules/mobileIndexNav');//nav下拉框
    navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);
    var
        template = require('../modules/template'),
        formMod = require('../modules/form'),
        mobilePopup = require('../modules/mobile_popup'), //手机版弹出层
        rightSideBox = $('.right-sliding'), //右侧滑动
        trueTextBox = $('.popup-wholepage'), //真的评论框
        lidernav=require("../modules/index_slidenav"),
        loadmoreEle = $('.mod-page'), //加载更多
        loadmorebox = loadmoreEle.find('.mod-page-inner'),
        loadingbox = loadmoreEle.find('.mod-page-loading'),
        qid = $('#qid').val(),//问题id
        lock = false,
        parent = $('.mod-ulist'); 	//加载列表父级
    swiper = new Swiper('.swiper-container', { //滑动选项卡
        pagination: '.swiper-pagination'
    });
    $('body')
        .on('touchstart','a',function(){
            var that = $(this);
            if(that.hasClass('hover')){
                that.addClass('active');
            }
        })
        .on('touchend','a',function(){
            var that = $(this);
            if(that.hasClass('hover')){
                that.removeClass('active');
            }
        });
    $('body')
        .on('click','#myinquires',function(event){  //我要提问
            event.stopPropagation();
            setrightSideBg();
            mobilePopup.showMaskLayer();
            rightSideSlidingIn();
            return false;
        })
        .on('click','.right-sliding .title-bluebg-close',function(){ //取消我要提问
            rightSideSlidingOut();
            mobilePopup.hideMaskLayer();
            return false;
        })
        .on('click','.mask-layer',function(event){ //点击遮罩层
            event.stopPropagation();
            rightSideSlidingOut();
            mobilePopup.hideMaskLayer();
            return false;
        })
        .on('click','.falsetext',function(){ //底部假的评论框
            var h = mobilePopup.maxBodyHeight();
            trueTextBox.css({'height' : h});
            trueTextBox.show();
        })
        .on('click','#title-bluebg-back',function(event){ //返回底部假的评论框
            event.stopPropagation();
            trueTextBox.hide();
            return false;
        })
        .on('click','.click-praise',function(event){ //点赞
            event.stopPropagation();
            var aid = $(this).attr('data-for');
            var that = this;
            $.ajax({
                url:'/askajax/',
                type:'post',
                data:{
                    action:'praise',
                    aid:aid,
                    qid:qid
                },
                dataType:'json',
                success:function(msg){
                    if(msg.code == 200){
                        $(that).addClass('clicked');
                        $(that).find('.mod-ulist-box-praise-num').html(Number($(that).find('.mod-ulist-box-praise-num').text())+1);
                    }else{
                        mobilePopup.showPromptMessage(msg.message);
                    }
                }
            });
            return false;
        })
        .on('click','.ask-detail-imgbox-inner img',function(event){ //点击看大图
            event.stopPropagation();
            var imgBox = $('.mod-create-imgbox');
            var bigImg = $('<img>');
            var srcStr = $(this).attr('src');
            var width = $(window).width();
            var height =$(window).height();
            imgBox.css({'height':height,'width':width});
            bigImg.attr({'src' : srcStr});
            imgBox.find('.mod-create-imgbox-wrap').append(bigImg);
            bigImg.on('load',function(){
                imgBox.show();
            });
            return false;
        })
        .on('click','.mod-create-imgbox',function(event){ //点击大图
            event.stopPropagation();
            $(this).hide();
            $(this).children().empty();
            return false;
        })
        .on('input','.mod-form-textbox-text',function(){  //字数统计
            var itself=$(this);
            remainingNum(itself);
        })
        .on('click','.mod-form-submitbox-submit',function(event){
            event.stopPropagation();
            lock = true;
            var content = $('.mod-form-textbox-text').val(),
                that = this;
            content = $.trim(content);
            $.ajax({
                url:'/askajax/',
                type:'post',
                dataType:'json',
                data:{
                    action:'answer',
                    qid:qid,
                    content:content,
                    rootid:0   //回答问题是0 ，回复回答是回答id
                },
                success:function(msg){
                    if(msg.code == 200){
                        $('.mod-form-textbox-text').val('');
                        $('.surplus_num span').html('2000');
                        var el = $('#listMod').clone();
                        el.removeAttr('id').removeAttr('style');

                        el.find('.mod-ulist-blocka').attr('href','/ask/detaila/' + msg.data.id + '.html');
                        el.find('.mod-ulist-box-praise').attr('data-for',msg.data.id);
                        el.find('.mod-ulist-box-inner').html( msg.data.content );
                        el.find('.mod-ulist-box-info-text-time').html( '0秒前' );
                        el.find('.mod-ulist-box-info-userimg').attr( 'href','/ask/u' + msg.data.authorid +'/');
                        el.find('.mod-ulist-box-info-avatar').attr('src','//m.p2peye.com/uc_server/avatar.php?uid=' + msg.data.authorid +'&size=small');
                        el.find('.mod-ulist-box-info-user').attr( 'href','/ask/u' + msg.data.authorid +'/').html(msg.data.author);

                        if($('.mod-ulist>li').length){
                            el.insertBefore(".mod-ulist>li:first-child");
                            $('.title-bluebar-num').html(Number($('.title-bluebar-num').html())+1);
                        }else{
                            var box = $(
                                '<div class="qt-paddingt-16">' +
                                '<div class="qt-bg-fff">' +
                                '<div class="qt-paddinglr-25">' +
                                '<div class="title-bluebar clearfix">' +
                                '<em class="title-bluebar-bar">&nbsp;</em>' +
                                '<h3 class="title-bluebar-inner">参与回答</h3>' +
                                '<span class="title-bluebar-num">1</span>' +
                                '</div>' +
                                '</div>' +
                                '<ul class="mod-ulist"></ul>' +
                                '</div>' +
                                '</div>'
                            );
                            box.insertAfter('#questionBox');
                            el.appendTo('.mod-ulist');
                            $('.popup-wholepage').hide();
                            $('.mod-form-textbox-text').val('');
                        }
                        trueTextBox.hide();
                    }else{
                        alert(msg.message);
                    }
                }
            });
            return false;
        })
        .on('click','.mod-page-inner',function(event){ //加载更多
            event.stopPropagation();
            var action = $(this).attr('action');
            var qid = $(this).attr('qid');
            var content = $(this).attr('content');
            var page = $(this).attr('page');
            loadingFn();
            getdata(action,qid,content,page);
        });
    function setrightSideBg(){ //设置右侧滑出的背景
        var bgEle = rightSideBox.find('.qt-bg-fff');
        var h = mobilePopup.maxBodyHeight();
        rightSideBox.css({'height': h});
        bgEle.css({'height': h});
    }
    function rightSideSlidingIn(){ //右侧滑入
        rightSideBox.removeClass('right-sliding-out');
        rightSideBox.addClass('right-sliding-in');
    }
    function rightSideSlidingOut(){ //右侧滑出
        rightSideBox.removeClass('right-sliding-in');
        rightSideBox.addClass('right-sliding-out');
    }
    function remainingNum(obj){ //还可以输入多少字
        var parent = obj.parents('.mod-form');
        var textSpan = parent.find('.mod-form-surplusnum em');
        var numSpan = parent.find('.mod-form-surplusnum span');
        var total = 2000;
        var str = $.trim(obj.val());
        var length = str.length;
        var num = 0;

        if(length>total){
            textSpan.html('已超出');
            num=length-total;
            numSpan.html(num);
        }else{
            textSpan.html('还可以输入');
            num=total-length;
            numSpan.html(num);
        }
    }
    function loadingFn(){ //请求中
        loadmorebox.hide();
        loadingbox.show();
    }
    function loadingFinish(){ //请求完成
        loadingbox.hide();
        loadmorebox.show();
    }

    function getdata(action,qid,content,page){
        $.ajax({
            url: '/askajax/',
            type: 'POST',
            dataType: 'json',
            data: {
                'action' : action,
                'qid' : qid,
                'content' : content,
                'page': page
            },
            success:function(result){
                if(result.code == 200){
                    var data = result.data;
                    var list = data.list
                    var str = '';
                    $(list).each(function(){
                        var that = this;
                        str += template.render('morelistTpl',that);
                    });
                    parent.append(str);
                    loadingFinish();
                    if(data.hasmore!=1){
                        loadmoreEle.hide();
                    }else{
                        var newpage = parseInt(page)+1;
                        loadmorebox.attr({'page': newpage});
                    }

                }else{
                    mobilePopup.showPromptMessage(result.message);
                    loadingFinish();
                }
            },
            error:function(){
                mobilePopup.showPromptMessage('数据加载失败，请稍后再试。');
                loadingFinish();
            }
        });
    }
    formMod.listen('/ask/search.html',{
        validError:function(validResutl){
            var item  = validResutl.element;
            if(item.attr('name')=='kw'){
                if(validResutl.valid == 'notempty'){
                    alert('请输入您想知道的问题');
                }
            }
        }
    });
    var seoadv = function(){
        $.ajax({
            url: '//www.p2peye.com/ajax.php?mod=ad&ajaxtype=seoqdh5&callback=callback',
            type: 'post',
            data: {},
            dataType: 'jsonp',
            jsonp:'callback',
            success: function (res) {
                if (res.code == 200) {
                    var data = res.data[0];
                    $('body').append(template.render('seoTpl',{data: data}));
                }
            }
        })
        $('body').on('click','.ui-seoadvert-close',function(){
            $('.ui-seoadvert').remove();
        })
    }
    seoadv();
})