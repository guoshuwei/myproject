var dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    aboutImageFunction = require('../modules/aboutImageFunction'); //关于图片的功能

$('body')
.on('mouseenter','.upload-photo-thumbnail',function(){//查看大图移入
    aboutImageFunction.showThumbnailMask($(this),1);
})
.on('mouseleave','.upload-photo-thumbnail',function(){//查看大图移出
    aboutImageFunction.showThumbnailMask($(this),0);
})
.on('click','.upload-photo-thumbnail',function(){ //点击查看大图点击
    aboutImageFunction.viewLargerImage($(this));
})
.on('click','.cancel',function(){ //取消按钮
    var parents = $(this).parents('.dialog');
    var closeBtn = parents.find('.dialog_close');
    closeBtn.trigger('click');
});

/* 表单验证start */

formMod.listen('guanggao',{
    validError:function(validResutl){ 
        var item  = validResutl.element,
        parent = item.parents('div.row'),
        warning = parent.find('.warning');
        if(item.attr('name')=='name'){
            if(validResutl.valid == 'notempty'){
                warning.html('广告名称不能为空');
                warning.css({'display':'block'});
            }
        }     
    },
    cleanup:function(item){
        var parent = item.parents('div.row'),
        warning = parent.find('.warning');
        warning.css({'display':'none'});
    },
    success:function(result){
        console.log(result);
        //result = $.parseJSON(result.data);
    }
});
