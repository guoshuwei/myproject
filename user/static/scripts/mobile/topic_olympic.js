var app = require('./app');

var xtianWalking = function(){ //小天走步
    var flag = 1,
        $people = $('.xtian'),
        timer,
        img1 = $people.find('img').eq(0),
        img2 = $people.find('img').eq(1);

    function reset(){
        img1.show();
        img2.hide();
    }

    function run(){
        if(!time)return;
        if(flag % 2 == 0){
            img1.hide();
            img2.show();
        }else{
            img1.show();
            img2.hide();
        }
        flag ++;

        setTimeout(run,200);
    }

    reset();

    return {
        go : function(){
            time = true;
            run();
        },
        stop : function(){
            time = false;
        }
    }
}();

var stepClassArr = [
        'firstStep','secondStep','thirdStep','fourthStep','fifthStep',
        'sixthStep','sevenStep','eighthStep','ninthStep','tenthStep',
        'eleventhStep','twelfthStep','thirteenthStep','fourteenthStep',
        'arrivalEnd'];

function animateToNextAdd(target,str,canmove,key,className,fn){ //小天行走
    var $people = $('.people');
    var classNameStr = $people.attr('class');
    var classNameArr = classNameStr.split(' ');
    var lastClassName = classNameArr[classNameArr.length-1];
    var defaultClass = lastClassName.slice(0,5);
    var num = parseInt(lastClassName.slice(5));

    function changeClassname(){
        if(num == target){
            //xtianWalking.stop();
            changeStep(canmove);
            changebg(className,str,key);
            if(fn){
                fn();
            }
            PopUp(str,'top');
            $('#canclick').removeAttr('lock');
            return;
        }else{
            num++;
        }

        var newClassName = defaultClass+num;
        $people.removeClass(lastClassName).addClass(newClassName);
        lastClassName = newClassName;
        //xtianWalking.go();
        setTimeout(changeClassname,1000);
    }

    changeClassname();
}

function movePeople(str,num,canmove,key){
    var $people = $('.people');
    var prev = parseInt(num)-1;
    
    $people.attr({ 'num' : num });

    if(prev == 14){
        animateToNextAdd(num,str,canmove,key,stepClassArr[prev],arrivalEnd);
    }else{
        animateToNextAdd(num,str,canmove,key,stepClassArr[prev]);
    }
    
}

function arrivalEnd(){
    var $span = $('.cango');
    var $span2 = $('.gotext');
    var str = '您已到达终点';
    var $start = $('#canclick');
    $start.removeClass('canclick').addClass('noclick');
    $start.removeAttr('id');
    $span.html(str);
    $span2.html(' ');
}
function changebg(className,str,key){
    var $div = $('.'+ className);
    if(className == 'firstStep'){
        $div.removeClass('moneybag').addClass('money8');
    }else if(className == 'fourthStep'){
        $div.removeClass('moneybag').addClass('money18');
    }else if(className == 'ninthStep'){
        $div.removeClass('moneybag').addClass('money38');
    }else if(className == 'end'){
        $div.removeClass('moneybag').addClass('money88');
    }else {
        $div.removeClass('nogo').addClass('goby');
        $div.attr({ 'data' : str });
        $div.attr({ 'kami' : key });
    }
}
function changeStep(canmove){
    var em = $('.cango em')
    em.html(canmove);
}

function isStep (){
    var em = $('.cango em');
    var num = parseInt(em.html());

    if(num){
        return true;
    }else{
        return false;
    }
}

