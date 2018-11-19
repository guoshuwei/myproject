var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    formMod = require('../modules/form'),
    jPages = require('../plugins/jPages.min'),
    tabControl = require('../plugins/tabControl'),
    hash = location.hash,
    recordItem = $('.ui-record-tab-item');

    $('.fn-record').tabControl({
        hand:'.ui-record-tab-item',
        handleType:'tap click',
        handCurr:'ui-record-tab-item-current',
        targetCurr:'ui-record-table-active',
    });
    //领取卡券    全场加息   今日爆款   积分兑换  合作平台  每日抽奖   呼朋唤友
    if(hash == "#card"){
        recordItem.eq(0).click();
    }else if(hash == "#rate"){
        recordItem.eq(1).click();
    }else if(hash == "#loan"){
        recordItem.eq(2).click();
    }else if(hash == "#gift"){
        recordItem.eq(3).click();
    }else if(hash == "#cooperation"){
        recordItem.eq(4).click();
    }else if(hash == "#prize"){
        recordItem.eq(5).click();
    }else if(hash == "#friends"){
        recordItem.eq(6).click();
    }