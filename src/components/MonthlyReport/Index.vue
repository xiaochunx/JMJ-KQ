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
                <span v-if="!flag" v-for="detail in rowList" class="dataTime">{{detail.time}}</span>
                <span v-if="flag" v-for="detail in rowList" class="dataTime">{{detail}}</span>
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
                <span v-for="(item,index) in value.detail" style="width: 94px;height: 46px; display: inline-block;float: left;" @click="item.canedit == 1 && open(index1,index)">
                  <!--<span v-if="item.type == 0" style="color: #ed1204" class="contentC">{{item.msg | FormatDate}}
                    <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px;position: absolute;
    right: 2px;top: 2px;">
                  </span>
                  <span v-if="item.type == 1" style="color: deepskyblue"
                        class="contentC">{{item.msg | FormatDate}}
                    <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px;position: absolute;
    right: 2px;top: 2px;">
                  </span>
                  <span v-if="item.type == 2" style="color: lightcoral"
                        class="contentC">{{item.msg | FormatDate}}
                    <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px">
                  </span>
                  <span v-if="item.type == 3" style="" class="contentC">{{item.msg | FormatDate}}
                    <img :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px;position: absolute;
    right: 2px;top: 2px;">
                  </span>-->
                  <span class="contentC">{{item.msg | FormatDate}}
                    <img v-if="item.canedit == 1" :src="'./static/storesDaily/edit.png'" width="15" height="15" style="margin-left: 5px;position: absolute;
    right: 2px;top: 2px;">
                  </span>
                </span>
              </div>

              <div v-if="flag" v-for="(value,index1) in list">
                <span v-for="(item,index) in value.detail" style="width: 94px;height: 46px; display: inline-block;float: left;"
                      @click="item.canedit == 1 && open(index1,index)">
                  <span class="contentC">{{item}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="message">
      <div class="margin">本次修改: </div>
      <div class="changeMsg margin">
        <span class="margin" v-for="(value,index) in detailArr" :key="index">{{value}}</span>
      </div>
    </div>

    <div class="footer">
      <div class="footerBtn">
        <mt-button @click="submit">提醒审批</mt-button>
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
  import { monthlyReportInitialize, monthlyEdit, monthlyChange,remindApproval } from '../../api/api.js'
  import Vue from 'vue'
  import {Toast} from 'mint-ui';
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
        popupVisible: false,   // 控制蒙版的显隐
        popupSubmit: false,
        pickerValue: "",
        msgTip: "",            // 提示弹窗
        indexI: 0,
        indexJ: 0,
        pickerData: new Date().Format("yyyy-MM"),
        value: [],              // 记录当前选中的按钮
        list: [],
        rowList: [],
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
        flag: false,           // 是否点击切换按钮
        endDate: new Date(),
        detailArr: [],
        count: 0,                // 记录当前选中个数
        flagTip: true,
        code: null               // 记录初始化code值
      }
    },
    methods: {
      sureBtn() {
        if (this.code == -1 || this.code == 3 || this.code == 4){
          this.$router.push('/')
        }
        this.popupSubmit = false;
      },
      open(i, j) {
        var _this = this;
        this.popupVisible = true;
        this.indexI = i;
        this.indexJ = j;

        if (!this.flag) {
          this.detail.forEach(function (value) {
            if (_this.list[i].detail[j].msg.indexOf(value.msg) >= 0) {
              value.selected = true;
              console.log(value.msg);
            }
          });
        }
        else {
          this.popupVisible = true;
        }
      },
      selected(count) {
        var _this = this;
        if (this.flagTip) {
          this.flagTip = false;

          this.detail[count].selected = !this.detail[count].selected;

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
      // 月报-月报修改
      sure() {
        var _this = this;

        this.popupVisible = false;

        // 将选中的数组存放在数组中
        this.detail.forEach(function (value) {
          if (value.selected) {
            _this.value.splice(0, 0, value.msg);
          }
        });

        var state_a = "";          // 修改前
        var state_b = "";          // 修改后
        var str = "";              // 用于记录修改详情

        if (_this.value.length == 1){
          state_a = _this.value[0];
        }else if (_this.value.length == 2){
          state_a = _this.value[0];
          state_b = _this.value[1];
        }


        // 拼接修改信息
        str += _this.list[_this.indexI].name + ',';
        str += _this.rowList[_this.indexJ].time + ',';
        _this.list[_this.indexI].detail[_this.indexJ].msg.forEach(function (value, index) {
          str += " " + value + '';
        });
        str += " 改";
        var strSub = "";
        for (var value in _this.value) {
          strSub = _this.value[value] + '+' + strSub;
        }
        strSub = strSub.substring(0, strSub.lastIndexOf('+'));
        str += " " + strSub;

        // 发送网络请求 ->
        var params = {
            "id": _this.list[_this.indexI].detail[_this.indexJ].id,
            "state_a": state_a,
            "state_b": state_b
        };
        // 月报修改
        monthlyEdit(params).then((res) => {

          /*res = {code : 1}*/
          if (res.code == 1) {
            _this.detailArr.push(str);

            _this.list[_this.indexI].detail[_this.indexJ].msg = _this.value;
            _this.value = [];
            _this.detail = [
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
            ]

            _this.popupSubmit = true;
            _this.msgTip = res.msg;

          } else {
            _this.msgTip = res.msg;
            _this.popupSubmit = true;
            _this.detail = [
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
            ]
          }
        }).catch((err) => {
          console.log(err);
        });

      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm() {
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM");
        this.apiOne();
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
          this.apiOne();
        } else {
          this.apiTwo();
        }
      },
      // 月报-提醒审批
      submit() {

        var _this = this;
        var params = {

        };
        remindApproval(params).then((res) => {
          /*res = {msg: "haha"}*/
          _this.msgTip = res.msg;
          _this.popupSubmit = true;
        }).catch((err) => {
          console.log(err);
        })
      },
      // 月报-初始化
      apiOne() {
        this.loading = true;
        var width = 94 * this.rowList.length;

        document.querySelectorAll('.column-content')[0].style.width = width + 'px';
        document.querySelectorAll('.column-content')[1].style.width = width + 'px';
        this.addListener('.content', {
          "callBack": [this.con1, this.con2],
          "event": ["scroll", "scroll"]
        });

        var _this = this;
        var params = {
          month: _this.pickerData
        };
        var arr = [];
        monthlyReportInitialize(params).then((res) => {

          _this.code = res.code;
          /*res = {
            code: "1",
            msg: "",
            data: {
              makesure: [
                {
                  time: "2017-10-25",
                  status: "0"
                },
                {
                  time: "2017-10-26",
                  status: "0"
                },
                {
                  time: "2017-10-27",
                  status: "0"
                },
                {
                  time: "2017-10-28",
                  status: "0"
                },
                {
                  time: "2017-10-29",
                  status: "0"
                },
                {
                  time: "2017-10-30",
                  status: "0"
                },
                {
                  time: "2017-10-31",
                  status: "0"
                },
                {
                  time: "2017-11-01",
                  status: "0"
                },
                {
                  time: "2017-11-02",
                  status: "0"
                },
                {
                  time: "2017-11-03",
                  status: "0"
                },
                {
                  time: "2017-11-04",
                  status: "1"
                },
                {
                  time: "2017-11-05",
                  status: "0"
                },
                {
                  time: "2017-11-06",
                  status: "0"
                },
                {
                  time: "2017-11-07",
                  status: "0"
                },
                {
                  time: "2017-11-08",
                  status: "0"
                },
                {
                  time: "2017-11-09",
                  status: "0"
                },
                {
                  time: "2017-11-10",
                  status: "0"
                },
                {
                  time: "2017-11-11",
                  status: "0"
                },
                {
                  time: "2017-11-12",
                  status: "0"
                },
                {
                  time: "2017-11-13",
                  status: "0"
                },
                {
                  time: "2017-11-14",
                  status: "0"
                },
                {
                  time: "2017-11-15",
                  status: "0"
                },
                {
                  time: "2017-11-16",
                  status: "0"
                },
                {
                  time: "2017-11-17",
                  status: "0"
                },
                {
                  time: "2017-11-18",
                  status: "0"
                },
                {
                  time: "2017-11-19",
                  status: "0"
                },
                {
                  time: "2017-11-20",
                  status: "0"
                },
                {
                  time: "2017-11-21",
                  status: "0"
                },
                {
                  time: "2017-11-22",
                  status: "0"
                },
                {
                  time: "2017-11-23",
                  status: "0"
                },
                {
                  time: "2017-11-24",
                  status: "0"
                },
                {
                  time: "2017-11-25",
                  status: "0"
                },
                {
                  time: "2017-11-26",
                  status: "0"
                }
              ],
              base_state: [
                "未签到",
                "已签到",
                "早退",
                "已签退",
                "休息",
                "补休",
                "事假",
                "病假",
                "旷工",
                "年假",
                "婚假",
                "产假",
                "陪产假",
                "工伤",
                "丧假"
              ],
              list: [
                {
                  name: "黄秀",
                  storeuser: 0,
                  detail: [
                    {
                      id: "65",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "69",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 1
                    },
                    {
                      id: "69",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 1
                    },
                    {
                      id: "69",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 1
                    },
                    {
                      id: "75",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "77",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "79",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "81",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "83",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "85",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "86",
                      msg: [
                        "已签到",
                        "早退"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "88",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "91",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "97",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ]
                  ]
                },
                {
                  name: "李炜强",
                  storeuser: 0,
                  detail: [
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    {
                      id: "89",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "92",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "98",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ]
                  ]
                },
                {
                  name: "陈俊文",
                  storeuser: 0,
                  detail: [
                    {
                      id: "64",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "68",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ]
                  ]
                },
                {
                  name: "陈俊升",
                  storeuser: 0,
                  detail: [
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    {
                      id: "87",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "90",
                      msg: [
                        "未签到"
                      ],
                      type: 0,
                      canedit: 0
                    },
                    {
                      id: "95",
                      msg: [
                        "未签到"
                      ],
                      type: 1,
                      canedit: 0
                    },
                    {
                      id: "101",
                      msg: [
                        "未签到"
                      ],
                      type: 1,
                      canedit: 0
                    },
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ],
                    [ ]
                  ]
                }
              ],
              chang_data: [
                "hh,2017-11-14,未签到 改 未签到+已签到",
                "黄秀,2017-10-25,未签到 改 未签到+事假",
                "黄秀,2017-10-26,未签到 改 已签退+休息",
                "黄秀,2017-10-27,未签到 改 未签到+已签退",
                "黄秀,2017-11-10,未签到+已签到 改 未签到",
                "李炜强,2017-11-11,未签到+已签到 改 已签到",
                "陈俊升,2017-11-08,未签到 改 未签到+陪产假"
              ],
            }
          }*/

          if (res.code == 1) {
            this.loading = false;
            _this.rowList = res.data.makesure;
            _this.list = res.data.list;
            _this.detailArr = res.data.chang_data;

            res.data.base_state.forEach(function (value, index) {
              arr.push({
                msg: value,
                selected: false
              })
            });

            _this.detail = arr;

            var width = 94 * this.rowList.length;

            console.log(width);
            document.querySelectorAll('.column-content')[0].style.width = width + 'px';
            document.querySelectorAll('.column-content')[1].style.width = width + 'px';
          } else {
            _this.msgTip = res.msg;
            _this.popupSubmit = true;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 月报-统计
      apiTwo() {
        this.loading = true;

        // 发送网络请求 ->
        var _this = this;
        var params = {
          month: _this.pickerData
        };
        var arr = [];

        monthlyChange(params).then((res) => {
          /*res = {
            code: "1",
            msg: "",
            data: {
              base_state: [
                "未签到",
                "已签到",
                "早退",
                "已签退",
                "休息",
                "补休",
                "事假",
                "病假",
                "旷工",
                "年假",
                "婚假",
                "产假",
                "陪产假",
                "工伤",
                "丧假"
              ],
              list: [
                {
                  name: "陈俊文",
                  detail: [
                    4,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  ]
                },
                {
                  name: "黄秀",
                  detail: [
                    23,
                    0.5,
                    0.5,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  ]
                },
                {
                  name: "陈俊升",
                  detail: [
                    2,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  ]
                },
                {
                  name: "李炜强",
                  detail: [
                    3,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  ]
                },
                {
                  name: "总计",
                  detail: [
                    32,
                    0.5,
                    0.5,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                  ]
                }
              ]
            }
          };*/

          if (res.code == 1) {
            this.loading = false;
            _this.list = res.data.list;
            _this.rowList = res.data.base_state;

            res.data.base_state.forEach(function (value, index) {
              arr.push({
                msg: value,
                selected: false
              })
            });

            _this.detail = arr;

            var width = 94 * this.rowList.length;

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
      this.apiOne();

      setTimeout(function () {
        // 移除日期
        var dom = document.querySelectorAll('.picker-slot-center');

        if(dom.length == 3){
          dom[2].remove();
        }
      },100)
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
    .box{
      height: 60%;
    }
    .footer{
      height: 10%;
    }
    .message{
      height: 23%;
    }

    #table{
      height: 100%;
      .body{
        height: 100%;
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

  .message {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding-left: 10px;
    height: 114px;
    .changeMsg {
      overflow-y: scroll;
      height: 80px;
      display: flex;
      flex-direction: column;
    }
  }

  .margin {
    margin-top: 10px;
  }

  .total {
    color: orange;
  }

  .contentC {
    width: 94px;
    height: 45px;
    border-right: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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

  .tipLoading{
    .mint-popup{
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
