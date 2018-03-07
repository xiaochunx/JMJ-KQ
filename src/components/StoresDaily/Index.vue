<template>
  <!-- 门店日报 -->
  <div v-wechat-title="$route.meta.title" class="backColor" id="storeDaily">
    <div class="top">
      <div class="topBtn" @click="openPicker">
        <img :src="'./static/storesDaily/data.png'" width="24" height="24" style="margin-right: 20px">
        <span>{{pickerData}}</span>
        <span>
          <img :src="'./static/storesDaily/xiala.png'" alt="" style="width: 14px;height: 10px">
        </span>
      </div>
    </div>

    <div class="middle">
      <div class="middleTable">
        <div class="title">姓名</div>
        <div class="title">考勤</div>
      </div>

      <div style="overflow-y: scroll;height: 90%;">
        <div class="middleMsg" v-for="(item,index) in list" :key="index">
          <div class="titleName" :class="{'storeUser' : item.storeuser == 0}">{{item.name}}</div>
          <div class="titleMsg" @click="item.canedit == 1 && open(index)">
            <span v-if="item.type == 0" style="color: black">{{item.state | FormatDate}}</span>
            <span v-if="item.type == 1" style="color: red">{{item.state | FormatDate}}</span>
            <span v-if="item.type == 2" style="color: yellow">{{item.state | FormatDate}}</span>
            <span v-if="item.type == 3" style="color: purple">{{item.state | FormatDate}}</span>
            <span v-if="item.type == 4" style="color: blue">{{item.state | FormatDate}}</span>
            <span v-if="item.type == 5" style="color: green">{{item.state | FormatDate}}</span>
            <span>
              <img v-if="item.canedit == 1" :src="'./static/storesDaily/edit.png'" width="15" height="15">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footerBtn">
        <mt-button @click="makeSureDaily" :class="{'isSureDaily' : isSureDaily}" :disabled="makesure">确认日报</mt-button>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      month-format="{value} 月"
      date-format="{value} 日"
      @change="setSlotValue(index, value)"
      :endDate="endDate"
      v-model="pickerValue"
      @confirm="handleConfirm"
      :closeOnClickModal="false"
    >
    </mt-datetime-picker>
    <mt-popup
      v-model="popupVisible"
      :closeOnClickModal="false"
    >
      <div class="mask">
        <div class="content">
          <mt-button class="item" @click.native="selected(index,value.msg)" :class="{'itemR' : value.selected === true}"
                     v-for="(value, index) in detail" :key="index">{{value.msg}}
          </mt-button>
        </div>

        <div class="maskBtn">
          <mt-button @click="sure()">确定</mt-button>
        </div>
      </div>
    </mt-popup>

    <mt-popup
      v-model="popupSubmit"
      :closeOnClickModal="false"
    >
      <div class="maskT">
        <div class="msgTip">{{msgTip}}</div>
        <div class="footerBtn">
          <mt-button @click="sureBtn">{{btnTitle}}</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>

  import {storesDailyInitialize, editDailyInitialize, makeSureDailyInitialize} from '../../api/api.js'
  import {Toast} from 'mint-ui';

  export default {
    data() {
      return {
        popupVisible: false,               // 控制蒙版的显隐
        popupSubmit: false,                // 提交弹窗
        msgTip: "",                        // 提示信息
        pickerValue: new Date().Format("yyyy-MM-dd"),
        pickerData: new Date().Format("yyyy-MM-dd"),
        index: 0,               // 记录当前被选中cell
        value: [],              // 记录当前被选中
        list: [],
        detail: [],
        endDate: new Date(),
        count: 0,                 // 记录当前选中个数
        flagTip: true,            // 防止多次触发
        code: null,               // 记录初始化code值
        btnTitle: '确定',                 // 按钮名称
        isSureDaily: false,
        makesure: true,
        base_state: []
      }
    },
    methods: {
      open(index) {
        var _this = this;
        this.popupVisible = true;

        // 记录当前被选中index
        this.index = index;

        console.log(this.detail);
        this.detail.forEach(function (value, count) {
          if (_this.list[index].state.indexOf(value.msg) >= 0) {
            value.selected = true;
          }
        })
      },
      selected(count) {

        var _this = this;
        if (this.flagTip) {
          this.flagTip = false;
          this.detail[count].selected = !this.detail[count].selected;


          if (this.detail[count].msg == '未签到'){
             this.detail.forEach(function (value) {
               if (value.msg != '未签到' && value.selected){
                  value.selected = false;
               }
             })
          }else {
            this.detail.forEach(function (value) {
              if (value.msg == '未签到' && value.selected){
                 value.selected = false;
              }
            })
          }


          var num = 0;
          this.detail.forEach(function (value) {
            if (value.selected) {
              num++;
            }
          });

          _this.count = num;

          if (_this.count <= 2) {
            _this.flagTip = true
          } else {
            Toast("最多只能选择两个!");
            this.detail[count].selected = !this.detail[count].selected;
            _this.flagTip = true
          }
        }
      },
      // 日报-修改日报
      sure() {

        var _this = this;

        this.popupVisible = false;

        this.detail.forEach(function (value) {
          if (value.selected) {
            _this.value.splice(0, 0, value.msg);
          }
        });

        var state_a = "";
        var state_b = "";

        if (_this.value.length == 1) {
          state_a = _this.value[0];
        } else if (_this.value.length == 2) {
          state_a = _this.value[0];
          state_b = _this.value[1];
        }

        var params = {
          id: this.list[_this.index].id,
          state_a: state_a,                    // 修改前
          state_b: state_b                     // 修改后
        };

        // 确认日报
        editDailyInitialize(params).then((res) => {
          _this.msgTip = res.msg;
          _this.popupSubmit = true;
          if (res.code == 1) {
            _this.api();
            _this.value = [];
            _this.count = 0;
          }
          var arr = [];
          this.base_state.forEach(function (value, index) {
            arr.push({
              msg: value,
              selected: false
            })
          });

          this.detail = arr;
        }).catch((error) => {
          console.log(error);
        });

      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm() {
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM-dd ");
        this.api();
      },
      sureBtn() {
        if (this.code == -1 || this.code == 3 || this.code == 4) {
          this.wx.closeWindow();
        } else if (this.msgTip == '确认日报成功') {
          this.$router.push('/')
        }
        this.popupSubmit = false;
      },
      // 日报-初始化
      api() {
        var _this = this;
        var params = {
          "date": _this.pickerData
        };

        var arr = [];

        storesDailyInitialize(params).then((res) => {
          if (res.code == 1) {
            this.base_state = res.data.base_state;
            res.data.base_state.forEach(function (value, index) {
              arr.push({
                msg: value,
                selected: false
              })
            });
            _this.detail = arr;

            if (res.data.makesure == 0) {
              _this.makesure = false;
            } else if (res.data.makesure == 1) {
              _this.makesure = true;
            }
            _this.list = res.data.list;

          } else {
            _this.msgTip = res.msg;
            _this.popupSubmit = true;
          }
        }).catch((error) => {
          console.log(error);
        })
      },
      // 日报-确认日报
      makeSureDaily() {
        var _this = this;

        var params = {
          "date": _this.pickerData
        };
        makeSureDailyInitialize(params).then((res) => {
          _this.msgTip = res.msg;
          _this.popupSubmit = true;

          if (res.msg == '确认日报成功') {
            this.btnTitle = '返回';
          }

        }).catch((res) => {
        })
      },
    },
    mounted() {
      this.api();
    }
  }
</script>
<style lang="less" scoped>
  #storeDaily {
    height: 100%;
    // top
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
    }

    .middleMsg {
      display: flex;
      background-color: rgb(245, 245, 245);
    }
    .titleName, .titleMsg {
      position: relative;
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
      span:nth-child(1) {
        flex: 9;
        text-align: center;
      }
      span:nth-child(2) {
        flex: 2;
        line-height: 45px;
        height: 45px;
        display: flex;
        align-items: center;
      }
    }

    // footer
    .footer {
      display: flex;
      margin-top: 40px;
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

  .picker-slot {
    overflow-y: scroll;
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

</style>
