;
//通过class获取元素
function getClass(cls){
    var ret = [];
    var els = document.getElementsByTagName("*");
    for (var i = 0; i < els.length; i++){
        //判断els[i]中是否存在cls这个className;.indexOf("cls")判断cls存在的下标，如果下标>=0则存在;
        if(els[i].className === cls || els[i].className.indexOf("cls")>=0 || els[i].className.indexOf(" cls")>=0 || els[i].className.indexOf(" cls ")>0){
            ret.push(els[i]);
        }
    }
    return ret;
}
function getStyle(obj,attr){//解决JS兼容问题获取正确的属性值
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
//开始移动

// function startMove(obj,json,fun){
// 	alert(1111);
// 	clearInterval(obj.timer);//清除定时器
// 	obj.timer = setInterval(function(){
// 		alert(2222);
// 		var isStop = true;//初始化
// 		console.log(1111);
// 		console.log(isStop);
// 		for(var attr in json){
// 			var iCur = 0;
// 			//判断运动的是不是透明度值
// 			if(attr=="opacity"){
// 				iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
// 			}else{
// 				iCur = parseInt(getStyle(obj,attr));
// 			}
// 			var ispeed = (json[attr]-iCur)/8;
// 			//运动速度如果大于0则向下取整，如果小于0想上取整；
// 			ispeed = ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);
// 			//判断所有运动是否全部完成
// 			if(iCur!=json[attr]){
// 				isStop = false;
// 			}
// 			//运动开始
// 			if(attr=="opacity"){
// 				obj.style.filter = "alpha:(opacity:"+(json[attr]+ispeed)+")";
// 				obj.style.opacity = (json[attr]+ispeed)/100;
// 			}else{
// 				obj.style[attr] = iCur+ispeed+"px";
// 			}
// 		}
// 		//判断是否全部完成
// 		if(isStop){
// 			console.log(isStop);
// 			clearInterval(obj.timer);
// 			if(fun){
// 				fun();
// 			}
// 		}
// 	},30);
// }
/* 代码整理：大头网 www.datouwang.com */