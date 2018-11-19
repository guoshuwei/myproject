var
    app = require('./app');


$(window).ready(function(){
    var speedJump = 10,
        jumpData = $('[role=data-jump]'),
        jumpTimer = null,
        totalAmount = $("#totalAmount"),            // 进行中的总额
        availableBalance = $("#availableBalance"),  // 可用余额
        $totalCash = $("#totalCash"),                 // 累计直投奖励

        nodata = function (){
            totalAmount.html("0.00");
            availableBalance.html("0.00");
            $totalCash.html("0.00");
        },

        jumpAnimat = function (){
            jumpTimer=setTimeout(function(){
                jumpData.html(Math.round(Math.random()*100) + '.' + Math.round(Math.random()*100));
                jumpAnimat();
            },speedJump);
        };

    jumpAnimat();
    $.ajax({
        url:'//licai.p2peye.com/member/ajaxCouponTotal',
        type: "get",
        success:function(res){
            clearTimeout(jumpTimer);
            if(res.code == 200){
                var data=res.data;
                totalAmount.html(data.total_amount.b + "." + data.total_amount.a);
                availableBalance.html(data.userTyqInvestInfo.available.b + "." + data.userTyqInvestInfo.available.a);
                $totalCash.html(data.total_cash.b + "." + data.total_cash.a);
            }else {
                nodata();
            }
        },
        error:function(){
            clearTimeout(jumpTimer);
            nodata();
        }
    });
});