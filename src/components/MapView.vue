<template>
  <div id="div1" :style="style"></div>
</template>
<script>
  export default {
    data() {
      return {
        style: {
          width: '100%',
          height: this.height + 'px'
        }
      }
    },
    props: { //里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
      height: {
        type: Number,
        default: 300
      },
      longitude: {}, //定义经度
      latitude: {} //定义纬度
    },
    mounted() {


      // 百度地图API功能
      var map = new BMap.Map("div1");
      var point = new BMap.Point(116.331398,30.897445);
      map.centerAndZoom(point,18);

      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          alert('您的位置：'+r.point.lng+','+r.point.lat);
        }
        else {
          alert('failed'+this.getStatus());
        }
      },{enableHighAccuracy: true})
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




     /* var map = new BMap.Map("div1");
      var point = new BMap.Point(this.longitude, this.latitude);


      map.centerAndZoom(point,19);  // 初始化地图,设置中心点坐标和地图级别
      //添加地图类型控件
      map.addControl(new BMap.MapTypeControl({
        mapTypes:[
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
        ]}));
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      var marker = new BMap.Marker(point);// 创建标注
      map.addOverlay(marker);
      map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放*/
    }
  }
</script>
