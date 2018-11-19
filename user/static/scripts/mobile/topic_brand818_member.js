var
    app = require('./app'),
    template = require('../modules/template'),
    tabControl = require('../plugins/tabControl'),
    formMod = require('../modules/form'),
    linkage = require('../modules/linkage'),
    wxReady = require('../modules/jssdk'),
    is_app = $('#is_app').val(),
    invite = $('.fn-invite-btn'),
    picInvite = $('.fn-invite-pic'),
    addressBox = $('.fn-address-box'),
    navItem = $('.ui-nav-item'),
    chanceBox = $('.fn-chance'),
    myawardBox = $('.fn-myaward'),
    uid = $('body').attr('uid'),
    userkey = $('body').attr('userkey'),
    dataUrl = window.location.href,
    vcodeLock = false,
    vcodeNoAjaxLock = 
    hash = location.hash,
    addressFirst = false,
    mylotterylogFirst = false,
    myAwardlogFirst = false,
    giftGet = false,
    inviteLock = false,
    inviteData = null,
    nowTime = $('body').attr('data-nowtime'),
    rankSecondTime = 1505318400,//09-14 00:00:00
    rankfirstTime = 1504368000,//09-03 00:00:00
    tagTime = 1505318400,//09-14 00:00:00
    startTime = 1503417600;//08-23 00:00:00

_Fn.backTop();

if(is_app == 1){
    //'isoapp licaiapp version20170407'
    var _userAgent = navigator.userAgent.toLowerCase();
    var appVLower = true;

    if(window.JSInterface && window.JSInterface.payResult){//andoid licaiApp AndroidApp Version
        var appFlag = 'licaiapp androidapp version';
        if(_userAgent.indexOf(appFlag) > -1){
            var appFlagIndex = _userAgent.indexOf(appFlag)+appFlag.length;
            var banben = _userAgent.substring(appFlagIndex,appFlagIndex+5);
            if(banben > '4.1.4'){
                appVLower = false;
            }
        }
    }else{//iso
        if(_userAgent.indexOf('iosapp') > -1
            && _userAgent.indexOf('licaiapp') > -1){
            var iosbanben = _userAgent.match(/\(iosapp.*Version[\d|\.]*\)/i);
            if(iosbanben[0]){
                iosbanben = iosbanben[0].match(/Version[\d|\.]*/i);
                if(iosbanben[0].indexOf('.') == -1){
                    iosbanben = iosbanben[0].substring(7,iosbanben[0].length);
                    if(iosbanben >= '20170407'){
                        appVLower = false;
                    }
                }
            }
        }
    }
    if(appVLower){
        invite.length > 0 && invite.css({
            'background-color': '#8a8a8a',
            color: '#fff'
        }).text('请更新至新版APP，享受邀请大礼').removeClass('fn-invite-btn');
    }
}

$(window).bind( 'orientationchange', function(e){
    e.stopPropagation();
    e.cancelBubble = true;
    window.location.href = window.location.href;
});

