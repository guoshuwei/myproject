var 
_echart = require('../modules/echart'),
formMod = require('../modules/form'),
dialogUi = require('../modules/dialogUi'),
successCall = null;

function checkShare(){
	if(!EchartData_distribution || EchartData_distribution.length == 0){
		_Fn.alert('您还没有记账，请先前往记账再继续分享！');
		return false;
	}
	if(!EchartData_mobility || EchartData_mobility.length == 0){
		_Fn.alert('您还没有记账，请先前往记账再继续分享！');
		return false;
	}
	var 
	ua = navigator.userAgent,
	agent = ua.toLowerCase(),
	isIE = /msie [\d.]+;/gi ,
	version;

	if(agent.indexOf("msie") > 0){
      version = parseInt((agent.match(isIE)+"").replace(/[^0-9.]/ig,"")); 
      if(parseInt(version) <= 8){
      	_Fn.alert('您的浏览器暂不支持分享功能。建议升级至IE8.0以上版本');
      	return false;
      }
	}
	return true;
}
var mask = function(){
	function createDom() {
        var masker = document.createElement('div'),
        height = $('body').height(),
        width = $('body').width();
        masker.id = 'comment-popup-mask';
        $('body').append(masker);
        $(masker).css({
            width: width,
            height: height,
            background: '#000',
            zIndex: 1000,
            opacity: '.7',
            position: 'fixed',
            top: 0,
            left: 0
        });
    }

      return {
          show: function(html, txt) {

              var ele = document.getElementById('comment-popup-mask');
              if (!ele) {
                  createDom();
              } else {
                  $(ele).show();
              }
          },
          hide: function() {
              $('#comment-popup-mask').remove();
          }
      }		
}(),

shareInvest = function(){
	function create(){
		var html = [];
		html.push('<div id="shareinvest">');
			html.push('<div class="shareinvest-wrap">');
			    html.push('<div class="clearfix bd">');
			        html.push('<div class="inner qt-gl" id="echart-distribution-share"></div>');
			        html.push('<div class="inner qt-gr" id="echart-mobility-share"></div>');
			    html.push('</div>');
			    html.push('<div class="ft clearfix">');
			        html.push('<span>您的数据图正在生成中，请稍候。。。</span>');
			        html.push('<ul class="clearfix"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>');
			        html.push('<em>Loading...</em>');
			    html.push('</div>');
			    html.push('<a class="close"></a>');
			html.push('</div>');
		html.push('</div>');
		$('body').append(html.join(''));
		return $('#shareinvest');
	}

	function run(pop,callback){
		var index = 0;
		var runner = pop.find('.ft ul li');

		function myself(){
			runner.eq(index).addClass('ed');
			index ++ ;

			if(index < 18){
				if(index == 9){
					runTimer = setTimeout(myself,1000);
				}else{
					runTimer = setTimeout(myself,Math.round(Math.random()*500));
				}
			}else if(index == 18){
				callback && callback();
			}

		}

		myself();
	}
	return {
		show : function(callback,runCallback){
			mask.show();
			var pop = create();
			pop.fadeIn(700,function(){
				if(callback){
					callback();
				}
				run(pop,runCallback);
			});
		},
		hide : function(callback){
			var pop = $('#shareinvest');
			pop.fadeOut(400,function(){
				mask.hide();
				pop.remove();
				if(callback){
					callback();
				}
			});
		}
	}
}();



var 
shareInvestDilog,
runTimer,
_echart_distribution_status = false,
_echart_mobility_status = false,
closed = false,
_echart_load_num = 0;

var listenChange = function(ele){
	var parent = ele.parents('.mod-shareinvest');
	var max = parseInt(parent.attr('max'));
	var len = ele.val().length;
	var line = ele.val().split(/\n/).length;

	var min = max - len;

	if(len > 0 ){
		parent.find('.disabled').removeClass('disabled');
	}else{
		parent.find('.submit').addClass('disabled');
	}

	parent.find('.shownum').html(min);
}

$('body')
.on('click','#openshare .close',function(){
	$('#openshare').fadeOut(400,function(){
		mask.hide();
	});
})
.on('click','[role=shareInvest]',function(){
	if(!_Fn.isLogin())return;
	if(!checkShare()) return;
	var that = $(this);
	if(that.attr('data-clock') == 1) return;
	closed = false;
	var content = $(this).parents('.mod-shareinvest').find('textarea').val();
	var uid = $(this).parents('.mod-shareinvest').attr('uid');
	var url = $(this).attr('role-data');
	if($.trim(content) == ''){
		_Fn.alert('内容不能为空，请先输入内容');
		return;
	}
	if($.trim(content).length > 500 || $.trim(content).length < 30){
		_Fn.alert('请输入30-500之间的字符');
		return;
	}
	if($('#openshare').length > 0){
		$('#openshare').hide();
		mask.hide();
	}
	that.attr('data-clock',1);

	function doShare(){
		$.ajax({
			url : url,
			type : 'post',
			dataType : 'json',
			data : {
				base_invest : _echart_distribution_status,
				base_flow : _echart_mobility_status,
				context : content,
				uid : uid ? uid : ""
			},
			success : function(res){
				clearTimeout(runTimer);
				shareInvest.hide(function(){
					that.attr('data-clock',0);
					if(res.code == 200){
			        	_Fn.message('分享成功,2秒后自动刷新');
			        	setTimeout(function(){
			        		window.location.href = window.location.href;
			        	},2000)
			        }else{
			        	_Fn.alert(res.message);
			        }
				});
			}
		})
	}

	if(_echart_load_num == 2){
		shareInvest.show(false,function(){
			if(closed) return;
			doShare();	
		})
		return;
	}
	
	shareInvest.show(function(){

		_echart.init({
			type : 'pie',
			id : document.getElementById('echart-distribution-share'),
			config : {
				name : '平台分布',
				type : 'pie',
				radius : [60, 100],
				data : EchartData_distribution
			}
		},function(myChart){
			setTimeout(function(){
				if(closed) return;
				_echart_distribution_status = myChart.getDataURL('png');
				_echart_load_num = _echart_load_num + 1;
				if(_echart_load_num == 2){
					doShare();
				}
			},3000)
			
		});
		_echart.init({
			type : 'pie',
			id : document.getElementById('echart-mobility-share'),
			config : {
				name : '流动性',
				type : 'pie',
				radius : [60, 100],
				data : EchartData_mobility
			}
		},function(myChart){
			setTimeout(function(){
				if(closed) return;
				_echart_mobility_status = myChart.getDataURL('png');
				_echart_load_num = _echart_load_num + 1;
				if(_echart_load_num == 2){
					doShare();
				}
			},3000)
		});
	});
})
.on('click','[role=openshare]',function(){
	if(!_Fn.isLogin())return;
	if(!checkShare()) return;
	mask.show();
	$('#openshare').fadeIn();
})
.on('click','#shareinvest .close',function(){
	clearTimeout(runTimer);
	closed = true;
	shareInvest.hide();
	$('[role=shareInvest]').attr('data-clock',0);

})
.on('input','.mod-shareinvest textarea',function(){
	var that = $(this);
	listenChange(that);	
})
.on('focus','.mod-shareinvest textarea',function(){
	var that = $(this);
	if(!_Fn.isLogin())return;
})

var _textarea = $('.mod-shareinvest textarea');
if(_textarea[0] && _textarea[0].attachEvent) {
	_textarea[0].attachEvent('onpropertychange',function(e) {
		if(e.propertyName!='value') return;
		$(_textarea[0]).trigger('input');
	});
}


exports.callback = function(callback){
	successCall = callback;
}