var rightSideBox = $('.right-slidingnav'),//右侧滑动
    rightSideBox1 = $('.right-sliding'),//右侧滑动
    rightSideBox1off=(rightSideBox1.length>0)?true:false,
	mobilePopup = require('../modules/mobile_popup'); //手机版弹出层
$("body")
	.on('tap','#directoryBtn',function(event){
        event.stopPropagation();
        setrightSideBg();
        mobilePopup.showMaskLayer();
        rightSideSlidingIn();
        return false;
    })
    .on('tap','.mask-layer',function(){
        rightSideSlidingOut();
        mobilePopup.fadeOutMaskLayer();
        if(rightSideBox1off&&rightSideBox1.hasClass("right-sliding-in")){
            rightSideBox1.removeClass('right-sliding-in');
            rightSideBox1.addClass('right-sliding-out');

        }
        return false;
    })
    .on('tap','a.ui-directory-item',function(event){
        event.preventDefault();
        window.location.href=$(this).attr("href");
        rightSideSlidingOut();
        mobilePopup.fadeOutMaskLayer();
    });
function setrightSideBg(){ //设置右侧滑出的背景
        var bgEle = rightSideBox.find('.right-sliding-box');
        var h = mobilePopup.maxBodyHeight();
        rightSideBox.css({'height': h});
        bgEle.css({'height': h});
}
function rightSideSlidingIn(){ //右侧滑入
    rightSideBox.removeClass('right-sliding-outnav');
    rightSideBox.addClass('right-sliding-innav');
}
function rightSideSlidingOut(){ //右侧滑出
    rightSideBox.removeClass('right-sliding-innav');
    rightSideBox.addClass('right-sliding-outnav');
}
