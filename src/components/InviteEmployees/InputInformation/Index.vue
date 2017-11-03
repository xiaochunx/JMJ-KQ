<template>
  <div v-wechat-title="$route.meta.title" class="content">
    <div class="item">
      <div>
        <img :src="'./static/inputInformation/shenfenzheng.png'" alt="" style="width: 25px;height: 25px;">
      </div>
      <input type="text" v-model="IDCode" placeholder="请输入身份证号码">
    </div>

    <div class="item">
      <div>
        <img :src="'./static/inputInformation/xingming.png'" alt="" style="width: 25px;height: 25px;">
      </div>
      <input type="username" v-model="username" placeholder="请输入姓名">
    </div>
    <div class="item">
      <div>
        <img :src="'./static/inputInformation/shouji .png'" alt="" style="width: 25px;height: 25px;">
      </div>
      <input type="text" v-model="Tel" placeholder="请输入手机号码">
    </div>


    <div class="itemD">
      <div>
        <img :src="'./static/inputInformation/xueli.png'" alt="" style="width: 25px;height: 25px;">
      </div>
      <div @click="openPopup">{{education}}</div>
    </div>


    <!--<div class="item">
      <div>
        <img :src="'./static/inputInformation/xueli.png'" alt="" style="width: 25px;height: 25px;">
      </div>
      <input type="text" v-model="education" readonly="readonly" placeholder="请选择学历" @click="openPop">
    </div>-->



    <div class="item">
      <div>
        <img :src="'./static/inputInformation/mima.png'" alt="" style="width: 25px;height: 25px;">
      </div>
      <input type="password" v-model="password" placeholder="请输入密码">
    </div>


    <div class="footer">
      <div class="footerBtn">
        <mt-button @click="submit">提交</mt-button>
      </div>
    </div>

    <mt-popup
      v-model="popupVisible"
      :closeOnClickModal="true"
      position="bottom"
    >
      <mt-picker :slots="slots" @change="onValuesChange" style="width:100%"></mt-picker>
    </mt-popup>


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

  import { requresEmployessinitialize,requresEmployessPostMsg } from '../../../api/api'

  export default {
    data(){
      return{
        popupVisible: false,  // 学历弹窗
        popupSubmit: false,   // 提交弹窗
        msgTip: "",           // 提示信息
        education: '',        // 学历
        password: "",         // 密码
        username: "",         // 姓名
        Tel: "",              // 电话号码
        IDCode: "",           // 身份证号码
        slots: [
          {
            flex: 1,
            values: ['大学','高中','小学','本科','专科'],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    methods: {
      openPopup(){
        this.popupVisible = true;
      },
      onValuesChange(picker, values) {
        this.education = values[0];
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      },
      submit(){
        var flag = true;

        if (this.education == "" || this.password == "" || this.username == "" || this.Tel == "" || this.IDCode == ""){
          flag = false
        }

        if (flag){
          var params = {
            IDCode: this.IDCode,
            Tel: this.Tel,
            username: this.username,
            education: this.education,
            a_password: this.password,
            b_password: this.password
          };


          requresEmployessPostMsg(params).then((res) => {
            this.popupSubmit = true;
            this.msgTip = res.msg;
          }).catch((error) => {
            console.log(error);
          });

        }else {
          this.popupSubmit = true;
          this.msgTip = "所有的选项都需要填写!";
        }
      },
      sure(){
        this.popupSubmit = false;
      }
    },
    mounted(){


      requresEmployessinitialize().then((res) => {
        console.log(res);
        if (res.code == 1){
          this.slots[0].values = res.data.educationlist;
          this.IDCode = res.data.info.IDCode;
          this.username = res.data.info.username;
          this.Tel = res.data.info.Tel;
          this.education = res.data.info.education;
          this.onValuesChange(res.data.educationlist);
        }
      }).catch((res) => {
        console.log(res);
      })
    }
  }
</script>
<style scoped lang="less">

  .content{
    padding: 44px 40px;
    height : calc(~"100% - 88px");
    background-color: white;
    .item{
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      div{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        height: 44px;
      }
      input{
        flex: 8;
        border-bottom: 1px solid gainsboro;
        line-height: 44px;
        height: 44px;
        font-size: 18px;
      }
    }
  }

  .gap{
    margin-top: 10px;
  }
  .mint-popup-bottom{
    width: 100% ;
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
        background:-webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
        color: white;
        height: 42px;
        font-size: 16px;
      }
    }
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


  .itemD {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    div:nth-child(1) {
      flex: 1;
      line-height: 44px;
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div:nth-child(2) {
      flex: 8;
      line-height: 44px;
      height: 44px;
      border-bottom: 1px solid gainsboro;
    }
  }
</style>

