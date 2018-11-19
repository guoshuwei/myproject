$(window).ready(function(){
    var navDropDown = require('../modules/mobileIndexNav');//nav下拉框
    lidernav=require("../modules/index_slidenav"),
    navDropDown.animate($('[role-touch="nav"]'),$('[role-animate="nav"]'),'header-nav-animation-show','header-nav-animation-hide',500);

})