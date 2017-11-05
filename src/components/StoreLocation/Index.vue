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
        <input type="text" readonly="readonly" v-model="longitude">
      </div>
      <div class="longitude">
        <span class="title">纬度</span>
        <input type="text" readonly="readonly" v-model="latitude">
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

    <!--<map-view :height="height" :longitude="longitude" :latitude="latitude"></map-view>-->

    <!-- 地图控件 -->
    <div id="div1" style="height: calc(100% - 248px);"></div>

    <mt-popup
      v-model="loading"
    >
      <div class="loading">
        <mt-spinner type="fading-circle" class="isLoading"></mt-spinner>
        <div>加载数据中...</div>
      </div>
    </mt-popup>

  </div>
</template>
<script>
  import {requestStoresInitialize} from '../../api/api.js'

  export default {
    data() {
      return {
        loading: false,
        popupSubmit: false,
        msgTip: "保存成功",
        longitude: 113.30764968,
        latitude: 23.1200491,
      }
    },
    methods: {
      submit() {
        this.popupSubmit = true;
      },
      sure() {
        this.popupSubmit = false;
      },
      check() {
        this.loading = true;
        var _this = this;
        // 百度地图API功能
        var map = new BMap.Map("div1");
        var point = new BMap.Point(116.331398, 30.897445);
        map.centerAndZoom(point, 18);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);

            _this.latitude = r.latitude;
            _this.longitude = r.longitude;
            _this.loading = false;

          }
          else {
            alert('failed' + this.getStatus());
          }
        }, {enableHighAccuracy: true})

        //关于状态码
        //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
        //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
        //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
        //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
        //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
        //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
        //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
        //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
        //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
      },
      getCur() {
        var _this = this;
        this.loading = true;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          // 获取当前经纬度
          _this.latitude = r.latitude;
          _this.longitude = r.longitude;
          _this.loading = false;
        }, {enableHighAccuracy: true})
      }
    },
    mounted() {

      this.check();

      requestStoresInitialize().then((res) => {
        console.log(res);
        if (res.code == 1) {
          var appId = res.data.signpackage.appId;
          var nonceStr = res.data.signpackage.nonceStr;
          var timestamp = res.data.signpackage.timestamp;
          var signature = res.data.signpackage.signature;
          var jsApiList = [
            'openLocation', 'getLocation', 'checkJsApi'
          ];

          alert('请求成功啦');

          // 配置微信
          wx.config({
            appId: appId,
            nonceStr: nonceStr,
            timestamp: timestamp,
            signature: signature,
            jsApiList: jsApiList
          });

          // 检测API是否可用
          wx.ready(function () {

            alert('来到这个地方说明wx准备好了');

            wx.checkJsApi({
              jsApiList: [
                'getLocation'
              ],
              success: function (res) {
                if (res.checkResult.getLocation == false) {
                  alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                  return;
                }
              }
            });

            wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {

                for(var item in res){
                  alert(res[item]);
                }

                alert('成功获取到坐标');

                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度



                wx.openLocation({
                  latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                  longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                  name: '', // 位置名
                  address: '', // 地址详情说明
                  scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
                  infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
              }
            });

          });

        }
      }).catch((error) => {

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
