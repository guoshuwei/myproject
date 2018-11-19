var
    app         = require('./app'),
    orderId     = $("#orderId").val(),
    mobileValue = $("#mobile").val(),
    uidValue    = $("#uid").val(),
    choiceList  = $(".choice-list"),
    awardType_1 = $("#type_1"),         /* 可选券类型的奖励 */
    awardType_2 = $("#type_2"),         /* 无券，但有小额奖励 */
    awardType_3 = $("#type_3"),         /* 不可选券类型的奖励 */
    awardId     = $("#awardId").val(),
    cardActiveCash = Number($("#cardActiveCash").val()),
    loading,
    jumpUrl;


$(".details-jump-cunguan .ui-details-jump-confirm").attr("href","https://www.touyouquan.com/reg.html");
$(".details-jump-bind .ui-details-jump-confirm").attr("href","//licai.p2peye.com/member/bind?referer=" + window.location.href);


$("body")
    .on("tap",".order-award-item-title-btn",function(){           /* 开启浮层 */
        if($(this).hasClass("no-use")){
            return;
        }else{
            setTimeout(function(){
                $(".float-layer").fadeIn();
                $(".choice").addClass("chioce-show");
            },100);
        }
    })
    .on("tap",".float-layer,.choice-close",function(){            /* 关闭浮层 */
        $(".float-layer").fadeOut();
        $(".choice").removeClass("chioce-show");
    })
    .on("tap",".choice",function(event){                          /* 阻止事件冒泡 */
        event.stopPropagation();
    })
    .on("tap",".choice-list-item",function(){
        if($(this).attr("data-id")){
            awardId = $(this).attr("data-id");
            $("#type_1 .order-award-item-title-btn").html($(this).find(".choice-title").html() + "<em></em>");
            $("#type_1 .order-award-item-money").html("可获奖励：￥" + $(this).attr("data-award"));
            $(".choice-list-item").removeClass("selected");
            $(this).addClass("selected");

            $(".order-award-item-go").removeClass("no-use");
        }else{
            awardId = $(this).attr("data-id");
            $("#type_1 .order-award-item-title-btn").html($(this).find(".choice-title").data("for") + "<em></em>");
            $("#type_1 .order-award-item-money").html("可获奖励：￥--");
            $(".choice-list-item").removeClass("selected");
            $(this).addClass("selected");

            $(".order-award-item-go").addClass("no-use");
        }

    })
    .on("tap","#type_1 .order-award-item-go",function(){          /* 使用可选券类型的奖励 */
        if($(this).hasClass("no-use")){
            return;
        }
        if(awardId == 0){
            _Fn.alert("请选择卡券");
            return;
        }
        loading = $(this).parents(".order-award-item").find(".ajax-style");
        loading.show();
        $.ajax({
            url:"/member/ajax",
            type:"get",
            data:{
                "type" : "match_card",
                "order_id" : orderId,
                "id" : awardId
            },
            dataType:"json",
            success:function(res){
                if(res.code == 200){
                    getOrdercode(awardId);
                }else if(res.code == 7060){  /* 没绑定投友圈 */
                    loading.hide();
                    _Fn.lightboxWrap()._fadeIn();
                    $('.fn-details-jump.details-jump-bind').fadeIn()
                }else if(res.code == 7061){  /* 没开通存管 */
                    loading.hide();
                    _Fn.lightboxWrap()._fadeIn();
                    $('.fn-details-jump.details-jump-cunguan').fadeIn()
                }else if(res.code == 7062){  /* 错误 */
                    loading.hide();
                    _Fn.alert(res.message);
                    steTimeout(function(){
                        window.location.reload();
                    },2000);
                }else{
                    loading.hide();
                    _Fn.alert(res.message);
                }
            },
            error:function(){
                loading.hide();
                _Fn.alert("网络错误，请稍后再试");
            }
        });
    })
    .on("tap","#type_2 .order-award-item-go",function(){
        loading = $(this).parents(".order-award-item").find(".ajax-style");
        loading.show();
        var id = $(this).attr("data-id");
        getOrdercode(id);
    })
    .on('tap','.ui-details-jump-cancel',function(){
        _Fn.lightboxWrap()._fadeOut();
        $('.fn-details-jump').hide();
    });



/* 微信分享接口 */
var getOrdercode = function(id){
    $.ajax({
        url:"/weixin/getOrdercode/",
        type:"post",
        data:{
            "uid" : uidValue,
            "mobile" : mobileValue,
            "orderid" : orderId,
            "cid" : id
        },
        dataType:"json",
        success:function(msg){
            if(msg.code == 200){
                window.location.href = msg.data.url;
            }else{
                loading.hide();
                _Fn.alert(msg.message);
            }
        },
        error:function(){
            loading.hide();
            _Fn.alert("网络错误，请稍后再试");
        }
    })
};


/* 领取奖励的请求 */
var useCard = function(cardid){
    $.ajax({
        url:"/member/ajax",
        type:"get",
        data:{
            "type" : "use_card",
            "id" : cardid
        },
        dataType:"json",
        success:function(msg){
            if(msg.code == 200){
                loading.hide();
                $(".order-award-item-go").html("已领取").addClass("no-use");
                _Fn.alert("领取成功，￥"　+ msg.data.amount);
                setTimeout(function(){
                    window.location.href = jumpUrl;
                },2000);
            }else{
                _Fn.alert(msg.message);
                loading.hide();
            }
        },
        error:function(){
            loading.hide();
            _Fn.alert("网络错误，请稍后再试");
        }
    })
};