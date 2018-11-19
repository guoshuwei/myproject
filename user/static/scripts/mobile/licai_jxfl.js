var
    app = require('./app');

 $("body")
.on("touchstart",".ui-jxfl-btn",function(){
   $(this).addClass('ui-jxfl-hover');
})
.on("touchend",".ui-jxfl-btn",function(){
   $(this).removeClass('ui-jxfl-hover');
});




       