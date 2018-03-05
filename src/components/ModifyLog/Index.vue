<template>
  <div v-wechat-title="$route.meta.title" id="monthlyReport">
    <div class="top">
      <div class="topBtn" @click="openPicker">
        <img :src="'./static/storesDaily/data.png'" width="24" height="24" style="margin-right: 20px">
        <span>{{pickerData}}</span>
        <span>
          <img :src="'./static/storesDaily/xiala.png'" alt="" style="width: 14px;height: 10px">
        </span>
      </div>
      <div class="topBtn" style="margin-left: 10px" @click="openPopup">
        <img :src="'./static/storesDaily/dian.png'" width="24" height="24" style="margin-right: 20px">
        <span :class="{'smallSize' : storesName.length > 5}">{{storesName}}</span>
        <span>
          <img :src="'./static/storesDaily/xiala.png'" alt="" style="width: 14px;height: 10px">
        </span>
      </div>
    </div>
    <div class="middle">
      <div class="middleTable">
        <div class="title" v-for="(value,index) in title" :key="index" :class="{'titleD' : title.length - 1 == index }">
          {{value}}
        </div>
      </div>
      <div style="overflow-y: scroll;height:450px">
        <div class="middleMsg" v-for="(item,index) in list" :key="index">
          <div class="titleName">{{item.name}}</div>
          <div class="titleName">{{item.old_state}}</div>
          <div class="titleName">{{item.new_state}}</div>
          <div class="titleName">{{item.op_name}}</div>
          <div class="titleName">{{item.spop_name}}</div>
          <div class="titleName titleD">{{item.time}}</div>
          <!-- <div class="titleName titleD">
             <span v-for="(value,index) in item.changeTime">{{value}}</span>
           </div>-->
        </div>
      </div>
    </div>


    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="popupTittle">
        <span class="cell" @click="operation(1)">取消</span>
        <span class="cell" @click="operation(2)">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>

    <mt-datetime-picker
      ref="picker"
      type="date"
      month-format="{value} 月"
      date-format="{value} 日"
      :endDate="endDate"
      v-model="pickerValue"
      @confirm="handleConfirm"
      :closeOnClickModal="false"
    >
    </mt-datetime-picker>

    <div class="msgTip">
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

  </div>
</template>
<script>

  import {modifyLogInitialize} from '../../api/api.js'

  export default {
    data() {
      return {
        popupSubmit: false,
        msgTip: "",
        popupVisible: false,                       // popup弹窗
        pickerValue: new Date().Format("yyyy-MM-dd"),                           // 日期 -> 未转化
        storesNameIn: "",                          // 临时存储门店名称
        pickerData: new Date().Format("yyyy-MM"),
        storesName: "",                           // 门店名称
        code: null,                                // 记录当前返回code值
        list: [
          {
            name: "黄秀",
            old_state: "未签到",
            new_state: "已签到",
            op_name: "陈俊文",
            spop_name: "陈俊文",
            time: "2017-88-01 19:49:47"
          }
        ],                               // 详情列表
        title: ["店员姓名", "修改前", "修改后", "修改人", "审批人", "修改时间"],      // 表头列表
        endDate: new Date(),                      // 日历列表结束日期
        slots: [
          {
            flex: 1,
            values: ['天河北店', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'center'
          }]
      }
    },
    methods: {
      openPopup() {
        this.popupVisible = true;
      },
      onValuesChange(picker, values) {
        if (values[0]) {
          this.storesNameIn = values[0];
        }
      },
      selected(index) {
        this.detail[index].selected = !this.detail[index].selected;
      },
      sure() {
        if (this.code == -1 || this.code == 3 || this.code == 4){
          this.wx.closeWindow();
        }else {
          this.popupVisible = false;
        }
      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm() {
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM");
        // 在这里发送网络请求
        this.apiInitialize();
      },
      operation(value) {
        // 确认
        if (value == 2) {
          if (this.storesNameIn != '') {
            this.storesName = this.storesNameIn;
            // 在这里发送网络请求
            this.apiInitialize();
          }
        }
        // 退出蒙版
        this.popupVisible = false;
      },
      apiInitialize() {
        var _this = this;

        var params = {
          month: this.pickerData,
          store: this.storesName
        };

        modifyLogInitialize(params).then((res) => {
          _this.code = res.code;

          if (res.code == 1) {
            _this.slots[0].values = res.data.stores;
            _this.list = res.data.list;

          } else {
            _this.msgTip = res.msg;
            _this.popupSubmit = true;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      sureBtn() {
        this.popupSubmit = false;
      },
    },
    mounted() {
      var _this = this;

      var params = {
        month: this.pickerData,
        store: this.storesName
      };

      modifyLogInitialize(params).then((res) => {

        _this.code = res.code;
        if (res.code == 1) {
          _this.storesName = res.data.stores[0];
          _this.apiInitialize();

        } else {

          _this.msgTip = res.msg;
          _this.popupSubmit = true;
        }
      }).catch((err) => {
        console.log(err);
      });

      // 移除日期控件
      setTimeout(function () {
        var dom = document.querySelectorAll('.picker-slot-center');
        if (dom.length == 4) {
          dom[3].remove();
        }
      }, 100)
    }
  }
</script>
<style lang="less" scoped>
  #monthlyReport {
    height: 100%;
    .top {
      padding: 8px;
      display: flex;
      .topBtn {
        background-color: #ed1204;
        height: 29px;
        color: white;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        /*width: 100%;*/
        > img {
          margin-left: 20px;
        }
        span:nth-child(2) {
          flex: 8;
          width: 30px;
        }
        span:nth-child(3) {
          flex: 2;
          img {
            transform: rotate(47deg);
          }
        }
      }
    }

    // table
    .middle {
      width: 100%;
      height: 450px;
      .middleTable {
        display: flex;
        background-color: rgb(245, 245, 245);
        .title {
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

    .middleMsg {
      display: flex;
      background-color: rgb(245, 245, 245);
    }
    .titleName, .titleMsg {
      background-color: #fff;
      margin-bottom: 1px;
      flex: 1;
      text-align: center;
      height: 45px;
      margin-right: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 200;
      font-size: 14px;
    }
  }

  .msgTip {
    .mint-popup {
      width: 80%;
    }
    .maskT {
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
  }

  .titleD {
    font-size: 12px !important;
    line-height: 18px;
    flex: 1.2 !important;
  }

  .popupTittle {
    display: flex;
    .cell {
      flex: 1;
      text-align: center;
      border-bottom: 1px solid gainsboro;
      color: skyblue;
      height: 40px;
      line-height: 40px;
    }
  }

  .mint-popup {
    width: 100%;
  }

</style>
