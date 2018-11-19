/**
 * Created by yx on 16-9-2.
 */
var
    app = require('./app');

var getCoupon = $('.item.under').find('.get'),
    change = $('.change'),
    flag = false;

    change.on("click",function(){
        var ul = $(this).parents('.day').find('.coupon');
        if(ul.hasClass('hide')){
            ul.removeClass('hide');
            $(this).html("收起&nbsp&nbsp<i class='arrow up'></i>");
        }else{
            ul.addClass('hide');
            $(this).html("展开&nbsp&nbsp<i class='arrow down'></i>");
        }

    });

    getCoupon.on("click",function(){

        if(!_Fn.isLogin()){
            return;
        }
        if(!_Fn.isBind()){
            return;
        }
        var $this=$(this);
        var couData = $this.data('default').split('|');
        var html = [];

        for(var i = 0 ; i < couData.length ; i++){

            var info = couData[i].split(':')[1];
            html.push(info);

        }

        $.ajax({
            url: _Fn.mockServer + '/topic/getCamilo',
            type: 'post',
            data:{
                "time1" : html[0],
                "time2" : html[1],
                "type" : html[2],
                "topic_type" : html[3]
            },
            //async:false,
            dataType: 'json',
            success: function(res){

                if(res.code == 200){

                    $this.parent().removeClass('under').addClass('already');
                      $this.html('<i class="right"></i>已领取');

                }else{

                    window._Fn.alert(res.message);

                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //console.log('error');
            }
        });

    });


