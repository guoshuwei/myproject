var
    app = require('./app'),
    template = require('../modules/template'),
    resultEle = $('.ui-result'),
    mobilePopup = require('../modules/mobile_popup'); //手机版弹出层


$('body')
.on('tap','.fn-no',function(){
    var contents = template.render('resultTpl');
    resultEle.html(contents);
    mobilePopup.showMaskLayer();
	mobilePopup.showEle(resultEle);
})
.on('tap','.ui-result-close',function(){
	mobilePopup.hideEle(resultEle);
	mobilePopup.hideMaskLayer();
	resultEle.html('');
})
.on('tap','.fn-have',function(){
	_Fn.fireApp({
	    trigger : 'jumpPlatPage'
	});
});




