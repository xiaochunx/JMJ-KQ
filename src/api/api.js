import axios from 'axios'

let base = 'http://kq.7kou.cn';

// 请求所有功能接口
export const requestAllFunction  = params => { return axios.get(`${base}/kqadmin/api.php?controller=SysHome&action=wapmenu`,params).then(res => res.data); }


