const app = require('../../pc/app'),
    dialogUi = require('../../modules/dialogUi'),
    template = require('../../modules/template'),
    invests = require('../../modules/invests'),
    floatlayer = require('../../modules/floatlayer'),
    jquery_rotate = require('../../plugins/jquery.rotate.min'),
    formMod = require('../../modules/form'),
    jianghujiuji    = require('../../modules/jianghujiuji'),      //江湖救急
    retina = require('../../modules/retina'),
    store = require('../../modules/store').store,
    login = require('../../modules/login'),
    $info_ri = $('.info-ri');

const isIE = !!window.ActiveXObject;
const isIE6 = isIE && !window.XMLHttpRequest;
const isIE8 = isIE && !!document.documentMode;
const isIE7 = isIE && !isIE6 && !isIE8;
const isIELower = isIE6 || isIE7 || isIE8;



/**
 * The page is divided into the left and right sides. When the right height is larger than the left,
 * the left and right height is set to the same height.
 */
/*const  $blockFloatWrap = $('.block-float-wrap');
const $list_bd_ = $('.list-bd'),
    $mod_ri = $('.mod-ri'),
    $block_float = $('.block-float'),
    diff_h = $list_bd_.offset().top - $block_float.offset().top;

function pageSizeInit(){
    if($list_bd_.outerHeight() < $blockFloatWrap.outerHeight()){
        $list_bd_.css('min-height', $blockFloatWrap.outerHeight()-diff_h+'px');
    }
    $mod_ri.removeClass('mod-ri-relative');
}
pageSizeInit();*/


/**
 * the btn of the show or hide rewards.
 */
const $rewards = $('.rewards');
$rewards.mouseenter(() => {
    $info_ri.removeClass('info-ri-close');
    //$rewards_ri.find('span').html('收起');
});

$('.rewards').mouseleave(() => {
    $info_ri.addClass('info-ri-close');
    //$rewards_ri.find('span').html('展开');
});

/**
 * get a random num between min and max
 * @param Min
 * @param Max
 * @returns a random num between min and max
 */
function randomNumBoth(Min,Max){
    const Range = Max - Min;
    const Rand = Math.random();
    const num = Min + Math.round(Rand * Range); //rounding
    return num;
}

/**
 * registration of biding error message dialog win
 */
let reqErrorDialog;
dialogUi.listen('reqError',function($btn){
    reqErrorDialog = this;
    const content = `<div class="jump-reqError">
            <div class="tit"><div><i class="jum-warn"></i>网络异常</div></div>
            <div class="con">如果尝试多次未果，请及时联系客服400-6673-500 ，周一至周日：9:00-21:00</div>
            <div class="btns">
                <a class="jum-retry" href="javascript:void(0);" title="重试">重试</a>
            </div>
        </div>`;
    this.showLightbox = true;
    this.setBox(600,265);
    this.setPos('fixed');
    this.setTitle('提示');
    this.setContent(content);
    //this.setSkin('');
    this.open();
    this.contentTarget.find('.jum-retry').click(function(){
        reqErrorDialog.close();
        ajax_jump($btn);
    });

});

/**
 * registration of message dialog win
 */
dialogUi.listen('alert_tip', function(message){
    const content = '<div class="search-input-tip">'+message+'</div>';
    this.showLightbox = true;
    this.setBox(400,200);
    this.setPos('fixed');
    this.setTitle('提示');
    this.setContent(content);
    this.open();
});

/**
 * get offen doms
 * @type {*|jQuery|HTMLElement}
 */
const $win_binding = $('#pop_win_binding');
const $win_success = $('#pop_win_success');
const $win_failure = $('#pop_win_failure');
const $win_old_user = $('#pop_win_old_user');
let binding_timeout = null;
const min_diff_time = 1000;
const max_diff_time = 2000;
const diff_time = 300;

/**
 * platform infomations
 * @type {*|jQuery|HTMLElement}
 */
const $data = $("#data"),
    id = $data.attr("data-id"),
    through = $data.attr("data-through"),
    bind = $data.attr('data-bind'),
    isZT = $data.attr('data-jumptype'),
    plat_url = $data.data('href'),
    //url="/loans/redirect?"+(through?'through=1':'')+"&t=" + new Date().getTime();
    url="/platform/platformRedirectAjax?"+(through?'through=1&t='+new Date().getTime():'t=' + new Date().getTime());

/**
 * init binging win,before retry.
 */
function init_win_binding(){
    $win_binding.css({display: 'table'}).find('li').hide().find('.hook').hide();
}




/**
 * regist events of binding success win
 */
$win_success.click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);
    if($t.hasClass('btn-cen')){
        store.set('page_anchor', 'loan_list');
        window.location.reload(true);
    }/*else if($t.hasClass('btn-ri')){
        ajax_jump($t);
    }*/
});
/**
 * regist events of binding failure win
 */
