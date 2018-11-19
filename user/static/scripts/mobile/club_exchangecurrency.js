var
    app = require('./app'),
    $body       = $("body"),
    $exchangeClear = $(".exchange-clear");

$body
    .on("tap",".exchange-clear",function(){
        $("#money").val("");
        $exchangeClear.hide();
    })
    .on("input","#money",function(){
        var $this = $(this),
            thisVal = $this.val();
        if(thisVal.length){
            $exchangeClear.show();
        }else{
            $exchangeClear.hide();
        }
    })
    .on("tap",".exchange-input-btn",function(){
        var $this = $(this),
            money = $("#money").val(),
            maxMoney = $("#maxMoney").val();

        if($this.hasClass("disabled")){return}

        if(!/^\d+((\.{1}\d+)|\d?)$/.test(money)){
            _Fn.alert("请输入正确的金额");
            return;
        }else{

            if(money.split(".")[1] && money.split(".")[1].length > 0){
                _Fn.alert("兑换金额须为整数");
                return;
            }
        }
        if(Number(money) < 1){
            _Fn.alert("兑换金额须大于等于1");
            return;
        }

        if(Number(maxMoney) > 100){
            if(Number(money) > 100){
                _Fn.alert("每次最多可兑换1000理财币");
                return;
            }
        }else{
            if(Number(money) > Number(maxMoney)){
                _Fn.alert("账户余额不足");
                return;
            }
        }
        $this.html("兑换中").addClass("disabled");
        $.ajax({
            url : "/club/exchangecurrency",
            type : "post",
            data : {
                "money" : money
            },
            dataType : "json",
            success : function(res){
                if(res.code == 200){
                    _Fn.alert("兑换成功");
                    setTimeout(function(){
                        window.location.href = "//licai.p2peye.com/club/creditshop";
                    },500);
                }else{
                    $this.removeClass("disabled");
                    _Fn.alert(res.message);
                }
            },
            error : function(){
                _Fn.alert("网络错误请稍后再试");
                $this.removeClass("disabled");
            }
        });
    });