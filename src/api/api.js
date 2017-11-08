import axios from 'axios'
import qs from 'qs'

// 配置域名
let base = 'http://kq.7kou.cn';



// 请求所有功能接口
export const requestAllFunction  = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysHome&action=wapmenu`,params).then(res => res.data); };

// 录入员工信息-二维码
export const requresEmployessInfo = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing&mod=erweima`,params).then(res => res.data)};

// 录入员工信息-初始化
export const requresEmployessinitialize = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing&mod=info`,params).then(res => res.data)};

// 录入员工信息-提交信息
export const requresEmployessPostMsg = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing`,qs.stringify(params)).then(res => res.data)};

// 门店位置-初始化
export const requestStoresInitialize = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysArea&action=store&mod=info`,params).then(res => res.data)};

// 门店位置-提交门店位置
export const storesLocationPostMsg = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing`,qs.stringify(params)).then(res => res.data)};

// 签到-初始化
export const signIninitialize = params => { return axios.post(`${base}/kqadmin/api.php?controller=ClockMain&action=index&mod=init`,params).then(res => res.data)};

// 日报-初始化
export const dailyPaperInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatDay&action=index&mod=init`,params).then(res => res.data)};

// 日报-确认日报
export const makeSureDaily = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatDay&action=index&mod=init`,params).then(res => res.data)};



// post请求示例
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// get请求示例
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// 如果post提交后台,需要将参数通过qs转化
export const postTest = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing`,qs.stringify(params)).then(res => res.data)};
