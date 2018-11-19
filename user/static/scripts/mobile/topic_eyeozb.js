
var
	app = require('./app'),
	dialogUi = require('../modules/dialogUi'),
	countDown = require('../modules/countDown'),
    formMod = require('../modules/form'),
	template = require('../modules/template');



var drawing = false;

$('.header')
.on('touchstart','.item',function(){
	$(this).addClass('current');
})
.on('touchend','.item',function(){
	$(this).removeClass('current');
    var index = $(this).index() + 1;
    var top = $('#title'+index).offset().top;
    $(window).scrollTop(top);

})

$('body')
.on('touchstart','.more',function(){
	$(this).addClass('current');
})
.on('touchend','.more',function(){
	$(this).removeClass('current');
})
.on('touchend','.zhuanpan .btn',function(){
    if(!_Fn.isLogin()) return;
    if(!_Fn.isBind()) return;
    var hasNum = parseInt($('.zhuanpan .time span').html());
    if(hasNum == 0){
        alert('请获得更多抽奖机会');
        return;
    }
    turntableDraw(function(){
        $('.zhuanpan .time span').html($('.zhuanpan .time span').html()-1);
    });
})
.on('touchend','.zhuanpan .summary',function(){
    var top = $('#maodian4').offset().top;
    $(window).scrollTop(top);
})
.on('touchend','form .more',function(){
    $(this).parents('form').trigger('submit');
})
.on('touchend','.guessing .tools input',function(){
    if(!_Fn.isLogin()) return;
    if(!_Fn.isBind()) return;
    var that = $(this);
    var ele = {
        bet_result : that.attr('name'),
        m_id : that.parents('.guessing').attr('data-gussingid'),
        m_level : that.parents('.guessing').attr('data-gussinglevel')
    }
    if(window['guessing_'+ele.mid]){
        return;
    }
    window['guessing_'+ele.mid] = true;
    window._Fn.loading().show(that.parents('.match'));
    guessing(ele,that);
})
.on('touchend','.closer',function(){
    setTimeout(function(){
        $('.zhuanpan-alert').remove();
        $('.alert-mask').remove();
    },200)
})
.on('touchend','#zjjl-list .more',function(){
    var page = parseInt($('#zjjl-list').attr('data-page'))+1;
    var i = 0;
    $('#zjjl-list').find('tr').each(function(){
        var that = $(this);
        if(i <= page * 10){
            that.show();

            if(i == $('#zjjl-list').find('tr').length - 1){
                $('#zjjl-list .more').remove();
            }
        }else{
            return;
        }
        i++;
    })
    $('#zjjl-list').attr('data-page',page);
})
.on('touchend','.jb-list dl img',function(){
    if(!_Fn.isLogin()) return;
    if(!_Fn.isBind()) return;
    var parents = $(this).parents('dl');
    var status = parents.attr('class');
    $('.infotools').remove();
    if(status == 'default'){
        var data = parents.attr('data-data');
        if(data == 'jc'){
            var data = {
                btn1:'立即竞猜',
                btn2:'稍后再说',
                content:'猜对本场比赛即可点亮本奖杯',
                type:'jc'

            }
            var __content = template.render('toolsTpl',data);
            $('body').append(__content);
            setTimeout(function(){
                $('.infotools').removeClass('hide');
            },100)
        }else if(data == 'tz'){
            //alert('请访问PC端进行投资');
            var data = {
                btn1:'立即投资',
                btn2:'稍后再说',
                content:'投资2个不同的P2P理财直投专区的合作平台（每笔500元以上）即可点亮本奖杯，投资结果以标的起息时间为准',
                type:'tz'

            }
            var __content = template.render('toolsTpl',data);
            $('body').append(__content);
            setTimeout(function(){
                $('.infotools').removeClass('hide');
            },100)
        }else if(data == 'fx'){
            //$('.sharebox').show();
            var data = {
                btn1:'立即分享',
                btn2:'稍后再说',
                content:'邀请2名好友注册天眼即可点亮本奖杯',
                type:'fx'
            }
            var __content = template.render('toolsTpl',data);
            $('body').append(__content);
            setTimeout(function(){
                $('.infotools').removeClass('hide');
            },100)
        }
    }
})
.on('touchend','.sharebox',function(){
    var that = this;
    setTimeout(function(){
        $(that).hide();
    },250)
})
.on('touchend','.infotools .no',function(){
    setTimeout(function(){
        $('.infotools').addClass('hide');
    },250);
    setTimeout(function(){
        $('.infotools').remove();
    },300);
})

.on('touchend','.infotools .yes',function(){
    $('.infotools').addClass('hide');
    setTimeout(function(){

        var type = $('.infotools').attr('data-type');
        if(type == 'jc'){
            $('.header .item').eq(0).trigger('touchend');
        }
        if(type == 'tz'){
            alert('请访问PC端进行投资');
        }

        if(type == 'fx'){
            $('.sharebox').show();
        }
        $('.infotools').remove();
    },250)
})

function guessing(data,that){
    var match = that.parents('.match');
    $.ajax({
        url : '/topic/matchbet',
        type : 'post',
        data:data,
        dataType :'json',
        success: function(res){
            if(res.code == 200){
                match.find('.tools').remove();
                match.find('.message').remove();
                var html = [];
                html.push('<div class="guessed">');
                html.push('您已支持<span>');
                html.push(res.data.name);
                html.push('</span>');
                if(res.data['img']){
                    html.push('<img src="//m.p2peye.com'+res.data.img+'" />');
                }
                html.push('</div>');
                match.append(html.join(''));
            }
            window._Fn.loading().hide();
            window['guessing_'+data.mid] = false;
        },
        error : function(){

        }
    })
}

