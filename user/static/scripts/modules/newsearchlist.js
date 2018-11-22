
var store = (function () {
    var api               = {},
        win               = window,
        doc               = win.document,
        localStorageName  = 'localStorage',
        globalStorageName = 'globalStorage',
        storage;

    api.set    = function (key, value) {};
    api.get    = function (key)        {};
    api.remove = function (key)        {};
    api.clear  = function ()           {};

    if (localStorageName in win && win[localStorageName]) {
        storage    = win[localStorageName];
        api.set    = function (key, val) { storage.setItem(key, val) };
        api.get    = function (key)      { return storage.getItem(key) };
        api.remove = function (key)      { storage.removeItem(key) };
        api.clear  = function ()         { storage.clear() };

    } else if (globalStorageName in win && win[globalStorageName]) {
        storage    = win[globalStorageName][win.location.hostname];
        api.set    = function (key, val) { storage[key] = val };
        api.get    = function (key)      { return storage[key] && storage[key].value };
        api.remove = function (key)      { delete storage[key] };
        api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };

    } else if (doc.documentElement.addBehavior) {
        function getStorage() {
            if (storage) { return storage }
            storage = doc.body.appendChild(doc.createElement('div'));
            storage.style.display = 'none';
            // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
            // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
            storage.addBehavior('#default#userData');
            storage.load(localStorageName);
            return storage;
        }
        api.set = function (key, val) {
            var storage = getStorage();
            storage.setAttribute(key, val);
            storage.save(localStorageName);
        };
        api.get = function (key) {
            var storage = getStorage();
            return storage.getAttribute(key);
        };
        api.remove = function (key) {
            var storage = getStorage();
            storage.removeAttribute(key);
            storage.save(localStorageName);
        }
        api.clear = function () {
            var storage = getStorage();
            var attributes = storage.XMLDocument.documentElement.attributes;;
            storage.load(localStorageName);
            for (var i=0, attr; attr = attributes[i]; i++) {
                storage.removeAttribute(attr.name);
            }
            storage.save(localStorageName);
        }
    }
    return api;
})();

var
    searchKey = $('.mod-search input[name=search-key]');

if(searchKey.length > 0){
    searchKey = searchKey.val();

    searchKey = searchKey.substring(1,searchKey.length-1);
    searchKey = searchKey.split('|');

    searchKey = function(){
        var json = {};
        var map = {};
        for(var i = 0 ; i < searchKey.length ; i++){
            json[i] = {
                key : searchKey[i].split(':')[0],
                value : searchKey[i].split(':')[1]
            }

            map[searchKey[i].split(':')[0]] = i;
        }

        return {
            json : json,
            add : map
        }

    }();

}

