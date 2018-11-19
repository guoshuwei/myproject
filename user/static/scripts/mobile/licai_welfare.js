var
    app = require('./app');

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
    // 时间小于0 就停止
    if(_timeWait < 0){
        return;
    }

    // 把时间戳生成我们需要的对象。
    var TimeObj = timestampToTime(_timeWait),
        $countDown = $("#countDown");

    if(Number($countDown.find("#dayDecade").html()) !== TimeObj.dayDecade){
        $countDown.find("#dayDecade").html(TimeObj.dayDecade);
    }
    if(Number($countDown.find("#dayUnit").html()) !== TimeObj.dayUnit){
        $countDown.find("#dayUnit").html(TimeObj.dayUnit);
    }
    if(Number($countDown.find("#hourDecade").html()) !== TimeObj.hourDecade){
        $countDown.find("#hourDecade").html(TimeObj.hourDecade);
    }
    if(Number($countDown.find("#hourUnit").html()) !== TimeObj.hourUnit){
        $countDown.find("#hourUnit").html(TimeObj.hourUnit);
    }
    if(Number($countDown.find("#minuteDecade").html()) !== TimeObj.minuteDecade){
        $countDown.find("#minuteDecade").html(TimeObj.minuteDecade);
    }
    if(Number($countDown.find("#minuteUnit").html()) !== TimeObj.minuteUnit){
        $countDown.find("#minuteUnit").html(TimeObj.minuteUnit);
    }
    if(Number($countDown.find("#secondDecade").html()) !== TimeObj.secondDecade){
        $countDown.find("#secondDecade").html(TimeObj.secondDecade);
    }
    if(Number($countDown.find("#secondUnit").html()) !== TimeObj.secondUnit){
        $countDown.find("#secondUnit").html(TimeObj.secondUnit);
    }

    setTimeout(function () {
        countDown(_timeWait - 1);
    }, 1000);
};
countDown(timeWait);


$("body")
    .on("tap",".step-hd-item",function(){
        var step = Number($(this).attr("data-number"));
        clearInterval(timeout);
        sliderAuto(step);
    })
    .on("tap",".pager-prev",function(){
        var step = stepNumber;
        if(step == 1){
            step = 4;
        }else{
            step -= 1;
        }
        clearInterval(timeout);
        sliderAuto(step);
    })
    .on("tap",".pager-next",function(){
        var step = stepNumber;
        if(step == 4){
            step = 1;
        }else{
            step += 1;
        }
        clearInterval(timeout);
        sliderAuto(step);
    });
/*
$(".step-bd-wrap").hover(function(){
    clearInterval(timeout);
},function(){
    sliderAuto(stepNumber);
});*/

var stepNumber;
var stepSlider = function(step){
    var oneWidth = $(".step-bd-item").outerWidth(),
        marginLeft = oneWidth * (step-1);

    $(".step-bd-list").css("marginLeft",-marginLeft);
    $(".step-hd-point").removeClass("step-1").removeClass("step-2").removeClass("step-3").removeClass("step-4").addClass("step-" + step);

    if(step == 1){
        $(".pager-prev").fadeOut();
    }else{
        $(".pager-prev").fadeIn();
    }
    if(step == 4){
        $(".pager-next").fadeOut();
    }else{
        $(".pager-next").fadeIn();
    }
    stepNumber = step;
};
var timeout;
var sliderAuto = function(step){
    clearInterval(timeout);
    stepSlider(step);
    timeout = setTimeout(function(){
        if(step == 4){
            step = 1;
        }else{
            step += 1;
        }
        sliderAuto(step);
    },5000);
};
sliderAuto(1);


window.stepSlider = stepSlider;