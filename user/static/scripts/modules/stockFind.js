

//====================================================================================


//IE支持forEach
if (!Array.prototype.forEach){
    Array.prototype.forEach = function(fun /*, thisp*/){
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++){
            if (i in this)
                fun.call(thisp, this[i], i, this);
        }
    };
}



var stockInput = $("#stockNameInput"),
    stockIdInput = $("#stockId"),
    stockInputL = stockInput.offset().left,
    stockInputT = stockInput.offset().top,
    stockInputW = stockInput.outerWidth(),
    stockInputH = stockInput.outerHeight(),
    wrapTop = stockInputT + stockInputH;

stockInput
    .on("input",function(){
        var keyWord = $(this).val(),
            len = keyWord.length,
            list = [];
        if(len == 0){
            $(".stock-find-wrap").hide();
            return;
        }
        if(/^\d+$/.test(keyWord)){
            SEARCH.forEach(function(value,index){
                if(value.code.substring(0,len) == keyWord){
                    list.push(value);
                }
            });
        }else if(/^[a-zA-Z]+$/.test(keyWord)){
            SEARCH.forEach(function(value,index){
                if(value.pinyin.substring(0,len) == keyWord || value.spinyin.substring(0,len) == keyWord){
                    list.push(value);
                }
            });
        }else{
            SEARCH.forEach(function(value,index){
                if(value.name.substring(0,len) == keyWord){
                    list.push(value);
                }
            });
        }
        list.sort(function(a,b){
            return a.code- b.code;
        });
        printList(list);
    })
    .on("blur",function(){
        setTimeout(function(){
            $(".stock-find-wrap").hide();
        },300);
    });



var html = '<div class="stock-find-wrap" style="display:none;position:absolute;top:' + stockInputH + 'px;left:0;z-index:1000;">' +
    '<ul class="stock-find-list">' +
    '</ul>' +
    '</div>';
$("#stockFindBox").append(html);

var printList = function(list){
    var stockFindList = $(".stock-find-list"),
        stockFindWrap = $(".stock-find-wrap");
    if(!list.length){
        stockFindWrap.hide();
        return;
    }
    var el = "";
    list.forEach(function(value,index){
        el += '<li class="stock-find-item" data-name="' + value.name + '" data-id="' + value.id + '">' +
            '<span class="stock-find-item-name">' + value.name + '</span>' +
            '<span class="stock-find-item-number">' + value.code + '</span>' +
            '</li>';
    });

    stockFindList.html(el);
    stockFindWrap.show();

};

$("body")
    .on("click",".stock-find-item",function(){
        var $name = $(this).attr("data-name"),
            $id = $(this).attr("data-id");
        stockInput.val($name);
        stockIdInput.val($id);
        $(".stock-find-wrap").hide();
    });