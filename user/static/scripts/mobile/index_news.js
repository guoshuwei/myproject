$(window).ready(function(){
    var navDropDown = require('../modules/mobileIndexNav'),//nav下拉框
        template = require('../modules/template'),
        lidernav=require("../modules/index_slidenav"),
        app=require('./app');
    var dataParent=$('[role-main="parents"]'),
        ajaxoff = false,
        morebtn = $('a[role-touch="more"]'),
        dataJson={type:'news',pid:Number($('#platid').val()),page:2};
    navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);

    $('body')
        .on('click','a[role-touch="more"]',function(){
            if(ajaxoff) return false;
            ajaxoff = true;
            morebtn.html('加载中....');
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
                        morebtn.html('加载更多新闻');
                        return false;
                    }else if(res.code == 4550){//数据请求结束
                        morebtn.html('没有更多内容啦~');
                        morebtn.addClass("more-disable");
                        return false;
                    }else{
                        ajaxoff=false;
                        _Fn.alert(res.message);
                        morebtn.html('加载更多新闻');
                        return false;
                    }
                },
                error:function(res){
                    ajaxoff=false;
                    _Fn.alert(res.message);
                    morebtn.html('加载更多新闻');
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
        obj.click(function(){
            window.location.href=$(this).data('url');
            return false;
        })
    }

})