$win_failure.click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);
    if($t.hasClass('btn-le')){
        $win_failure.hide();
        ajax_binding();
        return;
    }
    if($t.hasClass('btn-ri')){
        $win_failure.hide();
    }
});
/**
 * regist events of binding old user win
 */
$win_old_user.click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);
    if($t.hasClass('btn-ri')){
        $win_old_user.hide();
    }else if($t.hasClass('btn-le')){
        if($t.hasClass('go-to-binding'))
            ajax_jump($t);
    }
});
/**
 * if user is not binded, then has the one key registration
 */
$('#one_key_registration').click(() => {
    ajax_binding();
});
/**
 * if user is binded and not invest, then jump to the platform
 */
$('#go-to-loan-list').click(e => {
    $('html, body').animate({scrollTop: $list_hd.offset().top});
});
/**
 * if user is binded and invested, then jump to the platform
 */
$('#go-to-platform').click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);
    ajax_jump($t);
});
/**
 * if user has account of the platform, then show the old user win.
 */
$('#direct_binding').click(() => {
    $win_old_user.css({display: 'table'});
});
/**
 * callback of the ajax_binding
 * @param msg request json data
 */
function after_ajax_binding(msg){
    if(msg && msg.code == 200 && msg.data.check_is_new == 1){//new user
        $win_success.find('.pop_win_success_username').text(msg.data.username);
        $win_success.find('.pop_win_success_mobile').text(msg.data.mobile);
        if(isZT == 1){//direct bidding needs to jump to the front page of the other party, and directly skip the front page. There will be no login status. It is necessary to first visit the jump link in iframe to get the login status, then jump to login.
            $('body').append('<iframe style="display:none;" src="'+msg.data.redirect+'"></iframe>');
            $win_success.find('.btn-ri').data('newHref', plat_url).data('newTime',　new Date().getTime());
        }else{
            $win_success.find('.btn-ri').data('newHref', plat_url).data('newTime',　new Date().getTime());
        }
        $win_binding.hide();
        $win_success.css('display', 'table');
    }else if(msg && msg.code == 200 && msg.data.check_is_new == 2){//old user
        $win_binding.hide();
        $win_old_user.css('display', 'table');
        if(isZT == 1){//direct bidding needs to jump to the front page of the other party, and directly skip the front page. There will be no login status. It is necessary to first visit the jump link in iframe to get the login status, then jump to login.
            //$('body').append('<iframe style="display:none;" src="'+msg.data.redirect+'"></iframe>');
            $win_old_user.find('.btn-le').data('newHref', msg.data.redirect).data('newTime',　new Date().getTime());
        }else{
            $win_old_user.find('.btn-le').data('newHref', msg.data.redirect).data('newTime',　new Date().getTime());
        }
    }else if(msg && msg.code == 200 && msg.data.check_is_new == 0){//old user
        $win_binding.hide();
        if(msg.data.platformLimitold == 1){// if the platform is not allow old user biding
            $win_old_user.find('.btn-le').replaceWith('<a class="btn btn-le" href="/platform/">查看更多平台</a>');
            $win_old_user.find('.tit').html('亲爱的，'+$data.data('username')+'。')
            $win_old_user.find('.con-failure').html('您是【'+$data.data('plat')+'】老用户，该平台不支持老用户绑定<br/>很遗憾，该平台暂时不支持已有账号与天眼进行绑定，请您查看其它直投标的');
        }else if(msg.data.platformPrompt){// if the platform is allow old user though special way to go to biding like huarenjinrong, then go to biding.
            $win_old_user.find('.con-failure').html(msg.data.platformPrompt);
        }//if the platform is allow old user biding though normal way, then go to biding.
        $win_old_user.css('display', 'table');
    }else{
        $win_binding.hide();
        $win_failure.css('display', 'table');
    }
    $win_binding.data('requesting', false);
}

/**
 * go to platform logic
 'redirect'=>去平台链接.
 'autoRegister' => 1,
 'check_is_new' => 1,1:新用户 2：老用户
 'username' => 绑定用户昵称。
 */
