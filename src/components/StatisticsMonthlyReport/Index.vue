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
        <span>{{storesName}}</span>
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
              <p>
                <span v-for="detail in rowList" class="dataTime">{{detail}}</span>
              </p>
            </div>
          </div>
        </div>

        <div id="body">
          <div class="left">
            <p v-for="(item,index) in list" :class="{'total': item.type == 4}">
              {{item.name}}
            </p>
          </div>


          <div class="content">
            <div class="column-content contentMsg">
              <div v-for="(value,index1) in list">
                <span v-for="(item,index) in value.detail" style="width: 94px;display: inline-block">
                  <span v-if="item.type == 0" style="color: #ed1204" class="contentC">{{item.msg | FormatDate}}</span>
                  <span v-if="item.type == 1" style="color: deepskyblue"
                        class="contentC">{{item.msg | FormatDate}}</span>
                  <span v-if="item.type == 2" style="color: lightcoral"
                        class="contentC">{{item.msg | FormatDate}}</span>
                  <span v-if="item.type == 3" style="" class="contentC">{{item.msg | FormatDate}}</span>
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
  </div>
</template>
<script>

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

  var Mock = require('mockjs')
  export default {
    data() {
      return {
        popupVisible: false,
        storesNameIn: "",
        pickerValue: "",
        pickerData: new Date().Format("yyyy-MM"),
        list: [
          {
            name: "程俊文",
            detail: [
              {
                msg: ["已签到", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
          {
            name: "程俊文",
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ],
          },
        ],
        rowList: ['2017-11-12', '2017-11-12', '2017-11-12', '2017-11-12', '2017-11-12', '2017-11-12', '2017-11-12', '2017-11-12', '2017-11-12', '2017-11-12'],
        flag: false,          // 是否点击切换按钮
        endDate: new Date(),
        storesName: "天河北店",                     // 门店名称
        slots: [
          {
            flex: 1,
            values: ['天河北店', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'center'
          }],
      }
    },
    methods: {
      open(index) {
        if (this.flag) {

        } else {
          this.popupVisible = true;
        }
      },
      sure() {
        this.popupVisible = false;
      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm() {
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM");
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
        this.rowList = ['未签到', '已签到', '早退', '未签到', '已签到', '早退', '未签到', '已签到', '早退', '签到'];

        this.list.push(
          {
            name: "总结",
            type: 4,
            detail: [
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 0
              },
              {
                msg: ["fs", "未签到"],
                type: 1
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
              {
                msg: ["fs", "未签到"],
                type: 2
              },
              {
                msg: ["fs", "未签到"],
                type: 3
              },
            ]
          })
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
          }
        }

        // 退出蒙版
        this.popupVisible = false;
      }
    },
    mounted() {
      var width = this.rowList.length * 94;
      document.querySelectorAll('.column-content')[0].style.width = width + 'px';
      document.querySelectorAll('.column-content')[1].style.width = width + 'px';
      this.addListener('.content', {
        "callBack": [this.con1, this.con2],
        "event": ["scroll", "scroll"]
      });
    }
  }
</script>
<style lang="less" scoped>
  #statistics {
    height: 100%;
    font-weight: 200;
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

  #table {
    text-align: center;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
  }

  #header {
    overflow: hidden;
    border-bottom: 1px solid gainsboro;
  }

  #body {
    height: 450px;
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
    height: 100%;
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
    display: inline-block;
    width: 94px;
    height: 45px;
    line-height: 45px;
    border-right: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
  }

</style>
