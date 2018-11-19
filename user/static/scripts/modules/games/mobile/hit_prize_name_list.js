/**
 * Created by yx on 16-10-20.
 */
var hit_prize_name_list_ = function(){

    function MarqueeList(circleRightBox,inner,itemWidth){
        circleRightBox = circleRightBox ? circleRightBox : $('.fn-loop');
        this.circleRightBox = circleRightBox;
        inner = inner ? inner : $('.fn-loop-inner');
        this.inner = inner;
        this.childrens = inner.find('li');
        this.length = inner.children().length;
        this.innerHtml = inner.html();
        this.innerWidth = 0;
        this.widthArray = [];
        this.runed = 0;
        this.marginLeft = 0;
        this.itemWidth = itemWidth;
    }

    MarqueeList.prototype.init = function(){
        var _that = this;
        _that.childrens.each(function(index,that){
            var thisWidth = $(that).width()+40;
            if(_that.itemWidth){
                thisWidth = _that.itemWidth;
            }
            _that.innerWidth = _that.innerWidth+ thisWidth;
            _that.widthArray.push(thisWidth);
        });
        //this.inner.css({width:_that.innerWidth * 2 + 'px'});
        this.inner.append(this.innerHtml);
    }

    MarqueeList.prototype.run = function(){
        var that = this;
        if(this.widthArray[this.runed] == 40){
            this.widthArray[this.runed] = this.childrens.eq(this.runed).width()+40;
        }
        this.marginLeft = this.marginLeft+this.widthArray[this.runed];
        this.inner.css({
            'margin-left':'-'+this.marginLeft+'px'
        });
        this.runed ++;

        if(this.runed >= this.length-1){
            this.runed = 0;
            this.marginLeft = 0;
        }
    }

    var award = new MarqueeList();
    //var prize = new MarqueeList($('.fn-loop2'),$('.fn-loop-inner2'),200);
    award.init();
    //prize.init();

    function play(xtyyh){
        if(!xtyyh.domCache.inMainBoard)
            return;
        //prize.run();
        award.run();
        setTimeout(function(){
            play(xtyyh);
        },5000);
    }
    return {
        play: play
    };
}();

exports.play = hit_prize_name_list_.play;