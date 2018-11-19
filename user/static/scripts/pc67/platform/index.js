const app = require('../../pc/app'),
    dialogUi = require('../../modules/dialogUi'),
    template = require('../../modules/template'),
    floatlayer = require('../../modules/floatlayer'),
    placeholder = require('../../plugins/jquery.placeholder.min');

/**
 * init input place holder and regist enter event
 */
$('.search-input-txt').placeholder().keyup(e => {
    if(e.keyCode == 13){
        let val_ = $.trim($searchInput.val());
        if(val_.length == 0 || val_ == '请输入平台名称/拼音/首字母')
            val_ = '';
        //dialogUi.fire('invalidSearchInput',['请输入平台名称/拼音/首字母！']);
        ajax_list({
            //z: $zongheBtn.hasClass('specail-search-btn-hov') ? 1 : 2,
            z: 1,
            is_show: 1,
            name: val_,
            p: 1
        });
    }
});
//------------------------------button of search box start-------------------------------------
/*dialogUi.listen('invalidSearchInput', function(message){
    const content = '<div class="search-input-tip">'+message+'</div>';
    this.showLightbox = true;
    this.setBox(400,200);
    this.setPos('fixed');
    this.setTitle('提示');
    this.setContent(content);
    this.open();


});*/
/*

//platform list page search
$list = array(
    '综合排序 z=1',
    '最高收益 z=2',
    '暂无标　is_show=1 显示　is_show=0 不显示',
    'input 收索框　name',
    '分页　页数:p'
);
//接口 */
/**
 * offen doms
 * @type {*|jQuery|HTMLElement}
 */
const $checkbox = $('.div-checkbox');
const $zongheBtn = $('.specail-search-btn[data-type="1"]');
const $shouyiBtn = $('.specail-search-btn[data-type="2"]');
//search input
const $searchInput = $('.search-input-txt');
//search btn
const $searchInputBtn = $('.search-input-btn');
//list dom
const $listDom = $('.mod-list');
//page dom
const $pageDom = $('.ui-pagenav');

/**
 * registe pager click event
 */
$pageDom.click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);
    const pn = $t.attr('pn');
    if(pn){
        ajax_list({
            z: $zongheBtn.hasClass('specail-search-btn-hov') ? 1 : 2,
            is_show: $checkbox.hasClass('div-checkbox-selected') ? 0 : 1,
            name: $searchInput.attr('last_search_word') ? $searchInput.attr('last_search_word') : '',
            p: parseInt(pn),
            isPageBtn: true
        });
        return;
    }
});
/**
 * registe search click events
 */
$('.mod-search').click(e => {
    const t = e.target || e.srcElement,
        $t = $(t);

    if($t.hasClass('specail-search-btn')){
        ajax_list({
            z: $t.data('type'),
            is_show: $checkbox.hasClass('div-checkbox-selected') ? 0 : 1,
            name: '',
            p: 1
        });
        return;
    }
    if($t.hasClass('div-checkbox')){
        ajax_list({
            z: $zongheBtn.hasClass('specail-search-btn-hov') ? 1 : 2,
            is_show: $t.hasClass('div-checkbox-selected') ? 1 : 0,
            name: '',
            p: 1
        });
        return;
    }

    if($t.hasClass('search-input-btn')){
        let val_ = $.trim($searchInput.val());
        if(val_.length == 0 || val_ == '请输入平台名称/拼音/首字母')
            val_ = '';
            //dialogUi.fire('invalidSearchInput',['请输入平台名称/拼音/首字母！']);
        ajax_list({
            //z: $zongheBtn.hasClass('specail-search-btn-hov') ? 1 : 2,
            z: 1,
            is_show: 1,
            name: val_,
            p: 1
        });
        return;
    }
});


/**
 * ajax_list
 * @param params
 * @return {
    "code": 200,
    "message": "成功",
    "data": {
        "data": [
            {
                "pid": "3",
                "valid_loan_num": "5",
                "logo": "/static/company/1da5984f83ee42a52db3c243c0366e1b.jpg",
                "interest_rate": "0.01%~15%",
                "min_rate": "0.01%",
                "max_rate": "15%",
                "score": 89,
                "activity": ""
            }
        ],
        "pager": ""
    }
}
 */
/**
 * get data of list asynchronous
 * @param params search params
 */
