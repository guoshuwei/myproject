var last;

$('body').on('click','.fn-select-simulate',function(event){
    event.stopPropagation();
    if(last){
        if(event.currentTarget != last){
            var last_parent = $(last).parents('.fn-select'),
                last_hideEle = last_parent.find('.fn-select-hide');
                last_hideStr = last_hideEle.attr('hide');
                if(last_hideStr){
                    last_parent.removeClass('ui-select-focus');
                    last_hideEle.attr({'hide':'0'});
                    last_hideEle.hide();
                }
        }
    }
    var that = $(event.currentTarget),
        parent = that.parents('.fn-select'),
        hideEle = parent.find('.fn-select-hide'),
        hideStr = hideEle.attr('hide');

    if(!hideEle.length)return;

    if(!hideStr || hideStr == '0'){
        show();
    }else{
        hide();
    }
    function show(){
        parent.addClass('ui-select-focus');
        hideEle.attr({'hide':'1'});
        hideEle.show();
    }
    function hide(){
        parent.removeClass('ui-select-focus');
        hideEle.attr({'hide':'0'});
        hideEle.hide();
    }
    $('body').on('click',function(event){
        hide();
    });
    last = event.currentTarget;
});

