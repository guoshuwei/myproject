var
    app = require('./app');

$('body')
    .on('tap','.fn-card',function(){
        if(!_Fn.isLogin())return;
        if(!_Fn.isBind())return;
        var that = $(this),
            pid = that.attr('data-pid'),
            siblings = that.siblings('.ui-card-list-note'),
            doMainbody = that.attr('data-domainbody');
        _Fn.loading().show(that);
        $.ajax({
            url: _Fn.mockServer + '/topic/financialcard',
            type: 'post',
            data: {
                pid: pid
            },
            dataType: 'json',
            success: function(res){
                if(res.code == 200){
                    _Fn.loading().hide();
                    _Fn.alert('领取成功！');
                    that.remove();
                    siblings.after('<a href="//' + doMainbody + '.p2peye.com" class="ui-card-list-btn">领取成功，查看平台档案</a>');
                      
                }else{
                    _Fn.alert(res.message);
                }
            },
            error: function(){
                _Fn.alert('请稍后重试！');
            }
        }) 
    })
    .on('tap','.fn-login-bind',function(){
        if(!_Fn.isLogin())return false;
        if(!_Fn.isBind())return false;
    })