let loadingInterval;
function ajax_jump($btn){
    //the css effect of jump
    loadingInterval && clearInterval(loadingInterval);
    $btn.html('跳转中<span>.</span><span>.</span><span>.</span>');
    loadingInterval = setInterval(function(){
        let x = $btn.data('x');
        x = x ? (x > 2 ? 0 : x) : 0;
        if(x == 0){
            $btn.children().css('visibility', 'hidden');
        }
        const $dot = $btn.children().eq(x);
        $dot.css('visibility') == 'hidden' ? $dot.css('visibility', 'visible') : $dot.css('visibility', 'hidden');
        $btn.data('x', x+1);
    },400);
    const newHref = $btn.data('newHref'),
        newTime  = $btn.data('newTime');
    if(newHref && (new Date().getTime()-newTime)/1000 < 30){//The jump link is aged for 60 seconds, where it is set to fail if the link is over 30 seconds and rerequests a new effective link.
        window.location.href = newHref;
    }else{//if the url prescription obsolete, then do jump operation
        const requesting = $btn.data('requesting');
        if(requesting){
            return;
        }
        $btn.data('requesting', true);
        $.ajax({
            url: url,
            type: "post",
            dataType: 'json',
            data: "id=" + id,
            success: (msg) => {
                if(msg.code == 200){
                    if(isZT == 1 && msg.data.check_is_new == 1){
                        //direct bidding needs to jump to the front page of the other party, and directly skip the front page. There will be no login status. It is necessary to first visit the jump link in iframe to get the login status, then jump to login.
                        $('body').append(`<iframe style="display:none;" src="${msg.data.redirect}" onload="javascript:setTimeout(function(){window.location.href = '${plat_url}';},100);"></iframe>`);
                        setTimeout(function(){
                            window.location.href = plat_url;
                        },2500);
                    }else
                        window.location.href = msg.data.redirect;
                }else {
                    loadingInterval && clearInterval(loadingInterval);
                    dialogUi.fire('reqError', [$btn]);
                    $btn.text('前往平台').data('requesting', false);
                }
            },
            error: (msg) => {
                loadingInterval && clearInterval(loadingInterval);
                dialogUi.fire('reqError', [$btn]);
                $btn.data('requesting', false).text('前往平台');
            }
        });
    }
}
/**
 * new or old user one key registration logic
 */
function ajax_binding(){
    const requesting = $win_binding.data('requesting');
    if(requesting){
        return;
    }
    let setTimeout_complete = false;
    let ajax_data = null;
    $win_binding.data('requesting', true);
    init_win_binding();
    clearTimeout(binding_timeout);
    const $lis = $win_binding.find('li');
    $lis.eq(0).show();
    binding_timeout = setTimeout(() => {
        $lis.eq(0).find('.hook').show();
        binding_timeout = setTimeout(() => {
            $lis.eq(1).show();
            binding_timeout = setTimeout(() => {
                $lis.eq(1).find('.hook').show();
                binding_timeout = setTimeout(() => {
                    $lis.eq(2).show();
                    binding_timeout = setTimeout(() => {
                        $lis.eq(2).find('.hook').show();
                        binding_timeout = setTimeout(() => {
                            $lis.eq(3).show();
                            binding_timeout = setTimeout(() => {
                                setTimeout_complete = true;
                                if(ajax_data){
                                    $lis.eq(3).find('.hook').show();
                                    binding_timeout = setTimeout(() => {
                                        after_ajax_binding(ajax_data);
                                    }, diff_time);
                                }
                            }, randomNumBoth(min_diff_time, max_diff_time));
                        }, diff_time);
                    }, randomNumBoth(min_diff_time, max_diff_time));
                }, diff_time);
            }, randomNumBoth(min_diff_time, max_diff_time));
        }, diff_time);
    }, randomNumBoth(min_diff_time, max_diff_time));
    $.ajax({
        url: url,
        type: "post",
        dataType: 'json',
        data: "id=" + id,
        success: (msg) => {
            ajax_data = msg;
            if(setTimeout_complete){
                if(msg.code == 200){
                    $lis.eq(3).find('.hook').show();
                    binding_timeout = setTimeout(() => {
                        after_ajax_binding(msg);
                    }, diff_time);
                }else
                    after_ajax_binding(msg);
            }

        },
        error: (msg) => {
            ajax_data = msg || {message: '服务器繁忙，请稍后再试!'};
            if(setTimeout_complete){
                after_ajax_binding(msg);
            }
        }
    });
}


//-------------------------------- platform info2 start ------------------------------------
const $info2 = $('.info2');
$info2.click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);
    if($t.hasClass('nav-item')){
        const idx = $t.index();
        $t.parent().children().removeClass('hov');
        $t.addClass('hov');
        $info2.find('.item').hide().eq(idx).show();

    }
});
//-------------------------------- platform info2 end ------------------------------------


//-------------------------------- platform loans list start ------------------------------------
/**
 * loans list ajax
 */
const $list = $('.list');
const $list_hd = $list.find('.list-hd');
const $list_bd = $list.find('.list-bd');
const $listBtnSorts = $list_hd.find('.list-btn-sort');
const $page_dom = $('.ui-pagenav');


if(store.get('page_anchor') == 'loan_list'){
    setTimeout(()=>{
        $('html, body').animate({scrollTop: $list_hd.offset().top});
    },1000);
    store.remove('page_anchor');
}

