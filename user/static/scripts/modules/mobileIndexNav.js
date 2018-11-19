
    exports.animate=function(trigerbtn,motionbtn,class1,class2,time){
        var navbtn=trigerbtn,
            navoff=false,
            navparents=motionbtn;
        navbtn.on('touchend',function(){
            if(navoff) return false;
            navoff=true;
            if(navparents.hasClass(class1)){
                navparents.removeClass(class1).addClass(class2);;
            }else{
                navparents.removeClass(class2).addClass(class1);
            }
            setTimeout(function(){
                navoff=false;
            },time);
            return false;
        })
    }