function runway(){
	var index = $('.runway .current').index();
	$('.runway .current').removeClass('current');
	if(index == $('.runway li').length - 1){
		$('.runway li').eq(0).addClass('current');
	}else{
		$('.runway li').eq(index+1).addClass('current');
	}

	setTimeout(runway,3000);
}

setTimeout(runway,3000);

countDown.listen(
    $('[role=partytime]'),
    function(){
        window.location.href = window.location.href;
    },
    '/ajax/serverTime',
    function(timeFormart,time){
        timer = timeFormart.split('|')[1].split(',');
        var html = [];
        for(var i = 0 ; i < timer.length ; i++){
            if(i<2){
                continue;
            }
            if(i > 2){
                html.push('<em></em>');
            }
            for(var j = 0 ; j < timer[i].length; j++){
                if(j > 0){
                    html.push('<b></b>');
                }
                html.push('<span>');
                html.push(timer[i][j]);
                html.push('</span>');
            }
        }

        $('[role=partytime]').html(html.join(''));
    }
);
//抽奖函数
function turntableDraw(callback){
    if(drawing) return;
    drawing = true;

    var interval = 100;

    var circle = $('.zhuanpan');

    var index = circle.attr('class').split('-')[1];

    var getDate = false;

    var runcount = 0;

    var target = null;

    var msg = '请稍后再试';

    function prizeCircle(){

        circle.attr('class','zhuanpan current-'+(parseInt(index)));
        var awardid = $('.zhuanpan .item-'+(parseInt(index))).attr('data-id');
        var awardtype = $('.zhuanpan .item-'+(parseInt(index))).attr('data-type');

        index++;

        if(index == 13){
            index = 1;
        }

        runcount++;
        //旋转一圈之后开始进行异步
        if(runcount == 12){
            $.ajax({
                url : '/topic/matchaward',
                type : 'post',
                dataType :'json',
                success: function(res){
                    if(res.code == 200){
                        target = res.data;
                    }else{
                        target = true;
                        msg = res.message;
                    }
                    drawing = false;
                },
                error : function(){
                    target = true;
                    drawing = false;
                }
            })
        }

        if(!target){
            setTimeout(prizeCircle,interval);
        }else{
            if(target['award_type']){
                if(target['award_type'] != 22 && target['award_type'] != 23 && target['award_type'] != 21){
                    if(target['id'] != awardid){
                        setTimeout(prizeCircle,interval);
                    }else{
                        awardSuccessCallback(target);
                    }
                }else{
                    if(target['award_type'] != awardtype){
                        setTimeout(prizeCircle,interval);
                    }else{
                        awardSuccessCallback(target);
                    }
                }
            }else{
                alert(msg);
                window._Fn.loading().hide();
            }
        }

    }

    function awardSuccessCallback(data){
        if(callback){
            callback();
        }
        window._Fn.loading().hide();
        var alertHtml = template.render('alert',data);
        $('body').append(alertHtml);
    }
    window._Fn.loading().show($('.zhuanpan'));
    setTimeout(prizeCircle,interval);

}

function loanCountDown(ele){
    countDown.listen(ele,getLoanDate,'/ajax/serverTime',function(timeFormart,time){
        timer = timeFormart.split('|')[1].split(',');
        var html = [];
        for(var i = 0 ; i < timer.length ; i++){
            if(i<3){
                continue;
            }
            if(i > 3){
                html.push('<em></em>');
            }
            for(var j = 0 ; j < timer[i].length; j++){
                if(j > 0){
                    html.push('<b></b>');
                }
                html.push('<span>');
                html.push(timer[i][j]);
                html.push('</span>');
            }
        }

        ele.html(html.join(''));
    });
}

function getLoanDate(){

    $.ajax({
        url : '/topic/getAjaxKillLoans',
        type : 'post',
        dataType :'json',
        success: function(res){
            if(res.code == 200){
                var localtimer = parseInt($('input[name=localtime]').val());
                $('.tender').each(function(){
                    var key = $(this).attr('data-id');
                    if(res.data[key]){
                        if(res.data[key]['loan']['rate']){
                            var rate = res.data[key].loan.rate;
                            res.data[key].loan.rate = rate.split(".")[0];
                            res.data[key].loan.ratenum = rate.split(".")[1];
                            res.data[key].loan.eyerate = localtimer <= 1467734400 ? 5 : 7;
                        }
                        var html = template.render('tenderTpl',res.data[key]);
                        var that = $(this);
                        that.html(html);

                        loanCountDown($(this).find('.countdown .inner'));
                    }

                })
            }
        },
        error : function(){

        }
    })

}

if($('input[name=isTomorrowMatch]').val() < 2){
    getLoanDate();
}


formMod.listen('/topic/goodsreceipt',{
    validError:function(validResutl){
        var item  = validResutl.element;
        if(item.attr('name')=='consignee'){
            if(validResutl.valid == 'notempty'){
                alert('收货人不能为空');
            }
        }
        if(item.attr('name')=='address'){
            if(validResutl.valid == 'notempty'){
                alert('收货地址不能为空');
            }
        }
    },
    success:function(result){
        if(result.data.code == 200){
                alert('提交成功！');

                window.location.reload();
        }else{

            alert(result.data.message);

        }
    },
    error:function(){
    }
});
