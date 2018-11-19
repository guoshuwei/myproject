var
    app = require('./app'),
    template = require('../modules/template'),
    numberupMoney = $('#numberup').text();
$(window).ready(function(){
    var showPrizeAdd = $(".section-prize .prize-list");
    var prizeShowOff = document.getElementById("prizeShow");
    var signinOff=$("#signin").attr('api-data');
    $('body')
        .on('touchend','#signin',function(){
            if(!_Fn.isBind())return;
            if(signinOff == 1){
                ajaxprocess();
            }
            $(this).html("签到中");
            $.ajax({
                url : '/redland/setSignin',
                type : 'post',
                dataType : 'json',
                data : null,
                success : function(res){
                    ajaxprocessClose();
                    if(res.code == 200){
                        res.data.numberupMoney = numberupMoney;
                        var message = res.data;
                        var content = template.render('redlandTpl',res.data);
                        $('.ui-redland-head').html(content);
                        $('.ui-numberadd').each(function(){
                            new _NumberScroll($(this),2).init();
                        })
                        $('[role-api=numberadd]').each(function(){
                            new _NumberScroll($(this),1).init();
                        });
                        if(message.reward_exists == 1) {//有红包
                            $(".ing-bar-ing").animate({width:"100%"},500,function(){
                                var prize = template.render('prizeTpl',message);
                                $(".ajaxprocess-main").html(prize);
                                $(".section-package .package-item").each(function(i){
                                    if($(this).data('day') == message.obtain) {
                                        $(this).find(".already-open").show();
                                        $(this).find(".package-img img").attr({src:"/styles/images/redland/mobile/already-prize.png"});
                                    };
                                });
                                if(prizeShowOff) {
                                    showPrizeAdd.append(template.render("showprizeTpl",message));
                                }else {
                                    $(".section-package").after(template.render("showprizewrapTpl",message));
                                    $(".section-prize .prize-list").append(template.render("showprizeTpl",message));
                                }
                            });

                        }else {
                            var everyalign = template.render('everyTpl',message);
                            $("body").append(everyalign);
                        }
                        processClose();
                        processRefresh();
                    }else{
                        ajaxError(signinOff)
                    }
                },
                error:function(res) {
                    ajaxError(signinOff)
                }
            })
        })


    function _NumberScroll(ele,status,start,end,delay,time){
        this.ele = ele;
        this.time = time || 1000;
        this.delay = delay;
        this.reg1 = /\./;
        this.reg2 = /,/;
        this.numberList = "";
        this.startNumber = start || ele.text();
        this.endNumber = end || this.startNumber * 1 + 1;
        this.status = status || 1;
        this.numberLength = (this.startNumber + '').length;
        this.scrollHeight = $('.ui-redland-head-middle').innerHeight();
    }
    _NumberScroll.prototype._numberScroll=function(){

        var that = this;
        var html =[];
        that.startNumber = that.startNumber * 1;

        for(var i = that.startNumber + 1;i < that.endNumber + 1;i++){
            html.push('<strong>' + i + '</strong>')
        }
        var scrollHeight = $('.ui-redland-head-top').innerHeight();
        that.ele.find('.ui-numberadd-inner').append(html.join(''));
        that.ele.find('.ui-numberadd-inner').css({'line-height':scrollHeight + 'px'})
        that.ele.find('.ui-numberadd-inner').animate({
            marginTop : '-' + scrollHeight * (that.endNumber - that.startNumber) + 'px'
        },that.time)
    }
    _NumberScroll.prototype.numberScroll=function(){
        var that=this;
        that.ele.html(that.numberList);
        var scrollHeight = $('.ui-redland-head-middle').innerHeight();
        for(var i=0; i<that.numberLength;i++){
            var random = Math.round(Math.random()*that.time);
            random = random < 500 ? 800 : random;
            if(that.reg1.test(that.startNumber.charAt(i))){
                that.ele.children("span").eq(i).html("<i class='i'>.</i>").css("top","0");
            }else if(that.reg2.test(that.startNumber.charAt(i))){
                that.ele.children("span").eq(i).html("<i class='i'>,</i>").css("top","0");
            }
            that.ele.children("span").find('i').css({'line-height':scrollHeight + 'px'});
            that.ele.children("span").eq(i).animate({
                top: '-' + (that.startNumber.charAt(i)*scrollHeight)+'px'
            },random)
        }
    }
    _NumberScroll.prototype.init=function(){
        var that=this;
        if(that.status == 1){
            for(var i=0; i<that.numberLength;i++){
                that.numberList += '<span class="span"><i class="i">01234567890123456789</i></span>';
            }
            if(that.delay&&that.delay==true){
                setTimeout(function(){
                    that.numberScroll();
                },1000);
            }else{
                that.numberScroll();
            }
        }else{
            if(that.delay&&that.delay==true){
                setTimeout(function(){
                    that._numberScroll();
                },1000);
            }else{
                that._numberScroll();
            }
        }

    }
})

//等待交互的过程
function ajaxprocess(){
    var content = template.render("ajaxprocessTpl");
    $("body").append(content);
    $(".ing-bar-ing").animate({width:"80%"},3000);
}
//结果返回交互过程隐藏
function ajaxprocessClose(){
    $(".ing-bar-ing").stop();
}
//关闭
function processClose(){
    $("body").on('touchend',"[api-event='close']",function(){
        $(".section-ajaxprocess").remove();
    })
}
//刷新页面
function processRefresh(){
    $("body").on('touchend',"[api-event='refresh']",function(){
        location.reload();
    })
}
//ajax返回错误
function ajaxError(val){
    if(val != 1){
        $("body").append(template.render("maskbgTpl"))
    }
    var content = template.render("errorTpl");
    $(".ajaxprocess-main").html(content);
    processClose();
    processRefresh();
}



