$.fn.tabControl = function(ops){
	ops = $.extend({
		hand:'.item',
		handleType:'mouseenter',
		delay:true,
		onOpenBefore:null,
		onOpen:null,
		handCurr:'current',
		targetCurr:'active',
		btn:null,
		auto:false,
		interval:3000,
		animate:null
	},ops);

	var self = $(this),
		hands = self.find(ops.hand),
		flag = $('.'+ops.handCurr,hands).index(),
		length = hands.length,
		timer,
		timeout,
		auto = {
		set : function(callback){
			if(ops.auto){
				timer = setInterval(function(){
					callback();
				},ops.interval);
			}
		},
		remove : function(){
			if(ops.auto){
				clearInterval(timer);
			}
		}
	}
	function handler(ele){

		var hand = $(ele),
			target = hand.attr('data-for');
		if(target){
			target = $('#'+target);
		}else{
			return;
		}
		flag = hand.index();

		if(ops.auto){
			auto.remove();
		}
		if(ops.delay && ops.handleType==='mouseenter'){
			timeout = setTimeout(function(){
				if(timeout)
					clearTimeout(timeout);
				if(ops.onOpenBefore)
					ops.onOpenBefore(hand,target);

				hand.parent().find('.'+ops.handCurr).removeClass(ops.handCurr);
				hand.addClass(ops.handCurr);
				target.parent().find('.'+ops.targetCurr).removeClass(ops.targetCurr);
				target.addClass(ops.targetCurr);
				
				if(ops.onOpen)
					ops.onOpen(hand,target);
			},ops.delay|150);

		}else{
			if(ops.onOpenBefore)
				ops.onOpenBefore(hand,target);

			hand.parent().find('.'+ops.handCurr).removeClass(ops.handCurr);
			hand.addClass(ops.handCurr);
			target.parent().find('.'+ops.targetCurr).removeClass(ops.targetCurr);
			target.addClass(ops.targetCurr);

			if(ops.onOpen)
				ops.onOpen(hand,target);

		}

		if(ops.auto){
			auto.set(function(){
				next.click();
			});
		}
		
	}
	hands.on(ops.handleType,function(e){
		handler(this);
	});

	if(ops.btn){
		var 
		prve = self.find('[prve=true]'),
		next = self.find('[next=true]');

		prve.click(function(){
			if(flag == 0){
				handler(hands[length - 1]);
			}else{
				handler(hands[flag-1]);
			}
			
		})
		next.click(function(){
			if(flag == length - 1){
				handler(hands[0]);
			}else{
				handler(hands[flag+1]);
			}


			
		})
	}

	if(ops.auto){
		auto.set(function(){
			next.click();
		});
	}

	if(ops.delay && ops.handleType==='mouseenter')
		hands.on('mouseleave',function(e){
			if(timeout)
				clearTimeout(timeout);
		})

    return this;

}
