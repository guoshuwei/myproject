$(window).ready(function(){
    var mobilePopup = require('../modules/mobile_popup'), //手机版弹出层
        app=require('./app'),
        navDropDown = require('../modules/mobileIndexNav'),//nav下拉框
        template = require('../modules/template');
    var  rightSideBox = $('.right-sliding'),//右侧滑动
        slidernav=require("../modules/index_slidenav"),
        dataParent=$('[role-main="parents"]'),
        ajaxoff = false,
        morebtn = $('a[role-touch=more]'),
        dataJson={type:'ask',pid:Number($('#platid').val()),page:2};//请求传的参数
    navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);
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
    .on('click','a[role-touch=more]',function(){
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
                    morebtn.html('加载更多问答');
                    return false;
                }else if(res.code == 4550){//数据请求结束
                    morebtn.html('没有更多内容啦~');
                    morebtn.addClass("more-disable");
                    return false;
                }else{
                    ajaxoff=false;
                    _Fn.alert(res.message);
                    morebtn.html('加载更多问答');
                    return false;
                }
            },
            error:function(res){
                ajaxoff=false;
                _Fn.alert(res.message);
                morebtn.html('加载更多问答');
                return false;
            }
        })
        return false;
    })
    .on('click',"[role-touch='member']",function(){
        window.location.href=$(this).data('url');
        return false;
    });
    //数据模板
    function creatData(data,num){
        var content = [];
        var numstartbtn=num*10;
        var numendbtn=(num-1)*data.length;
        var urlbtn = $("[role-touch='member']");
        for(var i in  data){
            content.push(template.render('contentTpl',data[i]));
        }
        dataParent.append(content.join(''));
        for(var i=numstartbtn;i<numendbtn;i++){
            touchmember(urlbtn.eq(i));
        }
    }
    function touchmember(obj){
        obj.click(function(){
            window.location.href=$(this).data('url');
            return false;
        })
    }
})