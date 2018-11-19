var app             = require('./app'),
    validate        = require('../modules/validate'),
    hiddenCid       = $("#hiddenCid").val(),
    hiddenHash      = $("#hiddenHash").val(),
    hiddenKid       = $("#hiddenKid").val(),
    hiddenMobile    = $("#hiddenMobile").val(),
    hiddenOrderid   = $("#hiddenOrderid").val(),
    hiddenUid       = $("#hiddenUid").val(),
    hiddenOpenid    = $("#hiddenOpenid").val(),
    hiddenNickname  = $("#hiddenNickname").val(),
    hiddenId        = $("#hiddenId").val(),
    hiddenHeadimgurl= $("#hiddenHeadimgurl").val(),
    packetType      = Number($("#packetType").val()),
    isShare         = Number($("#isShare").val()),
    isReceive       = Number($("#isReceive").val()),
    cycleTimes      = 0,
    updateMobileState = false;

/* 微信分享成功 */
var wxReady = require('../modules/jssdk'),
    wxShareTitle = $("#wxShareTitle").val(),
    wxShareDesc = $("#wxShareDesc").val();

wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        title : wxShareTitle,
        desc : wxShareDesc,
        success : function(){
            _Fn.track.fire(213000008);
            if(hiddenUid != 0 || packetType == 2){
                if(isShare == 0){
                    $(".share-success-layer").fadeIn();
                    $.ajax({
                        url:"/weixin/updatedimensioncode/",
                        type:"post",
                        data:{
                            "id" : hiddenId,
                            "open_id" : hiddenOpenid,
                            "uid" : hiddenUid,
                            "orderid" : hiddenOrderid,
                            "kid": hiddenKid,
                            "type": packetType
                        },
                        dataType:"json",
                        success:function(res){
                            if(res.code == 200){

                            }
                        },
                        error:function(jqXHR, textStatus, errorThrown){
                            alert("网络错误，请稍后再试");
                        }
                    });
                }
                $(".share-tips-layer").fadeOut();
            }
        }
    });
});

$("body")
    .on("touchend",".modify-submit",function(event){                            /* 修改手机号 */
        if(updateMobileState){
            return;
        }
        updateMobileState = true;
        var mobile = $(".modify-input").val();
        if(!mobile.length){
            alert("请填写手机号！");
            return false;
        }else if(!validate.api.mobile(mobile)){
            alert("请输入合法的手机号！");
            return false;
        }
        _Fn.track.fire(213000012);
        setTimeout(function(){
            $.ajax({
                url:"/weixin/updatemobile/",
                type:"post",
                data:{
                    "mobile" : mobile,
                    "open_id" : hiddenOpenid
                },
                dataType:"json",
                success:function(res){
                    updateMobileState = true;
                    if(res.code == 200){
                        $(".award-card").show();
                        $(".modify").hide();
                        $(".current-number em").html(res.data.mobole);
                        _Fn.alert("修改成功");
                    }else{
                        alert(res.message);
                    }
                },
                error:function(jqXHR, textStatus, errorThrown){
                    alert("网络错误，请稍后再试");
                }
            });
        },200);
    })
    .on("touchend",".got-it-phonenumber-btn",function(){                   /* 填手机号领红包 */
        var mobile = $(".got-it-phonenumber-input").val();
        if(!mobile.length){
            alert("请填写手机号！");
            return false;
        }else if(!validate.api.mobile(mobile)){
            alert("请输入合法的手机号！");
            return false;
        }
        _Fn.track.fire(213000009);
        setTimeout(function(){
            shareRed(mobile);
        },200);
    })
    .on("touchend",".do-share",function(){                             /* 展示分享提示层 */
        _Fn.track.fire(213000007);
        $(".share-tips-layer").fadeIn();
    })
    .on("touchend",".share-tips-layer",function(){                         /* 关闭分享提示层 */
        $(this).fadeOut();
    })
    .on("touchend",".share-success-close",function(){                      /* 关闭分享成功提示层 */
        $(".share-success-layer").fadeOut();
    })
    .on("touchend",".share-success-box-btn",function(){                    /* 分享成功，再领一个 */
        window.location.reload();
    })
    .on("touchend",".account-change",function(event){                           /* 展示修改手机号 */
        event.stopPropagation();
        $(".award-card").hide();
        $(".modify").show();
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    })
    .on("touchend",".novice-welfare-close",function(){                     /* 无门槛红包关闭 */
        $(".novice-welfare").fadeOut();
    })
    .on("touchend",".error-tips-update .use-btn",function(){
        window.location.reload();
    });


