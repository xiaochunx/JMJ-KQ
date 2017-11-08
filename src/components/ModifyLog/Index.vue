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
        <div class="title" v-for="(value,index) in title" :key="index">{{value}}</div>
      </div>
      <div style="overflow-y: scroll;height:450px">
        <div class="middleMsg" v-for="(item,index) in list" :key="index">
          <div class="titleName">{{item.name}}</div>
          <div class="titleName">{{item.beforeChange}}</div>
          <div class="titleName">{{item.afterChange}}</div>
          <div class="titleName">{{item.OperationMan}}</div>
          <div class="titleName">{{item.approverMan}}</div>
          <div class="titleName titleD">
            <span v-for="(value,index) in item.changeTime">{{value}}</span>
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
  export default {
    data(){
      return{
        popupVisible: false,                       // popup弹窗
        pickerValue: "",                           // 日期 -> 未转化
        storesNameIn: "",                          // 临时存储门店名称
        pickerData: new Date().Format("yyyy-MM"),
        storesName: "天河北店",                     // 门店名称
        list: [
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
          {
            name: "程俊文",
            beforeChange: "未打卡",
            afterChange: "病假",
            OperationMan: "黄秀",
            approverMan: "李炜强",
            changeTime: ["2017-11-01","10:01:01"],
          },
        ],                               // 详情列表
        title: ["店员姓名","修改前","修改后","修改人","审批人","修改时间"],      // 表头列表
        endDate: new Date(),                      // 日历列表结束日期
        slots: [
        {
          flex: 1,
          values: ['天河北店', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'center'
        }]
      }
    },
    methods: {
      openPopup(){
        this.popupVisible = true;
      },
      onValuesChange(picker, values){
        if (values[0]){
          this.storesNameIn = values[0];
        }
      },
      selected(index){
        this.detail[index].selected = !this.detail[index].selected;
      },
      sure(){
        this.popupVisible = false;
      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(){
        this.pickerData = new Date(this.pickerValue).Format("yyyy-MM");

        // 在这里发送网络请求
      },
      operation(value){
        // 取消
        if (value == 1){

        }
        // 确认
        else if (value == 2){
          if (this.storesNameIn != ''){
            this.storesName = this.storesNameIn;
            // 在这里发送网络请求
          }
        }

        // 退出蒙版
        this.popupVisible = false;
      }
    }
  }
</script>
<style lang="less" scoped>
  #monthlyReport{
    height: 100%;
    .top{
      padding: 8px;
      display: flex;
      .topBtn{
        background-color: #ed1204;
        height: 29px;
        color: white;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        /*width: 100%;*/
        >img{
          margin-left: 20px;
        }
        span:nth-child(2){
          flex: 8;
          width: 30px;
        }
        span:nth-child(3){
          flex: 2;
          img{
            transform: rotate(47deg);
          }
        }
      }
    }

    // table
    .middle{
      width: 100%;
      height: 450px;
      .middleTable{
        display: flex;
        background-color: rgb(245,245,245);
        .title{
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

    .middleMsg{
      display: flex;
      background-color: rgb(245,245,245);
    }
    .titleName,.titleMsg{
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
  }

  .titleD{
    display: flex;
    flex-direction: column;
    font-size: 12px;
    span{
      font-size: 12px;
      line-height: 25px;
      height: 25px;
    }
  }

  .popupTittle{
    display: flex;
    .cell{
      flex: 1;
      text-align: center;
      border-bottom: 1px solid gainsboro;
      color: skyblue;
      height: 40px;
      line-height: 40px;
    }
  }

  .mint-popup{
    width: 100%;
  }
</style>
