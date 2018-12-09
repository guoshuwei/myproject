const Carousel = require('../module/vanilla-js-carousel');

var carousel = new Carousel({
    elem: 'carousel',    // id of the carousel container
    autoplay: true,      // starts the rotation automatically
    infinite: true,      // enables infinite mode
    interval: 3000,      // interval between slide changes
    initial: 0,          // slide to start with
    dots: true,          // show navigation dots
    arrows: true,        // show navigation arrows
    buttons: false,      // hide <play>/<stop> buttons,
    btnStopText: 'Pause' // <stop> button text
});

// Show the 3rd slide (Numeration of slides starts at 0)
carousel.show(2);

// Move to the next slide
carousel.next();



var carousel_2 = new Carousel({
    elem: 'carousel_2',    // id of the carousel container
    autoplay: true,      // starts the rotation automatically
    infinite: true,      // enables infinite mode
    interval: 3000,      // interval between slide changes
    initial: 0,          // slide to start with
    dots: true,          // show navigation dots
    arrows: false,        // show navigation arrows
    buttons: false,      // hide <play>/<stop> buttons,
    btnStopText: 'Pause' // <stop> button text
});

// Show the 3rd slide (Numeration of slides starts at 0)
carousel_2.show(2);

// Move to the next slide
carousel_2.next();