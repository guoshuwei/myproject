var number = require('./number');

var computerBase = {
    checkNumber: function(n){
        return /^[\d\.]+$/.test(n);
    },
    Number: function(n){
        return computerBase.checkNumber(n) ? parseFloat(n) : 0;  
    },
    debxComputer: function(money, percent, date, format) {
      var obj, obj1,
          A = money, B = percent / 12,
          N = date * 1;
      return {
          money: computerBase.toNum(A,format),
          month: computerBase.toNum(N,format),
          per : computerBase.toNum(A * B * Math.pow(1+B, N)/(Math.pow((1+B),N) - 1),format),
          ext : computerBase.toNum(A * N * B * Math.pow(1+B, N) / (Math.pow(1+B, N) - 1) - A,format),
          total: computerBase.toNum(A * N * B * Math.pow(1+B, N)/(Math.pow(1+B, N) - 1),format)
      };
    },
    simpleComputer:function(money,percent,date,format){
      return {
        money:computerBase.toNum(money,format),
        per:computerBase.toNum(money*percent,format),
        ext:computerBase.toNum(money*percent*date,format),
        total:computerBase.toNum(money*1+money*percent*date*1,format)
      }
    },
    toNum: function(num, format){
        num = computerBase.Number(num);
        if(!num) return "";
        
        if (format) {
            return number.format(Math.round(num*1000)/1000, 2, '.', ',');
        } else {
            return Math.round(num*1000)/1000;
        }
    }
}

//等额本息计算
exports.debx = computerBase.debxComputer;
//能用计算器
exports.get = computerBase.simpleComputer;

exports.toNum = computerBase.toNum;