/**
 * Created by yx on 16-8-29.
 */

var
    app = require('./app'),
    template = require('../modules/template'),
    countDown = require('../modules/countDown');
var Common = function () {

    var bindEvent = function(){

            function cartoon () {
                var hdBox=$(".wrap .hd"),
                    moon=hdBox.find(".moon"),
                    tit=hdBox.find(".title");
                setTimeout(function(){
                    tit.animate({
                        "top":"-94px"
                    },600);
                },300);
                moon.animate({
                    "top":"30px"
                },1000);
                $(".return-top").on("click",function(){
                    $('body,html').animate({scrollTop:0},200);
                })
            }
            cartoon();
        },
        AutoPic = function(){
            //头部反复轮播
            function autoPic ()
            {
                this.init.apply(this, arguments);
            }
            autoPic.prototype =
            {
                init : function (id)
                {
                    var _this = this;
                    this.wrap = typeof id === "string" ? document.getElementById(id) : id;
                    this.oUl = this.wrap.getElementsByTagName("ul")[0];
                    this.aLi = this.wrap.getElementsByTagName("li");
                    this.prev = this.wrap.getElementsByTagName("pre")[0];
                    this.next = this.wrap.getElementsByTagName("pre")[1];
                    this.aLogo=this.wrap.getElementsByTagName("p");
                    this.timer = null;
                    this.aSort = [];
                    this.iCenter = 1;
                    this.options = [
                        {width:360, height:182, top:40, left:20, zIndex:2},
                        {width:562, height:285, top:0, left:140, zIndex:3},
                        {width:360, height:182, top:40, left:460, zIndex:2}
                    ];
                    //this.logoOptions=[
                    //    {width:116, height:68, top:18, left:124, zIndex:2},
                    //    {width:136, height:106, top:28, left:212, zIndex:3},
                    //    {width:116, height:68, top:18, left:124, zIndex:2}
                    //];
                    //this.performOptions=[
                    //    {top:120, left:142,fontSize:20, zIndex:2},
                    //    {top:40, left:20,fontSize:30, zIndex:3},
                    //    {top:120, left:140,fontSize:20, zIndex:2}
                    //];
                    for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
                    this.aSort.unshift(this.aSort.pop());
                    this.setUp();

                    this.prev.onmouseover=function(){
                        _this.aSort.unshift(_this.aSort.pop());
                        _this.setUp();
                        //_this.setLogo();
                    };
                    this.next.onmouseover=function(){
                        _this.aSort.push(_this.aSort.shift());
                        _this.setUp();
                        //_this.setLogo();
                    };
                    this.prev.onmouseout=function(){
                        _this.aSort.push(_this.aSort.shift());
                        _this.setUp();
                    };
                    this.next.onmouseout=function(){
                        _this.aSort.unshift(_this.aSort.pop());
                        _this.setUp();
                    };
                },
                //setLogo : function(){
                //    var _this=this;
                //    var j = 0;
                //    //console.log(this.aLogo);
                //    for(j=0; j<this.aLogo.length; j++){
                //        this.aLogo[j].index = j;
                //        if(j < 3){
                //            this.doMove(this.aLogo[j], this.logoOptions[j], function (){
                //                //doStyle(_this.aLogo[this.iCenter],this.logoOptions[j]);
                //            })
                //        }
                //    }
                //},
                setUp : function ()
                {
                    var _this = this;
                    var i = 0;

                    for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
                    for (i = 0; i < this.aSort.length; i++)
                    {
                        this.aSort[i].index = i;
                        this.aSort[this.iCenter].getElementsByTagName("img")[0].style.opacity=1;
                        if (i < this.iCenter || i > this.iCenter){
                            this.aSort[i].className="play extend";
                        }else{
                            this.aSort[i].className="play";
                        }
                        if (i < 3)
                        {
                            this.doMove(this.aSort[i], this.options[i], function ()
                            {
                                _this.aSort[_this.iCenter].getElementsByTagName("img")[0].style.opacity=1;
                                _this.aSort[_this.iCenter].className="play";
                            });
                        }
                        this.doMove(this.aSort[i], this.options[i], function ()
                        {
                            for (i = 0; i < this.aSort.length; i++){
                                if (i < this.iCenter || i > this.iCenter)
                                {

                                    this.aSort[i].getElementsByTagName("img")[0].style.opacity=0.5;
                                    this.aSort[i].className="play mask extend";
                                }else{
                                    this.aSort[i].className="play back";
                                }
                            }
                        });
                    }
                },
                doStyle : function (oEle, attr, value)
                {
                    if (arguments.length == 2)
                    {
                        return oEle.currentStyle ? oEle.currentStyle[attr] : getComputedStyle(oEle, null)[attr]
                    }
                    else if (arguments.length == 3)
                    {
                        switch (attr)
                        {
                            case "width":
                            case "height":
                            case "top":
                            case "left":
                            case "bottom":
                            case "fontSize":
                                oEle.style[attr] = value + "px";
                                break;
                            case "opacity" :
                                oEle.style.filter = "alpha(opacity=" + value + ")";
                                oEle.style.opacity = value / 100;
                                break;
                            default :
                                oEle.style[attr] = value;
                                break
                        }
                    }
                },
                doMove : function (oEle, oAttr, callBack)
                {
                    //console.log(oEle)
                    //console.log(oEle.getElementsByTagName("div")[0]);
                    //var oLogo=oEle.getElementsByTagName("div")[0];
                    var _this = this;
                    clearInterval(oEle.timer);

                    if(oEle.className=="play mask"){
                        oEle.className="play";
                    }
                    oEle.timer = setInterval(function ()
                    {
                        var Stop = true;
                        for (var i in oAttr)
                        {
                            var iCur = parseFloat(_this.doStyle(oEle, i));
                            i == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
                            var iSpeed = (oAttr[i] - iCur) / 5;
                            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                            if (iCur != oAttr[i])
                            {
                                Stop = false;
                                _this.doStyle(oEle, i, iCur + iSpeed)
                            }
                        }
                        if (Stop)
                        {
                            clearInterval(oEle.timer);
                            callBack && callBack.apply(_this, arguments)
                        }
                    }, 20)
                }
            };
            window.onload = function ()
            {
                setTimeout(function(){
                    new autoPic("special");
                },500)
            };
        },
        renderLoans = function(){
            //整点10爆款标开始
            var nowTimeHour = $('.hotLoans').attr('data-now'),
                timeSplit =  nowTimeHour >= 10 ? 1 : 2;

            normalLoansTpl = template.render('normalLoansTpl');
            mixLoansTpl = template.render('mixLoansTpl');
            totalInvestTpl = template.render('totalInvestTpl');

            $(".normalLoans").html(normalLoansTpl);
            $(".mixLoans").html(mixLoansTpl);
            $(".totalInvest").html(totalInvestTpl);

            //爆款标

            getHotLoans(timeSplit);

            function getHotLoans (loansTime){
                $.ajax({
                    url: _Fn.mockServer + '/ajax/getKillLoans',
                    type: 'post',
                    data:{

                    },
                    //async:false,
                    dataType: 'json',
                    success: function(res){

                        if(res.code == 200){
                            var data = res.data;
                            //data.type = loansTime;
                            console.log(data);
                            hotLoansHtml = template.render('hotLoansTpl',data);

                            if(data.type){
                                console.log(data.type);
                                $('.hotLoans').html(hotLoansHtml);
                                if(data.type == 2){
                                    countDownHander($(".count"));
                                }
                            }
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }
            //倒计时
            function countDownHander (ele){
                countDown.listen(
                    ele,
                    function(){
                    },
                    '/ajax/serverTime',
                    function(timeFormart,time){
                        console.log(timeFormart);
                        timer = timeFormart.split('|')[1].split(',');
                        var html = [],htmlTime = [];
                        for(var i = 0 ; i < timer.length ; i++){
                            if(i<3){
                                continue;
                            }
                            for(var j = 0 ; j < timer[i].length; j++){
                                if(j > 0){

                                }
                                htmlTime.push(timer[i][j]);
                            }
                        }

                        html.push('<li class="time number">');
                        html.push(htmlTime[0]);
                        html.push('</li>');
                        html.push('<li class="time number">');
                        html.push(htmlTime[1]);
                        html.push('</li>');
                        html.push('<li class="time sign">:</li>');
                        html.push('<li class="time number">');
                        html.push(htmlTime[2]);
                        html.push('</li>');
                        html.push('<li class="time number">');
                        html.push(htmlTime[3]);
                        html.push('</li>');
                        html.push('<li class="time sign">:</li>');
                        html.push('<li class="time number">');
                        html.push(htmlTime[4]);
                        html.push('</li>');
                        html.push('<li class="time number">');
                        html.push(htmlTime[5]);
                        html.push('</li>');

                        ele.html(html.join(''));
                    }
                )
            }
        },
        alertMsg = function(){
            function alertMark(){

                if(!$('.alertMark').length){

                    var alertMark = $('<div class="alertMark"></div>');
                    alertMsgTpl = template.render('alertMsgTpl');

                    alertMark.css({

                        'width':$('body').outerWidth(),

                        'height':$('body').outerHeight()

                    }).appendTo($('body'));

                    if(!$('.alertMsg').length){
                        var alertMsg = $('<div class="alertMsg"></div>');

                        alertMsg.html(alertMsgTpl);
                        alertMsg.appendTo($('body'));
                    }

                }else{

                    var alertMark = $('.alertMark');

                }
            }
            alertMark();
            $('.closeBtn').on('click',function(){
                $('.alertMark').fadeOut();

                $('body').children('.alertMark').remove();
                $('body').children('.alertMsg').remove();
            });
        },
        getCoupon = function(){
            var coupon=$('.coupon').find('.case.under');

            if('transform' in document.documentElement.style){

                var supportCss3 = true;

            }else{

                var supportCss3 = false;

            }

            overturn(coupon,function(){

                var $this=$(this);
                var getBtn=$this.find('get');

                function over (){

                    $this.addClass('already').removeClass('under');
                    getBtn.text('卡密：123445555444');

                }

                setTimeout(over,1000);

            });

            function overturn (ele,callback){

                ele.on("click",function(){

                    if(supportCss3){

                        $(this).addClass('hover');

                    }

                    callback && callback.apply(this, arguments);
                });
            }
        };
    return {
        index : function () {
            bindEvent();
            AutoPic();
            renderLoans();
            alertMsg();
        },
        coupon : function () {
            getCoupon();
        }
    }
}();
window.Common=Common;

