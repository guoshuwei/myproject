var app=require('./app');

$('body').on('click','[role-event="track"]',function(){
    _Fn.track.fire($(this).attr('event-track'));
});