var
    app = require('./app'),
    template = require('../modules/template'),
    isApp = Number($("#isApp").val()),
    isLogin = Number($("#isLogin").val()),
    endTime = Number($("#endTime").val()),
    endToStartTime = Number($("#endToStartTime").val()),
    sendLock = false;


/* 倒计时 start */
var getCard = function (cardId) {
    $.ajax({
        url : "//licai.p2peye.com/redland/getCard",
        type : "post",
        data : {
            card_id : cardId
        },
        dataType : "json",
        success : function(res){
            if(res.code == 200){
                var el = template.render('cardTpl',res.data);
                $("#redcard").html(el).removeClass("card-item-disabled");
            }else{
                window.location.reload();
            }

        },
        error : function(){
            window.location.reload();
        }
    })
};

// 剩余的时间戳的差值（秒数）
var timeWait = Number($("#remainingTime").val());
if(!timeWait){
    timeWait = 0;
}
// 将时间戳的差值转换为一个对象，这个对象里包括了剩余的天数，小时数，分钟数和秒数，以及它们被拆分成的个位和十位
var timestampToTime = function(timestamp){
    var TimeObj = {},

        dayBase = 24 * 60 * 60 ,  //计算天数的基数，单位秒。1天等于24*60*60。
        hourBase = 60 * 60 ,  //计算小时的基数，单位秒。1小时等于60*60。
        minuteBase = 60 ,  //计算分钟的基数，单位秒。1分钟等于60。
        secondBase = 1,  //计算秒钟的基数，单位秒。
        day = Math.floor(timestamp / dayBase),  //计算天数，并取整数部分。如 5.9天 = 5天
        hour = Math.floor(timestamp % dayBase / hourBase),  //计算小时，并取整数部分。如 20.59小时 = 20小时
        minute = Math.floor(timestamp % dayBase % hourBase / minuteBase),  //计算分钟，并取整数部分。如 20.59分钟 = 20分钟
        second = Math.floor(timestamp % dayBase % hourBase % minuteBase / secondBase);  //计算秒钟，并取整数部分。如 20.59秒 = 20秒


    // 天、时、分、秒
    TimeObj.day = day;
    TimeObj.hour = hour;
    TimeObj.minute = minute;
    TimeObj.second = second;


    // 天的十位
    TimeObj.dayDecade = Math.floor(day / 10);
    // 天的个位
    TimeObj.dayUnit = Math.floor(day % 10);

    // 小时的十位
    TimeObj.hourDecade = Math.floor(hour / 10);
    // 小时的个位
    TimeObj.hourUnit = Math.floor(hour % 10);

    // 分钟的十位
    TimeObj.minuteDecade = Math.floor(minute / 10);
    // 分钟的个位
    TimeObj.minuteUnit = Math.floor(minute % 10);

    // 秒的十位
    TimeObj.secondDecade = Math.floor(second / 10);
    // 秒的个位
    TimeObj.secondUnit = Math.floor(second % 10);

    return TimeObj;
};

var countDown = function(_timeWait){
    // 时间一到 就停止
    if(_timeWait <= 60){
        getCard($("#redcard").data("id"));
        return;
    }
    // 把时间戳生成我们需要的对象。
    var TimeObj = timestampToTime(_timeWait),
        $countDown = $("#countDown");

    if(Number($countDown.find("#day").html()) !== TimeObj.day){
        $countDown.find("#day").html(TimeObj.day);
    }
    if(Number($countDown.find("#hour").html()) !== TimeObj.hour){
        $countDown.find("#hour").html(TimeObj.hour);
    }
    if(Number($countDown.find("#minute").html()) !== TimeObj.minute){
        $countDown.find("#minute").html(TimeObj.minute);
    }

    setTimeout(function () {
        countDown(_timeWait - 1);
    }, 1000);
};
if(timeWait > 0){
    countDown(timeWait + 60);
}
/* 倒计时 end */

/* 活动结束 神券变为倒计时 start */
setTimeout(function(){
    var el = template.render('countdownTpl');
    $("#redcard").html(el).removeClass("card-item-yiling").removeClass("card-item-isused").removeClass("card-item-isused-inapp").addClass("card-item-disabled");
    countDown(endToStartTime + 59);
},endTime * 1000);
/* 活动结束 神券变为倒计时 end */

$("body")
    .on("tap",".card-item-btn",function(){
        if(!isLogin){
            return;
        }
        var $this = $(this),
            $card = $this.parents(".card-item");
        if($card.hasClass("card-item-disabled") || $card.hasClass("not-login")){
            return;
        }

        if($card.hasClass("card-item-yiling")){
            // 已经领取
            if(_Fn.terminalInfo.app == "licai"){
                // 旧版本不作处理  直接跳转H5
                if((_Fn.terminalInfo.terminal == "ios" && _Fn.terminalInfo.version < "20170912") || (_Fn.terminalInfo.terminal == "android" && _Fn.terminalInfo.version < "5.0.1")){
                    return;
                }
                // 所有券未使用 跳转标的列表页 已筛选的
                var ids = $card.data("ids");
                _Fn.fireApp({
                    trigger : "searchLoans",
                    data : { 'pn' : 1, 'pid' : ids ,'background ':''}
                });
                return false;
            }
            return;
        }else if($card.hasClass("card-item-isused")){
            // 神券 已使用
            if(_Fn.terminalInfo.app == "licai"){
                // 旧版本不作处理  直接跳转H5
                if((_Fn.terminalInfo.terminal == "ios" && _Fn.terminalInfo.version < "20170912") || (_Fn.terminalInfo.terminal == "android" && _Fn.terminalInfo.version < "5.0.1")){
                    return;
                }
                // 如果在app内, 跳转失效页面
                _Fn.fireApp({
                    trigger : "invalid",
                    data : ""
                });
                return false;
            }
            return;
        }


        if(sendLock){
            return;
        }
        var cardId = $card.attr("data-id");
        if($card.attr("data-id")){
            sendLock = true;
            $.ajax({
                url : "/redland/send_h5gift",
                type : "post",
                data : {
                    card_id : cardId
                },
                dataType : "json",
                success : function(res){
                    sendLock = false;
                    if(res.code == 200){
                        var dataHref = $card.attr("data-href");
                        $this.attr({"href" : dataHref}).html("立即使用").parents(".card-item").addClass("card-item-yiling");
                        $card.find(".card-item-left").attr({"href" : "//licai.p2peye.com/member/ztkajuandetail?id=" + res.data, "data-cardid" : res.data});
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
    })
    .on("tap",".card-item-left",function(){
        var $this = $(this),
            $card = $this.parents(".card-item");
        if($card.hasClass("card-item-isused") || $this.hasClass("count-down")){
            // 神券已经使用的状态  或者  神券在倒计时状态
            return false;
        }

        if(_Fn.terminalInfo.app == "licai"){
            // 旧版本不作处理  直接跳转H5
            if((_Fn.terminalInfo.terminal == "ios" && _Fn.terminalInfo.version < "20170912") || (_Fn.terminalInfo.terminal == "android" && _Fn.terminalInfo.version < "5.0.1")){
                return;
            }
            // 如果在app内, 跳转至卡券详情页
            var isgot = $card.hasClass("card-item-yiling") ? 1 : 0,
                card_id = $this.data("cardid"),
                ids = $card.data("ids");

            _Fn.fireApp({
                trigger : "couponInfo",
                data : {"card_id" : card_id , "isgot" : isgot ,'pn' : 1, 'pid' : ids ,'background ':''}
            });
            return false;
        }
    });