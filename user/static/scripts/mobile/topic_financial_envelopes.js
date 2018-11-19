var
    app = require('./app'),
    nowTime = $('body').attr('data-nowtime'),//当前时间戳（php）
    locked = true;

$('body')
    .on('tap','.fn-envelopes-choose',function(){
        if(!_Fn.isLogin())return;
        if(!_Fn.isBind())return;
        if(!locked)return;
        locked = false;
        var that = $(this),
            id = that.attr('data-id'),
            correct = that.attr('data-correct');
            $.ajax({
                url: _Fn.mockServer + '/topic/financialpacket',
                type: 'post',
                data: {
                    correct: correct,
                    id: id
                },
                dataType: 'json',
                success: function(res){
                    locked = true;
                    if(res.code == 200){
                        
                        if(res.data && res.data.award_type == 20){
                            _Fn.alert('手慢了，红包与您擦肩而过！');
                        }else{
                            _Fn.alert('恭喜您获得' + res.data.price + '元现金红包！');
                        }
                        
                    }else if(res.code == 5195){
                        _Fn.alert('本次错误太多啦~冷静一下，下场继续吧！');
                    }else if(res.code == 5194){
                        _Fn.alert('本时段红包已抢完，下场再来！');
                    }else if(res.code == 5193){
                        _Fn.alert('暗号错误，请重新选择！');
                    }else{
                        _Fn.alert(res.message);
                    }
                },
                error: function(){
                    locked = true;
                    _Fn.alert('请稍后重试！');
                }
            })

    })
