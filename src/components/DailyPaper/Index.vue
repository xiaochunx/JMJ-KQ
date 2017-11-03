<template>
  <div v-wechat-title="$route.meta.title" class="content">
    <div class="item">
      <span>授权人员: </span>
      <div @click="openPopup">{{authorizedMan}}</div>
      <div>
        <img :src="'./static/down.png'" alt="" style="width: 25px;height: 25px;">
      </div>
    </div>

    <div class="item">
      <span>开始日期: </span>
      <div @click="openPicker(1)">{{beginTime}}</div>
      <div>
        <img :src="'./static/down.png'" alt="" style="width: 25px;height: 25px;">
      </div>
    </div>

    <div class="item">
      <span>结束日期: </span>
      <div @click="openPicker(2)">{{endTime}}</div>
      <div>
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
    >
    </mt-datetime-picker>

    <mt-datetime-picker
      ref="picker2"
      type="date"
      v-model="pickerValue2"
      :startDate="beginDate"
      :endDate="endDate"
    >
    </mt-datetime-picker>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        popupVisible: false,               // popup弹窗
        popupSubmit: false,                // 提交弹窗
        msgTip: "",                        // 提示信息
        endDate: new Date(),               // 开始日期的结束时间
        pickerValue1: "",                  // 开始日期选中值,未转化
        pickerValue2: "",                  // 结束日期选中值,未转化
        authorizedMan: "",                 // 授权人员
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
      onValuesChange(picker,values) {

        this.authorizedMan = values[0];
//        console.log(this.authorizedMan);
      },
      openPopup() {
        this.popupVisible = true;
      },
      openPicker(value) {
        if (value == 1){
          this.$refs.picker1.open();
        }else if (value == 2){
          this.$refs.picker2.open();
        }
      },
      changeRouter(){

        var flag = true;

        // 容错处理
        if (typeof (this.authorizedMan) == 'undefined' || this.beginTime == "" || this.endTime == "" || this.authorizedMan == ""){
          flag = false
        }

        // 数据全部填写
        if (flag){
          // post
          this.msgTip = '授权成功!';
        }else {
          this.msgTip = '所有的选项都需要填写!';
        }

        this.popupSubmit = true;

      },
      sure(){
        this.popupSubmit = false;
      }
    },
    computed: {
      beginTime(){                      // 开始日期 -> 转化
        return new Date(this.pickerValue1).Format("yyyy-MM-dd");
      },
      endTime(){                        // 结束日期 -> 转化
        return new Date(this.pickerValue2).Format("yyyy-MM-dd");
      },
      beginDate(){                      // 结束日期的开始时间
        return new Date(this.pickerValue1)
      }
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
        img{
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
        background:-webkit-gradient(linear, -30% 50%, 30% -50%, from(#ed1204), to(#ed3806));
        color: white;
        height: 42px;
        font-size: 16px;
      }
    }
  }

  // mask
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


  .mint-popup-bottom {
    width: 100%;
  }
</style>
