var
    app = require('./app'),
    getMoreList = require('../modules/getMoreList');
if($(".fn-loading").length>0){
	getMoreList.init({
	    url: '/member/withdrawlog',
	    data: {
	        ajax: 1,
	        p:2
	    },
	    tpl: 'dataTPl',
	    ajaxtype: 'get',
	    viewport: $('.ui-datalist')
	});
}