var getAward = function(mobile){
    setTimeout(function(){
        getRedPacketsDetail(mobile);
    },2000);
};

var getRedPacketsDetail = function(mobile){
    $.ajax({
        url:"/weixin/getRedpacketsDetail/",
        type:"post",
        data:{
            "cid" : hiddenCid,
            "mobile" : mobile
        },
        dataType:"json",
        success:function(res){
            cycleTimes += 1;
            if(res.code == 200){
                $(".award-card .card-list").empty();
                $(".loading").hide();
                if(packetType == 2){
                    $(".tip-words").html("恭喜您获得 " + res.data.total_cash + "元 理财奖励及一块拼图碎片");
                }else{
                    $(".tip-words").html("恭喜您获得 " + res.data.total_cash + "元 理财奖励");
                }
                if(res.data.new_user == 1){
                    $(".novice-welfare").show();
                }
                showAward(res.data.cards);
            }else if(res.code == 45003){
                $(".loading").hide();
                $(".error-tips .card-none").html("该理财红包已领完！");
                $(".error-tips,.luck").show();
            }else if(res.code == 45200){
                $(".loading").hide();
                $(".error-tips .card-none").html("今日领取次数已达上限！");
                $(".error-tips,.luck").show();
            }else if(res.code == 40400 || res.code == 45004){
                $(".loading").hide();
                $(".error-tips .card-none").html("网络错误！");
                $(".error-tips").show();
            }else if(res.code == 300){
                if(cycleTimes >= 3){
                    $(".loading").hide();
                    _Fn.alert("奖励未领取，请重新领取！");
                    $(".got-it-phonenumber").show().find(".got-it-phonenumber-input").val(hiddenMobile);
                }else{
                    getAward(mobile);
                }
            }else if(res.code == 45002){
                $(".award-card .card-list").empty();
                $(".loading").hide();
                if(packetType == 2){
                    $(".tip-words").html("恭喜您获得 " + res.data.total_cash + "元 理财奖励及一块拼图碎片");
                }else{
                    $(".tip-words").html("恭喜您获得 " + res.data.total_cash + "元 理财奖励");
                }
                if(res.data.new_user == 1){
                    $(".novice-welfare").show();
                }
                showAward(res.data.cards);
            }else{
                $(".loading").hide();
                alert(res.message);
            }
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("网络错误，请稍后再试");
        }
    });
};

/* 拆包请求 */
var shareRed = function(mobile){
    $.ajax({
        url:"/weixin/shareRed/",
        type:"post",
        data:{
            "cid" : hiddenCid,
            "mobile" : mobile,
            "orderid" : hiddenOrderid,
            "uid" : hiddenUid,
            "openid" : hiddenOpenid,
            "type" : packetType,
            "hash" : hiddenHash
        },
        dataType:"json",
        success:function(res){
            if(res.code == 200){
                $(".got-it-phonenumber").hide();
                if(packetType == 2){
                    $(".tip-words").html("恭喜您获得 " + res.data.total_cash + "元 理财奖励及一块拼图碎片");
                }else{
                    $(".tip-words").html("恭喜您获得 " + res.data.total_cash + "元 理财奖励");
                }
                $(".loading").hide();
                if(res.data.new_user == 1){
                    $(".novice-welfare").show();
                }
                showAward(res.data.cards);
            }else if(res.code == 300){
                $(".got-it-phonenumber").hide();
                $(".loading").show();
                getRedPacketsDetail(mobile);
            }else{
                $(".loading").hide();
                alert(res.message);
            }
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("网络错误，请稍后再试");
        }
    });
};

var getCard = function(){
    setTimeout(function(){
        getCardMessage();
    },1000);
};

var getCardMessage = function(){
    $.ajax({
        url:"/weixin/getcardmessage/",
        type:"post",
        data:{
            "kid" : hiddenKid,
            "uid" : hiddenUid,
            "orderid" : hiddenOrderid,
            "hash" : hiddenHash
        },
        dataType:"json",
        success:function(res){
            if(res.code == 200){                /* 分享前领到的红包 */
                $(".loading").hide();
                $('.got-it-money').html("<em>￥</em>"+res.data.amount);
                $('.got-it-congratulations em').html(res.data.name);
                $(".got-it").show();                /* 展示大红包 */
            }else if(res.code == 300){
                $(".loading").show();
                getCard();
            }else{
                $(".loading").hide();
                $(".error-tips-update .card-none").html(res.message);
                $(".error-tips-update,.luck").show();
            }
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert("网络错误，请稍后再试");
        }
    });
};


