import Vue from 'vue'

export default {
  closePg(){
    //执行方法写这里
    Vue.wx.config({
      jsApiList: [
        'closeWindow'
      ]
    });
    Vue.wx.ready(function () {
      // 在这里调用 API
      Vue.wx.closeWindow();
    });
  }
};