/*
$list_bd.mouseover(e => {
    const t = e.target || e.srcElement,
        $t = $(t),
        $list_item = $t.closest('.list-bd-item');
    if($list_item.length > 0){
        const $list_bd_item_details = $list_item.find('.list-bd-item-details');
        $list_bd.find('.list-bd-item-details').each((i, o) => {
            if(o != $list_bd_item_details.get(0)){
                $(o).hide();
            }
        });
        $list_bd_item_details.show();
    }else{
        $list_bd.find('.list-bd-item-details').hide();
    }
}).mouseleave(e => {
    $list_bd.find('.list-bd-item-details').hide();
});
//show table line detail on click
$list_bd.click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);

    if(t.tagName && t.tagName.toLowerCase() != 'a'){
        const $list_bd_item = $t.closest('.list-bd-item');
        if($list_bd_item.length > 0){
            const $list_bd_item_details = $t.closest('.list-bd-item-details');
            if($list_bd_item_details.length == 0){
                const $curr_details = $list_bd_item.children().eq($list_bd_item.children().length - 1);
                if($curr_details.is(':visible')){
                    $list_bd.find('.list-bd-item-details').hide();
                    $curr_details.hide();
                }else{
                    $list_bd.find('.list-bd-item-details').hide();
                    $curr_details.show();
                }
            }
        }
    }
});*/

//search events
$list_hd.click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);
    if($t.hasClass('list-btn-refresh')){
        let pn = 1;
        $page_dom.find('span').each((i, o)=>{
            if(!isNaN($(o).text())){
                pn = parseInt($(o).text());
            }
        });
        let d = 0;
        if($listBtnSorts.eq(0).hasClass('top-blue')){
            d = 2;
        }else if($listBtnSorts.eq(0).hasClass('bot-blue')){
            d = 22;
        }else if($listBtnSorts.eq(1).hasClass('top-blue')){
            d = 3;
        }else if($listBtnSorts.eq(1).hasClass('bot-blue')){
            d = 23;
        }else if($listBtnSorts.eq(2).hasClass('top-blue')){
            d = 5;
        }else if($listBtnSorts.eq(2).hasClass('bot-blue')){
            d = 25;
        }
        ajax_list('refresh', $t, {
            d: d,
            p: pn
        });
        return;
    }
    var $li_item = $t.closest('.list-btn-sort');
    if($li_item.length > 0){//sort
        let d = 0;
        if($listBtnSorts.get(0) == $li_item.get(0)){//expected annualized
            if($li_item.hasClass('top-blue')){
                d = 22;
            }else if($t.find('.bot-blue').length > 0){
                d = 2;
            }else{
                d = 2;
            }
        }else if($listBtnSorts.get(1) == $li_item.get(0)){//invest period
            if($li_item.hasClass('top-blue')){
                d = 23;
            }else if($li_item.hasClass('bot-blue')){
                d = 3;
            }else{
                d = 23;
            }
        }else if($listBtnSorts.get(2) == $li_item.get(0)){//loans progress
            if($li_item.hasClass('top-blue')){
                d = 25;
            }else if($li_item.hasClass('bot-blue')){
                d = 5;
            }else{
                d = 5;
            }
        }
        ajax_list('sort', $li_item, {
            d: d,
            p: 1
        });
        return;
    }
});
$page_dom.click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);
    const pn = $t.attr('pn');
    if(pn){
        let d = 0;
        if($listBtnSorts.eq(0).hasClass('top-blue')){
            d = 2;
        }else if($listBtnSorts.eq(0).hasClass('bot-blue')){
            d = 22;
        }else if($listBtnSorts.eq(1).hasClass('top-blue')){
            d = 3;
        }else if($listBtnSorts.eq(1).hasClass('bot-blue')){
            d = 23;
        }else if($listBtnSorts.eq(2).hasClass('top-blue')){
            d = 5;
        }else if($listBtnSorts.eq(2).hasClass('bot-blue')){
            d = 25;
        }
        ajax_list('page', $t, {
            d: d,
            p: parseInt(pn)
        });
        return;
    }
});


