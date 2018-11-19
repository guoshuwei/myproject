$(window).ready(function(){
    var getMoreList = require('../modules/getMoreList'),
        slidernav=require("../modules/index_slidenav");
    getMoreList.init({
        url:'/comchanajax/',
        tpl:'tpl_ptyq_bgjl',
        ajaxtype: 'post',
        data: function(){
            return {pn:parseInt($('.fn-loading').attr('pn'))+1};
        },
        viewport: $('.ptyq_bgjl'),
        successCallback: function(){
            $('.fn-loading').attr('pn', parseInt($('.fn-loading').attr('pn'))+1);
        }
    });
    var navDropDown = require('../modules/mobileIndexNav');//nav下拉框
    navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);
    var swiperparent=$(".swiper-wrapper"),
        swiperindex= 0,//导航默认显示第一个
        swipernav=$("[role-off=nav] .swiper-slide");
    var swiperimg,
        mask=$('.mod-mask'),
        maskimg = mask.find('[role-content="img"]'),
        swiperArr=[],//图片的判断
        picoff=false;//给图片定义高的判断
    if(swiperparent.hasClass('left-senior')){//如果是高管和图片资料从第几个显示
        swiperindex=2
    }else if(swiperparent.hasClass('left-content')){//如果是联系我们从第几个
        swiperindex=3
    }
    if(swipernav.length!=0){
        var swipernav = new Swiper('.swiper-container-nav', { //滑动选项卡
            pagination: '.swiper-pagination',
            freeMode:true,
            freeModeMomentum : false,
            slidesPerView : 4.2,//'auto'
            initialSlide:swiperindex,
            onInit: function(swiper){
            }
        });
    }
    $("body")
    .on('click','[role-touch="pic"]',function(){
        var index= 0,currTxt = $(this).attr('data-role');
        $.each(swiperArr,function(i,txt){//判断应该是第几个图片放大
            if(txt == currTxt){
                index=i;
            }
        });
        swiperimg.slideTo(index,0,false);//切换到第一个slide，速度为0秒
        imgmargintop();
        maskshowhide().show();
        return false;
    })
    .on('click','.mod-mask',function(){
        maskshowhide().hide();
        return false;
    })
    .on('click','[role-content="img"]',function(){
        return false
    })
    if(maskimg.length != 0 ){
        maskimg.each(function(i){
            swiperArr.push($(this).data('role'));
        })
        swiperimg = new Swiper('.swiper-container-img', { //图片左右切换
            pagination: '.swiper-pagination',
            wrapperClass : 'swiper-wrapper-img',
            slideClass : 'swiper-slide-img',
            touchMoveStopPropagation:true,
            freeMode:false,
            freeModeSticky:true,
            onInit: function(swiper){
            }
        });
    }
    //弹层的显示和隐藏
    function maskshowhide(){
        var imgagescale=new Object();
        imgagescale.show=function(){
            mask.css({'z-index':'100','opacity':'1'});
            mask.height('100%');
            return false;
        }
        imgagescale.hide=function(){
            mask.css({'z-index':'-1','opacity':'0'});
            mask.height('0');
            return false;
        }
        return imgagescale;
    };
    //图片的居中
    function imgmargintop(){
        if(picoff)return false;
        maskimg.each(function(i){
            maskimg.eq(i).css('margin-top',-maskimg.eq(i).height()/2+"px");
        });
        picoff=true;
    }


    /**
     * 平台舆情
     * @type {*|jQuery|HTMLElement}
     */
    var $ptyqMod = $('section[log-mod="平台舆情"]');
    if($ptyqMod.length > 0){
        $ptyqMod.click(function(e){
            var t = e.target || e.srcElement,
                $t = $(t);
            var $bgjl_btn_detail = $t.closest('.bgjl_btn_detail');
            if($bgjl_btn_detail.length > 0){
                var $vs = $bgjl_btn_detail.parent().prev().find('.v');
                var $btn = $bgjl_btn_detail.find('.close');
                if($btn.hasClass('open')){
                    $vs.addClass('one_line_ellipsis');
                    $bgjl_btn_detail.html('查看详情<div class="close"></div>');
                }else{
                    $vs.removeClass('one_line_ellipsis');
                    $bgjl_btn_detail.html('收起<div class="close open"></div>');
                }
            }
        });
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