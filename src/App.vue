<template>
  <div id="app" class="backColor">
    <router-view/>
  </div>
</template>

<!--提示弹窗-->


<script>
  import Axios from 'axios'
  import { Loading } from 'element-ui'

export default {
  name: 'app',
  mounted(){
    var loadinginstace;
    Axios.interceptors.request.use(config => {
      loadinginstace = Loading.service({ fullscreen: true })
      return config
    }, error => {
      return Promise.reject(error)
    });


    Axios.interceptors.response.use(data => {// 响应成功关闭loading
      loadinginstace.close();

      return data
    }, error => {
      return Promise.reject(error)
    });
  }
}
</script>

<style lang="less">
  @import "./style/reset.css";
  @import "./style/animation.css";
  @import "./style/main.less";
</style>
