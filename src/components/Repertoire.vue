<template>
  <div v-wechat-title="$route.meta.title">
    <mt-index-list :show-indicator="false">
      <mt-index-section index=" " v-for="(item,count) in list" :key="count">
        <mt-cell v-for="(value,index) in item" :title="value.name" is-link :to="value.url" :key="index">
          <img slot="icon" :src="value.src" width="24" height="24" style="margin-right: 20px">
        </mt-cell>
      </mt-index-section>
    </mt-index-list>

    <mt-popup
      v-model="popupSubmit"
      :closeOnClickModal="false"
    >
      <div class="maskT">
        <div class="msgTip">{{msgTip}}</div>
        <div class="footerBtn">
          <mt-button @click="sureBtn">确认</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {requestAllFunction} from '../api/api'

  export default {
    data() {
      return {
        popupSubmit: false,
        loading: true,
        msgTip: "",
        tipMsg: "正在加载中...",
        code: null,
        list: [],
        /*
        [
          [
            {
              name: "邀请员工",
              url: "/InviteEmployees",
              src: "./static/repertoire/InviteEmployees.png"
            },
            {
              name: "日报授权",
              url: "/DailyPaper",
              src: "./static/repertoire/DailyPaper.png"
            },
            {
              name: "代打卡",
              url: "/FirstInstance",
              src: "./static/repertoire/FirstInstance.png"
            }
          ], [
            {
              name: "门店位置",
              url: "/StoreLocation",
              src: "./static/repertoire/StoreLocation.png"
            },
            {
              name: "门店日报",
              url: "/StoresDaily",
              src: "./static/repertoire/StoresDaily.png"
            },
            {
              name: "门店月报",
              url: "/MonthlyReport",
              src: "./static/repertoire/MonthlyReport.png"
            }
          ], [
            {
              name: "月报审批",
              url: "/MonthlyApproval",
              src: "./static/repertoire/MonthlyApproval.png"
            },
            {
              name: "统计月报",
              url: "/StatisticsMonthlyReport",
              src: "./static/repertoire/StatisticsMonthlyReport.png"
            },
            {
              name: "修改日志",
              url: "/ModifyLog",
              src: "./static/repertoire/ModifyLog.png"
            }
          ]
        ]
        */
      }
    },
    components: {},
    methods: {
      sureBtn() {
        if (this.code == -1 || this.code == 3 || this.code == 4 || this.code == 2) {
          this.wx.closeWindow();
        } else {
          this.popupSubmit = false;
        }
      }
    },
    mounted() {
      var _this = this;

      requestAllFunction().then((res) => {

        _this.code = res.code;
        _this.msgTip = res.msg;
        if (res.code == 1) {
          _this.loading = false;
          _this.list = res.data;
        } else {
          _this.tipMsg = res.msg;
          _this.popupSubmit = true;
        }
      })
        .catch((error) => {
          console.log(error);
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .backColor {
    .mint-indexlist {
      .mint-indexlist-content {
        margin-right: 0 !important;
        li.mint-indexsection:nth-child(1) {
          > p.mint-indexsection-index {
            padding: 0 !important;
          }
        }
      }
    }
    .mint-indexlist-nav {
      display: none !important;
    }
  }

  .maskT {
    width: 220px;
    padding: 30px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    .msgTip {
      margin-bottom: 20px;
      color: #ed1204;
      font-size: 20px;
    }
    .footerBtn {
      width: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .mint-button--normal {
        flex: 1;
        background: -webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
        color: white;
        height: 42px;
        font-size: 16px;
      }
    }
  }
</style>
