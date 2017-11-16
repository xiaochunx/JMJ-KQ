<template>
  <div v-wechat-title="$route.meta.title" id="firstInstance">
    <div class="content">
      <div class="top">
        <span>选择代打卡人员</span>
      </div>

      <div class="middle">

        <div class="item gColor" v-for="(value,index) in list">
          <img v-if="typeof(value.imgSrc) != 'undefined'" :src="value.imgSrc" alt=""
               style="width: 60px;height: 60px;border-radius: 100px">
          <img v-if="typeof(value.imgSrc) == 'undefined'" :src="'./static/bg_button_review_hl_15x25_@2x.png'" alt=""
               style="width: 60px;height: 60px;border-radius: 100px">

          <div class="radio">
            <el-radio-group v-model="radio" @change="test">
              <el-radio class="radio" :label="index">{{value.username}}</el-radio>
            </el-radio-group>
          </div>
        </div>

      </div>

      <div class="tip">
        <span class="gColor">补签时间:此时间作为该员工签到/签退时间</span>
        <div class="dataTime">
          <span>{{pickerData}}</span>
          <mt-button size="small" @click="edit">修改</mt-button>
        </div>
      </div>
      <div class="message">
        <span>备注: </span>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>

      <div class="footer">
        <div class="footerBtn">
          <mt-button @click="clockIn">代打卡</mt-button>
        </div>
      </div>
    </div>

    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      :endDate="endDate"
      @confirm="handleConfirm"
    >
    </mt-datetime-picker>

    <mt-popup
      v-model="popupSubmit">
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

  import {firstInstanceInitialize, firstInstanceSave} from '../../api/api.js'

  export default {
    data() {
      return {
        loading: false,
        popupSubmit: false,
        popupSubmit2: false,
        msgTip: "",       // 提示文字
        name: "",         // 当前选中用户名
        list: [
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
            id: 2,
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "僵硬",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
          },
        ],
        radio: '1',
        textarea: "",
        pickerValue: "",
        pickerData: new Date().Format("yyyy-MM-dd"),
        endDate: new Date(),
        flag: true,     // 防止多次请求
        id: 0,           // 记录当前选中id
        code: null        // 记录当前返回code值
      }
    },
    methods: {
      edit() {
        this.$refs.picker.open();
      },
      clockIn() {
        this.popupSubmit = true;
        if (this.name == '') {
          this.msgTip = '请选择打卡人!'
        } else {
          /*this.msgTip = '打卡成功!';*/
          this.apiPost()
        }
      },
      handleConfirm() {
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM-dd");
      },
      test(value) {
        var _this = this;

        if (this.flag) {
          this.flag = false;
          _this.name = _this.list[value].name;
          _this.id = _this.list[value].id;
          console.log(_this.id);
          setTimeout(function () {
            _this.flag = true;
          }, 50)
        }

      },
      sure() {
        if (this.code == -1 || this.code == 3 || this.code == 4){
          this.$router.push('/');
        }
        this.popupSubmit = false;
      },
      apiInitialize() {

        this.loading = true;
        var _this = this;
        var params = {};

        firstInstanceInitialize(params).then((res) => {

          /*res = {
            "code": "1",
            "msg": "",
            "data": [{
              "id": "13",
              "username": "陈俊文店"
            }, {
              "id": "9",
              "username": "陈吴斌"
            }, {
              "id": "15",
              "username": "ddd"
            }, {
              "id": "16",
              "username": "dd"
            }, {
              "id": "17",
              "username": "d"
            }, {
              "id": "18",
              "username": "ghj"
            }, {
              "id": "19",
              "username": "hsjsj"
            }, {
              "id": "20",
              "username": "hh"
            }]
          }*/
          _this.code = res.code;

          this.loading = false;

          if (res.code == 1) {
            _this.list = res.data
          }else {
            _this.msgTip = res.msg;
            _this.popupSubmit = true;
          }

        }).catch((err) => {
          console.log(err);
        })
      },
      apiPost() {
        this.loading = true;
        var _this = this;
        var params = {
          aid: _this.id,
          date: _this.pickerData,
          reason: _this.textarea
        };

        firstInstanceSave(params).then((res) => {
          _this.loading = false;
          _this.msgTip = res.msg;
          _this.popupSubmit = true;
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    mounted() {
      this.apiInitialize();
    }
  }
</script>
<style lang="less" scoped>

  #firstInstance{
    height: 100%;
    .content{
      height: 100%;
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

  .top {
    width: 100%;
    height: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 44px;
    background-color: #fff;
    font-size: 16px;
    color: #282828;
  }

  .middle {
    height: 40%;
    margin-top: 2%;
    padding: 15px 25px 0 25px;
    background: white;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    .item {
      width: 25%;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
    }
  }

  .radio {
    margin-top: 10px;
    width: 60px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      input {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }
  }

  .tip {
    height: 10%;
    padding: 15px 25px 0 25px;
    margin-top: 1px;
    background-color: white;
    font-size: 15px;
    .dataTime {
      font-size: 16px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .message {
    height: 15%;
    padding: 3% 25px 0 25px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background: white;
    span {
      width: 50px;
      line-height: 30px;
    }
  }

  // footer
  .footer {
    height: 17%;
    display: flex;
    padding-bottom: 24px;
    background: white;
    .footerBtn {
      padding: 0 40px;
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

  .mint-button--default {
    background: rgb(177, 177, 177);
    color: rgb(233, 233, 233);
  }

  .gColor {
    color: #d4d4d4;
  }

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
