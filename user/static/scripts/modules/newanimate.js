var template = require('../modules/template');
window._Fn =  window._Fn  || {};

function getAdd(ele){
    var add = {};

    add.left = ele.offset().left;

    add.top = ele.offset().top;

    add.width = ele.width()+parseInt(ele.css('paddingLeft'))+parseInt(ele.css('paddingRight'));

    add.height = ele.height()+parseInt(ele.css('paddingTop'))+parseInt(ele.css('paddingBottom'));

    add.center = {
        x : add.left + add.width / 2,
        y : add.top +add.height / 2
    }
    add.centerLeft = {
        x : add.left,
        y : add.top +add.height / 2
    }
    add.centerTop = {
        x : add.left + add.width / 2,
        y : add.top
    }

    add.centerRight = {
        x : add.left + add.width,
        y : add.top +add.height / 2
    }
    add.centerBottom = {
        x : add.left + add.width / 2,
        y : add.top + add.height
    }

    add.roleLeftTop = {
        x : add.left,
        y : add.top
    }

    add.roleLeftBottom = {
        x : add.left,
        y : add.top + add.height
    }

    add.roleRightTop = {
        x : add.left + add.width,
        y : add.top
    }

    add.roleRightBottom = {
        x : add.left + add.width,
        y : add.top + add.height
    }


    return add;
}
function createNumerDom(type){
    if(document.getElementById('animate_dom_num')){
        return $('#animate_dom_num');
    }
    $('body').append('<div id="animate_dom_num">+1</div>');
    return $('#animate_dom_num');
}


function Jumper(ele,delay){
    this.ele = ele;
    this.reg=/^(\d|([1-9]\d+))(\.\d+){1}$/;
    this.reg1=/^(\d+)(,\d+)/;
    this.delay = delay ? delay : null;
}

Jumper.prototype.move = function(stopNumber,ele,innerText){
    var
        that = this,
        time=820,
        outTime=0,
        interTime=10;
    if(that.reg1.test(innerText)){
        var timer = setInterval(function(){
            outTime+=interTime;

            if(outTime<time){
                ele.text(that.toThousandPoints(stopNumber/time*outTime,innerText));
            }else{
                ele.text(that.toThousandPoints(stopNumber,innerText));
                clearInterval(timer)
            }
        },interTime);
    }else{
        var timer = setInterval(function(){
            outTime+=interTime;

            if(outTime<time){
                ele.text(that.toNormalNumber(stopNumber/time*outTime,innerText));
            }else{
                ele.text(that.toNormalNumber(stopNumber,innerText));
                clearInterval(timer)
            }
        },interTime);
    }
}
Jumper.prototype.toNumber = function(number){
    var nuwString = number.split(',');
    return parseFloat(nuwString.join(""));
}
Jumper.prototype.toThousandPoints = function(number,innerText){
    var that = this;
    number=Number(number);
    if(that.reg.test(innerText)){
        number=number.toFixed(2)+"";
    }else{
        number=number.toFixed(0) +"";
    }
    var re=/(-?\d+)(\d{3})/;
    while(re.test(number)){
        number=number.replace(re,"$1,$2");
    }
    return number;
}
Jumper.prototype.toNormalNumber = function(number,innerText){
    var that = this;
    number=Number(number);
    if(that.reg.test(innerText)){
        number=number.toFixed(2)+"";
    }else{
        number=number.toFixed(0) +"";
    }
    return number;
}

Jumper.prototype.init = function(){
    var
        that=this,
        innerText=that.ele.text(),
        stopNumber = parseFloat(that.toNumber(innerText)),
        numberLength = stopNumber.length,
        numberList="";
    if(that.delay&&that.delay==true){
        setTimeout(function(){
            that.move(stopNumber,that.ele,innerText);
        },that.delay);
    }else{
        that.move(stopNumber,that.ele,innerText);
    }
}


function Loading(ele,type){
    this.ele = ele;
    this.type = type;
}

Loading.prototype.create = function(){
    var that = this;
    if(that.type && that.type == 'big'){
        $('body').append('<img style="display:none;" class="ui-loading big" id="loading-big" src="/styles/images/common/loading-big.gif" />');
        return $('#loading-big');
    }else{
        $('body').append('<img style="display:none;" class="ui-loading small" id="loading-small" src="/styles/images/common/loading-small.gif" />');
        var add = getAdd(that.ele);
        $('#loading-small').css({
            top : add.center.y - 15,
            left : add.center.x - 15
        })
        return $('#loading-small');
    }
}

var _loading = function(){
    function create(ele,type){
        if(type && type == 'big'){
            $('body').append('<img style="display:none;" class="ui-loading big" id="loading-big" src="/styles/images/common/loading-big.gif" />');
            return $('#loading-big');
        }else{
            $('body').append('<img style="display:none;" class="ui-loading small" id="loading-small" src="/styles/images/common/loading-small.gif" />');
            var add = getAdd(ele);
            $('#loading-small').css({
                top : add.center.y - 8,
                left : add.center.x - 8
            })
            return $('#loading-small');
        }
    }
    return {
        show : function(ele,type,callback){
            $('.ui-loading').remove();
            create(ele,type);
            $('.ui-loading').fadeIn(250,function(){
                callback && callback();
            });
        },
        hide : function(callback){
            $('.ui-loading').fadeOut(250, function() {
                callback && callback();
            });
        }
    }
};



var _circle = function(){
    function create(ele){
        var content = template.render('circleTpl');
        $('body').append(content);
        var add = getAdd(ele);
        $('.ui-circle').css({
            top : add.center.y - 8,
            left : add.center.x - 8
        })
        $(ele).css('position','relative');
        return $('.ui-circle');
    }
    return {
        show : function(ele,callback){
            $('.ui-circle').remove();
            create(ele);
            $('.ui-circle').fadeIn(250,function(){
                callback && callback();
            });
        },
        hide : function(callback){
            $('.ui-circle').fadeOut(250, function() {
                callback && callback();
            });
        }
    }
};



$("[role='role-jump']").each(function(){
    new Jumper($(this)).init();
})


exports.numberUp = function(ele,css,content){
    if(ele.length== 0) return;
    var add = getAdd(ele);
    var numer = createNumerDom();
    numer.css({
        left : add.centerTop.x + 'px',
        top : add.top - 24 + 'px'
    })
    if(css){
        numer.css(css);
    }
    if(content){
        numer.html(content);
    }
    setTimeout(function(){
        numer.addClass('uping');
        setTimeout(function(){
            numer.remove();
        },1000)
    },10)
}

exports.jump = function(ele,delay){
    new Jumper($(ele),delay).init();
}
exports.loading = function(ele,type,callback){
    return _loading(ele,type,callback);
}
exports.circle = function(ele,callback){
    return _circle(ele,callback);
}

