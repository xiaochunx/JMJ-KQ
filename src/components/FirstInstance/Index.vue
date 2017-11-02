<template>
  <div v-wechat-title="$route.meta.title" id="firstInstance">
    <div class="content">
      <div class="top">
        <span>选择代打卡人员</span>
      </div>

      <div class="middle">


        <div class="item gColor" v-for="(value,index) in list">
          <img :src="value.imgSrc" alt="" style="width: 60px;height: 60px;border-radius: 100px">
          <div class="radio">
            <el-radio class="radio" v-model="radio" :label="index" @click.native="test">{{value.name}}</el-radio>
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
      type="datetime"
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
  </div>
</template>
<script>
  export default {
    data(){
      return{
        popupSubmit: false,
        msgTip: "",       // 提示文字
        name: "",         // 当前选中用户名
        list: [
          {
            imgSrc: "./static/bg_button_review_hl_15x25_@2x.png",
            name: "李炜强",
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
        pickerData: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        endDate: new Date()
      }
    },
    methods: {
      edit(){
        this.$refs.picker.open();
      },
      clockIn(){
        this.popupSubmit = true;
        if (this.name == ''){
           this.msgTip = '请选择打卡人!'
        }else {
          this.msgTip = '打卡成功!';
        }
      },
      handleConfirm(){
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM-dd hh:mm:ss");
      },
      test(){
        this.name = this.list[this.radio].name;
        console.log(this.name);
      },
      sure(){
        this.popupSubmit = false;

      }
    },
    computed: {

    }
  }
</script>
<style lang="less" scoped>

  .top {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 44px;
    background-color: #fff;
    font-size: 16px;
    color: #282828;
  }

  .middle{
    margin-top: 10px;
    padding: 15px 25px 0 25px;
    background: white;
    display: flex;
    flex-wrap: wrap;
    height: 201px;
    overflow-y: scroll;
    .item{
      width: 25%;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
    }
  }
  .radio{
    margin-top: 10px;
    width: 60px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    label{
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      input{
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }
  }

  .tip{
    padding: 15px 25px 0 25px;
    margin-top: 1px;
    background-color: white;
    font-size: 15px;
    .dataTime{
      font-size: 16px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .message{
    padding: 15px 25px 0 25px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background: white;
    span{
      width: 50px;
      line-height: 30px;
    }
  }

  // footer
  .footer {
    display: flex;
    padding-top: 64px;
    padding-bottom: 34px;
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
        background:-webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
        color: white;
        height: 42px;
        font-size: 16px;
      }
    }
  }

  .mint-button--default{
    background: rgb(177,177,177);
    color: rgb(233,233,233);
  }


  .gColor{
    color: #d4d4d4;
  }


  .mask{
    width: 220px;
    padding: 30px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    .msgTip{
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
      background:-webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
      color: white;
      height: 42px;
      font-size: 16px;
    }
  }
</style>