/**
 * @param: //filter conditions
 $select = array(
 'd' => 0,//预期年化 高２　低22   投资期限 高3 低23  投标进度 高5 低25
 );
 * @url: //详情页标分页接口 platform/loanPageAjax
 * @return: {
    "code": 200,
    "message": "成功",
    "data": {
        "more": 1,
        "data": [
            {
                "id": "355592",
                "loan_id": "npsp6377",
                "typid": "1326",
                "cid": "120",
                "name": "存续牛-安逸信A291621o",
                "amount": "55617.00",
                "min_amount": "500.00",
                "up_amount": "10000.00",
                "rate": "10.50",
                "ty_rate": "0.00",
                "start_time": "0",
                "end_time": "1530425658",
                "add_time": "1473732000",
                "release_time": "1499321658",
                "pay_way": "4",
                "period": "12",
                "period_type": "1",
                "reward": "0.00",
                "reward_type": "1",
                "project_type": "8",
                "security_type": "2",
                "cost": "0.00",
                "process": 0,
                "status": "1",
                "rank": "999",
                "is_show": "1",
                "hot_type": "0",
                "is_hot": "0",
                "hot_num": "0",
                "hot_time": "0",
                "hot_end_time": "0",
                "hot_rate_new": null,
                "hot_rate_old": null,
                "is_privilege": "1",
                "update_time": "0",
                "newcomer": "2",
                "is_recommend": "0",
                "is_major": "0",
                "major_rate_new": "0.00",
                "major_rate_old": "0.00",
                "loan_remarks": "",
                "month_period": "12.00",
                "use_card_coupon": "1",
                "max_rate": "0.00",
                "loan_sources": "1",
                "update_process_source": "0",
                "reply_day": "0",
                "appid": "xiaoniuzaixian",
                "cname": "小牛在线",
                "public_key": "jj8dzEr1i6sKKMcOS7gDXFRC",
                "check_reg_url": "//www.xiaoniu88.com/partner/p2peye/check/register",
                "check_login_url": "//www.xiaoniu88.com/partner/p2peye/check/login",
                "check_bind_url": "//www.xiaoniu88.com/partner/p2peye/check/binding",
                "get_trades_url": "",
                "get_loans_url": "",
                "m_check_bind_url": "",
                "m_check_login_url": "",
                "get_loginkey_url": "//www.xiaoniu88.com/partner/p2peye/loginkey",
                "ip1": "59.37.126.71",
                "ip2": "59.37.126.72",
                "ip3": "14.152.90.111",
                "ip4": "14.215.134.60",
                "ip5": "116.7.225.146",
                "is_open": "1",
                "show_h5": "0",
                "ip6": null,
                "ip7": null,
                "ip8": null,
                "ip9": null,
                "ip10": null,
                "domian_body": "xiaoniu88",
                "cpa_floor": "0.00",
                "cpa_new": "200.00",
                "cps_new_day": "2.00",
                "cps_new_month": "2.00",
                "cpa_old": "0.00",
                "cps_old_day": "0.00",
                "cps_old_month": "0.00",
                "risk_status": "1",
                "is_trans_show": "1",
                "account": "-69961.95",
                "major_start_time": "1478534400",
                "major_end_time": "1478620799",
                "fees_way": "0",
                "describe_content": "",
                "h5_show_type": "1",
                "loan_num": "0",
                "min_rate": "0.00",
                "cps_date": "0",
                "new_money": "0.00",
                "company_name": "小牛在线",
                "project_name": "其他",
                "security_name": "平台风险准备金",
                "status_name": "在投",
                "payway_name": "等额本金"
            }
        ]
    }
}
 */

