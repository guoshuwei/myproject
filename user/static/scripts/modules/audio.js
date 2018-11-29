function Player(options){
	var _that = this;
	this.autoplay = false;
	this.controls = 'controls';
	this.preload = 'auto';
	this.loop = false;
	this.src = [];
	this.audio = null;
	this.show = false;
	for(var i in options){
		_that[i] = options[i];
	}
}
Player.prototype.init = function(){
	var that = this;
	var _audio = document.createElement('audio');
	$(_audio).attr({
		controls:that.controls,
		autoplay:that.autoplay,
		preload:that.preload,
		loop:that.loop
	});

	for(var i in that.src){
		$(_audio).append('<source src="'+that.src[i]['src']+'" type="'+that.src[i]['type']+'" />')
	}
	if(that.show){
		$(_audio).hide();
	}

	$('body').append(_audio);

	this.audio = _audio;
}

Player.prototype.play = function(){
	if(!window['Audio']){
		return;
	}
	if(!this.audio){
		return this.init();
	}
	if(this.audio.paused){
		this.audio.play();
	}
}

Player.prototype.stop = function(){
	if(!window['Audio']){
		return;
	}
	if(!this.audio){
		return this.init();
	}
	this.audio.pause();
	this.audio.currentTime = 0;
}

Player.prototype.pause = function(){
	if(!window['Audio']){
		return;
	}
	if(!this.audio){
		return this.init();
	}
	this.audio.pause();
}


return function(options){
	var _player = new Player(options);
	if(window['Audio']){
		_player.init();
	}else{
		return {};
	}
	return _player;
}