var animate = require('../modules/animate'),
    template = require('../modules/template'),
    printInfo = function(_id,_this){
        $.ajax({
            url : "/member/assetsp2pLoan/",
            type : "get",
            data : {
                id : _id
            },
            dataType : "json",
            success : function(res){
                _this && _this.removeClass("disabled");
                animate.loading().hide();
                if(res.code == 200){
                    res.data.id = _id;
                    var el = template.render("assetsp2ploanTpl",res.data);
                    $(".assetsp2ploan-float").length && $(".assetsp2ploan-float").remove();
                    $("body").append(el);
                }else{
                    _Fn.alert(res.message);
                }
            },
            error : function(){
                _this && _this.removeClass("disabled");
                animate.loading().hide();
                _Fn.alert("网络错误，请稍后再试");
            }
        });
    };

    // 放在window下  是为了其他js也可以调用(重新打开标的详情的弹窗)
    window.printInfo = printInfo;

$("body")
    .on("click","[role=assetsp2ploan]",function(){

        var $this = $(this),
            thisId = $this.attr("role-api");

        if($this.hasClass("disabled"))return;
        $this.addClass("disabled");
        animate.loading().show($this);

        printInfo(thisId,$this);
    })
    .on("click",".loan-float-colse-fn",function(){
        $(".assetsp2ploan-float").remove();
    });

