import axios from 'axios'

let base = 'http://kq.7kou.cn';

export const requestAllFunction  = params => { return axios.get(`${base}/kqadmin/api.php?controller=SysHome&action=wapmenu`,params).then(res => res.data); }
