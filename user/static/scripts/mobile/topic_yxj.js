var app = require('./app');
var dialogUi = require('../modules/dialogUi');
var template = require('../modules/template');

function share(obj){
	$('.btn-share').click(function(){		//点击分享按钮出弹层
		var url=$(this).attr('data-url');
		$.ajax({
			type: 'post',
			url: url,
			success: function(res){
			}
		});

		obj.close();
		$('.share-tip').show();
	});
};

/*点击　分享弹层,弹层消失 start*/
$('body').on('click','.share-tip',function(){
	$(this).hide();
});
$('body').on('touchend','.share-tip',function(){
	$(this).hide();
});
/*点击　分享弹层,弹层消失 end*/

//开始拆红包了


$('.btn-open').click(function(){
	var data = $('.btn-open').attr('data');
	if(data == 'no'){
		var url = window.location.href;
		url = '/member/bind?referer='+url;
		window.location.href = url;
	}
	if(data == 'login'){
		_Fn.isLogin();
	}
});


var chance=$('#chance-num').html()-0;

$('.btn-open').click(function(){

	$.ajax({
		type: 'post',
		url: '/topic/yxjOpenCoupon',
		success: function(res){

			var res=res;

			var context='';
			var num='';
			var roleApi='';

			if(res.code==200){              //拆红包成功
				if(res.data.res==1){            //恭喜你中了５块钱
					context=res.data.message;
					num=res.data.amount;
					roleApi='congratulatepop|'+context+','+num;
					$('#congratulate').attr({'role-api':roleApi}).trigger('click');

					if(chance>0){
						chance=chance-1;
						$('#chance-num').html(chance);
					}

				}else if(res.data.res==2){      //机会用完了
					$('#nochance').trigger('click');
				}else if(res.data.res==3){      //红包没有了
					$('#noredbag').trigger('click');
				}else if(res.data.res==4){      //您操作的太快了，请稍事休息
					context=res.data.message;
					roleApi='commontippop|'+context;
					$('#commontip').attr({'role-api':roleApi}).trigger('click');
				}

			}else if(res.code==4100){       //未登录

			}else if(res.code==4108){       //为未绑定

			}else if(res.code==5112){        //非ajax请求
				context=res.message;
				roleApi='commontippop|'+context;
				$('#commontip').attr({'role-api':roleApi}).trigger('click');
			}else if(res.code==5113){       //拆红包失败
				context=res.message;
				roleApi='commontippop|'+context;
				$('#commontip').attr({'role-api':roleApi}).trigger('click');
			}else if(res.code==5113){       //活动已结束
				context=res.message;
				roleApi='commontippop|'+context;
				$('#commontip').attr({'role-api':roleApi}).trigger('click');
			}else if(res.code==5160){       //活动还在筹备中...
				context=res.message;
				roleApi='commontippop|'+context;
				$('#commontip').attr({'role-api':roleApi}).trigger('click');
			}

		}
	});

});

/*恭喜你中奖了弹层 start*/
var congratulateDialog;
dialogUi.listen('congratulatepop',function(context,num){
	var content = template.render('congratulateTpl',{context:context,num:num});
	congratulateDialog = this;

	this.showLightbox = true;
	this.setBox('7.8rem','5.9rem');
	this.setPos('fixed');
	this.setTitle(' ');
	this.setContent(content);
	this.setSkin('yxj-pop');
	this.open();

	share(congratulateDialog);

});
/*恭喜你中奖了弹层 end*/

/*拆红包机会已用完 start*/
var nochanceDialog;
dialogUi.listen('nochancepop',function(){
	var content = template.render('nochanceTpl');
	nochanceDialog = this;

	this.showLightbox = true;
	this.setBox('7.8rem','5.9rem');
	this.setPos('fixed');
	this.setTitle(' ');
	this.setContent(content);
	this.setSkin('yxj-pop');
	this.open();

	share(nochanceDialog);

});
/*拆红包机会已用完 end*/

/*没有红包了 start*/
var noredbagDialog;
dialogUi.listen('noredbagpop',function(){
	var content = template.render('noredbagTpl');
	noredbagDialog = this;

	this.showLightbox = true;
	this.setBox('7.8rem','5.9rem');
	this.setPos('fixed');
	this.setTitle(' ');
	this.setContent(content);
	this.setSkin('yxj-pop');
	this.open();

	share(noredbagDialog);

});
/*没有红包了　end*/

/*拆红包 提示弹层 start*/
var commontippopDialog;
dialogUi.listen('commontippop',function(tip){
	var content = template.render('commontipTpl',{tip:tip});
	commontippopDialog = this;

	this.showLightbox = true;
	this.setBox('7.8rem','2.3rem');
	this.setPos('fixed');
	this.setTitle(' ');
	this.setContent(content);
	this.setSkin('yxj-simpop');
	this.open();

	setTimeout(function(){
		commontippopDialog.close();
	},2200);

});
/*拆红包 提示弹层 end*/

/*顶部文字滚动效果 start*/
function rollText(){
	var oDiv=$('.mod-rolleffect');
	var oUl=oDiv.find('ul');
	var aLi=oUl.find('li');
	var w_div=oDiv.width();
	var w_ul=0;
	var timer=null;
	var bTimer=false;
	var l=0;
	if(oDiv.length == 0) return;

	aLi.each(function(){
		var w_li=$(this).outerWidth()*2;
		w_ul+=w_li;
	});

	if(w_ul<w_div)return;
	oUl.css({'width':w_ul});
	oUl[0].innerHTML=oUl[0].innerHTML+oUl[0].innerHTML;

	rollLeft();
	function rollLeft(){
		if(bTimer)return;
		clearTimeout(timer);
		l--;
		if(Math.abs(l)>=w_ul){
			l=0;
		}
		oUl[0].style.marginLeft=l+'px';
		timer=setTimeout(rollLeft,20);
	}

	$('body').on('touchstart','.mod-rolleffect',function(){
		bTimer=true;
		clearTimeout(timer);
	});

	$('body').on('touchend','.mod-rolleffect',function(){
		bTimer=false;
		clearTimeout(timer);
		timer=setTimeout(rollLeft,20);
	});

};

rollText();
/*顶部文字滚动效果 end*/