<template>
  <div v-wechat-title="$route.meta.title" class="content">
    <div class="item">
      <span>授权人员: </span>
      <div @click="openPopup">{{authorizedMan}}</div>
      <div @click="openPopup">
        <img :src="'./static/down.png'" alt="" style="width: 25px;height: 25px;">
      </div>
    </div>

    <div class="item">
      <span>开始日期: </span>
      <div @click="openPicker(1)">{{beginTime}}</div>
      <div @click="openPicker(1)">
        <img :src="'./static/down.png'" alt="" style="width: 25px;height: 25px;">
      </div>
    </div>

    <div class="item">
      <span>结束日期: </span>
      <div @click="openPicker(2)">{{endTime}}</div>
      <div @click="openPicker(2)">
        <img :src="'./static/down.png'" alt="" style="width: 25px;height: 25px;">
      </div>
    </div>

    <div class="footer">
      <div class="footerBtn">
        <mt-button @click="changeRouter">提交</mt-button>
      </div>
    </div>

    <mt-popup
      v-model="popupSubmit">
      <div class="mask">
        <div class="msgTip">{{msgTip}}</div>
        <div class="footerBtn">
          <mt-button @click="sure">确认</mt-button>
        </div>
      </div>
    </mt-popup>

    <mt-popup
      v-model="popupVisible"
      :closeOnClickModal="true"
      position="bottom"
    >
      <mt-picker :slots="slots" @change="onValuesChange" style="width:100%"></mt-picker>
    </mt-popup>

    <mt-datetime-picker
      ref="picker1"
      type="date"
      v-model="pickerValue1"
      :endDate="endDate"
      @confirm="handleConfirm"
    >
    </mt-datetime-picker>

    <mt-datetime-picker
      ref="picker2"
      type="date"
      v-model="pickerValue2"
      :startDate="beginDate"
      :endDate="endDate"
      @confirm="handleConfirm"
    >
    </mt-datetime-picker>

  </div>
</template>
<script>

  import { dailyPaperInitialize,dailySave } from '../../api/api.js'

  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        popupVisible: false,               // popup弹窗
        popupSubmit: false,                // 提交弹窗
        msgTip: "",                        // 提示信息
        endDate: new Date("2020-01-01"),               // 开始日期的结束时间
        pickerValue1:  new Date(),                  // 开始日期选中值,未转化
        pickerValue2: "",                  // 结束日期选中值,未转化
        authorizedMan: "",                 // 授权人员
        code: null,                        // 记录当前返回的code值
        people: [],                        // 授权人员数组
        start: [],                         // 开始日期数组
        end: [],                           // 结束日期数组
        index: 0,                          // 记录当前被选中索引
        flag: null,                        // 判断当前是什么操作触发的 0 -> 点击授权人员 1 -> 点击日期
        data: [],                          // 保存返回的data数据
        slots: [
          {
            flex: 1,
            values: ['大学', '高中', '小学', '本科', '专科'],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    methods: {
      onValuesChange(picker, values) {
        var _this = this;
        this.people.forEach(function (item, index) {
          if (item == values[0]){
            _this.index = index;
          }
        });
        this.flag = 0;
        this.authorizedMan = values[0];
      },
      openPopup() {
        this.popupVisible = true;
      },
      openPicker(value) {
        if (value == 1) {
          this.$refs.picker1.open();
        } else if (value == 2) {
          this.$refs.picker2.open();
        }
      },
      // 日期弹窗的确认按钮回调
      handleConfirm(){
        this.flag = 1;
      },
      changeRouter() {
        var _this = this;
        var flag = true;

        // 容错处理
        if (typeof (this.authorizedMan) == 'undefined' || this.beginTime == "" || this.endTime == "" || this.authorizedMan == "") {
          flag = false
        }

        // 数据全部填写
        if (flag) {

          // 授权日报-保存
          var params = {
            a_id_to: _this.data[_this.index].aid,
            start: _this.beginTime,
            end: _this.endTime
          };


          dailySave(params).then((res) => {

            _this.msgTip = res.msg;
            _this.popupSubmit = true;
            if (res.code == 1){
              // 修改成功 -> 更改成功
              _this.start[_this.index] = _this.beginTime;
              _this.end[_this.index] = _this.endTime;
            }

          }).catch((err) => {
            console.log(err);
          });
        } else {
          Toast("所有选项都需要填写!");
        }
      },
      sure() {
        if (this.code == -1 || this.code == 3 || this.code == 4) {
          /*this.$router.push('/');*/
          this.wx.closeWindow();
        } else {
          this.popupSubmit = false;
        }
      },
    },
    computed: {
      beginTime() {                      // 开始日期 -> 转化
        if (this.flag == 0){
           return this.start[this.index];
        }else if (this.flag == 1){

          return new Date(this.pickerValue1).Format("yyyy-MM-dd");
        }
      },
      endTime() {                        // 结束日期 -> 转化
        if (this.flag == 0){
          return this.start[this.index];
        }else if (this.flag == 1){
          return new Date(this.pickerValue2).Format("yyyy-MM-dd");
        }
      },
      beginDate() {                      // 结束日期的开始时间
        return new Date(this.pickerValue1)
      }
    },
    mounted() {
      var _this = this;

      var params = {};

      dailyPaperInitialize(params).then((res) => {

        _this.code = res.code;

        /*res = {
          "code": "1",
          "msg": "",
          "data": [{
            "id": "",
            "aid": 13,
            "name": "陈俊文店",
            "start": "",
            "end": ""
          }, {
            "id": "",
            "aid": 9,
            "name": "陈吴斌",
            "start": "",
            "end": ""
          }, {
            "id": "",
            "aid": 15,
            "name": "ddd",
            "start": "",
            "end": ""
          }, {
            "id": "",
            "aid": 16,
            "name": "dd",
            "start": "",
            "end": ""
          }, {
            "id": "",
            "aid": 17,
            "name": "d",
            "start": "",
            "end": ""
          }, {
            "id": "",
            "aid": 18,
            "name": "ghj",
            "start": "",
            "end": ""
          }, {
            "id": "",
            "aid": 19,
            "name": "hsjsj",
            "start": "",
            "end": ""
          }, {
            "id": "",
            "aid": 20,
            "name": "hh",
            "start": "",
            "end": ""
          }]
        }*/

        if (res.code == 1) {
          var people = [];
          var start = [];
          var end = [];
          res.data.forEach(function (value) {
            people.push(value.name);
            start.push(value.start);
            end.push(value.end);
          });
          _this.slots[0].values = people;
          _this.data = res.data;
          _this.people = people;
          _this.start = start;
          _this.end = end;
        }else {
          _this.msgTip = res.msg;
          _this.popupSubmit = true;
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
</script>
<style lang="less" scoped>
  .content {
    padding: 44px 40px;
    height: calc(~"100% - 88px");
    background-color: white;
    .item {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        flex: 3;
        line-height: 44px;
      }
      div:nth-child(2) {
        flex: 7;
        line-height: 44px;
        height: 44px;
        border-bottom: 1px solid gainsboro;
      }
      div:nth-child(3) {
        flex: 1;
        line-height: 44px;
        border-bottom: 1px solid gainsboro;
        position: relative;
        height: 44px;
        img {
          position: absolute;
          top: 11px;
          right: 6px;
        }
      }
    }
  }

  // footer
  .footer {
    display: flex;
    margin-top: 34px;
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

  // mask
  .mask {
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

  .mint-popup-bottom {
    width: 100%;
  }
</style>
