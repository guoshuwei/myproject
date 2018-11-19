$(window).ready(function(){
    var app=require('./app'),
        Swiper = require('../lib/swiper-3.3.1.min'),
        for_app=require('../for_app/index/index'),
        rightSideBox = $('.right-sliding'), //右侧滑动
        mobilePopup = require('../modules/mobile_popup'); //手机版弹出层
    var raderechart=document.getElementById('raderechart');
    var loadingInterval;

    swiper = new Swiper('.swiper-container',{
        pagination: '.swiper-pagination'
    });

    $("body").on('click','[data-touch="member"]',function(){
        window.location.href=$(this).data('url');
        return false;
    })
        //关注
        .on('click', '.header-body-guanzhu', function(){
            if(!_Fn.isLogin()) return false;
            var $this = $(this);
            var $txt = $this.find('.guanzhu_txt');
            var $tip = $this.find('.guanzhu_tip');
            var flag = $txt.html() == '+关注' ? false : true;
            var selfClone = $this.clone(true);
            if($this.data('requesting')){
                return;
            }
            $tip.stop().removeAttr("style");
            if(flag){
                $tip.html('-1');
            }else{
                $tip.html('+1');
            }
            $this.data('requesting', true);
            loadingInterval && clearInterval(loadingInterval);
            $txt.html((flag?'取消中':'关注中')+'<span>.</span><span>.</span><span>.</span>');
            loadingInterval = setInterval(function(){
                var x = $txt.data('x');
                x = x ? (x > 2 ? 0 : x) : 0;
                if(x == 0){
                    $txt.children().css('visibility', 'hidden');
                }
                var $dot = $txt.children().eq(x);
                $dot.css('visibility') == 'hidden' ? $dot.css('visibility', 'visible') : $dot.css('visibility', 'hidden');
                $txt.data('x', x+1);
            },400);
            $.ajax({
                type: 'post',
                url : '/user/follow',
                dataType : 'json',
                success  : function(res){
                    $this.data('requesting', false);
                    loadingInterval && clearInterval(loadingInterval);
                    if(res.code == 200) {
                        $tip.show().animate({
                            top: -parseFloat($tip.css('top').replace('px', ''))*2 +'px',
                            opacity: 0
                        }, 800);
                        if(flag){//取消关注 变成 关注
                            $this.removeClass('yjgz');
                            $txt.html('+关注');
                        }else{//关注 变成 取消关注
                            $this.addClass('yjgz');
                            $txt.html('已关注');
                        }
                    }else{
                        $this.replaceWith(selfClone);
                        _Fn.alert(res.message);
                    }
                },
                error: function(){
                    loadingInterval && clearInterval(loadingInterval);
                    $this.data('requesting', false);
                    $this.replaceWith(selfClone);
                    _Fn.alert('服务器繁忙，请稍后再试！');
                }
            });
        })
        //点评赚奖励
        .on('click','[role=go2comment]',function(){
            if(!_Fn.isLogin()) return false;
            if(!_Fn.certification()) return false;
        })
        //点赞
        .on('click','[role=praise]',function(){
            if(!_Fn.isLogin()) return false;
            var that = $(this);
            var data = function(){
                var data = that.attr('role-data').split('|');
                var _data = {}
                for(var i = 0 ; i < data.length ; i++){
                    var _temp = data[i].split(':');
                    _data[_temp[0]] = _temp[1];
                }
                return _data;
            }();
            var url = that.data('url');
            $.ajax({
                url : url?url:'/User/setPraise',
                type : 'post',
                dataType : 'json',
                data : data,
                success : function(res){
                    /*res = {
                     code: 200,
                     data: {
                     total:10
                     }
                     };*/
                    /*res = {
                     code: 201,
                     message: '你已经点赞过了'
                     };*/
                    if(res.code == 200){//点赞
                        var numi = that.find('.praise-txt');
                        if(numi.text() != '999+'){
                            if(res.data.total>0){
                                numi.html(res.data.total);
                            }else{
                                var total = numi.html() == '点赞' ? 0 : parseInt(numi.html());
                                numi.html(total+1);
                            }
                        }

                        numi.addClass('praise-txt-hov').prev().addClass('praise-icon-hov');
                        var $animateNum = $('<div class="praise-animate-num">+1</div>');
                        that.append($animateNum);
                        setTimeout(function(){
                            $animateNum.addClass('praise-animate-num-uping');
                        },10);
                    }else if(res.code == 4527){//取消点赞
                        /*var numi = that.find('.praise-txt');
                         var total = parseInt(numi.html());
                         numi.html(total-1);*/
                    }else{//已经点赞过了或者点赞失败等其他原因,弹层提示
                        _Fn.alert(res.message);
                    }
                },
                error:function(){
                    _Fn.alert('服务器繁忙，请稍后再试！');
                }
            })
            return false;
        })
        .on('tap','#directoryBtn',function(event){
            event.stopPropagation();
            setrightSideBg();
            mobilePopup.showMaskLayer();
            rightSideSlidingIn();
            return false;
        })
        .on('tap','.mask-layer',function(){
            rightSideSlidingOut();
            mobilePopup.fadeOutMaskLayer();
            return false;
        })
        .on('tap','a.ui-directory-item',function(event){
            event.preventDefault();
            window.location.href=$(this).attr("href");
            rightSideSlidingOut();
            mobilePopup.fadeOutMaskLayer();
        });

        function setrightSideBg(){ //设置右侧滑出的背景
            var bgEle = rightSideBox.find('.right-sliding-box');
            var h = mobilePopup.maxBodyHeight();
            rightSideBox.css({'height': h});
            bgEle.css({'height': h});
        }
        function rightSideSlidingIn(){ //右侧滑入
            rightSideBox.removeClass('right-sliding-out');
            rightSideBox.addClass('right-sliding-in');
        }
        function rightSideSlidingOut(){ //右侧滑出
            rightSideBox.removeClass('right-sliding-in');
            rightSideBox.addClass('right-sliding-out');
        }
        
    if(raderechart) {
        var canvasparent=$("[data-wh=canvas]"),
            rankArr=[],
            titleArr=[],
            canvaswidth=canvasparent.outerWidth(),
            datajson=canvasparent.data('rader'),
            canvasheight=canvasparent.outerHeight();
        raderechart.width=canvaswidth;
        raderechart.height=canvasheight;
        raderechart=raderechart.getContext("2d");
        var fontsize=parseInt(canvasparent.css("font-size"));

        //$.ajax({
        //    type: 'GET',
        //    url: '/shuju?&type=seven_day',
        //    dataType:'json',
        //    success: function(msg){
        //        if(msg.code==200){
        //            var data = msg.data.data;
        //            if(data.length==0){return;}
        //            datajson=data[0];
        //            for(var i in datajson){
        //                if(datajson.hasOwnProperty(i)){
        //                    if(i.indexOf('Rank') > -1 && datajson[i]){
        //                        rankArr.push(datajson[i].value);
        //                        titleArr.push(datajson[i].lable);
        //                    }
        //                }
        //            }
        //            drawRadarEcharts(rankArr,titleArr);
        //        }
        //    }
        //});
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
                    display: true,
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
    if(gdjgt_chart){
        loadGdjgt();
        window.addEventListener('resize', function(event){
            $(gdjgt_chart).empty();
            if(loadGdjgtTimeout){
                clearTimeout(loadGdjgtTimeout);
                loadGdjgtTimeout = null;
            }
            loadGdjgtTimeout = setTimeout(function(){
                loadGdjgt();
            },700);
        });
    }
});
var loadGdjgtTimeout = null;
var gdjgt_chart = document.getElementById('gdjgt_chart');


/**
 * 股东结构图
 */
function loadGdjgt(){
        var flexible = window.lib.flexible
        var fontscale = flexible.dpr;
        var legendW = $(gdjgt_chart).width();
        var legendOuterH = 35*fontscale;
        var legendIconPadding = 2*fontscale;
        var legendIconW = 20*fontscale;
        var legendIconH = 14*fontscale;
        var legendFontSize = 12*fontscale;
        var legendLineH = 24*fontscale;
        var itemGap = 10*fontscale;
        var data = JSON.parse(gdjgt_chart.getAttribute('data'));
        //var targetSrc = '<div id="test___" style="transform: translateX(-50%);position: absolute;top:1300px;left:50%;width: '+(legendW-11*fontscale)+'px;padding: '+5*fontscale+'px '+0*fontscale+'px '+30*fontscale+'px '+11*fontscale+'px;font-size:'+legendFontSize+'px;z-index:10000;background-color:grey;color:#666;white-space:normal;"><div class="clearfix">';
        var targetSrc = '<div id="test___" style="position: absolute;top:-10000px;left:-10000px;width: '+(legendW-11*fontscale)+'px;padding: '+5*fontscale+'px '+0*fontscale+'px '+30*fontscale+'px '+11*fontscale+'px;font-size:'+legendFontSize+'px;z-index:10000;background-color:#fff;color:#fff;white-space:normal;"><div class="clearfix">';
        for(var i=0;i< data.length;i++){
            data[i].legendItemId='legendItemId___'+i;
            targetSrc += '<div id="'+data[i].legendItemId+'" style="float:left;height:'+legendLineH+'px;line-height:'+legendLineH+'px;padding-right:'+itemGap+'px;"><span style="padding: '+legendIconH/2+'px '+(legendIconW/2)+'px '+legendIconH/2+'px '+(legendIconW/2)+'px;"></span>'+data[i].name+'</div>';
        }
        targetSrc += '</div></div>';
        $('#test___').length > 0 && $('#test___').remove();
        $('body').append(targetSrc);

        var newData = [];
        var currLineW = 0;
        var test__W = $('#test___').children().eq(0).width();
        for(var i=0;i< data.length;i++){
            var currLegendW = $('#'+data[i].legendItemId).outerWidth();
            currLineW += currLegendW;
            if(currLineW < test__W){
                newData.push(data[i]);
            }else{
                newData.push('');
                newData.push(data[i]);
                currLineW = currLegendW;
            }
        }

        $(gdjgt_chart).height((flexible.px2rem(200*fontscale+$('#test___').height()))+'rem');
        //var data = JSON.parse(gdjgt_chart.getAttribute('data'));
        window.require.config({
            paths: {
                echarts: '/build/dist'
            }
        });

        var option = {
            "seriesCnt": "3",
            "backgroundColor": "rgba(252,252,252,0)",
            "titleColor": "#666666",
            "subtitleColor": "#999999",
            "textColorShow": false,
            "textColor": "#333",
            "markTextColor": "#ffffff",
            "color": [
                "#3fb1e3",
                "#6be6c1",
                "#626c91",
                "#a0a7e6",
                "#c4ebad",
                "#96dee8"
            ],
            "borderColor": "#ccc",
            "borderWidth": 0,
            "visualMapColor": [
                "#2a99c9",
                "#afe8ff"
            ],
            "legendTextColor": "#999999",
            "kColor": "#e6a0d2",
            "kColor0": "transparent",
            "kBorderColor": "#e6a0d2",
            "kBorderColor0": "#3fb1e3",
            "kBorderWidth": "2",
            "lineWidth": "3",
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "symbolBorderWidth": "2",
            "lineSmooth": false,
            "graphLineWidth": "1",
            "graphLineColor": "#cccccc",
            "mapLabelColor": "#ffffff",
            "mapLabelColorE": "rgb(63,177,227)",
            "mapBorderColor": "#aaaaaa",
            "mapBorderColorE": "#3fb1e3",
            "mapBorderWidth": 0.5,
            "mapBorderWidthE": 1,
            "mapAreaColor": "#eeeeee",
            "mapAreaColorE": "rgba(63,177,227,0.25)",
            "axes": [
                {
                    "type": "all",
                    "name": "通用坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#cccccc",
                    "axisTickShow": false,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#999999",
                    "splitLineShow": true,
                    "splitLineColor": [
                        "#eeeeee"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                },
                {
                    "type": "category",
                    "name": "类目坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#333",
                    "axisTickShow": true,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#333",
                    "splitLineShow": false,
                    "splitLineColor": [
                        "#ccc"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                },
                {
                    "type": "value",
                    "name": "数值坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#333",
                    "axisTickShow": true,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#333",
                    "splitLineShow": true,
                    "splitLineColor": [
                        "#ccc"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                },
                {
                    "type": "log",
                    "name": "对数坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#333",
                    "axisTickShow": true,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#333",
                    "splitLineShow": true,
                    "splitLineColor": [
                        "#ccc"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                },
                {
                    "type": "time",
                    "name": "时间坐标轴",
                    "axisLineShow": true,
                    "axisLineColor": "#333",
                    "axisTickShow": true,
                    "axisTickColor": "#333",
                    "axisLabelShow": true,
                    "axisLabelColor": "#333",
                    "splitLineShow": true,
                    "splitLineColor": [
                        "#ccc"
                    ],
                    "splitAreaShow": false,
                    "splitAreaColor": [
                        "rgba(250,250,250,0.3)",
                        "rgba(200,200,200,0.3)"
                    ]
                }
            ],
            "axisSeperateSetting": false,
            "toolboxColor": "#999999",
            "toolboxEmpasisColor": "#666666",
            "tooltipAxisColor": "#cccccc",
            "tooltipAxisWidth": 1,
            "timelineLineColor": "#626c91",
            "timelineLineWidth": 1,
            "timelineItemColor": "#626c91",
            "timelineItemColorE": "#626c91",
            "timelineCheckColor": "#3fb1e3",
            "timelineCheckBorderColor": "rgba(63,177,227,0.15)",
            "timelineItemBorderWidth": 1,
            "timelineControlColor": "#626c91",
            "timelineControlBorderColor": "#626c91",
            "timelineControlBorderWidth": 0.5,
            "timelineLabelColor": "#626c91",
            "datazoomBackgroundColor": "rgba(255,255,255,0)",
            "datazoomDataColor": "rgba(222,222,222,1)",
            "datazoomFillColor": "rgba(114,230,212,0.25)",
            "datazoomHandleColor": "#cccccc",
            "datazoomHandleWidth": "100",
            "datazoomLabelColor": "#999999",


            center : ['50%', '50%'],    // 默认全局居中
            radius : [0, '75%'],
            clockWise : false,          // 默认逆时针
            startAngle: 90,
            minAngle: 0,                // 最小角度改为0
            selectedOffset: 10,         // 选中是扇区偏移量
            itemStyle: {
                normal: {
                    // color: 各异,
                    borderColor: '#fff',
                    borderWidth: 1,
                    label: {
                        show: true,
                        position: 'outer'
                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    labelLine: {
                        show: true,
                        length: 20,
                        lineStyle: {
                            // color: 各异,
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                emphasis: {
                    // color: 各异,
                    borderColor: 'rgba(0,0,0,0)',
                    borderWidth: 1,
                    label: {
                        show: false
                        // position: 'outer'
                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    labelLine: {
                        show: false,
                        length: 20,
                        lineStyle: {
                            // color: 各异,
                            width: 1,
                            type: 'solid'
                        }
                    }
                }
            },
            legend: {
                orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                           // 'horizontal' | 'vertical'
                x: 'left',               // 水平安放位置，默认为全图居中，可选为：
                // 'center' | 'left' | 'right'
                // | {number}（x坐标，单位px）
                y: 'bottom',                  // 垂直安放位置，默认为全图顶端，可选为：
                // 'top' | 'bottom' | 'center'
                // | {number}（y坐标，单位px）
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#ccc',       // 图例边框颜色
                borderWidth: 0,            // 图例边框线宽，单位px，默认为0（无边框）
                padding: [5*fontscale,5*fontscale,5*fontscale,5*fontscale],                // 图例内边距，单位px，默认各方向内边距为5，
                // 接受数组分别设定上右下左边距，同css
                itemGap: itemGap,               // 各个item之间的间隔，单位px，默认为10，
                // 横向布局时为水平间隔，纵向布局时为纵向间隔
                itemWidth: legendIconW,             // 图例图形宽度
                itemHeight: legendIconH,            // 图例图形高度
                textStyle: {
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
                    fontSize:legendFontSize,
                    color: '#666'          // 图例文字颜色
                },
                data: newData
            },
            //color:['rgb(255, 99, 132)', 'rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
            /*title : {
             text: '饼图'
             },*/
            tooltip : {
                show: false,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },/*
             legend: {
             orient : 'vertical',
             x : 'right',
             data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
             },*/
            series : [
                {
                    name:'股东信息',
                    type:'pie',
                    selectedMode: 'single',
                    center : ['50%', (105*fontscale)+'px'],    // 默认全局居中
                    radius : [0, (60*fontscale)+'px'],
                    data:data,
                    itemStyle: {
                        normal: {
                            label: {
                                textStyle: {
                                    // 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                                    fontSize:12*fontscale,
                                    fontFamily: 'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif'
                                },
                                formatter: function(record){
                                    return record.data.label;
                                }
                            },
                            labelLine: {
                                show: true,
                                length:20*fontscale
                            }
                        }
                    }
                }
            ],
            animation: true
        };

        window.require(['echarts', 'echarts/chart/bar', 'echarts/chart/line','echarts/chart/radar','echarts/chart/pie'],
            function (echarts) {
                var myChart = echarts.init(gdjgt_chart);
                if(!myChart){return;}
                myChart.setOption(option);
            }
        )
}