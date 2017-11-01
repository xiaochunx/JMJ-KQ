<template>
  <!-- 门店日报 -->
  <div v-wechat-title="$route.meta.title" class="backColor" id="storeDaily">
    <div class="top">
      <div class="topBtn">
        <img src="../../assets/logo.png" width="24" height="24" style="margin-right: 20px">
        <span @click="openPicker">{{pickerData}}</span>
        <span>3</span>
      </div>
    </div>

    <div class="middle">
      <div class="middleTable">
        <div class="title">姓名</div>
        <div class="title">考勤</div>
      </div>

      <div style="overflow-y: scroll;height: 450px">
        <div class="middleMsg" v-for="(item,index) in list" :key="index">
          <div class="titleName">{{item.name}}</div>
          <div class="titleMsg" @click="open(index)">
            <span v-if="item.type == 0" style="color: #ed1204">{{item.detail | FormatDate}}</span>
            <span v-if="item.type == 1" style="color: deepskyblue">{{item.detail | FormatDate}}</span>
            <span v-if="item.type == 2" style="color: lightcoral">{{item.detail | FormatDate}}</span>
            <span v-if="item.type == 3" style="">{{item.detail | FormatDate}}</span>
            <img src="../../assets/logo.png" width="24" height="24">
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footerBtn">
        <mt-button>确认日报</mt-button>
      </div>
    </div>

    <mt-datetime-picker
      ref="picker"
      type="date"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      v-model="pickerValue"
      @confirm="handleConfirm"
      :closeOnClickModal="false"
    >
    </mt-datetime-picker>

    <mt-popup
      v-model="popupVisible"
      >
      <div class="mask">
        <div class="content">
          <mt-button class="item" @click.native="selected(index)" :class="{'itemR' : value.selected === true}" v-for="(value, index) in detail" :key="index" >{{value.msg}}</mt-button>
        </div>

        <div class="maskBtn">
          <mt-button @click="sure">确定</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>

  import Vue from 'vue'

  //过滤器
  Vue.filter('FormatDate', function(item) {
    var str = "";
    item.forEach(function (value, index) {
      str = value + '+' + str;
    });

    str = str.substring(0, str.lastIndexOf('+'));
    return str;
  });


  export default {

    data(){
      return{
        popupVisible: false,   // 控制蒙版的显隐
        pickerValue: "",
        pickerData: new Date().Format("yyyy-MM"),
        list: [
          {
            name: "程俊文",
            detail: ["已签到","未签到"],
            type: 0         // 红色
          },
          {
            name: "程俊文",
            detail: ["已签到"],
            type: 1         // 蓝色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 2         // 橙色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
          {
            name: "程俊文",
            detail: ["未签到"],
            type: 3         // 黑色
          },
        ],
        detail: [
          {
            msg: "未签到",
            selected: true
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          }
        ],
        startDate: new Date('2014-1-1'),
        endDate: new Date()
      }
    },
    methods: {
      open(index){
        this.popupVisible = true;
      },
      selected(index){
        this.detail[index].selected = !this.detail[index].selected;
      },
      sure(){
        this.popupVisible = false;
      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(){
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM");
      }
    },
    computed: {

    }
  }
</script>
<style lang="less" scoped>
  #storeDaily{
    height: 100%;
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
    // table
    .middle{
      width: 100%;

      height: 500px;
      .middleTable{
        display: flex;
        background-color: rgb(245,245,245);
        .title{
          font-size: 14px;
          font-weight: 200;
          color: #ed1204;
          flex: 1;
          background-color: #fff;
          text-align: center;
          line-height: 45px;
          margin-right: 1px;
          margin-bottom: 1px;
        }
      }
    }

    .middleMsg{
      display: flex;
      background-color: rgb(245,245,245);
    }
    .titleName,.titleMsg{
      background-color: #fff;
      margin-bottom: 1px;
      flex: 1;
      text-align: center;
      line-height: 45px;
      margin-right: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 200;
      font-size: 14px;
    }

    // footer
    .footer{
      display: flex;
      margin-top: 40px;
      .footerBtn{
        padding: 0 10px;
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .mint-button--normal{
          flex: 1;
          background:-webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
          color: white;
        }
      }
    }

    // 蒙版
    .mask{
      width: 300px;
      padding: 20px 15px 20px 15px;
      .content{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
        .item{
          width: 80px;
          text-align: center;
          margin-right: 6.6px;
          margin-left: 6.6px;
          margin-bottom: 13px;
          background-color: rgb(201,201,201);
          color: white;
        }
      }

      .maskBtn{
        padding: 20px 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .mint-button--normal{
          flex: 1;
          color: white;
          background:-webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
        }
      }
      .itemR{
        background-color: #ed1204 !important;
      }
    }
  }
</style>
