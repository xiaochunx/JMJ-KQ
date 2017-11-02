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


export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

//
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
