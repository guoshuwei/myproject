var runway = (function(){

    var

        cache = null,

        runnerCache = [],

        winWidth = 0,

        winHeight = 0,

        status = false,

        flagRandom = null,
        loseFlagRandom = null,

        animateCalling = function(parent,paosize,paocolor){

            var running = -1;
            function Animater(obj){
                this.data = obj;

                this.runner = null;

            }

            Animater.prototype.create = function(){

                var

                    that = this,

                    runner = document.createElement('span'),

                    random = function(){

                        var _random = parseInt(Math.random()*5);

                        if(_random == 0 || _random == 5){
                            return random();
                        }


                        if(_random == flagRandom || _random == loseFlagRandom){
                            return random();
                        }else{
                            if(flagRandom){
                                loseFlagRandom = flagRandom;
                            }
                            flagRandom = _random;
                            return _random;
                        }
                    };


                $(runner).html(that.data);

                var colorNum=Math.round(Math.random()*(paocolor.length-1));
                var sizeNum=Math.round(Math.random()*(paosize.length-1));

                var lograndom = random();

                $(runner).css({

                    position : 'absolute',

                    left : (winWidth + 100) + 'px',

                    top : ( winHeight / 4 ) * ( lograndom - 1 )   + 'px',

                    color:paocolor[colorNum],

                    fontSize:paosize[sizeNum]
                })

                parent.append(runner);

                this.runner = runner;


            }

            Animater.prototype.run = function(){

                var that = this;

                if(cache[running+1]){

                    running = running + 1;

                }else{

                    running = -1;
                }



                $(that.runner).animate({

                    left : '-500px'

                }, 12000,'linear',function(){
                    $(that.runner).css({
                        left : (winWidth + 500) + 'px'
                    })
                })
            }

            Animater.prototype.init = function(){

                this.create();

                this.run();
            }



            setInterval(function(){

                var cachelen = cache.length;

                if(runnerCache[running+1]){


                    runnerCache[running+1].run();


                    if(runnerCache.length - running == 1){

                        running = -1;
                    }

                }else{

                    if(cache[runnerCache.length]){

                        var
                            _runner = new Animater(cache[runnerCache.length]);

                        _runner.init();

                        runnerCache.push(_runner);

                        if(runnerCache.length - cachelen == 0){

                            running = -1;
                        }

                    }


                }


            },1100);
        }

    function reset(target,paosize,paocolor){
        winWidth = target.width();
        winHeight = target.height();

        if(!status){
            status = true;
            animateCalling(target,paosize,paocolor);

        }

    }

    return {

        update : function(data){
            if(!cache){
                cache = [];
            }

            if(Object.prototype.toString.call(data) == '[object Array]'){

                cache = cache.concat(data);
            }else{

                cache.push(data);
            }

        },
        init : function(data,target,paosize,paocolor){

            cache = data;

            reset(target,paosize,paocolor);

            $(window).resize(function(){

                reset(target,paosize,paocolor);

            })
        }
    }
})();
function run(url,target,size,color){
    var paoId='id='+target.attr("data_id");
    var paodata=null;
    var paosize=size||["16px"];
    var paocolor=color||["#000"];
    $.ajax({
        url: url,
        type: "get",
        dataType: 'text',
        data: paoId,
        success: function(res) {  //json是从后台获取的数据
            res=$.parseJSON(res);
            paodata=res.data;//获取评论数据
            runway.init(paodata,target,paosize,paocolor);//调用跑马
        },
        error:function(){
            //失败回调
        }
    });
}
return {
    run:function(url,target,size,color){
        run(url,target,size,color);
    }
}