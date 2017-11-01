<template>
  <div v-wechat-title="$route.meta.title" id="monthlyApp">
    <div class="cell" v-for="(value,index) in list" :key="index" @click="affirm(index)">
      <div class="top">
        <span class="tip margin">审批状态提醒</span>
        <span class="date gColor">{{value.dateTime}}</span>
      </div>
      <div class="middle">
        <span class="item margin">门店： <span class="gColor">{{value.shop}}</span></span>
        <span class="item margin">店长： <span class="gColor">{{value.shopManager}}</span></span>
        <span class="item margin">申请时间： <span class="gColor">{{value.applyTime}}</span></span>
        <span class="item margin">状态： <span :class="{rColor : value.status == '未处理',fColor : value.status == '已完成' }">{{value.status}}</span></span>
      </div>
      <div class="footer">
        <span class="item margin">申请详情:</span>
        <span class="item gColor margin" v-for="(item,index) in value.applyMsg">{{item.msg}}</span>
      </div>
    </div>


    <mt-popup
      v-model="popupSubmit">
      <div class="mask">
        <div class="msgTip">审批是否通过</div>
        <div class="footerBtn">
          <mt-button @click="isSure(true)">通过</mt-button>
          <mt-button @click="isSure(false)">不通过</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        popupSubmit: false,
        index: "",
        list: [
          {
            dateTime: "9月24号",
            shop: "天河店",
            shopManager: "陈俊文",
            applyTime: "2017-09-01 10:10:32",
            status: "未处理",
            applyMsg: [
              {
                msg: "小王,2017-08-01,未签到改已签到"
              },
              {
                msg: "小王,2017-08-01,未签到改已签到"
              }
            ]
          },
          {
            dateTime: "9月24号",
            shop: "天河店",
            shopManager: "陈俊文",
            applyTime: "2017-09-01 10:10:32",
            status: "未处理",
            applyMsg: [
              {
                msg: "小王,2017-08-01,未签到改已签到"
              },
              {
                msg: "小王,2017-08-01,未签到改已签到"
              }
            ]
          },
          {
            dateTime: "9月24号",
            shop: "天河店",
            shopManager: "陈俊文",
            applyTime: "2017-09-01 10:10:32",
            status: "未处理",
            applyMsg: [
              {
                msg: "小王,2017-08-01,未签到改已签到"
              },
              {
                msg: "小王,2017-08-01,未签到改已签到"
              }
            ]
          }
        ]
      }
    },
    methods: {
      affirm(index){

        this.popupSubmit = true;
        this.index = index;
      },
      isSure(flag){

        this.popupSubmit = false;

        // 通过
        if (flag){
          this.list[this.index].status = '已完成';
        }else {
          // 不通过
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  #monthlyApp{
    padding: 22px 20px 0 20px;
    color: #282828;
    .cell{
      margin-bottom: 22px;
      background: white;
      padding: 24px 0 20px 12px;
      .top{
        display: flex;
        flex-direction: column;
        .tip{
          font-size: 14px;
        }
        .date{
          font-size: 12px;
        }
      }
      .middle{
        margin-right: 10px;
        margin-top: 24px;
        padding-bottom: 9px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #d4d4d4;

      }
    }
    .footer{
      margin-top: 16px;
      display: flex;
      flex-direction: column;
    }
  }


  .mask{
    width: 220px;
    padding: 30px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    .msgTip{
      margin-bottom: 20px;
      font-size: 20px;
    }
  }

  .footerBtn {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .mint-button--normal:nth-child(1) {
      flex: 1;
      background:-webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
      color: white;
      height: 42px;
      font-size: 16px;
      margin-right: 10px;
    }
    .mint-button--normal:nth-child(2) {
      margin-left: 10px;
      flex: 1;
      background-color: rgb(201,201,201);
      color: white;
      height: 42px;
      font-size: 16px;
    }
  }


  .item{
    font-size: 12px;
  }

  .gColor{
    color: #d4d4d4;
  }
  .margin{
    margin-bottom: 7px;
  }

  .fColor{
    color: #1d7fe4;
  }

  .rColor{
    color: #e20a07;
    text-decoration:underline;
  }
</style>
