var app=require('./app'),
    navDropDown = require('../modules/mobileIndexNav'),//nav下拉框
    slidernav=require("../modules/index_slidenav"),
    ie678_pollyfill = require('../modules/ie678_pollyfill');


navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);

$('body')
    .on('tap','.section2 .type',function(e) {//网友评分选择
        var t = e.target || e.srcElement,
            $t = $(t),
            $hp = $t.closest('.type-hp'),
            $yiban = $t.closest('.type-yb'),
            $cp = $t.closest('.type-cp');
        if($hp.length > 0 || $yiban.length > 0 || $cp.length > 0){
            var $target = $hp.length > 0 ? $hp : $yiban.length > 0 ? $yiban : $cp.length > 0 ? $cp : null;
            var $type = $target.parent();
            var $txts = $type.find('.txt');
            var $icons = $type.find('.icon');
            $txts.removeClass('txt-hov');
            $icons.removeClass('icon-hov');
            $target.find('.icon').addClass('icon-hov').next().addClass('txt-hov');
        }
    })
    .on('tap','.section2 .tags',function(e) {//网友印象选择
        var t = e.target || e.srcElement,
            $t = $(t);
        if($t.hasClass('tag')){
            if($t.hasClass('tag-useradd')){
                $t.remove();
            }else if($t.hasClass('tag-hov'))
                $t.removeClass('tag-hov');
            else {
                if($t.parent().find('.tag-hov').length == 3){
                    _Fn.alert('最多能添加3个网友印象！');
                    return;
                }else
                    $t.addClass('tag-hov');
            }
        }
    })
    .on('tap','.section2 .impress .btn',function(e) {//网友印象添加自定义
        var t = e.target || e.srcElement,
            $t = $(t),
            $input = $t.prev(),
            val = $.trim($input.val()),
            $tags = $t.parent().prev();
        if(val.length == 0){
            _Fn.alert('请输入网友印象！');
            return;
        }
        if(val.length < 3){
            _Fn.alert('网友印象最少3个字符！');
            return;
        }
        var double = false;
        for(var i=0;i<$tags.children().length;i++){
            var $tag_tmp = $tags.children().eq(i);
            if($tag_tmp.text() == val){
                double = true;
                break;
            }
        }
        if(double){
            _Fn.alert('该网友印象<'+val+'>已经存在列表中！');
            return;
        }

        if($tags.find('.tag-hov').length == 3){
            _Fn.alert('最多能添加3个网友印象！');
            return;
        }

        $tags.append('<div class="tag tag-hov tag-useradd" tagid="0">'+val+'</div>');
        $input.val('');
    })
    .on('tap','.section2 .comment .btn',function(e) {//提交评论按钮
        $('.section2 .comment textarea').blur();
        var $btn = $(this);
        if($btn.data('requesting')){
            return false;
        }
        var comment_level = $('.section2 .type .icon-hov').parent().data('value');
        //5:安全|82:啊啊|0:fff
        var tagdata = '';
        var content = $.trim($('.section2 .comment textarea').val());
        var $tags = $('.section2 .impress .tags .tag-hov');
        for(var i=0;i<$tags.length;i++){
            tagdata += (i > 0 ? '|' : '')+$tags.eq(i).attr('tagid')+':'+$tags.eq(i).text();
        }
        if(content.length < 10){
            _Fn.alert('请输入10-2000个字符的回复内容！');
            return false;
        }
        $btn.data('requesting', true);
        beforeComment();
        $.ajax({
            url : $(this).attr('href'),
            type : 'post',
            dataType : 'json',
            data : {
                comment_level:comment_level,
                tagdata:tagdata,
                content:content
            },
            success : function(res){
                if(res.code == 200){
                    window.location.href = '//'+$('#domain_body').val()+'.p2peye.com/comment/info-'+res.data.id+'.html';
                }else if(res.code == 5199){
                    _Fn.alert(res.message);
                    setTimeout(function(){
                        window.location.href = '//'+$('#domain_body').val()+'.p2peye.com/comment/info-'+res.data.id+'.html';
                    },1000)
                }else{
                    _Fn.alert(res.message);
                    afterComment();
                }
                $btn.data('requesting', false);
            },
            error: function(){
                _Fn.alert('服务器繁忙，请稍后再试！');
                afterComment();
                $btn.data('requesting', false);
            }
        });
        return false;
    })
//提交评论按钮
function beforeComment(){

}
function afterComment(){

}

//网友印象标签只能显示两行处理
var $tags = $('.section2 .impress .tags');
if($tags.children().length > 0){
    var totalH_ = $tags.outerHeight(),
        tagItemH_ = $tags.children().eq(0).outerHeight()+parseInt($tags.children().eq(0).css('margin-bottom').replace('px', '')),
        expectH_ = tagItemH_*2;
    while(totalH_ > expectH_){
        $tags.children().eq($tags.children().length-1).remove();
        totalH_ = $tags.outerHeight();
    }
}

//输入框字数控制逻辑
var $textarea = $('.impress input')/*.keydown(function(e){
    if(e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 39 && $(this).val().length > 6){
        return false;
    }
})*/.keyup(function(e) {
    var currValue = $(this).val();
    if(currValue.length > 7){
        $(this).val(currValue.substring(0, 7));
    }
});

var $inputCount = $('.comment .count');
var $textarea = $('.comment textarea')/*.keydown(function(e){
    if(e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 39 && $(this).val().length > 1999){
        return false;
    }
})*/.keyup(function(e) {
    var currValue = $(this).val();
    if(currValue.length > 2000){
        $(this).val(currValue.substring(0, 2000));
    }
    $inputCount.html((currValue.length > 2000 ? 2000 : currValue.length) + '/2000个字');
});