function ajax_list(acType, $btn, params){
    const ajax_list_requesting = $('body').data('ajax_list_requesting');
    if(ajax_list_requesting){
        return;
    }
    $('body').data('ajax_list_requesting', true);
    if(acType == 'refresh'){
        if(isIELower){
            ie8rotate($btn);
        }else{
            $btn.find('img').addClass('requesting');
        }
    }else if(acType == 'sort'){
        $btn.find('.loading').show();
    }else if(acType == 'page'){

    }
    $.ajax({
        url: '/platform/loanPageAjax',
        type: "post",
        dataType: 'json',
        data: {
            pid: $data.data('id'),
            d: params.d,
            p: params.p
        },
        success: (msg) => {
            if(msg.code == 200){
                const targetSrc = [];
                if(msg.data.data && msg.data.data.length > 0){
                    const usermobile = $data.data('user_mobile');
                    const userstatus = $data.data('user_status');
                    const uid = $data.data('uid');
                    for(let i=0;i<msg.data.data.length;i++) {
                        const d = msg.data.data[i];
                        targetSrc.push(
                            `<div class="list-bd-item" style="margin-left: 4%;opacity:0;">
                        <div class="col1" title="${d.name}">${d.name}</div>
                        <div class="col2">${d.rate + '%'}</div>
                        <div class="col3">
                            ${userstatus==4?
                                (d.max_no_first_rate>0?'复投 ':'')+(d.min_no_first_rate>0?d.min_no_first_rate+'% ~ ':'')+(d.max_no_first_rate>0?d.max_no_first_rate+'%':'--'):
                                d.ty_rate>0?'首投 '+(d.min_first_rate>0?d.min_first_rate+'% ~ ':'')+(d.ty_rate>0?d.ty_rate+'%':'--'):
                                    d.max_no_first_rate > 0?'复投 '+(d.min_no_first_rate>0?d.min_no_first_rate+'% ~ ':'')+(d.max_no_first_rate>0?d.max_no_first_rate+'%':'--'):'--'}

                            ${d.raise_rateinfo_show?`<div class="icon">
                                <div class="tip">
                                    <div class="tip-bg"><div class="triangle"></div></div>
                                    <div class="tip-con">
                                        <div class="data">
                                            <div class="block le">
                                                <div class="tit">首 投</div>
                                                ${((d)=>{
                                                    if(d.raise_rateinfo.first_invest && d.raise_rateinfo.first_invest.length > 0){
                                                        let tSrc = [];
                                                        for(let j=0;j<d.raise_rateinfo.first_invest.length;j++){
                                                            const fi = d.raise_rateinfo.first_invest[j];
                                                            tSrc.push(`<div class="item"><div class="amount">${fi.min_amount}元 ≤ 金额 < ${fi.max_amount} 元</div><div class="interest">加息${fi.rate}%</div></div>`);
                                                        }
                                                        return tSrc.join('');
                                                    }else{
                                                        return '<div class="item">此标的暂无加息</div>';
                                                    }
                                                })(d)}
                                            </div>
                                            <div class="block ri">
                                                <div class="tit">复 投</div>
                                                ${((d)=>{
                                                    if(d.raise_rateinfo.duplicate_invest && d.raise_rateinfo.duplicate_invest.length > 0){
                                                        let tSrc = [];
                                                        for(let j=0;j<d.raise_rateinfo.duplicate_invest.length;j++){
                                                            const di = d.raise_rateinfo.duplicate_invest[j];
                                                            tSrc.push(`<div class="item"><div class="amount">${di.min_amount}元 ≤ 金额 < ${di.max_amount} 元</div><div class="interest">加息${di.rate}%</div></div>`);
                                                        }
                                                        return tSrc.join('');
                                                    }else{
                                                        return '<div class="item">此标的暂无加息</div>';
                                                    }
                                                })(d)}
                                            </div>
                                        </div>
                                        <div class="explain">注：加息仅限通过网贷天眼生成平台账户的账号；${userstatus != 4?'首次投资金额需 ≧500元。超出投资限额之外的金额不享受加息奖励。':''}加息奖励在标的起息后发放至您的<span>【账户管理】-【我的奖励】-【直投奖励】</span>中，请注意查收。</div>
                                    </div>
                                </div>
                            </div>`:''}
                        </div>
                        <div class="col4">${d.period + (d.period_type == 1 ? '个月' : '天')}</div>
                        <div class="col5">${d.payway_name}</div>
                        <div class="col6"><div class="percent"><div style="width: ${d.process}%;"></div></div><div class="percent-txt">${d.process}%</div></div>
                        <div class="col7">
                            ${uid?
                                usermobile?'<a href="/loans/jump?pid='+d.typid+'&loan_id='+d.id+'" target="_blank">立即投资</a>':
                                    '<a href="javascript:void(0);" role="dialog" role-api="spacpceMobileSet">立即投资</a>':
                                '<a href="javascript:void(0);" role="dialog" api-event="login">立即投资</a>'
                                }
                        </div>
                    </div>`);
                    }
                    $list_bd.html(targetSrc.join(''));
                    //pageSizeInit();
                    setTimeout(()=>{
                        modSidesFixed();
                        //blockFloatWrapFixed();
                    }, 10);
                    let animate_diff_time = 20;
                    $list_bd.children().each((i, o)=>{
                        setTimeout(()=>{
                            $(o).animate({'margin-left': 0, opacity:1},350);
                        }, animate_diff_time*i);
                    });
                }else{
                    targetSrc.push(`<div class="nodata">
                            <div class="nodata-con">
                                <img src="/styles/images/member/nodata-02.png">
                                <div>此平台暂无标的，去看看其他<a href="/platform">直投平台</a>吧！</div>
                            </div>
                        </div>`);
                    $list_bd.html(targetSrc.join(''));
                }

                $page_dom.html(msg.data.pager || '');
                if(acType == 'refresh'){
                    if(isIELower){

                    }else{
                        $btn.find('img').removeClass('requesting');
                    }
                }else if(acType == 'sort'){
                    $btn.find('.loading').hide();
                    $listBtnSorts.each((i, o) => {
                        if(o != $btn.get(0)){
                            $(o).removeClass('top-blue bot-blue');
                        }
                    });
                    if($btn.hasClass('top-blue')){
                        $btn.removeClass('top-blue').addClass('bot-blue');
                    }else if($btn.hasClass('bot-blue')){
                        $btn.removeClass('bot-blue').addClass('top-blue');
                    }else{
                        if($btn.hasClass('issort-up')){
                            $btn.addClass('bot-blue');
                        }else{
                            $btn.addClass('top-blue');
                        }

                        //$btn.addClass('top-blue');
                    }
                }else if(acType == 'page'){

                }
            }else{
                dialogUi.fire('alert_tip', [msg.message]);
            }
            $('body').data('ajax_list_requesting', false);
        },
        error: () => {
            dialogUi.fire('alert_tip', ['服务器繁忙，请稍后再试!']);
            $('body').data('ajax_list_requesting', false);
        }
    });
}


