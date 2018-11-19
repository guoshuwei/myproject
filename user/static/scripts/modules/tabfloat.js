// 左侧导航跟随页面移动

var $content = $(".content"),
    $tabWrap = $('.tab-wrap'),
    $tab;
if($(".tab-list").length){
    $tab = $(".tab-list")
}else if($(".tab").length){
    $tab = $(".tab")
}

if($tab.length){
    $tabWrap.css({"position":"relative"});
    $tab.css({"position":"absolute"});

    $(window).scroll(function(){
        var winTop = $(window).scrollTop(),
            maxMove = $content.height() - $tab.outerHeight(),
            listTop = $tabWrap.offset().top;
        if(winTop > listTop){
            var move = winTop - listTop;
            if(move >= maxMove){
                move = maxMove;
            }
            $tab.css("top",move + "px");
        }else{
            $tab.css("top","0px");
        }
    });
}

if($("#sliderTabInHere").length){

    var slider = $(".tab-list-item-two-slider");

    slider.css('top', slider.parents(".tab-list-box").find(".current").offset().top - slider.parents(".tab-list-box").offset().top).show();


    $(".tab-list-item-two").hover(function(){
        var $this = $(this),
            father = $this.parents(".tab-list-box"),
            slider = father.find(".tab-list-item-two-slider");
        slider.css('top',$this.offset().top - father.offset().top);
    },function(){
        var $this = $(this),
            father = $this.parents(".tab-list-box"),
            slider = father.find(".tab-list-item-two-slider");
            current = father.find(".current");
        slider.css('top',current.offset().top - father.offset().top);
    });



    /*$(".tab-list-item-two-slider").each(function (index, ele) {
        ele = $(ele);
        if(ele.parents(".tab-list-item-two-box").find(".current").length){
            ele.css('top', ele.parents(".tab-list-item-two-box").find(".current").offset().top - ele.parents(".tab-list-item-two-box").offset().top);
        }else{
            ele.css('top', 0);
        }
    });


    $(".tab-list-item-two").hover(function(){
        console.log("展示");
        var $this = $(this),
            father = $this.parents(".tab-list-item-two-box"),
            slider = father.find(".tab-list-item-two-slider");
        console.log($this.offset().top - father.offset().top);
        slider.show().css('top',$this.offset().top - father.offset().top);
    },function(){
        console.log("隐藏");
        var $this = $(this),
            father = $this.parents(".tab-list-item-two-box"),
            slider = father.find(".tab-list-item-two-slider"),
            current = father.find(".current");
        if(current.length){
            slider.css('top',current.offset().top - father.offset().top);
        }else{
            slider.hide();
        }
    })*/
}
