/**
 * author:  xiejun
 * e-mail:  jununx@qq.com
 * q    q:  121318538
 * updata:  2015/09/15
 * 
 * 倒计时
 * @param {[type]} options      [description]
 *                 count        倒计时毫秒
 *                 callback     回调函数，(是否结束, 倒计时对象)
 *                 speed        定时器间隔，默认1000ms
 */
function Countdown(options) {
	this.count = options.count || 60 * 1000; // 60秒
	this.callback = options.callback || function() {};
	this.timer = null;
	this.speed = options.speed || 1000;
	this.isRoll = true;
}
Countdown.prototype.calcCount = function() {
	var d, h, m, s, ms;
	this.count -= this.speed;

	if (this.count < 0) {
		clearInterval(this.timer);
		this.isRoll = false;
	} else {
		d = this.fillZero(parseInt(this.count / 1000 / 86400, 10));
		h = this.fillZero(parseInt(this.count / 1000 / 3600 % 24, 10));
		m = this.fillZero(parseInt(this.count / 1000 / 60 % 60, 10));
		s = this.fillZero(parseInt(this.count / 1000 % 60, 10));
		ms = this.fillZero(parseInt(this.count % 1000 / 10, 10));
	}
	this.callback(this.isRoll, {
		d: d,
		h: h,
		m: m,
		s: s,
		ms: ms
	});
};
Countdown.prototype.fillZero = function(v) {
	return v.toString().replace(/^(\d)$/, '0$1');
};
Countdown.prototype.init = function() {
	var that = this;
	this.calcCount();
	this.timer = setInterval(function() {
		that.calcCount();
	}, this.speed);
};