export const dateFormat = function (date, fmt) {
  let ret;
  fmt = fmt ? fmt : 'YYYY-mm-dd HH:MM:SS'
  const opt = {
      'Y+': date.getFullYear().toString(),        // 年
      'm+': (date.getMonth() + 1).toString(),     // 月
      'd+': date.getDate().toString(),            // 日
      'H+': date.getHours().toString(),           // 时
      'M+': date.getMinutes().toString(),         // 分
      'S+': date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
      }
  }
  return fmt;
}

export const formatPrice = function(val = 0){

  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  let str = (val- 0).toFixed(2);
  let intSum = str.substring(0,str.indexOf('.')).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
  let dot = str.substring(str.length,str.indexOf('.'))//取到小数部分搜索
  let ret = intSum + dot;
  return ret;
}  
