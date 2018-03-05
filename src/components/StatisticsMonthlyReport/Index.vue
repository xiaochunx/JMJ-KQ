<template>
  <div v-wechat-title="$route.meta.title" id="statistics">

    <div class="top">
      <div class="topBtn" @click="openPicker">
        <img :src="'./static/storesDaily/data.png'" width="24" height="24" style="margin-right: 5px">
        <span style="text-align: center;">{{pickerData}}</span>
        <span>
          <img :src="'./static/storesDaily/xiala.png'" alt="" style="width: 14px;height: 10px">
        </span>
      </div>
      <div class="topBtn" style="margin-left: 10px" @click="openPopup">
        <img :src="'./static/storesDaily/dian.png'" width="24" height="24" style="margin-right: 5px">
        <span :class="{'smallSize' : storesName.length > 5}">{{storesName}}</span>
        <span>
          <img :src="'./static/storesDaily/xiala.png'" alt="" style="width: 14px;height: 10px">
        </span>
      </div>
      <div class="topBtn" style="margin-left: 10px" @click="openPopup2">
        <img :src="'./static/storesDaily/dian.png'" width="24" height="24" style="margin-right: 5px">
        <span :class="{'smallSize' : roletype.length > 5}" style="text-align: center;">{{roletype}}</span>
        <span>
          <img :src="'./static/storesDaily/xiala.png'" alt="" style="width: 14px;height: 10px">
        </span>
      </div>
    </div>

    <div class="box">
      <div id="table">
        <div id="header">
          <div class="left">
            <div class="change" @click="change">
              <img :src="'./static/storesDaily/qiehuan.png'" alt="" style="width: 25px;height: 25px;">
            </div>
          </div>
          <div class="content">
            <div class="column-content">
              <p v-if="!flag">
                <span v-for="detail in rowList" class="dataTime">{{detail}}</span>
              </p>

              <p v-if="flag">
                <span v-for="detail in rowList" class="dataTime">{{detail.time}}</span>
              </p>
            </div>
          </div>
        </div>

        <div id="body">
          <div class="left">
            <p v-for="(item,index) in list" :class="{'storeUser' : item.storeuser == 0}">
              {{item.name}}
            </p>
          </div>

          <div class="content">
            <div class="column-content contentMsg">
              <div v-if="!flag" v-for="(value,index1) in list">
                <span v-for="(item,index) in value.detail" style="width: 94px;display: inline-block;float: left;">
                  <span class="contentC"
                        :class="{'red': item.type == 1,'yellow': item.type == 2,'plum': item.type == 3,'skyblue': item.type == 4,'greenyellow': item.type == 5,'bgOne': item.status == 0,'bgTwo': item.status == 1,'bgThree': item.status == 2,'bgFour': item.status == 3}"
                  >{{item}}</span>
                </span>
              </div>

              <div v-if="flag" v-for="(value,index1) in list">
                <span v-for="(item,index) in value.detail"
                      style="width: 94px;height: 46px; display: inline-block;float: left"
                      @click="open(index1,index)">
                  <span class="contentC"
                        :class="{'red': item.type == 1,'yellow': item.type == 2,'plum': item.type == 3,'skyblue': item.type == 4,'greenyellow': item.type == 5,'bgOne': item.status == 0,'bgTwo': item.status == 1,'bgThree': item.status == 2,'bgFour': item.status == 3}"
                  >{{item.msg | FormatDate}}</span>
                </span>
              </div>
            </div>
          </div>
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

    <mt-popup
      v-model="popupVisible2"
      position="bottom">
      <div class="popupTittle">
        <span class="cell" @click="operation">取消</span>
        <span class="cell" @click="operation(3)">确定</span>
      </div>
      <mt-picker :slots="slots2" @change="getSlotValue"></mt-picker>
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
  import {monthlyReport, monthlyRportDetail} from '../../api/api.js'
  import utils from '@/utils/common.js'

  import Vue from 'vue'

  export default {
    data() {
      return {
        popupVisible: false,
        popupVisible2: false,
        popupSubmit: false,
        storesNameIn: "",
        pickerValue: new Date().Format("yyyy-MM-dd"),
        msgTip: "",
        pickerData: new Date().Format("yyyy-MM"),
        list: [],
        rowList: [],
        flag: false,                  // 是否点击切换按钮
        endDate: new Date(),
        storesName: "",               // 门店名称
        roletype: '前厅',
        roletypeInstance: '',
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }],
        slots2: [
          {
            flex: 1,
            values: ['前厅', '后厨'],
            textAlign: 'center',
            defaultIndex: 2
          }],
        code: null                    // 记录初始code值
      }
    },
    methods: {
      sureBtn() {
        if (this.code == -1 || this.code == 3 || this.code == 4) {
          this.wx.closeWindow();
        }
        this.popupSubmit = false;
      },
      open(index) {
        if (this.flag) {

        } else {
          this.popupVisible = true;
        }
      },
      sure() {
        this.popupVisible = false;
      },
      back() {
        alert(1);
        utils.closePg();
      },
      getSlotValue(index) {
        this.roletypeInstance = index.values[0];
      },
      handleConfirm() {
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM");
        this.apiTwo();
        this.flag = false;
      },
      con1() {
        document.querySelectorAll('.content')[1].removeEventListener('scroll', this.con2);
        const slt = document.querySelector('.content').scrollLeft;
        document.querySelectorAll('.content')[1].scrollLeft = slt;

        clearTimeout(this.timer1);
        this.timer1 = setTimeout(() => {
          document.querySelectorAll('.content')[1].addEventListener('scroll', this.con2);
        }, 50);
      },
      con2() {
        document.querySelector('.content').removeEventListener('scroll', this.con1);
        const slt = document.querySelectorAll('.content')[1].scrollLeft;
        document.querySelector('.content').scrollLeft = slt;

        clearTimeout(this.timer2);
        this.timer2 = setTimeout(() => {
          document.querySelector('.content').addEventListener('scroll', this.con1);
        }, 50);
      },
      addListener(selector, option) {
        // 给dom绑定事件,以及回掉函数
        const scrollDOM = document.querySelectorAll(selector);
        for (let i = 0, len = scrollDOM.length; i < len; i++) {
          scrollDOM[i].addEventListener(option.event[i], option.callBack[i]);
        }
      },
      change() {
        this.flag = !this.flag;

        if (!this.flag) {
          this.apiTwo();
        } else {
          this.apiOne();
        }
      },
      onValuesChange(picker, values) {
        if (values[0]) {
          this.storesNameIn = values[0];
        }
      },
      openPicker() {
        this.$refs.picker.open();
      },
      openPopup() {
        this.popupVisible = true;
      },
      openPopup2() {
        this.popupVisible2 = true;
      },
      operation(value) {
        // 取消
        if (value == 3) {
          this.roletype = this.roletypeInstance;

          this.apiTwo();
          this.flag = false;
        }
        // 确认
        else if (value == 2) {
          this.storesName = this.storesNameIn;

          // 在这里发送网络请求
          this.apiTwo();
          this.flag = false;
        }

        // 退出蒙版
        this.popupVisible = false;
        this.popupVisible2 = false;

      },
      // 统计月报-考情明细
      apiOne() {


        var _this = this;
        var roletype = this.roletype;

        if (roletype == '前厅') {
          roletype = 50;
        } else if (roletype == '后厨') {
          roletype = 60;
        }

        var params = {
          month: _this.pickerData,
          store: _this.storesName,
          roletype: roletype
        };
        monthlyRportDetail(params).then((res) => {
          if (res.code == 1) {
            _this.rowList = res.data.makesure;
            _this.list = res.data.list;
            _this.slots.values = res.data.stores;

            var width = 94 * _this.rowList.length;

            document.querySelectorAll('.column-content')[0].style.width = width + 'px';
            document.querySelectorAll('.column-content')[1].style.width = width + 'px';

          } else {
            _this.msgTip = res.msg;
            _this.pupupSubmit = true;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 统计月报-初始化
      apiTwo() {

        var roletype = this.roletype;

        if (!this.roletype) {
          roletype = 50;
        } else if (roletype == '前厅') {
          roletype = 50;
        } else if (roletype == '后厨') {
          roletype = 60;
        }

        // 发送网络请求 ->
        var _this = this;
        var params = {
          month: _this.pickerData,
          store: _this.storesName,
          roletype: roletype
        };

        monthlyReport(params).then((res) => {
          if (res.code == 1) {
            _this.list = res.data.list;
            _this.slots[0].values = res.data.stores;
            _this.rowList = res.data.base_state;

            var width = 94 * _this.rowList.length;

            document.querySelectorAll('.column-content')[0].style.width = width + 'px';
            document.querySelectorAll('.column-content')[1].style.width = width + 'px';
          } else {
            _this.msgTip = res.msg;
            _this.popupSubmit = true;
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.addListener('.content', {
        "callBack": [this.con1, this.con2],
        "event": ["scroll", "scroll"]
      });

      // 发送网络请求 ->
      var _this = this;
      var params = {
        month: _this.pickerData,
        store: _this.storesName,
        roletype: 50
      };

      monthlyReport(params).then((res) => {
        _this.code = res.code;

        if (res.code == 1) {
          _this.list = res.data.list;
          _this.slots[0].values = res.data.stores;
          _this.rowList = res.data.base_state;
          _this.storesName = res.data.stores[0];

          _this.apiTwo();

          var width = 94 * _this.rowList.length;

          document.querySelectorAll('.column-content')[0].style.width = width + 'px';
          document.querySelectorAll('.column-content')[1].style.width = width + 'px';
        } else {
          _this.msgTip = res.msg;
          _this.popupSubmit = true;
        }
      }).catch((err) => {
        console.log(err);
      });

      // 移除日期
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
  #statistics {
    height: 100%;
    /*font-weight: 200;*/
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
          margin-left: 5px;
        }
        span:nth-child(2) {
          flex: 8;
          width: 30px;
        }
        span:nth-child(3) {
          flex: 1;
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
      line-height: 45px;
      margin-right: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 200;
      font-size: 14px;
    }

    // footer
    .footer {
      display: flex;
      margin-top: 20px;
      .footerBtn {
        padding: 0 10px;
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .mint-button--normal {
          flex: 1;
          background: -webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
          color: white;
        }
      }
    }

    // 蒙版
    .mask {
      width: 300px;
      padding: 20px 15px 20px 15px;
      .content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
        .item {
          width: 80px;
          text-align: center;
          margin-right: 6.6px;
          margin-left: 6.6px;
          margin-bottom: 13px;
          background-color: rgb(201, 201, 201);
          color: white;
        }
      }

      .maskBtn {
        padding: 20px 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .mint-button--normal {
          flex: 1;
          color: white;
          background: -webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
        }
      }
      .itemR {
        background-color: #ed1204 !important;
      }
    }
  }

  .change {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    height: 80%;
  }

  #table {
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
  }

  #header {
    overflow: hidden;
    border-bottom: 1px solid gainsboro;
  }

  #body {
    height: calc(~"100% - 45px");
    overflow-x: hidden;
  }

  #body::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .left {
    float: left;
    width: 25%;
  }

  .left > div {
    border-width: 1px 1px 0 1px;
    border-color: gainsboro;
    border-style: solid;
    box-sizing: border-box;
    line-height: 45px;
    height: 45px;
  }

  .left p:first-of-type {
    border-top: none;
  }

  .left p {
    border-width: 1px 1px 0 1px;
    border-color: gainsboro;
    border-style: solid;
    height: 100%;
    box-sizing: border-box;
    line-height: 45px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    width: 100%;
  }

  #body .left p:last-of-type {
    border-width: 1px;
  }

  .content {
    float: left;
    width: 75%;
    overflow: auto;
  }

  .content::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .column-content {
    /*width: 940px;*/
    .dataTime {
      color: #ed1204;
      font-size: 14px;
    }
  }

  .contentMsg {
    font-size: 14px;
    overflow-y: scroll;
    p:first-of-type {
      span {
        border-top: none;
      }
    }
  }

  .content p span {
    display: inline-block;
    width: 94px;
    box-sizing: border-box;
    border-width: 1px 0 0 1px;
    border-color: gainsboro;
    border-style: solid;
    line-height: 45px;
  }

  .content p span:last-of-type {
    border-right-width: 1px;
  }

  .content p span:first-of-type {
    border-left: none;
  }

  #body .content p:last-of-type span {
    border-bottom-width: 1px;
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

  .total {
    color: orange;
  }

  .contentC {
    width: 94px;
    height: 46px;
    border-right: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;
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


</style>
