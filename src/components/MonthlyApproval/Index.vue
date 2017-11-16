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
        <span>{{storesName}}</span>
        <span>
          <img :src="'./static/storesDaily/xiala.png'" alt="" style="width: 14px;height: 10px">
        </span>
      </div>
    </div>

    <div class="middle">
      <div class="middleTable">
        <div class="title" v-for="value in titleList">{{value}}</div>
      </div>

      <div style="overflow-y: scroll;height: 90%;">
        <div class="middleMsg" v-for="(item,index) in list" :key="index">
          <div class="titleName">{{item.store}}</div>
          <div class="titleName">{{item.name}}</div>
          <div class="titleName">{{item.time}}</div>
          <div class="titleMsg" @click="open(index)">
            <!--<span v-if="item.type == 0" style="color: orange">{{item.state}}</span>-->
            <!--<span v-if="item.type == 1" style="color: deepskyblue">{{item.state}}</span>-->
            <span>{{item.state}}</span>
          </div>
        </div>
      </div>
    </div>


    <!--日期选择框-->
    <div class="store">
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

    <!--门店选择框-->
    <div class="store">
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <div class="popupTittle">
          <span class="cell" @click="operation(1)">取消</span>
          <span class="cell" @click="operation(2)">确定</span>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </mt-popup>
    </div>

    <!--状态弹窗-->
    <mt-popup
      v-model="popupDetail">
      <div class="cellPopup" v-for="(value,index) in oneList" :key="index">
        <div class="topPopup">
          <span class="tip margin">审批状态提醒</span>
        </div>
        <div class="middlePopup">
          <span class="item margin">门店： <span class="gColor">{{value.store}}</span></span>
          <span class="item margin">店长： <span class="gColor">{{value.name}}</span></span>
          <span class="item margin">申请时间： <span class="gColor">{{value.time}}</span></span>
          <span class="item margin">状态： <span
            :class="{rColor : value.state == '未处理',fColor : value.state == '已通过' }">{{value.state}}</span></span>
        </div>
        <div class="footerPopup">
          <span class="item margin" style="margin-bottom: 8px">申请详情:</span>
          <span class="item gColor margin" v-for="(item,index) in value.detail">{{item}}</span>
        </div>


        <!-- 后期打开 -->
        <!--<div class="NotReason">
          <span class="item margin">不通过理由: <span class="gColor">(申请通过可不填)</span> </span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>-->

        <div class="footerBtnBox">
          <div class="footerBtn">
            <mt-button size="small" @click="through(1)">通过</mt-button>
          </div>
          <div class="footerBtn">
            <mt-button size="small" @click="through(2)">不通过</mt-button>
          </div>
        </div>
      </div>
    </mt-popup>


    <!--加载消息提示-->
    <mt-popup
      v-model="popupMsgTip">
      <div class="mask">
        <div class="msgTip">{{msgTip}}</div>
        <div class="footerBtn">
          <mt-button @click="sure">确认</mt-button>
        </div>
      </div>
    </mt-popup>

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

  import {monthlyApprovalInitialize, monthlyApprovalPost} from '../../api/api.js'

  export default {
    data() {
      return {
        loading: false,
        pickerData: new Date().Format("yyyy-MM"),       // 日期 -> 转化(默认今天)
        storesName: "",                              // 门店名称
        storesNameIn: "",
        textarea: "",                                      // 文本域
        index: null,                                       // 当前点击索引值
        oneList: [],
        popupDetail: false,                                // 详情弹窗
        msgTip: "",                                        // 消息提示
        popupMsgTip: false,                                // 消息提示弹窗
        endDate: new Date(),                               // 日期选项结束日期
        popupVisible: false,                               // 门店选择框是否展示
        pickerValue: "",                                   // 日期 -> 未转化
        titleList: ["门店", "店长", "申请时间", "状态"],         // 表格标题内容
        code: null,
        list: [
          /*{
            store: "天河3店",
            name: "李炜强",
            state: "未处理",
            time: "2017-11-04 19:12:00",
            logid: "1|2|3",
            detail: [
              "黄秀,2017-11-04,未签到,已签到",
              "黄秀,2017-11-04,已签到,已签到+早退",
              "黄秀,2017-11-04,已签到+早退,已签到+早退"
            ]
          },
          {
            store: "天河3店",
            name: "李炜强",
            state: "已通过",
            time: "2017-11-04 19:12:00",
            logid: "1|2|3",
            detail: [
              "黄秀,2017-11-04,未签到,已签到",
              "黄秀,2017-11-04,已签到,已签到+早退",
              "黄秀,2017-11-04,已签到+早退,已签到+早退"
            ]
          },
          {
            store: "天河3店",
            name: "李炜强",
            state: "已通过",
            time: "2017-11-04 19:12:00",
            logid: "1|2|3",
            detail: [
              "黄秀,2017-11-04,未签到,已签到",
              "黄秀,2017-11-04,已签到,已签到+早退",
              "黄秀,2017-11-04,已签到+早退,已签到+早退"
            ]
          },
          {
            store: "天河3店",
            name: "李炜强",
            state: "已通过",
            time: "2017-11-04 19:12:00",
            logid: "1|2|3",
            detail: [
              "黄秀,2017-11-04,未签到,已签到",
              "黄秀,2017-11-04,已签到,已签到+早退",
              "黄秀,2017-11-04,已签到+早退,已签到+早退"
            ]
          },
          {
            store: "天河3店",
            name: "李炜强",
            state: "已通过",
            time: "2017-11-04 19:12:00",
            logid: "1|2|3",
            detail: [
              "黄秀,2017-11-04,未签到,已签到",
              "黄秀,2017-11-04,已签到,已签到+早退",
              "黄秀,2017-11-04,已签到+早退,已签到+早退"
            ]
          },*/
        ],                                      // 内容列表
        slots: [
          {
            flex: 1,
            values: ['天河北', '天河北店', '天河北店', '天河北店', '天河北店', '天河北店'],
            className: 'slot1',
            textAlign: 'center'
          }],                                      // 门店列表
      }
    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      },
      openPopup() {
        this.popupVisible = true;
      },
      // 日期选择回来到这个方法
      handleConfirm() {
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM");
        // 发送网络请求 ->
        this.apiInitialize();
      },
      open(index) {
        var arr = [];
        arr.push(this.list[index]);

        this.index = index;
        this.oneList = arr;
        this.popupDetail = true;

      },
      // 门店按钮确定与取消按钮
      operation(value) {
        if (value == 2) {
          if (this.storesNameIn != '') {
            this.storesName = this.storesNameIn;
            // 在这里发送网络请求 ->
            this.apiInitialize();
          }
        }
        // 退出蒙版
        this.popupVisible = false;
      },
      onValuesChange(picker, values) {
        if (values[0]) {
          this.storesNameIn = values[0];
        }
      },
      // 消息提示确认按钮
      sure() {
        if (this.code == -1 || this.code == 3 || this.code == 4) {
          this.$router.push('/');
        } else {
          this.popupMsgTip = false;
          this.apiInitialize();
        }
      },
      // 审批通过|不通过
      through(flag) {
        var _this = this;
        var params = {};

        params = {
          logid: _this.oneList[0].logid,
          state: flag,
          textarea: ""
        };

        this.apiPost(params);

        // 后期打开!
        /*if (flag == 1) {

          params = {
            logid: _this.oneList[_this.index].logid,
            state: flag,
            textarea: ""
          };

          this.apiPost(params);

        } else if (flag == 2) {
          if (_this.textarea == "") {
            _this.msgTip = "请填写不通过理由!"
            _this.popupMsgTip = true;
          }else {
            params = {
              logid: _this.oneList.logid,
              state: flag,
              textarea: _this.textarea
            };
            _this.apiPost(params);
          }
        }*/
      },
      // 月报审批-初始化
      apiInitialize() {
        var _this = this;

        var params = {
          month: this.pickerData,
          store: _this.storesName
        };

        monthlyApprovalInitialize(params).then((res) => {

          coderes = {
            "code": "1",
            "msg": "数据获取成功",
            "data": {
              "stores": [
                "天河3店",
                "天河2店"
              ],
              "list": [
                {
                  "store": "天河3店",
                  "name": "李炜强",
                  "state": "已通过",
                  "time": "2017-11-04 19:12:00",
                  "logid": "1|2|3",
                  "detail": [
                    "黄秀,2017-11-04,未签到,已签到",
                    "黄秀,2017-11-04,已签到,已签到+早退",
                    "黄秀,2017-11-04,已签到+早退,已签到+早退"
                  ]
                },
                {
                  "store": "天河3店",
                  "name": "李炜强",
                  "state": "未处理",
                  "time": "2017-11-08 02:45:55",
                  "logid": "5|6",
                  "detail": [
                    "李炜强,2017-11-08,未签到,病假+旷工",
                    "黄秀,2017-11-08,未签到,病假+旷工"
                  ]
                }
              ]
            }
          }

          if (res.code == 1) {
            _this.list = res.data.list;
            _this.slots[0].values = res.data.stores;
          } else {
            _this.msgTip = res.msg;
            _this.popupMsgTip = true;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 审批月报-审批
      apiPost(params) {

        this.loading = true;

        var _this = this;

        monthlyApprovalPost(params).then((res) => {
          /*res = {
            code: "1",
            msg: "处理成功"
          };*/

          this.loading = false;
          _this.popupDetail = false;
          _this.msgTip = res.msg;
          _this.popupMsgTip = true;

        }).catch((err) => {
          console.log(err);
        })
      }
    },
    // 月报审批-初始化
    mounted() {
      this.loading = true;
      var _this = this;

      var params = {
        month: this.pickerData,
        store: _this.storesName
      };

      monthlyApprovalInitialize(params).then((res) => {
        /*res = {
          "code": "1",
          "msg": "",
          "data": {
            "stores": [
              "天河3店",
              "天河2店"
            ],
            "list": [
              {
                "store": "天河3店",
                "name": "李炜强",
                "state": "已通过",
                "time": "2017-11-04 19:12:00",
                "logid": "1|2|3",
                "detail": [
                  "黄秀,2017-11-04,未签到,已签到",
                  "黄秀,2017-11-04,已签到,已签到+早退",
                  "黄秀,2017-11-04,已签到+早退,已签到+早退"
                ]
              },
              {
                "store": "天河3店",
                "name": "李炜强",
                "state": "未处理",
                "time": "2017-11-08 02:45:55",
                "logid": "5|6",
                "detail": [
                  "李炜强,2017-11-08,未签到,病假+旷工",
                  "黄秀,2017-11-08,未签到,病假+旷工"
                ]
              }
            ]
          }
        }*/

        _this.loading = false;
        _this.code = res.code;
        if (res.code == 1) {
          _this.list = res.data.list;
          _this.slots[0].values = res.data.stores;
          _this.storesName = res.data.stores[0];
        } else {
          _this.msgTip = res.msg;
          _this.popupMsgTip = true;
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
</script>
<style lang="less" scoped>
  #monthlyReport {
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
    .middle {
      width: 100%;
      height: 70%;
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
      .middleMsg {
        display: flex;
        background-color: rgb(245, 245, 245);
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
    }
    .cellPopup {
      background: white;
      padding: 24px 12px 20px 12px;
      border-radius: 6px;
      .topPopup {
        display: flex;
        flex-direction: column;
        .tip {
          font-size: 14px;
        }
        .date {
          font-size: 12px;
        }
      }
      .middlePopup {
        margin-right: 10px;
        margin-top: 12px;
        padding-bottom: 9px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #d4d4d4;
      }
      .NotReason {
        .el-textarea {
          margin-top: 8px;
        }
      }
      .footerPopup {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        margin-bottom: 7px;
        border-bottom: 1px solid #d4d4d4;
      }
      .footerBtnBox {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .footerBtn:nth-child(1) {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .mint-button {
            width: 80%;
            color: white;
            background: #e20a07;
          }
        }
        .footerBtn:nth-child(2) {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          .mint-button {
            width: 80%;
            color: white;
            background: gainsboro;
          }
        }
      }
    }
    .mask {
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
    .item {
      font-size: 12px;
    }
    .margin {
      margin-bottom: 7px;
    }
    .fColor {
      color: #1d7fe4;
    }
    .rColor {
      color: #e20a07;
      text-decoration: underline;
    }
    .gColor {
      color: grey;
    }
    .store {
      .mint-popup {
        width: 100%;
      }
    }
  }

  /*门店弹窗样式*/
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
    width: 80%;
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
