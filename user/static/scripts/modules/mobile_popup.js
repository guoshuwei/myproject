var
    $win = $(window),
    winWidth = $win.width(),
    winHeight = $win.height(),
    bodyHeight = $('body').outerHeight(true),
    doctHeight = $(document).height(),
    scrollTop = $win.scrollTop(),
    hasMaskLayer = function(){
        var len = $('.mask-layer').length;
        if (len > 0) return $('.mask-layer');
        return false;
    },
    hasPromptBox = function(){
        var len = $('.prompt-message').length;
        if (len > 0) return $('.prompt-message');
        return false;
    };
exports.maxBodyHeight = function(){
    var height = Math.max(bodyHeight,doctHeight);
    var h = Math.max(height,winHeight);
    $('body').css({'height':h});
    return h;
};
exports.showMaskLayer = function(){
    var masklayer;

    if(!hasMaskLayer()){
        masklayer = $('<div>',{'class':'mask-layer'});
        $('body').append(masklayer);
    }else{
        masklayer = hasMaskLayer();
    }
    var w = winWidth;
    var height = Math.max(bodyHeight,doctHeight);
    var h = Math.max(height,winHeight);

    masklayer.css({
        'width' : w,
        'height' : h
    });

    masklayer.show();
};
exports.hideMaskLayer = function(){
    var masklayer = hasMaskLayer();
    masklayer.hide();
    $('body').css({'height':'auto'});
};
exports.fadeOutMaskLayer = function(){
    var masklayer = hasMaskLayer();
    masklayer.fadeOut();
    $('body').css({'height':'auto'});
};
exports.showPromptMessage = function(message){
    var promptBox,l,t;

    if(!hasPromptBox()){
        promptBox = $('<div>',{'class':'prompt-message'});
        $('body').append(promptBox);
    }else{
        promptBox = hasPromptBox();
    }
    promptBox.html(message);
    l = promptBox.outerWidth()/2;
    t = promptBox.outerHeight()/2;

    promptBox.css({'margin-left':-l,'margin-top':-t});
    promptBox.show();

    setTimeout(function(){
        promptBox.hide();
    },3000);

};
exports.hidePromptMessage = function(){
    var promptBox = hasPromptBox();
    promptBox.hide();
};
exports.showEle = function(ele){
    ele.show();
};
exports.hideEle = function(ele){
    ele.hide();
};