$('body')
.on('touchend','#nouser',function(){
    if(!_Fn.isLogin()) return;
    if(!_Fn.isBind()) return;
})
.on('touchend','#canclick',function(){ /*小天请求步数*/
    if(!_Fn.isLogin()) return;
    if(!_Fn.isBind()) return;

    var lock = $(this).attr('lock');
    if(lock) return;
    $(this).attr({ 'lock' : '1'});

    var step = isStep();

    if(!step){
        var str = '请先获得前进步数';
        PopUp(str,'btm');
        return
    }
    
    PackUp();
    
    $.ajax({
        type: 'post',
        url: '/topic/forward',
        dataType:'json',
        success: function(msg){
            if(msg.code == 200 || msg.code == 5163){
                var str = msg.data.award_name;
                var key = msg.data.code_key;
                var localnum = msg.data.loca_num;
                var canmove = msg.data.remaining;
                if(key){
                    movePeople(str,localnum,canmove,key);
                }else{
                    movePeople(str,localnum,canmove);
                }
            }else{
                var str = msg.message;
                PopUp(str,'btm');
            }
        }
    }); 
})
.on('touchend','.qt-w750',function(){
    PackUp();
})
.on('touchend','#popup-box',function(){ //收起
    PackUp();
})
.on('touchend','#tep0',function(event){ //步数为0时
    event.stopPropagation();
    var str = '请获得更多前进步数';
    PopUp(str,'btm');

})
.on('touchend','#getend',function(event){ //到达终点
    event.stopPropagation();
    var str = '您已到达终点';
    PopUp(str,'btm');

})
.on('touchend','.nogo',function(event){
    event.stopPropagation();
    var str = '请获得更多前进步数';
    PopUp(str,'btm');
})
.on('touchend','.moneybag',function(event){
    event.stopPropagation();
    
    var classNameStr = $(this).attr('class');
    var classNameArr = classNameStr.split(' ');
    var firstClassName = classNameArr[0];
    var money = 0;

    if(firstClassName == 'firstStep'){
        money = 5.8;
    }else if(firstClassName == 'fourthStep'){
        money = 18;
    }else if(firstClassName == 'ninthStep'){
        money = 38;
    }else if(firstClassName == 'end'){
        money = 88;
    }
    var str = '到达本站即可获得'+money+'元现金奖励';

    PopUp(str,'top');
})
.on('touchend','.goby',function(event){
    event.stopPropagation();
    var prizeName = $(this).attr('data');
    var kami = $(this).attr('kami');
    var str = '';

    if(!kami){
        str = prizeName;
    }else{
        str = prizeName+'<br />'+kami;
    }

    PopUp(str,'top');

})
.on('touchend','.olympic_foot .main',function(event){
    event.stopPropagation();
    var str = '”新用户首投”1个P2P理财直投区的平台（≥500元）可获得前进步数1步；除“新用户首投”外投资（≥500元）全程最多可获得前进步数2步（首站前进必须是新用户首投平台）投资结果以标的起息时间为准。';
    str+='<br />';
    str+='PC端访问 https://licai.p2peye.com 投资';

    PopUp(str,'top');
})
.on('touchend','#activity_end',function(){
    var str = '活动已结束';
    PopUp(str,'btm');
});

function PopUp(str,btn){ //底部弹出框
    var $popBox = $('#popup-box');
    var screenWidth = $(window).width();    
    var inner = $popBox.find('.inner');
    var btnbox = $popBox.find('.btnbox');
    var top = '<span class="top">我知道了</span>';
    var btm = '<span class="btm">好</span>';

    inner.html(str);
    if(btn == 'top'){
        btnbox.html(top);
    }else if(btn == 'btm'){
        btnbox.html(btm);
    }

    var h = $popBox.find('.box').innerHeight();
    $popBox.css({ 'width' : screenWidth });

    $popBox.css({ 'height': h });
    /*
    $popBox.animate({  
        height : h
    }, 'slow' ); */
}

function setNewWidth(){
    var $popBox = $('#popup-box');
    var screenWidth = $(window).width(); 
    $popBox.css({ 'width' : screenWidth });
} 

function PackUp(){ //收起
    var $popBox = $('#popup-box');

    $popBox.css({ 'height': 0 });
    /*
    $popBox.animate({  
        height : 0
    }, 'slow' ); */
}

var proportion=0;
var window_width=$(window).width();
var window_height=$(window).height();

proportion=window_width/window_height;

if(proportion>1){
    windowStyle=1;
}else{
    windowStyle=2;
}

function hengshuping(event){
    if(window.orientation==0||window.orientation==180){
        //竖屏 return false;  
        windowStyle=1;
    }else if(window.orientation==-90||window.orientation==90){ 
        //横屏return false;  
        windowStyle=2;
        
    }
    setNewWidth();
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

function PowerPlatform(){ //助力平台 
    var $parent = $('.power_plat');
    var $prev = $parent.find('.prev');
    var $next = $parent.find('.next');
    var $ul = $parent.find('ul');
    var $aLi = $ul.find('li');
    var length = $aLi.length;
    var liWidth = parseInt($aLi.eq(0).outerWidth(true));
    var w = $aLi.eq(0).outerWidth(true)*3;
    var move = true;

    if(length <= 3)return;

    var num = 0;
    var remainder = 0; 
    var l = 0;

    if(length%3 == 0){
        remainder =parseInt(length/3);
    }else{
        remainder =parseInt(length/3)+1;
    }

    totalWidth = length*liWidth; 
    //$ul.css({ width : totalWidth });
    $next.show();

    $next.click(function(){
        if(!move)return;
        move = false;
        num++;
        $ul.addClass('marginleft');

        if(num == remainder-1){
            $next.hide();
        }
        move = true;
        /*
        num++;
        l = num*w
        $ul.animate({  
            marginLeft : -l
        }, 'slow' ,function(){
            if(num == remainder-1){
                $next.hide();
            }
            move = true;
        });*/
        $prev.show();
    });

    $prev.click(function(){
        if(!move)return;
        move = false;
        $ul.removeClass('marginleft');
        num--;
        if(num == 0){
            $prev.hide();
        }
        move = true;
        /*
        num--;
        l = num*w
        $ul.animate({  
            marginLeft : -l
        }, 'slow' ,function(){
            if(num == 0){
                $prev.hide();
            }
            move = true;
        }); */
        $next.show();
    });

}

PowerPlatform();


