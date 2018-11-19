var
    app = require('./app'),
    id = $("#kajuanId").val();


$.ajax({
    url:"/member/ajax",
    type:"get",
    data:{
        "type" : "get_activate_trade_num",
        "id":id
    },
    dataType:"json",
    success:function(res){
        if(res.code == 200){
            if(res.data.num > 0){
                $(".can-use").css("display","block");
            }
        }else{

        }
    },
    error:function(){
        alert("网络错误，请稍后再试");
    }
});