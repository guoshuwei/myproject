var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    countDown = require('../modules/countDown'),
    formMod = require('../modules/form'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    jPages = require('../plugins/jPages.min'),
    nowTime = $('body').attr('data-nowtime'),//当前时间戳（php）
    loadmanage = require('../modules/loadmanage'),
    cookie = require('../plugins/$.cookie'),
    template = require('../modules/template');

//微信分享
var wxReady = require('../modules/jssdk');
var wxShareTitle = $('.wxShareTitle').val();
var wxShareDesc = $('.wxShareDesc').val();
wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        title : wxShareTitle,
        desc : wxShareDesc

    });
});
//初始化代码-------------------start--------------------------

loadmanage([
    '//licai.p2peye.com/styles/images/topic/borntolove/mobile/one.png',
    '//licai.p2peye.com/styles/images/topic/borntolove/mobile/two.png',
    '//licai.p2peye.com/styles/images/topic/borntolove/mobile/three.png',
    '//licai.p2peye.com/styles/images/topic/borntolove/mobile/four.png',
    '//licai.p2peye.com/styles/images/topic/borntolove/mobile/five.png',
    '//licai.p2peye.com/styles/images/topic/borntolove/mobile/sex.png'
],function(){

},function(a,b){
    if((b/a*100) == 100){
        $('.cartoonbj').css('display','none')
        $('.cartoonimg').css('display','none')
    }else{
        $('.cartoonbj').css('display','block')
        $('.cartoonimg').css('display','block')
    }
});



//初始化代码-------------------end--------------------------

