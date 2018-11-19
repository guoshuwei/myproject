var
    app = require('./app'),
    $body = $("body");


$body
    // 展示弹窗
    .on("tap",".get-goods-btn",function(){
        var $this = $(this);
        if($this.hasClass("disabled"))return;
        setTimeout(function(){
            if($this.hasClass("no-address")){
                // 没有收货地址
                $body.append($("#addressTpl").html());
                $(".exchange-float").fadeIn();
            }else{
                $body.append($("#exchangeTpl").html());
                $(".exchange-float").fadeIn();
            }
        },200);
    })
    .on("tap",".fn-close",function(){
        setTimeout(function(){
            $(".exchange-float").remove();
        },1000);
    })
    .on("tap","#doExchange",function(){
        var $this = $(this);
        if($this.hasClass("disabled"))return;
        $this.addClass("disabled").html("兑换中");

        var goods_id = $("#goods_id").val(),
            card_id = $("#card_id").val();
        $.ajax({
            url : "/club/exchangegoods",
            data : {
                "goods_id" : goods_id,
                "card_id" : card_id
            },
            type : "post",
            dataType : "json",
            success : function(res){
                if(res.code == 200){
                    _Fn.alert("兑换成功");
                    $(".exchange-float").remove();
                    setTimeout(function(){
                        window.location.href = "//licai.p2peye.com/club/exchange";
                    },1000);
                }else{
                    _Fn.alert(res.message);
                    $this.removeClass("disabled").html("兑换");
                }
            },
            error : function(){
                _Fn.alert("网络错误,请稍后再试");
                $this.removeClass("disabled").html("兑换");
            }
        })
    });