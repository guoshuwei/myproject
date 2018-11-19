var 
    template = require('../modules/template'),
    listenType = _Fn.isMobile() ? 'tap' : 'click',
    province = require('../modules/province'),
    indexArray = [0,0,0],
    currentLevel = 0,
    __that = null,
    linkage = function(){
        defaults = {
            listBox : $('body'),//父级
            obj: '.fn-province',
            listInner : '.fn-linkage',//每一级最外层
            firstId : '.fn-province', 
            secondId : '.fn-city', 
            thirdId : '.fn-county', 
            firstInput : '#province',
            secondInput : '#city',
            thirdInput : '#county',
            defaultProvince: '北京',
            defaultCity: '市辖区',
            defaultArea: '东城区',
            jsTpl : 'linkageTpl',
            itemClass : '.fn-linkage-item',
            outMode : 'fadeOut', 
            inMode : 'slideInDown',
            callBackFirst : null,
            callBackSecond : null,
            callBackThird : null,
            closeTrigger: '#lightbox_wrap',
            timer: null,
            icons: '<em class="ui-icons-address"></em>'
        };
        function getIndex(_province,_provinceStr,_provinceStrIndex,callBack){
            var i = 0;

            
            if(_province[0].name){
                for(i = 0;i < _province.length;i++){
                    if(_province[i].name == _provinceStr){
                        _provinceStrIndex = i;
                        callBack && callBack();
                        return _provinceStrIndex;
                    }
                }
            }else{
                for(i = 0;i < _province.length;i++){
                    if(_province[i] == _provinceStr){
                        _provinceStrIndex = i;
                        callBack && callBack();
                        return _provinceStrIndex;
                    }
                }
            }
        }
        function resize(callBack){
            var _height = $(option.listInner + ':last').height()/2,
            maxHeight =  parseFloat($(option.listInner + ':last').css('max-height'))/2,
            currentHeight = _height > maxHeight ? maxHeight : _height;
            $(option.listInner + ':last').css('margin-top','-' + currentHeight + 'px');
            callBack && callBack();
        }
        function init(options){
            option = $.extend({},defaults,options);
            if(option.defaultProvince){
                var __pIndex = getIndex(provinceList,option.defaultProvince),
                    __cIndex = getIndex(provinceList[__pIndex].cityList,option.defaultCity);
                firstIdArray = provinceList;
                secondIdArray = provinceList[__pIndex].cityList;
                thirdIdArray = provinceList[__pIndex].cityList[__cIndex].areaList;
                indexArray = [__pIndex,__cIndex,0];
                
            }else{
                firstIdArray = provinceList;
                secondIdArray = provinceList[0].cityList;
                thirdIdArray = provinceList[0].cityList[0].areaList;
            }
            
            eventBind(option.firstId,firstIdArray,0);
            eventBind(option.secondId,secondIdArray,1);
            eventBind(option.thirdId,thirdIdArray,2);
        }
        function closeAnimate(){
            $(option.listInner).removeClass(option.inMode + ' animated').addClass(option.outMode + ' animated');
            clearTimeout(option.timer);
            $(option.itemClass).off('tap',touchend);
            _Fn.lightboxWrap()._fadeOut();
            option.timer = setTimeout(function(){
                $('.' + option.outMode).remove();
            },750)
        }
        function changeDom(_html,input,id){
            
            $(input).val(_html);
            $(id).html(option.icons + _html);
        }
        function touchend(e){
            __that = $(this);
            if(__that.parents(option.listInner).hasClass('.' + option.outMode))return;
            e.preventDefault();
            indexArray[currentLevel] = __that.index();
            var _html = __that.html();
            if(currentLevel == 0){
                changeDom(_html,option.firstInput,option.firstId);
            }else if(currentLevel == 1){
                changeDom(_html,option.secondInput,option.secondId);
            }else if(currentLevel == 2){
                changeDom(_html,option.thirdInput,option.thirdId);
            }
            option.defaultProvince = null;
            option.defaultCity = null;
            option.defaultArea = null;
            closeAnimate(option.listInner);
            refresh();
        }
        function eventBind(ele,data,level){
            $(ele).on('tap',function(){
                var contents = template.render(option.jsTpl,{data: data});
                currentLevel = level;
                
                setTimeout(function(){
                    option.listBox.append(contents);
                    _Fn.lightboxWrap()._fadeIn();
                    $(option.listInner).addClass(option.inMode + ' animated'); 
                    $(option.closeTrigger).on('tap',function(){
                        closeAnimate();
                        //_Fn.lightboxWrap()._fadeOut();
                    })
                    resize(function(){
                        $(option.itemClass).on('tap',touchend);
                    });
                },150)
            })
        }
        function refresh(){            
            $(option.secondId).off('tap');
            $(option.thirdId).off('tap');
            if(currentLevel == 0){
                changeDom(provinceList[indexArray[0]].cityList[0].name,option.secondInput,option.secondId);
                changeDom(provinceList[indexArray[0]].cityList[0].areaList[0],option.thirdInput,option.thirdId);
                indexArray[1] = 0;
                indexArray[2] = 0;
            }else if(currentLevel == 1){
                changeDom(provinceList[indexArray[0]].cityList[indexArray[1]].areaList[0],option.thirdInput,option.thirdId);
                indexArray[2] = 0;
            }
            secondIdArray = provinceList[indexArray[0]].cityList;
            thirdIdArray = provinceList[indexArray[0]].cityList[indexArray[1]].areaList;
            eventBind(option.secondId,secondIdArray,1);
            eventBind(option.thirdId,thirdIdArray,2);
        }
        return{
            init: init,
            closeAnimate: closeAnimate,
            refresh: refresh
        }
    }();


exports.init = linkage.init;
exports.closeAnimate = linkage.closeAnimate;
exports.refresh = linkage.refresh;