function shareUid(shareUrl,callBack){
    if(is_app == 1){
        var params = {
            "desc":"投资赢奖励翻倍，理财V盛典，翻倍吧！奖励！",
            "title" : "天眼福利日_翻倍吧！奖励 - 网贷天眼",
            "url" : shareUrl,
            "imgUrl" : ''};
        if(!appVLower){
            if(window.JSInterface && window.JSInterface.payResult){//andoid
                window.JSInterface.payResult(JSON.stringify(params));
            }else{//iso
                //navigator.userAgent
                window.webkit.messageHandlers.p2plicaiInviteShare.postMessage(params);
            }
        }
    }else{
        if(!_Fn.isBind())return false;
        _Fn.lightboxWrap()._fadeIn();
        picInvite.show();
        return;
    }
    callBack && callBack();
}
$('body')
    .on('tap','.fn-login-bind',function(){
        if(!_Fn.isLogin())return false;
        if(!_Fn.isBind())return false;
    })
    .on('tap','.fn-invite-btn',function(){
        var shareUrl,
            that = $(this);
        _Fn.loadingMulti().show(that);   
        if(inviteData){
            shareUid(shareUrl);
        }else{
            if(inviteLock)return;
            inviteLock = true;
            $.ajax({
                url: _Fn.mockServer + '/topic/createcode',
                type: 'post',
                dataType: 'json',
                success: function(res){
                    if(res.code == 200){
                        inviteData = res.data.qrcode_url;
                        shareUrl = res.data.source_url;
                        dataUrl = res.data.source_url;
                        $('.fn-alert-code').attr('src',res.data.qrcode_url);
                        shareUid(shareUrl,function(){
                            _Fn.loadingMulti().hide(that);   
                        });
                    }else{
                        _Fn.alert('请稍后刷新重试！');
                        _Fn.loadingMulti().hide(that)
                    }
                    inviteLock = false;
                },
                error: function(){
                    _Fn.loadingMulti().hide(that)
                    inviteLock = false;
                    _Fn.alert('请稍后刷新重试！');
                }
            }) 
        }     
        
    })
    .on('tap','.ui-invite-weixin .bg,.ui-invite-pic-word',function(){
        _Fn.lightboxWrap()._fadeOut();
        picInvite.fadeOut();

    })
    .on('tap','.fn-gift-get',function(){
        var that = $(this),
            ajaxLeval = that.attr('data-leval');

        if(that.hasClass('ui-gift-btnover'))return;
        if(nowTime >= tagTime){
            return _Fn.alert('活动已结束');
        }    
        _Fn.loadingMulti().show(that);    
        if(giftGet)return;
        giftGet = true;
        $.ajax({
            url: _Fn.mockServer + '/topic/badge818',
            type: 'post',
            data: {
                level: ajaxLeval
            },
            dataType: 'json',
            success: function(res){
                _Fn.loadingMulti().hide(that);    
                if(res.code == 200){
                    _Fn.alert('兑换成功，请确认填写收货地址');
                    setTimeout(function(){
                        window.location.reload();
                    },2000);
                    
                }else{
                    _Fn.alert(res.message);
                }
                giftGet = false;
            },
            error: function(){
                _Fn.loadingMulti().hide(that);    
                giftGet = false;
                _Fn.alert('请稍后刷新重试！');
            }
        })

    });

wxReady.init(function(status){
    if(status == 'error'){return;}
    wxReady.share({
        success:function(){
            alert('分享成功');
        },
        link: dataUrl, // 分享链接
    });
})

