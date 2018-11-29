function LoadManage(data,callback,progressCall){
    this.data = data;
    this.count = this.data.length;
    this.loadnumber = 0;
    this.callback = callback;
    this.progressCall = progressCall;
    this.timer = null;
}
LoadManage.prototype.loadSprites = function(src){
    var that = this;
    var deferred = $.Deferred();
    var sprite = new Image();
    sprite.onload = function() {
        that.loadnumber++;
        that.progressCall(that.count,that.loadnumber);
        deferred.resolve();
    };
    sprite.src = src;
    return deferred.promise();
}

LoadManage.prototype.loadAudios = function(src){
    var that = this;
    var deferred = $.Deferred();
    var audio = new Audio(src);
    audio.onloadedmetadata = function() {
        that.loadnumber++;
        that.progressCall(that.count,that.loadnumber);
        deferred.resolve();
    };
    audio.src = src;
    return deferred.promise();
}
LoadManage.prototype.init = function(progressCall){
    var that = this;
    $.when.apply(null, function(){
        var strRegex = "(.ogg|.mp3)$";
        var reg=new RegExp(strRegex);
        var arr = [];
        for(var i in that.data){
            if(reg.test(that.data[i].toLowerCase())){
                if(window['Audio']){
                    arr.push(that.loadAudios(that.data[i]));
                }
            }else{
                arr.push(that.loadSprites(that.data[i]));
            }
        }
        return arr;
    }()).done(function(){
        if(that.callback){
            that.callback();
            if(that.data.length == 0){
                that.progressCall(100,100);
            }
        }
    });
}
return function(data,callback,progressCall){
    new LoadManage(data,callback,progressCall).init();
}