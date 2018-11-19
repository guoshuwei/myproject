var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    countDown = require('../modules/countDown'),
    formMod = require('../modules/form'),
    bxSlider = require('../plugins/jquery.bxslider.min'),
    jPages = require('../plugins/jPages.min'),
    nowTime = $('body').attr('data-nowtime'),//当前时间戳（php）
    template = require('../modules/template');

//27张拼图样式
$('.sagacity-jigsaw li').eq(0).addClass('oneclass');
$('.sagacity-jigsaw li').eq(1).addClass('twoclass');
$('.sagacity-jigsaw li').eq(2).addClass('threeclass');
$('.sagacity-jigsaw li').eq(3).addClass('fourclass');
$('.sagacity-jigsaw li').eq(4).addClass('fiveclass');
$('.sagacity-jigsaw li').eq(5).addClass('sixclass');
$('.sagacity-jigsaw li').eq(6).addClass('sevenclass');
$('.sagacity-jigsaw li').eq(7).addClass('eightclass');
$('.sagacity-jigsaw li').eq(8).addClass('nineclass');

$('.sagacity-jigsaw li').eq(9).addClass('oneclass');
$('.sagacity-jigsaw li').eq(10).addClass('twoclass');
$('.sagacity-jigsaw li').eq(11).addClass('threeclass');
$('.sagacity-jigsaw li').eq(12).addClass('fourclass');
$('.sagacity-jigsaw li').eq(13).addClass('fiveclass');
$('.sagacity-jigsaw li').eq(14).addClass('sixclass');
$('.sagacity-jigsaw li').eq(15).addClass('sevenclass');
$('.sagacity-jigsaw li').eq(16).addClass('eightclass');
$('.sagacity-jigsaw li').eq(17).addClass('nineclass');

$('.sagacity-jigsaw li').eq(18).addClass('oneclass');
$('.sagacity-jigsaw li').eq(19).addClass('twoclass');
$('.sagacity-jigsaw li').eq(20).addClass('threeclass');
$('.sagacity-jigsaw li').eq(21).addClass('fourclass');
$('.sagacity-jigsaw li').eq(22).addClass('fiveclass');
$('.sagacity-jigsaw li').eq(23).addClass('sixclass');
$('.sagacity-jigsaw li').eq(24).addClass('sevenclass');
$('.sagacity-jigsaw li').eq(25).addClass('eightclass');
$('.sagacity-jigsaw li').eq(26).addClass('nineclass');

//判断是否集齐
$('.success').on('touchend',function(){
    var machinenub = $(this).siblings('.machinenub').val();
    var brilength = $(this).siblings('.sagacity-jigsaw').children('.bright').length;
    var that = $(this);
    if(brilength!=0){
        function doopen(){
            that.siblings('.sagacity-bj').css('display','block');
            that.siblings('.sagacity-lose').css('display','block');
        }
        setTimeout(doopen,200);
        $('.abandon').on('click',function(){
            $(this).parent('.sagacity-lose').css('display','none');
            $(this).parent('.sagacity-lose').siblings('.sagacity-bj').css('display','none');
        })
    }else{
        $.ajax({
            url: '/topic/synthetic',
            type: 'post',
            data: {
                classify: machinenub
            },
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    var data = res.data;
                    that.siblings('.sagacity-success').html(template.render('pintuTpl', {data: data}));
                    that.siblings('.sagacity-bj').css('display','block');
                    that.siblings('.sagacity-success').css('display','block');
                    $('.abandon').on('click',function(){
                        $(this).parent('.sagacity-success').css('display','none');
                        $(this).parent('.sagacity-success').siblings('.sagacity-bj').css('display','none');
                        location.reload();
                    })
                }else{
                    _Fn.alert(res.message);
                }
            }
        })
    }
})