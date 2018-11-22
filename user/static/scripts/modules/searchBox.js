var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;
window.isIELower = isIE6 || isIE7 || isIE8;



var $dropmenu = $('#search_box_drop_menu').mouseover(function(e){
    $dropmenu.children().removeClass('hov');
    $(e.target || e.srcElement).closest('li').addClass('hov');
});

$('body').click(function(e){
    var t = e.target || e.srcElement,
        $t = $(t);
    if($t.attr('id') == 'searchrandom'){
        var dropMenu = $t.next();
        if(dropMenu.children().length > 0){
            dropMenu.show();
        }
    }else{
        var $dm = $t.closest('.drop_menu');
        if($dm.length > 0 && $t.hasClass('txt')){
            $dm.hide().prev().prev().val($t.text());
        }else if($dm.length == 0){
            $dropmenu.hide();
        }
    }
});
var searchbox_data = [];
var presskeyupOrDowncontinuously;
var keyupOrDownInterval;
function searchrandom_keyup_handle(){
    var currentLi = $dropmenu.find('li.hov');
    if(currentLi.length > 0){
        $dropmenu.parent().parent().attr('noSubmit', true);
        var currIndex = currentLi.index();
        if(currIndex != 0){
            currentLi = currentLi.removeClass('hov').prev().addClass('hov');
            currIndex --;
            if($dropmenu.scrollTop() > 0 && currIndex*40-$dropmenu.scrollTop() < 0){
                $dropmenu.scrollTop(currIndex*40);
            }
        }
    }
}
function searchrandom_keydown_handle(){
    var currentLi = $dropmenu.find('li.hov');
    if(currentLi.length > 0) {
        $dropmenu.parent().parent().attr('noSubmit', true);
        var currIndex = currentLi.index();
        if(currIndex != $dropmenu.children().length-1){
            currentLi = currentLi.removeClass('hov').next().addClass('hov');
            currIndex ++;
            if(currIndex > 7 && (currIndex*40-$dropmenu.scrollTop()) > 280){
                $dropmenu.scrollTop((currIndex-7)*40);
            }
        }
    }
}
var $searchrandom = $('#searchrandom')
    .keydown(function(e){
        if(e.keyCode == 38 || e.keyCode == 40){
            if(!presskeyupOrDowncontinuously)
                presskeyupOrDowncontinuously = setTimeout(function(){
                    keyupOrDownInterval && clearInterval(keyupOrDownInterval);
                    keyupOrDownInterval = setInterval(e.keyCode == 38 ? searchrandom_keyup_handle: searchrandom_keydown_handle,70)
                },500);
        }
        if(e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 39 && $(this).val().length > 199){
            return false;
        }
    })
    .keyup(function(e) {
        var currValue = $(this).val();
        if(currValue.length > 200){
            $(this).val(currValue.substring(0, 200));
        }
        if(presskeyupOrDowncontinuously){
            clearTimeout(presskeyupOrDowncontinuously);
            presskeyupOrDowncontinuously = null;
        }
        if(keyupOrDownInterval){
            clearInterval(keyupOrDownInterval);
            keyupOrDownInterval = null;
        }
        switch(e.keyCode) {
            case 38: // up
                e.preventDefault();
                e.cancelBubble = true;
                searchrandom_keyup_handle();
                break;
            case 40: // down
                e.preventDefault();
                e.cancelBubble = true;
                searchrandom_keydown_handle();
                break;
            case 9:  // tab
            case 13: // return
            case 37://<-
            case 39://->
                e.preventDefault();
                e.cancelBubble = true;
                break;
            default:
                var key = $.trim($(this).val()).toLowerCase();
                if(!key || !searchbox_data || searchbox_data.length == 0){$dropmenu.css({'height': '40px', 'display': 'none'}).html('');return;}
                var len = searchbox_data.length ? searchbox_data.length : 0,
                    maxLen = isIELower ? 400 : 1000,
                    i= 0,
                    targetSrc = [],
                    hitItems = [];
                for(;i<len;i++){
                    if(hitItems.length > maxLen) break;
                    var row = searchbox_data[i],
                        nameIndex = row.name.toLowerCase().indexOf(key),
                        pinyinIndex = row.pinyin.toLowerCase().indexOf(key);
                    if(nameIndex > -1 || pinyinIndex > -1) {
                        row.nameIndex = nameIndex;
                        row.pinyinIndex = pinyinIndex;
                        hitItems.push(row);
                    }
                }
                len = hitItems.length;
                var j,tmp,iItem,jItem;
                for(i=0;i<len;i++) {//bubble
                    iItem = hitItems[i];
                    for(j=0;j<len;j++){
                        jItem = hitItems[j];
                        if(iItem.nameIndex == -1){//pinyin
                            if(iItem.pinyinIndex < jItem.pinyinIndex){
                                tmp = hitItems[j];
                                hitItems[j] = hitItems[i];
                                hitItems[i] = tmp;
                            }
                        }else{//china
                            if(iItem.nameIndex < jItem.nameIndex){
                                tmp = hitItems[j];
                                hitItems[j] = hitItems[i];
                                hitItems[i] = tmp;
                            }
                        }
                    }
                }
                if(len)
                for(i=0;i<len;i++){
                    var row = hitItems[i];
                    targetSrc.push('<li'+(i == 0 ? ' class="hov"' : '')+'><a class="txt txt1" href="//'+row.domain_body+'.p2peye.com/" title="' + row.name + '">' + row.name + '</a></li>');
                }else{
                    targetSrc.push('<div class="no_data">暂无平台</div>');
                }
                $dropmenu.css({
                    'height': len > 8 ? '320px' : (len == 0 ? 40 : len*40)+"px",
                    'display': 'block'
                }).html(targetSrc.join('')).scrollTop() > 0 && $dropmenu.scrollTop(0);
                break;
        }
    }).focus().click();
$.ajax({
    type: "get",
    //url: _Fn.mockServer + "/ajax/searchBox",
    url: "/index/getPlatform",
    data: {},
    dataType: "json",
    success: function(data){
        if(data.code == "200"){
            searchbox_data = data.data;
        }else{
            searchbox_data = [];
        }
    },
    error: function(){
        searchbox_data = [];
    }
});

$('#search_box_form').submit(function(e){
    var currentLi = $dropmenu.find('li.hov');
    currentLi = currentLi.length > 0 ? currentLi : $dropmenu.children('li').eq(0);
    if(currentLi.length > 0){
        window.location.href = currentLi.children('a').eq(0).attr('href');
    }else if($dropmenu.children().length > 0){
        $dropmenu.show();
    }
    return false;
});