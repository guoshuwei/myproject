var proportion=0;
var window_width=$(window).width();
var window_height=$(window).height();

proportion=window_width/window_height;

if(proportion>1){
    windowStyle=1;
}else{
    windowStyle=2;
}

var app = require('./app');
var dialogUi = require('../modules/dialogUi');
var template = require('../modules/template');
var formMod = require('../modules/form');
var jiathisdown=false;
var windowStyle=null;
var bshare=false;



function hengshuping(event){
    if(window.orientation==0||window.orientation==180){
        //竖屏 return false;  
        windowStyle=1;
    }else if(window.orientation==-90||window.orientation==90){ 
        //横屏return false;  
        windowStyle=2;
    }
    redefine();
    
    if(bshare){
        myshare();
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);


$(function(){ //我要分享
    $('body').on('touchend','#share',function(){
        bshare=true;
        
        //关闭当前弹层
        $('#close').trigger('touchend'); //mousedown
        
        //打开分享层指示
        maskLayer();
        myshare();
    });
});

function myshare(){ //我要分享
    var t=0;
    if($(document).scrollTop()){
        t=$(document).scrollTop()+t;
    }
   
    if(windowStyle==1 || windowStyle === null){
        $('.carnival_myshare2').hide();
        $('.carnival_myshare').css({'top':t}).show();
    }else{
        $('.carnival_myshare').hide();
        $('.carnival_myshare2').css({'top':t}).show();
    }
}

function myshareClose(){
    $('.carnival_myshare').hide();
    $('.carnival_myshare2').hide();
}

$(function(){ //我要分享
    $('body').on('touchend','.carnival_myshare',function(){
        closeMaskLayer()
        myshareClose();
        bshare=false;
    });
    $('body').on('touchend','.carnival_myshare2',function(){
        closeMaskLayer()
        myshareClose();
        bshare=false;
    });
});


//立即签到
$('body').on('click','#signIn a',function(){
    if(!_Fn.isLogin()) return false;
});


$(function(){  //顶部向左移动
    var oDiv=$('.mod-carnival-top');
    var oUl=oDiv.find('ul'); 
    var aLi=oUl.find('li'); 
    var w_div=oDiv.width(); 
    var w_ul=0; 
    var timer=null; 
    var bTimer=false; 
    var l=0;
    if(oDiv.length == 0) return;
    
    aLi.each(function(){
        var w_li=$(this).outerWidth()*2;
        w_ul+=w_li;
    });
    
    if(w_ul<w_div)return;
    oUl.css({'width':w_ul});
    oUl[0].innerHTML=oUl[0].innerHTML+oUl[0].innerHTML;
    
    rollLeft();
    function rollLeft(){
        if(bTimer)return;
        clearTimeout(timer);
        l--;
        if(Math.abs(l)>=w_ul){
            l=0;
        }
        oUl[0].style.marginLeft=l+'px';
        timer=setTimeout(rollLeft,20);
    }
    
    $('body').on('touchstart','.mod-carnival-top',function(){
        bTimer=true;
        clearTimeout(timer);
    });
    
    $('body').on('touchend','.mod-carnival-top',function(){
        bTimer=false;
        clearTimeout(timer);
        timer=setTimeout(rollLeft,20);
    }); 
    
}); 


$(function(){ //幸运大抽奖
    var oUl=$('.circle');
    var aDiv=oUl.find('.box');
    var oSpan=oUl.find('.list0 span');
    var time=parseInt(oSpan.html());
    var timer=null;
    var timing=null; 
    var i=0;
    
    //touchend
    $('body').on('touchend mousedown','#circle',function(){ 
        var data = $(this).attr('data');
        if(data == 'no'){
            var url = window.location.href;
            url = '/member/bind?referer='+url;
            window.location.href = url;
            return;
        }
        if(data == 'login'){
            _Fn.isLogin();
            return;
        }
        if(time==0){
            dialogFn('抱歉，请先获得抽奖机会','tipTpl');
            return false;
        }
        var that=$(this);
        if(that.attr('lock')=='locked')return;
        that.attr({'lock':'locked'});
        
        aDiv.eq(1).removeClass('win');
        i=Math.round(Math.random()*(7)+1); //(1--8)
        
        startFn();
        function startFn(){
            timer=setTimeout(function(){
                circles();
                startFn();
            },50);
        }
        
        timing=setTimeout(function(){
            getPrize();
            time--;
            clearInterval(timer);
            clearInterval(timing);
            that.attr({'lock':'unlock'});
        },5000); 
        
    });
    
    function circles(){
        var currentDiv=aDiv.eq(i);
        if(i==aDiv.length-1){
            i=-1;
        }
        currentDiv.addClass('win');
        setTimeout(function(){
            currentDiv.removeClass('win');
        },50);
        i++;
    }
    
    function getPrize(){
        $.ajax({
            type: 'post',
            url: '/topic/ordinaryawards',
            dataType:'json',
            success: function(msg){
                var str='';
                if(msg.code==200){
                    oSpan.html(time);
                    str='<span>'+msg.data[0].award_name+'</span><br />已获奖品在 "我的奖品" 列表中查看';
                    //str=msg.data[0].award_name;
                }else{
                    //str=msg.message;
                    str='<span>'+msg.message+'</span><br />已获奖品在 "我的奖品" 列表中查看';
                }
                
                dialogFn(str,'winTpl'); 
            }
        });
    }
});




$(function(){ //幸运大抽奖图片轮换
    var oUl=$('.circle');
    //var aImg=oUl.find('.inner img');
    var aDiv=oUl.find('.inner');
    var srcArr=['prize_klinde_m','prize_doll_m','prize_travel_m','prize_redEnvelope_m','prize_canon_m','prize_coffeeMachine_m','prize_sweepingRobot_m','prize_razor_m','prize_uav_m','prize_soundBox_m','prize_lucky_m'];
    var timer=null;
    var aImgArr=[];
    
    for(var i=0;i<srcArr.length;i++){
        var img=document.createElement('img'); 
        img.src='/styles/images/carnival/'+srcArr[i]+'.png';
        aImgArr.push(img);
    }
    
    
    function randomFn(){
        return Math.random() - 0.5;
    }
    
    changePosition();
    function changePosition(){
        timer=setTimeout(function(){
            aImgArr.sort(randomFn);
            aDiv.each(function(i){
                $(this).find('img').remove();
                $(this).prepend($(aImgArr[i]));
            });
            changePosition();
        },1000);
    }
    
}); 




$(function(){ //设置body高度
    var bodyHeight=$('body').innerHeight();
    var screenHeight=$(window).height();
    
    if(bodyHeight<screenHeight){
        $('body').css({'height':screenHeight});
    }
});


$(function(){ //签到规则
    $('body').on('touchstart','#signInRules',function(){
        var str = template.render('signinTpl');
        createDialog(str);
    });
});

//收货地址
formMod.listen('/topic/goodsreceipt',{
    validSuccess:function(validResutl){
        var item  = validResutl.element;
    },
    validError:function(validResutl){
         var item  = validResutl.element;
         if(item.attr('name')=='data[consignee]'){
            if(validResutl.valid == 'notempty'){
                item.attr({'placeholder':'收货人不能为空'});
            }
        }
        if(item.attr('name')=='data[phone]'){
            if(validResutl.valid == 'notempty'){
                item.attr({'placeholder':'联系电话不能为空'});
            }
            if(validResutl.valid == 'number'){
                //item.attr({'placeholder':'联系电话只能是数字'});
                item.val('联系电话只能是数字').css({'color':'#d98383'});
            }
            console.log(validResutl.valid);
        }
        if(item.attr('name')=='data[address]'){
            if(validResutl.valid == 'notempty'){
                item.attr({'placeholder':'收货地址不能为空'});
            }
        }
    },
    cleanup:function(item){
        if(item.attr('name')=='data[phone]'){
            item.css({'color':'#fff'});
        }
    },
    success:function(result){
        result=$.parseJSON(result.data);
        if(result.code == 200){
            window.location.href = '/topic/carnivalgift';
            return;
        }
        dialogFn(result.data,'tipTpl');

    },
    error:function(){
    }
});

function dialogFn(message,tpl,callback){ //调用弹框
    var data={};
    data.message=message;
    var str = template.render(tpl,data);
    createDialog(str,callback);
}

function redefine(){ //重新定义遮罩层宽高
    var lightbox=$('#lightbox_wrap');
    var dialog=$('.carnival_dialog');
    var w=$('body').outerWidth();
    var h=$('body').outerHeight();
    
    if(lightbox.attr('open')=='no')return;
    
    lightbox.css({
		'width':w,
		'height':h
	});
}

function closeDialog(){ //关闭弹框
    var dialog=$('#dialog');
    var dialogWin=$('#dialogWin');
    var content=dialog.find('.content');
    dialog.hide();
    content.html(' ');
    dialogWin.hide();
}

function closeMaskLayer(){ //关闭遮罩层
    var lightbox=$('#lightbox_wrap');
    lightbox.hide().attr({'open':'no'});
}

function createDialog(str){ //设置弹层宽高并显示
    var dialog=$('#dialog');
    var content=dialog.find('.content');
    content.html(str);
    
    var dialogHeight=dialog.outerHeight();
    var dialogWidth=dialog.outerWidth();
    var screenHeight=$(window).height();
    var t=0;
    
    //t=(windowStyle == 1 || windowStyle === null) ? 150 :  50;
    
    if(windowStyle == 1 || windowStyle === null){
        if(dialogHeight<screenHeight){
            t=(screenHeight-dialogHeight)/2;
        }
    }else{
        t=50;
    }
    
    if($(document).scrollTop()){
        t=$(document).scrollTop()+t;
    }
    
    
    
    dialog.css({
        position: 'absolute',
        left    : '50%',
        top     : t,
        zIndex : '1000',
        marginLeft : -dialogWidth/2
    });
    maskLayer();
    dialog.show();
}

function maskLayer(){ //设置遮罩层并显示
    var lightbox=$('#lightbox_wrap');
    var w=$('body').outerWidth();
    var screenHeight=$(window).height();
    var bodyHeight=$('body').outerHeight();
    var h=Math.max(screenHeight,bodyHeight);
    
    if(!$('#lightbox_wrap').length){
		var lightbox=$('<div id="lightbox_wrap"></div>');
		lightbox.css({
			'width':$('body').outerWidth(),
			'height':h
		}).appendTo($('body')).show().attr({'open':'yes'});
	}else{
		lightbox.show().attr({'open':'yes'});
	}
}

$(function(){ //关闭弹层
    $('body').on('touchend','#close',function(){
        closeDialog();
        closeMaskLayer();
    });
    $('body').on('mousedown','#close',function(){
        closeDialog();
        closeMaskLayer();
    });
});