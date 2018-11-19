exports.init = function(input,parent,html){
    
    var $input = function(){
        if(input instanceof jQuery){
            return input;
        }else{
            return $(input);
        }
    }(),
    timer,
    flagCache,
    cache = {},
    $parent=function(){
        if(parent instanceof jQuery){
            return parent;
        }else{
            return $(parent);
        }
    }(),
    updateHtml = function(data){
        $parent.empty();
        var _html = [];
        if(html){
            $(data).each(function(){
                var _this = this;
                _html.push(html(_this));
            });
        }else{
            for(var i in data){
                var dl='';
                dl= '<dl class="clearfix"><dt><a href="/feed/other?uid='+data[i].id+'" target="_blank" title="'+data[i].nickname+'"><img src="'+data[i].user_img+'" alt="'+data[i].nickname+'" /></a></dt>';
                dl+='<dd class="search_ddt"><a href="/feed/other?uid='+data[i].id+'" target="_blank" title="'+data[i].nickname+'">'+data[i].nickname+'</a>';
                if(data[i].recom_member[3]==1){
                    dl+='<em></em>';
                }
                dl+='</dd><dd class="search_ddb"><span>粉丝：'+data[i].fans_count+'</span></dd></dl>';
                
                _html.push(dl);
            }
        }
        
        $parent.append(_html.join(''));
        
        $parent.show();
        
        flagCache = true;
    },
    
    getCache = function(val,callback){
        $.ajax({
            type: 'post',
            url: '/member/searchNick',
            data: {
                name:val
            },
            dataType: 'json',
            success: function(msg){
                if(msg.code == 200){
                    cache[val] = msg.data;
                    if(msg.data){
                        if(msg.data.length == 0){
                            return;
                        }
                        
                        callback(msg.data);
                    }
                    
                }
            }
        });
    },
    
    findCache = function(key){
        if(cache[key]){
            return cache[key];
        }else{
            return false;
        }
    };
    
    if($input.length==0)return;
    $('body').on('input',$input,function(){ 
        
        var 
        that = $(this),
        hasCache,
        val = that.val(),
        str = $input[0].value;
        str = $.trim(str);
        
        clearInterval(timer);
        
        if(str == ''){
            $parent.hide();
            
            return;
        }
        if(str.length>20){
            str = str.substring(0,20);
        }

        hasCache = findCache(str);
        
        if(!hasCache){
            timer = setTimeout(function(){
                getCache(str,updateHtml);
            },1000);
        }else{
            updateHtml(hasCache);
        }
        
    });
    
    if($input[0].attachEvent) {
        $input[0].attachEvent('onpropertychange',function(e) {
            if(e.propertyName!='value') return;
            $($input[0]).trigger('input');
        });
    }
    $input.focus(function(){
        if(flagCache){
            $parent.show();
        }
    });
    
    $('body').on('click','input',function(event){
        event.stopPropagation();
    });
    $('body').on('click',function(){
        $parent.hide();
    });
}