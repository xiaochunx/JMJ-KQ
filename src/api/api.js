import axios from 'axios'
import qs from 'qs'

// 配置域名
let base = '';
// 延迟时间
let timeOut = {timeout: 1000 * 60};

// 请求所有功能接口
export const requestAllFunction  = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysHome&action=wapmenu`,qs.stringify(params),timeOut).then(res => res.data); };

// 录入员工信息-二维码
export const requresEmployessInfo = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing&mod=erweima`,qs.stringify(params),timeOut).then(res => res.data)};

// 录入员工信息-初始化
export const requresEmployessinitialize = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing&mod=info`,qs.stringify(params),timeOut).then(res => res.data)};

// 录入员工信息-提交信息
export const requresEmployessPostMsg = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing`,qs.stringify(params),timeOut).then(res => res.data)};

// 门店位置-初始化
export const requestStoresInitialize = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysArea&action=store&mod=info`,qs.stringify(params),timeOut).then(res => res.data)};

// 门店位置-提交门店位置
export const storesLocationPostMsg = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysArea&action=store`,qs.stringify(params),timeOut).then(res => res.data)};

// 签到-初始化
export const signIninitialize = params => { return axios.post(`${base}/kqadmin/api.php?controller=ClockMain&action=index&mod=init`,qs.stringify(params),timeOut).then(res => res.data)};

// 日报-初始化
export const storesDailyInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatDay&action=index&mod=init`,qs.stringify(params),timeOut).then(res => res.data)};

// 日报-修改日报
export const editDailyInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatDay&action=index&mod=edit`,qs.stringify(params),timeOut).then(res => res.data)};

// 日报-确认日报
export const makeSureDailyInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatDay&action=index&mod=makesure`,qs.stringify(params),timeOut).then(res => res.data)};

// 月报-初始化
export const monthlyReportInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatMonth&action=index&mod=init`,qs.stringify(params),timeOut).then(res => res.data)};

// 月报-统计
export const monthlyChange = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatMonth&action=index&mod=stat`,qs.stringify(params),timeOut).then(res => res.data)};

// 月报-月报修改
export const monthlyEdit = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatMonth&action=index&mod=change`,qs.stringify(params),timeOut).then(res => res.data)};

// 月报-提醒审批
export const remindApproval = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatMonth&action=index&mod=sendmsg`,qs.stringify(params),timeOut).then(res => res.data)};

// 审批月报-初始化
export const monthlyApprovalInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatShenpi&action=index&mod=init`,qs.stringify(params),timeOut).then(res => res.data)};

// 审批月报-审批
export const monthlyApprovalPost = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatShenpi&action=index&mod=edit`,qs.stringify(params),timeOut).then(res => res.data)};

// 授权日报-初始化
export const dailyPaperInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=ShouquanRibao&action=index&mod=init`,qs.stringify(params),timeOut).then(res => res.data)};

// 授权日报-保存
export const dailySave = params => { return axios.post(`${base}/kqadmin/index.php?controller=ShouquanRibao&action=index&mod=edit`,qs.stringify(params),timeOut).then(res => res.data)};

// 代打卡-初始化
export const firstInstanceInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=ClockDaida&action=index&mod=init`,qs.stringify(params),timeOut).then(res => res.data)};

// 代打卡-保存
export const firstInstanceSave = params => { return axios.post(`${base}/kqadmin/index.php?controller=ClockDaida&action=index&mod=edit`,qs.stringify(params),timeOut).then(res => res.data)};

// 修改日志
export const modifyLogInitialize = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatChange&action=index`,qs.stringify(params),timeOut).then(res => res.data)};

// 统计月报-初始化
export const monthlyReport = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatMonthcount&action=index&mod=stat`,qs.stringify(params),timeOut).then(res => res.data)};

// 统计月报-考勤明细
export const monthlyRportDetail = params => { return axios.post(`${base}/kqadmin/index.php?controller=StatMonthcount&action=index&mod=detail`,qs.stringify(params),timeOut).then(res => res.data)};





// post请求示例
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// get请求示例
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// 如果post提交后台,需要将参数通过qs转化
export const postTest = params => { return axios.post(`${base}/kqadmin/api.php?controller=SysAdmin&action=yaoqing`,qs.stringify(params),timeOut).then(res => res.data)};
