<template>
  <div v-wechat-title="$route.meta.title" id="statistics">

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
            <p v-for="(item,index) in list" :class="{'storeUser' : item.storeuser == 1}">
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


    <div class="tipLoading">

      <mt-popup
        v-model="loading"
        :closeOnClickModal="false"
      >
        <div class="loading">
          <mt-spinner type="fading-circle" class="isLoading"></mt-spinner>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import { monthlyReport, monthlyRportDetail } from '../../api/api.js'
  import utils from '@/utils/common.js'

  import Vue from 'vue'

  //过滤器
  Vue.filter('FormatDate', function (item) {
    var str = "";
    for (var value in item) {
      str = item[value] + '+' + str;
    }

    str = str.substring(0, str.lastIndexOf('+'));
    return str;
  });

  export default {
    data() {
      return {
        loading: false,
        popupVisible: false,
        popupSubmit: false,
        storesNameIn: "",
        pickerValue: new Date().Format("yyyy-MM-dd"),
        msgTip: "",
        pickerData: new Date().Format("yyyy-MM"),
        list: [
          {
            name: "程俊文",
            detail: [],
          },
        ],
        rowList: [],
        flag: false,          // 是否点击切换按钮
        endDate: new Date(),
        storesName: "",                     // 门店名称
        slots: [
          {
            flex: 1,
            values: ['天河北店', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'center'
          }],
        code: null          // 记录初始code值
      }
    },
    methods: {
      sureBtn() {
        if (this.code == -1 || this.code == 3 || this.code == 4) {
          /*this.$router.push('/');*/
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
      openPicker() {
        this.$refs.picker.open();
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
      openPopup() {
        this.popupVisible = true;
      },
      operation(value) {
        // 取消
        if (value == 1) {

        }
        // 确认
        else if (value == 2) {
          if (this.storesNameIn != '') {
            this.storesName = this.storesNameIn;

            // 在这里发送网络请求
            this.apiTwo();
            this.flag = false;
          }
        }

        // 退出蒙版
        this.popupVisible = false;
      },

      // 统计月报-考情明细
      apiOne() {

        var _this = this;
        var params = {
          month: _this.pickerData,
          store: _this.storesName
        };
        monthlyRportDetail(params).then((res) => {

          /*res = {
            "code": "1",
            "msg": "",
            "data": {
              "stores": ["天河3店", "天河2店"],
              "makesure": [{
                "time": "2017-10-25",
                "status": "0"
              }, {
                "time": "2017-10-26",
                "status": "0"
              }, {
                "time": "2017-10-27",
                "status": "0"
              }, {
                "time": "2017-10-28",
                "status": "0"
              }, {
                "time": "2017-10-29",
                "status": "0"
              }, {
                "time": "2017-10-30",
                "status": "0"
              }, {
                "time": "2017-10-31",
                "status": "0"
              }, {
                "time": "2017-11-01",
                "status": "0"
              }, {
                "time": "2017-11-02",
                "status": "0"
              }, {
                "time": "2017-11-03",
                "status": "0"
              }, {
                "time": "2017-11-04",
                "status": "0"
              }, {
                "time": "2017-11-05",
                "status": "0"
              }, {
                "time": "2017-11-06",
                "status": "0"
              }, {
                "time": "2017-11-07",
                "status": "0"
              }, {
                "time": "2017-11-08",
                "status": "2"
              }, {
                "time": "2017-11-09",
                "status": "0"
              }, {
                "time": "2017-11-10",
                "status": "0"
              }, {
                "time": "2017-11-11",
                "status": "0"
              }, {
                "time": "2017-11-12",
                "status": "0"
              }, {
                "time": "2017-11-13",
                "status": "0"
              }, {
                "time": "2017-11-14",
                "status": "0"
              }, {
                "time": "2017-11-15",
                "status": "0"
              }, {
                "time": "2017-11-16",
                "status": "0"
              }, {
                "time": "2017-11-17",
                "status": "0"
              }, {
                "time": "2017-11-18",
                "status": "0"
              }, {
                "time": "2017-11-19",
                "status": "0"
              }, {
                "time": "2017-11-20",
                "status": "0"
              }, {
                "time": "2017-11-21",
                "status": "0"
              }, {
                "time": "2017-11-22",
                "status": "0"
              }, {
                "time": "2017-11-23",
                "status": "0"
              }, {
                "time": "2017-11-24",
                "status": "0"
              }, {
                "time": "2017-11-25",
                "status": "0"
              }, {
                "time": "2017-11-26",
                "status": "0"
              }],
              "list": [{
                "name": "陈俊文",
                "storeuser": 0,
                "detail": [{
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [], {
                    "msg": ["未签到"],
                    "type": 0
                  }, {
                    "msg": ["未签到"],
                    "type": 0
                  }, [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  []
                ]
              }, {
                "name": "黄秀",
                "storeuser": 0,
                "detail": [{
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["已签到", "早退"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, {
                  "msg": ["已签退"],
                  "type": 0
                }, {
                  "msg": ["未签到"],
                  "type": 0
                }, [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  []
                ]
              }, {
                "name": "付丹伟",
                "storeuser": 0,
                "detail": [
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [], {
                    "msg": ["未签到"],
                    "type": 0
                  }, [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  []
                ]
              }, {
                "name": "陈俊升",
                "storeuser": 0,
                "detail": [
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [], {
                    "msg": ["未签到"],
                    "type": 0
                  }, {
                    "msg": ["未签到"],
                    "type": 0
                  }, {
                    "msg": ["未签到"],
                    "type": 1
                  }, {
                    "msg": ["未签到"],
                    "type": 1
                  }, {
                    "msg": ["未签到"],
                    "type": 1
                  }, {
                    "msg": ["未签到"],
                    "type": 1
                  }, {
                    "msg": ["未签到"],
                    "type": 1
                  }, [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  []
                ]
              }, {
                "name": "李炜强",
                "storeuser": 0,
                "detail": [
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [], {
                    "msg": ["未签到"],
                    "type": 0
                  }, {
                    "msg": ["未签到"],
                    "type": 0
                  }, {
                    "msg": ["未签到"],
                    "type": 0
                  }, {
                    "msg": ["未签到"],
                    "type": 0
                  }, [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  [],
                  []
                ]
              }]
            }
          }*/
          this.loading = false;
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

        // 发送网络请求 ->
        var _this = this;
        var params = {
          month: _this.pickerData,
          store: _this.storesName
        };

        monthlyReport(params).then((res) => {

          /*res = {
            "code": "1",
            "msg": "",
            "data": {
              "stores": ["天河3店", "天河2店"],
              "base_state": ["未签到", "已签到", "早退", "已签退", "休息", "补休", "事假", "病假", "旷工", "年假", "婚假", "产假", "陪产假", "工伤", "丧假"],
              "list": [{
                "name": "陈俊文",
                "detail": [34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              }, {
                "name": "黄秀",
                "detail": [34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              }, {
                "name": "总计",
                "detail": [68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              }]
            }
          }*/
          this.loading = false;
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

//      this.loading = true;

      // 发送网络请求 ->
      var _this = this;
      var params = {
        month: _this.pickerData,
        store: _this.storesName
      };

      monthlyReport(params).then((res) => {

        _this.code = res.code;
        /*res = {
          "code": "1",
          "msg": "",
          "data": {
            "stores": ["天河3店", "天河2店"],
            "base_state": ["未签到", "已签到", "早退", "已签退", "休息", "补休", "事假", "病假", "旷工", "年假", "婚假", "产假", "陪产假", "工伤", "丧假"],
            "list": [{
              "name": "陈俊文",
              "detail": [34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
              "name": "黄秀",
              "detail": [34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
              "name": "总计",
              "detail": [68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }]
          }
        }*/

        if (res.code == 1) {
          this.loading = false;
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
      })

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
          margin-left: 20px;
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

  .box{
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
    height : calc(~"100% - 45px");
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

  .tipLoading {
    .mint-popup {
      width: 100px;
    }
    .loading {
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .isLoading {
        margin-bottom: 10px;
      }
    }
  }


</style>
