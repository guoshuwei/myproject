
var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    jPages = require('../plugins/jPages.min'),
    province = require('../modules/province'),
    linkage = require('../modules/linkage'),
    tabControl = require('../plugins/tabControl'),
    hash = location.hash,
    _province = provinceList,
    _city = provinceList[0].cityList,
    _county = provinceList[0].cityList[0].areaList,
    index1 = 0,
    index2 = 0,
    index3 = 0,
    myIntegralNumber = null,
    myprizelogNumber = null,
    mylotterylogNumber = null,
    myAwardlogNumber = null,
    dataMyIntegral = false,
    dataMyprizelog = false,
    dataMylotterylog = false,
    dataMyAwardlog = false,
    dataAddress = false,
    nowTime = $('body').attr('data-nowtime'),
    tagTime = 1496246400;//2017-06-01 00:00:00

    if(!_Fn.isLogin())return;
    if(!_Fn.isBind())return;

    $('.ui-record').tabControl({
        hand:'.ui-record-tab-item',
        handleType:'tab click',
        handCurr:'ui-record-tab-item-current',
        targetCurr:'ui-record-table-active'
    });

    if(hash == "#myIntegral"){
        $('.ui-record-tab-item').eq(0).click();
        
    }else if(hash == "#myprizelog"){
        $('.ui-record-tab-item').eq(1).click();
        
    }else if(hash == "#getContact"){
        $('.ui-record-tab-item').eq(4).click();
        
    }else if(hash == "#mylotterylog"){
        $('.ui-record-tab-item').eq(2).click();
        
    }else if(hash == "#myAwardlog"){
        $('.ui-record-tab-item').eq(3).click();
       
    }
    function getIndex(_province,_provinceStr,_provinceStrIndex,callBack){
        i = 0;

        
        if(_province[0].name){
            console.log(_province,33)
            for(i = 0;i < _province.length;i++){
                if(_province[i].name == _provinceStr){
                    _provinceStrIndex = i;
                    callBack && callBack();
                    return _provinceStrIndex;
                }
            }
        }else{
            console.log(_province,44)
            for(i = 0;i < _province.length;i++){
                if(_province[i] == _provinceStr){
                    _provinceStrIndex = i;
                    callBack && callBack();
                    return _provinceStrIndex;
                }
            }
        }
    }
    //获取收货地址
    function getAddress(){
        $.ajax({
            url: _Fn.mockServer + '/topic/getContact',
            type: 'post',
            //data: null,
            dataType: 'json',
            success: function(res){
                if(res.code == 200){
                    
                    dataAddress = true;
                    if(res.data.is_exist == 1){
                        var content = template.render('addressTpl',res.data);
                        $('.fn-address').html(content);
                        return;
                    }else{
                        var content = template.render('addressTpl',res.data);
                        $('.fn-address').html(content);
                        linkage.init({
                            defaultProvince: res.data.province,
                            defaultCity: res.data.city,
                            defaultArea: res.data.county
                        })
                        
                    }
              
                }else{
                    _Fn.alert(res.message);
                }
            },
            error: function(){
                _Fn.alert('请稍后刷新重试！');
            }
        }) 
    }
    

    function getRecord(url,data,tpl,page,dom,id,_var){
        $.ajax({
            url: _Fn.mockServer + url,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(res){
                if(res.code == 200){
                    var content = template.render(tpl,{data:res.data});
                    
                        
                    dom.html(content);
                    if(url == '/topic/myIntegral'){
                        myIntegralNumber = res.data;
                        dataMyIntegral = true;
                    }else if(url == '/topic/myprizelog'){
                        myprizelogNumber = res.data;
                        dataMyprizelog = true;
                    }else if(url == '/topic/mylotterylog'){//机会
                        mylotterylogNumber = res.data;
                        dataMylotterylog = true;
                    }else if(url == '/topic/myAwardlog'){
                        myAwardlogNumber = res.data;
                        dataMyAwardlog = true;
                    }
                    
                    if(res.data.length < 11 || res.data.length == 0 || !res.data)return;
                    page.jPages({
                        containerID : id,
                        previous : "上一页",
                        next : "下一页",
                        perPage : 10,
                        delay : 10,
                        scrollBrowse : false
                    });
                }else{
                    _Fn.alert(res.message);
                }
            },
            error: function(){
                _Fn.alert('请稍后刷新重试！');
            }
        })
    }
    //积分详情
    getRecord('/topic/myIntegral',{type: 2},'recordTpl',$(".fn-record-page"),$('.fn-record'),'record');
    //兑换记录
    getRecord('/topic/myprizelog',null,'prizelistTpl',$(".fn-prizelist-page"),$('.fn-prizelist'),'prizelist');
    //获取收货地址
    getAddress();  
    //抽奖机会2
    getRecord('/topic/mylotterylog',null,'mylotterylogTpl',$(".fn-mylotterylog-page"),$('.fn-mylotterylog'),'mylotterylog');
    //抽奖记录3
    getRecord('/topic/myAwardlog',null,'myawardlogTpl',$(".fn-myawardlog-page"),$('.fn-myawardlog'),'myawardlog');
    
$('body')
    .on('tap','.fn-deadline',function(){
        if(nowTime >= tagTime){
            _Fn.alert('活动已结束！');
        }
    })

    if(nowTime >= tagTime)return false;

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

                $('.fn-record-address-submit').remove();
                _Fn.alert('保存成功！')

            }else{

                _Fn.alert(result.data.message);

            }

        },
        error:function(){
            _Fn.alert('请稍后刷新重试！');
        }
    });
    formMod.listen('/topic/verifycode',{
        validSuccess:function(validResutl){
        },
        validError:function(validResutl){
            var item  = validResutl.element;
            if(item.attr('name')=='code'){
                if(validResutl.valid == 'notempty'){
                    _Fn.alert('兑换码不能为空！')
                }
            }

        },
        cleanup:function(item){
        },
        success:function(result){
            if(result.data.code == 200){

                _Fn.alert('恭喜您，兑换成功!');

                var verifycode = $('.fn-verifycode-box').text() / 1,

                    price = result.data.data.price / 1;

                $('.fn-verifycode-box').text(verifycode + price);

            }else{

                _Fn.alert(result.data.message);

            }
            $('.fn-exchange-text').val('');

        },
        error:function(){
            _Fn.alert('请稍后刷新重试！');
        }
    });







