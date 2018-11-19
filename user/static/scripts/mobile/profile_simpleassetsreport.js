var
    app = require('./app'),
    _echart = require('../modules/echart');


//echarts
function viewEchart(id,option){  //Echarts图表
    window.require(['echarts', 'echarts/chart/bar', 'echarts/chart/line','echarts/chart/radar','echarts/chart/pie'],
        function (echarts) {
            var myChart = echarts.init(document.getElementById(id));
            if(!myChart){return;}
            myChart.setOption(option);
        }
    )

}
function getsize(){
    var b = {},d, e = window.document,
        f = e.documentElement,
        g = e.querySelector('meta[name="viewport"]'),
        h = e.querySelector('meta[name="flexible"]'),
        i = 0,
        j = 0,
        k = b.flexible || (b.flexible = {});
    if (g) {
        var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        l && (j = parseFloat(l[1]), i = parseInt(1 / j))
    } else if (h) {
        var m = h.getAttribute("content");
        if (m) {
            var n = m.match(/initial\-dpr=([\d\.]+)/),
                o = m.match(/maximum\-dpr=([\d\.]+)/);
            n && (i = parseFloat(n[1]), j = parseFloat((1 / i).toFixed(2))),
            o && (i = parseFloat(o[1]), j = parseFloat((1 / i).toFixed(2)))
        }
    }
    if (!i && !j) {
        var p = (a.navigator.appVersion.match(/android/gi), a.navigator.appVersion.match(/iphone/gi)),
            q = a.devicePixelRatio;
        i = p ? q >= 3 && (!i || i >= 3) ? 3 : q >= 2 && (!i || i >= 2) ? 2 : 1 : 1,
            j = 1 / i
    }
    return i;
}

// 平台分布
function plantbjOption(){ //配置饼图option

    option = {
        color:['#5793f2','#dc567e','#bc3b45','#dd4542','#fc9c36','#fbc633','#d2df59','#66d16b','#42b9a5','#3d91be','#6076e0','#a428be'],
        series: [

            {
                name:'平台背景',
                type:'pie',
                radius: ['20%', '40%'],
                center: ['50%', '50%'],
                data:EchartData_distribution,
                itemStyle: {
                    normal: {
                        label: {
                            textStyle: {
                                fontSize:12*getsize()
                            }
                        },
                        labelLine: {
                            show: true,
                            length:20*getsize()
                        }
                    }
                }
            }
        ]
    };
    return option
}
viewEchart('echart-distribution',plantbjOption());