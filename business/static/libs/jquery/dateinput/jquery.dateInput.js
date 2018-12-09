(function(a){function b(c,d){if(typeof(d)!="object"){d={}}a.extend(this,b.DEFAULT_OPTS,d);this.input=a(c);this.bindMethodsToObj("show","hide","hideIfClickOutside","keydownHandler","selectDate");this.build();this.selectDate();this.hide()}b.DEFAULT_OPTS={month_names:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],short_month_names:["1","2","3","4","5","6","7","8","9","10","11","12"],short_day_names:["日","一","二","三","四","五","六"],start_of_week:1,pos:{top:40,left:0}};b.prototype={build:function(){var d=a('<p class="month_nav"><span class="button prev">&#171;</span> <span class="month_name"></span> <span class="button next">&#187;</span></p>');this.monthNameSpan=a(".month_name",d);a(".prev",d).click(this.bindToObj(function(){this.moveMonthBy(-1);return false}));a(".next",d).click(this.bindToObj(function(){this.moveMonthBy(1);return false}));var c=a('<p class="year_nav"><span class="button prev" title="[Ctrl+Page-Up]">&#171;</span> <span class="year_name"></span> <span class="button next" title="[Ctrl+Page-Down]">&#187;</span></p>');this.yearNameSpan=a(".year_name",c);a(".prev",c).click(this.bindToObj(function(){this.moveMonthBy(-12);return false}));a(".next",c).click(this.bindToObj(function(){this.moveMonthBy(12);return false}));var f=a('<div class="nav"></div>').append(c,d);var e="<table><thead><tr>";a(this.adjustDays(this.short_day_names)).each(function(){e+="<th>"+this+"</th>"});e+="</tr></thead><tbody></tbody></table>";this.dateSelector=this.rootLayers=a('<div class="ui-dateinput"></div>').append(f,e).insertAfter(this.input);this.tbody=a("tbody",this.dateSelector);this.input.change(this.bindToObj(function(){this.selectDate()}));this.selectDate()},selectMonth:function(e){var k=new Date(e.getFullYear(),e.getMonth(),1);if(!this.currentMonth||!(this.currentMonth.getFullYear()==k.getFullYear()&&this.currentMonth.getMonth()==k.getMonth())){this.currentMonth=k;var d=this.rangeStart(e),j=this.rangeEnd(e);var h=this.daysBetween(d,j);var g="";for(var f=0;f<=h;f++){var c=new Date(d.getFullYear(),d.getMonth(),d.getDate()+f,12,0);if(this.isFirstDayOfWeek(c)){g+="<tr>"}if(c.getMonth()==e.getMonth()){g+='<td class="selectable_day" date="'+this.dateToString(c)+'">'+c.getDate()+"</td>"}else{g+='<td class="unselected_month" date="'+this.dateToString(c)+'">&nbsp;</td>'}if(this.isLastDayOfWeek(c)){g+="</tr>"}}this.tbody.empty().append(g);this.monthNameSpan.empty().append(this.monthName(e));this.yearNameSpan.empty().append(this.currentMonth.getFullYear());a(".selectable_day",this.tbody).click(this.bindToObj(function(i){this.changeInput(a(i.target).attr("date"))}));a("td[date="+this.dateToString(new Date())+"]",this.tbody).addClass("today");a("td.selectable_day",this.tbody).mouseover(function(){a(this).addClass("hover")});a("td.selectable_day",this.tbody).mouseout(function(){a(this).removeClass("hover")})}a(".selected",this.tbody).removeClass("selected");a("td[date="+this.selectedDateString+"]",this.tbody).addClass("selected")},selectDate:function(c){if(typeof(c)=="undefined"){c=this.stringToDate(this.input.val())}if(!c){c=new Date()}this.selectedDate=c;this.selectedDateString=this.dateToString(this.selectedDate);this.selectMonth(this.selectedDate)},fillZero:function (n){return n.toString().replace(/^(\d)$/, '0$1');},getDateDay:function(c){var d=c.split('-'),self=this;$.each(d, function(i, v){d[i]=self.fillZero(v);});if(this.format === 'yyyy.mm.dd'){return d.join('.');}return d.join('-');},changeInput:function(c){this.input.val(this.getDateDay(c)).change();this.hide()},show:function(){this.rootLayers.css("display","block");a([window,document.body]).click(this.hideIfClickOutside);this.input.unbind("focus",this.show);a(document.body).keydown(this.keydownHandler);this.setPosition()},hide:function(){this.rootLayers.css("display","none");a([window,document.body]).unbind("click",this.hideIfClickOutside);this.input.focus(this.show);a(document.body).unbind("keydown",this.keydownHandler)},hideIfClickOutside:function(c){if(c.target!=this.input[0]&&!this.insideSelector(c)){this.hide()}},insideSelector:function(c){var d=this.dateSelector.position();d.right=d.left+this.dateSelector.outerWidth();d.bottom=d.top+this.dateSelector.outerHeight();return c.pageY<d.bottom&&c.pageY>d.top&&c.pageX<d.right&&c.pageX>d.left},keydownHandler:function(c){switch(c.keyCode){case 9:case 27:this.hide();break;case 13:this.changeInput(this.selectedDateString);break;case 33:this.moveDateMonthBy(c.ctrlKey?-12:-1);break;case 34:this.moveDateMonthBy(c.ctrlKey?12:1);break;case 38:this.moveDateBy(-7);break;case 40:this.moveDateBy(7);break;case 37:this.moveDateBy(-1);break;case 39:this.moveDateBy(1);break;default:return}c.preventDefault()},stringToDate:function(c){var d;if(d=c.match(/^(\d{1,2}) ([^\s]+) (\d{4,4})$/)){return new Date(d[3],this.shortMonthNum(d[2]),d[1],12,0)}else{return null}},dateToString:function(c){return c.getFullYear()+"-"+this.short_month_names[c.getMonth()]+"-"+c.getDate()},setPosition:function(){this.rootLayers.css(this.pos)},moveDateBy:function(d){var c=new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth(),this.selectedDate.getDate()+d);this.selectDate(c)},moveDateMonthBy:function(d){var c=new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth()+d,this.selectedDate.getDate());if(c.getMonth()==this.selectedDate.getMonth()+d+1){c.setDate(0)}this.selectDate(c)},moveMonthBy:function(c){var d=new Date(this.currentMonth.getFullYear(),this.currentMonth.getMonth()+c,this.currentMonth.getDate());this.selectMonth(d)},monthName:function(c){return this.month_names[c.getMonth()]},bindToObj:function(d){var c=this;return function(){return d.apply(c,arguments)}},bindMethodsToObj:function(){for(var c=0;c<arguments.length;c++){this[arguments[c]]=this.bindToObj(this[arguments[c]])}},indexFor:function(e,d){for(var c=0;c<e.length;c++){if(d==e[c]){return c}}},shortMonthNum:function(c){return this.indexFor(this.short_month_names,c)},daysBetween:function(d,c){d=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate());c=Date.UTC(c.getFullYear(),c.getMonth(),c.getDate());return(c-d)/86400000},changeDayTo:function(d,c,f){var e=f*(Math.abs(c.getDay()-d-(f*7))%7);return new Date(c.getFullYear(),c.getMonth(),c.getDate()+e)},rangeStart:function(c){return this.changeDayTo(this.start_of_week,new Date(c.getFullYear(),c.getMonth()),-1)},rangeEnd:function(c){return this.changeDayTo((this.start_of_week-1)%7,new Date(c.getFullYear(),c.getMonth()+1,0),1)},isFirstDayOfWeek:function(c){return c.getDay()==this.start_of_week},isLastDayOfWeek:function(c){return c.getDay()==(this.start_of_week-1)%7},adjustDays:function(e){var d=[];for(var c=0;c<e.length;c++){d[c]=e[(c+this.start_of_week)%7]}return d}};a.fn.dateInput=function(c){return this.each(function(){new b(this,c)})};window.dateInput=b})(jQuery);