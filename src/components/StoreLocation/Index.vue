<template>
  <div v-wechat-title="$route.meta.title" id="storesDaily">
    <div class="top">
      <div class="title">
        <img :src="'./static/storeLocation/weizhi.png'" alt="" style="width: 25px;height: 25px">
        <span @click="getCur">获取位置</span>
      </div>
      <div class="title">
        <img :src="'./static/storeLocation/weizhi1.png'" alt="" style="width: 25px;height: 25px">
        <span @click="check">查看位置</span>
      </div>
    </div>

    <div class="lAL">
      <div class="longitude">
        <span class="title">经度</span>
        <input type="text" readonly="readonly" v-model="store_info.longitude">
      </div>
      <div class="longitude">
        <span class="title">纬度</span>
        <input type="text" readonly="readonly" v-model="store_info.latitude">
      </div>
    </div>

    <div class="footer">
      <div class="footerBtn">
        <mt-button @click="submit">提交</mt-button>
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
      v-model="loading"
      :closeOnClickModal="false"
    >
      <div class="loading">
        <mt-spinner type="fading-circle" class="isLoading"></mt-spinner>
        <div>{{pupupMsg}}</div>
      </div>
    </mt-popup>

  </div>
</template>
<script>
  import { requestStoresInitialize,storesLocationPostMsg } from '../../api/api.js'

  export default {
    data() {
      return {
        pupupMsg: "加载数据中...",
        loading: false,
        popupSubmit: false,
        msgTip: "保存成功",
        timer: null,
        store_info: {
          areaid: "8",
          name: "广深市场",
          longitude: 113.30764968,
          latitude: 23.1200491
        },
      }
    },
    methods: {
      submit() {

        var _this = this;
        var params = {
          areaid: _this.store_info.areaid,
          longitude: _this.store_info.longitude,
          latitude: _this.store_info.latitude
        };

        storesLocationPostMsg(params).then((res) => {
          _this.msgTip = res.msg;
          this.popupSubmit = true;
        }).catch((error) => {
          console.log(error);
        });
      },
      sure() {
        this.popupSubmit = false;
      },
      check() {
        var _this = this;
        this.wx.openLocation({
          latitude: _this.store_info.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: _this.store_info.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: 'xxx', // 位置名
          address: 'xxxx.xxx', // 地址详情说明
          scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: 'http://www.baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转
        });

      },
      getCur(){
        this.loading = true;
        this.pupupMsg = "加载数据中...";
        var _this = this;

        this.wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {

             _this.store_info.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
             _this.store_info.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度

            _this.pupupMsg = "获取位置成功!";

            setTimeout(function () {
              _this.loading = false;
            },500)
          },
          error(err){
            _this.pupupMsg = "获取位置失败!";
          },
          fail(err){
            alert('fail');
          },
          complete(){

          }
        });
      }
    },
    mounted() {

      this.loading = true;
      var _this = this;
      requestStoresInitialize().then((res) => {
        if (res.code == 1) {

          _this.store_info = res.data.store_info;
          var appId = res.data.signpackage.appId;
          var nonceStr = res.data.signpackage.nonceStr;
          var timestamp = res.data.signpackage.timestamp;
          var signature = res.data.signpackage.signature;
          var jsApiList = [
            'openLocation', 'getLocation', 'checkJsApi'
          ];

          // alert('请求成功啦');

          // 配置微信
          _this.wx.config({
            appId: appId,
            nonceStr: nonceStr,
            timestamp: timestamp,
            signature: signature,
            jsApiList: jsApiList
          });

          // config成功之后会调用这个方法
          _this.wx.ready(function () {
            _this.wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {

                window.clearInterval(_this.timer);

                _this.store_info.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                _this.store_info.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度

                _this.pupupMsg = "获取位置成功!";

                setTimeout(function () {
                  _this.loading = false;
                },500)
              },
              error(err){
                _this.pupupMsg = "获取位置失败!";
              }
            });
          });


          // 多次请求位置信息(4s一次)
          _this.timer = setInterval(function () {
            // config成功之后会调用这个方法
            _this.wx.ready(function () {
              _this.wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {

                  window.clearInterval(_this.timer);

                  _this.store_info.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  _this.store_info.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                  var speed = res.speed; // 速度，以米/每秒计
                  var accuracy = res.accuracy; // 位置精度

                  _this.pupupMsg = "获取位置成功!";

                  setTimeout(function () {
                    _this.loading = false;
                  },500)
                },
                error(err){
                  _this.pupupMsg = "获取位置失败!";
                }
              });
            });
          },4000);

        }else {
          _this.pupupMsg = res.msg;

          setTimeout(function () {
            _this.loading = false;
          },500)
        }
      }).catch((error) => {
        alert(error);
      })
    }
  }
</script>
<style scoped lang="less">
  #storesDaily {
    height: 100%;
    .top {
      display: flex;
      background-color: rgb(245, 245, 245);
      img {
        margin-right: 10px;
      }
      .title {
        font-size: 16px;
        font-weight: 200;
        color: #656565;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        text-align: center;
        line-height: 45px;
        margin-right: 1px;
        margin-bottom: 1px;
      }
    }

    .lAL {
      margin-top: 10px;
      .longitude {
        height: 44px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1px;
        span {
          flex: 1;
          margin-left: 21px;
          color: #282828;
        }
        input {
          flex: 8;
          margin-left: 10px;
          font-size: 16px;
        }
      }
    }
  }

  // footer
  .footer {
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    .footerBtn {
      padding: 0 30px;
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

  div#div1 {
    height: calc(100% - 167px);
  }
</style>