$('.mod-search')
    .on('mouseenter','.hd .item',function(){
        $(this).addClass('current');
    })
    .on('mouseleave','.hd .item',function(){
        $(this).removeClass('current');
    })
    .on('click','.more',function(){
        var
            that = $(this),
            parent = that.parents('.item'),
            list = parent.find('.list'),
            nolimit =parent.find('.nolimit');
            //sift = parent.find('.sift');

        $('.itemall').addClass('onthis');
        $('.itemall').siblings('.items').removeClass('onthis');
        if(list.hasClass('normal')){
            //sift.css('display','block');
            that.html('收起');
            list.removeClass('normal');
            that.addClass('selected');
            var innerHeight = list.children('.inner').innerHeight();
            list.css('height',innerHeight+'px');

        }else{
            $('.item-default').css('display','block');
            $('.item-curr').css('display','none');
            $('.pitch').css('display','none');
            list.addClass('normal');
            that.removeClass('selected');
            list.css('height','70px');
            that.html('展开');
            //sift.css('display','none');
            nolimit.css('display','block');
        }
    })
    .on('click', '.tool .multiple', function() { //多选
        var
            that = $(this),
            tool = that.parents('.tool'),
            parents = that.parents('.item'),
            lists = parents.find('.list'),
            yes = parents.find('.inner-btn .yes'),
            nolimit = parents.find('.nolimit'),
            //sift = parents.find('.sift'),
            itemwrap = parents.find('.item-wrap'),
            current = parents.find('.inner .clearfix .item-b  .current'),
            list = parents.find('.inner .clearfix a');
        
        $('.itemall').addClass('onthis');
        $('.itemall').siblings('.items').removeClass('onthis');
        $('.item-default').css('display', 'block');
        $('.item-curr').css('display', 'none');
        $('.pitch').css('display', 'none');

        nolimit.css('display', 'none');
        //sift.css('display', 'block');
        lists.addClass('normal');
        list.each(function (index, that) {
            var temp = $(that).attr('href');
            $(that).attr('href-flag', temp);
            $(that).attr('href', 'javascript:;');
        })
        itemwrap.each(function (i) {
            var width = $(this).children("a").outerWidth(true) + 34;
            var ele = $(this).find("img");
            var wid = ele.width() - 12;
            $(this).find(".label").css({left: width + "px"});
            $(this).find(".labelmarker").css({left:width+8+"px"});
            $(this).find(".labelshow").show();
        })
            $('.itemall').mouseover(function () {
                $(".item-curr .item-curr-pt").each(function (i) {
                    var itemwidth = $(this).find("a").outerWidth(true) - 11;
                    var ele = $(this).find("img");
                    var wid = ele.width() - 12;
                    $(this).find(".label").css({left: itemwidth + "px"});
                    $(this).find(".labelmarker").css({left:itemwidth+8+"px"});
                    $(this).find(".labelshow").show();
                })
            })
            parents.find('.list').attr('style', false);

            if (parents.hasClass('multiple-item')) {
                parents.removeClass('multiple-item');
                tool.fadeIn();
            } else {
                parents.addClass('multiple-item');
                tool.fadeOut();
            }
            if (current.length > 1) {
                yes.addClass('selected');
            }

            if(parents.attr('screening') && $('.siftleft2 a.current').length == 1){
                //有选中的字母组
                $('.siftleft2 a.current').trigger('click');
            }

        })
    .on('click','.multiple-item .inner-btn .no',function(){//取消
        var
            that = $(this),
            parents = that.parents('.item'),
            tool = parents.find('.tool'),
            normal = parents.find('.normal'),
            more = parents.find('.more'),
            lists = parents.find('.list'),
            yes = parents.find('.inner-btn .yes'),
            nolimit =parents.find('.nolimit'),
            sift = parents.find('.sift'),
            datainput = parents.find('input[type=hidden]'),
            dataKey = datainput.val(),
            current = parents.find('.inner .clearfix .current'),
            pushon = parents.find('.pushon').length,
            list = parents.find('.inner .clearfix a');
        $('.item-default').css('display','block');
        $('.item-curr').css('display','none');
        $('.pitch').css('display','none');
        nolimit.css('display','block');

        list.each(function(index,that){
            $(that).attr('href',$(that).attr('href-flag'));
        })
        parents.removeClass('multiple-item');
        tool.fadeIn();
        parents.find('.inner-btn .yes').removeClass('selected');
        parents.find('.inner .item-b a').removeClass('current');
        parents.find('.inner .item-b .pushon').addClass('current');
        parents.find('.inner .item-curr a').removeClass('current');
        parents.find('.inner .item-curr .pushon').addClass('current');
        parents.find('.inner .pitch a').removeClass('current');
        parents.find('.inner .pitch .pushon').addClass('current');
        tool.find('.more').removeClass('selected');

        //parents.find('input[name=key]').val('');
        yes.removeClass('hideyes');
        yes.attr('href','javascript:;');
        $(".item-bg .item-wrap").each(function(i){
            var width = $(this).find("a").outerWidth(true)-9;
            var ele = $(this).find("img");
            var wid = ele.width()-12;
            $(this).find(".label").css({left:width+"px"});
            $(this).find(".labelmarker").css({left:width+8+"px"});
            $(this).find(".labelshow").show();
        })
        if(dataKey=='b'){
            searchKey.json[searchKey.add[dataKey]].value = 0
        }else if(dataKey=='l'){
            searchKey.json[searchKey.add[dataKey]].value = ''

        }
        if(pushon==0){
            sift.css('display','none');

            if(parents.parent().hasClass('item-bg')){
                normal.css('height','70px');
            }else{
                normal.css('height','auto');
            }
            more.html('展开');
        }else{
            lists.addClass('normal');
            $('.more').click();
        }

        if(parents.attr('screening') && $('.siftleft2 a.current').length == 1){
            //有选中的字母组
            $('.siftleft2 a.current').trigger('click');
        }
    })
    .on('click','.multiple-item .inner-btn .yes',function(){
        var
            gethrefone,
            gethrefarr,
            that = $(this),
            gethref = that.attr('href');
            gethrefarr = gethref.split('l');
            gethrefone = gethrefarr[2].substr(0, 1);
            if(gethrefone=='-'){
                gethref  = gethref.substring(0, gethref.indexOf('-'))+gethref.substr( gethref.indexOf('-')+1)
                that.attr('href',gethref);
            }
            parents = that.parents('.item');
        tool = parents.find('.tool');

    })
    .on('click','.item .inner .clearfix a',function(){
        var
            that = $(this),
            parent = that.parent(),
            parents = that.parents('.item'),
            datainput = parents.find('input[type=hidden]');

        if(parents.hasClass('multiple-item')) return;

        if(that.hasClass('current')) return;

        parent.find('a').removeClass('current');
        that.addClass('current');
        datainput.val(that.attr('data'));
    })
    .on('click','.multiple-item .inner .clearfix a',function(){
        var
            that = $(this),
            parent = that.parent(),
            parents = that.parents('.item'),
            datainput = parents.find('input[type=hidden]'),
            dataKey = datainput.val(),
            thatdata = that.attr('data'),
            btns = parents.find('.inner-btn'),
            yes = btns.find('.yes'),
            selected;
        if(that.hasClass('current')){
            that.removeClass('current');
            if(dataKey=='b'){
                searchKey.json[searchKey.add[dataKey]].value = parseInt(searchKey.json[searchKey.add[dataKey]].value) - parseInt(thatdata);

            }else if(dataKey=='l'){
                searchKey.json[searchKey.add[dataKey]].value = (searchKey.json[searchKey.add[dataKey]].value).replace(thatdata, "");
            }

        }else{
            that.addClass('current');
            if(dataKey=='b') {
                searchKey.json[searchKey.add[dataKey]].value = parseInt(searchKey.json[searchKey.add[dataKey]].value) + parseInt(thatdata);

            }else if(dataKey=='l'){
                searchKey.json[searchKey.add[dataKey]].value = searchKey.json[searchKey.add[dataKey]].value+thatdata;
            }
        }

        selected = parent.find('.current');
        if(selected.length > 0){

            yes.addClass('selected');
        }else{
            yes.removeClass('selected');
        }

        yes.attr('href',function(){
            var str = [];
            for(var i in searchKey.json){
                str.push(searchKey.json[i].key+searchKey.json[i].value);

            }

            return '/loans/newuser/'+str.join('')+'p1.html';
        }())

    })
    .on('click','.ft .close',function(){
        var
            that = $(this),
            parents = that.parents('.mod-search'),
            morelist = parents.find('.bd .more-show'),
            text = that.find('span').html(),
            textData = that.attr('data'),
            tempText = [text,textData];

        if(morelist.hasClass('open')){
            morelist.removeClass('open');
            morelist.slideUp(250);
            that.removeClass('open');
            store.set('search_condition_showOrHide_status', 'close '+new Date().getTime());
        }else{
            morelist.addClass('open');
            morelist.slideDown(250);
            that.addClass('open');
            store.set('search_condition_showOrHide_status', 'open '+new Date().getTime());
        }
        that.find('span').html(tempText[1]);
        that.attr('data',tempText[0]);
    });

var search_condition_showOrHide = store.get('search_condition_showOrHide_status');
search_condition_showOrHide = search_condition_showOrHide ? search_condition_showOrHide.split(' ') : null;
if(search_condition_showOrHide && search_condition_showOrHide[0] == 'open'){
    if((new Date().getTime() - parseInt(search_condition_showOrHide[1]))/1000/60/60 < 1){
        var that = $('.ft .close');
        if(that.length > 0){
            var	parents = that.parents('.mod-search');
            if(parents.length > 0){
                var	morelist = parents.find('.bd .more-show');
                if(morelist.length > 0) {
                    var text = that.find('span').html();
                    if(text.length > 0) {
                        var textData = that.attr('data'),
                            tempText = [text, textData];

                        morelist.addClass('open');
                        morelist.slideDown(250);
                        that.addClass('open');
                        that.find('span').html(tempText[1]);
                        that.attr('data', tempText[0]);
                    }
                }
            }
        }

    }
}