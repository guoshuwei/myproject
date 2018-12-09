/**
 *
 * @author: XieJun
 * @e-mail: jununx@qq.com
 * @q    q: 121318538
 * @update: 2015/10/16
 */

$(function(){
    // scrollnav
    var oSubNav = $('.J_SubNav');
    oSubNav.slimscroll({
        color: '#ccc',
        wrapperClass: 'slimScroll-policy',
        width: '190px',
        height: '100%'
    });

    // change nav
    oSubNav.find('dl').on('click', function(){
        var changeClass = 'active';
        $(this).toggleClass(changeClass).siblings().removeClass(changeClass);
    });

    // change nav on
    oSubNav.find('.item').on('click', function(){
        oSubNav.find('.item').removeClass('on');
        $(this).addClass('on');
        return false;
    });

    // handle nav
    function handleSubnav(){
        var oSlimScrollPolicy = $('.slimScroll-policy'),
            iSubnavWidth = 190,
            oContent = $('.J_Content'),
            oSubnavHandle = $('.J_SubnavHandle'),
            bHandle = !0,
            changeClass = 'p-subnav-handle-on';
        oSubnavHandle.on('click', function(){
            if(bHandle){
                oSlimScrollPolicy.animate({
                    width: 0
                }, 200, eHR.calcToTopPosition);
                oContent.animate({
                    marginLeft: 0
                }, 200);
                $(this).addClass(changeClass);
            } else {
                oSlimScrollPolicy.animate({
                    width: iSubnavWidth
                }, 200, eHR.calcToTopPosition);
                oContent.animate({
                    marginLeft: iSubnavWidth
                }, 200);
                $(this).removeClass(changeClass);
            }
            bHandle = !bHandle;
        });
    }
    handleSubnav();

});