function ajax_list(params){
    const ajax_list_requesting = $('body').data('ajax_list_requesting');
    if(ajax_list_requesting){
        return;
    }
    $('body').data('ajax_list_requesting', true);
   /* if(type == '1'){

        $t.addClass('specail-search-btn-hov').next().removeClass('specail-search-btn-hov');
    }else{


        $t.addClass('specail-search-btn-hov').prev().removeClass('specail-search-btn-hov');
    }*/

    $.ajax({
        url: '//licai.p2peye.com/platform/kitSearch',
        type: "post",
        dataType: 'json',
        data: {
            z: params.z,
            is_show: params.is_show,
            name: params.name,
            p: params.p
        },
        success: (msg) => {
            if(msg.code){
                const targetSrc = [];
                if(msg.data.data && msg.data.data.length > 0)
                for(let i=0;i<msg.data.data.length;i++){
                    const d = msg.data.data[i];
                    targetSrc.push(`<div class="mod-item">
                            <div class="mod-item-wrap">
                                <div class="item-le">
                                    <div class="item-logo">
                                        <div class="subwrap">
                                            <img class="item-logo-img" src="//www.p2peye.com/${d.logo}"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-cen">
                                    <div class="item-tags">
                                        ${((d)=>{
                                            /*
                                            if(d.has_ty_rate){
                                                if(d.ty_min_rate){
                                                    return `<div class="item-tag">天眼加息${d.ty_min_rate}%~${d.ty_max_rate}%</div>`;
                                                }else{
                                                    return `<div class="item-tag">天眼加息${d.ty_max_rate}%</div>`;
                                                }
                                            }else{
                                                return '';
                                            }*/
                                            if(d.has_first_rate){
                                                if(d.min_first_tyrate){
                                                    return `<div class="item-tag">首投加息${d.min_first_tyrate}%~${d.max_first_tyrate}%</div>`;
                                                }else{
                                                    return `<div class="item-tag">首投加息${d.max_first_tyrate}%</div>`;
                                                }
                                            }else{
                                                return '';
                                            }
                                        })(d)}
                                        ${((d)=>{
                                            if(d.has_duplicate_rate){
                                                if(d.min_no_first_tyrate){ 
                                                    return `<div class="item-tag">复投加息${d.min_no_first_tyrate}%~${d.max_no_first_tyrate}%</div>`;
                                                }else{ 
                                                    return `<div class="item-tag">复投加息${d.max_no_first_tyrate}%</div>`;
                                                }
                                            }else{
                                                return '';
                                            }
                                        })(d)}
                                        <div class="item-tag">直投卡券</div>

                                        ${((d)=>{
                                            const t_src = [];
                                            if(d.activity)
                                            for(let j=0;j<d.activity.length;j++){
                                                t_src.push(`<img class="item-tag" src="//www.p2peye.com${d.activity[j].pic}">`);
                                            }
                                            return t_src.join('');
                                        })(d)}
                                    </div>
                                    <div class="item-detail">
                                        <div class="total">
                                            <span class="key">综合指数<span class="icon">&nbsp;<span>综合平台的最新评级、7日数据、实力背景、活跃度、用户人气，等多个维度指标，得出的分数。分数仅供参考，不构成投资意见。</span></span>:</span><span class="val">${d.score}</span>
                                        </div>
                                        <div class="range">
                                            <span class="key">收益范围:</span><span class="val">${d.interest_rate||''}</span>
                                        </div>
                                        <div class="count">
                                            <span class="key">可投标数量:</span><span class="val">${d.valid_loan_num}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-ri">
                                    <a class="invest" href="//licai.p2peye.com/platform/${d.pid}.html" target="_blank">我要投资</a>
                                </div>
                                ${((d)=>{
                                    if(d.tag_src){
                                        return `<img class="item-corner-icon" src="${d.tag_src}">`;
                                    }else{
                                        return '';
                                    }
                                })(d)}
                            </div>
                        </div>`);
                }else{
                    targetSrc.push(`<div class="nodata">
                        <img src="/styles/images/member/nodata-02.png">
                        <div>暂无该平台活动</div>
                        </div>`);
                }
                $listDom.html(targetSrc.join(''));

                if(params.z == 1){
                    $zongheBtn.addClass('specail-search-btn-hov');
                    $shouyiBtn.removeClass('specail-search-btn-hov');
                }else{
                    $shouyiBtn.addClass('specail-search-btn-hov');
                    $zongheBtn.removeClass('specail-search-btn-hov');
                }
                if(params.is_show){
                    $checkbox.removeClass('div-checkbox-selected');
                }else{
                    $checkbox.addClass('div-checkbox-selected');
                }
                $searchInput.val(params.name);
                $searchInput.attr('last_search_word', params.name);
                $pageDom.html(msg.data.pager || '');

                //if it is the page operation, then scroll to table top
                if(params.isPageBtn){
                    $(window).scrollTop(0);
                }
            }else{
                dialogUi.fire('ajax_list_error', [msg.message]);
            }
            $('body').data('ajax_list_requesting', false);
        },
        error: (msg) => {
            dialogUi.fire('ajax_list_error', ['服务器繁忙，请稍后再试!']);
            $('body').data('ajax_list_requesting', false);
        }
    });
}
/**
 * registe message dialog
 */
dialogUi.listen('ajax_list_error', function(message){
    const content = '<div class="search-input-tip">'+message+'</div>';
    this.showLightbox = true;
    this.setBox(400,200);
    this.setPos('fixed');
    this.setTitle('提示');
    this.setContent(content);
    this.open();
    /*this.contentTarget.find('.jum-retry').click(function(){
     window.location.reload(true);
     });*/

});