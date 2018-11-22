exports.get = function(url) {

    var hash = null,_URL_ = url,obj = {};

	url = (url || url == '') ? url : window.location.href;
    
    _URL_ = url;

	if(url.indexOf('#') != -1){

		url = url.substring(0,url.indexOf('#'));

        hash = _URL_.substring(_URL_.indexOf('#') + 1,_URL_.length -1);

        obj['hash'] = hash;

	}

    obj['host'] = url.indexOf('?') != -1 ? url.substring(0,url.indexOf('?')) : url;

    obj['params'] = url.indexOf('?') == -1 ? null : {};

    url = url.indexOf('?') == -1 ? url : url.substring(url.indexOf('?') + 1,url.length + 1);
    
    url = url.split('&');

    if(!obj.params) return obj;

    for(var i = 0 ; i < url.length ; i++){

        if(url[i] == '') return;

        var temp =url[i].split('=');

        obj.params[temp[0]] = temp[1];

    }

    return obj;
}