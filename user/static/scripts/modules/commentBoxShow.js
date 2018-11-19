var template = require('../modules/template'),
    moveFocus = require('../modules/movefocus');
var replayBox = function(){

    var replayBoxHtml = function(data,url){

        data = data.split('|');

        var
            _data = {};
        _data.data = {};

        for(var i = 0 ; i < data.length ; i++){
            var _temp = data[i].split(':');
            _data.data[_temp[0]] = _temp[1];
        }

        _data.url = url;

        var content = template.render('replyTpl',_data);

        return content;
    }

    return {

        show : function(parent,data,url){
            parent.append(replayBoxHtml(data,url));
            var replayBox = parent.find('.reply-box');
            textarea = replayBox.find('textarea');
            rut_width = replayBox.find('div.reply_user_txt').width();

            replayBox.hide().slideDown(600, function() {

                var _textarea = replayBox.find('.reply-textarea');

                _textarea.trigger('focus');
                moveFocus.end(_textarea[0]);

                if(_textarea[0].attachEvent) {
                    _textarea[0].attachEvent('onpropertychange',function(e) {
                        if(e.propertyName!='value') return;
                        $(_textarea[0]).trigger('input');
                    });
                }
            });
        },
        hide : function(target){
            target.slideUp(600,function(){
                target.remove();
            })
        }
    }
}();
$(window).load(function(){
    var judgeOff=1;
    $('body')
        .on('click','[role=comment-reply-judge]',function(){

            var data = $(this).attr('role-data');
            var url = $(this).attr('role-url');
            var floor = $(this).parents('.floor');
            var isFloor = floor.length;
            var replyParent = isFloor ? floor : $(this).parents('.item-wrap');
            var replyButtom = replyParent.find('.reply-box');
            if(replyButtom.length > 0){
                replayBox.hide(replyButtom);
            }else{
                replayBox.show(replyParent,data,url);
                showBox();
            }

        })
        .on('submit','[role=ajaxfrom],[role=validform]',function(){
            if(!_Fn.isLogin()){
                _Fn.alert('请先登录');
                return;
            }
        })
        .on('click','[role=comment-reply]',function(){
            textarea.css('text-indent',"0px");
            showBox();
        })
        function showBox(){
            $('.reply-textarea').on('focus',function(){
                $(this).addClass("focus");
            }).on('blur',function(){
                $(this).removeClass("focus");
            }).on('click',function(){
                if(!_Fn.isLogin()) return;
            }).on('keydown',function(){
                if(!_Fn.isLogin()) return;
            });
        }
        var judgeBox=document.getElementById("comment-username");
        if(judgeBox){
            setTimeout(function(){
                $(".show-box [role=comment-reply-judge]").click();
            },1200);
        }
});