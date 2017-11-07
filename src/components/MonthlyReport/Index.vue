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
    </div>
    <!--<div class="middle">
      <div class="middleTable">
        <div class="title change">
          <img :src="'./static/storesDaily/qiehuan.png'" alt="" style="width: 25px;height: 25px;">
        </div>
        <div class="title">考勤</div>
        <div class="title">考勤</div>
        <div class="title">考勤</div>
      </div>

      <div style="overflow-y: scroll;height: 400px">
        <div class="middleMsg" v-for="(item,index) in list" :key="index">
          <div class="titleName">{{item.name}}</div>
          <div class="titleMsg" @click="open(index)">
            <span v-if="item.type == 0" style="color: #ed1204">{{item.detail | FormatDate}}</span>
            <span v-if="item.type == 1" style="color: deepskyblue">{{item.detail | FormatDate}}</span>
            <span v-if="item.type == 2" style="color: lightcoral">{{item.detail | FormatDate}}</span>
            <span v-if="item.type == 3" style="">{{item.detail | FormatDate}}</span>
            <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px">
          </div>
          <div class="titleName">{{item.name}}</div>
          <div class="titleName">{{item.name}}</div>
        </div>
      </div>
    </div>-->

    <!--<div class="box">
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
                <span v-for="detail in mockData.list[0].record" class="dataTime">2017-11-12</span>
              </p>
            </div>
          </div>
        </div>


        <div id="body">
          <div class="left">
            <p v-for="item in mockData.list">{{item.name}}</p>
            <p class="total" v-show="flag == true">总计</p>
          </div>


          <div class="content">
            <div class="column-content contentMsg">
              <p v-for="(item,index) in mockData.list" @click="open(index)">
                <span v-for="detail in item.record">{{detail}}
                <img :src="'./static/storesDaily/edit.png'" width="15" height="15" v-show="flag == false">
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>-->

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
                <span v-for="(item,index) in value.detail" style="width: 94px;display: inline-block" @click="open(index1,index)">
                  <span v-if="item.type == 0" style="color: #ed1204" class="contentC">{{item.msg | FormatDate}}
                    <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px">
                  </span>
                  <span v-if="item.type == 1" style="color: deepskyblue"
                        class="contentC">{{item.msg | FormatDate}}
                    <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px">
                  </span>
                  <span v-if="item.type == 2" style="color: lightcoral"
                        class="contentC">{{item.msg | FormatDate}}
                    <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px">
                  </span>
                  <span v-if="item.type == 3" style="" class="contentC">{{item.msg | FormatDate}}
                    <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px">
                  </span>

                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="message margin">
      <div class="margin">本次修改: </div>
      <div class="changeMsg margin">
        <span class="margin">程俊文,10月2号,未签到 改 已签到</span>
        <span class="margin">程俊文,10月2号,未签到 改 已签到</span>
        <span class="margin">程俊文,10月2号,未签到 改 已签到</span>
        <span class="margin">程俊文,10月2号,未签到 改 已签到</span>
        <span class="margin">程俊文,10月2号,未签到 改 已签到</span>
      </div>
    </div>

    <div class="footer">
      <div class="footerBtn">
        <mt-button>确认日报</mt-button>
      </div>
    </div>


    <mt-popup
      v-model="popupVisible"
    >
      <div class="mask">
        <div class="content">
          <mt-button class="item" @click.native="selected(index)" :class="{'itemR' : value.selected === true}"
                     v-for="(value, index) in detail" :key="index">{{value.msg}}
          </mt-button>
        </div>

        <div class="maskBtn">
          <mt-button @click="sure">确定</mt-button>
        </div>
      </div>
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
  var Mock = require('mockjs')
  export default {
    data() {
      return {
        popupVisible: false,   // 控制蒙版的显隐
        pickerValue: "",
        pickerData: new Date().Format("yyyy-MM"),
        list: [
          {
            name: "程俊文",
            detail: [
              {
                msg: ["已签到", "未签"],
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
        detail: [
          {
            msg: "未签到",
            selected: false
          },
          {
            msg: "已签到",
            selected: false
          },
          {
            msg: "早退",
            selected: false
          },
          {
            msg: "已签退",
            selected: false
          },
          {
            msg: "休息",
            selected: false
          },
          {
            msg: "补休",
            selected: false
          },
          {
            msg: "事假",
            selected: false
          },
          {
            msg: "病假",
            selected: false
          },
          {
            msg: "旷工",
            selected: false
          },
          {
            msg: "年假",
            selected: false
          },
          {
            msg: "婚嫁",
            selected: false
          },
          {
            msg: "产假",
            selected: false
          },
          {
            msg: "陪产假",
            selected: false
          },
          {
            msg: "工伤",
            selected: false
          },
          {
            msg: "丧假",
            selected: false
          }
        ],
        flag: false,          // 是否点击切换按钮
        endDate: new Date(),
        mockData: Mock.mock({
          "list|20-30": [
            {
              "name": "@cname",
              "record": [1, 2, 1, 1, 2, 2, 2, 1, 1, 1]
            }
          ]
        })
      }
    },
    methods: {
      open(i,j) {
        console.log(i);
        console.log(j);
        if (this.flag){

        }else {
          this.popupVisible = true;
        }
      },
      selected(index) {
        this.detail[index].selected = !this.detail[index].selected;
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
      change(){
        this.flag = !this.flag;
      }
    },
    mounted() {
      var width = 94 * 10;
      console.log(width);
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
  #monthlyReport {
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
    height: 310px;
    overflow-x: hidden;
    font-size: 14px;
  }

  #body::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .left {
    float: left;
    width: 25%;
    /* background-color: blue; */
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
    /* background-color: pink; */
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
    overflow-y: scroll;
    font-size: 12px;
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

  .message{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding-left: 10px;
    .changeMsg{
      overflow-y: scroll;
      height: 80px;
      display: flex;
      flex-direction: column;
    }
  }

  .margin{
    margin-top: 10px;
  }

  .total{
    color: orange;
  }

  .contentC {
    width: 94px;
    height: 45px;
    line-height: 45px;
    border-right: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
