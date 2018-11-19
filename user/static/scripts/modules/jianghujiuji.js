var
    template = require('../modules/template'),
    getLock = false,
    sendLock = false;
$("body")
    .on("click","[role=jianghujiuji]",function(){
        if(getLock){
            return;
        }
        getLock = true;
        $.ajax({
            url : "/redland/getJhjj",
            type : "post",
            dataType : "json",
            success : function(res){
                getLock = false;
                if(res.code == 200){
                    contentHtml = template.render('jianghujiujiTpl',res.data);
                    $("body").append(contentHtml).css({"overflow":"hidden"});
                    $(".jiuji-float").show();
                }else{
                    _Fn.alert(res.message);
                }
            },
            error : function(){
                getLock = false;
                _Fn.alert("客官别急，休息一会在试试！");
            }
        });
    })
    .on("click",".jiuji-close",function(){
        $(".jiuji-float").remove();
        $("body").css({"overflow":"visible"});
    })
    .on("click",".jiuji-item-got",function(){
        var $this = $(this);
        if($this.parents(".jiuji-item").hasClass("jiuji-item-yiling") || $this.parents(".jiuji-item").hasClass("not-now")){
            return;
        }
        if(sendLock){
            return;
        }
        sendLock = true;
        var cardId = $this.attr("data-id");
        if($this.attr("data-id")){
            $.ajax({
                url : "/redland/send_gift",
                type : "post",
                data : {
                    card_id : cardId
                },
                dataType : "json",
                success : function(res){
                    sendLock = false;
                    if(res.code == 200){
                    $this.attr({"href":"/member/ztkajuan-2-1","target":"_blank"}).parents(".jiuji-item").addClass("jiuji-item-yiling").find(".jiuji-item-ling").html("查看卡券");
                    }else{
                        _Fn.alert(res.message);
                    }
                },
                error : function(){
                    _Fn.alert("客官别急，休息一会在试试！");
                    sendLock = false;
                }
            });
        }
    });


