var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    jPages = require('../plugins/jPages.min'),
    province = require('../modules/province'),
    linkage = require('../modules/linkage'),
    provinceVal = $("#province").val(),
    cityVal = $("#city").val(),
    countyVal = $("#county").val();

provinceVal = provinceVal ? provinceVal : "北京";
cityVal = cityVal ? cityVal : "市辖区";
countyVal = countyVal ? countyVal : "东城区";

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

linkage.init({
    defaultProvince : provinceVal,
    defaultCity : cityVal,
    defaultArea : countyVal
});


formMod.listen('address',{
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
            _Fn.alert('保存成功！');
            setTimeout(function(){
                window.location.href = "/spacecp/shippingaddress"
            },1000)
        }else{
            _Fn.alert(result.data.message);
        }
    },
    error:function(){
        _Fn.alert('请稍后刷新重试！');
    }
});

