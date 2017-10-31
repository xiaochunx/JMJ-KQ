<template>
  <div v-wechat-title="$route.meta.title">
    <!--<mt-button @click="openPop">按钮</mt-button>
    <mt-popup
      v-model="popupVisible"
      :closeOnClickModal="true"
      position="bottom"
    >
      <mt-picker :slots="slots" @change="onValuesChange" confirmText="sdasf" style="width:100%"></mt-picker>
    </mt-popup>


      <mt-field label="邮箱" state="success" v-model="email" placeholder="请输入密码" @click.native="openPop">
      </mt-field>-->
    <div class="top">
      <span>{{title}}</span>
    </div>

    <div class="middle">
      <div class="mTop">
        <img src="/static/employees/top.jpg" alt="图片不见啦" style="width: 217.5px;height: 123.5px;margin-left: 80px">
      </div>
      <div class="mMid">
        <img src="/static/employees/middle.png" alt="图片不见啦" style="width: 151px;height: 163px">
        <!--<img :src="imgSrc" alt="图片不见啦" style="width: 151px;height: 163px">-->
      </div>
      <div class="mFoo">
        <img src="/static/employees/bottom.png" alt="图片不见啦" style="width: 245px;height: 173px">
      </div>
    </div>

    <div class="footer">
      <div class="footerBtn">
        <mt-button @click="changeRouter">录入前厅店员</mt-button>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgSrc: "http://n.sinaimg.cn/news/transform/20171031/aLsa-fynfvar5426134.jpg",
        title: "天河店-前厅",
        /*popupVisible: false,
        email: '',
        slots: [
          {
            flex: 1,
            values: ['大学','高中','小学','本科','专科'],
            className: 'slot1',
            textAlign: 'center'
          }
        ]*/

      }
    },
    methods: {
      changeRouter(){
        this.$router.push("/InviteEmployees/InputInformation");
      }
      /*changes(){
        // input information
        this.$router.push("/InviteEmployees/InputInformation");
      },
      openPop(){
        this.popupVisible = true;
      },
      onValuesChange(picker, values) {
        this.email = values[0];
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      },
      getSlotValue(value){
        console.log(value);
      }*/
    }
  }
</script>
<style scoped lang="less">
  /*.mint-popup-bottom{
    width: 100% ;
  }*/

  .top {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 44px;
    background-color: #fff;
    font-size: 24px;
    color: #ed1204;
  }

  .middle {
    margin-top: 10px;
    padding: 0 40px;
    background-color: #fff;
    height: 500px;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    flex-direction: column;
    .mTop{
      padding-top: 27px;
      z-index: 200;
      img{
        margin-right: 12px;
        width: 151px;
        height: 163px;
      }
    }
    .mMid{
      position: relative;
      z-index: 100;
      img{
        position: absolute;
        left: 50%;
        top: -6.5px;
        margin-left: -70.5px;
      }
    }
    .mFoo{
      margin-top: 64px;
    }
  }

  // footer
  .footer {
    display: flex;
    margin-top: 34px;
    .footerBtn {
      padding: 0 40px;
      width: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .mint-button--normal {
        flex: 1;
        background:-webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
        color: white;
        height: 42px;
        font-size: 16px;
      }
    }
  }
</style>