/* 展示领到的红包/卡券 */
var showAward = function(data){
    $(".award-card .card-list").empty();
    if(packetType == 2){
        var fragment = '<li class="card-list-item">' +
            '<div class="perforation-l"></div>' +
            '<div class="perforation-r"></div>' +
            '<div class="card-list-item-lt">' +
            '<div class="card-list-item-bd">' +
            '<div class="card-item-info">' +
            '<span class="card-item-info-title">“因EYE而生”机器人拼图碎片一块</span>' +
            '<span class="card-item-info-money">收集碎片，完成拼图可获现金红包</span>' +
            '</div>' +
            '</div>' +
            '<div class="card-list-item-ft">' +
            '<span class="overdue">10天后过期</span>' +
            '</div>' +
            '</div>' +
            '<div class="card-list-item-gt">' +
            '<img src="/styles/images/weixin/fragment.png" alt="">' +
            '</div>' +
            '</li>';
        $(".card-list").append(fragment);
        $(".award-card .use-btn").attr("href","javascript:;").addClass("do-share").html("邀请好友拿奖励");
        if($(".award-card .active-link").length == 0){
            $(".award-card").append("<a class='active-link' href='//licai.p2peye.com/topic/borntolove'>参与活动开礼盒</a>");
        }    }
    data.forEach(function(v,i){
        var number;
        if(v.type == 1){
            number = v.face_value + "<em>%</em>";
        }else if(v.type == 2){
            number = "<em>￥</em>" + v.face_value;
        }
        var el = '<li class="card-list-item">' +
            '<div class="perforation-l"></div>' +
            '<div class="perforation-r"></div>' +
            '<div class="card-list-item-bd">' +
            '<div class="card-item-info">' +
            '<span class="card-item-info-title">' + v.name + '</span>' +
            '<span class="card-item-info-money">最高抵扣' + v.up_cash + '元</span>' +
            '</div>' +
            '<span class="card-item-rate">' + number + '</span>' +
            '</div>' +
            '<div class="card-list-item-ft">' +
            '<span class="overdue">' + v.restrict + '</span>' +
            '<a href="//a.app.qq.com/o/simple.jsp?pkgname=com.p2peye.manage" class="card-item-use" track-event="213000011">去使用&gt;</a>' +
            '</div>' +
            '</li>';
        $(".card-list").append(el);
    });
    $(".tip-words,.award-card,.luck").show();             /* tip-words:总额提示，card:奖励列表，luck：大家的手气 */
};



if($("#Run").length){
    if(packetType == 2){
        $(".rules-active").show();
        if(hiddenUid != 0){                             /* 自己 */
            if(isShare){
                if(isReceive){
                    _Fn.alert("您已领过此红包！");
                    getRedPacketsDetail(hiddenMobile);
                }else{
                    $(".got-it-phonenumber").show().find(".got-it-phonenumber-input").val(hiddenMobile);
                }
            }else{
                $(".got-it-phonenumber").show().find(".got-it-phonenumber-input").val(hiddenMobile);
            }
        }else{                                          /* 别人 */
            if(isReceive){
                _Fn.alert("您已领过此红包！");
                getRedPacketsDetail(hiddenMobile);
            }else{
                $(".got-it-phonenumber").show().find(".got-it-phonenumber-input").val(hiddenMobile);
            }
        }
    }else{
        if(hiddenUid != 0){                             /* 自己 */
            if(isShare){
                $(".rules-share-after").show();
                if(isReceive){
                    _Fn.alert("您已领过此红包！");
                    getRedPacketsDetail(hiddenMobile);
                }else{
                    shareRed(hiddenMobile);
                }
            }else{
                $(".rules-share-before").show();
                getCardMessage();
            }
        }else{                                          /* 别人 */
            $(".rules-share-after").show();
            if(isReceive){
                _Fn.alert("您已领过此红包！");
                getRedPacketsDetail(hiddenMobile);
            }else{
                $(".got-it-phonenumber").show().find(".got-it-phonenumber-input").val(hiddenMobile);
            }
        }
    }
}
