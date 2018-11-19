var activity = $(".mod-activity"),
    activityBtn = $(".mod-activitybtn"),
    activityShow = function(){
        activityBtn.css({"transition-delay":"0s","margin-left":"-"+activityBtn[0].clientWidth+"px"});
        activity.css({"transition-delay":".5s","margin-left":0,"opacity":1});
    },
    activityHide = function(){
        activity.css({"transition-delay":"0s","margin-left":"-"+activity[0].clientWidth+"px","opacity":0});
        activityBtn.css({"transition-delay":".5s","margin-left":0});
    };

    activityShow();

$("body")
    .on("click",".mod-activitybtn",activityShow)
    .on("click",".activity-exit,.go-btn a",activityHide);
