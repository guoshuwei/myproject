var
dialogUi = require('../modules/dialogUi'),
template = require('../modules/template'),
$datepicer = require('../plugins/datepic'),
formMod = require('../modules/form'),
animate = require('../modules/animate'),
resultCall = require('../modules/ajaxcodecall');

function getReferer(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function formVaildErrorHandler(validResutl){
    var 
    item  = validResutl.element,
    parent = item.parent();
    parent.addClass('onerror');
}

function formCleanHandler(item){
    var parent = item.parent();
    parent.removeClass('onerror');
}

function formModAjaxBefore(form){
    var submit = form.find('input[type=submit]');
}

var postPhoneDialog;

dialogUi.listen('bind',function(){
    if(!_Fn.isLogin()) return;
	var  content = template.render('bindPostphoneTpl');
    $('.local-bodyer').html(content);
    
})
dialogUi.listen('realname',function(mobile){
    if(!_Fn.isLogin()) return;
    var  content = template.render('verifiedTpl',data);

    $('.local-bodyer').html(content);
    
})


formMod.listen('/user/userBinding',{
    validError:formVaildErrorHandler,
    cleanup:formCleanHandler,
    ajaxBefore : formModAjaxBefore,
    success:function(res){
        res = res.data;
        if(res.code != 200){
            resultCall(res);
        }else{
            var tpl;
            if(res.data.action == 'end'){
                tpl = res.data.current+'endTpl';
                var parmams = getReferer('referer');
                if(parmams){
                    window.location.href = parmams;
                    return;
                }else{
                    window.location.href = '//licai.p2peye.com/';
                    return;
                }
            }else if(res.data.action == 'verified'){
                var parmams = getReferer('referer');
                if(parmams){
                    window.location.href = parmams;
                    return;
                }else{
                    window.location.href = '//licai.p2peye.com/';
                    return;
                }
            }else{
                tpl = res.data.action+'Tpl';
            }
            var content = template.render(tpl,res.data);
            $('.local-bodyer').html(content);
        }
    }
})


function numberDown(ele,time){
    time = time ? time : 60;
    var i = 1;
    function myself(){
        ele.val(time - i + '秒后重新发送');
        i++;
        if(i <= time){
            setTimeout(myself,1000);
        }else{
            ele.val('重新发送验证码');
            ele.removeClass('disabled');
        }
    }

    myself();

}

$('body')
.on('click','.vcode',function(){
    var that = $(this);
    if(that.hasClass('disabled')) return;
    that.addClass('disabled');
    $.ajax({
        url : '/user/userBinding',
        type : 'post',
        dataType : 'json',
        data : {type:'mobile_code'},
        success : function(res){
            if(res.code == 200){
                numberDown(that,res.data.time);
            }else{
                if(res.code == 5112){
                    numberDown(that,res.data.time);
                }else{
                    resultCall(res);
                }
            }
        }
    })
})
