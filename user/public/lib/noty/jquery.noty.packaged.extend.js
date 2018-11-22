function notyTip(pos,type,msg){
	noty({
		layout: pos,  // 默认布局
	    theme: 'defaultTheme', // 默认主题
	    type: type, // 默认类型
	    text: msg, //默认文本
	    dismissQueue: true, // 是否添加到队列
	    // template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',  // 消息默认模板
	    animation: { //默认的显示及关闭动画
	        open: {height: 'toggle'},
	        close: {height: 'toggle'},
	        easing: 'swing',
	        speed: 800 // opening & closing animation speed
	    },
	    timeout: 1600, // 自动关闭时间,默认不会自动关闭
	    modal: true, // 遮罩
	    maxVisible: 3, // 一个队列的消息最大可见数量, 即一个队列中同一时间最多显示的数量
	    closeWith: ['click'], // ['click', 'button', 'hover'] 关闭的事件,默认点击消息关闭
	    // callback: { // 回调函数
	    //     onShow: function() {}, // 显示之前
	    //     afterShow: function() {}, // 显示之后
	    //     onClose: function() {}, // 关闭之前
	    //     afterClose: function() {} // 关闭之后
	    // },
	    // buttons: false // 按钮,用于在弹出的消息框中显示按钮
	});
}

function notyAlert(msg,sucFunc){
	noty({
		layout: 'center',  // 默认布局
	    type: 'warning', // 默认类型
	    text: msg, //默认文本
	    animation: { //默认的显示及关闭动画
	        open: {height: 'toggle'},
	        close: {height: 'toggle'},
	        easing: 'swing',
	        speed: 500 // opening & closing animation speed
	    },
	    modal: true, // 遮罩
	    maxVisible: 1, // 一个队列的消息最大可见数量, 即一个队列中同一时间最多显示的数量
	    closeWith: ['button'], // ['click', 'button', 'hover'] 关闭的事件,默认点击消息关闭
	    buttons: [
		    {addClass: 'btn btn-primary', text: '确定', onClick: function($noty) {
		        // this = button element 也就是当前的按钮
		        // $noty = $noty element 也就是当前这个提示信息对象
		        $noty.close();
		        sucFunc();
		      	}
		    },
		    {addClass: 'btn btn-danger', text: '取消', onClick: function($noty) {
		        $noty.close();
		    	}
		    }
		]
	});
}