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
	innerHeight = list.find('.inner').height();

	if(list.hasClass('normal')){
		list.removeClass('normal');
		that.addClass('selected');
		list.css('height',innerHeight+'px');
	}else{
		list.addClass('normal');		
		that.removeClass('selected');
		list.css('height','35px');
	}
})
.on('click', '.tool .multiple', function() {
	var 
	that = $(this),
	tool = that.parents('.tool'),
	parents = that.parents('.item'),
	yes = parents.find('.inner-btn .yes'),
	current = parents.find('.inner .clearfix .current'),
	list = parents.find('.inner .clearfix a');

	list.each(function(index,that){
		var temp = $(that).attr('href');
		$(that).attr('href-flag',temp);
		$(that).attr('href','javascript:;');
	})


	parents.find('.list').attr('style',false);

	if(parents.hasClass('multiple-item')){
		parents.removeClass('multiple-item');
		tool.fadeIn();
	}else{
		parents.addClass('multiple-item');
		tool.fadeOut();
	}

	if(current.length> 0){
		yes.addClass('selected');
	}
	
})
.on('click','.multiple-item .inner-btn .no',function(){
	var 
	that = $(this),
	parents = that.parents('.item'),
	tool = parents.find('.tool'),
	yes = parents.find('.inner-btn .yes'),
	current = parents.find('.inner .clearfix .current'),
	list = parents.find('.inner .clearfix a');
	list.each(function(index,that){
		$(that).attr('href',$(that).attr('href-flag'));
	})

	parents.removeClass('multiple-item');


	tool.fadeIn();
	parents.find('.inner-btn .yes').removeClass('selected');
	if(current.length != 1){
		parents.find('.inner .clearfix a').removeClass('current');	
	}

	tool.find('.more').removeClass('selected');

	parents.find('input[name=key]').val('');

	yes.attr('href','javascript:;');
	

})
.on('click','.multiple-item .inner-btn .yes',function(){
	var 
	that = $(this),
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
	thatdata = parseInt(that.attr('data')),
	btns = parents.find('.inner-btn'),
	yes = btns.find('.yes'),
	selected;
	if(that.hasClass('current')){
		that.removeClass('current');
		searchKey.json[searchKey.add[dataKey]].value = parseInt(searchKey.json[searchKey.add[dataKey]].value) - thatdata;

	}else{
		that.addClass('current');
		searchKey.json[searchKey.add[dataKey]].value = parseInt(searchKey.json[searchKey.add[dataKey]].value) + thatdata;

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

		return '/search/'+str.join('')+'p1.html';
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
		var　that = $('.ft .close');
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