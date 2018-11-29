var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    province = require('../modules/province'),
    formMod = require('../modules/form'),
    currentSubmit = $("#currentSubmit"),
    animate = require('../modules/animate'),
    datajson=$("form.address-form").serialize(),
    floatlayer = require('../modules/floatlayer');
var getprovince = $('.getprovince').val();
if(getprovince==null){
    getprovince='北京'
};
var getcity = $('.getcity').val();
if(getcity==null){
    getcity= '市辖区'
};
var getcounty = $('.getcounty').val();
if(getcounty==null){
    getcounty = '东城区'
};
province.init('cmbProvince', 'cmbCity', 'cmbArea',getprovince,getcity,getcounty,1);

//收货地址表单验证
formMod.listen('address.php',{
    ajaxBefore:function(){

    },
    validSuccess:function(validResutl){    },
    validError:function(validResutl){
        var item  = validResutl.element;
        var prompt = item.parents('[role-prompt=address]').find('[role-prompt=info]');
        var promptText = prompt.find('span');
        prompt.show();
        if(item.attr('name')=='consignee'){
            if(validResutl.valid == 'notempty'){
                promptText.html('收件人不能为空！');
            }
        }
        if(item.attr('name')=='address'){
            if(validResutl.valid == 'notempty'){
                promptText.html('地址不能为空！');
            }
        }
        if(item.attr('name')=='phone'){
            if(validResutl.valid == 'mobile'){
                promptText.html('请确认手机号准确无误！');
            }
        }

    },
    cleanup:function(item){

        $('[role-prompt=info]').hide();

    },
    success:function(result){

        var res = result.data;
        if(res.code == 200){
            window.location.href = res.data.url;
        }else{
            _Fn.alert(res.message);

        }
    },
    error:function(){
        window._Fn.alert("网络异常,请稍后刷新重试");
    }

});