function ie8rotate($dom){
    if(!$('body').data('ajax_list_requesting')){
        $dom.find('.refresh-icon').stopRotate();
        return;
    }
    $dom.find('.refresh-icon').rotate({
        angle: 0,
        animateTo: -360,
        easing: (a, b, c, d, e) => {
            return - d * b/e;
        },
        callback: ie8rotate.bind(null, $dom)
    });
    /*var d= 0;
    var max = 360;
    var count = 1;
    var animateFun = setInterval(function(){
        var diff = 20;
        var width = 14.0;
        var height = 13.0;
        /!*var dx = -width/2*Math.cos(d)+height/2*Math.sin(d)+width/2;
        var dy = -width/2*Math.sin(d)-height/2*Math.cos(d)+height/2;*!/
        //sizingMethod="auto expand"
        //dx='+dx+',dy='+dy+',
        dom.style.filter = 'progid:DXImageTransform.Microsoft.Matrix(dx='+(-width/2*Math.cos(d)+height/2*Math.sin(d)+width/2)+', dy='+(-width/2*Math.sin(d)-height/2*Math.cos(d)+height/2)+',M11='+Math.cos(d)+',M12='+(Math.sin(d)*-1)+',M21='+Math.sin(d)+',M22='+Math.cos(d)+',SizingMethod="auto expand");';
        //$t.width(height);


        //console.log('progid:DXImageTransform.Microsoft.Matrix(M11='+Math.cos(d)+',M12='+(Math.sin(d)*-1)+',M21='+Math.sin(d)+',M22='+Math.cos(d)+',SizingMethod="auto expand");');
        if(!$('body').data('ajax_list_requesting'))
            clearInterval(animateFun);
        if(d == max) {
            clearInterval(animateFun);
            ie8rotate(dom);
        }
        d += diff;
    }, 10);*/
}
//-------------------------------- platform loans list end ------------------------------------


//-------------------------------- mod scroll fixed start ------------------------------------



/**
 * table head scroll fixed
 */
const modSides = $('.list-hd-wrap'),
    $foot = $('footer.footer'),
    $page_section = $('.page_section'),
    diff_padding_bottom = parseInt($page_section.css('padding-bottom')),
    diff_margin_top = parseInt($page_dom.css('margin-top')),
    $window_ = $(window);
function modSidesFixed(){
    const footTop = $page_dom.offset().top-diff_margin_top;
    const modSidesTop = modSides.parent().offset().top;
    const winTop = $window_.scrollTop();
    const modSidesH_ = modSides.outerHeight();

    if(footTop - winTop <= modSidesH_){
        modSides.removeClass('mod-sides-fixed').addClass('mod-sides-bottom');
    }else if(winTop >= modSidesTop  && !modSides.hasClass('mod-sides-fixed')){
        modSides.removeClass('mod-sides-bottom').addClass('mod-sides-fixed');
    }else if(winTop < modSidesTop && modSides.hasClass('mod-sides-fixed')){
        modSides.removeClass('mod-sides-fixed mod-sides-bottom');
    }
}

/*function blockFloatWrapFixed(){
    const footTop = $foot.offset().top-diff_padding_bottom;
    const blockFloatWrapTop = $blockFloatWrap.parent().offset().top;
    const winTop = $window_.scrollTop();
    const blockFloatWrapH_ = $blockFloatWrap.outerHeight();
    if(footTop - winTop <= blockFloatWrapH_){
        $blockFloatWrap.removeClass('block-float-wrap-fixed').addClass('block-float-wrap-bottom');
    }else if(winTop >= blockFloatWrapTop  && !$blockFloatWrap.hasClass('block-float-wrap-fixed')){
        $blockFloatWrap.removeClass('block-float-wrap-bottom').addClass('block-float-wrap-fixed');
    }else if(winTop < blockFloatWrapTop && $blockFloatWrap.hasClass('block-float-wrap-fixed')){
        $blockFloatWrap.removeClass('block-float-wrap-fixed block-float-wrap-bottom');
    }
}*/

$(window,document).scroll(function(){
    modSidesFixed();
    //blockFloatWrapFixed();
});
modSidesFixed();
//blockFloatWrapFixed();

//-------------------------------- mod scroll fixed end ------------------------------------


//-------------------------------- check password popwin start ------------------------------------
let identifcodeDialog;
dialogUi.listen('identifcode',function(one){ //去平台投标
    if(!_Fn.isLogin()) return false;
    identifcodeDialog = this;
    this.showLightbox = true;
    this.setTitle('请输入您的交易密码');
    this.setBox('auto',265);
    this.setContent(template.render('identifcodeTpl'));
    this.open();
});
//密码可见 start
$('body').on('click','.eye-close',function(){

    $("input[name='showpassword']").val($("input[name='password']").val());

    $('.password-hidden').hide();

    $('.password-show').show().find('input').focus();
    return false;

}).on('mouseup','.eye-open',function(){

    $("input[name='password']").val($("input[name='showpassword']").val());

    $('.password-show').hide();

    $('.password-hidden').show().find('input').focus();

}).on('keyup','input[name="showpassword"]',function(){
    $("input[name='password']").val($("input[name='showpassword']").val());
}).on('keyup','input[name="password"]',function(){
    $("input[name='showpassword']").val($("input[name='password']").val());
});
//密码可见 end

