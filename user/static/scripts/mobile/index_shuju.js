$(window).ready(function(){
    var navDropDown = require('../modules/mobileIndexNav');//nav下拉框
    lidernav=require("../modules/index_slidenav"),
    navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);
    var raderechart=document.getElementById('raderechart');
    if(raderechart){
        var datajson,
            rankArr=[],
            titleArr=[];
        var canvasparent=$("[data-wh=canvas]"),
            canvaswidth=canvasparent.outerWidth(),
            datajson=canvasparent.data('rader'),
            canvasheight=canvasparent.outerHeight();
        raderechart.width=canvaswidth;
        raderechart.height=canvasheight;
        raderechart=raderechart.getContext("2d");
        var fontsize=parseInt(canvasparent.css("font-size"));
        /*$.ajax({
            type: 'GET',
            url: '/shuju?&type=seven_day',
            dataType:'json',
            success: function(msg){
                if(msg.code==200){
                    var data = msg.data.data;
                    if(data.length==0){return;}
                    datajson=data[0];
                    for(var i in datajson){
                        if(datajson.hasOwnProperty(i)){
                            if(i.indexOf('Rank') > -1 && datajson[i]){
                                rankArr.push(datajson[i].value);
                                titleArr.push(datajson[i].lable);
                            }
                        }
                    }
                    drawRadarEcharts(rankArr,titleArr);
                }
            }
        });*/
        for(var i in datajson){
            if(datajson.hasOwnProperty(i)){
                if(i.indexOf('Rank') > -1 && datajson[i]){
                    rankArr.push(datajson[i].value);
                    titleArr.push(datajson[i].lable);
                }
            }
        }
        drawRadarEcharts(rankArr,titleArr);
        function drawRadarEcharts(data,title){
            if(title.length==0){
                title=['平均满标','投资人数','平均借款周期','累计贷款余额','借款人数','平均利率','成交额'];
            }
            if(data.length==0){
                dada=[0,0,0,0,0,0,0];
            }
            for(var i=0;i<data.length;i++){
                data[i]=Math.abs(400-data[i]);
            }
            var raderedata= {
                labels:title,
                datasets:[
                    {
                        fillColor : "#87cefa",//背景色
                        strokeColor : "#fd7f56",//折线的颜色
                        pointColor : "#fd7f56",//中间点的颜色
                        pointStrokeColor : "#fd7f56",//点描边的颜色
                        data : data
                    }
                ]
            };
            var radereoption = {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Chart.js Radar Chart'
                },
                scale: {
                    ticks: {
                        beginAtZero: true,
                        stepSize:100,//Y轴间隔
                    }
                },

                angleFontColor : "#ccc",
                scaleFontColor : "#ccc",
                angleLineWidth:2,
                scaleLineWidth:10,
                scaleShowLabelBackdrop : true,
                pointLabelFontSize:fontsize,
                pointLabelFontColor : "#000",
                pointLabelFontFamily : "'Microsoft YaHei'"
            }
            var radereDrawing = new Chart(raderechart).Radar(raderedata,radereoption);
        }
    }

})