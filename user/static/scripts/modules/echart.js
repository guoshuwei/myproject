window.require.config({
	paths: {
        echarts: '/build/dist'
    }
});
var 
isDOM = ( typeof HTMLElement === 'object' ) ?
    function(obj){
		return obj instanceof HTMLElement;
	} :
    function(obj){
        return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    };


var getData = function(option,callback){
	
	var obj = {
		type : 'post',
		dataType : 'json',
		success : function(res){
			if(res.code == 200){
				callback(res.data.data);
			}
		}
	}

	for(var i in option){
		obj[i] = option[i];
	}


	$.ajax(obj);


}

function changeNum(str){ //转成以万为单位
    var number=(parseInt(str)/10000).toFixed(2);
    return number;
}

var 
resetConfig = function(data,fn){
	var 
	_data = {
		title:'新增借款/待收金额',
	    unit:'万元',
	    start:'75',
	    end:'100'
	}

	for(var i in data.optionReset){
		_data[i] = data.optionReset[i];
	}

	getData(data.ajaxReset,function(ajaxData){

		_data.subtext = ajaxData[0][data.canvasReset.name];

		for(var k = 1; k <= data.canvasReset.arrays.length;k++){
			_data['value'+k] = [];
		}

		_data.date = [];

		for(var j=0;j<ajaxData.length;j++){
			//单位处理{0:不处理,1:万,2:百分比,3:精确到整数,4保留两位小数}
			for(var values = 1 ; values <= data.canvasReset.arrays.length ; values++){
				if(values == 1){
					_data.date.push(ajaxData[j][data.canvasReset.time]);
				}

				_data['value'+values].push(function(){

					var targetValue = ajaxData[j][data.canvasReset.arrays[values - 1]];

					var returnVale;

					switch (data.canvasReset.type){

						case '0' : 
							returnVale = targetValue;
							break;

						case '1' : 
							returnVale = changeNum(targetValue);
							break;

						case '2' : 
							returnVale = (targetValue*100).toFixed(2);
							break;

						case '3' : 
							returnVale = parseInt(targetValue);
							break;

						case '4' : 
							returnVale = targetValue.toFixed(2);
							break;

						default :
							returnVale = targetValue;
					}

					return returnVale;

				}())
			}

		}

		_data.date.reverse();

        for(var k = 1; k <= data.canvasReset.arrays.length;k++){
			_data['value'+k].reverse();
		}


		fn(_data);

	})

}


var 
getOption = function(){

	function getLength(data){
		var flag = 1;
		var num = 0;
		for(var i in data){
			if(data['value'+flag]){
				num ++
				flag++
			}
		}

		return num;
	}

	Array.prototype.max = function() {
		return Math.max.apply({},this)
	}

	return {
		bar : function(data){
			var 

			option = {},

			len = getLength(data),

		    lengendArr = function(){
		        var arr=data.title.split('/');
		        for(var i=0;i<arr.length;i++){
		            arr[i]=arr[i]+'('+data.unit+')';
		        }
		        return arr; 
		    }();

			option.title = {
				text: data.title,
		        subtext: data.subtext
			};

			option.tooltip = {
				trigger: 'axis'
			};

			option.toolbox = {
				show : false
			};

			option.dataZoom = {
				show : true,
		        realtime : true, 
		        start : parseInt(data.start), 
		        end : parseInt(data.end) 
			};

			option.legend = {
		        data:lengendArr
		    };
		    option.xAxis = [
		        {
		        	type : 'category',
		        	data : data.date
		        }
		    ];
		    option.yAxis = [
		        {
		        	type : 'value',
		        	name : data.unit,
		        	axisLabel : {
		                formatter: '{value}'
		        	}
		    	}
		    ];
		    option.series = [];

		    

		    for(var i = 0 ; i < len ; i++){
		    	option.series.push({
		        	name:lengendArr[i],
		        	type:data.stype,
		        	data:data['value'+(i+1)],
		            itemStyle : {
		    			normal: {
			    			color:data.colors[i],
			                barBorderRadius: [5, 5, 0, 0],
							areaStyle : data.areaStyle[i]
			    		} 
			    	}
			    })
		    }

		    return option;
		},

		pie : function(data){
			var 

			option = {};

			option.tooltip = {
		        trigger: 'item',
		        formatter: data.config.formatter || "{a} <br/>{b} : {c} ({d}%)"
		    };
		    option.toolbox = {
		        show : false
		    };

		    option.calculable = false;

		    option.series = [];

		    option.series[0] = {
	            name:data.config.name,
	            type:data.type,
	            selectedMode: 'single',
	            radius : [0, 70],
	            x: '20%',
	            width: '40%',
	            funnelAlign: 'right',
	            itemStyle : {
	                normal : {
	                    label : {
	                        position : 'inner'
	                    },
	                    labelLine : {
	                        show : false
	                    }
	                }
	            },
	            data:[]
	        }
	        option.series[1] = {
	            name : data.config.name,
	            type : 'pie',
	            radius : data.config.radius ? data.config.radius : [100, 140],
	            x : '60%',
	            width : '35%',
	            funnelAlign : 'left',
	            max : function(){
	            	var _maxArr = [];

	            	for(var i=0;i<data.config.data.length;i++){
	            		_maxArr.push(data.config.data[i]['value'])
	            	}

	            	return _maxArr.max();

	            }(),
	            data : data.config.data
	        }

		    return option;
		},

		radar : function(data){
			var 

			option = {};

			option.title = data.config.name;
		    option.tooltip = {
		        trigger: 'axis',
				formatter: function (v) {
					return v[0][3]+': '+ (data.config.count-v[0][2]);
				}


		    };
		    if(data.config.name){
			    option.legend = {
			        x : 'center',
			        data : data.config.name
			    }
			}else{
				option.legend = false;
			}
		    option.calculable = true;
		    option.polar = [{
	            indicator : data.config.indicator,
	            radius : data.config.radius
		        
		    }];
		    if(!data.config.itemStyle){
			    option.series = [
			        {
			            name: '',
			            type: 'radar',
			            itemStyle: {
			                normal: {
			                    areaStyle: {
			                        color:"#87cefb"
			                    },
			                    lineStyle:{
			                    	color : "#ff8b60"
			                    }
			                }
			            },
			            data : data.config.data
			        }
			    ];
		    }else{
		    	option.series = data.config.itemStyle;
		    }
			return option;
		}
	}
}();


return {
	init : function(options,callback){
		var 
		conf = {
			bar : [
				'echarts',
                'echarts/chart/bar'
			],
			pie : [
				'echarts',
				'echarts/chart/pie'
			],
			radar : [
				'echarts',
				'echarts/chart/radar'
			]
		}

		if(!options.type) return;
		if(!options.config) return;
		if(!options.id) return;

		options.id = function(){
			if(options.id instanceof jQuery){
				return options.id[0]
			}

			if(typeof options.id == 'string'){
				return $(options.id)[0];
			}

			if(isDOM(options.id)){
				return options.id;
			}

			return null;
		}();

		if(!options.resetData){
			window.require(
				conf[options.type],
				function (ec) {
					var myChart = ec.init(options.id); 
					var _config = getOption[options.type](options);
					myChart.setOption(_config);
					if(callback){
						callback(myChart);
					}
				}
			)

		}else{

			resetConfig(options.config,function(_data){
				window.require(
					conf[options.type],
					function (ec) {
						var myChart = ec.init(options.id); 
						var _config = getOption[options.type](_data);
						myChart.setOption(_config);
						if(callback){
							callback(myChart);
						}

					}
				)

			});

		}

		


	}
}

