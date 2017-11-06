// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './utils/DataFormat.js'
import 'element-ui/lib/theme-default/index.css'
import FastClick from 'fastclick'

import Axios from 'axios'
// import element from 'element-ui'
import { Radio,Input } from 'element-ui'
// import './utils/wx.js'

Vue.prototype.$http = Axios;

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

// Vue.use(element);
Vue.use(Radio);
Vue.use(Input);
// 微信标题
Vue.use(require('vue-wechat-title'));

Vue.use(MintUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
