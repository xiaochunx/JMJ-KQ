/**
 * 验证身份证是否合法
 * @type {{"11": string, "12": string, "13": string, "14": string, "15": string, "21": string, "22": string, "23": string, "31": string, "32": string, "33": string, "34": string, "35": string, "36": string, "37": string, "41": string, "42": string, "43": string, "44": string, "45": string, "46": string, "50": string, "51": string, "52": string, "53": string, "54": string, "61": string, "62": string, "63": string, "64": string, "65": string, "71": string, "81": string, "82": string, "91": string}}
 */
/*
var aCity = {
  11: "北京",
  12: "天津",
  13: "河北",
  14: "山西",
  15: "内蒙古",
  21: "辽宁",
  22: "吉林",
  23: "黑龙江",
  31: "上海",
  32: "江苏",
  33: "浙江",
  34: "安徽",
  35: "福建",
  36: "江西",
  37: "山东",
  41: "河南",
  42: "湖北",
  43: "湖南",
  44: "广东",
  45: "广西",
  46: "海南",
  50: "重庆",
  51: "四川",
  52: "贵州",
  53: "云南",
  54: "西藏",
  61: "陕西",
  62: "甘肃",
  63: "青海",
  64: "宁夏",
  65: "新疆",
  71: "台湾",
  81: "香港",
  82: "澳门",
  91: "国外"
}

function isCardID(sId) {
  var iSum = 0;
  var info = "";
  if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
  sId = sId.replace(/x$/i, "a");
  if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
  sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
  var d = new Date(sBirthday.replace(/-/g, "/"));
  if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
  for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
  if (iSum % 11 != 1) return "你输入的身份证号非法";
  //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
  return true;
}*/

function isCardID(idcode) {

  // 加权因子
  var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  var code = idcode + "";
  var last = idcode[17];//最后一个

  var seventeen = code.substring(0, 17);
  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  var arr = seventeen.split("");
  var len = arr.length;
  var num = 0;
  for (var i = 0; i < len; i++) {
    num = num + arr[i] * weight_factor[i];
  }

  // 获取余数
  var resisue = num % 11;
  var last_no = check_code[resisue];

  // 格式的正则
  // 正则思路
  /*
30     第一位不可能是0
31     第二位到第六位可以是0-9
32     第七位到第十位是年份，所以七八位为19或者20
33     十一位和十二位是月份，这两位是01-12之间的数值
34     十三位和十四位是日期，是从01-31之间的数值
35     十五，十六，十七都是数字0-9
36     十八位可能是数字0-9，也可能是X
37     */
  var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

  // 判断格式是否正确
  var format = idcard_patter.test(idcode);

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return last === last_no && format ? true : false;
}


module.exports = {
  isCardID
};



