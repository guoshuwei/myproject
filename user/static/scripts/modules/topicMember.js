var 
    template = require('../modules/template'),
    jPages = require('../plugins/jPages.min'),
    topicMember = function(){
        var 
            option = {
                addressBox: $('.fn-address-box'),
                addressSaveUrl: '/topic/goodsreceipt', 
                addressSaveForm: '#addressform',
                addressSaveLoadingBox: '.fn-address-button',
                addressGetUrl: '/topic/getContact',
                addressGetData: null,
                addressGetTpl: 'addressTpl',
                listUrl: null,
                listTpl: null,
                listData: null,
                listParent: null,
                listPage: true,
                listPageParent: null,
                listPageDefine: null,
                listLoadingBox: $('.ui-brandtable-box'),
                ajaxLock: false,
                addressSuccessCallback: function(res){
                    if(res.code == 200){
                         _Fn.message('保存成功！');
                        $('.ui-address-button').remove();
                    }else{
                        _Fn.alert(res.message);
                    }
                },
                addressErrorCallback: function(){
                    _Fn.alert('网络错误，请稍后刷新重试！');
                },
                listSuccessCallback: function(res){
                    if(res.code != 200){
                        _Fn.alert(res.message);
                    }
                },
                listErrorCallback: function(){
                    _Fn.alert('网络错误，请稍后刷新重试！');
                }

            };
        function _addressSave(){
            if(option.ajaxLock)return;
            option.ajaxLock = true;
            _Fn.loadingMulti().show($(option.addressSaveLoadingBox));
            $.ajax({
                url: _Fn.mockServer + option.addressSaveUrl,
                type: 'post',
                data: $(option.addressSaveForm).serialize(),
                dataType: 'json',
                success: function(res){
                    addressSuccessCallback && addressSuccessCallback(res);
                    _Fn.loadingMulti().hide($(option.addressSaveLoadingBox));
                    option.ajaxLock = false;
                },
                error: function(){
                    addressErrorCallback && addressErrorCallback();
                    _Fn.loadingMulti().hide($(option.addressSaveLoadingBox));
                    option.ajaxLock = false;
                }
            }) 
        }
        function _addressGet(){
            if(option.ajaxLock)return;
            option.ajaxLock = true;
            $.ajax({
                url: _Fn.mockServer + option.addressGetUrl,
                type: 'post',
                data: option.addressGetData,
                dataType: 'json',
                success: function(res){
                    if(res.code == 200){
                        var content = template.render(option.addressGetTpl,res.data);
                        option.addressBox.html(content);
                    }else{
                        _Fn.alert(res.message);
                    }
                    option.ajaxLock = false;
                },
                error: function(){
                    _Fn.alert('网络错误，请稍后刷新重试');
                    option.ajaxLock = false;
                }
            })
        }
        function _getList(){
            if(option.ajaxLock)return;
            option.ajaxLock = true;
            _Fn.loadingMulti().show(option.listLoadingBox);
            $.ajax({
                url: _Fn.mockServer + option.listUrl,
                type: 'post',
                data: option.listData,
                dataType: 'json',
                success: function(res){
                    _Fn.loadingMulti().hide(option.listLoadingBox);
                    if(res.code == 200){
                        var content = template.render(option.listTpl,{data:res.data});
                        
                        if(!res.data || res.data.length != 0){
                            option.listParent.html(content);
                            if(option.listPage){
                                option.listPageParent.jPages(option.listPageDefine);
                            }
                        } 
                    }
                    option.listSuccessCallback && option.listSuccessCallback(res);
                    _Fn.loadingMulti().hide(option.listLoadingBox);
                    option.ajaxLock = false;
                },
                error: function(){
                    option.listErrorCallback && option.listErrorCallback();
                    _Fn.loadingMulti().hide(option.listLoadingBox);
                    option.ajaxLock = false;
                }
            })
        }

        

        function addressSave(options){
            $.extend(option,options);
            _addressSave();
        }
        function addressGet(options){
            $.extend(option,options);
            _addressGet();
        }
        function getList(options){
            $.extend(option,options);
            _getList();
        }
        return{
            addressSave: function(options){
                addressSave(options);
            },
            addressGet: function(options){
                addressGet(options);
            },
            getList: function(options){
                getList(options);
            }
        }
    }();
/*
topicMember.getList({
    listUrl: '/topic/myAwardlog',
    listTpl: 'lotteryrecordTpl',
    listData: {type: '19-20-21-22'},
    listParent: $('.fn-lotteryrecord-box'),
    listPageParent: $('.fn-lotteryrecord-pager'),
    listPageDefine: {
        containerID : 'lotteryrecord',
        previous : '上一页',
        next : '下一页',
        perPage : 8,
        delay : 20,
        scrollBrowse : false
    }                    
});
*/
exports.addressSave = topicMember.addressSave;
exports.addressGet = topicMember.addressGet;
exports.getList = topicMember.getList;
