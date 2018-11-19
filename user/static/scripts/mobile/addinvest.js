var
    app = require('./app'),
    _echart = require('../modules/echart'),
    formMod = require('../modules/form'),
    dialogUi = require('../modules/dialogUi'),
    resultCall = require('../modules/ajaxcodecall');

var
    shareInvestDilog,
    _echart_distribution = false,
    _echart_mobility = false,
    closed = false,
    _echart_load_num = 0;

var context;
var isbind = $('.bind').val();
var invest = $('.invest').val();
var degree = $('.degree').val();
function doShareing(){
    $.ajax({
        url :'/member/share',
        type : 'post',
        dataType : 'json',
        data : {
            base_invest : _echart_distribution,
            base_flow : _echart_mobility,
            context : context,
            uid:'0'
        },
        success : function(res){
            if(res.code == 200){
                getalert('图片以生成,2秒后自动跳转！');
                setTimeout(function(){
                    window.location.href="//licai.p2peye.com/investshare/";
                }, 2000);
            }else{
                getalert(res.message);
                setTimeout(function(){
                    window.location.href="//licai.p2peye.com/investshare/";
                }, 2000);
            }

        }
    })
}
function show(){
    _echart.init({
        type : 'pie',
        id :document.getElementById('distribution'),
        config : {
            name : '平台分布',
            type : 'pie',
            radius : [60, 100],
            data : EchartData_distribution
        }
    },function(myChart){
        setTimeout(function(){
            _echart_distribution = myChart.getDataURL('png');
            _echart_load_num = _echart_load_num + 1;
            if(_echart_load_num == 2){
                doShareing();
            }
        },3000)
    });
    _echart.init({
        type : 'pie',
        id : document.getElementById('mobility'),
        config : {
            name : '流动性',
            type : 'pie',
            radius : [60, 100],
            data : EchartData_mobility
        }
    },function(myChart){
        setTimeout(function(){
            _echart_mobility = myChart.getDataURL('png');
            _echart_load_num = _echart_load_num + 1;
            if(_echart_load_num == 2){
                doShareing();
            }
        },3000)
    })
}
var timer;
function getalert(message, isShowAlway){
    clearTimeout(timer);
    var $popupBasic = $('#popupBasic').removeClass('shake_popup_alway').find('span').html(message).end().show();
    setTimeout(function(){
        if(isShowAlway){
            $popupBasic.addClass('shake_popup_alway')
        }else{
            $popupBasic.addClass('shake_popup').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                $(this).removeClass('shake_popup').one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function() {
                    $(this).hide();
                });
            });
        }
    }, 18);
    if(!isShowAlway){
        timer = setTimeout(function(){
            $('#popupBasic').hide();
        }, 2500);
    }
}
var publish = function (){
    context = $('.shareinvest').children('.context').val();
    if(context==''){
        getalert('发表内容不能为空');
        return;
    }else if(degree>=5){
        getalert('您分享的次数已达到上线');
        return;
    }else if(context.length<30||context.length>500){
        getalert('请输入30到500之间的字符');
        return;
    }else{
        getalert('图片生成中,请稍等！',true);
        show();
    }
}

$('#publish').click(function(){
    if(!EchartData_distribution || EchartData_distribution.length == 0){
        alert('您还没有记账，请先前往记账再继续分享！');
        return;
    }
    if(!EchartData_mobility || EchartData_mobility.length == 0){
        alert('您还没有记账，请先前往记账再继续分享！');
        return;
    }
    if(isbind==0){
        getalert('您没有绑定');
        return;
    }else{
        publish();
    }
})
