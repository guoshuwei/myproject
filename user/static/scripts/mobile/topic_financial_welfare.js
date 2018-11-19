var
    app = require('./app');
    bxSlider = require('../plugins/jquery.bxslider.min'),
    picLength = $('.fn-welfare-pic .ui-welfare-pic-item').length;


if(picLength > 1){
    var slider1 = $('.fn-welfare-pic').bxSlider({
        auto: true,
        pause: 3000,
        controls: false,
        onSlideAfter: function(){
            slider1.startAuto()
        }
    })
}