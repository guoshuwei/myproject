$(document).ready(function(){
    var template = require('../modules/template');
    var dataParent = $(".section1-main-body-num");
    var dataNum = dataParent.attr("data");
    var dataLength = dataNum.length;
    dataStr(dataNum,dataLength);
    function dataStr(num,length){
        var str='';
        for(var i=0;i<length;i++){
            str+= "<span class='section1-main-body-num-text'>";
            str+= num[i];
            str+="</span>";
        }
        dataParent.html(str);
    }
    $(".section-main-mod1-prize-btn").on("touchstart",function(){
        var prize = document.getElementById("prize");
        if(prize) return ;
        var content=template.render("prizeTpl");
        $(".prize-list").append(content);
    })
    $(".section1-main-body-btn").on("touchstart",function(){
        if($(this).hasClass("section1-main-body-btn")){
            var that = $(this);
            $.ajax({
                url:"/topic/flysignin",
                type: "post",
                success:function(res){
                    if(res.code == 200){
                        var data = res.data.all_num.toString();
                        that.removeClass("section1-main-body-btn");
                        that.html("等待开奖");
                        showres("我们已收到您的申请，请耐心等待审核！");
                        dataStr(data,data.length);
                    }else {
                        showres(res.message);
                    }
                },
                error:function(){

                }
            })
        }
    })
    function showres(res){
        var content = template.render("flyTpl",{message:res});
        $("body").append(content);
        $(".section-fly-close").on('touchstart',function(){
            $(".section-fly").remove();
            return false;
        });
        $(".section-fly-mask").on('touchstart',function(){
            $(".section-fly").remove();
        })

    }
})