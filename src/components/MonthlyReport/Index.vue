<template>
  <div v-wechat-title="$route.meta.title">
    <div class="top">
      <div class="topBtn">
        <img src="../../assets/logo.png" width="24" height="24" style="margin-right: 20px">
        <span @click="openPicker">{{pickerData}}</span>
        <span>3</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        pickerData: ""
      }
    },
    methods: {
      openPicker(){}
    }
  }
</script>
<style lang="less" scoped>
  // top
  .top{
    padding: 8px;
    display: flex;
  .topBtn{
    background-color: #ed1204;
    height: 29px;
    color: white;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  /*width: 100%;*/
  img{
    margin-left: 20px;
    background-color: #fff;
  }
  span:nth-child(2){
    flex: 8;
    width: 30px;
  }
  span:nth-child(3){
    flex: 1;
    background-color: blue;
  }

  }
  }
</style>