function getAddress(){
    _Fn.loadingMulti().show(addressBox.find('.ui-loading-box'));
    $.ajax({
        url: _Fn.mockServer + '/topic/getContact',
        type: 'post',
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                if(res.data.is_exist == 1){
                    var content = template.render('addressTpl',res.data);
                    addressBox.html(content);
                    return;
                }else{
                    var content = template.render('addressTpl',res.data);
                    addressBox.html(content); 
                    linkage.init({
                        icons: '<em class="ui-address-more qt-gr"></em>',
                        defaultProvince: '北京',
                        defaultCity: '市辖区',
                        defaultArea: '东城区'
                    })
                }
          
            }else{
                _Fn.alert(res.message);
            }
            _Fn.loadingMulti().hide();
        },
        error: function(){
            _Fn.loadingMulti().hide();
            _Fn.alert('请稍后刷新重试！');
        }
    }) 
}
function getRank(step,callBack){
    var parents = $('.fn-invite-box' + step);
    _Fn.loadingMulti().show(parents);
    $.ajax({
        url: _Fn.mockServer + '/topic/rankliststep',
        type: 'post',
        data: {
            step: step
        },
        dataType: 'json',
        success: function(res){
            _Fn.loadingMulti().hide(parents);
            if(res.code == 200){
                if(res.data.length <= 0)return;
                var content = template.render('inviteTpl',{data: res.data});
                parents.html(content); 
            }else{
                _Fn.alert(res.message);
            }
           
            callBack && callBack();
        },
        error: function(){
            _Fn.loadingMulti().hide(parents);
            _Fn.alert('请稍后刷新重试！');
        }
    })
}
formMod.listen('/topic/goodsreceipt',{
    validSuccess:function(validResutl){
    },
    validError:function(validResutl){
        var item  = validResutl.element;
        if(item.attr('name')=='consignee'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('收件人不能为空！');
            }
        }
        if(item.attr('name')=='province'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('省不能为空！');
            }
        }
        if(item.attr('name')=='city'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('市不能为空！');
            }
        }
        if(item.attr('name')=='county'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('区/县不能为空！');
            }
        }
        if(item.attr('name')=='address'){
            if(validResutl.valid == 'notempty'){
                _Fn.alert('地址不能为空！');
            }
        }
        if(item.attr('name')=='phone'){
            if(validResutl.valid == 'mobile'){
                _Fn.alert('请确认手机号准确无误！')
            }
        }

    },
    cleanup:function(item){
    },
    success:function(result){

        if(result.data.code == 200){

            $('.ui-rules-btn').remove();
            _Fn.alert('保存成功！')

        }else{

            _Fn.alert(result.data.message);

        }

    },
    error:function(){
        _Fn.alert('请稍后刷新重试！');
    }
});

function creatTemplate(obj){
    if(uid < 1)return;
    _Fn.loadingMulti().show(obj.loading.find('.ui-loading-box'));
    $.ajax({
        url: _Fn.mockServer + obj.url,
        type: 'post',
        data: obj.data,
        dataType: 'json',
        success: function(res){
            if(res.code == 200){
                var content = template.render(obj.tpl,{data: res.data});
                obj.parents.html(content);
          
            }else{
                _Fn.alert(res.message);
            }
            _Fn.loadingMulti().hide();
        },
        error: function(){
            _Fn.loadingMulti().hide();
            _Fn.alert('请稍后刷新重试！');
        }
    }) 
}

$('.fn-nav').tabControl({
    hand:'.ui-nav-item',
    handleType:'tap click',
    handCurr:'current',
    targetCurr:'active',
    onOpenBefore: function(hand,target){
        var index = hand.index();
        if(index == 5){
            if(userkey <= 0 && uid <= 0)return;
            if(addressFirst)return;
            addressFirst = true;
            getAddress();
        }else if(index == 2){
            if(userkey <= 0 && uid <= 0)return;
            if(mylotterylogFirst)return;
            mylotterylogFirst = true;
            creatTemplate({
                url: '/topic/mylotterylog',
                data: {
                    topc_type: 13
                },
                tpl: 'chanceTpl',
                parents: chanceBox,
                loading: chanceBox
            })
        }else if(index == 3){
            if(userkey <= 0 && uid <= 0)return;
            if(myAwardlogFirst)return;
            myAwardlogFirst = true;
            creatTemplate({
                url: '/topic/myAwardlog',
                data: {
                    type: '13-14'
                },
                tpl: 'myawardTpl',
                parents: myawardBox,
                loading: myawardBox
            })
        }else if(index == 4){
            if(nowTime < rankfirstTime)return;
            getRank(1);
            if(nowTime < rankSecondTime)return;
            getRank(2);
        }
    }
});

if(hash == "#upgrade"){
    navItem.eq(0).click();
}else if(hash == "#luckdraw"){
    navItem.eq(2).click();
}else if(hash == "#award"){
    navItem.eq(3).click();
}else if(hash == "#luckdrawrule"){
    navItem.eq(1).click();
}else if(hash == "#invation"){
    navItem.eq(4).click();
}else if(hash == "#address"){
    navItem.eq(5).click();
}else{
    navItem.eq(0).click();
}
/*if(nowTime >= tagTime || nowTime < startTime)return;*/