formMod.listen("/loans/correctDirect",{
    ajaxBefore: function(){
        $('.identify-btn').addClass("disabled").val("提交中 ... ");
        //animate.loading().show(currentSubmit);
    },
    //验证错误
    validError:function(validResutl){

        var item  = validResutl.element,
            item_span = item.parents('.form-list-item').find('.error-prompt span');
        if(item.attr('name')=='password'){
            if(validResutl.valid == 'notempty'){
                item_span.html('<i></i>密码不能为空！');
                item_span.show();
            }
        }
        if(item.attr('name')=='showpassword'){
            if(validResutl.valid == 'notempty'){
                item_span.html('<i></i>密码不能为空！');
                item_span.show();
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        $('.error-prompt span').hide();
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.message("密码验证通过！");
            window.location.reload(true);
            /*identifcodeDialog.close();
            ajax_binding();*/
        }else{
            _Fn.alert(res.message);
            //animate.loading().hide();
            $('.identify-btn').removeClass("disabled").val("确定");
        }
    },
    error:function(){
        //animate.loading().hide();
        $('.identify-btn').removeClass("disabled").val("确定");
    }
});

//-------------------------------- check password popwin start ------------------------------------

//-------------------------------- add mobile popwin start ------------------------------------
let spacpceMobileSetDialog;
// 设置天眼手机号
dialogUi.listen('spacpceMobileSet',function(){
    this.showLightbox = true;
    this.setTitle('设置天眼手机号');
    this.setBox(600,280);
    var content = template.render('spacpceMobileSetTpl');
    this.setContent(content);
    spacpceMobileSetDialog = this;
    this.open();
});

// 修改天眼手机号 发送验证码
var numberDown = function(ele,time){
    time = time ? time : 60;
    var i = 1;
    function myself(){
        ele.html(time - i + '秒后重发');
        i++;
        if(i <= time){
            setTimeout(myself,1000);
        }else{
            ele.html('重新获取验证码').removeClass('disabled');
        }
    }
    myself();
};
$("body")
    .on("click","#spacpceMobileSetCode",function(){
        var mobileVal = $("#spacpceMobileSetMoblie").val(),
            that = $(this);
        if(that.hasClass("disabled")){
            return;
        }
        if(!/^(13\d|18\d|15\d|17\d|14\d|19\d|16\d)\d{8}$/.test(mobileVal)){
            _Fn.alert("请输入正确的手机号");
            return;
        }
        that.addClass('disabled');
        $.ajax({
            url : "/spacecp/getmobilecode",
            type : "post",
            data : {
                mobileval : mobileVal,
                type : "settymobile"
            },
            dataType : "json",
            success : function(res){
                if(res.code == 200){
                    _Fn.message("发送成功");
                    numberDown(that,60);
                }else if(res.code == 5112){
                    _Fn.message("验证码发送频繁，请稍后再发");
                    numberDown(that,res.data.time);
                }else{
                    _Fn.alert(res.message);
                }
            },
            error : function(){
                _Fn.alert("您的网络有问题，请稍后再试");
            }
        })
    });




// 设置天眼手机号 表单验证
formMod.listen("/spacecp/setTyMobile",{
    ajaxBefore: function(){
        $("#spacpceMobileSetSubmit").addClass("disabled").val("提交中 ... ");
    },
    //验证错误
    validError:function(validResutl){
        var item  = validResutl.element,
            item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');

        if(item.attr('name')=="mobile"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入手机号').show();
            }else if(validResutl.valid == 'mobile'){
                item_notice.html('<i></i>请输入正确的11位手机号').show();
            }
        }
        if(item.attr('name')=="mobile_code"){
            if(validResutl.valid == 'notempty'){
                item_notice.html('<i></i>请输入验证码').show();
            }
        }
    },
    //操作中清除提示
    cleanup:function(item){
        var item_notice = item.parents('.spacpce-form-center').find('.spacpce-form-error span');
        if(item.attr('name')=='mobile'){
            item_notice.hide();
        }
        if(item.attr('name')=='mobile_code'){
            item_notice.hide();
        }
    },
    success:function(result){
        var res = result.data;
        if(res.code == 200){
            _Fn.message("设置成功！");
            window.location.reload(true);
            /*spacpceMobileSetDialog.close();
            if(spacpceMobileSetDialog.event_source.hasClass('plat-btn'))
                ajax_binding();
            else
                $win_old_user.css({display: 'table'});*/
        }else{
            _Fn.alert(res.message);
            $("#spacpceMobileSetSubmit").removeClass("disabled").val("确定");
        }
    },
    error:function(){
        _Fn.alert("您的网络有故障，请稍后再试");
        $("#spacpceMobileSetSubmit").removeClass("disabled").val("确定");
    }
});


//-------------------------------- add mobile popwin end ------------------------------------