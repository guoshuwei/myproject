var
    app = require('./app'),
    dialogUi = require('../modules/dialogUi'),
    template = require('../modules/template'),
    through = $('#data_through').val(),
    isZT = $('#data_jumptype').val(),
    plat_url = $('#data_plat_url').val(),
    is_bind = $('#data_is_bind').val(),
    id = $('#data_plat_id').val(),
    url="/loans/redirect?"+(through?'through=1':'')+"&t=" + new Date().getTime();

dialogUi.listen('reqError',function(){
    reqErrorDialog = this;

    var content = template.render('reqErrorTpl');
    this.showLightbox = true;
    this.setBox(280,265);
    this.setPos('fixed');
    this.setTitle('提示');
    this.setContent(content);
    //this.setSkin('');
    this.open();
    this.contentTarget.find('.jum-retry').click(function(){
        window.location.reload(true);
    });

});

function platJump(){
    $.ajax({
        url: url,
        type: "post",
        dataType: 'json',
        data: "id=" + id,
        success: function (msg) {
            if (msg.code == 200) {
                var to_url = msg.data.redirect;
                if(isZT == 1){
                    $('body').append('<iframe style="display:none;" src="'+to_url+'"></iframe>');
                    
                    setTimeout(function(){
                        window.location.href = plat_url;
                    },2500);
                }else{
                    
                    window.location.href = to_url;
                }
            }else{
                dialogUi.fire('reqError');
            }
        },
        error: function () {
            dialogUi.fire('reqError');
        }
    });
}



$('.skip-btn').click(function(e){
    platJump();
});