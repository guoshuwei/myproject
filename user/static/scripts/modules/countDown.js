var idmap = {};
//监听countDown
function CountDown(ele,api,params,servertime,id){
    this.ele = ele;
    this.checkInterval = params[2] ? params[2] : 300000;
    this.autoInterval = params[3] ? params[3] : 1000;
    this.targetTime = params[1] ? params[1] : 0;
    this.localTime = params[0] ? params[0] : 0;
    this.timer = false;
    this.checkservertime = servertime;
    this.id = id;
}

CountDown.prototype.time = function(callback,listener){

    var 
    that = this,
    _timer = false,
    flag =this.localTime,
    flagInterval = 0;
    
    function getTimeStr(num){
        
        var

        _s_ = 1000,
        _m_ = _s_ * 60,
        _h_ = _m_ * 60,
        _day_ = _h_ * 24,
        _month_ = _day_ * 30,
        _year_ = _day_ * 365,
        hasnum = num,

        _year = function(){
            if(num - _year_ >= 0){

                hasnum = hasnum - parseInt(num / _year_) * _year_;

                return parseInt(num / _year_);
            }
            return 0;

        }(),

        _month = function(){

            num = hasnum;

            if(num - _month_ >= 0){

                hasnum = hasnum - parseInt(num / _month_) * _month_;

                return parseInt(num / _month_);
            }
            return 0;
        }(),

        _day = function(){
            num = hasnum;

            if(num - _day_ >= 0){

                hasnum = hasnum - parseInt(num / _day_) * _day_;

                return parseInt(num / _day_);
            }
            return 0;
        }(),

        _h = function(){
            num = hasnum;

            if(num - _h_ >= 0){

                hasnum = hasnum - parseInt(num / _h_) * _h_;

                return parseInt(num / _h_);
            }
            return 0;
        }(),
        _m = function(){
            
            num = hasnum;

            if(num - _m_ >= 0){

                hasnum = hasnum - parseInt(num / _m_) * _m_;

                return parseInt(num / _m_);
            }
            return 0;
        }(),
        _s = function(){

            num = hasnum;

            if(num - _s_ >= 0){

                hasnum = hasnum - parseInt(num / _s_) * _s_;

                return parseInt(num / _s_);
            }

            return 0;
        }(),
        numberFormart = function(number){
            return number >= 10 ? number : '0'+number;
        },
        str = [];

        if(_year) str.push(_year+'年');
        if(_month) str.push(_month+'月');
        if(_day) str.push(_day+'日');
        if(_h) str.push(_h+'小时');
        if(_m) str.push(_m+'分');
        if(_s) str.push(_s+'秒');

        str.push('|');

        if(_year){
            str.push(numberFormart(_year));
        }else{
            str.push('00');
        }
        str.push(',');
        if(_month){
            str.push(numberFormart(_month));
        }else{
            str.push('00');
        }
        str.push(',');
        if(_day){
            str.push(numberFormart(_day));
        }else{
            str.push('00');
        }
        str.push(',');
        if(_h){
            str.push(numberFormart(_h));
        }else{
            str.push('00');
        }
        str.push(',');
        if(_m){
            str.push(numberFormart(_m));
        }else{
            str.push('00');
        }
        str.push(',');
        if(_s){
            str.push(numberFormart(_s));
        }else{
            str.push('00');
        }

        return str.join('');
    }


    this.timer = function(){
        if(!idmap[that.id]) return;


        if(flag >= that.targetTime){
            _timer = true;
            callback();
            return;
        }


        if(flagInterval == 0){

            function __timer(){

                if(_timer)return;

                $.ajax({
                    url:that.checkservertime,
                    type:"get",
                    success:function(res){
                        if(res.code == 200){
                            that.localTime = res.data.time * 1000;
                        }
                    }
                });

                setTimeout(__timer,300000);

            }
            __timer();
        }

        listener(getTimeStr(that.targetTime - flag),that.targetTime - flag);

        flag = parseInt(flag) + parseInt(that.autoInterval);

        flagInterval ++;

        setTimeout(that.timer,that.autoInterval);

    }
    this.timer();
}
/*
$('[role=countdown]').each(function(){
    
})
*/
exports.listen = function(el,callback,checkservertime,listener){

    var $this = el,
        api = $this.attr('role-api'),
        params;
    if(!api || api=='')
        return;
    else
        params = api.split('|');

    if(typeof params !=='undefined'){
        api = params[0];
        params = params[1]?params[1].split(','):[];
    }else{
        return;
    }

    var

    id = new Date().getTime();

    idmap[id] = id;

    var obj = new CountDown($this,api,params,checkservertime,id);

    obj.id = id;

    obj[api](callback,listener);

    return obj;
}

exports.cleartimer = function(id){
    if(idmap[id]){
        idmap[id] = null;
    }
}